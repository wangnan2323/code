

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
    _pageSize = '20',
    _isPage = true,

    _isadmin = '',//0是管理员，1不是

    //查询sql语句
    _whereClauseString = '',
    _baseCodeHashMap = null,
    _onchangeid = '',

    _pgb_pgrq= '',//评估表的评估日期，传入抄表getlist方法，用于区分是运行库还是历史库
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
            _isadmin = requestQuery('isadmin');
            callBackFunction.success();
        }
        catch (ex)
        {
            _blockMessage.show('initParameter执行失败<br/>' + ex.message, 'fail');
        }
    },
    /* 
    *  
    *  方法:initBaseCode
    *  参数:callBackFunction
    *  初始化Code，存储到_baseCodeHashMap
    */
    initBaseCode = function (callBackFunction)
    {

        try
        {
            _baseCodeHashMap = new hashMap();
            //获取算费表的算费批次名称

            var sql = "select t.sys_id as id,t.f_pgpcmc as text,t.f_pgsj as pgsj from tbl_ld_pgb t where f_value1='" + that._pr_cbbhid + "'";
            //不是管理员，是算费页面，所以是新建状态
            if (_isadmin == '1')
            {
                sql += " and f_ztid in ('0','2')";
            }
            else if (_isadmin == '0')//是管理员，是查询页面，所以是已算费状态
            {
                sql += " and f_ztid='1'";
            }
            sql += " order by sys_id desc";
            var sqlStringsJson = {
                'tbl_ld_sfb': sql,
            };
            commonObj.querySqls(sqlStringsJson, {
                success: function (resultJson)
                {
                    _baseCodeHashMap.put('codeservice_sf', resultJson["tbl_ld_sfb"]);
                    callBackFunction.success();
                }
            });
        }
        catch (ex)
        {
            _blockMessage.show('initBaseCode执行失败<br/>' + ex.message, 'fail');
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

    /* 
    *  
    *  方法:transToDetailPage
    *  参数:id, pagetype
    *  跳页方法
    */
    transToDetailPage = function (id, pagetype)
    {
        var url = '../tbl_ld_cbiao/tbl_ld_cbiao_detail.html';
        url += '?uid=' + basePageObj._userInfoJson.sys_userid;
        url += '&sys_id=' + id;
        url += '&pagetype=' + pagetype;
        url += '&appcode=' + that._pr_appcode;
        url += '&isadmin=0';
        url += '&fromurl=../tbl_ld_cben/tbl_ld_cben_cbiao_treelist.html';
        url += '&fromurlparam={';
        url += '"appcode":"' + that._pr_appcode + '",';
        url += '"listtype":"' + that._pr_listtype + '",';
        url += '"isadmin":"' + that._pr_isadmin + '",';
        url += '"partgridselectids":"' + that._pr_part_gridselectids + '",';
        url += '"partgridpageindex":"' + that._pr_part_gridpageindex + '",';

        url += '"gridstatusscrolltop":"' + that._pr_tree_gridstatusscrolltop + '",';
        url += '"gridselectid":"' + that._pr_tree_gridselectid + '",';
        url += '"gridpageindex":"' + that._pr_tree_gridpageindex + '",';
        url += '"searchtype":"' + that._pr_tree_searchtype + '",';
        url += '"pgid":"' + that._pr_pgb_sys_id + '",';
        url += '"searchcontent":' + JSON.stringify(that._pr_tree_searchcontent) + '';
        url += '}';
        commonObj.changeUrl(url, 'right-show');
    },




     /* 
    *  
    *  方法:initDetailControl
    *  参数:
    *  初始化DetailModel控件，_baseCodeHashMap作为Code数据源
    */
    initQueryControl = function (callBackFunction)
    {

        try
        {
            var codeService_sf = _baseCodeHashMap.get('codeservice_sf');
            controlObj.singledropdownlistinit('detail_f_pgpcmc_tbl_ld_cben_treelist', codeService_sf, f_sfmc_onchange);

            controlObj.singledropdownlistid('detail_f_pgpcmc_tbl_ld_cben_treelist', that._pr_pgb_sys_id);

            callBackFunction.success();
            //that.bindGrid({
            //    success: function () {
            //        callBackFunction.success();
            //    }, fail: function (message) {
            //        _blockMessage.show('绑定列表执行失败。<br/>' + message, 'fail');
            //    }
            //});
        }
        catch (ex)
        {
            _blockMessage.show('initDetailControl执行失败。<br/>' + ex.message, 'fail');
        }
    },
      //算费批次名称下拉事件
      f_sfmc_onchange = function (e)
      { 
          if (_onchangeid != e.added.id)
          {
              _onchangeid = e.added.id;
              that._pr_pgb_sys_id = controlObj.singledropdownlistid('detail_f_pgpcmc_tbl_ld_cben_treelist');

              _pgb_pgrq = e.added.pgsj;
              that.bindGrid({
                  success: function ()
                  {
                  }, fail: function (message)
                  {
                      _blockMessage.show('绑定列表执行失败。<br/>' + message, 'fail');
                  }
              });
          }

      },

    //---------------------------------------------------------------------------------
    // ---------------------------------grid------------------------------------------
    //---------------------------------------------------------------------------------

    /* 
    *  
    *  方法:creatWhereClause
    *  参数:callBackFunction
    *  针对_pr_treesearchtype生成sql语句存储在_whereClauseString
    */
    creatWhereClause = function (callBackFunction)
    {
        var whereClause = '';

        _whereClauseString = whereClause;
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
            var h = 200;
            //if (_isadmin == '1')
            //{
            //    h = 167;
            //    //这时候不显示 查询批次功能                
            //    $('#div_detail_f_pgpcmc_tbl_ld_cben_treelist').addClass('hidden');
            //}
            //else if (_isadmin == '0')//是管理员，是查询页面，所以是已算费状态
            //{
            //    h = 200;
            //    //这时候显示 查询批次功能                
            //    $('#div_detail_f_pgpcmc_tbl_ld_cben_treelist').removeClass('hidden');
            //}
            //根据页面情况设置Grid的高度
            var gridHeight = 0;
            if ($(window).width() < basePageObj._limSrceenWidth)
            {
                gridHeight = $(window).height() - h;
                if (gridHeight < 950)
                {
                    gridHeight = 950;
                }
            }
            else
            {
                gridHeight = $(window).height() - h;
            }

            $('#table_grid_tbl_ld_cbiao_list').bootstrapTable({
                cache: false,
                height: gridHeight,
                striped: true,
                pagination: _isPage,
                pageSize: _pageSize,
                pageList: [_pageSize],
                pageNumber: that._pr_part_gridpageindex,
                search: false,
                showColumns: false,
                showRefresh: false,
                clickToSelect: false,
                idField: 'sys_id',
                sidePagination: 'webserver',
                columns: [
                //{
                //    field: '_checkbox', checkbox: true,
                //    formatter: function (value, row, index)
                //    {
                //        //根据gridselectids给Grid设置选中项
                //        switch (that._pr_listtype)
                //        {
                //            //编辑模式
                //            case "1":
                //                {
                //                    if (('^' + that._pr_part_gridselectids + '^').indexOf('^' + row.sys_id + '^') > -1)
                //                    {
                //                        return {
                //                            disabled: false,
                //                            checked: true
                //                        }
                //                    }
                //                    return value;
                //                }
                //                break;
                //                //制度模式
                //            case "2":
                //                {
                //                    if (('^' + that._pr_part_gridselectids + '^').indexOf('^' + row.sys_id + '^') > -1)
                //                    {
                //                        return {
                //                            disabled: true,
                //                            checked: true
                //                        }
                //                    }
                //                    else
                //                    {
                //                        return {
                //                            disabled: true
                //                        }
                //                    }
                //                }
                //                break;
                //        }
                //    }
                //},
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
                        field: 'f_qsqpjsl',
                        title: '前三期平均水量',
                        "class": '',
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
                         "class": '',
                         align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                         formatter: function (value, row, index)
                         {
                             var resultStr = value;



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



                             return resultStr;
                         }
                     },



                {
                    field: 'f_yslx',
                    title: '用水类型',
                    "class": '',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;



                        return resultStr;
                    }
                },

                 {
                     field: 'f_sfsfts',
                     title: '是否算费提示',
                     "class": 'hidden',
                     align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                     formatter: function (value, row, index)
                     {
                         var resultStr = value;

                         if (value == "true")
                         {
                             resultStr = "是";
                         }
                         else
                         {
                             resultStr = "否";
                         }

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
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
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
                    field: 'f_cbyname',
                    title: '抄表员name',
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
                    title: '评估编号',
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
                    title: '评估编号id',
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
                    title: '评估人',
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
                    title: '评估人id',
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
                    title: '评估批次名称',
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
                    title: '评估时间',
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
                    field: 'f_jmje',
                    title: '减免金额',
                    "class": '',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;



                        return resultStr;
                    }
                },

                   {
                       field: 'f_jmbh',
                       title: '减免编号',
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
                    field: 'f_cb_cbbh',
                    title: '抄表编号',
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



                        return resultStr;
                    }
                }
                ,

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
                    that._pr_part_gridpageindex = number;
                    that.bindGrid();
                },
                rowStyle: function (row, index)
                {
                    //可以根据数据情况设置行的背景颜色。
                    //return {classes: 'active'//'success'//'info'//'warning' //'danger'};
                    if (row.f_sfsfts == "true")
                    {
                        return { classes: 'danger' };
                    }
                    else
                    {
                        return {};
                    }
                },
                onLoadSuccess: function (data)
                {
                    //grid绑定完成后触发此事件
                },
                //当列头复选框被选中时，触发此事件，选中项ID存储在_pr_part_gridselectids中
                onCheck: function (row)
                {
                    that._pr_part_gridselectids += '^' + row.sys_id;
                    that._pr_part_gridselectids = that._pr_part_gridselectids.trimStartEnd('^');

                },
                //当列头复选框被反选中时，触发此事件，选中项ID存储在_pr_part_gridselectids中
                onUncheck: function (row)
                {
                    that._pr_part_gridselectids = ('^' + that._pr_part_gridselectids + '^').replaceAll('^' + row.sys_id + '^', '^');
                    that._pr_part_gridselectids = that._pr_part_gridselectids.trimStartEnd('^');

                },
                //当列头复选框被全选中时，触发此事件，选中项ID存储在_pr_part_gridselectids中
                onCheckAll: function ()
                {
                    var rows = $('#table_grid_tbl_ld_cbiao_list').bootstrapTable('getSelections');
                    $.each(rows, function (i, u)
                    {
                        if (('^' + that._pr_part_gridselectids + '^').indexOf('^' + rows[i].sys_id + '^') > -1)
                        {

                        }
                        else
                        {
                            that._pr_part_gridselectids += '^' + rows[i].sys_id;
                        }
                    });
                    that._pr_part_gridselectids = that._pr_part_gridselectids.trimStartEnd('^');


                },
                //当列头复选框被全反选中时，触发此事件，选中项ID存储在_pr_part_gridselectids中
                onUncheckAll: function ()
                {
                    var rows = $('#table_grid_tbl_ld_cbiao_list').bootstrapTable('getData');
                    $.each(rows, function (i, u)
                    {
                        if (('^' + that._pr_part_gridselectids + '^').indexOf('^' + rows[i].sys_id + '^') > -1)
                        {
                            that._pr_part_gridselectids = ('^' + that._pr_part_gridselectids + '^').replaceAll('^' + rows[i].sys_id + '^', '^');
                        }
                    });

                    that._pr_part_gridselectids = that._pr_part_gridselectids.trimStartEnd('^');


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

        //人员类型，如果是为0管理员则不显示已抄表状态的抄表总和
        _pr_isadmin: '',

        //抄本编号id
        _pr_cbbhid: '',


        //当前被选中的行的ID集合的字符串//1^2^6
        _pr_part_gridselectids: '',
        //当前在第几页
        _pr_part_gridpageindex: 1,

        //当前评估ID
        _pr_pgb_sys_id: '',

        //当前抄本当前评估共有多少条抄表数据
        _pr_cb_count: '0',

     

        //===============保存tree程序的参数，在跳页的时候实现参数带着走

        

        //当前被选中的行的ID
        _pr_tree_gridselectid: '',
        //当前在第几页
        _pr_tree_gridpageindex: 1,
        //滚动条的位置
        _pr_tree_gridstatusscrolltop: '',

        //当前的查询模式：1：简单查询；2：高级查询
        _pr_tree_searchtype: '1',
        //查询内容type1:简单查询内容；type2：高级查询内容（JSON）
        _pr_tree_searchcontent: null,










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

                                initBaseCode({
                                    success: function ()
                                    {
                                        initQueryControl({
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
        *  根据_whereClauseString，_pageSize，_pr_part_gridpageindex绑定数据
        */
        bindGrid: function (callBackFunction)
        {

            setTimeout(function ()
            {
                $('#table_grid_tbl_ld_cbiao_list').bootstrapTable("showLoading");

                var whereClause = _whereClauseString;

                if (that._pr_cbbhid != '')
                {
                    if (whereClause != "")
                    {
                        whereClause += " and ";
                    }
                    whereClause += " f_cbbhid = '" + that._pr_cbbhid + "'";

                    whereClause += " and sys_delflag = '0'";
                    if (_isadmin == "1")
                    {
                        if (that._pr_pgb_sys_id == null || that._pr_pgb_sys_id == "")
                        {
                            whereClause += " and (f_pgbhid is null or f_pgbhid = '')";
                        }
                        else
                        {
                            whereClause += " and f_pgbhid = '" + that._pr_pgb_sys_id + "'";
                        }

                        whereClause += " and f_ztid = '1'";
                    }
                    else
                    {
                        if (that._pr_pgb_sys_id == null || that._pr_pgb_sys_id == "")
                        {
                            whereClause += " and 1=2 ";
                        }
                        else
                        {
                            whereClause += " and f_pgbhid = '" + that._pr_pgb_sys_id + "'";
                        }
                        whereClause += " and (f_ztid = '2'or f_ztid = '3')";
                    }
                    var orderByString = ' f_sfsfts desc';
                    var columnsString = 'f_value1^f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^f_khbhid^f_cbyid^f_cbyphoto^f_sbbhid^f_sblxid^f_yslxid^f_cbbhid^f_khbh^f_sqzm^f_bqzm^f_bqsl^f_sqsl^f_qsqpjsl^f_qlqpjsl^f_cbyname^f_cbsj^f_bk^f_bkid^f_zt^f_ztid^f_ly^f_lyid^f_bz^f_yhm^f_jfm^f_dh^f_dz^f_dy^f_dyid^f_sc^f_scid^f_qy^f_qyid^f_pq^f_pqid^f_lxtkhh^f_pgbh^f_pgbhid^f_pgr^f_pgrid^f_pgpcmc^f_pgsj^f_jfbh^f_jfbhid^f_jfsj^f_bqje^f_sbbh^f_sblx^f_yslx^f_cbbh^f_cbmc^f_cb_cbbh^f_cb_cbbhid^f_yhbh^f_yhbhid^f_sfsfts^sys_id';
                    columnsString += '^f_jmje^f_jmbh';
                    if (_pgb_pgrq == "" || _pgb_pgrq == '1900-01-01 00:00:00') {
                        var d = new Date();
                        _pgb_pgrq = d.Format('yyyy-MM-dd hh:mm:ss');
                    }
                    var data = {
                        whereString: whereClause,
                        cxzxsjString: _pgb_pgrq,
                        orderByString: orderByString,
                        columnsString: columnsString,
                        pageSizeString: _pageSize,
                        pageIndexString: that._pr_part_gridpageindex,
                        clientInf: _clientInf
                    };
                    doAjaxFunction(_serviceUrl, 'GetList', data, {
                        success: function (result)
                        {
                            var messageJson = (new Function("", "return " + result))();

                            $('#table_grid_tbl_ld_cbiao_list').bootstrapTable("hideLoading");

                            $('#table_grid_tbl_ld_cbiao_list').bootstrapTable("loadJson", messageJson);
                            that._pr_cb_count = messageJson.total;


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
                        callBackFunction.fail("抄本标号ID不能为空");
                    }
                }
            }, 0);
        },

        initAndBindGrid: function (callBackFunction)
        {
            that._pr_cb_count = '0';
            $('#table_grid_tbl_ld_cbiao_list').bootstrapTable("destroy");
            initGrid({
                success: function ()
                {

                    initBaseCode({
                        success: function ()
                        {

                            initQueryControl({
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
                                }
                            });
                        }
                    });
                }, fail: function (message)
                {
                    callBackFunction.fail(message);
                }
            })
        },





        end: function ()
        {
        }

    };
    return that;
})();





