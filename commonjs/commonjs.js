
; var commonObj = (function ()
{
    var _serviceCommonUrl = '//127.0.0.1/sara.dd.ldsw/service/service_common.asmx/',

   //用8位数据或字母设置的token数据。 
     _commonJsToken = '12345678',
/* 
 *  
 *  方法:getIdText
 *  参数:dataNameStr, whereStr, columsStr,callbackFunction
 *  返回:messageJsonArray
 */
    getIdText = function (dataNameStr, whereStr, columsStr, callbackFunction)
    {
        var data = { dataNameStr: dataNameStr, whereStr: whereStr, columsStr: columsStr };
        doAjaxFunction(_serviceCommonUrl, 'GetIdText', data, {
            success: function (message)
            {
                var messageJsonArray = (new Function("", "return " + message))();

                callbackFunction.success(messageJsonArray);
            },
            fail: function (message)
            {
                _blockMessage.show(_serviceCommonUrl + 'GetIdText<br/>' + message, 'fail');
                if (callbackFunction.fail)
                {
                    callbackFunction.fail(message);
                }
            }
        });
    },

/* 
 *  
 *  方法:getCodeServiceJson
 *  参数:menuNodeidString,callbackFunction
 *  返回:messageJson
 */
    getCodeServiceJson = function (menuNodeIdsString, callbackFunction)
    {



        var data = { menuNodeIdsString: menuNodeIdsString };
        doAjaxFunction(_serviceCommonUrl, 'GetContentCollectionByMenuNodeIDs', data, {
            success: function (message)
            {
                var messageJson = (new Function("", "return " + message))();
                callbackFunction.success(messageJson);
            },
            fail: function (message)
            {

                if (callbackFunction.fail)
                {
                    callbackFunction.fail(message);
                }
                _blockMessage.show(_serviceCommonUrl + 'GetContentCollectionByMenuNodeIDs<br/>' + message, 'fail');
            }
        });
    },

/* 
 *  方法:querySqls
 *  参数:sqlStringsJson:json形式的sql语句集合,callbackFunction
 *  返回:messageJson
 */
    querySqls = function (sqlStringsJson, callbackFunction)
    {
        try
        {
            if (typeof (sqlStringsJson) == 'string')
            {
                sqlStringsJson = new Function("return " + sqlStringsJson)();
            }
            sqlStringsJson = JSON.stringify(sqlStringsJson);
        }
        catch (e)
        {
            if (callbackFunction.fail)
            {
                callbackFunction.fail("json格式不正确");
            }
            return;
        }

        var data = { sqlStringJson: sqlStringsJson };

        doAjaxFunction(_serviceCommonUrl, 'QuerySqls', data, {
            success: function (message)
            {
                var messageJson = (new Function("", "return " + message))();
                callbackFunction.success(messageJson);
            },
            fail: function (message)
            {

                if (callbackFunction.fail)
                {
                    callbackFunction.fail(message);
                }
                _blockMessage.show(_serviceCommonUrl + 'QuerySqls<br/>' + message, 'fail');
            }
        });
    },

    /* 
     *  
     *  方法:executeSqls
     *  参数:sqlStringsJson:json形式的sql语句集合,callbackFunction
     *  返回:messageJson
     */
    executeSqls = function (sqlStringsJson, callbackFunction)
    {
        try
        {
            if (typeof (sqlStringsJson) == 'string')
            {
                sqlStringsJson = new Function("return " + sqlStringsJson)();
            }
            sqlStringsJson = JSON.stringify(sqlStringsJson);
        }
        catch (e)
        {
            if (callbackFunction.fail)
            {
                callbackFunction.fail("json格式不正确");
            }
            return;
        }

        var data = { sqlStringJson: sqlStringsJson };

        doAjaxFunction(_serviceCommonUrl, 'ExecuteSqls', data, {
            success: function (message)
            {
                var messageJson = (new Function("", "return " + message))();
                callbackFunction.success(messageJson);
            },
            fail: function (message)
            {

                if (callbackFunction.fail)
                {
                    callbackFunction.fail(message);
                }
                _blockMessage.show(_serviceCommonUrl + 'ExecuteSqls<br/>' + message, 'fail');
            }
        });
    },

    /* 
     *  
     *  方法:getSingleSqls
     *  参数:sqlStringsJson:json形式的sql语句集合,callbackFunction
     *  返回:messageJson
     */
    getSingleSqls = function (sqlStringsJson, callbackFunction)
    {
        try
        {
            if (typeof (sqlStringsJson) == 'string')
            {
                sqlStringsJson = new Function("return " + sqlStringsJson)();
            }
            sqlStringsJson = JSON.stringify(sqlStringsJson);
        }
        catch (e)
        {
            if (callbackFunction.fail)
            {
                callbackFunction.fail("json格式不正确");
            }
            return;
        }

        var data = { sqlStringJson: sqlStringsJson };

        doAjaxFunction(_serviceCommonUrl, 'GetSingleSqls', data, {
            success: function (message)
            {
                var messageJson = (new Function("", "return " + message))();
                callbackFunction.success(messageJson);
            },
            fail: function (message)
            {

                if (callbackFunction.fail)
                {
                    callbackFunction.fail(message);
                }
                _blockMessage.show(_serviceCommonUrl + 'GetSingleSqls<br/>' + message, 'fail');
            }
        });
    },

     /* 
     *  
     *  方法:updateLog,每个业务页面都需要这个方法，实现数据更新后的内容保存
     *  参数:
     *  返回:
     */
    updateLog = function (serverModel, clientModel, tableName, tablePriKeyValue, editType, editSource, controlIdTemplate, clientInf, callbackFunction)
    {
        try
        {

            var serviceUrl = '//127.0.0.1/sara.dd.ldsw/service/service_tbl_ld_log.asmx/';
            var arr = [];
            for (var key in clientModel)
            {
                if (key.indexOf('sys_') == 0)
                {

                }
                else
                {
                    var newValue = clientModel[key];
                    var oldValue = serverModel[key];

                    var isNeedAdd = false;
                    if (newValue == oldValue)
                    {
                        isNeedAdd = false
                    }
                    else
                    {
                        try
                        {
                            isNeedAdd = true;
                            var oldValueFormat = oldValue.toDateTime().Format("yyyy-MM-dd hh:mm:ss");
                            if (oldValueFormat == newValue)
                            {
                                isNeedAdd = false;
                            }
                        }
                        catch (ex)
                        {

                        }
                    }



                    if (isNeedAdd == true)
                    {
                        var controlId = controlIdTemplate.replaceAll('【key】', key).replaceAll('【tablename】', tableName);
                        var name = $("#" + controlId).find("label.control-label").text();
                        if (name == undefined || name == null)
                        {
                            name = key;
                        }
                        arr.push({ "key": key, "oldvalue": oldValue, "newvalue": newValue, "name": name });
                    }
                }
            }

            //写入数据库

            //_clientInf
            //basePageObj._userInfoJson.sys_username

            if (arr.length > 0)
            {

                var d = new Date();
                var json = {
                    f_businesstablename: tableName,
                    f_businesstableprikeyvalue: tablePriKeyValue,
                    f_editusername: basePageObj._userInfoJson.sys_username,
                    f_edituserloginname: basePageObj._userInfoJson.sys_userloginname,
                    f_edituserid: basePageObj._userInfoJson.sys_userid,
                    f_edituserip: basePageObj._userInfoJson.ip,
                    f_editusermac: basePageObj._userInfoJson.mac,
                    f_editdatetime: d.Format('yyyy-MM-dd hh:mm:ss'),
                    f_edittype: editType,
                    f_editsource: editSource,
                    f_editcontentid: '',
                    f_editcontent: JSON.stringify(arr),
                    f_bz: '',
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
                    clientInf: clientInf
                }
                doAjaxFunction(serviceUrl, 'Add', data, {
                    success: function (result)
                    {
                        callbackFunction.success();
                    },
                    fail: function (message)
                    {
                        callBackFunction.fail('Add:' + message);
                    }
                });
            }
            else
            {
                callbackFunction.success();
            }

        }
        catch (ex)
        {
            callbackFunction.fail(ex.message);
        }

    },

    creatExcelByData = function (arrStr, callbackFunction)
    {

        try
        {
            if (typeof (arrStr) == 'string')
            {
                arrStr = new Function("return " + arrStr)();
            }
            arrStr = JSON.stringify(arrStr);
        }
        catch (e)
        {
            if (callbackFunction.fail)
            {
                callbackFunction.fail("json格式不正确");
            }
            return;
        }

        var data = { dataJson: arrStr };

        doAjaxFunction(_serviceCommonUrl, 'CreatExcelByData', data, {
            success: function (message)
            {

                callbackFunction.success(message);
            },
            fail: function (message)
            {

                if (callbackFunction.fail)
                {
                    callbackFunction.fail(message);
                }
                _blockMessage.show(_serviceCommonUrl + 'CreatExcelByData<br/>' + message, 'fail');
            }
        });
    },

        changeUrl = function (foreUrl, animClass)
        {
            foreUrl = foreUrl.replaceAll('#', '');
            if (that.need2BeInContainer)
            {
                window.top.changeUrl(foreUrl, animClass || 'normal-show');
            } else
            {
                window.location.href = foreUrl;
            }
        };

    var that = {
        need2BeInContainer: false,
        _serviceCommonUrl: _serviceCommonUrl,
        _commonJsToken: _commonJsToken,
        getIdText: getIdText,
        getCodeServiceJson: getCodeServiceJson,
        querySqls: querySqls,
        executeSqls: executeSqls,
        getSingleSqls: getSingleSqls,
        creatExcelByData: creatExcelByData,
        changeUrl: changeUrl,
        updateLog: updateLog,
        projectname: '127.0.0.1/sara.dd.ldsw',
        openNewWindow: function (url, isCloseLocation, target)
        {
            target = target || Math.random().toString();
            var features = 'location=no,width=' + (screen.availWidth - 10) + ',height=' + (screen.availHeight - 50) + ' ,top=0, left=0, toolbar=no, menubar=no, scrollbars=yes, resizable=yes'
            if (isCloseLocation)
            {
                return window.open(url, target, features);
            } else
            {
                return window.open(url, target);
            }
        },
        getThumbnailpathUrlByFileName: function (filename)
        {
            var url = '//127.0.0.1/sara.dd.ldsw.file/files/thumbnailpath/' + filename.substr(0, filename.lastIndexOf('.')) + '-thumbnail' + filename.substr(filename.lastIndexOf('.'), filename.length - filename.lastIndexOf('.'));
            return url;
        },
        getUrlByFileName: function (filename)
        {
            var url = '//127.0.0.1/sara.dd.ldsw.file/files/fileuploadpath/' + filename;
            return url;
        },
        getUserPhotoUrlByFileName: function (filename)
        {
            var url = '//127.0.0.1/sara.dd.ldsw.file/files_auth/fileuploadpath/' + filename;
            return url;
        },


        /* 
*  
*  转换文件大小（以b为单位）为文件的可读大小（kb/mb/gb）
*  参数:文件大小以b为单位
*  返回:
*/
        formatFileSize: function (contentlength)
        {
            var fileSize = "";

            var f;

            var unit = parseFloat(1024);

            if (contentlength.toString().length >= 4)
            {
                f = (parseFloat(contentlength) / unit).toFixed(2);


                if (f.toString().split('.')[0].toString().length >= 4)
                {
                    f = (parseFloat(f) / unit).toFixed(2);

                    if (f.toString().split('.')[0].toString().length >= 4)
                    {

                        fileSize = (parseFloat(f) / unit).toFixed(2).toString() + "GB";

                    }
                    else
                    {
                        fileSize = f.toString() + "MB";
                    }
                }
                else
                {
                    fileSize = f.toString() + "KB";
                }
            }
            else//字节
            {
                fileSize = contentlength.toString() + "字节";
            }


            return fileSize;

        },
        /*
 处理sql语句中in的条件不能超过1000个的问题
 */
        formatSqlStrWidthIn1000: function (str)
        {
            if (str.indexOf(" in ") > -1)
            {


                var mc = str.match(/ in /g);


                var current = 0;//游标
                var start = 0;//开始位置
                var khstart = 0;//开始括号位置
                var khend = 0;//结束括号位置
                var khcount = 0;//括号深度
                var temp_str = "";//临时字符串
                var temp_strs;//临时字符串数组
                var column_in = "";//字段与in关键字
                var old_str = "";//要替换的字符串
                var new_str = "";//要替换成的字符串
                var temp_int = 0;//需要or几次

                var oldstrs = new Array();
                var newstrs = new Array();
                for (var i = 0; i < mc.length; i++)
                {
                    current = str.indexOf(" in ", current);
                    start = current - 1;
                    //寻找列名
                    while (str[start] == ' ')
                    {
                        start--;
                    }
                    while (str[start] != ' ')
                    {
                        start--;
                    }
                    start++;

                    column_in = str.substr(start, current - start + 4);


                    //寻找（）
                    current += 4;
                    while (str[current] == ' ')
                    {
                        current++;
                    }

                    if (str[current] != '(')
                    {
                        continue;
                    }
                    else
                    {
                        khstart = current;
                        khcount = 1;
                        while (khcount > 0)
                        {
                            current++;
                            if (str[current] == '(')
                            {
                                khcount++;
                            }
                            else if (str[current] == ')')
                            {
                                khcount--;
                            }
                        }
                        khend = current;
                        old_str = str.substr(start, khend - start + 1);

                        //判断首字母为'''
                        current = khstart + 1;
                        while (str[current] == ' ')
                        {
                            current++;
                        }
                        if (str[current] != '\'')
                        {
                            continue;
                        }
                        else
                        {
                            temp_str = str.substr(khstart + 1, khend - khstart - 1);
                            temp_strs = temp_str.split(',');
                            if (temp_strs.length > 1000)
                            {
                                new_str = "";
                                temp_int = 0;
                                while (temp_int * 1000 < temp_strs.length)
                                {
                                    temp_str = "";
                                    for (var i = 0; i < 1000 && temp_int * 1000 + i < temp_strs.length; i++)
                                    {
                                        temp_str += temp_strs[temp_int * 1000 + i] + ",";
                                    }
                                    if (temp_str != "")
                                    {
                                        temp_str = temp_str.substr(0, temp_str.length - 1);
                                        new_str += column_in + " (" + temp_str + ") or ";
                                    }
                                    temp_int++;
                                }

                                if (new_str != "")
                                {
                                    new_str = " (" + new_str.substr(0, new_str.length - 3) + ") ";

                                    oldstrs.push(old_str);
                                    newstrs.push(new_str);
                                }
                            }
                        }
                    }

                }

                for (var i = 0; i < oldstrs.length; i++)
                {
                    str = str.replaceAll(oldstrs[i], newstrs[i]);
                }
                return str;
            }
            else
            {
                return str;
            }
        },
        /*获取nodeid */
        formatNodeId: function (str,len)
        {
            if (str != null )
            {
                str = str.toString();
            }
            var regPos = /^\d+$/; // 非负整数
            if (len == null || len == "" || len == undefined || len == "undefined" || !regPos.test(len))
            {
                len = parseInt(4);
            }
            else
            {
                len = parseInt(len);
            }

            var charset = str.length % len;
            
            for (var i = len - charset; i > 0; i--)
            {
                str = "0" + str;
            }

            return str;
        },
        /*获取一个永不重复的16位数字*/
        getNoRepeatNumber: function ()
        {
            var now = new Date();

            var year = now.getFullYear();       //年  
            var month = now.getMonth() + 1;     //月  
            var day = now.getDate();            //日  

            var hh = now.getHours();            //时  
            var mm = now.getMinutes();          //分  
            var ss = now.getSeconds();            //秒  

            var clock = year;

            if (month < 10) clock += "0";
            clock += month;

            if (day < 10) clock += "0";
            clock += day;

            if (hh < 10) clock += "0";
            clock += hh;

            if (mm < 10) clock += '0';
            clock += mm ;

            if (ss < 10) clock += '0';
            clock += ss;
            var randomnum = (Math.random() * 10000).toFixed(0).toString();
            while (randomnum.length < 4)
            {
                randomnum = "0" + randomnum;
            }
            clock += randomnum;
            return clock;
        },
    };
    return that;
})();
/* 
 *  类：control
 *  方法:用于控制各类型控件
 *  参数:
 *  返回:
 */

