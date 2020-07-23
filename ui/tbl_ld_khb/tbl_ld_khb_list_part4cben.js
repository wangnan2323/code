

var tbl_ld_khb_list_Obj = (function ()
{
    'use strict';

    //=================================================================================
    //                                      私有
    //=================================================================================
    //=================================================================================
    //                                      私有属性 
    //=================================================================================

    var _serviceUrl = '//127.0.0.1/sara.dd.ldsw/service/service_tbl_ld_khb.asmx/',
    //Grid控件的分页参数，设置为空即可实现不分页
    _pageSize = '20',
        _isPage = true,
    
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





                   
































































































































































































































    /* 
    *  
    *  方法:creatWhereClause
    *  参数:callBackFunction
    *  针对_pr_searchtype生成sql语句存储在_whereClauseString
    */
    creatWhereClause = function (callBackFunction)
    {

        var whereClause = '';


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

                        whereClause += " f_khbh like '%" + vv[i] + "%' or ";

                        //whereClause += " f_ztkhh like '%" + vv[i] + "%' or ";
                        whereClause += " f_yhm like '%" + vv[i] + "%' or ";
                        //whereClause += " f_cbbh like '%" + vv[i] + "%' or ";

                        //whereClause += " f_cbyxm like '%" + vv[i] + "%' or ";

                        //whereClause += " f_yhbh like '%" + vv[i] + "%' or ";

                        whereClause += " f_jfm like '%" + vv[i] + "%' or ";

                        whereClause += " f_dz like '%" + vv[i] + "%' or ";

                        //whereClause += " f_dh like '%" + vv[i] + "%' or ";

                        //whereClause += " f_dy like '%" + vv[i] + "%' or ";

                        //whereClause += " f_dyid like '%" + vv[i] + "%' or ";

                        //whereClause += " f_sc like '%" + vv[i] + "%' or ";

                        //whereClause += " f_scid like '%" + vv[i] + "%' or ";

                        //whereClause += " f_qy like '%" + vv[i] + "%' or ";

                        //whereClause += " f_qyid like '%" + vv[i] + "%' or ";

                        //whereClause += " f_pq like '%" + vv[i] + "%' or ";

                        //whereClause += " f_pqid like '%" + vv[i] + "%' or ";

                        //whereClause += " f_tsyxzh like '%" + vv[i] + "%' or ";

                        //whereClause += " f_hth like '%" + vv[i] + "%' or ";

                        //whereClause += " f_sfzh like '%" + vv[i] + "%' or ";

                        //whereClause += " f_sbbh like '%" + vv[i] + "%' or ";

                        //whereClause += " f_lxth like '%" + vv[i] + "%' or ";

                        //whereClause += " f_sblxid like '%" + vv[i] + "%' or ";
                        //whereClause += " f_khfz like '%" + vv[i] + "%' or ";
                        //whereClause += " f_zt like '%" + vv[i] + "%' or ";
                        //whereClause += " f_bz like '%" + vv[i] + "%' or ";

                        if (whereClause.length > 0)
                        {
                            whereClause = whereClause.substr(0, whereClause.length - 3);
                        }
                        whereClause += ") and ";
                    }
                }
            }

            if (whereClause.length > 0)
            {
                whereClause = whereClause.substr(0, whereClause.length - 4);
            }

        }

        else
        {

            if (that._pr_searchcontent.type2 != undefined)
            {

                var tbl_ld_khb_list = that._pr_searchcontent.type2;



                if (tbl_ld_khb_list.f_khbh.length > 0)
                {
                    whereClause += " f_khbh like '%" + tbl_ld_khb_list.f_khbh + "%' and ";
                }


                if (tbl_ld_khb_list.f_ztkhh.length > 0)
                {
                    whereClause += " f_ztkhh like '%" + tbl_ld_khb_list.f_ztkhh + "%' and ";
                }


                if (tbl_ld_khb_list.f_cbbhid.length > 0)
                {
                    var elementArray = tbl_ld_khb_list.f_cbbhid.split(',');
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
                        whereClause += "((','||f_cbbhid||',') like ('%,'||'" + elementArray[i] + "'||',%')) ";

                    });
                    whereClause += ') and ';
                }


                if (tbl_ld_khb_list.f_cbyxm.length > 0)
                {
                    whereClause += " f_cbyxm like '%" + tbl_ld_khb_list.f_cbyxm + "%' and ";
                }


                if (tbl_ld_khb_list.f_yhbh.length > 0)
                {
                    whereClause += " f_yhbh like '%" + tbl_ld_khb_list.f_yhbh + "%' and ";
                }


                if (tbl_ld_khb_list.f_jfm.length > 0)
                {
                    whereClause += " f_jfm like '%" + tbl_ld_khb_list.f_jfm + "%' and ";
                }


                if (tbl_ld_khb_list.f_dz.length > 0)
                {
                    whereClause += " f_dz like '%" + tbl_ld_khb_list.f_dz + "%' and ";
                }


                if (tbl_ld_khb_list.f_dh.length > 0)
                {
                    whereClause += " f_dh like '%" + tbl_ld_khb_list.f_dh + "%' and ";
                }





                if (tbl_ld_khb_list.f_dyid.length > 0)
                {
                    whereClause += " f_dyid = '" + tbl_ld_khb_list.f_dyid + "' and ";
                }





                if (tbl_ld_khb_list.f_scid.length > 0)
                {
                    whereClause += " f_scid = '" + tbl_ld_khb_list.f_scid + "' and ";
                }





                if (tbl_ld_khb_list.f_qyid.length > 0)
                {
                    whereClause += " f_qyid = '" + tbl_ld_khb_list.f_qyid + "' and ";
                }





                if (tbl_ld_khb_list.f_pqid.length > 0)
                {
                    whereClause += " f_pqid = '" + tbl_ld_khb_list.f_pqid + "' and ";
                }


                if (tbl_ld_khb_list.f_tsyxzh.length > 0)
                {
                    whereClause += " f_tsyxzh like '%" + tbl_ld_khb_list.f_tsyxzh + "%' and ";
                }


                if (tbl_ld_khb_list.f_hth.length > 0)
                {
                    whereClause += " f_hth like '%" + tbl_ld_khb_list.f_hth + "%' and ";
                }


                if (tbl_ld_khb_list.f_sfzh.length > 0)
                {
                    whereClause += " f_sfzh like '%" + tbl_ld_khb_list.f_sfzh + "%' and ";
                }


                if (tbl_ld_khb_list.f_sbbh.length > 0)
                {
                    whereClause += " f_sbbh like '%" + tbl_ld_khb_list.f_sbbh + "%' and ";
                }


                if (tbl_ld_khb_list.f_lxth.length > 0)
                {
                    whereClause += " f_lxth like '%" + tbl_ld_khb_list.f_lxth + "%' and ";
                }


                if (tbl_ld_khb_list.f_sblxid.length > 0)
                {
                    whereClause += " f_sblxid like '%" + tbl_ld_khb_list.f_sblxid + "%' and ";
                }

                if (tbl_ld_khb_list.f_khfzid.length > 0)
                {
                    whereClause += " f_khfzid like '%" + tbl_ld_khb_list.f_khfzid + "%' and ";
                }
                if (tbl_ld_khb_list.f_ztid.length > 0)
                {
                    whereClause += " f_ztid like '%" + tbl_ld_khb_list.f_ztid + "%' and ";
                }
                if (tbl_ld_khb_list.f_bz.length > 0)
                {
                    whereClause += " f_bz like '%" + tbl_ld_khb_list.f_bz + "%' and ";
                }

                if (whereClause.length > 0)
                {
                    whereClause = whereClause.substr(0, whereClause.length - 4);
                }
            }
        }

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
            var gridHeight = 0;
            if ($(window).width() < basePageObj._limSrceenWidth)
            {
                gridHeight = $(window).height() - 160;
                if (gridHeight < 950)
                {
                    gridHeight = 950;
                }
            }
            else
            {
                gridHeight = $(window).height() - 160;
            }


            $('#table_grid_tbl_ld_khb_list').bootstrapTable({
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
                singleSelect: true,
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
                                           //switch (row.f_ztid) {
                                           //    case '0':
                                           //        return {
                                           //            disabled: false
                                           //        }
                                           //        break;
                                           //    case '9':
                                           //        return {
                                           //            disabled: true
                                           //        }
                                           //        break;
                                           //}

                                           if (('^' + that._pr_gridselectids + '^').indexOf('^' + row.sys_id + '^') > -1)
                                           {
                                               return {
                                                   disabled: false,
                                                   checked: true
                                               }
                                           }
                                       }
                                       break;
                                       //制度模式
                                   case "2":
                                       {
                                           return {
                                               disabled: true,
                                               checked: false
                                           }
                                       }
                                       break;
                               }
                           }
                       },
                {
                    field: 'sys_id', title: 'sys_id', "class": 'hidden gridcell-ordercolumn',
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
                    field: 'f_ycje',
                    title: '绿化表押金',
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

                        return resultStr;
                    }
                },


                {
                    field: 'f_tbbh',
                    title: '套表编号',
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
                    field: 'f_sfjlbjf',
                    title: '是否计量不计费',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        if (value == "true")
                        {
                            value = '是';
                        }
                        else
                        {
                            value = '否';
                        }
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
                    field: 'f_cbxh',
                    title: '抄本序号',
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
                    field: 'f_cbyid',
                    title: '抄表员id',
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
                    field: 'f_cbzq',
                    title: '抄表周期',
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
                    field: 'f_cbmc',
                    title: '抄本名称',
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
                    field: 'f_yhfz',
                    title: '用户分组',
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
                    field: 'f_yhfzid',
                    title: '用户分组id',
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
                    field: 'f_tsyxzh',
                    title: '托收银行账号',
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
                    field: 'f_hth',
                    title: '合同号',
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
                    field: 'f_sfzh',
                    title: '身份证号',
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
                    title: '开户日期',
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
                    field: 'f_bqzm',
                    title: '本期止码',
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
                    field: 'f_sqzm',
                    title: '上期止码',
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
                    field: 'f_bqsl',
                    title: '当月水量',
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
                    field: 'f_sqsl',
                    title: '上期水量',
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
                    field: 'f_qsqpjsl',
                    title: '前三期平均水量',
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
                    field: 'f_qlqpjsl',
                    title: '前六期平均水量',
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
                    field: 'f_ljgl',
                    title: '累积购量',
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
                    field: 'f_jllxid',
                    title: '计量类型id',
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
                    field: 'f_tssbbh',
                    title: '停水水表编号',
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
                      field: 'f_khbh',
                      title: '客户编号',
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
        field: 'f_ljqf',
        title: '累计欠费',
        "class": '',
        align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
        formatter: function (value, row, index)
        {

            var resultStr = value;

            return resultStr;
        }
    }, {
        field: 'f_tjjzpwf',
        title: '调价结转污水处理费',
        "class": 'hidden',
        align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
        formatter: function (value, row, index)
        {
            var resultStr = value;
            return resultStr;
        }
    }, {
        field: 'f_tjjzsf',
        title: '调价结转水费',
        "class": 'hidden',
        align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
        formatter: function (value, row, index)
        {
            var resultStr = value;
            return resultStr;
        }
    }, {
        field: 'f_tssbbhid',
        title: '停水水表编号id',
        "class": 'hidden',
        align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
        formatter: function (value, row, index)
        {
            var resultStr = value;
            return resultStr;
        }
    }, {
        field: 'f_nljgl',
        title: '年用水量',
        "class": '',
        align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
        formatter: function (value, row, index)
        {
            var resultStr = value;

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
                    field: 'f_khfz',
                    title: '客户分组',
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
        field: 'f_cbbh',
        title: '抄本编号',
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
       field: 'f_cbyxm',
       title: '抄表员姓名',
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
                    field: 'f_lxth',
                    title: '老系统号',
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
                    field: 'f_jllx',
                    title: '计量类型',
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
                      "class": '',
                      align: 'left', valign: 'middle', sortable: true, clickToSelect: true,
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
                    
                    if (('^' + that._pr_gridselectids + '^').indexOf('^' + row.sys_id + '^') > -1)
                    {
                        return { classes: 'success' };
                    }
                    else
                    {
                       return {};
                    }
                    //可以根据数据情况设置行的背景颜色。
                    //return {classes: 'active'//'success'//'info'//'warning' //'danger'};

                },
                onLoadSuccess: function (data)
                {
                    //grid绑定完成后触发此事件
                },
                //当列头复选框被选中时，触发此事件，选中项ID存储在_pr_gridselectids中
                onCheck: function (row)
                {
                    $('#table_grid_tbl_ld_khb_list').find('tr.success').removeClass('success');
               
                    $('#table_grid_tbl_ld_khb_list').find('#tr_' + row.sys_id).addClass('success');

                    that._pr_gridselectids = row.sys_id;
                    //that._pr_gridselectids = that._pr_gridselectids.trimStartEnd('^');
                    gridSelectedChange();
                },
                //当列头复选框被反选中时，触发此事件，选中项ID存储在_pr_gridselectids中
                onUncheck: function (row)
                {
                    $('#table_grid_tbl_ld_khb_list').find('tr.success').removeClass('success');
                  

                    that._pr_gridselectids = '';
                    gridSelectedChange();
                },
                //当列头复选框被全选中时，触发此事件，选中项ID存储在_pr_gridselectids中
                onCheckAll: function ()
                {
                    var rows = $('#table_grid_tbl_ld_khb_list').bootstrapTable('getSelections');
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
                    var rows = $('#table_grid_tbl_ld_khb_list').bootstrapTable('getData');
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

        //当前被选中的行的ID集合的字符串//1^2^6
        _pr_gridselectids: '',
        //当前在第几页
        _pr_gridpageindex: 1,

        _pr_cbbhid: '',
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
                //  ////;
                //初始化参数
                initParameter({
                    success: function ()
                    {

                        creatWhereClause({
                            success: function ()
                            {
                       



                                callBackFunction.success();






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


                ////;
                $('#table_grid_tbl_ld_khb_list').bootstrapTable("showLoading");

                var whereClause = _whereClauseString;

                if (that._pr_cbbhid != '')
                {
                    if (whereClause != "")
                    {
                        whereClause += " and ";
                    }
                    whereClause += " f_cbbhid in ('" + that._pr_cbbhid.replaceAll(',', '\',\'') + "')";

                }


                var orderByString = ' to_number(f_cbxh) asc';
                var columnsString = 'f_value1^f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^f_khbh^f_ztkhh^f_khfz^f_khfzid^f_ycje^f_yslx^f_yslxid^f_tbbh^f_sfjlbjf^f_zt^f_ztid^f_bz^f_cbbh^f_cbbhid^f_cbxh^f_cbyxm^f_cbyid^f_cbzq^f_cbmc^f_yhbh^f_yhbhid^f_jfm^f_yhfz^f_yhfzid^f_dz^f_dh^f_dy^f_dyid^f_sc^f_scid^f_qy^f_qyid^f_pq^f_pqid^f_tsyxzh^f_hth^f_sfzh^f_khrq^f_sbbh^f_sbbhid^f_bqzm^f_sqzm^f_bqsl^f_sqsl^f_qsqpjsl^f_qlqpjsl^f_ljgl^f_lxth^f_sblx^f_sblxid^f_jllx^f_jllxid^f_tssbbh^f_yhm^f_ljqf^f_tjjzpwf^f_tjjzsf^f_tssbbhid^f_nljgl^sys_id';

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

                        $('#table_grid_tbl_ld_khb_list').bootstrapTable("hideLoading");

                        $('#table_grid_tbl_ld_khb_list').bootstrapTable("loadJson", messageJson);

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

        initAndBindGrid: function (callBackFunction)
        {
            $('#table_grid_tbl_ld_khb_list').bootstrapTable("destroy");
            initGrid({
                success: function ()
                {

                    that.bindGrid({
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
            })
        },



        //---------------------------------------------------------------------------------
        // ---------------------------------按钮------------------------------------------
        //---------------------------------------------------------------------------------



        /* 
        *  
        *  方法:btn_command_clearselect_onclick
        *  参数:
        *  清空选择内容
        *  
        */
        btn_command_clearselect_onclick: function ()
        {
            $('#table_grid_tbl_ld_khb_list').bootstrapTable('uncheckAll');
            that._pr_gridselectids = '';
            gridSelectedChange();
        },

        //---------------------------------------------------------------------------------
        // ---------------------------------SearchModel------------------------------------
        //---------------------------------------------------------------------------------








        //移动
        moveFunction: function (type, callBackFunction)
        {

            if (that._pr_gridselectids == '')
            {

                callBackFunction.fail('请选择一条数据!');
            }
            else
            {





                var data = {
                    sys_id: that._pr_gridselectids,
                    type: type,
                    clientInf: _clientInf
                };
                doAjaxFunction(_serviceUrl, 'Move', data, {
                    success: function (result)
                    {
                        callBackFunction.success();
                    },
                    fail: function (message)
                    {
                        if (type == "up")
                        {
                            callBackFunction.fail("当前已经是第一条数据");
                        }



                        else
                        {
                            callBackFunction.fail("当前已经是最后一条数据");

                        }




                    }
                });


            }


        },



    };
    return that;
})();





