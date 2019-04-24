
var tblMainTableButtonObj = (function ()
{
    'use strict';
    var that = {
        _serviceUrl_tbl_maintable_detailall: '//127.0.0.1/sara.dd.ldsw/service/service_tbl_maintable_detailall.asmx/',
        

        //===========动态button================

        //全部动态生成的按钮的ladda
        _buttonHashMap: null,
        _ladda_buttonHashMap: null,
        //当前正在操作的按钮
        _ladda_current_btn_command: null,
        //当前被点击的按钮的ID
        _currentButtonJson: null,
        //当前控件是在list/detail
        _currentType: '',
        //当前页面状态
        _currentPageType: '',
        //inputmodal的校验工具
        _validateMessage_div_input_modal: null,
        //workflow的校验工具
        _validateMessage_div_workflow_modal_start: null,
        _validateMessage_div_workflow_modal_send: null,

   
        //页面加载程序
        initButton: function (currentPageType, currentType, callBackFunction)
        {
            $('#div_tbl_maintable_button').load('../tbl_maintable/tbl_maintable_button.html', null, function ()
            {
                that._currentPageType = currentPageType;
                that._currentType = currentType;
                that.loadButton(callBackFunction);
            });
        },
        //装载按钮
        loadButton: function (callBackFunction)
        {

                        $('#div_input_modal_tbl_maintable_button').modal({
                            keyboard: false,
                            backdrop: 'static',
                            show: false
                        });

                        $('#div_workflow_modal_tbl_maintable_button').modal({
                            keyboard: false,
                            backdrop: 'static',
                            show: false
                        });

                        that._ladda_btn_workflow_modal_start = Ladda.create('btn_workflow_modal_start_tbl_maintable_button');
                        that._ladda_btn_workflow_modal_send = Ladda.create('btn_workflow_modal_send_tbl_maintable_button');

                      
                        that._validateMessage_div_input_modal = new validateMessage('btn_input_modal_confirm_tbl_maintable_button');
                        that._validateMessage_div_workflow_modal_start = new validateMessage('btn_workflow_modal_start_tbl_maintable_button');
                        that._validateMessage_div_workflow_modal_send = new validateMessage('btn_workflow_modal_send_tbl_maintable_button');

                        var parameterJson = {
                            sysUserIdString: basePageObj._userInfoJson.sys_userid,
                            projectClassIdString: _pr_projectClassId,
                            projectClassDtl1String: _pr_projectClassDtl1,
                            projectClassDtl2String: _pr_projectClassDtl2,
                            workItemIdString: _pr_workItemIdString,
                            processDefIdString: _pr_processDefIdString,
                            activityDefIdString: _pr_activityDefIdString,
                            processInsIdString: _pr_processInsIdString
                        };

                        var data = {
                            parameterJsonString: JSON.stringify(parameterJson),
                            clientInf: _clientInf
                        };


                        doAjaxFunction(that._serviceUrl_tbl_maintable_detailall, 'GetProjectClassDtlButton', data, {
                            success: function (message)
                            {

                                that._buttonHashMap = new hashMap();
                                that._ladda_buttonHashMap = new hashMap();

                                var buttonJsonArray = (new Function("", "return " + message))();
                                $('#div_btn_command_tbl_maintable_button').html('');
                                $.each(buttonJsonArray, function (i, u)
                                {

                                    var isShowButton = false;

                                    if (buttonJsonArray[i]["buttonShowType"] == 'all')
                                    {
                                        isShowButton = true;
                                    }
                                    else if (buttonJsonArray[i]["buttonShowType"] == that._currentType)
                                    {
                                        isShowButton = true;
                                    }

                                    if (isShowButton)
                                    {
                                        var buttonString = '';
                                        buttonString += '<button';
                                        buttonString += ' id="' + buttonJsonArray[i]["buttonId"] + '"';

                                        switch (buttonJsonArray[i]["buttonCss"])
                                        {
                                            case "success":
                                                buttonString += ' class="btn btn-success" ';
                                                break;
                                            case "warning":
                                                buttonString += ' class="btn btn-warning" ';
                                                break;
                                            case "danger":
                                                buttonString += ' class="btn btn-danger" ';
                                                break;
                                            case "primary":
                                                buttonString += ' class="btn btn-primary" ';
                                                break;
                                            case "info":
                                                buttonString += ' class="btn btn-info" ';
                                                break;
                                            case "magenta":
                                                buttonString += ' class="btn btn-magenta" ';
                                                break;
                                            default:
                                                buttonString += ' class="btn btn-success" ';
                                                break;
                                        }

                                        if (buttonJsonArray[i]["buttonIsDisable"])
                                        {
                                            buttonString += ' disabled ';
                                        }

                                        buttonString += ' onclick="tblMainTableButtonObj.btn_command_onclick(\'' + buttonJsonArray[i]["buttonId"] + '\');">'
                                        buttonString += buttonJsonArray[i]["buttonText"];
                                        buttonString += ' <span class="badge"></span>';
                                        buttonString += ' </button>';

                                        $('#div_btn_command_tbl_maintable_button').append(buttonString);

                                        that._ladda_buttonHashMap.put(buttonJsonArray[i]["buttonId"], Ladda.create(buttonJsonArray[i]["buttonId"]));
                                        that._buttonHashMap.put(buttonJsonArray[i]["buttonId"], buttonJsonArray[i]);



                                    }
                                });
                                callBackFunction.success('1');
                            },
                            fail: function (message)
                            {
                                _blockMessage.show(that._serviceUrl_tbl_maintable_detailall + 'GetProjectClassDtlButton<br/>' + message, 'fail');
                            },
                            error: function (message)
                            {
                                _blockMessage.show(that._serviceUrl_tbl_maintable_detailall + 'GetProjectClassDtlButton<br/>' + message, 'fail');
                            }
                        });
                   
              
        },

        //获取被选中的maintablesysid
        toolGetTblMaintableSysId: function ()
        {
            var tbl_maintable_sys_id = '';
            if (that._currentType == 'list')
            {
                tbl_maintable_sys_id = tblMainTableListObj._pr_gridselectids;
            }
            else
            {
                tbl_maintable_sys_id = _pr_tbl_maintable_sys_id;
            }

            return tbl_maintable_sys_id
        },
        //按钮被点击后的响应事件
        btn_command_onclick: function (buttonId)
        {
            that._currentButtonJson = that._buttonHashMap.get(buttonId);
            that._ladda_current_btn_command = that._ladda_buttonHashMap.get(buttonId);
            that._ladda_current_btn_command.start();

            var tbl_maintable_sys_id = that.toolGetTblMaintableSysId();

            var allcount = tbl_maintable_sys_id.split('^').length;

            var isCandDo = false;
            if (that._currentButtonJson['buttonIsMustData'] != 'true')
            {
                isCandDo = true;
            }
            else
            {
                if (tbl_maintable_sys_id == '' || tbl_maintable_sys_id == '^')
                {
                    _alertMessage.show('需要选择一条数据!', 'warning', 2000);
                    that._ladda_current_btn_command.stop();
                    that._currentButtonJson = null;
                } else if (allcount >= 2)
                {
                    _alertMessage.show('请选择一条数据!', 'warning', 2000);
                    that._ladda_current_btn_command.stop();
                    that._currentButtonJson = null;
                }
                else
                {
                    isCandDo = true;
                }
            }

            if (isCandDo)
            {
                that.doButtonConfirm(tbl_maintable_sys_id, that._currentButtonJson, {
                    confirm: function ()
                    {
                        that.doButtonInput(tbl_maintable_sys_id, that._currentButtonJson, {
                            confirm: function ()
                            {

                                that.doButtonServerEventArgs(tbl_maintable_sys_id, that._currentButtonJson, {
                                    success: function (messageJsonString)
                                    {
                                        that.doButtonClientEventArgs(tbl_maintable_sys_id, that._currentButtonJson, messageJsonString, {
                                            success: function ()
                                            {
                                                that._ladda_current_btn_command.stop();
                                                //_alertMessage.show('操作完成', 'success');
                                                that._currentButtonJson = null;
                                            },
                                            fail: function ()
                                            {
                                                that._ladda_current_btn_command.stop();
                                                that._currentButtonJson = null;
                                            }
                                        });
                                    },
                                    fail: function (messageHtml)
                                    {
                                        that._ladda_current_btn_command.stop();
                                        that._currentButtonJson = null;

                                        if (messageHtml != '')
                                        {
                                            _resultMessage.message(messageHtml);
                                            _resultMessage.show();
                                        }
                                    }
                                })

                            }, cancle: function ()
                            {
                                that._ladda_current_btn_command.stop();
                                that._currentButtonJson = null;
                            }
                        });

                    }, cancle: function ()
                    {
                        that._ladda_current_btn_command.stop();
                        that._currentButtonJson = null;
                    }
                });

            }
        },
        //执行confirm的配置
        doButtonConfirm: function (tbl_maintable_sys_id, buttonJson, callBackFunction)
        {
            if (buttonJson["buttonConfirmContent"] != undefined && buttonJson["buttonConfirmContent"] != null && buttonJson["buttonConfirmContent"] != '')
            {
                _confirmMessage.destory();
                _confirmMessage.show('操作确认', buttonJson["buttonConfirmContent"],
                           {
                               confirm: function ()
                               {
                                   callBackFunction.confirm();
                               },
                               cancle: function ()
                               {
                                   callBackFunction.cancle();
                               }
                           });
            }
            else
            {
                callBackFunction.confirm();
            }
        },
        //执行input的配置
        doButtonInput: function (tbl_maintable_sys_id, buttonJson, callBackFunction)
        {
            if (buttonJson["buttonInputTitle"] != undefined && buttonJson["buttonInputTitle"] != null && buttonJson["buttonInputTitle"] != '')
            {


                //初始化下拉列表信息
                that.initButtonInputArgs(tbl_maintable_sys_id, buttonJson, {
                    success: function ()
                    {
                        //输出标题
                        $('#label_input_log_tbl_maintable_button').html(buttonJson["buttonInputTitle"]);
                        $('#h4_input_title_tbl_maintable_button').html(buttonJson["buttonInputTitle"]);
                        //清理信息
                        $('#txt_input_log_tbl_maintable_button').val('已阅');

                        //绑定事件
                        $('#btn_input_modal_confirm_tbl_maintable_button').unbind('click');
                        $('#btn_input_modal_confirm_tbl_maintable_button').bind('click', function ()
                        {

                            var errorMessageHansMap = new hashMap();
                            var errorMessagePlacementHansMap = new hashMap();

                            if (buttonJson["buttonInputArgs"] != undefined && buttonJson["buttonInputArgs"] != null && buttonJson["buttonInputArgs"] != '')
                            {

                                if (controlObj.singledropdownlistid('dropdown_input_nextuser_tbl_maintable_button').length == 0)
                                {
                                    errorMessageHansMap.put('dropdown_input_nextuser_tbl_maintable_button', '不能为空');
                                    errorMessagePlacementHansMap.put('dropdown_input_nextuser_tbl_maintable_button', 'right');
                                }

                            }


                            if ($('#txt_input_log_tbl_maintable_button').val().length == 0)
                            {
                                errorMessageHansMap.put('txt_input_log_tbl_maintable_button', '不能为空');
                                errorMessagePlacementHansMap.put('txt_input_log_tbl_maintable_button', 'right');
                            }

                            if ($('#txt_input_log_tbl_maintable_button').val().length > 2000)
                            {
                                errorMessageHansMap.put('txt_input_log_tbl_maintable_button', '不能超过1000个汉字');
                                errorMessagePlacementHansMap.put('txt_input_log_tbl_maintable_button', 'right');
                            }

                            if (errorMessageHansMap.keys().length > 0)
                            {
                                that._validateMessage_div_input_modal.show(errorMessageHansMap, errorMessagePlacementHansMap, true);

                            }
                            else
                            {
                                that._validateMessage_div_input_modal.hidden();
                                $('#div_input_modal_tbl_maintable_button').modal('hide');
                                callBackFunction.confirm();

                            }




                        });

                        $('#btn_input_modal_cancle_tbl_maintable_button').unbind('click');
                        $('#btn_input_modal_cancle_tbl_maintable_button').bind('click', function ()
                        {
                            $('#div_input_modal_tbl_maintable_button').modal('hide');

                            callBackFunction.cancle();
                        });

                        $('#div_input_modal_tbl_maintable_button').modal('show');
                    }
                });



            }
            else
            {
                callBackFunction.confirm();
            }

        },
        //初始化inputmodal中的下拉列表
        initButtonInputArgs: function initButtonInputArgs(tbl_maintable_sys_id, buttonJson, callBackFunction)
        {
            if (buttonJson["buttonInputArgs"] != undefined && buttonJson["buttonInputArgs"] != null && buttonJson["buttonInputArgs"] != '')
            {
                $('#div_dropdown_input_nextuser_tbl_maintable_button').css('display', '');

                var parameterJson = {
                    sysUserIdString: basePageObj._userInfoJson.sys_userid,
                    mainTableSysidString: tbl_maintable_sys_id,
                    projectClassIdString: _pr_projectClassId,
                    projectClassDtl1String: _pr_projectClassDtl1,
                    projectClassDtl2String: _pr_projectClassDtl2,
                    buttonServerEventArgs: buttonJson["buttonServerEventArgs"]
                };

                var data = {
                    parameterJsonString: JSON.stringify(parameterJson),
                    clientInf: _clientInf
                };


                doAjaxFunction(that._serviceUrl_tbl_maintable_detailall, buttonJson["buttonInputArgs"], data, {
                    success: function (result)
                    {
                        var resultJson = (new Function("", "return " + result))();
                        controlObj.singledropdownlistinit('dropdown_input_nextuser_tbl_maintable_button', resultJson["nextuser"]);
                        controlObj.singledropdownlistid('dropdown_input_nextuser_tbl_maintable_button', '');
                        callBackFunction.success();
                    },
                    fail: function (message)
                    {
                        _blockMessage.show(that._serviceUrl_tbl_maintable_detailall + buttonJson["buttonInputArgs"] + ' <br/>' + message, 'fail');
                    },
                    error: function (message)
                    {
                        _blockMessage.show(that._serviceUrl_tbl_maintable_detailall + buttonJson["buttonInputArgs"] + ' <br/>' + message, 'fail');
                    }
                });
            }
            else
            {
                $('#div_dropdown_input_nextuser_tbl_maintable_button').css('display', 'none');
                callBackFunction.success();
            }
        },
        //执行ServerEventArgs的配置
        doButtonServerEventArgs: function (tbl_maintable_sys_id, buttonJson, callBackFunction)
        {
            if (buttonJson["buttonServerEventArgs"] != undefined && buttonJson["buttonServerEventArgs"] != null && buttonJson["buttonServerEventArgs"] != '')
            {
                var logString = '';
                var nextUserId = '';
                var nextUserName = '';
                if (buttonJson["buttonInputTitle"] != undefined && buttonJson["buttonInputTitle"] != null && buttonJson["buttonInputTitle"] != '')
                {
                    logString = $('#txt_input_log_tbl_maintable_button').val().formatStringRN();
                    if (buttonJson["buttonInputArgs"] != undefined && buttonJson["buttonInputArgs"] != null && buttonJson["buttonInputArgs"] != '')
                    {
                        nextUserId = controlObj.singledropdownlistid('dropdown_input_nextuser_tbl_maintable_button');
                        nextUserName = controlObj.singledropdownlist('dropdown_input_nextuser_tbl_maintable_button');
                    }
                }

                var parameterJson = {
                    sysUserIdString: basePageObj._userInfoJson.sys_userid,
                    mainTableSysidString: tbl_maintable_sys_id,
                    projectClassIdString: _pr_projectClassId,
                    projectClassDtl1String: _pr_projectClassDtl1,
                    projectClassDtl2String: _pr_projectClassDtl2,
                    buttonIdString: buttonJson["buttonId"],
                    eventArgsString: buttonJson["buttonServerEventArgs"],
                    InputContentString: logString + '^' + nextUserId + '^' + nextUserName,
                    workItemIdString: _pr_workItemIdString,
                    processDefIdString: _pr_processDefIdString,
                    activityDefIdString: _pr_activityDefIdString,
                    processInsIdString: _pr_processInsIdString,
                    userInfoJsonString: basePageObj._userInfoJson
                };

                var data = {
                    parameterJsonString: JSON.stringify(parameterJson),
                    clientInf: _clientInf
                };
                //设置待办人
                that.toolSendGetNextUserNameString(nextUserName);
                doAjaxFunction(that._serviceUrl_tbl_maintable_detailall, 'DoButtonServerEventArgs', data, {
                    success: function (messageJs)
                    {
                        callBackFunction.success(messageJs);
                    },
                    fail: function (messageHtml)
                    {
                        callBackFunction.fail(messageHtml);
                    },
                    error: function (message)
                    {
                        _blockMessage.show(that._serviceUrl_tbl_maintable_detailall + 'DoButtonServerEventArgs<br/>' + message, 'fail');
                    }
                });

            }
            else
            {
                callBackFunction.success('');
            }
        },
        //执行ClientEventArgs的配置
        _doButtonServerEventArgsResultString: '',
        doButtonClientEventArgs: function (tbl_maintable_sys_id, buttonJson, messageJsonString, callBackFunction)
        {
            that._doButtonServerEventArgsResultString = messageJsonString;
            if (buttonJson["buttonClientEventArgs"] != '')
            {
                var c = buttonJson["buttonClientEventArgs"];
                c = c.split( '(' )[0];
                c = eval( c );
                if(typeof(c) == "function")
                {
                    c( callBackFunction );
                }
                else
                {
                    _blockMessage.show( '未定义的' + buttonJson["buttonClientEventArgs"], 'fail' );
                }
            }
            else
            {
                callBackFunction.success();
            }
        },
        //外部可调用-根据grid的绑定情况，设置按钮的显示情况
        setButtonVisiblity: function (gridCount)
        {
            var buttinIdArray = that._buttonHashMap.keys();
            $.each(buttinIdArray, function (i, u)
            {
                var buttonJson = that._buttonHashMap.get(buttinIdArray[i]);
                if (buttonJson['buttonIsMustData'] == 'true' && gridCount == 0)
                {
                    $('#' + buttinIdArray[i]).css('display', 'none');
                }
                else
                {
                    $('#' + buttinIdArray[i]).css('display', '');
                }
            });
        },
        //按钮操作执行完成最后的js方法
        btn_command_complete: function (callBackFunction)
        {

            if (that._nextUserNamesString != '')
            {

                    //此处可能引用对应的list、detail中的程序
                    switch (that._currentType)
                    {
                        case "list":

                            tblMainTableListObj.bindGrid({
                                success: function ()
                                {
                                    tblMainTableListObj.btn_command_clearselect_onclick();
                                    if (callBackFunction != undefined)
                                    {
                                        callBackFunction.success();
                                    }
                                }
                            });
                            break;
                        case "detail":
                        $('#div_btn_command_tbl_maintable_button').addClass('hidden');
                        _alertMessage.show('<small>转件操作完成!<br/>该案卷已推送给：</small><br/><h2>' + that._nextUserNamesString + '<h2/><small>3秒钟后自动跳转。</small>', 'success', 3000);
                        setTimeout(function ()
                        {
                            tblMainTableDetailAllObject.btn_command_cancle_onclick();
                            if (callBackFunction != undefined)
                            {
                                callBackFunction.success();
                            }
                        }, 3000);
                            break;
                    }

            }
            else
            {

                //此处可能引用对应的list、detail中的程序
                switch (that._currentType)
                {
                    case "list":
                        tblMainTableListObj.bindGrid({
                            success: function ()
                            {
                                tblMainTableListObj.btn_command_clearselect_onclick();
                                if (callBackFunction != undefined)
                                {
                                    callBackFunction.success();
                                }
                            }
                        });
                        break;
                    case "detail":
                        tblMainTableDetailAllObject.btn_command_cancle_onclick();
                        if (callBackFunction != undefined)
                        {
                            callBackFunction.success();
                        }
                        break;
                }
            }
        },


        //========================workflow====================

        _ladda_btn_workflow_modal_start: null,
        _ladda_btn_workflow_modal_send: null,
        _userHashMap: null,
        _operationHashMap: null,
        _selected_zuId: '',


        //工作流审核按钮被触发后响应的js事件
        btn_command_startworkflow: function ()
        {
            ////;
            var userOperationJsonArray = (new Function("", "return " + that._doButtonServerEventArgsResultString))();
            ////===特例代码，分析projclass;
            //==sk-2018-10-08-
            //if (userOperationJsonArray[0]["fk_dy_lc_sys_id"] == "540008")
            //{
            //    if (tbl_ld_xzsb_detail_Obj != undefined)
            //    {
            //        tbl_ld_xzsb_detail_Obj.save({
            //            success: function ()
            //            {
            //                tbl_ld_xzsb_detail_Obj.disabled();
            //            }
            //        });
            //    }
            //}
            var obj = null;
            switch (userOperationJsonArray[0]["fk_dy_lc_sys_id"])
            {
                case "540003"://新增水表居民
                    try
                    {
                        obj = tbl_ld_xzsb_detail_Obj;
                    }
                    catch (ex)
                    {
                    }
                    if (obj != undefined)
                    {
                        obj.save({
                            success: function ()
                            {
                                obj.disabled();
            that.initWorkflowModal(userOperationJsonArray, {
                success: function ()
                {
                    $('#div_workflow_modal_tbl_maintable_button').modal('show');
                }
            });
                            }
                        });
                        that._ladda_current_btn_command.stop();
                    } else
                    {
                        that.initWorkflowModal(userOperationJsonArray, {
                            success: function ()
                            {
                                $('#div_workflow_modal_tbl_maintable_button').modal('show');
                            }
                        });
                    }
                    break;
                case "540008"://新增水表大客户
                    try
                    {
                        obj = tbl_ld_xzsb_detail_Obj;
                    }
                    catch (ex)
                    {
                    }
                    if (obj != null)
                    {
                        obj.save({
                            success: function ()
                            {
                                obj.disabled();
                                that.initWorkflowModal(userOperationJsonArray, {
                                    success: function ()
                                    {
                                        $('#div_workflow_modal_tbl_maintable_button').modal('show');
                                    }
                                });
                            }
                        });
                        that._ladda_current_btn_command.stop();
                    } else
                    {
                        that.initWorkflowModal(userOperationJsonArray, {
                            success: function ()
                            {
                                $('#div_workflow_modal_tbl_maintable_button').modal('show');
                            }
                        });
                    }
                    break;
                case "540004"://大客户立户
                    try
                    {
                        obj = tbl_ld_dyhlh_detail_Obj;
                    }
                    catch (ex)
                    {
                    }
                    if (obj != null)
                    {
                        obj.save({
                            success: function ()
                            {
                                obj.disabled();
                                that.initWorkflowModal(userOperationJsonArray, {
                                    success: function ()
                                    {
                                        $('#div_workflow_modal_tbl_maintable_button').modal('show');
                                    }
                                });
                            }
                        });
                        that._ladda_current_btn_command.stop();
                    } else
                    {
                        that.initWorkflowModal(userOperationJsonArray, {
                            success: function ()
                            {
                                $('#div_workflow_modal_tbl_maintable_button').modal('show');
                            }
                        });
                    }
                    break;
                case "540009"://更换水表居民
                    try
                    {
                        obj = tbl_ld_ghsb_detail_Obj;
                    }
                    catch (ex)
                    {
                    }
                    if (obj != null)
                    {
                        obj.save({
                            success: function ()
                            {
                                obj.disabled();
                                that.initWorkflowModal(userOperationJsonArray, {
                                    success: function ()
                                    {
                                        $('#div_workflow_modal_tbl_maintable_button').modal('show');
                                    }
                                });
                            }
                        });
                        that._ladda_current_btn_command.stop();
                    } else
                        {
                                that.initWorkflowModal(userOperationJsonArray, {
                                    success: function ()
                                    {
                                        $('#div_workflow_modal_tbl_maintable_button').modal('show');

                            }

                        });
                    }
                    break;
                case "540010"://更换水表大客户
                    try
                    {
                        obj = tbl_ld_ghsb_detail_Obj;
                                    }
                    catch (ex)
                    {

                    }
                    if (obj != null)
                    {
                        obj.save({
                            success: function ()
                            {
                                obj.disabled();
                                that.initWorkflowModal(userOperationJsonArray, {
                                    success: function ()
                                    {
                                        $('#div_workflow_modal_tbl_maintable_button').modal('show');
                                    }
                                });
                            }
                        });
                        that._ladda_current_btn_command.stop();
                    } else
                    {
                                that.initWorkflowModal(userOperationJsonArray, {
                            success: function ()
                            {
                                        $('#div_workflow_modal_tbl_maintable_button').modal('show');
                                    }
                                });
                           
                    }
                    break;
                case "540006"://用户销户大客户
                    try
                    {
                        obj = tbl_ld_xhhbt_detail_Obj;
                    }
                    catch (ex)
                    {
                    }
                    if (obj != null)
                    {
                        obj.save({
                            success: function ()
                            {
                                obj.disabled();
                                that.initWorkflowModal(userOperationJsonArray, {
                                    success: function ()
                                    {
                                        $('#div_workflow_modal_tbl_maintable_button').modal('show');
                                    }
                                });
                            }
                        });
                        that._ladda_current_btn_command.stop();
                    } else
                    {
                        that.initWorkflowModal(userOperationJsonArray, {
                            success: function ()
                            {
                                $('#div_workflow_modal_tbl_maintable_button').modal('show');
                            }
                        });
                    }
                    break;
                case "540007"://用户报停大客户
                    try
                    {
                        obj = tbl_ld_xhhbt_detail_Obj;
                    }
                    catch (ex)
                    {
                    }
                    if (obj != null)
                    {
                        obj.save({
                            success: function ()
                            {
                                obj.disabled();
                                that.initWorkflowModal(userOperationJsonArray, {
                                    success: function ()
                                    {
                                        $('#div_workflow_modal_tbl_maintable_button').modal('show');
                                    }
                                });
                            }
                        });
                        that._ladda_current_btn_command.stop();
                  
                    } else
                    {
            that.initWorkflowModal(userOperationJsonArray, {
                            success: function ()
                            {
                    $('#div_workflow_modal_tbl_maintable_button').modal('show');
                            }
                        });

                    }
                    break;
                default:
                    that.initWorkflowModal(userOperationJsonArray, {
                        success: function ()
                        {
                            $('#div_workflow_modal_tbl_maintable_button').modal('show');
                        }
                    });
                    break;
            }
            //that.initWorkflowModal(userOperationJsonArray, {
            //    success: function ()
            //    {
            //        $('#div_workflow_modal_tbl_maintable_button').modal('show');
            //    }
            //});


            //按钮显示
            $('#btn_workflow_modal_start_tbl_maintable_button').css('display', '');
            $('#btn_workflow_modal_send_tbl_maintable_button').css('display', 'none');
        },
        //工作流转件按钮被触发后响应的js事件
        btn_command_sendworkflow: function ()
        {
            var userOperationJsonArray = (new Function("", "return " + that._doButtonServerEventArgsResultString))();
            if (userOperationJsonArray[0]["fk_dy_lc_sys_id"] == "540004")
            {
                if (tbl_ld_dyhlh_detail_Obj != undefined)
                {
                    tbl_ld_dyhlh_detail_Obj.save({
                        success: function ()
                        {
                            tbl_ld_dyhlh_detail_Obj.disabled();
            that.initWorkflowModal(userOperationJsonArray, {
                success: function ()
                {
                    $('#div_workflow_modal_tbl_maintable_button').modal('show');
                                }
                            });
                        }
                    });
                    that._ladda_current_btn_command.stop();
                }
            } else
            {
                that.initWorkflowModal(userOperationJsonArray, {
                    success: function ()
                    {
                        $('#div_workflow_modal_tbl_maintable_button').modal('show');
                    }
            });
            }

            //按钮显示
            $('#btn_workflow_modal_start_tbl_maintable_button').css('display', 'none');
            $('#btn_workflow_modal_send_tbl_maintable_button').css('display', '');
        },
        //初始化工作流专用modal
        initWorkflowModal: function (userOperationJsonArray, callBackFunction)
        {
            //操作人
            controlObj.text('workflow_text_czr_tbl_maintable_button', basePageObj._userInfoJson.sys_username);
            controlObj.text('workflow_text_czrid_tbl_maintable_button', basePageObj._userInfoJson.sys_username);
            controlObj.textdisable('workflow_text_czr_tbl_maintable_button', true);

            //操作时间
            var d = new Date();
            controlObj.datetimeinit('workflow_datetime_czrq_tbl_maintable_button_date', 'workflow_datetime_czrq_tbl_maintable_button_time');
            controlObj.datetime('workflow_datetime_czrq_tbl_maintable_button_date', 'workflow_datetime_czrq_tbl_maintable_button_time', d.Format('yyyy-MM-dd hh:mm:ss'));
            controlObj.datetimedisable('workflow_datetime_czrq_tbl_maintable_button_date', 'workflow_datetime_czrq_tbl_maintable_button_time', true);

            //审核意见
            controlObj.text('workflow_txt_shyj_tbl_maintable_button', '已阅');


            //审核意见列表

            var resultArray = [
                   { id: '0', text: '请领导审核。' },
                   { id: '1', text: '请领导审批。' },
                   { id: '2', text: '同意。' },
                   { id: '3', text: '拟同意。' },
                   { id: '4', text: '请领导阅示。' },
                   { id: '5', text: '阅。' },
                   { id: '6', text: '已阅。' }
            ];

            controlObj.radiolistinit('workflow_list_shyjlb_tbl_maintable_button', resultArray, that.clickWorkflow_list_shyjlb_onclick, { width: 100 });

            //if (!that._controlHashMap.containsKey('workflow_list_shyjlb_tbl_maintable_button'))
            //{
            //    var resultArray = [
            //        { id: '0', text: '请领导审核。' },
            //        { id: '1', text: '请领导审批。' },
            //        { id: '2', text: '同意。' },
            //        { id: '3', text: '拟同意。' },
            //        { id: '4', text: '请领导阅示。' },
            //        { id: '5', text: '阅。' },
            //        { id: '6', text: '已阅。' }
            //    ];               
            //    //var workflow_list_shyjlb = controlObj.listinit('workflow_list_shyjlb_tbl_maintable_button', 'radiolist', resultArray, 'tblMainTableButtonObj.clickWorkflow_list_shyjlb_onclick', { width: 100 });
            //    //that._controlHashMap.put('workflow_list_shyjlb_tbl_maintable_button', workflow_list_shyjlb);

            //    var workflow_list_shyjlb = controlObj.radiolistinit('workflow_list_shyjlb_tbl_maintable_button', resultArray, that.clickWorkflow_list_shyjlb_onclick, { width: 100 });
            //}
            //else
            //{
            //    //controlObj.listid('workflow_list_shyjlb_tbl_maintable_button', '');
            //    controlObj.radiolistid('workflow_list_shyjlb_tbl_maintable_button', '');
            //}

            //========================userOperation===================
            //==================初始化数据===useroperation
            var zuArray = [];
            var zhHashMap = new hashMap();
            that._userHashMap = new hashMap();
            that._operationHashMap = new hashMap();

            //对userOperationJsonArray按照sys_id进行排序,有助于defaultzuid的获取
            userOperationJsonArray.sort(function (a, b)
            {
                if (Number(a.operation_class_id) > Number(b.operation_class_id))
                {
                    return 1;
                }
                else
                {
                    return -1;
                }
            });

            var defaultZuId = '';
            $.each(userOperationJsonArray, function (i, u)
            {

                switch (userOperationJsonArray[i].operation_class_id)
                {
                    case "0":
                    case "1":
                    case "2":
                    case "5":
                    case "6":
                    case "7":
                    case "9":
                        if (!zhHashMap.containsKey('0'))
                        {
                            zuArray.push({ zuId: '0', zuText: '通过' });
                        }
                        zhHashMap = that.toolPushObjectInHashMapArray(zhHashMap, '0', userOperationJsonArray[i].sys_id);
                        userOperationJsonArray[i].zuid = '0';
                        userOperationJsonArray[i].zuname = '通过';
                        break;
                    case "3":
                    case "8":

                        if (!zhHashMap.containsKey('1'))
                        {
                            zuArray.push({ zuId: '1', zuText: '退回' });
                        }
                        zhHashMap = that.toolPushObjectInHashMapArray(zhHashMap, '1', userOperationJsonArray[i].sys_id);
                        userOperationJsonArray[i].zuid = '1';
                        userOperationJsonArray[i].zuname = '退回';
                        break;
                    case "4":

                        if (!zhHashMap.containsKey('2'))
                        {
                            zuArray.push({ zuId: '2', zuText: '驳回' });
                        }
                        zhHashMap = that.toolPushObjectInHashMapArray(zhHashMap, '2', userOperationJsonArray[i].sys_id);
                        userOperationJsonArray[i].zuid = '2';
                        userOperationJsonArray[i].zuname = '驳回';
                        break;
                    case "10":

                        if (!zhHashMap.containsKey('3'))
                        {
                            zuArray.push({ zuId: '3', zuText: '返回' });
                        }
                        zhHashMap = that.toolPushObjectInHashMapArray(zhHashMap, '3', userOperationJsonArray[i].sys_id);
                        userOperationJsonArray[i].zuid = '3';
                        userOperationJsonArray[i].zuname = '返回';
                        break;
                }

                if (userOperationJsonArray[i].iselected == '+0')
                {
                    if (defaultZuId == '')
                    {
                        defaultZuId = userOperationJsonArray[i].zuid;
                    }
                }

                //对选中情况进行格式化。
                switch (userOperationJsonArray[i].iselected)
                {
                    case "0":
                        userOperationJsonArray[i].iselected = '0';
                        break;
                    case "+0":
                        userOperationJsonArray[i].iselected = '0';
                        break;
                    case "1":
                        userOperationJsonArray[i].iselected = '0';
                        break;
                    case "+1":
                        userOperationJsonArray[i].iselected = '0';
                        break;
                    case "-1":
                        userOperationJsonArray[i].iselected = '-1';
                        break;
                    case "-2":
                        userOperationJsonArray[i].iselected = '-1';
                        break;
                }

                //构造选择用户的数据源
                var usersArray = [];
                var useridsArray = userOperationJsonArray[i].userids.split(',')
                var usernamesArray = userOperationJsonArray[i].usernames.split(',')
                $.each(useridsArray, function (ii, uu)
                {
                    usersArray.push({ id: useridsArray[ii].replaceAll('-', ''), text: usernamesArray[ii].replaceAll('-', '') });
                });

                that._userHashMap.put(userOperationJsonArray[i].sys_id, usersArray);

                //构造大排行数据
                that._operationHashMap.put(userOperationJsonArray[i].sys_id, userOperationJsonArray[i]);
            });

            //对zuArray按照zuId进行排序,决定tab页的顺序,退回在左侧
            zuArray.sort(function (a, b)
            {
                if (Number(a.zuId) > Number(b.zuId))
                {
                    return -1;
                }
                else
                {
                    return 1;
                }
            });

            if (defaultZuId == '')
            {
                var arr = $.grep(userOperationJsonArray, function (n, i)
                {
                    return n.iselected == '0' && n.zuid == '0';
                });

                if (arr.length > 0)
                {
                    defaultZuId = arr[0].zuid;
                }
                else
                {
                    defaultZuId = userOperationJsonArray[0].zuid;
                }
            }

            //==================根据初始化数据结果（zuArray）生成框架，根据zhHashMap生成table
            var tabString = '';
            var contentString = '';


            $.each(zuArray, function (i, u)
            {
                //设计默认选中项
                var isActive = false;

                if (defaultZuId != '')
                {
                    if (defaultZuId == zuArray[i].zuId)
                    {
                        isActive = true;
                    }
                }
                else
                {
                    if (i == 0)
                    {
                        isActive = true;
                    }
                }

                //=============================标签start=====================
                if (isActive)
                {
                    tabString += '<li class="active">';
                    that._selected_zuId = zuArray[i].zuId;
                }
                else
                {
                    tabString += '<li>';
                }




                if (zuArray[i].zuId == '0')
                {
                    tabString += '<a href="#div_content_workflow_useroperation_' + zuArray[i].zuId + '_tbl_maintable_button" class="a-color-success-tbl-maintable-button"  data-toggle="tab">';
                    tabString += zuArray[i].zuText;
                    tabString += '<i class="glyphicon glyphicon-chevron-right font-color-success-tbl-maintable-button"></i>';
                }
                else
                {
                    tabString += '<a href="#div_content_workflow_useroperation_' + zuArray[i].zuId + '_tbl_maintable_button" class="a-color-danger-tbl-maintable-button"  data-toggle="tab">';
                    tabString += '<i class="glyphicon glyphicon-chevron-left font-color-danger-tbl-maintable-button"></i>';
                    tabString += zuArray[i].zuText;
                }


                tabString += '</a>';
                tabString += '</li>';

                //=============================标签end=====================

                //=============================内容start=====================
                //=============================内容-框架start=====================
                contentString += '<div id="div_content_workflow_useroperation_' + zuArray[i].zuId + '_tbl_maintable_button"';
                if (isActive)
                {
                    contentString += 'class="tab-pane fade in active">';
                }
                else
                {
                    contentString += 'class="tab-pane fade ">';
                }
                //=============================内容-内容集合=====================
                contentString += '<div class="row div-row-useroperation-tbl-maintable-button">';

                var zuSysIdArray = zhHashMap.get(zuArray[i].zuId);
                contentString += that.toolCreatUserOperationCard(zuArray[i].zuId, zuSysIdArray);
                //=============================内容-框架end=====================
                contentString += '</div>';
                //=============================内容end=====================
                contentString += '</div>';
            });

            $('#ul_workflow_useroperation_tbl_maintable_button').html(tabString);
            $('#div_workflow_useroperation_tbl_maintable_button').html(contentString);

            //==================对生成的控件进行绑定
            //循环初始化下拉控件    
            that.toolBindControl();
            //实现tab页切换功能
            $('#ul_workflow_useroperation_tbl_maintable_button a').click(function (e)
            {
                e.preventDefault();
                $(this).tab('show')
                that._selected_zuId = $(this)[0].hash.split('_')[4];

            });


            //==================回调======================
            callBackFunction.success();
        },
        //创建operation的html
        toolCreatUserOperationCard: function (zuId, zuSysIdArray)
        {
            var contentString = '';

            $.each(zuSysIdArray, function (i, u)
            {
                var operation = that._operationHashMap.get(zuSysIdArray[i]);



                //=============================内容-单个内容-start=====================
                contentString += '<div class="col-lg-3 ">';

                var color = 'color-success';
                if (zuId != '0')
                {
                    color = 'clolr-danger';
                }

                contentString += '<div id="div_workflow_well_' + zuId + '_' + operation.sys_id + '_tbl_maintable_button" class="well0-tbl-maintable-button ' + color + '">';


                //=============================内容-单个内容-第一行-start=====================



                contentString += '<table>';

                contentString += '<tr>';

                contentString += '<td class="td-left-tbl-maintable-button">';
                if (operation.operation_class_id != '7')
                {
                    contentString += '<h3 class="hand" onclick="tblMainTableButtonObj.clickWorkflow_a_onclick(\'' + zuId + '\',\'' + operation.sys_id + '\')">';
                }
                else
                {
                    contentString += '<h3>';
                }

                contentString += '<strong>' + operation.ljxslmc + '</strong>';
                contentString += '</h3>';
                contentString += '</td>';

                contentString += '<td  class="td-right-tbl-maintable-button">';

                if (operation.operation_class_id != '7')
                {
                    contentString += '<a class="hand"  onclick="tblMainTableButtonObj.clickWorkflow_a_onclick(\'' + zuId + '\',\'' + operation.sys_id + '\')" title="选中">';
                    contentString += '<i class="glyphicon glyphicon-ok-sign"></i>';
                    contentString += '</a>';
                }


                contentString += '</td>';
                contentString += '</tr>';
                contentString += '</table>';
                //=============================内容-单个内容-第一行-end=====================
                //=============================内容-单个内容-第二行-start=====================
                contentString += '<div id="div_workflow_dropdown_' + zuId + '_' + operation.sys_id + '_tbl_maintable_button" class="form-group">';
                contentString += '<label for="workflow_dropdown_' + zuId + '_' + operation.sys_id + '_tbl_maintable_button" class="control-label">待办人<i class="icon-exclamation-sign hand hidden"></i></label>';
                contentString += '<input type="hidden" id="workflow_dropdown_' + zuId + '_' + operation.sys_id + '_tbl_maintable_button" />';
                contentString += '</div>';
                //=============================内容-单个内容-第二行-end=====================

                contentString += '</div>';
                contentString += '</div>';
                //=============================内容-单个内容-end=====================

            })

            return contentString;
        },
        //绑定接收人列表，并设定默认值
        toolBindControl: function ()
        {
            var sysIdArray = that._operationHashMap.keys();

            $.each(sysIdArray, function (i, u)
            {
                var operation = that._operationHashMap.get(sysIdArray[i]);
                var usersArray = that._userHashMap.get(sysIdArray[i]);
                controlObj.multidropdownlistinit('workflow_dropdown_' + operation.zuid + '_' + sysIdArray[i] + '_tbl_maintable_button', usersArray, that.clickWorkflow_dropdown_onchange);

                var ccdd = operation.userids.split(',');
                var selectedUserids = '';
                $.each(ccdd, function (ii, uu)
                {
                    if (ccdd[ii].indexOf('-') > -1)
                    {

                    }
                    else
                    {
                        selectedUserids += ccdd[ii] + ',';
                    }
                })

                controlObj.multidropdownlistid('workflow_dropdown_' + operation.zuid + '_' + sysIdArray[i] + '_tbl_maintable_button', selectedUserids.trimEnd(','));

                //
                var $e = $('#div_workflow_well_' + operation.zuid + '_' + sysIdArray[i] + '_tbl_maintable_button');
                if (operation.iselected == '0')
                {
                    if (operation.zuid == '0')
                    {
                        $e.attr('class', 'well0-tbl-maintable-button color-success');
                    }
                    else
                    {
                        $e.attr('class', 'well0-tbl-maintable-button color-danger');
                    }

                    controlObj.multidropdownlistdisable('workflow_dropdown_' + operation.zuid + '_' + sysIdArray[i] + '_tbl_maintable_button', false);
                }
                else//-1
                {
                    $e.attr('class', 'well-1-tbl-maintable-button');
                    controlObj.multidropdownlistdisable('workflow_dropdown_' + operation.zuid + '_' + sysIdArray[i] + '_tbl_maintable_button', true);
                }
            });
        },
        //user选择事件
        clickWorkflow_dropdown_onchange: function (changeEventParameter)
        {
            //修改用户选中情况
            //有先后顺序

            ////workflow_dropdown_' + zuId + '_' + operation.sys_id + '_tbl_maintable_button
            //var controlidArray = changeEventParameter.currentTarget.id.split('_');

            //var zuid = controlidArray[2];
            //var sys_id = controlidArray[3];
            //var selectids = changeEventParameter.val.toString();



            //var newuserids = selectids;
            //var newusernames = '';
            //var useridsArray = that._userHashMap.get(sys_id);
            //$.each(useridsArray, function (i, u)
            //{
            //    if ((',' + newuserids + ',').indexOf(',' + useridsArray[i].id + ',') > -1)
            //    {
            //        newusernames += ',' + useridsArray[i].text;
            //    }
            //    else
            //    {
            //        newuserids += ',-' + useridsArray[i].id;
            //        newusernames += ',-' + useridsArray[i].text;
            //    }

            //})
            //that._operationHashMap.get(sys_id).userids = newuserids.trimStartEnd(',');
            //that._operationHashMap.get(sys_id).usernames = newusernames.trimStartEnd(',');

            // //;
            var controlidArray = changeEventParameter.currentTarget.id.split('_');
            var zuid = controlidArray[2];
            var sys_id = controlidArray[3];
            // //;
            var selectUserIdArray = changeEventParameter.val;

            var unSelectUserIdString = that._operationHashMap.get(sys_id).userids.replaceAll('-', '') + ',';
            var oldUserIdArray = that._operationHashMap.get(sys_id).userids.replaceAll('-', '').split(',');
            var oldUserNameArray = that._operationHashMap.get(sys_id).usernames.replaceAll('-', '').split(',');
            var oldUserHashMap = new hashMap();
            for (var i = 0; i < oldUserIdArray.length; i++)
            {
                oldUserHashMap.put(oldUserIdArray[i], oldUserNameArray[i]);
            }

            var selectUserIds = '';
            var selectUserNames = '';
            for (var i = 0; i < selectUserIdArray.length; i++)
            {
                selectUserIds += selectUserIdArray[i] + ',';
                selectUserNames += oldUserHashMap.get(selectUserIdArray[i]) + ',';
                unSelectUserIdString = unSelectUserIdString.replaceAll((selectUserIdArray[i] + ','), '');
            }

            //把没有的选中的user信息，用符号补充到字符串中;

            var unSelectUserIdArray = unSelectUserIdString.split(',');
            for (var i = 0; i < unSelectUserIdArray.length; i++)
            {
                if (unSelectUserIdArray[i] != '')
                {
                    selectUserIds += '-' + unSelectUserIdArray[i] + ',';
                    selectUserNames += '-' + oldUserHashMap.get(unSelectUserIdArray[i]) + ',';
                }
            }

            //赋值
            that._operationHashMap.get(sys_id).userids = selectUserIds.trimStartEnd(',');
            that._operationHashMap.get(sys_id).usernames = selectUserNames.trimStartEnd(',');

            //alert(that._operationHashMap.get(sys_id).userids + '_' + that._operationHashMap.get(sys_id).usernames);
        },
        //operation选择事件
        clickWorkflow_a_onclick: function (zuid, sys_id)
        {
            var operation = that._operationHashMap.get(sys_id);

            if (operation.operation_class_id == '7')//远程连接线不可以操作
            {

            }
            else
            {
                var $e = $('#div_workflow_well_' + zuid + '_' + sys_id + '_tbl_maintable_button');
                if (operation.iselected == '0')
                {
                    $e.attr('class', 'well-1-tbl-maintable-button');
                    controlObj.multidropdownlistdisable('workflow_dropdown_' + zuid + '_' + sys_id + '_tbl_maintable_button', true);
                    //修改连接线的选中情况--未选中
                    operation.iselected = '-1';
                }
                else
                {
                    if (operation.zuid == '0')
                    {
                        $e.attr('class', 'well0-tbl-maintable-button color-success');
                    }
                    else
                    {
                        $e.attr('class', 'well0-tbl-maintable-button color-danger');
                    }

                    controlObj.multidropdownlistdisable('workflow_dropdown_' + zuid + '_' + sys_id + '_tbl_maintable_button', false);
                    //修改连接线的选中情况--选中
                    operation.iselected = '0';
                }
            }
        },
        //备选审核意见的选中事件
        clickWorkflow_list_shyjlb_onclick: function ()
        {
            //$('#workflow_txt_shyj_tbl_maintable_button').val(controlObj.list('workflow_list_shyjlb_tbl_maintable_button'));
            $('#workflow_txt_shyj_tbl_maintable_button').val(controlObj.radiolist('workflow_list_shyjlb_tbl_maintable_button'));
        },
        //start按钮的事件
        btn_workflow_modal_start_onclick: function ()
        {
            that._ladda_btn_workflow_modal_start.start();


            //==================0、获取数据

            //resultArray
            var resultArray = that.toolResultArray();
            //流程定义ID
            var processdefidString = resultArray[0].fk_dy_lc_sys_id;
            //maintablesysid
            var tbl_maintable_sys_id = that.toolGetTblMaintableSysId();//maintableID       
            //==================1、校验
            var isChecked = that.toolCheckUserOperation(resultArray, 'start');

            if (!isChecked)
            {
                //==============2、校验不通过
                that._ladda_btn_workflow_modal_start.stop();
            }
            else
            {

                //==================3、校验通过
                //==================5、调用webservice
                var parameterJson = {
                    sysUserIdString: basePageObj._userInfoJson.sys_userid,
                    mainTableSysidString: tbl_maintable_sys_id,
                    projectClassIdString: _pr_projectClassId,
                    projectClassDtl1String: _pr_projectClassDtl1,
                    projectClassDtl2String: _pr_projectClassDtl2,
                    buttonIdString: that._currentButtonJson['buttonId'],
                    eventArgsString: that._currentButtonJson["buttonServerEventArgs"],
                    processdefidString: processdefidString,
                    czrIdString: basePageObj._userInfoJson.sys_userid,
                    czrNameString: basePageObj._userInfoJson.sys_username,
                    shyjString: controlObj.text('workflow_txt_shyj_tbl_maintable_button').formatStringRN(),
                    userOperationString: resultArray
                };

                var data = {
                    parameterJsonString: JSON.stringify(parameterJson),
                    clientInf: _clientInf
                };


                doAjaxFunction(that._serviceUrl_tbl_maintable_detailall, 'DoStartWorkflow', data, {
                    success: function (message)
                    {
                        that.toolWorkFlowNextUserNameString(resultArray);
                        //==================6、执行完成
                        //此时的message没有内容
                        $('#div_workflow_modal_tbl_maintable_button').modal('hide');
                        that._ladda_current_btn_command.stop();
                        that._currentButtonJson = null;
                        that._ladda_btn_workflow_modal_start.stop();

                        that.btn_command_complete();

                    },
                    fail: function (message)
                    {
                        //==================7、执行未完成
                        $('#div_workflow_modal_tbl_maintable_button').modal('hide');

                        that._ladda_current_btn_command.stop();
                        that._currentButtonJson = null;
                        that._ladda_btn_workflow_modal_start.stop();

                        if (message != '')
                        {
                            _resultMessage.message(message);
                            _resultMessage.show();
                        }
                    },
                    error: function (message)
                    {
                        _blockMessage.show(that._serviceUrl_tbl_maintable_detailall + 'DoStartWorkflow<br/>' + message, 'fail');
                    }
                });
            }
        },
        //send按钮的事件
        btn_workflow_modal_send_onclick: function ()
        {
            that._ladda_btn_workflow_modal_send.start();
            //resultArray
            var resultArray = that.toolResultArray();

            //maintablesysid
            var tbl_maintable_sys_id = that.toolGetTblMaintableSysId();
            //==================1、校验
            var isChecked = that.toolCheckUserOperation(resultArray, 'send');



            if (!isChecked)
            {
                //==============2、校验不通过
                that._ladda_btn_workflow_modal_send.stop();
            }
            else
            {
                //==================3、校验通过

                //==================4、流程是否结束
                var workflowOverString = '0';
                //验证当前选中的是否是结束连接线
                var arr = $.grep(resultArray, function (n, i)
                {
                    return n.iselected == '0' && ((',2,').indexOf(',' + n.operation_class_id + ',') > -1);
                });
                if (arr.length > 0)
                {
                    workflowOverString = '1';
                }
                //验证当前选中的是否是驳回连接线
                var arr = $.grep(resultArray, function (n, i)
                {
                    return n.iselected == '0' && ((',4,').indexOf(',' + n.operation_class_id + ',') > -1);
                });
                if (arr.length > 0)
                {
                    workflowOverString = '2';
                }

                //==================5、调用webservice
                var parameterJson = {
                    sysUserIdString: basePageObj._userInfoJson.sys_userid,
                    mainTableSysidString: tbl_maintable_sys_id,
                    projectClassIdString: _pr_projectClassId,
                    projectClassDtl1String: _pr_projectClassDtl1,
                    projectClassDtl2String: _pr_projectClassDtl2,
                    buttonIdString: that._currentButtonJson['buttonId'],
                    eventArgsString: that._currentButtonJson["buttonServerEventArgs"],
                    workItemIdString: _pr_workItemIdString,
                    processDefIdString: _pr_processDefIdString,
                    activityDefIdString: _pr_activityDefIdString,
                    processInsIdString: _pr_processInsIdString,
                    czrIdString: basePageObj._userInfoJson.sys_userid,
                    czrNameString: basePageObj._userInfoJson.sys_username,
                    shyjString: controlObj.text('workflow_txt_shyj_tbl_maintable_button').formatStringRN(),
                    workflowOverString: workflowOverString,
                    userOperationString: resultArray
                };

                var data = {
                    parameterJsonString: JSON.stringify(parameterJson),
                    clientInf: _clientInf
                };



                doAjaxFunction(that._serviceUrl_tbl_maintable_detailall, 'DoSendWorkflow', data, {
                    success: function (message)
                    {
                        that.toolWorkFlowNextUserNameString(resultArray);
                        //==================6、执行完成
                        //此时的message没有内容
                        $('#div_workflow_modal_tbl_maintable_button').modal('hide');
                        that._ladda_current_btn_command.stop();
                        that._currentButtonJson = null;
                        that._ladda_btn_workflow_modal_send.stop();

                        that.btn_command_complete();

                    },
                    fail: function (message)
                    {
                        //==================7、执行未完成
                        $('#div_workflow_modal_tbl_maintable_button').modal('hide');

                        that._ladda_current_btn_command.stop();
                        that._currentButtonJson = null;
                        that._ladda_btn_workflow_modal_send.stop();

                        if (message != '')
                        {
                            _resultMessage.message(message);
                            _resultMessage.show();
                        }
                    },
                    error: function (message)
                    {
                        _blockMessage.show(that._serviceUrl_tbl_maintable_detailall + 'DoSendWorkflow<br/>' + message, 'fail');
                    }
                });
            }
        },
        //获取数据
        toolResultArray: function ()
        {
            var resultArray = [];
            // //;
            var keyArray = that._operationHashMap.keys();
            $.each(keyArray, function (i, u)
            {
                var json = that._operationHashMap.get(keyArray[i]);
                json.userids = json.userids;
                json.usernames = json.usernames;
                //如果当前的tab页没有被选中，则其下的所有连接线都不被选中。
                if (json.zuid != that._selected_zuId)
                {
                    json.iselected = '-1';
                }
                else
                {
                    //判断页面的情况获取数据
                    var classString = $('#div_workflow_well_' + json.zuid + '_' + json.sys_id + '_tbl_maintable_button').attr('class');
                    if (classString.indexOf('well0') > -1 && json.iselected == '-1')//页面选中，但是数据没有记录
                    {
                        json.iselected = '0';
                    }
                    else if (classString.indexOf('well-1') > -1 && json.iselected == '0')//未选中，但是数据没有记录
                    {
                        json.iselected = '-1';
                    }
                }
                resultArray.push(json);
            });

            return resultArray;
        },
        //校验数据
        toolCheckUserOperation: function (resultArray, typeString)
        {
            var validateMessage = null;
            switch (typeString)
            {
                case "start":
                    validateMessage = that._validateMessage_div_workflow_modal_start;
                    break;
                case "send":
                    validateMessage = that._validateMessage_div_workflow_modal_send;
                    break;
                default:
                    break;
            }

            validateMessage.hidden();
            //============1、校验
            var errorMessageHansMap = new hashMap();
            var errorMessagePlacementHansMap = new hashMap();



            //==============校验代码

            //审核意见不能为空
            if (controlObj.text('workflow_txt_shyj_tbl_maintable_button').length == 0)
            {
                errorMessageHansMap.put('workflow_txt_shyj_tbl_maintable_button', '审核意见不能为空。');
            }

            //被选中的连接线中，除远程连接线外至少选择一条连接线    
            var arr = $.grep(resultArray, function (n, i)
            {
                return n.iselected == '0' && ((',0,1,2,3,4,5,6,8,9,10').indexOf(',' + n.operation_class_id + ',') > -1);
            });
            if (arr.length <= 0)
            {
                errorMessageHansMap.put('ul_workflow_useroperation_tbl_maintable_button', '除远程连接线，至少选择一条连接线。');
            }
            //如果选择退回连接线，则只能选择一条
            var arr = $.grep(resultArray, function (n, i)
            {
                return n.iselected == '0' && ((',3,').indexOf(',' + n.operation_class_id + ',') > -1);
            });
            if (arr.length > 1)
            {
                errorMessageHansMap.put('ul_workflow_useroperation_tbl_maintable_button', '如果选择退回连接线，则只能选择一条。');
            }
            //开始连接线只能选择一条
            var arr = $.grep(resultArray, function (n, i)
            {
                return n.iselected == '0' && ((',1,').indexOf(',' + n.operation_class_id + ',') > -1);
            });
            if (arr.length > 1)
            {
                errorMessageHansMap.put('ul_workflow_useroperation_tbl_maintable_button', '如果开始连接线，则只能选择一条。');
            }

            //验证选中的连接线中的用户情况
            //被选中的连接线
            var arr = $.grep(resultArray, function (n, i)
            {
                return n.iselected == '0';
            });

            $.each(arr, function (i, u)
            {

                //计算用户选中情况
                var useridsArray = arr[i].userids.split(',');
                var selectedUserIdCount = 0;
                var unSelectedUserIdCount = 0;
                ////;
                $.each(useridsArray, function (ii, uu)
                {
                    if (useridsArray[ii] == '')
                    {
                        //如果ID为空，则一定报错
                    }
                    else
                    {
                        if (useridsArray[ii].indexOf('-') > -1)
                        {
                            unSelectedUserIdCount++;
                        }
                        else
                        {
                            selectedUserIdCount++;
                        }
                    }
                });


                switch (arr[i].operation_class_id)
                {
                    case "0"://后继	
                    case "1"://流程启动	
                        if (arr[i].userids.trimStartEnd(' ', '') == '')
                        {
                            errorMessageHansMap.put('workflow_dropdown_' + arr[i].zuid + '_' + arr[i].sys_id + '_tbl_maintable_button', '当前选项内不能没有用户。');
                        }
                        else if (arr[i].jdnyh == '1')
                        {
                            if (selectedUserIdCount != 1)
                            {
                                //当前节点内只能选择一个用户                
                                errorMessageHansMap.put('workflow_dropdown_' + arr[i].zuid + '_' + arr[i].sys_id + '_tbl_maintable_button', '当前选项内只能选择一个用户。');
                            }
                        }

                        else
                        {
                            if (selectedUserIdCount < 1)
                            {
                                //当前节点内至少选择一个用户
                                errorMessageHansMap.put('workflow_dropdown_' + arr[i].zuid + '_' + arr[i].sys_id + '_tbl_maintable_button', '当前选项内至少选择一个用户。');
                            }
                        }
                        break;
                    case "2"://流程结束 
                    case "4"://驳回
                        break;
                    case "3"://退回
                        if (arr[i].userids.trimStartEnd(' ', '') == '')
                        {
                            errorMessageHansMap.put('workflow_dropdown_' + arr[i].zuid + '_' + arr[i].sys_id + '_tbl_maintable_button', '当前选项内不能没有用户。');
                        }
                        else if (selectedUserIdCount != 1)
                        {
                            //当前节点内只能选择一个用户                
                            errorMessageHansMap.put('workflow_dropdown_' + arr[i].zuid + '_' + arr[i].sys_id + '_tbl_maintable_button', '当前选项内只能选择一个退回用户。');
                        }
                        break;
                    case "5"://启动子流程                
                    case "6"://子流程结束
                        //暂不讨论
                        break;
                    case "7"://远程连接线	
                        if (arr[i].userids.trimStartEnd(' ', '') == '')
                        {
                            errorMessageHansMap.put('workflow_dropdown_' + arr[i].zuid + '_' + arr[i].sys_id + '_tbl_maintable_button', '当前选项内不能没有用户。');
                        }
                        else if (selectedUserIdCount != 1)
                        {
                            //当前节点内只能选择一个用户                
                            errorMessageHansMap.put('workflow_dropdown_' + arr[i].zuid + '_' + arr[i].sys_id + '_tbl_maintable_button', '当前选项内只能选择一个用户。');
                        }
                        break;
                    case "8"://无连接线退回               
                    case "9"://无连接线后继
                        if (arr[i].userids.trimStartEnd(' ', '') == '')
                        {
                            errorMessageHansMap.put('workflow_dropdown_' + arr[i].zuid + '_' + arr[i].sys_id + '_tbl_maintable_button', '当前选项内不能没有用户。');
                        }
                        else if (selectedUserIdCount != 1)
                        {
                            //当前节点内只能选择一个用户                
                            errorMessageHansMap.put('workflow_dropdown_' + arr[i].zuid + '_' + arr[i].sys_id + '_tbl_maintable_button', '当前选项内只能选择一个用户。');
                        }
                        break;
                    case "10"://返回
                        if (arr[i].userids.trimStartEnd(' ', '') == '')
                        {
                            errorMessageHansMap.put('workflow_dropdown_' + arr[i].zuid + '_' + arr[i].sys_id + '_tbl_maintable_button', '当前选项内不能没有用户。');
                        }
                        else if (selectedUserIdCount != 1)
                        {
                            //当前节点内只能选择一个用户                
                            errorMessageHansMap.put('workflow_dropdown_' + arr[i].zuid + '_' + arr[i].sys_id + '_tbl_maintable_button', '当前选项内只能选择一个用户。');
                        }
                        break;
                }
            });

            //针对send的特异性校验
            if (typeString == 'send')
            {

                var arr = $.grep(resultArray, function (n, i)
                {
                    return n.iselected == '0' && ((',1,3,').indexOf(',' + n.fk_dy_jd_sys_id_from_lx + ',') > -1) && ((',0,1,2,3,4,5,6,8,9,10').indexOf(',' + n.operation_class_id + ',') > -1);
                });
                if (arr.length > 1)
                {
                    errorMessageHansMap.put('ul_workflow_useroperation_tbl_maintable_button', '当前节点只有1个出口，除远程连接线外，只能选择一条连接线。');
                }
            }

            if (errorMessageHansMap.keys().length > 0)
            {
                //==============2、校验不通过
                if (validateMessage != null)
                {
                    validateMessage.show(errorMessageHansMap, errorMessagePlacementHansMap, true);
                }

                return false;
            }
            else
            {
                if (validateMessage != null)
                {
                    validateMessage.hidden();
                }
                return true;
            }
        },
        //取消按钮事件
        btn_workflow_modal_cancle_onclick: function ()
        {
            $('#div_workflow_modal_tbl_maintable_button').modal('hide');
            that._ladda_current_btn_command.stop();
            that._ladda_btn_workflow_modal_start.stop();
            that._ladda_btn_workflow_modal_send.stop();
            that._currentButtonJson = null;
            if (that._validateMessage_div_workflow_modal_start != null)
            {
                that._validateMessage_div_workflow_modal_start.hidden();
            }
            if (that._validateMessage_div_workflow_modal_send != null)
            {
                that._validateMessage_div_workflow_modal_send.hidden();
            }
        },
        //工具方法，向hashmap中存入数组对象
        toolPushObjectInHashMapArray: function toolPushObjectInHashMapArray(hashMap, key, object)
        {
            if (hashMap.containsKey(key))
            {
                var newArray = hashMap.get(key);
                newArray.push(object);
                hashMap.put(key, newArray);
            }
            else
            {
                hashMap.put(key, [object]);
            }

            return hashMap;
        },
        //待办人姓名
        _nextUserNamesString: '',
        //获取待办人(工作流)
        toolWorkFlowNextUserNameString: function (resultArray)
        {
            that._nextUserNamesString = '';
            var arr = $.grep(resultArray, function (n, i)
            {
                return n.iselected == '0' && ((',0,1,2,3,4,5,6,8,9,10').indexOf(',' + n.operation_class_id + ',') > -1);
            });

            $.each(arr, function (i, u)
            {
                var ccdd = arr[i].usernames.split(',');
                $.each(ccdd, function (ii, uu)
                {
                    if (ccdd[ii].indexOf('-') > -1)
                    {
                    }
                    else
                    {
                        that._nextUserNamesString += ccdd[ii] + ',';
                    }
                });
            });
            that._nextUserNamesString = that._nextUserNamesString.trimStartEnd(',');
        },
        toolSendGetNextUserNameString: function (nextUserName)
        {
            that._nextUserNamesString = '';
            that._nextUserNamesString = nextUserName;
        },

        //节点类型，
        //0：开始节点；[无入口，有出口]
        //1：过程一般节点；[一入口，一出口]
        //2：过程选择节点；[一入口，多出口]
        //3：过程聚合节点；[多入口，一出口]
        //4：过程聚合选择节点；[多入口，多出口]
        //5：结束节点；[有入口，无出口]


        //Operation_class_id
        //"0":// 后继	
        //"1"://流程启动	
        //"2"://流程结束 
        //"3"://退回
        //"4"://驳回
        //"5"://启动子流程
        //"6"://子流程结束
        //"7"://远程连接线	
        //"8"://无连接线退回
        //"9"://无连接线后继
        //"10"://返回
        //useroperation iselected
        //接入的参数可能是以下效果（貌似接入的远程连接线是0，但是节点内的多用户间的连接线是1）但是workflow中的注释如下
        //0: 选中；1：远程连接线选中；-1未被选中；-2：远程连接线未被选中
        //程序处理后会是以下效果
        //0:选中；-1未被选中；远程连接线不能不选中




        //刷新页面方法
        btn_command_refresh: function ()
        {
            //var url = window.location.href;
            //commonObj.changeUrl(url, 'normal-show');
         
            that.loadButton({
                success: function (buttonType)
                {

                }
            });
            
        },
        //========================落地====================
        btn_command_ld: function ()
        {
            //刷新页面
            that.btn_command_complete();
           
        }

      
    };
    return that;
})();
