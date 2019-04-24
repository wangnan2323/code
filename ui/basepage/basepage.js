//====================关于z-index的说明=======================
//1、基础控件的z-index基本在10000以下（含10000）
//2、block控件的z-index在20000；
//3、gototop和showmenu的z-index在10001
//4、footer的z-index在10010
//5、model会程序自动取得最上层10020
//6、select2的层数在10021-10022-10023用于解决在model（list程序的查询）的下拉内容

//====================关于cookie的说明=======================
/*


userInf
说明：已登录的用户的信息，用于实现如果用户登录成功，则将当前用户信息写入cookie，避免多次后台数据操作。
格式：{ "sys_userid": "", "sys_username": "", "sys_userloginname": "", "sys_value1": "", "sys_value2": "", "sys_value3": "", "sys_value4": "", "sys_value5": "", "sys_value6": "", "sys_value7": "", "sys_value8": "", "sys_value9": "", "sys_value10": "", "sys_organid": "", "sys_organcode": "", "sys_organname": "", "sys_toporgan": "", "sys_toporganname": "", "sys_roles": "", "sys_rolenames": "", "sys_rolenameremarks": "", "sys_positionids": "", "sys_positionnames": "", "sys_fieldnames": "", "mac": "", "ip": "" }
销毁：20分钟或者用户点击“退出登录”操作
出处：basepage


isautologin
说明：是否自动登录
格式：true/false
销毁：30天
出处：basepage中设置，login中设置


userloginname
说明：已登录成功的用户的userloginname，用于组合isautologin实现，自动登录
格式：用户登录名
销毁：30天
出处：login中设置



userConfig[Userid]
说明：用户个性化设置
格式：{"readedCommentIds":"","theme":"","detailAllMode":"","widgetConfig":""}
销毁：30天
出处：basepage


*/

