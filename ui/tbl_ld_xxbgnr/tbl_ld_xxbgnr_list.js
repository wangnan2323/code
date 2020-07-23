
var _pr_appcode = '';
var _clientInf = '{userid:"",appcode:"",appname:"",userip:"",usermac:"",username:""}';
var _blockMessage = null;
var _alertMessage = null;
var _resultMessage = null;
var _confirmMessage = null;

var tbl_ld_xxbgnr_list_Obj = (function ()
{
    'use strict';

    //=================================================================================
    //                                      私有
    //=================================================================================
    //=================================================================================
    //                                      私有属性 
    //=================================================================================

    var _serviceUrl = 'http://127.0.0.1/sara.dd.ldsw/service/service_tbl_ld_xxbgnr.asmx/',

    //Grid控件的分页参数，设置为空即可实现不分页
    _pageSize = '20',

    //Code数据存储容器
    _baseCodeHashMap = null,

    _validateMessage = null,

    _ladda_btn_command_export = null,

    //查询sql语句
    _whereClauseString = '',


    //=================================================================================
    //                                      私有方法 
    //=================================================================================
    /* 
    *  
    *  方法:initParameter
    *  参数:callbackFunction
    *  初始化页面参数
    */
    initParameter = function (callBackFunction)
    {
        try
        {
            that._pr_listtype = requestQuery('listtype');
            _pr_appcode = requestQuery('appcode');
            that._pr_gridselectids = requestQuery('gridselectids');
            that._pr_gridpageindex = requestQuery('gridpageIndex');
            that._pr_searchtype = requestQuery('searchtype');
            that._pr_searchcontent = requestQuery('searchcontent');
            _clientInf = '{userid:"' + basePageObj._userInfoJson.sys_userid + '",appcode:"' + _pr_appcode + '",appname:"",userip:"' + basePageObj._userInfoJson.ip + '",usermac:"' + basePageObj._userInfoJson.mac + '",username:"' + basePageObj._userInfoJson.sys_username + '"}';

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
                    $('#btn_command_search_tbl_ld_xxbgnr_list').html('简单查询');
                    $('#txt_command_search_tbl_ld_xxbgnr_list').removeAttr("disabled");

                    break;
                case "2":
                    $('#btn_command_search_tbl_ld_xxbgnr_list').html('高级查询');
                    $('#txt_command_search_tbl_ld_xxbgnr_list').attr("disabled", true);
                    break;
            }


            if (that._pr_listtype == null || that._pr_listtype == '' || that._pr_listtype == 'null')
            {
                _blockMessage.show('listtype参数接收失败...', 'fail');
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

    /* 
    *  
    *  方法:initGrid
    *  参数:callbackFunction
    *  初始化Grid控件
    */
    initGrid = function (callBackFunction)
    {
        try
        {
            //根据页面情况设置Grid的高度
            var gridHeight = 0;
            if ($(window).width() < basePageObj._limSrceenWidth)
            {
                gridHeight = $(window).height() - 320;
                if (gridHeight < 950)
                {
                    gridHeight = 950;
                }
            }
            else
            {
                gridHeight = $(window).height() - 240;
            }

            $('#table_grid_tbl_ld_xxbgnr_list').bootstrapTable({
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
                    field: 'sys_id', title: 'sys_id',
                    align: 'center',
                    "class": 'hidden',
                    valign: 'middle',
                    visible: true,
                    sortable: true
                },

                                
										

			
		                        
										
			 {
             field: 'f_value3', title: '备用字段3', 
visible:false,
             "class": 'cc-hidden-sm  cc-hidden-xs',
             align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
             formatter: function (value, row, index) { return value; }
             },  
			
		                        
										
			 {
             field: 'f_value4', title: '备用字段4', 
visible:false,
             "class": 'cc-hidden-sm  cc-hidden-xs',
             align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
             formatter: function (value, row, index) { return value; }
             },  
			
		                        
										
			 {
             field: 'f_value5', title: '备用字段5', 
visible:false,
             "class": 'cc-hidden-sm  cc-hidden-xs',
             align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
             formatter: function (value, row, index) { return value; }
             },  
			
		                        
										
			 {
             field: 'f_value6', title: '备用字段6', 
visible:false,
             "class": 'cc-hidden-sm  cc-hidden-xs',
             align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
             formatter: function (value, row, index) { return value; }
             },  
			
		                        
										
			 {
             field: 'f_value7', title: '备用字段7', 
visible:false,
             "class": 'cc-hidden-sm  cc-hidden-xs',
             align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
             formatter: function (value, row, index) { return value; }
             },  
			
		                        
										
			 {
             field: 'f_value8', title: '备用字段8', 
visible:false,
             "class": 'cc-hidden-sm  cc-hidden-xs',
             align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
             formatter: function (value, row, index) { return value; }
             },  
			
		                        
										
			 {
             field: 'f_value9', title: '备用字段9', 
visible:false,
             "class": 'cc-hidden-sm  cc-hidden-xs',
             align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
             formatter: function (value, row, index) { return value; }
             },  
			
		                        
										
			 {
             field: 'f_value10', title: '备用字段10', 
visible:false,
             "class": 'cc-hidden-sm  cc-hidden-xs',
             align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
             formatter: function (value, row, index) { return value; }
             },  
			
		      			 {
		      			     field: 'f_value1', title: '客户编号',
		      			     "class": 'cc-hidden-sm  cc-hidden-xs',
		      			     align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
		      			     formatter: function (value, row, index)
		      			     {
		      			         return value;
		      			     }
		      			 },
                         		      			 {
                         		      			     field: 'f_value2', title: '客户信息',
                         		      			     "class": 'cc-hidden-sm  cc-hidden-xs',
                         		      			     align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                         		      			     formatter: function (value, row, index)
                         		      			     {
                         		      			         return value;
                         		      			     }
                         		      			 },
										
			 {
             field: 'f_bgnr', title: '变更内容', 
             "class": 'cc-hidden-sm  cc-hidden-xs',
             align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
             formatter: function (value, row, index) { return value; }
             },  
			
		                        
										
			 {
             field: 'f_bgnrid', title: '变更内容id', 
             "class": 'hidden',
             align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
             formatter: function (value, row, index) { return value; }
             },  
			
		                        
										
			 {
             field: 'f_singledropdowngroup_dy_old', title: 'singledropdowngroup', 
             "class": 'hidden',
             align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
             formatter: function (value, row, index) { return value; }
             },  
			
		                        
										
			 {
             field: 'f_singledropdowngroup_dy_oldid', title: 'singledropdowngroupid', 
             "class": 'hidden',
             align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
             formatter: function (value, row, index) { return value; }
             },  
			
		                        
										
			 {
             field: 'f_singledropdowngroup_sc_old', title: 'singledropdowngroup', 
             "class": 'hidden',
             align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
             formatter: function (value, row, index) { return value; }
             },  
			
		                        
										
			 {
             field: 'f_singledropdowngroup_sc_oldid', title: 'singledropdowngroupid', 
             "class": 'hidden',
             align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
             formatter: function (value, row, index) { return value; }
             },  
			
		                        
										
			 {
             field: 'f_singledropdowngroup_qy_old', title: 'singledropdowngroup', 
             "class": 'hidden',
             align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
             formatter: function (value, row, index) { return value; }
             },  
			
		                        
										
			 {
             field: 'f_singledropdowngroup_qy_oldid', title: 'singledropdowngroupid', 
             "class": 'hidden',
             align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
             formatter: function (value, row, index) { return value; }
             },  
			
		                        
										
			 {
             field: 'f_singledropdowngroup_pq_old', title: 'singledropdowngroup', 
             "class": 'hidden',
             align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
             formatter: function (value, row, index) { return value; }
             },  
			
		                        
										
			 {
             field: 'f_singledropdowngroup_pq_oldid', title: 'singledropdowngroupid', 
             "class": 'hidden',
             align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
             formatter: function (value, row, index) { return value; }
             },  
			
		                        
										
			 {
             field: 'f_singledropdowngroup_dy_new', title: 'singledropdowngroup', 
             "class": 'hidden',
             align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
             formatter: function (value, row, index) { return value; }
             },  
			
		                        
										
			 {
             field: 'f_singledropdowngroup_dy_newid', title: 'singledropdowngroupid', 
             "class": 'hidden',
             align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
             formatter: function (value, row, index) { return value; }
             },  
			
		                        
										
			 {
             field: 'f_singledropdowngroup_sc_new', title: 'singledropdowngroup', 
             "class": 'hidden',
             align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
             formatter: function (value, row, index) { return value; }
             },  
			
		                        
										
			 {
             field: 'f_singledropdowngroup_sc_newid', title: 'singledropdowngroupid', 
             "class": 'hidden',
             align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
             formatter: function (value, row, index) { return value; }
             },  
			
		                        
										
			 {
             field: 'f_singledropdowngroup_qy_new', title: 'singledropdowngroup', 
             "class": 'hidden',
             align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
             formatter: function (value, row, index) { return value; }
             },  
			
		                        
										
			 {
             field: 'f_singledropdowngroup_qy_newid', title: 'singledropdowngroupid', 
             "class": 'hidden',
             align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
             formatter: function (value, row, index) { return value; }
             },  
			
		                        
										
			 {
             field: 'f_singledropdowngroup_pq_new', title: 'singledropdowngroup', 
             "class": 'hidden',
             align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
             formatter: function (value, row, index) { return value; }
             },  
			
		                        
										
			 {
             field: 'f_singledropdowngroup_pq_newid', title: 'singledropdowngroupid', 
             "class": 'hidden',
             align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
             formatter: function (value, row, index) { return value; }
             },  
			
		                        
										
			 {
             field: 'f_text_old', title: '变更前', 
             align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
             formatter: function (value, row, index) { return value; }
             },  
			
		                        
										
			 {
             field: 'f_text_new', title: '变更后', 
             align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
             formatter: function (value, row, index) { return value; }
             },  
			
		                        
										
			 {
             field: 'f_singledropdownlist_old', title: 'singledropdownlist', 
             "class": 'hidden',
             align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
             formatter: function (value, row, index) { return value; }
             },  
			
		                        
										
			 {
             field: 'f_singledropdownlist_oldid', title: 'singledropdownlistid', 
             "class": 'hidden',
             align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
             formatter: function (value, row, index) { return value; }
             },  
			
		                        
										
			 {
             field: 'f_singledropdownlist_new', title: 'singledropdownlist', 
             "class": 'hidden',
             align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
             formatter: function (value, row, index) { return value; }
             },  
			
		                        
										
			 {
             field: 'f_singledropdownlist_newid', title: 'singledropdownlistid', 
             "class": 'hidden',
             align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
             formatter: function (value, row, index) { return value; }
             },  
			
		                        
										
			 {
             field: 'f_multidropdownlist_old', title: 'multidropdownlist', 
             "class": 'hidden',
             align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
             formatter: function (value, row, index) { return value; }
             },  
			
		                        
										
			 {
             field: 'f_multidropdownlist_oldid', title: 'multidropdownlistid', 
             "class": 'hidden',
             align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
             formatter: function (value, row, index) { return value; }
             },  
			
		                        
										
			 {
             field: 'f_multidropdownlist_new', title: 'multidropdownlist', 
             "class": 'hidden',
             align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
             formatter: function (value, row, index) { return value; }
             },  
			
		                        
										
			 {
             field: 'f_multidropdownlist_newid', title: 'multidropdownlistid', 
             "class": 'hidden',
             align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
             formatter: function (value, row, index) { return value; }
             },  
			
		                        
						 {
             field: 'f_datetime_old', title: 'datetime', 
             "class": 'hidden',
             align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
             formatter: function (value, row, index)
                    {
                       //如果日期为1900-1-1则默认显示为空
                       var d = value.toDateTime().Format("yyyy-MM-dd hh:mm:ss");
                        if (d == '1900-01-01 00:00:00')
                        {
                            return "&nbsp;&nbsp;";
                        }
                        else
                        {
                            return d;
                        }
                    }
             },  
			
		                        
						 {
             field: 'f_datetime_new', title: 'datetime', 
             "class": 'hidden',
             align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
             formatter: function (value, row, index)
                    {
                       //如果日期为1900-1-1则默认显示为空
                       var d = value.toDateTime().Format("yyyy-MM-dd hh:mm:ss");
                        if (d == '1900-01-01 00:00:00')
                        {
                            return "&nbsp;&nbsp;";
                        }
                        else
                        {
                            return d;
                        }
                    }
             },  
			
		                        
						 {
             field: 'f_datetimetime_old', title: 'datetime_time', 
             "class": 'hidden',
             align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
             formatter: function (value, row, index)
                    {
                       //如果日期为1900-1-1则默认显示为空
                       var d = value.toDateTime().Format("yyyy-MM-dd hh:mm:ss");
                        if (d == '1900-01-01 00:00:00')
                        {
                            return "&nbsp;&nbsp;";
                        }
                        else
                        {
                            return d;
                        }
                    }
             },  
			
		                        
						 {
             field: 'f_datetimetime_new', title: 'datetime_time', 
             "class": 'hidden',
             align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
             formatter: function (value, row, index)
                    {
                       //如果日期为1900-1-1则默认显示为空
                       var d = value.toDateTime().Format("yyyy-MM-dd hh:mm:ss");
                        if (d == '1900-01-01 00:00:00')
                        {
                            return "&nbsp;&nbsp;";
                        }
                        else
                        {
                            return d;
                        }
                    }
             },  
			
		                        
										
			 {
             field: 'f_toggle_old', title: 'toggle', 
             "class": 'hidden',
             align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
             formatter: function (value, row, index) { return value; }
             },  
			
		                        
										
			 {
             field: 'f_toggle_new', title: 'toggle', 
             "class": 'hidden',
             align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
             formatter: function (value, row, index) { return value; }
             },  
			
		                        
										
			 {
             field: 'f_textarea_old', title: 'textarea', 
             "class": 'hidden',
             align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
             formatter: function (value, row, index) { return value; }
             },  
			
		                        
										
			 {
             field: 'f_textarea_new', title: 'textarea', 
             "class": 'hidden',
             align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
             formatter: function (value, row, index) { return value; }
             }  
			
		

              
                ],
                onPageChange: function (size, number)
                {
                    that._pr_gridpageindex = number;
                    that.bindGrid();
                },
                rowStyle: function (row, index)
                {
                    //可以根据数据情况设置行的背景颜色。
                    //return {classes: 'active'//'success'//'info'//'warning' //'danger'};

                    return {};
                },
                onLoadSuccess: function (data)
                {
                    //grid绑定完成后触发此事件
                },
                //当列头复选框被选中时，触发此事件，选中项ID存储在_pr_gridselectids中
                onCheck: function (row)
                {
                    that._pr_gridselectids += '^' + row.sys_id;
                    that._pr_gridselectids = that._pr_gridselectids.trimStartEnd('^');

                    gridSelectedChange();
                },
                //当列头复选框被反选中时，触发此事件，选中项ID存储在_pr_gridselectids中
                onUncheck: function (row)
                {
                    that._pr_gridselectids = ('^' + that._pr_gridselectids + '^').replaceAll('^' + row.sys_id + '^', '^');
                    that._pr_gridselectids = that._pr_gridselectids.trimStartEnd('^');

                    gridSelectedChange();
                },
                //当列头复选框被全选中时，触发此事件，选中项ID存储在_pr_gridselectids中
                onCheckAll: function ()
                {
                    //获取当前grid中全部选中的行
                    var rows = $('#table_grid_tbl_ld_xxbgnr_list').bootstrapTable('getSelections');
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
                //当列头复选框被全反选中时，触发此事件，选中项ID存储在_pr_gridselectids中
                onUncheckAll: function ()
                {
                    var rows = $('#table_grid_tbl_ld_xxbgnr_list').bootstrapTable('getData');
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

    /* 
    *  
    *  方法:setDisable
    *  参数:isDisable
    *  设置页面控件只读情况
    */
    setDisable = function (isDisable)
    {
        if (isDisable)
        {
            $('#btn_command_new_tbl_ld_xxbgnr_list').addClass('hidden');
            $('#btn_command_delete_tbl_ld_xxbgnr_list').addClass('hidden');
        }
        else
        {

            $('#btn_command_new_tbl_ld_xxbgnr_list').removeClass('hidden');
            $('#btn_command_delete_tbl_ld_xxbgnr_list').removeClass('hidden');
        }
    },

    /* 
    *  
    *  方法:transToDetailPage
    *  参数:id, pagetype
    *  跳页方法
    */
    transToDetailPage = function (id, pagetype)
    {


        var url = '../tbl_ld_xxbgnr/tbl_ld_xxbgnr_detail.html';
        url += '?uid=' + basePageObj._userInfoJson.sys_userid;
        url += '&sys_id=' + id;
        url += '&pagetype=' + pagetype;
        url += '&appcode=' + _pr_appcode;
        url += '&fromurl=../tbl_ld_xxbgnr/tbl_ld_xxbgnr_list.html';
        url += '&fromurlparam={';
        url += '"appcode":"' + _pr_appcode + '",';
        url += '"listtype":"' + that._pr_listtype + '",';
        url += '"gridselectids":"' + that._pr_gridselectids + '",';
        url += '"gridpageindex":"' + that._pr_gridpageindex + '",';
        url += '"searchtype":"' + that._pr_searchtype + '",';
        url += '"searchcontent":' + JSON.stringify(that._pr_searchcontent)+ '';
        url += '}';
        commonObj.changeUrl(url, 'right-show');
    },

    //---------------------------------------------------------------------------------
    // ---------------------------------SearchModel------------------------------------
    //---------------------------------------------------------------------------------
    /* 
    *  
    *  方法:initSearchBaseCode
    *  参数:callBackFunction
    *  初始化高级查询model用到Code内容，存储在_baseCodeHashMap中
    */
    initSearchBaseCode = function (callBackFunction)
    {
        commonObj.getCodeServiceJson('0313', {
            success: function (resultArray)
            {
                try
                {
                    _baseCodeHashMap = new hashMap();

                    _baseCodeHashMap.put('servicecode_0108', resultArray['0313']);

                    _baseCodeHashMap.put('servicecode_array', ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Dakota", "North Carolina", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"]);

                    callBackFunction.success();
                }
                catch (ex)
                {
                    _blockMessage.show('initBaseCode执行失败。<br/>' + ex.message, 'fail');
                }
            }
        });

    },

    /* 
    *  
    *  方法:initSearchControl
    *  参数:callBackFunction
    *  初始化高级查询model控件，会用到_baseCodeHashMap
    */
    initSearchControl = function (callBackFunction)
    {
        try
        {
            //单选下拉列表--采用复选模式
            var resultArray = _baseCodeHashMap.get('servicecode_0108');
            var toggleArray = [{ id: 'true', text: '开' }, { id: 'false', text: '关' }];

	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		
	
						controlObj.datetimeinit('search_datetime_f_datetime_old_tbl_ld_xxbgnr_list_datefrom', 'search_datetime_f_datetime_old_tbl_ld_xxbgnr_list_timefrom');     
			controlObj.datetimeinit('search_datetime_f_datetime_old_tbl_ld_xxbgnr_list_dateto', 'search_datetime_f_datetime_old_tbl_ld_xxbgnr_list_timeto');     
			
			controlObj.datetime('search_datetime_f_datetime_old_tbl_ld_xxbgnr_list_datefrom', 'search_datetime_f_datetime_old_tbl_ld_xxbgnr_list_timefrom', '1900-01-01 00:00:00');
			controlObj.datetime('search_datetime_f_datetime_old_tbl_ld_xxbgnr_list_dateto', 'search_datetime_f_datetime_old_tbl_ld_xxbgnr_list_timeto', '1900-01-01 00:00:00');          
		
	
						controlObj.datetimeinit('search_datetime_f_datetime_new_tbl_ld_xxbgnr_list_datefrom', 'search_datetime_f_datetime_new_tbl_ld_xxbgnr_list_timefrom');     
			controlObj.datetimeinit('search_datetime_f_datetime_new_tbl_ld_xxbgnr_list_dateto', 'search_datetime_f_datetime_new_tbl_ld_xxbgnr_list_timeto');     
			
			controlObj.datetime('search_datetime_f_datetime_new_tbl_ld_xxbgnr_list_datefrom', 'search_datetime_f_datetime_new_tbl_ld_xxbgnr_list_timefrom', '1900-01-01 00:00:00');
			controlObj.datetime('search_datetime_f_datetime_new_tbl_ld_xxbgnr_list_dateto', 'search_datetime_f_datetime_new_tbl_ld_xxbgnr_list_timeto', '1900-01-01 00:00:00');          
		
	
						controlObj.datetimeinit('search_datetime_f_datetimetime_old_tbl_ld_xxbgnr_list_datefrom', 'search_datetime_f_datetimetime_old_tbl_ld_xxbgnr_list_timefrom');     
			controlObj.datetimeinit('search_datetime_f_datetimetime_old_tbl_ld_xxbgnr_list_dateto', 'search_datetime_f_datetimetime_old_tbl_ld_xxbgnr_list_timeto');     
			
			controlObj.datetime('search_datetime_f_datetimetime_old_tbl_ld_xxbgnr_list_datefrom', 'search_datetime_f_datetimetime_old_tbl_ld_xxbgnr_list_timefrom', '1900-01-01 00:00:00');
			controlObj.datetime('search_datetime_f_datetimetime_old_tbl_ld_xxbgnr_list_dateto', 'search_datetime_f_datetimetime_old_tbl_ld_xxbgnr_list_timeto', '1900-01-01 00:00:00');          
		
	
						controlObj.datetimeinit('search_datetime_f_datetimetime_new_tbl_ld_xxbgnr_list_datefrom', 'search_datetime_f_datetimetime_new_tbl_ld_xxbgnr_list_timefrom');     
			controlObj.datetimeinit('search_datetime_f_datetimetime_new_tbl_ld_xxbgnr_list_dateto', 'search_datetime_f_datetimetime_new_tbl_ld_xxbgnr_list_timeto');     
			
			controlObj.datetime('search_datetime_f_datetimetime_new_tbl_ld_xxbgnr_list_datefrom', 'search_datetime_f_datetimetime_new_tbl_ld_xxbgnr_list_timefrom', '1900-01-01 00:00:00');
			controlObj.datetime('search_datetime_f_datetimetime_new_tbl_ld_xxbgnr_list_dateto', 'search_datetime_f_datetimetime_new_tbl_ld_xxbgnr_list_timeto', '1900-01-01 00:00:00');          
		
	
											          
		
	
											          
		
	
											          
		
	
											          
		 
       

            //模态窗口
            $('#div_search_modal_tbl_ld_xxbgnr_list').modal({
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

    // ---------------------------------Model操作------------------------------------
    /* 
    *  
    *  方法:setSearchModel
    *  参数:callBackFunction
    *  根据_pr_searchcontent设置查询model的内容
    */
    setSearchModel = function (callBackFunction)
    {
        try
        {
            switch (that._pr_searchtype)
            {
                case "1":
                    if (that._pr_searchcontent.type1 != undefined)
                    {
                        //简单查询
                        $("#txt_command_search_tbl_ld_xxbgnr_list").val(that._pr_searchcontent.type1);
                    }

                    break;
                case "2":
                    if (that._pr_searchcontent.type2 != undefined)
                    {
                        //高级查询
                        var tbl_ld_xxbgnr_list = that._pr_searchcontent.type2;

        	
						controlObj.text('search_txt_f_value1_tbl_ld_xxbgnr_list', tbl_ld_xxbgnr_list.f_value1);          
			
						controlObj.text('search_txt_f_value2_tbl_ld_xxbgnr_list', tbl_ld_xxbgnr_list.f_value2);          
			
						controlObj.text('search_txt_f_value3_tbl_ld_xxbgnr_list', tbl_ld_xxbgnr_list.f_value3);          
			
						controlObj.text('search_txt_f_value4_tbl_ld_xxbgnr_list', tbl_ld_xxbgnr_list.f_value4);          
			
						controlObj.text('search_txt_f_value5_tbl_ld_xxbgnr_list', tbl_ld_xxbgnr_list.f_value5);          
			
						controlObj.text('search_txt_f_value6_tbl_ld_xxbgnr_list', tbl_ld_xxbgnr_list.f_value6);          
			
						controlObj.text('search_txt_f_value7_tbl_ld_xxbgnr_list', tbl_ld_xxbgnr_list.f_value7);          
			
						controlObj.text('search_txt_f_value8_tbl_ld_xxbgnr_list', tbl_ld_xxbgnr_list.f_value8);          
			
						controlObj.text('search_txt_f_value9_tbl_ld_xxbgnr_list', tbl_ld_xxbgnr_list.f_value9);          
			
						controlObj.text('search_txt_f_value10_tbl_ld_xxbgnr_list', tbl_ld_xxbgnr_list.f_value10);          
			
						controlObj.text('search_txt_f_bgnr_tbl_ld_xxbgnr_list', tbl_ld_xxbgnr_list.f_bgnr);          
			
						controlObj.text('search_txt_f_bgnrid_tbl_ld_xxbgnr_list', tbl_ld_xxbgnr_list.f_bgnrid);          
			
						controlObj.text('search_txt_f_singledropdowngroup_dy_old_tbl_ld_xxbgnr_list', tbl_ld_xxbgnr_list.f_singledropdowngroup_dy_old);          
			
						controlObj.text('search_txt_f_singledropdowngroup_dy_oldid_tbl_ld_xxbgnr_list', tbl_ld_xxbgnr_list.f_singledropdowngroup_dy_oldid);          
			
						controlObj.text('search_txt_f_singledropdowngroup_sc_old_tbl_ld_xxbgnr_list', tbl_ld_xxbgnr_list.f_singledropdowngroup_sc_old);          
			
						controlObj.text('search_txt_f_singledropdowngroup_sc_oldid_tbl_ld_xxbgnr_list', tbl_ld_xxbgnr_list.f_singledropdowngroup_sc_oldid);          
			
						controlObj.text('search_txt_f_singledropdowngroup_qy_old_tbl_ld_xxbgnr_list', tbl_ld_xxbgnr_list.f_singledropdowngroup_qy_old);          
			
						controlObj.text('search_txt_f_singledropdowngroup_qy_oldid_tbl_ld_xxbgnr_list', tbl_ld_xxbgnr_list.f_singledropdowngroup_qy_oldid);          
			
						controlObj.text('search_txt_f_singledropdowngroup_pq_old_tbl_ld_xxbgnr_list', tbl_ld_xxbgnr_list.f_singledropdowngroup_pq_old);          
			
						controlObj.text('search_txt_f_singledropdowngroup_pq_oldid_tbl_ld_xxbgnr_list', tbl_ld_xxbgnr_list.f_singledropdowngroup_pq_oldid);          
			
						controlObj.text('search_txt_f_singledropdowngroup_dy_new_tbl_ld_xxbgnr_list', tbl_ld_xxbgnr_list.f_singledropdowngroup_dy_new);          
			
						controlObj.text('search_txt_f_singledropdowngroup_dy_newid_tbl_ld_xxbgnr_list', tbl_ld_xxbgnr_list.f_singledropdowngroup_dy_newid);          
			
						controlObj.text('search_txt_f_singledropdowngroup_sc_new_tbl_ld_xxbgnr_list', tbl_ld_xxbgnr_list.f_singledropdowngroup_sc_new);          
			
						controlObj.text('search_txt_f_singledropdowngroup_sc_newid_tbl_ld_xxbgnr_list', tbl_ld_xxbgnr_list.f_singledropdowngroup_sc_newid);          
			
						controlObj.text('search_txt_f_singledropdowngroup_qy_new_tbl_ld_xxbgnr_list', tbl_ld_xxbgnr_list.f_singledropdowngroup_qy_new);          
			
						controlObj.text('search_txt_f_singledropdowngroup_qy_newid_tbl_ld_xxbgnr_list', tbl_ld_xxbgnr_list.f_singledropdowngroup_qy_newid);          
			
						controlObj.text('search_txt_f_singledropdowngroup_pq_new_tbl_ld_xxbgnr_list', tbl_ld_xxbgnr_list.f_singledropdowngroup_pq_new);          
			
						controlObj.text('search_txt_f_singledropdowngroup_pq_newid_tbl_ld_xxbgnr_list', tbl_ld_xxbgnr_list.f_singledropdowngroup_pq_newid);          
			
						controlObj.text('search_txt_f_text_old_tbl_ld_xxbgnr_list', tbl_ld_xxbgnr_list.f_text_old);          
			
						controlObj.text('search_txt_f_text_new_tbl_ld_xxbgnr_list', tbl_ld_xxbgnr_list.f_text_new);          
			
						controlObj.text('search_txt_f_singledropdownlist_old_tbl_ld_xxbgnr_list', tbl_ld_xxbgnr_list.f_singledropdownlist_old);          
			
						controlObj.text('search_txt_f_singledropdownlist_oldid_tbl_ld_xxbgnr_list', tbl_ld_xxbgnr_list.f_singledropdownlist_oldid);          
			
						controlObj.text('search_txt_f_singledropdownlist_new_tbl_ld_xxbgnr_list', tbl_ld_xxbgnr_list.f_singledropdownlist_new);          
			
						controlObj.text('search_txt_f_singledropdownlist_newid_tbl_ld_xxbgnr_list', tbl_ld_xxbgnr_list.f_singledropdownlist_newid);          
			
						controlObj.text('search_txt_f_multidropdownlist_old_tbl_ld_xxbgnr_list', tbl_ld_xxbgnr_list.f_multidropdownlist_old);          
			
						controlObj.text('search_txt_f_multidropdownlist_oldid_tbl_ld_xxbgnr_list', tbl_ld_xxbgnr_list.f_multidropdownlist_oldid);          
			
						controlObj.text('search_txt_f_multidropdownlist_new_tbl_ld_xxbgnr_list', tbl_ld_xxbgnr_list.f_multidropdownlist_new);          
			
						controlObj.text('search_txt_f_multidropdownlist_newid_tbl_ld_xxbgnr_list', tbl_ld_xxbgnr_list.f_multidropdownlist_newid);          
			
						
			controlObj.datetime('search_datetime_f_datetime_old_tbl_ld_xxbgnr_list_datefrom', 'search_datetime_f_datetime_old_tbl_ld_xxbgnr_listtimefrom', tbl_ld_xxbgnr_list.f_datetime_oldfrom);
			controlObj.datetime('search_datetime_f_datetime_old_tbl_ld_xxbgnr_list_dateto', 'search_datetime_f_datetime_old_tbl_ld_xxbgnr_list_timeto', tbl_ld_xxbgnr_list.f_datetime_oldto);
			            
			
						
			controlObj.datetime('search_datetime_f_datetime_new_tbl_ld_xxbgnr_list_datefrom', 'search_datetime_f_datetime_new_tbl_ld_xxbgnr_listtimefrom', tbl_ld_xxbgnr_list.f_datetime_newfrom);
			controlObj.datetime('search_datetime_f_datetime_new_tbl_ld_xxbgnr_list_dateto', 'search_datetime_f_datetime_new_tbl_ld_xxbgnr_list_timeto', tbl_ld_xxbgnr_list.f_datetime_newto);
			            
			
						
			controlObj.datetime('search_datetime_f_datetimetime_old_tbl_ld_xxbgnr_list_datefrom', 'search_datetime_f_datetimetime_old_tbl_ld_xxbgnr_listtimefrom', tbl_ld_xxbgnr_list.f_datetimetime_oldfrom);
			controlObj.datetime('search_datetime_f_datetimetime_old_tbl_ld_xxbgnr_list_dateto', 'search_datetime_f_datetimetime_old_tbl_ld_xxbgnr_list_timeto', tbl_ld_xxbgnr_list.f_datetimetime_oldto);
			            
			
						
			controlObj.datetime('search_datetime_f_datetimetime_new_tbl_ld_xxbgnr_list_datefrom', 'search_datetime_f_datetimetime_new_tbl_ld_xxbgnr_listtimefrom', tbl_ld_xxbgnr_list.f_datetimetime_newfrom);
			controlObj.datetime('search_datetime_f_datetimetime_new_tbl_ld_xxbgnr_list_dateto', 'search_datetime_f_datetimetime_new_tbl_ld_xxbgnr_list_timeto', tbl_ld_xxbgnr_list.f_datetimetime_newto);
			            
			
						controlObj.text('search_txt_f_toggle_old_tbl_ld_xxbgnr_list', tbl_ld_xxbgnr_list.f_toggle_old);          
			
						controlObj.text('search_txt_f_toggle_new_tbl_ld_xxbgnr_list', tbl_ld_xxbgnr_list.f_toggle_new);          
			
						controlObj.text('search_txt_f_textarea_old_tbl_ld_xxbgnr_list', tbl_ld_xxbgnr_list.f_textarea_old);          
			
						controlObj.text('search_txt_f_textarea_new_tbl_ld_xxbgnr_list', tbl_ld_xxbgnr_list.f_textarea_new);          
		 
                
                    }
                    break;
            }
            callBackFunction.success();
        }
        catch (ex)
        {
            _blockMessage.show('setSearchModel执行失败。<br/>' + ex.message, 'fail');
        }

    },

    /* 
    *  
    *  方法:getSearchModel
    *  参数:callBackFunction
    *  获取查询model的内容保存到_pr_searchcontent
    */
    getSearchModel = function (callBackFunction)
    {
        try
        {
            switch (that._pr_searchtype)
            {

                case "1":
                    //简单查询
                    that._pr_searchcontent.type1 = $("#txt_command_search_tbl_ld_xxbgnr_list").val();

                    break;
                case "2":

                    //高级查询
                    var tbl_ld_xxbgnr_list = new Object();
				
				
										 
					  tbl_ld_xxbgnr_list.f_value1 = controlObj.text('search_txt_f_value1_tbl_ld_xxbgnr_list');          
				
				
										 
					  tbl_ld_xxbgnr_list.f_value2 = controlObj.text('search_txt_f_value2_tbl_ld_xxbgnr_list');          
				
				
										 
					  tbl_ld_xxbgnr_list.f_value3 = controlObj.text('search_txt_f_value3_tbl_ld_xxbgnr_list');          
				
				
										 
					  tbl_ld_xxbgnr_list.f_value4 = controlObj.text('search_txt_f_value4_tbl_ld_xxbgnr_list');          
				
				
										 
					  tbl_ld_xxbgnr_list.f_value5 = controlObj.text('search_txt_f_value5_tbl_ld_xxbgnr_list');          
				
				
										 
					  tbl_ld_xxbgnr_list.f_value6 = controlObj.text('search_txt_f_value6_tbl_ld_xxbgnr_list');          
				
				
										 
					  tbl_ld_xxbgnr_list.f_value7 = controlObj.text('search_txt_f_value7_tbl_ld_xxbgnr_list');          
				
				
										 
					  tbl_ld_xxbgnr_list.f_value8 = controlObj.text('search_txt_f_value8_tbl_ld_xxbgnr_list');          
				
				
										 
					  tbl_ld_xxbgnr_list.f_value9 = controlObj.text('search_txt_f_value9_tbl_ld_xxbgnr_list');          
				
				
										 
					  tbl_ld_xxbgnr_list.f_value10 = controlObj.text('search_txt_f_value10_tbl_ld_xxbgnr_list');          
				
				
										 
					  tbl_ld_xxbgnr_list.f_bgnr = controlObj.text('search_txt_f_bgnr_tbl_ld_xxbgnr_list');          
				
				
										 
					  tbl_ld_xxbgnr_list.f_bgnrid = controlObj.text('search_txt_f_bgnrid_tbl_ld_xxbgnr_list');          
				
				
										 
					  tbl_ld_xxbgnr_list.f_singledropdowngroup_dy_old = controlObj.text('search_txt_f_singledropdowngroup_dy_old_tbl_ld_xxbgnr_list');          
				
				
										 
					  tbl_ld_xxbgnr_list.f_singledropdowngroup_dy_oldid = controlObj.text('search_txt_f_singledropdowngroup_dy_oldid_tbl_ld_xxbgnr_list');          
				
				
										 
					  tbl_ld_xxbgnr_list.f_singledropdowngroup_sc_old = controlObj.text('search_txt_f_singledropdowngroup_sc_old_tbl_ld_xxbgnr_list');          
				
				
										 
					  tbl_ld_xxbgnr_list.f_singledropdowngroup_sc_oldid = controlObj.text('search_txt_f_singledropdowngroup_sc_oldid_tbl_ld_xxbgnr_list');          
				
				
										 
					  tbl_ld_xxbgnr_list.f_singledropdowngroup_qy_old = controlObj.text('search_txt_f_singledropdowngroup_qy_old_tbl_ld_xxbgnr_list');          
				
				
										 
					  tbl_ld_xxbgnr_list.f_singledropdowngroup_qy_oldid = controlObj.text('search_txt_f_singledropdowngroup_qy_oldid_tbl_ld_xxbgnr_list');          
				
				
										 
					  tbl_ld_xxbgnr_list.f_singledropdowngroup_pq_old = controlObj.text('search_txt_f_singledropdowngroup_pq_old_tbl_ld_xxbgnr_list');          
				
				
										 
					  tbl_ld_xxbgnr_list.f_singledropdowngroup_pq_oldid = controlObj.text('search_txt_f_singledropdowngroup_pq_oldid_tbl_ld_xxbgnr_list');          
				
				
										 
					  tbl_ld_xxbgnr_list.f_singledropdowngroup_dy_new = controlObj.text('search_txt_f_singledropdowngroup_dy_new_tbl_ld_xxbgnr_list');          
				
				
										 
					  tbl_ld_xxbgnr_list.f_singledropdowngroup_dy_newid = controlObj.text('search_txt_f_singledropdowngroup_dy_newid_tbl_ld_xxbgnr_list');          
				
				
										 
					  tbl_ld_xxbgnr_list.f_singledropdowngroup_sc_new = controlObj.text('search_txt_f_singledropdowngroup_sc_new_tbl_ld_xxbgnr_list');          
				
				
										 
					  tbl_ld_xxbgnr_list.f_singledropdowngroup_sc_newid = controlObj.text('search_txt_f_singledropdowngroup_sc_newid_tbl_ld_xxbgnr_list');          
				
				
										 
					  tbl_ld_xxbgnr_list.f_singledropdowngroup_qy_new = controlObj.text('search_txt_f_singledropdowngroup_qy_new_tbl_ld_xxbgnr_list');          
				
				
										 
					  tbl_ld_xxbgnr_list.f_singledropdowngroup_qy_newid = controlObj.text('search_txt_f_singledropdowngroup_qy_newid_tbl_ld_xxbgnr_list');          
				
				
										 
					  tbl_ld_xxbgnr_list.f_singledropdowngroup_pq_new = controlObj.text('search_txt_f_singledropdowngroup_pq_new_tbl_ld_xxbgnr_list');          
				
				
										 
					  tbl_ld_xxbgnr_list.f_singledropdowngroup_pq_newid = controlObj.text('search_txt_f_singledropdowngroup_pq_newid_tbl_ld_xxbgnr_list');          
				
				
										 
					  tbl_ld_xxbgnr_list.f_text_old = controlObj.text('search_txt_f_text_old_tbl_ld_xxbgnr_list');          
				
				
										 
					  tbl_ld_xxbgnr_list.f_text_new = controlObj.text('search_txt_f_text_new_tbl_ld_xxbgnr_list');          
				
				
										 
					  tbl_ld_xxbgnr_list.f_singledropdownlist_old = controlObj.text('search_txt_f_singledropdownlist_old_tbl_ld_xxbgnr_list');          
				
				
										 
					  tbl_ld_xxbgnr_list.f_singledropdownlist_oldid = controlObj.text('search_txt_f_singledropdownlist_oldid_tbl_ld_xxbgnr_list');          
				
				
										 
					  tbl_ld_xxbgnr_list.f_singledropdownlist_new = controlObj.text('search_txt_f_singledropdownlist_new_tbl_ld_xxbgnr_list');          
				
				
										 
					  tbl_ld_xxbgnr_list.f_singledropdownlist_newid = controlObj.text('search_txt_f_singledropdownlist_newid_tbl_ld_xxbgnr_list');          
				
				
										 
					  tbl_ld_xxbgnr_list.f_multidropdownlist_old = controlObj.text('search_txt_f_multidropdownlist_old_tbl_ld_xxbgnr_list');          
				
				
										 
					  tbl_ld_xxbgnr_list.f_multidropdownlist_oldid = controlObj.text('search_txt_f_multidropdownlist_oldid_tbl_ld_xxbgnr_list');          
				
				
										 
					  tbl_ld_xxbgnr_list.f_multidropdownlist_new = controlObj.text('search_txt_f_multidropdownlist_new_tbl_ld_xxbgnr_list');          
				
				
										 
					  tbl_ld_xxbgnr_list.f_multidropdownlist_newid = controlObj.text('search_txt_f_multidropdownlist_newid_tbl_ld_xxbgnr_list');          
				
				
								
					tbl_ld_xxbgnr_list.f_datetime_oldfrom = controlObj.datetime('search_datetime_f_datetime_old_tbl_ld_xxbgnr_list_datefrom', 'search_datetime_f_datetime_old_tbl_ld_xxbgnr_list_timefrom'); // datefrom + ' ' + timefrom;
	                tbl_ld_xxbgnr_list.f_datetime_oldto = controlObj.datetime('search_datetime_f_datetime_old_tbl_ld_xxbgnr_list_dateto', 'search_datetime_f_datetime_old_tbl_ld_xxbgnr_list_timeto'); //dateto + ' ' + timeto;
                          
				
				
								
					tbl_ld_xxbgnr_list.f_datetime_newfrom = controlObj.datetime('search_datetime_f_datetime_new_tbl_ld_xxbgnr_list_datefrom', 'search_datetime_f_datetime_new_tbl_ld_xxbgnr_list_timefrom'); // datefrom + ' ' + timefrom;
	                tbl_ld_xxbgnr_list.f_datetime_newto = controlObj.datetime('search_datetime_f_datetime_new_tbl_ld_xxbgnr_list_dateto', 'search_datetime_f_datetime_new_tbl_ld_xxbgnr_list_timeto'); //dateto + ' ' + timeto;
                          
				
				
								
					tbl_ld_xxbgnr_list.f_datetimetime_oldfrom = controlObj.datetime('search_datetime_f_datetimetime_old_tbl_ld_xxbgnr_list_datefrom', 'search_datetime_f_datetimetime_old_tbl_ld_xxbgnr_list_timefrom'); // datefrom + ' ' + timefrom;
	                tbl_ld_xxbgnr_list.f_datetimetime_oldto = controlObj.datetime('search_datetime_f_datetimetime_old_tbl_ld_xxbgnr_list_dateto', 'search_datetime_f_datetimetime_old_tbl_ld_xxbgnr_list_timeto'); //dateto + ' ' + timeto;
                          
				
				
								
					tbl_ld_xxbgnr_list.f_datetimetime_newfrom = controlObj.datetime('search_datetime_f_datetimetime_new_tbl_ld_xxbgnr_list_datefrom', 'search_datetime_f_datetimetime_new_tbl_ld_xxbgnr_list_timefrom'); // datefrom + ' ' + timefrom;
	                tbl_ld_xxbgnr_list.f_datetimetime_newto = controlObj.datetime('search_datetime_f_datetimetime_new_tbl_ld_xxbgnr_list_dateto', 'search_datetime_f_datetimetime_new_tbl_ld_xxbgnr_list_timeto'); //dateto + ' ' + timeto;
                          
				
				
										 
					  tbl_ld_xxbgnr_list.f_toggle_old = controlObj.text('search_txt_f_toggle_old_tbl_ld_xxbgnr_list');          
				
				
										 
					  tbl_ld_xxbgnr_list.f_toggle_new = controlObj.text('search_txt_f_toggle_new_tbl_ld_xxbgnr_list');          
				
				
										 
					  tbl_ld_xxbgnr_list.f_textarea_old = controlObj.text('search_txt_f_textarea_old_tbl_ld_xxbgnr_list');          
				
				
										 
					  tbl_ld_xxbgnr_list.f_textarea_new = controlObj.text('search_txt_f_textarea_new_tbl_ld_xxbgnr_list');          
				 

                    that._pr_searchcontent.type2 = tbl_ld_xxbgnr_list;
                    break;

            }

            callBackFunction.success();
        }
        catch (ex)
        {
            _blockMessage.show('getSearchModel执行失败。<br/>' + ex.message, 'fail');
        }


    },

    /* 
    *  
    *  方法:checkSearchModel
    *  参数:callBackFunction
    *  针对_pr_searchcontent.type2进行验证
    */
    checkSearchModel = function (callBackFunction)
    {
        try
        {
            var tbl_ld_xxbgnr_list = that._pr_searchcontent.type2;
            var errorMessageHansMap = new hashMap();
            var errorMessagePlacementHansMap = new hashMap();

        
									
			if (tbl_ld_xxbgnr_list.f_value1.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_value1_tbl_ld_xxbgnr_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_value1_tbl_ld_xxbgnr_list', 'top');
			}			          
		
									
			if (tbl_ld_xxbgnr_list.f_value2.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_value2_tbl_ld_xxbgnr_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_value2_tbl_ld_xxbgnr_list', 'top');
			}			          
		
									
			if (tbl_ld_xxbgnr_list.f_value3.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_value3_tbl_ld_xxbgnr_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_value3_tbl_ld_xxbgnr_list', 'top');
			}			          
		
									
			if (tbl_ld_xxbgnr_list.f_value4.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_value4_tbl_ld_xxbgnr_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_value4_tbl_ld_xxbgnr_list', 'top');
			}			          
		
									
			if (tbl_ld_xxbgnr_list.f_value5.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_value5_tbl_ld_xxbgnr_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_value5_tbl_ld_xxbgnr_list', 'top');
			}			          
		
									
			if (tbl_ld_xxbgnr_list.f_value6.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_value6_tbl_ld_xxbgnr_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_value6_tbl_ld_xxbgnr_list', 'top');
			}			          
		
									
			if (tbl_ld_xxbgnr_list.f_value7.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_value7_tbl_ld_xxbgnr_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_value7_tbl_ld_xxbgnr_list', 'top');
			}			          
		
									
			if (tbl_ld_xxbgnr_list.f_value8.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_value8_tbl_ld_xxbgnr_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_value8_tbl_ld_xxbgnr_list', 'top');
			}			          
		
									
			if (tbl_ld_xxbgnr_list.f_value9.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_value9_tbl_ld_xxbgnr_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_value9_tbl_ld_xxbgnr_list', 'top');
			}			          
		
									
			if (tbl_ld_xxbgnr_list.f_value10.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_value10_tbl_ld_xxbgnr_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_value10_tbl_ld_xxbgnr_list', 'top');
			}			          
		
									
			if (tbl_ld_xxbgnr_list.f_bgnr.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_bgnr_tbl_ld_xxbgnr_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_bgnr_tbl_ld_xxbgnr_list', 'top');
			}			          
		
									
			if (tbl_ld_xxbgnr_list.f_bgnrid.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_bgnrid_tbl_ld_xxbgnr_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_bgnrid_tbl_ld_xxbgnr_list', 'top');
			}			          
		
									
			if (tbl_ld_xxbgnr_list.f_singledropdowngroup_dy_old.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_singledropdowngroup_dy_old_tbl_ld_xxbgnr_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_singledropdowngroup_dy_old_tbl_ld_xxbgnr_list', 'top');
			}			          
		
									
			if (tbl_ld_xxbgnr_list.f_singledropdowngroup_dy_oldid.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_singledropdowngroup_dy_oldid_tbl_ld_xxbgnr_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_singledropdowngroup_dy_oldid_tbl_ld_xxbgnr_list', 'top');
			}			          
		
									
			if (tbl_ld_xxbgnr_list.f_singledropdowngroup_sc_old.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_singledropdowngroup_sc_old_tbl_ld_xxbgnr_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_singledropdowngroup_sc_old_tbl_ld_xxbgnr_list', 'top');
			}			          
		
									
			if (tbl_ld_xxbgnr_list.f_singledropdowngroup_sc_oldid.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_singledropdowngroup_sc_oldid_tbl_ld_xxbgnr_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_singledropdowngroup_sc_oldid_tbl_ld_xxbgnr_list', 'top');
			}			          
		
									
			if (tbl_ld_xxbgnr_list.f_singledropdowngroup_qy_old.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_singledropdowngroup_qy_old_tbl_ld_xxbgnr_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_singledropdowngroup_qy_old_tbl_ld_xxbgnr_list', 'top');
			}			          
		
									
			if (tbl_ld_xxbgnr_list.f_singledropdowngroup_qy_oldid.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_singledropdowngroup_qy_oldid_tbl_ld_xxbgnr_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_singledropdowngroup_qy_oldid_tbl_ld_xxbgnr_list', 'top');
			}			          
		
									
			if (tbl_ld_xxbgnr_list.f_singledropdowngroup_pq_old.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_singledropdowngroup_pq_old_tbl_ld_xxbgnr_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_singledropdowngroup_pq_old_tbl_ld_xxbgnr_list', 'top');
			}			          
		
									
			if (tbl_ld_xxbgnr_list.f_singledropdowngroup_pq_oldid.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_singledropdowngroup_pq_oldid_tbl_ld_xxbgnr_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_singledropdowngroup_pq_oldid_tbl_ld_xxbgnr_list', 'top');
			}			          
		
									
			if (tbl_ld_xxbgnr_list.f_singledropdowngroup_dy_new.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_singledropdowngroup_dy_new_tbl_ld_xxbgnr_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_singledropdowngroup_dy_new_tbl_ld_xxbgnr_list', 'top');
			}			          
		
									
			if (tbl_ld_xxbgnr_list.f_singledropdowngroup_dy_newid.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_singledropdowngroup_dy_newid_tbl_ld_xxbgnr_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_singledropdowngroup_dy_newid_tbl_ld_xxbgnr_list', 'top');
			}			          
		
									
			if (tbl_ld_xxbgnr_list.f_singledropdowngroup_sc_new.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_singledropdowngroup_sc_new_tbl_ld_xxbgnr_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_singledropdowngroup_sc_new_tbl_ld_xxbgnr_list', 'top');
			}			          
		
									
			if (tbl_ld_xxbgnr_list.f_singledropdowngroup_sc_newid.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_singledropdowngroup_sc_newid_tbl_ld_xxbgnr_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_singledropdowngroup_sc_newid_tbl_ld_xxbgnr_list', 'top');
			}			          
		
									
			if (tbl_ld_xxbgnr_list.f_singledropdowngroup_qy_new.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_singledropdowngroup_qy_new_tbl_ld_xxbgnr_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_singledropdowngroup_qy_new_tbl_ld_xxbgnr_list', 'top');
			}			          
		
									
			if (tbl_ld_xxbgnr_list.f_singledropdowngroup_qy_newid.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_singledropdowngroup_qy_newid_tbl_ld_xxbgnr_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_singledropdowngroup_qy_newid_tbl_ld_xxbgnr_list', 'top');
			}			          
		
									
			if (tbl_ld_xxbgnr_list.f_singledropdowngroup_pq_new.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_singledropdowngroup_pq_new_tbl_ld_xxbgnr_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_singledropdowngroup_pq_new_tbl_ld_xxbgnr_list', 'top');
			}			          
		
									
			if (tbl_ld_xxbgnr_list.f_singledropdowngroup_pq_newid.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_singledropdowngroup_pq_newid_tbl_ld_xxbgnr_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_singledropdowngroup_pq_newid_tbl_ld_xxbgnr_list', 'top');
			}			          
		
									
			if (tbl_ld_xxbgnr_list.f_text_old.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_text_old_tbl_ld_xxbgnr_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_text_old_tbl_ld_xxbgnr_list', 'top');
			}			          
		
									
			if (tbl_ld_xxbgnr_list.f_text_new.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_text_new_tbl_ld_xxbgnr_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_text_new_tbl_ld_xxbgnr_list', 'top');
			}			          
		
									
			if (tbl_ld_xxbgnr_list.f_singledropdownlist_old.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_singledropdownlist_old_tbl_ld_xxbgnr_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_singledropdownlist_old_tbl_ld_xxbgnr_list', 'top');
			}			          
		
									
			if (tbl_ld_xxbgnr_list.f_singledropdownlist_oldid.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_singledropdownlist_oldid_tbl_ld_xxbgnr_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_singledropdownlist_oldid_tbl_ld_xxbgnr_list', 'top');
			}			          
		
									
			if (tbl_ld_xxbgnr_list.f_singledropdownlist_new.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_singledropdownlist_new_tbl_ld_xxbgnr_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_singledropdownlist_new_tbl_ld_xxbgnr_list', 'top');
			}			          
		
									
			if (tbl_ld_xxbgnr_list.f_singledropdownlist_newid.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_singledropdownlist_newid_tbl_ld_xxbgnr_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_singledropdownlist_newid_tbl_ld_xxbgnr_list', 'top');
			}			          
		
									
			if (tbl_ld_xxbgnr_list.f_multidropdownlist_old.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_multidropdownlist_old_tbl_ld_xxbgnr_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_multidropdownlist_old_tbl_ld_xxbgnr_list', 'top');
			}			          
		
									
			if (tbl_ld_xxbgnr_list.f_multidropdownlist_oldid.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_multidropdownlist_oldid_tbl_ld_xxbgnr_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_multidropdownlist_oldid_tbl_ld_xxbgnr_list', 'top');
			}			          
		
									
			if (tbl_ld_xxbgnr_list.f_multidropdownlist_new.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_multidropdownlist_new_tbl_ld_xxbgnr_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_multidropdownlist_new_tbl_ld_xxbgnr_list', 'top');
			}			          
		
									
			if (tbl_ld_xxbgnr_list.f_multidropdownlist_newid.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_multidropdownlist_newid_tbl_ld_xxbgnr_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_multidropdownlist_newid_tbl_ld_xxbgnr_list', 'top');
			}			          
		
						          
		
						          
		
						          
		
						          
		
									
			if (tbl_ld_xxbgnr_list.f_toggle_old.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_toggle_old_tbl_ld_xxbgnr_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_toggle_old_tbl_ld_xxbgnr_list', 'top');
			}			          
		
									
			if (tbl_ld_xxbgnr_list.f_toggle_new.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_toggle_new_tbl_ld_xxbgnr_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_toggle_new_tbl_ld_xxbgnr_list', 'top');
			}			          
		
									
			if (tbl_ld_xxbgnr_list.f_textarea_old.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_textarea_old_tbl_ld_xxbgnr_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_textarea_old_tbl_ld_xxbgnr_list', 'top');
			}			          
		
									
			if (tbl_ld_xxbgnr_list.f_textarea_new.length >100)
			{
			
				errorMessageHansMap.put('search_txt_f_textarea_new_tbl_ld_xxbgnr_list', '长度不能超过<a style="color:red">100</a>');
				errorMessagePlacementHansMap.put('search_txt_f_textarea_new_tbl_ld_xxbgnr_list', 'top');
			}			          
		  
       



            if (errorMessageHansMap.keys().length > 0)
            {
                _validateMessage.show(errorMessageHansMap, errorMessagePlacementHansMap, false);
                callBackFunction.fail();
            }
            else
            {
                _validateMessage.hidden();
                callBackFunction.success();
            }
        }
        catch (ex)
        {
            _blockMessage.show('checkSearchModel执行失败。<br/>' + ex.message, 'fail');
        }

    },

    /* 
    *  
    *  方法:clearSearchModel
    *  参数:callBackFunction
    *  清空_pr_searchtype和searchModel
    */
    clearSearchModel = function ()
    {


        switch (that._pr_searchtype)
        {
            case "1":
                if (that._pr_searchcontent.type2 == undefined)
                {
                    that._pr_searchcontent.type2 = new Object();
                }

            
				
										    that._pr_searchcontent.type2.f_value1 = '';
					    controlObj.text('search_txt_f_value1_tbl_ld_xxbgnr_list', that._pr_searchcontent.type2.f_value1);          
				
				
										    that._pr_searchcontent.type2.f_value2 = '';
					    controlObj.text('search_txt_f_value2_tbl_ld_xxbgnr_list', that._pr_searchcontent.type2.f_value2);          
				
				
										    that._pr_searchcontent.type2.f_value3 = '';
					    controlObj.text('search_txt_f_value3_tbl_ld_xxbgnr_list', that._pr_searchcontent.type2.f_value3);          
				
				
										    that._pr_searchcontent.type2.f_value4 = '';
					    controlObj.text('search_txt_f_value4_tbl_ld_xxbgnr_list', that._pr_searchcontent.type2.f_value4);          
				
				
										    that._pr_searchcontent.type2.f_value5 = '';
					    controlObj.text('search_txt_f_value5_tbl_ld_xxbgnr_list', that._pr_searchcontent.type2.f_value5);          
				
				
										    that._pr_searchcontent.type2.f_value6 = '';
					    controlObj.text('search_txt_f_value6_tbl_ld_xxbgnr_list', that._pr_searchcontent.type2.f_value6);          
				
				
										    that._pr_searchcontent.type2.f_value7 = '';
					    controlObj.text('search_txt_f_value7_tbl_ld_xxbgnr_list', that._pr_searchcontent.type2.f_value7);          
				
				
										    that._pr_searchcontent.type2.f_value8 = '';
					    controlObj.text('search_txt_f_value8_tbl_ld_xxbgnr_list', that._pr_searchcontent.type2.f_value8);          
				
				
										    that._pr_searchcontent.type2.f_value9 = '';
					    controlObj.text('search_txt_f_value9_tbl_ld_xxbgnr_list', that._pr_searchcontent.type2.f_value9);          
				
				
										    that._pr_searchcontent.type2.f_value10 = '';
					    controlObj.text('search_txt_f_value10_tbl_ld_xxbgnr_list', that._pr_searchcontent.type2.f_value10);          
				
				
										    that._pr_searchcontent.type2.f_bgnr = '';
					    controlObj.text('search_txt_f_bgnr_tbl_ld_xxbgnr_list', that._pr_searchcontent.type2.f_bgnr);          
				
				
										    that._pr_searchcontent.type2.f_bgnrid = '';
					    controlObj.text('search_txt_f_bgnrid_tbl_ld_xxbgnr_list', that._pr_searchcontent.type2.f_bgnrid);          
				
				
										    that._pr_searchcontent.type2.f_singledropdowngroup_dy_old = '';
					    controlObj.text('search_txt_f_singledropdowngroup_dy_old_tbl_ld_xxbgnr_list', that._pr_searchcontent.type2.f_singledropdowngroup_dy_old);          
				
				
										    that._pr_searchcontent.type2.f_singledropdowngroup_dy_oldid = '';
					    controlObj.text('search_txt_f_singledropdowngroup_dy_oldid_tbl_ld_xxbgnr_list', that._pr_searchcontent.type2.f_singledropdowngroup_dy_oldid);          
				
				
										    that._pr_searchcontent.type2.f_singledropdowngroup_sc_old = '';
					    controlObj.text('search_txt_f_singledropdowngroup_sc_old_tbl_ld_xxbgnr_list', that._pr_searchcontent.type2.f_singledropdowngroup_sc_old);          
				
				
										    that._pr_searchcontent.type2.f_singledropdowngroup_sc_oldid = '';
					    controlObj.text('search_txt_f_singledropdowngroup_sc_oldid_tbl_ld_xxbgnr_list', that._pr_searchcontent.type2.f_singledropdowngroup_sc_oldid);          
				
				
										    that._pr_searchcontent.type2.f_singledropdowngroup_qy_old = '';
					    controlObj.text('search_txt_f_singledropdowngroup_qy_old_tbl_ld_xxbgnr_list', that._pr_searchcontent.type2.f_singledropdowngroup_qy_old);          
				
				
										    that._pr_searchcontent.type2.f_singledropdowngroup_qy_oldid = '';
					    controlObj.text('search_txt_f_singledropdowngroup_qy_oldid_tbl_ld_xxbgnr_list', that._pr_searchcontent.type2.f_singledropdowngroup_qy_oldid);          
				
				
										    that._pr_searchcontent.type2.f_singledropdowngroup_pq_old = '';
					    controlObj.text('search_txt_f_singledropdowngroup_pq_old_tbl_ld_xxbgnr_list', that._pr_searchcontent.type2.f_singledropdowngroup_pq_old);          
				
				
										    that._pr_searchcontent.type2.f_singledropdowngroup_pq_oldid = '';
					    controlObj.text('search_txt_f_singledropdowngroup_pq_oldid_tbl_ld_xxbgnr_list', that._pr_searchcontent.type2.f_singledropdowngroup_pq_oldid);          
				
				
										    that._pr_searchcontent.type2.f_singledropdowngroup_dy_new = '';
					    controlObj.text('search_txt_f_singledropdowngroup_dy_new_tbl_ld_xxbgnr_list', that._pr_searchcontent.type2.f_singledropdowngroup_dy_new);          
				
				
										    that._pr_searchcontent.type2.f_singledropdowngroup_dy_newid = '';
					    controlObj.text('search_txt_f_singledropdowngroup_dy_newid_tbl_ld_xxbgnr_list', that._pr_searchcontent.type2.f_singledropdowngroup_dy_newid);          
				
				
										    that._pr_searchcontent.type2.f_singledropdowngroup_sc_new = '';
					    controlObj.text('search_txt_f_singledropdowngroup_sc_new_tbl_ld_xxbgnr_list', that._pr_searchcontent.type2.f_singledropdowngroup_sc_new);          
				
				
										    that._pr_searchcontent.type2.f_singledropdowngroup_sc_newid = '';
					    controlObj.text('search_txt_f_singledropdowngroup_sc_newid_tbl_ld_xxbgnr_list', that._pr_searchcontent.type2.f_singledropdowngroup_sc_newid);          
				
				
										    that._pr_searchcontent.type2.f_singledropdowngroup_qy_new = '';
					    controlObj.text('search_txt_f_singledropdowngroup_qy_new_tbl_ld_xxbgnr_list', that._pr_searchcontent.type2.f_singledropdowngroup_qy_new);          
				
				
										    that._pr_searchcontent.type2.f_singledropdowngroup_qy_newid = '';
					    controlObj.text('search_txt_f_singledropdowngroup_qy_newid_tbl_ld_xxbgnr_list', that._pr_searchcontent.type2.f_singledropdowngroup_qy_newid);          
				
				
										    that._pr_searchcontent.type2.f_singledropdowngroup_pq_new = '';
					    controlObj.text('search_txt_f_singledropdowngroup_pq_new_tbl_ld_xxbgnr_list', that._pr_searchcontent.type2.f_singledropdowngroup_pq_new);          
				
				
										    that._pr_searchcontent.type2.f_singledropdowngroup_pq_newid = '';
					    controlObj.text('search_txt_f_singledropdowngroup_pq_newid_tbl_ld_xxbgnr_list', that._pr_searchcontent.type2.f_singledropdowngroup_pq_newid);          
				
				
										    that._pr_searchcontent.type2.f_text_old = '';
					    controlObj.text('search_txt_f_text_old_tbl_ld_xxbgnr_list', that._pr_searchcontent.type2.f_text_old);          
				
				
										    that._pr_searchcontent.type2.f_text_new = '';
					    controlObj.text('search_txt_f_text_new_tbl_ld_xxbgnr_list', that._pr_searchcontent.type2.f_text_new);          
				
				
										    that._pr_searchcontent.type2.f_singledropdownlist_old = '';
					    controlObj.text('search_txt_f_singledropdownlist_old_tbl_ld_xxbgnr_list', that._pr_searchcontent.type2.f_singledropdownlist_old);          
				
				
										    that._pr_searchcontent.type2.f_singledropdownlist_oldid = '';
					    controlObj.text('search_txt_f_singledropdownlist_oldid_tbl_ld_xxbgnr_list', that._pr_searchcontent.type2.f_singledropdownlist_oldid);          
				
				
										    that._pr_searchcontent.type2.f_singledropdownlist_new = '';
					    controlObj.text('search_txt_f_singledropdownlist_new_tbl_ld_xxbgnr_list', that._pr_searchcontent.type2.f_singledropdownlist_new);          
				
				
										    that._pr_searchcontent.type2.f_singledropdownlist_newid = '';
					    controlObj.text('search_txt_f_singledropdownlist_newid_tbl_ld_xxbgnr_list', that._pr_searchcontent.type2.f_singledropdownlist_newid);          
				
				
										    that._pr_searchcontent.type2.f_multidropdownlist_old = '';
					    controlObj.text('search_txt_f_multidropdownlist_old_tbl_ld_xxbgnr_list', that._pr_searchcontent.type2.f_multidropdownlist_old);          
				
				
										    that._pr_searchcontent.type2.f_multidropdownlist_oldid = '';
					    controlObj.text('search_txt_f_multidropdownlist_oldid_tbl_ld_xxbgnr_list', that._pr_searchcontent.type2.f_multidropdownlist_oldid);          
				
				
										    that._pr_searchcontent.type2.f_multidropdownlist_new = '';
					    controlObj.text('search_txt_f_multidropdownlist_new_tbl_ld_xxbgnr_list', that._pr_searchcontent.type2.f_multidropdownlist_new);          
				
				
										    that._pr_searchcontent.type2.f_multidropdownlist_newid = '';
					    controlObj.text('search_txt_f_multidropdownlist_newid_tbl_ld_xxbgnr_list', that._pr_searchcontent.type2.f_multidropdownlist_newid);          
				
				
											that._pr_searchcontent.type2.f_datetime_oldfrom = ('1900-01-01 00:00:00');
						that._pr_searchcontent.type2.f_datetime_oldto = ('1900-01-01 00:00:00');
						
						controlObj.datetime('search_datetime_f_datetime_old_tbl_ld_xxbgnr_list_datefrom', 'search_datetime_f_datetime_old_tbl_ld_xxbgnr_list_timefrom', that._pr_searchcontent.type2.f_datetime_oldfrom);
						controlObj.datetime('search_datetime_f_datetime_old_tbl_ld_xxbgnr_list_dateto', 'search_datetime_f_datetime_old_tbl_ld_xxbgnr_list_timeto', that._pr_searchcontent.type2.f_datetime_oldto);
                          
				
				
											that._pr_searchcontent.type2.f_datetime_newfrom = ('1900-01-01 00:00:00');
						that._pr_searchcontent.type2.f_datetime_newto = ('1900-01-01 00:00:00');
						
						controlObj.datetime('search_datetime_f_datetime_new_tbl_ld_xxbgnr_list_datefrom', 'search_datetime_f_datetime_new_tbl_ld_xxbgnr_list_timefrom', that._pr_searchcontent.type2.f_datetime_newfrom);
						controlObj.datetime('search_datetime_f_datetime_new_tbl_ld_xxbgnr_list_dateto', 'search_datetime_f_datetime_new_tbl_ld_xxbgnr_list_timeto', that._pr_searchcontent.type2.f_datetime_newto);
                          
				
				
											that._pr_searchcontent.type2.f_datetimetime_oldfrom = ('1900-01-01 00:00:00');
						that._pr_searchcontent.type2.f_datetimetime_oldto = ('1900-01-01 00:00:00');
						
						controlObj.datetime('search_datetime_f_datetimetime_old_tbl_ld_xxbgnr_list_datefrom', 'search_datetime_f_datetimetime_old_tbl_ld_xxbgnr_list_timefrom', that._pr_searchcontent.type2.f_datetimetime_oldfrom);
						controlObj.datetime('search_datetime_f_datetimetime_old_tbl_ld_xxbgnr_list_dateto', 'search_datetime_f_datetimetime_old_tbl_ld_xxbgnr_list_timeto', that._pr_searchcontent.type2.f_datetimetime_oldto);
                          
				
				
											that._pr_searchcontent.type2.f_datetimetime_newfrom = ('1900-01-01 00:00:00');
						that._pr_searchcontent.type2.f_datetimetime_newto = ('1900-01-01 00:00:00');
						
						controlObj.datetime('search_datetime_f_datetimetime_new_tbl_ld_xxbgnr_list_datefrom', 'search_datetime_f_datetimetime_new_tbl_ld_xxbgnr_list_timefrom', that._pr_searchcontent.type2.f_datetimetime_newfrom);
						controlObj.datetime('search_datetime_f_datetimetime_new_tbl_ld_xxbgnr_list_dateto', 'search_datetime_f_datetimetime_new_tbl_ld_xxbgnr_list_timeto', that._pr_searchcontent.type2.f_datetimetime_newto);
                          
				
				
										    that._pr_searchcontent.type2.f_toggle_old = '';
					    controlObj.text('search_txt_f_toggle_old_tbl_ld_xxbgnr_list', that._pr_searchcontent.type2.f_toggle_old);          
				
				
										    that._pr_searchcontent.type2.f_toggle_new = '';
					    controlObj.text('search_txt_f_toggle_new_tbl_ld_xxbgnr_list', that._pr_searchcontent.type2.f_toggle_new);          
				
				
										    that._pr_searchcontent.type2.f_textarea_old = '';
					    controlObj.text('search_txt_f_textarea_old_tbl_ld_xxbgnr_list', that._pr_searchcontent.type2.f_textarea_old);          
				
				
										    that._pr_searchcontent.type2.f_textarea_new = '';
					    controlObj.text('search_txt_f_textarea_new_tbl_ld_xxbgnr_list', that._pr_searchcontent.type2.f_textarea_new);          
				 

                break;
            case "2":
                if (that._pr_searchcontent.type1 == undefined)
                {
                    that._pr_searchcontent.type1 = '';
                }

                $("#txt_command_search_tbl_ld_xxbgnr_list").val('');
                break;
        }

    },

    //---------------------------------------------------------------------------------
    // ---------------------------------grid------------------------------------------
    //---------------------------------------------------------------------------------

    /* 
    *  
    *  方法:creatWhereClause
    *  参数:callBackFunction
    *  针对_pr_searchtype生成sql语句存储在_whereClauseString
    */
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


					
														 	 whereClause += " f_bgnr like '%" + vv[i] + "%' or ";
						
														 	 whereClause += " f_bgnrid like '%" + vv[i] + "%' or ";
						
														 	 whereClause += " f_singledropdowngroup_dy_old like '%" + vv[i] + "%' or ";
						
														 	 whereClause += " f_singledropdowngroup_dy_oldid like '%" + vv[i] + "%' or ";
						
														 	 whereClause += " f_singledropdowngroup_sc_old like '%" + vv[i] + "%' or ";
						
														 	 whereClause += " f_singledropdowngroup_sc_oldid like '%" + vv[i] + "%' or ";
						
														 	 whereClause += " f_singledropdowngroup_qy_old like '%" + vv[i] + "%' or ";
						
														 	 whereClause += " f_singledropdowngroup_qy_oldid like '%" + vv[i] + "%' or ";
						
														 	 whereClause += " f_singledropdowngroup_pq_old like '%" + vv[i] + "%' or ";
						
														 	 whereClause += " f_singledropdowngroup_pq_oldid like '%" + vv[i] + "%' or ";
						
														 	 whereClause += " f_singledropdowngroup_dy_new like '%" + vv[i] + "%' or ";
						
														 	 whereClause += " f_singledropdowngroup_dy_newid like '%" + vv[i] + "%' or ";
						
														 	 whereClause += " f_singledropdowngroup_sc_new like '%" + vv[i] + "%' or ";
						
														 	 whereClause += " f_singledropdowngroup_sc_newid like '%" + vv[i] + "%' or ";
						
														 	 whereClause += " f_singledropdowngroup_qy_new like '%" + vv[i] + "%' or ";
						
														 	 whereClause += " f_singledropdowngroup_qy_newid like '%" + vv[i] + "%' or ";
						
														 	 whereClause += " f_singledropdowngroup_pq_new like '%" + vv[i] + "%' or ";
						
														 	 whereClause += " f_singledropdowngroup_pq_newid like '%" + vv[i] + "%' or ";
						
														 	 whereClause += " f_text_old like '%" + vv[i] + "%' or ";
						
														 	 whereClause += " f_text_new like '%" + vv[i] + "%' or ";
						
														 	 whereClause += " f_singledropdownlist_old like '%" + vv[i] + "%' or ";
						
														 	 whereClause += " f_singledropdownlist_oldid like '%" + vv[i] + "%' or ";
						
														 	 whereClause += " f_singledropdownlist_new like '%" + vv[i] + "%' or ";
						
														 	 whereClause += " f_singledropdownlist_newid like '%" + vv[i] + "%' or ";
						
														 	 whereClause += " f_multidropdownlist_old like '%" + vv[i] + "%' or ";
						
														 	 whereClause += " f_multidropdownlist_oldid like '%" + vv[i] + "%' or ";
						
														 	 whereClause += " f_multidropdownlist_new like '%" + vv[i] + "%' or ";
						
														 	 whereClause += " f_multidropdownlist_newid like '%" + vv[i] + "%' or ";
						
													
								  whereClause += " to_char(f_datetime_old,'yyyy-MM-dd hh24:mi:ss') like '%" + vv[i] + "%' or ";
						
													
								  whereClause += " to_char(f_datetime_new,'yyyy-MM-dd hh24:mi:ss') like '%" + vv[i] + "%' or ";
						
													
								  whereClause += " to_char(f_datetimetime_old,'yyyy-MM-dd hh24:mi:ss') like '%" + vv[i] + "%' or ";
						
													
								  whereClause += " to_char(f_datetimetime_new,'yyyy-MM-dd hh24:mi:ss') like '%" + vv[i] + "%' or ";
						
														 	 whereClause += " f_toggle_old like '%" + vv[i] + "%' or ";
						
														 	 whereClause += " f_toggle_new like '%" + vv[i] + "%' or ";
						
														 	 whereClause += " f_textarea_old like '%" + vv[i] + "%' or ";
						
														 	 whereClause += " f_textarea_new like '%" + vv[i] + "%' or ";
						                              

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
                        _whereClauseString = whereClause;
                    }


                    callBackFunction.success();
                }
                break;
            case "2":
                {
                    if (that._pr_searchcontent.type2 != undefined)
                    {

                        var tbl_ld_xxbgnr_list = that._pr_searchcontent.type2;

             
        
			 			
				if (tbl_ld_xxbgnr_list.f_bgnr.length > 0)
                    {
                        whereClause += " f_bgnr like '%" + tbl_ld_xxbgnr_list.f_bgnr + "%' and ";
                    }	          
		
			 			
				if (tbl_ld_xxbgnr_list.f_bgnrid.length > 0)
                    {
                        whereClause += " f_bgnrid like '%" + tbl_ld_xxbgnr_list.f_bgnrid + "%' and ";
                    }	          
		
			 			
				if (tbl_ld_xxbgnr_list.f_singledropdowngroup_dy_old.length > 0)
                    {
                        whereClause += " f_singledropdowngroup_dy_old like '%" + tbl_ld_xxbgnr_list.f_singledropdowngroup_dy_old + "%' and ";
                    }	          
		
			 			
				if (tbl_ld_xxbgnr_list.f_singledropdowngroup_dy_oldid.length > 0)
                    {
                        whereClause += " f_singledropdowngroup_dy_oldid like '%" + tbl_ld_xxbgnr_list.f_singledropdowngroup_dy_oldid + "%' and ";
                    }	          
		
			 			
				if (tbl_ld_xxbgnr_list.f_singledropdowngroup_sc_old.length > 0)
                    {
                        whereClause += " f_singledropdowngroup_sc_old like '%" + tbl_ld_xxbgnr_list.f_singledropdowngroup_sc_old + "%' and ";
                    }	          
		
			 			
				if (tbl_ld_xxbgnr_list.f_singledropdowngroup_sc_oldid.length > 0)
                    {
                        whereClause += " f_singledropdowngroup_sc_oldid like '%" + tbl_ld_xxbgnr_list.f_singledropdowngroup_sc_oldid + "%' and ";
                    }	          
		
			 			
				if (tbl_ld_xxbgnr_list.f_singledropdowngroup_qy_old.length > 0)
                    {
                        whereClause += " f_singledropdowngroup_qy_old like '%" + tbl_ld_xxbgnr_list.f_singledropdowngroup_qy_old + "%' and ";
                    }	          
		
			 			
				if (tbl_ld_xxbgnr_list.f_singledropdowngroup_qy_oldid.length > 0)
                    {
                        whereClause += " f_singledropdowngroup_qy_oldid like '%" + tbl_ld_xxbgnr_list.f_singledropdowngroup_qy_oldid + "%' and ";
                    }	          
		
			 			
				if (tbl_ld_xxbgnr_list.f_singledropdowngroup_pq_old.length > 0)
                    {
                        whereClause += " f_singledropdowngroup_pq_old like '%" + tbl_ld_xxbgnr_list.f_singledropdowngroup_pq_old + "%' and ";
                    }	          
		
			 			
				if (tbl_ld_xxbgnr_list.f_singledropdowngroup_pq_oldid.length > 0)
                    {
                        whereClause += " f_singledropdowngroup_pq_oldid like '%" + tbl_ld_xxbgnr_list.f_singledropdowngroup_pq_oldid + "%' and ";
                    }	          
		
			 			
				if (tbl_ld_xxbgnr_list.f_singledropdowngroup_dy_new.length > 0)
                    {
                        whereClause += " f_singledropdowngroup_dy_new like '%" + tbl_ld_xxbgnr_list.f_singledropdowngroup_dy_new + "%' and ";
                    }	          
		
			 			
				if (tbl_ld_xxbgnr_list.f_singledropdowngroup_dy_newid.length > 0)
                    {
                        whereClause += " f_singledropdowngroup_dy_newid like '%" + tbl_ld_xxbgnr_list.f_singledropdowngroup_dy_newid + "%' and ";
                    }	          
		
			 			
				if (tbl_ld_xxbgnr_list.f_singledropdowngroup_sc_new.length > 0)
                    {
                        whereClause += " f_singledropdowngroup_sc_new like '%" + tbl_ld_xxbgnr_list.f_singledropdowngroup_sc_new + "%' and ";
                    }	          
		
			 			
				if (tbl_ld_xxbgnr_list.f_singledropdowngroup_sc_newid.length > 0)
                    {
                        whereClause += " f_singledropdowngroup_sc_newid like '%" + tbl_ld_xxbgnr_list.f_singledropdowngroup_sc_newid + "%' and ";
                    }	          
		
			 			
				if (tbl_ld_xxbgnr_list.f_singledropdowngroup_qy_new.length > 0)
                    {
                        whereClause += " f_singledropdowngroup_qy_new like '%" + tbl_ld_xxbgnr_list.f_singledropdowngroup_qy_new + "%' and ";
                    }	          
		
			 			
				if (tbl_ld_xxbgnr_list.f_singledropdowngroup_qy_newid.length > 0)
                    {
                        whereClause += " f_singledropdowngroup_qy_newid like '%" + tbl_ld_xxbgnr_list.f_singledropdowngroup_qy_newid + "%' and ";
                    }	          
		
			 			
				if (tbl_ld_xxbgnr_list.f_singledropdowngroup_pq_new.length > 0)
                    {
                        whereClause += " f_singledropdowngroup_pq_new like '%" + tbl_ld_xxbgnr_list.f_singledropdowngroup_pq_new + "%' and ";
                    }	          
		
			 			
				if (tbl_ld_xxbgnr_list.f_singledropdowngroup_pq_newid.length > 0)
                    {
                        whereClause += " f_singledropdowngroup_pq_newid like '%" + tbl_ld_xxbgnr_list.f_singledropdowngroup_pq_newid + "%' and ";
                    }	          
		
			 			
				if (tbl_ld_xxbgnr_list.f_text_old.length > 0)
                    {
                        whereClause += " f_text_old like '%" + tbl_ld_xxbgnr_list.f_text_old + "%' and ";
                    }	          
		
			 			
				if (tbl_ld_xxbgnr_list.f_text_new.length > 0)
                    {
                        whereClause += " f_text_new like '%" + tbl_ld_xxbgnr_list.f_text_new + "%' and ";
                    }	          
		
			 			
				if (tbl_ld_xxbgnr_list.f_singledropdownlist_old.length > 0)
                    {
                        whereClause += " f_singledropdownlist_old like '%" + tbl_ld_xxbgnr_list.f_singledropdownlist_old + "%' and ";
                    }	          
		
			 			
				if (tbl_ld_xxbgnr_list.f_singledropdownlist_oldid.length > 0)
                    {
                        whereClause += " f_singledropdownlist_oldid like '%" + tbl_ld_xxbgnr_list.f_singledropdownlist_oldid + "%' and ";
                    }	          
		
			 			
				if (tbl_ld_xxbgnr_list.f_singledropdownlist_new.length > 0)
                    {
                        whereClause += " f_singledropdownlist_new like '%" + tbl_ld_xxbgnr_list.f_singledropdownlist_new + "%' and ";
                    }	          
		
			 			
				if (tbl_ld_xxbgnr_list.f_singledropdownlist_newid.length > 0)
                    {
                        whereClause += " f_singledropdownlist_newid like '%" + tbl_ld_xxbgnr_list.f_singledropdownlist_newid + "%' and ";
                    }	          
		
			 			
				if (tbl_ld_xxbgnr_list.f_multidropdownlist_old.length > 0)
                    {
                        whereClause += " f_multidropdownlist_old like '%" + tbl_ld_xxbgnr_list.f_multidropdownlist_old + "%' and ";
                    }	          
		
			 			
				if (tbl_ld_xxbgnr_list.f_multidropdownlist_oldid.length > 0)
                    {
                        whereClause += " f_multidropdownlist_oldid like '%" + tbl_ld_xxbgnr_list.f_multidropdownlist_oldid + "%' and ";
                    }	          
		
			 			
				if (tbl_ld_xxbgnr_list.f_multidropdownlist_new.length > 0)
                    {
                        whereClause += " f_multidropdownlist_new like '%" + tbl_ld_xxbgnr_list.f_multidropdownlist_new + "%' and ";
                    }	          
		
			 			
				if (tbl_ld_xxbgnr_list.f_multidropdownlist_newid.length > 0)
                    {
                        whereClause += " f_multidropdownlist_newid like '%" + tbl_ld_xxbgnr_list.f_multidropdownlist_newid + "%' and ";
                    }	          
		
				
			 	if (tbl_ld_xxbgnr_list.f_datetime_oldfrom != '1900-01-01 00:00:00')
                    {
                        whereClause += " f_datetime_old >= to_date('" + tbl_ld_xxbgnr_list.f_datetime_oldfrom + "','yyyy-MM-dd hh24:mi:ss') and ";
                    }

                    if (tbl_ld_xxbgnr_list.f_datetime_oldto != '1900-01-01 00:00:00')
                    {
                        whereClause += " f_datetime_old <= to_date('" + tbl_ld_xxbgnr_list.f_datetime_oldto + "','yyyy-MM-dd hh24:mi:ss') and ";
                    }          
		
				
			 	if (tbl_ld_xxbgnr_list.f_datetime_newfrom != '1900-01-01 00:00:00')
                    {
                        whereClause += " f_datetime_new >= to_date('" + tbl_ld_xxbgnr_list.f_datetime_newfrom + "','yyyy-MM-dd hh24:mi:ss') and ";
                    }

                    if (tbl_ld_xxbgnr_list.f_datetime_newto != '1900-01-01 00:00:00')
                    {
                        whereClause += " f_datetime_new <= to_date('" + tbl_ld_xxbgnr_list.f_datetime_newto + "','yyyy-MM-dd hh24:mi:ss') and ";
                    }          
		
				
			 	if (tbl_ld_xxbgnr_list.f_datetimetime_oldfrom != '1900-01-01 00:00:00')
                    {
                        whereClause += " f_datetimetime_old >= to_date('" + tbl_ld_xxbgnr_list.f_datetimetime_oldfrom + "','yyyy-MM-dd hh24:mi:ss') and ";
                    }

                    if (tbl_ld_xxbgnr_list.f_datetimetime_oldto != '1900-01-01 00:00:00')
                    {
                        whereClause += " f_datetimetime_old <= to_date('" + tbl_ld_xxbgnr_list.f_datetimetime_oldto + "','yyyy-MM-dd hh24:mi:ss') and ";
                    }          
		
				
			 	if (tbl_ld_xxbgnr_list.f_datetimetime_newfrom != '1900-01-01 00:00:00')
                    {
                        whereClause += " f_datetimetime_new >= to_date('" + tbl_ld_xxbgnr_list.f_datetimetime_newfrom + "','yyyy-MM-dd hh24:mi:ss') and ";
                    }

                    if (tbl_ld_xxbgnr_list.f_datetimetime_newto != '1900-01-01 00:00:00')
                    {
                        whereClause += " f_datetimetime_new <= to_date('" + tbl_ld_xxbgnr_list.f_datetimetime_newto + "','yyyy-MM-dd hh24:mi:ss') and ";
                    }          
		
			 			
				if (tbl_ld_xxbgnr_list.f_toggle_old.length > 0)
                    {
                        whereClause += " f_toggle_old like '%" + tbl_ld_xxbgnr_list.f_toggle_old + "%' and ";
                    }	          
		
			 			
				if (tbl_ld_xxbgnr_list.f_toggle_new.length > 0)
                    {
                        whereClause += " f_toggle_new like '%" + tbl_ld_xxbgnr_list.f_toggle_new + "%' and ";
                    }	          
		
			 			
				if (tbl_ld_xxbgnr_list.f_textarea_old.length > 0)
                    {
                        whereClause += " f_textarea_old like '%" + tbl_ld_xxbgnr_list.f_textarea_old + "%' and ";
                    }	          
		
			 			
				if (tbl_ld_xxbgnr_list.f_textarea_new.length > 0)
                    {
                        whereClause += " f_textarea_new like '%" + tbl_ld_xxbgnr_list.f_textarea_new + "%' and ";
                    }	          
		      
                    
                  

                        if (whereClause.length > 0)
                        {
                            whereClause = whereClause.substr(0, whereClause.length - 4);
                        }
                    }
                    _whereClauseString = whereClause;
                    callBackFunction.success();
                }
                break;
        }
    },
    /* 
    *  
    *  方法:gridSelectedChange
    *  参数:
    *  根据_pr_gridselectids的情况，设置清空按钮
    */
    gridSelectedChange = function ()
    {
        if (that._pr_gridselectids == '')
        {
            $('#btn_command_clearselect_tbl_ld_xxbgnr_list').addClass('hidden');
        }
        else
        {
            $('#btn_command_clearselect_tbl_ld_xxbgnr_list').removeClass('hidden');
            var allcount = that._pr_gridselectids.split('^').length;
            var currentcount = $('#table_grid_tbl_ld_xxbgnr_list').bootstrapTable('getSelections').length;
            $('#btn_command_clearselect_tbl_ld_xxbgnr_list .cc-badge-p').html(currentcount + '/' + allcount);
        }
    };


    //=================================================================================
    //                                      公有
    //=================================================================================
    var that = {

        //=================================================================================
        //                                      公有属性 
        //=================================================================================
        //1：可编辑；2：只读
        _pr_listtype: '',
        //当前被选中的行的ID集合的字符串//1^2^6
        _pr_gridselectids: '',
        //当前在第几页
        _pr_gridpageindex: 1,
        //当前的查询模式：1：简单查询；2：高级查询
        _pr_searchtype: '1',
        //查询内容type1:简单查询内容；type2：高级查询内容（JSON）
        _pr_searchcontent: null,


        //=================================================================================
        //                                      公有方法 
        //=================================================================================
        /* 
        *  
        *  方法:init
        *  参数:
        *  初始化页面
        */
        init: function ()
        {
            try
            {
                _alertMessage = new alertMessage();
                _resultMessage = new resultMessage();
                _confirmMessage = new confirmMessage();
                _blockMessage = new blockMessage();
                _blockMessage.show('程序加载中...', 'loading');
                basePageObj.initBasePage({
                    success: function ()
                    {
                        //初始化参数
                        initParameter({
                            success: function ()
                            {

                                creatWhereClause({
                                    success: function ()
                                    {
                                        initGrid({
                                            success: function ()
                                            {
                                                that.bindGrid({
                                                    success: function ()
                                                    {

                                                        _validateMessage = new validateMessage('btn_search_modal_search_tbl_ld_xxbgnr_list');

                                                        _ladda_btn_command_export = Ladda.create('btn_command_export_tbl_ld_xxbgnr_list');

                                                        switch (that._pr_listtype)
                                                        {
                                                            case "1":
                                                                setDisable(false);
                                                                break;
                                                            case "2":
                                                                setDisable(true);
                                                                break;
                                                        }

                                                        _blockMessage.hidden();
                                                    }
                                                });
                                            }
                                        });

                                    }
                                });

                                //初始化search
                                initSearchBaseCode({
                                    success: function ()
                                    {
                                        initSearchControl({
                                            success: function ()
                                            {
                                                setSearchModel({
                                                    success: function ()
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
                    fail: function (message)
                    {
                        _blockMessage.show(message, 'fail');
                    }
                });
            }
            catch (ex)
            {
                _blockMessage.show('程序初始化失败。<br/>' + ex.message, 'fail');
            }
        },

        //---------------------------------------------------------------------------------
        // ---------------------------------grid------------------------------------------
        //---------------------------------------------------------------------------------
        /* 
        *  
        *  方法:bindGrid
        *  参数:callBackFunction
        *  根据_whereClauseString，_pageSize，_pr_gridpageindex绑定数据
        */
        bindGrid: function (callBackFunction)
        {
            setTimeout(function ()
            {
                if (_whereClauseString == "")
                {
                    _whereClauseString = " 1 = 1 ";
                }
                _whereClauseString += " and (SELECT f_bglxid from tbl_ld_xxbg where sys_id=t.fk_tbl_ld_xxbg_sys_id)='3' and f_bgnr is not null";


                var whereClause = _whereClauseString;
                var orderByString = ' sys_id desc';
                var columnsString = '(SELECT f_khbh from tbl_ld_xxbg where sys_id=b.fk_tbl_ld_xxbg_sys_id) as f_value1^(SELECT f_khxx from tbl_ld_xxbg where sys_id=b.fk_tbl_ld_xxbg_sys_id) as f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^f_bgnr^f_bgnrid^f_singledropdowngroup_dy_old^f_singledropdowngroup_dy_oldid^f_singledropdowngroup_sc_old^f_singledropdowngroup_sc_oldid^f_singledropdowngroup_qy_old^f_singledropdowngroup_qy_oldid^f_singledropdowngroup_pq_old^f_singledropdowngroup_pq_oldid^f_singledropdowngroup_dy_new^f_singledropdowngroup_dy_newid^f_singledropdowngroup_sc_new^f_singledropdowngroup_sc_newid^f_singledropdowngroup_qy_new^f_singledropdowngroup_qy_newid^f_singledropdowngroup_pq_new^f_singledropdowngroup_pq_newid^f_text_old^f_text_new^f_singledropdownlist_old^f_singledropdownlist_oldid^f_singledropdownlist_new^f_singledropdownlist_newid^f_multidropdownlist_old^f_multidropdownlist_oldid^f_multidropdownlist_new^f_multidropdownlist_newid^f_datetime_old^f_datetime_new^f_datetimetime_old^f_datetimetime_new^f_toggle_old^f_toggle_new^f_textarea_old^f_textarea_new^sys_id';
                var data = {
                    whereString: whereClause,
                    orderByString: orderByString,
                    columnsString: columnsString,
                    pageSizeString: _pageSize,
                    pageIndexString: that._pr_gridpageindex,
                    clientInf: _clientInf
                };
                doAjaxFunction(_serviceUrl, 'GetList', data, {
                    success: function (result)
                    {
                        var messageJson = (new Function("", "return " + result))();

                        $('#table_grid_tbl_ld_xxbgnr_list').bootstrapTable("loadJson", messageJson);

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

        /* 
        *  
        *  方法:btn_command_new_onclick
        *  参数:
        *  新建数据并跳转到detail页面
        */
        btn_command_export_onclick: function ()
        {

            _ladda_btn_command_export.start();
            if (_whereClauseString == "")
            {
                var where = " 1=1";
            }
            else
            {
                var where = _whereClauseString;
            }
            //var orderByString = ' sys_id desc';
            //var columnsString = 'f_khbh,f_sjbh,f_jfbh,f_yhm,f_dz,f_dj,f_cbyslj,f_sflj,f_pwflj,f_shss,f_jmjelj,f_jffs,f_jcfs,f_yyy,f_czsj,f_sfykfp,f_kplb,f_yyt,f_zt,f_ly';
            //var colunmsName = '客户编号,收据编号,缴费编号,用户名,地址,单价,抄表应收累计,水费累计,污水处理费累计,算后实收,减免金额,缴费方式,缴存方式,操作人,操作时间,是否已开发票,开票类别,营业厅,状态,来源';
            //if (_whereClauseString == "")
            //{
            //    var where = " 1=1 and";
            //    where += " f_khbh = " + that._pr_khbh;
            //}
            //else
            //{
            //    var where = _whereClauseString;
            //    where += " and f_khbh = " + that._pr_khbh;
            //}
            var columnsString = '(SELECT f_khbh from tbl_ld_xxbg where sys_id=b.fk_tbl_ld_xxbg_sys_id) as f_value1,(SELECT f_khxx from tbl_ld_xxbg where sys_id=b.fk_tbl_ld_xxbg_sys_id) as f_value2,f_bgnr,f_text_old,f_text_new';
            var colunmsName = '客户编号,客户信息,变更内容,变更前,变更后';
            var orderByString = ' sys_id desc';
            var data = {
                whereString: where,
                orderByString: orderByString,
                column: columnsString,
                columnname: colunmsName,
                clientInf: _clientInf
            };

            doAjaxFunction(_serviceUrl, 'Export', data, {
                success: function (message)
                {
                    _ladda_btn_command_export.stop();

                    window.open(message, "_blank", "");
                },
                fail: function (message)
                {
                    _ladda_btn_command_export.stop();

                    _alertMessage.show('数据导出失败', 'fail');
                    _resultMessage.show(message);
                },
                error: function (message)
                {
                    _ladda_btn_command_export.stop();

                    _alertMessage.show('数据导出失败', 'fail');
                    _resultMessage.show(message);
                }
            });

        },

        //---------------------------------------------------------------------------------
        // ---------------------------------SearchModel------------------------------------
        //---------------------------------------------------------------------------------

        /* 
        *  
        *  方法:btn_command_search_onclick
        *  参数:
        *  根据查询条件的录入情况构造_whereClauseString,清空分页情况和选中情况，重新绑定。
        *  主要是响应“简单查询”按钮的事件
        */
        btn_command_search_onclick: function ()
        {
            try
            {
                switch (that._pr_searchtype)
                {
                    case "1":
                        getSearchModel({
                            success: function ()
                            {
                                creatWhereClause({
                                    success: function ()
                                    {
                                        clearSearchModel();

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

        /* 
        *  
        *  方法:btn_command_search_1_onclick
        *  参数:
        *  简单查询模式
        */
        btn_command_search_1_onclick: function ()
        {
            that._pr_searchtype = '1';
            $('#btn_command_search_tbl_ld_xxbgnr_list').html('简单查询');
            $('#txt_command_search_tbl_ld_xxbgnr_list').removeAttr('disabled');
        },
        /* 
        *  
        *  方法:btn_command_search_2_onclick
        *  参数:
        *  高级查询模式
        */
        btn_command_search_2_onclick: function ()
        {


            that._pr_searchtype = '2';
            $('#btn_command_search_tbl_ld_xxbgnr_list').html('高级查询');
            $('#txt_command_search_tbl_ld_xxbgnr_list').attr('disabled', 'disabled');

            $('#div_search_modal_tbl_ld_xxbgnr_list').modal('show');
        },

        /* 
        *  
        *  方法:btn_search_modal_search_onclick
        *  参数:
        *  根据查询条件的录入情况构造_whereClauseString,清空分页情况和选中情况，重新绑定。
        *  主要是响应“高级查询”按钮的事件
        */
        btn_search_modal_search_onclick: function ()
        {
            getSearchModel({
                success: function ()
                {
                    checkSearchModel({
                        success: function ()
                        {
                            creatWhereClause({
                                success: function ()
                                {

                                    clearSearchModel();

                                    $('#div_search_modal_tbl_ld_xxbgnr_list').modal('hide')
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
        /* 
        *  
        *  方法:btn_search_modal_cancle_onclick
        *  参数:
        *  关闭高级查询窗体
        *  
        */
        btn_search_modal_cancle_onclick: function ()
        {
            _validateMessage.hidden();
            $('#div_search_modal_tbl_ld_xxbgnr_list').modal('hide');

            that._pr_searchtype = '1';
            $('#btn_command_search_tbl_ld_xxbgnr_list').html('简单查询');
            $('#txt_command_search_tbl_ld_xxbgnr_list').removeAttr('disabled');
        },
        /* 
        *  
        *  方法:btn_command_search_xs_onclick
        *  参数:
        *  小屏幕模式下打开高级查询模式
        *  
        */

        btn_command_search_xs_onclick: function ()
        {
            that._pr_searchtype = '2';
            $('#btn_command_search_tbl_ld_xxbgnr_list').html('高级查询');
            $('#txt_command_search_tbl_ld_xxbgnr_list').attr('disabled', 'disabled');

            $('#div_search_modal_tbl_ld_xxbgnr_list').modal('show');
        }



    };
    return that;
})();

$(document).ready(function ()
{

    tbl_ld_xxbgnr_list_Obj.init();
});



