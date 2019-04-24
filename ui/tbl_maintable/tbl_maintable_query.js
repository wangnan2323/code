var _clientInf = '{userid:"",appcode:"54",appname:"",userip:"",usermac:"",username:"",userimg:""}';

var _blockMessage = null;
var _alertMessage = null;
var _resultMessage = null;
var _confirmMessage = null;


var _pr_appcode = '';
var _pr_projectClassId = '';
var _pr_projectClassDtl1 = '';
var _pr_projectClassDtl2 = '';



var tbl_maintable_query_Obj = (function ()
{
    'use strict';

    var that = {
        _serviceUrl_tbl_maintable_detailall: '//127.0.0.1/sara.dd.ldsw/service/service_tbl_maintable_detailall.asmx/',
        _serviceUrl: '//127.0.0.1/sara.dd.ldsw/service/service_tbl_maintable.asmx/',
        _pageSize: '10',//设置为空即可实现不分页
        _baseCodeHashMap: null,
        //_controlHashMap: null,
        //_control: null,
        _validateMessage: null,
        _pr_gridselectids: '',
        _pr_gridpageindex: 1,
        _pr_searchtype: '1',
        _pr_searchcontent: null,
        _whereClauseString: '',
        _baseWhereClauseString: '',
        init: function ()
        {
            try
            {

                _alertMessage = new alertMessage();
                _resultMessage = new resultMessage();
                _confirmMessage = new confirmMessage();
                _blockMessage = new blockMessage();
                _blockMessage.show('程序加载中...', 'loading');
                basePageObj.initBasePage({
                    success: function ()
                    {
                        //初始化参数
                        that.initParameter({
                            success: function ()
                            {
                                //初始化search
                                that.initSearchBaseCode({
                                    success: function ()
                                    {
                                        that.initSearchControl({
                                            success: function ()
                                            {
                                                that.setSearchData({
                                                    success: function ()
                                                    {
                                                        that.creatWhereClause({
                                                            success: function ()
                                                            {
                                                                that.initGrid({
                                                                    success: function ()
                                                                    {
                                                                        that.bindGrid({
                                                                            success: function ()
                                                                            {
                                                                                that._validateMessage = new validateMessage('btn_search_modal_search_tbl_maintable_query');

                                                                                that.setDisable(true);
                                                                                _blockMessage.hidden();
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
        initParameter: function (callBackFunction)
        {
            try
            {


                _pr_appcode = requestQuery('appcode');

                _pr_projectClassId = requestQuery('projectclassid');
                _pr_projectClassDtl1 = requestQuery('projectclassdtl1');
                _pr_projectClassDtl2 = requestQuery('projectclassdtl2');

                that._pr_gridselectids = requestQuery('gridselectids');
                that._pr_gridpageindex = requestQuery('gridpageIndex');
                that._pr_searchtype = requestQuery('searchtype');
                that._pr_searchcontent = requestQuery('searchcontent');



                _clientInf = '{userid:"' + basePageObj._userInfoJson.sys_userid + '",appcode:"' + _pr_appcode + '",appname:"",userip:"' + basePageObj._userInfoJson.ip + '",usermac:"' + basePageObj._userInfoJson.mac + '",username:"' + basePageObj._userInfoJson.sys_username + '",userimg:"' + basePageObj._userInfoJson.sys_photourl + '"}';

                if (_pr_projectClassId == undefined || _pr_projectClassId == null)
                {
                    _pr_projectClassId = '';
                }

                if (_pr_projectClassDtl1 == undefined || _pr_projectClassDtl1 == null)
                {
                    _pr_projectClassDtl1 = '';
                }

                if (_pr_projectClassDtl2 == undefined || _pr_projectClassDtl2 == null)
                {
                    _pr_projectClassDtl2 = '';
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
                        $('#btn_command_search_tbl_maintable_query').html('简单查询');
                        $('#txt_command_search_tbl_maintable_query').removeAttr("disabled");

                        break;
                    case "2":
                        $('#btn_command_search_tbl_maintable_query').html('高级查询');
                        $('#txt_command_search_tbl_maintable_query').attr("disabled", true);
                        break;
                }


                callBackFunction.success();
            }
            catch (ex)
            {
                _blockMessage.show('that.initParameter执行失败' + ex.message, 'fail');
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

                $('#table_grid_tbl_maintable_query').bootstrapTable({
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
                            }
                        },
                        {
                            field: 'sys_id', title: 'sys_id',
                            align: 'center', "class": 'hidden',
                            valign: 'middle',
                            visible: true,
                            sortable: true
                        },


                     {
                         field: 'shpid', title: 'shpid',
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
                          "class": 'hidden',
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
                      }
                      ,
                     {
                         field: 'sys_projectclassdtl1', title: '业务状态',
                         visible: false,
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
                         field: 'sys_projectclassdtl2', title: '数据类型',
                         "class": 'hidden',
                         visible: false,
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
                                return [
                            '<a class="view ml10" href="javascript:void(0)" title="浏览">',
                                '<i class="glyphicon glyphicon-eye-open"></i>',
                            '</a>'
                                ].join('');
                            },
                            events: {
                                'click .view': function (e, value, row, index)
                                {
                                    that.transToDetailPage(row, '2');

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
                        var rows = $('#table_grid_tbl_maintable_query').bootstrapTable('getSelections');
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
                        var rows = $('#table_grid_tbl_maintable_query').bootstrapTable('getData');
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
                var columnsString = 'sys_processinsid^fk_tbl_maintable_sys_id^value1^value2^value3^value4^value5^value6^value7^value8^value9^value10^sys_processnextuser^sys_projectclassdtl1^sys_projectclassdtl1_name^sys_projectclassdtl2^sys_projectclassdtl2_name^sys_first^sys_projectclassid^sys_projectclassid_name^shpid^xmmc^xzqy^dwmc^lrr^lrrq^bz^xmlx^sys_id';

                var data = { whereString: whereClause, orderByString: orderByString, columnsString: columnsString, pageSizeString: that._pageSize, pageIndexString: that._pr_gridpageindex, clientInf: _clientInf };

                doAjaxFunction(that._serviceUrl, 'GetList', data, {
                    success: function (result)
                    {
                        var messageJson = (new Function("", "return " + result))();

                        $('#table_grid_tbl_maintable_query').bootstrapTable("loadJson", messageJson);

                        that.gridSelectedChange();

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
            controlObj.singledropdownlistdisable('search_dropdown_sys_projectclassid_tbl_maintable_query', isDisable);

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
                                that.creatWhereClause({
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
            $('#btn_command_search_tbl_maintable_query').html('简单查询');
            $('#txt_command_search_tbl_maintable_query').removeAttr('disabled');
        },
        btn_command_search_2_onclick: function ()
        {

            that._pr_searchtype = '2';
            $('#btn_command_search_tbl_maintable_query').html('高级查询');
            $('#txt_command_search_tbl_maintable_query').attr('disabled', 'disabled');

            $('#div_search_modal_tbl_maintable_query').modal('show');
        },
        btn_search_modal_search_onclick: function ()
        {

            that.getSearchData({
                success: function ()
                {
                    that.checkSearchData({
                        success: function ()
                        {
                            that.creatWhereClause({
                                success: function ()
                                {

                                    that.clearSearchData();

                                    $('#div_search_modal_tbl_maintable_query').modal('hide')
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
            that._validateMessage.hidden();
            $('#div_search_modal_tbl_maintable_query').modal('hide');

            that._pr_searchtype = '1';
            $('#btn_command_search_tbl_maintable_query').html('简单查询');
            $('#txt_command_search_tbl_maintable_query').removeAttr('disabled');
        },
        btn_command_search_xs_onclick: function ()
        {
            that._pr_searchtype = '2';
            $('#btn_command_search_tbl_maintable_query').html('高级查询');
            $('#txt_command_search_tbl_maintable_query').attr('disabled', 'disabled');

            $('#div_search_modal_tbl_maintable_query').modal('show');
        },
        btn_command_clearselect_onclick: function ()
        {
            $('#table_grid_tbl_maintable_query').bootstrapTable('uncheckAll');
            that._pr_gridselectids = '';
            that.gridSelectedChange();


        },
        //===========transToDetailPage_tbl_maintable_query================
        transToDetailPage: function (row, pagetype)
        {

            var url = '../tbl_maintable/tbl_maintable_detailall.html';
            url += '?uid=' + basePageObj._userInfoJson.sys_userid;
            url += '&sys_id=' + row.sys_id;
            url += '&pagetype=' + pagetype;
            url += '&appcode=' + _pr_appcode;
            url += '&projectclassid=' + row.sys_projectclassid;

            //=======================跳入当前状态的详细信息页面=======================
            //url += '&projectclassdtl1=' + row.sys_projectclassdtl1;
            //=======================跳入归档状态的详细信息页面=======================
            var array = that._baseCodeHashMap.get('t_projclass_dtl1');
            var arr = $.grep(array, function (n, i)
            {
                return n.text == '归档';
            });
            url += '&projectclassdtl1=' + arr[0].id;


            url += '&projectclassdtl2=' + row.sys_projectclassdtl2;
            url += '&fromurl=../tbl_maintable/tbl_maintable_query.html';
            url += '&fromurlparam={';
            url += '"appcode":"' + _pr_appcode + '",';
            url += '"gridselectids":"' + that._pr_gridselectids + '",';
            url += '"gridpageindex":"' + that._pr_gridpageindex + '",';
            url += '"searchtype":"' + that._pr_searchtype + '",';
            url += '"projectclassid":"' + _pr_projectClassId + '",';
            url += '"projectclassdtl1":"' + _pr_projectClassDtl1 + '",';
            url += '"projectclassdtl2":"' + _pr_projectClassDtl2 + '",';
            url += '"searchcontent":' + JSON.stringify(that._pr_searchcontent) + '';
            url += '}';

            //window.location.href = url + '&random=' + parseInt(10000 * Math.random());

            commonObj.changeUrl(url, 'right-show');
        },
        //===========search================
        initSearchBaseCode: function (callBackFunction)
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
                        },
                        fail: function (message)
                        {
                            _blockMessage.show('querySqls<br/>' + message, 'fail');
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
        initSearchControl: function (callBackFunction)
        {
            try
            {
                //that._controlHashMap = new hashMap();
                //that._control = new control(that._controlHashMap);

                //单选下拉列表--采用复选模式
                var xzfqArray = that._baseCodeHashMap.get('servicecode_xzfq');
                var projclassidArray = that._baseCodeHashMap.get('servicecode_projclassid');
                var toggleArray = [{ id: '1', text: '是' }, { id: '0', text: '否' }];
                var emptyArray = [];
                controlObj.multidropdownlistinit('search_dropdown_sys_delflag_tbl_maintable_query', toggleArray);

                controlObj.multidropdownlistinit('search_dropdown_sys_projectclassdtl1_tbl_maintable_query', emptyArray);

                controlObj.multidropdownlistinit('search_dropdown_sys_projectclassdtl2_tbl_maintable_query', emptyArray);

                controlObj.multidropdownlistinit('search_dropdown_sys_first_tbl_maintable_query', toggleArray);

                controlObj.singledropdownlistinit('search_dropdown_sys_projectclassid_tbl_maintable_query', projclassidArray, that.search_dropdown_sys_projectclassid_onchange);

                controlObj.multidropdownlistinit('search_dropdown_xzqy_tbl_maintable_query', xzfqArray);

                controlObj.datetimeinit('search_datetime_lrrq_tbl_maintable_query_datefrom', 'search_datetime_lrrq_tbl_maintable_query_timefrom');
                controlObj.datetimeinit('search_datetime_lrrq_tbl_maintable_query_dateto', 'search_datetime_lrrq_tbl_maintable_query_timeto');

                controlObj.datetime('search_datetime_lrrq_tbl_maintable_query_datefrom', 'search_datetime_lrrq_tbl_maintable_query_timefrom', '1900-01-01 00:00:00');
                controlObj.datetime('search_datetime_lrrq_tbl_maintable_query_dateto', 'search_datetime_lrrq_tbl_maintable_query_timeto', '1900-01-01 00:00:00');

                controlObj.multidropdownlistinit('search_dropdown_xmlx_tbl_maintable_query', projclassidArray);

                //模态窗口
                $('#div_search_modal_tbl_maintable_query').modal({
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
            that.initProjDtlControlByProjclassID(changeEventParameter.val);
        },
        initProjDtlControlByProjclassID: function (projclassid, callBackFunction)
        {
            var sqlStringsJson = {
                t_projclass_dtl1: 'select projstate as id,value1 as text from t_projclass_dtl1 where projclassid = \'' + projclassid + '\' and value4>=0 order by to_number(sys_orderid)',
                t_projclass_dtl2: 'select projstate as id ,projname as text from t_projclass_dtl2  where projclassid = \'' + projclassid + '\''
            };

            commonObj.querySqls(sqlStringsJson, {
                success: function (resultJson)
                {
                    that._baseCodeHashMap.put('t_projclass_dtl1', resultJson["t_projclass_dtl1"]);
                    that._baseCodeHashMap.put('t_projclass_dtl2', resultJson["t_projclass_dtl2"]);

                    controlObj.multidropdownlistinit('search_dropdown_sys_projectclassdtl1_tbl_maintable_query', resultJson["t_projclass_dtl1"]);

                    controlObj.multidropdownlistinit('search_dropdown_sys_projectclassdtl2_tbl_maintable_query', resultJson["t_projclass_dtl2"]);

                    controlObj.multidropdownlistid('search_dropdown_sys_projectclassdtl1_tbl_maintable_query', '');

                    controlObj.multidropdownlistid('search_dropdown_sys_projectclassdtl2_tbl_maintable_query', '');

                    if (callBackFunction)
                    {
                        callBackFunction.success();
                    }

                },
                fail: function (message)
                {
                    _blockMessage.show('querySqls<br/>' + message, 'fail');
                }

            });
        },
        setSearchData: function (callBackFunction)
        {
            try
            {
                //根据projclassid设置默认的查询条件
                controlObj.singledropdownlistid('search_dropdown_sys_projectclassid_tbl_maintable_query', _pr_projectClassId);
                that.initProjDtlControlByProjclassID(_pr_projectClassId, {
                    success: function ()
                    {
                        controlObj.multidropdownlistid('search_dropdown_sys_projectclassdtl1_tbl_maintable_query', '');
                        controlObj.multidropdownlistid('search_dropdown_sys_projectclassdtl2_tbl_maintable_query', '');
                    }
                });
                switch (that._pr_searchtype)
                {
                    case "1":
                        if (that._pr_searchcontent.type1 != undefined)
                        {
                            //简单查询
                            $("#txt_command_search_tbl_maintable_query").val(that._pr_searchcontent.type1);
                        }

                        break;
                    case "2":
                        if (that._pr_searchcontent.type2 != undefined)
                        {
                            //高级查询
                            var tbl_maintable_query = that._pr_searchcontent.type2;

                            controlObj.text('search_txt_sys_processinsid_tbl_maintable_query', tbl_maintable_query.sys_processinsid);

                            controlObj.text('search_txt_fk_tbl_maintable_sys_id_tbl_maintable_query', tbl_maintable_query.fk_tbl_maintable_sys_id);

                            controlObj.text('search_txt_fk_workflow_sys_id_tbl_maintable_query', tbl_maintable_query.fk_workflow_sys_id);

                            controlObj.text('search_txt_value1_tbl_maintable_query', tbl_maintable_query.value1);

                            controlObj.text('search_txt_value2_tbl_maintable_query', tbl_maintable_query.value2);

                            controlObj.text('search_txt_value3_tbl_maintable_query', tbl_maintable_query.value3);

                            controlObj.text('search_txt_value4_tbl_maintable_query', tbl_maintable_query.value4);

                            controlObj.text('search_txt_value5_tbl_maintable_query', tbl_maintable_query.value5);

                            controlObj.text('search_txt_value6_tbl_maintable_query', tbl_maintable_query.value6);

                            controlObj.text('search_txt_value7_tbl_maintable_query', tbl_maintable_query.value7);

                            controlObj.text('search_txt_value8_tbl_maintable_query', tbl_maintable_query.value8);

                            controlObj.text('search_txt_value9_tbl_maintable_query', tbl_maintable_query.value9);

                            controlObj.text('search_txt_value10_tbl_maintable_query', tbl_maintable_query.value10);

                            controlObj.multidropdownlistid('search_dropdown_sys_delflag_tbl_maintable_query', tbl_maintable_query.sys_delflag);

                            controlObj.text('search_txt_sys_processnextuser_tbl_maintable_query', tbl_maintable_query.sys_processnextuser);


                            controlObj.multidropdownlistid('search_dropdown_sys_first_tbl_maintable_query', tbl_maintable_query.sys_first);


                            controlObj.singledropdownlistid('search_dropdown_sys_projectclassid_tbl_maintable_query', tbl_maintable_query.sys_projectclassid);

                            that.initProjDtlControlByProjclassID(tbl_maintable_query.sys_projectclassid, {
                                success: function ()
                                {
                                    controlObj.multidropdownlistid('search_dropdown_sys_projectclassdtl1_tbl_maintable_query', tbl_maintable_query.sys_projectclassdtl1);

                                    controlObj.multidropdownlistid('search_dropdown_sys_projectclassdtl2_tbl_maintable_query', tbl_maintable_query.sys_projectclassdtl2);

                                }
                            });

                            controlObj.text('search_txt_shpid_tbl_maintable_query', tbl_maintable_query.shpid);

                            controlObj.text('search_txt_xmmc_tbl_maintable_query', tbl_maintable_query.xmmc);

                            controlObj.multidropdownlistid('search_dropdown_xzqy_tbl_maintable_query', tbl_maintable_query.xzqyid);

                            controlObj.text('search_txt_dwmc_tbl_maintable_query', tbl_maintable_query.dwmc);

                            controlObj.text('search_txt_lrr_tbl_maintable_query', tbl_maintable_query.lrr);


                            controlObj.datetime('search_datetime_lrrq_tbl_maintable_query_datefrom', 'search_datetime_lrrq_tbl_maintable_querytimefrom', tbl_maintable_query.lrrqfrom);
                            controlObj.datetime('search_datetime_lrrq_tbl_maintable_query_dateto', 'search_datetime_lrrq_tbl_maintable_query_timeto', tbl_maintable_query.lrrqto);


                            controlObj.text('search_txt_bz_tbl_maintable_query', tbl_maintable_query.bz);

                            controlObj.multidropdownlistid('search_dropdown_xmlx_tbl_maintable_query', tbl_maintable_query.xmlxid);




                        }


                        break;
                }




                callBackFunction.success();
            }
            catch (ex)
            {
                _blockMessage.show('that.setSearchData执行失败。<br/>' + ex.message, 'fail');
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
                        that._pr_searchcontent.type1 = $("#txt_command_search_tbl_maintable_query").val();

                        break;
                    case "2":

                        //高级查询
                        var tbl_maintable_query = new Object();

                        tbl_maintable_query.sys_processinsid = controlObj.text('search_txt_sys_processinsid_tbl_maintable_query');



                        tbl_maintable_query.fk_tbl_maintable_sys_id = controlObj.text('search_txt_fk_tbl_maintable_sys_id_tbl_maintable_query');



                        tbl_maintable_query.fk_workflow_sys_id = controlObj.text('search_txt_fk_workflow_sys_id_tbl_maintable_query');



                        tbl_maintable_query.value1 = controlObj.text('search_txt_value1_tbl_maintable_query');



                        tbl_maintable_query.value2 = controlObj.text('search_txt_value2_tbl_maintable_query');



                        tbl_maintable_query.value3 = controlObj.text('search_txt_value3_tbl_maintable_query');



                        tbl_maintable_query.value4 = controlObj.text('search_txt_value4_tbl_maintable_query');



                        tbl_maintable_query.value5 = controlObj.text('search_txt_value5_tbl_maintable_query');



                        tbl_maintable_query.value6 = controlObj.text('search_txt_value6_tbl_maintable_query');



                        tbl_maintable_query.value7 = controlObj.text('search_txt_value7_tbl_maintable_query');



                        tbl_maintable_query.value8 = controlObj.text('search_txt_value8_tbl_maintable_query');



                        tbl_maintable_query.value9 = controlObj.text('search_txt_value9_tbl_maintable_query');



                        tbl_maintable_query.value10 = controlObj.text('search_txt_value10_tbl_maintable_query');



                        tbl_maintable_query.sys_delflag = controlObj.multidropdownlistid('search_dropdown_sys_delflag_tbl_maintable_query');



                        tbl_maintable_query.sys_processnextuser = controlObj.text('search_txt_sys_processnextuser_tbl_maintable_query');



                        tbl_maintable_query.sys_projectclassdtl1 = controlObj.multidropdownlistid('search_dropdown_sys_projectclassdtl1_tbl_maintable_query');



                        tbl_maintable_query.sys_projectclassdtl2 = controlObj.multidropdownlistid('search_dropdown_sys_projectclassdtl2_tbl_maintable_query');



                        tbl_maintable_query.sys_first = controlObj.multidropdownlistid('search_dropdown_sys_first_tbl_maintable_query');



                        tbl_maintable_query.sys_projectclassid = controlObj.singledropdownlistid('search_dropdown_sys_projectclassid_tbl_maintable_query');



                        tbl_maintable_query.shpid = controlObj.text('search_txt_shpid_tbl_maintable_query');



                        tbl_maintable_query.xmmc = controlObj.text('search_txt_xmmc_tbl_maintable_query');



                        tbl_maintable_query.xzqyid = controlObj.multidropdownlistid('search_dropdown_xzqy_tbl_maintable_query');



                        tbl_maintable_query.dwmc = controlObj.text('search_txt_dwmc_tbl_maintable_query');



                        tbl_maintable_query.lrr = controlObj.text('search_txt_lrr_tbl_maintable_query');



                        tbl_maintable_query.lrrqfrom = controlObj.datetime('search_datetime_lrrq_tbl_maintable_query_datefrom', 'search_datetime_lrrq_tbl_maintable_query_timefrom'); // datefrom + ' ' + timefrom;
                        tbl_maintable_query.lrrqto = controlObj.datetime('search_datetime_lrrq_tbl_maintable_query_dateto', 'search_datetime_lrrq_tbl_maintable_query_timeto'); //dateto + ' ' + timeto;




                        tbl_maintable_query.bz = controlObj.text('search_txt_bz_tbl_maintable_query');



                        tbl_maintable_query.xmlxid = controlObj.multidropdownlistid('search_dropdown_xmlx_tbl_maintable_query');





                        that._pr_searchcontent.type2 = tbl_maintable_query;
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

                var tbl_maintable_query = that._pr_searchcontent.type2;
                var errorMessageHansMap = new hashMap();
                var errorMessagePlacementHansMap = new hashMap();



                if (tbl_maintable_query.sys_processinsid.length > 100)
                {

                    errorMessageHansMap.put('search_txt_sys_processinsid_tbl_maintable_query', '长度不能超过<a style="color:red">100</a>');
                    errorMessagePlacementHansMap.put('search_txt_sys_processinsid_tbl_maintable_query', 'top');
                }


                if (tbl_maintable_query.fk_tbl_maintable_sys_id.length > 100)
                {

                    errorMessageHansMap.put('search_txt_fk_tbl_maintable_sys_id_tbl_maintable_query', '长度不能超过<a style="color:red">100</a>');
                    errorMessagePlacementHansMap.put('search_txt_fk_tbl_maintable_sys_id_tbl_maintable_query', 'top');
                }


                if (tbl_maintable_query.fk_workflow_sys_id.length > 100)
                {

                    errorMessageHansMap.put('search_txt_fk_workflow_sys_id_tbl_maintable_query', '长度不能超过<a style="color:red">100</a>');
                    errorMessagePlacementHansMap.put('search_txt_fk_workflow_sys_id_tbl_maintable_query', 'top');
                }


                if (tbl_maintable_query.value1.length > 100)
                {

                    errorMessageHansMap.put('search_txt_value1_tbl_maintable_query', '长度不能超过<a style="color:red">100</a>');
                    errorMessagePlacementHansMap.put('search_txt_value1_tbl_maintable_query', 'top');
                }


                if (tbl_maintable_query.value2.length > 100)
                {

                    errorMessageHansMap.put('search_txt_value2_tbl_maintable_query', '长度不能超过<a style="color:red">100</a>');
                    errorMessagePlacementHansMap.put('search_txt_value2_tbl_maintable_query', 'top');
                }


                if (tbl_maintable_query.value3.length > 100)
                {

                    errorMessageHansMap.put('search_txt_value3_tbl_maintable_query', '长度不能超过<a style="color:red">100</a>');
                    errorMessagePlacementHansMap.put('search_txt_value3_tbl_maintable_query', 'top');
                }


                if (tbl_maintable_query.value4.length > 100)
                {

                    errorMessageHansMap.put('search_txt_value4_tbl_maintable_query', '长度不能超过<a style="color:red">100</a>');
                    errorMessagePlacementHansMap.put('search_txt_value4_tbl_maintable_query', 'top');
                }


                if (tbl_maintable_query.value5.length > 100)
                {

                    errorMessageHansMap.put('search_txt_value5_tbl_maintable_query', '长度不能超过<a style="color:red">100</a>');
                    errorMessagePlacementHansMap.put('search_txt_value5_tbl_maintable_query', 'top');
                }


                if (tbl_maintable_query.value6.length > 100)
                {

                    errorMessageHansMap.put('search_txt_value6_tbl_maintable_query', '长度不能超过<a style="color:red">100</a>');
                    errorMessagePlacementHansMap.put('search_txt_value6_tbl_maintable_query', 'top');
                }


                if (tbl_maintable_query.value7.length > 100)
                {

                    errorMessageHansMap.put('search_txt_value7_tbl_maintable_query', '长度不能超过<a style="color:red">100</a>');
                    errorMessagePlacementHansMap.put('search_txt_value7_tbl_maintable_query', 'top');
                }


                if (tbl_maintable_query.value8.length > 100)
                {

                    errorMessageHansMap.put('search_txt_value8_tbl_maintable_query', '长度不能超过<a style="color:red">100</a>');
                    errorMessagePlacementHansMap.put('search_txt_value8_tbl_maintable_query', 'top');
                }


                if (tbl_maintable_query.value9.length > 100)
                {

                    errorMessageHansMap.put('search_txt_value9_tbl_maintable_query', '长度不能超过<a style="color:red">100</a>');
                    errorMessagePlacementHansMap.put('search_txt_value9_tbl_maintable_query', 'top');
                }


                if (tbl_maintable_query.value10.length > 100)
                {

                    errorMessageHansMap.put('search_txt_value10_tbl_maintable_query', '长度不能超过<a style="color:red">100</a>');
                    errorMessagePlacementHansMap.put('search_txt_value10_tbl_maintable_query', 'top');
                }


                if (tbl_maintable_query.sys_delflag.length > 100)
                {
                    errorMessageHansMap.put('search_dropdown_sys_delflag_tbl_maintable_query', '长度不能超过<a style="color:red">100</a>');
                }


                if (tbl_maintable_query.sys_processnextuser.length > 100)
                {

                    errorMessageHansMap.put('search_txt_sys_processnextuser_tbl_maintable_query', '长度不能超过<a style="color:red">100</a>');
                    errorMessagePlacementHansMap.put('search_txt_sys_processnextuser_tbl_maintable_query', 'top');
                }


                if (tbl_maintable_query.sys_projectclassdtl1.length > 100)
                {
                    errorMessageHansMap.put('search_dropdown_sys_projectclassdtl1_tbl_maintable_query', '长度不能超过<a style="color:red">100</a>');
                }


                if (tbl_maintable_query.sys_projectclassdtl2.length > 100)
                {
                    errorMessageHansMap.put('search_dropdown_sys_projectclassdtl2_tbl_maintable_query', '长度不能超过<a style="color:red">100</a>');
                }


                if (tbl_maintable_query.sys_first.length > 100)
                {
                    errorMessageHansMap.put('search_dropdown_sys_first_tbl_maintable_query', '长度不能超过<a style="color:red">100</a>');
                }


                if (tbl_maintable_query.sys_projectclassid.length > 100)
                {
                    errorMessageHansMap.put('search_dropdown_sys_projectclassid_tbl_maintable_query', '长度不能超过<a style="color:red">100</a>');
                }


                if (tbl_maintable_query.shpid.length > 100)
                {

                    errorMessageHansMap.put('search_txt_shpid_tbl_maintable_query', '长度不能超过<a style="color:red">100</a>');
                    errorMessagePlacementHansMap.put('search_txt_shpid_tbl_maintable_query', 'top');
                }


                if (tbl_maintable_query.xmmc.length > 100)
                {

                    errorMessageHansMap.put('search_txt_xmmc_tbl_maintable_query', '长度不能超过<a style="color:red">100</a>');
                    errorMessagePlacementHansMap.put('search_txt_xmmc_tbl_maintable_query', 'top');
                }


                if (tbl_maintable_query.xzqyid.length > 100)
                {
                    errorMessageHansMap.put('search_dropdown_xzqy_tbl_maintable_query', '长度不能超过<a style="color:red">100</a>');
                }


                if (tbl_maintable_query.dwmc.length > 100)
                {

                    errorMessageHansMap.put('search_txt_dwmc_tbl_maintable_query', '长度不能超过<a style="color:red">100</a>');
                    errorMessagePlacementHansMap.put('search_txt_dwmc_tbl_maintable_query', 'top');
                }


                if (tbl_maintable_query.lrr.length > 100)
                {

                    errorMessageHansMap.put('search_txt_lrr_tbl_maintable_query', '长度不能超过<a style="color:red">100</a>');
                    errorMessagePlacementHansMap.put('search_txt_lrr_tbl_maintable_query', 'top');
                }




                if (tbl_maintable_query.bz.length > 100)
                {

                    errorMessageHansMap.put('search_txt_bz_tbl_maintable_query', '长度不能超过<a style="color:red">100</a>');
                    errorMessagePlacementHansMap.put('search_txt_bz_tbl_maintable_query', 'top');
                }


                if (tbl_maintable_query.xmlxid.length > 100)
                {
                    errorMessageHansMap.put('search_dropdown_xmlx_tbl_maintable_query', '长度不能超过<a style="color:red">100</a>');
                }




                if (errorMessageHansMap.keys().length > 0)
                {
                    that._validateMessage.show(errorMessageHansMap, errorMessagePlacementHansMap, false);
                    callBackFunction.fail();
                }
                else
                {
                    that._validateMessage.hidden();
                    callBackFunction.success();
                }
            }
            catch (ex)
            {
                _blockMessage.show('that.checkSearchData执行失败。<br/>' + ex.message, 'fail');
            }

        },
        creatWhereClause: function (callBackFunction)
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

                            var tbl_maintable_query = that._pr_searchcontent.type2;



                            if (tbl_maintable_query.sys_delflag.length > 0)
                            {
                                var elementArray = tbl_maintable_query.sys_delflag.split(',');
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


                            if (tbl_maintable_query.sys_processnextuser.length > 0)
                            {
                                whereClause += " sys_processnextuser like '%" + tbl_maintable_query.sys_processnextuser + "%' and ";
                            }


                            if (tbl_maintable_query.sys_projectclassdtl1.length > 0)
                            {
                                var elementArray = tbl_maintable_query.sys_projectclassdtl1.split(',');
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


                            if (tbl_maintable_query.sys_projectclassdtl2.length > 0)
                            {
                                var elementArray = tbl_maintable_query.sys_projectclassdtl2.split(',');
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


                            if (tbl_maintable_query.sys_first.length > 0)
                            {
                                var elementArray = tbl_maintable_query.sys_first.split(',');
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


                            if (tbl_maintable_query.sys_projectclassid.length > 0)
                            {
                                var elementArray = tbl_maintable_query.sys_projectclassid.split(',');
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


                            if (tbl_maintable_query.shpid.length > 0)
                            {
                                whereClause += " shpid like '%" + tbl_maintable_query.shpid + "%' and ";
                            }


                            if (tbl_maintable_query.xmmc.length > 0)
                            {
                                whereClause += " xmmc like '%" + tbl_maintable_query.xmmc + "%' and ";
                            }


                            if (tbl_maintable_query.xzqyid.length > 0)
                            {
                                var elementArray = tbl_maintable_query.xzqyid.split(',');
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


                            if (tbl_maintable_query.dwmc.length > 0)
                            {
                                whereClause += " dwmc like '%" + tbl_maintable_query.dwmc + "%' and ";
                            }


                            if (tbl_maintable_query.lrr.length > 0)
                            {
                                whereClause += " lrr like '%" + tbl_maintable_query.lrr + "%' and ";
                            }


                            if (tbl_maintable_query.lrrqfrom != '1900-01-01 00:00:00')
                            {
                                whereClause += " lrrq >= to_date('" + tbl_maintable_query.lrrqfrom + "','yyyy-MM-dd hh24:mi:ss') and ";
                            }

                            if (tbl_maintable_query.lrrqto != '1900-01-01 00:00:00')
                            {
                                whereClause += " lrrq <= to_date('" + tbl_maintable_query.lrrqto + "','yyyy-MM-dd hh24:mi:ss') and ";
                            }


                            if (tbl_maintable_query.bz.length > 0)
                            {
                                whereClause += " bz like '%" + tbl_maintable_query.bz + "%' and ";
                            }


                            if (tbl_maintable_query.xmlxid.length > 0)
                            {
                                var elementArray = tbl_maintable_query.xmlxid.split(',');
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

            //去除逻辑删除的数据
            if (that._whereClauseString == '')
            {
                that._whereClauseString = " SYS_DELFLAG='0'";
            }
            else
            {
                that._whereClauseString = "(" + that._whereClauseString + ") and ( SYS_DELFLAG='0')";
            }

            if (that._baseWhereClauseString == '')
            {
                //在此处控制，项目的行政区域、projectClassIdString
                var xzfqArray = that._baseCodeHashMap.get('servicecode_xzfq');

                var xzfqString = '';
                $.each(xzfqArray, function (i, u)
                {
                    if (i == 0)
                    {
                        xzfqString += "'" + xzfqArray[i].id + "'";
                    }
                    else
                    {
                        xzfqString += ",'" + xzfqArray[i].id + "'";
                    }

                });

                var sqlString = "xzqyid in (" + xzfqString + ")";
                sqlString += " and sys_projectclassid = '" + _pr_projectClassId + "'";

                that._baseWhereClauseString = sqlString;
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
                    controlObj.text('search_txt_sys_processinsid_tbl_maintable_query', that._pr_searchcontent.type2.sys_processinsid);


                    that._pr_searchcontent.type2.fk_tbl_maintable_sys_id = '';
                    controlObj.text('search_txt_fk_tbl_maintable_sys_id_tbl_maintable_query', that._pr_searchcontent.type2.fk_tbl_maintable_sys_id);




                    that._pr_searchcontent.type2.fk_workflow_sys_id = '';
                    controlObj.text('search_txt_fk_workflow_sys_id_tbl_maintable_query', that._pr_searchcontent.type2.fk_workflow_sys_id);




                    that._pr_searchcontent.type2.value1 = '';
                    controlObj.text('search_txt_value1_tbl_maintable_query', that._pr_searchcontent.type2.value1);




                    that._pr_searchcontent.type2.value2 = '';
                    controlObj.text('search_txt_value2_tbl_maintable_query', that._pr_searchcontent.type2.value2);




                    that._pr_searchcontent.type2.value3 = '';
                    controlObj.text('search_txt_value3_tbl_maintable_query', that._pr_searchcontent.type2.value3);




                    that._pr_searchcontent.type2.value4 = '';
                    controlObj.text('search_txt_value4_tbl_maintable_query', that._pr_searchcontent.type2.value4);




                    that._pr_searchcontent.type2.value5 = '';
                    controlObj.text('search_txt_value5_tbl_maintable_query', that._pr_searchcontent.type2.value5);




                    that._pr_searchcontent.type2.value6 = '';
                    controlObj.text('search_txt_value6_tbl_maintable_query', that._pr_searchcontent.type2.value6);




                    that._pr_searchcontent.type2.value7 = '';
                    controlObj.text('search_txt_value7_tbl_maintable_query', that._pr_searchcontent.type2.value7);




                    that._pr_searchcontent.type2.value8 = '';
                    controlObj.text('search_txt_value8_tbl_maintable_query', that._pr_searchcontent.type2.value8);




                    that._pr_searchcontent.type2.value9 = '';
                    controlObj.text('search_txt_value9_tbl_maintable_query', that._pr_searchcontent.type2.value9);




                    that._pr_searchcontent.type2.value10 = '';
                    controlObj.text('search_txt_value10_tbl_maintable_query', that._pr_searchcontent.type2.value10);



                    that._pr_searchcontent.type2.sys_delflag = '';
                    controlObj.multidropdownlistid('search_dropdown_sys_delflag_tbl_maintable_query', that._pr_searchcontent.type2.sys_delflag);




                    that._pr_searchcontent.type2.sys_processnextuser = '';
                    controlObj.text('search_txt_sys_processnextuser_tbl_maintable_query', that._pr_searchcontent.type2.sys_processnextuser);



                    that._pr_searchcontent.type2.sys_projectclassdtl1 = '';
                    controlObj.multidropdownlistid('search_dropdown_sys_projectclassdtl1_tbl_maintable_query', that._pr_searchcontent.type2.sys_projectclassdtl1);



                    that._pr_searchcontent.type2.sys_projectclassdtl2 = '';
                    controlObj.multidropdownlistid('search_dropdown_sys_projectclassdtl2_tbl_maintable_query', that._pr_searchcontent.type2.sys_projectclassdtl2);



                    that._pr_searchcontent.type2.sys_first = '';
                    controlObj.multidropdownlistid('search_dropdown_sys_first_tbl_maintable_query', that._pr_searchcontent.type2.sys_first);



                    that._pr_searchcontent.type2.sys_projectclassid = '';
                    controlObj.singledropdownlistid('search_dropdown_sys_projectclassid_tbl_maintable_query', that._pr_searchcontent.type2.sys_projectclassid);




                    that._pr_searchcontent.type2.shpid = '';
                    controlObj.text('search_txt_shpid_tbl_maintable_query', that._pr_searchcontent.type2.shpid);




                    that._pr_searchcontent.type2.xmmc = '';
                    controlObj.text('search_txt_xmmc_tbl_maintable_query', that._pr_searchcontent.type2.xmmc);



                    that._pr_searchcontent.type2.xzqyid = '';
                    controlObj.multidropdownlistid('search_dropdown_xzqy_tbl_maintable_query', that._pr_searchcontent.type2.xzqyid);




                    that._pr_searchcontent.type2.dwmc = '';
                    controlObj.text('search_txt_dwmc_tbl_maintable_query', that._pr_searchcontent.type2.dwmc);




                    that._pr_searchcontent.type2.lrr = '';
                    controlObj.text('search_txt_lrr_tbl_maintable_query', that._pr_searchcontent.type2.lrr);



                    that._pr_searchcontent.type2.lrrqfrom = ('1900-01-01 00:00:00');
                    that._pr_searchcontent.type2.lrrqto = ('1900-01-01 00:00:00');

                    controlObj.datetime('search_datetime_lrrq_tbl_maintable_query_datefrom', 'search_datetime_lrrq_tbl_maintable_query_timefrom', that._pr_searchcontent.type2.lrrqfrom);
                    controlObj.datetime('search_datetime_lrrq_tbl_maintable_query_dateto', 'search_datetime_lrrq_tbl_maintable_query_timeto', that._pr_searchcontent.type2.lrrqto);





                    that._pr_searchcontent.type2.bz = '';
                    controlObj.text('search_txt_bz_tbl_maintable_query', that._pr_searchcontent.type2.bz);



                    that._pr_searchcontent.type2.xmlxid = '';
                    controlObj.multidropdownlistid('search_dropdown_xmlx_tbl_maintable_query', that._pr_searchcontent.type2.xmlxid);







                    break;
                case "2":
                    if (that._pr_searchcontent.type1 == undefined)
                    {
                        that._pr_searchcontent.type1 = '';
                    }

                    $("#txt_command_search_tbl_maintable_query").val('');
                    break;
            }

        },
        //===========select================
        gridSelectedChange: function ()
        {
            if (that._pr_gridselectids == '')
            {
                // ul_gridselect  cc-badge-ul  cc-badge-p  cc-badge-a
                $('#btn_command_clearselect_tbl_maintable_query').addClass('hidden');

            }
            else
            {
                $('#btn_command_clearselect_tbl_maintable_query').removeClass('hidden');
                var allcount = that._pr_gridselectids.split('^').length;
                var currentcount = $('#table_grid_tbl_maintable_query').bootstrapTable('getSelections').length;
                $('#btn_command_clearselect_tbl_maintable_query .cc-badge-p').html(currentcount + '/' + allcount);
            }
        }
    };
    return that;
})();




$(document).ready(function ()
{
    tbl_maintable_query_Obj.init();
});
