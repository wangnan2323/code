


var containerObj;


$(document).ready(function ()
{
    'use strict';

    containerObj = (function ()
    {
        var resizeEnd = function ()
        {
            if (!resizeEnd.resizeHandler)
            {
                clearTimeout(resizeEnd.resizeHandler);
            }
            resizeEnd.resizeHandler = setTimeout(function ()
            {
                that.initPageSize();

                resizeEnd.resizeHandler = null;
            }, 100);
        };
        resizeEnd.resizeHandler = null;
    
        var _serviceLoginUrl = '//127.0.0.1/sara.dd.ldsw/service/service_login.asmx/',
        $divMain = $('#div_main'),
        $foreContainer = $('#div_container1'),
        $backContainer = $('#div_container2'),
        $currentIframe = $divMain.find('iframe'),
        $processBar = $('#div_process_bar'),
        containerIndex = 20,
        animEndEventNames = {
            'WebkitAnimation': 'webkitAnimationEnd',
            'OAnimation': 'oAnimationEnd',
            'msAnimation': 'MSAnimationEnd',
            'animation': 'animationend'
        };
        var animEndEventName = 'animationend';
        try
        {
            animEndEventName = animEndEventNames[Modernizr.prefixed('animation')];
        }
        catch(ex)
        {
        }
        var isSupport = false;
        try
        {
            isSupport = Modernizr.cssanimations;
        }
        catch(ex)
        {
        }        
        var isDoingAnim = false;

        //执行两个$对象的转换
        var exchangeContainer = function ()
        {
            var temp = $foreContainer;
            $foreContainer = $backContainer;
            $backContainer = temp;
        };
        //执行两个对象z-index的变换
        var exchangeIndex = function (type)
        {
            switch (type)
            {
                case 'hide':
                    {
                        $backContainer.css('z-index', containerIndex - 10);
                        $foreContainer.css('z-index', containerIndex + 10);
                    }
                    break;
                case 'show':
                    {
                        $backContainer.css('z-index', containerIndex + 10);
                        $foreContainer.css('z-index', containerIndex - 10);
                    }
                    break;
            }
        };

        var checkBrowers = function ()
        {
            //验证浏览器
            var currentVersion = getBrowerVersion();
            var currentVersionStr = currentVersion.browser + '_' + currentVersion.version;
            if (currentVersionStr == 'IE_8.0')
            {
                window.location.href = formatUrl( '//' + commonObj.projectname + '/ui/browerversion/browerversion.html' );
            }
        };

        //初始化页面大小
        var initPageSize = function ()
        {
            //初始化窗口大小
            var windowheight = $(window).height();
            $divMain.height(windowheight);
            $currentIframe.height(windowheight);
            $currentIframe.width($divMain.width());
        };

        var formatUrl = function (url)
        {
            if (url.indexOf('?') > -1)
            {
                
                var urls = url.split('?');
                var httpPath = urls[0];
                var httpParameters = urls[1].split('&');

                var newUrl = httpPath + '?random=' + parseInt(10000 * Math.random());
                $.each(httpParameters, function (i, u)
                {
                    if (u != '')
                    {
                        var us = u.split('=');
                        if (us.length == 2)
                        {                          
                            newUrl += '&' + us[0] + '=' + encodeURIComponent(us[1]);
                        }                        
                    }
                });


                return newUrl;
            }
            else
            {
                return url + '?random=' + parseInt(10000 * Math.random());
            }        

        };
        //执行变换动画效果
        var callAnimate = function (animClass, callBackFunction)
        {
            switch (animClass.split('-')[1])
            {
                case 'show':
                    {
                        exchangeIndex('show');
                        //div1是不显示的那个，show的时候，将其display设为block，加上show的class，从外飞入，飞入之后，将另外一个div设为不可见，交换两个引用
                        $backContainer.off(animEndEventName).addClass(animClass).on(animEndEventName, function ()
                        {
                            $backContainer.removeClass(animClass);
                            $foreContainer.css('display', 'none');
                            callBackFunction.success();

                        });
                        $backContainer.css('display', 'block');
                    }
                    break;
                case 'hide':
                    {
                        exchangeIndex('hide');
                        //将不显示的div1显示出来，给已经显示的div加上hide的class，从内飞出，结束之后，将当前的div设为不可见，交换两个引用
                        $foreContainer.off(animEndEventName).addClass(animClass).on(animEndEventName, function ()
                        {

                            $foreContainer.removeClass(animClass);
                            $foreContainer.css('display', 'none');
                            callBackFunction.success();

                        });
                        $backContainer.css('display', 'block');
                    }
                    break;
            }
        };

        //地址变换
        var changeUrl = function (foreUrl, animClass)
        {
            if (isSupport)
            {
                if (isDoingAnim)
                {
                    return;
                }
                isDoingAnim = true;
                //打开进度条和遮罩动画
                $processBar.addClass('div-process-loading');
                $('.div-loader-container').css('display', '');

                //装载新页面
                var backIframe = $backContainer.find('iframe');

                $(backIframe).on('load', function ()
                {
                    $(backIframe).off('load');


                    //开始动画
                    callAnimate(animClass, {
                        success: function ()
                        {
                            //关闭进度条和遮罩动画
                            $processBar.removeClass('div-process-loading');
                            $('.div-loader-container').css('display', 'none');

                            //关闭老页面
                            $foreContainer.find('iframe').attr('src', '');
                            window.currentFrame = backIframe;
                            exchangeContainer();

                            isDoingAnim = false;
                        }
                    });

                });
                backIframe.attr('src', formatUrl(foreUrl));
            }
            else
            {
                $foreContainer.find('iframe').attr('src', formatUrl(foreUrl));
            }
        };
        //页面加载
        var pageLoad = function ()
        {
            //这个页面识别3个关键参数，foreurl、uuid、和uid
            //其他参数，会自动传递给foreurl
            var foreurl = requestQuery("foreurl") || "";
            var uuid = requestQuery('uuid') || "";
            var uid = requestQuery('uid') || "";

            if (foreurl == "" || uid == '')
            {
                //错误页
                window.location.href = '//' + commonObj.projectname + '/ui/error/error.html?random=' + parseInt( 10000 * Math.random() );
            }

            if (uuid != "")
            {
                //验证uuid的有效性，如果有效，则设置Cookie和Session，然后清空uuid

                setUserInfByuuid(uid, uuid, {
                    success: function ()
                    {
                        window.location.href = window.location.href.replace('&uuid=' + uuid, '').replace('?uuid=' + uuid, '');
                    },
                    fail: function (message)
                    {
                        //错误页
                        window.location.href = '//' + commonObj.projectname + '/ui/error/error.html?random=' + parseInt( 10000 * Math.random() );
                    }
                });
            }
            else
            {
                var parmArray = window.location.search.trimStart('?').split('&');

                var newParm = '';
                $.each(parmArray, function (i, u)
                {
                    if (u.indexOf('foreurl') == 0 || u.indexOf('uuid') == 0)
                    {

                    }
                    else
                    {
                        newParm += '&' + u;
                    }
                });

                $foreContainer.find('iframe').attr('src', formatUrl(foreurl + '?1=1' + newParm));
            }
        };

        var setUserInfByuuid = function (uid, uuid, callBackFunction)
        {
            //3、后台Session的有效性
            var dataJson = {
                userIdString: uid,
                uuid: uuid
            };

            doAjaxFunction(_serviceLoginUrl, 'GetUserInf', dataJson, {
                success: function (message)
                {

                    var m = (new Function("", "return " + message))();

                    //============在此处获取当前的mac地址和IP地址================
                    doAjaxFunction(_serviceLoginUrl, 'GetClientInfo', {}, {
                        success: function (message1)
                        {
                            try
                            {
                                var mm = (new Function("", "return " + message1))();
                                m.mac = mm.mac;
                                m.ip = mm.ip;

                                setCookieMinutes("userInf", JSON.stringify(m), 1440);

                                callBackFunction.success();
                            }
                            catch (ex)
                            {
                                // _blockMessage.show('GetClientInfo执行失败<br/>' + ex.message, 'fail');

                                callBackFunction.fail('GetClientInfo执行失败<br/>' + ex.message);
                            }
                        },
                        fail: function (message)
                        {
                            //_blockMessage.show('GetClientInfo执行失败<br/>' + message, 'fail');
                            callBackFunction.fail('GetClientInfo执行失败<br/>' + message);
                        },
                        error: function (message)
                        {
                            // _blockMessage.show('GetClientInfo执行失败<br/>' + message, 'fail');
                            callBackFunction.fail('GetClientInfo执行失败<br/>' + message);
                        }
                    });


                },
                fail: function (message)
                {
                    //  _blockMessage.show('initUserInf执行失败<br/>' + message, 'fail');
                    callBackFunction.fail('initUserInf执行失败<br/>' + message);
                },
                error: function (message)
                {
                    //  _blockMessage.show('initUserInf执行失败<br/>' + message, 'fail');
                    callBackFunction.fail('initUserInf执行失败<br/>' + message);
                }
            });
        };

        //屏蔽按钮
        var documentKeyDownFunction= function (e)
        {

            //屏蔽F5、Ctrl+R和退格键
            e = window.event || e;
            var keycode = e.keyCode || e.which;

            if ((e.keyCode == 116) || //屏蔽   F5   刷新键
            (e.ctrlKey && e.keyCode == 82))  //屏蔽   Ctrl+R   刷新键
            {
                if (window.event)
                {// ie
                    try
                    {
                        e.keyCode = 0;
                    }
                    catch (e)
                    {
                    }
                    e.returnValue = false;

                    return false;

                } else
                {// ff
                    e.preventDefault();
                    return false;

                }
            }
            else if (e.keyCode == 8)//退格键
            {
                var obj = e.target || e.srcElement;//获取事件源 
                var t = obj.type || obj.getAttribute('type');//获取事件源类型 
                //获取作为判断条件的事件类型 
                var vReadOnly = obj.getAttribute('readonly');
                var vEnabled = obj.getAttribute('enabled');
                //处理null值情况 
                vReadOnly = (vReadOnly == null) ? false : vReadOnly;
                vEnabled = (vEnabled == null) ? true : vEnabled;
                //当敲Backspace键时，事件源类型为密码或单行、多行文本的， 
                //并且readonly属性为true或enabled属性为false的，则退格键失效 

                var flag1 = (e.keyCode == 8 && (t == "password" || t == "text" || t == "textarea") && (vReadOnly == true || vEnabled != true)) ? true : false;
                //当敲Backspace键时，事件源类型非密码或单行、多行文本的，则退格键失效 
                var flag2 = (e.keyCode == 8 && t != "password" && t != "text" && t != "textarea") ? true : false;


                //判断 
                if (flag2)
                {
                    if (obj.className == 'note-editable')//兼容富文本编辑框
                    {

                    }
                    else
                    {
                        return false;
                    }
                }
                if (flag1)
                {
                    return false;
                }
            }
        };

        var that = {

            initPageSize: initPageSize,
            //页面加载
            pageLoad: pageLoad,
            //地址变换
            changeUrl: changeUrl,
            //窗口大小变化
            resizeEnd: resizeEnd,

            documentKeyDownFunction: documentKeyDownFunction

        };
        return that;

    })();

    containerObj.pageLoad();

    containerObj.initPageSize();

    window.changeUrl = function (foreUrl, animClass)
    {
        containerObj.changeUrl(foreUrl, animClass);
    };

    $(window).on('resize', function ()
    {
        containerObj.resizeEnd();
    });

    window.onkeydown = function (e)
    {
        return containerObj.documentKeyDownFunction(e);
    };

});
