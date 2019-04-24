var _clientInf = '{userid:"",appcode:"54",appname:"",userip:"",usermac:"",username:"",userimg:""}';
var _blockMessage = null;
var _alertMessage = null;
var _resultMessage = null;
var _confirmMessage = null;

var _pr_appcode = '';
var _pr_projectClassId = '';
var _pr_projectClassDtl1 = '';
var _pr_projectClassDtl2 = '';

var _pr_workItemIdString = '';
var _pr_processDefIdString = '';
var _pr_activityDefIdString = '';
var _pr_processInsIdString = '';

$(document).ready(function ()
{
    tblMainTableListObj.init();
});

var tblMainTableListObj = (function ()
{
    'use strict';
    var that = {

        _serviceUrl_tbl_maintable_detailall: '//127.0.0.1/sara.dd.ldsw/service/service_tbl_maintable_detailall.asmx/',
        _serviceUrl: '//127.0.0.1/sara.dd.ldsw/service/service_tbl_maintable.asmx/',
        //设置为空即可实现不分页
        _pageSize: '10',

        _baseCodeHashMap: null,
        //_controlHashMap: null,
        //_control: null,

        _validateMessage_search_model: null,

        _pr_listtype: '',
        _pr_gridselectids: '',
        _pr_gridpageindex: 1,
        _pr_searchtype: '1',
        _pr_searchcontent: null,

        _whereClauseString: '',
        _baseWhereClauseString: '',

        _validateMessage_new_model: null,
        _ladda_btn_detail_new_modal_save: null,

        init: function ()
        {
            try
            {

                _blockMessage = new blockMessage();
                _blockMessage.show('程序加载中...', 'loading');
                basePageObj.initBasePage({
                    success: function ()
                    {
                        //初始化参数
                        that.initParameter({
                            success: function ()
                            {
                                that.creatSearchWhereClause({
                                    success: function ()
                                    {
                                        that.initGrid({
                                            success: function ()
                                            {
                                                tblMainTableButtonObj.initButton(that._pr_listtype, 'list', {
                                                    success: function ()
                                                    {
                                                        that.bindGrid({
                                                            success: function ()
                                                            {
                                                                _alertMessage = new alertMessage();
                                                                _resultMessage = new resultMessage();
                                                                _confirmMessage = new confirmMessage();



                                                                _blockMessage.hidden();

                                                              
                                                                //初始化=====================search和new的model=========================
                                                                that.initBaseCode({
                                                                    success: function ()
                                                                    {
                                                                        that.initSearchControl({
                                                                            success: function ()
                                                                            {
                                                                                that.setSearchData({
                                                                                    success: function ()
                                                                                    {
                                                                                        that._validateMessage_search_model = new validateMessage('btn_search_modal_search_tbl_maintable_list');

                                                                                        //=======================newModel======================
                                                                                        that.initNewModalControl({
                                                                                            success: function ()
                                                                                            {
                                                                                                that._validateMessage_new_model = new validateMessage('btn_new_modal_save_tbl_maintable_list');

                                                                                                that._ladda_btn_detail_new_modal_save = Ladda.create('btn_new_modal_save_tbl_maintable_list');

                                                                                                switch (that._pr_listtype)
                                                                                                {
                                                                                                    case "1":
                                                                                                        that.setDisable(false);
                                                                                                        break;
                                                                                                    case "2":
                                                                                                        that.setDisable(true);
                                                                                                        break;
                                                                                                }

                                                                                                that.setDefaultDisable({
                                                                                                    success: function ()
                                                                                                    {
                                                                                                    }
                                                                                                });

                                                                                                that.initCopyGrid({
                                                                                                    success: function ()
                                                                                                    {

                                                                                                        that._ladda_btn_copy_modal_search = Ladda.create('btn_copy_modal_search_tbl_maintable_list');
                                                                                                        that._ladda_btn_copy_modal_copy = Ladda.create('btn_copy_modal_copy_tbl_maintable_list');
                                                                                                    }
                                                                                                });
                                                                                            }
                                                                                        });
                                                                                    }
                                                                                });
                                                                            }
                                                                        });
                                                                    }
                                                                });

                                                            }
                                                        });
                                                    }
                                                });
                                            }
                                        });

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

        //设置控件的默认Disable
        setDefaultDisable: function (callBackFunction)
        {

            //2、设定newmodal中的数据项的disable
            //3、设定searchmodal中的数据项的disable

            var isDisable = true;

            controlObj.singledropdownlistdisable('search_dropdown_sys_projectclassid_tbl_maintable_list', isDisable);

            controlObj.singledropdownlistdisable('new_dropdown_sys_projectclassid_tbl_maintable_list', isDisable);
            controlObj.textdisable('new_txt_lrr_tbl_maintable_list', isDisable);
            controlObj.datetimedisable('new_datetime_lrrq_tbl_maintable_list_date', 'new_datetime_lrrq_tbl_maintable_list_time', isDisable);

            controlObj.textdisable('new_txt_sys_processnextuser_tbl_maintable_list', isDisable);
            controlObj.textdisable('new_txt_shpid_tbl_maintable_list', isDisable);

            controlObj.singledropdownlistdisable('new_dropdown_xzqy_tbl_maintable_list', isDisable);



            callBackFunction.success();
        },

        initParameter: function (callBackFunction)
        {
            try
            {

                that._pr_listtype = requestQuery('listtype');
                _pr_appcode = requestQuery('appcode');
                _pr_projectClassId = requestQuery('projectclassid');
                _pr_projectClassDtl1 = requestQuery('projectclassdtl1');
                _pr_projectClassDtl2 = requestQuery('projectclassdtl2');
                that._pr_gridselectids = requestQuery('gridselectids');
                that._pr_gridpageindex = requestQuery('gridpageIndex');
                that._pr_searchtype = requestQuery('searchtype');
                that._pr_searchcontent = requestQuery('searchcontent');
                _pr_workItemIdString = requestQuery('workitemid');
                _pr_processDefIdString = requestQuery('processdefid');
                _pr_activityDefIdString = requestQuery('activitydefid');
                _pr_processInsIdString = requestQuery('processinsid');
                _clientInf = '{userid:"' + basePageObj._userInfoJson.sys_userid + '",appcode:"' + _pr_appcode + '",appname:"",userip:"' + basePageObj._userInfoJson.ip + '",usermac:"' + basePageObj._userInfoJson.mac + '",username:"' + basePageObj._userInfoJson.sys_username + '",userimg:"' + basePageObj._userInfoJson.sys_photourl + '"}';
                if (_pr_workItemIdString == undefined || _pr_workItemIdString == null)
                {
                    _pr_workItemIdString = '';
                }
                if (_pr_processDefIdString == undefined || _pr_processDefIdString == null)
                {
                    _pr_processDefIdString = '';
                }
                if (_pr_activityDefIdString == undefined || _pr_activityDefIdString == null)
                {
                    _pr_activityDefIdString = '';
                }
                if (_pr_processInsIdString == undefined || _pr_processInsIdString == null)
                {
                    _pr_processInsIdString = '';
                }

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
                        $('#btn_command_search_tbl_maintable_list').html('简单查询');
                        $('#txt_command_search_tbl_maintable_list').removeAttr("disabled");

                        break;
                    case "2":
                        $('#btn_command_search_tbl_maintable_list').html('高级查询');
                        $('#txt_command_search_tbl_maintable_list').attr("disabled", true);
                        break;
                }


                if (_pr_projectClassId == null || _pr_projectClassId == '' || _pr_projectClassId == 'null')
                {
                    _blockMessage.show('projectclassid参数接收失败...', 'fail');
                }
                else if (_pr_projectClassDtl1 == null || _pr_projectClassDtl1 == '' || _pr_projectClassDtl1 == 'null')
                {
                    _blockMessage.show('projectclassdtl1参数接收失败...', 'fail');
                }
                    //else if (_pr_projectClassDtl2 == null || _pr_projectClassDtl2 == '' || _pr_projectClassDtl2 == 'null')
                    //{
                    //    _blockMessage.show('projectclassdtl2参数接收失败...', 'fail');
                    //}

                else if (that._pr_listtype == null || that._pr_listtype == '' || that._pr_listtype == 'null')
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

        initGrid: function (callBackFunction)
        {
            try
            {
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

                $('#table_grid_tbl_maintable_list').bootstrapTable({
                    cache: false,
                    height: gridHeight,
                    striped: true,
                    pagination: true,
                    pageSize: that._pageSize,
                    pageList: [that._pageSize],
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
                                var disabledBool = false;
                                var checkedBool = false;
                                switch (that._pr_listtype)
                                {
                                    case "1":
                                        disabledBool = false;

                                        if (('^' + that._pr_gridselectids + '^').indexOf('^' + row.sys_id + '^') > -1)
                                        {
                                            //return {
                                            //    disabled: false,
                                            //    checked: true
                                            //}
                                            checkedBool = true;
                                        }
                                        //return value;
                                        break;
                                    case "2":
                                        disabledBool = false;
                                        if (('^' + that._pr_gridselectids + '^').indexOf('^' + row.sys_id + '^') > -1)
                                        {
                                            //return {
                                            //    disabled: true,
                                            //    checked: true
                                            //}
                                            checkedBool = true;
                                        }
                                        else
                                        {
                                            //return {
                                            //    disabled: true
                                            //}
                                        }
                                        break;
                                }



                                return {
                                    disabled: disabledBool,
                                    checked: checkedBool
                                }
                            }
                        },
                        {
                            field: 'sys_id', title: 'sys_id',
                            align: 'center',
                            "class": 'hidden',
                            valign: 'middle',
                            visible: true,
                            sortable: true
                        },


                     {
                         field: 'shpid', title: 'shpid',
                         visible: false,
                         "class": 'hidden',
                         align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                         formatter: function (value, row, index) { return value; }
                     },

                     {
                         field: 'sys_processinsid', title: 'processinsid',
                         visible: false,
                         "class": 'cc-hidden-sm  cc-hidden-xs',
                         align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                         formatter: function (value, row, index) { return value; }
                     },



                     {
                         field: 'fk_tbl_maintable_sys_id', title: '外键',
                         visible: false,
                         "class": 'cc-hidden-sm  cc-hidden-xs',
                         align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                         formatter: function (value, row, index) { return value; }
                     },



                     {
                         field: 'fk_workflow_sys_id', title: 'workflowid',
                         visible: false,
                         "class": 'cc-hidden-sm  cc-hidden-xs',
                         align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                         formatter: function (value, row, index) { return value; }
                     },



                     {
                         field: 'value1', title: '备用字段1',
                         visible: false,
                         "class": 'cc-hidden-sm  cc-hidden-xs',
                         align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                         formatter: function (value, row, index) { return value; }
                     },



                     {
                         field: 'value2', title: '备用字段2',
                         visible: false,
                         "class": 'cc-hidden-sm  cc-hidden-xs',
                         align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                         formatter: function (value, row, index) { return value; }
                     },



                     {
                         field: 'value3', title: '备用字段3',
                         visible: false,
                         "class": 'cc-hidden-sm  cc-hidden-xs',
                         align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                         formatter: function (value, row, index) { return value; }
                     },



                     {
                         field: 'value4', title: '备用字段4',
                         visible: false,
                         "class": 'cc-hidden-sm  cc-hidden-xs',
                         align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                         formatter: function (value, row, index) { return value; }
                     },



                     {
                         field: 'value5', title: '备用字段5',
                         visible: false,
                         "class": 'cc-hidden-sm  cc-hidden-xs',
                         align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                         formatter: function (value, row, index) { return value; }
                     },



                     {
                         field: 'value6', title: '备用字段6',
                         visible: false,
                         "class": 'cc-hidden-sm  cc-hidden-xs',
                         align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                         formatter: function (value, row, index) { return value; }
                     },



                     {
                         field: 'value7', title: '备用字段7',
                         visible: false,
                         "class": 'cc-hidden-sm  cc-hidden-xs',
                         align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                         formatter: function (value, row, index) { return value; }
                     },



                     {
                         field: 'value8', title: '备用字段8',
                         visible: false,
                         "class": 'cc-hidden-sm  cc-hidden-xs',
                         align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                         formatter: function (value, row, index) { return value; }
                     },



                     {
                         field: 'value9', title: '备用字段9',
                         visible: false,
                         "class": 'cc-hidden-sm  cc-hidden-xs',
                         align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                         formatter: function (value, row, index) { return value; }
                     },



                     {
                         field: 'value10', title: '备用字段10',
                         visible: false,
                         "class": 'cc-hidden-sm  cc-hidden-xs',
                         align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                         formatter: function (value, row, index) { return value; }
                     },

                      {
                          field: 'sys_first', title: '是否经过操作',
                          visible: false,
                          "class": 'cc-hidden-sm  cc-hidden-xs',
                          align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                          formatter: function (value, row, index) { return value; }
                      },


                     {
                         field: 'bz', title: '备注',
                         visible: false,
                         "class": 'cc-hidden-sm  cc-hidden-xs',
                         align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                         formatter: function (value, row, index) { return value; }
                     },


                       {
                           field: 'dwmc', title: '单位名称',
                           visible: false,
                           "class": 'cc-hidden-sm  cc-hidden-xs',
                           align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                           formatter: function (value, row, index) { return value; }
                       },

                     {
                         field: 'xmmc', title: '项目名称',

                         align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                         formatter: function (value, row, index)
                         {
                             
                             return value;
                         }
                     },

                      {
                          field: 'xzqy', title: '行政区域',
                          "class": 'cc-hidden-sm  cc-hidden-xs',
                          align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                          formatter: function (value, row, index) { return value; }
                      },
                       {
                           field: 'xmlx', title: '项目类型',
                           "class": 'hidden',
                           align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                           formatter: function (value, row, index) { return value; }
                       },
                         {
                             field: 'sys_projectclassid', title: '业务类型',
                             visible: false,
                             "class": 'cc-hidden-sm  cc-hidden-xs',
                             align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                             formatter: function (value, row, index) { return value; }
                         },
                      {
                          field: 'sys_projectclassid_name', title: '业务类型',
                          "class": 'cc-hidden-sm  cc-hidden-xs',
                          align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                          formatter: function (value, row, index) { return value; }
                      },
                     {
                         field: 'sys_projectclassdtl1_name', title: '业务状态',
                         "class": 'cc-hidden-sm  cc-hidden-xs',
                         align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                         formatter: function (value, row, index) { return value; }
                     },
                     {
                         field: 'sys_projectclassdtl2_name', title: '数据类型',
                         "class": 'hidden',
                         align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                         formatter: function (value, row, index) { return value; }
                     },
                      {
                          field: 'sys_processnextuser', title: '待办人',
                          visible: false,
                          "class": 'cc-hidden-sm  cc-hidden-xs',
                          align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                          formatter: function (value, row, index) { return value; }
                      },
                     {
                         field: 'lrr', title: '创建人',
                         "class": 'cc-hidden-sm  cc-hidden-xs',
                         align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                         formatter: function (value, row, index) { return value; }
                     },
                                 {
                                     field: 'lrrq', title: '创建日期',
                                     "class": 'cc-hidden-sm  cc-hidden-xs',
                                     align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                                     formatter: function (value, row, index)
                                     {
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
                                    that.transToDetailPage(row.sys_id, row.sys_projectclassid, row.sys_projectclassdtl1, row.sys_projectclassdtl2, '2');

                                },
                                'click .edit': function (e, value, row, index)
                                {
                                    that.transToDetailPage(row.sys_id, row.sys_projectclassid, row.sys_projectclassdtl1, row.sys_projectclassdtl2, '1');
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
                        //新建未操作过的数据是粗体，退回的数据是红色
                        var cssString = '';

                        if (row.sys_projectclassdtl1.indexOf('_') > -1)
                        {
                            cssString += ' danger ';
                        }

                        if (row.sys_first == '0')
                        {
                            cssString += ' cc-font-weight-bold ';
                        }

                        if (cssString == '')
                        {
                            return {}
                        }
                        else
                        {
                            return { classes: cssString };
                        }



                    },
                    onLoadSuccess: function (data)
                    {

                    },
                    onCheck: function (row)
                    {
                        that._pr_gridselectids += '^' + row.sys_id;
                        that._pr_gridselectids = that._pr_gridselectids.trimStartEnd('^');

                        that.gridSelectedChange();
                    },
                    onUncheck: function (row)
                    {
                        that._pr_gridselectids = ('^' + that._pr_gridselectids + '^').replaceAll('^' + row.sys_id + '^', '^');
                        that._pr_gridselectids = that._pr_gridselectids.trimStartEnd('^');

                        that.gridSelectedChange();
                    },
                    onCheckAll: function ()
                    {
                        var rows = $('#table_grid_tbl_maintable_list').bootstrapTable('getSelections');
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

                        that.gridSelectedChange();
                    },
                    onUncheckAll: function ()
                    {
                        var rows = $('#table_grid_tbl_maintable_list').bootstrapTable('getData');
                        $.each(rows, function (i, u)
                        {
                            if (('^' + that._pr_gridselectids + '^').indexOf('^' + rows[i].sys_id + '^') > -1)
                            {
                                that._pr_gridselectids = ('^' + that._pr_gridselectids + '^').replaceAll('^' + rows[i].sys_id + '^', '^');
                            }
                        });

                        that._pr_gridselectids = that._pr_gridselectids.trimStartEnd('^');

                        that.gridSelectedChange();
                    },


                });

                callBackFunction.success();
            }
            catch (ex)
            {
                _blockMessage.show('that.initGrid执行失败<br/>' + ex.message, 'fail');
            }


        },

        bindGrid: function (callBackFunction)
        {
            setTimeout(function ()
            {

                var whereClause = that._whereClauseString;
                var orderByString = ' sys_id desc';
                var columnsString = 'sys_processinsid^fk_tbl_maintable_sys_id^fk_workflow_sys_id^value1^value2^value3^value4^value5^value6^value7^value8^value9^value10^sys_processnextuser^sys_projectclassdtl1^sys_projectclassdtl1_name^sys_projectclassdtl2^sys_projectclassdtl2_name^sys_first^sys_projectclassid^sys_projectclassid_name^shpid^xmmc^xzqy^dwmc^lrr^lrrq^bz^xmlx^sys_id';

                var data = { whereString: whereClause, orderByString: orderByString, columnsString: columnsString, pageSizeString: that._pageSize, pageIndexString: that._pr_gridpageindex, clientInf: _clientInf };

                doAjaxFunction(that._serviceUrl, 'GetList', data, {
                    success: function (result)
                    {
                        var messageJson = (new Function("", "return " + result))();

                        $('#table_grid_tbl_maintable_list').bootstrapTable("loadJson", messageJson);

                        that.gridSelectedChange();
                        tblMainTableButtonObj.setButtonVisiblity(messageJson.total);

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

        setDisable: function (isDisable)
        {

        },

        btn_command_clearselect_onclick: function ()
        {
            $('#table_grid_tbl_maintable_list').bootstrapTable('uncheckAll');
            that._pr_gridselectids = '';
            that.gridSelectedChange();
        },

        initBaseCode: function (callBackFunction)
        {

            that._baseCodeHashMap = new hashMap();
            var parameterJson = {
                sysUserIdString: basePageObj._userInfoJson.sys_userid,
                projectClassIdString: _pr_projectClassId,
                projectClassDtl1String: _pr_projectClassDtl1,
                projectClassDtl2String: _pr_projectClassDtl2,
                userInfoJsonString: basePageObj._userInfoJson
            };

            var data = {
                parameterJsonString: JSON.stringify(parameterJson),
                clientInf: _clientInf
            };


            doAjaxFunction(that._serviceUrl_tbl_maintable_detailall, 'GetXzqyIdTextString', data, {
                success: function (result)
                {
                    var resultJson = (new Function("", "return " + result))();
                    that._baseCodeHashMap.put('servicecode_xzfq', resultJson['xzqy']);

                    var xzqyArray = resultJson['xzqy'];

                    var xzqyWhereStr = '(';
                    $.each(xzqyArray, function (i, u)
                    {
                        xzqyWhereStr += '\'' + xzqyArray[i].id + '\',';
                    });
                    xzqyWhereStr = xzqyWhereStr.trimEnd(',') + ')';

                    var sqlStringsJson = {
                        projclassid: 'select sys_id as id,projclassname as text from t_projclass order by to_number(sys_orderid)',
                        lrr: 'select distinct(lrr) from tbl_maintable where xzqyid in ' + xzqyWhereStr + '',
                        dwmc: 'select distinct(dwmc) from tbl_maintable where xzqyid in ' + xzqyWhereStr + ''
                    };

                    commonObj.querySqls(sqlStringsJson, {
                        success: function (resultJson)
                        {

                            that._baseCodeHashMap.put('servicecode_projclassid', resultJson["projclassid"]);
                            that._baseCodeHashMap.put('servicecode_lrr', formatJsonArrayToArray(resultJson["lrr"], "lrr"));
                            that._baseCodeHashMap.put('servicecode_dwmc', formatJsonArrayToArray(resultJson["dwmc"], "dwmc"));

                            callBackFunction.success();
                        }
                    });

                },
                fail: function (message)
                {
                    _blockMessage.show(that._serviceUrl_tbl_maintable_detailall + 'GetXzqyIdTextString<br/>' + message, 'fail');
                },
                error: function (message)
                {
                    _blockMessage.show(that._serviceUrl_tbl_maintable_detailall + 'GetXzqyIdTextString<br/>' + message, 'fail');
                }
            });

        },

        gridSelectedChange: function ()
        {
            if (that._pr_gridselectids == '')
            {
                // ul_gridselect  cc-badge-ul  cc-badge-p  cc-badge-a
                $('#btn_command_clearselect_tbl_maintable_list').addClass('hidden');

            }
            else
            {
                $('#btn_command_clearselect_tbl_maintable_list').removeClass('hidden');
                var allcount = that._pr_gridselectids.split('^').length;
                var currentcount = $('#table_grid_tbl_maintable_list').bootstrapTable('getSelections').length;
                $('#btn_command_clearselect_tbl_maintable_list .cc-badge-p').html(currentcount + '/' + allcount);
            }
        },

        //===========transToDetailPage_tbl_maintable_list================
        transToDetailPage: function (id, projectClassId, projectClassDtl1, projectClassDtl2, pagetype)
        {
            var url = '../tbl_maintable/tbl_maintable_detailall.html';
            url += '?uid=' + basePageObj._userInfoJson.sys_userid;
            url += '&sys_id=' + id;
            url += '&pagetype=' + pagetype;
            url += '&appcode=' + _pr_appcode;
            url += '&projectclassid=' + projectClassId;
            url += '&projectclassdtl1=' + projectClassDtl1;
            url += '&projectclassdtl2=' + projectClassDtl2;

            url += '&fromurl=../tbl_maintable/tbl_maintable_list.html';
            url += '&fromurlparam={';
            url += '"appcode":"' + _pr_appcode + '",';
            url += '"listtype":"' + that._pr_listtype + '",';
            url += '"gridselectids":"' + that._pr_gridselectids + '",';
            url += '"gridpageindex":"' + that._pr_gridpageindex + '",';
            url += '"searchtype":"' + that._pr_searchtype + '",';
            url += '"projectclassid":"' + _pr_projectClassId + '",';
            url += '"projectclassdtl1":"' + _pr_projectClassDtl1 + '",';
            url += '"projectclassdtl2":"' + _pr_projectClassDtl2 + '",';
            url += '"searchcontent":' + JSON.stringify(that._pr_searchcontent) + '';
            url += '}';

            var parameterJson = {
                mainTableSysidString: id
            };

            var data = {
                parameterJsonString: JSON.stringify(parameterJson),
                clientInf: _clientInf
            };

            doAjaxFunction(that._serviceUrl_tbl_maintable_detailall, 'UpDataSysFirst', data, {
                success: function (result)
                {
                    //window.location.href = url + '&random=' + parseInt(10000 * Math.random());

                    commonObj.changeUrl(url, 'right-show');
                },
                fail: function (message)
                {
                    _alertMessage.show('操作失败<br/>' + message, 'fail');
                },
                error: function (error)
                {
                    _alertMessage.show('操作失败<br/>' + error.message, 'fail');
                }
            });

        },

        //===========detail================
        btn_command_new: function (callBackFunction)
        {

            //================需要用户填写信息===============

            that.setNewModelData({
                success: function ()
                {
                    $('#div_new_modal_tbl_maintable_list').modal('show');
                    $('#btn_new_modal_save_tbl_maintable_list').unbind('click');
                    $('#btn_new_modal_save_tbl_maintable_list').bind('click', function ()
                    {
                        that.btn_new_modal_save_onclick(callBackFunction);
                    });

                    $('#btn_new_modal_cancle_tbl_maintable_list').unbind('click');
                    $('#btn_new_modal_cancle_tbl_maintable_list').bind('click', function ()
                    {
                        that.btn_new_modal_cancle_onclick(callBackFunction);
                    });
                }
            });

            //================不需要用户填写信息===============

            //var d = new Date();
            //var jsonString = ''; 

            //jsonString += '{';
            //jsonString += '"xzqy":"' + basePageObj._userInfoJson.sys_toporganname + '",';//xzqy
            //jsonString += '"xzqyid":"' + basePageObj._userInfoJson.sys_toporgan + '",';
            //jsonString += '"lrr":"' + basePageObj._userInfoJson.sys_username + '",';
            //jsonString += '"lrrq":"' + d.Format('yyyy-MM-dd hh:mm:ss') + '",';
            //jsonString += '"sys_projectclassid":"' + _pr_projectClassId + '",';
            //jsonString += '"sys_delflag":"0",';
            //jsonString += '"sys_lasteditusername":"' + basePageObj._userInfoJson.sys_username + '",';
            //jsonString += '"sys_lastedituserid":"' + basePageObj._userInfoJson.sys_userid + '",';
            //jsonString += '"sys_lasteditdate":"' + d.Format('yyyy-MM-dd hh:mm:ss') + '",';
            //jsonString += '"sys_creatdate":"' + d.Format('yyyy-MM-dd hh:mm:ss') + '",';
            //jsonString += '"sys_creatusername":"' + basePageObj._userInfoJson.sys_username + '",';
            //jsonString += '"sys_creatuserid":"' + basePageObj._userInfoJson.sys_userid + '"';
            //jsonString += '}';

            //var data = '{"json":\'' + jsonString + '\',"clientInf":\'' + _clientInf + '\'}';


            //doAjaxFunction(that._serviceUrl, 'Add', data, {
            //    success: function (result)
            //    {
            //that.CreatNewItem(result,{
            //    success: function ()
            //    {
            //     
            //       
            //       
            //        that.transToDetailPage(result, '1');
            //    }
            //});

            //    }, fail: function (message)
            //    {
            //        _alertMessage.show('新建数据执行失败<br/>' + message, 'fail');
            //        
            //    }
            //});
        },

        initNewModalControl: function (callBackFunction)
        {
            try
            {
                var xzfqArray = that._baseCodeHashMap.get('servicecode_xzfq');
                var projclassidArray = that._baseCodeHashMap.get('servicecode_projclassid');
                var lrrArray = that._baseCodeHashMap.get('servicecode_lrr');
                var dwmcArray = that._baseCodeHashMap.get('servicecode_dwmc');

                controlObj.toggleinit('new_ck_sys_delflag_tbl_maintable_list');

                controlObj.toggleinit('new_ck_sys_first_tbl_maintable_list');

                controlObj.singledropdownlistinit('new_dropdown_sys_projectclassid_tbl_maintable_list', projclassidArray, that.new_dropdown_sys_projectclassid_onchange);

                controlObj.singledropdownlistinit('new_dropdown_xzqy_tbl_maintable_list', xzfqArray);

                controlObj.autocompleteinit('new_txt_dwmc_tbl_maintable_list', dwmcArray);

                controlObj.autocompleteinit('new_txt_lrr_tbl_maintable_list', lrrArray);

                controlObj.datetimeinit('new_datetime_lrrq_tbl_maintable_list_date', 'new_datetime_lrrq_tbl_maintable_list_time');

                controlObj.singledropdownlistinit('new_dropdown_xmlx_tbl_maintable_list', projclassidArray);

                //模态窗口
                $('#div_new_modal_tbl_maintable_list').modal({
                    keyboard: false,
                    backdrop: 'static',
                    show: false
                });

                callBackFunction.success();
            }
            catch (ex)
            {
                _blockMessage.show('initNewModalControl执行失败。<br/>' + ex.message, 'fail');
            }
        },

        setNewModelData: function (callBackFunction)
        {
            var d = new Date();
            controlObj.text('new_txt_sys_processinsid_tbl_maintable_list', '');

            controlObj.text('new_txt_fk_tbl_maintable_sys_id_tbl_maintable_list', '');

            controlObj.text('new_txt_fk_workflow_sys_id_tbl_maintable_list', '');

            controlObj.text('new_txt_value1_tbl_maintable_list', '');

            controlObj.text('new_txt_value2_tbl_maintable_list', '');

            controlObj.text('new_txt_value3_tbl_maintable_list', '');

            controlObj.text('new_txt_value4_tbl_maintable_list', '');

            controlObj.text('new_txt_value5_tbl_maintable_list', '');

            controlObj.text('new_txt_value6_tbl_maintable_list', '');

            controlObj.text('new_txt_value7_tbl_maintable_list', '');

            controlObj.text('new_txt_value8_tbl_maintable_list', '');

            controlObj.text('new_txt_value9_tbl_maintable_list', '');

            controlObj.text('new_txt_value10_tbl_maintable_list', '');

            controlObj.toggle('new_ck_sys_delflag_tbl_maintable_list', 'false');

            controlObj.text('new_txt_sys_processnextuser_tbl_maintable_list', '');

            controlObj.toggle('new_ck_sys_first_tbl_maintable_list', 'false');

            controlObj.singledropdownlistid('new_dropdown_sys_projectclassid_tbl_maintable_list', _pr_projectClassId);

            that.initNewProjDtlControlByProjclassID(_pr_projectClassId, {
                success: function ()
                {
                    //新建的时候一般是1
                    if ((',' + _pr_projectClassDtl1 + ',').indexOf(',1,') > -1)
                    {
                        controlObj.singledropdownlistid('new_dropdown_sys_projectclassdtl1_tbl_maintable_list', '1');
                        controlObj.singledropdownlistdisable('new_dropdown_sys_projectclassdtl1_tbl_maintable_list', true);
                        controlObj.singledropdownlistdisable('new_dropdown_xmlx_tbl_maintable_list', true);
                    }

                }
            });


            controlObj.text('new_txt_shpid_tbl_maintable_list', '');

            controlObj.text('new_txt_xmmc_tbl_maintable_list', '新建项目_' + d.Format('yyyyMMddhhmmss'));

            controlObj.singledropdownlistid('new_dropdown_xzqy_tbl_maintable_list', basePageObj._userInfoJson.sys_toporgan);

            controlObj.text('new_txt_dwmc_tbl_maintable_list', '');

            controlObj.text('new_txt_lrr_tbl_maintable_list', basePageObj._userInfoJson.sys_username);


            controlObj.datetime('new_datetime_lrrq_tbl_maintable_list_date', 'new_datetime_lrrq_tbl_maintable_list_time', d.Format('yyyy-MM-dd hh:mm:ss'));

            controlObj.text('new_txt_bz_tbl_maintable_list', '');

            controlObj.singledropdownlistid('new_dropdown_xmlx_tbl_maintable_list', _pr_projectClassId);



            callBackFunction.success();

        },

        getNewModelData: function (callBackFunction)
        {
            try
            {
                //高级查询
                var tbl_maintable_modallist = new Object();

                tbl_maintable_modallist.sys_processinsid = controlObj.text('new_txt_sys_processinsid_tbl_maintable_list');

                tbl_maintable_modallist.fk_tbl_maintable_sys_id = controlObj.text('new_txt_fk_tbl_maintable_sys_id_tbl_maintable_list');

                tbl_maintable_modallist.fk_workflow_sys_id = controlObj.text('new_txt_fk_workflow_sys_id_tbl_maintable_list');

                tbl_maintable_modallist.value1 = controlObj.text('new_txt_value1_tbl_maintable_list');

                tbl_maintable_modallist.value2 = controlObj.text('new_txt_value2_tbl_maintable_list');

                tbl_maintable_modallist.value3 = controlObj.text('new_txt_value3_tbl_maintable_list');

                tbl_maintable_modallist.value4 = controlObj.text('new_txt_value4_tbl_maintable_list');

                tbl_maintable_modallist.value5 = controlObj.text('new_txt_value5_tbl_maintable_list');

                tbl_maintable_modallist.value6 = controlObj.text('new_txt_value6_tbl_maintable_list');

                tbl_maintable_modallist.value7 = controlObj.text('new_txt_value7_tbl_maintable_list');

                tbl_maintable_modallist.value8 = controlObj.text('new_txt_value8_tbl_maintable_list');

                tbl_maintable_modallist.value9 = controlObj.text('new_txt_value9_tbl_maintable_list');

                tbl_maintable_modallist.value10 = controlObj.text('new_txt_value10_tbl_maintable_list');


                tbl_maintable_modallist.sys_delflag = controlObj.toggle('new_ck_sys_delflag_tbl_maintable_list') == "false" ? "0" : "1";

                tbl_maintable_modallist.sys_processnextuser = controlObj.text('new_txt_sys_processnextuser_tbl_maintable_list');

                tbl_maintable_modallist.sys_projectclassdtl1_name = controlObj.singledropdownlist('new_dropdown_sys_projectclassdtl1_tbl_maintable_list');
                tbl_maintable_modallist.sys_projectclassdtl1 = controlObj.singledropdownlistid('new_dropdown_sys_projectclassdtl1_tbl_maintable_list');

                tbl_maintable_modallist.sys_projectclassdtl2_name = controlObj.singledropdownlist('new_dropdown_sys_projectclassdtl2_tbl_maintable_list');
                tbl_maintable_modallist.sys_projectclassdtl2 = controlObj.singledropdownlistid('new_dropdown_sys_projectclassdtl2_tbl_maintable_list');


                tbl_maintable_modallist.sys_first = controlObj.toggle('new_ck_sys_first_tbl_maintable_list') == "false" ? "0" : "1";

                tbl_maintable_modallist.sys_projectclassid_name = controlObj.singledropdownlist('new_dropdown_sys_projectclassid_tbl_maintable_list');
                tbl_maintable_modallist.sys_projectclassid = controlObj.singledropdownlistid('new_dropdown_sys_projectclassid_tbl_maintable_list');

                tbl_maintable_modallist.shpid = controlObj.text('new_txt_shpid_tbl_maintable_list');

                tbl_maintable_modallist.xmmc = controlObj.text('new_txt_xmmc_tbl_maintable_list');

                tbl_maintable_modallist.xzqy = controlObj.singledropdownlist('new_dropdown_xzqy_tbl_maintable_list');
                tbl_maintable_modallist.xzqyid = controlObj.singledropdownlistid('new_dropdown_xzqy_tbl_maintable_list');

                tbl_maintable_modallist.dwmc = controlObj.text('new_txt_dwmc_tbl_maintable_list');

                tbl_maintable_modallist.lrr = controlObj.text('new_txt_lrr_tbl_maintable_list');

                tbl_maintable_modallist.lrrq = controlObj.datetime('new_datetime_lrrq_tbl_maintable_list_date', 'new_datetime_lrrq_tbl_maintable_list_time');

                tbl_maintable_modallist.bz = controlObj.text('new_txt_bz_tbl_maintable_list');

                tbl_maintable_modallist.xmlx = controlObj.singledropdownlist('new_dropdown_xmlx_tbl_maintable_list');
                tbl_maintable_modallist.xmlxid = controlObj.singledropdownlistid('new_dropdown_xmlx_tbl_maintable_list');



                callBackFunction.success(tbl_maintable_modallist);
            }
            catch (ex)
            {
                _blockMessage.show('getNewModelData执行失败。<br/>' + ex.message, 'fail');
            }
        },

        checkNewModelData: function (tbl_maintable_modallist, callBackFunction)
        {
            try
            {
                var errorMessageHansMap = new hashMap();
                var errorMessagePlacementHansMap = new hashMap();


                if (tbl_maintable_modallist.sys_processinsid.length > 100)
                {
                    errorMessageHansMap.put('new_txt_sys_processinsid_tbl_maintable_list', '长度不能超过<a style="color:red">100</a>');
                    errorMessagePlacementHansMap.put('new_txt_sys_processinsid_tbl_maintable_list', 'top');
                }


                if (tbl_maintable_modallist.fk_tbl_maintable_sys_id.length > 100)
                {
                    errorMessageHansMap.put('new_txt_fk_tbl_maintable_sys_id_tbl_maintable_list', '长度不能超过<a style="color:red">100</a>');
                    errorMessagePlacementHansMap.put('new_txt_fk_tbl_maintable_sys_id_tbl_maintable_list', 'top');
                }


                if (tbl_maintable_modallist.fk_workflow_sys_id.length > 100)
                {
                    errorMessageHansMap.put('new_txt_fk_workflow_sys_id_tbl_maintable_list', '长度不能超过<a style="color:red">100</a>');
                    errorMessagePlacementHansMap.put('new_txt_fk_workflow_sys_id_tbl_maintable_list', 'top');
                }


                if (tbl_maintable_modallist.value1.length > 100)
                {
                    errorMessageHansMap.put('new_txt_value1_tbl_maintable_list', '长度不能超过<a style="color:red">100</a>');
                    errorMessagePlacementHansMap.put('new_txt_value1_tbl_maintable_list', 'top');
                }


                if (tbl_maintable_modallist.value2.length > 100)
                {
                    errorMessageHansMap.put('new_txt_value2_tbl_maintable_list', '长度不能超过<a style="color:red">100</a>');
                    errorMessagePlacementHansMap.put('new_txt_value2_tbl_maintable_list', 'top');
                }


                if (tbl_maintable_modallist.value3.length > 100)
                {
                    errorMessageHansMap.put('new_txt_value3_tbl_maintable_list', '长度不能超过<a style="color:red">100</a>');
                    errorMessagePlacementHansMap.put('new_txt_value3_tbl_maintable_list', 'top');
                }


                if (tbl_maintable_modallist.value4.length > 100)
                {
                    errorMessageHansMap.put('new_txt_value4_tbl_maintable_list', '长度不能超过<a style="color:red">100</a>');
                    errorMessagePlacementHansMap.put('new_txt_value4_tbl_maintable_list', 'top');
                }


                if (tbl_maintable_modallist.value5.length > 100)
                {
                    errorMessageHansMap.put('new_txt_value5_tbl_maintable_list', '长度不能超过<a style="color:red">100</a>');
                    errorMessagePlacementHansMap.put('new_txt_value5_tbl_maintable_list', 'top');
                }


                if (tbl_maintable_modallist.value6.length > 100)
                {
                    errorMessageHansMap.put('new_txt_value6_tbl_maintable_list', '长度不能超过<a style="color:red">100</a>');
                    errorMessagePlacementHansMap.put('new_txt_value6_tbl_maintable_list', 'top');
                }


                if (tbl_maintable_modallist.value7.length > 100)
                {
                    errorMessageHansMap.put('new_txt_value7_tbl_maintable_list', '长度不能超过<a style="color:red">100</a>');
                    errorMessagePlacementHansMap.put('new_txt_value7_tbl_maintable_list', 'top');
                }


                if (tbl_maintable_modallist.value8.length > 100)
                {
                    errorMessageHansMap.put('new_txt_value8_tbl_maintable_list', '长度不能超过<a style="color:red">100</a>');
                    errorMessagePlacementHansMap.put('new_txt_value8_tbl_maintable_list', 'top');
                }


                if (tbl_maintable_modallist.value9.length > 100)
                {
                    errorMessageHansMap.put('new_txt_value9_tbl_maintable_list', '长度不能超过<a style="color:red">100</a>');
                    errorMessagePlacementHansMap.put('new_txt_value9_tbl_maintable_list', 'top');
                }


                if (tbl_maintable_modallist.value10.length > 100)
                {
                    errorMessageHansMap.put('new_txt_value10_tbl_maintable_list', '长度不能超过<a style="color:red">100</a>');
                    errorMessagePlacementHansMap.put('new_txt_value10_tbl_maintable_list', 'top');
                }




                if (tbl_maintable_modallist.sys_processnextuser.length > 100)
                {
                    errorMessageHansMap.put('new_txt_sys_processnextuser_tbl_maintable_list', '长度不能超过<a style="color:red">100</a>');
                    errorMessagePlacementHansMap.put('new_txt_sys_processnextuser_tbl_maintable_list', 'top');
                }

                if (tbl_maintable_modallist.sys_projectclassdtl1.length > 100 || tbl_maintable_modallist.sys_projectclassdtl1_name.length > 100)
                {
                    errorMessageHansMap.put('new_dropdown_sys_projectclassdtl1_tbl_maintable_list', '长度不能超过<a style="color:red">100</a>');
                }

                if (tbl_maintable_modallist.sys_projectclassdtl2.length > 100 || tbl_maintable_modallist.sys_projectclassdtl2_name.length > 100)
                {
                    errorMessageHansMap.put('new_dropdown_sys_projectclassdtl2_tbl_maintable_list', '长度不能超过<a style="color:red">100</a>');
                }

                if (tbl_maintable_modallist.sys_projectclassdtl2.length == 0)
                {
                    errorMessageHansMap.put('new_dropdown_sys_projectclassdtl2_tbl_maintable_list', '不能为空');
                }

                if (tbl_maintable_modallist.sys_projectclassid.length > 100 || tbl_maintable_modallist.sys_projectclassid_name.length > 100)
                {
                    errorMessageHansMap.put('new_dropdown_sys_projectclassid_tbl_maintable_list', '长度不能超过<a style="color:red">100</a>');
                }


                if (tbl_maintable_modallist.shpid.length > 100)
                {
                    errorMessageHansMap.put('new_txt_shpid_tbl_maintable_list', '长度不能超过<a style="color:red">100</a>');
                    errorMessagePlacementHansMap.put('new_txt_shpid_tbl_maintable_list', 'top');
                }


                if (tbl_maintable_modallist.xmmc.length > 100)
                {
                    errorMessageHansMap.put('new_txt_xmmc_tbl_maintable_list', '长度不能超过<a style="color:red">100</a>');
                    errorMessagePlacementHansMap.put('new_txt_xmmc_tbl_maintable_list', 'top');
                }

                if (tbl_maintable_modallist.xmmc.length == 0)
                {
                    errorMessageHansMap.put('new_txt_xmmc_tbl_maintable_list', '不能为空');
                    errorMessagePlacementHansMap.put('new_txt_xmmc_tbl_maintable_list', 'top');
                }

                if (tbl_maintable_modallist.xzqy.length > 100 || tbl_maintable_modallist.xzqyid.length > 100)
                {
                    errorMessageHansMap.put('new_dropdown_xzqy_tbl_maintable_list', '长度不能超过<a style="color:red">100</a>');
                }

                if (tbl_maintable_modallist.xzqyid.length == 0)
                {
                    errorMessageHansMap.put('new_dropdown_xzqy_tbl_maintable_list', '不能为空');
                }

                if (tbl_maintable_modallist.dwmc.length > 100)
                {
                    errorMessageHansMap.put('new_txt_dwmc_tbl_maintable_list', '长度不能超过<a style="color:red">100</a>');
                }

                if (tbl_maintable_modallist.lrr.length > 100)
                {
                    errorMessageHansMap.put('new_txt_lrr_tbl_maintable_list', '长度不能超过<a style="color:red">100</a>');
                }



                if (tbl_maintable_modallist.bz.length > 4000)
                {
                    errorMessageHansMap.put('new_txt_bz_tbl_maintable_list', '长度不能超过<a style="color:red">4000</a>');
                }

                if (tbl_maintable_modallist.xmlx.length > 100 || tbl_maintable_modallist.xmlxid.length > 100)
                {
                    errorMessageHansMap.put('new_dropdown_xmlx_tbl_maintable_list', '长度不能超过<a style="color:red">100</a>');
                }

                if (tbl_maintable_modallist.xmlxid.length == 0)
                {
                    errorMessageHansMap.put('new_dropdown_xmlx_tbl_maintable_list', '不能为空');
                }



                if (errorMessageHansMap.keys().length > 0)
                {
                    that._validateMessage_new_model.show(errorMessageHansMap, errorMessagePlacementHansMap, false);
                    callBackFunction.fail();
                }
                else
                {
                    that._validateMessage_new_model.hidden();
                    callBackFunction.success(tbl_maintable_modallist);
                }
            }
            catch (ex)
            {
                _blockMessage.show('checkNewModelData执行失败。<br/>' + ex.message, 'fail');
            }
        },

        clearNewModelData: function (tbl_maintable_modallist)
        {

            tbl_maintable_modallist.sys_processinsid = '';
            controlObj.text('new_txt_sys_processinsid_tbl_maintable_list', tbl_maintable_modallist.sys_processinsid);

            tbl_maintable_modallist.fk_tbl_maintable_sys_id = '';
            controlObj.text('new_txt_fk_tbl_maintable_sys_id_tbl_maintable_list', tbl_maintable_modallist.fk_tbl_maintable_sys_id);


            tbl_maintable_modallist.fk_workflow_sys_id = '';
            controlObj.text('new_txt_fk_workflow_sys_id_tbl_maintable_list', tbl_maintable_modallist.fk_workflow_sys_id);


            tbl_maintable_modallist.value1 = '';
            controlObj.text('new_txt_value1_tbl_maintable_list', tbl_maintable_modallist.value1);


            tbl_maintable_modallist.value2 = '';
            controlObj.text('new_txt_value2_tbl_maintable_list', tbl_maintable_modallist.value2);


            tbl_maintable_modallist.value3 = '';
            controlObj.text('new_txt_value3_tbl_maintable_list', tbl_maintable_modallist.value3);


            tbl_maintable_modallist.value4 = '';
            controlObj.text('new_txt_value4_tbl_maintable_list', tbl_maintable_modallist.value4);


            tbl_maintable_modallist.value5 = '';
            controlObj.text('new_txt_value5_tbl_maintable_list', tbl_maintable_modallist.value5);


            tbl_maintable_modallist.value6 = '';
            controlObj.text('new_txt_value6_tbl_maintable_list', tbl_maintable_modallist.value6);


            tbl_maintable_modallist.value7 = '';
            controlObj.text('new_txt_value7_tbl_maintable_list', tbl_maintable_modallist.value7);


            tbl_maintable_modallist.value8 = '';
            controlObj.text('new_txt_value8_tbl_maintable_list', tbl_maintable_modallist.value8);


            tbl_maintable_modallist.value9 = '';
            controlObj.text('new_txt_value9_tbl_maintable_list', tbl_maintable_modallist.value9);


            tbl_maintable_modallist.value10 = '';
            controlObj.text('new_txt_value10_tbl_maintable_list', tbl_maintable_modallist.value10);


            tbl_maintable_modallist.sys_delflag = 'false';
            controlObj.toggle('new_ck_sys_delflag_tbl_maintable_list', 'false');




            tbl_maintable_modallist.sys_processnextuser = '';
            controlObj.text('new_txt_sys_processnextuser_tbl_maintable_list', tbl_maintable_modallist.sys_processnextuser);



            tbl_maintable_modallist.sys_projectclassdtl1 = '';
            controlObj.multidropdownlistid('new_dropdown_sys_projectclassdtl1_tbl_maintable_list', tbl_maintable_modallist.sys_projectclassdtl1);



            tbl_maintable_modallist.sys_projectclassdtl2 = '';
            controlObj.multidropdownlistid('new_dropdown_sys_projectclassdtl2_tbl_maintable_list', tbl_maintable_modallist.sys_projectclassdtl2);



            tbl_maintable_modallist.sys_firstid = 'false';
            controlObj.toggle('new_ck_sys_first_tbl_maintable_list', 'false');



            tbl_maintable_modallist.sys_projectclassid = '';
            controlObj.multidropdownlistid('new_dropdown_sys_projectclassid_tbl_maintable_list', tbl_maintable_modallist.sys_projectclassid);




            tbl_maintable_modallist.shpid = '';
            controlObj.text('new_txt_shpid_tbl_maintable_list', tbl_maintable_modallist.shpid);




            tbl_maintable_modallist.xmmc = '';
            controlObj.text('new_txt_xmmc_tbl_maintable_list', tbl_maintable_modallist.xmmc);



            tbl_maintable_modallist.xzqyid = '';
            controlObj.multidropdownlistid('new_dropdown_xzqy_tbl_maintable_list', tbl_maintable_modallist.xzqyid);




            tbl_maintable_modallist.dwmc = '';
            controlObj.text('new_txt_dwmc_tbl_maintable_list', tbl_maintable_modallist.dwmc);




            tbl_maintable_modallist.lrr = '';
            controlObj.text('new_txt_lrr_tbl_maintable_list', tbl_maintable_modallist.lrr);



            tbl_maintable_modallist.lrrq = ('1900-01-01 00:00:00');
            controlObj.datetime('new_datetime_lrrq_tbl_maintable_list_date', 'new_datetime_lrrq_tbl_maintable_list_time', tbl_maintable_modallist.lrrq);




            tbl_maintable_modallist.bz = '';
            controlObj.text('new_txt_bz_tbl_maintable_list', tbl_maintable_modallist.bz);



            tbl_maintable_modallist.xmlxid = '';
            controlObj.multidropdownlistid('new_dropdown_xmlx_tbl_maintable_list', tbl_maintable_modallist.xmlxid);




        },

        creatNewModel: function (tbl_maintable_modallist, callbackFunction)
        {

            var d = new Date();

            var json = {
                sys_processinsid: tbl_maintable_modallist.sys_processinsid,
                fk_tbl_maintable_sys_id: tbl_maintable_modallist.fk_tbl_maintable_sys_id,
                fk_workflow_sys_id: tbl_maintable_modallist.fk_workflow_sys_id,
                value1: tbl_maintable_modallist.value1,
                value2: tbl_maintable_modallist.value2,
                value3: tbl_maintable_modallist.value3,
                value4: tbl_maintable_modallist.value4,
                value5: tbl_maintable_modallist.value5,
                value6: tbl_maintable_modallist.value6,
                value7: tbl_maintable_modallist.value7,
                value8: tbl_maintable_modallist.value8,
                value9: tbl_maintable_modallist.value9,
                value10: tbl_maintable_modallist.value10,
                sys_delflag: tbl_maintable_modallist.sys_delflag,
                sys_processnextuser: tbl_maintable_modallist.sys_processnextuser,
                sys_projectclassdtl1_name: tbl_maintable_modallist.sys_projectclassdtl1_name,
                sys_projectclassdtl1: tbl_maintable_modallist.sys_projectclassdtl1,
                sys_projectclassdtl2_name: tbl_maintable_modallist.sys_projectclassdtl2_name,
                sys_projectclassdtl2: tbl_maintable_modallist.sys_projectclassdtl2,
                sys_first: tbl_maintable_modallist.sys_first,
                sys_projectclassid_name: tbl_maintable_modallist.sys_projectclassid_name,
                sys_projectclassid: tbl_maintable_modallist.sys_projectclassid,
                shpid: tbl_maintable_modallist.shpid,
                xmmc: tbl_maintable_modallist.xmmc,
                xzqy: tbl_maintable_modallist.xzqy,
                xzqyid: tbl_maintable_modallist.xzqyid,
                dwmc: tbl_maintable_modallist.dwmc,
                lrr: tbl_maintable_modallist.lrr,
                lrrq: tbl_maintable_modallist.lrrq,
                bz: tbl_maintable_modallist.bz.formatStringRN(),
                xmlx: tbl_maintable_modallist.xmlx,
                xmlxid: tbl_maintable_modallist.xmlxid,
                sys_creatdate: d.Format('yyyy-MM-dd hh:mm:ss'),
                sys_creatusername: basePageObj._userInfoJson.sys_username,
                sys_creatuserid: basePageObj._userInfoJson.sys_userid,
                sys_lasteditusername: basePageObj._userInfoJson.sys_username,
                sys_lastedituserid: basePageObj._userInfoJson.sys_userid,
                sys_lasteditdate: d.Format('yyyy-MM-dd hh:mm:ss')
            };

            var data = { json: JSON.stringify(json), clientInf: _clientInf };

            doAjaxFunction(that._serviceUrl, 'Add', data, {
                success: function (message)
                {
                    callbackFunction.success(message);
                },
                fail: function (message)
                {
                    callbackFunction.fail(message);
                },
                error: function (message)
                {
                    _blockMessage.show(that._serviceUrl + 'Add<br/>' + message, 'fail');
                }
            });
        },

        btn_new_modal_save_onclick: function (callBackFunction)
        {

            that._ladda_btn_detail_new_modal_save.start();
            that.getNewModelData({
                success: function (tbl_maintable_modallist)
                {
                    that.checkNewModelData(tbl_maintable_modallist, {
                        success: function (tbl_maintable_modallist)
                        {

                            that.creatNewModel(tbl_maintable_modallist, {
                                success: function (result)
                                {

                                    that.CreatNewItem(result, {
                                        success: function ()
                                        {
                                            // tblMainTableButtonObj._ladda_current_btn_command.stop();
                                            //that.clearNewModelData(tbl_maintable_modallist);
                                            //$('#div_new_modal_tbl_maintable_list').modal('hide')
                                            var sys_id = result;//.split('^')[0];
                                            //var projectClassId = result.split('^')[1];
                                            //var projectClassDtl1 = result.split('^')[2];
                                            //var projectClassDtl2 = result.split('^')[3];
                                            that.transToDetailPage(sys_id, _pr_projectClassId, _pr_projectClassDtl1, controlObj.singledropdownlistid('new_dropdown_sys_projectclassdtl2_tbl_maintable_list'), '1');
                                            callBackFunction.success();
                                        }
                                    });



                                },
                                fail: function ()
                                {

                                    that._ladda_btn_detail_new_modal_save.stop();
                                    _alertMessage.show('新建数据执行失败<br/>', 'fail');
                                    callBackFunction.fail();
                                }
                            });

                        },
                        fail: function ()
                        {
                            that._ladda_btn_detail_new_modal_save.stop();
                            callBackFunction.fail();
                        }
                    });
                }
            });
        },

        btn_new_modal_cancle_onclick: function (callBackFunction)
        {
            tblMainTableButtonObj._ladda_current_btn_command.stop();
            $('#div_new_modal_tbl_maintable_list').modal('hide');
            that._validateMessage_new_model.hidden();
            callBackFunction.fail();

        },

        new_dropdown_sys_projectclassid_onchange: function (changeEventParameter)
        {
            that.initNewProjDtlControlByProjclassID(changeEventParameter.val);
        },

        initNewProjDtlControlByProjclassID: function (projclassid, callBackFunction)
        {
            var sqlStringsJson = {
                t_projclass_dtl1: 'select projstate as id,value1 as text from t_projclass_dtl1 where projclassid = \'' + projclassid + '\' and value4>=0 order by to_number(sys_orderid)',
                t_projclass_dtl2: 'select projstate as id ,projname as text from t_projclass_dtl2  where projclassid = \'' + projclassid + '\''
            };

            commonObj.querySqls(sqlStringsJson, {
                success: function (resultJson)
                {
                    controlObj.singledropdownlistinit('new_dropdown_sys_projectclassdtl1_tbl_maintable_list', resultJson["t_projclass_dtl1"]);

                    controlObj.singledropdownlistinit('new_dropdown_sys_projectclassdtl2_tbl_maintable_list', resultJson["t_projclass_dtl2"]);

                    controlObj.singledropdownlistid('new_dropdown_sys_projectclassdtl1_tbl_maintable_list', '1');

                    controlObj.singledropdownlistid('new_dropdown_sys_projectclassdtl2_tbl_maintable_list', _pr_projectClassDtl2);
                    if (Object.keys(resultJson["t_projclass_dtl2"]).length <= 1)
                    {
                        controlObj.singledropdownlistdisable('new_dropdown_sys_projectclassdtl2_tbl_maintable_list', true);
                    }
                    if (callBackFunction)
                    {
                        callBackFunction.success();
                    }

                }
            });
        },

        CreatNewItem: function (mainTableSysidString, callBackFunction)
        {
            //调用后台CreatNewItem方法
            var parameterJson = {
                sysUserIdString: basePageObj._userInfoJson.sys_userid,
                mainTableSysidString: mainTableSysidString,
                projectClassIdString: _pr_projectClassId,
                projectClassDtl1String: _pr_projectClassDtl1,
                projectClassDtl2String: controlObj.singledropdownlistid('new_dropdown_sys_projectclassdtl2_tbl_maintable_list')
            };

            var data = {
                parameterJsonString: JSON.stringify(parameterJson),
                clientInf: _clientInf
            };

            doAjaxFunction(that._serviceUrl_tbl_maintable_detailall, 'CreatItem', data, {
                success: function (message)
                {
                    callBackFunction.success();

                },
                fail: function (message)
                {
                    _blockMessage.show(that._serviceUrl_tbl_maintable_detailall + 'CreatItem<br/>' + message, 'fail');
                },
                error: function (message)
                {
                    _blockMessage.show(that._serviceUrl_tbl_maintable_detailall + 'CreatItem<br/>' + message, 'fail');
                }
            });
        },

        //===========detail================

        //===========search================

        initSearchControl: function (callBackFunction)
        {
            try
            {


                //单选下拉列表--采用复选模式
                var xzfqArray = that._baseCodeHashMap.get('servicecode_xzfq');
                var projclassidArray = that._baseCodeHashMap.get('servicecode_projclassid');
                var toggleArray = [{ id: '1', text: '是' }, { id: '0', text: '否' }];
                var emptyArray = [];
                controlObj.multidropdownlistinit('search_dropdown_sys_delflag_tbl_maintable_list', toggleArray);

                controlObj.multidropdownlistinit('search_dropdown_sys_projectclassdtl1_tbl_maintable_list', emptyArray);

                controlObj.multidropdownlistinit('search_dropdown_sys_projectclassdtl2_tbl_maintable_list', emptyArray);

                controlObj.multidropdownlistinit('search_dropdown_sys_first_tbl_maintable_list', toggleArray);

                controlObj.singledropdownlistinit('search_dropdown_sys_projectclassid_tbl_maintable_list', projclassidArray, that.search_dropdown_sys_projectclassid_onchange);

                controlObj.multidropdownlistinit('search_dropdown_xzqy_tbl_maintable_list', xzfqArray);

                controlObj.datetimeinit('search_datetime_lrrq_tbl_maintable_list_datefrom', 'search_datetime_lrrq_tbl_maintable_list_timefrom');
                controlObj.datetimeinit('search_datetime_lrrq_tbl_maintable_list_dateto', 'search_datetime_lrrq_tbl_maintable_list_timeto');

                controlObj.datetime('search_datetime_lrrq_tbl_maintable_list_datefrom', 'search_datetime_lrrq_tbl_maintable_list_timefrom', '1900-01-01 00:00:00');
                controlObj.datetime('search_datetime_lrrq_tbl_maintable_list_dateto', 'search_datetime_lrrq_tbl_maintable_list_timeto', '1900-01-01 00:00:00');

                controlObj.multidropdownlistinit('search_dropdown_xmlx_tbl_maintable_list', projclassidArray);

                //模态窗口
                $('#div_search_modal_tbl_maintable_list').modal({
                    keyboard: false,
                    backdrop: 'static',
                    show: false
                });

                callBackFunction.success();
            }
            catch (ex)
            {
                _blockMessage.show('that.initSearchControl执行失败。<br/>' + ex.message, 'fail');
            }
        },

        search_dropdown_sys_projectclassid_onchange: function (changeEventParameter)
        {
            that.initSearchProjDtlControlByProjclassID(changeEventParameter.val);
        },

        initSearchProjDtlControlByProjclassID: function (projclassid, callBackFunction)
        {
            var sqlStringsJson = {
                t_projclass_dtl1: 'select projstate as id,value1 as text from t_projclass_dtl1 where projclassid = \'' + projclassid + '\' and value4>=0 order by to_number(sys_orderid)',
                t_projclass_dtl2: 'select projstate as id ,projname as text from t_projclass_dtl2  where projclassid = \'' + projclassid + '\''
            };

            commonObj.querySqls(sqlStringsJson, {
                success: function (resultJson)
                {
                    controlObj.multidropdownlistinit('search_dropdown_sys_projectclassdtl1_tbl_maintable_list', resultJson["t_projclass_dtl1"]);

                    controlObj.multidropdownlistinit('search_dropdown_sys_projectclassdtl2_tbl_maintable_list', resultJson["t_projclass_dtl2"]);

                    controlObj.multidropdownlistid('search_dropdown_sys_projectclassdtl1_tbl_maintable_list', '');

                    controlObj.multidropdownlistid('search_dropdown_sys_projectclassdtl2_tbl_maintable_list', '');

                    if (callBackFunction)
                    {
                        callBackFunction.success();
                    }

                }
            });
        },

        setSearchData: function (callBackFunction)
        {
            try
            {
                //根据projclassid设置默认的查询条件
                controlObj.singledropdownlistid('search_dropdown_sys_projectclassid_tbl_maintable_list', _pr_projectClassId);

                that.initSearchProjDtlControlByProjclassID(_pr_projectClassId, {
                    success: function ()
                    {
                        controlObj.multidropdownlistid('search_dropdown_sys_projectclassdtl1_tbl_maintable_list', '');
                        controlObj.multidropdownlistid('search_dropdown_sys_projectclassdtl2_tbl_maintable_list', '');
                    }
                });

                switch (that._pr_searchtype)
                {
                    case "1":
                        if (that._pr_searchcontent.type1 != undefined)
                        {
                            //简单查询
                            $("#txt_command_search_tbl_maintable_list").val(that._pr_searchcontent.type1);
                        }

                        break;
                    case "2":
                        if (that._pr_searchcontent.type2 != undefined)
                        {
                            //高级查询
                            var tbl_maintable_list = that._pr_searchcontent.type2;

                            controlObj.text('search_txt_sys_processinsid_tbl_maintable_list', tbl_maintable_list.sys_processinsid);

                            controlObj.text('search_txt_fk_tbl_maintable_sys_id_tbl_maintable_list', tbl_maintable_list.fk_tbl_maintable_sys_id);

                            controlObj.text('search_txt_fk_workflow_sys_id_tbl_maintable_list', tbl_maintable_list.fk_workflow_sys_id);

                            controlObj.text('search_txt_value1_tbl_maintable_list', tbl_maintable_list.value1);

                            controlObj.text('search_txt_value2_tbl_maintable_list', tbl_maintable_list.value2);

                            controlObj.text('search_txt_value3_tbl_maintable_list', tbl_maintable_list.value3);

                            controlObj.text('search_txt_value4_tbl_maintable_list', tbl_maintable_list.value4);

                            controlObj.text('search_txt_value5_tbl_maintable_list', tbl_maintable_list.value5);

                            controlObj.text('search_txt_value6_tbl_maintable_list', tbl_maintable_list.value6);

                            controlObj.text('search_txt_value7_tbl_maintable_list', tbl_maintable_list.value7);

                            controlObj.text('search_txt_value8_tbl_maintable_list', tbl_maintable_list.value8);

                            controlObj.text('search_txt_value9_tbl_maintable_list', tbl_maintable_list.value9);

                            controlObj.text('search_txt_value10_tbl_maintable_list', tbl_maintable_list.value10);

                            controlObj.multidropdownlistid('search_dropdown_sys_delflag_tbl_maintable_list', tbl_maintable_list.sys_delflag);

                            controlObj.text('search_txt_sys_processnextuser_tbl_maintable_list', tbl_maintable_list.sys_processnextuser);


                            controlObj.multidropdownlistid('search_dropdown_sys_first_tbl_maintable_list', tbl_maintable_list.sys_first);


                            controlObj.singledropdownlistid('search_dropdown_sys_projectclassid_tbl_maintable_list', tbl_maintable_list.sys_projectclassid);

                            that.initSearchProjDtlControlByProjclassID(tbl_maintable_list.sys_projectclassid, {
                                success: function ()
                                {
                                    controlObj.multidropdownlistid('search_dropdown_sys_projectclassdtl1_tbl_maintable_list', tbl_maintable_list.sys_projectclassdtl1);

                                    controlObj.multidropdownlistid('search_dropdown_sys_projectclassdtl2_tbl_maintable_list', tbl_maintable_list.sys_projectclassdtl2);

                                }
                            });

                            controlObj.text('search_txt_shpid_tbl_maintable_list', tbl_maintable_list.shpid);

                            controlObj.text('search_txt_xmmc_tbl_maintable_list', tbl_maintable_list.xmmc);

                            controlObj.multidropdownlistid('search_dropdown_xzqy_tbl_maintable_list', tbl_maintable_list.xzqyid);

                            controlObj.text('search_txt_dwmc_tbl_maintable_list', tbl_maintable_list.dwmc);

                            controlObj.text('search_txt_lrr_tbl_maintable_list', tbl_maintable_list.lrr);


                            controlObj.datetime('search_datetime_lrrq_tbl_maintable_list_datefrom', 'search_datetime_lrrq_tbl_maintable_listtimefrom', tbl_maintable_list.lrrqfrom);
                            controlObj.datetime('search_datetime_lrrq_tbl_maintable_list_dateto', 'search_datetime_lrrq_tbl_maintable_list_timeto', tbl_maintable_list.lrrqto);


                            controlObj.text('search_txt_bz_tbl_maintable_list', tbl_maintable_list.bz);

                            controlObj.multidropdownlistid('search_dropdown_xmlx_tbl_maintable_list', tbl_maintable_list.xmlxid);




                        }


                        break;
                }




                callBackFunction.success();
            }
            catch (ex)
            {
                _blockMessage.show('setSearchData执行失败。<br/>' + ex.message, 'fail');
            }

        },

        getSearchData: function (callBackFunction)
        {
            try
            {
                switch (that._pr_searchtype)
                {

                    case "1":
                        //简单查询
                        that._pr_searchcontent.type1 = $("#txt_command_search_tbl_maintable_list").val();

                        break;
                    case "2":

                        //高级查询
                        var tbl_maintable_list = new Object();






                        tbl_maintable_list.sys_processinsid = controlObj.text('search_txt_sys_processinsid_tbl_maintable_list');



                        tbl_maintable_list.fk_tbl_maintable_sys_id = controlObj.text('search_txt_fk_tbl_maintable_sys_id_tbl_maintable_list');



                        tbl_maintable_list.fk_workflow_sys_id = controlObj.text('search_txt_fk_workflow_sys_id_tbl_maintable_list');



                        tbl_maintable_list.value1 = controlObj.text('search_txt_value1_tbl_maintable_list');



                        tbl_maintable_list.value2 = controlObj.text('search_txt_value2_tbl_maintable_list');



                        tbl_maintable_list.value3 = controlObj.text('search_txt_value3_tbl_maintable_list');



                        tbl_maintable_list.value4 = controlObj.text('search_txt_value4_tbl_maintable_list');



                        tbl_maintable_list.value5 = controlObj.text('search_txt_value5_tbl_maintable_list');



                        tbl_maintable_list.value6 = controlObj.text('search_txt_value6_tbl_maintable_list');



                        tbl_maintable_list.value7 = controlObj.text('search_txt_value7_tbl_maintable_list');



                        tbl_maintable_list.value8 = controlObj.text('search_txt_value8_tbl_maintable_list');



                        tbl_maintable_list.value9 = controlObj.text('search_txt_value9_tbl_maintable_list');



                        tbl_maintable_list.value10 = controlObj.text('search_txt_value10_tbl_maintable_list');



                        tbl_maintable_list.sys_delflag = controlObj.multidropdownlistid('search_dropdown_sys_delflag_tbl_maintable_list');



                        tbl_maintable_list.sys_processnextuser = controlObj.text('search_txt_sys_processnextuser_tbl_maintable_list');



                        tbl_maintable_list.sys_projectclassdtl1 = controlObj.multidropdownlistid('search_dropdown_sys_projectclassdtl1_tbl_maintable_list');



                        tbl_maintable_list.sys_projectclassdtl2 = controlObj.multidropdownlistid('search_dropdown_sys_projectclassdtl2_tbl_maintable_list');



                        tbl_maintable_list.sys_first = controlObj.multidropdownlistid('search_dropdown_sys_first_tbl_maintable_list');



                        tbl_maintable_list.sys_projectclassid = controlObj.singledropdownlistid('search_dropdown_sys_projectclassid_tbl_maintable_list');



                        tbl_maintable_list.shpid = controlObj.text('search_txt_shpid_tbl_maintable_list');



                        tbl_maintable_list.xmmc = controlObj.text('search_txt_xmmc_tbl_maintable_list');



                        tbl_maintable_list.xzqyid = controlObj.multidropdownlistid('search_dropdown_xzqy_tbl_maintable_list');



                        tbl_maintable_list.dwmc = controlObj.text('search_txt_dwmc_tbl_maintable_list');



                        tbl_maintable_list.lrr = controlObj.text('search_txt_lrr_tbl_maintable_list');



                        tbl_maintable_list.lrrqfrom = controlObj.datetime('search_datetime_lrrq_tbl_maintable_list_datefrom', 'search_datetime_lrrq_tbl_maintable_list_timefrom'); // datefrom + ' ' + timefrom;
                        tbl_maintable_list.lrrqto = controlObj.datetime('search_datetime_lrrq_tbl_maintable_list_dateto', 'search_datetime_lrrq_tbl_maintable_list_timeto'); //dateto + ' ' + timeto;




                        tbl_maintable_list.bz = controlObj.text('search_txt_bz_tbl_maintable_list');



                        tbl_maintable_list.xmlxid = controlObj.multidropdownlistid('search_dropdown_xmlx_tbl_maintable_list');





                        that._pr_searchcontent.type2 = tbl_maintable_list;
                        break;

                }

                callBackFunction.success();
            }
            catch (ex)
            {
                _blockMessage.show('that.getSearchData执行失败。<br/>' + ex.message, 'fail');
            }


        },

        checkSearchData: function (callBackFunction)
        {
            try
            {

                var tbl_maintable_list = that._pr_searchcontent.type2;
                var errorMessageHansMap = new hashMap();
                var errorMessagePlacementHansMap = new hashMap();



                if (tbl_maintable_list.sys_processinsid.length > 100)
                {

                    errorMessageHansMap.put('search_txt_sys_processinsid_tbl_maintable_list', '长度不能超过<a style="color:red">100</a>');
                    errorMessagePlacementHansMap.put('search_txt_sys_processinsid_tbl_maintable_list', 'top');
                }


                if (tbl_maintable_list.fk_tbl_maintable_sys_id.length > 100)
                {

                    errorMessageHansMap.put('search_txt_fk_tbl_maintable_sys_id_tbl_maintable_list', '长度不能超过<a style="color:red">100</a>');
                    errorMessagePlacementHansMap.put('search_txt_fk_tbl_maintable_sys_id_tbl_maintable_list', 'top');
                }


                if (tbl_maintable_list.fk_workflow_sys_id.length > 100)
                {

                    errorMessageHansMap.put('search_txt_fk_workflow_sys_id_tbl_maintable_list', '长度不能超过<a style="color:red">100</a>');
                    errorMessagePlacementHansMap.put('search_txt_fk_workflow_sys_id_tbl_maintable_list', 'top');
                }


                if (tbl_maintable_list.value1.length > 100)
                {

                    errorMessageHansMap.put('search_txt_value1_tbl_maintable_list', '长度不能超过<a style="color:red">100</a>');
                    errorMessagePlacementHansMap.put('search_txt_value1_tbl_maintable_list', 'top');
                }


                if (tbl_maintable_list.value2.length > 100)
                {

                    errorMessageHansMap.put('search_txt_value2_tbl_maintable_list', '长度不能超过<a style="color:red">100</a>');
                    errorMessagePlacementHansMap.put('search_txt_value2_tbl_maintable_list', 'top');
                }


                if (tbl_maintable_list.value3.length > 100)
                {

                    errorMessageHansMap.put('search_txt_value3_tbl_maintable_list', '长度不能超过<a style="color:red">100</a>');
                    errorMessagePlacementHansMap.put('search_txt_value3_tbl_maintable_list', 'top');
                }


                if (tbl_maintable_list.value4.length > 100)
                {

                    errorMessageHansMap.put('search_txt_value4_tbl_maintable_list', '长度不能超过<a style="color:red">100</a>');
                    errorMessagePlacementHansMap.put('search_txt_value4_tbl_maintable_list', 'top');
                }


                if (tbl_maintable_list.value5.length > 100)
                {

                    errorMessageHansMap.put('search_txt_value5_tbl_maintable_list', '长度不能超过<a style="color:red">100</a>');
                    errorMessagePlacementHansMap.put('search_txt_value5_tbl_maintable_list', 'top');
                }


                if (tbl_maintable_list.value6.length > 100)
                {

                    errorMessageHansMap.put('search_txt_value6_tbl_maintable_list', '长度不能超过<a style="color:red">100</a>');
                    errorMessagePlacementHansMap.put('search_txt_value6_tbl_maintable_list', 'top');
                }


                if (tbl_maintable_list.value7.length > 100)
                {

                    errorMessageHansMap.put('search_txt_value7_tbl_maintable_list', '长度不能超过<a style="color:red">100</a>');
                    errorMessagePlacementHansMap.put('search_txt_value7_tbl_maintable_list', 'top');
                }


                if (tbl_maintable_list.value8.length > 100)
                {

                    errorMessageHansMap.put('search_txt_value8_tbl_maintable_list', '长度不能超过<a style="color:red">100</a>');
                    errorMessagePlacementHansMap.put('search_txt_value8_tbl_maintable_list', 'top');
                }


                if (tbl_maintable_list.value9.length > 100)
                {

                    errorMessageHansMap.put('search_txt_value9_tbl_maintable_list', '长度不能超过<a style="color:red">100</a>');
                    errorMessagePlacementHansMap.put('search_txt_value9_tbl_maintable_list', 'top');
                }


                if (tbl_maintable_list.value10.length > 100)
                {

                    errorMessageHansMap.put('search_txt_value10_tbl_maintable_list', '长度不能超过<a style="color:red">100</a>');
                    errorMessagePlacementHansMap.put('search_txt_value10_tbl_maintable_list', 'top');
                }


                if (tbl_maintable_list.sys_delflag.length > 100)
                {
                    errorMessageHansMap.put('search_dropdown_sys_delflag_tbl_maintable_list', '长度不能超过<a style="color:red">100</a>');
                }


                if (tbl_maintable_list.sys_processnextuser.length > 100)
                {

                    errorMessageHansMap.put('search_txt_sys_processnextuser_tbl_maintable_list', '长度不能超过<a style="color:red">100</a>');
                    errorMessagePlacementHansMap.put('search_txt_sys_processnextuser_tbl_maintable_list', 'top');
                }


                if (tbl_maintable_list.sys_projectclassdtl1.length > 100)
                {
                    errorMessageHansMap.put('search_dropdown_sys_projectclassdtl1_tbl_maintable_list', '长度不能超过<a style="color:red">100</a>');
                }


                if (tbl_maintable_list.sys_projectclassdtl2.length > 100)
                {
                    errorMessageHansMap.put('search_dropdown_sys_projectclassdtl2_tbl_maintable_list', '长度不能超过<a style="color:red">100</a>');
                }


                if (tbl_maintable_list.sys_first.length > 100)
                {
                    errorMessageHansMap.put('search_dropdown_sys_first_tbl_maintable_list', '长度不能超过<a style="color:red">100</a>');
                }


                if (tbl_maintable_list.sys_projectclassid.length > 100)
                {
                    errorMessageHansMap.put('search_dropdown_sys_projectclassid_tbl_maintable_list', '长度不能超过<a style="color:red">100</a>');
                }


                if (tbl_maintable_list.shpid.length > 100)
                {

                    errorMessageHansMap.put('search_txt_shpid_tbl_maintable_list', '长度不能超过<a style="color:red">100</a>');
                    errorMessagePlacementHansMap.put('search_txt_shpid_tbl_maintable_list', 'top');
                }


                if (tbl_maintable_list.xmmc.length > 100)
                {

                    errorMessageHansMap.put('search_txt_xmmc_tbl_maintable_list', '长度不能超过<a style="color:red">100</a>');
                    errorMessagePlacementHansMap.put('search_txt_xmmc_tbl_maintable_list', 'top');
                }


                if (tbl_maintable_list.xzqyid.length > 100)
                {
                    errorMessageHansMap.put('search_dropdown_xzqy_tbl_maintable_list', '长度不能超过<a style="color:red">100</a>');
                }


                if (tbl_maintable_list.dwmc.length > 100)
                {

                    errorMessageHansMap.put('search_txt_dwmc_tbl_maintable_list', '长度不能超过<a style="color:red">100</a>');
                    errorMessagePlacementHansMap.put('search_txt_dwmc_tbl_maintable_list', 'top');
                }


                if (tbl_maintable_list.lrr.length > 100)
                {

                    errorMessageHansMap.put('search_txt_lrr_tbl_maintable_list', '长度不能超过<a style="color:red">100</a>');
                    errorMessagePlacementHansMap.put('search_txt_lrr_tbl_maintable_list', 'top');
                }




                if (tbl_maintable_list.bz.length > 100)
                {

                    errorMessageHansMap.put('search_txt_bz_tbl_maintable_list', '长度不能超过<a style="color:red">100</a>');
                    errorMessagePlacementHansMap.put('search_txt_bz_tbl_maintable_list', 'top');
                }


                if (tbl_maintable_list.xmlxid.length > 100)
                {
                    errorMessageHansMap.put('search_dropdown_xmlx_tbl_maintable_list', '长度不能超过<a style="color:red">100</a>');
                }




                if (errorMessageHansMap.keys().length > 0)
                {
                    that._validateMessage_search_model.show(errorMessageHansMap, errorMessagePlacementHansMap, false);
                    callBackFunction.fail();
                }
                else
                {
                    that._validateMessage_search_model.hidden();
                    callBackFunction.success();
                }
            }
            catch (ex)
            {
                _blockMessage.show('that.checkSearchData执行失败。<br/>' + ex.message, 'fail');
            }

        },

        creatSearchWhereClause: function (callBackFunction)
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
                                        //sys_id、shp_id、项目名称、业务类型、业务状态、数据状态、待办人、录入人、录入日期、项目类型、行政区域、备注、项目类型

                                        //   whereClause += " sys_delflag like '%" + vv[i] + "%' or ";

                                        whereClause += " sys_processnextuser like '%" + vv[i] + "%' or ";

                                        whereClause += " sys_projectclassdtl1_name like '%" + vv[i] + "%' or ";

                                        whereClause += " sys_projectclassdtl2_name like '%" + vv[i] + "%' or ";

                                        //   whereClause += " sys_first like '%" + vv[i] + "%' or ";

                                        whereClause += " sys_projectclassid_name like '%" + vv[i] + "%' or ";

                                        whereClause += " shpid like '%" + vv[i] + "%' or ";

                                        whereClause += " sys_id like '%" + vv[i] + "%' or ";

                                        whereClause += " xmmc like '%" + vv[i] + "%' or ";

                                        whereClause += " xzqy like '%" + vv[i] + "%' or ";

                                        //whereClause += " dwmc like '%" + vv[i] + "%' or ";

                                        whereClause += " lrr like '%" + vv[i] + "%' or ";

                                        whereClause += " to_char(lrrq,'yyyy-MM-dd hh24:mi:ss') like '%" + vv[i] + "%' or ";

                                        whereClause += " bz like '%" + vv[i] + "%' or ";

                                        whereClause += " xmlx like '%" + vv[i] + "%' or ";


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
                            that._whereClauseString = whereClause;
                        }



                    }
                    break;
                case "2":
                    {
                        if (that._pr_searchcontent.type2 != undefined)
                        {

                            var tbl_maintable_list = that._pr_searchcontent.type2;



                            if (tbl_maintable_list.sys_delflag.length > 0)
                            {
                                var elementArray = tbl_maintable_list.sys_delflag.split(',');
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
                                    whereClause += "(('^'||sys_delflag||'^') like ('%^'||'" + elementArray[i] + "'||'^%')) ";

                                });
                                whereClause += ') and ';
                            }


                            if (tbl_maintable_list.sys_processnextuser.length > 0)
                            {
                                whereClause += " sys_processnextuser like '%" + tbl_maintable_list.sys_processnextuser + "%' and ";
                            }


                            if (tbl_maintable_list.sys_projectclassdtl1.length > 0)
                            {
                                var elementArray = tbl_maintable_list.sys_projectclassdtl1.split(',');
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
                                    whereClause += "(('^'||sys_projectclassdtl1||'^') like ('%^'||'" + elementArray[i] + "'||'^%')) ";

                                });
                                whereClause += ') and ';
                            }


                            if (tbl_maintable_list.sys_projectclassdtl2.length > 0)
                            {
                                var elementArray = tbl_maintable_list.sys_projectclassdtl2.split(',');
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
                                    whereClause += "(('^'||sys_projectclassdtl2||'^') like ('%^'||'" + elementArray[i] + "'||'^%')) ";

                                });
                                whereClause += ') and ';
                            }


                            if (tbl_maintable_list.sys_first.length > 0)
                            {
                                var elementArray = tbl_maintable_list.sys_first.split(',');
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
                                    whereClause += "(('^'||sys_first||'^') like ('%^'||'" + elementArray[i] + "'||'^%')) ";

                                });
                                whereClause += ') and ';
                            }


                            if (tbl_maintable_list.sys_projectclassid.length > 0)
                            {
                                var elementArray = tbl_maintable_list.sys_projectclassid.split(',');
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
                                    whereClause += "(('^'||sys_projectclassid||'^') like ('%^'||'" + elementArray[i] + "'||'^%')) ";

                                });
                                whereClause += ') and ';
                            }


                            if (tbl_maintable_list.shpid.length > 0)
                            {
                                whereClause += " shpid like '%" + tbl_maintable_list.shpid + "%' and ";
                            }


                            if (tbl_maintable_list.xmmc.length > 0)
                            {
                                whereClause += " xmmc like '%" + tbl_maintable_list.xmmc + "%' and ";
                            }


                            if (tbl_maintable_list.xzqyid.length > 0)
                            {
                                var elementArray = tbl_maintable_list.xzqyid.split(',');
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
                                    whereClause += "(('^'||xzqyid||'^') like ('%^'||'" + elementArray[i] + "'||'^%')) ";

                                });
                                whereClause += ') and ';
                            }


                            if (tbl_maintable_list.dwmc.length > 0)
                            {
                                whereClause += " dwmc like '%" + tbl_maintable_list.dwmc + "%' and ";
                            }


                            if (tbl_maintable_list.lrr.length > 0)
                            {
                                whereClause += " lrr like '%" + tbl_maintable_list.lrr + "%' and ";
                            }


                            if (tbl_maintable_list.lrrqfrom != '1900-01-01 00:00:00')
                            {
                                whereClause += " lrrq >= to_date('" + tbl_maintable_list.lrrqfrom + "','yyyy-MM-dd hh24:mi:ss') and ";
                            }

                            if (tbl_maintable_list.lrrqto != '1900-01-01 00:00:00')
                            {
                                whereClause += " lrrq <= to_date('" + tbl_maintable_list.lrrqto + "','yyyy-MM-dd hh24:mi:ss') and ";
                            }


                            if (tbl_maintable_list.bz.length > 0)
                            {
                                whereClause += " bz like '%" + tbl_maintable_list.bz + "%' and ";
                            }


                            if (tbl_maintable_list.xmlxid.length > 0)
                            {
                                var elementArray = tbl_maintable_list.xmlxid.split(',');
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
                                    whereClause += "(('^'||xmlxid||'^') like ('%^'||'" + elementArray[i] + "'||'^%')) ";

                                });
                                whereClause += ') and ';
                            }

                            if (whereClause.length > 0)
                            {
                                whereClause = whereClause.substr(0, whereClause.length - 4);
                            }
                        }


                        that._whereClauseString = whereClause;

                    }
                    break;
            }


            if (that._baseWhereClauseString == '')
            {
                var parameterJson = {
                    sysUserIdString: basePageObj._userInfoJson.sys_userid,
                    projectClassIdString: _pr_projectClassId,
                    projectClassDtl1String: _pr_projectClassDtl1,
                    projectClassDtl2String: _pr_projectClassDtl2,
                    userInfoJsonString: basePageObj._userInfoJson
                };

                var data = {
                    parameterJsonString: JSON.stringify(parameterJson),
                    clientInf: _clientInf
                };


                doAjaxFunction(that._serviceUrl_tbl_maintable_detailall, 'GetMainTableQueryString', data, {
                    success: function (message)
                    {
                        that._baseWhereClauseString = message;
                        if (that._whereClauseString == '')
                        {
                            that._whereClauseString = that._baseWhereClauseString;
                        }
                        else
                        {
                            that._whereClauseString = '(' + that._whereClauseString + ') and (' + that._baseWhereClauseString + ')';
                        }

                        callBackFunction.success();
                    },
                    fail: function (message)
                    {
                        _blockMessage.show(that._serviceUrl_tbl_maintable_detailall + 'GetMainTableQueryString<br/>' + message, 'fail');
                    },
                    error: function (message)
                    {
                        _blockMessage.show(that._serviceUrl_tbl_maintable_detailall + 'GetMainTableQueryString<br/>' + message, 'fail');
                    }
                });
            }
            else
            {
                if (that._whereClauseString == '')
                {
                    that._whereClauseString = that._baseWhereClauseString;
                }
                else
                {
                    that._whereClauseString = '(' + that._whereClauseString + ') and (' + that._baseWhereClauseString + ')';
                }

                callBackFunction.success();
            }


        },

        clearSearchData: function ()
        {
            switch (that._pr_searchtype)
            {
                case "1":
                    if (that._pr_searchcontent.type2 == undefined)
                    {
                        that._pr_searchcontent.type2 = new Object();
                    }


                    that._pr_searchcontent.type2.sys_processinsid = '';
                    controlObj.text('search_txt_sys_processinsid_tbl_maintable_list', that._pr_searchcontent.type2.sys_processinsid);


                    that._pr_searchcontent.type2.fk_tbl_maintable_sys_id = '';
                    controlObj.text('search_txt_fk_tbl_maintable_sys_id_tbl_maintable_list', that._pr_searchcontent.type2.fk_tbl_maintable_sys_id);




                    that._pr_searchcontent.type2.fk_workflow_sys_id = '';
                    controlObj.text('search_txt_fk_workflow_sys_id_tbl_maintable_list', that._pr_searchcontent.type2.fk_workflow_sys_id);




                    that._pr_searchcontent.type2.value1 = '';
                    controlObj.text('search_txt_value1_tbl_maintable_list', that._pr_searchcontent.type2.value1);




                    that._pr_searchcontent.type2.value2 = '';
                    controlObj.text('search_txt_value2_tbl_maintable_list', that._pr_searchcontent.type2.value2);




                    that._pr_searchcontent.type2.value3 = '';
                    controlObj.text('search_txt_value3_tbl_maintable_list', that._pr_searchcontent.type2.value3);




                    that._pr_searchcontent.type2.value4 = '';
                    controlObj.text('search_txt_value4_tbl_maintable_list', that._pr_searchcontent.type2.value4);




                    that._pr_searchcontent.type2.value5 = '';
                    controlObj.text('search_txt_value5_tbl_maintable_list', that._pr_searchcontent.type2.value5);




                    that._pr_searchcontent.type2.value6 = '';
                    controlObj.text('search_txt_value6_tbl_maintable_list', that._pr_searchcontent.type2.value6);




                    that._pr_searchcontent.type2.value7 = '';
                    controlObj.text('search_txt_value7_tbl_maintable_list', that._pr_searchcontent.type2.value7);




                    that._pr_searchcontent.type2.value8 = '';
                    controlObj.text('search_txt_value8_tbl_maintable_list', that._pr_searchcontent.type2.value8);




                    that._pr_searchcontent.type2.value9 = '';
                    controlObj.text('search_txt_value9_tbl_maintable_list', that._pr_searchcontent.type2.value9);




                    that._pr_searchcontent.type2.value10 = '';
                    controlObj.text('search_txt_value10_tbl_maintable_list', that._pr_searchcontent.type2.value10);



                    that._pr_searchcontent.type2.sys_delflag = '';
                    controlObj.multidropdownlistid('search_dropdown_sys_delflag_tbl_maintable_list', that._pr_searchcontent.type2.sys_delflag);




                    that._pr_searchcontent.type2.sys_processnextuser = '';
                    controlObj.text('search_txt_sys_processnextuser_tbl_maintable_list', that._pr_searchcontent.type2.sys_processnextuser);



                    that._pr_searchcontent.type2.sys_projectclassdtl1 = '';
                    controlObj.multidropdownlistid('search_dropdown_sys_projectclassdtl1_tbl_maintable_list', that._pr_searchcontent.type2.sys_projectclassdtl1);



                    that._pr_searchcontent.type2.sys_projectclassdtl2 = '';
                    controlObj.multidropdownlistid('search_dropdown_sys_projectclassdtl2_tbl_maintable_list', that._pr_searchcontent.type2.sys_projectclassdtl2);



                    that._pr_searchcontent.type2.sys_first = '';
                    controlObj.multidropdownlistid('search_dropdown_sys_first_tbl_maintable_list', that._pr_searchcontent.type2.sys_first);



                    that._pr_searchcontent.type2.sys_projectclassid = '';
                    controlObj.singledropdownlistid('search_dropdown_sys_projectclassid_tbl_maintable_list', that._pr_searchcontent.type2.sys_projectclassid);




                    that._pr_searchcontent.type2.shpid = '';
                    controlObj.text('search_txt_shpid_tbl_maintable_list', that._pr_searchcontent.type2.shpid);




                    that._pr_searchcontent.type2.xmmc = '';
                    controlObj.text('search_txt_xmmc_tbl_maintable_list', that._pr_searchcontent.type2.xmmc);



                    that._pr_searchcontent.type2.xzqyid = '';
                    controlObj.multidropdownlistid('search_dropdown_xzqy_tbl_maintable_list', that._pr_searchcontent.type2.xzqyid);




                    that._pr_searchcontent.type2.dwmc = '';
                    controlObj.text('search_txt_dwmc_tbl_maintable_list', that._pr_searchcontent.type2.dwmc);




                    that._pr_searchcontent.type2.lrr = '';
                    controlObj.text('search_txt_lrr_tbl_maintable_list', that._pr_searchcontent.type2.lrr);



                    that._pr_searchcontent.type2.lrrqfrom = ('1900-01-01 00:00:00');
                    that._pr_searchcontent.type2.lrrqto = ('1900-01-01 00:00:00');

                    controlObj.datetime('search_datetime_lrrq_tbl_maintable_list_datefrom', 'search_datetime_lrrq_tbl_maintable_list_timefrom', that._pr_searchcontent.type2.lrrqfrom);
                    controlObj.datetime('search_datetime_lrrq_tbl_maintable_list_dateto', 'search_datetime_lrrq_tbl_maintable_list_timeto', that._pr_searchcontent.type2.lrrqto);





                    that._pr_searchcontent.type2.bz = '';
                    controlObj.text('search_txt_bz_tbl_maintable_list', that._pr_searchcontent.type2.bz);



                    that._pr_searchcontent.type2.xmlxid = '';
                    controlObj.multidropdownlistid('search_dropdown_xmlx_tbl_maintable_list', that._pr_searchcontent.type2.xmlxid);







                    break;
                case "2":
                    if (that._pr_searchcontent.type1 == undefined)
                    {
                        that._pr_searchcontent.type1 = '';
                    }

                    $("#txt_command_search_tbl_maintable_list").val('');
                    break;
            }

        },

        btn_command_search_onclick: function ()
        {
            try
            {
                switch (that._pr_searchtype)
                {
                    case "1":
                        that.getSearchData({
                            success: function ()
                            {
                                that.creatSearchWhereClause({
                                    success: function ()
                                    {
                                        that.clearSearchData();

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

        btn_command_search_1_onclick: function ()
        {
            that._pr_searchtype = '1';
            $('#btn_command_search_tbl_maintable_list').html('简单查询');
            $('#txt_command_search_tbl_maintable_list').removeAttr('disabled');
        },

        btn_command_search_2_onclick: function ()
        {

            that._pr_searchtype = '2';
            $('#btn_command_search_tbl_maintable_list').html('高级查询');
            $('#txt_command_search_tbl_maintable_list').attr('disabled', 'disabled');

            $('#div_search_modal_tbl_maintable_list').modal('show');
        },

        btn_search_modal_search_onclick: function ()
        {

            that.getSearchData({
                success: function ()
                {
                    that.checkSearchData({
                        success: function ()
                        {
                            that.creatSearchWhereClause({
                                success: function ()
                                {

                                    that.clearSearchData();

                                    $('#div_search_modal_tbl_maintable_list').modal('hide')
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

        btn_search_modal_cancle_onclick: function ()
        {
            that._validateMessage_search_model.hidden();
            $('#div_search_modal_tbl_maintable_list').modal('hide');

            that._pr_searchtype = '1';
            $('#btn_command_search_tbl_maintable_list').html('简单查询');
            $('#txt_command_search_tbl_maintable_list').removeAttr('disabled');
        },

        btn_command_search_xs_onclick: function ()
        {
            that._pr_searchtype = '2';
            $('#btn_command_search_tbl_maintable_list').html('高级查询');
            $('#txt_command_search_tbl_maintable_list').attr('disabled', 'disabled');

            $('#div_search_modal_tbl_maintable_list').modal('show');
        },

        //===========select================

        //============copy=============

        //设置为空即可实现不分页
        _pageSize_copy: '5',
        _gridselectids_copy: '',
        _gridpageindex_copy: 1,

        _ladda_btn_copy_modal_search: null,
        _ladda_btn_copy_modal_copy: null,

        btn_command_copy: function (callBackFunction)
        {

            $('#div_copy_modal_tbl_maintable_list').modal('show');
        },

        initCopyGrid: function (callBackFunction)
        {
            try
            {
                var gridHeight = 300;

                $('#copy_table_grid_tbl_maintable_list_modal').bootstrapTable({
                    cache: false,
                    height: gridHeight,
                    striped: true,
                    pagination: true,
                    pageSize: that._pageSize_copy,
                    pageList: [that._pageSize_copy],
                    pageNumber: that._gridpageindex_copy,
                    search: false,
                    showColumns: false,
                    singleSelect: true,
                    showRefresh: false,
                    clickToSelect: true,
                    idField: 'sys_id',
                    sidePagination: 'webserver',
                    columns: [
                         {
                             field: '_checkbox', checkbox: true,
                             formatter: function (value, row, index)
                             {
                                 if (('^' + that._gridselectids_copy + '^').indexOf('^' + row.sys_id + '^') > -1)
                                 {
                                     return {
                                         disabled: false,
                                         checked: true
                                     }
                                 }
                                 return value;
                             }
                         },
                     {
                         field: 'sys_id', title: '项目主键',
                         align: 'center',
                         valign: 'middle',
                         visible: true,
                         sortable: true
                     },
                         {
                             field: 'xmmc', title: '项目名称',
                             align: 'center',
                             valign: 'middle',
                             visible: true,
                             sortable: true
                         },
                     {
                         field: 'sys_creatdate', title: '创建时间',
                         align: 'center',
                         valign: 'middle',
                         visible: true,
                         sortable: true
                     }
                    ],
                    onPageChange: function (size, number)
                    {
                        that._gridpageindex_copy = number;

                        that.bindCopyGrid();
                    },
                    onLoadSuccess: function (data)
                    {
                    },
                    onCheck: function (row)
                    {
                        that._gridselectids_copy = '';
                        that._gridselectids_copy = row.sys_id;
                    },
                    onUncheck: function (row)
                    {
                        that._gridselectids_copy = ('^' + that._gridselectids_copy + '^').replaceAll('^' + row.sys_id + '^', '^');
                        that._gridselectids_copy = that._gridselectids_copy.trimStartEnd('^');

                    },
                });

                //模态窗口
                $('#div_copy_modal_tbl_maintable_list').modal({
                    keyboard: false,
                    backdrop: 'static',
                    show: false
                });

                callBackFunction.success();
            }
            catch (ex)
            {
                _blockMessage.show('initCopyGrid执行失败<br/>' + ex.message, 'fail');
            }
        },

        bindCopyGrid: function (callBackFunction)
        {
            var whereClause = "sys_projectclassid = '" + _pr_projectClassId + "' and sys_delflag ='0' ";
            var vv = $('#copy_txt_querycondition_tbl_maintable_list').val();
            if (vv != '')
            {
                whereClause += "and xmmc like '%" + vv + "%'";
            }
            var orderByString = ' sys_id desc';
            var columnsString = 'sys_id^xmmc^sys_creatdate';
          
            var data = {
                whereString: whereClause,
                orderByString: orderByString,
                columnsString: columnsString,
                pageSizeString: that._pageSize_copy,
                pageIndexString: that._gridpageindex_copy,
                clientInf: _clientInf
            };

            doAjaxFunction(that._serviceUrl, 'GetQueryCopyResult', data, {
                success: function (result)
                {
                    var messageJson = (new Function("", "return " + result))();

                    $('#copy_table_grid_tbl_maintable_list_modal').bootstrapTable("loadJson", messageJson);

                    if (messageJson.total == '0')
                    {
                        $('#btn_copy_modal_copy_tbl_maintable_list').addClass('hidden');
                    }
                    else
                    {
                        $('#btn_copy_modal_copy_tbl_maintable_list').removeClass('hidden');
                    }


                    if (callBackFunction != undefined && callBackFunction != null)
                    {
                        callBackFunction.success();
                    }
                },
                fail: function (message)
                {
                    _blockMessage.show('bindCopyGrid执行失败<br/>' + message, 'fail');
                }
            });
        },

        btn_copy_modal_search_onclick: function ()
        {
            that._ladda_btn_copy_modal_search.start();

            that.bindCopyGrid({
                success: function ()
                {
                    that._ladda_btn_copy_modal_search.stop();
                },
                fail: function (message)
                {
                    that._ladda_btn_copy_modal_search.stop();
                    _alertMessage.show('查询失败<br/>' + message, 'fail');
                }
            });
        },

        btn_copy_modal_copy_onclick: function ()
        {

            that._ladda_btn_copy_modal_copy.start();

            var selections = $('#copy_table_grid_tbl_maintable_list_modal').bootstrapTable("getSelections");
            if (selections.length > 0)
            {
                var data = {
                    sys_id: that._gridselectids_copy,
                    clientInf: _clientInf
                };

                doAjaxFunction(that._serviceUrl, 'CopyData', data, {
                    success: function (result)
                    {
                        that.bindGrid({
                            success: function ()
                            {
                                that._ladda_btn_copy_modal_copy.stop();
                                $('#div_copy_modal_tbl_maintable_list').modal('hide');
                                tblMainTableButtonObj._ladda_current_btn_command.stop();

                            }
                        });

                    },
                    fail: function (message)
                    {
                        that._ladda_btn_copy_modal_copy.stop();

                        _alertMessage.show('复制数据执行失败<br/>' + message, 'fail');
                    }
                });

            } else
            {
                that._ladda_btn_copy_modal_copy.stop();
                _alertMessage.show('未选择任何行<br/>', 'fail');
            }
        },

        btn_copy_modal_cancle_onclick: function ()
        {
            $('#div_copy_modal_tbl_maintable_list').modal('hide');
            tblMainTableButtonObj._ladda_current_btn_command.stop();

        }

        //============copy=============
    };
    return that;
})();


