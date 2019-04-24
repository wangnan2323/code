


var _clientInf = '{userid:"",appcode:"54",appname:"",userip:"",usermac:"",username:""}';
var _blockMessage = null;
var _alertMessage = null;
var _resultMessage = null;
var _confirmMessage = null;


var tbl_ldbm_khfz_treelist_Obj = (function ()
{
    'use strict';
    //=================================================================================
    //                                      私有
    //=================================================================================
    //=================================================================================
    //                                      私有属性 
    //=================================================================================
    var _serviceUrl = '//127.0.0.1/sara.dd.ldsw/service/service_tbl_ldbm_khfz.asmx/',

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
    initParameter = function (callBackFunction)
    {
        try
        {
            that._pr_listtype = requestQuery('listtype');
            that._pr_appcode = requestQuery('appcode');
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
                    $('#btn_command_search_tbl_ldbm_khfz_treelist').html('简单查询');
                    $('#txt_command_search_tbl_ldbm_khfz_treelist').removeAttr("disabled");

                    break;
                case "2":
                    $('#btn_command_search_tbl_ldbm_khfz_treelist').html('高级查询');
                    $('#txt_command_search_tbl_ldbm_khfz_treelist').attr("disabled", true);
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
                $('#btn_command_save_tbl_ldbm_khfz_treelist').addClass('hidden');
                $('#btn_command_delete_tbl_ldbm_khfz_treelist').addClass('hidden');

                var rows = $('#table_grid_tbl_ldbm_khfz_treelist').bootstrapTable('getData');
                if (rows.length > 0)
                {
                    $('#btn_command_new_tbl_ldbm_khfz_treelist').addClass('hidden');
                }
                else
                {
                    $('#btn_command_new_tbl_ldbm_khfz_treelist').removeClass('hidden');
                }

            }
            else
            {
                $('#btn_command_save_tbl_ldbm_khfz_treelist').removeClass('hidden');
                $('#btn_command_delete_tbl_ldbm_khfz_treelist').removeClass('hidden');
                $('#btn_command_new_tbl_ldbm_khfz_treelist').removeClass('hidden');
            }
        }
        else
        {
            $('#btn_command_save_tbl_ldbm_khfz_treelist').addClass('hidden');
            $('#btn_command_delete_tbl_ldbm_khfz_treelist').addClass('hidden');
            $('#btn_command_new_tbl_ldbm_khfz_treelist').addClass('hidden');
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














        codeServiceId += "0500^";

        codeServiceId = codeServiceId.trimEnd('^');
        commonObj.getCodeServiceJson(codeServiceId, {
            success: function (resultArray)
            {
                try
                {
                    _baseCodeHashMap = new hashMap();














                    _baseCodeHashMap.put('codeservice_0500', resultArray['0500']);

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
    initSearchControl = function (callBackFunction)
    {
        try
        {













            var codeService_0500 = _baseCodeHashMap.get('codeservice_0500');



























            controlObj.multidropdownlistinit('search_f_zt_tbl_ldbm_khfz_treelist', codeService_0500);




            //模态窗口
            $('#div_search_modal_tbl_ldbm_khfz_treelist').modal({
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
                        $("#txt_command_search_tbl_ldbm_khfz_treelist").val(that._pr_searchcontent.type1);
                    }

                    break;
                case "2":
                    if (that._pr_searchcontent.type2 != undefined)
                    {
                        //高级查询
                        var tbl_ldbm_khfz_treelist = that._pr_searchcontent.type2;


                        controlObj.text('search_f_value1_tbl_ldbm_khfz_treelist', tbl_ldbm_khfz_treelist.f_value1);

                        controlObj.text('search_f_value2_tbl_ldbm_khfz_treelist', tbl_ldbm_khfz_treelist.f_value2);

                        controlObj.text('search_f_value3_tbl_ldbm_khfz_treelist', tbl_ldbm_khfz_treelist.f_value3);

                        controlObj.text('search_f_value4_tbl_ldbm_khfz_treelist', tbl_ldbm_khfz_treelist.f_value4);

                        controlObj.text('search_f_value5_tbl_ldbm_khfz_treelist', tbl_ldbm_khfz_treelist.f_value5);

                        controlObj.text('search_f_value6_tbl_ldbm_khfz_treelist', tbl_ldbm_khfz_treelist.f_value6);

                        controlObj.text('search_f_value7_tbl_ldbm_khfz_treelist', tbl_ldbm_khfz_treelist.f_value7);

                        controlObj.text('search_f_value8_tbl_ldbm_khfz_treelist', tbl_ldbm_khfz_treelist.f_value8);

                        controlObj.text('search_f_value9_tbl_ldbm_khfz_treelist', tbl_ldbm_khfz_treelist.f_value9);

                        controlObj.text('search_f_value10_tbl_ldbm_khfz_treelist', tbl_ldbm_khfz_treelist.f_value10);

                        controlObj.text('search_f_fzbm_tbl_ldbm_khfz_treelist', tbl_ldbm_khfz_treelist.f_fzbm);

                        controlObj.text('search_f_fzmc_tbl_ldbm_khfz_treelist', tbl_ldbm_khfz_treelist.f_fzmc);

                        controlObj.multidropdownlistid('search_f_zt_tbl_ldbm_khfz_treelist', tbl_ldbm_khfz_treelist.f_ztid);

                        controlObj.text('search_f_bz_tbl_ldbm_khfz_treelist', tbl_ldbm_khfz_treelist.f_bz);


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
                    that._pr_searchcontent.type1 = $("#txt_command_search_tbl_ldbm_khfz_treelist").val();

                    break;
                case "2":

                    //高级查询
                    var tbl_ldbm_khfz_treelist = new Object();


                    tbl_ldbm_khfz_treelist.f_value1 = controlObj.text('search_f_value1_tbl_ldbm_khfz_treelist');


                    tbl_ldbm_khfz_treelist.f_value2 = controlObj.text('search_f_value2_tbl_ldbm_khfz_treelist');


                    tbl_ldbm_khfz_treelist.f_value3 = controlObj.text('search_f_value3_tbl_ldbm_khfz_treelist');


                    tbl_ldbm_khfz_treelist.f_value4 = controlObj.text('search_f_value4_tbl_ldbm_khfz_treelist');


                    tbl_ldbm_khfz_treelist.f_value5 = controlObj.text('search_f_value5_tbl_ldbm_khfz_treelist');


                    tbl_ldbm_khfz_treelist.f_value6 = controlObj.text('search_f_value6_tbl_ldbm_khfz_treelist');


                    tbl_ldbm_khfz_treelist.f_value7 = controlObj.text('search_f_value7_tbl_ldbm_khfz_treelist');


                    tbl_ldbm_khfz_treelist.f_value8 = controlObj.text('search_f_value8_tbl_ldbm_khfz_treelist');


                    tbl_ldbm_khfz_treelist.f_value9 = controlObj.text('search_f_value9_tbl_ldbm_khfz_treelist');


                    tbl_ldbm_khfz_treelist.f_value10 = controlObj.text('search_f_value10_tbl_ldbm_khfz_treelist');


                    tbl_ldbm_khfz_treelist.f_fzbm = controlObj.text('search_f_fzbm_tbl_ldbm_khfz_treelist');


                    tbl_ldbm_khfz_treelist.f_fzmc = controlObj.text('search_f_fzmc_tbl_ldbm_khfz_treelist');


                    tbl_ldbm_khfz_treelist.f_ztid = controlObj.multidropdownlistid('search_f_zt_tbl_ldbm_khfz_treelist');


                    tbl_ldbm_khfz_treelist.f_bz = controlObj.text('search_f_bz_tbl_ldbm_khfz_treelist');

                    that._pr_searchcontent.type2 = tbl_ldbm_khfz_treelist;
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
            var tbl_ldbm_khfz_treelist = that._pr_searchcontent.type2;
            var errorMessageHansMap = new hashMap();
            var errorMessagePlacementHansMap = new hashMap();




            if (tbl_ldbm_khfz_treelist.f_value1.length > 200)
            {
                errorMessageHansMap.put('search_f_value1_tbl_ldbm_khfz_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ldbm_khfz_treelist.f_value2.length > 200)
            {
                errorMessageHansMap.put('search_f_value2_tbl_ldbm_khfz_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ldbm_khfz_treelist.f_value3.length > 200)
            {
                errorMessageHansMap.put('search_f_value3_tbl_ldbm_khfz_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ldbm_khfz_treelist.f_value4.length > 200)
            {
                errorMessageHansMap.put('search_f_value4_tbl_ldbm_khfz_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ldbm_khfz_treelist.f_value5.length > 200)
            {
                errorMessageHansMap.put('search_f_value5_tbl_ldbm_khfz_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ldbm_khfz_treelist.f_value6.length > 200)
            {
                errorMessageHansMap.put('search_f_value6_tbl_ldbm_khfz_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ldbm_khfz_treelist.f_value7.length > 200)
            {
                errorMessageHansMap.put('search_f_value7_tbl_ldbm_khfz_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ldbm_khfz_treelist.f_value8.length > 200)
            {
                errorMessageHansMap.put('search_f_value8_tbl_ldbm_khfz_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ldbm_khfz_treelist.f_value9.length > 200)
            {
                errorMessageHansMap.put('search_f_value9_tbl_ldbm_khfz_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ldbm_khfz_treelist.f_value10.length > 200)
            {
                errorMessageHansMap.put('search_f_value10_tbl_ldbm_khfz_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ldbm_khfz_treelist.f_fzbm.length > 200)
            {
                errorMessageHansMap.put('search_f_fzbm_tbl_ldbm_khfz_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ldbm_khfz_treelist.f_fzmc.length > 200)
            {
                errorMessageHansMap.put('search_f_fzmc_tbl_ldbm_khfz_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ldbm_khfz_treelist.f_ztid.length > 200)
            {
                errorMessageHansMap.put('search_f_zt_tbl_ldbm_khfz_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ldbm_khfz_treelist.f_bz.length > 200)
            {
                errorMessageHansMap.put('search_f_bz_tbl_ldbm_khfz_treelist', '长度不能超过<a style="color:red">200</a>个字');
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
                controlObj.text('search_f_value1_tbl_ldbm_khfz_treelist', that._pr_searchcontent.type2.f_value1);


                that._pr_searchcontent.type2.f_value2 = '';
                controlObj.text('search_f_value2_tbl_ldbm_khfz_treelist', that._pr_searchcontent.type2.f_value2);


                that._pr_searchcontent.type2.f_value3 = '';
                controlObj.text('search_f_value3_tbl_ldbm_khfz_treelist', that._pr_searchcontent.type2.f_value3);


                that._pr_searchcontent.type2.f_value4 = '';
                controlObj.text('search_f_value4_tbl_ldbm_khfz_treelist', that._pr_searchcontent.type2.f_value4);


                that._pr_searchcontent.type2.f_value5 = '';
                controlObj.text('search_f_value5_tbl_ldbm_khfz_treelist', that._pr_searchcontent.type2.f_value5);


                that._pr_searchcontent.type2.f_value6 = '';
                controlObj.text('search_f_value6_tbl_ldbm_khfz_treelist', that._pr_searchcontent.type2.f_value6);


                that._pr_searchcontent.type2.f_value7 = '';
                controlObj.text('search_f_value7_tbl_ldbm_khfz_treelist', that._pr_searchcontent.type2.f_value7);


                that._pr_searchcontent.type2.f_value8 = '';
                controlObj.text('search_f_value8_tbl_ldbm_khfz_treelist', that._pr_searchcontent.type2.f_value8);


                that._pr_searchcontent.type2.f_value9 = '';
                controlObj.text('search_f_value9_tbl_ldbm_khfz_treelist', that._pr_searchcontent.type2.f_value9);


                that._pr_searchcontent.type2.f_value10 = '';
                controlObj.text('search_f_value10_tbl_ldbm_khfz_treelist', that._pr_searchcontent.type2.f_value10);


                that._pr_searchcontent.type2.f_fzbm = '';
                controlObj.text('search_f_fzbm_tbl_ldbm_khfz_treelist', that._pr_searchcontent.type2.f_fzbm);


                that._pr_searchcontent.type2.f_fzmc = '';
                controlObj.text('search_f_fzmc_tbl_ldbm_khfz_treelist', that._pr_searchcontent.type2.f_fzmc);


                that._pr_searchcontent.type2.f_ztid = '';
                controlObj.multidropdownlistid('search_f_zt_tbl_ldbm_khfz_treelist', that._pr_searchcontent.type2.f_ztid);


                that._pr_searchcontent.type2.f_bz = '';
                controlObj.text('search_f_bz_tbl_ldbm_khfz_treelist', that._pr_searchcontent.type2.f_bz);



                break;
            case "2":
                if (that._pr_searchcontent.type1 == undefined)
                {
                    that._pr_searchcontent.type1 = '';
                }

                $("#txt_command_search_tbl_ldbm_khfz_treelist").val('');
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
            $('#table_grid_tbl_ldbm_khfz_treelist').bootstrapTable({
                showHeader: false,
                cache: false,
                height: _pageHeight - 97,

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
                            //==分组编码
                            {
                                value = row.f_fzbm;

                                resultHtml += "<div><span class=\"gridcell-fieldnamecn\">分组编码：</span>" + value + "</div>";
                            }


                            //==分组名称
                            {
                                value = row.f_fzmc;
                                resultHtml += "<div><span class=\"gridcell-fieldnamecn\">分组名称：</span>" + value + "</div>";
                            }


                            //==状态
                            {
                                value = row.f_zt;
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
                    },
                    events:
                    {
                        'click .edit': function (e, value, row, index)
                        {
                            if (_gridStatusSelectid != row.sys_id)
                            {
                                $('#table_grid_tbl_ldbm_khfz_treelist').find('tr.success').removeClass('success');
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
                    field: 'f_fzbm',
                    title: '分组编码',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        return value;
                    }
                },


                {
                    field: 'f_fzmc',
                    title: '分组名称',
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

                                    whereClause += " f_fzbm like '%" + vv[i] + "%' or ";

                                    whereClause += " f_fzmc like '%" + vv[i] + "%' or ";

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

                        var tbl_ldbm_khfz_treelist = that._pr_searchcontent.type2;



                        if (tbl_ldbm_khfz_treelist.f_fzbm.length > 0)
                        {
                            whereClause += " f_fzbm like '%" + tbl_ldbm_khfz_treelist.f_fzbm + "%' and ";
                        }


                        if (tbl_ldbm_khfz_treelist.f_fzmc.length > 0)
                        {
                            whereClause += " f_fzmc like '%" + tbl_ldbm_khfz_treelist.f_fzmc + "%' and ";
                        }


                        if (tbl_ldbm_khfz_treelist.f_ztid.length > 0)
                        {
                            var elementArray = tbl_ldbm_khfz_treelist.f_ztid.split(',');
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


                        if (tbl_ldbm_khfz_treelist.f_bz.length > 0)
                        {
                            whereClause += " f_bz like '%" + tbl_ldbm_khfz_treelist.f_bz + "%' and ";
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
            _gridStatusScrollTop = $('#table_grid_tbl_ldbm_khfz_treelist').parent().scrollTop();
        }

        setTimeout(function ()
        {
            $('#table_grid_tbl_ldbm_khfz_treelist').bootstrapTable("showLoading");
            var whereClause = _whereClauseString;
            var orderByString = ' sys_id desc';
            var columnsString = 'f_value1^f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^f_fzbm^f_fzmc^f_zt^f_ztid^f_bz^sys_id';

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
                    $('#table_grid_tbl_ldbm_khfz_treelist').bootstrapTable("hideLoading");
                    $('#table_grid_tbl_ldbm_khfz_treelist').bootstrapTable("loadJson", messageJson);

                    //如果尚未指定打开哪条数据，则在此处指定
                    if (_gridStatusSelectid == '')
                    {
                        if (messageJson.rows.length > 0)
                        {
                            _gridStatusSelectid = messageJson.rows[0]["sys_id"];
                        }
                    }
                    $('#table_grid_tbl_ldbm_khfz_treelist').find('tr.success').removeClass('success');
                    $('#table_grid_tbl_ldbm_khfz_treelist').find('#tr_' + _gridStatusSelectid).addClass('success');


                    //定位
                    $('#table_grid_tbl_ldbm_khfz_treelist').parent().scrollTop(_gridStatusScrollTop);
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
            $('#div_detail_control_container_tbl_ldbm_khfz').css('min-height', _pageHeight);

            $('#div_list_container_tbl_ldbm_khfz').css('min-height', _pageHeight);

            var codeService_0500 = _baseCodeHashMap.get('codeservice_0500');

            controlObj.singledropdownlistinit('detail_f_zt_tbl_ldbm_khfz_treelist', codeService_0500, f_zt_onchange);

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
            $('#div_detail_tbl_ldbm_khfz').removeClass('hidden');
            setButtonDisable(false);

            getDetailData({
                success: function (tbl_ldbm_khfz_treelist)
                {
                    setDetailModel(tbl_ldbm_khfz_treelist, {
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
            $('#div_detail_tbl_ldbm_khfz').addClass('hidden');
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

        controlObj.textdisable('detail_f_fzmc_tbl_ldbm_khfz_treelist', isDisable);

        controlObj.textdisable('detail_f_fzbm_tbl_ldbm_khfz_treelist', isDisable);

        controlObj.textdisable('detail_f_bz_tbl_ldbm_khfz_treelist', isDisable);


        controlObj.singledropdownlistdisable('detail_f_zt_tbl_ldbm_khfz_treelist', isDisable);


    },
    // ---------------------------------Model操作------------------------------------
    /* 
    *  
    *  方法:setDetailModel
    *  参数:callBackFunction
    *  根据传入的tbl_ldbm_khfz_treelist，绑定DetailModel
    */
    setDetailModel = function (tbl_ldbm_khfz_treelist, callBackFunction)
    {
        try
        {

            controlObj.text('detail_f_value1_tbl_ldbm_khfz_treelist', tbl_ldbm_khfz_treelist.f_value1);

            controlObj.text('detail_f_value2_tbl_ldbm_khfz_treelist', tbl_ldbm_khfz_treelist.f_value2);

            controlObj.text('detail_f_value3_tbl_ldbm_khfz_treelist', tbl_ldbm_khfz_treelist.f_value3);

            controlObj.text('detail_f_value4_tbl_ldbm_khfz_treelist', tbl_ldbm_khfz_treelist.f_value4);

            controlObj.text('detail_f_value5_tbl_ldbm_khfz_treelist', tbl_ldbm_khfz_treelist.f_value5);

            controlObj.text('detail_f_value6_tbl_ldbm_khfz_treelist', tbl_ldbm_khfz_treelist.f_value6);

            controlObj.text('detail_f_value7_tbl_ldbm_khfz_treelist', tbl_ldbm_khfz_treelist.f_value7);

            controlObj.text('detail_f_value8_tbl_ldbm_khfz_treelist', tbl_ldbm_khfz_treelist.f_value8);

            controlObj.text('detail_f_value9_tbl_ldbm_khfz_treelist', tbl_ldbm_khfz_treelist.f_value9);

            controlObj.text('detail_f_value10_tbl_ldbm_khfz_treelist', tbl_ldbm_khfz_treelist.f_value10);

            controlObj.text('detail_f_fzmc_tbl_ldbm_khfz_treelist', tbl_ldbm_khfz_treelist.f_fzmc);

            controlObj.text('detail_f_fzbm_tbl_ldbm_khfz_treelist', tbl_ldbm_khfz_treelist.f_fzbm);

            controlObj.text('detail_f_bz_tbl_ldbm_khfz_treelist', tbl_ldbm_khfz_treelist.f_bz.returnStringRN());

            controlObj.singledropdownlistid('detail_f_zt_tbl_ldbm_khfz_treelist', tbl_ldbm_khfz_treelist.f_ztid);

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
            var tbl_ldbm_khfz_treelist = new Object();


            tbl_ldbm_khfz_treelist.f_value1 = controlObj.text('detail_f_value1_tbl_ldbm_khfz_treelist');


            tbl_ldbm_khfz_treelist.f_value2 = controlObj.text('detail_f_value2_tbl_ldbm_khfz_treelist');


            tbl_ldbm_khfz_treelist.f_value3 = controlObj.text('detail_f_value3_tbl_ldbm_khfz_treelist');


            tbl_ldbm_khfz_treelist.f_value4 = controlObj.text('detail_f_value4_tbl_ldbm_khfz_treelist');


            tbl_ldbm_khfz_treelist.f_value5 = controlObj.text('detail_f_value5_tbl_ldbm_khfz_treelist');


            tbl_ldbm_khfz_treelist.f_value6 = controlObj.text('detail_f_value6_tbl_ldbm_khfz_treelist');


            tbl_ldbm_khfz_treelist.f_value7 = controlObj.text('detail_f_value7_tbl_ldbm_khfz_treelist');


            tbl_ldbm_khfz_treelist.f_value8 = controlObj.text('detail_f_value8_tbl_ldbm_khfz_treelist');


            tbl_ldbm_khfz_treelist.f_value9 = controlObj.text('detail_f_value9_tbl_ldbm_khfz_treelist');


            tbl_ldbm_khfz_treelist.f_value10 = controlObj.text('detail_f_value10_tbl_ldbm_khfz_treelist');


            tbl_ldbm_khfz_treelist.f_fzmc = controlObj.text('detail_f_fzmc_tbl_ldbm_khfz_treelist');


            tbl_ldbm_khfz_treelist.f_fzbm = controlObj.text('detail_f_fzbm_tbl_ldbm_khfz_treelist');


            tbl_ldbm_khfz_treelist.f_bz = controlObj.text('detail_f_bz_tbl_ldbm_khfz_treelist');

            tbl_ldbm_khfz_treelist.f_zt = controlObj.singledropdownlist('detail_f_zt_tbl_ldbm_khfz_treelist');
            tbl_ldbm_khfz_treelist.f_ztid = controlObj.singledropdownlistid('detail_f_zt_tbl_ldbm_khfz_treelist');

            callBackFunction.success(tbl_ldbm_khfz_treelist);
        }
        catch (ex)
        {
            callBackFunction.fail(ex.message);
        }
    },

    /* 
    *  
    *  方法:checkDetailModel
    *  参数:tbl_ldbm_khfz_treelist, callBackFunction
    *  根据传入的数据对象，校验数据内容_validateMessage_detail
    */
    checkDetailModel = function (tbl_ldbm_khfz_treelist, callBackFunction)
    {
        try
        {
            var errorMessageHansMap = new hashMap();
            var errorMessagePlacementHansMap = new hashMap();





            if (tbl_ldbm_khfz_treelist.f_value1.length > 200)
            {
                errorMessageHansMap.put('detail_f_value1_tbl_ldbm_khfz_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ldbm_khfz_treelist.f_value2.length > 200)
            {
                errorMessageHansMap.put('detail_f_value2_tbl_ldbm_khfz_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ldbm_khfz_treelist.f_value3.length > 200)
            {
                errorMessageHansMap.put('detail_f_value3_tbl_ldbm_khfz_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ldbm_khfz_treelist.f_value4.length > 200)
            {
                errorMessageHansMap.put('detail_f_value4_tbl_ldbm_khfz_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ldbm_khfz_treelist.f_value5.length > 200)
            {
                errorMessageHansMap.put('detail_f_value5_tbl_ldbm_khfz_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ldbm_khfz_treelist.f_value6.length > 200)
            {
                errorMessageHansMap.put('detail_f_value6_tbl_ldbm_khfz_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ldbm_khfz_treelist.f_value7.length > 200)
            {
                errorMessageHansMap.put('detail_f_value7_tbl_ldbm_khfz_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ldbm_khfz_treelist.f_value8.length > 200)
            {
                errorMessageHansMap.put('detail_f_value8_tbl_ldbm_khfz_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ldbm_khfz_treelist.f_value9.length > 200)
            {
                errorMessageHansMap.put('detail_f_value9_tbl_ldbm_khfz_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ldbm_khfz_treelist.f_value10.length > 200)
            {
                errorMessageHansMap.put('detail_f_value10_tbl_ldbm_khfz_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ldbm_khfz_treelist.f_fzmc.length > 200)
            {
                errorMessageHansMap.put('detail_f_fzmc_tbl_ldbm_khfz_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ldbm_khfz_treelist.f_fzmc.length < 1)
            {
                errorMessageHansMap.put('detail_f_fzmc_tbl_ldbm_khfz_treelist', '长度不能小于<a style="color:red">1</a>个字');
            }




            if (tbl_ldbm_khfz_treelist.f_fzbm.length > 200)
            {
                errorMessageHansMap.put('detail_f_fzbm_tbl_ldbm_khfz_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ldbm_khfz_treelist.f_fzbm.length < 1)
            {
                errorMessageHansMap.put('detail_f_fzbm_tbl_ldbm_khfz_treelist', '长度不能小于<a style="color:red">1</a>个字');
            }




            if (tbl_ldbm_khfz_treelist.f_bz.length > 4000)
            {
                errorMessageHansMap.put('detail_f_bz_tbl_ldbm_khfz_treelist', '长度不能超过<a style="color:red">4000</a>个字');
            }




            if (tbl_ldbm_khfz_treelist.f_zt.length > 200)
            {
                errorMessageHansMap.put('detail_f_zt_tbl_ldbm_khfz_treelist', '长度不能超过<a style="color:red">200</a>个字');
            }


            if (errorMessageHansMap.keys().length > 0)
            {
                _validateMessage_detail.show(errorMessageHansMap, errorMessagePlacementHansMap, true);
                callBackFunction.fail('');
            }
            else
            {
                _validateMessage_detail.hidden();
                callBackFunction.success(tbl_ldbm_khfz_treelist);
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
    *  参数:tbl_ldbm_khfz_treelist
    *  清空数据对象
    */
    clearDetailModel = function ()
    {
        var tbl_ldbm_khfz_treelist = {};


        tbl_ldbm_khfz_treelist.f_value1 = '';
        controlObj.text('detail_f_value1_tbl_ldbm_khfz_treelist', tbl_ldbm_khfz_treelist.f_value1);

        tbl_ldbm_khfz_treelist.f_value2 = '';
        controlObj.text('detail_f_value2_tbl_ldbm_khfz_treelist', tbl_ldbm_khfz_treelist.f_value2);

        tbl_ldbm_khfz_treelist.f_value3 = '';
        controlObj.text('detail_f_value3_tbl_ldbm_khfz_treelist', tbl_ldbm_khfz_treelist.f_value3);

        tbl_ldbm_khfz_treelist.f_value4 = '';
        controlObj.text('detail_f_value4_tbl_ldbm_khfz_treelist', tbl_ldbm_khfz_treelist.f_value4);

        tbl_ldbm_khfz_treelist.f_value5 = '';
        controlObj.text('detail_f_value5_tbl_ldbm_khfz_treelist', tbl_ldbm_khfz_treelist.f_value5);

        tbl_ldbm_khfz_treelist.f_value6 = '';
        controlObj.text('detail_f_value6_tbl_ldbm_khfz_treelist', tbl_ldbm_khfz_treelist.f_value6);

        tbl_ldbm_khfz_treelist.f_value7 = '';
        controlObj.text('detail_f_value7_tbl_ldbm_khfz_treelist', tbl_ldbm_khfz_treelist.f_value7);

        tbl_ldbm_khfz_treelist.f_value8 = '';
        controlObj.text('detail_f_value8_tbl_ldbm_khfz_treelist', tbl_ldbm_khfz_treelist.f_value8);

        tbl_ldbm_khfz_treelist.f_value9 = '';
        controlObj.text('detail_f_value9_tbl_ldbm_khfz_treelist', tbl_ldbm_khfz_treelist.f_value9);

        tbl_ldbm_khfz_treelist.f_value10 = '';
        controlObj.text('detail_f_value10_tbl_ldbm_khfz_treelist', tbl_ldbm_khfz_treelist.f_value10);

        tbl_ldbm_khfz_treelist.f_fzmc = '';
        controlObj.text('detail_f_fzmc_tbl_ldbm_khfz_treelist', tbl_ldbm_khfz_treelist.f_fzmc);

        tbl_ldbm_khfz_treelist.f_fzbm = '';
        controlObj.text('detail_f_fzbm_tbl_ldbm_khfz_treelist', tbl_ldbm_khfz_treelist.f_fzbm);

        tbl_ldbm_khfz_treelist.f_bz = '';
        controlObj.text('detail_f_bz_tbl_ldbm_khfz_treelist', tbl_ldbm_khfz_treelist.f_bz.returnStringRN());

        tbl_ldbm_khfz_treelist.f_zt = '';
        tbl_ldbm_khfz_treelist.f_ztid = '';
        controlObj.singledropdownlistid('detail_f_zt_tbl_ldbm_khfz_treelist', tbl_ldbm_khfz_treelist.f_ztid);


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
        var columnsString = 'f_value1^f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^f_fzbm^f_fzmc^f_zt^f_ztid^f_bz^sys_id';

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
    *  参数:tbl_ldbm_khfz_treelist, callbackFunction
    *  根据传入的数据对象，更新数据
    */
    updateDetailData = function (tbl_ldbm_khfz_treelist, callbackFunction)
    {
        var d = new Date();
        var columns = 'f_value1^f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^f_fzbm^f_fzmc^f_zt^f_ztid^f_bz^sys_id^sys_lastedituserid^sys_lasteditusername^sys_lasteditdate';
        var json = {
            sys_id: _gridStatusSelectid,


            f_value1: tbl_ldbm_khfz_treelist.f_value1,

            f_value2: tbl_ldbm_khfz_treelist.f_value2,

            f_value3: tbl_ldbm_khfz_treelist.f_value3,

            f_value4: tbl_ldbm_khfz_treelist.f_value4,

            f_value5: tbl_ldbm_khfz_treelist.f_value5,

            f_value6: tbl_ldbm_khfz_treelist.f_value6,

            f_value7: tbl_ldbm_khfz_treelist.f_value7,

            f_value8: tbl_ldbm_khfz_treelist.f_value8,

            f_value9: tbl_ldbm_khfz_treelist.f_value9,

            f_value10: tbl_ldbm_khfz_treelist.f_value10,

            f_fzmc: tbl_ldbm_khfz_treelist.f_fzmc,

            f_fzbm: tbl_ldbm_khfz_treelist.f_fzbm,

            f_bz: tbl_ldbm_khfz_treelist.f_bz.formatStringRN(),

            f_zt: tbl_ldbm_khfz_treelist.f_zt,
            f_ztid: tbl_ldbm_khfz_treelist.f_ztid,


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
                callbackFunction.success(tbl_ldbm_khfz_treelist);
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


            f_fzmc: '',


            f_fzbm: '',


            f_bz: '',

            f_ztid: '0',


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

                                _ladda_btn_command_new = Ladda.create('btn_command_new_tbl_ldbm_khfz_treelist');
                                _ladda_btn_command_delete = Ladda.create('btn_command_delete_tbl_ldbm_khfz_treelist');
                                _ladda_btn_command_save = Ladda.create('btn_command_save_tbl_ldbm_khfz_treelist');
                                _validateMessage_search = new validateMessage('btn_search_modal_search_tbl_ldbm_khfz_treelist');
                                _validateMessage_detail = new validateMessage('btn_command_save_tbl_ldbm_khfz_treelist');

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
                                                                        bindDetailControl({
                                                                            success: function ()
                                                                            {
                                                                                _blockMessage.hidden();
                                                                            },
                                                                            fail: function ()
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
            $('#btn_command_search_tbl_ldbm_khfz_treelist').html('简单查询');
            $('#txt_command_search_tbl_ldbm_khfz_treelist').removeAttr('disabled');
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
            $('#btn_command_search_tbl_ldbm_khfz_treelist').html('高级查询');
            $('#txt_command_search_tbl_ldbm_khfz_treelist').attr('disabled', 'disabled');

            $('#div_search_modal_tbl_ldbm_khfz_treelist').modal('show');
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
                                    $('#div_search_modal_tbl_ldbm_khfz_treelist').modal('hide')
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
            $('#div_search_modal_tbl_ldbm_khfz_treelist').modal('hide');

            that._pr_searchtype = '1';
            $('#btn_command_search_tbl_ldbm_khfz_treelist').html('简单查询');
            $('#txt_command_search_tbl_ldbm_khfz_treelist').removeAttr('disabled');

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
                success: function (tbl_ldbm_khfz_treelist)
                {
                    checkDetailModel(tbl_ldbm_khfz_treelist, {
                        success: function (tbl_ldbm_khfz_treelist)
                        {
                            updateDetailData(tbl_ldbm_khfz_treelist, {
                                success: function (tbl_ldbm_khfz_treelist)
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



$(document).ready(function ()
{
    tbl_ldbm_khfz_treelist_Obj.init();
});






