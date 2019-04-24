


var _clientInf = '{userid="",appcode="54",appname="",userip="",usermac="",username=""}';
var _blockMessage = null;
var _alertMessage = null;
var _resultMessage = null;
var _confirmMessage = null;

var tbl_ld_ichbbk_list_Obj = (function ()
{
    'use strict';

    //=================================================================================
    //                                      私有
    //=================================================================================
    //=================================================================================
    //                                      私有属性 
    //=================================================================================

    var _serviceUrl = '//127.0.0.1/sara.dd.ldsw/service/service_tbl_ld_ichbbk.asmx/',
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
    //查询sql语句
    _whereClauseString = '',
    //可见性标志
    _isadmin= '',
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
            that._pr_appcode = requestQuery('appcode');
            that._pr_gridselectids = requestQuery('gridselectids');
            that._pr_gridpageindex = requestQuery('gridpageIndex');
            that._pr_searchtype = requestQuery('searchtype');
            that._pr_searchcontent = requestQuery('searchcontent');
            _isadmin = requestQuery('isadmin');
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
                    $('#btn_command_search_tbl_ld_ichbbk_list').html('简单查询');
                    $('#txt_command_search_tbl_ld_ichbbk_list').removeAttr("disabled");

                    break;
                case "2":
                    $('#btn_command_search_tbl_ld_ichbbk_list').html('高级查询');
                    $('#txt_command_search_tbl_ld_ichbbk_list').attr("disabled", true);
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
                $('#btn_command_delete_tbl_ld_ichbbk_list').addClass('hidden');
                $('#btn_command_new_tbl_ld_ichbbk_list').addClass('hidden');
            }
            else
            {
                $('#btn_command_delete_tbl_ld_ichbbk_list').removeClass('hidden');
                $('#btn_command_new_tbl_ld_ichbbk_list').removeClass('hidden');
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
        var url = '../tbl_ld_ichbbk/tbl_ld_ichbbk_detail.html';
        url += '?uid=' + basePageObj._userInfoJson.sys_userid;
        url += '&sys_id=' + id;
        url += '&pagetype=' + pagetype;
        url += '&appcode=' + that._pr_appcode;
        url += '&fromurl=../tbl_ld_ichbbk/tbl_ld_ichbbk_list.html';
        url += '&fromurlparam={';
        url += '"appcode":"' + that._pr_appcode + '",';
        url += '"listtype":"' + that._pr_listtype + '",';
        url += '"isadmin":"' + _isadmin + '",';
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





        codeServiceId += "0766^";


        codeServiceId += "0497^";
        codeServiceId += "0523^";
        codeServiceId += "0524^";
        codeServiceId += "0525^";

        codeServiceId += "0564^";

        codeServiceId += "0810^";


















        codeServiceId = codeServiceId.trimEnd('^');
        commonObj.getCodeServiceJson(codeServiceId, {
            success: function (resultArray)
            {
                try
                {
                    _baseCodeHashMap = new hashMap();
                    _baseCodeHashMap.put('codeservice_0766', resultArray['0766']);

                    _baseCodeHashMap.put('codeservice_0497', resultArray['0497']);
                    _baseCodeHashMap.put('codeservice_0523', resultArray['0523']);
                    _baseCodeHashMap.put('codeservice_0524', resultArray['0524']);
                    _baseCodeHashMap.put('codeservice_0525', resultArray['0525']);
                    _baseCodeHashMap.put('codeservice_0564', resultArray['0564']);
                    _baseCodeHashMap.put('codeservice_0810', resultArray['0810']);
                    
                    var sqlJson = {
                        "tbl_ldbm_sbfz": "select sys_id as id, f_fzmc as text,decode(f_ztid,'0','false','true') as disabled from tbl_ldbm_sbfz where sys_delflag='0'  order by sys_id",
                        "tbl_ld_cben": 'select sys_id as id,f_cbbh as text,f_cbymc,f_cbyid,f_cbzq,f_cbmc from tbl_ld_cben order by f_cbbh asc',

                        'tbl_ldbm_khfz': "select sys_id as id,f_fzmc as text,decode(f_ztid,'0','false','true') as disabled from tbl_ldbm_khfz where sys_delflag='0'  order by sys_id"

                    }




                    commonObj.querySqls(sqlJson, {
                        success: function (resultJson)
                        {

                            $.each(resultJson["tbl_ldbm_sbfz"], function (i, u)
                            {
                                if (resultJson["tbl_ldbm_sbfz"][i]["disabled"] == "true")
                                {
                                    resultJson["tbl_ldbm_sbfz"][i]["disabled"] = true;
                                }
                                else
                                {
                                    resultJson["tbl_ldbm_sbfz"][i]["disabled"] = false;
                                }
                            });

                            $.each(resultJson["tbl_ldbm_khfz"], function (i, u)
                            {
                                if (resultJson["tbl_ldbm_khfz"][i]["disabled"] == "true")
                                {
                                    resultJson["tbl_ldbm_khfz"][i]["disabled"] = true;
                                }
                                else
                                {
                                    resultJson["tbl_ldbm_khfz"][i]["disabled"] = false;
                                }
                            });
                            _baseCodeHashMap.put('codeservice_0766', resultJson["tbl_ldbm_sbfz"]);
                            _baseCodeHashMap.put('codeservice_cben', resultJson["tbl_ld_cben"]);
                            _baseCodeHashMap.put('codeservice_khfz', resultJson["tbl_ldbm_khfz"]);
                            callBackFunction.success();
                        },
                        fail: function (message)
                        {
                            _blockMessage.show('获取水表分组失败<br/>' + ex.message, 'fail');
                        }
                    });
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

            var codeService_0766 = _baseCodeHashMap.get('codeservice_0766');




            var codeService_0497 = _baseCodeHashMap.get('codeservice_0497');
            var codeService_0523 = _baseCodeHashMap.get('codeservice_0523');
            var codeService_0524 = _baseCodeHashMap.get('codeservice_0524');
            var codeService_0525 = _baseCodeHashMap.get('codeservice_0525');
            var codeService_0564 = _baseCodeHashMap.get('codeservice_0564');
            var codeService_khfz = _baseCodeHashMap.get('codeservice_khfz');
            var codeService_cben = _baseCodeHashMap.get('codeservice_cben');

            var codeService_0810 = _baseCodeHashMap.get('codeservice_0810');


            controlObj.multidropdownlistinit('search_f_n_sbfz_tbl_ld_ichbbk_list', codeService_0766);


            controlObj.multidropdownlistinit('search_f_n_sbkj_tbl_ld_ichbbk_list', codeService_0523);

            controlObj.multidropdownlistinit('search_f_n_sblx_tbl_ld_ichbbk_list', codeService_0524);

            controlObj.multidropdownlistinit('search_f_n_jllx_tbl_ld_ichbbk_list', codeService_0525);




            controlObj.multidropdownlistinit('search_f_zt_tbl_ld_ichbbk_list', codeService_0564);

            controlObj.multidropdownlistinit('search_f_khfz_tbl_ld_ichbbk_list', codeService_khfz);

            controlObj.multidropdownlistinit('search_f_cbbh_tbl_ld_ichbbk_list', codeService_cben);
            controlObj.multidropdownlistinit('search_f_hbyy_tbl_ld_ichbbk_list', codeService_0810);



            //模态窗口
            $('#div_search_modal_tbl_ld_ichbbk_list').modal({
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
                        $("#txt_command_search_tbl_ld_ichbbk_list").val(that._pr_searchcontent.type1);
                    }

                    break;
                case "2":
                    if (that._pr_searchcontent.type2 != undefined)
                    {
                        //高级查询
                        var tbl_ld_ichbbk_list = that._pr_searchcontent.type2;


                        controlObj.text('search_f_value1_tbl_ld_ichbbk_list', tbl_ld_ichbbk_list.f_value1);

                        controlObj.text('search_f_value2_tbl_ld_ichbbk_list', tbl_ld_ichbbk_list.f_value2);

                        controlObj.text('search_f_value3_tbl_ld_ichbbk_list', tbl_ld_ichbbk_list.f_value3);

                        controlObj.text('search_f_value4_tbl_ld_ichbbk_list', tbl_ld_ichbbk_list.f_value4);

                        controlObj.text('search_f_value5_tbl_ld_ichbbk_list', tbl_ld_ichbbk_list.f_value5);

                        controlObj.text('search_f_value6_tbl_ld_ichbbk_list', tbl_ld_ichbbk_list.f_value6);

                        controlObj.text('search_f_value7_tbl_ld_ichbbk_list', tbl_ld_ichbbk_list.f_value7);

                        controlObj.text('search_f_value8_tbl_ld_ichbbk_list', tbl_ld_ichbbk_list.f_value8);

                        controlObj.text('search_f_value9_tbl_ld_ichbbk_list', tbl_ld_ichbbk_list.f_value9);

                        controlObj.text('search_f_value10_tbl_ld_ichbbk_list', tbl_ld_ichbbk_list.f_value10);

                        controlObj.text('search_f_hbbh_tbl_ld_ichbbk_list', tbl_ld_ichbbk_list.f_hbbh);

                        controlObj.text('search_f_sjbh_tbl_ld_ichbbk_list', tbl_ld_ichbbk_list.f_sjbh);

                        controlObj.text('search_f_khbh_tbl_ld_ichbbk_list', tbl_ld_ichbbk_list.f_khbh);

                        controlObj.text('search_f_yhm_tbl_ld_ichbbk_list', tbl_ld_ichbbk_list.f_yhm);

                        controlObj.text('search_f_jfm_tbl_ld_ichbbk_list', tbl_ld_ichbbk_list.f_jfm);

                        controlObj.text('search_f_lxth_tbl_ld_ichbbk_list', tbl_ld_ichbbk_list.f_lxth);

                        controlObj.text('search_f_dh_tbl_ld_ichbbk_list', tbl_ld_ichbbk_list.f_dh);

                        controlObj.text('search_f_dz_tbl_ld_ichbbk_list', tbl_ld_ichbbk_list.f_dz);

                        controlObj.text('search_f_o_sbbh_tbl_ld_ichbbk_list', tbl_ld_ichbbk_list.f_o_sbbh);

                        controlObj.text('search_f_o_jsbh_tbl_ld_ichbbk_list', tbl_ld_ichbbk_list.f_o_jsbh);

                        controlObj.text('search_f_o_lxth_tbl_ld_ichbbk_list', tbl_ld_ichbbk_list.f_o_lxth);

                        controlObj.text('search_f_o_sbfz_tbl_ld_ichbbk_list', tbl_ld_ichbbk_list.f_o_sbfz);

                        controlObj.text('search_f_o_sbfzid_tbl_ld_ichbbk_list', tbl_ld_ichbbk_list.f_o_sbfzid);

                        controlObj.text('search_f_o_sbpp_tbl_ld_ichbbk_list', tbl_ld_ichbbk_list.f_o_sbpp);

                        controlObj.text('search_f_o_mph_tbl_ld_ichbbk_list', tbl_ld_ichbbk_list.f_o_mph);

                        controlObj.text('search_f_o_sbdz_tbl_ld_ichbbk_list', tbl_ld_ichbbk_list.f_o_sbdz);

                        controlObj.text('search_f_o_khbh_tbl_ld_ichbbk_list', tbl_ld_ichbbk_list.f_o_khbh);

                        controlObj.text('search_f_o_rs_tbl_ld_ichbbk_list', tbl_ld_ichbbk_list.f_o_rs);

                        controlObj.text('search_f_o_sbkj_tbl_ld_ichbbk_list', tbl_ld_ichbbk_list.f_o_sbkj);

                        controlObj.text('search_f_o_sbkjid_tbl_ld_ichbbk_list', tbl_ld_ichbbk_list.f_o_sbkjid);

                        controlObj.text('search_f_o_sblx_tbl_ld_ichbbk_list', tbl_ld_ichbbk_list.f_o_sblx);

                        controlObj.text('search_f_o_sblxid_tbl_ld_ichbbk_list', tbl_ld_ichbbk_list.f_o_sblxid);

                        controlObj.text('search_f_o_jllx_tbl_ld_ichbbk_list', tbl_ld_ichbbk_list.f_o_jllx);

                        controlObj.text('search_f_o_jllxid_tbl_ld_ichbbk_list', tbl_ld_ichbbk_list.f_o_jllxid);

                        controlObj.text('search_f_o_cszm_tbl_ld_ichbbk_list', tbl_ld_ichbbk_list.f_o_cszm);

                        controlObj.text('search_f_o_bqzm_tbl_ld_ichbbk_list', tbl_ld_ichbbk_list.f_o_bqzm);

                        controlObj.text('search_f_o_sqzm_tbl_ld_ichbbk_list', tbl_ld_ichbbk_list.f_o_sqzm);

                        controlObj.text('search_f_o_sqsl_tbl_ld_ichbbk_list', tbl_ld_ichbbk_list.f_o_sqsl);

                        controlObj.text('search_f_o_ljgl_tbl_ld_ichbbk_list', tbl_ld_ichbbk_list.f_o_ljgl);

                        controlObj.text('search_f_o_qsqpjsl_tbl_ld_ichbbk_list', tbl_ld_ichbbk_list.f_o_qsqpjsl);

                        controlObj.text('search_f_o_qlqpjsl_tbl_ld_ichbbk_list', tbl_ld_ichbbk_list.f_o_qlqpjsl);

                        controlObj.text('search_f_o_bqsl_tbl_ld_ichbbk_list', tbl_ld_ichbbk_list.f_o_bqsl);

                        controlObj.text('search_f_n_sbbh_tbl_ld_ichbbk_list', tbl_ld_ichbbk_list.f_n_sbbh);

                        controlObj.multidropdownlistid('search_f_n_sbfz_tbl_ld_ichbbk_list', tbl_ld_ichbbk_list.f_n_sbfzid);

                        controlObj.text('search_f_n_sbpp_tbl_ld_ichbbk_list', tbl_ld_ichbbk_list.f_n_sbpp);

                        controlObj.text('search_f_n_mph_tbl_ld_ichbbk_list', tbl_ld_ichbbk_list.f_n_mph);

                        controlObj.text('search_f_n_rs_tbl_ld_ichbbk_list', tbl_ld_ichbbk_list.f_n_rs);

                        controlObj.multidropdownlistid('search_f_n_sbkj_tbl_ld_ichbbk_list', tbl_ld_ichbbk_list.f_n_sbkjid);

                        controlObj.multidropdownlistid('search_f_n_sblx_tbl_ld_ichbbk_list', tbl_ld_ichbbk_list.f_n_sblxid);

                        controlObj.multidropdownlistid('search_f_n_jllx_tbl_ld_ichbbk_list', tbl_ld_ichbbk_list.f_n_jllxid);

                        controlObj.text('search_f_n_ljgl_tbl_ld_ichbbk_list', tbl_ld_ichbbk_list.f_n_ljgl);

                        controlObj.text('search_f_n_cqzm_tbl_ld_ichbbk_list', tbl_ld_ichbbk_list.f_n_cqzm);

                        controlObj.text('search_f_n_sqzm_tbl_ld_ichbbk_list', tbl_ld_ichbbk_list.f_n_sqzm);

                        controlObj.text('search_f_n_bqzm_tbl_ld_ichbbk_list', tbl_ld_ichbbk_list.f_n_bqzm);

                        controlObj.text('search_f_n_jsbh_tbl_ld_ichbbk_list', tbl_ld_ichbbk_list.f_n_jsbh);

                        controlObj.text('search_f_n_lxth_tbl_ld_ichbbk_list', tbl_ld_ichbbk_list.f_n_lxth);

                        controlObj.text('search_f_n_khbh_tbl_ld_ichbbk_list', tbl_ld_ichbbk_list.f_n_khbh);

                        controlObj.text('search_f_n_bqsl_tbl_ld_ichbbk_list', tbl_ld_ichbbk_list.f_n_bqsl);

                        controlObj.text('search_f_n_qsqpjsl_tbl_ld_ichbbk_list', tbl_ld_ichbbk_list.f_n_qsqpjsl);

                        controlObj.text('search_f_n_qlqpjsl_tbl_ld_ichbbk_list', tbl_ld_ichbbk_list.f_n_qlqpjsl);

                        controlObj.text('search_f_n_sqsl_tbl_ld_ichbbk_list', tbl_ld_ichbbk_list.f_n_sqsl);

                        controlObj.text('search_f_n_sbdz_tbl_ld_ichbbk_list', tbl_ld_ichbbk_list.f_n_sbdz);

                        controlObj.multidropdownlistid('search_f_zt_tbl_ld_ichbbk_list', tbl_ld_ichbbk_list.f_ztid);

                        controlObj.text('search_f_bz_tbl_ld_ichbbk_list', tbl_ld_ichbbk_list.f_bz);

                        controlObj.text('search_f_xunkr_tbl_ld_ichbbk_list', tbl_ld_ichbbk_list.f_xunkr);

                        controlObj.text('search_f_xunkrid_tbl_ld_ichbbk_list', tbl_ld_ichbbk_list.f_xunkrid);

                        controlObj.text('search_f_xunkrq_tbl_ld_ichbbk_list', tbl_ld_ichbbk_list.f_xunkrq);

                        controlObj.text('search_f_xiekr_tbl_ld_ichbbk_list', tbl_ld_ichbbk_list.f_xiekr);

                        controlObj.text('search_f_xiekrid_tbl_ld_ichbbk_list', tbl_ld_ichbbk_list.f_xiekrid);

                        controlObj.text('search_f_xiekrq_tbl_ld_ichbbk_list', tbl_ld_ichbbk_list.f_xiekrq);

                        controlObj.text('search_f_khbhid_tbl_ld_ichbbk_list', tbl_ld_ichbbk_list.f_khbhid);

                        controlObj.text('search_f_yslx_tbl_ld_ichbbk_list', tbl_ld_ichbbk_list.f_yslx);

                        controlObj.text('search_f_yslxid_tbl_ld_ichbbk_list', tbl_ld_ichbbk_list.f_yslxid);

                        controlObj.text('search_f_yhbh_tbl_ld_ichbbk_list', tbl_ld_ichbbk_list.f_yhbh);

                        controlObj.text('search_f_yhbhid_tbl_ld_ichbbk_list', tbl_ld_ichbbk_list.f_yhbhid);

                        controlObj.text('search_f_khrq_tbl_ld_ichbbk_list', tbl_ld_ichbbk_list.f_khrq);

                        controlObj.text('search_f_dy_tbl_ld_ichbbk_list', tbl_ld_ichbbk_list.f_dy);

                        controlObj.text('search_f_dyid_tbl_ld_ichbbk_list', tbl_ld_ichbbk_list.f_dyid);

                        controlObj.text('search_f_sc_tbl_ld_ichbbk_list', tbl_ld_ichbbk_list.f_sc);

                        controlObj.text('search_f_scid_tbl_ld_ichbbk_list', tbl_ld_ichbbk_list.f_scid);

                        controlObj.text('search_f_qy_tbl_ld_ichbbk_list', tbl_ld_ichbbk_list.f_qy);

                        controlObj.text('search_f_qyid_tbl_ld_ichbbk_list', tbl_ld_ichbbk_list.f_qyid);

                        controlObj.text('search_f_pq_tbl_ld_ichbbk_list', tbl_ld_ichbbk_list.f_pq);

                        controlObj.text('search_f_pqid_tbl_ld_ichbbk_list', tbl_ld_ichbbk_list.f_pqid);

                        controlObj.multidropdownlistid('search_f_khfz_tbl_ld_ichbbk_list', tbl_ld_ichbbk_list.f_khfzid);

                        controlObj.multidropdownlistid('search_f_cbbh_tbl_ld_ichbbk_list', tbl_ld_ichbbk_list.f_cbbhid);

                        controlObj.multidropdownlist('search_f_hbyy_tbl_ld_ichbbk_list', tbl_ld_ichbbk_list.f_hbyy);


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
                    that._pr_searchcontent.type1 = $("#txt_command_search_tbl_ld_ichbbk_list").val();

                    break;
                case "2":

                    //高级查询
                    var tbl_ld_ichbbk_list = new Object();


                    tbl_ld_ichbbk_list.f_value1 = controlObj.text('search_f_value1_tbl_ld_ichbbk_list');


                    tbl_ld_ichbbk_list.f_value2 = controlObj.text('search_f_value2_tbl_ld_ichbbk_list');


                    tbl_ld_ichbbk_list.f_value3 = controlObj.text('search_f_value3_tbl_ld_ichbbk_list');


                    tbl_ld_ichbbk_list.f_value4 = controlObj.text('search_f_value4_tbl_ld_ichbbk_list');


                    tbl_ld_ichbbk_list.f_value5 = controlObj.text('search_f_value5_tbl_ld_ichbbk_list');


                    tbl_ld_ichbbk_list.f_value6 = controlObj.text('search_f_value6_tbl_ld_ichbbk_list');


                    tbl_ld_ichbbk_list.f_value7 = controlObj.text('search_f_value7_tbl_ld_ichbbk_list');


                    tbl_ld_ichbbk_list.f_value8 = controlObj.text('search_f_value8_tbl_ld_ichbbk_list');


                    tbl_ld_ichbbk_list.f_value9 = controlObj.text('search_f_value9_tbl_ld_ichbbk_list');


                    tbl_ld_ichbbk_list.f_value10 = controlObj.text('search_f_value10_tbl_ld_ichbbk_list');


                    tbl_ld_ichbbk_list.f_hbbh = controlObj.text('search_f_hbbh_tbl_ld_ichbbk_list');


                    tbl_ld_ichbbk_list.f_sjbh = controlObj.text('search_f_sjbh_tbl_ld_ichbbk_list');


                    tbl_ld_ichbbk_list.f_khbh = controlObj.text('search_f_khbh_tbl_ld_ichbbk_list');


                    tbl_ld_ichbbk_list.f_yhm = controlObj.text('search_f_yhm_tbl_ld_ichbbk_list');


                    tbl_ld_ichbbk_list.f_jfm = controlObj.text('search_f_jfm_tbl_ld_ichbbk_list');


                    tbl_ld_ichbbk_list.f_lxth = controlObj.text('search_f_lxth_tbl_ld_ichbbk_list');


                    tbl_ld_ichbbk_list.f_dh = controlObj.text('search_f_dh_tbl_ld_ichbbk_list');


                    tbl_ld_ichbbk_list.f_dz = controlObj.text('search_f_dz_tbl_ld_ichbbk_list');


                    tbl_ld_ichbbk_list.f_o_sbbh = controlObj.text('search_f_o_sbbh_tbl_ld_ichbbk_list');


                    tbl_ld_ichbbk_list.f_o_jsbh = controlObj.text('search_f_o_jsbh_tbl_ld_ichbbk_list');


                    tbl_ld_ichbbk_list.f_o_lxth = controlObj.text('search_f_o_lxth_tbl_ld_ichbbk_list');


                    tbl_ld_ichbbk_list.f_o_sbfz = controlObj.text('search_f_o_sbfz_tbl_ld_ichbbk_list');


                    tbl_ld_ichbbk_list.f_o_sbfzid = controlObj.text('search_f_o_sbfzid_tbl_ld_ichbbk_list');


                    tbl_ld_ichbbk_list.f_o_sbpp = controlObj.text('search_f_o_sbpp_tbl_ld_ichbbk_list');


                    tbl_ld_ichbbk_list.f_o_mph = controlObj.text('search_f_o_mph_tbl_ld_ichbbk_list');


                    tbl_ld_ichbbk_list.f_o_sbdz = controlObj.text('search_f_o_sbdz_tbl_ld_ichbbk_list');


                    tbl_ld_ichbbk_list.f_o_khbh = controlObj.text('search_f_o_khbh_tbl_ld_ichbbk_list');


                    tbl_ld_ichbbk_list.f_o_rs = controlObj.text('search_f_o_rs_tbl_ld_ichbbk_list');


                    tbl_ld_ichbbk_list.f_o_sbkj = controlObj.text('search_f_o_sbkj_tbl_ld_ichbbk_list');


                    tbl_ld_ichbbk_list.f_o_sbkjid = controlObj.text('search_f_o_sbkjid_tbl_ld_ichbbk_list');


                    tbl_ld_ichbbk_list.f_o_sblx = controlObj.text('search_f_o_sblx_tbl_ld_ichbbk_list');


                    tbl_ld_ichbbk_list.f_o_sblxid = controlObj.text('search_f_o_sblxid_tbl_ld_ichbbk_list');


                    tbl_ld_ichbbk_list.f_o_jllx = controlObj.text('search_f_o_jllx_tbl_ld_ichbbk_list');


                    tbl_ld_ichbbk_list.f_o_jllxid = controlObj.text('search_f_o_jllxid_tbl_ld_ichbbk_list');


                    tbl_ld_ichbbk_list.f_o_cszm = controlObj.text('search_f_o_cszm_tbl_ld_ichbbk_list');


                    tbl_ld_ichbbk_list.f_o_bqzm = controlObj.text('search_f_o_bqzm_tbl_ld_ichbbk_list');


                    tbl_ld_ichbbk_list.f_o_sqzm = controlObj.text('search_f_o_sqzm_tbl_ld_ichbbk_list');


                    tbl_ld_ichbbk_list.f_o_sqsl = controlObj.text('search_f_o_sqsl_tbl_ld_ichbbk_list');


                    tbl_ld_ichbbk_list.f_o_ljgl = controlObj.text('search_f_o_ljgl_tbl_ld_ichbbk_list');


                    tbl_ld_ichbbk_list.f_o_qsqpjsl = controlObj.text('search_f_o_qsqpjsl_tbl_ld_ichbbk_list');


                    tbl_ld_ichbbk_list.f_o_qlqpjsl = controlObj.text('search_f_o_qlqpjsl_tbl_ld_ichbbk_list');


                    tbl_ld_ichbbk_list.f_o_bqsl = controlObj.text('search_f_o_bqsl_tbl_ld_ichbbk_list');


                    tbl_ld_ichbbk_list.f_n_sbbh = controlObj.text('search_f_n_sbbh_tbl_ld_ichbbk_list');


                    tbl_ld_ichbbk_list.f_n_sbfzid = controlObj.multidropdownlistid('search_f_n_sbfz_tbl_ld_ichbbk_list');


                    tbl_ld_ichbbk_list.f_n_sbpp = controlObj.text('search_f_n_sbpp_tbl_ld_ichbbk_list');


                    tbl_ld_ichbbk_list.f_n_mph = controlObj.text('search_f_n_mph_tbl_ld_ichbbk_list');


                    tbl_ld_ichbbk_list.f_n_rs = controlObj.text('search_f_n_rs_tbl_ld_ichbbk_list');


                    tbl_ld_ichbbk_list.f_n_sbkjid = controlObj.multidropdownlistid('search_f_n_sbkj_tbl_ld_ichbbk_list');


                    tbl_ld_ichbbk_list.f_n_sblxid = controlObj.multidropdownlistid('search_f_n_sblx_tbl_ld_ichbbk_list');


                    tbl_ld_ichbbk_list.f_n_jllxid = controlObj.multidropdownlistid('search_f_n_jllx_tbl_ld_ichbbk_list');


                    tbl_ld_ichbbk_list.f_n_ljgl = controlObj.text('search_f_n_ljgl_tbl_ld_ichbbk_list');


                    tbl_ld_ichbbk_list.f_n_cqzm = controlObj.text('search_f_n_cqzm_tbl_ld_ichbbk_list');


                    tbl_ld_ichbbk_list.f_n_sqzm = controlObj.text('search_f_n_sqzm_tbl_ld_ichbbk_list');


                    tbl_ld_ichbbk_list.f_n_bqzm = controlObj.text('search_f_n_bqzm_tbl_ld_ichbbk_list');


                    tbl_ld_ichbbk_list.f_n_jsbh = controlObj.text('search_f_n_jsbh_tbl_ld_ichbbk_list');


                    tbl_ld_ichbbk_list.f_n_lxth = controlObj.text('search_f_n_lxth_tbl_ld_ichbbk_list');


                    tbl_ld_ichbbk_list.f_n_khbh = controlObj.text('search_f_n_khbh_tbl_ld_ichbbk_list');


                    tbl_ld_ichbbk_list.f_n_bqsl = controlObj.text('search_f_n_bqsl_tbl_ld_ichbbk_list');


                    tbl_ld_ichbbk_list.f_n_qsqpjsl = controlObj.text('search_f_n_qsqpjsl_tbl_ld_ichbbk_list');


                    tbl_ld_ichbbk_list.f_n_qlqpjsl = controlObj.text('search_f_n_qlqpjsl_tbl_ld_ichbbk_list');


                    tbl_ld_ichbbk_list.f_n_sqsl = controlObj.text('search_f_n_sqsl_tbl_ld_ichbbk_list');


                    tbl_ld_ichbbk_list.f_n_sbdz = controlObj.text('search_f_n_sbdz_tbl_ld_ichbbk_list');


                    tbl_ld_ichbbk_list.f_ztid = controlObj.multidropdownlistid('search_f_zt_tbl_ld_ichbbk_list');


                    tbl_ld_ichbbk_list.f_bz = controlObj.text('search_f_bz_tbl_ld_ichbbk_list');


                    tbl_ld_ichbbk_list.f_xunkr = controlObj.text('search_f_xunkr_tbl_ld_ichbbk_list');


                    tbl_ld_ichbbk_list.f_xunkrid = controlObj.text('search_f_xunkrid_tbl_ld_ichbbk_list');


                    tbl_ld_ichbbk_list.f_xunkrq = controlObj.text('search_f_xunkrq_tbl_ld_ichbbk_list');


                    tbl_ld_ichbbk_list.f_xiekr = controlObj.text('search_f_xiekr_tbl_ld_ichbbk_list');


                    tbl_ld_ichbbk_list.f_xiekrid = controlObj.text('search_f_xiekrid_tbl_ld_ichbbk_list');


                    tbl_ld_ichbbk_list.f_xiekrq = controlObj.text('search_f_xiekrq_tbl_ld_ichbbk_list');


                    tbl_ld_ichbbk_list.f_khbhid = controlObj.text('search_f_khbhid_tbl_ld_ichbbk_list');


                    tbl_ld_ichbbk_list.f_yslx = controlObj.text('search_f_yslx_tbl_ld_ichbbk_list');


                    tbl_ld_ichbbk_list.f_yslxid = controlObj.text('search_f_yslxid_tbl_ld_ichbbk_list');


                    tbl_ld_ichbbk_list.f_yhbh = controlObj.text('search_f_yhbh_tbl_ld_ichbbk_list');


                    tbl_ld_ichbbk_list.f_yhbhid = controlObj.text('search_f_yhbhid_tbl_ld_ichbbk_list');


                    tbl_ld_ichbbk_list.f_khrq = controlObj.text('search_f_khrq_tbl_ld_ichbbk_list');


                    tbl_ld_ichbbk_list.f_dy = controlObj.text('search_f_dy_tbl_ld_ichbbk_list');


                    tbl_ld_ichbbk_list.f_dyid = controlObj.text('search_f_dyid_tbl_ld_ichbbk_list');


                    tbl_ld_ichbbk_list.f_sc = controlObj.text('search_f_sc_tbl_ld_ichbbk_list');


                    tbl_ld_ichbbk_list.f_scid = controlObj.text('search_f_scid_tbl_ld_ichbbk_list');


                    tbl_ld_ichbbk_list.f_qy = controlObj.text('search_f_qy_tbl_ld_ichbbk_list');


                    tbl_ld_ichbbk_list.f_qyid = controlObj.text('search_f_qyid_tbl_ld_ichbbk_list');


                    tbl_ld_ichbbk_list.f_pq = controlObj.text('search_f_pq_tbl_ld_ichbbk_list');


                    tbl_ld_ichbbk_list.f_pqid = controlObj.text('search_f_pqid_tbl_ld_ichbbk_list');


                    tbl_ld_ichbbk_list.f_khfzid = controlObj.multidropdownlistid('search_f_khfz_tbl_ld_ichbbk_list');


                    tbl_ld_ichbbk_list.f_cbbhid = controlObj.multidropdownlistid('search_f_cbbh_tbl_ld_ichbbk_list');

                    tbl_ld_ichbbk_list.f_hbyy = controlObj.multidropdownlist('search_f_hbyy_tbl_ld_ichbbk_list');

                    that._pr_searchcontent.type2 = tbl_ld_ichbbk_list;
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
            var tbl_ld_ichbbk_list = that._pr_searchcontent.type2;
            var errorMessageHansMap = new hashMap();
            var errorMessagePlacementHansMap = new hashMap();




            if (tbl_ld_ichbbk_list.f_value1.length > 200)
            {
                errorMessageHansMap.put('search_f_value1_tbl_ld_ichbbk_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ichbbk_list.f_value2.length > 200)
            {
                errorMessageHansMap.put('search_f_value2_tbl_ld_ichbbk_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ichbbk_list.f_value3.length > 200)
            {
                errorMessageHansMap.put('search_f_value3_tbl_ld_ichbbk_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ichbbk_list.f_value4.length > 200)
            {
                errorMessageHansMap.put('search_f_value4_tbl_ld_ichbbk_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ichbbk_list.f_value5.length > 200)
            {
                errorMessageHansMap.put('search_f_value5_tbl_ld_ichbbk_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ichbbk_list.f_value6.length > 200)
            {
                errorMessageHansMap.put('search_f_value6_tbl_ld_ichbbk_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ichbbk_list.f_value7.length > 200)
            {
                errorMessageHansMap.put('search_f_value7_tbl_ld_ichbbk_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ichbbk_list.f_value8.length > 200)
            {
                errorMessageHansMap.put('search_f_value8_tbl_ld_ichbbk_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ichbbk_list.f_value9.length > 200)
            {
                errorMessageHansMap.put('search_f_value9_tbl_ld_ichbbk_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ichbbk_list.f_value10.length > 200)
            {
                errorMessageHansMap.put('search_f_value10_tbl_ld_ichbbk_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ichbbk_list.f_hbbh.length > 200)
            {
                errorMessageHansMap.put('search_f_hbbh_tbl_ld_ichbbk_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ichbbk_list.f_sjbh.length > 200)
            {
                errorMessageHansMap.put('search_f_sjbh_tbl_ld_ichbbk_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ichbbk_list.f_khbh.length > 200)
            {
                errorMessageHansMap.put('search_f_khbh_tbl_ld_ichbbk_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ichbbk_list.f_yhm.length > 200)
            {
                errorMessageHansMap.put('search_f_yhm_tbl_ld_ichbbk_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ichbbk_list.f_jfm.length > 200)
            {
                errorMessageHansMap.put('search_f_jfm_tbl_ld_ichbbk_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ichbbk_list.f_lxth.length > 200)
            {
                errorMessageHansMap.put('search_f_lxth_tbl_ld_ichbbk_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ichbbk_list.f_dh.length > 200)
            {
                errorMessageHansMap.put('search_f_dh_tbl_ld_ichbbk_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ichbbk_list.f_dz.length > 200)
            {
                errorMessageHansMap.put('search_f_dz_tbl_ld_ichbbk_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ichbbk_list.f_o_sbbh.length > 200)
            {
                errorMessageHansMap.put('search_f_o_sbbh_tbl_ld_ichbbk_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ichbbk_list.f_o_jsbh.length > 200)
            {
                errorMessageHansMap.put('search_f_o_jsbh_tbl_ld_ichbbk_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ichbbk_list.f_o_lxth.length > 200)
            {
                errorMessageHansMap.put('search_f_o_lxth_tbl_ld_ichbbk_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ichbbk_list.f_o_sbfz.length > 200)
            {
                errorMessageHansMap.put('search_f_o_sbfz_tbl_ld_ichbbk_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ichbbk_list.f_o_sbfzid.length > 200)
            {
                errorMessageHansMap.put('search_f_o_sbfzid_tbl_ld_ichbbk_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ichbbk_list.f_o_sbpp.length > 200)
            {
                errorMessageHansMap.put('search_f_o_sbpp_tbl_ld_ichbbk_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ichbbk_list.f_o_mph.length > 200)
            {
                errorMessageHansMap.put('search_f_o_mph_tbl_ld_ichbbk_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ichbbk_list.f_o_sbdz.length > 200)
            {
                errorMessageHansMap.put('search_f_o_sbdz_tbl_ld_ichbbk_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ichbbk_list.f_o_khbh.length > 200)
            {
                errorMessageHansMap.put('search_f_o_khbh_tbl_ld_ichbbk_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ichbbk_list.f_o_rs.length > 200)
            {
                errorMessageHansMap.put('search_f_o_rs_tbl_ld_ichbbk_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ichbbk_list.f_o_sbkj.length > 200)
            {
                errorMessageHansMap.put('search_f_o_sbkj_tbl_ld_ichbbk_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ichbbk_list.f_o_sbkjid.length > 200)
            {
                errorMessageHansMap.put('search_f_o_sbkjid_tbl_ld_ichbbk_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ichbbk_list.f_o_sblx.length > 200)
            {
                errorMessageHansMap.put('search_f_o_sblx_tbl_ld_ichbbk_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ichbbk_list.f_o_sblxid.length > 200)
            {
                errorMessageHansMap.put('search_f_o_sblxid_tbl_ld_ichbbk_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ichbbk_list.f_o_jllx.length > 200)
            {
                errorMessageHansMap.put('search_f_o_jllx_tbl_ld_ichbbk_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ichbbk_list.f_o_jllxid.length > 200)
            {
                errorMessageHansMap.put('search_f_o_jllxid_tbl_ld_ichbbk_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ichbbk_list.f_o_cszm.length > 200)
            {
                errorMessageHansMap.put('search_f_o_cszm_tbl_ld_ichbbk_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ichbbk_list.f_o_bqzm.length > 200)
            {
                errorMessageHansMap.put('search_f_o_bqzm_tbl_ld_ichbbk_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ichbbk_list.f_o_sqzm.length > 200)
            {
                errorMessageHansMap.put('search_f_o_sqzm_tbl_ld_ichbbk_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ichbbk_list.f_o_sqsl.length > 200)
            {
                errorMessageHansMap.put('search_f_o_sqsl_tbl_ld_ichbbk_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ichbbk_list.f_o_ljgl.length > 200)
            {
                errorMessageHansMap.put('search_f_o_ljgl_tbl_ld_ichbbk_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ichbbk_list.f_o_qsqpjsl.length > 200)
            {
                errorMessageHansMap.put('search_f_o_qsqpjsl_tbl_ld_ichbbk_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ichbbk_list.f_o_qlqpjsl.length > 200)
            {
                errorMessageHansMap.put('search_f_o_qlqpjsl_tbl_ld_ichbbk_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ichbbk_list.f_o_bqsl.length > 200)
            {
                errorMessageHansMap.put('search_f_o_bqsl_tbl_ld_ichbbk_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ichbbk_list.f_n_sbbh.length > 200)
            {
                errorMessageHansMap.put('search_f_n_sbbh_tbl_ld_ichbbk_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ichbbk_list.f_n_sbfzid.length > 200)
            {
                errorMessageHansMap.put('search_f_n_sbfz_tbl_ld_ichbbk_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ichbbk_list.f_n_sbpp.length > 200)
            {
                errorMessageHansMap.put('search_f_n_sbpp_tbl_ld_ichbbk_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ichbbk_list.f_n_mph.length > 200)
            {
                errorMessageHansMap.put('search_f_n_mph_tbl_ld_ichbbk_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ichbbk_list.f_n_rs.length > 200)
            {
                errorMessageHansMap.put('search_f_n_rs_tbl_ld_ichbbk_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ichbbk_list.f_n_sbkjid.length > 200)
            {
                errorMessageHansMap.put('search_f_n_sbkj_tbl_ld_ichbbk_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ichbbk_list.f_n_sblxid.length > 200)
            {
                errorMessageHansMap.put('search_f_n_sblx_tbl_ld_ichbbk_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ichbbk_list.f_n_jllxid.length > 200)
            {
                errorMessageHansMap.put('search_f_n_jllx_tbl_ld_ichbbk_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ichbbk_list.f_n_ljgl.length > 200)
            {
                errorMessageHansMap.put('search_f_n_ljgl_tbl_ld_ichbbk_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ichbbk_list.f_n_cqzm.length > 200)
            {
                errorMessageHansMap.put('search_f_n_cqzm_tbl_ld_ichbbk_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ichbbk_list.f_n_sqzm.length > 200)
            {
                errorMessageHansMap.put('search_f_n_sqzm_tbl_ld_ichbbk_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ichbbk_list.f_n_bqzm.length > 200)
            {
                errorMessageHansMap.put('search_f_n_bqzm_tbl_ld_ichbbk_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ichbbk_list.f_n_jsbh.length > 200)
            {
                errorMessageHansMap.put('search_f_n_jsbh_tbl_ld_ichbbk_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ichbbk_list.f_n_lxth.length > 200)
            {
                errorMessageHansMap.put('search_f_n_lxth_tbl_ld_ichbbk_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ichbbk_list.f_n_khbh.length > 200)
            {
                errorMessageHansMap.put('search_f_n_khbh_tbl_ld_ichbbk_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ichbbk_list.f_n_bqsl.length > 200)
            {
                errorMessageHansMap.put('search_f_n_bqsl_tbl_ld_ichbbk_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ichbbk_list.f_n_qsqpjsl.length > 200)
            {
                errorMessageHansMap.put('search_f_n_qsqpjsl_tbl_ld_ichbbk_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ichbbk_list.f_n_qlqpjsl.length > 200)
            {
                errorMessageHansMap.put('search_f_n_qlqpjsl_tbl_ld_ichbbk_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ichbbk_list.f_n_sqsl.length > 200)
            {
                errorMessageHansMap.put('search_f_n_sqsl_tbl_ld_ichbbk_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ichbbk_list.f_n_sbdz.length > 200)
            {
                errorMessageHansMap.put('search_f_n_sbdz_tbl_ld_ichbbk_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ichbbk_list.f_ztid.length > 200)
            {
                errorMessageHansMap.put('search_f_zt_tbl_ld_ichbbk_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ichbbk_list.f_bz.length > 200)
            {
                errorMessageHansMap.put('search_f_bz_tbl_ld_ichbbk_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ichbbk_list.f_xunkr.length > 200)
            {
                errorMessageHansMap.put('search_f_xunkr_tbl_ld_ichbbk_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ichbbk_list.f_xunkrid.length > 200)
            {
                errorMessageHansMap.put('search_f_xunkrid_tbl_ld_ichbbk_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ichbbk_list.f_xunkrq.length > 200)
            {
                errorMessageHansMap.put('search_f_xunkrq_tbl_ld_ichbbk_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ichbbk_list.f_xiekr.length > 200)
            {
                errorMessageHansMap.put('search_f_xiekr_tbl_ld_ichbbk_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ichbbk_list.f_xiekrid.length > 200)
            {
                errorMessageHansMap.put('search_f_xiekrid_tbl_ld_ichbbk_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ichbbk_list.f_xiekrq.length > 200)
            {
                errorMessageHansMap.put('search_f_xiekrq_tbl_ld_ichbbk_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ichbbk_list.f_khbhid.length > 200)
            {
                errorMessageHansMap.put('search_f_khbhid_tbl_ld_ichbbk_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ichbbk_list.f_yslx.length > 200)
            {
                errorMessageHansMap.put('search_f_yslx_tbl_ld_ichbbk_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ichbbk_list.f_yslxid.length > 200)
            {
                errorMessageHansMap.put('search_f_yslxid_tbl_ld_ichbbk_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ichbbk_list.f_yhbh.length > 200)
            {
                errorMessageHansMap.put('search_f_yhbh_tbl_ld_ichbbk_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ichbbk_list.f_yhbhid.length > 200)
            {
                errorMessageHansMap.put('search_f_yhbhid_tbl_ld_ichbbk_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ichbbk_list.f_khrq.length > 200)
            {
                errorMessageHansMap.put('search_f_khrq_tbl_ld_ichbbk_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ichbbk_list.f_dy.length > 200)
            {
                errorMessageHansMap.put('search_f_dy_tbl_ld_ichbbk_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ichbbk_list.f_dyid.length > 200)
            {
                errorMessageHansMap.put('search_f_dyid_tbl_ld_ichbbk_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ichbbk_list.f_sc.length > 200)
            {
                errorMessageHansMap.put('search_f_sc_tbl_ld_ichbbk_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ichbbk_list.f_scid.length > 200)
            {
                errorMessageHansMap.put('search_f_scid_tbl_ld_ichbbk_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ichbbk_list.f_qy.length > 200)
            {
                errorMessageHansMap.put('search_f_qy_tbl_ld_ichbbk_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ichbbk_list.f_qyid.length > 200)
            {
                errorMessageHansMap.put('search_f_qyid_tbl_ld_ichbbk_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ichbbk_list.f_pq.length > 200)
            {
                errorMessageHansMap.put('search_f_pq_tbl_ld_ichbbk_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ichbbk_list.f_pqid.length > 200)
            {
                errorMessageHansMap.put('search_f_pqid_tbl_ld_ichbbk_list', '长度不能超过<a style="color:red">200</a>个字');
            }


            if (tbl_ld_ichbbk_list.f_khfzid.length > 200)
            {
                errorMessageHansMap.put('search_f_khfz_tbl_ld_ichbbk_list', '长度不能超过<a style="color:red">200</a>个字');
            }




            if (tbl_ld_ichbbk_list.f_cbbhid.length > 200)
            {
                errorMessageHansMap.put('search_f_cbbh_tbl_ld_ichbbk_list', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_ichbbk_list.f_hbyy.length > 200)
            {
                errorMessageHansMap.put('search_f_hbyy_tbl_ld_ichbbk_list', '长度不能超过<a style="color:red">200</a>个字');
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
                controlObj.text('search_f_value1_tbl_ld_ichbbk_list', that._pr_searchcontent.type2.f_value1);


                that._pr_searchcontent.type2.f_value2 = '';
                controlObj.text('search_f_value2_tbl_ld_ichbbk_list', that._pr_searchcontent.type2.f_value2);


                that._pr_searchcontent.type2.f_value3 = '';
                controlObj.text('search_f_value3_tbl_ld_ichbbk_list', that._pr_searchcontent.type2.f_value3);


                that._pr_searchcontent.type2.f_value4 = '';
                controlObj.text('search_f_value4_tbl_ld_ichbbk_list', that._pr_searchcontent.type2.f_value4);


                that._pr_searchcontent.type2.f_value5 = '';
                controlObj.text('search_f_value5_tbl_ld_ichbbk_list', that._pr_searchcontent.type2.f_value5);


                that._pr_searchcontent.type2.f_value6 = '';
                controlObj.text('search_f_value6_tbl_ld_ichbbk_list', that._pr_searchcontent.type2.f_value6);


                that._pr_searchcontent.type2.f_value7 = '';
                controlObj.text('search_f_value7_tbl_ld_ichbbk_list', that._pr_searchcontent.type2.f_value7);


                that._pr_searchcontent.type2.f_value8 = '';
                controlObj.text('search_f_value8_tbl_ld_ichbbk_list', that._pr_searchcontent.type2.f_value8);


                that._pr_searchcontent.type2.f_value9 = '';
                controlObj.text('search_f_value9_tbl_ld_ichbbk_list', that._pr_searchcontent.type2.f_value9);


                that._pr_searchcontent.type2.f_value10 = '';
                controlObj.text('search_f_value10_tbl_ld_ichbbk_list', that._pr_searchcontent.type2.f_value10);


                that._pr_searchcontent.type2.f_hbbh = '';
                controlObj.text('search_f_hbbh_tbl_ld_ichbbk_list', that._pr_searchcontent.type2.f_hbbh);


                that._pr_searchcontent.type2.f_sjbh = '';
                controlObj.text('search_f_sjbh_tbl_ld_ichbbk_list', that._pr_searchcontent.type2.f_sjbh);


                that._pr_searchcontent.type2.f_khbh = '';
                controlObj.text('search_f_khbh_tbl_ld_ichbbk_list', that._pr_searchcontent.type2.f_khbh);


                that._pr_searchcontent.type2.f_yhm = '';
                controlObj.text('search_f_yhm_tbl_ld_ichbbk_list', that._pr_searchcontent.type2.f_yhm);


                that._pr_searchcontent.type2.f_jfm = '';
                controlObj.text('search_f_jfm_tbl_ld_ichbbk_list', that._pr_searchcontent.type2.f_jfm);


                that._pr_searchcontent.type2.f_lxth = '';
                controlObj.text('search_f_lxth_tbl_ld_ichbbk_list', that._pr_searchcontent.type2.f_lxth);


                that._pr_searchcontent.type2.f_dh = '';
                controlObj.text('search_f_dh_tbl_ld_ichbbk_list', that._pr_searchcontent.type2.f_dh);


                that._pr_searchcontent.type2.f_dz = '';
                controlObj.text('search_f_dz_tbl_ld_ichbbk_list', that._pr_searchcontent.type2.f_dz);


                that._pr_searchcontent.type2.f_o_sbbh = '';
                controlObj.text('search_f_o_sbbh_tbl_ld_ichbbk_list', that._pr_searchcontent.type2.f_o_sbbh);


                that._pr_searchcontent.type2.f_o_jsbh = '';
                controlObj.text('search_f_o_jsbh_tbl_ld_ichbbk_list', that._pr_searchcontent.type2.f_o_jsbh);


                that._pr_searchcontent.type2.f_o_lxth = '';
                controlObj.text('search_f_o_lxth_tbl_ld_ichbbk_list', that._pr_searchcontent.type2.f_o_lxth);


                that._pr_searchcontent.type2.f_o_sbfz = '';
                controlObj.text('search_f_o_sbfz_tbl_ld_ichbbk_list', that._pr_searchcontent.type2.f_o_sbfz);


                that._pr_searchcontent.type2.f_o_sbfzid = '';
                controlObj.text('search_f_o_sbfzid_tbl_ld_ichbbk_list', that._pr_searchcontent.type2.f_o_sbfzid);


                that._pr_searchcontent.type2.f_o_sbpp = '';
                controlObj.text('search_f_o_sbpp_tbl_ld_ichbbk_list', that._pr_searchcontent.type2.f_o_sbpp);


                that._pr_searchcontent.type2.f_o_mph = '';
                controlObj.text('search_f_o_mph_tbl_ld_ichbbk_list', that._pr_searchcontent.type2.f_o_mph);


                that._pr_searchcontent.type2.f_o_sbdz = '';
                controlObj.text('search_f_o_sbdz_tbl_ld_ichbbk_list', that._pr_searchcontent.type2.f_o_sbdz);


                that._pr_searchcontent.type2.f_o_khbh = '';
                controlObj.text('search_f_o_khbh_tbl_ld_ichbbk_list', that._pr_searchcontent.type2.f_o_khbh);


                that._pr_searchcontent.type2.f_o_rs = '';
                controlObj.text('search_f_o_rs_tbl_ld_ichbbk_list', that._pr_searchcontent.type2.f_o_rs);


                that._pr_searchcontent.type2.f_o_sbkj = '';
                controlObj.text('search_f_o_sbkj_tbl_ld_ichbbk_list', that._pr_searchcontent.type2.f_o_sbkj);


                that._pr_searchcontent.type2.f_o_sbkjid = '';
                controlObj.text('search_f_o_sbkjid_tbl_ld_ichbbk_list', that._pr_searchcontent.type2.f_o_sbkjid);


                that._pr_searchcontent.type2.f_o_sblx = '';
                controlObj.text('search_f_o_sblx_tbl_ld_ichbbk_list', that._pr_searchcontent.type2.f_o_sblx);


                that._pr_searchcontent.type2.f_o_sblxid = '';
                controlObj.text('search_f_o_sblxid_tbl_ld_ichbbk_list', that._pr_searchcontent.type2.f_o_sblxid);


                that._pr_searchcontent.type2.f_o_jllx = '';
                controlObj.text('search_f_o_jllx_tbl_ld_ichbbk_list', that._pr_searchcontent.type2.f_o_jllx);


                that._pr_searchcontent.type2.f_o_jllxid = '';
                controlObj.text('search_f_o_jllxid_tbl_ld_ichbbk_list', that._pr_searchcontent.type2.f_o_jllxid);


                that._pr_searchcontent.type2.f_o_cszm = '';
                controlObj.text('search_f_o_cszm_tbl_ld_ichbbk_list', that._pr_searchcontent.type2.f_o_cszm);


                that._pr_searchcontent.type2.f_o_bqzm = '';
                controlObj.text('search_f_o_bqzm_tbl_ld_ichbbk_list', that._pr_searchcontent.type2.f_o_bqzm);


                that._pr_searchcontent.type2.f_o_sqzm = '';
                controlObj.text('search_f_o_sqzm_tbl_ld_ichbbk_list', that._pr_searchcontent.type2.f_o_sqzm);


                that._pr_searchcontent.type2.f_o_sqsl = '';
                controlObj.text('search_f_o_sqsl_tbl_ld_ichbbk_list', that._pr_searchcontent.type2.f_o_sqsl);


                that._pr_searchcontent.type2.f_o_ljgl = '';
                controlObj.text('search_f_o_ljgl_tbl_ld_ichbbk_list', that._pr_searchcontent.type2.f_o_ljgl);


                that._pr_searchcontent.type2.f_o_qsqpjsl = '';
                controlObj.text('search_f_o_qsqpjsl_tbl_ld_ichbbk_list', that._pr_searchcontent.type2.f_o_qsqpjsl);


                that._pr_searchcontent.type2.f_o_qlqpjsl = '';
                controlObj.text('search_f_o_qlqpjsl_tbl_ld_ichbbk_list', that._pr_searchcontent.type2.f_o_qlqpjsl);


                that._pr_searchcontent.type2.f_o_bqsl = '';
                controlObj.text('search_f_o_bqsl_tbl_ld_ichbbk_list', that._pr_searchcontent.type2.f_o_bqsl);


                that._pr_searchcontent.type2.f_n_sbbh = '';
                controlObj.text('search_f_n_sbbh_tbl_ld_ichbbk_list', that._pr_searchcontent.type2.f_n_sbbh);


                that._pr_searchcontent.type2.f_n_sbfzid = '';
                controlObj.multidropdownlistid('search_f_n_sbfz_tbl_ld_ichbbk_list', that._pr_searchcontent.type2.f_n_sbfzid);


                that._pr_searchcontent.type2.f_n_sbpp = '';
                controlObj.text('search_f_n_sbpp_tbl_ld_ichbbk_list', that._pr_searchcontent.type2.f_n_sbpp);


                that._pr_searchcontent.type2.f_n_mph = '';
                controlObj.text('search_f_n_mph_tbl_ld_ichbbk_list', that._pr_searchcontent.type2.f_n_mph);


                that._pr_searchcontent.type2.f_n_rs = '';
                controlObj.text('search_f_n_rs_tbl_ld_ichbbk_list', that._pr_searchcontent.type2.f_n_rs);


                that._pr_searchcontent.type2.f_n_sbkjid = '';
                controlObj.multidropdownlistid('search_f_n_sbkj_tbl_ld_ichbbk_list', that._pr_searchcontent.type2.f_n_sbkjid);


                that._pr_searchcontent.type2.f_n_sblxid = '';
                controlObj.multidropdownlistid('search_f_n_sblx_tbl_ld_ichbbk_list', that._pr_searchcontent.type2.f_n_sblxid);


                that._pr_searchcontent.type2.f_n_jllxid = '';
                controlObj.multidropdownlistid('search_f_n_jllx_tbl_ld_ichbbk_list', that._pr_searchcontent.type2.f_n_jllxid);


                that._pr_searchcontent.type2.f_n_ljgl = '';
                controlObj.text('search_f_n_ljgl_tbl_ld_ichbbk_list', that._pr_searchcontent.type2.f_n_ljgl);


                that._pr_searchcontent.type2.f_n_cqzm = '';
                controlObj.text('search_f_n_cqzm_tbl_ld_ichbbk_list', that._pr_searchcontent.type2.f_n_cqzm);


                that._pr_searchcontent.type2.f_n_sqzm = '';
                controlObj.text('search_f_n_sqzm_tbl_ld_ichbbk_list', that._pr_searchcontent.type2.f_n_sqzm);


                that._pr_searchcontent.type2.f_n_bqzm = '';
                controlObj.text('search_f_n_bqzm_tbl_ld_ichbbk_list', that._pr_searchcontent.type2.f_n_bqzm);


                that._pr_searchcontent.type2.f_n_jsbh = '';
                controlObj.text('search_f_n_jsbh_tbl_ld_ichbbk_list', that._pr_searchcontent.type2.f_n_jsbh);


                that._pr_searchcontent.type2.f_n_lxth = '';
                controlObj.text('search_f_n_lxth_tbl_ld_ichbbk_list', that._pr_searchcontent.type2.f_n_lxth);


                that._pr_searchcontent.type2.f_n_khbh = '';
                controlObj.text('search_f_n_khbh_tbl_ld_ichbbk_list', that._pr_searchcontent.type2.f_n_khbh);


                that._pr_searchcontent.type2.f_n_bqsl = '';
                controlObj.text('search_f_n_bqsl_tbl_ld_ichbbk_list', that._pr_searchcontent.type2.f_n_bqsl);


                that._pr_searchcontent.type2.f_n_qsqpjsl = '';
                controlObj.text('search_f_n_qsqpjsl_tbl_ld_ichbbk_list', that._pr_searchcontent.type2.f_n_qsqpjsl);


                that._pr_searchcontent.type2.f_n_qlqpjsl = '';
                controlObj.text('search_f_n_qlqpjsl_tbl_ld_ichbbk_list', that._pr_searchcontent.type2.f_n_qlqpjsl);


                that._pr_searchcontent.type2.f_n_sqsl = '';
                controlObj.text('search_f_n_sqsl_tbl_ld_ichbbk_list', that._pr_searchcontent.type2.f_n_sqsl);


                that._pr_searchcontent.type2.f_n_sbdz = '';
                controlObj.text('search_f_n_sbdz_tbl_ld_ichbbk_list', that._pr_searchcontent.type2.f_n_sbdz);


                that._pr_searchcontent.type2.f_ztid = '';
                controlObj.multidropdownlistid('search_f_zt_tbl_ld_ichbbk_list', that._pr_searchcontent.type2.f_ztid);


                that._pr_searchcontent.type2.f_bz = '';
                controlObj.text('search_f_bz_tbl_ld_ichbbk_list', that._pr_searchcontent.type2.f_bz);


                that._pr_searchcontent.type2.f_xunkr = '';
                controlObj.text('search_f_xunkr_tbl_ld_ichbbk_list', that._pr_searchcontent.type2.f_xunkr);


                that._pr_searchcontent.type2.f_xunkrid = '';
                controlObj.text('search_f_xunkrid_tbl_ld_ichbbk_list', that._pr_searchcontent.type2.f_xunkrid);


                that._pr_searchcontent.type2.f_xunkrq = '';
                controlObj.text('search_f_xunkrq_tbl_ld_ichbbk_list', that._pr_searchcontent.type2.f_xunkrq);


                that._pr_searchcontent.type2.f_xiekr = '';
                controlObj.text('search_f_xiekr_tbl_ld_ichbbk_list', that._pr_searchcontent.type2.f_xiekr);


                that._pr_searchcontent.type2.f_xiekrid = '';
                controlObj.text('search_f_xiekrid_tbl_ld_ichbbk_list', that._pr_searchcontent.type2.f_xiekrid);


                that._pr_searchcontent.type2.f_xiekrq = '';
                controlObj.text('search_f_xiekrq_tbl_ld_ichbbk_list', that._pr_searchcontent.type2.f_xiekrq);


                that._pr_searchcontent.type2.f_khbhid = '';
                controlObj.text('search_f_khbhid_tbl_ld_ichbbk_list', that._pr_searchcontent.type2.f_khbhid);


                that._pr_searchcontent.type2.f_yslx = '';
                controlObj.text('search_f_yslx_tbl_ld_ichbbk_list', that._pr_searchcontent.type2.f_yslx);


                that._pr_searchcontent.type2.f_yslxid = '';
                controlObj.text('search_f_yslxid_tbl_ld_ichbbk_list', that._pr_searchcontent.type2.f_yslxid);


                that._pr_searchcontent.type2.f_yhbh = '';
                controlObj.text('search_f_yhbh_tbl_ld_ichbbk_list', that._pr_searchcontent.type2.f_yhbh);


                that._pr_searchcontent.type2.f_yhbhid = '';
                controlObj.text('search_f_yhbhid_tbl_ld_ichbbk_list', that._pr_searchcontent.type2.f_yhbhid);


                that._pr_searchcontent.type2.f_khrq = '';
                controlObj.text('search_f_khrq_tbl_ld_ichbbk_list', that._pr_searchcontent.type2.f_khrq);


                that._pr_searchcontent.type2.f_dy = '';
                controlObj.text('search_f_dy_tbl_ld_ichbbk_list', that._pr_searchcontent.type2.f_dy);


                that._pr_searchcontent.type2.f_dyid = '';
                controlObj.text('search_f_dyid_tbl_ld_ichbbk_list', that._pr_searchcontent.type2.f_dyid);


                that._pr_searchcontent.type2.f_sc = '';
                controlObj.text('search_f_sc_tbl_ld_ichbbk_list', that._pr_searchcontent.type2.f_sc);


                that._pr_searchcontent.type2.f_scid = '';
                controlObj.text('search_f_scid_tbl_ld_ichbbk_list', that._pr_searchcontent.type2.f_scid);


                that._pr_searchcontent.type2.f_qy = '';
                controlObj.text('search_f_qy_tbl_ld_ichbbk_list', that._pr_searchcontent.type2.f_qy);


                that._pr_searchcontent.type2.f_qyid = '';
                controlObj.text('search_f_qyid_tbl_ld_ichbbk_list', that._pr_searchcontent.type2.f_qyid);


                that._pr_searchcontent.type2.f_pq = '';
                controlObj.text('search_f_pq_tbl_ld_ichbbk_list', that._pr_searchcontent.type2.f_pq);


                that._pr_searchcontent.type2.f_pqid = '';
                controlObj.text('search_f_pqid_tbl_ld_ichbbk_list', that._pr_searchcontent.type2.f_pqid);

                that._pr_searchcontent.type2.f_khfzid = '';
                controlObj.multidropdownlistid('search_f_khfz_tbl_ld_ichbbk_list', that._pr_searchcontent.type2.f_khfzid);
                that._pr_searchcontent.type2.f_cbbhid = '';
                controlObj.multidropdownlistid('search_f_cbbh_tbl_ld_ichbbk_list', that._pr_searchcontent.type2.f_cbbhid);

                that._pr_searchcontent.type2.f_hbyy = '';
                controlObj.multidropdownlistid('search_f_hbyy_tbl_ld_ichbbk_list', that._pr_searchcontent.type2.f_hbyy);
                break;
            case "2":
                if (that._pr_searchcontent.type1 == undefined)
                {
                    that._pr_searchcontent.type1 = '';
                }

                $("#txt_command_search_tbl_ld_ichbbk_list").val('');
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

                                    whereClause += " f_hbbh like '%" + vv[i] + "%' or ";

                                    whereClause += " f_sjbh like '%" + vv[i] + "%' or ";

                                    whereClause += " f_khbh like '%" + vv[i] + "%' or ";

                                    whereClause += " f_yhm like '%" + vv[i] + "%' or ";

                                    whereClause += " f_jfm like '%" + vv[i] + "%' or ";

                                    whereClause += " f_lxth like '%" + vv[i] + "%' or ";

                                    whereClause += " f_dh like '%" + vv[i] + "%' or ";

                                    whereClause += " f_dz like '%" + vv[i] + "%' or ";

                                    whereClause += " f_o_sbbh like '%" + vv[i] + "%' or ";

                                    whereClause += " f_o_jsbh like '%" + vv[i] + "%' or ";

                                    whereClause += " f_o_lxth like '%" + vv[i] + "%' or ";

                                    whereClause += " f_o_sbfz like '%" + vv[i] + "%' or ";

                                    whereClause += " f_o_sbfzid like '%" + vv[i] + "%' or ";

                                    whereClause += " f_o_sbpp like '%" + vv[i] + "%' or ";

                                    whereClause += " f_o_mph like '%" + vv[i] + "%' or ";

                                    whereClause += " f_o_sbdz like '%" + vv[i] + "%' or ";

                                    whereClause += " f_o_khbh like '%" + vv[i] + "%' or ";

                                    whereClause += " f_o_rs like '%" + vv[i] + "%' or ";

                                    whereClause += " f_o_sbkj like '%" + vv[i] + "%' or ";

                                    whereClause += " f_o_sbkjid like '%" + vv[i] + "%' or ";

                                    whereClause += " f_o_sblx like '%" + vv[i] + "%' or ";

                                    whereClause += " f_o_sblxid like '%" + vv[i] + "%' or ";

                                    whereClause += " f_o_jllx like '%" + vv[i] + "%' or ";

                                    whereClause += " f_o_jllxid like '%" + vv[i] + "%' or ";

                                    whereClause += " f_o_cszm like '%" + vv[i] + "%' or ";

                                    whereClause += " f_o_bqzm like '%" + vv[i] + "%' or ";

                                    whereClause += " f_o_sqzm like '%" + vv[i] + "%' or ";

                                    whereClause += " f_o_sqsl like '%" + vv[i] + "%' or ";

                                    whereClause += " f_o_ljgl like '%" + vv[i] + "%' or ";

                                    whereClause += " f_o_qsqpjsl like '%" + vv[i] + "%' or ";

                                    whereClause += " f_o_qlqpjsl like '%" + vv[i] + "%' or ";

                                    whereClause += " f_o_bqsl like '%" + vv[i] + "%' or ";

                                    whereClause += " f_n_sbbh like '%" + vv[i] + "%' or ";

                                    whereClause += " f_n_sbfz like '%" + vv[i] + "%' or ";

                                    whereClause += " f_n_sbpp like '%" + vv[i] + "%' or ";

                                    whereClause += " f_n_mph like '%" + vv[i] + "%' or ";

                                    whereClause += " f_n_rs like '%" + vv[i] + "%' or ";

                                    whereClause += " f_n_sbkj like '%" + vv[i] + "%' or ";

                                    whereClause += " f_n_sblx like '%" + vv[i] + "%' or ";

                                    whereClause += " f_n_jllx like '%" + vv[i] + "%' or ";

                                    whereClause += " f_n_ljgl like '%" + vv[i] + "%' or ";

                                    whereClause += " f_n_cqzm like '%" + vv[i] + "%' or ";

                                    whereClause += " f_n_sqzm like '%" + vv[i] + "%' or ";

                                    whereClause += " f_n_bqzm like '%" + vv[i] + "%' or ";

                                    whereClause += " f_n_jsbh like '%" + vv[i] + "%' or ";

                                    whereClause += " f_n_lxth like '%" + vv[i] + "%' or ";

                                    whereClause += " f_n_khbh like '%" + vv[i] + "%' or ";

                                    whereClause += " f_n_bqsl like '%" + vv[i] + "%' or ";

                                    whereClause += " f_n_qsqpjsl like '%" + vv[i] + "%' or ";

                                    whereClause += " f_n_qlqpjsl like '%" + vv[i] + "%' or ";

                                    whereClause += " f_n_sqsl like '%" + vv[i] + "%' or ";

                                    whereClause += " f_n_sbdz like '%" + vv[i] + "%' or ";

                                    whereClause += " f_zt like '%" + vv[i] + "%' or ";

                                    whereClause += " f_bz like '%" + vv[i] + "%' or ";

                                    whereClause += " f_xunkr like '%" + vv[i] + "%' or ";

                                    whereClause += " f_xunkrid like '%" + vv[i] + "%' or ";

                                    whereClause += " f_xunkrq like '%" + vv[i] + "%' or ";

                                    whereClause += " f_xiekr like '%" + vv[i] + "%' or ";

                                    whereClause += " f_xiekrid like '%" + vv[i] + "%' or ";

                                    whereClause += " f_xiekrq like '%" + vv[i] + "%' or ";

                                    whereClause += " f_khbhid like '%" + vv[i] + "%' or ";

                                    whereClause += " f_yslx like '%" + vv[i] + "%' or ";

                                    whereClause += " f_yslxid like '%" + vv[i] + "%' or ";

                                    whereClause += " f_yhbh like '%" + vv[i] + "%' or ";

                                    whereClause += " f_yhbhid like '%" + vv[i] + "%' or ";

                                    whereClause += " f_khrq like '%" + vv[i] + "%' or ";

                                    whereClause += " f_dy like '%" + vv[i] + "%' or ";

                                    whereClause += " f_dyid like '%" + vv[i] + "%' or ";

                                    whereClause += " f_sc like '%" + vv[i] + "%' or ";

                                    whereClause += " f_scid like '%" + vv[i] + "%' or ";

                                    whereClause += " f_qy like '%" + vv[i] + "%' or ";

                                    whereClause += " f_qyid like '%" + vv[i] + "%' or ";

                                    whereClause += " f_pq like '%" + vv[i] + "%' or ";

                                    whereClause += " f_pqid like '%" + vv[i] + "%' or ";

                                    whereClause += " f_khfz like '%" + vv[i] + "%' or ";

                                    whereClause += " f_cbbh like '%" + vv[i] + "%' or ";

                                    whereClause += " f_hbyy like '%" + vv[i] + "%' or ";
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

                        var tbl_ld_ichbbk_list = that._pr_searchcontent.type2;



                        if (tbl_ld_ichbbk_list.f_hbbh.length > 0)
                        {
                            whereClause += " f_hbbh like '%" + tbl_ld_ichbbk_list.f_hbbh + "%' and ";
                        }


                        if (tbl_ld_ichbbk_list.f_sjbh.length > 0)
                        {
                            whereClause += " f_sjbh like '%" + tbl_ld_ichbbk_list.f_sjbh + "%' and ";
                        }


                        if (tbl_ld_ichbbk_list.f_khbh.length > 0)
                        {
                            whereClause += " f_khbh like '%" + tbl_ld_ichbbk_list.f_khbh + "%' and ";
                        }


                        if (tbl_ld_ichbbk_list.f_yhm.length > 0)
                        {
                            whereClause += " f_yhm like '%" + tbl_ld_ichbbk_list.f_yhm + "%' and ";
                        }


                        if (tbl_ld_ichbbk_list.f_jfm.length > 0)
                        {
                            whereClause += " f_jfm like '%" + tbl_ld_ichbbk_list.f_jfm + "%' and ";
                        }


                        if (tbl_ld_ichbbk_list.f_lxth.length > 0)
                        {
                            whereClause += " f_lxth like '%" + tbl_ld_ichbbk_list.f_lxth + "%' and ";
                        }


                        if (tbl_ld_ichbbk_list.f_dh.length > 0)
                        {
                            whereClause += " f_dh like '%" + tbl_ld_ichbbk_list.f_dh + "%' and ";
                        }


                        if (tbl_ld_ichbbk_list.f_dz.length > 0)
                        {
                            whereClause += " f_dz like '%" + tbl_ld_ichbbk_list.f_dz + "%' and ";
                        }


                        if (tbl_ld_ichbbk_list.f_o_sbbh.length > 0)
                        {
                            whereClause += " f_o_sbbh like '%" + tbl_ld_ichbbk_list.f_o_sbbh + "%' and ";
                        }


                        if (tbl_ld_ichbbk_list.f_o_jsbh.length > 0)
                        {
                            whereClause += " f_o_jsbh like '%" + tbl_ld_ichbbk_list.f_o_jsbh + "%' and ";
                        }


                        if (tbl_ld_ichbbk_list.f_o_lxth.length > 0)
                        {
                            whereClause += " f_o_lxth like '%" + tbl_ld_ichbbk_list.f_o_lxth + "%' and ";
                        }


                        if (tbl_ld_ichbbk_list.f_o_sbfz.length > 0)
                        {
                            whereClause += " f_o_sbfz like '%" + tbl_ld_ichbbk_list.f_o_sbfz + "%' and ";
                        }


                        if (tbl_ld_ichbbk_list.f_o_sbfzid.length > 0)
                        {
                            whereClause += " f_o_sbfzid like '%" + tbl_ld_ichbbk_list.f_o_sbfzid + "%' and ";
                        }


                        if (tbl_ld_ichbbk_list.f_o_sbpp.length > 0)
                        {
                            whereClause += " f_o_sbpp like '%" + tbl_ld_ichbbk_list.f_o_sbpp + "%' and ";
                        }


                        if (tbl_ld_ichbbk_list.f_o_mph.length > 0)
                        {
                            whereClause += " f_o_mph like '%" + tbl_ld_ichbbk_list.f_o_mph + "%' and ";
                        }


                        if (tbl_ld_ichbbk_list.f_o_sbdz.length > 0)
                        {
                            whereClause += " f_o_sbdz like '%" + tbl_ld_ichbbk_list.f_o_sbdz + "%' and ";
                        }


                        if (tbl_ld_ichbbk_list.f_o_khbh.length > 0)
                        {
                            whereClause += " f_o_khbh like '%" + tbl_ld_ichbbk_list.f_o_khbh + "%' and ";
                        }


                        if (tbl_ld_ichbbk_list.f_o_rs.length > 0)
                        {
                            whereClause += " f_o_rs like '%" + tbl_ld_ichbbk_list.f_o_rs + "%' and ";
                        }


                        if (tbl_ld_ichbbk_list.f_o_sbkj.length > 0)
                        {
                            whereClause += " f_o_sbkj like '%" + tbl_ld_ichbbk_list.f_o_sbkj + "%' and ";
                        }


                        if (tbl_ld_ichbbk_list.f_o_sbkjid.length > 0)
                        {
                            whereClause += " f_o_sbkjid like '%" + tbl_ld_ichbbk_list.f_o_sbkjid + "%' and ";
                        }


                        if (tbl_ld_ichbbk_list.f_o_sblx.length > 0)
                        {
                            whereClause += " f_o_sblx like '%" + tbl_ld_ichbbk_list.f_o_sblx + "%' and ";
                        }


                        if (tbl_ld_ichbbk_list.f_o_sblxid.length > 0)
                        {
                            whereClause += " f_o_sblxid like '%" + tbl_ld_ichbbk_list.f_o_sblxid + "%' and ";
                        }


                        if (tbl_ld_ichbbk_list.f_o_jllx.length > 0)
                        {
                            whereClause += " f_o_jllx like '%" + tbl_ld_ichbbk_list.f_o_jllx + "%' and ";
                        }


                        if (tbl_ld_ichbbk_list.f_o_jllxid.length > 0)
                        {
                            whereClause += " f_o_jllxid like '%" + tbl_ld_ichbbk_list.f_o_jllxid + "%' and ";
                        }


                        if (tbl_ld_ichbbk_list.f_o_cszm.length > 0)
                        {
                            whereClause += " f_o_cszm like '%" + tbl_ld_ichbbk_list.f_o_cszm + "%' and ";
                        }


                        if (tbl_ld_ichbbk_list.f_o_bqzm.length > 0)
                        {
                            whereClause += " f_o_bqzm like '%" + tbl_ld_ichbbk_list.f_o_bqzm + "%' and ";
                        }


                        if (tbl_ld_ichbbk_list.f_o_sqzm.length > 0)
                        {
                            whereClause += " f_o_sqzm like '%" + tbl_ld_ichbbk_list.f_o_sqzm + "%' and ";
                        }


                        if (tbl_ld_ichbbk_list.f_o_sqsl.length > 0)
                        {
                            whereClause += " f_o_sqsl like '%" + tbl_ld_ichbbk_list.f_o_sqsl + "%' and ";
                        }


                        if (tbl_ld_ichbbk_list.f_o_ljgl.length > 0)
                        {
                            whereClause += " f_o_ljgl like '%" + tbl_ld_ichbbk_list.f_o_ljgl + "%' and ";
                        }


                        if (tbl_ld_ichbbk_list.f_o_qsqpjsl.length > 0)
                        {
                            whereClause += " f_o_qsqpjsl like '%" + tbl_ld_ichbbk_list.f_o_qsqpjsl + "%' and ";
                        }


                        if (tbl_ld_ichbbk_list.f_o_qlqpjsl.length > 0)
                        {
                            whereClause += " f_o_qlqpjsl like '%" + tbl_ld_ichbbk_list.f_o_qlqpjsl + "%' and ";
                        }


                        if (tbl_ld_ichbbk_list.f_o_bqsl.length > 0)
                        {
                            whereClause += " f_o_bqsl like '%" + tbl_ld_ichbbk_list.f_o_bqsl + "%' and ";
                        }


                        if (tbl_ld_ichbbk_list.f_n_sbbh.length > 0)
                        {
                            whereClause += " f_n_sbbh like '%" + tbl_ld_ichbbk_list.f_n_sbbh + "%' and ";
                        }


                        if (tbl_ld_ichbbk_list.f_n_sbfzid.length > 0)
                        {
                            var elementArray = tbl_ld_ichbbk_list.f_n_sbfzid.split(',');
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
                                whereClause += "((','||f_n_sbfzid||',') like ('%,'||'" + elementArray[i] + "'||',%')) ";

                            });
                            whereClause += ') and ';
                        }


                        if (tbl_ld_ichbbk_list.f_n_sbpp.length > 0)
                        {
                            whereClause += " f_n_sbpp like '%" + tbl_ld_ichbbk_list.f_n_sbpp + "%' and ";
                        }


                        if (tbl_ld_ichbbk_list.f_n_mph.length > 0)
                        {
                            whereClause += " f_n_mph like '%" + tbl_ld_ichbbk_list.f_n_mph + "%' and ";
                        }


                        if (tbl_ld_ichbbk_list.f_n_rs.length > 0)
                        {
                            whereClause += " f_n_rs like '%" + tbl_ld_ichbbk_list.f_n_rs + "%' and ";
                        }


                        if (tbl_ld_ichbbk_list.f_n_sbkjid.length > 0)
                        {
                            var elementArray = tbl_ld_ichbbk_list.f_n_sbkjid.split(',');
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
                                whereClause += "((','||f_n_sbkjid||',') like ('%,'||'" + elementArray[i] + "'||',%')) ";

                            });
                            whereClause += ') and ';
                        }


                        if (tbl_ld_ichbbk_list.f_n_sblxid.length > 0)
                        {
                            var elementArray = tbl_ld_ichbbk_list.f_n_sblxid.split(',');
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
                                whereClause += "((','||f_n_sblxid||',') like ('%,'||'" + elementArray[i] + "'||',%')) ";

                            });
                            whereClause += ') and ';
                        }


                        if (tbl_ld_ichbbk_list.f_n_jllxid.length > 0)
                        {
                            var elementArray = tbl_ld_ichbbk_list.f_n_jllxid.split(',');
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
                                whereClause += "((','||f_n_jllxid||',') like ('%,'||'" + elementArray[i] + "'||',%')) ";

                            });
                            whereClause += ') and ';
                        }


                        if (tbl_ld_ichbbk_list.f_n_ljgl.length > 0)
                        {
                            whereClause += " f_n_ljgl like '%" + tbl_ld_ichbbk_list.f_n_ljgl + "%' and ";
                        }


                        if (tbl_ld_ichbbk_list.f_n_cqzm.length > 0)
                        {
                            whereClause += " f_n_cqzm like '%" + tbl_ld_ichbbk_list.f_n_cqzm + "%' and ";
                        }


                        if (tbl_ld_ichbbk_list.f_n_sqzm.length > 0)
                        {
                            whereClause += " f_n_sqzm like '%" + tbl_ld_ichbbk_list.f_n_sqzm + "%' and ";
                        }


                        if (tbl_ld_ichbbk_list.f_n_bqzm.length > 0)
                        {
                            whereClause += " f_n_bqzm like '%" + tbl_ld_ichbbk_list.f_n_bqzm + "%' and ";
                        }


                        if (tbl_ld_ichbbk_list.f_n_jsbh.length > 0)
                        {
                            whereClause += " f_n_jsbh like '%" + tbl_ld_ichbbk_list.f_n_jsbh + "%' and ";
                        }


                        if (tbl_ld_ichbbk_list.f_n_lxth.length > 0)
                        {
                            whereClause += " f_n_lxth like '%" + tbl_ld_ichbbk_list.f_n_lxth + "%' and ";
                        }


                        if (tbl_ld_ichbbk_list.f_n_khbh.length > 0)
                        {
                            whereClause += " f_n_khbh like '%" + tbl_ld_ichbbk_list.f_n_khbh + "%' and ";
                        }


                        if (tbl_ld_ichbbk_list.f_n_bqsl.length > 0)
                        {
                            whereClause += " f_n_bqsl like '%" + tbl_ld_ichbbk_list.f_n_bqsl + "%' and ";
                        }


                        if (tbl_ld_ichbbk_list.f_n_qsqpjsl.length > 0)
                        {
                            whereClause += " f_n_qsqpjsl like '%" + tbl_ld_ichbbk_list.f_n_qsqpjsl + "%' and ";
                        }


                        if (tbl_ld_ichbbk_list.f_n_qlqpjsl.length > 0)
                        {
                            whereClause += " f_n_qlqpjsl like '%" + tbl_ld_ichbbk_list.f_n_qlqpjsl + "%' and ";
                        }


                        if (tbl_ld_ichbbk_list.f_n_sqsl.length > 0)
                        {
                            whereClause += " f_n_sqsl like '%" + tbl_ld_ichbbk_list.f_n_sqsl + "%' and ";
                        }


                        if (tbl_ld_ichbbk_list.f_n_sbdz.length > 0)
                        {
                            whereClause += " f_n_sbdz like '%" + tbl_ld_ichbbk_list.f_n_sbdz + "%' and ";
                        }


                        if (tbl_ld_ichbbk_list.f_ztid.length > 0)
                        {
                            var elementArray = tbl_ld_ichbbk_list.f_ztid.split(',');
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


                        if (tbl_ld_ichbbk_list.f_bz.length > 0)
                        {
                            whereClause += " f_bz like '%" + tbl_ld_ichbbk_list.f_bz + "%' and ";
                        }


                        if (tbl_ld_ichbbk_list.f_xunkr.length > 0)
                        {
                            whereClause += " f_xunkr like '%" + tbl_ld_ichbbk_list.f_xunkr + "%' and ";
                        }


                        if (tbl_ld_ichbbk_list.f_xunkrid.length > 0)
                        {
                            whereClause += " f_xunkrid like '%" + tbl_ld_ichbbk_list.f_xunkrid + "%' and ";
                        }


                        if (tbl_ld_ichbbk_list.f_xunkrq.length > 0)
                        {
                            whereClause += " f_xunkrq like '%" + tbl_ld_ichbbk_list.f_xunkrq + "%' and ";
                        }


                        if (tbl_ld_ichbbk_list.f_xiekr.length > 0)
                        {
                            whereClause += " f_xiekr like '%" + tbl_ld_ichbbk_list.f_xiekr + "%' and ";
                        }


                        if (tbl_ld_ichbbk_list.f_xiekrid.length > 0)
                        {
                            whereClause += " f_xiekrid like '%" + tbl_ld_ichbbk_list.f_xiekrid + "%' and ";
                        }


                        if (tbl_ld_ichbbk_list.f_xiekrq.length > 0)
                        {
                            whereClause += " f_xiekrq like '%" + tbl_ld_ichbbk_list.f_xiekrq + "%' and ";
                        }


                        if (tbl_ld_ichbbk_list.f_khbhid.length > 0)
                        {
                            whereClause += " f_khbhid like '%" + tbl_ld_ichbbk_list.f_khbhid + "%' and ";
                        }


                        if (tbl_ld_ichbbk_list.f_yslx.length > 0)
                        {
                            whereClause += " f_yslx like '%" + tbl_ld_ichbbk_list.f_yslx + "%' and ";
                        }


                        if (tbl_ld_ichbbk_list.f_yslxid.length > 0)
                        {
                            whereClause += " f_yslxid like '%" + tbl_ld_ichbbk_list.f_yslxid + "%' and ";
                        }


                        if (tbl_ld_ichbbk_list.f_yhbh.length > 0)
                        {
                            whereClause += " f_yhbh like '%" + tbl_ld_ichbbk_list.f_yhbh + "%' and ";
                        }


                        if (tbl_ld_ichbbk_list.f_yhbhid.length > 0)
                        {
                            whereClause += " f_yhbhid like '%" + tbl_ld_ichbbk_list.f_yhbhid + "%' and ";
                        }


                        if (tbl_ld_ichbbk_list.f_khrq.length > 0)
                        {
                            whereClause += " f_khrq like '%" + tbl_ld_ichbbk_list.f_khrq + "%' and ";
                        }


                        if (tbl_ld_ichbbk_list.f_dy.length > 0)
                        {
                            whereClause += " f_dy like '%" + tbl_ld_ichbbk_list.f_dy + "%' and ";
                        }


                        if (tbl_ld_ichbbk_list.f_dyid.length > 0)
                        {
                            whereClause += " f_dyid like '%" + tbl_ld_ichbbk_list.f_dyid + "%' and ";
                        }


                        if (tbl_ld_ichbbk_list.f_sc.length > 0)
                        {
                            whereClause += " f_sc like '%" + tbl_ld_ichbbk_list.f_sc + "%' and ";
                        }


                        if (tbl_ld_ichbbk_list.f_scid.length > 0)
                        {
                            whereClause += " f_scid like '%" + tbl_ld_ichbbk_list.f_scid + "%' and ";
                        }


                        if (tbl_ld_ichbbk_list.f_qy.length > 0)
                        {
                            whereClause += " f_qy like '%" + tbl_ld_ichbbk_list.f_qy + "%' and ";
                        }


                        if (tbl_ld_ichbbk_list.f_qyid.length > 0)
                        {
                            whereClause += " f_qyid like '%" + tbl_ld_ichbbk_list.f_qyid + "%' and ";
                        }


                        if (tbl_ld_ichbbk_list.f_pq.length > 0)
                        {
                            whereClause += " f_pq like '%" + tbl_ld_ichbbk_list.f_pq + "%' and ";
                        }


                        if (tbl_ld_ichbbk_list.f_pqid.length > 0)
                        {
                            whereClause += " f_pqid like '%" + tbl_ld_ichbbk_list.f_pqid + "%' and ";
                        }

                        if (tbl_ld_ichbbk_list.f_khfzid.length > 0)
                        {
                            var elementArray = tbl_ld_ichbbk_list.f_khfzid.split(',');
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

                        if (tbl_ld_ichbbk_list.f_hbyy.length > 0)
                        {
                            var elementArray = tbl_ld_ichbbk_list.f_hbyy.split(',');
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
                                whereClause += "((','||f_hbyy||',') like ('%,'||'" + elementArray[i] + "'||',%')) ";
                            });
                            whereClause += ') and ';
                        }
                        if (tbl_ld_ichbbk_list.f_cbbhid.length > 0)
                        {
                            var elementArray = tbl_ld_ichbbk_list.f_cbbhid.split(',');
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
            $('#btn_command_clearselect_tbl_ld_ichbbk_list').addClass('hidden');
        }
        else
        {
            $('#btn_command_clearselect_tbl_ld_ichbbk_list').removeClass('hidden');

            var allcount = that._pr_gridselectids.split('^').length;
            var currentcount = $('#table_grid_tbl_ld_ichbbk_list').bootstrapTable('getSelections').length;
            $('#btn_command_clearselect_tbl_ld_ichbbk_list .cc-badge-p').html(currentcount + '/' + allcount);

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


            $('#table_grid_tbl_ld_ichbbk_list').bootstrapTable({
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
                    field: '_checkbox', checkbox: true,
                    formatter: function (value, row, index)
                    {
                        //根据gridselectids给Grid设置选中项
                        switch (that._pr_listtype)
                        {
                            //编辑模式
                            case "1":
                                {
                                    if (row.f_value10 == "1") {
                                        return {
                                            disabled: true
                                        }
                                    }
                                    if (row.f_ztid == '2' || row.f_ztid == '9')
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
                                   
                                }
                                break;
                                //制度模式
                            case "2":
                                {
                                    return {
                                        disabled: true
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
                    field: 'f_hbbh',
                    title: '换表编号',
                    "class": '',
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
                    field: 'f_o_sbbh',
                    title: '老水表编号',
                    "class": '',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                      

                        return resultStr;
                    }
                },


                {
                    field: 'f_o_jsbh',
                    title: '老水表旧水表号',
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
                    field: 'f_o_lxth',
                    title: '老水表老系统号 ',
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
                    field: 'f_o_sbfz',
                    title: '老水表水表分组',
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
                    field: 'f_o_sbfzid',
                    title: '老水表水表分组id',
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
                    field: 'f_o_sbpp',
                    title: '老水表水表品牌',
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
                    field: 'f_o_mph',
                    title: '老水表铭牌号',
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
                    field: 'f_o_sbdz',
                    title: '老水表水表地址',
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
                    field: 'f_o_khbh',
                    title: '老水表客户编号',
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
                    field: 'f_o_rs',
                    title: '老水表人数',
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
                    field: 'f_o_sbkj',
                    title: '老水表口径',
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
                    field: 'f_o_sbkjid',
                    title: '老水表口径id',
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
                    field: 'f_o_sblx',
                    title: '老水表类型',
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
                    field: 'f_o_sblxid',
                    title: '老水表类型id',
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
                    field: 'f_o_jllx',
                    title: '老水表计量类型',
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
                    field: 'f_o_jllxid',
                    title: '老水表计量类型id',
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
                    field: 'f_o_cszm',
                    title: '老水表初始止码',
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
                    field: 'f_o_bqzm',
                    title: '老水表本期止码',
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
                    field: 'f_o_sqzm',
                    title: '老水表上期止码',
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
                    field: 'f_o_sqsl',
                    title: '老水表上期水量',
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
                    field: 'f_o_ljgl',
                    title: '老水表累积购量',
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
                    field: 'f_o_qsqpjsl',
                    title: '老水表前三期平均水量',
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
                      field: 'f_hbyy',
                      title: '换表原因',
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
                    field: 'f_o_qlqpjsl',
                    title: '老水表前六期平均水量',
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
                    field: 'f_o_bqsl',
                    title: '老水表当月水量',
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
                    field: 'f_n_sbbh',
                    title: '新水表编号',
                    "class": '',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                      

                        return resultStr;
                    }
                },


                {
                    field: 'f_n_sbfz',
                    title: '新水表水表分组',
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
                    field: 'f_n_sbfzid',
                    title: '新水表水表分组id',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        return resultStr;
                    }
                },


                {
                    field: 'f_n_sbpp',
                    title: '新水表水表品牌',
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
                    field: 'f_n_mph',
                    title: '新水表铭牌号',
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
                    field: 'f_n_rs',
                    title: '新水表人数',
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
                    field: 'f_n_sbkj',
                    title: '新水表口径',
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
                    field: 'f_n_sbkjid',
                    title: '新水表口径id',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        return resultStr;
                    }
                },


                {
                    field: 'f_n_sblx',
                    title: '新水表类型',
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
                    field: 'f_n_sblxid',
                    title: '新水表类型id',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        return resultStr;
                    }
                },


                {
                    field: 'f_n_jllx',
                    title: '新水表计量类型',
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
                    field: 'f_n_jllxid',
                    title: '新水表计量类型id',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        return resultStr;
                    }
                },


                {
                    field: 'f_n_ljgl',
                    title: '新水表累积购量',
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
                    field: 'f_n_cqzm',
                    title: '新水表初期止码',
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
                    field: 'f_n_sqzm',
                    title: '新水表上期止码',
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
                    field: 'f_n_bqzm',
                    title: '新水表本期止码',
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
                    field: 'f_n_jsbh',
                    title: '新水表旧水表号',
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
                    field: 'f_n_lxth',
                    title: '新水表老系统号',
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
                    field: 'f_n_khbh',
                    title: '新系统客户编号',
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
                    field: 'f_n_bqsl',
                    title: '新水表当月水量',
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
                    field: 'f_n_qsqpjsl',
                    title: '新水表前三期平均水量',
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
                    field: 'f_n_qlqpjsl',
                    title: '新水表前六期平均水量',
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
                    field: 'f_n_sqsl',
                    title: '新水表上期水量',
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
                    field: 'f_n_sbdz',
                    title: '新水表地址',
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
                    field: 'f_xunkr',
                    title: '寻卡人',
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
                    field: 'f_xunkrid',
                    title: '寻卡人id',
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
                    field: 'f_xunkrq',
                    title: '寻卡日期',
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
                    field: 'f_xiekr',
                    title: '写卡人',
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
                    field: 'f_xiekrid',
                    title: '写卡人id',
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
                    field: 'f_xiekrq',
                    title: '操作日期',
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

                //新增
               {
                   field: 'f_o_sbds',
                   title: '老水表底数',
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
                    field: 'f_gslb',
                    title: '购水类别',
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
                    field: 'f_gslbid',
                    title: '购水类别id',
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
                    field: 'f_khfzid',
                    title: '客户分组id',
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
                     field: 'f_cbbhid',
                     title: '抄本编号id',
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
                    field: 'f_xklx',
                    title: '写卡类型',
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
                     field: 'f_xkkh',
                     title: '写卡卡号',
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
                    field: 'f_xkgscs',
                    title: '写卡购水次数',
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
                    field: 'f_xkbcgsl',
                    title: '写卡本次购水量',
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
                    field: 'f_xkms',
                    title: '写卡模式',
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
                    field: 'f_xkmsid',
                    title: '写卡模式id',
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
                    field: 'f_xkljgl',
                    title: '写卡累积购量',
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
                    field: 'f_xkjzlx',
                    title: '写卡介质类型',
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
                    field: 'f_xiekrq',
                    title: '串口号',
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
                    field: 'f_dkkh',
                    title: '读卡卡号',
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
                    field: 'f_dkbcgsl',
                    title: '读卡本次购水量',
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
                   field: 'f_dkgscs',
                   title: '读卡购水次数',
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
                    field: 'f_dkljgl',
                    title: '读卡累积购量',
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
                    field: 'f_dkjzlx',
                    title: '读卡介质类型',
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
                    field: 'f_dksbzt',
                    title: '读卡刷表状态',
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
                                    field: 'f_dksbzt',
                                    title: '老水表底数',
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
                    field: '', title: '操作',
                    align: 'center', valign: 'middle', sortable: false, clickToSelect: false,
                    formatter: function (value, row, index)
                    {
                        switch (that._pr_listtype)
                        {
                            case "1":
                                if (row.f_ztid == '2' || row.f_ztid == '9')
                                {
                                return [
                                '<a class="edit ml10" href="javascript:void(0)" title="浏览">',
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
                    var rows = $('#table_grid_tbl_ld_ichbbk_list').bootstrapTable('getSelections');
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
                    var rows = $('#table_grid_tbl_ld_ichbbk_list').bootstrapTable('getData');
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


            f_hbbh: '',


            f_sjbh: '',


            f_khbh: '',


            f_yhm: '',


            f_jfm: '',


            f_lxth: '',


            f_dh: '',


            f_dz: '',


            f_xunkr: '',


            f_xiekrid: '',


            f_yslxid: '',


            f_dy: '',


            f_qy: '',


            f_xunkrid: '',


            f_xiekrq: '',


            f_yhbh: '',


            f_dyid: '',


            f_qyid: '',


            f_xunkrq: '',


            f_khbhid: '',


            f_yhbhid: '',


            f_sc: '',


            f_pq: '',


            f_xiekr: '',


            f_yslx: '',

            f_hbyy: '08100001',

            f_khrq: '',


            f_scid: '',


            f_pqid: '',


            f_o_sbbh: '',


            f_o_sbfzid: '',


            f_o_khbh: '',


            f_o_sblx: '',


            f_o_cszm: '',


            f_o_ljgl: '',


            f_o_jsbh: '',


            f_o_sbpp: '',


            f_o_rs: '',


            f_o_sblxid: '',


            f_o_bqzm: '',


            f_o_qsqpjsl: '',


            f_o_lxth: '',


            f_o_mph: '',


            f_o_sbkj: '',


            f_o_jllx: '',


            f_o_sqzm: '',


            f_o_qlqpjsl: '',


            f_o_sbfz: '',


            f_o_sbdz: '',


            f_o_sbkjid: '',


            f_o_jllxid: '',


            f_o_sqsl: '',


            f_o_bqsl: '',


            f_n_sbbh: '',

            f_n_sbfzid: '',


            f_n_sbpp: '',


            f_n_mph: '',


            f_n_rs: '',

            f_n_sbkjid: '',


            f_n_jsbh: '',


            f_n_lxth: '',


            f_n_khbh: '',

            f_n_sblxid: '',

            f_n_jllxid: '',


            f_n_ljgl: '',


            f_n_cqzm: '',


            f_n_sqzm: '',


            f_n_bqzm: '',


            f_n_bqsl: '',


            f_n_qsqpjsl: '',


            f_n_qlqpjsl: '',


            f_n_sqsl: '',


            f_n_sbdz: '',

            f_ztid: '0',


            f_bz: '',

            //新增

            f_o_sbds:'',

        f_gslb:'',

            f_gslbid: '07990001',

        f_khfz:'',

        f_khfzid:'',

        f_cbbh:'',

        f_cbbhid:'',

        f_xklx:'',

        f_xkkh:'',

        f_xkgscs:'',

        f_xkbcgsl:'',

        f_xkms:'',

        f_xkmsid:'',

        f_xkljgl:'',

        f_xkjzlx:'',

        f_port:'',

        f_dkkh:'',

        f_dkbcgsl:'',

        f_dkgscs:'',

        f_dkljgl:'',

        f_dkjzlx:'',

        f_dksbzt:'',

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

                                                        _validateMessage = new validateMessage('btn_search_modal_search_tbl_ld_ichbbk_list');

                                                        _ladda_btn_command_new = Ladda.create('btn_command_new_tbl_ld_ichbbk_list');
                                                        _ladda_btn_command_delete = Ladda.create('btn_command_delete_tbl_ld_ichbbk_list');
                                                        _ladda_btn_command_exp = Ladda.create('btn_command_report_tbl_ld_ichbbk_list');
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
                if (_isadmin == '1')
                {
                    if (_whereClauseString != null && _whereClauseString != "")
                    {
                        _whereClauseString += " and sys_creatuserid='" + basePageObj._userInfoJson.sys_userid + "'"
                    } else
                    {
                        _whereClauseString = " sys_creatuserid='" + basePageObj._userInfoJson.sys_userid + "'"
                    }
                }
                var whereClause = _whereClauseString;
                var orderByString = ' sys_id desc';
                var columnsString = 'f_value1^f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^f_hbbh^f_sjbh^f_khbh^f_yhm^f_jfm^f_lxth^f_dh^f_dz^f_o_sbbh^f_o_jsbh^f_o_lxth^f_o_sbfz^f_o_sbfzid^f_o_sbpp^f_o_mph^f_o_sbdz^f_o_khbh^f_o_rs^f_o_sbkj^f_o_sbkjid^f_o_sblx^f_o_sblxid^f_o_jllx^f_o_jllxid^f_o_cszm^f_o_bqzm^f_o_sqzm^f_o_sqsl^f_o_ljgl^f_o_qsqpjsl^f_o_qlqpjsl^f_o_bqsl^f_n_sbbh^f_n_sbfz^f_n_sbfzid^f_n_sbpp^f_n_mph^f_n_rs^f_n_sbkj^f_n_sbkjid^f_n_sblx^f_n_sblxid^f_n_jllx^f_n_jllxid^f_n_ljgl^f_n_cqzm^f_n_sqzm^f_n_bqzm^f_n_jsbh^f_n_lxth^f_n_khbh^f_n_bqsl^f_n_qsqpjsl^f_n_qlqpjsl^f_n_sqsl^f_n_sbdz^f_zt^f_ztid^f_bz^f_xunkr^f_xunkrid^f_xunkrq^f_xiekr^f_xiekrid^f_xiekrq^f_khbhid^f_yslx^f_yslxid^f_yhbh^f_yhbhid^f_khrq^f_dy^f_dyid^f_sc^f_scid^f_qy^f_qyid^f_pq^f_pqid^f_o_sbds^f_gslb^f_gslbid^f_khfz^f_khfzid^f_cbbh^f_cbbhid^f_xklx^f_xkkh^f_xkgscs^f_xkbcgsl^f_xkms^f_xkmsid^f_xkljgl^f_xkjzlx^f_port^f_dkkh^f_dkbcgsl^f_dkgscs^f_dkljgl^f_dkjzlx^f_dksbzt^f_hbyy^sys_id';

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


                        $('#table_grid_tbl_ld_ichbbk_list').bootstrapTable("loadJson", messageJson);

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
                var currentcount = $('#table_grid_tbl_ld_ichbbk_list').bootstrapTable('getSelections').length;
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
            $('#table_grid_tbl_ld_ichbbk_list').bootstrapTable('uncheckAll');
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
            $('#btn_command_search_tbl_ld_ichbbk_list').html('简单查询');
            $('#txt_command_search_tbl_ld_ichbbk_list').removeAttr('disabled');
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
            $('#btn_command_search_tbl_ld_ichbbk_list').html('高级查询');
            $('#txt_command_search_tbl_ld_ichbbk_list').attr('disabled', 'disabled');

            $('#div_search_modal_tbl_ld_ichbbk_list').modal('show');
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
                                    $('#div_search_modal_tbl_ld_ichbbk_list').modal('hide')
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
            $('#div_search_modal_tbl_ld_ichbbk_list').modal('hide');

            that._pr_searchtype = '1';
            $('#btn_command_search_tbl_ld_ichbbk_list').html('简单查询');
            $('#txt_command_search_tbl_ld_ichbbk_list').removeAttr('disabled');
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
            $('#btn_command_search_tbl_ld_ichbbk_list').html('高级查询');
            $('#txt_command_search_tbl_ld_ichbbk_list').attr('disabled', 'disabled');

            $('#div_search_modal_tbl_ld_ichbbk_list').modal('show');
        },
        //导出
        btn_command_report_onclick: function () {
            _ladda_btn_command_exp.start();
            if (_whereClauseString == "") {
                var where = " 1=1";
            }
            else {
                var where = _whereClauseString;
            }
            var orderByString = ' sys_id desc';
            var columnsString = 'f_hbbh,f_khbh,f_yhm,f_jfm,f_dh,f_dz,f_o_sbbh,f_n_sbbh,f_zt';
            var colunmsName = '换表编号,客户编号,用户名,缴费名,电话,地址,老水表编号,新水表编号,状态';
            var data = {
                whereString: where,
                orderByString:orderByString,
                column: columnsString,
                columnname: colunmsName,
                clientInf: _clientInf
            };
            doAjaxFunction(_serviceUrl, 'Export', data, {
                success: function (message) {
                    _ladda_btn_command_exp.stop();
                    window.open(message, "_blank", "");
                },
                fail: function (message) {
                    _ladda_btn_command_exp.stop();
                    _alertMessage.show('数据导出失败', 'fail');
                    _resultMessage.show(message);
                },
                error: function (message) {
                    _ladda_btn_command_exp.stop();
                    _alertMessage.show('数据导出失败', 'fail');
                    _resultMessage.show(message);
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
    tbl_ld_ichbbk_list_Obj.init();
});



