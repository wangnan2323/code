


var _clientInf = '{userid="",appcode="54",appname="",userip="",usermac="",username=""}';
var _blockMessage = null;
var _alertMessage = null;
var _resultMessage = null;
var _confirmMessage = null;

var tbl_ld_hsjlcardreport_list_Obj = (function ()
{
    'use strict';

    //=================================================================================
    //                                      私有
    //=================================================================================
    //=================================================================================
    //                                      私有属性 
    //=================================================================================
    var _serviceUrl = '',
    //Grid控件的分页参数，设置为空即可实现不分页
    _pageSize = '',
    _isPage = true,
    //Code数据存储容器
    _baseCodeHashMap = null,
    //查询sql语句
    _whereClauseString = '',

     _ladda_btn_prview = null,
          _ladda_btn_prview3 = null,

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
            that._pr_appcode = requestQuery('appcode');
            that._pr_gridselectids = requestQuery('gridselectids');
            that._pr_gridpageindex = requestQuery('gridpageIndex');
            that._pr_searchcontent = requestQuery('searchcontent');
            _clientInf = '{userid:"' + basePageObj._userInfoJson.sys_userid + '",appcode:"' + that._pr_appcode + '",appname:"",userip:"' + basePageObj._userInfoJson.ip + '",usermac:"' + basePageObj._userInfoJson.mac + '",username:"' + basePageObj._userInfoJson.sys_username + '"}';

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
            _blockMessage.show('initParameter执行失败<br/>' + ex.message, 'fail');
        }

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

        var codeServiceId = '';

        codeServiceId = codeServiceId.trimEnd('^');
        commonObj.getCodeServiceJson(codeServiceId, {
            success: function (resultArray)
            {
                try
                {
                    _baseCodeHashMap = new hashMap();

                    var sqlJson = {
                        "tbl_ld_cben": 'select sys_id as id,f_cbbh as text,f_cbymc,f_cbyid,f_cbzq,f_cbmc from tbl_ld_cben order by f_cbbh asc',
                    }

                    commonObj.querySqls(sqlJson, {
                        success: function (messageJson)
                        {
                            _baseCodeHashMap.put('codeservice_cben', messageJson["tbl_ld_cben"]);
                            callBackFunction.success();
                        },
                        fail: function (message)
                        {
                        }
                    })
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

            var codeservice_cben = _baseCodeHashMap.get('codeservice_cben');

            controlObj.singledropdownlistinit('search_f_cben_tbl_ld_hsjlcardreport_list', codeservice_cben);
            //模态窗口
            //$('#div_search_modal_tbl_ld_jfb_list').modal({
            //    keyboard: false,
            //    backdrop: 'static',
            //    show: false
            //});

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
    *  方法:getSearchModel
    *  参数:callBackFunction
    *  获取查询model的内容保存到_pr_searchcontent
    */
    getSearchModel = function (callBackFunction)
    {
        try
        {
            var tbl_ld_hsjlcardreport_list = new Object();
            tbl_ld_hsjlcardreport_list.f_cbbhid = controlObj.singledropdownlistid('search_f_cben_tbl_ld_hsjlcardreport_list');
            tbl_ld_hsjlcardreport_list.f_khbhfrom = controlObj.text('search_f_khbhfrom_tbl_ld_hsjlcardreport_list');
            tbl_ld_hsjlcardreport_list.f_khbhto = controlObj.text('search_f_khbhto_tbl_ld_hsjlcardreport_list');
            that._pr_searchcontent = tbl_ld_hsjlcardreport_list;
            callBackFunction.success(that._pr_searchcontent);
        }
        catch (ex)
        {
            callBackFunction.fail(ex.message);
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
        var tbl_ld_hsjlcardreport_list = that._pr_searchcontent;

        if (tbl_ld_hsjlcardreport_list.f_cbbhid.length > 0)
        {
            whereClause += " f_cbbhid = '" + tbl_ld_hsjlcardreport_list.f_cbbhid + "' and ";
        }

        if (tbl_ld_hsjlcardreport_list.f_khbhfrom.length > 0)
        {
            whereClause += " f_khbh >= '" + tbl_ld_hsjlcardreport_list.f_khbhfrom + "' and ";
        }

        if (tbl_ld_hsjlcardreport_list.f_khbhto.length > 0)
        {
            whereClause += " f_khbh <= '" + tbl_ld_hsjlcardreport_list.f_khbhto + "' and ";
        }

        if (whereClause.length > 0)
        {
            whereClause = whereClause.substr(0, whereClause.length - 4);
        }
        _whereClauseString = whereClause;

        callBackFunction.success();

    },
    /* 
    *  
    *  方法:gridSelectedChange
    *  参数:
    *  根据_pr_gridselectids的情况，设置清空按钮
    */


    end = function () { };


    //=================================================================================
    //                                      公有
    //=================================================================================
    var that = {

        //=================================================================================
        //                                      公有属性 
        //=================================================================================
        //appcode
        _pr_appcode: '',
        //1：可编辑；2：只读
        _pr_listtype: '',

        //当前被选中的行的ID集合的字符串//1^2^6
        _pr_gridselectids: '',
        //当前在第几页
        _pr_gridpageindex: 1,
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
                                ////初始化search
                                initSearchBaseCode({
                                    success: function ()
                                    {
                                        initSearchControl({
                                            success: function ()
                                            {
                                             
                                                _ladda_btn_prview = Ladda.create('btn_preview_tbl_ld_hsjlcardreport_list');
                                                _ladda_btn_prview3 = Ladda.create('btn_preview3_tbl_ld_hsjlcardreport_list');

                                                _blockMessage.hidden();
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
        // ---------------------------------按钮------------------------------------------
        //---------------------------------------------------------------------------------

        /* 
        *  
        *  方法:btn_preview_onclick
        *  查询按钮
        * 
        */
        btn_preview_onclick: function (para)
        {
           
           

          

            $("#div_print").html('');
            var f_nd = controlObj.text('search_nd_tbl_ld_hsjlcardreport_list');
            var f_cbbhid = controlObj.singledropdownlistid('search_f_cben_tbl_ld_hsjlcardreport_list');
            var f_khbhfrom = controlObj.text('search_khbhfrom_tbl_ld_hsjlcardreport_list');
            var f_khbhto = controlObj.text('search_khbhto_tbl_ld_hsjlcardreport_list');
            if (f_cbbhid == '')
            {
                _alertMessage.show('请选择抄本', 'fail');

            }
            //else if (f_nd == '')
            //{
            //    _alertMessage.show('请填写年度', 'fail');

            //}

            else
            {

                var ladda = null;
                if (para == '')
                {
                    ladda = _ladda_btn_prview;
                }
                else
                {
                    ladda = _ladda_btn_prview3;
                }
                ladda.start();

                var wherestring = " and 1=1";
                if (f_khbhfrom != "")
                {
                    wherestring += " and a.f_khbh>='" + f_khbhfrom + "'";
                }
                    if (f_khbhto != "")
                    {
                        wherestring += " and a.f_khbh<='" + f_khbhto + "'";
                    }

                var sqlJson = {
                    "rows": "select b.f_mph as f_mph,a.f_khbh as f_khbh ,a.f_lxth as f_lxth,a.f_yhm as f_yhm,a.f_dz as f_dz,a.f_sbbh as f_sbbh,a.f_sbkj as f_sbkj,a.f_yslx as f_yslx,b.f_azrq as f_azrq ,nvl((SELECT F_BQZM FROM TBL_LD_KHB_TIME WHERE f_khbh = a.f_khbh and F_TIME = to_date('" + f_nd + "-12-31', 'yyyy-mm-dd')  ),'0') as f_bqzm,a.f_yhfz as f_yhfz,(c.f_jtsj+c.f_pwf) as price from tbl_ld_khb a,tbl_ld_sbb b,tbl_ldbm_jtsj c where a.f_cbbhid='" + f_cbbhid + "' and a.f_sbbh=b.f_sbbh and a.f_yslxid=c.f_yslxid " + wherestring + " order by f_cbxh asc",
                    "total": "select count(*) as count  from(select a.f_khbh as f_khbh ,a.f_lxth as f_lxth,a.f_yhm as f_yhm,a.f_dz as f_dz,a.f_sbbh as f_sbbh,a.f_sbkj as f_sbkj,a.f_yslx as f_yslx,b.f_azrq as f_azrq ,a.f_bqzm as f_bqzm,a.f_yhfz as f_yhfz,(c.f_jtsj+c.f_pwf) as price from tbl_ld_khb a,tbl_ld_sbb b,tbl_ldbm_jtsj c where a.f_cbbhid='" + f_cbbhid + "' and a.f_sbbh=b.f_sbbh and a.f_yslxid=c.f_yslxid "+wherestring+")"
                }
               
                commonObj.querySqls(sqlJson, {
                    success: function (messageJson)
                    {
                        var rows = messageJson.rows;
                        var count = parseInt(messageJson.total[0]["count"]);
                        if (count > 0)
                        {
                            var pagecount = parseInt(count / 3);
                            var ys = parseInt(count % 3);
                            if (ys > 0)
                            {
                                pagecount = pagecount + 1;
                            }
                        }
                        var a = '';
                        var b = '';
                        var str = '';
                        var html = '';
                        if (para == '')
                        {

                        }
                        else
                        {
                            pagecount = parseInt(para);
                        }
                        //html += '<DIV STYLE="page-break-before:always">1';
                        //html += '</DIV>   ';
                        //html += '<DIV STYLE="page-break-before:always">2';
                        //html += '</DIV>   ';
                        //html += '<DIV STYLE="page-break-before:always">3';
                        //html += '</DIV>   ';

                        for (var i = 0; i < pagecount; i++)
                        {
                            var a1 = i * 3
                            var a2 = a1 + 1;
                            var a3 = a1 + 2;


                         
                            html += '<DIV STYLE="page-break-before:always">';
                         


                            if (i == 0)
                            {
                                html += '<table style="page-break-before:always;width:29.5cm;height:18.3cm;display:inline-block; margin:0; border-collapse:collapse;border-color:#000000" border="0" cellpadding="0" cellspacing="0" >';
                                html += '<tr style="height:2.3cm;">';
                            }
                            else
                            {
                                html += '<table style="page-break-before:always;width:29.5cm;height:18.8cm;display:inline-block; margin:0; border-collapse:collapse;border-color:#000000" border="0" cellpadding="0" cellspacing="0" >';
                                html += '<tr style="height:2.8cm;">';
                            }
                            
                            
                           
                            html += '<td style="width:5.5cm">&nbsp;&nbsp;</td>';
                            html += '<td style="width:22.5cm">';                                                 
                            //html += '<span style="font-size:19px;font-weight:bold;color:#000000;padding-left:17.5cm;" >' + f_nd + '</span></td>';
                            html += '<span style="font-size:19px;font-weight:bold;color:#000000;padding-left:17.5cm;" ></span></td>';

                            html += '<td style="width:1.5cm"></td>';
                            html += '</tr>';
                            html += '<tr style="height:15cm;">';
                            html += '<td>&nbsp;&nbsp;</td>';
                            html += '<td style="vertical-align:text-top;">';
                            html += '<table style="border-collapse:collapse;border-color:#000000" border="0" cellpadding="0" cellspacing="0">';
                            html += '<tr>';
                            html += '<td style="padding-left:0.1cm;padding-top:0px;vertical-align: text-top;">';

                            html += that.gethtml(messageJson.rows[a1]);

                            html += '</td>';
                            html += '<td style="padding-left:0.4cm;padding-top:0px;vertical-align: text-top;">';
                            

                            if (a2 < count)
                            {
                                html += that.gethtml(messageJson.rows[a2]);
                            }
                            else
                            {
                                html += that.gethtml();
                            }

                            html += '</td>';
                            html += '<td style="padding-left:0.4cm;padding-top:0px;vertical-align: text-top;">';
                            if (a3 < count)
                            {
                                html += that.gethtml(messageJson.rows[a3]);
                            }
                            else
                            {
                                html += that.gethtml();
                            }
                            html += '</td>';
                            html += '</tr>';
                            html += '</table>';
                            html += '</td>';
                            html += '<td></td>';
                            html += '</tr>';
                            html += '<tr style="height:1cm">';
                            html += '<td>&nbsp;&nbsp;</td>';
                            html += '<td>&nbsp;&nbsp;</td>';
                            html += '<td>&nbsp;&nbsp;</td>';
                            html += '</tr>';
                            html += ' </table>';

                            html += '</DIV>   ';
                        }

                        $('#div_loading').css('display', 'none');
                
                     
                        $("#div_print").html(html);

                        ladda.stop();
                        
                    },
                    fail: function (message)
                    {

                        ladda.stop();
                    }
                })

            }

        },

        btn_print: function ()
        {
            $("#div_print").print({
                //Use Global styles
                globalStyles: false,
                //Add link with attrbute media=print
                mediaPrint: false,
                //Print in a hidden iframe
                iframe: true,
                //Don't print this
                noPrintSelector: ".avoid-this",
                //Add this at top
                prepend: "",
                //Add this on bottom
                append: ""
            });
        },

        gethtml: function (khxxJson)
        {
            var getkhxxJson = khxxJson;

            var khbh = '';
            var lxth = '';
            var yhm = '';
            var dz = '';
            var sbbh = '';
            var kj = '';
            var azrq = '';
            var yslx = '';
            var dj = '';
            var bqzm = ''
            var yhfz = '';
            var mph = '';

            if (getkhxxJson == '' || getkhxxJson == null || getkhxxJson == undefined)
            {

            } else
            {
                khbh = getkhxxJson.f_khbh;
                lxth = getkhxxJson.f_lxth;
                yhm = getkhxxJson.f_yhm;
                dz = getkhxxJson.f_dz;//.substr(0, 38);
                sbbh = getkhxxJson.f_sbbh;
                kj = getkhxxJson.f_sbkj;
                azrq = getkhxxJson.f_azrq.toDateTime().Format("yyyy-MM-dd");
                yslx = getkhxxJson.f_yslx;//.substr(0, 10);
                dj = getkhxxJson.price;
                bqzm = getkhxxJson.f_bqzm;
                mph = getkhxxJson.f_mph;

                //龙达水务新立户表 龙达水务清户表 客服中心总表 客服中心大用户表 经营中心考核表 经营中心排子表 经营中心远传表 经营中心居民表
                yhfz = ',' + getkhxxJson.f_yhfz + ',';
                yhfz = yhfz.replaceAll(',龙达水务新立户表,', ',');
                yhfz = yhfz.replaceAll(',龙达水务清户表,', ',');
                yhfz = yhfz.replaceAll(',客服中心总表,', ',');
                yhfz = yhfz.replaceAll(',客服中心大用户表,', ',');
                yhfz = yhfz.replaceAll(',经营中心考核表,', ',');
                yhfz = yhfz.replaceAll(',经营中心排子表,', ',');
                yhfz = yhfz.replaceAll(',经营中心远传表,', ',');
                yhfz = yhfz.replaceAll(',经营中心居民表,', ',');
                yhfz = yhfz.trimEnd(',');
                yhfz = yhfz.trimStart(',');
                yhfz = yhfz.substr(0, 10);
            }
            var html = '';

            html += '<table style="width:7.6cm;border-collapse:collapse;border-color:#000000" border="0" cellpadding="0" cellspacing="0">';
            html += '<tr>';
            html += '<td>';
            html += '<table style="border-collapse:collapse;border-color:#000000" border="0" cellpadding="0" cellspacing="0">';
            html += '<tr style="height:0.8cm;">';
            html += '<td style="width:1.3cm;text-align:center;font-size:12px;border-color:#000000;color:#000000">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>';
            html += '<td style="width:2.6cm;text-align:center;font-size:12px;border-color:#000000">' + khbh + '</td>';
            html += '<td style="width:1.6cm;text-align:center;font-size:12px;border-color:#000000;color:#000000">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>';
            html += '<td style="width:2.1cm;text-align:center;font-size:12px;border-color:#000000">' + lxth + '</td>';
            html += '</tr>';
            html += '</table>';
            html += '</td>';
            html += '</tr>';
            html += '<tr>';
            html += '<td>';
            html += '<table style="border-collapse:collapse;width:7.6cm;border-color:#000000" border="0" cellpadding="0" cellspacing="0">';

            html += '<tr style="height:0.8cm;">';
            html += '<td style="width:0.95cm;text-align:center;font-size:12px;border-color:#000000;color:#000000">&nbsp;&nbsp;&nbsp;&nbsp;</td>';
            html += '<td style="text-align:center;border-color:#000000;position:relative;">';
            html += '<span style="position:absolute;top:0px;left:0px;right:0px;bottom:0px;font-size:12px;height:0.8cm;width:6.45cm;text-align: center;vertical-align: top;">' + yhm + '</span>';
            html += '</td>';
            html += '</tr>';

            html += '<tr style="height:1.4cm;">';
            html += '<td style="text-align:center;font-size:12px;width:0.95cm;border-color:#000000;color:#000000" rowspan="2">&nbsp;&nbsp;&nbsp;&nbsp;</td> ';
            html += '<td style="text-align:center;border-color:#000000;position:relative;">';
            html += '<span style="position:absolute;top:0px;left:0px;right:0px;bottom:0px;font-size:12px;height:1.4cm;width:6.45cm;text-align: center;vertical-align: top;">' + dz + '</span>';
            html += '</td>';
            html += ' </tr>';
            
            html += '</table>';
            html += '</td>';
            html += '</tr>';

            html += '<tr>';
            html += '<td>';
            html += '<table style="border-collapse:collapse;width:7.6cm;border-color:#000000" align="center" border="0" cellpadding="0" cellspacing="0">';

            html += '<tr style="height:0.8cm;">                                   ';
            html += '<td style="width:1.75cm;text-align:center;font-size:12px;border-color:#000000;color:#000000 ">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>';
            html += '<td style="width:1.45cm; text-align:center;border-color:#000000;position:relative;">';            
            html += '<span style="position:absolute;top:0px;left:0px;right:0px;bottom:0px;font-size:12px;height:0.8cm;width:3cm;text-align: left;vertical-align: top;">' + yhfz + '</span>';
            html += '</td>';

            html += '<td style="width:1.65cm; text-align:center;font-size:12px;border-color:#000000;color:#000000">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>';
            html += '<td style="width:2.75cm; text-align:center;border-color:#000000;position:relative;">';
            html += '<span style="position:absolute;top:0px;left:0px;right:0px;bottom:0px;font-size:12px;height:0.8cm;width:3cm;text-align: left;vertical-align: top;">' + mph + '</span>';
            html += '</td>';
            html += '</tr>';

            html += '<tr style="height:0.8cm;">';
            html += '<td style="text-align:center;font-size:12px; border-color:#000000;color:#000000">&nbsp;&nbsp;&nbsp;&nbsp;</td>'; 
            html += '<td style="text-align:center;border-color:#000000;position:relative;">';
            html += '<span style="position:absolute;top:0px;left:0px;right:0px;bottom:0px;font-size:12px;height:0.8cm;width:3cm;text-align: left;vertical-align: top;">' + kj + '</span>';
            html += '</td>';
            html += '<td style="text-align:center;font-size:12px;border-color:#000000;color:#000000 ">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>';
            if (azrq == '1900-01-01' || azrq == '1900/01/01' )
            {
                azrq = "&nbsp;&nbsp;&nbsp;&nbsp;";
            }
            html += '<td style="text-align:center;border-color:#000000;position:relative;">';
            html += '<span style="position:absolute;top:0px;left:0px;right:0px;bottom:0px;font-size:12px;height:0.8cm;width:3cm;text-align: left;vertical-align: top;">' + azrq + '</span>';
            html += '</td>';
            html += '</tr>';

            html += '<tr style="height:0.72cm;">';
            html += '<td style="text-align:center;font-size:12px;border-color:#000000;color:#000000 ">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </td>';
            html += '<td style="text-align:center;border-color:#000000;position:relative;">';
            html += '<span style="position:absolute;top:0px;left:0px;right:0px;bottom:0px;font-size:12px;height:0.72cm;width:3cm;text-align: left;vertical-align: top;">' + yslx + '</span>';
            html += '</td>';
            html += '<td style="text-align:center;font-size:12px; border-color:#000000;color:#000000">&nbsp;&nbsp;&nbsp;&nbsp;</td>';
            html += '<td style="text-align:center;border-color:#000000;position:relative;">';
            html += '<span style="position:absolute;top:0px;left:0px;right:0px;bottom:0px;font-size:12px;height:0.72cm;width:3cm;text-align: left;vertical-align: top;">' + dj + '</span>';
            html += '</td>';

            html += '</tr>';
            html += '</table>';
            html += '</td>';
            html += '</tr>';

            html += '<tr>';
            html += '<td>';
            html += '<table style="border-collapse:collapse;width:7.6cm;border-color:#000000" align="center" border="0" cellpadding="0" cellspacing="0">';
            html += '<tr style="height:0.80cm;">                                   ';
            html += '<td style="width:0.6cm;text-align:center;font-size:12px;border-color:#000000;color:#000000 ">&nbsp;&nbsp;</td>';
            html += '<td style="width:0.65cm;text-align:center;font-size:12px;border-color:#000000;color:#000000 ">&nbsp;&nbsp;</td>';
            html += '<td style="width:1.7cm;text-align:center;font-size:12px;border-color:#000000;color:#000000 ">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>';
            html += '<td style="width:1.15cm;text-align:center;font-size:12px;border-color:#000000;color:#000000 ">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>';
            html += '<td style="width:1.65cm;text-align:center;font-size:12px; border-color:#000000;color:#000000">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>';
            html += '<td style="width:1.8cm;text-align:center;font-size:12px;border-color:#000000;color:#000000 ">&nbsp;&nbsp;&nbsp;&nbsp;</td>';
            html += '</tr>';
            html += '<tr style="height:0.80cm;text-align:center;font-size:12px;">';
            html += '<td style="border-color:#000000;color:#000000">&nbsp;&nbsp;</td>';
            html += '<td style="border-color:#000000;color:#000000"></td>';
            html += '<td style="border-color:#000000">' + bqzm + '</td>';
            html += '<td style="border-color:#000000;color:#000000"></td>';
            html += '<td style="border-color:#000000;color:#000000"></td>';
            html += '<td style="border-color:#000000;color:#000000"></td>';
            html += '</tr>';
            var h = '';
            for (var i = 0; i < 12; i++)
            {
                h += '<tr style="height:0.80cm;text-align:center;font-size:12px;">';
                h += '<td style="border-color:#000000;color:#000000"></td>';
                h += '<td style="border-color:#000000;color:#000000"></td>';
                h += '<td style="border-color:#000000;color:#000000"></td>';
                h += '<td style="border-color:#000000;color:#000000"></td>';
                h += '<td style="border-color:#000000;color:#000000"></td>';
                h += '<td style="border-color:#000000;color:#000000"></td>';
                h += '</tr>';
            }       
            html += h;
            html += '</table>';
            html += '</td>';
            html += '</tr>';
            html += '</table>';
            return html;
        },
        end: function ()
        {
        }



    };
    return that;
})();

$(document).ready(function ()
{
    tbl_ld_hsjlcardreport_list_Obj.init();
});



