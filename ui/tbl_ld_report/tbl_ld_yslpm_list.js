


var _clientInf = '{userid="",appcode="54",appname="",userip="",usermac="",username=""}';
var _blockMessage = null;
var _alertMessage = null;
var _resultMessage = null;
var _confirmMessage = null;

var tbl_ld_yslpm_list_Obj = (function ()
{
    'use strict';

    //=================================================================================
    //                                      私有
    //=================================================================================
    //=================================================================================
    //                                      私有属性 
    //=================================================================================

    var _serviceUrl = '//127.0.0.1/sara.dd.ldsw/service/service_tbl_ld_report.asmx/',

        _isPage = false,



    _defaultfrom = '',//默认开始时间，当前天
    _defaultto = '',//默认开始时间，当前天

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
            var myDate = new Date();
            var myMonth = myDate.getMonth() + 1;
            _defaultfrom = myDate.getFullYear() + '/' + myMonth + '/01 00:00:00';
            _defaultto = myDate.getFullYear() + '/' + myMonth + '/' + myDate.getDate() + ' 23:59:59';




            that._pr_listtype = requestQuery('listtype');
            that._pr_appcode = requestQuery('appcode');


            _clientInf = '{userid:"' + basePageObj._userInfoJson.sys_userid + '",appcode:"' + that._pr_appcode + '",appname:"",userip:"' + basePageObj._userInfoJson.ip + '",usermac:"' + basePageObj._userInfoJson.mac + '",username:"' + basePageObj._userInfoJson.sys_username + '"}';



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
    /* 
    *  
    *  方法:setDisable
    *  参数:isDisable
    *  设置页面控件只读情况
    */
    setDisable = function ()
    {

        try
        {


        }
        catch (ex)
        {
            _blockMessage.show('setDisable执行失败<br/>' + ex.message, 'fail');
        }



    },



    //---------------------------------------------------------------------------------
    // ---------------------------------grid------------------------------------------
    //---------------------------------------------------------------------------------

    /* 
    *  
    *  方法:creatWhereClause
    *  参数:callBackFunction
    *  针对_pr_searchtype生成sql语句存储在_whereClauseString
    */
    creatWhereClause = function (callBackFunction)
    {
        controlObj.datetimeinit('search_f_cxrq_tbl_ld_yslpm_list_datefrom', 'search_f_cxrq_tbl_ld_yslpm_list_timefrom');
        controlObj.datetimeinit('search_f_cxrq_tbl_ld_yslpm_list_dateto', 'search_f_cxrq_tbl_ld_yslpm_list_timeto');


        controlObj.datetime('search_f_cxrq_tbl_ld_yslpm_list_datefrom', 'search_f_cxrq_tbl_ld_yslpm_list_timefrom', _defaultfrom);
        controlObj.datetime('search_f_cxrq_tbl_ld_yslpm_list_dateto', 'search_f_cxrq_tbl_ld_yslpm_list_timeto', _defaultto);

        callBackFunction.success();
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

            $('#table_grid_tbl_ld_yslpm_list').bootstrapTable({
                cache: false,
                height: gridHeight,
                striped: true,
                pagination: _isPage,
                //pageSize: _pageSize,
                //pageList: [_pageSize],
                pageNumber: that._pr_gridpageindex,
                search: false,
                showColumns: false,
                showRefresh: false,
                clickToSelect: true,
                //idField: 'sys_id',
                sidePagination: 'webserver',
                columns: [

                {
                    field: 'rn',
                    title: '排名',
                    "class": '',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;




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



                          return resultStr;
                      }
                  },

                {
                    field: 'dj',
                    title: '单价',
                    "class": '',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;




                        return resultStr;
                    }
                },



                {
                    field: 'yszje',
                    title: '应收总金额',
                    "class": '',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;



                        return resultStr;
                    }
                },


                {
                    field: 'yspwf',
                    title: '应收排污费',
                    "class": '',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        return resultStr;
                    }
                },


                {
                    field: 'yssf',
                    title: '应收水费',
                    "class": '',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;



                        return resultStr;
                    }
                },


                {
                    field: 'yssl',
                    title: '应收水量',
                    "class": '',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;



                        return resultStr;
                    }
                },


                {
                    field: 'sszje',
                    title: '实收总金额',
                    "class": '',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        return resultStr;
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

            });

            callBackFunction.success();
        }
        catch (ex)
        {
            _blockMessage.show('initGrid执行失败<br/>' + ex.message, 'fail');
        }
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
        //当前被选中的行的ID集合的字符串//1^2^6
        _pr_gridselectids: '',
        //当前被选中的行的状态的字符串//1^2^6
        //当前在第几页
        _pr_gridpageindex: 1,
        //当前的查询模式：1：简单查询；2：高级查询
        _pr_searchtype: '1',
        //查询内容type1:简单查询内容；type2：高级查询内容（JSON）
        _pr_searchcontent: null,
        _pr_searchtime: null,
        //是否查询历史库
        _pr_searchhis: 'false',
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

                                creatWhereClause({
                                    success: function ()
                                    {
                                        initGrid({
                                            success: function ()
                                            {
                                                that.bindGrid({
                                                    success: function ()
                                                    {


                                                        setDisable();


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

                $('#table_grid_tbl_ld_yslpm_list').bootstrapTable("showLoading");
                var cxrqfrom = controlObj.datetime('search_f_cxrq_tbl_ld_yslpm_list_datefrom', 'search_f_cxrq_tbl_ld_yslpm_list_timefrom');
                var cxrqto = controlObj.datetime('search_f_cxrq_tbl_ld_yslpm_list_dateto', 'search_f_cxrq_tbl_ld_yslpm_list_timeto');
                var yslfrom = controlObj.text('search_yslfrom_tbl_ld_yslpm_list');
                var yslto = controlObj.text('search_yslto_tbl_ld_yslpm_list');
                var pm = controlObj.text('search_pm_tbl_ld_yslpm_list');

                var data = {
                    cxrqfrom: cxrqfrom,
                    cxrqto: cxrqto,
                    yslfrom: yslfrom,
                    yslto: yslto,
                    pm: pm
                };

              
                doAjaxFunction(_serviceUrl, 'GetReport', data, {
                    success: function (result)
                    {
                        debugger
                            var messageJson = (new Function("", "return " + result))();

                            $('#table_grid_tbl_ld_yslpm_list').bootstrapTable("hideLoading");

                            $('#table_grid_tbl_ld_yslpm_list').bootstrapTable("loadJson", messageJson);


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





        //导出
        btn_command_export_onclick: function ()
        {
            var cxrqfrom = controlObj.datetime('search_f_cxrq_tbl_ld_yslpm_list_datefrom', 'search_f_cxrq_tbl_ld_yslpm_list_timefrom');
            var cxrqto = controlObj.datetime('search_f_cxrq_tbl_ld_yslpm_list_dateto', 'search_f_cxrq_tbl_ld_yslpm_list_timeto');
            var yslfrom = controlObj.text('search_yslfrom_tbl_ld_yslpm_list');
            var yslto = controlObj.text('search_yslto_tbl_ld_yslpm_list');
            var pm = controlObj.text('search_pm_tbl_ld_yslpm_list');

            var data = {
                cxrqfrom: cxrqfrom,
                cxrqto: cxrqto,
                yslfrom: yslfrom,
                yslto: yslto,
                pm: pm
            };


            doAjaxFunction(_serviceUrl, 'ExportReport', data, {
                success: function (result)
                {
                    
                    window.open(result, "_blank", "");

                },
                fail: function (message)
                {
                    
                    _alertMessage.show('数据导出失败', 'fail');
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
    tbl_ld_yslpm_list_Obj.init();
});