var controlObj = new function ()
{
    this.text = function (id, val)
    {
        if (val === undefined)
        {
            if ($('#' + id).val() === undefined)
            {
                return $('#' + id).val();
            }
            else
            {
                return $('#' + id).val().formatStringRN();
            }
        }
        else
        {

            if ('string' !== typeof val)
            {
                val = String(val);
            }
            $('#' + id).val(val.returnStringRN());
        }
    };
    this.textdisable = function (id, isdisable)
    {

        if (isdisable == undefined)
        {
            if ($('#' + id).attr('disabled') == undefined || $('#' + id).attr('disabled').toString() == 'false')
            {
                return false;
            }
            else
            {
                return true;
            }
        }
        else
        {
            if (isdisable)
            {
                $('#' + id).attr('disabled', 'disabled');
            }
            else
            {
                $('#' + id).removeAttr('disabled');
            }
        }

    };

    this.autocompleteinit = function (id, data, onchangefunction)
    {
        var dataNew = [];
        var isNewData = false;
        if (data.length > 0)
        {
            if (typeof data[0] == "object")
            {
                $.each(data, function (i, u)
                {
                    dataNew.push(data[i]["text"]);
                });
                isNewData = true;
            }
        }
        if (isNewData == false)
        {
            dataNew = data;
        }
        var opertion = {
            source: dataNew,
            showHintOnFocus: true
        };
        if (onchangefunction != null && onchangefunction != undefined && onchangefunction != '')
        {
            opertion.afterSelect = onchangefunction;
        }

        $("#" + id).typeahead(opertion);
    };

    this.richtext = function (id, val)
    {
        if (val === undefined)
        {
            if ($('#' + id).code() === undefined)
            {
                return $('#' + id).code();
            }
            else
            {
                return $('#' + id).code().formatStringRN();
            }
        }
        else
        {
            if ('string' !== typeof val)
            {
                val = String(val);
            }
            $("#" + id).code(val.returnStringRN());
        }
    };
    this.richtextdisable = function (id, isdisable)
    {
        if (isdisable == undefined)
        {
            return $('#' + id)[0].disabled;
        }
        else
        {
            if (isdisable)
            {
                $('#' + id).disable(true);
            }
            else
            {
                $('#' + id).disable(false);
            }
        }
    };
    this.richtextinit = function (id, onchangefunction, options)
    {
        var option = {
            height: 300,
            disableLinkTarget: 1,
            disableDragAndDrop: 1,
            disableResizeEditor: 1,
            //airMode: true,
            toolbar: [
                ["style", ["style"]],
                ["font", ["bold", "italic", "underline", "superscript", "subscript", "strikethrough", "clear"]],
                ["fontname", ["fontname"]],
                ["color", ["color"]],
                ["para", ["ul", "ol", "paragraph"]],
                ["height", ["height"]],
                ["table", ["table"]],
                //["insert", [ "picture", "hr"]],
                ["insert", ["hr"]],
                ["view", ["fullscreen", "codeview"]],
                //["view", ["fullscreen"]],
                ["help", ["help"]]]
        };

        if (onchangefunction != null && onchangefunction != undefined)
        {
            option.onChange = onchangefunction;
        }

        if (options)
        {
            $.extend(option, options);
        }

        //富文本编辑框
        $('#' + id).summernote(option);
    };

    this.slider = function (id, val)
    {
        if (val == undefined)
        {
            return $('#' + id).val();
        }
        else
        {
            $('#' + id).val(val);
        }
    };
    this.sliderdisable = function (id, isdisable)
    {
        // $('#' + id).noUiSlider("disabled", isdisable);

        //$('#' + id).noUiSlider({
        //    range: [0, 100],
        //    start: 50,
        //    handles: 1
        //}).noUiSlider("disabled", true);
        if (isdisable == undefined)
        {
            if ($('#' + id).attr('disabled') == undefined || $('#' + id).attr('disabled').toString() == 'false')
            {
                return false;
            }
            else
            {
                return true;
            }
        }
        else
        {
            if (isdisable)
            {
                $('#' + id).attr("disabled", "disabled");
            }
            else
            {
                $('#' + id).removeAttr("disabled");
            }
        }


    };
    this.sliderinit = function (id, onchangefunction, rangeMin, rangeMax)
    {
        var rangeMinNumber = 0;
        var rangeMaxNumber = 100;

        if (rangeMin == undefined || rangeMin == null && rangeMin == "")
        {


        }
        else
        {
            try
            {
                rangeMinNumber = Number(rangeMin);
            }
            catch (ex)
            {

            }
        }
        if (rangeMax == undefined || rangeMax == null || rangeMax == "")
        {


        }
        else
        {
            try
            {
                rangeMaxNumber = Number(rangeMax);
            }
            catch (ex)
            {

            }
        }

        $('#' + id).noUiSlider({
            start: [0],
            connect: "lower",
            step: 1,
            orientation: "horizontal",
            range: {
                'min': [rangeMinNumber],
                'max': [rangeMaxNumber]
            }
        });
        if (onchangefunction != undefined && onchangefunction != null)
        {
            $('#' + id).on({
                //slide: function ()
                //{
                //    $("#l-slide").tShow(450);
                //},
                //set: function ()
                //{
                //    $("#l-set").tShow(450);
                //},
                change: onchangefunction
            });
        }

    };


    this.datetime = function (dateid, timeid, val)
    {
        if (val == undefined)
        {
            var date = '1900-01-01';
            if (dateid != '' && dateid != null)
            {
                date = $('#' + dateid).bootstrapdatepicker('getDate').Format('yyyy-MM-dd');
            }
            var time = '00:00:00';
            if (timeid != '' && timeid != null)
            {
                time = $('#' + timeid).timepicker('getTime');
            }

            return date + ' ' + time;
        }
        else
        {
            var ccd = val.toDateTime();
            if (dateid != '' && dateid != null)
            {
                $('#' + dateid).bootstrapdatepicker('setDate', ccd);
            }
            if (timeid != '' && timeid != null)
            {
                $('#' + timeid).timepicker('setTime', ccd.Format('hh:mm:ss'));
            }
        }
    };
    this.datetimedisable = function (dateid, timeid, isdisable)
    {
        if (isdisable == undefined)
        {
            var disableDate = false;
            var disableTime = false;
            if (dateid != '' && dateid != null)
            {
                disableDate = $('#' + dateid).bootstrapdatepicker('getDisabled');
            }
            if (timeid != '' && timeid != null)
            {
                disableTime = $('#' + timeid).timepicker('getDisabled');
            }

            var ss = '{"' + dateid + '":' + disableDate + ',"' + timeid + '":' + disableTime + '}';
            return (new Function("", "return " + ss))();
        }
        else
        {
            if (isdisable)
            {
                if (dateid != '' && dateid != null)
                {
                    $('#' + dateid).bootstrapdatepicker('setDisabled', true);
                }
                if (timeid != '' && timeid != null)
                {
                    $('#' + timeid).timepicker('setDisabled', true);
                }
            }
            else
            {
                if (dateid != '' && dateid != null)
                {
                    $('#' + dateid).bootstrapdatepicker('setDisabled', false);
                }
                if (timeid != '' && timeid != null)
                {
                    $('#' + timeid).timepicker('setDisabled', false);
                }
            }
        }

    };
    this.datetimeinit = function (dateid, timeid, ondatechangefunction, ontimechangefunction)
    {
        if (dateid != null && dateid != '')
        {
            if (ondatechangefunction != undefined && ondatechangefunction != null && ondatechangefunction != '')
            {
                //日期
                $('#' + dateid).bootstrapdatepicker({
                    format: 'yyyy-mm-dd',
                    weekStart: 1,
                    autoclose: true,
                    todayBtn: 'linked',
                    todayHighlight: true,
                    clearBtn: false
                }).on('changeDate', ondatechangefunction);
            }
            else
            {
                //日期
                $('#' + dateid).bootstrapdatepicker({
                    format: 'yyyy-mm-dd',
                    weekStart: 1,
                    autoclose: true,
                    todayBtn: 'linked',
                    todayHighlight: true,
                    clearBtn: false
                });
            }

        }

        if (timeid != null && timeid != '')
        {
            if (ontimechangefunction != undefined && ontimechangefunction != null && ontimechangefunction != '')
            {
                //时间
                $("#" + timeid).timepicker({
                    minuteStep: 1,
                    showSeconds: true,
                    showMeridian: false
                }).on('changeTime.timepicker', ontimechangefunction);
            }
            else
            {
                //时间
                $("#" + timeid).timepicker({
                    minuteStep: 1,
                    showSeconds: true,
                    showMeridian: false
                })
            }
        }
    };

    this.toggle = function (id, val)
    {
        if (val == undefined)
        {
            return $('#' + id).bootstrapSwitch('state').toString();
        }
        else
        {
            if ($('#' + id).bootstrapSwitch('disabled').toString() == 'true')
            {
                $('#' + id).bootstrapSwitch('disabled', false);
                if (val == 'true')
                {
                    $('#' + id).bootstrapSwitch('state', true);
                }
                else
                {
                    $('#' + id).bootstrapSwitch('state', false);
                }
                $('#' + id).bootstrapSwitch('disabled', true);
            }
            else
            {
                if (val == 'true')
                {
                    $('#' + id).bootstrapSwitch('state', true);
                }
                else
                {
                    $('#' + id).bootstrapSwitch('state', false);
                }
            }
        }
    };
    this.toggledisable = function (id, isdisable)
    {
        if (isdisable == undefined)
        {
            return $('#' + id).bootstrapSwitch('disabled').toString();
        }
        else
        {
            if (isdisable)
            {
                $('#' + id).bootstrapSwitch('disabled', true);
            }
            else
            {
                $('#' + id).bootstrapSwitch('disabled', false);
            }
        }
    };
    this.toggleinit = function (id, onchangefunction)
    {
        setTimeout(function ()
        {
            //开关
            $('#' + id).bootstrapSwitch();
            if (onchangefunction != null && onchangefunction != '' && onchangefunction != undefined)
            {
                $('#' + id).on('switchChange.bootstrapSwitch', onchangefunction);
            }
        }, 100);
    };

    this.multidropdownlist = function (id)
    {

        if ($("#" + id).select2("data") == null)
        {
            return "";
        }
        else
        {
            var selectedArray = $("#" + id).select2("data");
            var selectedtexts = '';

            $.each(selectedArray, function (i, u)
            {
                selectedtexts += selectedArray[i].text + ',';
            });

            return selectedtexts.trimEnd(',');
        }
    };
    this.multidropdownlistid = function (id, val)
    {
        if (val == undefined)
        {
            if ($("#" + id).select2("data") == null)
            {
                return "";
            }
            else
            {
                var selectedArray = $("#" + id).select2("data");
                var selectedids = '';

                $.each(selectedArray, function (i, u)
                {
                    selectedids += selectedArray[i].id + ',';
                });

                return selectedids.trimEnd(',');
            }
        }
        else
        {

            $("#" + id).select2("val", val.split(','));
        }
    };
    this.multidropdownlistdisable = function (id, isdisable)
    {
        if (isdisable == undefined)
        {
            return $("#" + id).select2("readonly");
        }
        else
        {
            if (isdisable)
            {
                $("#" + id).select2("readonly", true);
            }
            else
            {
                $("#" + id).select2("readonly", false);
            }
        }

    };
    this.multidropdownlistinit = function (id, data, onchangefunction)
    {
        //复选下拉列表
        $('#' + id).select2({
            placeholder: "选择一个或多个内容",
            // minimumInputLength: 1,
            multiple: true,
            allowClear: true,
            data: data
        });

        if (onchangefunction != null && onchangefunction != undefined && onchangefunction != '')
        {
            $("#" + id).on("change", onchangefunction);
        }
    };

    this.singledropdownlist = function (id)
    {

        if ($("#" + id).select2("data") == null)
        {
            return "";
        }
        else
        {
            return $("#" + id).select2("data").text;
        }
    };
    this.singledropdownlistid = function (id, val)
    {
        if (val === undefined)
        {
            if ($("#" + id).select2("data") == null)
            {
                return "";
            }
            else
            {
                return $("#" + id).select2("val");
            }
        }
        else
        {
            $("#" + id).select2("val", val);
        }
    };
    this.singledropdownlistdisable = function (id, isdisable)
    {
        if (isdisable == undefined)
        {
            return !$("#" + id).select2("enable");
        }
        else
        {
            if (isdisable)
            {

                $("#" + id).select2("enable", false);
            }
            else
            {
                $("#" + id).select2("enable", true);



            }
        }

    };
    this.singledropdownlistinit = function (id, data, onchangefunction)
    {
        //复选下拉列表
        $('#' + id).select2({
            placeholder: " ",
            // minimumInputLength: 1,
            allowClear: true,
            data: data
        });

        if (onchangefunction != null && onchangefunction != undefined && onchangefunction != '')
        {
            $("#" + id).on("change", onchangefunction);
        }
    };

    this.fileuploaderinit = function (id, ops, onalluploadend)
    {
        if (onalluploadend && typeof onalluploadend == 'function')
        {
            ops.onAllUploadEnd = onalluploadend;
        }
        html5fileuploader(id).init(ops);
    };
    this.fileuploaderdisable = function (id, isdisable)
    {
        if (isdisable == undefined)
        {
            return html5fileuploader(id).disable();
        }
        else
        {
            if (isdisable)
            {
                html5fileuploader(id).disable(true);
            } else
            {
                html5fileuploader(id).disable(false);
            }
        }
    };
    this.fileuploaderid = function (id)
    {
        return html5fileuploader(id).getfileid();
    };
    this.fileuploaderbind = function (id, fileid)
    {
        html5fileuploader(id).bind(fileid);
    };
    this.fileuploadercontent = function (id)
    {
        return html5fileuploader(id).getcontent();
    };
    this.fileuploadernewfileid = function (id)
    {
        return html5fileuploader(id).newfileid();
    };

    this.radiolist = function (id, text)
    {
        if (text === undefined)
        {
            return $('#' + id).radiolist('text');
        } else
        {
            return $('#' + id).radiolist('text', text);
        }
    };
    this.radiolistinit = function (id, data, onchangefunction, configObj)
    {
        if ('string' == typeof onchangefunction)
        {
            onchangefunction = eval(onchangefunction);
        }

        $('#' + id).radiolist($.extend({
            data: data,
            change: onchangefunction
        }, configObj));
    };
    this.radiolistbind = function (id, data)
    {
        $('#' + id).radiolist('bind', data);
    };
    this.radiolistdisable = function (id, isDisable, inverseVal)
    {
        return $('#' + id).radiolist('disable', isDisable, inverseVal);
    };
    this.radiolistid = function (id, val)
    {
        if (val === undefined)
        {
            return $('#' + id).radiolist('val');
        } else
        {
            return $('#' + id).radiolist('val', val);
        }
    };


    this.checklist = function (id, text)
    {
        if (text === undefined)
        {
            return $('#' + id).checklist('text');
        } else
        {
            return $('#' + id).checklist('text', text);
        }
    };
    this.checklistinit = function (id, data, onchangefunction, configObj)
    {
        if ('string' == typeof onchangefunction)
        {
            onchangefunction = eval(onchangefunction);
        }

        $('#' + id).checklist($.extend({
            data: data,
            change: onchangefunction
        }, configObj));
    };
    this.checklistbind = function (id, data)
    {
        $('#' + id).checklist('bind', data);
    };
    this.checklistdisable = function (id, isDisable, inverseVal)
    {
        return $('#' + id).checklist('disable', isDisable, inverseVal);
    };
    this.checklistid = function (id, val)
    {
        if (val === undefined)
        {
            return $('#' + id).checklist('val');
        } else
        {
            return $('#' + id).checklist('val', val);
        }
    };


    this.itemlist = function (id, text)
    {
        if (text === undefined)
        {
            return $('#' + id).itemlist('text');
        } else
        {
            return $('#' + id).itemlist('text', text);
        }
    };
    this.itemlistinit = function (id, data, onchangefunction, configObj)
    {
        if ('string' == typeof onchangefunction)
        {
            onchangefunction = eval(onchangefunction);
        }

        $('#' + id).itemlist($.extend({
            data: data,
            change: onchangefunction
        }, configObj));
    };
    this.itemlistbind = function (id, data)
    {
        $('#' + id).itemlist('bind', data);
    };
    this.itemlistdisable = function (id, isDisable, inverseVal)
    {
        return $('#' + id).itemlist('disable', isDisable, inverseVal);
    };
    this.itemlistid = function (id, val)
    {
        if (val === undefined)
        {
            return $('#' + id).itemlist('val');
        } else
        {
            return $('#' + id).itemlist('val', val);
        }
    };


    this.placeholder = function (id, text)
    {
        if (text)
        {
            $('#' + id).placeholder(text);
        }
        else
        {
            $('#' + id).placeholder();
        }
    };
    /* 
*  
*  方法:showControlTip
*  参数:id, html
*  返回:
*  注意：html中需增加：<label for="detail_txt_f_id_tbl_layerconfig_detail" class="control-info-label"><i class="icon-leaf hand "></i></label>
*/
    this.showControlTip = function (id, html)
    {
        if (html != undefined && html != '')
        {
            $('#div_' + id + '>label.control-info-label>.icon-leaf').removeClass('hidden');
            $('#div_' + id + '>label.control-info-label').popover({
                animation: true,
                content: html,
                html: true,
                placement: 'left',
                trigger: 'click'
            });
        }
        else
        {
            $('#div_' + id + '>label.control-info-label>.icon-leaf').addClass('hidden');
        }

    };
    this.manyvalueinit = function (id, onchangefunction, configObj)
    {
        if ('string' == typeof onchangefunction)
        {
            onchangefunction = eval(onchangefunction);
        }
        $('#' + id).manyvalue($.extend({
            change: onchangefunction
        }, configObj));
    };
    this.manyvalue = function (id, text)
    {
        if (text === undefined)
        {
            return $('#' + id).manyvalue('text');
        } else
        {

            $('#' + id).manyvalue('text', text);
        }
    }
    this.manyvaluedisable = function (id, isDisable)
    {
        if (isDisable === undefined)
        {
            return $('#' + id).manyvalue('disable');
        } else
        {

            $('#' + id).manyvalue('disable', isDisable);
        }
    }
};


