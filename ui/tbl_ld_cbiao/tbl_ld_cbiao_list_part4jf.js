

var tbl_ld_cbiao_list_Obj = (function ()
{
    'use strict';

    //=================================================================================
    //                                      私有
    //=================================================================================
    //=================================================================================
    //                                      私有属性 
    //=================================================================================

    var _serviceUrl = '//127.0.0.1/sara.dd.ldsw/service/service_tbl_ld_cbiao.asmx/',
    //Grid控件的分页参数，设置为空即可实现不分页
    _pageSize = '',
    _isPage = false,
    
    //查询sql语句
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
    setDisable = function (isDisable)
    {
        

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

        _whereClauseString = "";

      

        callBackFunction.success();
    },

    /* 
    *  
    *  方法:gridSelectedChange
    *  参数:
    *  根据_pr_set_cbhhids的情况，设置清空按钮
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
            var gridHeight = 200;
            //if ($(window).width() < basePageObj._limSrceenWidth) {
            //    gridHeight = $(window).height() - 320;
            //    if (gridHeight < 950) {
            //        gridHeight = 950;
            //    }
            //}
            //else {
            //    gridHeight = $(window).height() - 240;
            //}

            $('#table_grid_tbl_ld_cbiao_list').bootstrapTable({
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
                clickToSelect: true,
                singleSelect: false,
                checkboxHeader: false,
                idField: 'sys_id',
                sidePagination: 'webserver',
                columns: [
                {
                    field: '_checkbox', checkbox: true,
                    formatter: function (value, row, index)
                    {                     
                      

                     
                        //根据gridselectids给Grid设置选中项
                        switch (that._pr_listtype)
                        {
                            //编辑模式
                            case "1":
                                {
                                    var ischecked = false
                                    if (("," + that._pr_set_cbhhids + ",").indexOf("," + row.sys_id + ",") > -1)
                                    {
                                        ischecked = true;
                                    }
                                    else
                                    {
                                        ischecked = false;
                                    }

                                    if (index != 0)
                                    {                                                                        

                                        return {
                                            checked: ischecked,
                                            disabled: true
                                        }
                                    }
                                    else
                                    {
                                        return {
                                            checked: ischecked,
                                            disabled: false
                                        }
                                    }
                                }
                                break;
                                //制度模式
                            case "2":
                                {
                                    if ((","+that._pr_set_cbhhids+",").indexOf(","+row.sys_id+",")>-1)
                                    {
                                        return {
                                            disabled: true,
                                            checked: true
                                        }
                                    }
                                    else
                                    {
                                        return {
                                            disabled: true,
                                            checked: false
                                        }
                                    }
                                }
                                break;
                        }
                    }
                },
                {
                    field: 'sys_id', title: 'sys_id', "class": 'gridcell-ordercolumn hidden',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                    sortable: false,
                },


                {
                    field: 'f_value1',
                    title: '备用字段1',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        return resultStr;
                    }
                },


                {
                    field: 'f_value2',
                    title: '备用字段2',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        return resultStr;
                    }
                },


                {
                    field: 'f_value3',
                    title: '备用字段3',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        return resultStr;
                    }
                },


                {
                    field: 'f_value4',
                    title: '备用字段4',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        return resultStr;
                    }
                },


                {
                    field: 'f_value5',
                    title: '备用字段5',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        return resultStr;
                    }
                },


                {
                    field: 'f_value6',
                    title: '备用字段6',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        return resultStr;
                    }
                },


                {
                    field: 'f_value7',
                    title: '备用字段7',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        return resultStr;
                    }
                },


                {
                    field: 'f_value8',
                    title: '备用字段8',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        return resultStr;
                    }
                },


                {
                    field: 'f_value9',
                    title: '备用字段9',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        return resultStr;
                    }
                },


                {
                    field: 'f_value10',
                    title: '备用字段10',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        return resultStr;
                    }
                },


                {
                    field: 'f_khbhid',
                    title: '客户编号id',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;



                        return resultStr;
                    }
                },


                {
                    field: 'f_cbyid',
                    title: '抄表员id',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;



                        return resultStr;
                    }
                },


                {
                    field: 'f_cbyphoto',
                    title: '抄表员photo',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;











                        return resultStr;
                    }
                },


                {
                    field: 'f_sblxid',
                    title: '水表类型id',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;



                        return resultStr;
                    }
                },


                {
                    field: 'f_yslxid',
                    title: '用水类型id',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;



                        return resultStr;
                    }
                },


                {
                    field: 'f_cbbhid',
                    title: '抄本编号id',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;



                        return resultStr;
                    }
                },


                {
                    field: 'f_khbh',
                    title: '客户编号',
                    "class": '',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;



                        return resultStr;
                    }
                },


                {
                    field: 'f_sbbh',
                    title: '水表编号',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;



                        return resultStr;
                    }
                },
                                {
                                    field: 'f_cbyname',
                                    title: '抄表员',
                                    "class": '',
                                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                                    formatter: function (value, row, index)
                                    {
                                        var resultStr = value;

                                        return resultStr;
                                    }
                                },
                {
                    field: 'f_cb_cbbh',
                    title: '抄表编号',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) {
                        var resultStr = value;
                        return resultStr;
                    }
                },
                {
                    field: 'f_khfz',
                    title: '客户分组',
                    "class": '',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        return resultStr;
                    }
                }, {
                    field: 'f_khfzid',
                    title: '客户分组id',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;
                        return resultStr;
                    }
                },
                
                    {
                    field: 'f_sjljsyl',
                    title: '瞬间累计使用量',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;
                        return resultStr;
                    }
                }, {
                    field: 'f_jmbh',
                    title: '减免编号',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;
                        return resultStr;
                    }
                }, {
                    field: 'f_jmbhid',
                    title: '减免编号id',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;
                        return resultStr;
                    }
                }, {
                    field: 'f_sfsfts',
                    title: '是否算费提示',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;
                        return resultStr;
                    }
                },

                {
                    field: 'f_yhbh',
                    title: '用户编号',
                    "class": 'hidden',
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
                    align: 'left', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                   
                        return resultStr;
                    }
                },


                {
                    field: 'f_jfm',
                    title: '缴费名',
                    "class": '',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        if (resultStr.length > 10)
                        {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }
                        return resultStr;
                    }
                },


                {
                    field: 'f_dh',
                    title: '电话',
                    "class": '',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;



                        return resultStr;
                    }
                },


                {
                    field: 'f_dz',
                    title: '地址',
                    "class": '',
                    align: 'left', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                      
                        return resultStr;
                    }
                },


                {
                    field: 'f_sbbhid',
                    title: '水表编号id',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;



                        return resultStr;
                    }
                },

                {
                    field: 'f_sqzm',
                    title: '上期止码',
                    "class": '',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;



                        return resultStr;
                    }
                },

                            {
                                field: 'f_bqzm',
                                title: '本期止码',
                                "class": '',
                                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                                formatter: function (value, row, index)
                                {
                                    var resultStr = value;
                                    return resultStr;
                                }
                            },


                {
                    field: 'f_bqsl',
                    title: '当月水量',
                    "class": '',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;
                        return resultStr;

                    }
                },


                {
                    field: 'f_bqje',
                    title: '本期金额',
                    "class": '',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        return resultStr;
                    }
                },
                {
                    field: 'f_sf',
                    title: '水费',
                    "class": '',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) {
                        var resultStr = value;
                        return resultStr;
                    }
                },
                {
                    field: 'f_pwf',
                    title: '污水处理费',
                    "class": '',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) {
                        var resultStr = value;
                        return resultStr;
                    }
                },
                {
                    field: 'f_jmje',
                    title: '减免金额',
                    "class": '',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index) {
                        var resultStr = value;
                        return resultStr;
                    }
                },


                {
                    field: 'f_sqsl',
                    title: '上期水量',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;



                        return resultStr;
                    }
                },


                {
                    field: 'f_qsqpjsl',
                    title: '前三期平均水量',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        return resultStr;
                    }
                },


                {
                    field: 'f_qlqpjsl',
                    title: '前六期平均水量',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;



                        return resultStr;
                    }
                },





                {
                    field: 'f_cbsj',
                    title: '抄表时间',
                    "class": '',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        if (value == "")
                        {
                            value = "1900-01-01 00:00:00";
                        }
                        var resultStr = value.toDateTime().Format("yyyy-MM-dd hh:mm:ss");
                        if (resultStr == '1900-01-01 00:00:00')
                        {
                            resultStr = "&nbsp;&nbsp;";
                        }
                        return resultStr;
                    }
                },
                {
                    field: 'f_bk',
                    title: '表况',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;



                        return resultStr;
                    }
                },


                {
                    field: 'f_bkid',
                    title: '表况id',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        return resultStr;
                    }
                },

					 {
					     field: 'f_ly',
					     title: '来源',
					     "class": 'hidden',
					     align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
					     formatter: function (value, row, index)
					     {
					         var resultStr = value;




					         return resultStr;
					     }
					 },


                {
                    field: 'f_lyid',
                    title: '来源id',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;



                        return resultStr;
                    }
                },
                {
                    field: 'f_zt',
                    title: '状态',
                    "class": '',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;




                        return resultStr;
                    }
                },


                {
                    field: 'f_ztid',
                    title: '状态id',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;



                        return resultStr;
                    }
                    },

                    {
                        field: 'f_dyjtsl',
                        title: '第一阶梯水量',
                        "class": '',
                        align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                        formatter: function (value, row, index)
                        {
                            var resultStr = value;



                            return resultStr;
                        }
                    },

                    {
                        field: 'f_dyjtsf',
                        title: '第一阶梯水费',
                        "class": '',
                        align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                        formatter: function (value, row, index)
                        {
                            var resultStr = value;



                            return resultStr;
                        }
                    },

                    {
                        field: 'f_dejtsl',
                        title: '第二阶梯水量',
                        "class": '',
                        align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                        formatter: function (value, row, index)
                        {
                            var resultStr = value;



                            return resultStr;
                        }
                    },

                    {
                        field: 'f_dejtsf',
                        title: '第二阶梯水费',
                        "class": '',
                        align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                        formatter: function (value, row, index)
                        {
                            var resultStr = value;



                            return resultStr;
                        }
                    },

                    {
                        field: 'f_dsjtsl',
                        title: '第三阶梯水量',
                        "class": '',
                        align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                        formatter: function (value, row, index)
                        {
                            var resultStr = value;



                            return resultStr;
                        }
                    },

                    {
                        field: 'f_dsjtsf',
                        title: '第三阶梯水费',
                        "class": '',
                        align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                        formatter: function (value, row, index)
                        {
                            var resultStr = value;



                            return resultStr;
                        }
                    },



                {
                    field: 'f_bz',
                    title: '备注',
                    "class": '',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        if (resultStr.length > 10)
                        {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },


                {
                    field: 'f_dy',
                    title: '地域',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        if (resultStr.length > 10)
                        {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },


                {
                    field: 'f_dyid',
                    title: '地域id',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        if (resultStr.length > 10)
                        {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },


                {
                    field: 'f_sc',
                    title: '水厂',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        if (resultStr.length > 10)
                        {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },


                {
                    field: 'f_scid',
                    title: '水厂id',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        if (resultStr.length > 10)
                        {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },


                {
                    field: 'f_qy',
                    title: '区域',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        if (resultStr.length > 10)
                        {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },


                {
                    field: 'f_qyid',
                    title: '区域id',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        if (resultStr.length > 10)
                        {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },


                {
                    field: 'f_pq',
                    title: '片区',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        if (resultStr.length > 10)
                        {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },


                {
                    field: 'f_pqid',
                    title: '片区id',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        if (resultStr.length > 10)
                        {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },


                {
                    field: 'f_lxtkhh',
                    title: '老系统客户号',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;



                        return resultStr;
                    }
                },


                {
                    field: 'f_pgbh',
                    title: '算费编号',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        if (resultStr.length > 10)
                        {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },


                {
                    field: 'f_pgbhid',
                    title: '算费编号id',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        if (resultStr.length > 10)
                        {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },


                {
                    field: 'f_pgr',
                    title: '算费人',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        if (resultStr.length > 10)
                        {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },


                {
                    field: 'f_pgrid',
                    title: '算费人id',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        if (resultStr.length > 10)
                        {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },


                {
                    field: 'f_pgpcmc',
                    title: '算费批次名称',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        if (resultStr.length > 10)
                        {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },

                {
                    field: 'f_pgsj',
                    title: '算费时间',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {


                        if (value == "")
                        {
                            value = "1900-01-01 00:00:00";
                        }
                        var resultStr = value.toDateTime().Format("yyyy-MM-dd hh:mm:ss");
                        if (resultStr == '1900-01-01 00:00:00')
                        {
                            resultStr = "&nbsp;&nbsp;";
                        }



                        return resultStr;

                    }
                },


                {
                    field: 'f_jfbh',
                    title: '缴费编号',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        if (resultStr.length > 10)
                        {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },


                {
                    field: 'f_jfbhid',
                    title: '缴费编号id',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        if (resultStr.length > 10)
                        {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },

                {
                    field: 'f_jfsj',
                    title: '缴费时间',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {


                        if (value == "")
                        {
                            value = "1900-01-01 00:00:00";
                        }
                        var resultStr = value.toDateTime().Format("yyyy-MM-dd hh:mm:ss");
                        if (resultStr == '1900-01-01 00:00:00')
                        {
                            resultStr = "&nbsp;&nbsp;";
                        }



                        return resultStr;

                    }
                },


                {
                    field: 'f_sblx',
                    title: '水表类型',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;



                        return resultStr;
                    }
                },


                {
                    field: 'f_yslx',
                    title: '用水类型',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;



                        return resultStr;
                    }
                },


                {
                    field: 'f_cbbh',
                    title: '抄本编号',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;



                        return resultStr;
                    }
                },


                {
                    field: 'f_cbmc',
                    title: '抄本名称',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;



                        return resultStr;
                    }
                },







                {
                    field: 'f_cb_cbbhid',
                    title: '抄表编号id',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;



                        return resultStr;
                    }
                },


                {
                    field: 'f_yhbhid',
                    title: '用户编号id',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;



                        return resultStr;
                    }
                },
                {
                    field: 'f_kj',
                    title: '口径',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        return resultStr;
                    }
                },
                {
                    field: 'f_kjid',
                    title: '口径id',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;
                        return resultStr;
                    }
                },
                {
                    field: 'f_ztkhh',
                    title: '旧客户号',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;
                        return resultStr;
                    }
                }, {
                    field: 'f_ztsbh',
                    title: '旧水表号',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;
                        return resultStr;
                    }
                }, {
                    field: 'f_ztyhh',
                    title: '旧用户号',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;



                        return resultStr;
                    }
                }, {
                    field: 'f_rs',
                    title: '人数',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;
                        return resultStr;
                    }
                },

                {
                    field: '', title: '操作',
                    "class": 'hidden',
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
                            transToDetailPage(row.sys_id, '2');

                        },
                        'click .edit': function (e, value, row, index)
                        {
                            transToDetailPage(row.sys_id, '1');
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
                    //可以根据数据情况设置行的背景颜色。
                    //return {classes: 'active'//'success'//'info'//'warning' //'danger'};
                    return {};
                },
                onLoadSuccess: function (data)
                {
                    //grid绑定完成后触发此事件
                },
                //当列头复选框被选中时，触发此事件，选中项ID存储在_pr_set_cbhhids中
                onCheck: function (row)
                {
                    //临时版本
                    var allTableData = $('#table_grid_tbl_ld_cbiao_list').bootstrapTable('getData');
                    //for (var i = 0; i < allTableData.length; i++)
                    //{                        
                    //    if (allTableData[i]._checked == false)
                    //    {
                    //        $("input[data-index=" + i + "]").removeAttr("disabled");
                            
                    //        if (i > 1)
                    //        {
                    //            $("input[data-index=" + (i-2) + "]").attr("disabled", "disabled");
                    //        }

                    //        break;
                    //    }
                    //    else if (i == allTableData.length-1)
                    //    {
                    //        $("input[data-index=" + (i - 1) + "]").attr("disabled", "disabled");
                    //    }
                    //}
                    

                    var rowid = "tr_" + row.sys_id;
                    var index = $("#" + rowid).attr("data-index");

                    if (parseInt(index) > 0)
                    {
                        $("input[data-index=" + (parseInt(index) - 1) + "]").attr("disabled", "disabled");
                    }
                    if (parseInt(index) != allTableData.length - 1)
                    {
                        $("input[data-index=" + (parseInt(index) + 1) + "]").removeAttr("disabled");
                    }

                    that._pr_set_sfjl += '|' + row.f_sfjl  ;
                    that._pr_set_sfjl = that._pr_set_sfjl.trimStartEnd('|');

                    that._pr_set_cbhhids += ',' + row.sys_id;
                    that._pr_set_cbhhids = that._pr_set_cbhhids.trimStartEnd(',');

                    that._pr_set_cbhhs += ',' + row.f_cb_cbbh;
                    that._pr_set_cbhhs = that._pr_set_cbhhs.trimStartEnd(',');
                    
                    //F_CB_CBBH	VARCHAR2(200)	Y			抄表编号

                    //F_SF	VARCHAR2(200)	Y			水费
                    //F_PWF	VARCHAR2(200)	Y			污水处理费
                    //F_BQJE	VARCHAR2(200)	Y			本期金额
                    //F_BQSL	VARCHAR2(200)	Y			本期水量
                    //F_JMJE	VARCHAR2(200)	Y			减免金额
                    
                    //_pr_set_bqsl:0,
                    //_pr_set_sf:0,
                    //_pr_set_pwf:0,
                    //_pr_set_bqje:0,
                    //_pr_set_jmje:0,
                    that._pr_set_bqsl += Number(row.f_bqsl);
                    that._pr_set_sf += Number(row.f_sf);
                    that._pr_set_pwf += Number(row.f_pwf);
                    that._pr_set_bqje += Number(row.f_bqje);
                    that._pr_set_jmje += Number(row.f_jmje);
                    that._pr_set_dyjtsl += Number(row.f_dyjtsl);
                    that._pr_set_dyjtsf += Number(row.f_dyjtsf);
                    that._pr_set_dejtsl += Number(row.f_dejtsl);
                    that._pr_set_dejtsf += Number(row.f_dejtsf);
                    that._pr_set_dsjtsl += Number(row.f_dsjtsl);
                    that._pr_set_dsjtsf += Number(row.f_dsjtsf);

                    that.onGridSelecteChanged(that._pr_set_cbhhids, that._pr_set_cbhhs,
                        that._pr_set_bqsl, 
                        that._pr_set_sf, 
                        that._pr_set_pwf, 
                        that._pr_set_bqje, 
                        that._pr_set_jmje,
                        that._pr_set_sfjl,
                        that._pr_set_dyjtsl,
                        that._pr_set_dyjtsf,
                        that._pr_set_dejtsl,
                        that._pr_set_dejtsf,
                        that._pr_set_dsjtsl,
                        that._pr_set_dsjtsf
                        );
                    gridSelectedChange();
                },
                //当列头复选框被反选中时，触发此事件，选中项ID存储在_pr_set_cbhhids中
                onUncheck: function (row)
                {
                    var allTableData = $('#table_grid_tbl_ld_cbiao_list').bootstrapTable('getData');
                    //for (var i = 0; i < allTableData.length; i++)
                    //{                       

                    //    if (allTableData[i].sys_id == row.sys_id)
                    //    {
                    //        $("input[data-index=" + (i + 1) + "]").attr("disabled", "disabled");
                    //        $("input[data-index=" + (i - 1) + "]").removeAttr("disabled");
                    //        break;
                    //    }
                    //}
                    
                    var rowid = "tr_" + row.sys_id;
                    var index = $("#" + rowid).attr("data-index");

                    if (parseInt(index) > 0)
                    {
                        $("input[data-index=" + (parseInt(index) - 1) + "]").removeAttr("disabled");
                    }
                    if (parseInt(index) != allTableData.length - 1)
                    {
                        $("input[data-index=" + (parseInt(index) + 1) + "]").attr("disabled", "disabled");
                    }

                    that._pr_set_cbhhids = (',' + that._pr_set_cbhhids + ',').replaceAll(',' + row.sys_id + ',', ',');
                    that._pr_set_cbhhids = that._pr_set_cbhhids.trimStartEnd(',');


                    that._pr_set_cbhhs = (',' + that._pr_set_cbhhs + ',').replaceAll(',' + row.f_cb_cbbh + ',', ',');
                    that._pr_set_cbhhs = that._pr_set_cbhhs.trimStartEnd(',');

                    that._pr_set_sfjl = ('|' + that._pr_set_sfjl + '|').replaceAll('|' + row.f_sfjl + '|', '|');
                    that._pr_set_sfjl = that._pr_set_sfjl.trimStartEnd('|');

                    that._pr_set_bqsl -= Number(row.f_bqsl);
                    that._pr_set_sf -= Number(row.f_sf);
                    that._pr_set_pwf -= Number(row.f_pwf);
                    that._pr_set_bqje -= Number(row.f_bqje);
                    that._pr_set_jmje -= Number(row.f_jmje);
                    that._pr_set_dyjtsl -= Number(row.f_dyjtsl);
                    that._pr_set_dyjtsf -= Number(row.f_dyjtsf);
                    that._pr_set_dejtsl -= Number(row.f_dejtsl);
                    that._pr_set_dejtsf -= Number(row.f_dejtsf);
                    that._pr_set_dsjtsl -= Number(row.f_dsjtsl);
                    that._pr_set_dsjtsf -= Number(row.f_dsjtsf);

                    if (that._pr_set_bqsl < 0)
                    {
                        that._pr_set_bqsl = 0;
                    }
                    if (that._pr_set_sf < 0)
                    {
                        that._pr_set_sf = 0;
                    }
                    if (that._pr_set_pwf < 0)
                    {
                        that._pr_set_pwf = 0;
                    }
                    if (that._pr_set_bqje < 0)
                    {
                        that._pr_set_bqje = 0;
                    }
                    if (that._pr_set_jmje < 0)
                    {
                        that._pr_set_jmje = 0;
                    }

                    if (that._pr_set_dyjtsl < 0)
                    {
                        that._pr_set_dyjtsl=0;
                    }
                    if (that._pr_set_dyjtsf < 0)
                    {
                        that._pr_set_dyjtsf = 0;
                    }
                    if (that._pr_set_dejtsl < 0)
                    {
                        that._pr_set_dejtsl = 0;
                    }
                    if (that._pr_set_dejtsf < 0)
                    {
                        that._pr_set_dejtsf = 0;
                    }
                    if (that._pr_set_dsjtsl < 0)
                    {
                        that._pr_set_dsjtsl = 0;
                    }
                    if (that._pr_set_dsjtsf < 0)
                    {
                        that._pr_set_dsjtsf = 0;
                    }


                    that.onGridSelecteChanged(that._pr_set_cbhhids, that._pr_set_cbhhs,
                       that._pr_set_bqsl, 
                       that._pr_set_sf, 
                       that._pr_set_pwf, 
                       that._pr_set_bqje, 
                       that._pr_set_jmje,
                        that._pr_set_sfjl,
                        that._pr_set_dyjtsl,
                        that._pr_set_dyjtsf,
                        that._pr_set_dejtsl,
                        that._pr_set_dejtsf,
                        that._pr_set_dsjtsl,
                        that._pr_set_dsjtsf
                       );
                    gridSelectedChange();
                },
                //当列头复选框被全选中时，触发此事件，选中项ID存储在_pr_set_cbhhids中
                onCheckAll: function ()
                {
                  
                },
                //当列头复选框被全反选中时，触发此事件，选中项ID存储在_pr_set_cbhhids中
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


        //当前在第几页
        _pr_gridpageindex: 1,

     
        //设置当前的客户编号ID
        _pr_set_khbhid:'',

        //设置选中的抄表编号ID
        _pr_set_cbhhids:'',

        //设置选中的抄表编号
        _pr_set_cbhhs:'',

        //设置选中的抄表编号
        _pr_set_bqsl:0,
        _pr_set_sf:0,
        _pr_set_pwf:0,
        _pr_set_bqje:0,
        _pr_set_jmje: 0,
        _pr_set_dyjtsl: 0,
        _pr_set_dyjtsf: 0,
        _pr_set_dejtsl: 0,
        _pr_set_dejtsf: 0,
        _pr_set_dsjtsl: 0,
        _pr_set_dsjtsf:0,
        //设置选中的抄表算法记录
        _pr_set_sfjl:'',
        
        //缴费日期--用于控制查询抄表的运行库还是历史库
        _pr_set_jfrq:'',



        onGridSelecteChanged: function (gridselectid, cbbh, ysje, cbbhid, bqsl, bqje,sfjl,dyjtsl,dyjtsf,dejtsl,dejtsf,dsjtsl,dsjtsf)
        {

        },
        //=================================================================================
        //                                      公有方法 
        //=================================================================================
        /* 
        *  
        *  方法:init
        *  参数:
        *  初始化页面
        */
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
            if (that._pr_set_khbhid != '-1' && that._pr_set_khbhid != null && that._pr_set_khbhid != "")
            {
                setTimeout(function ()
                {
                    var whereClause = _whereClauseString;

                    if (whereClause != '')
                    {
                        whereClause += 'and';
                    }
                    whereClause += ' sys_delflag = \'0\'';

                    whereClause += ' and f_khbhid = \'' + that._pr_set_khbhid + '\'';



                    if (that._pr_set_cbhhids != '')
                    {
                        whereClause += ' and sys_id in (\'' + that._pr_set_cbhhids.replaceAll(',', '\',\'') + '\')';
                    }
                    else
                    {
                        whereClause += ' and f_ztid = \'2\'';
                    }
                    var orderByString = ' f_cbsj asc';
                    var columnsString = 'f_value1^f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^f_khbhid^f_cbyid^f_cbyphoto^f_sbbhid^f_khfz^f_khfzid^f_sf^f_pwf^f_sjljsyl^f_jmje^f_jmbh^f_jmbhid^f_sfsfts^f_sblxid^f_yslxid^f_cbbhid^f_khbh^f_sqzm^f_bqzm^f_bqsl^f_sqsl^f_qsqpjsl^f_qlqpjsl^f_cbyname^f_cbsj^f_bk^f_bkid^f_zt^f_ztid^f_ly^f_lyid^f_bz^f_yhm^f_jfm^f_dh^f_dz^f_dy^f_dyid^f_sc^f_scid^f_qy^f_qyid^f_pq^f_pqid^f_lxtkhh^f_pgbh^f_pgbhid^f_pgr^f_pgrid^f_pgpcmc^f_pgsj^f_jfbh^f_jfbhid^f_jfsj^f_bqje^f_sbbh^f_sblx^f_yslx^f_cbbh^f_cbmc^f_cb_cbbh^f_cb_cbbhid^f_yhbh^f_yhbhid^f_sfjl^sys_id^NVL(f_dyjtsl,0) as f_dyjtsl^NVL(f_dyjtsf,0) as f_dyjtsf^NVL(f_dejtsl,0) as f_dejtsl^NVL(f_dejtsf,0) as f_dejtsf^NVL(f_dsjtsl,0) as f_dsjtsl^NVL(f_dsjtsf,0) as f_dsjtsf';

                    var data = {
                        whereString: whereClause,
                        cxzxsjString: that._pr_set_jfrq,
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

                            $('#table_grid_tbl_ld_cbiao_list').bootstrapTable("loadJson", messageJson);

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
                }, 0);
            }
            
        },

        destorygGrid: function (callBackFunction)
        {
            $('#table_grid_tbl_ld_cbiao_list').bootstrapTable('destroy');
            initGrid({
                success: function ()
                {

                    callBackFunction.success();

                }
            });
        },

        
        end: function ()
        {
        }

    };
    return that;
})();
