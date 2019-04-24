
var _blockMessage = null;
var t_projstate_log_timeline_Obj = (function ()
{
    'use strict';

    var _serviceUrl_log = '//127.0.0.1/sara.dd.ldsw/service/service_t_projstate_log.asmx/';
    var _pr_maintable_sys_id = '';
    var _iconArr = ["icon-quote-right", "icon-pencil", "icon-camera", "icon-facetime-video", "icon-time", "glyphicon glyphicon-gbp", "glyphicon glyphicon-flash"];
    var _lastscrollTop = '',
        doTitle = function (callBackFunction)
        {
            doAjaxFunction(_serviceUrl_log, 'getXmmcByMaintableSysId', JSON.stringify({ maintable_sys_id: _pr_maintable_sys_id }), {
                success: function (result)
                {

                    $('#title_h1').html(result);
                    if (callBackFunction != undefined && callBackFunction != null)
                    {
                        callBackFunction.success();
                    }
                },
                fail: function (message)
                {
                    _blockMessage.show('doTitle_t_projstate_log_timeline执行失败<br/>' + message, 'fail');
                }
            });
        },
        initPara = function (callBackFunction)
        {
            _pr_maintable_sys_id = requestQuery('fk_tbl_maintable_sys_id');
            if (!_pr_maintable_sys_id)
            {
                _blockMessage.show('maintablesysid参数接收失败', 'fail');

            }
            else
            {
                callBackFunction.success();
            }
        },
        initLog = function (callBackFunction)
        {

            doAjaxFunction(_serviceUrl_log, 'getLogByMaintableSysId', JSON.stringify({ maintable_sys_id: _pr_maintable_sys_id }), {
                success: function (result)
                {
                    var messageJson = (new Function("", "return " + result))();
                    var htmlStr = '';
                    for (var i = 0; i < messageJson.length; i++)
                    {
                        var html = '<li class="unactive">';
                        html += '<div class="timeline-time">';
                        var d = messageJson[i]['sys_creatdate'].toDateTime();
                        html += '<strong>' + d.Format('yyyy-MM-dd') + '</strong>' + d.Format('hh:mm:ss') + '';
                        html += '</div>';
                        html += '<div class="timeline-icon">';
                        html += '    <div class="bg-success">';
                        html += '        <i class="' + _iconArr[i % _iconArr.length] + '"></i>';
                        html += '    </div>';
                        html += '</div>';
                        html += '<div class="timeline-content">';
                        html += '    <h2>';
                        html += '   ' + messageJson[i]['sys_creatusername'];
                        html += '    </h2>';
                        html += '<h3>' + '     ' + messageJson[i]['fromstate'] + '→' + messageJson[i]['tostate'] + '</h3>';
                        html += '    <div style="height:100px;">';
                        html += '        ' + messageJson[i]['remark'] + '';
                        html += '    </div>';
                        html += '</div>';
                        html += '</li>';
                        htmlStr += html;
                    }
                    $('#log_ul').html(htmlStr);
                    if (callBackFunction != undefined && callBackFunction != null)
                    {
                        callBackFunction.success();
                    }
                },
                fail: function (message)
                {
                    _blockMessage.show('initLog_t_projstate_log_timeline执行失败<br/>' + message, 'fail');
                }
            });
        },
        timelineAnimate = function (elem)
        {
            return $(".timeline.animated li.unactive").each(function (i)
            {
                var bottom_of_object, bottom_of_window;
                bottom_of_object = $(this).position().top + $(this).outerHeight();
                bottom_of_window = $(window).scrollTop() + $(window).height();
                if (bottom_of_window > bottom_of_object)
                {
                    $(this).removeClass('unactive');
                    return $(this).addClass("active");
                }
            });
        };
    var that = {
        init: function ()
        {

            _blockMessage = new blockMessage();
            initPara({
                success: function ()
                {
                    doTitle({
                        success: function ()
                        {
                            initLog({
                                success: function ()
                                {
                                    timelineAnimate();
                                    $(window).scroll(function ()
                                    {
                                        var top = $(window).scrollTop();
                                        if (top - _lastscrollTop > 50)
                                        {
                                            _lastscrollTop = top;
                                            return timelineAnimate();
                                        } else
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
    };
    return that;
})();


$(document).ready(t_projstate_log_timeline_Obj.init);
//var _lastscrollTop_t_projstate_log_timeline = 0;
//function init_t_projstate_log_timeline()
//{

//    _blockMessage = new blockMessage();
//    initPara_t_projstate_log_timeline({
//        success: function ()
//        {
//            doTitle_t_projstate_log_timeline({
//                success: function ()
//                {
//                    initLog_t_projstate_log_timeline({
//                        success: function ()
//                        {
//                            timelineAnimate_t_projstate_log_timeline();
//                            $(window).scroll(function ()
//                            {
//                                var top = $(window).scrollTop();
//                                if (top - _lastscrollTop_t_projstate_log_timeline > 50)
//                                {
//                                    _lastscrollTop_t_projstate_log_timeline = top;
//                                    return timelineAnimate_t_projstate_log_timeline();
//                                } else
//                                {
//                                }
//                            });
//                        }
//                    });
//                }
//            });
//        }
//    });

//}
//function doTitle_t_projstate_log_timeline(callBackFunction)
//{
//    doAjaxFunction(_serviceUrl_log, 'getXmmcByMaintableSysId', JSON.stringify({ maintable_sys_id: _pr_maintable_sys_id }), {
//        success: function (result)
//        {

//            $('#title_h1').html(result);
//            if (callBackFunction != undefined && callBackFunction != null)
//            {
//                callBackFunction.success();
//            }
//        },
//        fail: function (message)
//        {
//            _blockMessage.show('doTitle_t_projstate_log_timeline执行失败<br/>' + message, 'fail');
//        }
//    });
//}

//function initPara_t_projstate_log_timeline(callBackFunction)
//{
//    _pr_maintable_sys_id = requestQuery('fk_tbl_maintable_sys_id');
//    if (!_pr_maintable_sys_id)
//    {
//        _blockMessage.show('maintablesysid参数接收失败', 'fail');

//    }
//    else
//    {
//        callBackFunction.success();
//    }
//}

//function initLog_t_projstate_log_timeline(callBackFunction)
//{

//    doAjaxFunction(_serviceUrl_log, 'getLogByMaintableSysId', JSON.stringify({ maintable_sys_id: _pr_maintable_sys_id }), {
//        success: function (result)
//        {
//            var messageJson = (new Function("", "return " + result))();
//            var htmlStr = '';
//            for (var i = 0; i < messageJson.length; i++)
//            {
//                var html = '<li class="unactive">';
//                html += '<div class="timeline-time">';
//                var d = messageJson[i]['sys_creatdate'].toDateTime();
//                html += '<strong>' + d.Format('yyyy-MM-dd') + '</strong>'+d.Format('hh:mm:ss')+'';
//                html += '</div>';
//                html += '<div class="timeline-icon">';
//                html += '    <div class="bg-success">';
//                html += '        <i class="'+_iconArr[i%_iconArr.length]+'"></i>';
//                html += '    </div>';
//                html += '</div>';
//                html += '<div class="timeline-content">';
//                html += '    <h2>';
//                html += '   ' + messageJson[i]['sys_creatusername'];
//                html += '    </h2>';
//                html += '<h3>' + '     ' + messageJson[i]['fromstate'] + '→' + messageJson[i]['tostate'] + '</h3>';
//                html += '    <div style="height:100px;">';
//                html += '        '+messageJson[i]['remark']+'';
//                html += '    </div>';
//                html += '</div>';
//                html += '</li>';
//                htmlStr += html;
//            }
//            $('#log_ul').html(htmlStr);
//            if (callBackFunction != undefined && callBackFunction != null)
//            {
//                callBackFunction.success();
//            }
//        },
//        fail: function (message)
//        {
//            _blockMessage.show('initLog_t_projstate_log_timeline执行失败<br/>' + message, 'fail');
//        }
//    });
//}




//var timelineAnimate_t_projstate_log_timeline = function (elem)
//{
//    return $(".timeline.animated li.unactive").each(function (i)
//    {
//        var bottom_of_object, bottom_of_window;
//        bottom_of_object = $(this).position().top + $(this).outerHeight();
//        bottom_of_window = $(window).scrollTop() + $(window).height();
//        if (bottom_of_window > bottom_of_object)
//        {
//            $(this).removeClass('unactive');
//            return $(this).addClass("active");
//        }
//    });
//};
