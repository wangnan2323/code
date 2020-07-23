

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
        //Code数据存储容器
        _baseCodeHashMap = null,
        //校验结果容器
        _validateMessage = null,
        //按钮工具
        //_ladda_btn_command_new = null,
        //_ladda_btn_command_delete = null,
        //查询sql语句
        _whereClauseString = '',

        //查询后符合条件的客户数
        _gridCount = 0,
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
                        _baseCodeHashMap.put('codeservice_0524', resultArray["0524"]);
                        _baseCodeHashMap.put('codeservice_0556', resultArray['0556']);

                        var sqlStringsJson = {
                            "tbl_ld_cben": "select sys_id as id,f_cbbh as text,f_cbymc,f_cbyid,f_cbzq,f_cbmc from tbl_ld_cben where sys_delflag='0' and f_ztid='0' order by f_cbbh asc",
                            //"tbl_ldbm_dycq": "select sys_id as id, f_mc as text ,sys_orderid as nodeid from tbl_ldbm_dycq where sys_delflag='0' and f_ztid='0'and length(sys_orderid)=4 order by sys_orderid",
                            "tbl_ldbm_dycq": "select sys_id as id, f_mc as text ,sys_orderid as nodeid from tbl_ldbm_dycq where sys_delflag='0' and length(sys_orderid)=4 order by sys_orderid",
                            "tbl_ldbm_khfz": "select sys_id as id,f_fzmc as text,decode(f_ztid,'0','false','true') as disabled from tbl_ldbm_khfz where sys_delflag='0'  order by sys_id",

                        };

                        commonObj.querySqls(sqlStringsJson, {
                            success: function (resultJson, messageJson)
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
                                var qfgx = [{ id: '0', text: '' }, { id: '1', text: '>' }, { id: '2', text: '>=' }, { id: '3', text: '<' }, { id: '4', text: '<=' }, { id: '5', text: '=' }];
                                _baseCodeHashMap.put('codeservice_qfgx', qfgx);
                                _baseCodeHashMap.put('codeservice_cben', resultJson["tbl_ld_cben"]);
                                _baseCodeHashMap.put('codeservice_khfz', resultJson["tbl_ldbm_khfz"]);
                                _baseCodeHashMap.put('codeservice_0512', resultJson["tbl_ldbm_dycq"]);
                                callBackFunction.success();

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
                ////

                var codeService_0524 = _baseCodeHashMap.get('codeservice_0524');

                var codeService_0512 = _baseCodeHashMap.get('codeservice_0512');

                var codeService_0513 = _baseCodeHashMap.get('codeservice_0513');

                var codeService_0514 = _baseCodeHashMap.get('codeservice_0514');

                var codeService_0515 = _baseCodeHashMap.get('codeservice_0515');

                var codeservice_cben = _baseCodeHashMap.get('codeservice_cben');

                var codeService_0556 = _baseCodeHashMap.get('codeservice_0556');
                var codeservice_khfz = _baseCodeHashMap.get('codeservice_khfz');

                var codeservice_qfgx = _baseCodeHashMap.get('codeservice_qfgx');
                controlObj.multidropdownlistinit('search_f_cbbh_tbl_ld_khb_list', codeservice_cben);

                controlObj.singledropdownlistinit('search_f_sblxid_tbl_ld_khb_list', codeService_0524);

                controlObj.singledropdownlistinit('search_f_dy_tbl_ld_khb_list', codeService_0512, f_dy_onchange);

                controlObj.singledropdownlistinit('search_f_sc_tbl_ld_khb_list', codeService_0513, f_sc_onchange);

                controlObj.singledropdownlistinit('search_f_qy_tbl_ld_khb_list', codeService_0514, f_qy_onchange);

                controlObj.singledropdownlistinit('search_f_pq_tbl_ld_khb_list', codeService_0515, f_pq_onchange);
                controlObj.multidropdownlistinit('search_f_khfz_tbl_ld_khb_list', codeservice_khfz);
                controlObj.multidropdownlistinit('search_f_zt_tbl_ld_khb_list', codeService_0556);
                controlObj.singledropdownlistinit('search_f_qfgx_tbl_ld_khb_list', codeservice_qfgx, null);
                controlObj.singledropdownlistinit('search_f_qfgx2_tbl_ld_khb_list', codeservice_qfgx, null);
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
        *  方法:getSearchModel
        *  参数:callBackFunction
        *  获取查询model的内容保存到_pr_searchcontent
        */
        getSearchModel = function (callBackFunction)
        {

            try
            {
                //模糊查询
                that._pr_searchcontent.type1 = $("#txt_command_search_tbl_ld_khb_list").val();


                //准确查询
                var tbl_ld_khb_list = new Object();


                tbl_ld_khb_list.f_value1 = controlObj.text('search_f_value1_tbl_ld_khb_list');


                tbl_ld_khb_list.f_value2 = controlObj.text('search_f_value2_tbl_ld_khb_list');


                tbl_ld_khb_list.f_value3 = controlObj.text('search_f_value3_tbl_ld_khb_list');


                tbl_ld_khb_list.f_value4 = controlObj.text('search_f_value4_tbl_ld_khb_list');


                tbl_ld_khb_list.f_value5 = controlObj.text('search_f_value5_tbl_ld_khb_list');


                tbl_ld_khb_list.f_value6 = controlObj.text('search_f_value6_tbl_ld_khb_list');


                tbl_ld_khb_list.f_value7 = controlObj.text('search_f_value7_tbl_ld_khb_list');


                tbl_ld_khb_list.f_value8 = controlObj.text('search_f_value8_tbl_ld_khb_list');


                tbl_ld_khb_list.f_value9 = controlObj.text('search_f_value9_tbl_ld_khb_list');


                tbl_ld_khb_list.f_value10 = controlObj.text('search_f_value10_tbl_ld_khb_list');


                tbl_ld_khb_list.f_khbh = controlObj.text('search_f_khbh_tbl_ld_khb_list');


                tbl_ld_khb_list.f_ztkhh = controlObj.text('search_f_ztkhh_tbl_ld_khb_list');

                tbl_ld_khb_list.f_cbbh = controlObj.multidropdownlist('search_f_cbbh_tbl_ld_khb_list');

                tbl_ld_khb_list.f_cbbhid = controlObj.multidropdownlistid('search_f_cbbh_tbl_ld_khb_list');


                tbl_ld_khb_list.f_cbyxm = controlObj.text('search_f_cbyxm_tbl_ld_khb_list');


                tbl_ld_khb_list.f_yhbh = controlObj.text('search_f_yhbh_tbl_ld_khb_list');


                tbl_ld_khb_list.f_jfm = controlObj.text('search_f_jfm_tbl_ld_khb_list');


                tbl_ld_khb_list.f_dz = controlObj.text('search_f_dz_tbl_ld_khb_list');



                tbl_ld_khb_list.f_dh = controlObj.text('search_f_dh_tbl_ld_khb_list');

                tbl_ld_khb_list.f_dy = controlObj.singledropdownlist('search_f_dy_tbl_ld_khb_list');

                tbl_ld_khb_list.f_dyid = controlObj.singledropdownlistid('search_f_dy_tbl_ld_khb_list');

                tbl_ld_khb_list.f_sc = controlObj.singledropdownlist('search_f_sc_tbl_ld_khb_list');

                tbl_ld_khb_list.f_scid = controlObj.singledropdownlistid('search_f_sc_tbl_ld_khb_list');

                tbl_ld_khb_list.f_qy = controlObj.singledropdownlist('search_f_qy_tbl_ld_khb_list');

                tbl_ld_khb_list.f_qyid = controlObj.singledropdownlistid('search_f_qy_tbl_ld_khb_list');

                tbl_ld_khb_list.f_pq = controlObj.singledropdownlist('search_f_pq_tbl_ld_khb_list');

                tbl_ld_khb_list.f_pqid = controlObj.singledropdownlistid('search_f_pq_tbl_ld_khb_list');


                tbl_ld_khb_list.f_tsyxzh = controlObj.text('search_f_tsyxzh_tbl_ld_khb_list');


                tbl_ld_khb_list.f_hth = controlObj.text('search_f_hth_tbl_ld_khb_list');


                tbl_ld_khb_list.f_sfzh = controlObj.text('search_f_sfzh_tbl_ld_khb_list');


                tbl_ld_khb_list.f_sbbh = controlObj.text('search_f_sbbh_tbl_ld_khb_list');

                tbl_ld_khb_list.f_ljqf = controlObj.text('search_f_ljqf_tbl_ld_khb_list');

                tbl_ld_khb_list.f_tjjzpwf = controlObj.text('search_f_tjjzpwf_tbl_ld_khb_list');
                tbl_ld_khb_list.f_tjjzsf = controlObj.text('search_f_tjjzsf_tbl_ld_khb_list');
                tbl_ld_khb_list.f_tssbbhid = controlObj.text('search_f_tssbbhid_tbl_ld_khb_list');
                tbl_ld_khb_list.f_nljgl = controlObj.text('search_f_nljgl_tbl_ld_khb_list');

                tbl_ld_khb_list.f_lxth = controlObj.text('search_f_lxth_tbl_ld_khb_list');


                // tbl_ld_khb_list.f_sblxid = controlObj.text('search_f_sblxid_tbl_ld_khb_list');
                tbl_ld_khb_list.f_sblx = controlObj.singledropdownlist('search_f_sblxid_tbl_ld_khb_list');

                tbl_ld_khb_list.f_sblxid = controlObj.singledropdownlistid('search_f_sblxid_tbl_ld_khb_list');
                tbl_ld_khb_list.f_khfz = controlObj.multidropdownlist('search_f_khfz_tbl_ld_khb_list');
                tbl_ld_khb_list.f_khfzid = controlObj.multidropdownlistid('search_f_khfz_tbl_ld_khb_list');
                tbl_ld_khb_list.f_zt = controlObj.multidropdownlist('search_f_zt_tbl_ld_khb_list');
                tbl_ld_khb_list.f_ztid = controlObj.multidropdownlistid('search_f_zt_tbl_ld_khb_list');
                tbl_ld_khb_list.f_bz = controlObj.text('search_f_bz_tbl_ld_khb_list');


                tbl_ld_khb_list.f_qfgxid = controlObj.singledropdownlistid('search_f_qfgx_tbl_ld_khb_list');
                tbl_ld_khb_list.f_qfje = controlObj.text('search_f_qfje_tbl_ld_khb_list');
                tbl_ld_khb_list.f_qfgx2id = controlObj.singledropdownlistid('search_f_qfgx2_tbl_ld_khb_list');
                tbl_ld_khb_list.f_qfje2 = controlObj.text('search_f_qfje2_tbl_ld_khb_list');
                that._pr_searchcontent.type2 = tbl_ld_khb_list;




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
                var tbl_ld_khb_list = that._pr_searchcontent.type2;
                var errorMessageHansMap = new hashMap();
                var errorMessagePlacementHansMap = new hashMap();




                if (tbl_ld_khb_list.f_value1.length > 200)
                {
                    errorMessageHansMap.put('search_f_value1_tbl_ld_khb_list', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_khb_list.f_value2.length > 200)
                {
                    errorMessageHansMap.put('search_f_value2_tbl_ld_khb_list', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_khb_list.f_value3.length > 200)
                {
                    errorMessageHansMap.put('search_f_value3_tbl_ld_khb_list', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_khb_list.f_value4.length > 200)
                {
                    errorMessageHansMap.put('search_f_value4_tbl_ld_khb_list', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_khb_list.f_value5.length > 200)
                {
                    errorMessageHansMap.put('search_f_value5_tbl_ld_khb_list', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_khb_list.f_value6.length > 200)
                {
                    errorMessageHansMap.put('search_f_value6_tbl_ld_khb_list', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_khb_list.f_value7.length > 200)
                {
                    errorMessageHansMap.put('search_f_value7_tbl_ld_khb_list', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_khb_list.f_value8.length > 200)
                {
                    errorMessageHansMap.put('search_f_value8_tbl_ld_khb_list', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_khb_list.f_value9.length > 200)
                {
                    errorMessageHansMap.put('search_f_value9_tbl_ld_khb_list', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_khb_list.f_value10.length > 200)
                {
                    errorMessageHansMap.put('search_f_value10_tbl_ld_khb_list', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_khb_list.f_khbh.length > 200)
                {
                    errorMessageHansMap.put('search_f_khbh_tbl_ld_khb_list', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_khb_list.f_ztkhh.length > 200)
                {
                    errorMessageHansMap.put('search_f_ztkhh_tbl_ld_khb_list', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_khb_list.f_cbbhid.length > 200)
                {
                    errorMessageHansMap.put('search_f_cbbh_tbl_ld_khb_list', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_khb_list.f_cbyxm.length > 200)
                {
                    errorMessageHansMap.put('search_f_cbyxm_tbl_ld_khb_list', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_khb_list.f_yhbh.length > 200)
                {
                    errorMessageHansMap.put('search_f_yhbh_tbl_ld_khb_list', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_khb_list.f_jfm.length > 200)
                {
                    errorMessageHansMap.put('search_f_jfm_tbl_ld_khb_list', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_khb_list.f_dz.length > 200)
                {
                    errorMessageHansMap.put('search_f_dz_tbl_ld_khb_list', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_khb_list.f_dh.length > 200)
                {
                    errorMessageHansMap.put('search_f_dh_tbl_ld_khb_list', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_khb_list.f_dy.length > 200)
                {
                    errorMessageHansMap.put('search_f_dy_tbl_ld_khb_list', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_khb_list.f_dyid.length > 200)
                {
                    errorMessageHansMap.put('search_f_dyid_tbl_ld_khb_list', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_khb_list.f_sc.length > 200)
                {
                    errorMessageHansMap.put('search_f_sc_tbl_ld_khb_list', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_khb_list.f_scid.length > 200)
                {
                    errorMessageHansMap.put('search_f_scid_tbl_ld_khb_list', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_khb_list.f_qy.length > 200)
                {
                    errorMessageHansMap.put('search_f_qy_tbl_ld_khb_list', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_khb_list.f_qyid.length > 200)
                {
                    errorMessageHansMap.put('search_f_qyid_tbl_ld_khb_list', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_khb_list.f_pq.length > 200)
                {
                    errorMessageHansMap.put('search_f_pq_tbl_ld_khb_list', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_khb_list.f_pqid.length > 200)
                {
                    errorMessageHansMap.put('search_f_pqid_tbl_ld_khb_list', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_khb_list.f_tsyxzh.length > 200)
                {
                    errorMessageHansMap.put('search_f_tsyxzh_tbl_ld_khb_list', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_khb_list.f_hth.length > 200)
                {
                    errorMessageHansMap.put('search_f_hth_tbl_ld_khb_list', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_khb_list.f_sfzh.length > 200)
                {
                    errorMessageHansMap.put('search_f_sfzh_tbl_ld_khb_list', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_khb_list.f_sbbh.length > 200)
                {
                    errorMessageHansMap.put('search_f_sbbh_tbl_ld_khb_list', '长度不能超过<a style="color:red">200</a>个字');
                }

                if (tbl_ld_khb_list.f_ljqf.length > 200)
                {
                    errorMessageHansMap.put('search_f_ljqf_tbl_ld_khb_list', '长度不能超过<a style="color:red">200</a>个字');
                }

                if (tbl_ld_khb_list.f_tjjzpwf.length > 200)
                {
                    errorMessageHansMap.put('search_f_tjjzpwf_tbl_ld_khb_list', '长度不能超过<a style="color:red">200</a>个字');
                }
                if (tbl_ld_khb_list.f_tssbbhid.length > 200)
                {
                    errorMessageHansMap.put('search_f_tssbbhid_tbl_ld_khb_list', '长度不能超过<a style="color:red">200</a>个字');
                }
                if (tbl_ld_khb_list.f_tjjzsf.length > 200)
                {
                    errorMessageHansMap.put('search_f_tjjzsf_tbl_ld_khb_list', '长度不能超过<a style="color:red">200</a>个字');
                }
                if (tbl_ld_khb_list.f_nljgl.length > 200)
                {
                    errorMessageHansMap.put('search_f_nljgl_tbl_ld_khb_list', '长度不能超过<a style="color:red">200</a>个字');
                }


                if (tbl_ld_khb_list.f_lxth.length > 200)
                {
                    errorMessageHansMap.put('search_f_lxth_tbl_ld_khb_list', '长度不能超过<a style="color:red">200</a>个字');
                }




                if (tbl_ld_khb_list.f_sblxid.length > 200)
                {
                    errorMessageHansMap.put('search_f_sblxid_tbl_ld_khb_list', '长度不能超过<a style="color:red">200</a>个字');
                }

                if (tbl_ld_khb_list.f_bz.length > 200)
                {
                    errorMessageHansMap.put('search_f_bz_tbl_ld_khb_list', '长度不能超过<a style="color:red">200</a>个字');
                }

                if ((tbl_ld_khb_list.f_qfgxid.length != 0 && tbl_ld_khb_list.f_qfgxid != '0') || tbl_ld_khb_list.f_qfje.length != 0)
                {
                    if (tbl_ld_khb_list.f_qfgxid.length != 0 && tbl_ld_khb_list.f_qfgxid != '0' && tbl_ld_khb_list.f_qfje.length != 0)
                    {
                        if (!/^[0-9]+\.?[0-9]*$/.test(tbl_ld_kh_search_part.f_qfje))
                        {
                            errorMessageHansMap.put('search_f_qfje_tbl_ld_khb_list', '必须填写数字');
                        }
                    }
                    else
                    {
                        errorMessageHansMap.put('search_f_qfgx_tbl_ld_khb_list', '必须同时填写');
                        errorMessageHansMap.put('search_f_qfje_tbl_ld_khb_list', '必须同时填写');
                    }
                }

                if ((tbl_ld_khb_list.f_qfgx2id.length != 0 && tbl_ld_khb_list.f_qfgx2id != '0') || tbl_ld_khb_list.f_qfje2.length != 0)
                {
                    if (tbl_ld_khb_list.f_qfgx2id.length != 0 && tbl_ld_khb_list.f_qfgx2id != '0' && tbl_ld_khb_list.f_qfje2.length != 0)
                    {
                        if (!/^[0-9]+\.?[0-9]*$/.test(tbl_ld_kh_search_part.f_qfje2))
                        {
                            errorMessageHansMap.put('search_f_qfje_tbl_ld_khb_list', '必须填写数字');
                        }
                    }
                    else
                    {
                        errorMessageHansMap.put('search_f_qfgx2_tbl_ld_khb_list', '必须同时填写');
                        errorMessageHansMap.put('search_f_qfje2_tbl_ld_khb_list', '必须同时填写');
                    }
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

            if ($('#nav_a').hasClass('active') == true)
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

                                //whereClause += " f_ztkhh like '%" + vv[i] + "%' or ";

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

                                //whereClause += " f_ljqf like '%" + vv[i] + "%' or ";
                                //whereClause += " f_tjjzpwf like '%" + vv[i] + "%' or ";
                                //whereClause += " f_tjjzsf like '%" + vv[i] + "%' or ";
                                //whereClause += " f_tssbbhid like '%" + vv[i] + "%' or ";
                                //whereClause += " f_nljgl like '%" + vv[i] + "%' or ";
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

                    if (tbl_ld_khb_list.f_ljqf.length > 0)
                    {
                        whereClause += " f_ljqf like '%" + tbl_ld_khb_list.f_ljqf + "%' and ";
                    }

                    if (tbl_ld_khb_list.f_tjjzpwf.length > 0)
                    {
                        whereClause += " f_tjjzpwf like '%" + tbl_ld_khb_list.f_tjjzpwf + "%' and ";
                    }
                    if (tbl_ld_khb_list.f_tjjzsf.length > 0)
                    {
                        whereClause += " f_tjjzsf like '%" + tbl_ld_khb_list.f_tjjzsf + "%' and ";
                    }
                    if (tbl_ld_khb_list.f_tssbbhid.length > 0)
                    {
                        whereClause += " f_tssbbhid like '%" + tbl_ld_khb_list.f_tssbbhid + "%' and ";
                    }
                    if (tbl_ld_khb_list.f_nljgl.length > 0)
                    {
                        whereClause += " f_nljgl like '%" + tbl_ld_khb_list.f_nljgl + "%' and ";
                    }
                    if (tbl_ld_khb_list.f_lxth.length > 0)
                    {
                        whereClause += " f_lxth like '%" + tbl_ld_khb_list.f_lxth + "%' and ";
                    }


                    if (tbl_ld_khb_list.f_sblxid.length > 0)
                    {
                        var elementArray = tbl_ld_khb_list.f_sblxid.split(',');
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

                    if (tbl_ld_khb_list.f_khfzid.length > 0)
                    {
                        var elementArray = tbl_ld_khb_list.f_khfzid.split(',');
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
                    if (tbl_ld_khb_list.f_ztid.length > 0)
                    {
                        var elementArray = tbl_ld_khb_list.f_ztid.split(',');
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
                    if (tbl_ld_khb_list.f_bz.length > 0)
                    {
                        whereClause += " f_bz like '%" + tbl_ld_khb_list.f_bz + "%' and ";
                    }



                    if (tbl_ld_khb_list.f_qfgxid.length > 0 && tbl_ld_khb_list.f_qfgxid != '0' && tbl_ld_khb_list.f_qfje.length > 0)
                    {
                        whereClause += " f_ljqf ";

                        switch (tbl_ld_khb_list.f_qfgxid)
                        {
                            case "0":
                                whereClause += " ";
                                break;
                            case "1":
                                whereClause += ">";
                                break;
                            case "2":
                                whereClause += ">=";
                                break;
                            case "3":
                                whereClause += "<";
                                break;
                            case "4":
                                whereClause += "<=";
                                break;
                            case "5":
                                whereClause += "=";
                                break;
                        }

                        whereClause += " " + tbl_ld_khb_list.f_qfje + " ";
                        whereClause += " and ";
                    }



                    if (tbl_ld_khb_list.f_qfgx2id.length > 0 && tbl_ld_khb_list.f_qfgx2id != '0' && tbl_ld_khb_list.f_qfje2.length > 0)
                    {
                        whereClause += " f_ljqf ";

                        switch (tbl_ld_khb_list.f_qfgx2id)
                        {
                            case "0":
                                whereClause += " ";
                                break;
                            case "1":
                                whereClause += ">";
                                break;
                            case "2":
                                whereClause += ">=";
                                break;
                            case "3":
                                whereClause += "<";
                                break;
                            case "4":
                                whereClause += "<=";
                                break;
                            case "5":
                                whereClause += "=";
                                break;
                        }

                        whereClause += " " + tbl_ld_khb_list.f_qfje2 + " ";
                        whereClause += " and ";
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
                var gridHeight = 400;
                //if ($(window).width() < basePageObj._limSrceenWidth)
                //{
                //    gridHeight = $(window).height() - 320;
                //    if (gridHeight < 950)
                //    {
                //        gridHeight = 950;
                //    }
                //}
                //else
                //{
                //    gridHeight = $(window).height() - 240;
                //}

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
                    singleSelect: false,
                    idField: 'sys_id',
                    sidePagination: 'webserver',
                    columns: [
                        {
                            field: '_checkbox', checkbox: true,
                            formatter: function (value, row, index)
                            {
                                switch (row.f_ztid)
                                {
                                    case '0':
                                    case '2':
                                    case '4':
                                        return {
                                            disabled: false
                                        }
                                        break;
                                    case '1':
                                    case '9':
                                    default:
                                        return {
                                            disabled: true
                                        }
                                        break;
                                }

                                if (index == 0)
                                {
                                    that._pr_gridselectids = row.sys_id;
                                    //alert(that._pr_gridselectids);
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
                            field: 'f_dz',
                            title: '地址',
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
                            field: 'f_sbdz',
                            title: '水表地址',
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
                            "class": '',
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
                            align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                            formatter: function (value, row, index)
                            {

                                var resultStr = value;

                                //if (resultStr.length > 10)
                                //{
                                //    resultStr = resultStr.substr(0, 10) + '...';
                                //}

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
                            field: 'f_pq',
                            title: '片区',
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
                            field: 'f_tjjzpwf',
                            title: "调价结转污水处理费",
                            "class": 'hidden',
                            align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                            formatter: function (value, row, index)
                            {
                                var resultStr = value;

                                //if (resultStr.length > 10)
                                //{
                                //    resultStr = resultStr.substr(0, 10) + '...';
                                //}


                                return resultStr;
                            }
                        },
                        {
                            field: 'f_tjjzsf',
                            title: "调价结转水费",
                            "class": 'hidden',
                            align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                            formatter: function (value, row, index)
                            {
                                var resultStr = value;
                                //if (resultStr.length > 10)
                                //{
                                //    resultStr = resultStr.substr(0, 10) + '...';
                                //}
                                return resultStr;
                            }
                        },
                        {
                            field: 'f_tssbbhid',
                            title: "停水水表编号id",
                            "class": 'hidden',
                            align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                            formatter: function (value, row, index)
                            {
                                var resultStr = value;
                                //if (resultStr.length > 10)
                                //{
                                //    resultStr = resultStr.substr(0, 10) + '...';
                                //}
                                return resultStr;
                            }
                        },
                        {
                            field: 'f_nljgl',
                            title: "年用水量",
                            "class": '',
                            align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                            formatter: function (value, row, index)
                            {
                                var resultStr = value;
                                //if (resultStr.length > 10)
                                //{
                                //    resultStr = resultStr.substr(0, 10) + '...';
                                //}
                                return resultStr;
                            }
                        },
                        {
                            field: 'f_ljqf',
                            title: "累计欠费",
                            "class": '',
                            align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                            formatter: function (value, row, index)
                            {
                                var resultStr = value;
                                //if (resultStr.length > 10)
                                //{
                                //    resultStr = resultStr.substr(0, 10) + '...';
                                //}


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


                f_khbh: '',


                f_ztkhh: '',

                f_khfzid: '',


                f_ycje: '',

                f_yslxid: '',


                f_tbbh: '',

                f_sfjlbjf: 'true',

                f_ztid: '',


                f_bz: '',

                f_cbbhid: '',


                f_cbxh: '',


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

                f_ljqf: '0',

                f_tjjzpwf: '0',
                f_tjjzsf: '0',
                f_tssbbhid: '',
                f_nljgl: '0',

                f_sbbhid: '',


                f_bqzm: '',


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
            ////
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
            // //
            if (e.added != undefined)
            {
                var nodeid = e.added.id;
                getArea(nodeid, {
                    success: function (jsonArray)
                    {

                        controlObj.singledropdownlistinit('search_f_sc_tbl_ld_khb_list', jsonArray, f_sc_onchange);
                        controlObj.singledropdownlistid('search_f_sc_tbl_ld_khb_list', '-1');
                        // controlObj.singledropdownlist('search_f_sc_tbl_ld_khb_list', '');


                        if (callbackfunction != undefined)
                        {
                            callbackfunction.success();
                        }
                        else
                        {
                            controlObj.singledropdownlistinit('search_f_qy_tbl_ld_khb_list', _baseCodeHashMap.get('codeservice_0514'), f_qy_onchange);
                            controlObj.singledropdownlistid('search_f_qy_tbl_ld_khb_list', '-1');
                            // controlObj.singledropdownlist('search_f_qy_tbl_ld_khb_list', '');

                            controlObj.singledropdownlistinit('search_f_pq_tbl_ld_khb_list', _baseCodeHashMap.get('codeservice_0515'), f_pq_onchange);
                            controlObj.singledropdownlistid('search_f_pq_tbl_ld_khb_list', '-1');
                            //controlObj.singledropdownlist('search_f_pq_tbl_ld_khb_list', '');

                        }
                    }
                })
            }
            else
            {

                controlObj.singledropdownlistinit('search_f_sc_tbl_ld_khb_list', _baseCodeHashMap.get('codeservice_0513'), f_sc_onchange);
                controlObj.singledropdownlistid('search_f_sc_tbl_ld_khb_list', '-1');
                //controlObj.singledropdownlist('search_f_sc_tbl_ld_khb_list', '');


                controlObj.singledropdownlistinit('search_f_qy_tbl_ld_khb_list', _baseCodeHashMap.get('codeservice_0514'), f_qy_onchange);
                controlObj.singledropdownlistid('search_f_qy_tbl_ld_khb_list', '-1');
                // controlObj.singledropdownlist('search_f_qy_tbl_ld_khb_list', '');

                controlObj.singledropdownlistinit('search_f_pq_tbl_ld_khb_list', _baseCodeHashMap.get('codeservice_0515'), f_pq_onchange);
                controlObj.singledropdownlistid('search_f_pq_tbl_ld_khb_list', '-1');
                // controlObj.singledropdownlist('search_f_pq_tbl_ld_khb_list', '');
            }


        },

        //水厂onchange事件
        f_sc_onchange = function (e, callbackfunction)
        {
            // //
            if (e.added != undefined)
            {
                var nodeid = e.added.id;
                getArea(nodeid, {
                    success: function (jsonArray)
                    {

                        controlObj.singledropdownlistinit('search_f_qy_tbl_ld_khb_list', jsonArray, f_qy_onchange);
                        controlObj.singledropdownlistid('search_f_qy_tbl_ld_khb_list', '-1');
                        //controlObj.singledropdownlist('search_f_qy_tbl_ld_khb_list', '');

                        if (callbackfunction != undefined)
                        {
                            callbackfunction.success();
                        }
                        else
                        {


                            controlObj.singledropdownlistinit('search_f_pq_tbl_ld_khb_list', _baseCodeHashMap.get('codeservice_0515'), f_pq_onchange);
                            controlObj.singledropdownlistid('search_f_pq_tbl_ld_khb_list', '-1');
                            //controlObj.singledropdownlist('search_f_pq_tbl_ld_khb_list', '');
                        }
                    }
                })
            }
            else
            {

                controlObj.singledropdownlistinit('search_f_qy_tbl_ld_khb_list', _baseCodeHashMap.get('codeservice_0514'), f_qy_onchange);
                controlObj.singledropdownlistid('search_f_qy_tbl_ld_khb_list', '-1');
                //  controlObj.singledropdownlist('search_f_qy_tbl_ld_khb_list', '');

                controlObj.singledropdownlistinit('search_f_pq_tbl_ld_khb_list', _baseCodeHashMap.get('codeservice_0515'), f_pq_onchange);
                controlObj.singledropdownlistid('search_f_pq_tbl_ld_khb_list', '-1');
                // controlObj.singledropdownlist('search_f_pq_tbl_ld_khb_list', '');
            }


        },

        //区域onchange事件
        f_qy_onchange = function (e, callbackfunction)
        {
            // //
            if (e.added != undefined)
            {
                var nodeid = e.added.id;
                getArea(nodeid, {
                    success: function (jsonArray)
                    {


                        controlObj.singledropdownlistinit('search_f_pq_tbl_ld_khb_list', jsonArray, f_pq_onchange);
                        controlObj.singledropdownlistid('search_f_pq_tbl_ld_khb_list', '-1');
                        //ontrolObj.singledropdownlist('search_f_pq_tbl_ld_khb_list', '');

                        if (callbackfunction != undefined)
                        {
                            callbackfunction.success();
                        }
                    }
                })
            }
            else
            {
                controlObj.singledropdownlistinit('search_f_pq_tbl_ld_khb_list', _baseCodeHashMap.get('codeservice_0515'), f_pq_onchange);
                controlObj.singledropdownlistid('search_f_pq_tbl_ld_khb_list', '-1');
                //controlObj.singledropdownlist('search_f_pq_tbl_ld_khb_list', '');
            }


        },

        //片区onchange事件
        f_pq_onchange = function (e)
        {
            var controlid = e.target.id;
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

        _pr_khbh: '',
        //主键
        _pr_sys_id: '',
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
                //  //
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

                                        _validateMessage = new validateMessage('btn_search_modal_search_tbl_ld_khb_list');

                                        //_ladda_btn_command_new = Ladda.create('btn_command_new_tbl_ld_khb_list');
                                        //_ladda_btn_command_delete = Ladda.create('btn_command_delete_tbl_ld_khb_list');
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

                        //初始化search
                        initSearchBaseCode({
                            success: function ()
                            {


                                initSearchControl({
                                    success: function ()
                                    {

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
        openSearch: function (callBackFunction)
        {
            controlObj.text('txt_command_search_tbl_ld_khb_list', that._pr_khbh);
            ;
            if (that._pr_khbh != '')
            {
                that.btn_command_search_onclick({
                    success: function ()
                    {
                    },
                    fail: function (message)
                    {
                        _alertMessage.show('获取数据失败', 'fail');
                        _resultMessage.show(message);
                    }
                });
            }
            //查询
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
                var whereClause = _whereClauseString;


                var orderByString = ' sys_id desc';
                var columnsString = 'f_value1^f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^f_khbh^f_ztkhh^f_khfz^f_khfzid^f_ycje^f_yslx^f_yslxid^f_tbbh^f_sfjlbjf^f_zt^f_ztid^f_bz^f_cbbh^f_cbbhid^f_cbxh^f_cbyxm^f_cbyid^f_cbzq^f_cbmc^f_yhbh^f_yhbhid^f_jfm^f_yhfz^f_yhfzid^f_dz^f_sbdz^f_dh^f_dy^f_dyid^f_sc^f_scid^f_qy^f_qyid^f_pq^f_pqid^f_tsyxzh^f_hth^f_sfzh^f_khrq^f_sbbh^f_sbbhid^f_ljqf^f_tjjzpwf^f_tjjzsf^f_tssbbhid^f_nljgl^f_bqzm^f_sqzm^f_bqsl^f_sqsl^f_qsqpjsl^f_qlqpjsl^f_ljgl^f_lxth^f_sblx^f_sblxid^f_jllx^f_jllxid^f_tssbbh^f_yhm^sys_id';

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

                        
                        _gridCount = messageJson.total;
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

        /* 
        *  
        *  方法:btn_command_search_onclick
        *  参数:
        *  根据查询条件的录入情况构造_whereClauseString,清空分页情况和选中情况，重新绑定。
        *  主要是响应“查询”按钮的事件
        */
        btn_command_search_onclick: function ()
        {

            try
            {

                debugger
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


            }
            catch (ex)
            {
                _alertMessage.show('查询失败', 'fail');
                _resultMessage.show(ex.message);
            }
        },

        /* 
*  
*  方法:btn_command_send_onclick
*  参数:
*  处理短信发送事件
*  主要是响应“发送短信”按钮的事件
*/
        btn_command_send_onclick: function ()
        {
            setCookieMinutes("sendmessage" + that._pr_sys_id, "0", 10);
            try
            {
                if (_gridCount != null && _gridCount != "" && _gridCount != 0 && _gridCount != '0')
                {

                    getSearchModel({
                        success: function ()
                        {
                            creatWhereClause({
                                success: function ()
                                {
                                    //整理文字查询条件
                                    var cxtj = '查询条件:[';
                                    if ($('#nav_a').hasClass('active') == true)
                                    {

                                        if (that._pr_searchcontent.type1 != undefined)
                                        {
                                            cxtj += ' 简单查询:' + that._pr_searchcontent.type1;

                                        }
                                    }
                                    else
                                    {

                                        if (that._pr_searchcontent.type2 != undefined)
                                        {

                                            var tbl_ld_khb_list = that._pr_searchcontent.type2;

                                            if (tbl_ld_khb_list.f_khbh.length > 0)
                                            {
                                                cxtj += " 客户编号:" + tbl_ld_khb_list.f_khbh;
                                            }


                                            if (tbl_ld_khb_list.f_ztkhh.length > 0)
                                            {
                                                cxtj += " 旧客户号:" + tbl_ld_khb_list.f_ztkhh;
                                            }


                                            if (tbl_ld_khb_list.f_cbbhid.length > 0)
                                            {
                                                cxtj += " 抄本编号:" + tbl_ld_khb_list.f_cbbh;

                                            }


                                            if (tbl_ld_khb_list.f_cbyxm.length > 0)
                                            {
                                                cxtj += " 抄表员姓名:" + tbl_ld_khb_list.f_cbyxm;
                                            }


                                            if (tbl_ld_khb_list.f_yhbh.length > 0)
                                            {
                                                cxtj += " 用户编号:" + tbl_ld_khb_list.f_yhbh;
                                            }


                                            if (tbl_ld_khb_list.f_jfm.length > 0)
                                            {
                                                cxtj += " 缴费名:" + tbl_ld_khb_list.f_jfm;

                                            }


                                            if (tbl_ld_khb_list.f_dz.length > 0)
                                            {
                                                cxtj += " 地址:" + tbl_ld_khb_list.f_dz;
                                            }



                                            if (tbl_ld_khb_list.f_dh.length > 0)
                                            {
                                                cxtj += " 电话:" + tbl_ld_khb_list.f_dh;
                                            }





                                            if (tbl_ld_khb_list.f_dyid.length > 0)
                                            {
                                                cxtj += " 地域:" + tbl_ld_khb_list.f_dy;
                                            }





                                            if (tbl_ld_khb_list.f_scid.length > 0)
                                            {
                                                cxtj += " 水厂:" + tbl_ld_khb_list.f_sc;

                                            }





                                            if (tbl_ld_khb_list.f_qyid.length > 0)
                                            {
                                                cxtj += " 区域:" + tbl_ld_khb_list.f_qy;
                                            }





                                            if (tbl_ld_khb_list.f_pqid.length > 0)
                                            {
                                                cxtj += " 片区:" + tbl_ld_khb_list.f_pq;

                                            }


                                            if (tbl_ld_khb_list.f_tsyxzh.length > 0)
                                            {
                                                cxtj += " 托收银行账号:" + tbl_ld_khb_list.f_tsyxzh;
                                            }


                                            if (tbl_ld_khb_list.f_hth.length > 0)
                                            {
                                                cxtj += " 合同号:" + tbl_ld_khb_list.f_hth;

                                            }


                                            if (tbl_ld_khb_list.f_sfzh.length > 0)
                                            {
                                                cxtj += " 身份证号:" + tbl_ld_khb_list.f_sfzh;
                                            }


                                            if (tbl_ld_khb_list.f_sbbh.length > 0)
                                            {
                                                cxtj += " 水表编号:" + tbl_ld_khb_list.f_sbbh;
                                            }



                                            if (tbl_ld_khb_list.f_lxth.length > 0)
                                            {
                                                cxtj += " 老系统号:" + tbl_ld_khb_list.f_lxth;
                                            }


                                            if (tbl_ld_khb_list.f_sblxid.length > 0)
                                            {
                                                cxtj += " 水表类型:" + tbl_ld_khb_list.f_sblx;

                                            }

                                            if (tbl_ld_khb_list.f_khfzid.length > 0)
                                            {
                                                cxtj += " 客户分组:" + tbl_ld_khb_list.f_khfz;

                                            }
                                            if (tbl_ld_khb_list.f_ztid.length > 0)
                                            {
                                                cxtj += " 状态:" + tbl_ld_khb_list.f_zt;

                                            }
                                            if (tbl_ld_khb_list.f_bz.length > 0)
                                            {
                                                cxtj += " 备注:" + tbl_ld_khb_list.f_bz;

                                            }



                                            if (tbl_ld_khb_list.f_qfgxid.length > 0 && tbl_ld_khb_list.f_qfgxid != '0' && tbl_ld_khb_list.f_qfje.length > 0)
                                            {
                                                cxtj += " 累计欠费:";

                                                switch (tbl_ld_khb_list.f_qfgxid)
                                                {
                                                    case "0":
                                                        cxtj += " ";
                                                        break;
                                                    case "1":
                                                        cxtj += "大于";
                                                        break;
                                                    case "2":
                                                        cxtj += "大于等于";
                                                        break;
                                                    case "3":
                                                        cxtj += "小于";
                                                        break;
                                                    case "4":
                                                        cxtj += "小于等于";
                                                        break;
                                                    case "5":
                                                        cxtj += "等于";
                                                        break;
                                                }

                                                cxtj += tbl_ld_khb_list.f_qfje;
                                            }


                                        }
                                    }
                                    cxtj = cxtj.trim() + " ]";
                                    debugger
                                    cxtj += " 查询结果:" + _gridCount + "人";
                                    var needsend = 0;
                                    if (that._pr_gridselectids != null && that._pr_gridselectids != "")
                                    {
                                        var gridselected = that._pr_gridselectids.split('^');
                                        cxtj += " 选中:" + gridselected.length + "人";
                                        needsend = gridselected.length;
                                    }
                                    else
                                    {
                                        cxtj += " 未勾选";
                                        needsend = _gridCount;
                                    }
                                    var fsgy = cxtj.trim();


                                    //发送短信                                      
                                    var whereClause = _whereClauseString;
                                    
                                    that.send('', whereClause, that._pr_gridselectids, {
                                        success: function ()
                                        {
                                            //保存发送概要等信息
                                            tbl_ld_dxcs_detail_Obj.startSend(fsgy);
                                            $('#btn_command_send_tbl_ld_khb_list').addClass('hidden');
                                            $('#btn_send_tbl_ld_khb_list').addClass('hidden');
                                            $('#btn_search_tbl_ld_khb_list').addClass('hidden');
                                            $('#btn_command_search_tbl_ld_khb_list').addClass('hidden');
                                            var flag = setInterval(function ()
                                            {
                                                
                                                that.send('1', whereClause, that._pr_gridselectids, {
                                                    success: function ()
                                                    {
                                                        var sendmessage = getCookie("sendmessage" + that._pr_sys_id);
                                                        $("#label_process1_tbl_ld_khb_list").html("需发" + needsend+"条,已发送" + sendmessage + "条");
                                                        $("#label_process2_tbl_ld_khb_list").html("需发" + needsend + "条,已发送" + sendmessage + "条");
                                                        if (sendmessage == needsend.toString())
                                                        {
                                                            $("#label_process1_tbl_ld_khb_list").html("发送完成");
                                                            $("#label_process2_tbl_ld_khb_list").html("发送完成");

                                                            _alertMessage.show('短信发送成功', 'success', 2000);                                                           

                                                            tbl_ld_dxcs_detail_Obj.endSend();
                                                            clearInterval(flag);
                                                        }
                                                    }
                                                });
                                                

                                            }, 1000);
                                        }

                                    });

                                    



                                    


                                }

                            });




                        },
                        fail: function (message)
                        {
                            _alertMessage.show('获取数据失败', 'fail');
                            _resultMessage.show(message);
                        }
                    });
                }
                else
                {
                    _alertMessage.show('短信发送失败，请先进行查询定位用户', 'fail');
                }



            }
            catch (ex)
            {
                _alertMessage.show('短信发送失败', 'fail');
                _resultMessage.show(ex.message);
            }
        },
        //发送短信事件 同时监听后台发送进度
        send: function (value, whereClause, gridselectids ,callBackFunction) 
        {            
            if (value == '')
            {
                var data = {
                    time: '0',
                    wherestring: whereClause,
                    gridselectids: gridselectids,
                    sysid: that._pr_sys_id
                };

                doAjaxFunction(_serviceUrl, 'SendMessage', data,
                    {
                        success: function ()
                        {
                            that.send('1', whereClause, gridselectids , {
                                success: function ()
                                {
                                    callBackFunction.success();
                                }
                            });
                        },
                        fail: function (message)
                        {
                            _alertMessage.show('发送短信程序正在执行中,请稍候重试', 'fail');
                        }
                    });
                
            }
            else
            {
                var data = {
                    time: '1',
                    wherestring: whereClause,
                    gridselectids: gridselectids,
                    sysid: that._pr_sys_id
                };

                doAjaxFunction(_serviceUrl, 'SendMessage', data,
                    {
                        success: function ()
                        {
                            callBackFunction.success();
                        },
                        fail: function (message)
                        {
                            _alertMessage.show('发送短信程序正在执行中,请稍候重试', 'fail');
                        }
                    });               
            }

        },
        btn_command_nav_onclick: function (para)
        {

            if (para == 'a')
            {
                if ($('#nav_a').hasClass('active') == true)
                {

                }
                else
                {
                    $('#nav_b').removeClass('active');
                    $('#nav_a').addClass('active');
                    $('#div_a').removeClass('hidden');
                    $('#div_b').addClass('hidden')
                }
            }
            else
            {
                if ($('#nav_b').hasClass('active') == true)
                {

                }
                else
                {

                    $('#nav_a').removeClass('active');
                    $('#nav_b').addClass('active');
                    $('#div_b').removeClass('hidden');
                    $('#div_a').addClass('hidden')
                }
            }


        }



    };
    return that;
})();





