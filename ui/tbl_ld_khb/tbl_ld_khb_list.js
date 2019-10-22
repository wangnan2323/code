


var _clientInf = '{userid="",appcode="54",appname="",userip="",usermac="",username=""}';
var _blockMessage = null;
var _alertMessage = null;
var _resultMessage = null;
var _confirmMessage = null;

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
    _servicecommonUrl = '//127.0.0.1/sara.dd.ldsw/service/service_common.asmx/',
    //Grid控件的分页参数，设置为空即可实现不分页
    _pageSize = '20',
        _isPage = true,
    //Code数据存储容器
    _baseCodeHashMap = null,
    //校验结果容器
    _validateMessage = null,
    //按钮工具
    _ladda_btn_command_new = null,
    _ladda_btn_command_delete = null,
    _ladda_btn_command_exp = null,
        _ladda_btn_command_sort = null,
    _ladda_btn_command_showcolunm = null,
    //查询sql语句
    _whereClauseString = '',
    _sblxid = '',
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
            that._pr_sblxids = requestQuery('sblxids');
            that._pr_ztids = requestQuery('ztids');
            that._pr_appcode = requestQuery('appcode');
            that._pr_gridselectids = requestQuery('gridselectids');
            that._pr_gridpageindex = requestQuery('gridpageIndex');
            //that._pr_searchtype = requestQuery('searchtype');
            //tbl_ld_kh_search_part_Obj._pr_searchtype = requestQuery('searchtype');
            //that._pr_searchcontent = requestQuery('searchcontent');
            //tbl_ld_kh_search_part_Obj._pr_searchcontent = requestQuery('searchcontent');
            _clientInf = '{userid:"' + basePageObj._userInfoJson.sys_userid + '",appcode:"' + that._pr_appcode + '",appname:"",userip:"' + basePageObj._userInfoJson.ip + '",usermac:"' + basePageObj._userInfoJson.mac + '",username:"' + basePageObj._userInfoJson.sys_username + '"}';

            if (that._pr_gridpageindex == null || that._pr_gridpageindex == '' || that._pr_gridpageindex == 'null')
            {
                that._pr_gridpageindex = 1;
            }
            else
            {
                that._pr_gridpageindex = Number(that._pr_gridpageindex);
            }

            //if (that._pr_searchcontent == null || that._pr_searchcontent == '' || that._pr_searchcontent == 'null') {
            //    that._pr_searchcontent = new Object();
            //    that._pr_searchcontent = (new Function("", "return " + that._pr_searchcontent))();
            //}
            //else {
            //    that._pr_searchcontent = (new Function("", "return " + that._pr_searchcontent))();
            //}

            //if (that._pr_searchtype == null || that._pr_searchtype == '' || that._pr_searchtype == 'null') {
            //    that._pr_searchtype = '1';
            //}

            //switch (that._pr_searchtype) {
            //    case "1":
            //        $('#btn_command_search_tbl_ld_khb_list').html('简单查询');
            //        $('#txt_command_search_tbl_ld_khb_list').removeAttr("disabled");

            //        break;
            //    case "2":
            //        $('#btn_command_search_tbl_ld_khb_list').html('高级查询');
            //        $('#txt_command_search_tbl_ld_khb_list').attr("disabled", true);
            //        break;
            //}

            if (that._pr_sblxids == null || that._pr_sblxids == '' || that._pr_sblxids == 'null')
            {
                that._pr_sblxids = '';
            }
            if (that._pr_ztids == null || that._pr_ztids == '' || that._pr_ztids == 'null')
            {
                that._pr_ztids = '';
            }

            if (that._pr_listtype == null || that._pr_listtype == '' || that._pr_listtype == 'null')
            {
                _blockMessage.show('listtype参数接收失败...', 'fail');
            }
            else
            {
                //嵌入查询part
                $('#div_container_tbl_ld_kh_searchpart').load('../tbl_ld_khb/tbl_ld_kh_searchcontrol_part.html', null, function ()
                {
                    $('#div_container_tbl_ld_kh_searchmodal').load('../tbl_ld_khb/tbl_ld_kh_searchmodal_part.html', null, function ()
                    {


                        tbl_ld_kh_search_part_Obj.init({
                            success: function ()
                            {

                                tbl_ld_kh_search_part_Obj.doSearch = function (whereClause)
                                {
                                    
                                    that._pr_gridpageindex = '1';
                                    that._pr_gridselectids = '';
                                    _whereClauseString = whereClause;
                                    that.bindGrid();
                                };
                                tbl_ld_kh_search_part_Obj.getWhereClause({
                                    success: function (whereClause)
                                    {
                                        _whereClauseString = whereClause;
                                        callBackFunction.success();
                                    },
                                    fail: function (message)
                                    {
                                        callBackFunction.fail(message);
                                    }
                                });
                            }
                        });

                    });
                });
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
                $('#btn_command_delete_tbl_ld_khb_list').addClass('hidden');
                $('#btn_command_new_tbl_ld_khb_list').addClass('hidden');
            }
            else
            {
                $('#btn_command_delete_tbl_ld_khb_list').removeClass('hidden');
                $('#btn_command_new_tbl_ld_khb_list').removeClass('hidden');
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
        var url = '../tbl_ld_khb/tbl_ld_khb_detail.html';
        url += '?uid=' + basePageObj._userInfoJson.sys_userid;
        url += '&sys_id=' + id;
        url += '&pagetype=' + pagetype;
        url += '&appcode=' + that._pr_appcode;
        url += '&fromurl=../tbl_ld_khb/tbl_ld_khb_list.html';
        url += '&fromurlparam={';
        url += '"appcode":"' + that._pr_appcode + '",';
        url += '"listtype":"' + that._pr_listtype + '",';
        url += '"ztids":"' + that._pr_ztids + '",';
        url += '"sblxids":"' + that._pr_sblxids + '",';
        url += '"gridselectids":"' + that._pr_gridselectids + '",';
        url += '"gridpageindex":"' + that._pr_gridpageindex + '",';
        url += '"searchtype":"' + tbl_ld_kh_search_part_Obj._pr_searchtype + '",';
        url += '"searchcontent":' + JSON.stringify(tbl_ld_kh_search_part_Obj._pr_searchcontent) + '';
        url += '}';
        commonObj.changeUrl(url, 'right-show');
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
        var codeServiceId = '0524^';
        codeServiceId += "0556^";
        codeServiceId += "0555^";
        codeServiceId = codeServiceId.trimEnd('^');
        commonObj.getCodeServiceJson(codeServiceId, {
            success: function (resultArray)
            {
                try
                {
                    _baseCodeHashMap = new hashMap();
                    var codenull = [];
                    var px = [{ id: 'desc', text: '倒序' }, { id: 'asc', text: '正序' }];
                    _baseCodeHashMap.put('codeservice_0513', codenull);
                    _baseCodeHashMap.put('codeservice_0514', codenull);
                    _baseCodeHashMap.put('codeservice_0515', codenull);
                    _baseCodeHashMap.put('codeservice_0556', resultArray['0556']);
                    _baseCodeHashMap.put('codeservice_0555', resultArray['0555']);
                    _baseCodeHashMap.put('codeservice_0524', resultArray['0524']);
                    _baseCodeHashMap.put('codeservice_0592', resultArray['0592']);
                    var columnsArray = [
 { "id": "f_khbh", "text": "客户编号" },
  { "id": "f_value1", "text": "操作类型" },
 { "id": "f_ztkhh", "text": "旧系统客户号" },
 { "id": "f_khfz", "text": "客户分组" },
 { "id": "f_ycje", "text": "绿化表押金" },
 { "id": "f_yslx", "text": "用水类型" },
 { "id": "f_tbbh", "text": "套表编号" },
 { "id": "f_sfjlbjf", "text": "是否计量不计费" },
 { "id": "f_zt", "text": "状态" },
 { "id": "f_bz", "text": "备注" },
 { "id": "f_cbbh", "text": "抄本编号" },
 { "id": "f_cbxh", "text": "抄本序号" },
 { "id": "f_cbyxm", "text": "抄表员姓名" },
 { "id": "f_cbzq", "text": "抄表周期" },
 { "id": "f_cbmc", "text": "抄本名称" },
 { "id": "f_yhbh", "text": "用户编号" },
 { "id": "f_jfm", "text": "缴费名" },
 { "id": "f_yhfz", "text": "用户分组" },
 { "id": "f_dz", "text": "地址" },
 { "id": "f_sbdz", "text": "水表地址" },
 { "id": "f_dh", "text": "电话" },
 { "id": "f_dy", "text": "地域" },
 { "id": "f_sc", "text": "水厂" },
 { "id": "f_qy", "text": "区域" },
 { "id": "f_pq", "text": "片区" },
 { "id": "f_tsyxzh", "text": "托收银行账号" },
 { "id": "f_hth", "text": "合同号" },
 { "id": "f_sfzh", "text": "身份证号" },
 { "id": "f_khrq", "text": "开户日期" },
 { "id": "f_sbbh", "text": "水表编号" },
 { "id": "f_bqzm", "text": "本期止码" },
 { "id": "f_sqzm", "text": "上期止码" },
 { "id": "f_bqsl", "text": "本期水量" },
 { "id": "f_sqsl", "text": "上期水量" },
 { "id": "f_qsqpjsl", "text": "前三期平均水量" },
 { "id": "f_qlqpjsl", "text": "前六期平均水量" },
 { "id": "f_ljgl", "text": "累积购量" },
 { "id": "f_lxth", "text": "老系统号" },
 { "id": "f_sblx", "text": "水表类型" },
 { "id": "f_jllx", "text": "计量类型" },
 { "id": "f_tssbbh", "text": "停水水表编号" },
 { "id": "f_ztsbh", "text": "旧系统水表号" },
 { "id": "f_rs", "text": "人数" },
 { "id": "f_sbkj", "text": "水表口径" },
 { "id": "f_sbfz", "text": "水表分组" },
 { "id": "f_ztyhh", "text": "旧系统用户号" },
 { "id": "f_yhm", "text": "用户名" },
 { "id": "f_zhcbrq", "text": "最后抄表日期" },
 { "id": "f_ljqf", "text": "累计欠费" },
 { "id": "f_tjjzpwf", "text": "调价结转排污费" },
 { "id": "f_tjjzsf", "text": "调价结转水费" },
 { "id": "f_nljgl", "text": "年累计购量" },
 { "id": "f_sqysl", "text": "申请用水量" },
 { "id": "f_jhysl", "text": "计划用水量" },
 { "id": "f_ickljgl", "text": "ic卡累计购量" },
 { "id": "f_qfqm", "text": "欠费起码" }
                    ];
                    _baseCodeHashMap.put('codeservice_0814', columnsArray);
                    _baseCodeHashMap.put('codeservice_px', px);
                    var sqlJson = {
                        "tbl_ldbm_dycq": "select sys_id as id, f_mc as text ,sys_orderid as nodeid from tbl_ldbm_dycq where sys_delflag='0' and f_ztid='0'and length(sys_orderid)=4 order by sys_orderid",
                        "tbl_ld_cben": 'select sys_id as id,f_cbbh as text,f_cbymc,f_cbyid,f_cbzq,f_cbmc from tbl_ld_cben order by f_cbbh asc',
                        "tbl_ldbm_khfz": "select sys_id as id,f_fzmc as text,decode(f_ztid,'0','false','true') as disabled from tbl_ldbm_khfz where sys_delflag='0'  order by sys_id",
                        "tbl_ldbm_yhfz": "select sys_id as id,f_fzmc as text,decode(f_ztid,'0','false','true') as disabled from tbl_ldbm_yhfz where sys_delflag='0' order by sys_id",
                        "tbl_ldbm_sbfz": "select sys_id as id, f_fzmc as text,decode(f_ztid,'0','false','true') as disabled from tbl_ldbm_sbfz where sys_delflag='0'  order by sys_id",
                    }
                    commonObj.querySqls(sqlJson, {
                        success: function (messageJson)
                        {
                            $.each(messageJson["tbl_ldbm_khfz"], function (i, u)
                            {
                                if (messageJson["tbl_ldbm_khfz"][i]["disabled"] == "true")
                                {
                                    messageJson["tbl_ldbm_khfz"][i]["disabled"] = true;
                                }
                                else
                                {
                                    messageJson["tbl_ldbm_khfz"][i]["disabled"] = false;
                                }
                            });
                            $.each(messageJson["tbl_ldbm_yhfz"], function (i, u)
                            {
                                if (messageJson["tbl_ldbm_yhfz"][i]["disabled"] == "true")
                                {
                                    messageJson["tbl_ldbm_yhfz"][i]["disabled"] = true;
                                }
                                else
                                {
                                    messageJson["tbl_ldbm_yhfz"][i]["disabled"] = false;
                                }
                            });
                            _baseCodeHashMap.put('codeservice_0512', messageJson["tbl_ldbm_dycq"]);
                            _baseCodeHashMap.put('codeservice_cben', messageJson["tbl_ld_cben"]);
                            _baseCodeHashMap.put('codeservice_khfz', messageJson["tbl_ldbm_khfz"]);
                            _baseCodeHashMap.put('codeservice_yhfz', messageJson["tbl_ldbm_yhfz"]);
                            _baseCodeHashMap.put('codeservice_sbfz', messageJson["tbl_ldbm_sbfz"]);
                            callBackFunction.success();
                        },
                        fail: function (message)
                        {
                        }
                    })
                }
                catch (ex)
                {
                    _blockMessage.show('initBaseCode执行失败。<br/>' + ex.message, 'fail');
                }
            }
        });


    },





    //---------------------------------------------------------------------------------
    // ---------------------------------grid------------------------------------------
    //---------------------------------------------------------------------------------


    /* 
    *  
    *  方法:gridSelectedChange
    *  参数:
    *  根据_pr_gridselectids的情况，设置清空按钮
    */
    gridSelectedChange = function ()
    {
        //;
        if (that._pr_gridselectids == '')
        {
            $('#btn_command_clearselect_tbl_ld_khb_list').addClass('hidden');
        }
        else
        {
            $('#btn_command_clearselect_tbl_ld_khb_list').removeClass('hidden');

            var allcount = that._pr_gridselectids.split('^').length;
            var currentcount = $('#table_grid_tbl_ld_khb_list').bootstrapTable('getSelections').length;
            $('#btn_command_clearselect_tbl_ld_khb_list .cc-badge-p').html(currentcount + '/' + allcount);

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
                    field: "_checkbox", checkbox: true,
                    formatter: function (value, row, index)
                    {
                        //根据gridselectids给Grid设置选中项
                        switch (that._pr_listtype)
                        {
                            //编辑模式
                            case "1":
                                {
                                    if (('^' + that._pr_gridselectids + '^').indexOf('^' + row.sys_id + '^') > -1)
                                    {
                                        return {
                                            disabled: false,
                                            checked: true
                                        }
                                    }
                                    return value;
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
                    align: 'center',
                    "class": 'hidden',
                    valign: 'middle',
                    visible: true,
                    sortable: false,



                }
            ];

            var columnHashMap = new hashMap();

            columnHashMap.put('f_value1', {
                field: 'f_value1',
                title: '<div style="width: 170px;">操作类型</div>',
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultHtml = '';



                    var value1 = row.f_value1
                    if (value1 != "")
                    {
                        var czlx = value1.split('_');

                        resultHtml += "<strong>操作类型：</strong>&nbsp;&nbsp;" + czlx[0] + "</br>";
                        resultHtml += "<strong>操作人：</strong>&nbsp;&nbsp;" + czlx[1] + "</br>";

                        //resultHtml += "<strong>操作类型id：</strong>&nbsp;&nbsp;" + row.f_value2 + "</br>";

                    }

                    return resultHtml;
                }
            });

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

            columnHashMap.put('f_khfz', {
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
            });
            columnHashMap.put('f_ycje', {
                field: 'f_ycje',
                title: "绿化表押金",
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
            });
            columnHashMap.put('f_yslx', {
                field: 'f_yslx',
                title: '用水类型',
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
            });
            columnHashMap.put('f_tbbh', {
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
            });
            columnHashMap.put('f_sfjlbjf', {
                field: 'f_sfjlbjf',
                title: "计量不计费",
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

                    "";
                    return resultStr;
                }
            });
            columnHashMap.put('f_cbbh', {
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
            });
            columnHashMap.put('f_cbxh', {
                field: 'f_cbxh',
                title: '抄本序号',
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
            });
            columnHashMap.put('f_cbyxm', {
                field: 'f_cbyxm',
                title: "抄表员姓名",
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
            });
            columnHashMap.put('f_zhcbrq', {
                field: 'f_zhcbrq',
                title: "最后抄表日期",
                "class": 'hidden',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;

                    return resultStr;
                }
            });
            columnHashMap.put('f_cbzq', {
                field: 'f_cbzq',
                title: "抄表周期",
                "class": 'hidden',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;

                    return resultStr;
                }
            });
            columnHashMap.put('f_cbmc', {
                field: 'f_cbmc',
                title: "抄本名称",
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
            });
            columnHashMap.put('f_yhm', {
                field: 'f_yhm',
                title: "用户名",
                "class": '',
                align: 'left', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;



                    return resultStr;
                }
            });
            columnHashMap.put('f_yhbh', {
                field: 'f_yhbh',
                title: "用户编号",
                "class": 'hidden',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;

                    return resultStr;
                }
            });
            columnHashMap.put('f_ztkhh', {
                field: 'f_ztkhh',
                title: "旧客户号",
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
            });
            columnHashMap.put('f_ztyhh', {
                field: 'f_ztyhh',
                title: "旧用户号",
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
            });

            columnHashMap.put('f_jfm', {
                field: 'f_jfm',
                title: "缴费名",
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
            });

            columnHashMap.put('f_yhfz', {
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
            });

            columnHashMap.put('f_dz', {
                field: 'f_dz',
                title: "地址",
                "class": '',
                align: 'left', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;

                    return resultStr;
                }
            });

            columnHashMap.put('f_sbdz', {
                field: 'f_sbdz',
                title: "水表地址",
                "class": '',
                align: 'left', valign: 'middle', sortable: true, clickToSelect: true,
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

            columnHashMap.put('f_tjjzpwf', {
                field: 'f_tjjzpwf',
                title: "调价结转排污费",
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
            });
            columnHashMap.put('f_tjjzsf', {
                field: 'f_tjjzsf',
                title: "调价结转水费",
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
            });

            columnHashMap.put('f_nljgl', {
                field: 'f_nljgl',
                title: "年累计购量",
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
            });
            columnHashMap.put('f_ljqf', {
                field: 'f_ljqf',
                title: "累计欠费",
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
            });

            columnHashMap.put('f_dy', {
                field: 'f_dy',
                title: "地域",
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
            });
            columnHashMap.put('f_sc', {
                field: 'f_sc',
                title: "水厂",
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
            });
            columnHashMap.put('f_qy', {
                field: 'f_qy',
                title: "区域",
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
            });
            columnHashMap.put('f_pq', {
                field: 'f_pq',
                title: "片区",
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
            });
            columnHashMap.put('f_tsyxzh', {
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
            });

            columnHashMap.put('f_hth', {
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
            });

            columnHashMap.put('f_sfzh', {
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
            });


            columnHashMap.put('f_khrq', {
                field: 'f_khrq',
                title: '开户日期',
                "class": 'hidden',
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
                "class": 'hidden',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;




                    return resultStr;
                }
            });
            columnHashMap.put('f_bqzm', {
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
            });


            columnHashMap.put('f_sqzm', {
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
            });


            columnHashMap.put('f_bqsl', {
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
            });


            columnHashMap.put('f_sqsl', {
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
            });


            columnHashMap.put('f_qsqpjsl', {
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
            });


            columnHashMap.put('f_qlqpjsl', {
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
            });

            columnHashMap.put('f_ljgl', {
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
            });


            columnHashMap.put('f_lxth', {
                field: 'f_lxth',
                title: "老系统号",
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
            });
            columnHashMap.put('f_sblx', {
                field: 'f_sblx',
                title: "水表类型",
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
            });

            columnHashMap.put('f_jllx', {
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
            });

            columnHashMap.put('f_tssbbh', {
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
            });

            columnHashMap.put('f_ztsbh', {
                field: 'f_ztsbh',
                title: "旧水表号",
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
            });
            columnHashMap.put('f_rs', {
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
            });
            columnHashMap.put('f_sqysl', {
                field: 'f_sqysl',
                title: '申请用水量',
                "class": 'hidden',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;
                    return resultStr;
                }
            });
            columnHashMap.put('f_jhysl', {
                field: 'f_jhysl',
                title: '计划用水量',
                "class": 'hidden',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;
                    return resultStr;
                }
            });
            columnHashMap.put('f_ickljgl', {
                field: 'f_ickljgl',
                title: 'IC卡累计购量',
                "class": 'hidden',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;
                    return resultStr;
                }
            });
            columnHashMap.put('f_sbkj', {
                field: 'f_sbkj',
                title: '水表口径',
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
            });

            columnHashMap.put('f_sbfz', {
                field: 'f_sbfz',
                title: '水表分组',
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
            });

            columnHashMap.put('f_zfbwybz', {
                field: 'f_zfbwybz',
                title: '支付宝唯一标志',
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
            });
            columnHashMap.put('f_gdyhwybz', {
                field: 'f_gdyhwybz',
                title: '光大银行唯一标志',
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
            });
            columnHashMap.put('f_wxwybz', {
                field: 'f_wxwybz',
                title: '微信唯一标志',
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
            });
            columnHashMap.put('f_zt', {
                field: 'f_zt',
                title: "状态",
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
            });

            columnHashMap.put('f_bz', {
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
            });

            columnHashMap.put('f_qfqm', {
                field: 'f_qfqm',
                title: '欠费起码',
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
            });

            var column = getCookie("tbl_ld_khb_list_column");

            if (column != null && column != 'undefined' && column != "")
            {
                var ss = column.split(',');
                $.each(ss, function (i, u)
                {
                    var columnObj = columnHashMap.get(u.toLowerCase());
                    if (columnObj != undefined)
                    {
                        columnObj.class = '';
                        columnsarray.push(columnObj);
                    }

                });
            }
            else
            {

                var columnObj = columnHashMap.get('f_khbh');
                columnObj.class = '';
                columnsarray.push(columnObj);


                columnObj = columnHashMap.get('f_ycje');
                columnObj.class = '';
                columnsarray.push(columnObj);

                columnObj = columnHashMap.get('f_yslx');
                columnObj.class = '';
                columnsarray.push(columnObj);

                columnObj = columnHashMap.get('f_sblx');
                columnObj.class = '';
                columnsarray.push(columnObj);

                columnObj = columnHashMap.get('f_cbmc');
                columnObj.class = '';
                columnsarray.push(columnObj);

                columnObj = columnHashMap.get('f_yhm');
                columnObj.class = '';
                columnsarray.push(columnObj);

                columnObj = columnHashMap.get('f_dz');
                columnObj.class = '';
                columnsarray.push(columnObj);

                columnObj = columnHashMap.get('f_sbdz');
                columnObj.class = '';
                columnsarray.push(columnObj);

                columnObj = columnHashMap.get('f_dh');
                columnObj.class = '';
                columnsarray.push(columnObj);

                columnObj = columnHashMap.get('f_nljgl');
                columnObj.class = '';
                columnsarray.push(columnObj);

                columnObj = columnHashMap.get('f_ljqf');
                columnObj.class = '';
                columnsarray.push(columnObj);


                columnObj = columnHashMap.get('f_qy');
                columnObj.class = '';
                columnsarray.push(columnObj);

                columnObj = columnHashMap.get('f_pq');
                columnObj.class = '';
                columnsarray.push(columnObj);



                columnObj = columnHashMap.get('f_zt');
                columnObj.class = '';
                columnsarray.push(columnObj);

                var columnObj = columnHashMap.get('f_value1');
                columnObj.class = '';
                columnsarray.push(columnObj);
                columnObj = columnHashMap.get('f_bz');
                columnObj.class = '';
                columnsarray.push(columnObj);


            }
            columnsarray.push({
                field: '', title: '开关阀',
                align: 'center', valign: 'middle', sortable: false, clickToSelect: false,
                formatter: function (value, row, index)
                {
                    if (row.f_ljqf != null && row.f_ljqf != "" && row.f_sblxid == "32")
                    {
                        return [
                            '<a class="rw ml10" href="javascript:void(0)" title="开关阀">',
                            '<i class="glyphicon glyphicon-wrench"></i>',
                            '</a>'
                        ].join('');
                    }


                },
                events: {
                    'click .rw': function (e, value, row, index)
                    {
                        var url = '../tbl_ld_rwb/tbl_ld_rwb_list.html';
                        url += '?khbh=' + row.f_khbh;


                        url += '&listtype=' + that._pr_listtype + '&uid=' + basePageObj._userInfoJson.sys_userid;


                        commonObj.changeUrl(url, 'right-show');
                    },

                }
                //field: '', title: "操作",
                //align: 'center', valign: 'middle', sortable: false, clickToSelect: false,
                //formatter: function (value, row, index)
                //{
                //    switch (that._pr_listtype)
                //    {
                //        case "1":
                //            return [
                //            '<a class="edit ml10" href=" " title="编辑">',
                //            '<i class="glyphicon glyphicon-edit"></i>',
                //            '</ a>'
                //            ].join('');
                //            break;
                //        case "2":
                //            return [
                //            '<a class="view ml10" href="javascript:void(0)" title="浏览">',
                //            '<i class="glyphicon glyphicon-eye-open"></i>',
                //            '</ a>'
                //            ].join('');
                //            break;
                //    }
                //},
                //events: {
                //    'click .view': function (e, value, row, index)
                //    {
                //        transToDetailPage(row.sys_id, '2');
                //    },
                //    'click .edit': function (e, value, row, index)
                //    {
                //        transToDetailPage(row.sys_id, '1');
                //    }
                //}
            });
            columnsarray.push({
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
                //field: '', title: "操作",
                //align: 'center', valign: 'middle', sortable: false, clickToSelect: false,
                //formatter: function (value, row, index)
                //{
                //    switch (that._pr_listtype)
                //    {
                //        case "1":
                //            return [
                //            '<a class="edit ml10" href=" " title="编辑">',
                //            '<i class="glyphicon glyphicon-edit"></i>',
                //            '</ a>'
                //            ].join('');
                //            break;
                //        case "2":
                //            return [
                //            '<a class="view ml10" href="javascript:void(0)" title="浏览">',
                //            '<i class="glyphicon glyphicon-eye-open"></i>',
                //            '</ a>'
                //            ].join('');
                //            break;
                //    }
                //},
                //events: {
                //    'click .view': function (e, value, row, index)
                //    {
                //        transToDetailPage(row.sys_id, '2');
                //    },
                //    'click .edit': function (e, value, row, index)
                //    {
                //        transToDetailPage(row.sys_id, '1');
                //    }
                //}
            });

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
                idField: 'sys_id',
                sidePagination: 'webserver',
                columns: columnsarray,
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


        /* 
        *  
        *  方法:addDetailData
        *  参数: callbackFunction
        *  新建数据
        */
    addDetailData = function (khbh, callBackFunction)
    {
        var d = new Date();

        var firstDate = new Date();
        firstDate.setDate(1); //第一天
        var endDate = new Date(firstDate);
        endDate.setMonth(firstDate.getMonth());
        endDate.setDate(0);
        var json = {


            f_value1: '',


            f_value2: '',


            f_value3: '',


            f_value4: '',


            f_value5: '',


            f_value6: '',


            f_value7: '',


            f_value8: '',


            f_value9: '',


            f_value10: '',


            f_khbh: khbh,


            f_ztkhh: '',

            f_khfzid: '',


            f_ycje: '',

            f_yslxid: '',


            f_tbbh: '',

            f_sfjlbjf: 'true',

            f_ztid: '0',


            f_bz: '',

            f_cbbhid: '',


            f_cbxh: khbh,


            f_cbyxm: '',


            f_cbyid: '',


            f_cbzq: '',


            f_cbmc: '',

            f_yhbh: '',


            f_yhbhid: '',


            f_jfm: '',


            f_yhfz: '',


            f_yhfzid: '',


            f_dz: '',

            f_sbdz: '',

            f_dh: '',

            f_ljqf: '0',

            f_tjjzpwf: '0',
            f_tjjzsf: '0',
            f_tssbbhid: '',
            f_nljgl: '0',

            f_dy: '',


            f_dyid: '',


            f_sc: '',


            f_scid: '',


            f_qy: '',


            f_qyid: '',


            f_pq: '',


            f_pqid: '',


            f_tsyxzh: '',


            f_hth: '',


            f_sfzh: '',


            f_khrq: '',

            f_sbbh: '',


            f_sbbhid: '',


            f_bqzm: '0',


            f_sqzm: '',


            f_bqsl: '',


            f_sqsl: '',


            f_qsqpjsl: '',


            f_qlqpjsl: '',


            f_ljgl: '',


            f_lxth: '',


            f_sblx: '',


            f_sblxid: '',


            f_jllx: '',


            f_jllxid: '',

            f_tssbbh: '',

            f_ztsbh: '',

            f_rs: '',

            f_sbkj: '',

            f_sbkjid: '',

            f_sbfz: '',

            f_sbfzid: '',

            f_ztyhh: '',

            f_wxwybz: '',

            f_zfbwybz: '',

            f_gdyhwybz: '',

            f_yhm: '',

            f_sqysl: '0',
            f_jhysl: '0',
            f_ickljgl: '0',

            f_zhcbrq: endDate.Format('yyyy-MM-dd'),

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
                callBackFunction.success(result);
            },
            fail: function (message)
            {
                callBackFunction.fail('Add:' + message);
            }
        });
    },
    /* 
    *  
    *  方法:initGrid
    *  参数:callbackFunction
    *  初始化
    */
    initDetailControl = function (callBackFunction)
    {
        try
        {


            var codeservice_sblx = _baseCodeHashMap.get('codeservice_0524');
            $.each(codeservice_sblx, function (i, u)
            {
                switch (codeservice_sblx[i]["id"])
                {
                    case "7":
                    case "16":
                    case "12":
                    case "13":
                    case "99":
                    case "19":
                    case "100":
                        codeservice_sblx[i]["disabled"] = false;
                        break;
                    default:
                        codeservice_sblx[i]["disabled"] = true;
                        break;
                }
            });
            controlObj.singledropdownlistinit('detial_f_fsblx_tbl_ld_khb_list', codeservice_sblx);
            //模态窗口
            $('#div_modal_tbl_ld_khb_list').modal({
                keyboard: false,
                backdrop: 'static',
                show: false
            });
            callBackFunction.success();
        }
        catch (ex)
        {
            _blockMessage.show('initDetailControl执行失败。<br/>' + ex.message, 'fail');
        }
    },
     //排序弹出页
    initDetailControlSort = function (callBackFunction)
    {
        try
        {

            var codeservice_0814 = _baseCodeHashMap.get('codeservice_0814');
            var codeservice_px = _baseCodeHashMap.get('codeservice_px');
            controlObj.singledropdownlistinit('model_dropdown_f_px0_tbl_ld_khb_sortlist', codeservice_0814);
            controlObj.singledropdownlistinit('model_dropdown_f_px1_tbl_ld_khb_sortlist', codeservice_0814);
            controlObj.singledropdownlistinit('model_dropdown_f_px2_tbl_ld_khb_sortlist', codeservice_0814);
            controlObj.singledropdownlistinit('model_dropdown_f_pxfs0_tbl_ld_khb_sortlist', codeservice_px);
            controlObj.singledropdownlistinit('model_dropdown_f_pxfs1_tbl_ld_khb_sortlist', codeservice_px);
            controlObj.singledropdownlistinit('model_dropdown_f_pxfs2_tbl_ld_khb_sortlist', codeservice_px);
            //模态窗口
            $('#div_modal_tbl_ld_khb_sortlist').modal({
                keyboard: false,
                backdrop: 'static',
                show: false
            });
            callBackFunction.success();
        }
        catch (ex)
        {
            _blockMessage.show('initDetailControlsort执行失败。<br/>' + ex.message, 'fail');
        }
    },

    //列显示弹出页
    initDetailControlShowColumn = function (callBackFunction)
    {
        try
        {


            var codeservice_0814 = _baseCodeHashMap.get('codeservice_0814');


            controlObj.multidropdownlistinit('model_dropdown_f_checklist_tbl_ld_khb_showcolumnlist', codeservice_0814, null);
            //controlObj.checklistinit('model_dropdown_f_checklist_tbl_ld_khb_showcolumnlist', codeservice_0814, null, { width: '120' });

            //模态窗口
            $('#div_modal_tbl_ld_khb_sortlist').modal({
                keyboard: false,
                backdrop: 'static',
                show: false
            });
            callBackFunction.success();
        }
        catch (ex)
        {
            _blockMessage.show('initDetailControlShowColumn执行失败。<br/>' + ex.message, 'fail');
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
        //水表类型ids
        _pr_sblxids: '',
        //状态ids
        _pr_ztids: '',
        //当前被选中的行的ID集合的字符串//1^2^6
        _pr_gridselectids: '',
        //当前在第几页
        _pr_gridpageindex: 1,
        //当前的查询模式：1：简单查询；2：高级查询
        // _pr_searchtype: '1',
        //查询内容type1:简单查询内容；type2：高级查询内容（JSON）
        // _pr_searchcontent: null,


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

                                initGrid({
                                    success: function ()
                                    {
                                        that.bindGrid({
                                            success: function ()
                                            {

                                                _validateMessage = new validateMessage('btn_search_modal_search_tbl_ld_khb_list');

                                                _ladda_btn_command_new = Ladda.create('btn_command_new_tbl_ld_khb_list');
                                                _ladda_btn_command_delete = Ladda.create('btn_command_delete_tbl_ld_khb_list');
                                                _ladda_btn_command_exp = Ladda.create('btn_command_report_tbl_ld_khb_list');
                                                _ladda_btn_command_sort = Ladda.create('btn_command_sort_tbl_ld_khb_list');
                                                _ladda_btn_command_showcolunm = Ladda.create('btn_command_showcolunm_tbl_ld_khb_list');

                                                switch (that._pr_listtype)
                                                {
                                                    case "1":
                                                        setDisable(false);
                                                        break;
                                                    case "2":
                                                        setDisable(true);
                                                        break;
                                                }

                                                _blockMessage.hidden();
                                            },
                                            fail: function (message)
                                            {
                                                _blockMessage.show('bindGrid执行失败<br/>' + message, 'fail');
                                            }
                                        });
                                    }
                                });


                                //初始化search
                                initSearchBaseCode({
                                    success: function ()
                                    {

                                        initDetailControl({
                                            success: function (result)
                                            {
                                                initDetailControlSort({
                                                    success: function ()
                                                    {

                                                    }
                                                });
                                                initDetailControlShowColumn({
                                                    success: function ()
                                                    {

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
                $('#table_grid_tbl_ld_khb_list').bootstrapTable("showLoading");
                var sort = getCookie('tbl_ld_khb_list_sort');

                var whereClause = _whereClauseString;
                if (that._pr_sblxids != '')
                {
                    if (whereClause != '')
                    {
                        whereClause += ' and ';
                    }
                    whereClause += " '," + that._pr_sblxids + ",' like '%,'||f_sblxid||',%' and f_sblxid is not null";
                }
                if (that._pr_ztids != '')
                {
                    if (whereClause != "")
                    {
                        whereClause += " and ";
                    }
                    whereClause += " f_ztid in ('" + that._pr_ztids.replaceAll(',', '\',\'') + "')";
                }
                if (sort != null && sort != 'undefined' && sort != "")
                {
                    var orderByString = ' ' + sort;
                }
                else
                {
                    var orderByString = ' sys_id desc';
                }
                var columnsString = "f_value1^f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^f_khbh^f_ztkhh^f_khfz^f_khfzid^f_ycje^f_yslx^f_yslxid^f_tbbh^f_sfjlbjf^f_zt^f_ztid^f_bz^f_cbbh^f_cbbhid^f_cbxh^f_cbyxm^f_cbyid^f_cbzq^f_cbmc^f_yhbh^f_yhbhid^f_jfm^f_yhfz^f_yhfzid^f_dz^f_sbdz^f_dh^f_ljqf^f_tjjzpwf^f_tjjzsf^f_tssbbhid^f_nljgl^f_dy^f_dyid^f_sc^f_scid^f_qy^f_qyid^f_pq^f_pqid^f_tsyxzh^f_hth^f_sfzh^f_khrq^f_sbbh^f_sbbhid^f_ljqf^f_tjjzpwf^f_tjjzsf^f_tssbbhid^f_nljgl^f_bqzm^f_sqzm^f_bqsl^f_sqsl^f_qsqpjsl^f_qlqpjsl^f_ljgl^f_lxth^f_sblx^f_sblxid^f_jllx^f_jllxid^f_tssbbh^f_ztsbh^f_rs^f_sbkj^f_sbkjid^f_sbfz^f_sbfzid^f_ztyhh^f_wxwybz^f_zfbwybz^f_gdyhwybz^f_yhm^f_zhcbrq^f_sqysl^f_jhysl^f_ickljgl^sys_id^(select min(f_sqzm) from tbl_ld_cbiao where f_khbh=b.f_khbh and f_ztid='2') as f_qfqm";

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
        //---------------------------------------------------------------------------------
        // ---------------------------------按钮------------------------------------------
        //---------------------------------------------------------------------------------


        /* 
        *  
        *  方法:btn_command_new_onclick
        *  参数:
        *  新建数据并打开DetailModel
        */
        btn_command_new_onclick: function ()
        {

            _ladda_btn_command_new.start();
            $('#div_modal_tbl_ld_khb_list').modal('show');

        },
        /* 
    *  
    *  方法:div_modal_tbl_ld_sbb_list
    *  参数:
    *  新建时弹出modal 进行水表类型选择  
    */
        btn_modal_ok_onclick: function ()
        {
            var sblxid = controlObj.singledropdownlistid('detial_f_fsblx_tbl_ld_khb_list');
            var sblx = controlObj.singledropdownlist('detial_f_fsblx_tbl_ld_khb_list');


            if (sblxid == '')
            {
                _alertMessage.show('水表类型不能为空', 'fail');
            }
            else
            {
                try
                {
                    var data = {
                        typeid: 'kh',
                        nodeid: sblxid
                    }
                    doAjaxFunction(_servicecommonUrl, 'getBusinessNum', data, {
                        success: function (message)
                        {

                            controlObj.singledropdownlistid('detail_f_sblx_tbl_ld_khb_detail', '');
                            addDetailData(message, {
                                success: function (result)
                                {
                                    _ladda_btn_command_new.stop();
                                    transToDetailPage(result, '1');

                                }, fail: function (message)
                                {
                                    _ladda_btn_command_new.stop();
                                    _alertMessage.show('addDetailData执行失败', 'fail');
                                    _resultMessage.show(message);
                                }
                            });
                        },
                        fail: function (message)
                        {
                            _blockMessage.show('获取水表表号失败' + message, 'fail');
                        }
                    });
                }
                catch (ex)
                {
                    _blockMessage.show('执行失败<br/>' + ex.message, 'fail');
                }
            }
        },
        /* 
       *  
       *  方法:div_modal_tbl_ld_sbb_list
       *  参数:
       *  新建时弹出modal 进行水表类型选择  
       */
        btn_modal_cancle_onclick: function ()
        {
            $('#div_modal_tbl_ld_khb_list').modal('hide');
            _ladda_btn_command_new.stop();
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
                var currentcount = $('#table_grid_tbl_ld_khb_list').bootstrapTable('getSelections').length;
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
                                            },
                                            fail: function (message)
                                            {
                                                _alertMessage.show('数据删除完成，绑定数据失败', 'fail');
                                                _ladda_btn_command_delete.stop();
                                                _resultMessage.show(message);
                                            }
                                        });

                                    },
                                    fail: function (message)
                                    {
                                        _alertMessage.show('数据删除完成，获取数据条数失败', 'fail');
                                        _ladda_btn_command_delete.stop();
                                        _resultMessage.show(message);
                                    }
                                });

                            },
                            fail: function (message)
                            {
                                _alertMessage.show('数据删除失败', 'fail');
                                _ladda_btn_command_delete.stop();
                                _resultMessage.show(message);
                            }
                        });


                    },
                    cancle: function ()
                    {

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
            $('#table_grid_tbl_ld_khb_list').bootstrapTable('uncheckAll');
            that._pr_gridselectids = '';
            gridSelectedChange();
        },

        //---------------------------------------------------------------------------------
        // ---------------------------------SearchModel------------------------------------
        //---------------------------------------------------------------------------------

        //导出
        btn_command_report_onclick: function ()
        {
            _ladda_btn_command_exp.start();
            var column = getCookie('tbl_ld_khb_list_column');
            var columnname = getCookie('tbl_ld_khb_list_columnname');
            if (_whereClauseString == "")
            {
                var where = " 1=1";
            }
            else
            {
                var where = _whereClauseString;
            }
            var sort = getCookie('tbl_ld_khb_list_sort');
            if (sort != null && sort != 'undefined' && sort != "")
            {
                var orderByString = ' ' + sort;
            }
            else
            {
                var orderByString = ' sys_id desc';
            }


            if (column != null && columnname != null && column != "" && columnname != "")
            {
                var columnsString = column;
                var colunmsName = columnname;
            }
            else
            {
                var columnsString = "f_khbh,f_ycje,f_yslx,f_sblx,f_cbmc,f_yhm,f_dz,f_dh,f_nljgl,f_ljqf,f_qy,f_pq,f_zt,f_value1,f_bz,(select min(to_number(f_sqzm)) from tbl_ld_cbiao where f_khbh=b.f_khbh and f_ztid='2') as f_qfqm,f_bqzm,f_value10";

                var colunmsName = '客户编号,绿化水表押金,用水类型,水表类型,抄本名称,用户名,地址,电话,年累计购量,累计欠费,区域,片区,状态,操作类型,备注,欠费起码,本期止码,银行账号';

            }
            var data = {
                whereString: where,
                orderByString: orderByString,
                column: columnsString,
                columnname: colunmsName,
                clientInf: _clientInf
            };
            doAjaxFunction(_serviceUrl, 'Export', data, {
                success: function (result)
                {
                    _ladda_btn_command_exp.stop();
                    window.open(result, "_blank", "");
                },
                fail: function (message)
                {
                    _ladda_btn_command_exp.stop();
                    _alertMessage.show('导出失败', 'fail');
                    _resultMessage.show(message);
                }
            });
        },

        //排序
        btn_command_sort_onclick: function ()
        {
            _ladda_btn_command_sort.start();
            var sort = getCookie('tbl_ld_khb_list_sort');
            if (sort != null && sort != 'undefined' && sort != "")
            {
                var arr = sort.split(',');
                for (var i = 0; i < arr.length; i++)
                {
                    var px = arr[i].split(' ')[0];
                    var pxfs = arr[i].split(' ')[1];
                    controlObj.singledropdownlistid('model_dropdown_f_px' + i + '_tbl_ld_khb_sortlist', px);
                    controlObj.singledropdownlistid('model_dropdown_f_pxfs' + i + '_tbl_ld_khb_sortlist', pxfs);
                }
            }
            $('#div_modal_tbl_ld_khb_sortlist').modal('show');
        },


        //排序取消按钮
        btn_detail_modal_cancle_onclick: function ()
        {

            $('#div_modal_tbl_ld_khb_sortlist').modal('hide');
            _ladda_btn_command_sort.stop();

        },
        //排序确定按钮
        btn_detail_modal_save_onclick: function ()
        {
            var sort = "";
            var sypx = controlObj.singledropdownlistid('model_dropdown_f_px0_tbl_ld_khb_sortlist');
            var sypxfs = controlObj.singledropdownlistid('model_dropdown_f_pxfs0_tbl_ld_khb_sortlist');
            var cypx = controlObj.singledropdownlistid('model_dropdown_f_px1_tbl_ld_khb_sortlist');
            var cypxfs = controlObj.singledropdownlistid('model_dropdown_f_pxfs1_tbl_ld_khb_sortlist');
            var dspx = controlObj.singledropdownlistid('model_dropdown_f_px2_tbl_ld_khb_sortlist');
            var dspxfs = controlObj.singledropdownlistid('model_dropdown_f_pxfs2_tbl_ld_khb_sortlist');
            if (sypx != null && sypx != "")
            {
                if (sypxfs != null && sypxfs != "")
                {
                    sort += sypx + " " + sypxfs + ",";
                }
                else
                {
                    sort += sypx + " asc,";
                }
            }
            if (cypx != null && cypx != "")
            {
                if (cypxfs != null && cypxfs != "")
                {
                    sort += cypx + " " + cypxfs + ",";
                }
                else
                {
                    sort += cypx + " asc,";
                }
            }
            if (dspx != null && dspx != "")
            {
                if (dspxfs != null && dspxfs != "")
                {
                    sort += dspx + " " + dspxfs + ",";
                }
                else
                {
                    sort += dspx + " asc,";
                }
            }
            sort = sort.trimEnd(',');
            setCookieMinutes("tbl_ld_khb_list_sort", sort, 5256000);
            that.bindGrid({
                success: function ()
                {
                    _ladda_btn_command_sort.stop();

                },

            });

            $('#div_modal_tbl_ld_khb_sortlist').modal('hide');

        },
        //列显示
        btn_command_showcolunm_onclick: function ()
        {

            _ladda_btn_command_showcolunm.start();
            var column = getCookie('tbl_ld_khb_list_column');
            if (column != null && column != 'undefined' && column != "")
            {

                //controlObj.checklistid('model_dropdown_f_checklist_tbl_ld_khb_showcolumnlist', column);

                controlObj.multidropdownlistid('model_dropdown_f_checklist_tbl_ld_khb_showcolumnlist', column);



            }
            $('#div_modal_tbl_ld_khb_showcolumnlist').modal('show');

        },
        //列显示取消按钮
        btn_showcolumn_modal_cancle_onclick: function ()
        {

            $('#div_modal_tbl_ld_khb_showcolumnlist').modal('hide');
            _ladda_btn_command_showcolunm.stop();

        },
        //列显示确定按钮
        btn_showcolumn_modal_save_onclick: function ()
        {





            var column = controlObj.multidropdownlistid('model_dropdown_f_checklist_tbl_ld_khb_showcolumnlist');
            var columnname = controlObj.multidropdownlist('model_dropdown_f_checklist_tbl_ld_khb_showcolumnlist');


            setCookieMinutes("tbl_ld_khb_list_column", column, 5256000);
            setCookieMinutes("tbl_ld_khb_list_columnname", columnname, 5256000);

            $("#table_grid_tbl_ld_khb_list").bootstrapTable('destroy');

            initGrid({
                success: function ()
                {
                    that.bindGrid({
                        success: function ()
                        {

                            $('#div_modal_tbl_ld_khb_showcolumnlist').modal('hide');
                            _ladda_btn_command_showcolunm.stop();
                        },
                        fail: function (message)
                        {
                            _blockMessage.show('bindGrid执行失败<br/>' + message, 'fail');
                        }
                    });
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
    tbl_ld_khb_list_Obj.init();
});



