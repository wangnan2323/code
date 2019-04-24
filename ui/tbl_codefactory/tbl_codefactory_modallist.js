

var _pr_appcode = '';
var _clientInf = '{userid:"",appcode:"54",appname:"",userip:"",usermac:"",username:""}';
var _blockMessage = null;
var _alertMessage = null;
var _resultMessage = null;
var _confirmMessage = null;

var tbl_codefactory_modallist_Obj = (function ()
{
    'use strict';
    //=================================================================================
    //                                      私有
    //=================================================================================
    //=================================================================================
    //                                      私有属性 
    //=================================================================================
    var _serviceUrl = '//162.16.166.1/sara.dd.ldsw/service/service_tbl_codefactory.asmx/',

    //Grid控件的分页参数，设置为空即可实现不分页
    _pageSize = '4',

    //Code数据存储容器
    _baseCodeHashMap = null,

    _validateMessage_search = null,
    _validateMessage_detail = null,

    _ladda_btn_command_new = null,
    _ladda_btn_command_delete = null,

    //where语句
    _whereClauseString = '',

    _sys_id = '',

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
            _pr_appcode = requestQuery('appcode');
            that._pr_gridselectids = requestQuery('gridselectids');
            that._pr_gridpageindex = requestQuery('gridpageIndex');
            that._pr_searchtype = requestQuery('searchtype');
            that._pr_searchcontent = requestQuery('searchcontent');
            _clientInf = '{userid:"' + basePageObj._userInfoJson.sys_userid + '",appcode:"' + _pr_appcode + '",appname:"",userip:"' + basePageObj._userInfoJson.ip + '",usermac:"' + basePageObj._userInfoJson.mac + '",username:"' + basePageObj._userInfoJson.sys_username + '"}';

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
                    $('#btn_command_search_tbl_codefactory_modallist').html('简单查询');
                    $('#txt_command_search_tbl_codefactory_modallist').removeAttr("disabled");

                    break;
                case "2":
                    $('#btn_command_search_tbl_codefactory_modallist').html('高级查询');
                    $('#txt_command_search_tbl_codefactory_modallist').attr("disabled", true);
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

            $('#table_grid_tbl_codefactory_modallist').bootstrapTable({
                cache: false,
                height: gridHeight,
                striped: true,
                pagination: true,
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
                    field: 'sys_id', title: 'sys_id',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                    sortable: true
                },


                {
                    field: 'f_value1', title: '备用字段1',
                    visible: false,
                    "class": 'cc-hidden-sm  cc-hidden-xs',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) { return value; }
                },



                {
                    field: 'f_value2', title: '备用字段2',
                    visible: false,
                    "class": 'cc-hidden-sm  cc-hidden-xs',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) { return value; }
                },



                {
                    field: 'f_value3', title: '备用字段3',
                    visible: false,
                    "class": 'cc-hidden-sm  cc-hidden-xs',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) { return value; }
                },



                {
                    field: 'f_value4', title: '备用字段4',
                    visible: false,
                    "class": 'cc-hidden-sm  cc-hidden-xs',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) { return value; }
                },



                {
                    field: 'f_value5', title: '备用字段5',
                    visible: false,
                    "class": 'cc-hidden-sm  cc-hidden-xs',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) { return value; }
                },



                {
                    field: 'f_value6', title: '备用字段6',
                    visible: false,
                    "class": 'cc-hidden-sm  cc-hidden-xs',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) { return value; }
                },



                {
                    field: 'f_value7', title: '备用字段7',
                    visible: false,
                    "class": 'cc-hidden-sm  cc-hidden-xs',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) { return value; }
                },



                {
                    field: 'f_value8', title: '备用字段8',
                    visible: false,
                    "class": 'cc-hidden-sm  cc-hidden-xs',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) { return value; }
                },



                {
                    field: 'f_value9', title: '备用字段9',
                    visible: false,
                    "class": 'cc-hidden-sm  cc-hidden-xs',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) { return value; }
                },



                {
                    field: 'f_value10', title: '备用字段10',
                    visible: false,
                    "class": 'cc-hidden-sm  cc-hidden-xs',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) { return value; }
                },



                {
                    field: 'f_text1', title: '文本录入框',
                    "class": 'cc-hidden-sm  cc-hidden-xs',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) { return value; }
                },



                {
                    field: 'f_text2', title: '带按钮的文本录入框',
                    "class": 'cc-hidden-sm  cc-hidden-xs',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) { return value; }
                },



                {
                    field: 'f_text3', title: '带提示的文本录入框',
                    "class": 'cc-hidden-sm  cc-hidden-xs',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) { return value; }
                },



                {
                    field: 'f_singledropdownlist', title: '单选下拉列表',
                    "class": 'cc-hidden-sm  cc-hidden-xs',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) { return value; }
                },



                {
                    field: 'f_multidropdownlist', title: '复选下拉列表',
                    "class": 'cc-hidden-sm  cc-hidden-xs',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) { return value; }
                },



                {
                    field: 'f_itemlist', title: 'listbox',
                    "class": 'cc-hidden-sm  cc-hidden-xs',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) { return value; }
                },



                {
                    field: 'f_toggle', title: '是否按钮',
                    "class": 'cc-hidden-sm  cc-hidden-xs',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) { return value; }
                },



                {
                    field: 'f_checklist', title: '复选框列表',
                    "class": 'cc-hidden-sm  cc-hidden-xs',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) { return value; }
                },



                {
                    field: 'f_radiolist', title: '单选框列表',
                    "class": 'cc-hidden-sm  cc-hidden-xs',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) { return value; }
                },



                {
                    field: 'f_autocomplete', title: '自动完成',
                    "class": 'cc-hidden-sm  cc-hidden-xs',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) { return value; }
                },


                {
                    field: 'f_datetime', title: '日期和时间',
                    "class": 'cc-hidden-sm  cc-hidden-xs',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        //如果日期为1900-1-1则默认显示为空
                        var d = value.toDateTime().Format("yyyy-MM-dd hh:mm:ss");
                        if (d == '1900-01-01 00:00:00')
                        {
                            return "&nbsp;&nbsp;";
                        }
                        else
                        {
                            return d;
                        }
                    }
                },



                {
                    field: 'f_slider', title: '滑动条',
                    "class": 'cc-hidden-sm  cc-hidden-xs',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) { return value; }
                },



                {
                    field: 'f_textarea', title: '大文本框',
                    "class": 'cc-hidden-sm  cc-hidden-xs',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) { return value; }
                },



                {
                    field: 'f_richtext', title: '富文本框',
                    "class": 'cc-hidden-sm  cc-hidden-xs',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) { return value; }
                },



                {
                    field: 'f_file', title: '附件',
                    "class": 'cc-hidden-sm  cc-hidden-xs',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) { return value; }
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
                        
                            _sys_id = row.sys_id;
                            getDetailData({
                                success: function (tbl_codefactory_modallist)
                                {
                                    bindDeitalModel(tbl_codefactory_modallist, {
                                        success: function ()
                                        {
                                            $('#div_detail_modal_tbl_codefactory_modallist').modal('show');
                                        }
                                    });
                                }                              
                            });

                        },
                        'click .edit': function (e, value, row, index)
                        {
                            _sys_id = row.sys_id;
                            getDetailData({
                                success: function (tbl_codefactory_modallist)
                                {
                                    bindDeitalModel(tbl_codefactory_modallist, {
                                        success: function ()
                                        {
                                            $('#div_detail_modal_tbl_codefactory_modallist').modal('show');
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
                    that.bindGrid();
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
                    var rows = $('#table_grid_tbl_codefactory_modallist').bootstrapTable('getSelections');
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
                    var rows = $('#table_grid_tbl_codefactory_modallist').bootstrapTable('getData');
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
    *  方法:setDisable
    *  参数:isDisable
    *  设置detailModel是否只读
    */
    setDisable = function (isDisable)
    {

        controlObj.textdisable('detail_txt_f_text1_tbl_codefactory_modallist', isDisable);

        controlObj.textdisable('detail_txt_f_text2_tbl_codefactory_modallist', isDisable);

        if (isDisable)
        {
            $('#btn_detail_txt_f_text2_tbl_codefactory_modallist').attr('disabled', 'disabled');
        }
        else
        {
            $('#btn_detail_txt_f_text2_tbl_codefactory_modallist').removeAttr('disabled');
        }

        controlObj.textdisable('detail_txt_f_text3_tbl_codefactory_modallist', isDisable);


        controlObj.singledropdownlistdisable('detail_dropdown_f_singledropdownlist_tbl_codefactory_modallist', isDisable);

        controlObj.multidropdownlistdisable('detail_dropdown_f_multidropdownlist_tbl_codefactory_modallist', isDisable);

        controlObj.itemlistdisable('detail_list_f_itemlist_tbl_codefactory_modallist', isDisable);


        controlObj.toggledisable('detail_ck_f_toggle_tbl_codefactory_modallist', isDisable);


        controlObj.checklistdisable('detail_list_f_checklist_tbl_codefactory_modallist', isDisable);


        controlObj.radiolistdisable('detail_list_f_radiolist_tbl_codefactory_modallist', isDisable);

        controlObj.textdisable('detail_txt_f_autocomplete_tbl_codefactory_modallist', isDisable);

        controlObj.datetimedisable('detail_datetime_f_datetime_tbl_codefactory_modallist_date', 'detail_datetime_f_datetime_tbl_codefactory_modallist_time', isDisable);

        controlObj.sliderdisable('detail_slider_f_slider_tbl_codefactory_modallist', isDisable);

        controlObj.textdisable('detail_txt_f_textarea_tbl_codefactory_modallist', isDisable);


        controlObj.richtextdisable('detail_txt_f_richtext_tbl_codefactory_modallist', isDisable);

        controlObj.fileuploaderdisable('detail_file_f_file_tbl_codefactory_modallist', isDisable);



        if (isDisable)
        {
            $('#btn_detail_modal_save_tbl_codefactory_modallist').addClass('hidden');
            $('#btn_command_new_tbl_codefactory_modallist').addClass('hidden');
            $('#btn_command_delete_tbl_codefactory_modallist').addClass('hidden');
        }
        else
        {
            $('#btn_detail_modal_save_tbl_codefactory_modallist').removeClass('hidden');
            $('#btn_command_new_tbl_codefactory_modallist').removeClass('hidden');
            $('#btn_command_delete_tbl_codefactory_modallist').removeClass('hidden');
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
        commonObj.getCodeServiceJson('0313', {
            success: function (resultArray)
            {
                try
                {
                    _baseCodeHashMap = new hashMap();

                    _baseCodeHashMap.put('servicecode_0108', resultArray['0313']);

                    _baseCodeHashMap.put('servicecode_array', ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Dakota", "North Carolina", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"]);

                    callBackFunction.success();
                }
                catch (ex)
                {
                    _blockMessage.show('initBaseCode执行失败。<br/>' + ex.message, 'fail');
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

            //单选下拉列表--采用复选模式
            var resultArray = _baseCodeHashMap.get('servicecode_0108');
            var toggleArray = [{ id: 'true', text: '开' }, { id: 'false', text: '关' }];

            controlObj.multidropdownlistinit('search_dropdown_f_singledropdownlist_tbl_codefactory_modallist', resultArray);

            controlObj.multidropdownlistinit('search_dropdown_f_multidropdownlist_tbl_codefactory_modallist', resultArray);

            controlObj.checklistinit('search_list_f_itemlist_tbl_codefactory_modallist', resultArray);

            controlObj.multidropdownlistinit('search_dropdown_f_toggle_tbl_codefactory_modallist', resultArray);

            controlObj.checklistinit('search_list_f_checklist_tbl_codefactory_modallist', resultArray);

            controlObj.checklistinit('search_list_f_radiolist_tbl_codefactory_modallist', resultArray);

            controlObj.datetimeinit('search_datetime_f_datetime_tbl_codefactory_modallist_datefrom', 'search_datetime_f_datetime_tbl_codefactory_modallist_timefrom');
            controlObj.datetimeinit('search_datetime_f_datetime_tbl_codefactory_modallist_dateto', 'search_datetime_f_datetime_tbl_codefactory_modallist_timeto');

            controlObj.datetime('search_datetime_f_datetime_tbl_codefactory_modallist_datefrom', 'search_datetime_f_datetime_tbl_codefactory_modallist_timefrom', '1900-01-01 00:00:00');
            controlObj.datetime('search_datetime_f_datetime_tbl_codefactory_modallist_dateto', 'search_datetime_f_datetime_tbl_codefactory_modallist_timeto', '1900-01-01 00:00:00');



            //模态窗口
            $('#div_search_modal_tbl_codefactory_modallist').modal({
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
                        $("#txt_command_search_tbl_codefactory_modallist").val(that._pr_searchcontent.type1);
                    }

                    break;
                case "2":
                    if (that._pr_searchcontent.type2 != undefined)
                    {
                        //高级查询
                        var tbl_codefactory_modallist = that._pr_searchcontent.type2;

                        controlObj.text('search_txt_f_value1_tbl_codefactory_modallist', tbl_codefactory_modallist.f_value1);

                        controlObj.text('search_txt_f_value2_tbl_codefactory_modallist', tbl_codefactory_modallist.f_value2);

                        controlObj.text('search_txt_f_value3_tbl_codefactory_modallist', tbl_codefactory_modallist.f_value3);

                        controlObj.text('search_txt_f_value4_tbl_codefactory_modallist', tbl_codefactory_modallist.f_value4);

                        controlObj.text('search_txt_f_value5_tbl_codefactory_modallist', tbl_codefactory_modallist.f_value5);

                        controlObj.text('search_txt_f_value6_tbl_codefactory_modallist', tbl_codefactory_modallist.f_value6);

                        controlObj.text('search_txt_f_value7_tbl_codefactory_modallist', tbl_codefactory_modallist.f_value7);

                        controlObj.text('search_txt_f_value8_tbl_codefactory_modallist', tbl_codefactory_modallist.f_value8);

                        controlObj.text('search_txt_f_value9_tbl_codefactory_modallist', tbl_codefactory_modallist.f_value9);

                        controlObj.text('search_txt_f_value10_tbl_codefactory_modallist', tbl_codefactory_modallist.f_value10);

                        controlObj.text('search_txt_f_text1_tbl_codefactory_modallist', tbl_codefactory_modallist.f_text1);

                        controlObj.text('search_txt_f_text2_tbl_codefactory_modallist', tbl_codefactory_modallist.f_text2);

                        controlObj.text('search_txt_f_text3_tbl_codefactory_modallist', tbl_codefactory_modallist.f_text3);

                        controlObj.multidropdownlistid('search_dropdown_f_singledropdownlist_tbl_codefactory_modallist', tbl_codefactory_modallist.f_singledropdownlistid);

                        controlObj.multidropdownlistid('search_dropdown_f_multidropdownlist_tbl_codefactory_modallist', tbl_codefactory_modallist.f_multidropdownlistid);


                        controlObj.checklistid('search_list_f_itemlist_tbl_codefactory_modallist', tbl_codefactory_modallist.f_itemlistid);

                        controlObj.multidropdownlistid('search_dropdown_f_toggle_tbl_codefactory_modallist', tbl_codefactory_modallist.f_toggle);

                        controlObj.checklistid('search_list_f_checklist_tbl_codefactory_modallist', tbl_codefactory_modallist.f_checklistid);

                        controlObj.checklistid('search_list_f_radiolist_tbl_codefactory_modallist', tbl_codefactory_modallist.f_radiolistid);

                        controlObj.text('search_txt_f_autocomplete_tbl_codefactory_modallist', tbl_codefactory_modallist.f_autocomplete);


                        controlObj.datetime('search_datetime_f_datetime_tbl_codefactory_modallist_datefrom', 'search_datetime_f_datetime_tbl_codefactory_modallisttimefrom', tbl_codefactory_modallist.f_datetimefrom);
                        controlObj.datetime('search_datetime_f_datetime_tbl_codefactory_modallist_dateto', 'search_datetime_f_datetime_tbl_codefactory_modallist_timeto', tbl_codefactory_modallist.f_datetimeto);


                        controlObj.text('search_txt_f_slider_tbl_codefactory_modallist', tbl_codefactory_modallist.f_slider);

                        controlObj.text('search_txt_f_textarea_tbl_codefactory_modallist', tbl_codefactory_modallist.f_textarea);

                        controlObj.text('search_txt_f_richtext_tbl_codefactory_modallist', tbl_codefactory_modallist.f_richtext);

                        controlObj.text('search_txt_f_file_tbl_codefactory_modallist', tbl_codefactory_modallist.f_file);



                    }

                    break;
            }


            callBackFunction.success();
        }
        catch (ex)
        {
            _blockMessage.show('setSearchModel执行失败。<br/>' + ex.message, 'fail');
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
                    that._pr_searchcontent.type1 = $("#txt_command_search_tbl_codefactory_modallist").val();

                    break;
                case "2":

                    var tbl_codefactory_modallist = new Object();


                    tbl_codefactory_modallist.f_value1 = controlObj.text('search_txt_f_value1_tbl_codefactory_modallist');


                    tbl_codefactory_modallist.f_value2 = controlObj.text('search_txt_f_value2_tbl_codefactory_modallist');


                    tbl_codefactory_modallist.f_value3 = controlObj.text('search_txt_f_value3_tbl_codefactory_modallist');


                    tbl_codefactory_modallist.f_value4 = controlObj.text('search_txt_f_value4_tbl_codefactory_modallist');


                    tbl_codefactory_modallist.f_value5 = controlObj.text('search_txt_f_value5_tbl_codefactory_modallist');


                    tbl_codefactory_modallist.f_value6 = controlObj.text('search_txt_f_value6_tbl_codefactory_modallist');


                    tbl_codefactory_modallist.f_value7 = controlObj.text('search_txt_f_value7_tbl_codefactory_modallist');


                    tbl_codefactory_modallist.f_value8 = controlObj.text('search_txt_f_value8_tbl_codefactory_modallist');


                    tbl_codefactory_modallist.f_value9 = controlObj.text('search_txt_f_value9_tbl_codefactory_modallist');


                    tbl_codefactory_modallist.f_value10 = controlObj.text('search_txt_f_value10_tbl_codefactory_modallist');


                    tbl_codefactory_modallist.f_text1 = controlObj.text('search_txt_f_text1_tbl_codefactory_modallist');


                    tbl_codefactory_modallist.f_text2 = controlObj.text('search_txt_f_text2_tbl_codefactory_modallist');


                    tbl_codefactory_modallist.f_text3 = controlObj.text('search_txt_f_text3_tbl_codefactory_modallist');


                    tbl_codefactory_modallist.f_singledropdownlistid = controlObj.multidropdownlistid('search_dropdown_f_singledropdownlist_tbl_codefactory_modallist');


                    tbl_codefactory_modallist.f_multidropdownlistid = controlObj.multidropdownlistid('search_dropdown_f_multidropdownlist_tbl_codefactory_modallist');


                    tbl_codefactory_modallist.f_itemlistid = controlObj.checklistid('search_list_f_itemlist_tbl_codefactory_modallist');


                    tbl_codefactory_modallist.f_toggle = controlObj.multidropdownlistid('search_dropdown_f_toggle_tbl_codefactory_modallist');

                    tbl_codefactory_modallist.f_checklistid = controlObj.checklistid('search_list_f_checklist_tbl_codefactory_modallist');

                    tbl_codefactory_modallist.f_radiolistid = controlObj.checklistid('search_list_f_radiolist_tbl_codefactory_modallist');


                    tbl_codefactory_modallist.f_autocomplete = controlObj.text('search_txt_f_autocomplete_tbl_codefactory_modallist');


                    tbl_codefactory_modallist.f_datetimefrom = controlObj.datetime('search_datetime_f_datetime_tbl_codefactory_modallist_datefrom', 'search_datetime_f_datetime_tbl_codefactory_modallist_timefrom'); // datefrom + ' ' + timefrom;
                    tbl_codefactory_modallist.f_datetimeto = controlObj.datetime('search_datetime_f_datetime_tbl_codefactory_modallist_dateto', 'search_datetime_f_datetime_tbl_codefactory_modallist_timeto'); //dateto + ' ' + timeto;


                    tbl_codefactory_modallist.f_slider = controlObj.text('search_txt_f_slider_tbl_codefactory_modallist');


                    tbl_codefactory_modallist.f_textarea = controlObj.text('search_txt_f_textarea_tbl_codefactory_modallist');


                    tbl_codefactory_modallist.f_richtext = controlObj.text('search_txt_f_richtext_tbl_codefactory_modallist');


                    tbl_codefactory_modallist.f_file = controlObj.text('search_txt_f_file_tbl_codefactory_modallist');



                    that._pr_searchcontent.type2 = tbl_codefactory_modallist;
                    break;

            }

            callBackFunction.success();
        }
        catch (ex)
        {
            _blockMessage.show('setSearchModel执行失败。<br/>' + ex.message, 'fail');
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
            var tbl_codefactory_modallist = that._pr_searchcontent.type2;
            var errorMessageHansMap = new hashMap();
            var errorMessagePlacementHansMap = new hashMap();




            if (tbl_codefactory_modallist.f_value1.length > 100)
            {
                errorMessageHansMap.put('search_txt_f_value1_tbl_codefactory_modallist', '长度不能超过<a style="color:red">100</a>');
                errorMessagePlacementHansMap.put('search_txt_f_value1_tbl_codefactory_modallist', 'top');
            }


            if (tbl_codefactory_modallist.f_value2.length > 100)
            {
                errorMessageHansMap.put('search_txt_f_value2_tbl_codefactory_modallist', '长度不能超过<a style="color:red">100</a>');
                errorMessagePlacementHansMap.put('search_txt_f_value2_tbl_codefactory_modallist', 'top');
            }


            if (tbl_codefactory_modallist.f_value3.length > 100)
            {
                errorMessageHansMap.put('search_txt_f_value3_tbl_codefactory_modallist', '长度不能超过<a style="color:red">100</a>');
                errorMessagePlacementHansMap.put('search_txt_f_value3_tbl_codefactory_modallist', 'top');
            }


            if (tbl_codefactory_modallist.f_value4.length > 100)
            {
                errorMessageHansMap.put('search_txt_f_value4_tbl_codefactory_modallist', '长度不能超过<a style="color:red">100</a>');
                errorMessagePlacementHansMap.put('search_txt_f_value4_tbl_codefactory_modallist', 'top');
            }


            if (tbl_codefactory_modallist.f_value5.length > 100)
            {
                errorMessageHansMap.put('search_txt_f_value5_tbl_codefactory_modallist', '长度不能超过<a style="color:red">100</a>');
                errorMessagePlacementHansMap.put('search_txt_f_value5_tbl_codefactory_modallist', 'top');
            }


            if (tbl_codefactory_modallist.f_value6.length > 100)
            {
                errorMessageHansMap.put('search_txt_f_value6_tbl_codefactory_modallist', '长度不能超过<a style="color:red">100</a>');
                errorMessagePlacementHansMap.put('search_txt_f_value6_tbl_codefactory_modallist', 'top');
            }


            if (tbl_codefactory_modallist.f_value7.length > 100)
            {
                errorMessageHansMap.put('search_txt_f_value7_tbl_codefactory_modallist', '长度不能超过<a style="color:red">100</a>');
                errorMessagePlacementHansMap.put('search_txt_f_value7_tbl_codefactory_modallist', 'top');
            }


            if (tbl_codefactory_modallist.f_value8.length > 100)
            {
                errorMessageHansMap.put('search_txt_f_value8_tbl_codefactory_modallist', '长度不能超过<a style="color:red">100</a>');
                errorMessagePlacementHansMap.put('search_txt_f_value8_tbl_codefactory_modallist', 'top');
            }


            if (tbl_codefactory_modallist.f_value9.length > 100)
            {
                errorMessageHansMap.put('search_txt_f_value9_tbl_codefactory_modallist', '长度不能超过<a style="color:red">100</a>');
                errorMessagePlacementHansMap.put('search_txt_f_value9_tbl_codefactory_modallist', 'top');
            }


            if (tbl_codefactory_modallist.f_value10.length > 100)
            {
                errorMessageHansMap.put('search_txt_f_value10_tbl_codefactory_modallist', '长度不能超过<a style="color:red">100</a>');
                errorMessagePlacementHansMap.put('search_txt_f_value10_tbl_codefactory_modallist', 'top');
            }


            if (tbl_codefactory_modallist.f_text1.length >100)
            {
                errorMessageHansMap.put('search_txt_f_text1_tbl_codefactory_modallist', '长度不能超过<a style="color:red">100</a>');
                errorMessagePlacementHansMap.put('search_txt_f_text1_tbl_codefactory_modallist', 'top');
            }


            if (tbl_codefactory_modallist.f_text2.length > 100)
            {
                errorMessageHansMap.put('search_txt_f_text2_tbl_codefactory_modallist', '长度不能超过<a style="color:red">100</a>');
                errorMessagePlacementHansMap.put('search_txt_f_text2_tbl_codefactory_modallist', 'top');
            }


            if (tbl_codefactory_modallist.f_text3.length > 100)
            {
                errorMessageHansMap.put('search_txt_f_text3_tbl_codefactory_modallist', '长度不能超过<a style="color:red">100</a>');
                errorMessagePlacementHansMap.put('search_txt_f_text3_tbl_codefactory_modallist', 'top');
            }


            if (tbl_codefactory_modallist.f_singledropdownlistid.length > 100)
            {
                errorMessageHansMap.put('search_dropdown_f_singledropdownlist_tbl_codefactory_modallist', '长度不能超过<a style="color:red">100</a>');
            }


            if (tbl_codefactory_modallist.f_multidropdownlistid.length > 100)
            {
                errorMessageHansMap.put('search_dropdown_f_multidropdownlist_tbl_codefactory_modallist', '长度不能超过<a style="color:red">100</a>');
            }


            if (tbl_codefactory_modallist.f_itemlistid.length > 100)
            {
                errorMessageHansMap.put('search_list_f_itemlist_tbl_codefactory_modallist', '长度不能超过<a style="color:red">100</a>');
            }


            if (tbl_codefactory_modallist.f_toggle.length > 100)
            {
                errorMessageHansMap.put('search_dropdown_f_toggle_tbl_codefactory_modallist', '长度不能超过<a style="color:red">100</a>');
            }


            if (tbl_codefactory_modallist.f_checklistid.length > 100)
            {
                errorMessageHansMap.put('search_list_f_checklist_tbl_codefactory_modallist', '长度不能超过<a style="color:red">100</a>');
            }


            if (tbl_codefactory_modallist.f_radiolistid.length > 100)
            {
                errorMessageHansMap.put('search_list_f_radiolist_tbl_codefactory_modallist', '长度不能超过<a style="color:red">100</a>');
            }


            if (tbl_codefactory_modallist.f_autocomplete.length > 100)
            {
                errorMessageHansMap.put('search_txt_f_autocomplete_tbl_codefactory_modallist', '长度不能超过<a style="color:red">100</a>');
                errorMessagePlacementHansMap.put('search_txt_f_autocomplete_tbl_codefactory_modallist', 'top');
            }




            if (tbl_codefactory_modallist.f_slider.length > 100)
            {
                errorMessageHansMap.put('search_txt_f_slider_tbl_codefactory_modallist', '长度不能超过<a style="color:red">100</a>');
                errorMessagePlacementHansMap.put('search_txt_f_slider_tbl_codefactory_modallist', 'top');
            }


            if (tbl_codefactory_modallist.f_textarea.length > 100)
            {
                errorMessageHansMap.put('search_txt_f_textarea_tbl_codefactory_modallist', '长度不能超过<a style="color:red">100</a>');
                errorMessagePlacementHansMap.put('search_txt_f_textarea_tbl_codefactory_modallist', 'top');
            }


            if (tbl_codefactory_modallist.f_richtext.length > 100)
            {
                errorMessageHansMap.put('search_txt_f_richtext_tbl_codefactory_modallist', '长度不能超过<a style="color:red">100</a>');
                errorMessagePlacementHansMap.put('search_txt_f_richtext_tbl_codefactory_modallist', 'top');
            }


            if (tbl_codefactory_modallist.f_file.length > 100)
            {
                errorMessageHansMap.put('search_txt_f_file_tbl_codefactory_modallist', '长度不能超过<a style="color:red">100</a>');
                errorMessagePlacementHansMap.put('search_txt_f_file_tbl_codefactory_modallist', 'top');
            }



            if (errorMessageHansMap.keys().length > 0)
            {
                _validateMessage_search.show(errorMessageHansMap, errorMessagePlacementHansMap, false);
                callBackFunction.fail();
            }
            else
            {
                _validateMessage_search.hidden();
                callBackFunction.success();
            }
        }
        catch (ex)
        {
            _blockMessage.show('checkSearchModel执行失败。<br/>' + ex.message, 'fail');
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
                controlObj.text('search_txt_f_value1_tbl_codefactory_modallist', that._pr_searchcontent.type2.f_value1);

                that._pr_searchcontent.type2.f_value2 = '';
                controlObj.text('search_txt_f_value2_tbl_codefactory_modallist', that._pr_searchcontent.type2.f_value2);

                that._pr_searchcontent.type2.f_value3 = '';
                controlObj.text('search_txt_f_value3_tbl_codefactory_modallist', that._pr_searchcontent.type2.f_value3);

                that._pr_searchcontent.type2.f_value4 = '';
                controlObj.text('search_txt_f_value4_tbl_codefactory_modallist', that._pr_searchcontent.type2.f_value4);

                that._pr_searchcontent.type2.f_value5 = '';
                controlObj.text('search_txt_f_value5_tbl_codefactory_modallist', that._pr_searchcontent.type2.f_value5);

                that._pr_searchcontent.type2.f_value6 = '';
                controlObj.text('search_txt_f_value6_tbl_codefactory_modallist', that._pr_searchcontent.type2.f_value6);

                that._pr_searchcontent.type2.f_value7 = '';
                controlObj.text('search_txt_f_value7_tbl_codefactory_modallist', that._pr_searchcontent.type2.f_value7);

                that._pr_searchcontent.type2.f_value8 = '';
                controlObj.text('search_txt_f_value8_tbl_codefactory_modallist', that._pr_searchcontent.type2.f_value8);

                that._pr_searchcontent.type2.f_value9 = '';
                controlObj.text('search_txt_f_value9_tbl_codefactory_modallist', that._pr_searchcontent.type2.f_value9);

                that._pr_searchcontent.type2.f_value10 = '';
                controlObj.text('search_txt_f_value10_tbl_codefactory_modallist', that._pr_searchcontent.type2.f_value10);

                that._pr_searchcontent.type2.f_text1 = '';
                controlObj.text('search_txt_f_text1_tbl_codefactory_modallist', that._pr_searchcontent.type2.f_text1);

                that._pr_searchcontent.type2.f_text2 = '';
                controlObj.text('search_txt_f_text2_tbl_codefactory_modallist', that._pr_searchcontent.type2.f_text2);

                that._pr_searchcontent.type2.f_text3 = '';
                controlObj.text('search_txt_f_text3_tbl_codefactory_modallist', that._pr_searchcontent.type2.f_text3);


                that._pr_searchcontent.type2.f_singledropdownlistid = '';
                controlObj.multidropdownlistid('search_dropdown_f_singledropdownlist_tbl_codefactory_modallist', that._pr_searchcontent.type2.f_singledropdownlistid);


                that._pr_searchcontent.type2.f_multidropdownlistid = '';
                controlObj.multidropdownlistid('search_dropdown_f_multidropdownlist_tbl_codefactory_modallist', that._pr_searchcontent.type2.f_multidropdownlistid);

                that._pr_searchcontent.type2.f_itemlistid = '';

                controlObj.checklistid('search_list_f_itemlist_tbl_codefactory_modallist', that._pr_searchcontent.type2.f_itemlistid);


                that._pr_searchcontent.type2.f_toggle = '';
                controlObj.multidropdownlistid('search_dropdown_f_toggle_tbl_codefactory_modallist', that._pr_searchcontent.type2.f_toggle);

                that._pr_searchcontent.type2.f_checklistid = '';
                controlObj.checklistid('search_list_f_checklist_tbl_codefactory_modallist', that._pr_searchcontent.type2.f_checklistid);

                that._pr_searchcontent.type2.f_radiolistid = '';
                controlObj.checklistid('search_list_f_radiolist_tbl_codefactory_modallist', that._pr_searchcontent.type2.f_radiolistid);

                that._pr_searchcontent.type2.f_autocomplete = '';
                controlObj.text('search_txt_f_autocomplete_tbl_codefactory_modallist', that._pr_searchcontent.type2.f_autocomplete);


                that._pr_searchcontent.type2.f_datetimefrom = ('1900-01-01 00:00:00');
                that._pr_searchcontent.type2.f_datetimeto = ('1900-01-01 00:00:00');

                controlObj.datetime('search_datetime_f_datetime_tbl_codefactory_modallist_datefrom', 'search_datetime_f_datetime_tbl_codefactory_modallist_timefrom', that._pr_searchcontent.type2.f_datetimefrom);
                controlObj.datetime('search_datetime_f_datetime_tbl_codefactory_modallist_dateto', 'search_datetime_f_datetime_tbl_codefactory_modallist_timeto', that._pr_searchcontent.type2.f_datetimeto);


                that._pr_searchcontent.type2.f_slider = '';
                controlObj.text('search_txt_f_slider_tbl_codefactory_modallist', that._pr_searchcontent.type2.f_slider);

                that._pr_searchcontent.type2.f_textarea = '';
                controlObj.text('search_txt_f_textarea_tbl_codefactory_modallist', that._pr_searchcontent.type2.f_textarea);

                that._pr_searchcontent.type2.f_richtext = '';
                controlObj.text('search_txt_f_richtext_tbl_codefactory_modallist', that._pr_searchcontent.type2.f_richtext);

                that._pr_searchcontent.type2.f_file = '';
                controlObj.text('search_txt_f_file_tbl_codefactory_modallist', that._pr_searchcontent.type2.f_file);




                break;
            case "2":
                if (that._pr_searchcontent.type1 == undefined)
                {
                    that._pr_searchcontent.type1 = '';
                }

                $("#txt_command_search_tbl_codefactory_modallist").val('');
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

                                    whereClause += " f_text1 like '%" + vv[i] + "%' or ";

                                    whereClause += " f_text2 like '%" + vv[i] + "%' or ";

                                    whereClause += " f_text3 like '%" + vv[i] + "%' or ";

                                    whereClause += " f_singledropdownlist like '%" + vv[i] + "%' or ";

                                    whereClause += " f_multidropdownlist like '%" + vv[i] + "%' or ";

                                    whereClause += " f_itemlist like '%" + vv[i] + "%' or ";

                                    whereClause += " f_toggle like '%" + vv[i] + "%' or ";

                                    whereClause += " f_checklist like '%" + vv[i] + "%' or ";

                                    whereClause += " f_radiolist like '%" + vv[i] + "%' or ";

                                    whereClause += " f_autocomplete like '%" + vv[i] + "%' or ";


                                    whereClause += " to_char(f_datetime,'yyyy-MM-dd hh24:mi:ss') like '%" + vv[i] + "%' or ";

                                    whereClause += " f_slider like '%" + vv[i] + "%' or ";

                                    whereClause += " f_textarea like '%" + vv[i] + "%' or ";

                                    whereClause += " f_richtext like '%" + vv[i] + "%' or ";

                                    whereClause += " f_file like '%" + vv[i] + "%' or ";

                                    //whereClause += " -- like '%" + vv[i] + "%' or ";

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

                        var tbl_codefactory_modallist = that._pr_searchcontent.type2;



                        if (tbl_codefactory_modallist.f_text1.length > 0)
                        {
                            whereClause += " f_text1 like '%" + tbl_codefactory_modallist.f_text1 + "%' and ";
                        }


                        if (tbl_codefactory_modallist.f_text2.length > 0)
                        {
                            whereClause += " f_text2 like '%" + tbl_codefactory_modallist.f_text2 + "%' and ";
                        }


                        if (tbl_codefactory_modallist.f_text3.length > 0)
                        {
                            whereClause += " f_text3 like '%" + tbl_codefactory_modallist.f_text3 + "%' and ";
                        }


                        if (tbl_codefactory_modallist.f_singledropdownlistid.length > 0)
                        {
                            var elementArray = tbl_codefactory_modallist.f_singledropdownlistid.split(',');
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
                                whereClause += "(('^'||f_singledropdownlistid||'^') like ('%^'||'" + elementArray[i] + "'||'^%')) ";

                            });
                            whereClause += ') and ';
                        }


                        if (tbl_codefactory_modallist.f_multidropdownlistid.length > 0)
                        {
                            var elementArray = tbl_codefactory_modallist.f_multidropdownlistid.split(',');
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
                                whereClause += "(('^'||f_multidropdownlistid||'^') like ('%^'||'" + elementArray[i] + "'||'^%')) ";

                            });
                            whereClause += ') and ';
                        }


                        if (tbl_codefactory_modallist.f_itemlistid.length > 0)
                        {
                            var elementArray = tbl_codefactory_modallist.f_itemlistid.split(',');
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
                                whereClause += "(('^'||f_itemlistid||'^') like ('%^'||'" + elementArray[i] + "'||'^%')) ";

                            });
                            whereClause += ') and ';
                        }


                        if (tbl_codefactory_modallist.f_toggle.length > 0)
                        {
                            var elementArray = tbl_codefactory_modallist.f_toggle.split(',');
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
                                whereClause += "(('^'||f_toggle||'^') like ('%^'||'" + elementArray[i] + "'||'^%')) ";

                            });
                            whereClause += ') and ';
                        }


                        if (tbl_codefactory_modallist.f_checklistid.length > 0)
                        {
                            var elementArray = tbl_codefactory_modallist.f_checklistid.split(',');
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
                                whereClause += "(('^'||f_checklistid||'^') like ('%^'||'" + elementArray[i] + "'||'^%')) ";

                            });
                            whereClause += ') and ';
                        }


                        if (tbl_codefactory_modallist.f_radiolistid.length > 0)
                        {
                            var elementArray = tbl_codefactory_modallist.f_radiolistid.split(',');
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
                                whereClause += "(('^'||f_radiolistid||'^') like ('%^'||'" + elementArray[i] + "'||'^%')) ";

                            });
                            whereClause += ') and ';
                        }


                        if (tbl_codefactory_modallist.f_autocomplete.length > 0)
                        {
                            whereClause += " f_autocomplete like '%" + tbl_codefactory_modallist.f_autocomplete + "%' and ";
                        }


                        if (tbl_codefactory_modallist.f_datetimefrom != '1900-01-01 00:00:00')
                        {
                            whereClause += " f_datetime >= to_date('" + tbl_codefactory_modallist.f_datetimefrom + "','yyyy-MM-dd hh24:mi:ss') and ";
                        }

                        if (tbl_codefactory_modallist.f_datetimeto != '1900-01-01 00:00:00')
                        {
                            whereClause += " f_datetime <= to_date('" + tbl_codefactory_modallist.f_datetimeto + "','yyyy-MM-dd hh24:mi:ss') and ";
                        }


                        if (tbl_codefactory_modallist.f_slider.length > 0)
                        {
                            whereClause += " f_slider like '%" + tbl_codefactory_modallist.f_slider + "%' and ";
                        }


                        if (tbl_codefactory_modallist.f_textarea.length > 0)
                        {
                            whereClause += " f_textarea like '%" + tbl_codefactory_modallist.f_textarea + "%' and ";
                        }


                        if (tbl_codefactory_modallist.f_richtext.length > 0)
                        {
                            whereClause += " f_richtext like '%" + tbl_codefactory_modallist.f_richtext + "%' and ";
                        }


                        if (tbl_codefactory_modallist.f_file.length > 0)
                        {
                            whereClause += " f_file like '%" + tbl_codefactory_modallist.f_file + "%' and ";
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
            // ul_gridselect  cc-badge-ul  cc-badge-p  cc-badge-a
            $('#btn_command_clearselect_tbl_codefactory_modallist').addClass('hidden');

        }
        else
        {
            $('#btn_command_clearselect_tbl_codefactory_modallist').removeClass('hidden');
            var allcount = that._pr_gridselectids.split('^').length;
            var currentcount = $('#table_grid_tbl_codefactory_modallist').bootstrapTable('getSelections').length;
            $('#btn_command_clearselect_tbl_codefactory_modallist .cc-badge-p').html(currentcount + '/' + allcount);
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
            //单选下拉列表--采用复选模式
            var resultArray = _baseCodeHashMap.get('servicecode_0108');
            var toggleArray = [{ id: 'true', text: '开' }, { id: 'false', text: '关' }];
            var contentArray = _baseCodeHashMap.get('servicecode_array');

            controlObj.placeholder("detail_txt_f_text3_tbl_codefactory_modallist", "9-aaa.999");

            controlObj.singledropdownlistinit('detail_dropdown_f_singledropdownlist_tbl_codefactory_modallist', resultArray, detail_dropdown_f_singledropdownlist_onchange);

            controlObj.multidropdownlistinit('detail_dropdown_f_multidropdownlist_tbl_codefactory_modallist', resultArray, detail_dropdown_f_multidropdownlist_onchange);

            controlObj.itemlistinit('detail_list_f_itemlist_tbl_codefactory_modallist', resultArray, detail_list_f_itemlist_onclick);

            controlObj.toggleinit('detail_ck_f_toggle_tbl_codefactory_modallist', detail_ck_f_toggle_onswitchchange);

            controlObj.checklistinit('detail_list_f_checklist_tbl_codefactory_modallist', resultArray, detail_list_f_checklist_onclick);

            controlObj.radiolistinit('detail_list_f_radiolist_tbl_codefactory_modallist', resultArray, detail_list_f_radiolist_onclick);

            controlObj.autocompleteinit('detail_txt_f_autocomplete_tbl_codefactory_modallist', contentArray, detail_txt_f_autocomplete_onselected);

            controlObj.datetimeinit('detail_datetime_f_datetime_tbl_codefactory_modallist_date', 'detail_datetime_f_datetime_tbl_codefactory_modallist_time', detail_datetime_f_datetime_date_onchange, detail_datetime_f_datetime_time_onchange);

            controlObj.sliderinit('detail_slider_f_slider_tbl_codefactory_modallist', detail_slider_f_slider_onchange);

            controlObj.richtextinit('detail_txt_f_richtext_tbl_codefactory_modallist', detail_txt_f_richtext_onchange);

            controlObj.fileuploaderinit('detail_file_f_file_tbl_codefactory_modallist', {}, detail_file_f_file_onchange);

            //模态窗口
            $('#div_detail_modal_tbl_codefactory_modallist').modal({
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
    *  方法:bindDeitalModel
    *  参数:callBackFunction
    *  根据传入的tbl_codefactory_modallist，绑定DetailModel
    */
    bindDeitalModel = function (tbl_codefactory_modallist, callBackFunction)
    {
        controlObj.text('detail_txt_f_value1_tbl_codefactory_modallist', tbl_codefactory_modallist.f_value1);

        controlObj.text('detail_txt_f_value2_tbl_codefactory_modallist', tbl_codefactory_modallist.f_value2);

        controlObj.text('detail_txt_f_value3_tbl_codefactory_modallist', tbl_codefactory_modallist.f_value3);

        controlObj.text('detail_txt_f_value4_tbl_codefactory_modallist', tbl_codefactory_modallist.f_value4);

        controlObj.text('detail_txt_f_value5_tbl_codefactory_modallist', tbl_codefactory_modallist.f_value5);

        controlObj.text('detail_txt_f_value6_tbl_codefactory_modallist', tbl_codefactory_modallist.f_value6);

        controlObj.text('detail_txt_f_value7_tbl_codefactory_modallist', tbl_codefactory_modallist.f_value7);

        controlObj.text('detail_txt_f_value8_tbl_codefactory_modallist', tbl_codefactory_modallist.f_value8);

        controlObj.text('detail_txt_f_value9_tbl_codefactory_modallist', tbl_codefactory_modallist.f_value9);

        controlObj.text('detail_txt_f_value10_tbl_codefactory_modallist', tbl_codefactory_modallist.f_value10);

        controlObj.text('detail_txt_f_text1_tbl_codefactory_modallist', tbl_codefactory_modallist.f_text1);

        controlObj.text('detail_txt_f_text2_tbl_codefactory_modallist', tbl_codefactory_modallist.f_text2);

        controlObj.text('detail_txt_f_text3_tbl_codefactory_modallist', tbl_codefactory_modallist.f_text3);

        controlObj.singledropdownlistid('detail_dropdown_f_singledropdownlist_tbl_codefactory_modallist', tbl_codefactory_modallist.f_singledropdownlistid);

        controlObj.multidropdownlistid('detail_dropdown_f_multidropdownlist_tbl_codefactory_modallist', tbl_codefactory_modallist.f_multidropdownlistid);


        controlObj.itemlistid('detail_list_f_itemlist_tbl_codefactory_modallist', tbl_codefactory_modallist.f_itemlistid);

        controlObj.toggle('detail_ck_f_toggle_tbl_codefactory_modallist', tbl_codefactory_modallist.f_toggle);


        controlObj.checklistid('detail_list_f_checklist_tbl_codefactory_modallist', tbl_codefactory_modallist.f_checklistid);


        controlObj.radiolistid('detail_list_f_radiolist_tbl_codefactory_modallist', tbl_codefactory_modallist.f_radiolistid);

        controlObj.text('detail_txt_f_autocomplete_tbl_codefactory_modallist', tbl_codefactory_modallist.f_autocomplete);


        controlObj.datetime('detail_datetime_f_datetime_tbl_codefactory_modallist_date', 'detail_datetime_f_datetime_tbl_codefactory_modallist_time', tbl_codefactory_modallist.f_datetime);

        controlObj.slider('detail_slider_f_slider_tbl_codefactory_modallist', tbl_codefactory_modallist.f_slider);

        controlObj.text('detail_txt_f_textarea_tbl_codefactory_modallist', tbl_codefactory_modallist.f_textarea.returnStringRN());


        controlObj.richtext('detail_txt_f_richtext_tbl_codefactory_modallist', tbl_codefactory_modallist.f_richtext);

        controlObj.fileuploaderbind('detail_file_f_file_tbl_codefactory_modallist', tbl_codefactory_modallist.f_file);

        callBackFunction.success();
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
            //高级查询
            var tbl_codefactory_modallist = new Object();

            tbl_codefactory_modallist.f_value1 = controlObj.text('detail_txt_f_value1_tbl_codefactory_modallist');

            tbl_codefactory_modallist.f_value2 = controlObj.text('detail_txt_f_value2_tbl_codefactory_modallist');

            tbl_codefactory_modallist.f_value3 = controlObj.text('detail_txt_f_value3_tbl_codefactory_modallist');

            tbl_codefactory_modallist.f_value4 = controlObj.text('detail_txt_f_value4_tbl_codefactory_modallist');

            tbl_codefactory_modallist.f_value5 = controlObj.text('detail_txt_f_value5_tbl_codefactory_modallist');

            tbl_codefactory_modallist.f_value6 = controlObj.text('detail_txt_f_value6_tbl_codefactory_modallist');

            tbl_codefactory_modallist.f_value7 = controlObj.text('detail_txt_f_value7_tbl_codefactory_modallist');

            tbl_codefactory_modallist.f_value8 = controlObj.text('detail_txt_f_value8_tbl_codefactory_modallist');

            tbl_codefactory_modallist.f_value9 = controlObj.text('detail_txt_f_value9_tbl_codefactory_modallist');

            tbl_codefactory_modallist.f_value10 = controlObj.text('detail_txt_f_value10_tbl_codefactory_modallist');

            tbl_codefactory_modallist.f_text1 = controlObj.text('detail_txt_f_text1_tbl_codefactory_modallist');

            tbl_codefactory_modallist.f_text2 = controlObj.text('detail_txt_f_text2_tbl_codefactory_modallist');

            tbl_codefactory_modallist.f_text3 = controlObj.text('detail_txt_f_text3_tbl_codefactory_modallist');

            tbl_codefactory_modallist.f_singledropdownlist = controlObj.singledropdownlist('detail_dropdown_f_singledropdownlist_tbl_codefactory_modallist');
            tbl_codefactory_modallist.f_singledropdownlistid = controlObj.singledropdownlistid('detail_dropdown_f_singledropdownlist_tbl_codefactory_modallist');


            tbl_codefactory_modallist.f_multidropdownlist = controlObj.multidropdownlist('detail_dropdown_f_multidropdownlist_tbl_codefactory_modallist');
            tbl_codefactory_modallist.f_multidropdownlistid = controlObj.multidropdownlistid('detail_dropdown_f_multidropdownlist_tbl_codefactory_modallist');


            tbl_codefactory_modallist.f_itemlist = controlObj.itemlist('detail_list_f_itemlist_tbl_codefactory_modallist');
            tbl_codefactory_modallist.f_itemlistid = controlObj.itemlistid('detail_list_f_itemlist_tbl_codefactory_modallist');


            tbl_codefactory_modallist.f_toggle = controlObj.toggle('detail_ck_f_toggle_tbl_codefactory_modallist');


            tbl_codefactory_modallist.f_checklist = controlObj.checklist('detail_list_f_checklist_tbl_codefactory_modallist');
            tbl_codefactory_modallist.f_checklistid = controlObj.checklistid('detail_list_f_checklist_tbl_codefactory_modallist');


            tbl_codefactory_modallist.f_radiolist = controlObj.radiolist('detail_list_f_radiolist_tbl_codefactory_modallist');
            tbl_codefactory_modallist.f_radiolistid = controlObj.radiolistid('detail_list_f_radiolist_tbl_codefactory_modallist');

            tbl_codefactory_modallist.f_autocomplete = controlObj.text('detail_txt_f_autocomplete_tbl_codefactory_modallist');

            tbl_codefactory_modallist.f_datetime = controlObj.datetime('detail_datetime_f_datetime_tbl_codefactory_modallist_date', 'detail_datetime_f_datetime_tbl_codefactory_modallist_time');

            tbl_codefactory_modallist.f_slider = controlObj.slider('detail_slider_f_slider_tbl_codefactory_modallist');

            tbl_codefactory_modallist.f_textarea = controlObj.text('detail_txt_f_textarea_tbl_codefactory_modallist');


            tbl_codefactory_modallist.f_richtext = controlObj.richtext('detail_txt_f_richtext_tbl_codefactory_modallist');

            tbl_codefactory_modallist.f_file = controlObj.fileuploaderid('detail_file_f_file_tbl_codefactory_modallist');



            callBackFunction.success(tbl_codefactory_modallist);
        }
        catch (ex)
        {
            _blockMessage.show('setSearchModel执行失败。<br/>' + ex.message, 'fail');
        }
    },

             /* 
    *  
    *  方法:checkDetailModel
    *  参数:tbl_codefactory_modallist, callBackFunction
    *  根据传入的数据对象，校验数据内容_validateMessage_detail
    */
    checkDetailModel = function (tbl_codefactory_modallist, callBackFunction)
    {
        try
        {
            var errorMessageHansMap = new hashMap();
            var errorMessagePlacementHansMap = new hashMap();


            if (tbl_codefactory_modallist.f_value1.length > 100)
            {
                errorMessageHansMap.put('detail_txt_f_value1_tbl_codefactory_modallist', '长度不能超过<a style="color:red">100</a>');
                errorMessagePlacementHansMap.put('detail_txt_f_value1_tbl_codefactory_modallist', 'top');
            }


            if (tbl_codefactory_modallist.f_value2.length > 100)
            {
                errorMessageHansMap.put('detail_txt_f_value2_tbl_codefactory_modallist', '长度不能超过<a style="color:red">100</a>');
                errorMessagePlacementHansMap.put('detail_txt_f_value2_tbl_codefactory_modallist', 'top');
            }


            if (tbl_codefactory_modallist.f_value3.length > 100)
            {
                errorMessageHansMap.put('detail_txt_f_value3_tbl_codefactory_modallist', '长度不能超过<a style="color:red">100</a>');
                errorMessagePlacementHansMap.put('detail_txt_f_value3_tbl_codefactory_modallist', 'top');
            }


            if (tbl_codefactory_modallist.f_value4.length > 100)
            {
                errorMessageHansMap.put('detail_txt_f_value4_tbl_codefactory_modallist', '长度不能超过<a style="color:red">100</a>');
                errorMessagePlacementHansMap.put('detail_txt_f_value4_tbl_codefactory_modallist', 'top');
            }


            if (tbl_codefactory_modallist.f_value5.length > 100)
            {
                errorMessageHansMap.put('detail_txt_f_value5_tbl_codefactory_modallist', '长度不能超过<a style="color:red">100</a>');
                errorMessagePlacementHansMap.put('detail_txt_f_value5_tbl_codefactory_modallist', 'top');
            }


            if (tbl_codefactory_modallist.f_value6.length > 100)
            {
                errorMessageHansMap.put('detail_txt_f_value6_tbl_codefactory_modallist', '长度不能超过<a style="color:red">100</a>');
                errorMessagePlacementHansMap.put('detail_txt_f_value6_tbl_codefactory_modallist', 'top');
            }


            if (tbl_codefactory_modallist.f_value7.length > 100)
            {
                errorMessageHansMap.put('detail_txt_f_value7_tbl_codefactory_modallist', '长度不能超过<a style="color:red">100</a>');
                errorMessagePlacementHansMap.put('detail_txt_f_value7_tbl_codefactory_modallist', 'top');
            }


            if (tbl_codefactory_modallist.f_value8.length > 100)
            {
                errorMessageHansMap.put('detail_txt_f_value8_tbl_codefactory_modallist', '长度不能超过<a style="color:red">100</a>');
                errorMessagePlacementHansMap.put('detail_txt_f_value8_tbl_codefactory_modallist', 'top');
            }


            if (tbl_codefactory_modallist.f_value9.length > 100)
            {
                errorMessageHansMap.put('detail_txt_f_value9_tbl_codefactory_modallist', '长度不能超过<a style="color:red">100</a>');
                errorMessagePlacementHansMap.put('detail_txt_f_value9_tbl_codefactory_modallist', 'top');
            }


            if (tbl_codefactory_modallist.f_value10.length > 100)
            {
                errorMessageHansMap.put('detail_txt_f_value10_tbl_codefactory_modallist', '长度不能超过<a style="color:red">100</a>');
                errorMessagePlacementHansMap.put('detail_txt_f_value10_tbl_codefactory_modallist', 'top');
            }


            if (tbl_codefactory_modallist.f_text1.length >100)
            {
                errorMessageHansMap.put('detail_txt_f_text1_tbl_codefactory_modallist', '长度不能超过<a style="color:red">100</a>');
                errorMessagePlacementHansMap.put('detail_txt_f_text1_tbl_codefactory_modallist', 'top');
            }

            if (tbl_codefactory_modallist.f_text2.length > 100)
            {
                errorMessageHansMap.put('detail_txt_f_text2_tbl_codefactory_modallist', '长度不能超过<a style="color:red">100</a>');
            }

            if (tbl_codefactory_modallist.f_text3.length > 100)
            {
                errorMessageHansMap.put('detail_txt_f_text3_tbl_codefactory_modallist', '长度不能超过<a style="color:red">100</a>');
            }

            if (tbl_codefactory_modallist.f_singledropdownlist.length > 100 || tbl_codefactory_modallist.f_singledropdownlistid.length > 100)
            {
                errorMessageHansMap.put('detail_dropdown_f_singledropdownlist_tbl_codefactory_modallist', '长度不能超过<a style="color:red">100</a>');
            }


            if (tbl_codefactory_modallist.f_multidropdownlist.length > 100 || tbl_codefactory_modallist.f_multidropdownlistid.length > 100)
            {
                errorMessageHansMap.put('detail_dropdown_f_multidropdownlist_tbl_codefactory_modallist', '长度不能超过<a style="color:red">100</a>');
            }


            if (tbl_codefactory_modallist.f_itemlist.length > 100 || tbl_codefactory_modallist.f_itemlistid.length > 100)
            {
                errorMessageHansMap.put('detail_list_f_itemlist_tbl_codefactory_modallist', '长度不能超过<a style="color:red">100</a>');
            }




            if (tbl_codefactory_modallist.f_checklist.length > 100 || tbl_codefactory_modallist.f_checklistid.length > 100)
            {
                errorMessageHansMap.put('detail_list_f_checklist_tbl_codefactory_modallist', '长度不能超过<a style="color:red">100</a>');
            }


            if (tbl_codefactory_modallist.f_radiolist.length > 100 || tbl_codefactory_modallist.f_radiolistid.length > 100)
            {
                errorMessageHansMap.put('detail_list_f_radiolist_tbl_codefactory_modallist', '长度不能超过<a style="color:red">100</a>');
            }

            if (tbl_codefactory_modallist.f_autocomplete.length > 100)
            {
                errorMessageHansMap.put('detail_txt_f_autocomplete_tbl_codefactory_modallist', '长度不能超过<a style="color:red">100</a>');
            }



            if (tbl_codefactory_modallist.f_slider.length > 100)
            {
                errorMessageHansMap.put('detail_slider_f_slider_tbl_codefactory_modallist', '长度不能超过<a style="color:red">100</a>');
            }

            if (tbl_codefactory_modallist.f_textarea.length > 4000)
            {
                errorMessageHansMap.put('detail_txt_f_textarea_tbl_codefactory_modallist', '长度不能超过<a style="color:red">4000</a>');
            }



            if (tbl_codefactory_modallist.f_file.length > 100)
            {
                errorMessageHansMap.put('detail_file_f_file_tbl_codefactory_modallist', '长度不能超过<a style="color:red">100</a>');
            }




            if (errorMessageHansMap.keys().length > 0)
            {
                _validateMessage_detail.show(errorMessageHansMap, errorMessagePlacementHansMap, false);
                callBackFunction.fail();
            }
            else
            {
                _validateMessage_detail.hidden();
                callBackFunction.success(tbl_codefactory_modallist);
            }
        }
        catch (ex)
        {
            _blockMessage.show('checkDetailModel执行失败。<br/>' + ex.message, 'fail');
        }
    },

                 /* 
    *  
    *  方法:clearDetailModel
    *  参数:tbl_codefactory_modallist
    *  清空数据对象
    */
    clearDetailModel = function (tbl_codefactory_modallist)
    {




        tbl_codefactory_modallist.f_value1 = '';
        controlObj.text('detail_txt_f_value1_tbl_codefactory_modallist', tbl_codefactory_modallist.f_value1);




        tbl_codefactory_modallist.f_value2 = '';
        controlObj.text('detail_txt_f_value2_tbl_codefactory_modallist', tbl_codefactory_modallist.f_value2);




        tbl_codefactory_modallist.f_value3 = '';
        controlObj.text('detail_txt_f_value3_tbl_codefactory_modallist', tbl_codefactory_modallist.f_value3);




        tbl_codefactory_modallist.f_value4 = '';
        controlObj.text('detail_txt_f_value4_tbl_codefactory_modallist', tbl_codefactory_modallist.f_value4);




        tbl_codefactory_modallist.f_value5 = '';
        controlObj.text('detail_txt_f_value5_tbl_codefactory_modallist', tbl_codefactory_modallist.f_value5);




        tbl_codefactory_modallist.f_value6 = '';
        controlObj.text('detail_txt_f_value6_tbl_codefactory_modallist', tbl_codefactory_modallist.f_value6);




        tbl_codefactory_modallist.f_value7 = '';
        controlObj.text('detail_txt_f_value7_tbl_codefactory_modallist', tbl_codefactory_modallist.f_value7);




        tbl_codefactory_modallist.f_value8 = '';
        controlObj.text('detail_txt_f_value8_tbl_codefactory_modallist', tbl_codefactory_modallist.f_value8);




        tbl_codefactory_modallist.f_value9 = '';
        controlObj.text('detail_txt_f_value9_tbl_codefactory_modallist', tbl_codefactory_modallist.f_value9);




        tbl_codefactory_modallist.f_value10 = '';
        controlObj.text('detail_txt_f_value10_tbl_codefactory_modallist', tbl_codefactory_modallist.f_value10);




        tbl_codefactory_modallist.f_text1 = '';
        controlObj.text('detail_txt_f_text1_tbl_codefactory_modallist', tbl_codefactory_modallist.f_text1);




        tbl_codefactory_modallist.f_text2 = '';
        controlObj.text('detail_txt_f_text2_tbl_codefactory_modallist', tbl_codefactory_modallist.f_text2);




        tbl_codefactory_modallist.f_text3 = '';
        controlObj.text('detail_txt_f_text3_tbl_codefactory_modallist', tbl_codefactory_modallist.f_text3);



        tbl_codefactory_modallist.f_singledropdownlistid = '';
        controlObj.multidropdownlistid('detail_dropdown_f_singledropdownlist_tbl_codefactory_modallist', tbl_codefactory_modallist.f_singledropdownlistid);



        tbl_codefactory_modallist.f_multidropdownlistid = '';
        controlObj.multidropdownlistid('detail_dropdown_f_multidropdownlist_tbl_codefactory_modallist', tbl_codefactory_modallist.f_multidropdownlistid);


        tbl_codefactory_modallist.f_itemlistid = '';

        controlObj.itemlistid('detail_list_f_itemlist_tbl_codefactory_modallist', tbl_codefactory_modallist.f_itemlistid);



        tbl_codefactory_modallist.f_toggle = '';
        controlObj.multidropdownlistid('detail_dropdown_f_toggle_tbl_codefactory_modallist', tbl_codefactory_modallist.f_toggle);


        tbl_codefactory_modallist.f_checklistid = '';
        controlObj.checklistid('detail_list_f_checklist_tbl_codefactory_modallist', tbl_codefactory_modallist.f_checklistid);


        tbl_codefactory_modallist.f_radiolistid = '';
        controlObj.radiolistid('detail_list_f_radiolist_tbl_codefactory_modallist', tbl_codefactory_modallist.f_radiolistid);




        tbl_codefactory_modallist.f_autocomplete = '';
        controlObj.text('detail_txt_f_autocomplete_tbl_codefactory_modallist', tbl_codefactory_modallist.f_autocomplete);



        tbl_codefactory_modallist.f_datetime = ('1900-01-01 00:00:00');
        controlObj.datetime('detail_datetime_f_datetime_tbl_codefactory_modallist_date', 'detail_datetime_f_datetime_tbl_codefactory_modallist_time', tbl_codefactory_modallist.f_datetime);




        tbl_codefactory_modallist.f_slider = '';
        controlObj.text('detail_txt_f_slider_tbl_codefactory_modallist', tbl_codefactory_modallist.f_slider);




        tbl_codefactory_modallist.f_textarea = '';
        controlObj.text('detail_txt_f_textarea_tbl_codefactory_modallist', tbl_codefactory_modallist.f_textarea);




        tbl_codefactory_modallist.f_richtext = '';
        controlObj.text('detail_txt_f_richtext_tbl_codefactory_modallist', tbl_codefactory_modallist.f_richtext);




        tbl_codefactory_modallist.f_file = '';
        controlObj.text('detail_txt_f_file_tbl_codefactory_modallist', tbl_codefactory_modallist.f_file);




    },

    //=============================数据操作===================================
        /* 
    *  
    *  方法:getDetailData
    *  参数:callBackFunction
    *  从数据库获取数据，根据_pr_sys_id ，返回数据对象
    */
    getDetailData = function (callBackFunction)
    {

        var whereClause = ' sys_id = \'' + _sys_id + '\'';
        var orderByString = ' sys_id desc';
        var columnsString = 'sys_id^f_value1^f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^f_text1^f_text2^f_text3^f_singledropdownlist^f_singledropdownlistid^f_multidropdownlist^f_multidropdownlistid^f_itemlist^f_itemlistid^f_toggle^f_checklist^f_checklistid^f_radiolist^f_radiolistid^f_autocomplete^f_datetime^f_slider^f_textarea^f_richtext^f_file^sys_lastedituserid^sys_lasteditusername^sys_lasteditdate';

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
    *  参数:tbl_codefactory_modallist, callbackFunction
    *  根据传入的数据对象，更新数据
    */
    updateDetailData = function (tbl_codefactory_modallist, callbackFunction)
    {
        var d = new Date();
        var columns = 'sys_id^f_value1^f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^f_text1^f_text2^f_text3^f_singledropdownlist^f_singledropdownlistid^f_multidropdownlist^f_multidropdownlistid^f_itemlist^f_itemlistid^f_toggle^f_checklist^f_checklistid^f_radiolist^f_radiolistid^f_autocomplete^f_datetime^f_slider^f_textarea^f_richtext^f_file^sys_lastedituserid^sys_lasteditusername^sys_lasteditdate';
        var json = {
            sys_id: _sys_id,


            f_value1: tbl_codefactory_modallist.f_value1,

            f_value2: tbl_codefactory_modallist.f_value2,

            f_value3: tbl_codefactory_modallist.f_value3,

            f_value4: tbl_codefactory_modallist.f_value4,

            f_value5: tbl_codefactory_modallist.f_value5,

            f_value6: tbl_codefactory_modallist.f_value6,

            f_value7: tbl_codefactory_modallist.f_value7,

            f_value8: tbl_codefactory_modallist.f_value8,

            f_value9: tbl_codefactory_modallist.f_value9,

            f_value10: tbl_codefactory_modallist.f_value10,

            f_text1: tbl_codefactory_modallist.f_text1,

            f_text2: tbl_codefactory_modallist.f_text2,


            f_text3: tbl_codefactory_modallist.f_text3,

            f_singledropdownlist: tbl_codefactory_modallist.f_singledropdownlist,
            f_singledropdownlistid: tbl_codefactory_modallist.f_singledropdownlistid,

            f_multidropdownlist: tbl_codefactory_modallist.f_multidropdownlist,
            f_multidropdownlistid: tbl_codefactory_modallist.f_multidropdownlistid,

            f_itemlist: tbl_codefactory_modallist.f_itemlist,
            f_itemlistid: tbl_codefactory_modallist.f_itemlistid,

            f_toggle: tbl_codefactory_modallist.f_toggle,

            f_checklist: tbl_codefactory_modallist.f_checklist,
            f_checklistid: tbl_codefactory_modallist.f_checklistid,

            f_radiolist: tbl_codefactory_modallist.f_radiolist,
            f_radiolistid: tbl_codefactory_modallist.f_radiolistid,


            f_autocomplete: tbl_codefactory_modallist.f_autocomplete,

            f_datetime: tbl_codefactory_modallist.f_datetime,

            f_slider: tbl_codefactory_modallist.f_slider,

            f_textarea: tbl_codefactory_modallist.f_textarea.formatStringRN(),

            f_richtext: tbl_codefactory_modallist.f_richtext,

            f_file: tbl_codefactory_modallist.f_file,



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
                callbackFunction.success(tbl_codefactory_modallist);
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

        //=============================控件事件===================================

            /* 
    *  
    *  方法:detail_dropdown_f_singledropdownlist_onchange
    *  参数:changeEventParameter
    * 
    */
    detail_dropdown_f_singledropdownlist_onchange = function (changeEventParameter)
    {
        var cc = _resultMessage.message();
        cc += '<br/>';
        // //;
        // val: e.val, added: e.added, removed: e.removed
        var isloadchild = false;
        if (changeEventParameter.removed == undefined || changeEventParameter.added == undefined)
        {
            isloadchild = true;
        }
        else if (changeEventParameter.added.id != changeEventParameter.removed.id)
        {
            isloadchild = true;
        }
        else
        {
            isloadchild = false;
        }
        if (isloadchild)
        {
            cc += '单选下拉列表' + changeEventParameter.val;
        }
        else
        {
            cc += '单选下拉列表' + '无变化';
        }
        _resultMessage.message(cc);
    },

                /* 
    *  
    *  方法:detail_dropdown_f_multidropdownlist_onchange
    *  参数:changeEventParameter
    * 
    */
    detail_dropdown_f_multidropdownlist_onchange = function (changeEventParameter)
    {
        var cc = _resultMessage.message();
        cc += '<br/>';
        var isloadchild = false;
        if (changeEventParameter.removed == undefined || changeEventParameter.added == undefined)
        {
            isloadchild = true;
        }
        else if (changeEventParameter.added.id != changeEventParameter.removed.id)
        {
            isloadchild = true;
        }
        else
        {
            isloadchild = false;
        }
        if (isloadchild)
        {
            cc += '复选下拉列表' + changeEventParameter.val;
        }
        else
        {

            cc += '复选下拉列表' + '无变化';
        }
        _resultMessage.message(cc);
    },

                /* 
    *  
    *  方法:detail_list_f_itemlist_onclick
    *  参数:e
    * 
    */
    detail_list_f_itemlist_onclick = function (e)
    {
        var cc = _resultMessage.message();
        cc += '<br/>';
        cc += 'listbox' + controlObj.itemlist('detail_list_f_itemlist_tbl_codefactory_modallist');
        _resultMessage.message(cc);
    },

                /* 
    *  
    *  方法:detail_ck_f_toggle_onswitchchange
    *  参数:event, state
    * 
    */
    detail_ck_f_toggle_onswitchchange = function (event, state)
    {
        var cc = _resultMessage.message();
        cc += '<br/>';
        if (state)
        {
            cc += '是否按钮' + '开';
        }
        else
        {
            cc += '是否按钮' + '关';
        }
        _resultMessage.message(cc);
    },

                /* 
    *  
    *  方法:detail_list_f_checklist_onclick
    *  参数:e
    * 
    */
    detail_list_f_checklist_onclick = function (e)
    {
        var cc = _resultMessage.message();
        cc += '<br/>';
        cc += '复选框列表' + controlObj.checklist('detail_list_f_checklist_tbl_codefactory_modallist');
        _resultMessage.message(cc);
    },

                /* 
    *  
    *  方法:detail_list_f_radiolist_onclick
    *  参数:e
    * 
    */
    detail_list_f_radiolist_onclick = function (e)
    {
        var cc = _resultMessage.message();
        cc += '<br/>';
        cc += '单选框列表' + controlObj.radiolist('detail_list_f_radiolist_tbl_codefactory_modallist');
        _resultMessage.message(cc);
    },

                /* 
    *  
    *  方法:detail_txt_f_autocomplete_onselected
    *  参数:
    * 
    */
    detail_txt_f_autocomplete_onselected = function ()
    {
        var cc = _resultMessage.message();
        cc += '<br/>';
        cc += '自动完成' + controlObj.text('detail_txt_f_autocomplete_tbl_codefactory_modallist');
        _resultMessage.message(cc);
    },

                /* 
    *  
    *  方法:detail_datetime_f_datetime_time_onchange
    *  参数:e
    * 
    */
    detail_datetime_f_datetime_time_onchange = function (e)
    {
        var cc = _resultMessage.message();
        cc += '<br/>';
        cc += '日期和时间' + e.time.value;
        _resultMessage.message(cc);

    },

                /* 
    *  
    *  方法:detail_datetime_f_datetime_date_onchange
    *  参数:ev
    * 
    */
    detail_datetime_f_datetime_date_onchange = function (ev)
    {
        var ddd = new Date(ev.date.valueOf());

        var cc = _resultMessage.message();
        cc += '<br/>';
        cc += '日期和时间' + ddd.Format('yyyy-MM-dd');
        _resultMessage.message(cc);
    },

                /* 
    *  
    *  方法:detail_slider_f_slider_onchange
    *  参数:
    * 
    */
    detail_slider_f_slider_onchange = function ()
    {
        var cc = _resultMessage.message();
        cc += '<br/>';
        cc += '滑动条' + controlObj.slider('detail_slider_f_slider_tbl_codefactory_modallist');
        _resultMessage.message(cc);
    },

                /* 
    *  
    *  方法:detail_txt_f_richtext_onchange
    *  参数:contents, $editable
    * 
    */
    detail_txt_f_richtext_onchange = function (contents, $editable)
    {
        var cc = _resultMessage.message();
        cc += '<br/>';
        cc += '富文本框' + contents;
        _resultMessage.message(cc);
    },

                /* 
    *  
    *  方法:detail_file_f_file_onchange
    *  参数:
    * 
    */
    detail_file_f_file_onchange = function ()
    {
        var cc = _resultMessage.message();
        cc += '<br/>';
        cc += '文件全部上传完成';
        _resultMessage.message(cc);
    }

    ;

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


        //=================================================================================
        //                                      公有方法 
        //=================================================================================

        init: function ( )
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
                                                that.bindGrid({
                                                    success: function ()
                                                    {
                                                        _validateMessage_search = new validateMessage('btn_search_modal_search_tbl_codefactory_modallist');
                                                        _validateMessage_detail = new validateMessage('btn_detail_modal_save_tbl_codefactory_modallist');

                                                        _ladda_btn_command_new = Ladda.create('btn_command_new_tbl_codefactory_modallist');
                                                        _ladda_btn_command_delete = Ladda.create('btn_command_delete_tbl_codefactory_modallist');

                                                       

                                                        _blockMessage.hidden();
                                                        
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
        // ---------------------------------grid------------------------------------------
        //---------------------------------------------------------------------------------

        /* 
*  
*  方法:bindGrid
*  参数:callBackFunction
*  根据_whereClauseString，_pageSize，_pr_gridpageindex绑定数据
*/
        bindGrid: function (callBackFunction)
        {
            setTimeout(function ()
            {
                var whereClause = _whereClauseString;
                var orderByString = ' sys_id desc';
                var columnsString = 'f_value1^f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^f_text1^f_text2^f_text3^f_singledropdownlist^f_multidropdownlist^f_itemlist^f_toggle^f_checklist^f_radiolist^f_autocomplete^f_datetime^f_slider^f_textarea^f_richtext^f_file^sys_id';

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
                        $('#table_grid_tbl_codefactory_modallist').bootstrapTable("loadJson", messageJson);
                        gridSelectedChange();
                        if (callBackFunction != undefined && callBackFunction != null)
                        {
                            callBackFunction.success();
                        }
                    },
                    fail: function (message)
                    {
                        _blockMessage.show('that.bindGrid执行失败<br/>' + message, 'fail');
                    }
                });
            }, 0);
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
            var d = new Date();
            var json = {
                f_file: controlObj.fileuploadernewfileid(),
                sys_delflag: "0",
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
            };
            doAjaxFunction(_serviceUrl, 'Add', data, {
                success: function (result)
                {
                    _ladda_btn_command_new.stop();
                    _sys_id = result;
                    getDetailData({
                        success: function (tbl_codefactory_modallist)
                        {

                            $('#div_detail_modal_tbl_codefactory_modallist').modal('show');

                            bindDeitalModel(tbl_codefactory_modallist, {
                                success: function ()
                                {

                                }
                            });
                        }
                    });

                },
                fail: function (message)
                {
                    _alertMessage.show('新建数据执行失败<br/>' + message, 'fail');
                    _ladda_btn_command_new.stop();
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
                var currentcount = $('#table_grid_tbl_codefactory_modallist').bootstrapTable('getSelections').length;
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
                                        that.bindGrid({
                                            success: function ()
                                            {
                                                _ladda_btn_command_delete.stop();
                                            }
                                        });

                                    },
                                    fail: function (message)
                                    {
                                        _alertMessage.show('数据删除完成，获取数据条数失败<br/>' + message, 'fail');
                                        _ladda_btn_command_delete.stop();
                                    }
                                });
                            },
                            fail: function (message)
                            {
                                _alertMessage.show('数据删除失败<br/>' + message, 'fail');
                                _ladda_btn_command_delete.stop();
                            }
                        });
                    },
                    cancle: function ()
                    {
                        _alertMessage.show('操作已取消', 'success', 1000);
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
            $('#table_grid_tbl_codefactory_modallist').bootstrapTable('uncheckAll');
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
                                        that.bindGrid();
                                    }
                                });
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
            $('#btn_command_search_tbl_codefactory_modallist').html('简单查询');
            $('#txt_command_search_tbl_codefactory_modallist').removeAttr('disabled');
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
            $('#btn_command_search_tbl_codefactory_modallist').html('高级查询');
            $('#txt_command_search_tbl_codefactory_modallist').attr('disabled', 'disabled');

            $('#div_search_modal_tbl_codefactory_modallist').modal('show');
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

                                    $('#div_search_modal_tbl_codefactory_modallist').modal('hide')
                                    that._pr_gridpageindex = '1';
                                    that._pr_gridselectids = '';
                                    that.bindGrid();
                                }
                            });
                        },
                        fail: function ()
                        {
                            //查询失败--高级查询控件输入内容错误                           
                        }
                    });

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
            $('#div_search_modal_tbl_codefactory_modallist').modal('hide');

            that._pr_searchtype = '1';
            $('#btn_command_search_tbl_codefactory_modallist').html('简单查询');
            $('#txt_command_search_tbl_codefactory_modallist').removeAttr('disabled');

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
            $('#btn_command_search_tbl_codefactory_modallist').html('高级查询');
            $('#txt_command_search_tbl_codefactory_modallist').attr('disabled', 'disabled');

            $('#div_search_modal_tbl_codefactory_modallist').modal('show');
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
                success: function (tbl_codefactory_modallist)
                {
                    checkDetailModel(tbl_codefactory_modallist, {
                        success: function (tbl_codefactory_modallist)
                        {

                            updateDetailData(tbl_codefactory_modallist, {
                                success: function (tbl_codefactory_modallist)
                                {
                                    clearDetailModel(tbl_codefactory_modallist);
                                    $('#div_detail_modal_tbl_codefactory_modallist').modal('hide')
                                    that.bindGrid();
                                },
                                fail: function (message)
                                {
                                    _alertMessage.show('数据更新失败<br/>' + message, 'fail');
                                }
                            });

                        },
                        fail: function ()
                        {
                            //数据校验失败，容错
                        }
                    });
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
            $('#div_detail_modal_tbl_codefactory_modallist').modal('hide');
            _validateMessage_detail.hidden();
            that.bindGrid();
        }
    };
    return that;
})();



$(document).ready(function ()
{
    tbl_codefactory_modallist_Obj.init();
});