var basePageObj = (function ()
{
    'use strict';
    /*
    # =============================================================================
    #   滚动条触发
    # =============================================================================
    */

    var scroll = {
        _goToTop: null,
        _isGoToTopShown: '',
        _isShowMenuShown: '',
        _lastScrollTop: '',
        _currentScrollTop: '',
        _scrollDelta: 50,
        openShowMenu: function ()
        {
            //菜单的显隐
            $(".navbar.navbar-fixed-top.scroll-hide").removeClass("closed");
            return setTimeout((function ()
            {
                $(".div-showmenu").addClass('hidden');
                scroll._isShowMenuShown = false;
                return $(".navbar.navbar-fixed-top.scroll-hide").css({
                    overflow: "visible"
                });
            }), 150);
        },
        scrollMoveTop: function ()
        {
            //滚动到顶端
            var cc = $(window).scrollTop() / 1.1;

            $(window).scrollTop(cc);

            if (cc < 10)
            {
                $(window).scrollTop(0);
                clearInterval(scroll._goToTop);
                scroll._goToTop = null;
            }


        },
        windowScrollFunction: function ()
        {
            //滚动条事件

            scroll._currentScrollTop = $(window).scrollTop();

            //======================打开返回顶部按钮
            if (scroll._currentScrollTop > 500 && scroll._isGoToTopShown == false)
            {
                $(".div-gototop").removeClass('hidden');
                scroll._isGoToTopShown = true;
            }
            else if (scroll._currentScrollTop <= 500 && scroll._isGoToTopShown == true)
            {

                $(".div-gototop").addClass('hidden');
                scroll._isGoToTopShown = false;
            }

            //======================滚动到顶端则自动显示菜单
            //向下滚动
            if (scroll._currentScrollTop > scroll._lastScrollTop)
            {
            }
                //向上滚动
            else if (scroll._currentScrollTop < scroll._lastScrollTop)
            {
                if ($(window).scrollTop() == 0 && scroll._isShowMenuShown == true)
                {
                    window.setTimeout(scroll.openShowMenu, 20);
                }
            }

            //监视滚动状态
            //如果频率太小则无所谓
            if (Math.abs(scroll._lastScrollTop - scroll._currentScrollTop) <= scroll._scrollDelta)
            {
                return;
            }
            else
            {

                //向下滚动
                if (scroll._currentScrollTop > scroll._lastScrollTop)
                {

                    //如果屏幕宽度小
                    if ($(window).width() < that._limSrceenWidth)
                    {
                        if (scroll._goToTop != null)
                        {
                            //停止自动向上滚动
                            clearInterval(scroll._goToTop);
                            scroll._goToTop = null;
                        }
                    }
                    else
                    {
                        if (scroll._isShowMenuShown == false)
                        {
                            //关闭菜单
                            $('.navbar.navbar-fixed-top.scroll-hide').addClass("closed");
                            $(".div-showmenu").removeClass('hidden');
                            scroll._isShowMenuShown = true;
                        }

                        if (scroll._goToTop != null)
                        {
                            //停止自动向上滚动
                            clearInterval(scroll._goToTop);
                            scroll._goToTop = null;
                        }

                    }
                    scroll.fixStyle();
                }
                    //向上滚动
                else if (scroll._currentScrollTop < scroll._lastScrollTop)
                {
                    scroll.fixStyle();
                }
            }

            return scroll._lastScrollTop = scroll._currentScrollTop;
        },
        fixStyle: function ()
        {
            //控制gototop和menu的显示隐藏问题
            if (scroll._isGoToTopShown == true)
            {
                $(".div-gototop").removeClass('hidden');
            }
            if (scroll._isShowMenuShown == true)
            {
                $(".div-showmenu").removeClass('hidden');
            }
        }
    };



    /*
    # =============================================================================
    #   用户菜单
    # =============================================================================
    */

    var nav = {
        initNav: function (callBackFunction)
        {
            var dataJson = { userIdString: user._uid };

            doAjaxFunction(that._serviceLoginUrl, 'GetUserRuleInf', dataJson, {
                success: function (message)
                {

                    var userRuleJsonArray = (new Function("", "return " + message))();

                    if (userRuleJsonArray.length == 0)
                    {
                        var al = new alertMessage();
                        al.show('当前账户不具备任何功能权限<br/>请登录其他账户', 'fail', 3000);

                        //_blockMessage.show("登陆超时！<br/>即将跳转到登陆页面。。。", 'fail');
                        window.setTimeout(user.btn_logOut_onclick, 3000);
                    }
                    else
                    {
                        var menuhtml = nav.initNavString(userRuleJsonArray);

                        $('#ul_menu').html(menuhtml);

                        var menuFilterHtml = nav.initNavFilterString(userRuleJsonArray);
                        $('#ul_menu_filter').html(menuFilterHtml);
                        /*
                        # =============================================================================
                        #   执行回调
                        # =============================================================================
                        */

                        callBackFunction.success();
                    }


                },
                fail: function (message)
                {
                    callBackFunction.fail(message);
                },
                error: function (message)
                {
                    callBackFunction.fail(message);
                }
            });
        },
        initNavString: function (userRuleJsonArray)
        {

            var menuhtml = '';

            $.each(userRuleJsonArray, function (i, u)
            {
                var childrenString = '';
                var isChildSelected = false;
                var childrenArray = userRuleJsonArray[i].f_children;
                if (childrenArray.length > 0)
                {
                    $.each(childrenArray, function (j, k)
                    {
                        childrenString += '<li>';
                        childrenString += '<a href="javascript:void(0);" ';

                        if (childrenArray[j].f_url != '')
                        {

                            if (childrenArray[j].f_url.indexOf("http://") > -1 || childrenArray[j].f_url.indexOf("https://") > -1 || childrenArray[j].f_url.indexOf("//") > -1)
                            {
                                childrenString += ' onclick="basePageObj.nav_onclick(this);" url="' + childrenArray[j].f_url + '"';
                            }
                            else
                            {
                                var url = childrenArray[j].f_url;
                                if (url.indexOf("../") == 0)
                                {
                                    url = url.replace("../", "/ui/");
                                }
                                childrenString += ' onclick="basePageObj.nav_onclick(this);" url="//' + commonObj.projectname + url + '"';
                            }


                            if (nav.isCurrentUrl(childrenArray[j].f_url))
                            {
                                childrenString += ' class="current"';
                                isChildSelected = true;
                            }


                        }
                        if (childrenArray[j].f_target != '')
                        {
                            childrenString += ' tar="' + childrenArray[j].f_target + '"';
                        }
                        childrenString += ' >';
                        childrenString += childrenArray[j].f_name + '</a>';
                        childrenString += '</li>';
                    });
                }

                menuhtml += ' <li  val1="' + userRuleJsonArray[i].f_value1 + '"';
                if (userRuleJsonArray[i].f_children.length > 0)
                {

                    if (isChildSelected)
                    {
                        menuhtml += ' class="dropdown active"';
                    }
                    else
                    {
                        menuhtml += ' class="dropdown"';
                    }
                }
                menuhtml += ' >';
                menuhtml += '    <a href="javascript:void(0);" ';
                if (userRuleJsonArray[i].f_children.length > 0)
                {
                    menuhtml += ' data-toggle="dropdown"';
                }
                if (userRuleJsonArray[i].f_url != '')
                {

                    if (userRuleJsonArray[i].f_url.indexOf("http://") > -1 || userRuleJsonArray[i].f_url.indexOf("https://") > -1 || userRuleJsonArray[i].f_url.indexOf("//") > -1)
                    {
                        menuhtml += ' onclick="basePageObj.nav_onclick(this);" url="' + userRuleJsonArray[i].f_url + '"';
                    }
                    else
                    {
                        var url = userRuleJsonArray[i].f_url;
                        if (url.indexOf("../") == 0)
                        {
                            url = url.replace("../", "/ui/");
                        }
                        menuhtml += ' onclick="basePageObj.nav_onclick(this);" url="//' + commonObj.projectname + url + '"';
                    }



                    if (nav.isCurrentUrl(userRuleJsonArray[i].f_url))
                    {
                        menuhtml += ' class="current"';
                    }


                }
                else
                {
                    if (isChildSelected)
                    {
                        menuhtml += ' class="current"';
                    }
                }
                if (userRuleJsonArray[i].f_target != '')
                {
                    menuhtml += ' tar="' + userRuleJsonArray[i].f_target + '"';
                }

                menuhtml += ' >';


                if (userRuleJsonArray[i].f_tile != '')
                {
                    menuhtml += ' <span aria-hidden="true" ';
                    menuhtml += ' class="' + userRuleJsonArray[i].f_tile + '"';
                    menuhtml += '></span>';
                }


                menuhtml += userRuleJsonArray[i].f_name;
                if (userRuleJsonArray[i].f_children.length > 0)
                {
                    menuhtml += '<b class="caret"></b>';
                }
                menuhtml += '    </a>';

                if (userRuleJsonArray[i].f_children.length > 0)
                {
                    menuhtml += '<ul class="dropdown-menu">';
                    menuhtml += childrenString;
                    menuhtml += '</ul>';
                }

                menuhtml += '</li>';

            });

            return menuhtml;
        },
        initNavFilterString: function (userRuleJsonArray)
        {
            var filterHtml = '';
            var filterArray = [];
            $.each(userRuleJsonArray, function (i, u)
            {
                var filterName = userRuleJsonArray[i].f_value1;
                if (filterName != "" && filterName != undefined)
                {
                    if (filterArray.indexOf(filterName) < 0)
                    {
                        filterArray.push(filterName);
                    }
                }
            });
            //读取cookes中的设置
            var userMenuFilterString = ucookie.getUserCookie().userMenuFilter;
            if (userMenuFilterString == undefined)
            {
                userMenuFilterString = "";
            }
            $.each(filterArray, function (i, u)
            {
                filterHtml += '<li>';
                filterHtml += '<a onclick="basePageObj.navfilter_onclick(this);" val1="' + filterArray[i] + '" style="cursor: pointer;">';
                filterHtml += '    <div class="notifications label label-info" style="padding-top: 6px;border: 1px solid;border-radius: 25px;margin: -5px -5px 0 0;">';
                if (("^" + userMenuFilterString + "^").indexOf("^" + filterArray[i] + "^") > -1)
                {
                    filterHtml += '        <i class="icon-check-empty" style="margin-right:0"></i>';
                    $("#ul_menu>[val1='" + filterArray[i] + "']").addClass('hidden');
                }
                else
                {
                    filterHtml += '        <i class="icon-check" style="margin-right:0"></i>';
                    $("#ul_menu>[val1='" + filterArray[i] + "']").removeClass('hidden');
                }
                filterHtml += '    </div>';
                filterHtml += '    <p>';
                filterHtml += '        ' + filterArray[i];
                filterHtml += '    </p>';
                filterHtml += '</a>';
                filterHtml += '</li>';
            });
            //根据cookeis中的设置调整页面展示
            return filterHtml;
        },
        isCurrentUrl: function (url)
        {
            var cHrefArray = window.location.href.split('?'); //当前页面url
            var cPageName = cHrefArray[0].split('/')[cHrefArray[0].split('/').length - 1];

            var uHrefArray = url.split('?');
            var uPageName = uHrefArray[0].split('/')[uHrefArray[0].split('/').length - 1];

            if (cPageName == uPageName)
            {

                if (cHrefArray.length >= 2 && uHrefArray.length >= 2)
                {

                    var cParam = cHrefArray[1].split('&');
                    var uParam = uHrefArray[1].split('&');

                    var isCurrent = true;
                    $.each(cParam, function (i, u)
                    {
                        $.each(uParam, function (ii, uu)
                        {
                            if (u.split('=')[0] == uu.split('=')[0] && u != uu)
                            {
                                isCurrent = false;
                            }
                            if (isCurrent == false)
                            {
                                return isCurrent;
                            }
                        });
                        //2016-12-21 qli 这里少返回一个值，里面可能已经执行完了，这里还需要循环，没有必要
                        //这里应该是if isCurrent == false then return false
                        //return isCurrent;
                        if (isCurrent == false)
                        {
                            return isCurrent;
                        }
                    });
                    return isCurrent;
                }
                else if (cHrefArray.length >= 2 && uHrefArray.length == 1)
                {
                    return true;
                }
                else if (cHrefArray.length == 1 && uHrefArray.length >= 2)
                {
                    return true;
                }
                else if (cHrefArray.length == 1 && uHrefArray.length == 1)
                {
                    return true;
                }
            }
            else
            {
                //？？！！
                var fromurl = "", fromurlparam = '';
                $.each(cHrefArray[1].split("#")[0].split("&"), function (i, a)
                {

                    //_pr_fromurl = requestQuery('fromurl');
                    //_pr_fromurlparam = requestQuery('fromurlparam');
                    if ('string' === typeof a)
                    {
                        if (a.indexOf('fromurl=') === 0)
                        {
                            fromurl = decodeURIComponent(a.split("=")[1]);
                            if (fromurlparam)
                            {
                                return false;
                            }
                        }
                        if (a.indexOf('fromurlparam=') === 0)
                        {
                            fromurlparam = $.parseJSON(decodeURIComponent(a.split("=")[1]));
                            if (fromurl)
                            {
                                return false;
                            }
                        }
                    }
                });
                if (fromurl)
                {

                    cHrefArray = fromurl; //当前页面url
                    cPageName = cHrefArray.split('/')[cHrefArray.split('/').length - 1];

                    if (cPageName == uPageName)
                    {
                        if (uHrefArray.length == 1)
                        {
                            isCurrent = true;
                            return isCurrent;
                        } else
                        {

                            var cParam = fromurlparam;
                            var uParam = uHrefArray[1].split('&');

                            var isCurrent = true;
                            $.each(cParam, function (k, v)
                            {
                                $.each(uParam, function (ii, uu)
                                {
                                    if (k == uParam[ii].split('=')[0] && v != uParam[ii].split("=")[1])
                                    {
                                        isCurrent = false;
                                    }
                                    return isCurrent;
                                });
                                //2016-12-21 qli 这里少返回一个值，里面可能已经执行完了，这里还需要循环，没有必要
                                //这里应该是if isCurrent == false then return false
                                //但是注意这里只是break当前循环，并不是真的返回值
                                return isCurrent;
                            });
                            return isCurrent;
                        }

                    }
                    return false;
                } else
                {
                    return false;
                }
            }


        },
        nav_onclick: function (el)
        {
            var url = '';
            if ($(el).attr('url') == undefined)
            {
                url = $(el).parent().attr('url');
            }
            else
            {
                url = $(el).attr('url');
            }


            var target = '';
            if ($(el).attr('tar') == undefined)
            {
                target = $(el).parent().attr('tar');
            }
            else
            {
                target = $(el).attr('tar');
            }

            if (url.indexOf('?') > -1)
            {
                url = url + '&uid=' + user._uid;
            }
            else
            {
                url = url + '?uid=' + user._uid;
            }

            if (target == '_blank')
            {
                //var currentWindowName = window.name;
                //var newWindowName = url;
                //if (newWindowName == currentWindowName)
                //{
                //    //window.location.href = window.location.href;
                //}
                //else
                //{
                window.open(url + '&random=' + parseInt(10000 * Math.random()));
                //}
            }
            else
            {
                //window.location.href = url + '&random=' + parseInt(10000 * Math.random());

                commonObj.changeUrl(url, "normal-show");
            }

        },
        navfilter_onclick: function (el)
        {
            var userMenuFilterString = ucookie.getUserCookie().userMenuFilter;
            if (userMenuFilterString == undefined)
            {
                userMenuFilterString = "";
            }
            var $a = $(el);
            var val = $a.attr('val1');
            var $i = $a.find('.notifications>i');
            if ($i.hasClass('icon-check'))
            {
                $i.removeClass('icon-check');
                $i.addClass('icon-check-empty');
                $("#ul_menu>[val1='" + val + "']").addClass('hidden');
                userMenuFilterString += '^' + val + '^';
            }
            else
            {
                $i.addClass('icon-check');
                $i.removeClass('icon-check-empty');
                $("#ul_menu>[val1='" + val + "']").removeClass('hidden');
                userMenuFilterString = ('^' + userMenuFilterString + '^').replaceAll('^' + val + '^', '^');
            }
            //写入cookies
            ucookie.setUserCookie([{ "userMenuFilter": userMenuFilterString.trimStart('^').trimEnd('^') }]);
            //setCookie( "userMenuFilter" + user._uid, JSON.stringify( userConfigJson ), 30 );
        }
    };



    /*
    # =============================================================================
    #   用户信息
    # =============================================================================
    */
    var user = {

        //用户信息
        //sys_value1: '',//mac地址
        //sys_value2: '',//图形密码
        //sys_value3: '',//用户头像
        _userInfoJson: { "sys_userid": "", "sys_username": "", "sys_userloginname": "", "sys_value1": "", "sys_value2": "", "sys_value3": "", "sys_value4": "", "sys_value5": "", "sys_value6": "", "sys_value7": "", "sys_value8": "", "sys_value9": "", "sys_value10": "", "sys_organid": "", "sys_organcode": "", "sys_organname": "", "sys_toporgan": "", "sys_toporganname": "", "sys_roles": "", "sys_rolenames": "", "sys_rolenameremarks": "", "sys_positionids": "", "sys_positionnames": "", "sys_fieldnames": "", "mac": "", "ip": "" },

        _uid: '',
        _ladda_btn_newpasswowd: null,
        _ladda_btn_checkoldpasswowd: null,


        initUserInf: function (callBackFunction)
        {

            //1、判断是否传入uid关键参数
            user._uid = requestQuery("uid");
            if (user._uid == null || user._uid == '')
            {

                window.top.location.href = '//' + commonObj.projectname + '/ui/error/error.html?random=' + parseInt(10000 * Math.random());
            }
            else
            {

                //插入代码：              
                //根据Cookie初始化页面样式

                setStylesheet(ucookie.getUserCookie().theme);

                //2、判断cookie和uid的有效性
                var cookieUserInf = getCookie("userInf");
                if (cookieUserInf)
                {
                    cookieUserInf = JSON.parse(cookieUserInf);
                    if (cookieUserInf.sys_userid == user._uid)
                    {
                        $.extend(user._userInfoJson, cookieUserInf);
                        //2015-12-11本地验证成功，则重刷cookie时间，此时没有刷新后台session时间（如果上后台验证，则会被判断为超时，重新登陆之后不影响使用，所以应该没什么问题）
                        setCookieMinutes("userInf", JSON.stringify(cookieUserInf), 1440);
                        user.bindUserInf();

                        //判断数据库是否存在U盾信息
                        if (cookieUserInf.sys_value4 != null && cookieUserInf.sys_value4 != "" && cookieUserInf.sys_value5 != null && cookieUserInf.sys_value5 != "")
                        {
                            //超级登陆判断
                            var logintype = getCookie('logintype');
                            if (logintype != null && logintype != "" && logintype == "1")
                            {
                                callBackFunction.success();
                            }
                            else
                            {
                                var message = CheckUKey(cookieUserInf.sys_value4, cookieUserInf.sys_value5);
                                if (message == 'true')
                                {
                                    callBackFunction.success();
                                } else
                                {
                                    //var al = new alertMessage();
                                    //al.show(message, 'fail', 3000);

                                    _blockMessage.show(message + "<br/>即将跳转到登陆页面。。。", 'fail');
                                    window.setTimeout(user.btn_logOut_onclick, 3000);
                                }
                            }


                        } else
                        {
                            callBackFunction.success();
                        }
                    }
                    else
                    {
                        cookieUserInf = undefined;
                    }
                }
                else
                {
                    cookieUserInf = undefined;
                }

                if (cookieUserInf == undefined)
                {

                    //3、后台Session的有效性
                    var dataJson = {
                        userIdString: user._uid,
                        uuid: ""
                    };

                    doAjaxFunction(that._serviceLoginUrl, 'GetUserInf', dataJson, {
                        success: function (message)
                        {

                            var m = (new Function("", "return " + message))();

                            //============在此处获取当前的mac地址和IP地址================
                            doAjaxFunction(that._serviceLoginUrl, 'GetClientInfo', {}, {
                                success: function (message1)
                                {
                                    try
                                    {
                                        var mm = (new Function("", "return " + message1))();
                                        m.mac = mm.mac;
                                        m.ip = mm.ip;

                                        $.extend(user._userInfoJson, m);

                                        setCookieMinutes("userInf", JSON.stringify(user._userInfoJson), 1440);
                                        user.bindUserInf();
                                        callBackFunction.success();
                                    }
                                    catch (ex)
                                    {
                                        //_blockMessage.show('GetClientInfo执行失败<br/>' + ex.message, 'fail');
                                        callBackFunction.fail('GetClientInfo执行失败-catch<br/>' + ex.message);
                                    }
                                },
                                fail: function (message)
                                {
                                    //_blockMessage.show('GetClientInfo执行失败<br/>' + message, 'fail');
                                    callBackFunction.fail('GetClientInfo执行失败-fail<br/>' + message);
                                },
                                error: function (message)
                                {
                                    //_blockMessage.show('GetClientInfo执行失败<br/>' + message, 'fail');
                                    callBackFunction.fail('GetClientInfo执行失败-error<br/>' + message);
                                }
                            });


                        },
                        fail: function (message)
                        {
                            //2015-12-11如果后台判断为超时，则提示用户，并跳转到登录页
                            if (message == "timeout")
                            {
                                //var al = new alertMessage();
                                //al.show('登录超时！<br/>即将跳转到登录页面。。。', 'fail', 3000);

                                _blockMessage.show("登陆超时！<br/>即将跳转到登陆页面。。。", 'fail');
                                window.setTimeout(user.btn_logOut_onclick, 3000);

                            } else
                            {
                                // _blockMessage.show('initUserInf执行失败<br/>' + message, 'fail');
                                callBackFunction.fail('initUserInf执行失败-fail<br/>' + message);
                            }
                        },
                        error: function (message)
                        {
                            //_blockMessage.show('initUserInf执行失败<br/>' + message, 'fail');
                            callBackFunction.fail('initUserInf执行失败-error<br/>' + message);
                        }
                    });
                }

            }
        },

        //绑定用户信息到页面
        bindUserInf: function ()
        {
            //---------------------用户信息---------------------


            var userImageString = '';

            if (!user._userInfoJson.sys_photourl)
            {
                userImageString += '<img style="border-radius:50%;" class="img-usericon" src="//127.0.0.1/sara.resource.library/images/currentUser.png" />';
            }
            else
            {
                userImageString += '<img style="border-radius:50%;" class="img-usericon" src="//127.0.0.1/sara.dd.ldsw.file/files_auth/fileuploadpath/' + user._userInfoJson.sys_photourl + '" />';
            }

            var userString = '';
            userString += userImageString;
            userString += user._userInfoJson.sys_username;
            userString += '<b class="caret"></b>';
            $('#a_user').html(userString);


            $('#div_userinfo_modal').modal({
                keyboard: false,
                backdrop: 'static',
                show: false
            })

            //用户名
            $('#txt_username').html(userImageString + user._userInfoJson.sys_username + '/' + user._userInfoJson.sys_userloginname);


            //机构信息
            $('#txt_userorgan').html(user._userInfoJson.sys_toporganname + '/' + user._userInfoJson.sys_organname);
            //岗位信息
            $('#txt_userposition').html(user._userInfoJson.sys_positionnames.replaceAll('^', '，'));
            //角色信息
            $('#txt_userrole').html(user._userInfoJson.sys_rolenames.replaceAll('^', '，'));

            //本机信息
            $('#txt_macip').html('mac地址:' + user._userInfoJson.mac + '<br/>ip地址:' + user._userInfoJson.ip);

            //---------------------密码管理---------------------
            $('#div_password_modal').modal({
                keyboard: false,
                backdrop: 'static',
                show: false
            })

            //---------------------用户信息---------------------


        },

        btn_userinfo_onclick: function ()
        {
            $('#div_userinfo_modal').modal('show');
        },
        btn_userinfo_modal_close_onclick: function ()
        {
            $('#div_userinfo_modal').modal('hide');
        },
        //密码管理
        _isOldPasswordChecked: '',
        btn_passwordmanage_onclick: function (el)
        {



            $('#tabsleft').bootstrapWizard({
                tabClass: 'nav nav-tabs',
                debug: false,
                onShow: function (tab, navigation, index)
                {
                    // alert('onShow');
                },
                onNext: function (tab, navigation, index)
                {
                    //alert('onNext');
                },
                onPrevious: function (tab, navigation, index)
                {
                    // alert('onPrevious');
                },
                onLast: function (tab, navigation, index)
                {
                    // alert('onLast');
                },
                onTabClick: function (tab, navigation, selectIndex, currentIndex)
                {
                    var currentEl = navigation.find('li')[currentIndex];
                    currentEl.children[0].id
                    if (currentEl.className == 'disabled')
                    {
                        return false;
                    }
                    else
                    {

                        user.initPasswordModalStep(currentEl.children[0].id.split('_')[1]);
                    }



                },
                onTabShow: function (tab, navigation, index)
                {
                    // alert('onTabShow');
                    var $total = navigation.find('li').length;
                    var $current = index + 1;
                    var $percent = ($current / $total) * 100;
                    $('#tabsleft').find('.bar').css({ width: $percent + '%' });

                    // If it's the last tab then hide the last button and show the finish instead
                    if ($current >= $total)
                    {
                        $('#tabsleft').find('.pager .next').hide();
                        $('#tabsleft').find('.pager .finish').show();
                        $('#tabsleft').find('.pager .finish').removeClass('disabled');
                    } else
                    {
                        $('#tabsleft').find('.pager .next').show();
                        $('#tabsleft').find('.pager .finish').hide();
                    }

                }
            });




            user.initPasswordModalStep('1');

            $('#tabsleft').bootstrapWizard('first');

            $('#div_password_modal').modal('show');
        },
        btn_password_modal_close_onclick: function ()
        {
            $('#div_password_modal').modal('hide');
        },
        //验证旧密码
        btn_checkoldpasswowd_onclick: function ()
        {


            if ($('#txt_old_password').val() == '')
            {
                $('#div_password_modal_message').addClass('div_password_modal_message_red');
                $('#div_password_modal_message').html('原始密码不能为空');
                $('#txt_old_password').focus();


            }
            else
            {
                user._ladda_btn_checkoldpasswowd.start();

                var dataJson = {
                    userLoginNameString: user._userInfoJson.sys_userloginname,
                    userPasswordString: $('#txt_old_password').val(),
                    userPatternString: '--'
                };
                doAjaxFunction(that._serviceLoginUrl, 'UserLogin', dataJson, {
                    success: function (message)
                    {
                        user._ladda_btn_checkoldpasswowd.stop();

                        user._isOldPasswordChecked = true;

                        $('#tabsleft').bootstrapWizard('disable', 0);
                        $('#tabsleft').bootstrapWizard('enable', 1);
                        $('#tabsleft').bootstrapWizard('enable', 2);
                        $('#tabsleft').bootstrapWizard('enable', 3);
                        $('#tabsleft').bootstrapWizard('enable', 4);

                        user.initPasswordModalStep('2');

                        $('#tabsleft').bootstrapWizard('next');


                    },
                    fail: function (message)
                    {
                        user._ladda_btn_checkoldpasswowd.stop();
                        user.initPasswordModalStep('1');

                        $('#div_password_modal_message').addClass('div_password_modal_message_red');
                        $('#div_password_modal_message').html('原始密码错误');

                    },
                    error: function (message)
                    {
                        user._ladda_btn_checkoldpasswowd.stop();
                        user.initPasswordModalStep('1');

                        $('#div_password_modal_message').addClass('alert-danger');
                        $('#div_password_modal_message').html('原始密码验证异常');
                    }
                });

            }

        },
        //密码强度
        txt_new_password1_onkeyup: function ()
        {
            var thisval = $('#txt_new_password1').val();
            var characters = 0;
            var capitalletters = 0;
            var loweletters = 0;
            var number = 0;
            var special = 0;

            var upperCase = new RegExp('[A-Z]');
            var lowerCase = new RegExp('[a-z]');
            var numbers = new RegExp('[0-9]');
            var specialchars = new RegExp('([!,%,&,@,#,$,^,*,?,_,~])');

            if (thisval.length > 8) { characters = 1; } else { characters = 0; };
            if (thisval.match(upperCase)) { capitalletters = 1 } else { capitalletters = 0; };
            if (thisval.match(lowerCase)) { loweletters = 1 } else { loweletters = 0; };
            if (thisval.match(numbers)) { number = 1 } else { number = 0; };

            var total = characters + capitalletters + loweletters + number + special;

            switch (total)
            {
                case 0:
                    $('#div_password_strong').html('');
                    $('#div_password_strong').removeClass('password-strong-1');
                    $('#div_password_strong').removeClass('password-strong-2');
                    $('#div_password_strong').removeClass('password-strong-3');
                    $('#div_password_strong').removeClass('password-strong-4');
                    break
                case 1:
                    $('#div_password_strong').html('密码强度：很弱');
                    $('#div_password_strong').addClass('password-strong-1');
                    break
                case 2:
                    $('#div_password_strong').html('密码强度：弱');
                    $('#div_password_strong').addClass('password-strong-2');
                    break
                case 3:
                    $('#div_password_strong').html('密码强度：一般');
                    $('#div_password_strong').addClass('password-strong-3');
                    break
                case 4:
                    $('#div_password_strong').html('密码强度：强');
                    $('#div_password_strong').addClass('password-strong-4');
                    break
            }

        },
        //更新密码
        btn_newpasswowd_onclick: function ()
        {


            if ($('#txt_new_password1').val() == $('#txt_new_password2').val())
            {
                user._ladda_btn_newpasswowd.start();
                var dataJson = { userIdString: user._userInfoJson.sys_userid, oldPasswordString: $('#txt_old_password').val(), newPasswordString: $('#txt_new_password1').val() };
                doAjaxFunction(that._serviceLoginUrl, 'UpdateUserPassWord', dataJson, {
                    success: function (message)
                    {
                        user._ladda_btn_newpasswowd.stop();
                        //更新密码后要更新原始密码，方便再次修改密码。
                        $('#txt_old_password').val($('#txt_new_password1').val());
                        //更新用户密码
                        user.initPasswordModalStep('3');
                        $('#tabsleft').bootstrapWizard('next');
                    },
                    fail: function (message)
                    {
                        user._ladda_btn_newpasswowd.stop();
                        user.initPasswordModalStep('2');

                        $('#div_password_modal_message').addClass('div_password_modal_message_red');
                        $('#div_password_modal_message').html('密码更新失败');

                    },
                    error: function (message)
                    {
                        user._ladda_btn_newpasswowd.stop();
                        user.initPasswordModalStep('2');

                        $('#div_password_modal_message').addClass('div_password_modal_message_red');
                        $('#div_password_modal_message').html('密码更新异常');
                    }
                });
            }
            else
            {
                user.initPasswordModalStep('2');
                $('#div_password_modal_message').addClass('div_password_modal_message_red');
                $('#div_password_modal_message').html('两次密码不一致');
            }


        },
        //更新图形码
        updateUserPatternPassword: function ()
        {
            if (user._patternNumber1 == user._patternNumber2)
            {

                var attr = 'f_value2^' + user._patternNumber1;
                var dataJson = { userIdString: user._userInfoJson.sys_userid, userAttrsString: attr };
                doAjaxFunction(that._serviceLoginUrl, 'UpdateUserAttr', dataJson, {
                    success: function (message)
                    {

                        user.initPasswordModalStep('4');
                        $('#tabsleft').bootstrapWizard('next');


                    },
                    fail: function (message)
                    {
                        user.initPasswordModalStep('3');
                        $('#div_password_modal_message').addClass('div_password_modal_message_red');
                        $('#div_password_modal_message').html('图形密码保存失败');

                    },
                    error: function (message)
                    {
                        user.initPasswordModalStep('3');
                        $('#div_password_modal_message').addClass('div_password_modal_message_red');
                        $('#div_password_modal_message').html('图形密码保存异常');
                    }
                });


            }
            else
            {
                user.initPasswordModalStep('3');
                $('#div_password_modal_message').addClass('div_password_modal_message_red');
                $('#div_password_modal_message').html('两次图形不一致');
            }
        },
        //更新mac地址
        updateUserMac: function (mac, isadd)
        {
            var macString = '';
            if (isadd == 'true')
            {
                user._userInfoJson.sys_value1 = (user._userInfoJson.sys_value1 + ',' + mac).trimEnd(',').trimStart(',');
            }
            else
            {
                user._userInfoJson.sys_value1 = user._userInfoJson.sys_value1.replace(mac, '').trimEnd(',').trimStart(',');
            }


            var attr = 'f_value1^' + user._userInfoJson.sys_value1;
            var dataJson = { userIdString: user._userInfoJson.sys_userid, userAttrsString: attr };
            doAjaxFunction(that._serviceLoginUrl, 'UpdateUserAttr', dataJson, {
                success: function (message)
                {

                    user.initPasswordModalStep('4');


                },
                fail: function (message)
                {
                    user.initPasswordModalStep('4');
                    $('#div_password_modal_message').addClass('div_password_modal_message_red');
                    $('#div_password_modal_message').html('信任设备失败');
                },
                error: function (message)
                {
                    user.initPasswordModalStep('4');
                    $('#div_password_modal_message').addClass('div_password_modal_message_red');
                    $('#div_password_modal_message').html('信任设备异常');
                }
            });
        },

        _patternlock: null,
        _patternNumber1: '',
        _patternNumber2: '',
        initPasswordModalStep: function (stepNumber)
        {
            switch (stepNumber)
            {
                case "1":
                    $('#txt_old_password').val('');

                    user._isOldPasswordChecked = false;

                    $('#div_password_modal_message').removeClass('div_password_modal_message_red');
                    $('#div_password_modal_message').html('请输入原始密码');

                    $('#tabsleft').bootstrapWizard('enable', 0);
                    $('#tabsleft').bootstrapWizard('disable', 1);
                    $('#tabsleft').bootstrapWizard('disable', 2);
                    $('#tabsleft').bootstrapWizard('disable', 3);
                    $('#tabsleft').bootstrapWizard('disable', 4);


                    break;
                case "2":
                    $('#div_password_modal_message').removeClass('div_password_modal_message_red');
                    $('#div_password_modal_message').html('请输入新密码');

                    $('#txt_new_password1').val('');
                    $('#txt_new_password2').val('');

                    $('#div_password_strong').html('');

                    $('#div_password_strong').removeClass('password-strong-1');
                    $('#div_password_strong').removeClass('password-strong-2');
                    $('#div_password_strong').removeClass('password-strong-3');
                    $('#div_password_strong').removeClass('password-strong-4');

                    break;
                case "3":
                    $('#div_password_modal_message').removeClass('div_password_modal_message_red');
                    $('#div_password_modal_message').html('请输入解锁图形');
                    user._patternNumber1 = '';
                    user._patternNumber2 = '';

                    if (user._patternlock == null)
                    {
                        var patterOpertion =
                        {
                            onDraw: function (pattern)
                            {
                                if (user._patternNumber1 == '' && user._patternNumber2 == '')
                                {
                                    $('#div_password_modal_message').removeClass('div_password_modal_message_red');
                                    $('#div_password_modal_message').html('请再次输入解锁图形');

                                    user._patternNumber1 = pattern;

                                }
                                else if (user._patternNumber1 != '' && user._patternNumber2 == '')
                                {
                                    user._patternNumber2 = pattern;
                                    user.updateUserPatternPassword();

                                }

                                user._patternlock.reset();
                            }
                        };
                        //如果屏幕宽度小
                        if ($(window).width() < that._limSrceenWidth)
                        {
                            patterOpertion.margin = 0;
                        }
                        else
                        {
                            patterOpertion.margin = 10;
                        }

                        user._patternlock = new PatternLock("#div_patternpassword", patterOpertion);
                    }
                    else
                    {
                        user._patternlock.reset();
                    }

                    break;
                case "4":
                    $('#div_password_modal_message').removeClass('div_password_modal_message_red');
                    $('#div_password_modal_message').html('请选择信任的设备');

                    var cc = user._userInfoJson.sys_value1.split(',');
                    var mac = user._userInfoJson.mac;
                    var isshowmac = true;
                    var ss = '';
                    $.each(cc, function (i, u)
                    {
                        if (cc[i] == mac)
                        {
                            isshowmac = false;
                        }
                        if (cc[i] != '')
                        {
                            ss += '<span onclick="basePageObj.updateUserMac(\'' + cc[i] + '\',\'false\');"  class="alert-success span-my-macaddress">' + cc[i] + '&times;</span>&nbsp;&nbsp;';
                        }

                    });
                    $('#div_my_macaddress').html(ss);
                    var ssa = '';
                    if (isshowmac)
                    {
                        ssa = '<span  onclick="basePageObj.updateUserMac(\'' + mac + '\',\'true\');"  class="alert-success span-my-macaddress">信任</span>';
                    }

                    $('#div_current_macaddress').html(mac + ssa);

                    break;
                case "5":
                    $('#div_password_modal_message').removeClass('div_password_modal_message_red');
                    $('#div_password_modal_message').html('请设定是否开启自动登录功能');

                    setTimeout(function ()
                    {
                        $('#ck_isautologin').bootstrapSwitch();
                        var isautologin = getCookie('isautologin');
                        if (isautologin == 'true')
                        {
                            $('#ck_isautologin').bootstrapSwitch('state', true);
                        }
                        else
                        {
                            $('#ck_isautologin').bootstrapSwitch('state', false);
                        }

                        $('#ck_isautologin').on('switchChange.bootstrapSwitch', function (event, state)
                        {
                            setCookie('isautologin', state, 30);

                        });
                    }, 100);


                    break;
            }
        },
        btn_logOut_onclick: function ()
        {
            setCookieMinutes("userInf", "");
            //============调用退出系统================
            doAjaxFunction(that._serviceLoginUrl, 'UserLogout', {}, {
                success: function (message1)
                {
                },
                fail: function (message)
                {
                }
            });

            window.top.location.href = '//' + commonObj.projectname + '/ui/login/login.html?random=' + parseInt(10000 * Math.random());
        },
        btn_function_onclick: function ()
        {
            $('#div_function_modal').modal('show');
        },
        div_function_modal_close_onclick: function ()
        {
            $('#div_function_modal').modal('hide');
        }
    };


    /*
    # =============================================================================
    #   屏蔽按键
    # =============================================================================
    */
    var onkeydown = {
        documentKeyDownFunction: function (e)
        {

            //屏蔽F5、Ctrl+R和退格键

            e = window.event || e;
            var keycode = e.keyCode || e.which;

            if ((e.keyCode == 116) || //屏蔽   F5   刷新键
            (e.ctrlKey && e.keyCode == 82))  //屏蔽   Ctrl+R   刷新键
            {
                window.location.reload();
                if (window.event)
                {// ie
                    try { e.keyCode = 0; } catch (e) { }
                    e.returnValue = false;

                    return false;
                }
                else
                {// ff
                    e.preventDefault();
                    return false;


                }
            }
            else
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
                    var val = false;
                    if (obj.attributes["contenteditable"] != undefined)//兼容可编辑的div
                    {
                        if (obj.attributes["contenteditable"].value == "true")
                        {
                            val = true;
                        }
                    }
                    if (obj.className == 'note-editable')//兼容富文本编辑框
                    {
                        val = true;
                    }
                    return val;
                }
                if (flag1)
                {
                    return false;
                }
            }
        },
    };

    /*
    # =============================================================================
    #   验证当前页面是否在container中
    # =============================================================================
    */


    var con = {
        checkIsContainer: function ()
        {
            try
            {
                var iscontainer = false;

                if (typeof (window.top.changeUrl) != 'undefined')
                {
                    iscontainer = true;
                }
                else
                {


                    var thatWindow = window.top;

                    do
                    {
                        if (thatWindow.opener
                            && thatWindow.opener.top
                            && typeof (thatWindow.opener.top.changeUrl) != 'undefined')
                        {
                            iscontainer = true;
                            window.top.onbeforeunload = function ()
                            {
                                window.top.location.reload();
                            }
                        } else if (thatWindow.top.opener)
                        {
                            thatWindow = thatWindow.top.opener.top;
                        } else
                        {
                            //如果没有opener，则会直接跳出循环，此处可不做处理
                        }
                    } while (!iscontainer && thatWindow.opener)


                }

                if (iscontainer)
                {
                }
                else
                {
                    if (!commonObj.need2BeInContainer)
                    {
                        return;
                    }
                  //  window.top.location.href = '//' + commonObj.projectname + '/ui/error/error.html?random=' + parseInt(10000 * Math.random());
                }
            } catch (e)
            {

               // window.top.location.href = '//' + commonObj.projectname + '/ui/error/error.html?random=' + parseInt(10000 * Math.random());
            }
        }
    };

    /*
    # =============================================================================
    #   样式
    # =============================================================================
    */
    var theme = {
        chooseStyle: function (styletitle)
        {
            if (document.getElementById)
            {
                setStylesheet(styletitle)
                ucookie.setUserCookie([{ "theme": styletitle }]);
                //？？！！
                window.location.reload();
            }
        }
    };


    /*
    # =============================================================================
    #   userCookie
    # =============================================================================
    */

    var ucookie = {
        setUserCookie: function (paramArray)
        {
            // paramArray = [{ key: value }, { key: value }];
            if (paramArray && paramArray != null)
            {
                var userConfigJson = ucookie.getUserCookie();

                $.each(paramArray, function (i, u)
                {
                    for (var key in u)
                    {
                        switch (key)
                        {
                            case "readedCommentIds":
                                {
                                    userConfigJson.readedCommentIds = u[key];
                                }
                                break;
                            case "theme":
                                {
                                    userConfigJson.theme = u[key];
                                }
                                break;
                            case "detailAllMode":
                                {
                                    userConfigJson.detailAllMode = u[key];
                                }
                                break;
                            case "widgetConfig":
                                {
                                    userConfigJson.widgetConfig = u[key];
                                }
                                break;
                            case "userMenuFilter":
                                {
                                    userConfigJson.userMenuFilter = u[key];
                                }
                                break;
                        }
                    }
                });

                setCookie("userConfig" + user._uid, JSON.stringify(userConfigJson), 30);
            }
            else
            {
                setCookie("userConfig" + user._uid, "");
            }

        },
        getUserCookie: function ()
        {
            var userConfigJsonString = getCookie("userConfig" + user._uid);
            var userConfigJson = null;
            if (userConfigJsonString == null)
            {
                userConfigJson = { "readedCommentIds": "", "theme": "blue-theme", "detailAllMode": "2", "widgetConfig": "workitem^comment^notebook^news^support", "userMenuFilter": "" };
            }
            else
            {
                userConfigJson = (new Function("", "return " + userConfigJsonString))();
            }
            return userConfigJson;
        }

    };

    /*
    # =============================================================================
    #   公有方法
    # =============================================================================
    */
    var that = {
        initBasePage: function (callBackFunction)
        {

            con.checkIsContainer();

            $('#div_basepage_foot').load('//' + commonObj.projectname + '/ui/basepage/basepage-foot.html', null, function ()
            {
                $('#div_basepage_body').load('//' + commonObj.projectname + '/ui/basepage/basepage-body.html', null, function ()
                {
                    $('#div_basepage_head').load('//' + commonObj.projectname + '/ui/basepage/basepage-head.html', null, function ()
                    {
                        try
                        {
                            /*
                             # =============================================================================
                             #  一、控件初始化
                             # =============================================================================
                             */

                            //1消息控件
                            initConfirmMessage();
                            initContentMessage();

                            //2返回顶端按钮
                            $(".div-gototop").bind('click', function ()
                            {
                                clearInterval(scroll._goToTop);
                                scroll._goToTop = null;
                                scroll._goToTop = setInterval(scroll.scrollMoveTop, 10);
                            });

                            //3显示菜单--现在修改为由按钮触发，而不是鼠标浮动到菜单区域触发                           
                            $(".div-showmenu").bind('click', scroll.openShowMenu);

                            //鼠标浮动到菜单，则显示全部菜单
                            //$(".container-fluid.main-nav").mouseover(function ()
                            //{
                            //    $(".navbar.navbar-fixed-top.scroll-hide").removeClass("closed");
                            //    return setTimeout((function ()
                            //    {
                            //        return $(".navbar.navbar-fixed-top.scroll-hide").css({
                            //            overflow: "visible"
                            //        });
                            //    }), 150);
                            //});

                            //4移动端菜单样式（汉堡菜单）                           
                            $('.navbar-toggle').click(function ()
                            {
                                return $('body, html').toggleClass("nav-open");
                            });

                            //5用户信息按钮 
                            user._ladda_btn_newpasswowd = Ladda.create('btn_newpasswowd');
                            user._ladda_btn_checkoldpasswowd = Ladda.create('btn_checkoldpasswowd');

                            /*
                            # =============================================================================
                            # 二、用户信息初始化
                            # =============================================================================
                            */

                            user.initUserInf({
                                success: function ()
                                {

                                    /*
                                    # =============================================================================
                                    #   三、初始化菜单
                                    # =============================================================================
                                    */
                                    nav.initNav({
                                        success: function ()
                                        {
                                            callBackFunction.success();
                                        },
                                        fail: function (message)
                                        {
                                            callBackFunction.fail('initNav执行失败-fail' + message);
                                        }
                                    });
                                }, fail: function (message)
                                {
                                    callBackFunction.fail('initUserInf执行失败-fail' + message);
                                }
                            });
                        }
                        catch (ex)
                        {
                            //_blockMessage.show('initBasePage执行失败<br/>' + ex.message, 'fail');
                            callBackFunction.fail('initBasePage执行失败-catch' + ex.message);
                        }

                    });
                });
            });
        },
        //手机屏幕宽度，在小于这个宽度时，部分功能会有所变化。
        _limSrceenWidth: 767,
        _padMaxSrceenWidth: 1199,//？？！！
        _padMinSrceenWidth: 991,//？？！！
        _userInfoJson: user._userInfoJson,

        _serviceLoginUrl: '//127.0.0.1/sara.dd.ldsw/service/service_login.asmx/',
        windowScrollFunction: scroll.windowScrollFunction,
        btn_userinfo_onclick: user.btn_userinfo_onclick,
        btn_userinfo_modal_close_onclick: user.btn_userinfo_modal_close_onclick,
        btn_passwordmanage_onclick: user.btn_passwordmanage_onclick,
        btn_password_modal_close_onclick: user.btn_password_modal_close_onclick,
        btn_checkoldpasswowd_onclick: user.btn_checkoldpasswowd_onclick,
        txt_new_password1_onkeyup: user.txt_new_password1_onkeyup,
        btn_newpasswowd_onclick: user.btn_newpasswowd_onclick,
        btn_logOut_onclick: user.btn_logOut_onclick,
        btn_function_onclick: user.btn_function_onclick,
        div_function_modal_close_onclick: user.div_function_modal_close_onclick,
        documentKeyDownFunction: onkeydown.documentKeyDownFunction,
        updateUserMac: user.updateUserMac,
        nav_onclick: nav.nav_onclick,
        navfilter_onclick: nav.navfilter_onclick,
        chooseStyle: theme.chooseStyle,
        setUserCookie: ucookie.setUserCookie,
        getUserCookie: ucookie.getUserCookie
    };
    return that;
})();



$(window).scroll(function (event)
{

    //basePageObj.windowScrollFunction();

});

document.onkeydown = function (e)
{

    return basePageObj.documentKeyDownFunction(e);

}
