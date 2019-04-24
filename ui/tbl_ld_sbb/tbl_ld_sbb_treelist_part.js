


var tbl_ld_sbb_treelist_Obj = (function ()
{
    'use strict';
    //=================================================================================
    //                                      私有
    //=================================================================================
    //=================================================================================
    //                                      私有属性 
    //=================================================================================
    var _serviceUrl = '//127.0.0.1/sara.dd.ldsw/service/service_tbl_ld_sbb.asmx/',

    //Grid控件的分页参数，设置为空即可实现不分页
    _pageSize = '',
    _isPage = false,
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
                    $('#btn_command_search_tbl_ld_sbb_treelist').html('简单查询');
                    $('#txt_command_search_tbl_ld_sbb_treelist').removeAttr("disabled");

                    break;
                case "2":
                    $('#btn_command_search_tbl_ld_sbb_treelist').html('高级查询');
                    $('#txt_command_search_tbl_ld_sbb_treelist').attr("disabled", true);
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

   setButtonDisable = function (isDisable)
   {
       if (that._pr_listtype == '1')
       {
           if (isDisable == true)
           {
               $('#btn_command_save_tbl_ld_sbb_treelist').addClass('hidden');
               $('#btn_command_delete_tbl_ld_sbb_treelist').addClass('hidden');

               var rows = $('#table_grid_tbl_ld_sbb_treelist').bootstrapTable('getData');
               if (rows.length > 0)
               {
                   $('#btn_command_new_tbl_ld_sbb_treelist').addClass('hidden');
               }
               else
               {
                   $('#btn_command_new_tbl_ld_sbb_treelist').removeClass('hidden');
               }

           }
           else
           {
               $('#btn_command_save_tbl_ld_sbb_treelist').removeClass('hidden');
               $('#btn_command_delete_tbl_ld_sbb_treelist').removeClass('hidden');
               $('#btn_command_new_tbl_ld_sbb_treelist').removeClass('hidden');
           }
       }
       else
       {
           $('#btn_command_save_tbl_ld_sbb_treelist').addClass('hidden');
           $('#btn_command_delete_tbl_ld_sbb_treelist').addClass('hidden');
           $('#btn_command_new_tbl_ld_sbb_treelist').addClass('hidden');
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

        codeServiceId += "0522^";

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

                    //_baseCodeHashMap.put('codeservice_0522', resultArray['0522']);

                    _baseCodeHashMap.put('codeservice_0523', resultArray['0523']);

                    _baseCodeHashMap.put('codeservice_0524', resultArray['0524']);

                    _baseCodeHashMap.put('codeservice_0525', resultArray['0525']);

                    _baseCodeHashMap.put('codeservice_0526', resultArray['0526']);
                    var sqlJson = {
                        "tbl_ldbm_sbfz": "select sys_id as id, f_fzmc as text,decode(f_ztid,'0','false','true') as disabled from tbl_ldbm_sbfz where sys_delflag='0'  order by sys_id",
                    }
                    //select sys_id as id, f_fzbm||'_'||f_fzmc as text from tbl_ldbm_yhfz where sys_delflag='0' and f_ztid='0'
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

            var codeService_0522 = _baseCodeHashMap.get('codeservice_0522');

            var codeService_0523 = _baseCodeHashMap.get('codeservice_0523');

            var codeService_0524 = _baseCodeHashMap.get('codeservice_0524');

            var codeService_0525 = _baseCodeHashMap.get('codeservice_0525');

            var codeService_0526 = _baseCodeHashMap.get('codeservice_0526');

            controlObj.multidropdownlistinit('search_f_sbfz_tbl_ld_sbb_treelist', codeService_0522);

            controlObj.multidropdownlistinit('search_f_sbkj_tbl_ld_sbb_treelist', codeService_0523);

            controlObj.multidropdownlistinit('search_f_sblx_tbl_ld_sbb_treelist', codeService_0524);

            controlObj.multidropdownlistinit('search_f_jllx_tbl_ld_sbb_treelist', codeService_0525);

            controlObj.multidropdownlistinit('search_f_zt_tbl_ld_sbb_treelist', codeService_0526);




            //模态窗口
            $('#div_search_modal_tbl_ld_sbb_treelist').modal({
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
                        $("#txt_command_search_tbl_ld_sbb_treelist").val(that._pr_searchcontent.type1);
                    }

                    break;
                case "2":
                    if (that._pr_searchcontent.type2 != undefined)
                    {
                        //高级查询
                        var tbl_ld_sbb_treelist = that._pr_searchcontent.type2;


                        controlObj.text('search_f_value1_tbl_ld_sbb_treelist', tbl_ld_sbb_treelist.f_value1);

                        controlObj.text('search_f_value2_tbl_ld_sbb_treelist', tbl_ld_sbb_treelist.f_value2);

                        controlObj.text('search_f_value3_tbl_ld_sbb_treelist', tbl_ld_sbb_treelist.f_value3);

                        controlObj.text('search_f_value4_tbl_ld_sbb_treelist', tbl_ld_sbb_treelist.f_value4);

                        controlObj.text('search_f_value5_tbl_ld_sbb_treelist', tbl_ld_sbb_treelist.f_value5);

                        controlObj.text('search_f_value6_tbl_ld_sbb_treelist', tbl_ld_sbb_treelist.f_value6);

                        controlObj.text('search_f_value7_tbl_ld_sbb_treelist', tbl_ld_sbb_treelist.f_value7);

                        controlObj.text('search_f_value8_tbl_ld_sbb_treelist', tbl_ld_sbb_treelist.f_value8);

                        controlObj.text('search_f_value9_tbl_ld_sbb_treelist', tbl_ld_sbb_treelist.f_value9);

                        controlObj.text('search_f_value10_tbl_ld_sbb_treelist', tbl_ld_sbb_treelist.f_value10);

                        controlObj.text('search_f_khbh_tbl_ld_sbb_treelist', tbl_ld_sbb_treelist.f_khbh);

                        controlObj.text('search_f_sbbh_tbl_ld_sbb_treelist', tbl_ld_sbb_treelist.f_sbbh);

                        controlObj.text('search_f_ztsbh_tbl_ld_sbb_treelist', tbl_ld_sbb_treelist.f_ztsbh);

                        controlObj.text('search_f_lxth_tbl_ld_sbb_treelist', tbl_ld_sbb_treelist.f_lxth);

                        controlObj.multidropdownlistid('search_f_sbfz_tbl_ld_sbb_treelist', tbl_ld_sbb_treelist.f_sbfzid);

                        controlObj.text('search_f_sbpp_tbl_ld_sbb_treelist', tbl_ld_sbb_treelist.f_sbpp);

                        controlObj.text('search_f_mph_tbl_ld_sbb_treelist', tbl_ld_sbb_treelist.f_mph);

                        controlObj.text('search_f_sbdz_tbl_ld_sbb_treelist', tbl_ld_sbb_treelist.f_sbdz);

                        controlObj.text('search_f_rs_tbl_ld_sbb_treelist', tbl_ld_sbb_treelist.f_rs);

                        controlObj.multidropdownlistid('search_f_sbkj_tbl_ld_sbb_treelist', tbl_ld_sbb_treelist.f_sbkjid);

                        controlObj.multidropdownlistid('search_f_sblx_tbl_ld_sbb_treelist', tbl_ld_sbb_treelist.f_sblxid);

                        controlObj.multidropdownlistid('search_f_jllx_tbl_ld_sbb_treelist', tbl_ld_sbb_treelist.f_jllxid);

                        controlObj.text('search_f_cszm_tbl_ld_sbb_treelist', tbl_ld_sbb_treelist.f_cszm);

                        controlObj.text('search_f_bqzm_tbl_ld_sbb_treelist', tbl_ld_sbb_treelist.f_bqzm);

                        controlObj.text('search_f_sqzm_tbl_ld_sbb_treelist', tbl_ld_sbb_treelist.f_sqzm);

                        controlObj.text('search_f_sqsl_tbl_ld_sbb_treelist', tbl_ld_sbb_treelist.f_sqsl);
                        controlObj.text('search_f_bqsl_tbl_ld_sbb_treelist', tbl_ld_sbb_treelist.f_bqsl);

                        controlObj.text('search_f_ljgl_tbl_ld_sbb_treelist', tbl_ld_sbb_treelist.f_ljgl);

                        controlObj.text('search_f_nljgl_tbl_ld_sbb_treelist', tbl_ld_sbb_treelist.f_nljgl);

                        controlObj.text('search_f_qsqpjsl_tbl_ld_sbb_treelist', tbl_ld_sbb_treelist.f_qsqpjsl);

                        controlObj.text('search_f_qlqpjsl_tbl_ld_sbb_treelist', tbl_ld_sbb_treelist.f_qlqpjsl);

                        controlObj.multidropdownlistid('search_f_zt_tbl_ld_sbb_treelist', tbl_ld_sbb_treelist.f_ztid);

                        controlObj.text('search_f_bz_tbl_ld_sbb_treelist', tbl_ld_sbb_treelist.f_bz);


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
                    that._pr_searchcontent.type1 = $("#txt_command_search_tbl_ld_sbb_treelist").val();

                    break;
                case "2":

                    //高级查询
                    var tbl_ld_sbb_treelist = new Object();


                    tbl_ld_sbb_treelist.f_value1 = controlObj.text('search_f_value1_tbl_ld_sbb_treelist');


                    tbl_ld_sbb_treelist.f_value2 = controlObj.text('search_f_value2_tbl_ld_sbb_treelist');


                    tbl_ld_sbb_treelist.f_value3 = controlObj.text('search_f_value3_tbl_ld_sbb_treelist');


                    tbl_ld_sbb_treelist.f_value4 = controlObj.text('search_f_value4_tbl_ld_sbb_treelist');


                    tbl_ld_sbb_treelist.f_value5 = controlObj.text('search_f_value5_tbl_ld_sbb_treelist');


                    tbl_ld_sbb_treelist.f_value6 = controlObj.text('search_f_value6_tbl_ld_sbb_treelist');


                    tbl_ld_sbb_treelist.f_value7 = controlObj.text('search_f_value7_tbl_ld_sbb_treelist');


                    tbl_ld_sbb_treelist.f_value8 = controlObj.text('search_f_value8_tbl_ld_sbb_treelist');


                    tbl_ld_sbb_treelist.f_value9 = controlObj.text('search_f_value9_tbl_ld_sbb_treelist');


                    tbl_ld_sbb_treelist.f_value10 = controlObj.text('search_f_value10_tbl_ld_sbb_treelist');


                    tbl_ld_sbb_treelist.f_khbh = controlObj.text('search_f_khbh_tbl_ld_sbb_treelist');


                    tbl_ld_sbb_treelist.f_sbbh = controlObj.text('search_f_sbbh_tbl_ld_sbb_treelist');


                    tbl_ld_sbb_treelist.f_ztsbh = controlObj.text('search_f_ztsbh_tbl_ld_sbb_treelist');


                    tbl_ld_sbb_treelist.f_lxth = controlObj.text('search_f_lxth_tbl_ld_sbb_treelist');


                    tbl_ld_sbb_treelist.f_sbfzid = controlObj.multidropdownlistid('search_f_sbfz_tbl_ld_sbb_treelist');


                    tbl_ld_sbb_treelist.f_sbpp = controlObj.text('search_f_sbpp_tbl_ld_sbb_treelist');


                    tbl_ld_sbb_treelist.f_mph = controlObj.text('search_f_mph_tbl_ld_sbb_treelist');


                    tbl_ld_sbb_treelist.f_sbdz = controlObj.text('search_f_sbdz_tbl_ld_sbb_treelist');


                    tbl_ld_sbb_treelist.f_rs = controlObj.text('search_f_rs_tbl_ld_sbb_treelist');


                    tbl_ld_sbb_treelist.f_sbkjid = controlObj.multidropdownlistid('search_f_sbkj_tbl_ld_sbb_treelist');


                    tbl_ld_sbb_treelist.f_sblxid = controlObj.multidropdownlistid('search_f_sblx_tbl_ld_sbb_treelist');


                    tbl_ld_sbb_treelist.f_jllxid = controlObj.multidropdownlistid('search_f_jllx_tbl_ld_sbb_treelist');


                    tbl_ld_sbb_treelist.f_cszm = controlObj.text('search_f_cszm_tbl_ld_sbb_treelist');


                    tbl_ld_sbb_treelist.f_bqzm = controlObj.text('search_f_bqzm_tbl_ld_sbb_treelist');


                    tbl_ld_sbb_treelist.f_sqzm = controlObj.text('search_f_sqzm_tbl_ld_sbb_treelist');


                    tbl_ld_sbb_treelist.f_sqsl = controlObj.text('search_f_sqsl_tbl_ld_sbb_treelist');

                    tbl_ld_sbb_treelist.f_bqsl = controlObj.text('search_f_bqsl_tbl_ld_sbb_treelist');


                    tbl_ld_sbb_treelist.f_ljgl = controlObj.text('search_f_ljgl_tbl_ld_sbb_treelist');

                    tbl_ld_sbb_treelist.f_nljgl = controlObj.text('search_f_nljgl_tbl_ld_sbb_treelist');


                    tbl_ld_sbb_treelist.f_qsqpjsl = controlObj.text('search_f_qsqpjsl_tbl_ld_sbb_treelist');


                    tbl_ld_sbb_treelist.f_qlqpjsl = controlObj.text('search_f_qlqpjsl_tbl_ld_sbb_treelist');


                    tbl_ld_sbb_treelist.f_ztid = controlObj.multidropdownlistid('search_f_zt_tbl_ld_sbb_treelist');


                    tbl_ld_sbb_treelist.f_bz = controlObj.text('search_f_bz_tbl_ld_sbb_treelist');

                    that._pr_searchcontent.type2 = tbl_ld_sbb_treelist;
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
            var tbl_ld_sbb_treelist = that._pr_searchcontent.type2;
            var errorMessageHansMap = new hashMap();
            var errorMessagePlacementHansMap = new hashMap();




            if (tbl_ld_sbb_treelist.f_value1.length > 200)
            {
                errorMessageHansMap.put('search_f_value1_tbl_ld_sbb_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_sbb_treelist.f_value2.length > 200)
            {
                errorMessageHansMap.put('search_f_value2_tbl_ld_sbb_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_sbb_treelist.f_value3.length > 200)
            {
                errorMessageHansMap.put('search_f_value3_tbl_ld_sbb_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_sbb_treelist.f_value4.length > 200)
            {
                errorMessageHansMap.put('search_f_value4_tbl_ld_sbb_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_sbb_treelist.f_value5.length > 200)
            {
                errorMessageHansMap.put('search_f_value5_tbl_ld_sbb_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_sbb_treelist.f_value6.length > 200)
            {
                errorMessageHansMap.put('search_f_value6_tbl_ld_sbb_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_sbb_treelist.f_value7.length > 200)
            {
                errorMessageHansMap.put('search_f_value7_tbl_ld_sbb_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_sbb_treelist.f_value8.length > 200)
            {
                errorMessageHansMap.put('search_f_value8_tbl_ld_sbb_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_sbb_treelist.f_value9.length > 200)
            {
                errorMessageHansMap.put('search_f_value9_tbl_ld_sbb_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_sbb_treelist.f_value10.length > 200)
            {
                errorMessageHansMap.put('search_f_value10_tbl_ld_sbb_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_sbb_treelist.f_khbh.length > 200)
            {
                errorMessageHansMap.put('search_f_khbh_tbl_ld_sbb_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_sbb_treelist.f_sbbh.length > 200)
            {
                errorMessageHansMap.put('search_f_sbbh_tbl_ld_sbb_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_sbb_treelist.f_ztsbh.length > 200)
            {
                errorMessageHansMap.put('search_f_ztsbh_tbl_ld_sbb_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_sbb_treelist.f_lxth.length > 200)
            {
                errorMessageHansMap.put('search_f_lxth_tbl_ld_sbb_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_sbb_treelist.f_sbfzid.length > 200)
            {
                errorMessageHansMap.put('search_f_sbfz_tbl_ld_sbb_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_sbb_treelist.f_sbpp.length > 200)
            {
                errorMessageHansMap.put('search_f_sbpp_tbl_ld_sbb_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_sbb_treelist.f_mph.length > 200)
            {
                errorMessageHansMap.put('search_f_mph_tbl_ld_sbb_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_sbb_treelist.f_sbdz.length > 200)
            {
                errorMessageHansMap.put('search_f_sbdz_tbl_ld_sbb_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_sbb_treelist.f_rs.length > 200)
            {
                errorMessageHansMap.put('search_f_rs_tbl_ld_sbb_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_sbb_treelist.f_sbkjid.length > 200)
            {
                errorMessageHansMap.put('search_f_sbkj_tbl_ld_sbb_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_sbb_treelist.f_sblxid.length > 200)
            {
                errorMessageHansMap.put('search_f_sblx_tbl_ld_sbb_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_sbb_treelist.f_jllxid.length > 200)
            {
                errorMessageHansMap.put('search_f_jllx_tbl_ld_sbb_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_sbb_treelist.f_cszm.length > 200)
            {
                errorMessageHansMap.put('search_f_cszm_tbl_ld_sbb_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_sbb_treelist.f_bqzm.length > 200)
            {
                errorMessageHansMap.put('search_f_bqzm_tbl_ld_sbb_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_sbb_treelist.f_sqzm.length > 200)
            {
                errorMessageHansMap.put('search_f_sqzm_tbl_ld_sbb_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_sbb_treelist.f_sqsl.length > 200)
            {
                errorMessageHansMap.put('search_f_sqsl_tbl_ld_sbb_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }
            if (tbl_ld_sbb_treelist.f_bqsl.length > 200)
            {
                errorMessageHansMap.put('search_f_bqsl_tbl_ld_sbb_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }



            if (tbl_ld_sbb_treelist.f_ljgl.length > 200)
            {
                errorMessageHansMap.put('search_f_ljgl_tbl_ld_sbb_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }
            if (tbl_ld_sbb_treelist.f_nljgl.length > 200)
            {
                errorMessageHansMap.put('search_f_nljgl_tbl_ld_sbb_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_sbb_treelist.f_qsqpjsl.length > 200)
            {
                errorMessageHansMap.put('search_f_qsqpjsl_tbl_ld_sbb_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_sbb_treelist.f_qlqpjsl.length > 200)
            {
                errorMessageHansMap.put('search_f_qlqpjsl_tbl_ld_sbb_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_sbb_treelist.f_ztid.length > 200)
            {
                errorMessageHansMap.put('search_f_zt_tbl_ld_sbb_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_sbb_treelist.f_bz.length > 200)
            {
                errorMessageHansMap.put('search_f_bz_tbl_ld_sbb_treelist', '长度不能超过<a style="color:red">200</a>个字');
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
                controlObj.text('search_f_value1_tbl_ld_sbb_treelist', that._pr_searchcontent.type2.f_value1);


                that._pr_searchcontent.type2.f_value2 = '';
                controlObj.text('search_f_value2_tbl_ld_sbb_treelist', that._pr_searchcontent.type2.f_value2);


                that._pr_searchcontent.type2.f_value3 = '';
                controlObj.text('search_f_value3_tbl_ld_sbb_treelist', that._pr_searchcontent.type2.f_value3);


                that._pr_searchcontent.type2.f_value4 = '';
                controlObj.text('search_f_value4_tbl_ld_sbb_treelist', that._pr_searchcontent.type2.f_value4);


                that._pr_searchcontent.type2.f_value5 = '';
                controlObj.text('search_f_value5_tbl_ld_sbb_treelist', that._pr_searchcontent.type2.f_value5);


                that._pr_searchcontent.type2.f_value6 = '';
                controlObj.text('search_f_value6_tbl_ld_sbb_treelist', that._pr_searchcontent.type2.f_value6);


                that._pr_searchcontent.type2.f_value7 = '';
                controlObj.text('search_f_value7_tbl_ld_sbb_treelist', that._pr_searchcontent.type2.f_value7);


                that._pr_searchcontent.type2.f_value8 = '';
                controlObj.text('search_f_value8_tbl_ld_sbb_treelist', that._pr_searchcontent.type2.f_value8);


                that._pr_searchcontent.type2.f_value9 = '';
                controlObj.text('search_f_value9_tbl_ld_sbb_treelist', that._pr_searchcontent.type2.f_value9);


                that._pr_searchcontent.type2.f_value10 = '';
                controlObj.text('search_f_value10_tbl_ld_sbb_treelist', that._pr_searchcontent.type2.f_value10);


                that._pr_searchcontent.type2.f_khbh = '';
                controlObj.text('search_f_khbh_tbl_ld_sbb_treelist', that._pr_searchcontent.type2.f_khbh);


                that._pr_searchcontent.type2.f_sbbh = '';
                controlObj.text('search_f_sbbh_tbl_ld_sbb_treelist', that._pr_searchcontent.type2.f_sbbh);


                that._pr_searchcontent.type2.f_ztsbh = '';
                controlObj.text('search_f_ztsbh_tbl_ld_sbb_treelist', that._pr_searchcontent.type2.f_ztsbh);


                that._pr_searchcontent.type2.f_lxth = '';
                controlObj.text('search_f_lxth_tbl_ld_sbb_treelist', that._pr_searchcontent.type2.f_lxth);


                that._pr_searchcontent.type2.f_sbfzid = '';
                controlObj.multidropdownlistid('search_f_sbfz_tbl_ld_sbb_treelist', that._pr_searchcontent.type2.f_sbfzid);


                that._pr_searchcontent.type2.f_sbpp = '';
                controlObj.text('search_f_sbpp_tbl_ld_sbb_treelist', that._pr_searchcontent.type2.f_sbpp);


                that._pr_searchcontent.type2.f_mph = '';
                controlObj.text('search_f_mph_tbl_ld_sbb_treelist', that._pr_searchcontent.type2.f_mph);


                that._pr_searchcontent.type2.f_sbdz = '';
                controlObj.text('search_f_sbdz_tbl_ld_sbb_treelist', that._pr_searchcontent.type2.f_sbdz);


                that._pr_searchcontent.type2.f_rs = '';
                controlObj.text('search_f_rs_tbl_ld_sbb_treelist', that._pr_searchcontent.type2.f_rs);


                that._pr_searchcontent.type2.f_sbkjid = '';
                controlObj.multidropdownlistid('search_f_sbkj_tbl_ld_sbb_treelist', that._pr_searchcontent.type2.f_sbkjid);


                that._pr_searchcontent.type2.f_sblxid = '';
                controlObj.multidropdownlistid('search_f_sblx_tbl_ld_sbb_treelist', that._pr_searchcontent.type2.f_sblxid);


                that._pr_searchcontent.type2.f_jllxid = '';
                controlObj.multidropdownlistid('search_f_jllx_tbl_ld_sbb_treelist', that._pr_searchcontent.type2.f_jllxid);


                that._pr_searchcontent.type2.f_cszm = '';
                controlObj.text('search_f_cszm_tbl_ld_sbb_treelist', that._pr_searchcontent.type2.f_cszm);


                that._pr_searchcontent.type2.f_bqzm = '';
                controlObj.text('search_f_bqzm_tbl_ld_sbb_treelist', that._pr_searchcontent.type2.f_bqzm);


                that._pr_searchcontent.type2.f_sqzm = '';
                controlObj.text('search_f_sqzm_tbl_ld_sbb_treelist', that._pr_searchcontent.type2.f_sqzm);


                that._pr_searchcontent.type2.f_sqsl = '';
                controlObj.text('search_f_sqsl_tbl_ld_sbb_treelist', that._pr_searchcontent.type2.f_sqsl);

                that._pr_searchcontent.type2.f_bqsl = '';
                controlObj.text('search_f_bqsl_tbl_ld_sbb_treelist', that._pr_searchcontent.type2.f_bqsl);


                that._pr_searchcontent.type2.f_ljgl = '';
                controlObj.text('search_f_ljgl_tbl_ld_sbb_treelist', that._pr_searchcontent.type2.f_ljgl);

                that._pr_searchcontent.type2.f_nljgl = '';
                controlObj.text('search_f_nljgl_tbl_ld_sbb_treelist', that._pr_searchcontent.type2.f_nljgl);


                that._pr_searchcontent.type2.f_qsqpjsl = '';
                controlObj.text('search_f_qsqpjsl_tbl_ld_sbb_treelist', that._pr_searchcontent.type2.f_qsqpjsl);


                that._pr_searchcontent.type2.f_qlqpjsl = '';
                controlObj.text('search_f_qlqpjsl_tbl_ld_sbb_treelist', that._pr_searchcontent.type2.f_qlqpjsl);


                that._pr_searchcontent.type2.f_ztid = '';
                controlObj.multidropdownlistid('search_f_zt_tbl_ld_sbb_treelist', that._pr_searchcontent.type2.f_ztid);


                that._pr_searchcontent.type2.f_bz = '';
                controlObj.text('search_f_bz_tbl_ld_sbb_treelist', that._pr_searchcontent.type2.f_bz);



                break;
            case "2":
                if (that._pr_searchcontent.type1 == undefined)
                {
                    that._pr_searchcontent.type1 = '';
                }

                $("#txt_command_search_tbl_ld_sbb_treelist").val('');
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
    initGrid = function (callBackFunction)
    {
        try
        {
            $('#table_grid_tbl_ld_sbb_treelist').bootstrapTable({
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
                    formatter: function (value, row, index)
                    {
                        var resultHtml = "";
                        var value = "";
                        resultHtml += "<div class=\"gridcell-divtable\">";

                        //内容
                        {
                            resultHtml += "<div class=\"gridcell-divcell gridcell-content\" >";

                            //==水表编号
                            {
                                value = row.f_sbbh;

                                if (value.length > 10)
                                {
                                    value = value.substr(0, 10) + '...';
                                }

                                resultHtml += "<div><span class=\"gridcell-fieldnamecn\">水表编号：</span>" + value + "</div>";
                            }


                            //==旧水表号
                            {
                                value = row.f_ztsbh;

                                if (value.length > 10)
                                {
                                    value = value.substr(0, 10) + '...';
                                }

                                resultHtml += "<div><span class=\"gridcell-fieldnamecn\">旧水表号：</span>" + value + "</div>";
                            }


                            //==老系统号
                            {
                                value = row.f_lxth;

                                if (value.length > 10)
                                {
                                    value = value.substr(0, 10) + '...';
                                }

                                resultHtml += "<div><span class=\"gridcell-fieldnamecn\">老系统号：</span>" + value + "</div>";
                            }


                            //==水表分组
                            {
                                value = row.f_sbfz;

                                if (value.length > 10)
                                {
                                    value = value.substr(0, 10) + '...';
                                }

                                resultHtml += "<div><span class=\"gridcell-fieldnamecn\">水表分组：</span>" + value + "</div>";
                            }




                            //==水表品牌
                            {
                                value = row.f_sbpp;

                                if (value.length > 10)
                                {
                                    value = value.substr(0, 10) + '...';
                                }

                                resultHtml += "<div><span class=\"gridcell-fieldnamecn\">水表品牌：</span>" + value + "</div>";
                            }


                            //==铭牌号
                            {
                                value = row.f_mph;

                                if (value.length > 10)
                                {
                                    value = value.substr(0, 10) + '...';
                                }

                                resultHtml += "<div><span class=\"gridcell-fieldnamecn\">铭牌号：</span>" + value + "</div>";
                            }


                            //==水表地址
                            {
                                value = row.f_sbdz;

                                if (value.length > 10)
                                {
                                    value = value.substr(0, 10) + '...';
                                }

                                resultHtml += "<div><span class=\"gridcell-fieldnamecn\">水表地址：</span>" + value + "</div>";
                            }


                            //==人数
                            {
                                value = row.f_rs;

                                if (value.length > 10)
                                {
                                    value = value.substr(0, 10) + '...';
                                }

                                resultHtml += "<div><span class=\"gridcell-fieldnamecn\">人数：</span>" + value + "</div>";
                            }


                            //==水表口径
                            {
                                value = row.f_sbkj;

                                if (value.length > 10)
                                {
                                    value = value.substr(0, 10) + '...';
                                }

                                resultHtml += "<div><span class=\"gridcell-fieldnamecn\">水表口径：</span>" + value + "</div>";
                            }




                            //==水表类型
                            {
                                value = row.f_sblx;

                                if (value.length > 10)
                                {
                                    value = value.substr(0, 10) + '...';
                                }

                                resultHtml += "<div><span class=\"gridcell-fieldnamecn\">水表类型：</span>" + value + "</div>";
                            }




                            //==计量类型
                            {
                                value = row.f_jllx;

                                if (value.length > 10)
                                {
                                    value = value.substr(0, 10) + '...';
                                }

                                resultHtml += "<div><span class=\"gridcell-fieldnamecn\">计量类型：</span>" + value + "</div>";
                            }




                            //==初始止码
                            {
                                value = row.f_cszm;

                                if (value.length > 10)
                                {
                                    value = value.substr(0, 10) + '...';
                                }

                                resultHtml += "<div><span class=\"gridcell-fieldnamecn\">初始止码：</span>" + value + "</div>";
                            }


                            //==本期止码
                            {
                                value = row.f_bqzm;

                                if (value.length > 10)
                                {
                                    value = value.substr(0, 10) + '...';
                                }

                                resultHtml += "<div><span class=\"gridcell-fieldnamecn\">本期止码：</span>" + value + "</div>";
                            }


                            //==止期止码
                            {
                                value = row.f_sqzm;

                                if (value.length > 10)
                                {
                                    value = value.substr(0, 10) + '...';
                                }

                                resultHtml += "<div><span class=\"gridcell-fieldnamecn\">上期止码：</span>" + value + "</div>";
                            }


                            //==上期水量
                            {
                                value = row.f_sqsl;

                                if (value.length > 10)
                                {
                                    value = value.substr(0, 10) + '...';
                                }

                                resultHtml += "<div><span class=\"gridcell-fieldnamecn\">上期水量：</span>" + value + "</div>";
                            }

                            //==本期水量
                            {
                                value = row.f_bqsl;

                                if (value.length > 10)
                                {
                                    value = value.substr(0, 10) + '...';
                                }

                                resultHtml += "<div><span class=\"gridcell-fieldnamecn\">当月水量：</span>" + value + "</div>";
                            }


                            //==累计购量
                            {
                                value = row.f_ljgl;

                                if (value.length > 10)
                                {
                                    value = value.substr(0, 10) + '...';
                                }

                                resultHtml += "<div><span class=\"gridcell-fieldnamecn\">累计购量：</span>" + value + "</div>";
                            }
                            //==年累计购量
                            {
                                value = row.f_nljgl;

                                if (value.length > 10)
                                {
                                    value = value.substr(0, 10) + '...';
                                }

                                resultHtml += "<div><span class=\"gridcell-fieldnamecn\">年用水量：</span>" + value + "</div>";
                            }

                            //==前三月平均水量
                            {
                                value = row.f_qsqpjsl;

                                if (value.length > 10)
                                {
                                    value = value.substr(0, 10) + '...';
                                }

                                resultHtml += "<div><span class=\"gridcell-fieldnamecn\">前三期平均水量：</span>" + value + "</div>";
                            }


                            //==前六月平均水量
                            {
                                value = row.f_qlqpjsl;

                                if (value.length > 10)
                                {
                                    value = value.substr(0, 10) + '...';
                                }

                                resultHtml += "<div><span class=\"gridcell-fieldnamecn\">前六期平均水量：</span>" + value + "</div>";
                            }


                            //==状态
                            {
                                value = row.f_zt;

                                if (value.length > 10)
                                {
                                    value = value.substr(0, 10) + '...';
                                }

                                resultHtml += "<div><span class=\"gridcell-fieldnamecn\">状态：</span>" + value + "</div>";
                            }




                            //==备注
                            {
                                value = row.f_bz;

                                if (value.length > 10)
                                {
                                    value = value.substr(0, 10) + '...';
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
                        'click .edit': function (e, value, row, index)
                        {
                            if (_gridStatusSelectid != row.sys_id)
                            {
                                $('#table_grid_tbl_ld_sbb_treelist').find('tr.success').removeClass('success');
                                $(e.target).parent().parent().parent().parent().parent().addClass('success');

                                _gridStatusSelectid = row.sys_id;
                                bindDetailControl({
                                    success: function ()
                                    {
                                    }, fail: function (message)
                                    {
                                        _alertMessage.show('bindDetailControl执行失败', 'fail');
                                        _resultMessage.show(message);
                                    }
                                });
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
                    field: 'f_khbh',
                    title: '客户编号',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        return value;
                    }
                },


                {
                    field: 'f_sbbh',
                    title: '水表编号',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        return value;
                    }
                },


                {
                    field: 'f_ztsbh',
                    title: '旧水表号',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        return value;
                    }
                },


                {
                    field: 'f_lxth',
                    title: '老系统号',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        return value;
                    }
                },


                {
                    field: 'f_sbfz',
                    title: '水表分组',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        return value;
                    }
                },


                {
                    field: 'f_sbfzid',
                    title: '水表分组id',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        return value;
                    }
                },


                {
                    field: 'f_sbpp',
                    title: '水表品牌',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        return value;
                    }
                },


                {
                    field: 'f_mph',
                    title: '铭牌号',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        return value;
                    }
                },


                {
                    field: 'f_sbdz',
                    title: '水表地址',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        return value;
                    }
                },


                {
                    field: 'f_rs',
                    title: '人数',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        return value;
                    }
                },


                {
                    field: 'f_sbkj',
                    title: '水表口径',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        return value;
                    }
                },


                {
                    field: 'f_sbkjid',
                    title: '水表口径id',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        return value;
                    }
                },


                {
                    field: 'f_sblx',
                    title: '水表类型',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        return value;
                    }
                },


                {
                    field: 'f_sblxid',
                    title: '水表类型id',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        return value;
                    }
                },


                {
                    field: 'f_jllx',
                    title: '计量类型',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        return value;
                    }
                },


                {
                    field: 'f_jllxid',
                    title: '计量类型id',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        return value;
                    }
                },


                {
                    field: 'f_cszm',
                    title: '初始止码',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        return value;
                    }
                },


                {
                    field: 'f_bqzm',
                    title: '本期止码',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        return value;
                    }
                },


                {
                    field: 'f_sqzm',
                    title: '上期止码',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        return value;
                    }
                },


                {
                    field: 'f_sqsl',
                    title: '上期水量',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        return value;
                    }
                },
                {
                    field: 'f_bqsl',
                    title: '当月水量',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        return value;
                    }
                },

                {
                    field: 'f_ljgl',
                    title: '累计购量',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        return value;
                    }
                },
                {
                    field: 'f_nljgl',
                    title: '年用水量',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        return value;
                    }
                },

                {
                    field: 'f_qsqpjsl',
                    title: '前三期平均水量',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        return value;
                    }
                },


                {
                    field: 'f_qlqpjsl',
                    title: '前六期平均水量',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        return value;
                    }
                },


                {
                    field: 'f_zt',
                    title: '状态',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        return value;
                    }
                },


                {
                    field: 'f_ztid',
                    title: '状态id',
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


                ],
                onPageChange: function (size, number)
                {
                    that._pr_gridpageindex = number;

                    bindGrid(true, {
                        success: function ()
                        {
                            bindDetailControl({
                                success: function () { }, fail: function (message)
                                {
                                    _alertMessage.show('bindDetailControl执行失败', 'fail');
                                    _resultMessage.show(message);
                                }
                            });
                        }, fail: function (message)
                        {
                            _alertMessage.show('bindDetailControl执行失败', 'fail');
                            _resultMessage.show(message);
                        }
                    });
                },
                rowStyle: function (row, index)
                {
                    return {};
                },
                onLoadSuccess: function (data)
                {
                },
                //当列头复选框被选中时，触发此事件，
                onCheck: function (row)
                {

                },
                //当列头复选框被反选中时，触发此事件，
                onUncheck: function (row)
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

                                    whereClause += " f_bqsl like '%" + vv[i] + "%' or ";

                                    whereClause += " f_ljgl like '%" + vv[i] + "%' or ";

                                    whereClause += " f_nljgl like '%" + vv[i] + "%' or ";

                                    whereClause += " f_qsqpjsl like '%" + vv[i] + "%' or ";

                                    whereClause += " f_qlqpjsl like '%" + vv[i] + "%' or ";

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

                        var tbl_ld_sbb_treelist = that._pr_searchcontent.type2;



                        if (tbl_ld_sbb_treelist.f_khbh.length > 0)
                        {
                            whereClause += " f_khbh like '%" + tbl_ld_sbb_treelist.f_khbh + "%' and ";
                        }


                        if (tbl_ld_sbb_treelist.f_sbbh.length > 0)
                        {
                            whereClause += " f_sbbh like '%" + tbl_ld_sbb_treelist.f_sbbh + "%' and ";
                        }


                        if (tbl_ld_sbb_treelist.f_ztsbh.length > 0)
                        {
                            whereClause += " f_ztsbh like '%" + tbl_ld_sbb_treelist.f_ztsbh + "%' and ";
                        }


                        if (tbl_ld_sbb_treelist.f_lxth.length > 0)
                        {
                            whereClause += " f_lxth like '%" + tbl_ld_sbb_treelist.f_lxth + "%' and ";
                        }


                        if (tbl_ld_sbb_treelist.f_sbfzid.length > 0)
                        {
                            var elementArray = tbl_ld_sbb_treelist.f_sbfzid.split(',');
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


                        if (tbl_ld_sbb_treelist.f_sbpp.length > 0)
                        {
                            whereClause += " f_sbpp like '%" + tbl_ld_sbb_treelist.f_sbpp + "%' and ";
                        }


                        if (tbl_ld_sbb_treelist.f_mph.length > 0)
                        {
                            whereClause += " f_mph like '%" + tbl_ld_sbb_treelist.f_mph + "%' and ";
                        }


                        if (tbl_ld_sbb_treelist.f_sbdz.length > 0)
                        {
                            whereClause += " f_sbdz like '%" + tbl_ld_sbb_treelist.f_sbdz + "%' and ";
                        }


                        if (tbl_ld_sbb_treelist.f_rs.length > 0)
                        {
                            whereClause += " f_rs like '%" + tbl_ld_sbb_treelist.f_rs + "%' and ";
                        }


                        if (tbl_ld_sbb_treelist.f_sbkjid.length > 0)
                        {
                            var elementArray = tbl_ld_sbb_treelist.f_sbkjid.split(',');
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


                        if (tbl_ld_sbb_treelist.f_sblxid.length > 0)
                        {
                            var elementArray = tbl_ld_sbb_treelist.f_sblxid.split(',');
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


                        if (tbl_ld_sbb_treelist.f_jllxid.length > 0)
                        {
                            var elementArray = tbl_ld_sbb_treelist.f_jllxid.split(',');
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


                        if (tbl_ld_sbb_treelist.f_cszm.length > 0)
                        {
                            whereClause += " f_cszm like '%" + tbl_ld_sbb_treelist.f_cszm + "%' and ";
                        }


                        if (tbl_ld_sbb_treelist.f_bqzm.length > 0)
                        {
                            whereClause += " f_bqzm like '%" + tbl_ld_sbb_treelist.f_bqzm + "%' and ";
                        }


                        if (tbl_ld_sbb_treelist.f_sqzm.length > 0)
                        {
                            whereClause += " f_sqzm like '%" + tbl_ld_sbb_treelist.f_sqzm + "%' and ";
                        }


                        if (tbl_ld_sbb_treelist.f_sqsl.length > 0)
                        {
                            whereClause += " f_sqsl like '%" + tbl_ld_sbb_treelist.f_sqsl + "%' and ";
                        }
                        if (tbl_ld_sbb_treelist.f_bqsl.length > 0)
                        {
                            whereClause += " f_bqsl like '%" + tbl_ld_sbb_treelist.f_bqsl + "%' and ";
                        }

                        if (tbl_ld_sbb_treelist.f_ljgl.length > 0)
                        {
                            whereClause += " f_ljgl like '%" + tbl_ld_sbb_treelist.f_ljgl + "%' and ";
                        }
                        if (tbl_ld_sbb_treelist.f_nljgl.length > 0)
                        {
                            whereClause += " f_nljgl like '%" + tbl_ld_sbb_treelist.f_nljgl + "%' and ";
                        }

                        if (tbl_ld_sbb_treelist.f_qsqpjsl.length > 0)
                        {
                            whereClause += " f_qsqpjsl like '%" + tbl_ld_sbb_treelist.f_qsqpjsl + "%' and ";
                        }


                        if (tbl_ld_sbb_treelist.f_qlqpjsl.length > 0)
                        {
                            whereClause += " f_qlqpjsl like '%" + tbl_ld_sbb_treelist.f_qlqpjsl + "%' and ";
                        }


                        if (tbl_ld_sbb_treelist.f_ztid.length > 0)
                        {
                            var elementArray = tbl_ld_sbb_treelist.f_ztid.split(',');
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


                        if (tbl_ld_sbb_treelist.f_bz.length > 0)
                        {
                            whereClause += " f_bz like '%" + tbl_ld_sbb_treelist.f_bz + "%' and ";
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
    bindGrid = function (isClearStatus, callBackFunction)
    {
        if (isClearStatus == true)
        {
            _gridStatusSelectid = '';
            _gridStatusScrollTop = 0;

        }
        else
        {
            //记录滚动情况
            _gridStatusScrollTop = $('#table_grid_tbl_ld_sbb_treelist').parent().scrollTop();
        }

        setTimeout(function ()
        {
            $('#table_grid_tbl_ld_sbb_treelist').bootstrapTable("showLoading");
            var whereClause = _whereClauseString;
            if (_whereClauseString != '')
            {
                whereClause += ' and ';
            }
            whereClause += " '," + that._pr_sbbh.replaceAll("^", ",") + ",' like '%,'||f_sbbh||',%' and f_sbbh is not null";
            var orderByString = ' sys_id desc';
            var columnsString = 'f_value1^f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^f_khbh^f_sbbh^f_ztsbh^f_lxth^f_sbfz^f_sbfzid^f_sbpp^f_mph^f_sbdz^f_rs^f_sbkj^f_sbkjid^f_sblx^f_sblxid^f_jllx^f_jllxid^f_cszm^f_bqzm^f_sqzm^f_sqsl^f_bqsl^f_ljgl^f_nljgl^f_qsqpjsl^f_qlqpjsl^f_zt^f_ztid^f_bz^sys_id';

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
                    //绑定数据
                    $('#table_grid_tbl_ld_sbb_treelist').bootstrapTable("hideLoading");
                    $('#table_grid_tbl_ld_sbb_treelist').bootstrapTable("loadJson", messageJson);

                    //如果尚未指定打开哪条数据，则在此处指定
                    if (_gridStatusSelectid == '')
                    {
                        if (messageJson.rows.length > 0)
                        {
                            _gridStatusSelectid = messageJson.rows[0]["sys_id"];
                        }
                    }
                    $('#table_grid_tbl_ld_sbb_treelist').find('tr.success').removeClass('success');
                    $('#table_grid_tbl_ld_sbb_treelist').find('#tr_' + _gridStatusSelectid).addClass('success');


                    //定位
                    $('#table_grid_tbl_ld_sbb_treelist').parent().scrollTop(_gridStatusScrollTop);
                    callBackFunction.success();
                },
                fail: function (message)
                {
                    callBackFunction.fail(message);
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
            //计算页面高度
            $('#div_detail_control_container_tbl_ld_sbb').css('min-height', _pageHeight);
            $('#div_list_container_tbl_ld_sbb').css('min-height', _pageHeight);

            var codeService_0522 = _baseCodeHashMap.get('codeservice_0522');

            var codeService_0523 = _baseCodeHashMap.get('codeservice_0523');

            var codeService_0524 = _baseCodeHashMap.get('codeservice_0524');

            var codeService_0525 = _baseCodeHashMap.get('codeservice_0525');

            var codeService_0526 = _baseCodeHashMap.get('codeservice_0526');

            controlObj.multidropdownlistinit('detail_f_sbfz_tbl_ld_sbb_treelist', codeService_0522, f_sbfz_onchange);

            controlObj.singledropdownlistinit('detail_f_sbkj_tbl_ld_sbb_treelist', codeService_0523, f_sbkj_onchange);

            controlObj.singledropdownlistinit('detail_f_sblx_tbl_ld_sbb_treelist', codeService_0524, f_sblx_onchange);

            controlObj.singledropdownlistinit('detail_f_jllx_tbl_ld_sbb_treelist', codeService_0525, f_jllx_onchange);

            controlObj.singledropdownlistinit('detail_f_zt_tbl_ld_sbb_treelist', codeService_0526, f_zt_onchange);

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
    bindDetailControl = function (callBackFunction)
    {
        if (_gridStatusSelectid != "")
        {
            $('#div_detail_tbl_ld_sbb').removeClass('hidden');
            setButtonDisable(false);


            getDetailData({
                success: function (tbl_ld_sbb_treelist)
                {
                    setDetailModel(tbl_ld_sbb_treelist, {
                        success: function ()
                        {
                            callBackFunction.success();

                        }, fail: function (message)
                        {
                            callBackFunction.fail(message);
                        }
                    });
                }, fail: function (message)
                {
                    callBackFunction.fail(message);
                }
            });
        }
        else
        {
            clearDetailModel();
            $('#div_detail_tbl_ld_sbb').addClass('hidden');
            setButtonDisable(true);

            callBackFunction.success();
        }

    },
    /* 
    *  
    *  方法:setDetailDisable
    *  参数:isDisable
    *  设置detailModel是否只读
    */
    setDetailDisable = function (isDisable)
    {

        controlObj.textdisable('detail_f_sbbh_tbl_ld_sbb_treelist', isDisable);

        controlObj.textdisable('detail_f_ztsbh_tbl_ld_sbb_treelist', isDisable);

        controlObj.textdisable('detail_f_lxth_tbl_ld_sbb_treelist', isDisable);

        controlObj.multidropdownlistdisable('detail_f_sbfz_tbl_ld_sbb_treelist', isDisable);

        controlObj.textdisable('detail_f_sbpp_tbl_ld_sbb_treelist', isDisable);

        controlObj.textdisable('detail_f_mph_tbl_ld_sbb_treelist', isDisable);

        controlObj.textdisable('detail_f_sbdz_tbl_ld_sbb_treelist', isDisable);

        controlObj.textdisable('detail_f_khbh_tbl_ld_sbb_treelist', isDisable);

        controlObj.textdisable('detail_f_rs_tbl_ld_sbb_treelist', isDisable);


        controlObj.singledropdownlistdisable('detail_f_sbkj_tbl_ld_sbb_treelist', isDisable);


        controlObj.singledropdownlistdisable('detail_f_sblx_tbl_ld_sbb_treelist', isDisable);


        controlObj.singledropdownlistdisable('detail_f_jllx_tbl_ld_sbb_treelist', isDisable);

        controlObj.textdisable('detail_f_cszm_tbl_ld_sbb_treelist', isDisable);

        controlObj.textdisable('detail_f_bqzm_tbl_ld_sbb_treelist', isDisable);

        controlObj.textdisable('detail_f_sqzm_tbl_ld_sbb_treelist', isDisable);

        controlObj.textdisable('detail_f_sqsl_tbl_ld_sbb_treelist', isDisable);
        controlObj.textdisable('detail_f_bqsl_tbl_ld_sbb_treelist', isDisable);


        controlObj.textdisable('detail_f_ljgl_tbl_ld_sbb_treelist', isDisable);

        controlObj.textdisable('detail_f_nljgl_tbl_ld_sbb_treelist', isDisable);

        controlObj.textdisable('detail_f_qsqpjsl_tbl_ld_sbb_treelist', isDisable);

        controlObj.textdisable('detail_f_qlqpjsl_tbl_ld_sbb_treelist', isDisable);


        controlObj.singledropdownlistdisable('detail_f_zt_tbl_ld_sbb_treelist', isDisable);

        controlObj.textdisable('detail_f_bz_tbl_ld_sbb_treelist', isDisable);

        if (that._pr_pagetype == '2')
        {
            $("#div_row_pagetype").addClass("hidden");
        }

    },

    // ---------------------------------Model操作------------------------------------
    /* 
    *  
    *  方法:setDetailModel
    *  参数:callBackFunction
    *  根据传入的tbl_ld_sbb_treelist，绑定DetailModel
    */
    setDetailModel = function (tbl_ld_sbb_treelist, callBackFunction)
    {
        try
        {

            controlObj.text('detail_f_value1_tbl_ld_sbb_treelist', tbl_ld_sbb_treelist.f_value1);

            controlObj.text('detail_f_value2_tbl_ld_sbb_treelist', tbl_ld_sbb_treelist.f_value2);

            controlObj.text('detail_f_value3_tbl_ld_sbb_treelist', tbl_ld_sbb_treelist.f_value3);

            controlObj.text('detail_f_value4_tbl_ld_sbb_treelist', tbl_ld_sbb_treelist.f_value4);

            controlObj.text('detail_f_value5_tbl_ld_sbb_treelist', tbl_ld_sbb_treelist.f_value5);

            controlObj.text('detail_f_value6_tbl_ld_sbb_treelist', tbl_ld_sbb_treelist.f_value6);

            controlObj.text('detail_f_value7_tbl_ld_sbb_treelist', tbl_ld_sbb_treelist.f_value7);

            controlObj.text('detail_f_value8_tbl_ld_sbb_treelist', tbl_ld_sbb_treelist.f_value8);

            controlObj.text('detail_f_value9_tbl_ld_sbb_treelist', tbl_ld_sbb_treelist.f_value9);

            controlObj.text('detail_f_value10_tbl_ld_sbb_treelist', tbl_ld_sbb_treelist.f_value10);

            controlObj.text('detail_f_sbbh_tbl_ld_sbb_treelist', tbl_ld_sbb_treelist.f_sbbh);

            controlObj.text('detail_f_ztsbh_tbl_ld_sbb_treelist', tbl_ld_sbb_treelist.f_ztsbh);

            controlObj.text('detail_f_lxth_tbl_ld_sbb_treelist', tbl_ld_sbb_treelist.f_lxth);

            controlObj.multidropdownlistid('detail_f_sbfz_tbl_ld_sbb_treelist', tbl_ld_sbb_treelist.f_sbfzid);

            controlObj.text('detail_f_sbpp_tbl_ld_sbb_treelist', tbl_ld_sbb_treelist.f_sbpp);

            controlObj.text('detail_f_mph_tbl_ld_sbb_treelist', tbl_ld_sbb_treelist.f_mph);

            controlObj.text('detail_f_sbdz_tbl_ld_sbb_treelist', tbl_ld_sbb_treelist.f_sbdz);

            controlObj.text('detail_f_khbh_tbl_ld_sbb_treelist', tbl_ld_sbb_treelist.f_khbh);

            controlObj.text('detail_f_rs_tbl_ld_sbb_treelist', tbl_ld_sbb_treelist.f_rs);

            controlObj.singledropdownlistid('detail_f_sbkj_tbl_ld_sbb_treelist', tbl_ld_sbb_treelist.f_sbkjid);

            controlObj.singledropdownlistid('detail_f_sblx_tbl_ld_sbb_treelist', tbl_ld_sbb_treelist.f_sblxid);

            controlObj.singledropdownlistid('detail_f_jllx_tbl_ld_sbb_treelist', tbl_ld_sbb_treelist.f_jllxid);

            controlObj.text('detail_f_cszm_tbl_ld_sbb_treelist', tbl_ld_sbb_treelist.f_cszm);

            controlObj.text('detail_f_bqzm_tbl_ld_sbb_treelist', tbl_ld_sbb_treelist.f_bqzm);

            controlObj.text('detail_f_sqzm_tbl_ld_sbb_treelist', tbl_ld_sbb_treelist.f_sqzm);

            controlObj.text('detail_f_sqsl_tbl_ld_sbb_treelist', tbl_ld_sbb_treelist.f_sqsl);
            controlObj.text('detail_f_bqsl_tbl_ld_sbb_treelist', tbl_ld_sbb_treelist.f_bqsl);

            controlObj.text('detail_f_ljgl_tbl_ld_sbb_treelist', tbl_ld_sbb_treelist.f_ljgl);
            controlObj.text('detail_f_nljgl_tbl_ld_sbb_treelist', tbl_ld_sbb_treelist.f_nljgl);

            controlObj.text('detail_f_qsqpjsl_tbl_ld_sbb_treelist', tbl_ld_sbb_treelist.f_qsqpjsl);

            controlObj.text('detail_f_qlqpjsl_tbl_ld_sbb_treelist', tbl_ld_sbb_treelist.f_qlqpjsl);

            controlObj.singledropdownlistid('detail_f_zt_tbl_ld_sbb_treelist', tbl_ld_sbb_treelist.f_ztid);

            controlObj.text('detail_f_bz_tbl_ld_sbb_treelist', tbl_ld_sbb_treelist.f_bz.returnStringRN());

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
            var tbl_ld_sbb_treelist = new Object();


            tbl_ld_sbb_treelist.f_value1 = controlObj.text('detail_f_value1_tbl_ld_sbb_treelist');


            tbl_ld_sbb_treelist.f_value2 = controlObj.text('detail_f_value2_tbl_ld_sbb_treelist');


            tbl_ld_sbb_treelist.f_value3 = controlObj.text('detail_f_value3_tbl_ld_sbb_treelist');


            tbl_ld_sbb_treelist.f_value4 = controlObj.text('detail_f_value4_tbl_ld_sbb_treelist');


            tbl_ld_sbb_treelist.f_value5 = controlObj.text('detail_f_value5_tbl_ld_sbb_treelist');


            tbl_ld_sbb_treelist.f_value6 = controlObj.text('detail_f_value6_tbl_ld_sbb_treelist');


            tbl_ld_sbb_treelist.f_value7 = controlObj.text('detail_f_value7_tbl_ld_sbb_treelist');


            tbl_ld_sbb_treelist.f_value8 = controlObj.text('detail_f_value8_tbl_ld_sbb_treelist');


            tbl_ld_sbb_treelist.f_value9 = controlObj.text('detail_f_value9_tbl_ld_sbb_treelist');


            tbl_ld_sbb_treelist.f_value10 = controlObj.text('detail_f_value10_tbl_ld_sbb_treelist');


            tbl_ld_sbb_treelist.f_sbbh = controlObj.text('detail_f_sbbh_tbl_ld_sbb_treelist');


            tbl_ld_sbb_treelist.f_ztsbh = controlObj.text('detail_f_ztsbh_tbl_ld_sbb_treelist');


            tbl_ld_sbb_treelist.f_lxth = controlObj.text('detail_f_lxth_tbl_ld_sbb_treelist');


            tbl_ld_sbb_treelist.f_sbfz = controlObj.multidropdownlist('detail_f_sbfz_tbl_ld_sbb_treelist');
            tbl_ld_sbb_treelist.f_sbfzid = controlObj.multidropdownlistid('detail_f_sbfz_tbl_ld_sbb_treelist');


            tbl_ld_sbb_treelist.f_sbpp = controlObj.text('detail_f_sbpp_tbl_ld_sbb_treelist');


            tbl_ld_sbb_treelist.f_mph = controlObj.text('detail_f_mph_tbl_ld_sbb_treelist');


            tbl_ld_sbb_treelist.f_sbdz = controlObj.text('detail_f_sbdz_tbl_ld_sbb_treelist');


            tbl_ld_sbb_treelist.f_khbh = controlObj.text('detail_f_khbh_tbl_ld_sbb_treelist');


            tbl_ld_sbb_treelist.f_rs = controlObj.text('detail_f_rs_tbl_ld_sbb_treelist');

            tbl_ld_sbb_treelist.f_sbkj = controlObj.singledropdownlist('detail_f_sbkj_tbl_ld_sbb_treelist');
            tbl_ld_sbb_treelist.f_sbkjid = controlObj.singledropdownlistid('detail_f_sbkj_tbl_ld_sbb_treelist');

            tbl_ld_sbb_treelist.f_sblx = controlObj.singledropdownlist('detail_f_sblx_tbl_ld_sbb_treelist');
            tbl_ld_sbb_treelist.f_sblxid = controlObj.singledropdownlistid('detail_f_sblx_tbl_ld_sbb_treelist');

            tbl_ld_sbb_treelist.f_jllx = controlObj.singledropdownlist('detail_f_jllx_tbl_ld_sbb_treelist');
            tbl_ld_sbb_treelist.f_jllxid = controlObj.singledropdownlistid('detail_f_jllx_tbl_ld_sbb_treelist');


            tbl_ld_sbb_treelist.f_cszm = controlObj.text('detail_f_cszm_tbl_ld_sbb_treelist');


            tbl_ld_sbb_treelist.f_bqzm = controlObj.text('detail_f_bqzm_tbl_ld_sbb_treelist');


            tbl_ld_sbb_treelist.f_sqzm = controlObj.text('detail_f_sqzm_tbl_ld_sbb_treelist');


            tbl_ld_sbb_treelist.f_sqsl = controlObj.text('detail_f_sqsl_tbl_ld_sbb_treelist');
            tbl_ld_sbb_treelist.f_bqsl = controlObj.text('detail_f_bqsl_tbl_ld_sbb_treelist');

            tbl_ld_sbb_treelist.f_ljgl = controlObj.text('detail_f_ljgl_tbl_ld_sbb_treelist');
            tbl_ld_sbb_treelist.f_nljgl = controlObj.text('detail_f_nljgl_tbl_ld_sbb_treelist');

            tbl_ld_sbb_treelist.f_qsqpjsl = controlObj.text('detail_f_qsqpjsl_tbl_ld_sbb_treelist');


            tbl_ld_sbb_treelist.f_qlqpjsl = controlObj.text('detail_f_qlqpjsl_tbl_ld_sbb_treelist');

            tbl_ld_sbb_treelist.f_zt = controlObj.singledropdownlist('detail_f_zt_tbl_ld_sbb_treelist');
            tbl_ld_sbb_treelist.f_ztid = controlObj.singledropdownlistid('detail_f_zt_tbl_ld_sbb_treelist');


            tbl_ld_sbb_treelist.f_bz = controlObj.text('detail_f_bz_tbl_ld_sbb_treelist');

            callBackFunction.success(tbl_ld_sbb_treelist);
        }
        catch (ex)
        {
            callBackFunction.fail(ex.message);
        }
    },

    /* 
    *  
    *  方法:checkDetailModel
    *  参数:tbl_ld_sbb_treelist, callBackFunction
    *  根据传入的数据对象，校验数据内容_validateMessage_detail
    */
    checkDetailModel = function (tbl_ld_sbb_treelist, callBackFunction)
    {
        try
        {
            var errorMessageHansMap = new hashMap();
            var errorMessagePlacementHansMap = new hashMap();





            if (tbl_ld_sbb_treelist.f_value1.length > 200)
            {
                errorMessageHansMap.put('detail_f_value1_tbl_ld_sbb_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_sbb_treelist.f_value2.length > 200)
            {
                errorMessageHansMap.put('detail_f_value2_tbl_ld_sbb_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_sbb_treelist.f_value3.length > 200)
            {
                errorMessageHansMap.put('detail_f_value3_tbl_ld_sbb_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_sbb_treelist.f_value4.length > 200)
            {
                errorMessageHansMap.put('detail_f_value4_tbl_ld_sbb_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_sbb_treelist.f_value5.length > 200)
            {
                errorMessageHansMap.put('detail_f_value5_tbl_ld_sbb_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_sbb_treelist.f_value6.length > 200)
            {
                errorMessageHansMap.put('detail_f_value6_tbl_ld_sbb_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_sbb_treelist.f_value7.length > 200)
            {
                errorMessageHansMap.put('detail_f_value7_tbl_ld_sbb_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_sbb_treelist.f_value8.length > 200)
            {
                errorMessageHansMap.put('detail_f_value8_tbl_ld_sbb_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_sbb_treelist.f_value9.length > 200)
            {
                errorMessageHansMap.put('detail_f_value9_tbl_ld_sbb_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_sbb_treelist.f_value10.length > 200)
            {
                errorMessageHansMap.put('detail_f_value10_tbl_ld_sbb_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_sbb_treelist.f_sbbh.length > 200)
            {
                errorMessageHansMap.put('detail_f_sbbh_tbl_ld_sbb_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_sbb_treelist.f_sbbh.length < 1)
            {
                errorMessageHansMap.put('detail_f_sbbh_tbl_ld_sbb_treelist', '长度不能小于<a style="color:red">1</a>个字');
            }




            if (tbl_ld_sbb_treelist.f_ztsbh.length > 200)
            {
                errorMessageHansMap.put('detail_f_ztsbh_tbl_ld_sbb_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_sbb_treelist.f_lxth.length > 200)
            {
                errorMessageHansMap.put('detail_f_lxth_tbl_ld_sbb_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_sbb_treelist.f_sbfz.length > 200)
            {
                errorMessageHansMap.put('detail_f_sbfz_tbl_ld_sbb_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_sbb_treelist.f_sbpp.length > 200)
            {
                errorMessageHansMap.put('detail_f_sbpp_tbl_ld_sbb_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_sbb_treelist.f_mph.length > 200)
            {
                errorMessageHansMap.put('detail_f_mph_tbl_ld_sbb_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_sbb_treelist.f_sbdz.length > 200)
            {
                errorMessageHansMap.put('detail_f_sbdz_tbl_ld_sbb_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_sbb_treelist.f_khbh.length > 200)
            {
                errorMessageHansMap.put('detail_f_khbh_tbl_ld_sbb_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_sbb_treelist.f_rs.length > 200)
            {
                errorMessageHansMap.put('detail_f_rs_tbl_ld_sbb_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_sbb_treelist.f_rs != "" && !/^[0-9]+\.?[0-9]*$/.test(tbl_ld_sbb_treelist.f_rs))
            {
                errorMessageHansMap.put('detail_f_rs_tbl_ld_sbb_treelist', '必须是数字');
            }

            if (tbl_ld_sbb_treelist.f_rs.length < 1)
            {
                errorMessageHansMap.put('detail_f_rs_tbl_ld_sbb_treelist', '长度不能小于<a style="color:red">1</a>个字');
            }




            if (tbl_ld_sbb_treelist.f_sbkj.length > 200)
            {
                errorMessageHansMap.put('detail_f_sbkj_tbl_ld_sbb_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_sbb_treelist.f_sblx.length > 200)
            {
                errorMessageHansMap.put('detail_f_sblx_tbl_ld_sbb_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_sbb_treelist.f_sblx.length < 1)
            {
                errorMessageHansMap.put('detail_f_sblx_tbl_ld_sbb_treelist', '长度不能小于<a style="color:red">1</a>个字');
            }




            if (tbl_ld_sbb_treelist.f_jllx.length > 200)
            {
                errorMessageHansMap.put('detail_f_jllx_tbl_ld_sbb_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_sbb_treelist.f_jllx.length < 1)
            {
                errorMessageHansMap.put('detail_f_jllx_tbl_ld_sbb_treelist', '长度不能小于<a style="color:red">1</a>个字');
            }




            if (tbl_ld_sbb_treelist.f_cszm.length > 200)
            {
                errorMessageHansMap.put('detail_f_cszm_tbl_ld_sbb_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_sbb_treelist.f_cszm != "" && !/^[0-9]+\.?[0-9]*$/.test(tbl_ld_sbb_treelist.f_cszm))
            {
                errorMessageHansMap.put('detail_f_cszm_tbl_ld_sbb_treelist', '必须是数字');
            }

            if (tbl_ld_sbb_treelist.f_cszm.length < 1)
            {
                errorMessageHansMap.put('detail_f_cszm_tbl_ld_sbb_treelist', '长度不能小于<a style="color:red">1</a>个字');
            }




            if (tbl_ld_sbb_treelist.f_bqzm.length > 200)
            {
                errorMessageHansMap.put('detail_f_bqzm_tbl_ld_sbb_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_sbb_treelist.f_bqzm != "" && !/^[0-9]+\.?[0-9]*$/.test(tbl_ld_sbb_treelist.f_bqzm))
            {
                errorMessageHansMap.put('detail_f_bqzm_tbl_ld_sbb_treelist', '必须是数字');
            }

            if (tbl_ld_sbb_treelist.f_bqzm.length < 1)
            {
                errorMessageHansMap.put('detail_f_bqzm_tbl_ld_sbb_treelist', '长度不能小于<a style="color:red">1</a>个字');
            }




            if (tbl_ld_sbb_treelist.f_sqzm.length > 200)
            {
                errorMessageHansMap.put('detail_f_sqzm_tbl_ld_sbb_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_sbb_treelist.f_sqzm.length < 1)
            {
                errorMessageHansMap.put('detail_f_sqzm_tbl_ld_sbb_treelist', '长度不能小于<a style="color:red">1</a>个字');
            }

            if (tbl_ld_sbb_treelist.f_sqzm != "" && !/^[0-9]+\.?[0-9]*$/.test(tbl_ld_sbb_treelist.f_sqzm))
            {
                errorMessageHansMap.put('detail_f_sqzm_tbl_ld_sbb_treelist', '必须是数字');
            }




            if (tbl_ld_sbb_treelist.f_sqsl.length > 200)
            {
                errorMessageHansMap.put('detail_f_sqsl_tbl_ld_sbb_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_sbb_treelist.f_sqsl != "" && !/^[0-9]+\.?[0-9]*$/.test(tbl_ld_sbb_treelist.f_sqsl))
            {
                errorMessageHansMap.put('detail_f_sqsl_tbl_ld_sbb_treelist', '必须是数字');
            }

            if (tbl_ld_sbb_treelist.f_sqsl.length < 1)
            {
                errorMessageHansMap.put('detail_f_sqsl_tbl_ld_sbb_treelist', '长度不能小于<a style="color:red">1</a>个字');
            }
            if (tbl_ld_sbb_treelist.f_bqsl.length > 200)
            {
                errorMessageHansMap.put('detail_f_bqsl_tbl_ld_sbb_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_sbb_treelist.f_bqsl != "" && !/^[0-9]+\.?[0-9]*$/.test(tbl_ld_sbb_treelist.f_bqsl))
            {
                errorMessageHansMap.put('detail_f_bqsl_tbl_ld_sbb_treelist', '必须是数字');
            }

            if (tbl_ld_sbb_treelist.f_bqsl.length < 1)
            {
                errorMessageHansMap.put('detail_f_bqsl_tbl_ld_sbb_treelist', '长度不能小于<a style="color:red">1</a>个字');
            }



            if (tbl_ld_sbb_treelist.f_ljgl.length > 200)
            {
                errorMessageHansMap.put('detail_f_ljgl_tbl_ld_sbb_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_sbb_treelist.f_ljgl.length < 1)
            {
                errorMessageHansMap.put('detail_f_ljgl_tbl_ld_sbb_treelist', '长度不能小于<a style="color:red">1</a>个字');
            }

            if (tbl_ld_sbb_treelist.f_ljgl != "" && !/^[0-9]+\.?[0-9]*$/.test(tbl_ld_sbb_treelist.f_ljgl))
            {
                errorMessageHansMap.put('detail_f_ljgl_tbl_ld_sbb_treelist', '必须是数字');
            }


            if (tbl_ld_sbb_treelist.f_nljgl.length > 200)
            {
                errorMessageHansMap.put('detail_f_nljgl_tbl_ld_sbb_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_sbb_treelist.f_nljgl.length < 1)
            {
                errorMessageHansMap.put('detail_f_nljgl_tbl_ld_sbb_treelist', '长度不能小于<a style="color:red">1</a>个字');
            }

            if (tbl_ld_sbb_treelist.f_nljgl != "" && !/^[0-9]+\.?[0-9]*$/.test(tbl_ld_sbb_treelist.f_nljgl))
            {
                errorMessageHansMap.put('detail_f_nljgl_tbl_ld_sbb_treelist', '必须是数字');
            }




            if (tbl_ld_sbb_treelist.f_qsqpjsl.length > 200)
            {
                errorMessageHansMap.put('detail_f_qsqpjsl_tbl_ld_sbb_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_sbb_treelist.f_qsqpjsl != "" && !/^[0-9]+\.?[0-9]*$/.test(tbl_ld_sbb_treelist.f_qsqpjsl))
            {
                errorMessageHansMap.put('detail_f_qsqpjsl_tbl_ld_sbb_treelist', '必须是数字');
            }




            if (tbl_ld_sbb_treelist.f_qlqpjsl.length > 200)
            {
                errorMessageHansMap.put('detail_f_qlqpjsl_tbl_ld_sbb_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_sbb_treelist.f_qlqpjsl != "" && !/^[0-9]+\.?[0-9]*$/.test(tbl_ld_sbb_treelist.f_qlqpjsl))
            {
                errorMessageHansMap.put('detail_f_qlqpjsl_tbl_ld_sbb_treelist', '必须是数字');
            }

            if (tbl_ld_sbb_treelist.f_qlqpjsl.length < 1)
            {
                errorMessageHansMap.put('detail_f_qlqpjsl_tbl_ld_sbb_treelist', '长度不能小于<a style="color:red">1</a>个字');
            }




            if (tbl_ld_sbb_treelist.f_zt.length > 200)
            {
                errorMessageHansMap.put('detail_f_zt_tbl_ld_sbb_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_sbb_treelist.f_zt.length < 1)
            {
                errorMessageHansMap.put('detail_f_zt_tbl_ld_sbb_treelist', '长度不能小于<a style="color:red">1</a>个字');
            }




            if (tbl_ld_sbb_treelist.f_bz.length > 4000)
            {
                errorMessageHansMap.put('detail_f_bz_tbl_ld_sbb_treelist', '长度不能超过<a style="color:red">4000</a>个字');
            }


            if (errorMessageHansMap.keys().length > 0)
            {
                _validateMessage_detail.show(errorMessageHansMap, errorMessagePlacementHansMap, true);
                callBackFunction.fail('');
            }
            else
            {
                _validateMessage_detail.hidden();
                callBackFunction.success(tbl_ld_sbb_treelist);
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
    *  参数:tbl_ld_sbb_treelist
    *  清空数据对象
    */
    clearDetailModel = function ()
    {
        var tbl_ld_sbb_treelist = {};


        tbl_ld_sbb_treelist.f_value1 = '';
        controlObj.text('detail_f_value1_tbl_ld_sbb_treelist', tbl_ld_sbb_treelist.f_value1);

        tbl_ld_sbb_treelist.f_value2 = '';
        controlObj.text('detail_f_value2_tbl_ld_sbb_treelist', tbl_ld_sbb_treelist.f_value2);

        tbl_ld_sbb_treelist.f_value3 = '';
        controlObj.text('detail_f_value3_tbl_ld_sbb_treelist', tbl_ld_sbb_treelist.f_value3);

        tbl_ld_sbb_treelist.f_value4 = '';
        controlObj.text('detail_f_value4_tbl_ld_sbb_treelist', tbl_ld_sbb_treelist.f_value4);

        tbl_ld_sbb_treelist.f_value5 = '';
        controlObj.text('detail_f_value5_tbl_ld_sbb_treelist', tbl_ld_sbb_treelist.f_value5);

        tbl_ld_sbb_treelist.f_value6 = '';
        controlObj.text('detail_f_value6_tbl_ld_sbb_treelist', tbl_ld_sbb_treelist.f_value6);

        tbl_ld_sbb_treelist.f_value7 = '';
        controlObj.text('detail_f_value7_tbl_ld_sbb_treelist', tbl_ld_sbb_treelist.f_value7);

        tbl_ld_sbb_treelist.f_value8 = '';
        controlObj.text('detail_f_value8_tbl_ld_sbb_treelist', tbl_ld_sbb_treelist.f_value8);

        tbl_ld_sbb_treelist.f_value9 = '';
        controlObj.text('detail_f_value9_tbl_ld_sbb_treelist', tbl_ld_sbb_treelist.f_value9);

        tbl_ld_sbb_treelist.f_value10 = '';
        controlObj.text('detail_f_value10_tbl_ld_sbb_treelist', tbl_ld_sbb_treelist.f_value10);

        tbl_ld_sbb_treelist.f_sbbh = '';
        controlObj.text('detail_f_sbbh_tbl_ld_sbb_treelist', tbl_ld_sbb_treelist.f_sbbh);

        tbl_ld_sbb_treelist.f_ztsbh = '';
        controlObj.text('detail_f_ztsbh_tbl_ld_sbb_treelist', tbl_ld_sbb_treelist.f_ztsbh);

        tbl_ld_sbb_treelist.f_lxth = '';
        controlObj.text('detail_f_lxth_tbl_ld_sbb_treelist', tbl_ld_sbb_treelist.f_lxth);

        tbl_ld_sbb_treelist.f_sbfz = '';
        tbl_ld_sbb_treelist.f_sbfzid = '';
        controlObj.multidropdownlistid('detail_f_sbfz_tbl_ld_sbb_treelist', tbl_ld_sbb_treelist.f_sbfzid);

        tbl_ld_sbb_treelist.f_sbpp = '';
        controlObj.text('detail_f_sbpp_tbl_ld_sbb_treelist', tbl_ld_sbb_treelist.f_sbpp);

        tbl_ld_sbb_treelist.f_mph = '';
        controlObj.text('detail_f_mph_tbl_ld_sbb_treelist', tbl_ld_sbb_treelist.f_mph);

        tbl_ld_sbb_treelist.f_sbdz = '';
        controlObj.text('detail_f_sbdz_tbl_ld_sbb_treelist', tbl_ld_sbb_treelist.f_sbdz);

        tbl_ld_sbb_treelist.f_khbh = '';
        controlObj.text('detail_f_khbh_tbl_ld_sbb_treelist', tbl_ld_sbb_treelist.f_khbh);

        tbl_ld_sbb_treelist.f_rs = '';
        controlObj.text('detail_f_rs_tbl_ld_sbb_treelist', tbl_ld_sbb_treelist.f_rs);

        tbl_ld_sbb_treelist.f_sbkj = '';
        tbl_ld_sbb_treelist.f_sbkjid = '';
        controlObj.singledropdownlistid('detail_f_sbkj_tbl_ld_sbb_treelist', tbl_ld_sbb_treelist.f_sbkjid);

        tbl_ld_sbb_treelist.f_sblx = '';
        tbl_ld_sbb_treelist.f_sblxid = '';
        controlObj.singledropdownlistid('detail_f_sblx_tbl_ld_sbb_treelist', tbl_ld_sbb_treelist.f_sblxid);

        tbl_ld_sbb_treelist.f_jllx = '';
        tbl_ld_sbb_treelist.f_jllxid = '';
        controlObj.singledropdownlistid('detail_f_jllx_tbl_ld_sbb_treelist', tbl_ld_sbb_treelist.f_jllxid);

        tbl_ld_sbb_treelist.f_cszm = '';
        controlObj.text('detail_f_cszm_tbl_ld_sbb_treelist', tbl_ld_sbb_treelist.f_cszm);

        tbl_ld_sbb_treelist.f_bqzm = '';
        controlObj.text('detail_f_bqzm_tbl_ld_sbb_treelist', tbl_ld_sbb_treelist.f_bqzm);

        tbl_ld_sbb_treelist.f_sqzm = '';
        controlObj.text('detail_f_sqzm_tbl_ld_sbb_treelist', tbl_ld_sbb_treelist.f_sqzm);

        tbl_ld_sbb_treelist.f_sqsl = '';
        controlObj.text('detail_f_sqsl_tbl_ld_sbb_treelist', tbl_ld_sbb_treelist.f_sqsl);

        tbl_ld_sbb_treelist.f_bqsl = '';
        controlObj.text('detail_f_bqsl_tbl_ld_sbb_treelist', tbl_ld_sbb_treelist.f_bqsl);

        tbl_ld_sbb_treelist.f_ljgl = '';
        controlObj.text('detail_f_ljgl_tbl_ld_sbb_treelist', tbl_ld_sbb_treelist.f_ljgl);

        tbl_ld_sbb_treelist.f_nljgl = '';
        controlObj.text('detail_f_nljgl_tbl_ld_sbb_treelist', tbl_ld_sbb_treelist.f_nljgl);

        tbl_ld_sbb_treelist.f_qsqpjsl = '';
        controlObj.text('detail_f_qsqpjsl_tbl_ld_sbb_treelist', tbl_ld_sbb_treelist.f_qsqpjsl);

        tbl_ld_sbb_treelist.f_qlqpjsl = '';
        controlObj.text('detail_f_qlqpjsl_tbl_ld_sbb_treelist', tbl_ld_sbb_treelist.f_qlqpjsl);

        tbl_ld_sbb_treelist.f_zt = '';
        tbl_ld_sbb_treelist.f_ztid = '';
        controlObj.singledropdownlistid('detail_f_zt_tbl_ld_sbb_treelist', tbl_ld_sbb_treelist.f_ztid);

        tbl_ld_sbb_treelist.f_bz = '';
        controlObj.text('detail_f_bz_tbl_ld_sbb_treelist', tbl_ld_sbb_treelist.f_bz.returnStringRN());


    },

    //=============================数据操作===================================
    /* 
    *  
    *  方法:getDetailData
    *  参数:callBackFunction
    *  从数据库获取数据，根据__gridStatusSelectid ，返回数据对象
    */
    getDetailData = function (callBackFunction)
    {

        var whereClause = ' sys_id = \'' + _gridStatusSelectid + '\'';
        var orderByString = '';
        var columnsString = 'f_value1^f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^f_khbh^f_sbbh^f_ztsbh^f_lxth^f_sbfz^f_sbfzid^f_sbpp^f_mph^f_sbdz^f_rs^f_sbkj^f_sbkjid^f_sblx^f_sblxid^f_jllx^f_jllxid^f_cszm^f_bqzm^f_sqzm^f_sqsl^f_bqsl^f_ljgl^f_nljgl^f_qsqpjsl^f_qlqpjsl^f_zt^f_ztid^f_bz^sys_id';

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
                    callBackFunction.fail(ex.message)
                }
            },
            fail: function (message)
            {
                callBackFunction.fail(message)
            }
        });


    },

    /* 
    *  
    *  方法:updateDetailData
    *  参数:tbl_ld_sbb_treelist, callbackFunction
    *  根据传入的数据对象，更新数据
    */
    updateDetailData = function (tbl_ld_sbb_treelist, callbackFunction)
    {
        var d = new Date();
        var columns = 'f_value1^f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^f_khbh^f_sbbh^f_ztsbh^f_lxth^f_sbfz^f_sbfzid^f_sbpp^f_mph^f_sbdz^f_rs^f_sbkj^f_sbkjid^f_sblx^f_sblxid^f_jllx^f_jllxid^f_cszm^f_bqzm^f_sqzm^f_sqsl^f_bqsl^f_ljgl^f_nljgl^f_qsqpjsl^f_qlqpjsl^f_zt^f_ztid^f_bz^sys_id^sys_lastedituserid^sys_lasteditusername^sys_lasteditdate';
        var json = {
            sys_id: _gridStatusSelectid,


            f_value1: tbl_ld_sbb_treelist.f_value1,

            f_value2: tbl_ld_sbb_treelist.f_value2,

            f_value3: tbl_ld_sbb_treelist.f_value3,

            f_value4: tbl_ld_sbb_treelist.f_value4,

            f_value5: tbl_ld_sbb_treelist.f_value5,

            f_value6: tbl_ld_sbb_treelist.f_value6,

            f_value7: tbl_ld_sbb_treelist.f_value7,

            f_value8: tbl_ld_sbb_treelist.f_value8,

            f_value9: tbl_ld_sbb_treelist.f_value9,

            f_value10: tbl_ld_sbb_treelist.f_value10,

            f_sbbh: tbl_ld_sbb_treelist.f_sbbh,

            f_ztsbh: tbl_ld_sbb_treelist.f_ztsbh,

            f_lxth: tbl_ld_sbb_treelist.f_lxth,

            f_sbfz: tbl_ld_sbb_treelist.f_sbfz,
            f_sbfzid: tbl_ld_sbb_treelist.f_sbfzid,

            f_sbpp: tbl_ld_sbb_treelist.f_sbpp,

            f_mph: tbl_ld_sbb_treelist.f_mph,

            f_sbdz: tbl_ld_sbb_treelist.f_sbdz,

            f_khbh: tbl_ld_sbb_treelist.f_khbh,

            f_rs: tbl_ld_sbb_treelist.f_rs,

            f_sbkj: tbl_ld_sbb_treelist.f_sbkj,
            f_sbkjid: tbl_ld_sbb_treelist.f_sbkjid,

            f_sblx: tbl_ld_sbb_treelist.f_sblx,
            f_sblxid: tbl_ld_sbb_treelist.f_sblxid,

            f_jllx: tbl_ld_sbb_treelist.f_jllx,
            f_jllxid: tbl_ld_sbb_treelist.f_jllxid,

            f_cszm: tbl_ld_sbb_treelist.f_cszm,

            f_bqzm: tbl_ld_sbb_treelist.f_bqzm,

            f_sqzm: tbl_ld_sbb_treelist.f_sqzm,

            f_sqsl: tbl_ld_sbb_treelist.f_sqsl,
            f_bqsl: tbl_ld_sbb_treelist.f_bqsl,

            f_ljgl: tbl_ld_sbb_treelist.f_ljgl,
            f_nljgl: tbl_ld_sbb_treelist.f_nljgl,

            f_qsqpjsl: tbl_ld_sbb_treelist.f_qsqpjsl,

            f_qlqpjsl: tbl_ld_sbb_treelist.f_qlqpjsl,

            f_zt: tbl_ld_sbb_treelist.f_zt,
            f_ztid: tbl_ld_sbb_treelist.f_ztid,

            f_bz: tbl_ld_sbb_treelist.f_bz.formatStringRN(),


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
                callbackFunction.success(tbl_ld_sbb_treelist);
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


            f_sbbh: '',


            f_ztsbh: '',


            f_lxth: '',

            f_sbfzid: '',


            f_sbpp: '',


            f_mph: '',


            f_sbdz: '',


            f_khbh: '',


            f_rs: '0',

            f_sbkjid: '',

            f_sblxid: '',

            f_jllxid: '',


            f_cszm: '0',


            f_bqzm: '0',


            f_sqzm: '0',


            f_sqsl: '0',
            f_bqsl: '0',


            f_ljgl: '0',

            f_nljgl: '0',
            f_qsqpjsl: '0',


            f_qlqpjsl: '0',

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
                _gridStatusSelectid = result;
                bindGrid(false, {
                    success: function ()
                    {
                        bindDetailControl({
                            success: function ()
                            {
                                callBackFunction.success();
                            }, fail: function (message)
                            {
                                callBackFunction.fail('bindDetailControl:' + message);
                            }
                        });

                    }, fail: function ()
                    {
                        callBackFunction.fail('bindGrid:' + message);
                    }
                });


            }, fail: function (message)
            {
                callBackFunction.fail('Add:' + message);
            }
        });

    },

    //=============================控件事件===================================

     //=============================控件事件===================================

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
            *  方法:f_zt_onchange
            *  参数:changeEventParameter
            *  状态onchange事件
            */
            f_zt_onchange = function (e)
            {
                var controlid = e.target.id;
            },




    end = function () { };

    //=================================================================================
    //                                      公有
    //=================================================================================
    var that = {

        _pr_sbbh: '',//水表编号

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

        //=================================================================================
        //                                      公有方法 
        //=================================================================================

        init: function (callBackFunction)
        {
            $('#div_detail_f_khbh_tbl_ld_sbb_treelist').addClass('hidden');
            try
            {

                //初始化参数
                initParameter({
                    success: function ()
                    {
                        //计算页面高度                             
                        if ($(window).width() < basePageObj._limSrceenWidth)
                        {
                            _pageHeight = $(window).height() - 320;
                            if (_pageHeight < 950)
                            {
                                _pageHeight = 950;
                            }
                        }
                        else
                        {
                            _pageHeight = $(window).height() - 140;
                        }

                        _ladda_btn_command_new = Ladda.create('btn_command_new_tbl_ld_sbb_treelist');
                        _ladda_btn_command_delete = Ladda.create('btn_command_delete_tbl_ld_sbb_treelist');
                        _ladda_btn_command_save = Ladda.create('btn_command_save_tbl_ld_sbb_treelist');
                        _validateMessage_search = new validateMessage('btn_search_modal_search_tbl_ld_sbb_treelist');
                        _validateMessage_detail = new validateMessage('btn_command_save_tbl_ld_sbb_treelist');

                        creatWhereClause({
                            success: function ()
                            {
                                initGrid({
                                    success: function ()
                                    {

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
                                                                setDetailDisable(false);
                                                                setButtonDisable(false);
                                                                break;
                                                            case "2":
                                                                setDetailDisable(true);
                                                                setButtonDisable(true);
                                                                break;
                                                        }

                                                        callBackFunction.success();

                                                    }
                                                });
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

        bindTree: function (callBackFunction)
        {
            bindGrid(false, {
                success: function ()
                {
                    bindDetailControl({
                        success: function ()
                        {
                            callBackFunction.success();
                        },
                        fail: function ()
                        {
                            _blockMessage.show('bindDetailControl执行失败<br/>' + message, 'fail');
                        }
                    });

                 
                },
                fail: function (message)
                {
                    _blockMessage.show('bindGrid执行失败<br/>' + message, 'fail');
                }
            });
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

                                        bindGrid(true, {
                                            success: function ()
                                            {
                                                bindDetailControl({
                                                    success: function ()
                                                    {

                                                    }, fail: function (message)
                                                    {
                                                        _alertMessage.show('bindDetailControl执行失败', 'fail');
                                                        _resultMessage.show(message);
                                                    }
                                                });

                                            }, fail: function ()
                                            {
                                                _alertMessage.show('bindGrid执行失败', 'fail');
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
            $('#btn_command_search_tbl_ld_sbb_treelist').html('简单查询');
            $('#txt_command_search_tbl_ld_sbb_treelist').removeAttr('disabled');
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
            $('#btn_command_search_tbl_ld_sbb_treelist').html('高级查询');
            $('#txt_command_search_tbl_ld_sbb_treelist').attr('disabled', 'disabled');

            $('#div_search_modal_tbl_ld_sbb_treelist').modal('show');
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
                                    $('#div_search_modal_tbl_ld_sbb_treelist').modal('hide')
                                    that._pr_gridpageindex = '1';

                                    bindGrid(true, {
                                        success: function ()
                                        {
                                            bindDetailControl({
                                                success: function ()
                                                {

                                                }, fail: function (message)
                                                {
                                                    _alertMessage.show('bindDetailControl执行失败', 'fail');
                                                    _resultMessage.show(message);
                                                }
                                            });

                                        }, fail: function ()
                                        {
                                            _alertMessage.show('bindGrid执行失败', 'fail');
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
            $('#div_search_modal_tbl_ld_sbb_treelist').modal('hide');

            that._pr_searchtype = '1';
            $('#btn_command_search_tbl_ld_sbb_treelist').html('简单查询');
            $('#txt_command_search_tbl_ld_sbb_treelist').removeAttr('disabled');

        },


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
            getDetailModel({
                success: function (tbl_ld_sbb_treelist)
                {
                    checkDetailModel(tbl_ld_sbb_treelist, {
                        success: function (tbl_ld_sbb_treelist)
                        {
                            updateDetailData(tbl_ld_sbb_treelist, {
                                success: function (tbl_ld_sbb_treelist)
                                {
                                    bindGrid(false, {
                                        success: function ()
                                        {
                                            _alertMessage.show('保存成功', 'success', '2000');
                                        }, fail: function (message)
                                        {
                                            _alertMessage.show('bindGrid失败', 'fail');
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
        *  方法:btn_command_delete_onclick
        *  参数:
        *  删除选定的本页数据和其他页数据，重新绑定Grid，如果当前页已经没有数据了，则跳转到符合查询条件的第一页数据
        */
        btn_command_delete_onclick: function ()
        {

            if (_gridStatusSelectid == '')
            {
                _alertMessage.show('请选择一条数据!', 'warning', 1000);
            }
            else
            {


                {
                    var confirmContent = '<blockquote> ';
                    confirmContent += '<h3>请确认删除当前选中数据</h3>';
                    confirmContent += '</blockquote> ';
                    _confirmMessage.destory();
                    _confirmMessage.show('删除确认？', confirmContent,
                    {
                        confirm: function ()
                        {
                            _ladda_btn_command_delete.start();

                            var whereClause = "sys_id in (\'" + _gridStatusSelectid.toString().replaceAll("^", "\',\'") + "\')";

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
                                            bindGrid(true, {
                                                success: function ()
                                                {
                                                    bindDetailControl({
                                                        success: function ()
                                                        {
                                                            _ladda_btn_command_delete.stop();
                                                        }, fail: function (message)
                                                        {
                                                            _ladda_btn_command_delete.stop();
                                                            _alertMessage.show('bindDetailControl失败', 'fail');
                                                            _resultMessage.show(message);
                                                        }
                                                    });

                                                }, fail: function (message)
                                                {
                                                    _ladda_btn_command_delete.stop();
                                                    _alertMessage.show('bindGrid失败', 'fail');
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
            }
        },

        end: function ()
        {
        }
    };
    return that;
})();







