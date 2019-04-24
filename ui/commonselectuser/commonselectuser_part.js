var commonselectuser_Obj = ( function ()
{
    var serviceUrl = '//127.0.0.1/sara.dd.ldsw/service/service_commonselectuser.asmx/';
    var selectedUserIdArray = [];
    var selectedUserNameArray = [];
    var selectedUserPotourlArray = [];

    ///当前被选中的tab页
    var currentTabType = 'username';

    var roleUserIdArray = [];
    var roleUserNameArray = [];
    var roleUserPotourlArray = [];

    var positionUserIdArray = [];
    var positionUserNameArray = [];
    var positionUserPotourlArray = [];

    var usergroupUserIdArray = [];
    var usergroupUserNameArray = [];
    var usergroupUserPotourlArray = [];

    var organUserIdArray = [];
    var organUserNameArray = [];
    var organUserPotourlArray = [];

    var usernameUserIdArray = [];
    var usernameUserNameArray = [];
    var usernameUserPotourlArray = [];

    /*
    根据selectedUserIdArray刷新text
    */
    var refreshTextByArray = function ()
    {
        controlObj.text( that.selectUserIdsControlId, selectedUserIdArray.toString().replaceAll( ',', '^' ) );
        controlObj.text(that.selectUserNamesControlId, selectedUserNameArray.toString().replaceAll(',', '^'));
        controlObj.text(that.selectUserPotourlsControlId, selectedUserPotourlArray.toString().replaceAll(',', '^'));
        if(that.onChange!=null)
        {
            that.onChange();
        }
    };
    /*
    根据selectedUserIdArray刷新选中情况
    */
    var refreshSelectedUserByArray = function ()
    {
        //解析用户名成选中效果
        var htmlString = '';
        $.each( selectedUserNameArray, function ( i, u )
        {
            if ( selectedUserIdArray[i] != '' )
            {
                if ( that.controlType == '1' )
                {
                    htmlString += ' <span class="label label-warning hand"  id="span_selecteduser_' + selectedUserIdArray[i] + '_commonselectuser" onclick="commonselectuser_Obj.deleteUser(\'' + selectedUserIdArray[i] + '\');">' + selectedUserNameArray[i] + '&times;<span></span></span>';//
                }
                else
                {
                    htmlString += ' <span class="label label-warning hand" id="span_selecteduser_' + selectedUserIdArray[i] + '_commonselectuser">' + selectedUserNameArray[i] + '<span></span></span>';
                }
            }
           

            
        } );
        $( '#' + that.containerId + ' #div_selecteduser_commonselectuser' ).html( htmlString );
    };

    /*
    根据*UserIdArray刷新备选情况
    */
    var refreshUserByArray = function ()
    {
        switch ( currentTabType )
        {
            case "role":
                {
                    var htmlString = '';
                    $.each( roleUserNameArray, function ( i, u )
                    {
                        if ( roleUserIdArray[i] != '' )
                        {
                            if ( selectedUserIdArray.indexOf( roleUserIdArray[i] ) > -1 )
                            {
                                htmlString += ' <span class="label label-warning hand" >' + roleUserNameArray[i] + '<span>√</span></span>';
                            }
                            else
                            {
                                htmlString += ' <span class="label label-info hand" onclick="commonselectuser_Obj.addUser(\'' + roleUserIdArray[i] + '\',\'' + roleUserNameArray[i] + '\',\'' + roleUserPotourlArray[i] + '\');" >' + roleUserNameArray[i] + '<span></span></span>';
                            }
                        }                       
                    } );
                    $( '#' + that.containerId + ' #div_span_role_commonselectuser' ).html( htmlString );
                }
                break;
            case "position":
                {
                    var htmlString = '';
                    $.each( positionUserNameArray, function ( i, u )
                    {
                        if ( positionUserIdArray[i] != '' )
                        {
                            if ( selectedUserIdArray.indexOf( positionUserIdArray[i] ) > -1 )
                            {
                                htmlString += ' <span class="label label-warning hand" >' + positionUserNameArray[i] + '<span>√</span></span>';
                            }
                            else
                            {
                                htmlString += ' <span class="label label-info hand" onclick="commonselectuser_Obj.addUser(\'' + positionUserIdArray[i] + '\',\'' + positionUserNameArray[i] + '\',\'' + positionUserPotourlArray[i] + '\');" >' + positionUserNameArray[i] + '<span></span></span>';
                            }
                        }
                    } );
                    $( '#' + that.containerId + ' #div_span_position_commonselectuser' ).html( htmlString );
                }
                break;
            case "usergroup":
                {
                    var htmlString = '';
                    $.each( usergroupUserNameArray, function ( i, u )
                    {
                        if ( usergroupUserIdArray[i] != '' )
                        {
                            if ( selectedUserIdArray.indexOf( usergroupUserIdArray[i] ) > -1 )
                            {
                                htmlString += ' <span class="label label-warning hand" >' + usergroupUserNameArray[i] + '<span>√</span></span>';
                            }
                            else
                            {
                                htmlString += ' <span class="label label-info hand" onclick="commonselectuser_Obj.addUser(\'' + usergroupUserIdArray[i] + '\',\'' + usergroupUserNameArray[i] + '\',\'' + usergroupUserPotourlArray[i] + '\');" >' + usergroupUserNameArray[i] + '<span></span></span>';
                            }
                        }
                    } );
                    $( '#' + that.containerId + ' #div_span_usergroup_commonselectuser' ).html( htmlString );
                }
                break;
            case "username":
                {
                    var htmlString = '';
                    $.each( usernameUserNameArray, function ( i, u )
                    {
                        if ( usernameUserIdArray[i] != '' )
                        {
                            if ( selectedUserIdArray.indexOf( usernameUserIdArray[i] ) > -1 )
                            {
                                htmlString += ' <span class="label label-warning hand" >' + usernameUserNameArray[i] + '<span>√</span></span>';
                            }
                            else
                            {
                                htmlString += ' <span class="label label-info hand" onclick="commonselectuser_Obj.addUser(\'' + usernameUserIdArray[i] + '\',\'' + usernameUserNameArray[i] + '\',\'' + usernameUserPotourlArray[i] + '\');" >' + usernameUserNameArray[i] + '<span></span></span>';
                            }
                        }
                    } );
                    $( '#' + that.containerId + ' #div_span_username_commonselectuser' ).html( htmlString );
                }
                break;
            case "organ":
                {
                    var htmlString = '';
                    $.each( organUserNameArray, function ( i, u )
                    {
                        if ( organUserIdArray[i] != '' )
                        {
                            if ( selectedUserIdArray.indexOf( organUserIdArray[i] ) > -1 )
                            {
                                htmlString += ' <span class="label label-warning hand" >' + organUserNameArray[i] + '<span>√</span></span>';
                            }
                            else
                            {
                                htmlString += ' <span class="label label-info hand" onclick="commonselectuser_Obj.addUser(\'' + organUserIdArray[i] + '\',\'' + organUserNameArray[i] + '\',\'' + organUserPotourlArray[i] + '\');" >' + organUserNameArray[i] + '<span></span></span>';
                            }
                        }
                    } );
                    $( '#' + that.containerId + ' #div_span_organ_commonselectuser' ).html( htmlString );
                }
                break;
        }
    };

    /*
    验证下拉控件是否值发生变化
    */
    var checkDropDownIsChanged = function ( changeEventParameter )
    {
        var isloadchild = false;
        if ( changeEventParameter.removed == undefined || changeEventParameter.added == undefined )
        {
            isloadchild = true;
        }
        else if ( changeEventParameter.added.id != changeEventParameter.removed.id )
        {
            isloadchild = true;
        }
        else
        {
            isloadchild = false;
        }

        return isloadchild;
    }
    /*
    角色
    */
    var dropdown_role_commonselectuser_onchange = function ( changeEventParameter )
    {
        // val: e.val, added: e.added, removed: e.removed       
        if ( checkDropDownIsChanged( changeEventParameter ) )
        {
            // alert( changeEventParameter.val );

            var data = {
                queryParameter: changeEventParameter.val.toString().replaceAll(',', '^'),
                whereClause: that.whereClause,
                queryType: 'role',
                clientInf: _clientInf
            };
            doAjaxFunction( serviceUrl, 'GetUserNames', data, {
                success: function ( message )
                {
                    var messageJson = ( new Function( "", "return " + message ) )();
                    roleUserIdArray = messageJson["userids"].split( '^' );
                    roleUserNameArray = messageJson["usernames"].split('^');
                    roleUserPotourlArray = messageJson["phototurls"].split('^');

                    refreshUserByArray();
                },
                fail: function ( message )
                {
                    _blockMessage.show( serviceUrl + 'GetUserNames<br/>' + message, 'fail' );
                }
            } );
        }
    };
    /*
    岗位
    */
    var dropdown_position_commonselectuser_onchange = function ( changeEventParameter )
    {
        // val: e.val, added: e.added, removed: e.removed       
        if ( checkDropDownIsChanged( changeEventParameter ) )
        {
            // alert( changeEventParameter.val );

            var data = {
                queryParameter: changeEventParameter.val.toString().replaceAll(',', '^'),
                whereClause:that.whereClause,
                queryType: 'position',
                clientInf: _clientInf
                
            };
            doAjaxFunction( serviceUrl, 'GetUserNames', data, {
                success: function ( message )
                {
                    var messageJson = ( new Function( "", "return " + message ) )();
                    positionUserIdArray = messageJson["userids"].split( '^' );
                    positionUserNameArray = messageJson["usernames"].split('^');
                    positionUserPotourlArray = messageJson["phototurls"].split('^');

                    refreshUserByArray();
                },
                fail: function ( message )
                {
                    _blockMessage.show( serviceUrl + 'GetUserNames<br/>' + message, 'fail' );
                }
            } );
        }
    };
    /*
    用户组
    */
    var dropdown_usergroup_commonselectuser_onchange = function ( changeEventParameter )
    {
        
        // val: e.val, added: e.added, removed: e.removed       
        if ( checkDropDownIsChanged( changeEventParameter ) )
        {
            // alert( changeEventParameter.val );

            var data = {
                queryParameter: changeEventParameter.val.toString().replaceAll(',', '^'),
                whereClause: that.whereClause,
                queryType: 'usergroup',
                clientInf: _clientInf
            };
            doAjaxFunction( serviceUrl, 'GetUserNames', data, {
                success: function ( message )
                {
                    var messageJson = ( new Function( "", "return " + message ) )();
                    usergroupUserIdArray = messageJson["userids"].split( '^' );
                    usergroupUserNameArray = messageJson["usernames"].split('^');
                    usergroupUserPotourlArray = messageJson["phototurls"].split('^');

                    refreshUserByArray();
                },
                fail: function ( message )
                {
                    _blockMessage.show( serviceUrl + 'GetUserNames<br/>' + message, 'fail' );
                }
            } );
        }
    };
    /*
    机构
    */
    var dropdown_organ_commonselectuser_onchange = function ( changeEventParameter )
    {
        // val: e.val, added: e.added, removed: e.removed       
        if ( checkDropDownIsChanged( changeEventParameter ) )
        {
            // alert( changeEventParameter.val );

            var data = {
                queryParameter: changeEventParameter.val.toString().replaceAll(',', '^'),
                whereClause: that.whereClause,
                queryType: 'organ',
                clientInf: _clientInf
            };
            doAjaxFunction( serviceUrl, 'GetUserNames', data, {
                success: function ( message )
                {
                    var messageJson = ( new Function( "", "return " + message ) )();
                    organUserIdArray = messageJson["userids"].split( '^' );
                    organUserNameArray = messageJson["usernames"].split('^');
                    organUserPotourlArray = messageJson["phototurls"].split('^');

                    refreshUserByArray();
                },
                fail: function ( message )
                {
                    _blockMessage.show( serviceUrl + 'GetUserNames<br/>' + message, 'fail' );
                }
            } );
        }
    };

    var showErrorTip = function ()
    {
        if ( $( '#' + that.containerId + ' #label_selecteduser_commonselectuser .icon-exclamation-sign' ).hasClass( 'hidden' ) )
        {

            $( '#' + that.containerId + ' #label_selecteduser_commonselectuser' ).popover( {
                animation: true,
                content: '最多选择<a style="color:red" >' + that.maxSelectedUser + '</a>个用户',
                html: true,
                placement: 'top',
                trigger: 'click'
            } );
            $( '#' + that.containerId + '' ).addClass( 'has-error' );
            $( '#' + that.containerId + ' #label_selecteduser_commonselectuser .icon-exclamation-sign' ).removeClass( 'hidden' );
            $( '#' + that.containerId + ' #label_selecteduser_commonselectuser' ).popover( 'show' );
        }
    };

    var hiddenErrorTip = function ()
    {
        if ( !$( '#' + that.containerId + ' #label_selecteduser_commonselectuser .icon-exclamation-sign' ).hasClass( 'hidden' ) )
        {
            $( '#' + that.containerId + '' ).removeClass( 'has-error' );
            $( '#' + that.containerId + ' #label_selecteduser_commonselectuser .icon-exclamation-sign' ).addClass( 'hidden' );
            $( '#' + that.containerId + ' #label_selecteduser_commonselectuser' ).popover( 'destroy' );
        }
    };

    var that = {

        /*
        控件状态，1：编辑；2：只读
        */
        controlType: '1',
        /*
        支持的查询模式：username,role,position,usergroup,organ；空就是没有
        */
        searchTabArray: ['username','role', 'position', 'usergroup', 'organ'],
        /*
        最多选中几个用户：0：没有上限
        */
        maxSelectedUser: '0',
        /*
        容器ID
        */
        containerId: '',
        /*
        选中的用户IDs
        */
        selectUserIdsControlId: '',
        /*
        选中的用户Names
        */
        selectUserNamesControlId: '',
        /*
        选中的用户Potourl
        */
        selectUserPotourlsControlId: '',
        /*
        显示的Label
        */
        showText: '',
        /*
        增加的参数
        */
        whereClause: '',
        /*
        onChange()
        */
        onChange:null,

        init: function ( callBackFunction )
        {
            //设置标题
            $( '#' + that.containerId + ' #a_selecteduser_commonselectuser' ).html( that.showText );

            //读取已经选中的usernames和userids
            if (controlObj.text(that.selectUserIdsControlId) != "") {
                selectedUserIdArray = controlObj.text(that.selectUserIdsControlId).split('^');
            }
            if (controlObj.text(that.selectUserNamesControlId) != "") {
                selectedUserNameArray = controlObj.text(that.selectUserNamesControlId).split('^');
            }
            if (controlObj.text(that.selectUserPotourlsControlId) != "") {
                selectedUserPotourlArray = controlObj.text(that.selectUserPotourlsControlId).split('^');
                
            }
            //显示到selectedUser控件中
            refreshSelectedUserByArray();

            if ( that.controlType == '1' )
            {
                $( '#' + that.containerId + ' #ul_tab_commonselectuser' ).removeClass( 'hidden' );
                $('#' + that.containerId + ' #div_content_commonselectuser').removeClass('hidden');
                $( '#' + that.containerId + ' #div_selecteduser_allcontrol' ).removeClass( 'hidden' );
                
                //active hidden
                //li_username_commonselectuser
                //div_username_commonselectuser
                
                $.each( that.searchTabArray, function ( i, u )
                {
                    if(i==0)
                    {
                        $( '#' + that.containerId + ' #li_' + that.searchTabArray[i] + '_commonselectuser' ).addClass( 'active' );
                        $( '#' + that.containerId + ' #div_' + that.searchTabArray[i] + '_commonselectuser' ).removeClass( 'hidden' );
                    }
                    $( '#' + that.containerId + ' #li_' + that.searchTabArray[i] + '_commonselectuser' ).removeClass( 'hidden' );
                } );
                


                var data = {
                    clientInf: _clientInf
                };
                doAjaxFunction( serviceUrl, 'GetBaseCode', data, {
                    success: function ( message )
                    {
                        var messageJson = ( new Function( "", "return " + message ) )();


                        var roleArray = ( new Function( "", "return " + messageJson["role"] ) )();
                        var positionArray = ( new Function( "", "return " + messageJson["position"] ) )();
                        var usergroupArray = ( new Function( "", "return " + messageJson["usergroup"] ) )();
                        var organArray = ( new Function( "", "return " + messageJson["organ"] ) )();
                        controlObj.multidropdownlistinit(that.containerId + ' #dropdown_role_commonselectuser', roleArray, dropdown_role_commonselectuser_onchange);
                        controlObj.multidropdownlistinit(that.containerId + ' #dropdown_position_commonselectuser', positionArray, dropdown_position_commonselectuser_onchange);
                        controlObj.multidropdownlistinit(that.containerId + ' #dropdown_usergroup_commonselectuser', usergroupArray, dropdown_usergroup_commonselectuser_onchange);
                        controlObj.multidropdownlistinit(that.containerId + ' #dropdown_organ_commonselectuser', organArray, dropdown_organ_commonselectuser_onchange);

                        callBackFunction.success();
                    },
                    fail: function ( message )
                    {
                        _blockMessage.show( serviceUrl + 'GetBaseCode<br/>' + message, 'fail' );
                    }
                } );
            }
            else
            {
                $('#' + that.containerId + ' #div_selecteduser_allcontrol').addClass('hidden');
                $( '#' + that.containerId + ' #ul_tab_commonselectuser' ).addClass( 'hidden' );
                $( '#' + that.containerId + ' #div_content_commonselectuser' ).addClass( 'hidden' );
                
                callBackFunction.success();
            }


           

            
        },
        /*
        切换显示
        */
        li_onclick: function ( keyString )
        {
            currentTabType = keyString;
            var $that = $( '#' + that.containerId + ' #li_' + keyString + '_commonselectuser' );
            if ( !$that.hasClass( 'active' ) )
            {
                var liArray = $that.parent().children();
                $.each( liArray, function ( i, u )
                {
                    $( liArray[i] ).removeClass( 'active' );
                } );
                $that.addClass( 'active' );


                var $thatDiv = $( '#' + that.containerId + ' #div_' + keyString + '_commonselectuser' );
                var liDivArray = $thatDiv.parent().children();
                $.each( liDivArray, function ( i, u )
                {
                    $( liDivArray[i] ).addClass( 'hidden' );
                } );
                $thatDiv.removeClass( 'hidden' );

                refreshUserByArray();
            }

         

        },
        /*
        删除用户
        */
        deleteUser: function ( userIdString )
        {
            
            var index = selectedUserIdArray.indexOf( userIdString );
            
            selectedUserIdArray = selectedUserIdArray.remove(index);
            if (selectedUserNameArray.length != 0)
            {
                selectedUserNameArray = selectedUserNameArray.remove(index);
            }
            if (selectedUserPotourlArray.length != 0)
            {
                selectedUserPotourlArray = selectedUserPotourlArray.remove(index);
            }
            
            

            refreshSelectedUserByArray();
            refreshTextByArray();
            refreshUserByArray();
        },
        deleteAllUser:function()
        {
            selectedUserNameArray = [];
            selectedUserIdArray = [];
            selectedUserPotourlArray = [];

            refreshSelectedUserByArray();
            refreshTextByArray();
            refreshUserByArray();
        },
        /*
        添加用户
        */
        addUser: function ( userIdString, userNameString,userPotourl )
        {
            //selectedUserIdArray = [];
            //selectedUserNameArray = [];
            //selectedUserPotourlArray = [];
            if ( that.maxSelectedUser == '0' )                
            {
                selectedUserIdArray.push( userIdString );
                selectedUserNameArray.push(userNameString);
                selectedUserPotourlArray.push(userPotourl);

                refreshSelectedUserByArray();
                refreshTextByArray();
                refreshUserByArray();
            }
            else
            {
                if ( selectedUserIdArray.length >= that.maxSelectedUser )
                {
                    showErrorTip();
                }
                else
                {
                    hiddenErrorTip();

                    selectedUserIdArray.push( userIdString );
                    selectedUserNameArray.push( userNameString );
                    selectedUserPotourlArray.push(userPotourl);

                    refreshSelectedUserByArray();
                    refreshTextByArray();
                    refreshUserByArray();
                }
            }
           
            
          
        },
        addAllUser:function()
        {
            var isCanAdd = false;
            if ( that.maxSelectedUser == '0' )
            {
                isCanAdd = true;
            }
            else
            {
                if( selectedUserIdArray.length> that.maxSelectedUser)
                {
                    isCanAdd = false;
                }
                else
                {
                    switch ( currentTabType )
                    {
                        case "role":
                            {
                                if( selectedUserIdArray.length + roleUserIdArray.length > that.maxSelectedUser)
                                {
                                    isCanAdd = false;
                                }
                                else
                                {
                                    isCanAdd = true;
                                }
                            }
                            break;
                        case "position":
                            {
                                if ( selectedUserIdArray.length + positionUserIdArray.length > that.maxSelectedUser )
                                {
                                    isCanAdd = false;
                                }
                                else
                                {
                                    isCanAdd = true;
                                }
                            }
                            break;
                        case "usergroup":
                            {                               
                                if ( selectedUserIdArray.length + usergroupUserIdArray.length > that.maxSelectedUser )
                                {
                                    isCanAdd = false;
                                }
                                else
                                {
                                    isCanAdd = true;
                                }
                            }
                            break;
                        case "username":
                            {
                                if ( selectedUserIdArray.length + usernameUserIdArray.length > that.maxSelectedUser )
                                {
                                    isCanAdd = false;
                                }
                                else
                                {
                                    isCanAdd = true;
                                }                              
                            }
                            break;
                        case "organ":
                            {
                                if ( selectedUserIdArray.length + organUserIdArray.length > that.maxSelectedUser )
                                {
                                    isCanAdd = false;
                                }
                                else
                                {
                                    isCanAdd = true;
                                }                              
                            }
                            break;
                    }
                }
            }
           
            if ( isCanAdd )
            {
                switch ( currentTabType )
                {
                    case "role":
                        {
                            $.each( roleUserIdArray, function ( i, u )
                            {
                                selectedUserIdArray.push( roleUserIdArray[i] );
                                selectedUserNameArray.push(roleUserNameArray[i]);
                                selectedUserPotourlArray.push(roleUserPotourlArray[i]);
                            } );

                        }
                        break;
                    case "position":
                        {
                            $.each( positionUserIdArray, function ( i, u )
                            {
                                selectedUserIdArray.push( positionUserIdArray[i] );
                                selectedUserNameArray.push(positionUserNameArray[i]);
                                selectedUserPotourlArray.push(positionUserPotourlArray[i]);
                            } );
                        }
                        break;
                    case "usergroup":
                        {
                            $.each( usergroupUserIdArray, function ( i, u )
                            {
                                selectedUserIdArray.push( usergroupUserIdArray[i] );
                                selectedUserNameArray.push(usergroupUserNameArray[i]);
                                selectedUserPotourlArray.push(usergroupUserPotourlArray[i]);
                            } );
                        }
                        break;
                    case "username":
                        {
                            $.each( usernameUserIdArray, function ( i, u )
                            {
                                selectedUserIdArray.push( usernameUserIdArray[i] );
                                selectedUserNameArray.push(usernameUserNameArray[i]);
                                selectedUserPotourlArray.push(usernameUserPotourlArray[i]);
                            } );
                        }
                        break;
                    case "organ":
                        {
                            $.each( organUserIdArray, function ( i, u )
                            {
                                selectedUserIdArray.push( organUserIdArray[i] );
                                selectedUserNameArray.push(organUserNameArray[i]);
                                selectedUserPotourlArray.push(organUserPotourlArray[i]);
                            } );
                        }
                        break;
                }

                refreshSelectedUserByArray();
                refreshTextByArray();
                refreshUserByArray();

                hiddenErrorTip();
            }
            else
            {
                showErrorTip();
            }
          
        },
        /*
      用户名查询
      */
        btn_txt_username_onclick:function()
        {
            var data = {
                queryParameter: controlObj.text(that.containerId + ' #txt_username_commonselectuser'),
                whereClause:that.whereClause,
                queryType: 'username',
                clientInf: _clientInf
            };
            doAjaxFunction( serviceUrl, 'GetUserNames', data, {
                success: function ( message )
                {
                    var messageJson = ( new Function( "", "return " + message ) )();
                    usernameUserIdArray = messageJson["userids"].split( '^' );
                    usernameUserNameArray = messageJson["usernames"].split('^');
                    usernameUserPotourlArray = messageJson["phototurls"].split('^');

                    refreshUserByArray();
                },
                fail: function ( message )
                {
                    _blockMessage.show( serviceUrl + 'GetUserNames<br/>' + message, 'fail' );
                }
            } );
        }
    };

    return that;

} )();