

var tbl_ld_cbiao_list_Obj = (function ()
{
    'use strict';

    //=================================================================================
    //                                      私有
    //=================================================================================
    //=================================================================================
    //                                      私有属性 
    //=================================================================================

    var _serviceUrl = '//127.0.0.1/sara.dd.ldsw/service/service_tbl_ld_cbiao.asmx/',
    //Grid控件的分页参数，设置为空即可实现不分页
    _pageSize = '20',
        _isPage = false,
    //Code数据存储容器
    _baseCodeHashMap = null,
    //校验结果容器
    _validateMessage = null,
    //按钮工具
    //_ladda_btn_command_new = null,
    //_ladda_btn_command_delete = null,
     _ladda_btn_command_cbiaohis = null,
    _ladda_btn_command_exp_cbiaopart = null,
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
                    $('#btn_command_search_tbl_ld_cbiao_list').html('简单查询');
                    $('#txt_command_search_tbl_ld_cbiao_list').removeAttr("disabled");

                    break;
                case "2":
                    $('#btn_command_search_tbl_ld_cbiao_list').html('高级查询');
                    $('#txt_command_search_tbl_ld_cbiao_list').attr("disabled", true);
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
                //$('#btn_command_delete_tbl_ld_cbiao_list').addClass('hidden');
                //$( '#btn_command_new_tbl_ld_cbiao_list' ).addClass( 'hidden' ); 
            }
            else
            {
                $('#btn_command_delete_tbl_ld_cbiao_list').removeClass('hidden');
                $( '#btn_command_new_tbl_ld_cbiao_list' ).removeClass( 'hidden' ); 
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
        tbl_ld_cbiao_detail_Obj._pr_sys_id = id;
        tbl_ld_cbiao_detail_Obj.bindPage({
            success: function ()
            {
                $('#div_content_part_tbl_ld_cbiao_list').css('display', 'none');
                $('#div_content_part_tbl_ld_cbiao_detail').css('display', '');
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
        
     
        
        codeServiceId += "0584^";
        
        codeServiceId += "0585^";
        
        codeServiceId += "0586^";
        
        
       
        
        codeServiceId = codeServiceId.trimEnd('^');
        commonObj.getCodeServiceJson(codeServiceId, {
            success: function (resultArray)
            {
                try
                {
                    _baseCodeHashMap = new hashMap();
                    
                    
             
                    _baseCodeHashMap.put('codeservice_0584', resultArray['0584']);
                    
                    _baseCodeHashMap.put('codeservice_0585', resultArray['0585']);
                    
                    _baseCodeHashMap.put('codeservice_0586', resultArray['0586']);
                     
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
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            var codeService_0584 = _baseCodeHashMap.get('codeservice_0584');
            
            var codeService_0585 = _baseCodeHashMap.get('codeservice_0585');
            
            var codeService_0586 = _baseCodeHashMap.get('codeservice_0586');
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
                        
            	
											 
		    	
											 
		    	
											 
		    	
											 
		    	
											 
		    	
											 
		    	
											 
		    	
											 
		    	
											 
		    	
											 
		    	
											 
		    	
											 
		    	
											 
		    	
											 
		    	
											 
		    	
											 
		    	
											 
		    	
											 
		    	
											 
		    	
						controlObj.datetimeinit('search_f_cbsj_tbl_ld_cbiao_list_datefrom', 'search_f_cbsj_tbl_ld_cbiao_list_timefrom');     
			controlObj.datetimeinit('search_f_cbsj_tbl_ld_cbiao_list_dateto', 'search_f_cbsj_tbl_ld_cbiao_list_timeto');     
			
			controlObj.datetime('search_f_cbsj_tbl_ld_cbiao_list_datefrom', 'search_f_cbsj_tbl_ld_cbiao_list_timefrom', '1900-01-01 00:00:00');
			controlObj.datetime('search_f_cbsj_tbl_ld_cbiao_list_dateto', 'search_f_cbsj_tbl_ld_cbiao_list_timeto', '1900-01-01 00:00:00'); 
		    	
			            controlObj.multidropdownlistinit('search_f_bk_tbl_ld_cbiao_list', codeService_0584); 
		    	
			            controlObj.multidropdownlistinit('search_f_zt_tbl_ld_cbiao_list', codeService_0585); 
		    	
			            controlObj.multidropdownlistinit('search_f_ly_tbl_ld_cbiao_list', codeService_0586); 
		    	
											 
		    	
											 
		    	
											 
		    	
											 
		    	
											 
		    	
											 
		    	
											 
		    	
											 
		    	
											 
		    	
											 
		    	
											 
		    	
											 
		    	
											 
		    	
											 
		    	
											 
		    	
											 
		    	
											 
		    	
						controlObj.datetimeinit('search_f_pgsj_tbl_ld_cbiao_list_datefrom', 'search_f_pgsj_tbl_ld_cbiao_list_timefrom');     
			controlObj.datetimeinit('search_f_pgsj_tbl_ld_cbiao_list_dateto', 'search_f_pgsj_tbl_ld_cbiao_list_timeto');     
			
			controlObj.datetime('search_f_pgsj_tbl_ld_cbiao_list_datefrom', 'search_f_pgsj_tbl_ld_cbiao_list_timefrom', '1900-01-01 00:00:00');
			controlObj.datetime('search_f_pgsj_tbl_ld_cbiao_list_dateto', 'search_f_pgsj_tbl_ld_cbiao_list_timeto', '1900-01-01 00:00:00'); 
		    	
											 
		    	
											 
		    	
						controlObj.datetimeinit('search_f_jfsj_tbl_ld_cbiao_list_datefrom', 'search_f_jfsj_tbl_ld_cbiao_list_timefrom');     
			controlObj.datetimeinit('search_f_jfsj_tbl_ld_cbiao_list_dateto', 'search_f_jfsj_tbl_ld_cbiao_list_timeto');     
			
			controlObj.datetime('search_f_jfsj_tbl_ld_cbiao_list_datefrom', 'search_f_jfsj_tbl_ld_cbiao_list_timefrom', '1900-01-01 00:00:00');
			controlObj.datetime('search_f_jfsj_tbl_ld_cbiao_list_dateto', 'search_f_jfsj_tbl_ld_cbiao_list_timeto', '1900-01-01 00:00:00'); 
		    	
											 
		    	
											 
		    	
											 
		    	
											 
		    	
											 
		    	
											 
		    	
											 
		    	
											 
		    	
											 
		    

            //模态窗口
            $('#div_search_modal_tbl_ld_cbiao_list').modal({
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
                        $("#txt_command_search_tbl_ld_cbiao_list").val(that._pr_searchcontent.type1);
                    }

                    break;
                case "2":
                    if (that._pr_searchcontent.type2 != undefined)
                    {
                        //高级查询
                        var tbl_ld_cbiao_list = that._pr_searchcontent.type2;

                        	
						           controlObj.text('search_f_value1_tbl_ld_cbiao_list', tbl_ld_cbiao_list.f_value1);                          	
		                	
						           controlObj.text('search_f_value2_tbl_ld_cbiao_list', tbl_ld_cbiao_list.f_value2);                          	
		                	
						           controlObj.text('search_f_value3_tbl_ld_cbiao_list', tbl_ld_cbiao_list.f_value3);                          	
		                	
						           controlObj.text('search_f_value4_tbl_ld_cbiao_list', tbl_ld_cbiao_list.f_value4);                          	
		                	
						           controlObj.text('search_f_value5_tbl_ld_cbiao_list', tbl_ld_cbiao_list.f_value5);                          	
		                	
						           controlObj.text('search_f_value6_tbl_ld_cbiao_list', tbl_ld_cbiao_list.f_value6);                          	
		                	
						           controlObj.text('search_f_value7_tbl_ld_cbiao_list', tbl_ld_cbiao_list.f_value7);                          	
		                	
						           controlObj.text('search_f_value8_tbl_ld_cbiao_list', tbl_ld_cbiao_list.f_value8);                          	
		                	
						           controlObj.text('search_f_value9_tbl_ld_cbiao_list', tbl_ld_cbiao_list.f_value9);                          	
		                	
						           controlObj.text('search_f_value10_tbl_ld_cbiao_list', tbl_ld_cbiao_list.f_value10);                          	
		                	
						           controlObj.text('search_f_cbbhid_tbl_ld_cbiao_list', tbl_ld_cbiao_list.f_cbbhid);                          	
		                	
						           controlObj.text('search_f_khbh_tbl_ld_cbiao_list', tbl_ld_cbiao_list.f_khbh);                          	
		                	
						           controlObj.text('search_f_sqzm_tbl_ld_cbiao_list', tbl_ld_cbiao_list.f_sqzm);                          	
		                	
						           controlObj.text('search_f_bqzm_tbl_ld_cbiao_list', tbl_ld_cbiao_list.f_bqzm);                          	
		                	
						           controlObj.text('search_f_bqsl_tbl_ld_cbiao_list', tbl_ld_cbiao_list.f_bqsl);                          	
		                	
						           controlObj.text('search_f_sqsl_tbl_ld_cbiao_list', tbl_ld_cbiao_list.f_sqsl);                          	
		                	
						           controlObj.text('search_f_qsqpjsl_tbl_ld_cbiao_list', tbl_ld_cbiao_list.f_qsqpjsl);                          	
		                	
						           controlObj.text('search_f_qlqpjsl_tbl_ld_cbiao_list', tbl_ld_cbiao_list.f_qlqpjsl);                          	
		                	
						           controlObj.text('search_f_cbyname_tbl_ld_cbiao_list', tbl_ld_cbiao_list.f_cbyname);                          	
		                	
						
			          controlObj.datetime('search_f_cbsj_tbl_ld_cbiao_list_datefrom', 'search_f_cbsj_tbl_ld_cbiao_list_timefrom', tbl_ld_cbiao_list.f_cbsjfrom);
			          controlObj.datetime('search_f_cbsj_tbl_ld_cbiao_list_dateto', 'search_f_cbsj_tbl_ld_cbiao_list_timeto', tbl_ld_cbiao_list.f_cbsjto);                          	
		                	
						          controlObj.multidropdownlistid('search_f_bk_tbl_ld_cbiao_list', tbl_ld_cbiao_list.f_bkid);                          	
		                	
						          controlObj.multidropdownlistid('search_f_zt_tbl_ld_cbiao_list', tbl_ld_cbiao_list.f_ztid);                          	
		                	
						          controlObj.multidropdownlistid('search_f_ly_tbl_ld_cbiao_list', tbl_ld_cbiao_list.f_lyid);                          	
		                	
						           controlObj.text('search_f_bz_tbl_ld_cbiao_list', tbl_ld_cbiao_list.f_bz);                          	
		                	
						           controlObj.text('search_f_yhm_tbl_ld_cbiao_list', tbl_ld_cbiao_list.f_yhm);                          	
		                	
						           controlObj.text('search_f_jfm_tbl_ld_cbiao_list', tbl_ld_cbiao_list.f_jfm);                          	
		                	
						           controlObj.text('search_f_dy_tbl_ld_cbiao_list', tbl_ld_cbiao_list.f_dy);                          	
		                	
						           controlObj.text('search_f_dyid_tbl_ld_cbiao_list', tbl_ld_cbiao_list.f_dyid);                          	
		                	
						           controlObj.text('search_f_sc_tbl_ld_cbiao_list', tbl_ld_cbiao_list.f_sc);                          	
		                	
						           controlObj.text('search_f_scid_tbl_ld_cbiao_list', tbl_ld_cbiao_list.f_scid);                          	
		                	
						           controlObj.text('search_f_qy_tbl_ld_cbiao_list', tbl_ld_cbiao_list.f_qy);                          	
		                	
						           controlObj.text('search_f_qyid_tbl_ld_cbiao_list', tbl_ld_cbiao_list.f_qyid);                          	
		                	
						           controlObj.text('search_f_pq_tbl_ld_cbiao_list', tbl_ld_cbiao_list.f_pq);                          	
		                	
						           controlObj.text('search_f_pqid_tbl_ld_cbiao_list', tbl_ld_cbiao_list.f_pqid);                          	
		                	
						           controlObj.text('search_f_lxtkhh_tbl_ld_cbiao_list', tbl_ld_cbiao_list.f_lxtkhh);                          	
		                	
						           controlObj.text('search_f_pgbh_tbl_ld_cbiao_list', tbl_ld_cbiao_list.f_pgbh);                          	
		                	
						           controlObj.text('search_f_pgbhid_tbl_ld_cbiao_list', tbl_ld_cbiao_list.f_pgbhid);                          	
		                	
						           controlObj.text('search_f_pgr_tbl_ld_cbiao_list', tbl_ld_cbiao_list.f_pgr);                          	
		                	
						           controlObj.text('search_f_pgrid_tbl_ld_cbiao_list', tbl_ld_cbiao_list.f_pgrid);                          	
		                	
						           controlObj.text('search_f_pgpcmc_tbl_ld_cbiao_list', tbl_ld_cbiao_list.f_pgpcmc);                          	
		                	
						
			          controlObj.datetime('search_f_pgsj_tbl_ld_cbiao_list_datefrom', 'search_f_pgsj_tbl_ld_cbiao_list_timefrom', tbl_ld_cbiao_list.f_pgsjfrom);
			          controlObj.datetime('search_f_pgsj_tbl_ld_cbiao_list_dateto', 'search_f_pgsj_tbl_ld_cbiao_list_timeto', tbl_ld_cbiao_list.f_pgsjto);                          	
		                	
						           controlObj.text('search_f_jfbh_tbl_ld_cbiao_list', tbl_ld_cbiao_list.f_jfbh);                          	
		                	
						           controlObj.text('search_f_jfbhid_tbl_ld_cbiao_list', tbl_ld_cbiao_list.f_jfbhid);                          	
		                	
						
			          controlObj.datetime('search_f_jfsj_tbl_ld_cbiao_list_datefrom', 'search_f_jfsj_tbl_ld_cbiao_list_timefrom', tbl_ld_cbiao_list.f_jfsjfrom);
			          controlObj.datetime('search_f_jfsj_tbl_ld_cbiao_list_dateto', 'search_f_jfsj_tbl_ld_cbiao_list_timeto', tbl_ld_cbiao_list.f_jfsjto);                          	
		                	
						           controlObj.text('search_f_bqje_tbl_ld_cbiao_list', tbl_ld_cbiao_list.f_bqje);                          	
		                	
						           controlObj.text('search_f_sbbh_tbl_ld_cbiao_list', tbl_ld_cbiao_list.f_sbbh);                          	
		                	
						           controlObj.text('search_f_sblx_tbl_ld_cbiao_list', tbl_ld_cbiao_list.f_sblx);                          	
		                	
						           controlObj.text('search_f_yslx_tbl_ld_cbiao_list', tbl_ld_cbiao_list.f_yslx);                          	
		                	
						           controlObj.text('search_f_cbbh_tbl_ld_cbiao_list', tbl_ld_cbiao_list.f_cbbh);                          	
		                	
						           controlObj.text('search_f_cbmc_tbl_ld_cbiao_list', tbl_ld_cbiao_list.f_cbmc);                          	
		                	
						           controlObj.text('search_f_cb_cbbh_tbl_ld_cbiao_list', tbl_ld_cbiao_list.f_cb_cbbh);                          	
		                	
						           controlObj.text('search_f_yhbh_tbl_ld_cbiao_list', tbl_ld_cbiao_list.f_yhbh);                          	
		                	
						           controlObj.text('search_f_yhbhid_tbl_ld_cbiao_list', tbl_ld_cbiao_list.f_yhbhid);                          	
		                 
                
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
                    that._pr_searchcontent.type1 = $("#txt_command_search_tbl_ld_cbiao_list").val();

                    break;
                case "2":

                    //高级查询
                    var tbl_ld_cbiao_list = new Object();
				    				
										 
					tbl_ld_cbiao_list.f_value1 = controlObj.text('search_f_value1_tbl_ld_cbiao_list'); 
				    				
										 
					tbl_ld_cbiao_list.f_value2 = controlObj.text('search_f_value2_tbl_ld_cbiao_list'); 
				    				
										 
					tbl_ld_cbiao_list.f_value3 = controlObj.text('search_f_value3_tbl_ld_cbiao_list'); 
				    				
										 
					tbl_ld_cbiao_list.f_value4 = controlObj.text('search_f_value4_tbl_ld_cbiao_list'); 
				    				
										 
					tbl_ld_cbiao_list.f_value5 = controlObj.text('search_f_value5_tbl_ld_cbiao_list'); 
				    				
										 
					tbl_ld_cbiao_list.f_value6 = controlObj.text('search_f_value6_tbl_ld_cbiao_list'); 
				    				
										 
					tbl_ld_cbiao_list.f_value7 = controlObj.text('search_f_value7_tbl_ld_cbiao_list'); 
				    				
										 
					tbl_ld_cbiao_list.f_value8 = controlObj.text('search_f_value8_tbl_ld_cbiao_list'); 
				    				
										 
					tbl_ld_cbiao_list.f_value9 = controlObj.text('search_f_value9_tbl_ld_cbiao_list'); 
				    				
										 
					tbl_ld_cbiao_list.f_value10 = controlObj.text('search_f_value10_tbl_ld_cbiao_list'); 
				    				
										 
					tbl_ld_cbiao_list.f_cbbhid = controlObj.text('search_f_cbbhid_tbl_ld_cbiao_list'); 
				    				
										 
					tbl_ld_cbiao_list.f_khbh = controlObj.text('search_f_khbh_tbl_ld_cbiao_list'); 
				    				
										 
					tbl_ld_cbiao_list.f_sqzm = controlObj.text('search_f_sqzm_tbl_ld_cbiao_list'); 
				    				
										 
					tbl_ld_cbiao_list.f_bqzm = controlObj.text('search_f_bqzm_tbl_ld_cbiao_list'); 
				    				
										 
					tbl_ld_cbiao_list.f_bqsl = controlObj.text('search_f_bqsl_tbl_ld_cbiao_list'); 
				    				
										 
					tbl_ld_cbiao_list.f_sqsl = controlObj.text('search_f_sqsl_tbl_ld_cbiao_list'); 
				    				
										 
					tbl_ld_cbiao_list.f_qsqpjsl = controlObj.text('search_f_qsqpjsl_tbl_ld_cbiao_list'); 
				    				
										 
					tbl_ld_cbiao_list.f_qlqpjsl = controlObj.text('search_f_qlqpjsl_tbl_ld_cbiao_list'); 
				    				
										 
					tbl_ld_cbiao_list.f_cbyname = controlObj.text('search_f_cbyname_tbl_ld_cbiao_list'); 
				    				
								
					tbl_ld_cbiao_list.f_cbsjfrom = controlObj.datetime('search_f_cbsj_tbl_ld_cbiao_list_datefrom', 'search_f_cbsj_tbl_ld_cbiao_list_timefrom'); // datefrom + ' ' + timefrom;
	                tbl_ld_cbiao_list.f_cbsjto = controlObj.datetime('search_f_cbsj_tbl_ld_cbiao_list_dateto', 'search_f_cbsj_tbl_ld_cbiao_list_timeto'); //dateto + ' ' + timeto;                 
				    				
										 
					tbl_ld_cbiao_list.f_bkid = controlObj.multidropdownlistid('search_f_bk_tbl_ld_cbiao_list'); 
				    				
										 
					tbl_ld_cbiao_list.f_ztid = controlObj.multidropdownlistid('search_f_zt_tbl_ld_cbiao_list'); 
				    				
										 
					tbl_ld_cbiao_list.f_lyid = controlObj.multidropdownlistid('search_f_ly_tbl_ld_cbiao_list'); 
				    				
										 
					tbl_ld_cbiao_list.f_bz = controlObj.text('search_f_bz_tbl_ld_cbiao_list'); 
				    				
										 
					tbl_ld_cbiao_list.f_yhm = controlObj.text('search_f_yhm_tbl_ld_cbiao_list'); 
				    				
										 
					tbl_ld_cbiao_list.f_jfm = controlObj.text('search_f_jfm_tbl_ld_cbiao_list'); 
				    				
										 
					tbl_ld_cbiao_list.f_dy = controlObj.text('search_f_dy_tbl_ld_cbiao_list'); 
				    				
										 
					tbl_ld_cbiao_list.f_dyid = controlObj.text('search_f_dyid_tbl_ld_cbiao_list'); 
				    				
										 
					tbl_ld_cbiao_list.f_sc = controlObj.text('search_f_sc_tbl_ld_cbiao_list'); 
				    				
										 
					tbl_ld_cbiao_list.f_scid = controlObj.text('search_f_scid_tbl_ld_cbiao_list'); 
				    				
										 
					tbl_ld_cbiao_list.f_qy = controlObj.text('search_f_qy_tbl_ld_cbiao_list'); 
				    				
										 
					tbl_ld_cbiao_list.f_qyid = controlObj.text('search_f_qyid_tbl_ld_cbiao_list'); 
				    				
										 
					tbl_ld_cbiao_list.f_pq = controlObj.text('search_f_pq_tbl_ld_cbiao_list'); 
				    				
										 
					tbl_ld_cbiao_list.f_pqid = controlObj.text('search_f_pqid_tbl_ld_cbiao_list'); 
				    				
										 
					tbl_ld_cbiao_list.f_lxtkhh = controlObj.text('search_f_lxtkhh_tbl_ld_cbiao_list'); 
				    				
										 
					tbl_ld_cbiao_list.f_pgbh = controlObj.text('search_f_pgbh_tbl_ld_cbiao_list'); 
				    				
										 
					tbl_ld_cbiao_list.f_pgbhid = controlObj.text('search_f_pgbhid_tbl_ld_cbiao_list'); 
				    				
										 
					tbl_ld_cbiao_list.f_pgr = controlObj.text('search_f_pgr_tbl_ld_cbiao_list'); 
				    				
										 
					tbl_ld_cbiao_list.f_pgrid = controlObj.text('search_f_pgrid_tbl_ld_cbiao_list'); 
				    				
										 
					tbl_ld_cbiao_list.f_pgpcmc = controlObj.text('search_f_pgpcmc_tbl_ld_cbiao_list'); 
				    				
								
					tbl_ld_cbiao_list.f_pgsjfrom = controlObj.datetime('search_f_pgsj_tbl_ld_cbiao_list_datefrom', 'search_f_pgsj_tbl_ld_cbiao_list_timefrom'); // datefrom + ' ' + timefrom;
	                tbl_ld_cbiao_list.f_pgsjto = controlObj.datetime('search_f_pgsj_tbl_ld_cbiao_list_dateto', 'search_f_pgsj_tbl_ld_cbiao_list_timeto'); //dateto + ' ' + timeto;                 
				    				
										 
					tbl_ld_cbiao_list.f_jfbh = controlObj.text('search_f_jfbh_tbl_ld_cbiao_list'); 
				    				
										 
					tbl_ld_cbiao_list.f_jfbhid = controlObj.text('search_f_jfbhid_tbl_ld_cbiao_list'); 
				    				
								
					tbl_ld_cbiao_list.f_jfsjfrom = controlObj.datetime('search_f_jfsj_tbl_ld_cbiao_list_datefrom', 'search_f_jfsj_tbl_ld_cbiao_list_timefrom'); // datefrom + ' ' + timefrom;
	                tbl_ld_cbiao_list.f_jfsjto = controlObj.datetime('search_f_jfsj_tbl_ld_cbiao_list_dateto', 'search_f_jfsj_tbl_ld_cbiao_list_timeto'); //dateto + ' ' + timeto;                 
				    				
										 
					tbl_ld_cbiao_list.f_bqje = controlObj.text('search_f_bqje_tbl_ld_cbiao_list'); 
				    				
										 
					tbl_ld_cbiao_list.f_sbbh = controlObj.text('search_f_sbbh_tbl_ld_cbiao_list'); 
				    				
										 
					tbl_ld_cbiao_list.f_sblx = controlObj.text('search_f_sblx_tbl_ld_cbiao_list'); 
				    				
										 
					tbl_ld_cbiao_list.f_yslx = controlObj.text('search_f_yslx_tbl_ld_cbiao_list'); 
				    				
										 
					tbl_ld_cbiao_list.f_cbbh = controlObj.text('search_f_cbbh_tbl_ld_cbiao_list'); 
				    				
										 
					tbl_ld_cbiao_list.f_cbmc = controlObj.text('search_f_cbmc_tbl_ld_cbiao_list'); 
				    				
										 
					tbl_ld_cbiao_list.f_cb_cbbh = controlObj.text('search_f_cb_cbbh_tbl_ld_cbiao_list'); 
				    				
										 
					tbl_ld_cbiao_list.f_yhbh = controlObj.text('search_f_yhbh_tbl_ld_cbiao_list'); 
				    				
										 
					tbl_ld_cbiao_list.f_yhbhid = controlObj.text('search_f_yhbhid_tbl_ld_cbiao_list'); 
				     
                    that._pr_searchcontent.type2 = tbl_ld_cbiao_list;
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
            var tbl_ld_cbiao_list = that._pr_searchcontent.type2;
            var errorMessageHansMap = new hashMap();
            var errorMessagePlacementHansMap = new hashMap();

        

            		   
            if (tbl_ld_cbiao_list.f_value1.length > 200)
            {			
                errorMessageHansMap.put('search_f_value1_tbl_ld_cbiao_list', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_cbiao_list.f_value2.length > 200)
            {			
                errorMessageHansMap.put('search_f_value2_tbl_ld_cbiao_list', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_cbiao_list.f_value3.length > 200)
            {			
                errorMessageHansMap.put('search_f_value3_tbl_ld_cbiao_list', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_cbiao_list.f_value4.length > 200)
            {			
                errorMessageHansMap.put('search_f_value4_tbl_ld_cbiao_list', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_cbiao_list.f_value5.length > 200)
            {			
                errorMessageHansMap.put('search_f_value5_tbl_ld_cbiao_list', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_cbiao_list.f_value6.length > 200)
            {			
                errorMessageHansMap.put('search_f_value6_tbl_ld_cbiao_list', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_cbiao_list.f_value7.length > 200)
            {			
                errorMessageHansMap.put('search_f_value7_tbl_ld_cbiao_list', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_cbiao_list.f_value8.length > 200)
            {			
                errorMessageHansMap.put('search_f_value8_tbl_ld_cbiao_list', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_cbiao_list.f_value9.length > 200)
            {			
                errorMessageHansMap.put('search_f_value9_tbl_ld_cbiao_list', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_cbiao_list.f_value10.length > 200)
            {			
                errorMessageHansMap.put('search_f_value10_tbl_ld_cbiao_list', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_cbiao_list.f_cbbhid.length > 200)
            {			
                errorMessageHansMap.put('search_f_cbbhid_tbl_ld_cbiao_list', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_cbiao_list.f_khbh.length > 200)
            {			
                errorMessageHansMap.put('search_f_khbh_tbl_ld_cbiao_list', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_cbiao_list.f_sqzm.length > 200)
            {			
                errorMessageHansMap.put('search_f_sqzm_tbl_ld_cbiao_list', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		   
            if (tbl_ld_cbiao_list.f_sqzm!="" && !/^[0-9]+\.?[0-9]*$/.test( tbl_ld_cbiao_list.f_sqzm ) )            
            {			
                errorMessageHansMap.put('search_f_sqzm_tbl_ld_cbiao_list', '必须是数字');
            }
            		
         

            		   
            if (tbl_ld_cbiao_list.f_bqzm.length > 200)
            {			
                errorMessageHansMap.put('search_f_bqzm_tbl_ld_cbiao_list', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_cbiao_list.f_bqsl.length > 200)
            {			
                errorMessageHansMap.put('search_f_bqsl_tbl_ld_cbiao_list', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		   
            if (tbl_ld_cbiao_list.f_bqsl!="" && !/^[0-9]+\.?[0-9]*$/.test( tbl_ld_cbiao_list.f_bqsl ) )            
            {			
                errorMessageHansMap.put('search_f_bqsl_tbl_ld_cbiao_list', '必须是数字');
            }
            		
         

            		   
            if (tbl_ld_cbiao_list.f_sqsl.length > 200)
            {			
                errorMessageHansMap.put('search_f_sqsl_tbl_ld_cbiao_list', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_cbiao_list.f_qsqpjsl.length > 200)
            {			
                errorMessageHansMap.put('search_f_qsqpjsl_tbl_ld_cbiao_list', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_cbiao_list.f_qlqpjsl.length > 200)
            {			
                errorMessageHansMap.put('search_f_qlqpjsl_tbl_ld_cbiao_list', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_cbiao_list.f_cbyname.length > 200)
            {			
                errorMessageHansMap.put('search_f_cbyname_tbl_ld_cbiao_list', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		
         

            		   
            if (tbl_ld_cbiao_list.f_bkid.length > 200)
            {			
                errorMessageHansMap.put('search_f_bk_tbl_ld_cbiao_list', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_cbiao_list.f_ztid.length > 200)
            {			
                errorMessageHansMap.put('search_f_zt_tbl_ld_cbiao_list', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_cbiao_list.f_lyid.length > 200)
            {			
                errorMessageHansMap.put('search_f_ly_tbl_ld_cbiao_list', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_cbiao_list.f_bz.length > 200)
            {			
                errorMessageHansMap.put('search_f_bz_tbl_ld_cbiao_list', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_cbiao_list.f_yhm.length > 200)
            {			
                errorMessageHansMap.put('search_f_yhm_tbl_ld_cbiao_list', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_cbiao_list.f_jfm.length > 200)
            {			
                errorMessageHansMap.put('search_f_jfm_tbl_ld_cbiao_list', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_cbiao_list.f_dy.length > 200)
            {			
                errorMessageHansMap.put('search_f_dy_tbl_ld_cbiao_list', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_cbiao_list.f_dyid.length > 200)
            {			
                errorMessageHansMap.put('search_f_dyid_tbl_ld_cbiao_list', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_cbiao_list.f_sc.length > 200)
            {			
                errorMessageHansMap.put('search_f_sc_tbl_ld_cbiao_list', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_cbiao_list.f_scid.length > 200)
            {			
                errorMessageHansMap.put('search_f_scid_tbl_ld_cbiao_list', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_cbiao_list.f_qy.length > 200)
            {			
                errorMessageHansMap.put('search_f_qy_tbl_ld_cbiao_list', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_cbiao_list.f_qyid.length > 200)
            {			
                errorMessageHansMap.put('search_f_qyid_tbl_ld_cbiao_list', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_cbiao_list.f_pq.length > 200)
            {			
                errorMessageHansMap.put('search_f_pq_tbl_ld_cbiao_list', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_cbiao_list.f_pqid.length > 200)
            {			
                errorMessageHansMap.put('search_f_pqid_tbl_ld_cbiao_list', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_cbiao_list.f_lxtkhh.length > 200)
            {			
                errorMessageHansMap.put('search_f_lxtkhh_tbl_ld_cbiao_list', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_cbiao_list.f_pgbh.length > 200)
            {			
                errorMessageHansMap.put('search_f_pgbh_tbl_ld_cbiao_list', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_cbiao_list.f_pgbhid.length > 200)
            {			
                errorMessageHansMap.put('search_f_pgbhid_tbl_ld_cbiao_list', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_cbiao_list.f_pgr.length > 200)
            {			
                errorMessageHansMap.put('search_f_pgr_tbl_ld_cbiao_list', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_cbiao_list.f_pgrid.length > 200)
            {			
                errorMessageHansMap.put('search_f_pgrid_tbl_ld_cbiao_list', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_cbiao_list.f_pgpcmc.length > 200)
            {			
                errorMessageHansMap.put('search_f_pgpcmc_tbl_ld_cbiao_list', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		
         

            		   
            if (tbl_ld_cbiao_list.f_jfbh.length > 200)
            {			
                errorMessageHansMap.put('search_f_jfbh_tbl_ld_cbiao_list', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_cbiao_list.f_jfbhid.length > 200)
            {			
                errorMessageHansMap.put('search_f_jfbhid_tbl_ld_cbiao_list', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		
         

            		   
            if (tbl_ld_cbiao_list.f_bqje.length > 200)
            {			
                errorMessageHansMap.put('search_f_bqje_tbl_ld_cbiao_list', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		
         

            		
         

            		
         

            		   
            if (tbl_ld_cbiao_list.f_cbbh.length > 200)
            {			
                errorMessageHansMap.put('search_f_cbbh_tbl_ld_cbiao_list', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_cbiao_list.f_cbmc.length > 200)
            {			
                errorMessageHansMap.put('search_f_cbmc_tbl_ld_cbiao_list', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_cbiao_list.f_cb_cbbh.length > 200)
            {			
                errorMessageHansMap.put('search_f_cb_cbbh_tbl_ld_cbiao_list', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_cbiao_list.f_yhbh.length > 200)
            {			
                errorMessageHansMap.put('search_f_yhbh_tbl_ld_cbiao_list', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_cbiao_list.f_yhbhid.length > 200)
            {			
                errorMessageHansMap.put('search_f_yhbhid_tbl_ld_cbiao_list', '长度不能超过<a style="color:red">200</a>个字');
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
				controlObj.text('search_f_value1_tbl_ld_cbiao_list', that._pr_searchcontent.type2.f_value1);                          	
					      
								
									that._pr_searchcontent.type2.f_value2 = '';
				controlObj.text('search_f_value2_tbl_ld_cbiao_list', that._pr_searchcontent.type2.f_value2);                          	
					      
								
									that._pr_searchcontent.type2.f_value3 = '';
				controlObj.text('search_f_value3_tbl_ld_cbiao_list', that._pr_searchcontent.type2.f_value3);                          	
					      
								
									that._pr_searchcontent.type2.f_value4 = '';
				controlObj.text('search_f_value4_tbl_ld_cbiao_list', that._pr_searchcontent.type2.f_value4);                          	
					      
								
									that._pr_searchcontent.type2.f_value5 = '';
				controlObj.text('search_f_value5_tbl_ld_cbiao_list', that._pr_searchcontent.type2.f_value5);                          	
					      
								
									that._pr_searchcontent.type2.f_value6 = '';
				controlObj.text('search_f_value6_tbl_ld_cbiao_list', that._pr_searchcontent.type2.f_value6);                          	
					      
								
									that._pr_searchcontent.type2.f_value7 = '';
				controlObj.text('search_f_value7_tbl_ld_cbiao_list', that._pr_searchcontent.type2.f_value7);                          	
					      
								
									that._pr_searchcontent.type2.f_value8 = '';
				controlObj.text('search_f_value8_tbl_ld_cbiao_list', that._pr_searchcontent.type2.f_value8);                          	
					      
								
									that._pr_searchcontent.type2.f_value9 = '';
				controlObj.text('search_f_value9_tbl_ld_cbiao_list', that._pr_searchcontent.type2.f_value9);                          	
					      
								
									that._pr_searchcontent.type2.f_value10 = '';
				controlObj.text('search_f_value10_tbl_ld_cbiao_list', that._pr_searchcontent.type2.f_value10);                          	
					      
								
									that._pr_searchcontent.type2.f_cbbhid = '';
				controlObj.text('search_f_cbbhid_tbl_ld_cbiao_list', that._pr_searchcontent.type2.f_cbbhid);                          	
					      
								
									that._pr_searchcontent.type2.f_khbh = '';
				controlObj.text('search_f_khbh_tbl_ld_cbiao_list', that._pr_searchcontent.type2.f_khbh);                          	
					      
								
									that._pr_searchcontent.type2.f_sqzm = '';
				controlObj.text('search_f_sqzm_tbl_ld_cbiao_list', that._pr_searchcontent.type2.f_sqzm);                          	
					      
								
									that._pr_searchcontent.type2.f_bqzm = '';
				controlObj.text('search_f_bqzm_tbl_ld_cbiao_list', that._pr_searchcontent.type2.f_bqzm);                          	
					      
								
									that._pr_searchcontent.type2.f_bqsl = '';
				controlObj.text('search_f_bqsl_tbl_ld_cbiao_list', that._pr_searchcontent.type2.f_bqsl);                          	
					      
								
									that._pr_searchcontent.type2.f_sqsl = '';
				controlObj.text('search_f_sqsl_tbl_ld_cbiao_list', that._pr_searchcontent.type2.f_sqsl);                          	
					      
								
									that._pr_searchcontent.type2.f_qsqpjsl = '';
				controlObj.text('search_f_qsqpjsl_tbl_ld_cbiao_list', that._pr_searchcontent.type2.f_qsqpjsl);                          	
					      
								
									that._pr_searchcontent.type2.f_qlqpjsl = '';
				controlObj.text('search_f_qlqpjsl_tbl_ld_cbiao_list', that._pr_searchcontent.type2.f_qlqpjsl);                          	
					      
								
									that._pr_searchcontent.type2.f_cbyname = '';
				controlObj.text('search_f_cbyname_tbl_ld_cbiao_list', that._pr_searchcontent.type2.f_cbyname);                          	
					      
								
									that._pr_searchcontent.type2.f_cbsjfrom = ('1900-01-01 00:00:00');
				that._pr_searchcontent.type2.f_cbsjto = ('1900-01-01 00:00:00');						
				controlObj.datetime('search_f_cbsj_tbl_ld_cbiao_list_datefrom', 'search_f_cbsj_tbl_ld_cbiao_list_timefrom', that._pr_searchcontent.type2.f_cbsjfrom);
				controlObj.datetime('search_f_cbsj_tbl_ld_cbiao_list_dateto', 'search_f_cbsj_tbl_ld_cbiao_list_timeto', that._pr_searchcontent.type2.f_cbsjto);                          	
					      
								
									that._pr_searchcontent.type2.f_bkid = '';
				controlObj.multidropdownlistid('search_f_bk_tbl_ld_cbiao_list', that._pr_searchcontent.type2.f_bkid);                          	
					      
								
									that._pr_searchcontent.type2.f_ztid = '';
				controlObj.multidropdownlistid('search_f_zt_tbl_ld_cbiao_list', that._pr_searchcontent.type2.f_ztid);                          	
					      
								
									that._pr_searchcontent.type2.f_lyid = '';
				controlObj.multidropdownlistid('search_f_ly_tbl_ld_cbiao_list', that._pr_searchcontent.type2.f_lyid);                          	
					      
								
									that._pr_searchcontent.type2.f_bz = '';
				controlObj.text('search_f_bz_tbl_ld_cbiao_list', that._pr_searchcontent.type2.f_bz);                          	
					      
								
									that._pr_searchcontent.type2.f_yhm = '';
				controlObj.text('search_f_yhm_tbl_ld_cbiao_list', that._pr_searchcontent.type2.f_yhm);                          	
					      
								
									that._pr_searchcontent.type2.f_jfm = '';
				controlObj.text('search_f_jfm_tbl_ld_cbiao_list', that._pr_searchcontent.type2.f_jfm);                          	
					      
								
									that._pr_searchcontent.type2.f_dy = '';
				controlObj.text('search_f_dy_tbl_ld_cbiao_list', that._pr_searchcontent.type2.f_dy);                          	
					      
								
									that._pr_searchcontent.type2.f_dyid = '';
				controlObj.text('search_f_dyid_tbl_ld_cbiao_list', that._pr_searchcontent.type2.f_dyid);                          	
					      
								
									that._pr_searchcontent.type2.f_sc = '';
				controlObj.text('search_f_sc_tbl_ld_cbiao_list', that._pr_searchcontent.type2.f_sc);                          	
					      
								
									that._pr_searchcontent.type2.f_scid = '';
				controlObj.text('search_f_scid_tbl_ld_cbiao_list', that._pr_searchcontent.type2.f_scid);                          	
					      
								
									that._pr_searchcontent.type2.f_qy = '';
				controlObj.text('search_f_qy_tbl_ld_cbiao_list', that._pr_searchcontent.type2.f_qy);                          	
					      
								
									that._pr_searchcontent.type2.f_qyid = '';
				controlObj.text('search_f_qyid_tbl_ld_cbiao_list', that._pr_searchcontent.type2.f_qyid);                          	
					      
								
									that._pr_searchcontent.type2.f_pq = '';
				controlObj.text('search_f_pq_tbl_ld_cbiao_list', that._pr_searchcontent.type2.f_pq);                          	
					      
								
									that._pr_searchcontent.type2.f_pqid = '';
				controlObj.text('search_f_pqid_tbl_ld_cbiao_list', that._pr_searchcontent.type2.f_pqid);                          	
					      
								
									that._pr_searchcontent.type2.f_lxtkhh = '';
				controlObj.text('search_f_lxtkhh_tbl_ld_cbiao_list', that._pr_searchcontent.type2.f_lxtkhh);                          	
					      
								
									that._pr_searchcontent.type2.f_pgbh = '';
				controlObj.text('search_f_pgbh_tbl_ld_cbiao_list', that._pr_searchcontent.type2.f_pgbh);                          	
					      
								
									that._pr_searchcontent.type2.f_pgbhid = '';
				controlObj.text('search_f_pgbhid_tbl_ld_cbiao_list', that._pr_searchcontent.type2.f_pgbhid);                          	
					      
								
									that._pr_searchcontent.type2.f_pgr = '';
				controlObj.text('search_f_pgr_tbl_ld_cbiao_list', that._pr_searchcontent.type2.f_pgr);                          	
					      
								
									that._pr_searchcontent.type2.f_pgrid = '';
				controlObj.text('search_f_pgrid_tbl_ld_cbiao_list', that._pr_searchcontent.type2.f_pgrid);                          	
					      
								
									that._pr_searchcontent.type2.f_pgpcmc = '';
				controlObj.text('search_f_pgpcmc_tbl_ld_cbiao_list', that._pr_searchcontent.type2.f_pgpcmc);                          	
					      
								
									that._pr_searchcontent.type2.f_pgsjfrom = ('1900-01-01 00:00:00');
				that._pr_searchcontent.type2.f_pgsjto = ('1900-01-01 00:00:00');						
				controlObj.datetime('search_f_pgsj_tbl_ld_cbiao_list_datefrom', 'search_f_pgsj_tbl_ld_cbiao_list_timefrom', that._pr_searchcontent.type2.f_pgsjfrom);
				controlObj.datetime('search_f_pgsj_tbl_ld_cbiao_list_dateto', 'search_f_pgsj_tbl_ld_cbiao_list_timeto', that._pr_searchcontent.type2.f_pgsjto);                          	
					      
								
									that._pr_searchcontent.type2.f_jfbh = '';
				controlObj.text('search_f_jfbh_tbl_ld_cbiao_list', that._pr_searchcontent.type2.f_jfbh);                          	
					      
								
									that._pr_searchcontent.type2.f_jfbhid = '';
				controlObj.text('search_f_jfbhid_tbl_ld_cbiao_list', that._pr_searchcontent.type2.f_jfbhid);                          	
					      
								
									that._pr_searchcontent.type2.f_jfsjfrom = ('1900-01-01 00:00:00');
				that._pr_searchcontent.type2.f_jfsjto = ('1900-01-01 00:00:00');						
				controlObj.datetime('search_f_jfsj_tbl_ld_cbiao_list_datefrom', 'search_f_jfsj_tbl_ld_cbiao_list_timefrom', that._pr_searchcontent.type2.f_jfsjfrom);
				controlObj.datetime('search_f_jfsj_tbl_ld_cbiao_list_dateto', 'search_f_jfsj_tbl_ld_cbiao_list_timeto', that._pr_searchcontent.type2.f_jfsjto);                          	
					      
								
									that._pr_searchcontent.type2.f_bqje = '';
				controlObj.text('search_f_bqje_tbl_ld_cbiao_list', that._pr_searchcontent.type2.f_bqje);                          	
					      
								
									that._pr_searchcontent.type2.f_sbbh = '';
				controlObj.text('search_f_sbbh_tbl_ld_cbiao_list', that._pr_searchcontent.type2.f_sbbh);                          	
					      
								
									that._pr_searchcontent.type2.f_sblx = '';
				controlObj.text('search_f_sblx_tbl_ld_cbiao_list', that._pr_searchcontent.type2.f_sblx);                          	
					      
								
									that._pr_searchcontent.type2.f_yslx = '';
				controlObj.text('search_f_yslx_tbl_ld_cbiao_list', that._pr_searchcontent.type2.f_yslx);                          	
					      
								
									that._pr_searchcontent.type2.f_cbbh = '';
				controlObj.text('search_f_cbbh_tbl_ld_cbiao_list', that._pr_searchcontent.type2.f_cbbh);                          	
					      
								
									that._pr_searchcontent.type2.f_cbmc = '';
				controlObj.text('search_f_cbmc_tbl_ld_cbiao_list', that._pr_searchcontent.type2.f_cbmc);                          	
					      
								
									that._pr_searchcontent.type2.f_cb_cbbh = '';
				controlObj.text('search_f_cb_cbbh_tbl_ld_cbiao_list', that._pr_searchcontent.type2.f_cb_cbbh);                          	
					      
								
									that._pr_searchcontent.type2.f_yhbh = '';
				controlObj.text('search_f_yhbh_tbl_ld_cbiao_list', that._pr_searchcontent.type2.f_yhbh);                          	
					      
								
									that._pr_searchcontent.type2.f_yhbhid = '';
				controlObj.text('search_f_yhbhid_tbl_ld_cbiao_list', that._pr_searchcontent.type2.f_yhbhid);                          	
					      
				 

                break;
            case "2":
                if (that._pr_searchcontent.type1 == undefined)
                {
                    that._pr_searchcontent.type1 = '';
                }

                $("#txt_command_search_tbl_ld_cbiao_list").val('');
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
                       
														 	    whereClause += " f_cbbhid like '%" + vv[i] + "%' or ";
						
														 	    whereClause += " f_khbh like '%" + vv[i] + "%' or ";
						
														 	    whereClause += " f_sqzm like '%" + vv[i] + "%' or ";
						
														 	    whereClause += " f_bqzm like '%" + vv[i] + "%' or ";
						
														 	    whereClause += " f_bqsl like '%" + vv[i] + "%' or ";
						
														 	    whereClause += " f_sqsl like '%" + vv[i] + "%' or ";
						
														 	    whereClause += " f_qsqpjsl like '%" + vv[i] + "%' or ";
						
														 	    whereClause += " f_qlqpjsl like '%" + vv[i] + "%' or ";
						
														 	    whereClause += " f_cbyname like '%" + vv[i] + "%' or ";
						
													
								    whereClause += " to_char(f_cbsj,'yyyy-MM-dd hh24:mi:ss') like '%" + vv[i] + "%' or ";
						
														 	    whereClause += " f_bk like '%" + vv[i] + "%' or ";
						
														 	    whereClause += " f_zt like '%" + vv[i] + "%' or ";
						
														 	    whereClause += " f_ly like '%" + vv[i] + "%' or ";
						
														 	    whereClause += " f_bz like '%" + vv[i] + "%' or ";
						
														 	    whereClause += " f_yhm like '%" + vv[i] + "%' or ";
						
														 	    whereClause += " f_jfm like '%" + vv[i] + "%' or ";
						
														 	    whereClause += " f_dy like '%" + vv[i] + "%' or ";
						
														 	    whereClause += " f_dyid like '%" + vv[i] + "%' or ";
						
														 	    whereClause += " f_sc like '%" + vv[i] + "%' or ";
						
														 	    whereClause += " f_scid like '%" + vv[i] + "%' or ";
						
														 	    whereClause += " f_qy like '%" + vv[i] + "%' or ";
						
														 	    whereClause += " f_qyid like '%" + vv[i] + "%' or ";
						
														 	    whereClause += " f_pq like '%" + vv[i] + "%' or ";
						
														 	    whereClause += " f_pqid like '%" + vv[i] + "%' or ";
						
														 	    whereClause += " f_lxtkhh like '%" + vv[i] + "%' or ";
						
														 	    whereClause += " f_pgbh like '%" + vv[i] + "%' or ";
						
														 	    whereClause += " f_pgbhid like '%" + vv[i] + "%' or ";
						
														 	    whereClause += " f_pgr like '%" + vv[i] + "%' or ";
						
														 	    whereClause += " f_pgrid like '%" + vv[i] + "%' or ";
						
														 	    whereClause += " f_pgpcmc like '%" + vv[i] + "%' or ";
						
													
								    whereClause += " to_char(f_pgsj,'yyyy-MM-dd hh24:mi:ss') like '%" + vv[i] + "%' or ";
						
														 	    whereClause += " f_jfbh like '%" + vv[i] + "%' or ";
						
														 	    whereClause += " f_jfbhid like '%" + vv[i] + "%' or ";
						
													
								    whereClause += " to_char(f_jfsj,'yyyy-MM-dd hh24:mi:ss') like '%" + vv[i] + "%' or ";
						
														 	    whereClause += " f_bqje like '%" + vv[i] + "%' or ";
						
														 	    whereClause += " f_sbbh like '%" + vv[i] + "%' or ";
						
														 	    whereClause += " f_sblx like '%" + vv[i] + "%' or ";
						
														 	    whereClause += " f_yslx like '%" + vv[i] + "%' or ";
						
														 	    whereClause += " f_cbbh like '%" + vv[i] + "%' or ";
						
														 	    whereClause += " f_cbmc like '%" + vv[i] + "%' or ";
						
														 	    whereClause += " f_cb_cbbh like '%" + vv[i] + "%' or ";
						
														 	    whereClause += " f_yhbh like '%" + vv[i] + "%' or ";
						
														 	    whereClause += " f_yhbhid like '%" + vv[i] + "%' or ";
						 
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

                        var tbl_ld_cbiao_list = that._pr_searchcontent.type2;
             
        
			 			
				        if (tbl_ld_cbiao_list.f_cbbhid.length > 0)
                        {
                            whereClause += " f_cbbhid like '%" + tbl_ld_cbiao_list.f_cbbhid + "%' and ";
                        }	
		
			 			
				        if (tbl_ld_cbiao_list.f_khbh.length > 0)
                        {
                            whereClause += " f_khbh like '%" + tbl_ld_cbiao_list.f_khbh + "%' and ";
                        }	
		
			 			
				        if (tbl_ld_cbiao_list.f_sqzm.length > 0)
                        {
                            whereClause += " f_sqzm like '%" + tbl_ld_cbiao_list.f_sqzm + "%' and ";
                        }	
		
			 			
				        if (tbl_ld_cbiao_list.f_bqzm.length > 0)
                        {
                            whereClause += " f_bqzm like '%" + tbl_ld_cbiao_list.f_bqzm + "%' and ";
                        }	
		
			 			
				        if (tbl_ld_cbiao_list.f_bqsl.length > 0)
                        {
                            whereClause += " f_bqsl like '%" + tbl_ld_cbiao_list.f_bqsl + "%' and ";
                        }	
		
			 			
				        if (tbl_ld_cbiao_list.f_sqsl.length > 0)
                        {
                            whereClause += " f_sqsl like '%" + tbl_ld_cbiao_list.f_sqsl + "%' and ";
                        }	
		
			 			
				        if (tbl_ld_cbiao_list.f_qsqpjsl.length > 0)
                        {
                            whereClause += " f_qsqpjsl like '%" + tbl_ld_cbiao_list.f_qsqpjsl + "%' and ";
                        }	
		
			 			
				        if (tbl_ld_cbiao_list.f_qlqpjsl.length > 0)
                        {
                            whereClause += " f_qlqpjsl like '%" + tbl_ld_cbiao_list.f_qlqpjsl + "%' and ";
                        }	
		
			 			
				        if (tbl_ld_cbiao_list.f_cbyname.length > 0)
                        {
                            whereClause += " f_cbyname like '%" + tbl_ld_cbiao_list.f_cbyname + "%' and ";
                        }	
		
				
			 	        if (tbl_ld_cbiao_list.f_cbsjfrom != '1900-01-01 00:00:00')
                        {
                            whereClause += " f_cbsj >= to_date('" + tbl_ld_cbiao_list.f_cbsjfrom + "','yyyy-MM-dd hh24:mi:ss') and ";
                        }

			            if (tbl_ld_cbiao_list.f_cbsjto != '1900-01-01 00:00:00')
                        {
			                whereClause += " f_cbsj <= to_date('" + tbl_ld_cbiao_list.f_cbsjto + "','yyyy-MM-dd hh24:mi:ss') and ";
                        }
		
						
					    if (tbl_ld_cbiao_list.f_bkid.length > 0)
                        {
                            var elementArray = tbl_ld_cbiao_list.f_bkid.split(',');
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
                                whereClause += "((','||f_bkid||',') like ('%,'||'" + elementArray[i] + "'||',%')) ";

                            });
                            whereClause += ') and ';
                        }
		
						
					    if (tbl_ld_cbiao_list.f_ztid.length > 0)
                        {
                            var elementArray = tbl_ld_cbiao_list.f_ztid.split(',');
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
		
						
					    if (tbl_ld_cbiao_list.f_lyid.length > 0)
                        {
                            var elementArray = tbl_ld_cbiao_list.f_lyid.split(',');
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
                                whereClause += "((','||f_lyid||',') like ('%,'||'" + elementArray[i] + "'||',%')) ";

                            });
                            whereClause += ') and ';
                        }
		
			 			
				        if (tbl_ld_cbiao_list.f_bz.length > 0)
                        {
                            whereClause += " f_bz like '%" + tbl_ld_cbiao_list.f_bz + "%' and ";
                        }	
		
			 			
				        if (tbl_ld_cbiao_list.f_yhm.length > 0)
                        {
                            whereClause += " f_yhm like '%" + tbl_ld_cbiao_list.f_yhm + "%' and ";
                        }	
		
			 			
				        if (tbl_ld_cbiao_list.f_jfm.length > 0)
                        {
                            whereClause += " f_jfm like '%" + tbl_ld_cbiao_list.f_jfm + "%' and ";
                        }	
		
			 			
				        if (tbl_ld_cbiao_list.f_dy.length > 0)
                        {
                            whereClause += " f_dy like '%" + tbl_ld_cbiao_list.f_dy + "%' and ";
                        }	
		
			 			
				        if (tbl_ld_cbiao_list.f_dyid.length > 0)
                        {
                            whereClause += " f_dyid like '%" + tbl_ld_cbiao_list.f_dyid + "%' and ";
                        }	
		
			 			
				        if (tbl_ld_cbiao_list.f_sc.length > 0)
                        {
                            whereClause += " f_sc like '%" + tbl_ld_cbiao_list.f_sc + "%' and ";
                        }	
		
			 			
				        if (tbl_ld_cbiao_list.f_scid.length > 0)
                        {
                            whereClause += " f_scid like '%" + tbl_ld_cbiao_list.f_scid + "%' and ";
                        }	
		
			 			
				        if (tbl_ld_cbiao_list.f_qy.length > 0)
                        {
                            whereClause += " f_qy like '%" + tbl_ld_cbiao_list.f_qy + "%' and ";
                        }	
		
			 			
				        if (tbl_ld_cbiao_list.f_qyid.length > 0)
                        {
                            whereClause += " f_qyid like '%" + tbl_ld_cbiao_list.f_qyid + "%' and ";
                        }	
		
			 			
				        if (tbl_ld_cbiao_list.f_pq.length > 0)
                        {
                            whereClause += " f_pq like '%" + tbl_ld_cbiao_list.f_pq + "%' and ";
                        }	
		
			 			
				        if (tbl_ld_cbiao_list.f_pqid.length > 0)
                        {
                            whereClause += " f_pqid like '%" + tbl_ld_cbiao_list.f_pqid + "%' and ";
                        }	
		
			 			
				        if (tbl_ld_cbiao_list.f_lxtkhh.length > 0)
                        {
                            whereClause += " f_lxtkhh like '%" + tbl_ld_cbiao_list.f_lxtkhh + "%' and ";
                        }	
		
			 			
				        if (tbl_ld_cbiao_list.f_pgbh.length > 0)
                        {
                            whereClause += " f_pgbh like '%" + tbl_ld_cbiao_list.f_pgbh + "%' and ";
                        }	
		
			 			
				        if (tbl_ld_cbiao_list.f_pgbhid.length > 0)
                        {
                            whereClause += " f_pgbhid like '%" + tbl_ld_cbiao_list.f_pgbhid + "%' and ";
                        }	
		
			 			
				        if (tbl_ld_cbiao_list.f_pgr.length > 0)
                        {
                            whereClause += " f_pgr like '%" + tbl_ld_cbiao_list.f_pgr + "%' and ";
                        }	
		
			 			
				        if (tbl_ld_cbiao_list.f_pgrid.length > 0)
                        {
                            whereClause += " f_pgrid like '%" + tbl_ld_cbiao_list.f_pgrid + "%' and ";
                        }	
		
			 			
				        if (tbl_ld_cbiao_list.f_pgpcmc.length > 0)
                        {
                            whereClause += " f_pgpcmc like '%" + tbl_ld_cbiao_list.f_pgpcmc + "%' and ";
                        }	
		
				
			 	        if (tbl_ld_cbiao_list.f_pgsjfrom != '1900-01-01 00:00:00')
                        {
                            whereClause += " f_pgsj >= to_date('" + tbl_ld_cbiao_list.f_pgsjfrom + "','yyyy-MM-dd hh24:mi:ss') and ";
                        }

			            if (tbl_ld_cbiao_list.f_pgsjto != '1900-01-01 00:00:00')
                        {
			                whereClause += " f_pgsj <= to_date('" + tbl_ld_cbiao_list.f_pgsjto + "','yyyy-MM-dd hh24:mi:ss') and ";
                        }
		
			 			
				        if (tbl_ld_cbiao_list.f_jfbh.length > 0)
                        {
                            whereClause += " f_jfbh like '%" + tbl_ld_cbiao_list.f_jfbh + "%' and ";
                        }	
		
			 			
				        if (tbl_ld_cbiao_list.f_jfbhid.length > 0)
                        {
                            whereClause += " f_jfbhid like '%" + tbl_ld_cbiao_list.f_jfbhid + "%' and ";
                        }	
		
				
			 	        if (tbl_ld_cbiao_list.f_jfsjfrom != '1900-01-01 00:00:00')
                        {
                            whereClause += " f_jfsj >= to_date('" + tbl_ld_cbiao_list.f_jfsjfrom + "','yyyy-MM-dd hh24:mi:ss') and ";
                        }

			            if (tbl_ld_cbiao_list.f_jfsjto != '1900-01-01 00:00:00')
                        {
			                whereClause += " f_jfsj <= to_date('" + tbl_ld_cbiao_list.f_jfsjto + "','yyyy-MM-dd hh24:mi:ss') and ";
                        }
		
			 			
				        if (tbl_ld_cbiao_list.f_bqje.length > 0)
                        {
                            whereClause += " f_bqje like '%" + tbl_ld_cbiao_list.f_bqje + "%' and ";
                        }	
		
			 			
				        if (tbl_ld_cbiao_list.f_sbbh.length > 0)
                        {
                            whereClause += " f_sbbh like '%" + tbl_ld_cbiao_list.f_sbbh + "%' and ";
                        }	
		
			 			
				        if (tbl_ld_cbiao_list.f_sblx.length > 0)
                        {
                            whereClause += " f_sblx like '%" + tbl_ld_cbiao_list.f_sblx + "%' and ";
                        }	
		
			 			
				        if (tbl_ld_cbiao_list.f_yslx.length > 0)
                        {
                            whereClause += " f_yslx like '%" + tbl_ld_cbiao_list.f_yslx + "%' and ";
                        }	
		
			 			
				        if (tbl_ld_cbiao_list.f_cbbh.length > 0)
                        {
                            whereClause += " f_cbbh like '%" + tbl_ld_cbiao_list.f_cbbh + "%' and ";
                        }	
		
			 			
				        if (tbl_ld_cbiao_list.f_cbmc.length > 0)
                        {
                            whereClause += " f_cbmc like '%" + tbl_ld_cbiao_list.f_cbmc + "%' and ";
                        }	
		
			 			
				        if (tbl_ld_cbiao_list.f_cb_cbbh.length > 0)
                        {
                            whereClause += " f_cb_cbbh like '%" + tbl_ld_cbiao_list.f_cb_cbbh + "%' and ";
                        }	
		
			 			
				        if (tbl_ld_cbiao_list.f_yhbh.length > 0)
                        {
                            whereClause += " f_yhbh like '%" + tbl_ld_cbiao_list.f_yhbh + "%' and ";
                        }	
		
			 			
				        if (tbl_ld_cbiao_list.f_yhbhid.length > 0)
                        {
                            whereClause += " f_yhbhid like '%" + tbl_ld_cbiao_list.f_yhbhid + "%' and ";
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
            $('#btn_command_clearselect_tbl_ld_cbiao_list').addClass('hidden');
        }
        else
        {
            $('#btn_command_clearselect_tbl_ld_cbiao_list').removeClass('hidden');
            var allcount = that._pr_gridselectids.split('^').length;
            var currentcount = $('#table_grid_tbl_ld_cbiao_list').bootstrapTable('getSelections').length;
            $('#btn_command_clearselect_tbl_ld_cbiao_list .cc-badge-p').html(currentcount + '/' + allcount); 
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
            var columnsarray = [
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
                                     if (row.f_lyid == '05450003')
                                     {
                                         return {
                                             disabled: true
                                         }
                                     }
                                     switch (row.f_ztid)
                                     {
                                         case "0":
                                             {
                                                 if (('^' + that._pr_gridselectids + '^').indexOf('^' + row.sys_id + '^') > -1)
                                                 {
                                                     return {
                                                         disabled: false,
                                                         checked: true
                                                     }
                                                 }
                                                 else
                                                 {
                                                     return {
                                                         disabled: false,
                                                         checked: false
                                                     }
                                                 }
                                             }
                                             break;
                                         case "1":
                                         case "2":
                                         case "3":
                                         case "9":
                                             {
                                                 return {
                                                     disabled: true
                                                 }
                                             }
                                             break;
                                     }
                                 }
                                 break;
                                 //制度模式
                             case "2":
                                 {
                                     return {
                                         disabled: true
                                     }
                                 }
                                 break;
                         }
                     }
                 },
                 {
                     field: 'sys_id', title: 'sys_id',
                     align: 'center',
                     "class": 'hidden',
                     valign: 'middle',
                     visible: true,
                     sortable: false,
                 }
            ];
            var columnHashMap = new hashMap();
            //根据页面情况设置Grid的高度
            var gridHeight = 600;
            var columnHashMap = new hashMap();
            columnHashMap.put('f_cb_cbbh', {
                field: 'f_cb_cbbh',
                title: "抄表编号",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;

                    return resultStr;
                }
            });
            columnHashMap.put('f_khbh', {
                field: 'f_khbh',
                title: "客户编号",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
            {
                    var resultStr = value;

                    return resultStr;
                }
            });            
            columnHashMap.put('f_sqzm', {

                field: 'f_sqzm',
                title: "上期止码",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;

                    return resultStr;
                }
            });
            columnHashMap.put('f_bqzm', {
                field: 'f_bqzm',
                title: "本期止码",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;
                    return resultStr;
                }
            });
            columnHashMap.put('f_bqsl', {
                field: 'f_bqsl',
                title: "本期水量",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;
                    return resultStr;
                }
            });
            columnHashMap.put('f_sqsl', {
                field: 'f_sqsl',
                title: "上期水量",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;
                    return resultStr;
                }
            });
            columnHashMap.put('f_qsqpjsl', {
                field: 'f_qsqpjsl',
                title: "前三期平均水量",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;
                    return resultStr;
                }
            });
            columnHashMap.put('f_qlqpjsl', {
                field: 'f_qlqpjsl',
                title: "前六期平均水量",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;
                    return resultStr;
                }
            });
            columnHashMap.put('f_cbyname', {
                field: 'f_cbyname',
                title: "抄表员",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;
                    return resultStr;
                }
            });
            columnHashMap.put('f_cbsj', {
                field: 'f_cbsj',
                title: "抄表时间",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    if (value == "")
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
            });
            columnHashMap.put('f_bk', {
                field: 'f_bk',
                title: "表况",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;
                    return resultStr;
                }
            });
            columnHashMap.put('f_zt', {
                field: 'f_zt',
                title: "状态",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;
                    return resultStr;
                }
            });
            columnHashMap.put('f_ly', {
                field: 'f_ly',
                title: "来源",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;
                    return resultStr;
                }
            });
            columnHashMap.put('f_bz', {
                field: 'f_bz',
                title: "备注",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;
                    return resultStr;
                }
            });
            columnHashMap.put('f_sbbh', {
                field: 'f_sbbh',
                title: "水表编号",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;
                    return resultStr;
                }
            });
            columnHashMap.put('f_sblx', {
                field: 'f_sblx',
                title: "水表类型",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;
                    return resultStr;
                }
            });
            columnHashMap.put('f_yslx', {
                field: 'f_yslx',
                title: "用水类型",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;
                    return resultStr;
                }
            });
            columnHashMap.put('f_lxtkhh', {
                field: 'f_lxtkhh',
                title: "老系统客户号",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;
                    return resultStr;
                }
            });
            columnHashMap.put('f_cbbh', {
                field: 'f_cbbh',
                title: "抄本编号",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;
                    return resultStr;
                }
            });
            columnHashMap.put('f_cbmc', {
                field: 'f_cbmc',
                title: "抄本名称",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;
                    return resultStr;
                }
            });
            columnHashMap.put('f_yhbh', {
                field: 'f_yhbh',
                title: "用户编号",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;
                    return resultStr;
                }
            });
            columnHashMap.put('f_yhm', {
                field: 'f_yhm',
                title: "用户名",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;
                    return resultStr;
                }
            });
            columnHashMap.put('f_jfm', {
                field: 'f_jfm',
                title: "缴费名",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;
                    return resultStr;
                }
            });
            columnHashMap.put('f_dh', {
                field: 'f_dh',
                title: "电话",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;
                    return resultStr;
                }
            });
            columnHashMap.put('f_dz', {
                field: 'f_dz',
                title: "地址",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;
                    return resultStr;
                }
            });
            columnHashMap.put('f_dy', {
                field: 'f_dy',
                title: "地域",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;
                    return resultStr;
                }
            });
            columnHashMap.put('f_sc', {
                field: 'f_sc',
                title: "水厂",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;
                    return resultStr;
                }
            });
            columnHashMap.put('f_qy', {
                field: 'f_qy',
                title: "区域",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;
                    return resultStr;
                }
            });
            columnHashMap.put('f_pq', {
                field: 'f_pq',
                title: "片区",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;
                    return resultStr;
                }
            });
            columnHashMap.put('f_pgbh', {
                field: 'f_pgbh',
                title: "评估编号",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;
                    return resultStr;
                }
            });
            columnHashMap.put('f_pgr', {
                field: 'f_pgr',
                title: "评估人",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;
                    return resultStr;
                }
            });
            columnHashMap.put('f_pgpcmc', {
                field: 'f_pgpcmc',
                title: "评估批次名称",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;
                    return resultStr;
                }
            });
            columnHashMap.put('f_pgsj', {
                field: 'f_pgsj',
                title: "评估时间",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    if (value == "")
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
            });
            columnHashMap.put('f_jfbh', {
                field: 'f_jfbh',
                title: "缴费编号",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;
                    return resultStr;
                }
            });
            columnHashMap.put('f_jfsj', {
                field: 'f_jfsj',
                title: "缴费时间",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    if (value == "")
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
            });
            columnHashMap.put('f_bqje', {
                field: 'f_bqje',
                title: "本期金额",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    if (row.f_ztid == '1')
                    {                       
                        return row.f_value1;
                    }
                    else
                    {
                        var resultStr = value;
                        return resultStr;
                    }
                }
            });
            columnHashMap.put('f_kj', {
                field: 'f_kj',
                title: "口径",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;
                    return resultStr;
                }
            });
            columnHashMap.put('f_ztkhh', {
                field: 'f_ztkhh',
                title: "旧客户号",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;
                    return resultStr;
                }
            });
            columnHashMap.put('f_ztsbh', {
                field: 'f_ztsbh',
                title: "旧水表号",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;
                    return resultStr;
                }
            });
            columnHashMap.put('f_ztyhh', {
                field: 'f_ztyhh',
                title: "旧用户号",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;
                    return resultStr;
                }
            });
            columnHashMap.put('f_rs', {
                field: 'f_rs',
                title: "人数",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;
                    return resultStr;
                }
            });
            columnHashMap.put('f_khfz', {
                field: 'f_khfz',
                title: "客户分组",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;
                    return resultStr;
                }
            });
            columnHashMap.put('f_sf', {
                field: 'f_sf',
                title: "水费",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    if (row.f_ztid == '1')
                    {
                        var sfstr = row.f_value2.split('|')[0];
                        var resultStr = sfstr.split('^')[0];
                        return resultStr;
                    }
                    else
                    {
                        var resultStr = value;
                        return resultStr;
                    }
                }
            });
            columnHashMap.put('f_pwf', {
                field: 'f_pwf',
                title: "污水处理费",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    if (row.f_ztid == '1')
                    {
                        var sfstr = row.f_value2.split('|')[0];
                        var resultStr = sfstr.split('^')[1];
                        return resultStr;
                    }
                    else
                    {
                        var resultStr = value;
                        return resultStr;
                    }
                }
            });
            columnHashMap.put('f_sjljsyl', {
                field: 'f_sjljsyl',
                title: "年累计购量",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;
                    return resultStr;
                }
            });
            columnHashMap.put('f_jmje', {
                field: 'f_jmje',
                title: "减免金额",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;
                    return resultStr;
                }
            });
            columnHashMap.put('f_jmbh', {
                field: 'f_jmbh',
                title: "减免编号",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;
                    return resultStr;
                }
            });
            columnHashMap.put('f_sfsfts', {
                field: 'f_sfsfts',
                title: "是否算费提示",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    if (value == "true")
                    {
                        value = '是';
                    }
                    else
                    {
                        value = '否';
                    }
                    var resultStr = value;
                    return resultStr;
                }
            });
            columnHashMap.put('f_sfjl', {
                field: 'f_sfjl',
                title: "算法记录",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;
                    return resultStr;
                }
            });
            var column = getCookie("tbl_ld_cbiao_query_list_column");
            if (column != null && column != 'undefined' && column != "")
            {
                var ss = column.split(',');
                $.each(ss, function (i, u)
                {
                    var columnObj = columnHashMap.get(u.toLowerCase());
                    if (columnObj != undefined)
                    {
                        columnObj["class"] = '';
                        columnsarray.push(columnObj);
                    }
                });
            }
            else
            {

                var columnObj = columnHashMap.get('f_cb_cbbh');
                columnObj["class"] = '';
                columnsarray.push(columnObj);
                columnObj = columnHashMap.get('f_khbh');
                columnObj["class"] = '';
                columnsarray.push(columnObj);
                columnObj = columnHashMap.get('f_cbbh');
                columnObj["class"] = '';
                columnsarray.push(columnObj);
                columnObj = columnHashMap.get('f_yhm');
                columnObj["class"] = '';
                columnsarray.push(columnObj);
                columnObj = columnHashMap.get('f_jfm');
                columnObj["class"] = '';
                columnsarray.push(columnObj);
                columnObj = columnHashMap.get('f_dh');
                columnObj["class"] = '';
                columnsarray.push(columnObj);
                columnObj = columnHashMap.get('f_dz');
                columnObj["class"] = '';
                columnsarray.push(columnObj);
                columnObj = columnHashMap.get('f_sqzm');
                columnObj["class"] = '';
                columnsarray.push(columnObj);
                columnObj = columnHashMap.get('f_bqzm');
                columnObj["class"] = '';
                columnsarray.push(columnObj);
                columnObj = columnHashMap.get('f_sqsl');
                columnObj["class"] = '';
                columnsarray.push(columnObj);
                columnObj = columnHashMap.get('f_bqsl');
                columnObj["class"] = '';
                columnsarray.push(columnObj);
                //columnObj = columnHashMap.get('f_qsqpjsl');
                //columnObj["class"] = '';
                //columnsarray.push(columnObj);
                //columnObj = columnHashMap.get('f_qlqpjsl');
                //columnObj["class"] = '';
                //columnsarray.push(columnObj);
                columnObj = columnHashMap.get('f_sf');
                columnObj["class"] = '';
                columnsarray.push(columnObj);
                columnObj = columnHashMap.get('f_pwf');
                columnObj["class"] = '';
                columnsarray.push(columnObj);
                columnObj = columnHashMap.get('f_bqje');
                columnObj["class"] = '';
                columnsarray.push(columnObj);
                columnObj = columnHashMap.get('f_cbyname');
                columnObj["class"] = '';
                columnsarray.push(columnObj);
                columnObj = columnHashMap.get('f_cbsj');
                columnObj["class"] = '';
                columnsarray.push(columnObj);
                columnObj = columnHashMap.get('f_ly');
                columnObj["class"] = '';
                columnsarray.push(columnObj);
                columnObj = columnHashMap.get('f_zt');
                columnObj["class"] = '';
                columnsarray.push(columnObj);
                //columnObj = columnHashMap.get('f_bz');
                //columnObj["class"] = '';
                //columnsarray.push(columnObj);
            }

            $('#table_grid_tbl_ld_cbiao_list').bootstrapTable({
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
                                
							
                                                
                                
							
                                                
                                
							
                                                
                                
							
                                                
                                
							
                                                
                                
							
                                                
                                
							
                                                
                                
							
                                                
                                
							
                                                
                                
							
                                                
                                
							
                        
                        
                                                
                                
							
                        
                        
                                                
                                
							
                        
                        
                                                
                                
							
                        
                        
                                                
                                
							
                        
                        
                                                
                                
							
                        
                        
                                                
                                
							
                        
                        
                                                
                                
							
                        
                        
                                                
                                
							
                        
                        
                                                
                                
							
                        
                        
                                                
                                
							
                        
                        
                                                
                                
							
                        
                        
                                                
                                
							
                        
                        
                                                
                                
							
                        
                        
                                                
                                
							
                        
                        
                                                
                                
                           
                            
                        
                                                    
                     
                                
							
                        
                        
                                                
                                
							
                                                
                                
							
                        
                        
                                                
                                
							
                                                
                                
							
                        
                        
                                                
                                
							
                                                
                                
							
                        
                                                
                                
							
                        
                                                
                                
							
                        
                                                
                                
							
                        
                        
                                                
                                
							
                        
                                                
                                
							
                        
                                                
                                
							
                        
                                                
                                
							
                        
                                                
                                
							
                        
                                                
                                
							
                        
                                                
                                
							
                        
                                                
                                
							
                        
                                                
                                
							
                        
                                                
                                
							
                        
                        
                                                
                                
							
                        
                                                
                                
							
                columns: columnsarray,
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
                    var rows = $('#table_grid_tbl_ld_cbiao_list').bootstrapTable('getSelections');
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
                    var rows = $('#table_grid_tbl_ld_cbiao_list').bootstrapTable('getData');
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
                            
			
	    f_cb_cbbh:'',                    
                            
			
	    f_cb_cbbhid:'',                    
                            
			
	    f_khbh:'',                    
                            
			
	    f_khbhid:'',                    
                            
			
	    f_sqzm:'',                    
                            
			
	    f_bqzm:'',                    
                            
			    f_bqsl:'',                    
                            
			
	    f_sqsl:'',                    
                            
			
	    f_qsqpjsl:'',                    
                            
			
	    f_qlqpjsl:'',                    
                            
			
	    f_cbyname:'',                    
                            
			
	    f_cbyid:'',                    
                            
			
	    f_cbyphoto:'',                    
                            
		            f_cbsj:'1900-01-01 00:00:00',                  
                            
		            f_bkid:'',                  
                            
		            f_ztid:'',                  
                            
		            f_lyid:'05860001',                  
                            
				
	    f_bz:'',                   
                            
			
	    f_sbbh:'',                    
                            
			
	    f_sbbhid:'',                    
                            
			
	    f_sblx:'',                    
                            
			
	    f_sblxid:'',                    
                            
			
	    f_yslx:'',                    
                            
			
	    f_yslxid:'',                    
                            
			
	    f_lxtkhh:'',                    
                            
			
	    f_cbbh:'',                    
                            
			
	    f_cbbhid:'',                    
                            
			
	    f_cbmc:'',                    
                            
			
	    f_yhbh:'',                    
                            
			
	    f_yhbhid:'',                    
                            
			
	    f_yhm:'',                    
                            
			
	    f_jfm:'',                    
                            
			
	    f_dh:'',                    
                            
			
	    f_dz:'',                    
                            
			
	    f_dy:'',                    
                            
			
	    f_dyid:'',                    
                            
			
	    f_sc:'',                    
                            
			
	    f_scid:'',                    
                            
			
	    f_qy:'',                    
                            
			
	    f_qyid:'',                    
                            
			
	    f_pq:'',                    
                            
			
	    f_pqid:'',                    
                            
			
	    f_pgbh:'',                    
                            
			
	    f_pgbhid:'',                    
                            
			
	    f_pgr:'',                    
                            
			
	    f_pgrid:'',                    
                            
			
	    f_pgpcmc:'',                    
                            
		            f_pgsj:'1900-01-01 00:00:00',                  
                            
			
	    f_jfbh:'',                    
                            
			
	    f_jfbhid:'',                    
                            
		            f_jfsj:'1900-01-01 00:00:00',                  
                            
			
	    f_bqje:'',                    
             
		 
 
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
        //客户编号
        _pr_khbh: '',
        //是否查询历史数据库
        _pr_searchhis: 'false',

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

                                                        _validateMessage = new validateMessage('btn_search_modal_search_tbl_ld_cbiao_list');

                                                        //_ladda_btn_command_new = Ladda.create('btn_command_new_tbl_ld_cbiao_list');
                                                        //_ladda_btn_command_delete = Ladda.create('btn_command_delete_tbl_ld_cbiao_list');
                                                        _ladda_btn_command_exp_cbiaopart = Ladda.create('btn_command_export_tbl_ld_cbiao_list_part');
                                                        _ladda_btn_command_cbiaohis = Ladda.create('btn_command_his_tbl_ld_cbiao_list');
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

                                //$('#div_content_part_tbl_ld_cbiao_detail').load('../tbl_ld_cbiao/tbl_ld_cbiao_detail_part.html', null, function ()
                                //{

                                //    tbl_ld_cbiao_detail_Obj._pr_pagetype = that._pr_listtype;
                                //    tbl_ld_cbiao_detail_Obj.init({
                                //        success: function ()
                                //        {

                                //        }
                                //    });
                                //});
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
            whereClause += "f_khbh = " + that._pr_khbh;
    
            var orderByString = ' sys_id desc';
            var columnsString = 'f_value1^f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^f_khbhid^f_cbyid^f_cbyphoto^f_sbbhid^f_sblxid^f_yslxid^f_cbbhid^f_khbh^f_sqzm^f_bqzm^f_bqsl^f_sqsl^f_qsqpjsl^f_qlqpjsl^f_cbyname^f_cbsj^f_bk^f_bkid^f_zt^f_ztid^f_ly^f_lyid^f_bz^f_yhm^f_jfm^f_dh^f_dz^f_dy^f_dyid^f_sc^f_scid^f_qy^f_qyid^f_pq^f_pqid^f_lxtkhh^f_pgbh^f_pgbhid^f_pgr^f_pgrid^f_pgpcmc^f_pgsj^f_jfbh^f_jfbhid^f_jfsj^f_bqje^f_sbbh^f_sblx^f_yslx^f_cbbh^f_cbmc^f_cb_cbbh^f_cb_cbbhid^f_yhbh^f_yhbhid^f_sf^f_pwf^sys_id';
	  
            var data = {
                whereString: whereClause,
                orderByString: orderByString,
                columnsString: columnsString,
                pageSizeString: _pageSize,
                pageIndexString: that._pr_gridpageindex,
                clientInf: _clientInf
            };
            if (that._pr_searchhis == 'false')
            {
                data["cxzxsjString"] = "false";
            }
            else
            {
                data["cxzxsjString"] = "true";
            }
            doAjaxFunction(_serviceUrl, 'GetList', data, {
                success: function (result)
                {
                    var messageJson = (new Function("", "return " + result))();

                    $('#table_grid_tbl_ld_cbiao_list').bootstrapTable("loadJson", messageJson);

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
       
        //导出
    btn_command_export_cbiaopart_onclick: function ()
    {

        _ladda_btn_command_exp_cbiaopart.start();
        //if (_whereClauseString == "")
        //{
        //    var where = " 1=1";
        //}
        //else
        //{
        //    var where = _whereClauseString;
        //}
        //var orderByString = ' sys_id desc';
        //var columnsString = 'f_khbh,f_sjbh,f_jfbh,f_yhm,f_dz,f_dj,f_cbyslj,f_sflj,f_pwflj,f_shss,f_jmjelj,f_jffs,f_jcfs,f_yyy,f_czsj,f_sfykfp,f_kplb,f_yyt,f_zt,f_ly';
        //var colunmsName = '客户编号,收据编号,缴费编号,用户名,地址,单价,抄表应收累计,水费累计,污水处理费累计,算后实收,减免金额,缴费方式,缴存方式,操作人,操作时间,是否已开发票,开票类别,营业厅,状态,来源';
        if (_whereClauseString == "")
        {
            var where = " 1=1 and";
            where += " f_khbh = " + that._pr_khbh;
        }
        else
        {
            var where = _whereClauseString;
            where += " and f_khbh = " + that._pr_khbh;
        }
        var columnsString = 'f_cb_cbbh,f_khbh,f_cbbh,f_yhm,f_jfm,f_dh,f_dz,f_sqzm,f_bqzm,f_sqsl,f_bqsl,f_sf,f_pwf,f_bqje,f_cbyname,f_cbsj,f_ly,f_zt';
        var colunmsName = '抄表编号,客户编号,抄本编号,用户名,缴费名,电话,地址,上期止码,本期止码,上期水量,本期水量,水费,污水处理费,本期金额,抄表员,抄表时间,来源,状态';
        var orderByString = ' sys_id desc';
        var data = {
            whereString: where,
            orderByString: orderByString,
            column: columnsString,
            columnname: colunmsName,
            clientInf: _clientInf
        };
        if (that._pr_searchhis == 'false')
        {
            data["cxzxsjString"] = "false";
        }
        else
        {
            data["cxzxsjString"] = "true";
        }
        doAjaxFunction(_serviceUrl, 'Export', data, {
            success: function (message)
            {
                _ladda_btn_command_exp_cbiaopart.stop();
                window.open(message, "_blank", "");
            },
            fail: function (message)
            {
                _ladda_btn_command_exp_cbiaopart.stop();
                _alertMessage.show('数据导出失败', 'fail');
                _resultMessage.show(message);
            },
            error: function (message)
            {
                _ladda_btn_command_exp_cbiaopart.stop();
                _alertMessage.show('数据导出失败', 'fail');
                _resultMessage.show(message);
            }
        });
    },
        //历史库切换功能
    btn_command_cbiaohis_onclick: function ()
    {
        if ($('#btn_command_his_tbl_ld_cbiao_list').hasClass('btn-default'))
        {
            $('#btn_command_his_tbl_ld_cbiao_list').removeClass('btn-default');
            $('#btn_command_his_tbl_ld_cbiao_list').addClass('btn-primary');
            $('#btn_command_his_tbl_ld_cbiao_list').text('含历史库数据');
            that._pr_searchhis = 'true';
        }
        else
        {
            $('#btn_command_his_tbl_ld_cbiao_list').removeClass('btn-primary');
            $('#btn_command_his_tbl_ld_cbiao_list').addClass('btn-default');
            $('#btn_command_his_tbl_ld_cbiao_list').text('不含历史库数据');
            that._pr_searchhis = 'false';
        }
        _ladda_btn_command_cbiaohis.start();
        _ladda_btn_command_exp_cbiaopart.start();
        that.bindGrid({
            success: function ()
            {
                _ladda_btn_command_cbiaohis.stop();
                _ladda_btn_command_exp_cbiaopart.stop();
            }, fail: function (message)
            {
                _ladda_btn_command_cbiaohis.stop();
                _ladda_btn_command_exp_cbiaopart.stop();
                _alertMessage.show('绑定失败', 'fail');
                _resultMessage.show(message);
            }
        });
    },
        
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
                var currentcount = $('#table_grid_tbl_ld_cbiao_list').bootstrapTable('getSelections').length;
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
            $('#table_grid_tbl_ld_cbiao_list').bootstrapTable('uncheckAll');
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
            $('#btn_command_search_tbl_ld_cbiao_list').html('简单查询');
            $('#txt_command_search_tbl_ld_cbiao_list').removeAttr('disabled');
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
            $('#btn_command_search_tbl_ld_cbiao_list').html('高级查询');
            $('#txt_command_search_tbl_ld_cbiao_list').attr('disabled', 'disabled');

            $('#div_search_modal_tbl_ld_cbiao_list').modal('show');
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
                                    $('#div_search_modal_tbl_ld_cbiao_list').modal('hide')
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
            $('#div_search_modal_tbl_ld_cbiao_list').modal('hide');

            that._pr_searchtype = '1';
            $('#btn_command_search_tbl_ld_cbiao_list').html('简单查询');
            $('#txt_command_search_tbl_ld_cbiao_list').removeAttr('disabled');
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
            $('#btn_command_search_tbl_ld_cbiao_list').html('高级查询');
            $('#txt_command_search_tbl_ld_cbiao_list').attr('disabled', 'disabled');

            $('#div_search_modal_tbl_ld_cbiao_list').modal('show');
        },
        end:function()
        {
        }

    };
    return that;
})();





