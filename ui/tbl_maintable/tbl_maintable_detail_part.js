
//??!!??
//var _pr_fromurl = '';
//var _pr_fromurlparam = '';
//var _pr_appcode = '';
var _clientInf = '{userid:"",appcode:"54",appname:"",userip:"",usermac:"",username:"",userimg:""}';

var tbl_maintable_detail_Obj = (function ()
{
    'use strict';
    var that = {
        _serviceUrl: '//127.0.0.1/sara.dd.ldsw/service/service_tbl_maintable.asmx/',
        _baseCodeHashMap: null,
        _validateMessage: null,
        _ladda_btn_command_save: null,
        _ladda_btn_command_report_word: null,
        _ladda_btn_command_report_excel: null,
        _ladda_btn_command_report_excel_big: null,
        _serviceUrl_detailall: '//127.0.0.1/sara.dd.ldsw/service/service_tbl_maintable_detailall.asmx/',
        _pr_sys_id: '',
        _pr_pagetype: '',
        init: function (callBackFunction)
        {
            try
            {
                //初始化页面控件的代码数据，放到hashmap中
                that.initBaseCode({
                    success: function ()
                    {
                        //初始化页面控件
                        that.initControl({
                            success: function ()
                            {
                                //绑定数据
                                that.bindData({
                                    success: function ()
                                    {
                                        that._validateMessage = new validateMessage('btn_command_save_tbl_maintable_detail');
                                        that._ladda_btn_command_save = Ladda.create('btn_command_save_tbl_maintable_detail');
                                        that._ladda_btn_command_report_word = Ladda.create('btn_command_report_word_tbl_maintable_detail');
                                        that._ladda_btn_command_report_excel = Ladda.create('btn_command_report_excel_tbl_maintable_detail');
                                        that._ladda_btn_command_report_excel_big = Ladda.create('btn_command_report_excel_big_tbl_maintable_detail');

                                        switch (that._pr_pagetype)
                                        {
                                            case "1":
                                                that.setDisable(false);
                                                break;
                                            case "2":
                                                that.setDisable(true);
                                                break;
                                        }

                                        callBackFunction.success();
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
        initParameter: function (callBackFunction)
        {
            try
            {
                //_pr_fromurl = requestQuery('fromurl');
                //_pr_fromurlparam = requestQuery('fromurlparam');
                that._pr_sys_id = requestQuery('sys_id');
                that._pr_pagetype = requestQuery('pagetype');
                //_pr_appcode = requestQuery('appcode');
                //_clientInf = '{userid:"' + basePageObj._userInfoJson.sys_userid + '",appcode:"' + _pr_appcode + '",appname:"",userip:"' + basePageObj._userInfoJson.ip + '",usermac:"' + basePageObj._userInfoJson.mac + '",username:"' + basePageObj._userInfoJson.sys_username + '",userimg:"' + basePageObj._userInfoJson.sys_photourl + '"}';

                if (that._pr_sys_id == null || that._pr_sys_id == '')
                {
                    _blockMessage.show('tbl_maintable_detail_sys_id参数接收失败', 'fail');
                }
                else if (that._pr_pagetype == null || that._pr_pagetype == '')
                {
                    _blockMessage.show('pagetype参数接收失败...', 'fail');
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
        initBaseCode: function (callBackFunction)
        {

            that._baseCodeHashMap = new hashMap();
            var parameterJson = {
                sysUserIdString: basePageObj._userInfoJson.sys_userid,
                projectClassIdString: _pr_projectClassId,
                projectClassDtl1String: _pr_projectClassDtl1,
                projectClassDtl2String: _pr_projectClassDtl2,
                userInfoJsonString: basePageObj._userInfoJson
            };

            var data = {
                parameterJsonString: JSON.stringify(parameterJson),
                clientInf: _clientInf
            };


            doAjaxFunction(that._serviceUrl_detailall, 'GetXzqyIdTextString', data, {
                success: function (result)
                {
                    var resultJson = (new Function("", "return " + result))();
                    that._baseCodeHashMap.put('servicecode_xzfq', resultJson['xzqy']);


                    var xzqyArray = resultJson['xzqy'];

                    var xzqyWhereStr = '(';
                    $.each(xzqyArray, function (i, u)
                    {
                        xzqyWhereStr += '\'' + xzqyArray[i].id + '\',';
                    });
                    xzqyWhereStr = xzqyWhereStr.trimEnd(',') + ')';

                    var sqlStringsJson = {
                        projclassid: 'select sys_id as id,projclassname as text from t_projclass order by to_number(sys_orderid)',
                        lrr: 'select distinct(lrr) from tbl_maintable where xzqyid in ' + xzqyWhereStr + '',
                        dwmc: 'select distinct(dwmc) from tbl_maintable where xzqyid in ' + xzqyWhereStr + ''
                    };

                    commonObj.querySqls(sqlStringsJson, {
                        success: function (resultJson)
                        {
                            that._baseCodeHashMap.put('servicecode_projclassid', resultJson["projclassid"]);
                            that._baseCodeHashMap.put('servicecode_lrr', formatJsonArrayToArray(resultJson["lrr"], "lrr"));
                            that._baseCodeHashMap.put('servicecode_dwmc', formatJsonArrayToArray(resultJson["dwmc"], "dwmc"));

                            callBackFunction.success();
                        }
                    });

                },
                fail: function (message)
                {
                    _blockMessage.show(that._serviceUrl_detailall + 'GetXzqyIdTextString<br/>' + message, 'fail');
                },
                error: function (message)
                {
                    _blockMessage.show(that._serviceUrl_detailall + 'GetXzqyIdTextString<br/>' + message, 'fail');
                }
            });


        },
        initControl: function (callBackFunction)
        {

            try
            {
                //that._controlHashMap = new hashMap();
                //that._control = new control(that._controlHashMap);

                //单选下拉列表

                var xzfqArray = that._baseCodeHashMap.get('servicecode_xzfq');
                var projclassidArray = that._baseCodeHashMap.get('servicecode_projclassid');
                var lrrArray = that._baseCodeHashMap.get('servicecode_lrr');
                var dwmcArray = that._baseCodeHashMap.get('servicecode_dwmc');

                controlObj.toggleinit('detail_ck_sys_delflag_tbl_maintable_detail');

                controlObj.toggleinit('detail_ck_sys_first_tbl_maintable_detail');

                controlObj.singledropdownlistinit('detail_dropdown_sys_projectclassid_tbl_maintable_detail', projclassidArray, that.detail_dropdown_sys_projectclassid_onchange);

                controlObj.singledropdownlistinit('detail_dropdown_xzqy_tbl_maintable_detail', xzfqArray);

                controlObj.autocompleteinit('detail_txt_dwmc_tbl_maintable_detail', dwmcArray);

                controlObj.autocompleteinit('detail_txt_lrr_tbl_maintable_detail', lrrArray);

                controlObj.datetimeinit('detail_datetime_lrrq_tbl_maintable_detail_date', 'detail_datetime_lrrq_tbl_maintable_detail_time');

                controlObj.singledropdownlistinit('detail_dropdown_xmlx_tbl_maintable_detail', projclassidArray);


                callBackFunction.success();
            }
            catch (ex)
            {
                _blockMessage.show('that.initControl执行失败。<br/>' + ex.message, 'fail');
            }



        },
        initProjDtlControlByProjclassID: function (projclassid, callBackFunction)
        {
            var sqlStringsJson = {
                t_projclass_dtl1: 'select projstate as id,value1 as text from t_projclass_dtl1 where projclassid = \'' + projclassid + '\' and value4>=0 order by to_number(sys_orderid)',
                t_projclass_dtl2: 'select projstate as id ,projname as text from t_projclass_dtl2  where projclassid = \'' + projclassid + '\''
            };

            commonObj.querySqls(sqlStringsJson, {
                success: function (resultJson)
                {
                    controlObj.singledropdownlistinit('detail_dropdown_sys_projectclassdtl1_tbl_maintable_detail', resultJson["t_projclass_dtl1"]);

                    controlObj.singledropdownlistinit('detail_dropdown_sys_projectclassdtl2_tbl_maintable_detail', resultJson["t_projclass_dtl2"]);

                    controlObj.singledropdownlistid('detail_dropdown_sys_projectclassdtl1_tbl_maintable_detail', '');

                    controlObj.singledropdownlistid('detail_dropdown_sys_projectclassdtl2_tbl_maintable_detail', '');

                    if (callBackFunction)
                    {
                        callBackFunction.success();
                    }

                }
            });
        },
        bindData: function (callBackFunction)
        {

            that.getModel({
                success: function (tbl_maintable_detail)
                {
                    try
                    {

                        controlObj.text('detail_txt_sys_processinsid_tbl_maintable_detail', tbl_maintable_detail.sys_processinsid);

                        controlObj.text('detail_txt_fk_tbl_maintable_sys_id_tbl_maintable_detail', tbl_maintable_detail.fk_tbl_maintable_sys_id);

                        controlObj.text('detail_txt_fk_workflow_sys_id_tbl_maintable_detail', tbl_maintable_detail.fk_workflow_sys_id);

                        controlObj.text('detail_txt_value1_tbl_maintable_detail', tbl_maintable_detail.value1);

                        controlObj.text('detail_txt_value2_tbl_maintable_detail', tbl_maintable_detail.value2);

                        controlObj.text('detail_txt_value3_tbl_maintable_detail', tbl_maintable_detail.value3);

                        controlObj.text('detail_txt_value4_tbl_maintable_detail', tbl_maintable_detail.value4);

                        controlObj.text('detail_txt_value5_tbl_maintable_detail', tbl_maintable_detail.value5);

                        controlObj.text('detail_txt_value6_tbl_maintable_detail', tbl_maintable_detail.value6);

                        controlObj.text('detail_txt_value7_tbl_maintable_detail', tbl_maintable_detail.value7);

                        controlObj.text('detail_txt_value8_tbl_maintable_detail', tbl_maintable_detail.value8);

                        controlObj.text('detail_txt_value9_tbl_maintable_detail', tbl_maintable_detail.value9);

                        controlObj.text('detail_txt_value10_tbl_maintable_detail', tbl_maintable_detail.value10);

                        controlObj.toggle('detail_ck_sys_delflag_tbl_maintable_detail', tbl_maintable_detail.sys_delflag == '0' ? "false" : "true");

                        controlObj.text('detail_txt_sys_processnextuser_tbl_maintable_detail', tbl_maintable_detail.sys_processnextuser);



                        controlObj.toggle('detail_ck_sys_first_tbl_maintable_detail', tbl_maintable_detail.sys_first == '0' ? "false" : "true");

                        controlObj.singledropdownlistid('detail_dropdown_sys_projectclassid_tbl_maintable_detail', tbl_maintable_detail.sys_projectclassid);

                        that.initProjDtlControlByProjclassID(tbl_maintable_detail.sys_projectclassid, {
                            success: function ()
                            {
                                controlObj.singledropdownlistid('detail_dropdown_sys_projectclassdtl1_tbl_maintable_detail', tbl_maintable_detail.sys_projectclassdtl1);

                                controlObj.singledropdownlistid('detail_dropdown_sys_projectclassdtl2_tbl_maintable_detail', tbl_maintable_detail.sys_projectclassdtl2);

                                controlObj.singledropdownlistdisable('detail_dropdown_sys_projectclassdtl1_tbl_maintable_detail', true);

                                controlObj.singledropdownlistdisable('detail_dropdown_sys_projectclassdtl2_tbl_maintable_detail', true);
                            }
                        });


                        controlObj.text('detail_txt_shpid_tbl_maintable_detail', tbl_maintable_detail.shpid);

                        controlObj.text('detail_txt_xmmc_tbl_maintable_detail', tbl_maintable_detail.xmmc);

                        controlObj.singledropdownlistid('detail_dropdown_xzqy_tbl_maintable_detail', tbl_maintable_detail.xzqyid);

                        controlObj.text('detail_txt_dwmc_tbl_maintable_detail', tbl_maintable_detail.dwmc);

                        controlObj.text('detail_txt_lrr_tbl_maintable_detail', tbl_maintable_detail.lrr);


                        controlObj.datetime('detail_datetime_lrrq_tbl_maintable_detail_date', 'detail_datetime_lrrq_tbl_maintable_detail_time', tbl_maintable_detail.lrrq);

                        controlObj.text('detail_txt_bz_tbl_maintable_detail', tbl_maintable_detail.bz.returnStringRN());

                        controlObj.singledropdownlistid('detail_dropdown_xmlx_tbl_maintable_detail', tbl_maintable_detail.xmlxid);




                        callBackFunction.success();
                    }
                    catch (ex)
                    {
                        _blockMessage.show('that.bindData执行失败。<br/>' + ex.message, 'fail');
                    }
                }
            });


        },
        getData: function (callBackFunction)
        {
            try
            {
              
                var tbl_maintable_detail = new Object();


                tbl_maintable_detail.sys_processinsid = controlObj.text('detail_txt_sys_processinsid_tbl_maintable_detail');

                tbl_maintable_detail.fk_tbl_maintable_sys_id = controlObj.text('detail_txt_fk_tbl_maintable_sys_id_tbl_maintable_detail');

                tbl_maintable_detail.fk_workflow_sys_id = controlObj.text('detail_txt_fk_workflow_sys_id_tbl_maintable_detail');

                tbl_maintable_detail.value1 = controlObj.text('detail_txt_value1_tbl_maintable_detail');

                tbl_maintable_detail.value2 = controlObj.text('detail_txt_value2_tbl_maintable_detail');

                tbl_maintable_detail.value3 = controlObj.text('detail_txt_value3_tbl_maintable_detail');

                tbl_maintable_detail.value4 = controlObj.text('detail_txt_value4_tbl_maintable_detail');

                tbl_maintable_detail.value5 = controlObj.text('detail_txt_value5_tbl_maintable_detail');

                tbl_maintable_detail.value6 = controlObj.text('detail_txt_value6_tbl_maintable_detail');

                tbl_maintable_detail.value7 = controlObj.text('detail_txt_value7_tbl_maintable_detail');

                tbl_maintable_detail.value8 = controlObj.text('detail_txt_value8_tbl_maintable_detail');

                tbl_maintable_detail.value9 = controlObj.text('detail_txt_value9_tbl_maintable_detail');

                tbl_maintable_detail.value10 = controlObj.text('detail_txt_value10_tbl_maintable_detail');


                tbl_maintable_detail.sys_delflag = controlObj.toggle('detail_ck_sys_delflag_tbl_maintable_detail') == "false" ? "0" : "1";

                tbl_maintable_detail.sys_processnextuser = controlObj.text('detail_txt_sys_processnextuser_tbl_maintable_detail');

                tbl_maintable_detail.sys_projectclassdtl1_name = controlObj.singledropdownlist('detail_dropdown_sys_projectclassdtl1_tbl_maintable_detail');
                tbl_maintable_detail.sys_projectclassdtl1 = controlObj.singledropdownlistid('detail_dropdown_sys_projectclassdtl1_tbl_maintable_detail');

                tbl_maintable_detail.sys_projectclassdtl2_name = controlObj.singledropdownlist('detail_dropdown_sys_projectclassdtl2_tbl_maintable_detail');
                tbl_maintable_detail.sys_projectclassdtl2 = controlObj.singledropdownlistid('detail_dropdown_sys_projectclassdtl2_tbl_maintable_detail');


                tbl_maintable_detail.sys_first = controlObj.toggle('detail_ck_sys_first_tbl_maintable_detail') == "false" ? "0" : "1";

                tbl_maintable_detail.sys_projectclassid_name = controlObj.singledropdownlist('detail_dropdown_sys_projectclassid_tbl_maintable_detail');
                tbl_maintable_detail.sys_projectclassid = controlObj.singledropdownlistid('detail_dropdown_sys_projectclassid_tbl_maintable_detail');

                tbl_maintable_detail.shpid = controlObj.text('detail_txt_shpid_tbl_maintable_detail');

                tbl_maintable_detail.xmmc = controlObj.text('detail_txt_xmmc_tbl_maintable_detail');

                tbl_maintable_detail.xzqy = controlObj.singledropdownlist('detail_dropdown_xzqy_tbl_maintable_detail');
                tbl_maintable_detail.xzqyid = controlObj.singledropdownlistid('detail_dropdown_xzqy_tbl_maintable_detail');

                tbl_maintable_detail.dwmc = controlObj.text('detail_txt_dwmc_tbl_maintable_detail');

                tbl_maintable_detail.lrr = controlObj.text('detail_txt_lrr_tbl_maintable_detail');

                tbl_maintable_detail.lrrq = controlObj.datetime('detail_datetime_lrrq_tbl_maintable_detail_date', 'detail_datetime_lrrq_tbl_maintable_detail_time');

                tbl_maintable_detail.bz = controlObj.text('detail_txt_bz_tbl_maintable_detail');

                tbl_maintable_detail.xmlx = controlObj.singledropdownlist('detail_dropdown_xmlx_tbl_maintable_detail');
                tbl_maintable_detail.xmlxid = controlObj.singledropdownlistid('detail_dropdown_xmlx_tbl_maintable_detail');







                callBackFunction.success(tbl_maintable_detail);
            }
            catch (ex)
            {
                _blockMessage.show('that.getData执行失败。<br/>' + ex.message, 'fail');
            }
        },
        checkData: function (tbl_maintable_detail, callBackFunction)
        {
            try
            {
                var errorMessageHansMap = new hashMap();
                var errorMessagePlacementHansMap = new hashMap();




                if (tbl_maintable_detail.sys_processinsid.length > 100)
                {
                    errorMessageHansMap.put('detail_txt_sys_processinsid_tbl_maintable_detail', '长度不能超过<a style="color:red">100</a>');
                    errorMessagePlacementHansMap.put('detail_txt_sys_processinsid_tbl_maintable_detail', 'top');
                }


                if (tbl_maintable_detail.fk_tbl_maintable_sys_id.length > 100)
                {
                    errorMessageHansMap.put('detail_txt_fk_tbl_maintable_sys_id_tbl_maintable_detail', '长度不能超过<a style="color:red">100</a>');
                    errorMessagePlacementHansMap.put('detail_txt_fk_tbl_maintable_sys_id_tbl_maintable_detail', 'top');
                }


                if (tbl_maintable_detail.fk_workflow_sys_id.length > 100)
                {
                    errorMessageHansMap.put('detail_txt_fk_workflow_sys_id_tbl_maintable_detail', '长度不能超过<a style="color:red">100</a>');
                    errorMessagePlacementHansMap.put('detail_txt_fk_workflow_sys_id_tbl_maintable_detail', 'top');
                }


                if (tbl_maintable_detail.value1.length > 100)
                {
                    errorMessageHansMap.put('detail_txt_value1_tbl_maintable_detail', '长度不能超过<a style="color:red">100</a>');
                    errorMessagePlacementHansMap.put('detail_txt_value1_tbl_maintable_detail', 'top');
                }


                if (tbl_maintable_detail.value2.length > 100)
                {
                    errorMessageHansMap.put('detail_txt_value2_tbl_maintable_detail', '长度不能超过<a style="color:red">100</a>');
                    errorMessagePlacementHansMap.put('detail_txt_value2_tbl_maintable_detail', 'top');
                }


                if (tbl_maintable_detail.value3.length > 100)
                {
                    errorMessageHansMap.put('detail_txt_value3_tbl_maintable_detail', '长度不能超过<a style="color:red">100</a>');
                    errorMessagePlacementHansMap.put('detail_txt_value3_tbl_maintable_detail', 'top');
                }


                if (tbl_maintable_detail.value4.length > 100)
                {
                    errorMessageHansMap.put('detail_txt_value4_tbl_maintable_detail', '长度不能超过<a style="color:red">100</a>');
                    errorMessagePlacementHansMap.put('detail_txt_value4_tbl_maintable_detail', 'top');
                }


                if (tbl_maintable_detail.value5.length > 100)
                {
                    errorMessageHansMap.put('detail_txt_value5_tbl_maintable_detail', '长度不能超过<a style="color:red">100</a>');
                    errorMessagePlacementHansMap.put('detail_txt_value5_tbl_maintable_detail', 'top');
                }


                if (tbl_maintable_detail.value6.length > 100)
                {
                    errorMessageHansMap.put('detail_txt_value6_tbl_maintable_detail', '长度不能超过<a style="color:red">100</a>');
                    errorMessagePlacementHansMap.put('detail_txt_value6_tbl_maintable_detail', 'top');
                }


                if (tbl_maintable_detail.value7.length > 100)
                {
                    errorMessageHansMap.put('detail_txt_value7_tbl_maintable_detail', '长度不能超过<a style="color:red">100</a>');
                    errorMessagePlacementHansMap.put('detail_txt_value7_tbl_maintable_detail', 'top');
                }


                if (tbl_maintable_detail.value8.length > 100)
                {
                    errorMessageHansMap.put('detail_txt_value8_tbl_maintable_detail', '长度不能超过<a style="color:red">100</a>');
                    errorMessagePlacementHansMap.put('detail_txt_value8_tbl_maintable_detail', 'top');
                }


                if (tbl_maintable_detail.value9.length > 100)
                {
                    errorMessageHansMap.put('detail_txt_value9_tbl_maintable_detail', '长度不能超过<a style="color:red">100</a>');
                    errorMessagePlacementHansMap.put('detail_txt_value9_tbl_maintable_detail', 'top');
                }


                if (tbl_maintable_detail.value10.length > 100)
                {
                    errorMessageHansMap.put('detail_txt_value10_tbl_maintable_detail', '长度不能超过<a style="color:red">100</a>');
                    errorMessagePlacementHansMap.put('detail_txt_value10_tbl_maintable_detail', 'top');
                }




                if (tbl_maintable_detail.sys_processnextuser.length > 100)
                {
                    errorMessageHansMap.put('detail_txt_sys_processnextuser_tbl_maintable_detail', '长度不能超过<a style="color:red">100</a>');
                    errorMessagePlacementHansMap.put('detail_txt_sys_processnextuser_tbl_maintable_detail', 'top');
                }

                if (tbl_maintable_detail.sys_projectclassdtl1.length > 100 || tbl_maintable_detail.sys_projectclassdtl1_name.length > 100)
                {
                    errorMessageHansMap.put('detail_dropdown_sys_projectclassdtl1_tbl_maintable_detail', '长度不能超过<a style="color:red">100</a>');
                }

                if (tbl_maintable_detail.sys_projectclassdtl2.length > 100 || tbl_maintable_detail.sys_projectclassdtl2_name.length > 100)
                {
                    errorMessageHansMap.put('detail_dropdown_sys_projectclassdtl2_tbl_maintable_detail', '长度不能超过<a style="color:red">100</a>');
                }



                if (tbl_maintable_detail.sys_projectclassid.length > 100 || tbl_maintable_detail.sys_projectclassid_name.length > 100)
                {
                    errorMessageHansMap.put('detail_dropdown_sys_projectclassid_tbl_maintable_detail', '长度不能超过<a style="color:red">100</a>');
                }


                if (tbl_maintable_detail.shpid.length > 100)
                {
                    errorMessageHansMap.put('detail_txt_shpid_tbl_maintable_detail', '长度不能超过<a style="color:red">100</a>');
                    errorMessagePlacementHansMap.put('detail_txt_shpid_tbl_maintable_detail', 'top');
                }


                if (tbl_maintable_detail.xmmc.length > 100)
                {
                    errorMessageHansMap.put('detail_txt_xmmc_tbl_maintable_detail', '长度不能超过<a style="color:red">100</a>');
                    errorMessagePlacementHansMap.put('detail_txt_xmmc_tbl_maintable_detail', 'top');
                }

                if (tbl_maintable_detail.xmmc.length == 0)
                {
                    errorMessageHansMap.put('detail_txt_xmmc_tbl_maintable_detail', '不能为空');
                    errorMessagePlacementHansMap.put('detail_txt_xmmc_tbl_maintable_detail', 'top');
                }

                if (tbl_maintable_detail.xzqy.length > 100 || tbl_maintable_detail.xzqyid.length > 100)
                {
                    errorMessageHansMap.put('detail_dropdown_xzqy_tbl_maintable_detail', '长度不能超过<a style="color:red">100</a>');
                }

                if (tbl_maintable_detail.dwmc.length > 100)
                {
                    errorMessageHansMap.put('detail_txt_dwmc_tbl_maintable_detail', '长度不能超过<a style="color:red">100</a>');
                }

                if (tbl_maintable_detail.lrr.length > 100)
                {
                    errorMessageHansMap.put('detail_txt_lrr_tbl_maintable_detail', '长度不能超过<a style="color:red">100</a>');
                }




                if (tbl_maintable_detail.bz.length > 4000)
                {
                    errorMessageHansMap.put('detail_txt_bz_tbl_maintable_detail', '长度不能超过<a style="color:red">4000</a>');
                }

                if (tbl_maintable_detail.xmlx.length > 100 || tbl_maintable_detail.xmlxid.length > 100)
                {
                    errorMessageHansMap.put('detail_dropdown_xmlx_tbl_maintable_detail', '长度不能超过<a style="color:red">100</a>');
                }




                if (errorMessageHansMap.keys().length > 0)
                {
                    that._validateMessage.show(errorMessageHansMap, errorMessagePlacementHansMap, true);
                    callBackFunction.fail();
                }
                else
                {
                    that._validateMessage.hidden();
                    callBackFunction.success(tbl_maintable_detail);
                }
            }
            catch (ex)
            {
                _blockMessage.show('that.checkData执行失败。<br/>' + ex.message, 'fail');
            }

        },
        setDisable: function (isDisable)
        {
            try
            {


                controlObj.toggledisable('detail_ck_sys_delflag_tbl_maintable_detail', true);

                controlObj.textdisable('detail_txt_sys_processnextuser_tbl_maintable_detail', true);


                controlObj.singledropdownlistdisable('detail_dropdown_sys_projectclassdtl1_tbl_maintable_detail', true);


                controlObj.singledropdownlistdisable('detail_dropdown_sys_projectclassdtl2_tbl_maintable_detail', true);


                controlObj.toggledisable('detail_ck_sys_first_tbl_maintable_detail', true);


                controlObj.singledropdownlistdisable('detail_dropdown_sys_projectclassid_tbl_maintable_detail', true);

                controlObj.textdisable('detail_txt_shpid_tbl_maintable_detail', true);

                controlObj.textdisable('detail_txt_xmmc_tbl_maintable_detail', isDisable);


                controlObj.singledropdownlistdisable('detail_dropdown_xzqy_tbl_maintable_detail', true);

                controlObj.textdisable('detail_txt_dwmc_tbl_maintable_detail', isDisable);

                controlObj.textdisable('detail_txt_lrr_tbl_maintable_detail', true);

                controlObj.datetimedisable('detail_datetime_lrrq_tbl_maintable_detail_date', 'detail_datetime_lrrq_tbl_maintable_detail_time', true);

                controlObj.textdisable('detail_txt_bz_tbl_maintable_detail', isDisable);


                controlObj.singledropdownlistdisable('detail_dropdown_xmlx_tbl_maintable_detail', true);

                controlObj.textdisable('detail_txt_sys_processinsid_tbl_maintable_detail', true);

                controlObj.textdisable('detail_txt_fk_tbl_maintable_sys_id_tbl_maintable_detail', true);

                controlObj.textdisable('detail_txt_fk_workflow_sys_id_tbl_maintable_detail', true);


                if (isDisable)
                {
                    $('#btn_command_save_tbl_maintable_detail').addClass('hidden');
                    $('.btn-command-message').attr('disabled', 'disabled');
                }
                else
                {
                    $('#btn_command_save_tbl_maintable_detail').removeClass('hidden');
                    $('.btn-command-message').removeAttr('disabled');
                }
            }
            catch (ex)
            {
                _blockMessage.show('that.setDisable执行失败。<br/>' + ex.message, 'fail');
            }
        },
        detail_dropdown_sys_projectclassid_onchange: function (changeEventParameter)
        {
            initProjDtlControlByProjclassID(changeEventParameter.val);
        },
        btn_command_save_onclick: function ()
        {
            try
            {
                that._ladda_btn_command_save.start();
                that.getData({
                    success: function (tbl_maintable_detail)
                    {
                        that.checkData(tbl_maintable_detail, {
                            success: function (tbl_maintable_detail)
                            {
                                that.updateModel(tbl_maintable_detail, {
                                    success: function ()
                                    {
                                        controlObj.toggle('detail_ck_sys_first_tbl_maintable_detail', 'true');
                                        that._ladda_btn_command_save.stop();
                                        _alertMessage.show('保存成功', 'success', 2000);
                                    },
                                    fail: function (message)
                                    {
                                        that._ladda_btn_command_save.stop();
                                        _alertMessage.show('保存失败<br/>' + message, 'fail');
                                    }
                                });
                            },
                            fail: function ()
                            {
                                that._ladda_btn_command_save.stop();
                                _alertMessage.show('校验未通过', 'warning');
                            }
                        });
                    }
                });
            }
            catch (ex)
            {
                _blockMessage.show('保存程序异常。', 'fail');
            }
        },
        btn_command_report_word_onclick: function ()
        {
            try
            {
                that._ladda_btn_command_report_word.start();
                var data = { fk_tbl_maintable_sys_id: that._pr_sys_id };
                //;
                doAjaxFunction(that._serviceUrl, 'GetReportWord', data, {
                    success: function (message)
                    {
                        that._ladda_btn_command_report_word.stop();
                        window.open(message, "_blank", "");
                    },
                    fail: function (message)
                    {
                        that._ladda_btn_command_report_word.stop();
                        _blockMessage.show('报表导出失败<br/>' + message, 'fail');
                    }
                });
            }
            catch (ex)
            {
                _blockMessage.show('报表程序异常。', 'fail');
            }
        },
        btn_command_report_excel_onclick: function ()
        {
            try
            {
                that._ladda_btn_command_report_excel.start();
                var data = { fk_tbl_maintable_sys_id: that._pr_sys_id };
                //;
                doAjaxFunction(that._serviceUrl, 'GetReportExcel', data, {
                    success: function (message)
                    {
                        that._ladda_btn_command_report_excel.stop();
                        window.open(message, "_blank", "");
                    },
                    fail: function (message)
                    {
                        that._ladda_btn_command_report_excel.stop();
                        _blockMessage.show('报表导出失败<br/>' + message, 'fail');
                    }
                });
            }
            catch (ex)
            {
                _blockMessage.show('报表程序异常。', 'fail');
            }
        },
        btn_command_report_excel_big_onclick: function ()
        {
            try
            {
                that._ladda_btn_command_report_excel_big.start();
                var data = { fk_tbl_maintable_sys_id: that._pr_sys_id };
                //;
                doAjaxFunction(that._serviceUrl, 'GetReportExcelBig', data, {
                    success: function (message)
                    {
                        that._ladda_btn_command_report_excel_big.stop();
                        window.open(message, "_blank", "");
                    },
                    fail: function (message)
                    {
                        that._ladda_btn_command_report_excel_big.stop();
                        _blockMessage.show('报表导出失败<br/>' + message, 'fail');
                    }
                });
            }
            catch (ex)
            {
                _blockMessage.show('报表程序异常。', 'fail');
            }
        },
        getModel: function (callbackFunction)
        {
            var whereClause = ' sys_id = \'' + that._pr_sys_id + '\'';
            var orderByString = '';
            var columnsString = 'sys_processinsid^fk_tbl_maintable_sys_id^fk_workflow_sys_id^value1^value2^value3^value4^value5^value6^value7^value8^value9^value10^sys_delflag^sys_processnextuser^sys_projectclassdtl1^sys_projectclassdtl2^sys_first^sys_projectclassid^shpid^xmmc^xzqyid^dwmc^lrr^lrrq^bz^xmlxid^sys_id';
            var pageSizeString = '';
            var pageIndexString = '';

            var data = { whereString: whereClause, orderByString: orderByString, columnsString: columnsString, pageSizeString: pageSizeString, pageIndexString: pageIndexString, clientInf: _clientInf };

            doAjaxFunction(that._serviceUrl, 'GetList', data, {
                success: function (message)
                {

                    var messageJson = (new Function("", "return " + message))();
                    callbackFunction.success(messageJson.rows[0]);
                },
                fail: function (message)
                {
                    _blockMessage.show(that._serviceUrl + 'GetList<br/>' + message, 'fail');
                }
            });
        },
        updateModel: function (tbl_maintable_detail, callbackFunction)
        {
            var d = new Date();
            var columns = 'sys_id^sys_processinsid^fk_tbl_maintable_sys_id^fk_workflow_sys_id^value1^value2^value3^value4^value5^value6^value7^value8^value9^value10^sys_delflag^sys_processnextuser^sys_projectclassdtl1^sys_projectclassdtl1_name^sys_projectclassdtl2^sys_projectclassdtl2_name^sys_first^sys_projectclassid^sys_projectclassid_name^shpid^xmmc^xzqy^xzqyid^dwmc^lrr^lrrq^bz^xmlx^xmlxid^sys_lastedituserid^sys_lasteditusername^sys_lasteditdate';
            var json = {
                sys_id: that._pr_sys_id,
                sys_processinsid: tbl_maintable_detail.sys_processinsid,
                fk_tbl_maintable_sys_id: tbl_maintable_detail.fk_tbl_maintable_sys_id,
                fk_workflow_sys_id: tbl_maintable_detail.fk_workflow_sys_id,
                value1: tbl_maintable_detail.value1,
                value2: tbl_maintable_detail.value2,
                value3: tbl_maintable_detail.value3,
                value4: tbl_maintable_detail.value4,
                value5: tbl_maintable_detail.value5,
                value6: tbl_maintable_detail.value6,
                value7: tbl_maintable_detail.value7,
                value8: tbl_maintable_detail.value8,
                value9: tbl_maintable_detail.value9,
                value10: tbl_maintable_detail.value10,
                sys_delflag: tbl_maintable_detail.sys_delflag,
                sys_processnextuser: tbl_maintable_detail.sys_processnextuser,
                sys_projectclassdtl1_name: tbl_maintable_detail.sys_projectclassdtl1_name,
                sys_projectclassdtl1: tbl_maintable_detail.sys_projectclassdtl1,
                sys_projectclassdtl2_name: tbl_maintable_detail.sys_projectclassdtl2_name,
                sys_projectclassdtl2: tbl_maintable_detail.sys_projectclassdtl2,
                sys_first: "1",
                sys_projectclassid: tbl_maintable_detail.sys_projectclassid,
                sys_projectclassid_name: tbl_maintable_detail.sys_projectclassid_name,
                shpid: tbl_maintable_detail.shpid,
                xmmc: tbl_maintable_detail.xmmc,
                xzqy: tbl_maintable_detail.xzqy,
                xzqyid: tbl_maintable_detail.xzqyid,
                dwmc: tbl_maintable_detail.dwmc,
                lrr: tbl_maintable_detail.lrr,
                lrrq: tbl_maintable_detail.lrrq,
                bz: tbl_maintable_detail.bz.formatStringRN(),
                xmlx: tbl_maintable_detail.xmlx,
                xmlxid: tbl_maintable_detail.xmlxid,
                sys_lasteditusername: basePageObj._userInfoJson.sys_username,
                sys_lastedituserid: basePageObj._userInfoJson.sys_userid,
                sys_lasteditdate: d.Format('yyyy-MM-dd hh:mm:ss')
            };


            var data = { columns: columns, clientInf: _clientInf, json: JSON.stringify(json) };

            doAjaxFunction(that._serviceUrl, 'Update', data, {
                success: function (message)
                {
                    callbackFunction.success();
                },
                fail: function (message)
                {
                    callbackFunction.fail(message);
                },
                error: function (message)
                {
                    _blockMessage.show(that._serviceUrl + 'Update<br/>' + message, 'fail');
                }
            });
        }
    };
    return that;
})();
