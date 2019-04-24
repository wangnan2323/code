


var _clientInf = '{userid="",appcode="54",appname="",userip="",usermac="",username=""}';
var _blockMessage = null;
var _alertMessage = null;
var _resultMessage = null;
var _confirmMessage = null;

var tbl_ld_sbb_list_Obj = (function ()
{
    'use strict';

    //=================================================================================
    //                                      私有
    //=================================================================================
    //=================================================================================
    //                                      私有属性 
    //=================================================================================

    var _serviceUrl = '//127.0.0.1/sara.dd.ldsw/service/service_tbl_ld_sbb.asmx/',
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
        _ladda_btn_command_showcolunm = null,

    //查询sql语句
    _whereClauseString = '',
    _sblxid = '',
    _sblx = '',
    _sbbh = '',
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
            that._pr_ztids = requestQuery('ztids');
            that._pr_appcode = requestQuery('appcode');
            that._pr_gridselectids = requestQuery('gridselectids');
            that._pr_gridpageindex = requestQuery('gridpageIndex');
            that._pr_searchtype = requestQuery('searchtype');
            that._pr_searchcontent = requestQuery('searchcontent');
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
                    $('#btn_command_search_tbl_ld_sbb_list').html('简单查询');
                    $('#txt_command_search_tbl_ld_sbb_list').removeAttr("disabled");

                    break;
                case "2":
                    $('#btn_command_search_tbl_ld_sbb_list').html('高级查询');
                    $('#txt_command_search_tbl_ld_sbb_list').attr("disabled", true);
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
            if (that._pr_ztids == null || that._pr_ztids == '' || that._pr_ztids == 'null')
            {
                that._pr_ztids = '';
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
                $('#btn_command_delete_tbl_ld_sbb_list').addClass('hidden');
                $('#btn_command_new_tbl_ld_sbb_list').addClass('hidden');
            }
            else
            {
                $('#btn_command_delete_tbl_ld_sbb_list').removeClass('hidden');
                $('#btn_command_new_tbl_ld_sbb_list').removeClass('hidden');
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
        var url = '../tbl_ld_sbb/tbl_ld_sbb_detail.html';
        url += '?uid=' + basePageObj._userInfoJson.sys_userid;
        url += '&sys_id=' + id;
        url += '&pagetype=' + pagetype;
        url += '&appcode=' + that._pr_appcode;
        url += '&fromurl=../tbl_ld_sbb/tbl_ld_sbb_list.html';
        url += '&fromurlparam={';
        url += '"appcode":"' + that._pr_appcode + '",';
        url += '"listtype":"' + that._pr_listtype + '",';
        url += '"ztids":"' + that._pr_ztids + '",';
        url += '"gridselectids":"' + that._pr_gridselectids + '",';
        url += '"gridpageindex":"' + that._pr_gridpageindex + '",';
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

        codeServiceId += "0522^";

        codeServiceId += "0523^";

        codeServiceId += "0524^";

        codeServiceId += "0525^";

        codeServiceId += "0526^";

        codeServiceId = codeServiceId.trimEnd('^');
        commonObj.getCodeServiceJson(codeServiceId, {
            success: function (resultArray)
            {
                try
                {
                  
                    _baseCodeHashMap = new hashMap();

                    //_baseCodeHashMap.put('codeservice_0522', resultArray['0522']);

                    _baseCodeHashMap.put('codeservice_0523', resultArray['0523']);

                    _baseCodeHashMap.put('codeservice_0524', resultArray['0524']);

                    _baseCodeHashMap.put('codeservice_0525', resultArray['0525']);

                    _baseCodeHashMap.put('codeservice_0526', resultArray['0526']);
                    var columnsArray = [
                    { "id": "f_sbbh", "text": "水表编号" },
                    { "id": "f_ztsbh", "text": "旧水表号" },
                    { "id": "f_lxth", "text": "老系统号" },
                    { "id": "f_khbh", "text": "客户编号" },
                    { "id": "f_sbfz", "text": "水表分组" },
                    { "id": "f_sbpp", "text": "水表品牌" },
                    { "id": "f_mph", "text": "铭牌号" },
                    { "id": "f_sbdz", "text": "水表地址" },
                    { "id": "f_rs", "text": "人数" },
                    { "id": "f_qsqpjsl", "text": "前三期平均水量" },
                    { "id": "f_qlqpjsl", "text": "前六期平均水量" },
                    { "id": "f_sbkj", "text": "水表口径" },
                    { "id": "f_sblx", "text": "水表类型" },
                    { "id": "f_jllx", "text": "计量类型" },
                    { "id": "f_cszm", "text": "初始止码" },
                    { "id": "f_bqzm", "text": "本期止码" },
                    { "id": "f_sqzm", "text": "上期止码" },
                    { "id": "f_sqsl", "text": "上期水量" },
                    { "id": "f_ljgl", "text": "累计购量" },
                    { "id": "f_bqsl", "text": "当月水量" },
                    { "id": "f_nljgl", "text": "年累计购量" },
                    { "id": "f_azrq", "text": "安装日期" },
                    { "id": "f_qfzt", "text": "铅封状态" },
                    { "id": "f_zt", "text": "状态" },
                    { "id": "f_bz", "text": "备注" }
                    //{ "id": "f_fj", "text": "附件" }
                    //{ "id": "f_jllxid  ", "text": "计量类型id" },
                    //{ "id": "f_sblxid", "text": "水表类型id" },
                    //{ "id": "f_sbkjid", "text": "水表口径id" },
                    //{ "id": "f_sbfzid  ", "text": "水表分组id" },
                    //{ "id": "f_ztid	", "text": "状态id" },

                    ];
                    _baseCodeHashMap.put('codeservice_0814', columnsArray);

                    var sqlJson = {
                        "tbl_ldbm_sbfz": "select sys_id as id, f_fzmc as text,decode(f_ztid,'0','false','true') as disabled from tbl_ldbm_sbfz where sys_delflag='0'  order by sys_id",
                    }
                    //select sys_id as id, f_fzbm||'_'||f_fzmc as text from tbl_ldbm_yhfz where sys_delflag='0' and f_ztid='0'
                    commonObj.querySqls(sqlJson, {
                        success: function (messageJson)
                        {


                            _baseCodeHashMap.put('codeservice_0522', messageJson["tbl_ldbm_sbfz"]);
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

            var codeService_0522 = _baseCodeHashMap.get('codeservice_0522');

            var codeService_0523 = _baseCodeHashMap.get('codeservice_0523');

            var codeService_0524 = _baseCodeHashMap.get('codeservice_0524');

            var codeService_0525 = _baseCodeHashMap.get('codeservice_0525');

            var codeService_0526 = _baseCodeHashMap.get('codeservice_0526');

            controlObj.multidropdownlistinit('search_f_sbfz_tbl_ld_sbb_list', codeService_0522);

            controlObj.multidropdownlistinit('search_f_sbkj_tbl_ld_sbb_list', codeService_0523);

            controlObj.multidropdownlistinit('search_f_sblx_tbl_ld_sbb_list', codeService_0524);

            controlObj.multidropdownlistinit('search_f_jllx_tbl_ld_sbb_list', codeService_0525);

            controlObj.multidropdownlistinit('search_f_zt_tbl_ld_sbb_list', codeService_0526);

            controlObj.datetimeinit('search_f_azrq_tbl_ld_sbb_list_datefrom', 'search_f_azrq_tbl_ld_sbb_list_timefrom');
            controlObj.datetimeinit('search_f_azrq_tbl_ld_sbb_list_dateto', 'search_f_azrq_tbl_ld_sbb_list_timeto');

            controlObj.datetime('search_f_azrq_tbl_ld_sbb_list_datefrom', 'search_f_azrq_tbl_ld_sbb_list_timefrom', '1900-01-01 00:00:00');
            controlObj.datetime('search_f_azrq_tbl_ld_sbb_list_dateto', 'search_f_azrq_tbl_ld_sbb_list_timeto', '1900-01-01 00:00:00');

            controlObj.multidropdownlistinit('search_f_qfzt_tbl_ld_sbb_list', [{ id: 'true', text: '是' }, { id: 'false', text: '否' }]);


            //模态窗口
            $('#div_search_modal_tbl_ld_sbb_list').modal({
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
                        $("#txt_command_search_tbl_ld_sbb_list").val(that._pr_searchcontent.type1);
                    }

                    break;
                case "2":
                    if (that._pr_searchcontent.type2 != undefined)
                    {
                        //高级查询
                        var tbl_ld_sbb_list = that._pr_searchcontent.type2;


                        controlObj.text('search_f_value1_tbl_ld_sbb_list', tbl_ld_sbb_list.f_value1);

                        controlObj.text('search_f_value2_tbl_ld_sbb_list', tbl_ld_sbb_list.f_value2);

                        controlObj.text('search_f_value3_tbl_ld_sbb_list', tbl_ld_sbb_list.f_value3);

                        controlObj.text('search_f_value4_tbl_ld_sbb_list', tbl_ld_sbb_list.f_value4);

                        controlObj.text('search_f_value5_tbl_ld_sbb_list', tbl_ld_sbb_list.f_value5);

                        controlObj.text('search_f_value6_tbl_ld_sbb_list', tbl_ld_sbb_list.f_value6);

                        controlObj.text('search_f_value7_tbl_ld_sbb_list', tbl_ld_sbb_list.f_value7);

                        controlObj.text('search_f_value8_tbl_ld_sbb_list', tbl_ld_sbb_list.f_value8);

                        controlObj.text('search_f_value9_tbl_ld_sbb_list', tbl_ld_sbb_list.f_value9);

                        controlObj.text('search_f_value10_tbl_ld_sbb_list', tbl_ld_sbb_list.f_value10);

                        controlObj.text('search_f_khbh_tbl_ld_sbb_list', tbl_ld_sbb_list.f_khbh);

                        controlObj.text('search_f_sbbh_tbl_ld_sbb_list', tbl_ld_sbb_list.f_sbbh);

                        controlObj.text('search_f_ztsbh_tbl_ld_sbb_list', tbl_ld_sbb_list.f_ztsbh);

                        controlObj.text('search_f_lxth_tbl_ld_sbb_list', tbl_ld_sbb_list.f_lxth);

                        controlObj.multidropdownlistid('search_f_sbfz_tbl_ld_sbb_list', tbl_ld_sbb_list.f_sbfzid);

                        controlObj.text('search_f_sbpp_tbl_ld_sbb_list', tbl_ld_sbb_list.f_sbpp);

                        controlObj.text('search_f_mph_tbl_ld_sbb_list', tbl_ld_sbb_list.f_mph);

                        controlObj.text('search_f_sbdz_tbl_ld_sbb_list', tbl_ld_sbb_list.f_sbdz);

                        controlObj.text('search_f_rs_tbl_ld_sbb_list', tbl_ld_sbb_list.f_rs);

                        controlObj.multidropdownlistid('search_f_sbkj_tbl_ld_sbb_list', tbl_ld_sbb_list.f_sbkjid);

                        controlObj.multidropdownlistid('search_f_sblx_tbl_ld_sbb_list', tbl_ld_sbb_list.f_sblxid);

                        controlObj.multidropdownlistid('search_f_jllx_tbl_ld_sbb_list', tbl_ld_sbb_list.f_jllxid);

                        controlObj.text('search_f_cszm_tbl_ld_sbb_list', tbl_ld_sbb_list.f_cszm);

                        controlObj.text('search_f_bqzm_tbl_ld_sbb_list', tbl_ld_sbb_list.f_bqzm);

                        controlObj.text('search_f_sqzm_tbl_ld_sbb_list', tbl_ld_sbb_list.f_sqzm);

                        controlObj.text('search_f_sqsl_tbl_ld_sbb_list', tbl_ld_sbb_list.f_sqsl);
                        controlObj.text('search_f_bqsl_tbl_ld_sbb_list', tbl_ld_sbb_list.f_bqsl);

                        controlObj.text('search_f_ljgl_tbl_ld_sbb_list', tbl_ld_sbb_list.f_ljgl);
                        controlObj.text('search_f_nljgl_tbl_ld_sbb_list', tbl_ld_sbb_list.f_nljgl);

                        controlObj.text('search_f_qsqpjsl_tbl_ld_sbb_list', tbl_ld_sbb_list.f_qsqpjsl);

                        controlObj.text('search_f_qlqpjsl_tbl_ld_sbb_list', tbl_ld_sbb_list.f_qlqpjsl);

                        controlObj.multidropdownlistid('search_f_zt_tbl_ld_sbb_list', tbl_ld_sbb_list.f_ztid);

                        controlObj.text('search_f_bz_tbl_ld_sbb_list', tbl_ld_sbb_list.f_bz);


                        controlObj.datetime('search_f_azrq_tbl_ld_sbb_list_datefrom', 'search_f_azrq_tbl_ld_sbb_list_timefrom', tbl_ld_sbb_list.f_azrqfrom);
                        controlObj.datetime('search_f_azrq_tbl_ld_sbb_list_dateto', 'search_f_azrq_tbl_ld_sbb_list_timeto', tbl_ld_sbb_list.f_azrqto);

                        controlObj.multidropdownlistid('search_f_qfzt_tbl_ld_sbb_list', tbl_ld_sbb_list.f_qfztid);
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
            switch (that._pr_searchtype)
            {

                case "1":
                    //简单查询
                    that._pr_searchcontent.type1 = $("#txt_command_search_tbl_ld_sbb_list").val();

                    break;
                case "2":

                    //高级查询
                    var tbl_ld_sbb_list = new Object();


                    tbl_ld_sbb_list.f_value1 = controlObj.text('search_f_value1_tbl_ld_sbb_list');


                    tbl_ld_sbb_list.f_value2 = controlObj.text('search_f_value2_tbl_ld_sbb_list');


                    tbl_ld_sbb_list.f_value3 = controlObj.text('search_f_value3_tbl_ld_sbb_list');


                    tbl_ld_sbb_list.f_value4 = controlObj.text('search_f_value4_tbl_ld_sbb_list');


                    tbl_ld_sbb_list.f_value5 = controlObj.text('search_f_value5_tbl_ld_sbb_list');


                    tbl_ld_sbb_list.f_value6 = controlObj.text('search_f_value6_tbl_ld_sbb_list');


                    tbl_ld_sbb_list.f_value7 = controlObj.text('search_f_value7_tbl_ld_sbb_list');


                    tbl_ld_sbb_list.f_value8 = controlObj.text('search_f_value8_tbl_ld_sbb_list');


                    tbl_ld_sbb_list.f_value9 = controlObj.text('search_f_value9_tbl_ld_sbb_list');


                    tbl_ld_sbb_list.f_value10 = controlObj.text('search_f_value10_tbl_ld_sbb_list');


                    tbl_ld_sbb_list.f_khbh = controlObj.text('search_f_khbh_tbl_ld_sbb_list');


                    tbl_ld_sbb_list.f_sbbh = controlObj.text('search_f_sbbh_tbl_ld_sbb_list');


                    tbl_ld_sbb_list.f_ztsbh = controlObj.text('search_f_ztsbh_tbl_ld_sbb_list');


                    tbl_ld_sbb_list.f_lxth = controlObj.text('search_f_lxth_tbl_ld_sbb_list');


                    tbl_ld_sbb_list.f_sbfzid = controlObj.multidropdownlistid('search_f_sbfz_tbl_ld_sbb_list');


                    tbl_ld_sbb_list.f_sbpp = controlObj.text('search_f_sbpp_tbl_ld_sbb_list');


                    tbl_ld_sbb_list.f_mph = controlObj.text('search_f_mph_tbl_ld_sbb_list');


                    tbl_ld_sbb_list.f_sbdz = controlObj.text('search_f_sbdz_tbl_ld_sbb_list');


                    tbl_ld_sbb_list.f_rs = controlObj.text('search_f_rs_tbl_ld_sbb_list');


                    tbl_ld_sbb_list.f_sbkjid = controlObj.multidropdownlistid('search_f_sbkj_tbl_ld_sbb_list');


                    tbl_ld_sbb_list.f_sblxid = controlObj.multidropdownlistid('search_f_sblx_tbl_ld_sbb_list');


                    tbl_ld_sbb_list.f_jllxid = controlObj.multidropdownlistid('search_f_jllx_tbl_ld_sbb_list');


                    tbl_ld_sbb_list.f_cszm = controlObj.text('search_f_cszm_tbl_ld_sbb_list');


                    tbl_ld_sbb_list.f_bqzm = controlObj.text('search_f_bqzm_tbl_ld_sbb_list');


                    tbl_ld_sbb_list.f_sqzm = controlObj.text('search_f_sqzm_tbl_ld_sbb_list');


                    tbl_ld_sbb_list.f_sqsl = controlObj.text('search_f_sqsl_tbl_ld_sbb_list');

                    tbl_ld_sbb_list.f_bqsl = controlObj.text('search_f_bqsl_tbl_ld_sbb_list');


                    tbl_ld_sbb_list.f_ljgl = controlObj.text('search_f_ljgl_tbl_ld_sbb_list');
                    tbl_ld_sbb_list.f_nljgl = controlObj.text('search_f_nljgl_tbl_ld_sbb_list');

                    tbl_ld_sbb_list.f_qsqpjsl = controlObj.text('search_f_qsqpjsl_tbl_ld_sbb_list');


                    tbl_ld_sbb_list.f_qlqpjsl = controlObj.text('search_f_qlqpjsl_tbl_ld_sbb_list');


                    tbl_ld_sbb_list.f_ztid = controlObj.multidropdownlistid('search_f_zt_tbl_ld_sbb_list');


                    tbl_ld_sbb_list.f_bz = controlObj.text('search_f_bz_tbl_ld_sbb_list');

                    tbl_ld_sbb_list.f_azrqfrom = controlObj.datetime('search_f_azrq_tbl_ld_sbb_list_datefrom', 'search_f_azrq_tbl_ld_sbb_list_timefrom'); // datefrom + ' ' + timefrom;
                    tbl_ld_sbb_list.f_azrqto = controlObj.datetime('search_f_azrq_tbl_ld_sbb_list_dateto', 'search_f_azrq_tbl_ld_sbb_list_timeto'); //dateto + ' ' + timeto;                 

                    tbl_ld_sbb_list.f_qfztid = controlObj.multidropdownlistid('search_f_qfzt_tbl_ld_sbb_list');



                    that._pr_searchcontent.type2 = tbl_ld_sbb_list;
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
            var tbl_ld_sbb_list = that._pr_searchcontent.type2;
            var errorMessageHansMap = new hashMap();
            var errorMessagePlacementHansMap = new hashMap();




            if (tbl_ld_sbb_list.f_value1.length > 200)
            {
                errorMessageHansMap.put('search_f_value1_tbl_ld_sbb_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_sbb_list.f_value2.length > 200)
            {
                errorMessageHansMap.put('search_f_value2_tbl_ld_sbb_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_sbb_list.f_value3.length > 200)
            {
                errorMessageHansMap.put('search_f_value3_tbl_ld_sbb_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_sbb_list.f_value4.length > 200)
            {
                errorMessageHansMap.put('search_f_value4_tbl_ld_sbb_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_sbb_list.f_value5.length > 200)
            {
                errorMessageHansMap.put('search_f_value5_tbl_ld_sbb_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_sbb_list.f_value6.length > 200)
            {
                errorMessageHansMap.put('search_f_value6_tbl_ld_sbb_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_sbb_list.f_value7.length > 200)
            {
                errorMessageHansMap.put('search_f_value7_tbl_ld_sbb_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_sbb_list.f_value8.length > 200)
            {
                errorMessageHansMap.put('search_f_value8_tbl_ld_sbb_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_sbb_list.f_value9.length > 200)
            {
                errorMessageHansMap.put('search_f_value9_tbl_ld_sbb_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_sbb_list.f_value10.length > 200)
            {
                errorMessageHansMap.put('search_f_value10_tbl_ld_sbb_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_sbb_list.f_khbh.length > 200)
            {
                errorMessageHansMap.put('search_f_khbh_tbl_ld_sbb_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_sbb_list.f_sbbh.length > 200)
            {
                errorMessageHansMap.put('search_f_sbbh_tbl_ld_sbb_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_sbb_list.f_ztsbh.length > 200)
            {
                errorMessageHansMap.put('search_f_ztsbh_tbl_ld_sbb_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_sbb_list.f_lxth.length > 200)
            {
                errorMessageHansMap.put('search_f_lxth_tbl_ld_sbb_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_sbb_list.f_sbfzid.length > 200)
            {
                errorMessageHansMap.put('search_f_sbfz_tbl_ld_sbb_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_sbb_list.f_sbpp.length > 200)
            {
                errorMessageHansMap.put('search_f_sbpp_tbl_ld_sbb_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_sbb_list.f_mph.length > 200)
            {
                errorMessageHansMap.put('search_f_mph_tbl_ld_sbb_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_sbb_list.f_sbdz.length > 200)
            {
                errorMessageHansMap.put('search_f_sbdz_tbl_ld_sbb_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_sbb_list.f_rs.length > 200)
            {
                errorMessageHansMap.put('search_f_rs_tbl_ld_sbb_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_sbb_list.f_sbkjid.length > 200)
            {
                errorMessageHansMap.put('search_f_sbkj_tbl_ld_sbb_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_sbb_list.f_sblxid.length > 200)
            {
                errorMessageHansMap.put('search_f_sblx_tbl_ld_sbb_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_sbb_list.f_jllxid.length > 200)
            {
                errorMessageHansMap.put('search_f_jllx_tbl_ld_sbb_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_sbb_list.f_cszm.length > 200)
            {
                errorMessageHansMap.put('search_f_cszm_tbl_ld_sbb_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_sbb_list.f_bqzm.length > 200)
            {
                errorMessageHansMap.put('search_f_bqzm_tbl_ld_sbb_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_sbb_list.f_sqzm.length > 200)
            {
                errorMessageHansMap.put('search_f_sqzm_tbl_ld_sbb_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_sbb_list.f_sqsl.length > 200)
            {
                errorMessageHansMap.put('search_f_sqsl_tbl_ld_sbb_list', '长度不能超过<a style="color:red">200</a>个字');
            }
            if (tbl_ld_sbb_list.f_bqsl.length > 200)
            {
                errorMessageHansMap.put('search_f_bqsl_tbl_ld_sbb_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_sbb_list.f_ljgl.length > 200)
            {
                errorMessageHansMap.put('search_f_ljgl_tbl_ld_sbb_list', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_sbb_list.f_nljgl.length > 200)
            {
                errorMessageHansMap.put('search_f_nljgl_tbl_ld_sbb_list', '长度不能超过<a style="color:red">200</a>个字');
            }


            if (tbl_ld_sbb_list.f_qsqpjsl.length > 200)
            {
                errorMessageHansMap.put('search_f_qsqpjsl_tbl_ld_sbb_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_sbb_list.f_qlqpjsl.length > 200)
            {
                errorMessageHansMap.put('search_f_qlqpjsl_tbl_ld_sbb_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_sbb_list.f_ztid.length > 200)
            {
                errorMessageHansMap.put('search_f_zt_tbl_ld_sbb_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_sbb_list.f_qfztid.length > 200)
            {
                errorMessageHansMap.put('search_f_bz_tbl_ld_sbb_list', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_sbb_list.f_qfztid.length > 200)
            {
                errorMessageHansMap.put('search_f_qfzt_tbl_ld_sbb_list', '长度不能超过<a style="color:red">200</a>个字');
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
                controlObj.text('search_f_value1_tbl_ld_sbb_list', that._pr_searchcontent.type2.f_value1);


                that._pr_searchcontent.type2.f_value2 = '';
                controlObj.text('search_f_value2_tbl_ld_sbb_list', that._pr_searchcontent.type2.f_value2);


                that._pr_searchcontent.type2.f_value3 = '';
                controlObj.text('search_f_value3_tbl_ld_sbb_list', that._pr_searchcontent.type2.f_value3);


                that._pr_searchcontent.type2.f_value4 = '';
                controlObj.text('search_f_value4_tbl_ld_sbb_list', that._pr_searchcontent.type2.f_value4);


                that._pr_searchcontent.type2.f_value5 = '';
                controlObj.text('search_f_value5_tbl_ld_sbb_list', that._pr_searchcontent.type2.f_value5);


                that._pr_searchcontent.type2.f_value6 = '';
                controlObj.text('search_f_value6_tbl_ld_sbb_list', that._pr_searchcontent.type2.f_value6);


                that._pr_searchcontent.type2.f_value7 = '';
                controlObj.text('search_f_value7_tbl_ld_sbb_list', that._pr_searchcontent.type2.f_value7);


                that._pr_searchcontent.type2.f_value8 = '';
                controlObj.text('search_f_value8_tbl_ld_sbb_list', that._pr_searchcontent.type2.f_value8);


                that._pr_searchcontent.type2.f_value9 = '';
                controlObj.text('search_f_value9_tbl_ld_sbb_list', that._pr_searchcontent.type2.f_value9);


                that._pr_searchcontent.type2.f_value10 = '';
                controlObj.text('search_f_value10_tbl_ld_sbb_list', that._pr_searchcontent.type2.f_value10);


                that._pr_searchcontent.type2.f_khbh = '';
                controlObj.text('search_f_khbh_tbl_ld_sbb_list', that._pr_searchcontent.type2.f_khbh);


                that._pr_searchcontent.type2.f_sbbh = '';
                controlObj.text('search_f_sbbh_tbl_ld_sbb_list', that._pr_searchcontent.type2.f_sbbh);


                that._pr_searchcontent.type2.f_ztsbh = '';
                controlObj.text('search_f_ztsbh_tbl_ld_sbb_list', that._pr_searchcontent.type2.f_ztsbh);


                that._pr_searchcontent.type2.f_lxth = '';
                controlObj.text('search_f_lxth_tbl_ld_sbb_list', that._pr_searchcontent.type2.f_lxth);


                that._pr_searchcontent.type2.f_sbfzid = '';
                controlObj.multidropdownlistid('search_f_sbfz_tbl_ld_sbb_list', that._pr_searchcontent.type2.f_sbfzid);


                that._pr_searchcontent.type2.f_sbpp = '';
                controlObj.text('search_f_sbpp_tbl_ld_sbb_list', that._pr_searchcontent.type2.f_sbpp);


                that._pr_searchcontent.type2.f_mph = '';
                controlObj.text('search_f_mph_tbl_ld_sbb_list', that._pr_searchcontent.type2.f_mph);


                that._pr_searchcontent.type2.f_sbdz = '';
                controlObj.text('search_f_sbdz_tbl_ld_sbb_list', that._pr_searchcontent.type2.f_sbdz);


                that._pr_searchcontent.type2.f_rs = '';
                controlObj.text('search_f_rs_tbl_ld_sbb_list', that._pr_searchcontent.type2.f_rs);


                that._pr_searchcontent.type2.f_sbkjid = '';
                controlObj.multidropdownlistid('search_f_sbkj_tbl_ld_sbb_list', that._pr_searchcontent.type2.f_sbkjid);


                that._pr_searchcontent.type2.f_sblxid = '';
                controlObj.multidropdownlistid('search_f_sblx_tbl_ld_sbb_list', that._pr_searchcontent.type2.f_sblxid);


                that._pr_searchcontent.type2.f_jllxid = '';
                controlObj.multidropdownlistid('search_f_jllx_tbl_ld_sbb_list', that._pr_searchcontent.type2.f_jllxid);


                that._pr_searchcontent.type2.f_cszm = '';
                controlObj.text('search_f_cszm_tbl_ld_sbb_list', that._pr_searchcontent.type2.f_cszm);


                that._pr_searchcontent.type2.f_bqzm = '';
                controlObj.text('search_f_bqzm_tbl_ld_sbb_list', that._pr_searchcontent.type2.f_bqzm);


                that._pr_searchcontent.type2.f_sqzm = '';
                controlObj.text('search_f_sqzm_tbl_ld_sbb_list', that._pr_searchcontent.type2.f_sqzm);


                that._pr_searchcontent.type2.f_sqsl = '';
                controlObj.text('search_f_sqsl_tbl_ld_sbb_list', that._pr_searchcontent.type2.f_sqsl);

                that._pr_searchcontent.type2.f_bqsl = '';
                controlObj.text('search_f_bqsl_tbl_ld_sbb_list', that._pr_searchcontent.type2.f_bqsl);


                that._pr_searchcontent.type2.f_ljgl = '';
                controlObj.text('search_f_ljgl_tbl_ld_sbb_list', that._pr_searchcontent.type2.f_ljgl);

                that._pr_searchcontent.type2.f_nljgl = '';
                controlObj.text('search_f_nljgl_tbl_ld_sbb_list', that._pr_searchcontent.type2.f_nljgl);


                that._pr_searchcontent.type2.f_qsqpjsl = '';
                controlObj.text('search_f_qsqpjsl_tbl_ld_sbb_list', that._pr_searchcontent.type2.f_qsqpjsl);


                that._pr_searchcontent.type2.f_qlqpjsl = '';
                controlObj.text('search_f_qlqpjsl_tbl_ld_sbb_list', that._pr_searchcontent.type2.f_qlqpjsl);


                that._pr_searchcontent.type2.f_ztid = '';
                controlObj.multidropdownlistid('search_f_zt_tbl_ld_sbb_list', that._pr_searchcontent.type2.f_ztid);



                that._pr_searchcontent.type2.f_azrqfrom = ('1900-01-01 00:00:00');
                that._pr_searchcontent.type2.f_azrqto = ('1900-01-01 00:00:00');
                controlObj.datetime('search_f_azrq_tbl_ld_sbb_list_datefrom', 'search_f_azrq_tbl_ld_sbb_list_timefrom', that._pr_searchcontent.type2.f_azrqfrom);
                controlObj.datetime('search_f_azrq_tbl_ld_sbb_list_dateto', 'search_f_azrq_tbl_ld_sbb_list_timeto', that._pr_searchcontent.type2.f_azrqto);


                that._pr_searchcontent.type2.f_bz = '';
                controlObj.text('search_f_bz_tbl_ld_sbb_list', that._pr_searchcontent.type2.f_bz);

                that._pr_searchcontent.type2.f_qfztid = '';
                controlObj.multidropdownlistid('search_f_qfzt_tbl_ld_sbb_list', that._pr_searchcontent.type2.f_qfztid);



                break;
            case "2":
                if (that._pr_searchcontent.type1 == undefined)
                {
                    that._pr_searchcontent.type1 = '';
                }

                $("#txt_command_search_tbl_ld_sbb_list").val('');
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

                                    whereClause += " f_sbbh like '%" + vv[i] + "%' or ";

                                    whereClause += " f_ztsbh like '%" + vv[i] + "%' or ";

                                    whereClause += " f_lxth like '%" + vv[i] + "%' or ";

                                    whereClause += " f_sbfz like '%" + vv[i] + "%' or ";

                                    whereClause += " f_sbpp like '%" + vv[i] + "%' or ";

                                    whereClause += " f_mph like '%" + vv[i] + "%' or ";

                                    whereClause += " f_sbdz like '%" + vv[i] + "%' or ";

                                    whereClause += " f_rs like '%" + vv[i] + "%' or ";

                                    whereClause += " f_sbkj like '%" + vv[i] + "%' or ";

                                    whereClause += " f_sblx like '%" + vv[i] + "%' or ";

                                    whereClause += " f_jllx like '%" + vv[i] + "%' or ";

                                    whereClause += " f_cszm like '%" + vv[i] + "%' or ";

                                    whereClause += " f_bqzm like '%" + vv[i] + "%' or ";

                                    whereClause += " f_sqzm like '%" + vv[i] + "%' or ";

                                    whereClause += " f_sqsl like '%" + vv[i] + "%' or ";

                                    whereClause += " f_ljgl like '%" + vv[i] + "%' or ";

                                    whereClause += " f_nljgl like '%" + vv[i] + "%' or ";

                                    whereClause += " f_qsqpjsl like '%" + vv[i] + "%' or ";

                                    whereClause += " f_qlqpjsl like '%" + vv[i] + "%' or ";

                                    whereClause += " f_zt like '%" + vv[i] + "%' or ";

                                    whereClause += " f_bz like '%" + vv[i] + "%' or ";

                                    whereClause += " to_char(f_azrq,'yyyy-MM-dd hh24:mi:ss') like '%" + vv[i] + "%' or ";

                                    whereClause += " f_qfzt like '%" + vv[i] + "%' or ";

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

                        var tbl_ld_sbb_list = that._pr_searchcontent.type2;



                        if (tbl_ld_sbb_list.f_khbh.length > 0)
                        {
                            whereClause += " f_khbh like '%" + tbl_ld_sbb_list.f_khbh + "%' and ";
                        }


                        if (tbl_ld_sbb_list.f_sbbh.length > 0)
                        {
                            whereClause += " f_sbbh like '%" + tbl_ld_sbb_list.f_sbbh + "%' and ";
                        }


                        if (tbl_ld_sbb_list.f_ztsbh.length > 0)
                        {
                            whereClause += " f_ztsbh like '%" + tbl_ld_sbb_list.f_ztsbh + "%' and ";
                        }


                        if (tbl_ld_sbb_list.f_lxth.length > 0)
                        {
                            whereClause += " f_lxth like '%" + tbl_ld_sbb_list.f_lxth + "%' and ";
                        }


                        if (tbl_ld_sbb_list.f_sbfzid.length > 0)
                        {
                            var elementArray = tbl_ld_sbb_list.f_sbfzid.split(',');
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
                                whereClause += "((','||f_sbfzid||',') like ('%,'||'" + elementArray[i] + "'||',%')) ";

                            });
                            whereClause += ') and ';
                        }


                        if (tbl_ld_sbb_list.f_sbpp.length > 0)
                        {
                            whereClause += " f_sbpp like '%" + tbl_ld_sbb_list.f_sbpp + "%' and ";
                        }


                        if (tbl_ld_sbb_list.f_mph.length > 0)
                        {
                            whereClause += " f_mph like '%" + tbl_ld_sbb_list.f_mph + "%' and ";
                        }


                        if (tbl_ld_sbb_list.f_sbdz.length > 0)
                        {
                            whereClause += " f_sbdz like '%" + tbl_ld_sbb_list.f_sbdz + "%' and ";
                        }


                        if (tbl_ld_sbb_list.f_rs.length > 0)
                        {
                            whereClause += " f_rs like '%" + tbl_ld_sbb_list.f_rs + "%' and ";
                        }


                        if (tbl_ld_sbb_list.f_sbkjid.length > 0)
                        {
                            var elementArray = tbl_ld_sbb_list.f_sbkjid.split(',');
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
                                whereClause += "((','||f_sbkjid||',') like ('%,'||'" + elementArray[i] + "'||',%')) ";

                            });
                            whereClause += ') and ';
                        }


                        if (tbl_ld_sbb_list.f_sblxid.length > 0)
                        {
                            var elementArray = tbl_ld_sbb_list.f_sblxid.split(',');
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
                                whereClause += "((','||f_sblxid||',') like ('%,'||'" + elementArray[i] + "'||',%')) ";

                            });
                            whereClause += ') and ';
                        }


                        if (tbl_ld_sbb_list.f_jllxid.length > 0)
                        {
                            var elementArray = tbl_ld_sbb_list.f_jllxid.split(',');
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
                                whereClause += "((','||f_jllxid||',') like ('%,'||'" + elementArray[i] + "'||',%')) ";

                            });
                            whereClause += ') and ';
                        }


                        if (tbl_ld_sbb_list.f_cszm.length > 0)
                        {
                            whereClause += " f_cszm like '%" + tbl_ld_sbb_list.f_cszm + "%' and ";
                        }


                        if (tbl_ld_sbb_list.f_bqzm.length > 0)
                        {
                            whereClause += " f_bqzm like '%" + tbl_ld_sbb_list.f_bqzm + "%' and ";
                        }


                        if (tbl_ld_sbb_list.f_sqzm.length > 0)
                        {
                            whereClause += " f_sqzm like '%" + tbl_ld_sbb_list.f_sqzm + "%' and ";
                        }


                        if (tbl_ld_sbb_list.f_sqsl.length > 0)
                        {
                            whereClause += " f_sqsl like '%" + tbl_ld_sbb_list.f_sqsl + "%' and ";
                        }


                        if (tbl_ld_sbb_list.f_ljgl.length > 0)
                        {
                            whereClause += " f_ljgl like '%" + tbl_ld_sbb_list.f_ljgl + "%' and ";
                        }

                        if (tbl_ld_sbb_list.f_nljgl.length > 0)
                        {
                            whereClause += " f_nljgl like '%" + tbl_ld_sbb_list.f_nljgl + "%' and ";
                        }

                        if (tbl_ld_sbb_list.f_qsqpjsl.length > 0)
                        {
                            whereClause += " f_qsqpjsl like '%" + tbl_ld_sbb_list.f_qsqpjsl + "%' and ";
                        }


                        if (tbl_ld_sbb_list.f_qlqpjsl.length > 0)
                        {
                            whereClause += " f_qlqpjsl like '%" + tbl_ld_sbb_list.f_qlqpjsl + "%' and ";
                        }


                        if (tbl_ld_sbb_list.f_azrqfrom != '1900-01-01 00:00:00')
                        {
                            whereClause += " f_azrq >= to_date('" + tbl_ld_sbb_list.f_azrqfrom + "','yyyy-MM-dd hh24:mi:ss') and ";
                        }

                        if (tbl_ld_sbb_list.f_azrqto != '1900-01-01 00:00:00')
                        {
                            whereClause += " f_azrq <= to_date('" + tbl_ld_sbb_list.f_azrqto + "','yyyy-MM-dd hh24:mi:ss') and ";
                        }

                        if (tbl_ld_sbb_list.f_qfztid.length > 0)
                        {
                            var elementArray = tbl_ld_sbb_list.f_qfztid.split(',');
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
                                whereClause += "((','||f_qfzt||',') like ('%,'||'" + elementArray[i] + "'||',%')) ";

                            });
                            whereClause += ') and ';
                        }

                        if (tbl_ld_sbb_list.f_ztid.length > 0)
                        {
                            var elementArray = tbl_ld_sbb_list.f_ztid.split(',');
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


                        if (tbl_ld_sbb_list.f_bz.length > 0)
                        {
                            whereClause += " f_bz like '%" + tbl_ld_sbb_list.f_bz + "%' and ";
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
            $('#btn_command_clearselect_tbl_ld_sbb_list').addClass('hidden');
        }
        else
        {
            $('#btn_command_clearselect_tbl_ld_sbb_list').removeClass('hidden');

            var allcount = that._pr_gridselectids.split('^').length;
            var currentcount = $('#table_grid_tbl_ld_sbb_list').bootstrapTable('getSelections').length;
            $('#btn_command_clearselect_tbl_ld_sbb_list .cc-badge-p').html(currentcount + '/' + allcount);

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
                    field: 'sys_id', title: 'sys_id', "class": 'gridcell-ordercolumn hidden',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                    sortable: false,
            }
                
            ];

            var columnHashMap = new hashMap();
          
            columnHashMap.put('f_sbbh', {
                field: 'f_sbbh',
                title: '水表编号',
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;



                    return resultStr;
                }

            });
            columnHashMap.put('f_ztsbh', {
                field: 'f_ztsbh',
                title: '旧水表号',
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
            columnHashMap.put('f_lxth', {
                field: 'f_lxth',
                title: '老系统号',
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;



                    return resultStr;
                }
            });
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
         
         
            columnHashMap.put('f_sbfz', {
                field: 'f_sbfz',
                title: '水表分组',
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
            columnHashMap.put('f_sbfzid', {
                field: 'f_sbfzid',
                title: '水表分组id',
                "class": 'hidden',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;

                    return resultStr;
                }
            });
            columnHashMap.put('f_sbpp', {
                field: 'f_sbpp',
                title: '水表品牌',
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

            columnHashMap.put('f_mph', {
                field: 'f_mph',
                title: '铭牌号',
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
            columnHashMap.put('f_sbdz', {
                field: 'f_sbdz',
                title: '水表地址',
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
            columnHashMap.put('f_rs', {
                field: 'f_rs',
                title: '人数',
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
            columnHashMap.put('f_qsqpjsl', {
                field: 'f_qsqpjsl',
                title: '前三期平均水量',
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
            columnHashMap.put('f_qlqpjsl', {
                field: 'f_qlqpjsl',
                title: '前六期平均水量',
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

            columnHashMap.put('f_sbkj', {
                field: 'f_sbkj',
                title: '水表口径',
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
            columnHashMap.put('f_sbkjid', {
                field: 'f_sbkjid',
                title: '水表口径id',
                "class": 'hidden',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;

                    return resultStr;
                }
            });
            columnHashMap.put('f_sblx', {
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
            });
            columnHashMap.put('f_sblxid', {
                field: 'f_sblxid',
                title: '水表类型id',
                "class": 'hidden',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;

                    return resultStr;
                }
            });
            columnHashMap.put('f_jllx', {
                field: 'f_jllx',
                title: '计量类型',
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
            columnHashMap.put('f_cszm', {
                field: 'f_cszm',
                title: '初始止码',
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
            columnHashMap.put('f_bqzm', {
                field: 'f_bqzm',
                title: '本期止码',
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
            columnHashMap.put('f_sqzm', {
                field: 'f_sqzm',
                title: '上期止码',
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
            columnHashMap.put('f_sqsl', {
                field: 'f_sqsl',
                title: '上期水量',
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
            columnHashMap.put('f_bqsl', {
                field: 'f_bqsl',
                title: '当月水量',
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

            columnHashMap.put('f_azrq', {
                field: 'f_azrq',
                title: '安装日期',
                "class": '',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    if (value == "")
                    {
                        value = "1900-01-01 00:00:00";
                    }
                    var resultStr = value.toDateTime().Format("yyyy-MM-dd");
                    if (resultStr == '1900-01-01')
                    {
                        resultStr = "&nbsp;&nbsp;";
                    }



                    return resultStr;

                }
            });
            columnHashMap.put('f_jllxid', {
                field: 'f_jllxid',
                title: '计量类型id',
                "class": 'hidden',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;

                    return resultStr;
                }
            });
        
            columnHashMap.put('f_ljgl', {

                field: 'f_ljgl',
                title: '累计购量',
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
                title: '年用水量',
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
         
            columnHashMap.put('f_qfzt', {
                field: 'f_qfzt',
                title: '铅封状态',
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
            columnHashMap.put('f_zt', {
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
            });
            columnHashMap.put('f_ztid', {
                field: 'f_ztid',
                title: '状态id',
                "class": 'hidden',
                align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                formatter: function (value, row, index)
                {
                    var resultStr = value;

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
            
        
            var column = getCookie("tbl_ld_sbb_list_column");

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
             
                var columnObj = columnHashMap.get('f_sbbh');
                columnObj["class"] = '';
                columnsarray.push(columnObj);

             

                var columnObj = columnHashMap.get('f_lxth');
                columnObj["class"] = '';
                columnsarray.push(columnObj);

                var columnObj = columnHashMap.get('f_sbfz');
                columnObj["class"] = '';
                columnsarray.push(columnObj);

            

                var columnObj = columnHashMap.get('f_sbpp');
                columnObj["class"] = '';
                columnsarray.push(columnObj);

                var columnObj = columnHashMap.get('f_mph');
                columnObj["class"] = '';
                columnsarray.push(columnObj);

                var columnObj = columnHashMap.get('f_rs');
                columnObj["class"] = '';
                columnsarray.push(columnObj);

                var columnObj = columnHashMap.get('f_sbkj');
                columnObj["class"] = '';
                columnsarray.push(columnObj);

         
                var columnObj = columnHashMap.get('f_sblx');
                columnObj["class"] = '';
                columnsarray.push(columnObj);

                var columnObj = columnHashMap.get('f_jllx');
                columnObj["class"] = '';
                columnsarray.push(columnObj);

                var columnObj = columnHashMap.get('f_azrq');
                columnObj["class"] = '';
                columnsarray.push(columnObj);

         

                var columnObj = columnHashMap.get('f_qfzt');
                columnObj["class"] = '';
                columnsarray.push(columnObj);

                var columnObj = columnHashMap.get('f_zt');
                columnObj["class"] = '';
                columnsarray.push(columnObj);

                var columnObj = columnHashMap.get('f_bz');
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


            $('#table_grid_tbl_ld_sbb_list').bootstrapTable({
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
                    var rows = $('#table_grid_tbl_ld_sbb_list').bootstrapTable('getSelections');
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
                    var rows = $('#table_grid_tbl_ld_sbb_list').bootstrapTable('getData');
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
            controlObj.singledropdownlistinit('detial_f_fsblx_tbl_ld_sbb_list', codeservice_sblx);
            //模态窗口
            $('#div_modal_tbl_ld_sbb_list').modal({
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

        /* 
        *  
        *  方法:addDetailData
        *  参数: callbackFunction
        *  新建数据
        */
    addDetailData = function (sbbh, sblxid, sblx, callBackFunction)
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


            f_sbbh: sbbh,


            f_ztsbh: '',


            f_lxth: '',

            f_sbfzid: '',


            f_sbpp: '',


            f_mph: '',


            f_sbdz: '',


            f_khbh: '',


            f_rs: '0',

            f_sbkjid: '',

            f_sblxid: sblxid,
            f_sblx: sblx,

            f_jllxid: '',


            f_cszm: '0',


            f_bqzm: '0',


            f_sqzm: '0',


            f_sqsl: '0',

            f_bqsl: '0',

            f_ljgl: '0',
            f_nljgl: '0',

            f_qsqpjsl: '0',


            f_qlqpjsl: '0',

            f_ztid: '0',

            f_qfzt: 'false',

            f_fj: controlObj.fileuploadernewfileid(),

            f_bz: '',

            f_azrq: d.Format("yyyy-MM-dd"),

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

    //列显示弹出页
    initDetailControlShowColumn = function (callBackFunction)
    {
        try
        {
            
            var codeservice_0814 = _baseCodeHashMap.get('codeservice_0814');


            controlObj.multidropdownlistinit('model_dropdown_f_checklist_tbl_ld_sbb_showcolumnlist', codeservice_0814, null);

            //模态窗口
            $('#div_modal_tbl_ld_sbb_sortlist').modal({
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
        //状态IDs，如果状态为空，则显示全部数据，否则显示指定状态的数据
        _pr_ztids: '',
        //当前被选中的行的ID集合的字符串//1^2^6
        _pr_gridselectids: '',
        //当前在第几页
        _pr_gridpageindex: 1,
        //当前的查询模式：1：简单查询；2：高级查询
        _pr_searchtype: '1',
        //查询内容type1:简单查询内容；type2：高级查询内容（JSON）
        _pr_searchcontent: null,


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

                                                        _validateMessage = new validateMessage('btn_search_modal_search_tbl_ld_sbb_list');

                                                        _ladda_btn_command_new = Ladda.create('btn_command_new_tbl_ld_sbb_list');
                                                        _ladda_btn_command_delete = Ladda.create('btn_command_delete_tbl_ld_sbb_list');
                                                        _ladda_btn_command_exp = Ladda.create('btn_command_report_tbl_ld_sbb_list');
                                                        _ladda_btn_command_showcolunm = Ladda.create('btn_command_showcolunm_tbl_ld_sbb_list');
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
                                //根据不同水表菜单传递的ztids初始化查询detail的状态控件是不显示
                                switch (that._pr_ztids)
                                {
                                    case "0":
                                        $('#div_search_f_zt_tbl_ld_sbb_list').addClass("hidden");
                                        break;
                                    case "9":
                                        $('#div_search_f_zt_tbl_ld_sbb_list').addClass("hidden");
                                        break;
                                }

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

                                                        initDetailControl({
                                                            success: function (result)
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
                $('#table_grid_tbl_ld_sbb_list').bootstrapTable("showLoading");
                var whereClause = _whereClauseString;
                if (that._pr_ztids != '')
                {
                    if (whereClause != "")
                    {
                        whereClause += " and ";
                    }
                    whereClause += " f_ztid in ('" + that._pr_ztids.replaceAll(',', '\',\'') + "')";
                }
                var orderByString = ' sys_id desc';
                var columnsString = 'f_value1^f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^f_khbh^f_sbbh^f_ztsbh^f_lxth^f_sbfz^f_sbfzid^f_sbpp^f_mph^f_sbdz^f_rs^f_sbkj^f_sbkjid^f_sblx^f_sblxid^f_jllx^f_jllxid^f_cszm^f_bqzm^f_sqzm^f_sqsl^f_bqsl^f_ljgl^f_nljgl^f_qsqpjsl^f_qlqpjsl^f_zt^f_ztid^f_bz^f_azrq^f_qfzt^sys_id';

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

                        $('#table_grid_tbl_ld_sbb_list').bootstrapTable("hideLoading");

                        $('#table_grid_tbl_ld_sbb_list').bootstrapTable("loadJson", messageJson);

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
            $('#div_modal_tbl_ld_sbb_list').modal('show');

        },
        /* 
        *  
        *  方法:div_modal_tbl_ld_sbb_list
        *  参数:
        *  新建时弹出modal 进行水表类型选择  
        */
        btn_modal_ok_onclick: function ()
        {
            var sblxid = controlObj.singledropdownlistid('detial_f_fsblx_tbl_ld_sbb_list');
            var sblx = controlObj.singledropdownlist('detial_f_fsblx_tbl_ld_sbb_list');

            if (sblxid == '')
            {
                _alertMessage.show('水表类型不能为空', 'fail');
            }
            else
            {
                try
                {
                    var data = {
                        typeid: 'sb',
                        nodeid: sblxid
                    }
                    doAjaxFunction(_servicecommonUrl, 'getBusinessNum', data, {
                        success: function (message)
                        {

                            controlObj.singledropdownlistid('detail_f_sblx_tbl_ld_sbb_detail', '');
                            addDetailData(message, sblxid, sblx, {
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
                            _blockMessage.show('获取水表号失败' + message, 'fail');
                        }
                    });
                }
                catch (ex)
                {
                    _blockMessage.show('setModel执行失败<br/>' + ex.message, 'fail');
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

            $('#div_modal_tbl_ld_sbb_list').modal('hide');
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
                var currentcount = $('#table_grid_tbl_ld_sbb_list').bootstrapTable('getSelections').length;
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
            $('#table_grid_tbl_ld_sbb_list').bootstrapTable('uncheckAll');
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
            $('#btn_command_search_tbl_ld_sbb_list').html('简单查询');
            $('#txt_command_search_tbl_ld_sbb_list').removeAttr('disabled');
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
            $('#btn_command_search_tbl_ld_sbb_list').html('高级查询');
            $('#txt_command_search_tbl_ld_sbb_list').attr('disabled', 'disabled');

            $('#div_search_modal_tbl_ld_sbb_list').modal('show');
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
                                    $('#div_search_modal_tbl_ld_sbb_list').modal('hide')
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
            $('#div_search_modal_tbl_ld_sbb_list').modal('hide');

            that._pr_searchtype = '1';
            $('#btn_command_search_tbl_ld_sbb_list').html('简单查询');
            $('#txt_command_search_tbl_ld_sbb_list').removeAttr('disabled');
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
            $('#btn_command_search_tbl_ld_sbb_list').html('高级查询');
            $('#txt_command_search_tbl_ld_sbb_list').attr('disabled', 'disabled');

            $('#div_search_modal_tbl_ld_sbb_list').modal('show');
        },
        //导出
        btn_command_report_onclick: function ()
        {

            _ladda_btn_command_exp.start();
            //{
            //    var where = " 1=1";
            //}
            //else
            //{
            //    var where = _whereClauseString;
            //}      
            var column = getCookie('tbl_ld_sbb_list_column');

            var columnname = getCookie('tbl_ld_sbb_list_columnname');
            if (_whereClauseString == "")
            {
                var where = " 1=1";
            }
            else
            {
                var where = _whereClauseString;
            }



            //var orderByString = ' sys_id desc';
            //var columnsString = 'f_sbbh,f_lxth,f_sbfz,f_sbpp,f_mph,f_rs,f_sbkj,f_sblx,f_jllx,f_zt,f_bz'
            //var colunmsName = '水表编号,老系统号,水表分组,水表品牌,铭牌号,人数,水表口径,水表类型,计量类型,状态,备注';
            if (column != null && columnname != null && column != "" && columnname != "")
            {
                var columnsString = column;
                var colunmsName = columnname;
            }
            else
            {
                var columnsString = 'f_sbbh,f_lxth,f_sbfz,f_sbpp,f_mph,f_rs,f_sbkj,f_sblx,f_jllx,f_azrq,f_qfzt,f_zt,f_bz';
                var colunmsName = '水表编号,老系统号,水表分组,水表品牌,铭牌号,人数,水表口径,水表类型,计量类型,安装日期,铅封状态,状态,备注';
            }
            var orderByString = ' sys_id desc';
                var data = {
                    whereString: where,
                    orderByString: orderByString,
                    column: columnsString,
                    columnname: colunmsName,
                    clientInf: _clientInf
                };
                doAjaxFunction(_serviceUrl, 'Export', data, {
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
            var column = getCookie('tbl_ld_sbb_list_column');
            if (column != null && column != 'undefined' && column != "")
            {

                controlObj.multidropdownlistid('model_dropdown_f_checklist_tbl_ld_sbb_showcolumnlist', column);

            }
            $('#div_modal_tbl_ld_sbb_showcolumnlist').modal('show');

        },
        //列显示取消按钮
        btn_showcolumn_modal_cancle_onclick: function ()
        {

            $('#div_modal_tbl_ld_sbb_showcolumnlist').modal('hide');
            _ladda_btn_command_showcolunm.stop();

        },
        //列显示确定按钮
        btn_showcolumn_modal_save_onclick: function ()
        {




            //var column = controlObj.checklistid('model_dropdown_f_checklist_tbl_ld_kh_query_showcolumnlist');
            //var columnname = controlObj.checklist('model_dropdown_f_checklist_tbl_ld_kh_query_showcolumnlist');

            var column = controlObj.multidropdownlistid('model_dropdown_f_checklist_tbl_ld_sbb_showcolumnlist');
            var columnname = controlObj.multidropdownlist('model_dropdown_f_checklist_tbl_ld_sbb_showcolumnlist');


            setCookieMinutes("tbl_ld_sbb_list_column", column, 5256000);
            setCookieMinutes("tbl_ld_sbb_list_columnname", columnname, 5256000);

            $("#table_grid_tbl_ld_sbb_list").bootstrapTable('destroy');

            initGrid({
                success: function ()
                {
                    that.bindGrid({
                        success: function ()
                        {

                            $('#div_modal_tbl_ld_sbb_showcolumnlist').modal('hide');
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
    tbl_ld_sbb_list_Obj.init();
});



