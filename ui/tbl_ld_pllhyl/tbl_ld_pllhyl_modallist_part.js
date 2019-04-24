

var tbl_ld_pllhyl_modallist_Obj = (function ()
{
    'use strict';
    //=================================================================================
    //                                      私有
    //=================================================================================
    //=================================================================================
    //                                      私有属性 
    //=================================================================================
    var _serviceUrl = '//127.0.0.1/sara.dd.ldsw/service/service_tbl_ld_pllhyl.asmx/',

    //Grid控件的分页参数，设置为空即可实现不分页
    _pageSize = '20',
        _isPage = true,
    //Code数据存储容器
    _baseCodeHashMap = null,

    _validateMessage_search = null,
    _validateMessage_detail = null,

    _ladda_btn_command_new = null,
    _ladda_btn_command_delete = null,

    //where语句
    _whereClauseString = '',

    //当前正在编辑的ID
    _gridEditId = '',
    //上一次的滚动条位置
    _gridStatusScrollTop = 0,
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
                    $('#btn_command_search_tbl_ld_pllhyl_modallist').html('简单查询');
                    $('#txt_command_search_tbl_ld_pllhyl_modallist').removeAttr("disabled");

                    break;
                case "2":
                    $('#btn_command_search_tbl_ld_pllhyl_modallist').html('高级查询');
                    $('#txt_command_search_tbl_ld_pllhyl_modallist').attr("disabled", true);
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
            _blockMessage.show('initParameter执行失败' + ex.message, 'fail');
        }

    },

    /* 
    *  
    *  方法:setDisable
    *  参数:isDisable
    *  设置detailModel是否只读
    */
    setDisable = function (isDisable)
    {



        controlObj.toggledisable('detail_f_yzqk_tbl_ld_pllhyl_modallist', isDisable);

        controlObj.textdisable('detail_f_khbh_tbl_ld_pllhyl_modallist', true);

        controlObj.textdisable('detail_f_ycje_tbl_ld_pllhyl_modallist', isDisable);

        controlObj.textdisable('detail_f_tbbh_tbl_ld_pllhyl_modallist', isDisable);


        controlObj.singledropdownlistdisable('detail_f_khzt_tbl_ld_pllhyl_modallist', isDisable);

        controlObj.textdisable('detail_f_ztkhh_tbl_ld_pllhyl_modallist', true);

        controlObj.textdisable('detail_f_djjzsf_tbl_ld_pllhyl_modallist', isDisable);


        controlObj.toggledisable('detail_f_sfjlbjf_tbl_ld_pllhyl_modallist', isDisable);

        controlObj.textdisable('detail_f_sqysl_tbl_ld_pllhyl_modallist', isDisable);

        controlObj.multidropdownlistdisable('detail_f_khfz_tbl_ld_pllhyl_modallist', isDisable);

        controlObj.textdisable('detail_f_djjzpwf_tbl_ld_pllhyl_modallist', isDisable);

        controlObj.textdisable('detail_f_ickljgl_tbl_ld_pllhyl_modallist', isDisable);

        controlObj.textdisable('detail_f_jhysl_tbl_ld_pllhyl_modallist', isDisable);


        controlObj.singledropdownlistdisable('detail_f_yslx_tbl_ld_pllhyl_modallist', isDisable);

        controlObj.textdisable('detail_f_ljqf_tbl_ld_pllhyl_modallist', isDisable);

        controlObj.datetimedisable('detail_f_zhcbrq_tbl_ld_pllhyl_modallist_date', 'detail_f_zhcbrq_tbl_ld_pllhyl_modallist_time', isDisable);

        controlObj.textdisable('detail_f_khbz_tbl_ld_pllhyl_modallist', isDisable);


        controlObj.singledropdownlistdisable('detail_f_cbbh_tbl_ld_pllhyl_modallist', isDisable);

        controlObj.textdisable('detail_f_cbxh_tbl_ld_pllhyl_modallist', isDisable);

        controlObj.textdisable('detail_f_cbmc_tbl_ld_pllhyl_modallist', true);

        controlObj.textdisable('detail_f_cbzq_tbl_ld_pllhyl_modallist', true);


        controlObj.singledropdownlistdisable('detail_f_cbyxm_tbl_ld_pllhyl_modallist', true);

        controlObj.textdisable('detail_f_yhbh_tbl_ld_pllhyl_modallist', true);

        controlObj.textdisable('detail_f_dh_tbl_ld_pllhyl_modallist', isDisable);

        controlObj.textdisable('detail_f_jyhh_tbl_ld_pllhyl_modallist', true);

        controlObj.multidropdownlistdisable('detail_f_yhfz_tbl_ld_pllhyl_modallist', isDisable);

        controlObj.textdisable('detail_f_yhm_tbl_ld_pllhyl_modallist', isDisable);

        controlObj.textdisable('detail_f_dz_tbl_ld_pllhyl_modallist', isDisable);

        controlObj.textdisable('detail_f_jfm_tbl_ld_pllhyl_modallist', isDisable);


        controlObj.singledropdownlistdisable('detail_f_dy_tbl_ld_pllhyl_modallist', isDisable);

        controlObj.datetimedisable('detail_f_khrq_tbl_ld_pllhyl_modallist_date', 'detail_f_khrq_tbl_ld_pllhyl_modallist_time', isDisable);

        controlObj.textdisable('detail_f_htbh_tbl_ld_pllhyl_modallist', isDisable);

        controlObj.fileuploaderdisable('detail_f_htfj_tbl_ld_pllhyl_modallist', isDisable);


        controlObj.toggledisable('detail_f_sfzzs_tbl_ld_pllhyl_modallist', isDisable);


        controlObj.singledropdownlistdisable('detail_f_sc_tbl_ld_pllhyl_modallist', isDisable);


        controlObj.toggledisable('detail_f_sfts_tbl_ld_pllhyl_modallist', isDisable);

        controlObj.datetimedisable('detail_f_htqdrq_tbl_ld_pllhyl_modallist_date', 'detail_f_htqdrq_tbl_ld_pllhyl_modallist_time', isDisable);

        controlObj.fileuploaderdisable('detail_f_qtfj_tbl_ld_pllhyl_modallist', isDisable);


        controlObj.singledropdownlistdisable('detail_f_yhzt_tbl_ld_pllhyl_modallist', isDisable);


        controlObj.singledropdownlistdisable('detail_f_qy_tbl_ld_pllhyl_modallist', isDisable);


        controlObj.singledropdownlistdisable('detail_f_tsyx_tbl_ld_pllhyl_modallist', isDisable);

        controlObj.textdisable('detail_f_sfzh_tbl_ld_pllhyl_modallist', isDisable);

        controlObj.fileuploaderdisable('detail_f_sfzfj_tbl_ld_pllhyl_modallist', isDisable);

        controlObj.textdisable('detail_f_yhbz_tbl_ld_pllhyl_modallist', isDisable);


        controlObj.singledropdownlistdisable('detail_f_pq_tbl_ld_pllhyl_modallist', isDisable);

        controlObj.textdisable('detail_f_tsyxzh_tbl_ld_pllhyl_modallist', isDisable);

        controlObj.textdisable('detail_f_sbbh_tbl_ld_pllhyl_modallist', true);

        controlObj.textdisable('detail_f_sbpp_tbl_ld_pllhyl_modallist', isDisable);

        controlObj.textdisable('detail_f_ztsbh_tbl_ld_pllhyl_modallist', true);

        controlObj.textdisable('detail_f_mph_tbl_ld_pllhyl_modallist', isDisable);

        controlObj.textdisable('detail_f_lxth_tbl_ld_pllhyl_modallist', isDisable);

        controlObj.textdisable('detail_f_sbdz_tbl_ld_pllhyl_modallist', isDisable);

        controlObj.multidropdownlistdisable('detail_f_sbfz_tbl_ld_pllhyl_modallist', isDisable);

        controlObj.textdisable('detail_f_rs_tbl_ld_pllhyl_modallist', isDisable);

        controlObj.textdisable('detail_f_cszm_tbl_ld_pllhyl_modallist', isDisable);

        controlObj.textdisable('detail_f_ljgl_tbl_ld_pllhyl_modallist', isDisable);

        controlObj.textdisable('detail_f_nljgl_tbl_ld_pllhyl_modallist', isDisable);


        controlObj.singledropdownlistdisable('detail_f_sbzt_tbl_ld_pllhyl_modallist', isDisable);


        controlObj.singledropdownlistdisable('detail_f_sbkj_tbl_ld_pllhyl_modallist', isDisable);

        controlObj.textdisable('detail_f_bqzm_tbl_ld_pllhyl_modallist', isDisable);

        controlObj.textdisable('detail_f_bqsl_tbl_ld_pllhyl_modallist', isDisable);

        controlObj.datetimedisable('detail_f_azrq_tbl_ld_pllhyl_modallist_date', 'detail_f_azrq_tbl_ld_pllhyl_modallist_time', isDisable);

        controlObj.fileuploaderdisable('detail_f_sbfj_tbl_ld_pllhyl_modallist', isDisable);


        controlObj.singledropdownlistdisable('detail_f_sblx_tbl_ld_pllhyl_modallist', isDisable);

        controlObj.textdisable('detail_f_sqzm_tbl_ld_pllhyl_modallist', isDisable);

        controlObj.textdisable('detail_f_qsqpjsl_tbl_ld_pllhyl_modallist', isDisable);

        controlObj.textdisable('detail_f_synx_tbl_ld_pllhyl_modallist', isDisable);

        controlObj.textdisable('detail_f_sbbz_tbl_ld_pllhyl_modallist', isDisable);


        controlObj.singledropdownlistdisable('detail_f_jllx_tbl_ld_pllhyl_modallist', isDisable);

        controlObj.textdisable('detail_f_sqsl_tbl_ld_pllhyl_modallist', isDisable);

        controlObj.textdisable('detail_f_qlqpjsl_tbl_ld_pllhyl_modallist', isDisable);


        controlObj.toggledisable('detail_f_qfzt_tbl_ld_pllhyl_modallist', isDisable);

        if (isDisable)
        {
            $('#btn_detail_modal_save_tbl_ld_pllhyl_modallist').addClass('hidden');
            $('#btn_command_delete_tbl_ld_pllhyl_modallist').addClass('hidden');
            $('#btn_command_new_tbl_ld_pllhyl_modallist').addClass('hidden');
        }
        else
        {
            $('#btn_detail_modal_save_tbl_ld_pllhyl_modallist').removeClass('hidden');
            $('#btn_command_delete_tbl_ld_pllhyl_modallist').removeClass('hidden');
            $('#btn_command_new_tbl_ld_pllhyl_modallist').removeClass('hidden');
        }
    },

    /* 
    *  
    *  方法:initBaseCode
    *  参数:callBackFunction
    *  初始化Code，存储到_baseCodeHashMap
    */
    initBaseCode = function (callBackFunction)
    {
        var codeServiceId = '';
        codeServiceId += "0555^";
        codeServiceId += "0556^";
        codeServiceId += "0592^";
        codeServiceId += "0516^";
        codeServiceId += "0523^";
        codeServiceId += "0524^";
        codeServiceId += "0525^";
        codeServiceId += "0526^";





        codeServiceId = codeServiceId.trimEnd('^');
        commonObj.getCodeServiceJson(codeServiceId, {
            success: function (resultArray)
            {
                try
                {

                    _baseCodeHashMap = new hashMap();
                    var codenull = [];

                    _baseCodeHashMap.put('codeservice_0555', resultArray['0555']);
                    _baseCodeHashMap.put('codeservice_0556', resultArray['0556']);
                    _baseCodeHashMap.put('codeservice_0592', resultArray['0592']);
                    _baseCodeHashMap.put('codeservice_0516', resultArray['0516']);
                    _baseCodeHashMap.put('codeservice_0523', resultArray['0523']);
                    _baseCodeHashMap.put('codeservice_0524', resultArray['0524']);
                    _baseCodeHashMap.put('codeservice_0525', resultArray['0525']);
                    _baseCodeHashMap.put('codeservice_0526', resultArray['0526']);
                    _baseCodeHashMap.put('codeservice_0513', codenull);

                    _baseCodeHashMap.put('codeservice_0514', codenull);

                    _baseCodeHashMap.put('codeservice_0515', codenull);

                    var sqlJson = {

                        "tbl_ldbm_yhfz": "select sys_id as id,f_fzmc as text,decode(f_ztid,'0','false','true') as disabled from tbl_ldbm_yhfz where sys_delflag='0'  order by sys_id",

                        "tbl_ldbm_dycq": "select sys_id as id, f_mc as text ,sys_orderid as nodeid ,decode(f_ztid,'0','false','true') as disabled from tbl_ldbm_dycq where sys_delflag='0'and length(sys_orderid)=4 order by sys_orderid",
                        "codeservice_sc": "select sys_id as id, f_mc as text ,sys_orderid as nodeid ,decode(f_ztid,'0','false','true') as disabled from tbl_ldbm_dycq where sys_delflag='0'and length(sys_orderid)=8 order by sys_orderid",
                        "codeservice_qy": "select sys_id as id, f_mc as text ,sys_orderid as nodeid ,decode(f_ztid,'0','false','true') as disabled from tbl_ldbm_dycq where sys_delflag='0'and length(sys_orderid)=12 order by sys_orderid",
                        "codeservice_pq": "select sys_id as id, f_mc as text ,sys_orderid as nodeid ,decode(f_ztid,'0','false','true') as disabled from tbl_ldbm_dycq where sys_delflag='0'and length(sys_orderid)=16 order by sys_orderid",

                        "tbl_ld_cben": "select sys_id as id,f_cbbh as text,f_cbymc,f_cbyid,f_cbzq,f_cbmc ,decode(f_ztid,'0','false','true') as disabled from tbl_ld_cben order by f_cbbh",
                        "tbl_ldbm_khfz": "select sys_id as id,f_fzmc as text,decode(f_ztid,'0','false','true') as disabled from tbl_ldbm_khfz where sys_delflag='0'  order by sys_id",
                        "cby": "select u_id as id,u_name as text from t_user",
                        "tbl_ldbm_sbfz": "select sys_id as id, f_fzmc as text,decode(f_ztid,'0','false','true') as disabled from tbl_ldbm_sbfz where sys_delflag='0'  order by sys_id"
                    }


                    commonObj.querySqls(sqlJson, {
                        success: function (messageJson)
                        {

                            $.each(messageJson["tbl_ldbm_yhfz"], function (i, u)
                            {
                                if (messageJson["tbl_ldbm_yhfz"][i]["disabled"] == "true")
                                {
                                    messageJson["tbl_ldbm_yhfz"][i]["disabled"] = true;
                                }
                                else
                                {
                                    messageJson["tbl_ldbm_yhfz"][i]["disabled"] = false;
                                }
                            });
                            $.each(messageJson["tbl_ld_cben"], function (i, u)
                            {
                                if (messageJson["tbl_ld_cben"][i]["disabled"] == "true")
                                {
                                    messageJson["tbl_ld_cben"][i]["disabled"] = true;
                                }
                                else
                                {
                                    messageJson["tbl_ld_cben"][i]["disabled"] = false;
                                }
                            });
                            $.each(messageJson["tbl_ldbm_khfz"], function (i, u)
                            {
                                if (messageJson["tbl_ldbm_khfz"][i]["disabled"] == "true")
                                {
                                    messageJson["tbl_ldbm_khfz"][i]["disabled"] = true;
                                }
                                else
                                {
                                    messageJson["tbl_ldbm_khfz"][i]["disabled"] = false;
                                }
                            });
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
                            $.each(messageJson["tbl_ldbm_dycq"], function (i, u)
                            {
                                if (messageJson["tbl_ldbm_dycq"][i]["disabled"] == "true")
                                {
                                    messageJson["tbl_ldbm_dycq"][i]["disabled"] = true;
                                }
                                else
                                {
                                    messageJson["tbl_ldbm_dycq"][i]["disabled"] = false;
                                }
                            });
                            $.each(messageJson["codeservice_sc"], function (i, u)
                            {
                                if (messageJson["codeservice_sc"][i]["disabled"] == "true")
                                {
                                    messageJson["codeservice_sc"][i]["disabled"] = true;
                                }
                                else
                                {
                                    messageJson["codeservice_sc"][i]["disabled"] = false;
                                }
                            });
                            $.each(messageJson["codeservice_qy"], function (i, u)
                            {
                                if (messageJson["codeservice_qy"][i]["disabled"] == "true")
                                {
                                    messageJson["codeservice_qy"][i]["disabled"] = true;
                                }
                                else
                                {
                                    messageJson["codeservice_qy"][i]["disabled"] = false;
                                }
                            });
                            $.each(messageJson["codeservice_pq"], function (i, u)
                            {
                                if (messageJson["codeservice_pq"][i]["disabled"] == "true")
                                {
                                    messageJson["codeservice_pq"][i]["disabled"] = true;
                                }
                                else
                                {
                                    messageJson["codeservice_pq"][i]["disabled"] = false;
                                }
                            });

                            _baseCodeHashMap.put('codeservice_cby', messageJson["cby"]);
                            _baseCodeHashMap.put('codeservice_cben', messageJson["tbl_ld_cben"]);
                            _baseCodeHashMap.put('codeservice_yhfz', messageJson["tbl_ldbm_yhfz"]);
                            _baseCodeHashMap.put('codeservice_khfz', messageJson["tbl_ldbm_khfz"]);
                            _baseCodeHashMap.put('codeservice_sbfz', messageJson["tbl_ldbm_sbfz"]);
                            _baseCodeHashMap.put('codeservice_dycq', messageJson["tbl_ldbm_dycq"]);
                            _baseCodeHashMap.put('codeservice_sc', messageJson["codeservice_sc"]);
                            _baseCodeHashMap.put('codeservice_qy', messageJson["codeservice_qy"]);
                            _baseCodeHashMap.put('codeservice_pq', messageJson["codeservice_pq"]);
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


    //---------------------------------------------------------------------------------
    // ---------------------------------SearchModel------------------------------------
    //---------------------------------------------------------------------------------
    /* 
    *  
    *  方法:initSearchControl
    *  参数:callBackFunction
    *  初始化SearchModel控件，_baseCodeHashMap作为Code数据源
    */
    initSearchControl = function (callBackFunction)
    {
        try
        {



            var codeService_0555 = _baseCodeHashMap.get('codeservice_0555');
            var codeService_0556 = _baseCodeHashMap.get('codeservice_0556');
            var codeService_0592 = _baseCodeHashMap.get('codeservice_0592');
            var codeService_0516 = _baseCodeHashMap.get('codeservice_0516');
            var codeService_0523 = _baseCodeHashMap.get('codeservice_0523');
            var codeService_0524 = _baseCodeHashMap.get('codeservice_0524');
            var codeService_0525 = _baseCodeHashMap.get('codeservice_0525');
            var codeService_0526 = _baseCodeHashMap.get('codeservice_0526');

            var codeService_cby = _baseCodeHashMap.get('codeservice_cby');
            var codeService_cben = _baseCodeHashMap.get('codeservice_cben');
            var codeService_yhfz = _baseCodeHashMap.get('codeservice_yhfz');
            var codeService_khfz = _baseCodeHashMap.get('codeservice_khfz');
            var codeService_sbfz = _baseCodeHashMap.get('codeservice_sbfz');
            var codeService_dycq = _baseCodeHashMap.get('codeservice_dycq');

            var codeService_0513 = _baseCodeHashMap.get('codeservice_0513');
            var codeService_0514 = _baseCodeHashMap.get('codeservice_0514');
            var codeService_0515 = _baseCodeHashMap.get('codeservice_0515');



            controlObj.multidropdownlistinit('search_f_khfz_tbl_ld_pllhyl_modallist', codeService_khfz);

            controlObj.multidropdownlistinit('search_f_yslx_tbl_ld_pllhyl_modallist', codeService_0555);











            controlObj.multidropdownlistinit('search_f_sfjlbjf_tbl_ld_pllhyl_modallist', [{ id: 'true', text: '是' }, { id: 'false', text: '否' }]);



            controlObj.datetimeinit('search_f_zhcbrq_tbl_ld_pllhyl_modallist_datefrom', 'search_f_zhcbrq_tbl_ld_pllhyl_modallist_timefrom');
            controlObj.datetimeinit('search_f_zhcbrq_tbl_ld_pllhyl_modallist_dateto', 'search_f_zhcbrq_tbl_ld_pllhyl_modallist_timeto');

            controlObj.datetime('search_f_zhcbrq_tbl_ld_pllhyl_modallist_datefrom', 'search_f_zhcbrq_tbl_ld_pllhyl_modallist_timefrom', '1900-01-01 00:00:00');
            controlObj.datetime('search_f_zhcbrq_tbl_ld_pllhyl_modallist_dateto', 'search_f_zhcbrq_tbl_ld_pllhyl_modallist_timeto', '1900-01-01 00:00:00');

            controlObj.multidropdownlistinit('search_f_khzt_tbl_ld_pllhyl_modallist', codeService_0556);







            controlObj.multidropdownlistinit('search_f_cbbh_tbl_ld_pllhyl_modallist', codeService_cben);



            controlObj.multidropdownlistinit('search_f_cbyxm_tbl_ld_pllhyl_modallist', codeService_cby);











            controlObj.multidropdownlistinit('search_f_sbfz_tbl_ld_pllhyl_modallist', codeService_sbfz);









            controlObj.multidropdownlistinit('search_f_sbkj_tbl_ld_pllhyl_modallist', codeService_0523);

            controlObj.multidropdownlistinit('search_f_sblx_tbl_ld_pllhyl_modallist', codeService_0524);

            controlObj.multidropdownlistinit('search_f_jllx_tbl_ld_pllhyl_modallist', codeService_0525);



















            controlObj.datetimeinit('search_f_azrq_tbl_ld_pllhyl_modallist_datefrom', 'search_f_azrq_tbl_ld_pllhyl_modallist_timefrom');
            controlObj.datetimeinit('search_f_azrq_tbl_ld_pllhyl_modallist_dateto', 'search_f_azrq_tbl_ld_pllhyl_modallist_timeto');

            controlObj.datetime('search_f_azrq_tbl_ld_pllhyl_modallist_datefrom', 'search_f_azrq_tbl_ld_pllhyl_modallist_timefrom', '1900-01-01 00:00:00');
            controlObj.datetime('search_f_azrq_tbl_ld_pllhyl_modallist_dateto', 'search_f_azrq_tbl_ld_pllhyl_modallist_timeto', '1900-01-01 00:00:00');



            controlObj.multidropdownlistinit('search_f_qfzt_tbl_ld_pllhyl_modallist', [{ id: 'true', text: '损毁' }, { id: 'false', text: '正常' }]);

            controlObj.multidropdownlistinit('search_f_sbzt_tbl_ld_pllhyl_modallist', codeService_0526);













            controlObj.multidropdownlistinit('search_f_yhfz_tbl_ld_pllhyl_modallist', codeService_yhfz);



            controlObj.singledropdownlistinit('search_f_dy_tbl_ld_pllhyl_modallist', codeService_dycq, f_dycx_onchange);

            controlObj.singledropdownlistinit('search_f_sc_tbl_ld_pllhyl_modallist', codeService_0513, f_sccx_onchange);

            controlObj.singledropdownlistinit('search_f_qy_tbl_ld_pllhyl_modallist', codeService_0514, f_qycx_onchange);

            controlObj.singledropdownlistinit('search_f_pq_tbl_ld_pllhyl_modallist', codeService_0515, f_pqcx_onchange);

            controlObj.datetimeinit('search_f_khrq_tbl_ld_pllhyl_modallist_datefrom', 'search_f_khrq_tbl_ld_pllhyl_modallist_timefrom');
            controlObj.datetimeinit('search_f_khrq_tbl_ld_pllhyl_modallist_dateto', 'search_f_khrq_tbl_ld_pllhyl_modallist_timeto');

            controlObj.datetime('search_f_khrq_tbl_ld_pllhyl_modallist_datefrom', 'search_f_khrq_tbl_ld_pllhyl_modallist_timefrom', '1900-01-01 00:00:00');
            controlObj.datetime('search_f_khrq_tbl_ld_pllhyl_modallist_dateto', 'search_f_khrq_tbl_ld_pllhyl_modallist_timeto', '1900-01-01 00:00:00');

            controlObj.multidropdownlistinit('search_f_sfts_tbl_ld_pllhyl_modallist', [{ id: 'true', text: '开' }, { id: 'false', text: '关' }]);







            controlObj.datetimeinit('search_f_htqdrq_tbl_ld_pllhyl_modallist_datefrom', 'search_f_htqdrq_tbl_ld_pllhyl_modallist_timefrom');
            controlObj.datetimeinit('search_f_htqdrq_tbl_ld_pllhyl_modallist_dateto', 'search_f_htqdrq_tbl_ld_pllhyl_modallist_timeto');

            controlObj.datetime('search_f_htqdrq_tbl_ld_pllhyl_modallist_datefrom', 'search_f_htqdrq_tbl_ld_pllhyl_modallist_timefrom', '1900-01-01 00:00:00');
            controlObj.datetime('search_f_htqdrq_tbl_ld_pllhyl_modallist_dateto', 'search_f_htqdrq_tbl_ld_pllhyl_modallist_timeto', '1900-01-01 00:00:00');

            controlObj.multidropdownlistinit('search_f_tsyx_tbl_ld_pllhyl_modallist', codeService_0592);

            controlObj.multidropdownlistinit('search_f_sfzzs_tbl_ld_pllhyl_modallist', [{ id: 'true', text: '开' }, { id: 'false', text: '关' }]);

            controlObj.multidropdownlistinit('search_f_yhzt_tbl_ld_pllhyl_modallist', codeService_0516);



            controlObj.multidropdownlistinit('search_f_yzqk_tbl_ld_pllhyl_modallist', [{ id: 'true', text: '异常' }, { id: 'false', text: '正常' }]);


            //模态窗口
            $('#div_search_modal_tbl_ld_pllhyl_modallist').modal({
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
                        $("#txt_command_search_tbl_ld_pllhyl_modallist").val(that._pr_searchcontent.type1);
                    }

                    break;
                case "2":
                    if (that._pr_searchcontent.type2 != undefined)
                    {
                        //高级查询
                        var tbl_ld_pllhyl_modallist = that._pr_searchcontent.type2;


                        controlObj.text('search_f_value1_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_value1);

                        controlObj.text('search_f_value2_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_value2);

                        controlObj.text('search_f_value3_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_value3);

                        controlObj.text('search_f_value4_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_value4);

                        controlObj.text('search_f_value5_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_value5);

                        controlObj.text('search_f_value6_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_value6);

                        controlObj.text('search_f_value7_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_value7);

                        controlObj.text('search_f_value8_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_value8);

                        controlObj.text('search_f_value9_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_value9);

                        controlObj.text('search_f_value10_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_value10);

                        controlObj.text('search_f_khbh_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_khbh);

                        controlObj.text('search_f_ztkhh_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_ztkhh);

                        controlObj.multidropdownlistid('search_f_khfz_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_khfzid);

                        controlObj.multidropdownlistid('search_f_yslx_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_yslxid);

                        controlObj.text('search_f_ycje_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_ycje);

                        controlObj.text('search_f_djjzsf_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_djjzsf);

                        controlObj.text('search_f_djjzpwf_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_djjzpwf);

                        controlObj.text('search_f_ljqf_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_ljqf);

                        controlObj.text('search_f_tbbh_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_tbbh);

                        controlObj.multidropdownlistid('search_f_sfjlbjf_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_sfjlbjfid);

                        controlObj.text('search_f_ickljgl_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_ickljgl);


                        controlObj.datetime('search_f_zhcbrq_tbl_ld_pllhyl_modallist_datefrom', 'search_f_zhcbrq_tbl_ld_pllhyl_modallist_timefrom', tbl_ld_pllhyl_modallist.f_zhcbrqfrom);
                        controlObj.datetime('search_f_zhcbrq_tbl_ld_pllhyl_modallist_dateto', 'search_f_zhcbrq_tbl_ld_pllhyl_modallist_timeto', tbl_ld_pllhyl_modallist.f_zhcbrqto);

                        controlObj.multidropdownlistid('search_f_khzt_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_khztid);

                        controlObj.text('search_f_sqysl_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_sqysl);

                        controlObj.text('search_f_jhysl_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_jhysl);

                        controlObj.text('search_f_khbz_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_khbz);

                        controlObj.multidropdownlistid('search_f_cbbh_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_cbbhid);

                        controlObj.text('search_f_cbmc_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_cbmc);

                        controlObj.multidropdownlistid('search_f_cbyxm_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_cbyxmid);

                        controlObj.text('search_f_cbxh_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_cbxh);

                        controlObj.text('search_f_cbzq_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_cbzq);

                        controlObj.text('search_f_sbbh_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_sbbh);

                        controlObj.text('search_f_ztsbh_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_ztsbh);

                        controlObj.text('search_f_lxth_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_lxth);

                        controlObj.multidropdownlistid('search_f_sbfz_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_sbfzid);

                        controlObj.text('search_f_sbpp_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_sbpp);

                        controlObj.text('search_f_mph_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_mph);

                        controlObj.text('search_f_sbdz_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_sbdz);

                        controlObj.text('search_f_rs_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_rs);

                        controlObj.multidropdownlistid('search_f_sbkj_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_sbkjid);

                        controlObj.multidropdownlistid('search_f_sblx_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_sblxid);

                        controlObj.multidropdownlistid('search_f_jllx_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_jllxid);

                        controlObj.text('search_f_cszm_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_cszm);

                        controlObj.text('search_f_bqzm_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_bqzm);

                        controlObj.text('search_f_sqzm_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_sqzm);

                        controlObj.text('search_f_sqsl_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_sqsl);

                        controlObj.text('search_f_ljgl_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_ljgl);

                        controlObj.text('search_f_bqsl_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_bqsl);

                        controlObj.text('search_f_qsqpjsl_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_qsqpjsl);

                        controlObj.text('search_f_qlqpjsl_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_qlqpjsl);

                        controlObj.text('search_f_nljgl_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_nljgl);


                        controlObj.datetime('search_f_azrq_tbl_ld_pllhyl_modallist_datefrom', 'search_f_azrq_tbl_ld_pllhyl_modallist_timefrom', tbl_ld_pllhyl_modallist.f_azrqfrom);
                        controlObj.datetime('search_f_azrq_tbl_ld_pllhyl_modallist_dateto', 'search_f_azrq_tbl_ld_pllhyl_modallist_timeto', tbl_ld_pllhyl_modallist.f_azrqto);

                        controlObj.text('search_f_synx_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_synx);

                        controlObj.multidropdownlistid('search_f_qfzt_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_qfztid);

                        controlObj.multidropdownlistid('search_f_sbzt_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_sbztid);

                        controlObj.text('search_f_sbbz_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_sbbz);

                        controlObj.text('search_f_yhbh_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_yhbh);

                        controlObj.text('search_f_jyhh_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_jyhh);

                        controlObj.text('search_f_yhm_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_yhm);

                        controlObj.text('search_f_jfm_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_jfm);

                        controlObj.text('search_f_dh_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_dh);

                        controlObj.multidropdownlistid('search_f_yhfz_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_yhfzid);

                        controlObj.text('search_f_dz_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_dz);

                        controlObj.singledropdownlistid('search_f_dy_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_dyid);

                        controlObj.singledropdownlistid('search_f_sc_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_scid);

                        controlObj.singledropdownlistid('search_f_qy_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_qyid);

                        controlObj.singledropdownlistid('search_f_pq_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_pqid);


                        controlObj.datetime('search_f_khrq_tbl_ld_pllhyl_modallist_datefrom', 'search_f_khrq_tbl_ld_pllhyl_modallist_timefrom', tbl_ld_pllhyl_modallist.f_khrqfrom);
                        controlObj.datetime('search_f_khrq_tbl_ld_pllhyl_modallist_dateto', 'search_f_khrq_tbl_ld_pllhyl_modallist_timeto', tbl_ld_pllhyl_modallist.f_khrqto);

                        controlObj.multidropdownlistid('search_f_sfts_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_sftsid);

                        controlObj.text('search_f_tsyxzh_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_tsyxzh);

                        controlObj.text('search_f_htbh_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_htbh);

                        controlObj.text('search_f_sfzh_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_sfzh);


                        controlObj.datetime('search_f_htqdrq_tbl_ld_pllhyl_modallist_datefrom', 'search_f_htqdrq_tbl_ld_pllhyl_modallist_timefrom', tbl_ld_pllhyl_modallist.f_htqdrqfrom);
                        controlObj.datetime('search_f_htqdrq_tbl_ld_pllhyl_modallist_dateto', 'search_f_htqdrq_tbl_ld_pllhyl_modallist_timeto', tbl_ld_pllhyl_modallist.f_htqdrqto);

                        controlObj.multidropdownlistid('search_f_tsyx_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_tsyxid);

                        controlObj.multidropdownlistid('search_f_sfzzs_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_sfzzsid);

                        controlObj.multidropdownlistid('search_f_yhzt_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_yhztid);

                        controlObj.text('search_f_yhbz_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_yhbz);

                        controlObj.multidropdownlistid('search_f_yzqk_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_yzqk);


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
    getSearchModel = function (callBackFunction)
    {
        try
        {
            switch (that._pr_searchtype)
            {

                case "1":
                    //简单查询
                    that._pr_searchcontent.type1 = $("#txt_command_search_tbl_ld_pllhyl_modallist").val();

                    break;
                case "2":

                    //高级查询
                    var tbl_ld_pllhyl_modallist = new Object();


                    tbl_ld_pllhyl_modallist.f_value1 = controlObj.text('search_f_value1_tbl_ld_pllhyl_modallist');


                    tbl_ld_pllhyl_modallist.f_value2 = controlObj.text('search_f_value2_tbl_ld_pllhyl_modallist');


                    tbl_ld_pllhyl_modallist.f_value3 = controlObj.text('search_f_value3_tbl_ld_pllhyl_modallist');


                    tbl_ld_pllhyl_modallist.f_value4 = controlObj.text('search_f_value4_tbl_ld_pllhyl_modallist');


                    tbl_ld_pllhyl_modallist.f_value5 = controlObj.text('search_f_value5_tbl_ld_pllhyl_modallist');


                    tbl_ld_pllhyl_modallist.f_value6 = controlObj.text('search_f_value6_tbl_ld_pllhyl_modallist');


                    tbl_ld_pllhyl_modallist.f_value7 = controlObj.text('search_f_value7_tbl_ld_pllhyl_modallist');


                    tbl_ld_pllhyl_modallist.f_value8 = controlObj.text('search_f_value8_tbl_ld_pllhyl_modallist');


                    tbl_ld_pllhyl_modallist.f_value9 = controlObj.text('search_f_value9_tbl_ld_pllhyl_modallist');


                    tbl_ld_pllhyl_modallist.f_value10 = controlObj.text('search_f_value10_tbl_ld_pllhyl_modallist');


                    tbl_ld_pllhyl_modallist.f_khbh = controlObj.text('search_f_khbh_tbl_ld_pllhyl_modallist');


                    tbl_ld_pllhyl_modallist.f_ztkhh = controlObj.text('search_f_ztkhh_tbl_ld_pllhyl_modallist');


                    tbl_ld_pllhyl_modallist.f_khfzid = controlObj.multidropdownlistid('search_f_khfz_tbl_ld_pllhyl_modallist');


                    tbl_ld_pllhyl_modallist.f_yslxid = controlObj.multidropdownlistid('search_f_yslx_tbl_ld_pllhyl_modallist');


                    tbl_ld_pllhyl_modallist.f_ycje = controlObj.text('search_f_ycje_tbl_ld_pllhyl_modallist');


                    tbl_ld_pllhyl_modallist.f_djjzsf = controlObj.text('search_f_djjzsf_tbl_ld_pllhyl_modallist');


                    tbl_ld_pllhyl_modallist.f_djjzpwf = controlObj.text('search_f_djjzpwf_tbl_ld_pllhyl_modallist');


                    tbl_ld_pllhyl_modallist.f_ljqf = controlObj.text('search_f_ljqf_tbl_ld_pllhyl_modallist');


                    tbl_ld_pllhyl_modallist.f_tbbh = controlObj.text('search_f_tbbh_tbl_ld_pllhyl_modallist');


                    tbl_ld_pllhyl_modallist.f_sfjlbjfid = controlObj.multidropdownlistid('search_f_sfjlbjf_tbl_ld_pllhyl_modallist');


                    tbl_ld_pllhyl_modallist.f_ickljgl = controlObj.text('search_f_ickljgl_tbl_ld_pllhyl_modallist');


                    tbl_ld_pllhyl_modallist.f_zhcbrqfrom = controlObj.datetime('search_f_zhcbrq_tbl_ld_pllhyl_modallist_datefrom', 'search_f_zhcbrq_tbl_ld_pllhyl_modallist_timefrom'); // datefrom + ' ' + timefrom;
                    tbl_ld_pllhyl_modallist.f_zhcbrqto = controlObj.datetime('search_f_zhcbrq_tbl_ld_pllhyl_modallist_dateto', 'search_f_zhcbrq_tbl_ld_pllhyl_modallist_timeto'); //dateto + ' ' + timeto;                 


                    tbl_ld_pllhyl_modallist.f_khztid = controlObj.multidropdownlistid('search_f_khzt_tbl_ld_pllhyl_modallist');


                    tbl_ld_pllhyl_modallist.f_sqysl = controlObj.text('search_f_sqysl_tbl_ld_pllhyl_modallist');


                    tbl_ld_pllhyl_modallist.f_jhysl = controlObj.text('search_f_jhysl_tbl_ld_pllhyl_modallist');


                    tbl_ld_pllhyl_modallist.f_khbz = controlObj.text('search_f_khbz_tbl_ld_pllhyl_modallist');


                    tbl_ld_pllhyl_modallist.f_cbbhid = controlObj.multidropdownlistid('search_f_cbbh_tbl_ld_pllhyl_modallist');


                    tbl_ld_pllhyl_modallist.f_cbmc = controlObj.text('search_f_cbmc_tbl_ld_pllhyl_modallist');


                    tbl_ld_pllhyl_modallist.f_cbyxmid = controlObj.multidropdownlistid('search_f_cbyxm_tbl_ld_pllhyl_modallist');


                    tbl_ld_pllhyl_modallist.f_cbxh = controlObj.text('search_f_cbxh_tbl_ld_pllhyl_modallist');


                    tbl_ld_pllhyl_modallist.f_cbzq = controlObj.text('search_f_cbzq_tbl_ld_pllhyl_modallist');


                    tbl_ld_pllhyl_modallist.f_sbbh = controlObj.text('search_f_sbbh_tbl_ld_pllhyl_modallist');


                    tbl_ld_pllhyl_modallist.f_ztsbh = controlObj.text('search_f_ztsbh_tbl_ld_pllhyl_modallist');


                    tbl_ld_pllhyl_modallist.f_lxth = controlObj.text('search_f_lxth_tbl_ld_pllhyl_modallist');


                    tbl_ld_pllhyl_modallist.f_sbfzid = controlObj.multidropdownlistid('search_f_sbfz_tbl_ld_pllhyl_modallist');


                    tbl_ld_pllhyl_modallist.f_sbpp = controlObj.text('search_f_sbpp_tbl_ld_pllhyl_modallist');


                    tbl_ld_pllhyl_modallist.f_mph = controlObj.text('search_f_mph_tbl_ld_pllhyl_modallist');


                    tbl_ld_pllhyl_modallist.f_sbdz = controlObj.text('search_f_sbdz_tbl_ld_pllhyl_modallist');


                    tbl_ld_pllhyl_modallist.f_rs = controlObj.text('search_f_rs_tbl_ld_pllhyl_modallist');


                    tbl_ld_pllhyl_modallist.f_sbkjid = controlObj.multidropdownlistid('search_f_sbkj_tbl_ld_pllhyl_modallist');


                    tbl_ld_pllhyl_modallist.f_sblxid = controlObj.multidropdownlistid('search_f_sblx_tbl_ld_pllhyl_modallist');


                    tbl_ld_pllhyl_modallist.f_jllxid = controlObj.multidropdownlistid('search_f_jllx_tbl_ld_pllhyl_modallist');


                    tbl_ld_pllhyl_modallist.f_cszm = controlObj.text('search_f_cszm_tbl_ld_pllhyl_modallist');


                    tbl_ld_pllhyl_modallist.f_bqzm = controlObj.text('search_f_bqzm_tbl_ld_pllhyl_modallist');


                    tbl_ld_pllhyl_modallist.f_sqzm = controlObj.text('search_f_sqzm_tbl_ld_pllhyl_modallist');


                    tbl_ld_pllhyl_modallist.f_sqsl = controlObj.text('search_f_sqsl_tbl_ld_pllhyl_modallist');


                    tbl_ld_pllhyl_modallist.f_ljgl = controlObj.text('search_f_ljgl_tbl_ld_pllhyl_modallist');


                    tbl_ld_pllhyl_modallist.f_bqsl = controlObj.text('search_f_bqsl_tbl_ld_pllhyl_modallist');


                    tbl_ld_pllhyl_modallist.f_qsqpjsl = controlObj.text('search_f_qsqpjsl_tbl_ld_pllhyl_modallist');


                    tbl_ld_pllhyl_modallist.f_qlqpjsl = controlObj.text('search_f_qlqpjsl_tbl_ld_pllhyl_modallist');


                    tbl_ld_pllhyl_modallist.f_nljgl = controlObj.text('search_f_nljgl_tbl_ld_pllhyl_modallist');


                    tbl_ld_pllhyl_modallist.f_azrqfrom = controlObj.datetime('search_f_azrq_tbl_ld_pllhyl_modallist_datefrom', 'search_f_azrq_tbl_ld_pllhyl_modallist_timefrom'); // datefrom + ' ' + timefrom;
                    tbl_ld_pllhyl_modallist.f_azrqto = controlObj.datetime('search_f_azrq_tbl_ld_pllhyl_modallist_dateto', 'search_f_azrq_tbl_ld_pllhyl_modallist_timeto'); //dateto + ' ' + timeto;                 


                    tbl_ld_pllhyl_modallist.f_synx = controlObj.text('search_f_synx_tbl_ld_pllhyl_modallist');


                    tbl_ld_pllhyl_modallist.f_qfztid = controlObj.multidropdownlistid('search_f_qfzt_tbl_ld_pllhyl_modallist');


                    tbl_ld_pllhyl_modallist.f_sbztid = controlObj.multidropdownlistid('search_f_sbzt_tbl_ld_pllhyl_modallist');


                    tbl_ld_pllhyl_modallist.f_sbbz = controlObj.text('search_f_sbbz_tbl_ld_pllhyl_modallist');


                    tbl_ld_pllhyl_modallist.f_yhbh = controlObj.text('search_f_yhbh_tbl_ld_pllhyl_modallist');


                    tbl_ld_pllhyl_modallist.f_jyhh = controlObj.text('search_f_jyhh_tbl_ld_pllhyl_modallist');


                    tbl_ld_pllhyl_modallist.f_yhm = controlObj.text('search_f_yhm_tbl_ld_pllhyl_modallist');


                    tbl_ld_pllhyl_modallist.f_jfm = controlObj.text('search_f_jfm_tbl_ld_pllhyl_modallist');


                    tbl_ld_pllhyl_modallist.f_dh = controlObj.text('search_f_dh_tbl_ld_pllhyl_modallist');


                    tbl_ld_pllhyl_modallist.f_yhfzid = controlObj.multidropdownlistid('search_f_yhfz_tbl_ld_pllhyl_modallist');


                    tbl_ld_pllhyl_modallist.f_dz = controlObj.text('search_f_dz_tbl_ld_pllhyl_modallist');


                    tbl_ld_pllhyl_modallist.f_dyid = controlObj.singledropdownlistid('search_f_dy_tbl_ld_pllhyl_modallist');


                    tbl_ld_pllhyl_modallist.f_scid = controlObj.singledropdownlistid('search_f_sc_tbl_ld_pllhyl_modallist');


                    tbl_ld_pllhyl_modallist.f_qyid = controlObj.singledropdownlistid('search_f_qy_tbl_ld_pllhyl_modallist');


                    tbl_ld_pllhyl_modallist.f_pqid = controlObj.singledropdownlistid('search_f_pq_tbl_ld_pllhyl_modallist');


                    tbl_ld_pllhyl_modallist.f_khrqfrom = controlObj.datetime('search_f_khrq_tbl_ld_pllhyl_modallist_datefrom', 'search_f_khrq_tbl_ld_pllhyl_modallist_timefrom'); // datefrom + ' ' + timefrom;
                    tbl_ld_pllhyl_modallist.f_khrqto = controlObj.datetime('search_f_khrq_tbl_ld_pllhyl_modallist_dateto', 'search_f_khrq_tbl_ld_pllhyl_modallist_timeto'); //dateto + ' ' + timeto;                 


                    tbl_ld_pllhyl_modallist.f_sftsid = controlObj.multidropdownlistid('search_f_sfts_tbl_ld_pllhyl_modallist');


                    tbl_ld_pllhyl_modallist.f_tsyxzh = controlObj.text('search_f_tsyxzh_tbl_ld_pllhyl_modallist');


                    tbl_ld_pllhyl_modallist.f_htbh = controlObj.text('search_f_htbh_tbl_ld_pllhyl_modallist');


                    tbl_ld_pllhyl_modallist.f_sfzh = controlObj.text('search_f_sfzh_tbl_ld_pllhyl_modallist');


                    tbl_ld_pllhyl_modallist.f_htqdrqfrom = controlObj.datetime('search_f_htqdrq_tbl_ld_pllhyl_modallist_datefrom', 'search_f_htqdrq_tbl_ld_pllhyl_modallist_timefrom'); // datefrom + ' ' + timefrom;
                    tbl_ld_pllhyl_modallist.f_htqdrqto = controlObj.datetime('search_f_htqdrq_tbl_ld_pllhyl_modallist_dateto', 'search_f_htqdrq_tbl_ld_pllhyl_modallist_timeto'); //dateto + ' ' + timeto;                 


                    tbl_ld_pllhyl_modallist.f_tsyxid = controlObj.multidropdownlistid('search_f_tsyx_tbl_ld_pllhyl_modallist');


                    tbl_ld_pllhyl_modallist.f_sfzzsid = controlObj.multidropdownlistid('search_f_sfzzs_tbl_ld_pllhyl_modallist');


                    tbl_ld_pllhyl_modallist.f_yhztid = controlObj.multidropdownlistid('search_f_yhzt_tbl_ld_pllhyl_modallist');


                    tbl_ld_pllhyl_modallist.f_yhbz = controlObj.text('search_f_yhbz_tbl_ld_pllhyl_modallist');


                    tbl_ld_pllhyl_modallist.f_yzqk = controlObj.multidropdownlistid('search_f_yzqk_tbl_ld_pllhyl_modallist');

                    that._pr_searchcontent.type2 = tbl_ld_pllhyl_modallist;
                    break;

            }

            callBackFunction.success();
        }
        catch (ex)
        {
            callBackFunction.fail(ex.message);
        }
    },

    /* 
    *  
    *  方法:checkSearchModel
    *  参数:callBackFunction
    *  对_pr_searchcontent的type2进行校验
    */
    checkSearchModel = function (callBackFunction)
    {
        try
        {
            var tbl_ld_pllhyl_modallist = that._pr_searchcontent.type2;
            var errorMessageHansMap = new hashMap();
            var errorMessagePlacementHansMap = new hashMap();




            if (tbl_ld_pllhyl_modallist.f_value1.length > 200)
            {
                errorMessageHansMap.put('search_f_value1_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pllhyl_modallist.f_value2.length > 200)
            {
                errorMessageHansMap.put('search_f_value2_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pllhyl_modallist.f_value3.length > 200)
            {
                errorMessageHansMap.put('search_f_value3_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pllhyl_modallist.f_value4.length > 200)
            {
                errorMessageHansMap.put('search_f_value4_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pllhyl_modallist.f_value5.length > 200)
            {
                errorMessageHansMap.put('search_f_value5_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pllhyl_modallist.f_value6.length > 200)
            {
                errorMessageHansMap.put('search_f_value6_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pllhyl_modallist.f_value7.length > 200)
            {
                errorMessageHansMap.put('search_f_value7_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pllhyl_modallist.f_value8.length > 200)
            {
                errorMessageHansMap.put('search_f_value8_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pllhyl_modallist.f_value9.length > 200)
            {
                errorMessageHansMap.put('search_f_value9_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pllhyl_modallist.f_value10.length > 200)
            {
                errorMessageHansMap.put('search_f_value10_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pllhyl_modallist.f_khbh.length > 200)
            {
                errorMessageHansMap.put('search_f_khbh_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pllhyl_modallist.f_ztkhh.length > 200)
            {
                errorMessageHansMap.put('search_f_ztkhh_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pllhyl_modallist.f_khfzid.length > 200)
            {
                errorMessageHansMap.put('search_f_khfz_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pllhyl_modallist.f_yslxid.length > 200)
            {
                errorMessageHansMap.put('search_f_yslx_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pllhyl_modallist.f_ycje.length > 200)
            {
                errorMessageHansMap.put('search_f_ycje_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pllhyl_modallist.f_djjzsf.length > 200)
            {
                errorMessageHansMap.put('search_f_djjzsf_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pllhyl_modallist.f_djjzpwf.length > 200)
            {
                errorMessageHansMap.put('search_f_djjzpwf_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pllhyl_modallist.f_ljqf.length > 200)
            {
                errorMessageHansMap.put('search_f_ljqf_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pllhyl_modallist.f_tbbh.length > 200)
            {
                errorMessageHansMap.put('search_f_tbbh_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pllhyl_modallist.f_sfjlbjfid.length > 200)
            {
                errorMessageHansMap.put('search_f_sfjlbjf_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pllhyl_modallist.f_ickljgl.length > 200)
            {
                errorMessageHansMap.put('search_f_ickljgl_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }







            if (tbl_ld_pllhyl_modallist.f_khztid.length > 200)
            {
                errorMessageHansMap.put('search_f_khzt_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pllhyl_modallist.f_sqysl.length > 200)
            {
                errorMessageHansMap.put('search_f_sqysl_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pllhyl_modallist.f_jhysl.length > 200)
            {
                errorMessageHansMap.put('search_f_jhysl_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pllhyl_modallist.f_khbz.length > 200)
            {
                errorMessageHansMap.put('search_f_khbz_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pllhyl_modallist.f_cbbhid.length > 200)
            {
                errorMessageHansMap.put('search_f_cbbh_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pllhyl_modallist.f_cbmc.length > 200)
            {
                errorMessageHansMap.put('search_f_cbmc_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pllhyl_modallist.f_cbyxmid.length > 200)
            {
                errorMessageHansMap.put('search_f_cbyxm_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pllhyl_modallist.f_cbxh.length > 200)
            {
                errorMessageHansMap.put('search_f_cbxh_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pllhyl_modallist.f_cbzq.length > 200)
            {
                errorMessageHansMap.put('search_f_cbzq_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pllhyl_modallist.f_sbbh.length > 200)
            {
                errorMessageHansMap.put('search_f_sbbh_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pllhyl_modallist.f_ztsbh.length > 200)
            {
                errorMessageHansMap.put('search_f_ztsbh_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pllhyl_modallist.f_lxth.length > 200)
            {
                errorMessageHansMap.put('search_f_lxth_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pllhyl_modallist.f_sbfzid.length > 200)
            {
                errorMessageHansMap.put('search_f_sbfz_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pllhyl_modallist.f_sbpp.length > 200)
            {
                errorMessageHansMap.put('search_f_sbpp_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pllhyl_modallist.f_mph.length > 200)
            {
                errorMessageHansMap.put('search_f_mph_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pllhyl_modallist.f_sbdz.length > 200)
            {
                errorMessageHansMap.put('search_f_sbdz_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pllhyl_modallist.f_rs.length > 200)
            {
                errorMessageHansMap.put('search_f_rs_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pllhyl_modallist.f_sbkjid.length > 200)
            {
                errorMessageHansMap.put('search_f_sbkj_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pllhyl_modallist.f_sblxid.length > 200)
            {
                errorMessageHansMap.put('search_f_sblx_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pllhyl_modallist.f_jllxid.length > 200)
            {
                errorMessageHansMap.put('search_f_jllx_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pllhyl_modallist.f_cszm.length > 200)
            {
                errorMessageHansMap.put('search_f_cszm_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pllhyl_modallist.f_bqzm.length > 200)
            {
                errorMessageHansMap.put('search_f_bqzm_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pllhyl_modallist.f_sqzm.length > 200)
            {
                errorMessageHansMap.put('search_f_sqzm_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pllhyl_modallist.f_sqsl.length > 200)
            {
                errorMessageHansMap.put('search_f_sqsl_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pllhyl_modallist.f_ljgl.length > 200)
            {
                errorMessageHansMap.put('search_f_ljgl_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pllhyl_modallist.f_bqsl.length > 200)
            {
                errorMessageHansMap.put('search_f_bqsl_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pllhyl_modallist.f_qsqpjsl.length > 200)
            {
                errorMessageHansMap.put('search_f_qsqpjsl_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pllhyl_modallist.f_qlqpjsl.length > 200)
            {
                errorMessageHansMap.put('search_f_qlqpjsl_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pllhyl_modallist.f_nljgl.length > 200)
            {
                errorMessageHansMap.put('search_f_nljgl_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }







            if (tbl_ld_pllhyl_modallist.f_synx.length > 200)
            {
                errorMessageHansMap.put('search_f_synx_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pllhyl_modallist.f_qfztid.length > 200)
            {
                errorMessageHansMap.put('search_f_qfzt_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pllhyl_modallist.f_sbztid.length > 200)
            {
                errorMessageHansMap.put('search_f_sbzt_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pllhyl_modallist.f_sbbz.length > 200)
            {
                errorMessageHansMap.put('search_f_sbbz_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pllhyl_modallist.f_yhbh.length > 200)
            {
                errorMessageHansMap.put('search_f_yhbh_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pllhyl_modallist.f_jyhh.length > 200)
            {
                errorMessageHansMap.put('search_f_jyhh_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pllhyl_modallist.f_yhm.length > 200)
            {
                errorMessageHansMap.put('search_f_yhm_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pllhyl_modallist.f_jfm.length > 200)
            {
                errorMessageHansMap.put('search_f_jfm_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pllhyl_modallist.f_dh.length > 200)
            {
                errorMessageHansMap.put('search_f_dh_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pllhyl_modallist.f_yhfzid.length > 200)
            {
                errorMessageHansMap.put('search_f_yhfz_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pllhyl_modallist.f_dz.length > 200)
            {
                errorMessageHansMap.put('search_f_dz_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pllhyl_modallist.f_dyid.length > 200)
            {
                errorMessageHansMap.put('search_f_dy_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pllhyl_modallist.f_scid.length > 200)
            {
                errorMessageHansMap.put('search_f_sc_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pllhyl_modallist.f_qyid.length > 200)
            {
                errorMessageHansMap.put('search_f_qy_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pllhyl_modallist.f_pqid.length > 200)
            {
                errorMessageHansMap.put('search_f_pq_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }







            if (tbl_ld_pllhyl_modallist.f_sftsid.length > 200)
            {
                errorMessageHansMap.put('search_f_sfts_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pllhyl_modallist.f_tsyxzh.length > 200)
            {
                errorMessageHansMap.put('search_f_tsyxzh_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pllhyl_modallist.f_htbh.length > 200)
            {
                errorMessageHansMap.put('search_f_htbh_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pllhyl_modallist.f_sfzh.length > 200)
            {
                errorMessageHansMap.put('search_f_sfzh_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }







            if (tbl_ld_pllhyl_modallist.f_tsyxid.length > 200)
            {
                errorMessageHansMap.put('search_f_tsyx_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pllhyl_modallist.f_sfzzsid.length > 200)
            {
                errorMessageHansMap.put('search_f_sfzzs_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pllhyl_modallist.f_yhztid.length > 200)
            {
                errorMessageHansMap.put('search_f_yhzt_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pllhyl_modallist.f_yhbz.length > 200)
            {
                errorMessageHansMap.put('search_f_yhbz_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pllhyl_modallist.f_yzqk.length > 200)
            {
                errorMessageHansMap.put('search_f_yzqk_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
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
                controlObj.text('search_f_value1_tbl_ld_pllhyl_modallist', that._pr_searchcontent.type2.f_value1);


                that._pr_searchcontent.type2.f_value2 = '';
                controlObj.text('search_f_value2_tbl_ld_pllhyl_modallist', that._pr_searchcontent.type2.f_value2);


                that._pr_searchcontent.type2.f_value3 = '';
                controlObj.text('search_f_value3_tbl_ld_pllhyl_modallist', that._pr_searchcontent.type2.f_value3);


                that._pr_searchcontent.type2.f_value4 = '';
                controlObj.text('search_f_value4_tbl_ld_pllhyl_modallist', that._pr_searchcontent.type2.f_value4);


                that._pr_searchcontent.type2.f_value5 = '';
                controlObj.text('search_f_value5_tbl_ld_pllhyl_modallist', that._pr_searchcontent.type2.f_value5);


                that._pr_searchcontent.type2.f_value6 = '';
                controlObj.text('search_f_value6_tbl_ld_pllhyl_modallist', that._pr_searchcontent.type2.f_value6);


                that._pr_searchcontent.type2.f_value7 = '';
                controlObj.text('search_f_value7_tbl_ld_pllhyl_modallist', that._pr_searchcontent.type2.f_value7);


                that._pr_searchcontent.type2.f_value8 = '';
                controlObj.text('search_f_value8_tbl_ld_pllhyl_modallist', that._pr_searchcontent.type2.f_value8);


                that._pr_searchcontent.type2.f_value9 = '';
                controlObj.text('search_f_value9_tbl_ld_pllhyl_modallist', that._pr_searchcontent.type2.f_value9);


                that._pr_searchcontent.type2.f_value10 = '';
                controlObj.text('search_f_value10_tbl_ld_pllhyl_modallist', that._pr_searchcontent.type2.f_value10);


                that._pr_searchcontent.type2.f_khbh = '';
                controlObj.text('search_f_khbh_tbl_ld_pllhyl_modallist', that._pr_searchcontent.type2.f_khbh);


                that._pr_searchcontent.type2.f_ztkhh = '';
                controlObj.text('search_f_ztkhh_tbl_ld_pllhyl_modallist', that._pr_searchcontent.type2.f_ztkhh);


                that._pr_searchcontent.type2.f_khfzid = '';
                controlObj.multidropdownlistid('search_f_khfz_tbl_ld_pllhyl_modallist', that._pr_searchcontent.type2.f_khfzid);


                that._pr_searchcontent.type2.f_yslxid = '';
                controlObj.multidropdownlistid('search_f_yslx_tbl_ld_pllhyl_modallist', that._pr_searchcontent.type2.f_yslxid);


                that._pr_searchcontent.type2.f_ycje = '';
                controlObj.text('search_f_ycje_tbl_ld_pllhyl_modallist', that._pr_searchcontent.type2.f_ycje);


                that._pr_searchcontent.type2.f_djjzsf = '';
                controlObj.text('search_f_djjzsf_tbl_ld_pllhyl_modallist', that._pr_searchcontent.type2.f_djjzsf);


                that._pr_searchcontent.type2.f_djjzpwf = '';
                controlObj.text('search_f_djjzpwf_tbl_ld_pllhyl_modallist', that._pr_searchcontent.type2.f_djjzpwf);


                that._pr_searchcontent.type2.f_ljqf = '';
                controlObj.text('search_f_ljqf_tbl_ld_pllhyl_modallist', that._pr_searchcontent.type2.f_ljqf);


                that._pr_searchcontent.type2.f_tbbh = '';
                controlObj.text('search_f_tbbh_tbl_ld_pllhyl_modallist', that._pr_searchcontent.type2.f_tbbh);


                that._pr_searchcontent.type2.f_sfjlbjfid = '';
                controlObj.multidropdownlistid('search_f_sfjlbjf_tbl_ld_pllhyl_modallist', that._pr_searchcontent.type2.f_sfjlbjfid);


                that._pr_searchcontent.type2.f_ickljgl = '';
                controlObj.text('search_f_ickljgl_tbl_ld_pllhyl_modallist', that._pr_searchcontent.type2.f_ickljgl);


                that._pr_searchcontent.type2.f_zhcbrqfrom = ('1900-01-01 00:00:00');
                that._pr_searchcontent.type2.f_zhcbrqto = ('1900-01-01 00:00:00');
                controlObj.datetime('search_f_zhcbrq_tbl_ld_pllhyl_modallist_datefrom', 'search_f_zhcbrq_tbl_ld_pllhyl_modallist_timefrom', that._pr_searchcontent.type2.f_zhcbrqfrom);
                controlObj.datetime('search_f_zhcbrq_tbl_ld_pllhyl_modallist_dateto', 'search_f_zhcbrq_tbl_ld_pllhyl_modallist_timeto', that._pr_searchcontent.type2.f_zhcbrqto);


                that._pr_searchcontent.type2.f_khztid = '';
                controlObj.multidropdownlistid('search_f_khzt_tbl_ld_pllhyl_modallist', that._pr_searchcontent.type2.f_khztid);


                that._pr_searchcontent.type2.f_sqysl = '';
                controlObj.text('search_f_sqysl_tbl_ld_pllhyl_modallist', that._pr_searchcontent.type2.f_sqysl);


                that._pr_searchcontent.type2.f_jhysl = '';
                controlObj.text('search_f_jhysl_tbl_ld_pllhyl_modallist', that._pr_searchcontent.type2.f_jhysl);


                that._pr_searchcontent.type2.f_khbz = '';
                controlObj.text('search_f_khbz_tbl_ld_pllhyl_modallist', that._pr_searchcontent.type2.f_khbz);


                that._pr_searchcontent.type2.f_cbbhid = '';
                controlObj.multidropdownlistid('search_f_cbbh_tbl_ld_pllhyl_modallist', that._pr_searchcontent.type2.f_cbbhid);


                that._pr_searchcontent.type2.f_cbmc = '';
                controlObj.text('search_f_cbmc_tbl_ld_pllhyl_modallist', that._pr_searchcontent.type2.f_cbmc);


                that._pr_searchcontent.type2.f_cbyxmid = '';
                controlObj.multidropdownlistid('search_f_cbyxm_tbl_ld_pllhyl_modallist', that._pr_searchcontent.type2.f_cbyxmid);


                that._pr_searchcontent.type2.f_cbxh = '';
                controlObj.text('search_f_cbxh_tbl_ld_pllhyl_modallist', that._pr_searchcontent.type2.f_cbxh);


                that._pr_searchcontent.type2.f_cbzq = '';
                controlObj.text('search_f_cbzq_tbl_ld_pllhyl_modallist', that._pr_searchcontent.type2.f_cbzq);


                that._pr_searchcontent.type2.f_sbbh = '';
                controlObj.text('search_f_sbbh_tbl_ld_pllhyl_modallist', that._pr_searchcontent.type2.f_sbbh);


                that._pr_searchcontent.type2.f_ztsbh = '';
                controlObj.text('search_f_ztsbh_tbl_ld_pllhyl_modallist', that._pr_searchcontent.type2.f_ztsbh);


                that._pr_searchcontent.type2.f_lxth = '';
                controlObj.text('search_f_lxth_tbl_ld_pllhyl_modallist', that._pr_searchcontent.type2.f_lxth);


                that._pr_searchcontent.type2.f_sbfzid = '';
                controlObj.multidropdownlistid('search_f_sbfz_tbl_ld_pllhyl_modallist', that._pr_searchcontent.type2.f_sbfzid);


                that._pr_searchcontent.type2.f_sbpp = '';
                controlObj.text('search_f_sbpp_tbl_ld_pllhyl_modallist', that._pr_searchcontent.type2.f_sbpp);


                that._pr_searchcontent.type2.f_mph = '';
                controlObj.text('search_f_mph_tbl_ld_pllhyl_modallist', that._pr_searchcontent.type2.f_mph);


                that._pr_searchcontent.type2.f_sbdz = '';
                controlObj.text('search_f_sbdz_tbl_ld_pllhyl_modallist', that._pr_searchcontent.type2.f_sbdz);


                that._pr_searchcontent.type2.f_rs = '';
                controlObj.text('search_f_rs_tbl_ld_pllhyl_modallist', that._pr_searchcontent.type2.f_rs);


                that._pr_searchcontent.type2.f_sbkjid = '';
                controlObj.multidropdownlistid('search_f_sbkj_tbl_ld_pllhyl_modallist', that._pr_searchcontent.type2.f_sbkjid);


                that._pr_searchcontent.type2.f_sblxid = '';
                controlObj.multidropdownlistid('search_f_sblx_tbl_ld_pllhyl_modallist', that._pr_searchcontent.type2.f_sblxid);


                that._pr_searchcontent.type2.f_jllxid = '';
                controlObj.multidropdownlistid('search_f_jllx_tbl_ld_pllhyl_modallist', that._pr_searchcontent.type2.f_jllxid);


                that._pr_searchcontent.type2.f_cszm = '';
                controlObj.text('search_f_cszm_tbl_ld_pllhyl_modallist', that._pr_searchcontent.type2.f_cszm);


                that._pr_searchcontent.type2.f_bqzm = '';
                controlObj.text('search_f_bqzm_tbl_ld_pllhyl_modallist', that._pr_searchcontent.type2.f_bqzm);


                that._pr_searchcontent.type2.f_sqzm = '';
                controlObj.text('search_f_sqzm_tbl_ld_pllhyl_modallist', that._pr_searchcontent.type2.f_sqzm);


                that._pr_searchcontent.type2.f_sqsl = '';
                controlObj.text('search_f_sqsl_tbl_ld_pllhyl_modallist', that._pr_searchcontent.type2.f_sqsl);


                that._pr_searchcontent.type2.f_ljgl = '';
                controlObj.text('search_f_ljgl_tbl_ld_pllhyl_modallist', that._pr_searchcontent.type2.f_ljgl);


                that._pr_searchcontent.type2.f_bqsl = '';
                controlObj.text('search_f_bqsl_tbl_ld_pllhyl_modallist', that._pr_searchcontent.type2.f_bqsl);


                that._pr_searchcontent.type2.f_qsqpjsl = '';
                controlObj.text('search_f_qsqpjsl_tbl_ld_pllhyl_modallist', that._pr_searchcontent.type2.f_qsqpjsl);


                that._pr_searchcontent.type2.f_qlqpjsl = '';
                controlObj.text('search_f_qlqpjsl_tbl_ld_pllhyl_modallist', that._pr_searchcontent.type2.f_qlqpjsl);


                that._pr_searchcontent.type2.f_nljgl = '';
                controlObj.text('search_f_nljgl_tbl_ld_pllhyl_modallist', that._pr_searchcontent.type2.f_nljgl);


                that._pr_searchcontent.type2.f_azrqfrom = ('1900-01-01 00:00:00');
                that._pr_searchcontent.type2.f_azrqto = ('1900-01-01 00:00:00');
                controlObj.datetime('search_f_azrq_tbl_ld_pllhyl_modallist_datefrom', 'search_f_azrq_tbl_ld_pllhyl_modallist_timefrom', that._pr_searchcontent.type2.f_azrqfrom);
                controlObj.datetime('search_f_azrq_tbl_ld_pllhyl_modallist_dateto', 'search_f_azrq_tbl_ld_pllhyl_modallist_timeto', that._pr_searchcontent.type2.f_azrqto);


                that._pr_searchcontent.type2.f_synx = '';
                controlObj.text('search_f_synx_tbl_ld_pllhyl_modallist', that._pr_searchcontent.type2.f_synx);


                that._pr_searchcontent.type2.f_qfztid = '';
                controlObj.multidropdownlistid('search_f_qfzt_tbl_ld_pllhyl_modallist', that._pr_searchcontent.type2.f_qfztid);


                that._pr_searchcontent.type2.f_sbztid = '';
                controlObj.multidropdownlistid('search_f_sbzt_tbl_ld_pllhyl_modallist', that._pr_searchcontent.type2.f_sbztid);


                that._pr_searchcontent.type2.f_sbbz = '';
                controlObj.text('search_f_sbbz_tbl_ld_pllhyl_modallist', that._pr_searchcontent.type2.f_sbbz);


                that._pr_searchcontent.type2.f_yhbh = '';
                controlObj.text('search_f_yhbh_tbl_ld_pllhyl_modallist', that._pr_searchcontent.type2.f_yhbh);


                that._pr_searchcontent.type2.f_jyhh = '';
                controlObj.text('search_f_jyhh_tbl_ld_pllhyl_modallist', that._pr_searchcontent.type2.f_jyhh);


                that._pr_searchcontent.type2.f_yhm = '';
                controlObj.text('search_f_yhm_tbl_ld_pllhyl_modallist', that._pr_searchcontent.type2.f_yhm);


                that._pr_searchcontent.type2.f_jfm = '';
                controlObj.text('search_f_jfm_tbl_ld_pllhyl_modallist', that._pr_searchcontent.type2.f_jfm);


                that._pr_searchcontent.type2.f_dh = '';
                controlObj.text('search_f_dh_tbl_ld_pllhyl_modallist', that._pr_searchcontent.type2.f_dh);


                that._pr_searchcontent.type2.f_yhfzid = '';
                controlObj.multidropdownlistid('search_f_yhfz_tbl_ld_pllhyl_modallist', that._pr_searchcontent.type2.f_yhfzid);


                that._pr_searchcontent.type2.f_dz = '';
                controlObj.text('search_f_dz_tbl_ld_pllhyl_modallist', that._pr_searchcontent.type2.f_dz);


                that._pr_searchcontent.type2.f_dyid = '';
                controlObj.singledropdownlistid('search_f_dy_tbl_ld_pllhyl_modallist', that._pr_searchcontent.type2.f_dyid);


                that._pr_searchcontent.type2.f_scid = '';
                controlObj.singledropdownlistid('search_f_sc_tbl_ld_pllhyl_modallist', that._pr_searchcontent.type2.f_scid);


                that._pr_searchcontent.type2.f_qyid = '';
                controlObj.singledropdownlistid('search_f_qy_tbl_ld_pllhyl_modallist', that._pr_searchcontent.type2.f_qyid);


                that._pr_searchcontent.type2.f_pqid = '';
                controlObj.singledropdownlistid('search_f_pq_tbl_ld_pllhyl_modallist', that._pr_searchcontent.type2.f_pqid);


                that._pr_searchcontent.type2.f_khrqfrom = ('1900-01-01 00:00:00');
                that._pr_searchcontent.type2.f_khrqto = ('1900-01-01 00:00:00');
                controlObj.datetime('search_f_khrq_tbl_ld_pllhyl_modallist_datefrom', 'search_f_khrq_tbl_ld_pllhyl_modallist_timefrom', that._pr_searchcontent.type2.f_khrqfrom);
                controlObj.datetime('search_f_khrq_tbl_ld_pllhyl_modallist_dateto', 'search_f_khrq_tbl_ld_pllhyl_modallist_timeto', that._pr_searchcontent.type2.f_khrqto);


                that._pr_searchcontent.type2.f_sftsid = '';
                controlObj.multidropdownlistid('search_f_sfts_tbl_ld_pllhyl_modallist', that._pr_searchcontent.type2.f_sftsid);


                that._pr_searchcontent.type2.f_tsyxzh = '';
                controlObj.text('search_f_tsyxzh_tbl_ld_pllhyl_modallist', that._pr_searchcontent.type2.f_tsyxzh);


                that._pr_searchcontent.type2.f_htbh = '';
                controlObj.text('search_f_htbh_tbl_ld_pllhyl_modallist', that._pr_searchcontent.type2.f_htbh);


                that._pr_searchcontent.type2.f_sfzh = '';
                controlObj.text('search_f_sfzh_tbl_ld_pllhyl_modallist', that._pr_searchcontent.type2.f_sfzh);


                that._pr_searchcontent.type2.f_htqdrqfrom = ('1900-01-01 00:00:00');
                that._pr_searchcontent.type2.f_htqdrqto = ('1900-01-01 00:00:00');
                controlObj.datetime('search_f_htqdrq_tbl_ld_pllhyl_modallist_datefrom', 'search_f_htqdrq_tbl_ld_pllhyl_modallist_timefrom', that._pr_searchcontent.type2.f_htqdrqfrom);
                controlObj.datetime('search_f_htqdrq_tbl_ld_pllhyl_modallist_dateto', 'search_f_htqdrq_tbl_ld_pllhyl_modallist_timeto', that._pr_searchcontent.type2.f_htqdrqto);


                that._pr_searchcontent.type2.f_tsyxid = '';
                controlObj.multidropdownlistid('search_f_tsyx_tbl_ld_pllhyl_modallist', that._pr_searchcontent.type2.f_tsyxid);


                that._pr_searchcontent.type2.f_sfzzsid = '';
                controlObj.multidropdownlistid('search_f_sfzzs_tbl_ld_pllhyl_modallist', that._pr_searchcontent.type2.f_sfzzsid);


                that._pr_searchcontent.type2.f_yhztid = '';
                controlObj.multidropdownlistid('search_f_yhzt_tbl_ld_pllhyl_modallist', that._pr_searchcontent.type2.f_yhztid);


                that._pr_searchcontent.type2.f_yhbz = '';
                controlObj.text('search_f_yhbz_tbl_ld_pllhyl_modallist', that._pr_searchcontent.type2.f_yhbz);


                that._pr_searchcontent.type2.f_yzqk = '';
                controlObj.multidropdownlistid('search_f_yzqk_tbl_ld_pllhyl_modallist', that._pr_searchcontent.type2.f_yzqk);



                break;
            case "2":
                if (that._pr_searchcontent.type1 == undefined)
                {
                    that._pr_searchcontent.type1 = '';
                }

                $("#txt_command_search_tbl_ld_pllhyl_modallist").val('');
                break;
        }

    },

    //---------------------------------------------------------------------------------
    // ---------------------------------Grid------------------------------------
    //---------------------------------------------------------------------------------
    /* 
    *  
    *  方法:creatWhereClause
    *  参数:callBackFunction
    *  根据_pr_searchcontent创建_whereClauseString
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

                                    whereClause += " f_ztkhh like '%" + vv[i] + "%' or ";

                                    whereClause += " f_khfz like '%" + vv[i] + "%' or ";

                                    whereClause += " f_yslx like '%" + vv[i] + "%' or ";

                                    whereClause += " f_ycje like '%" + vv[i] + "%' or ";

                                    whereClause += " f_djjzsf like '%" + vv[i] + "%' or ";

                                    whereClause += " f_djjzpwf like '%" + vv[i] + "%' or ";

                                    whereClause += " f_ljqf like '%" + vv[i] + "%' or ";

                                    whereClause += " f_tbbh like '%" + vv[i] + "%' or ";

                                    whereClause += " f_sfjlbjf like '%" + vv[i] + "%' or ";

                                    whereClause += " f_ickljgl like '%" + vv[i] + "%' or ";


                                    whereClause += " to_char(f_zhcbrq,'yyyy-MM-dd hh24:mi:ss') like '%" + vv[i] + "%' or ";

                                    whereClause += " f_khzt like '%" + vv[i] + "%' or ";

                                    whereClause += " f_sqysl like '%" + vv[i] + "%' or ";

                                    whereClause += " f_jhysl like '%" + vv[i] + "%' or ";

                                    whereClause += " f_khbz like '%" + vv[i] + "%' or ";

                                    whereClause += " f_cbbh like '%" + vv[i] + "%' or ";

                                    whereClause += " f_cbmc like '%" + vv[i] + "%' or ";

                                    whereClause += " f_cbyxm like '%" + vv[i] + "%' or ";

                                    whereClause += " f_cbxh like '%" + vv[i] + "%' or ";

                                    whereClause += " f_cbzq like '%" + vv[i] + "%' or ";

                                    whereClause += " f_sbbh like '%" + vv[i] + "%' or ";

                                    whereClause += " f_ztsbh like '%" + vv[i] + "%' or ";

                                    whereClause += " f_lxth like '%" + vv[i] + "%' or ";

                                    whereClause += " f_sbfz like '%" + vv[i] + "%' or ";

                                    whereClause += " f_sbpp like '%" + vv[i] + "%' or ";

                                    whereClause += " f_mph like '%" + vv[i] + "%' or ";

                                    whereClause += " f_sbdz like '%" + vv[i] + "%' or ";

                                    whereClause += " f_rs like '%" + vv[i] + "%' or ";

                                    whereClause += " f_sbkj like '%" + vv[i] + "%' or ";

                                    whereClause += " f_sblx like '%" + vv[i] + "%' or ";

                                    whereClause += " f_jllx like '%" + vv[i] + "%' or ";

                                    whereClause += " f_cszm like '%" + vv[i] + "%' or ";

                                    whereClause += " f_bqzm like '%" + vv[i] + "%' or ";

                                    whereClause += " f_sqzm like '%" + vv[i] + "%' or ";

                                    whereClause += " f_sqsl like '%" + vv[i] + "%' or ";

                                    whereClause += " f_ljgl like '%" + vv[i] + "%' or ";

                                    whereClause += " f_bqsl like '%" + vv[i] + "%' or ";

                                    whereClause += " f_qsqpjsl like '%" + vv[i] + "%' or ";

                                    whereClause += " f_qlqpjsl like '%" + vv[i] + "%' or ";

                                    whereClause += " f_nljgl like '%" + vv[i] + "%' or ";


                                    whereClause += " to_char(f_azrq,'yyyy-MM-dd hh24:mi:ss') like '%" + vv[i] + "%' or ";

                                    whereClause += " f_synx like '%" + vv[i] + "%' or ";

                                    whereClause += " f_qfzt like '%" + vv[i] + "%' or ";

                                    whereClause += " f_sbzt like '%" + vv[i] + "%' or ";

                                    whereClause += " f_sbbz like '%" + vv[i] + "%' or ";

                                    whereClause += " f_yhbh like '%" + vv[i] + "%' or ";

                                    whereClause += " f_jyhh like '%" + vv[i] + "%' or ";

                                    whereClause += " f_yhm like '%" + vv[i] + "%' or ";

                                    whereClause += " f_jfm like '%" + vv[i] + "%' or ";

                                    whereClause += " f_dh like '%" + vv[i] + "%' or ";

                                    whereClause += " f_yhfz like '%" + vv[i] + "%' or ";

                                    whereClause += " f_dz like '%" + vv[i] + "%' or ";

                                    whereClause += " f_dy like '%" + vv[i] + "%' or ";

                                    whereClause += " f_sc like '%" + vv[i] + "%' or ";

                                    whereClause += " f_qy like '%" + vv[i] + "%' or ";

                                    whereClause += " f_pq like '%" + vv[i] + "%' or ";


                                    whereClause += " to_char(f_khrq,'yyyy-MM-dd hh24:mi:ss') like '%" + vv[i] + "%' or ";

                                    whereClause += " f_sfts like '%" + vv[i] + "%' or ";

                                    whereClause += " f_tsyxzh like '%" + vv[i] + "%' or ";

                                    whereClause += " f_htbh like '%" + vv[i] + "%' or ";

                                    whereClause += " f_sfzh like '%" + vv[i] + "%' or ";


                                    whereClause += " to_char(f_htqdrq,'yyyy-MM-dd hh24:mi:ss') like '%" + vv[i] + "%' or ";

                                    whereClause += " f_tsyx like '%" + vv[i] + "%' or ";

                                    whereClause += " f_sfzzs like '%" + vv[i] + "%' or ";

                                    whereClause += " f_yhzt like '%" + vv[i] + "%' or ";

                                    whereClause += " f_yhbz like '%" + vv[i] + "%' or ";

                                    whereClause += " f_yzqk like '%" + vv[i] + "%' or ";

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

                        var tbl_ld_pllhyl_modallist = that._pr_searchcontent.type2;



                        if (tbl_ld_pllhyl_modallist.f_khbh.length > 0)
                        {
                            whereClause += " f_khbh like '%" + tbl_ld_pllhyl_modallist.f_khbh + "%' and ";
                        }


                        if (tbl_ld_pllhyl_modallist.f_ztkhh.length > 0)
                        {
                            whereClause += " f_ztkhh like '%" + tbl_ld_pllhyl_modallist.f_ztkhh + "%' and ";
                        }


                        if (tbl_ld_pllhyl_modallist.f_khfzid.length > 0)
                        {
                            var elementArray = tbl_ld_pllhyl_modallist.f_khfzid.split(',');
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
                                whereClause += "((','||f_khfzid||',') like ('%,'||'" + elementArray[i] + "'||',%')) ";

                            });
                            whereClause += ') and ';
                        }


                        if (tbl_ld_pllhyl_modallist.f_yslxid.length > 0)
                        {
                            var elementArray = tbl_ld_pllhyl_modallist.f_yslxid.split(',');
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
                                whereClause += "((','||f_yslxid||',') like ('%,'||'" + elementArray[i] + "'||',%')) ";

                            });
                            whereClause += ') and ';
                        }


                        if (tbl_ld_pllhyl_modallist.f_ycje.length > 0)
                        {
                            whereClause += " f_ycje like '%" + tbl_ld_pllhyl_modallist.f_ycje + "%' and ";
                        }


                        if (tbl_ld_pllhyl_modallist.f_djjzsf.length > 0)
                        {
                            whereClause += " f_djjzsf like '%" + tbl_ld_pllhyl_modallist.f_djjzsf + "%' and ";
                        }


                        if (tbl_ld_pllhyl_modallist.f_djjzpwf.length > 0)
                        {
                            whereClause += " f_djjzpwf like '%" + tbl_ld_pllhyl_modallist.f_djjzpwf + "%' and ";
                        }


                        if (tbl_ld_pllhyl_modallist.f_ljqf.length > 0)
                        {
                            whereClause += " f_ljqf like '%" + tbl_ld_pllhyl_modallist.f_ljqf + "%' and ";
                        }


                        if (tbl_ld_pllhyl_modallist.f_tbbh.length > 0)
                        {
                            whereClause += " f_tbbh like '%" + tbl_ld_pllhyl_modallist.f_tbbh + "%' and ";
                        }


                        if (tbl_ld_pllhyl_modallist.f_sfjlbjfid.length > 0)
                        {
                            var elementArray = tbl_ld_pllhyl_modallist.f_sfjlbjfid.split(',');
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
                                whereClause += "((','||f_sfjlbjfid||',') like ('%,'||'" + elementArray[i] + "'||',%')) ";

                            });
                            whereClause += ') and ';
                        }


                        if (tbl_ld_pllhyl_modallist.f_ickljgl.length > 0)
                        {
                            whereClause += " f_ickljgl like '%" + tbl_ld_pllhyl_modallist.f_ickljgl + "%' and ";
                        }


                        if (tbl_ld_pllhyl_modallist.f_zhcbrqfrom != '1900-01-01 00:00:00')
                        {
                            whereClause += " f_zhcbrq >= to_date('" + tbl_ld_pllhyl_modallist.f_zhcbrqfrom + "','yyyy-MM-dd hh24:mi:ss') and ";
                        }

                        if (tbl_ld_pllhyl_modallist.f_zhcbrqto != '1900-01-01 00:00:00')
                        {
                            whereClause += " f_zhcbrq <= to_date('" + tbl_ld_pllhyl_modallist.f_zhcbrqto + "','yyyy-MM-dd hh24:mi:ss') and ";
                        }


                        if (tbl_ld_pllhyl_modallist.f_khztid.length > 0)
                        {
                            var elementArray = tbl_ld_pllhyl_modallist.f_khztid.split(',');
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
                                whereClause += "((','||f_khztid||',') like ('%,'||'" + elementArray[i] + "'||',%')) ";

                            });
                            whereClause += ') and ';
                        }


                        if (tbl_ld_pllhyl_modallist.f_sqysl.length > 0)
                        {
                            whereClause += " f_sqysl like '%" + tbl_ld_pllhyl_modallist.f_sqysl + "%' and ";
                        }


                        if (tbl_ld_pllhyl_modallist.f_jhysl.length > 0)
                        {
                            whereClause += " f_jhysl like '%" + tbl_ld_pllhyl_modallist.f_jhysl + "%' and ";
                        }


                        if (tbl_ld_pllhyl_modallist.f_khbz.length > 0)
                        {
                            whereClause += " f_khbz like '%" + tbl_ld_pllhyl_modallist.f_khbz + "%' and ";
                        }


                        if (tbl_ld_pllhyl_modallist.f_cbbhid.length > 0)
                        {
                            var elementArray = tbl_ld_pllhyl_modallist.f_cbbhid.split(',');
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
                                whereClause += "((','||f_cbbhid||',') like ('%,'||'" + elementArray[i] + "'||',%')) ";

                            });
                            whereClause += ') and ';
                        }


                        if (tbl_ld_pllhyl_modallist.f_cbmc.length > 0)
                        {
                            whereClause += " f_cbmc like '%" + tbl_ld_pllhyl_modallist.f_cbmc + "%' and ";
                        }


                        if (tbl_ld_pllhyl_modallist.f_cbyxmid.length > 0)
                        {
                            var elementArray = tbl_ld_pllhyl_modallist.f_cbyxmid.split(',');
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
                                whereClause += "((','||f_cbyxmid||',') like ('%,'||'" + elementArray[i] + "'||',%')) ";

                            });
                            whereClause += ') and ';
                        }


                        if (tbl_ld_pllhyl_modallist.f_cbxh.length > 0)
                        {
                            whereClause += " f_cbxh like '%" + tbl_ld_pllhyl_modallist.f_cbxh + "%' and ";
                        }


                        if (tbl_ld_pllhyl_modallist.f_cbzq.length > 0)
                        {
                            whereClause += " f_cbzq like '%" + tbl_ld_pllhyl_modallist.f_cbzq + "%' and ";
                        }


                        if (tbl_ld_pllhyl_modallist.f_sbbh.length > 0)
                        {
                            whereClause += " f_sbbh like '%" + tbl_ld_pllhyl_modallist.f_sbbh + "%' and ";
                        }


                        if (tbl_ld_pllhyl_modallist.f_ztsbh.length > 0)
                        {
                            whereClause += " f_ztsbh like '%" + tbl_ld_pllhyl_modallist.f_ztsbh + "%' and ";
                        }


                        if (tbl_ld_pllhyl_modallist.f_lxth.length > 0)
                        {
                            whereClause += " f_lxth like '%" + tbl_ld_pllhyl_modallist.f_lxth + "%' and ";
                        }


                        if (tbl_ld_pllhyl_modallist.f_sbfzid.length > 0)
                        {
                            var elementArray = tbl_ld_pllhyl_modallist.f_sbfzid.split(',');
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
                                whereClause += "((','||f_sbfzid||',') like ('%,'||'" + elementArray[i] + "'||',%')) ";

                            });
                            whereClause += ') and ';
                        }


                        if (tbl_ld_pllhyl_modallist.f_sbpp.length > 0)
                        {
                            whereClause += " f_sbpp like '%" + tbl_ld_pllhyl_modallist.f_sbpp + "%' and ";
                        }


                        if (tbl_ld_pllhyl_modallist.f_mph.length > 0)
                        {
                            whereClause += " f_mph like '%" + tbl_ld_pllhyl_modallist.f_mph + "%' and ";
                        }


                        if (tbl_ld_pllhyl_modallist.f_sbdz.length > 0)
                        {
                            whereClause += " f_sbdz like '%" + tbl_ld_pllhyl_modallist.f_sbdz + "%' and ";
                        }


                        if (tbl_ld_pllhyl_modallist.f_rs.length > 0)
                        {
                            whereClause += " f_rs like '%" + tbl_ld_pllhyl_modallist.f_rs + "%' and ";
                        }


                        if (tbl_ld_pllhyl_modallist.f_sbkjid.length > 0)
                        {
                            var elementArray = tbl_ld_pllhyl_modallist.f_sbkjid.split(',');
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
                                whereClause += "((','||f_sbkjid||',') like ('%,'||'" + elementArray[i] + "'||',%')) ";

                            });
                            whereClause += ') and ';
                        }


                        if (tbl_ld_pllhyl_modallist.f_sblxid.length > 0)
                        {
                            var elementArray = tbl_ld_pllhyl_modallist.f_sblxid.split(',');
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
                                whereClause += "((','||f_sblxid||',') like ('%,'||'" + elementArray[i] + "'||',%')) ";

                            });
                            whereClause += ') and ';
                        }


                        if (tbl_ld_pllhyl_modallist.f_jllxid.length > 0)
                        {
                            var elementArray = tbl_ld_pllhyl_modallist.f_jllxid.split(',');
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
                                whereClause += "((','||f_jllxid||',') like ('%,'||'" + elementArray[i] + "'||',%')) ";

                            });
                            whereClause += ') and ';
                        }


                        if (tbl_ld_pllhyl_modallist.f_cszm.length > 0)
                        {
                            whereClause += " f_cszm like '%" + tbl_ld_pllhyl_modallist.f_cszm + "%' and ";
                        }


                        if (tbl_ld_pllhyl_modallist.f_bqzm.length > 0)
                        {
                            whereClause += " f_bqzm like '%" + tbl_ld_pllhyl_modallist.f_bqzm + "%' and ";
                        }


                        if (tbl_ld_pllhyl_modallist.f_sqzm.length > 0)
                        {
                            whereClause += " f_sqzm like '%" + tbl_ld_pllhyl_modallist.f_sqzm + "%' and ";
                        }


                        if (tbl_ld_pllhyl_modallist.f_sqsl.length > 0)
                        {
                            whereClause += " f_sqsl like '%" + tbl_ld_pllhyl_modallist.f_sqsl + "%' and ";
                        }


                        if (tbl_ld_pllhyl_modallist.f_ljgl.length > 0)
                        {
                            whereClause += " f_ljgl like '%" + tbl_ld_pllhyl_modallist.f_ljgl + "%' and ";
                        }


                        if (tbl_ld_pllhyl_modallist.f_bqsl.length > 0)
                        {
                            whereClause += " f_bqsl like '%" + tbl_ld_pllhyl_modallist.f_bqsl + "%' and ";
                        }


                        if (tbl_ld_pllhyl_modallist.f_qsqpjsl.length > 0)
                        {
                            whereClause += " f_qsqpjsl like '%" + tbl_ld_pllhyl_modallist.f_qsqpjsl + "%' and ";
                        }


                        if (tbl_ld_pllhyl_modallist.f_qlqpjsl.length > 0)
                        {
                            whereClause += " f_qlqpjsl like '%" + tbl_ld_pllhyl_modallist.f_qlqpjsl + "%' and ";
                        }


                        if (tbl_ld_pllhyl_modallist.f_nljgl.length > 0)
                        {
                            whereClause += " f_nljgl like '%" + tbl_ld_pllhyl_modallist.f_nljgl + "%' and ";
                        }


                        if (tbl_ld_pllhyl_modallist.f_azrqfrom != '1900-01-01 00:00:00')
                        {
                            whereClause += " f_azrq >= to_date('" + tbl_ld_pllhyl_modallist.f_azrqfrom + "','yyyy-MM-dd hh24:mi:ss') and ";
                        }

                        if (tbl_ld_pllhyl_modallist.f_azrqto != '1900-01-01 00:00:00')
                        {
                            whereClause += " f_azrq <= to_date('" + tbl_ld_pllhyl_modallist.f_azrqto + "','yyyy-MM-dd hh24:mi:ss') and ";
                        }


                        if (tbl_ld_pllhyl_modallist.f_synx.length > 0)
                        {
                            whereClause += " f_synx like '%" + tbl_ld_pllhyl_modallist.f_synx + "%' and ";
                        }


                        if (tbl_ld_pllhyl_modallist.f_qfztid.length > 0)
                        {
                            var elementArray = tbl_ld_pllhyl_modallist.f_qfztid.split(',');
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
                                whereClause += "((','||f_qfztid||',') like ('%,'||'" + elementArray[i] + "'||',%')) ";

                            });
                            whereClause += ') and ';
                        }


                        if (tbl_ld_pllhyl_modallist.f_sbztid.length > 0)
                        {
                            var elementArray = tbl_ld_pllhyl_modallist.f_sbztid.split(',');
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
                                whereClause += "((','||f_sbztid||',') like ('%,'||'" + elementArray[i] + "'||',%')) ";

                            });
                            whereClause += ') and ';
                        }


                        if (tbl_ld_pllhyl_modallist.f_sbbz.length > 0)
                        {
                            whereClause += " f_sbbz like '%" + tbl_ld_pllhyl_modallist.f_sbbz + "%' and ";
                        }


                        if (tbl_ld_pllhyl_modallist.f_yhbh.length > 0)
                        {
                            whereClause += " f_yhbh like '%" + tbl_ld_pllhyl_modallist.f_yhbh + "%' and ";
                        }


                        if (tbl_ld_pllhyl_modallist.f_jyhh.length > 0)
                        {
                            whereClause += " f_jyhh like '%" + tbl_ld_pllhyl_modallist.f_jyhh + "%' and ";
                        }


                        if (tbl_ld_pllhyl_modallist.f_yhm.length > 0)
                        {
                            whereClause += " f_yhm like '%" + tbl_ld_pllhyl_modallist.f_yhm + "%' and ";
                        }


                        if (tbl_ld_pllhyl_modallist.f_jfm.length > 0)
                        {
                            whereClause += " f_jfm like '%" + tbl_ld_pllhyl_modallist.f_jfm + "%' and ";
                        }


                        if (tbl_ld_pllhyl_modallist.f_dh.length > 0)
                        {
                            whereClause += " f_dh like '%" + tbl_ld_pllhyl_modallist.f_dh + "%' and ";
                        }


                        if (tbl_ld_pllhyl_modallist.f_yhfzid.length > 0)
                        {
                            var elementArray = tbl_ld_pllhyl_modallist.f_yhfzid.split(',');
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
                                whereClause += "((','||f_yhfzid||',') like ('%,'||'" + elementArray[i] + "'||',%')) ";

                            });
                            whereClause += ') and ';
                        }


                        if (tbl_ld_pllhyl_modallist.f_dz.length > 0)
                        {
                            whereClause += " f_dz like '%" + tbl_ld_pllhyl_modallist.f_dz + "%' and ";
                        }


                        if (tbl_ld_pllhyl_modallist.f_dyid.length > 0)
                        {
                            var elementArray = tbl_ld_pllhyl_modallist.f_dyid.split(',');
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
                                whereClause += "((','||f_dyid||',') like ('%,'||'" + elementArray[i] + "'||',%')) ";

                            });
                            whereClause += ') and ';
                        }


                        if (tbl_ld_pllhyl_modallist.f_scid.length > 0)
                        {
                            var elementArray = tbl_ld_pllhyl_modallist.f_scid.split(',');
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
                                whereClause += "((','||f_scid||',') like ('%,'||'" + elementArray[i] + "'||',%')) ";

                            });
                            whereClause += ') and ';
                        }


                        if (tbl_ld_pllhyl_modallist.f_qyid.length > 0)
                        {
                            var elementArray = tbl_ld_pllhyl_modallist.f_qyid.split(',');
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
                                whereClause += "((','||f_qyid||',') like ('%,'||'" + elementArray[i] + "'||',%')) ";

                            });
                            whereClause += ') and ';
                        }


                        if (tbl_ld_pllhyl_modallist.f_pqid.length > 0)
                        {
                            var elementArray = tbl_ld_pllhyl_modallist.f_pqid.split(',');
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
                                whereClause += "((','||f_pqid||',') like ('%,'||'" + elementArray[i] + "'||',%')) ";

                            });
                            whereClause += ') and ';
                        }


                        if (tbl_ld_pllhyl_modallist.f_khrqfrom != '1900-01-01 00:00:00')
                        {
                            whereClause += " f_khrq >= to_date('" + tbl_ld_pllhyl_modallist.f_khrqfrom + "','yyyy-MM-dd hh24:mi:ss') and ";
                        }

                        if (tbl_ld_pllhyl_modallist.f_khrqto != '1900-01-01 00:00:00')
                        {
                            whereClause += " f_khrq <= to_date('" + tbl_ld_pllhyl_modallist.f_khrqto + "','yyyy-MM-dd hh24:mi:ss') and ";
                        }


                        if (tbl_ld_pllhyl_modallist.f_sftsid.length > 0)
                        {
                            var elementArray = tbl_ld_pllhyl_modallist.f_sftsid.split(',');
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
                                whereClause += "((','||f_sftsid||',') like ('%,'||'" + elementArray[i] + "'||',%')) ";

                            });
                            whereClause += ') and ';
                        }


                        if (tbl_ld_pllhyl_modallist.f_tsyxzh.length > 0)
                        {
                            whereClause += " f_tsyxzh like '%" + tbl_ld_pllhyl_modallist.f_tsyxzh + "%' and ";
                        }


                        if (tbl_ld_pllhyl_modallist.f_htbh.length > 0)
                        {
                            whereClause += " f_htbh like '%" + tbl_ld_pllhyl_modallist.f_htbh + "%' and ";
                        }


                        if (tbl_ld_pllhyl_modallist.f_sfzh.length > 0)
                        {
                            whereClause += " f_sfzh like '%" + tbl_ld_pllhyl_modallist.f_sfzh + "%' and ";
                        }


                        if (tbl_ld_pllhyl_modallist.f_htqdrqfrom != '1900-01-01 00:00:00')
                        {
                            whereClause += " f_htqdrq >= to_date('" + tbl_ld_pllhyl_modallist.f_htqdrqfrom + "','yyyy-MM-dd hh24:mi:ss') and ";
                        }

                        if (tbl_ld_pllhyl_modallist.f_htqdrqto != '1900-01-01 00:00:00')
                        {
                            whereClause += " f_htqdrq <= to_date('" + tbl_ld_pllhyl_modallist.f_htqdrqto + "','yyyy-MM-dd hh24:mi:ss') and ";
                        }


                        if (tbl_ld_pllhyl_modallist.f_tsyxid.length > 0)
                        {
                            var elementArray = tbl_ld_pllhyl_modallist.f_tsyxid.split(',');
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
                                whereClause += "((','||f_tsyxid||',') like ('%,'||'" + elementArray[i] + "'||',%')) ";

                            });
                            whereClause += ') and ';
                        }


                        if (tbl_ld_pllhyl_modallist.f_sfzzsid.length > 0)
                        {
                            var elementArray = tbl_ld_pllhyl_modallist.f_sfzzsid.split(',');
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
                                whereClause += "((','||f_sfzzsid||',') like ('%,'||'" + elementArray[i] + "'||',%')) ";

                            });
                            whereClause += ') and ';
                        }


                        if (tbl_ld_pllhyl_modallist.f_yhztid.length > 0)
                        {
                            var elementArray = tbl_ld_pllhyl_modallist.f_yhztid.split(',');
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
                                whereClause += "((','||f_yhztid||',') like ('%,'||'" + elementArray[i] + "'||',%')) ";

                            });
                            whereClause += ') and ';
                        }


                        if (tbl_ld_pllhyl_modallist.f_yhbz.length > 0)
                        {
                            whereClause += " f_yhbz like '%" + tbl_ld_pllhyl_modallist.f_yhbz + "%' and ";
                        }


                        if (tbl_ld_pllhyl_modallist.f_yzqk.length > 0)
                        {
                            var elementArray = tbl_ld_pllhyl_modallist.f_yzqk.split(',');
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
                                whereClause += "((','||f_yzqk||',') like ('%,'||'" + elementArray[i] + "'||',%')) ";

                            });
                            whereClause += ') and ';
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
            $('#btn_command_clearselect_tbl_ld_pllhyl_modallist').addClass('hidden');

        }
        else
        {
            $('#btn_command_clearselect_tbl_ld_pllhyl_modallist').removeClass('hidden');
            var allcount = that._pr_gridselectids.split('^').length;
            var currentcount = $('#table_grid_tbl_ld_pllhyl_modallist').bootstrapTable('getSelections').length;
            $('#btn_command_clearselect_tbl_ld_pllhyl_modallist .cc-badge-p').html(currentcount + '/' + allcount);
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
            var gridHeight = 600;

            $('#table_grid_tbl_ld_pllhyl_modallist').bootstrapTable({
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
                        switch (that._pr_listtype)
                        {
                            case "1":

                                if (('^' + that._pr_gridselectids + '^').indexOf('^' + row.sys_id + '^') > -1)
                                {
                                    return {
                                        disabled: false,
                                        checked: true
                                    }
                                }
                                return value;
                                break;
                            case "2":
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
                                break;
                        }
                    }
                },
                {
                    field: 'sys_id', title: 'sys_id', "class": 'gridcell-ordercolumn hidden',
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
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        return resultStr;
                    }
                },


                {
                    field: 'f_value2',
                    title: '备用字段2',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        return resultStr;
                    }
                },


                {
                    field: 'f_value3',
                    title: '备用字段3',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        return resultStr;
                    }
                },


                {
                    field: 'f_value4',
                    title: '备用字段4',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        return resultStr;
                    }
                },


                {
                    field: 'f_value5',
                    title: '备用字段5',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        return resultStr;
                    }
                },


                {
                    field: 'f_value6',
                    title: '备用字段6',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        return resultStr;
                    }
                },


                {
                    field: 'f_value7',
                    title: '备用字段7',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        return resultStr;
                    }
                },


                {
                    field: 'f_value8',
                    title: '备用字段8',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        return resultStr;
                    }
                },


                {
                    field: 'f_value9',
                    title: '备用字段9',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        return resultStr;
                    }
                },


                {
                    field: 'f_value10',
                    title: '备用字段10',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        return resultStr;
                    }
                },


                {
                    field: 'f_khbh',
                    title: '客户编号',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        if (resultStr.length > 10)
                        {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },


                {
                    field: 'f_ztkhh',
                    title: '旧客户号',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        if (resultStr.length > 10)
                        {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },


                {
                    field: 'f_khfz',
                    title: '客户分组',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        if (resultStr.length > 10)
                        {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },


                {
                    field: 'f_khfzid',
                    title: '客户分组id',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        return resultStr;
                    }
                },


                {
                    field: 'f_yslx',
                    title: '用水类型',
                    "class": '',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        if (resultStr.length > 10)
                        {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },


                {
                    field: 'f_yslxid',
                    title: '用水类型id',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        return resultStr;
                    }
                },


                {
                    field: 'f_ycje',
                    title: '绿化表押金',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        if (resultStr.length > 10)
                        {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },


                {
                    field: 'f_djjzsf',
                    title: '调价结转水费',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        if (resultStr.length > 10)
                        {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },


                {
                    field: 'f_djjzpwf',
                    title: '调价结转排污费',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        if (resultStr.length > 10)
                        {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },


                {
                    field: 'f_ljqf',
                    title: '累积欠费',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        if (resultStr.length > 10)
                        {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },


                {
                    field: 'f_tbbh',
                    title: '套表编号',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        if (resultStr.length > 10)
                        {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },


                {
                    field: 'f_sfjlbjf',
                    title: '是否计量不计费',
                    "class": 'hidden',
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

                        if (resultStr.length > 10)
                        {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },


                {
                    field: 'f_ickljgl',
                    title: 'IC卡累积购量',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        if (resultStr.length > 10)
                        {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },

                {
                    field: 'f_zhcbrq',
                    title: '最后抄表日期',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        if (value == "")
                        {
                            value = "1900-01-01 00:00:00";
                        }
                        var resultStr = value.toDateTime().Format("yyyy-MM-dd");
                        if (resultStr == '1900-01-01')
                        {
                            resultStr = "&nbsp;&nbsp;";
                        }



                        return resultStr;

                    }
                },


                {
                    field: 'f_khzt',
                    title: '客户状态',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        if (resultStr.length > 10)
                        {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },


                {
                    field: 'f_khztid',
                    title: '客户状态id',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        return resultStr;
                    }
                },


                {
                    field: 'f_sqysl',
                    title: '申请用水量',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        if (resultStr.length > 10)
                        {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },


                {
                    field: 'f_jhysl',
                    title: '计划用水量',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        if (resultStr.length > 10)
                        {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },


                {
                    field: 'f_khbz',
                    title: '客户备注',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        if (resultStr.length > 10)
                        {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },


                {
                    field: 'f_cbbh',
                    title: '抄本编号',
                    "class": '',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        if (resultStr.length > 10)
                        {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },


                {
                    field: 'f_cbbhid',
                    title: '抄本编号id',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        return resultStr;
                    }
                },


                {
                    field: 'f_cbmc',
                    title: '抄本名称',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        if (resultStr.length > 10)
                        {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },


                {
                    field: 'f_cbyxm',
                    title: '抄表员姓名',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        if (resultStr.length > 10)
                        {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },


                {
                    field: 'f_cbyxmid',
                    title: '抄表员姓名id',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        return resultStr;
                    }
                },


                {
                    field: 'f_cbxh',
                    title: '抄本序号',
                    "class": '',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        if (resultStr.length > 10)
                        {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },


                {
                    field: 'f_cbzq',
                    title: '抄表周期',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        if (resultStr.length > 10)
                        {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },


                {
                    field: 'f_sbbh',
                    title: '水表编号',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        if (resultStr.length > 10)
                        {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },


                {
                    field: 'f_ztsbh',
                    title: '旧水表号',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        if (resultStr.length > 10)
                        {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },


                {
                    field: 'f_lxth',
                    title: '老系统号',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        if (resultStr.length > 10)
                        {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },


                {
                    field: 'f_sbfz',
                    title: '水表分组',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        if (resultStr.length > 10)
                        {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },


                {
                    field: 'f_sbfzid',
                    title: '水表分组id',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        return resultStr;
                    }
                },


                {
                    field: 'f_sbpp',
                    title: '水表品牌',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        if (resultStr.length > 10)
                        {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },


                {
                    field: 'f_mph',
                    title: '铭牌号',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        if (resultStr.length > 10)
                        {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },


                {
                    field: 'f_sbdz',
                    title: '水表地址',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        if (resultStr.length > 10)
                        {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },


                {
                    field: 'f_rs',
                    title: '人数',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        if (resultStr.length > 10)
                        {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },


                {
                    field: 'f_sbkj',
                    title: '水表口径',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        if (resultStr.length > 10)
                        {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },


                {
                    field: 'f_sbkjid',
                    title: '水表口径id',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        return resultStr;
                    }
                },


                {
                    field: 'f_sblx',
                    title: '水表类型',
                    "class": '',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        if (resultStr.length > 10)
                        {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },


                {
                    field: 'f_sblxid',
                    title: '水表类型id',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        return resultStr;
                    }
                },


                {
                    field: 'f_jllx',
                    title: '计量类型',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        if (resultStr.length > 10)
                        {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },


                {
                    field: 'f_jllxid',
                    title: '计量类型id',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        return resultStr;
                    }
                },


                {
                    field: 'f_cszm',
                    title: '初始止码',
                    "class": '',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        if (resultStr.length > 10)
                        {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },


                {
                    field: 'f_bqzm',
                    title: '本期止码',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        if (resultStr.length > 10)
                        {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },


                {
                    field: 'f_sqzm',
                    title: '上期止码',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        if (resultStr.length > 10)
                        {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },


                {
                    field: 'f_sqsl',
                    title: '上期水量',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        if (resultStr.length > 10)
                        {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },


                {
                    field: 'f_ljgl',
                    title: '累积购量',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        if (resultStr.length > 10)
                        {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },


                {
                    field: 'f_bqsl',
                    title: '本期水量',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        if (resultStr.length > 10)
                        {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },


                {
                    field: 'f_qsqpjsl',
                    title: '前三期平均水量',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        if (resultStr.length > 10)
                        {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },


                {
                    field: 'f_qlqpjsl',
                    title: '前六期平均水量',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        if (resultStr.length > 10)
                        {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },


                {
                    field: 'f_nljgl',
                    title: '年累计购量',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        if (resultStr.length > 10)
                        {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },

                {
                    field: 'f_azrq',
                    title: '安装日期',
                    "class": '',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        if (value == "")
                        {
                            value = "1900-01-01 00:00:00";
                        }
                        var resultStr = value.toDateTime().Format("yyyy-MM-dd");
                        if (resultStr == '1900-01-01')
                        {
                            resultStr = "&nbsp;&nbsp;";
                        }



                        return resultStr;

                    }
                },


                {
                    field: 'f_synx',
                    title: '使用年限',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        if (resultStr.length > 10)
                        {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },


                {
                    field: 'f_qfzt',
                    title: '铅封状态',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        if (value == "true")
                        {
                            value = '损毁';
                        }
                        else
                        {
                            value = '正常';
                        }
                        var resultStr = value;

                        if (resultStr.length > 10)
                        {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },


                {
                    field: 'f_sbzt',
                    title: '水表状态',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        if (resultStr.length > 10)
                        {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },


                {
                    field: 'f_sbztid',
                    title: '水表状态id',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        return resultStr;
                    }
                },



                {
                    field: 'f_sbbz',
                    title: '水表备注',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        if (resultStr.length > 10)
                        {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },


                {
                    field: 'f_yhbh',
                    title: '用户编号',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        if (resultStr.length > 10)
                        {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },


                {
                    field: 'f_jyhh',
                    title: '旧用户号',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        if (resultStr.length > 10)
                        {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },


                {
                    field: 'f_yhm',
                    title: '用户名',
                    "class": '',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        if (resultStr.length > 10)
                        {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },


                {
                    field: 'f_jfm',
                    title: '缴费名',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        if (resultStr.length > 10)
                        {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },


                {
                    field: 'f_dh',
                    title: '电话',
                    "class": '',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        if (resultStr.length > 10)
                        {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },


                {
                    field: 'f_yhfz',
                    title: '用户分组',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        if (resultStr.length > 10)
                        {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },


                {
                    field: 'f_yhfzid',
                    title: '用户分组id',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        return resultStr;
                    }
                },


                {
                    field: 'f_dz',
                    title: '地址',
                    "class": '',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        if (resultStr.length > 10)
                        {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },


                {
                    field: 'f_dy',
                    title: '地域',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        if (resultStr.length > 10)
                        {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },


                {
                    field: 'f_dyid',
                    title: '地域id',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        return resultStr;
                    }
                },


                {
                    field: 'f_sc',
                    title: '水厂',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        if (resultStr.length > 10)
                        {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },


                {
                    field: 'f_scid',
                    title: '水厂id',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        return resultStr;
                    }
                },


                {
                    field: 'f_qy',
                    title: '区域',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        if (resultStr.length > 10)
                        {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },


                {
                    field: 'f_qyid',
                    title: '区域id',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        return resultStr;
                    }
                },


                {
                    field: 'f_pq',
                    title: '片区',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        if (resultStr.length > 10)
                        {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },


                {
                    field: 'f_pqid',
                    title: '片区id',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        return resultStr;
                    }
                },

                {
                    field: 'f_khrq',
                    title: '开户日期',
                    "class": '',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        if (value == "")
                        {
                            value = "1900-01-01 00:00:00";
                        }
                        var resultStr = value.toDateTime().Format("yyyy-MM-dd");
                        if (resultStr == '1900-01-01')
                        {
                            resultStr = "&nbsp;&nbsp;";
                        }



                        return resultStr;

                    }
                },


                {
                    field: 'f_sfts',
                    title: '是否托收',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        if (value == "true")
                        {
                            value = '开';
                        }
                        else
                        {
                            value = '关';
                        }
                        var resultStr = value;

                        if (resultStr.length > 10)
                        {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },


                {
                    field: 'f_tsyxzh',
                    title: '托收银行账号',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        if (resultStr.length > 10)
                        {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },


                {
                    field: 'f_htbh',
                    title: '合同编号',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        if (resultStr.length > 10)
                        {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },



                {
                    field: 'f_sfzh',
                    title: '身份证号',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        if (resultStr.length > 10)
                        {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },


                {
                    field: 'f_htqdrq',
                    title: '合同签订日期',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        if (value == "")
                        {
                            value = "1900-01-01 00:00:00";
                        }
                        var resultStr = value.toDateTime().Format("yyyy-MM-dd");
                        if (resultStr == '1900-01-01')
                        {
                            resultStr = "&nbsp;&nbsp;";
                        }



                        return resultStr;

                    }
                },



                {
                    field: 'f_tsyx',
                    title: '托收银行',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        if (resultStr.length > 10)
                        {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },


                {
                    field: 'f_tsyxid',
                    title: '托收银行id',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        return resultStr;
                    }
                },


                {
                    field: 'f_sfzzs',
                    title: '是否增值税',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        if (value == "true")
                        {
                            value = '开';
                        }
                        else
                        {
                            value = '关';
                        }
                        var resultStr = value;

                        if (resultStr.length > 10)
                        {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },


                {
                    field: 'f_yhzt',
                    title: '用户状态',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        if (resultStr.length > 10)
                        {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },


                {
                    field: 'f_yhztid',
                    title: '用户状态id',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        return resultStr;
                    }
                },


                {
                    field: 'f_yhbz',
                    title: '用户备注',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        if (resultStr.length > 10)
                        {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },


                {
                    field: 'f_yzqk',
                    title: '验证情况',
                    "class": '',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        if (value == "true")
                        {
                            value = '异常';
                        }
                        else
                        {
                            value = '正常';
                        }
                        var resultStr = value;

                        if (resultStr.length > 10)
                        {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },

                {
                    field: '', title: '操作', "class": 'gridcell-editcolumn',
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

                            _gridEditId = row.sys_id;
                            getDetailData({
                                success: function (tbl_ld_pllhyl_modallist)
                                {
                                    setDetailModel(tbl_ld_pllhyl_modallist, {
                                        success: function ()
                                        {
                                            $('#div_detail_modal_tbl_ld_pllhyl_modallist').modal('show');
                                        }, fail: function (message)
                                        {
                                            _alertMessage.show('setDetailModel执行失败', 'fail');
                                            _resultMessage.show(message);
                                        }
                                    });
                                }
                            });

                        },
                        'click .edit': function (e, value, row, index)
                        {
                            _gridEditId = row.sys_id;
                            getDetailData({
                                success: function (tbl_ld_pllhyl_modallist)
                                {
                                    setDetailModel(tbl_ld_pllhyl_modallist, {
                                        success: function ()
                                        {

                                            $('#div_detail_modal_tbl_ld_pllhyl_modallist').modal('show');


                                        }, fail: function (message)
                                        {
                                            _alertMessage.show('setDetailModel执行失败', 'fail');
                                            _resultMessage.show(message);
                                        }
                                    });
                                }
                            });
                        }
                    }
                }
                ],
                onPageChange: function (size, number)
                {
                    that._pr_gridpageindex = number;
                    that.bindGrid(true, {
                        success: function ()
                        {
                        }, fail: function (message)
                        {
                            _alertMessage.show('绑定失败', 'fail');
                            _resultMessage.show(message);
                        }
                    });
                },
                rowStyle: function (row, index)
                {
                    //return {classes: 'active'//'success'//'info'//'warning' //'danger'};

                    if (row.f_yzqk == 'true')
                    {
                        return { classes: 'danger' };
                    }
                    else
                    {
                        return {};
                    }
                },
                onLoadSuccess: function (data)
                {
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
                    var rows = $('#table_grid_tbl_ld_pllhyl_modallist').bootstrapTable('getSelections');
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
                    var rows = $('#table_grid_tbl_ld_pllhyl_modallist').bootstrapTable('getData');
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

    //---------------------------------------------------------------------------------
    // ---------------------------------DetailModel------------------------------------
    //---------------------------------------------------------------------------------
    /* 
    *  
    *  方法:initDetailControl
    *  参数:
    *  初始化DetailModel控件，_baseCodeHashMap作为Code数据源
    */
    initDetailControl = function (callBackFunction)
    {
        try
        {
            var codeService_0555 = _baseCodeHashMap.get('codeservice_0555');
            var codeService_0556 = _baseCodeHashMap.get('codeservice_0556');
            var codeService_0592 = _baseCodeHashMap.get('codeservice_0592');
            var codeService_0516 = _baseCodeHashMap.get('codeservice_0516');
            var codeService_0523 = _baseCodeHashMap.get('codeservice_0523');
            var codeService_0524 = _baseCodeHashMap.get('codeservice_0524');
            var codeService_0525 = _baseCodeHashMap.get('codeservice_0525');
            var codeService_0526 = _baseCodeHashMap.get('codeservice_0526');

            var codeService_cby = _baseCodeHashMap.get('codeservice_cby');
            var codeService_cben = _baseCodeHashMap.get('codeservice_cben');
            var codeService_yhfz = _baseCodeHashMap.get('codeservice_yhfz');
            var codeService_khfz = _baseCodeHashMap.get('codeservice_khfz');
            var codeService_sbfz = _baseCodeHashMap.get('codeservice_sbfz');
            var codeService_dycq = _baseCodeHashMap.get('codeservice_dycq');

            var codeService_0513 = _baseCodeHashMap.get('codeservice_0513');
            var codeService_0514 = _baseCodeHashMap.get('codeservice_0514');
            var codeService_0515 = _baseCodeHashMap.get('codeservice_0515');




            controlObj.toggleinit('detail_f_yzqk_tbl_ld_pllhyl_modallist', f_yzqk_onchange);







            controlObj.singledropdownlistinit('detail_f_khzt_tbl_ld_pllhyl_modallist', codeService_0556, f_khzt_onchange);





            controlObj.toggleinit('detail_f_sfjlbjf_tbl_ld_pllhyl_modallist', f_sfjlbjf_onchange);



            controlObj.multidropdownlistinit('detail_f_khfz_tbl_ld_pllhyl_modallist', codeService_khfz, f_khfz_onchange);







            controlObj.singledropdownlistinit('detail_f_yslx_tbl_ld_pllhyl_modallist', codeService_0555, f_yslx_onchange);



            controlObj.datetimeinit('detail_f_zhcbrq_tbl_ld_pllhyl_modallist_date', 'detail_f_zhcbrq_tbl_ld_pllhyl_modallist_time', f_zhcbrq_date_onchange, f_zhcbrq_time_onchange);



            controlObj.singledropdownlistinit('detail_f_cbbh_tbl_ld_pllhyl_modallist', codeService_cben, f_cbbh_onchange);







            controlObj.singledropdownlistinit('detail_f_cbyxm_tbl_ld_pllhyl_modallist', codeService_cby, f_cbyxm_onchange);







            controlObj.multidropdownlistinit('detail_f_yhfz_tbl_ld_pllhyl_modallist', codeService_yhfz, f_yhfz_onchange);







            controlObj.singledropdownlistinit('detail_f_dy_tbl_ld_pllhyl_modallist', codeService_dycq, f_dy_onchange);

            controlObj.datetimeinit('detail_f_khrq_tbl_ld_pllhyl_modallist_date', 'detail_f_khrq_tbl_ld_pllhyl_modallist_time', f_khrq_date_onchange, f_khrq_time_onchange);



            controlObj.fileuploaderinit('detail_f_htfj_tbl_ld_pllhyl_modallist', { "fileUploadExtnames": ";.txt;.sql;.doc;.docx;.xls;.xlsx;.pdf;.tif;.bmp;.jpg;.jpeg;.gif;.png;.rar;.zip;.xml;", "fileUploadCountMax": "0", "isThumbnailImgShow": true }, f_htfj_onchange);

            controlObj.toggleinit('detail_f_sfzzs_tbl_ld_pllhyl_modallist', f_sfzzs_onchange);

            controlObj.singledropdownlistinit('detail_f_sc_tbl_ld_pllhyl_modallist', codeService_0513, f_sc_onchange);

            controlObj.toggleinit('detail_f_sfts_tbl_ld_pllhyl_modallist', f_sfts_onchange);

            controlObj.datetimeinit('detail_f_htqdrq_tbl_ld_pllhyl_modallist_date', 'detail_f_htqdrq_tbl_ld_pllhyl_modallist_time', f_htqdrq_date_onchange, f_htqdrq_time_onchange);

            controlObj.fileuploaderinit('detail_f_qtfj_tbl_ld_pllhyl_modallist', { "fileUploadExtnames": ";.txt;.sql;.doc;.docx;.xls;.xlsx;.pdf;.tif;.bmp;.jpg;.jpeg;.gif;.png;.rar;.zip;.xml;", "fileUploadCountMax": "0", "isThumbnailImgShow": true }, f_qtfj_onchange);

            controlObj.singledropdownlistinit('detail_f_yhzt_tbl_ld_pllhyl_modallist', codeService_0516, f_yhzt_onchange);

            controlObj.singledropdownlistinit('detail_f_qy_tbl_ld_pllhyl_modallist', codeService_0514, f_qy_onchange);

            controlObj.singledropdownlistinit('detail_f_tsyx_tbl_ld_pllhyl_modallist', codeService_0592, f_tsyx_onchange);



            controlObj.fileuploaderinit('detail_f_sfzfj_tbl_ld_pllhyl_modallist', { "fileUploadExtnames": ";.txt;.sql;.doc;.docx;.xls;.xlsx;.pdf;.tif;.bmp;.jpg;.jpeg;.gif;.png;.rar;.zip;.xml;", "fileUploadCountMax": "0", "isThumbnailImgShow": true }, f_sfzfj_onchange);



            controlObj.singledropdownlistinit('detail_f_pq_tbl_ld_pllhyl_modallist', codeService_0515, f_pq_onchange);















            controlObj.multidropdownlistinit('detail_f_sbfz_tbl_ld_pllhyl_modallist', codeService_sbfz, f_sbfz_onchange);









            controlObj.singledropdownlistinit('detail_f_sbzt_tbl_ld_pllhyl_modallist', codeService_0526, f_sbzt_onchange);

            controlObj.singledropdownlistinit('detail_f_sbkj_tbl_ld_pllhyl_modallist', codeService_0523, f_sbkj_onchange);





            controlObj.datetimeinit('detail_f_azrq_tbl_ld_pllhyl_modallist_date', 'detail_f_azrq_tbl_ld_pllhyl_modallist_time', f_azrq_date_onchange, f_azrq_time_onchange);

            controlObj.fileuploaderinit('detail_f_sbfj_tbl_ld_pllhyl_modallist', { "fileUploadExtnames": ";.txt;.sql;.doc;.docx;.xls;.xlsx;.pdf;.tif;.bmp;.jpg;.jpeg;.gif;.png;.rar;.zip;.xml;", "fileUploadCountMax": "0", "isThumbnailImgShow": true }, f_sbfj_onchange);

            controlObj.singledropdownlistinit('detail_f_sblx_tbl_ld_pllhyl_modallist', codeService_0524, f_sblx_onchange);









            controlObj.singledropdownlistinit('detail_f_jllx_tbl_ld_pllhyl_modallist', codeService_0525, f_jllx_onchange);





            controlObj.toggleinit('detail_f_qfzt_tbl_ld_pllhyl_modallist', f_qfzt_onchange);

            //模态窗口
            $('#div_detail_modal_tbl_ld_pllhyl_modallist').modal({
                keyboard: false,
                backdrop: 'static',
                show: false
            });

            callBackFunction.success();
        }
        catch (ex)
        {
            _blockMessage.show('initDetailControl执行失败。<br/>' + ex.message, 'fail');
        }
    },

    // ---------------------------------Model操作------------------------------------
    /* 
    *  
    *  方法:setDetailModel
    *  参数:callBackFunction
    *  根据传入的tbl_ld_pllhyl_modallist，绑定DetailModel
    */
    setDetailModel = function (tbl_ld_pllhyl_modallist, callBackFunction)
    {
        try
        {

            controlObj.text('detail_f_value1_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_value1);

            controlObj.text('detail_f_value2_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_value2);

            controlObj.text('detail_f_value3_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_value3);

            controlObj.text('detail_f_value4_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_value4);

            controlObj.text('detail_f_value5_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_value5);

            controlObj.text('detail_f_value6_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_value6);

            controlObj.text('detail_f_value7_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_value7);

            controlObj.text('detail_f_value8_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_value8);

            controlObj.text('detail_f_value9_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_value9);

            controlObj.text('detail_f_value10_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_value10);

            controlObj.toggle('detail_f_yzqk_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_yzqk);

            controlObj.text('detail_f_khbh_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_khbh);

            controlObj.text('detail_f_ycje_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_ycje);

            controlObj.text('detail_f_tbbh_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_tbbh);

            controlObj.singledropdownlistid('detail_f_khzt_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_khztid);

            controlObj.text('detail_f_ztkhh_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_ztkhh);

            controlObj.text('detail_f_djjzsf_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_djjzsf);

            controlObj.toggle('detail_f_sfjlbjf_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_sfjlbjf);

            controlObj.text('detail_f_sqysl_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_sqysl);

            controlObj.multidropdownlistid('detail_f_khfz_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_khfzid);

            controlObj.text('detail_f_djjzpwf_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_djjzpwf);

            controlObj.text('detail_f_ickljgl_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_ickljgl);

            controlObj.text('detail_f_jhysl_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_jhysl);

            controlObj.singledropdownlistid('detail_f_yslx_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_yslxid);

            controlObj.text('detail_f_ljqf_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_ljqf);


            controlObj.datetime('detail_f_zhcbrq_tbl_ld_pllhyl_modallist_date', 'detail_f_zhcbrq_tbl_ld_pllhyl_modallist_time', tbl_ld_pllhyl_modallist.f_zhcbrq);

            controlObj.text('detail_f_khbz_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_khbz);

            controlObj.singledropdownlistid('detail_f_cbbh_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_cbbhid);

            controlObj.text('detail_f_cbxh_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_cbxh);

            controlObj.text('detail_f_cbmc_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_cbmc);

            controlObj.text('detail_f_cbzq_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_cbzq);

            controlObj.singledropdownlistid('detail_f_cbyxm_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_cbyxmid);

            controlObj.text('detail_f_yhbh_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_yhbh);

            controlObj.text('detail_f_dh_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_dh);

            controlObj.text('detail_f_jyhh_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_jyhh);

            controlObj.multidropdownlistid('detail_f_yhfz_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_yhfzid);

            controlObj.text('detail_f_yhm_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_yhm);

            controlObj.text('detail_f_dz_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_dz);

            controlObj.text('detail_f_jfm_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_jfm);




            controlObj.datetime('detail_f_khrq_tbl_ld_pllhyl_modallist_date', 'detail_f_khrq_tbl_ld_pllhyl_modallist_time', tbl_ld_pllhyl_modallist.f_khrq);

            controlObj.text('detail_f_htbh_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_htbh);

            controlObj.fileuploaderbind('detail_f_htfj_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_htfj);

            controlObj.toggle('detail_f_sfzzs_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_sfzzs);



            controlObj.toggle('detail_f_sfts_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_sfts);


            controlObj.datetime('detail_f_htqdrq_tbl_ld_pllhyl_modallist_date', 'detail_f_htqdrq_tbl_ld_pllhyl_modallist_time', tbl_ld_pllhyl_modallist.f_htqdrq);

            controlObj.fileuploaderbind('detail_f_qtfj_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_qtfj);

            controlObj.singledropdownlistid('detail_f_yhzt_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_yhztid);



            controlObj.singledropdownlistid('detail_f_tsyx_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_tsyxid);

            controlObj.text('detail_f_sfzh_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_sfzh);

            controlObj.fileuploaderbind('detail_f_sfzfj_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_sfzfj);

            controlObj.text('detail_f_yhbz_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_yhbz);



            controlObj.text('detail_f_tsyxzh_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_tsyxzh);

            controlObj.text('detail_f_sbbh_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_sbbh);

            controlObj.text('detail_f_sbpp_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_sbpp);

            controlObj.text('detail_f_ztsbh_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_ztsbh);

            controlObj.text('detail_f_mph_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_mph);

            controlObj.text('detail_f_lxth_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_lxth);

            controlObj.text('detail_f_sbdz_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_sbdz);

            controlObj.multidropdownlistid('detail_f_sbfz_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_sbfzid);

            controlObj.text('detail_f_rs_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_rs);

            controlObj.text('detail_f_cszm_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_cszm);

            controlObj.text('detail_f_ljgl_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_ljgl);

            controlObj.text('detail_f_nljgl_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_nljgl);

            controlObj.singledropdownlistid('detail_f_sbzt_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_sbztid);

            controlObj.singledropdownlistid('detail_f_sbkj_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_sbkjid);

            controlObj.text('detail_f_bqzm_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_bqzm);

            controlObj.text('detail_f_bqsl_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_bqsl);


            controlObj.datetime('detail_f_azrq_tbl_ld_pllhyl_modallist_date', 'detail_f_azrq_tbl_ld_pllhyl_modallist_time', tbl_ld_pllhyl_modallist.f_azrq);

            controlObj.fileuploaderbind('detail_f_sbfj_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_sbfj);

            controlObj.singledropdownlistid('detail_f_sblx_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_sblxid);

            controlObj.text('detail_f_sqzm_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_sqzm);

            controlObj.text('detail_f_qsqpjsl_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_qsqpjsl);

            controlObj.text('detail_f_synx_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_synx);

            controlObj.text('detail_f_sbbz_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_sbbz);

            controlObj.singledropdownlistid('detail_f_jllx_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_jllxid);

            controlObj.text('detail_f_sqsl_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_sqsl);

            controlObj.text('detail_f_qlqpjsl_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_qlqpjsl);

            controlObj.toggle('detail_f_qfzt_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_qfzt);

            controlObj.singledropdownlistid('detail_f_dy_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_dyid);
            if (tbl_ld_pllhyl_modallist.f_dyid != null && tbl_ld_pllhyl_modallist.f_dyid != "")
            {
                var codeService_sc = _baseCodeHashMap.get('codeservice_sc');
                controlObj.singledropdownlistinit('detail_f_sc_tbl_ld_pllhyl_modallist', codeService_sc, f_sc_onchange);
                if (tbl_ld_pllhyl_modallist.f_scid != null && tbl_ld_pllhyl_modallist.f_scid != "")
                {
                    var codeService_qy = _baseCodeHashMap.get('codeservice_qy');
                    controlObj.singledropdownlistinit('detail_f_qy_tbl_ld_pllhyl_modallist', codeService_qy, f_qy_onchange);

                    if (tbl_ld_pllhyl_modallist.f_qyid != null && tbl_ld_pllhyl_modallist.f_qyid != "")
                    {
                        var codeService_pq = _baseCodeHashMap.get('codeservice_pq');
                        controlObj.singledropdownlistinit('detail_f_pq_tbl_ld_pllhyl_modallist', codeService_pq, f_pq_onchange);


                    }
                }
            }
            controlObj.singledropdownlistid('detail_f_sc_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_scid);
            controlObj.singledropdownlistid('detail_f_qy_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_qyid);
            controlObj.singledropdownlistid('detail_f_pq_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_pqid);


            callBackFunction.success();
        }
        catch (ex)
        {
            callBackFunction.fail(ex.message);

        }
    },
    /* 
    *  
    *  方法:getDetailModel
    *  参数:callBackFunction
    *  获取DetailMode的数据对象，返回数据对象
    */
    getDetailModel = function (callBackFunction)
    {
        try
        {
            var tbl_ld_pllhyl_modallist = new Object();


            tbl_ld_pllhyl_modallist.f_value1 = controlObj.text('detail_f_value1_tbl_ld_pllhyl_modallist');


            tbl_ld_pllhyl_modallist.f_value2 = controlObj.text('detail_f_value2_tbl_ld_pllhyl_modallist');


            tbl_ld_pllhyl_modallist.f_value3 = controlObj.text('detail_f_value3_tbl_ld_pllhyl_modallist');


            tbl_ld_pllhyl_modallist.f_value4 = controlObj.text('detail_f_value4_tbl_ld_pllhyl_modallist');


            tbl_ld_pllhyl_modallist.f_value5 = controlObj.text('detail_f_value5_tbl_ld_pllhyl_modallist');


            tbl_ld_pllhyl_modallist.f_value6 = controlObj.text('detail_f_value6_tbl_ld_pllhyl_modallist');


            tbl_ld_pllhyl_modallist.f_value7 = controlObj.text('detail_f_value7_tbl_ld_pllhyl_modallist');


            tbl_ld_pllhyl_modallist.f_value8 = controlObj.text('detail_f_value8_tbl_ld_pllhyl_modallist');


            tbl_ld_pllhyl_modallist.f_value9 = controlObj.text('detail_f_value9_tbl_ld_pllhyl_modallist');


            tbl_ld_pllhyl_modallist.f_value10 = controlObj.text('detail_f_value10_tbl_ld_pllhyl_modallist');


            tbl_ld_pllhyl_modallist.f_yzqk = controlObj.toggle('detail_f_yzqk_tbl_ld_pllhyl_modallist');


            tbl_ld_pllhyl_modallist.f_khbh = controlObj.text('detail_f_khbh_tbl_ld_pllhyl_modallist');


            tbl_ld_pllhyl_modallist.f_ycje = controlObj.text('detail_f_ycje_tbl_ld_pllhyl_modallist');


            tbl_ld_pllhyl_modallist.f_tbbh = controlObj.text('detail_f_tbbh_tbl_ld_pllhyl_modallist');

            tbl_ld_pllhyl_modallist.f_khzt = controlObj.singledropdownlist('detail_f_khzt_tbl_ld_pllhyl_modallist');
            tbl_ld_pllhyl_modallist.f_khztid = controlObj.singledropdownlistid('detail_f_khzt_tbl_ld_pllhyl_modallist');


            tbl_ld_pllhyl_modallist.f_ztkhh = controlObj.text('detail_f_ztkhh_tbl_ld_pllhyl_modallist');


            tbl_ld_pllhyl_modallist.f_djjzsf = controlObj.text('detail_f_djjzsf_tbl_ld_pllhyl_modallist');


            tbl_ld_pllhyl_modallist.f_sfjlbjf = controlObj.toggle('detail_f_sfjlbjf_tbl_ld_pllhyl_modallist');


            tbl_ld_pllhyl_modallist.f_sqysl = controlObj.text('detail_f_sqysl_tbl_ld_pllhyl_modallist');


            tbl_ld_pllhyl_modallist.f_khfz = controlObj.multidropdownlist('detail_f_khfz_tbl_ld_pllhyl_modallist');
            tbl_ld_pllhyl_modallist.f_khfzid = controlObj.multidropdownlistid('detail_f_khfz_tbl_ld_pllhyl_modallist');


            tbl_ld_pllhyl_modallist.f_djjzpwf = controlObj.text('detail_f_djjzpwf_tbl_ld_pllhyl_modallist');


            tbl_ld_pllhyl_modallist.f_ickljgl = controlObj.text('detail_f_ickljgl_tbl_ld_pllhyl_modallist');


            tbl_ld_pllhyl_modallist.f_jhysl = controlObj.text('detail_f_jhysl_tbl_ld_pllhyl_modallist');

            tbl_ld_pllhyl_modallist.f_yslx = controlObj.singledropdownlist('detail_f_yslx_tbl_ld_pllhyl_modallist');
            tbl_ld_pllhyl_modallist.f_yslxid = controlObj.singledropdownlistid('detail_f_yslx_tbl_ld_pllhyl_modallist');


            tbl_ld_pllhyl_modallist.f_ljqf = controlObj.text('detail_f_ljqf_tbl_ld_pllhyl_modallist');

            tbl_ld_pllhyl_modallist.f_zhcbrq = controlObj.datetime('detail_f_zhcbrq_tbl_ld_pllhyl_modallist_date', 'detail_f_zhcbrq_tbl_ld_pllhyl_modallist_time');


            tbl_ld_pllhyl_modallist.f_khbz = controlObj.text('detail_f_khbz_tbl_ld_pllhyl_modallist');

            tbl_ld_pllhyl_modallist.f_cbbh = controlObj.singledropdownlist('detail_f_cbbh_tbl_ld_pllhyl_modallist');
            tbl_ld_pllhyl_modallist.f_cbbhid = controlObj.singledropdownlistid('detail_f_cbbh_tbl_ld_pllhyl_modallist');


            tbl_ld_pllhyl_modallist.f_cbxh = controlObj.text('detail_f_cbxh_tbl_ld_pllhyl_modallist');


            tbl_ld_pllhyl_modallist.f_cbmc = controlObj.text('detail_f_cbmc_tbl_ld_pllhyl_modallist');


            tbl_ld_pllhyl_modallist.f_cbzq = controlObj.text('detail_f_cbzq_tbl_ld_pllhyl_modallist');

            tbl_ld_pllhyl_modallist.f_cbyxm = controlObj.singledropdownlist('detail_f_cbyxm_tbl_ld_pllhyl_modallist');
            tbl_ld_pllhyl_modallist.f_cbyxmid = controlObj.singledropdownlistid('detail_f_cbyxm_tbl_ld_pllhyl_modallist');


            tbl_ld_pllhyl_modallist.f_yhbh = controlObj.text('detail_f_yhbh_tbl_ld_pllhyl_modallist');


            tbl_ld_pllhyl_modallist.f_dh = controlObj.text('detail_f_dh_tbl_ld_pllhyl_modallist');


            tbl_ld_pllhyl_modallist.f_jyhh = controlObj.text('detail_f_jyhh_tbl_ld_pllhyl_modallist');


            tbl_ld_pllhyl_modallist.f_yhfz = controlObj.multidropdownlist('detail_f_yhfz_tbl_ld_pllhyl_modallist');
            tbl_ld_pllhyl_modallist.f_yhfzid = controlObj.multidropdownlistid('detail_f_yhfz_tbl_ld_pllhyl_modallist');


            tbl_ld_pllhyl_modallist.f_yhm = controlObj.text('detail_f_yhm_tbl_ld_pllhyl_modallist');


            tbl_ld_pllhyl_modallist.f_dz = controlObj.text('detail_f_dz_tbl_ld_pllhyl_modallist');


            tbl_ld_pllhyl_modallist.f_jfm = controlObj.text('detail_f_jfm_tbl_ld_pllhyl_modallist');

            tbl_ld_pllhyl_modallist.f_dy = controlObj.singledropdownlist('detail_f_dy_tbl_ld_pllhyl_modallist');
            tbl_ld_pllhyl_modallist.f_dyid = controlObj.singledropdownlistid('detail_f_dy_tbl_ld_pllhyl_modallist');

            tbl_ld_pllhyl_modallist.f_khrq = controlObj.datetime('detail_f_khrq_tbl_ld_pllhyl_modallist_date', 'detail_f_khrq_tbl_ld_pllhyl_modallist_time');


            tbl_ld_pllhyl_modallist.f_htbh = controlObj.text('detail_f_htbh_tbl_ld_pllhyl_modallist');

            tbl_ld_pllhyl_modallist.f_htfj = controlObj.fileuploaderid('detail_f_htfj_tbl_ld_pllhyl_modallist');


            tbl_ld_pllhyl_modallist.f_sfzzs = controlObj.toggle('detail_f_sfzzs_tbl_ld_pllhyl_modallist');

            tbl_ld_pllhyl_modallist.f_sc = controlObj.singledropdownlist('detail_f_sc_tbl_ld_pllhyl_modallist');
            tbl_ld_pllhyl_modallist.f_scid = controlObj.singledropdownlistid('detail_f_sc_tbl_ld_pllhyl_modallist');


            tbl_ld_pllhyl_modallist.f_sfts = controlObj.toggle('detail_f_sfts_tbl_ld_pllhyl_modallist');

            tbl_ld_pllhyl_modallist.f_htqdrq = controlObj.datetime('detail_f_htqdrq_tbl_ld_pllhyl_modallist_date', 'detail_f_htqdrq_tbl_ld_pllhyl_modallist_time');

            tbl_ld_pllhyl_modallist.f_qtfj = controlObj.fileuploaderid('detail_f_qtfj_tbl_ld_pllhyl_modallist');

            tbl_ld_pllhyl_modallist.f_yhzt = controlObj.singledropdownlist('detail_f_yhzt_tbl_ld_pllhyl_modallist');
            tbl_ld_pllhyl_modallist.f_yhztid = controlObj.singledropdownlistid('detail_f_yhzt_tbl_ld_pllhyl_modallist');

            tbl_ld_pllhyl_modallist.f_qy = controlObj.singledropdownlist('detail_f_qy_tbl_ld_pllhyl_modallist');
            tbl_ld_pllhyl_modallist.f_qyid = controlObj.singledropdownlistid('detail_f_qy_tbl_ld_pllhyl_modallist');

            tbl_ld_pllhyl_modallist.f_tsyx = controlObj.singledropdownlist('detail_f_tsyx_tbl_ld_pllhyl_modallist');
            tbl_ld_pllhyl_modallist.f_tsyxid = controlObj.singledropdownlistid('detail_f_tsyx_tbl_ld_pllhyl_modallist');


            tbl_ld_pllhyl_modallist.f_sfzh = controlObj.text('detail_f_sfzh_tbl_ld_pllhyl_modallist');

            tbl_ld_pllhyl_modallist.f_sfzfj = controlObj.fileuploaderid('detail_f_sfzfj_tbl_ld_pllhyl_modallist');


            tbl_ld_pllhyl_modallist.f_yhbz = controlObj.text('detail_f_yhbz_tbl_ld_pllhyl_modallist');

            tbl_ld_pllhyl_modallist.f_pq = controlObj.singledropdownlist('detail_f_pq_tbl_ld_pllhyl_modallist');
            tbl_ld_pllhyl_modallist.f_pqid = controlObj.singledropdownlistid('detail_f_pq_tbl_ld_pllhyl_modallist');


            tbl_ld_pllhyl_modallist.f_tsyxzh = controlObj.text('detail_f_tsyxzh_tbl_ld_pllhyl_modallist');


            tbl_ld_pllhyl_modallist.f_sbbh = controlObj.text('detail_f_sbbh_tbl_ld_pllhyl_modallist');


            tbl_ld_pllhyl_modallist.f_sbpp = controlObj.text('detail_f_sbpp_tbl_ld_pllhyl_modallist');


            tbl_ld_pllhyl_modallist.f_ztsbh = controlObj.text('detail_f_ztsbh_tbl_ld_pllhyl_modallist');


            tbl_ld_pllhyl_modallist.f_mph = controlObj.text('detail_f_mph_tbl_ld_pllhyl_modallist');


            tbl_ld_pllhyl_modallist.f_lxth = controlObj.text('detail_f_lxth_tbl_ld_pllhyl_modallist');


            tbl_ld_pllhyl_modallist.f_sbdz = controlObj.text('detail_f_sbdz_tbl_ld_pllhyl_modallist');


            tbl_ld_pllhyl_modallist.f_sbfz = controlObj.multidropdownlist('detail_f_sbfz_tbl_ld_pllhyl_modallist');
            tbl_ld_pllhyl_modallist.f_sbfzid = controlObj.multidropdownlistid('detail_f_sbfz_tbl_ld_pllhyl_modallist');


            tbl_ld_pllhyl_modallist.f_rs = controlObj.text('detail_f_rs_tbl_ld_pllhyl_modallist');


            tbl_ld_pllhyl_modallist.f_cszm = controlObj.text('detail_f_cszm_tbl_ld_pllhyl_modallist');


            tbl_ld_pllhyl_modallist.f_ljgl = controlObj.text('detail_f_ljgl_tbl_ld_pllhyl_modallist');


            tbl_ld_pllhyl_modallist.f_nljgl = controlObj.text('detail_f_nljgl_tbl_ld_pllhyl_modallist');

            tbl_ld_pllhyl_modallist.f_sbzt = controlObj.singledropdownlist('detail_f_sbzt_tbl_ld_pllhyl_modallist');
            tbl_ld_pllhyl_modallist.f_sbztid = controlObj.singledropdownlistid('detail_f_sbzt_tbl_ld_pllhyl_modallist');

            tbl_ld_pllhyl_modallist.f_sbkj = controlObj.singledropdownlist('detail_f_sbkj_tbl_ld_pllhyl_modallist');
            tbl_ld_pllhyl_modallist.f_sbkjid = controlObj.singledropdownlistid('detail_f_sbkj_tbl_ld_pllhyl_modallist');


            tbl_ld_pllhyl_modallist.f_bqzm = controlObj.text('detail_f_bqzm_tbl_ld_pllhyl_modallist');


            tbl_ld_pllhyl_modallist.f_bqsl = controlObj.text('detail_f_bqsl_tbl_ld_pllhyl_modallist');

            tbl_ld_pllhyl_modallist.f_azrq = controlObj.datetime('detail_f_azrq_tbl_ld_pllhyl_modallist_date', 'detail_f_azrq_tbl_ld_pllhyl_modallist_time');

            tbl_ld_pllhyl_modallist.f_sbfj = controlObj.fileuploaderid('detail_f_sbfj_tbl_ld_pllhyl_modallist');

            tbl_ld_pllhyl_modallist.f_sblx = controlObj.singledropdownlist('detail_f_sblx_tbl_ld_pllhyl_modallist');
            tbl_ld_pllhyl_modallist.f_sblxid = controlObj.singledropdownlistid('detail_f_sblx_tbl_ld_pllhyl_modallist');


            tbl_ld_pllhyl_modallist.f_sqzm = controlObj.text('detail_f_sqzm_tbl_ld_pllhyl_modallist');


            tbl_ld_pllhyl_modallist.f_qsqpjsl = controlObj.text('detail_f_qsqpjsl_tbl_ld_pllhyl_modallist');


            tbl_ld_pllhyl_modallist.f_synx = controlObj.text('detail_f_synx_tbl_ld_pllhyl_modallist');


            tbl_ld_pllhyl_modallist.f_sbbz = controlObj.text('detail_f_sbbz_tbl_ld_pllhyl_modallist');

            tbl_ld_pllhyl_modallist.f_jllx = controlObj.singledropdownlist('detail_f_jllx_tbl_ld_pllhyl_modallist');
            tbl_ld_pllhyl_modallist.f_jllxid = controlObj.singledropdownlistid('detail_f_jllx_tbl_ld_pllhyl_modallist');


            tbl_ld_pllhyl_modallist.f_sqsl = controlObj.text('detail_f_sqsl_tbl_ld_pllhyl_modallist');


            tbl_ld_pllhyl_modallist.f_qlqpjsl = controlObj.text('detail_f_qlqpjsl_tbl_ld_pllhyl_modallist');


            tbl_ld_pllhyl_modallist.f_qfzt = controlObj.toggle('detail_f_qfzt_tbl_ld_pllhyl_modallist');

            callBackFunction.success(tbl_ld_pllhyl_modallist);
        }
        catch (ex)
        {
            callBackFunction.fail(ex.message);
        }
    },

    /* 
    *  
    *  方法:checkDetailModel
    *  参数:tbl_ld_pllhyl_modallist, callBackFunction
    *  根据传入的数据对象，校验数据内容_validateMessage_detail
    */
    checkDetailModel = function (tbl_ld_pllhyl_modallist, callBackFunction)
    {
        try
        {
            var errorMessageHansMap = new hashMap();
            var errorMessagePlacementHansMap = new hashMap();



            

            if (tbl_ld_pllhyl_modallist.f_value1.length > 200)
            {
                errorMessageHansMap.put('detail_f_value1_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pllhyl_modallist.f_value2.length > 200)
            {
                errorMessageHansMap.put('detail_f_value2_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pllhyl_modallist.f_value3.length > 200)
            {
                errorMessageHansMap.put('detail_f_value3_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pllhyl_modallist.f_value4.length > 200)
            {
                errorMessageHansMap.put('detail_f_value4_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pllhyl_modallist.f_value5.length > 200)
            {
                errorMessageHansMap.put('detail_f_value5_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pllhyl_modallist.f_value6.length > 200)
            {
                errorMessageHansMap.put('detail_f_value6_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pllhyl_modallist.f_value7.length > 200)
            {
                errorMessageHansMap.put('detail_f_value7_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pllhyl_modallist.f_value8.length > 200)
            {
                errorMessageHansMap.put('detail_f_value8_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pllhyl_modallist.f_value9.length > 200)
            {
                errorMessageHansMap.put('detail_f_value9_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pllhyl_modallist.f_value10.length > 200)
            {
                errorMessageHansMap.put('detail_f_value10_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pllhyl_modallist.f_yzqk.length > 200)
            {
                errorMessageHansMap.put('detail_f_yzqk_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pllhyl_modallist.f_khbh.length > 200)
            {
                errorMessageHansMap.put('detail_f_khbh_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pllhyl_modallist.f_ycje.length > 200)
            {
                errorMessageHansMap.put('detail_f_ycje_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_pllhyl_modallist.f_ycje.length != "" && !/^[0-9]+\.?[0-9]*$/.test(tbl_ld_pllhyl_modallist.f_ycje))
            {
                errorMessageHansMap.put('detail_f_ycje_tbl_ld_pllhyl_modallist', '必须是数字');
            }




            if (tbl_ld_pllhyl_modallist.f_tbbh.length > 200)
            {
                errorMessageHansMap.put('detail_f_tbbh_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pllhyl_modallist.f_khzt.length > 200)
            {
                errorMessageHansMap.put('detail_f_khzt_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pllhyl_modallist.f_ztkhh.length > 200)
            {
                errorMessageHansMap.put('detail_f_ztkhh_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pllhyl_modallist.f_djjzsf.length > 200)
            {
                errorMessageHansMap.put('detail_f_djjzsf_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_pllhyl_modallist.f_djjzsf.length != "" && !/^[0-9]+\.?[0-9]*$/.test(tbl_ld_pllhyl_modallist.f_djjzsf))
            {
                errorMessageHansMap.put('detail_f_djjzsf_tbl_ld_pllhyl_modallist', '必须是数字');
            }


            if (tbl_ld_pllhyl_modallist.f_sfjlbjf.length > 200)
            {
                errorMessageHansMap.put('detail_f_sfjlbjf_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pllhyl_modallist.f_sqysl.length > 200)
            {
                errorMessageHansMap.put('detail_f_sqysl_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_pllhyl_modallist.f_sqysl.length != "" && !/^[0-9]+\.?[0-9]*$/.test(tbl_ld_pllhyl_modallist.f_sqysl))
            {
                errorMessageHansMap.put('detail_f_sqysl_tbl_ld_pllhyl_modallist', '必须是数字');
            }
            //立户类型判断
            if (that._pr_type == '0')
            {
                if (tbl_ld_pllhyl_modallist.f_khfz.indexOf("客服中心大用户表") != -1)
                {
                    errorMessageHansMap.put('detail_f_khfz_tbl_ld_pllhyl_modallist', '只能立户居民,不能立户大客户！');
                }

                if (tbl_ld_pllhyl_modallist.f_yslx != "居民生活用水")
                {
                    errorMessageHansMap.put('detail_f_yslx_tbl_ld_pllhyl_modallist', '只能立户居民,不能立户大客户！');
                }

                if (tbl_ld_pllhyl_modallist.f_cbbh.substring(0, 2) == "DH")
                {
                    errorMessageHansMap.put('detail_f_cbbh_tbl_ld_pllhyl_modallist', '抄本编号不能以DH开头');
                }
            }
            else
            {
                if (tbl_ld_pllhyl_modallist.f_khfz.indexOf("客服中心大用户表")==-1)
                {
                    errorMessageHansMap.put('detail_f_khfz_tbl_ld_pllhyl_modallist', '只能立户大客户,不能立户居民！');
                }

                if (tbl_ld_pllhyl_modallist.f_yslx == "居民生活用水")
                {
                    errorMessageHansMap.put('detail_f_yslx_tbl_ld_pllhyl_modallist', '只能立户大客户,不能立户居民！');
                }

                if (tbl_ld_pllhyl_modallist.f_cbbh.substring(0, 2) != "DH" && tbl_ld_pllhyl_modallist.f_cbbh.substring(0, 2) != "JL" && tbl_ld_pllhyl_modallist.f_cbbh.substring(0, 2) != "PZ" && tbl_ld_pllhyl_modallist.f_cbbh.substring(0, 2) != "ZB")
                {
                    errorMessageHansMap.put('detail_f_cbbh_tbl_ld_pllhyl_modallist', '抄本编号不能以DH开头');
                }
            }


            if (tbl_ld_pllhyl_modallist.f_khfz.length > 200)
            {
                errorMessageHansMap.put('detail_f_khfz_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pllhyl_modallist.f_djjzpwf.length > 200)
            {
                errorMessageHansMap.put('detail_f_djjzpwf_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_pllhyl_modallist.f_djjzpwf.length != "" && !/^[0-9]+\.?[0-9]*$/.test(tbl_ld_pllhyl_modallist.f_djjzpwf))
            {
                errorMessageHansMap.put('detail_f_djjzpwf_tbl_ld_pllhyl_modallist', '必须是数字');
            }


            if (tbl_ld_pllhyl_modallist.f_ickljgl.length > 200)
            {
                errorMessageHansMap.put('detail_f_ickljgl_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_pllhyl_modallist.f_ickljgl.length != "" && !/^[0-9]+\.?[0-9]*$/.test(tbl_ld_pllhyl_modallist.f_ickljgl))
            {
                errorMessageHansMap.put('detail_f_ickljgl_tbl_ld_pllhyl_modallist', '必须是数字');
            }


            if (tbl_ld_pllhyl_modallist.f_jhysl.length > 200)
            {
                errorMessageHansMap.put('detail_f_jhysl_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_pllhyl_modallist.f_jhysl.length != "" && !/^[0-9]+\.?[0-9]*$/.test(tbl_ld_pllhyl_modallist.f_jhysl))
            {
                errorMessageHansMap.put('detail_f_jhysl_tbl_ld_pllhyl_modallist', '必须是数字');
            }



            if (tbl_ld_pllhyl_modallist.f_yslx.length > 200)
            {
                errorMessageHansMap.put('detail_f_yslx_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_pllhyl_modallist.f_yslx.length < 1)
            {
                errorMessageHansMap.put('detail_f_yslx_tbl_ld_pllhyl_modallist', '长度不能小于<a style="color:red">1</a>个字');
            }


            if (tbl_ld_pllhyl_modallist.f_ljqf.length > 200)
            {
                errorMessageHansMap.put('detail_f_ljqf_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_pllhyl_modallist.f_ljqf.length != "" && !/^[0-9]+\.?[0-9]*$/.test(tbl_ld_pllhyl_modallist.f_ljqf))
            {
                errorMessageHansMap.put('detail_f_ljqf_tbl_ld_pllhyl_modallist', '必须是数字');
            }





            if (tbl_ld_pllhyl_modallist.f_khbz.length > 200)
            {
                errorMessageHansMap.put('detail_f_khbz_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pllhyl_modallist.f_cbbh.length > 200)
            {
                errorMessageHansMap.put('detail_f_cbbh_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }

            else if (tbl_ld_pllhyl_modallist.f_cbbh.length < 1)
            {
                errorMessageHansMap.put('detail_f_cbbh_tbl_ld_pllhyl_modallist', '长度不能小于<a style="color:red">1</a>个字');
            }


            if (tbl_ld_pllhyl_modallist.f_cbxh.length > 200)
            {
                errorMessageHansMap.put('detail_f_cbxh_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_pllhyl_modallist.f_cbxh.length != "" && !/^[0-9]+\.?[0-9]*$/.test(tbl_ld_pllhyl_modallist.f_cbxh))
            {
                errorMessageHansMap.put('detail_f_cbxh_tbl_ld_pllhyl_modallist', '必须是数字');
            }


            if (tbl_ld_pllhyl_modallist.f_cbmc.length > 200)
            {
                errorMessageHansMap.put('detail_f_cbmc_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pllhyl_modallist.f_cbzq.length > 200)
            {
                errorMessageHansMap.put('detail_f_cbzq_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pllhyl_modallist.f_cbyxm.length > 200)
            {
                errorMessageHansMap.put('detail_f_cbyxm_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pllhyl_modallist.f_yhbh.length > 200)
            {
                errorMessageHansMap.put('detail_f_yhbh_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pllhyl_modallist.f_dh.length > 200)
            {
                errorMessageHansMap.put('detail_f_dh_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pllhyl_modallist.f_jyhh.length > 200)
            {
                errorMessageHansMap.put('detail_f_jyhh_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pllhyl_modallist.f_yhfz.length > 200)
            {
                errorMessageHansMap.put('detail_f_yhfz_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }


            if (tbl_ld_pllhyl_modallist.f_yhm.length > 200)
            {
                errorMessageHansMap.put('detail_f_yhm_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }
            if (tbl_ld_pllhyl_modallist.f_yhm.length < 1)
            {
                errorMessageHansMap.put('detail_f_yhm_tbl_ld_pllhyl_modallist', '长度不能小于<a style="color:red">1</a>个字');
            }



            if (tbl_ld_pllhyl_modallist.f_dz.length > 200)
            {
                errorMessageHansMap.put('detail_f_dz_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pllhyl_modallist.f_jfm.length > 200)
            {
                errorMessageHansMap.put('detail_f_jfm_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }
            if (tbl_ld_pllhyl_modallist.f_jfm.length < 1)
            {
                errorMessageHansMap.put('detail_f_jfm_tbl_ld_pllhyl_modallist', '长度不能小于<a style="color:red">1</a>个字');
            }



            if (tbl_ld_pllhyl_modallist.f_dy.length > 200)
            {
                errorMessageHansMap.put('detail_f_dy_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }







            if (tbl_ld_pllhyl_modallist.f_htbh.length > 200)
            {
                errorMessageHansMap.put('detail_f_htbh_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pllhyl_modallist.f_htfj.length > 4000)
            {
                errorMessageHansMap.put('detail_f_htfj_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">4000</a>个字');
            }




            if (tbl_ld_pllhyl_modallist.f_sfzzs.length > 200)
            {
                errorMessageHansMap.put('detail_f_sfzzs_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pllhyl_modallist.f_sc.length > 200)
            {
                errorMessageHansMap.put('detail_f_sc_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pllhyl_modallist.f_sfts.length > 200)
            {
                errorMessageHansMap.put('detail_f_sfts_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }







            if (tbl_ld_pllhyl_modallist.f_qtfj.length > 4000)
            {
                errorMessageHansMap.put('detail_f_qtfj_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">4000</a>个字');
            }




            if (tbl_ld_pllhyl_modallist.f_yhzt.length > 200)
            {
                errorMessageHansMap.put('detail_f_yhzt_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pllhyl_modallist.f_qy.length > 200)
            {
                errorMessageHansMap.put('detail_f_qy_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pllhyl_modallist.f_tsyx.length > 200)
            {
                errorMessageHansMap.put('detail_f_tsyx_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pllhyl_modallist.f_sfzh.length > 200)
            {
                errorMessageHansMap.put('detail_f_sfzh_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pllhyl_modallist.f_sfzfj.length > 4000)
            {
                errorMessageHansMap.put('detail_f_sfzfj_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">4000</a>个字');
            }




            if (tbl_ld_pllhyl_modallist.f_yhbz.length > 200)
            {
                errorMessageHansMap.put('detail_f_yhbz_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pllhyl_modallist.f_pq.length > 200)
            {
                errorMessageHansMap.put('detail_f_pq_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pllhyl_modallist.f_tsyxzh.length > 200)
            {
                errorMessageHansMap.put('detail_f_tsyxzh_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pllhyl_modallist.f_sbbh.length > 200)
            {
                errorMessageHansMap.put('detail_f_sbbh_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pllhyl_modallist.f_sbpp.length > 200)
            {
                errorMessageHansMap.put('detail_f_sbpp_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pllhyl_modallist.f_ztsbh.length > 200)
            {
                errorMessageHansMap.put('detail_f_ztsbh_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pllhyl_modallist.f_mph.length > 200)
            {
                errorMessageHansMap.put('detail_f_mph_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pllhyl_modallist.f_lxth.length > 200)
            {
                errorMessageHansMap.put('detail_f_lxth_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pllhyl_modallist.f_sbdz.length > 200)
            {
                errorMessageHansMap.put('detail_f_sbdz_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pllhyl_modallist.f_sbfz.length > 200)
            {
                errorMessageHansMap.put('detail_f_sbfz_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pllhyl_modallist.f_rs.length > 200)
            {
                errorMessageHansMap.put('detail_f_rs_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_pllhyl_modallist.f_rs.length != "" && !/^[0-9]+\.?[0-9]*$/.test(tbl_ld_pllhyl_modallist.f_rs))
            {
                errorMessageHansMap.put('detail_f_rs_tbl_ld_pllhyl_modallist', '必须是数字');
            }


            if (tbl_ld_pllhyl_modallist.f_cszm.length > 200)
            {
                errorMessageHansMap.put('detail_f_cszm_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_pllhyl_modallist.f_cszm.length != "" && !/^[0-9]+\.?[0-9]*$/.test(tbl_ld_pllhyl_modallist.f_cszm))
            {
                errorMessageHansMap.put('detail_f_cszm_tbl_ld_pllhyl_modallist', '必须是数字');
            }

            if (tbl_ld_pllhyl_modallist.f_cszm.length < 1)
            {
                errorMessageHansMap.put('detail_f_cszm_tbl_ld_pllhyl_modallist', '长度不能小于<a style="color:red">1</a>个字');
            }


            if (tbl_ld_pllhyl_modallist.f_ljgl.length > 200)
            {
                errorMessageHansMap.put('detail_f_ljgl_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_pllhyl_modallist.f_ljgl.length != "" && !/^[0-9]+\.?[0-9]*$/.test(tbl_ld_pllhyl_modallist.f_ljgl))
            {
                errorMessageHansMap.put('detail_f_ljgl_tbl_ld_pllhyl_modallist', '必须是数字');
            }


            if (tbl_ld_pllhyl_modallist.f_nljgl.length > 200)
            {
                errorMessageHansMap.put('detail_f_nljgl_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_pllhyl_modallist.f_nljgl.length != "" && !/^[0-9]+\.?[0-9]*$/.test(tbl_ld_pllhyl_modallist.f_nljgl))
            {
                errorMessageHansMap.put('detail_f_nljgl_tbl_ld_pllhyl_modallist', '必须是数字');
            }


            if (tbl_ld_pllhyl_modallist.f_sbzt.length > 200)
            {
                errorMessageHansMap.put('detail_f_sbzt_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pllhyl_modallist.f_sbkj.length > 200)
            {
                errorMessageHansMap.put('detail_f_sbkj_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pllhyl_modallist.f_bqzm.length > 200)
            {
                errorMessageHansMap.put('detail_f_bqzm_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_pllhyl_modallist.f_bqzm.length != "" && !/^[0-9]+\.?[0-9]*$/.test(tbl_ld_pllhyl_modallist.f_bqzm))
            {
                errorMessageHansMap.put('detail_f_bqzm_tbl_ld_pllhyl_modallist', '必须是数字');
            }


            if (tbl_ld_pllhyl_modallist.f_bqsl.length > 200)
            {
                errorMessageHansMap.put('detail_f_bqsl_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_pllhyl_modallist.f_bqsl.length != "" && !/^[0-9]+\.?[0-9]*$/.test(tbl_ld_pllhyl_modallist.f_bqsl))
            {
                errorMessageHansMap.put('detail_f_bqsl_tbl_ld_pllhyl_modallist', '必须是数字');
            }





            if (tbl_ld_pllhyl_modallist.f_sbfj.length > 4000)
            {
                errorMessageHansMap.put('detail_f_sbfj_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">4000</a>个字');
            }




            if (tbl_ld_pllhyl_modallist.f_sblx.length > 200)
            {
                errorMessageHansMap.put('detail_f_sblx_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }


            if (tbl_ld_pllhyl_modallist.f_sblx.length < 1)
            {
                errorMessageHansMap.put('detail_f_sblx_tbl_ld_pllhyl_modallist', '长度不能小于<a style="color:red">1</a>个字');
            }

            if (tbl_ld_pllhyl_modallist.f_sqzm.length > 200)
            {
                errorMessageHansMap.put('detail_f_sqzm_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }
            if (tbl_ld_pllhyl_modallist.f_sqzm.length != "" && !/^[0-9]+\.?[0-9]*$/.test(tbl_ld_pllhyl_modallist.f_sqzm))
            {
                errorMessageHansMap.put('detail_f_sqzm_tbl_ld_pllhyl_modallist', '必须是数字');
            }



            if (tbl_ld_pllhyl_modallist.f_qsqpjsl.length > 200)
            {
                errorMessageHansMap.put('detail_f_qsqpjsl_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_pllhyl_modallist.f_qsqpjsl.length != "" && !/^[0-9]+\.?[0-9]*$/.test(tbl_ld_pllhyl_modallist.f_qsqpjsl))
            {
                errorMessageHansMap.put('detail_f_qsqpjsl_tbl_ld_pllhyl_modallist', '必须是数字');
            }


            if (tbl_ld_pllhyl_modallist.f_synx.length > 200)
            {
                errorMessageHansMap.put('detail_f_synx_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_pllhyl_modallist.f_synx.length != "" && !/^[0-9]+\.?[0-9]*$/.test(tbl_ld_pllhyl_modallist.f_synx))
            {
                errorMessageHansMap.put('detail_f_synx_tbl_ld_pllhyl_modallist', '必须是数字');
            }


            if (tbl_ld_pllhyl_modallist.f_sbbz.length > 200)
            {
                errorMessageHansMap.put('detail_f_sbbz_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_pllhyl_modallist.f_jllx.length > 200)
            {
                errorMessageHansMap.put('detail_f_jllx_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_pllhyl_modallist.f_jllx.length < 1)
            {
                errorMessageHansMap.put('detail_f_jllx_tbl_ld_pllhyl_modallist', '长度不能小于<a style="color:red">1</a>个字');
            }


            if (tbl_ld_pllhyl_modallist.f_sqsl.length > 200)
            {
                errorMessageHansMap.put('detail_f_sqsl_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }
            if (tbl_ld_pllhyl_modallist.f_sqsl.length != "" && !/^[0-9]+\.?[0-9]*$/.test(tbl_ld_pllhyl_modallist.f_sqsl))
            {
                errorMessageHansMap.put('detail_f_sqsl_tbl_ld_pllhyl_modallist', '必须是数字');
            }



            if (tbl_ld_pllhyl_modallist.f_qlqpjsl.length > 200)
            {
                errorMessageHansMap.put('detail_f_qlqpjsl_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_pllhyl_modallist.f_qlqpjsl.length != "" && !/^[0-9]+\.?[0-9]*$/.test(tbl_ld_pllhyl_modallist.f_qlqpjsl))
            {
                errorMessageHansMap.put('detail_f_qlqpjsl_tbl_ld_pllhyl_modallist', '必须是数字');
            }


            if (tbl_ld_pllhyl_modallist.f_qfzt.length > 200)
            {
                errorMessageHansMap.put('detail_f_qfzt_tbl_ld_pllhyl_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }


            if (errorMessageHansMap.keys().length > 0)
            {
                _validateMessage_detail.show(errorMessageHansMap, errorMessagePlacementHansMap, true);
                callBackFunction.fail('');
            }
            else
            {
                _validateMessage_detail.hidden();
                callBackFunction.success(tbl_ld_pllhyl_modallist);
            }
        }
        catch (ex)
        {
            callBackFunction.fail(ex.message);
        }
    },

    /* 
    *  
    *  方法:clearDetailModel
    *  参数:tbl_ld_pllhyl_modallist
    *  清空数据对象
    */
    clearDetailModel = function (tbl_ld_pllhyl_modallist)
    {


        tbl_ld_pllhyl_modallist.f_value1 = '';
        controlObj.text('detail_f_value1_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_value1);

        tbl_ld_pllhyl_modallist.f_value2 = '';
        controlObj.text('detail_f_value2_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_value2);

        tbl_ld_pllhyl_modallist.f_value3 = '';
        controlObj.text('detail_f_value3_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_value3);

        tbl_ld_pllhyl_modallist.f_value4 = '';
        controlObj.text('detail_f_value4_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_value4);

        tbl_ld_pllhyl_modallist.f_value5 = '';
        controlObj.text('detail_f_value5_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_value5);

        tbl_ld_pllhyl_modallist.f_value6 = '';
        controlObj.text('detail_f_value6_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_value6);

        tbl_ld_pllhyl_modallist.f_value7 = '';
        controlObj.text('detail_f_value7_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_value7);

        tbl_ld_pllhyl_modallist.f_value8 = '';
        controlObj.text('detail_f_value8_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_value8);

        tbl_ld_pllhyl_modallist.f_value9 = '';
        controlObj.text('detail_f_value9_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_value9);

        tbl_ld_pllhyl_modallist.f_value10 = '';
        controlObj.text('detail_f_value10_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_value10);

        tbl_ld_pllhyl_modallist.f_yzqk = '';
        controlObj.toggle('detail_f_yzqk_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_yzqk);

        tbl_ld_pllhyl_modallist.f_khbh = '';
        controlObj.text('detail_f_khbh_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_khbh);

        tbl_ld_pllhyl_modallist.f_ycje = '';
        controlObj.text('detail_f_ycje_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_ycje);

        tbl_ld_pllhyl_modallist.f_tbbh = '';
        controlObj.text('detail_f_tbbh_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_tbbh);

        tbl_ld_pllhyl_modallist.f_khzt = '';
        tbl_ld_pllhyl_modallist.f_khztid = '';
        controlObj.singledropdownlistid('detail_f_khzt_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_khztid);

        tbl_ld_pllhyl_modallist.f_ztkhh = '';
        controlObj.text('detail_f_ztkhh_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_ztkhh);

        tbl_ld_pllhyl_modallist.f_djjzsf = '';
        controlObj.text('detail_f_djjzsf_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_djjzsf);

        tbl_ld_pllhyl_modallist.f_sfjlbjf = '';
        controlObj.toggle('detail_f_sfjlbjf_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_sfjlbjf);

        tbl_ld_pllhyl_modallist.f_sqysl = '';
        controlObj.text('detail_f_sqysl_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_sqysl);

        tbl_ld_pllhyl_modallist.f_khfz = '';
        tbl_ld_pllhyl_modallist.f_khfzid = '';
        controlObj.multidropdownlistid('detail_f_khfz_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_khfzid);

        tbl_ld_pllhyl_modallist.f_djjzpwf = '';
        controlObj.text('detail_f_djjzpwf_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_djjzpwf);

        tbl_ld_pllhyl_modallist.f_ickljgl = '';
        controlObj.text('detail_f_ickljgl_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_ickljgl);

        tbl_ld_pllhyl_modallist.f_jhysl = '';
        controlObj.text('detail_f_jhysl_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_jhysl);

        tbl_ld_pllhyl_modallist.f_yslx = '';
        tbl_ld_pllhyl_modallist.f_yslxid = '';
        controlObj.singledropdownlistid('detail_f_yslx_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_yslxid);

        tbl_ld_pllhyl_modallist.f_ljqf = '';
        controlObj.text('detail_f_ljqf_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_ljqf);


        tbl_ld_pllhyl_modallist.f_zhcbrq = '1900-01-01';
        controlObj.datetime('detail_f_zhcbrq_tbl_ld_pllhyl_modallist_date', 'detail_f_zhcbrq_tbl_ld_pllhyl_modallist_time', tbl_ld_pllhyl_modallist.f_zhcbrq);

        tbl_ld_pllhyl_modallist.f_khbz = '';
        controlObj.text('detail_f_khbz_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_khbz);

        tbl_ld_pllhyl_modallist.f_cbbh = '';
        tbl_ld_pllhyl_modallist.f_cbbhid = '';
        controlObj.singledropdownlistid('detail_f_cbbh_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_cbbhid);

        tbl_ld_pllhyl_modallist.f_cbxh = '';
        controlObj.text('detail_f_cbxh_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_cbxh);

        tbl_ld_pllhyl_modallist.f_cbmc = '';
        controlObj.text('detail_f_cbmc_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_cbmc);

        tbl_ld_pllhyl_modallist.f_cbzq = '';
        controlObj.text('detail_f_cbzq_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_cbzq);

        tbl_ld_pllhyl_modallist.f_cbyxm = '';
        tbl_ld_pllhyl_modallist.f_cbyxmid = '';
        controlObj.singledropdownlistid('detail_f_cbyxm_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_cbyxmid);

        tbl_ld_pllhyl_modallist.f_yhbh = '';
        controlObj.text('detail_f_yhbh_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_yhbh);

        tbl_ld_pllhyl_modallist.f_dh = '';
        controlObj.text('detail_f_dh_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_dh);

        tbl_ld_pllhyl_modallist.f_jyhh = '';
        controlObj.text('detail_f_jyhh_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_jyhh);

        tbl_ld_pllhyl_modallist.f_yhfz = '';
        tbl_ld_pllhyl_modallist.f_yhfzid = '';
        controlObj.multidropdownlistid('detail_f_yhfz_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_yhfzid);

        tbl_ld_pllhyl_modallist.f_yhm = '';
        controlObj.text('detail_f_yhm_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_yhm);

        tbl_ld_pllhyl_modallist.f_dz = '';
        controlObj.text('detail_f_dz_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_dz);

        tbl_ld_pllhyl_modallist.f_jfm = '';
        controlObj.text('detail_f_jfm_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_jfm);

        tbl_ld_pllhyl_modallist.f_dy = '';
        tbl_ld_pllhyl_modallist.f_dyid = '';
        controlObj.singledropdownlistid('detail_f_dy_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_dyid);


        tbl_ld_pllhyl_modallist.f_khrq = '1900-01-01';
        controlObj.datetime('detail_f_khrq_tbl_ld_pllhyl_modallist_date', 'detail_f_khrq_tbl_ld_pllhyl_modallist_time', tbl_ld_pllhyl_modallist.f_khrq);

        tbl_ld_pllhyl_modallist.f_htbh = '';
        controlObj.text('detail_f_htbh_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_htbh);

        tbl_ld_pllhyl_modallist.f_htfj = '';
        controlObj.fileuploaderbind('detail_f_htfj_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_htfj);

        tbl_ld_pllhyl_modallist.f_sfzzs = '';
        controlObj.toggle('detail_f_sfzzs_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_sfzzs);

        tbl_ld_pllhyl_modallist.f_sc = '';
        tbl_ld_pllhyl_modallist.f_scid = '';
        controlObj.singledropdownlistid('detail_f_sc_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_scid);

        tbl_ld_pllhyl_modallist.f_sfts = '';
        controlObj.toggle('detail_f_sfts_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_sfts);


        tbl_ld_pllhyl_modallist.f_htqdrq = '1900-01-01';
        controlObj.datetime('detail_f_htqdrq_tbl_ld_pllhyl_modallist_date', 'detail_f_htqdrq_tbl_ld_pllhyl_modallist_time', tbl_ld_pllhyl_modallist.f_htqdrq);

        tbl_ld_pllhyl_modallist.f_qtfj = '';
        controlObj.fileuploaderbind('detail_f_qtfj_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_qtfj);

        tbl_ld_pllhyl_modallist.f_yhzt = '';
        tbl_ld_pllhyl_modallist.f_yhztid = '';
        controlObj.singledropdownlistid('detail_f_yhzt_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_yhztid);

        tbl_ld_pllhyl_modallist.f_qy = '';
        tbl_ld_pllhyl_modallist.f_qyid = '';
        controlObj.singledropdownlistid('detail_f_qy_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_qyid);

        tbl_ld_pllhyl_modallist.f_tsyx = '';
        tbl_ld_pllhyl_modallist.f_tsyxid = '';
        controlObj.singledropdownlistid('detail_f_tsyx_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_tsyxid);

        tbl_ld_pllhyl_modallist.f_sfzh = '';
        controlObj.text('detail_f_sfzh_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_sfzh);

        tbl_ld_pllhyl_modallist.f_sfzfj = '';
        controlObj.fileuploaderbind('detail_f_sfzfj_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_sfzfj);

        tbl_ld_pllhyl_modallist.f_yhbz = '';
        controlObj.text('detail_f_yhbz_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_yhbz);

        tbl_ld_pllhyl_modallist.f_pq = '';
        tbl_ld_pllhyl_modallist.f_pqid = '';
        controlObj.singledropdownlistid('detail_f_pq_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_pqid);

        tbl_ld_pllhyl_modallist.f_tsyxzh = '';
        controlObj.text('detail_f_tsyxzh_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_tsyxzh);

        tbl_ld_pllhyl_modallist.f_sbbh = '';
        controlObj.text('detail_f_sbbh_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_sbbh);

        tbl_ld_pllhyl_modallist.f_sbpp = '';
        controlObj.text('detail_f_sbpp_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_sbpp);

        tbl_ld_pllhyl_modallist.f_ztsbh = '';
        controlObj.text('detail_f_ztsbh_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_ztsbh);

        tbl_ld_pllhyl_modallist.f_mph = '';
        controlObj.text('detail_f_mph_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_mph);

        tbl_ld_pllhyl_modallist.f_lxth = '';
        controlObj.text('detail_f_lxth_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_lxth);

        tbl_ld_pllhyl_modallist.f_sbdz = '';
        controlObj.text('detail_f_sbdz_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_sbdz);

        tbl_ld_pllhyl_modallist.f_sbfz = '';
        tbl_ld_pllhyl_modallist.f_sbfzid = '';
        controlObj.multidropdownlistid('detail_f_sbfz_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_sbfzid);

        tbl_ld_pllhyl_modallist.f_rs = '';
        controlObj.text('detail_f_rs_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_rs);

        tbl_ld_pllhyl_modallist.f_cszm = '';
        controlObj.text('detail_f_cszm_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_cszm);

        tbl_ld_pllhyl_modallist.f_ljgl = '';
        controlObj.text('detail_f_ljgl_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_ljgl);

        tbl_ld_pllhyl_modallist.f_nljgl = '';
        controlObj.text('detail_f_nljgl_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_nljgl);

        tbl_ld_pllhyl_modallist.f_sbzt = '';
        tbl_ld_pllhyl_modallist.f_sbztid = '';
        controlObj.singledropdownlistid('detail_f_sbzt_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_sbztid);

        tbl_ld_pllhyl_modallist.f_sbkj = '';
        tbl_ld_pllhyl_modallist.f_sbkjid = '';
        controlObj.singledropdownlistid('detail_f_sbkj_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_sbkjid);

        tbl_ld_pllhyl_modallist.f_bqzm = '';
        controlObj.text('detail_f_bqzm_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_bqzm);

        tbl_ld_pllhyl_modallist.f_bqsl = '';
        controlObj.text('detail_f_bqsl_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_bqsl);


        tbl_ld_pllhyl_modallist.f_azrq = '1900-01-01';
        controlObj.datetime('detail_f_azrq_tbl_ld_pllhyl_modallist_date', 'detail_f_azrq_tbl_ld_pllhyl_modallist_time', tbl_ld_pllhyl_modallist.f_azrq);

        tbl_ld_pllhyl_modallist.f_sbfj = '';
        controlObj.fileuploaderbind('detail_f_sbfj_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_sbfj);

        tbl_ld_pllhyl_modallist.f_sblx = '';
        tbl_ld_pllhyl_modallist.f_sblxid = '';
        controlObj.singledropdownlistid('detail_f_sblx_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_sblxid);

        tbl_ld_pllhyl_modallist.f_sqzm = '';
        controlObj.text('detail_f_sqzm_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_sqzm);

        tbl_ld_pllhyl_modallist.f_qsqpjsl = '';
        controlObj.text('detail_f_qsqpjsl_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_qsqpjsl);

        tbl_ld_pllhyl_modallist.f_synx = '';
        controlObj.text('detail_f_synx_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_synx);

        tbl_ld_pllhyl_modallist.f_sbbz = '';
        controlObj.text('detail_f_sbbz_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_sbbz);

        tbl_ld_pllhyl_modallist.f_jllx = '';
        tbl_ld_pllhyl_modallist.f_jllxid = '';
        controlObj.singledropdownlistid('detail_f_jllx_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_jllxid);

        tbl_ld_pllhyl_modallist.f_sqsl = '';
        controlObj.text('detail_f_sqsl_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_sqsl);

        tbl_ld_pllhyl_modallist.f_qlqpjsl = '';
        controlObj.text('detail_f_qlqpjsl_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_qlqpjsl);

        tbl_ld_pllhyl_modallist.f_qfzt = '';
        controlObj.toggle('detail_f_qfzt_tbl_ld_pllhyl_modallist', tbl_ld_pllhyl_modallist.f_qfzt);


    },

    //=============================数据操作===================================
    /* 
    *  
    *  方法:getDetailData
    *  参数:callBackFunction
    *  从数据库获取数据，根据_gridEditId ，返回数据对象
    */
    getDetailData = function (callBackFunction)
    {

        var whereClause = ' sys_id = \'' + _gridEditId + '\'';
        var orderByString = '';
        var columnsString = 'f_value1^f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^f_khbh^f_ztkhh^f_khfz^f_khfzid^f_yslx^f_yslxid^f_ycje^f_djjzsf^f_djjzpwf^f_ljqf^f_tbbh^f_sfjlbjf^f_ickljgl^f_zhcbrq^f_khzt^f_khztid^f_sqysl^f_jhysl^f_khbz^f_cbbh^f_cbbhid^f_cbmc^f_cbyxm^f_cbyxmid^f_cbxh^f_cbzq^f_sbbh^f_ztsbh^f_lxth^f_sbfz^f_sbfzid^f_sbpp^f_mph^f_sbdz^f_rs^f_sbkj^f_sbkjid^f_sblx^f_sblxid^f_jllx^f_jllxid^f_cszm^f_bqzm^f_sqzm^f_sqsl^f_ljgl^f_bqsl^f_qsqpjsl^f_qlqpjsl^f_nljgl^f_azrq^f_synx^f_qfzt^f_sbzt^f_sbztid^f_sbfj^f_sbbz^f_yhbh^f_jyhh^f_yhm^f_jfm^f_dh^f_yhfz^f_yhfzid^f_dz^f_dy^f_dyid^f_sc^f_scid^f_qy^f_qyid^f_pq^f_pqid^f_khrq^f_sfts^f_tsyxzh^f_htbh^f_htfj^f_sfzh^f_sfzfj^f_htqdrq^f_qtfj^f_tsyx^f_tsyxid^f_sfzzs^f_yhzt^f_yhztid^f_yhbz^f_yzqk^sys_id';

        var data = {
            whereString: whereClause,
            orderByString: orderByString,
            columnsString: columnsString,
            pageSizeString: '',
            pageIndexString: '',
            clientInf: _clientInf
        };
        doAjaxFunction(_serviceUrl, 'GetList', data, {
            success: function (result)
            {
                try
                {
                    var messageJson = (new Function("", "return " + result))();
                    callBackFunction.success(messageJson.rows[0]);
                }
                catch (ex)
                {
                    _blockMessage.show('getDetailData执行失败。<br/>' + ex.message, 'fail');
                }
            },
            fail: function (message)
            {
                _blockMessage.show('getDetailData执行失败<br/>' + message, 'fail');
            }
        });


    },

    /* 
    *  
    *  方法:updateDetailData
    *  参数:tbl_ld_pllhyl_modallist, callbackFunction
    *  根据传入的数据对象，更新数据
    */
    updateDetailData = function (tbl_ld_pllhyl_modallist, callbackFunction)
    {
        var d = new Date();
        var columns = 'f_value1^f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^f_khbh^f_ztkhh^f_khfz^f_khfzid^f_yslx^f_yslxid^f_ycje^f_djjzsf^f_djjzpwf^f_ljqf^f_tbbh^f_sfjlbjf^f_ickljgl^f_zhcbrq^f_khzt^f_khztid^f_sqysl^f_jhysl^f_khbz^f_cbbh^f_cbbhid^f_cbmc^f_cbyxm^f_cbyxmid^f_cbxh^f_cbzq^f_sbbh^f_ztsbh^f_lxth^f_sbfz^f_sbfzid^f_sbpp^f_mph^f_sbdz^f_rs^f_sbkj^f_sbkjid^f_sblx^f_sblxid^f_jllx^f_jllxid^f_cszm^f_bqzm^f_sqzm^f_sqsl^f_ljgl^f_bqsl^f_qsqpjsl^f_qlqpjsl^f_nljgl^f_azrq^f_synx^f_qfzt^f_sbzt^f_sbztid^f_sbfj^f_sbbz^f_yhbh^f_jyhh^f_yhm^f_jfm^f_dh^f_yhfz^f_yhfzid^f_dz^f_dy^f_dyid^f_sc^f_scid^f_qy^f_qyid^f_pq^f_pqid^f_khrq^f_sfts^f_tsyxzh^f_htbh^f_htfj^f_sfzh^f_sfzfj^f_htqdrq^f_qtfj^f_tsyx^f_tsyxid^f_sfzzs^f_yhzt^f_yhztid^f_yhbz^f_yzqk^sys_id^sys_lastedituserid^sys_lasteditusername^sys_lasteditdate';
        var json = {
            sys_id: _gridEditId,


            f_value1: tbl_ld_pllhyl_modallist.f_value1,

            f_value2: tbl_ld_pllhyl_modallist.f_value2,

            f_value3: tbl_ld_pllhyl_modallist.f_value3,

            f_value4: tbl_ld_pllhyl_modallist.f_value4,

            f_value5: tbl_ld_pllhyl_modallist.f_value5,

            f_value6: tbl_ld_pllhyl_modallist.f_value6,

            f_value7: tbl_ld_pllhyl_modallist.f_value7,

            f_value8: tbl_ld_pllhyl_modallist.f_value8,

            f_value9: tbl_ld_pllhyl_modallist.f_value9,

            f_value10: tbl_ld_pllhyl_modallist.f_value10,

            f_yzqk: "false",

            f_khbh: tbl_ld_pllhyl_modallist.f_khbh,

            f_ycje: tbl_ld_pllhyl_modallist.f_ycje,

            f_tbbh: tbl_ld_pllhyl_modallist.f_tbbh,

            f_khzt: tbl_ld_pllhyl_modallist.f_khzt,
            f_khztid: tbl_ld_pllhyl_modallist.f_khztid,

            f_ztkhh: tbl_ld_pllhyl_modallist.f_ztkhh,

            f_djjzsf: tbl_ld_pllhyl_modallist.f_djjzsf,

            f_sfjlbjf: tbl_ld_pllhyl_modallist.f_sfjlbjf,

            f_sqysl: tbl_ld_pllhyl_modallist.f_sqysl,

            f_khfz: tbl_ld_pllhyl_modallist.f_khfz,
            f_khfzid: tbl_ld_pllhyl_modallist.f_khfzid,

            f_djjzpwf: tbl_ld_pllhyl_modallist.f_djjzpwf,

            f_ickljgl: tbl_ld_pllhyl_modallist.f_ickljgl,

            f_jhysl: tbl_ld_pllhyl_modallist.f_jhysl,

            f_yslx: tbl_ld_pllhyl_modallist.f_yslx,
            f_yslxid: tbl_ld_pllhyl_modallist.f_yslxid,

            f_ljqf: tbl_ld_pllhyl_modallist.f_ljqf,

            f_zhcbrq: tbl_ld_pllhyl_modallist.f_zhcbrq,

            f_khbz: tbl_ld_pllhyl_modallist.f_khbz,

            f_cbbh: tbl_ld_pllhyl_modallist.f_cbbh,
            f_cbbhid: tbl_ld_pllhyl_modallist.f_cbbhid,

            f_cbxh: tbl_ld_pllhyl_modallist.f_cbxh,

            f_cbmc: tbl_ld_pllhyl_modallist.f_cbmc,

            f_cbzq: tbl_ld_pllhyl_modallist.f_cbzq,

            f_cbyxm: tbl_ld_pllhyl_modallist.f_cbyxm,
            f_cbyxmid: tbl_ld_pllhyl_modallist.f_cbyxmid,

            f_yhbh: tbl_ld_pllhyl_modallist.f_yhbh,

            f_dh: tbl_ld_pllhyl_modallist.f_dh,

            f_jyhh: tbl_ld_pllhyl_modallist.f_jyhh,

            f_yhfz: tbl_ld_pllhyl_modallist.f_yhfz,
            f_yhfzid: tbl_ld_pllhyl_modallist.f_yhfzid,

            f_yhm: tbl_ld_pllhyl_modallist.f_yhm,

            f_dz: tbl_ld_pllhyl_modallist.f_dz,

            f_jfm: tbl_ld_pllhyl_modallist.f_jfm,

            f_dy: tbl_ld_pllhyl_modallist.f_dy,
            f_dyid: tbl_ld_pllhyl_modallist.f_dyid,

            f_khrq: tbl_ld_pllhyl_modallist.f_khrq,

            f_htbh: tbl_ld_pllhyl_modallist.f_htbh,


            f_htfj: tbl_ld_pllhyl_modallist.f_htfj,

            f_sfzzs: tbl_ld_pllhyl_modallist.f_sfzzs,

            f_sc: tbl_ld_pllhyl_modallist.f_sc,
            f_scid: tbl_ld_pllhyl_modallist.f_scid,

            f_sfts: tbl_ld_pllhyl_modallist.f_sfts,

            f_htqdrq: tbl_ld_pllhyl_modallist.f_htqdrq,


            f_qtfj: tbl_ld_pllhyl_modallist.f_qtfj,

            f_yhzt: tbl_ld_pllhyl_modallist.f_yhzt,
            f_yhztid: tbl_ld_pllhyl_modallist.f_yhztid,

            f_qy: tbl_ld_pllhyl_modallist.f_qy,
            f_qyid: tbl_ld_pllhyl_modallist.f_qyid,

            f_tsyx: tbl_ld_pllhyl_modallist.f_tsyx,
            f_tsyxid: tbl_ld_pllhyl_modallist.f_tsyxid,

            f_sfzh: tbl_ld_pllhyl_modallist.f_sfzh,


            f_sfzfj: tbl_ld_pllhyl_modallist.f_sfzfj,

            f_yhbz: tbl_ld_pllhyl_modallist.f_yhbz,

            f_pq: tbl_ld_pllhyl_modallist.f_pq,
            f_pqid: tbl_ld_pllhyl_modallist.f_pqid,

            f_tsyxzh: tbl_ld_pllhyl_modallist.f_tsyxzh,

            f_sbbh: tbl_ld_pllhyl_modallist.f_sbbh,

            f_sbpp: tbl_ld_pllhyl_modallist.f_sbpp,

            f_ztsbh: tbl_ld_pllhyl_modallist.f_ztsbh,

            f_mph: tbl_ld_pllhyl_modallist.f_mph,

            f_lxth: tbl_ld_pllhyl_modallist.f_lxth,

            f_sbdz: tbl_ld_pllhyl_modallist.f_sbdz,

            f_sbfz: tbl_ld_pllhyl_modallist.f_sbfz,
            f_sbfzid: tbl_ld_pllhyl_modallist.f_sbfzid,

            f_rs: tbl_ld_pllhyl_modallist.f_rs,

            f_cszm: tbl_ld_pllhyl_modallist.f_cszm,

            f_ljgl: tbl_ld_pllhyl_modallist.f_ljgl,

            f_nljgl: tbl_ld_pllhyl_modallist.f_nljgl,

            f_sbzt: tbl_ld_pllhyl_modallist.f_sbzt,
            f_sbztid: tbl_ld_pllhyl_modallist.f_sbztid,

            f_sbkj: tbl_ld_pllhyl_modallist.f_sbkj,
            f_sbkjid: tbl_ld_pllhyl_modallist.f_sbkjid,

            f_bqzm: tbl_ld_pllhyl_modallist.f_bqzm,

            f_bqsl: tbl_ld_pllhyl_modallist.f_bqsl,

            f_azrq: tbl_ld_pllhyl_modallist.f_azrq,


            f_sbfj: tbl_ld_pllhyl_modallist.f_sbfj,

            f_sblx: tbl_ld_pllhyl_modallist.f_sblx,
            f_sblxid: tbl_ld_pllhyl_modallist.f_sblxid,

            f_sqzm: tbl_ld_pllhyl_modallist.f_sqzm,

            f_qsqpjsl: tbl_ld_pllhyl_modallist.f_qsqpjsl,

            f_synx: tbl_ld_pllhyl_modallist.f_synx,

            f_sbbz: tbl_ld_pllhyl_modallist.f_sbbz,

            f_jllx: tbl_ld_pllhyl_modallist.f_jllx,
            f_jllxid: tbl_ld_pllhyl_modallist.f_jllxid,

            f_sqsl: tbl_ld_pllhyl_modallist.f_sqsl,

            f_qlqpjsl: tbl_ld_pllhyl_modallist.f_qlqpjsl,

            f_qfzt: tbl_ld_pllhyl_modallist.f_qfzt,


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
                callbackFunction.success(tbl_ld_pllhyl_modallist);
            },
            fail: function (message)
            {
                callbackFunction.fail(message);
            },
            error: function (message)
            {
                _blockMessage.show(_serviceUrl + 'Update<br/>' + message, 'fail');
            }
        });
    },

        /* 
        *  
        *  方法:addDetailData
        *  参数: callbackFunction
        *  新建数据
        */
    addDetailData = function (callBackFunction)
    {
        var d = new Date();
        var json = {


            f_value1: '',


            f_value2: '',


            f_value3: '',


            f_value4: '',


            f_value5: '',


            f_value6: '',


            f_value7: '',


            f_value8: '',


            f_value9: '',


            f_value10: '',

            f_yzqk: '',


            f_khbh: '',


            f_ycje: '',


            f_tbbh: '',

            f_khztid: '',


            f_ztkhh: '',


            f_djjzsf: '',

            f_sfjlbjf: '',


            f_sqysl: '',

            f_khfzid: '',


            f_djjzpwf: '',


            f_ickljgl: '',


            f_jhysl: '',

            f_yslxid: '',


            f_ljqf: '',

            f_zhcbrq: '1900-01-01 00:00:00',


            f_khbz: '',

            f_cbbhid: '',


            f_cbxh: '',


            f_cbmc: '',


            f_cbzq: '',

            f_cbyxmid: '',


            f_yhbh: '',


            f_dh: '',


            f_jyhh: '',

            f_yhfzid: '',


            f_yhm: '',


            f_dz: '',


            f_jfm: '',

            f_dyid: '',

            f_khrq: '1900-01-01 00:00:00',


            f_htbh: '',

            f_htfj: controlObj.fileuploadernewfileid(),

            f_sfzzs: '',

            f_scid: '',

            f_sfts: '',

            f_htqdrq: '1900-01-01 00:00:00',

            f_qtfj: controlObj.fileuploadernewfileid(),

            f_yhztid: '',

            f_qyid: '',

            f_tsyxid: '',


            f_sfzh: '',

            f_sfzfj: controlObj.fileuploadernewfileid(),


            f_yhbz: '',

            f_pqid: '',


            f_tsyxzh: '',


            f_sbbh: '',


            f_sbpp: '',


            f_ztsbh: '',


            f_mph: '',


            f_lxth: '',


            f_sbdz: '',

            f_sbfzid: '',


            f_rs: '',


            f_cszm: '',


            f_ljgl: '',


            f_nljgl: '',

            f_sbztid: '',

            f_sbkjid: '',


            f_bqzm: '',


            f_bqsl: '',

            f_azrq: '1900-01-01 00:00:00',

            f_sbfj: controlObj.fileuploadernewfileid(),

            f_sblxid: '',


            f_sqzm: '',


            f_qsqpjsl: '',


            f_synx: '',


            f_sbbz: '',

            f_jllxid: '',


            f_sqsl: '',


            f_qlqpjsl: '',

            f_qfzt: 'false',


            fk_tbl_ld_pllhlb_sys_id: that._pr_fk_tbl_ld_pllhlb_sys_id,

            sys_delflag: '0',
            sys_lasteditusername: basePageObj._userInfoJson.sys_username,
            sys_lastedituserid: basePageObj._userInfoJson.sys_userid,
            sys_lasteditdate: d.Format('yyyy-MM-dd hh:mm:ss'),
            sys_creatdate: d.Format('yyyy-MM-dd hh:mm:ss'),
            sys_creatusername: basePageObj._userInfoJson.sys_username,
            sys_creatuserid: basePageObj._userInfoJson.sys_userid
        };
        var data = {
            json: JSON.stringify(json),
            clientInf: _clientInf
        }
        doAjaxFunction(_serviceUrl, 'Add', data, {
            success: function (result)
            {
                _gridEditId = result;
                that.bindGrid(false, {
                    success: function ()
                    {
                        getDetailData({
                            success: function (tbl_ld_pllhyl_modallist)
                            {
                                setDetailModel(tbl_ld_pllhyl_modallist, {
                                    success: function ()
                                    {
                                        $('#div_detail_modal_tbl_ld_pllhyl_modallist').modal('show');
                                        callBackFunction.success();
                                    },
                                    fail: function (message)
                                    {
                                        callBackFunction.fail('setDetailModel:' + message);
                                    }
                                });
                            },
                            fail: function (message)
                            {
                                callBackFunction.fail('getDetailData:' + message);
                            }
                        });
                    },
                    fail: function (message)
                    {
                        callBackFunction.fail('bindGrid:' + message);
                    }
                });
            },
            fail: function (message)
            {
                callBackFunction.fail('Add:' + message);
            }
        });
    },
    //=============================控件事件===================================





          		getArea = function (id, callbackFunction)
          		{
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
          		        success: function (messageJson)
          		        {

          		            callbackFunction.success(messageJson["tbl_ldbm_dycq"]);

          		        },
          		        fail: function (message)
          		        {
          		        }
          		    })
          		},



 /*  
*  方法:f_dy_onchange
*  参数:changeEventParameter
*  地域onchange事件
*/
    f_dy_onchange = function (e, callbackfunction)
    {
        //// 

        if (e.added != undefined)
        {
            var nodeid = e.added.id;
            getArea(nodeid, {
                success: function (jsonArray)
                {

                    controlObj.singledropdownlistinit('detail_f_sc_tbl_ld_pllhyl_modallist', jsonArray, f_sc_onchange);
                    controlObj.singledropdownlistid('detail_f_sc_tbl_ld_pllhyl_modallist', '-1');
                    controlObj.singledropdownlist('detail_f_sc_tbl_ld_pllhyl_modallist', '');


                    if (callbackfunction != undefined)
                    {
                        callbackfunction.success();
                    }
                    else
                    {
                        controlObj.singledropdownlistinit('detail_f_qy_tbl_ld_pllhyl_modallist', _baseCodeHashMap.get('codeservice_0514'), f_qy_onchange);
                        controlObj.singledropdownlistid('detail_f_qy_tbl_ld_pllhyl_modallist', '-1');
                        controlObj.singledropdownlist('detail_f_qy_tbl_ld_pllhyl_modallist', '');

                        controlObj.singledropdownlistinit('detail_f_pq_tbl_ld_pllhyl_modallist', _baseCodeHashMap.get('codeservice_0515'), f_pq_onchange);
                        controlObj.singledropdownlistid('detail_f_pq_tbl_ld_pllhyl_modallist', '-1');
                        controlObj.singledropdownlist('detail_f_pq_tbl_ld_pllhyl_modallist', '');

                    }
                }
            })
        }
        else
        {
            controlObj.singledropdownlistinit('detail_f_sc_tbl_ld_pllhyl_modallist', _baseCodeHashMap.get('codeservice_0513'), f_sc_onchange);
            controlObj.singledropdownlistid('detail_f_sc_tbl_ld_pllhyl_modallist', '-1');
            controlObj.singledropdownlist('detail_f_sc_tbl_ld_pllhyl_modallist', '');


            controlObj.singledropdownlistinit('detail_f_qy_tbl_ld_pllhyl_modallist', _baseCodeHashMap.get('codeservice_0514'), f_qy_onchange);
            controlObj.singledropdownlistid('detail_f_qy_tbl_ld_pllhyl_modallist', '-1');
            controlObj.singledropdownlist('detail_f_qy_tbl_ld_pllhyl_modallist', '');

            controlObj.singledropdownlistinit('detail_f_pq_tbl_ld_pllhyl_modallist', _baseCodeHashMap.get('codeservice_0515'), f_pq_onchange);
            controlObj.singledropdownlistid('detail_f_pq_tbl_ld_pllhyl_modallist', '-1');
            controlObj.singledropdownlist('detail_f_pq_tbl_ld_pllhyl_modallist', '');
        }


    },

     /*  
*  方法:f_dycx_onchange
*  参数:changeEventParameter
*  地域onchange事件
*/
    f_dycx_onchange = function (e, callbackfunction)
    {
        //// 
        if (e.added != undefined)
        {
            var nodeid = e.added.id;
            getArea(nodeid, {
                success: function (jsonArray)
                {

                    controlObj.singledropdownlistinit('search_f_sc_tbl_ld_pllhyl_modallist', jsonArray, f_sc_onchange);
                    controlObj.singledropdownlistid('search_f_sc_tbl_ld_pllhyl_modallist', '-1');
                    controlObj.singledropdownlist('search_f_sc_tbl_ld_pllhyl_modallist', '');


                    if (callbackfunction != undefined)
                    {
                        callbackfunction.success();
                    }
                    else
                    {
                        controlObj.singledropdownlistinit('search_f_qy_tbl_ld_pllhyl_modallist', _baseCodeHashMap.get('codeservice_0514'), f_qy_onchange);
                        controlObj.singledropdownlistid('search_f_qy_tbl_ld_pllhyl_modallist', '-1');
                        controlObj.singledropdownlist('search_f_qy_tbl_ld_pllhyl_modallist', '');

                        controlObj.singledropdownlistinit('search_f_pq_tbl_ld_pllhyl_modallist', _baseCodeHashMap.get('codeservice_0515'), f_pq_onchange);
                        controlObj.singledropdownlistid('search_f_pq_tbl_ld_pllhyl_modallist', '-1');
                        controlObj.singledropdownlist('search_f_pq_tbl_ld_pllhyl_modallist', '');

                    }
                }
            })
        }
        else
        {
            controlObj.singledropdownlistinit('search_f_sc_tbl_ld_pllhyl_modallist', _baseCodeHashMap.get('codeservice_0513'), f_sc_onchange);
            controlObj.singledropdownlistid('search_f_sc_tbl_ld_pllhyl_modallist', '-1');
            controlObj.singledropdownlist('search_f_sc_tbl_ld_pllhyl_modallist', '');


            controlObj.singledropdownlistinit('search_f_qy_tbl_ld_pllhyl_modallist', _baseCodeHashMap.get('codeservice_0514'), f_qy_onchange);
            controlObj.singledropdownlistid('search_f_qy_tbl_ld_pllhyl_modallist', '-1');
            controlObj.singledropdownlist('search_f_qy_tbl_ld_pllhyl_modallist', '');

            controlObj.singledropdownlistinit('search_f_pq_tbl_ld_pllhyl_modallist', _baseCodeHashMap.get('codeservice_0515'), f_pq_onchange);
            controlObj.singledropdownlistid('search_f_pq_tbl_ld_pllhyl_modallist', '-1');
            controlObj.singledropdownlist('search_f_pq_tbl_ld_pllhyl_modallist', '');
        }


    },

    /* 
    *  
    *  方法:f_sc_onchange
    *  参数:changeEventParameter
    *  水厂onchange事件
    */
    f_sc_onchange = function (e, callbackfunction)
    {
        // // 
        if (e.added != undefined)
        {
            var nodeid = e.added.id;
            getArea(nodeid, {
                success: function (jsonArray)
                {

                    controlObj.singledropdownlistinit('detail_f_qy_tbl_ld_pllhyl_modallist', jsonArray, f_qy_onchange);
                    controlObj.singledropdownlistid('detail_f_qy_tbl_ld_pllhyl_modallist', '-1');
                    controlObj.singledropdownlist('detail_f_qy_tbl_ld_pllhyl_modallist', '');
                    if (callbackfunction != undefined)
                    {
                        callbackfunction.success();
                    }
                    else
                    {


                        controlObj.singledropdownlistinit('detail_f_pq_tbl_ld_pllhyl_modallist', _baseCodeHashMap.get('codeservice_0515'), f_pq_onchange);
                        controlObj.singledropdownlistid('detail_f_pq_tbl_ld_pllhyl_modallist', '-1');
                        controlObj.singledropdownlist('detail_f_pq_tbl_ld_pllhyl_modallist', '');
                    }
                }
            })
        }
        else
        {
            controlObj.singledropdownlistinit('detail_f_qy_tbl_ld_pllhyl_modallist', _baseCodeHashMap.get('codeservice_0514'), f_qy_onchange);
            controlObj.singledropdownlistid('detail_f_qy_tbl_ld_pllhyl_modallist', '-1');
            controlObj.singledropdownlist('detail_f_qy_tbl_ld_pllhyl_modallist', '');

            controlObj.singledropdownlistinit('detail_f_pq_tbl_ld_pllhyl_modallist', _baseCodeHashMap.get('codeservice_0515'), f_pq_onchange);
            controlObj.singledropdownlistid('detail_f_pq_tbl_ld_pllhyl_modallist', '-1');
            controlObj.singledropdownlist('detail_f_pq_tbl_ld_pllhyl_modallist', '');
        }


    },

        /* 
    *  
    *  方法:f_sccx_onchange
    *  参数:changeEventParameter
    *  水厂onchange事件
    */
    f_sccx_onchange = function (e, callbackfunction)
    {
        // // 
        if (e.added != undefined)
        {
            var nodeid = e.added.id;
            getArea(nodeid, {
                success: function (jsonArray)
                {

                    controlObj.singledropdownlistinit('search_f_qy_tbl_ld_pllhyl_modallist', jsonArray, f_qy_onchange);
                    controlObj.singledropdownlistid('search_f_qy_tbl_ld_pllhyl_modallist', '-1');
                    controlObj.singledropdownlist('search_f_qy_tbl_ld_pllhyl_modallist', '');
                    if (callbackfunction != undefined)
                    {
                        callbackfunction.success();
                    }
                    else
                    {


                        controlObj.singledropdownlistinit('search_f_pq_tbl_ld_pllhyl_modallist', _baseCodeHashMap.get('codeservice_0515'), f_pq_onchange);
                        controlObj.singledropdownlistid('search_f_pq_tbl_ld_pllhyl_modallist', '-1');
                        controlObj.singledropdownlist('search_f_pq_tbl_ld_pllhyl_modallist', '');
                    }
                }
            })
        }
        else
        {
            controlObj.singledropdownlistinit('search_f_qy_tbl_ld_pllhyl_modallist', _baseCodeHashMap.get('codeservice_0514'), f_qy_onchange);
            controlObj.singledropdownlistid('search_f_qy_tbl_ld_pllhyl_modallist', '-1');
            controlObj.singledropdownlist('search_f_qy_tbl_ld_pllhyl_modallist', '');

            controlObj.singledropdownlistinit('search_f_pq_tbl_ld_pllhyl_modallist', _baseCodeHashMap.get('codeservice_0515'), f_pq_onchange);
            controlObj.singledropdownlistid('search_f_pq_tbl_ld_pllhyl_modallist', '-1');
            controlObj.singledropdownlist('search_f_pq_tbl_ld_pllhyl_modallist', '');
        }


    },

    /* 
    *  
    *  方法:f_qy_onchange
    *  参数:changeEventParameter
    *  区域onchange事件
    */
    f_qy_onchange = function (e, callbackfunction)
    {
        // // 
        if (e.added != undefined)
        {
            var nodeid = e.added.id;
            // // 
            getArea(nodeid, {
                success: function (jsonArray)
                {

                    controlObj.singledropdownlistinit('detail_f_pq_tbl_ld_pllhyl_modallist', jsonArray, f_pq_onchange);
                    controlObj.singledropdownlistid('detail_f_pq_tbl_ld_pllhyl_modallist', '-1');
                    controlObj.singledropdownlist('detail_f_pq_tbl_ld_pllhyl_modallist', '');
                    if (callbackfunction != undefined)
                    {
                        callbackfunction.success();
                    }
                }
            })
        }
        else
        {
            // // 
            controlObj.singledropdownlistinit('detail_f_pq_tbl_ld_pllhyl_modallist', _baseCodeHashMap.get('codeservice_0515'), f_pq_onchange);
            controlObj.singledropdownlistid('detail_f_pq_tbl_ld_pllhyl_modallist', '-1');
            controlObj.singledropdownlist('detail_f_pq_tbl_ld_pllhyl_modallist', '');
        }


    },

        /* 
    *  
    *  方法:f_qycx_onchange
    *  参数:changeEventParameter
    *  区域onchange事件
    */
    f_qycx_onchange = function (e, callbackfunction)
    {
        // // 
        if (e.added != undefined)
        {
            var nodeid = e.added.id;
            // // 
            getArea(nodeid, {
                success: function (jsonArray)
                {

                    controlObj.singledropdownlistinit('search_f_pq_tbl_ld_pllhyl_modallist', jsonArray, f_pq_onchange);
                    controlObj.singledropdownlistid('search_f_pq_tbl_ld_pllhyl_modallist', '-1');
                    controlObj.singledropdownlist('search_f_pq_tbl_ld_pllhyl_modallist', '');
                    if (callbackfunction != undefined)
                    {
                        callbackfunction.success();
                    }
                }
            })
        }
        else
        {
            // // 
            controlObj.singledropdownlistinit('search_f_pq_tbl_ld_pllhyl_modallist', _baseCodeHashMap.get('codeservice_0515'), f_pq_onchange);
            controlObj.singledropdownlistid('search_f_pq_tbl_ld_pllhyl_modallist', '-1');
            controlObj.singledropdownlist('search_f_pq_tbl_ld_pllhyl_modallist', '');
        }


    },

    /* 
    *  
    *  方法:f_pq_onchange
    *  参数:changeEventParameter
    *  片区onchange事件
    */
    f_pq_onchange = function (e)
    {
        var controlid = e.target.id;
    },



              /* 
    *  
    *  方法:f_pqcx_onchange
    *  参数:changeEventParameter
    *  片区onchange事件
    */
    f_pqcx_onchange = function (e)
    {
        var controlid = e.target.id;
    },








            /* 
            *  
            *  方法:f_yzqk_onchange
            *  参数:event, state
            *  验证情况切换事件
            */
            f_yzqk_onchange = function (event, state)
            {
                var controlid = event.currentTarget.id;
            },








            /* 
            *  
            *  方法:f_khzt_onchange
            *  参数:changeEventParameter
            *  客户状态onchange事件
            */
            f_khzt_onchange = function (e)
            {
                var controlid = e.target.id;
            },






            /* 
            *  
            *  方法:f_sfjlbjf_onchange
            *  参数:event, state
            *  是否计量不计费切换事件
            */
            f_sfjlbjf_onchange = function (event, state)
            {
                var controlid = event.currentTarget.id;
            },



            /* 
            *  
            *  方法:f_khfz_onchange
            *  参数:changeEventParameter
            *  客户分组onchange事件
            */
            f_khfz_onchange = function (e)
            {
                var controlid = e.target.id;
            },








            /* 
            *  
            *  方法:f_yslx_onchange
            *  参数:changeEventParameter
            *  用水类型onchange事件
            */
            f_yslx_onchange = function (e)
            {
                var controlid = e.target.id;
            },




            /* 
            *  
            *  方法:f_zhcbrq_time_onchange
            *  参数:
            *  最后抄表日期 onchange事件
            */
            f_zhcbrq_time_onchange = function (e)
            {
                var r = e.currentTarget.id
            },
            /* 
            *  
            *  方法:f_zhcbrq_date_onchange
            *  参数:
            *  最后抄表日期 onchange事件
            */
            f_zhcbrq_date_onchange = function (ev)
            {
                var controlid = e.target.id
            },




            /* 
            *  
            *  方法:f_cbbh_onchange
            *  参数:changeEventParameter
            *  抄本编号onchange事件
            */
            f_cbbh_onchange = function (e)
            {
                var controlid = e.target.id;
            },








            /* 
            *  
            *  方法:f_cbyxm_onchange
            *  参数:changeEventParameter
            *  抄表员姓名onchange事件
            */
            f_cbyxm_onchange = function (e)
            {
                var controlid = e.target.id;
            },







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
            *  方法:f_htfj_onchange
            *  参数:
            *  合同附件 onchange事件
            */
            f_htfj_onchange = function ()
            {
                var fileid = controlObj.fileuploaderid('detail_f_htfj_tbl_ld_pllhyl_modallist');
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
            *  方法:f_htqdrq_time_onchange
            *  参数:
            *  合同签订日期 onchange事件
            */
            f_htqdrq_time_onchange = function (e)
            {
                var r = e.currentTarget.id
            },
            /* 
            *  
            *  方法:f_htqdrq_date_onchange
            *  参数:
            *  合同签订日期 onchange事件
            */
            f_htqdrq_date_onchange = function (ev)
            {
                var controlid = e.target.id
            },

            /* 
            *  
            *  方法:f_qtfj_onchange
            *  参数:
            *  其他附件 onchange事件
            */
            f_qtfj_onchange = function ()
            {
                var fileid = controlObj.fileuploaderid('detail_f_qtfj_tbl_ld_pllhyl_modallist');
            },


            /* 
            *  
            *  方法:f_yhzt_onchange
            *  参数:changeEventParameter
            *  用户状态onchange事件
            */
            f_yhzt_onchange = function (e)
            {
                var controlid = e.target.id;
            },





            /* 
            *  
            *  方法:f_tsyx_onchange
            *  参数:changeEventParameter
            *  托收银行onchange事件
            */
            f_tsyx_onchange = function (e)
            {
                var controlid = e.target.id;
            },



            /* 
            *  
            *  方法:f_sfzfj_onchange
            *  参数:
            *  身份证附件 onchange事件
            */
            f_sfzfj_onchange = function ()
            {
                var fileid = controlObj.fileuploaderid('detail_f_sfzfj_tbl_ld_pllhyl_modallist');
            },




















            /* 
            *  
            *  方法:f_sbfz_onchange
            *  参数:changeEventParameter
            *  水表分组onchange事件
            */
            f_sbfz_onchange = function (e)
            {
                var controlid = e.target.id;
            },










            /* 
            *  
            *  方法:f_sbzt_onchange
            *  参数:changeEventParameter
            *  水表状态onchange事件
            */
            f_sbzt_onchange = function (e)
            {
                var controlid = e.target.id;
            },


            /* 
            *  
            *  方法:f_sbkj_onchange
            *  参数:changeEventParameter
            *  水表口径onchange事件
            */
            f_sbkj_onchange = function (e)
            {
                var controlid = e.target.id;
            },






            /* 
            *  
            *  方法:f_azrq_time_onchange
            *  参数:
            *  安装日期 onchange事件
            */
            f_azrq_time_onchange = function (e)
            {
                var r = e.currentTarget.id
            },
            /* 
            *  
            *  方法:f_azrq_date_onchange
            *  参数:
            *  安装日期 onchange事件
            */
            f_azrq_date_onchange = function (ev)
            {
                var controlid = e.target.id
            },

            /* 
            *  
            *  方法:f_sbfj_onchange
            *  参数:
            *  水表附件 onchange事件
            */
            f_sbfj_onchange = function ()
            {
                var fileid = controlObj.fileuploaderid('detail_f_sbfj_tbl_ld_pllhyl_modallist');
            },


            /* 
            *  
            *  方法:f_sblx_onchange
            *  参数:changeEventParameter
            *  水表类型onchange事件
            */
            f_sblx_onchange = function (e)
            {
                var controlid = e.target.id;
            },










            /* 
            *  
            *  方法:f_jllx_onchange
            *  参数:changeEventParameter
            *  计量类型onchange事件
            */
            f_jllx_onchange = function (e)
            {
                var controlid = e.target.id;
            },






            /* 
            *  
            *  方法:f_qfzt_onchange
            *  参数:event, state
            *  铅封状态切换事件
            */
            f_qfzt_onchange = function (event, state)
            {
                var controlid = event.currentTarget.id;
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
        //当前被选中的行的ID集合的字符串//1^2^6        
        _pr_gridselectids: '',
        //当前在第几页
        _pr_gridpageindex: 1,
        //当前的查询模式：1：简单查询；2：高级查询
        _pr_searchtype: '1',
        //查询内容type1:简单查询内容；type2：高级查询内容（JSON）
        _pr_searchcontent: null,
        _pr_fk_tbl_ld_pllhlb_sys_id: '',
        //立户类型： 0居民 ，1大客户
        _pr_type:'',
        //=================================================================================
        //                                      公有方法 
        //=================================================================================

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
                                        that.bindGrid(false, {
                                            success: function ()
                                            {
                                                _validateMessage_search = new validateMessage('btn_search_modal_search_tbl_ld_pllhyl_modallist');
                                                _validateMessage_detail = new validateMessage('btn_detail_modal_save_tbl_ld_pllhyl_modallist');
                                                _ladda_btn_command_new = Ladda.create('btn_command_new_tbl_ld_pllhyl_modallist');
                                                _ladda_btn_command_delete = Ladda.create('btn_command_delete_tbl_ld_pllhyl_modallist');

                                                callBackFunction.success();
                                            },
                                            fail: function (message)
                                            {
                                                _blockMessage.show('bindGrid执行失败<br/>' + message, 'fail');
                                            }
                                        });
                                    }
                                });
                            }
                        });


                        initBaseCode({
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

                                initDetailControl({
                                    success: function ()
                                    {
                                        switch (that._pr_listtype)
                                        {
                                            case "1":
                                                setDisable(false);
                                                break;
                                            case "2":
                                                setDisable(true);
                                                break;
                                        }
                                    }
                                });
                            }
                        });
                    }
                });


            }
            catch (ex)
            {
                _blockMessage.show('程序初始化失败。<br/>' + ex.message, 'fail');
            }
        },

        /* 
*  
*  方法:bindGrid
*  参数:callBackFunction
*  根据_whereClauseString，_pageSize，_pr_gridpageindex绑定数据
*/
        bindGrid: function (isClearStatus, callBackFunction)
        {

            if (isClearStatus == true)
            {
                _gridEditId = '';
                _gridStatusScrollTop = 0;

            }
            else
            {
                //记录滚动情况
                _gridStatusScrollTop = $('#table_grid_tbl_ld_pllhyl_modallist').parent().scrollTop();
            }
            setTimeout(function ()
            {
                var whereClause = _whereClauseString;
                if (whereClause == "")
                {
                    whereClause += " 1 = 1 ";
                }
                if (("^" + basePageObj._userInfoJson.sys_roles + "^").indexOf('^2022^') <= -1)
                {
                    whereClause += " and sys_creatuserid = '" + basePageObj._userInfoJson.sys_userid + "'";
                }

                if (whereClause == "")
                {
                    whereClause = " 1 = 1 ";
                }
                whereClause += " and fk_tbl_ld_pllhlb_sys_id = '" + that._pr_fk_tbl_ld_pllhlb_sys_id + "'";

                var orderByString = ' sys_id desc';
                var columnsString = 'f_value1^f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^f_khbh^f_ztkhh^f_khfz^f_khfzid^f_yslx^f_yslxid^f_ycje^f_djjzsf^f_djjzpwf^f_ljqf^f_tbbh^f_sfjlbjf^f_ickljgl^f_zhcbrq^f_khzt^f_khztid^f_sqysl^f_jhysl^f_khbz^f_cbbh^f_cbbhid^f_cbmc^f_cbyxm^f_cbyxmid^f_cbxh^f_cbzq^f_sbbh^f_ztsbh^f_lxth^f_sbfz^f_sbfzid^f_sbpp^f_mph^f_sbdz^f_rs^f_sbkj^f_sbkjid^f_sblx^f_sblxid^f_jllx^f_jllxid^f_cszm^f_bqzm^f_sqzm^f_sqsl^f_ljgl^f_bqsl^f_qsqpjsl^f_qlqpjsl^f_nljgl^f_azrq^f_synx^f_qfzt^f_sbzt^f_sbztid^f_sbfj^f_sbbz^f_yhbh^f_jyhh^f_yhm^f_jfm^f_dh^f_yhfz^f_yhfzid^f_dz^f_dy^f_dyid^f_sc^f_scid^f_qy^f_qyid^f_pq^f_pqid^f_khrq^f_sfts^f_tsyxzh^f_htbh^f_htfj^f_sfzh^f_sfzfj^f_htqdrq^f_qtfj^f_tsyx^f_tsyxid^f_sfzzs^f_yhzt^f_yhztid^f_yhbz^f_yzqk^sys_id';

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
                        $('#table_grid_tbl_ld_pllhyl_modallist').bootstrapTable("loadJson", messageJson);
                        //定位
                        $('#table_grid_tbl_ld_pllhyl_modallist').parent().scrollTop(_gridStatusScrollTop);
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
            addDetailData({
                success: function ()
                {
                    _ladda_btn_command_new.stop();

                }, fail: function (message)
                {
                    _ladda_btn_command_new.stop();
                    _alertMessage.show('addDetailData执行失败', 'fail');
                    _resultMessage.show(message);
                }
            });
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
                var currentcount = $('#table_grid_tbl_ld_pllhyl_modallist').bootstrapTable('getSelections').length;
                var outercount = allcount - currentcount;
                var confirmContent = '<blockquote> ';
                confirmContent += '<h3>将对被选中的全部数据<a style="color:red">' + allcount + '</a>条进行<a style="color:red">删除</a></h3>';
                confirmContent += '其中<br/>';
                confirmContent += '<h5><a style="color:red">当前页</a>的数据<a style="color:red">' + currentcount + '</a>条<h5>';
                confirmContent += '<h5><a style="color:red">其他页</a>的数据<a style="color:red">' + outercount + '</a>条<h5>';
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
                                        that.bindGrid(true, {
                                            success: function ()
                                            {
                                                _ladda_btn_command_delete.stop();
                                            }, fail: function (message)
                                            {
                                                _ladda_btn_command_delete.stop();
                                                _alertMessage.show('绑定失败', 'fail');
                                                _resultMessage.show(message);
                                            }
                                        });

                                    },
                                    fail: function (message)
                                    {
                                        _ladda_btn_command_delete.stop();
                                        _alertMessage.show('数据删除完成，获取数据条数失败', 'fail');
                                        _resultMessage.show(message);
                                    }
                                });
                            },
                            fail: function (message)
                            {
                                _ladda_btn_command_delete.stop();
                                _alertMessage.show('数据删除失败', 'fail');
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
            $('#table_grid_tbl_ld_pllhyl_modallist').bootstrapTable('uncheckAll');
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
        *  简单查询时直接执行，高级查询时打开SearchModel
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
                                        that.bindGrid(true, {
                                            success: function ()
                                            {
                                            }, fail: function (message)
                                            {
                                                _alertMessage.show('绑定失败', 'fail');
                                                _resultMessage.show(message);
                                            }
                                        });
                                    }
                                });
                            },
                            fail: function (message)
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
                _alertMessage.show('查询失败<br/>' + ex.message, 'fail');
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
            $('#btn_command_search_tbl_ld_pllhyl_modallist').html('简单查询');
            $('#txt_command_search_tbl_ld_pllhyl_modallist').removeAttr('disabled');
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
            $('#btn_command_search_tbl_ld_pllhyl_modallist').html('高级查询');
            $('#txt_command_search_tbl_ld_pllhyl_modallist').attr('disabled', 'disabled');

            $('#div_search_modal_tbl_ld_pllhyl_modallist').modal('show');
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
                                    $('#div_search_modal_tbl_ld_pllhyl_modallist').modal('hide')
                                    that._pr_gridpageindex = '1';
                                    that._pr_gridselectids = '';
                                    that.bindGrid(true, {
                                        success: function ()
                                        {
                                        }, fail: function (message)
                                        {
                                            _alertMessage.show('绑定失败', 'fail');
                                            _resultMessage.show(message);
                                        }
                                    });
                                }
                            });
                        },
                        fail: function (message)
                        {
                            if (message == '')
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
                fail: function (message)
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
            _validateMessage_search.hidden();
            $('#div_search_modal_tbl_ld_pllhyl_modallist').modal('hide');

            that._pr_searchtype = '1';
            $('#btn_command_search_tbl_ld_pllhyl_modallist').html('简单查询');
            $('#txt_command_search_tbl_ld_pllhyl_modallist').removeAttr('disabled');

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
            $('#btn_command_search_tbl_ld_pllhyl_modallist').html('高级查询');
            $('#txt_command_search_tbl_ld_pllhyl_modallist').attr('disabled', 'disabled');

            $('#div_search_modal_tbl_ld_pllhyl_modallist').modal('show');
        },

        //---------------------------------------------------------------------------------
        // ---------------------------------DetailModel------------------------------------
        //---------------------------------------------------------------------------------

        /* 
        *  
        *  方法:btn_detail_modal_save_onclick
        *  参数:
        *  detailModel保存操作
        *  
        */
        btn_detail_modal_save_onclick: function ()
        {
            getDetailModel({
                success: function (tbl_ld_pllhyl_modallist)
                {

                    checkDetailModel(tbl_ld_pllhyl_modallist, {
                        success: function (tbl_ld_pllhyl_modallist)
                        {

                            updateDetailData(tbl_ld_pllhyl_modallist, {
                                success: function (tbl_ld_pllhyl_modallist)
                                {
                                    clearDetailModel(tbl_ld_pllhyl_modallist);
                                    $('#div_detail_modal_tbl_ld_pllhyl_modallist').modal('hide')
                                    that.bindGrid(false, {
                                        success: function ()
                                        {
                                        }, fail: function (message)
                                        {
                                            _alertMessage.show('绑定失败', 'fail');
                                            _resultMessage.show(message);
                                        }
                                    });
                                },
                                fail: function (message)
                                {
                                    _alertMessage.show('数据更新失败', 'fail');
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
                }, fail: function (message)
                {
                    _alertMessage.show('数据获取失败', 'warning');
                    _resultMessage.show(message);
                }
            });
        },

        /* 
        *  
        *  方法:btn_detail_modal_cancle_onclick
        *  参数:
        *  detailModel关闭操作
        *  
        */
        btn_detail_modal_cancle_onclick: function ()
        {
            $('#div_detail_modal_tbl_ld_pllhyl_modallist').modal('hide');
            _validateMessage_detail.hidden();

        },
        end: function ()
        {
        }
    };
    return that;
})();






