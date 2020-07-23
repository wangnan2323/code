

var tbl_ld_ickss_list_Obj = (function ()
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

    //Code数据存储容器
    _baseCodeHashMap = null,

    _validateMessage = null,

    //_ladda_btn_command_new = null,
    //_ladda_btn_command_delete = null,
    _ladda_btn_command_exp_ickpart = null,
    //查询sql语句
    _whereClauseString = '',
    _ladda_btn_command_ickhis = null, 

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
                    $('#btn_command_search_tbl_ld_ickss_list').html('简单查询');
                    $('#txt_command_search_tbl_ld_ickss_list').removeAttr("disabled");

                    break;
                case "2":
                    $('#btn_command_search_tbl_ld_ickss_list').html('高级查询');
                    $('#txt_command_search_tbl_ld_ickss_list').attr("disabled", true);
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
            var columnsarray = [
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
                                   if (row.f_lyid == '08080005')
                                   {
                                       return {
                                           disabled: true
                                       }
                                       //            disabled: true
                                       //            //checked: false
                                       //    }
                                   }
                                   //} else
                                   //{
                                   //    if (('^' + that._pr_gridselectids + '^').indexOf('^' + row.sys_id + '^') > -1)
                                   //    {
                                   //        return {
                                   //            disabled: false,
                                   //            checked: true
                                   //        }
                                   //    }
                                   //    return value;
                                   //}

                                   switch (row.f_ztid)
                                   {
                                       case "0":
                                           {
                                               if (('^' + that._pr_gridselectids + '^').indexOf('^' + row.sys_id + '^') > -1)
                                               {
                                                   return {
                                                       disabled: false,
                                                       checked: true
                                                   }
                                               }
                                               else
                                               {
                                                   return {
                                                       disabled: false,
                                                       checked: false
                                                   }
                                               }
                                           }
                                           break;
                                       case "1":
                                       case "2":
                                       case "3":
                                       case "9":
                                           {
                                               return {
                                                   disabled: true
                                               }
                                           }
                                           break;
                                   }


                               }
                               break;
                               //制度模式
                           case "2":
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
                               break;
                       }
                   }
               },
               {
                   field: 'sys_id', title: 'sys_id',
                   "class": 'hidden',
                   align: 'center',
                   valign: 'middle',
                   visible: true,
                   sortable: false,
               }

            ];
            //根据页面情况设置Grid的高度
            var gridHeight = 600;
            var columnHashMap = new hashMap();
          
            columnHashMap.put('f_khbh', {
                field: 'f_khbh',
                title: "客户编号",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;
                    return resultStr;
                }
            });
            columnHashMap.put('f_yhbh', {
                field: 'f_yhbh',
                title: "用户编号",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;
                    return resultStr;
                }
            });
            columnHashMap.put('f_dz', {
                field: 'f_dz',
                title: "地址",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;
                    return resultStr;
                }
            });
            columnHashMap.put('f_dh', {
                field: 'f_dh',
                title: "电话",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;
                    return resultStr;
                }
            });
            columnHashMap.put('f_dy', {
                field: 'f_dy',
                title: "地域",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;
                    return resultStr;
                }
            });
            columnHashMap.put('f_sc', {
                field: 'f_sc',
                title: "水厂",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;
                    return resultStr;
                }
            });
            columnHashMap.put('f_qy', {
                field: 'f_qy',
                title: "区域",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;
                    return resultStr;
                }
            });
            columnHashMap.put('f_pq', {
                field: 'f_pq',
                title: "片区",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;
                    return resultStr;
                }
            });
            columnHashMap.put('f_yhm', {
                field: 'f_yhm',
                title: "用户名",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;
                    return resultStr;
                }
            });
            columnHashMap.put('f_jfm', {
                field: 'f_jfm',
                title: "缴费名",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;
                    return resultStr;
                }
            });
            columnHashMap.put('f_lxtkhh', {
                field: 'f_lxtkhh',
                title: "老系统客户号",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;
                    return resultStr;
                }
            });
            columnHashMap.put('f_khrq', {
                field: 'f_khrq',
                title: "开户日期",
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
            });
            columnHashMap.put('f_yslx', {
                field: 'f_yslx',
                title: "用水类型",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;
                    return resultStr;
                }
            });
            columnHashMap.put('f_sbbh', {
                field: 'f_sbbh',
                title: "水表编号",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;
                    return resultStr;
                }
            });
            columnHashMap.put('f_kj', {
                field: 'f_kj',
                title: "口径",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;
                    return resultStr;
                }
            });
            columnHashMap.put('f_sblx', {
                field: 'f_sblx',
                title: "水表类型",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;
                    return resultStr;
                }
            });
            columnHashMap.put('f_rs', {
                field: 'f_rs',
                title: "人数",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;
                    return resultStr;
                }
            });
            columnHashMap.put('f_sf', {
                field: 'f_sf',
                title: "水费",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;
                    return resultStr;
                }
            });
            columnHashMap.put('f_sl', {
                field: 'f_sl',
                title: "水量",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;
                    return resultStr;
                }
            });
            columnHashMap.put('f_jfdh', {
                field: 'f_jfdh',
                title: "缴费单号",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;
                    return resultStr;
                }
            });
            columnHashMap.put('f_jfje', {
                field: 'f_jfje',
                title: "缴费金额",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;
                    return resultStr;
                }
            });
            columnHashMap.put('f_zt', {
                field: 'f_zt',
                title: "状态",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;
                    return resultStr;
                }
            });
            columnHashMap.put('f_bz', {
                field: 'f_bz',
                title: "备注",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;
                    return resultStr;
                }
            });
            columnHashMap.put('f_xkr', {
                field: 'f_xkr',
                title: "寻卡人",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;
                    return resultStr;
                }
            });
            columnHashMap.put('f_xkrq', {
                field: 'f_xkrq',
                title: "寻卡日期",
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
            });
            columnHashMap.put('f_xiekr', {
                field: 'f_xiekr',
                title: "写卡人",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;
                    return resultStr;
                }
            });
            columnHashMap.put('f_xiekrq', {
                field: 'f_xiekrq',
                title: "写卡日期",
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
            });
            columnHashMap.put('f_ssbh', {
                field: 'f_ssbh',
                title: "售水编号",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;
                    return resultStr;
                }
            });
            columnHashMap.put('f_ly', {
                field: 'f_ly',
                title: "来源",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;
                    return resultStr;
                }
            });
            columnHashMap.put('f_xklx', {
                field: 'f_xklx',
                title: "写卡类型",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;
                    return resultStr;
                }
            });
            columnHashMap.put('f_xkkh', {
                field: 'f_xkkh',
                title: "写卡卡号",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;
                    return resultStr;
                }
            });
            columnHashMap.put('f_xkgscs', {
                field: 'f_xkgscs',
                title: "写卡购水次数",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;
                    return resultStr;
                }
            });
            columnHashMap.put('f_xkbcgsl', {
                field: 'f_xkbcgsl',
                title: "写卡本次购水量",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;
                    return resultStr;
                }
            });
            columnHashMap.put('f_xkms', {
                field: 'f_xkms',
                title: "写卡模式",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;
                    return resultStr;
                }
            });
            columnHashMap.put('f_xkljgl', {
                field: 'f_xkljgl',
                title: "写卡累积购量",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;
                    return resultStr;
                }
            });
            columnHashMap.put('f_xkjzlx', {
                field: 'f_xkjzlx',
                title: "写卡介质类型",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;
                    return resultStr;
                }
            });
            columnHashMap.put('f_port', {
                field: 'f_port',
                title: "串口号",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;
                    return resultStr;
                }
            });
            columnHashMap.put('f_dkkh', {
                field: 'f_dkkh',
                title: "读卡卡号",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;
                    return resultStr;
                }
            });
            columnHashMap.put('f_dkbcgsl', {
                field: 'f_dkbcgsl',
                title: "读卡本次购水量",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;
                    return resultStr;
                }
            });
            columnHashMap.put('f_dkgscs', {
                field: 'f_dkgscs',
                title: "读卡购水次数",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;
                    return resultStr;
                }
            });
            columnHashMap.put('f_dkljgl', {
                field: 'f_dkljgl',
                title: "读卡累积购量",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;
                    return resultStr;
                }
            });
            columnHashMap.put('f_dkjzlx', {
                field: 'f_dkjzlx',
                title: "读卡介质类型",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;
                    return resultStr;
                }
            });
            columnHashMap.put('f_dksbzt', {
                field: 'f_dksbzt',
                title: "读卡刷表状态",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;
                    return resultStr;
                }
            });
            columnHashMap.put('f_khfz', {
                field: 'f_khfz',
                title: "客户分组",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;
                    return resultStr;
                }
            });
            columnHashMap.put('f_cbbh', {
                field: 'f_cbbh',
                title: "抄本编号",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;
                    return resultStr;
                }
            });
            columnHashMap.put('f_dj', {
                field: 'f_dj',
                title: "单价",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;
                    return resultStr;
                }
            });
            columnHashMap.put('f_pwf', {
                field: 'f_pwf',
                title: "污水处理费",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;
                    return resultStr;
                }
            });
            columnHashMap.put('f_ysje', {
                field: 'f_ysje',
                title: "应收金额",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;
                    return resultStr;
                }
            });
            columnHashMap.put('f_jmhysje', {
                field: 'f_jmhysje',
                title: "减免后应收金额",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;
                    return resultStr;
                }
            });
            columnHashMap.put('f_khytjjzsf', {
                field: 'f_khytjjzsf',
                title: "客户原调价结转水费",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;
                    return resultStr;
                }
            });
            columnHashMap.put('f_khytjjzpwf', {
                field: 'f_khytjjzpwf',
                title: "客户原调价结转污水处理费",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;
                    return resultStr;
                }
            });
            columnHashMap.put('f_sfsytjjz', {
                field: 'f_sfsytjjz',
                title: "是否使用调价结转",
                "class": '',
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
                    return resultStr;
                }
            });
            columnHashMap.put('f_sytjjzsf', {
                field: 'f_sytjjzsf',
                title: "使用调价结转水费",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;
                    return resultStr;
                }
            });
            columnHashMap.put('f_sytjjzpwf', {
                field: 'f_sytjjzpwf',
                title: "使用调价结转污水处理费",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;
                    return resultStr;
                }
            });
            columnHashMap.put('f_syhtjjzsf', {
                field: 'f_syhtjjzsf',
                title: "使用后调价结转水费",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;
                    return resultStr;
                }
            });
            columnHashMap.put('f_syhtjjzpwf', {
                field: 'f_syhtjjzpwf',
                title: "使用后调价结转污水处理费",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;
                    return resultStr;
                }
            });
            columnHashMap.put('f_khyye', {
                field: 'f_khyye',
                title: "客户原余额",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;
                    return resultStr;
                }
            });
            columnHashMap.put('f_sfsyye', {
                field: 'f_sfsyye',
                title: "是否使用余额",
                "class": '',
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
                    return resultStr;
                }
            });
            columnHashMap.put('f_syye', {
                field: 'f_syye',
                title: "使用余额",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;
                    return resultStr;
                }
            });
            columnHashMap.put('f_yhye', {
                field: 'f_yhye',
                title: "用后余额",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;
                    return resultStr;
                }
            });
            columnHashMap.put('f_shys', {
                field: 'f_shys',
                title: "算后应收",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;
                    return resultStr;
                }
            });
            columnHashMap.put('f_shss', {
                field: 'f_shss',
                title: "算后实收",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;
                    return resultStr;
                }
            });
            columnHashMap.put('f_shzl', {
                field: 'f_shzl',
                title: "算后找零",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;
                    return resultStr;
                }
            });
            columnHashMap.put('f_jffs', {
                field: 'f_jffs',
                title: "缴费方式",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;
                    return resultStr;
                }
            });
            columnHashMap.put('f_yyt', {
                field: 'f_yyt',
                title: "营业厅",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;
                    return resultStr;
                }
            });
            columnHashMap.put('f_kplb', {
                field: 'f_kplb',
                title: "开票类别",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;
                    return resultStr;
                }
            });
            columnHashMap.put('f_sfjl', {
                field: 'f_sfjl',
                title: "算法记录",
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;
                    return resultStr;
                }
            });

            var column = getCookie("tbl_ld_ickss_query_list_column");

            if (column != null && column != 'undefined' && column != "")
            {
                var ss = column.split(',');
                $.each(ss, function (i, u)
                {
                    var columnObj = columnHashMap.get(u.toLowerCase());
                    if (columnObj != undefined)
                    {
                        columnObj["class"] = '';
                        columnsarray.push(columnObj);
                    }

                });
            }
            else
            {

                var columnObj = columnHashMap.get('f_ssbh');
                columnObj["class"] = '';
                columnsarray.push(columnObj);

                columnObj = columnHashMap.get('f_khbh');
                columnObj["class"] = '';
                columnsarray.push(columnObj);

                columnObj = columnHashMap.get('f_yhm');
                columnObj["class"] = '';
                columnsarray.push(columnObj);

                columnObj = columnHashMap.get('f_dz');
                columnObj["class"] = '';
                columnsarray.push(columnObj);

                columnObj = columnHashMap.get('f_dh');
                columnObj["class"] = '';
                columnsarray.push(columnObj);

                columnObj = columnHashMap.get('f_xkgscs');
                columnObj["class"] = '';
                columnsarray.push(columnObj);

                columnObj = columnHashMap.get('f_xkljgl');
                columnObj["class"] = '';
                columnsarray.push(columnObj);

                columnObj = columnHashMap.get('f_yslx');
                columnObj["class"] = '';
                columnsarray.push(columnObj);

                columnObj = columnHashMap.get('f_sl');
                columnObj["class"] = '';
                columnsarray.push(columnObj);

                columnObj = columnHashMap.get('f_shys');
                columnObj["class"] = '';
                columnsarray.push(columnObj);


                columnObj = columnHashMap.get('f_zt');
                columnObj["class"] = '';
                columnsarray.push(columnObj);

                columnObj = columnHashMap.get('f_ly');
                columnObj["class"] = '';
                columnsarray.push(columnObj);

                columnObj = columnHashMap.get('f_xiekrq');
                columnObj["class"] = '';
                columnsarray.push(columnObj);

            }
            $('#table_grid_tbl_ld_ickss_list').bootstrapTable({
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
                columns: columnsarray,
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
                    //获取当前grid中全部选中的行
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

    /* 
    *  
    *  方法:setDisable
    *  参数:isDisable
    *  设置页面控件只读情况
    */
    setDisable = function (isDisable)
    {
        if (isDisable)
        {
            $('#btn_command_new_tbl_ld_ickss_list').addClass('hidden');
            $('#btn_command_delete_tbl_ld_ickss_list').addClass('hidden');
        }
        else
        {

            $('#btn_command_new_tbl_ld_ickss_list').removeClass('hidden');
            $('#btn_command_delete_tbl_ld_ickss_list').removeClass('hidden');
        }
    },

    /* 
    *  
    *  方法:transToDetailPage
    *  参数:id, pagetype
    *  跳页方法
    */
    transToDetailPage = function (id, pagetype)
    {
       tbl_ld_ickss_detail_Obj._pr_sys_id = id;
        tbl_ld_ickss_detail_Obj.bindPage({
            success: function ()
            {
                $('#div_content_part_tbl_ld_ickss_list').css('display', 'none');
                $('#div_content_part_tbl_ld_ickss_detail').css('display', '');
            }
        });
    },

    //---------------------------------------------------------------------------------
    // ---------------------------------SearchModel------------------------------------
    //---------------------------------------------------------------------------------
    /* 
    *  
    *  方法:initSearchBaseCode
    *  参数:callBackFunction
    *  初始化高级查询model用到Code内容，存储在_baseCodeHashMap中
    */
    initSearchBaseCode = function (callBackFunction)
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

    /* 
    *  
    *  方法:initSearchControl
    *  参数:callBackFunction
    *  初始化高级查询model控件，会用到_baseCodeHashMap
    */
    initSearchControl = function (callBackFunction)
    {
        try
        {
            //单选下拉列表--采用复选模式
            var resultArray = _baseCodeHashMap.get('servicecode_0108');
            var toggleArray = [{ id: 'true', text: '开' }, { id: 'false', text: '关' }];

	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
						controlObj.datetimeinit('search_datetime_f_khrq_tbl_ld_ickss_list_datefrom', 'search_datetime_f_khrq_tbl_ld_ickss_list_timefrom');     
			controlObj.datetimeinit('search_datetime_f_khrq_tbl_ld_ickss_list_dateto', 'search_datetime_f_khrq_tbl_ld_ickss_list_timeto');     
			
			controlObj.datetime('search_datetime_f_khrq_tbl_ld_ickss_list_datefrom', 'search_datetime_f_khrq_tbl_ld_ickss_list_timefrom', '1900-01-01 00:00:00');
			controlObj.datetime('search_datetime_f_khrq_tbl_ld_ickss_list_dateto', 'search_datetime_f_khrq_tbl_ld_ickss_list_timeto', '1900-01-01 00:00:00');          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		 
       

            //模态窗口
            $('#div_search_modal_tbl_ld_ickss_list').modal({
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

    // ---------------------------------Model操作------------------------------------
    /* 
    *  
    *  方法:setSearchModel
    *  参数:callBackFunction
    *  根据_pr_searchcontent设置查询model的内容
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
                        $("#txt_command_search_tbl_ld_ickss_list").val(that._pr_searchcontent.type1);
                    }

                    break;
                case "2":
                    if (that._pr_searchcontent.type2 != undefined)
                    {
                        //高级查询
                        var tbl_ld_ickss_list = that._pr_searchcontent.type2;

        	
						controlObj.text('search_txt_f_value1_tbl_ld_ickss_list', tbl_ld_ickss_list.f_value1);          
			
						controlObj.text('search_txt_f_value2_tbl_ld_ickss_list', tbl_ld_ickss_list.f_value2);          
			
						controlObj.text('search_txt_f_value3_tbl_ld_ickss_list', tbl_ld_ickss_list.f_value3);          
			
						controlObj.text('search_txt_f_value4_tbl_ld_ickss_list', tbl_ld_ickss_list.f_value4);          
			
						controlObj.text('search_txt_f_value5_tbl_ld_ickss_list', tbl_ld_ickss_list.f_value5);          
			
						controlObj.text('search_txt_f_value6_tbl_ld_ickss_list', tbl_ld_ickss_list.f_value6);          
			
						controlObj.text('search_txt_f_value7_tbl_ld_ickss_list', tbl_ld_ickss_list.f_value7);          
			
						controlObj.text('search_txt_f_value8_tbl_ld_ickss_list', tbl_ld_ickss_list.f_value8);          
			
						controlObj.text('search_txt_f_value9_tbl_ld_ickss_list', tbl_ld_ickss_list.f_value9);          
			
						controlObj.text('search_txt_f_value10_tbl_ld_ickss_list', tbl_ld_ickss_list.f_value10);          
			
						controlObj.text('search_txt_f_khbh_tbl_ld_ickss_list', tbl_ld_ickss_list.f_khbh);          
			
						controlObj.text('search_txt_f_khbhid_tbl_ld_ickss_list', tbl_ld_ickss_list.f_khbhid);          
			
						controlObj.text('search_txt_f_yhbh_tbl_ld_ickss_list', tbl_ld_ickss_list.f_yhbh);          
			
						controlObj.text('search_txt_f_yhbhid_tbl_ld_ickss_list', tbl_ld_ickss_list.f_yhbhid);          
			
						controlObj.text('search_txt_f_dz_tbl_ld_ickss_list', tbl_ld_ickss_list.f_dz);          
			
						controlObj.text('search_txt_f_dh_tbl_ld_ickss_list', tbl_ld_ickss_list.f_dh);          
			
						controlObj.text('search_txt_f_dy_tbl_ld_ickss_list', tbl_ld_ickss_list.f_dy);          
			
						controlObj.text('search_txt_f_dyid_tbl_ld_ickss_list', tbl_ld_ickss_list.f_dyid);          
			
						controlObj.text('search_txt_f_sc_tbl_ld_ickss_list', tbl_ld_ickss_list.f_sc);          
			
						controlObj.text('search_txt_f_scid_tbl_ld_ickss_list', tbl_ld_ickss_list.f_scid);          
			
						controlObj.text('search_txt_f_qy_tbl_ld_ickss_list', tbl_ld_ickss_list.f_qy);          
			
						controlObj.text('search_txt_f_qyid_tbl_ld_ickss_list', tbl_ld_ickss_list.f_qyid);          
			
						controlObj.text('search_txt_f_pq_tbl_ld_ickss_list', tbl_ld_ickss_list.f_pq);          
			
						controlObj.text('search_txt_f_pqid_tbl_ld_ickss_list', tbl_ld_ickss_list.f_pqid);          
			
						controlObj.text('search_txt_f_yhm_tbl_ld_ickss_list', tbl_ld_ickss_list.f_yhm);          
			
						controlObj.text('search_txt_f_jfm_tbl_ld_ickss_list', tbl_ld_ickss_list.f_jfm);          
			
						controlObj.text('search_txt_f_lxtkhh_tbl_ld_ickss_list', tbl_ld_ickss_list.f_lxtkhh);          
			
						
			controlObj.datetime('search_datetime_f_khrq_tbl_ld_ickss_list_datefrom', 'search_datetime_f_khrq_tbl_ld_ickss_listtimefrom', tbl_ld_ickss_list.f_khrqfrom);
			controlObj.datetime('search_datetime_f_khrq_tbl_ld_ickss_list_dateto', 'search_datetime_f_khrq_tbl_ld_ickss_list_timeto', tbl_ld_ickss_list.f_khrqto);
			            
			
						controlObj.text('search_txt_f_yslx_tbl_ld_ickss_list', tbl_ld_ickss_list.f_yslx);          
			
						controlObj.text('search_txt_f_yslxid_tbl_ld_ickss_list', tbl_ld_ickss_list.f_yslxid);          
			
						controlObj.text('search_txt_f_sbbh_tbl_ld_ickss_list', tbl_ld_ickss_list.f_sbbh);          
			
						controlObj.text('search_txt_f_sbbhid_tbl_ld_ickss_list', tbl_ld_ickss_list.f_sbbhid);          
			
						controlObj.text('search_txt_f_kj_tbl_ld_ickss_list', tbl_ld_ickss_list.f_kj);          
			
						controlObj.text('search_txt_f_kjid_tbl_ld_ickss_list', tbl_ld_ickss_list.f_kjid);          
			
						controlObj.text('search_txt_f_sblx_tbl_ld_ickss_list', tbl_ld_ickss_list.f_sblx);          
			
						controlObj.text('search_txt_f_sblxid_tbl_ld_ickss_list', tbl_ld_ickss_list.f_sblxid);          
			
						controlObj.text('search_txt_f_rs_tbl_ld_ickss_list', tbl_ld_ickss_list.f_rs);          
			
						controlObj.text('search_txt_f_sf_tbl_ld_ickss_list', tbl_ld_ickss_list.f_sf);          
			
						controlObj.text('search_txt_f_sl_tbl_ld_ickss_list', tbl_ld_ickss_list.f_sl);          
			
						controlObj.text('search_txt_f_jfdh_tbl_ld_ickss_list', tbl_ld_ickss_list.f_jfdh);          
			
						controlObj.text('search_txt_f_jfje_tbl_ld_ickss_list', tbl_ld_ickss_list.f_jfje);          
			
						controlObj.text('search_txt_f_zt_tbl_ld_ickss_list', tbl_ld_ickss_list.f_zt);          
			
						controlObj.text('search_txt_f_ztid_tbl_ld_ickss_list', tbl_ld_ickss_list.f_ztid);          
			
						controlObj.text('search_txt_f_bz_tbl_ld_ickss_list', tbl_ld_ickss_list.f_bz);          
			
						controlObj.text('search_txt_f_xkr_tbl_ld_ickss_list', tbl_ld_ickss_list.f_xkr);          
			
						controlObj.text('search_txt_f_xkrid_tbl_ld_ickss_list', tbl_ld_ickss_list.f_xkrid);          
			
						controlObj.text('search_txt_f_xkrq_tbl_ld_ickss_list', tbl_ld_ickss_list.f_xkrq);          
			
						controlObj.text('search_txt_f_xiekr_tbl_ld_ickss_list', tbl_ld_ickss_list.f_xiekr);          
			
						controlObj.text('search_txt_f_xiekrid_tbl_ld_ickss_list', tbl_ld_ickss_list.f_xiekrid);          
			
						controlObj.text('search_txt_f_xiekrq_tbl_ld_ickss_list', tbl_ld_ickss_list.f_xiekrq);          
			
						controlObj.text('search_txt_f_ssbh_tbl_ld_ickss_list', tbl_ld_ickss_list.f_ssbh);          
			
						controlObj.text('search_txt_f_sjbh_tbl_ld_ickss_list', tbl_ld_ickss_list.f_sjbh);          
			
						controlObj.text('search_txt_f_ly_tbl_ld_ickss_list', tbl_ld_ickss_list.f_ly);          
			
						controlObj.text('search_txt_f_lyid_tbl_ld_ickss_list', tbl_ld_ickss_list.f_lyid);          
			
						controlObj.text('search_txt_f_xklx_tbl_ld_ickss_list', tbl_ld_ickss_list.f_xklx);          
			
						controlObj.text('search_txt_f_xkkh_tbl_ld_ickss_list', tbl_ld_ickss_list.f_xkkh);          
			
						controlObj.text('search_txt_f_xkgscs_tbl_ld_ickss_list', tbl_ld_ickss_list.f_xkgscs);          
			
						controlObj.text('search_txt_f_xkbcgsl_tbl_ld_ickss_list', tbl_ld_ickss_list.f_xkbcgsl);          
			
						controlObj.text('search_txt_f_xkms_tbl_ld_ickss_list', tbl_ld_ickss_list.f_xkms);          
			
						controlObj.text('search_txt_f_xkljgl_tbl_ld_ickss_list', tbl_ld_ickss_list.f_xkljgl);          
			
						controlObj.text('search_txt_f_xkjzlx_tbl_ld_ickss_list', tbl_ld_ickss_list.f_xkjzlx);          
			
						controlObj.text('search_txt_f_port_tbl_ld_ickss_list', tbl_ld_ickss_list.f_port);          
			
						controlObj.text('search_txt_f_dkkh_tbl_ld_ickss_list', tbl_ld_ickss_list.f_dkkh);          
			
						controlObj.text('search_txt_f_dkbcgsl_tbl_ld_ickss_list', tbl_ld_ickss_list.f_dkbcgsl);          
			
						controlObj.text('search_txt_f_dkgscs_tbl_ld_ickss_list', tbl_ld_ickss_list.f_dkgscs);          
			
						controlObj.text('search_txt_f_dkljgl_tbl_ld_ickss_list', tbl_ld_ickss_list.f_dkljgl);          
			
						controlObj.text('search_txt_f_dkjzlx_tbl_ld_ickss_list', tbl_ld_ickss_list.f_dkjzlx);          
			
						controlObj.text('search_txt_f_dksbzt_tbl_ld_ickss_list', tbl_ld_ickss_list.f_dksbzt);          
			
						controlObj.text('search_txt_f_khfz_tbl_ld_ickss_list', tbl_ld_ickss_list.f_khfz);          
			
						controlObj.text('search_txt_f_khfzid_tbl_ld_ickss_list', tbl_ld_ickss_list.f_khfzid);          
			
						controlObj.text('search_txt_f_cbbh_tbl_ld_ickss_list', tbl_ld_ickss_list.f_cbbh);          
			
						controlObj.text('search_txt_f_cbbhid_tbl_ld_ickss_list', tbl_ld_ickss_list.f_cbbhid);          
			
						controlObj.text('search_txt_f_dj_tbl_ld_ickss_list', tbl_ld_ickss_list.f_dj);          
			
						controlObj.text('search_txt_f_pwf_tbl_ld_ickss_list', tbl_ld_ickss_list.f_pwf);          
			
						controlObj.text('search_txt_f_ysje_tbl_ld_ickss_list', tbl_ld_ickss_list.f_ysje);          
			
						controlObj.text('search_txt_f_jmhysje_tbl_ld_ickss_list', tbl_ld_ickss_list.f_jmhysje);          
			
						controlObj.text('search_txt_f_khytjjzsf_tbl_ld_ickss_list', tbl_ld_ickss_list.f_khytjjzsf);          
			
						controlObj.text('search_txt_f_khytjjzpwf_tbl_ld_ickss_list', tbl_ld_ickss_list.f_khytjjzpwf);          
			
						controlObj.text('search_txt_f_sfsytjjz_tbl_ld_ickss_list', tbl_ld_ickss_list.f_sfsytjjz);          
			
						controlObj.text('search_txt_f_sytjjzsf_tbl_ld_ickss_list', tbl_ld_ickss_list.f_sytjjzsf);          
			
						controlObj.text('search_txt_f_sytjjzpwf_tbl_ld_ickss_list', tbl_ld_ickss_list.f_sytjjzpwf);          
			
						controlObj.text('search_txt_f_syhtjjzsf_tbl_ld_ickss_list', tbl_ld_ickss_list.f_syhtjjzsf);          
			
						controlObj.text('search_txt_f_syhtjjzpwf_tbl_ld_ickss_list', tbl_ld_ickss_list.f_syhtjjzpwf);          
			
						controlObj.text('search_txt_f_khyye_tbl_ld_ickss_list', tbl_ld_ickss_list.f_khyye);          
			
						controlObj.text('search_txt_f_sfsyye_tbl_ld_ickss_list', tbl_ld_ickss_list.f_sfsyye);          
			
						controlObj.text('search_txt_f_syye_tbl_ld_ickss_list', tbl_ld_ickss_list.f_syye);          
			
						controlObj.text('search_txt_f_yhye_tbl_ld_ickss_list', tbl_ld_ickss_list.f_yhye);          
			
						controlObj.text('search_txt_f_shys_tbl_ld_ickss_list', tbl_ld_ickss_list.f_shys);          
			
						controlObj.text('search_txt_f_shss_tbl_ld_ickss_list', tbl_ld_ickss_list.f_shss);          
			
						controlObj.text('search_txt_f_shzl_tbl_ld_ickss_list', tbl_ld_ickss_list.f_shzl);          
			
						controlObj.text('search_txt_f_shssdx_tbl_ld_ickss_list', tbl_ld_ickss_list.f_shssdx);          
			
						controlObj.text('search_txt_f_jffs_tbl_ld_ickss_list', tbl_ld_ickss_list.f_jffs);          
			
						controlObj.text('search_txt_f_jffsid_tbl_ld_ickss_list', tbl_ld_ickss_list.f_jffsid);          
			
						controlObj.text('search_txt_f_xkmsid_tbl_ld_ickss_list', tbl_ld_ickss_list.f_xkmsid);          
			
						controlObj.text('search_txt_f_yyt_tbl_ld_ickss_list', tbl_ld_ickss_list.f_yyt);          
			
						controlObj.text('search_txt_f_kplb_tbl_ld_ickss_list', tbl_ld_ickss_list.f_kplb);          
			
						controlObj.text('search_txt_f_kplbid_tbl_ld_ickss_list', tbl_ld_ickss_list.f_kplbid);          
			
						controlObj.text('search_txt_f_yytid_tbl_ld_ickss_list', tbl_ld_ickss_list.f_yytid);          
			
						controlObj.text('search_txt_f_sfjl_tbl_ld_ickss_list', tbl_ld_ickss_list.f_sfjl);          
			
						controlObj.text('search_txt_f_tgly_tbl_ld_ickss_list', tbl_ld_ickss_list.f_tgly);          
		 
                
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
    *  获取查询model的内容保存到_pr_searchcontent
    */
    getSearchModel = function (callBackFunction)
    {
        try
        {
            switch (that._pr_searchtype)
            {

                case "1":
                    //简单查询
                    that._pr_searchcontent.type1 = $("#txt_command_search_tbl_ld_ickss_list").val();

                    break;
                case "2":

                    //高级查询
                    var tbl_ld_ickss_list = new Object();
				
				
										 
					  tbl_ld_ickss_list.f_value1 = controlObj.text('search_txt_f_value1_tbl_ld_ickss_list');          
				
				
										 
					  tbl_ld_ickss_list.f_value2 = controlObj.text('search_txt_f_value2_tbl_ld_ickss_list');          
				
				
										 
					  tbl_ld_ickss_list.f_value3 = controlObj.text('search_txt_f_value3_tbl_ld_ickss_list');          
				
				
										 
					  tbl_ld_ickss_list.f_value4 = controlObj.text('search_txt_f_value4_tbl_ld_ickss_list');          
				
				
										 
					  tbl_ld_ickss_list.f_value5 = controlObj.text('search_txt_f_value5_tbl_ld_ickss_list');          
				
				
										 
					  tbl_ld_ickss_list.f_value6 = controlObj.text('search_txt_f_value6_tbl_ld_ickss_list');          
				
				
										 
					  tbl_ld_ickss_list.f_value7 = controlObj.text('search_txt_f_value7_tbl_ld_ickss_list');          
				
				
										 
					  tbl_ld_ickss_list.f_value8 = controlObj.text('search_txt_f_value8_tbl_ld_ickss_list');          
				
				
										 
					  tbl_ld_ickss_list.f_value9 = controlObj.text('search_txt_f_value9_tbl_ld_ickss_list');          
				
				
										 
					  tbl_ld_ickss_list.f_value10 = controlObj.text('search_txt_f_value10_tbl_ld_ickss_list');          
				
				
										 
					  tbl_ld_ickss_list.f_khbh = controlObj.text('search_txt_f_khbh_tbl_ld_ickss_list');          
				
				
										 
					  tbl_ld_ickss_list.f_khbhid = controlObj.text('search_txt_f_khbhid_tbl_ld_ickss_list');          
				
				
										 
					  tbl_ld_ickss_list.f_yhbh = controlObj.text('search_txt_f_yhbh_tbl_ld_ickss_list');          
				
				
										 
					  tbl_ld_ickss_list.f_yhbhid = controlObj.text('search_txt_f_yhbhid_tbl_ld_ickss_list');          
				
				
										 
					  tbl_ld_ickss_list.f_dz = controlObj.text('search_txt_f_dz_tbl_ld_ickss_list');          
				
				
										 
					  tbl_ld_ickss_list.f_dh = controlObj.text('search_txt_f_dh_tbl_ld_ickss_list');          
				
				
										 
					  tbl_ld_ickss_list.f_dy = controlObj.text('search_txt_f_dy_tbl_ld_ickss_list');          
				
				
										 
					  tbl_ld_ickss_list.f_dyid = controlObj.text('search_txt_f_dyid_tbl_ld_ickss_list');          
				
				
										 
					  tbl_ld_ickss_list.f_sc = controlObj.text('search_txt_f_sc_tbl_ld_ickss_list');          
				
				
										 
					  tbl_ld_ickss_list.f_scid = controlObj.text('search_txt_f_scid_tbl_ld_ickss_list');          
				
				
										 
					  tbl_ld_ickss_list.f_qy = controlObj.text('search_txt_f_qy_tbl_ld_ickss_list');          
				
				
										 
					  tbl_ld_ickss_list.f_qyid = controlObj.text('search_txt_f_qyid_tbl_ld_ickss_list');          
				
				
										 
					  tbl_ld_ickss_list.f_pq = controlObj.text('search_txt_f_pq_tbl_ld_ickss_list');          
				
				
										 
					  tbl_ld_ickss_list.f_pqid = controlObj.text('search_txt_f_pqid_tbl_ld_ickss_list');          
				
				
										 
					  tbl_ld_ickss_list.f_yhm = controlObj.text('search_txt_f_yhm_tbl_ld_ickss_list');          
				
				
										 
					  tbl_ld_ickss_list.f_jfm = controlObj.text('search_txt_f_jfm_tbl_ld_ickss_list');          
				
				
										 
					  tbl_ld_ickss_list.f_lxtkhh = controlObj.text('search_txt_f_lxtkhh_tbl_ld_ickss_list');          
				
				
								
					tbl_ld_ickss_list.f_khrqfrom = controlObj.datetime('search_datetime_f_khrq_tbl_ld_ickss_list_datefrom', 'search_datetime_f_khrq_tbl_ld_ickss_list_timefrom'); // datefrom + ' ' + timefrom;
	                tbl_ld_ickss_list.f_khrqto = controlObj.datetime('search_datetime_f_khrq_tbl_ld_ickss_list_dateto', 'search_datetime_f_khrq_tbl_ld_ickss_list_timeto'); //dateto + ' ' + timeto;
                          
				
				
										 
					  tbl_ld_ickss_list.f_yslx = controlObj.text('search_txt_f_yslx_tbl_ld_ickss_list');          
				
				
										 
					  tbl_ld_ickss_list.f_yslxid = controlObj.text('search_txt_f_yslxid_tbl_ld_ickss_list');          
				
				
										 
					  tbl_ld_ickss_list.f_sbbh = controlObj.text('search_txt_f_sbbh_tbl_ld_ickss_list');          
				
				
										 
					  tbl_ld_ickss_list.f_sbbhid = controlObj.text('search_txt_f_sbbhid_tbl_ld_ickss_list');          
				
				
										 
					  tbl_ld_ickss_list.f_kj = controlObj.text('search_txt_f_kj_tbl_ld_ickss_list');          
				
				
										 
					  tbl_ld_ickss_list.f_kjid = controlObj.text('search_txt_f_kjid_tbl_ld_ickss_list');          
				
				
										 
					  tbl_ld_ickss_list.f_sblx = controlObj.text('search_txt_f_sblx_tbl_ld_ickss_list');          
				
				
										 
					  tbl_ld_ickss_list.f_sblxid = controlObj.text('search_txt_f_sblxid_tbl_ld_ickss_list');          
				
				
										 
					  tbl_ld_ickss_list.f_rs = controlObj.text('search_txt_f_rs_tbl_ld_ickss_list');          
				
				
										 
					  tbl_ld_ickss_list.f_sf = controlObj.text('search_txt_f_sf_tbl_ld_ickss_list');          
				
				
										 
					  tbl_ld_ickss_list.f_sl = controlObj.text('search_txt_f_sl_tbl_ld_ickss_list');          
				
				
										 
					  tbl_ld_ickss_list.f_jfdh = controlObj.text('search_txt_f_jfdh_tbl_ld_ickss_list');          
				
				
										 
					  tbl_ld_ickss_list.f_jfje = controlObj.text('search_txt_f_jfje_tbl_ld_ickss_list');          
				
				
										 
					  tbl_ld_ickss_list.f_zt = controlObj.text('search_txt_f_zt_tbl_ld_ickss_list');          
				
				
										 
					  tbl_ld_ickss_list.f_ztid = controlObj.text('search_txt_f_ztid_tbl_ld_ickss_list');          
				
				
										 
					  tbl_ld_ickss_list.f_bz = controlObj.text('search_txt_f_bz_tbl_ld_ickss_list');          
				
				
										 
					  tbl_ld_ickss_list.f_xkr = controlObj.text('search_txt_f_xkr_tbl_ld_ickss_list');          
				
				
										 
					  tbl_ld_ickss_list.f_xkrid = controlObj.text('search_txt_f_xkrid_tbl_ld_ickss_list');          
				
				
										 
					  tbl_ld_ickss_list.f_xkrq = controlObj.text('search_txt_f_xkrq_tbl_ld_ickss_list');          
				
				
										 
					  tbl_ld_ickss_list.f_xiekr = controlObj.text('search_txt_f_xiekr_tbl_ld_ickss_list');          
				
				
										 
					  tbl_ld_ickss_list.f_xiekrid = controlObj.text('search_txt_f_xiekrid_tbl_ld_ickss_list');          
				
				
										 
					  tbl_ld_ickss_list.f_xiekrq = controlObj.text('search_txt_f_xiekrq_tbl_ld_ickss_list');          
				
				
										 
					  tbl_ld_ickss_list.f_ssbh = controlObj.text('search_txt_f_ssbh_tbl_ld_ickss_list');          
				
				
										 
					  tbl_ld_ickss_list.f_sjbh = controlObj.text('search_txt_f_sjbh_tbl_ld_ickss_list');          
				
				
										 
					  tbl_ld_ickss_list.f_ly = controlObj.text('search_txt_f_ly_tbl_ld_ickss_list');          
				
				
										 
					  tbl_ld_ickss_list.f_lyid = controlObj.text('search_txt_f_lyid_tbl_ld_ickss_list');          
				
				
										 
					  tbl_ld_ickss_list.f_xklx = controlObj.text('search_txt_f_xklx_tbl_ld_ickss_list');          
				
				
										 
					  tbl_ld_ickss_list.f_xkkh = controlObj.text('search_txt_f_xkkh_tbl_ld_ickss_list');          
				
				
										 
					  tbl_ld_ickss_list.f_xkgscs = controlObj.text('search_txt_f_xkgscs_tbl_ld_ickss_list');          
				
				
										 
					  tbl_ld_ickss_list.f_xkbcgsl = controlObj.text('search_txt_f_xkbcgsl_tbl_ld_ickss_list');          
				
				
										 
					  tbl_ld_ickss_list.f_xkms = controlObj.text('search_txt_f_xkms_tbl_ld_ickss_list');          
				
				
										 
					  tbl_ld_ickss_list.f_xkljgl = controlObj.text('search_txt_f_xkljgl_tbl_ld_ickss_list');          
				
				
										 
					  tbl_ld_ickss_list.f_xkjzlx = controlObj.text('search_txt_f_xkjzlx_tbl_ld_ickss_list');          
				
				
										 
					  tbl_ld_ickss_list.f_port = controlObj.text('search_txt_f_port_tbl_ld_ickss_list');          
				
				
										 
					  tbl_ld_ickss_list.f_dkkh = controlObj.text('search_txt_f_dkkh_tbl_ld_ickss_list');          
				
				
										 
					  tbl_ld_ickss_list.f_dkbcgsl = controlObj.text('search_txt_f_dkbcgsl_tbl_ld_ickss_list');          
				
				
										 
					  tbl_ld_ickss_list.f_dkgscs = controlObj.text('search_txt_f_dkgscs_tbl_ld_ickss_list');          
				
				
										 
					  tbl_ld_ickss_list.f_dkljgl = controlObj.text('search_txt_f_dkljgl_tbl_ld_ickss_list');          
				
				
										 
					  tbl_ld_ickss_list.f_dkjzlx = controlObj.text('search_txt_f_dkjzlx_tbl_ld_ickss_list');          
				
				
										 
					  tbl_ld_ickss_list.f_dksbzt = controlObj.text('search_txt_f_dksbzt_tbl_ld_ickss_list');          
				
				
										 
					  tbl_ld_ickss_list.f_khfz = controlObj.text('search_txt_f_khfz_tbl_ld_ickss_list');          
				
				
										 
					  tbl_ld_ickss_list.f_khfzid = controlObj.text('search_txt_f_khfzid_tbl_ld_ickss_list');          
				
				
										 
					  tbl_ld_ickss_list.f_cbbh = controlObj.text('search_txt_f_cbbh_tbl_ld_ickss_list');          
				
				
										 
					  tbl_ld_ickss_list.f_cbbhid = controlObj.text('search_txt_f_cbbhid_tbl_ld_ickss_list');          
				
				
										 
					  tbl_ld_ickss_list.f_dj = controlObj.text('search_txt_f_dj_tbl_ld_ickss_list');          
				
				
										 
					  tbl_ld_ickss_list.f_pwf = controlObj.text('search_txt_f_pwf_tbl_ld_ickss_list');          
				
				
										 
					  tbl_ld_ickss_list.f_ysje = controlObj.text('search_txt_f_ysje_tbl_ld_ickss_list');          
				
				
										 
					  tbl_ld_ickss_list.f_jmhysje = controlObj.text('search_txt_f_jmhysje_tbl_ld_ickss_list');          
				
				
										 
					  tbl_ld_ickss_list.f_khytjjzsf = controlObj.text('search_txt_f_khytjjzsf_tbl_ld_ickss_list');          
				
				
										 
					  tbl_ld_ickss_list.f_khytjjzpwf = controlObj.text('search_txt_f_khytjjzpwf_tbl_ld_ickss_list');          
				
				
										 
					  tbl_ld_ickss_list.f_sfsytjjz = controlObj.text('search_txt_f_sfsytjjz_tbl_ld_ickss_list');          
				
				
										 
					  tbl_ld_ickss_list.f_sytjjzsf = controlObj.text('search_txt_f_sytjjzsf_tbl_ld_ickss_list');          
				
				
										 
					  tbl_ld_ickss_list.f_sytjjzpwf = controlObj.text('search_txt_f_sytjjzpwf_tbl_ld_ickss_list');          
				
				
										 
					  tbl_ld_ickss_list.f_syhtjjzsf = controlObj.text('search_txt_f_syhtjjzsf_tbl_ld_ickss_list');          
				
				
										 
					  tbl_ld_ickss_list.f_syhtjjzpwf = controlObj.text('search_txt_f_syhtjjzpwf_tbl_ld_ickss_list');          
				
				
										 
					  tbl_ld_ickss_list.f_khyye = controlObj.text('search_txt_f_khyye_tbl_ld_ickss_list');          
				
				
										 
					  tbl_ld_ickss_list.f_sfsyye = controlObj.text('search_txt_f_sfsyye_tbl_ld_ickss_list');          
				
				
										 
					  tbl_ld_ickss_list.f_syye = controlObj.text('search_txt_f_syye_tbl_ld_ickss_list');          
				
				
										 
					  tbl_ld_ickss_list.f_yhye = controlObj.text('search_txt_f_yhye_tbl_ld_ickss_list');          
				
				
										 
					  tbl_ld_ickss_list.f_shys = controlObj.text('search_txt_f_shys_tbl_ld_ickss_list');          
				
				
										 
					  tbl_ld_ickss_list.f_shss = controlObj.text('search_txt_f_shss_tbl_ld_ickss_list');          
				
				
										 
					  tbl_ld_ickss_list.f_shzl = controlObj.text('search_txt_f_shzl_tbl_ld_ickss_list');          
				
				
										 
					  tbl_ld_ickss_list.f_shssdx = controlObj.text('search_txt_f_shssdx_tbl_ld_ickss_list');          
				
				
										 
					  tbl_ld_ickss_list.f_jffs = controlObj.text('search_txt_f_jffs_tbl_ld_ickss_list');          
				
				
										 
					  tbl_ld_ickss_list.f_jffsid = controlObj.text('search_txt_f_jffsid_tbl_ld_ickss_list');          
				
				
										 
					  tbl_ld_ickss_list.f_xkmsid = controlObj.text('search_txt_f_xkmsid_tbl_ld_ickss_list');          
				
				
										 
					  tbl_ld_ickss_list.f_yyt = controlObj.text('search_txt_f_yyt_tbl_ld_ickss_list');          
				
				
										 
					  tbl_ld_ickss_list.f_kplb = controlObj.text('search_txt_f_kplb_tbl_ld_ickss_list');          
				
				
										 
					  tbl_ld_ickss_list.f_kplbid = controlObj.text('search_txt_f_kplbid_tbl_ld_ickss_list');          
				
				
										 
					  tbl_ld_ickss_list.f_yytid = controlObj.text('search_txt_f_yytid_tbl_ld_ickss_list');          
				
				
										 
					  tbl_ld_ickss_list.f_sfjl = controlObj.text('search_txt_f_sfjl_tbl_ld_ickss_list');          
				
				
										 
					  tbl_ld_ickss_list.f_tgly = controlObj.text('search_txt_f_tgly_tbl_ld_ickss_list');          
				 

                    that._pr_searchcontent.type2 = tbl_ld_ickss_list;
                    break;

            }

            callBackFunction.success();
        }
        catch (ex)
        {
            _blockMessage.show('getSearchModel执行失败。<br/>' + ex.message, 'fail');
        }


    },

    /* 
    *  
    *  方法:checkSearchModel
    *  参数:callBackFunction
    *  针对_pr_searchcontent.type2进行验证
    */
    checkSearchModel = function (callBackFunction)
    {
        try
        {
            var tbl_ld_ickss_list = that._pr_searchcontent.type2;
            var errorMessageHansMap = new hashMap();
            var errorMessagePlacementHansMap = new hashMap();

        
									
			if (tbl_ld_ickss_list.f_value1.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_value1_tbl_ld_ickss_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_value1_tbl_ld_ickss_list', 'top');
			}			          
		
									
			if (tbl_ld_ickss_list.f_value2.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_value2_tbl_ld_ickss_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_value2_tbl_ld_ickss_list', 'top');
			}			          
		
									
			if (tbl_ld_ickss_list.f_value3.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_value3_tbl_ld_ickss_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_value3_tbl_ld_ickss_list', 'top');
			}			          
		
									
			if (tbl_ld_ickss_list.f_value4.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_value4_tbl_ld_ickss_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_value4_tbl_ld_ickss_list', 'top');
			}			          
		
									
			if (tbl_ld_ickss_list.f_value5.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_value5_tbl_ld_ickss_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_value5_tbl_ld_ickss_list', 'top');
			}			          
		
									
			if (tbl_ld_ickss_list.f_value6.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_value6_tbl_ld_ickss_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_value6_tbl_ld_ickss_list', 'top');
			}			          
		
									
			if (tbl_ld_ickss_list.f_value7.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_value7_tbl_ld_ickss_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_value7_tbl_ld_ickss_list', 'top');
			}			          
		
									
			if (tbl_ld_ickss_list.f_value8.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_value8_tbl_ld_ickss_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_value8_tbl_ld_ickss_list', 'top');
			}			          
		
									
			if (tbl_ld_ickss_list.f_value9.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_value9_tbl_ld_ickss_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_value9_tbl_ld_ickss_list', 'top');
			}			          
		
									
			if (tbl_ld_ickss_list.f_value10.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_value10_tbl_ld_ickss_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_value10_tbl_ld_ickss_list', 'top');
			}			          
		
									
			if (tbl_ld_ickss_list.f_khbh.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_khbh_tbl_ld_ickss_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_khbh_tbl_ld_ickss_list', 'top');
			}			          
		
									
			if (tbl_ld_ickss_list.f_khbhid.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_khbhid_tbl_ld_ickss_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_khbhid_tbl_ld_ickss_list', 'top');
			}			          
		
									
			if (tbl_ld_ickss_list.f_yhbh.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_yhbh_tbl_ld_ickss_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_yhbh_tbl_ld_ickss_list', 'top');
			}			          
		
									
			if (tbl_ld_ickss_list.f_yhbhid.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_yhbhid_tbl_ld_ickss_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_yhbhid_tbl_ld_ickss_list', 'top');
			}			          
		
									
			if (tbl_ld_ickss_list.f_dz.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_dz_tbl_ld_ickss_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_dz_tbl_ld_ickss_list', 'top');
			}			          
		
									
			if (tbl_ld_ickss_list.f_dh.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_dh_tbl_ld_ickss_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_dh_tbl_ld_ickss_list', 'top');
			}			          
		
									
			if (tbl_ld_ickss_list.f_dy.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_dy_tbl_ld_ickss_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_dy_tbl_ld_ickss_list', 'top');
			}			          
		
									
			if (tbl_ld_ickss_list.f_dyid.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_dyid_tbl_ld_ickss_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_dyid_tbl_ld_ickss_list', 'top');
			}			          
		
									
			if (tbl_ld_ickss_list.f_sc.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_sc_tbl_ld_ickss_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_sc_tbl_ld_ickss_list', 'top');
			}			          
		
									
			if (tbl_ld_ickss_list.f_scid.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_scid_tbl_ld_ickss_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_scid_tbl_ld_ickss_list', 'top');
			}			          
		
									
			if (tbl_ld_ickss_list.f_qy.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_qy_tbl_ld_ickss_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_qy_tbl_ld_ickss_list', 'top');
			}			          
		
									
			if (tbl_ld_ickss_list.f_qyid.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_qyid_tbl_ld_ickss_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_qyid_tbl_ld_ickss_list', 'top');
			}			          
		
									
			if (tbl_ld_ickss_list.f_pq.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_pq_tbl_ld_ickss_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_pq_tbl_ld_ickss_list', 'top');
			}			          
		
									
			if (tbl_ld_ickss_list.f_pqid.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_pqid_tbl_ld_ickss_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_pqid_tbl_ld_ickss_list', 'top');
			}			          
		
									
			if (tbl_ld_ickss_list.f_yhm.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_yhm_tbl_ld_ickss_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_yhm_tbl_ld_ickss_list', 'top');
			}			          
		
									
			if (tbl_ld_ickss_list.f_jfm.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_jfm_tbl_ld_ickss_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_jfm_tbl_ld_ickss_list', 'top');
			}			          
		
									
			if (tbl_ld_ickss_list.f_lxtkhh.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_lxtkhh_tbl_ld_ickss_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_lxtkhh_tbl_ld_ickss_list', 'top');
			}			          
		
						          
		
									
			if (tbl_ld_ickss_list.f_yslx.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_yslx_tbl_ld_ickss_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_yslx_tbl_ld_ickss_list', 'top');
			}			          
		
									
			if (tbl_ld_ickss_list.f_yslxid.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_yslxid_tbl_ld_ickss_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_yslxid_tbl_ld_ickss_list', 'top');
			}			          
		
									
			if (tbl_ld_ickss_list.f_sbbh.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_sbbh_tbl_ld_ickss_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_sbbh_tbl_ld_ickss_list', 'top');
			}			          
		
									
			if (tbl_ld_ickss_list.f_sbbhid.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_sbbhid_tbl_ld_ickss_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_sbbhid_tbl_ld_ickss_list', 'top');
			}			          
		
									
			if (tbl_ld_ickss_list.f_kj.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_kj_tbl_ld_ickss_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_kj_tbl_ld_ickss_list', 'top');
			}			          
		
									
			if (tbl_ld_ickss_list.f_kjid.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_kjid_tbl_ld_ickss_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_kjid_tbl_ld_ickss_list', 'top');
			}			          
		
									
			if (tbl_ld_ickss_list.f_sblx.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_sblx_tbl_ld_ickss_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_sblx_tbl_ld_ickss_list', 'top');
			}			          
		
									
			if (tbl_ld_ickss_list.f_sblxid.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_sblxid_tbl_ld_ickss_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_sblxid_tbl_ld_ickss_list', 'top');
			}			          
		
									
			if (tbl_ld_ickss_list.f_rs.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_rs_tbl_ld_ickss_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_rs_tbl_ld_ickss_list', 'top');
			}			          
		
									
			if (tbl_ld_ickss_list.f_sf.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_sf_tbl_ld_ickss_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_sf_tbl_ld_ickss_list', 'top');
			}			          
		
									
			if (tbl_ld_ickss_list.f_sl.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_sl_tbl_ld_ickss_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_sl_tbl_ld_ickss_list', 'top');
			}			          
		
									
			if (tbl_ld_ickss_list.f_jfdh.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_jfdh_tbl_ld_ickss_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_jfdh_tbl_ld_ickss_list', 'top');
			}			          
		
									
			if (tbl_ld_ickss_list.f_jfje.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_jfje_tbl_ld_ickss_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_jfje_tbl_ld_ickss_list', 'top');
			}			          
		
									
			if (tbl_ld_ickss_list.f_zt.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_zt_tbl_ld_ickss_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_zt_tbl_ld_ickss_list', 'top');
			}			          
		
									
			if (tbl_ld_ickss_list.f_ztid.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_ztid_tbl_ld_ickss_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_ztid_tbl_ld_ickss_list', 'top');
			}			          
		
									
			if (tbl_ld_ickss_list.f_bz.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_bz_tbl_ld_ickss_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_bz_tbl_ld_ickss_list', 'top');
			}			          
		
									
			if (tbl_ld_ickss_list.f_xkr.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_xkr_tbl_ld_ickss_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_xkr_tbl_ld_ickss_list', 'top');
			}			          
		
									
			if (tbl_ld_ickss_list.f_xkrid.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_xkrid_tbl_ld_ickss_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_xkrid_tbl_ld_ickss_list', 'top');
			}			          
		
									
			if (tbl_ld_ickss_list.f_xkrq.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_xkrq_tbl_ld_ickss_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_xkrq_tbl_ld_ickss_list', 'top');
			}			          
		
									
			if (tbl_ld_ickss_list.f_xiekr.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_xiekr_tbl_ld_ickss_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_xiekr_tbl_ld_ickss_list', 'top');
			}			          
		
									
			if (tbl_ld_ickss_list.f_xiekrid.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_xiekrid_tbl_ld_ickss_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_xiekrid_tbl_ld_ickss_list', 'top');
			}			          
		
									
			if (tbl_ld_ickss_list.f_xiekrq.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_xiekrq_tbl_ld_ickss_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_xiekrq_tbl_ld_ickss_list', 'top');
			}			          
		
									
			if (tbl_ld_ickss_list.f_ssbh.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_ssbh_tbl_ld_ickss_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_ssbh_tbl_ld_ickss_list', 'top');
			}			          
		
									
			if (tbl_ld_ickss_list.f_sjbh.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_sjbh_tbl_ld_ickss_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_sjbh_tbl_ld_ickss_list', 'top');
			}			          
		
									
			if (tbl_ld_ickss_list.f_ly.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_ly_tbl_ld_ickss_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_ly_tbl_ld_ickss_list', 'top');
			}			          
		
									
			if (tbl_ld_ickss_list.f_lyid.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_lyid_tbl_ld_ickss_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_lyid_tbl_ld_ickss_list', 'top');
			}			          
		
									
			if (tbl_ld_ickss_list.f_xklx.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_xklx_tbl_ld_ickss_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_xklx_tbl_ld_ickss_list', 'top');
			}			          
		
									
			if (tbl_ld_ickss_list.f_xkkh.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_xkkh_tbl_ld_ickss_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_xkkh_tbl_ld_ickss_list', 'top');
			}			          
		
									
			if (tbl_ld_ickss_list.f_xkgscs.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_xkgscs_tbl_ld_ickss_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_xkgscs_tbl_ld_ickss_list', 'top');
			}			          
		
									
			if (tbl_ld_ickss_list.f_xkbcgsl.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_xkbcgsl_tbl_ld_ickss_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_xkbcgsl_tbl_ld_ickss_list', 'top');
			}			          
		
									
			if (tbl_ld_ickss_list.f_xkms.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_xkms_tbl_ld_ickss_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_xkms_tbl_ld_ickss_list', 'top');
			}			          
		
									
			if (tbl_ld_ickss_list.f_xkljgl.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_xkljgl_tbl_ld_ickss_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_xkljgl_tbl_ld_ickss_list', 'top');
			}			          
		
									
			if (tbl_ld_ickss_list.f_xkjzlx.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_xkjzlx_tbl_ld_ickss_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_xkjzlx_tbl_ld_ickss_list', 'top');
			}			          
		
									
			if (tbl_ld_ickss_list.f_port.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_port_tbl_ld_ickss_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_port_tbl_ld_ickss_list', 'top');
			}			          
		
									
			if (tbl_ld_ickss_list.f_dkkh.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_dkkh_tbl_ld_ickss_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_dkkh_tbl_ld_ickss_list', 'top');
			}			          
		
									
			if (tbl_ld_ickss_list.f_dkbcgsl.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_dkbcgsl_tbl_ld_ickss_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_dkbcgsl_tbl_ld_ickss_list', 'top');
			}			          
		
									
			if (tbl_ld_ickss_list.f_dkgscs.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_dkgscs_tbl_ld_ickss_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_dkgscs_tbl_ld_ickss_list', 'top');
			}			          
		
									
			if (tbl_ld_ickss_list.f_dkljgl.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_dkljgl_tbl_ld_ickss_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_dkljgl_tbl_ld_ickss_list', 'top');
			}			          
		
									
			if (tbl_ld_ickss_list.f_dkjzlx.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_dkjzlx_tbl_ld_ickss_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_dkjzlx_tbl_ld_ickss_list', 'top');
			}			          
		
									
			if (tbl_ld_ickss_list.f_dksbzt.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_dksbzt_tbl_ld_ickss_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_dksbzt_tbl_ld_ickss_list', 'top');
			}			          
		
									
			if (tbl_ld_ickss_list.f_khfz.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_khfz_tbl_ld_ickss_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_khfz_tbl_ld_ickss_list', 'top');
			}			          
		
									
			if (tbl_ld_ickss_list.f_khfzid.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_khfzid_tbl_ld_ickss_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_khfzid_tbl_ld_ickss_list', 'top');
			}			          
		
									
			if (tbl_ld_ickss_list.f_cbbh.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_cbbh_tbl_ld_ickss_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_cbbh_tbl_ld_ickss_list', 'top');
			}			          
		
									
			if (tbl_ld_ickss_list.f_cbbhid.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_cbbhid_tbl_ld_ickss_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_cbbhid_tbl_ld_ickss_list', 'top');
			}			          
		
									
			if (tbl_ld_ickss_list.f_dj.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_dj_tbl_ld_ickss_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_dj_tbl_ld_ickss_list', 'top');
			}			          
		
									
			if (tbl_ld_ickss_list.f_pwf.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_pwf_tbl_ld_ickss_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_pwf_tbl_ld_ickss_list', 'top');
			}			          
		
									
			if (tbl_ld_ickss_list.f_ysje.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_ysje_tbl_ld_ickss_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_ysje_tbl_ld_ickss_list', 'top');
			}			          
		
									
			if (tbl_ld_ickss_list.f_jmhysje.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_jmhysje_tbl_ld_ickss_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_jmhysje_tbl_ld_ickss_list', 'top');
			}			          
		
									
			if (tbl_ld_ickss_list.f_khytjjzsf.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_khytjjzsf_tbl_ld_ickss_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_khytjjzsf_tbl_ld_ickss_list', 'top');
			}			          
		
									
			if (tbl_ld_ickss_list.f_khytjjzpwf.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_khytjjzpwf_tbl_ld_ickss_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_khytjjzpwf_tbl_ld_ickss_list', 'top');
			}			          
		
									
			if (tbl_ld_ickss_list.f_sfsytjjz.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_sfsytjjz_tbl_ld_ickss_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_sfsytjjz_tbl_ld_ickss_list', 'top');
			}			          
		
									
			if (tbl_ld_ickss_list.f_sytjjzsf.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_sytjjzsf_tbl_ld_ickss_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_sytjjzsf_tbl_ld_ickss_list', 'top');
			}			          
		
									
			if (tbl_ld_ickss_list.f_sytjjzpwf.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_sytjjzpwf_tbl_ld_ickss_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_sytjjzpwf_tbl_ld_ickss_list', 'top');
			}			          
		
									
			if (tbl_ld_ickss_list.f_syhtjjzsf.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_syhtjjzsf_tbl_ld_ickss_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_syhtjjzsf_tbl_ld_ickss_list', 'top');
			}			          
		
									
			if (tbl_ld_ickss_list.f_syhtjjzpwf.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_syhtjjzpwf_tbl_ld_ickss_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_syhtjjzpwf_tbl_ld_ickss_list', 'top');
			}			          
		
									
			if (tbl_ld_ickss_list.f_khyye.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_khyye_tbl_ld_ickss_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_khyye_tbl_ld_ickss_list', 'top');
			}			          
		
									
			if (tbl_ld_ickss_list.f_sfsyye.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_sfsyye_tbl_ld_ickss_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_sfsyye_tbl_ld_ickss_list', 'top');
			}			          
		
									
			if (tbl_ld_ickss_list.f_syye.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_syye_tbl_ld_ickss_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_syye_tbl_ld_ickss_list', 'top');
			}			          
		
									
			if (tbl_ld_ickss_list.f_yhye.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_yhye_tbl_ld_ickss_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_yhye_tbl_ld_ickss_list', 'top');
			}			          
		
									
			if (tbl_ld_ickss_list.f_shys.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_shys_tbl_ld_ickss_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_shys_tbl_ld_ickss_list', 'top');
			}			          
		
									
			if (tbl_ld_ickss_list.f_shss.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_shss_tbl_ld_ickss_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_shss_tbl_ld_ickss_list', 'top');
			}			          
		
									
			if (tbl_ld_ickss_list.f_shzl.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_shzl_tbl_ld_ickss_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_shzl_tbl_ld_ickss_list', 'top');
			}			          
		
									
			if (tbl_ld_ickss_list.f_shssdx.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_shssdx_tbl_ld_ickss_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_shssdx_tbl_ld_ickss_list', 'top');
			}			          
		
									
			if (tbl_ld_ickss_list.f_jffs.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_jffs_tbl_ld_ickss_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_jffs_tbl_ld_ickss_list', 'top');
			}			          
		
									
			if (tbl_ld_ickss_list.f_jffsid.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_jffsid_tbl_ld_ickss_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_jffsid_tbl_ld_ickss_list', 'top');
			}			          
		
									
			if (tbl_ld_ickss_list.f_xkmsid.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_xkmsid_tbl_ld_ickss_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_xkmsid_tbl_ld_ickss_list', 'top');
			}			          
		
									
			if (tbl_ld_ickss_list.f_yyt.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_yyt_tbl_ld_ickss_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_yyt_tbl_ld_ickss_list', 'top');
			}			          
		
									
			if (tbl_ld_ickss_list.f_kplb.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_kplb_tbl_ld_ickss_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_kplb_tbl_ld_ickss_list', 'top');
			}			          
		
									
			if (tbl_ld_ickss_list.f_kplbid.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_kplbid_tbl_ld_ickss_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_kplbid_tbl_ld_ickss_list', 'top');
			}			          
		
									
			if (tbl_ld_ickss_list.f_yytid.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_yytid_tbl_ld_ickss_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_yytid_tbl_ld_ickss_list', 'top');
			}			          
		
									
			if (tbl_ld_ickss_list.f_sfjl.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_sfjl_tbl_ld_ickss_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_sfjl_tbl_ld_ickss_list', 'top');
			}			          
		
									
			if (tbl_ld_ickss_list.f_tgly.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_tgly_tbl_ld_ickss_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_tgly_tbl_ld_ickss_list', 'top');
			}			          
		  
       



            if (errorMessageHansMap.keys().length > 0)
            {
                _validateMessage.show(errorMessageHansMap, errorMessagePlacementHansMap, false);
                callBackFunction.fail();
            }
            else
            {
                _validateMessage.hidden();
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
    *  参数:callBackFunction
    *  清空_pr_searchtype和searchModel
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
					    controlObj.text('search_txt_f_value1_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_value1);          
				
				
										    that._pr_searchcontent.type2.f_value2 = '';
					    controlObj.text('search_txt_f_value2_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_value2);          
				
				
										    that._pr_searchcontent.type2.f_value3 = '';
					    controlObj.text('search_txt_f_value3_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_value3);          
				
				
										    that._pr_searchcontent.type2.f_value4 = '';
					    controlObj.text('search_txt_f_value4_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_value4);          
				
				
										    that._pr_searchcontent.type2.f_value5 = '';
					    controlObj.text('search_txt_f_value5_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_value5);          
				
				
										    that._pr_searchcontent.type2.f_value6 = '';
					    controlObj.text('search_txt_f_value6_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_value6);          
				
				
										    that._pr_searchcontent.type2.f_value7 = '';
					    controlObj.text('search_txt_f_value7_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_value7);          
				
				
										    that._pr_searchcontent.type2.f_value8 = '';
					    controlObj.text('search_txt_f_value8_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_value8);          
				
				
										    that._pr_searchcontent.type2.f_value9 = '';
					    controlObj.text('search_txt_f_value9_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_value9);          
				
				
										    that._pr_searchcontent.type2.f_value10 = '';
					    controlObj.text('search_txt_f_value10_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_value10);          
				
				
										    that._pr_searchcontent.type2.f_khbh = '';
					    controlObj.text('search_txt_f_khbh_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_khbh);          
				
				
										    that._pr_searchcontent.type2.f_khbhid = '';
					    controlObj.text('search_txt_f_khbhid_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_khbhid);          
				
				
										    that._pr_searchcontent.type2.f_yhbh = '';
					    controlObj.text('search_txt_f_yhbh_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_yhbh);          
				
				
										    that._pr_searchcontent.type2.f_yhbhid = '';
					    controlObj.text('search_txt_f_yhbhid_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_yhbhid);          
				
				
										    that._pr_searchcontent.type2.f_dz = '';
					    controlObj.text('search_txt_f_dz_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_dz);          
				
				
										    that._pr_searchcontent.type2.f_dh = '';
					    controlObj.text('search_txt_f_dh_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_dh);          
				
				
										    that._pr_searchcontent.type2.f_dy = '';
					    controlObj.text('search_txt_f_dy_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_dy);          
				
				
										    that._pr_searchcontent.type2.f_dyid = '';
					    controlObj.text('search_txt_f_dyid_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_dyid);          
				
				
										    that._pr_searchcontent.type2.f_sc = '';
					    controlObj.text('search_txt_f_sc_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_sc);          
				
				
										    that._pr_searchcontent.type2.f_scid = '';
					    controlObj.text('search_txt_f_scid_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_scid);          
				
				
										    that._pr_searchcontent.type2.f_qy = '';
					    controlObj.text('search_txt_f_qy_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_qy);          
				
				
										    that._pr_searchcontent.type2.f_qyid = '';
					    controlObj.text('search_txt_f_qyid_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_qyid);          
				
				
										    that._pr_searchcontent.type2.f_pq = '';
					    controlObj.text('search_txt_f_pq_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_pq);          
				
				
										    that._pr_searchcontent.type2.f_pqid = '';
					    controlObj.text('search_txt_f_pqid_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_pqid);          
				
				
										    that._pr_searchcontent.type2.f_yhm = '';
					    controlObj.text('search_txt_f_yhm_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_yhm);          
				
				
										    that._pr_searchcontent.type2.f_jfm = '';
					    controlObj.text('search_txt_f_jfm_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_jfm);          
				
				
										    that._pr_searchcontent.type2.f_lxtkhh = '';
					    controlObj.text('search_txt_f_lxtkhh_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_lxtkhh);          
				
				
											that._pr_searchcontent.type2.f_khrqfrom = ('1900-01-01 00:00:00');
						that._pr_searchcontent.type2.f_khrqto = ('1900-01-01 00:00:00');
						
						controlObj.datetime('search_datetime_f_khrq_tbl_ld_ickss_list_datefrom', 'search_datetime_f_khrq_tbl_ld_ickss_list_timefrom', that._pr_searchcontent.type2.f_khrqfrom);
						controlObj.datetime('search_datetime_f_khrq_tbl_ld_ickss_list_dateto', 'search_datetime_f_khrq_tbl_ld_ickss_list_timeto', that._pr_searchcontent.type2.f_khrqto);
                          
				
				
										    that._pr_searchcontent.type2.f_yslx = '';
					    controlObj.text('search_txt_f_yslx_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_yslx);          
				
				
										    that._pr_searchcontent.type2.f_yslxid = '';
					    controlObj.text('search_txt_f_yslxid_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_yslxid);          
				
				
										    that._pr_searchcontent.type2.f_sbbh = '';
					    controlObj.text('search_txt_f_sbbh_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_sbbh);          
				
				
										    that._pr_searchcontent.type2.f_sbbhid = '';
					    controlObj.text('search_txt_f_sbbhid_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_sbbhid);          
				
				
										    that._pr_searchcontent.type2.f_kj = '';
					    controlObj.text('search_txt_f_kj_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_kj);          
				
				
										    that._pr_searchcontent.type2.f_kjid = '';
					    controlObj.text('search_txt_f_kjid_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_kjid);          
				
				
										    that._pr_searchcontent.type2.f_sblx = '';
					    controlObj.text('search_txt_f_sblx_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_sblx);          
				
				
										    that._pr_searchcontent.type2.f_sblxid = '';
					    controlObj.text('search_txt_f_sblxid_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_sblxid);          
				
				
										    that._pr_searchcontent.type2.f_rs = '';
					    controlObj.text('search_txt_f_rs_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_rs);          
				
				
										    that._pr_searchcontent.type2.f_sf = '';
					    controlObj.text('search_txt_f_sf_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_sf);          
				
				
										    that._pr_searchcontent.type2.f_sl = '';
					    controlObj.text('search_txt_f_sl_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_sl);          
				
				
										    that._pr_searchcontent.type2.f_jfdh = '';
					    controlObj.text('search_txt_f_jfdh_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_jfdh);          
				
				
										    that._pr_searchcontent.type2.f_jfje = '';
					    controlObj.text('search_txt_f_jfje_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_jfje);          
				
				
										    that._pr_searchcontent.type2.f_zt = '';
					    controlObj.text('search_txt_f_zt_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_zt);          
				
				
										    that._pr_searchcontent.type2.f_ztid = '';
					    controlObj.text('search_txt_f_ztid_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_ztid);          
				
				
										    that._pr_searchcontent.type2.f_bz = '';
					    controlObj.text('search_txt_f_bz_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_bz);          
				
				
										    that._pr_searchcontent.type2.f_xkr = '';
					    controlObj.text('search_txt_f_xkr_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_xkr);          
				
				
										    that._pr_searchcontent.type2.f_xkrid = '';
					    controlObj.text('search_txt_f_xkrid_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_xkrid);          
				
				
										    that._pr_searchcontent.type2.f_xkrq = '';
					    controlObj.text('search_txt_f_xkrq_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_xkrq);          
				
				
										    that._pr_searchcontent.type2.f_xiekr = '';
					    controlObj.text('search_txt_f_xiekr_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_xiekr);          
				
				
										    that._pr_searchcontent.type2.f_xiekrid = '';
					    controlObj.text('search_txt_f_xiekrid_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_xiekrid);          
				
				
										    that._pr_searchcontent.type2.f_xiekrq = '';
					    controlObj.text('search_txt_f_xiekrq_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_xiekrq);          
				
				
										    that._pr_searchcontent.type2.f_ssbh = '';
					    controlObj.text('search_txt_f_ssbh_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_ssbh);          
				
				
										    that._pr_searchcontent.type2.f_sjbh = '';
					    controlObj.text('search_txt_f_sjbh_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_sjbh);          
				
				
										    that._pr_searchcontent.type2.f_ly = '';
					    controlObj.text('search_txt_f_ly_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_ly);          
				
				
										    that._pr_searchcontent.type2.f_lyid = '';
					    controlObj.text('search_txt_f_lyid_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_lyid);          
				
				
										    that._pr_searchcontent.type2.f_xklx = '';
					    controlObj.text('search_txt_f_xklx_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_xklx);          
				
				
										    that._pr_searchcontent.type2.f_xkkh = '';
					    controlObj.text('search_txt_f_xkkh_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_xkkh);          
				
				
										    that._pr_searchcontent.type2.f_xkgscs = '';
					    controlObj.text('search_txt_f_xkgscs_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_xkgscs);          
				
				
										    that._pr_searchcontent.type2.f_xkbcgsl = '';
					    controlObj.text('search_txt_f_xkbcgsl_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_xkbcgsl);          
				
				
										    that._pr_searchcontent.type2.f_xkms = '';
					    controlObj.text('search_txt_f_xkms_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_xkms);          
				
				
										    that._pr_searchcontent.type2.f_xkljgl = '';
					    controlObj.text('search_txt_f_xkljgl_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_xkljgl);          
				
				
										    that._pr_searchcontent.type2.f_xkjzlx = '';
					    controlObj.text('search_txt_f_xkjzlx_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_xkjzlx);          
				
				
										    that._pr_searchcontent.type2.f_port = '';
					    controlObj.text('search_txt_f_port_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_port);          
				
				
										    that._pr_searchcontent.type2.f_dkkh = '';
					    controlObj.text('search_txt_f_dkkh_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_dkkh);          
				
				
										    that._pr_searchcontent.type2.f_dkbcgsl = '';
					    controlObj.text('search_txt_f_dkbcgsl_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_dkbcgsl);          
				
				
										    that._pr_searchcontent.type2.f_dkgscs = '';
					    controlObj.text('search_txt_f_dkgscs_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_dkgscs);          
				
				
										    that._pr_searchcontent.type2.f_dkljgl = '';
					    controlObj.text('search_txt_f_dkljgl_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_dkljgl);          
				
				
										    that._pr_searchcontent.type2.f_dkjzlx = '';
					    controlObj.text('search_txt_f_dkjzlx_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_dkjzlx);          
				
				
										    that._pr_searchcontent.type2.f_dksbzt = '';
					    controlObj.text('search_txt_f_dksbzt_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_dksbzt);          
				
				
										    that._pr_searchcontent.type2.f_khfz = '';
					    controlObj.text('search_txt_f_khfz_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_khfz);          
				
				
										    that._pr_searchcontent.type2.f_khfzid = '';
					    controlObj.text('search_txt_f_khfzid_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_khfzid);          
				
				
										    that._pr_searchcontent.type2.f_cbbh = '';
					    controlObj.text('search_txt_f_cbbh_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_cbbh);          
				
				
										    that._pr_searchcontent.type2.f_cbbhid = '';
					    controlObj.text('search_txt_f_cbbhid_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_cbbhid);          
				
				
										    that._pr_searchcontent.type2.f_dj = '';
					    controlObj.text('search_txt_f_dj_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_dj);          
				
				
										    that._pr_searchcontent.type2.f_pwf = '';
					    controlObj.text('search_txt_f_pwf_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_pwf);          
				
				
										    that._pr_searchcontent.type2.f_ysje = '';
					    controlObj.text('search_txt_f_ysje_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_ysje);          
				
				
										    that._pr_searchcontent.type2.f_jmhysje = '';
					    controlObj.text('search_txt_f_jmhysje_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_jmhysje);          
				
				
										    that._pr_searchcontent.type2.f_khytjjzsf = '';
					    controlObj.text('search_txt_f_khytjjzsf_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_khytjjzsf);          
				
				
										    that._pr_searchcontent.type2.f_khytjjzpwf = '';
					    controlObj.text('search_txt_f_khytjjzpwf_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_khytjjzpwf);          
				
				
										    that._pr_searchcontent.type2.f_sfsytjjz = '';
					    controlObj.text('search_txt_f_sfsytjjz_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_sfsytjjz);          
				
				
										    that._pr_searchcontent.type2.f_sytjjzsf = '';
					    controlObj.text('search_txt_f_sytjjzsf_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_sytjjzsf);          
				
				
										    that._pr_searchcontent.type2.f_sytjjzpwf = '';
					    controlObj.text('search_txt_f_sytjjzpwf_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_sytjjzpwf);          
				
				
										    that._pr_searchcontent.type2.f_syhtjjzsf = '';
					    controlObj.text('search_txt_f_syhtjjzsf_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_syhtjjzsf);          
				
				
										    that._pr_searchcontent.type2.f_syhtjjzpwf = '';
					    controlObj.text('search_txt_f_syhtjjzpwf_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_syhtjjzpwf);          
				
				
										    that._pr_searchcontent.type2.f_khyye = '';
					    controlObj.text('search_txt_f_khyye_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_khyye);          
				
				
										    that._pr_searchcontent.type2.f_sfsyye = '';
					    controlObj.text('search_txt_f_sfsyye_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_sfsyye);          
				
				
										    that._pr_searchcontent.type2.f_syye = '';
					    controlObj.text('search_txt_f_syye_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_syye);          
				
				
										    that._pr_searchcontent.type2.f_yhye = '';
					    controlObj.text('search_txt_f_yhye_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_yhye);          
				
				
										    that._pr_searchcontent.type2.f_shys = '';
					    controlObj.text('search_txt_f_shys_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_shys);          
				
				
										    that._pr_searchcontent.type2.f_shss = '';
					    controlObj.text('search_txt_f_shss_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_shss);          
				
				
										    that._pr_searchcontent.type2.f_shzl = '';
					    controlObj.text('search_txt_f_shzl_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_shzl);          
				
				
										    that._pr_searchcontent.type2.f_shssdx = '';
					    controlObj.text('search_txt_f_shssdx_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_shssdx);          
				
				
										    that._pr_searchcontent.type2.f_jffs = '';
					    controlObj.text('search_txt_f_jffs_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_jffs);          
				
				
										    that._pr_searchcontent.type2.f_jffsid = '';
					    controlObj.text('search_txt_f_jffsid_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_jffsid);          
				
				
										    that._pr_searchcontent.type2.f_xkmsid = '';
					    controlObj.text('search_txt_f_xkmsid_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_xkmsid);          
				
				
										    that._pr_searchcontent.type2.f_yyt = '';
					    controlObj.text('search_txt_f_yyt_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_yyt);          
				
				
										    that._pr_searchcontent.type2.f_kplb = '';
					    controlObj.text('search_txt_f_kplb_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_kplb);          
				
				
										    that._pr_searchcontent.type2.f_kplbid = '';
					    controlObj.text('search_txt_f_kplbid_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_kplbid);          
				
				
										    that._pr_searchcontent.type2.f_yytid = '';
					    controlObj.text('search_txt_f_yytid_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_yytid);          
				
				
										    that._pr_searchcontent.type2.f_sfjl = '';
					    controlObj.text('search_txt_f_sfjl_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_sfjl);          
				
				
										    that._pr_searchcontent.type2.f_tgly = '';
					    controlObj.text('search_txt_f_tgly_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_tgly);          
				 

                break;
            case "2":
                if (that._pr_searchcontent.type1 == undefined)
                {
                    that._pr_searchcontent.type1 = '';
                }

                $("#txt_command_search_tbl_ld_ickss_list").val('');
                break;
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


					
														 	 whereClause += " f_khbh like '%" + vv[i] + "%' or ";
						
														 	 whereClause += " f_khbhid like '%" + vv[i] + "%' or ";
						
														 	 whereClause += " f_yhbh like '%" + vv[i] + "%' or ";
						
														 	 whereClause += " f_yhbhid like '%" + vv[i] + "%' or ";
						
														 	 whereClause += " f_dz like '%" + vv[i] + "%' or ";
						
														 	 whereClause += " f_dh like '%" + vv[i] + "%' or ";
						
														 	 whereClause += " f_dy like '%" + vv[i] + "%' or ";
						
														 	 whereClause += " f_dyid like '%" + vv[i] + "%' or ";
						
														 	 whereClause += " f_sc like '%" + vv[i] + "%' or ";
						
														 	 whereClause += " f_scid like '%" + vv[i] + "%' or ";
						
														 	 whereClause += " f_qy like '%" + vv[i] + "%' or ";
						
														 	 whereClause += " f_qyid like '%" + vv[i] + "%' or ";
						
														 	 whereClause += " f_pq like '%" + vv[i] + "%' or ";
						
														 	 whereClause += " f_pqid like '%" + vv[i] + "%' or ";
						
														 	 whereClause += " f_yhm like '%" + vv[i] + "%' or ";
						
														 	 whereClause += " f_jfm like '%" + vv[i] + "%' or ";
						
														 	 whereClause += " f_lxtkhh like '%" + vv[i] + "%' or ";
						
													
								  whereClause += " to_char(f_khrq,'yyyy-MM-dd hh24:mi:ss') like '%" + vv[i] + "%' or ";
						
														 	 whereClause += " f_yslx like '%" + vv[i] + "%' or ";
						
														 	 whereClause += " f_yslxid like '%" + vv[i] + "%' or ";
						
														 	 whereClause += " f_sbbh like '%" + vv[i] + "%' or ";
						
														 	 whereClause += " f_sbbhid like '%" + vv[i] + "%' or ";
						
														 	 whereClause += " f_kj like '%" + vv[i] + "%' or ";
						
														 	 whereClause += " f_kjid like '%" + vv[i] + "%' or ";
						
														 	 whereClause += " f_sblx like '%" + vv[i] + "%' or ";
						
														 	 whereClause += " f_sblxid like '%" + vv[i] + "%' or ";
						
														 	 whereClause += " f_rs like '%" + vv[i] + "%' or ";
						
														 	 whereClause += " f_sf like '%" + vv[i] + "%' or ";
						
														 	 whereClause += " f_sl like '%" + vv[i] + "%' or ";
						
														 	 whereClause += " f_jfdh like '%" + vv[i] + "%' or ";
						
														 	 whereClause += " f_jfje like '%" + vv[i] + "%' or ";
						
														 	 whereClause += " f_zt like '%" + vv[i] + "%' or ";
						
														 	 whereClause += " f_ztid like '%" + vv[i] + "%' or ";
						
														 	 whereClause += " f_bz like '%" + vv[i] + "%' or ";
						
														 	 whereClause += " f_xkr like '%" + vv[i] + "%' or ";
						
														 	 whereClause += " f_xkrid like '%" + vv[i] + "%' or ";
						
														 	 whereClause += " f_xkrq like '%" + vv[i] + "%' or ";
						
														 	 whereClause += " f_xiekr like '%" + vv[i] + "%' or ";
						
														 	 whereClause += " f_xiekrid like '%" + vv[i] + "%' or ";
						
														 	 whereClause += " f_xiekrq like '%" + vv[i] + "%' or ";
						
														 	 whereClause += " f_ssbh like '%" + vv[i] + "%' or ";
						
														 	 whereClause += " f_sjbh like '%" + vv[i] + "%' or ";
						
														 	 whereClause += " f_ly like '%" + vv[i] + "%' or ";
						
														 	 whereClause += " f_lyid like '%" + vv[i] + "%' or ";
						
														 	 whereClause += " f_xklx like '%" + vv[i] + "%' or ";
						
														 	 whereClause += " f_xkkh like '%" + vv[i] + "%' or ";
						
														 	 whereClause += " f_xkgscs like '%" + vv[i] + "%' or ";
						
														 	 whereClause += " f_xkbcgsl like '%" + vv[i] + "%' or ";
						
														 	 whereClause += " f_xkms like '%" + vv[i] + "%' or ";
						
														 	 whereClause += " f_xkljgl like '%" + vv[i] + "%' or ";
						
														 	 whereClause += " f_xkjzlx like '%" + vv[i] + "%' or ";
						
														 	 whereClause += " f_port like '%" + vv[i] + "%' or ";
						
														 	 whereClause += " f_dkkh like '%" + vv[i] + "%' or ";
						
														 	 whereClause += " f_dkbcgsl like '%" + vv[i] + "%' or ";
						
														 	 whereClause += " f_dkgscs like '%" + vv[i] + "%' or ";
						
														 	 whereClause += " f_dkljgl like '%" + vv[i] + "%' or ";
						
														 	 whereClause += " f_dkjzlx like '%" + vv[i] + "%' or ";
						
														 	 whereClause += " f_dksbzt like '%" + vv[i] + "%' or ";
						
														 	 whereClause += " f_khfz like '%" + vv[i] + "%' or ";
						
														 	 whereClause += " f_khfzid like '%" + vv[i] + "%' or ";
						
														 	 whereClause += " f_cbbh like '%" + vv[i] + "%' or ";
						
														 	 whereClause += " f_cbbhid like '%" + vv[i] + "%' or ";
						
														 	 whereClause += " f_dj like '%" + vv[i] + "%' or ";
						
														 	 whereClause += " f_pwf like '%" + vv[i] + "%' or ";
						
														 	 whereClause += " f_ysje like '%" + vv[i] + "%' or ";
						
														 	 whereClause += " f_jmhysje like '%" + vv[i] + "%' or ";
						
														 	 whereClause += " f_khytjjzsf like '%" + vv[i] + "%' or ";
						
														 	 whereClause += " f_khytjjzpwf like '%" + vv[i] + "%' or ";
						
														 	 whereClause += " f_sfsytjjz like '%" + vv[i] + "%' or ";
						
														 	 whereClause += " f_sytjjzsf like '%" + vv[i] + "%' or ";
						
														 	 whereClause += " f_sytjjzpwf like '%" + vv[i] + "%' or ";
						
														 	 whereClause += " f_syhtjjzsf like '%" + vv[i] + "%' or ";
						
														 	 whereClause += " f_syhtjjzpwf like '%" + vv[i] + "%' or ";
						
														 	 whereClause += " f_khyye like '%" + vv[i] + "%' or ";
						
														 	 whereClause += " f_sfsyye like '%" + vv[i] + "%' or ";
						
														 	 whereClause += " f_syye like '%" + vv[i] + "%' or ";
						
														 	 whereClause += " f_yhye like '%" + vv[i] + "%' or ";
						
														 	 whereClause += " f_shys like '%" + vv[i] + "%' or ";
						
														 	 whereClause += " f_shss like '%" + vv[i] + "%' or ";
						
														 	 whereClause += " f_shzl like '%" + vv[i] + "%' or ";
						
														 	 whereClause += " f_shssdx like '%" + vv[i] + "%' or ";
						
														 	 whereClause += " f_jffs like '%" + vv[i] + "%' or ";
						
														 	 whereClause += " f_jffsid like '%" + vv[i] + "%' or ";
						
														 	 whereClause += " f_xkmsid like '%" + vv[i] + "%' or ";
						
														 	 whereClause += " f_yyt like '%" + vv[i] + "%' or ";
						
														 	 whereClause += " f_kplb like '%" + vv[i] + "%' or ";
						
														 	 whereClause += " f_kplbid like '%" + vv[i] + "%' or ";
						
														 	 whereClause += " f_yytid like '%" + vv[i] + "%' or ";
						
														 	 whereClause += " f_sfjl like '%" + vv[i] + "%' or ";
						
														 	 whereClause += " f_tgly like '%" + vv[i] + "%' or ";
						                              

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

                        var tbl_ld_ickss_list = that._pr_searchcontent.type2;

             
        
			 			
				if (tbl_ld_ickss_list.f_khbh.length > 0)
                    {
                        whereClause += " f_khbh like '%" + tbl_ld_ickss_list.f_khbh + "%' and ";
                    }	          
		
			 			
				if (tbl_ld_ickss_list.f_khbhid.length > 0)
                    {
                        whereClause += " f_khbhid like '%" + tbl_ld_ickss_list.f_khbhid + "%' and ";
                    }	          
		
			 			
				if (tbl_ld_ickss_list.f_yhbh.length > 0)
                    {
                        whereClause += " f_yhbh like '%" + tbl_ld_ickss_list.f_yhbh + "%' and ";
                    }	          
		
			 			
				if (tbl_ld_ickss_list.f_yhbhid.length > 0)
                    {
                        whereClause += " f_yhbhid like '%" + tbl_ld_ickss_list.f_yhbhid + "%' and ";
                    }	          
		
			 			
				if (tbl_ld_ickss_list.f_dz.length > 0)
                    {
                        whereClause += " f_dz like '%" + tbl_ld_ickss_list.f_dz + "%' and ";
                    }	          
		
			 			
				if (tbl_ld_ickss_list.f_dh.length > 0)
                    {
                        whereClause += " f_dh like '%" + tbl_ld_ickss_list.f_dh + "%' and ";
                    }	          
		
			 			
				if (tbl_ld_ickss_list.f_dy.length > 0)
                    {
                        whereClause += " f_dy like '%" + tbl_ld_ickss_list.f_dy + "%' and ";
                    }	          
		
			 			
				if (tbl_ld_ickss_list.f_dyid.length > 0)
                    {
                        whereClause += " f_dyid like '%" + tbl_ld_ickss_list.f_dyid + "%' and ";
                    }	          
		
			 			
				if (tbl_ld_ickss_list.f_sc.length > 0)
                    {
                        whereClause += " f_sc like '%" + tbl_ld_ickss_list.f_sc + "%' and ";
                    }	          
		
			 			
				if (tbl_ld_ickss_list.f_scid.length > 0)
                    {
                        whereClause += " f_scid like '%" + tbl_ld_ickss_list.f_scid + "%' and ";
                    }	          
		
			 			
				if (tbl_ld_ickss_list.f_qy.length > 0)
                    {
                        whereClause += " f_qy like '%" + tbl_ld_ickss_list.f_qy + "%' and ";
                    }	          
		
			 			
				if (tbl_ld_ickss_list.f_qyid.length > 0)
                    {
                        whereClause += " f_qyid like '%" + tbl_ld_ickss_list.f_qyid + "%' and ";
                    }	          
		
			 			
				if (tbl_ld_ickss_list.f_pq.length > 0)
                    {
                        whereClause += " f_pq like '%" + tbl_ld_ickss_list.f_pq + "%' and ";
                    }	          
		
			 			
				if (tbl_ld_ickss_list.f_pqid.length > 0)
                    {
                        whereClause += " f_pqid like '%" + tbl_ld_ickss_list.f_pqid + "%' and ";
                    }	          
		
			 			
				if (tbl_ld_ickss_list.f_yhm.length > 0)
                    {
                        whereClause += " f_yhm like '%" + tbl_ld_ickss_list.f_yhm + "%' and ";
                    }	          
		
			 			
				if (tbl_ld_ickss_list.f_jfm.length > 0)
                    {
                        whereClause += " f_jfm like '%" + tbl_ld_ickss_list.f_jfm + "%' and ";
                    }	          
		
			 			
				if (tbl_ld_ickss_list.f_lxtkhh.length > 0)
                    {
                        whereClause += " f_lxtkhh like '%" + tbl_ld_ickss_list.f_lxtkhh + "%' and ";
                    }	          
		
				
			 	if (tbl_ld_ickss_list.f_khrqfrom != '1900-01-01 00:00:00')
                    {
                        whereClause += " f_khrq >= to_date('" + tbl_ld_ickss_list.f_khrqfrom + "','yyyy-MM-dd hh24:mi:ss') and ";
                    }

                    if (tbl_ld_ickss_list.f_khrqto != '1900-01-01 00:00:00')
                    {
                        whereClause += " f_khrq <= to_date('" + tbl_ld_ickss_list.f_khrqto + "','yyyy-MM-dd hh24:mi:ss') and ";
                    }          
		
			 			
				if (tbl_ld_ickss_list.f_yslx.length > 0)
                    {
                        whereClause += " f_yslx like '%" + tbl_ld_ickss_list.f_yslx + "%' and ";
                    }	          
		
			 			
				if (tbl_ld_ickss_list.f_yslxid.length > 0)
                    {
                        whereClause += " f_yslxid like '%" + tbl_ld_ickss_list.f_yslxid + "%' and ";
                    }	          
		
			 			
				if (tbl_ld_ickss_list.f_sbbh.length > 0)
                    {
                        whereClause += " f_sbbh like '%" + tbl_ld_ickss_list.f_sbbh + "%' and ";
                    }	          
		
			 			
				if (tbl_ld_ickss_list.f_sbbhid.length > 0)
                    {
                        whereClause += " f_sbbhid like '%" + tbl_ld_ickss_list.f_sbbhid + "%' and ";
                    }	          
		
			 			
				if (tbl_ld_ickss_list.f_kj.length > 0)
                    {
                        whereClause += " f_kj like '%" + tbl_ld_ickss_list.f_kj + "%' and ";
                    }	          
		
			 			
				if (tbl_ld_ickss_list.f_kjid.length > 0)
                    {
                        whereClause += " f_kjid like '%" + tbl_ld_ickss_list.f_kjid + "%' and ";
                    }	          
		
			 			
				if (tbl_ld_ickss_list.f_sblx.length > 0)
                    {
                        whereClause += " f_sblx like '%" + tbl_ld_ickss_list.f_sblx + "%' and ";
                    }	          
		
			 			
				if (tbl_ld_ickss_list.f_sblxid.length > 0)
                    {
                        whereClause += " f_sblxid like '%" + tbl_ld_ickss_list.f_sblxid + "%' and ";
                    }	          
		
			 			
				if (tbl_ld_ickss_list.f_rs.length > 0)
                    {
                        whereClause += " f_rs like '%" + tbl_ld_ickss_list.f_rs + "%' and ";
                    }	          
		
			 			
				if (tbl_ld_ickss_list.f_sf.length > 0)
                    {
                        whereClause += " f_sf like '%" + tbl_ld_ickss_list.f_sf + "%' and ";
                    }	          
		
			 			
				if (tbl_ld_ickss_list.f_sl.length > 0)
                    {
                        whereClause += " f_sl like '%" + tbl_ld_ickss_list.f_sl + "%' and ";
                    }	          
		
			 			
				if (tbl_ld_ickss_list.f_jfdh.length > 0)
                    {
                        whereClause += " f_jfdh like '%" + tbl_ld_ickss_list.f_jfdh + "%' and ";
                    }	          
		
			 			
				if (tbl_ld_ickss_list.f_jfje.length > 0)
                    {
                        whereClause += " f_jfje like '%" + tbl_ld_ickss_list.f_jfje + "%' and ";
                    }	          
		
			 			
				if (tbl_ld_ickss_list.f_zt.length > 0)
                    {
                        whereClause += " f_zt like '%" + tbl_ld_ickss_list.f_zt + "%' and ";
                    }	          
		
			 			
				if (tbl_ld_ickss_list.f_ztid.length > 0)
                    {
                        whereClause += " f_ztid like '%" + tbl_ld_ickss_list.f_ztid + "%' and ";
                    }	          
		
			 			
				if (tbl_ld_ickss_list.f_bz.length > 0)
                    {
                        whereClause += " f_bz like '%" + tbl_ld_ickss_list.f_bz + "%' and ";
                    }	          
		
			 			
				if (tbl_ld_ickss_list.f_xkr.length > 0)
                    {
                        whereClause += " f_xkr like '%" + tbl_ld_ickss_list.f_xkr + "%' and ";
                    }	          
		
			 			
				if (tbl_ld_ickss_list.f_xkrid.length > 0)
                    {
                        whereClause += " f_xkrid like '%" + tbl_ld_ickss_list.f_xkrid + "%' and ";
                    }	          
		
			 			
				if (tbl_ld_ickss_list.f_xkrq.length > 0)
                    {
                        whereClause += " f_xkrq like '%" + tbl_ld_ickss_list.f_xkrq + "%' and ";
                    }	          
		
			 			
				if (tbl_ld_ickss_list.f_xiekr.length > 0)
                    {
                        whereClause += " f_xiekr like '%" + tbl_ld_ickss_list.f_xiekr + "%' and ";
                    }	          
		
			 			
				if (tbl_ld_ickss_list.f_xiekrid.length > 0)
                    {
                        whereClause += " f_xiekrid like '%" + tbl_ld_ickss_list.f_xiekrid + "%' and ";
                    }	          
		
			 			
				if (tbl_ld_ickss_list.f_xiekrq.length > 0)
                    {
                        whereClause += " f_xiekrq like '%" + tbl_ld_ickss_list.f_xiekrq + "%' and ";
                    }	          
		
			 			
				if (tbl_ld_ickss_list.f_ssbh.length > 0)
                    {
                        whereClause += " f_ssbh like '%" + tbl_ld_ickss_list.f_ssbh + "%' and ";
                    }	          
		
			 			
				if (tbl_ld_ickss_list.f_sjbh.length > 0)
                    {
                        whereClause += " f_sjbh like '%" + tbl_ld_ickss_list.f_sjbh + "%' and ";
                    }	          
		
			 			
				if (tbl_ld_ickss_list.f_ly.length > 0)
                    {
                        whereClause += " f_ly like '%" + tbl_ld_ickss_list.f_ly + "%' and ";
                    }	          
		
			 			
				if (tbl_ld_ickss_list.f_lyid.length > 0)
                    {
                        whereClause += " f_lyid like '%" + tbl_ld_ickss_list.f_lyid + "%' and ";
                    }	          
		
			 			
				if (tbl_ld_ickss_list.f_xklx.length > 0)
                    {
                        whereClause += " f_xklx like '%" + tbl_ld_ickss_list.f_xklx + "%' and ";
                    }	          
		
			 			
				if (tbl_ld_ickss_list.f_xkkh.length > 0)
                    {
                        whereClause += " f_xkkh like '%" + tbl_ld_ickss_list.f_xkkh + "%' and ";
                    }	          
		
			 			
				if (tbl_ld_ickss_list.f_xkgscs.length > 0)
                    {
                        whereClause += " f_xkgscs like '%" + tbl_ld_ickss_list.f_xkgscs + "%' and ";
                    }	          
		
			 			
				if (tbl_ld_ickss_list.f_xkbcgsl.length > 0)
                    {
                        whereClause += " f_xkbcgsl like '%" + tbl_ld_ickss_list.f_xkbcgsl + "%' and ";
                    }	          
		
			 			
				if (tbl_ld_ickss_list.f_xkms.length > 0)
                    {
                        whereClause += " f_xkms like '%" + tbl_ld_ickss_list.f_xkms + "%' and ";
                    }	          
		
			 			
				if (tbl_ld_ickss_list.f_xkljgl.length > 0)
                    {
                        whereClause += " f_xkljgl like '%" + tbl_ld_ickss_list.f_xkljgl + "%' and ";
                    }	          
		
			 			
				if (tbl_ld_ickss_list.f_xkjzlx.length > 0)
                    {
                        whereClause += " f_xkjzlx like '%" + tbl_ld_ickss_list.f_xkjzlx + "%' and ";
                    }	          
		
			 			
				if (tbl_ld_ickss_list.f_port.length > 0)
                    {
                        whereClause += " f_port like '%" + tbl_ld_ickss_list.f_port + "%' and ";
                    }	          
		
			 			
				if (tbl_ld_ickss_list.f_dkkh.length > 0)
                    {
                        whereClause += " f_dkkh like '%" + tbl_ld_ickss_list.f_dkkh + "%' and ";
                    }	          
		
			 			
				if (tbl_ld_ickss_list.f_dkbcgsl.length > 0)
                    {
                        whereClause += " f_dkbcgsl like '%" + tbl_ld_ickss_list.f_dkbcgsl + "%' and ";
                    }	          
		
			 			
				if (tbl_ld_ickss_list.f_dkgscs.length > 0)
                    {
                        whereClause += " f_dkgscs like '%" + tbl_ld_ickss_list.f_dkgscs + "%' and ";
                    }	          
		
			 			
				if (tbl_ld_ickss_list.f_dkljgl.length > 0)
                    {
                        whereClause += " f_dkljgl like '%" + tbl_ld_ickss_list.f_dkljgl + "%' and ";
                    }	          
		
			 			
				if (tbl_ld_ickss_list.f_dkjzlx.length > 0)
                    {
                        whereClause += " f_dkjzlx like '%" + tbl_ld_ickss_list.f_dkjzlx + "%' and ";
                    }	          
		
			 			
				if (tbl_ld_ickss_list.f_dksbzt.length > 0)
                    {
                        whereClause += " f_dksbzt like '%" + tbl_ld_ickss_list.f_dksbzt + "%' and ";
                    }	          
		
			 			
				if (tbl_ld_ickss_list.f_khfz.length > 0)
                    {
                        whereClause += " f_khfz like '%" + tbl_ld_ickss_list.f_khfz + "%' and ";
                    }	          
		
			 			
				if (tbl_ld_ickss_list.f_khfzid.length > 0)
                    {
                        whereClause += " f_khfzid like '%" + tbl_ld_ickss_list.f_khfzid + "%' and ";
                    }	          
		
			 			
				if (tbl_ld_ickss_list.f_cbbh.length > 0)
                    {
                        whereClause += " f_cbbh like '%" + tbl_ld_ickss_list.f_cbbh + "%' and ";
                    }	          
		
			 			
				if (tbl_ld_ickss_list.f_cbbhid.length > 0)
                    {
                        whereClause += " f_cbbhid like '%" + tbl_ld_ickss_list.f_cbbhid + "%' and ";
                    }	          
		
			 			
				if (tbl_ld_ickss_list.f_dj.length > 0)
                    {
                        whereClause += " f_dj like '%" + tbl_ld_ickss_list.f_dj + "%' and ";
                    }	          
		
			 			
				if (tbl_ld_ickss_list.f_pwf.length > 0)
                    {
                        whereClause += " f_pwf like '%" + tbl_ld_ickss_list.f_pwf + "%' and ";
                    }	          
		
			 			
				if (tbl_ld_ickss_list.f_ysje.length > 0)
                    {
                        whereClause += " f_ysje like '%" + tbl_ld_ickss_list.f_ysje + "%' and ";
                    }	          
		
			 			
				if (tbl_ld_ickss_list.f_jmhysje.length > 0)
                    {
                        whereClause += " f_jmhysje like '%" + tbl_ld_ickss_list.f_jmhysje + "%' and ";
                    }	          
		
			 			
				if (tbl_ld_ickss_list.f_khytjjzsf.length > 0)
                    {
                        whereClause += " f_khytjjzsf like '%" + tbl_ld_ickss_list.f_khytjjzsf + "%' and ";
                    }	          
		
			 			
				if (tbl_ld_ickss_list.f_khytjjzpwf.length > 0)
                    {
                        whereClause += " f_khytjjzpwf like '%" + tbl_ld_ickss_list.f_khytjjzpwf + "%' and ";
                    }	          
		
			 			
				if (tbl_ld_ickss_list.f_sfsytjjz.length > 0)
                    {
                        whereClause += " f_sfsytjjz like '%" + tbl_ld_ickss_list.f_sfsytjjz + "%' and ";
                    }	          
		
			 			
				if (tbl_ld_ickss_list.f_sytjjzsf.length > 0)
                    {
                        whereClause += " f_sytjjzsf like '%" + tbl_ld_ickss_list.f_sytjjzsf + "%' and ";
                    }	          
		
			 			
				if (tbl_ld_ickss_list.f_sytjjzpwf.length > 0)
                    {
                        whereClause += " f_sytjjzpwf like '%" + tbl_ld_ickss_list.f_sytjjzpwf + "%' and ";
                    }	          
		
			 			
				if (tbl_ld_ickss_list.f_syhtjjzsf.length > 0)
                    {
                        whereClause += " f_syhtjjzsf like '%" + tbl_ld_ickss_list.f_syhtjjzsf + "%' and ";
                    }	          
		
			 			
				if (tbl_ld_ickss_list.f_syhtjjzpwf.length > 0)
                    {
                        whereClause += " f_syhtjjzpwf like '%" + tbl_ld_ickss_list.f_syhtjjzpwf + "%' and ";
                    }	          
		
			 			
				if (tbl_ld_ickss_list.f_khyye.length > 0)
                    {
                        whereClause += " f_khyye like '%" + tbl_ld_ickss_list.f_khyye + "%' and ";
                    }	          
		
			 			
				if (tbl_ld_ickss_list.f_sfsyye.length > 0)
                    {
                        whereClause += " f_sfsyye like '%" + tbl_ld_ickss_list.f_sfsyye + "%' and ";
                    }	          
		
			 			
				if (tbl_ld_ickss_list.f_syye.length > 0)
                    {
                        whereClause += " f_syye like '%" + tbl_ld_ickss_list.f_syye + "%' and ";
                    }	          
		
			 			
				if (tbl_ld_ickss_list.f_yhye.length > 0)
                    {
                        whereClause += " f_yhye like '%" + tbl_ld_ickss_list.f_yhye + "%' and ";
                    }	          
		
			 			
				if (tbl_ld_ickss_list.f_shys.length > 0)
                    {
                        whereClause += " f_shys like '%" + tbl_ld_ickss_list.f_shys + "%' and ";
                    }	          
		
			 			
				if (tbl_ld_ickss_list.f_shss.length > 0)
                    {
                        whereClause += " f_shss like '%" + tbl_ld_ickss_list.f_shss + "%' and ";
                    }	          
		
			 			
				if (tbl_ld_ickss_list.f_shzl.length > 0)
                    {
                        whereClause += " f_shzl like '%" + tbl_ld_ickss_list.f_shzl + "%' and ";
                    }	          
		
			 			
				if (tbl_ld_ickss_list.f_shssdx.length > 0)
                    {
                        whereClause += " f_shssdx like '%" + tbl_ld_ickss_list.f_shssdx + "%' and ";
                    }	          
		
			 			
				if (tbl_ld_ickss_list.f_jffs.length > 0)
                    {
                        whereClause += " f_jffs like '%" + tbl_ld_ickss_list.f_jffs + "%' and ";
                    }	          
		
			 			
				if (tbl_ld_ickss_list.f_jffsid.length > 0)
                    {
                        whereClause += " f_jffsid like '%" + tbl_ld_ickss_list.f_jffsid + "%' and ";
                    }	          
		
			 			
				if (tbl_ld_ickss_list.f_xkmsid.length > 0)
                    {
                        whereClause += " f_xkmsid like '%" + tbl_ld_ickss_list.f_xkmsid + "%' and ";
                    }	          
		
			 			
				if (tbl_ld_ickss_list.f_yyt.length > 0)
                    {
                        whereClause += " f_yyt like '%" + tbl_ld_ickss_list.f_yyt + "%' and ";
                    }	          
		
			 			
				if (tbl_ld_ickss_list.f_kplb.length > 0)
                    {
                        whereClause += " f_kplb like '%" + tbl_ld_ickss_list.f_kplb + "%' and ";
                    }	          
		
			 			
				if (tbl_ld_ickss_list.f_kplbid.length > 0)
                    {
                        whereClause += " f_kplbid like '%" + tbl_ld_ickss_list.f_kplbid + "%' and ";
                    }	          
		
			 			
				if (tbl_ld_ickss_list.f_yytid.length > 0)
                    {
                        whereClause += " f_yytid like '%" + tbl_ld_ickss_list.f_yytid + "%' and ";
                    }	          
		
			 			
				if (tbl_ld_ickss_list.f_sfjl.length > 0)
                    {
                        whereClause += " f_sfjl like '%" + tbl_ld_ickss_list.f_sfjl + "%' and ";
                    }	          
		
			 			
				if (tbl_ld_ickss_list.f_tgly.length > 0)
                    {
                        whereClause += " f_tgly like '%" + tbl_ld_ickss_list.f_tgly + "%' and ";
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
            $('#btn_command_clearselect_tbl_ld_ickss_list').addClass('hidden');
        }
        else
        {
            $('#btn_command_clearselect_tbl_ld_ickss_list').removeClass('hidden');
            var allcount = that._pr_gridselectids.split('^').length;
            var currentcount = $('#table_grid_tbl_ld_ickss_list').bootstrapTable('getSelections').length;
            $('#btn_command_clearselect_tbl_ld_ickss_list .cc-badge-p').html(currentcount + '/' + allcount);
        }
    };


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
        //_maintable_sys_id
        _pr_maintable_sys_id:'',
        //是否查询历史库
        _pr_searchhis: 'false',
        _pr_khbh:'',

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
                                                that.bindGrid({
                                                    success: function ()
                                                    {

                                                        _validateMessage = new validateMessage('btn_search_modal_search_tbl_ld_ickss_list');

                                                        //_ladda_btn_command_new = Ladda.create('btn_command_new_tbl_ld_ickss_list');
                                                        //_ladda_btn_command_delete = Ladda.create('btn_command_delete_tbl_ld_ickss_list');
                                                        _ladda_btn_command_exp_ickpart = Ladda.create('btn_command_export_tbl_ld_ick_list_part');
                                                        _ladda_btn_command_ickhis = Ladda.create('btn_command_his_tbl_ld_ickss_list');
                                                        switch (that._pr_listtype)
                                                        {
                                                            case "1":
                                                                setDisable(false);
                                                                break;
                                                            case "2":
                                                                setDisable(true);
                                                                break;
                                                        }

                                                        callBackFunction.success();
                                                    }
                                                });
                                            }
                                        });

                                    }
                                });

                                //初始化search
                                initSearchBaseCode({
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
                var whereClause = _whereClauseString;
                whereClause += "f_khbh = " + that._pr_khbh;
                var orderByString = ' sys_id desc';
                var columnsString = 'f_value1^f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^f_khbh^f_khbhid^f_yhbh^f_yhbhid^f_dz^f_dh^f_dy^f_dyid^f_sc^f_scid^f_qy^f_qyid^f_pq^f_pqid^f_yhm^f_jfm^f_lxtkhh^f_khrq^f_yslx^f_yslxid^f_sbbh^f_sbbhid^f_kj^f_kjid^f_sblx^f_sblxid^f_rs^f_sf^f_sl^f_jfdh^f_jfje^f_zt^f_ztid^f_bz^f_xkr^f_xkrid^f_xkrq^f_xiekr^f_xiekrid^f_xiekrq^f_ssbh^f_sjbh^f_ly^f_lyid^f_xklx^f_xkkh^f_xkgscs^f_xkbcgsl^f_xkms^f_xkljgl^f_xkjzlx^f_port^f_dkkh^f_dkbcgsl^f_dkgscs^f_dkljgl^f_dkjzlx^f_dksbzt^f_khfz^f_khfzid^f_cbbh^f_cbbhid^f_dj^f_pwf^f_ysje^f_jmhysje^f_khytjjzsf^f_khytjjzpwf^f_sfsytjjz^f_sytjjzsf^f_sytjjzpwf^f_syhtjjzsf^f_syhtjjzpwf^f_khyye^f_sfsyye^f_syye^f_yhye^f_shys^f_shss^f_shzl^f_shssdx^f_jffs^f_jffsid^f_xkmsid^f_yyt^f_kplb^f_kplbid^f_yytid^f_sfjl^f_tgly^sys_id';
                var data = {
                    whereString: whereClause,
                    orderByString: orderByString,
                    columnsString: columnsString,
                    pageSizeString: _pageSize,
                    pageIndexString: that._pr_gridpageindex,
                    clientInf: _clientInf
                };
                if (that._pr_searchhis == 'false')
                {
                    data["cxzxsjString"] = "false";
                }
                else
                {
                    data["cxzxsjString"] = "true";
                }
                doAjaxFunction(_serviceUrl, 'GetList', data, {
                    success: function (result)
                    {
                        var messageJson = (new Function("", "return " + result))();

                        $('#table_grid_tbl_ld_ickss_list').bootstrapTable("loadJson", messageJson);

                        gridSelectedChange();
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
        //导出
        btn_command_export_ickpart_onclick: function ()
        {
            
            _ladda_btn_command_exp_ickpart.start();
            //if (_whereClauseString == "")
            //{
            //    var where = " 1=1";
            //}
            //else
            //{
            //    var where = _whereClauseString;
            //}
            //var orderByString = ' sys_id desc';
            //var columnsString = 'f_khbh,f_sjbh,f_jfbh,f_yhm,f_dz,f_dj,f_cbyslj,f_sflj,f_pwflj,f_shss,f_jmjelj,f_jffs,f_jcfs,f_yyy,f_czsj,f_sfykfp,f_kplb,f_yyt,f_zt,f_ly';
            //var colunmsName = '客户编号,收据编号,缴费编号,用户名,地址,单价,抄表应收累计,水费累计,污水处理费累计,算后实收,减免金额,缴费方式,缴存方式,操作人,操作时间,是否已开发票,开票类别,营业厅,状态,来源';

            if (_whereClauseString == "")
            {
                var where = " 1=1 and";
                where += " f_khbh = " + that._pr_khbh;
            }
            else
            {
                var where = _whereClauseString;
                where += " and f_khbh = " + that._pr_khbh;
            }


            var columnsString = 'f_ssbh,f_khbh,f_yhm,f_dz,f_dh,f_xkgscs,f_xkljgl,f_yslx,f_sl,f_shys,f_zt,f_ly,f_bz';
            var colunmsName = '售水编号,客户编号,用户名,地址,电话,写卡购水次数,写卡累计购量,用水类型,水量,算后应收,状态,来源,备注';

            var orderByString = ' sys_id desc';
            var data = {
                whereString: where,
                orderByString: orderByString,
                column: columnsString,
                columnname: colunmsName,
                clientInf: _clientInf
            };
            if (that._pr_searchhis == 'false')
            {
                data["cxzxsjString"] = "false";
            }
            else
            {
                data["cxzxsjString"] = "true";
            }
            doAjaxFunction(_serviceUrl, 'NewExport', data, {
                success: function (message)
                {
                    _ladda_btn_command_exp_ickpart.stop();
                    window.open(message, "_blank", "");
                },
                fail: function (message)
                {
                    _ladda_btn_command_exp_ickpart.stop();
                    _alertMessage.show('数据导出失败', 'fail');
                    _resultMessage.show(message);
                },
                error: function (message)
                {
                    _ladda_btn_command_exp_ickpart.stop();
                    _alertMessage.show('数据导出失败', 'fail');
                    _resultMessage.show(message);
                }
            });
        },



        //历史库切换功能
        btn_command_ickhis_onclick: function ()
        {
           
            if ($('#btn_command_his_tbl_ld_ickss_list').hasClass('btn-default'))
            {
                $('#btn_command_his_tbl_ld_ickss_list').removeClass('btn-default');
                $('#btn_command_his_tbl_ld_ickss_list').addClass('btn-primary');
                $('#btn_command_his_tbl_ld_ickss_list').text('含历史库数据');

                that._pr_searchhis = 'true';
            }
            else
            {
                $('#btn_command_his_tbl_ld_ickss_list').removeClass('btn-primary');
                $('#btn_command_his_tbl_ld_ickss_list').addClass('btn-default');
                $('#btn_command_his_tbl_ld_ickss_list').text('不含历史库数据');
                that._pr_searchhis = 'false';
            }
            _ladda_btn_command_ickhis.start();
            _ladda_btn_command_exp_ickpart.start();
            that.bindGrid({
                success: function ()
                {
                    _ladda_btn_command_ickhis.stop();
                    _ladda_btn_command_exp_ickpart.stop();
                }, fail: function (message)
                {
                    _ladda_btn_command_ickhis.stop();
                    _ladda_btn_command_exp_ickpart.stop();
                    _alertMessage.show('绑定失败', 'fail');
                    _resultMessage.show(message);
                }
            });
        },

        /* 
        *  
        *  方法:btn_command_new_onclick
        *  参数:
        *  新建数据并跳转到detail页面
        */
        btn_command_new_onclick: function ()
        {

            _ladda_btn_command_new.start();
            var d = new Date();

            var json = {

                f_file: controlObj.fileuploadernewfileid(),


                sys_delflag: '0',
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
            }

            doAjaxFunction(_serviceUrl, 'Add', data, {
                success: function (result)
                {
                    _ladda_btn_command_new.stop();
                    transToDetailPage(result, '1');

                }, fail: function (message)
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
                var currentcount = $('#table_grid_tbl_ld_ickss_list').bootstrapTable('getSelections').length;
                var outercount = allcount - currentcount;
                var confirmContent = '<blockquote> ';
                confirmContent += '<h3>将对被选中的全部数据<a style="color:red">' + allcount + '</a>条进行<a style="color:red">删除</a></h3>';
                confirmContent += '其中<br/>';
                confirmContent += '<h5><a style="color:red">当前页</a>的数据<a style="color:red">' + currentcount + '</a>条</h5>';
                confirmContent += '<h5><a style="color:red">其他页</a>的数据<a style="color:red">' + outercount + '</a>条</h5>';
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
            $('#table_grid_tbl_ld_ickss_list').bootstrapTable('uncheckAll');
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
        *  主要是响应“简单查询”按钮的事件
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
            $('#btn_command_search_tbl_ld_ickss_list').html('简单查询');
            $('#txt_command_search_tbl_ld_ickss_list').removeAttr('disabled');
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
            $('#btn_command_search_tbl_ld_ickss_list').html('高级查询');
            $('#txt_command_search_tbl_ld_ickss_list').attr('disabled', 'disabled');

            $('#div_search_modal_tbl_ld_ickss_list').modal('show');
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

                                    $('#div_search_modal_tbl_ld_ickss_list').modal('hide')
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
            _validateMessage.hidden();
            $('#div_search_modal_tbl_ld_ickss_list').modal('hide');

            that._pr_searchtype = '1';
            $('#btn_command_search_tbl_ld_ickss_list').html('简单查询');
            $('#txt_command_search_tbl_ld_ickss_list').removeAttr('disabled');
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
            $('#btn_command_search_tbl_ld_ickss_list').html('高级查询');
            $('#txt_command_search_tbl_ld_ickss_list').attr('disabled', 'disabled');

            $('#div_search_modal_tbl_ld_ickss_list').modal('show');
        }



    };
    return that;
})();