var html5fileuploader_DefaultOps = {
    fileWebSite: '//127.0.0.1/sara.dd.ldsw.file/'/*网站路径*/
    , libraryWebSite: '//162.16.166.1/sara.resource.library/'
    , fileStep: 40960/*单次上传的fileStep*/
    , fileUploadSizeMax: 10000000/*单个文件上传大小最大限制*/
    , fileUploadNameLength: 50/*单个上传文件名长度*/
    , fileUploadExtnames: ';.txt;.sql;.doc;.docx;.xls;.xlsx;.pdf;.tif;.bmp;.jpg;.jpeg;.gif;.png;.rar;.zip;.soe;.xml;.cs;.html;.js;.css;.asmx;.aspx;.asax;.config;'
    , fileUploadCountMax: 0/*上传附件最大数量，为0不限制*/
    , singleFileNameWidth: 0/*单个文件显示的宽度*/
    , isImgThumbnail: false/*是否给图片加上缩略图*/
    , isThumbnailImgShow: false/*sk缩略图形式下是否按照图片模式展示*/
     , isImgEdit: false/*sk是否能对图片进行压缩*/
    , thumbnailWidthHeight: '30'/*sk修改这个功能，可以输入150*100以此来限定图片的压缩后尺寸，或者输入30作为压缩尺寸的百分比*/
    , thumbnailExtnames: ['.jpg', '.jpeg', '.png', '.gif', '.bmp']/*认为可以创建缩略图的后缀名*/
    , singleFileNameShowLength: 20/*单个文件显示时最长文件名长度*/
    , extName: ''/*后缀名，为空则不加-业务性后缀名，不是文件格式后缀*/
    , isRealName: false /*是否加上真实文件名*/
    , isMultiple: true /*是否允许多选*/
    , btnText: '添加文件' /*显示在按钮上的文字*/
    , btnCss: 'btn-info btn-large'
    , fileUploadRootPath: '//127.0.0.1/sara.dd.ldsw.file/files/'
    , onDownloadEnd: function (url, filerealname, result/*success|fail|error*/) { if ('success' == result) { window.open(url); } }/*下载操作完毕回调,url为下载链接，filerealname为用户上传的文件名,result为操作结果，如果可以成功下载，则url即为文件url，否则url即为错误信息*/
    , onDeleteEnd: function (filerealname, msg) { }/*删除完毕之后回调*/
    , showMaxSizeType1: 3/*设置显示模式为1（横向显示）时，一行能显示的最大数量*/
    , showType: '2' /*列表类型，1为横表格，2为竖表格*/
    , onBeforeUpload: function (content) { return true; }/*content内容为filerealname（与配置字段相同）和filesize，返回true则上传，否则不上传*/
    , onUploadEnd: function (fileuploadname, filerealname, result, message) { } /*事件，每一个文件上传完毕之后调用*/
    /*
    filerealname为用户选择的文件名称
    result为上传结果，success||fail
    fileuploadname为上传之后最终存储的文件名
    message为不定参数，如果上传成功，则message不会传入，失败则为服务器传回的信息
    */
    , onAllUploadEnd: function () { }/*事件，最后全部上传成功的时候调用*/
};


