


var _clientInf = '{userid="",appcode="54",appname="",userip="",usermac="",username=""}';
var _blockMessage = null;
var _alertMessage = null;
var _resultMessage = null;
var _confirmMessage = null;

var tbl_ld_jhdz_list_Obj = (function ()
{
    'use strict';

    //=================================================================================
    //                                      私有
    //=================================================================================
    //=================================================================================
    //                                      私有属性 
    //=================================================================================

    var _serviceUrl = '//127.0.0.1/sara.dd.ldsw/service/service_tbl_ld_jfb.asmx/',
    //Grid控件的分页参数，设置为空即可实现不分页
    _pageSize = '20',
    _isPage = false,

    //按钮工具
    _ladda_btn_command_do = null,


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
            _clientInf = '{userid:"' + basePageObj._userInfoJson.sys_userid + '",appcode:"' + that._pr_appcode + '",appname:"",userip:"' + basePageObj._userInfoJson.ip + '",usermac:"' + basePageObj._userInfoJson.mac + '",username:"' + basePageObj._userInfoJson.sys_username + '"}';

            if (that._pr_gridpageindex == null || that._pr_gridpageindex == '' || that._pr_gridpageindex == 'null')
            {
                that._pr_gridpageindex = 1;
            }
            else
            {
                that._pr_gridpageindex = Number(that._pr_gridpageindex);
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
            _blockMessage.show('initParameter执行失败<br/>' + ex.message, 'fail');
        }

    },


    //---------------------------------------------------------------------------------
    // ---------------------------------grid------------------------------------------
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

            $('#table_grid_tbl_ld_jhdz_list').bootstrapTable({
                cache: false,
                height: gridHeight,
                striped: true,
                pagination: _isPage,
                search: false,
                showColumns: false,
                showRefresh: false,
                clickToSelect: true,
                sidePagination: 'webserver',
                columns: [

                    

                    {
                        field: 'f_jhddh', title: '交行订单号',
                        "class": 'cc-hidden-sm  cc-hidden-xs',
                        align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                        formatter: function (value, row, index) { return value; }
                    },

                    {
                        field: 'f_jyje', title: '交易金额',
                        "class": 'cc-hidden-sm  cc-hidden-xs',
                        align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                        formatter: function (value, row, index) { return value; }
                    },

                    {
                        field: 'f_jfbh', title: '缴费编号',
                        "class": 'cc-hidden-sm  cc-hidden-xs',
                        align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                        formatter: function (value, row, index) { return value; }
                    },

                    {
                        field: 'f_jfje', title: '缴费金额',
                        "class": 'cc-hidden-sm  cc-hidden-xs',
                        align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                        formatter: function (value, row, index) { return value; }
                    },

                    {
                        field: 'f_jfrq', title: '缴费日期',
                        "class": 'cc-hidden-sm  cc-hidden-xs',
                        align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                        formatter: function (value, row, index) { return value; }
                    },

                    {
                        field: 'f_ly', title: '来源',
                        "class": 'cc-hidden-sm  cc-hidden-xs',
                        align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                        formatter: function (value, row, index) { return value; }
                    },



                    {
                        field: 'f_dzjg', title: '对账结果',
                        "class": 'cc-hidden-sm  cc-hidden-xs',
                        align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                        formatter: function (value, row, index) { return value; }
                    }



                   
                ],
                onPageChange: function (size, number)
                {
                    that._pr_gridpageindex = number;
                    that.bindGrid();
                },
                rowStyle: function (row, index)
                {
                    //可以根据数据情况设置行的背景颜色。
                    //return {classes: 'active'//'success'//'info'//'warning' //'danger'};
                    //if (row.f_status == "true")
                    //{
                    //    return { classes: 'info' };//'success'//'info'//'warning' //'danger'};
                    //}
                    //else
                    //{
                    //    return {};//'success'//'info'//'warning' //'danger'};
                    //}
                    var lytype = controlObj.singledropdownlist("search_f_ly_tbl_ld_jhdz_list");
                    if (lytype != null && lytype != "" && lytype != "全部")
                    {
                        if (row.f_ly != lytype)
                        {
                            return { classes: 'hidden' };
                        }
                        else
                        {
                            return {};//'success'//'info'//'warning' //'danger'};
                        }
                    }
                    else
                    {
                        return {};//'success'//'info'//'warning' //'danger'};
                    }


                    //return {};
                },
                onLoadSuccess: function (data)
                {
                    //grid绑定完成后触发此事件
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
                    //获取当前grid中全部选中的行
                    var rows = $('#table_grid_tbl_app_version_list').bootstrapTable('getSelections');
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
                    var rows = $('#table_grid_tbl_app_version_list').bootstrapTable('getData');
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
    *  方法:initSearchControl
    *  参数:callBackFunction
    *  初始化SearchModel控件，_baseCodeHashMap作为Code数据源
    */
        initSearchControl = function (callBackFunction)
        {
            try
            {
                var lyArray = [
                    { "id": "0", "text": "全部" },
                    { "id": "1", "text": "缴费机" },
                    { "id": "2", "text": "e水生活" }];
                controlObj.singledropdownlistinit('search_f_ly_tbl_ld_jhdz_list', lyArray, "");
                controlObj.datetimeinit('search_f_dzrq_tbl_ld_jhdz_list_date', 'search_f_dzrq_tbl_ld_jhdz_list_time');
                var yesterday = getDay(-1, '-');
                controlObj.datetime('search_f_dzrq_tbl_ld_jhdz_list_date', 'search_f_dzrq_tbl_ld_jhdz_list_time', yesterday+' 00:00:00');


                callBackFunction.success();
            }
            catch (ex)
            {
                _blockMessage.show('initSearchControl执行失败。<br/>' + ex.message, 'fail');
            }
        },


    getDay = function(num, str)
    {
        var today = new Date();
        var nowTime = today.getTime();
        var ms = 24 * 3600 * 1000 * num;
        today.setTime(parseInt(nowTime + ms));
        var oYear = today.getFullYear();
        var oMoth = (today.getMonth() + 1).toString();
        if (oMoth.length <= 1) oMoth = '0' + oMoth;
        var oDay = today.getDate().toString();
        if (oDay.length <= 1) oDay = '0' + oDay;
        return oYear + str + oMoth + str + oDay;
    },

    end = function () { };


    //=================================================================================
    //                                      公有
    //=================================================================================
    var that = {

        //=================================================================================
        //                                      公有属性 
        //=================================================================================
        //appcode
        _pr_appcode: '',
        //1：可编辑；2：只读
        _pr_listtype: '',
        //人员类型，0：是管理员显示全部缴费  1：营业员只能看到自己的人员信息



        //当前在第几页
        _pr_gridpageindex: 1,
        //当前的查询模式：1：简单查询；2：高级查询

        //=================================================================================
        //                                      公有方法 
        //=================================================================================
        /* 
        *  
        *  方法:init
        *  参数:
        *  初始化页面
        */
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
                        initParameter({
                            success: function ()
                            {

                                initSearchControl({
                                    success: function ()
                                    {
                                        initGrid({
                                            success: function ()
                                            {
                                                _ladda_btn_command_do = Ladda.create('btn_command_do_tbl_ld_jhdz_list');
                                                _blockMessage.hidden();
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
                $('#table_grid_tbl_ld_jhdz_list').bootstrapTable("showLoading");
                var dzrq = controlObj.datetime('search_f_dzrq_tbl_ld_jhdz_list_date', 'search_f_dzrq_tbl_ld_jhdz_list_time');

                var data = {
                    dzrq:dzrq,
                    clientInf: _clientInf
                };

                doAjaxFunction(_serviceUrl, 'dojhdz', data, {
                    success: function (result)
                    {
                        var messageJson = (new Function("", "return " + result))();

                        $('#table_grid_tbl_ld_jhdz_list').bootstrapTable("hideLoading");

                        $('#table_grid_tbl_ld_jhdz_list').bootstrapTable("loadJson", messageJson);

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
        *  方法:btn_command_do_onclick
        *  参数:
        *  开始对账
        */
        btn_command_do_onclick: function ()
        {
            _ladda_btn_command_do.start();

            

            this.bindGrid({
                success: function (result)
                {
                    _ladda_btn_command_do.stop();
                    

                }, fail: function (message)
                {
                    _ladda_btn_command_do.stop();
                    _alertMessage.show('交行对账执行失败', 'fail');
                    _resultMessage.show(message);
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
    tbl_ld_jhdz_list_Obj.init();
});



