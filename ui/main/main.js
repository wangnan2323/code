



$(document).ready(function ()
{
    mainObject.initMain();
});


//===============================================================

var _blockMessage = null,
 _contentMessage = null,
 _alertMessage = null,
_pr_appcode = "54",
_clientInf = '{userid:"",appcode:"54",appname:"",userip:"",usermac:"",username:""}';

var mainObject = (function ()
{
    'use strict';

    var that = {


        _serviceUrl_main: '//127.0.0.1/sara.dd.ldsw/service/service_main.asmx/',
        _serviceUrl_tbl_maintable_detailall: '//127.0.0.1/sara.dd.ldsw/service/service_tbl_maintable_detailall.asmx/',

        _commonColorCssArray: ["color1", "color2", "color3", "color4", "color5", "color6", "color7", "color8", "color9", "color10"],
        _commonIconCssArray: ["icon-compass", "icon-trello", "icon-beer", "icon-bell", "icon-calendar-empty", "icon-dashboard", "icon-key", "icon-legal", "icon-group", "icon-crop"],


        /*
        用户自定义页面加载项
        _widgetConfigString:"workitem^comment^news^notebook^support"该属性与cookie内容同步(basePageObj.getUserCookie().widgetConfig)
        _widgetInitStatus:每个属性有三个状态：true；false；null；实现对每个layout元素加载情况的记录，true加载完成，false需要加载，但未加载完成；null;不需要加载；

        添加新的widget插件需要注意以下问题：
        1、插件分为2部分:SocialWidget和layoutWidget,分别是左侧的统计功能，和右侧的展现功能；
        2、添加新的插件涉及：
            a、widgetConfigString（cookie）
            b、_widgetInitStatus：添加属性
            c、allComplete方法，添加校验
            d、initMain方法，添加初始化代码
            e、checkWidgetConfig方法，添加初始化代码
            f、clickSocialWidgetItem方法，添加凸显代码
            g、basepage中getUserCookie方法添加userConfigJson属性的默认值
            

        */
        //页面加载项的配置参数，
        _widgetConfigString: '',


        _widgetInitStatus: {
            news: false,//true/false/null三个状态
            comment: false,
            notebook: false,
            support: false,
            workitem: false
        },
        


        //是否加载完成
        allComplete: function ()
        {
            if (that._widgetInitStatus.comment != false
                && that._widgetInitStatus.news != false
                && that._widgetInitStatus.notebook != false
                && that._widgetInitStatus.support != false
                // && that._widgetInitStatus.workitem != false//不用校验workitem,因为高度是固定的
                )
            {
                
             
                that.initSocialWidget();
                that.initLayOut();
                that.setSocialWidgetHeight(true);
            }
        },

        /*
        # =============================================================================
        #   main
        # =============================================================================
        */

        initMain: function ()
        {
            _contentMessage = new contentMessage();
            _alertMessage = new alertMessage();
            _blockMessage = new blockMessage();
            _blockMessage.show('程序加载中...', 'loading');

            that.setSocialWidgetHeight(false);

            basePageObj.initBasePage({
                success: function ()
                {
                    that.initParameter({
                        success: function ()
                        {
                            //2015-12-9修改程序，修改加载顺序，改回调顺序加载为异步加载
                            _blockMessage.hidden();
                            //用户信息
                            that.initUserInfo();


                            //待办工作
                            if (('^' + that._widgetConfigString + '^').indexOf('^workitem^') < 0)
                            {
                                that._widgetInitStatus.workitem = null;
                                that.allComplete();

                            }
                            else
                            {
                                that.initWorkitem({
                                    success: function ()
                                    {
                                        that._widgetInitStatus.workitem = true;

                                        //=================待办工作的统计数据
                                        that.setWorkitemWidgetCount();

                                        that.allComplete();
                                    }
                                });
                            }
                            //公告
                            if (('^' + that._widgetConfigString + '^').indexOf('^comment^') < 0)
                            {
                                that._widgetInitStatus.comment = null;
                                that.allComplete();
                            }
                            else
                            {
                                that.initComment({
                                    success: function ()
                                    {
                                        that._widgetInitStatus.comment = true;

                                        //=================公告的统计数据
                                        that.setCommentWidgetCount();

                                        that.allComplete();
                                    }
                                });
                            }
                            //大事记
                            if (('^' + that._widgetConfigString + '^').indexOf('^news^') < 0)
                            {
                                that._widgetInitStatus.news = null;
                                that.allComplete();
                            }
                            else
                            {
                                that.initNewsContent({
                                    success: function ()
                                    {
                                        that.onScrollNewsContent();
                                        that.spyScrollNewsContent();
                                        that._widgetInitStatus.news = true;

                                        //=================大事记的统计数据
                                        that.setNewsWidgetCount();

                                        that.allComplete();
                                    }
                                });
                            }
                            //记事本
                            if (('^' + that._widgetConfigString + '^').indexOf('^notebook^') < 0)
                            {
                                that._widgetInitStatus.notebook = null;
                                that.allComplete();
                            }
                            else
                            {
                                that.initNoteBook({
                                    success: function ()
                                    {
                                        that._widgetInitStatus.notebook = true;
                                        
                                        //==================记事本统计数据
                                        that.setNoteBookWidgetCount();

                                        that.allComplete();
                                    }
                                });
                            }
                            //帮助
                            if (('^' + that._widgetConfigString + '^').indexOf('^support^') < 0)
                            {
                                that._widgetInitStatus.support = null;
                                that.allComplete();
                            }
                            else
                            {
                                that.initSupport({
                                    success: function ()
                                    {
                                        that._widgetInitStatus.support = true;

                                        //==================帮助统计数据
                                        that.setSupportWidgetCount();

                                        that.allComplete();
                                    }
                                });
                            }
                        }
                    });
                },
                fail: function (message)
                {
                    _blockMessage.show(message, 'fail');
                }
            });
        },
        initParameter: function (callBackFunction)
        {
            _pr_appcode = requestQuery('appcode');
            that._pr_workitemsearchcontent = requestQuery('workitemsearchcontent');
            _clientInf = JSON.stringify({ userid: basePageObj._userInfoJson.sys_userid, appcode: _pr_appcode, appname: "", userip: basePageObj._userInfoJson.ip, usermac: basePageObj._userInfoJson.mac, username: basePageObj._userInfoJson.sys_username });

            if (that._pr_workitemsearchcontent !== undefined && that._pr_workitemsearchcontent != null)
            {
                $("#txt_workitemSearch_main").val(that._pr_workitemsearchcontent);
            }

            callBackFunction.success();
        },

        /*
        # =============================================================================
        #   UserInfo
        # =============================================================================
        */



        initUserInfo: function ()
        {
            var userImageString = '';

            if (basePageObj._userInfoJson.sys_photourl == '')
            {
                userImageString += '<img style="border-radius:50%;" class="img-usericon-main" src="//162.16.166.1/sara.resource.library/images/currentUser.png" />';
            }
            else
            {
                userImageString += '<img style="border-radius:50%;" class="img-usericon-main" src="//127.0.0.1/sara.dd.ldsw.file/files_auth/fileuploadpath/' + basePageObj._userInfoJson.sys_photourl + '" />';
            }
            //用户名
            $('#txt_username_main').html(' <i class="icon-signout i-logout" onclick="basePageObj.btn_logOut_onclick();" href="javascript:void(0);"></i>' + basePageObj._userInfoJson.sys_username + '/' + basePageObj._userInfoJson.sys_userloginname + userImageString);


            //机构信息
            $('#txt_userorgan_main').html(basePageObj._userInfoJson.sys_toporganname + '/' + basePageObj._userInfoJson.sys_organname);
            //岗位信息
            $('#txt_userposition_main').html(basePageObj._userInfoJson.sys_positionnames.replaceAll('^', '，'));
            //角色信息
            $('#txt_userrole_main').html(basePageObj._userInfoJson.sys_rolenames.replaceAll('^', '，'));

            //本机信息
            $('#txt_macip_main').html('mac地址:' + basePageObj._userInfoJson.mac + '<br/>ip地址:' + basePageObj._userInfoJson.ip);

            //根据用户Cookie信息，初始化页面
            var userCookie = basePageObj.getUserCookie();

            //theme
            var themeId = 'sp-' + userCookie.theme;
            $('#' + themeId).addClass('sp-themeSelected');


            //detailallmode

            $('.div-detailallmode').removeClass('active');
            $('#div_detailallmode' + userCookie.detailAllMode).addClass('active');

            //widgetconfig
            that._widgetConfigString = basePageObj.getUserCookie().widgetConfig;

            if (!that._widgetConfigString)
            {
                that._widgetConfigString = 'workitem^comment^notebook^news^support';
            }

            var widgetConfigArray = that._widgetConfigString.split('^');


            $.each(widgetConfigArray, function (i, u)
            {
                $('#div_widgetconfig_' + u).find('b').addClass('active');

                //设置socialwidget
                var socialwidget = $('#div_socialwidgetContent_main>.social-widget[socialwidgettype="' + u + '"]');
                socialwidget.removeClass('hidden');

                //设置layout
                var layouts = $('div[layoutwidgettype="' + u + '"]');
                layouts.removeClass('hidden');
            });


            



        },

        //用户选择皮肤
        clickUserInfoSelectTheme: function (el)
        {
            var spArray = $(el).parent().parent().children();
            $.each(spArray, function (i, u)
            {
                $(spArray[i]).removeClass('sp-themeSelected');
            });

            $(el).parent().addClass('sp-themeSelected');
        },

        //用户选择detailallmode
        setDetailAllMode: function (mode)
        {
            var m = basePageObj.getUserCookie().detailAllMode;
            //第一次加载时，有可能是undefind,所以设置默认值
            if (!m)
            {
                m = '2';
            }

            if (m != mode)
            {
                basePageObj.setUserCookie([{ "detailAllMode": mode }]);

                $('.div-detailallmode').removeClass('active');
                $('#div_detailallmode' + mode).addClass('active');
            }
        },

        //用户选择页面加载的插件
        checkWidgetConfig: function (name)
        {
            //workitem^comment^notebook^news^support           
            var $div_widgetconfig = $('#div_widgetconfig_' + name);
            if ($div_widgetconfig.hasClass('disabled'))
            {
                return;
            }
            var $b = $div_widgetconfig.find('b');

            if ($b.hasClass('active'))
            {
                //设置按钮样式
                $b.removeClass('active');

                //构造cookie
                that._widgetConfigString = ('^' + that._widgetConfigString + '^').replaceAll('^' + name + '^', '^');

              
                //设置socialwidget
                var socialwidget = $('#div_socialwidgetContent_main>.social-widget[socialwidgettype="' + name + '"]');
                socialwidget.addClass('hidden');
               
                //设置layout

                var layouts = $('div[layoutwidgettype="' + name + '"]');
                layouts.addClass('hidden');            

               
            }
            else
            {
                //设置按钮样式
                $b.addClass('active');

                //构造cookie
                that._widgetConfigString = that._widgetConfigString + '^' + name;
               
                //设置socialwidget
                var socialwidget = $('#div_socialwidgetContent_main>.social-widget[socialwidgettype="' + name + '"]');
                socialwidget.removeClass('hidden');

                //设置layoutwidget
                var layouts = $('div[layoutwidgettype="' + name + '"]');
                layouts.removeClass('hidden');
              

              
              
                //==================装载数据--如果需要的话
             
                switch (name)
                {
                    case "workitem":
                        {
                            if (that._widgetInitStatus.workitem === null)
                            {
                                that.initWorkitem({
                                    success: function ()
                                    {
                                        that._widgetInitStatus.workitem = true;
                                        that.setWorkitemWidgetCount();
                                    }
                                });
                            }
                        }
                        break;
                    case "comment":
                        {
                            if (that._widgetInitStatus.comment === null)
                            {
                                that.initComment({
                                    success: function ()
                                    {
                                        that._widgetInitStatus.comment = true;
                                        that.setCommentWidgetCount();                                      
                                    }
                                });                          
                            }
                        }
                        break;
                    case "news":
                        {
                          
                            if (that._widgetInitStatus.news === null)
                            {
                                that.initNewsContent({
                                    success: function ()
                                    {
                                        that._widgetInitStatus.news = true;
                                        that.setNewsWidgetCount();  
                                    }
                                });                           
                            }
                        }
                        break;
                    case "notebook":
                        {
                            
                            if (that._widgetInitStatus.notebook === null)
                            {
                                that.initNoteBook({
                                    success: function ()
                                    {
                                        that._widgetInitStatus.notebook = true;
                                        that.setNoteBookWidgetCount();
                                    }
                                });                          
                            }
                        }
                        break;
                    case "support":
                        {
                            if (that._widgetInitStatus.support === null)
                            {
                                that.initSupport({
                                    success: function ()
                                    {
                                        that._widgetInitStatus.support = true;
                                        that.setSupportWidgetCount();
                                    }
                                });
                            } 
                        }
                        break;
                  

                }
            }

            //设置SocialWidget的高度                
            that.setSocialWidgetHeight(true);

            //滚动到UserInf面板
            that.scrollToUserInf();

            //保存cookie
            that._widgetConfigString = that._widgetConfigString.replaceAll('^^', '^').trimStart('^').trimEnd('^');
            basePageObj.setUserCookie([{ "widgetConfig": that._widgetConfigString }]);

        },

        scrollToUserInf:function()
        {
            try
            {
                $(window).scrollTop(($('#div_userInfContentCol_main').offset().top - 200));
            }
            catch (ex)
            {
                $('html,body').animate({ scrollTop: ($('#div_userInfContentCol_main').offset().top - 200) }, 100);
            }
        },
      

        /*
        # =============================================================================
        #   WorkItem
        # =============================================================================
        */
        _ladda_btn_workitemsearch: null,

        _pr_workitemsearchcontent: '',
        _workitemJsonHashMap: null,

        _workitemDataStartIndex: 0,
        _workitemDataStep: 50,//_workitemDataStartIndex的步长，决定每次加载多少待办工作数据
        _isWorkitemMeunLoaded: false,//是否已经加载完成待办工作菜单
        _workitemResultJson: null,

        initWorkitem: function (callBackFunction)
        {
            
                that._ladda_btn_workitemsearch = Ladda.create('btn_workitemsearch_main');
                that._workitemJsonHashMap = null;
                that._workitemJsonHashMap = new hashMap();
                that.workitemDoAjax(that._workitemDataStep, {
                    success: function (resultJson)
                    {
                        var placeHolderString = '';

                        placeHolderString += '';

                        $.each(resultJson.customColumnJsonArray, function (i, u)
                        {
                            placeHolderString += '、' + resultJson.customColumnJsonArray[i].columnText;
                        });

                        $('#txt_workitemSearch_main').attr('placeholder', placeHolderString);

                        //创建表格框架
                        that.workitemCreatMenuContentString(resultJson.menuJsonArray);

                        //创建表格内容
                        that.workitemCreatCardString(resultJson.customColumnJsonArray, resultJson.contentJsonArray, resultJson.contentCount);

                        that._workitemResultJson = resultJson;
                        callBackFunction.success();
                    }
                });

           
        },
        workitemCreatMenuContentString: function (menuJsonArray)
        {
            var menuString = '';
            var contentString = '';

            $.each(menuJsonArray, function (i, u)
            {

                var num = (i % that._commonColorCssArray.length);
                var colorClassString = that._commonColorCssArray[num];
                var iconClassString = that._commonIconCssArray[num];

                var projectclassid = menuJsonArray[i].projectclassid;
                var projectclassid_name = menuJsonArray[i].projectclassid_name;
                var count = menuJsonArray[i].count;
                var childrenArray = menuJsonArray[i].children;

                //menuString += '<li>';
                //menuString += '<a href="#a_' + projectclassid + '" ><i class="' + iconClassString + '"></i>&nbsp;&nbsp;' + projectclassid_name + '&nbsp;&nbsp;<span class="badge" >' + count + '</span></a>';
                //menuString += '<ul class="nav">';
                if (that._isWorkitemMeunLoaded == false)
                {

                    //2015-12-3修改，如果count为零，则将按钮置成灰的，并且禁止点击（在13上测试，设置了disabled还是能点击，所以直接去掉了onclick）
                    if (count == "0" || count == 0)
                    {
                        menuString += '<a class="btnC btn-circle btn-' + colorClassString + ' unchecked"  disabled="disabled"  projectclassid="' + projectclassid + '" >';
                    } else
                    {
                        menuString += '<a class="btnC btn-circle btn-' + colorClassString + '" onclick="mainObject.clickWorkitemMenu(this);" projectclassid="' + projectclassid + '" >';
                        //menuString += '<a class="btnC btn-circle btn-' + colorClassString + '" projectclassid="' + projectclassid + '" onclick="mainObject.clickWorkitemMenu(this);">';
                    }


                    menuString += '<i class="' + iconClassString + '"></i>' + projectclassid_name;
                    menuString += '<b class="badge bg-' + colorClassString + '">' + count + '</b>';
                    menuString += '</a>';
                }

                contentString += '<div>';
                contentString += '<h2 class="h2-title-main" id="h2_' + projectclassid + '" style="display:none;">';
                contentString += '<table  class="table table-filters">';
                contentString += '<tbody>';
                contentString += '<tr>';
                contentString += '<td class="filter-category ' + colorClassString + ' td-width60-main">';
                contentString += '<div class="arrow-left"></div>';
                contentString += '<i class="' + iconClassString + '"></i>';
                contentString += '</td>';
                contentString += '<td class="td-left-main">';
                contentString += '<a id="a_' + projectclassid + '">';
                contentString += projectclassid_name;
                contentString += '</a>';
                contentString += '</td>';
                contentString += '</tr>';
                contentString += '</tbody>';
                contentString += '</table>';
                contentString += '</h2>';

                if (childrenArray != null)
                {
                    $.each(childrenArray, function (ii, uu)
                    {
                        var projectclassdtl2 = childrenArray[ii].projectclassdtl2;
                        var projectclassdtl2_name = childrenArray[ii].projectclassdtl2_name;
                        var childrencount = childrenArray[ii].count;

                        //menuString += '<li><a href="#div_' + projectclassid + '_' + projectclassdtl2 + '">' + projectclassdtl2_name + '<span class="badge">' + childrencount + '</span></a></li>';

                        contentString += '<div id="a_' + projectclassid + '_' + projectclassdtl2 + '" style="display:none;text-align:right;"  class="h3-title-main">' + projectclassdtl2_name + '</div>';
                        contentString += '<div id="div_' + projectclassid + '_' + projectclassdtl2 + '" style="display:none;" class="div-content-main"><img class="imgloading-main" src="../../images/loading.gif" /></div>';

                    });
                }
                //menuString += '</ul>';
                //menuString += '</li>';



                contentString += '</div>';


            });
            //是否已经完成第一次装载数据
            if (that._isWorkitemMeunLoaded == false)
            {
                $('#div_workitemMenu_main').html(menuString);
                that._isWorkitemMeunLoaded = true;
            }
            //$('#ul_workitemmenu_main').html(menuString);

            $('#div_workitemContent_main').html(contentString);

        },
        workitemCreatCardString: function (customColumnJsonArray, contentJsonArray, contentCount)
        {
            $.each(contentJsonArray, function (ii, uu)
            {
                if (contentJsonArray[ii]['tbl_maintable_sys_id'] == '-1')
                {
                    return true;
                }

                that._workitemJsonHashMap.put(contentJsonArray[ii]['tbl_maintable_sys_id'], contentJsonArray[ii]);
                var divString = '';

                if ((that._workitemDataStartIndex % 2) > 0)
                {
                    if (contentJsonArray[ii]['lzlx'].indexOf('-') > -1)
                    {
                        divString += '<div class="well0-main bak-main">';
                    }
                    else
                    {
                        divString += '<div class="well0-main">';
                    }
                }
                else
                {
                    if (contentJsonArray[ii]['lzlx'].indexOf('-') > -1)
                    {
                        divString += '<div class="well1-main bak-main">';
                    }
                    else
                    {
                        divString += '<div class="well1-main">';
                    }
                }
                that._workitemDataStartIndex++;

                divString += '<div class="row div-workitem-item-title" style="margin: 0px 0px 0px !important;">';
                divString += '<div class="col-xs-6">';
                divString += '<h3 class="h3-content-main">';
                if (contentJsonArray[ii]['sys_first'] == '0')
                {
                    divString += '<strong><a class="hand" onclick="mainObject.clickWorkitemTransPage(\'' + contentJsonArray[ii]['tbl_maintable_sys_id'] + '\');">' + contentJsonArray[ii]['xmmc'] + '</a></strong>';
                }
                else
                {
                    divString += '<a class="hand" onclick="mainObject.clickWorkitemTransPage(\'' + contentJsonArray[ii]['tbl_maintable_sys_id'] + '\');">' + contentJsonArray[ii]['xmmc'] + '</a>';
                }
                divString += '/';
                divString += '<small>' + contentJsonArray[ii]['receivetime'] + '</small>';



                divString += '</h3>';
                divString += '</div>';
                divString += '<div  class="col-xs-6 div-right-main">';

                divString += that.workitemGetButtonString(contentJsonArray, ii);

                divString += '</div>';
                divString += '</div>';

                divString += '<blockquote  class="blockquote-main">';

                divString += '<div class="row">';
                $.each(customColumnJsonArray, function (iii, uuu)
                {
                    divString += '<div class="col-md-3">';
                    divString += '<p class="fontsize-small-main">';
                    divString += '<strong>' + customColumnJsonArray[iii].columnText + '：</strong>';
                    if (contentJsonArray[ii][customColumnJsonArray[iii].columnField] != undefined && contentJsonArray[ii][customColumnJsonArray[iii].columnField] != '')
                    {
                        divString += '' + contentJsonArray[ii][customColumnJsonArray[iii].columnField] + '';
                    }
                    divString += '</p>';

                    divString += '</div>';

                });
                if (customColumnJsonArray.length % 2 == 1)
                {
                    divString += '<div class="col-md-3">';
                    divString += '<p class="fontsize-small-main">';
                    divString += '<strong>&nbsp;&nbsp;</strong>';
                    divString += '</p>';
                    divString += '</div>';
                }
                //=============业务状态
                divString += '<div class="col-md-3">';
                divString += '<p class="fontsize-small-main">';
                divString += '<strong>业务状态：</strong>';

                if (contentJsonArray[ii]['lzlx'].indexOf('-') > -1)
                {
                    divString += '<code>' + contentJsonArray[ii]['projectclassdtl1_name'] + '</code>';
                }
                else
                {
                    divString += '' + contentJsonArray[ii]['projectclassdtl1_name'] + '';
                }
                divString += '</p>';
                divString += '</div>';

                //=============流转类型
                divString += '<div class="col-md-3">';
                divString += '<p class="fontsize-small-main">';
                divString += '<strong>流转类型：</strong>';
                if (contentJsonArray[ii]['lzlx'].indexOf('-') > -1)
                {
                    divString += '<code>' + contentJsonArray[ii]['lzlx'].replaceAll('-', '') + '</code>';
                }
                else
                {
                    divString += '' + contentJsonArray[ii]['lzlx'] + '';
                }
                divString += '</p>';
                divString += '</div>';
                //===============数据状态
                divString += '<div class="col-md-3">';
                divString += '<p class="fontsize-small-main">';
                divString += '<strong>数据状态：</strong>';
                divString += '' + contentJsonArray[ii]['projectclassdtl2_name'] + '';
                divString += '</p>';
                divString += '</div>';

                divString += '</div>';

                divString += '</blockquote>';
                divString += '</div>';

                $('#div_' + contentJsonArray[ii]['projectclassid'] + '_' + contentJsonArray[ii]['projectclassdtl2'] + ' .imgloading-main').remove();

                $('#div_' + contentJsonArray[ii]['projectclassid'] + '_' + contentJsonArray[ii]['projectclassdtl2']).append(divString);

                $('#div_' + contentJsonArray[ii]['projectclassid'] + '_' + contentJsonArray[ii]['projectclassdtl2']).css('display', '');
                $('#a_' + contentJsonArray[ii]['projectclassid'] + '_' + contentJsonArray[ii]['projectclassdtl2']).css('display', '');
                $('#h2_' + contentJsonArray[ii]['projectclassid']).css('display', '');



            });

            //全部加载按钮
            if (contentJsonArray.length < contentCount)
            {
                var loadMoreString = '<div id="btn_workitemloadmore_main" onclick="mainObject.clickWorkitemLoadMore();" class="btn btn-lg btn-default-outline btn-block">加载全部待办工作共' + contentCount + '条</div>';
                //$('#div_' + contentJsonArray[ii]['projectclassid'] + '_' + contentJsonArray[ii]['projectclassdtl2']).append(loadMoreString);
                $('#div_workitemLoadAll_main').html(loadMoreString);

                //_isWorkitemOnScrollSpy_main = true;
            }
        },
        workitemDoAjax: function (workitemDataStep, callBackFunction)
        {
            var parameterJson = {
                sysUserIdString: basePageObj._userInfoJson.sys_userid,
                searchTextString: $('#txt_workitemSearch_main').val(),
                stratIndexString: that._workitemDataStartIndex,
                userInfoJsonString: basePageObj._userInfoJson
            };

            if (workitemDataStep == '-1')
            {
                parameterJson.endIndexString = "-1";
            }
            else
            {
                parameterJson.endIndexString = (that._workitemDataStartIndex + workitemDataStep);
            }

            var data = {
                parameterJsonString: JSON.stringify(parameterJson),
                clientInf: _clientInf
            };

            doAjaxFunction(that._serviceUrl_main, 'GetWorkItem', data, {
                success: function (message)
                {

                    var resultJson = (new Function("", "return " + message))();

                    resultJson.menuJsonArray = resultJson.menuJsonArray.toString().toJson();

                    if (resultJson.menuJsonArray == null)
                    {
                        resultJson.menuJsonArray = [];
                    }

                    $.each(resultJson.menuJsonArray, function (i, u)
                    {
                        resultJson.menuJsonArray[i].children = resultJson.menuJsonArray[i].children.toString().toJson();
                    });

                    resultJson.contentJsonArray = resultJson.contentJsonArray.toString().toJson();
                    if (resultJson.contentJsonArray == null)
                    {
                        resultJson.contentJsonArray = [];
                    }
                    resultJson.customColumnJsonArray = resultJson.customColumnJsonArray.toString().toJson();
                    if (resultJson.customColumnJsonArray == null)
                    {
                        resultJson.customColumnJsonArray = [];
                    }
                    callBackFunction.success(resultJson);

                },
                fail: function (message)
                {
                    _blockMessage.show(that._serviceUrl_main + 'GetWorkItem<br/>' + message, 'fail');
                },
                error: function (message)
                {
                    _blockMessage.show(that._serviceUrl_main + 'GetWorkItem<br/>' + message, 'fail');
                }
            });
        },
        workitemGetButtonString: function (jsonArray, ii)
        {
            var divString = '';
            divString += '<a class="a-size-large-main hand" onclick="mainObject.clickWorkitemTransPage(\'' + jsonArray[ii]['tbl_maintable_sys_id'] + '\');" title="操作">';
            divString += '<i class="glyphicon glyphicon-edit"></i>';
            divString += '</a>';
            divString += '&nbsp;&nbsp;&nbsp;&nbsp;';
            divString += '<a class="a-size-large-main hand" onclick="mainObject.clickWorkitemViewLog(\'' + jsonArray[ii]['tbl_maintable_sys_id'] + '\');" title="审核意见">';
            divString += '<i class="glyphicon glyphicon-list-alt"></i>';
            divString += '</a>';
            //divString += '&nbsp;&nbsp;&nbsp;&nbsp;';

            //divString += '<a class="a-size-large-main hand" onclick="mainObject.clickWorkitemViewMap(\'' + jsonArray[ii]['shpid'] + '\');" title="看图">';
            //divString += '<i class="glyphicon glyphicon-globe"></i>';
            //divString += '</a>';

            return divString;
        },
        clickWorkitemViewMap: function (shpid)
        {

        },
        clickWorkitemViewLog: function (tbl_maintable_sys_id)
        {

            var url = '../t_projstate_log/t_projstate_log_timeline.html';
            url += '?uid=' + basePageObj._userInfoJson.sys_userid;
            url += '&fk_tbl_maintable_sys_id=' + tbl_maintable_sys_id;
            url += '&listtype=2';
            url += '&random=' + parseInt(10000 * Math.random());
            window.open(url);
        },
        clickWorkitemTransPage: function (tbl_maintable_sys_id)
        {
            var json = that._workitemJsonHashMap.get(tbl_maintable_sys_id);


            var url = '';

            url += json.appurl;
            var argumentsArray = json.appparameter.split('^');
            $.each(argumentsArray, function (iii, uuu)
            {
                if (iii == 0)
                {
                    url += '?';
                }
                else
                {
                    url += '&';
                }
                var cc = argumentsArray[iii].replaceAll('[tbl_maintable_sys_id]', tbl_maintable_sys_id);
                cc = cc.replaceAll('[userid]', basePageObj._userInfoJson.sys_userid);
                cc = cc.replaceAll('[projectclassid]', json.projectclassid);
                cc = cc.replaceAll('[projectclassdtl1]', json.projectclassdtl1);
                cc = cc.replaceAll('[projectclassdtl2]', json.projectclassdtl2);
                cc = cc.replaceAll('[pagetype]', '1');
                cc = cc.replaceAll('[appcode]', _pr_appcode);
                url += cc;
            });

            url += '&fromurl=../main/main.html';
            url += '&fromurlparam={';
            url += '"workitemsearchcontent":"' + $('#txt_workitemSearch_main').val() + '"'
            url += '}';


            var parameterJson = {
                mainTableSysidString: tbl_maintable_sys_id
            };

            var data = {
                parameterJsonString: JSON.stringify(parameterJson),
                clientInf: _clientInf
            };


            doAjaxFunction(that._serviceUrl_tbl_maintable_detailall, 'UpDataSysFirst', data, {
                success: function (result)
                {
                    //window.location.href = url + '&random=' + parseInt(10000 * Math.random());

                    commonObj.changeUrl(url, "right-show");
                },
                fail: function (message)
                {
                    _alertMessage.show('操作失败<br/>' + message, 'fail');
                },
                error: function (error)
                {
                    _alertMessage.show('操作失败<br/>' + error.message, 'fail');
                }
            });

        },
        clickWorkitemLoadMore: function ()
        {

            $("#btn_workitemloadmore_main").attr('disabled', 'disabled');
            $("#btn_workitemloadmore_main").text('数据装载中...')
            that.workitemDoAjax('-1', {
                success: function (resultJson)
                {
                    setTimeout(function ()
                    {
                        //创建表格内容
                        that.workitemCreatCardString(resultJson.customColumnJsonArray, resultJson.contentJsonArray, resultJson.contentCount);

                        that._workitemResultJson = resultJson;
                        $("#btn_workitemloadmore_main").remove();

                    }, 100);

                }
            });
        },
        btn_workitemsearch_main_onclick: function ()
        {
            that._ladda_btn_workitemsearch.start();
            that._workitemDataStartIndex = 0;
            if ($("#btn_workitemloadmore_main"))
            {
                $("#btn_workitemloadmore_main").remove();
            }

            that._workitemJsonHashMap = null;
            that._workitemJsonHashMap = new hashMap();
            that.workitemDoAjax(that._workitemDataStep, {
                success: function (resultJson)
                {
                    $('#div_workitemContent_main').html('');
                    //创建表格框架
                    that.workitemCreatMenuContentString(resultJson.menuJsonArray);
                    //创建表格内容
                    that.workitemCreatCardString(resultJson.customColumnJsonArray, resultJson.contentJsonArray, resultJson.contentCount);

                    $('.btnC.btn-circle').removeClass('unchecked');
                    that._ladda_btn_workitemsearch.stop();
                }
            });

        },
        clickWorkitemMenu: function (eve)
        {
            //var btnArray = $(eve).parent().children();
            
            var btnArray = $.grep($(eve).parent().children(), function (a)
            {
                if ($(a).find("b").text() == "0") { return false; }
                return true;
            });
            var projectclassid = $(eve).attr('projectclassid');

            //如果当前节点没有被中选中
            if ($(eve).hasClass('unchecked'))
            {
                $(eve).removeClass('unchecked');
                $('#h2_' + projectclassid).parent().removeClass('hidden');
            }
            else
            {
                //var unchecklength = $('.btnC.btn-circle.unchecked').length;
                var unchecklength = $.grep($('.btnC.btn-circle.unchecked'), function (a)
                {
                    if ($(a).find("b").text() == "0") { return false; }
                    return true;
                }).length;

                //当前选中，全部都选中
                if (unchecklength == 0)
                {
                    $.each(btnArray, function (i, u)
                    {
                        var currentProjectClassid = $(btnArray[i]).attr('projectclassid');
                        if (currentProjectClassid != projectclassid)
                        {
                            $(btnArray[i]).addClass('unchecked');
                            $('#h2_' + currentProjectClassid).parent().addClass('hidden');
                        }
                    });
                }
                    //当前被选中，其他都没被选中
                else if (btnArray.length - 1 == unchecklength)
                {
                    $.each(btnArray, function (i, u)
                    {
                        var currentProjectClassid = $(btnArray[i]).attr('projectclassid');
                        if (currentProjectClassid != projectclassid)
                        {
                            $(btnArray[i]).removeClass('unchecked');
                            $('#h2_' + currentProjectClassid).parent().removeClass('hidden');
                        }
                    });
                }
                else
                {
                    $(eve).addClass('unchecked');

                    $('#h2_' + projectclassid).parent().addClass('hidden');
                }
            }
        },
        setWorkitemWidgetCount: function ()
        {
            if (that._workitemResultJson.contentCount == '0')
            {
                $('#b_workitemCount').addClass('bg-colorGray');
                $('#b_workitemCount').removeClass('bg-colorRed');
            }
            else
            {
                $('#b_workitemCount').removeClass('bg-colorGray');
                $('#b_workitemCount').addClass('bg-colorRed');
            }
            $('#b_workitemCount').html(that._workitemResultJson.contentCount);
        },

        /*
        # =============================================================================
        #   装载公告
        # =============================================================================
        */
        _commentContentJson: null,

        initComment: function (callBackFunction)
        {
           

                var parameterJson = {
                    appcodeIdString: _pr_appcode,
                    sysUserIdString: basePageObj._userInfoJson.sys_userid,
                    userInfoJsonString: basePageObj._userInfoJson
                };

                var data = {
                    parameterJsonString: JSON.stringify(parameterJson),
                    clientInf: _clientInf
                };

                doAjaxFunction(that._serviceUrl_main, 'GetComment', data, {
                    success: function (message)
                    {
                        that._commentContentJson = (new Function("", "return " + message))();

                        //显示数据
                        that.renderComment();

                        //此处要重新刷新公告的显示数据
                        that.setCommentWidgetCount();

                        callBackFunction.success();
                    },
                    fail: function (message)
                    {
                        _blockMessage.show(that._serviceUrl_main + 'GetComment<br/>' + message, 'fail');
                    },
                    error: function (message)
                    {
                        _blockMessage.show(that._serviceUrl_main + 'GetComment<br/>' + message, 'fail');
                    }
                });
        },
        renderComment: function ()
        {
            var resultString = '';

            var readedCommentIds = basePageObj.getUserCookie().readedCommentIds;

            if (!readedCommentIds)
            {
                readedCommentIds = '';
            }
            var unreaderCommentIds = '';
            $.each(that._commentContentJson.rows, function (i, u)
            {

                if (("^" + readedCommentIds + "^").indexOf("^" + _pr_appcode + '_' + u["sys_id"] + "^") > -1)
                {
                    //已读
                    resultString += '<li>';
                    resultString += '    <img width="30" height="30" src="//162.16.166.1/sara.resource.library/images/adminUser.png" />';
                    resultString += '    <div class="bubble">';
                    resultString += '        <a class="user-name" onclick="mainObject.clickCommentTitle(this);">【+】' + u["f_title"] + '</a>';
                    resultString += '        <div class="message hidden">';
                    resultString += u["f_content_dtl"] + '<br/>';


                    if ( u["f_filerealname"] != "" )
                    {
                        var realnameArray = u["f_filerealname"].split( ',' );
                        var uploadnameArray = u["f_fileuploadname"].split( ',' );

                        if ( realnameArray.length > 0 )
                        {
                            resultString += '<strong>相关附件：</strong><br>';
                            $.each( realnameArray, function ( ii, uu )
                            {
                                resultString += '<a href="' + html5fileuploader_DefaultOps.fileUploadRootPath + 'fileuploadpath/' + uploadnameArray[ii] + '" target="_blank">' + realnameArray[ii] + '</a><br>';
                            } );
                        }
                    }

                    resultString += '        </div>';
                    resultString += '        <p class="time hidden">';
                    resultString += '            <strong>' + u['sys_creatusername'] + '</strong>&nbsp;&nbsp;&nbsp;&nbsp;' + u['f_act_startdate'].toDateTime().Format( "yyyy-MM-dd" ) + '&nbsp;&nbsp;&nbsp;&nbsp;';
                    resultString += '        </p>';
                    resultString += '    </div>';
                    resultString += '</li>';
                }
                else
                {
                    //未读
                    unreaderCommentIds += u["sys_id"] + '^';

                    resultString += '<li class="current-user">';
                    resultString += '    <img width="30" height="30" src="//162.16.166.1/sara.resource.library/images/adminUser1.png"   />';
                    resultString += '    <div class="bubble"  title="点击标记已读" commentid=' + u["sys_id"] + ' onclick="mainObject.clickCommentItem(this);">';
                    resultString += '        <a class="user-name">' + u["f_title"] + '</a>';
                    resultString += '        <div class="message">';
                    resultString += u["f_content_dtl"] + '<br/>';
                    if ( u["f_filerealname"] != "" )
                    {
                        var realnameArray = u["f_filerealname"].split( ',' );
                        var uploadnameArray = u["f_fileuploadname"].split( ',' );

                        if ( realnameArray.length > 0 )
                        {
                            resultString += '<strong>相关附件：</strong><br>';
                            $.each( realnameArray, function ( ii, uu )
                            {
                                resultString += '<a href="' + html5fileuploader_DefaultOps.fileUploadRootPath + 'fileuploadpath/' + uploadnameArray[ii] + '" target="_blank">' + realnameArray[ii] + '</a><br>';
                            } );
                        }
                    }
                    resultString += '        </div>';
                    resultString += '        <p class="time">'; 
                    resultString += '            <strong>' + u['sys_creatusername'] + '</strong>&nbsp;&nbsp;&nbsp;&nbsp;' + u['f_act_startdate'].toDateTime().Format( "yyyy-MM-dd" ) + '&nbsp;&nbsp;&nbsp;&nbsp;';
                    resultString += '        </p>';
                    resultString += '    </div>';
                    resultString += '</li>';

                }
            });
            $('#ul_commentContainer_main').html(resultString);

            if (unreaderCommentIds == '')
            {
                //计算未读的公告
                that._commentContentJson.unReadedCount = 0;
            }
            else
            {
                //计算未读的公告
                that._commentContentJson.unReadedCount = unreaderCommentIds.trimEnd('^').split('^').length;
            }

        },
        //标记为已读
        clickCommentItem: function (eve)
        {
            var readedCommentIds = basePageObj.getUserCookie().readedCommentIds;
            if (!readedCommentIds)
            {
                readedCommentIds = '';
            }
            var currentCommentId = $(eve).attr('commentid');
            if (("^" + readedCommentIds + "^").indexOf("^" + _pr_appcode + '_' + currentCommentId + "^") > -1)
            {

            }
            else
            {
                readedCommentIds += '^' + _pr_appcode + '_' + currentCommentId;
            }

            basePageObj.setUserCookie([{ "readedCommentIds": readedCommentIds.trimStart('^') }]);


            //显示数据
            that.renderComment();

            //此处要重新刷新公告的显示数据
            that.setCommentWidgetCount();
            //刷新高度
            that.setSocialWidgetHeight(true);
        },
        clickCommentTitle: function (eve)
        {

            var message = $(eve).parent().children('.message');
            var time = $(eve).parent().children('.time');
            if (message.hasClass('hidden'))
            {
                message.removeClass('hidden');
                time.removeClass('hidden');
                $(eve).html($(eve).html().replaceAll('【+】', '【-】'));
            }
            else
            {
                message.addClass('hidden');
                time.addClass('hidden');
                $(eve).html($(eve).html().replaceAll('【-】', '【+】'));
            }

            //刷新高度
            that.setSocialWidgetHeight(true);
        },
        setCommentWidgetCount: function ()
        {
            if (that._commentContentJson.unReadedCount != '0')//存在未读公告
            {
                $('#b_commentCount').removeClass('bg-colorGray');
                $('#b_commentCount').addClass('bg-colorRed');
                $('#b_commentCount').html(that._commentContentJson.unReadedCount + '/' + that._commentContentJson.total);

                $('#b_commentCount').parent().parent().parent().parent().parent().removeClass('unchecked');
                $('#div_comment_main').removeClass('hidden');

                //添加动画
                $('.icon-volume-up').addClass('tada');
            }
            else
            {
                $('#b_commentCount').addClass('bg-colorGray');
                $('#b_commentCount').removeClass('bg-colorRed');
                $('#b_commentCount').html(that._commentContentJson.total);

                $('#b_commentCount').parent().parent().parent().parent().parent().addClass('unchecked');
                $('#div_comment_main').addClass('hidden');

                //删除动画
                $('.icon-volume-up').removeClass('tada');
            }


        },

        /*
        # =============================================================================
        #   News
        # =============================================================================
        */

        _lastscrollTop_newsContent: 0,
        _newsContentJson: null,
        _newsPageIndexString: 1,
        _newsPageSizeString: 10,

        initNewsContent: function (callBackFunction)
        {
            
                var parameterJson = {
                    appcodeIdString: _pr_appcode,
                    pageIndexString: that._newsPageIndexString,
                    pageSizeString: that._newsPageSizeString,
                    sysUserIdString: basePageObj._userInfoJson.sys_userid,
                    userInfoJsonString: basePageObj._userInfoJson
                };
                var data = {
                    parameterJsonString: JSON.stringify(parameterJson),
                    clientInf: _clientInf
                };

                doAjaxFunction(that._serviceUrl_main, 'GetNews', data, {
                    success: function (message)
                    {
                        that._newsContentJson = (new Function("", "return " + message))();
                        var resultString = '';
                        $.each(that._newsContentJson.rows, function (i, u)
                        {
                            var num = (i % that._commonColorCssArray.length);
                            var colorClassString = that._commonColorCssArray[num];
                            var iconClassString = that._commonIconCssArray[num];
                            //f_content_dtl,f_date,f_file,f_czr,f_title,f_bm,f_appcode


                            resultString += '<li class="unactive">';
                            resultString += '    <div class="timeline-time">';
                            resultString += '' + u['f_title'] + '<strong>' + u['f_date'].toDateTime().Format( "yyyy-MM-dd" ) + '</strong>';
                            resultString += '    </div>';
                            resultString += '    <div class="timeline-icon">';
                            resultString += '        <div class="timeline-icon-' + colorClassString + '">';
                            resultString += '            <i class="' + iconClassString + '"></i>';
                            resultString += '        </div>';
                            resultString += '    </div>';
                            resultString += '    <div class="timeline-content"  style="padding:10px !important;">';
                            resultString += '        <a style="font-size:14px;">' + u['f_title'] + '</a>';
                            resultString += '        <div>';
                            resultString += u['f_content_dtl'] + '<br/>';                         
                            resultString += '<strong>操作人：</strong>' + u['f_czr'] + '<br/>';
                            resultString += '        </div>';
                            resultString += '    </div>';
                            resultString += '</li>';

                        });

                        $('#ul_news').append(resultString);

                        if (that._newsPageIndexString * that._newsPageSizeString >= that._newsContentJson.total)
                        {
                            $("#btn_newsloadmore_main").addClass('hidden');
                        }
                        else
                        {
                            $("#btn_newsloadmore_main").removeClass('hidden');
                        }

                        callBackFunction.success();
                    },
                    fail: function (message)
                    {
                        _blockMessage.show(that._serviceUrl_main + 'GetNews<br/>' + message, 'fail');
                    },
                    error: function (message)
                    {
                        _blockMessage.show(that._serviceUrl_main + 'GetNews<br/>' + message, 'fail');
                    }
                });


        },
        spyScrollNewsContent: function ()
        {
            $('#div_newsContent_main').scroll(function ()
            {
                var top = $('#div_newsContent_main').scrollTop();
                if (top - that._lastscrollTop_newsContent > 50)
                {
                    that._lastscrollTop_newsContent = top;
                    return that.onScrollNewsContent();
                }
            });
        },
        onScrollNewsContent: function ()
        {
            return $(".timeline.animated li.unactive").each(function (i)
            {
                var bottom_of_object, bottom_of_window;
                bottom_of_object = $(this).position().top + $(this).outerHeight() - 100;
                bottom_of_window = $('#div_newsContent_main').scrollTop() + $('#div_newsContent_main').height();
                if (bottom_of_window > bottom_of_object)
                {
                    $(this).removeClass('unactive');
                    return $(this).addClass("active");
                }
            });
        },
        setNewsWidgetCount: function ()
        {

            $('#b_newsCount').html(that._newsContentJson.total);
        },
        clickNewsLoadMore: function ()
        {
            that._newsPageIndexString = that._newsPageIndexString + 1;
            $("#btn_newsloadmore_main").attr('disabled', 'disabled');
            $("#btn_newsloadmore_main").text('数据装载中...')
            that.initNewsContent({
                success: function ()
                {
                    if (that._newsPageIndexString * that._newsPageSizeString >= that._newsContentJson.total)
                    {
                        $("#btn_newsloadmore_main").addClass('hidden');
                    }
                    else
                    {
                        $("#btn_newsloadmore_main").removeClass('hidden');

                        $("#btn_newsloadmore_main").removeAttr('disabled');
                        $("#btn_newsloadmore_main").text('继续加载');

                    }
                }
            });
        },

        /*
        # =============================================================================
        #   notebook
        # =============================================================================
        */

        _isFirstLoadData: true,
        _noteBookContentJson: null,
        initNoteBook: function (callBackFunction)
        {
            

                $("#div_notebook").fullCalendar({
                    header: { left: "prev,next", center: "title", right: "month,agendaWeek,agendaDay" }
                , editable: false
                , droppable: false
                , monthNames: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"]
                , monthNamesShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"]
                , dayNames: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"]
                , dayNamesShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"]
                , today: ["今天"]
                , buttonText: { today: '今日', month: '月', week: '周', day: '日', prev: '<', next: '>' }
                , contentHeight: 400//高度
                , firstDay: 0//每周的第一天
                , aspectRatio: 1//设置日历单元格宽度与高度的比例。        
                , dayClick: function (date, allDay, jsEvent, view)
                {
                    // alert(date.getFullYear() + '-' + (Number(date.getMonth()) + 1) + '-' + date.getDate());
                }
                , eventClick: function (event, jsEvent, view)
                {

                    var contentString = '<h3>' + event.content.header + '<small>' + '</small></h3>';
                    
                    contentString += '<strong>描述：</strong>';
                    contentString += event.content.content + '<br/>';
                    contentString += '<br/>';                   
                   
                    if ( event.content.filerealname != "" )
                    {
                        var realnameArray = event.content.filerealname.split( ',' );
                        var uploadnameArray = event.content.fileuploadname.split( ',' );

                        if ( realnameArray.length > 0 )
                        {
                            contentString += '<strong>相关附件：</strong><br>';
                            $.each( realnameArray, function ( ii, uu )
                            {
                                contentString += '<a href="' + html5fileuploader_DefaultOps.fileUploadRootPath + 'fileuploadpath/' + uploadnameArray[ii] + '" target="_blank">' + realnameArray[ii] + '</a><br>';
                            } );
                        }
                    }
                    contentString += '<strong>开始时间：</strong>' + event.content.start.toDateTime().Format( "yyyy-MM-dd" ) + '&nbsp;&nbsp;&nbsp;&nbsp;';
                    contentString += '<strong>结束时间：</strong>' + event.content.end.toDateTime().Format( "yyyy-MM-dd" ) + '<br/>';
                    contentString += '<strong>发起人：</strong>' + event.content.czr+'<br/>';
                    contentString += '<strong>范围：</strong>' + event.content.group;
                    

                    _contentMessage.show(event.title, contentString);


                }
                , viewDisplay: function (view)
                {
                    if (!that._isFirstLoadData)
                    {
                        //  alert(view.visStart.Format('yyyy-MM-dd') + '----' + view.visEnd.Format('yyyy-MM-dd'));               
                        that.bindNoteBook(view.visStart, view.visEnd);
                    }

                }
                });
                that._isFirstLoadData = false;
                var view = $("#div_notebook").fullCalendar('getView');
                that.bindNoteBook(view.visStart, view.visEnd, callBackFunction);
        },
        bindNoteBook: function (start, end, callBackFunction)
        {
            $("#div_notebook").fullCalendar('removeEvents');

            var parameterJson = {
                appcodeIdString: _pr_appcode,
                startDateString: start.Format('yyyy-MM-dd'),
                endDateString: end.Format('yyyy-MM-dd'),
                sysUserIdString: basePageObj._userInfoJson.sys_userid,
                userInfoJsonString: basePageObj._userInfoJson
            };
            var data = {
                parameterJsonString: JSON.stringify(parameterJson),
                clientInf: _clientInf
            };

            doAjaxFunction(that._serviceUrl_main, 'GetNoteBook', data, {
                success: function (message)
                {
                    that._noteBookContentJson = (new Function("", "return " + message))();
                   

                    $.each(that._noteBookContentJson.rows, function (i, u)
                    {
                        var cc = i % 6 + 1;
                        $("#div_notebook").fullCalendar('renderEvent',
                                                    {
                                                        id: u['sys_id'],
                                                        title: u['f_title'] ,
                                                        start: new Date((u['f_date1']).replace(/-/g, "/")),
                                                        end: new Date((u['f_date2']).replace(/-/g, "/")),
                                                        allDay: true,
                                                        content: {
                                                            header: u['f_title'],
                                                            content: u['f_content'], 
                                                            start: u['f_date1'],
                                                            end: u['f_date2'],
                                                            czr: u['f_czr'],
                                                            group: u['f_group'],
                                                            filerealname: u['f_filerealname'],
                                                            fileuploadname: u['f_fileuploadname']
                                                        },
                                                        className: "label label-color" + cc
                                                    }, true
                                    );
                    });

                    if (callBackFunction)
                    {
                        callBackFunction.success();
                    }

                },
                fail: function (message)
                {
                    _blockMessage.show(that._serviceUrl_main + 'GetNoteBook<br/>' + message, 'fail');
                },
                error: function (message)
                {
                    _blockMessage.show(that._serviceUrl_main + 'GetNoteBook<br/>' + message, 'fail');
                }
            });
        },
        setNoteBookWidgetCount: function ()
        {

            $('#b_notebookCount').html(that._noteBookContentJson.total);
        },

        /*
        # =============================================================================
        #   support
        # =============================================================================
        */
        _supportContentJson: null,
        initSupport: function (callBackFunction)
        {
           
                var parameterJson = {
                    appcodeIdString: _pr_appcode,
                    sysUserIdString: basePageObj._userInfoJson.sys_userid,
                    userInfoJsonString: basePageObj._userInfoJson
                };
                var data = {
                    parameterJsonString: JSON.stringify(parameterJson),
                    clientInf: _clientInf
                };

                doAjaxFunction(that._serviceUrl_main, 'GetSupport', data, {
                    success: function (message)
                    {
                        that._supportContentJson = (new Function("", "return " + message))();
                        var resultString = '';
                        $.each(that._supportContentJson.rows, function (i, u)
                        {
                            //f_title,sys_id,f_appcode,f_act_startdate
                            resultString += ' <div class="panel">';
                            resultString += ' <div class="panel-heading">';
                            resultString += ' <div class="panel-title">';
                            resultString += ' <a class="accordion-toggle" onclick="mainObject.clickSupportContentAccordionItem(this);" data-parent="#div_supportContentAccordion_main" data-toggle="collapse" href="#faq' + u['sys_id'] + '">';
                            resultString += ' <div class="caret pull-right"></div>';
                            resultString += ' ' + u['f_title'];
                            resultString += ' </a>';
                            resultString += ' </div>';
                            resultString += ' </div>';
                            resultString += ' <div class="panel-collapse collapse" id="faq' + u['sys_id'] + '">';
                            resultString += ' <div class="panel-body">';
                            resultString += ' <img src="../../images/loading.gif" />数据装载中...';
                            resultString += ' </div>';
                            resultString += ' </div>';
                            resultString += ' </div>';

                        });

                        $('#div_supportContentAccordion_main').append(resultString);



                        callBackFunction.success();
                    },
                    fail: function (message)
                    {
                        _blockMessage.show(that._serviceUrl_main + 'GetSupport<br/>' + message, 'fail');
                    },
                    error: function (message)
                    {
                        _blockMessage.show(that._serviceUrl_main + 'GetSupport<br/>' + message, 'fail');
                    }
                });
        },
        setSupportWidgetCount: function ()
        {

            $('#b_supportCount').html(that._supportContentJson.total);
        },
        clickSupportContentAccordionItem: function (eve)
        {

            var hrefAttr = $(eve).attr('href');
            if ($(hrefAttr).find('.panel-body').html().indexOf('数据装载中...') > -1)
            {
                var supportid = hrefAttr.replaceAll('#faq', '');
                var parameterJson = {
                    supportid: supportid
                };
                var data = {
                    parameterJsonString: JSON.stringify(parameterJson),
                    clientInf: _clientInf
                };
                doAjaxFunction(that._serviceUrl_main, 'GetSupportContent', data, {
                    success: function (message)
                    {
                        var resultJson = (new Function("", "return " + message))();
                        var resultString = '';

                        resultString += '<br/>';
                        resultString += resultJson.rows[0].f_content_dtl;
                        resultString += '<br/>';
                                             

                        if ( resultJson.rows[0].f_filerealname != "" )
                        {
                            var realnameArray = resultJson.rows[0].f_filerealname.split( ',' );
                            var uploadnameArray = resultJson.rows[0].f_fileuploadname.split( ',' );

                            if ( realnameArray.length > 0 )
                            {
                                resultString += '<strong>相关附件：</strong><br>';
                                $.each( realnameArray, function ( ii, uu )
                                {
                                    resultString += '<a href="' + html5fileuploader_DefaultOps.fileUploadRootPath + 'fileuploadpath/' + uploadnameArray[ii] + '" target="_blank">' + realnameArray[ii] + '</a><br>';
                                } );
                            }
                        }

                        resultString += '<br/>';
                        resultString += '<strong>发布人：</strong>' + resultJson.rows[0].f_czr;

                        $(hrefAttr).find('.panel-body').html(resultString);

                    },
                    fail: function (message)
                    {

                    },
                    error: function (message)
                    {

                    }
                });
            }
        },

        /*
        # =============================================================================
        #   计算页面布局：待办工作高度、大事记高度
        # =============================================================================
        */       
        initLayOut: function ()
        {                   

            //待办工作的高度
            //大事记的高度
            if ($(window).height() < 700)
            {
                $('#div_workitemContent_main').height(500);
                $('#div_newsContent_main').height(500);
            }
            else
            {
                //待办工作列表的高度
                $('#div_workitemContent_main').height($(window).height() - 400);

                $('#div_newsContent_main').height($(window).height() - 400);
            }
        },

        /*
        # =============================================================================
        #   SocialWidget
        # =============================================================================
        */
              
        initSocialWidget: function ()
        {
            //==================动画效果
            $(".social-widget").on('mouseover', function (e)
            {
                $(this).find('i[class*="icon-"]').addClass('pulse');
            });

            $(".social-widget").on('mouseout', function (e)
            {                
                $(this).find('i[class*="icon-"]').removeClass('pulse');
            });

            //=================锁定SocialWidget的位置
            var currentWidth = $(window).width();
            if (currentWidth > basePageObj._padMinSrceenWidth)
            {
                var divwidth = $( '#div_socialwidgetContent_main' ).width();                
                setTimeout(function ()
                {
                    //锁定位置
                    $("#div_socialwidgetContent_main").affix({
                        offset: {
                            top: 100,
                            bottom: 100
                        }
                    });
                    $( '#div_socialwidgetContent_main' ).width( divwidth );
                });
            }
        },
        //设置SocialWidget的高度
        //未完成页面装载时，采用window.top的高度
        //完成装载时采用document的高度
        setSocialWidgetHeight: function (isLoaded)
        {

            if (isLoaded)
            {
                if ($(window).width() > basePageObj._padMinSrceenWidth)
                {
                    //关掉div_socialwidget_main对于页面高度的影响，然后才能获取准确的高度。。
                    //$('#div_socialwidget_main').height('100');
                   
                    //高度
                    $( '#div_socialwidget_main' ).height( $( document ).height() - 110 );
                    
                }
            }
            else
            {
                if ($(window.top).width() > basePageObj._padMinSrceenWidth)
                {
                    //2015-12-8，上来先给侧面的条条加一个高度，避免出现底下一大块白的情况
                    $( '#div_socialwidget_main' ).height( $( window.top ).height() - 110 );
                    
                }
            }
           
        },
        clickSocialWidgetItem: function (eve)
        {

            var btnArray = $('.item.social-widget');
            var currentSocialWidgetType = $(eve).attr('socialwidgettype');

            switch (currentSocialWidgetType)
            {
                case "workitem":
                    {
                        that.showContenCol(['div_workitemMenuCol_main', 'div_workitemContentCol_main']);

                    }
                    break;
                case "comment"://公告
                    {
                        if ($(eve).hasClass('unchecked'))
                        {
                            $(eve).removeClass('unchecked');
                            $('#div_comment_main').removeClass('hidden');

                            $('#div_comment_main').addClass('fadeInDown animated infinite');
                            setTimeout(function ()
                            {
                                $("#div_comment_main").removeClass('fadeInDown');
                            }, 500);

                            setTimeout(function ()
                            {
                                try
                                {
                                    $(window).scrollTop(($('#div_comment_main').offset().top - 200));
                                }
                                catch (ex)
                                {
                                    $('html,body').animate({ scrollTop: ($('#div_comment_main').offset().top - 200) }, 100);
                                }
                            });

                            that.setSocialWidgetHeight(true);

                        }
                        else
                        {
                            $(eve).addClass('unchecked');

                            //显示数据
                            $('#div_comment_main').addClass('fadeOutUp animated infinite');
                            setTimeout(function ()
                            {
                                $("#div_comment_main").removeClass('fadeOutUp');
                                $('#div_comment_main').addClass('hidden');

                                that.setSocialWidgetHeight(true);
                            }, 500);


                        }

                        
                    }
                    break;
                case "notebook"://记事本
                    {

                        that.showContenCol(['div_notebookContentCol_main']);
                    }
                    break;
                case "news"://大事记
                    {

                        that.showContenCol(['div_newsContentCol_main']);
                    }
                    break;
                case "support"://帮助
                    {


                        that.showContenCol(['div_supportContentCol_main']);

                    }
                    break;
            }
        },
        showContenCol: function (tagIdArray)
        {
            setTimeout(function ()
            {  //滚动到默认项                        
                try
                {
                    $(window).scrollTop(($('#' + tagIdArray[0]).offset().top - 200));
                }
                catch (ex)
                {
                    $('html,body').animate({ scrollTop: ($('#' + tagIdArray[0]).offset().top - 200) }, 100);
                }

                $('#div_block_main').height($(document).height());

                $('#div_block_main').css({ display: '' });
                $('#div_block_main').addClass('fadeIn animated infinite');
                $.each(tagIdArray, function (i, tagId)
                {
                    $('#' + tagId).css({ 'z-index': '10026' });
                });


                setTimeout(function ()
                {
                    $('#div_block_main').css({ display: 'none' });
                    $("#div_block_main").removeClass('fadeIn');


                    $.each(tagIdArray, function (i, tagId)
                    {
                        $('#' + tagId).css({ 'z-index': 'auto' });
                    });

                }, 1000);
            }, 200);
        }






    };
    return that;
})();