//以下为U盾需要的内容
function CheckUKey(uid, upass)
{
    var K1mToken = new mToken("mTokenPlugin");
    var g_keyUID = "";
    K1mToken.LoadLibrary();
    var keyNumber = 0;
    keyNumber = K1mToken.K1_mTokenFindDevice();
    if (keyNumber < 1)
    {
        return "查找U盾失败,请检查是否正确插入U盾已经正确安装U盾插件，错误码:" + K1mToken.K1_mTokenGetLastError();
    } else
    {
        //alert("找到1只key");
        var keyUID = "";
        keyUID = K1mToken.K1_mTokenGetUID(1);
        if (keyUID == null || keyUID == "")
        {
            return "获取设备唯一硬件ID失败,错误码:" + K1mToken.K1_mTokenGetLastError();
        }
        g_keyUID = keyUID;

        if (g_keyUID != uid)
        {
            return "插入U盾与登录账号不对应！";
        }
        var retVal = K1mToken.K1_mTokenOpen(g_keyUID, upass);
        if (retVal != 0)
        {
            if (retVal == 1)
            {
                return "没有找到加密锁！" + K1mToken.K1_mTokenGetLastError();
            } else
            {
                return "ErrorCode:" + K1mToken.K1_mTokenGetLastError() + "   U盾密码不正确,或者您的锁已被锁死！";
            }

        }
        return "true";
    }
}
function isIe()
{
    return ("ActiveXObject" in window);
}

