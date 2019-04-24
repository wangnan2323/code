


var _clientInf = '{userid="",appcode="54",appname="",userip="",usermac="",username=""}';
var _blockMessage = null;
var _alertMessage = null;
var _resultMessage = null;
var _confirmMessage = null;

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
        _isPage = true,
    //Code数据存储容器
    _baseCodeHashMap = null,
    //校验结果容器
    _validateMessage_search = null,
    _validateMessage_searchtime = null,
    //按钮工具

    _ladda_btn_command_delete = null,
    _ladda_btn_command_exp = null,
    _ladda_btn_command_his = null,
    _ladda_btn_command_showcolunm = null,
    //查询sql语句
    _whereClauseString = '',
    //是否是管理员标志0：能看到全部数据，	1:只能看到自己的数据，
    _isadmin = '',
    //是否邮储标志	0:是邮储，1不是邮储
    _isyouchu = '',
    //是否营业厅标志	0:是营业厅，1不是营业厅
    _isyingyeting = '',
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
            _defaultfrom = myDate.getFullYear() + '/' + myMonth + '/' + myDate.getDate() + ' 00:00:00';
            _defaultto = myDate.getFullYear() + '/' + myMonth + '/' + myDate.getDate() + ' 23:59:59';

            that._pr_listtype = requestQuery('listtype');
            that._pr_appcode = requestQuery('appcode');
            that._pr_gridselectids = requestQuery('gridselectids');

            that._pr_gridpageindex = requestQuery('gridpageIndex');
            that._pr_searchtype = requestQuery('searchtype');
            that._pr_searchcontent = requestQuery('searchcontent');
            that._pr_searchtime = requestQuery('searchtime');
            that._pr_searchhis = requestQuery('searchhis');

            _isadmin = requestQuery('isadmin');
            _isyouchu = requestQuery('isyouchu');
            _isyingyeting = requestQuery('isyingyeting');

            _clientInf = '{userid:"' + basePageObj._userInfoJson.sys_userid + '",appcode:"' + that._pr_appcode + '",appname:"",userip:"' + basePageObj._userInfoJson.ip + '",usermac:"' + basePageObj._userInfoJson.mac + '",username:"' + basePageObj._userInfoJson.sys_username + '"}';

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


            if (that._pr_searchtime == null || that._pr_searchtime == '' || that._pr_searchtime == 'null')
            {               
                that._pr_searchtime = { "f_xkrqfrom": _defaultfrom, "f_xkrqto": _defaultto };
            }
            else
            {
                that._pr_searchtime = (new Function("", "return " + that._pr_searchtime))();
            }
            if (that._pr_searchhis == null || that._pr_searchhis == '' || that._pr_searchhis == 'null')
            {
                that._pr_searchhis = 'false';
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
            //增加对历史库查询角色2021的验证，如果用户具备这个角色，则可以查询历史库，否则不能查询
            if (("^" + basePageObj._userInfoJson.sys_roles + "^").indexOf('^2021^') <= -1)
            {
                $('#btn_command_his_tbl_ld_ickss_list').addClass('hidden');
            }
            else
            {
                $('#btn_command_his_tbl_ld_ickss_list').removeClass('hidden');
            }

            switch (that._pr_listtype)
            {
                case "1":
                    {
                        switch (_isadmin + "_" + _isyouchu + "_" + _isyingyeting)
                        {
                            case "0_1_1":
                                {
                                    //可以删除
                                    $('#btn_command_delete_tbl_ld_ickss_list').removeClass('hidden');
                                    //可以导出
                                    $('#btn_command_export_tbl_ld_ickss_list').removeClass('hidden');
                                }
                                break;
                            case "1_0_1":
                                {
                                    //可能存在回滚状态，但是不能删除！
                                    $('#btn_command_delete_tbl_ld_ickss_list').removeClass('hidden');
                                    //可以到处
                                    $('#btn_command_export_tbl_ld_ickss_list').removeClass('hidden');
                                }
                                break;
                            case "1_1_0":
                                {
                                    //不可能存在回滚状态，所以不能删除
                                    $('#btn_command_delete_tbl_ld_ickss_list').removeClass('hidden');
                                    //可以到处数据
                                    $('#btn_command_export_tbl_ld_ickss_list').removeClass('hidden');
                                }
                                break;
                        }
                    }
                    break;
                case "2":
                    {

                        $('#btn_command_delete_tbl_ld_ickss_list').addClass('hidden');
                        $('#btn_command_export_tbl_ld_ickss_list').removeClass('hidden');
                    }
                    break;
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


        var url = '../tbl_ld_ickss/tbl_ld_ickss_detail.html';
        url += '?uid=' + basePageObj._userInfoJson.sys_userid;
        url += '&sys_id=' + id;
        url += '&pagetype=' + pagetype;
        url += '&isadmin=' + _isadmin;
        url += '&isyingyeting=' + _isyingyeting;
        url += '&isyouchu=' + _isyouchu;
        url += '&appcode=' + that._pr_appcode;
        url += '&fromurl=../tbl_ld_ickss/tbl_ld_ickss_list.html';
        url += '&fromurlparam={';
        url += '"appcode":"' + that._pr_appcode + '",';
        url += '"listtype":"' + that._pr_listtype + '",';
        url += '"gridselectids":"' + that._pr_gridselectids + '",';
        url += '"gridpageindex":"' + that._pr_gridpageindex + '",';
        url += '"isadmin":"' + _isadmin + '",';
        url += '"isyingyeting":"' + _isyingyeting + '",';
        url += '"isyouchu":"' + _isyouchu + '",';
        url += '"searchhis":"' + that._pr_searchhis + '",';
        url += '"searchtime":' + JSON.stringify(that._pr_searchtime) + ',';
        url += '"searchtype":"' + that._pr_searchtype + '",';    
        url += '"searchcontent":' + JSON.stringify(that._pr_searchcontent) + '';
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

        var codeServiceId = '';

        codeServiceId += "0564^";
        codeServiceId += "0593^";

        codeServiceId = codeServiceId.trimEnd('^');
        commonObj.getCodeServiceJson(codeServiceId, {
            success: function (resultArray)
            {
                try
                {
                    _baseCodeHashMap = new hashMap();

                    _baseCodeHashMap.put('codeservice_0564', resultArray['0564']);
                    _baseCodeHashMap.put('codeservice_0593', resultArray['0593']);
                    var columnsArray = [
                 { "id": "f_khbh", "text": "客户编号" },
                { "id": "f_yhbh", "text": "用户编号" },
                { "id": "f_dz", "text": "地址" },
                { "id": "f_dh", "text": "电话" },
                { "id": "f_dy", "text": "地域" },
                { "id": "f_sc", "text": "水厂" },
                { "id": "f_qy", "text": " 区域" },
                { "id": "f_pq", "text": "片区" },
                { "id": "f_yhm", "text": "用户名" },
                { "id": "f_jfm", "text": "缴费名" },
                { "id": "f_lxtkhh", "text": "老系统客户号" },
                { "id": "f_khrq", "text": "开户日期" },
                { "id": "f_yslx", "text": "用水类型" },
                { "id": "f_sbbh", "text": "水表编号" },
                { "id": "f_kj", "text": "口径" },
                { "id": "f_sblx", "text": "水表类型" },
                { "id": "f_rs", "text": "人数" },
                { "id": "f_sf", "text": "水费" },
                { "id": "f_sl", "text": "水量" },
                { "id": "f_jfdh", "text": "缴费单号" },
                { "id": "f_jfje", "text": "缴费金额" },
                { "id": "f_zt", "text": "状态" },
                { "id": "f_bz", "text": "备注" },
                { "id": "f_xkr", "text": "寻卡人" },
                { "id": "f_xkrq", "text": "寻卡日期" },
                { "id": "f_xiekr", "text": "写卡人" },
                { "id": "f_xiekrq", "text": "写卡日期" },
                { "id": "f_ssbh", "text": "售水编号" },
                { "id": "f_ly", "text": "来源" },
                { "id": "f_xklx", "text": "写卡类型" },
                { "id": "f_xkkh", "text": "写卡卡号" },
                { "id": "f_xkgscs", "text": "写卡购水次数" },
                { "id": "f_xkbcgsl", "text": "写卡本次购水量" },
                { "id": "f_xkms", "text": "写卡模式" },
                { "id": "f_xkljgl", "text": "写卡累积购量" },
                { "id": "f_xkjzlx", "text": "写卡介质类型" },
                { "id": "f_port", "text": "串口号" },
                { "id": "f_dkkh", "text": " 读卡卡号" },
                { "id": "f_dkbcgsl", "text": "读卡本次购水量" },
                { "id": "f_dkgscs", "text": "读卡购水次数" },
                { "id": "f_dkljgl", "text": "读卡累积购量" },
                { "id": "f_dkjzlx", "text": "读卡介质类型" },
                { "id": "f_dksbzt", "text": "读卡刷表状态" },
                { "id": "f_khfz", "text": " 客户分组" },
                { "id": "f_cbbh", "text": "抄本编号" },
                { "id": "f_dj", "text": " 单价" },
                { "id": "f_pwf", "text": "排污费" },
                { "id": "f_ysje", "text": "应收金额" },
                { "id": "f_jmhysje", "text": "减免后应收金额" },
                { "id": "f_khytjjzsf", "text": "客户原调价结转水费" },
                { "id": "f_khytjjzpwf", "text": "客户原调价结转排污费" },
                { "id": "f_sfsytjjz", "text": "是否使用调价结转" },
                { "id": "f_sytjjzsf", "text": "使用调价结转水费" },
                { "id": "f_sytjjzpwf", "text": "使用调价结转排污费" },
                { "id": "f_syhtjjzsf", "text": "使用后调价结转水费" },
                { "id": "f_syhtjjzpwf", "text": "使用后调价结转排污费" },
                { "id": "f_khyye", "text": "客户原余额" },
                { "id": "f_sfsyye", "text": "是否使用余额" },
                { "id": "f_syye", "text": "使用余额" },
                { "id": "f_yhye", "text": "用后余额" },
                { "id": "f_shys", "text": "算后应收" },
                { "id": "f_shss", "text": "算后实收" },
                { "id": "f_shzl", "text": "算后找零" },
                { "id": "f_jffs", "text": "缴费方式" },
                { "id": "f_yyt", "text": "营业厅" },
                { "id": "f_kplb", "text": "开票类别" },
                { "id": "f_sfjl", "text": "算法记录" },
                    ];
                    _baseCodeHashMap.put('codeservice_ickss', columnsArray);
                    var sqlJson = {
                        "tbl_ld_cben": 'select sys_id as id,f_cbbh as text,f_cbymc,f_cbyid,f_cbzq,f_cbmc from tbl_ld_cben order by f_cbbh asc',

                        'tbl_ldbm_khfz': "select sys_id as id,f_fzmc as text,decode(f_ztid,'0','false','true') as disabled from tbl_ldbm_khfz where sys_delflag='0'  order by sys_id",
                        'tbl_ldbm_yhfz': "select sys_id as id,f_fzmc as text,decode(f_ztid,'0','false','true') as disabled from tbl_ldbm_yhfz where sys_delflag='0'  order by sys_id",
                        'tbl_ldbm_sbfz': "select sys_id as id,f_fzmc as text,decode(f_ztid,'0','false','true') as disabled from tbl_ldbm_sbfz where sys_delflag='0'  order by sys_id",
                    }
                    commonObj.querySqls(sqlJson, {
                        success: function (resultJson)
                        {
                            //$.each(resultJson["tbl_ldbm_khfz"], function (i, u)
                            //{
                            //    if (resultJson["tbl_ldbm_khfz"][i]["disabled"] == "true")
                            //    {
                            //        resultJson["tbl_ldbm_khfz"][i]["disabled"] = true;
                            //    }
                            //    else
                            //    {
                            //        resultJson["tbl_ldbm_khfz"][i]["disabled"] = false;
                            //    }
                            //});
                            _baseCodeHashMap.put('codeservice_cben', resultJson["tbl_ld_cben"]);
                            _baseCodeHashMap.put('codeservice_khfz', resultJson["tbl_ldbm_khfz"]);
                            _baseCodeHashMap.put('codeservice_yhfz', resultJson["tbl_ldbm_yhfz"]);
                            _baseCodeHashMap.put('codeservice_sbfz', resultJson["tbl_ldbm_sbfz"]);
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
            var codeService_0564 = _baseCodeHashMap.get('codeservice_0564');
            var codeService_0593 = _baseCodeHashMap.get('codeservice_0593');
            var codeService_khfz = _baseCodeHashMap.get('codeservice_khfz');
            var codeService_yhfz = _baseCodeHashMap.get('codeservice_yhfz');
            var codeService_sbfz = _baseCodeHashMap.get('codeservice_sbfz');
            var codeservice_cben = _baseCodeHashMap.get('codeservice_cben');
            //controlObj.datetimeinit('search_f_khrq_tbl_ld_ickss_list_datefrom', 'search_f_khrq_tbl_ld_ickss_list_timefrom');
            //controlObj.datetimeinit('search_f_khrq_tbl_ld_ickss_list_dateto', 'search_f_khrq_tbl_ld_ickss_list_timeto');

            //controlObj.datetime('search_f_khrq_tbl_ld_ickss_list_datefrom', 'search_f_khrq_tbl_ld_ickss_list_timefrom', '1900-01-01 00:00:00');
            //controlObj.datetime('search_f_khrq_tbl_ld_ickss_list_dateto', 'search_f_khrq_tbl_ld_ickss_list_timeto', '1900-01-01 00:00:00');

            controlObj.multidropdownlistinit('search_f_zt_tbl_ld_ickss_list', codeService_0564);
            controlObj.multidropdownlistinit('search_f_ly_tbl_ld_ickss_list', codeService_0593);
            controlObj.multidropdownlistinit('search_f_khfz_tbl_ld_ickss_list', codeService_khfz);
            controlObj.multidropdownlistinit('search_f_yhfz_tbl_ld_ickss_list', codeService_yhfz);
            controlObj.multidropdownlistinit('search_f_sbfz_tbl_ld_ickss_list', codeService_sbfz);
            controlObj.multidropdownlistinit('search_f_cbbh_tbl_ld_ickss_list', codeservice_cben);

            controlObj.datetimeinit('search_f_dkrq_tbl_ld_ickss_list_datefrom', 'search_f_dkrq_tbl_ld_ickss_list_timefrom');
            controlObj.datetimeinit('search_f_dkrq_tbl_ld_ickss_list_dateto', 'search_f_dkrq_tbl_ld_ickss_list_timeto');
            controlObj.datetimeinit('search_f_xkrq_tbl_ld_ickss_list_datefrom', 'search_f_xkrq_tbl_ld_ickss_list_timefrom');
            controlObj.datetimeinit('search_f_xkrq_tbl_ld_ickss_list_dateto', 'search_f_xkrq_tbl_ld_ickss_list_timeto');

            controlObj.datetime('search_f_dkrq_tbl_ld_ickss_list_datefrom', 'search_f_dkrq_tbl_ld_ickss_list_timefrom', '1900-01-01 00:00:00');
            controlObj.datetime('search_f_dkrq_tbl_ld_ickss_list_dateto', 'search_f_dkrq_tbl_ld_ickss_list_timeto', '1900-01-01 00:00:00');
            controlObj.datetime('search_f_xkrq_tbl_ld_ickss_list_datefrom', 'search_f_xkrq_tbl_ld_ickss_list_timefrom', '1900-01-01 00:00:00');
            controlObj.datetime('search_f_xkrq_tbl_ld_ickss_list_dateto', 'search_f_xkrq_tbl_ld_ickss_list_timeto', '1900-01-01 00:00:00');
     
      


            switch (_isadmin + "_" + _isyouchu + "_" + _isyingyeting)
            {
                case "0_1_1"://管理员
                    {
                        $("#div_search_f_ly_tbl_ld_ickss_list").removeClass("hidden");
                    }
                    break;
                case "1_0_1"://邮储
                    {
                        $("#div_search_f_ly_tbl_ld_ickss_list").addClass("hidden");
                    }
                    break;
                case "1_1_0"://营业厅
                    {
                        $("#div_search_f_ly_tbl_ld_ickss_list").addClass("hidden");
                    }
                    break;
            }

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
            if (that._pr_searchhis == 'true')
            {
                $('#btn_command_his_tbl_ld_ickss_list').removeClass('btn-default');
                $('#btn_command_his_tbl_ld_ickss_list').addClass('btn-primary');

                $('#btn_command_his_tbl_ld_ickss_list').text('含历史库数据');

            }
            else
            {
                $('#btn_command_his_tbl_ld_ickss_list').addClass('btn-default');
                $('#btn_command_his_tbl_ld_ickss_list').removeClass('btn-primary');
                $('#btn_command_his_tbl_ld_ickss_list').text('不含历史库数据');
            }
            if (that._pr_searchtime != undefined && that._pr_searchtime.f_xkrqfrom != undefined && that._pr_searchtime.f_xkrqto != undefined)
            {
                controlObj.datetime('search_f_xkrq_tbl_ld_ickss_list_datefrom', 'search_f_xkrq_tbl_ld_ickss_list_timefrom', that._pr_searchtime.f_xkrqfrom);
                controlObj.datetime('search_f_xkrq_tbl_ld_ickss_list_dateto', 'search_f_xkrq_tbl_ld_ickss_list_timeto', that._pr_searchtime.f_xkrqto);

                $("#querydatefrom").html(that._pr_searchtime.f_xkrqfrom);
                $("#querydateto").html(that._pr_searchtime.f_xkrqto);
            }
            else
            {   

                controlObj.datetime('search_f_xkrq_tbl_ld_ickss_list_datefrom', 'search_f_xkrq_tbl_ld_ickss_list_timefrom', _defaultfrom);
                controlObj.datetime('search_f_xkrq_tbl_ld_ickss_list_dateto', 'search_f_xkrq_tbl_ld_ickss_list_timeto', _defaultto);


                $("#querydatefrom").html(_defaultfrom);
                $("#querydateto").html(_defaultto);

            }


            

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


                        controlObj.text('search_f_value1_tbl_ld_ickss_list', tbl_ld_ickss_list.f_value1);

                        controlObj.text('search_f_value2_tbl_ld_ickss_list', tbl_ld_ickss_list.f_value2);

                        controlObj.text('search_f_value3_tbl_ld_ickss_list', tbl_ld_ickss_list.f_value3);

                        controlObj.text('search_f_value4_tbl_ld_ickss_list', tbl_ld_ickss_list.f_value4);

                        controlObj.text('search_f_value5_tbl_ld_ickss_list', tbl_ld_ickss_list.f_value5);

                        controlObj.text('search_f_value6_tbl_ld_ickss_list', tbl_ld_ickss_list.f_value6);

                        controlObj.text('search_f_value7_tbl_ld_ickss_list', tbl_ld_ickss_list.f_value7);

                        controlObj.text('search_f_value8_tbl_ld_ickss_list', tbl_ld_ickss_list.f_value8);

                        controlObj.text('search_f_value9_tbl_ld_ickss_list', tbl_ld_ickss_list.f_value9);

                        controlObj.text('search_f_value10_tbl_ld_ickss_list', tbl_ld_ickss_list.f_value10);

                        controlObj.text('search_f_khbh_tbl_ld_ickss_list', tbl_ld_ickss_list.f_khbh);

                        controlObj.text('search_f_khbhid_tbl_ld_ickss_list', tbl_ld_ickss_list.f_khbhid);

                        controlObj.text('search_f_yhbh_tbl_ld_ickss_list', tbl_ld_ickss_list.f_yhbh);

                        controlObj.text('search_f_yhbhid_tbl_ld_ickss_list', tbl_ld_ickss_list.f_yhbhid);

                        controlObj.text('search_f_yhm_tbl_ld_ickss_list', tbl_ld_ickss_list.f_yhm);

                        controlObj.text('search_f_jfm_tbl_ld_ickss_list', tbl_ld_ickss_list.f_jfm);

                        controlObj.text('search_f_dz_tbl_ld_ickss_list', tbl_ld_ickss_list.f_dz);

                        controlObj.text('search_f_dh_tbl_ld_ickss_list', tbl_ld_ickss_list.f_dh);

                        controlObj.text('search_f_dy_tbl_ld_ickss_list', tbl_ld_ickss_list.f_dy);

                        controlObj.text('search_f_dyid_tbl_ld_ickss_list', tbl_ld_ickss_list.f_dyid);

                        controlObj.text('search_f_sc_tbl_ld_ickss_list', tbl_ld_ickss_list.f_sc);

                        controlObj.text('search_f_scid_tbl_ld_ickss_list', tbl_ld_ickss_list.f_scid);

                        controlObj.text('search_f_qy_tbl_ld_ickss_list', tbl_ld_ickss_list.f_qy);

                        controlObj.text('search_f_qyid_tbl_ld_ickss_list', tbl_ld_ickss_list.f_qyid);

                        controlObj.text('search_f_pq_tbl_ld_ickss_list', tbl_ld_ickss_list.f_pq);

                        controlObj.text('search_f_pqid_tbl_ld_ickss_list', tbl_ld_ickss_list.f_pqid);

                        controlObj.text('search_f_sbbh_tbl_ld_ickss_list', tbl_ld_ickss_list.f_sbbh);

                        controlObj.text('search_f_sbbhid_tbl_ld_ickss_list', tbl_ld_ickss_list.f_sbbhid);

                        controlObj.text('search_f_sblx_tbl_ld_ickss_list', tbl_ld_ickss_list.f_sblx);

                        controlObj.text('search_f_sblxid_tbl_ld_ickss_list', tbl_ld_ickss_list.f_sblxid);

                        controlObj.text('search_f_yslx_tbl_ld_ickss_list', tbl_ld_ickss_list.f_yslx);

                        controlObj.text('search_f_yslxid_tbl_ld_ickss_list', tbl_ld_ickss_list.f_yslxid);

                        controlObj.text('search_f_lxtkhh_tbl_ld_ickss_list', tbl_ld_ickss_list.f_lxtkhh);

                        controlObj.text('search_f_rs_tbl_ld_ickss_list', tbl_ld_ickss_list.f_rs);

                        controlObj.text('search_f_kj_tbl_ld_ickss_list', tbl_ld_ickss_list.f_kj);

                                       

                        controlObj.text('search_f_sf_tbl_ld_ickss_list', tbl_ld_ickss_list.f_sf);

                        controlObj.text('search_f_sl_tbl_ld_ickss_list', tbl_ld_ickss_list.f_sl);

                        controlObj.text('search_f_jfdh_tbl_ld_ickss_list', tbl_ld_ickss_list.f_jfdh);

                        controlObj.text('search_f_jfje_tbl_ld_ickss_list', tbl_ld_ickss_list.f_jfje);

                        controlObj.multidropdownlistid('search_f_zt_tbl_ld_ickss_list', tbl_ld_ickss_list.f_ztid);

                        controlObj.text('search_f_bz_tbl_ld_ickss_list', tbl_ld_ickss_list.f_bz);

                        //新增

                        controlObj.text('search_f_ssbh_tbl_ld_ickss_list', tbl_ld_ickss_list.f_ssbh);

                        controlObj.text('search_f_sjbh_tbl_ld_ickss_list', tbl_ld_ickss_list.f_sjbh);

                        controlObj.multidropdownlistid('search_f_ly_tbl_ld_ickss_list', tbl_ld_ickss_list.f_lyid);

                        controlObj.multidropdownlistid('search_f_cbbh_tbl_ld_ickss_list', tbl_ld_ickss_list.f_cbbhid);

                        controlObj.multidropdownlistid('search_f_khfz_tbl_ld_ickss_list', tbl_ld_ickss_list.f_khfzid);
                        controlObj.multidropdownlistid('search_f_yhfz_tbl_ld_ickss_list', tbl_ld_ickss_list.f_yhfzid);
                        controlObj.multidropdownlistid('search_f_sbfz_tbl_ld_ickss_list', tbl_ld_ickss_list.f_sbfzid);

                        controlObj.datetime('search_f_dkrq_tbl_ld_ickss_list_datefrom', 'search_f_dkrq_tbl_ld_ickss_list_timefrom', tbl_ld_ickss_list.f_dkrqfrom);
                        controlObj.datetime('search_f_dkrq_tbl_ld_ickss_list_dateto', 'search_f_dkrq_tbl_ld_ickss_list_timeto', tbl_ld_ickss_list.f_dkrqto);
                
                    }
                    break;
            }
            callBackFunction.success();
        }
        catch (ex)
        {
            _blockMessage.show('setSearchModel执行失败<br/>' + ex.message, 'fail');
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
            if ($('#btn_command_his_tbl_ld_ickss_list').hasClass('btn-default'))
            {
                that._pr_searchhis = 'false';
            }
            else
            {
                that._pr_searchhis = 'true';
            }
            that._pr_searchtime.f_xkrqfrom = controlObj.datetime('search_f_xkrq_tbl_ld_ickss_list_datefrom', 'search_f_xkrq_tbl_ld_ickss_list_timefrom'); // datefrom + ' ' + timefrom;
            that._pr_searchtime.f_xkrqto = controlObj.datetime('search_f_xkrq_tbl_ld_ickss_list_dateto', 'search_f_xkrq_tbl_ld_ickss_list_timeto'); //dateto + ' ' + timeto;                 


            $("#querydatefrom").html(that._pr_searchtime.f_xkrqfrom);
            $("#querydateto").html(that._pr_searchtime.f_xkrqto);

            switch (that._pr_searchtype)
            {

                case "1":
                    //简单查询
                    that._pr_searchcontent.type1 = $("#txt_command_search_tbl_ld_ickss_list").val();

                    break;
                case "2":

                    //高级查询
                    var tbl_ld_ickss_list = new Object();


                    tbl_ld_ickss_list.f_value1 = controlObj.text('search_f_value1_tbl_ld_ickss_list');


                    tbl_ld_ickss_list.f_value2 = controlObj.text('search_f_value2_tbl_ld_ickss_list');


                    tbl_ld_ickss_list.f_value3 = controlObj.text('search_f_value3_tbl_ld_ickss_list');


                    tbl_ld_ickss_list.f_value4 = controlObj.text('search_f_value4_tbl_ld_ickss_list');


                    tbl_ld_ickss_list.f_value5 = controlObj.text('search_f_value5_tbl_ld_ickss_list');


                    tbl_ld_ickss_list.f_value6 = controlObj.text('search_f_value6_tbl_ld_ickss_list');


                    tbl_ld_ickss_list.f_value7 = controlObj.text('search_f_value7_tbl_ld_ickss_list');


                    tbl_ld_ickss_list.f_value8 = controlObj.text('search_f_value8_tbl_ld_ickss_list');


                    tbl_ld_ickss_list.f_value9 = controlObj.text('search_f_value9_tbl_ld_ickss_list');


                    tbl_ld_ickss_list.f_value10 = controlObj.text('search_f_value10_tbl_ld_ickss_list');


                    tbl_ld_ickss_list.f_khbh = controlObj.text('search_f_khbh_tbl_ld_ickss_list');


                    tbl_ld_ickss_list.f_khbhid = controlObj.text('search_f_khbhid_tbl_ld_ickss_list');


                    tbl_ld_ickss_list.f_yhbh = controlObj.text('search_f_yhbh_tbl_ld_ickss_list');


                    tbl_ld_ickss_list.f_yhbhid = controlObj.text('search_f_yhbhid_tbl_ld_ickss_list');


                    tbl_ld_ickss_list.f_yhm = controlObj.text('search_f_yhm_tbl_ld_ickss_list');


                    tbl_ld_ickss_list.f_jfm = controlObj.text('search_f_jfm_tbl_ld_ickss_list');


                    tbl_ld_ickss_list.f_dz = controlObj.text('search_f_dz_tbl_ld_ickss_list');


                    tbl_ld_ickss_list.f_dh = controlObj.text('search_f_dh_tbl_ld_ickss_list');


                    tbl_ld_ickss_list.f_dy = controlObj.text('search_f_dy_tbl_ld_ickss_list');


                    tbl_ld_ickss_list.f_dyid = controlObj.text('search_f_dyid_tbl_ld_ickss_list');


                    tbl_ld_ickss_list.f_sc = controlObj.text('search_f_sc_tbl_ld_ickss_list');


                    tbl_ld_ickss_list.f_scid = controlObj.text('search_f_scid_tbl_ld_ickss_list');


                    tbl_ld_ickss_list.f_qy = controlObj.text('search_f_qy_tbl_ld_ickss_list');


                    tbl_ld_ickss_list.f_qyid = controlObj.text('search_f_qyid_tbl_ld_ickss_list');


                    tbl_ld_ickss_list.f_pq = controlObj.text('search_f_pq_tbl_ld_ickss_list');


                    tbl_ld_ickss_list.f_pqid = controlObj.text('search_f_pqid_tbl_ld_ickss_list');


                    tbl_ld_ickss_list.f_sbbh = controlObj.text('search_f_sbbh_tbl_ld_ickss_list');


                    tbl_ld_ickss_list.f_sbbhid = controlObj.text('search_f_sbbhid_tbl_ld_ickss_list');


                    tbl_ld_ickss_list.f_sblx = controlObj.text('search_f_sblx_tbl_ld_ickss_list');


                    tbl_ld_ickss_list.f_sblxid = controlObj.text('search_f_sblxid_tbl_ld_ickss_list');

                    tbl_ld_ickss_list.f_yslx = controlObj.text('search_f_yslx_tbl_ld_ickss_list');


                    tbl_ld_ickss_list.f_yslxid = controlObj.text('search_f_yslxid_tbl_ld_ickss_list');


                    tbl_ld_ickss_list.f_lxtkhh = controlObj.text('search_f_lxtkhh_tbl_ld_ickss_list');


                    tbl_ld_ickss_list.f_rs = controlObj.text('search_f_rs_tbl_ld_ickss_list');


                    tbl_ld_ickss_list.f_kj = controlObj.text('search_f_kj_tbl_ld_ickss_list');



                    tbl_ld_ickss_list.f_sf = controlObj.text('search_f_sf_tbl_ld_ickss_list');


                    tbl_ld_ickss_list.f_sl = controlObj.text('search_f_sl_tbl_ld_ickss_list');


                    tbl_ld_ickss_list.f_jfdh = controlObj.text('search_f_jfdh_tbl_ld_ickss_list');


                    tbl_ld_ickss_list.f_jfje = controlObj.text('search_f_jfje_tbl_ld_ickss_list');


                    tbl_ld_ickss_list.f_ztid = controlObj.multidropdownlistid('search_f_zt_tbl_ld_ickss_list');


                    tbl_ld_ickss_list.f_bz = controlObj.text('search_f_bz_tbl_ld_ickss_list');

                    //新增
                    tbl_ld_ickss_list.f_ssbh = controlObj.text('search_f_ssbh_tbl_ld_ickss_list');


                    tbl_ld_ickss_list.f_sjbh = controlObj.text('search_f_sjbh_tbl_ld_ickss_list');


                    tbl_ld_ickss_list.f_lyid = controlObj.multidropdownlistid('search_f_ly_tbl_ld_ickss_list');

                    tbl_ld_ickss_list.f_cbbhid = controlObj.multidropdownlistid('search_f_cbbh_tbl_ld_ickss_list');


                    tbl_ld_ickss_list.f_khfzid = controlObj.multidropdownlistid('search_f_khfz_tbl_ld_ickss_list');

                    tbl_ld_ickss_list.f_yhfzid = controlObj.multidropdownlistid('search_f_yhfz_tbl_ld_ickss_list');
                    tbl_ld_ickss_list.f_sbfzid = controlObj.multidropdownlistid('search_f_sbfz_tbl_ld_ickss_list');

                    tbl_ld_ickss_list.f_dkrqfrom = controlObj.datetime('search_f_dkrq_tbl_ld_ickss_list_datefrom', 'search_f_dkrq_tbl_ld_ickss_list_timefrom'); // datefrom + ' ' + timefrom;
                    tbl_ld_ickss_list.f_dkrqto = controlObj.datetime('search_f_dkrq_tbl_ld_ickss_list_dateto', 'search_f_dkrq_tbl_ld_ickss_list_timeto'); //dateto + ' ' + timeto;                 
              

                    that._pr_searchcontent.type2 = tbl_ld_ickss_list;
                    break;

            }

            callBackFunction.success();
        }
        catch (ex)
        {
            callBackFunction.fail(ex.message);
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
            if (that._pr_searchtype == '2' && that._pr_searchcontent != undefined)
            {
                var tbl_ld_ickss_list = that._pr_searchcontent.type2;
                var errorMessageHansMap = new hashMap();
                var errorMessagePlacementHansMap = new hashMap();




                if (tbl_ld_ickss_list.f_value1.length > 200)
                {
                    errorMessageHansMap.put('search_f_value1_tbl_ld_ickss_list', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_ickss_list.f_value2.length > 200)
                {
                    errorMessageHansMap.put('search_f_value2_tbl_ld_ickss_list', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_ickss_list.f_value3.length > 200)
                {
                    errorMessageHansMap.put('search_f_value3_tbl_ld_ickss_list', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_ickss_list.f_value4.length > 200)
                {
                    errorMessageHansMap.put('search_f_value4_tbl_ld_ickss_list', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_ickss_list.f_value5.length > 200)
                {
                    errorMessageHansMap.put('search_f_value5_tbl_ld_ickss_list', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_ickss_list.f_value6.length > 200)
                {
                    errorMessageHansMap.put('search_f_value6_tbl_ld_ickss_list', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_ickss_list.f_value7.length > 200)
                {
                    errorMessageHansMap.put('search_f_value7_tbl_ld_ickss_list', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_ickss_list.f_value8.length > 200)
                {
                    errorMessageHansMap.put('search_f_value8_tbl_ld_ickss_list', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_ickss_list.f_value9.length > 200)
                {
                    errorMessageHansMap.put('search_f_value9_tbl_ld_ickss_list', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_ickss_list.f_value10.length > 200)
                {
                    errorMessageHansMap.put('search_f_value10_tbl_ld_ickss_list', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_ickss_list.f_khbh.length > 200)
                {
                    errorMessageHansMap.put('search_f_khbh_tbl_ld_ickss_list', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_ickss_list.f_khbhid.length > 200)
                {
                    errorMessageHansMap.put('search_f_khbhid_tbl_ld_ickss_list', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_ickss_list.f_yhbh.length > 200)
                {
                    errorMessageHansMap.put('search_f_yhbh_tbl_ld_ickss_list', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_ickss_list.f_yhbhid.length > 200)
                {
                    errorMessageHansMap.put('search_f_yhbhid_tbl_ld_ickss_list', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_ickss_list.f_yhm.length > 200)
                {
                    errorMessageHansMap.put('search_f_yhm_tbl_ld_ickss_list', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_ickss_list.f_jfm.length > 200)
                {
                    errorMessageHansMap.put('search_f_jfm_tbl_ld_ickss_list', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_ickss_list.f_dz.length > 200)
                {
                    errorMessageHansMap.put('search_f_dz_tbl_ld_ickss_list', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_ickss_list.f_dh.length > 200)
                {
                    errorMessageHansMap.put('search_f_dh_tbl_ld_ickss_list', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_ickss_list.f_dy.length > 200)
                {
                    errorMessageHansMap.put('search_f_dy_tbl_ld_ickss_list', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_ickss_list.f_dyid.length > 200)
                {
                    errorMessageHansMap.put('search_f_dyid_tbl_ld_ickss_list', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_ickss_list.f_sc.length > 200)
                {
                    errorMessageHansMap.put('search_f_sc_tbl_ld_ickss_list', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_ickss_list.f_scid.length > 200)
                {
                    errorMessageHansMap.put('search_f_scid_tbl_ld_ickss_list', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_ickss_list.f_qy.length > 200)
                {
                    errorMessageHansMap.put('search_f_qy_tbl_ld_ickss_list', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_ickss_list.f_qyid.length > 200)
                {
                    errorMessageHansMap.put('search_f_qyid_tbl_ld_ickss_list', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_ickss_list.f_pq.length > 200)
                {
                    errorMessageHansMap.put('search_f_pq_tbl_ld_ickss_list', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_ickss_list.f_pqid.length > 200)
                {
                    errorMessageHansMap.put('search_f_pqid_tbl_ld_ickss_list', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_ickss_list.f_sbbh.length > 200)
                {
                    errorMessageHansMap.put('search_f_sbbh_tbl_ld_ickss_list', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_ickss_list.f_sbbhid.length > 200)
                {
                    errorMessageHansMap.put('search_f_sbbhid_tbl_ld_ickss_list', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_ickss_list.f_sblx.length > 200)
                {
                    errorMessageHansMap.put('search_f_sblx_tbl_ld_ickss_list', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_ickss_list.f_sblxid.length > 200)
                {
                    errorMessageHansMap.put('search_f_sblxid_tbl_ld_ickss_list', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_ickss_list.f_yslx.length > 200)
                {
                    errorMessageHansMap.put('search_f_yslx_tbl_ld_ickss_list', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_ickss_list.f_yslxid.length > 200)
                {
                    errorMessageHansMap.put('search_f_yslxid_tbl_ld_ickss_list', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_ickss_list.f_lxtkhh.length > 200)
                {
                    errorMessageHansMap.put('search_f_lxtkhh_tbl_ld_ickss_list', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_ickss_list.f_rs.length > 200)
                {
                    errorMessageHansMap.put('search_f_rs_tbl_ld_ickss_list', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_ickss_list.f_kj.length > 200)
                {
                    errorMessageHansMap.put('search_f_kj_tbl_ld_ickss_list', '长度不能超过<a style="color:red">200</a>个字');
                }







                if (tbl_ld_ickss_list.f_sf.length > 200)
                {
                    errorMessageHansMap.put('search_f_sf_tbl_ld_ickss_list', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_ickss_list.f_sl.length > 200)
                {
                    errorMessageHansMap.put('search_f_sl_tbl_ld_ickss_list', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_ickss_list.f_jfdh.length > 200)
                {
                    errorMessageHansMap.put('search_f_jfdh_tbl_ld_ickss_list', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_ickss_list.f_jfje.length > 200)
                {
                    errorMessageHansMap.put('search_f_jfje_tbl_ld_ickss_list', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_ickss_list.f_ztid.length > 200)
                {
                    errorMessageHansMap.put('search_f_zt_tbl_ld_ickss_list', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_ickss_list.f_bz.length > 200)
                {
                    errorMessageHansMap.put('search_f_bz_tbl_ld_ickss_list', '长度不能超过<a style="color:red">200</a>个字');
                }

                //新增

                if (tbl_ld_ickss_list.f_ssbh.length > 200)
                {
                    errorMessageHansMap.put('search_f_ssbh_tbl_ld_ickss_list', '长度不能超过<a style="color:red">200</a>个字');
                }

                if (tbl_ld_ickss_list.f_sjbh.length > 200)
                {
                    errorMessageHansMap.put('search_f_sjbh_tbl_ld_ickss_list', '长度不能超过<a style="color:red">200</a>个字');
                }

                if (tbl_ld_ickss_list.f_lyid.length > 200)
                {
                    errorMessageHansMap.put('search_f_ly_tbl_ld_ickss_list', '长度不能超过<a style="color:red">200</a>个字');
                }

                if (tbl_ld_ickss_list.f_cbbhid.length > 200)
                {
                    errorMessageHansMap.put('search_f_cbbh_tbl_ld_ickss_list', '长度不能超过<a style="color:red">200</a>个字');
                }

                if (tbl_ld_ickss_list.f_khfzid.length > 200)
                {
                    errorMessageHansMap.put('search_f_khfz_tbl_ld_ickss_list', '长度不能超过<a style="color:red">200</a>个字');
                }

                if (tbl_ld_ickss_list.f_yhfzid.length > 200)
                {
                    errorMessageHansMap.put('search_f_yhfz_tbl_ld_ickss_list', '长度不能超过<a style="color:red">200</a>个字');
                }

                if (tbl_ld_ickss_list.f_sbfzid.length > 200)
                {
                    errorMessageHansMap.put('search_f_sbfz_tbl_ld_ickss_list', '长度不能超过<a style="color:red">200</a>个字');
                }


                if (errorMessageHansMap.keys().length > 0)
                {
                    _validateMessage_search.show(errorMessageHansMap, errorMessagePlacementHansMap, false);
                    callBackFunction.fail('');
                }
                else
                {
                    _validateMessage_search.hidden();
                    callBackFunction.success();
                }
            }
            else
            {
                _validateMessage_search.hidden();
                callBackFunction.success();
            }
          
        }
        catch (ex)
        {
            callBackFunction.fail(ex.message);
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

        //that._pr_searchtime.f_khrqfrom = ('1900-01-01 00:00:00');
        //that._pr_searchtime.f_khrqto = ('1900-01-01 00:00:00');
        //controlObj.datetime('search_f_khrq_tbl_ld_ickss_list_datefrom', 'search_f_khrq_tbl_ld_ickss_list_timefrom', that._pr_searchtime.f_khrqfrom);
        //controlObj.datetime('search_f_khrq_tbl_ld_ickss_list_dateto', 'search_f_khrq_tbl_ld_ickss_list_timeto', that._pr_searchtime.f_khrqto);

        switch (that._pr_searchtype)
        {
            case "1":
                if (that._pr_searchcontent.type2 == undefined)
                {
                    that._pr_searchcontent.type2 = new Object();
                }

                that._pr_searchcontent.type2.f_value1 = '';
                controlObj.text('search_f_value1_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_value1);


                that._pr_searchcontent.type2.f_value2 = '';
                controlObj.text('search_f_value2_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_value2);


                that._pr_searchcontent.type2.f_value3 = '';
                controlObj.text('search_f_value3_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_value3);


                that._pr_searchcontent.type2.f_value4 = '';
                controlObj.text('search_f_value4_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_value4);


                that._pr_searchcontent.type2.f_value5 = '';
                controlObj.text('search_f_value5_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_value5);


                that._pr_searchcontent.type2.f_value6 = '';
                controlObj.text('search_f_value6_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_value6);


                that._pr_searchcontent.type2.f_value7 = '';
                controlObj.text('search_f_value7_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_value7);


                that._pr_searchcontent.type2.f_value8 = '';
                controlObj.text('search_f_value8_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_value8);


                that._pr_searchcontent.type2.f_value9 = '';
                controlObj.text('search_f_value9_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_value9);


                that._pr_searchcontent.type2.f_value10 = '';
                controlObj.text('search_f_value10_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_value10);


                that._pr_searchcontent.type2.f_khbh = '';
                controlObj.text('search_f_khbh_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_khbh);


                that._pr_searchcontent.type2.f_khbhid = '';
                controlObj.text('search_f_khbhid_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_khbhid);


                that._pr_searchcontent.type2.f_yhbh = '';
                controlObj.text('search_f_yhbh_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_yhbh);


                that._pr_searchcontent.type2.f_yhbhid = '';
                controlObj.text('search_f_yhbhid_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_yhbhid);


                that._pr_searchcontent.type2.f_yhm = '';
                controlObj.text('search_f_yhm_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_yhm);


                that._pr_searchcontent.type2.f_jfm = '';
                controlObj.text('search_f_jfm_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_jfm);


                that._pr_searchcontent.type2.f_dz = '';
                controlObj.text('search_f_dz_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_dz);


                that._pr_searchcontent.type2.f_dh = '';
                controlObj.text('search_f_dh_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_dh);


                that._pr_searchcontent.type2.f_dy = '';
                controlObj.text('search_f_dy_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_dy);


                that._pr_searchcontent.type2.f_dyid = '';
                controlObj.text('search_f_dyid_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_dyid);


                that._pr_searchcontent.type2.f_sc = '';
                controlObj.text('search_f_sc_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_sc);


                that._pr_searchcontent.type2.f_scid = '';
                controlObj.text('search_f_scid_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_scid);


                that._pr_searchcontent.type2.f_qy = '';
                controlObj.text('search_f_qy_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_qy);


                that._pr_searchcontent.type2.f_qyid = '';
                controlObj.text('search_f_qyid_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_qyid);


                that._pr_searchcontent.type2.f_pq = '';
                controlObj.text('search_f_pq_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_pq);


                that._pr_searchcontent.type2.f_pqid = '';
                controlObj.text('search_f_pqid_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_pqid);


                that._pr_searchcontent.type2.f_sbbh = '';
                controlObj.text('search_f_sbbh_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_sbbh);


                that._pr_searchcontent.type2.f_sbbhid = '';
                controlObj.text('search_f_sbbhid_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_sbbhid);


                that._pr_searchcontent.type2.f_sblx = '';
                controlObj.text('search_f_sblx_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_sblx);


                that._pr_searchcontent.type2.f_sblxid = '';
                controlObj.text('search_f_sblxid_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_sblxid);


                that._pr_searchcontent.type2.f_yslx = '';
                controlObj.text('search_f_yslx_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_yslx);


                that._pr_searchcontent.type2.f_yslxid = '';
                controlObj.text('search_f_yslxid_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_yslxid);


                that._pr_searchcontent.type2.f_lxtkhh = '';
                controlObj.text('search_f_lxtkhh_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_lxtkhh);


                that._pr_searchcontent.type2.f_rs = '';
                controlObj.text('search_f_rs_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_rs);


                that._pr_searchcontent.type2.f_kj = '';
                controlObj.text('search_f_kj_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_kj);


              


                that._pr_searchcontent.type2.f_sf = '';
                controlObj.text('search_f_sf_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_sf);


                that._pr_searchcontent.type2.f_sl = '';
                controlObj.text('search_f_sl_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_sl);


                that._pr_searchcontent.type2.f_jfdh = '';
                controlObj.text('search_f_jfdh_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_jfdh);


                that._pr_searchcontent.type2.f_jfje = '';
                controlObj.text('search_f_jfje_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_jfje);


                that._pr_searchcontent.type2.f_ztid = '';
                controlObj.multidropdownlistid('search_f_zt_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_ztid);


                that._pr_searchcontent.type2.f_bz = '';
                controlObj.text('search_f_bz_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_bz);

                //新增
                that._pr_searchcontent.type2.f_ssbh = '';
                controlObj.text('search_f_ssbh_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_ssbh);


                that._pr_searchcontent.type2.f_sjbh = '';
                controlObj.text('search_f_sjbh_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_sjbh);


                that._pr_searchcontent.type2.f_lyid = '';
                controlObj.multidropdownlistid('search_f_ly_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_lyid);

                that._pr_searchcontent.type2.f_cbbhid = '';
                controlObj.multidropdownlistid('search_f_cbbh_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_cbbhid);


                that._pr_searchcontent.type2.f_khfzid = '';
                controlObj.multidropdownlistid('search_f_khfz_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_khfzid);

                that._pr_searchcontent.type2.f_yhfzid = '';
                controlObj.multidropdownlistid('search_f_yhfz_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_yhfzid);

                that._pr_searchcontent.type2.f_sbfzid = '';
                controlObj.multidropdownlistid('search_f_sbfz_tbl_ld_ickss_list', that._pr_searchcontent.type2.f_sbfzid);

                that._pr_searchcontent.type2.f_dkrqfrom = ('1900-01-01 00:00:00');
                that._pr_searchcontent.type2.f_dkrqto = ('1900-01-01 00:00:00');
                controlObj.datetime('search_f_dkrq_tbl_ld_ickss_list_datefrom', 'search_f_dkrq_tbl_ld_ickss_list_timefrom', that._pr_searchcontent.type2.f_dkrqfrom);
                controlObj.datetime('search_f_dkrq_tbl_ld_ickss_list_dateto', 'search_f_dkrq_tbl_ld_ickss_list_timeto', that._pr_searchcontent.type2.f_dkrqto);

           

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
       
        if (that._pr_searchtime != undefined && that._pr_searchtime.f_xkrqfrom != undefined && that._pr_searchtime.f_xkrqto != undefined)
        {
            whereClause += "( ( f_xiekrq >= to_date('" + that._pr_searchtime.f_xkrqfrom + "','yyyy-MM-dd hh24:mi:ss') ";
            whereClause += "  and f_xiekrq <= to_date('" + that._pr_searchtime.f_xkrqto + "','yyyy-MM-dd hh24:mi:ss')) ";
            whereClause += " or f_xiekrq = to_date('1900-01-01 00:00:00','yyyy-MM-dd hh24:mi:ss') ) and "

        }
        else
        {
        
            whereClause += "( ( f_xiekrq >= to_date('" + _defaultfrom + "','yyyy-MM-dd hh24:mi:ss') ";
            whereClause += "  and f_xiekrq <= to_date('" + _defaultto + "','yyyy-MM-dd hh24:mi:ss')) ";
            whereClause += " or f_xiekrq = to_date('1900-01-01 00:00:00','yyyy-MM-dd hh24:mi:ss') ) and "
        }
        

     

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

                                    whereClause += " f_yhm like '%" + vv[i] + "%' or ";

                                    whereClause += " f_jfm like '%" + vv[i] + "%' or ";

                                    whereClause += " f_dz like '%" + vv[i] + "%' or ";

                                    whereClause += " f_xkbcgsl like '%" + vv[i] + "%' or ";

                                    whereClause += " f_xkljgl like '%" + vv[i] + "%' or ";

                                    whereClause += " f_dh like '%" + vv[i] + "%' or ";

                                    whereClause += " f_dy like '%" + vv[i] + "%' or ";

                                    whereClause += " f_dyid like '%" + vv[i] + "%' or ";

                                    whereClause += " f_sc like '%" + vv[i] + "%' or ";

                                    whereClause += " f_scid like '%" + vv[i] + "%' or ";

                                    whereClause += " f_qy like '%" + vv[i] + "%' or ";

                                    whereClause += " f_qyid like '%" + vv[i] + "%' or ";

                                    whereClause += " f_pq like '%" + vv[i] + "%' or ";

                                    whereClause += " f_pqid like '%" + vv[i] + "%' or ";

                                    whereClause += " f_sbbh like '%" + vv[i] + "%' or ";

                                    whereClause += " f_sbbhid like '%" + vv[i] + "%' or ";

                                    whereClause += " f_sblx like '%" + vv[i] + "%' or ";

                                    whereClause += " f_sblxid like '%" + vv[i] + "%' or ";

                                    whereClause += " f_yslx like '%" + vv[i] + "%' or ";

                                    whereClause += " f_yslxid like '%" + vv[i] + "%' or ";

                                    whereClause += " f_lxtkhh like '%" + vv[i] + "%' or ";

                                    whereClause += " f_rs like '%" + vv[i] + "%' or ";

                                    whereClause += " f_kj like '%" + vv[i] + "%' or ";


                                    //whereClause += " to_char(f_khrq,'yyyy-MM-dd hh24:mi:ss') like '%" + vv[i] + "%' or ";

                                    whereClause += " f_sf like '%" + vv[i] + "%' or ";

                                    whereClause += " f_sl like '%" + vv[i] + "%' or ";

                                    whereClause += " f_jfdh like '%" + vv[i] + "%' or ";

                                    whereClause += " f_jfje like '%" + vv[i] + "%' or ";

                                    whereClause += " f_zt like '%" + vv[i] + "%' or ";

                                    whereClause += " f_bz like '%" + vv[i] + "%' or ";

                                    //新增


                                    whereClause += " f_ssbh like '%" + vv[i] + "%' or ";

                                    whereClause += " f_sjbh like '%" + vv[i] + "%' or ";

                                    whereClause += " f_ly like '%" + vv[i] + "%' or ";

                                    whereClause += " f_cbbh like '%" + vv[i] + "%' or ";

                                    whereClause += " f_khfz like '%" + vv[i] + "%' or ";
                                                              

                                    if (whereClause.length > 0)
                                    {
                                        whereClause = whereClause.substr(0, whereClause.length - 3);
                                    }
                                    whereClause += ") and ";
                                
                                }
                            }                           
                        }                        
                    }

                    
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


                        if (tbl_ld_ickss_list.f_yhm.length > 0)
                        {
                            whereClause += " f_yhm like '%" + tbl_ld_ickss_list.f_yhm + "%' and ";
                        }


                        if (tbl_ld_ickss_list.f_jfm.length > 0)
                        {
                            whereClause += " f_jfm like '%" + tbl_ld_ickss_list.f_jfm + "%' and ";
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


                        if (tbl_ld_ickss_list.f_sbbh.length > 0)
                        {
                            whereClause += " f_sbbh like '%" + tbl_ld_ickss_list.f_sbbh + "%' and ";
                        }


                        if (tbl_ld_ickss_list.f_sbbhid.length > 0)
                        {
                            whereClause += " f_sbbhid like '%" + tbl_ld_ickss_list.f_sbbhid + "%' and ";
                        }


                        if (tbl_ld_ickss_list.f_sblx.length > 0)
                        {
                            whereClause += " f_sblx like '%" + tbl_ld_ickss_list.f_sblx + "%' and ";
                        }


                        if (tbl_ld_ickss_list.f_sblxid.length > 0)
                        {
                            whereClause += " f_sblxid like '%" + tbl_ld_ickss_list.f_sblxid + "%' and ";
                        }


                        if (tbl_ld_ickss_list.f_yslx.length > 0)
                        {
                            whereClause += " f_yslx like '%" + tbl_ld_ickss_list.f_yslx + "%' and ";
                        }


                        if (tbl_ld_ickss_list.f_yslxid.length > 0)
                        {
                            whereClause += " f_yslxid like '%" + tbl_ld_ickss_list.f_yslxid + "%' and ";
                        }


                        if (tbl_ld_ickss_list.f_lxtkhh.length > 0)
                        {
                            whereClause += " f_lxtkhh like '%" + tbl_ld_ickss_list.f_lxtkhh + "%' and ";
                        }


                        if (tbl_ld_ickss_list.f_rs.length > 0)
                        {
                            whereClause += " f_rs like '%" + tbl_ld_ickss_list.f_rs + "%' and ";
                        }


                        if (tbl_ld_ickss_list.f_kj.length > 0)
                        {
                            whereClause += " f_kj like '%" + tbl_ld_ickss_list.f_kj + "%' and ";
                        }



                        //if (tbl_ld_ickss_list.f_dkrqfrom != '1900-01-01 00:00:00')
                        //{
                        //    var date = tbl_ld_ickss_list.f_dkrqfrom.toDateTime().Format("yyyy-MM-dd") + " 23:59:59";
                        //    whereClause += " f_xkrq >= to_date('" + date + "','yyyy-MM-dd hh24:mi:ss') and ";
                        //}

                        //if (tbl_ld_ickss_list.f_dkrqto != '1900-01-01 00:00:00')
                        //{
                        //    var date = tbl_ld_ickss_list.f_dkrqto.toDateTime().Format("yyyy-MM-dd") + " 23:59:59";
                        //    whereClause += " f_xkrq <= to_date('" + date + "','yyyy-MM-dd hh24:mi:ss') and ";
                        //}

                      

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


                        if (tbl_ld_ickss_list.f_ztid.length > 0)
                        {
                            var elementArray = tbl_ld_ickss_list.f_ztid.split(',');
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


                        if (tbl_ld_ickss_list.f_bz.length > 0)
                        {
                            whereClause += " f_bz like '%" + tbl_ld_ickss_list.f_bz + "%' and ";
                        }

                        //新增

                        if (tbl_ld_ickss_list.f_ssbh.length > 0)
                        {
                            whereClause += " f_ssbh like '%" + tbl_ld_ickss_list.f_ssbh + "%' and ";
                        }


                        if (tbl_ld_ickss_list.f_sjbh.length > 0)
                        {
                            whereClause += " f_sjbh like '%" + tbl_ld_ickss_list.f_sjbh + "%' and ";
                        }


                        if (tbl_ld_ickss_list.f_lyid.length > 0)
                        {
                            var elementArray = tbl_ld_ickss_list.f_lyid.split(',');
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

                        if (tbl_ld_ickss_list.f_cbbhid.length > 0)
                        {
                            var elementArray = tbl_ld_ickss_list.f_cbbhid.split(',');
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


                        if (tbl_ld_ickss_list.f_khfzid.length > 0)
                        {
                            var elementArray = tbl_ld_ickss_list.f_khfzid.split(',');
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
                                whereClause += "((','||f_khfzid||',') like ('%,'||'" + elementArray[i] + "'||',%')) ";

                            });
                            whereClause += ') and ';
                        }

                        if (tbl_ld_ickss_list.f_yhfzid.length > 0)
                        {
                            var elementArray = tbl_ld_ickss_list.f_yhfzid.split(',');
                            var aaa = '';
                            $.each(elementArray, function (i, u)
                            {
                                if (i == 0)
                                {
                                    aaa += ' ';
                                }
                                else
                                {
                                    aaa += ' or ';
                                }
                                aaa += "((','||f_yhfzid||',') like ('%,'||'" + elementArray[i] + "'||',%')) ";
                            });
                            aaa = " f_khbhid in (select sys_id from tbl_ld_khb where " + aaa + ")";
                            whereClause += '(';
                            whereClause += aaa;
                            whereClause += ') and ';
                        }
                        if (tbl_ld_ickss_list.f_sbfzid.length > 0)
                        {
                            var elementArray = tbl_ld_ickss_list.f_sbfzid.split(',');
                            var aaa = '';
                            $.each(elementArray, function (i, u)
                            {
                                if (i == 0)
                                {
                                    aaa += ' ';
                                }
                                else
                                {
                                    aaa += ' or ';
                                }
                                aaa += "((','||f_sbfzid||',') like ('%,'||'" + elementArray[i] + "'||',%')) ";
                                aaa = " f_khbhid in (select sys_id from tbl_ld_khb where " + aaa + ")";
                                whereClause += '(';
                                whereClause += aaa;
                                whereClause += ') and ';
                            });

                        }

                      
                    }
                  
                }
                break;
        }


        if (whereClause.length > 0)
        {
            whereClause = whereClause.substr(0, whereClause.length - 4);
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

                    switch (that._pr_listtype)
                    {
                        case "1":
                            if (row.f_lyid == '05930004')
                            {
                                return {
                                    disabled: true
                                }
                            }
                            //switch (_isadmin + "_" + _isyouchu + "_" + _isyingyeting)
                            //{
                            //    case "0_1_1"://管理员
                            //        {
                                        //根据gridselectids给Grid设置选中项
                                        //编辑模式
                                        if (row.f_ztid == '2' || row.f_ztid == '9' || row.f_ztid == '3' || row.f_ztid == '4')
                                        {
                                            return {
                                                disabled: true
                                            }
                                        }
                                        else
                                        {
                                            if (('^' + that._pr_gridselectids + '^').indexOf('^' + row.sys_id + '^') > -1)
                                            {
                                                return {
                                                    disabled: false,
                                                    checked: true
                                                }
                                            }
                                        }
                                    //}
                            //        break;
                            //    case "1_0_1"://邮储
                            //        {
                            //            return {
                            //                disabled: true
                            //            };
                            //        }
                            //        break;
                            //    case "1_1_0"://营业厅
                            //        {
                            //            return {
                            //                disabled: true
                            //            };
                            //        }
                            //        break;
                            //}
                            break;
                        case "2":
                            {
                                return {
                                    disabled: true
                                };
                            }
                            break;
                    }





                    //制度模式

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
                title: "排污费",
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
                title: "客户原调价结转排污费",
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
                title: "使用调价结转排污费",
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
                title: "使用后调价结转排污费",
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

                columnObj = columnHashMap.get('f_bz');
                columnObj["class"] = '';
                columnsarray.push(columnObj);

            }
            columnsarray.push({
                    field: '', title: '操作',
                    align: 'center', valign: 'middle', sortable: false, clickToSelect: false,
                    formatter: function (value, row, index)
                    {
                        switch (that._pr_listtype)
                        {
                            case "1":
                                switch (_isadmin + "_" + _isyouchu + "_" + _isyingyeting)
                                {
                                    case "0_1_1"://管理员
                                        {
                                            return [
                               '<a class="view ml10" href="javascript:void(0)" title="编辑">',
                               '<i class="glyphicon glyphicon-edit"></i>',
                               '</a>'
                                            ].join('');
                                        }
                                        break;
                                    case "1_0_1"://邮储
                                        {

                                            //0：新建。1：寻卡。
                                            //2：写卡，3：写卡退狗，4：退狗，9作废
                                            if (row.f_ztid == '2' || row.f_ztid == '9' || row.f_ztid == '3' || row.f_ztid == '4')
                                            {
                                                return [
                               '<a class="view ml10" href="javascript:void(0)" title="浏览">',
                               '<i class="glyphicon glyphicon-eye-open"></i>',
                               '</a>'
                                                ].join('');
                                            }
                                            else
                                            {
                                                return [
                               '<a class="edit ml10" href="javascript:void(0)" title="编辑">',
                               '<i class="glyphicon glyphicon-edit"></i>',
                               '</a>'
                                                ].join('');
                                            }

                                           
                                        }
                                        break;
                                    case "1_1_0"://营业厅
                                        {
                                            return [
                               '<a class="view ml10" href="javascript:void(0)" title="编辑">',
                               '<i class="glyphicon glyphicon-edit"></i>',
                               '</a>'
                                            ].join('');
                                        }
                                        break;
                                }


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
                    that.sumGrid();
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

     //列显示弹出页
    initDetailControlShowColumn = function (callBackFunction)
    {
        try
        {

            var codeservice_ickss = _baseCodeHashMap.get('codeservice_ickss');


            controlObj.multidropdownlistinit('model_dropdown_f_checklist_tbl_ld_ickss_query_showcolumnlist', codeservice_ickss, null);
            //controlObj.checklistinit('model_dropdown_f_checklist_tbl_ld_kh_query_showcolumnlist', codeservice_0814, null, { width: '120' });

            //模态窗口
            $('#div_modal_tbl_ld_ickss_query_showcolumnlist').modal({
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

                                                        _validateMessage_search = new validateMessage('btn_search_modal_search_tbl_ld_ickss_list');

                                                        _validateMessage_searchtime = new validateMessage('btn_searchtime_modal_search_tbl_ld_ickss_list');

                                                      
                                                        _ladda_btn_command_delete = Ladda.create('btn_command_delete_tbl_ld_ickss_list');
                                                        _ladda_btn_command_exp = Ladda.create('btn_command_export_tbl_ld_ickss_list');
                                                        _ladda_btn_command_his = Ladda.create('btn_command_his_tbl_ld_ickss_list');
                                                        _ladda_btn_command_showcolunm = Ladda.create('btn_command_showcolunm_tbl_ld_ickss_query_list');

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

                if (_whereClauseString == null || _whereClauseString == "")
                {
                    _whereClauseString += " 1=1 ";
                }
                

                switch (_isadmin + "_" + _isyouchu + "_" + _isyingyeting)
                {
                    case "0_1_1"://管理员
                        {

                        }
                        break;
                    case "1_0_1"://邮储
                        {
                            _whereClauseString += " and f_lyid='05930001'"
                            _whereClauseString += " and sys_creatuserid='" + basePageObj._userInfoJson.sys_userid + "'"
                        }
                        break;
                    case "1_1_0"://营业厅
                        {
                            _whereClauseString += " and f_lyid='05930002'"
                            _whereClauseString += " and sys_creatuserid='" + basePageObj._userInfoJson.sys_userid + "'"
                        }
                        break;
                }




                var orderByString = ' sys_id desc';
                var columnsString = 'f_value1^f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^f_khbh^f_khbhid^f_yhbh^f_yhbhid^f_yhm^f_jfm^f_dz^f_dh^f_dy^f_dyid^f_sc^f_scid^f_qy^f_qyid^f_pq^f_pqid^f_sbbh^f_sbbhid^f_sblx^f_sblxid^f_yslx^f_yslxid^f_lxtkhh^f_rs^f_kj^f_khrq^f_sf^f_sl^f_jfdh^f_jfje^f_zt^f_ztid^f_bz^f_ssbh^f_sjbh^f_khfz^f_khfzid^f_cbbh^f_cbbhid^f_dj^f_pwf^f_ysje^f_jmhysje^f_khytjjzsf^f_khytjjzpwf^f_sfsytjjz^f_sytjjzsf^f_sytjjzpwf^f_syhtjjzsf^f_syhtjjzpwf^f_khyye^f_sfsyye^f_syye^f_yhye^f_shys^f_shss^f_shzl^f_shssdx^f_jffs^f_jffsid^f_xkmsid^f_yyt^f_yytid^f_kplb^f_kplbid^f_xkljgl^f_xkgscs^f_xiekrq^f_lyid^f_ly^f_xkr^f_xkrq^f_xiekr^f_xklx^f_xkkh^f_xkbcgsl^f_xkms^f_xkjzlx^f_port^f_dkkh^f_dkbcgsl^f_dkgscs^f_dkljgl^f_dkjzlx^f_dksbzt^f_sfjl^sys_id';

                var data = {
                    whereString: _whereClauseString,
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

        /* 
*  
*  方法:sumGrid
*  参数:callBackFunction
*  根据_whereClauseString，_pageSize，_pr_gridpageindex绑定数据
*/
        sumGrid: function (callBackFunction)
        {
            setTimeout(function ()
            {


                if (_whereClauseString == null || _whereClauseString == "")
                {
                    _whereClauseString += " 1=1 ";
                }


                switch (_isadmin + "_" + _isyouchu + "_" + _isyingyeting)
                {
                    case "0_1_1"://管理员
                        {

                        }
                        break;
                    case "1_0_1"://邮储
                        {
                            _whereClauseString += " and f_lyid='05930001'"
                            _whereClauseString += " and sys_creatuserid='" + basePageObj._userInfoJson.sys_userid + "'"
                        }
                        break;
                    case "1_1_0"://营业厅
                        {
                            _whereClauseString += " and f_lyid='05930002'"
                            _whereClauseString += " and sys_creatuserid='" + basePageObj._userInfoJson.sys_userid + "'"
                        }
                        break;
                }

                var sumString = 'f_sl^f_sf^f_pwf^f_shss';
                var data = {
                    whereString: _whereClauseString,
                    sumString: sumString,
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
                doAjaxFunction(_serviceUrl, 'SumList', data, {
                    success: function (result)
                    {
                        var messageJson = (new Function("", "return " + result))();
                        $("#sumsllj").html("<strong>本期水量合计:</strong>" + messageJson.f_sllj);
                        $("#sumsflj").html("<strong>水费合计:</strong>" + messageJson.f_sflj);
                        $("#sumpwflj").html("<strong>排污费合计:</strong>" + messageJson.f_pwflj);
                        $("#sumshss").html("<strong>算后实收合计:</strong>" + messageJson.f_shss);
                    },
                    fail: function (message)
                    {
                        _alertMessage.show("获取合计行时出现错误" + message, "fail");
                    }
                });
            }, 0);
        },
        //---------------------------------------------------------------------------------
        // ---------------------------------按钮------------------------------------------
        //---------------------------------------------------------------------------------


       


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

                //选中有非读卡状态
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
                                if (that._pr_searchhis == 'false')
                                {
                                    data["cxzxsjString"] = "false";
                                }
                                else
                                {
                                    data["cxzxsjString"] = "true";
                                }
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
                            },
                            fail: function (message)
                            {
                                _alertMessage.show('获取数据失败', 'fail');
                                _resultMessage.show(message);
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
                _alertMessage.show('查询失败', 'fail');
                _resultMessage.show(ex.message);
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
                        fail: function (message)
                        {
                            if (message == '')
                            {
                                _alertMessage.show('校验不通过', 'warning');
                            }
                            else
                            {
                                _alertMessage.show('校验失败', 'fail');
                                _resultMessage.show(message);
                            }

                        }
                    });
                },
                fail: function (message)
                {
                    _alertMessage.show('获取数据失败', 'fail');
                    _resultMessage.show(message);
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
            _validateMessage_search.hidden();
            $('#div_search_modal_tbl_ld_ickss_list').modal('hide');

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
        btn_command_searchtime_onclick: function ()
        { 
            $('#div_searchtime_modal_tbl_ld_ickss_list').modal('show');
        },

        /* 
*  
*  方法:btn_search_modal_search_onclick
*  参数:
*  根据查询条件的录入情况构造_whereClauseString,清空分页情况和选中情况，重新绑定。
*  主要是响应“高级查询”按钮的事件
*/
        btn_searchtime_modal_search_onclick: function ()
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

                                    $('#div_searchtime_modal_tbl_ld_ickss_list').modal('hide')

                                    that.bindGrid();
                                }
                            });
                        },
                        fail: function (message)
                        {
                            if (message == '')
                            {
                                _alertMessage.show('校验不通过', 'warning');
                            }
                            else
                            {
                                _alertMessage.show('校验失败', 'fail');
                                _resultMessage.show(message);
                            }

                        }
                    });
                },
                fail: function (message)
                {
                    _alertMessage.show('获取数据失败', 'fail');
                    _resultMessage.show(message);
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
        btn_searchtime_modal_cancle_onclick: function ()
        {
            _validateMessage_searchtime.hidden();
            $('#div_searchtime_modal_tbl_ld_ickss_list').modal('hide');

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
        },
        ////旧导出
        //btn_command_export_onclick: function ()
        //{
        //    _ladda_btn_command_exp.start();
        //    var data = {
        //        whereString: _whereClauseString,
        //        clientInf: _clientInf
        //    };
        //    doAjaxFunction(_serviceUrl, 'Export', data, {
        //        success: function (message)
        //        {
        //            _ladda_btn_command_exp.stop();
        //            window.open(message, "_blank", "");
        //        },
        //        fail: function (message)
        //        {
        //            _ladda_btn_command_exp.stop();
        //            _alertMessage.show('导出失败', 'fail');
        //            _resultMessage.show(message);
        //        },
        //        error: function (message)
        //        {
        //            _ladda_btn_command_download.stop();
        //            _alertMessage.show('数据导出失败', 'fail');
        //            _resultMessage.show(message);
        //        }
        //    });
        //},
        //导出
        btn_command_export_onclick: function ()
        {

            _ladda_btn_command_exp.start();
            var column = getCookie('tbl_ld_ickss_query_list_column');
            var columnname = getCookie('tbl_ld_ickss_query_list_columnname');
            var where = '';
            if (_whereClauseString == "")
            {
                where = " 1=1";
            }
            else
            {
                where = _whereClauseString;
            }
            var orderByString = ' sys_id desc';
            if (column != null && columnname != null && column != "" && columnname != "")
            {
                var columnsString = column;
                var colunmsName = columnname;
            }
            else
            {
            var columnsString = 'f_ssbh,f_khbh,f_yhm,f_dz,f_dh,f_dkgscs,f_dkljgl,f_xiekrq,f_yslx,f_sl,f_shys,f_zt,f_bz';
            var colunmsName = '售水编号,客户编号,用户名,地址,电话,购水次数,累计购量,购水时间,用水类型,水量,算后应收,状态,备注';
            }
            var data = {
                whereString: where,
                orderByString:orderByString,
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
                    _ladda_btn_command_exp.stop();
                    window.open(message, "_blank", "");
                },
                fail: function (message)
                {
                    _ladda_btn_command_exp.stop();
                    _alertMessage.show('数据导出失败', 'fail');
                    _resultMessage.show(message);
                },
                error: function (message)
                {
                    _ladda_btn_command_exp.stop();
                    _alertMessage.show('数据导出失败', 'fail');
                    _resultMessage.show(message);
                }
            });
        },


        //列显示
        btn_command_showcolunm_onclick: function ()
        {
            _ladda_btn_command_showcolunm.start();
            var column = getCookie('tbl_ld_ickss_query_list_column');
            if (column != null && column != 'undefined' && column != "")
            {

                //controlObj.checklistid('model_dropdown_f_checklist_tbl_ld_kh_query_showcolumnlist', column);

                controlObj.multidropdownlistid('model_dropdown_f_checklist_tbl_ld_ickss_query_showcolumnlist', column);
            }
            $('#div_modal_tbl_ld_ickss_query_showcolumnlist').modal('show');
        },
        //列显示取消按钮
        btn_showcolumn_modal_cancle_onclick: function ()
        {
            $('#div_modal_tbl_ld_ickss_query_showcolumnlist').modal('hide');
            _ladda_btn_command_showcolunm.stop();
        },
        //列显示确定按钮
        btn_showcolumn_modal_save_onclick: function ()
        {
            //var column = controlObj.checklistid('model_dropdown_f_checklist_tbl_ld_kh_query_showcolumnlist');
            //var columnname = controlObj.checklist('model_dropdown_f_checklist_tbl_ld_kh_query_showcolumnlist');
            var column = controlObj.multidropdownlistid('model_dropdown_f_checklist_tbl_ld_ickss_query_showcolumnlist');
            var columnname = controlObj.multidropdownlist('model_dropdown_f_checklist_tbl_ld_ickss_query_showcolumnlist');
            setCookieMinutes("tbl_ld_ickss_query_list_column", column, 5256000);
            setCookieMinutes("tbl_ld_ickss_query_list_columnname", columnname, 5256000);
            $("#table_grid_tbl_ld_ickss_list").bootstrapTable('destroy');
            initGrid({
                success: function ()
                {
                    that.bindGrid({
                        success: function ()
                        {
                            $('#div_modal_tbl_ld_ickss_query_showcolumnlist').modal('hide');
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
        //历史库切换功能
        btn_command_his_onclick: function ()
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
          
            _ladda_btn_command_his.start();
            getSearchModel({
                success: function ()
                {
                    checkSearchModel({
                        success: function ()
                        {
                            creatWhereClause({
                                success: function ()
                                {                                

                                    that.bindGrid({
                                        success: function ()
                                        {
                                            _ladda_btn_command_his.stop();
                                        }, fail: function (message)
                                        {
                                            _ladda_btn_command_his.stop();
                                            _alertMessage.show('绑定失败', 'fail');
                                            _resultMessage.show(message);
                                        }
                                    });
                                   
                                }
                            });
                        },
                        fail: function (message)
                        {
                            if (message == '')
                            {
                                _alertMessage.show('校验不通过', 'warning');
                            }
                            else
                            {
                                _alertMessage.show('校验失败', 'fail');
                                _resultMessage.show(message);
                            }
                            _ladda_btn_command_his.stop();
                        }
                    });
                },
                fail: function (message)
                {
                    _alertMessage.show('获取数据失败', 'fail');
                    _resultMessage.show(message);

                    _ladda_btn_command_his.stop();
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
    tbl_ld_ickss_list_Obj.init();
});



