
var tbl_ld_yhb_detail_Obj = (function ()
{
    'use strict';

    //=================================================================================
    //                                      私有
    //=================================================================================

    //=================================================================================
    //                                      私有属性 
    //=================================================================================
    var _serviceUrl = '//127.0.0.1/sara.dd.ldsw/service/service_tbl_ld_yhb.asmx/',
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
        
        //codeServiceId += "0511^";
        
        
        //codeServiceId += "0512^";
        
        //codeServiceId += "0513^";
        
        //codeServiceId += "0514^";
        
        //codeServiceId += "0515^";
      
        codeServiceId += "0516^";

        codeServiceId += "0592^";


        
        codeServiceId = codeServiceId.trimEnd('^');
        commonObj.getCodeServiceJson(codeServiceId, {
            success: function (resultArray)
            {
                try
                {
                    _baseCodeHashMap = new hashMap();
             
                    var codenull = [];
                 
                    _baseCodeHashMap.put('codeservice_0513', codenull);
                    
                    _baseCodeHashMap.put('codeservice_0514', codenull);
                    
                    _baseCodeHashMap.put('codeservice_0515', codenull);
                    
                    
                    _baseCodeHashMap.put('codeservice_0516', resultArray['0516']);

                    _baseCodeHashMap.put('codeservice_0592', resultArray['0592']);
                    
                      var sqlJson = {
                          "tbl_ldbm_yhfz": "select sys_id as id,f_fzmc as text,decode(f_ztid,'0','false','true') as disabled from tbl_ldbm_yhfz where sys_delflag='0' order by sys_id",

                        "tbl_ldbm_dycq": "select sys_id as id, f_mc as text ,sys_orderid as nodeid from tbl_ldbm_dycq where sys_delflag='0' and f_ztid='0'and length(sys_orderid)=4 order by sys_orderid"
                    }
                    
                    commonObj.querySqls(sqlJson, {
                        success: function (messageJson) {

                            $.each(messageJson["tbl_ldbm_yhfz"], function (i, u) {
                                if (messageJson["tbl_ldbm_yhfz"][i]["disabled"] == "true") {
                                    messageJson["tbl_ldbm_yhfz"][i]["disabled"] = true;
                                }
                                else {
                                    messageJson["tbl_ldbm_yhfz"][i]["disabled"] = false;
                                }
                            });
                            _baseCodeHashMap.put('codeservice_0511', messageJson["tbl_ldbm_yhfz"]);
                            _baseCodeHashMap.put('codeservice_0512', messageJson["tbl_ldbm_dycq"]);
                            callBackFunction.success();
                        },
                        fail: function (message) {
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
            ////
            
            var codeService_0511 = _baseCodeHashMap.get('codeservice_0511');
            
            //地域
            var codeService_0512 = _baseCodeHashMap.get('codeservice_0512');
            //水厂
            var codeService_0513 = _baseCodeHashMap.get('codeservice_0513');

         
      
            ////区域
            var codeService_0514 = _baseCodeHashMap.get('codeservice_0514');
            ////片区
            var codeService_0515 = _baseCodeHashMap.get('codeservice_0515');
            
            
            var codeService_0516 = _baseCodeHashMap.get('codeservice_0516');

            var codeService_0592 = _baseCodeHashMap.get('codeservice_0592');
            
            
			controlObj.multidropdownlistinit('detail_f_yhfz_tbl_ld_yhb_detail', codeService_0511, f_yhfz_onchange);          
            
			 
			controlObj.singledropdownlistinit('detail_f_dy_tbl_ld_yhb_detail', codeService_0512, f_dy_onchange);
			controlObj.singledropdownlistinit('detail_f_sc_tbl_ld_yhb_detail', codeService_0513, f_sc_onchange);
                       
			controlObj.singledropdownlistinit('detail_f_qy_tbl_ld_yhb_detail', codeService_0514,f_qy_onchange);          
            
			controlObj.singledropdownlistinit('detail_f_pq_tbl_ld_yhb_detail', codeService_0515,f_pq_onchange);          
            
		    controlObj.datetimeinit('detail_f_khrq_tbl_ld_yhb_detail_date', 'detail_f_khrq_tbl_ld_yhb_detail_time', f_khrq_date_onchange, f_khrq_time_onchange);          
            
			controlObj.toggleinit('detail_f_sfts_tbl_ld_yhb_detail', f_sfts_onchange);          
            
		
			controlObj.fileuploaderinit('detail_f_htfj_tbl_ld_yhb_detail', {"fileUploadExtnames":";.xx;.pdf;.tif;.bmp;.jpg;.jpeg;.gif;.png;"}, f_htfj_onchange);          
            
			
            
			controlObj.fileuploaderinit('detail_f_sfzfj_tbl_ld_yhb_detail', {"fileUploadExtnames":";.xx;.pdf;.tif;.bmp;.jpg;.jpeg;.gif;.png;"}, f_sfzfj_onchange);          
            
			controlObj.fileuploaderinit('detail_f_qtfj_tbl_ld_yhb_detail', { "fileUploadExtnames": ";.xx;.pdf;.tif;.bmp;.jpg;.jpeg;.gif;.png;" }, f_qtfj_onchange);
			controlObj.toggleinit('detail_f_sfzzs_tbl_ld_yhb_detail', f_sfzzs_onchange);          
            
			controlObj.singledropdownlistinit('detail_f_zt_tbl_ld_yhb_detail', codeService_0516, f_zt_onchange);

			controlObj.singledropdownlistinit('detail_f_tsyx_tbl_ld_yhb_detail', codeService_0592);
			controlObj.datetimeinit('detail_f_htqdrq_tbl_ld_yhb_detail_date', 'detail_f_htqdrq_tbl_ld_yhb_detail_time', f_htqdrq_date_onchange, f_htqdrq_time_onchange);
            
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
           
		    controlObj.textdisable('detail_f_yhbh_tbl_ld_yhb_detail', isDisable);          
           
		    controlObj.textdisable('detail_f_ztyhh_tbl_ld_yhb_detail', isDisable);          
           
		    controlObj.textdisable('detail_f_yhm_tbl_ld_yhb_detail', isDisable);          
           
		    controlObj.textdisable('detail_f_jfm_tbl_ld_yhb_detail', isDisable);          
           
		    controlObj.textdisable('detail_f_dz_tbl_ld_yhb_detail', isDisable);          
           
		    controlObj.multidropdownlistdisable('detail_f_yhfz_tbl_ld_yhb_detail', isDisable);          
           
		    controlObj.textdisable('detail_f_dh_tbl_ld_yhb_detail', isDisable);          
            
				       
            controlObj.singledropdownlistdisable('detail_f_dy_tbl_ld_yhb_detail', isDisable);          
            
				       
            controlObj.singledropdownlistdisable('detail_f_sc_tbl_ld_yhb_detail', isDisable);          
            
				       
            controlObj.singledropdownlistdisable('detail_f_qy_tbl_ld_yhb_detail', isDisable);          
            
				       
            controlObj.singledropdownlistdisable('detail_f_pq_tbl_ld_yhb_detail', isDisable);          
            
			 controlObj.datetimedisable('detail_f_khrq_tbl_ld_yhb_detail_date', 'detail_f_khrq_tbl_ld_yhb_detail_time', isDisable);          
            
						
            controlObj.toggledisable('detail_f_sfts_tbl_ld_yhb_detail', isDisable);          
            
		    //controlObj.textdisable('detail_f_tsyx_tbl_ld_yhb_detail', isDisable);          
              

		    //controlObj.textdisable('detail_f_tsyxid_tbl_ld_yhb_detail', isDisable);

		    controlObj.textdisable('detail_f_tsyxzh_tbl_ld_yhb_detail', isDisable);          
              
		    controlObj.textdisable('detail_f_htbh_tbl_ld_yhb_detail', isDisable);          
              
		    controlObj.fileuploaderdisable('detail_f_htfj_tbl_ld_yhb_detail', isDisable);          
              
		    controlObj.textdisable('detail_f_sfzh_tbl_ld_yhb_detail', isDisable);          
              
		    controlObj.fileuploaderdisable('detail_f_sfzfj_tbl_ld_yhb_detail', isDisable);          
            
		    controlObj.fileuploaderdisable('detail_f_qtfj_tbl_ld_yhb_detail', isDisable);
						
            controlObj.toggledisable('detail_f_sfzzs_tbl_ld_yhb_detail', isDisable);          
            
				       
            controlObj.singledropdownlistdisable('detail_f_zt_tbl_ld_yhb_detail', isDisable);

            controlObj.singledropdownlistdisable('detail_f_tsyx_tbl_ld_yhb_detail', isDisable);
            
			controlObj.textdisable('detail_f_bz_tbl_ld_yhb_detail', isDisable);          
            
			controlObj.textdisable('detail_f_khbh_tbl_ld_yhb_detail', isDisable);          
            
			controlObj.textdisable('detail_f_wxwybz_tbl_ld_yhb_detail', isDisable);          
            
			controlObj.textdisable('detail_f_zfbwybz_tbl_ld_yhb_detail', isDisable);          
            
			controlObj.textdisable('detail_f_gdyxwybz_tbl_ld_yhb_detail', isDisable);          
			controlObj.datetimedisable('detail_f_htqdrq_tbl_ld_yhb_detail_date', 'detail_f_htqdrq_tbl_ld_yhb_detail_time', isDisable);
             
            if (isDisable)
            {
                $('#btn_command_save_tbl_ld_yhb_detail').addClass('hidden');
                $('.btn-command-message').attr('disabled', 'disabled');
            }
            else
            {
                $('#btn_command_save_tbl_ld_yhb_detail').removeClass('hidden');
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
    *  参数:tbl_ld_yhb_detail, callBackFunction
    *  根据数据对象，绑定数据对象到页面控件
    */
    setModel = function (tbl_ld_yhb_detail, callBackFunction)
   {
        try
        {
        
		  controlObj.text('detail_f_value1_tbl_ld_yhb_detail', tbl_ld_yhb_detail.f_value1);          
		  
		  controlObj.text('detail_f_value2_tbl_ld_yhb_detail', tbl_ld_yhb_detail.f_value2);          
		  
		  controlObj.text('detail_f_value3_tbl_ld_yhb_detail', tbl_ld_yhb_detail.f_value3);          
		  
		  controlObj.text('detail_f_value4_tbl_ld_yhb_detail', tbl_ld_yhb_detail.f_value4);          
		  
		  controlObj.text('detail_f_value5_tbl_ld_yhb_detail', tbl_ld_yhb_detail.f_value5);          
		  
		  controlObj.text('detail_f_value6_tbl_ld_yhb_detail', tbl_ld_yhb_detail.f_value6);          
		  
		  controlObj.text('detail_f_value7_tbl_ld_yhb_detail', tbl_ld_yhb_detail.f_value7);          
		  
		  controlObj.text('detail_f_value8_tbl_ld_yhb_detail', tbl_ld_yhb_detail.f_value8);          
		  
		  controlObj.text('detail_f_value9_tbl_ld_yhb_detail', tbl_ld_yhb_detail.f_value9);          
		  
		  controlObj.text('detail_f_value10_tbl_ld_yhb_detail', tbl_ld_yhb_detail.f_value10);          
		  
		  controlObj.text('detail_f_yhbh_tbl_ld_yhb_detail', tbl_ld_yhb_detail.f_yhbh);          
		  
		  controlObj.text('detail_f_ztyhh_tbl_ld_yhb_detail', tbl_ld_yhb_detail.f_ztyhh);          
		  
		  controlObj.text('detail_f_yhm_tbl_ld_yhb_detail', tbl_ld_yhb_detail.f_yhm);          
		  
		  controlObj.text('detail_f_jfm_tbl_ld_yhb_detail', tbl_ld_yhb_detail.f_jfm);          
		  
		  controlObj.text('detail_f_dz_tbl_ld_yhb_detail', tbl_ld_yhb_detail.f_dz);          
		  
		  controlObj.multidropdownlistid('detail_f_yhfz_tbl_ld_yhb_detail', tbl_ld_yhb_detail.f_yhfzid);          
		  
		  controlObj.text('detail_f_dh_tbl_ld_yhb_detail', tbl_ld_yhb_detail.f_dh);          
		  
		  controlObj.singledropdownlistid('detail_f_dy_tbl_ld_yhb_detail', tbl_ld_yhb_detail.f_dyid);
            var dy = { "added": { "id": tbl_ld_yhb_detail.f_dyid }};
            var sc = { "added": { "id": tbl_ld_yhb_detail.f_scid } };
            var qy = { "added": { "id": tbl_ld_yhb_detail.f_qyid } };
            f_dy_onchange(dy, {
                success: function () {
                    controlObj.singledropdownlistid('detail_f_sc_tbl_ld_yhb_detail', tbl_ld_yhb_detail.f_scid);
                    f_sc_onchange(sc, {
                        success: function () {
                            controlObj.singledropdownlistid('detail_f_qy_tbl_ld_yhb_detail', tbl_ld_yhb_detail.f_qyid);
                            f_qy_onchange(qy, {
                                success: function () {
                                    controlObj.singledropdownlistid('detail_f_pq_tbl_ld_yhb_detail', tbl_ld_yhb_detail.f_pqid);
                                }
                            });
                        }

                    });
                }
            });
		
						
             controlObj.datetime('detail_f_khrq_tbl_ld_yhb_detail_date', 'detail_f_khrq_tbl_ld_yhb_detail_time', tbl_ld_yhb_detail.f_khrq);          
		
		     controlObj.toggle('detail_f_sfts_tbl_ld_yhb_detail', tbl_ld_yhb_detail.f_sfts);          
		
		     //controlObj.text('detail_f_tsyx_tbl_ld_yhb_detail', tbl_ld_yhb_detail.f_tsyx);

		     //controlObj.text('detail_f_tsyxid_tbl_ld_yhb_detail', tbl_ld_yhb_detail.f_tsyxid);
		
			 controlObj.text('detail_f_tsyxzh_tbl_ld_yhb_detail', tbl_ld_yhb_detail.f_tsyxzh);          
		
			 controlObj.text('detail_f_htbh_tbl_ld_yhb_detail', tbl_ld_yhb_detail.f_htbh);          
		
			 controlObj.fileuploaderbind('detail_f_htfj_tbl_ld_yhb_detail', tbl_ld_yhb_detail.f_htfj);          
		
			 controlObj.text('detail_f_sfzh_tbl_ld_yhb_detail', tbl_ld_yhb_detail.f_sfzh);          
		
			 controlObj.fileuploaderbind('detail_f_sfzfj_tbl_ld_yhb_detail', tbl_ld_yhb_detail.f_sfzfj);          
			 controlObj.fileuploaderbind('detail_f_qtfj_tbl_ld_yhb_detail', tbl_ld_yhb_detail.f_qtfj);
		
			 controlObj.toggle('detail_f_sfzzs_tbl_ld_yhb_detail', tbl_ld_yhb_detail.f_sfzzs);          
		
			 controlObj.singledropdownlistid('detail_f_zt_tbl_ld_yhb_detail', tbl_ld_yhb_detail.f_ztid);

			 controlObj.singledropdownlistid('detail_f_tsyx_tbl_ld_yhb_detail', tbl_ld_yhb_detail.f_tsyxid);
		
			 controlObj.text('detail_f_bz_tbl_ld_yhb_detail', tbl_ld_yhb_detail.f_bz.returnStringRN());          
		
			 controlObj.text('detail_f_khbh_tbl_ld_yhb_detail', tbl_ld_yhb_detail.f_khbh);          
		
			 controlObj.text('detail_f_wxwybz_tbl_ld_yhb_detail', tbl_ld_yhb_detail.f_wxwybz);          
		
			 controlObj.text('detail_f_zfbwybz_tbl_ld_yhb_detail', tbl_ld_yhb_detail.f_zfbwybz);          
		
			 controlObj.text('detail_f_gdyxwybz_tbl_ld_yhb_detail', tbl_ld_yhb_detail.f_gdyxwybz);          
			 controlObj.datetime('detail_f_htqdrq_tbl_ld_yhb_detail_date', 'detail_f_htqdrq_tbl_ld_yhb_detail_time', tbl_ld_yhb_detail.f_htqdrq);
				
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
    *  获取页面数据，返回对象tbl_ld_yhb_detail
    */
    getModel = function (callBackFunction)
    {
        try
        {
            var tbl_ld_yhb_detail = new Object();
            
					
            tbl_ld_yhb_detail.f_value1 = controlObj.text('detail_f_value1_tbl_ld_yhb_detail');          
            
					
            tbl_ld_yhb_detail.f_value2 = controlObj.text('detail_f_value2_tbl_ld_yhb_detail');          
            
					
            tbl_ld_yhb_detail.f_value3 = controlObj.text('detail_f_value3_tbl_ld_yhb_detail');          
            
					
            tbl_ld_yhb_detail.f_value4 = controlObj.text('detail_f_value4_tbl_ld_yhb_detail');          
            
					
            tbl_ld_yhb_detail.f_value5 = controlObj.text('detail_f_value5_tbl_ld_yhb_detail');          
            
					
            tbl_ld_yhb_detail.f_value6 = controlObj.text('detail_f_value6_tbl_ld_yhb_detail');          
            
					
            tbl_ld_yhb_detail.f_value7 = controlObj.text('detail_f_value7_tbl_ld_yhb_detail');          
            
					
            tbl_ld_yhb_detail.f_value8 = controlObj.text('detail_f_value8_tbl_ld_yhb_detail');          
            
					
            tbl_ld_yhb_detail.f_value9 = controlObj.text('detail_f_value9_tbl_ld_yhb_detail');          
            
					
            tbl_ld_yhb_detail.f_value10 = controlObj.text('detail_f_value10_tbl_ld_yhb_detail');          
            
					
            tbl_ld_yhb_detail.f_yhbh = controlObj.text('detail_f_yhbh_tbl_ld_yhb_detail');          
            
					
            tbl_ld_yhb_detail.f_ztyhh = controlObj.text('detail_f_ztyhh_tbl_ld_yhb_detail');          
            
					
            tbl_ld_yhb_detail.f_yhm = controlObj.text('detail_f_yhm_tbl_ld_yhb_detail');          
            
					
            tbl_ld_yhb_detail.f_jfm = controlObj.text('detail_f_jfm_tbl_ld_yhb_detail');          
            
					
            tbl_ld_yhb_detail.f_dz = controlObj.text('detail_f_dz_tbl_ld_yhb_detail');          
            
						
            tbl_ld_yhb_detail.f_yhfz = controlObj.multidropdownlist('detail_f_yhfz_tbl_ld_yhb_detail');
            tbl_ld_yhb_detail.f_yhfzid = controlObj.multidropdownlistid('detail_f_yhfz_tbl_ld_yhb_detail');          
            
					
            tbl_ld_yhb_detail.f_dh = controlObj.text('detail_f_dh_tbl_ld_yhb_detail');          
            
			tbl_ld_yhb_detail.f_dy = controlObj.singledropdownlist('detail_f_dy_tbl_ld_yhb_detail');
            tbl_ld_yhb_detail.f_dyid = controlObj.singledropdownlistid('detail_f_dy_tbl_ld_yhb_detail');          
            
			tbl_ld_yhb_detail.f_sc = controlObj.singledropdownlist('detail_f_sc_tbl_ld_yhb_detail');
            tbl_ld_yhb_detail.f_scid = controlObj.singledropdownlistid('detail_f_sc_tbl_ld_yhb_detail');          
            
			tbl_ld_yhb_detail.f_qy = controlObj.singledropdownlist('detail_f_qy_tbl_ld_yhb_detail');
            tbl_ld_yhb_detail.f_qyid = controlObj.singledropdownlistid('detail_f_qy_tbl_ld_yhb_detail');          
            
		    tbl_ld_yhb_detail.f_pq = controlObj.singledropdownlist('detail_f_pq_tbl_ld_yhb_detail');
            tbl_ld_yhb_detail.f_pqid = controlObj.singledropdownlistid('detail_f_pq_tbl_ld_yhb_detail');          
            
			tbl_ld_yhb_detail.f_khrq = controlObj.datetime('detail_f_khrq_tbl_ld_yhb_detail_date', 'detail_f_khrq_tbl_ld_yhb_detail_time');          
            
						
            tbl_ld_yhb_detail.f_sfts = controlObj.toggle('detail_f_sfts_tbl_ld_yhb_detail');          
            
					
            //tbl_ld_yhb_detail.f_tsyx = controlObj.text('detail_f_tsyx_tbl_ld_yhb_detail');          
            

            //tbl_ld_yhb_detail.f_tsyxid = controlObj.text('detail_f_tsyxid_tbl_ld_yhb_detail');

					
            tbl_ld_yhb_detail.f_tsyxzh = controlObj.text('detail_f_tsyxzh_tbl_ld_yhb_detail');          
            
					
            tbl_ld_yhb_detail.f_htbh = controlObj.text('detail_f_htbh_tbl_ld_yhb_detail');          
            
			tbl_ld_yhb_detail.f_htfj = controlObj.fileuploaderid('detail_f_htfj_tbl_ld_yhb_detail');          
            
					
            tbl_ld_yhb_detail.f_sfzh = controlObj.text('detail_f_sfzh_tbl_ld_yhb_detail');          
            
			tbl_ld_yhb_detail.f_sfzfj = controlObj.fileuploaderid('detail_f_sfzfj_tbl_ld_yhb_detail');          
            
			tbl_ld_yhb_detail.f_qtfj = controlObj.fileuploaderid('detail_f_qtfj_tbl_ld_yhb_detail');
            tbl_ld_yhb_detail.f_sfzzs = controlObj.toggle('detail_f_sfzzs_tbl_ld_yhb_detail');          
            
			tbl_ld_yhb_detail.f_zt = controlObj.singledropdownlist('detail_f_zt_tbl_ld_yhb_detail');
            tbl_ld_yhb_detail.f_ztid = controlObj.singledropdownlistid('detail_f_zt_tbl_ld_yhb_detail');          
            
            ////
            tbl_ld_yhb_detail.f_tsyx = controlObj.singledropdownlist('detail_f_tsyx_tbl_ld_yhb_detail');
            tbl_ld_yhb_detail.f_tsyxid = controlObj.singledropdownlistid('detail_f_tsyx_tbl_ld_yhb_detail');

					
            tbl_ld_yhb_detail.f_bz = controlObj.text('detail_f_bz_tbl_ld_yhb_detail');          
            
					
            tbl_ld_yhb_detail.f_khbh = controlObj.text('detail_f_khbh_tbl_ld_yhb_detail');          
            
					
            tbl_ld_yhb_detail.f_wxwybz = controlObj.text('detail_f_wxwybz_tbl_ld_yhb_detail');          
            
					
            tbl_ld_yhb_detail.f_zfbwybz = controlObj.text('detail_f_zfbwybz_tbl_ld_yhb_detail');          
            
					
            tbl_ld_yhb_detail.f_gdyxwybz = controlObj.text('detail_f_gdyxwybz_tbl_ld_yhb_detail');          
            tbl_ld_yhb_detail.f_khrq = controlObj.datetime('detail_f_htqdrq_tbl_ld_yhb_detail_date', 'detail_f_htqdrq_tbl_ld_yhb_detail_time');
            		
            callBackFunction.success(tbl_ld_yhb_detail);
        }
        catch (ex)
        {
            callBackFunction.fail( ex.message );
        }
    },

    /* 
    *  
    *  方法:checkModel
    *  参数:tbl_ld_yhb_detail，callbackFunction
    *  页面数据校验，会用到_validateMessage，校验结果分success，fail
    */
    checkModel = function (tbl_ld_yhb_detail, callBackFunction)
    {
        try
        {
            var errorMessageHansMap = new hashMap();
            var errorMessagePlacementHansMap = new hashMap();

           
       

            		   
            if (tbl_ld_yhb_detail.f_value1.length > 200)
            {			
                errorMessageHansMap.put('detail_f_value1_tbl_ld_yhb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_yhb_detail.f_value2.length > 200)
            {			
                errorMessageHansMap.put('detail_f_value2_tbl_ld_yhb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_yhb_detail.f_value3.length > 200)
            {			
                errorMessageHansMap.put('detail_f_value3_tbl_ld_yhb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_yhb_detail.f_value4.length > 200)
            {			
                errorMessageHansMap.put('detail_f_value4_tbl_ld_yhb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_yhb_detail.f_value5.length > 200)
            {			
                errorMessageHansMap.put('detail_f_value5_tbl_ld_yhb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_yhb_detail.f_value6.length > 200)
            {			
                errorMessageHansMap.put('detail_f_value6_tbl_ld_yhb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_yhb_detail.f_value7.length > 200)
            {			
                errorMessageHansMap.put('detail_f_value7_tbl_ld_yhb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_yhb_detail.f_value8.length > 200)
            {			
                errorMessageHansMap.put('detail_f_value8_tbl_ld_yhb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_yhb_detail.f_value9.length > 200)
            {			
                errorMessageHansMap.put('detail_f_value9_tbl_ld_yhb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_yhb_detail.f_value10.length > 200)
            {			
                errorMessageHansMap.put('detail_f_value10_tbl_ld_yhb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_yhb_detail.f_yhbh.length > 200)
            {			
                errorMessageHansMap.put('detail_f_yhbh_tbl_ld_yhb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		   
            if (tbl_ld_yhb_detail.f_yhbh.length < 1)
            {			
                errorMessageHansMap.put('detail_f_yhbh_tbl_ld_yhb_detail', '长度不能小于<a style="color:red">1</a>个字');
            }	
            		
         

            		   
            if (tbl_ld_yhb_detail.f_ztyhh.length > 200)
            {			
                errorMessageHansMap.put('detail_f_ztyhh_tbl_ld_yhb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		   
            if (tbl_ld_yhb_detail.f_ztyhh.length < 1)
            {			
                errorMessageHansMap.put('detail_f_ztyhh_tbl_ld_yhb_detail', '长度不能小于<a style="color:red">1</a>个字');
            }	
            		
         

            		   
            if (tbl_ld_yhb_detail.f_yhm.length > 200)
            {			
                errorMessageHansMap.put('detail_f_yhm_tbl_ld_yhb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		   
            if (tbl_ld_yhb_detail.f_yhm.length < 1)
            {			
                errorMessageHansMap.put('detail_f_yhm_tbl_ld_yhb_detail', '长度不能小于<a style="color:red">1</a>个字');
            }	
            		
         

            		   
            if (tbl_ld_yhb_detail.f_jfm.length > 200)
            {			
                errorMessageHansMap.put('detail_f_jfm_tbl_ld_yhb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		   
            if (tbl_ld_yhb_detail.f_jfm.length < 1)
            {			
                errorMessageHansMap.put('detail_f_jfm_tbl_ld_yhb_detail', '长度不能小于<a style="color:red">1</a>个字');
            }	
            		
         

            		   
            if (tbl_ld_yhb_detail.f_dz.length > 200)
            {			
                errorMessageHansMap.put('detail_f_dz_tbl_ld_yhb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_yhb_detail.f_yhfz.length > 200)
            {			
                errorMessageHansMap.put('detail_f_yhfz_tbl_ld_yhb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_yhb_detail.f_dh.length > 200)
            {			
                errorMessageHansMap.put('detail_f_dh_tbl_ld_yhb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_yhb_detail.f_dy.length > 200)
            {			
                errorMessageHansMap.put('detail_f_dy_tbl_ld_yhb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_yhb_detail.f_sc.length > 200)
            {			
                errorMessageHansMap.put('detail_f_sc_tbl_ld_yhb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_yhb_detail.f_qy.length > 200)
            {			
                errorMessageHansMap.put('detail_f_qy_tbl_ld_yhb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_yhb_detail.f_pq.length > 200)
            {			
                errorMessageHansMap.put('detail_f_pq_tbl_ld_yhb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		
         

            		   
            if (tbl_ld_yhb_detail.f_sfts.length > 200)
            {			
                errorMessageHansMap.put('detail_f_sfts_tbl_ld_yhb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            //if (tbl_ld_yhb_detail.f_tsyx.length > 200)
            //{			
            //    errorMessageHansMap.put('detail_f_tsyx_tbl_ld_yhb_detail', '长度不能超过<a style="color:red">200</a>个字');
            //}		
            		

            //if (tbl_ld_yhb_detail.f_tsyxid.length > 200) {
            //    errorMessageHansMap.put('detail_f_tsyxid_tbl_ld_yhb_detail', '长度不能超过<a style="color:red">200</a>个字');
            //}


            		   
            if (tbl_ld_yhb_detail.f_tsyxzh.length > 200)
            {			
                errorMessageHansMap.put('detail_f_tsyxzh_tbl_ld_yhb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_yhb_detail.f_htbh.length > 200)
            {			
                errorMessageHansMap.put('detail_f_htbh_tbl_ld_yhb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_yhb_detail.f_htfj.length > 4000)
            {			
                errorMessageHansMap.put('detail_f_htfj_tbl_ld_yhb_detail', '长度不能超过<a style="color:red">4000</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_yhb_detail.f_sfzh.length > 200)
            {			
                errorMessageHansMap.put('detail_f_sfzh_tbl_ld_yhb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_yhb_detail.f_sfzfj.length > 4000)
            {			
                errorMessageHansMap.put('detail_f_sfzfj_tbl_ld_yhb_detail', '长度不能超过<a style="color:red">4000</a>个字');
            }		
            		
            if (tbl_ld_yhb_detail.f_qtfj.length > 4000)
            {
                errorMessageHansMap.put('detail_f_qtfj_tbl_ld_yhb_detail', '长度不能超过<a style="color:red">4000</a>个字');
            }

            		   
            if (tbl_ld_yhb_detail.f_sfzzs.length > 200)
            {			
                errorMessageHansMap.put('detail_f_sfzzs_tbl_ld_yhb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_yhb_detail.f_zt.length > 200)
            {			
                errorMessageHansMap.put('detail_f_zt_tbl_ld_yhb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
            if (tbl_ld_yhb_detail.f_tsyx.length > 200) {
                errorMessageHansMap.put('detail_f_tsyx_tbl_ld_yhb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }


            		   
            if (tbl_ld_yhb_detail.f_bz.length > 4000)
            {			
                errorMessageHansMap.put('detail_f_bz_tbl_ld_yhb_detail', '长度不能超过<a style="color:red">4000</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_yhb_detail.f_khbh.length > 200)
            {			
                errorMessageHansMap.put('detail_f_khbh_tbl_ld_yhb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_yhb_detail.f_wxwybz.length > 200)
            {			
                errorMessageHansMap.put('detail_f_wxwybz_tbl_ld_yhb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_yhb_detail.f_zfbwybz.length > 200)
            {			
                errorMessageHansMap.put('detail_f_zfbwybz_tbl_ld_yhb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         

            		   
            if (tbl_ld_yhb_detail.f_gdyxwybz.length > 200)
            {			
                errorMessageHansMap.put('detail_f_gdyxwybz_tbl_ld_yhb_detail', '长度不能超过<a style="color:red">200</a>个字');
            }		
            		
         	
            if (errorMessageHansMap.keys().length > 0)
            {
                _validateMessage.show(errorMessageHansMap, errorMessagePlacementHansMap, true);
                callBackFunction.fail('');
            }
            else
            {
                _validateMessage.hidden();
                callBackFunction.success(tbl_ld_yhb_detail);
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
            //
            var whereClause = ' sys_id = \'' + that._pr_sys_id + '\'';
            var orderByString = '';            
            var columnsString = 'f_value1^f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^f_yhbh^f_ztyhh^f_yhm^f_jfm^f_yhfz^f_yhfzid^f_dz^f_dh^f_khrq^f_dy^f_dyid^f_sc^f_scid^f_qy^f_qyid^f_pq^f_pqid^f_sfts^f_tsyx^f_tsyxid^f_tsyxzh^f_htbh^f_htfj^f_sfzh^f_sfzfj^f_qtfj^f_sfzzs^f_zt^f_ztid^f_bz^f_khbh^f_wxwybz^f_zfbwybz^f_gdyxwybz^f_htqdrq^sys_id';
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
        *  参数:tbl_ld_yhb_detail, callbackFunction
        *  向数据库更新数据，根据数据对象
        */
        updateData = function (tbl_ld_yhb_detail, callbackFunction)
            {

                var d = new Date();                
                var columns = 'f_value1^f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^f_yhbh^f_ztyhh^f_yhm^f_jfm^f_yhfz^f_yhfzid^f_dz^f_dh^f_khrq^f_dy^f_dyid^f_sc^f_scid^f_qy^f_qyid^f_pq^f_pqid^f_sfts^f_tsyx^f_tsyxid^f_tsyxzh^f_htbh^f_htfj^f_sfzh^f_sfzfj^f_qtfj^f_sfzzs^f_zt^f_ztid^f_bz^f_khbh^f_wxwybz^f_zfbwybz^f_gdyxwybz^f_htqdrq^sys_id^sys_lastedituserid^sys_lasteditusername^sys_lasteditdate';
                var json = {
                    sys_id: that._pr_sys_id,
            
				    f_value1:tbl_ld_yhb_detail.f_value1 ,          
		        
				    f_value2:tbl_ld_yhb_detail.f_value2 ,          
		        
				    f_value3:tbl_ld_yhb_detail.f_value3 ,          
		        
				    f_value4:tbl_ld_yhb_detail.f_value4 ,          
		        
				    f_value5:tbl_ld_yhb_detail.f_value5 ,          
		        
				    f_value6:tbl_ld_yhb_detail.f_value6 ,          
		        
				    f_value7:tbl_ld_yhb_detail.f_value7 ,          
		        
				    f_value8:tbl_ld_yhb_detail.f_value8 ,          
		        
				    f_value9:tbl_ld_yhb_detail.f_value9 ,          
		        
				    f_value10:tbl_ld_yhb_detail.f_value10 ,          
		        
				    f_yhbh:tbl_ld_yhb_detail.f_yhbh ,          
		        
				    f_ztyhh:tbl_ld_yhb_detail.f_ztyhh ,          
		        
				    f_yhm:tbl_ld_yhb_detail.f_yhm ,          
		        
				    f_jfm:tbl_ld_yhb_detail.f_jfm ,          
		        
				    f_dz:tbl_ld_yhb_detail.f_dz ,          
		        
			        f_yhfz:tbl_ld_yhb_detail.f_yhfz ,
                    f_yhfzid:tbl_ld_yhb_detail.f_yhfzid,          
		        
				    f_dh:tbl_ld_yhb_detail.f_dh ,          
		        
			        f_dy:tbl_ld_yhb_detail.f_dy ,
                    f_dyid:tbl_ld_yhb_detail.f_dyid,          
		        
			        f_sc:tbl_ld_yhb_detail.f_sc ,
                    f_scid:tbl_ld_yhb_detail.f_scid,          
		        
			        f_qy:tbl_ld_yhb_detail.f_qy ,
                    f_qyid:tbl_ld_yhb_detail.f_qyid,          
		        
			        f_pq:tbl_ld_yhb_detail.f_pq ,
                    f_pqid:tbl_ld_yhb_detail.f_pqid,          
		        
			        f_khrq:tbl_ld_yhb_detail.f_khrq ,          
		            
			        f_sfts:tbl_ld_yhb_detail.f_sfts ,          
		            
			        f_tsyx: tbl_ld_yhb_detail.f_tsyx,
			        f_tsyxid: tbl_ld_yhb_detail.f_tsyxid,
		            
				    f_tsyxzh:tbl_ld_yhb_detail.f_tsyxzh ,          
		            
				    f_htbh:tbl_ld_yhb_detail.f_htbh ,          
		        
						
                    f_htfj:tbl_ld_yhb_detail.f_htfj ,          
		        
				    f_sfzh:tbl_ld_yhb_detail.f_sfzh ,          
		        
						
                    f_sfzfj:tbl_ld_yhb_detail.f_sfzfj ,          
				    f_qtfj: tbl_ld_yhb_detail.f_qtfj,
		        
			        f_sfzzs:tbl_ld_yhb_detail.f_sfzzs ,          
		        
			        f_zt:tbl_ld_yhb_detail.f_zt ,
                    f_ztid:tbl_ld_yhb_detail.f_ztid,          
		        
				    f_bz:tbl_ld_yhb_detail.f_bz.formatStringRN() ,          
		        
				    f_khbh:tbl_ld_yhb_detail.f_khbh ,          
		        
				    f_wxwybz:tbl_ld_yhb_detail.f_wxwybz ,          
		        
				    f_zfbwybz:tbl_ld_yhb_detail.f_zfbwybz ,          
		        
				    f_gdyxwybz:tbl_ld_yhb_detail.f_gdyxwybz ,          
				    f_htqdrq: tbl_ld_yhb_detail.f_htqdrq,
		        
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
            *  方法:f_yhfz_onchange
            *  参数:changeEventParameter
            *  用户分组onchange事件
            */
            f_yhfz_onchange = function (e)
            {
                var controlid = e.target.id;
            },          
    
	       
            getArea = function (id, callbackFunction) {
       // //
       var sqlString = '';
       sqlString += "select sys_id as id, f_mc as text ";
       sqlString += "from tbl_ldbm_dycq  ";
       sqlString += "where sys_delflag = '0' ";
       sqlString += "and f_ztid = '0' ";
       sqlString += "and length(sys_orderid) =  ";
       sqlString += "    (select length(sys_orderid) + 4 from tbl_ldbm_dycq where sys_id = '" + id + "') ";
       sqlString += "and sys_orderid like ";
       sqlString += "    (select sys_orderid || '%' from tbl_ldbm_dycq where sys_id = '" + id + "') ";
       sqlString += "order by sys_orderid ";
       var sqlJson = {

           "tbl_ldbm_dycq": sqlString
       }

       commonObj.querySqls(sqlJson, {
           success: function (messageJson) {

               callbackFunction.success(messageJson["tbl_ldbm_dycq"]);

           },
           fail: function (message) {
           }
       })
   },
  /* 
            *  
            *  方法:f_dy_onchange
            *  参数:changeEventParameter
            *  地域onchange事件
            */
            f_dy_onchange = function (e, callbackfunction) {
                ////
                if (e.added != undefined) {
                    var nodeid = e.added.id;
                    getArea(nodeid, {
                        success: function (jsonArray) {

                            controlObj.singledropdownlistinit('detail_f_sc_tbl_ld_yhb_detail', jsonArray, f_sc_onchange);
                            controlObj.singledropdownlistid('detail_f_sc_tbl_ld_yhb_detail', '-1');
                            controlObj.singledropdownlist('detail_f_sc_tbl_ld_yhb_detail', '');


                            if (callbackfunction != undefined) {
                                callbackfunction.success();
                            }
                            else {
                                controlObj.singledropdownlistinit('detail_f_qy_tbl_ld_yhb_detail', _baseCodeHashMap.get('codeservice_0514'), f_qy_onchange);
                                controlObj.singledropdownlistid('detail_f_qy_tbl_ld_yhb_detail', '-1');
                                controlObj.singledropdownlist('detail_f_qy_tbl_ld_yhb_detail', '');

                                controlObj.singledropdownlistinit('detail_f_pq_tbl_ld_yhb_detail', _baseCodeHashMap.get('codeservice_0515'), f_pq_onchange);
                                controlObj.singledropdownlistid('detail_f_pq_tbl_ld_yhb_detail', '-1');
                                controlObj.singledropdownlist('detail_f_pq_tbl_ld_yhb_detail', '');

                            }
                        }
                    })
                }
                else {
                    controlObj.singledropdownlistinit('detail_f_sc_tbl_ld_yhb_detail', _baseCodeHashMap.get('codeservice_0513'), f_sc_onchange);
                    controlObj.singledropdownlistid('detail_f_sc_tbl_ld_yhb_detail', '-1');
                    controlObj.singledropdownlist('detail_f_sc_tbl_ld_yhb_detail', '');


                    controlObj.singledropdownlistinit('detail_f_qy_tbl_ld_yhb_detail', _baseCodeHashMap.get('codeservice_0514'), f_qy_onchange);
                    controlObj.singledropdownlistid('detail_f_qy_tbl_ld_yhb_detail', '-1');
                    controlObj.singledropdownlist('detail_f_qy_tbl_ld_yhb_detail', '');

                    controlObj.singledropdownlistinit('detail_f_pq_tbl_ld_yhb_detail', _baseCodeHashMap.get('codeservice_0515'), f_pq_onchange);
                    controlObj.singledropdownlistid('detail_f_pq_tbl_ld_yhb_detail', '-1');
                    controlObj.singledropdownlist('detail_f_pq_tbl_ld_yhb_detail', '');
                }


            },


            /* 
            *  
            *  方法:f_sc_onchange
            *  参数:changeEventParameter
            *  水厂onchange事件
            */
            f_sc_onchange = function (e, callbackfunction) {
                // //
                if (e.added != undefined) {
                    var nodeid = e.added.id;
                    getArea(nodeid, {
                        success: function (jsonArray) {

                            controlObj.singledropdownlistinit('detail_f_qy_tbl_ld_yhb_detail', jsonArray, f_qy_onchange);
                            controlObj.singledropdownlistid('detail_f_qy_tbl_ld_yhb_detail', '-1');
                            controlObj.singledropdownlist('detail_f_qy_tbl_ld_yhb_detail', '');
                            if (callbackfunction != undefined) {
                                callbackfunction.success();
                            }
                            else {


                                controlObj.singledropdownlistinit('detail_f_pq_tbl_ld_yhb_detail', _baseCodeHashMap.get('codeservice_0515'), f_pq_onchange);
                                controlObj.singledropdownlistid('detail_f_pq_tbl_ld_yhb_detail', '-1');
                                controlObj.singledropdownlist('detail_f_pq_tbl_ld_yhb_detail', '');
                            }
                        }
                    })
                }
                else {
                    controlObj.singledropdownlistinit('detail_f_qy_tbl_ld_yhb_detail', _baseCodeHashMap.get('codeservice_0514'), f_qy_onchange);
                    controlObj.singledropdownlistid('detail_f_qy_tbl_ld_yhb_detail', '-1');
                    controlObj.singledropdownlist('detail_f_qy_tbl_ld_yhb_detail', '');

                    controlObj.singledropdownlistinit('detail_f_pq_tbl_ld_yhb_detail', _baseCodeHashMap.get('codeservice_0515'), f_pq_onchange);
                    controlObj.singledropdownlistid('detail_f_pq_tbl_ld_yhb_detail', '-1');
                    controlObj.singledropdownlist('detail_f_pq_tbl_ld_yhb_detail', '');
                }


            },

            /* 
            *  
            *  方法:f_qy_onchange
            *  参数:changeEventParameter
            *  区域onchange事件
            */
            f_qy_onchange = function (e, callbackfunction) {
                // //
                if (e.added != undefined) {
                    var nodeid = e.added.id;
                    // //
                    getArea(nodeid, {
                        success: function (jsonArray) {

                            controlObj.singledropdownlistinit('detail_f_pq_tbl_ld_yhb_detail', jsonArray, f_pq_onchange);
                            controlObj.singledropdownlistid('detail_f_pq_tbl_ld_yhb_detail', '-1');
                            controlObj.singledropdownlist('detail_f_pq_tbl_ld_yhb_detail', '');
                            if (callbackfunction != undefined) {
                                callbackfunction.success();
                            }
                        }
                    })
                }
                else {
                    // //
                    controlObj.singledropdownlistinit('detail_f_pq_tbl_ld_yhb_detail', _baseCodeHashMap.get('codeservice_0515'), f_pq_onchange);
                    controlObj.singledropdownlistid('detail_f_pq_tbl_ld_yhb_detail', '-1');
                    controlObj.singledropdownlist('detail_f_pq_tbl_ld_yhb_detail', '');
                }


            },

            /* 
            *  
            *  方法:f_pq_onchange
            *  参数:changeEventParameter
            *  片区onchange事件
            */
            f_pq_onchange = function (e) {
                var controlid = e.target.id;
            },
			
        /* 
        *  
        *  方法:f_khrq_time_onchange
        *  参数:
        *  开户日期 onchange事件
        */
            f_khrq_time_onchange = function (e)
            {
                var r = e.currentTarget.id
            },
        /* 
        *  
        *  方法:f_khrq_date_onchange
        *  参数:
        *  开户日期 onchange事件
        */
            f_khrq_date_onchange = function (ev)
            {           
                var controlid = e.target.id
            },          
    
			
            /* 
            *  
            *  方法:f_sfts_onchange
            *  参数:event, state
            *  是否托收切换事件
            */
            f_sfts_onchange = function (event, state)
            {
                var controlid = event.currentTarget.id;
            },          
    
    
        /* 
        *  
        *  方法:f_htfj_onchange
        *  参数:
        *  合同附件 onchange事件
        */
            f_htfj_onchange = function ()
            {       
                var fileid = controlObj.fileuploaderid( 'detail_f_htfj_tbl_ld_yhb_detail' );
            },          
    
        /* 
        *  
        *  方法:f_sfzfj_onchange
        *  参数:
        *  身份证附件 onchange事件
        */
            f_sfzfj_onchange = function ()
            {       
                var fileid = controlObj.fileuploaderid( 'detail_f_sfzfj_tbl_ld_yhb_detail' );
            },          
    
			
            /* 
            *  
        *  方法:f_qtfj_onchange
        *  参数:
        *  其他附件 onchange事件
        */
            f_qtfj_onchange = function ()
            {
                var fileid = controlObj.fileuploaderid('detail_f_qtfj_tbl_ld_yhb_detail');
            },
            /* 
            *  
            *  方法:f_sfzzs_onchange
            *  参数:event, state
            *  是否增值税切换事件
            */
            f_sfzzs_onchange = function (event, state)
            {
                var controlid = event.currentTarget.id;
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
            /* 
        *  
        *  方法:f_htqdrq_time_onchange
        *  参数:
        *  合同签订日期 onchange事件
        */
            f_htqdrq_time_onchange = function (e) {
                var r = e.currentTarget.id
            },
        /* 
        *  
        *  方法:f_htqdrq_date_onchange
        *  参数:
        *  合同签订日期 onchange事件
        */
            f_htqdrq_date_onchange = function (ev) {
                var controlid = e.target.id
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
                                     
                                       _validateMessage = new validateMessage('btn_command_save_tbl_ld_yhb_detail');

                                       _ladda_btn_command_save = Ladda.create('btn_command_save_tbl_ld_yhb_detail');

                                       switch (that._pr_pagetype)
                                       {
                                           case "1":
                                               setDisable(false);
                                               $('#div_commandrow_tbl_ld_yhb_detail').removeClass('hidden');
                                               break;
                                           case "2":
                                               setDisable(true);
                                               $('#div_commandrow_tbl_ld_yhb_detail').addClass('hidden');
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
                        success: function (tbl_ld_yhb_detail)
                            {
                                setModel(tbl_ld_yhb_detail, {
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
                        success: function (tbl_ld_yhb_detail)
                            {
                                checkModel(tbl_ld_yhb_detail, {
                                    success: function (tbl_ld_yhb_detail)
                                        {
                                            updateData(tbl_ld_yhb_detail, {
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
                tbl_ld_yhb_list_Obj.bindGrid({
                    success: function ()
                    {
                        $('#div_content_part_tbl_ld_yhb_list').css('display', '');
                        $('#div_content_part_tbl_ld_yhb_detail').css('display', 'none');
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