function mToken(obj)
{
    this.obj = obj;


    var g_mTokenPlugin = null;


    this.LoadLibrary = function ()
    {
        g_mTokenPlugin = new K1ClientPlugin();//新

        if (g_mTokenPlugin == null)
        {
            return -1;
        }

        return 0;
    };

    this.K1_mTokenGetVersion = function ()
    {
        if (g_mTokenPlugin == null)
        {
            return null;
        }

        return g_mTokenPlugin.mTokenGetVersion();
    };

    this.K1_mTokenFindDevice = function ()
    {
        if (g_mTokenPlugin == null)
        {
            return -1;
        }

        return g_mTokenPlugin.mTokenFindDevice();
    };

    this.K1_mTokenGetLastError = function ()
    {
        if (g_mTokenPlugin == null)
        {
            return -1;
        }

        return g_mTokenPlugin.mTokenGetLastError();
    };

    this.K1_mTokenGetUID = function (keyIndex)
    {
        if (g_mTokenPlugin == null)
        {
            return null;
        }

        return g_mTokenPlugin.mTokenGetUID(keyIndex);
    };

    this.K1_mTokenOpen = function (keyUID, keyPassword)
    {
        if (g_mTokenPlugin == null)
        {
            return -1;
        }

        return g_mTokenPlugin.mTokenOpen(keyUID, keyPassword, 1);
    };

    this.K1_mTokenClose = function ()
    {
        if (g_mTokenPlugin == null)
        {
            return -1;
        }

        return g_mTokenPlugin.mTokenClose();
    };

    this.K1_mTokenChangePwd = function (keyUID, oldPassword, newPassword)
    {
        if (g_mTokenPlugin == null)
        {
            return -1;
        }

        return g_mTokenPlugin.mTokenChangePwd(keyUID, 1, oldPassword, newPassword);
    };

    this.K1_mTokenSHA1WithSeed = function (keyUID, randomStr)
    {
        if (g_mTokenPlugin == null)
        {
            return null;
        }

        return g_mTokenPlugin.mTokenSHA1WithSeed(keyUID, randomStr);
    };

    this.K1_mTokenSHA1WithSeedMac = function (keyUID, randomStr)
    {
        if (g_mTokenPlugin == null)
        {
            return null;
        }

        return g_mTokenPlugin.mTokenSHA1WithSeedMac(keyUID, randomStr);
    };


    this.K1_mTokenGenResetPwdRequest = function (keyUID, userInfo)
    {
        if (g_mTokenPlugin == null)
        {
            return -1;
        }

        return g_mTokenPlugin.mTokenGenResetPwdRequest(keyUID, userInfo);
    };

    this.K1_mTokenResetPassword = function (keyUID, serverResponse)
    {
        if (g_mTokenPlugin == null)
        {
            return -1;
        }

        return g_mTokenPlugin.mTokenResetPassword(keyUID, serverResponse);
    };

    this.K1_mTokenGenRandom = function (keyUID, randomLength)
    {
        if (g_mTokenPlugin == null)
        {
            return null;
        }

        return g_mTokenPlugin.mTokenGenRandom(keyUID, randomLength);
    };

    this.K1_mTokenReadSecureStorage = function (keyUID, offset, dataLength)
    {
        if (g_mTokenPlugin == null)
        {
            return null;
        }

        return g_mTokenPlugin.mTokenReadSecureStorage(keyUID, offset, dataLength);
    };

    this.K1_mTokenWriteSecureStorag = function (keyUID, offset, writeData)
    {
        if (g_mTokenPlugin == null)
        {
            return -1;
        }

        return g_mTokenPlugin.mTokenWriteSecureStorage(keyUID, offset, writeData);
    };

    this.K1_mTokenReadUserStorage = function (keyUID, offset, dataLength)
    {
        if (g_mTokenPlugin == null)
        {
            return null;
        }

        return g_mTokenPlugin.mTokenReadUserStorage(keyUID, offset, dataLength);
    };

    this.K1_mTokenWriteUserStorage = function (keyUID, offset, writeData)
    {
        if (g_mTokenPlugin == null)
        {
            return -1;
        }

        return g_mTokenPlugin.mTokenWriteUserStorage(keyUID, offset, writeData);
    };

    this.K1_mTokenGetURL = function (keyUID)
    {
        if (g_mTokenPlugin == null)
        {
            return null;
        }

        return g_mTokenPlugin.mTokenGetURL(keyUID);
    };

    this.K1_mTokenGetLabel = function (keyUID)
    {
        if (g_mTokenPlugin == null)
        {
            return null;
        }

        return g_mTokenPlugin.mTokenGetLabel(keyUID);
    };

    this.K1_mTokenGetCompanyName = function (keyUID)
    {
        if (g_mTokenPlugin == null)
        {
            return null;
        }

        return g_mTokenPlugin.mTokenGetCompanyName(keyUID);
    };

    this.K1_mTokenGetRemark = function (keyUID)
    {
        if (g_mTokenPlugin == null)
        {
            return null;
        }

        return g_mTokenPlugin.mTokenGetRemarks(keyUID);
    };
    this.K1_mTokenGetOpenType = function (keyUID)
    {
        if (g_mTokenPlugin == null)
        {
            return null;
        }

        return g_mTokenPlugin.mTokenGetOpenType(keyUID);
    };

    this.K1_mTokenPwdRetryCount = function (keyUID)
    {
        if (g_mTokenPlugin == null)
        {
            return null;
        }

        return g_mTokenPlugin.mTokenPwdRetryCount(keyUID, 1);
    };
    this.K1_mTokenEncrypt = function (keyUID, method, data)
    {
        if (g_mTokenPlugin == null)
        {
            return null;
        }

        return g_mTokenPlugin.mTokenEncrypt(keyUID, method, 1, data);
    };
    this.K1_mTokenDecrypt = function (keyUID, method, data)
    {
        if (g_mTokenPlugin == null)
        {
            return null;
        }

        return g_mTokenPlugin.mTokenDecrypt(keyUID, method, 1, data);
    };

    this.K1_GetMacAddr = function ()
    {
        if (g_mTokenPlugin == null)
        {
            return null;
        }

        return g_mTokenPlugin.mTokenGetMacAddr();
    };

    var _TimerErrorMessage;
    var _ExpireUrl;
    /*******************************************************
	*
	* 函数名称：K1_CheckExist()
	* 功    能：检查USB Key是否存在
	* 说	明：此方法结合K1_StartCheckTimer方法可用来定时
	*           检测USB Key是否存在,不存在即返回到指定页面(
	*           _ExpireUrl)
	*
	**********************************************************/
    function K1_CheckExist()
    {
        var rtn = g_mTokenPlugin.mTokenFindDevice();
        if (rtn < 1)
        {
            if (_TimerErrorMessage != null)
            {
                alert(_TimerErrorMessage + "  Error Code: " + g_mTokenPlugin.mTokenGetLastError());
            }
            if (_ExpireUrl != null)
            {
                window.location = _ExpireUrl;
            }
        }
        return rtn;
    };
    /*******************************************************
	*
	* 函数名称：K1_StartCheckTimer()
	* 功    能：定时操作方法
	* 输    入：interval：时间1000/秒；errMsg：输出的错误信息
	*           logonUrl：跳转地址
	* 说	明：此方法结合CheckExist方法可用来定时检测加
	*           密Key是否存在,不存在即返回到指定页面(_ExpireUrl)
	*
	**********************************************************/
    this.K1_StartCheckTimer = function (interval, errMsg, logonUrl)
    {
        _TimerErrorMessage = errMsg;
        _ExpireUrl = logonUrl;
        //定时检测
        window.setInterval(K1_CheckExist, interval);
    };

}


