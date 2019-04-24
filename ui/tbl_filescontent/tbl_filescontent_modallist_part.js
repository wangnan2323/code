

var tbl_filescontent_Obj = (function ()
{
    'use strict';
    //================private
    var _serviceUrl = '//127.0.0.1/sara.dd.ldsw/service/service_tbl_filescontent.asmx/',

        //设置为空即可实现不分页
        _pageSize = '10',



        _validateMessage_search = null,
        _validateMessage_detail = null,

        _ladda_btn_command_new = null,
        _ladda_btn_command_delete = null,
            _sys_id = '',

        initParameter = function (callBackFunction)
        {
            try
            {

                //that._pr_listtype = requestQuery('listtype');
                //_pr_appcode = requestQuery('appcode');
                //that._pr_gridselectids = requestQuery('gridselectids');
                //that._pr_gridpageindex = requestQuery('gridpageIndex');
                //that._pr_searchtype = requestQuery('searchtype');
                //that._pr_searchcontent = requestQuery('searchcontent');
                //that._pr_maintable_sys_id = requestQuery('maintable_sys_id');
                //that._pr_projectclassid = requestQuery('projclass_sys_id');
                //_clientInf = '{userid:"' + basePageObj._userInfoJson.sys_userid + '",appcode:"' + _pr_appcode + '",appname:"",userip:"' + basePageObj._userInfoJson.ip + '",usermac:"' + basePageObj._userInfoJson.mac + '",username:"' + basePageObj._userInfoJson.sys_username + '",userimg:"' + basePageObj._userInfoJson.sys_photourl + '"}';

                if (that._pr_gridpageindex == null || that._pr_gridpageindex == '' || that._pr_gridpageindex == 'null')
                {
                    that._pr_gridpageindex = 1;
                }
                else
                {
                    that._pr_gridpageindex = Number(that._pr_gridpageindex);
                }

                if (that._pr_searchcontent == null || that._pr_searchcontent == '' || that._pr_searchcontent == 'null')
                {
                    that._pr_searchcontent = new Object();
                }
                else
                {
                    that._pr_searchcontent = (new Function("", "return " + that._pr_searchcontent))();
                }

                if (that._pr_searchtype == null || that._pr_searchtype == '' || that._pr_searchtype == 'null')
                {
                    that._pr_searchtype = '1';
                }

                switch (that._pr_searchtype)
                {
                    case "1":
                        $('#btn_command_search_tbl_filescontent_modallist').html('简单查询');
                        $('#txt_command_search_tbl_filescontent_modallist').removeAttr("disabled");

                        break;
                    case "2":
                        $('#btn_command_search_tbl_filescontent_modallist').html('高级查询');
                        $('#txt_command_search_tbl_filescontent_modallist').attr("disabled", true);
                        break;
                }


                if (that._pr_listtype == null || that._pr_listtype == '' || that._pr_listtype == 'null')
                {
                    _blockMessage.show('listtype参数接收失败...', 'fail');
                }
                else if (that._pr_maintable_sys_id == null || that._pr_maintable_sys_id == '' || that._pr_maintable_sys_id == 'null')
                {
                    _blockMessage.show('maintable_sys_id参数接收失败...', 'fail');
                }
                else if (that._pr_projectclassid == null || that._pr_projectclassid == '' || that._pr_projectclassid == 'null')
                {
                    _blockMessage.show('_pr_projectclassid参数接收失败...', 'fail');
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
        initGrid = function (callBackFunction)
        {
            try
            {
                var gridHeight = 150;
                //if ($(window).width() < basePageObj._limSrceenWidth)
                //{
                //    gridHeight = $(window).height() - 320;
                //    if (gridHeight < 950)
                //    {
                //        gridHeight = 950;
                //    }
                //}
                //else
                //{
                //    gridHeight = $(window).height() - 240;
                //}

                $('#table_grid_tbl_filescontent_modallist').bootstrapTable({
                    cache: false,
                    height: gridHeight,
                    striped: true,
                    pagination: true,
                    pageSize: _pageSize,
                    pageList: [_pageSize],
                    pageNumber: that._pr_gridpageindex,
                    search: false,
                    showColumns: false,
                    showRefresh: false,
                    clickToSelect: true,
                    idField: 'sys_id',
                    sidePagination: 'webserver',
                    columns: [
                        {
                            field: '_checkbox', checkbox: true,
                            formatter: function (value, row, index)
                            {
                                switch (that._pr_listtype)
                                {
                                    case "1":


                                        if (row.fnumber && ('^' + that._pr_gridselectids + '^').indexOf('^' + row.sys_id + '^') > -1)
                                        {
                                            return { disabled: true, checked: true };
                                        } else if (row.fnumber)
                                        {
                                            return { disabled: true, checked: false };
                                        }
                                        else if (('^' + that._pr_gridselectids + '^').indexOf('^' + row.sys_id + '^') > -1)
                                        {
                                            return {
                                                disabled: false,
                                                checked: true
                                            }
                                        }
                                        return value;
                                        break;
                                    case "2":
                                        if (('^' + that._pr_gridselectids + '^').indexOf('^' + row.sys_id + '^') > -1)
                                        {
                                            return {
                                                disabled: true,
                                                checked: true
                                            }
                                        }
                                        else
                                        {
                                            return {
                                                disabled: true
                                            }
                                        }
                                        break;
                                }
                            }
                        },
                        {
                            field: 'sys_id', title: 'sys_id',
                            align: 'center',
                            valign: 'middle',
                            visible: false,
                            sortable: true
                        },


                     {
                         field: 'fk_maintable_sys_id', title: '外键',
                         visible: false,
                         "class": 'cc-hidden-sm  cc-hidden-xs',
                         align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                         formatter: function (value, row, index) { return value; }
                     },



                     {
                         field: 'fk_projclass_sys_id', title: '业务类型ID',
                         visible: false,
                         "class": 'cc-hidden-sm  cc-hidden-xs',
                         align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                         formatter: function (value, row, index) { return value; }
                     },



                     {
                         field: 'filename', title: '文件名称',
                         "class": 'cc-hidden-sm  cc-hidden-xs',
                         visible: false,
                         align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                         formatter: function (value, row, index) { return value; }
                     },



                     {
                         field: 'filerealname', title: '文件真名',
                         "class": 'cc-hidden-sm  cc-hidden-xs',
                         visible: false,
                         align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                         formatter: function (value, row, index) { return value; }
                     },



                     {
                         field: 'fileclass', title: '文件类型',
                         "class": 'cc-hidden-sm  cc-hidden-xs',
                         visible: false,
                         align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                         formatter: function (value, row, index) { return value; }
                     },



                     {
                         field: 'filetitle', title: '文件名称',
                         "class": 'cc-hidden-sm  cc-hidden-xs',
                         align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                         formatter: function (value, row, index) { return value; }
                     },
                     {
                         field: 'filesize', title: '文件数量',
                         "class": 'cc-hidden-sm  cc-hidden-xs',
                         align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                         formatter: function (value, row, index) { return value; }
                     },






                     {
                         field: 'filenote', title: '文件说明',
                         "class": 'cc-hidden-sm  cc-hidden-xs',
                         visible: false,
                         align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                         formatter: function (value, row, index) { return value; }
                     },



                     {
                         field: 'fnumber', title: '次数',
                         "class": 'cc-hidden-sm  cc-hidden-xs',
                         visible: false,

                         align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                         formatter: function (value, row, index) { return value; }
                     },


                        {
                            field: '', title: '操作',
                            align: 'center', valign: 'middle', sortable: false, clickToSelect: false,
                            formatter: function (value, row, index)
                            {
                                switch (that._pr_listtype)
                                {
                                    case "1":
                                        return [
                                  '<a class="edit ml10" href="javascript:void(0)" title="编辑">',
                                      '<i class="glyphicon glyphicon-edit"></i>',
                                  '</a>'
                                        ].join('');
                                        break;
                                    case "2":
                                        return [
                                  '<a class="view ml10" href="javascript:void(0)" title="浏览">',
                                      '<i class="glyphicon glyphicon-eye-open"></i>',
                                  '</a>'
                                        ].join('');
                                        break;
                                }
                            },
                            events: {
                                'click .view': function (e, value, row, index)
                                {
                                    _sys_id = row.sys_id;
                                    setDetailData({
                                        success: function ()
                                        {
                                            $('#div_detail_modal_tbl_filescontent_modallist').modal('show');
                                        }
                                    });

                                },
                                'click .edit': function (e, value, row, index)
                                {
                                    _sys_id = row.sys_id;
                                    setDetailData({
                                        success: function ()
                                        {
                                            $('#div_detail_modal_tbl_filescontent_modallist').modal('show');
                                        }
                                    });
                                }
                            }
                        }
                    ],
                    onPageChange: function (size, number)
                    {
                        that._pr_gridpageindex = number;
                        that.bindGrid();
                    },
                    rowStyle: function (row, index)
                    {
                        //return {classes: 'active'//'success'//'info'//'warning' //'danger'};
                        return {};
                    },
                    onLoadSuccess: function (data)
                    {
                    },
                    onCheck: function (row)
                    {
                        that._pr_gridselectids += '^' + row.sys_id;
                        that._pr_gridselectids = that._pr_gridselectids.trimStartEnd('^');

                        gridSelectedChange();
                    },
                    onUncheck: function (row)
                    {
                        that._pr_gridselectids = ('^' + that._pr_gridselectids + '^').replaceAll('^' + row.sys_id + '^', '^');
                        that._pr_gridselectids = that._pr_gridselectids.trimStartEnd('^');

                        gridSelectedChange();
                    },
                    onCheckAll: function ()
                    {
                        var rows = $('#table_grid_tbl_filescontent_modallist').bootstrapTable('getSelections');
                        $.each(rows, function (i, u)
                        {
                            if (('^' + that._pr_gridselectids + '^').indexOf('^' + rows[i].sys_id + '^') > -1)
                            {

                            }
                            else
                            {
                                that._pr_gridselectids += '^' + rows[i].sys_id;
                            }
                        });
                        that._pr_gridselectids = that._pr_gridselectids.trimStartEnd('^');

                        gridSelectedChange();
                    },
                    onUncheckAll: function ()
                    {
                        var rows = $('#table_grid_tbl_filescontent_modallist').bootstrapTable('getData');
                        $.each(rows, function (i, u)
                        {
                            if (('^' + that._pr_gridselectids + '^').indexOf('^' + rows[i].sys_id + '^') > -1)
                            {
                                that._pr_gridselectids = ('^' + that._pr_gridselectids + '^').replaceAll('^' + rows[i].sys_id + '^', '^');
                            }
                        });

                        that._pr_gridselectids = that._pr_gridselectids.trimStartEnd('^');

                        gridSelectedChange();
                    },
                });

                callBackFunction.success();
            }
            catch (ex)
            {
                _blockMessage.show('initGrid执行失败<br/>' + ex.message, 'fail');
            }
        },
        setDisable = function (isDisable)
        {

            controlObj.textdisable('detail_txt_filename_tbl_filescontent_modallist', isDisable);

            controlObj.fileuploaderdisable('detail_txt_filerealname_tbl_filescontent_modallist', isDisable);//ok

            controlObj.textdisable('detail_txt_fileclass_tbl_filescontent_modallist', isDisable);
            //filesize不许修改
            controlObj.textdisable('detail_txt_filesize_tbl_filescontent_modallist', true);

            controlObj.textdisable('detail_txt_filetitle_tbl_filescontent_modallist', isDisable);

            controlObj.textdisable('detail_txt_filenote_tbl_filescontent_modallist', isDisable);

            controlObj.textdisable('detail_txt_fnumber_tbl_filescontent_modallist', isDisable);

            if (isDisable)
            {
                $('#btn_detail_modal_save_tbl_filescontent_modallist').addClass('hidden');
                $('#btn_command_new_tbl_filescontent_modallist').addClass('hidden');
                $('#btn_command_delete_tbl_filescontent_modallist').addClass('hidden');
            }
            else
            {
                $('#btn_detail_modal_save_tbl_filescontent_modallist').removeClass('hidden');
                $('#btn_command_new_tbl_filescontent_modallist').removeClass('hidden');
                $('#btn_command_delete_tbl_filescontent_modallist').removeClass('hidden');
            }
        },
        initBaseCode = function (callBackFunction)
        {
            callBackFunction.success();

        },
        initSearchControl = function (callBackFunction)
        {
            try
            {



                //模态窗口
                $('#div_search_modal_tbl_filescontent_modallist').modal({
                    keyboard: false,
                    backdrop: 'static',
                    show: false
                });

                callBackFunction.success();
            }
            catch (ex)
            {
                _blockMessage.show('initSearchControl执行失败。<br/>' + ex.message, 'fail');
            }
        },
        setSearchData = function (callBackFunction)
        {
            try
            {
                switch (that._pr_searchtype)
                {
                    case "1":
                        if (that._pr_searchcontent.type1 != undefined)
                        {
                            //简单查询
                            $("#txt_command_search_tbl_filescontent_modallist").val(that._pr_searchcontent.type1);
                        }

                        break;
                    case "2":
                        if (that._pr_searchcontent.type2 != undefined)
                        {
                            //高级查询
                            var tbl_filescontent_modallist = that._pr_searchcontent.type2;

                            controlObj.text('search_txt_fk_maintable_sys_id_tbl_filescontent_modallist', tbl_filescontent_modallist.fk_maintable_sys_id);

                            controlObj.text('search_txt_fk_projclass_sys_id_tbl_filescontent_modallist', tbl_filescontent_modallist.fk_projclass_sys_id);

                            controlObj.text('search_txt_filename_tbl_filescontent_modallist', tbl_filescontent_modallist.filename);

                            controlObj.text('search_txt_filerealname_tbl_filescontent_modallist', tbl_filescontent_modallist.filerealname);

                            controlObj.text('search_txt_fileclass_tbl_filescontent_modallist', tbl_filescontent_modallist.fileclass);

                            controlObj.text('search_txt_filesize_tbl_filescontent_modallist', tbl_filescontent_modallist.filesize);

                            controlObj.text('search_txt_filetitle_tbl_filescontent_modallist', tbl_filescontent_modallist.filetitle);

                            controlObj.text('search_txt_filenote_tbl_filescontent_modallist', tbl_filescontent_modallist.filenote);

                            controlObj.text('search_txt_fnumber_tbl_filescontent_modallist', tbl_filescontent_modallist.fnumber);



                        }

                        break;
                }


                callBackFunction.success();
            }
            catch (ex)
            {
                _blockMessage.show('setSearchData执行失败。<br/>' + ex.message, 'fail');
            }

        },
        getSearchData = function (callBackFunction)
        {
            try
            {
                switch (that._pr_searchtype)
                {

                    case "1":
                        //简单查询
                        that._pr_searchcontent.type1 = $("#txt_command_search_tbl_filescontent_modallist").val();

                        break;
                    case "2":

                        var tbl_filescontent_modallist = new Object();


                        tbl_filescontent_modallist.fk_maintable_sys_id = controlObj.text('search_txt_fk_maintable_sys_id_tbl_filescontent_modallist');


                        tbl_filescontent_modallist.fk_projclass_sys_id = controlObj.text('search_txt_fk_projclass_sys_id_tbl_filescontent_modallist');


                        tbl_filescontent_modallist.filename = controlObj.text('search_txt_filename_tbl_filescontent_modallist');


                        tbl_filescontent_modallist.filerealname = controlObj.text('search_txt_filerealname_tbl_filescontent_modallist');


                        tbl_filescontent_modallist.fileclass = controlObj.text('search_txt_fileclass_tbl_filescontent_modallist');


                        tbl_filescontent_modallist.filesize = controlObj.text('search_txt_filesize_tbl_filescontent_modallist');


                        tbl_filescontent_modallist.filetitle = controlObj.text('search_txt_filetitle_tbl_filescontent_modallist');


                        tbl_filescontent_modallist.filenote = controlObj.text('search_txt_filenote_tbl_filescontent_modallist');


                        tbl_filescontent_modallist.fnumber = controlObj.text('search_txt_fnumber_tbl_filescontent_modallist');



                        that._pr_searchcontent.type2 = tbl_filescontent_modallist;
                        break;

                }

                callBackFunction.success();
            }
            catch (ex)
            {
                _blockMessage.show('getSearchData执行失败。<br/>' + ex.message, 'fail');
            }


        },
        checkSearchData = function (callBackFunction)
        {
            try
            {
                var tbl_filescontent_modallist = that._pr_searchcontent.type2;
                var errorMessageHansMap = new hashMap();
                var errorMessagePlacementHansMap = new hashMap();




                if (tbl_filescontent_modallist.fk_maintable_sys_id.length > 100)
                {
                    errorMessageHansMap.put('search_txt_fk_maintable_sys_id_tbl_filescontent_modallist', '长度不能超过<a style="color:red">100</a>');
                    errorMessagePlacementHansMap.put('search_txt_fk_maintable_sys_id_tbl_filescontent_modallist', 'top');
                }


                if (tbl_filescontent_modallist.fk_projclass_sys_id.length > 100)
                {
                    errorMessageHansMap.put('search_txt_fk_projclass_sys_id_tbl_filescontent_modallist', '长度不能超过<a style="color:red">100</a>');
                    errorMessagePlacementHansMap.put('search_txt_fk_projclass_sys_id_tbl_filescontent_modallist', 'top');
                }


                if (tbl_filescontent_modallist.filename.length > 100)
                {
                    errorMessageHansMap.put('search_txt_filename_tbl_filescontent_modallist', '长度不能超过<a style="color:red">100</a>');
                    errorMessagePlacementHansMap.put('search_txt_filename_tbl_filescontent_modallist', 'top');
                }


                if (tbl_filescontent_modallist.filerealname.length > 100)
                {
                    errorMessageHansMap.put('search_txt_filerealname_tbl_filescontent_modallist', '长度不能超过<a style="color:red">100</a>');
                    errorMessagePlacementHansMap.put('search_txt_filerealname_tbl_filescontent_modallist', 'top');
                }


                if (tbl_filescontent_modallist.fileclass.length > 100)
                {
                    errorMessageHansMap.put('search_txt_fileclass_tbl_filescontent_modallist', '长度不能超过<a style="color:red">100</a>');
                    errorMessagePlacementHansMap.put('search_txt_fileclass_tbl_filescontent_modallist', 'top');
                }


                if (tbl_filescontent_modallist.filesize.length > 100)
                {
                    errorMessageHansMap.put('search_txt_filesize_tbl_filescontent_modallist', '长度不能超过<a style="color:red">100</a>');
                    errorMessagePlacementHansMap.put('search_txt_filesize_tbl_filescontent_modallist', 'top');
                }


                if (tbl_filescontent_modallist.filetitle.length > 100)
                {
                    errorMessageHansMap.put('search_txt_filetitle_tbl_filescontent_modallist', '长度不能超过<a style="color:red">100</a>');
                    errorMessagePlacementHansMap.put('search_txt_filetitle_tbl_filescontent_modallist', 'top');
                }


                if (tbl_filescontent_modallist.filenote.length > 100)
                {
                    errorMessageHansMap.put('search_txt_filenote_tbl_filescontent_modallist', '长度不能超过<a style="color:red">100</a>');
                    errorMessagePlacementHansMap.put('search_txt_filenote_tbl_filescontent_modallist', 'top');
                }


                if (tbl_filescontent_modallist.fnumber.length > 100)
                {
                    errorMessageHansMap.put('search_txt_fnumber_tbl_filescontent_modallist', '长度不能超过<a style="color:red">100</a>');
                    errorMessagePlacementHansMap.put('search_txt_fnumber_tbl_filescontent_modallist', 'top');
                }



                if (errorMessageHansMap.keys().length > 0)
                {
                    _validateMessage_search.show(errorMessageHansMap, errorMessagePlacementHansMap, false);
                    callBackFunction.fail();
                }
                else
                {
                    _validateMessage_search.hidden();
                    callBackFunction.success();
                }
            }
            catch (ex)
            {
                _blockMessage.show('checkSearchData执行失败。<br/>' + ex.message, 'fail');
            }

        },
        creatWhereClause = function (callBackFunction)
        {

            var whereClause = '';
            switch (that._pr_searchtype)
            {
                case "1":
                    {

                        if (that._pr_searchcontent.type1 != undefined)
                        {
                            var vv = that._pr_searchcontent.type1.split(' ');
                            if (vv.length > 0)
                            {
                                for (var i = 0; i < vv.length; i++)
                                {
                                    if (vv[i] != '')
                                    {
                                        whereClause += "(";

                                        whereClause += " filename like '%" + vv[i] + "%' or ";

                                        whereClause += " filerealname like '%" + vv[i] + "%' or ";

                                        whereClause += " fileclass like '%" + vv[i] + "%' or ";

                                        whereClause += " filesize like '%" + vv[i] + "%' or ";

                                        whereClause += " filetitle like '%" + vv[i] + "%' or ";

                                        whereClause += " filenote like '%" + vv[i] + "%' or ";

                                        whereClause += " fnumber like '%" + vv[i] + "%' or ";



                                        if (whereClause.length > 0)
                                        {
                                            whereClause = whereClause.substr(0, whereClause.length - 3);
                                        }
                                        whereClause += ") and ";
                                    }
                                }
                                if (whereClause.length > 0)
                                {
                                    whereClause = whereClause.substr(0, whereClause.length - 4);
                                }
                            }
                            that._whereClauseString = whereClause;
                        }


                        callBackFunction.success();
                    }
                    break;
                case "2":
                    {
                        if (that._pr_searchcontent.type2 != undefined)
                        {

                            var tbl_filescontent_modallist = that._pr_searchcontent.type2;



                            if (tbl_filescontent_modallist.filename.length > 0)
                            {
                                whereClause += " filename like '%" + tbl_filescontent_modallist.filename + "%' and ";
                            }


                            if (tbl_filescontent_modallist.filerealname.length > 0)
                            {
                                whereClause += " filerealname like '%" + tbl_filescontent_modallist.filerealname + "%' and ";
                            }


                            if (tbl_filescontent_modallist.fileclass.length > 0)
                            {
                                whereClause += " fileclass like '%" + tbl_filescontent_modallist.fileclass + "%' and ";
                            }


                            if (tbl_filescontent_modallist.filesize.length > 0)
                            {
                                whereClause += " filesize like '%" + tbl_filescontent_modallist.filesize + "%' and ";
                            }


                            if (tbl_filescontent_modallist.filetitle.length > 0)
                            {
                                whereClause += " filetitle like '%" + tbl_filescontent_modallist.filetitle + "%' and ";
                            }


                            if (tbl_filescontent_modallist.filenote.length > 0)
                            {
                                whereClause += " filenote like '%" + tbl_filescontent_modallist.filenote + "%' and ";
                            }


                            if (tbl_filescontent_modallist.fnumber.length > 0)
                            {
                                whereClause += " fnumber like '%" + tbl_filescontent_modallist.fnumber + "%' and ";
                            }



                            if (whereClause.length > 0)
                            {
                                whereClause = whereClause.substr(0, whereClause.length - 4);
                            }
                        }
                        that._whereClauseString = whereClause;
                        callBackFunction.success();
                    }
                    break;
            }
        },
        clearSearchData = function ()
        {
            switch (that._pr_searchtype)
            {
                case "1":
                    if (that._pr_searchcontent.type2 == undefined)
                    {
                        that._pr_searchcontent.type2 = new Object();
                    }


                    that._pr_searchcontent.type2.fk_maintable_sys_id = '';
                    controlObj.text('search_txt_fk_maintable_sys_id_tbl_filescontent_modallist', that._pr_searchcontent.type2.fk_maintable_sys_id);

                    that._pr_searchcontent.type2.fk_projclass_sys_id = '';
                    controlObj.text('search_txt_fk_projclass_sys_id_tbl_filescontent_modallist', that._pr_searchcontent.type2.fk_projclass_sys_id);

                    that._pr_searchcontent.type2.filename = '';
                    controlObj.text('search_txt_filename_tbl_filescontent_modallist', that._pr_searchcontent.type2.filename);

                    that._pr_searchcontent.type2.filerealname = '';
                    controlObj.text('search_txt_filerealname_tbl_filescontent_modallist', that._pr_searchcontent.type2.filerealname);

                    that._pr_searchcontent.type2.fileclass = '';
                    controlObj.text('search_txt_fileclass_tbl_filescontent_modallist', that._pr_searchcontent.type2.fileclass);

                    that._pr_searchcontent.type2.filesize = '';
                    controlObj.text('search_txt_filesize_tbl_filescontent_modallist', that._pr_searchcontent.type2.filesize);

                    that._pr_searchcontent.type2.filetitle = '';
                    controlObj.text('search_txt_filetitle_tbl_filescontent_modallist', that._pr_searchcontent.type2.filetitle);

                    that._pr_searchcontent.type2.filenote = '';
                    controlObj.text('search_txt_filenote_tbl_filescontent_modallist', that._pr_searchcontent.type2.filenote);

                    that._pr_searchcontent.type2.fnumber = '';
                    controlObj.text('search_txt_fnumber_tbl_filescontent_modallist', that._pr_searchcontent.type2.fnumber);




                    break;
                case "2":
                    if (that._pr_searchcontent.type1 == undefined)
                    {
                        that._pr_searchcontent.type1 = '';
                    }

                    $("#txt_command_search_tbl_filescontent_modallist").val('');
                    break;
            }

        },
        gridSelectedChange = function ()
        {
            if (that._pr_gridselectids == '')
            {
                // ul_gridselect  cc-badge-ul  cc-badge-p  cc-badge-a
                $('#btn_command_clearselect_tbl_filescontent_modallist').addClass('hidden');

            }
            else
            {
                $('#btn_command_clearselect_tbl_filescontent_modallist').removeClass('hidden');
                var allcount = that._pr_gridselectids.split('^').length;
                var currentcount = $('#table_grid_tbl_filescontent_modallist').bootstrapTable('getSelections').length;
                $('#btn_command_clearselect_tbl_filescontent_modallist .cc-badge-p').html(currentcount + '/' + allcount);
            }
        },
        initDetailControl = function (callBackFunction)
        {
            try
            {


                controlObj.fileuploaderinit('detail_txt_filerealname_tbl_filescontent_modallist', { isMultiple: true }, detail_txt_filerealname_onchange);//ok

                //模态窗口
                $('#div_detail_modal_tbl_filescontent_modallist').modal({
                    keyboard: false,
                    backdrop: 'static',
                    show: false
                });

                callBackFunction.success();
            }
            catch (ex)
            {
                _blockMessage.show('initDetailControl执行失败。<br/>' + ex.message, 'fail');
            }
        },
        setDetailData = function (callBackFunction)
        {

            var whereClause = ' sys_id = \'' + _sys_id + '\'';
            var orderByString = ' sys_id desc';
            var columnsString = 'sys_id^fk_maintable_sys_id^fk_projclass_sys_id^filename^filerealname^fileclass^filesize^filetitle^filenote^fnumber^sys_lastedituserid^sys_lasteditusername^sys_lasteditdate';

            var data = { whereString: whereClause, orderByString: orderByString, columnsString: columnsString, pageSizeString: '', pageIndexString: '', clientInf: _clientInf };

            doAjaxFunction(_serviceUrl, 'GetList', data, {
                success: function (result)
                {
                    try
                    {
                        var messageJson = (new Function("", "return " + result))();
                        var tbl_filescontent_modallist = messageJson.rows[0];

                        controlObj.text('detail_txt_fk_maintable_sys_id_tbl_filescontent_modallist', tbl_filescontent_modallist.fk_maintable_sys_id);

                        controlObj.text('detail_txt_fk_projclass_sys_id_tbl_filescontent_modallist', tbl_filescontent_modallist.fk_projclass_sys_id);

                        controlObj.text('detail_txt_filename_tbl_filescontent_modallist', tbl_filescontent_modallist.filename);

                        controlObj.fileuploaderbind('detail_txt_filerealname_tbl_filescontent_modallist', tbl_filescontent_modallist.filerealname);//ok

                        controlObj.text('detail_txt_fileclass_tbl_filescontent_modallist', tbl_filescontent_modallist.fileclass);

                        controlObj.text('detail_txt_filesize_tbl_filescontent_modallist', tbl_filescontent_modallist.filesize);

                        controlObj.text('detail_txt_filetitle_tbl_filescontent_modallist', tbl_filescontent_modallist.filetitle);

                        controlObj.text('detail_txt_filenote_tbl_filescontent_modallist', tbl_filescontent_modallist.filenote);

                        controlObj.text('detail_txt_fnumber_tbl_filescontent_modallist', tbl_filescontent_modallist.fnumber);



                        callBackFunction.success();
                    }
                    catch (ex)
                    {
                        _blockMessage.show('setDetailData执行失败。<br/>' + ex.message, 'fail');
                    }
                },
                fail: function (message)
                {
                    _blockMessage.show('setDetailData执行失败<br/>' + message, 'fail');
                }
            });


        },
        getDetailData = function (callBackFunction)
        {
            try
            {
                //高级查询
                var tbl_filescontent_modallist = new Object();

                tbl_filescontent_modallist.fk_maintable_sys_id = controlObj.text('detail_txt_fk_maintable_sys_id_tbl_filescontent_modallist');

                tbl_filescontent_modallist.fk_projclass_sys_id = controlObj.text('detail_txt_fk_projclass_sys_id_tbl_filescontent_modallist');

                tbl_filescontent_modallist.filename = controlObj.text('detail_txt_filename_tbl_filescontent_modallist');

                tbl_filescontent_modallist.filerealname = controlObj.fileuploaderid('detail_txt_filerealname_tbl_filescontent_modallist');//ok

                tbl_filescontent_modallist.fileclass = controlObj.text('detail_txt_fileclass_tbl_filescontent_modallist');

                tbl_filescontent_modallist.filesize = controlObj.text('detail_txt_filesize_tbl_filescontent_modallist');

                tbl_filescontent_modallist.filetitle = controlObj.text('detail_txt_filetitle_tbl_filescontent_modallist');

                tbl_filescontent_modallist.filenote = controlObj.text('detail_txt_filenote_tbl_filescontent_modallist');

                tbl_filescontent_modallist.fnumber = controlObj.text('detail_txt_fnumber_tbl_filescontent_modallist');



                callBackFunction.success(tbl_filescontent_modallist);
            }
            catch (ex)
            {
                _blockMessage.show('getSearchData执行失败。<br/>' + ex.message, 'fail');
            }
        },
        checkDetailData = function (tbl_filescontent_modallist, callBackFunction)
        {
            try
            {
                var errorMessageHansMap = new hashMap();
                var errorMessagePlacementHansMap = new hashMap();


                if (tbl_filescontent_modallist.fk_maintable_sys_id.length > 100)
                {
                    errorMessageHansMap.put('detail_txt_fk_maintable_sys_id_tbl_filescontent_modallist', '长度不能超过<a style="color:red">100</a>');
                    errorMessagePlacementHansMap.put('detail_txt_fk_maintable_sys_id_tbl_filescontent_modallist', 'top');
                }


                if (tbl_filescontent_modallist.fk_projclass_sys_id.length > 100)
                {
                    errorMessageHansMap.put('detail_txt_fk_projclass_sys_id_tbl_filescontent_modallist', '长度不能超过<a style="color:red">100</a>');
                    errorMessagePlacementHansMap.put('detail_txt_fk_projclass_sys_id_tbl_filescontent_modallist', 'top');
                }


                if (tbl_filescontent_modallist.filename.length > 100)
                {
                    errorMessageHansMap.put('detail_txt_filename_tbl_filescontent_modallist', '长度不能超过<a style="color:red">100</a>');
                    errorMessagePlacementHansMap.put('detail_txt_filename_tbl_filescontent_modallist', 'top');
                }


                if (tbl_filescontent_modallist.filerealname.length > 100)
                {
                    errorMessageHansMap.put('detail_txt_filerealname_tbl_filescontent_modallist', '长度不能超过<a style="color:red">100</a>');//ok
                    errorMessagePlacementHansMap.put('detail_txt_filerealname_tbl_filescontent_modallist', 'top');
                }


                if (tbl_filescontent_modallist.fileclass.length > 100)
                {
                    errorMessageHansMap.put('detail_txt_fileclass_tbl_filescontent_modallist', '长度不能超过<a style="color:red">100</a>');
                    errorMessagePlacementHansMap.put('detail_txt_fileclass_tbl_filescontent_modallist', 'top');
                }


                if (tbl_filescontent_modallist.filesize.length > 100)
                {
                    errorMessageHansMap.put('detail_txt_filesize_tbl_filescontent_modallist', '长度不能超过<a style="color:red">100</a>');
                    errorMessagePlacementHansMap.put('detail_txt_filesize_tbl_filescontent_modallist', 'top');
                }


                if (tbl_filescontent_modallist.filetitle.length > 100)
                {
                    errorMessageHansMap.put('detail_txt_filetitle_tbl_filescontent_modallist', '长度不能超过<a style="color:red">100</a>');
                    errorMessagePlacementHansMap.put('detail_txt_filetitle_tbl_filescontent_modallist', 'top');
                }

                if (tbl_filescontent_modallist.filetitle.length == 0)
                {
                    errorMessageHansMap.put('detail_txt_filetitle_tbl_filescontent_modallist', '不得为<a style="color:red">空</a>');
                    errorMessagePlacementHansMap.put('detail_txt_filetitle_tbl_filescontent_modallist', 'top');
                }


                if (tbl_filescontent_modallist.filenote.length > 100)
                {
                    errorMessageHansMap.put('detail_txt_filenote_tbl_filescontent_modallist', '长度不能超过<a style="color:red">100</a>');
                    errorMessagePlacementHansMap.put('detail_txt_filenote_tbl_filescontent_modallist', 'top');
                }


                if (tbl_filescontent_modallist.fnumber.length > 100)
                {
                    errorMessageHansMap.put('detail_txt_fnumber_tbl_filescontent_modallist', '长度不能超过<a style="color:red">100</a>');
                    errorMessagePlacementHansMap.put('detail_txt_fnumber_tbl_filescontent_modallist', 'top');
                }




                if (errorMessageHansMap.keys().length > 0)
                {
                    _validateMessage_detail.show(errorMessageHansMap, errorMessagePlacementHansMap, false);
                    callBackFunction.fail();
                }
                else
                {
                    _validateMessage_detail.hidden();
                    callBackFunction.success(tbl_filescontent_modallist);
                }
            }
            catch (ex)
            {
                _blockMessage.show('checkDetailData执行失败。<br/>' + ex.message, 'fail');
            }
        },
        clearDetailData = function (tbl_filescontent_modallist)
        {




            tbl_filescontent_modallist.fk_maintable_sys_id = '';
            controlObj.text('detail_txt_fk_maintable_sys_id_tbl_filescontent_modallist', tbl_filescontent_modallist.fk_maintable_sys_id);




            tbl_filescontent_modallist.fk_projclass_sys_id = '';
            controlObj.text('detail_txt_fk_projclass_sys_id_tbl_filescontent_modallist', tbl_filescontent_modallist.fk_projclass_sys_id);




            tbl_filescontent_modallist.filename = '';
            controlObj.text('detail_txt_filename_tbl_filescontent_modallist', tbl_filescontent_modallist.filename);




            tbl_filescontent_modallist.filerealname = '';
            controlObj.fileuploaderbind('detail_txt_filerealname_tbl_filescontent_modallist', tbl_filescontent_modallist.filerealname);//ok




            tbl_filescontent_modallist.fileclass = '';
            controlObj.text('detail_txt_fileclass_tbl_filescontent_modallist', tbl_filescontent_modallist.fileclass);




            tbl_filescontent_modallist.filesize = '';
            controlObj.text('detail_txt_filesize_tbl_filescontent_modallist', tbl_filescontent_modallist.filesize);




            tbl_filescontent_modallist.filetitle = '';
            controlObj.text('detail_txt_filetitle_tbl_filescontent_modallist', tbl_filescontent_modallist.filetitle);




            tbl_filescontent_modallist.filenote = '';
            controlObj.text('detail_txt_filenote_tbl_filescontent_modallist', tbl_filescontent_modallist.filenote);




            tbl_filescontent_modallist.fnumber = '';
            controlObj.text('detail_txt_fnumber_tbl_filescontent_modallist', tbl_filescontent_modallist.fnumber);




        },
        updateModel = function (tbl_filescontent_modallist, callbackFunction)
        {

            var d = new Date();
            var columns = 'sys_id^fk_maintable_sys_id^fk_projclass_sys_id^filename^filerealname^fileclass^filesize^filetitle^filenote^fnumber^sys_lastedituserid^sys_lasteditusername^sys_lasteditdate';
            var json = {
                sys_id: _sys_id,
                fk_maintable_sys_id: tbl_filescontent_modallist.fk_maintable_sys_id,
                fk_projclass_sys_id: tbl_filescontent_modallist.fk_projclass_sys_id,
                filename: tbl_filescontent_modallist.filename,
                filerealname: tbl_filescontent_modallist.filerealname,
                fileclass: tbl_filescontent_modallist.fileclass,
                filesize: tbl_filescontent_modallist.filesize,
                filetitle: tbl_filescontent_modallist.filetitle,
                filenote: tbl_filescontent_modallist.filenote,
                fnumber: tbl_filescontent_modallist.fnumber,
                sys_lasteditusername: basePageObj._userInfoJson.sys_username,
                sys_lastedituserid: basePageObj._userInfoJson.sys_userid,
                sys_lasteditdate: d.Format('yyyy-MM-dd hh:mm:ss')
            };

            var data = { columns: columns, clientInf: _clientInf, json: JSON.stringify(json) };

            doAjaxFunction(_serviceUrl, 'Update', data, {
                success: function (message)
                {
                    callbackFunction.success(tbl_filescontent_modallist);
                },
                fail: function (message)
                {
                    callbackFunction.fail(message);
                },
                error: function (message)
                {
                    _blockMessage.show(_serviceUrl + 'Update<br/>' + message, 'fail');
                }
            });
        },
        detail_txt_filerealname_onchange = function ()
        {

        },
        countfilesize_detail_modal = function ()
        {
            var filesize = controlObj.fileuploadercontent('detail_txt_filerealname_tbl_filescontent_modallist').length;
            controlObj.text('detail_txt_filesize_tbl_filescontent_modallist', filesize);
        }
    ;
    //===================public
    var that = {


        _pr_gridselectids: '',
        _pr_gridpageindex: 1,
        _pr_searchtype: '1',
        _pr_searchcontent: null,

        _pr_listtype: '',
        _pr_maintable_sys_id: '',
        _pr_projectclassid: '',
        _pr_projectclassdtl1: '',
        _pr_projectclassdtl2:'',

        _whereClauseString: '',

        init: function (callBackFunction)
        {
            try
            {

                //初始化参数
                initParameter({
                    success: function ()
                    {
                        //初始化search
                        initBaseCode({
                            success: function ()
                            {
                                initSearchControl({
                                    success: function ()
                                    {
                                        setSearchData({
                                            success: function ()
                                            {
                                                creatWhereClause({
                                                    success: function ()
                                                    {
                                                        initGrid({
                                                            success: function ()
                                                            {
                                                                initDetailControl({
                                                                    success: function ()
                                                                    {
                                                                        that.bindGrid({
                                                                            success: function ()
                                                                            {

                                                                                _validateMessage_search = new validateMessage('btn_search_modal_search_tbl_filescontent_modallist');
                                                                                _validateMessage_detail = new validateMessage('btn_detail_modal_save_tbl_filescontent_modallist');

                                                                                _ladda_btn_command_new = Ladda.create('btn_command_new_tbl_filescontent_modallist');
                                                                                _ladda_btn_command_delete = Ladda.create('btn_command_delete_tbl_filescontent_modallist');

                                                                                switch (that._pr_listtype)
                                                                                {
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
                                                                });

                                                            }
                                                        });

                                                    }
                                                });

                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });


            }
            catch (ex)
            {
                _blockMessage.show('程序初始化失败。<br/>' + ex.message, 'fail');
            }
        },

        bindGrid: function (callBackFunction)
        {
            setTimeout(function ()
            {
                var w = "  fk_maintable_sys_id ='" + that._pr_maintable_sys_id + "' and fk_projclass_sys_id='" + that._pr_projectclassid + "' ";

                var whereClause = (that._whereClauseString ? that._whereClauseString + ' and ' + w : w);

                var orderByString = ' sys_id desc';
                var columnsString = 'fk_maintable_sys_id^fk_projclass_sys_id^filename^filerealname^fileclass^filesize^filetitle^filenote^fnumber^sys_id';

                var data = { whereString: whereClause, orderByString: orderByString, columnsString: columnsString, pageSizeString: _pageSize, pageIndexString: that._pr_gridpageindex, clientInf: _clientInf };


                doAjaxFunction(_serviceUrl, 'GetList', data, {
                    success: function (result)
                    {
                        var messageJson = (new Function("", "return " + result))();

                        $('#table_grid_tbl_filescontent_modallist').bootstrapTable("loadJson", messageJson);

                        gridSelectedChange();
                        if (callBackFunction != undefined && callBackFunction != null)
                        {
                            callBackFunction.success();
                        }
                    },
                    fail: function (message)
                    {
                        _blockMessage.show('bindGrid执行失败<br/>' + message, 'fail');
                    }
                });
            }, 0);
        },



        btn_command_new_onclick: function ()
        {
            _ladda_btn_command_new.start();
            var d = new Date();

            var jsonString = {
                sys_delflag: 0,
                sys_lasteditusername: basePageObj._userInfoJson.sys_username,
                sys_lastedituserid: basePageObj._userInfoJson.sys_userid,
                sys_lasteditdate: d.Format('yyyy-MM-dd hh:mm:ss'),
                sys_creatdate: d.Format('yyyy-MM-dd hh:mm:ss'),
                sys_creatusername: basePageObj._userInfoJson.sys_username,
                sys_creatuserid: basePageObj._userInfoJson.sys_userid,
                fk_maintable_sys_id: that._pr_maintable_sys_id,
                fk_projclass_sys_id: that._pr_projectclassid,
                filerealname: controlObj.fileuploadernewfileid(),
                filesize: '0'
            };
            var data = { json: JSON.stringify(jsonString), clientInf: _clientInf };
            doAjaxFunction(_serviceUrl, 'Add', data, {
                success: function (result)
                {
                    _ladda_btn_command_new.stop();
                    _sys_id = result;
                    setDetailData({
                        success: function ()
                        {
                            $('#div_detail_modal_tbl_filescontent_modallist').modal('show');
                        }
                    });

                }, fail: function (message)
                {
                    _alertMessage.show('新建数据执行失败<br/>' + message, 'fail');
                    _ladda_btn_command_new.stop();
                }
            });
        },
        btn_command_delete_onclick: function ()
        {

            var allcount = that._pr_gridselectids.split('^').length;

            if (that._pr_gridselectids == '')
            {
                _alertMessage.show('至少选择一条数据!', 'warning', 1000);
            }
            else
            {
                var currentcount = $('#table_grid_tbl_filescontent_modallist').bootstrapTable('getSelections').length;
                var outercount = allcount - currentcount;
                var confirmContent = '<blockquote> ';
                confirmContent += '<h3>将对被选中的全部数据<a style="color:red">' + allcount + '</a>条进行<a style="color:red">删除</a></h4>';
                confirmContent += '其中<br/>';
                confirmContent += '<h5><a style="color:red">当前页</a>的数据<a style="color:red">' + currentcount + '</a>条<h4>';
                confirmContent += '<h5><a style="color:red">其他页</a>的数据<a style="color:red">' + outercount + '</a>条<h4>';
                confirmContent += '</blockquote> ';
                _confirmMessage.destory();
                _confirmMessage.show('删除确认？', confirmContent,
                           {
                               confirm: function ()
                               {
                                   _ladda_btn_command_delete.start();

                                   var whereClause = "sys_id in (\'" + that._pr_gridselectids.toString().replaceAll("^", "\',\'") + "\')";

                                   var data = { clientInf: _clientInf, whereString: whereClause };

                                   doAjaxFunction(_serviceUrl, 'Delete', data, {
                                       success: function (result)
                                       {
                                           var data = { clientInf: _clientInf, whereString: that._whereClauseString };

                                           doAjaxFunction(_serviceUrl, 'GetCount', data, {
                                               success: function (result)
                                               {
                                                   //判断当前页面是否有记录
                                                   var count = parseInt(result);
                                                   if (count < that._pr_gridpageindex * _pageSize)
                                                   {
                                                       that._pr_gridpageindex = Math.ceil(count / _pageSize);
                                                   }
                                                   if (that._pr_gridpageindex == 0)
                                                   {
                                                       that._pr_gridpageindex = 1;
                                                   }
                                                   //清空选择情况
                                                   that._pr_gridselectids = '';
                                                   that.bindGrid({
                                                       success: function ()
                                                       {
                                                           _ladda_btn_command_delete.stop();
                                                       }
                                                   });

                                               },
                                               fail: function (message)
                                               {
                                                   _alertMessage.show('数据删除完成，获取数据条数失败<br/>' + message, 'fail');
                                                   _ladda_btn_command_delete.stop();
                                               }
                                           });
                                       },
                                       fail: function (message)
                                       {
                                           _alertMessage.show('数据删除失败<br/>' + message, 'fail');
                                           _ladda_btn_command_delete.stop();
                                       }
                                   });
                               },
                               cancle: function ()
                               {
                                   _alertMessage.show('操作已取消', 'success', 1000);
                               }
                           });
            }
        },
        btn_command_search_onclick: function ()
        {
            try
            {
                switch (that._pr_searchtype)
                {
                    case "1":
                        getSearchData({
                            success: function ()
                            {
                                creatWhereClause({
                                    success: function ()
                                    {
                                        clearSearchData();

                                        that._pr_gridpageindex = '1';
                                        that._pr_gridselectids = '';
                                        that.bindGrid();
                                    }
                                });
                            }
                        });

                        break;
                    case "2":
                        that.btn_command_search_2_onclick();
                        break;
                }
            }
            catch (ex)
            {
                _alertMessage.show('查询失败<br/>' + ex.message, 'fail');
            }


        },
        btn_command_search_1_onclick: function ()
        {
            that._pr_searchtype = '1';
            $('#btn_command_search_tbl_filescontent_modallist').html('简单查询');
            $('#txt_command_search_tbl_filescontent_modallist').removeAttr('disabled');
        },
        btn_command_search_2_onclick: function ()
        {

            that._pr_searchtype = '2';
            $('#btn_command_search_tbl_filescontent_modallist').html('高级查询');
            $('#txt_command_search_tbl_filescontent_modallist').attr('disabled', 'disabled');

            $('#div_search_modal_tbl_filescontent_modallist').modal('show');
        },
        btn_search_modal_search_onclick: function ()
        {

            getSearchData({
                success: function ()
                {
                    checkSearchData({
                        success: function ()
                        {
                            creatWhereClause({
                                success: function ()
                                {

                                    clearSearchData();

                                    $('#div_search_modal_tbl_filescontent_modallist').modal('hide')
                                    that._pr_gridpageindex = '1';
                                    that._pr_gridselectids = '';
                                    that.bindGrid();
                                }
                            });
                        },
                        fail: function ()
                        {
                            //查询失败--高级查询控件输入内容错误
                        }
                    });
                }
            });


        },
        btn_search_modal_cancle_onclick: function ()
        {
            _validateMessage_search.hidden();
            $('#div_search_modal_tbl_filescontent_modallist').modal('hide');

            that._pr_searchtype = '1';
            $('#btn_command_search_tbl_filescontent_modallist').html('简单查询');
            $('#txt_command_search_tbl_filescontent_modallist').removeAttr('disabled');

        },
        btn_command_search_xs_onclick: function ()
        {
            that._pr_searchtype = '2';
            $('#btn_command_search_tbl_filescontent_modallist').html('高级查询');
            $('#txt_command_search_tbl_filescontent_modallist').attr('disabled', 'disabled');

            $('#div_search_modal_tbl_filescontent_modallist').modal('show');
        },
        btn_command_clearselect_onclick: function ()
        {
            $('#table_grid_tbl_filescontent_modallist').bootstrapTable('uncheckAll');
            that._pr_gridselectids = '';
            gridSelectedChange();
        },


        btn_detail_modal_save_onclick: function ()
        {

            countfilesize_detail_modal();
            getDetailData({
                success: function (tbl_filescontent_modallist)
                {
                    checkDetailData(tbl_filescontent_modallist, {
                        success: function (tbl_filescontent_modallist)
                        {

                            updateModel(tbl_filescontent_modallist, {
                                success: function (tbl_filescontent_modallist)
                                {
                                    clearDetailData(tbl_filescontent_modallist);


                                    $('#div_detail_modal_tbl_filescontent_modallist').modal('hide')
                                    that.bindGrid();
                                },
                                fail: function ()
                                {

                                }
                            });

                        },
                        fail: function ()
                        {

                        }
                    });
                }
            });
        },

        btn_detail_modal_cancle_onclick: function ()
        {
            $('#div_detail_modal_tbl_filescontent_modallist').modal('hide');
            _validateMessage_detail.hidden();
            that.bindGrid();
        },

    };
    return that;
})();
