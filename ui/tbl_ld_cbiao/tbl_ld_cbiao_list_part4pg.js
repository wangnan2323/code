

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

    //校验结果容器
    _validateMessage = null,

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
                    $('#btn_command_search_tbl_ld_cbiao_list').html('简单查询');
                    $('#txt_command_search_tbl_ld_cbiao_list').removeAttr("disabled");

                    break;
                case "2":
                    $('#btn_command_search_tbl_ld_cbiao_list').html('高级查询');
                    $('#txt_command_search_tbl_ld_cbiao_list').attr("disabled", true);
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
        try
        {
            if (isDisable)
            {
                //$('#btn_command_delete_tbl_ld_cbiao_list').addClass('hidden');
                //$( '#btn_command_new_tbl_ld_cbiao_list' ).addClass( 'hidden' ); 
            }
            else
            {
                $('#btn_command_delete_tbl_ld_cbiao_list').removeClass('hidden');
                $('#btn_command_new_tbl_ld_cbiao_list').removeClass('hidden');
            }
        }
        catch (ex)
        {
            _blockMessage.show('setDisable执行失败<br/>' + ex.message, 'fail');
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
        tbl_ld_cbiao_detail_Obj._pr_sys_id = id;
        tbl_ld_cbiao_detail_Obj.bindPage({
            success: function ()
            {
                $('#div_content_part_tbl_ld_cbiao_list').css('display', 'none');
                $('#div_content_part_tbl_ld_cbiao_detail').css('display', '');
            }
        });
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

                                    whereClause += " f_cbbhid like '%" + vv[i] + "%' or ";

                                    whereClause += " f_khbh like '%" + vv[i] + "%' or ";

                                    whereClause += " f_sqzm like '%" + vv[i] + "%' or ";

                                    whereClause += " f_bqzm like '%" + vv[i] + "%' or ";

                                    whereClause += " f_bqsl like '%" + vv[i] + "%' or ";

                                    whereClause += " f_sqsl like '%" + vv[i] + "%' or ";

                                    whereClause += " f_qsqpjsl like '%" + vv[i] + "%' or ";

                                    whereClause += " f_qlqpjsl like '%" + vv[i] + "%' or ";

                                    whereClause += " f_cbyname like '%" + vv[i] + "%' or ";


                                    whereClause += " to_char(f_cbsj,'yyyy-MM-dd hh24:mi:ss') like '%" + vv[i] + "%' or ";

                                    whereClause += " f_bk like '%" + vv[i] + "%' or ";

                                    whereClause += " f_zt like '%" + vv[i] + "%' or ";

                                    whereClause += " f_ly like '%" + vv[i] + "%' or ";

                                    whereClause += " f_bz like '%" + vv[i] + "%' or ";

                                    whereClause += " f_yhm like '%" + vv[i] + "%' or ";

                                    whereClause += " f_jfm like '%" + vv[i] + "%' or ";

                                    whereClause += " f_dy like '%" + vv[i] + "%' or ";

                                    whereClause += " f_dyid like '%" + vv[i] + "%' or ";

                                    whereClause += " f_sc like '%" + vv[i] + "%' or ";

                                    whereClause += " f_scid like '%" + vv[i] + "%' or ";

                                    whereClause += " f_qy like '%" + vv[i] + "%' or ";

                                    whereClause += " f_qyid like '%" + vv[i] + "%' or ";

                                    whereClause += " f_pq like '%" + vv[i] + "%' or ";

                                    whereClause += " f_pqid like '%" + vv[i] + "%' or ";

                                    whereClause += " f_lxtkhh like '%" + vv[i] + "%' or ";

                                    whereClause += " f_pgbh like '%" + vv[i] + "%' or ";

                                    whereClause += " f_pgbhid like '%" + vv[i] + "%' or ";

                                    whereClause += " f_pgr like '%" + vv[i] + "%' or ";

                                    whereClause += " f_pgrid like '%" + vv[i] + "%' or ";

                                    whereClause += " f_pgpcmc like '%" + vv[i] + "%' or ";


                                    whereClause += " to_char(f_pgsj,'yyyy-MM-dd hh24:mi:ss') like '%" + vv[i] + "%' or ";

                                    whereClause += " f_jfbh like '%" + vv[i] + "%' or ";

                                    whereClause += " f_jfbhid like '%" + vv[i] + "%' or ";


                                    whereClause += " to_char(f_jfsj,'yyyy-MM-dd hh24:mi:ss') like '%" + vv[i] + "%' or ";

                                    whereClause += " f_bqje like '%" + vv[i] + "%' or ";

                                    whereClause += " f_sbbh like '%" + vv[i] + "%' or ";
                                    whereClause += " f_khfz like '%" + vv[i] + "%' or ";
                                    whereClause += " f_khfzid like '%" + vv[i] + "%' or ";
                                    whereClause += " f_sf like '%" + vv[i] + "%' or ";
                                    whereClause += " f_pwf like '%" + vv[i] + "%' or ";
                                    whereClause += " f_sjljsyl like '%" + vv[i] + "%' or ";
                                    whereClause += " f_jmje like '%" + vv[i] + "%' or ";
                                    whereClause += " f_jmbh like '%" + vv[i] + "%' or ";
                                    whereClause += " f_jmbhid like '%" + vv[i] + "%' or ";
                                    whereClause += " f_sfsfts like '%" + vv[i] + "%' or ";

                                    whereClause += " f_sblx like '%" + vv[i] + "%' or ";

                                    whereClause += " f_yslx like '%" + vv[i] + "%' or ";

                                    whereClause += " f_cbbh like '%" + vv[i] + "%' or ";

                                    whereClause += " f_cbmc like '%" + vv[i] + "%' or ";

                                    whereClause += " f_cb_cbbh like '%" + vv[i] + "%' or ";

                                    whereClause += " f_yhbh like '%" + vv[i] + "%' or ";

                                    whereClause += " f_yhbhid like '%" + vv[i] + "%' or ";

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

                        var tbl_ld_cbiao_list = that._pr_searchcontent.type2;



                        //if (tbl_ld_cbiao_list.f_cbbhid.length > 0)
                        if (tbl_ld_cbiao_list.f_cbbhid.length > 0)
                        {
                            var elementArray = tbl_ld_cbiao_list.f_cbbhid.split(',');
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

                        if (tbl_ld_cbiao_list.f_khbh.length > 0)
                        {
                            whereClause += " f_khbh like '%" + tbl_ld_cbiao_list.f_khbh + "%' and ";
                        }


                        if (tbl_ld_cbiao_list.f_sqzm.length > 0)
                        {
                            whereClause += " f_sqzm like '%" + tbl_ld_cbiao_list.f_sqzm + "%' and ";
                        }


                        if (tbl_ld_cbiao_list.f_bqzm.length > 0)
                        {
                            whereClause += " f_bqzm like '%" + tbl_ld_cbiao_list.f_bqzm + "%' and ";
                        }


                        if (tbl_ld_cbiao_list.f_bqsl.length > 0)
                        {
                            whereClause += " f_bqsl like '%" + tbl_ld_cbiao_list.f_bqsl + "%' and ";
                        }


                        if (tbl_ld_cbiao_list.f_sqsl.length > 0)
                        {
                            whereClause += " f_sqsl like '%" + tbl_ld_cbiao_list.f_sqsl + "%' and ";
                        }


                        if (tbl_ld_cbiao_list.f_qsqpjsl.length > 0)
                        {
                            whereClause += " f_qsqpjsl like '%" + tbl_ld_cbiao_list.f_qsqpjsl + "%' and ";
                        }


                        if (tbl_ld_cbiao_list.f_qlqpjsl.length > 0)
                        {
                            whereClause += " f_qlqpjsl like '%" + tbl_ld_cbiao_list.f_qlqpjsl + "%' and ";
                        }


                        if (tbl_ld_cbiao_list.f_cbyname.length > 0)
                        {
                            whereClause += " f_cbyname like '%" + tbl_ld_cbiao_list.f_cbyname + "%' and ";
                        }


                        if (tbl_ld_cbiao_list.f_cbsjfrom != '1900-01-01 00:00:00')
                        {
                            whereClause += " f_cbsj >= to_date('" + tbl_ld_cbiao_list.f_cbsjfrom + "','yyyy-MM-dd hh24:mi:ss') and ";
                        }

                        if (tbl_ld_cbiao_list.f_cbsjto != '1900-01-01 00:00:00')
                        {
                            whereClause += " f_cbsj <= to_date('" + tbl_ld_cbiao_list.f_cbsjto + "','yyyy-MM-dd hh24:mi:ss') and ";
                        }


                        if (tbl_ld_cbiao_list.f_bkid.length > 0)
                        {
                            var elementArray = tbl_ld_cbiao_list.f_bkid.split(',');
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
                                whereClause += "((','||f_bkid||',') like ('%,'||'" + elementArray[i] + "'||',%')) ";

                            });
                            whereClause += ') and ';
                        }


                        if (tbl_ld_cbiao_list.f_ztid.length > 0)
                        {
                            var elementArray = tbl_ld_cbiao_list.f_ztid.split(',');
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
                                whereClause += "((','||f_ztid||',') like ('%,'||'" + elementArray[i] + "'||',%')) ";

                            });
                            whereClause += ') and ';
                        }


                        if (tbl_ld_cbiao_list.f_lyid.length > 0)
                        {
                            var elementArray = tbl_ld_cbiao_list.f_lyid.split(',');
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
                                whereClause += "((','||f_lyid||',') like ('%,'||'" + elementArray[i] + "'||',%')) ";

                            });
                            whereClause += ') and ';
                        }


                        if (tbl_ld_cbiao_list.f_bz.length > 0)
                        {
                            whereClause += " f_bz like '%" + tbl_ld_cbiao_list.f_bz + "%' and ";
                        }


                        if (tbl_ld_cbiao_list.f_yhm.length > 0)
                        {
                            whereClause += " f_yhm like '%" + tbl_ld_cbiao_list.f_yhm + "%' and ";
                        }


                        if (tbl_ld_cbiao_list.f_jfm.length > 0)
                        {
                            whereClause += " f_jfm like '%" + tbl_ld_cbiao_list.f_jfm + "%' and ";
                        }


                        if (tbl_ld_cbiao_list.f_dy.length > 0)
                        {
                            whereClause += " f_dy like '%" + tbl_ld_cbiao_list.f_dy + "%' and ";
                        }


                        if (tbl_ld_cbiao_list.f_dyid.length > 0)
                        {
                            whereClause += " f_dyid like '%" + tbl_ld_cbiao_list.f_dyid + "%' and ";
                        }


                        if (tbl_ld_cbiao_list.f_sc.length > 0)
                        {
                            whereClause += " f_sc like '%" + tbl_ld_cbiao_list.f_sc + "%' and ";
                        }


                        if (tbl_ld_cbiao_list.f_scid.length > 0)
                        {
                            whereClause += " f_scid like '%" + tbl_ld_cbiao_list.f_scid + "%' and ";
                        }


                        if (tbl_ld_cbiao_list.f_qy.length > 0)
                        {
                            whereClause += " f_qy like '%" + tbl_ld_cbiao_list.f_qy + "%' and ";
                        }


                        if (tbl_ld_cbiao_list.f_qyid.length > 0)
                        {
                            whereClause += " f_qyid like '%" + tbl_ld_cbiao_list.f_qyid + "%' and ";
                        }


                        if (tbl_ld_cbiao_list.f_pq.length > 0)
                        {
                            whereClause += " f_pq like '%" + tbl_ld_cbiao_list.f_pq + "%' and ";
                        }


                        if (tbl_ld_cbiao_list.f_pqid.length > 0)
                        {
                            whereClause += " f_pqid like '%" + tbl_ld_cbiao_list.f_pqid + "%' and ";
                        }


                        if (tbl_ld_cbiao_list.f_lxtkhh.length > 0)
                        {
                            whereClause += " f_lxtkhh like '%" + tbl_ld_cbiao_list.f_lxtkhh + "%' and ";
                        }


                        if (tbl_ld_cbiao_list.f_pgbh.length > 0)
                        {
                            whereClause += " f_pgbh like '%" + tbl_ld_cbiao_list.f_pgbh + "%' and ";
                        }


                        if (tbl_ld_cbiao_list.f_pgbhid.length > 0)
                        {
                            whereClause += " f_pgbhid like '%" + tbl_ld_cbiao_list.f_pgbhid + "%' and ";
                        }


                        if (tbl_ld_cbiao_list.f_pgr.length > 0)
                        {
                            whereClause += " f_pgr like '%" + tbl_ld_cbiao_list.f_pgr + "%' and ";
                        }


                        if (tbl_ld_cbiao_list.f_pgrid.length > 0)
                        {
                            whereClause += " f_pgrid like '%" + tbl_ld_cbiao_list.f_pgrid + "%' and ";
                        }


                        if (tbl_ld_cbiao_list.f_pgpcmc.length > 0)
                        {
                            whereClause += " f_pgpcmc like '%" + tbl_ld_cbiao_list.f_pgpcmc + "%' and ";
                        }


                        if (tbl_ld_cbiao_list.f_pgsjfrom != '1900-01-01 00:00:00')
                        {
                            whereClause += " f_pgsj >= to_date('" + tbl_ld_cbiao_list.f_pgsjfrom + "','yyyy-MM-dd hh24:mi:ss') and ";
                        }

                        if (tbl_ld_cbiao_list.f_pgsjto != '1900-01-01 00:00:00')
                        {
                            whereClause += " f_pgsj <= to_date('" + tbl_ld_cbiao_list.f_pgsjto + "','yyyy-MM-dd hh24:mi:ss') and ";
                        }


                        if (tbl_ld_cbiao_list.f_jfbh.length > 0)
                        {
                            whereClause += " f_jfbh like '%" + tbl_ld_cbiao_list.f_jfbh + "%' and ";
                        }


                        if (tbl_ld_cbiao_list.f_jfbhid.length > 0)
                        {
                            whereClause += " f_jfbhid like '%" + tbl_ld_cbiao_list.f_jfbhid + "%' and ";
                        }


                        if (tbl_ld_cbiao_list.f_jfsjfrom != '1900-01-01 00:00:00')
                        {
                            whereClause += " f_jfsj >= to_date('" + tbl_ld_cbiao_list.f_jfsjfrom + "','yyyy-MM-dd hh24:mi:ss') and ";
                        }

                        if (tbl_ld_cbiao_list.f_jfsjto != '1900-01-01 00:00:00')
                        {
                            whereClause += " f_jfsj <= to_date('" + tbl_ld_cbiao_list.f_jfsjto + "','yyyy-MM-dd hh24:mi:ss') and ";
                        }


                        if (tbl_ld_cbiao_list.f_bqje.length > 0)
                        {
                            whereClause += " f_bqje like '%" + tbl_ld_cbiao_list.f_bqje + "%' and ";
                        }


                        if (tbl_ld_cbiao_list.f_sbbh.length > 0)
                        {
                            whereClause += " f_sbbh like '%" + tbl_ld_cbiao_list.f_sbbh + "%' and ";
                        }
                        if (tbl_ld_cbiao_list.f_khfz.length > 0)
                        {
                            whereClause += " f_khfz like '%" + tbl_ld_cbiao_list.f_khfz + "%' and ";
                        }
                        if (tbl_ld_cbiao_list.f_khfzid.length > 0)
                        {
                            whereClause += " f_khfzid like '%" + tbl_ld_cbiao_list.f_khfzid + "%' and ";
                        }
                        if (tbl_ld_cbiao_list.f_sf.length > 0)
                        {
                            whereClause += " f_sf like '%" + tbl_ld_cbiao_list.f_sf + "%' and ";
                        }
                        if (tbl_ld_cbiao_list.f_pwf.length > 0)
                        {
                            whereClause += " f_pwf like '%" + tbl_ld_cbiao_list.f_pwf + "%' and ";
                        }

                        if (tbl_ld_cbiao_list.f_sjljsyl.length > 0)
                        {
                            whereClause += " f_sjljsyl like '%" + tbl_ld_cbiao_list.f_sjljsyl + "%' and ";
                        }
                        if (tbl_ld_cbiao_list.f_jmje.length > 0)
                        {
                            whereClause += " f_jmje like '%" + tbl_ld_cbiao_list.f_jmje + "%' and ";
                        }
                        if (tbl_ld_cbiao_list.f_jmbh.length > 0)
                        {
                            whereClause += " f_jmbh like '%" + tbl_ld_cbiao_list.f_jmbh + "%' and ";
                        }
                        if (tbl_ld_cbiao_list.f_jmbhid.length > 0)
                        {
                            whereClause += " f_jmbhid like '%" + tbl_ld_cbiao_list.f_jmbhid + "%' and ";
                        }
                        if (tbl_ld_cbiao_list.f_sfsfts.length > 0)
                        {
                            whereClause += " f_sfsfts like '%" + tbl_ld_cbiao_list.f_sfsfts + "%' and ";
                        }

                        if (tbl_ld_cbiao_list.f_sblx.length > 0)
                        {
                            whereClause += " f_sblx like '%" + tbl_ld_cbiao_list.f_sblx + "%' and ";
                        }


                        if (tbl_ld_cbiao_list.f_yslx.length > 0)
                        {
                            whereClause += " f_yslx like '%" + tbl_ld_cbiao_list.f_yslx + "%' and ";
                        }


                        if (tbl_ld_cbiao_list.f_cbbh.length > 0)
                        {
                            whereClause += " f_cbbh like '%" + tbl_ld_cbiao_list.f_cbbh + "%' and ";
                        }


                        if (tbl_ld_cbiao_list.f_cbmc.length > 0)
                        {
                            whereClause += " f_cbmc like '%" + tbl_ld_cbiao_list.f_cbmc + "%' and ";
                        }


                        if (tbl_ld_cbiao_list.f_cb_cbbh.length > 0)
                        {
                            whereClause += " f_cb_cbbh like '%" + tbl_ld_cbiao_list.f_cb_cbbh + "%' and ";
                        }


                        if (tbl_ld_cbiao_list.f_yhbh.length > 0)
                        {
                            whereClause += " f_yhbh like '%" + tbl_ld_cbiao_list.f_yhbh + "%' and ";
                        }


                        if (tbl_ld_cbiao_list.f_yhbhid.length > 0)
                        {
                            whereClause += " f_yhbhid like '%" + tbl_ld_cbiao_list.f_yhbhid + "%' and ";
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
            $('#btn_command_clearselect_tbl_ld_cbiao_list').addClass('hidden');
        }
        else
        {
            $('#btn_command_clearselect_tbl_ld_cbiao_list').removeClass('hidden');
            var allcount = that._pr_gridselectids.split('^').length;
            var currentcount = $('#table_grid_tbl_ld_cbiao_list').bootstrapTable('getSelections').length;
            $('#btn_command_clearselect_tbl_ld_cbiao_list .cc-badge-p').html(currentcount + '/' + allcount);
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
            //根据页面情况设置Grid的高度
            var gridHeight = 350;
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
                //                    switch (that._pr_pgztid)
                //                    {
                //                        case "0":
                //                            if (('^' + that._pr_gridselectids + '^').indexOf('^' + row.sys_id + '^') > -1)
                //                            {
                //                                return {
                //                                    disabled: false,
                //                                    checked: true
                //                                }
                //                            }
                //                            break;
                //                        case "1":
                //                            return {
                //                                disabled: true
                //                            }
                //                            break;
                //                        case "9":
                //                            return {
                //                                disabled: true
                //                            }
                //                            break;
                //                    }


                //                }
                //                break;
                //                //制度模式
                //            case "2":
                //                {
                //                    if (('^' + that._pr_gridselectids + '^').indexOf('^' + row.sys_id + '^') > -1)
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
                    visible: false,
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
                    title: '用水类别id',
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
				    field: 'f_cb_cbbh',
				    title: '抄表编号',
				    "class": '',
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
                    field: 'f_sf',
                    title: '水费',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;
                        return resultStr;
                    }
                },
                {
                    field: 'f_pwf',
                    title: '污水处理费',
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
                },

                {
                    field: 'f_jmbh',
                    title: '减免编号',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;
                        return resultStr;
                    }
                },
                {
                    field: 'f_jmbhid',
                    title: '减免编号id',
                    "class": 'hidden',
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
                    "class": '',
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
                    title: '抄表员',
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
                         "class": '',
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
                    title: '用水类别',
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
                }
                //,

                //{
                //    field: '', title: '操作',
                //    "class": 'hidden',
                //    align: 'center', valign: 'middle', sortable: false, clickToSelect: false,
                //    formatter: function (value, row, index)
                //    {
                //        switch (that._pr_listtype)
                //        {
                //            case "1":
                //                return [
                //                '<a class="edit ml10" href="javascript:void(0)" title="编辑">',
                //                '<i class="glyphicon glyphicon-edit"></i>',
                //                '</a>'
                //                ].join('');
                //                break;
                //            case "2":
                //                return [
                //                '<a class="view ml10" href="javascript:void(0)" title="浏览">',
                //                '<i class="glyphicon glyphicon-eye-open"></i>',
                //                '</a>'
                //                ].join('');
                //                break;
                //        }
                //    },
                //    events: {
                //        'click .view': function (e, value, row, index)
                //        {
                //            transToDetailPage(row.sys_id, '2');

                //        },
                //        'click .edit': function (e, value, row, index)
                //        {
                //            transToDetailPage(row.sys_id, '1');
                //        }
                //    }
                //}
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
                    var rows = $('#table_grid_tbl_ld_cbiao_list').bootstrapTable('getSelections');
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
                    var rows = $('#table_grid_tbl_ld_cbiao_list').bootstrapTable('getData');
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
        //当前被选中的行的ID集合的字符串//1^2^6
        _pr_gridselectids: '',
        //当前在第几页
        _pr_gridpageindex: 1,
        //当前的查询模式：1：简单查询；2：高级查询
        _pr_searchtype: '1',
        //查询内容type1:简单查询内容；type2：高级查询内容（JSON）
        _pr_searchcontent: null,
        _pr_pgid: '',//评估ID
        _pr_pgztid: '0',//评估状态id
        _pr_count: '0',//数据个数


        _pr_pgsj: '',//评估时间
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

                                                _validateMessage = new validateMessage('btn_search_modal_search_tbl_ld_cbiao_list');

                                                //_ladda_btn_command_new = Ladda.create('btn_command_new_tbl_ld_cbiao_list');
                                                //_ladda_btn_command_delete = Ladda.create('btn_command_delete_tbl_ld_cbiao_list');
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

                if (whereClause != '')
                {
                    whereClause += " and ";
                }
                //switch (that._pr_pgztid)
                //{
                //    case "0":
                //        //whereClause += " f_ztid = '0' ";
                //        whereClause += " f_pgbhid = '" + that._pr_pgid + "' ";
                //        whereClause += " and f_khbh is not null ";
                //        break;
                //    case "1":
                //        whereClause += " f_pgbhid = '" + that._pr_pgid + "' ";
                //        whereClause += " and f_khbh is not null ";
                //        break;
                //    case "9":
                //        break;
                //}
                whereClause += " f_pgbhid = '" + that._pr_pgid + "' ";
                whereClause += " and f_khbh is not null ";



                var orderByString = ' sys_id desc';
                var columnsString = 'f_value1^f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^f_khbhid^f_cbyid^f_cbyphoto^f_sbbhid^f_khbh^f_khfz^f_khfzid^f_sf^f_pwf^f_sjljsyl^f_jmje^f_jmbh^f_jmbhid^f_sfsfts^f_sblxid^f_yslxid^f_cbbhid^f_khbh^f_sqzm^f_bqzm^f_bqsl^f_sqsl^f_qsqpjsl^f_qlqpjsl^f_cbyname^f_cbsj^f_bk^f_bkid^f_zt^f_ztid^f_ly^f_lyid^f_bz^f_yhm^f_jfm^f_dh^f_dz^f_dy^f_dyid^f_sc^f_scid^f_qy^f_qyid^f_pq^f_pqid^f_lxtkhh^f_pgbh^f_pgbhid^f_pgr^f_pgrid^f_pgpcmc^f_pgsj^f_jfbh^f_jfbhid^f_jfsj^f_bqje^f_sbbh^f_sblx^f_yslx^f_cbbh^f_cbmc^f_cb_cbbh^f_cb_cbbhid^f_yhbh^f_yhbhid^sys_id';

                var data = {
                    whereString: whereClause,
                    cxzxsjString: that._pr_pgsj,                
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

                        that._pr_cb_count = messageJson.total;
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





