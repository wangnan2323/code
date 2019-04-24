var _pr_fromurl = '';
var _pr_fromurlparam = '';

var _pr_appcode = '';
var _clientInf = '{userid:"",appcode:"54",appname:"",userip:"",usermac:"",username:"",userimg:""}';
var _blockMessage = null;
var _alertMessage = null;
var _resultMessage = null;
var _confirmMessage = null;


var tbl_app_index_detail_Obj = (function () {
    'use strict';

    //=================================================================================
    //                                      私有
    //=================================================================================

    //=================================================================================
    //                                      私有属性 
    //=================================================================================
    var _serviceUrl = '//127.0.0.1/sara.dd.ldsw/service/service_tbl_app_index.asmx/',
    _serviceFileUrl = '//127.0.0.1/sara.dd.ldsw.file/service/fileupload/service_fileuploaddo.asmx/',
    _baseCodeHashMap = null,
    _validateMessage = null,
    _ladda_btn_command_save = null,
    _tagArray = new Array(),

    //=================================================================================
    //                                      私有方法 
    //=================================================================================
    /* 
    *  
    *  方法:initParameter
    *  参数:callbackFunction
    *  初始化页面参数
    */
    initParameter = function (callBackFunction) {
        try {
            _pr_fromurl = requestQuery('fromurl');
            _pr_fromurlparam = requestQuery('fromurlparam');
            that._pr_sys_id = requestQuery('sys_id');
            that._pr_pagetype = requestQuery('pagetype');
            _pr_appcode = requestQuery('appcode');
            that._pr_indextype = requestQuery('indextype');
            that._pr_indextypeactive = requestQuery('indextypeactive');
            that._pr_titletypeactive = requestQuery('titletypeactive');
            _clientInf = '{userid:"' + basePageObj._userInfoJson.sys_userid + '",appcode:"' + _pr_appcode + '",appname:"",userip:"' + basePageObj._userInfoJson.ip + '",usermac:"' + basePageObj._userInfoJson.mac + '",username:"' + basePageObj._userInfoJson.sys_username + '",userimg:"' + basePageObj._userInfoJson.sys_photourl + '"}';

            if (that._pr_sys_id == null || that._pr_sys_id == '') {
                _blockMessage.show('_pr_sys_id参数接收失败', 'fail');
            }
            else if (that._pr_pagetype == null || that._pr_pagetype == '') {
                _blockMessage.show('_pr_pagetype参数接收失败...', 'fail');
            }
            else if (that._pr_indextype == null || that._pr_indextype == '' || that._pr_indextype == 'null') {
                _blockMessage.show('_pr_indextype参数接收失败...', 'fail');
            }
            else {
                callBackFunction.success();
            }
        }
        catch (ex) {
            _blockMessage.show('initParameter执行失败' + ex.message, 'fail');
        }

    },

    /* 
    *  
    *  方法:initBaseCode
    *  参数:callbackFunction
    *  初始化code内容，存储在_baseCodeHashMap
    */
    initBaseCode = function (callBackFunction) {

        commonObj.getCodeServiceJson(that._pr_indextype, {
            success: function (resultArray) {
                try {
                    _baseCodeHashMap = new hashMap();

                    if (that._pr_indextypeactive != "") {
                        var array = resultArray[that._pr_indextype];
                        var array1 = [];
                        var str = "^" + that._pr_indextypeactive + "^";
                        for (var i = 0; i < array.length; i++) {
                            if (str.indexOf("^" + array[i]["id"] + "^") > -1) {
                                array1.push(array[i]);
                            }
                        }
                        _baseCodeHashMap.put('servicecode_indextype', array1);
                    }
                    else {
                        _baseCodeHashMap.put('servicecode_indextype', resultArray[that._pr_indextype]);
                    }

                    var array01 = [
                       { id: '1', text: '标题+简述+状态' },
                       { id: '2', text: '标题+N张小图并排+状态' },
                       { id: '3', text: '标题+N张大图滚动+图片描述+状态' },
                       { id: '4', text: '标题+简述+小图九宫+状态' },
                       { id: '5', text: '标题+1张小图在右侧+状态' },
                       { id: '6', text: '标题+1张小图在左侧+状态' },
                       { id: '7', text: '标题+1张大图-首页滚动图片' },
                       { id: '8', text: '标题+1张小图-首页图片按钮' },

                    ]
                    if (that._pr_titletypeactive != '') {
                        var array010 = [];
                        var str = "^" + that._pr_titletypeactive + "^";
                        for (var i = 0; i < array01.length; i++) {
                            if (str.indexOf("^" + array01[i]["id"] + "^") > -1) {
                                array010.push(array01[i]);
                            }
                        }
                        _baseCodeHashMap.put('servicecode_01', array010);
                    }
                    else {
                        _baseCodeHashMap.put('servicecode_01', array01);
                    }

                    //获取标签tag
                    var data = { clientInf: _clientInf };
                    doAjaxFunction(_serviceUrl, 'GetTags', data, {
                        success: function (result) {
                            _baseCodeHashMap.put('servicecode_array', result.split('^'));
                            callBackFunction.success();
                        }
                    });


                }
                catch (ex) {
                    _blockMessage.show('initBaseCode执行失败。<br/>' + ex.message, 'fail');
                }
            }
        });

    },

    /* 
    *  
    *  方法:initControl
    *  参数:callbackFunction
    *  初始化控件，会使用到_baseCodeHashMap
    */
    initControl = function (callBackFunction) {
        try {

            //单选下拉列表         

            var resultArray1 = _baseCodeHashMap.get('servicecode_01');

            var contentArray = _baseCodeHashMap.get('servicecode_array');

            controlObj.fileuploaderinit('detail_file_f_titleresource_tbl_app_index_detail',
                {
                    isMultiple: true,
                    isImgThumbnail: true,
                    isThumbnailImgShow: true,
                    fileUploadExtnames: ";.bmp;.jpg;.gif;.png;.jpeg;",
                    thumbnailWidthHeight: "30",
                    fileUploadCountMax: 0,
                    showType: '1',
                    isRealName: false,
                    onDeleteEnd: function (filerealname, fileuploadname, msg) {
                        //删除list中的图片
                        tbl_app_index_title_modallist_Obj.deleteByFileUpLoadName(fileuploadname);
                    },
                    onEditEnd: function (filerealname, fileuploadname) {
                        var fileuploadnamewithoutext = fileuploadname.split('.')[0];
                        //grid中的图片

                        var imgs = [];
                        var gridImgs = $('#table_grid_tbl_app_index_title_modallist img');
                        imgs = $.merge(imgs, gridImgs);

                        var modalImgs = $('#detail_imgs_tbl_app_index_title_modallist img');
                        imgs = $.merge(imgs, modalImgs);

                        for (var i = 0; i < imgs.length; i++) {
                            var $img = $(imgs[i]);
                            if ($img.attr('src') != undefined) {
                                if ($img.attr('src').indexOf(fileuploadnamewithoutext) > -1) {
                                    var src = $img.attr('src');

                                    if (src.indexOf('?') > -1) {
                                        $img.attr('src', src.split('?')[0] + "?" + Math.random() * 10000);
                                    }
                                    else {
                                        $img.attr('src', src + "?" + Math.random() * 10000);
                                    }
                                }
                            }

                        }
                    }
                }, file_f_titleresource_onchange);


            controlObj.singledropdownlistinit('detail_dropdown_f_titletype_tbl_app_index_detail', resultArray1, dropdown_f_titletype_onchange);

            controlObj.toggleinit('detail_ck_f_isrelease_tbl_app_index_detail', ck_f_isrelease_onswitchchange);

            controlObj.datetimeinit('detail_datetime_f_releasedate_tbl_app_index_detail_date', 'detail_datetime_f_releasedate_tbl_app_index_detail_time', datetime_f_releasedate_date_onchange, datetime_f_releasedate_time_onchange);

            controlObj.singledropdownlistinit('detail_dropdown_f_indextype_tbl_app_index_detail', _baseCodeHashMap.get('servicecode_indextype'), dropdown_f_indextype_onchange);


            controlObj.autocompleteinit('detail_txt_f_tag_tbl_app_index_detail', contentArray, txt_f_tag_onselected);

            controlObj.toggleinit('detail_txt_f_value2_tbl_app_index_detail');

            controlObj.toggleinit('detail_txt_f_value3_tbl_app_index_detail');

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
            controlObj.textdisable('detail_txt_f_title_tbl_app_index_detail', isDisable);

            controlObj.fileuploaderdisable('detail_file_f_titleresource_tbl_app_index_detail', isDisable);


            controlObj.singledropdownlistdisable('detail_dropdown_f_titletype_tbl_app_index_detail', isDisable);


            controlObj.toggledisable('detail_ck_f_isrelease_tbl_app_index_detail', isDisable);

            controlObj.datetimedisable('detail_datetime_f_releasedate_tbl_app_index_detail_date', 'detail_datetime_f_releasedate_tbl_app_index_detail_time', isDisable);


            controlObj.singledropdownlistdisable('detail_dropdown_f_indextype_tbl_app_index_detail', isDisable);

            controlObj.textdisable('detail_txt_f_tag_tbl_app_index_detail', isDisable);

            controlObj.textdisable('detail_txt_f_resume_tbl_app_index_detail', isDisable);

            controlObj.toggledisable('detail_txt_f_value2_tbl_app_index_detail', isDisable);
            controlObj.toggledisable('detail_txt_f_value3_tbl_app_index_detail', isDisable);

            if (isDisable) {
                $('#btn_command_save_tbl_app_index_detail').addClass('hidden');
                $('.btn-command-message').attr('disabled', 'disabled');
            }
            else {
                $('#btn_command_save_tbl_app_index_detail').removeClass('hidden');
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
    *  参数:tbl_app_index_detail, callBackFunction
    *  根据数据对象，绑定数据对象到页面控件
    */
    bindModel = function (tbl_app_index_detail, callBackFunction) {

        $('#detail_sys_lasteditusername_tbl_app_index_detail').html(tbl_app_index_detail.sys_lasteditusername);
        $('#detail_f_value1_tbl_app_index_detail').attr("src", commonObj.getUserPhotoUrlByFileName(tbl_app_index_detail.f_value1));

        controlObj.toggle('detail_txt_f_value2_tbl_app_index_detail', tbl_app_index_detail.f_value2);

        controlObj.toggle('detail_txt_f_value3_tbl_app_index_detail', tbl_app_index_detail.f_value3);

        controlObj.text('detail_txt_sys_orderid_tbl_app_index_detail', tbl_app_index_detail.sys_orderid);



        controlObj.text('detail_txt_f_value4_tbl_app_index_detail', tbl_app_index_detail.f_value4);

        controlObj.text('detail_txt_f_value5_tbl_app_index_detail', tbl_app_index_detail.f_value5);

        controlObj.text('detail_txt_f_value6_tbl_app_index_detail', tbl_app_index_detail.f_value6);

        controlObj.text('detail_txt_f_value7_tbl_app_index_detail', tbl_app_index_detail.f_value7);

        controlObj.text('detail_txt_f_value8_tbl_app_index_detail', tbl_app_index_detail.f_value8);

        controlObj.text('detail_txt_f_value9_tbl_app_index_detail', tbl_app_index_detail.f_value9);

        controlObj.text('detail_txt_f_value10_tbl_app_index_detail', tbl_app_index_detail.f_value10);

        controlObj.text('detail_txt_f_title_tbl_app_index_detail', tbl_app_index_detail.f_title);

        controlObj.fileuploaderbind('detail_file_f_titleresource_tbl_app_index_detail', tbl_app_index_detail.f_titleresource);

        controlObj.singledropdownlistid('detail_dropdown_f_titletype_tbl_app_index_detail', tbl_app_index_detail.f_titletypeid);


        controlObj.toggle('detail_ck_f_isrelease_tbl_app_index_detail', tbl_app_index_detail.f_isrelease);


        controlObj.datetime('detail_datetime_f_releasedate_tbl_app_index_detail_date', 'detail_datetime_f_releasedate_tbl_app_index_detail_time', tbl_app_index_detail.f_releasedate);

        controlObj.singledropdownlistid('detail_dropdown_f_indextype_tbl_app_index_detail', tbl_app_index_detail.f_indextypeid);

        controlObj.text('detail_txt_f_tag_tbl_app_index_detail', "");
        if (tbl_app_index_detail.f_tag != "") {
            _tagArray = tbl_app_index_detail.f_tag.split(" ");
            renderTags();
        }

        controlObj.text('detail_txt_f_resume_tbl_app_index_detail', tbl_app_index_detail.f_resume);

        callBackFunction.success();
    },



    /* 
    *  
    *  方法:getModel
    *  参数:callbackFunction
    *  获取页面数据，返回对象tbl_app_index_detail
    */
    getModel = function (callBackFunction) {
        try {
            var tbl_app_index_detail = new Object();

            tbl_app_index_detail.sys_orderid = controlObj.text('detail_txt_sys_orderid_tbl_app_index_detail');




            tbl_app_index_detail.f_value4 = controlObj.text('detail_txt_f_value4_tbl_app_index_detail');


            tbl_app_index_detail.f_value5 = controlObj.text('detail_txt_f_value5_tbl_app_index_detail');


            tbl_app_index_detail.f_value6 = controlObj.text('detail_txt_f_value6_tbl_app_index_detail');


            tbl_app_index_detail.f_value7 = controlObj.text('detail_txt_f_value7_tbl_app_index_detail');


            tbl_app_index_detail.f_value8 = controlObj.text('detail_txt_f_value8_tbl_app_index_detail');


            tbl_app_index_detail.f_value9 = controlObj.text('detail_txt_f_value9_tbl_app_index_detail');


            tbl_app_index_detail.f_value10 = controlObj.text('detail_txt_f_value10_tbl_app_index_detail');


            tbl_app_index_detail.f_title = controlObj.text('detail_txt_f_title_tbl_app_index_detail');

            tbl_app_index_detail.f_titleresource = controlObj.fileuploaderid('detail_file_f_titleresource_tbl_app_index_detail');

            tbl_app_index_detail.f_titletype = controlObj.singledropdownlist('detail_dropdown_f_titletype_tbl_app_index_detail');
            tbl_app_index_detail.f_titletypeid = controlObj.singledropdownlistid('detail_dropdown_f_titletype_tbl_app_index_detail');




            tbl_app_index_detail.f_value2 = controlObj.toggle('detail_txt_f_value2_tbl_app_index_detail');
            tbl_app_index_detail.f_value3 = controlObj.toggle('detail_txt_f_value3_tbl_app_index_detail');

            tbl_app_index_detail.f_isrelease = controlObj.toggle('detail_ck_f_isrelease_tbl_app_index_detail');

            tbl_app_index_detail.f_releasedate = controlObj.datetime('detail_datetime_f_releasedate_tbl_app_index_detail_date', 'detail_datetime_f_releasedate_tbl_app_index_detail_time');

            tbl_app_index_detail.f_indextype = controlObj.singledropdownlist('detail_dropdown_f_indextype_tbl_app_index_detail');
            tbl_app_index_detail.f_indextypeid = controlObj.singledropdownlistid('detail_dropdown_f_indextype_tbl_app_index_detail');


            var f_tag = '';
            for (var i = 0; i < _tagArray.length; i++) {
                f_tag += _tagArray[i] + ' ';
            }
            f_tag = f_tag.trim(' ');
            tbl_app_index_detail.f_tag = f_tag;//controlObj.text('detail_txt_f_tag_tbl_app_index_detail');


            tbl_app_index_detail.f_resume = controlObj.text('detail_txt_f_resume_tbl_app_index_detail');


            callBackFunction.success(tbl_app_index_detail);
        }
        catch (ex) {
            _blockMessage.show('getData执行失败。<br/>' + ex.message, 'fail');
        }
    },

    /* 
    *  
    *  方法:checkModel
    *  参数:tbl_app_index_detail，callbackFunction
    *  页面数据校验，会用到_validateMessage，校验结果分success，fail
    */
    checkModel = function (tbl_app_index_detail, callBackFunction) {
        try {
            var errorMessageHansMap = new hashMap();
            var errorMessagePlacementHansMap = new hashMap();

            if (tbl_app_index_detail.sys_orderid.length > 100) {
                errorMessageHansMap.put('detail_txt_sys_orderid_tbl_app_index_detail', '长度不能超过<a style="color:red">100</a>');
                errorMessagePlacementHansMap.put('detail_txt_sys_orderid_tbl_app_index_detail', 'top');
            }
            if (tbl_app_index_detail.f_value2.length > 100) {
                errorMessageHansMap.put('detail_txt_f_value2_tbl_app_index_detail', '长度不能超过<a style="color:red">100</a>');
                errorMessagePlacementHansMap.put('detail_txt_f_value2_tbl_app_index_detail', 'top');
            }
            if (tbl_app_index_detail.f_value3.length > 100) {
                errorMessageHansMap.put('detail_txt_f_value3_tbl_app_index_detail', '长度不能超过<a style="color:red">100</a>');
                errorMessagePlacementHansMap.put('detail_txt_f_value3_tbl_app_index_detail', 'top');
            }
            if (tbl_app_index_detail.f_value4.length > 100) {
                errorMessageHansMap.put('detail_txt_f_value4_tbl_app_index_detail', '长度不能超过<a style="color:red">100</a>');
                errorMessagePlacementHansMap.put('detail_txt_f_value4_tbl_app_index_detail', 'top');
            }
            if (tbl_app_index_detail.f_value5.length > 100) {
                errorMessageHansMap.put('detail_txt_f_value5_tbl_app_index_detail', '长度不能超过<a style="color:red">100</a>');
                errorMessagePlacementHansMap.put('detail_txt_f_value5_tbl_app_index_detail', 'top');
            }
            if (tbl_app_index_detail.f_value6.length > 100) {
                errorMessageHansMap.put('detail_txt_f_value6_tbl_app_index_detail', '长度不能超过<a style="color:red">100</a>');
                errorMessagePlacementHansMap.put('detail_txt_f_value6_tbl_app_index_detail', 'top');
            }
            if (tbl_app_index_detail.f_value7.length > 100) {
                errorMessageHansMap.put('detail_txt_f_value7_tbl_app_index_detail', '长度不能超过<a style="color:red">100</a>');
                errorMessagePlacementHansMap.put('detail_txt_f_value7_tbl_app_index_detail', 'top');
            }
            if (tbl_app_index_detail.f_value8.length > 100) {
                errorMessageHansMap.put('detail_txt_f_value8_tbl_app_index_detail', '长度不能超过<a style="color:red">100</a>');
                errorMessagePlacementHansMap.put('detail_txt_f_value8_tbl_app_index_detail', 'top');
            }
            if (tbl_app_index_detail.f_value9.length > 100) {
                errorMessageHansMap.put('detail_txt_f_value9_tbl_app_index_detail', '长度不能超过<a style="color:red">100</a>');
                errorMessagePlacementHansMap.put('detail_txt_f_value9_tbl_app_index_detail', 'top');
            }
            if (tbl_app_index_detail.f_value10.length > 100) {
                errorMessageHansMap.put('detail_txt_f_value10_tbl_app_index_detail', '长度不能超过<a style="color:red">100</a>');
                errorMessagePlacementHansMap.put('detail_txt_f_value10_tbl_app_index_detail', 'top');
            }
            if (tbl_app_index_detail.f_title.length > 100) {
                errorMessageHansMap.put('detail_txt_f_title_tbl_app_index_detail', '长度不能超过<a style="color:red">100</a>');
                errorMessagePlacementHansMap.put('detail_txt_f_title_tbl_app_index_detail', 'top');
            }
            if (tbl_app_index_detail.f_titleresource.length > 100) {
                errorMessageHansMap.put('detail_file_f_titleresource_tbl_app_index_detail', '长度不能超过<a style="color:red">100</a>');
            }
            if (tbl_app_index_detail.f_titletype.length > 100 || tbl_app_index_detail.f_titletypeid.length > 100) {
                errorMessageHansMap.put('detail_dropdown_f_titletype_tbl_app_index_detail', '长度不能超过<a style="color:red">100</a>');
            }

            if (tbl_app_index_detail.f_indextype.length > 100 || tbl_app_index_detail.f_indextypeid.length > 100) {
                errorMessageHansMap.put('detail_dropdown_f_indextype_tbl_app_index_detail', '长度不能超过<a style="color:red">100</a>');
            }
            if (tbl_app_index_detail.f_tag.length > 100) {
                errorMessageHansMap.put('detail_txt_f_tag_tbl_app_index_detail', '长度不能超过<a style="color:red">100</a>');
                errorMessagePlacementHansMap.put('detail_txt_f_tag_tbl_app_index_detail', 'top');
            }
            if (tbl_app_index_detail.f_resume.length > 4000) {
                errorMessageHansMap.put('detail_txt_f_resume_tbl_app_index_detail', '长度不能超过<a style="color:red">4000</a>');
                errorMessagePlacementHansMap.put('detail_txt_f_resume_tbl_app_index_detail', 'top');
            }

            //=============如果是发布状态执行以下校验

            if (controlObj.toggle('detail_ck_f_isrelease_tbl_app_index_detail') == 'true') {
                /*
           1、新闻类型，标题类型，内容类型不能为空
           */
                if (tbl_app_index_detail.f_titletypeid.length == 0) {
                    errorMessageHansMap.put('detail_dropdown_f_titletype_tbl_app_index_detail', '不能为空');
                }



                if (tbl_app_index_detail.f_indextypeid.length == 0) {
                    errorMessageHansMap.put('detail_dropdown_f_indextype_tbl_app_index_detail', '不能为空');
                }

                /*
         2、标题图片的数量按照标题类型校验
         */

                //{ id: '1', text: '标题+简述+状态' },
                //{ id: '2', text: '标题+N张小图并排+状态' },
                //{ id: '3', text: '标题+N张大图滚动+图片描述+状态' },
                //{ id: '4', text: '标题+简述+小图九宫+状态' },
                //{ id: '5', text: '标题+1张小图在右侧+状态' },
                //{ id: '6', text: '标题+1张小图在左侧+状态' },
                //{ id: '7', text: '标题+1张大图-首页滚动图片' },
                //{ id: '8', text: '标题+1张小图-首页图片按钮' },
                if (tbl_app_index_detail.f_titletypeid.length != 0) {
                    switch (tbl_app_index_detail.f_titletypeid) {
                        case "1":
                            if (tbl_app_index_title_modallist_Obj._appIndexTitleNumber > 0) {
                                errorMessageHansMap.put('detail_dropdown_f_titletype_tbl_app_index_detail', '【标题图片列表】中不能有图片');
                            }
                            break;
                        case "2":
                            if (tbl_app_index_title_modallist_Obj._appIndexTitleNumber == 0) {
                                errorMessageHansMap.put('detail_dropdown_f_titletype_tbl_app_index_detail', '【标题图片列表】不能为空');
                            }
                            break;
                        case "3":
                            if (tbl_app_index_title_modallist_Obj._appIndexTitleNumber == 0) {
                                errorMessageHansMap.put('detail_dropdown_f_titletype_tbl_app_index_detail', '【标题图片列表】不能为空');
                            }
                            if (tbl_app_index_title_modallist_Obj._appIndexTitleNumber > 9) {
                                errorMessageHansMap.put('detail_dropdown_f_titletype_tbl_app_index_detail', '【标题图片列表】中不能超过9张图片');
                            }
                            break;
                        case "4":
                            if (tbl_app_index_title_modallist_Obj._appIndexTitleNumber == 0) {
                                errorMessageHansMap.put('detail_dropdown_f_titletype_tbl_app_index_detail', '【标题图片列表】不能为空');
                            }
                            if (tbl_app_index_title_modallist_Obj._appIndexTitleNumber > 9) {
                                errorMessageHansMap.put('detail_dropdown_f_titletype_tbl_app_index_detail', '【标题图片列表】中不能超过9张图片');
                            }
                            break;
                        case "5":
                            if (tbl_app_index_title_modallist_Obj._appIndexTitleNumber != 1) {
                                errorMessageHansMap.put('detail_dropdown_f_titletype_tbl_app_index_detail', '【标题图片列表】中只能有一张图片');
                            }
                            break;
                        case "6":
                            if (tbl_app_index_title_modallist_Obj._appIndexTitleNumber != 1) {
                                errorMessageHansMap.put('detail_dropdown_f_titletype_tbl_app_index_detail', '【标题图片列表】中只能有一张图片');
                            }
                            break;
                        case "7":
                            if (tbl_app_index_title_modallist_Obj._appIndexTitleNumber != 1) {
                                errorMessageHansMap.put('detail_dropdown_f_titletype_tbl_app_index_detail', '【标题图片列表】中只能有一张图片');
                            }
                            break;
                        case "8":
                            if (tbl_app_index_title_modallist_Obj._appIndexTitleNumber != 1) {
                                errorMessageHansMap.put('detail_dropdown_f_titletype_tbl_app_index_detail', '【标题图片列表】中只能有一张图片');
                            }
                            break;
                    }
                }


                var data = {
                    sysIdString: that._pr_sys_id,
                    clientInf: _clientInf
                };
                doAjaxFunction(_serviceUrl, 'CheckResource', data, {
                    success: function (message) {
                        var messageJson = (new Function("", "return " + message))();
                        if (messageJson["title"] != "") {
                            errorMessageHansMap.put('detail_file_f_titleresource_tbl_app_index_detail', '存在大于500KB的文件，不利于网络传输，请通过图片编辑功能优化图片。');
                        }


                        if (errorMessageHansMap.keys().length > 0) {
                            _validateMessage.show(errorMessageHansMap, errorMessagePlacementHansMap, true);
                            callBackFunction.fail();
                        }
                        else {
                            _validateMessage.hidden();
                            callBackFunction.success(tbl_app_index_detail);
                        }
                    },
                    fail: function (message) {
                        if (errorMessageHansMap.keys().length > 0) {
                            _validateMessage.show(errorMessageHansMap, errorMessagePlacementHansMap, true);
                            callBackFunction.fail();
                        }
                        else {
                            _validateMessage.hidden();
                            callBackFunction.success(tbl_app_index_detail);
                        }
                    }
                });
            }
            else {
                if (errorMessageHansMap.keys().length > 0) {
                    _validateMessage.show(errorMessageHansMap, errorMessagePlacementHansMap, true);
                    callBackFunction.fail();
                }
                else {
                    _validateMessage.hidden();
                    callBackFunction.success(tbl_app_index_detail);
                }
            }
        }
        catch (ex) {
            _blockMessage.show('checkData执行失败。<br/>' + ex.message, 'fail');
        }

    },

    /* 
    *  
    *  方法:renderTags
    *  参数:
    *  输出标签
    */
    renderTags = function () {

        var content = "";
        for (var i = 0; i < _tagArray.length; i++) {
            content += '<span class="label label-warning hand"';
            if (that._pr_pagetype == "1") {
                content += 'onclick="tbl_app_index_detail_Obj.txt_f_tag_ondelete(this);"';
            }
            content += 'id="tag_' + _tagArray[i] + '">' + _tagArray[i] + '<span>';
            if (that._pr_pagetype == "1") {
                content += '&times;';
            }
            content += '</span></span>';
        }
        $('#div_detail_txt_f_tag_tbl_app_index_detail_bq').html(content);
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
        var columnsString = 'sys_lasteditusername^f_value1^f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^f_title^f_titleresource^f_titletype^f_titletypeid^f_isrelease^f_releasedate^f_indextype^f_indextypeid^f_tag^f_resume^sys_id^sys_orderid';
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
    *  参数:tbl_app_index_detail, callbackFunction
    *  向数据库更新数据，根据数据对象
    */
    updateData = function (tbl_app_index_detail, callbackFunction) {

        var d = new Date();
        var columns = 'sys_id^sys_orderid^f_value1^f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^f_title^f_titleresource^f_titletype^f_titletypeid^f_isrelease^f_releasedate^f_indextype^f_indextypeid^f_tag^f_resume^sys_lastedituserid^sys_lasteditusername^sys_lasteditdate';
        var json = {
            sys_id: that._pr_sys_id,
            sys_orderid: tbl_app_index_detail.sys_orderid,
            f_value1: basePageObj._userInfoJson.sys_photourl,

            f_value2: tbl_app_index_detail.f_value2,

            f_value3: tbl_app_index_detail.f_value3,

            f_value4: tbl_app_index_detail.f_value4,

            f_value5: tbl_app_index_detail.f_value5,

            f_value6: tbl_app_index_detail.f_value6,

            f_value7: tbl_app_index_detail.f_value7,

            f_value8: tbl_app_index_detail.f_value8,

            f_value9: tbl_app_index_detail.f_value9,

            f_value10: tbl_app_index_detail.f_value10,

            f_title: tbl_app_index_detail.f_title,


            f_titleresource: tbl_app_index_detail.f_titleresource,

            f_titletype: tbl_app_index_detail.f_titletype,
            f_titletypeid: tbl_app_index_detail.f_titletypeid,



            f_isrelease: tbl_app_index_detail.f_isrelease,

            f_releasedate: tbl_app_index_detail.f_releasedate,

            f_indextype: tbl_app_index_detail.f_indextype,
            f_indextypeid: tbl_app_index_detail.f_indextypeid,

            f_tag: tbl_app_index_detail.f_tag,

            f_resume: tbl_app_index_detail.f_resume,


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
    *  方法:txt_f_autocomplete_onselected
    *  参数:
    *  f_autocomplete选中事件
    */
    txt_f_tag_onselected = function () {
        var a = controlObj.text('detail_txt_f_tag_tbl_app_index_detail');
        if (_tagArray.indexOf(a) < 0) {
            _tagArray.push(a);
            renderTags();
            controlObj.text('detail_txt_f_tag_tbl_app_index_detail', '');
        }
    },

    /* 
    *  
    *  方法:file_f_titleresource_onchange
    *  参数:
    *  标题资源 onchange事件
    */
    file_f_titleresource_onchange = function () {
        var cc = _resultMessage.message();
        cc += '<br/>';
        cc += '文件全部上传完成';
        _resultMessage.message(cc);
    },


	/* 
    *  
    *  方法:dropdown_f_titletype_onchange
    *  参数:changeEventParameter
    *  标题类型onchange事件
    */
    dropdown_f_titletype_onchange = function (changeEventParameter) {
        switch (changeEventParameter.val) {
            case "1": //{ id: '1', text: '标题+简述+状态' },

                $('#div_detail_txt_f_resume_tbl_app_index_detail').removeClass('hidden');

                $('#div_detail_file_f_titleresource_tbl_app_index_detail').addClass('hidden');
                $('#div_titlemodellist_tbl_app_index_detail').addClass('hidden');

                break;
            case "2":  //{ id: '2', text: '标题+N张小图并排+状态' },              

                $('#div_detail_txt_f_resume_tbl_app_index_detail').addClass('hidden');

                $('#div_detail_file_f_titleresource_tbl_app_index_detail').removeClass('hidden');
                $('#div_titlemodellist_tbl_app_index_detail').removeClass('hidden');

                tbl_app_index_title_modallist_Obj.showFields('f_mediaurl');
                break;
            case "3": //{ id: '3', text: '标题+N张大图滚动+图片描述+状态' },
                $('#div_detail_txt_f_resume_tbl_app_index_detail').addClass('hidden');

                $('#div_detail_file_f_titleresource_tbl_app_index_detail').removeClass('hidden');
                $('#div_titlemodellist_tbl_app_index_detail').removeClass('hidden');
                tbl_app_index_title_modallist_Obj.showFields('f_mediaurl^f_mediadesc');
                break;
            case "4"://{ id: '4', text: '标题+简述+小图九宫+状态' },

                $('#div_detail_txt_f_resume_tbl_app_index_detail').removeClass('hidden');

                $('#div_detail_file_f_titleresource_tbl_app_index_detail').removeClass('hidden');
                $('#div_titlemodellist_tbl_app_index_detail').removeClass('hidden');
                tbl_app_index_title_modallist_Obj.showFields('f_mediaurl');
                break;
            case "5":  //{ id: '5', text: '标题+1张小图在右侧+状态' },

                $('#div_detail_txt_f_resume_tbl_app_index_detail').addClass('hidden');

                $('#div_detail_file_f_titleresource_tbl_app_index_detail').removeClass('hidden');
                $('#div_titlemodellist_tbl_app_index_detail').removeClass('hidden');
                tbl_app_index_title_modallist_Obj.showFields('f_mediaurl');
                break;
            case "6": //{ id: '6', text: '标题+1张小图在左侧+状态' },

                $('#div_detail_txt_f_resume_tbl_app_index_detail').addClass('hidden');

                $('#div_detail_file_f_titleresource_tbl_app_index_detail').removeClass('hidden');
                $('#div_titlemodellist_tbl_app_index_detail').removeClass('hidden');
                tbl_app_index_title_modallist_Obj.showFields('f_mediaurl');
                break;
            case "7": //{ id: '7', text: '标题+1张大图-首页滚动图片' },
                $('#div_detail_txt_f_resume_tbl_app_index_detail').addClass('hidden');

                $('#div_detail_file_f_titleresource_tbl_app_index_detail').removeClass('hidden');
                $('#div_titlemodellist_tbl_app_index_detail').removeClass('hidden');
                tbl_app_index_title_modallist_Obj.showFields('f_mediaurl');
                break;
            case "8": //{ id: '8', text: '标题+1张小图-首页图片按钮' }
                $('#div_detail_txt_f_resume_tbl_app_index_detail').addClass('hidden');

                $('#div_detail_file_f_titleresource_tbl_app_index_detail').removeClass('hidden');
                $('#div_titlemodellist_tbl_app_index_detail').removeClass('hidden');
                tbl_app_index_title_modallist_Obj.showFields('f_mediaurl');
                break;
        }

    },




    /* 
    *  
    *  方法:ck_f_isrelease_onswitchchange
    *  参数:event, state
    *  是否发布切换事件
    */
    ck_f_isrelease_onswitchchange = function (event, state) {

        var cc = _resultMessage.message();
        cc += '<br/>';
        if (state) {
            cc += '是否发布' + '开';
        }
        else {
            cc += '是否发布' + '关';
        }
        _resultMessage.message(cc);
    },


    /* 
    *  
    *  方法:datetime_f_releasedate_time_onchange
    *  参数:
    *  发布日期 onchange事件
    */
    datetime_f_releasedate_time_onchange = function (e) {
        var cc = _resultMessage.message();
        cc += '<br/>';
        cc += '发布日期' + e.time.value;
        _resultMessage.message(cc);

    },
    /* 
    *  
    *  方法:datetime_f_releasedate_date_onchange
    *  参数:
    *  发布日期 onchange事件
    */
    datetime_f_releasedate_date_onchange = function (ev) {
        var ddd = new Date(ev.date.valueOf());

        var cc = _resultMessage.message();
        cc += '<br/>';
        cc += '发布日期' + ddd.Format('yyyy-MM-dd');
        _resultMessage.message(cc);
    },


	/* 
    *  
    *  方法:dropdown_f_indextype_onchange
    *  参数:changeEventParameter
    *  新闻类型onchange事件
    */
    dropdown_f_indextype_onchange = function (changeEventParameter) {

        var cc = _resultMessage.message();
        cc += '<br/>';
        // 
        // val: e.val, added: e.added, removed: e.removed
        var isloadchild = false;
        if (changeEventParameter.removed == undefined || changeEventParameter.added == undefined) {
            isloadchild = true;
        }
        else if (changeEventParameter.added.id != changeEventParameter.removed.id) {
            isloadchild = true;
        }
        else {
            isloadchild = false;
        }
        if (isloadchild) {
            cc += '类型' + changeEventParameter.val;
        }
        else {
            cc += '类型' + '无变化';
        }
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
        _pr_indextype: '',//新闻大类
        _pr_indextypeactive: '',//新闻大类中用户可见的小类的ID，用^分割
        _pr_titletypeactive: '',//标题类型中用户可见的小类ID，用^分割
        _pr_contenttypeactive: '',//内容类型中用户可见的小类ID，用^分割

        //=================================================================================
        //                                      公有方法 
        //=================================================================================

        /* 
        *  
        *  方法:init
        *  参数:
        *  页面初始化方法
        */
        init: function () {

            try {
                _alertMessage = new alertMessage();
                _confirmMessage = new confirmMessage();
                _resultMessage = new resultMessage();
                _blockMessage = new blockMessage();
                _blockMessage.show('程序加载中...', 'loading');

                basePageObj.initBasePage({
                    success: function () {

                        initParameter({
                            success: function () {
                                //初始化页面控件的代码数据，放到hashmap中
                                initBaseCode({
                                    success: function () {
                                        //初始化页面控件
                                        initControl({
                                            success: function () {
                                                //绑定数据
                                                that.bindPage({
                                                    success: function () {
                                                        _validateMessage = new validateMessage('btn_command_save_tbl_app_index_detail');

                                                        _ladda_btn_command_save = Ladda.create('btn_command_save_tbl_app_index_detail');

                                                        switch (that._pr_pagetype) {
                                                            case "1":
                                                                setDisable(false);
                                                                break;
                                                            case "2":
                                                                setDisable(true);
                                                                break;
                                                        }

                                                     

                                                        //加载标题子表
                                                        $('#div_tbl_app_index_title').load('../tbl_app_index_title/tbl_app_index_title_modallist_part.html', null, function () {
                                                            tbl_app_index_title_modallist_Obj._pr_fk_tbl_app_index_sys_id = that._pr_sys_id;
                                                            tbl_app_index_title_modallist_Obj._pr_listtype = that._pr_pagetype;

                                                            tbl_app_index_title_modallist_Obj.init({
                                                                success: function () {
                                                                    $('#div_tbl_app_index_title').css('display', '');
                                                                    $('#div_loading_content1').css('display', 'none');
                                                                    var f_titletypeid = controlObj.singledropdownlistid('detail_dropdown_f_titletype_tbl_app_index_detail')
                                                                    dropdown_f_titletype_onchange({ "val": f_titletypeid });
                                                                    _blockMessage.hidden();
                                                                }
                                                            });
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
                    fail: function (message) {
                        _blockMessage.show(message, 'fail');
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
                    success: function (tbl_app_index_detail) {

                        bindModel(tbl_app_index_detail, {
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
                    success: function (tbl_app_index_detail) {
                        checkModel(tbl_app_index_detail, {
                            success: function (tbl_app_index_detail) {
                                updateData(tbl_app_index_detail, {
                                    success: function () {
                                        _ladda_btn_command_save.stop();
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
        },

        /* 
        *  
        *  方法:btn_command_cancle_onclick
        *  参数:
        *  返回按钮
        */
        btn_command_cancle_onclick: function () {
            var url = _pr_fromurl;
            url += '?uid=' + basePageObj._userInfoJson.sys_userid;

            var fromurlJson = (new Function("", "return " + _pr_fromurlparam))();

            $.each(fromurlJson, function (key, value) {
                if (typeof value == 'object') {
                    url += '&' + key + '=' + JSON.stringify(value);
                }
                else {
                    url += '&' + key + '=' + value;
                }

            });

            commonObj.changeUrl(url, 'right-hide');
        },
        /* 
        *  
        *  方法:txt_f_tag_oninput
        *  参数:
        *  返回按钮
        */
        txt_f_tag_oninput: function () {
            var a = controlObj.text('detail_txt_f_tag_tbl_app_index_detail');
            if (a.substr(a.length - 1, 1) == ' ') {
                a = a.substr(0, a.length - 1);
                if (_tagArray.indexOf(a) < 0) {
                    _tagArray.push(a);
                    renderTags();
                }
                controlObj.text('detail_txt_f_tag_tbl_app_index_detail', '');
            }
        },
        /* 
        *  
        *  方法:txt_f_tag_oninput
        *  参数:
        *  返回按钮
        */
        txt_f_tag_ondelete: function (e) {
            var a = e.id.substr(4, e.id.length - 4);
            if (_tagArray.indexOf(a) >= 0) {
                _tagArray.remove(_tagArray.indexOf(a));
            }
            renderTags();
        },

        //显示或隐藏
        showHide: function (divid) {
            if ($('#li_' + divid).hasClass('menu-active')) {

            }
            else {
                $('.menu-active').removeClass('menu-active');
                $('.div-menu').addClass('hidden');
                $('#li_' + divid).addClass('menu-active')
                $('#' + divid).removeClass('hidden')
            }

        },
        showHideFValue: function (divid) {
            if ($('#' + divid).hasClass('hidden')) {
                $('#' + divid).removeClass('hidden')
            }
            else {
                $('#' + divid).addClass('hidden')
            }
        }

    };

    return that;
})();

$(document).ready(function () {
    tbl_app_index_detail_Obj.init();
});




