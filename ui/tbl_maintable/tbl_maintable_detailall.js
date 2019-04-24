var _clientInf = '{userid:"",appcode:"54",appname:"",userip:"",usermac:"",username:"",userimg:""}';

var _blockMessage = null;
var _alertMessage = null;
var _resultMessage = null;
var _confirmMessage = null;

var _pr_appcode = '';
var _pr_tbl_maintable_sys_id = '';
var _pr_pagetype_tbl_maintable_detailall = '';
var _pr_projectClassId = '';
var _pr_projectClassDtl1 = '';
var _pr_projectClassDtl2 = '';
var _pr_fromurl = '';
var _pr_fromurlparam = '';

var _pr_workItemIdString = '';
var _pr_processDefIdString = '';
var _pr_activityDefIdString = '';
var _pr_processInsIdString = '';




$(document).ready(function ()
{
    tblMainTableDetailAllObject.init();
});

$(window).scroll(function ()
{
    tblMainTableDetailAllObject.onWindowScroll();
});



var tblMainTableDetailAllObject = (function ()
{
    'use strict';

    var _serviceUrl = '//127.0.0.1/sara.dd.ldsw/service/service_tbl_maintable_detailall.asmx/',
        

    //全部显示节点的集合，已经把父节点和子节点拍平，以Nodeid为Key，一般情况下Key都是子节点的NodeId（表名字），value是节点的JSON
    _showNodesHashMap = null,
    //以父节点NodeID为key的集合，一般情况下是以父节点NodeId（rt_0）为Key的集合，value是子节点NodeId的Array；
    _parentNodesHashMap = null,


    _lastScrollTop = '',
    _scrollDelta = 200,
    //是否可以加载新的程序（执行loadplutin的核心内容）true:可以；false:不可以
    _isOnScrollSpy = false,
    _menuIconCssArray = ["icon-compass", "icon-trello", "icon-beer", "icon-bell", "icon-calendar-empty", "icon-dashboard", "icon-key", "icon-legal", "icon-group", "icon-bar-char"],

    //两种模式：1：滚动模式；2：切换模式
    _detailAllMode = '1',


    //初始化页面参数
    initParameter = function (callBackFunction)
    {
        try
        {
            _pr_fromurl = requestQuery('fromurl');
            _pr_fromurlparam = requestQuery('fromurlparam');
            _pr_tbl_maintable_sys_id = requestQuery('sys_id');
            _pr_projectClassId = requestQuery('projectclassid');
            _pr_projectClassDtl1 = requestQuery('projectclassdtl1');
            _pr_projectClassDtl2 = requestQuery('projectclassdtl2');
            _pr_pagetype_tbl_maintable_detailall = requestQuery('pagetype');
            _pr_appcode = requestQuery('appcode');
            _pr_workItemIdString = requestQuery('workitemid');
            _pr_processDefIdString = requestQuery('processdefid');
            _pr_activityDefIdString = requestQuery('activitydefid');
            _pr_processInsIdString = requestQuery('processinsid');
            _clientInf = '{userid:"' + basePageObj._userInfoJson.sys_userid + '",appcode:"' + _pr_appcode + '",appname:"",userip:"' + basePageObj._userInfoJson.ip + '",usermac:"' + basePageObj._userInfoJson.mac + '",username:"' + basePageObj._userInfoJson.sys_username + '",userimg:"' + basePageObj._userInfoJson.sys_photourl + '"}';

            if (_pr_workItemIdString == undefined || _pr_workItemIdString == null)
            {
                _pr_workItemIdString = '';
            }
            if (_pr_processDefIdString == undefined || _pr_processDefIdString == null)
            {
                _pr_processDefIdString = '';
            }
            if (_pr_activityDefIdString == undefined || _pr_activityDefIdString == null)
            {
                _pr_activityDefIdString = '';
            }
            if (_pr_processInsIdString == undefined || _pr_processInsIdString == null)
            {
                _pr_processInsIdString = '';
            }

            if (_pr_projectClassId == null || _pr_projectClassId == '' || _pr_projectClassId == 'null')
            {
                _blockMessage.show('projectClassid参数接收失败...', 'fail');
            }
            else if (_pr_projectClassDtl1 == null || _pr_projectClassDtl1 == '' || _pr_projectClassDtl1 == 'null')
            {
                _blockMessage.show('projectclassdtl1参数接收失败...', 'fail');
            }
            else if (_pr_projectClassDtl2 == null || _pr_projectClassDtl2 == '' || _pr_projectClassDtl2 == 'null')
            {
                _blockMessage.show('projectclassdtl2参数接收失败...', 'fail');
            }

            else if (_pr_tbl_maintable_sys_id == null || _pr_tbl_maintable_sys_id == '' || _pr_tbl_maintable_sys_id == 'null')
            {
                _blockMessage.show('tbl_maintable_sys_id参数接收失败', 'fail');
            }
            else if (_pr_pagetype_tbl_maintable_detailall == null || _pr_pagetype_tbl_maintable_detailall == '' || _pr_tbl_maintable_sys_id == 'null')
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

    //初始化控件
    initControl = function (callBackFunction)
    {
        $('#div_log_modal_tbl_maintable_detailall').modal({
            keyboard: false,
            backdrop: 'static',
            show: false
        });
        callBackFunction.success();
    },


    //根据被选中的节点，加载程序--tablename级别的
    loadPlugIn = function (selectNodeJson, callBackFunction)
    {
        //
        var parameterJson = {};
        parameterJson.targetDiv = 'div_' + selectNodeJson['nodeId']; //'div_tbl_fhd_detail';
        if (selectNodeJson['nodeUrl'] != '')
        {
            parameterJson.url = selectNodeJson['nodeUrl']//'../tbl_fhd/tbl_fhd_detail_part.html';
            parameterJson.initFunctionName = selectNodeJson['nodeInitFunction']//'init_tbl_fhd_detail';
            parameterJson.parameterHashMap = getParameterHashMap(selectNodeJson['nodeParam']);

            //=================animate//=================


            //var s = "$('#" + parameterJson.targetDiv + "').load('" + parameterJson.url + "', null, function ()";
            //s += "{";
            //var keysArray = parameterJson.parameterHashMap.keys();
            //$.each(keysArray, function (i, u)
            //{
            //    s += keysArray[i] + " = '" + parameterJson.parameterHashMap.get(keysArray[i]) + "';";
            //});
            //s += parameterJson.initFunctionName + "({";
            //s += "success: function ()";
            //s += "{";
            //s += "callBackFunction&&callBackFunction.success();";
            //s += "}";
            //s += "});";
            //s += "});";
            //eval(s);

            $( '#' + parameterJson.targetDiv  ).load( parameterJson.url, null, function ()
            {
                var keysArray = parameterJson.parameterHashMap.keys();
                var s = '';
                $.each( keysArray, function ( i, u )
                {
                    s += keysArray[i] + " = '" + parameterJson.parameterHashMap.get( keysArray[i] ) + "';";
                } );
                eval( s );
                var ff = eval( parameterJson.initFunctionName );
                ff( {
                    success: function ()
                    {
                        callBackFunction && callBackFunction.success();
                    }
                } );
            } );
        }
        else
        {
            callBackFunction.success();
        }
    },

    //构造装载程序的参数
    getParameterHashMap = function (parameterString)
    {
        var vHashMap = new hashMap();
        var stringArray = parameterString.split('^');
        $.each(stringArray, function (i, u)
        {
            var keyValueArray = stringArray[i].split('=');
            var value = keyValueArray[1];
            value = value.replaceAll('[_pr_pagetype_tbl_maintable_detailall]', _pr_pagetype_tbl_maintable_detailall);
            value = value.replaceAll('[_pr_tbl_maintable_sys_id]', _pr_tbl_maintable_sys_id);

            value = value.replaceAll('[_pr_projectclassid]', _pr_projectClassId);
            value = value.replaceAll('[_pr_projectclassdtl1]', _pr_projectClassDtl1);
            value = value.replaceAll('[_pr_projectclassdtl2]', _pr_projectClassDtl2);

            vHashMap.put(keyValueArray[0], value);
        });


        return vHashMap;
    };

    var that = {

        //滚动条的响应事件:detailAllMode=1的时候才能执行
        onWindowScroll: function ()
        {
            if (_detailAllMode == '2')
            {
                return;
            }
            if (_isOnScrollSpy)
            {
                var currentScrollTop = $(this).scrollTop();
                //微弱变化忽略
                if (Math.abs(_lastScrollTop - currentScrollTop) <= _scrollDelta)
                {
                    return;
                }
                else
                {
                    _lastScrollTop = currentScrollTop;

                    var keysArray = _showNodesHashMap.keys();
                    $.each(keysArray, function (i, u)
                    {
                        if (_showNodesHashMap.get(keysArray[i])['isLoaded'] == false)
                        {

                            if ($('#div_loading_' + keysArray[i]).css('display') == 'block')
                            {
                                var currentOffsetTop = $('#div_loading_' + keysArray[i]).offset().top;
                                var currentHeight = '100';
                                var windowOffsetTop = $(window).scrollTop();
                                var windowHeight = $(window).height();
                                if (currentOffsetTop > windowOffsetTop && (Number(currentOffsetTop) + Number(currentHeight)) < (Number(windowOffsetTop) + Number(windowHeight)))
                                {
                                    if (_isOnScrollSpy)
                                    {

                                        setTimeout(function ()
                                        {
                                            windowOffsetTop = $(window).scrollTop();
                                            windowHeight = $(window).height();
                                            if (currentOffsetTop > windowOffsetTop && (Number(currentOffsetTop) + Number(currentHeight)) < (Number(windowOffsetTop) + Number(windowHeight)))
                                            {
                                                if (_isOnScrollSpy)
                                                {
                                                    _showNodesHashMap.get(keysArray[i])['isLoaded'] = true;
                                                    //  alert('start_' + keysArray[i]);
                                                    _isOnScrollSpy = false;

                                                    loadPlugIn(_showNodesHashMap.get(keysArray[i]), {
                                                        success: function ()
                                                        {
                                                            // alert('over_' + keysArray[i]);
                                                            $('#div_' + keysArray[i]).css('display', '');
                                                            $('#div_loading_' + keysArray[i]).css('display', 'none');
                                                            _isOnScrollSpy = true;
                                                        }
                                                    });
                                                }
                                            }
                                        }, 500);

                                    }
                                }
                            }
                        }
                    });
                }
            }
        },

        //初始化程序
        init: function ()
        {
            _blockMessage = new blockMessage();
            _alertMessage = new alertMessage();
            _resultMessage = new resultMessage();
            _confirmMessage = new confirmMessage();
            _blockMessage.show('程序加载中...', 'loading');
            basePageObj.initBasePage({
                success: function ()
                {
                    //菜单模式
                    _detailAllMode = basePageObj.getUserCookie().detailAllMode;

                    //如果是在小屏幕情况下，只能模式1；
                    if ($(window).width() < basePageObj._padMinSrceenWidth)
                    {
                        _detailAllMode = '1';
                    }

                    switch (_detailAllMode)
                    {
                        case "1":
                            {
                                $('#sp_detailAllMode_tbl_maintable_detailall').text('菜单模式：滚轮模式');
                            }
                            break;
                        case "2":
                            {
                                $('#sp_detailAllMode_tbl_maintable_detailall').text('菜单模式：点击模式');
                            }
                            break;
                    }

                    //设置留白高度
                    if (_detailAllMode == '1')
                    {
                        $('#div_row_fullscreen').height($(window).height());
                    }
                    else
                    {
                        $('#div_row_fullscreen').css('display', 'none');

                        //$( '#table_content_tbl_maintable_detailall' ).height( $( window ).height() - 90 );
                        //？？！！

                        $('#table_content_tbl_maintable_detailall').height($(document).height() - 120);
                        $('.td-menu-maintable-detailall').height($(document).height() - 120);
                        //##解决maintabledetailall程序左侧菜单超长的问题
                        $('#div_menu_tbl_maintable_detailall').height($(window).height() - 120);

                    }
                    initParameter({
                        success: function ()
                        {
                            initControl({
                                success: function ()
                                {
                                    tblMainTableButtonObj.initButton(_pr_pagetype_tbl_maintable_detailall, 'detail', {
                                        success: function (pagetype)
                                        {
                                            that.initLattice({
                                                success: function ()
                                                {
                                                    _blockMessage.hidden();
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
        },



        //返回功能
        btn_command_cancle_onclick: function ()
        {
            var url = _pr_fromurl;
            url += '?uid=' + basePageObj._userInfoJson.sys_userid;

            var fromurlJson = (new Function("", "return " + _pr_fromurlparam))();

            $.each(fromurlJson, function (key, value)
            {
                if (typeof value == 'object')
                {
                    url += '&' + key + '=' + JSON.stringify(value);
                }
                else
                {
                    url += '&' + key + '=' + value;
                }

            });

            commonObj.changeUrl(url, 'right-hide');

        },


        //初始化栅格
        initLattice: function (callBackFunction)
        {
            var parameterJson = {
                sysUserIdString: basePageObj._userInfoJson.sys_userid,
                mainTableSysidString: _pr_tbl_maintable_sys_id,
                projectClassIdString: _pr_projectClassId,
                projectClassDtl1String: _pr_projectClassDtl1,
                projectClassDtl2String: _pr_projectClassDtl2,
                workItemIdString: _pr_workItemIdString,
                processDefIdString: _pr_processDefIdString,
                activityDefIdString: _pr_activityDefIdString,
                processInsIdString: _pr_processInsIdString,
                userInfoJsonString: JSON.stringify(basePageObj._userInfoJson)
            };


            var data = {
                parameterJsonString: JSON.stringify(parameterJson),
                clientInf: _clientInf
            };


            doAjaxFunction(_serviceUrl, 'GetProjectClassDtlTableName', data, {
                success: function (message)
                {
                    var allJsonArray = (new Function("", "return " + message))();
                    //1、构造菜单区域和显示区域

                    var menuString = '';
                    var contentString = '';
                    var selectNodeJson = '';
                    var selectParentNodeId = '';
                    _showNodesHashMap = new hashMap();
                    _parentNodesHashMap = new hashMap();
                    $.each(allJsonArray, function (i, u)
                    {
                        var parentJson = allJsonArray[i];

                        if (parentJson['isShow'] == true)
                        {
                            if (parentJson['isSelected'] == true)
                            {
                                selectNodeJson = parentJson;
                                selectParentNodeId = parentJson['nodeId'];
                            }


                            //====================构造左侧menu菜单                           
                            menuString += '<li id="li_' + parentJson['nodeId'] + '">';

                            //2016-01-18-改造，支持detailAllMode2                        
                            menuString += '<a onclick="tblMainTableDetailAllObject.menuOnClick(\'' + parentJson['nodeId'] + '\');" href="#' + parentJson['nodeId'] + '">';

                            var num = (i % _menuIconCssArray.length);
                            menuString += '<i class="' + _menuIconCssArray[num] + '"></i><span >' + parentJson['nodeName'] + '</span>';
                            menuString += '</a>';

                            //==================构造右侧容器
                            contentString += '<div class="div-businesswidget" id="div_' + parentJson['nodeId'] + '">';

                            //================构造只有父节点，没有子节点的容器
                            contentString += '<div id="' + parentJson['nodeId'] + '" class="business-title1"><i class="' + _menuIconCssArray[num] + '" ></i>' + parentJson['nodeName'] + '</div>';
                            //父节点本身就有url属性，这种情况几乎没有，暂时先这样放着
                            if (parentJson['nodeUrl'] != '')
                            {
                                contentString += '<div id="div_' + parentJson['nodeId'] + '" style="display:none;"></div>';
                                contentString += '<div id="div_loading_' + parentJson['nodeId'] + '"  style="height:100px;" onclick="tblMainTableDetailAllObject.loadPlugInByNodeId(\'' + parentJson['nodeId'] + '\');"><img src="../../images/loading.gif" />数据装载中...</div>';
                                _showNodesHashMap.put(parentJson['nodeId'], parentJson);
                            }
                            //================循环父节点下的子节点，构造容器

                            if (parentJson['childNodes'].length > 0)
                            {
                                var childNodeIdArray = [];
                                var childJsonArray = parentJson['childNodes'];
                                $.each(childJsonArray, function (j, k)
                                {
                                    var childJson = childJsonArray[j];
                                    if (childJson['isShow'] == true)
                                    {
                                        //将子节点ID构造成一个Array
                                        childNodeIdArray.push(childJson['nodeId']);
                                        //父子节点都是默认被选中，则设置该项为默认项
                                        if (parentJson['isSelected'] == true && childJson['isSelected'] == true)
                                        {
                                            selectNodeJson = childJson;
                                        }

                                        //==================

                                        contentString += '<div id="' + childJson['nodeId'] + '" class="business-title2">';
                                        //2016-01-13-验证如果只有一个子节点则不显示标题
                                        if (childJsonArray.length != 1)
                                        {
                                            contentString += '<i class="' + _menuIconCssArray[num] + '"></i>';
                                            contentString += childJson['nodeName'];
                                        }

                                        contentString += '</div>';
                                        if (childJson['nodeUrl'] != '')
                                        {


                                            if (_detailAllMode == '1')
                                            {
                                                contentString += '<div id="div_' + childJson['nodeId'] + '" style="display:none;"></div>';
                                            }
                                            else
                                            {
                                                //模式2的时候，需要调整一下宽度，不然会出现横向滚动条
                                                //var width = $(window).width() - 130;
                                                //contentString += '<div id="div_' + childJson['nodeId'] + '" style="display:none;width:' + width + 'px;"></div>';

                                                //？？！！
                                                contentString += '<div id="div_' + childJson['nodeId'] + '" style="display:none;"></div>';
                                            }


                                            //添加click事件，支持点击loading图片，加载程序的隐含方法。
                                            contentString += '<div id="div_loading_' + childJson['nodeId'] + '" style="height:100px;" onclick="tblMainTableDetailAllObject.loadPlugInByNodeId(\'' + childJson['nodeId'] + '\');"><img src="../../images/loading.gif" />数据装载中...</div>';
                                            _showNodesHashMap.put(childJson['nodeId'], childJson);
                                        }
                                    }
                                });
                                _parentNodesHashMap.put(parentJson['nodeId'], childNodeIdArray);
                            }
                            menuString += '</li>';

                            //==================
                            contentString += '</div>';
                            if (_detailAllMode == '1')
                            {
                                contentString += '<br/>';
                            }
                        }

                    });
                    $('#ul_menu_tbl_maintable_detailall').html(menuString);
                    $('#div_content_tbl_maintable_detailall').html(contentString);

                    //2、计算默认选中项，加载程序，并滚动到指定位置
                    //========================================
                    if (_detailAllMode == '1')
                    {
                        loadPlugIn(selectNodeJson, {
                            success: function ()
                            {
                                //标记默认选中项已经被选中。
                                _showNodesHashMap.get(selectNodeJson['nodeId'])['isLoaded'] = true;
                                $('#div_' + selectNodeJson['nodeId']).css('display', '');
                                $('#div_loading_' + selectNodeJson['nodeId']).css('display', 'none');
                                //initAffixMenu();


                                //滚动监听
                                $(document.body).scrollspy(
                                {
                                    target: "#div_menu_tbl_maintable_detailall"
                                });
                                $(window).on("load", function ()
                                {
                                    $(document.body).scrollspy("refresh");
                                });

                                ////锁定菜单位置 //？？！！
                                //setTimeout(function ()
                                //{   
                                //    $("#div_menu_tbl_maintable_detailall").affix({
                                //        offset: {
                                //            top: 120,
                                //            bottom: 0
                                //        }
                                //       
                                //    });
                                //});

                                //滚动到默认项位置            
                                setTimeout(function ()
                                {
                                    try
                                    {
                                        $(window).scrollTop($('#' + selectNodeJson['nodeId']).offset().top);
                                    }
                                    catch (ex)
                                    {
                                        $('html,body').animate({ scrollTop: $('#' + selectNodeJson['nodeId']).offset().top }, 100);
                                    }

                                    _isOnScrollSpy = true;
                                    callBackFunction.success();

                                }, 200);

                            }
                        });
                    }
                    else
                    {
                        that.menuOnClick(selectParentNodeId, {
                            success: function ()
                            {


                                //$('#table_content_tbl_maintable_detailall>.td-menu-maintable-detailall').height($(document).height() - 120);
                                ////锁定菜单位置 //？？！！
                                //setTimeout(function ()
                                //{
                                //    $("#div_menu_tbl_maintable_detailall").affix({
                                //        offset: {
                                //            top: 100,
                                //            bottom: 100
                                //        }
                                //    });
                                //   

                                //} );


                                //$( '#div_menu_tbl_maintable_detailall' ).height( $( window ).height() - 62 );

                                callBackFunction.success();
                            }
                        });

                    }

                    //========================================
                },
                fail: function (message)
                {
                    _blockMessage.show(_serviceUrl + 'GetProjectClassDtlTableName<br/>' + message, 'fail');
                },
                error: function (message)
                {
                    _blockMessage.show(_serviceUrl + 'GetProjectClassDtlTableName<br/>' + message, 'fail');
                }
            });
        },


        //通过表名字（子节点NodeId），实现程序加载
        loadPlugInByNodeId: function (childNodeId)
        {
            if (_isOnScrollSpy)//如果可以则执行该方法，如果是false,表示有其他的加载程序正在执行，则直接跳过
            {
                _isOnScrollSpy = false;
                loadPlugIn(_showNodesHashMap.get(childNodeId), {
                    success: function ()
                    {
                        _showNodesHashMap.get(childNodeId)['isLoaded'] = true;
                        $('#div_' + childNodeId).css('display', '');
                        $('#div_loading_' + childNodeId).css('display', 'none');
                        _isOnScrollSpy = true;
                    }
                });
            }

        },

        //点击菜单触发此事件，_detailAllMode==1时不用进行任何操作，通过锚点实现定位功能；_detailAllMode==2时，进行操作
        menuOnClick: function (parentNodeId, callBackFunction)
        {
            if (_detailAllMode == '2')
            {
                //菜单样式
                $('#ul_menu_tbl_maintable_detailall>li').removeClass('active');
                $('#li_' + parentNodeId).addClass('active');


                //容器切换
                var divArray = $('#div_content_tbl_maintable_detailall>.div-businesswidget');
                $.each(divArray, function (i, u)
                {
                    var $u = $(u);
                    if ($u.attr('id') == 'div_' + parentNodeId)
                    {
                        $u.css('display', '');
                    }
                    else
                    {
                        $u.css('display', 'none');
                    }
                });

                //装载父节点下所有的子节点页面

                var childNodeIdArray = _parentNodesHashMap.get(parentNodeId);

                setTimeout(function loadChildNodeIdArray(i)
                {
                    //TODO  IE8 ？？！！**
                    i = i || 0;
                    if ( _showNodesHashMap.get(childNodeIdArray[i])['isLoaded'] == true)
                    {
                        $('#div_' + childNodeIdArray[i]).css('display', '');
                        $('#div_loading_' + childNodeIdArray[i]).css('display', 'none');

                        if (i >= childNodeIdArray.length - 1)
                        {
                            if (callBackFunction)
                            {
                                callBackFunction.success();
                            }
                        }
                        else
                        {
                            loadChildNodeIdArray(i + 1);
                        }
                    }
                    else
                    {


                        loadPlugIn(_showNodesHashMap.get(childNodeIdArray[i]), {
                            success: function ()
                            {
                                _showNodesHashMap.get(childNodeIdArray[i])['isLoaded'] = true;
                                $('#div_' + childNodeIdArray[i]).css('display', '');
                                $('#div_loading_' + childNodeIdArray[i]).css('display', 'none');

                                if (i >= childNodeIdArray.length - 1)
                                {
                                    //？？！！
                                    setTimeout(function ()
                                    {
                                    var h = Math.max($('#div_' + childNodeIdArray[i]).parent().height(), ($(window).height() - 120));
                                    $('#table_content_tbl_maintable_detailall').height(h);
                                    $('.td-menu-maintable-detailall').height(h);

                                    //##解决maintabledetailall程序左侧菜单超长的问题
                                    $('#div_menu_tbl_maintable_detailall').height($(window).height() - 120);

                                    }, 0);


                                    if (callBackFunction)
                                    {
                                        callBackFunction.success();
                                    }
                                }
                                else
                                {
                                    loadChildNodeIdArray(i + 1);
                                }
                            }
                        });
                    }


                }, 0, 0);

            }
        }

    };
    return that;
})();









