var _khJson = null;
var tbl_ld_ghsb_detail_Obj = (function ()
{
    'use strict';

    //=================================================================================
    //                                      私有
    //=================================================================================

    //=================================================================================
    //                                      私有属性 
    //=================================================================================
    var _serviceUrl = '//127.0.0.1/sara.dd.ldsw/service/service_tbl_ld_ghsb.asmx/',
        _serviceUrl_kh = '//162.16.166.1/sara.dd.ldsw/service/service_tbl_ld_khb.asmx/',
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
        //水表类型（新旧）
        codeServiceId += "0524^";
        //计量类型（新旧）
        codeServiceId += "0525^";
        //水表口径（新旧）
        codeServiceId += "0523^";
        //原水表（新旧水表表_状态）
        codeServiceId += "0526^";
        //状态（流程状态）
        codeServiceId += "0818^";

        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        codeServiceId = codeServiceId.trimEnd('^');
        commonObj.getCodeServiceJson(codeServiceId, {
            success: function (resultArray)
            {
                try
                {
                    _baseCodeHashMap = new hashMap();

                    _baseCodeHashMap.put('codeservice_0524', resultArray['0524']);

                    _baseCodeHashMap.put('codeservice_0525', resultArray['0525']);

                    _baseCodeHashMap.put('codeservice_0523', resultArray['0523']);

                    _baseCodeHashMap.put('codeservice_0526', resultArray['0526']);

                    _baseCodeHashMap.put('codeservice_0818', resultArray['0818']);

                    var sqlJson = {
                        "tbl_ldbm_sbfz": "select sys_id as id, f_fzmc as text,decode(f_ztid,'0','false','true') as disabled from tbl_ldbm_sbfz where sys_delflag='0'  order by sys_id",
                    }
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
                            _baseCodeHashMap.put('codeservice_0522', messageJson["tbl_ldbm_sbfz"]);

                    callBackFunction.success();
                        },
                        fail: function (message)
                        {
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
            var codeService_0524 = _baseCodeHashMap.get('codeservice_0524');

            var codeService_0525 = _baseCodeHashMap.get('codeservice_0525');

            var codeService_0523 = _baseCodeHashMap.get('codeservice_0523');
            
            var codeService_0526 = _baseCodeHashMap.get('codeservice_0526');

            var codeService_0818 = _baseCodeHashMap.get('codeservice_0818');

            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            var codeService_0522 = _baseCodeHashMap.get('codeservice_0522');
            
            
            
            
            
            
            
             
        
            	
			          
            	
			          
            	
			          
            	
			          
            	
			          
            	
			          
            	
			          
            	
			          
            	
			          
            	
			          
            	
			          
            	
			          
            	
			          
            	
			          
            	
			            controlObj.datetimeinit('detail_f_sqsj_tbl_ld_ghsb_detail_date', 'detail_f_sqsj_tbl_ld_ghsb_detail_time', f_sqsj_date_onchange, f_sqsj_time_onchange);          
            	
			          
            	
			          
            	
			            controlObj.datetimeinit('detail_f_czsj_tbl_ld_ghsb_detail_date', 'detail_f_czsj_tbl_ld_ghsb_detail_time', f_czsj_date_onchange, f_czsj_time_onchange);          
            	
			          
            	
			          
            	
			          
            	
			          
            	
			          
            	
			          
            	
            controlObj.multidropdownlistinit('detail_f_oldsbfz_tbl_ld_ghsb_detail', codeService_0522, f_oldsbfz_onchange);
            	
			          
            	
			          
            	
            controlObj.singledropdownlistinit('detail_f_oldsblx_tbl_ld_ghsb_detail', codeService_0524, f_oldsblx_onchange);
            	
            controlObj.singledropdownlistinit('detail_f_oldjllx_tbl_ld_ghsb_detail', codeService_0525, f_oldjllx_onchange);
            	
			          
            	
            controlObj.singledropdownlistinit('detail_f_oldsbkj_tbl_ld_ghsb_detail', codeService_0523, f_oldsbkj_onchange);
            	
			          
            	
			            controlObj.datetimeinit('detail_f_oldazrq_tbl_ld_ghsb_detail_date', 'detail_f_oldazrq_tbl_ld_ghsb_detail_time', f_oldazrq_date_onchange, f_oldazrq_time_onchange);          
            	
			            controlObj.toggleinit('detail_f_oldqfzt_tbl_ld_ghsb_detail', f_oldqfzt_onchange);          
            	
			          
            	
			          
            	
			          
            	
			          
            	
			          
            	
			          
            	
			          
            	
			          
            	
			          
            	
			          
            	
            controlObj.singledropdownlistinit('detail_f_oldzt_tbl_ld_ghsb_detail', codeService_0526, f_oldzt_onchange);
            	
			          
            	
			          
            	
			          
            	
			          
            	
            controlObj.multidropdownlistinit('detail_f_newsbfz_tbl_ld_ghsb_detail', codeService_0522, f_newsbfz_onchange);
            	
			          
            	
			          
            	
            controlObj.singledropdownlistinit('detail_f_newsblx_tbl_ld_ghsb_detail', codeService_0524, f_newsblx_onchange);

            controlObj.singledropdownlistinit('detail_f_newjllx_tbl_ld_ghsb_detail', codeService_0525, f_newjllx_onchange);

            controlObj.singledropdownlistinit('detail_f_newsbkj_tbl_ld_ghsb_detail', codeService_0523, f_newsbkj_onchange);
            	
			          
            	
			          
            	
			            controlObj.datetimeinit('detail_f_newazrq_tbl_ld_ghsb_detail_date', 'detail_f_newazrq_tbl_ld_ghsb_detail_time', f_newazrq_date_onchange, f_newazrq_time_onchange);          
            	
			            controlObj.toggleinit('detail_f_newqfzt_tbl_ld_ghsb_detail', f_newqfzt_onchange);          
            	
			          
            	
			          
            	
			          
            	
			          
            	
			          
            	
			          
            	
			          
            	
			          
            	
			          
            	
            controlObj.singledropdownlistinit('detail_f_newzt_tbl_ld_ghsb_detail', codeService_0526, f_newzt_onchange);
            	
			            controlObj.fileuploaderinit('detail_f_xsbfj_tbl_ld_ghsb_detail', {"fileUploadExtnames":";.txt;.sql;.doc;.docx;.xls;.xlsx;.pdf;.tif;.bmp;.jpg;.jpeg;.gif;.png;.rar;.zip;.xml;","fileUploadCountMax":"0","isThumbnailImgShow":true}, f_xsbfj_onchange);          
            	
			          
            	
						controlObj.richtextinit('detail_f_khjson_tbl_ld_ghsb_detail', f_khjson_onchange);
            controlObj.fileuploaderinit('detail_f_khjson_file_tbl_ld_ghsb_detail', {"fileUploadExtnames":";.txt;.sql;.doc;.docx;.xls;.xlsx;.pdf;.tif;.bmp;.jpg;.jpeg;.gif;.png;.rar;.zip;.xml;","isThumbnailImgShow":false,onDeleteEnd: function ( filerealname, msg ){f_khjson_file_onchange();}}, f_khjson_file_onchange);          
            	
			          
            	
			            controlObj.fileuploaderinit('detail_f_lcfj_tbl_ld_ghsb_detail', {"fileUploadExtnames":";.txt;.sql;.doc;.docx;.xls;.xlsx;.pdf;.tif;.bmp;.jpg;.jpeg;.gif;.png;.rar;.zip;.xml;","fileUploadCountMax":"0","isThumbnailImgShow":true}, f_lcfj_onchange);          
            	
            controlObj.singledropdownlistinit('detail_f_zt_tbl_ld_ghsb_detail', codeService_0818, f_zt_onchange);
            	
            controlObj.singledropdownlistinit('detail_f_value2_tbl_ld_ghsb_detail', [{ "id": "1", "text": "维修更换" }, { "id": "2", "text": "改造更换" } ], "");
            
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
            controlObj.textdisable('detail_f_value2_tbl_ld_ghsb_detail', isDisable);
            controlObj.textdisable('detail_f_ghsbbh_tbl_ld_ghsb_detail', true);

            controlObj.textdisable('detail_f_ghsbmc_tbl_ld_ghsb_detail', isDisable);

            controlObj.textdisable('detail_f_sqr_tbl_ld_ghsb_detail', true);

            controlObj.textdisable('detail_f_sqrid_tbl_ld_ghsb_detail', isDisable);

            controlObj.datetimedisable('detail_f_sqsj_tbl_ld_ghsb_detail_date', 'detail_f_sqsj_tbl_ld_ghsb_detail_time', true);

            controlObj.textdisable('detail_f_czr_tbl_ld_ghsb_detail', true);

            controlObj.textdisable('detail_f_czrid_tbl_ld_ghsb_detail', isDisable);

            controlObj.datetimedisable('detail_f_czsj_tbl_ld_ghsb_detail_date', 'detail_f_czsj_tbl_ld_ghsb_detail_time', true);

            controlObj.textdisable('detail_f_khbh_tbl_ld_ghsb_detail', true);
            if (isDisable)
            {
                $('#btn_detail_f_khbh_tbl_ld_ghsb_detail').attr('disabled', 'disabled');
            }
            else
            {
                $('#btn_detail_f_khbh_tbl_ld_ghsb_detail').removeAttr('disabled');
            }               

            controlObj.textdisable('detail_f_khbhid_tbl_ld_ghsb_detail', isDisable);

            controlObj.textdisable('detail_f_khxx_tbl_ld_ghsb_detail', true);

            controlObj.textdisable('detail_f_oldsbbh_tbl_ld_ghsb_detail', true);

            controlObj.textdisable('detail_f_oldsbh_tbl_ld_ghsb_detail', true);

            controlObj.textdisable('detail_f_oldlxth_tbl_ld_ghsb_detail', true);

            controlObj.multidropdownlistdisable('detail_f_oldsbfz_tbl_ld_ghsb_detail', true);

            controlObj.textdisable('detail_f_oldsbpp_tbl_ld_ghsb_detail', true);

            controlObj.textdisable('detail_f_oldmph_tbl_ld_ghsb_detail', true);

            controlObj.singledropdownlistdisable('detail_f_oldsblx_tbl_ld_ghsb_detail', true);

            controlObj.singledropdownlistdisable('detail_f_oldjllx_tbl_ld_ghsb_detail', true);

            controlObj.textdisable('detail_f_oldrs_tbl_ld_ghsb_detail', true);

            controlObj.singledropdownlistdisable('detail_f_oldsbkj_tbl_ld_ghsb_detail', true);

            controlObj.textdisable('detail_f_oldsbdz_tbl_ld_ghsb_detail', true);

            controlObj.datetimedisable('detail_f_oldazrq_tbl_ld_ghsb_detail_date', 'detail_f_oldazrq_tbl_ld_ghsb_detail_time', true);

            controlObj.toggledisable('detail_f_oldqfzt_tbl_ld_ghsb_detail', true);

            controlObj.textdisable('detail_f_oldsynx_tbl_ld_ghsb_detail', true);

            controlObj.textdisable('detail_f_oldcszm_tbl_ld_ghsb_detail', true);

            controlObj.textdisable('detail_f_oldqsqpjsl_tbl_ld_ghsb_detail', true);

            controlObj.textdisable('detail_f_oldqlqpjsl_tbl_ld_ghsb_detail', true);

            controlObj.textdisable('detail_f_oldbqzm_tbl_ld_ghsb_detail', true);

            controlObj.textdisable('detail_f_oldsqzm_tbl_ld_ghsb_detail', true);

            controlObj.textdisable('detail_f_oldsqsl_tbl_ld_ghsb_detail', true);

            controlObj.textdisable('detail_f_olddysl_tbl_ld_ghsb_detail', true);

            controlObj.textdisable('detail_f_oldljgl_tbl_ld_ghsb_detail', true);

            controlObj.textdisable('detail_f_oldnysl_tbl_ld_ghsb_detail', true);

            controlObj.singledropdownlistdisable('detail_f_oldzt_tbl_ld_ghsb_detail', true);

            controlObj.textdisable('detail_f_ysbbz_tbl_ld_ghsb_detail', true);

            controlObj.textdisable('detail_f_newsbbh_tbl_ld_ghsb_detail', true);

            controlObj.textdisable('detail_f_newxsbjsbh_tbl_ld_ghsb_detail', isDisable);

					    controlObj.textdisable('detail_f_oldxsblxth_tbl_ld_ghsb_detail', isDisable);          
            
			            controlObj.multidropdownlistdisable('detail_f_newsbfz_tbl_ld_ghsb_detail', isDisable);          
            
					    controlObj.textdisable('detail_f_newsbpp_tbl_ld_ghsb_detail', isDisable);          
            
					    controlObj.textdisable('detail_f_newmph_tbl_ld_ghsb_detail', isDisable);          
            
				       
            controlObj.singledropdownlistdisable('detail_f_newsblx_tbl_ld_ghsb_detail', isDisable);          
            
				       
            controlObj.singledropdownlistdisable('detail_f_newjllx_tbl_ld_ghsb_detail', isDisable);          
            
					    controlObj.textdisable('detail_f_newrs_tbl_ld_ghsb_detail', isDisable);          
            
				       
            controlObj.singledropdownlistdisable('detail_f_newsbkj_tbl_ld_ghsb_detail', isDisable);          
            
					    controlObj.textdisable('detail_f_newsbdz_tbl_ld_ghsb_detail', isDisable);          
            
					    controlObj.textdisable('detail_f_newsynx_tbl_ld_ghsb_detail', isDisable);          
            
			            controlObj.datetimedisable('detail_f_newazrq_tbl_ld_ghsb_detail_date', 'detail_f_newazrq_tbl_ld_ghsb_detail_time', isDisable);          
            
						
            controlObj.toggledisable('detail_f_newqfzt_tbl_ld_ghsb_detail', isDisable);          
            
					    controlObj.textdisable('detail_f_newcszm_tbl_ld_ghsb_detail', isDisable);          
            
					    controlObj.textdisable('detail_f_newqsqpjsl_tbl_ld_ghsb_detail', isDisable);          
            
					    controlObj.textdisable('detail_f_newqlqpjsl_tbl_ld_ghsb_detail', isDisable);          
            
					    controlObj.textdisable('detail_f_newbqzm_tbl_ld_ghsb_detail', isDisable);          
            
					    controlObj.textdisable('detail_f_newsqzm_tbl_ld_ghsb_detail', isDisable);          
            
					    controlObj.textdisable('detail_f_newsqsl_tbl_ld_ghsb_detail', isDisable);          
            
					    controlObj.textdisable('detail_f_newdysl_tbl_ld_ghsb_detail', isDisable);          
            
					    controlObj.textdisable('detail_f_newljgl_tbl_ld_ghsb_detail', isDisable);          
            
					    controlObj.textdisable('detail_f_newnysl_tbl_ld_ghsb_detail', isDisable);          
            
				       
            controlObj.singledropdownlistdisable('detail_f_newzt_tbl_ld_ghsb_detail', isDisable);          
            
			            controlObj.fileuploaderdisable('detail_f_xsbfj_tbl_ld_ghsb_detail', isDisable);          
            
			            controlObj.textdisable('detail_f_xsbbz_tbl_ld_ghsb_detail', isDisable);          
            
						 
            controlObj.richtextdisable('detail_f_khjson_tbl_ld_ghsb_detail', isDisable);
            controlObj.fileuploaderdisable('detail_f_khjson_file_tbl_ld_ghsb_detail', isDisable);
            if ( isDisable )
            {
                $( '#detail_f_khjson_resource_tbl_ld_ghsb_detail' ).parent().addClass( 'hidden' );
                $( '#detail_f_khjson_file_tbl_ld_ghsb_detail' ).parent().addClass( 'hidden' );
            }
            else
            {
                $( '#detail_f_khjson_resource_tbl_ld_ghsb_detail' ).parent().removeClass( 'hidden' );
                $( '#detail_f_khjson_file_tbl_ld_ghsb_detail' ).parent().removeClass( 'hidden' );
            }          
            
					    controlObj.textdisable('detail_fk_tbl_maintable_sys_id_tbl_ld_ghsb_detail', isDisable);          
            
			            controlObj.fileuploaderdisable('detail_f_lcfj_tbl_ld_ghsb_detail', isDisable);          
            
				       
            controlObj.singledropdownlistdisable('detail_f_zt_tbl_ld_ghsb_detail', true);
            
			            controlObj.textdisable('detail_f_bz_tbl_ld_ghsb_detail', isDisable);          
            controlObj.textdisable('detail_f_yhm_tbl_ld_ghsb_detail', isDisable);
            controlObj.textdisable('detail_f_dz_tbl_ld_ghsb_detail', isDisable);
            controlObj.textdisable('detail_f_dh_tbl_ld_ghsb_detail', isDisable);
             
            if (isDisable)
            {
                $('#btn_command_save_tbl_ld_ghsb_detail').addClass('hidden');
                $('.btn-command-message').attr('disabled', 'disabled');
            }
            else
            {
                $('#btn_command_save_tbl_ld_ghsb_detail').removeClass('hidden');
                $('.btn-command-message').removeAttr('disabled');
            }
            controlObj.textdisable('detail_f_yhm_tbl_ld_ghsb_detail', true);
            controlObj.textdisable('detail_f_dz_tbl_ld_ghsb_detail', true);
            controlObj.textdisable('detail_f_dh_tbl_ld_ghsb_detail', true);
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
    *  参数:tbl_ld_ghsb_detail, callBackFunction
    *  根据数据对象，绑定数据对象到页面控件
    */
    setModel = function (tbl_ld_ghsb_detail, callBackFunction)
   {
        try
        {
            //f_khxx 取出用户名和地址
            var khxx_zx = tbl_ld_ghsb_detail.f_khxx;
            var khxx_zxArr = khxx_zx.split(",");
            if (khxx_zx != '' && khxx_zx!='null')
            {
                controlObj.text('detail_f_yhm_tbl_ld_ghsb_detail', khxx_zxArr[0]);
                controlObj.text('detail_f_dz_tbl_ld_ghsb_detail', khxx_zxArr[1]);
                controlObj.text('detail_f_dh_tbl_ld_ghsb_detail', khxx_zxArr[2]);
            } else
            {
                controlObj.text('detail_f_yhm_tbl_ld_ghsb_detail', '');
                controlObj.text('detail_f_dz_tbl_ld_ghsb_detail', '');
                controlObj.text('detail_f_dh_tbl_ld_ghsb_detail', '');
            }
            
			        controlObj.text('detail_f_value1_tbl_ld_ghsb_detail', tbl_ld_ghsb_detail.f_value1);          
            if (tbl_ld_ghsb_detail.f_value2=="维修更换")
            {
                tbl_ld_ghsb_detail.f_value2 = '1';
                controlObj.singledropdownlistid('detail_f_value2_tbl_ld_ghsb_detail', "1");

            } else
            {
                tbl_ld_ghsb_detail.f_value2 = '2';
                controlObj.singledropdownlistid('detail_f_value2_tbl_ld_ghsb_detail', "2");
            }
			        controlObj.text('detail_f_value3_tbl_ld_ghsb_detail', tbl_ld_ghsb_detail.f_value3);          
		
			        controlObj.text('detail_f_value4_tbl_ld_ghsb_detail', tbl_ld_ghsb_detail.f_value4);          
		
			        controlObj.text('detail_f_value5_tbl_ld_ghsb_detail', tbl_ld_ghsb_detail.f_value5);          
		
			        controlObj.text('detail_f_value6_tbl_ld_ghsb_detail', tbl_ld_ghsb_detail.f_value6);          
		
			        controlObj.text('detail_f_value7_tbl_ld_ghsb_detail', tbl_ld_ghsb_detail.f_value7);          
		
			        controlObj.text('detail_f_value8_tbl_ld_ghsb_detail', tbl_ld_ghsb_detail.f_value8);          
		
			        controlObj.text('detail_f_value9_tbl_ld_ghsb_detail', tbl_ld_ghsb_detail.f_value9);          
		
			        controlObj.text('detail_f_value10_tbl_ld_ghsb_detail', tbl_ld_ghsb_detail.f_value10);          
		
			        controlObj.text('detail_f_ghsbbh_tbl_ld_ghsb_detail', tbl_ld_ghsb_detail.f_ghsbbh);          
		
			        controlObj.text('detail_f_ghsbmc_tbl_ld_ghsb_detail', tbl_ld_ghsb_detail.f_ghsbmc);          
		
			        controlObj.text('detail_f_sqr_tbl_ld_ghsb_detail', tbl_ld_ghsb_detail.f_sqr);          
		
			        controlObj.text('detail_f_sqrid_tbl_ld_ghsb_detail', tbl_ld_ghsb_detail.f_sqrid);          
		
						
        controlObj.datetime('detail_f_sqsj_tbl_ld_ghsb_detail_date', 'detail_f_sqsj_tbl_ld_ghsb_detail_time', tbl_ld_ghsb_detail.f_sqsj);          
		
			        controlObj.text('detail_f_czr_tbl_ld_ghsb_detail', tbl_ld_ghsb_detail.f_czr);          
		
			        controlObj.text('detail_f_czrid_tbl_ld_ghsb_detail', tbl_ld_ghsb_detail.f_czrid);          
		
						
        controlObj.datetime('detail_f_czsj_tbl_ld_ghsb_detail_date', 'detail_f_czsj_tbl_ld_ghsb_detail_time', tbl_ld_ghsb_detail.f_czsj);          
		
			        controlObj.text('detail_f_khbh_tbl_ld_ghsb_detail', tbl_ld_ghsb_detail.f_khbh);          
		
			        controlObj.text('detail_f_khbhid_tbl_ld_ghsb_detail', tbl_ld_ghsb_detail.f_khbhid);          
		
			        controlObj.text('detail_f_khxx_tbl_ld_ghsb_detail', tbl_ld_ghsb_detail.f_khxx);          
		
			        controlObj.text('detail_f_oldsbbh_tbl_ld_ghsb_detail', tbl_ld_ghsb_detail.f_oldsbbh);          
		
			        controlObj.text('detail_f_oldsbh_tbl_ld_ghsb_detail', tbl_ld_ghsb_detail.f_oldsbh);          
		
			        controlObj.text('detail_f_oldlxth_tbl_ld_ghsb_detail', tbl_ld_ghsb_detail.f_oldlxth);          
		
			        controlObj.multidropdownlistid('detail_f_oldsbfz_tbl_ld_ghsb_detail', tbl_ld_ghsb_detail.f_oldsbfzid);          
		
			        controlObj.text('detail_f_oldsbpp_tbl_ld_ghsb_detail', tbl_ld_ghsb_detail.f_oldsbpp);          
		
			        controlObj.text('detail_f_oldmph_tbl_ld_ghsb_detail', tbl_ld_ghsb_detail.f_oldmph);          
		
			        controlObj.singledropdownlistid('detail_f_oldsblx_tbl_ld_ghsb_detail', tbl_ld_ghsb_detail.f_oldsblxid);          
		
			        controlObj.singledropdownlistid('detail_f_oldjllx_tbl_ld_ghsb_detail', tbl_ld_ghsb_detail.f_oldjllxid);          
		
			        controlObj.text('detail_f_oldrs_tbl_ld_ghsb_detail', tbl_ld_ghsb_detail.f_oldrs);          
		
			        controlObj.singledropdownlistid('detail_f_oldsbkj_tbl_ld_ghsb_detail', tbl_ld_ghsb_detail.f_oldsbkjid);          
		
			        controlObj.text('detail_f_oldsbdz_tbl_ld_ghsb_detail', tbl_ld_ghsb_detail.f_oldsbdz);          
		
						
        controlObj.datetime('detail_f_oldazrq_tbl_ld_ghsb_detail_date', 'detail_f_oldazrq_tbl_ld_ghsb_detail_time', tbl_ld_ghsb_detail.f_oldazrq);          
		
			        controlObj.toggle('detail_f_oldqfzt_tbl_ld_ghsb_detail', tbl_ld_ghsb_detail.f_oldqfzt);          
		
			        controlObj.text('detail_f_oldsynx_tbl_ld_ghsb_detail', tbl_ld_ghsb_detail.f_oldsynx);          
		
			        controlObj.text('detail_f_oldcszm_tbl_ld_ghsb_detail', tbl_ld_ghsb_detail.f_oldcszm);          
		
			        controlObj.text('detail_f_oldqsqpjsl_tbl_ld_ghsb_detail', tbl_ld_ghsb_detail.f_oldqsqpjsl);          
		
			        controlObj.text('detail_f_oldqlqpjsl_tbl_ld_ghsb_detail', tbl_ld_ghsb_detail.f_oldqlqpjsl);          
		
			        controlObj.text('detail_f_oldbqzm_tbl_ld_ghsb_detail', tbl_ld_ghsb_detail.f_oldbqzm);          
		
			        controlObj.text('detail_f_oldsqzm_tbl_ld_ghsb_detail', tbl_ld_ghsb_detail.f_oldsqzm);          
		
			        controlObj.text('detail_f_oldsqsl_tbl_ld_ghsb_detail', tbl_ld_ghsb_detail.f_oldsqsl);          
		
			        controlObj.text('detail_f_olddysl_tbl_ld_ghsb_detail', tbl_ld_ghsb_detail.f_olddysl);          
		
			        controlObj.text('detail_f_oldljgl_tbl_ld_ghsb_detail', tbl_ld_ghsb_detail.f_oldljgl);          
		
			        controlObj.text('detail_f_oldnysl_tbl_ld_ghsb_detail', tbl_ld_ghsb_detail.f_oldnysl);          
		
			        controlObj.singledropdownlistid('detail_f_oldzt_tbl_ld_ghsb_detail', tbl_ld_ghsb_detail.f_oldztid);          
		
			        controlObj.text('detail_f_ysbbz_tbl_ld_ghsb_detail', tbl_ld_ghsb_detail.f_ysbbz.returnStringRN());          
		
			        controlObj.text('detail_f_newsbbh_tbl_ld_ghsb_detail', tbl_ld_ghsb_detail.f_newsbbh);          
		
			        controlObj.text('detail_f_newxsbjsbh_tbl_ld_ghsb_detail', tbl_ld_ghsb_detail.f_newxsbjsbh);          
		
			        controlObj.text('detail_f_oldxsblxth_tbl_ld_ghsb_detail', tbl_ld_ghsb_detail.f_oldxsblxth);          
		
			        controlObj.multidropdownlistid('detail_f_newsbfz_tbl_ld_ghsb_detail', tbl_ld_ghsb_detail.f_newsbfzid);          
		
			        controlObj.text('detail_f_newsbpp_tbl_ld_ghsb_detail', tbl_ld_ghsb_detail.f_newsbpp);          
		
			        controlObj.text('detail_f_newmph_tbl_ld_ghsb_detail', tbl_ld_ghsb_detail.f_newmph);          
		
			        controlObj.singledropdownlistid('detail_f_newsblx_tbl_ld_ghsb_detail', tbl_ld_ghsb_detail.f_newsblxid);          
		
			        controlObj.singledropdownlistid('detail_f_newjllx_tbl_ld_ghsb_detail', tbl_ld_ghsb_detail.f_newjllxid);          
		
			        controlObj.text('detail_f_newrs_tbl_ld_ghsb_detail', tbl_ld_ghsb_detail.f_newrs);          
		
			        controlObj.singledropdownlistid('detail_f_newsbkj_tbl_ld_ghsb_detail', tbl_ld_ghsb_detail.f_newsbkjid);          
		
			        controlObj.text('detail_f_newsbdz_tbl_ld_ghsb_detail', tbl_ld_ghsb_detail.f_newsbdz);          
		
			        controlObj.text('detail_f_newsynx_tbl_ld_ghsb_detail', tbl_ld_ghsb_detail.f_newsynx);          
		
						
        controlObj.datetime('detail_f_newazrq_tbl_ld_ghsb_detail_date', 'detail_f_newazrq_tbl_ld_ghsb_detail_time', tbl_ld_ghsb_detail.f_newazrq);          
		
			        controlObj.toggle('detail_f_newqfzt_tbl_ld_ghsb_detail', tbl_ld_ghsb_detail.f_newqfzt);          
		
			        controlObj.text('detail_f_newcszm_tbl_ld_ghsb_detail', tbl_ld_ghsb_detail.f_newcszm);          
		
			        controlObj.text('detail_f_newqsqpjsl_tbl_ld_ghsb_detail', tbl_ld_ghsb_detail.f_newqsqpjsl);          
		
			        controlObj.text('detail_f_newqlqpjsl_tbl_ld_ghsb_detail', tbl_ld_ghsb_detail.f_newqlqpjsl);          
		
			        controlObj.text('detail_f_newbqzm_tbl_ld_ghsb_detail', tbl_ld_ghsb_detail.f_newbqzm);          
		
			        controlObj.text('detail_f_newsqzm_tbl_ld_ghsb_detail', tbl_ld_ghsb_detail.f_newsqzm);          
		
			        controlObj.text('detail_f_newsqsl_tbl_ld_ghsb_detail', tbl_ld_ghsb_detail.f_newsqsl);          
		
			        controlObj.text('detail_f_newdysl_tbl_ld_ghsb_detail', tbl_ld_ghsb_detail.f_newdysl);          
		
			        controlObj.text('detail_f_newljgl_tbl_ld_ghsb_detail', tbl_ld_ghsb_detail.f_newljgl);          
		
			        controlObj.text('detail_f_newnysl_tbl_ld_ghsb_detail', tbl_ld_ghsb_detail.f_newnysl);          
		
			        controlObj.singledropdownlistid('detail_f_newzt_tbl_ld_ghsb_detail', tbl_ld_ghsb_detail.f_newztid);          
		
			        controlObj.fileuploaderbind('detail_f_xsbfj_tbl_ld_ghsb_detail', tbl_ld_ghsb_detail.f_xsbfj);          
		
			        controlObj.text('detail_f_xsbbz_tbl_ld_ghsb_detail', tbl_ld_ghsb_detail.f_xsbbz.returnStringRN());          
		
				
        controlObj.richtext('detail_f_khjson_tbl_ld_ghsb_detail', tbl_ld_ghsb_detail.f_khjson);
        controlObj.fileuploaderbind('detail_f_khjson_file_tbl_ld_ghsb_detail', tbl_ld_ghsb_detail.f_khjsonid);
            f_khjson_file_onchange();          
		
			        controlObj.text('detail_fk_tbl_maintable_sys_id_tbl_ld_ghsb_detail', tbl_ld_ghsb_detail.fk_tbl_maintable_sys_id);          
		
			        controlObj.fileuploaderbind('detail_f_lcfj_tbl_ld_ghsb_detail', tbl_ld_ghsb_detail.f_lcfj);          
		
			        controlObj.singledropdownlistid('detail_f_zt_tbl_ld_ghsb_detail', tbl_ld_ghsb_detail.f_ztid);          
		
			        controlObj.text('detail_f_bz_tbl_ld_ghsb_detail', tbl_ld_ghsb_detail.f_bz.returnStringRN());          
				
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
    *  获取页面数据，返回对象tbl_ld_ghsb_detail
    */
    getModel = function (callBackFunction)
    {
        try
        {
            var tbl_ld_ghsb_detail = new Object();
            
					
            tbl_ld_ghsb_detail.f_value1 = controlObj.text('detail_f_value1_tbl_ld_ghsb_detail');          
            
					
            tbl_ld_ghsb_detail.f_value2 = controlObj.singledropdownlist('detail_f_value2_tbl_ld_ghsb_detail');
            
					
            tbl_ld_ghsb_detail.f_value3 = controlObj.text('detail_f_value3_tbl_ld_ghsb_detail');          
            
					
            tbl_ld_ghsb_detail.f_value4 = controlObj.text('detail_f_value4_tbl_ld_ghsb_detail');          
            
					
            tbl_ld_ghsb_detail.f_value5 = controlObj.text('detail_f_value5_tbl_ld_ghsb_detail');          
            
					
            tbl_ld_ghsb_detail.f_value6 = controlObj.text('detail_f_value6_tbl_ld_ghsb_detail');          
            
					
            tbl_ld_ghsb_detail.f_value7 = controlObj.text('detail_f_value7_tbl_ld_ghsb_detail');          
            
					
            tbl_ld_ghsb_detail.f_value8 = controlObj.text('detail_f_value8_tbl_ld_ghsb_detail');          
            
					
            tbl_ld_ghsb_detail.f_value9 = controlObj.text('detail_f_value9_tbl_ld_ghsb_detail');          
            
					
            tbl_ld_ghsb_detail.f_value10 = controlObj.text('detail_f_value10_tbl_ld_ghsb_detail');          
            
					
            tbl_ld_ghsb_detail.f_ghsbbh = controlObj.text('detail_f_ghsbbh_tbl_ld_ghsb_detail');          
            
					
            tbl_ld_ghsb_detail.f_ghsbmc = controlObj.text('detail_f_ghsbmc_tbl_ld_ghsb_detail');          
            
					
            tbl_ld_ghsb_detail.f_sqr = controlObj.text('detail_f_sqr_tbl_ld_ghsb_detail');          
            
					
            tbl_ld_ghsb_detail.f_sqrid = controlObj.text('detail_f_sqrid_tbl_ld_ghsb_detail');          
            
			            tbl_ld_ghsb_detail.f_sqsj = controlObj.datetime('detail_f_sqsj_tbl_ld_ghsb_detail_date', 'detail_f_sqsj_tbl_ld_ghsb_detail_time');          
            
					
            tbl_ld_ghsb_detail.f_czr = controlObj.text('detail_f_czr_tbl_ld_ghsb_detail');          
            
					
            tbl_ld_ghsb_detail.f_czrid = controlObj.text('detail_f_czrid_tbl_ld_ghsb_detail');          
            
			            tbl_ld_ghsb_detail.f_czsj = controlObj.datetime('detail_f_czsj_tbl_ld_ghsb_detail_date', 'detail_f_czsj_tbl_ld_ghsb_detail_time');          
            
					
            tbl_ld_ghsb_detail.f_khbh = controlObj.text('detail_f_khbh_tbl_ld_ghsb_detail');          
            
					
            tbl_ld_ghsb_detail.f_khbhid = controlObj.text('detail_f_khbhid_tbl_ld_ghsb_detail');          
            
					
            tbl_ld_ghsb_detail.f_khxx = controlObj.text('detail_f_khxx_tbl_ld_ghsb_detail');          
            
					
            tbl_ld_ghsb_detail.f_oldsbbh = controlObj.text('detail_f_oldsbbh_tbl_ld_ghsb_detail');          
            
					
            tbl_ld_ghsb_detail.f_oldsbh = controlObj.text('detail_f_oldsbh_tbl_ld_ghsb_detail');          
            
					
            tbl_ld_ghsb_detail.f_oldlxth = controlObj.text('detail_f_oldlxth_tbl_ld_ghsb_detail');          
            
						
            tbl_ld_ghsb_detail.f_oldsbfz = controlObj.multidropdownlist('detail_f_oldsbfz_tbl_ld_ghsb_detail');
            tbl_ld_ghsb_detail.f_oldsbfzid = controlObj.multidropdownlistid('detail_f_oldsbfz_tbl_ld_ghsb_detail');          
            
					
            tbl_ld_ghsb_detail.f_oldsbpp = controlObj.text('detail_f_oldsbpp_tbl_ld_ghsb_detail');          
            
					
            tbl_ld_ghsb_detail.f_oldmph = controlObj.text('detail_f_oldmph_tbl_ld_ghsb_detail');          
            
			            tbl_ld_ghsb_detail.f_oldsblx = controlObj.singledropdownlist('detail_f_oldsblx_tbl_ld_ghsb_detail');
            tbl_ld_ghsb_detail.f_oldsblxid = controlObj.singledropdownlistid('detail_f_oldsblx_tbl_ld_ghsb_detail');          
            
			            tbl_ld_ghsb_detail.f_oldjllx = controlObj.singledropdownlist('detail_f_oldjllx_tbl_ld_ghsb_detail');
            tbl_ld_ghsb_detail.f_oldjllxid = controlObj.singledropdownlistid('detail_f_oldjllx_tbl_ld_ghsb_detail');          
            
					
            tbl_ld_ghsb_detail.f_oldrs = controlObj.text('detail_f_oldrs_tbl_ld_ghsb_detail');          
            
			            tbl_ld_ghsb_detail.f_oldsbkj = controlObj.singledropdownlist('detail_f_oldsbkj_tbl_ld_ghsb_detail');
            tbl_ld_ghsb_detail.f_oldsbkjid = controlObj.singledropdownlistid('detail_f_oldsbkj_tbl_ld_ghsb_detail');          
            
					
            tbl_ld_ghsb_detail.f_oldsbdz = controlObj.text('detail_f_oldsbdz_tbl_ld_ghsb_detail');          
            
			            tbl_ld_ghsb_detail.f_oldazrq = controlObj.datetime('detail_f_oldazrq_tbl_ld_ghsb_detail_date', 'detail_f_oldazrq_tbl_ld_ghsb_detail_time');          
            
						
            tbl_ld_ghsb_detail.f_oldqfzt = controlObj.toggle('detail_f_oldqfzt_tbl_ld_ghsb_detail');          
            
					
            tbl_ld_ghsb_detail.f_oldsynx = controlObj.text('detail_f_oldsynx_tbl_ld_ghsb_detail');          
            
					
            tbl_ld_ghsb_detail.f_oldcszm = controlObj.text('detail_f_oldcszm_tbl_ld_ghsb_detail');          
            
					
            tbl_ld_ghsb_detail.f_oldqsqpjsl = controlObj.text('detail_f_oldqsqpjsl_tbl_ld_ghsb_detail');          
            
					
            tbl_ld_ghsb_detail.f_oldqlqpjsl = controlObj.text('detail_f_oldqlqpjsl_tbl_ld_ghsb_detail');          
            
					
            tbl_ld_ghsb_detail.f_oldbqzm = controlObj.text('detail_f_oldbqzm_tbl_ld_ghsb_detail');          
            
					
            tbl_ld_ghsb_detail.f_oldsqzm = controlObj.text('detail_f_oldsqzm_tbl_ld_ghsb_detail');          
            
					
            tbl_ld_ghsb_detail.f_oldsqsl = controlObj.text('detail_f_oldsqsl_tbl_ld_ghsb_detail');          
            
					
            tbl_ld_ghsb_detail.f_olddysl = controlObj.text('detail_f_olddysl_tbl_ld_ghsb_detail');          
            
					
            tbl_ld_ghsb_detail.f_oldljgl = controlObj.text('detail_f_oldljgl_tbl_ld_ghsb_detail');          
            
					
            tbl_ld_ghsb_detail.f_oldnysl = controlObj.text('detail_f_oldnysl_tbl_ld_ghsb_detail');          
            
			            tbl_ld_ghsb_detail.f_oldzt = controlObj.singledropdownlist('detail_f_oldzt_tbl_ld_ghsb_detail');
            tbl_ld_ghsb_detail.f_oldztid = controlObj.singledropdownlistid('detail_f_oldzt_tbl_ld_ghsb_detail');          
            
					
            tbl_ld_ghsb_detail.f_ysbbz = controlObj.text('detail_f_ysbbz_tbl_ld_ghsb_detail');          
            
					
            tbl_ld_ghsb_detail.f_newsbbh = controlObj.text('detail_f_newsbbh_tbl_ld_ghsb_detail');          
            
					
            tbl_ld_ghsb_detail.f_newxsbjsbh = controlObj.text('detail_f_newxsbjsbh_tbl_ld_ghsb_detail');          
            
					
            tbl_ld_ghsb_detail.f_oldxsblxth = controlObj.text('detail_f_oldxsblxth_tbl_ld_ghsb_detail');          
            
						
            tbl_ld_ghsb_detail.f_newsbfz = controlObj.multidropdownlist('detail_f_newsbfz_tbl_ld_ghsb_detail');
            tbl_ld_ghsb_detail.f_newsbfzid = controlObj.multidropdownlistid('detail_f_newsbfz_tbl_ld_ghsb_detail');          
            
					
            tbl_ld_ghsb_detail.f_newsbpp = controlObj.text('detail_f_newsbpp_tbl_ld_ghsb_detail');          
            
					
            tbl_ld_ghsb_detail.f_newmph = controlObj.text('detail_f_newmph_tbl_ld_ghsb_detail');          
            
			            tbl_ld_ghsb_detail.f_newsblx = controlObj.singledropdownlist('detail_f_newsblx_tbl_ld_ghsb_detail');
            tbl_ld_ghsb_detail.f_newsblxid = controlObj.singledropdownlistid('detail_f_newsblx_tbl_ld_ghsb_detail');          
            
			            tbl_ld_ghsb_detail.f_newjllx = controlObj.singledropdownlist('detail_f_newjllx_tbl_ld_ghsb_detail');
            tbl_ld_ghsb_detail.f_newjllxid = controlObj.singledropdownlistid('detail_f_newjllx_tbl_ld_ghsb_detail');          
            
					
            tbl_ld_ghsb_detail.f_newrs = controlObj.text('detail_f_newrs_tbl_ld_ghsb_detail');          
            
			            tbl_ld_ghsb_detail.f_newsbkj = controlObj.singledropdownlist('detail_f_newsbkj_tbl_ld_ghsb_detail');
            tbl_ld_ghsb_detail.f_newsbkjid = controlObj.singledropdownlistid('detail_f_newsbkj_tbl_ld_ghsb_detail');          
            
					
            tbl_ld_ghsb_detail.f_newsbdz = controlObj.text('detail_f_newsbdz_tbl_ld_ghsb_detail');          
            
					
            tbl_ld_ghsb_detail.f_newsynx = controlObj.text('detail_f_newsynx_tbl_ld_ghsb_detail');          
            
			            tbl_ld_ghsb_detail.f_newazrq = controlObj.datetime('detail_f_newazrq_tbl_ld_ghsb_detail_date', 'detail_f_newazrq_tbl_ld_ghsb_detail_time');          
            
						
            tbl_ld_ghsb_detail.f_newqfzt = controlObj.toggle('detail_f_newqfzt_tbl_ld_ghsb_detail');          
            
					
            tbl_ld_ghsb_detail.f_newcszm = controlObj.text('detail_f_newcszm_tbl_ld_ghsb_detail');          
            
					
            tbl_ld_ghsb_detail.f_newqsqpjsl = controlObj.text('detail_f_newqsqpjsl_tbl_ld_ghsb_detail');          
            
					
            tbl_ld_ghsb_detail.f_newqlqpjsl = controlObj.text('detail_f_newqlqpjsl_tbl_ld_ghsb_detail');          
            
					
            tbl_ld_ghsb_detail.f_newbqzm = controlObj.text('detail_f_newbqzm_tbl_ld_ghsb_detail');          
            
					
            tbl_ld_ghsb_detail.f_newsqzm = controlObj.text('detail_f_newsqzm_tbl_ld_ghsb_detail');          
            
					
            tbl_ld_ghsb_detail.f_newsqsl = controlObj.text('detail_f_newsqsl_tbl_ld_ghsb_detail');          
            
					
            tbl_ld_ghsb_detail.f_newdysl = controlObj.text('detail_f_newdysl_tbl_ld_ghsb_detail');          
            
					
            tbl_ld_ghsb_detail.f_newljgl = controlObj.text('detail_f_newljgl_tbl_ld_ghsb_detail');          
            
					
            tbl_ld_ghsb_detail.f_newnysl = controlObj.text('detail_f_newnysl_tbl_ld_ghsb_detail');          
            
			            tbl_ld_ghsb_detail.f_newzt = controlObj.singledropdownlist('detail_f_newzt_tbl_ld_ghsb_detail');
            tbl_ld_ghsb_detail.f_newztid = controlObj.singledropdownlistid('detail_f_newzt_tbl_ld_ghsb_detail');          
            
			            tbl_ld_ghsb_detail.f_xsbfj = controlObj.fileuploaderid('detail_f_xsbfj_tbl_ld_ghsb_detail');          
            
					
            tbl_ld_ghsb_detail.f_xsbbz = controlObj.text('detail_f_xsbbz_tbl_ld_ghsb_detail');          
            
						 
            tbl_ld_ghsb_detail.f_khjson = controlObj.richtext('detail_f_khjson_tbl_ld_ghsb_detail');
            tbl_ld_ghsb_detail.f_khjsonid = controlObj.fileuploaderid('detail_f_khjson_file_tbl_ld_ghsb_detail');          
            
					
            tbl_ld_ghsb_detail.fk_tbl_maintable_sys_id = controlObj.text('detail_fk_tbl_maintable_sys_id_tbl_ld_ghsb_detail');          
            
			            tbl_ld_ghsb_detail.f_lcfj = controlObj.fileuploaderid('detail_f_lcfj_tbl_ld_ghsb_detail');          
            
			            tbl_ld_ghsb_detail.f_zt = controlObj.singledropdownlist('detail_f_zt_tbl_ld_ghsb_detail');
            tbl_ld_ghsb_detail.f_ztid = controlObj.singledropdownlistid('detail_f_zt_tbl_ld_ghsb_detail');          
            
					
            tbl_ld_ghsb_detail.f_bz = controlObj.text('detail_f_bz_tbl_ld_ghsb_detail');          
            		
            callBackFunction.success(tbl_ld_ghsb_detail);
        }
        catch (ex)
        {
            callBackFunction.fail( ex.message );
        }
    },

    /* 
    *  
    *  方法:checkModel
    *  参数:tbl_ld_ghsb_detail，callbackFunction
    *  页面数据校验，会用到_validateMessage，校验结果分success，fail
    */
    checkModel = function (tbl_ld_ghsb_detail, callBackFunction)
    {
        try
        {
            var errorMessageHansMap = new hashMap();
            var errorMessagePlacementHansMap = new hashMap();

           
       

            		   
            if (tbl_ld_ghsb_detail.f_value1.length > 200)
            {			
                errorMessageHansMap.put('detail_f_value1_tbl_ld_ghsb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ghsb_detail.f_value2.length > 200)
            {			
                errorMessageHansMap.put('detail_f_value2_tbl_ld_ghsb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
            if (tbl_ld_ghsb_detail.f_value2.length < 1)
            {
                errorMessageHansMap.put('detail_f_value2_tbl_ld_ghsb_detail', '长度小于<a style="color:red">1</a>个字');
            }

            		   
            if (tbl_ld_ghsb_detail.f_value3.length > 200)
            {			
                errorMessageHansMap.put('detail_f_value3_tbl_ld_ghsb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ghsb_detail.f_value4.length > 200)
            {			
                errorMessageHansMap.put('detail_f_value4_tbl_ld_ghsb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ghsb_detail.f_value5.length > 200)
            {			
                errorMessageHansMap.put('detail_f_value5_tbl_ld_ghsb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ghsb_detail.f_value6.length > 200)
            {			
                errorMessageHansMap.put('detail_f_value6_tbl_ld_ghsb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ghsb_detail.f_value7.length > 200)
            {			
                errorMessageHansMap.put('detail_f_value7_tbl_ld_ghsb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ghsb_detail.f_value8.length > 200)
            {			
                errorMessageHansMap.put('detail_f_value8_tbl_ld_ghsb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ghsb_detail.f_value9.length > 200)
            {			
                errorMessageHansMap.put('detail_f_value9_tbl_ld_ghsb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ghsb_detail.f_value10.length > 200)
            {			
                errorMessageHansMap.put('detail_f_value10_tbl_ld_ghsb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ghsb_detail.f_ghsbbh.length > 200)
            {			
                errorMessageHansMap.put('detail_f_ghsbbh_tbl_ld_ghsb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ghsb_detail.f_ghsbmc.length > 200)
            {			
                errorMessageHansMap.put('detail_f_ghsbmc_tbl_ld_ghsb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ghsb_detail.f_sqr.length > 200)
            {			
                errorMessageHansMap.put('detail_f_sqr_tbl_ld_ghsb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ghsb_detail.f_sqrid.length > 200)
            {			
                errorMessageHansMap.put('detail_f_sqrid_tbl_ld_ghsb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		
         

            		   
            if (tbl_ld_ghsb_detail.f_czr.length > 200)
            {			
                errorMessageHansMap.put('detail_f_czr_tbl_ld_ghsb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ghsb_detail.f_czrid.length > 200)
            {			
                errorMessageHansMap.put('detail_f_czrid_tbl_ld_ghsb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		
         

            		   
            if (tbl_ld_ghsb_detail.f_khbh.length > 200)
            {			
                errorMessageHansMap.put('detail_f_khbh_tbl_ld_ghsb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            if (tbl_ld_ghsb_detail.f_khbh.length < 1)
            {
                errorMessageHansMap.put('detail_f_khbh_tbl_ld_ghsb_detail', '长度不能小于<a style="color:red">1</a>个字');
            }
            		   
            if (tbl_ld_ghsb_detail.f_khbhid.length > 200)
            {			
                errorMessageHansMap.put('detail_f_khbhid_tbl_ld_ghsb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ghsb_detail.f_khxx.length > 200)
            {			
                errorMessageHansMap.put('detail_f_khxx_tbl_ld_ghsb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ghsb_detail.f_oldsbbh.length > 200)
            {			
                errorMessageHansMap.put('detail_f_oldsbbh_tbl_ld_ghsb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ghsb_detail.f_oldsbh.length > 200)
            {			
                errorMessageHansMap.put('detail_f_oldsbh_tbl_ld_ghsb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ghsb_detail.f_oldlxth.length > 200)
            {			
                errorMessageHansMap.put('detail_f_oldlxth_tbl_ld_ghsb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ghsb_detail.f_oldsbfz.length > 200)
            {			
                errorMessageHansMap.put('detail_f_oldsbfz_tbl_ld_ghsb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ghsb_detail.f_oldsbpp.length > 200)
            {			
                errorMessageHansMap.put('detail_f_oldsbpp_tbl_ld_ghsb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ghsb_detail.f_oldmph.length > 200)
            {			
                errorMessageHansMap.put('detail_f_oldmph_tbl_ld_ghsb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ghsb_detail.f_oldsblx.length > 200)
            {			
                errorMessageHansMap.put('detail_f_oldsblx_tbl_ld_ghsb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ghsb_detail.f_oldjllx.length > 200)
            {			
                errorMessageHansMap.put('detail_f_oldjllx_tbl_ld_ghsb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ghsb_detail.f_oldrs.length > 200)
            {			
                errorMessageHansMap.put('detail_f_oldrs_tbl_ld_ghsb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ghsb_detail.f_oldsbkj.length > 200)
            {			
                errorMessageHansMap.put('detail_f_oldsbkj_tbl_ld_ghsb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ghsb_detail.f_oldsbdz.length > 200)
            {			
                errorMessageHansMap.put('detail_f_oldsbdz_tbl_ld_ghsb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		
         

            		   
            if (tbl_ld_ghsb_detail.f_oldqfzt.length > 200)
            {			
                errorMessageHansMap.put('detail_f_oldqfzt_tbl_ld_ghsb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ghsb_detail.f_oldsynx.length > 200)
            {			
                errorMessageHansMap.put('detail_f_oldsynx_tbl_ld_ghsb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ghsb_detail.f_oldcszm.length > 200)
            {			
                errorMessageHansMap.put('detail_f_oldcszm_tbl_ld_ghsb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ghsb_detail.f_oldqsqpjsl.length > 200)
            {			
                errorMessageHansMap.put('detail_f_oldqsqpjsl_tbl_ld_ghsb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ghsb_detail.f_oldqlqpjsl.length > 200)
            {			
                errorMessageHansMap.put('detail_f_oldqlqpjsl_tbl_ld_ghsb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ghsb_detail.f_oldbqzm.length > 200)
            {			
                errorMessageHansMap.put('detail_f_oldbqzm_tbl_ld_ghsb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ghsb_detail.f_oldsqzm.length > 200)
            {			
                errorMessageHansMap.put('detail_f_oldsqzm_tbl_ld_ghsb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ghsb_detail.f_oldsqsl.length > 200)
            {			
                errorMessageHansMap.put('detail_f_oldsqsl_tbl_ld_ghsb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ghsb_detail.f_olddysl.length > 200)
            {			
                errorMessageHansMap.put('detail_f_olddysl_tbl_ld_ghsb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ghsb_detail.f_oldljgl.length > 200)
            {			
                errorMessageHansMap.put('detail_f_oldljgl_tbl_ld_ghsb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ghsb_detail.f_oldnysl.length > 200)
            {			
                errorMessageHansMap.put('detail_f_oldnysl_tbl_ld_ghsb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ghsb_detail.f_oldzt.length > 200)
            {			
                errorMessageHansMap.put('detail_f_oldzt_tbl_ld_ghsb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ghsb_detail.f_ysbbz.length > 4000)
            {			
                errorMessageHansMap.put('detail_f_ysbbz_tbl_ld_ghsb_detail', '长度不能超过<a style="color:red">4000</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ghsb_detail.f_newsbbh.length > 200)
            {			
                errorMessageHansMap.put('detail_f_newsbbh_tbl_ld_ghsb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ghsb_detail.f_newxsbjsbh.length > 200)
            {			
                errorMessageHansMap.put('detail_f_newxsbjsbh_tbl_ld_ghsb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ghsb_detail.f_oldxsblxth.length > 200)
            {			
                errorMessageHansMap.put('detail_f_oldxsblxth_tbl_ld_ghsb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ghsb_detail.f_newsbfz.length > 200)
            {			
                errorMessageHansMap.put('detail_f_newsbfz_tbl_ld_ghsb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ghsb_detail.f_newsbpp.length > 200)
            {			
                errorMessageHansMap.put('detail_f_newsbpp_tbl_ld_ghsb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ghsb_detail.f_newmph.length > 200)
            {			
                errorMessageHansMap.put('detail_f_newmph_tbl_ld_ghsb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ghsb_detail.f_newsblx.length > 200)
            {			
                errorMessageHansMap.put('detail_f_newsblx_tbl_ld_ghsb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            if (tbl_ld_ghsb_detail.f_newsblx.length < 1)
            {
                errorMessageHansMap.put('detail_f_newsblx_tbl_ld_ghsb_detail', '长度不能小于<a style="color:red">1</a>个字');
            }

            if (tbl_ld_ghsb_detail.f_newjllx.length > 200)
            {			
                errorMessageHansMap.put('detail_f_newjllx_tbl_ld_ghsb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }
            if (tbl_ld_ghsb_detail.f_newjllx.length < 1)
            {
                errorMessageHansMap.put('detail_f_newjllx_tbl_ld_ghsb_detail', '长度不能小于1个字');
            }

            if (tbl_ld_ghsb_detail.f_newrs.length > 200)
            {			
                errorMessageHansMap.put('detail_f_newrs_tbl_ld_ghsb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }
            if (tbl_ld_ghsb_detail.f_newrs != "" && !/^[0-9]+\.?[0-9]*$/.test(tbl_ld_ghsb_detail.f_newrs))
            {
                errorMessageHansMap.put('detail_f_newrs_tbl_ld_ghsb_detail', '必须是数字');
            }
            if (tbl_ld_ghsb_detail.f_newrs.length < 1)
            {
                errorMessageHansMap.put('detail_f_newrs_tbl_ld_ghsb_detail', '长度不能小于<a style="color:red">1</a>个字');
            }

            if (tbl_ld_ghsb_detail.f_newsbkj.length > 200)
            {			
                errorMessageHansMap.put('detail_f_newsbkj_tbl_ld_ghsb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_ghsb_detail.f_newsbdz.length > 200)
            {			
                errorMessageHansMap.put('detail_f_newsbdz_tbl_ld_ghsb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_ghsb_detail.f_newsynx.length > 200)
            {			
                errorMessageHansMap.put('detail_f_newsynx_tbl_ld_ghsb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }
            if (tbl_ld_ghsb_detail.f_newsynx.length < 1)
            {
                errorMessageHansMap.put('detail_f_newsynx_tbl_ld_ghsb_detail', '长度不能小于1个字');
            }
            if (tbl_ld_ghsb_detail.f_newsynx != "" && !/^[0-9]+\.?[0-9]*$/.test(tbl_ld_ghsb_detail.f_newsynx))
            {
                errorMessageHansMap.put('detail_f_newsynx_tbl_ld_ghsb_detail', '必须是数字');
            }

            if (tbl_ld_ghsb_detail.f_newqfzt.length > 200)
            {			
                errorMessageHansMap.put('detail_f_newqfzt_tbl_ld_ghsb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_ghsb_detail.f_newcszm.length > 200)
            {			
                errorMessageHansMap.put('detail_f_newcszm_tbl_ld_ghsb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }
            if (tbl_ld_ghsb_detail.f_newcszm.length < 1)
            {
                errorMessageHansMap.put('detail_f_newcszm_tbl_ld_ghsb_detail', '长度不能小于1个字');
            }
            if (tbl_ld_ghsb_detail.f_newcszm != "" && !/^[0-9]+\.?[0-9]*$/.test(tbl_ld_ghsb_detail.f_newcszm))
            {
                errorMessageHansMap.put('detail_f_newcszm_tbl_ld_ghsb_detail', '必须是数字');
            }

            if (tbl_ld_ghsb_detail.f_newqsqpjsl.length > 200)
            {			
                errorMessageHansMap.put('detail_f_newqsqpjsl_tbl_ld_ghsb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

            		   
            if (tbl_ld_ghsb_detail.f_newqlqpjsl.length > 200)
            {			
                errorMessageHansMap.put('detail_f_newqlqpjsl_tbl_ld_ghsb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ghsb_detail.f_newbqzm.length > 200)
            {			
                errorMessageHansMap.put('detail_f_newbqzm_tbl_ld_ghsb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ghsb_detail.f_newsqzm.length > 200)
            {			
                errorMessageHansMap.put('detail_f_newsqzm_tbl_ld_ghsb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ghsb_detail.f_newsqsl.length > 200)
            {			
                errorMessageHansMap.put('detail_f_newsqsl_tbl_ld_ghsb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ghsb_detail.f_newdysl.length > 200)
            {			
                errorMessageHansMap.put('detail_f_newdysl_tbl_ld_ghsb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ghsb_detail.f_newljgl.length > 200)
            {			
                errorMessageHansMap.put('detail_f_newljgl_tbl_ld_ghsb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ghsb_detail.f_newnysl.length > 200)
            {			
                errorMessageHansMap.put('detail_f_newnysl_tbl_ld_ghsb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ghsb_detail.f_newzt.length > 200)
            {			
                errorMessageHansMap.put('detail_f_newzt_tbl_ld_ghsb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ghsb_detail.f_xsbfj.length > 4000)
            {			
                errorMessageHansMap.put('detail_f_xsbfj_tbl_ld_ghsb_detail', '长度不能超过<a style="color:red">4000</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ghsb_detail.f_xsbbz.length > 4000)
            {			
                errorMessageHansMap.put('detail_f_xsbbz_tbl_ld_ghsb_detail', '长度不能超过<a style="color:red">4000</a>个字');
            }		
            		
         

            		
         

            		   
            if (tbl_ld_ghsb_detail.fk_tbl_maintable_sys_id.length > 200)
            {			
                errorMessageHansMap.put('detail_fk_tbl_maintable_sys_id_tbl_ld_ghsb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ghsb_detail.f_lcfj.length > 4000)
            {			
                errorMessageHansMap.put('detail_f_lcfj_tbl_ld_ghsb_detail', '长度不能超过<a style="color:red">4000</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ghsb_detail.f_zt.length > 200)
            {			
                errorMessageHansMap.put('detail_f_zt_tbl_ld_ghsb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_ghsb_detail.f_bz.length > 4000)
            {			
                errorMessageHansMap.put('detail_f_bz_tbl_ld_ghsb_detail', '长度不能超过<a style="color:red">4000</a>个字');
            }		
            		
         	
            if (errorMessageHansMap.keys().length > 0)
            {
                _validateMessage.show(errorMessageHansMap, errorMessagePlacementHansMap, true);
                callBackFunction.fail('');
            }
            else
            {
                _validateMessage.hidden();
                callBackFunction.success(tbl_ld_ghsb_detail);
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
            var whereClause = ' fk_tbl_maintable_sys_id = \'' + that._pr_maintable_id + '\'';
            var orderByString = '';            
            var columnsString = 'f_value1^f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^f_khbh^f_khbhid^f_khxx^f_khjson^f_khjsonid^fk_tbl_maintable_sys_id^f_lcfj^f_bz^f_oldsbbh^f_oldsbh^f_oldlxth^f_oldsbfz^f_oldsbfzid^f_oldsbpp^f_oldmph^f_oldsblx^f_oldsblxid^f_oldjllx^f_oldjllxid^f_oldrs^f_oldsbkj^f_oldsbkjid^f_oldsbdz^f_oldazrq^f_oldqfzt^f_oldcszm^f_oldqsqpjsl^f_oldqlqpjsl^f_oldbqzm^f_oldsqzm^f_oldsqsl^f_olddysl^f_oldljgl^f_oldnysl^f_oldzt^f_oldztid^f_ysbbz^f_newsbbh^f_newxsbjsbh^f_oldxsblxth^f_newsbfz^f_newsbfzid^f_newsbpp^f_newmph^f_newsblx^f_newsblxid^f_newjllx^f_newjllxid^f_newrs^f_newsbkj^f_newsbkjid^f_newsbdz^f_newcszm^f_newqsqpjsl^f_newqlqpjsl^f_newbqzm^f_newsqzm^f_newsqsl^f_newdysl^f_newljgl^f_newnysl^f_oldsynx^f_newsynx^f_xsbfj^f_newzt^f_newztid^f_newazrq^f_newqfzt^f_ghsbbh^f_ghsbmc^f_sqr^f_sqrid^f_sqsj^f_czr^f_czrid^f_czsj^f_zt^f_ztid^f_xsbbz^sys_id';
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
                    that._pr_sys_id = messageJson.rows[0].sys_id;

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
        *  参数:tbl_ld_ghsb_detail, callbackFunction
        *  向数据库更新数据，根据数据对象
        */
        updateData = function (tbl_ld_ghsb_detail, callbackFunction)
            {

                var d = new Date();                
            var columns = 'f_value1^f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^f_khbh^f_khbhid^fk_tbl_maintable_sys_id^f_lcfj^f_bz^f_oldsbbh^f_oldsbh^f_oldlxth^f_oldsbfz^f_oldsbfzid^f_oldsbpp^f_oldmph^f_oldsblx^f_oldsblxid^f_oldjllx^f_oldjllxid^f_oldrs^f_oldsbkj^f_oldsbkjid^f_oldsbdz^f_oldazrq^f_oldqfzt^f_oldcszm^f_oldqsqpjsl^f_oldqlqpjsl^f_oldbqzm^f_oldsqzm^f_oldsqsl^f_olddysl^f_oldljgl^f_oldnysl^f_oldzt^f_oldztid^f_ysbbz^f_newsbbh^f_newxsbjsbh^f_oldxsblxth^f_newsbfz^f_newsbfzid^f_newsbpp^f_newmph^f_newsblx^f_newsblxid^f_newjllx^f_newjllxid^f_newrs^f_newsbkj^f_newsbkjid^f_newsbdz^f_newcszm^f_newqsqpjsl^f_newqlqpjsl^f_newbqzm^f_newsqzm^f_newsqsl^f_newdysl^f_newljgl^f_newnysl^f_oldsynx^f_newsynx^f_xsbfj^f_newzt^f_newztid^f_newazrq^f_newqfzt^f_ghsbbh^f_ghsbmc^f_sqr^f_sqrid^f_sqsj^f_czr^f_czrid^f_czsj^f_zt^f_ztid^f_xsbbz^sys_id^sys_lastedituserid^sys_lasteditusername^sys_lasteditdate';
                var json = {
                    sys_id: that._pr_sys_id,
            
            f_value1: "已保存",
		        
				                f_value2:tbl_ld_ghsb_detail.f_value2 ,          
		        
				                f_value3:tbl_ld_ghsb_detail.f_value3 ,          
		        
				                f_value4:tbl_ld_ghsb_detail.f_value4 ,          
		        
				                f_value5:tbl_ld_ghsb_detail.f_value5 ,          
		        
				                f_value6:tbl_ld_ghsb_detail.f_value6 ,          
		        
				                f_value7:tbl_ld_ghsb_detail.f_value7 ,          
		        
				                f_value8:tbl_ld_ghsb_detail.f_value8 ,          
		        
				                f_value9:tbl_ld_ghsb_detail.f_value9 ,          
		        
				                f_value10:tbl_ld_ghsb_detail.f_value10 ,          
		        
				                f_ghsbbh:tbl_ld_ghsb_detail.f_ghsbbh ,          
		        
				                f_ghsbmc:tbl_ld_ghsb_detail.f_ghsbmc ,          
		        
				                f_sqr:tbl_ld_ghsb_detail.f_sqr ,          
		        
				                f_sqrid:tbl_ld_ghsb_detail.f_sqrid ,          
		        
			                    f_sqsj:tbl_ld_ghsb_detail.f_sqsj ,          
		        
				                f_czr:tbl_ld_ghsb_detail.f_czr ,          
		        
				                f_czrid:tbl_ld_ghsb_detail.f_czrid ,          
		        
			                    f_czsj:tbl_ld_ghsb_detail.f_czsj ,          
		        
				                f_khbh:tbl_ld_ghsb_detail.f_khbh ,          
		        
				                f_khbhid:tbl_ld_ghsb_detail.f_khbhid ,          
		        
                //f_khxx: tbl_ld_ghsb_detail.f_khxx,
		        
				                f_oldsbbh:tbl_ld_ghsb_detail.f_oldsbbh ,          
		        
				                f_oldsbh:tbl_ld_ghsb_detail.f_oldsbh ,          
		        
				                f_oldlxth:tbl_ld_ghsb_detail.f_oldlxth ,          
		        
			                    f_oldsbfz:tbl_ld_ghsb_detail.f_oldsbfz ,
                    f_oldsbfzid:tbl_ld_ghsb_detail.f_oldsbfzid,          
		        
				                f_oldsbpp:tbl_ld_ghsb_detail.f_oldsbpp ,          
		        
				                f_oldmph:tbl_ld_ghsb_detail.f_oldmph ,          
		        
			                    f_oldsblx:tbl_ld_ghsb_detail.f_oldsblx ,
                    f_oldsblxid:tbl_ld_ghsb_detail.f_oldsblxid,          
		        
			                    f_oldjllx:tbl_ld_ghsb_detail.f_oldjllx ,
                    f_oldjllxid:tbl_ld_ghsb_detail.f_oldjllxid,          
		        
				                f_oldrs:tbl_ld_ghsb_detail.f_oldrs ,          
		        
			                    f_oldsbkj:tbl_ld_ghsb_detail.f_oldsbkj ,
                    f_oldsbkjid:tbl_ld_ghsb_detail.f_oldsbkjid,          
		        
				                f_oldsbdz:tbl_ld_ghsb_detail.f_oldsbdz ,          
		        
			                    f_oldazrq:tbl_ld_ghsb_detail.f_oldazrq ,          
		        
			                    f_oldqfzt:tbl_ld_ghsb_detail.f_oldqfzt ,          
		        
				                f_oldsynx:tbl_ld_ghsb_detail.f_oldsynx ,          
		        
				                f_oldcszm:tbl_ld_ghsb_detail.f_oldcszm ,          
		        
				                f_oldqsqpjsl:tbl_ld_ghsb_detail.f_oldqsqpjsl ,          
		        
				                f_oldqlqpjsl:tbl_ld_ghsb_detail.f_oldqlqpjsl ,          
		        
				                f_oldbqzm:tbl_ld_ghsb_detail.f_oldbqzm ,          
		        
				                f_oldsqzm:tbl_ld_ghsb_detail.f_oldsqzm ,          
		        
				                f_oldsqsl:tbl_ld_ghsb_detail.f_oldsqsl ,          
		        
				                f_olddysl:tbl_ld_ghsb_detail.f_olddysl ,          
		        
				                f_oldljgl:tbl_ld_ghsb_detail.f_oldljgl ,          
		        
				                f_oldnysl:tbl_ld_ghsb_detail.f_oldnysl ,          
		        
			                    f_oldzt:tbl_ld_ghsb_detail.f_oldzt ,
                    f_oldztid:tbl_ld_ghsb_detail.f_oldztid,          
		        
				                f_ysbbz:tbl_ld_ghsb_detail.f_ysbbz.formatStringRN() ,          
		        
				                f_newsbbh:tbl_ld_ghsb_detail.f_newsbbh ,          
		        
				                f_newxsbjsbh:tbl_ld_ghsb_detail.f_newxsbjsbh ,          
		        
				                f_oldxsblxth:tbl_ld_ghsb_detail.f_oldxsblxth ,          
		        
			                    f_newsbfz:tbl_ld_ghsb_detail.f_newsbfz ,
                    f_newsbfzid:tbl_ld_ghsb_detail.f_newsbfzid,          
		        
				                f_newsbpp:tbl_ld_ghsb_detail.f_newsbpp ,          
		        
				                f_newmph:tbl_ld_ghsb_detail.f_newmph ,          
		        
			                    f_newsblx:tbl_ld_ghsb_detail.f_newsblx ,
                    f_newsblxid:tbl_ld_ghsb_detail.f_newsblxid,          
		        
			                    f_newjllx:tbl_ld_ghsb_detail.f_newjllx ,
                    f_newjllxid:tbl_ld_ghsb_detail.f_newjllxid,          
		        
				                f_newrs:tbl_ld_ghsb_detail.f_newrs ,          
		        
			                    f_newsbkj:tbl_ld_ghsb_detail.f_newsbkj ,
                    f_newsbkjid:tbl_ld_ghsb_detail.f_newsbkjid,          
		        
				                f_newsbdz:tbl_ld_ghsb_detail.f_newsbdz ,          
		        
				                f_newsynx:tbl_ld_ghsb_detail.f_newsynx ,          
		        
			                    f_newazrq:tbl_ld_ghsb_detail.f_newazrq ,          
		        
			                    f_newqfzt:tbl_ld_ghsb_detail.f_newqfzt ,          
		        
				                f_newcszm:tbl_ld_ghsb_detail.f_newcszm ,          
		        
				                f_newqsqpjsl:tbl_ld_ghsb_detail.f_newqsqpjsl ,          
		        
				                f_newqlqpjsl:tbl_ld_ghsb_detail.f_newqlqpjsl ,          
		        
				                f_newbqzm:tbl_ld_ghsb_detail.f_newbqzm ,          
		        
				                f_newsqzm:tbl_ld_ghsb_detail.f_newsqzm ,          
		        
				                f_newsqsl:tbl_ld_ghsb_detail.f_newsqsl ,          
		        
				                f_newdysl:tbl_ld_ghsb_detail.f_newdysl ,          
		        
				                f_newljgl:tbl_ld_ghsb_detail.f_newljgl ,          
		        
				                f_newnysl:tbl_ld_ghsb_detail.f_newnysl ,          
		        
			                    f_newzt:tbl_ld_ghsb_detail.f_newzt ,
                    f_newztid:tbl_ld_ghsb_detail.f_newztid,          
		        
						
                    f_xsbfj:tbl_ld_ghsb_detail.f_xsbfj ,          
		        
				                f_xsbbz:tbl_ld_ghsb_detail.f_xsbbz.formatStringRN() ,          
		        
                //f_khjson: tbl_ld_ghsb_detail.f_khjson,
                //f_khjsonid: tbl_ld_ghsb_detail.f_khjsonid,
		        
				                fk_tbl_maintable_sys_id:tbl_ld_ghsb_detail.fk_tbl_maintable_sys_id ,          
		        
						
                    f_lcfj:tbl_ld_ghsb_detail.f_lcfj ,          
		        
			                    f_zt:tbl_ld_ghsb_detail.f_zt ,
                    f_ztid:tbl_ld_ghsb_detail.f_ztid,          
		        
				                f_bz:tbl_ld_ghsb_detail.f_bz.formatStringRN() ,          
		        
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
        *  方法:f_sqsj_time_onchange
        *  参数:
        *  申请时间 onchange事件
        */
            f_sqsj_time_onchange = function (e)
            {
                var r = e.currentTarget.id
            },
        /* 
        *  
        *  方法:f_sqsj_date_onchange
        *  参数:
        *  申请时间 onchange事件
        */
            f_sqsj_date_onchange = function (ev)
            {           
                var controlid = e.target.id
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
            *  方法:f_oldsbfz_onchange
            *  参数:changeEventParameter
            *  水表分组onchange事件
            */
            f_oldsbfz_onchange = function (e)
            {
                var controlid = e.target.id;
            },          
    
          
    
          
    
	       
            /* 
            *  
            *  方法:f_oldsblx_onchange
            *  参数:changeEventParameter
            *  水表类型onchange事件
            */
            f_oldsblx_onchange = function (e)
            {
                var controlid = e.target.id;
            },          
    
	       
            /* 
            *  
            *  方法:f_oldjllx_onchange
            *  参数:changeEventParameter
            *  计量类型onchange事件
            */
            f_oldjllx_onchange = function (e)
            {
                var controlid = e.target.id;
            },          
    
          
    
	       
            /* 
            *  
            *  方法:f_oldsbkj_onchange
            *  参数:changeEventParameter
            *  水表口径onchange事件
            */
            f_oldsbkj_onchange = function (e)
            {
                var controlid = e.target.id;
            },          
    
          
    
			
        /* 
        *  
        *  方法:f_oldazrq_time_onchange
        *  参数:
        *  安装日期 onchange事件
        */
            f_oldazrq_time_onchange = function (e)
            {
                var r = e.currentTarget.id
            },
        /* 
        *  
        *  方法:f_oldazrq_date_onchange
        *  参数:
        *  安装日期 onchange事件
        */
            f_oldazrq_date_onchange = function (ev)
            {           
                var controlid = e.target.id
            },          
    
			
            /* 
            *  
            *  方法:f_oldqfzt_onchange
            *  参数:event, state
            *  铅封状态切换事件
            */
            f_oldqfzt_onchange = function (event, state)
            {
                var controlid = event.currentTarget.id;
            },          
    
          
    
          
    
          
    
          
    
          
    
          
    
          
    
          
    
          
    
          
    
	       
            /* 
            *  
            *  方法:f_oldzt_onchange
            *  参数:changeEventParameter
            *  状态onchange事件
            */
            f_oldzt_onchange = function (e)
            {
                var controlid = e.target.id;
            },          
    
          
    
          
    
          
    
          
    
            /* 
            *  
            *  方法:f_newsbfz_onchange
            *  参数:changeEventParameter
            *  新水表水表分组onchange事件
            */
            f_newsbfz_onchange = function (e)
            {
                var controlid = e.target.id;
            },          
    
          
    
          
    
	       
            /* 
            *  
            *  方法:f_newsblx_onchange
            *  参数:changeEventParameter
            *  新水表类型onchange事件
            */
            f_newsblx_onchange = function (e)
            {
                var controlid = e.target.id;
            },          
    
	       
            /* 
            *  
            *  方法:f_newjllx_onchange
            *  参数:changeEventParameter
            *  新水表计量类型onchange事件
            */
            f_newjllx_onchange = function (e)
            {
                var controlid = e.target.id;
            },          
    
          
    
	       
            /* 
            *  
            *  方法:f_newsbkj_onchange
            *  参数:changeEventParameter
            *  新水表口径onchange事件
            */
            f_newsbkj_onchange = function (e)
            {
                var controlid = e.target.id;
            },          
    
          
    
          
    
			
        /* 
        *  
        *  方法:f_newazrq_time_onchange
        *  参数:
        *  新水表安装日期 onchange事件
        */
            f_newazrq_time_onchange = function (e)
            {
                var r = e.currentTarget.id
            },
        /* 
        *  
        *  方法:f_newazrq_date_onchange
        *  参数:
        *  新水表安装日期 onchange事件
        */
            f_newazrq_date_onchange = function (ev)
            {           
                var controlid = e.target.id
            },          
    
			
            /* 
            *  
            *  方法:f_newqfzt_onchange
            *  参数:event, state
            *  新水表铅封状态切换事件
            */
            f_newqfzt_onchange = function (event, state)
            {
                var controlid = event.currentTarget.id;
            },          
    
          
    
          
    
          
    
          
    
          
    
          
    
          
    
          
    
          
    
	       
            /* 
            *  
            *  方法:f_newzt_onchange
            *  参数:changeEventParameter
            *  状态onchange事件
            */
            f_newzt_onchange = function (e)
            {
                var controlid = e.target.id;
            },          
    
        /* 
        *  
        *  方法:f_xsbfj_onchange
        *  参数:
        *  新水表附件 onchange事件
        */
            f_xsbfj_onchange = function ()
            {       
                var fileid = controlObj.fileuploaderid( 'detail_f_xsbfj_tbl_ld_ghsb_detail' );
            },          
    
          
    
			 
            /* 
            *  
            *  方法:f_khjson_onchange
            *  参数:contents, $editable
            *  客户json onchange事件
            */
            f_khjson_onchange = function (contents, e)
            {
                var controlid = e.context.id;
            },
            f_khjson_file_onchange= function ()
            {
                var fileid = controlObj.fileuploaderid( 'detail_f_khjson_file_tbl_ld_ghsb_detail' );
                var serviceFileUrl = '//127.0.0.1/sara.dd.ldsw.file/service/fileupload/service_fileuploaddo.asmx/';
                var data = { fileid: fileid };
                doAjaxFunction( serviceFileUrl, 'getFileListByFileid', data, {
                    success: function ( result )
                    {
                        try
                        {
                            var messageJsonArray = ( new Function( "", "return " + result ) )();
                            var html = '';
                            $.each( messageJsonArray, function ( i, u )
                            {
                                var fileJson = messageJsonArray[i];
                                var nameArr = fileJson["fileuploadname"].split( '.' );
                                var fileextname = nameArr[nameArr.length - 1];
                                if ( ',jpg,jpeg,gif,png,bmp,'.indexOf(( ',' + fileextname + ',' ).toLowerCase() ) > -1 )
                                {
                                    html += '<div class="div_imgtorich" fileuploadname="' + fileJson["fileuploadname"] + '" filerealname="' + fileJson["filerealname"] + '"   fileextname = "' + fileextname + '">';
                                    html += fileJson["filerealname"];
                                    html += '<img width="100" height="50" alt="' + fileJson["filerealname"] + '" src = "' + html5fileuploader_DefaultOps.fileUploadRootPath + 'fileuploadpath/' + fileJson["fileuploadname"] + '"/>';
                                    html += '</div>';
                                }
                                else
                                {
                                    html += '<div class="div_filetorich" fileuploadname="' + fileJson["fileuploadname"] + '" filerealname="' + fileJson["filerealname"] + '"   fileextname = "' + fileextname + '" >';
                                    html += '<a>' + fileJson["filerealname"] + '</a>';
                                    html += '</div>';
                                }
                            } );
                            var $resource = $( '#detail_f_khjson_resource_tbl_ld_ghsb_detail' );
                            $resource.html( html );
                            $resource.find( '.div_imgtorich,.div_filetorich' ).on( 'click', function ( e )
                            {
                                var $div = $( e.target.parentElement );
                                var fileuploadname = $div.attr( 'fileuploadname' );
                                var filerealname = $div.attr( 'filerealname' );
                                var fileextname = $div.attr( 'fileextname' );

                                switch ( fileextname.toLowerCase() )
                                {
                                    case "png":
                                    case "gif":
                                    case "jpg":
                                    case "jpeg":
                                    case "bmp":
                                        {
                                            controlObj.richtext( 'detail_f_khjson_tbl_ld_ghsb_detail', '<br/><img src = "' + html5fileuploader_DefaultOps.fileUploadRootPath + 'fileuploadpath/' + fileuploadname + '" style="position:static;max-width: 100%;"/>' + controlObj.richtext( 'detail_f_khjson_tbl_ld_ghsb_detail' ) );
                                        }
                                        break;
                                    default:
                                        {
                                            controlObj.richtext( 'detail_f_khjson_tbl_ld_ghsb_detail', '<br/><a href = "' + html5fileuploader_DefaultOps.fileUploadRootPath + 'fileuploadpath/' + fileuploadname + '">' + filerealname + '</a>' + controlObj.richtext( 'detail_f_khjson_tbl_ld_ghsb_detail' ) );
                                        }
                                        break;
                                }

                            } );
                        }
                        catch ( ex )
                        {   
                            _alertMessage.show('getFileListByFileid执行失败。','fail');
                            _resultMessage.show('getFileListByFileid执行失败<br/>' + ex.message, 'fail');  
                        }
                    },
                    fail: function ( message )
                    {
                        _alertMessage.show('getFileListByFileid执行失败。','fail');
                        _resultMessage.show('getFileListByFileid执行失败<br/>' + message, 'fail');  
                    }
                } );
            },          
    
          
    
        /* 
        *  
        *  方法:f_lcfj_onchange
        *  参数:
        *  流程附件 onchange事件
        */
            f_lcfj_onchange = function ()
            {       
                var fileid = controlObj.fileuploaderid( 'detail_f_lcfj_tbl_ld_ghsb_detail' );
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
            _pr_maintable_id:'',
            _pr_pagetype: '',
        //_pr_fromurl: '',
        //_pr_fromurlparam: '',
        //_pr_appcode: '',
        //区分居民和大客户（1 大客户，2 居民）
        _pr_iskhlx: '',
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
                                                   
                                that.bindPage({
                                    success: function ()
                                    {
                                                            _validateMessage = new validateMessage('btn_command_save_tbl_ld_ghsb_detail');

                                                            _ladda_btn_command_save = Ladda.create('btn_command_save_tbl_ld_ghsb_detail');

                                                            switch (that._pr_pagetype)
                                                            {
                                                                case "1":
                                                                    setDisable(false);
                                                                    break;
                                                                case "2":
                                                                    setDisable(true);
                                                                    break;
                                                            }
                                        $('#div_container_tbl_ld_ghsb_list').load('../tbl_ld_khb/tbl_ld_khb_list_part4lc.html', null, function ()
                                        {
                                            //switch (that._pr_iskhlx)
                                            //{

                                            //    case '1':
                                            //        tbl_ld_khb_list_Obj._pr_where = " f_cbbhid in (select sys_id from tbl_ld_cben where f_value1='1')";
                                            //        break;
                                            //    case '2':
                                            //        tbl_ld_khb_list_Obj._pr_where = " f_cbbhid in (select sys_id from tbl_ld_cben where f_value1='2')";
                                            //        break;
                                            //}
                                            tbl_ld_khb_list_Obj._pr_listtype = that._pr_pagetype;
                                            tbl_ld_khb_list_Obj._pr_f_value2 = that._pr_sys_id;
                                            tbl_ld_khb_list_Obj._pr_f_value1 = that._pr_iskhlx;
                                            tbl_ld_khb_list_Obj.init({
                                                                success:function()
                                                                {
                                                    $('#div_container_tbl_ld_ghsb_list').css('display', '');
                                                    $('#div_loading_tbl_ld_ghsb_list').css('display', 'none');

                                                    _blockMessage.hidden();
                                                }
                                            });

                                        });
                                                                    callBackFunction.success();
                                                                }
                                                                
                                                            });

                                                            
                                                            
                                                       
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
                        success: function (tbl_ld_ghsb_detail)
                            {
                                setModel(tbl_ld_ghsb_detail, {
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
                        success: function (tbl_ld_ghsb_detail)
                            {
                                checkModel(tbl_ld_ghsb_detail, {
                                    success: function (tbl_ld_ghsb_detail)
                                        {
                                            updateData(tbl_ld_ghsb_detail, {
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
                tbl_ld_ghsb_list_Obj.bindGrid({
                    success: function ()
                    {
                        $('#div_content_part_tbl_ld_ghsb_list').css('display', '');
                        $('#div_content_part_tbl_ld_ghsb_detail').css('display', 'none');
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
        btn_command_opensearch_onclick: function ()
        {
            debugger;
            var khbh = controlObj.text('detail_f_khbh_tbl_ld_ghsb_detail');
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
            $('#div_search_modal_tbl_ld_ghsb_detail').modal('show');
        },
        btn_search_modal_search_onclick: function (callBackFunction)
        {
         
            $('#div_search_modal_tbl_ld_ghsb_detail').modal('hide');
            var idArray = tbl_ld_khb_list_Obj._pr_gridselectids.split('^');
            if (idArray.length == 1 && idArray[0] != '')
            {
                switch (that._pr_iskhlx)
                {
                    case '1':
                        var czlx = "更换水表_大客户" + "_" + basePageObj._userInfoJson.sys_username;
                        break;
                    case '2':
                        var czlx = "更换水表_居民" + "_" + basePageObj._userInfoJson.sys_username;
                        break;
                }
                var khbh = controlObj.text('detail_f_khbh_tbl_ld_ghsb_detail');
                var khbhid = controlObj.text('detail_f_khbhid_tbl_ld_ghsb_detail');
                var clearKhbhString = khbh;
                //如果两个客户编号不相同   那么将第一个客户的f_value1和f_value2清空
                var json = {
                    sys_id: that._pr_sys_id,
                    sys_lasteditusername: basePageObj._userInfoJson.sys_username,
                    sys_lastedituserid: basePageObj._userInfoJson.sys_userid,
                };
                var data = {
                    khidString: idArray[0],
                    czlxString: czlx,
                    czidString: that._pr_sys_id,
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
                        tbl_ld_ghsb_detail_Obj._khJson = { khxx: "", yhxx: "", sbxx: "" };
                        tbl_ld_ghsb_detail_Obj._khJson["khxx"] = khxx[0];
                        tbl_ld_ghsb_detail_Obj._khJson["yhxx"] = yhxx[0];
                        tbl_ld_ghsb_detail_Obj._khJson["sbxx"] = sbxx[0];
                        var khbh = controlObj.text('detail_f_khbh_tbl_ld_ghsb_detail');
                        var khbhid = controlObj.text('detail_f_khbhid_tbl_ld_ghsb_detail');
                        //controlObj.textdisable('detail_f_yhm_tbl_ld_ghsb_detail', true);
                        //controlObj.textdisable('detail_f_dz_tbl_ld_ghsb_detail', true);
                        //controlObj.textdisable('detail_f_dh_tbl_ld_ghsb_detail', true);
                        //客户信息
                        controlObj.text('detail_f_khbh_tbl_ld_ghsb_detail', khxx[0].f_khbh);
                        controlObj.text('detail_f_yhm_tbl_ld_ghsb_detail', khxx[0].f_yhm);
                        controlObj.text('detail_f_dz_tbl_ld_ghsb_detail', khxx[0].f_dz);
                        controlObj.text('detail_f_dh_tbl_ld_ghsb_detail', khxx[0].f_dh);
                        controlObj.text('detail_f_khbhid_tbl_ld_ghsb_detail', khxx[0].sys_id);
                        //旧水表信息
                        controlObj.text('detail_f_oldsbbh_tbl_ld_ghsb_detail', sbxx[0].f_sbbh);
                        controlObj.text('detail_f_oldsbh_tbl_ld_ghsb_detail', sbxx[0].f_ztsbh);
                        controlObj.text('detail_f_oldlxth_tbl_ld_ghsb_detail', sbxx[0].f_lxth);
                        controlObj.multidropdownlistid('detail_f_oldsbfz_tbl_ld_ghsb_detail', sbxx[0].f_sbfzid);
                        controlObj.text('detail_f_oldsbpp_tbl_ld_ghsb_detail', sbxx[0].f_sbpp);
                        controlObj.text('detail_f_oldmph_tbl_ld_ghsb_detail', sbxx[0].f_mph);
                        controlObj.singledropdownlistid('detail_f_oldsblx_tbl_ld_ghsb_detail', sbxx[0].f_sblxid);
                        controlObj.singledropdownlistid('detail_f_oldjllx_tbl_ld_ghsb_detail', sbxx[0].f_jllxid);
                        controlObj.text('detail_f_oldrs_tbl_ld_ghsb_detail', sbxx[0].f_rs);
                        controlObj.singledropdownlistid('detail_f_oldsbkj_tbl_ld_ghsb_detail', khxx[0].f_sbkjid);
                        controlObj.text('detail_f_oldsbdz_tbl_ld_ghsb_detail', sbxx[0].f_sbdz);
                        controlObj.toggle('detail_f_oldqfzt_tbl_ld_ghsb_detail', sbxx[0].f_qfzt);
                        controlObj.text('detail_f_oldsynx_tbl_ld_ghsb_detail', sbxx[0].f_synx);
                        controlObj.text('detail_f_oldcszm_tbl_ld_ghsb_detail', sbxx[0].f_cszm);
                        controlObj.text('detail_f_oldqsqpjsl_tbl_ld_ghsb_detail', sbxx[0].f_qsqpjsl);
                        controlObj.text('detail_f_oldqlqpjsl_tbl_ld_ghsb_detail', sbxx[0].f_qlqpjsl);
                        controlObj.text('detail_f_oldbqzm_tbl_ld_ghsb_detail', sbxx[0].f_bqzm);
                        controlObj.text('detail_f_oldsqzm_tbl_ld_ghsb_detail', sbxx[0].f_sqzm);
                        controlObj.text('detail_f_oldsqsl_tbl_ld_ghsb_detail', sbxx[0].f_sqsl);
                        controlObj.text('detail_f_olddysl_tbl_ld_ghsb_detail', sbxx[0].f_dysl);
                        controlObj.text('detail_f_oldljgl_tbl_ld_ghsb_detail', sbxx[0].f_ljgl);
                        controlObj.singledropdownlistid('detail_f_oldzt_tbl_ld_ghsb_detail', sbxx[0].f_ztid)
                        controlObj.text('detail_f_oldnysl_tbl_ld_ghsb_detail', sbxx[0].f_nysl);
                        controlObj.datetime('detail_f_oldazrq_tbl_ld_ghsb_detail_date', 'detail_f_oldazrq_tbl_ld_ghsb_detail_time', sbxx[0].f_azrq);
                        //新水表信息
                        controlObj.multidropdownlistid('detail_f_newsbfz_tbl_ld_ghsb_detail', sbxx[0].f_sbfzid);

                        controlObj.text('detail_f_newsbpp_tbl_ld_ghsb_detail', sbxx[0].f_sbpp);

                        controlObj.text('detail_f_newmph_tbl_ld_ghsb_detail', sbxx[0].f_mph);

                        controlObj.singledropdownlistid('detail_f_newsblx_tbl_ld_ghsb_detail', sbxx[0].f_sblxid);

                        controlObj.singledropdownlistid('detail_f_newjllx_tbl_ld_ghsb_detail', sbxx[0].f_jllxid);

                        controlObj.text('detail_f_newrs_tbl_ld_ghsb_detail', sbxx[0].f_rs);

                        controlObj.singledropdownlistid('detail_f_newsbkj_tbl_ld_ghsb_detail', sbxx[0].f_sbkjid);

                        controlObj.text('detail_f_newsbdz_tbl_ld_ghsb_detail', sbxx[0].f_sbdz);

                        controlObj.text('detail_f_newsynx_tbl_ld_ghsb_detail', sbxx[0].f_synx);

                        controlObj.toggle('detail_f_newqfzt_tbl_ld_ghsb_detail', sbxx[0].f_qfzt);
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
                //    czidString: that._pr_sys_id,
                //    clientInf: _clientInf
                //};
                //doAjaxFunction(_serviceUrl_kh, 'GetKhxxJsonAndSetCzlx', data, {
                //    success: function (message)
                //    {
                //        var messageJson = (new Function("", "return " + message))();
                //        var khxx = (new Function("", "return " + messageJson["khxx"]))();
                //        var yhxx = (new Function("", "return " + messageJson["yhxx"]))()
                //        var sbxx = (new Function("", "return " + messageJson["sbxx"]))()
                //        tbl_ld_ghsb_detail_Obj._khJson = { khxx: "", yhxx: "", sbxx: "" };
                //        tbl_ld_ghsb_detail_Obj._khJson["khxx"] = khxx[0];
                //        tbl_ld_ghsb_detail_Obj._khJson["yhxx"] = yhxx[0];
                //        tbl_ld_ghsb_detail_Obj._khJson["sbxx"] = sbxx[0];
                //        var khbh = controlObj.text('detail_f_khbh_tbl_ld_ghsb_detail');
                //        var khbhid = controlObj.text('detail_f_khbhid_tbl_ld_ghsb_detail');
                //        //controlObj.textdisable('detail_f_yhm_tbl_ld_ghsb_detail', true);
                //        //controlObj.textdisable('detail_f_dz_tbl_ld_ghsb_detail', true);
                //        //controlObj.textdisable('detail_f_dh_tbl_ld_ghsb_detail', true);
                //        //客户信息
                //        controlObj.text('detail_f_khbh_tbl_ld_ghsb_detail', khxx[0].f_khbh);
                //        controlObj.text('detail_f_yhm_tbl_ld_ghsb_detail', khxx[0].f_yhm);
                //        controlObj.text('detail_f_dz_tbl_ld_ghsb_detail', khxx[0].f_dz);
                //        controlObj.text('detail_f_dh_tbl_ld_ghsb_detail', khxx[0].f_dh);
                //        controlObj.text('detail_f_khbhid_tbl_ld_ghsb_detail', khxx[0].sys_id);
                //        //旧水表信息
                //        controlObj.text('detail_f_oldsbbh_tbl_ld_ghsb_detail', sbxx[0].f_sbbh);
                //        controlObj.text('detail_f_oldsbh_tbl_ld_ghsb_detail', sbxx[0].f_ztsbh);
                //        controlObj.text('detail_f_oldlxth_tbl_ld_ghsb_detail', sbxx[0].f_lxth);
                //        controlObj.multidropdownlistid('detail_f_oldsbfz_tbl_ld_ghsb_detail', sbxx[0].f_sbfzid);
                //        controlObj.text('detail_f_oldsbpp_tbl_ld_ghsb_detail', sbxx[0].f_sbpp);
                //        controlObj.text('detail_f_oldmph_tbl_ld_ghsb_detail', sbxx[0].f_mph);
                //        controlObj.singledropdownlistid('detail_f_oldsblx_tbl_ld_ghsb_detail', sbxx[0].f_sblxid);
                //        controlObj.singledropdownlistid('detail_f_oldjllx_tbl_ld_ghsb_detail', sbxx[0].f_jllxid);
                //        controlObj.text('detail_f_oldrs_tbl_ld_ghsb_detail', sbxx[0].f_rs);
                //        controlObj.singledropdownlistid('detail_f_oldsbkj_tbl_ld_ghsb_detail', khxx[0].f_sbkjid);
                //        controlObj.text('detail_f_oldsbdz_tbl_ld_ghsb_detail', sbxx[0].f_sbdz);
                //        controlObj.toggle('detail_f_oldqfzt_tbl_ld_ghsb_detail', sbxx[0].f_qfzt);
                //        controlObj.text('detail_f_oldsynx_tbl_ld_ghsb_detail', sbxx[0].f_synx);
                //        controlObj.text('detail_f_oldcszm_tbl_ld_ghsb_detail', sbxx[0].f_cszm);
                //        controlObj.text('detail_f_oldqsqpjsl_tbl_ld_ghsb_detail', sbxx[0].f_qsqpjsl);
                //        controlObj.text('detail_f_oldqlqpjsl_tbl_ld_ghsb_detail', sbxx[0].f_qlqpjsl);
                //        controlObj.text('detail_f_oldbqzm_tbl_ld_ghsb_detail', sbxx[0].f_bqzm);
                //        controlObj.text('detail_f_oldsqzm_tbl_ld_ghsb_detail', sbxx[0].f_sqzm);
                //        controlObj.text('detail_f_oldsqsl_tbl_ld_ghsb_detail', sbxx[0].f_sqsl);
                //        controlObj.text('detail_f_olddysl_tbl_ld_ghsb_detail', sbxx[0].f_dysl);
                //        controlObj.text('detail_f_oldljgl_tbl_ld_ghsb_detail', sbxx[0].f_ljgl);
                //        controlObj.singledropdownlistid('detail_f_oldzt_tbl_ld_ghsb_detail', sbxx[0].f_ztid)
                //        controlObj.text('detail_f_oldnysl_tbl_ld_ghsb_detail', sbxx[0].f_nysl);
                //        controlObj.datetime('detail_f_oldazrq_tbl_ld_ghsb_detail_date', 'detail_f_oldazrq_tbl_ld_ghsb_detail_time', sbxx[0].f_azrq);
                //        //新水表信息
                //        controlObj.multidropdownlistid('detail_f_newsbfz_tbl_ld_ghsb_detail', sbxx[0].f_sbfzid);
                //        controlObj.text('detail_f_newsbpp_tbl_ld_ghsb_detail', sbxx[0].f_sbpp);
                //        controlObj.text('detail_f_newmph_tbl_ld_ghsb_detail', sbxx[0].f_mph);
                //        controlObj.singledropdownlistid('detail_f_newsblx_tbl_ld_ghsb_detail', sbxx[0].f_sblxid);
                //        controlObj.singledropdownlistid('detail_f_newjllx_tbl_ld_ghsb_detail', sbxx[0].f_jllxid);
                //        controlObj.text('detail_f_newrs_tbl_ld_ghsb_detail', sbxx[0].f_rs);
                //        controlObj.singledropdownlistid('detail_f_newsbkj_tbl_ld_ghsb_detail', sbxx[0].f_sbkjid);
                //        controlObj.text('detail_f_newsbdz_tbl_ld_ghsb_detail', sbxx[0].f_sbdz);
                //        controlObj.text('detail_f_newsynx_tbl_ld_ghsb_detail', sbxx[0].f_synx);
                //        controlObj.toggle('detail_f_newqfzt_tbl_ld_ghsb_detail', sbxx[0].f_qfzt);
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
                //        var yhm = controlObj.text('detail_f_yhm_tbl_ld_ghsb_detail');
                //        var dz = controlObj.text('detail_f_dz_tbl_ld_ghsb_detail');
                //        var dh = controlObj.text('detail_f_dh_tbl_ld_ghsb_detail');
                //        var khxx = yhm + "," + dz + "," + dh;
                //        var khbh = controlObj.text('detail_f_khbh_tbl_ld_ghsb_detail');
                //        var khbhid = controlObj.text('detail_f_khbhid_tbl_ld_ghsb_detail');
                //        var json = {
                //            sys_id: that._pr_sys_id,
                //            f_khbh: khbh,
                //            f_khbhid: khbhid,
                //            f_khjson: tbl_ld_ghsb_detail_Obj._khJson,
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
            $('#div_search_modal_tbl_ld_ghsb_detail').modal('hide')
        },
        save: function (callBackFunction)
        {
            try
            {
                getModel({
                    success: function (tbl_ld_ghsb_detail)
                    {
                        checkModel(tbl_ld_ghsb_detail, {
                            success: function (tbl_ld_ghsb_detail)
                            {
                                updateData(tbl_ld_ghsb_detail, {
                                    success: function ()
                                    {                                        
                                        //_alertMessage.show('保存成功', 'success', 2000);
                                        callBackFunction.success();
                                    },
                                    fail: function (message)
                                    {
                                        _alertMessage.show('保存失败', 'fail');
                                        _resultMessage.show(message);
                                    }
                                });
                            },
                            fail: function (message)
                            {
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
        disabled: function ()
        {
            try
            {
                controlObj.textdisable('detail_f_value2_tbl_ld_ghsb_detail', true);
                controlObj.textdisable('detail_f_ghsbbh_tbl_ld_ghsb_detail', true);
                controlObj.textdisable('detail_f_ghsbmc_tbl_ld_ghsb_detail', true);
                controlObj.textdisable('detail_f_sqr_tbl_ld_ghsb_detail', true);
                controlObj.textdisable('detail_f_sqrid_tbl_ld_ghsb_detail', true);

                controlObj.datetimedisable('detail_f_sqsj_tbl_ld_ghsb_detail_date', 'detail_f_sqsj_tbl_ld_ghsb_detail_time', true);

                controlObj.textdisable('detail_f_czr_tbl_ld_ghsb_detail', true);

                controlObj.textdisable('detail_f_czrid_tbl_ld_ghsb_detail', true);

                controlObj.datetimedisable('detail_f_czsj_tbl_ld_ghsb_detail_date', 'detail_f_czsj_tbl_ld_ghsb_detail_time', true);

                controlObj.textdisable('detail_f_khbh_tbl_ld_ghsb_detail', true);
               
                $('#btn_detail_f_khbh_tbl_ld_ghsb_detail').attr('disabled', 'disabled');

                controlObj.textdisable('detail_f_khbhid_tbl_ld_ghsb_detail', true);

                controlObj.textdisable('detail_f_khxx_tbl_ld_ghsb_detail', true);

                controlObj.textdisable('detail_f_oldsbbh_tbl_ld_ghsb_detail', true);

                controlObj.textdisable('detail_f_oldsbh_tbl_ld_ghsb_detail', true);

                controlObj.textdisable('detail_f_oldlxth_tbl_ld_ghsb_detail', true);

                controlObj.multidropdownlistdisable('detail_f_oldsbfz_tbl_ld_ghsb_detail', true);

                controlObj.textdisable('detail_f_oldsbpp_tbl_ld_ghsb_detail', true);

                controlObj.textdisable('detail_f_oldmph_tbl_ld_ghsb_detail', true);

                controlObj.singledropdownlistdisable('detail_f_oldsblx_tbl_ld_ghsb_detail', true);

                controlObj.singledropdownlistdisable('detail_f_oldjllx_tbl_ld_ghsb_detail', true);

                controlObj.textdisable('detail_f_oldrs_tbl_ld_ghsb_detail', true);

                controlObj.singledropdownlistdisable('detail_f_oldsbkj_tbl_ld_ghsb_detail', true);

                controlObj.textdisable('detail_f_oldsbdz_tbl_ld_ghsb_detail', true);

                controlObj.datetimedisable('detail_f_oldazrq_tbl_ld_ghsb_detail_date', 'detail_f_oldazrq_tbl_ld_ghsb_detail_time', true);

                controlObj.toggledisable('detail_f_oldqfzt_tbl_ld_ghsb_detail', true);

                controlObj.textdisable('detail_f_oldsynx_tbl_ld_ghsb_detail', true);

                controlObj.textdisable('detail_f_oldcszm_tbl_ld_ghsb_detail', true);

                controlObj.textdisable('detail_f_oldqsqpjsl_tbl_ld_ghsb_detail', true);

                controlObj.textdisable('detail_f_oldqlqpjsl_tbl_ld_ghsb_detail', true);

                controlObj.textdisable('detail_f_oldbqzm_tbl_ld_ghsb_detail', true);

                controlObj.textdisable('detail_f_oldsqzm_tbl_ld_ghsb_detail', true);

                controlObj.textdisable('detail_f_oldsqsl_tbl_ld_ghsb_detail', true);

                controlObj.textdisable('detail_f_olddysl_tbl_ld_ghsb_detail', true);

                controlObj.textdisable('detail_f_oldljgl_tbl_ld_ghsb_detail', true);

                controlObj.textdisable('detail_f_oldnysl_tbl_ld_ghsb_detail', true);

                controlObj.singledropdownlistdisable('detail_f_oldzt_tbl_ld_ghsb_detail', true);

                controlObj.textdisable('detail_f_ysbbz_tbl_ld_ghsb_detail', true);

                controlObj.textdisable('detail_f_newsbbh_tbl_ld_ghsb_detail', true);

                controlObj.textdisable('detail_f_newxsbjsbh_tbl_ld_ghsb_detail', true);

                controlObj.textdisable('detail_f_oldxsblxth_tbl_ld_ghsb_detail', true);

                controlObj.multidropdownlistdisable('detail_f_newsbfz_tbl_ld_ghsb_detail', true);

                controlObj.textdisable('detail_f_newsbpp_tbl_ld_ghsb_detail', true);

                controlObj.textdisable('detail_f_newmph_tbl_ld_ghsb_detail', true);

                controlObj.singledropdownlistdisable('detail_f_newsblx_tbl_ld_ghsb_detail', true);

                controlObj.singledropdownlistdisable('detail_f_newjllx_tbl_ld_ghsb_detail', true);

                controlObj.textdisable('detail_f_newrs_tbl_ld_ghsb_detail', true);

                controlObj.singledropdownlistdisable('detail_f_newsbkj_tbl_ld_ghsb_detail', true);

                controlObj.textdisable('detail_f_newsbdz_tbl_ld_ghsb_detail', true);

                controlObj.textdisable('detail_f_newsynx_tbl_ld_ghsb_detail', true);

                controlObj.datetimedisable('detail_f_newazrq_tbl_ld_ghsb_detail_date', 'detail_f_newazrq_tbl_ld_ghsb_detail_time', true);


                controlObj.toggledisable('detail_f_newqfzt_tbl_ld_ghsb_detail', true);

                controlObj.textdisable('detail_f_newcszm_tbl_ld_ghsb_detail', true);

                controlObj.textdisable('detail_f_newqsqpjsl_tbl_ld_ghsb_detail', true);

                controlObj.textdisable('detail_f_newqlqpjsl_tbl_ld_ghsb_detail', true);

                controlObj.textdisable('detail_f_newbqzm_tbl_ld_ghsb_detail', true);

                controlObj.textdisable('detail_f_newsqzm_tbl_ld_ghsb_detail', true);

                controlObj.textdisable('detail_f_newsqsl_tbl_ld_ghsb_detail', true);

                controlObj.textdisable('detail_f_newdysl_tbl_ld_ghsb_detail', true);

                controlObj.textdisable('detail_f_newljgl_tbl_ld_ghsb_detail', true);

                controlObj.textdisable('detail_f_newnysl_tbl_ld_ghsb_detail', true);

                controlObj.singledropdownlistdisable('detail_f_newzt_tbl_ld_ghsb_detail', true);

                controlObj.fileuploaderdisable('detail_f_xsbfj_tbl_ld_ghsb_detail', true);

                controlObj.textdisable('detail_f_xsbbz_tbl_ld_ghsb_detail', true);

                controlObj.richtextdisable('detail_f_khjson_tbl_ld_ghsb_detail', true);

                controlObj.fileuploaderdisable('detail_f_khjson_file_tbl_ld_ghsb_detail', true);
                $('#detail_f_khjson_resource_tbl_ld_ghsb_detail').parent().addClass('hidden');
                $('#detail_f_khjson_file_tbl_ld_ghsb_detail').parent().addClass('hidden');               
                controlObj.textdisable('detail_fk_tbl_maintable_sys_id_tbl_ld_ghsb_detail', true);

                controlObj.fileuploaderdisable('detail_f_lcfj_tbl_ld_ghsb_detail', true);

                controlObj.singledropdownlistdisable('detail_f_zt_tbl_ld_ghsb_detail', true);

                controlObj.textdisable('detail_f_bz_tbl_ld_ghsb_detail', true);

                controlObj.textdisable('detail_f_yhm_tbl_ld_ghsb_detail', true);
                controlObj.textdisable('detail_f_dz_tbl_ld_ghsb_detail', true);
                controlObj.textdisable('detail_f_dh_tbl_ld_ghsb_detail', true);
               
                $('#btn_command_save_tbl_ld_ghsb_detail').addClass('hidden');
                $('.btn-command-message').attr('disabled', 'disabled');
                
                controlObj.textdisable('detail_f_yhm_tbl_ld_ghsb_detail', true);
                controlObj.textdisable('detail_f_dz_tbl_ld_ghsb_detail', true);
                controlObj.textdisable('detail_f_dh_tbl_ld_ghsb_detail', true);
            }
            catch (ex)
            {
                _blockMessage.show('disabled执行失败<br/>' + ex.message, 'fail');
            }
        },
            end: function ()
            {
            }


        };

    return that;
})();



