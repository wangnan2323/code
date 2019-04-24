﻿


var _clientInf = '{userid:"",appcode:"54",appname:"",userip:"",usermac:"",username:""}';
var _blockMessage = null;
var _alertMessage = null;
var _resultMessage = null;
var _confirmMessage = null;


var tbl_ld_cben_treelist_Obj = (function ()
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
    _pageHeight = 950,
    //Code数据存储容器
    _baseCodeHashMap = null,

    _validateMessage_search = null,
    _validateMessage_detail = null,


      //算费回滚
      _ladda_btn_command_rollback = null,
      //算费
      _ladda_btn_command_count = null,


    //where语句
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





            that._pr_listtype = requestQuery('listtype');
            that._pr_appcode = requestQuery('appcode');
            that._pr_isadmin = requestQuery('isadmin');;

            that._pr_tree_gridselectid = requestQuery('gridselectid');
            that._pr_tree_gridpageindex = requestQuery('gridpageindex');
            that._pr_tree_searchtype = requestQuery('searchtype');
            that._pr_tree_searchcontent = requestQuery('searchcontent');
            that._pr_tree_gridstatusscrolltop = requestQuery('gridstatusscrolltop');


            that._pr_part_gridpageindex = requestQuery('partgridpageindex');
            that._pr_part_gridselectids = requestQuery('partgridselectids');



            _clientInf = '{userid:"' + basePageObj._userInfoJson.sys_userid + '",appcode:"' + that._pr_appcode + '",appname:"",userip:"' + basePageObj._userInfoJson.ip + '",usermac:"' + basePageObj._userInfoJson.mac + '",username:"' + basePageObj._userInfoJson.sys_username + '"}';

            if (that._pr_tree_gridselectid == null || that._pr_tree_gridselectid == '' || that._pr_tree_gridselectid == 'null')
            {
                that._pr_tree_gridselectid = '';
            }

            if (that._pr_part_gridselectids == null || that._pr_part_gridselectids == '' || that._pr_part_gridselectids == 'null')
            {
                that._pr_part_gridselectids = '';
            }

            if (that._pr_tree_gridpageindex == null || that._pr_tree_gridpageindex == '' || that._pr_tree_gridpageindex == 'null')
            {
                that._pr_tree_gridpageindex = 1;
            }
            else
            {
                that._pr_tree_gridpageindex = Number(that._pr_tree_gridpageindex);
            }




            if (that._pr_tree_gridstatusscrolltop == null || that._pr_tree_gridstatusscrolltop == '' || that._pr_tree_gridstatusscrolltop == 'null')
            {
                that._pr_tree_gridstatusscrolltop = 0;
            }
            else
            {
                that._pr_tree_gridstatusscrolltop = Number(that._pr_tree_gridstatusscrolltop);
            }

            if (that._pr_part_gridpageindex == null || that._pr_part_gridpageindex == '' || that._pr_part_gridpageindex == 'null')
            {
                that._pr_part_gridpageindex = 1;
            }
            else
            {
                that._pr_part_gridpageindex = Number(that._pr_part_gridpageindex);
            }

            if (that._pr_tree_searchcontent == null || that._pr_tree_searchcontent == '' || that._pr_tree_searchcontent == 'null')
            {
                that._pr_tree_searchcontent = new Object();
            }
            else
            {
                that._pr_tree_searchcontent = (new Function("", "return " + that._pr_tree_searchcontent))();
            }

            if (that._pr_tree_searchtype == null || that._pr_tree_searchtype == '' || that._pr_tree_searchtype == 'null')
            {
                that._pr_tree_searchtype = '1';
            }

            switch (that._pr_tree_searchtype)
            {
                case "1":
                    $('#btn_command_search_tbl_ld_cben_treelist').html('简单查询');
                    $('#txt_command_search_tbl_ld_cben_treelist').removeAttr("disabled");

                    break;
                case "2":
                    $('#btn_command_search_tbl_ld_cben_treelist').html('高级查询');
                    $('#txt_command_search_tbl_ld_cben_treelist').attr("disabled", true);
                    break;
            }

            if (that._pr_isadmin == null || that._pr_isadmin == '' || that._pr_isadmin == 'null')
            {
                that._pr_isadmin = '1';
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





            }
            else
            {


            }
        }
        else
        {


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

        codeServiceId = codeServiceId.trimEnd('^');
        commonObj.getCodeServiceJson(codeServiceId, {
            success: function (resultArray)
            {
                try
                {
                    _baseCodeHashMap = new hashMap();

                    _baseCodeHashMap.put('codeservice_0527', resultArray['0527']);
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
            var codeService_cby = _baseCodeHashMap.get('codeService_cby');
            controlObj.multidropdownlistinit('search_f_zt_tbl_ld_cben_treelist', codeService_0527);
            controlObj.multidropdownlistinit('search_f_cbymc_tbl_ld_cben_treelist', codeService_cby);


            //模态窗口
            $('#div_search_modal_tbl_ld_cben_treelist').modal({
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
    *  根据_pr_tree_searchcontent设置SearchModel数据
    */
    setSearchModel = function (callBackFunction)
    {

        try
        {
            switch (that._pr_tree_searchtype)
            {
                case "1":
                    if (that._pr_tree_searchcontent.type1 != undefined)
                    {
                        //简单查询
                        $("#txt_command_search_tbl_ld_cben_treelist").val(that._pr_tree_searchcontent.type1);
                    }

                    break;
                case "2":
                    if (that._pr_tree_searchcontent.type2 != undefined)
                    {
                        //高级查询
                        var tbl_ld_cben_treelist = that._pr_tree_searchcontent.type2;


                        controlObj.text('search_f_value1_tbl_ld_cben_treelist', tbl_ld_cben_treelist.f_value1);

                        controlObj.text('search_f_value2_tbl_ld_cben_treelist', tbl_ld_cben_treelist.f_value2);

                        controlObj.text('search_f_value3_tbl_ld_cben_treelist', tbl_ld_cben_treelist.f_value3);

                        controlObj.text('search_f_value4_tbl_ld_cben_treelist', tbl_ld_cben_treelist.f_value4);

                        controlObj.text('search_f_value5_tbl_ld_cben_treelist', tbl_ld_cben_treelist.f_value5);

                        controlObj.text('search_f_value6_tbl_ld_cben_treelist', tbl_ld_cben_treelist.f_value6);

                        controlObj.text('search_f_value7_tbl_ld_cben_treelist', tbl_ld_cben_treelist.f_value7);

                        controlObj.text('search_f_value8_tbl_ld_cben_treelist', tbl_ld_cben_treelist.f_value8);

                        controlObj.text('search_f_value9_tbl_ld_cben_treelist', tbl_ld_cben_treelist.f_value9);

                        controlObj.text('search_f_value10_tbl_ld_cben_treelist', tbl_ld_cben_treelist.f_value10);

                        controlObj.text('search_f_cbbh_tbl_ld_cben_treelist', tbl_ld_cben_treelist.f_cbbh);

                        controlObj.text('search_f_cbmc_tbl_ld_cben_treelist', tbl_ld_cben_treelist.f_cbmc);

                        controlObj.text('search_f_cbzq_tbl_ld_cben_treelist', tbl_ld_cben_treelist.f_cbzq);

                        controlObj.text('search_f_ksyf_tbl_ld_cben_treelist', tbl_ld_cben_treelist.f_ksyf);

                        //controlObj.text('search_f_cbymc_tbl_ld_cben_treelist', tbl_ld_cben_treelist.f_cbymc);

                        //controlObj.text('search_f_cbyid_tbl_ld_cben_treelist', tbl_ld_cben_treelist.f_cbyid);
                        controlObj.multidropdownlistid('search_f_cbymc_tbl_ld_cben_treelist', tbl_ld_cben_treelist.f_cbyid);

                        controlObj.multidropdownlistid('search_f_zt_tbl_ld_cben_treelist', tbl_ld_cben_treelist.f_ztid);

                        controlObj.text('search_f_bz_tbl_ld_cben_treelist', tbl_ld_cben_treelist.f_bz);


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
    *  获取SearchModel的数据，存储到_pr_tree_searchcontent
    */
    getSearchModel = function (callBackFunction)
    {

        try
        {
            switch (that._pr_tree_searchtype)
            {

                case "1":
                    //简单查询
                    that._pr_tree_searchcontent.type1 = $("#txt_command_search_tbl_ld_cben_treelist").val();

                    break;
                case "2":

                    //高级查询
                    var tbl_ld_cben_treelist = new Object();


                    tbl_ld_cben_treelist.f_value1 = controlObj.text('search_f_value1_tbl_ld_cben_treelist');


                    tbl_ld_cben_treelist.f_value2 = controlObj.text('search_f_value2_tbl_ld_cben_treelist');


                    tbl_ld_cben_treelist.f_value3 = controlObj.text('search_f_value3_tbl_ld_cben_treelist');


                    tbl_ld_cben_treelist.f_value4 = controlObj.text('search_f_value4_tbl_ld_cben_treelist');


                    tbl_ld_cben_treelist.f_value5 = controlObj.text('search_f_value5_tbl_ld_cben_treelist');


                    tbl_ld_cben_treelist.f_value6 = controlObj.text('search_f_value6_tbl_ld_cben_treelist');


                    tbl_ld_cben_treelist.f_value7 = controlObj.text('search_f_value7_tbl_ld_cben_treelist');


                    tbl_ld_cben_treelist.f_value8 = controlObj.text('search_f_value8_tbl_ld_cben_treelist');


                    tbl_ld_cben_treelist.f_value9 = controlObj.text('search_f_value9_tbl_ld_cben_treelist');


                    tbl_ld_cben_treelist.f_value10 = controlObj.text('search_f_value10_tbl_ld_cben_treelist');


                    tbl_ld_cben_treelist.f_cbbh = controlObj.text('search_f_cbbh_tbl_ld_cben_treelist');


                    tbl_ld_cben_treelist.f_cbmc = controlObj.text('search_f_cbmc_tbl_ld_cben_treelist');


                    tbl_ld_cben_treelist.f_cbzq = controlObj.text('search_f_cbzq_tbl_ld_cben_treelist');


                    tbl_ld_cben_treelist.f_ksyf = controlObj.text('search_f_ksyf_tbl_ld_cben_treelist');


                    //tbl_ld_cben_treelist.f_cbymc = controlObj.text('search_f_cbymc_tbl_ld_cben_treelist');


                    //tbl_ld_cben_treelist.f_cbyid = controlObj.text('search_f_cbyid_tbl_ld_cben_treelist');

                    tbl_ld_cben_treelist.f_cbyid = controlObj.multidropdownlistid('search_f_cbymc_tbl_ld_cben_treelist');

                    tbl_ld_cben_treelist.f_ztid = controlObj.multidropdownlistid('search_f_zt_tbl_ld_cben_treelist');


                    tbl_ld_cben_treelist.f_bz = controlObj.text('search_f_bz_tbl_ld_cben_treelist');

                    that._pr_tree_searchcontent.type2 = tbl_ld_cben_treelist;
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
    *  对_pr_tree_searchcontent的type2进行校验
    */
    checkSearchModel = function (callBackFunction)
    {

        try
        {
            var tbl_ld_cben_treelist = that._pr_tree_searchcontent.type2;
            var errorMessageHansMap = new hashMap();
            var errorMessagePlacementHansMap = new hashMap();




            if (tbl_ld_cben_treelist.f_value1.length > 200)
            {
                errorMessageHansMap.put('search_f_value1_tbl_ld_cben_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_cben_treelist.f_value2.length > 200)
            {
                errorMessageHansMap.put('search_f_value2_tbl_ld_cben_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_cben_treelist.f_value3.length > 200)
            {
                errorMessageHansMap.put('search_f_value3_tbl_ld_cben_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_cben_treelist.f_value4.length > 200)
            {
                errorMessageHansMap.put('search_f_value4_tbl_ld_cben_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_cben_treelist.f_value5.length > 200)
            {
                errorMessageHansMap.put('search_f_value5_tbl_ld_cben_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_cben_treelist.f_value6.length > 200)
            {
                errorMessageHansMap.put('search_f_value6_tbl_ld_cben_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_cben_treelist.f_value7.length > 200)
            {
                errorMessageHansMap.put('search_f_value7_tbl_ld_cben_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_cben_treelist.f_value8.length > 200)
            {
                errorMessageHansMap.put('search_f_value8_tbl_ld_cben_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_cben_treelist.f_value9.length > 200)
            {
                errorMessageHansMap.put('search_f_value9_tbl_ld_cben_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_cben_treelist.f_value10.length > 200)
            {
                errorMessageHansMap.put('search_f_value10_tbl_ld_cben_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_cben_treelist.f_cbbh.length > 200)
            {
                errorMessageHansMap.put('search_f_cbbh_tbl_ld_cben_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_cben_treelist.f_cbmc.length > 200)
            {
                errorMessageHansMap.put('search_f_cbmc_tbl_ld_cben_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_cben_treelist.f_cbzq.length > 200)
            {
                errorMessageHansMap.put('search_f_cbzq_tbl_ld_cben_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_cben_treelist.f_ksyf.length > 200)
            {
                errorMessageHansMap.put('search_f_ksyf_tbl_ld_cben_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }




            //if (tbl_ld_cben_treelist.f_cbymc.length > 200)
            //{
            //    errorMessageHansMap.put('search_f_cbymc_tbl_ld_cben_treelist', '长度不能超过<a style="color:red">200</a>个字');
            //}




            if (tbl_ld_cben_treelist.f_cbyid.length > 200)
            {
                errorMessageHansMap.put('search_f_cbymc_tbl_ld_cben_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_cben_treelist.f_ztid.length > 200)
            {
                errorMessageHansMap.put('search_f_zt_tbl_ld_cben_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_cben_treelist.f_bz.length > 200)
            {
                errorMessageHansMap.put('search_f_bz_tbl_ld_cben_treelist', '长度不能超过<a style="color:red">200</a>个字');
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

        switch (that._pr_tree_searchtype)
        {
            case "1":
                if (that._pr_tree_searchcontent.type2 == undefined)
                {
                    that._pr_tree_searchcontent.type2 = new Object();
                }

                that._pr_tree_searchcontent.type2.f_value1 = '';
                controlObj.text('search_f_value1_tbl_ld_cben_treelist', that._pr_tree_searchcontent.type2.f_value1);


                that._pr_tree_searchcontent.type2.f_value2 = '';
                controlObj.text('search_f_value2_tbl_ld_cben_treelist', that._pr_tree_searchcontent.type2.f_value2);


                that._pr_tree_searchcontent.type2.f_value3 = '';
                controlObj.text('search_f_value3_tbl_ld_cben_treelist', that._pr_tree_searchcontent.type2.f_value3);


                that._pr_tree_searchcontent.type2.f_value4 = '';
                controlObj.text('search_f_value4_tbl_ld_cben_treelist', that._pr_tree_searchcontent.type2.f_value4);


                that._pr_tree_searchcontent.type2.f_value5 = '';
                controlObj.text('search_f_value5_tbl_ld_cben_treelist', that._pr_tree_searchcontent.type2.f_value5);


                that._pr_tree_searchcontent.type2.f_value6 = '';
                controlObj.text('search_f_value6_tbl_ld_cben_treelist', that._pr_tree_searchcontent.type2.f_value6);


                that._pr_tree_searchcontent.type2.f_value7 = '';
                controlObj.text('search_f_value7_tbl_ld_cben_treelist', that._pr_tree_searchcontent.type2.f_value7);


                that._pr_tree_searchcontent.type2.f_value8 = '';
                controlObj.text('search_f_value8_tbl_ld_cben_treelist', that._pr_tree_searchcontent.type2.f_value8);


                that._pr_tree_searchcontent.type2.f_value9 = '';
                controlObj.text('search_f_value9_tbl_ld_cben_treelist', that._pr_tree_searchcontent.type2.f_value9);


                that._pr_tree_searchcontent.type2.f_value10 = '';
                controlObj.text('search_f_value10_tbl_ld_cben_treelist', that._pr_tree_searchcontent.type2.f_value10);


                that._pr_tree_searchcontent.type2.f_cbbh = '';
                controlObj.text('search_f_cbbh_tbl_ld_cben_treelist', that._pr_tree_searchcontent.type2.f_cbbh);


                that._pr_tree_searchcontent.type2.f_cbmc = '';
                controlObj.text('search_f_cbmc_tbl_ld_cben_treelist', that._pr_tree_searchcontent.type2.f_cbmc);


                that._pr_tree_searchcontent.type2.f_cbzq = '';
                controlObj.text('search_f_cbzq_tbl_ld_cben_treelist', that._pr_tree_searchcontent.type2.f_cbzq);


                that._pr_tree_searchcontent.type2.f_ksyf = '';
                controlObj.text('search_f_ksyf_tbl_ld_cben_treelist', that._pr_tree_searchcontent.type2.f_ksyf);


                //that._pr_tree_searchcontent.type2.f_cbymc = '';
                //controlObj.text('search_f_cbymc_tbl_ld_cben_treelist', that._pr_tree_searchcontent.type2.f_cbymc);


                //that._pr_tree_searchcontent.type2.f_cbyid = '';
                //controlObj.text('search_f_cbyid_tbl_ld_cben_treelist', that._pr_tree_searchcontent.type2.f_cbyid);
                that._pr_tree_searchcontent.type2.f_cbyid = '';
                controlObj.multidropdownlistid('search_f_cbymc_tbl_ld_cben_treelist', that._pr_tree_searchcontent.type2.f_cbyid);


                that._pr_tree_searchcontent.type2.f_ztid = '';
                controlObj.multidropdownlistid('search_f_zt_tbl_ld_cben_treelist', that._pr_tree_searchcontent.type2.f_ztid);


                that._pr_tree_searchcontent.type2.f_bz = '';
                controlObj.text('search_f_bz_tbl_ld_cben_treelist', that._pr_tree_searchcontent.type2.f_bz);



                break;
            case "2":
                if (that._pr_tree_searchcontent.type1 == undefined)
                {
                    that._pr_tree_searchcontent.type1 = '';
                }

                $("#txt_command_search_tbl_ld_cben_treelist").val('');
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
            $('#table_grid_tbl_ld_cben_treelist').bootstrapTable({
                showHeader: false,
                cache: false,
                height: _pageHeight - 70,

                striped: false,
                pagination: _isPage,
                pageSize: _pageSize,
                pageList: [_pageSize],
                pageNumber: that._pr_tree_gridpageindex,
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


                            //==抄本编号
                            {
                                value = row.f_cbbh;

                                //if (row.f_ztid == '9')
                                //{
                                //    resultHtml += "<div><span class=\"gridcell-fieldnamecn\">抄本编号：</span>" + value + "【" + row.f_zt + "】&nbsp;&nbsp;【" + row.cbiaocount + "/" + row.khcount + "】</div>";

                                //}
                                //else
                                //{
                                //    resultHtml += "<div><span class=\"gridcell-fieldnamecn\">抄本编号：</span>" + value + "&nbsp;&nbsp;【" + row.cbiaocount + "/" + row.khcount + "】</div>";
                                //}


                                //        //管理员  不显示已抄表状态的抄表总和
                                if (that._pr_isadmin == '0')
                                {
                                    if (row.f_ztid == '9')
                                    {
                                        resultHtml += "<div><span class=\"gridcell-fieldnamecn\">抄本编号：</span>" + value + "【" + row.f_zt + "】&nbsp;&nbsp;【" + row.khcount + "】</div>";

                                    }
                                    else
                                    {
                                        resultHtml += "<div><span class=\"gridcell-fieldnamecn\">抄本编号：</span>" + value + "&nbsp;&nbsp;【" + row.khcount + "】</div>";
                                    }

                                }
                                else
                                {
                                    if (row.f_ztid == '9')
                                    {
                                        resultHtml += "<div><span class=\"gridcell-fieldnamecn\">抄本编号：</span>" + value + "【" + row.f_zt + "】&nbsp;&nbsp;【" + row.cbiaocount + "/" + row.khcount + "】</div>";

                                    }
                                    else
                                    {
                                        resultHtml += "<div><span class=\"gridcell-fieldnamecn\">抄本编号：</span>" + value + "&nbsp;&nbsp;【" + row.cbiaocount + "/" + row.khcount + "】</div>";
                                    }
                                }

                            }
                            //==抄表员名称
                            {
                                value = row.f_cbymc;



                                resultHtml += "<div><span class=\"gridcell-fieldnamecn\">抄表员名称：</span>" + value + "</div>";
                            }

                            //==抄本名称
                            //{
                            //    value = row.f_cbmc;



                            //    resultHtml += "<div><span class=\"gridcell-fieldnamecn\">抄本名称：</span>" + value + "</div>"; 
                            //}                       


                            //==抄表周期
                            {
                                value = row.f_cbzq;



                                resultHtml += "<div><span class=\"gridcell-fieldnamecn\">抄表周期：</span>" + value + "</div>";
                            }


                            //==开始月份
                            {
                                value = row.f_ksyf;



                                resultHtml += "<div><span class=\"gridcell-fieldnamecn\">开始月份：</span>" + value + "</div>";
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
                    },
                    events:
                    {

                        'click .edit': function (e, value, row, index)
                        {

                            if (that._pr_tree_gridselectid != row.sys_id)
                            {
                                $('#table_grid_tbl_ld_cben_treelist').find('tr.success').removeClass('success');
                                $(e.target).parent().parent().parent().parent().parent().addClass('success');

                                that._pr_tree_gridselectid = row.sys_id;
                                that._pr_pgb_sys_id = '';
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
                    field: 'f_cbyphoto',
                    title: '抄表员photo',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        return value;
                    }
                },


                {
                    field: 'f_cbbh',
                    title: '抄本编号',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        return value;
                    }
                },


                {
                    field: 'f_cbmc',
                    title: '抄本名称',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        return value;
                    }
                },


                {
                    field: 'f_cbzq',
                    title: '抄表周期',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        return value;
                    }
                },


                {
                    field: 'f_ksyf',
                    title: '开始月份',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        return value;
                    }
                },


                {
                    field: 'f_cbymc',
                    title: '抄表员名称',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        return value;
                    }
                },


                {
                    field: 'f_cbyid',
                    title: '抄表员id',
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
                    that._pr_tree_gridpageindex = number;

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
    *  根据_pr_tree_searchcontent创建_whereClauseString
    */
    creatWhereClause = function (callBackFunction)
    {

        var whereClause = '';
        switch (that._pr_tree_searchtype)
        {
            case "1":
                {

                    if (that._pr_tree_searchcontent.type1 != undefined)
                    {
                        var vv = that._pr_tree_searchcontent.type1.split(' ');
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



                    _whereClauseString = whereClause;
                    callBackFunction.success();
                }
                break;

            case "2":
                {
                    if (that._pr_tree_searchcontent.type2 != undefined)
                    {

                        var tbl_ld_cben_treelist = that._pr_tree_searchcontent.type2;



                        if (tbl_ld_cben_treelist.f_cbbh.length > 0)
                        {
                            whereClause += " f_cbbh like '%" + tbl_ld_cben_treelist.f_cbbh + "%' and ";
                        }


                        if (tbl_ld_cben_treelist.f_cbmc.length > 0)
                        {
                            whereClause += " f_cbmc like '%" + tbl_ld_cben_treelist.f_cbmc + "%' and ";
                        }


                        if (tbl_ld_cben_treelist.f_cbzq.length > 0)
                        {
                            whereClause += " f_cbzq like '%" + tbl_ld_cben_treelist.f_cbzq + "%' and ";
                        }


                        if (tbl_ld_cben_treelist.f_ksyf.length > 0)
                        {
                            whereClause += " f_ksyf like '%" + tbl_ld_cben_treelist.f_ksyf + "%' and ";
                        }


                        //if (tbl_ld_cben_treelist.f_cbymc.length > 0)
                        //{
                        //    whereClause += " f_cbymc like '%" + tbl_ld_cben_treelist.f_cbymc + "%' and ";
                        //}
                        //if (tbl_ld_cben_treelist.f_cbyid.length > 0)
                        //{
                        //    whereClause += " f_cbyid like '%" + tbl_ld_cben_treelist.f_cbyid + "%' and ";
                        //}
                        if (tbl_ld_cben_treelist.f_cbyid.length > 0)
                        {
                            var elementArray = tbl_ld_cben_treelist.f_cbyid.split(',');
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


                        if (tbl_ld_cben_treelist.f_ztid.length > 0)
                        {
                            var elementArray = tbl_ld_cben_treelist.f_ztid.split(',');
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


                        if (tbl_ld_cben_treelist.f_bz.length > 0)
                        {
                            whereClause += " f_bz like '%" + tbl_ld_cben_treelist.f_bz + "%' and ";
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
    *  根据_whereClauseString，_pageSize，_pr_tree_gridpageindex绑定数据,
    *  并完成在that._pr_tree_gridselectid为空的情况下，指定要打开的数据
    *  为数据源计算ishaschild
    *  折叠行的显示情况
    *  定位滚动条
    */
    bindGrid = function (isClearStatus, callBackFunction)
    {

        if (isClearStatus == true)
        {
            that._pr_tree_gridselectid = '';
            that._pr_tree_gridstatusscrolltop = 0;


        }
        else
        {
            //记录滚动情况
            that._pr_tree_gridstatusscrolltop = $('#table_grid_tbl_ld_cben_treelist').parent().scrollTop();
        }

        $('#table_grid_tbl_ld_cben_treelist').bootstrapTable("showLoading");
        setTimeout(function ()
        {
            if (_whereClauseString == null || _whereClauseString == "")
            {
                _whereClauseString += " 1=1 ";
            }
            _whereClauseString += "  and f_value1 = '1'  ";
            var whereClause = _whereClauseString;
            var orderByString = ' f_cbbh asc';
            var columnsString = 'f_value1^f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^f_cbyphoto^f_cbbh^f_cbmc^f_cbzq^f_ksyf^f_cbymc^f_cbyid^f_zt^f_ztid^f_bz^sys_id';
            columnsString += '^(select count(*) from tbl_ld_khb where  sys_delflag = \'0\' and f_cbbhid = b.sys_id) as khcount';
            columnsString += '^(select count(*) from tbl_ld_cbiao where   f_ztid = \'1\' and sys_delflag = \'0\' and f_cbbhid = b.sys_id) as cbiaocount';
            var data = {
                whereString: whereClause,
                orderByString: orderByString,
                columnsString: columnsString,
                pageSizeString: _pageSize,
                pageIndexString: that._pr_tree_gridpageindex,
                clientInf: _clientInf
            };
            doAjaxFunction(_serviceUrl, 'GetList', data, {
                success: function (result)
                {

                    var messageJson = (new Function("", "return " + result))();
                    $('#table_grid_tbl_ld_cben_treelist').bootstrapTable("hideLoading");
                    //绑定数据
                    $('#table_grid_tbl_ld_cben_treelist').bootstrapTable("loadJson", messageJson);

                    //如果尚未指定打开哪条数据，则在此处指定
                    if (that._pr_tree_gridselectid == '')
                    {
                        if (messageJson.rows.length > 0)
                        {
                            that._pr_tree_gridselectid = messageJson.rows[0]["sys_id"];
                        }
                    }
                    $('#table_grid_tbl_ld_cben_treelist').find('tr.success').removeClass('success');
                    $('#table_grid_tbl_ld_cben_treelist').find('#tr_' + that._pr_tree_gridselectid).addClass('success');


                    //定位
                    $('#table_grid_tbl_ld_cben_treelist').parent().scrollTop(that._pr_tree_gridstatusscrolltop);
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
            $('#div_detail_control_container_tbl_ld_cben').css('min-height', _pageHeight);
            $('#div_list_container_tbl_ld_cben').css('min-height', _pageHeight);

            $('#div_container_tbl_ld_cben_treelist').load('../tbl_ld_cbiao/tbl_ld_cbiao_list_part4cben.html', null, function ()
            {
                tbl_ld_cbiao_list_Obj._pr_isadmin = that._pr_isadmin;
                tbl_ld_cbiao_list_Obj._pr_listtype = that._pr_listtype;
                tbl_ld_cbiao_list_Obj._pr_pgb_sys_id = requestQuery('pgid');
              
                tbl_ld_cbiao_list_Obj.init({
                    success: function ()
                    {
                        $('#div_container_tbl_ld_cben_treelist').css('display', '');
                        $('#div_loading_tbl_ld_cben_treelist').css('display', 'none');

                        callBackFunction.success();
                    }, fail: function (message)
                    {
                        _blockMessage.show('初始化抄表列表执行失败。<br/>' + message, 'fail');
                    }
                });
            });
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
    *  根据that._pr_tree_gridselectid绑定数据
    */
    bindDetailControl = function (callBackFunction)
    {
        if (that._pr_tree_gridselectid != "")
        {


            tbl_ld_cbiao_list_Obj._pr_cbbhid = that._pr_tree_gridselectid;
            tbl_ld_cbiao_list_Obj._pr_part_gridselectids = that._pr_part_gridselectids;
            tbl_ld_cbiao_list_Obj._pr_part_gridpageindex = that._pr_part_gridpageindex;


            tbl_ld_cbiao_list_Obj._pr_tree_gridselectid = that._pr_tree_gridselectid;
            tbl_ld_cbiao_list_Obj._pr_tree_gridpageindex = that._pr_tree_gridpageindex;
            tbl_ld_cbiao_list_Obj._pr_tree_gridstatusscrolltop = that._pr_tree_gridstatusscrolltop;
            tbl_ld_cbiao_list_Obj._pr_tree_searchtype = that._pr_tree_searchtype;
            tbl_ld_cbiao_list_Obj._pr_tree_searchcontent = that._pr_tree_searchcontent;

         


            tbl_ld_cbiao_list_Obj.initAndBindGrid({
                success: function ()
                {
                    callBackFunction.success();
                },
                fail: function (message)
                {
                    callBackFunction.fail(message);
                }
            });
        }
        else
        {
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


        //=================================================================================
        //                                      公有属性 
        //=================================================================================
        _pr_appcode: '',

        //1：可编辑；2：只读
        _pr_listtype: '',

        //是否是管理员
        _pr_isadmin: '',

        //当前被选中的行的ID
        _pr_tree_gridselectid: '',
        //当前在第几页
        _pr_tree_gridpageindex: 1,
        //滚动条的位置
        _pr_tree_gridstatusscrolltop: 0,

        //当前的查询模式：1：简单查询；2：高级查询
        _pr_tree_searchtype: '1',
        //查询内容type1:简单查询内容；type2：高级查询内容（JSON）
        _pr_tree_searchcontent: null,



        _pr_part_gridpageindex: 1,
        _pr_part_gridselectids: '',



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



                                _ladda_btn_command_rollback = Ladda.create('btn_command_countrollback_tbl_ld_cben_treelist');
                                _ladda_btn_command_count = Ladda.create('btn_command_count_tbl_ld_cben_treelist');
                                _validateMessage_search = new validateMessage('btn_search_modal_search_tbl_ld_cben_treelist');
                                _validateMessage_detail = new validateMessage('btn_command_save_tbl_ld_cben_treelist');

                                creatWhereClause({
                                    success: function ()
                                    {
                                        initGrid({
                                            success: function ()
                                            {
                                                bindGrid(false, {
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

                                                                        if (that._pr_isadmin == '1')
                                                                        {
                                                                            $('#btn_command_count_tbl_ld_cben_treelist').removeClass("hidden");
                                                                        } else
                                                                        {
                                                                            //$('#btn_command_countrollback_tbl_ld_cben_treelist').removeClass("hidden");
                                                                            //$('#btn_command_count_tbl_ld_cben_treelist').removeClass("hidden");

                                                                        }

                                                                        bindDetailControl({
                                                                            success: function ()
                                                                            {
                                                                                _blockMessage.hidden();

                                                                            },
                                                                            fail: function (message)
                                                                            {
                                                                                _blockMessage.show('bindDetailControl执行失败<br/>' + message, 'fail');
                                                                            }
                                                                        });



                                                                    }
                                                                });
                                                            }
                                                        });
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
                switch (that._pr_tree_searchtype)
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
                                                // _resultMessage.show(message);
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
            that._pr_tree_searchtype = '1';
            $('#btn_command_search_tbl_ld_cben_treelist').html('简单查询');
            $('#txt_command_search_tbl_ld_cben_treelist').removeAttr('disabled');
        },

        /* 
        *  
        *  方法:btn_command_search_2_onclick
        *  参数:
        *  高级查询模式
        */
        btn_command_search_2_onclick: function ()
        {

            that._pr_tree_searchtype = '2';
            $('#btn_command_search_tbl_ld_cben_treelist').html('高级查询');
            $('#txt_command_search_tbl_ld_cben_treelist').attr('disabled', 'disabled');

            $('#div_search_modal_tbl_ld_cben_treelist').modal('show');
        },

        btn_command_opensearch_onclick: function ()
        {
            $('#div_search_modal_tbl_ld_cben_treelist').modal('show');


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
                                    $('#div_search_modal_tbl_ld_cben_treelist').modal('hide')
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
            $('#div_search_modal_tbl_ld_cben_treelist').modal('hide');

            //that._pr_tree_searchtype = '1';
            //$( '#btn_command_search_tbl_ld_cben_treelist' ).html( '简单查询' );
            //$( '#txt_command_search_tbl_ld_cben_treelist' ).removeAttr( 'disabled' );

        },


        //算费回滚按钮
        btn_command_countrollback_onclick: function ()
        {

            var cbbhid = tbl_ld_cbiao_list_Obj._pr_cbbhid
            var pgbhid = tbl_ld_cbiao_list_Obj._pr_pgb_sys_id;
            var cb_count = tbl_ld_cbiao_list_Obj._pr_cb_count;
            if (cb_count == '0')
            {
                _alertMessage.show('当前没有数据!', 'warning', 1000);
                return;
            }
            var confirmContent = '<blockquote> ';
            confirmContent += '<h3>将对当前批次的<a style="color:red">' + cb_count + '</a>条抄表信息进行<a style="color:red">算费回滚</a></h3>';

            confirmContent += '<h5><a style="color:red">注意：回滚数据存在减免时，减免数据同时将被清除！</h5>';
            confirmContent += '</blockquote> ';
            _confirmMessage.destory();
            _confirmMessage.show('算费回滚确认？', confirmContent,
            {
                confirm: function ()
                {
                    _ladda_btn_command_rollback.start();
                    var data = {
                        pgid: tbl_ld_cbiao_list_Obj._pr_pgb_sys_id,
                        clientInf: _clientInf
                    };
                    doAjaxFunction(_serviceUrl, 'RollBack', data, {
                        success: function ()
                        {
                            tbl_ld_cbiao_list_Obj.bindGrid({
                                success: function ()
                                {
                                    _alertMessage.show('回滚成功', 'success', 2000);
                                    _ladda_btn_command_rollback.stop();
                                },
                                fail: function (message)
                                {
                                    _blockMessage.show('回滚成功，刷新页面执行失败<br/>' + message, 'fail');
                                    _ladda_btn_command_rollback.stop();
                                }
                            });
                        },
                        fail: function (message)
                        {
                            _resultMessage.show('回滚程序异常<br/>' + ex.message, 'fail');
                            _ladda_btn_command_rollback.stop();
                        }
                    });

                },
                cancle: function ()
                {

                }
            });
        },


        //算费按钮
        btn_command_count_onclick: function ()
        {

            var cbbhid = tbl_ld_cbiao_list_Obj._pr_cbbhid
            var pgbhid = tbl_ld_cbiao_list_Obj._pr_pgb_sys_id;
            var cb_count = tbl_ld_cbiao_list_Obj._pr_cb_count;
            if (cb_count == '0')
            {
                _alertMessage.show('当前没有数据!', 'warning', 1000);
                return;
            }

            var confirmContent = '<blockquote> ';
            confirmContent += '<h3><a style="color:red">将对当前抄本，选中的算费批次的' + cb_count + '条抄表信息进行算费</a></h3>';

            confirmContent += '</blockquote> ';
            _confirmMessage.destory();
            _confirmMessage.show('算费确认？', confirmContent,
            {
                confirm: function ()
                {
                    _ladda_btn_command_count.start();
                    var data = {
                        cbenid: cbbhid,
                        pgid: pgbhid,
                        clientInf: _clientInf
                    };
                    doAjaxFunction(_serviceUrl, 'Count', data, {
                        success: function ()
                        {
                            tbl_ld_cbiao_list_Obj.bindGrid({
                                success: function ()
                                {
                                    _alertMessage.show('算费成功', 'success', 2000);
                                    _ladda_btn_command_count.stop();
                                },
                                fail: function (message)
                                {
                                    _blockMessage.show('算费成功，刷新页面执行失败<br/>' + message, 'fail');
                                    _ladda_btn_command_count.stop();
                                }
                            });
                        },
                        fail: function (message)
                        {
                            _ladda_btn_command_count.stop();
                            _resultMessage.show(message);
                        }
                    });

                },
                cancle: function ()
                {

                }
            });
        },


        end: function ()
        {
        }
    };
    return that;
})();



$(document).ready(function ()
{
    tbl_ld_cben_treelist_Obj.init();
});