function K1ClientPlugin()
{
    var url = "http://127.0.0.1:51111/K1_Client";

    var xmlhttp;
    function AjaxIO(json)
    {
        if (xmlhttp == null)
        {
            if (window.XMLHttpRequest)
            {// code for IE7+, Firefox, Chrome, Opera, Safari
                xmlhttp = new XMLHttpRequest();
            } else
            {// code for IE6, IE5
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            }
        }
        if ("https:" == document.location.protocol)
        {
            url = "https://127.0.0.1:51121/K1_Client";
        }
        xmlhttp.open("POST", url, false);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.send("json=" + json);
    }

    this.mTokenGetVersion = function ()
    {
        var json = '{"function":"mTokenGetVersion"}';
        AjaxIO(json);
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
        {
            var obj = eval("(" + xmlhttp.responseText + ")");
            return obj.outData;
        } else
        {
            return "";
        }
    };

    this.mTokenFindDevice = function ()
    {
        var json = '{"function":"mTokenFindDevice"}';
        AjaxIO(json);
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
        {
            var obj = eval("(" + xmlhttp.responseText + ")");
            return obj.devCount;
        } else
        {
            return -2;
        }
    };

    this.mTokenGetLastError = function ()
    {
        var json = '{"function":"mTokenGetLastError"}';
        AjaxIO(json);
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
        {
            var obj = eval("(" + xmlhttp.responseText + ")");
            return obj.errorCode;
        } else
        {
            return -2;
        }
    };

    this.mTokenGetUID = function (keyIndex)
    {
        var json = '{"function":"mTokenGetUID", "keyIndex":' + keyIndex + '}';
        AjaxIO(json);
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
        {
            var obj = eval("(" + xmlhttp.responseText + ")");
            return obj.outData;
        } else
        {
            return "";
        }
    };

    this.mTokenOpen = function (keyUID, keyPassword, type)
    {
        var json = '{"function":"mTokenOpen", "keyUID":"' + keyUID + '", "passWd":"' + keyPassword + '", "passWdType":' + type + '}';
        AjaxIO(json);
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
        {
            var obj = eval("(" + xmlhttp.responseText + ")");
            return obj.rtn;
        } else
        {
            return 1;
        }
    };

    this.mTokenClose = function ()
    {
        var json = '{"function":"mTokenClose"}';
        AjaxIO(json);
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
        {
            var obj = eval("(" + xmlhttp.responseText + ")");
            return obj.rtn;
        } else
        {
            return 1;
        }
    };

    this.mTokenChangePwd = function (keyUID, type, oldPassword, newPassword)
    {
        var json = '{"function":"mTokenChangePwd", "keyUID":"' + keyUID + '", "oldUpin":"' + oldPassword + '", "newUpin":"' + newPassword + '", "passWdType":' + type + '}';
        AjaxIO(json);
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
        {
            var obj = eval("(" + xmlhttp.responseText + ")");
            return obj.rtn;
        } else
        {
            return 1;
        }
    };

    this.mTokenSHA1WithSeed = function (keyUID, randomStr)
    {
        var json = '{"function":"mTokenSHA1WithSeed", "keyUID":"' + keyUID + '", "random":"' + randomStr + '"}';
        AjaxIO(json);
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
        {
            var obj = eval("(" + xmlhttp.responseText + ")");
            return obj.outData;
        } else
        {
            return "";
        }
    };

    this.mTokenSHA1WithSeedMac = function (keyUID, randomStr)
    {
        var json = '{"function":"mTokenSHA1WithSeed", "keyUID":"' + keyUID + '", "random":"' + randomStr + '", "useMac":1}';
        AjaxIO(json);
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
        {
            var obj = eval("(" + xmlhttp.responseText + ")");
            return obj.outData;
        } else
        {
            return "";
        }
    };

    this.mTokenGenResetPwdRequest = function (keyUID, userInfo)
    {
        var json = '{"function":"mTokenGenResetPwdRequest", "keyUID":"' + keyUID + '", "userInfo":"' + userInfo + '"}';
        AjaxIO(json);
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
        {
            var obj = eval("(" + xmlhttp.responseText + ")");
            return obj.outData;
        } else
        {
            return "";
        }
    };

    this.mTokenResetPassword = function (keyUID, serverResponse)
    {
        var json = '{"function":"mTokenResetPassword", "keyUID":"' + keyUID + '", "response":"' + serverResponse + '"}';
        AjaxIO(json);
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
        {
            var obj = eval("(" + xmlhttp.responseText + ")");
            return obj.rtn;
        } else
        {
            return 1;
        }
    };

    this.mTokenGenRandom = function (keyUID, randomLength)
    {
        var json = '{"function":"mTokenGenRandom", "keyUID":"' + keyUID + '", "inDataLen":' + randomLength + '}';
        AjaxIO(json);
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
        {
            var obj = eval("(" + xmlhttp.responseText + ")");
            return obj.outData;
        } else
        {
            return "";
        }
    };

    this.mTokenReadSecureStorage = function (keyUID, offset, dataLength)
    {
        var json = '{"function":"mTokenReadSecureStorage", "keyUID":"' + keyUID + '", "offset":' + offset + ', "inDataLen":' + dataLength + '}';
        AjaxIO(json);
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
        {
            var obj = eval("(" + xmlhttp.responseText + ")");
            return obj.outData;
        } else
        {
            return "";
        }
    };

    this.mTokenWriteSecureStorage = function (keyUID, offset, writeData)
    {
        var json = '{"function":"mTokenWriteSecureStorage", "keyUID":"' + keyUID + '", "offset":' + offset + ', "inData":"' + writeData + '"}';
        AjaxIO(json);
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
        {
            var obj = eval("(" + xmlhttp.responseText + ")");
            return obj.rtn;
        } else
        {
            return 1;
        }
    };

    this.mTokenReadUserStorage = function (keyUID, offset, dataLength)
    {
        var json = '{"function":"mTokenReadUserStorage", "keyUID":"' + keyUID + '", "offset":' + offset + ', "inDataLen":' + dataLength + '}';
        AjaxIO(json);
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
        {
            var obj = eval("(" + xmlhttp.responseText + ")");
            return obj.outData;
        } else
        {
            return "";
        }
    };

    this.mTokenWriteUserStorage = function (keyUID, offset, writeData)
    {
        var json = '{"function":"mTokenWriteUserStorage", "keyUID":"' + keyUID + '", "offset":' + offset + ', "inData":"' + writeData + '"}';
        AjaxIO(json);
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
        {
            var obj = eval("(" + xmlhttp.responseText + ")");
            return obj.rtn;
        } else
        {
            return 1;
        }
    };

    this.mTokenGetURL = function (keyUID)
    {
        var json = '{"function":"mTokenGetURL", "keyUID":"' + keyUID + '"}';
        AjaxIO(json);
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
        {
            var obj = eval("(" + xmlhttp.responseText + ")");
            return obj.outData;
        } else
        {
            return "";
        }
    };

    this.mTokenGetLabel = function (keyUID)
    {
        var json = '{"function":"mTokenGetLabel", "keyUID":"' + keyUID + '"}';
        AjaxIO(json);
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
        {
            var obj = eval("(" + xmlhttp.responseText + ")");
            return obj.outData;
        } else
        {
            return "";
        }
    };

    this.mTokenGetCompanyName = function (keyUID)
    {
        var json = '{"function":"mTokenGetCompanyName", "keyUID":"' + keyUID + '"}';
        AjaxIO(json);
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
        {
            var obj = eval("(" + xmlhttp.responseText + ")");
            return obj.outData;
        } else
        {
            return "";
        }
    };

    this.mTokenGetRemarks = function (keyUID)
    {
        var json = '{"function":"mTokenGetRemarks", "keyUID":"' + keyUID + '"}';
        AjaxIO(json);
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
        {
            var obj = eval("(" + xmlhttp.responseText + ")");
            return obj.outData;
        } else
        {
            return "";
        }
    };

    this.mTokenGetOpenType = function (keyUID)
    {
        var json = '{"function":"mTokenGetOpenType", "keyUID":"' + keyUID + '"}';
        AjaxIO(json);
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
        {
            var obj = eval("(" + xmlhttp.responseText + ")");
            return obj.openType;
        } else
        {
            return -1;
        }
    };

    this.mTokenPwdRetryCount = function (keyUID, passwdType)
    {
        var json = '{"function":"mTokenPwdRetryCount", "keyUID":"' + keyUID + '", "passWdType":' + passwdType + '}';
        AjaxIO(json);
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
        {
            var obj = eval("(" + xmlhttp.responseText + ")");
            return obj.pwdRetryCount;
        } else
        {
            return -1;
        }
    };

    this.mTokenEncrypt = function (keyUID, method, paddingType, data)
    {
        var json = '{"function":"mTokenEncrypt", "keyUID":"' + keyUID + '", "method":' + method + ', "paddingType":' + paddingType + ', "inData":"' + data + '"}';
        AjaxIO(json);
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
        {
            var obj = eval("(" + xmlhttp.responseText + ")");
            return obj.outData;
        } else
        {
            return "";
        }
    };

    this.mTokenDecrypt = function (keyUID, method, paddingType, data)
    {
        var json = '{"function":"mTokenDecrypt", "keyUID":"' + keyUID + '", "method":' + method + ', "paddingType":' + paddingType + ', "inData":"' + data + '"}';
        AjaxIO(json);
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
        {
            var obj = eval("(" + xmlhttp.responseText + ")");
            return obj.outData;
        } else
        {
            return "";
        }
    };

    this.mTokenGetMacAddr = function ()
    {
        var json = '{"function":"mTokenGetMacAddr"}';
        AjaxIO(json);
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
        {
            var obj = eval("(" + xmlhttp.responseText + ")");
            return obj.outData;
        } else
        {
            return "";
        }
    }

}

