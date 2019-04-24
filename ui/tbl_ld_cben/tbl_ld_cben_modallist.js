


var _clientInf = '{userid:"",appcode:"54",appname:"",userip:"",usermac:"",username:""}';
var _blockMessage = null;
var _alertMessage = null;
var _resultMessage = null;
var _confirmMessage = null;

var tbl_ld_cben_modallist_Obj = (function ()
{
    'use strict';
    //=================================================================================
    //                                      私有
    //=================================================================================
    //=================================================================================
    //                                      私有属性 
    //=================================================================================
    var _serviceUrl = '//127.0.0.1/sara.dd.ldsw/service/service_tbl_ld_cben.asmx/',

    //Grid控件的分页参数，设置为空即可实现不分页
    _pageSize = '20',
    _isPage = true,
    //Code数据存储容器
    _baseCodeHashMap = null,

    _validateMessage_search = null,
    _validateMessage_detail = null,

    _ladda_btn_command_new = null,
    _ladda_btn_command_save = null,
    _ladda_btn_command_delete = null,
         _serverModel = null,
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
            
            that._pr_listtype = requestQuery('listtype');
            that._pr_appcode = requestQuery('appcode');
            that._pr_gridselectids = requestQuery('gridselectids');
            that._pr_gridpageindex = requestQuery('gridpageIndex');
            that._pr_searchtype = requestQuery('searchtype');
            that._pr_searchcontent = requestQuery('searchcontent');
            _clientInf = '{userid:"' + basePageObj._userInfoJson.sys_userid + '",appcode:"' + that._pr_appcode + '",appname:"",userip:"' + basePageObj._userInfoJson.ip + '",usermac:"' + basePageObj._userInfoJson.mac + '",username:"' + basePageObj._userInfoJson.sys_username + '"}';

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
                    $('#btn_command_search_tbl_ld_cben_modallist').html('简单查询');
                    $('#txt_command_search_tbl_ld_cben_modallist').removeAttr("disabled");

                    break;
                case "2":
                    $('#btn_command_search_tbl_ld_cben_modallist').html('高级查询');
                    $('#txt_command_search_tbl_ld_cben_modallist').attr("disabled", true);
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


        controlObj.textdisable('detail_f_cbbh_tbl_ld_cben_modallist', isDisable);

        controlObj.textdisable('detail_f_cbmc_tbl_ld_cben_modallist', isDisable);

        controlObj.textdisable('detail_f_cbzq_tbl_ld_cben_modallist', isDisable);

        controlObj.textdisable('detail_f_ksyf_tbl_ld_cben_modallist', isDisable);

        //controlObj.textdisable('detail_f_cbymc_tbl_ld_cben_modallist', isDisable);

        //controlObj.textdisable('detail_f_cbyid_tbl_ld_cben_modallist', isDisable);
        controlObj.singledropdownlistdisable('detail_f_cbymc_tbl_ld_cben_modallist', isDisable);

        controlObj.textdisable('detail_f_cbyphoto_tbl_ld_cben_modallist', isDisable);


        controlObj.singledropdownlistdisable('detail_f_zt_tbl_ld_cben_modallist', isDisable);

        controlObj.singledropdownlistdisable('detail_f_value1_tbl_ld_cben_modallist', isDisable);
        controlObj.textdisable('detail_f_bz_tbl_ld_cben_modallist', isDisable);

        if (isDisable)
        {
            $('#btn_detail_modal_save_tbl_ld_cben_modallist').addClass('hidden');
            $('#btn_command_delete_tbl_ld_cben_modallist').addClass('hidden');
            $('#btn_command_new_tbl_ld_cben_modallist').addClass('hidden');
        }
        else
        {
            $('#btn_detail_modal_save_tbl_ld_cben_modallist').removeClass('hidden');
            $('#btn_command_delete_tbl_ld_cben_modallist').removeClass('hidden');
            $('#btn_command_new_tbl_ld_cben_modallist').removeClass('hidden');
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

        codeServiceId += "0527^";

        codeServiceId += "0813^";

        codeServiceId = codeServiceId.trimEnd('^');
        commonObj.getCodeServiceJson(codeServiceId, {
            success: function (resultArray)
            {
                try
                {
                    _baseCodeHashMap = new hashMap();

                    _baseCodeHashMap.put('codeservice_0527', resultArray['0527']);
                    _baseCodeHashMap.put('codeservice_0813', resultArray['0813']);
                    var sqlStringsJson = {

                        "cby": 'select u.u_id as id,u.u_name as text from t_user u ,t_userrole_relation r where u.u_id = r.u_id and r.r_id=\'2019\''
                    };
                    commonObj.querySqls(sqlStringsJson, {
                        success: function (resultJson)
                        {
                            _baseCodeHashMap.put('codeService_cby', resultJson['cby']);
                            callBackFunction.success();
                        },
                        fail: function (message)
                        {
                            _blockMessage.show('querySqls<br/>' + message, 'fail');
                        }
                    });
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

            var codeService_0527 = _baseCodeHashMap.get('codeservice_0527');
            var codeService_0813 = _baseCodeHashMap.get('codeservice_0813');
            var codeService_cby = _baseCodeHashMap.get('codeService_cby');

            controlObj.multidropdownlistinit('search_f_zt_tbl_ld_cben_modallist', codeService_0527);
            controlObj.multidropdownlistinit('search_f_value1_tbl_ld_cben_modallist', codeService_0813);
            controlObj.multidropdownlistinit('search_f_cbymc_tbl_ld_cben_modallist', codeService_cby);

            //模态窗口
            $('#div_search_modal_tbl_ld_cben_modallist').modal({
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
                        $("#txt_command_search_tbl_ld_cben_modallist").val(that._pr_searchcontent.type1);
                    }

                    break;
                case "2":
                    if (that._pr_searchcontent.type2 != undefined)
                    {
                        //高级查询
                        var tbl_ld_cben_modallist = that._pr_searchcontent.type2;



                        controlObj.text('search_f_value2_tbl_ld_cben_modallist', tbl_ld_cben_modallist.f_value2);

                        controlObj.text('search_f_value3_tbl_ld_cben_modallist', tbl_ld_cben_modallist.f_value3);

                        controlObj.text('search_f_value4_tbl_ld_cben_modallist', tbl_ld_cben_modallist.f_value4);

                        controlObj.text('search_f_value5_tbl_ld_cben_modallist', tbl_ld_cben_modallist.f_value5);

                        controlObj.text('search_f_value6_tbl_ld_cben_modallist', tbl_ld_cben_modallist.f_value6);

                        controlObj.text('search_f_value7_tbl_ld_cben_modallist', tbl_ld_cben_modallist.f_value7);

                        controlObj.text('search_f_value8_tbl_ld_cben_modallist', tbl_ld_cben_modallist.f_value8);

                        controlObj.text('search_f_value9_tbl_ld_cben_modallist', tbl_ld_cben_modallist.f_value9);

                        controlObj.text('search_f_value10_tbl_ld_cben_modallist', tbl_ld_cben_modallist.f_value10);

                        controlObj.text('search_f_cbbh_tbl_ld_cben_modallist', tbl_ld_cben_modallist.f_cbbh);

                        controlObj.text('search_f_cbmc_tbl_ld_cben_modallist', tbl_ld_cben_modallist.f_cbmc);

                        controlObj.text('search_f_cbzq_tbl_ld_cben_modallist', tbl_ld_cben_modallist.f_cbzq);

                        controlObj.text('search_f_ksyf_tbl_ld_cben_modallist', tbl_ld_cben_modallist.f_ksyf);

                        //controlObj.text('search_f_cbymc_tbl_ld_cben_modallist', tbl_ld_cben_modallist.f_cbymc);

                        //controlObj.text('search_f_cbyid_tbl_ld_cben_modallist', tbl_ld_cben_modallist.f_cbyid);
                        controlObj.multidropdownlistid('search_f_cbymc_tbl_ld_cben_modallist', tbl_ld_cben_modallist.f_cbyid);

                        controlObj.multidropdownlistid('search_f_zt_tbl_ld_cben_modallist', tbl_ld_cben_modallist.f_ztid);
                        controlObj.multidropdownlistid('search_f_value1_tbl_ld_cben_modallist', tbl_ld_cben_modallist.f_value1);

                        controlObj.text('search_f_bz_tbl_ld_cben_modallist', tbl_ld_cben_modallist.f_bz);


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
                    that._pr_searchcontent.type1 = $("#txt_command_search_tbl_ld_cben_modallist").val();

                    break;
                case "2":

                    //高级查询
                    var tbl_ld_cben_modallist = new Object();




                    tbl_ld_cben_modallist.f_value2 = controlObj.text('search_f_value2_tbl_ld_cben_modallist');


                    tbl_ld_cben_modallist.f_value3 = controlObj.text('search_f_value3_tbl_ld_cben_modallist');


                    tbl_ld_cben_modallist.f_value4 = controlObj.text('search_f_value4_tbl_ld_cben_modallist');


                    tbl_ld_cben_modallist.f_value5 = controlObj.text('search_f_value5_tbl_ld_cben_modallist');


                    tbl_ld_cben_modallist.f_value6 = controlObj.text('search_f_value6_tbl_ld_cben_modallist');


                    tbl_ld_cben_modallist.f_value7 = controlObj.text('search_f_value7_tbl_ld_cben_modallist');


                    tbl_ld_cben_modallist.f_value8 = controlObj.text('search_f_value8_tbl_ld_cben_modallist');


                    tbl_ld_cben_modallist.f_value9 = controlObj.text('search_f_value9_tbl_ld_cben_modallist');


                    tbl_ld_cben_modallist.f_value10 = controlObj.text('search_f_value10_tbl_ld_cben_modallist');


                    tbl_ld_cben_modallist.f_cbbh = controlObj.text('search_f_cbbh_tbl_ld_cben_modallist');


                    tbl_ld_cben_modallist.f_cbmc = controlObj.text('search_f_cbmc_tbl_ld_cben_modallist');


                    tbl_ld_cben_modallist.f_cbzq = controlObj.text('search_f_cbzq_tbl_ld_cben_modallist');


                    tbl_ld_cben_modallist.f_ksyf = controlObj.text('search_f_ksyf_tbl_ld_cben_modallist');


                    //tbl_ld_cben_modallist.f_cbymc = controlObj.text('search_f_cbymc_tbl_ld_cben_modallist');


                    //tbl_ld_cben_modallist.f_cbyid = controlObj.text('search_f_cbyid_tbl_ld_cben_modallist');
                    tbl_ld_cben_modallist.f_cbyid = controlObj.multidropdownlistid('search_f_cbymc_tbl_ld_cben_modallist');


                    tbl_ld_cben_modallist.f_ztid = controlObj.multidropdownlistid('search_f_zt_tbl_ld_cben_modallist');
                    tbl_ld_cben_modallist.f_value1 = controlObj.multidropdownlistid('search_f_value1_tbl_ld_cben_modallist');


                    tbl_ld_cben_modallist.f_bz = controlObj.text('search_f_bz_tbl_ld_cben_modallist');

                    that._pr_searchcontent.type2 = tbl_ld_cben_modallist;
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
            var tbl_ld_cben_modallist = that._pr_searchcontent.type2;
            var errorMessageHansMap = new hashMap();
            var errorMessagePlacementHansMap = new hashMap();




            if (tbl_ld_cben_modallist.f_value1.length > 200)
            {
                errorMessageHansMap.put('search_f_value1_tbl_ld_cben_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_cben_modallist.f_value2.length > 200)
            {
                errorMessageHansMap.put('search_f_value2_tbl_ld_cben_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_cben_modallist.f_value3.length > 200)
            {
                errorMessageHansMap.put('search_f_value3_tbl_ld_cben_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_cben_modallist.f_value4.length > 200)
            {
                errorMessageHansMap.put('search_f_value4_tbl_ld_cben_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_cben_modallist.f_value5.length > 200)
            {
                errorMessageHansMap.put('search_f_value5_tbl_ld_cben_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_cben_modallist.f_value6.length > 200)
            {
                errorMessageHansMap.put('search_f_value6_tbl_ld_cben_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_cben_modallist.f_value7.length > 200)
            {
                errorMessageHansMap.put('search_f_value7_tbl_ld_cben_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_cben_modallist.f_value8.length > 200)
            {
                errorMessageHansMap.put('search_f_value8_tbl_ld_cben_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_cben_modallist.f_value9.length > 200)
            {
                errorMessageHansMap.put('search_f_value9_tbl_ld_cben_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_cben_modallist.f_value10.length > 200)
            {
                errorMessageHansMap.put('search_f_value10_tbl_ld_cben_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_cben_modallist.f_cbbh.length > 200)
            {
                errorMessageHansMap.put('search_f_cbbh_tbl_ld_cben_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_cben_modallist.f_cbmc.length > 200)
            {
                errorMessageHansMap.put('search_f_cbmc_tbl_ld_cben_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_cben_modallist.f_cbzq.length > 200)
            {
                errorMessageHansMap.put('search_f_cbzq_tbl_ld_cben_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }
            if (tbl_ld_cben_modallist.f_cbzq != "" && !/^[0-9]+\.?[0-9]*$/.test(tbl_ld_cben_modallist.f_cbzq))
            {
                errorMessageHansMap.put('search_f_cbzq_tbl_ld_cben_modallist', '必须是数字');
            }




            if (tbl_ld_cben_modallist.f_ksyf.length > 200)
            {
                errorMessageHansMap.put('search_f_ksyf_tbl_ld_cben_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }
            if (tbl_ld_cben_modallist.f_ksyf != "" && !/^[0-9]+\.?[0-9]*$/.test(tbl_ld_cben_modallist.f_ksyf))
            {
                errorMessageHansMap.put('search_f_ksyf_tbl_ld_cben_modallist', '必须是数字');
            }



            if (tbl_ld_cben_modallist.f_cbyid.length > 200)
            {
                errorMessageHansMap.put('search_f_cbymc_tbl_ld_cben_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            //if (tbl_ld_cben_modallist.f_cbyid.length > 200) {
            //    errorMessageHansMap.put('search_f_cbyid_tbl_ld_cben_modallist', '长度不能超过<a style="color:red">200</a>个字');
            //}




            if (tbl_ld_cben_modallist.f_ztid.length > 200)
            {
                errorMessageHansMap.put('search_f_zt_tbl_ld_cben_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_cben_modallist.f_bz.length > 200)
            {
                errorMessageHansMap.put('search_f_bz_tbl_ld_cben_modallist', '长度不能超过<a style="color:red">200</a>个字');
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



                that._pr_searchcontent.type2.f_value2 = '';
                controlObj.text('search_f_value2_tbl_ld_cben_modallist', that._pr_searchcontent.type2.f_value2);


                that._pr_searchcontent.type2.f_value3 = '';
                controlObj.text('search_f_value3_tbl_ld_cben_modallist', that._pr_searchcontent.type2.f_value3);


                that._pr_searchcontent.type2.f_value4 = '';
                controlObj.text('search_f_value4_tbl_ld_cben_modallist', that._pr_searchcontent.type2.f_value4);


                that._pr_searchcontent.type2.f_value5 = '';
                controlObj.text('search_f_value5_tbl_ld_cben_modallist', that._pr_searchcontent.type2.f_value5);


                that._pr_searchcontent.type2.f_value6 = '';
                controlObj.text('search_f_value6_tbl_ld_cben_modallist', that._pr_searchcontent.type2.f_value6);


                that._pr_searchcontent.type2.f_value7 = '';
                controlObj.text('search_f_value7_tbl_ld_cben_modallist', that._pr_searchcontent.type2.f_value7);


                that._pr_searchcontent.type2.f_value8 = '';
                controlObj.text('search_f_value8_tbl_ld_cben_modallist', that._pr_searchcontent.type2.f_value8);


                that._pr_searchcontent.type2.f_value9 = '';
                controlObj.text('search_f_value9_tbl_ld_cben_modallist', that._pr_searchcontent.type2.f_value9);


                that._pr_searchcontent.type2.f_value10 = '';
                controlObj.text('search_f_value10_tbl_ld_cben_modallist', that._pr_searchcontent.type2.f_value10);


                that._pr_searchcontent.type2.f_cbbh = '';
                controlObj.text('search_f_cbbh_tbl_ld_cben_modallist', that._pr_searchcontent.type2.f_cbbh);


                that._pr_searchcontent.type2.f_cbmc = '';
                controlObj.text('search_f_cbmc_tbl_ld_cben_modallist', that._pr_searchcontent.type2.f_cbmc);


                that._pr_searchcontent.type2.f_cbzq = '';
                controlObj.text('search_f_cbzq_tbl_ld_cben_modallist', that._pr_searchcontent.type2.f_cbzq);


                that._pr_searchcontent.type2.f_ksyf = '';
                controlObj.text('search_f_ksyf_tbl_ld_cben_modallist', that._pr_searchcontent.type2.f_ksyf);


                //that._pr_searchcontent.type2.f_cbymc = '';
                //controlObj.text('search_f_cbymc_tbl_ld_cben_modallist', that._pr_searchcontent.type2.f_cbymc);


                //that._pr_searchcontent.type2.f_cbyid = '';
                //controlObj.text('search_f_cbyid_tbl_ld_cben_modallist', that._pr_searchcontent.type2.f_cbyid);
                that._pr_searchcontent.type2.f_cbyid = '';
                controlObj.multidropdownlistid('search_f_cbymc_tbl_ld_cben_modallist', that._pr_searchcontent.type2.f_cbyid);


                that._pr_searchcontent.type2.f_ztid = '';
                controlObj.multidropdownlistid('search_f_zt_tbl_ld_cben_modallist', that._pr_searchcontent.type2.f_ztid);
                that._pr_searchcontent.type2.f_value1 = '';
                controlObj.multidropdownlistid('search_f_value1_tbl_ld_cben_modallist', that._pr_searchcontent.type2.f_value1);


                that._pr_searchcontent.type2.f_bz = '';
                controlObj.text('search_f_bz_tbl_ld_cben_modallist', that._pr_searchcontent.type2.f_bz);



                break;
            case "2":
                if (that._pr_searchcontent.type1 == undefined)
                {
                    that._pr_searchcontent.type1 = '';
                }

                $("#txt_command_search_tbl_ld_cben_modallist").val('');
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

                                    whereClause += " f_cbbh like '%" + vv[i] + "%' or ";

                                    whereClause += " f_cbmc like '%" + vv[i] + "%' or ";

                                    whereClause += " f_cbzq like '%" + vv[i] + "%' or ";

                                    whereClause += " f_ksyf like '%" + vv[i] + "%' or ";

                                    whereClause += " f_cbymc like '%" + vv[i] + "%' or ";

                                    whereClause += " f_cbyid like '%" + vv[i] + "%' or ";

                                    whereClause += " f_zt like '%" + vv[i] + "%' or ";

                                    whereClause += " f_bz like '%" + vv[i] + "%' or ";

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

                        var tbl_ld_cben_modallist = that._pr_searchcontent.type2;



                        if (tbl_ld_cben_modallist.f_cbbh.length > 0)
                        {
                            whereClause += " f_cbbh like '%" + tbl_ld_cben_modallist.f_cbbh + "%' and ";
                        }


                        if (tbl_ld_cben_modallist.f_cbmc.length > 0)
                        {
                            whereClause += " f_cbmc like '%" + tbl_ld_cben_modallist.f_cbmc + "%' and ";
                        }


                        if (tbl_ld_cben_modallist.f_cbzq.length > 0)
                        {
                            whereClause += " f_cbzq like '%" + tbl_ld_cben_modallist.f_cbzq + "%' and ";
                        }


                        if (tbl_ld_cben_modallist.f_ksyf.length > 0)
                        {
                            whereClause += " f_ksyf like '%" + tbl_ld_cben_modallist.f_ksyf + "%' and ";
                        }


                        //if (tbl_ld_cben_modallist.f_cbymc.length > 0) {
                        //    whereClause += " f_cbymc like '%" + tbl_ld_cben_modallist.f_cbymc + "%' and ";
                        //}


                        if (tbl_ld_cben_modallist.f_cbyid.length > 0)
                        {
                            //whereClause += " f_cbyid like '%" + tbl_ld_cben_modallist.f_cbyid + "%' and ";
                            var elementArray = tbl_ld_cben_modallist.f_cbyid.split(',');
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
                                whereClause += "((','||f_cbyid||',') like ('%,'||'" + elementArray[i] + "'||',%')) ";
                            });
                            whereClause += ') and ';
                        }


                        if (tbl_ld_cben_modallist.f_ztid.length > 0)
                        {
                            var elementArray = tbl_ld_cben_modallist.f_ztid.split(',');
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

                        if (tbl_ld_cben_modallist.f_value1.length > 0)
                        {
                            var elementArray = tbl_ld_cben_modallist.f_value1.split(',');
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
                                whereClause += "((','||f_value1||',') like ('%,'||'" + elementArray[i] + "'||',%')) ";
                            });
                            whereClause += ') and ';
                        }

                        if (tbl_ld_cben_modallist.f_bz.length > 0)
                        {
                            whereClause += " f_bz like '%" + tbl_ld_cben_modallist.f_bz + "%' and ";
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
            $('#btn_command_clearselect_tbl_ld_cben_modallist').addClass('hidden');


        }
        else
        {
            $('#btn_command_clearselect_tbl_ld_cben_modallist').removeClass('hidden');
            var allcount = that._pr_gridselectids.split('^').length;
            var currentcount = $('#table_grid_tbl_ld_cben_modallist').bootstrapTable('getSelections').length;
            $('#btn_command_clearselect_tbl_ld_cben_modallist .cc-badge-p').html(currentcount + '/' + allcount);


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

            $('#table_grid_tbl_ld_cben_modallist').bootstrapTable({
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
                    field: 'f_cbyphoto',
                    title: '抄表员photo',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;



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




                        return resultStr;
                    }
                },
                  {
                      field: 'f_cbymc',
                      title: '抄表员',
                      "class": '',
                      align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                      formatter: function (value, row, index)
                      {
                          var resultStr = value;



                          return resultStr;
                      }
                  },

                {
                    field: 'khcount',
                    title: '人数',
                    "class": '',
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



                        return resultStr;
                    }
                },


                {
                    field: 'f_cbzq',
                    title: '抄表周期',
                    "class": '',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;



                        return resultStr;
                    }
                },


                {
                    field: 'f_ksyf',
                    title: '开始月份',
                    "class": '',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;



                        return resultStr;
                    }
                },



                {
                    field: 'f_value1',
                    title: '操作类型',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;
                        switch (value)
                        {
                            case '1':
                                resultStr = "手持机-只抄不收";
                                break;
                            case '2':
                                resultStr = "手持机-抄表缴费";
                                break;
                        }
                        return resultStr;
                    }
                },


                {
                    field: 'f_cbyid',
                    title: '抄表员id',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;



                        return resultStr;
                    }
                },


                {
                    field: 'f_zt',
                    title: '状态',
                    "class": '',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;



                        return resultStr;
                    }
                },


                {
                    field: 'f_ztid',
                    title: '状态id',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        return resultStr;
                    }
                },


                {
                    field: 'f_bz',
                    title: '备注',
                    "class": '',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        //if (resultStr.length > 10) {
                        //    resultStr = resultStr.substr(0, 10) + '...';
                        //}

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
                                success: function (tbl_ld_cben_modallist)
                                {
                                    setDetailModel(tbl_ld_cben_modallist, {
                                        success: function ()
                                        {
                                            
                                            $('#div_detail_modal_tbl_ld_cben_modallist').modal('show');
                                            tbl_ld_log_modallist_Obj._pr_tableprikeyvalue = _gridEditId;
                                            tbl_ld_log_modallist_Obj.bindGrid();
                                            callBackFunction.success();
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
                                success: function (tbl_ld_cben_modallist)
                                {
                                    setDetailModel(tbl_ld_cben_modallist, {
                                        success: function ()
                                        {
                                           
                                            $('#div_detail_modal_tbl_ld_cben_modallist').modal('show');
                                            tbl_ld_log_modallist_Obj._pr_tableprikeyvalue = _gridEditId;
                                            tbl_ld_log_modallist_Obj.bindGrid();
                                            callBackFunction.success();
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
                    bindGrid(true, {
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
                    return {};
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
                    var rows = $('#table_grid_tbl_ld_cben_modallist').bootstrapTable('getSelections');
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
                    var rows = $('#table_grid_tbl_ld_cben_modallist').bootstrapTable('getData');
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
    *  方法:bindGrid
    *  参数:callBackFunction
    *  根据_whereClauseString，_pageSize，_pr_gridpageindex绑定数据
    */
    bindGrid = function (isClearStatus, callBackFunction)
    {
        if (isClearStatus == true)
        {
            _gridEditId = '';
            _gridStatusScrollTop = 0;

        }
        else
        {
            //记录滚动情况
            _gridStatusScrollTop = $('#table_grid_tbl_ld_cben_modallist').parent().scrollTop();
        }
        $('#table_grid_tbl_ld_cben_modallist').bootstrapTable("showLoading");
        setTimeout(function ()
        {
            var whereClause = _whereClauseString;
            var orderByString = ' f_cbbh asc';
            var columnsString = 'f_value1^f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^f_cbyphoto^f_cbbh^f_cbmc^f_cbzq^f_ksyf^f_cbymc^f_cbyid^f_zt^f_ztid^f_bz^sys_id';
            columnsString += '^(select count(*) from tbl_ld_khb where  sys_delflag = \'0\' and f_cbbhid = b.sys_id) as khcount';
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
                    $('#table_grid_tbl_ld_cben_modallist').bootstrapTable("hideLoading");
                    $('#table_grid_tbl_ld_cben_modallist').bootstrapTable("loadJson", messageJson);
                    //定位
                    $('#table_grid_tbl_ld_cben_modallist').parent().scrollTop(_gridStatusScrollTop);
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

            var codeService_0527 = _baseCodeHashMap.get('codeservice_0527');
            var codeService_0813 = _baseCodeHashMap.get('codeservice_0813');
            var codeService_cby = _baseCodeHashMap.get('codeService_cby');

            controlObj.singledropdownlistinit('detail_f_zt_tbl_ld_cben_modallist', codeService_0527, f_zt_onchange);
            controlObj.singledropdownlistinit('detail_f_value1_tbl_ld_cben_modallist', codeService_0813, f_value1_onchange);
            controlObj.singledropdownlistinit('detail_f_cbymc_tbl_ld_cben_modallist', codeService_cby, f_cbymc_onchange);

            //模态窗口
            $('#div_detail_modal_tbl_ld_cben_modallist').modal({
                keyboard: false,
                backdrop: 'static',
                show: false
            });
            $('#div_container_tbl_ld_log').load('../tbl_ld_log/tbl_ld_log_modallist_part.html', null, function ()
            {
                tbl_ld_log_modallist_Obj._pr_tablename = 'tbl_ld_cben';         
                tbl_ld_log_modallist_Obj.init({
                    success: function ()
                    {
                        $('#div_container_tbl_ld_log').css('display', '');
                        $('#tbl_ld_log').css('display', '');

                        callBackFunction.success();
                    }
                });
            })
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
    *  根据传入的tbl_ld_cben_modallist，绑定DetailModel
    */
    setDetailModel = function (tbl_ld_cben_modallist, callBackFunction)
    {
        try
        {


            controlObj.text('detail_f_value2_tbl_ld_cben_modallist', tbl_ld_cben_modallist.f_value2);

            controlObj.text('detail_f_value3_tbl_ld_cben_modallist', tbl_ld_cben_modallist.f_value3);

            controlObj.text('detail_f_value4_tbl_ld_cben_modallist', tbl_ld_cben_modallist.f_value4);

            controlObj.text('detail_f_value5_tbl_ld_cben_modallist', tbl_ld_cben_modallist.f_value5);

            controlObj.text('detail_f_value6_tbl_ld_cben_modallist', tbl_ld_cben_modallist.f_value6);

            controlObj.text('detail_f_value7_tbl_ld_cben_modallist', tbl_ld_cben_modallist.f_value7);

            controlObj.text('detail_f_value8_tbl_ld_cben_modallist', tbl_ld_cben_modallist.f_value8);

            controlObj.text('detail_f_value9_tbl_ld_cben_modallist', tbl_ld_cben_modallist.f_value9);

            controlObj.text('detail_f_value10_tbl_ld_cben_modallist', tbl_ld_cben_modallist.f_value10);

            controlObj.text('detail_f_cbbh_tbl_ld_cben_modallist', tbl_ld_cben_modallist.f_cbbh);

            controlObj.text('detail_f_cbmc_tbl_ld_cben_modallist', tbl_ld_cben_modallist.f_cbmc);

            controlObj.text('detail_f_cbzq_tbl_ld_cben_modallist', tbl_ld_cben_modallist.f_cbzq);

            controlObj.text('detail_f_ksyf_tbl_ld_cben_modallist', tbl_ld_cben_modallist.f_ksyf);

            //controlObj.text('detail_f_cbymc_tbl_ld_cben_modallist', tbl_ld_cben_modallist.f_cbymc);

            //controlObj.text('detail_f_cbyid_tbl_ld_cben_modallist', tbl_ld_cben_modallist.f_cbyid);
            controlObj.singledropdownlistid('detail_f_cbymc_tbl_ld_cben_modallist', tbl_ld_cben_modallist.f_cbyid);

            controlObj.text('detail_f_cbyphoto_tbl_ld_cben_modallist', tbl_ld_cben_modallist.f_cbyphoto);

            controlObj.singledropdownlistid('detail_f_zt_tbl_ld_cben_modallist', tbl_ld_cben_modallist.f_ztid);
            controlObj.singledropdownlistid('detail_f_value1_tbl_ld_cben_modallist', tbl_ld_cben_modallist.f_value1);

            controlObj.text('detail_f_bz_tbl_ld_cben_modallist', tbl_ld_cben_modallist.f_bz.returnStringRN());


            _serverModel = tbl_ld_cben_modallist;

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
            var tbl_ld_cben_modallist = new Object();




            tbl_ld_cben_modallist.f_value2 = controlObj.text('detail_f_value2_tbl_ld_cben_modallist');


            tbl_ld_cben_modallist.f_value3 = controlObj.text('detail_f_value3_tbl_ld_cben_modallist');


            tbl_ld_cben_modallist.f_value4 = controlObj.text('detail_f_value4_tbl_ld_cben_modallist');


            tbl_ld_cben_modallist.f_value5 = controlObj.text('detail_f_value5_tbl_ld_cben_modallist');


            tbl_ld_cben_modallist.f_value6 = controlObj.text('detail_f_value6_tbl_ld_cben_modallist');


            tbl_ld_cben_modallist.f_value7 = controlObj.text('detail_f_value7_tbl_ld_cben_modallist');


            tbl_ld_cben_modallist.f_value8 = controlObj.text('detail_f_value8_tbl_ld_cben_modallist');


            tbl_ld_cben_modallist.f_value9 = controlObj.text('detail_f_value9_tbl_ld_cben_modallist');


            tbl_ld_cben_modallist.f_value10 = controlObj.text('detail_f_value10_tbl_ld_cben_modallist');


            tbl_ld_cben_modallist.f_cbbh = controlObj.text('detail_f_cbbh_tbl_ld_cben_modallist');


            tbl_ld_cben_modallist.f_cbmc = controlObj.text('detail_f_cbmc_tbl_ld_cben_modallist');


            tbl_ld_cben_modallist.f_cbzq = controlObj.text('detail_f_cbzq_tbl_ld_cben_modallist');


            tbl_ld_cben_modallist.f_ksyf = controlObj.text('detail_f_ksyf_tbl_ld_cben_modallist');


            //tbl_ld_cben_modallist.f_cbymc = controlObj.text('detail_f_cbymc_tbl_ld_cben_modallist');


            //tbl_ld_cben_modallist.f_cbyid = controlObj.text('detail_f_cbyid_tbl_ld_cben_modallist');
            tbl_ld_cben_modallist.f_cbymc = controlObj.singledropdownlist('detail_f_cbymc_tbl_ld_cben_modallist');
            tbl_ld_cben_modallist.f_cbyid = controlObj.singledropdownlistid('detail_f_cbymc_tbl_ld_cben_modallist');


            tbl_ld_cben_modallist.f_cbyphoto = controlObj.text('detail_f_cbyphoto_tbl_ld_cben_modallist');

            tbl_ld_cben_modallist.f_zt = controlObj.singledropdownlist('detail_f_zt_tbl_ld_cben_modallist');
            tbl_ld_cben_modallist.f_ztid = controlObj.singledropdownlistid('detail_f_zt_tbl_ld_cben_modallist');
            tbl_ld_cben_modallist.f_value1 = controlObj.singledropdownlistid('detail_f_value1_tbl_ld_cben_modallist');


            tbl_ld_cben_modallist.f_bz = controlObj.text('detail_f_bz_tbl_ld_cben_modallist');

            callBackFunction.success(tbl_ld_cben_modallist);
        }
        catch (ex)
        {
            callBackFunction.fail(ex.message);
        }
    },

    /* 
    *  
    *  方法:checkDetailModel
    *  参数:tbl_ld_cben_modallist, callBackFunction
    *  根据传入的数据对象，校验数据内容_validateMessage_detail
    */
    checkDetailModel = function (tbl_ld_cben_modallist, callBackFunction)
    {
        try
        {
            var errorMessageHansMap = new hashMap();
            var errorMessagePlacementHansMap = new hashMap();





            if (tbl_ld_cben_modallist.f_value1.length > 200)
            {
                errorMessageHansMap.put('detail_f_value1_tbl_ld_cben_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_cben_modallist.f_value2.length > 200)
            {
                errorMessageHansMap.put('detail_f_value2_tbl_ld_cben_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_cben_modallist.f_value3.length > 200)
            {
                errorMessageHansMap.put('detail_f_value3_tbl_ld_cben_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_cben_modallist.f_value4.length > 200)
            {
                errorMessageHansMap.put('detail_f_value4_tbl_ld_cben_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_cben_modallist.f_value5.length > 200)
            {
                errorMessageHansMap.put('detail_f_value5_tbl_ld_cben_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_cben_modallist.f_value6.length > 200)
            {
                errorMessageHansMap.put('detail_f_value6_tbl_ld_cben_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_cben_modallist.f_value7.length > 200)
            {
                errorMessageHansMap.put('detail_f_value7_tbl_ld_cben_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_cben_modallist.f_value8.length > 200)
            {
                errorMessageHansMap.put('detail_f_value8_tbl_ld_cben_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_cben_modallist.f_value9.length > 200)
            {
                errorMessageHansMap.put('detail_f_value9_tbl_ld_cben_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_cben_modallist.f_value10.length > 200)
            {
                errorMessageHansMap.put('detail_f_value10_tbl_ld_cben_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_cben_modallist.f_cbbh.length > 200)
            {
                errorMessageHansMap.put('detail_f_cbbh_tbl_ld_cben_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_cben_modallist.f_cbbh.length < 1)
            {
                errorMessageHansMap.put('detail_f_cbbh_tbl_ld_cben_modallist', '长度不能小于<a style="color:red">1</a>个字');
            }




            if (tbl_ld_cben_modallist.f_cbmc.length > 200)
            {
                errorMessageHansMap.put('detail_f_cbmc_tbl_ld_cben_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_cben_modallist.f_cbmc.length < 1)
            {
                errorMessageHansMap.put('detail_f_cbmc_tbl_ld_cben_modallist', '长度不能小于<a style="color:red">1</a>个字');
            }




            if (tbl_ld_cben_modallist.f_cbzq.length > 200)
            {
                errorMessageHansMap.put('detail_f_cbzq_tbl_ld_cben_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_cben_modallist.f_cbzq != "" && !/^[0-9]+\.?[0-9]*$/.test(tbl_ld_cben_modallist.f_cbzq))
            {
                errorMessageHansMap.put('detail_f_cbzq_tbl_ld_cben_modallist', '必须是数字');
            }

            if (tbl_ld_cben_modallist.f_cbzq.length < 1)
            {
                errorMessageHansMap.put('detail_f_cbzq_tbl_ld_cben_modallist', '长度不能小于<a style="color:red">1</a>个字');
            }




            if (tbl_ld_cben_modallist.f_ksyf.length > 200)
            {
                errorMessageHansMap.put('detail_f_ksyf_tbl_ld_cben_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_cben_modallist.f_ksyf != "" && !/^[0-9]+\.?[0-9]*$/.test(tbl_ld_cben_modallist.f_ksyf))
            {
                errorMessageHansMap.put('detail_f_ksyf_tbl_ld_cben_modallist', '必须是数字');
            }

            if (tbl_ld_cben_modallist.f_ksyf.length < 1)
            {
                errorMessageHansMap.put('detail_f_ksyf_tbl_ld_cben_modallist', '长度不能小于<a style="color:red">1</a>个字');
            }




            if (tbl_ld_cben_modallist.f_cbymc.length > 200)
            {
                errorMessageHansMap.put('detail_f_cbymc_tbl_ld_cben_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }
            //if (tbl_ld_cben_modallist.f_cbymc.length < 1)
            //{
            //    errorMessageHansMap.put('detail_f_cbymc_tbl_ld_cben_modallist', '长度不能小于<a style="color:red">1</a>个字');
            //}




            //if (tbl_ld_cben_modallist.f_cbyid.length > 200) {
            //    errorMessageHansMap.put('detail_f_cbyid_tbl_ld_cben_modallist', '长度不能超过<a style="color:red">200</a>个字');
            //}




            if (tbl_ld_cben_modallist.f_cbyphoto.length > 200)
            {
                errorMessageHansMap.put('detail_f_cbyphoto_tbl_ld_cben_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_cben_modallist.f_zt.length > 200)
            {
                errorMessageHansMap.put('detail_f_zt_tbl_ld_cben_modallist', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_cben_modallist.f_zt.length < 1)
            {
                errorMessageHansMap.put('detail_f_zt_tbl_ld_cben_modallist', '长度不能小于<a style="color:red">1</a>个字');
            }




            if (tbl_ld_cben_modallist.f_bz.length > 4000)
            {
                errorMessageHansMap.put('detail_f_bz_tbl_ld_cben_modallist', '长度不能超过<a style="color:red">4000</a>个字');
            }


            if (errorMessageHansMap.keys().length > 0)
            {
                _validateMessage_detail.show(errorMessageHansMap, errorMessagePlacementHansMap, true);
                callBackFunction.fail('');
            }
            else
            {
                _validateMessage_detail.hidden();
                callBackFunction.success(tbl_ld_cben_modallist);
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
    *  参数:tbl_ld_cben_modallist
    *  清空数据对象
    */
    clearDetailModel = function (tbl_ld_cben_modallist)
    {



        tbl_ld_cben_modallist.f_value2 = '';
        controlObj.text('detail_f_value2_tbl_ld_cben_modallist', tbl_ld_cben_modallist.f_value2);

        tbl_ld_cben_modallist.f_value3 = '';
        controlObj.text('detail_f_value3_tbl_ld_cben_modallist', tbl_ld_cben_modallist.f_value3);

        tbl_ld_cben_modallist.f_value4 = '';
        controlObj.text('detail_f_value4_tbl_ld_cben_modallist', tbl_ld_cben_modallist.f_value4);

        tbl_ld_cben_modallist.f_value5 = '';
        controlObj.text('detail_f_value5_tbl_ld_cben_modallist', tbl_ld_cben_modallist.f_value5);

        tbl_ld_cben_modallist.f_value6 = '';
        controlObj.text('detail_f_value6_tbl_ld_cben_modallist', tbl_ld_cben_modallist.f_value6);

        tbl_ld_cben_modallist.f_value7 = '';
        controlObj.text('detail_f_value7_tbl_ld_cben_modallist', tbl_ld_cben_modallist.f_value7);

        tbl_ld_cben_modallist.f_value8 = '';
        controlObj.text('detail_f_value8_tbl_ld_cben_modallist', tbl_ld_cben_modallist.f_value8);

        tbl_ld_cben_modallist.f_value9 = '';
        controlObj.text('detail_f_value9_tbl_ld_cben_modallist', tbl_ld_cben_modallist.f_value9);

        tbl_ld_cben_modallist.f_value10 = '';
        controlObj.text('detail_f_value10_tbl_ld_cben_modallist', tbl_ld_cben_modallist.f_value10);

        tbl_ld_cben_modallist.f_cbbh = '';
        controlObj.text('detail_f_cbbh_tbl_ld_cben_modallist', tbl_ld_cben_modallist.f_cbbh);

        tbl_ld_cben_modallist.f_cbmc = '';
        controlObj.text('detail_f_cbmc_tbl_ld_cben_modallist', tbl_ld_cben_modallist.f_cbmc);

        tbl_ld_cben_modallist.f_cbzq = '';
        controlObj.text('detail_f_cbzq_tbl_ld_cben_modallist', tbl_ld_cben_modallist.f_cbzq);

        tbl_ld_cben_modallist.f_ksyf = '';
        controlObj.text('detail_f_ksyf_tbl_ld_cben_modallist', tbl_ld_cben_modallist.f_ksyf);

        //tbl_ld_cben_modallist.f_cbymc = '';
        //controlObj.text('detail_f_cbymc_tbl_ld_cben_modallist', tbl_ld_cben_modallist.f_cbymc);
        //tbl_ld_cben_modallist.f_cbyid = '';
        //controlObj.text('detail_f_cbyid_tbl_ld_cben_modallist', tbl_ld_cben_modallist.f_cbyid);
        tbl_ld_cben_modallist.f_cbymc = '';

        tbl_ld_cben_modallist.f_cbyid = '';
        controlObj.singledropdownlistid('detail_f_cbyid_tbl_ld_cben_modallist', tbl_ld_cben_modallist.f_cbyid);

        tbl_ld_cben_modallist.f_cbyphoto = '';
        controlObj.text('detail_f_cbyphoto_tbl_ld_cben_modallist', tbl_ld_cben_modallist.f_cbyphoto);

        tbl_ld_cben_modallist.f_zt = '';
        tbl_ld_cben_modallist.f_ztid = '';
        controlObj.singledropdownlistid('detail_f_zt_tbl_ld_cben_modallist', tbl_ld_cben_modallist.f_ztid);
        tbl_ld_cben_modallist.f_value1 = '';
        controlObj.singledropdownlistid('detail_f_value1_tbl_ld_cben_modallist', tbl_ld_cben_modallist.f_value1);

        tbl_ld_cben_modallist.f_bz = '';
        controlObj.text('detail_f_bz_tbl_ld_cben_modallist', tbl_ld_cben_modallist.f_bz.returnStringRN());


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
        var columnsString = 'f_value1^f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^f_cbyphoto^f_cbbh^f_cbmc^f_cbzq^f_ksyf^f_cbymc^f_cbyid^f_zt^f_ztid^f_bz^sys_id';

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
    *  参数:tbl_ld_cben_modallist, callbackFunction
    *  根据传入的数据对象，更新数据
    */
    updateDetailData = function (tbl_ld_cben_modallist, callbackFunction)
    {
        var d = new Date();
        var columns = 'f_value1^f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^f_cbyphoto^f_cbbh^f_cbmc^f_cbzq^f_ksyf^f_cbymc^f_cbyid^f_zt^f_ztid^f_bz^sys_id^sys_lastedituserid^sys_lasteditusername^sys_lasteditdate';
        
        var json = {
            sys_id: _gridEditId,


            f_value1: tbl_ld_cben_modallist.f_value1,

            f_value2: tbl_ld_cben_modallist.f_value2,

            f_value3: tbl_ld_cben_modallist.f_value3,

            f_value4: tbl_ld_cben_modallist.f_value4,

            f_value5: tbl_ld_cben_modallist.f_value5,

            f_value6: tbl_ld_cben_modallist.f_value6,

            f_value7: tbl_ld_cben_modallist.f_value7,

            f_value8: tbl_ld_cben_modallist.f_value8,

            f_value9: tbl_ld_cben_modallist.f_value9,

            f_value10: tbl_ld_cben_modallist.f_value10,

            f_cbbh: tbl_ld_cben_modallist.f_cbbh,

            f_cbmc: tbl_ld_cben_modallist.f_cbmc,

            f_cbzq: tbl_ld_cben_modallist.f_cbzq,

            f_ksyf: tbl_ld_cben_modallist.f_ksyf,

            f_cbymc: tbl_ld_cben_modallist.f_cbymc,

            f_cbyid: tbl_ld_cben_modallist.f_cbyid,

            f_cbyphoto: tbl_ld_cben_modallist.f_cbyphoto,

            f_zt: tbl_ld_cben_modallist.f_zt,
            f_ztid: tbl_ld_cben_modallist.f_ztid,

            f_bz: tbl_ld_cben_modallist.f_bz.formatStringRN(),


            sys_lasteditusername: basePageObj._userInfoJson.sys_username,
            sys_lastedituserid: basePageObj._userInfoJson.sys_userid,
            sys_lasteditdate: d.Format('yyyy-MM-dd hh:mm:ss')

        };


        var data = {
            columns: columns,
            clientInf: _clientInf,
            json: JSON.stringify(json),
            
        };

        doAjaxFunction(_serviceUrl, 'Update', data, {
            success: function (message)
            {
                _serverModel = tbl_ld_cben_modallist;
                //commonObj.updateLog(_serverModel, tbl_ld_cben_modallist, 'tbl_ld_cben', _gridEditId, 'tbl_ld_cben_modallist', '抄本信息修改程序', 'div_detail_【key】_【tablename】_modallist', _clientInf, {
                //    success: function ()
                //    {
                //        _serverModel = tbl_ld_cben_modallist;
                //    },
                //    fail: function ()
                //    {
                //        _serverModel = tbl_ld_cben_modallist;
                //    }
                //});
                callbackFunction.success(tbl_ld_cben_modallist);
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


            f_cbbh: '',


            f_cbmc: '',


            f_cbzq: '',


            f_ksyf: '',


            f_cbymc: '',


            f_cbyid: '',


            f_cbyphoto: '',

            f_ztid: '0',


            f_bz: '',



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
                bindGrid(false, {
                    success: function ()
                    {
                        getDetailData({
                            success: function (tbl_ld_cben_modallist)
                            {
                               
                                
                                setDetailModel(tbl_ld_cben_modallist, {
                                    success: function ()
                                    {
                                        $('#div_detail_modal_tbl_ld_cben_modallist').modal('show');
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
            *  方法:f_zt_onchange
            *  参数:changeEventParameter
            *  状态onchange事件
            */
            f_value1_onchange = function (e)
            {
                var controlid = e.target.id;
            },
     /* 
            *  
            *  方法:f_zt_onchange
            *  参数:changeEventParameter
            *  状态onchange事件
            */
     f_cbymc_onchange = function (e)
     {
         var controlid = e.target.id;
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
        _pr_appcode: '',

        //=================================================================================
        //                                      公有方法 
        //=================================================================================

        init: function ()
        {
            try
            {
                _alertMessage = new alertMessage();
                _confirmMessage = new confirmMessage();
                _blockMessage = new blockMessage();
                _resultMessage = new resultMessage();
                _blockMessage.show('程序加载中...', 'loading');
                basePageObj.initBasePage({
                    success: function ()
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
                                                bindGrid(false, {
                                                    success: function ()
                                                    {
                                                        _validateMessage_search = new validateMessage('btn_search_modal_search_tbl_ld_cben_modallist');
                                                        _validateMessage_detail = new validateMessage('btn_detail_modal_save_tbl_ld_cben_modallist');
                                                        _ladda_btn_command_new = Ladda.create('btn_command_new_tbl_ld_cben_modallist');
                                                        _ladda_btn_command_delete = Ladda.create('btn_command_delete_tbl_ld_cben_modallist');
                                                        _ladda_btn_command_save = Ladda.create('btn_detail_modal_save_tbl_ld_cben_modallist');
                                                        _blockMessage.hidden();

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

                    },
                    fail: function (message)
                    {
                        _blockMessage.show(message, 'fail');
                    }
                });
            }
            catch (ex)
            {
                _blockMessage.show('程序初始化失败。<br/>' + ex.message, 'fail');
            }
        },
        //---------------------------------------------------------------------------------
        // ---------------------------------按钮------------------------------------------
        //---------------------------------------------------------------------------------
        /* 
  *  
  *  方法:btn_command_log_onclick
  *  参数:
  *  查看日志按钮
  */
        btn_command_log_onclick: function ()
        {
            tbl_ld_log_modallist_Obj._pr_tableprikeyvalue = _gridEditId;
            tbl_ld_log_modallist_Obj.bindGrid();

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
            addDetailData({
                success: function ()
                {
                    that.btn_command_log_onclick();
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
                var currentcount = $('#table_grid_tbl_ld_cben_modallist').bootstrapTable('getSelections').length;
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
                                        bindGrid(true, {
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
            $('#table_grid_tbl_ld_cben_modallist').bootstrapTable('uncheckAll');
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
                                        bindGrid(true, {
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
            $('#btn_command_search_tbl_ld_cben_modallist').html('简单查询');
            $('#txt_command_search_tbl_ld_cben_modallist').removeAttr('disabled');
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
            $('#btn_command_search_tbl_ld_cben_modallist').html('高级查询');
            $('#txt_command_search_tbl_ld_cben_modallist').attr('disabled', 'disabled');

            $('#div_search_modal_tbl_ld_cben_modallist').modal('show');
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
                                    $('#div_search_modal_tbl_ld_cben_modallist').modal('hide')
                                    that._pr_gridpageindex = '1';
                                    that._pr_gridselectids = '';
                                    bindGrid(true, {
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
            $('#div_search_modal_tbl_ld_cben_modallist').modal('hide');

            that._pr_searchtype = '1';
            $('#btn_command_search_tbl_ld_cben_modallist').html('简单查询');
            $('#txt_command_search_tbl_ld_cben_modallist').removeAttr('disabled');

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
            $('#btn_command_search_tbl_ld_cben_modallist').html('高级查询');
            $('#txt_command_search_tbl_ld_cben_modallist').attr('disabled', 'disabled');

            $('#div_search_modal_tbl_ld_cben_modallist').modal('show');
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
            _ladda_btn_command_save.start();
            getDetailModel({
                success: function (tbl_ld_cben_modallist)
                {
                    checkDetailModel(tbl_ld_cben_modallist, {
                        success: function (tbl_ld_cben_modallist)
                        {

                            updateDetailData(tbl_ld_cben_modallist, {
                                success: function (tbl_ld_cben_modallist)
                                {
                                    tbl_ld_log_modallist_Obj._pr_tableprikeyvalue = _gridEditId;
                                    tbl_ld_log_modallist_Obj.bindGrid();
                                    clearDetailModel(tbl_ld_cben_modallist);
                                    $('#div_detail_modal_tbl_ld_cben_modallist').modal('hide')
                                    bindGrid(false, {
                                        success: function ()
                                        {
                                            _ladda_btn_command_save.stop();

                                        }, fail: function (message)
                                        {
                                            _ladda_btn_command_save.stop();
                                            _alertMessage.show('绑定失败', 'fail');
                                            _resultMessage.show(message);
                                        }
                                    });
                                },
                                fail: function (message)
                                {
                                    _ladda_btn_command_save.stop();
                                    _alertMessage.show('数据更新失败', 'fail');
                                    _resultMessage.show(message);
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
                }, fail: function (message)
                {
                    _ladda_btn_command_save.stop();
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
            $('#div_detail_modal_tbl_ld_cben_modallist').modal('hide');
            _validateMessage_detail.hidden();

        },
        end: function ()
        {
        }
    };
    return that;
})();



$(document).ready(function ()
{
    tbl_ld_cben_modallist_Obj.init();
});





