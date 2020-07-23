


var _clientInf = '{userid="",appcode="54",appname="",userip="",usermac="",username=""}';
var _blockMessage = null;
var _alertMessage = null;
var _resultMessage = null;
var _confirmMessage = null;

var tbl_ld_jfb_list_Obj = (function ()
{
    'use strict';

    //=================================================================================
    //                                      私有
    //=================================================================================
    //=================================================================================
    //                                      私有属性 
    //=================================================================================

    var _serviceUrl = '//127.0.0.1/sara.dd.ldsw/service/service_tbl_ld_jfb.asmx/',
        //Grid控件的分页参数，设置为空即可实现不分页
        _pageSize = '20',
        _isPage = true,
        //Code数据存储容器
        _baseCodeHashMap = null,
        //校验结果容器
        _validateMessage = null,
        _validateMessage_searchtime = null,
        //按钮工具
        _ladda_btn_command_new = null,
        _ladda_btn_command_delete = null,
        _ladda_btn_command_exp = null,
        _ladda_btn_command_his = null,
        _ladda_btn_command_showcolunm = null,
        //查询sql语句
        _whereClauseString = '',

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

                that._pr_isadmin = requestQuery('isadmin');
                that._pr_ly = requestQuery('ly');
                that._pr_zt = requestQuery('zt');

                that._pr_listtype = requestQuery('listtype');
                that._pr_appcode = requestQuery('appcode');
                that._pr_gridselectids = requestQuery('gridselectids');
                that._pr_gridpageindex = requestQuery('gridpageIndex');
                that._pr_searchtype = requestQuery('searchtype');
                that._pr_searchtime = requestQuery('searchtime');
                that._pr_searchcontent = requestQuery('searchcontent');
                that._pr_searchhis = requestQuery('searchhis');
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

                if (that._pr_searchtype == null || that._pr_searchtype == '' || that._pr_searchtype == 'null')
                {
                    that._pr_searchtype = '1';
                }

                switch (that._pr_searchtype)
                {
                    case "1":
                        $('#btn_command_search_tbl_ld_jfb_list').html('简单查询');
                        $('#txt_command_search_tbl_ld_jfb_list').removeAttr("disabled");

                        break;
                    case "2":
                        $('#btn_command_search_tbl_ld_jfb_list').html('高级查询');
                        $('#txt_command_search_tbl_ld_jfb_list').attr("disabled", true);
                        break;
                }

                if (that._pr_searchtime == null || that._pr_searchtime == '' || that._pr_searchtime == 'null')
                {
                    that._pr_searchtime = { "f_jfrqfrom": _defaultfrom, "f_jfrqto": _defaultto };
                }
                else
                {
                    that._pr_searchtime = (new Function("", "return " + that._pr_searchtime))();
                }

                if (that._pr_searchhis == null || that._pr_searchhis == '' || that._pr_searchhis == 'null')
                {
                    that._pr_searchhis = 'false';
                }
                if (that._pr_isadmin == null || that._pr_isadmin == '' || that._pr_isadmin == 'null')
                {
                    that._pr_isadmin = '1';
                }


                if (that._pr_ly == null || that._pr_ly == '' || that._pr_ly == 'null')
                {
                    that._pr_ly = '';
                }
                if (that._pr_zt == null || that._pr_zt == '' || that._pr_zt == 'null')
                {
                    that._pr_zt = '';
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
                //增加对历史库查询角色2021的验证，如果用户具备这个角色，则可以查询历史库，否则不能查询
                if (("^" + basePageObj._userInfoJson.sys_roles + "^").indexOf('^2021^') <= -1)
                {
                    $('#btn_command_his_tbl_ld_jfb_list').addClass('hidden');
                }
                else
                {
                    $('#btn_command_his_tbl_ld_jfb_list').removeClass('hidden');
                }
                if (that._pr_zt == '0')
                {
                    $('#querydate').addClass('hidden');
                }
                if (isDisable)
                {
                    $('#btn_command_delete_tbl_ld_jfb_list').addClass('hidden');
                    $('#btn_command_new_tbl_ld_jfb_list').addClass('hidden');
                    $('#btn_command_export_tbl_ld_jfb_list').removeClass('hidden');
                }
                else
                {
                    switch (that._pr_isadmin)
                    {
                        case '1':
                            switch (that._pr_ly)
                            {
                                case '08080003':
                                    $('#btn_command_export_tbl_ld_jfb_list').removeClass('hidden');
                                    $('#btn_command_delete_tbl_ld_jfb_list').removeClass('hidden');
                                    break;
                                case '08080002':
                                    $('#btn_command_export_tbl_ld_jfb_list').removeClass('hidden');
                                    if (that._pr_zt == '0')
                                    {
                                        $('#btn_command_delete_tbl_ld_jfb_list').removeClass('hidden');
                                    }
                                    else
                                    {
                                        $('#btn_command_delete_tbl_ld_jfb_list').addClass('hidden');
                                    }
                                    break;
                            }
                            break;
                        case '0':
                            $('#btn_command_export_tbl_ld_jfb_list').removeClass('hidden');
                            $('#btn_command_delete_tbl_ld_jfb_list').removeClass('hidden');
                            break;
                    }

                    $('#btn_command_new_tbl_ld_jfb_list').addClass('hidden');
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
            var url = '../tbl_ld_jfb/tbl_ld_jfb_detail.html';
            url += '?uid=' + basePageObj._userInfoJson.sys_userid;
            url += '&sys_id=' + id;
            url += '&pagetype=' + pagetype;
            url += '&isadmin=' + that._pr_isadmin + '';
            url += '&appcode=' + that._pr_appcode;
            url += '&fromurl=../tbl_ld_jfb/tbl_ld_jfb_list.html';
            url += '&fromurlparam={';
            url += '"appcode":"' + that._pr_appcode + '",';
            url += '"listtype":"' + that._pr_listtype + '",';
            url += '"isadmin":"' + that._pr_isadmin + '",';
            url += '"ly":"' + that._pr_ly + '",';
            url += '"zt":"' + that._pr_zt + '",';
            url += '"gridselectids":"' + that._pr_gridselectids + '",';
            url += '"gridpageindex":"' + that._pr_gridpageindex + '",';
            url += '"searchhis":"' + that._pr_searchhis + '",';
            url += '"searchtype":"' + that._pr_searchtype + '",';
            url += '"searchcontent":' + JSON.stringify(that._pr_searchcontent) + ',';
            url += '"searchtime":' + JSON.stringify(that._pr_searchtime) + '';
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

            codeServiceId += "0576^";

            codeServiceId += "0574^";

            codeServiceId += "0575^";
            codeServiceId += "0798^";
            codeServiceId += "0808^";

            codeServiceId = codeServiceId.trimEnd('^');
            commonObj.getCodeServiceJson(codeServiceId, {
                success: function (resultArray)
                {
                    try
                    {
                        _baseCodeHashMap = new hashMap();
                        var codenull = [];
                        _baseCodeHashMap.put('codeservice_0513', codenull);

                        _baseCodeHashMap.put('codeservice_0514', codenull);

                        _baseCodeHashMap.put('codeservice_0515', codenull);

                        _baseCodeHashMap.put('codeservice_0576', resultArray['0576']);

                        _baseCodeHashMap.put('codeservice_0574', resultArray['0574']);

                        _baseCodeHashMap.put('codeservice_0575', resultArray['0575']);
                        _baseCodeHashMap.put('codeservice_0798', resultArray['0798']);
                        _baseCodeHashMap.put('codeservice_0808', resultArray['0808']);


                        if (commonObj._jtsjflag)
                        {
                            var columnsArray = [
                                { "id": "f_khbh", "text": "客户编号" },
                                { "id": "f_jfbh", "text": "缴费编号" },
                                { "id": "f_sjbh", "text": "收据编号" },
                                { "id": "f_sbbh", "text": "水表编号" },
                                { "id": "f_cbbh", "text": "抄表编号" },
                                { "id": "f_lxtkhh", "text": "老系统客户号" },
                                { "id": "f_jfrq", "text": "缴费日期" },
                                { "id": "f_jffs", "text": "缴费方式" },
                                { "id": "f_yyt", "text": "营业厅" },
                                { "id": "f_yyy", "text": "	营业员" },
                                { "id": "f_czsj", "text": "操作时间" },
                                { "id": "f_sfykfp", "text": "是否已开发票" },
                                { "id": "f_yhbh", "text": "用户编号" },
                                { "id": "f_yhm", "text": "用户名" },
                                { "id": "f_jfm", "text": "缴费名" },
                                { "id": "f_khfz", "text": "客户分组" },
                                { "id": "f_dz", "text": "地址" },
                                { "id": "f_dh", "text": "电话" },
                                { "id": "f_dy", "text": "地域" },
                                { "id": "f_sc", "text": "水厂" },
                                { "id": "f_qy", "text": "区域" },
                                { "id": "f_pq", "text": "片区" },
                                { "id": "f_yslx", "text": "用水类型" },
                                { "id": "f_sblx", "text": "水表类型" },
                                { "id": "f_rs", "text": "人数" },
                                { "id": "f_jcfs", "text": "缴存方式" },
                                { "id": "f_cbyslj", "text": "抄表应收累计" },
                                { "id": "f_sllj", "text": "水量累计" },
                                { "id": "f_sflj", "text": "水费累计" },
                                { "id": "f_pwflj", "text": "污水处理费累计" },
                                { "id": "f_jmhyslj", "text": "减免后应收累计" },
                                { "id": "f_khytjjzsf", "text": "客户原调价结转水费" },
                                { "id": "f_khytjjzpwf", "text": "客户原调价结转污水处理费" },
                                { "id": "f_sfsytjjz", "text": "是否使用调价结转" },
                                { "id": "f_khyye", "text": "客户原绿化表押金" },
                                { "id": "f_sfsyye", "text": "是否使用绿化表押金" },
                                { "id": "f_syye", "text": "使用绿化表押金" },
                                { "id": "f_yhye", "text": "用后绿化表押金" },
                                { "id": "f_dyjtsl", "text": "第一阶梯水量" },
                                { "id": "f_dyjtsf", "text": "第一阶梯水费" },
                                { "id": "f_dejtsl", "text": "第二阶梯水量" },
                                { "id": "f_dejtsf", "text": "第二阶梯水费" },
                                { "id": "f_dsjtsl", "text": "第三阶梯水量" },
                                { "id": "f_dsjtsf", "text": "第三阶梯水费" },
                                { "id": "f_khyycje", "text": "客户原余额" },
                                { "id": "f_sfsyycje", "text": "是否使用余额" },
                                { "id": "f_syycje", "text": "使用余额" },
                                { "id": "f_yhycje", "text": "用后余额" },
                                { "id": "f_dszycje", "text": "多收转预存金额" },
                                { "id": "f_shys", "text": "算后应收" },
                                { "id": "f_shss", "text": "算后实收" },
                                //{ "id": "f_hszl", "text": "算后找零" },
                                { "id": "f_cbenbh", "text": "抄本编号" },
                                { "id": "f_ljqf", "text": "累计欠费" },
                                { "id": "f_kplb", "text": "开票类别" },
                                { "id": "f_sytjjzsf", "text": "使用调价结转水费" },
                                { "id": "f_sytjjzpwf", "text": "使用调价结转污水处理费" },
                                { "id": "f_syhtjjzsf", "text": "使用后调价结转水费" },
                                { "id": "f_syhtjjzpwf", "text": "使用后调价结转污水处理费" },
                                { "id": "f_jmjelj", "text": "减免金额累计" },
                                { "id": "f_ly", "text": "来源" },
                                { "id": "f_zt", "text": "状态" },
                                { "id": "f_dj", "text": "单价" },
                                { "id": "f_bz", "text": "备注" },
                                { "id": "f_value1", "text": "交行对账状态" },
                                { "id": "f_value2", "text": "交行订单号" },
                                { "id": "f_sfjl", "text": "单价明细" },
                                { "id": "f_yqjmsf", "text": "疫情减免水费" },
                                { "id": "f_yqjmpwf", "text": "疫情减免污水处理费" },
                                { "id": "f_yqjmsfbfb", "text": "疫情减免水费百分比" },
                                { "id": "f_yqjmpwfbfb", "text": "疫情减免污水处理费百分比" },
                                { "id": "f_yqjmsfje", "text": "疫情减免水费金额" },
                                { "id": "f_yqjmpwfje", "text": "疫情减免污水处理费金额" }
                            ];
                        }
                        else
                        {
                            var columnsArray = [
                                { "id": "f_khbh", "text": "客户编号" },
                                { "id": "f_jfbh", "text": "缴费编号" },
                                { "id": "f_sjbh", "text": "收据编号" },
                                { "id": "f_sbbh", "text": "水表编号" },
                                { "id": "f_cbbh", "text": "抄表编号" },
                                { "id": "f_lxtkhh", "text": "老系统客户号" },
                                { "id": "f_jfrq", "text": "缴费日期" },
                                { "id": "f_jffs", "text": "缴费方式" },
                                { "id": "f_yyt", "text": "营业厅" },
                                { "id": "f_yyy", "text": "	营业员" },
                                { "id": "f_czsj", "text": "操作时间" },
                                { "id": "f_sfykfp", "text": "是否已开发票" },
                                { "id": "f_yhbh", "text": "用户编号" },
                                { "id": "f_yhm", "text": "用户名" },
                                { "id": "f_jfm", "text": "缴费名" },
                                { "id": "f_khfz", "text": "客户分组" },
                                { "id": "f_dz", "text": "地址" },
                                { "id": "f_dh", "text": "电话" },
                                { "id": "f_dy", "text": "地域" },
                                { "id": "f_sc", "text": "水厂" },
                                { "id": "f_qy", "text": "区域" },
                                { "id": "f_pq", "text": "片区" },
                                { "id": "f_yslx", "text": "用水类型" },
                                { "id": "f_sblx", "text": "水表类型" },
                                { "id": "f_rs", "text": "人数" },
                                { "id": "f_jcfs", "text": "缴存方式" },
                                { "id": "f_cbyslj", "text": "抄表应收累计" },
                                { "id": "f_sllj", "text": "水量累计" },
                                { "id": "f_sflj", "text": "水费累计" },
                                { "id": "f_pwflj", "text": "污水处理费累计" },
                                { "id": "f_jmhyslj", "text": "减免后应收累计" },
                                { "id": "f_khytjjzsf", "text": "客户原调价结转水费" },
                                { "id": "f_khytjjzpwf", "text": "客户原调价结转污水处理费" },
                                { "id": "f_sfsytjjz", "text": "是否使用调价结转" },
                                { "id": "f_khyye", "text": "客户原绿化表押金" },
                                { "id": "f_sfsyye", "text": "是否使用绿化表押金" },
                                { "id": "f_syye", "text": "使用绿化表押金" },
                                { "id": "f_yhye", "text": "用后绿化表押金" },
                                { "id": "f_khyycje", "text": "客户原余额" },
                                { "id": "f_sfsyycje", "text": "是否使用余额" },
                                { "id": "f_syycje", "text": "使用余额" },
                                { "id": "f_yhycje", "text": "用后余额" },
                                { "id": "f_dszycje", "text": "多收转预存金额" },
                                { "id": "f_shys", "text": "算后应收" },
                                { "id": "f_shss", "text": "算后实收" },
                                //{ "id": "f_hszl", "text": "算后找零" },
                                { "id": "f_cbenbh", "text": "抄本编号" },
                                { "id": "f_ljqf", "text": "累计欠费" },
                                { "id": "f_kplb", "text": "开票类别" },
                                { "id": "f_sytjjzsf", "text": "使用调价结转水费" },
                                { "id": "f_sytjjzpwf", "text": "使用调价结转污水处理费" },
                                { "id": "f_syhtjjzsf", "text": "使用后调价结转水费" },
                                { "id": "f_syhtjjzpwf", "text": "使用后调价结转污水处理费" },
                                { "id": "f_jmjelj", "text": "减免金额累计" },
                                { "id": "f_ly", "text": "来源" },
                                { "id": "f_zt", "text": "状态" },
                                { "id": "f_dj", "text": "单价" },
                                { "id": "f_bz", "text": "备注" },
                                { "id": "f_value1", "text": "交行对账状态" },
                                { "id": "f_value2", "text": "交行订单号" },
                                { "id": "f_sfjl", "text": "单价明细" },
                                { "id": "f_yqjmsf", "text": "疫情减免水费" },
                                { "id": "f_yqjmpwf", "text": "疫情减免污水处理费" },
                                { "id": "f_yqjmsfbfb", "text": "疫情减免水费百分比" },
                                { "id": "f_yqjmpwfbfb", "text": "疫情减免污水处理费百分比" },
                                { "id": "f_yqjmsfje", "text": "疫情减免水费金额" },
                                { "id": "f_yqjmpwfje", "text": "疫情减免污水处理费金额" }
                            ];
                        }
                      
                        _baseCodeHashMap.put('codeservice_0814', columnsArray);

                        var jhztArray = [
                            { "id": "1", "text": "待对账" },
                            { "id": "2", "text": "对账正确" },
                            { "id": "3", "text": "对账错误" }];

                        var sfArray = [
                            { "id": "1", "text": "是" },
                            { "id": "2", "text": "否" }];

                        _baseCodeHashMap.put('codeservice_jhzt', jhztArray);
                        _baseCodeHashMap.put('codeservice_sf', sfArray);

                        var sqlJson = {
                            //"tbl_ldbm_yhfz": "select sys_id as id, f_fzbm||'_'||f_fzmc as text from tbl_ldbm_yhfz where sys_delflag='0' and f_ztid='0' order by sys_id",

                            //"tbl_ldbm_dycq": "select sys_id as id, f_mc as text ,sys_orderid as nodeid from tbl_ldbm_dycq where sys_delflag='0' and f_ztid='0'and length(sys_orderid)=4 order by sys_orderid",
                            "tbl_ldbm_dycq": "select sys_id as id, f_mc as text ,sys_orderid as nodeid from tbl_ldbm_dycq where sys_delflag='0' and length(sys_orderid)=4 order by sys_orderid",
                            "tbl_ld_cben": 'select sys_id as id,f_cbbh as text,f_cbymc,f_cbyid,f_cbzq,f_cbmc from tbl_ld_cben order by f_cbbh asc',
                            "tbl_ldbm_khfz": "select sys_id as id,f_fzmc as text,decode(f_ztid,'0','false','true') as disabled from tbl_ldbm_khfz where sys_delflag='0'  order by sys_id",
                            "tbl_ldbm_yhfz": "select sys_id as id,f_fzmc as text,decode(f_ztid,'0','false','true') as disabled from tbl_ldbm_yhfz where sys_delflag='0'  order by sys_id",
                            "tbl_ldbm_sbfz": "select sys_id as id,f_fzmc as text,decode(f_ztid,'0','false','true') as disabled from tbl_ldbm_sbfz where sys_delflag='0'  order by sys_id",
                            "tbl_ld_yyy": "select f_yyy as text,f_yyyid as id from tbl_ld_jfb where sys_delflag='0' group by (f_yyy,f_yyyid)"
                        }

                        commonObj.querySqls(sqlJson, {
                            success: function (messageJson)
                            {

                                // _baseCodeHashMap.put('codeservice_0511', messageJson["tbl_ldbm_yhfz"]);
                                _baseCodeHashMap.put('codeservice_0512', messageJson["tbl_ldbm_dycq"]);
                                _baseCodeHashMap.put('codeservice_cben', messageJson["tbl_ld_cben"]);
                                _baseCodeHashMap.put('codeservice_khfz', messageJson["tbl_ldbm_khfz"]);
                                _baseCodeHashMap.put('codeservice_yhfz', messageJson["tbl_ldbm_yhfz"]);
                                _baseCodeHashMap.put('codeservice_sbfz', messageJson["tbl_ldbm_sbfz"]);
                                _baseCodeHashMap.put('codeservice_yyy', messageJson["tbl_ld_yyy"]);
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

                var codeService_0512 = _baseCodeHashMap.get('codeservice_0512');

                var codeService_0513 = _baseCodeHashMap.get('codeservice_0513');

                var codeService_0514 = _baseCodeHashMap.get('codeservice_0514');

                var codeService_0515 = _baseCodeHashMap.get('codeservice_0515');

                var codeService_0576 = _baseCodeHashMap.get('codeservice_0576');

                var codeService_0574 = _baseCodeHashMap.get('codeservice_0574');

                var codeService_0575 = _baseCodeHashMap.get('codeservice_0575');

                var codeService_0798 = _baseCodeHashMap.get('codeservice_0798');
                var codeservice_cben = _baseCodeHashMap.get('codeservice_cben');
                var codeservice_khfz = _baseCodeHashMap.get('codeservice_khfz');
                var codeservice_yhfz = _baseCodeHashMap.get('codeservice_yhfz');
                var codeservice_sbfz = _baseCodeHashMap.get('codeservice_sbfz');
                var codeService_0808 = _baseCodeHashMap.get('codeservice_0808');
                var codeService_yyy = _baseCodeHashMap.get('codeservice_yyy');

                var codeService_jhzt = _baseCodeHashMap.get('codeservice_jhzt');

                var codeService_sf = _baseCodeHashMap.get('codeservice_sf');


                controlObj.datetimeinit('search_f_jfrq_tbl_ld_jfb_list_datefrom', 'search_f_jfrq_tbl_ld_jfb_list_timefrom', '1900-01-01 00:00:00');
                controlObj.datetimeinit('search_f_jfrq_tbl_ld_jfb_list_dateto', 'search_f_jfrq_tbl_ld_jfb_list_timeto', '1900-01-01 00:00:00');

                controlObj.multidropdownlistinit('search_f_zt_tbl_ld_jfb_list', codeService_0576);

                controlObj.multidropdownlistinit('search_f_jffs_tbl_ld_jfb_list', codeService_0574);

                controlObj.multidropdownlistinit('search_f_jcfs_tbl_ld_jfb_list', codeService_0575);

                controlObj.multidropdownlistinit('search_f_jhzt_tbl_ld_jfb_list', codeService_jhzt);

                controlObj.singledropdownlistinit('search_f_dy_tbl_ld_jfb_list', codeService_0512, f_dy_onchange);

                controlObj.singledropdownlistinit('search_f_sc_tbl_ld_jfb_list', codeService_0513, f_sc_onchange);

                controlObj.singledropdownlistinit('search_f_qy_tbl_ld_jfb_list', codeService_0514, f_qy_onchange);

                controlObj.singledropdownlistinit('search_f_pq_tbl_ld_jfb_list', codeService_0515, f_pq_onchange);

                //controlObj.datetimeinit('search_f_czsj_tbl_ld_jfb_list_datefrom', 'search_f_czsj_tbl_ld_jfb_list_timefrom');
                //controlObj.datetimeinit('search_f_czsj_tbl_ld_jfb_list_dateto', 'search_f_czsj_tbl_ld_jfb_list_timeto');

                //controlObj.datetime('search_f_czsj_tbl_ld_jfb_list_datefrom', 'search_f_czsj_tbl_ld_jfb_list_timefrom', str);
                //controlObj.datetime('search_f_czsj_tbl_ld_jfb_list_dateto', 'search_f_czsj_tbl_ld_jfb_list_timeto', str_end);

                controlObj.multidropdownlistinit('search_f_sfykfp_tbl_ld_jfb_list', [{ id: 'true', text: '是' }, { id: 'false', text: '否' }]);

                controlObj.multidropdownlistinit('search_f_sfsytjjz_tbl_ld_jfb_list', [{ id: 'true', text: '是' }, { id: 'false', text: '否' }]);
                controlObj.multidropdownlistinit('search_f_sfsyye_tbl_ld_jfb_list', [{ id: 'true', text: '是' }, { id: 'false', text: '否' }]);
                controlObj.multidropdownlistinit('search_f_kplb_tbl_ld_jfb_list', codeService_0798);
                controlObj.multidropdownlistinit('search_f_cbenbh_tbl_ld_jfb_list', codeservice_cben);
                controlObj.multidropdownlistinit('search_f_khfz_tbl_ld_jfb_list', codeservice_khfz);
                controlObj.multidropdownlistinit('search_f_yhfz_tbl_ld_jfb_list', codeservice_yhfz);
                controlObj.multidropdownlistinit('search_f_sbfz_tbl_ld_jfb_list', codeservice_sbfz);
                controlObj.multidropdownlistinit('search_f_ly_tbl_ld_jfb_list', codeService_0808);

                controlObj.multidropdownlistinit('search_f_yyy_tbl_ld_jfb_list', codeService_yyy);

                controlObj.singledropdownlistinit('search_f_sfjxyc_tbl_ld_jfb_list', codeService_sf);
                controlObj.singledropdownlistinit('search_f_sfsyyc_tbl_ld_jfb_list', codeService_sf);

                if (that._pr_isadmin == '0')
                {
                    $('#div_yyy_tbl_ld_jfb_list').removeClass('hidden');
                }
                else
                {
                    $('#div_yyy_tbl_ld_jfb_list').addClass('hidden');
                }
                //模态窗口
                $('#div_search_modal_tbl_ld_jfb_list').modal({
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
                    $('#btn_command_his_tbl_ld_jfb_list').removeClass('btn-default');
                    $('#btn_command_his_tbl_ld_jfb_list').addClass('btn-primary');

                    $('#btn_command_his_tbl_ld_jfb_list').text('含历史库数据');

                }
                else
                {
                    $('#btn_command_his_tbl_ld_jfb_list').addClass('btn-default');
                    $('#btn_command_his_tbl_ld_jfb_list').removeClass('btn-primary');
                    $('#btn_command_his_tbl_ld_jfb_list').text('不含历史库数据');
                }
                switch (that._pr_searchtype)
                {
                    case "1":
                        if (that._pr_searchcontent.type1 != undefined)
                        {
                            //简单查询
                            $("#txt_command_search_tbl_ld_jfb_list").val(that._pr_searchcontent.type1);
                        }

                        break;
                    case "2":
                        if (that._pr_searchcontent.type2 != undefined)
                        {
                            //高级查询
                            var tbl_ld_jfb_list = that._pr_searchcontent.type2;


                            controlObj.text('search_f_value1_tbl_ld_jfb_list', tbl_ld_jfb_list.f_value1);


                            controlObj.text('search_f_value3_tbl_ld_jfb_list', tbl_ld_jfb_list.f_value3);

                            controlObj.text('search_f_value4_tbl_ld_jfb_list', tbl_ld_jfb_list.f_value4);

                            controlObj.text('search_f_value5_tbl_ld_jfb_list', tbl_ld_jfb_list.f_value5);

                            controlObj.text('search_f_value6_tbl_ld_jfb_list', tbl_ld_jfb_list.f_value6);

                            controlObj.text('search_f_value7_tbl_ld_jfb_list', tbl_ld_jfb_list.f_value7);

                            controlObj.text('search_f_value8_tbl_ld_jfb_list', tbl_ld_jfb_list.f_value8);

                            controlObj.text('search_f_value9_tbl_ld_jfb_list', tbl_ld_jfb_list.f_value9);

                            controlObj.text('search_f_value10_tbl_ld_jfb_list', tbl_ld_jfb_list.f_value10);

                            controlObj.text('search_f_jfbh_tbl_ld_jfb_list', tbl_ld_jfb_list.f_jfbh);

                            controlObj.text('search_f_sjbh_tbl_ld_jfb_list', tbl_ld_jfb_list.f_sjbh);


                            controlObj.multidropdownlistid('search_f_jhzt_tbl_ld_jfb_list', tbl_ld_jfb_list.f_value1);

                            controlObj.singledropdownlistid('search_f_sfjxyc_tbl_ld_jfb_list', tbl_ld_jfb_list.f_sfjxyc);
                            controlObj.singledropdownlistid('search_f_sfsyyc_tbl_ld_jfb_list', tbl_ld_jfb_list.f_sfsyyc);

                            controlObj.multidropdownlistid('search_f_yyy_tbl_ld_jfb_list', tbl_ld_jfb_list.f_yyyid);



                            controlObj.multidropdownlistid('search_f_zt_tbl_ld_jfb_list', tbl_ld_jfb_list.f_ztid);

                            controlObj.text('search_f_bz_tbl_ld_jfb_list', tbl_ld_jfb_list.f_bz);

                            controlObj.text('search_f_jhddh_tbl_ld_jfb_list', tbl_ld_jfb_list.f_jhddh);

                            controlObj.text('search_f_khbh_tbl_ld_jfb_list', tbl_ld_jfb_list.f_khbh);

                            controlObj.text('search_f_khbhid_tbl_ld_jfb_list', tbl_ld_jfb_list.f_khbhid);

                            controlObj.text('search_f_yhbh_tbl_ld_jfb_list', tbl_ld_jfb_list.f_yhbh);

                            controlObj.text('search_f_yhbhid_tbl_ld_jfb_list', tbl_ld_jfb_list.f_yhbhid);

                            controlObj.text('search_f_yhm_tbl_ld_jfb_list', tbl_ld_jfb_list.f_yhm);

                            controlObj.text('search_f_jfm_tbl_ld_jfb_list', tbl_ld_jfb_list.f_jfm);

                            controlObj.text('search_f_dz_tbl_ld_jfb_list', tbl_ld_jfb_list.f_dz);

                            controlObj.text('search_f_dh_tbl_ld_jfb_list', tbl_ld_jfb_list.f_dh);
                            controlObj.singledropdownlistid('search_f_dy_tbl_ld_jfb_list', tbl_ld_jfb_list.f_dyid);

                            var dy = { "added": { "id": tbl_ld_jfb_list.f_dyid } };
                            var sc = { "added": { "id": tbl_ld_jfb_list.f_scid } };
                            var qy = { "added": { "id": tbl_ld_jfb_list.f_qyid } };
                            ////////;
                            f_dy_onchange(dy, {

                                success: function ()
                                {
                                    controlObj.singledropdownlistid('search_f_sc_tbl_ld_jfb_list', tbl_ld_jfb_list.f_scid);
                                    f_sc_onchange(sc, {
                                        success: function ()
                                        {
                                            controlObj.singledropdownlistid('search_f_qy_tbl_ld_jfb_list', tbl_ld_jfb_list.f_qyid);
                                            f_qy_onchange(qy, {
                                                success: function ()
                                                {
                                                    controlObj.singledropdownlistid('search_f_pq_tbl_ld_jfb_list', tbl_ld_jfb_list.f_pqid);
                                                }
                                            });
                                        }

                                    });
                                }
                            });

                            controlObj.text('search_f_sbbh_tbl_ld_jfb_list', tbl_ld_jfb_list.f_sbbh);

                            controlObj.text('search_f_sbbhid_tbl_ld_jfb_list', tbl_ld_jfb_list.f_sbbhid);

                            controlObj.text('search_f_yslx_tbl_ld_jfb_list', tbl_ld_jfb_list.f_yslx);

                            controlObj.text('search_f_yslxid_tbl_ld_jfb_list', tbl_ld_jfb_list.f_yslxid);

                            controlObj.text('search_f_lxtkhh_tbl_ld_jfb_list', tbl_ld_jfb_list.f_lxtkhh);

                            controlObj.text('search_f_sblx_tbl_ld_jfb_list', tbl_ld_jfb_list.f_sblx);

                            controlObj.text('search_f_sblxid_tbl_ld_jfb_list', tbl_ld_jfb_list.f_sblxid);

                            controlObj.text('search_f_rs_tbl_ld_jfb_list', tbl_ld_jfb_list.f_rs);

                            controlObj.text('search_f_cbbh_tbl_ld_jfb_list', tbl_ld_jfb_list.f_cbbh);

                            controlObj.text('search_f_cbbhid_tbl_ld_jfb_list', tbl_ld_jfb_list.f_cbbhid);




                            controlObj.text('search_f_znjbh_tbl_ld_jfb_list', tbl_ld_jfb_list.f_znjbh);

                            controlObj.text('search_f_znjbhid_tbl_ld_jfb_list', tbl_ld_jfb_list.f_znjbhid);

                            controlObj.text('search_f_znjje_tbl_ld_jfb_list', tbl_ld_jfb_list.f_znjje);

                            controlObj.text('search_f_fjbh_tbl_ld_jfb_list', tbl_ld_jfb_list.f_fjbh);

                            controlObj.text('search_f_fjbhid_tbl_ld_jfb_list', tbl_ld_jfb_list.f_fjbhid);

                            controlObj.text('search_f_fjje_tbl_ld_jfb_list', tbl_ld_jfb_list.f_fjje);


                            controlObj.multidropdownlistid('search_f_jffs_tbl_ld_jfb_list', tbl_ld_jfb_list.f_jffsid);

                            controlObj.multidropdownlistid('search_f_jcfs_tbl_ld_jfb_list', tbl_ld_jfb_list.f_jcfsid);




                            //controlObj.datetime('search_f_czsj_tbl_ld_jfb_list_datefrom', 'search_f_czsj_tbl_ld_jfb_list_timefrom', tbl_ld_jfb_list.f_czsjfrom);
                            //controlObj.datetime('search_f_czsj_tbl_ld_jfb_list_dateto', 'search_f_czsj_tbl_ld_jfb_list_timeto', tbl_ld_jfb_list.f_czsjto);

                            controlObj.multidropdownlistid('search_f_sfykfp_tbl_ld_jfb_list', tbl_ld_jfb_list.f_sfykfpid);

                            //新增
                            controlObj.text('search_f_yyt_tbl_ld_jfb_list', tbl_ld_jfb_list.f_yyt);
                            controlObj.text('search_f_yytid_tbl_ld_jfb_list', tbl_ld_jfb_list.f_yytid);
                            controlObj.text('search_f_dj_tbl_ld_jfb_list', tbl_ld_jfb_list.f_dj);
                            controlObj.text('search_f_cbyslj_tbl_ld_jfb_list', tbl_ld_jfb_list.f_cbyslj);
                            controlObj.text('search_f_sllj_tbl_ld_jfb_list', tbl_ld_jfb_list.f_sllj);
                            controlObj.text('search_f_sflj_tbl_ld_jfb_list', tbl_ld_jfb_list.f_sflj);
                            controlObj.text('search_f_pwflj_tbl_ld_jfb_list', tbl_ld_jfb_list.f_pwflj);
                            controlObj.text('search_f_jmhyslj_tbl_ld_jfb_list', tbl_ld_jfb_list.f_jmhyslj);
                            controlObj.text('search_f_khytjjzsf_tbl_ld_jfb_list', tbl_ld_jfb_list.f_khytjjzsf);
                            controlObj.text('search_f_khytjjzpwf_tbl_ld_jfb_list', tbl_ld_jfb_list.f_khytjjzpwf);

                            controlObj.multidropdownlistid('search_f_sfsytjjz_tbl_ld_jfb_list', tbl_ld_jfb_list.f_sfsytjjzid);

                            controlObj.text('search_f_sytjjzsf_tbl_ld_jfb_list', tbl_ld_jfb_list.f_sytjjzsf);
                            controlObj.text('search_f_sytjjzpwf_tbl_ld_jfb_list', tbl_ld_jfb_list.f_sytjjzpwf);
                            controlObj.text('search_f_syhtjjzsf_tbl_ld_jfb_list', tbl_ld_jfb_list.f_syhtjjzsf);
                            controlObj.multidropdownlistid('search_f_sfsyye_tbl_ld_jfb_list', tbl_ld_jfb_list.f_sfsyyeid);
                            controlObj.text('search_f_syye_tbl_ld_jfb_list', tbl_ld_jfb_list.f_syye);
                            controlObj.text('search_f_yhye_tbl_ld_jfb_list', tbl_ld_jfb_list.f_yhye);
                            controlObj.text('search_f_shys_tbl_ld_jfb_list', tbl_ld_jfb_list.f_shys);
                            controlObj.text('search_f_shss_tbl_ld_jfb_list', tbl_ld_jfb_list.f_shss);
                            controlObj.text('search_f_hszl_tbl_ld_jfb_list', tbl_ld_jfb_list.f_hszl);
                            controlObj.text('search_f_shssdx_tbl_ld_jfb_list', tbl_ld_jfb_list.f_shssdx);
                            controlObj.multidropdownlistid('search_f_khfz_tbl_ld_jfb_list', tbl_ld_jfb_list.f_khfzids);
                            controlObj.text('search_f_khfzid_tbl_ld_jfb_list', tbl_ld_jfb_list.f_khfzid);
                            controlObj.multidropdownlistid('search_f_yhfz_tbl_ld_jfb_list', tbl_ld_jfb_list.f_yhfzid);

                            controlObj.multidropdownlistid('search_f_sbfz_tbl_ld_jfb_list', tbl_ld_jfb_list.f_sbfzid);

                            controlObj.multidropdownlistid('search_f_cbenbh_tbl_ld_jfb_list', tbl_ld_jfb_list.f_cbenbhids);
                            controlObj.text('search_f_cbenbhid_tbl_ld_jfb_list', tbl_ld_jfb_list.f_cbenbhid);
                            controlObj.text('search_f_ljqf_tbl_ld_jfb_list', tbl_ld_jfb_list.f_ljqf);
                            controlObj.multidropdownlistid('search_f_kplb_tbl_ld_jfb_list', tbl_ld_jfb_list.f_kplbid);
                            controlObj.text('search_f_khyye_tbl_ld_jfb_list', tbl_ld_jfb_list.f_khyye);
                            controlObj.text('search_f_syhtjjzpwf_tbl_ld_jfb_list', tbl_ld_jfb_list.f_syhtjjzpwf);
                            controlObj.multidropdownlistid('search_f_ly_tbl_ld_jfb_list', tbl_ld_jfb_list.f_lyid);
                            controlObj.multidropdownlistid('search_f_yyy_tbl_ld_jfb_list', tbl_ld_jfb_list.f_yyyid);

                        }
                        break;
                }
                if (that._pr_searchtime != undefined && that._pr_searchtime.f_jfrqfrom != undefined && that._pr_searchtime.f_jfrqto != undefined)
                {
                    controlObj.datetime('search_f_jfrq_tbl_ld_jfb_list_datefrom', 'search_f_jfrq_tbl_ld_jfb_list_timefrom', that._pr_searchtime.f_jfrqfrom);
                    controlObj.datetime('search_f_jfrq_tbl_ld_jfb_list_dateto', 'search_f_jfrq_tbl_ld_jfb_list_timeto', that._pr_searchtime.f_jfrqto);
                    $("#querydatefrom").html(that._pr_searchtime.f_jfrqfrom);
                    $("#querydateto").html(that._pr_searchtime.f_jfrqto);
                }
                else
                {
                    controlObj.datetime('search_f_jfrq_tbl_ld_jfb_list_datefrom', 'search_f_jfrq_tbl_ld_jfb_list_timefrom', _defaultfrom);
                    controlObj.datetime('search_f_jfrq_tbl_ld_jfb_list_dateto', 'search_f_jfrq_tbl_ld_jfb_list_timeto', _defaultto);
                    $("#querydatefrom").html(_defaultfrom);
                    $("#querydateto").html(_defaultto);
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
                if ($('#btn_command_his_tbl_ld_jfb_list').hasClass('btn-default'))
                {
                    that._pr_searchhis = 'false';
                }
                else
                {
                    that._pr_searchhis = 'true';
                }
                that._pr_searchtime.f_jfrqfrom = controlObj.datetime('search_f_jfrq_tbl_ld_jfb_list_datefrom', 'search_f_jfrq_tbl_ld_jfb_list_timefrom'); // datefrom + ' ' + timefrom;
                that._pr_searchtime.f_jfrqto = controlObj.datetime('search_f_jfrq_tbl_ld_jfb_list_dateto', 'search_f_jfrq_tbl_ld_jfb_list_timeto'); //dateto + ' ' + timeto;      
                $("#querydatefrom").html(that._pr_searchtime.f_jfrqfrom);
                $("#querydateto").html(that._pr_searchtime.f_jfrqto);
                switch (that._pr_searchtype)
                {

                    case "1":
                        //简单查询
                        that._pr_searchcontent.type1 = $("#txt_command_search_tbl_ld_jfb_list").val();

                        break;
                    case "2":

                        //高级查询
                        var tbl_ld_jfb_list = new Object();


                        tbl_ld_jfb_list.f_value1 = controlObj.multidropdownlistid('search_f_jhzt_tbl_ld_jfb_list');


                        tbl_ld_jfb_list.f_value2 = controlObj.text('search_f_value2_tbl_ld_jfb_list');


                        tbl_ld_jfb_list.f_value3 = controlObj.text('search_f_value3_tbl_ld_jfb_list');


                        tbl_ld_jfb_list.f_value4 = controlObj.text('search_f_value4_tbl_ld_jfb_list');


                        tbl_ld_jfb_list.f_value5 = controlObj.text('search_f_value5_tbl_ld_jfb_list');


                        tbl_ld_jfb_list.f_value6 = controlObj.text('search_f_value6_tbl_ld_jfb_list');


                        tbl_ld_jfb_list.f_value7 = controlObj.text('search_f_value7_tbl_ld_jfb_list');


                        tbl_ld_jfb_list.f_value8 = controlObj.text('search_f_value8_tbl_ld_jfb_list');


                        tbl_ld_jfb_list.f_value9 = controlObj.text('search_f_value9_tbl_ld_jfb_list');


                        tbl_ld_jfb_list.f_value10 = controlObj.text('search_f_value10_tbl_ld_jfb_list');


                        tbl_ld_jfb_list.f_jfbh = controlObj.text('search_f_jfbh_tbl_ld_jfb_list');


                        tbl_ld_jfb_list.f_sjbh = controlObj.text('search_f_sjbh_tbl_ld_jfb_list');











                        tbl_ld_jfb_list.f_yyyid = controlObj.multidropdownlistid('search_f_yyy_tbl_ld_jfb_list');





                        tbl_ld_jfb_list.f_ztid = controlObj.multidropdownlistid('search_f_zt_tbl_ld_jfb_list');


                        tbl_ld_jfb_list.f_bz = controlObj.text('search_f_bz_tbl_ld_jfb_list');

                        tbl_ld_jfb_list.f_jhddh = controlObj.text('search_f_jhddh_tbl_ld_jfb_list');


                        tbl_ld_jfb_list.f_khbh = controlObj.text('search_f_khbh_tbl_ld_jfb_list');


                        tbl_ld_jfb_list.f_khbhid = controlObj.text('search_f_khbhid_tbl_ld_jfb_list');


                        tbl_ld_jfb_list.f_yhbh = controlObj.text('search_f_yhbh_tbl_ld_jfb_list');


                        tbl_ld_jfb_list.f_yhbhid = controlObj.text('search_f_yhbhid_tbl_ld_jfb_list');


                        tbl_ld_jfb_list.f_yhm = controlObj.text('search_f_yhm_tbl_ld_jfb_list');


                        tbl_ld_jfb_list.f_jfm = controlObj.text('search_f_jfm_tbl_ld_jfb_list');


                        tbl_ld_jfb_list.f_dz = controlObj.text('search_f_dz_tbl_ld_jfb_list');


                        tbl_ld_jfb_list.f_dh = controlObj.text('search_f_dh_tbl_ld_jfb_list');


                        tbl_ld_jfb_list.f_dy = controlObj.singledropdownlist('search_f_dy_tbl_ld_jfb_list');


                        tbl_ld_jfb_list.f_dyid = controlObj.singledropdownlistid('search_f_dy_tbl_ld_jfb_list');


                        tbl_ld_jfb_list.f_sc = controlObj.singledropdownlist('search_f_sc_tbl_ld_jfb_list');


                        tbl_ld_jfb_list.f_scid = controlObj.singledropdownlistid('search_f_sc_tbl_ld_jfb_list');


                        tbl_ld_jfb_list.f_qy = controlObj.singledropdownlist('search_f_qy_tbl_ld_jfb_list');


                        tbl_ld_jfb_list.f_qyid = controlObj.singledropdownlistid('search_f_qy_tbl_ld_jfb_list');


                        tbl_ld_jfb_list.f_pq = controlObj.singledropdownlist('search_f_pq_tbl_ld_jfb_list');


                        tbl_ld_jfb_list.f_pqid = controlObj.singledropdownlistid('search_f_pq_tbl_ld_jfb_list');


                        tbl_ld_jfb_list.f_sbbh = controlObj.text('search_f_sbbh_tbl_ld_jfb_list');


                        tbl_ld_jfb_list.f_sbbhid = controlObj.text('search_f_sbbhid_tbl_ld_jfb_list');


                        tbl_ld_jfb_list.f_yslx = controlObj.text('search_f_yslx_tbl_ld_jfb_list');


                        tbl_ld_jfb_list.f_yslxid = controlObj.text('search_f_yslxid_tbl_ld_jfb_list');


                        tbl_ld_jfb_list.f_lxtkhh = controlObj.text('search_f_lxtkhh_tbl_ld_jfb_list');


                        tbl_ld_jfb_list.f_sblx = controlObj.text('search_f_sblx_tbl_ld_jfb_list');


                        tbl_ld_jfb_list.f_sblxid = controlObj.text('search_f_sblxid_tbl_ld_jfb_list');


                        tbl_ld_jfb_list.f_rs = controlObj.text('search_f_rs_tbl_ld_jfb_list');


                        tbl_ld_jfb_list.f_cbbh = controlObj.text('search_f_cbbh_tbl_ld_jfb_list');


                        tbl_ld_jfb_list.f_cbbhid = controlObj.text('search_f_cbbhid_tbl_ld_jfb_list');






                        tbl_ld_jfb_list.f_znjbh = controlObj.text('search_f_znjbh_tbl_ld_jfb_list');


                        tbl_ld_jfb_list.f_znjbhid = controlObj.text('search_f_znjbhid_tbl_ld_jfb_list');


                        tbl_ld_jfb_list.f_znjje = controlObj.text('search_f_znjje_tbl_ld_jfb_list');


                        tbl_ld_jfb_list.f_fjbh = controlObj.text('search_f_fjbh_tbl_ld_jfb_list');


                        tbl_ld_jfb_list.f_fjbhid = controlObj.text('search_f_fjbhid_tbl_ld_jfb_list');


                        tbl_ld_jfb_list.f_fjje = controlObj.text('search_f_fjje_tbl_ld_jfb_list');




                        tbl_ld_jfb_list.f_jffsid = controlObj.multidropdownlistid('search_f_jffs_tbl_ld_jfb_list');


                        tbl_ld_jfb_list.f_jcfsid = controlObj.multidropdownlistid('search_f_jcfs_tbl_ld_jfb_list');




                        //tbl_ld_jfb_list.f_czsjfrom = controlObj.datetime('search_f_czsj_tbl_ld_jfb_list_datefrom', 'search_f_czsj_tbl_ld_jfb_list_timefrom'); // datefrom + ' ' + timefrom;
                        //tbl_ld_jfb_list.f_czsjto = controlObj.datetime('search_f_czsj_tbl_ld_jfb_list_dateto', 'search_f_czsj_tbl_ld_jfb_list_timeto'); //dateto + ' ' + timeto;                 


                        tbl_ld_jfb_list.f_sfykfpid = controlObj.multidropdownlistid('search_f_sfykfp_tbl_ld_jfb_list');

                        //新增
                        tbl_ld_jfb_list.f_yyt = controlObj.text('search_f_yyt_tbl_ld_jfb_list');
                        tbl_ld_jfb_list.f_yytid = controlObj.text('search_f_yytid_tbl_ld_jfb_list');
                        tbl_ld_jfb_list.f_dj = controlObj.text('search_f_dj_tbl_ld_jfb_list');
                        tbl_ld_jfb_list.f_cbyslj = controlObj.text('search_f_cbyslj_tbl_ld_jfb_list');
                        tbl_ld_jfb_list.f_sllj = controlObj.text('search_f_sllj_tbl_ld_jfb_list');
                        tbl_ld_jfb_list.f_sflj = controlObj.text('search_f_sflj_tbl_ld_jfb_list');
                        tbl_ld_jfb_list.f_pwflj = controlObj.text('search_f_pwflj_tbl_ld_jfb_list');
                        tbl_ld_jfb_list.f_jmhyslj = controlObj.text('search_f_jmhyslj_tbl_ld_jfb_list');
                        tbl_ld_jfb_list.f_khytjjzsf = controlObj.text('search_f_khytjjzsf_tbl_ld_jfb_list');
                        tbl_ld_jfb_list.f_khytjjzpwf = controlObj.text('search_f_khytjjzpwf_tbl_ld_jfb_list');

                        tbl_ld_jfb_list.f_sfsytjjzid = controlObj.multidropdownlistid('search_f_sfsytjjz_tbl_ld_jfb_list');

                        tbl_ld_jfb_list.f_sytjjzsf = controlObj.text('search_f_sytjjzsf_tbl_ld_jfb_list');
                        tbl_ld_jfb_list.f_sytjjzpwf = controlObj.text('search_f_sytjjzpwf_tbl_ld_jfb_list');
                        tbl_ld_jfb_list.f_syhtjjzsf = controlObj.text('search_f_syhtjjzsf_tbl_ld_jfb_list');
                        tbl_ld_jfb_list.f_sfsyyeid = controlObj.multidropdownlistid('search_f_sfsyye_tbl_ld_jfb_list');
                        tbl_ld_jfb_list.f_syye = controlObj.text('search_f_syye_tbl_ld_jfb_list');
                        tbl_ld_jfb_list.f_yhye = controlObj.text('search_f_yhye_tbl_ld_jfb_list');
                        tbl_ld_jfb_list.f_shys = controlObj.text('search_f_shys_tbl_ld_jfb_list');
                        tbl_ld_jfb_list.f_shss = controlObj.text('search_f_shss_tbl_ld_jfb_list');
                        tbl_ld_jfb_list.f_hszl = controlObj.text('search_f_hszl_tbl_ld_jfb_list');
                        tbl_ld_jfb_list.f_shssdx = controlObj.text('search_f_shssdx_tbl_ld_jfb_list');
                        tbl_ld_jfb_list.f_khfzids = controlObj.multidropdownlistid('search_f_khfz_tbl_ld_jfb_list');
                        tbl_ld_jfb_list.f_khfzid = controlObj.text('search_f_khfzid_tbl_ld_jfb_list');
                        tbl_ld_jfb_list.f_yhfzid = controlObj.multidropdownlistid('search_f_yhfz_tbl_ld_jfb_list');
                        tbl_ld_jfb_list.f_sbfzid = controlObj.multidropdownlistid('search_f_sbfz_tbl_ld_jfb_list');
                        tbl_ld_jfb_list.f_cbenbhids = controlObj.multidropdownlistid('search_f_cbenbh_tbl_ld_jfb_list');
                        tbl_ld_jfb_list.f_cbenbhid = controlObj.text('search_f_cbenbhid_tbl_ld_jfb_list');
                        tbl_ld_jfb_list.f_ljqf = controlObj.text('search_f_ljqf_tbl_ld_jfb_list');
                        tbl_ld_jfb_list.f_kplbid = controlObj.multidropdownlistid('search_f_kplb_tbl_ld_jfb_list');
                        tbl_ld_jfb_list.f_khyye = controlObj.text('search_f_khyye_tbl_ld_jfb_list');
                        tbl_ld_jfb_list.f_syhtjjzpwf = controlObj.text('search_f_syhtjjzpwf_tbl_ld_jfb_list');
                        tbl_ld_jfb_list.f_lyid = controlObj.multidropdownlistid('search_f_ly_tbl_ld_jfb_list');

                        tbl_ld_jfb_list.f_sfsyyc = controlObj.singledropdownlistid('search_f_sfsyyc_tbl_ld_jfb_list');
                        tbl_ld_jfb_list.f_sfjxyc = controlObj.singledropdownlistid('search_f_sfjxyc_tbl_ld_jfb_list');

                        that._pr_searchcontent.type2 = tbl_ld_jfb_list;
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
                if (that._pr_searchtype == '2')
                {
                    var tbl_ld_jfb_list = that._pr_searchcontent.type2;
                    var errorMessageHansMap = new hashMap();
                    var errorMessagePlacementHansMap = new hashMap();




                    if (tbl_ld_jfb_list.f_value1.length > 200)
                    {
                        errorMessageHansMap.put('search_f_value1_tbl_ld_jfb_list', '长度不能超过<a style="color:red">200</a>个字');
                    }




                    if (tbl_ld_jfb_list.f_value2.length > 200)
                    {
                        errorMessageHansMap.put('search_f_value2_tbl_ld_jfb_list', '长度不能超过<a style="color:red">200</a>个字');
                    }




                    if (tbl_ld_jfb_list.f_value3.length > 200)
                    {
                        errorMessageHansMap.put('search_f_value3_tbl_ld_jfb_list', '长度不能超过<a style="color:red">200</a>个字');
                    }




                    if (tbl_ld_jfb_list.f_value4.length > 200)
                    {
                        errorMessageHansMap.put('search_f_value4_tbl_ld_jfb_list', '长度不能超过<a style="color:red">200</a>个字');
                    }




                    if (tbl_ld_jfb_list.f_value5.length > 200)
                    {
                        errorMessageHansMap.put('search_f_value5_tbl_ld_jfb_list', '长度不能超过<a style="color:red">200</a>个字');
                    }




                    if (tbl_ld_jfb_list.f_value6.length > 200)
                    {
                        errorMessageHansMap.put('search_f_value6_tbl_ld_jfb_list', '长度不能超过<a style="color:red">200</a>个字');
                    }




                    if (tbl_ld_jfb_list.f_value7.length > 200)
                    {
                        errorMessageHansMap.put('search_f_value7_tbl_ld_jfb_list', '长度不能超过<a style="color:red">200</a>个字');
                    }




                    if (tbl_ld_jfb_list.f_value8.length > 200)
                    {
                        errorMessageHansMap.put('search_f_value8_tbl_ld_jfb_list', '长度不能超过<a style="color:red">200</a>个字');
                    }




                    if (tbl_ld_jfb_list.f_value9.length > 200)
                    {
                        errorMessageHansMap.put('search_f_value9_tbl_ld_jfb_list', '长度不能超过<a style="color:red">200</a>个字');
                    }




                    if (tbl_ld_jfb_list.f_value10.length > 200)
                    {
                        errorMessageHansMap.put('search_f_value10_tbl_ld_jfb_list', '长度不能超过<a style="color:red">200</a>个字');
                    }




                    if (tbl_ld_jfb_list.f_jfbh.length > 200)
                    {
                        errorMessageHansMap.put('search_f_jfbh_tbl_ld_jfb_list', '长度不能超过<a style="color:red">200</a>个字');
                    }




                    if (tbl_ld_jfb_list.f_sjbh.length > 200)
                    {
                        errorMessageHansMap.put('search_f_sjbh_tbl_ld_jfb_list', '长度不能超过<a style="color:red">200</a>个字');
                    }









                    if (tbl_ld_jfb_list.f_yyyid.length > 200)
                    {
                        errorMessageHansMap.put('search_f_yyy_tbl_ld_jfb_list', '长度不能超过<a style="color:red">200</a>个字');
                    }









                    if (tbl_ld_jfb_list.f_ztid.length > 200)
                    {
                        errorMessageHansMap.put('search_f_zt_tbl_ld_jfb_list', '长度不能超过<a style="color:red">200</a>个字');
                    }




                    if (tbl_ld_jfb_list.f_bz.length > 200)
                    {
                        errorMessageHansMap.put('search_f_bz_tbl_ld_jfb_list', '长度不能超过<a style="color:red">200</a>个字');
                    }

                    if (tbl_ld_jfb_list.f_jhddh.length > 200)
                    {
                        errorMessageHansMap.put('search_f_jhddh_tbl_ld_jfb_list', '长度不能超过<a style="color:red">200</a>个字');
                    }





                    if (tbl_ld_jfb_list.f_khbh.length > 200)
                    {
                        errorMessageHansMap.put('search_f_khbh_tbl_ld_jfb_list', '长度不能超过<a style="color:red">200</a>个字');
                    }




                    if (tbl_ld_jfb_list.f_khbhid.length > 200)
                    {
                        errorMessageHansMap.put('search_f_khbhid_tbl_ld_jfb_list', '长度不能超过<a style="color:red">200</a>个字');
                    }




                    //if (tbl_ld_jfb_list.f_yhbh.length > 200)
                    //{			
                    //    errorMessageHansMap.put('search_f_yhbh_tbl_ld_jfb_list', '长度不能超过<a style="color:red">200</a>个字');
                    //}		




                    //if (tbl_ld_jfb_list.f_yhbhid.length > 200)
                    //{			
                    //    errorMessageHansMap.put('search_f_yhbhid_tbl_ld_jfb_list', '长度不能超过<a style="color:red">200</a>个字');
                    //}		




                    if (tbl_ld_jfb_list.f_yhm.length > 200)
                    {
                        errorMessageHansMap.put('search_f_yhm_tbl_ld_jfb_list', '长度不能超过<a style="color:red">200</a>个字');
                    }




                    if (tbl_ld_jfb_list.f_jfm.length > 200)
                    {
                        errorMessageHansMap.put('search_f_jfm_tbl_ld_jfb_list', '长度不能超过<a style="color:red">200</a>个字');
                    }




                    if (tbl_ld_jfb_list.f_dz.length > 200)
                    {
                        errorMessageHansMap.put('search_f_dz_tbl_ld_jfb_list', '长度不能超过<a style="color:red">200</a>个字');
                    }




                    if (tbl_ld_jfb_list.f_dh.length > 200)
                    {
                        errorMessageHansMap.put('search_f_dh_tbl_ld_jfb_list', '长度不能超过<a style="color:red">200</a>个字');
                    }




                    if (tbl_ld_jfb_list.f_dy.length > 200)
                    {
                        errorMessageHansMap.put('search_f_dy_tbl_ld_jfb_list', '长度不能超过<a style="color:red">200</a>个字');
                    }




                    //if (tbl_ld_jfb_list.f_dyid.length > 200)
                    //{			
                    //    errorMessageHansMap.put('search_f_dyid_tbl_ld_jfb_list', '长度不能超过<a style="color:red">200</a>个字');
                    //}		




                    if (tbl_ld_jfb_list.f_sc.length > 200)
                    {
                        errorMessageHansMap.put('search_f_sc_tbl_ld_jfb_list', '长度不能超过<a style="color:red">200</a>个字');
                    }




                    //if (tbl_ld_jfb_list.f_scid.length > 200)
                    //{			
                    //    errorMessageHansMap.put('search_f_scid_tbl_ld_jfb_list', '长度不能超过<a style="color:red">200</a>个字');
                    //}		




                    if (tbl_ld_jfb_list.f_qy.length > 200)
                    {
                        errorMessageHansMap.put('search_f_qy_tbl_ld_jfb_list', '长度不能超过<a style="color:red">200</a>个字');
                    }




                    //if (tbl_ld_jfb_list.f_qyid.length > 200)
                    //{			
                    //    errorMessageHansMap.put('search_f_qyid_tbl_ld_jfb_list', '长度不能超过<a style="color:red">200</a>个字');
                    //}		




                    if (tbl_ld_jfb_list.f_pq.length > 200)
                    {
                        errorMessageHansMap.put('search_f_pq_tbl_ld_jfb_list', '长度不能超过<a style="color:red">200</a>个字');
                    }




                    //if (tbl_ld_jfb_list.f_pqid.length > 200)
                    //{			
                    //    errorMessageHansMap.put('search_f_pqid_tbl_ld_jfb_list', '长度不能超过<a style="color:red">200</a>个字');
                    //}		




                    if (tbl_ld_jfb_list.f_sbbh.length > 200)
                    {
                        errorMessageHansMap.put('search_f_sbbh_tbl_ld_jfb_list', '长度不能超过<a style="color:red">200</a>个字');
                    }




                    //if (tbl_ld_jfb_list.f_sbbhid.length > 200)
                    //{			
                    //    errorMessageHansMap.put('search_f_sbbhid_tbl_ld_jfb_list', '长度不能超过<a style="color:red">200</a>个字');
                    //}		




                    //if (tbl_ld_jfb_list.f_yslx.length > 200)
                    //{			
                    //    errorMessageHansMap.put('search_f_yslx_tbl_ld_jfb_list', '长度不能超过<a style="color:red">200</a>个字');
                    //}		




                    //if (tbl_ld_jfb_list.f_yslxid.length > 200)
                    //{			
                    //    errorMessageHansMap.put('search_f_yslxid_tbl_ld_jfb_list', '长度不能超过<a style="color:red">200</a>个字');
                    //}		




                    //if (tbl_ld_jfb_list.f_lxtkhh.length > 200)
                    //{			
                    //    errorMessageHansMap.put('search_f_lxtkhh_tbl_ld_jfb_list', '长度不能超过<a style="color:red">200</a>个字');
                    //}		




                    //if (tbl_ld_jfb_list.f_sblx.length > 200)
                    //{			
                    //    errorMessageHansMap.put('search_f_sblx_tbl_ld_jfb_list', '长度不能超过<a style="color:red">200</a>个字');
                    //}		




                    //if (tbl_ld_jfb_list.f_sblxid.length > 200)
                    //{			
                    //    errorMessageHansMap.put('search_f_sblxid_tbl_ld_jfb_list', '长度不能超过<a style="color:red">200</a>个字');
                    //}		




                    //if (tbl_ld_jfb_list.f_rs.length > 200)
                    //{			
                    //    errorMessageHansMap.put('search_f_rs_tbl_ld_jfb_list', '长度不能超过<a style="color:red">200</a>个字');
                    //}		




                    //if (tbl_ld_jfb_list.f_cbbh.length > 200)
                    //{			
                    //    errorMessageHansMap.put('search_f_cbbh_tbl_ld_jfb_list', '长度不能超过<a style="color:red">200</a>个字');
                    //}		




                    //if (tbl_ld_jfb_list.f_cbbhid.length > 200)
                    //{			
                    //    errorMessageHansMap.put('search_f_cbbhid_tbl_ld_jfb_list', '长度不能超过<a style="color:red">200</a>个字');
                    //}		



                    //if (tbl_ld_jfb_list.f_znjbh.length > 200)
                    //{			
                    //    errorMessageHansMap.put('search_f_znjbh_tbl_ld_jfb_list', '长度不能超过<a style="color:red">200</a>个字');
                    //}		




                    //if (tbl_ld_jfb_list.f_znjbhid.length > 200)
                    //{			
                    //    errorMessageHansMap.put('search_f_znjbhid_tbl_ld_jfb_list', '长度不能超过<a style="color:red">200</a>个字');
                    //}		




                    //if (tbl_ld_jfb_list.f_znjje.length > 200)
                    //{			
                    //    errorMessageHansMap.put('search_f_znjje_tbl_ld_jfb_list', '长度不能超过<a style="color:red">200</a>个字');
                    //}		




                    //if (tbl_ld_jfb_list.f_fjbh.length > 200)
                    //{			
                    //    errorMessageHansMap.put('search_f_fjbh_tbl_ld_jfb_list', '长度不能超过<a style="color:red">200</a>个字');
                    //}		




                    //if (tbl_ld_jfb_list.f_fjbhid.length > 200)
                    //{			
                    //    errorMessageHansMap.put('search_f_fjbhid_tbl_ld_jfb_list', '长度不能超过<a style="color:red">200</a>个字');
                    //}		




                    //if (tbl_ld_jfb_list.f_fjje.length > 200)
                    //{			
                    //    errorMessageHansMap.put('search_f_fjje_tbl_ld_jfb_list', '长度不能超过<a style="color:red">200</a>个字');
                    //}		









                    if (tbl_ld_jfb_list.f_jffsid.length > 200)
                    {
                        errorMessageHansMap.put('search_f_jffs_tbl_ld_jfb_list', '长度不能超过<a style="color:red">200</a>个字');
                    }




                    if (tbl_ld_jfb_list.f_jcfsid.length > 200)
                    {
                        errorMessageHansMap.put('search_f_jcfs_tbl_ld_jfb_list', '长度不能超过<a style="color:red">200</a>个字');
                    }







                    if (tbl_ld_jfb_list.f_sfykfpid.length > 200)
                    {
                        errorMessageHansMap.put('search_f_sfykfp_tbl_ld_jfb_list', '长度不能超过<a style="color:red">200</a>个字');
                    }


                    if (errorMessageHansMap.keys().length > 0)
                    {
                        _validateMessage.show(errorMessageHansMap, errorMessagePlacementHansMap, false);
                        callBackFunction.fail('');
                    }
                    else
                    {
                        _validateMessage.hidden();
                        callBackFunction.success();
                    }
                }
                else
                {
                    _validateMessage_searchtime.hidden();
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


            switch (that._pr_searchtype)
            {
                case "1":
                    if (that._pr_searchcontent.type2 == undefined)
                    {
                        that._pr_searchcontent.type2 = new Object();
                    }

                    that._pr_searchcontent.type2.f_value1 = '';
                    controlObj.text('search_f_value1_tbl_ld_jfb_list', that._pr_searchcontent.type2.f_value1);


                    that._pr_searchcontent.type2.f_value2 = '';
                    controlObj.text('search_f_value2_tbl_ld_jfb_list', that._pr_searchcontent.type2.f_value2);


                    that._pr_searchcontent.type2.f_value3 = '';
                    controlObj.text('search_f_value3_tbl_ld_jfb_list', that._pr_searchcontent.type2.f_value3);


                    that._pr_searchcontent.type2.f_value4 = '';
                    controlObj.text('search_f_value4_tbl_ld_jfb_list', that._pr_searchcontent.type2.f_value4);


                    that._pr_searchcontent.type2.f_value5 = '';
                    controlObj.text('search_f_value5_tbl_ld_jfb_list', that._pr_searchcontent.type2.f_value5);


                    that._pr_searchcontent.type2.f_value6 = '';
                    controlObj.text('search_f_value6_tbl_ld_jfb_list', that._pr_searchcontent.type2.f_value6);


                    that._pr_searchcontent.type2.f_value7 = '';
                    controlObj.text('search_f_value7_tbl_ld_jfb_list', that._pr_searchcontent.type2.f_value7);


                    that._pr_searchcontent.type2.f_value8 = '';
                    controlObj.text('search_f_value8_tbl_ld_jfb_list', that._pr_searchcontent.type2.f_value8);


                    that._pr_searchcontent.type2.f_value9 = '';
                    controlObj.text('search_f_value9_tbl_ld_jfb_list', that._pr_searchcontent.type2.f_value9);


                    that._pr_searchcontent.type2.f_value10 = '';
                    controlObj.text('search_f_value10_tbl_ld_jfb_list', that._pr_searchcontent.type2.f_value10);


                    that._pr_searchcontent.type2.f_jfbh = '';
                    controlObj.text('search_f_jfbh_tbl_ld_jfb_list', that._pr_searchcontent.type2.f_jfbh);


                    that._pr_searchcontent.type2.f_sjbh = '';
                    controlObj.text('search_f_sjbh_tbl_ld_jfb_list', that._pr_searchcontent.type2.f_sjbh);








                    that._pr_searchcontent.type2.f_yyyid = '';
                    controlObj.multidropdownlistid('search_f_yyy_tbl_ld_jfb_list', that._pr_searchcontent.type2.f_yyyid);





                    that._pr_searchcontent.type2.f_ztid = '';
                    controlObj.multidropdownlistid('search_f_zt_tbl_ld_jfb_list', that._pr_searchcontent.type2.f_ztid);


                    that._pr_searchcontent.type2.f_bz = '';
                    controlObj.text('search_f_bz_tbl_ld_jfb_list', that._pr_searchcontent.type2.f_bz);

                    that._pr_searchcontent.type2.f_jhddh = '';
                    controlObj.text('search_f_jhddh_tbl_ld_jfb_list', that._pr_searchcontent.type2.f_jhddh);


                    that._pr_searchcontent.type2.f_khbh = '';
                    controlObj.text('search_f_khbh_tbl_ld_jfb_list', that._pr_searchcontent.type2.f_khbh);


                    that._pr_searchcontent.type2.f_khbhid = '';
                    controlObj.text('search_f_khbhid_tbl_ld_jfb_list', that._pr_searchcontent.type2.f_khbhid);


                    that._pr_searchcontent.type2.f_yhbh = '';
                    controlObj.text('search_f_yhbh_tbl_ld_jfb_list', that._pr_searchcontent.type2.f_yhbh);


                    that._pr_searchcontent.type2.f_yhbhid = '';
                    controlObj.text('search_f_yhbhid_tbl_ld_jfb_list', that._pr_searchcontent.type2.f_yhbhid);


                    that._pr_searchcontent.type2.f_yhm = '';
                    controlObj.text('search_f_yhm_tbl_ld_jfb_list', that._pr_searchcontent.type2.f_yhm);


                    that._pr_searchcontent.type2.f_jfm = '';
                    controlObj.text('search_f_jfm_tbl_ld_jfb_list', that._pr_searchcontent.type2.f_jfm);


                    that._pr_searchcontent.type2.f_dz = '';
                    controlObj.text('search_f_dz_tbl_ld_jfb_list', that._pr_searchcontent.type2.f_dz);


                    that._pr_searchcontent.type2.f_dh = '';
                    controlObj.text('search_f_dh_tbl_ld_jfb_list', that._pr_searchcontent.type2.f_dh);




                    that._pr_searchcontent.type2.f_dyid = '';
                    controlObj.singledropdownlistid('search_f_dy_tbl_ld_jfb_list', that._pr_searchcontent.type2.f_dyid);




                    that._pr_searchcontent.type2.f_scid = '';
                    controlObj.singledropdownlistid('search_f_sc_tbl_ld_jfb_list', that._pr_searchcontent.type2.f_scid);




                    that._pr_searchcontent.type2.f_qyid = '';
                    controlObj.singledropdownlistid('search_f_qy_tbl_ld_jfb_list', that._pr_searchcontent.type2.f_qyid);




                    that._pr_searchcontent.type2.f_pqid = '';
                    controlObj.singledropdownlistid('search_f_pq_tbl_ld_jfb_list', that._pr_searchcontent.type2.f_pqid);
                    controlObj.text('search_f_pqid_tbl_ld_jfb_list', that._pr_searchcontent.type2.f_pqid);


                    that._pr_searchcontent.type2.f_sbbh = '';
                    controlObj.text('search_f_sbbh_tbl_ld_jfb_list', that._pr_searchcontent.type2.f_sbbh);


                    that._pr_searchcontent.type2.f_sbbhid = '';
                    controlObj.text('search_f_sbbhid_tbl_ld_jfb_list', that._pr_searchcontent.type2.f_sbbhid);


                    that._pr_searchcontent.type2.f_yslx = '';
                    controlObj.text('search_f_yslx_tbl_ld_jfb_list', that._pr_searchcontent.type2.f_yslx);


                    that._pr_searchcontent.type2.f_yslxid = '';
                    controlObj.text('search_f_yslxid_tbl_ld_jfb_list', that._pr_searchcontent.type2.f_yslxid);


                    that._pr_searchcontent.type2.f_lxtkhh = '';
                    controlObj.text('search_f_lxtkhh_tbl_ld_jfb_list', that._pr_searchcontent.type2.f_lxtkhh);


                    that._pr_searchcontent.type2.f_sblx = '';
                    controlObj.text('search_f_sblx_tbl_ld_jfb_list', that._pr_searchcontent.type2.f_sblx);


                    that._pr_searchcontent.type2.f_sblxid = '';
                    controlObj.text('search_f_sblxid_tbl_ld_jfb_list', that._pr_searchcontent.type2.f_sblxid);


                    that._pr_searchcontent.type2.f_rs = '';
                    controlObj.text('search_f_rs_tbl_ld_jfb_list', that._pr_searchcontent.type2.f_rs);


                    that._pr_searchcontent.type2.f_cbbh = '';
                    controlObj.text('search_f_cbbh_tbl_ld_jfb_list', that._pr_searchcontent.type2.f_cbbh);


                    that._pr_searchcontent.type2.f_cbbhid = '';
                    controlObj.text('search_f_cbbhid_tbl_ld_jfb_list', that._pr_searchcontent.type2.f_cbbhid);




                    that._pr_searchcontent.type2.f_sfjxyc = '';
                    controlObj.singledropdownlistid('search_f_sfjxyc_tbl_ld_jfb_list', that._pr_searchcontent.type2.f_sfjxyc);



                    that._pr_searchcontent.type2.f_sfsyyc = '';
                    controlObj.singledropdownlistid('search_f_sfsyyc_tbl_ld_jfb_list', that._pr_searchcontent.type2.f_sfsyyc);


                    that._pr_searchcontent.type2.f_znjbh = '';
                    controlObj.text('search_f_znjbh_tbl_ld_jfb_list', that._pr_searchcontent.type2.f_znjbh);


                    that._pr_searchcontent.type2.f_znjbhid = '';
                    controlObj.text('search_f_znjbhid_tbl_ld_jfb_list', that._pr_searchcontent.type2.f_znjbhid);


                    that._pr_searchcontent.type2.f_znjje = '';
                    controlObj.text('search_f_znjje_tbl_ld_jfb_list', that._pr_searchcontent.type2.f_znjje);


                    that._pr_searchcontent.type2.f_fjbh = '';
                    controlObj.text('search_f_fjbh_tbl_ld_jfb_list', that._pr_searchcontent.type2.f_fjbh);


                    that._pr_searchcontent.type2.f_fjbhid = '';
                    controlObj.text('search_f_fjbhid_tbl_ld_jfb_list', that._pr_searchcontent.type2.f_fjbhid);


                    that._pr_searchcontent.type2.f_fjje = '';
                    controlObj.text('search_f_fjje_tbl_ld_jfb_list', that._pr_searchcontent.type2.f_fjje);





                    that._pr_searchcontent.type2.f_jffsid = '';
                    controlObj.multidropdownlistid('search_f_jffs_tbl_ld_jfb_list', that._pr_searchcontent.type2.f_jffsid);


                    that._pr_searchcontent.type2.f_jcfsid = '';
                    controlObj.multidropdownlistid('search_f_jcfs_tbl_ld_jfb_list', that._pr_searchcontent.type2.f_jcfsid);



                    //that._pr_searchcontent.type2.f_czsjfrom = ('1900-01-01 00:00:00');
                    //that._pr_searchcontent.type2.f_czsjto = ('1900-01-01 00:00:00');
                    //controlObj.datetime('search_f_czsj_tbl_ld_jfb_list_datefrom', 'search_f_czsj_tbl_ld_jfb_list_timefrom', that._pr_searchcontent.type2.f_czsjfrom);
                    //controlObj.datetime('search_f_czsj_tbl_ld_jfb_list_dateto', 'search_f_czsj_tbl_ld_jfb_list_timeto', that._pr_searchcontent.type2.f_czsjto);


                    that._pr_searchcontent.type2.f_sfykfpid = '';
                    controlObj.multidropdownlistid('search_f_sfykfp_tbl_ld_jfb_list', that._pr_searchcontent.type2.f_sfykfpid);

                    //新增

                    that._pr_searchcontent.type2.f_yyt = '';
                    controlObj.text('search_f_yyt_tbl_ld_jfb_list', that._pr_searchcontent.type2.f_yyt);

                    that._pr_searchcontent.type2.f_yytid = '';
                    controlObj.text('search_f_yytid_tbl_ld_jfb_list', that._pr_searchcontent.type2.f_yytid);

                    that._pr_searchcontent.type2.f_dj = '';
                    controlObj.text('search_f_dj_tbl_ld_jfb_list', that._pr_searchcontent.type2.f_dj);

                    that._pr_searchcontent.type2.f_cbyslj = '';
                    controlObj.text('search_f_cbyslj_tbl_ld_jfb_list', that._pr_searchcontent.type2.f_cbyslj);

                    that._pr_searchcontent.type2.f_sllj = '';
                    controlObj.text('search_f_sllj_tbl_ld_jfb_list', that._pr_searchcontent.type2.f_sllj);

                    that._pr_searchcontent.type2.f_sflj = '';
                    controlObj.text('search_f_sflj_tbl_ld_jfb_list', that._pr_searchcontent.type2.f_sflj);

                    that._pr_searchcontent.type2.f_pwflj = '';
                    controlObj.text('search_f_pwflj_tbl_ld_jfb_list', that._pr_searchcontent.type2.f_pwflj);

                    that._pr_searchcontent.type2.f_jmhyslj = '';
                    controlObj.text('search_f_jmhyslj_tbl_ld_jfb_list', that._pr_searchcontent.type2.f_jmhyslj);

                    that._pr_searchcontent.type2.f_khytjjzsf = '';
                    controlObj.text('search_f_khytjjzsf_tbl_ld_jfb_list', that._pr_searchcontent.type2.f_khytjjzsf);

                    that._pr_searchcontent.type2.f_khytjjzpwf = '';
                    controlObj.text('search_f_khytjjzpwf_tbl_ld_jfb_list', that._pr_searchcontent.type2.f_khytjjzpwf);

                    that._pr_searchcontent.type2.f_sfsytjjzid = '';
                    controlObj.multidropdownlistid('search_f_sfsytjjz_tbl_ld_jfb_list', that._pr_searchcontent.type2.f_sfsytjjzid);

                    that._pr_searchcontent.type2.f_sytjjzsfid = '';
                    controlObj.text('search_f_sytjjzsf_tbl_ld_jfb_list', that._pr_searchcontent.type2.f_sytjjzsf);

                    that._pr_searchcontent.type2.f_sytjjzpwf = '';
                    controlObj.text('search_f_sytjjzpwf_tbl_ld_jfb_list', that._pr_searchcontent.type2.f_sytjjzpwf);

                    that._pr_searchcontent.type2.f_syhtjjzsf = '';
                    controlObj.text('search_f_syhtjjzsf_tbl_ld_jfb_list', that._pr_searchcontent.type2.f_syhtjjzsf);

                    that._pr_searchcontent.type2.f_sfsyyeid = '';
                    controlObj.multidropdownlistid('search_f_sfsyye_tbl_ld_jfb_list', that._pr_searchcontent.type2.f_sfsyyeid);

                    that._pr_searchcontent.type2.f_syye = '';
                    controlObj.text('search_f_syye_tbl_ld_jfb_list', that._pr_searchcontent.type2.f_syye);

                    that._pr_searchcontent.type2.f_yhye = '';
                    controlObj.text('search_f_yhye_tbl_ld_jfb_list', that._pr_searchcontent.type2.f_yhye);

                    that._pr_searchcontent.type2.f_shys = '';
                    controlObj.text('search_f_shys_tbl_ld_jfb_list', that._pr_searchcontent.type2.f_shys);

                    that._pr_searchcontent.type2.f_shss = '';
                    controlObj.text('search_f_shss_tbl_ld_jfb_list', that._pr_searchcontent.type2.f_shss);

                    that._pr_searchcontent.type2.f_hszl = '';
                    controlObj.text('search_f_hszl_tbl_ld_jfb_list', that._pr_searchcontent.type2.f_hszl);

                    that._pr_searchcontent.type2.f_shssdx = '';
                    controlObj.text('search_f_shssdx_tbl_ld_jfb_list', that._pr_searchcontent.type2.f_shssdx);

                    that._pr_searchcontent.type2.f_khfzids = '';
                    controlObj.multidropdownlistid('search_f_khfz_tbl_ld_jfb_list', that._pr_searchcontent.type2.f_khfzids);

                    that._pr_searchcontent.type2.f_khfzid = '';
                    controlObj.text('search_f_khfzid_tbl_ld_jfb_list', that._pr_searchcontent.type2.f_khfzid);

                    that._pr_searchcontent.type2.f_yhfzid = '';
                    controlObj.multidropdownlistid('search_f_yhfz_tbl_ld_jfb_list', that._pr_searchcontent.type2.f_yhfzid);
                    that._pr_searchcontent.type2.f_sbfzid = '';
                    controlObj.multidropdownlistid('search_f_sbfz_tbl_ld_jfb_list', that._pr_searchcontent.type2.f_sbfzid);

                    that._pr_searchcontent.type2.f_cbenbhids = '';
                    controlObj.multidropdownlistid('search_f_cbenbh_tbl_ld_jfb_list', that._pr_searchcontent.type2.f_cbenbhids);

                    that._pr_searchcontent.type2.f_cbenbhid = '';
                    controlObj.text('search_f_cbenbhid_tbl_ld_jfb_list', that._pr_searchcontent.type2.f_cbenbhid);

                    that._pr_searchcontent.type2.f_ljqf = '';
                    controlObj.text('search_f_ljqf_tbl_ld_jfb_list', that._pr_searchcontent.type2.f_ljqf);

                    that._pr_searchcontent.type2.f_kplbid = '';
                    controlObj.multidropdownlistid('search_f_kplb_tbl_ld_jfb_list', that._pr_searchcontent.type2.f_kplbid);

                    that._pr_searchcontent.type2.f_khyye = '';
                    controlObj.text('search_f_khyye_tbl_ld_jfb_list', that._pr_searchcontent.type2.f_khyye);

                    that._pr_searchcontent.type2.f_syhtjjzpwf = '';
                    controlObj.text('search_f_syhtjjzpwf_tbl_ld_jfb_list', that._pr_searchcontent.type2.f_syhtjjzpwf);

                    that._pr_searchcontent.type2.f_lyid = '';
                    controlObj.multidropdownlistid('search_f_ly_tbl_ld_jfb_list', that._pr_searchcontent.type2.f_lyid);

                    break;
                case "2":
                    if (that._pr_searchcontent.type1 == undefined)
                    {
                        that._pr_searchcontent.type1 = '';
                    }

                    $("#txt_command_search_tbl_ld_jfb_list").val('');
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

            if (that._pr_isadmin == '1' && that._pr_ly == '08080002' && that._pr_zt == '0')
            {

            }
            else
            {
                if (that._pr_searchtime != undefined && that._pr_searchtime.f_jfrqfrom != undefined && that._pr_searchtime.f_jfrqto != undefined)
                {
                    whereClause += " f_jfrq >= to_date('" + that._pr_searchtime.f_jfrqfrom + "','yyyy-MM-dd hh24:mi:ss') and ";
                    whereClause += "  f_jfrq <= to_date('" + that._pr_searchtime.f_jfrqto + "','yyyy-MM-dd hh24:mi:ss') and";
                }
                else
                {
                    whereClause += " f_jfrq >= to_date('" + _defaultfrom + "','yyyy-MM-dd hh24:mi:ss') and";
                    whereClause += " f_jfrq <= to_date('" + _defaultto + "','yyyy-MM-dd hh24:mi:ss')  and";
                }
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

                                        whereClause += " f_jfbh like '%" + vv[i] + "%' or ";

                                        whereClause += " f_sjbh like '%" + vv[i] + "%' or ";


                                        whereClause += " f_yyy like '%" + vv[i] + "%' or ";

                                        whereClause += " f_yyyid like '%" + vv[i] + "%' or ";


                                        whereClause += " f_zt like '%" + vv[i] + "%' or ";

                                        whereClause += " f_bz like '%" + vv[i] + "%' or ";

                                        whereClause += " f_value2 like '%" + vv[i] + "%' or ";

                                        whereClause += " f_khbh like '%" + vv[i] + "%' or ";

                                        whereClause += " f_khbhid like '%" + vv[i] + "%' or ";

                                        whereClause += " f_yhbh like '%" + vv[i] + "%' or ";

                                        whereClause += " f_yhbhid like '%" + vv[i] + "%' or ";

                                        whereClause += " f_yhm like '%" + vv[i] + "%' or ";

                                        whereClause += " f_jfm like '%" + vv[i] + "%' or ";

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

                                        whereClause += " f_sbbh like '%" + vv[i] + "%' or ";

                                        whereClause += " f_sbbhid like '%" + vv[i] + "%' or ";

                                        whereClause += " f_yslx like '%" + vv[i] + "%' or ";

                                        whereClause += " f_yslxid like '%" + vv[i] + "%' or ";

                                        whereClause += " f_lxtkhh like '%" + vv[i] + "%' or ";

                                        whereClause += " f_sblx like '%" + vv[i] + "%' or ";

                                        whereClause += " f_sblxid like '%" + vv[i] + "%' or ";

                                        whereClause += " f_rs like '%" + vv[i] + "%' or ";

                                        whereClause += " f_cbbh like '%" + vv[i] + "%' or ";

                                        whereClause += " f_cbbhid like '%" + vv[i] + "%' or ";





                                        whereClause += " f_znjbh like '%" + vv[i] + "%' or ";

                                        whereClause += " f_znjbhid like '%" + vv[i] + "%' or ";

                                        whereClause += " f_znjje like '%" + vv[i] + "%' or ";

                                        whereClause += " f_fjbh like '%" + vv[i] + "%' or ";

                                        whereClause += " f_fjbhid like '%" + vv[i] + "%' or ";

                                        whereClause += " f_fjje like '%" + vv[i] + "%' or ";


                                        whereClause += " f_jffs like '%" + vv[i] + "%' or ";

                                        whereClause += " f_jcfs like '%" + vv[i] + "%' or ";
                                        //新增
                                        whereClause += " f_yyt like '%" + vv[i] + "%' or ";
                                        whereClause += " f_dj like '%" + vv[i] + "%' or ";
                                        whereClause += " f_cbyslj like '%" + vv[i] + "%' or ";
                                        whereClause += " f_sllj like '%" + vv[i] + "%' or ";
                                        whereClause += " f_sflj like '%" + vv[i] + "%' or ";
                                        whereClause += " f_pwflj like '%" + vv[i] + "%' or ";
                                        whereClause += " f_jmhyslj like '%" + vv[i] + "%' or ";
                                        whereClause += " f_khytjjzsf like '%" + vv[i] + "%' or ";
                                        whereClause += " f_sfsytjjz like '%" + vv[i] + "%' or ";
                                        whereClause += " f_sytjjzsf like '%" + vv[i] + "%' or ";
                                        whereClause += " f_sytjjzpwf like '%" + vv[i] + "%' or ";
                                        whereClause += " f_syhtjjzsf like '%" + vv[i] + "%' or ";
                                        whereClause += " f_sfsyye like '%" + vv[i] + "%' or ";
                                        whereClause += " f_syye like '%" + vv[i] + "%' or ";
                                        whereClause += " f_yhye like '%" + vv[i] + "%' or ";
                                        whereClause += " f_shys like '%" + vv[i] + "%' or ";
                                        whereClause += " f_shss like '%" + vv[i] + "%' or ";

                                        whereClause += " f_hszl like '%" + vv[i] + "%' or ";
                                        whereClause += " f_shssdx like '%" + vv[i] + "%' or ";
                                        whereClause += " f_khfz like '%" + vv[i] + "%' or ";

                                        whereClause += " f_cbenbh like '%" + vv[i] + "%' or ";

                                        whereClause += " f_ljqf like '%" + vv[i] + "%' or ";

                                        whereClause += " f_khyye like '%" + vv[i] + "%' or ";
                                        whereClause += " f_syhtjjzpwf like '%" + vv[i] + "%' or ";



                                        //whereClause += " to_char(f_czsj,'yyyy-MM-dd hh24:mi:ss') like '%" + vv[i] + "%' or ";

                                        whereClause += " f_sfykfp like '%" + vv[i] + "%' or ";

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

                            var tbl_ld_jfb_list = that._pr_searchcontent.type2;



                            if (tbl_ld_jfb_list.f_jfbh.length > 0)
                            {
                                whereClause += " f_jfbh like '%" + tbl_ld_jfb_list.f_jfbh + "%' and ";
                            }


                            if (tbl_ld_jfb_list.f_sjbh.length > 0)
                            {
                                whereClause += " f_sjbh like '%" + tbl_ld_jfb_list.f_sjbh + "%' and ";
                            }






                            if (tbl_ld_jfb_list.f_yyyid.length > 0)
                            {
                                var elementArray = tbl_ld_jfb_list.f_yyyid.split(',');
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
                                    whereClause += "((','||f_yyyid||',') like ('%,'||'" + elementArray[i] + "'||',%')) ";
                                });
                                whereClause += ') and ';
                            }





                            if (tbl_ld_jfb_list.f_ztid.length > 0)
                            {
                                var elementArray = tbl_ld_jfb_list.f_ztid.split(',');
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


                            if (tbl_ld_jfb_list.f_bz.length > 0)
                            {
                                whereClause += " f_bz like '%" + tbl_ld_jfb_list.f_bz + "%' and ";
                            }


                            if (tbl_ld_jfb_list.f_jhddh.length > 0)
                            {
                                whereClause += " f_value2 like '%" + tbl_ld_jfb_list.f_jhddh + "%' and ";
                            }

                            if (tbl_ld_jfb_list.f_khbh.length > 0)
                            {
                                whereClause += " f_khbh like '%" + tbl_ld_jfb_list.f_khbh + "%' and ";
                            }


                            //if (tbl_ld_jfb_list.f_khbhid.length > 0)
                            //{
                            //    whereClause += " f_khbhid like '%" + tbl_ld_jfb_list.f_khbhid + "%' and ";
                            //}	


                            //if (tbl_ld_jfb_list.f_yhbh.length > 0)
                            //{
                            //    whereClause += " f_yhbh like '%" + tbl_ld_jfb_list.f_yhbh + "%' and ";
                            //}	


                            //if (tbl_ld_jfb_list.f_yhbhid.length > 0)
                            //{
                            //    whereClause += " f_yhbhid like '%" + tbl_ld_jfb_list.f_yhbhid + "%' and ";
                            //}	


                            //if (tbl_ld_jfb_list.f_yhm.length > 0)
                            //{
                            //    whereClause += " f_yhm like '%" + tbl_ld_jfb_list.f_yhm + "%' and ";
                            //}	


                            //if (tbl_ld_jfb_list.f_jfm.length > 0)
                            //{
                            //    whereClause += " f_jfm like '%" + tbl_ld_jfb_list.f_jfm + "%' and ";
                            //}	


                            //if (tbl_ld_jfb_list.f_dz.length > 0)
                            //{
                            //    whereClause += " f_dz like '%" + tbl_ld_jfb_list.f_dz + "%' and ";
                            //}	


                            //if (tbl_ld_jfb_list.f_dh.length > 0)
                            //{
                            //    whereClause += " f_dh like '%" + tbl_ld_jfb_list.f_dh + "%' and ";
                            //}	


                            if (tbl_ld_jfb_list.f_dyid.length > 0)
                            {
                                whereClause += " f_dyid = '" + tbl_ld_jfb_list.f_dyid + "' and ";
                            }





                            if (tbl_ld_jfb_list.f_scid.length > 0)
                            {
                                whereClause += " f_scid = '" + tbl_ld_jfb_list.f_scid + "' and ";
                            }




                            if (tbl_ld_jfb_list.f_qyid.length > 0)
                            {
                                whereClause += " f_qyid = '" + tbl_ld_jfb_list.f_qyid + "' and ";
                            }




                            if (tbl_ld_jfb_list.f_pqid.length > 0)
                            {
                                whereClause += " f_pqid = '" + tbl_ld_jfb_list.f_pqid + "' and ";
                            }




                            if (tbl_ld_jfb_list.f_sbbh.length > 0)
                            {
                                whereClause += " f_sbbh like '%" + tbl_ld_jfb_list.f_sbbh + "%' and ";
                            }


                            //if (tbl_ld_jfb_list.f_sbbhid.length > 0)
                            //{
                            //    whereClause += " f_sbbhid like '%" + tbl_ld_jfb_list.f_sbbhid + "%' and ";
                            //}	


                            //if (tbl_ld_jfb_list.f_yslx.length > 0)
                            //{
                            //    whereClause += " f_yslx like '%" + tbl_ld_jfb_list.f_yslx + "%' and ";
                            //}	


                            //if (tbl_ld_jfb_list.f_yslxid.length > 0)
                            //{
                            //    whereClause += " f_yslxid like '%" + tbl_ld_jfb_list.f_yslxid + "%' and ";
                            //}	


                            //if (tbl_ld_jfb_list.f_lxtkhh.length > 0)
                            //{
                            //    whereClause += " f_lxtkhh like '%" + tbl_ld_jfb_list.f_lxtkhh + "%' and ";
                            //}	


                            //if (tbl_ld_jfb_list.f_sblx.length > 0)
                            //{
                            //    whereClause += " f_sblx like '%" + tbl_ld_jfb_list.f_sblx + "%' and ";
                            //}	


                            //if (tbl_ld_jfb_list.f_sblxid.length > 0)
                            //{
                            //    whereClause += " f_sblxid like '%" + tbl_ld_jfb_list.f_sblxid + "%' and ";
                            //}	


                            //if (tbl_ld_jfb_list.f_rs.length > 0)
                            //{
                            //    whereClause += " f_rs like '%" + tbl_ld_jfb_list.f_rs + "%' and ";
                            //}	


                            //if (tbl_ld_jfb_list.f_cbbh.length > 0)
                            //{
                            //    whereClause += " f_cbbh like '%" + tbl_ld_jfb_list.f_cbbh + "%' and ";
                            //}	


                            //if (tbl_ld_jfb_list.f_cbbhid.length > 0)
                            //{
                            //    whereClause += " f_cbbhid like '%" + tbl_ld_jfb_list.f_cbbhid + "%' and ";
                            //}	






                            //if (tbl_ld_jfb_list.f_znjbh.length > 0)
                            //{
                            //    whereClause += " f_znjbh like '%" + tbl_ld_jfb_list.f_znjbh + "%' and ";
                            //}	


                            //if (tbl_ld_jfb_list.f_znjbhid.length > 0)
                            //{
                            //    whereClause += " f_znjbhid like '%" + tbl_ld_jfb_list.f_znjbhid + "%' and ";
                            //}	


                            //if (tbl_ld_jfb_list.f_znjje.length > 0)
                            //{
                            //    whereClause += " f_znjje like '%" + tbl_ld_jfb_list.f_znjje + "%' and ";
                            //}	


                            //if (tbl_ld_jfb_list.f_fjbh.length > 0)
                            //{
                            //    whereClause += " f_fjbh like '%" + tbl_ld_jfb_list.f_fjbh + "%' and ";
                            //}	


                            //if (tbl_ld_jfb_list.f_fjbhid.length > 0)
                            //{
                            //    whereClause += " f_fjbhid like '%" + tbl_ld_jfb_list.f_fjbhid + "%' and ";
                            //}	


                            //if (tbl_ld_jfb_list.f_fjje.length > 0)
                            //{
                            //    whereClause += " f_fjje like '%" + tbl_ld_jfb_list.f_fjje + "%' and ";
                            //}	





                            if (tbl_ld_jfb_list.f_jffsid.length > 0)
                            {
                                var elementArray = tbl_ld_jfb_list.f_jffsid.split(',');
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
                                    whereClause += "((','||f_jffsid||',') like ('%,'||'" + elementArray[i] + "'||',%')) ";

                                });
                                whereClause += ') and ';
                            }


                            if (tbl_ld_jfb_list.f_jcfsid.length > 0)
                            {
                                var elementArray = tbl_ld_jfb_list.f_jcfsid.split(',');
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
                                    whereClause += "((','||f_jcfsid||',') like ('%,'||'" + elementArray[i] + "'||',%')) ";

                                });
                                whereClause += ') and ';
                            }


                            //if (tbl_ld_jfb_list.f_czsjfrom != '1900-01-01 00:00:00')
                            //{
                            //    whereClause += " f_czsj >= to_date('" + tbl_ld_jfb_list.f_czsjfrom + "','yyyy-MM-dd hh24:mi:ss') and ";
                            //}

                            //if (tbl_ld_jfb_list.f_czsjto != '1900-01-01 00:00:00')
                            //{
                            //    whereClause += " f_czsj <= to_date('" + tbl_ld_jfb_list.f_czsjto + "','yyyy-MM-dd hh24:mi:ss') and ";
                            //}


                            if (tbl_ld_jfb_list.f_sfykfpid.length > 0)
                            {
                                var elementArray = tbl_ld_jfb_list.f_sfykfpid.split(',');
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
                                    whereClause += "((','||f_sfykfp||',') like ('%,'||'" + elementArray[i] + "'||',%')) ";

                                });
                                whereClause += ') and ';
                            }

                            //新增

                            if (tbl_ld_jfb_list.f_yyt.length)
                            {
                                whereClause += " f_yyt like '%" + tbl_ld_jfb_list.f_yyt + "%' and ";
                            }
                            if (tbl_ld_jfb_list.f_yytid.length)
                            {
                                whereClause += " f_yytid like '%" + tbl_ld_jfb_list.f_yytid + "%' and ";
                            }

                            if (tbl_ld_jfb_list.f_dj.length)
                            {
                                whereClause += " f_dj like '%" + tbl_ld_jfb_list.f_dj + "%' and ";
                            }
                            if (tbl_ld_jfb_list.f_cbyslj.length)
                            {
                                whereClause += " f_cbyslj like '%" + tbl_ld_jfb_list.f_cbyslj + "%' and ";
                            }
                            if (tbl_ld_jfb_list.f_sllj.length)
                            {
                                whereClause += " f_sllj like '%" + tbl_ld_jfb_list.f_sllj + "%' and ";
                            }

                            if (tbl_ld_jfb_list.f_sflj.length)
                            {
                                whereClause += " f_sllj like '%" + tbl_ld_jfb_list.f_sllj + "%' and ";
                            }

                            if (tbl_ld_jfb_list.f_pwflj.length)
                            {
                                whereClause += " f_pwflj like '%" + tbl_ld_jfb_list.f_pwflj + "%' and ";
                            }
                            if (tbl_ld_jfb_list.f_jmhyslj.length)
                            {
                                whereClause += " f_jmhyslj like '%" + tbl_ld_jfb_list.f_jmhyslj + "%' and ";
                            }
                            if (tbl_ld_jfb_list.f_khytjjzsf.length)
                            {
                                whereClause += " f_khytjjzsf like '%" + tbl_ld_jfb_list.f_khytjjzsf + "%' and ";
                            }
                            if (tbl_ld_jfb_list.f_khytjjzpwf.length)
                            {
                                whereClause += " f_khytjjzpwf like '%" + tbl_ld_jfb_list.f_khytjjzpwf + "%' and ";
                            }

                            if (tbl_ld_jfb_list.f_sfsytjjzid.length)
                            {
                                {
                                    var elementArray = tbl_ld_jfb_list.f_sfsytjjzid.split(',');
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
                                        whereClause += "((','||f_sfsytjjz||',') like ('%,'||'" + elementArray[i] + "'||',%')) ";

                                    });
                                    whereClause += ') and ';
                                }
                            }

                            if (tbl_ld_jfb_list.f_sytjjzsf.length)
                            {
                                whereClause += " f_sytjjzsf like '%" + tbl_ld_jfb_list.f_sytjjzsf + "%' and ";
                            }
                            if (tbl_ld_jfb_list.f_sytjjzpwf.length)
                            {
                                whereClause += " f_sytjjzpwf like '%" + tbl_ld_jfb_list.f_sytjjzpwf + "%' and ";
                            }
                            if (tbl_ld_jfb_list.f_syhtjjzsf.length)
                            {
                                whereClause += " f_syhtjjzsf like '%" + tbl_ld_jfb_list.f_syhtjjzsf + "%' and ";
                            }
                            if (tbl_ld_jfb_list.f_sfsyyeid.length)
                            {
                                {
                                    var elementArray = tbl_ld_jfb_list.f_sfsyyeid.split(',');
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
                                        whereClause += "((','||f_sfsyye||',') like ('%,'||'" + elementArray[i] + "'||',%')) ";

                                    });
                                    whereClause += ') and ';
                                }
                            }
                            if (tbl_ld_jfb_list.f_syye.length)
                            {
                                whereClause += " f_syye like '%" + tbl_ld_jfb_list.f_syye + "%' and ";
                            }
                            if (tbl_ld_jfb_list.f_yhye.length)
                            {
                                whereClause += " f_yhye like '%" + tbl_ld_jfb_list.f_yhye + "%' and ";
                            }
                            if (tbl_ld_jfb_list.f_shys.length)
                            {
                                whereClause += " f_shys like '%" + tbl_ld_jfb_list.f_shys + "%' and ";
                            }
                            if (tbl_ld_jfb_list.f_shss.length)
                            {
                                whereClause += " f_shss like '%" + tbl_ld_jfb_list.f_shss + "%' and ";
                            }
                            if (tbl_ld_jfb_list.f_hszl.length)
                            {
                                whereClause += " f_hszl like '%" + tbl_ld_jfb_list.f_hszl + "%' and ";
                            }
                            if (tbl_ld_jfb_list.f_shssdx.length)
                            {
                                whereClause += " f_shssdx like '%" + tbl_ld_jfb_list.f_shssdx + "%' and ";
                            }
                            if (tbl_ld_jfb_list.f_khfzids.length)
                            {

                                var elementArray = tbl_ld_jfb_list.f_khfzids.split(',');
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

                            if (tbl_ld_jfb_list.f_yhfzid.length > 0)
                            {
                                var elementArray = tbl_ld_jfb_list.f_yhfzid.split(',');
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
                            if (tbl_ld_jfb_list.f_sbfzid.length > 0)
                            {
                                var elementArray = tbl_ld_jfb_list.f_sbfzid.split(',');
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

                            if (tbl_ld_jfb_list.f_cbenbhids.length)
                            {

                                var elementArray = tbl_ld_jfb_list.f_cbenbhids.split(',');
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
                                    whereClause += "((','||f_cbenbhid||',') like ('%,'||'" + elementArray[i] + "'||',%')) ";

                                });
                                whereClause += ') and ';

                            }
                            if (tbl_ld_jfb_list.f_cbenbhid.length)
                            {
                                whereClause += " f_cbenbhid like '%" + tbl_ld_jfb_list.f_cbenbhid + "%' and ";
                            }
                            if (tbl_ld_jfb_list.f_ljqf.length)
                            {
                                whereClause += " f_ljqf like '%" + tbl_ld_jfb_list.f_ljqf + "%' and ";
                            }
                            if (tbl_ld_jfb_list.f_kplbid.length)
                            {

                                var elementArray = tbl_ld_jfb_list.f_kplbid.split(',');
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
                                    whereClause += "((','||f_kplbid||',') like ('%,'||'" + elementArray[i] + "'||',%')) ";

                                });
                                whereClause += ') and ';

                            }
                            if (tbl_ld_jfb_list.f_khyye.length)
                            {
                                whereClause += " f_khyye like '%" + tbl_ld_jfb_list.f_khyye + "%' and ";
                            }
                            if (tbl_ld_jfb_list.f_syhtjjzpwf.length)
                            {
                                whereClause += " f_syhtjjzpwf like '%" + tbl_ld_jfb_list.f_syhtjjzpwf + "%' and ";
                            }

                            if (tbl_ld_jfb_list.f_lyid.length)
                            {
                                var elementArray = tbl_ld_jfb_list.f_lyid.split(',');
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

                            if (tbl_ld_jfb_list.f_value1.length)
                            {
                                var elementArray = tbl_ld_jfb_list.f_value1.split(',');
                                whereClause += ' (';
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
                                    whereClause += "(f_value1 = '" + elementArray[i] + "')";
                                });
                                whereClause += ') and ';

                            }

                            if (tbl_ld_jfb_list.f_sfjxyc.length)
                            {
                                if (tbl_ld_jfb_list.f_sfjxyc == "1")
                                {
                                    whereClause += ' f_dszycje>0 and ';
                                }
                                else if (tbl_ld_jfb_list.f_sfjxyc == "2")
                                {
                                    whereClause += ' (f_dszycje=0 or f_dszycje is null) and ';
                                }

                            }

                            if (tbl_ld_jfb_list.f_sfsyyc.length)
                            {
                                if (tbl_ld_jfb_list.f_sfsyyc == "1")
                                {
                                    whereClause += ' f_syycje>0 and ';
                                }
                                else if (tbl_ld_jfb_list.f_sfsyyc == "2")
                                {
                                    whereClause += ' (f_syycje=0 or f_syycje is null) and ';
                                }

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
                $('#btn_command_clearselect_tbl_ld_jfb_list').addClass('hidden');
            }
            else
            {
                $('#btn_command_clearselect_tbl_ld_jfb_list').removeClass('hidden');

                var allcount = that._pr_gridselectids.split('^').length;
                var currentcount = $('#table_grid_tbl_ld_jfb_list').bootstrapTable('getSelections').length;
                $('#btn_command_clearselect_tbl_ld_jfb_list .cc-badge-p').html(currentcount + '/' + allcount);

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
                var columnHashMap = new hashMap();

                columnHashMap.put('f_khbh', {
                    field: 'f_khbh',
                    title: '客户编号',
                    "class": '',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;



                        return resultStr;
                    }
                });
                columnHashMap.put('f_sjbh', {
                    field: 'f_sjbh',
                    title: '收据编号',
                    "class": '',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;
                        return resultStr;
                    }
                });
                columnHashMap.put('f_value2', {
                    field: 'f_value2',
                    title: '交行流水号',
                    "class": '',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;
                        return resultStr;
                    }
                });
                columnHashMap.put('f_jfbh', {
                    field: 'f_jfbh',
                    title: '缴费编号',
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
                    title: '用户名',
                    "class": '',
                    align: 'left', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;



                        return resultStr;
                    }
                });
                columnHashMap.put('f_dz', {
                    field: 'f_dz',
                    title: '地址',
                    "class": '',
                    align: 'left', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;
                        return resultStr;
                    }
                });
                columnHashMap.put('f_dj', {
                    field: 'f_dj',
                    title: '单价',
                    "class": '',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;
                        return resultStr;
                    }
                });
                columnHashMap.put('f_cbyslj', {
                    field: 'f_cbyslj',
                    title: '抄表应收累计',
                    "class": '',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;
                        return resultStr;
                    }
                });
                columnHashMap.put('f_sflj', {
                    field: 'f_sflj',
                    title: '水费累计',
                    "class": '',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;
                        return resultStr;
                    }
                });
                columnHashMap.put('f_pwflj',
                    {
                        field: 'f_pwflj',
                        title: '污水处理费累计',
                        "class": '',
                        align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                        formatter: function (value, row, index)
                        {
                            var resultStr = value;
                            return resultStr;
                        }
                    }
                );
                columnHashMap.put('f_sytjjzsf',
                    {
                        field: 'f_sytjjzsf',
                        title: '使用调价结转水费',
                        "class": '',
                        align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                        formatter: function (value, row, index)
                        {
                            var resultStr = value;
                            return resultStr;
                        }
                    }
                );
                columnHashMap.put('f_sytjjzpwf',
                    {
                        field: 'f_sytjjzpwf',
                        title: '使用调价结转污水处理费',
                        "class": '',
                        align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                        formatter: function (value, row, index)
                        {
                            var resultStr = value;
                            return resultStr;
                        }
                    }

                );
                columnHashMap.put('f_syye',
                    {
                        field: 'f_syye',
                        title: '使用绿化表押金',
                        "class": '',
                        align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                        formatter: function (value, row, index)
                        {
                            var resultStr = value;
                            return resultStr;
                        }
                    }

                );
                columnHashMap.put('f_dyjtsl',
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
                    }
                );
                columnHashMap.put('f_dyjtsf',
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
                    }
                );
                columnHashMap.put('f_dejtsl',
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
                    }
                );
                columnHashMap.put('f_dejtsf',
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
                    }
                );
                columnHashMap.put('f_dsjtsl',
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
                    }
                );
                columnHashMap.put('f_dsjtsf',
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
                    }
                );
                columnHashMap.put('f_khyycje',
                    {
                        field: 'f_khyycje',
                        title: '客户原余额',
                        "class": '',
                        align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                        formatter: function (value, row, index)
                        {
                            var resultStr = value;
                            return resultStr;
                        }
                    }
                );
                columnHashMap.put('f_sfsyycje',
                    {
                        field: 'f_sfsyycje',
                        title: '是否使用余额',
                        "class": '',
                        align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                        formatter: function (value, row, index)
                        {
                            var resultStr = value;
                            return resultStr;
                        }
                    }
                );
                columnHashMap.put('f_syycje',
                    {
                        field: 'f_syycje',
                        title: '使用余额',
                        "class": '',
                        align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                        formatter: function (value, row, index)
                        {
                            var resultStr = value;
                            return resultStr;
                        }
                    }
                );
                columnHashMap.put('f_yhycje',
                    {
                        field: 'f_yhycje',
                        title: '用后余额',
                        "class": '',
                        align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                        formatter: function (value, row, index)
                        {
                            var resultStr = value;
                            return resultStr;
                        }
                    }
                );
                columnHashMap.put('f_dszycje',
                    {
                        field: 'f_dszycje',
                        title: '多收转预存金额',
                        "class": '',
                        align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                        formatter: function (value, row, index)
                        {
                            var resultStr = value;
                            return resultStr;
                        }
                    }
                );
                columnHashMap.put('f_shss',

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
                    }
                );
                columnHashMap.put('f_jmjelj',

                    {
                        field: 'f_jmjelj',
                        title: '减免金额',
                        "class": '',
                        align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                        formatter: function (value, row, index)
                        {
                            var resultStr = value;
                            return resultStr;
                        }
                    }
                );
                columnHashMap.put('f_jffs',

                    {
                        field: 'f_jffs',
                        title: '缴费方式',
                        "class": '',
                        align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                        formatter: function (value, row, index)
                        {
                            var resultStr = value;



                            return resultStr;
                        }
                    }
                );
                columnHashMap.put('f_jcfs',

                    {
                        field: 'f_jcfs',
                        title: '缴存方式',
                        "class": '',
                        align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                        formatter: function (value, row, index)
                        {
                            var resultStr = value;



                            return resultStr;
                        }
                    }
                );
                columnHashMap.put('f_yyy',

                    {
                        field: 'f_yyy',
                        title: '操作人',
                        "class": '',
                        align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                        formatter: function (value, row, index)
                        {
                            var resultStr = value;



                            return resultStr;
                        }
                    }
                );
                columnHashMap.put('f_czsj',
                    {
                        field: 'f_czsj',
                        title: '操作时间',
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
                    }

                );
                columnHashMap.put('f_sfykfp',
                    {
                        field: 'f_sfykfp',
                        title: '是否已开发票',
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
                    }

                );
                columnHashMap.put('f_kplb',
                    {
                        field: 'f_kplb',
                        title: '开票类别',
                        "class": '',
                        align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                        formatter: function (value, row, index)
                        {
                            var resultStr = value;
                            return resultStr;
                        }
                    }

                );
                columnHashMap.put('f_yyt',
                    {
                        field: 'f_yyt',
                        title: '营业厅',
                        "class": '',
                        align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                        formatter: function (value, row, index)
                        {
                            var resultStr = value;
                            return resultStr;
                        }
                    }

                );
                columnHashMap.put('f_jffsid',
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
                    }

                );
                columnHashMap.put('f_jcfsid',
                    {
                        field: 'f_jcfsid',
                        title: '缴存方式id',
                        "class": 'hidden',
                        align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                        formatter: function (value, row, index)
                        {
                            var resultStr = value;

                            return resultStr;
                        }
                    }

                );
                columnHashMap.put('f_khbhid',

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
                    }
                );
                columnHashMap.put('f_yhbh',
                    {
                        field: 'f_yhbh',
                        title: '用户编号',
                        "class": '',
                        align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                        formatter: function (value, row, index)
                        {
                            var resultStr = value;



                            return resultStr;
                        }
                    }

                );
                columnHashMap.put('f_yhbhid',

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
                );
                columnHashMap.put('f_jfm',
                    {
                        field: 'f_jfm',
                        title: '缴费名',
                        "class": '',
                        align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                        formatter: function (value, row, index)
                        {
                            var resultStr = value;



                            return resultStr;
                        }
                    }

                );
                columnHashMap.put('f_dh',
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
                    }

                );
                columnHashMap.put('f_dy',

                    {
                        field: 'f_dy',
                        title: '地域',
                        "class": '',
                        align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                        formatter: function (value, row, index)
                        {
                            var resultStr = value;
                            return resultStr;
                        }
                    }
                );
                columnHashMap.put('f_dyid',
                    {
                        field: 'f_dyid',
                        title: '地域id',
                        "class": 'hidden',
                        align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                        formatter: function (value, row, index)
                        {
                            var resultStr = value;



                            return resultStr;
                        }
                    }

                );
                columnHashMap.put('f_sc',

                    {
                        field: 'f_sc',
                        title: '水厂',
                        "class": '',
                        align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                        formatter: function (value, row, index)
                        {
                            var resultStr = value;



                            return resultStr;
                        }
                    }
                );
                columnHashMap.put('f_scid',
                    {
                        field: 'f_scid',
                        title: '水厂id',
                        "class": 'hidden',
                        align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                        formatter: function (value, row, index)
                        {
                            var resultStr = value;



                            return resultStr;
                        }
                    }

                );
                columnHashMap.put('f_qy',

                    {
                        field: 'f_qy',
                        title: '区域',
                        "class": '',
                        align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                        formatter: function (value, row, index)
                        {
                            var resultStr = value;



                            return resultStr;
                        }
                    }
                );
                columnHashMap.put('f_qyid',

                    {
                        field: 'f_qyid',
                        title: '区域id',
                        "class": 'hidden',
                        align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                        formatter: function (value, row, index)
                        {
                            var resultStr = value;



                            return resultStr;
                        }
                    }
                );
                columnHashMap.put('f_pq',
                    {
                        field: 'f_pq',
                        title: '片区',
                        "class": '',
                        align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                        formatter: function (value, row, index)
                        {
                            var resultStr = value;



                            return resultStr;
                        }
                    }

                );
                columnHashMap.put('f_pqid',
                    {
                        field: 'f_pqid',
                        title: '片区id',
                        "class": 'hidden',
                        align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                        formatter: function (value, row, index)
                        {
                            var resultStr = value;



                            return resultStr;
                        }
                    }

                );
                columnHashMap.put('f_sbbh',
                    {
                        field: 'f_sbbh',
                        title: '水表编号',
                        "class": '',
                        align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                        formatter: function (value, row, index)
                        {
                            var resultStr = value;



                            return resultStr;
                        }
                    }

                );
                columnHashMap.put('f_sbbhid',

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
                    }
                );
                columnHashMap.put('f_yslx',
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
                    }

                );
                columnHashMap.put('f_yslxid',
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
                    }

                );
                columnHashMap.put('f_lxtkhh',
                    {
                        field: 'f_lxtkhh',
                        title: '老系统客户号',
                        "class": '',
                        align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                        formatter: function (value, row, index)
                        {
                            var resultStr = value;



                            return resultStr;
                        }
                    }

                );
                columnHashMap.put('f_sblx',

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
                    }
                );
                columnHashMap.put('f_sblxid',
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
                    }

                );
                columnHashMap.put('f_rs',

                    {
                        field: 'f_rs',
                        title: '人数',
                        "class": '',
                        align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                        formatter: function (value, row, index)
                        {
                            var resultStr = value;



                            return resultStr;
                        }
                    }
                );
                columnHashMap.put('f_cbbh',
                    {
                        field: 'f_cbbh',
                        title: '抄表编号',
                        "class": '',
                        align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                        formatter: function (value, row, index)
                        {
                            var resultStr = value;



                            return resultStr;
                        }
                    }

                );
                columnHashMap.put('f_cbbhid',

                    {
                        field: 'f_cbbhid',
                        title: '抄表编号id',
                        "class": 'hidden',
                        align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                        formatter: function (value, row, index)
                        {
                            var resultStr = value;



                            return resultStr;
                        }
                    }
                );
                columnHashMap.put('f_znjbh',
                    {
                        field: 'f_znjbh',
                        title: '滞纳金编号',
                        "class": 'hidden',
                        align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                        formatter: function (value, row, index)
                        {
                            var resultStr = value;



                            return resultStr;
                        }
                    }

                );
                columnHashMap.put('f_znjbhid',
                    {
                        field: 'f_znjbhid',
                        title: '滞纳金编号id',
                        "class": 'hidden',
                        align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                        formatter: function (value, row, index)
                        {
                            var resultStr = value;



                            return resultStr;
                        }
                    }

                );
                columnHashMap.put('f_znjje',

                    {
                        field: 'f_znjje',
                        title: '滞纳金金额',
                        "class": 'hidden',
                        align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                        formatter: function (value, row, index)
                        {
                            var resultStr = value;



                            return resultStr;
                        }
                    }
                );
                columnHashMap.put('f_fjbh',

                    {
                        field: 'f_fjbh',
                        title: '罚金编号',
                        "class": 'hidden',
                        align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                        formatter: function (value, row, index)
                        {
                            var resultStr = value;



                            return resultStr;
                        }
                    }
                );
                columnHashMap.put('f_fjbhid',
                    {
                        field: 'f_fjbhid',
                        title: '罚金编号id',
                        "class": 'hidden',
                        align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                        formatter: function (value, row, index)
                        {
                            var resultStr = value;



                            return resultStr;
                        }
                    }

                );
                columnHashMap.put('f_fjje',

                    {
                        field: 'f_fjje',
                        title: '罚金金额',
                        "class": 'hidden',
                        align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                        formatter: function (value, row, index)
                        {
                            var resultStr = value;



                            return resultStr;
                        }
                    }
                );
                columnHashMap.put('f_yyyid',

                    {
                        field: 'f_yyyid',
                        title: '操作人id',
                        "class": 'hidden',
                        align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                        formatter: function (value, row, index)
                        {
                            var resultStr = value;



                            return resultStr;
                        }
                    }
                );
                columnHashMap.put('f_jfrq',
                    {
                        field: 'f_jfrq',
                        title: '缴费日期',
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
                    }

                );
                columnHashMap.put('f_ztid',

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
                    }
                );
                columnHashMap.put('f_bz',

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
                    }
                );
                columnHashMap.put('f_yytid',

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
                    }
                );
                columnHashMap.put('f_sllj',
                    {
                        field: 'f_sllj',
                        title: '水量累计',
                        "class": '',
                        align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                        formatter: function (value, row, index)
                        {
                            var resultStr = value;
                            return resultStr;
                        }
                    }

                );
                columnHashMap.put('f_jmhyslj',

                    {
                        field: 'f_jmhyslj',
                        title: '减免后应收累计',
                        "class": '',
                        align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                        formatter: function (value, row, index)
                        {
                            var resultStr = value;
                            return resultStr;
                        }
                    }
                );
                columnHashMap.put('f_khytjjzsf',

                    {
                        field: 'f_khytjjzsf',
                        title: '客户原调价结转水费',
                        "class": '',
                        align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                        formatter: function (value, row, index)
                        {
                            var resultStr = value;
                            return resultStr;
                        }
                    }
                );
                columnHashMap.put('f_khytjjzpwf',

                    {
                        field: 'f_khytjjzpwf',
                        title: '客户原调价结转污水处理费',
                        "class": '',
                        align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                        formatter: function (value, row, index)
                        {
                            var resultStr = value;
                            return resultStr;
                        }
                    }
                );
                columnHashMap.put('f_sfsytjjz',

                    {
                        field: 'f_sfsytjjz',
                        title: '是否使用调价结转',
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
                    }
                );
                columnHashMap.put('f_khyye',
                    {
                        field: 'f_khyye',
                        title: '客户原绿化表押金',
                        "class": '',
                        align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                        formatter: function (value, row, index)
                        {
                            var resultStr = value;
                            return resultStr;
                        }
                    }

                );
                columnHashMap.put('f_sfsyye',

                    {
                        field: 'f_sfsyye',
                        title: '是否使用绿化表押金',
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
                    }
                );
                columnHashMap.put('f_yhye',

                    {
                        field: 'f_yhye',
                        title: '用后绿化表押金',
                        "class": '',
                        align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                        formatter: function (value, row, index)
                        {
                            var resultStr = value;
                            return resultStr;
                        }
                    }
                );
                columnHashMap.put('f_shys',

                    {
                        field: 'f_shys',
                        title: '算后应收',
                        "class": '',
                        align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                        formatter: function (value, row, index)
                        {
                            var resultStr = value;
                            return resultStr;
                        }
                    }
                );
                columnHashMap.put('f_hszl',
                    {
                        field: 'f_hszl',
                        title: '算后找零',
                        "class": '',
                        align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                        formatter: function (value, row, index)
                        {
                            var resultStr = value;
                            return resultStr;
                        }
                    }

                );
                columnHashMap.put('f_shssdx',

                    {
                        field: 'f_shssdx',
                        title: '算后实收大写',
                        "class": '',
                        align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                        formatter: function (value, row, index)
                        {
                            var resultStr = value;
                            return resultStr;
                        }
                    }
                );
                columnHashMap.put('f_khfz',

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
                    }
                );
                columnHashMap.put('f_khfzid',

                    {
                        field: 'f_khfzid',
                        title: '客户分组ID',
                        "class": 'hidden',
                        align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                        formatter: function (value, row, index)
                        {
                            var resultStr = value;
                            return resultStr;
                        }
                    }
                );
                columnHashMap.put('f_cbenbh',

                    {
                        field: 'f_cbenbh',
                        title: '抄本编号',
                        "class": '',
                        align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                        formatter: function (value, row, index)
                        {
                            var resultStr = value;
                            return resultStr;
                        }
                    }
                );
                columnHashMap.put('f_cbenbhid',

                    {
                        field: 'f_cbenbhid',
                        title: '抄本编号ID',
                        "class": 'hidden',
                        align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                        formatter: function (value, row, index)
                        {
                            var resultStr = value;
                            return resultStr;
                        }
                    }
                );
                columnHashMap.put('f_kplbid',

                    {
                        field: 'f_kplbid',
                        title: '开票类别ID',
                        "class": 'hidden',
                        align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                        formatter: function (value, row, index)
                        {
                            var resultStr = value;
                            return resultStr;
                        }
                    }
                );
                columnHashMap.put('f_syhtjjzsf',
                    {
                        field: 'f_syhtjjzsf',
                        title: '使用后调价结转水费',
                        "class": '',
                        align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                        formatter: function (value, row, index)
                        {
                            var resultStr = value;
                            return resultStr;
                        }
                    }

                );
                columnHashMap.put('f_syhtjjzpwf',

                    {
                        field: 'f_syhtjjzpwf',
                        title: '调价结转调价污水处理费',
                        "class": '',
                        align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                        formatter: function (value, row, index)
                        {
                            var resultStr = value;
                            return resultStr;
                        }
                    }
                );
                columnHashMap.put('f_zt',

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
                    }
                );
                columnHashMap.put('f_ly',

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
                    }
                );
                columnHashMap.put('f_lyid',
                    {
                        field: 'f_lyid',
                        title: '来源ID',
                        "class": 'hidden',
                        align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                        formatter: function (value, row, index)
                        {
                            var resultStr = value;
                            return resultStr;
                        }
                    }

                );
                columnHashMap.put('f_value1',

                    {
                        field: 'f_value1',
                        title: '交行对账状态',
                        "class": '',
                        align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                        formatter: function (value, row, index)
                        {
                            switch (value)
                            {
                                case "1":
                                    value = "待对账";
                                    break;
                                case "2":
                                    value = "对账正确";
                                    break;
                                case "3":
                                    value = "对账错误";
                                    break;
                                default:
                                    value = "非交行";
                                    break;
                            }
                            var resultStr = value;
                            return resultStr;
                        }
                    }
                );
                columnHashMap.put('f_value2',
                    {
                        field: 'f_value2',
                        title: '交行订单号',
                        "class": 'hidden',
                        align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                        formatter: function (value, row, index)
                        {
                            var resultStr = value;
                            return resultStr;
                        }
                    }

                );
                columnHashMap.put('f_sfjl',

                    {
                        field: 'f_sfjl',
                        title: '单价明细',
                        "class": '',
                        align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                        formatter: function (value, row, index)
                        {

                            var result = "";
                            var resultArr = value.split('|');

                            for (var i = 0; i < resultArr.length; i++)
                            {
                                var arr = resultArr[i].split('^');
                                if (arr.length == 3)
                                {
                                    result += "水费:" + arr[0] + " 污水处理费:" + arr[1] + " 水量:" + arr[2] + ",<br/>";
                                }
                            }

                            result = result.trimEnd('>').trimEnd('/').trimEnd('r').trimEnd('b').trimEnd('<').trimEnd(',');

                            return result;
                        }
                    }
                );

                columnHashMap.put('f_yqjmsfbfb',

                    {
                        field: 'f_yqjmsfbfb',
                        title: '疫情减免水费百分比',
                        "class": '',
                        align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                        formatter: function (value, row, index)
                        {
                            var resultStr = value;
                            return resultStr;
                        }
                    }
                ); 
                columnHashMap.put('f_yqjmpwfbfb',

                    {
                        field: 'f_yqjmpwfbfb',
                        title: '疫情减免污水处理费百分比',
                        "class": '',
                        align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                        formatter: function (value, row, index)
                        {
                            var resultStr = value;
                            return resultStr;
                        }
                    }
                );
                columnHashMap.put('f_yqjmsfje',

                    {
                        field: 'f_yqjmsfje',
                        title: '疫情减免水费金额',
                        "class": '',
                        align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                        formatter: function (value, row, index)
                        {
                            var resultStr = value;
                            return resultStr;
                        }
                    }
                );
                columnHashMap.put('f_yqjmpwfje',

                    {
                        field: 'f_yqjmpwfje',
                        title: '疫情减免污水处理费金额',
                        "class": '',
                        align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                        formatter: function (value, row, index)
                        {
                            var resultStr = value;
                            return resultStr;
                        }
                    }
                );
                columnHashMap.put('f_yqjmsf',

                    {
                        field: 'f_yqjmsf',
                        title: '疫情减免水费',
                        "class": '',
                        align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                        formatter: function (value, row, index)
                        {
                            var resultStr = value;
                            return resultStr;
                        }
                    }
                );
                columnHashMap.put('f_yqjmpwf',

                    {
                        field: 'f_yqjmpwf',
                        title: '疫情减免污水处理费',
                        "class": '',
                        align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                        formatter: function (value, row, index)
                        {
                            var resultStr = value;
                            return resultStr;
                        }
                    }
                );
                var column = getCookie("tbl_ld_jfb_list_column");

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
                    columnObj["class"] = '';
                    columnsarray.push(columnObj);

                    if (that._pr_isadmin == '0' && that._pr_ly == '08080010')
                    {


                        //缴费机信息查询
                        var columnObj = columnHashMap.get('f_value2');
                        columnObj["class"] = '';
                        columnsarray.push(columnObj);

                    }
                    else
                    {
                        var columnObj = columnHashMap.get('f_sjbh');
                        columnObj["class"] = '';
                        columnsarray.push(columnObj);
                    }



                    var columnObj = columnHashMap.get('f_jfbh');
                    columnObj["class"] = '';
                    columnsarray.push(columnObj);

                    var columnObj = columnHashMap.get('f_yhm');
                    columnObj["class"] = '';
                    columnsarray.push(columnObj);

                    var columnObj = columnHashMap.get('f_dz');
                    columnObj["class"] = '';
                    columnsarray.push(columnObj);

                    var columnObj = columnHashMap.get('f_sfjl');
                    columnObj["class"] = '';
                    columnsarray.push(columnObj);

                    var columnObj = columnHashMap.get('f_cbyslj');
                    columnObj["class"] = '';
                    columnsarray.push(columnObj);

                    var columnObj = columnHashMap.get('f_sflj');
                    columnObj["class"] = '';
                    columnsarray.push(columnObj);

                    var columnObj = columnHashMap.get('f_pwflj');
                    columnObj["class"] = '';
                    columnsarray.push(columnObj);

                    //var columnObj = columnHashMap.get('f_dyjtsl');
                    //columnObj["class"] = 'hidden';
                    //columnsarray.push(columnObj);
                    //var columnObj = columnHashMap.get('f_dyjtsf');
                    //columnObj["class"] = 'hidden';
                    //columnsarray.push(columnObj);
                    //var columnObj = columnHashMap.get('f_dejtsl');
                    //columnObj["class"] = 'hidden';
                    //columnsarray.push(columnObj);
                    //var columnObj = columnHashMap.get('f_dejtsf');
                    //columnObj["class"] = 'hidden';
                    //columnsarray.push(columnObj);
                    //var columnObj = columnHashMap.get('f_dsjtsl');
                    //columnObj["class"] = 'hidden';
                    //columnsarray.push(columnObj);
                    //var columnObj = columnHashMap.get('f_dsjtsf');
                    //columnObj["class"] = 'hidden';
                    //columnsarray.push(columnObj);
                    //var columnObj = columnHashMap.get('f_khyycje');
                    //columnObj["class"] = 'hidden';
                    //columnsarray.push(columnObj);
                    //var columnObj = columnHashMap.get('f_sfsyycje');
                    //columnObj["class"] = 'hidden';
                    //columnsarray.push(columnObj);
                    var columnObj = columnHashMap.get('f_syycje');
                    columnObj["class"] = '';
                    columnsarray.push(columnObj);
                    //var columnObj = columnHashMap.get('f_yhycje');
                    //columnObj["class"] = 'hidden';
                    //columnsarray.push(columnObj);
                    //var columnObj = columnHashMap.get('f_dszycje');
                    //columnObj["class"] = 'hidden';
                    //columnsarray.push(columnObj);
                    var columnObj = columnHashMap.get('f_shss');
                    columnObj["class"] = '';
                    columnsarray.push(columnObj);

                    var columnObj = columnHashMap.get('f_jmjelj');
                    columnObj["class"] = '';
                    columnsarray.push(columnObj);

                    var columnObj = columnHashMap.get('f_jffs');
                    columnObj["class"] = '';
                    columnsarray.push(columnObj);

                    var columnObj = columnHashMap.get('f_jcfs');
                    columnObj["class"] = '';
                    columnsarray.push(columnObj);

                    var columnObj = columnHashMap.get('f_yyy');
                    columnObj["class"] = '';
                    columnsarray.push(columnObj);

                    var columnObj = columnHashMap.get('f_czsj');
                    columnObj["class"] = '';
                    columnsarray.push(columnObj);


                    var columnObj = columnHashMap.get('f_sfykfp');
                    columnObj["class"] = '';
                    columnsarray.push(columnObj);

                    var columnObj = columnHashMap.get('f_kplb');
                    columnObj["class"] = '';
                    columnsarray.push(columnObj);

                    var columnObj = columnHashMap.get('f_yyt');
                    columnObj["class"] = '';
                    columnsarray.push(columnObj);

                    var columnObj = columnHashMap.get('f_zt');
                    columnObj["class"] = '';
                    columnsarray.push(columnObj);

                    var columnObj = columnHashMap.get('f_ly');
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



                                switch (row.f_ztid)
                                {
                                    case "0":
                                        {
                                            return [
                                                '<a class="edit ml10" href="javascript:void(0)" title="编辑">',
                                                '<i class="glyphicon glyphicon-edit"></i>',
                                                '</a>'
                                            ].join('');
                                        }
                                        break;
                                    case "1":
                                        {
                                            return [
                                                '<a class="edit ml10" href="javascript:void(0)" title="浏览">',
                                                '<i class="glyphicon glyphicon-eye-open"></i>',
                                                '</a>'
                                            ].join('');
                                        }
                                        break;
                                    case "2":
                                    case "3":
                                        {
                                            return [
                                                '<a class="edit ml10" href="javascript:void(0)" title="浏览">',
                                                '<i class="glyphicon glyphicon-eye-open"></i>',
                                                '</a>'
                                            ].join('');
                                        }
                                        break;
                                    case "9":
                                        {
                                            return [
                                                '<a class="view ml10" href="javascript:void(0)" title="浏览">',
                                                '<i class="glyphicon glyphicon-eye-open"></i>',
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
                //增加缴费冲红操作
                columnsarray.push({
                    field: '', title: '缴费冲红',
                    class: 'hidden',
                    align: 'center', valign: 'middle', sortable: false, clickToSelect: false,
                    formatter: function (value, row, index)
                    {
                        switch (that._pr_listtype)
                        {
                            case "1":



                                switch (row.f_ztid)
                                {

                                    case "2":
                                        {
                                            if ((row.f_value1 == null || row.f_value1 == "") && that._pr_isadmin != "1")
                                            {
                                                return [
                                                    '<a class="writeoff ml10" href="javascript:void(0)" title="冲红">',
                                                    '<i class="glyphicon glyphicon-remove-circle"></i>',
                                                    '</a>'
                                                ].join('');
                                            }
                                        }
                                        break;
                                    case "0":
                                    case "1":
                                    case "3":
                                    case "9":
                                        break;

                                }
                                break;
                            case "2":
                                break;
                        }
                    },
                    events: {
                        'click .writeoff': function (e, value, row, index)
                        {
                            var confirmContent = '<blockquote> ';
                            confirmContent += '<h3>将当前选中的数据<a style="color:red">' + row.f_yhm + '</a>此用户进行<a style="color:red">冲红操作</a></h3>';
                            confirmContent += '<br/>';
                            confirmContent += '<h5>冲红后，需退还该用户<a style="color:red">' + row.f_cbyslj + '</a>元</h5>';
                            confirmContent += '</blockquote> ';
                            _confirmMessage.destory();
                            _confirmMessage.show('冲红确认？', confirmContent,
                                {

                                    confirm: function ()
                                    {
                                        var d = new Date();

                                        var json = {


                                            f_value1: dateToString(d),


                                            f_value2: row.f_value2,


                                            f_value3: row.f_value3,


                                            f_value4: row.f_value4,


                                            f_value5: row.f_value5,


                                            f_value6: row.f_value6,


                                            f_value7: row.f_value7,


                                            f_value8: row.f_value8,


                                            f_value9: row.f_value9,


                                            f_value10: row.f_value10,


                                            f_jfbh: row.f_jfbh,


                                            f_sjbh: row.f_sjbh,

                                            f_jfrq: row.f_jfrq,
                                            f_jffs: row.f_jffs,
                                            f_jffsid: row.f_jffsid,
                                            f_ly: row.f_ly,
                                            f_lyid: row.f_lyid,
                                            f_jcfs: row.f_jcfs,
                                            f_jcfsid: row.f_jcfsid,

                                            f_yyy: basePageObj._userInfoJson.sys_username,

                                            f_yyyid: basePageObj._userInfoJson.sys_userid,

                                            f_czsj: row.f_czsj,

                                            f_sfykfp: row.f_sfykfp,
                                            f_zt: '已提交',
                                            f_ztid: '2',


                                            f_bz: row.f_bz,

                                            f_khbh: row.f_khbh,


                                            f_khbhid: row.f_khbhid,


                                            f_yhbh: row.f_yhbh,


                                            f_yhbhid: row.f_yhbhid,


                                            f_yhm: row.f_yhm,


                                            f_jfm: row.f_jfm,


                                            f_dz: row.f_dz,


                                            f_dh: row.f_dh,


                                            f_dy: row.f_dy,


                                            f_dyid: row.f_dyid,


                                            f_sc: row.f_sc,


                                            f_scid: row.f_scid,


                                            f_qy: row.f_qy,


                                            f_qyid: row.f_qyid,


                                            f_pq: row.f_pq,


                                            f_pqid: row.f_pqid,


                                            f_sbbh: row.f_sbbh,


                                            f_sbbhid: row.f_sbbhid,


                                            f_yslx: row.f_yslx,


                                            f_yslxid: row.f_yslxid,


                                            f_lxtkhh: row.f_lxtkhh,


                                            f_sblx: row.f_sblx,


                                            f_sblxid: row.f_sblxid,


                                            f_rs: row.f_rs,


                                            f_cbbh: row.f_cbbh,


                                            f_cbbhid: row.f_cbbhid,

                                            f_znjbh: row.f_znjbh,


                                            f_znjbhid: row.f_znjbhid,


                                            f_znjje: row.f_znjje,


                                            f_fjbh: row.f_fjbh,


                                            f_fjbhid: row.f_fjbhid,


                                            f_fjje: row.f_fjje,

                                            //新增
                                            f_yyt: basePageObj._userInfoJson.sys_toporganname,
                                            f_yytid: basePageObj._userInfoJson.sys_toporgan,
                                            f_dj: row.f_dj,
                                            f_cbyslj: '-' + row.f_cbyslj,
                                            f_sllj: '-' + row.f_sllj,
                                            f_sflj: '-' + row.f_sflj,
                                            f_pwflj: '-' + row.f_pwflj,
                                            f_jmhyslj: '-' + row.f_cbyslj,
                                            f_khytjjzsf: row.f_khytjjzsf,
                                            f_khytjjzpwf: row.f_khytjjzpwf,
                                            f_sfsytjjz: row.f_sfsytjjz,
                                            f_khyye: row.f_khyye,
                                            f_sfsyye: row.f_sfsyye,
                                            f_syye: row.syye,
                                            f_yhye: row.yhye,
                                            f_shys: '-' + row.f_cbyslj,
                                            f_shss: '-' + row.f_cbyslj,
                                            f_hszl: '0',
                                            f_shssdx: '负' + autoChinese(row.f_cbyslj),
                                            f_khfz: row.f_khfz,
                                            f_khfzid: row.f_khfzid,
                                            f_cbenbh: row.f_cbenbh,
                                            f_cbenbhid: row.f_cbenbhid,
                                            f_ljqf: row.f_ljqf,
                                            f_kplb: row.f_kplb,
                                            f_kplbid: row.f_kplbid,
                                            f_sytjjzsf: row.f_sytjjzsf,
                                            f_sytjjzpwf: row.f_sytjjzpwf,
                                            f_syhtjjzsf: row.f_syhtjjzsf,
                                            f_syhtjjzpwf: row.f_syhtjjzpwf,
                                            f_jmjelj: row.f_jmjelj,

                                            f_dyjtsl: row.f_dyjtsl,
                                            f_dyjtsf: row.f_dyjtsf,
                                            f_dejtsl: row.f_dejtsl,
                                            f_dejtsf: row.f_dejtsf,
                                            f_dsjtsl: row.f_dsjtsl,
                                            f_dsjtsf: row.f_dsjtsf,
                                            f_khyycje: row.f_khyycje,
                                            f_sfsyycje: row.f_sfsyycje,
                                            f_syycje: row.f_syycje,
                                            f_yhycje: row.f_yhycje,
                                            f_dszycje: row.f_dszycje,

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
                                            sys_id: row.sys_id,
                                            clientInf: _clientInf
                                        }

                                        doAjaxFunction(_serviceUrl, 'WriteOff', data, {
                                            success: function (result)
                                            {
                                                _alertMessage.show('冲红操作成功', 'success');
                                                that.bindGrid();
                                            },
                                            fail: function (message)
                                            {
                                                _alertMessage.show('冲红操作失败' + message, 'fail');
                                            }
                                        });


                                    },
                                    cancle: function ()
                                    {

                                    }
                                });

                        }
                    }
                });
                //增加缴费回滚操作
                columnsarray.push({
                    field: '', title: '缴费回滚',
                    align: 'center', valign: 'middle', sortable: false, clickToSelect: false,
                    formatter: function (value, row, index)
                    {
                        switch (that._pr_listtype)
                        {
                            case "1":



                                switch (row.f_ztid)
                                {

                                    case "2":
                                        {
                                            if (that._pr_isadmin != "1" && that._pr_ly != '08080010')
                                            {
                                                if (row.f_lyid != '08080008')
                                                {
                                                    return [
                                                        '<a class="rollback ml10" href="javascript:void(0)" title="回滚">',
                                                        '<i class="glyphicon glyphicon-remove-circle"></i>',
                                                        '</a>'
                                                    ].join('');
                                                }

                                            }
                                        }
                                        break;
                                    case "0":
                                    case "1":
                                    case "3":
                                    case "9":
                                        break;

                                }
                                break;
                            case "2":
                                break;
                        }
                    },
                    events: {
                        'click .rollback': function (e, value, row, index)
                        {
                            var data = {
                                sys_id: row.sys_id,
                                clientInf: _clientInf
                            };
                            doAjaxFunction(_serviceUrl, 'IsCanRollBack', data, {
                                success: function (message)
                                {
                                    if (message == 'true')
                                    {
                                        var confirmContent = '<blockquote> ';
                                        confirmContent += '<h3>将当前选中的数据<a style="color:red">' + row.f_yhm + '</a>此用户进行<a style="color:red">回滚操作</a></h3>';
                                        confirmContent += '<br/>';
                                        confirmContent += '<h5>回滚后，需退还该用户<a style="color:red">' + row.f_shss + '</a>元</h5>';
                                        confirmContent += '</blockquote> ';
                                        _confirmMessage.destory();
                                        _confirmMessage.show('回滚确认？', confirmContent,
                                            {

                                                confirm: function ()
                                                {


                                                    var whereClause = " sys_id in (\'" + row.sys_id + "\')";

                                                    var data = {
                                                        clientInf: _clientInf,
                                                        whereString: whereClause
                                                    };



                                                    doAjaxFunction(_serviceUrl, 'RollBack', data, {
                                                        success: function (result)
                                                        {
                                                            _alertMessage.show('回滚操作成功', 'success');
                                                            that.bindGrid();
                                                        },
                                                        fail: function (message)
                                                        {
                                                            _alertMessage.show('回滚操作失败' + message, 'fail');
                                                        }
                                                    });


                                                },
                                                cancle: function ()
                                                {

                                                }
                                            });

                                    }
                                    else
                                    {

                                        _alertMessage.show('只能回滚客户的最后一条缴费记录', 'fail');
                                    }
                                },
                                fail: function (message)
                                {

                                    _alertMessage.show('回滚验证失败', 'fail');
                                }
                            });


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


                $('#table_grid_tbl_ld_jfb_list').bootstrapTable({
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
                        var rows = $('#table_grid_tbl_ld_jfb_list').bootstrapTable('getSelections');
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
                        var rows = $('#table_grid_tbl_ld_jfb_list').bootstrapTable('getData');
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
        addDetailData = function (callBackFunction)
        {
            var d = new Date();

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


                f_jfbh: '',


                f_sjbh: '',

                f_jfrq: d.Format('yyyy-MM-dd hh:mm:ss'),

                f_jffsid: '05740001',
                f_lyid: '08080003',


                f_jcfsid: '05750001',





                f_yyy: basePageObj._userInfoJson.sys_username,


                f_yyyid: basePageObj._userInfoJson.sys_userid,




                f_czsj: d.Format('yyyy-MM-dd hh:mm:ss'),

                f_sfykfp: 'false',

                f_ztid: '0',


                f_bz: '',

                f_khbh: '',


                f_khbhid: '',


                f_yhbh: '',


                f_yhbhid: '',


                f_yhm: '',


                f_jfm: '',


                f_dz: '',


                f_dh: '',


                f_dy: '',


                f_dyid: '',


                f_sc: '',


                f_scid: '',


                f_qy: '',


                f_qyid: '',


                f_pq: '',


                f_pqid: '',


                f_sbbh: '',


                f_sbbhid: '',


                f_yslx: '',


                f_yslxid: '',


                f_lxtkhh: '',


                f_sblx: '',


                f_sblxid: '',


                f_rs: '',


                f_cbbh: '',


                f_cbbhid: '',

                f_znjbh: '',


                f_znjbhid: '',


                f_znjje: '',


                f_fjbh: '',


                f_fjbhid: '',


                f_fjje: '',

                //新增
                f_yyt: basePageObj._userInfoJson.sys_toporganname,
                f_yytid: basePageObj._userInfoJson.sys_toporgan,
                f_dj: '',
                f_cbyslj: '',
                f_sllj: '',
                f_sflj: '',
                f_pwflj: '',
                f_jmhyslj: '',
                f_khytjjzsf: '',
                f_khytjjzpwf: '',
                f_sfsytjjz: '',
                f_khyye: '',
                f_sfsyye: '',
                f_syye: '',
                f_yhye: '',
                f_shys: '',
                f_dyjtsl: '',
                f_dyjtsf: '',
                f_dejtsl: '',
                f_dejtsf: '',
                f_dsjtsl: '',
                f_dsjtsf: '',
                f_khyycje: '',
                f_sfsyycje: '',
                f_syycje: '',
                f_yhycje: '',
                f_dszycje: '',
                f_shss: '',
                f_hszl: '',
                f_shssdx: '',
                f_khfz: '',
                f_khfzid: '',
                f_cbenbh: '',
                f_cbenbhid: '',
                f_ljqf: '',
                f_kplb: '',
                f_kplbid: '',
                f_sytjjzsf: '',
                f_sytjjzpwf: '',
                f_syhtjjzsf: '',
                f_syhtjjzpwf: '',
                f_jmjelj: '',




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

        getArea = function (id, callbackFunction)
        {
            ////////;
            var sqlString = '';
            sqlString += "select sys_id as id, f_mc as text ";
            sqlString += "from tbl_ldbm_dycq  ";
            sqlString += "where sys_delflag = '0' ";
            //sqlString += "and f_ztid = '0' ";
            sqlString += "and length(sys_orderid) =  ";
            sqlString += "    (select length(sys_orderid) + 4 from tbl_ldbm_dycq where sys_id = '" + id + "') ";
            sqlString += "and sys_orderid like ";
            sqlString += "    (select sys_orderid || '%' from tbl_ldbm_dycq where sys_id = '" + id + "') ";
            sqlString += "order by sys_orderid ";
            var sqlJson = {

                "tbl_ldbm_dycq": sqlString
            }

            commonObj.querySqls(sqlJson, {
                success: function (messageJson)
                {

                    callbackFunction.success(messageJson["tbl_ldbm_dycq"]);

                },
                fail: function (message)
                {
                }
            })
        },

        //地域onchange事件
        f_dy_onchange = function (e, callbackfunction)
        {
            // //////;
            if (e.added != undefined)
            {
                var nodeid = e.added.id;
                getArea(nodeid, {
                    success: function (jsonArray)
                    {

                        controlObj.singledropdownlistinit('search_f_sc_tbl_ld_jfb_list', jsonArray, f_sc_onchange);
                        controlObj.singledropdownlistid('search_f_sc_tbl_ld_jfb_list', '-1');
                        // controlObj.singledropdownlist('search_f_sc_tbl_ld_jfb_list', '');


                        if (callbackfunction != undefined)
                        {
                            callbackfunction.success();
                        }
                        else
                        {
                            controlObj.singledropdownlistinit('search_f_qy_tbl_ld_jfb_list', _baseCodeHashMap.get('codeservice_0514'), f_qy_onchange);
                            controlObj.singledropdownlistid('search_f_qy_tbl_ld_jfb_list', '-1');
                            // controlObj.singledropdownlist('search_f_qy_tbl_ld_jfb_list', '');

                            controlObj.singledropdownlistinit('search_f_pq_tbl_ld_jfb_list', _baseCodeHashMap.get('codeservice_0515'), f_pq_onchange);
                            controlObj.singledropdownlistid('search_f_pq_tbl_ld_jfb_list', '-1');
                            //controlObj.singledropdownlist('search_f_pq_tbl_ld_jfb_list', '');

                        }
                    }
                })
            }
            else
            {

                controlObj.singledropdownlistinit('search_f_sc_tbl_ld_jfb_list', _baseCodeHashMap.get('codeservice_0513'), f_sc_onchange);
                controlObj.singledropdownlistid('search_f_sc_tbl_ld_jfb_list', '-1');
                //controlObj.singledropdownlist('search_f_sc_tbl_ld_jfb_list', '');


                controlObj.singledropdownlistinit('search_f_qy_tbl_ld_jfb_list', _baseCodeHashMap.get('codeservice_0514'), f_qy_onchange);
                controlObj.singledropdownlistid('search_f_qy_tbl_ld_jfb_list', '-1');
                // controlObj.singledropdownlist('search_f_qy_tbl_ld_jfb_list', '');

                controlObj.singledropdownlistinit('search_f_pq_tbl_ld_jfb_list', _baseCodeHashMap.get('codeservice_0515'), f_pq_onchange);
                controlObj.singledropdownlistid('search_f_pq_tbl_ld_jfb_list', '-1');
                // controlObj.singledropdownlist('search_f_pq_tbl_ld_jfb_list', '');
            }


        },

        //水厂onchange事件
        f_sc_onchange = function (e, callbackfunction)
        {
            // //////;
            if (e.added != undefined)
            {
                var nodeid = e.added.id;
                getArea(nodeid, {
                    success: function (jsonArray)
                    {

                        controlObj.singledropdownlistinit('search_f_qy_tbl_ld_jfb_list', jsonArray, f_qy_onchange);
                        controlObj.singledropdownlistid('search_f_qy_tbl_ld_jfb_list', '-1');
                        //controlObj.singledropdownlist('search_f_qy_tbl_ld_jfb_list', '');

                        if (callbackfunction != undefined)
                        {
                            callbackfunction.success();
                        }
                        else
                        {


                            controlObj.singledropdownlistinit('search_f_pq_tbl_ld_jfb_list', _baseCodeHashMap.get('codeservice_0515'), f_pq_onchange);
                            controlObj.singledropdownlistid('search_f_pq_tbl_ld_jfb_list', '-1');
                            //controlObj.singledropdownlist('search_f_pq_tbl_ld_jfb_list', '');
                        }
                    }
                })
            }
            else
            {

                controlObj.singledropdownlistinit('search_f_qy_tbl_ld_jfb_list', _baseCodeHashMap.get('codeservice_0514'), f_qy_onchange);
                controlObj.singledropdownlistid('search_f_qy_tbl_ld_jfb_list', '-1');
                //  controlObj.singledropdownlist('search_f_qy_tbl_ld_jfb_list', '');

                controlObj.singledropdownlistinit('search_f_pq_tbl_ld_jfb_list', _baseCodeHashMap.get('codeservice_0515'), f_pq_onchange);
                controlObj.singledropdownlistid('search_f_pq_tbl_ld_jfb_list', '-1');
                // controlObj.singledropdownlist('search_f_pq_tbl_ld_jfb_list', '');
            }


        },

        //区域onchange事件
        f_qy_onchange = function (e, callbackfunction)
        {
            // //////;
            if (e.added != undefined)
            {
                var nodeid = e.added.id;
                getArea(nodeid, {
                    success: function (jsonArray)
                    {


                        controlObj.singledropdownlistinit('search_f_pq_tbl_ld_jfb_list', jsonArray, f_pq_onchange);
                        controlObj.singledropdownlistid('search_f_pq_tbl_ld_jfb_list', '-1');
                        //ontrolObj.singledropdownlist('search_f_pq_tbl_ld_jfb_list', '');

                        if (callbackfunction != undefined)
                        {
                            callbackfunction.success();
                        }
                    }
                })
            }
            else
            {
                controlObj.singledropdownlistinit('search_f_pq_tbl_ld_jfb_list', _baseCodeHashMap.get('codeservice_0515'), f_pq_onchange);
                controlObj.singledropdownlistid('search_f_pq_tbl_ld_jfb_list', '-1');
                //controlObj.singledropdownlist('search_f_pq_tbl_ld_jfb_list', '');
            }


        },

        //片区onchange事件
        f_pq_onchange = function (e)
        {
            var controlid = e.target.id;
        },
        //列显示弹出页
        initDetailControlShowColumn = function (callBackFunction)
        {
            try
            {
                var codeservice_0814 = _baseCodeHashMap.get('codeservice_0814');
                controlObj.multidropdownlistinit('model_dropdown_f_checklist_tbl_ld_jfb_showcolumnlist', codeservice_0814, null);
                //模态窗口
                $('#div_modal_tbl_ld_jfb_sortlist').modal({
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

        dateToString = function (now)
        {
            var year = now.getFullYear();
            var month = (now.getMonth() + 1).toString();
            var day = (now.getDate()).toString();
            var hour = (now.getHours()).toString();
            var minute = (now.getMinutes()).toString();
            var second = (now.getSeconds()).toString();
            if (month.length == 1)
            {
                month = "0" + month;
            }
            if (day.length == 1)
            {
                day = "0" + day;
            }
            if (hour.length == 1)
            {
                hour = "0" + hour;
            }
            if (minute.length == 1)
            {
                minute = "0" + minute;
            }
            if (second.length == 1)
            {
                second = "0" + second;
            }
            var dateTime = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
            return dateTime;
        },

        //金额小写转大写
        autoChinese = function (numberValue)
        {

            var numberValue = new String(Math.round(numberValue * 100)); // 数字金额
            var chineseValue = ""; // 转换后的汉字金额
            var String1 = "零壹贰叁肆伍陆柒捌玖"; // 汉字数字
            var String2 = "万仟佰拾亿仟佰拾万仟佰拾元角分"; // 对应单位
            var len = numberValue.length; // numberValue 的字符串长度
            var Ch1; // 数字的汉语读法
            var Ch2; // 数字位的汉字读法
            var nZero = 0; // 用来计算连续的零值的个数
            var String3; // 指定位置的数值
            if (len > 15)
            {
                alert("超出计算范围");
                return "";
            }
            if (numberValue == 0)
            {
                chineseValue = "零元整";
                return chineseValue;
            }
            String2 = String2.substr(String2.length - len, len); // 取出对应位数的STRING2的值
            for (var i = 0; i < len; i++)
            {
                String3 = parseInt(numberValue.substr(i, 1), 10); // 取出需转换的某一位的值
                if (i != (len - 3) && i != (len - 7) && i != (len - 11) && i != (len - 15))
                {
                    if (String3 == 0)
                    {
                        Ch1 = "";
                        Ch2 = "";
                        nZero = nZero + 1;
                    }
                    else if (String3 != 0 && nZero != 0)
                    {
                        Ch1 = "零" + String1.substr(String3, 1);
                        Ch2 = String2.substr(i, 1);
                        nZero = 0;
                    }
                    else
                    {
                        Ch1 = String1.substr(String3, 1);
                        Ch2 = String2.substr(i, 1);
                        nZero = 0;
                    }
                }
                else
                { // 该位是万亿，亿，万，元位等关键位
                    if (String3 != 0 && nZero != 0)
                    {
                        Ch1 = "零" + String1.substr(String3, 1);
                        Ch2 = String2.substr(i, 1);
                        nZero = 0;
                    }
                    else if (String3 != 0 && nZero == 0)
                    {
                        Ch1 = String1.substr(String3, 1);
                        Ch2 = String2.substr(i, 1);
                        nZero = 0;
                    }
                    else if (String3 == 0 && nZero >= 3)
                    {
                        Ch1 = "";
                        Ch2 = "";
                        nZero = nZero + 1;
                    }
                    else
                    {
                        Ch1 = "";
                        Ch2 = String2.substr(i, 1);
                        nZero = nZero + 1;
                    }
                    if (i == (len - 11) || i == (len - 3))
                    { // 如果该位是亿位或元位，则必须写上
                        Ch2 = String2.substr(i, 1);
                    }
                }
                chineseValue = chineseValue + Ch1 + Ch2;
            }
            if (String3 == 0)
            { // 最后一位（分）为0时，加上“整”
                chineseValue = chineseValue + "整";
            }
            return chineseValue;
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
        //人员类型，0：是管理员显示全部缴费  1：营业员只能看到自己的人员信息
        _pr_isadmin: '',

        //来源 08080003营业厅   08080002建行托收
        _pr_ly: '',

        //状态 0新建
        _pr_zt: '',

        //当前被选中的行的ID集合的字符串//1^2^6
        _pr_gridselectids: '',
        //当前在第几页
        _pr_gridpageindex: 1,
        //当前的查询模式：1：简单查询；2：高级查询
        _pr_searchtype: '1',
        //查询内容type1:简单查询内容；type2：高级查询内容（JSON）
        _pr_searchcontent: null,
        //日期查询
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

                                                        _validateMessage = new validateMessage('btn_search_modal_search_tbl_ld_jfb_list');
                                                        _validateMessage_searchtime = new validateMessage('btn_modal_searchtime_tbl_ld_jfb_list');

                                                        _ladda_btn_command_new = Ladda.create('btn_command_new_tbl_ld_jfb_list');
                                                        _ladda_btn_command_delete = Ladda.create('btn_command_delete_tbl_ld_jfb_list');
                                                        _ladda_btn_command_exp = Ladda.create('btn_command_export_tbl_ld_jfb_list');
                                                        _ladda_btn_command_his = Ladda.create('btn_command_his_tbl_ld_jfb_list');
                                                        _ladda_btn_command_showcolunm = Ladda.create('btn_command_showcolunm_tbl_ld_jfb_list');
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
                                                        initDetailControlShowColumn({
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
                $("#sumsllj").html("");
                $("#sumsflj").html("");
                $("#sumpwflj").html("");
                $("#sumcbyslj").html("");
                $("#sumshss").html("");
                $("#sumdszycje").html("");
                $("#sumsyycje").html("");

                $('#table_grid_tbl_ld_jfb_list').bootstrapTable("showLoading");


                if (_whereClauseString == null || _whereClauseString == "")
                {
                    _whereClauseString += " 1=1 ";
                }
                //营业员
                if (that._pr_isadmin != '0')
                {
                    _whereClauseString += " and f_yyyid ='" + basePageObj._userInfoJson.sys_userid + "'";
                }

                //来源
                if (that._pr_ly != '')
                {
                    _whereClauseString += " and f_lyid in ('" + that._pr_ly.replaceAll(',', '\',\'') + "')";

                }

                //状态
                if (that._pr_zt != '')
                {
                    _whereClauseString += " and f_ztid in ('" + that._pr_zt.replaceAll(',', '\',\'') + "')";
                }



                var orderByString = ' f_czsj desc';
                var columnsString = 'f_value1^f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^f_jfbh^f_sjbh^f_jfrq^f_yyy^f_yyyid^f_zt^f_ztid^f_bz^f_khbh^f_khbhid^f_yhbh^f_yhbhid^f_yhm^f_jfm^f_dz^f_dh^f_dy^f_dyid^f_sc^f_scid^f_qy^f_qyid^f_pq^f_pqid^f_sbbh^f_sbbhid^f_yslx^f_yslxid^f_lxtkhh^f_sblx^f_sblxid^f_rs^f_cbbh^f_cbbhid^f_znjbh^f_znjbhid^f_znjje^f_fjbh^f_fjbhid^f_fjje^f_jffs^f_jffsid^f_jcfs^f_jcfsid^f_czsj^f_sfykfp^f_yyt^f_yytid^f_dj^f_cbyslj^f_sllj^f_sflj^f_pwflj^f_jmhyslj^f_khytjjzsf^f_khytjjzpwf^f_sfsytjjz^f_khyye^f_sfsyye^f_syye^f_yhye^f_shys^f_dyjtsl^f_dyjtsf^f_dejtsl^f_dejtsf^f_dsjtsl^f_dsjtsf^f_khyycje^f_sfsyycje^f_syycje^f_yhycje^f_dszycje^f_shss^f_hszl^f_shssdx^f_khfz^f_khfzid^f_cbenbh^f_cbenbhid^f_ljqf^f_kplb^f_kplbid^f_sytjjzsf^f_sytjjzpwf^f_syhtjjzsf^f_syhtjjzpwf^f_jmjelj^f_ly^f_lyid^f_jfrq^sys_id^f_sfjl^f_yqjmsfbfb^f_yqjmpwfbfb^f_yqjmsfje^f_yqjmpwfje';
                // columnsString += '^ROUND(TO_NUMBER(CURRENT_DATE - f_jfrq  ) * 24) as edittime';
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

                        $('#table_grid_tbl_ld_jfb_list').bootstrapTable("hideLoading");

                        $('#table_grid_tbl_ld_jfb_list').bootstrapTable("loadJson", messageJson);

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
                //营业员
                if (that._pr_isadmin != '0')
                {
                    _whereClauseString += " and f_yyyid ='" + basePageObj._userInfoJson.sys_userid + "'";
                }

                //来源
                if (that._pr_ly != '')
                {
                    _whereClauseString += " and f_lyid in ('" + that._pr_ly.replaceAll(',', '\',\'') + "')";

                }

                //状态
                if (that._pr_zt != '')
                {
                    _whereClauseString += " and f_ztid in ('" + that._pr_zt.replaceAll(',', '\',\'') + "')";
                }

                var sumString = 'f_cbyslj^f_sllj^f_sflj^f_pwflj^f_shss^f_dszycje^f_syycje';
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
                        $("#sumpwflj").html("<strong>污水处理费合计:</strong>" + messageJson.f_pwflj);
                        $("#sumcbyslj").html("<strong>抄表应收合计:</strong>" + messageJson.f_cbyslj);
                        $("#sumshss").html("<strong>算后实收合计:</strong>" + messageJson.f_shss);
                        $("#sumdszycje").html("<strong>增加余额合计:</strong>" + messageJson.f_dszycje);
                        $("#sumsyycje").html("<strong>使用余额合计:</strong>" + messageJson.f_syycje);
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
        *  方法:btn_command_new_onclick
        *  参数:
        *  新建数据并打开DetailModel
        */
        btn_command_new_onclick: function ()
        {
            _ladda_btn_command_new.start();
            addDetailData({
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
                var currentcount = $('#table_grid_tbl_ld_jfb_list').bootstrapTable('getSelections').length;
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
            $('#table_grid_tbl_ld_jfb_list').bootstrapTable('uncheckAll');
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
                switch (that._pr_searchtime)
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
            $('#btn_command_search_tbl_ld_jfb_list').html('简单查询');
            $('#txt_command_search_tbl_ld_jfb_list').removeAttr('disabled');
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
            $('#btn_command_search_tbl_ld_jfb_list').html('高级查询');
            $('#txt_command_search_tbl_ld_jfb_list').attr('disabled', 'disabled');

            $('#div_search_modal_tbl_ld_jfb_list').modal('show');
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
                                    $('#div_search_modal_tbl_ld_jfb_list').modal('hide')
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
            _validateMessage.hidden();
            $('#div_search_modal_tbl_ld_jfb_list').modal('hide');

            that._pr_searchtype = '1';
            $('#btn_command_search_tbl_ld_jfb_list').html('简单查询');
            $('#txt_command_search_tbl_ld_jfb_list').removeAttr('disabled');
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
            $('#btn_command_search_tbl_ld_jfb_list').html('高级查询');
            $('#txt_command_search_tbl_ld_jfb_list').attr('disabled', 'disabled');

            $('#div_search_modal_tbl_ld_jfb_list').modal('show');
        },
        //旧导出
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

        //            _alertMessage.show('数据导出失败', 'fail');
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

        //查询时间
        btn_showtime_search_onclick: function ()
        {

            $('#div_searchtime_modal_tbl_ld_jfb_list').modal('show');

        },
        btn_searchtime_modal_ok_onclick: function ()
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
                                    $('#div_searchtime_modal_tbl_ld_jfb_list').modal('hide');
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
        btn_searchtime_modal_cancle_onclick: function ()
        {
            _validateMessage_searchtime.hidden();
            $('#div_searchtime_modal_tbl_ld_jfb_list').modal('hide');
        },
        //导出
        btn_command_export_onclick: function ()
        {
            _ladda_btn_command_exp.start();
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
            var column = getCookie('tbl_ld_jfb_list_column');
            var columnname = getCookie('tbl_ld_jfb_list_columnname');
            if (_whereClauseString == "")
            {
                var where = " 1=1";
            }
            else
            {
                var where = _whereClauseString;
            }



            if (column != null && columnname != null && column != "" && columnname != "")
            {
                var columnsString = column;
                var colunmsName = columnname;
            }
            else
            {
                var columnsString = 'f_khbh,f_sjbh,f_jfbh,f_yhm,f_dz,f_sfjl,f_cbyslj,f_sflj,f_pwflj,f_syycje,f_shss,f_jmjelj,f_jffs,f_jcfs,f_yyy,f_czsj,f_sfykfp,f_kplb,f_yyt,f_zt,f_ly';
                var colunmsName = '客户编号,收据编号,缴费编号,用户名,地址,单价明细   ,抄表应收累计,水费累计,污水处理费累计,使用余额,算后实收,减免金额,缴费方式,缴存方式,操作人,操作时间,是否已开发票,开票类别,营业厅,状态,来源';
            }
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
        //历史库切换功能
        btn_command_his_onclick: function ()
        {
            if ($('#btn_command_his_tbl_ld_jfb_list').hasClass('btn-default'))
            {
                $('#btn_command_his_tbl_ld_jfb_list').removeClass('btn-default');
                $('#btn_command_his_tbl_ld_jfb_list').addClass('btn-primary');
                $('#btn_command_his_tbl_ld_jfb_list').text('含历史库数据');

                that._pr_searchhis = 'true';
            }
            else
            {
                $('#btn_command_his_tbl_ld_jfb_list').removeClass('btn-primary');
                $('#btn_command_his_tbl_ld_jfb_list').addClass('btn-default');
                $('#btn_command_his_tbl_ld_jfb_list').text('不含历史库数据');

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
        //列显示
        btn_command_showcolunm_onclick: function ()
        {
            _ladda_btn_command_showcolunm.start();
            var column = getCookie('tbl_ld_jfb_list_column');
            if (column != null && column != 'undefined' && column != "")
            {
                controlObj.multidropdownlistid('model_dropdown_f_checklist_tbl_ld_jfb_showcolumnlist', column);
            }
            $('#div_modal_tbl_ld_jfb_showcolumnlist').modal('show');
        },
        //列显示取消按钮
        btn_showcolumn_modal_cancle_onclick: function ()
        {
            $('#div_modal_tbl_ld_jfb_showcolumnlist').modal('hide');
            _ladda_btn_command_showcolunm.stop();
        },
        //列显示确定按钮
        btn_showcolumn_modal_save_onclick: function ()
        {
            var column = controlObj.multidropdownlistid('model_dropdown_f_checklist_tbl_ld_jfb_showcolumnlist');
            var columnname = controlObj.multidropdownlist('model_dropdown_f_checklist_tbl_ld_jfb_showcolumnlist');
            setCookieMinutes("tbl_ld_jfb_list_column", column, 5256000);
            setCookieMinutes("tbl_ld_jfb_list_columnname", columnname, 5256000);
            $("#table_grid_tbl_ld_jfb_list").bootstrapTable('destroy');
            initGrid({
                success: function ()
                {
                    that.bindGrid({
                        success: function ()
                        {
                            $('#div_modal_tbl_ld_jfb_showcolumnlist').modal('hide');
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
    tbl_ld_jfb_list_Obj.init();
});



