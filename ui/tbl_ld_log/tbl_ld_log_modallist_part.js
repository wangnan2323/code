

var tbl_ld_log_modallist_Obj = (function ()
{
    'use strict';
    //=================================================================================
    //                                      私有
    //=================================================================================
    //=================================================================================
    //                                      私有属性 
    //=================================================================================
    var _serviceUrl = '//127.0.0.1/sara.dd.ldsw/service/service_tbl_ld_log.asmx/',

    //Grid控件的分页参数，设置为空即可实现不分页
    _pageSize = '20',
    _isPage = true,
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
            callBackFunction.success();
        }
        catch (ex)
        {
            _blockMessage.show('initParameter执行失败' + ex.message, 'fail');
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
        _whereClauseString = '';
        callBackFunction.success();
    },

    /* 
    *  
    *  方法:gridSelectedChange
    *  参数:
    *  根据_pr_gridselectids的情况，设置清空按钮
    */
    gridSelectedChange = function ()
    {
       
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
            var gridHeight = 300;
            //if ($(window).width() < basePageObj._limSrceenWidth)
            //{
            //    gridHeight = $(window).height() - 320;
            //    if (gridHeight < 950)
            //    {
            //        gridHeight = 950;
            //    }
            //}
            //else
            //{
            //    gridHeight = $(window).height() - 240;
            //}

            $('#table_grid_tbl_ld_log_modallist').bootstrapTable({
                showHeader: false,
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
                clickToSelect: false,
                idField: 'sys_id',
                sidePagination: 'webserver',
                columns: [
                {
                    field: 'sys_id', title: 'sys_id',
                    align: 'left',
                    valign: 'middle',
                    visible: true,
                    sortable: false,
                    formatter: function (value, row, index) {
                        var resultHtml = "";
                       
                        resultHtml += "<div class=\"gridcell-divtable\">";

                        //内容
                        {
                           
                            var html = '';
                            try
                            {                           
                                if (row.f_editcontent == "")
                                {
                                }
                                else
                                {
                                var editcontentJsonArray = (new Function("", "return " + row.f_editcontent))();
                                
                                html += "<div  class=\"row\">";
                                for (var i = 0; i < editcontentJsonArray.length; i++)
                                {
                                    var valueName = editcontentJsonArray[i].name;
                                    var oldValue = editcontentJsonArray[i].oldvalue;
                                    var newValue = editcontentJsonArray[i].newvalue;

                                    var isNeedShow = true;

                                    if (valueName == "")
                                    {
                                        isNeedShow = false;
                                    }
                                    if (editcontentJsonArray[i].name.indexOf('id') >= 2)
                                    {
                                        isNeedShow = false;
                                    }
                                  
                                    

                                    if (oldValue == "")
                                    {
                                        oldValue = '空';
                                    }

                                    if (newValue == "")
                                    {
                                        newValue = '空';
                                    }

                                    if (isNeedShow == true)
                                    {
                                        html += "<div  class=\"col-sm-4\">";
                                        html += "<span>【" + editcontentJsonArray[i].name + "】：</span>";
                                        html += "<span>" + oldValue + "</span>";
                                        html += "&nbsp-->&nbsp";
                                        html += "<span>" + newValue + "</span>";
                                        html += "</div>";
                                    }

                                 
                                   
                                }
                                html += "</div>";
                                //contentHtmlStr
                                }
                            }
                            catch(ex)
                            {

                            }
                        
                            //==修改内容
                            resultHtml += "<div class=\"row\" >";                        
                            resultHtml += "<div class=\"col-sm-1\">";
                            resultHtml += "<span  style='font-weight:bold'>修改内容：</span>";
                            resultHtml += "</div>";
                            resultHtml += "<div class=\"col-sm-11\">";
                            resultHtml += "<span>" + html + "</span>";
                            resultHtml += "</div>";
                            resultHtml += "</div>";

                            if (row.f_bz == undefined || row.f_bz == '')
                            {

                            }
                            else
                            {
                                //==备注
                                resultHtml += "<div class=\"row\" >";
                                resultHtml += "<div class=\"col-sm-1\">";
                                resultHtml += "<span style='font-weight:bold' >备注：</span>";
                                resultHtml += "</div>";
                                resultHtml += "<div class=\"col-sm-11\">";
                                resultHtml += "<span>" + row.f_bz + "</span>";
                                resultHtml += "</div>";
                                resultHtml += "</div>";
                            }
                          

                          
                      
                            resultHtml += "<div class=\"row\" >";

                            //==修改来源
                            resultHtml += "<div class=\"col-sm-1\">";
                            resultHtml += "<span style='font-weight:bold' >修改来源：</span>";
                            resultHtml += "</div>";
                            resultHtml += "<div class=\"col-sm-3\">";
                            resultHtml += "<span>" + row.f_editsource + "</span>";
                            resultHtml += "</div>";

                            ////==修改类型
                            //resultHtml += "<div class=\"col-sm-1\">";
                            //resultHtml += "<span style='font-weight:bold' >修改类型：</span>";
                            //resultHtml += "</div>";
                            //resultHtml += "<div class=\"col-sm-5\">";
                            //resultHtml += "<span>" + row.f_edittype + "</span>";
                            //resultHtml += "</div>";

                            //==修改人IP地址

                            resultHtml += "<div class=\"col-sm-1\">";
                            resultHtml += "<span style='font-weight:bold' >修改人IP地址：</span>";
                            resultHtml += "</div>";
                            resultHtml += "<div class=\"col-sm-3\">";
                            resultHtml += "<span>" + row.f_edituserip + "</span>";
                            resultHtml += "</div>";

                            //==修改人MAC地址
                            resultHtml += "<div class=\"col-sm-1\">";
                            resultHtml += "<span style='font-weight:bold' >修改人MAC地址：</span>";
                            resultHtml += "</div>";
                            resultHtml += "<div class=\"col-sm-3\">";
                            resultHtml += "<span>" + row.f_editusermac + "</span>";
                            resultHtml += "</div>";


                            resultHtml += "</div>";
                        
                        
                          
                            resultHtml += "<div class=\"row\" >";

                            //==修改人
                            resultHtml += "<div class=\"col-sm-1\">";
                            resultHtml += "<span style='font-weight:bold' >修改人：</span>";
                            resultHtml += "</div>";
                            resultHtml += "<div class=\"col-sm-3\">";
                            resultHtml += "<span>" + row.f_editusername + "</span>";
                            resultHtml += "</div>";

                            //==修改时间
                            {
                                var editdatetime = '';
                                if (row.f_editdatetime == "")
                                {
                                    editdatetime = "1900-01-01 00:00:00";
                                }
                                else
                                {
                                    editdatetime = row.f_editdatetime;
                                }

                                var resultStr = editdatetime.toDateTime().Format("yyyy-MM-dd hh:mm:ss");
                                if (resultStr == '1900-01-01 00:00:00')
                                {
                                    resultStr = "&nbsp;&nbsp;";
                                }
                            }

                            resultHtml += "<div class=\"col-sm-1\">";
                            resultHtml += "<span style='font-weight:bold' >修改时间：</span>";
                            resultHtml += "</div>";
                            resultHtml += "<div class=\"col-sm-3\">";
                            resultHtml += "<span>" + resultStr + "</span>";
                            resultHtml += "</div>";


                            //==修改人登录名
                            resultHtml += "<div class=\"col-sm-1\">";
                            resultHtml += "<span style='font-weight:bold' >修改人登录名：</span>";
                            resultHtml += "</div>";
                            resultHtml += "<div class=\"col-sm-3\">";
                            resultHtml += "<span>" + row.f_edituserloginname + "</span>";
                            resultHtml += "</div>";

                            resultHtml += "</div>";
                        

                          
                          



                        }
                        resultHtml += "</div>";
                        return resultHtml;
                    },

                },
               
                ],
                onPageChange: function (size, number)
                {
                    that._pr_gridpageindex = number;
                    that.bindGrid( {
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
                    var rows = $('#table_grid_tbl_ld_log_modallist').bootstrapTable('getSelections');
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
                    var rows = $('#table_grid_tbl_ld_log_modallist').bootstrapTable('getData');
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
   
    //---------------------------------------------------------------------------------
    // ---------------------------------DetailModel------------------------------------
    //---------------------------------------------------------------------------------
    


        end = function () { };

    //=================================================================================
    //                                      公有
    //=================================================================================
    var that = {

        _pr_gridpageindex: 1,
               
        _pr_tablename: '',
        _pr_tableprikeyvalue:'',
        //=================================================================================
        //                                      公有方法 
        //=================================================================================

        init: function (callBackFunction)
        {
            try
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

                                        callBackFunction.success();

                                      
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

        /* 
   *  
   *  方法:bindGrid
   *  参数:callBackFunction
   *  根据_whereClauseString，_pageSize，_pr_gridpageindex绑定数据
   */
        bindGrid : function (callBackFunction)
        {
         
            setTimeout(function ()
            {
                var whereClause = "  sys_delflag = '0' ";
            
                if (that._pr_tablename != '' && that._pr_tableprikeyvalue != '')
                {   

                    whereClause += ' and  f_businesstablename = \'' + that._pr_tablename + '\'';

                    whereClause += ' and  f_businesstableprikeyvalue = \'' + that._pr_tableprikeyvalue + '\'';

                    var orderByString = ' sys_id desc';
                    var columnsString = 'f_value1^f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^f_businesstablename^f_businesstableprikeyvalue^f_editusername^f_edituserloginname^f_edituserid^f_edituserip^f_editusermac^f_editdatetime^f_edittype^f_editsource^f_editcontent^f_editcontentid^f_bz^sys_id';

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
                            $('#table_grid_tbl_ld_log_modallist').bootstrapTable("loadJson", messageJson);

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
                }

                else
                {
                    if (callBackFunction != undefined && callBackFunction != null)
                    {
                        callBackFunction.success();
                    }
                }


             
            }, 0);
        },
       
        end: function ()
        {
        }
    };
    return that;
})();






