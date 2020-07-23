

var tbl_ld_ickss_list_part4ickss_Obj = (function ()
{
    'use strict';

    //=================================================================================
    //                                      私有
    //=================================================================================
    //=================================================================================
    //                                      私有属性 
    //=================================================================================

    var _serviceUrl = '//127.0.0.1/sara.dd.ldsw/service/service_tbl_ld_ickss.asmx/',
    //Grid控件的分页参数，设置为空即可实现不分页
    _pageSize = '20',
        _isPage = true,

    //查询sql语句
    _whereClauseString = '',
    //可见性标志 	1:只能看到自己的数据，0：能看到全部数据
    _isadmin = '',
    //是否邮储标志	0:是邮储，1不是邮储
    _isyouchu = '',
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
            that._pr_gridpageindex = 1;
            that._pr_searchcontent = new Object();
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
    *  方法:creatWhereClause
    *  参数:callBackFunction
    *  针对_pr_searchtype生成sql语句存储在_whereClauseString
    */
    creatWhereClause = function (callBackFunction)
    {
        var whereClause = '';
        _whereClauseString = whereClause;
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

            $('#table_grid_tbl_ld_ickss_list').bootstrapTable({
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
                idField: 'sys_id',
                sidePagination: 'webserver',
                columns: [
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
                    field: 'f_ssbh',
                    title: '售水编号',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        return resultStr;
                    }
                },
               {
                   field: 'f_sjbh',
                   title: '收据编号',
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
                    field: 'f_khbhid',
                    title: '客户编号id',
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
                    field: 'f_yhbhid',
                    title: '用户编号id',
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
                    field: 'f_yhm',
                    title: '用户名',
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
                    field: 'f_jfm',
                    title: '缴费名',
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
                    field: 'f_dz',
                    title: '地址',
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
                    field: 'f_dh',
                    title: '电话',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;


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
                    title: '区域ID',
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
                    field: 'f_sbbhid',
                    title: '水表编号id',
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
                    field: 'f_sblx',
                    title: '水表类型',
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
                    field: 'f_sblxid',
                    title: '水表类型id',
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
                    field: 'f_yslx',
                    title: '用水类型',
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
                    field: 'f_yslxid',
                    title: '用水类型id',
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

                        if (resultStr.length > 10)
                        {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },


                {
                    field: 'f_rs',
                    title: '人数',
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
                    field: 'f_kj',
                    title: '口径',
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

                    field: 'f_khrq',
                    title: '开户时间',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {

                        var resultStr = value.toDateTime().Format("yyyy-MM-dd hh:mm:ss");
                        if (resultStr == '1900-01-01 00:00:00')
                        {
                            resultStr = "&nbsp;&nbsp;";
                        }



                        return resultStr;

                    }
                },


                {
                    field: 'f_sf',
                    title: '水费',
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
                                                    field: 'f_pwf',
                                                    title: '污水处理费',
                                                    "class": '',
                                                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                                                    formatter: function (value, row, index)
                                                    {
                                                        var resultStr = value;

                                                        return resultStr;
                                                    }
                                                },
                {
                    field: 'f_sl',
                    title: '水量',
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
                    field: 'f_jfdh',
                    title: '缴费流水号',
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
                    field: 'f_jfje',
                    title: '缴费金额',
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
                    field: 'f_zt',
                    title: '状态',
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

                //新增
                                {
                                    field: 'f_khfz',
                                    title: '客户分组',
                                    "class": 'hidden',
                                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                                    formatter: function (value, row, index)
                                    {
                                        var resultStr = value;

                                        return resultStr;
                                    }
                                },
                                {
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
                                    field: 'f_dj',
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
                                    field: 'f_ysje',
                                    title: '应收金额',
                                    "class": '',
                                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                                    formatter: function (value, row, index)
                                    {
                                        var resultStr = value;

                                        return resultStr;
                                    }
                                },
                                {
                                    field: 'f_jmhysje',
                                    title: '减免后应收金额',
                                    "class": 'hidden',
                                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                                    formatter: function (value, row, index)
                                    {
                                        var resultStr = value;

                                        return resultStr;
                                    }
                                },
                                {
                                    field: 'f_khytjjzsf',
                                    title: '客户原调价结转水费',
                                    "class": 'hidden',
                                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                                    formatter: function (value, row, index)
                                    {
                                        var resultStr = value;

                                        return resultStr;
                                    }
                                },
                                {
                                    field: 'f_khytjjzpwf',
                                    title: '客户原调价结转污水处理费',
                                    "class": 'hidden',
                                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                                    formatter: function (value, row, index)
                                    {
                                        var resultStr = value;

                                        return resultStr;
                                    }
                                },
                                {
                                    field: 'f_sfsytjjz',
                                    title: '是否使用调价结转',
                                    "class": 'hidden',
                                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                                    formatter: function (value, row, index)
                                    {
                                        var resultStr = value;

                                        return resultStr;
                                    }
                                },
                                {
                                    field: 'f_sytjjzsf',
                                    title: '使用调价结转水费',
                                    "class": 'hidden',
                                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                                    formatter: function (value, row, index)
                                    {
                                        var resultStr = value;

                                        return resultStr;
                                    }
                                },
                                {
                                    field: 'f_sytjjzpwf',
                                    title: '使用调价结转污水处理费',
                                    "class": 'hidden',
                                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                                    formatter: function (value, row, index)
                                    {
                                        var resultStr = value;

                                        return resultStr;
                                    }
                                },
                                {
                                    field: 'f_syhtjjzsf',
                                    title: '使用后调价结转水费',
                                    "class": 'hidden',
                                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                                    formatter: function (value, row, index)
                                    {
                                        var resultStr = value;

                                        return resultStr;
                                    }
                                },
                                {
                                    field: 'f_syhtjjzpwf',
                                    title: '使用后调价结转污水处理费',
                                    "class": 'hidden',
                                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                                    formatter: function (value, row, index)
                                    {
                                        var resultStr = value;

                                        return resultStr;
                                    }
                                },
                                {
                                    field: 'f_khyye',
                                    title: '客户原余额',
                                    "class": 'hidden',
                                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                                    formatter: function (value, row, index)
                                    {
                                        var resultStr = value;

                                        return resultStr;
                                    }
                                },
                                {
                                    field: 'f_sfsyye',
                                    title: '是否使用余额',
                                    "class": 'hidden',
                                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                                    formatter: function (value, row, index)
                                    {
                                        var resultStr = value;

                                        return resultStr;
                                    }
                                },
                                {
                                    field: 'f_syye',
                                    title: '使用余额',
                                    "class": '',
                                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                                    formatter: function (value, row, index)
                                    {
                                        var resultStr = value;

                                        return resultStr;
                                    }
                                },
                                {
                                    field: 'f_yhye',
                                    title: '用后余额',
                                    "class": 'hidden',
                                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                                    formatter: function (value, row, index)
                                    {
                                        var resultStr = value;

                                        return resultStr;
                                    }
                                },
                                {
                                    field: 'f_shys',
                                    title: '算后应收',
                                    "class": 'hidden',
                                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                                    formatter: function (value, row, index)
                                    {
                                        var resultStr = value;

                                        return resultStr;
                                    }
                                },
                                {
                                    field: 'f_shss',
                                    title: '算后实收',
                                    "class": '',
                                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                                    formatter: function (value, row, index)
                                    {
                                        var resultStr = value;

                                        return resultStr;
                                    }
                                },
                                {
                                                  field: 'f_xiekrq',
                                                  title: '购水时间',
                                                  "class": '',
                                                  align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                                                  formatter: function (value, row, index)
                                                  {
                                                      var resultStr = value;
                                                      if (value == "")
                                                      {
                                                          value = "1900-01-01 00:00:00";
                                                      }
                                                      var resultStr = value.toDateTime().Format("yyyy-MM-dd hh:mm:ss");
                                                      //if (resultStr == '1900-01-01 00:00:00')
                                                      //{
                                                      //    resultStr = "&nbsp;&nbsp;";
                                                      //}
                                                      return resultStr;
                                                  }
                                              },
                                {
                                    field: 'f_shzl',
                                    title: '算后找零',
                                    "class": 'hidden',
                                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                                    formatter: function (value, row, index)
                                    {
                                        var resultStr = value;

                                        return resultStr;
                                    }
                                },
                                {
                                    field: 'f_shssdx',
                                    title: '算后实收大写',
                                    "class": 'hidden',
                                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                                    formatter: function (value, row, index)
                                    {
                                        var resultStr = value;

                                        return resultStr;
                                    }
                                },
                                {
                                    field: 'f_jffs',
                                    title: '缴费方式',
                                    "class": 'hidden',
                                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                                    formatter: function (value, row, index)
                                    {
                                        var resultStr = value;

                                        return resultStr;
                                    }
                                },
                                {
                                    field: 'f_jffsid',
                                    title: '缴费方式id',
                                    "class": 'hidden',
                                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                                    formatter: function (value, row, index)
                                    {
                                        var resultStr = value;

                                        return resultStr;
                                    }
                                },
                                {
                                    field: 'f_xkmsid',
                                    title: '写卡模式id',
                                    "class": 'hidden',
                                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                                    formatter: function (value, row, index)
                                    {
                                        var resultStr = value;

                                        return resultStr;
                                    }
                                },
                                {
                                    field: 'f_yyt',
                                    title: '营业厅',
                                    "class": 'hidden',
                                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                                    formatter: function (value, row, index)
                                    {
                                        var resultStr = value;

                                        return resultStr;
                                    }
                                },
                                {
                                    field: 'f_yytid',
                                    title: '营业厅id',
                                    "class": 'hidden',
                                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                                    formatter: function (value, row, index)
                                    {
                                        var resultStr = value;

                                        return resultStr;
                                    }
                                },
                                {
                                    field: 'f_kplb',
                                    title: '开票类别',
                                    "class": 'hidden',
                                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                                    formatter: function (value, row, index)
                                    {
                                        var resultStr = value;

                                        return resultStr;
                                    }
                                },
                                {
                                    field: 'f_kplbid',
                                    title: '开票类别id',
                                    "class": 'hidden',
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
                    var rows = $('#table_grid_tbl_ld_ickss_list').bootstrapTable('getSelections');

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
                    var rows = $('#table_grid_tbl_ld_ickss_list').bootstrapTable('getData');
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

        //当前被选中的行的状态的字符串//1^2^6
        //当前在第几页
        _pr_gridpageindex: 1,

        //客户编号
        _pr_khbhid: '',

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

            setTimeout(function ()
            {

                $('#table_grid_tbl_ld_ickss_list').bootstrapTable("showLoading");



                _whereClauseString = " f_khbhid='" + that._pr_khbhid + "' and f_ztid='2'"





                var whereClause = _whereClauseString;
                var orderByString = ' sys_id desc';
                var columnsString = 'f_value1^f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^f_khbh^f_khbhid^f_yhbh^f_yhbhid^f_yhm^f_jfm^f_dz^f_dh^f_dy^f_dyid^f_sc^f_scid^f_qy^f_qyid^f_pq^f_pqid^f_sbbh^f_sbbhid^f_sblx^f_sblxid^f_yslx^f_yslxid^f_lxtkhh^f_rs^f_kj^f_khrq^f_sf^f_sl^f_jfdh^f_jfje^f_zt^f_ztid^f_bz^f_ssbh^f_xiekrq^f_sjbh^f_khfz^f_khfzid^f_cbbh^f_cbbhid^f_dj^f_pwf^f_ysje^f_jmhysje^f_khytjjzsf^f_khytjjzpwf^f_sfsytjjz^f_sytjjzsf^f_sytjjzpwf^f_syhtjjzsf^f_syhtjjzpwf^f_khyye^f_sfsyye^f_syye^f_yhye^f_shys^f_shss^f_shzl^f_shssdx^f_jffs^f_jffsid^f_xkmsid^f_yyt^f_yytid^f_kplb^f_kplbid^sys_id';

                var data = {
                    whereString: whereClause,
                    cxzxsjString: 'true',
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

                        $('#table_grid_tbl_ld_ickss_list').bootstrapTable("hideLoading");

                        $('#table_grid_tbl_ld_ickss_list').bootstrapTable("loadJson", messageJson);

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
        },
        //---------------------------------------------------------------------------------
        // ---------------------------------按钮------------------------------------------
        //---------------------------------------------------------------------------------



        end: function ()
        {
        }

    };
    return that;
})();





