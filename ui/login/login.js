var _blockMessage = '';
var _alertMessage = null;

var login_Obj = (function ()
{
    'use strict';

    var _serviceLoginUrl = '//127.0.0.1/sara.dd.ldsw/service/service_login.asmx/',
     _patternlock = null,
     _ladda_btn_login_password = null,
     _ladda_btn_autologin = null,
     _autologinmodel = '',
     _isautologin = false,
     _autologin_username = '',
     _autologin_userpwd = '';
   
    var that = {       
        init: function ()
        {
            _alertMessage = new alertMessage();
            //验证浏览器
            var currentVersion = getBrowerVersion();
            var currentVersionStr = currentVersion.browser + '_' + currentVersion.version;
            if (currentVersionStr == 'IE_7.0')
            {
                window.location.href = ('../browerversion/browerversion.html');

            } else if (currentVersionStr == 'IE_8.0')
            {
                _alertMessage.show('您的浏览器版本太低，您可以<a href="//127.0.0.1/sara.resource.library/html/MSIE678.html">更换新版浏览器</a>以获取更好的浏览体验', "warning", 5000);
            }

            //背景颜色自动变换
            $.supersized({

                // Functionality
                slide_interval: 40000,    // Length between transitions
                transition: 1,    // 0-None, 1-Fade, 2-Slide Top, 3-Slide Right, 4-Slide Bottom, 5-Slide Left, 6-Carousel Right, 7-Carousel Left
                transition_speed: 10000,    // Speed of transition
                performance: 1,    // 0-Normal, 1-Hybrid speed/quality, 2-Optimizes image quality, 3-Optimizes transition speed // (Only works for Firefox/IE, not Webkit)

                // Size & Position
                min_width: 0,    // Min width allowed (in pixels)
                min_height: 0,    // Min height allowed (in pixels)
                vertical_center: 1,    // Vertically center background
                horizontal_center: 1,    // Horizontally center background
                fit_always: 0,    // Image will never exceed browser width or height (Ignores min. dimensions)
                fit_portrait: 1,    // Portrait images will not exceed browser height
                fit_landscape: 0,    // Landscape images will not exceed browser width

                // Components
                slide_links: 'blank',    // Individual links for each slide (Options: false, 'num', 'name', 'blank')
                slides: [    // Slideshow Images
                    { image: '//127.0.0.1/sara.resource.library/images/login-bg-0.jpg' }//,
                    //{ image: '//162.16.166.1/sara.resource.library/images/login-bg-1.jpg' },
                    //{ image: '//162.16.166.1/sara.resource.library/images/login-bg-2.jpg' },
                    //{ image: '//162.16.166.1/sara.resource.library/images/login-bg-3.jpg' }
                ]

            });

            //初始化按钮 loading效果

            _ladda_btn_login_password = Ladda.create('btn_login_password');
            _ladda_btn_autologin = Ladda.create('btn_autologin');

            //根据cookie初始化是否自动登录
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

            //初始化图形密码登录窗体
            $('#div_pattern_modal').modal({
                //keyboard: false,
                //backdrop: 'static',
                show: false
            })

            //初始化自动地址登录窗体
            $('#div_autologin_modal').modal({
                keyboard: false,
                backdrop: 'static',
                show: false
            })

            /* 增加回车提交功能 */
            $('#txt_userloginname,#txt_userpassword').bind('keyup', function (event)
            {
                if (event.keyCode == '13')
                {
                    that.btn_login_password_onclick();
                }
            });

            //自动登录优先级：传入参数》cookies》mac识别

            that.autologin_requestparameter({
                autologinfalse: function ()
                {
                    if (isautologin == 'true')
                    {
                        that.autologin_cookie({
                            autologinfalse: function ()
                            {
                                that.autologin_mac({
                                    autologinfalse: function ()
                                    {

                                    }
                                });
                            }
                        });
                    }
                    else
                    {
                        $('#txt_userloginname').focus();
                    }
                }
            });
        },
        /*==============用户名密码登录==============*/
        btn_login_password_onclick: function ()
        {
            
            _ladda_btn_login_password.start();
            $('#txt_userloginname').removeClass('txt-warning');
            $('#txt_userpassword').removeClass('txt-warning');
            var userloginname = $('#txt_userloginname').val().trim();
            var userpassword = $('#txt_userpassword').val().trim();

            if (userloginname == '' && userpassword == '')
            {
                $('#txt_userloginname').focus();
                $('#txt_userloginname').addClass('txt-warning');
                $('#txt_userpassword').addClass('txt-warning');

                _ladda_btn_login_password.stop();

            }
            else if (userloginname == '' && userpassword != '')
            {
                $('#txt_userloginname').focus();
                $('#txt_userloginname').addClass('txt-warning');

                _ladda_btn_login_password.stop();
            }
            else if (userloginname != '' && userpassword == '')
            {
                $('#txt_userpassword').focus();
                $('#txt_userpassword').addClass('txt-warning');

                _ladda_btn_login_password.stop();
            }
            else
            {
                that.ajaxlogin(userloginname, userpassword, '--', {
                    loginfalse: function (message)
                    {
                        _ladda_btn_login_password.stop();
                        $('#span_errormessage').html(message);
                    },
                    loginerror: function (error)
                    {
                        _ladda_btn_login_password.stop();
                        $('#span_errormessage').html(error);
                    }
                });
            }
        },

        /*==============用户名图形登录==============*/
        btn_login_pattern_onclick: function ()
        {
            $('#span_errormessage').html('');
            $('#txt_userloginname').removeClass('txt-warning');
            $('#txt_userpassword').removeClass('txt-warning');
            var userloginname = $('#txt_userloginname').val().trim();


            if (userloginname == '')
            {
                $('#txt_userloginname').focus();
                $('#txt_userloginname').addClass('txt-warning');
            }
            else
            {


                if (_patternlock == null)
                {
                    _patternlock = new PatternLock("#div_pattern_content", {
                        margin: 15,
                        onDraw: function (pattern)
                        {
                            that.ajaxlogin(userloginname, '--', pattern, {
                                loginfalse: function (message)
                                {
                                    _patternlock.error();
                                },
                                loginerror: function (error)
                                {
                                    $('#span_errormessage').html(error);
                                }
                            });
                        }
                    });

                    setTimeout(function ()
                    {
                        $('#div_pattern_modal').modal('show');
                    }, 100);

                }
                else
                {
                    _patternlock.reset();

                    $('#div_pattern_modal').modal('show');
                }

            }
        },

        btn_pattern_modal_close_onclick: function ()
        {
            $('#div_pattern_modal').modal('hide');
        },

        /*==============autologin功能==============*/
      
        autologinstart: function ()
        {
            switch (_autologinmodel)
            {
                case "requestparameter":
                    $('#pietext').html('已识别账户:' + _autologin_username + '<br/>[参数]自动登录中...');
                    break;
                case "cookie":
                    $('#pietext').html('已识别账户:' + _autologin_username + '<br/>[cookie]自动登录中...');
                    break;
                case "mac":
                    $('#pietext').html('已识别账户:' + _autologin_username + '<br/>[mac]自动登录中...');
                    break;
            }

            
            $( '#div_autologin_modal' ).modal( 'show' );
            //？？！！
            $( '#div_autologin_modal' ).attr( 'style', "display:block" );
            
            $("#piechart").easyPieChart({
                size: 60,
                lineWidth: 5,
                lineCap: "square",
                barColor: "#81e970",
                scaleColor: false
            });

            _isautologin = true;
            setTimeout(that.setPieChart, 200);
        },
        btn_autologin_onclick: function (isLogin)
        {

            if (isLogin)
            {
                _ladda_btn_autologin.start();
                that.autologinok();
            }
            else
            {
                $('#div_autologin_modal').modal('hide');
                _isautologin = false;

            }
        },
        setPieChart: function ()
        {
            if (_isautologin)
            {
                var cc = parseInt($('#pienumber').html().replace('%', ''));

                if (cc <= 0)
                {
                    that.autologinok();
                }
                else
                {
                    cc = cc - 2;

                    $('#piechart').data('easyPieChart').update(cc);
                    $('#pienumber').html(cc + '%');

                    setTimeout(that.setPieChart, 200);
                }
            }
        },
        autologinok: function ()
        {
            switch (_autologinmodel)
            {
                case "requestparameter":
                    that.ajaxlogin(_autologin_username, _autologin_userpwd, '--', {
                        loginfalse: function (message)
                        {
                            $('#span_errormessage').html(message);
                            _ladda_btn_autologin.stop();
                        },
                        loginerror: function (error)
                        {
                            _ladda_btn_autologin.stop();
                            $('#span_errormessage').html(error);
                        }
                    });
                    break;
                case "cookie":
                    that.ajaxlogin(_autologin_username, '--', '--', {
                        loginfalse: function (message)
                        {
                            $('#span_errormessage').html(message);
                            _ladda_btn_autologin.stop();
                        },
                        loginerror: function (error)
                        {
                            _ladda_btn_autologin.stop();
                            $('#span_errormessage').html(error);
                        }
                    });
                    break;
                case "mac":
                    that.ajaxlogin(_autologin_username, '--', '--', {
                        loginfalse: function (message)
                        {
                            $('#span_errormessage').html(message);
                            _ladda_btn_autologin.stop();
                        },
                        loginerror: function (error)
                        {
                            _ladda_btn_autologin.stop();
                            $('#span_errormessage').html(error);
                        }
                    });
                    break;
            }
        },
        /*==============登录==============*/
        ajaxlogin: function (userloginname, userpassword, userpattern, callBackFunction)
        {
            var dataJson = { userLoginNameString: userloginname, userPasswordString: userpassword, userPatternString: userpattern };
            doAjaxFunction(_serviceLoginUrl, 'UserLogin', dataJson, {
                success: function (message)
                {
                    //记录自动登录用的userloginname
                    setCookie('userloginname', userloginname, 30);
                    var userid = message.split('^')[0];
                    var logintype = message.split('^')[1];
                    ////window.location.href = '../main/main.html?uid=' + userid + '&random=' + parseInt(10000 * Math.random());
                  

                    /*=======================在login页面就完成userInfCookie的初始化工作=======================*/
                    that.cookieUserInf(userid,logintype, {
                        success: function ()
                        {
                            if (commonObj.need2BeInContainer)
                            {
                                window.location.href = '../container/container.html?random=' + parseInt(10000 * Math.random()) + '&foreurl=../main/main.html&uid=' + userid;
                            } else
                            {
                                window.location.href = '../main/main.html?random=' + parseInt(10000 * Math.random()) + '&uid=' + userid;
                            }
                        },
                        fail: function (message)
                        {
                            callBackFunction.loginfalse(message);
                            //if (commonObj.need2BeInContainer)
                            //{
                            //    window.location.href = '../container/container.html?random=' + parseInt(10000 * Math.random()) + '&foreurl=../main/main.html&uid=' + userid;
                            //} else
                            //{
                            //    window.location.href = '../main/main.html?random=' + parseInt(10000 * Math.random()) + '&uid=' + userid;
                            //}
                        }
                    });

                    /*=======================在login页面就完成userInfCookie的初始化工作=======================*/
                  
                    
                },
                fail: function (message)
                {
                    callBackFunction.loginfalse(message);
                },
                error: function (message)
                {

                    callBackFunction.loginerror(message);
                }
            });
        },

        cookieUserInf: function (userid,logintype, callBackFunction)
        {
            setCookieMinutes("logintype", logintype, 1440);
           var dataJson = {
                userIdString: userid,
                uuid: ""
            };

            doAjaxFunction(_serviceLoginUrl, 'GetUserInf', dataJson, {
                success: function (message)
                {
                    var userInfJson = (new Function("", "return " + message))();

                    //判断超级登陆
                    if (logintype != null && logintype != "" && logintype == "1")
                    {
                        //============在此处获取当前的mac地址和IP地址================
                        doAjaxFunction(_serviceLoginUrl, 'GetClientInfo', {}, {
                            success: function (message1)
                            {
                                try
                                {
                                    var mm = (new Function("", "return " + message1))();
                                    userInfJson.mac = mm.mac;
                                    userInfJson.ip = mm.ip;
                                    setCookieMinutes("userInf", JSON.stringify(userInfJson), 1440);
                                    callBackFunction.success();
                                }
                                catch (ex)
                                {
                                    callBackFunction.fail('GetClientInfo执行失败-catch<br/>' + ex.message);
                                }
                            },
                            fail: function (message)
                            {
                                callBackFunction.fail('GetClientInfo执行失败-fail<br/>' + message);
                            },
                            error: function (message)
                            {
                                callBackFunction.fail('GetClientInfo执行失败-error<br/>' + message);
                            }
                        });
                    }
                    else
                    {
                        //判断数据库是否存在U盾信息
                        if (userInfJson.sys_value4 != null && userInfJson.sys_value4 != "" && userInfJson.sys_value5 != null && userInfJson.sys_value5 != "")
                        {
                            var ukeymessage = CheckUKey(userInfJson.sys_value4, userInfJson.sys_value5);

                            if (ukeymessage == 'true')
                            {
                                //============在此处获取当前的mac地址和IP地址================
                                doAjaxFunction(_serviceLoginUrl, 'GetClientInfo', {}, {
                                    success: function (message1)
                                    {
                                        try
                                        {
                                            var mm = (new Function("", "return " + message1))();
                                            userInfJson.mac = mm.mac;
                                            userInfJson.ip = mm.ip;

                                            setCookieMinutes("userInf", JSON.stringify(userInfJson), 1440);

                                            callBackFunction.success();
                                        }
                                        catch (ex)
                                        {
                                            callBackFunction.fail('GetClientInfo执行失败-catch<br/>' + ex.message);
                                        }
                                    },
                                    fail: function (message)
                                    {
                                        callBackFunction.fail('GetClientInfo执行失败-fail<br/>' + message);
                                    },
                                    error: function (message)
                                    {
                                        callBackFunction.fail('GetClientInfo执行失败-error<br/>' + message);
                                    }
                                });
                            } else
                            {
                                callBackFunction.fail('登录失败<br/>' + ukeymessage);
                            }
                        }
                        else
                        {
                            //============在此处获取当前的mac地址和IP地址================
                            doAjaxFunction(_serviceLoginUrl, 'GetClientInfo', {}, {
                                success: function (message1)
                                {
                                    try
                                    {
                                        var mm = (new Function("", "return " + message1))();
                                        userInfJson.mac = mm.mac;
                                        userInfJson.ip = mm.ip;
                                        setCookieMinutes("userInf", JSON.stringify(userInfJson), 1440);
                                        callBackFunction.success();
                                    }
                                    catch (ex)
                                    {
                                        callBackFunction.fail('GetClientInfo执行失败-catch<br/>' + ex.message);
                                    }
                                },
                                fail: function (message)
                                {
                                    callBackFunction.fail('GetClientInfo执行失败-fail<br/>' + message);
                                },
                                error: function (message)
                                {
                                    callBackFunction.fail('GetClientInfo执行失败-error<br/>' + message);
                                }
                            });
                        }
                    }


                },
                fail: function (message)
                {              
                    callBackFunction.fail('initUserInf执行失败-fail<br/>' + message);
                },
                error: function (message)
                {                    
                    callBackFunction.fail('initUserInf执行失败-error<br/>' + message);
                }
            });
        },
        /*==============自动登录功能==============*/
       
        autologin_requestparameter: function (callbackFunction)
        {
            _autologin_username = requestQuery("uname");
            _autologin_userpwd = requestQuery("upwd");

            if (_autologin_username != '' && _autologin_userpwd == '')
            {
                $('#txt_userloginname').val(_autologin_username);
                $('#txt_userpassword').focus();
                $('#txt_userpassword').addClass('txt-warning');
            }
            else if (_autologin_username == '' && _autologin_userpwd != '')
            {
                $('#txt_userpassword').val(_autologin_userpwd);
                $('#txt_userloginname').focus();
                $('#txt_userloginname').addClass('txt-warning');
            }
            else if (_autologin_username != '' && _autologin_userpwd != '')
            {
                //调用autologin效果
                _autologinmodel = 'requestparameter';
                $('#txt_userloginname').val(_autologin_username);
                $('#txt_userpassword').val(_autologin_userpwd);
                that.autologinstart();
            }
            else
            {
                callbackFunction.autologinfalse();
            }
        },
        autologin_cookie: function (callbackFunction)
        {
            var userloginname = getCookie('userloginname');
            if (userloginname !== null)
            {
                $('#txt_userloginname').val(userloginname);
                //调用autologin效果
                _autologinmodel = 'cookie';
                _autologin_username = userloginname;
                that.autologinstart();

            }
            else
            {
                callbackFunction.autologinfalse();
            }
        },
        autologin_mac: function (callbackFunction)
        {

            doAjaxFunction(_serviceLoginUrl, 'GetUserLoginNameByMac', {}, {
                success: function (message)
                {

                    _autologin_username = message;

                    $('#txt_userloginname').val(_autologin_username);
                    //调用autologin效果
                    _autologinmodel = 'mac';
                    that.autologinstart();


                },
                fail: function (message)
                {
                    callbackFunction.autologinfalse();
                },
                error: function (message)
                {
                    callbackFunction.autologinfalse();
                }
            });
        }

    };
    return that;
})();




$(document).ready(function ()
{
    //？？！！
    //setStylesheet('blue-theme');
    login_Obj.init();
});

