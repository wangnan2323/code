

var t_projstate_log_list_Obj = (function ()
{
    'use strict';
    var
        _serviceUrl = '//127.0.0.1/sara.dd.ldsw/service/service_t_projstate_log.asmx/',
        initParameter = function (callBackFunction)
        {
            try
            {
                //_pr_appcode = requestQuery('appcode');
                //_pr_gridpageindex_t_projstate_log_list_part = requestQuery('gridpageIndex');

                //_clientInf = '{userid:"' + basePageObj._userInfoJson.sys_userid + '",appcode:"' + _pr_appcode + '",appname:"",userip:"' + basePageObj._userInfoJson.ip + '",usermac:"' + basePageObj._userInfoJson.mac + '",username:"' + basePageObj._userInfoJson.sys_username + '",userimg:"' + basePageObj._userInfoJson.sys_photourl + '"}';

                if (!that._pr_maintable_sys_id)
                {
                    _blockMessage.show('maintable_sys_id参数接收失败', 'fail');


                } else
                {
                    callBackFunction.success();

                }
            }
            catch (ex)
            {
                _blockMessage.show('initParameter执行失败' + ex.message, 'fail');
            }

        },
        initGrid = function (callBackFunction)
        {
            try
            {
                var gridHeight = 250;


                $('#table_grid_t_projstate_log_list').bootstrapTable({
                    cache: false,
                    height: gridHeight,
                    striped: true,
                    pagination: false,
                    pageSize: that._pageSize,
                    pageList: [that._pageSize],
                    pageNumber: 1,
                    search: false,
                    showColumns: false,
                    showRefresh: false,
                    clickToSelect: true,
                    idField: 'sys_id',
                    sidePagination: 'webserver',
                    columns: [
                        {
                            field: 'sys_id', title: 'sys_id',
                            align: 'center',
                            valign: 'middle',
                            visible: false,
                            sortable: true
                        },
                     {
                         field: 'sys_creatuserid', title: '创建人id',
                         visible: false,
                         "class": 'cc-hidden-sm  cc-hidden-xs',
                         align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                         formatter: function (value, row, index) { return value; }
                     },

                     {
                         field: 'sys_creatdate', title: '操作时间',
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
                         field: 'sys_creatusername', title: '操作人',
                         "class": 'cc-hidden-sm  cc-hidden-xs',
                         align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                         formatter: function (value, row, index) { return value; }
                     },



                     {
                         field: 'sys_flag', title: '数据有效状态',
                         visible: false,
                         "class": 'cc-hidden-sm  cc-hidden-xs',
                         align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                         formatter: function (value, row, index) { return value; }
                     },



                     {
                         field: 'value1', title: '',
                         visible: false,
                         "class": 'cc-hidden-sm  cc-hidden-xs',
                         align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                         formatter: function (value, row, index) { return value; }
                     },

                     {
                         field: 'value2', title: '',
                         visible: false,
                         "class": 'cc-hidden-sm  cc-hidden-xs',
                         align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                         formatter: function (value, row, index) { return value; }
                     },



                     {
                         field: 'value3', title: '',
                         visible: false,
                         "class": 'cc-hidden-sm  cc-hidden-xs',
                         align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                         formatter: function (value, row, index) { return value; }
                     },



                     {
                         field: 'value4', title: '',
                         visible: false,
                         "class": 'cc-hidden-sm  cc-hidden-xs',
                         align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                         formatter: function (value, row, index) { return value; }
                     },



                     {
                         field: 'value5', title: '',
                         visible: false,
                         "class": 'cc-hidden-sm  cc-hidden-xs',
                         align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                         formatter: function (value, row, index) { return value; }
                     },



                     {
                         field: 'businessname', title: '业务表名称',
                         visible: false,
                         "class": 'cc-hidden-sm  cc-hidden-xs',
                         align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                         formatter: function (value, row, index) { return value; }
                     },



                     {
                         field: 'businessid', title: '业务表id',
                         visible: false,
                         "class": 'cc-hidden-sm  cc-hidden-xs',
                         align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                         formatter: function (value, row, index) { return value; }
                     },



                     {
                         field: 'fromstate', title: '业务状态[变更前]',
                         visible: false,
                         "class": 'cc-hidden-sm  cc-hidden-xs',
                         align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                         formatter: function (value, row, index) { return value; }
                     },



                     {
                         field: 'tostate', title: '业务状态[变更后]',
                         visible: false,
                         "class": 'cc-hidden-sm  cc-hidden-xs',
                         align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                         formatter: function (value, row, index) { return value; }
                     },



                     {
                         field: 'processsinsid', title: '流程实例id',
                         visible: false,
                         "class": 'cc-hidden-sm  cc-hidden-xs',
                         align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                         formatter: function (value, row, index) { return value; }
                     },



                     {
                         field: 'processdefid', title: '流程定义id',
                         visible: false,
                         "class": 'cc-hidden-sm  cc-hidden-xs',
                         align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                         formatter: function (value, row, index) { return value; }
                     },



                     {
                         field: 'workflowid', title: '审核流程id',
                         visible: false,
                         "class": 'cc-hidden-sm  cc-hidden-xs',
                         align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                         formatter: function (value, row, index) { return value; }
                     },

                     {
                         field: 'mac', title: '操作人物理地址',
                         "class": 'cc-hidden-sm  cc-hidden-xs',
                         align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                         formatter: function (value, row, index) { return value; }
                     },


                     {
                         field: 'ip', title: '操作人IP地址',
                         "class": 'cc-hidden-sm  cc-hidden-xs',
                         align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                         formatter: function (value, row, index) { return value; }
                     },

                     {
                         field: 'cznr', title: '操作内容',
                         "class": 'cc-hidden-sm  cc-hidden-xs',
                         align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                         formatter: function (value, row, index) { return value; }
                     },


                     {
                         field: 'remark', title: '备注',
                         "class": 'cc-hidden-sm  cc-hidden-xs',
                         align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                         formatter: function (value, row, index) { return value.returnStringRN(); }
                     }
                    ],
                    rowStyle: function (row, index)
                    {
                        //return {classes: 'active'//'success'//'info'//'warning' //'danger'};

                        return {};
                    },
                    onLoadSuccess: function (data)
                    {

                    }

                });

                callBackFunction.success();
            }
            catch (ex)
            {
                _blockMessage.show('initGrid执行失败<br/>' + ex.message, 'fail');
            }


        };
    var that = {

        _pageSize: '',

        _pr_maintable_sys_id: '',

        init: function (callBackFunction)
        {
            try
            {


                //初始化参数
                initParameter({
                    success: function ()
                    {

                        //creatWhereClause({
                        //    success: function ()
                        //    {
                                initGrid({
                                    success: function ()
                                    {
                                        that.bindGrid({
                                            success: function ()
                                            {
                                                callBackFunction.success();
                                            }
                                        });
                                    }
                                });

                        //    }
                        //});


                    }
                });


            }
            catch (ex)
            {
                _blockMessage.show('程序初始化失败。<br/>' + ex.message, 'fail');
            }
        },

        bindGrid: function (callBackFunction)
        {
            setTimeout(function ()
            {
                var orderByString = ' sys_creatdate desc';
                var data = { maintable_sys_id: that._pr_maintable_sys_id, orderByString: orderByString, pageSizeString: that._pageSize, pageIndexString: '', clientInf: _clientInf };

                doAjaxFunction(_serviceUrl, 'getLogListByMaintableSysId', data, {
                    success: function (result)
                    {
                        var messageJson = (new Function("", "return " + result))();

                        $('#table_grid_t_projstate_log_list').bootstrapTable("loadJson", messageJson);


                        if (callBackFunction != undefined && callBackFunction != null)
                        {
                            callBackFunction.success();
                        }
                    },
                    fail: function (message)
                    {
                        _blockMessage.show('bindGrid执行失败<br/>' + message, 'fail');
                    }
                });
            }, 0);
        },

    };
    return that;
})();

