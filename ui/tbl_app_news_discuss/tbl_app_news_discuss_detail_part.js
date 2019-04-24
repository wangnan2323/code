

var tbl_app_news_discuss_detail_Obj = (function () {
    'use strict';

    //=================================================================================
    //                                      私有
    //=================================================================================

    //=================================================================================
    //                                      私有属性 
    //=================================================================================
    var _serviceUrl = '//127.0.0.1/sara.dd.ldsw/service/service_tbl_app_news_discuss.asmx/',
    _baseCodeHashMap = null,
    _validateMessage = null,
    _ladda_btn_command_save = null,

    //=================================================================================
    //                                      私有方法 
    //=================================================================================

    /* 
    *  
    *  方法:initControl
    *  参数:callbackFunction
    *  初始化控件，会使用到_baseCodeHashMap
    */
    initControl = function (callBackFunction) {
        try {
            callBackFunction.success();
        }
        catch (ex) {
            _blockMessage.show('initControl执行失败。<br/>' + ex.message, 'fail');
        }
    },


    /* 
    *  
    *  方法:setDisable
    *  参数:isDisable
    *  设置页面控件状态
    */
    setDisable = function (isDisable) {
        try {
            controlObj.textdisable('detail_txt_fk_tbl_app_news_sys_id_tbl_app_news_discuss_detail', isDisable);

            controlObj.textdisable('detail_txt_f_discusscontent_tbl_app_news_discuss_detail', isDisable);

            controlObj.textdisable('detail_txt_f_nodeid_tbl_app_news_discuss_detail', isDisable);

            controlObj.textdisable('detail_txt_fk_t_user_id_tbl_app_news_discuss_detail', true);

            controlObj.textdisable('detail_txt_f_username_tbl_app_news_discuss_detail', true);


            if (isDisable) {
                $('#btn_command_save_tbl_app_news_discuss_detail').addClass('hidden');
                $('.btn-command-message').attr('disabled', 'disabled');
            }
            else {
                $('#btn_command_save_tbl_app_news_discuss_detail').removeClass('hidden');
                $('.btn-command-message').removeAttr('disabled');
            }
        }
        catch (ex) {
            _blockMessage.show('setDisable执行失败。<br/>' + ex.message, 'fail');
        }
    },

        //---------------------------------------------------------------------------------
    // ---------------------------------Model操作------------------------------------
    //---------------------------------------------------------------------------------
    /* 
    *  
    *  方法:bindModel
    *  参数:tbl_app_news_discuss_detail, callBackFunction
    *  根据数据对象，绑定数据对象到页面控件
    */
    bindModel = function (tbl_app_news_discuss_detail, callBackFunction) {

        controlObj.text('detail_txt_f_value1_tbl_app_news_discuss_detail', tbl_app_news_discuss_detail.f_value1);

        controlObj.text('detail_txt_f_value2_tbl_app_news_discuss_detail', tbl_app_news_discuss_detail.f_value2);

        controlObj.text('detail_txt_f_value3_tbl_app_news_discuss_detail', tbl_app_news_discuss_detail.f_value3);

        controlObj.text('detail_txt_f_value4_tbl_app_news_discuss_detail', tbl_app_news_discuss_detail.f_value4);

        controlObj.text('detail_txt_f_value5_tbl_app_news_discuss_detail', tbl_app_news_discuss_detail.f_value5);

        controlObj.text('detail_txt_f_value6_tbl_app_news_discuss_detail', tbl_app_news_discuss_detail.f_value6);

        controlObj.text('detail_txt_f_value7_tbl_app_news_discuss_detail', tbl_app_news_discuss_detail.f_value7);

        controlObj.text('detail_txt_f_value8_tbl_app_news_discuss_detail', tbl_app_news_discuss_detail.f_value8);

        controlObj.text('detail_txt_f_value9_tbl_app_news_discuss_detail', tbl_app_news_discuss_detail.f_value9);

        controlObj.text('detail_txt_f_value10_tbl_app_news_discuss_detail', tbl_app_news_discuss_detail.f_value10);

        controlObj.text('detail_txt_fk_tbl_app_news_sys_id_tbl_app_news_discuss_detail', tbl_app_news_discuss_detail.fk_tbl_app_news_sys_id);
        
        controlObj.text('detail_txt_f_discusscontent_tbl_app_news_discuss_detail', tbl_app_news_discuss_detail.f_discusscontent);

        controlObj.text('detail_txt_f_nodeid_tbl_app_news_discuss_detail', tbl_app_news_discuss_detail.f_nodeid);

        controlObj.text('detail_txt_fk_t_user_id_tbl_app_news_discuss_detail', tbl_app_news_discuss_detail.fk_t_user_id);

        controlObj.text('detail_txt_f_username_tbl_app_news_discuss_detail', tbl_app_news_discuss_detail.f_username);

        controlObj.text('div_detail_file_f_userimg_tbl_app_news_discuss_detail', tbl_app_news_discuss_detail.f_userimg);
        $('#detail_img_f_userimg_tbl_app_news_discuss_detail')[0].src = commonObj.getUserPhotoUrlByFileName(tbl_app_news_discuss_detail.f_userimg);

        $('#div_add_selectuser_tbl_app_news_discuss_detail').load('../commonselectuser/commonselectuser_part.html', null, function () {
            commonselectuser_Obj.containerId = 'div_add_selectuser_tbl_app_news_discuss_detail';
            commonselectuser_Obj.selectUserIdsControlId = 'detail_txt_fk_t_user_id_tbl_app_news_discuss_detail';
            commonselectuser_Obj.selectUserNamesControlId = 'detail_txt_f_username_tbl_app_news_discuss_detail';
            commonselectuser_Obj.selectUserPotourlsControlId = 'div_detail_file_f_userimg_tbl_app_news_discuss_detail';
            commonselectuser_Obj.showText = '用户';
            commonselectuser_Obj.controlType = that._pr_pagetype;
            commonselectuser_Obj.searchTabArray = ['username', 'role', 'position', 'usergroup', 'organ'];//username,role,position,usergroup,organ；空就是没有
            commonselectuser_Obj.maxSelectedUser = '1';
            commonselectuser_Obj.onChange = function () {
                $('#detail_img_f_userimg_tbl_app_news_discuss_detail')[0].src = commonObj.getUserPhotoUrlByFileName(controlObj.text('div_detail_file_f_userimg_tbl_app_news_discuss_detail'));
            };
            commonselectuser_Obj.init({
                success: function () {
                    callBackFunction.success();
                }
            });
        })

        //callBackFunction.success();
    },

    /* 
    *  
    *  方法:getModel
    *  参数:callbackFunction
    *  获取页面数据，返回对象tbl_app_news_discuss_detail
    */
    getModel = function (callBackFunction) {
        try {
            var tbl_app_news_discuss_detail = new Object();

            tbl_app_news_discuss_detail.f_value1 = controlObj.text('detail_txt_f_value1_tbl_app_news_discuss_detail');


            tbl_app_news_discuss_detail.f_value2 = controlObj.text('detail_txt_f_value2_tbl_app_news_discuss_detail');


            tbl_app_news_discuss_detail.f_value3 = controlObj.text('detail_txt_f_value3_tbl_app_news_discuss_detail');


            tbl_app_news_discuss_detail.f_value4 = controlObj.text('detail_txt_f_value4_tbl_app_news_discuss_detail');


            tbl_app_news_discuss_detail.f_value5 = controlObj.text('detail_txt_f_value5_tbl_app_news_discuss_detail');


            tbl_app_news_discuss_detail.f_value6 = controlObj.text('detail_txt_f_value6_tbl_app_news_discuss_detail');


            tbl_app_news_discuss_detail.f_value7 = controlObj.text('detail_txt_f_value7_tbl_app_news_discuss_detail');


            tbl_app_news_discuss_detail.f_value8 = controlObj.text('detail_txt_f_value8_tbl_app_news_discuss_detail');


            tbl_app_news_discuss_detail.f_value9 = controlObj.text('detail_txt_f_value9_tbl_app_news_discuss_detail');


            tbl_app_news_discuss_detail.f_value10 = controlObj.text('detail_txt_f_value10_tbl_app_news_discuss_detail');


            tbl_app_news_discuss_detail.fk_tbl_app_news_sys_id = controlObj.text('detail_txt_fk_tbl_app_news_sys_id_tbl_app_news_discuss_detail');


            tbl_app_news_discuss_detail.f_discusscontent = controlObj.text('detail_txt_f_discusscontent_tbl_app_news_discuss_detail');


            tbl_app_news_discuss_detail.f_nodeid = controlObj.text('detail_txt_f_nodeid_tbl_app_news_discuss_detail');


            tbl_app_news_discuss_detail.fk_t_user_id = controlObj.text('detail_txt_fk_t_user_id_tbl_app_news_discuss_detail');

            tbl_app_news_discuss_detail.f_username = controlObj.text('detail_txt_f_username_tbl_app_news_discuss_detail');

            tbl_app_news_discuss_detail.f_userimg = controlObj.text('div_detail_file_f_userimg_tbl_app_news_discuss_detail');

            callBackFunction.success(tbl_app_news_discuss_detail);
        }
        catch (ex) {
            _blockMessage.show('getData执行失败。<br/>' + ex.message, 'fail');
        }
    },

    /* 
    *  
    *  方法:checkModel
    *  参数:tbl_app_news_discuss_detail，callbackFunction
    *  页面数据校验，会用到_validateMessage，校验结果分success，fail
    */
    checkModel = function (tbl_app_news_discuss_detail, callBackFunction) {
        try {
            var errorMessageHansMap = new hashMap();
            var errorMessagePlacementHansMap = new hashMap();


            if (tbl_app_news_discuss_detail.f_value1.length > 100) {
                errorMessageHansMap.put('detail_txt_f_value1_tbl_app_news_discuss_detail', '长度不能超过<a style="color:red">100</a>');
                errorMessagePlacementHansMap.put('detail_txt_f_value1_tbl_app_news_discuss_detail', 'top');
            }


            if (tbl_app_news_discuss_detail.f_value2.length > 100) {
                errorMessageHansMap.put('detail_txt_f_value2_tbl_app_news_discuss_detail', '长度不能超过<a style="color:red">100</a>');
                errorMessagePlacementHansMap.put('detail_txt_f_value2_tbl_app_news_discuss_detail', 'top');
            }


            if (tbl_app_news_discuss_detail.f_value3.length > 100) {
                errorMessageHansMap.put('detail_txt_f_value3_tbl_app_news_discuss_detail', '长度不能超过<a style="color:red">100</a>');
                errorMessagePlacementHansMap.put('detail_txt_f_value3_tbl_app_news_discuss_detail', 'top');
            }


            if (tbl_app_news_discuss_detail.f_value4.length > 100) {
                errorMessageHansMap.put('detail_txt_f_value4_tbl_app_news_discuss_detail', '长度不能超过<a style="color:red">100</a>');
                errorMessagePlacementHansMap.put('detail_txt_f_value4_tbl_app_news_discuss_detail', 'top');
            }


            if (tbl_app_news_discuss_detail.f_value5.length > 100) {
                errorMessageHansMap.put('detail_txt_f_value5_tbl_app_news_discuss_detail', '长度不能超过<a style="color:red">100</a>');
                errorMessagePlacementHansMap.put('detail_txt_f_value5_tbl_app_news_discuss_detail', 'top');
            }


            if (tbl_app_news_discuss_detail.f_value6.length > 100) {
                errorMessageHansMap.put('detail_txt_f_value6_tbl_app_news_discuss_detail', '长度不能超过<a style="color:red">100</a>');
                errorMessagePlacementHansMap.put('detail_txt_f_value6_tbl_app_news_discuss_detail', 'top');
            }


            if (tbl_app_news_discuss_detail.f_value7.length > 100) {
                errorMessageHansMap.put('detail_txt_f_value7_tbl_app_news_discuss_detail', '长度不能超过<a style="color:red">100</a>');
                errorMessagePlacementHansMap.put('detail_txt_f_value7_tbl_app_news_discuss_detail', 'top');
            }


            if (tbl_app_news_discuss_detail.f_value8.length > 100) {
                errorMessageHansMap.put('detail_txt_f_value8_tbl_app_news_discuss_detail', '长度不能超过<a style="color:red">100</a>');
                errorMessagePlacementHansMap.put('detail_txt_f_value8_tbl_app_news_discuss_detail', 'top');
            }


            if (tbl_app_news_discuss_detail.f_value9.length > 100) {
                errorMessageHansMap.put('detail_txt_f_value9_tbl_app_news_discuss_detail', '长度不能超过<a style="color:red">100</a>');
                errorMessagePlacementHansMap.put('detail_txt_f_value9_tbl_app_news_discuss_detail', 'top');
            }


            if (tbl_app_news_discuss_detail.f_value10.length > 100) {
                errorMessageHansMap.put('detail_txt_f_value10_tbl_app_news_discuss_detail', '长度不能超过<a style="color:red">100</a>');
                errorMessagePlacementHansMap.put('detail_txt_f_value10_tbl_app_news_discuss_detail', 'top');
            }


            if (tbl_app_news_discuss_detail.fk_tbl_app_news_sys_id.length > 100) {
                errorMessageHansMap.put('detail_txt_fk_tbl_app_news_sys_id_tbl_app_news_discuss_detail', '长度不能超过<a style="color:red">100</a>');
                errorMessagePlacementHansMap.put('detail_txt_fk_tbl_app_news_sys_id_tbl_app_news_discuss_detail', 'top');
            }

            if (tbl_app_news_discuss_detail.f_nodeid.length > 100) {
                errorMessageHansMap.put('detail_txt_f_nodeid_tbl_app_news_discuss_detail', '长度不能超过<a style="color:red">100</a>');
                errorMessagePlacementHansMap.put('detail_txt_f_nodeid_tbl_app_news_discuss_detail', 'top');
            }


            if (tbl_app_news_discuss_detail.fk_t_user_id.length > 100) {
                errorMessageHansMap.put('detail_txt_fk_t_user_id_tbl_app_news_discuss_detail', '长度不能超过<a style="color:red">100</a>');
                errorMessagePlacementHansMap.put('detail_txt_fk_t_user_id_tbl_app_news_discuss_detail', 'top');
            }


            if (tbl_app_news_discuss_detail.f_username.length > 100) {
                errorMessageHansMap.put('detail_txt_f_username_tbl_app_news_discuss_detail', '长度不能超过<a style="color:red">100</a>');
                errorMessagePlacementHansMap.put('detail_txt_f_username_tbl_app_news_discuss_detail', 'top');
            }

            //if (tbl_app_news_discuss_detail.f_userimg.length > 100) {
            //    errorMessageHansMap.put('detail_txt_f_userimg_tbl_app_news_discuss_detail', '长度不能超过<a style="color:red">100</a>');
            //    errorMessagePlacementHansMap.put('detail_txt_f_userimg_tbl_app_news_discuss_detail', 'top');
            //}

            if (tbl_app_news_discuss_detail.f_username.length == 0)
            {

                errorMessageHansMap.put('detail_txt_f_username_tbl_app_news_discuss_detail', '必须选中一个用户！');
                errorMessagePlacementHansMap.put('detail_txt_f_username_tbl_app_news_discuss_detail', 'top');
            }

            if (errorMessageHansMap.keys().length > 0) {
                _validateMessage.show(errorMessageHansMap, errorMessagePlacementHansMap, true);
                callBackFunction.fail();
            }
            else {
                _validateMessage.hidden();
                callBackFunction.success(tbl_app_news_discuss_detail);
            }
        }
        catch (ex) {
            _blockMessage.show('checkData执行失败。<br/>' + ex.message, 'fail');
        }

    },



        //---------------------------------------------------------------------------------
    // ---------------------------------数据操作------------------------------------
    //---------------------------------------------------------------------------------
    /* 
    *  
    *  方法:getData
    *  参数:callbackFunction
    *  从数据库获取数据，根据that._pr_sys_id ，返回数据对象
    */
    getData = function (callbackFunction) {
        var whereClause = ' sys_id = \'' + that._pr_sys_id + '\'';
        var orderByString = '';
        var columnsString = 'f_value1^f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^fk_tbl_app_news_sys_id^f_discusscontent^f_nodeid^fk_t_user_id^f_username^f_userimg^sys_id';
        var pageSizeString = '';
        var pageIndexString = '';
        var data = {
            whereString: whereClause,
            orderByString: orderByString,
            columnsString: columnsString,
            pageSizeString: pageSizeString,
            pageIndexString: pageIndexString,
            clientInf: _clientInf
        };
        doAjaxFunction(_serviceUrl, 'GetList', data, {
            success: function (message) {
                var messageJson = (new Function("", "return " + message))();
                callbackFunction.success(messageJson.rows[0]);
            },
            fail: function (message) {
                _blockMessage.show(_serviceUrl + 'GetList<br/>' + message, 'fail');
            }
        });
    },

    /* 
    *  
    *  方法:updateData
    *  参数:tbl_app_news_discuss_detail, callbackFunction
    *  向数据库更新数据，根据数据对象
    */
    updateData = function (tbl_app_news_discuss_detail, callbackFunction) {

        var d = new Date();
        var columns = 'sys_id^f_value1^f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^fk_tbl_app_news_sys_id^f_discusscontent^f_nodeid^sys_lastedituserid^sys_lasteditusername^sys_lasteditdate^fk_t_user_id^f_username^f_userimg';
        var json = {
            sys_id: that._pr_sys_id,

            f_value1: tbl_app_news_discuss_detail.f_value1,

            f_value2: tbl_app_news_discuss_detail.f_value2,

            f_value3: tbl_app_news_discuss_detail.f_value3,

            f_value4: tbl_app_news_discuss_detail.f_value4,

            f_value5: tbl_app_news_discuss_detail.f_value5,

            f_value6: tbl_app_news_discuss_detail.f_value6,

            f_value7: tbl_app_news_discuss_detail.f_value7,

            f_value8: tbl_app_news_discuss_detail.f_value8,

            f_value9: tbl_app_news_discuss_detail.f_value9,

            f_value10: tbl_app_news_discuss_detail.f_value10,

            fk_tbl_app_news_sys_id: tbl_app_news_discuss_detail.fk_tbl_app_news_sys_id,

            f_discusscontent: tbl_app_news_discuss_detail.f_discusscontent,

            f_nodeid: tbl_app_news_discuss_detail.f_nodeid,
            
            fk_t_user_id: tbl_app_news_discuss_detail.fk_t_user_id,
            f_username: tbl_app_news_discuss_detail.f_username,
            f_userimg: tbl_app_news_discuss_detail.f_userimg,


            sys_lasteditusername: basePageObj._userInfoJson.sys_username,
            sys_lastedituserid: basePageObj._userInfoJson.sys_userid,
            sys_lasteditdate: d.Format('yyyy-MM-dd hh:mm:ss')

        };

        var data = {
            columns: columns,
            clientInf: _clientInf,
            json: JSON.stringify(json)
        };
        doAjaxFunction(_serviceUrl, 'Update', data, {
            success: function (message) {
                callbackFunction.success();
            },
            fail: function (message) {
                callbackFunction.fail(message);
            },
            error: function (message) {
                _blockMessage.show(_serviceUrl + 'Update<br/>' + message, 'fail');
            }
        });
    },


    //---------------------------------------------------------------------------------
    // ---------------------------------控件事件------------------------------------
    //---------------------------------------------------------------------------------

    /* 
    *  
    *  方法:txt_f_discusscontent_onchange
    *  参数:contents, $editable
    *  评论内容 onchange事件
    */
    txt_f_discusscontent_onchange = function (contents, $editable) {
        var cc = _resultMessage.message();
        cc += '<br/>';
        cc += '评论内容' + contents;
        _resultMessage.message(cc);
    };

    //=================================================================================
    //                                      公有
    //=================================================================================
    var that = {

        //=================================================================================
        //                                      公有属性 
        //=================================================================================
        _pr_sys_id: '',
        _pr_pagetype: '',

        //=================================================================================
        //                                      公有方法 
        //=================================================================================

        /* 
        *  
        *  方法:init
        *  参数:
        *  页面初始化方法
        */
        init: function (callBackFunction) {

            try {

                //初始化页面控件
                initControl({
                    success: function () {

                        _validateMessage = new validateMessage('btn_command_save_tbl_app_news_discuss_detail');

                        _ladda_btn_command_save = Ladda.create('btn_command_save_tbl_app_news_discuss_detail');

                        switch (that._pr_pagetype) {
                            case "1":
                                setDisable(false);
                                break;
                            case "2":
                                setDisable(true);
                                break;
                        }

                        callBackFunction.success();

                    }
                });
            }
            catch (ex) {
                _blockMessage.show('程序初始化失败。<br/>' + ex.message, 'fail');
            }
        },

        /* 
        *  
        *  方法:bindPage
        *  参数:
        *  绑定页面
        */
        bindPage: function (callBackFunction) {
            try {
                getData({
                    success: function (tbl_app_news_discuss_detail) {

                        bindModel(tbl_app_news_discuss_detail, {
                            success: function () {
                                callBackFunction.success();
                            }
                        });

                    }
                });
            }
            catch (ex) {
                _blockMessage.show('bindPage执行失败。<br/>' + ex.message, 'fail');
            }
        },

        //---------------------------------------------------------------------------------
        // ---------------------------------按钮事件---------------------------------------
        //---------------------------------------------------------------------------------
        /* 
        *  
        *  方法:btn_command_save_onclick
        *  参数:
        *  保存按钮
        */
        btn_command_save_onclick: function () {
            try {
                _ladda_btn_command_save.start();
                getModel({
                    success: function (tbl_app_news_discuss_detail) {
                        checkModel(tbl_app_news_discuss_detail, {
                            success: function (tbl_app_news_discuss_detail) {
                                updateData(tbl_app_news_discuss_detail, {
                                    success: function () {
                                        _ladda_btn_command_save.stop();
                                        //增加
                                        tbl_app_news_discuss_list_Obj.bindGrid();
                                        $('#div_content_part_tbl_app_news_discuss_detail').css('display', 'none');
                                        _alertMessage.show('保存成功', 'success', 2000);
                                    },
                                    fail: function (message) {
                                        _ladda_btn_command_save.stop();
                                        _alertMessage.show('保存失败<br/>' + message, 'fail');
                                    }
                                });
                            },
                            fail: function () {
                                _ladda_btn_command_save.stop();
                                _alertMessage.show('校验未通过', 'warning');
                            }
                        });
                    }
                });
            }
            catch (ex) {
                _blockMessage.show('保存程序异常。', 'fail');
            }
        }

    };

    return that;
})();





