

var tbl_ld_xxbgnr_modallist_Obj = (function ()
{
    'use strict';
    //=================================================================================
    //                                      私有
    //=================================================================================
    //=================================================================================
    //                                      私有属性 
    //=================================================================================
    var _serviceUrl = '//127.0.0.1/sara.dd.ldsw/service/service_tbl_ld_xxbgnr.asmx/',

    _bgnrJsonArray = null,
    //Grid控件的分页参数，设置为空即可实现不分页
    _pageSize = '20',
    _isPage = true,
    //Code数据存储容器
    _baseCodeHashMap = null,

    _validateMessage_search = null,
    _validateMessage_detail = null,

    _ladda_btn_command_new = null,
    _ladda_btn_command_delete = null,

    //where语句
    _whereClauseString = '',

    //当前正在编辑的ID
    _gridEditId = '',
    //上一次的滚动条位置
    _gridStatusScrollTop = 0,
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
            
            var bglx = that._pr_bglxid
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
                    $('#btn_command_search_tbl_ld_xxbgnr_modallist').html('简单查询');
                    $('#txt_command_search_tbl_ld_xxbgnr_modallist').removeAttr("disabled");

                    break;
                case "2":
                    $('#btn_command_search_tbl_ld_xxbgnr_modallist').html('高级查询');
                    $('#txt_command_search_tbl_ld_xxbgnr_modallist').attr("disabled", true);
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
    *  方法:setDisable
    *  参数:isDisable
    *  设置detailModel是否只读
    */
    setDisable = function (isDisable)
    {

        controlObj.singledropdownlistdisable('detail_f_bgnr_tbl_ld_xxbgnr_modallist', isDisable);


        controlObj.singledropdownlistdisable('detail_f_singledropdowngroup_dy_old_tbl_ld_xxbgnr_modallist', true);


        controlObj.singledropdownlistdisable('detail_f_singledropdowngroup_sc_old_tbl_ld_xxbgnr_modallist', true);


        controlObj.singledropdownlistdisable('detail_f_singledropdowngroup_qy_old_tbl_ld_xxbgnr_modallist', true);


        controlObj.singledropdownlistdisable('detail_f_singledropdowngroup_pq_old_tbl_ld_xxbgnr_modallist', true);


        controlObj.singledropdownlistdisable('detail_f_singledropdowngroup_dy_new_tbl_ld_xxbgnr_modallist', isDisable);


        controlObj.singledropdownlistdisable('detail_f_singledropdowngroup_sc_new_tbl_ld_xxbgnr_modallist', isDisable);


        controlObj.singledropdownlistdisable('detail_f_singledropdowngroup_qy_new_tbl_ld_xxbgnr_modallist', isDisable);


        controlObj.singledropdownlistdisable('detail_f_singledropdowngroup_pq_new_tbl_ld_xxbgnr_modallist', isDisable);

        controlObj.textdisable('detail_f_text_old_tbl_ld_xxbgnr_modallist', true);

        controlObj.textdisable('detail_f_text_new_tbl_ld_xxbgnr_modallist', isDisable);


        controlObj.singledropdownlistdisable('detail_f_singledropdownlist_old_tbl_ld_xxbgnr_modallist', true);


        controlObj.singledropdownlistdisable('detail_f_singledropdownlist_new_tbl_ld_xxbgnr_modallist', isDisable);

        controlObj.multidropdownlistdisable('detail_f_multidropdownlist_old_tbl_ld_xxbgnr_modallist', true);

        controlObj.multidropdownlistdisable('detail_f_multidropdownlist_new_tbl_ld_xxbgnr_modallist', isDisable);

        controlObj.datetimedisable('detail_f_datetime_old_tbl_ld_xxbgnr_modallist_date', 'detail_f_datetime_old_tbl_ld_xxbgnr_modallist_time', true);

        controlObj.datetimedisable('detail_f_datetime_new_tbl_ld_xxbgnr_modallist_date', 'detail_f_datetime_new_tbl_ld_xxbgnr_modallist_time', isDisable);

        controlObj.datetimedisable('detail_f_datetimetime_old_tbl_ld_xxbgnr_modallist_date', 'detail_f_datetimetime_old_tbl_ld_xxbgnr_modallist_time', true);

        controlObj.datetimedisable('detail_f_datetimetime_new_tbl_ld_xxbgnr_modallist_date', 'detail_f_datetimetime_new_tbl_ld_xxbgnr_modallist_time', isDisable);


        controlObj.toggledisable('detail_f_toggle_old_tbl_ld_xxbgnr_modallist', true);


        controlObj.toggledisable('detail_f_toggle_new_tbl_ld_xxbgnr_modallist', isDisable);

        controlObj.textdisable('detail_f_textarea_old_tbl_ld_xxbgnr_modallist', true);

        controlObj.textdisable('detail_f_textarea_new_tbl_ld_xxbgnr_modallist', isDisable);

        if (isDisable)
        {
            $('#btn_detail_modal_save_tbl_ld_xxbgnr_modallist').addClass('hidden');
            $('#btn_command_delete_tbl_ld_xxbgnr_modallist').addClass('hidden');
            $('#btn_command_new_tbl_ld_xxbgnr_modallist').addClass('hidden');
        }
        else
        {
            $('#btn_detail_modal_save_tbl_ld_xxbgnr_modallist').removeClass('hidden');
            $('#btn_command_delete_tbl_ld_xxbgnr_modallist').removeClass('hidden');
            $('#btn_command_new_tbl_ld_xxbgnr_modallist').removeClass('hidden');
        }
    },

    /* 
    *  
    *  方法:initBaseCode
    *  参数:callBackFunction
    *  初始化Code，存储到_baseCodeHashMap
    */
    initBaseCode = function (callBackFunction)
    {
        
        var bgnrJsonArray = null;
        switch (that._pr_bglxid)
        {
        
            //用户
            case "1":
                bgnrJsonArray = [
//{ "id": "f_yhm", "text": "用户名", "type": "khb,yhb", "control": "text", "codetype": "", "codecontent": "", "validate": "must", "from": "front,back", "field": "khb.f_yhm,yhb.f_yhm" },
//{ "id": "f_hth", "text": "合同号", "type": "khb,yhb", "control": "text", "codetype": "", "codecontent": "", "validate": "", "from": "front,back", "field": "khb.f_hth,yhb.f_htbh" },
//{ "id": "f_jfm", "text": "缴费名", "type": "khb,yhb", "control": "text", "codetype": "", "codecontent": "", "validate": "must", "from": "front,back", "field": "khb.f_jfm,yhb.f_jfm" },
//{ "id": "f_yhfz", "text": "用户分组", "type": "khb,yhb", "control": "multidropdownlist", "codetype": "sql", "codecontent": "codeservice_yhfz", "validate": "must", "from": "front,back", "field": "khb,f_yhfz,khb,f_yhfzid,yhb,f_yhfz,yhb,f_yhfzid" },
//{ "id": "f_dz", "text": "地址", "type": "khb,yhb", "control": "text", "codetype": "", "codecontent": "", "validate": "", "from": "front,back", "field": "khb.f_dz,yhb.f_dz" },
//{ "id": "f_dy", "text": "地域", "type": "khb,yhb", "control": "singledropdowngroup", "codetype": "sql", "codecontent": "codeservice_0512", "validate": "", "from": "front,back", "field": "khb.f_dy,khb.f_dyid,yhb.f_dy,yhb.f_dyid, khb.f_sc,khb.f_scid,yhb.f_sc,yhb.f_scid,khb.f_qy,khb.f_qyid,yhb.f_qy,yhb.f_qyid,khb.f_pq,khb.f_pqid,yhb.f_pq,yhb.f_pqid" },
//{ "id": "f_tsyxzh", "text": "托收银行账号", "type": "khb,yhb", "control": "text", "codetype": "", "codecontent": "", "validate": "", "from": "front,back", "field": "khb.f_tsyhzh,yhb.f_tsyhzh" },
//{ "id": "f_khrq", "text": "开户日期", "type": "khb,yhb", "control": "datetime", "codetype": "", "codecontent": "", "validate": "", "from": "front,back", "field": "khb.f_khrq,yhb.f_khrq" },
//{ "id": "f_wxwybz", "text": "微信唯一标志", "type": "khb,yhb", "control": "text", "codetype": "", "codecontent": "", "validate": "", "from": "front,back", "field": "khb.f_wxwybz,yhb.f_wxwybz" },
//{ "id": "f_zfbwybz", "text": "支付宝唯一标志", "type": "khb,yhb", "control": "text", "codetype": "", "codecontent": "", "validate": "", "from": "front,back", "field": "khb.f_zfbwybz,yhb.f_zfbwybz" },
//{ "id": "f_gdyhwybz", "text": "光大银行唯一标志", "type": "khb,yhb", "control": "text", "codetype": "", "codecontent": "", "validate": "", "from": "front,back", "field": "khb.f_gdyhwybz,yhb.f_gdyhwybz" },
//{ "id": "f_dh", "text": "电话", "type": "khb,yhb", "control": "text", "codetype": "", "codecontent": "", "validate": "", "from": "front,back", "field": "yhb.f_dh" },
//{ "id": "f_sfts", "text": "是否托收", "type": "yhb", "control": "toggle", "codetype": "", "codecontent": "", "validate": "", "from": "front,back", "field": "yhb.f_sfts" },
{ "id": "f_tsyx", "text": "托收银行", "type": "yhb", "control": "singledropdownlist", "codetype": "code", "codecontent": "codeservice_0592", "validate": "", "from": "front,back", "field": "yhb.f_tsyx,yhb.f_tsyxid" },
{ "id": "f_sfzzs", "text": "是否增值税", "type": "yhb", "control": "toggle", "codetype": "", "codecontent": "", "validate": "", "from": "front,back", "field": "yhb.f_sfzzs" },
{ "id": "f_bz", "text": "用户备注", "type": "yhb", "control": "textarea", "codetype": "", "codecontent": "", "validate": "", "from": "front,back", "field": "yhb.f_bz" },
{ "id": "f_htqdrq", "text": "合同签订日期", "type": "yhb", "control": "datetime", "codetype": "", "codecontent": "", "validate": "", "from": "front,back", "field": "yhb.f_htqdrq" }]
                break;
            //过户
            case "0":
                bgnrJsonArray = [
{ "id": "f_yhm", "text": "用户名", "type": "khb,yhb", "control": "text", "codetype": "", "codecontent": "", "validate": "must", "from": "front,back", "field": "khb.f_yhm,yhb.f_yhm" },
{ "id": "f_jfm", "text": "缴费名", "type": "khb,yhb", "control": "text", "codetype": "", "codecontent": "", "validate": "must", "from": "front,back", "field": "khb.f_jfm,yhb.f_jfm" },
{ "id": "f_sfzh", "text": "身份证号", "type": "khb,yhb", "control": "text", "codetype": "", "codecontent": "", "validate": "", "from": "front,back", "field": "khb.f_sfzh,yhb.f_sfzh" },
{ "id": "f_hth", "text": "合同号", "type": "khb,yhb", "control": "text", "codetype": "", "codecontent": "", "validate": "", "from": "front,back", "field": "khb.f_hth,yhb.f_htbh" },
{ "id": "f_dz", "text": "地址", "type": "khb,yhb", "control": "text", "codetype": "", "codecontent": "", "validate": "", "from": "front,back", "field": "khb.f_dz,yhb.f_dz" },
{ "id": "f_dh", "text": "电话", "type": "khb,yhb", "control": "text", "codetype": "", "codecontent": "", "validate": "", "from": "front,back", "field": "khb.f_dh,yhb.f_dh" },
{ "id": "f_sfts", "text": "是否托收", "type": "yhb", "control": "toggle", "codetype": "", "codecontent": "", "validate": "", "from": "front,back", "field": "yhb.f_sfts" },
{ "id": "f_tsyxzh", "text": "托收银行账号", "type": "khb,yhb", "control": "text", "codetype": "", "codecontent": "", "validate": "", "from": "front,back", "field": "khb.f_tsyxzh,yhb.f_tsyxzh" },
{ "id": "f_tsyx", "text": "托收银行", "type": "yhb", "control": "singledropdownlist", "codetype": "code", "codecontent": "codeservice_0592", "validate": "", "from": "front,back", "field": "yhb.f_tsyx,yhb.f_tsyxid" }]
                break;
                //水表
            case "2":
                bgnrJsonArray = [
//{ "id": "f_sblx", "text": "水表类型", "type": "khb,sbb", "control": "singledropdownlist", "codetype": "code", "codecontent": "codeservice_0524", "validate": "must", "from": "front,back", "field": "khb.f_sblx,khb.f_sblxid,sbb.f_sblx,sbb.f_sblxid" },
//{ "id": "f_jllx", "text": "计量类型", "type": "khb,sbb", "control": "singledropdownlist", "codetype": "code", "codecontent": "codeservice_0525", "validate": "must", "from": "front,back", "field": "khb.f_jllx,khb.f_jllxid,sbb.f_jllx,sbb.f_jllxid" },
//{ "id": "f_rs", "text": "人数", "type": "khb,sbb", "control": "text", "codetype": "", "codecontent": "", "validate": "number", "from": "front,back", "field": "khb.f_rs,sbb.f_rs" },
//{ "id": "f_sbkj", "text": "水表口径", "type": "khb,sbb", "control": "singledropdownlist", "codetype": "code", "codecontent": "codeservice_0523", "validate": "must", "from": "front,back", "field": "khb.f_sbkj,khb.f_sbkjid, sbb.f_sbkj,sbb.f_sbkjid" },
//{ "id": "f_sbfz", "text": "水表分组", "type": "khb,sbb", "control": "singledropdownlist", "codetype": "sql", "codecontent": "codeservice_sbfz", "validate": "must", "from": "front,back", "field": "khb.f_sbfz,khb.f_sbfzid, sbb.f_sbfz,sbb.f_sbfzid" },
//{ "id": "f_bqzm", "text": "本期止码", "type": "khb,sbb", "control": "text", "codetype": "", "codecontent": "", "validate": "number", "from": "back", "field": "khb.f_bqzm,sbb.f_bqzm" },
//{ "id": "f_sqzm", "text": "上期止码", "type": "khb,sbb", "control": "text", "codetype": "", "codecontent": "", "validate": "number", "from": "back", "field": "khb.f_sqzm,sbb.f_sqzm" },
//{ "id": "f_bqsl", "text": "本期水量", "type": "khb,sbb", "control": "text", "codetype": "", "codecontent": "", "validate": "number", "from": "back", "field": "khb.f_bqsl,sbb.f_bqsl" },
//{ "id": "f_sqsl", "text": "上期水量", "type": "khb,sbb", "control": "text", "codetype": "", "codecontent": "", "validate": "number", "from": "back", "field": "khb.f_sqsl,sbb.f_sqsl" },
//{ "id": "f_qsqpjsl", "text": "前三期平均水量", "type": "khb,sbb", "control": "text", "codetype": "", "codecontent": "", "validate": "number", "from": "back", "field": "khb.f_qsqpjsl,sbb.f_qsqpjsl" },
//{ "id": "f_qlqpjsl", "text": "前六期平均水量", "type": "khb,sbb", "control": "text", "codetype": "", "codecontent": "", "validate": "number", "from": "back", "field": "khb.f_qlqpjsl,sbb.f_qlqpjsl" },
//{ "id": "f_ljgl", "text": "累积购量", "type": "khb,sbb", "control": "text", "codetype": "", "codecontent": "", "validate": "number", "from": "back", "field": "khb.f_ljgl,sbb.f_ljgl" },
//{ "id": "f_nljgl", "text": "年累计购量", "type": "khb,sbb", "control": "text", "codetype": "", "codecontent": "", "validate": "number", "from": "back", "field": "khb.f_nljgl,sbb.f_nljgl" },
{ "id": "f_sbpp", "text": "水表品牌", "type": "sbb", "control": "text", "codetype": "", "codecontent": "", "validate": "", "from": "front,back", "field": "sbb.f_sbpp" },
{ "id": "f_mph", "text": "铭牌号", "type": "sbb", "control": "text", "codetype": "", "codecontent": "", "validate": "", "from": "front,back", "field": "sbb.f_mph" },
{ "id": "f_bz", "text": "水表备注", "type": "sbb", "control": "textarea", "codetype": "", "codecontent": "", "validate": "", "from": "front,back", "field": "sbb.f_bz" },
{ "id": "f_azrq", "text": "安装日期", "type": "sbb", "control": "datetime", "codetype": "", "codecontent": "", "validate": "must", "from": "front,back", "field": "sbb.f_azrq" },
{ "id": "f_qfzt", "text": "铅封状态", "type": "sbb", "control": "toggle", "codetype": "", "codecontent": "", "validate": "", "from": "front,back", "field": "sbb.f_qfzt" },
{ "id": "f_cszm", "text": "初始止码", "type": "sbb", "control": "text", "codetype": "", "codecontent": "", "validate": "number", "from": "back", "field": "sbb.f_cszm" }]
                break;
                //客户
            case "3":
                bgnrJsonArray = [
{ "id": "f_yhm", "text": "用户名", "type": "khb,yhb", "control": "text", "codetype": "", "codecontent": "", "validate": "must", "from": "front,back", "field": "khb.f_yhm,yhb.f_yhm" },

{ "id": "f_khfz", "text": "客户分组", "type": "khb", "control": "multidropdownlist", "codetype": "sql", "codecontent": "codeservice_khfz", "validate": "must", "from": "front,back", "field": "khb.f_khfz,khb.f_khfzid" },
{ "id": "f_ycje", "text": "绿化表押金", "type": "khb", "control": "text", "codetype": "", "codecontent": "", "validate": "number", "from": "front,back", "field": "khb.f_ycje" },
{ "id": "f_yslx", "text": "用水类型", "type": "khb", "control": "singledropdownlist", "codetype": "code", "codecontent": "codeservice_0555", "validate": "must", "from": "front,back", "field": "khb.f_yslx,khb.f_yslxid       " },
{ "id": "f_tbbh", "text": "套表编号", "type": "khb", "control": "text", "codetype": "", "codecontent": "", "validate": "", "from": "front,back", "field": "khb.f_tbbh" },
{ "id": "f_sfjlbjf", "text": "是否计量不计费", "type": "khb", "control": "toggle", "codetype": "", "codecontent": "", "validate": "", "from": "front,back", "field": "khb.f_sfjlbjf" },
{ "id": "f_zhcbrq", "text": "最后抄表日期", "type": "khb", "control": "datetime", "codetype": "", "codecontent": "", "validate": "lastday", "from": "back", "field": "khb.f_zhcbrq" },
{ "id": "f_tjjzpwf", "text": "调价结转污水处理费", "type": "khb", "control": "text", "codetype": "", "codecontent": "", "validate": "number", "from": "front,back", "field": "khb.f_tjjzpwf" },
{ "id": "f_tjjzsf", "text": "调价结转水费", "type": "khb", "control": "text", "codetype": "", "codecontent": "", "validate": "number", "from": "front,back", "field": "khb.f_tjjzsf" },
{ "id": "f_sqysl", "text": "申请用水量", "type": "khb", "control": "text", "codetype": "", "codecontent": "", "validate": "number", "from": "front,back", "field": "khb.f_sqysl" },
{ "id": "f_jhysl", "text": "计划用水量", "type": "khb", "control": "text", "codetype": "", "codecontent": "", "validate": "number", "from": "front,back", "field": "khb.f_jhysl" },
{ "id": "f_bz", "text": "客户备注", "type": "khb", "control": "textarea", "codetype": "", "codecontent": "", "validate": "", "from": "front,back", "field": "khb.f_bz" },
{ "id": "f_cbbh", "text": "抄本编号", "type": "khb", "control": "singledropdownlist", "codetype": "sql", "codecontent": "codeservice_cben", "validate": "must", "from": "front,back", "field": "khb.f_cbbh,khb.f_cbbhid,khb.f_cbyxm,khb.f_cbyid,khb.f_cbzq" },
{ "id": "f_cbxh", "text": "抄本序号", "type": "khb", "control": "text", "codetype": "", "codecontent": "", "validate": "must", "from": "front,back", "field": "khb.f_cbxh" },
{ "id": "f_sfzh", "text": "身份证号", "type": "khb,yhb", "control": "text", "codetype": "", "codecontent": "", "validate": "", "from": "front,back", "field": "khb.f_sfzh,yhb.f_sfzh" },
{ "id": "f_dh", "text": "电话", "type": "khb,yhb", "control": "text", "codetype": "", "codecontent": "", "validate": "", "from": "front,back", "field": "yhb.f_dh,khb.f_dh" },
{ "id": "f_hth", "text": "合同号", "type": "khb,yhb", "control": "text", "codetype": "", "codecontent": "", "validate": "", "from": "front,back", "field": "khb.f_hth,yhb.f_htbh" },
{ "id": "f_jfm", "text": "缴费名", "type": "khb,yhb", "control": "text", "codetype": "", "codecontent": "", "validate": "must", "from": "front,back", "field": "khb.f_jfm,yhb.f_jfm" },
{ "id": "f_yhfz", "text": "用户分组", "type": "khb,yhb", "control": "multidropdownlist", "codetype": "sql", "codecontent": "codeservice_yhfz", "validate": "must", "from": "front,back", "field": "khb.f_yhfz,khb.f_yhfzid,yhb.f_yhfz,yhb.f_yhfzid" },
{ "id": "f_dz", "text": "地址", "type": "khb,yhb", "control": "text", "codetype": "", "codecontent": "", "validate": "", "from": "front,back", "field": "khb.f_dz,yhb.f_dz" },
{ "id": "f_dy", "text": "地域", "type": "khb,yhb", "control": "singledropdowngroup", "codetype": "sql", "codecontent": "codeservice_0512", "validate": "", "from": "front,back", "field": "khb.f_dy,khb.f_dyid,yhb.f_dy,yhb.f_dyid, khb.f_sc,khb.f_scid,yhb.f_sc,yhb.f_scid,khb.f_qy,khb.f_qyid,yhb.f_qy,yhb.f_qyid,khb.f_pq,khb.f_pqid,yhb.f_pq,yhb.f_pqid" },
{ "id": "f_tsyxzh", "text": "托收银行账号", "type": "khb,yhb", "control": "text", "codetype": "", "codecontent": "", "validate": "", "from": "front,back", "field": "khb.f_tsyxzh,yhb.f_tsyxzh" },
{ "id": "f_khrq", "text": "开户日期", "type": "khb,yhb", "control": "datetime", "codetype": "", "codecontent": "", "validate": "", "from": "front,back", "field": "khb.f_khrq,yhb.f_khrq" },
{ "id": "f_wxwybz", "text": "微信唯一标志", "type": "khb,yhb", "control": "text", "codetype": "", "codecontent": "", "validate": "", "from": "front,back", "field": "khb.f_wxwybz,yhb.f_wxwybz" },
{ "id": "f_zfbwybz", "text": "支付宝唯一标志", "type": "khb,yhb", "control": "text", "codetype": "", "codecontent": "", "validate": "", "from": "front,back", "field": "khb.f_zfbwybz,yhb.f_zfbwybz" },
{ "id": "f_gdyhwybz", "text": "光大银行唯一标志", "type": "khb,yhb", "control": "text", "codetype": "", "codecontent": "", "validate": "", "from": "front,back", "field": "khb.f_gdyhwybz,yhb.f_gdyxwybz" },
{ "id": "f_sblx", "text": "水表类型", "type": "khb,sbb", "control": "singledropdownlist", "codetype": "code", "codecontent": "codeservice_0524", "validate": "must", "from": "front,back", "field": "khb.f_sblx,khb.f_sblxid,sbb.f_sblx,sbb.f_sblxid" },
{ "id": "f_jllx", "text": "计量类型", "type": "khb,sbb", "control": "singledropdownlist", "codetype": "code", "codecontent": "codeservice_0525", "validate": "must", "from": "front,back", "field": "khb.f_jllx,khb.f_jllxid,sbb.f_jllx,sbb.f_jllxid" },
{ "id": "f_rs", "text": "人数", "type": "khb,sbb", "control": "text", "codetype": "", "codecontent": "", "validate": "number", "from": "front,back", "field": "khb.f_rs,sbb.f_rs" },
{ "id": "f_sbkj", "text": "水表口径", "type": "khb,sbb", "control": "singledropdownlist", "codetype": "code", "codecontent": "codeservice_0523", "validate": "must", "from": "front,back", "field": "khb.f_sbkj,khb.f_sbkjid, sbb.f_sbkj,sbb.f_sbkjid" },
{ "id": "f_sbfz", "text": "水表分组", "type": "khb,sbb", "control": "singledropdownlist", "codetype": "sql", "codecontent": "codeservice_sbfz", "validate": "must", "from": "front,back", "field": "khb.f_sbfz,khb.f_sbfzid, sbb.f_sbfz,sbb.f_sbfzid" },
{ "id": "f_bqzm", "text": "本期止码", "type": "khb,sbb", "control": "text", "codetype": "", "codecontent": "", "validate": "", "from": "back", "field": "khb.f_bqzm,sbb.f_bqzm" },
{ "id": "f_sqzm", "text": "上期止码", "type": "khb,sbb", "control": "text", "codetype": "", "codecontent": "", "validate": "", "from": "back", "field": "khb.f_sqzm,sbb.f_sqzm" },
{ "id": "f_bqsl", "text": "本期水量", "type": "khb,sbb", "control": "text", "codetype": "", "codecontent": "", "validate": "", "from": "back", "field": "khb.f_bqsl,sbb.f_bqsl" },
{ "id": "f_sqsl", "text": "上期水量", "type": "khb,sbb", "control": "text", "codetype": "", "codecontent": "", "validate": "", "from": "back", "field": "khb.f_sqsl,sbb.f_sqsl" },
{ "id": "f_qsqpjsl", "text": "前三期平均水量", "type": "khb,sbb", "control": "text", "codetype": "", "codecontent": "", "validate": "", "from": "back", "field": "khb.f_qsqpjsl,sbb.f_qsqpjsl" },
{ "id": "f_qlqpjsl", "text": "前六期平均水量", "type": "khb,sbb", "control": "text", "codetype": "", "codecontent": "", "validate": "", "from": "back", "field": "khb.f_qlqpjsl,sbb.f_qlqpjsl" },
{ "id": "f_ljgl", "text": "累积购量", "type": "khb,sbb", "control": "text", "codetype": "", "codecontent": "", "validate": "number", "from": "back", "field": "khb.f_ljgl,sbb.f_ljgl" },
{ "id": "f_nljgl", "text": "年累计购量", "type": "khb,sbb", "control": "text", "codetype": "", "codecontent": "", "validate": "number", "from": "back", "field": "khb.f_nljgl,sbb.f_nljgl" },
{ "id": "f_ickljgl", "text": "IC卡累计购量", "type": "khb", "control": "text", "codetype": "", "codecontent": "", "validate": "number", "from": "back", "field": "khb.f_ickljgl" },
{ "id": "f_sbdz", "text": "水表地址", "type": "khb,sbb", "control": "text", "codetype": "", "codecontent": "", "validate": "", "from": "front,back", "field": "khb.f_sbdz,sbb.f_sbdz" }]
                break;
            case "4":
                bgnrJsonArray = [
{ "id": "f_zt", "text": "状态", "type": "khb,yhb,sbb", "control": "singledropdownlist", "codetype": "code", "codecontent": "codeservice_0556", "validate": "must", "from": "front,back", "field": "khb.f_zt,khb.f_ztid,yhb.f_zt,yhb.f_ztid,sbb.f_zt,sbb.f_ztid" }
                ]
                break;
            case "5":
                bgnrJsonArray = [
{ "id": "f_zt", "text": "状态", "type": "khb,yhb,sbb", "control": "singledropdownlist", "codetype": "code", "codecontent": "codeservice_0556", "validate": "must", "from": "front,back", "field": "khb.f_zt,khb.f_ztid,yhb.f_zt,yhb.f_ztid,sbb.f_zt,sbb.f_ztid" }
                ]
                break;
        }

        var ly = tbl_ld_xxbg_detail_Obj._pr_isadmin;
        var bgnrJsonArray_ = $.grep(bgnrJsonArray, function (u, i)
        {
            //0 管理员 显示全部 含有back  
            if (ly == '0')
            {
                //大于-1时表示包括back
                //'front') = -1  -------------只能在后台进行修改
                return u.from.indexOf('back') > -1;
                //return u.from.indexOf('front') = -1;
            }
            else
            {
                return u.from.indexOf('front') > -1;
            }
        });

        _bgnrJsonArray = bgnrJsonArray_;

        var codeServiceId = '';
        codeServiceId += "0457^";

        codeServiceId += "0458^";

        codeServiceId += "0459^";

        codeServiceId += "0460^";

        codeServiceId += "0461^";

        codeServiceId += "0462^";

        codeServiceId += "0463^";

        codeServiceId += "0464^";

        codeServiceId += "0465^";
        codeServiceId += "0466^";

        codeServiceId += "0467^";

        codeServiceId += "0468^";

        codeServiceId += "0469^";
        //------------------------
        codeServiceId += "0555^";
        codeServiceId += "0556^";
        codeServiceId += "0524^";

        codeServiceId += "0525^";
        codeServiceId += "0523^";
        codeServiceId += "0592^";

        codeServiceId = codeServiceId.trimEnd('^');
        commonObj.getCodeServiceJson(codeServiceId, {
            success: function (resultArray)
            {
                try
                {
                    _baseCodeHashMap = new hashMap();
                    var codenull = [];
                    _baseCodeHashMap.put('codeservice_0457', bgnrJsonArray);

                    _baseCodeHashMap.put('codeservice_0513', codenull);

                    _baseCodeHashMap.put('codeservice_0514', codenull);

                    _baseCodeHashMap.put('codeservice_0515', codenull);

                    _baseCodeHashMap.put('codeservice_0458', resultArray['0458']);

                    _baseCodeHashMap.put('codeservice_0459', resultArray['0459']);

                    _baseCodeHashMap.put('codeservice_0460', resultArray['0460']);

                    _baseCodeHashMap.put('codeservice_0461', resultArray['0461']);

                    _baseCodeHashMap.put('codeservice_0462', resultArray['0462']);

                    _baseCodeHashMap.put('codeservice_0463', resultArray['0463']);

                    _baseCodeHashMap.put('codeservice_0464', resultArray['0464']);

                    _baseCodeHashMap.put('codeservice_0465', resultArray['0465']);

                    _baseCodeHashMap.put('codeservice_0466', resultArray['0466']);

                    _baseCodeHashMap.put('codeservice_0467', resultArray['0467']);

                    _baseCodeHashMap.put('codeservice_0468', resultArray['0468']);

                    _baseCodeHashMap.put('codeservice_0469', resultArray['0469']);

                    _baseCodeHashMap.put('codeservice_0555', resultArray['0555']);

                    _baseCodeHashMap.put('codeservice_0524', resultArray['0524']);

                    _baseCodeHashMap.put('codeservice_0525', resultArray['0525']);

                    _baseCodeHashMap.put('codeservice_0523', resultArray['0523']);

                    _baseCodeHashMap.put('codeservice_0556', resultArray['0556']);

                    _baseCodeHashMap.put('codeservice_0592', resultArray['0592']);
                    var sqlJson = {
                        "tbl_ldbm_sbfz": "select sys_id as id, f_fzmc as text,decode(f_ztid,'0','false','true') as disabled from tbl_ldbm_sbfz where sys_delflag='0'  order by sys_id",
                        "tbl_ldbm_khfz": "select sys_id as id,f_fzmc as text,decode(f_ztid,'0','false','true') as disabled from tbl_ldbm_khfz where sys_delflag='0'  order by sys_id",
                        "tbl_ldbm_cben": "select sys_id as id,f_cbbh as text,f_cbymc,f_cbyid,f_cbzq,f_cbmc ,decode(f_ztid,'0','false','true') as disabled from tbl_ld_cben order by f_cbbh",
                        "tbl_ldbm_yhfz": "select sys_id as id,f_fzmc as text,decode(f_ztid,'0','false','true') as disabled from tbl_ldbm_yhfz where sys_delflag='0'  order by sys_id",
                        "tbl_ldbm_dycq": "select sys_id as id, f_mc as text ,sys_orderid as nodeid ,decode(f_ztid,'0','false','true') as disabled from tbl_ldbm_dycq where sys_delflag='0'and length(sys_orderid)=4 order by sys_orderid",
                        "tbl_ldbm_sc": "select sys_id as id, f_mc as text ,sys_orderid as nodeid ,decode(f_ztid,'0','false','true') as disabled from tbl_ldbm_dycq where sys_delflag='0'and length(sys_orderid)=8 order by sys_orderid",
                        "tbl_ldbm_qy": "select sys_id as id, f_mc as text ,sys_orderid as nodeid ,decode(f_ztid,'0','false','true') as disabled from tbl_ldbm_dycq where sys_delflag='0'and length(sys_orderid)=12 order by sys_orderid",
                        "tbl_ldbm_pq": "select sys_id as id, f_mc as text ,sys_orderid as nodeid ,decode(f_ztid,'0','false','true') as disabled from tbl_ldbm_dycq where sys_delflag='0'and length(sys_orderid)=16 order by sys_orderid",

                    }

                    commonObj.querySqls(sqlJson, {
                        success: function (messageJson)
                        {

                            $.each(messageJson["tbl_ldbm_sbfz"], function (i, u)
                            {
                                if (messageJson["tbl_ldbm_sbfz"][i]["disabled"] == "true")
                                {
                                    messageJson["tbl_ldbm_sbfz"][i]["disabled"] = true;
                                }
                                else
                                {
                                    messageJson["tbl_ldbm_sbfz"][i]["disabled"] = false;
                                }
                            });
                            _baseCodeHashMap.put('codeservice_sbfz', messageJson["tbl_ldbm_sbfz"]);
                            _baseCodeHashMap.put('codeservice_khfz', messageJson["tbl_ldbm_khfz"]);
                            _baseCodeHashMap.put('codeservice_cben', messageJson["tbl_ldbm_cben"]);
                            _baseCodeHashMap.put('codeservice_yhfz', messageJson["tbl_ldbm_yhfz"]);
                            _baseCodeHashMap.put('codeservice_0512', messageJson["tbl_ldbm_dycq"]);
                            _baseCodeHashMap.put('codeservice_sc', messageJson["tbl_ldbm_sc"]);
                            _baseCodeHashMap.put('codeservice_qy', messageJson["tbl_ldbm_qy"]);
                            _baseCodeHashMap.put('codeservice_pq', messageJson["tbl_ldbm_pq"]);

                            callBackFunction.success();
                        },
                        fail: function (message)
                        {
                        }
                    })
                }
                catch (ex)
                {
                    _blockMessage.show('initBaseCode执行失败<br/>' + ex.message, 'fail');
                }
            }
        });

    },


    //=============================Model操作===================================

    //---------------------------------------------------------------------------------
    // ---------------------------------Grid------------------------------------
    //---------------------------------------------------------------------------------
    /* 
    *  
    *  方法:creatWhereClause
    *  参数:callBackFunction
    *  根据_pr_searchcontent创建_whereClauseString
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

                                    whereClause += " f_text_old like '%" + vv[i] + "%' or ";

                                    whereClause += " f_text_new like '%" + vv[i] + "%' or ";

                                    whereClause += " f_singledropdownlist_old like '%" + vv[i] + "%' or ";

                                    whereClause += " f_singledropdownlist_new like '%" + vv[i] + "%' or ";


                                    whereClause += " to_char(f_datetime_old,'yyyy-MM-dd hh24:mi:ss') like '%" + vv[i] + "%' or ";


                                    whereClause += " to_char(f_datetime_new,'yyyy-MM-dd hh24:mi:ss') like '%" + vv[i] + "%' or ";

                                    whereClause += " f_multidropdownlist_old like '%" + vv[i] + "%' or ";

                                    whereClause += " f_multidropdownlist_new like '%" + vv[i] + "%' or ";

                                    whereClause += " f_toggle_old like '%" + vv[i] + "%' or ";

                                    whereClause += " f_toggle_new like '%" + vv[i] + "%' or ";


                                    whereClause += " to_char(f_datetimetime_old,'yyyy-MM-dd hh24:mi:ss') like '%" + vv[i] + "%' or ";


                                    whereClause += " to_char(f_datetimetime_new,'yyyy-MM-dd hh24:mi:ss') like '%" + vv[i] + "%' or ";

                                    whereClause += " f_textarea_old like '%" + vv[i] + "%' or ";

                                    whereClause += " f_textarea_new like '%" + vv[i] + "%' or ";

                                    whereClause += " f_singledropdowngroup_dy_old like '%" + vv[i] + "%' or ";

                                    whereClause += " f_singledropdowngroup_sc_old like '%" + vv[i] + "%' or ";

                                    whereClause += " f_singledropdowngroup_qy_old like '%" + vv[i] + "%' or ";

                                    whereClause += " f_singledropdowngroup_pq_old like '%" + vv[i] + "%' or ";

                                    whereClause += " f_singledropdowngroup_dy_new like '%" + vv[i] + "%' or ";

                                    whereClause += " f_singledropdowngroup_sc_new like '%" + vv[i] + "%' or ";

                                    whereClause += " f_singledropdowngroup_qy_new like '%" + vv[i] + "%' or ";

                                    whereClause += " f_singledropdowngroup_pq_new like '%" + vv[i] + "%' or ";

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
            $('#btn_command_clearselect_tbl_ld_xxbgnr_modallist').addClass('hidden');

        }
        else
        {
            $('#btn_command_clearselect_tbl_ld_xxbgnr_modallist').removeClass('hidden');
            var allcount = that._pr_gridselectids.split('^').length;
            var currentcount = $('#table_grid_tbl_ld_xxbgnr_modallist').bootstrapTable('getSelections').length;
            $('#btn_command_clearselect_tbl_ld_xxbgnr_modallist .cc-badge-p').html(currentcount + '/' + allcount);
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
            
            var gridHeight = 300;
      

            $('#table_grid_tbl_ld_xxbgnr_modallist').bootstrapTable({
                cache: false,
                height: gridHeight,
                striped: true,
                pagination: _isPage,
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

                                if (('^' + that._pr_gridselectids + '^').indexOf('^' + row.sys_id + '^') > -1)
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
                    field: 'sys_id', title: 'sys_id', "class": 'gridcell-ordercolumn hidden',
                    align: 'center',
                    valign: 'middle',
                    visible: true,
                    sortable: false,
                },


                {
                    field: 'f_value1',
                    title: '备用字段1',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        return resultStr;
                    }
                },


                {
                    field: 'f_value2',
                    title: '备用字段2',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        return resultStr;
                    }
                },


                {
                    field: 'f_value3',
                    title: '备用字段3',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        return resultStr;
                    }
                },


                {
                    field: 'f_value4',
                    title: '备用字段4',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        return resultStr;
                    }
                },


                {
                    field: 'f_value5',
                    title: '备用字段5',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        return resultStr;
                    }
                },


                {
                    field: 'f_value6',
                    title: '备用字段6',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        return resultStr;
                    }
                },


                {
                    field: 'f_value7',
                    title: '备用字段7',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        return resultStr;
                    }
                },


                {
                    field: 'f_value8',
                    title: '备用字段8',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        return resultStr;
                    }
                },


                {
                    field: 'f_value9',
                    title: '备用字段9',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        return resultStr;
                    }
                },


                {
                    field: 'f_value10',
                    title: '备用字段10',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        return resultStr;
                    }
                },


                {
                    field: 'f_bgnr',
                    title: '变更内容',
                    "class": '',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;


                        //var bgnrid = row.f_bgnrid
                        //var json = $.grep(_bgnrJsonArray, function (n, i)
                        //{
                        //    return n.id == tbl_ld_xxbgnr_modallist.f_bgnrid;
                        //});

                        return resultStr;
                    }
                },


                {
                    field: 'f_bgnrid',
                    title: '变更内容id',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        return resultStr;
                    }
                },


                {
                    field: 'f_bgnrid',
                    title: '变更信息',
                    "class": '',
                    align: 'left', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                       
                        var resultHtml = '';

                        //{
                        //    resultHtml += "<strong>原值：</strong>&nbsp;&nbsp;" + row.f_text_old + "</br>";
                        //    resultHtml += "<strong>新值：</strong>&nbsp;&nbsp;" + row.f_text_new + "</br>";
                        //}
                        //else if(row.f_text_new != "" && row.f_text_old == "")
                        //{
                        //    resultHtml += "<strong>原值：</strong>&nbsp;&nbsp;" + row.f_text_old + "</br>";
                        //    resultHtml += "<strong>新值：</strong>&nbsp;&nbsp;" + row.f_text_new + "</br>";
                        //}
                        //else if (row.f_text_new == "" && row.f_text_old != "")
                        //{
                        //    resultHtml += "<strong>原值：</strong>&nbsp;&nbsp;" + row.f_text_old + "</br>";
                        //    resultHtml += "<strong>新值：</strong>&nbsp;&nbsp;" + row.f_text_new + "</br>";
                        //}
                        if (row.f_singledropdownlist_new == "" && row.f_singledropdownlist_old == "")
                        {

                        }
                        else
                        {
                            resultHtml += "<strong>原值：</strong>&nbsp;&nbsp;" + row.f_singledropdownlist_old + "</br>";
                            resultHtml += "<strong>新值：</strong>&nbsp;&nbsp;" + row.f_singledropdownlist_new + "</br>";
                        }
                        if (row.f_text_new == "" && row.f_text_old == "")
                        {
                  
                        } else
                        {
                            resultHtml += "<strong>原值：</strong>&nbsp;&nbsp;" + row.f_text_old + "</br>";
                            resultHtml += "<strong>新值：</strong>&nbsp;&nbsp;" + row.f_text_new + "</br>";
                        }
                        if (row.f_multidropdownlist_new == "" && row.f_multidropdownlist_old == "")
                        {
                        }
                        else
                        {
                            resultHtml += "<strong>原值：</strong>&nbsp;&nbsp;" + row.f_multidropdownlist_old  + "</br>" ;
                            resultHtml += "<strong>新值：</strong>&nbsp;&nbsp;" + row.f_multidropdownlist_new  + "</br>";
                        }
                        var date_old = row.f_datetime_old.toDateTime().Format("yyyy-MM-dd");
                        var date_new = row.f_datetime_new.toDateTime().Format("yyyy-MM-dd");

                        if (date_old == "1900-01-01 0:00:00".toDateTime().Format("yyyy-MM-dd") && date_new == "1900-01-01 0:00:00".toDateTime().Format("yyyy-MM-dd"))
                        {
                        }
                        else
                        {
                            var date_old = row.f_datetime_old.toDateTime().Format("yyyy-MM-dd");
                            var date_new = row.f_datetime_new.toDateTime().Format("yyyy-MM-dd");
                            if (date_old == '1900-01-01')
                            {
                                date_old = "空";
                            }
                            if (date_new == '1900-01-01')
                            {
                                date_new = "空";
                            }
                            resultHtml += "<strong>原值：</strong>&nbsp;&nbsp;" + date_old + "</br>";
                            resultHtml += "<strong>新值：</strong>&nbsp;&nbsp;" + date_new + "</br>";

                        }
                        date_old = row.f_datetimetime_old.toDateTime().Format("yyyy-MM-dd");
                        date_new = row.f_datetimetime_new.toDateTime().Format("yyyy-MM-dd");

                        if (date_old == "1900-01-01 0:00:00".toDateTime().Format("yyyy-MM-dd") && date_new == "1900-01-01 0:00:00".toDateTime().Format("yyyy-MM-dd"))
                        {

                        }
                        else
                        {
                            resultHtml += "<strong>原值：</strong>&nbsp;&nbsp;" + row.f_datetimetime_old + "</br>";
                            resultHtml += "<strong>新值：</strong>&nbsp;&nbsp;" + row.f_datetimetime_new + "</br>";

                        }
                        if (row.f_singledropdowngroup_dy_new != '' ||  row.f_singledropdowngroup_dy_old != '')
                        {
                            resultHtml += "<strong>原值：</strong>&nbsp;&nbsp;地域：" + row.f_singledropdowngroup_dy_old + "&nbsp;&nbsp;&nbsp;&nbsp;水厂：" + row.f_singledropdowngroup_sc_old + "&nbsp;&nbsp;&nbsp;&nbsp;区域：" + row.f_singledropdowngroup_qy_old + "&nbsp;&nbsp;&nbsp;&nbsp;片区：" + row.f_singledropdowngroup_pq_old + "<br/>";
                            resultHtml += "<strong>新值：</strong>&nbsp;&nbsp;地域：" + row.f_singledropdowngroup_dy_new + "&nbsp;&nbsp;&nbsp;&nbsp;水厂：" + row.f_singledropdowngroup_sc_new + "&nbsp;&nbsp;&nbsp;&nbsp;区域：" + row.f_singledropdowngroup_qy_new + "&nbsp;&nbsp;&nbsp;&nbsp;片区：" + row.f_singledropdowngroup_pq_new + "<br/>";
                        }
                        else
                        {

                        }

                        if (row.f_textarea_new == "" && row.f_textarea_old == "")
                        {
                        }
                        else
                        {
                            resultHtml += "<strong>原值：</strong>&nbsp;&nbsp;" + row.f_textarea_old + "</br>";
                            resultHtml += "<strong>新值：</strong>&nbsp;&nbsp;" + row.f_textarea_new + "</br>";

                        }
                        if (row.f_toggle_new == "" && row.f_toggle_old == "")
                        {
                        }
                        else
                        {
                            resultHtml += "<strong>原值：</strong>&nbsp;&nbsp;" + row.f_toggle_old + "</br>";
                            resultHtml += "<strong>新值：</strong>&nbsp;&nbsp;" + row.f_toggle_new + "</br>";

                        }
                      
                        return resultHtml;
                    }
                },

                {
                    field: 'f_text_old',
                    title: 'text',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        //if (resultStr == null || resultStr == "")
                        //{
                        //    $('#table_grid_tbl_ld_xxbgnr_modallist').bootstrapTable.;

                        //}

                        return resultStr;
                    }
                },


                {
                    field: 'f_text_new',
                    title: 'text',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        if (resultStr.length > 10)
                        {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },


                {
                    field: 'f_singledropdownlist_old',
                    title: 'singledropdownlist',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        if (resultStr.length > 10)
                        {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },


                {
                    field: 'f_singledropdownlist_oldid',
                    title: 'singledropdownlistid',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        return resultStr;
                    }
                },


                {
                    field: 'f_singledropdownlist_new',
                    title: 'singledropdownlist',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        if (resultStr.length > 10)
                        {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },


                {
                    field: 'f_singledropdownlist_newid',
                    title: 'singledropdownlistid',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        return resultStr;
                    }
                },

                {
                    field: 'f_datetime_old',
                    title: 'datetime',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        if (value == "")
                        {
                            value = "1900-01-01 00:00:00";
                        }
                        var resultStr = value.toDateTime().Format("yyyy-MM-dd");
                        if (resultStr == '1900-01-01')
                        {
                            resultStr = "&nbsp;&nbsp;";
                        }



                        return resultStr;

                    }
                },

                {
                    field: 'f_datetime_new',
                    title: 'datetime',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        if (value == "")
                        {
                            value = "1900-01-01 00:00:00";
                        }
                        var resultStr = value.toDateTime().Format("yyyy-MM-dd");
                        if (resultStr == '1900-01-01')
                        {
                            resultStr = "&nbsp;&nbsp;";
                        }



                        return resultStr;

                    }
                },


                {
                    field: 'f_multidropdownlist_old',
                    title: 'multidropdownlist',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        if (resultStr.length > 10)
                        {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },


                {
                    field: 'f_multidropdownlist_oldid',
                    title: 'multidropdownlistid',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        return resultStr;
                    }
                },


                {
                    field: 'f_multidropdownlist_new',
                    title: 'multidropdownlist',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        if (resultStr.length > 10)
                        {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },


                {
                    field: 'f_multidropdownlist_newid',
                    title: 'multidropdownlistid',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        return resultStr;
                    }
                },


                {
                    field: 'f_toggle_old',
                    title: 'toggle',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        if (value == "true")
                        {
                            value = '开';
                        }
                        else
                        {
                            value = '关';
                        }
                        var resultStr = value;

                        if (resultStr.length > 10)
                        {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },


                {
                    field: 'f_toggle_new',
                    title: 'toggle',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        if (value == "true")
                        {
                            value = '开';
                        }
                        else
                        {
                            value = '关';
                        }
                        var resultStr = value;

                        if (resultStr.length > 10)
                        {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },

                {
                    field: 'f_datetimetime_old',
                    title: 'datetime_time',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {

                        if (value == "")
                        {
                            value = "1900-01-01 00:00:00";
                        }
                        var resultStr = value.toDateTime().Format("yyyy-MM-dd hh:mm:ss");
                        if (resultStr == '1900-01-01 00:00:00')
                        {
                            resultStr = "&nbsp;&nbsp;";
                        }



                        return resultStr;

                    }
                },

                {
                    field: 'f_datetimetime_new',
                    title: 'datetime_time',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {

                        if (value == "")
                        {
                            value = "1900-01-01 00:00:00";
                        }
                        var resultStr = value.toDateTime().Format("yyyy-MM-dd hh:mm:ss");
                        if (resultStr == '1900-01-01 00:00:00')
                        {
                            resultStr = "&nbsp;&nbsp;";
                        }



                        return resultStr;

                    }
                },


                {
                    field: 'f_textarea_old',
                    title: 'textarea',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        if (resultStr.length > 10)
                        {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },


                {
                    field: 'f_textarea_new',
                    title: 'textarea',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        if (resultStr.length > 10)
                        {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },


                {
                    field: 'f_singledropdowngroup_dy_old',
                    title: 'singledropdowngroup',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        if (resultStr.length > 10)
                        {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },


                {
                    field: 'f_singledropdowngroup_dy_oldid',
                    title: 'singledropdowngroupid',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        return resultStr;
                    }
                },


                {
                    field: 'f_singledropdowngroup_sc_old',
                    title: 'singledropdowngroup',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        if (resultStr.length > 10)
                        {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },


                {
                    field: 'f_singledropdowngroup_sc_oldid',
                    title: 'singledropdowngroupid',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        return resultStr;
                    }
                },


                {
                    field: 'f_singledropdowngroup_qy_old',
                    title: 'singledropdowngroup',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        if (resultStr.length > 10)
                        {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },


                {
                    field: 'f_singledropdowngroup_qy_oldid',
                    title: 'singledropdowngroupid',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        return resultStr;
                    }
                },


                {
                    field: 'f_singledropdowngroup_pq_old',
                    title: 'singledropdowngroup',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        if (resultStr.length > 10)
                        {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },


                {
                    field: 'f_singledropdowngroup_pq_oldid',
                    title: 'singledropdowngroupid',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        return resultStr;
                    }
                },


                {
                    field: 'f_singledropdowngroup_dy_new',
                    title: 'singledropdowngroup',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        if (resultStr.length > 10)
                        {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },


                {
                    field: 'f_singledropdowngroup_dy_newid',
                    title: 'singledropdowngroupid',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        return resultStr;
                    }
                },


                {
                    field: 'f_singledropdowngroup_sc_new',
                    title: 'singledropdowngroup',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        if (resultStr.length > 10)
                        {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },


                {
                    field: 'f_singledropdowngroup_sc_newid',
                    title: 'singledropdowngroupid',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        return resultStr;
                    }
                },


                {
                    field: 'f_singledropdowngroup_qy_new',
                    title: 'singledropdowngroup',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        if (resultStr.length > 10)
                        {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },


                {
                    field: 'f_singledropdowngroup_qy_newid',
                    title: 'singledropdowngroupid',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        return resultStr;
                    }
                },


                {
                    field: 'f_singledropdowngroup_pq_new',
                    title: 'singledropdowngroup',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        if (resultStr.length > 10)
                        {
                            resultStr = resultStr.substr(0, 10) + '...';
                        }

                        return resultStr;
                    }
                },


                {
                    field: 'f_singledropdowngroup_pq_newid',
                    title: 'singledropdowngroupid',
                    "class": 'hidden',
                    align: 'center', valign: 'middle', sortable: true, clickToSelect: true,
                    formatter: function (value, row, index)
                    {
                        var resultStr = value;

                        return resultStr;
                    }
                },

                {
                    field: '', title: '操作', "class": 'gridcell-editcolumn',
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

                            _gridEditId = row.sys_id;

                            getDetailData({
                                success: function (tbl_ld_xxbgnr_modallist)
                                {
                                    setDetailModel(tbl_ld_xxbgnr_modallist, {
                                        success: function ()
                                        {
                                            $('#div_detail_modal_tbl_ld_xxbgnr_modallist').modal('show');
                                        }, fail: function (message)
                                        {
                                            _alertMessage.show('setDetailModel执行失败', 'fail');
                                            _resultMessage.show(message);
                                        }
                                    });
                                }
                            });

                        },
                        'click .edit': function (e, value, row, index)
                        {

                            _gridEditId = row.sys_id;

                            getDetailData({
                                success: function (tbl_ld_xxbgnr_modallist)
                                {
                                    setDetailModel(tbl_ld_xxbgnr_modallist, {
                                        success: function ()
                                        {
                                            $('#div_detail_modal_tbl_ld_xxbgnr_modallist').modal('show');
                                        }, fail: function (message)
                                        {
                                            _alertMessage.show('setDetailModel执行失败', 'fail');
                                            _resultMessage.show(message);
                                        }
                                    });
                                }
                            });

                        }
                    }
                }
                ],
                onPageChange: function (size, number)
                {
                    that._pr_gridpageindex = number;
                    bindGrid(true, {
                        success: function ()
                        {
                        }, fail: function (message)
                        {
                            _alertMessage.show('绑定失败', 'fail');
                            _resultMessage.show(message);
                        }
                    });
                },
                rowStyle: function (row, index)
                {
                    //return {classes: 'active'//'success'//'info'//'warning' //'danger'};
                    return {};
                },
                onLoadSuccess: function (data)
                {
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
                    var rows = $('#table_grid_tbl_ld_xxbgnr_modallist').bootstrapTable('getSelections');
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
                    var rows = $('#table_grid_tbl_ld_xxbgnr_modallist').bootstrapTable('getData');
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
    *  方法:bindGrid
    *  参数:callBackFunction
    *  根据_whereClauseString，_pageSize，_pr_gridpageindex绑定数据
    */
    bindGrid = function (isClearStatus, callBackFunction)
    {
        if (isClearStatus == true)
        {
            _gridEditId = '';
            _gridStatusScrollTop = 0;

        }
        else
        {
            //记录滚动情况
            _gridStatusScrollTop = $('#table_grid_tbl_ld_xxbgnr_modallist').parent().scrollTop();
        }
        setTimeout(function ()
        {
            var whereClause = _whereClauseString;
            if (whereClause == "")
            {
                whereClause += " 1 = 1 ";
            }
            if (("^" + basePageObj._userInfoJson.sys_roles + "^").indexOf('^2022^') <= -1)
            {
                whereClause += " and sys_creatuserid = '" + basePageObj._userInfoJson.sys_userid + "'";
            }

            if (whereClause == "")
            {
                whereClause = " 1 = 1 ";
            }
            whereClause += " and fk_tbl_ld_xxbg_sys_id = '" + that._pr_fk_tbl_ld_xxbg_sys_id + "'";

            var orderByString = ' sys_id desc';
            var columnsString = 'f_value1^f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^f_bgnr^f_bgnrid^f_text_old^f_text_new^f_singledropdownlist_old^f_singledropdownlist_oldid^f_singledropdownlist_new^f_singledropdownlist_newid^f_datetime_old^f_datetime_new^f_multidropdownlist_old^f_multidropdownlist_oldid^f_multidropdownlist_new^f_multidropdownlist_newid^f_toggle_old^f_toggle_new^f_datetimetime_old^f_datetimetime_new^f_textarea_old^f_textarea_new^f_singledropdowngroup_dy_old^f_singledropdowngroup_dy_oldid^f_singledropdowngroup_sc_old^f_singledropdowngroup_sc_oldid^f_singledropdowngroup_qy_old^f_singledropdowngroup_qy_oldid^f_singledropdowngroup_pq_old^f_singledropdowngroup_pq_oldid^f_singledropdowngroup_dy_new^f_singledropdowngroup_dy_newid^f_singledropdowngroup_sc_new^f_singledropdowngroup_sc_newid^f_singledropdowngroup_qy_new^f_singledropdowngroup_qy_newid^f_singledropdowngroup_pq_new^f_singledropdowngroup_pq_newid^sys_id';

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
                    that._pr_count = messageJson.total;
                    $('#table_grid_tbl_ld_xxbgnr_modallist').bootstrapTable("loadJson", messageJson);
                    //定位
                    $('#table_grid_tbl_ld_xxbgnr_modallist').parent().scrollTop(_gridStatusScrollTop);
                    gridSelectedChange();
                    if (callBackFunction != undefined && callBackFunction != null)
                    {
                        callBackFunction.success();
                    }
                },
                fail: function (message)
                {
                    if (callBackFunction != undefined && callBackFunction != null)
                    {
                        callBackFunction.fail(message);
                    }
                }
            });
        }, 0);
    },
    //---------------------------------------------------------------------------------
    // ---------------------------------DetailModel------------------------------------
    //---------------------------------------------------------------------------------
    /* 
    *  
    *  方法:initDetailControl
    *  参数:
    *  初始化DetailModel控件，_baseCodeHashMap作为Code数据源
    */
    initDetailControl = function (callBackFunction)
    {
        try
        {
           
            var codeService_0457 = _baseCodeHashMap.get('codeservice_0457');
            controlObj.singledropdownlistinit('detail_f_bgnr_tbl_ld_xxbgnr_modallist', codeService_0457, f_bgnr_onchange);
           
            //模态窗口
            $('#div_detail_modal_tbl_ld_xxbgnr_modallist').modal({
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

    // ---------------------------------Model操作------------------------------------
    /* 
    *  
    *  方法:setDetailModel
    *  参数:callBackFunction
    *  根据传入的tbl_ld_xxbgnr_modallist，绑定DetailModel
    */
    setDetailModel = function (tbl_ld_xxbgnr_modallist, callBackFunction)
    {
        try
        {

            // var a = that._pr_pagetype;
            //容错  为空
            
            controlObj.singledropdownlistid('detail_f_bgnr_tbl_ld_xxbgnr_modallist', tbl_ld_xxbgnr_modallist.f_bgnrid);
            var bgnr = controlObj.singledropdownlistid('detail_f_bgnr_tbl_ld_xxbgnr_modallist');
            if (bgnr == null || bgnr == "")
            {
                $('.aa').addClass('hidden');
            }
            else
            {
                var json = $.grep(_bgnrJsonArray, function (n, i)
                {
                    return n.id == tbl_ld_xxbgnr_modallist.f_bgnrid;
                });
         
                if (json.length == 1)
                {
                    //容错 =1
                    switch (json[0].control)
                    {

                        case "text":

                            controlObj.text('detail_f_text_old_tbl_ld_xxbgnr_modallist', '');

                            controlObj.text('detail_f_text_new_tbl_ld_xxbgnr_modallist', '');

                            controlObj.text('detail_f_text_old_tbl_ld_xxbgnr_modallist', tbl_ld_xxbgnr_modallist.f_text_old);

                            controlObj.text('detail_f_text_new_tbl_ld_xxbgnr_modallist', tbl_ld_xxbgnr_modallist.f_text_new);
                            //设置text的值
                            $($('#div_detail_f_text_old_tbl_ld_xxbgnr_modallist').children()[1]).text(name);
                            //显示隐藏
                            $('.aa').addClass('hidden');
                            $('#div_detail_f_text_old_tbl_ld_xxbgnr_modallist').parent().parent().removeClass('hidden')
                            break;
                        case "textarea":

                            controlObj.text('detail_f_textarea_old_tbl_ld_xxbgnr_modallist', '');

                            controlObj.text('detail_f_textarea_new_tbl_ld_xxbgnr_modallist', '');

                            controlObj.text('detail_f_textarea_old_tbl_ld_xxbgnr_modallist', tbl_ld_xxbgnr_modallist.f_textarea_old);

                            controlObj.text('detail_f_textarea_new_tbl_ld_xxbgnr_modallist', tbl_ld_xxbgnr_modallist.f_textarea_new);
                            //设置text的值
                            $($('#div_detail_f_textarea_old_tbl_ld_xxbgnr_modallist').children()[1]).text(name);
                            //显示隐藏
                            $('.aa').addClass('hidden');
                            $('#div_detail_f_textarea_old_tbl_ld_xxbgnr_modallist').parent().parent().removeClass('hidden')
                            break;
                        case "toggle":

                            controlObj.toggle('detail_f_toggle_old_tbl_ld_xxbgnr_modallist', '');

                            controlObj.toggle('detail_f_toggle_new_tbl_ld_xxbgnr_modallist', '');

                            controlObj.toggle('detail_f_toggle_old_tbl_ld_xxbgnr_modallist', tbl_ld_xxbgnr_modallist.f_toggle_old);

                            controlObj.toggle('detail_f_toggle_new_tbl_ld_xxbgnr_modallist', tbl_ld_xxbgnr_modallist.f_toggle_new);
                            //设置text的值
                            $($('#div_detail_f_toggle_old_tbl_ld_xxbgnr_modallist').children()[1]).text(name);
                            //显示隐藏
                            $('.aa').addClass('hidden');
                            $('#div_detail_f_toggle_old_tbl_ld_xxbgnr_modallist').parent().parent().removeClass('hidden')
                            break;
                        case "datetimetime":

                            controlObj.datetime('detail_f_datetimetime_old_tbl_ld_xxbgnr_modallist', '1900-01-01 00:00:00');

                            controlObj.datetime('detail_f_datetimetime_new_tbl_ld_xxbgnr_modallist', '1900-01-01 00:00:00');

                            controlObj.datetime('detail_f_datetimetime_old_tbl_ld_xxbgnr_modallist', tbl_ld_xxbgnr_modallist.f_datetimetime_old);

                            controlObj.datetime('detail_f_datetimetime_new_tbl_ld_xxbgnr_modallist', tbl_ld_xxbgnr_modallist.f_datetimetime_new);
                            //设置text的值
                            $($('#div_detail_f_datetimetime_old_tbl_ld_xxbgnr_modallist_date').children()[1]).text(name);
                            //显示隐藏
                            $('.aa').addClass('hidden');
                            $('#detail_f_datetimetime_old_tbl_ld_xxbgnr_modallist_date').parent().parent().parent().parent().parent().removeClass('hidden')
                            break;
                        case "datetime":
                            var sj_old = tbl_ld_xxbgnr_modallist.f_datetime_old;
                            sj_old = sj_old.replaceAll('/', '-');
                            var sj_new = tbl_ld_xxbgnr_modallist.f_datetime_new;
                            sj_new = sj_new.replaceAll('/', '-')
                            controlObj.datetime('detail_f_datetime_old_tbl_ld_xxbgnr_modallist_date', '1900-01-01 00:00:00');

                            controlObj.datetime('detail_f_datetime_new_tbl_ld_xxbgnr_modallist_date', '1900-01-01 00:00:00');

                            controlObj.datetime('detail_f_datetime_old_tbl_ld_xxbgnr_modallist_date', sj_old);

                            controlObj.datetime('detail_f_datetime_new_tbl_ld_xxbgnr_modallist_date', sj_new);
                            //设置text的值
                            $($('#div_detail_f_datetime_old_tbl_ld_xxbgnr_modallist_date').children()[1]).text(name);
                            //显示隐藏
                            $('.aa').addClass('hidden');
                            $('#detail_f_datetime_old_tbl_ld_xxbgnr_modallist_date').parent().parent().parent().parent().parent().removeClass('hidden')
                            break;
                        case "multidropdownlist":

                            controlObj.multidropdownlistid('detail_f_multidropdownlist_old_tbl_ld_xxbgnr_modallist', '');

                            controlObj.multidropdownlistid('detail_f_multidropdownlist_new_tbl_ld_xxbgnr_modallist', '');

                            controlObj.multidropdownlistid('detail_f_multidropdownlist_old_tbl_ld_xxbgnr_modallist', tbl_ld_xxbgnr_modallist.f_multidropdownlist_oldid);

                            controlObj.multidropdownlistid('detail_f_multidropdownlist_new_tbl_ld_xxbgnr_modallist', tbl_ld_xxbgnr_modallist.f_multidropdownlist_newid);

                            //设置text的值
                            $($('#div_detail_f_multidropdownlist_old_tbl_ld_xxbgnr_modallist').children()[1]).text(name);
                            //显示隐藏
                            $('.aa').addClass('hidden');
                            $('#div_detail_f_multidropdownlist_old_tbl_ld_xxbgnr_modallist').parent().parent().removeClass('hidden')
                            break;
                        case "singledropdownlist":

                            controlObj.singledropdownlistid('detail_f_singledropdownlist_old_tbl_ld_xxbgnr_modallist', '');

                            controlObj.singledropdownlistid('detail_f_singledropdownlist_new_tbl_ld_xxbgnr_modallist', '');

                            controlObj.singledropdownlistid('detail_f_singledropdownlist_old_tbl_ld_xxbgnr_modallist', tbl_ld_xxbgnr_modallist.f_singledropdownlist_oldid);

                            controlObj.singledropdownlistid('detail_f_singledropdownlist_new_tbl_ld_xxbgnr_modallist', tbl_ld_xxbgnr_modallist.f_singledropdownlist_newid);
                            //设置text的值
                            $($('#div_detail_f_singledropdownlist_old_tbl_ld_xxbgnr_modallist').children()[1]).text(name);
                            //显示隐藏
                            $('.aa').addClass('hidden');
                            $('#detail_f_singledropdownlist_old_tbl_ld_xxbgnr_modallist').parent().parent().parent().removeClass('hidden')
                            break;
                        case "singledropdowngroup":

                            controlObj.singledropdownlistid('detail_f_singledropdowngroup_dy_old_tbl_ld_xxbgnr_modallist', '');

                            controlObj.singledropdownlistid('detail_f_singledropdowngroup_sc_old_tbl_ld_xxbgnr_modallist', '');

                            controlObj.singledropdownlistid('detail_f_singledropdowngroup_qy_old_tbl_ld_xxbgnr_modallist', '');

                            controlObj.singledropdownlistid('detail_f_singledropdowngroup_pq_old_tbl_ld_xxbgnr_modallist', '');

                            controlObj.singledropdownlistid('detail_f_singledropdowngroup_dy_new_tbl_ld_xxbgnr_modallist', '');

                            controlObj.singledropdownlistid('detail_f_singledropdowngroup_sc_new_tbl_ld_xxbgnr_modallist', '');

                            controlObj.singledropdownlistid('detail_f_singledropdowngroup_qy_new_tbl_ld_xxbgnr_modallist', '');

                            controlObj.singledropdownlistid('detail_f_singledropdowngroup_pq_new_tbl_ld_xxbgnr_modallist', '');


                            controlObj.singledropdownlistid('detail_f_singledropdowngroup_dy_old_tbl_ld_xxbgnr_modallist', tbl_ld_xxbgnr_modallist.f_singledropdowngroup_dy_oldid);
                            controlObj.singledropdownlistid('detail_f_singledropdowngroup_sc_old_tbl_ld_xxbgnr_modallist', tbl_ld_xxbgnr_modallist.f_singledropdowngroup_sc_oldid);
                            controlObj.singledropdownlistid('detail_f_singledropdowngroup_qy_old_tbl_ld_xxbgnr_modallist', tbl_ld_xxbgnr_modallist.f_singledropdowngroup_qy_oldid);
                            controlObj.singledropdownlistid('detail_f_singledropdowngroup_pq_old_tbl_ld_xxbgnr_modallist', tbl_ld_xxbgnr_modallist.f_singledropdowngroup_pq_oldid);

                            controlObj.singledropdownlistid('detail_f_singledropdowngroup_dy_new_tbl_ld_xxbgnr_modallist', tbl_ld_xxbgnr_modallist.f_singledropdowngroup_dy_newid);
                            controlObj.singledropdownlistid('detail_f_singledropdowngroup_sc_new_tbl_ld_xxbgnr_modallist', tbl_ld_xxbgnr_modallist.f_singledropdowngroup_sc_newid);
                            controlObj.singledropdownlistid('detail_f_singledropdowngroup_qy_new_tbl_ld_xxbgnr_modallist', tbl_ld_xxbgnr_modallist.f_singledropdowngroup_qy_newid);
                            controlObj.singledropdownlistid('detail_f_singledropdowngroup_pq_new_tbl_ld_xxbgnr_modallist', tbl_ld_xxbgnr_modallist.f_singledropdowngroup_pq_newid);


                            //显示隐藏
                            $('.aa').addClass('hidden');
                            $('#detail_f_singledropdowngroup_dy_old_tbl_ld_xxbgnr_modallist').parent().parent().parent().removeClass('hidden')

                            $('#detail_f_singledropdowngroup_dy_new_tbl_ld_xxbgnr_modallist').parent().parent().parent().removeClass('hidden')
                            break;
                    }

                }
                else
                {


                }


            }

            //{
            //    controlObj.text('detail_f_text_old_tbl_ld_xxbgnr_modallist', tbl_ld_xxbgnr_modallist.f_text_old);
            //    controlObj.text('detail_f_text_new_tbl_ld_xxbgnr_modallist', tbl_ld_xxbgnr_modallist.f_text_new);
            //    controlObj.singledropdownlistid('detail_f_singledropdownlist_old_tbl_ld_xxbgnr_modallist', tbl_ld_xxbgnr_modallist.f_singledropdownlist_oldid);
            //    controlObj.singledropdownlistid('detail_f_singledropdownlist_new_tbl_ld_xxbgnr_modallist', tbl_ld_xxbgnr_modallist.f_singledropdownlist_newid);



            callBackFunction.success();
        }
        catch (ex)
        {
            callBackFunction.fail(ex.message);

        }
    },

    /* 
    *  
    *  方法:getDetailModel
    *  参数:callBackFunction
    *  获取DetailMode的数据对象，返回数据对象
    */
    getDetailModel = function (callBackFunction)
    {

        try
        {

            var tbl_ld_xxbgnr_modallist = new Object();


            tbl_ld_xxbgnr_modallist.f_bgnr = controlObj.singledropdownlist('detail_f_bgnr_tbl_ld_xxbgnr_modallist');

            tbl_ld_xxbgnr_modallist.f_bgnrid = controlObj.singledropdownlistid('detail_f_bgnr_tbl_ld_xxbgnr_modallist');

            var bgnr = controlObj.singledropdownlistid('detail_f_bgnr_tbl_ld_xxbgnr_modallist');

            if (bgnr == null || bgnr == "")
            {

            }
            else
            {
                var json = $.grep(_bgnrJsonArray, function (n, i)
                {
                    return n.id == tbl_ld_xxbgnr_modallist.f_bgnrid;
                });

                if (json.length == 1)
                {
                    //容错 =1
                    switch (json[0].control)
                    {
                        case "singledropdowngroup":
                            tbl_ld_xxbgnr_modallist.f_singledropdowngroup_dy_old = controlObj.singledropdownlist('detail_f_singledropdowngroup_dy_old_tbl_ld_xxbgnr_modallist');
                            tbl_ld_xxbgnr_modallist.f_singledropdowngroup_dy_oldid = controlObj.singledropdownlistid('detail_f_singledropdowngroup_dy_old_tbl_ld_xxbgnr_modallist');

                            tbl_ld_xxbgnr_modallist.f_singledropdowngroup_sc_old = controlObj.singledropdownlist('detail_f_singledropdowngroup_sc_old_tbl_ld_xxbgnr_modallist');
                            tbl_ld_xxbgnr_modallist.f_singledropdowngroup_sc_oldid = controlObj.singledropdownlistid('detail_f_singledropdowngroup_sc_old_tbl_ld_xxbgnr_modallist');

                            tbl_ld_xxbgnr_modallist.f_singledropdowngroup_qy_old = controlObj.singledropdownlist('detail_f_singledropdowngroup_qy_old_tbl_ld_xxbgnr_modallist');
                            tbl_ld_xxbgnr_modallist.f_singledropdowngroup_qy_oldid = controlObj.singledropdownlistid('detail_f_singledropdowngroup_qy_old_tbl_ld_xxbgnr_modallist');

                            tbl_ld_xxbgnr_modallist.f_singledropdowngroup_pq_old = controlObj.singledropdownlist('detail_f_singledropdowngroup_pq_old_tbl_ld_xxbgnr_modallist');
                            tbl_ld_xxbgnr_modallist.f_singledropdowngroup_pq_oldid = controlObj.singledropdownlistid('detail_f_singledropdowngroup_pq_old_tbl_ld_xxbgnr_modallist');

                            tbl_ld_xxbgnr_modallist.f_singledropdowngroup_dy_new = controlObj.singledropdownlist('detail_f_singledropdowngroup_dy_new_tbl_ld_xxbgnr_modallist');
                            tbl_ld_xxbgnr_modallist.f_singledropdowngroup_dy_newid = controlObj.singledropdownlistid('detail_f_singledropdowngroup_dy_new_tbl_ld_xxbgnr_modallist');

                            tbl_ld_xxbgnr_modallist.f_singledropdowngroup_sc_new = controlObj.singledropdownlist('detail_f_singledropdowngroup_sc_new_tbl_ld_xxbgnr_modallist');
                            tbl_ld_xxbgnr_modallist.f_singledropdowngroup_sc_newid = controlObj.singledropdownlistid('detail_f_singledropdowngroup_sc_new_tbl_ld_xxbgnr_modallist');

                            tbl_ld_xxbgnr_modallist.f_singledropdowngroup_qy_new = controlObj.singledropdownlist('detail_f_singledropdowngroup_qy_new_tbl_ld_xxbgnr_modallist');
                            tbl_ld_xxbgnr_modallist.f_singledropdowngroup_qy_newid = controlObj.singledropdownlistid('detail_f_singledropdowngroup_qy_new_tbl_ld_xxbgnr_modallist');

                            tbl_ld_xxbgnr_modallist.f_singledropdowngroup_pq_new = controlObj.singledropdownlist('detail_f_singledropdowngroup_pq_new_tbl_ld_xxbgnr_modallist');
                            tbl_ld_xxbgnr_modallist.f_singledropdowngroup_pq_newid = controlObj.singledropdownlistid('detail_f_singledropdowngroup_pq_new_tbl_ld_xxbgnr_modallist');

                            break;

                        case "text":
                            tbl_ld_xxbgnr_modallist.f_text_old = controlObj.text('detail_f_text_old_tbl_ld_xxbgnr_modallist');
                            tbl_ld_xxbgnr_modallist.f_text_new = controlObj.text('detail_f_text_new_tbl_ld_xxbgnr_modallist');

                            break;
                        case "singledropdownlist":
                            tbl_ld_xxbgnr_modallist.f_singledropdownlist_old = controlObj.singledropdownlist('detail_f_singledropdownlist_old_tbl_ld_xxbgnr_modallist');
                            tbl_ld_xxbgnr_modallist.f_singledropdownlist_oldid = controlObj.singledropdownlistid('detail_f_singledropdownlist_old_tbl_ld_xxbgnr_modallist');

                            tbl_ld_xxbgnr_modallist.f_singledropdownlist_new = controlObj.singledropdownlist('detail_f_singledropdownlist_new_tbl_ld_xxbgnr_modallist');
                            tbl_ld_xxbgnr_modallist.f_singledropdownlist_newid = controlObj.singledropdownlistid('detail_f_singledropdownlist_new_tbl_ld_xxbgnr_modallist');

                            break;
                        case "multidropdownlist":
                            tbl_ld_xxbgnr_modallist.f_multidropdownlist_old = controlObj.multidropdownlist('detail_f_multidropdownlist_old_tbl_ld_xxbgnr_modallist');
                            tbl_ld_xxbgnr_modallist.f_multidropdownlist_oldid = controlObj.multidropdownlistid('detail_f_multidropdownlist_old_tbl_ld_xxbgnr_modallist');


                            tbl_ld_xxbgnr_modallist.f_multidropdownlist_new = controlObj.multidropdownlist('detail_f_multidropdownlist_new_tbl_ld_xxbgnr_modallist');
                            tbl_ld_xxbgnr_modallist.f_multidropdownlist_newid = controlObj.multidropdownlistid('detail_f_multidropdownlist_new_tbl_ld_xxbgnr_modallist');

                            break;
                        case "datetime":
                            tbl_ld_xxbgnr_modallist.f_datetime_old = controlObj.datetime('detail_f_datetime_old_tbl_ld_xxbgnr_modallist_date', 'detail_f_datetime_old_tbl_ld_xxbgnr_modallist_time');

                            tbl_ld_xxbgnr_modallist.f_datetime_new = controlObj.datetime('detail_f_datetime_new_tbl_ld_xxbgnr_modallist_date', 'detail_f_datetime_new_tbl_ld_xxbgnr_modallist_time');

                            break;
                        case "datetimetime":

                            tbl_ld_xxbgnr_modallist.f_datetimetime_old = controlObj.datetime('detail_f_datetimetime_old_tbl_ld_xxbgnr_modallist_date', 'detail_f_datetimetime_old_tbl_ld_xxbgnr_modallist_time');

                            tbl_ld_xxbgnr_modallist.f_datetimetime_new = controlObj.datetime('detail_f_datetimetime_new_tbl_ld_xxbgnr_modallist_date', 'detail_f_datetimetime_new_tbl_ld_xxbgnr_modallist_time');

                            break;
                        case "toggle":
                            tbl_ld_xxbgnr_modallist.f_toggle_old = controlObj.toggle('detail_f_toggle_old_tbl_ld_xxbgnr_modallist');

                            tbl_ld_xxbgnr_modallist.f_toggle_new = controlObj.toggle('detail_f_toggle_new_tbl_ld_xxbgnr_modallist');

                            break;
                        case "textarea":
                            tbl_ld_xxbgnr_modallist.f_textarea_old = controlObj.text('detail_f_textarea_old_tbl_ld_xxbgnr_modallist');

                            tbl_ld_xxbgnr_modallist.f_textarea_new = controlObj.text('detail_f_textarea_new_tbl_ld_xxbgnr_modallist');

                            break;

                    }
                }
            }

            callBackFunction.success(tbl_ld_xxbgnr_modallist);
        }
        catch (ex)
        {
            callBackFunction.fail(ex.message);
        }
    },

    /* 
    *  
    *  方法:checkDetailModel
    *  参数:tbl_ld_xxbgnr_modallist, callBackFunction
    *  根据传入的数据对象，校验数据内容_validateMessage_detail
    */
    checkDetailModel = function (tbl_ld_xxbgnr_modallist, callBackFunction)
    {
        try
        {

            var errorMessageHansMap = new hashMap();
            var errorMessagePlacementHansMap = new hashMap();
            var bgnr = controlObj.singledropdownlistid('detail_f_bgnr_tbl_ld_xxbgnr_modallist');
            if (bgnr == null || bgnr == "")
            {
            }
            else
            {
                var json = $.grep(_bgnrJsonArray, function (n, i)
                {
                    return n.id == tbl_ld_xxbgnr_modallist.f_bgnrid;
                });
                if (json.length == 1)
                {
                    //容错 =1
                    switch (json[0].control)
                    {
                        case "singledropdowngroup":
                            if (tbl_ld_xxbgnr_modallist.f_singledropdowngroup_dy_old.length > 200)
                            {
                                errorMessageHansMap.put('detail_f_singledropdowngroup_dy_old_tbl_ld_xxbgnr_modallist', '长度不能超过<a style="color:red">200</a>个字');
                            }
                            if (tbl_ld_xxbgnr_modallist.f_singledropdowngroup_sc_old.length > 200)
                            {
                                errorMessageHansMap.put('detail_f_singledropdowngroup_sc_old_tbl_ld_xxbgnr_modallist', '长度不能超过<a style="color:red">200</a>个字');
                            }
                            if (tbl_ld_xxbgnr_modallist.f_singledropdowngroup_qy_old.length > 200)
                            {
                                errorMessageHansMap.put('detail_f_singledropdowngroup_qy_old_tbl_ld_xxbgnr_modallist', '长度不能超过<a style="color:red">200</a>个字');
                            }
                            if (tbl_ld_xxbgnr_modallist.f_singledropdowngroup_pq_old.length > 200)
                            {
                                errorMessageHansMap.put('detail_f_singledropdowngroup_pq_old_tbl_ld_xxbgnr_modallist', '长度不能超过<a style="color:red">200</a>个字');
                            }
                            if (tbl_ld_xxbgnr_modallist.f_singledropdowngroup_dy_new.length > 200)
                            {
                                errorMessageHansMap.put('detail_f_singledropdowngroup_dy_new_tbl_ld_xxbgnr_modallist', '长度不能超过<a style="color:red">200</a>个字');
                            }
                            if (tbl_ld_xxbgnr_modallist.f_singledropdowngroup_sc_new.length > 200)
                            {
                                errorMessageHansMap.put('detail_f_singledropdowngroup_sc_new_tbl_ld_xxbgnr_modallist', '长度不能超过<a style="color:red">200</a>个字');
                            }
                            if (tbl_ld_xxbgnr_modallist.f_singledropdowngroup_qy_new.length > 200)
                            {
                                errorMessageHansMap.put('detail_f_singledropdowngroup_qy_new_tbl_ld_xxbgnr_modallist', '长度不能超过<a style="color:red">200</a>个字');
                            }
                            if (tbl_ld_xxbgnr_modallist.f_singledropdowngroup_pq_new.length > 200)
                            {
                                errorMessageHansMap.put('detail_f_singledropdowngroup_pq_new_tbl_ld_xxbgnr_modallist', '长度不能超过<a style="color:red">200</a>个字');
                            }
                            break;
                        case "text":
                            if (tbl_ld_xxbgnr_modallist.f_text_old.length > 200)
                            {
                                errorMessageHansMap.put('detail_f_text_old_tbl_ld_xxbgnr_modallist', '长度不能超过<a style="color:red">200</a>个字');
                            }
                            if (tbl_ld_xxbgnr_modallist.f_text_new.length > 200)
                            {
                                errorMessageHansMap.put('detail_f_text_new_tbl_ld_xxbgnr_modallist', '长度不能超过<a style="color:red">200</a>个字');
                            }
                            switch (json[0].validate)
                            {
                                case "must":
                                    if (tbl_ld_xxbgnr_modallist.f_text_new.length < 1)
                                    {
                                        errorMessageHansMap.put('detail_f_text_new_tbl_ld_xxbgnr_modallist', '不能为空');
                                    }
                                    break;
                                case "number":
                                    if (tbl_ld_xxbgnr_modallist.f_text_new != "" && !/^[0-9]+\.?[0-9]*$/.test(tbl_ld_xxbgnr_modallist.f_text_new))
                                    {
                                        errorMessageHansMap.put('detail_f_text_new_tbl_ld_xxbgnr_modallist', '必须是数字');
                                    }
                                    break;
                            }
                            break;
                        case "singledropdownlist":
                            if (tbl_ld_xxbgnr_modallist.f_singledropdownlist_old.length > 200)
                            {
                                errorMessageHansMap.put('detail_f_singledropdownlist_old_tbl_ld_xxbgnr_modallist', '长度不能超过<a style="color:red">200</a>个字');
                            }
                            if (tbl_ld_xxbgnr_modallist.f_singledropdownlist_new.length > 200)
                            {
                                errorMessageHansMap.put('detail_f_singledropdownlist_new_tbl_ld_xxbgnr_modallist', '长度不能超过<a style="color:red">200</a>个字');
                            }
                            switch (json[0].validate)
                            {
                                case "must":
                                    if (tbl_ld_xxbgnr_modallist.f_singledropdownlist_new.length < 1)
                                    {
                                        errorMessageHansMap.put('detail_f_singledropdownlist_new_tbl_ld_xxbgnr_modallist', '不能为空');
                                    }
                                    break;
                            }
                            break;
                        case "multidropdownlist":
                            if (tbl_ld_xxbgnr_modallist.f_multidropdownlist_old.length > 200)
                            {
                                errorMessageHansMap.put('detail_f_multidropdownlist_old_tbl_ld_xxbgnr_modallist', '长度不能超过<a style="color:red">200</a>个字');
                            }
                            if (tbl_ld_xxbgnr_modallist.f_multidropdownlist_new.length > 200)
                            {
                                errorMessageHansMap.put('detail_f_multidropdownlist_new_tbl_ld_xxbgnr_modallist', '长度不能超过<a style="color:red">200</a>个字');
                            }
                            switch (json[0].validate)
                            {
                                case "must":
                                    if (tbl_ld_xxbgnr_modallist.f_multidropdownlist_new.length < 1)
                                    {
                                        errorMessageHansMap.put('detail_f_multidropdownlist_new_tbl_ld_xxbgnr_modallist', '不能为空');
                                    }
                                    break;
                            }
                            break;
                        case "toggle":
                            if (tbl_ld_xxbgnr_modallist.f_toggle_old.length > 200)
                            {
                                errorMessageHansMap.put('detail_f_toggle_old_tbl_ld_xxbgnr_modallist', '长度不能超过<a style="color:red">200</a>个字');
                            }
                            if (tbl_ld_xxbgnr_modallist.f_toggle_new.length > 200)
                            {
                                errorMessageHansMap.put('detail_f_toggle_new_tbl_ld_xxbgnr_modallist', '长度不能超过<a style="color:red">200</a>个字');
                            }
                            switch (json[0].validate)
                            {
                                case "must":
                                    if (tbl_ld_xxbgnr_modallist.f_toggle_new.length < 1)
                                    {
                                        errorMessageHansMap.put('detail_f_toggle_new_tbl_ld_xxbgnr_modallist', '不能为空');
                                    }
                                    break;
                            }
                            break;
                        case "textarea":
                            if (tbl_ld_xxbgnr_modallist.f_textarea_old.length > 4000)
                            {
                                errorMessageHansMap.put('detail_f_textarea_old_tbl_ld_xxbgnr_modallist', '长度不能超过<a style="color:red">4000</a>个字');
                            }
                            if (tbl_ld_xxbgnr_modallist.f_textarea_new.length > 4000)
                            {
                                errorMessageHansMap.put('detail_f_textarea_new_tbl_ld_xxbgnr_modallist', '长度不能超过<a style="color:red">4000</a>个字');
                            }
                            break;
                        case "datetime":
                            switch (json[0].validate)
                            {
                                case "lastday":
                                    if (tbl_ld_xxbgnr_modallist.f_datetime_new.split(' ')[0].split('-')[2] != getLastDay(tbl_ld_xxbgnr_modallist.f_datetime_new.split('-')[0], tbl_ld_xxbgnr_modallist.f_datetime_new.split('-')[1]).toString())
                                    {
                                        errorMessageHansMap.put('detail_f_datetime_new_tbl_ld_xxbgnr_modallist_date', '最后抄表日期必须为本月的最后一天');
                                    }
                                    break;
                            }
                            break;
                    }
                }
                if (errorMessageHansMap.keys().length > 0)
                {
                    _validateMessage_detail.show(errorMessageHansMap, errorMessagePlacementHansMap, true);
                    callBackFunction.fail('');
                }
                else
                {
                    _validateMessage_detail.hidden();
                    callBackFunction.success(tbl_ld_xxbgnr_modallist);
                }
            }
        }
        catch (ex)

    {
            callBackFunction.fail(ex.message);
        }
    },
    /* 
    *  
    *  方法:clearDetailModel
    *  参数:tbl_ld_xxbgnr_modallist
    *  清空数据对象
    */
    clearDetailModel = function (tbl_ld_xxbgnr_modallist)
    {

        tbl_ld_xxbgnr_modallist.f_bgnr = '';
        tbl_ld_xxbgnr_modallist.f_bgnrid = '';
        controlObj.singledropdownlistid('detail_f_bgnr_tbl_ld_xxbgnr_modallist', tbl_ld_xxbgnr_modallist.f_bgnrid);

        var bgnr = controlObj.singledropdownlistid('detail_f_bgnr_tbl_ld_xxbgnr_modallist');

        if (bgnr == null || bgnr == "")
        {

        }
        else
        {
            var json = $.grep(_bgnrJsonArray, function (n, i)
            {
                return n.id == tbl_ld_xxbgnr_modallist.f_bgnrid;
            });

            if (json.length == 1)
            {
                //容错 =1
                switch (json[0].control)
                {
                    case "singledropdowngroup":
                        tbl_ld_xxbgnr_modallist.f_singledropdowngroup_dy_old = '';
                        tbl_ld_xxbgnr_modallist.f_singledropdowngroup_dy_oldid = '';
                        controlObj.singledropdownlistid('detail_f_singledropdowngroup_dy_old_tbl_ld_xxbgnr_modallist', tbl_ld_xxbgnr_modallist.f_singledropdowngroup_dy_oldid);

                        tbl_ld_xxbgnr_modallist.f_singledropdowngroup_sc_old = '';
                        tbl_ld_xxbgnr_modallist.f_singledropdowngroup_sc_oldid = '';
                        controlObj.singledropdownlistid('detail_f_singledropdowngroup_sc_old_tbl_ld_xxbgnr_modallist', tbl_ld_xxbgnr_modallist.f_singledropdowngroup_sc_oldid);

                        tbl_ld_xxbgnr_modallist.f_singledropdowngroup_qy_old = '';
                        tbl_ld_xxbgnr_modallist.f_singledropdowngroup_qy_oldid = '';
                        controlObj.singledropdownlistid('detail_f_singledropdowngroup_qy_old_tbl_ld_xxbgnr_modallist', tbl_ld_xxbgnr_modallist.f_singledropdowngroup_qy_oldid);

                        tbl_ld_xxbgnr_modallist.f_singledropdowngroup_pq_old = '';
                        tbl_ld_xxbgnr_modallist.f_singledropdowngroup_pq_oldid = '';
                        controlObj.singledropdownlistid('detail_f_singledropdowngroup_pq_old_tbl_ld_xxbgnr_modallist', tbl_ld_xxbgnr_modallist.f_singledropdowngroup_pq_oldid);

                        tbl_ld_xxbgnr_modallist.f_singledropdowngroup_dy_new = '';
                        tbl_ld_xxbgnr_modallist.f_singledropdowngroup_dy_newid = '';
                        controlObj.singledropdownlistid('detail_f_singledropdowngroup_dy_new_tbl_ld_xxbgnr_modallist', tbl_ld_xxbgnr_modallist.f_singledropdowngroup_dy_newid);

                        tbl_ld_xxbgnr_modallist.f_singledropdowngroup_sc_new = '';
                        tbl_ld_xxbgnr_modallist.f_singledropdowngroup_sc_newid = '';
                        controlObj.singledropdownlistid('detail_f_singledropdowngroup_sc_new_tbl_ld_xxbgnr_modallist', tbl_ld_xxbgnr_modallist.f_singledropdowngroup_sc_newid);

                        tbl_ld_xxbgnr_modallist.f_singledropdowngroup_qy_new = '';
                        tbl_ld_xxbgnr_modallist.f_singledropdowngroup_qy_newid = '';
                        controlObj.singledropdownlistid('detail_f_singledropdowngroup_qy_new_tbl_ld_xxbgnr_modallist', tbl_ld_xxbgnr_modallist.f_singledropdowngroup_qy_newid);

                        tbl_ld_xxbgnr_modallist.f_singledropdowngroup_pq_new = '';
                        tbl_ld_xxbgnr_modallist.f_singledropdowngroup_pq_newid = '';
                        controlObj.singledropdownlistid('detail_f_singledropdowngroup_pq_new_tbl_ld_xxbgnr_modallist', tbl_ld_xxbgnr_modallist.f_singledropdowngroup_pq_newid);

                        break;
                    case "text":
                        tbl_ld_xxbgnr_modallist.f_text_old = '';
                        controlObj.text('detail_f_text_old_tbl_ld_xxbgnr_modallist', tbl_ld_xxbgnr_modallist.f_text_old);

                        tbl_ld_xxbgnr_modallist.f_text_new = '';
                        controlObj.text('detail_f_text_new_tbl_ld_xxbgnr_modallist', tbl_ld_xxbgnr_modallist.f_text_new);

                        break;
                    case "singledropdownlist":
                        tbl_ld_xxbgnr_modallist.f_singledropdownlist_old = '';
                        tbl_ld_xxbgnr_modallist.f_singledropdownlist_oldid = '';
                        controlObj.singledropdownlistid('detail_f_singledropdownlist_old_tbl_ld_xxbgnr_modallist', tbl_ld_xxbgnr_modallist.f_singledropdownlist_oldid);

                        tbl_ld_xxbgnr_modallist.f_singledropdownlist_new = '';
                        tbl_ld_xxbgnr_modallist.f_singledropdownlist_newid = '';
                        controlObj.singledropdownlistid('detail_f_singledropdownlist_new_tbl_ld_xxbgnr_modallist', tbl_ld_xxbgnr_modallist.f_singledropdownlist_newid);

                        break;
                    case "multidropdownlist":
                        tbl_ld_xxbgnr_modallist.f_multidropdownlist_old = '';
                        tbl_ld_xxbgnr_modallist.f_multidropdownlist_oldid = '';
                        controlObj.multidropdownlistid('detail_f_multidropdownlist_old_tbl_ld_xxbgnr_modallist', tbl_ld_xxbgnr_modallist.f_multidropdownlist_oldid);

                        tbl_ld_xxbgnr_modallist.f_multidropdownlist_new = '';
                        tbl_ld_xxbgnr_modallist.f_multidropdownlist_newid = '';
                        controlObj.multidropdownlistid('detail_f_multidropdownlist_new_tbl_ld_xxbgnr_modallist', tbl_ld_xxbgnr_modallist.f_multidropdownlist_newid);

                        break;
                    case "datetime":
                        tbl_ld_xxbgnr_modallist.f_datetime_old = '1900-01-01';
                        controlObj.datetime('detail_f_datetime_old_tbl_ld_xxbgnr_modallist_date', 'detail_f_datetime_old_tbl_ld_xxbgnr_modallist_time', tbl_ld_xxbgnr_modallist.f_datetime_old);


                        tbl_ld_xxbgnr_modallist.f_datetime_new = '1900-01-01';
                        controlObj.datetime('detail_f_datetime_new_tbl_ld_xxbgnr_modallist_date', 'detail_f_datetime_new_tbl_ld_xxbgnr_modallist_time', tbl_ld_xxbgnr_modallist.f_datetime_new);


                        break;
                    case "datetimetime":
                        tbl_ld_xxbgnr_modallist.f_datetimetime_old = '1900-01-01';
                        controlObj.datetime('detail_f_datetimetime_old_tbl_ld_xxbgnr_modallist_date', 'detail_f_datetimetime_old_tbl_ld_xxbgnr_modallist_time', tbl_ld_xxbgnr_modallist.f_datetimetime_old);


                        tbl_ld_xxbgnr_modallist.f_datetimetime_new = '1900-01-01';
                        controlObj.datetime('detail_f_datetimetime_new_tbl_ld_xxbgnr_modallist_date', 'detail_f_datetimetime_new_tbl_ld_xxbgnr_modallist_time', tbl_ld_xxbgnr_modallist.f_datetimetime_new);

                        break;
                    case "toggle":
                        tbl_ld_xxbgnr_modallist.f_toggle_old = '';
                        controlObj.toggle('detail_f_toggle_old_tbl_ld_xxbgnr_modallist', tbl_ld_xxbgnr_modallist.f_toggle_old);

                        tbl_ld_xxbgnr_modallist.f_toggle_new = '';
                        controlObj.toggle('detail_f_toggle_new_tbl_ld_xxbgnr_modallist', tbl_ld_xxbgnr_modallist.f_toggle_new);

                        break;
                    case "textarea":
                        tbl_ld_xxbgnr_modallist.f_textarea_old = '';
                        controlObj.text('detail_f_textarea_old_tbl_ld_xxbgnr_modallist', tbl_ld_xxbgnr_modallist.f_textarea_old.returnStringRN());

                        tbl_ld_xxbgnr_modallist.f_textarea_new = '';
                        controlObj.text('detail_f_textarea_new_tbl_ld_xxbgnr_modallist', tbl_ld_xxbgnr_modallist.f_textarea_new.returnStringRN());

                        break;

                }
            }
        }


    },

    //=============================数据操作===================================
    /* 
    *  
    *  方法:getDetailData
    *  参数:callBackFunction
    *  从数据库获取数据，根据_gridEditId ，返回数据对象
    */
    getDetailData = function (callBackFunction)
    {

        if (that._pr_pagetype == '2')
        {

        }

        var whereClause = ' sys_id = \'' + _gridEditId + '\'';
        var orderByString = '';
        var columnsString = 'f_value1^f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^f_bgnr^f_bgnrid^f_text_old^f_text_new^f_singledropdownlist_old^f_singledropdownlist_oldid^f_singledropdownlist_new^f_singledropdownlist_newid^f_datetime_old^f_datetime_new^f_multidropdownlist_old^f_multidropdownlist_oldid^f_multidropdownlist_new^f_multidropdownlist_newid^f_toggle_old^f_toggle_new^f_datetimetime_old^f_datetimetime_new^f_textarea_old^f_textarea_new^f_singledropdowngroup_dy_old^f_singledropdowngroup_dy_oldid^f_singledropdowngroup_sc_old^f_singledropdowngroup_sc_oldid^f_singledropdowngroup_qy_old^f_singledropdowngroup_qy_oldid^f_singledropdowngroup_pq_old^f_singledropdowngroup_pq_oldid^f_singledropdowngroup_dy_new^f_singledropdowngroup_dy_newid^f_singledropdowngroup_sc_new^f_singledropdowngroup_sc_newid^f_singledropdowngroup_qy_new^f_singledropdowngroup_qy_newid^f_singledropdowngroup_pq_new^f_singledropdowngroup_pq_newid^sys_id';

        var data = {
            whereString: whereClause,
            orderByString: orderByString,
            columnsString: columnsString,
            pageSizeString: '',
            pageIndexString: '',
            clientInf: _clientInf
        };
        doAjaxFunction(_serviceUrl, 'GetList', data, {
            success: function (result)
            {
                try
                {
                    var messageJson = (new Function("", "return " + result))();
                    callBackFunction.success(messageJson.rows[0]);
                }
                catch (ex)
                {
                    _blockMessage.show('getDetailData执行失败。<br/>' + ex.message, 'fail');
                }
            },
            fail: function (message)
            {
                _blockMessage.show('getDetailData执行失败<br/>' + message, 'fail');
            }
        });


    },

    /* 
    *  
    *  方法:updateDetailData
    *  参数:tbl_ld_xxbgnr_modallist, callbackFunction
    *  根据传入的数据对象，更新数据
    */
    updateDetailData = function (tbl_ld_xxbgnr_modallist, callbackFunction)
    {

        var d = new Date();
        var columns = 'f_value1^f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^f_bgnr^f_bgnrid^f_text_old^f_text_new^f_singledropdownlist_old^f_singledropdownlist_oldid^f_singledropdownlist_new^f_singledropdownlist_newid^f_datetime_old^f_datetime_new^f_multidropdownlist_old^f_multidropdownlist_oldid^f_multidropdownlist_new^f_multidropdownlist_newid^f_toggle_old^f_toggle_new^f_datetimetime_old^f_datetimetime_new^f_textarea_old^f_textarea_new^f_singledropdowngroup_dy_old^f_singledropdowngroup_dy_oldid^f_singledropdowngroup_sc_old^f_singledropdowngroup_sc_oldid^f_singledropdowngroup_qy_old^f_singledropdowngroup_qy_oldid^f_singledropdowngroup_pq_old^f_singledropdowngroup_pq_oldid^f_singledropdowngroup_dy_new^f_singledropdowngroup_dy_newid^f_singledropdowngroup_sc_new^f_singledropdowngroup_sc_newid^f_singledropdowngroup_qy_new^f_singledropdowngroup_qy_newid^f_singledropdowngroup_pq_new^f_singledropdowngroup_pq_newid^sys_id^sys_lastedituserid^sys_lasteditusername^sys_lasteditdate';
        var json = {
            sys_id: _gridEditId,


            f_value1: tbl_ld_xxbgnr_modallist.f_value1,

            f_value2: tbl_ld_xxbgnr_modallist.f_value2,

            f_value3: tbl_ld_xxbgnr_modallist.f_value3,

            f_value4: tbl_ld_xxbgnr_modallist.f_value4,

            f_value5: tbl_ld_xxbgnr_modallist.f_value5,

            f_value6: tbl_ld_xxbgnr_modallist.f_value6,

            f_value7: tbl_ld_xxbgnr_modallist.f_value7,

            f_value8: tbl_ld_xxbgnr_modallist.f_value8,

            f_value9: tbl_ld_xxbgnr_modallist.f_value9,

            f_value10: tbl_ld_xxbgnr_modallist.f_value10,

            f_bgnr: tbl_ld_xxbgnr_modallist.f_bgnr,
            f_bgnrid: tbl_ld_xxbgnr_modallist.f_bgnrid,

            f_singledropdowngroup_dy_old: tbl_ld_xxbgnr_modallist.f_singledropdowngroup_dy_old,
            f_singledropdowngroup_dy_oldid: tbl_ld_xxbgnr_modallist.f_singledropdowngroup_dy_oldid,

            f_singledropdowngroup_sc_old: tbl_ld_xxbgnr_modallist.f_singledropdowngroup_sc_old,
            f_singledropdowngroup_sc_oldid: tbl_ld_xxbgnr_modallist.f_singledropdowngroup_sc_oldid,

            f_singledropdowngroup_qy_old: tbl_ld_xxbgnr_modallist.f_singledropdowngroup_qy_old,
            f_singledropdowngroup_qy_oldid: tbl_ld_xxbgnr_modallist.f_singledropdowngroup_qy_oldid,

            f_singledropdowngroup_pq_old: tbl_ld_xxbgnr_modallist.f_singledropdowngroup_pq_old,
            f_singledropdowngroup_pq_oldid: tbl_ld_xxbgnr_modallist.f_singledropdowngroup_pq_oldid,

            f_singledropdowngroup_dy_new: tbl_ld_xxbgnr_modallist.f_singledropdowngroup_dy_new,
            f_singledropdowngroup_dy_newid: tbl_ld_xxbgnr_modallist.f_singledropdowngroup_dy_newid,

            f_singledropdowngroup_sc_new: tbl_ld_xxbgnr_modallist.f_singledropdowngroup_sc_new,
            f_singledropdowngroup_sc_newid: tbl_ld_xxbgnr_modallist.f_singledropdowngroup_sc_newid,

            f_singledropdowngroup_qy_new: tbl_ld_xxbgnr_modallist.f_singledropdowngroup_qy_new,
            f_singledropdowngroup_qy_newid: tbl_ld_xxbgnr_modallist.f_singledropdowngroup_qy_newid,

            f_singledropdowngroup_pq_new: tbl_ld_xxbgnr_modallist.f_singledropdowngroup_pq_new,
            f_singledropdowngroup_pq_newid: tbl_ld_xxbgnr_modallist.f_singledropdowngroup_pq_newid,

            f_text_old: tbl_ld_xxbgnr_modallist.f_text_old,

            f_text_new: tbl_ld_xxbgnr_modallist.f_text_new,

            f_singledropdownlist_old: tbl_ld_xxbgnr_modallist.f_singledropdownlist_old,
            f_singledropdownlist_oldid: tbl_ld_xxbgnr_modallist.f_singledropdownlist_oldid,

            f_singledropdownlist_new: tbl_ld_xxbgnr_modallist.f_singledropdownlist_new,
            f_singledropdownlist_newid: tbl_ld_xxbgnr_modallist.f_singledropdownlist_newid,

            f_multidropdownlist_old: tbl_ld_xxbgnr_modallist.f_multidropdownlist_old,
            f_multidropdownlist_oldid: tbl_ld_xxbgnr_modallist.f_multidropdownlist_oldid,

            f_multidropdownlist_new: tbl_ld_xxbgnr_modallist.f_multidropdownlist_new,
            f_multidropdownlist_newid: tbl_ld_xxbgnr_modallist.f_multidropdownlist_newid,

            f_datetime_old: tbl_ld_xxbgnr_modallist.f_datetime_old,

            f_datetime_new: tbl_ld_xxbgnr_modallist.f_datetime_new,

            f_datetimetime_old: tbl_ld_xxbgnr_modallist.f_datetimetime_old,

            f_datetimetime_new: tbl_ld_xxbgnr_modallist.f_datetimetime_new,

            f_toggle_old: tbl_ld_xxbgnr_modallist.f_toggle_old,

            f_toggle_new: tbl_ld_xxbgnr_modallist.f_toggle_new,

            //f_textarea_old: tbl_ld_xxbgnr_modallist.f_textarea_old.formatStringRN(),

            //f_textarea_new: tbl_ld_xxbgnr_modallist.f_textarea_new.formatStringRN(),

            f_textarea_old: tbl_ld_xxbgnr_modallist.f_textarea_old,

            f_textarea_new: tbl_ld_xxbgnr_modallist.f_textarea_new,

            sys_lasteditusername: basePageObj._userInfoJson.sys_username,
            sys_lastedituserid: basePageObj._userInfoJson.sys_userid,
            sys_lasteditdate: d.Format('yyyy-MM-dd hh:mm:ss')

        };


        var data = {
            columns: columns,
            clientInf: _clientInf,
            json: JSON.stringify(json)
        };
        doAjaxFunction(_serviceUrl, 'Update', data, {
            success: function (message)
            {
                callbackFunction.success(tbl_ld_xxbgnr_modallist);
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
     /* 
    *  
    *  方法:updateDetailData
    *  参数:tbl_ld_xxbgnr_modallist, callbackFunction
    *  根据传入的数据对象，更新数据
    */
  getSqlString = function (tbl_ld_xxbgnr_modallist, callBackFunction)
  {
      try
      {
          var resultString = '';

          if (tbl_ld_xxbgnr_modallist.f_bgnrid == null || tbl_ld_xxbgnr_modallist.f_bgnrid == "")
          {
              resultString = '-1';//变更内容ID为空
          }
          else
          {
              var json = $.grep(_bgnrJsonArray, function (n, i)
              {
                  return n.id == tbl_ld_xxbgnr_modallist.f_bgnrid;
              });
              if (json.length == 1)
              {
                  var message = "";
                  var fieldConfigArray = "";
                  var table = "";
                  var column = "";
                  var sql = "";
                  var sysid = "";
                  //取到控件的值
                  var value = "";
                  var valueid = "";
                  switch (json[0].control)
                  {
                      case "text":
                          value = controlObj.text('detail_f_text_new_tbl_ld_xxbgnr_modallist');
                          break;
                      case "textarea":
                          value = controlObj.text('detail_f_textarea_new_tbl_ld_xxbgnr_modallist');
                          break;
                      case "toggle":
                          value = controlObj.toggle('detail_f_toggle_new_tbl_ld_xxbgnr_modallist');
                          break;
                      case "datetimetime":
                          value = controlObj.datetime('detail_f_datetimetime_new_tbl_ld_xxbgnr_modallist_date', 'detail_f_datetimetime_new_tbl_ld_xxbgnr_modallist_time');
                          break;
                      case "datetime":
                          value = controlObj.datetime('detail_f_datetime_new_tbl_ld_xxbgnr_modallist_date', 'detail_f_datetime_new_tbl_ld_xxbgnr_modallist_time');
                          break;
                      case "multidropdownlist":
                          value = controlObj.multidropdownlist('detail_f_multidropdownlist_new_tbl_ld_xxbgnr_modallist');
                          valueid = controlObj.multidropdownlistid('detail_f_multidropdownlist_new_tbl_ld_xxbgnr_modallist');

                          break;
                      case "singledropdownlist":
                          value = controlObj.singledropdownlist('detail_f_singledropdownlist_new_tbl_ld_xxbgnr_modallist');
                          valueid = controlObj.singledropdownlistid('detail_f_singledropdownlist_new_tbl_ld_xxbgnr_modallist');

                          break;
                      case "singledropdowngroup":
                          value = controlObj.singledropdownlist('detail_f_singledropdowngroup_dy_new_tbl_ld_xxbgnr_modallist');
                          valueid = controlObj.singledropdownlistid('detail_f_singledropdowngroup_dy_new_tbl_ld_xxbgnr_modallist');
                          value = controlObj.singledropdownlist('detail_f_singledropdowngroup_sc_new_tbl_ld_xxbgnr_modallist');
                          valueid = controlObj.singledropdownlistid('detail_f_singledropdowngroup_sc_new_tbl_ld_xxbgnr_modallist');
                          value = controlObj.singledropdownlist('detail_f_singledropdowngroup_qy_new_tbl_ld_xxbgnr_modallist');
                          valueid = controlObj.singledropdownlistid('detail_f_singledropdowngroup_qy_new_tbl_ld_xxbgnr_modallist');
                          value = controlObj.singledropdownlist('detail_f_singledropdowngroup_pq_new_tbl_ld_xxbgnr_modallist');
                          valueid = controlObj.singledropdownlistid('detail_f_singledropdowngroup_pq_new_tbl_ld_xxbgnr_modallist');

                          break;
                  }

                  //三个关键ID
                  var khid = tbl_ld_xxbg_detail_Obj._khJson["khxx"].sys_id;;
                  var yhid = tbl_ld_xxbg_detail_Obj._khJson["yhxx"].sys_id;;
                  var sbid = tbl_ld_xxbg_detail_Obj._khJson["sbxx"].sys_id;;


                  //地域水厂
                  if (json[0].control == "singledropdowngroup")
                  {
                      sql = "";

                      var dyString = tbl_ld_xxbgnr_modallist.f_singledropdowngroup_dy_new + ",";
                      dyString += tbl_ld_xxbgnr_modallist.f_singledropdowngroup_sc_new + ",";
                      dyString += tbl_ld_xxbgnr_modallist.f_singledropdowngroup_qy_new + ",";
                      dyString += tbl_ld_xxbgnr_modallist.f_singledropdowngroup_pq_new + ",";
                      var dyidString = tbl_ld_xxbgnr_modallist.f_singledropdowngroup_dy_newid + ",";
                      dyidString += tbl_ld_xxbgnr_modallist.f_singledropdowngroup_sc_newid + ",";
                      dyidString += tbl_ld_xxbgnr_modallist.f_singledropdowngroup_qy_newid + ",";
                      dyidString += tbl_ld_xxbgnr_modallist.f_singledropdowngroup_pq_newid + ",";
                      var dy = dyString.split(',');
                      var dyid = dyidString.split(',');
                      sql += "update  tbl_ld_khb  set  f_dy = '" + dy[0] + "',f_dyid = '" + dyid[0] + "' ,f_sc = '" + dy[1] + "' ,f_scid = '" + dyid[1] + "' ,f_qy = '" + dy[2] + "', f_qyid = '" + dyid[2] + "' ,f_pq = '" + dy[3] + "', f_pqid = '" + dyid[3] + "' where  sys_id = '" + khid + "'";
                      sql += "^";
                      sql += "update  tbl_ld_yhb  set  f_dy = '" + dy[0] + "',f_dyid = '" + dyid[0] + "' ,f_sc = '" + dy[1] + "' ,f_scid = '" + dyid[1] + "' ,f_qy = '" + dy[2] + "', f_qyid = '" + dyid[2] + "' ,f_pq = '" + dy[3] + "', f_pqid = '" + dyid[3] + "' where  sys_id = '" + yhid + "'";

                      resultString = sql;


                  }
                  else
                  {
                      sql = "";
                      //逗号分隔 
                      fieldConfigArray = json[0].field.split(',');

                      if (fieldConfigArray.length > 0)
                      {
                          for (var i = 0; i < fieldConfigArray.length; i++)
                          {
                              var config = fieldConfigArray[i].split('.');
                              //表名
                              table = "tbl_ld_" + config[0];
                              //字段名
                              column = config[1];


                              //时间类型
                              if (json[0].control == "datetime")
                              {
                                  value = tbl_ld_xxbgnr_modallist.f_datetime_new;
                                  value = value.split(" ");
                                  value = value[0];
                                  sql += "update " + table + " set " + column + " = to_date('" + value + "','yyyy-mm-dd')";
                              }
                              else if (column.substring(column.length - 2) == "id")
                              {
                                  sql += "update " + table + " set " + column + " = '" + valueid + "'";
                              }
                              else if (column == "f_sbdz")
                              {
                                  sql += "update tbl_ld_khb set " + column + " = '" + value + "' where sys_id='" + khid + "'^";
                                  sql += "update " + table + " set " + column + " = '" + value + "'";
                              }
                              else
                              {
                                  sql += "update " + table + " set " + column + " = '" + value + "'";
                              }

                              if (table == "tbl_ld_khb")
                              {
                                  sysid = khid;
                              } else if (table == "tbl_ld_yhb")
                              {
                                  sysid = yhid;

                              }
                              else
                              {
                                  sysid = sbid;

                              }

                              sql += " where sys_id = '" + sysid + "'^";



                          }

                          resultString = sql;
                      }
                      else
                      {
                          resultString = '-3';//配置为空
                      }
                      if (json[0].id == 'f_cbbh')
                      {
                          sql = "";
                          var cbbh = tbl_ld_xxbgnr_modallist.f_singledropdownlist_new;
                          var cbbhid = tbl_ld_xxbgnr_modallist.f_singledropdownlist_newid;
                          var cbyxm = controlObj.text('detail_f_cbyxm_new_tbl_ld_xxbgnr_modallist');
                          var cbyid = controlObj.text('detail_f_cbyid_new_tbl_ld_xxbgnr_modallist');
                          var cbzq = controlObj.text('detail_f_cbzq_new_tbl_ld_xxbgnr_modallist');
                          var cbmc = cbbh + cbyxm;
                          sql += "update  tbl_ld_khb  set  f_cbbh = '" + cbbh + "',f_cbbhid = '" + cbbhid + "',f_cbyxm = '" + cbyxm + "' ,f_cbyid = '" + cbyid + "' ,f_cbzq = '" + cbzq + "' ,f_cbmc = '" + cbmc + "' where  sys_id = '" + khid + "'";
                  }
                      resultString = sql;
                  }

              }
              else
              {
                  resultString = '-2';//当前选定的变更内容查询不到指定的配置
              }
          }

          callBackFunction.success(resultString);
      }
      catch (ex)
      {

          callBackFunction.fail(ex.message);

      }
  },
    /* 
    *  
    *  方法:addDetailData
    *  参数: callbackFunction
    *  新建数据
    */
    addDetailData = function (callBackFunction)
    {
        var d = new Date();
        var json = {


            f_value1: '',


            f_value2: '',


            f_value3: '',


            f_value4: '',


            f_value5: '',


            f_value6: '',


            f_value7: '',


            f_value8: '',


            f_value9: '',


            f_value10: '',

            f_bgnrid: '',

            f_singledropdowngroup_dy_oldid: '',

            f_singledropdowngroup_sc_oldid: '',

            f_singledropdowngroup_qy_oldid: '',

            f_singledropdowngroup_pq_oldid: '',

            f_singledropdowngroup_dy_newid: '',

            f_singledropdowngroup_sc_newid: '',

            f_singledropdowngroup_qy_newid: '',

            f_singledropdowngroup_pq_newid: '',


            f_text_old: '',


            f_text_new: '',

            f_singledropdownlist_oldid: '',

            f_singledropdownlist_newid: '',

            f_multidropdownlist_oldid: '',

            f_multidropdownlist_newid: '',

            f_datetime_old: '',

            f_datetime_new: '',

            f_datetimetime_old: '',

            f_datetimetime_new: '',

            f_toggle_old: '',

            f_toggle_new: '',


            f_textarea_old: '',


            f_textarea_new: '',


            fk_tbl_ld_xxbg_sys_id: that._pr_fk_tbl_ld_xxbg_sys_id,

            sys_delflag: '0',
            sys_lasteditusername: basePageObj._userInfoJson.sys_username,
            sys_lastedituserid: basePageObj._userInfoJson.sys_userid,
            sys_lasteditdate: d.Format('yyyy-MM-dd hh:mm:ss'),
            sys_creatdate: d.Format('yyyy-MM-dd hh:mm:ss'),
            sys_creatusername: basePageObj._userInfoJson.sys_username,
            sys_creatuserid: basePageObj._userInfoJson.sys_userid
        };
        var data = {
            json: JSON.stringify(json),
            clientInf: _clientInf
        }
        doAjaxFunction(_serviceUrl, 'Add', data, {
            success: function (result)
            {
                _gridEditId = result;
                bindGrid(false, {
                    success: function ()
                    {
                        getDetailData({
                            success: function (tbl_ld_xxbgnr_modallist)
                            {
                                setDetailModel(tbl_ld_xxbgnr_modallist, {
                                    success: function ()
                                    {
                                        $('#div_detail_modal_tbl_ld_xxbgnr_modallist').modal('show');
                                        callBackFunction.success();
                                    },
                                    fail: function (message)
                                    {
                                        callBackFunction.fail('setDetailModel:' + message);
                                    }
                                });
                            },
                            fail: function (message)
                            {
                                callBackFunction.fail('getDetailData:' + message);
                            }
                        });
                    },
                    fail: function (message)
                    {
                        callBackFunction.fail('bindGrid:' + message);
                    }
                });
            },
            fail: function (message)
            {
                callBackFunction.fail('Add:' + message);
            }
        });
    },

    clearControl = function ()
    {
        //将其他控件全部置为空
        controlObj.singledropdownlistid('detail_f_singledropdownlist_old_tbl_ld_xxbgnr_modallist', '');
        controlObj.singledropdownlistid('detail_f_singledropdownlist_new_tbl_ld_xxbgnr_modallist', '');
        controlObj.multidropdownlistid('detail_f_multidropdownlist_old_tbl_ld_xxbgnr_modallist', '');
        controlObj.multidropdownlistid('detail_f_multidropdownlist_new_tbl_ld_xxbgnr_modallist', '');

        controlObj.singledropdownlistid('detail_f_singledropdowngroup_dy_old_tbl_ld_xxbgnr_modallist', '');
        controlObj.singledropdownlistid('detail_f_singledropdowngroup_sc_old_tbl_ld_xxbgnr_modallist', '');
        controlObj.singledropdownlistid('detail_f_singledropdowngroup_qy_old_tbl_ld_xxbgnr_modallist', '');
        controlObj.singledropdownlistid('detail_f_singledropdowngroup_pq_old_tbl_ld_xxbgnr_modallist', '');


        controlObj.singledropdownlistid('detail_f_singledropdowngroup_dy_new_tbl_ld_xxbgnr_modallist', '');
        controlObj.singledropdownlistid('detail_f_singledropdowngroup_sc_new_tbl_ld_xxbgnr_modallist', '');
        controlObj.singledropdownlistid('detail_f_singledropdowngroup_qy_new_tbl_ld_xxbgnr_modallist', '');
        controlObj.singledropdownlistid('detail_f_singledropdowngroup_pq_new_tbl_ld_xxbgnr_modallist', '');

        controlObj.datetime('detail_f_datetime_old_tbl_ld_xxbgnr_modallist_date', '1900-01-01 00:00:00');
        controlObj.datetime('detail_f_datetimetime_old_tbl_ld_xxbgnr_modallist_date', '1900-01-01 00:00:00');
        controlObj.datetime('detail_f_datetime_new_tbl_ld_xxbgnr_modallist_date', 'detail_f_datetime_new_tbl_ld_xxbgnr_modallist_time', '1900-01-01 00:00:00');
        controlObj.datetime('detail_f_datetimetime_new_tbl_ld_xxbgnr_modallist_date', 'detail_f_datetimetime_new_tbl_ld_xxbgnr_modallist_time','1900-01-01 00:00:00');
        controlObj.toggle('detail_f_toggle_old_tbl_ld_xxbgnr_modallist', '');
        controlObj.toggle('detail_f_toggle_new_tbl_ld_xxbgnr_modallist', '');
        controlObj.text('detail_f_textarea_old_tbl_ld_xxbgnr_modallist', '');
        controlObj.text('detail_f_text_old_tbl_ld_xxbgnr_modallist', '');
        controlObj.text('detail_f_textarea_new_tbl_ld_xxbgnr_modallist', '');
        controlObj.text('detail_f_text_new_tbl_ld_xxbgnr_modallist', '');
    },

    //=============================控件事件===================================
    /* 
            *  
            *  方法:f_bgnr_onchange
            *  参数:changeEventParameter
            *  变更内容onchange事件
            */
    f_bgnr_onchange = function (e)
    {

        setDisable();
        var name = e.added.text;

        /* 
        *  1、init
        *  2、label的名字
        *  
        *  3、setmodel--：客户里取值
        *  4、控制显隐
        */

        var khxxArray = tbl_ld_xxbg_detail_Obj._khJson["khxx"];
        var yhxxArray = tbl_ld_xxbg_detail_Obj._khJson["yhxx"];
        var sbxxArray = tbl_ld_xxbg_detail_Obj._khJson["sbxx"];

        //var json = { a: '1', b: '2' };
        //json.a = "222";
        //json["a"] = "222";
        //根据Json的type的值判断在客户表、用户表、水表表
        switch (e.added.type)
        {
            
            //用户
            case "yhb":
        switch (e.added.control)
        {

            case "text":
                clearControl();
                        //从用户信息中取出值
                var ids = e.added.id;
                if (name == "托收银行账号")
                {
                    //获取用水类型、抄本编号数据作为code下拉选项
                    var sqlStringsJson = {
                        "count": "select count(*) as count from tbl_ldbm_expdata where ','||f_khbh||',' like '%," + tbl_ld_xxbg_detail_Obj._khbh + ",%'",
                        "content": "select f_nr,f_lx from tbl_ldbm_expdata where ','||f_khbh||',' like '%," + tbl_ld_xxbg_detail_Obj._khbh + ",%'",
                    };

                    commonObj.querySqls(sqlStringsJson, {
                        success: function (resultJson)
                        {

                            if (parseInt(resultJson["count"][0]["count"]) > 0)
                            {
                                //托收中
                                controlObj.text('detail_f_text_old_tbl_ld_xxbgnr_modallist', resultJson["content"][0]["f_nr"]);
                                controlObj.text('detail_f_text_new_tbl_ld_xxbgnr_modallist', resultJson["content"][0]["f_nr"]);

                            }
                            else
                            {
                                //未托收
                                controlObj.text('detail_f_text_old_tbl_ld_xxbgnr_modallist', "");
                                controlObj.text('detail_f_text_new_tbl_ld_xxbgnr_modallist', "");

                            }
                        }
                    });
                }
                else
                {
                    if (khxxArray[ids] == null || khxxArray[ids] == "")
                    {
                        controlObj.text('detail_f_text_old_tbl_ld_xxbgnr_modallist', '');
                    }
                    else
                    {
                        controlObj.text('detail_f_text_old_tbl_ld_xxbgnr_modallist', yhxxArray[ids]);
                        controlObj.text('detail_f_text_new_tbl_ld_xxbgnr_modallist', yhxxArray[ids]);
                    }
                }

                //标签名字
                $($('#div_detail_f_text_old_tbl_ld_xxbgnr_modallist').children()[1]).text(name);
                //显示隐藏
                $('.aa').addClass('hidden');
                $('#div_detail_f_text_old_tbl_ld_xxbgnr_modallist').parent().parent().removeClass('hidden')

                break;
            case "multidropdownlist":
                clearControl();
              
                switch (e.added.codetype)
                {

                    case "code":
                        var code = e.added.codecontent
                        var codeService = _baseCodeHashMap.get(code);
                        controlObj.multidropdownlist('detail_f_multidropdownlist_old_tbl_ld_xxbgnr_modallist', '', null);

                        controlObj.multidropdownlistinit('detail_f_multidropdownlist_old_tbl_ld_xxbgnr_modallist', codeService, null);
                        controlObj.multidropdownlistinit('detail_f_multidropdownlist_new_tbl_ld_xxbgnr_modallist', codeService, null);
                        break;
                    case "sql":

                        var code = e.added.codecontent
                        var sql = _baseCodeHashMap.get(code);
                        controlObj.multidropdownlist('detail_f_multidropdownlist_old_tbl_ld_xxbgnr_modallist', '', null);

                        controlObj.multidropdownlistinit('detail_f_multidropdownlist_old_tbl_ld_xxbgnr_modallist', sql, null);
                        controlObj.multidropdownlistinit('detail_f_multidropdownlist_new_tbl_ld_xxbgnr_modallist', sql, null);

                        break;
                }
                setDisable();
                var ids = e.added.id;
                        if (yhxxArray[ids] == null || yhxxArray[ids] == "")
                {
                    controlObj.multidropdownlistid('detail_f_multidropdownlist_old_tbl_ld_xxbgnr_modallist', '');
                }
                else
                {
                            controlObj.multidropdownlistid('detail_f_multidropdownlist_old_tbl_ld_xxbgnr_modallist', yhxxArray[ids + "id"]);
                            controlObj.multidropdownlistid('detail_f_multidropdownlist_new_tbl_ld_xxbgnr_modallist', yhxxArray[ids + "id"]);
                }

                $($('#div_detail_f_multidropdownlist_old_tbl_ld_xxbgnr_modallist').children()[1]).text(name);

                $('.aa').addClass('hidden');
                $('#div_detail_f_multidropdownlist_old_tbl_ld_xxbgnr_modallist').parent().parent().removeClass('hidden')

                break;
            case "singledropdownlist":
                clearControl();
                
                switch (e.added.codetype)
                {
                    case "code":
                        var code = e.added.codecontent
                        var codeService = _baseCodeHashMap.get(code);
                        controlObj.singledropdownlist('detail_f_singledropdownlist_old_tbl_ld_xxbgnr_modallist', '', null);

                        controlObj.singledropdownlistinit('detail_f_singledropdownlist_old_tbl_ld_xxbgnr_modallist', codeService, null);
                        controlObj.singledropdownlistinit('detail_f_singledropdownlist_new_tbl_ld_xxbgnr_modallist', codeService, null);
                        break;
                    case "sql":

                        var code = e.added.codecontent
                        var sql = _baseCodeHashMap.get(code);
                        controlObj.singledropdownlist('detail_f_singledropdownlist_old_tbl_ld_xxbgnr_modallist', '', null);

                        controlObj.singledropdownlistinit('detail_f_singledropdownlist_old_tbl_ld_xxbgnr_modallist', sql, null);
                        controlObj.singledropdownlistinit('detail_f_singledropdownlist_new_tbl_ld_xxbgnr_modallist', sql, null);

                        break;
                }
                setDisable();
                var ids = e.added.id;
                        if (yhxxArray[ids] == null || yhxxArray[ids] == "")
                {
                    controlObj.singledropdownlistid('detail_f_singledropdownlist_old_tbl_ld_xxbgnr_modallist', '');
                }
                else
                {
                            controlObj.singledropdownlistid('detail_f_singledropdownlist_old_tbl_ld_xxbgnr_modallist', yhxxArray[ids + "id"]);
                            controlObj.singledropdownlistid('detail_f_singledropdownlist_new_tbl_ld_xxbgnr_modallist', yhxxArray[ids + "id"]);
                }

                $($('#div_detail_f_singledropdownlist_old_tbl_ld_xxbgnr_modallist').children()[1]).text(name);

                $('.aa').addClass('hidden');
                $('#div_detail_f_singledropdownlist_old_tbl_ld_xxbgnr_modallist').parent().parent().removeClass('hidden')

                break;
            case "toggle":
                clearControl();
                var ids = e.added.id;
                controlObj.toggleinit('detail_f_toggle_new_tbl_ld_xxbgnr_modallist', null);

                        if (yhxxArray[ids] == null || yhxxArray[ids] == "")
                {
                    controlObj.toggle('detail_f_toggle_old_tbl_ld_xxbgnr_modallist', '');
                }
                else
                {
                            controlObj.toggle('detail_f_toggle_old_tbl_ld_xxbgnr_modallist', yhxxArray[ids]);
                            controlObj.toggle('detail_f_toggle_new_tbl_ld_xxbgnr_modallist', yhxxArray[ids]);
                }

                controlObj.toggleinit('detail_f_toggle_old_tbl_ld_xxbgnr_modallist', null);



                $($('#div_detail_f_toggle_old_tbl_ld_xxbgnr_modallist').children()[1]).text(name);

                $('.aa').addClass('hidden');
                $('#div_detail_f_toggle_old_tbl_ld_xxbgnr_modallist').parent().parent().removeClass('hidden')

                break;
            case "textarea":
                clearControl();

                var ids = e.added.id;
                        if (yhxxArray[ids] == null || yhxxArray[ids] == "")
                {
                    controlObj.text('detail_f_textarea_old_tbl_ld_xxbgnr_modallist', '');


                }
                else
                {
                            controlObj.text('detail_f_textarea_old_tbl_ld_xxbgnr_modallist', yhxxArray[ids].returnStringRN());
                            controlObj.text('detail_f_textarea_new_tbl_ld_xxbgnr_modallist', yhxxArray[ids].returnStringRN());
                }

                $($('#div_detail_f_textarea_old_tbl_ld_xxbgnr_modallist').children()[1]).text(name);


                $('.aa').addClass('hidden');
                $('#div_detail_f_textarea_old_tbl_ld_xxbgnr_modallist').parent().parent().removeClass('hidden')

                break;
            case "singledropdowngroup":
                clearControl();
               
                var codeService_0512 = _baseCodeHashMap.get('codeservice_0512');

                var codeService_0513 = _baseCodeHashMap.get('codeservice_0513');

                var codeService_0514 = _baseCodeHashMap.get('codeservice_0514');

                var codeService_0515 = _baseCodeHashMap.get('codeservice_0515');
                var codeService_sc = _baseCodeHashMap.get('codeservice_sc');
                var codeService_qy = _baseCodeHashMap.get('codeservice_qy');
                var codeService_pq = _baseCodeHashMap.get('codeservice_pq');


                
                controlObj.singledropdownlistinit('detail_f_singledropdowngroup_dy_old_tbl_ld_xxbgnr_modallist', codeService_0512, null);
                controlObj.singledropdownlistinit('detail_f_singledropdowngroup_sc_old_tbl_ld_xxbgnr_modallist', codeService_sc, null);
                controlObj.singledropdownlistinit('detail_f_singledropdowngroup_qy_old_tbl_ld_xxbgnr_modallist', codeService_qy, null);
                controlObj.singledropdownlistinit('detail_f_singledropdowngroup_pq_old_tbl_ld_xxbgnr_modallist', codeService_pq, null);
                controlObj.singledropdownlistinit('detail_f_singledropdowngroup_dy_new_tbl_ld_xxbgnr_modallist', codeService_0512, dy_onchange);
                controlObj.singledropdownlistinit('detail_f_singledropdowngroup_sc_new_tbl_ld_xxbgnr_modallist', codeService_0513, dy_onchange);
                controlObj.singledropdownlistinit('detail_f_singledropdowngroup_qy_new_tbl_ld_xxbgnr_modallist', codeService_0514, dy_onchange);
                controlObj.singledropdownlistinit('detail_f_singledropdowngroup_pq_new_tbl_ld_xxbgnr_modallist', codeService_0515, dy_onchange);

                setDisable();
                var ids = e.added.id;
                        if (yhxxArray[ids] == null || yhxxArray[ids] == "")
                {
                    controlObj.singledropdownlist('detail_f_singledropdownlist_old_tbl_ld_xxbgnr_modallist', '');
                }
                else
                {
                    
                            controlObj.singledropdownlistid('detail_f_singledropdowngroup_dy_old_tbl_ld_xxbgnr_modallist', yhxxArray[ids + "id"]);

                            controlObj.singledropdownlistid('detail_f_singledropdowngroup_sc_old_tbl_ld_xxbgnr_modallist', yhxxArray.f_scid);
                            controlObj.singledropdownlistid('detail_f_singledropdowngroup_qy_old_tbl_ld_xxbgnr_modallist', yhxxArray.f_qyid);
                            controlObj.singledropdownlistid('detail_f_singledropdowngroup_pq_old_tbl_ld_xxbgnr_modallist', yhxxArray.f_pqid);
                            controlObj.singledropdownlistid('detail_f_singledropdowngroup_dy_new_tbl_ld_xxbgnr_modallist', yhxxArray[ids + "id"]);
                            controlObj.singledropdownlistid('detail_f_singledropdowngroup_sc_new_tbl_ld_xxbgnr_modallist', yhxxArray.f_scid);
                            controlObj.singledropdownlistid('detail_f_singledropdowngroup_qy_new_tbl_ld_xxbgnr_modallist', yhxxArray.f_qyid);
                            controlObj.singledropdownlistid('detail_f_singledropdowngroup_pq_new_tbl_ld_xxbgnr_modallist', yhxxArray.f_pqid);
                }

                $('.aa').addClass('hidden');
                $('#detail_f_singledropdowngroup_dy_old_tbl_ld_xxbgnr_modallist').parent().parent().parent().removeClass('hidden')
                $('#detail_f_singledropdowngroup_dy_new_tbl_ld_xxbgnr_modallist').parent().parent().parent().removeClass('hidden')


                break;
            case "datetime":
                clearControl();
                setDisable();
                var d = new Date();

                clearControl();

                controlObj.datetimeinit('detail_f_datetime_old_tbl_ld_xxbgnr_modallist_date', 'detail_f_datetime_old_tbl_ld_xxbgnr_modallist_time');

                controlObj.datetimeinit('detail_f_datetime_new_tbl_ld_xxbgnr_modallist_date', 'detail_f_datetime_new_tbl_ld_xxbgnr_modallist_time');


                var ids = e.added.id;
                        if (yhxxArray[ids] == null || yhxxArray[ids] == "")
                {
                    controlObj.datetime('detail_f_datetime_old_tbl_ld_xxbgnr_modallist_date', '1900-01-01 00:00:00');
                }
                else
                {
                            controlObj.datetime('detail_f_datetime_old_tbl_ld_xxbgnr_modallist_date', 'detail_f_datetime_old_tbl_ld_xxbgnr_modallist_time', yhxxArray[ids]);
                            controlObj.datetime('detail_f_datetime_new_tbl_ld_xxbgnr_modallist_date', 'detail_f_datetime_new_tbl_ld_xxbgnr_modallist_time', yhxxArray[ids]);
                }

                $($('#div_detail_f_datetime_old_tbl_ld_xxbgnr_modallist').children()[2]).text(name);

                $('.aa').addClass('hidden');
                $('#detail_f_datetime_old_tbl_ld_xxbgnr_modallist_date').parent().parent().parent().parent().parent().removeClass('hidden')

                break;
            case "datetimetime":
                clearControl();
                setDisable();
                controlObj.datetimeinit('detail_f_datetimetime_old_tbl_ld_xxbgnr_modallist_date', 'detail_f_datetimetime_old_tbl_ld_xxbgnr_modallist_time');

                controlObj.datetimeinit('detail_f_datetimetime_new_tbl_ld_xxbgnr_modallist_date', 'detail_f_datetimetime_new_tbl_ld_xxbgnr_modallist_time');


                var ids = e.added.id;
                        if (yhxxArray[ids] == null || yhxxArray[ids] == "")
                        {
                            controlObj.datetime('detail_f_datetimetime_old_tbl_ld_xxbgnr_modallist', '1900-01-01 00:00:00');
                        }
                        else
                        {
                            controlObj.datetime('detail_f_datetimetime_old_tbl_ld_xxbgnr_modallist_date', 'detail_f_datetimetime_old_tbl_ld_xxbgnr_modallist_time', yhxxArray[ids]);
                            controlObj.datetime('detail_f_datetimetime_new_tbl_ld_xxbgnr_modallist_date', 'detail_f_datetimetime_new_tbl_ld_xxbgnr_modallist_time', yhxxArray[ids]);
                        }
                        $($('#div_detail_f_datetimetime_old_tbl_ld_xxbgnr_modallist').children()[1]).text(name);
                        $('.aa').addClass('hidden');
                        $('#detail_f_datetimetime_old_tbl_ld_xxbgnr_modallist_date').parent().parent().parent().parent().parent().removeClass('hidden')
                        break;
                };
                controlObj.text('detail_f_tablename_tbl_ld_xxbgnr_modallist', "tbl_ld_yhb");
                break;
                //水表
            case "sbb":
                switch (e.added.control)
                {
                    case "text":
                        clearControl();
                        //从客户信息中取出值
                        var ids = e.added.id;
                        if (sbxxArray[ids] == null || sbxxArray[ids] == "")
                        {
                            controlObj.text('detail_f_text_old_tbl_ld_xxbgnr_modallist', '');
                        }
                        else
                        {
                            controlObj.text('detail_f_text_old_tbl_ld_xxbgnr_modallist', sbxxArray[ids]);
                            controlObj.text('detail_f_text_new_tbl_ld_xxbgnr_modallist', sbxxArray[ids]);
                        }

                        //标签名字
                        $($('#div_detail_f_text_old_tbl_ld_xxbgnr_modallist').children()[1]).text(name);
                        //显示隐藏
                        $('.aa').addClass('hidden');
                        $('#div_detail_f_text_old_tbl_ld_xxbgnr_modallist').parent().parent().removeClass('hidden')

                        break;
                    case "multidropdownlist":
                        clearControl();

                        switch (e.added.codetype)
                        {
                            case "code":
                                var code = e.added.codecontent
                                var codeService = _baseCodeHashMap.get(code);
                                controlObj.multidropdownlist('detail_f_multidropdownlist_old_tbl_ld_xxbgnr_modallist', '', null);

                                controlObj.multidropdownlistinit('detail_f_multidropdownlist_old_tbl_ld_xxbgnr_modallist', codeService, null);
                                controlObj.multidropdownlistinit('detail_f_multidropdownlist_new_tbl_ld_xxbgnr_modallist', codeService, null);
                                break;
                            case "sql":

                                var code = e.added.codecontent
                                var sql = _baseCodeHashMap.get(code);
                                controlObj.multidropdownlist('detail_f_multidropdownlist_old_tbl_ld_xxbgnr_modallist', '', null);

                                controlObj.multidropdownlistinit('detail_f_multidropdownlist_old_tbl_ld_xxbgnr_modallist', sql, null);
                                controlObj.multidropdownlistinit('detail_f_multidropdownlist_new_tbl_ld_xxbgnr_modallist', sql, null);

                                break;
                        }
                        setDisable();
                        var ids = e.added.id;
                        if (sbxxArray[ids] == null || sbxxArray[ids] == "")
                        {
                            controlObj.multidropdownlistid('detail_f_multidropdownlist_old_tbl_ld_xxbgnr_modallist', '');
                        }
                        else
                        {
                            controlObj.multidropdownlistid('detail_f_multidropdownlist_old_tbl_ld_xxbgnr_modallist', sbxxArray[ids + "id"]);
                            controlObj.multidropdownlistid('detail_f_multidropdownlist_new_tbl_ld_xxbgnr_modallist', sbxxArray[ids + "id"]);
                        }

                        $($('#div_detail_f_multidropdownlist_old_tbl_ld_xxbgnr_modallist').children()[1]).text(name);

                        $('.aa').addClass('hidden');
                        $('#div_detail_f_multidropdownlist_old_tbl_ld_xxbgnr_modallist').parent().parent().removeClass('hidden')

                        break;
                    case "singledropdownlist":
                        clearControl();

                        switch (e.added.codetype)
                        {
                            case "code":
                                var code = e.added.codecontent
                                var codeService = _baseCodeHashMap.get(code);
                                controlObj.singledropdownlist('detail_f_singledropdownlist_old_tbl_ld_xxbgnr_modallist', '', null);

                                controlObj.singledropdownlistinit('detail_f_singledropdownlist_old_tbl_ld_xxbgnr_modallist', codeService, null);
                                controlObj.singledropdownlistinit('detail_f_singledropdownlist_new_tbl_ld_xxbgnr_modallist', codeService, null);
                                break;
                            case "sql":

                                var code = e.added.codecontent
                                var sql = _baseCodeHashMap.get(code);
                                controlObj.singledropdownlist('detail_f_singledropdownlist_old_tbl_ld_xxbgnr_modallist', '', null);

                                controlObj.singledropdownlistinit('detail_f_singledropdownlist_old_tbl_ld_xxbgnr_modallist', sql, null);
                                controlObj.singledropdownlistinit('detail_f_singledropdownlist_new_tbl_ld_xxbgnr_modallist', sql, null);

                                break;
                        }
                        setDisable();
                        var ids = e.added.id;
                        if (sbxxArray[ids] == null || sbxxArray[ids] == "")
                        {
                            controlObj.singledropdownlistid('detail_f_singledropdownlist_old_tbl_ld_xxbgnr_modallist', '');
                        }
                        else
                        {
                            controlObj.singledropdownlistid('detail_f_singledropdownlist_old_tbl_ld_xxbgnr_modallist', sbxxArray[ids + "id"]);
                            controlObj.singledropdownlistid('detail_f_singledropdownlist_new_tbl_ld_xxbgnr_modallist', sbxxArray[ids + "id"]);
                        }

                        $($('#div_detail_f_singledropdownlist_old_tbl_ld_xxbgnr_modallist').children()[1]).text(name);

                        $('.aa').addClass('hidden');
                        $('#div_detail_f_singledropdownlist_old_tbl_ld_xxbgnr_modallist').parent().parent().removeClass('hidden')

                        break;
                    case "toggle":
                        clearControl();
                        var ids = e.added.id;
                        controlObj.toggleinit('detail_f_toggle_new_tbl_ld_xxbgnr_modallist', null);

                        if (sbxxArray[ids] == null || sbxxArray[ids] == "")
                        {
                            controlObj.toggle('detail_f_toggle_old_tbl_ld_xxbgnr_modallist', '');
                        }
                        else
                        {
                            controlObj.toggle('detail_f_toggle_old_tbl_ld_xxbgnr_modallist', sbxxArray[ids]);
                            controlObj.toggle('detail_f_toggle_new_tbl_ld_xxbgnr_modallist', sbxxArray[ids]);
                        }

                        controlObj.toggleinit('detail_f_toggle_old_tbl_ld_xxbgnr_modallist', null);



                        $($('#div_detail_f_toggle_old_tbl_ld_xxbgnr_modallist').children()[1]).text(name);

                        $('.aa').addClass('hidden');
                        $('#div_detail_f_toggle_old_tbl_ld_xxbgnr_modallist').parent().parent().removeClass('hidden')

                        break;
                    case "textarea":
                        clearControl();

                        var ids = e.added.id;
                        if (sbxxArray[ids] == null || sbxxArray[ids] == "")
                        {
                            controlObj.text('detail_f_textarea_old_tbl_ld_xxbgnr_modallist', '');


                        }
                        else
                        {
                            controlObj.text('detail_f_textarea_new_tbl_ld_xxbgnr_modallist', sbxxArray[ids].returnStringRN());
                        }

                        $($('#div_detail_f_textarea_old_tbl_ld_xxbgnr_modallist').children()[1]).text(name);


                        $('.aa').addClass('hidden');
                        $('#div_detail_f_textarea_old_tbl_ld_xxbgnr_modallist').parent().parent().removeClass('hidden')

                        break;
                    case "singledropdowngroup":
                        clearControl();

                        var codeService_0512 = _baseCodeHashMap.get('codeservice_0512');

                        var codeService_0513 = _baseCodeHashMap.get('codeservice_0513');

                        var codeService_0514 = _baseCodeHashMap.get('codeservice_0514');

                        var codeService_0515 = _baseCodeHashMap.get('codeservice_0515');
                        var codeService_sc = _baseCodeHashMap.get('codeservice_sc');
                        var codeService_qy = _baseCodeHashMap.get('codeservice_qy');
                        var codeService_pq = _baseCodeHashMap.get('codeservice_pq');



                        controlObj.singledropdownlistinit('detail_f_singledropdowngroup_dy_old_tbl_ld_xxbgnr_modallist', codeService_0512, null);
                        controlObj.singledropdownlistinit('detail_f_singledropdowngroup_sc_old_tbl_ld_xxbgnr_modallist', codeService_sc, null);
                        controlObj.singledropdownlistinit('detail_f_singledropdowngroup_qy_old_tbl_ld_xxbgnr_modallist', codeService_qy, null);
                        controlObj.singledropdownlistinit('detail_f_singledropdowngroup_pq_old_tbl_ld_xxbgnr_modallist', codeService_pq, null);
                        controlObj.singledropdownlistinit('detail_f_singledropdowngroup_dy_new_tbl_ld_xxbgnr_modallist', codeService_0512, dy_onchange);
                        controlObj.singledropdownlistinit('detail_f_singledropdowngroup_sc_new_tbl_ld_xxbgnr_modallist', codeService_0513, dy_onchange);
                        controlObj.singledropdownlistinit('detail_f_singledropdowngroup_qy_new_tbl_ld_xxbgnr_modallist', codeService_0514, dy_onchange);
                        controlObj.singledropdownlistinit('detail_f_singledropdowngroup_pq_new_tbl_ld_xxbgnr_modallist', codeService_0515, dy_onchange);

                        setDisable();
                        var ids = e.added.id;
                        if (sbxxArray[ids] == null || sbxxArray[ids] == "")
                        {
                            controlObj.singledropdownlist('detail_f_singledropdownlist_old_tbl_ld_xxbgnr_modallist', '');
                        }
                        else
                        {

                            controlObj.singledropdownlistid('detail_f_singledropdowngroup_dy_old_tbl_ld_xxbgnr_modallist', sbxxArray[ids + "id"]);

                            controlObj.singledropdownlistid('detail_f_singledropdowngroup_sc_old_tbl_ld_xxbgnr_modallist', sbxxArray.f_scid);
                            controlObj.singledropdownlistid('detail_f_singledropdowngroup_qy_old_tbl_ld_xxbgnr_modallist', sbxxArray.f_qyid);
                            controlObj.singledropdownlistid('detail_f_singledropdowngroup_pq_old_tbl_ld_xxbgnr_modallist', sbxxArray.f_pqid);
                            controlObj.singledropdownlistid('detail_f_singledropdowngroup_dy_new_tbl_ld_xxbgnr_modallist', sbxxArray[ids + "id"]);
                            controlObj.singledropdownlistid('detail_f_singledropdowngroup_sc_new_tbl_ld_xxbgnr_modallist', sbxxArray.f_scid);
                            controlObj.singledropdownlistid('detail_f_singledropdowngroup_qy_new_tbl_ld_xxbgnr_modallist', sbxxArray.f_qyid);
                            controlObj.singledropdownlistid('detail_f_singledropdowngroup_pq_new_tbl_ld_xxbgnr_modallist', sbxxArray.f_pqid);
                        }

                        $('.aa').addClass('hidden');
                        $('#detail_f_singledropdowngroup_dy_old_tbl_ld_xxbgnr_modallist').parent().parent().parent().removeClass('hidden')
                        $('#detail_f_singledropdowngroup_dy_new_tbl_ld_xxbgnr_modallist').parent().parent().parent().removeClass('hidden')


                        break;
                    case "datetime":
                        clearControl();
                        setDisable();
                        var d = new Date();

                        clearControl();

                        controlObj.datetimeinit('detail_f_datetime_old_tbl_ld_xxbgnr_modallist_date', 'detail_f_datetime_old_tbl_ld_xxbgnr_modallist_time');

                        controlObj.datetimeinit('detail_f_datetime_new_tbl_ld_xxbgnr_modallist_date', 'detail_f_datetime_new_tbl_ld_xxbgnr_modallist_time');


                        var ids = e.added.id;
                        if (sbxxArray[ids] == null || sbxxArray[ids] == "")
                        {
                            controlObj.datetime('detail_f_datetime_old_tbl_ld_xxbgnr_modallist_date', '1900-01-01 00:00:00');
                        }
                        else
                        {
                            controlObj.datetime('detail_f_datetime_old_tbl_ld_xxbgnr_modallist_date', 'detail_f_datetime_old_tbl_ld_xxbgnr_modallist_time', sbxxArray[ids]);
                            controlObj.datetime('detail_f_datetime_new_tbl_ld_xxbgnr_modallist_date', 'detail_f_datetime_old_tbl_ld_xxbgnr_modallist_time', sbxxArray[ids]);
                        }

                        $($('#div_detail_f_datetime_old_tbl_ld_xxbgnr_modallist').children()[2]).text(name);

                        $('.aa').addClass('hidden');
                        $('#detail_f_datetime_old_tbl_ld_xxbgnr_modallist_date').parent().parent().parent().parent().parent().removeClass('hidden')

                        break;
                    case "datetimetime":
                        clearControl();
                        setDisable();
                        controlObj.datetimeinit('detail_f_datetimetime_old_tbl_ld_xxbgnr_modallist_date', 'detail_f_datetimetime_old_tbl_ld_xxbgnr_modallist_time');

                        controlObj.datetimeinit('detail_f_datetimetime_new_tbl_ld_xxbgnr_modallist_date', 'detail_f_datetimetime_new_tbl_ld_xxbgnr_modallist_time');


                        var ids = e.added.id;
                        if (sbxxArray[ids] == null || sbxxArray[ids] == "")
                        {
                            controlObj.datetime('detail_f_datetimetime_old_tbl_ld_xxbgnr_modallist', '1900-01-01 00:00:00');
                        }
                        else
                        {
                            controlObj.datetime('detail_f_datetimetime_old_tbl_ld_xxbgnr_modallist_date', 'detail_f_datetimetime_old_tbl_ld_xxbgnr_modallist_time', sbxxArray[ids]);
                            controlObj.datetime('detail_f_datetimetime_new_tbl_ld_xxbgnr_modallist_date', 'detail_f_datetimetime_old_tbl_ld_xxbgnr_modallist_time', sbxxArray[ids]);
                        }

                        $($('#div_detail_f_datetimetime_old_tbl_ld_xxbgnr_modallist').children()[1]).text(name);

                        $('.aa').addClass('hidden');
                        $('#detail_f_datetimetime_old_tbl_ld_xxbgnr_modallist_date').parent().parent().parent().parent().parent().removeClass('hidden')

                        break;
                };
                controlObj.text('detail_f_tablename_tbl_ld_xxbgnr_modallist', "tbl_ld_sbb");
                break;

                //客户
            case "khb":
                switch (e.added.control)
                {

                    case "text":
                        clearControl();
                        //从客户信息中取出值
                        var ids = e.added.id;
                        if (khxxArray[ids] == null || khxxArray[ids] == "")
                        {
                            controlObj.text('detail_f_text_old_tbl_ld_xxbgnr_modallist', '');
                        }
                        else
                        {
                            controlObj.text('detail_f_text_old_tbl_ld_xxbgnr_modallist', khxxArray[ids]);
                            controlObj.text('detail_f_text_new_tbl_ld_xxbgnr_modallist', khxxArray[ids]);
                        }

                        //标签名字
                        $($('#div_detail_f_text_old_tbl_ld_xxbgnr_modallist').children()[1]).text(name);
                        //显示隐藏
                        $('.aa').addClass('hidden');
                        $('#div_detail_f_text_old_tbl_ld_xxbgnr_modallist').parent().parent().removeClass('hidden')

                        break;
                    case "multidropdownlist":
                        clearControl();

                        switch (e.added.codetype)
                        {
                            case "code":
                                var code = e.added.codecontent
                                var codeService = _baseCodeHashMap.get(code);
                                controlObj.multidropdownlist('detail_f_multidropdownlist_old_tbl_ld_xxbgnr_modallist', '', null);

                                controlObj.multidropdownlistinit('detail_f_multidropdownlist_old_tbl_ld_xxbgnr_modallist', codeService, null);
                                controlObj.multidropdownlistinit('detail_f_multidropdownlist_new_tbl_ld_xxbgnr_modallist', codeService, null);
                                break;
                            case "sql":

                                var code = e.added.codecontent
                                var sql = _baseCodeHashMap.get(code);
                                controlObj.multidropdownlist('detail_f_multidropdownlist_old_tbl_ld_xxbgnr_modallist', '', null);

                                controlObj.multidropdownlistinit('detail_f_multidropdownlist_old_tbl_ld_xxbgnr_modallist', sql, null);
                                controlObj.multidropdownlistinit('detail_f_multidropdownlist_new_tbl_ld_xxbgnr_modallist', sql, null);

                                break;
                        }
                        setDisable();
                        var ids = e.added.id;
                        if (khxxArray[ids] == null || khxxArray[ids] == "")
                        {
                            controlObj.multidropdownlistid('detail_f_multidropdownlist_old_tbl_ld_xxbgnr_modallist', '');
                        }
                        else
                        {
                            controlObj.multidropdownlistid('detail_f_multidropdownlist_old_tbl_ld_xxbgnr_modallist', khxxArray[ids + "id"]);
                            controlObj.multidropdownlistid('detail_f_multidropdownlist_new_tbl_ld_xxbgnr_modallist', khxxArray[ids + "id"]);
                        }

                        $($('#div_detail_f_multidropdownlist_old_tbl_ld_xxbgnr_modallist').children()[1]).text(name);

                        $('.aa').addClass('hidden');
                        $('#div_detail_f_multidropdownlist_old_tbl_ld_xxbgnr_modallist').parent().parent().removeClass('hidden')

                        break;
                    case "singledropdownlist":
                        clearControl();

                        switch (e.added.codetype)
                        {
                            case "code":
                                var code = e.added.codecontent
                                var codeService = _baseCodeHashMap.get(code);
                                controlObj.singledropdownlist('detail_f_singledropdownlist_old_tbl_ld_xxbgnr_modallist', '', null);

                                controlObj.singledropdownlistinit('detail_f_singledropdownlist_old_tbl_ld_xxbgnr_modallist', codeService, null);
                                controlObj.singledropdownlistinit('detail_f_singledropdownlist_new_tbl_ld_xxbgnr_modallist', codeService, null);
                                break;
                            case "sql":

                                var code = e.added.codecontent
                                var sql = _baseCodeHashMap.get(code);
                                controlObj.singledropdownlist('detail_f_singledropdownlist_old_tbl_ld_xxbgnr_modallist', '', null);

                                controlObj.singledropdownlistinit('detail_f_singledropdownlist_old_tbl_ld_xxbgnr_modallist', sql, null);
                                controlObj.singledropdownlistinit('detail_f_singledropdownlist_new_tbl_ld_xxbgnr_modallist', sql, cbbh_onchange);


                                break;
                        }
                        setDisable();
                        var ids = e.added.id;
                        if (khxxArray[ids] == null || khxxArray[ids] == "")
                        {
                            controlObj.singledropdownlistid('detail_f_singledropdownlist_old_tbl_ld_xxbgnr_modallist', '');
                        }
                        else
                        {
                            controlObj.singledropdownlistid('detail_f_singledropdownlist_old_tbl_ld_xxbgnr_modallist', khxxArray[ids + "id"]);
                            controlObj.singledropdownlistid('detail_f_singledropdownlist_new_tbl_ld_xxbgnr_modallist', khxxArray[ids + "id"]);
                        }

                        $($('#div_detail_f_singledropdownlist_old_tbl_ld_xxbgnr_modallist').children()[1]).text(name);

                        $('.aa').addClass('hidden');
                        $('#div_detail_f_singledropdownlist_old_tbl_ld_xxbgnr_modallist').parent().parent().removeClass('hidden')

                        break;
                    case "toggle":
                        clearControl();
                        var ids = e.added.id;
                        controlObj.toggleinit('detail_f_toggle_new_tbl_ld_xxbgnr_modallist', null);

                        if (khxxArray[ids] == null || khxxArray[ids] == "")
                        {
                            controlObj.toggle('detail_f_toggle_old_tbl_ld_xxbgnr_modallist', '');
                        }
                        else
                        {
                            controlObj.toggle('detail_f_toggle_old_tbl_ld_xxbgnr_modallist', khxxArray[ids]);
                            controlObj.toggle('detail_f_toggle_new_tbl_ld_xxbgnr_modallist', khxxArray[ids]);
                        }

                        controlObj.toggleinit('detail_f_toggle_old_tbl_ld_xxbgnr_modallist', null);



                        $($('#div_detail_f_toggle_old_tbl_ld_xxbgnr_modallist').children()[1]).text(name);

                        $('.aa').addClass('hidden');
                        $('#div_detail_f_toggle_old_tbl_ld_xxbgnr_modallist').parent().parent().removeClass('hidden')

                        break;
                    case "textarea":
                        clearControl();

                        var ids = e.added.id;
                        if (khxxArray[ids] == null || khxxArray[ids] == "")
                        {
                            controlObj.text('detail_f_textarea_old_tbl_ld_xxbgnr_modallist', '');


                        }
                        else
                        {
                            controlObj.text('detail_f_textarea_old_tbl_ld_xxbgnr_modallist', khxxArray[ids].returnStringRN());
                            controlObj.text('detail_f_textarea_new_tbl_ld_xxbgnr_modallist', khxxArray[ids].returnStringRN());
                        }

                        $($('#div_detail_f_textarea_old_tbl_ld_xxbgnr_modallist').children()[1]).text(name);


                        $('.aa').addClass('hidden');
                        $('#div_detail_f_textarea_old_tbl_ld_xxbgnr_modallist').parent().parent().removeClass('hidden')

                        break;
                    case "singledropdowngroup":
                        clearControl();

                        var codeService_0512 = _baseCodeHashMap.get('codeservice_0512');

                        var codeService_0513 = _baseCodeHashMap.get('codeservice_0513');

                        var codeService_0514 = _baseCodeHashMap.get('codeservice_0514');

                        var codeService_0515 = _baseCodeHashMap.get('codeservice_0515');
                        var codeService_sc = _baseCodeHashMap.get('codeservice_sc');
                        var codeService_qy = _baseCodeHashMap.get('codeservice_qy');
                        var codeService_pq = _baseCodeHashMap.get('codeservice_pq');



                        controlObj.singledropdownlistinit('detail_f_singledropdowngroup_dy_old_tbl_ld_xxbgnr_modallist', codeService_0512, null);
                        controlObj.singledropdownlistinit('detail_f_singledropdowngroup_sc_old_tbl_ld_xxbgnr_modallist', codeService_sc, null);
                        controlObj.singledropdownlistinit('detail_f_singledropdowngroup_qy_old_tbl_ld_xxbgnr_modallist', codeService_qy, null);
                        controlObj.singledropdownlistinit('detail_f_singledropdowngroup_pq_old_tbl_ld_xxbgnr_modallist', codeService_pq, null);
                        controlObj.singledropdownlistinit('detail_f_singledropdowngroup_dy_new_tbl_ld_xxbgnr_modallist', codeService_0512, dy_onchange);
                        controlObj.singledropdownlistinit('detail_f_singledropdowngroup_sc_new_tbl_ld_xxbgnr_modallist', codeService_0513, dy_onchange);
                        controlObj.singledropdownlistinit('detail_f_singledropdowngroup_qy_new_tbl_ld_xxbgnr_modallist', codeService_0514, dy_onchange);
                        controlObj.singledropdownlistinit('detail_f_singledropdowngroup_pq_new_tbl_ld_xxbgnr_modallist', codeService_0515, dy_onchange);

                        setDisable();
                        var ids = e.added.id;
                        if (khxxArray[ids] == null || khxxArray[ids] == "")
                        {
                            controlObj.singledropdownlist('detail_f_singledropdownlist_old_tbl_ld_xxbgnr_modallist', '');
                        }
                        else
                        {

                            controlObj.singledropdownlistid('detail_f_singledropdowngroup_dy_old_tbl_ld_xxbgnr_modallist', khxxArray[ids + "id"]);

                            controlObj.singledropdownlistid('detail_f_singledropdowngroup_sc_old_tbl_ld_xxbgnr_modallist', khxxArray.f_scid);
                            controlObj.singledropdownlistid('detail_f_singledropdowngroup_qy_old_tbl_ld_xxbgnr_modallist', khxxArray.f_qyid);
                            controlObj.singledropdownlistid('detail_f_singledropdowngroup_pq_old_tbl_ld_xxbgnr_modallist', khxxArray.f_pqid);
                            controlObj.singledropdownlistid('detail_f_singledropdowngroup_dy_new_tbl_ld_xxbgnr_modallist', khxxArray[ids + "id"]);
                            controlObj.singledropdownlistid('detail_f_singledropdowngroup_sc_new_tbl_ld_xxbgnr_modallist', khxxArray.f_scid);
                            controlObj.singledropdownlistid('detail_f_singledropdowngroup_qy_new_tbl_ld_xxbgnr_modallist', khxxArray.f_qyid);
                            controlObj.singledropdownlistid('detail_f_singledropdowngroup_pq_new_tbl_ld_xxbgnr_modallist', khxxArray.f_pqid);
                        }

                        $('.aa').addClass('hidden');
                        $('#detail_f_singledropdowngroup_dy_old_tbl_ld_xxbgnr_modallist').parent().parent().parent().removeClass('hidden')
                        $('#detail_f_singledropdowngroup_dy_new_tbl_ld_xxbgnr_modallist').parent().parent().parent().removeClass('hidden')


                        break;
                    case "datetime":
                        clearControl();
                        setDisable();
                        var d = new Date();

                        clearControl();

                        controlObj.datetimeinit('detail_f_datetime_old_tbl_ld_xxbgnr_modallist_date', 'detail_f_datetime_old_tbl_ld_xxbgnr_modallist_time');

                        controlObj.datetimeinit('detail_f_datetime_new_tbl_ld_xxbgnr_modallist_date', 'detail_f_datetime_new_tbl_ld_xxbgnr_modallist_time');


                        var ids = e.added.id;
                        if (khxxArray[ids] == null || khxxArray[ids] == "")
                        {
                            controlObj.datetime('detail_f_datetime_old_tbl_ld_xxbgnr_modallist_date', '1900-01-01 00:00:00');
                        }
                        else
                        {
                            controlObj.datetime('detail_f_datetime_old_tbl_ld_xxbgnr_modallist_date', 'detail_f_datetime_old_tbl_ld_xxbgnr_modallist_time', khxxArray[ids]);
                            controlObj.datetime('detail_f_datetime_new_tbl_ld_xxbgnr_modallist_date', 'detail_f_datetime_old_tbl_ld_xxbgnr_modallist_time', khxxArray[ids]);
                        }

                        //$($('#detail_f_datetime_old_tbl_ld_xxbgnr_modallist_date').children()[2]).text(name);

                        $('.aa').addClass('hidden');
                        $('#detail_f_datetime_old_tbl_ld_xxbgnr_modallist_date').parent().parent().parent().parent().parent().removeClass('hidden')

                        break;
                    case "datetimetime":
                        clearControl();
                        setDisable();
                        controlObj.datetimeinit('detail_f_datetimetime_old_tbl_ld_xxbgnr_modallist_date', 'detail_f_datetimetime_old_tbl_ld_xxbgnr_modallist_time');

                        controlObj.datetimeinit('detail_f_datetimetime_new_tbl_ld_xxbgnr_modallist_date', 'detail_f_datetimetime_new_tbl_ld_xxbgnr_modallist_time');


                        var ids = e.added.id;
                        if (khxxArray[ids] == null || khxxArray[ids] == "")
                        {
                            controlObj.datetime('detail_f_datetimetime_old_tbl_ld_xxbgnr_modallist', '1900-01-01 00:00:00');
                        }
                        else
                        {
                            controlObj.datetime('detail_f_datetimetime_old_tbl_ld_xxbgnr_modallist_date', 'detail_f_datetimetime_old_tbl_ld_xxbgnr_modallist_time', khxxArray[ids]);
                            controlObj.datetime('detail_f_datetimetime_new_tbl_ld_xxbgnr_modallist_date', 'detail_f_datetimetime_old_tbl_ld_xxbgnr_modallist_time', khxxArray[ids]);
                        }

                        $($('#div_detail_f_datetimetime_old_tbl_ld_xxbgnr_modallist').children()[1]).text(name);

                        $('.aa').addClass('hidden');
                        $('#detail_f_datetimetime_old_tbl_ld_xxbgnr_modallist_date').parent().parent().parent().parent().parent().removeClass('hidden')

                        break;
                };
                controlObj.text('detail_f_tablename_tbl_ld_xxbgnr_modallist', "tbl_ld_khb");
                break;

                //客户、水表------客户表取值
            case "khb,sbb":
                switch (e.added.control)
                {

                    case "text":
                        clearControl();
                        //从客户信息中取出值
                        var ids = e.added.id;
                        if (khxxArray[ids] == null || khxxArray[ids] == "")
                        {
                            controlObj.text('detail_f_text_old_tbl_ld_xxbgnr_modallist', '');
                        }
                        else
                        {
                            controlObj.text('detail_f_text_old_tbl_ld_xxbgnr_modallist', khxxArray[ids]);
                            controlObj.text('detail_f_text_new_tbl_ld_xxbgnr_modallist', khxxArray[ids]);
                        }

                        //标签名字
                        $($('#div_detail_f_text_old_tbl_ld_xxbgnr_modallist').children()[1]).text(name);
                        //显示隐藏
                        $('.aa').addClass('hidden');
                        $('#div_detail_f_text_old_tbl_ld_xxbgnr_modallist').parent().parent().removeClass('hidden')

                        break;
                    case "multidropdownlist":
                        clearControl();

                        switch (e.added.codetype)
                        {
                            case "code":
                                var code = e.added.codecontent
                                var codeService = _baseCodeHashMap.get(code);
                                controlObj.multidropdownlist('detail_f_multidropdownlist_old_tbl_ld_xxbgnr_modallist', '', null);

                                controlObj.multidropdownlistinit('detail_f_multidropdownlist_old_tbl_ld_xxbgnr_modallist', codeService, null);
                                controlObj.multidropdownlistinit('detail_f_multidropdownlist_new_tbl_ld_xxbgnr_modallist', codeService, null);
                                break;
                            case "sql":

                                var code = e.added.codecontent
                                var sql = _baseCodeHashMap.get(code);
                                controlObj.multidropdownlist('detail_f_multidropdownlist_old_tbl_ld_xxbgnr_modallist', '', null);

                                controlObj.multidropdownlistinit('detail_f_multidropdownlist_old_tbl_ld_xxbgnr_modallist', sql, null);
                                controlObj.multidropdownlistinit('detail_f_multidropdownlist_new_tbl_ld_xxbgnr_modallist', sql, null);

                                break;
                        }
                        setDisable();
                        var ids = e.added.id;
                        if (khxxArray[ids] == null || khxxArray[ids] == "")
                        {
                            controlObj.multidropdownlistid('detail_f_multidropdownlist_old_tbl_ld_xxbgnr_modallist', '');
                        }
                        else
                        {
                            controlObj.multidropdownlistid('detail_f_multidropdownlist_old_tbl_ld_xxbgnr_modallist', khxxArray[ids + "id"]);
                            controlObj.multidropdownlistid('detail_f_multidropdownlist_new_tbl_ld_xxbgnr_modallist', khxxArray[ids + "id"]);
                        }

                        $($('#div_detail_f_multidropdownlist_old_tbl_ld_xxbgnr_modallist').children()[1]).text(name);

                        $('.aa').addClass('hidden');
                        $('#div_detail_f_multidropdownlist_old_tbl_ld_xxbgnr_modallist').parent().parent().removeClass('hidden')

                        break;
                    case "singledropdownlist":
                        clearControl();

                        switch (e.added.codetype)
                        {
                            case "code":
                                var code = e.added.codecontent
                                var codeService = _baseCodeHashMap.get(code);
                                controlObj.singledropdownlist('detail_f_singledropdownlist_old_tbl_ld_xxbgnr_modallist', '', null);

                                controlObj.singledropdownlistinit('detail_f_singledropdownlist_old_tbl_ld_xxbgnr_modallist', codeService, null);
                                controlObj.singledropdownlistinit('detail_f_singledropdownlist_new_tbl_ld_xxbgnr_modallist', codeService, null);
                                break;
                            case "sql":

                                var code = e.added.codecontent
                                var sql = _baseCodeHashMap.get(code);
                                controlObj.singledropdownlist('detail_f_singledropdownlist_old_tbl_ld_xxbgnr_modallist', '', null);

                                controlObj.singledropdownlistinit('detail_f_singledropdownlist_old_tbl_ld_xxbgnr_modallist', sql, null);
                                controlObj.singledropdownlistinit('detail_f_singledropdownlist_new_tbl_ld_xxbgnr_modallist', sql, null);

                                break;
                        }
                        setDisable();
                        var ids = e.added.id;
                        if (khxxArray[ids] == null || khxxArray[ids] == "")
                        {
                            controlObj.singledropdownlistid('detail_f_singledropdownlist_old_tbl_ld_xxbgnr_modallist', '');
                        }
                        else
                        {
                            controlObj.singledropdownlistid('detail_f_singledropdownlist_old_tbl_ld_xxbgnr_modallist', khxxArray[ids + "id"]);
                            controlObj.singledropdownlistid('detail_f_singledropdownlist_new_tbl_ld_xxbgnr_modallist', khxxArray[ids + "id"]);
                        }

                        $($('#div_detail_f_singledropdownlist_old_tbl_ld_xxbgnr_modallist').children()[1]).text(name);

                        $('.aa').addClass('hidden');
                        $('#div_detail_f_singledropdownlist_old_tbl_ld_xxbgnr_modallist').parent().parent().removeClass('hidden')

                        break;
                    case "toggle":
                        clearControl();
                        var ids = e.added.id;
                        controlObj.toggleinit('detail_f_toggle_new_tbl_ld_xxbgnr_modallist', null);

                        if (khxxArray[ids] == null || khxxArray[ids] == "")
                        {
                            controlObj.toggle('detail_f_toggle_old_tbl_ld_xxbgnr_modallist', '');
                        }
                        else
                        {
                            controlObj.toggle('detail_f_toggle_new_tbl_ld_xxbgnr_modallist', khxxArray[ids]);
                        }

                        controlObj.toggleinit('detail_f_toggle_old_tbl_ld_xxbgnr_modallist', null);



                        $($('#div_detail_f_toggle_old_tbl_ld_xxbgnr_modallist').children()[1]).text(name);

                        $('.aa').addClass('hidden');
                        $('#div_detail_f_toggle_old_tbl_ld_xxbgnr_modallist').parent().parent().removeClass('hidden')

                        break;
                    case "textarea":
                        clearControl();

                        var ids = e.added.id;
                        if (khxxArray[ids] == null || khxxArray[ids] == "")
                        {
                            controlObj.text('detail_f_textarea_old_tbl_ld_xxbgnr_modallist', '');


                        }
                        else
                        {
                            controlObj.text('detail_f_textarea_old_tbl_ld_xxbgnr_modallist', khxxArray[ids].returnStringRN());
                            controlObj.text('detail_f_textarea_new_tbl_ld_xxbgnr_modallist', khxxArray[ids].returnStringRN());
                        }

                        $($('#div_detail_f_textarea_old_tbl_ld_xxbgnr_modallist').children()[1]).text(name);


                        $('.aa').addClass('hidden');
                        $('#div_detail_f_textarea_old_tbl_ld_xxbgnr_modallist').parent().parent().removeClass('hidden')

                        break;
                    case "singledropdowngroup":
                        clearControl();

                        var codeService_0512 = _baseCodeHashMap.get('codeservice_0512');

                        var codeService_0513 = _baseCodeHashMap.get('codeservice_0513');

                        var codeService_0514 = _baseCodeHashMap.get('codeservice_0514');

                        var codeService_0515 = _baseCodeHashMap.get('codeservice_0515');
                        var codeService_sc = _baseCodeHashMap.get('codeservice_sc');
                        var codeService_qy = _baseCodeHashMap.get('codeservice_qy');
                        var codeService_pq = _baseCodeHashMap.get('codeservice_pq');



                        controlObj.singledropdownlistinit('detail_f_singledropdowngroup_dy_old_tbl_ld_xxbgnr_modallist', codeService_0512, null);
                        controlObj.singledropdownlistinit('detail_f_singledropdowngroup_sc_old_tbl_ld_xxbgnr_modallist', codeService_sc, null);
                        controlObj.singledropdownlistinit('detail_f_singledropdowngroup_qy_old_tbl_ld_xxbgnr_modallist', codeService_qy, null);
                        controlObj.singledropdownlistinit('detail_f_singledropdowngroup_pq_old_tbl_ld_xxbgnr_modallist', codeService_pq, null);
                        controlObj.singledropdownlistinit('detail_f_singledropdowngroup_dy_new_tbl_ld_xxbgnr_modallist', codeService_0512, dy_onchange);
                        controlObj.singledropdownlistinit('detail_f_singledropdowngroup_sc_new_tbl_ld_xxbgnr_modallist', codeService_0513, dy_onchange);
                        controlObj.singledropdownlistinit('detail_f_singledropdowngroup_qy_new_tbl_ld_xxbgnr_modallist', codeService_0514, dy_onchange);
                        controlObj.singledropdownlistinit('detail_f_singledropdowngroup_pq_new_tbl_ld_xxbgnr_modallist', codeService_0515, dy_onchange);

                        setDisable();
                        var ids = e.added.id;
                        if (khxxArray[ids] == null || khxxArray[ids] == "")
                        {
                            controlObj.singledropdownlist('detail_f_singledropdownlist_old_tbl_ld_xxbgnr_modallist', '');
                        }
                        else
                        {

                            controlObj.singledropdownlistid('detail_f_singledropdowngroup_dy_old_tbl_ld_xxbgnr_modallist', khxxArray[ids + "id"]);

                            controlObj.singledropdownlistid('detail_f_singledropdowngroup_sc_old_tbl_ld_xxbgnr_modallist', khxxArray.f_scid);
                            controlObj.singledropdownlistid('detail_f_singledropdowngroup_qy_old_tbl_ld_xxbgnr_modallist', khxxArray.f_qyid);
                            controlObj.singledropdownlistid('detail_f_singledropdowngroup_pq_old_tbl_ld_xxbgnr_modallist', khxxArray.f_pqid);
                            controlObj.singledropdownlistid('detail_f_singledropdowngroup_dy_new_tbl_ld_xxbgnr_modallist', khxxArray[ids + "id"]);
                            controlObj.singledropdownlistid('detail_f_singledropdowngroup_sc_new_tbl_ld_xxbgnr_modallist', khxxArray.f_scid);
                            controlObj.singledropdownlistid('detail_f_singledropdowngroup_qy_new_tbl_ld_xxbgnr_modallist', khxxArray.f_qyid);
                            controlObj.singledropdownlistid('detail_f_singledropdowngroup_pq_new_tbl_ld_xxbgnr_modallist', khxxArray.f_pqid);
                        }

                        $('.aa').addClass('hidden');
                        $('#detail_f_singledropdowngroup_dy_old_tbl_ld_xxbgnr_modallist').parent().parent().parent().removeClass('hidden')
                        $('#detail_f_singledropdowngroup_dy_new_tbl_ld_xxbgnr_modallist').parent().parent().parent().removeClass('hidden')


                        break;
                    case "datetime":
                        clearControl();
                        setDisable();
                        var d = new Date();

                        clearControl();

                        controlObj.datetimeinit('detail_f_datetime_old_tbl_ld_xxbgnr_modallist_date', 'detail_f_datetime_old_tbl_ld_xxbgnr_modallist_time');

                        controlObj.datetimeinit('detail_f_datetime_new_tbl_ld_xxbgnr_modallist_date', 'detail_f_datetime_new_tbl_ld_xxbgnr_modallist_time');


                        var ids = e.added.id;
                        if (khxxArray[ids] == null || khxxArray[ids] == "")
                        {
                            controlObj.datetime('detail_f_datetime_old_tbl_ld_xxbgnr_modallist_date', '1900-01-01 00:00:00');
                        }
                        else
                        {
                            controlObj.datetime('detail_f_datetime_old_tbl_ld_xxbgnr_modallist_date', 'detail_f_datetime_old_tbl_ld_xxbgnr_modallist_time', khxxArray[ids]);
                            controlObj.datetime('detail_f_datetime_new_tbl_ld_xxbgnr_modallist_date', 'detail_f_datetime_old_tbl_ld_xxbgnr_modallist_time', khxxArray[ids]);
                        }

                        $($('#div_detail_f_datetime_old_tbl_ld_xxbgnr_modallist').children()[2]).text(name);

                        $('.aa').addClass('hidden');
                        $('#detail_f_datetime_old_tbl_ld_xxbgnr_modallist_date').parent().parent().parent().parent().parent().removeClass('hidden')

                        break;
                    case "datetimetime":
                        clearControl();
                        setDisable();
                        controlObj.datetimeinit('detail_f_datetimetime_old_tbl_ld_xxbgnr_modallist_date', 'detail_f_datetimetime_old_tbl_ld_xxbgnr_modallist_time');

                        controlObj.datetimeinit('detail_f_datetimetime_new_tbl_ld_xxbgnr_modallist_date', 'detail_f_datetimetime_new_tbl_ld_xxbgnr_modallist_time');


                        var ids = e.added.id;
                        if (khxxArray[ids] == null || khxxArray[ids] == "")
                        {
                            controlObj.datetime('detail_f_datetimetime_old_tbl_ld_xxbgnr_modallist', '1900-01-01 00:00:00');
                        }
                        else
                        {
                            controlObj.datetime('detail_f_datetimetime_old_tbl_ld_xxbgnr_modallist_date', 'detail_f_datetimetime_old_tbl_ld_xxbgnr_modallist_time', khxxArray[ids]);
                            controlObj.datetime('detail_f_datetimetime_new_tbl_ld_xxbgnr_modallist_date', 'detail_f_datetimetime_old_tbl_ld_xxbgnr_modallist_time', khxxArray[ids]);
                        }

                        $($('#div_detail_f_datetimetime_old_tbl_ld_xxbgnr_modallist').children()[1]).text(name);

                        $('.aa').addClass('hidden');
                        $('#detail_f_datetimetime_old_tbl_ld_xxbgnr_modallist_date').parent().parent().parent().parent().parent().removeClass('hidden')

                        break;
                };
                controlObj.text('detail_f_tablename_tbl_ld_xxbgnr_modallist', "tbl_ld_khb^tbl_ld_sbb");
                break;

                //客户、用户 -----从客户表取值
            case "khb,yhb":
                switch (e.added.control)
                {

                    case "text":
                        clearControl();
                        //从客户信息中取出值
                        var ids = e.added.id;

                            if (name == "托收银行账号")
                            {
                                //获取用水类型、抄本编号数据作为code下拉选项
                                var sqlStringsJson = {
                                    "count": "select count(*) as count from tbl_ldbm_expdata where ','||f_khbh||',' like '%," + tbl_ld_xxbg_detail_Obj._khbh + ",%'",
                                    "content": "select f_nr,f_lx from tbl_ldbm_expdata where ','||f_khbh||',' like '%," + tbl_ld_xxbg_detail_Obj._khbh + ",%'",
                                };

                                commonObj.querySqls(sqlStringsJson, {
                                    success: function (resultJson)
                                    {

                                        if (parseInt(resultJson["count"][0]["count"]) > 0)
                                        {
                                            //托收中
                                            controlObj.text('detail_f_text_old_tbl_ld_xxbgnr_modallist', resultJson["content"][0]["f_nr"]);
                                            controlObj.text('detail_f_text_new_tbl_ld_xxbgnr_modallist', resultJson["content"][0]["f_nr"]);


                                        }
                                        else
                                        {
                                            //未托收
                                            controlObj.text('detail_f_text_old_tbl_ld_xxbgnr_modallist', "");
                                            controlObj.text('detail_f_text_new_tbl_ld_xxbgnr_modallist', "");

                                        }
                                    }
                                });
                            }
                            else
                            {
                                if (khxxArray[ids] == null || khxxArray[ids] == "")
                                {
                                    controlObj.text('detail_f_text_old_tbl_ld_xxbgnr_modallist', '');
                                }
                                else
                                {
                                    controlObj.text('detail_f_text_old_tbl_ld_xxbgnr_modallist', yhxxArray[ids]);
                                    controlObj.text('detail_f_text_new_tbl_ld_xxbgnr_modallist', yhxxArray[ids]);
                                }
                            }

                        

                        //标签名字
                        $($('#div_detail_f_text_old_tbl_ld_xxbgnr_modallist').children()[1]).text(name);
                        //显示隐藏
                        $('.aa').addClass('hidden');
                        $('#div_detail_f_text_old_tbl_ld_xxbgnr_modallist').parent().parent().removeClass('hidden')

                        break;
                    case "multidropdownlist":
                        clearControl();

                        switch (e.added.codetype)
                        {
                            case "code":
                                var code = e.added.codecontent
                                var codeService = _baseCodeHashMap.get(code);
                                controlObj.multidropdownlist('detail_f_multidropdownlist_old_tbl_ld_xxbgnr_modallist', '', null);

                                controlObj.multidropdownlistinit('detail_f_multidropdownlist_old_tbl_ld_xxbgnr_modallist', codeService, null);
                                controlObj.multidropdownlistinit('detail_f_multidropdownlist_new_tbl_ld_xxbgnr_modallist', codeService, null);
                                break;
                            case "sql":

                                var code = e.added.codecontent
                                var sql = _baseCodeHashMap.get(code);
                                controlObj.multidropdownlist('detail_f_multidropdownlist_old_tbl_ld_xxbgnr_modallist', '', null);

                                controlObj.multidropdownlistinit('detail_f_multidropdownlist_old_tbl_ld_xxbgnr_modallist', sql, null);
                                controlObj.multidropdownlistinit('detail_f_multidropdownlist_new_tbl_ld_xxbgnr_modallist', sql, null);

                                break;
                        }
                        setDisable();
                        var ids = e.added.id;
                        if (khxxArray[ids] == null || khxxArray[ids] == "")
                        {
                            controlObj.multidropdownlistid('detail_f_multidropdownlist_old_tbl_ld_xxbgnr_modallist', '');
                        }
                        else
                        {
                            controlObj.multidropdownlistid('detail_f_multidropdownlist_old_tbl_ld_xxbgnr_modallist', khxxArray[ids + "id"]);
                            controlObj.multidropdownlistid('detail_f_multidropdownlist_new_tbl_ld_xxbgnr_modallist', khxxArray[ids + "id"]);
                        }

                        $($('#div_detail_f_multidropdownlist_old_tbl_ld_xxbgnr_modallist').children()[1]).text(name);

                        $('.aa').addClass('hidden');
                        $('#div_detail_f_multidropdownlist_old_tbl_ld_xxbgnr_modallist').parent().parent().removeClass('hidden')

                        break;
                    case "singledropdownlist":
                        clearControl();

                        switch (e.added.codetype)
                        {
                            case "code":
                                var code = e.added.codecontent
                                var codeService = _baseCodeHashMap.get(code);
                                controlObj.singledropdownlist('detail_f_singledropdownlist_old_tbl_ld_xxbgnr_modallist', '', null);

                                controlObj.singledropdownlistinit('detail_f_singledropdownlist_old_tbl_ld_xxbgnr_modallist', codeService, null);
                                controlObj.singledropdownlistinit('detail_f_singledropdownlist_new_tbl_ld_xxbgnr_modallist', codeService, null);
                                break;
                            case "sql":

                                var code = e.added.codecontent
                                var sql = _baseCodeHashMap.get(code);
                                controlObj.singledropdownlist('detail_f_singledropdownlist_old_tbl_ld_xxbgnr_modallist', '', null);

                                controlObj.singledropdownlistinit('detail_f_singledropdownlist_old_tbl_ld_xxbgnr_modallist', sql, null);
                                controlObj.singledropdownlistinit('detail_f_singledropdownlist_new_tbl_ld_xxbgnr_modallist', sql, null);

                                break;
                        }
                        setDisable();
                        var ids = e.added.id;
                        if (khxxArray[ids] == null || khxxArray[ids] == "")
                        {
                            controlObj.singledropdownlistid('detail_f_singledropdownlist_old_tbl_ld_xxbgnr_modallist', '');
                        }
                        else
                        {
                            controlObj.singledropdownlistid('detail_f_singledropdownlist_old_tbl_ld_xxbgnr_modallist', khxxArray[ids + "id"]);
                            controlObj.singledropdownlistid('detail_f_singledropdownlist_new_tbl_ld_xxbgnr_modallist', khxxArray[ids + "id"]);
                        }

                        $($('#div_detail_f_singledropdownlist_old_tbl_ld_xxbgnr_modallist').children()[1]).text(name);

                        $('.aa').addClass('hidden');
                        $('#div_detail_f_singledropdownlist_old_tbl_ld_xxbgnr_modallist').parent().parent().removeClass('hidden')

                        break;
                    case "toggle":
                        clearControl();
                        var ids = e.added.id;
                        controlObj.toggleinit('detail_f_toggle_new_tbl_ld_xxbgnr_modallist', null);

                        if (khxxArray[ids] == null || khxxArray[ids] == "")
                        {
                            controlObj.toggle('detail_f_toggle_old_tbl_ld_xxbgnr_modallist', '');
                        }
                        else
                        {
                            controlObj.toggle('detail_f_toggle_old_tbl_ld_xxbgnr_modallist', khxxArray[ids]);
                            controlObj.toggle('detail_f_toggle_new_tbl_ld_xxbgnr_modallist', khxxArray[ids]);
                        }

                        controlObj.toggleinit('detail_f_toggle_old_tbl_ld_xxbgnr_modallist', null);



                        $($('#div_detail_f_toggle_old_tbl_ld_xxbgnr_modallist').children()[1]).text(name);

                        $('.aa').addClass('hidden');
                        $('#div_detail_f_toggle_old_tbl_ld_xxbgnr_modallist').parent().parent().removeClass('hidden')

                        break;
                    case "textarea":
                        clearControl();

                        var ids = e.added.id;
                        if (khxxArray[ids] == null || khxxArray[ids] == "")
                        {
                            controlObj.text('detail_f_textarea_old_tbl_ld_xxbgnr_modallist', '');


                        }
                        else
                        {
                            controlObj.text('detail_f_textarea_old_tbl_ld_xxbgnr_modallist', khxxArray[ids].returnStringRN());
                            controlObj.text('detail_f_textarea_new_tbl_ld_xxbgnr_modallist', khxxArray[ids].returnStringRN());
                        }

                        $($('#div_detail_f_textarea_old_tbl_ld_xxbgnr_modallist').children()[1]).text(name);


                        $('.aa').addClass('hidden');
                        $('#div_detail_f_textarea_old_tbl_ld_xxbgnr_modallist').parent().parent().removeClass('hidden')

                        break;
                    case "singledropdowngroup":
                        clearControl();

                        var codeService_0512 = _baseCodeHashMap.get('codeservice_0512');

                        var codeService_0513 = _baseCodeHashMap.get('codeservice_0513');

                        var codeService_0514 = _baseCodeHashMap.get('codeservice_0514');

                        var codeService_0515 = _baseCodeHashMap.get('codeservice_0515');
                        var codeService_sc = _baseCodeHashMap.get('codeservice_sc');
                        var codeService_qy = _baseCodeHashMap.get('codeservice_qy');
                        var codeService_pq = _baseCodeHashMap.get('codeservice_pq');



                        controlObj.singledropdownlistinit('detail_f_singledropdowngroup_dy_old_tbl_ld_xxbgnr_modallist', codeService_0512, null);
                        controlObj.singledropdownlistinit('detail_f_singledropdowngroup_sc_old_tbl_ld_xxbgnr_modallist', codeService_sc, null);
                        controlObj.singledropdownlistinit('detail_f_singledropdowngroup_qy_old_tbl_ld_xxbgnr_modallist', codeService_qy, null);
                        controlObj.singledropdownlistinit('detail_f_singledropdowngroup_pq_old_tbl_ld_xxbgnr_modallist', codeService_pq, null);
                        controlObj.singledropdownlistinit('detail_f_singledropdowngroup_dy_new_tbl_ld_xxbgnr_modallist', codeService_0512, dy_onchange);
                        controlObj.singledropdownlistinit('detail_f_singledropdowngroup_sc_new_tbl_ld_xxbgnr_modallist', codeService_0513, dy_onchange);
                        controlObj.singledropdownlistinit('detail_f_singledropdowngroup_qy_new_tbl_ld_xxbgnr_modallist', codeService_0514, dy_onchange);
                        controlObj.singledropdownlistinit('detail_f_singledropdowngroup_pq_new_tbl_ld_xxbgnr_modallist', codeService_0515, dy_onchange);

                        setDisable();
                        var ids = e.added.id;
                        if (khxxArray[ids] == null || khxxArray[ids] == "")
                        {
                            controlObj.singledropdownlist('detail_f_singledropdownlist_old_tbl_ld_xxbgnr_modallist', '');
                        }
                        else
                        {

                            controlObj.singledropdownlistid('detail_f_singledropdowngroup_dy_old_tbl_ld_xxbgnr_modallist', khxxArray[ids + "id"]);

                            controlObj.singledropdownlistid('detail_f_singledropdowngroup_sc_old_tbl_ld_xxbgnr_modallist', khxxArray.f_scid);
                            controlObj.singledropdownlistid('detail_f_singledropdowngroup_qy_old_tbl_ld_xxbgnr_modallist', khxxArray.f_qyid);
                            controlObj.singledropdownlistid('detail_f_singledropdowngroup_pq_old_tbl_ld_xxbgnr_modallist', khxxArray.f_pqid);
                        }

                        $('.aa').addClass('hidden');
                        $('#detail_f_singledropdowngroup_dy_old_tbl_ld_xxbgnr_modallist').parent().parent().parent().removeClass('hidden')
                        $('#detail_f_singledropdowngroup_dy_new_tbl_ld_xxbgnr_modallist').parent().parent().parent().removeClass('hidden')


                        break;
                    case "datetime":
                        clearControl();
                        setDisable();
                        var d = new Date();

                        clearControl();

                        controlObj.datetimeinit('detail_f_datetime_old_tbl_ld_xxbgnr_modallist_date', 'detail_f_datetime_old_tbl_ld_xxbgnr_modallist_time');

                        controlObj.datetimeinit('detail_f_datetime_new_tbl_ld_xxbgnr_modallist_date', 'detail_f_datetime_new_tbl_ld_xxbgnr_modallist_time');


                        var ids = e.added.id;
                        if (khxxArray[ids] == null || khxxArray[ids] == "")
                        {
                            controlObj.datetime('detail_f_datetime_old_tbl_ld_xxbgnr_modallist_date', '1900-01-01 00:00:00');
                        }
                        else
                        {
                            controlObj.datetime('detail_f_datetime_old_tbl_ld_xxbgnr_modallist_date', 'detail_f_datetime_old_tbl_ld_xxbgnr_modallist_time', khxxArray[ids]);
                            controlObj.datetime('detail_f_datetime_new_tbl_ld_xxbgnr_modallist_date', 'detail_f_datetime_old_tbl_ld_xxbgnr_modallist_time', khxxArray[ids]);
                        }

                        $($('#div_detail_f_datetime_old_tbl_ld_xxbgnr_modallist').children()[2]).text(name);

                        $('.aa').addClass('hidden');
                        $('#detail_f_datetime_old_tbl_ld_xxbgnr_modallist_date').parent().parent().parent().parent().parent().removeClass('hidden')

                        break;
                    case "datetimetime":
                        clearControl();
                        setDisable();
                        controlObj.datetimeinit('detail_f_datetimetime_old_tbl_ld_xxbgnr_modallist_date', 'detail_f_datetimetime_old_tbl_ld_xxbgnr_modallist_time');

                        controlObj.datetimeinit('detail_f_datetimetime_new_tbl_ld_xxbgnr_modallist_date', 'detail_f_datetimetime_new_tbl_ld_xxbgnr_modallist_time');


                        var ids = e.added.id;
                        if (khxxArray[ids] == null || khxxArray[ids] == "")
                        {
                            controlObj.datetime('detail_f_datetimetime_old_tbl_ld_xxbgnr_modallist', '1900-01-01 00:00:00');
                        }
                        else
                        {
                            controlObj.datetime('detail_f_datetimetime_old_tbl_ld_xxbgnr_modallist_date', 'detail_f_datetimetime_old_tbl_ld_xxbgnr_modallist_time', khxxArray[ids]);
                            controlObj.datetime('detail_f_datetimetime_new_tbl_ld_xxbgnr_modallist_date', 'detail_f_datetimetime_old_tbl_ld_xxbgnr_modallist_time', khxxArray[ids]);
                        }

                        $($('#div_detail_f_datetimetime_old_tbl_ld_xxbgnr_modallist').children()[1]).text(name);

                        $('.aa').addClass('hidden');
                        $('#detail_f_datetimetime_old_tbl_ld_xxbgnr_modallist_date').parent().parent().parent().parent().parent().removeClass('hidden')

                        break;
                };
                controlObj.text('detail_f_tablename_tbl_ld_xxbgnr_modallist', "tbl_ld_khb^tbl_ld_yhb");
                break;
            //客户、用户 -----从客户表取值
            case "khb,yhb,sbb":
                switch (e.added.control)
                {
                    
                    case "text":
                        clearControl();
                        //从客户信息中取出值
                        var ids = e.added.id;
                        if (khxxArray[ids] == null || khxxArray[ids] == "")
                        {
                            controlObj.text('detail_f_text_old_tbl_ld_xxbgnr_modallist', '');
                        }
                        else
                        {
                            controlObj.text('detail_f_text_old_tbl_ld_xxbgnr_modallist', khxxArray[ids]);
                            controlObj.text('detail_f_text_new_tbl_ld_xxbgnr_modallist', khxxArray[ids]);
                        }

                        //标签名字
                        $($('#div_detail_f_text_old_tbl_ld_xxbgnr_modallist').children()[1]).text(name);
                        //显示隐藏
                        $('.aa').addClass('hidden');
                        $('#div_detail_f_text_old_tbl_ld_xxbgnr_modallist').parent().parent().removeClass('hidden')

                        break;
                    case "multidropdownlist":
                        clearControl();

                        switch (e.added.codetype)
                        {
                            case "code":
                                var code = e.added.codecontent
                                var codeService = _baseCodeHashMap.get(code);
                                controlObj.multidropdownlist('detail_f_multidropdownlist_old_tbl_ld_xxbgnr_modallist', '', null);

                                controlObj.multidropdownlistinit('detail_f_multidropdownlist_old_tbl_ld_xxbgnr_modallist', codeService, null);
                                controlObj.multidropdownlistinit('detail_f_multidropdownlist_new_tbl_ld_xxbgnr_modallist', codeService, null);
                                break;
                            case "sql":

                                var code = e.added.codecontent
                                var sql = _baseCodeHashMap.get(code);
                                controlObj.multidropdownlist('detail_f_multidropdownlist_old_tbl_ld_xxbgnr_modallist', '', null);

                                controlObj.multidropdownlistinit('detail_f_multidropdownlist_old_tbl_ld_xxbgnr_modallist', sql, null);
                                controlObj.multidropdownlistinit('detail_f_multidropdownlist_new_tbl_ld_xxbgnr_modallist', sql, null);

                                break;
                        }
                        setDisable();
                        var ids = e.added.id;
                        if (khxxArray[ids] == null || khxxArray[ids] == "")
                        {
                            controlObj.multidropdownlistid('detail_f_multidropdownlist_old_tbl_ld_xxbgnr_modallist', '');
                        }
                        else
                        {
                            controlObj.multidropdownlistid('detail_f_multidropdownlist_old_tbl_ld_xxbgnr_modallist', khxxArray[ids + "id"]);
                            controlObj.multidropdownlistid('detail_f_multidropdownlist_new_tbl_ld_xxbgnr_modallist', khxxArray[ids + "id"]);
                        }

                        $($('#div_detail_f_multidropdownlist_old_tbl_ld_xxbgnr_modallist').children()[1]).text(name);

                        $('.aa').addClass('hidden');
                        $('#div_detail_f_multidropdownlist_old_tbl_ld_xxbgnr_modallist').parent().parent().removeClass('hidden')

                        break;
                    case "singledropdownlist":
                        debugger
                        clearControl();

                        switch (e.added.codetype)
                        {
                            case "code":
                                var code = e.added.codecontent
                                var codeService = _baseCodeHashMap.get(code);
                                controlObj.singledropdownlist('detail_f_singledropdownlist_old_tbl_ld_xxbgnr_modallist', '', null);

                                controlObj.singledropdownlistinit('detail_f_singledropdownlist_old_tbl_ld_xxbgnr_modallist', codeService, null);
                                controlObj.singledropdownlistinit('detail_f_singledropdownlist_new_tbl_ld_xxbgnr_modallist', codeService, null);
                                break;
                            case "sql":

                                var code = e.added.codecontent
                                var sql = _baseCodeHashMap.get(code);
                                controlObj.singledropdownlist('detail_f_singledropdownlist_old_tbl_ld_xxbgnr_modallist', '', null);

                                controlObj.singledropdownlistinit('detail_f_singledropdownlist_old_tbl_ld_xxbgnr_modallist', sql, null);
                                controlObj.singledropdownlistinit('detail_f_singledropdownlist_new_tbl_ld_xxbgnr_modallist', sql, null);

                                break;
                        }
                        setDisable();
                        var ids = e.added.id;
                        if (khxxArray[ids] == null || khxxArray[ids] == "")
                        {
                            controlObj.singledropdownlistid('detail_f_singledropdownlist_old_tbl_ld_xxbgnr_modallist', '');
                        }
                        else
                        {
                            controlObj.singledropdownlistid('detail_f_singledropdownlist_old_tbl_ld_xxbgnr_modallist', khxxArray[ids + "id"]);
                            controlObj.singledropdownlistid('detail_f_singledropdownlist_new_tbl_ld_xxbgnr_modallist', khxxArray[ids + "id"]);
                        }

                        $($('#div_detail_f_singledropdownlist_old_tbl_ld_xxbgnr_modallist').children()[1]).text(name);

                        $('.aa').addClass('hidden');
                        $('#div_detail_f_singledropdownlist_old_tbl_ld_xxbgnr_modallist').parent().parent().removeClass('hidden')

                        break;
                    case "toggle":
                        clearControl();
                        var ids = e.added.id;
                        controlObj.toggleinit('detail_f_toggle_new_tbl_ld_xxbgnr_modallist', null);

                        if (khxxArray[ids] == null || khxxArray[ids] == "")
                        {
                            controlObj.toggle('detail_f_toggle_old_tbl_ld_xxbgnr_modallist', '');
                        }
                        else
                        {
                            controlObj.toggle('detail_f_toggle_old_tbl_ld_xxbgnr_modallist', khxxArray[ids]);
                            controlObj.toggle('detail_f_toggle_new_tbl_ld_xxbgnr_modallist', khxxArray[ids]);
                        }

                        controlObj.toggleinit('detail_f_toggle_old_tbl_ld_xxbgnr_modallist', null);



                        $($('#div_detail_f_toggle_old_tbl_ld_xxbgnr_modallist').children()[1]).text(name);

                        $('.aa').addClass('hidden');
                        $('#div_detail_f_toggle_old_tbl_ld_xxbgnr_modallist').parent().parent().removeClass('hidden')

                        break;
                    case "textarea":
                        clearControl();

                        var ids = e.added.id;
                        if (khxxArray[ids] == null || khxxArray[ids] == "")
                        {
                            controlObj.text('detail_f_textarea_old_tbl_ld_xxbgnr_modallist', '');


                        }
                        else
                        {
                            controlObj.text('detail_f_textarea_old_tbl_ld_xxbgnr_modallist', khxxArray[ids].returnStringRN());
                            controlObj.text('detail_f_textarea_new_tbl_ld_xxbgnr_modallist', khxxArray[ids].returnStringRN());
                        }

                        $($('#div_detail_f_textarea_old_tbl_ld_xxbgnr_modallist').children()[1]).text(name);


                        $('.aa').addClass('hidden');
                        $('#div_detail_f_textarea_old_tbl_ld_xxbgnr_modallist').parent().parent().removeClass('hidden')

                        break;
                    case "singledropdowngroup":
                        clearControl();

                        var codeService_0512 = _baseCodeHashMap.get('codeservice_0512');

                        var codeService_0513 = _baseCodeHashMap.get('codeservice_0513');

                        var codeService_0514 = _baseCodeHashMap.get('codeservice_0514');

                        var codeService_0515 = _baseCodeHashMap.get('codeservice_0515');
                        var codeService_sc = _baseCodeHashMap.get('codeservice_sc');
                        var codeService_qy = _baseCodeHashMap.get('codeservice_qy');
                        var codeService_pq = _baseCodeHashMap.get('codeservice_pq');



                        controlObj.singledropdownlistinit('detail_f_singledropdowngroup_dy_old_tbl_ld_xxbgnr_modallist', codeService_0512, null);
                        controlObj.singledropdownlistinit('detail_f_singledropdowngroup_sc_old_tbl_ld_xxbgnr_modallist', codeService_sc, null);
                        controlObj.singledropdownlistinit('detail_f_singledropdowngroup_qy_old_tbl_ld_xxbgnr_modallist', codeService_qy, null);
                        controlObj.singledropdownlistinit('detail_f_singledropdowngroup_pq_old_tbl_ld_xxbgnr_modallist', codeService_pq, null);
                        controlObj.singledropdownlistinit('detail_f_singledropdowngroup_dy_new_tbl_ld_xxbgnr_modallist', codeService_0512, dy_onchange);
                        controlObj.singledropdownlistinit('detail_f_singledropdowngroup_sc_new_tbl_ld_xxbgnr_modallist', codeService_0513, dy_onchange);
                        controlObj.singledropdownlistinit('detail_f_singledropdowngroup_qy_new_tbl_ld_xxbgnr_modallist', codeService_0514, dy_onchange);
                        controlObj.singledropdownlistinit('detail_f_singledropdowngroup_pq_new_tbl_ld_xxbgnr_modallist', codeService_0515, dy_onchange);

                        setDisable();
                        var ids = e.added.id;
                        if (khxxArray[ids] == null || khxxArray[ids] == "")
                        {
                            controlObj.singledropdownlist('detail_f_singledropdownlist_old_tbl_ld_xxbgnr_modallist', '');
                        }
                        else
                        {

                            controlObj.singledropdownlistid('detail_f_singledropdowngroup_dy_old_tbl_ld_xxbgnr_modallist', khxxArray[ids + "id"]);

                            controlObj.singledropdownlistid('detail_f_singledropdowngroup_sc_old_tbl_ld_xxbgnr_modallist', khxxArray.f_scid);
                            controlObj.singledropdownlistid('detail_f_singledropdowngroup_qy_old_tbl_ld_xxbgnr_modallist', khxxArray.f_qyid);
                            controlObj.singledropdownlistid('detail_f_singledropdowngroup_pq_old_tbl_ld_xxbgnr_modallist', khxxArray.f_pqid);
                        }

                        $('.aa').addClass('hidden');
                        $('#detail_f_singledropdowngroup_dy_old_tbl_ld_xxbgnr_modallist').parent().parent().parent().removeClass('hidden')
                        $('#detail_f_singledropdowngroup_dy_new_tbl_ld_xxbgnr_modallist').parent().parent().parent().removeClass('hidden')


                        break;
                    case "datetime":
                        clearControl();
                        setDisable();
                        var d = new Date();

                        clearControl();

                        controlObj.datetimeinit('detail_f_datetime_old_tbl_ld_xxbgnr_modallist_date', 'detail_f_datetime_old_tbl_ld_xxbgnr_modallist_time');

                        controlObj.datetimeinit('detail_f_datetime_new_tbl_ld_xxbgnr_modallist_date', 'detail_f_datetime_new_tbl_ld_xxbgnr_modallist_time');


                        var ids = e.added.id;
                        if (khxxArray[ids] == null || khxxArray[ids] == "")
                        {
                            controlObj.datetime('detail_f_datetime_old_tbl_ld_xxbgnr_modallist_date', '1900-01-01 00:00:00');
                        }
                        else
                        {
                            controlObj.datetime('detail_f_datetime_old_tbl_ld_xxbgnr_modallist_date', 'detail_f_datetime_old_tbl_ld_xxbgnr_modallist_time', khxxArray[ids]);
                            controlObj.datetime('detail_f_datetime_new_tbl_ld_xxbgnr_modallist_date', 'detail_f_datetime_old_tbl_ld_xxbgnr_modallist_time', khxxArray[ids]);
                        }

                        $($('#div_detail_f_datetime_old_tbl_ld_xxbgnr_modallist').children()[2]).text(name);

                        $('.aa').addClass('hidden');
                        $('#detail_f_datetime_old_tbl_ld_xxbgnr_modallist_date').parent().parent().parent().parent().parent().removeClass('hidden')

                        break;
                    case "datetimetime":
                        clearControl();
                        setDisable();
                        controlObj.datetimeinit('detail_f_datetimetime_old_tbl_ld_xxbgnr_modallist_date', 'detail_f_datetimetime_old_tbl_ld_xxbgnr_modallist_time');

                        controlObj.datetimeinit('detail_f_datetimetime_new_tbl_ld_xxbgnr_modallist_date', 'detail_f_datetimetime_new_tbl_ld_xxbgnr_modallist_time');


                        var ids = e.added.id;
                        if (khxxArray[ids] == null || khxxArray[ids] == "")
                        {
                            controlObj.datetime('detail_f_datetimetime_old_tbl_ld_xxbgnr_modallist', '1900-01-01 00:00:00');
                        }
                        else
                        {
                            controlObj.datetime('detail_f_datetimetime_old_tbl_ld_xxbgnr_modallist_date', 'detail_f_datetimetime_old_tbl_ld_xxbgnr_modallist_time', khxxArray[ids]);
                            controlObj.datetime('detail_f_datetimetime_new_tbl_ld_xxbgnr_modallist_date', 'detail_f_datetimetime_old_tbl_ld_xxbgnr_modallist_time', khxxArray[ids]);
                        }

                        $($('#div_detail_f_datetimetime_old_tbl_ld_xxbgnr_modallist').children()[1]).text(name);

                        $('.aa').addClass('hidden');
                        $('#detail_f_datetimetime_old_tbl_ld_xxbgnr_modallist_date').parent().parent().parent().parent().parent().removeClass('hidden')

                        break;
                };
                controlObj.text('detail_f_tablename_tbl_ld_xxbgnr_modallist', "tbl_ld_khb^tbl_ld_yhb");
                break;
            case "dy":
                switch (e.added.control)
                {

                    case "singledropdowngroup":
                        clearControl();

                        var codeService_0512 = _baseCodeHashMap.get('codeservice_0512');

                        var codeService_0513 = _baseCodeHashMap.get('codeservice_0513');

                        var codeService_0514 = _baseCodeHashMap.get('codeservice_0514');

                        var codeService_0515 = _baseCodeHashMap.get('codeservice_0515');
                        var codeService_sc = _baseCodeHashMap.get('codeservice_sc');
                        var codeService_qy = _baseCodeHashMap.get('codeservice_qy');
                        var codeService_pq = _baseCodeHashMap.get('codeservice_pq');



                        controlObj.singledropdownlistinit('detail_f_singledropdowngroup_dy_old_tbl_ld_xxbgnr_modallist', codeService_0512, null);
                        controlObj.singledropdownlistinit('detail_f_singledropdowngroup_sc_old_tbl_ld_xxbgnr_modallist', codeService_sc, null);
                        controlObj.singledropdownlistinit('detail_f_singledropdowngroup_qy_old_tbl_ld_xxbgnr_modallist', codeService_qy, null);
                        controlObj.singledropdownlistinit('detail_f_singledropdowngroup_pq_old_tbl_ld_xxbgnr_modallist', codeService_pq, null);
                        controlObj.singledropdownlistinit('detail_f_singledropdowngroup_dy_new_tbl_ld_xxbgnr_modallist', codeService_0512, dy_onchange);
                        controlObj.singledropdownlistinit('detail_f_singledropdowngroup_sc_new_tbl_ld_xxbgnr_modallist', codeService_0513, dy_onchange);
                        controlObj.singledropdownlistinit('detail_f_singledropdowngroup_qy_new_tbl_ld_xxbgnr_modallist', codeService_0514, dy_onchange);
                        controlObj.singledropdownlistinit('detail_f_singledropdowngroup_pq_new_tbl_ld_xxbgnr_modallist', codeService_0515, dy_onchange);

                        setDisable();
                        var ids = e.added.id;
                        if (khxxArray[ids] == null || khxxArray[ids] == "")
                        {
                            controlObj.singledropdownlist('detail_f_singledropdownlist_old_tbl_ld_xxbgnr_modallist', '');
                        }
                        else
                        {

                            controlObj.singledropdownlistid('detail_f_singledropdowngroup_dy_old_tbl_ld_xxbgnr_modallist', khxxArray[ids + "id"]);

                            controlObj.singledropdownlistid('detail_f_singledropdowngroup_sc_old_tbl_ld_xxbgnr_modallist', khxxArray.f_scid);
                            controlObj.singledropdownlistid('detail_f_singledropdowngroup_qy_old_tbl_ld_xxbgnr_modallist', khxxArray.f_qyid);
                            controlObj.singledropdownlistid('detail_f_singledropdowngroup_pq_old_tbl_ld_xxbgnr_modallist', khxxArray.f_pqid);
                            controlObj.singledropdownlistid('detail_f_singledropdowngroup_dy_new_tbl_ld_xxbgnr_modallist', khxxArray[ids + "id"]);
                            controlObj.singledropdownlistid('detail_f_singledropdowngroup_sc_new_tbl_ld_xxbgnr_modallist', khxxArray.f_scid);
                            controlObj.singledropdownlistid('detail_f_singledropdowngroup_qy_new_tbl_ld_xxbgnr_modallist', khxxArray.f_qyid);
                            controlObj.singledropdownlistid('detail_f_singledropdowngroup_pq_new_tbl_ld_xxbgnr_modallist', khxxArray.f_pqid);
                        }

                        $('.aa').addClass('hidden');
                        $('#detail_f_singledropdowngroup_dy_old_tbl_ld_xxbgnr_modallist').parent().parent().parent().removeClass('hidden')
                        $('#detail_f_singledropdowngroup_dy_new_tbl_ld_xxbgnr_modallist').parent().parent().parent().removeClass('hidden')


                        break;

                };
                controlObj.text('detail_f_tablename_tbl_ld_xxbgnr_modallist', "tbl_ld_khb^tbl_ld_yhb");
                break;
                //客户
            case "cbbh":
                switch (e.added.control)
                {

                    case "singledropdownlist":
                        clearControl();

                        switch (e.added.codetype)
                        {
                            case "code":
                                var code = e.added.codecontent
                                var codeService = _baseCodeHashMap.get(code);
                                controlObj.singledropdownlist('detail_f_singledropdownlist_old_tbl_ld_xxbgnr_modallist', '', null);

                                controlObj.singledropdownlistinit('detail_f_singledropdownlist_old_tbl_ld_xxbgnr_modallist', codeService, null);
                                controlObj.singledropdownlistinit('detail_f_singledropdownlist_new_tbl_ld_xxbgnr_modallist', codeService, null);
                                break;
                            case "sql":

                                var code = e.added.codecontent
                                var sql = _baseCodeHashMap.get(code);
                                controlObj.singledropdownlist('detail_f_singledropdownlist_old_tbl_ld_xxbgnr_modallist', '', null);

                                controlObj.singledropdownlistinit('detail_f_singledropdownlist_old_tbl_ld_xxbgnr_modallist', sql, null);
                                controlObj.singledropdownlistinit('detail_f_singledropdownlist_new_tbl_ld_xxbgnr_modallist', sql, cbbh_onchange);


                                break;
                        }
                        setDisable();
                        var ids = e.added.id;
                        if (khxxArray[ids] == null || khxxArray[ids] == "")
                        {
                            controlObj.singledropdownlistid('detail_f_singledropdownlist_old_tbl_ld_xxbgnr_modallist', '');
                        }
                        else
                        {
                            controlObj.singledropdownlistid('detail_f_singledropdownlist_old_tbl_ld_xxbgnr_modallist', khxxArray[ids + "id"]);
                            controlObj.singledropdownlistid('detail_f_singledropdownlist_new_tbl_ld_xxbgnr_modallist', khxxArray[ids + "id"]);
                        }

                        $($('#div_detail_f_singledropdownlist_old_tbl_ld_xxbgnr_modallist').children()[1]).text(name);

                        $('.aa').addClass('hidden');
                        $('#div_detail_f_singledropdownlist_old_tbl_ld_xxbgnr_modallist').parent().parent().removeClass('hidden')

                        break;

                };
                controlObj.text('detail_f_tablename_tbl_ld_xxbgnr_modallist', "tbl_ld_khb");
                break;

        }

    },


    /* 
            *  
            *  方法:f_singledropdowngroup_dy_old_onchange
            *  参数:changeEventParameter
            *  singledropdowngrouponchange事件
            */
    dy_onchange = function (e, callbackfunction)
    {
        if (e.added != undefined)
        {

            var nodeid = e.added.id;
            var controlid = e.target.id;
            switch (controlid)
            {
                case "detail_f_singledropdowngroup_dy_old_tbl_ld_xxbgnr_modallist":
                    getArea(nodeid, {
                        success: function (jsonArray)
                        {

                            controlObj.singledropdownlistinit('detail_f_singledropdowngroup_sc_old_tbl_ld_xxbgnr_modallist', jsonArray, dy_onchange);
                            controlObj.singledropdownlistid('detail_f_singledropdowngroup_sc_old_tbl_ld_xxbgnr_modallist', '-1');
                            controlObj.singledropdownlist('detail_f_singledropdowngroup_sc_old_tbl_ld_xxbgnr_modallist', '');


                            if (callbackfunction != undefined)
                            {
                                callbackfunction.success();
                            }
                            else
                            {
                                controlObj.singledropdownlistinit('detail_f_singledropdowngroup_qy_old_tbl_ld_xxbgnr_modallist', _baseCodeHashMap.get('codeservice_0514'), dy_onchange);
                                controlObj.singledropdownlistid('detail_f_singledropdowngroup_qy_old_tbl_ld_xxbgnr_modallist', '-1');
                                controlObj.singledropdownlist('detail_f_singledropdowngroup_qy_old_tbl_ld_xxbgnr_modallist', '');

                                controlObj.singledropdownlistinit('detail_f_singledropdowngroup_pq_old_tbl_ld_xxbgnr_modallist', _baseCodeHashMap.get('codeservice_0515'), dy_onchange);
                                controlObj.singledropdownlistid('detail_f_singledropdowngroup_pq_old_tbl_ld_xxbgnr_modallist', '-1');
                                controlObj.singledropdownlist('detail_f_singledropdowngroup_pq_old_tbl_ld_xxbgnr_modallist', '');

                            }
                        }
                    })
                    break;
                case "detail_f_singledropdowngroup_sc_old_tbl_ld_xxbgnr_modallist":
                    if (e.added != undefined)
                    {
                        var nodeid = e.added.id;
                        getArea(nodeid, {
                            success: function (jsonArray)
                            {

                                controlObj.singledropdownlistinit('detail_f_singledropdowngroup_qy_old_tbl_ld_xxbgnr_modallist', jsonArray, dy_onchange);
                                controlObj.singledropdownlistid('detail_f_singledropdowngroup_qy_old_tbl_ld_xxbgnr_modallist', '-1');
                                controlObj.singledropdownlist('detail_f_singledropdowngroup_qy_old_tbl_ld_xxbgnr_modallist', '');
                                if (callbackfunction != undefined)
                                {
                                    callbackfunction.success();
                                }
                                else
                                {


                                    controlObj.singledropdownlistinit('detail_f_singledropdowngroup_pq_old_tbl_ld_xxbgnr_modallist', _baseCodeHashMap.get('codeservice_0515'), dy_onchange);
                                    controlObj.singledropdownlistid('detail_f_singledropdowngroup_pq_old_tbl_ld_xxbgnr_modallist', '-1');
                                    controlObj.singledropdownlist('detail_f_singledropdowngroup_pq_old_tbl_ld_xxbgnr_modallist', '');
                                }
                            }
                        })
                    }
                    else
                    {
                        controlObj.singledropdownlistinit('detail_f_singledropdowngroup_qy_old_tbl_ld_xxbgnr_modallist', _baseCodeHashMap.get('codeservice_0514'), f_singledropdowngroup_qy_old_onchange);
                        controlObj.singledropdownlistid('detail_f_singledropdowngroup_qy_old_tbl_ld_xxbgnr_modallist', '-1');
                        controlObj.singledropdownlist('detail_f_singledropdowngroup_qy_old_tbl_ld_xxbgnr_modallist', '');

                        controlObj.singledropdownlistinit('detail_f_singledropdowngroup_pq_old_tbl_ld_xxbgnr_modallist', _baseCodeHashMap.get('codeservice_0515'), f_singledropdowngroup_pq_old_onchange);
                        controlObj.singledropdownlistid('detail_f_singledropdowngroup_pq_old_tbl_ld_xxbgnr_modallist', '-1');
                        controlObj.singledropdownlist('detail_f_singledropdowngroup_pq_old_tbl_ld_xxbgnr_modallist', '');
                    }
                    break;
                case "detail_f_singledropdowngroup_qy_old_tbl_ld_xxbgnr_modallist":
                    if (e.added != undefined)
                    {
                        var nodeid = e.added.id;
                        // // 
                        getArea(nodeid, {
                            success: function (jsonArray)
                            {

                                controlObj.singledropdownlistinit('detail_f_singledropdowngroup_pq_old_tbl_ld_xxbgnr_modallist', jsonArray, dy_onchange);
                                controlObj.singledropdownlistid('detail_f_singledropdowngroup_pq_old_tbl_ld_xxbgnr_modallist', '-1');
                                controlObj.singledropdownlist('detail_f_singledropdowngroup_pq_old_tbl_ld_xxbgnr_modallist', '');
                                if (callbackfunction != undefined)
                                {
                                    callbackfunction.success();
                                }
                            }
                        })
                    }
                    else
                    {
                        // // 
                        controlObj.singledropdownlistinit('detail_f_singledropdowngroup_pq_old_tbl_ld_xxbgnr_modallist', _baseCodeHashMap.get('codeservice_0515'), dy_onchange);
                        controlObj.singledropdownlistid('detail_f_singledropdowngroup_pq_old_tbl_ld_xxbgnr_modallist', '-1');
                        controlObj.singledropdownlist('detail_f_singledropdowngroup_pq_old_tbl_ld_xxbgnr_modallist', '');
                    }
                    break;
                case "detail_f_singledropdowngroup_pq_old_tbl_ld_xxbgnr_modallist":
                    var controlid = e.target.id;
                    break;
                case "detail_f_singledropdowngroup_dy_new_tbl_ld_xxbgnr_modallist":
                    getArea(nodeid, {
                        success: function (jsonArray)
                        {

                            controlObj.singledropdownlistinit('detail_f_singledropdowngroup_sc_new_tbl_ld_xxbgnr_modallist', jsonArray, dy_onchange);
                            controlObj.singledropdownlistid('detail_f_singledropdowngroup_sc_new_tbl_ld_xxbgnr_modallist', '-1');
                            controlObj.singledropdownlist('detail_f_singledropdowngroup_sc_new_tbl_ld_xxbgnr_modallist', '');


                            if (callbackfunction != undefined)
                            {
                                callbackfunction.success();
                            }
                            else
                            {
                                controlObj.singledropdownlistinit('detail_f_singledropdowngroup_qy_new_tbl_ld_xxbgnr_modallist', _baseCodeHashMap.get('codeservice_0514'), dy_onchange);
                                controlObj.singledropdownlistid('detail_f_singledropdowngroup_qy_new_tbl_ld_xxbgnr_modallist', '-1');
                                controlObj.singledropdownlist('detail_f_singledropdowngroup_qy_new_tbl_ld_xxbgnr_modallist', '');

                                controlObj.singledropdownlistinit('detail_f_singledropdowngroup_pq_new_tbl_ld_xxbgnr_modallist', _baseCodeHashMap.get('codeservice_0515'), dy_onchange);
                                controlObj.singledropdownlistid('detail_f_singledropdowngroup_pq_new_tbl_ld_xxbgnr_modallist', '-1');
                                controlObj.singledropdownlist('detail_f_singledropdowngroup_pq_new_tbl_ld_xxbgnr_modallist', '');

                            }
                        }
                    })
                    break;
                case "detail_f_singledropdowngroup_sc_new_tbl_ld_xxbgnr_modallist":
                    if (e.added != undefined)
                    {
                        var nodeid = e.added.id;
                        getArea(nodeid, {
                            success: function (jsonArray)
                            {

                                controlObj.singledropdownlistinit('detail_f_singledropdowngroup_qy_new_tbl_ld_xxbgnr_modallist', jsonArray, dy_onchange);
                                controlObj.singledropdownlistid('detail_f_singledropdowngroup_qy_new_tbl_ld_xxbgnr_modallist', '-1');
                                controlObj.singledropdownlist('detail_f_singledropdowngroup_qy_new_tbl_ld_xxbgnr_modallist', '');
                                if (callbackfunction != undefined)
                                {
                                    callbackfunction.success();
                                }
                                else
                                {


                                    controlObj.singledropdownlistinit('detail_f_singledropdowngroup_pq_new_tbl_ld_xxbgnr_modallist', _baseCodeHashMap.get('codeservice_0515'), dy_onchange);
                                    controlObj.singledropdownlistid('detail_f_singledropdowngroup_pq_new_tbl_ld_xxbgnr_modallist', '-1');
                                    controlObj.singledropdownlist('detail_f_singledropdowngroup_pq_new_tbl_ld_xxbgnr_modallist', '');
                                }
                            }
                        })
                    }
                    else
                    {
                        controlObj.singledropdownlistinit('detail_f_singledropdowngroup_qy_new_tbl_ld_xxbgnr_modallist', _baseCodeHashMap.get('codeservice_0514'), f_singledropdowngroup_qy_new_onchange);
                        controlObj.singledropdownlistid('detail_f_singledropdowngroup_qy_new_tbl_ld_xxbgnr_modallist', '-1');
                        controlObj.singledropdownlist('detail_f_singledropdowngroup_qy_new_tbl_ld_xxbgnr_modallist', '');

                        controlObj.singledropdownlistinit('detail_f_singledropdowngroup_pq_new_tbl_ld_xxbgnr_modallist', _baseCodeHashMap.get('codeservice_0515'), f_singledropdowngroup_pq_new_onchange);
                        controlObj.singledropdownlistid('detail_f_singledropdowngroup_pq_new_tbl_ld_xxbgnr_modallist', '-1');
                        controlObj.singledropdownlist('detail_f_singledropdowngroup_pq_new_tbl_ld_xxbgnr_modallist', '');
                    }
                    break;
                case "detail_f_singledropdowngroup_qy_new_tbl_ld_xxbgnr_modallist":
                    if (e.added != undefined)
                    {
                        var nodeid = e.added.id;
                        // // 
                        getArea(nodeid, {
                            success: function (jsonArray)
                            {

                                controlObj.singledropdownlistinit('detail_f_singledropdowngroup_pq_new_tbl_ld_xxbgnr_modallist', jsonArray, dy_onchange);
                                controlObj.singledropdownlistid('detail_f_singledropdowngroup_pq_new_tbl_ld_xxbgnr_modallist', '-1');
                                controlObj.singledropdownlist('detail_f_singledropdowngroup_pq_new_tbl_ld_xxbgnr_modallist', '');
                                if (callbackfunction != undefined)
                                {
                                    callbackfunction.success();
                                }
                            }
                        })
                    }
                    else
                    {
                        // // 
                        controlObj.singledropdownlistinit('detail_f_singledropdowngroup_pq_new_tbl_ld_xxbgnr_modallist', _baseCodeHashMap.get('codeservice_0515'), dy_onchange);
                        controlObj.singledropdownlistid('detail_f_singledropdowngroup_pq_new_tbl_ld_xxbgnr_modallist', '-1');
                        controlObj.singledropdownlist('detail_f_singledropdowngroup_pq_new_tbl_ld_xxbgnr_modallist', '');
                    }
                    break;
                case "detail_f_singledropdowngroup_pq_new_tbl_ld_xxbgnr_modallist":
                    var controlid = e.target.id;
                    break;
            }

        }
        else
        {
            controlObj.singledropdownlistinit('detail_f_singledropdowngroup_sc_new_tbl_ld_xxbgnr_modallist', _baseCodeHashMap.get('codeservice_0513'), dy_onchange);
            controlObj.singledropdownlistid('detail_f_singledropdowngroup_sc_new_tbl_ld_xxbgnr_modallist', '-1');
            controlObj.singledropdownlist('detail_f_singledropdowngroup_sc_new_tbl_ld_xxbgnr_modallist', '');


            controlObj.singledropdownlistinit('detail_f_singledropdowngroup_qy_new_tbl_ld_xxbgnr_modallist', _baseCodeHashMap.get('codeservice_0514'), dy_onchange);
            controlObj.singledropdownlistid('detail_f_singledropdowngroup_qy_new_tbl_ld_xxbgnr_modallist', '-1');
            controlObj.singledropdownlist('detail_f_singledropdowngroup_qy_new_tbl_ld_xxbgnr_modallist', '');

            controlObj.singledropdownlistinit('detail_f_singledropdowngroup_pq_new_tbl_ld_xxbgnr_modallist', _baseCodeHashMap.get('codeservice_0515'), dy_onchange);
            controlObj.singledropdownlistid('detail_f_singledropdowngroup_pq_new_tbl_ld_xxbgnr_modallist', '-1');
            controlObj.singledropdownlist('detail_f_singledropdowngroup_pq_new_tbl_ld_xxbgnr_modallist', '');
        }

    },

    cbbh_onchange = function (e, callbackfunction)
    {

        //var khxxArray = tbl_ld_xxbg_detail_Obj._khJson["khxx"];
        controlObj.text('detail_f_cbyxm_new_tbl_ld_xxbgnr_modallist', e.added.f_cbymc);
        controlObj.text('detail_f_cbyid_new_tbl_ld_xxbgnr_modallist', e.added.f_cbyid);
        controlObj.text('detail_f_cbzq_new_tbl_ld_xxbgnr_modallist', e.added.f_cbzq);
    },

    getArea = function (id, callbackFunction)
    {
        // // 
        var sqlString = '';
        sqlString += "select sys_id as id, f_mc as text ";
        sqlString += "from tbl_ldbm_dycq  ";
        sqlString += "where sys_delflag = '0' ";
        sqlString += "and f_ztid = '0' ";
        sqlString += "and length(sys_orderid) =  ";
        sqlString += "    (select length(sys_orderid) + 4 from tbl_ldbm_dycq where sys_id = '" + id + "') ";
        sqlString += "and sys_orderid like ";
        sqlString += "    (select sys_orderid || '%' from tbl_ldbm_dycq where sys_id = '" + id + "') ";
        sqlString += "order by sys_orderid ";
        var sqlJson = {

            "tbl_ldbm_dycq": sqlString
        }

        commonObj.querySqls(sqlJson, {
            success: function (messageJson)
            {

                callbackFunction.success(messageJson["tbl_ldbm_dycq"]);

            },
            fail: function (message)
            {
            }
        })
    },

    //获取指定月份的最后一天
    getLastDay = function (year, month)
    {
        var new_year = year;  //取当前的年份   
        var new_month = month++;//取下一个月的第一天，方便计算（最后一天不固定）   
        if (month > 12)      //如果当前大于12月，则年份转到下一年   
        {
            new_month -= 12;    //月份减   
            new_year++;      //年份增   
        }
        var new_date = new Date(new_year, new_month, 1);        //取当年当月中的第一天
        var ccc = (new Date(new_date.getTime() - 1000 * 60 * 60 * 24)).getDate();
        return (new Date(new_date.getTime() - 1000 * 60 * 60 * 24)).getDate();//获取当月最后一天日期   
    },
   
    end = function () { };

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
        _pr_fk_tbl_ld_xxbg_sys_id: '',
        _pr_pagetype: 1,
        //变更类型id
        _pr_bglxid: '',
        _pr_count : null,
        //=================================================================================
        //                                      公有方法 
        //=================================================================================

        init: function (callBackFunction)
        {
            try
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
                                        bindGrid(false, {
                                            success: function ()
                                            {
                                                _validateMessage_search = new validateMessage('btn_search_modal_search_tbl_ld_xxbgnr_modallist');
                                                _validateMessage_detail = new validateMessage('btn_detail_modal_save_tbl_ld_xxbgnr_modallist');
                                                _ladda_btn_command_new = Ladda.create('btn_command_new_tbl_ld_xxbgnr_modallist');
                                                _ladda_btn_command_delete = Ladda.create('btn_command_delete_tbl_ld_xxbgnr_modallist');

                                                callBackFunction.success();
                                            },
                                            fail: function (message)
                                            {
                                                _blockMessage.show('bindGrid执行失败<br/>' + message, 'fail');
                                            }
                                        });
                                    }
                                });
                            }
                        });


                        initBaseCode({
                            success: function ()
                            {


                                initDetailControl({
                                    success: function ()
                                    {
                                        switch (that._pr_listtype)
                                        {
                                            case "1":
                                                setDisable(false);
                                                break;
                                            case "2":
                                                setDisable(true);
                                                break;
                                        }
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

 
        //---------------------------------------------------------------------------------
        // ---------------------------------按钮------------------------------------------
        //---------------------------------------------------------------------------------
        /* 
        *  
        *  方法:btn_command_new_onclick
        *  参数:
        *  新建数据并打开DetailModel
        */
        btn_command_new_onclick: function ()
        {

            _ladda_btn_command_new.start();
            if (tbl_ld_xxbg_detail_Obj._khbh == "" || tbl_ld_xxbg_detail_Obj._khbh == null)
            {
                _alertMessage.show('请选择客户!', 'warning', 1000);
                _ladda_btn_command_new.stop();
            }
            else
            {
            addDetailData({
                success: function ()
                {
                    _ladda_btn_command_new.stop();

                }, fail: function (message)
                {
                    _ladda_btn_command_new.stop();
                    _alertMessage.show('addDetailData执行失败', 'fail');
                    _resultMessage.show(message);
                }
            });
            }
        },

        /* 
        *  
        *  方法:btn_command_delete_onclick
        *  参数:
        *  删除选定的本页数据和其他页数据，重新绑定Grid，如果当前页已经没有数据了，则跳转到符合查询条件的第一页数据
        */
        btn_command_delete_onclick: function ()
        {
            var allcount = that._pr_gridselectids.split('^').length;
            if (that._pr_gridselectids == '')
            {
                _alertMessage.show('至少选择一条数据!', 'warning', 1000);
            }
            else
            {
                var currentcount = $('#table_grid_tbl_ld_xxbgnr_modallist').bootstrapTable('getSelections').length;
                var outercount = allcount - currentcount;
                var confirmContent = '<blockquote> ';
                confirmContent += '<h3>将对被选中的全部数据<a style="color:red">' + allcount + '</a>条进行<a style="color:red">删除</a></h3>';
                confirmContent += '其中<br/>';
                confirmContent += '<h5><a style="color:red">当前页</a>的数据<a style="color:red">' + currentcount + '</a>条<h5>';
                confirmContent += '<h5><a style="color:red">其他页</a>的数据<a style="color:red">' + outercount + '</a>条<h5>';
                confirmContent += '</blockquote> ';
                _confirmMessage.destory();
                _confirmMessage.show('删除确认？', confirmContent,
                {
                    confirm: function ()
                    {
                        _ladda_btn_command_delete.start();

                        var whereClause = "sys_id in (\'" + that._pr_gridselectids.toString().replaceAll("^", "\',\'") + "\')";

                        var data = {
                            clientInf: _clientInf,
                            whereString: whereClause
                        };

                        doAjaxFunction(_serviceUrl, 'Delete', data, {
                            success: function (result)
                            {
                                var data = {
                                    clientInf: _clientInf,
                                    whereString: _whereClauseString
                                };
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
                                        bindGrid(true, {
                                            success: function ()
                                            {
                                                _ladda_btn_command_delete.stop();
                                            }, fail: function (message)
                                            {
                                                _ladda_btn_command_delete.stop();
                                                _alertMessage.show('绑定失败', 'fail');
                                                _resultMessage.show(message);
                                            }
                                        });

                                    },
                                    fail: function (message)
                                    {
                                        _ladda_btn_command_delete.stop();
                                        _alertMessage.show('数据删除完成，获取数据条数失败', 'fail');
                                        _resultMessage.show(message);
                                    }
                                });
                            },
                            fail: function (message)
                            {
                                _ladda_btn_command_delete.stop();
                                _alertMessage.show('数据删除失败', 'fail');
                                _resultMessage.show(message);
                            }
                        });
                    },
                    cancle: function ()
                    {

                    }
                });
            }
        },

        /* 
        *  
        *  方法:btn_command_clearselect_onclick
        *  参数:
        *  清空选择内容
        *  
        */
        btn_command_clearselect_onclick: function ()
        {
            $('#table_grid_tbl_ld_xxbgnr_modallist').bootstrapTable('uncheckAll');
            that._pr_gridselectids = '';
            gridSelectedChange();
        },






        //---------------------------------------------------------------------------------
        // ---------------------------------DetailModel------------------------------------
        //---------------------------------------------------------------------------------

        /* 
        *  
        *  方法:btn_detail_modal_save_onclick
        *  参数:
        *  detailModel保存操作
        *  
        */
        btn_detail_modal_save_onclick: function ()
        {
            getDetailModel({
                success: function (tbl_ld_xxbgnr_modallist)
                {
                    checkDetailModel(tbl_ld_xxbgnr_modallist, {
                        success: function (tbl_ld_xxbgnr_modallist)
                        {

                            //拿到sql语句
                            getSqlString(tbl_ld_xxbgnr_modallist, {
                                success: function (sqlString)
                                {
                                    switch (sqlString)
                                    {
                                       
                                        case "-1":
                                            break;
                                        case "-2":
                                            break;
                                        case "-3":
                                            break;
                                        default:
                                            {
                                                var tablename = controlObj.text('detail_f_tablename_tbl_ld_xxbgnr_modallist');
                                                tbl_ld_xxbgnr_modallist.f_value9 = tablename;
                                                tbl_ld_xxbgnr_modallist.f_value10 = sqlString;
                                                updateDetailData(tbl_ld_xxbgnr_modallist, {
                                                    success: function (tbl_ld_xxbgnr_modallist)
                        {
                            clearDetailModel(tbl_ld_xxbgnr_modallist);
                            $('#div_detail_modal_tbl_ld_xxbgnr_modallist').modal('hide')
                            bindGrid(false, {
                                success: function ()
                                {
                                }, fail: function (message)
                                {
                                    _alertMessage.show('绑定失败', 'fail');
                                    _resultMessage.show(message);
                                }
                            });
                                                    },
                                                    fail: function (message)
                                                    {
                                                        _alertMessage.show('数据更新失败', 'fail');
                                                        _resultMessage.show(message);
                                                    }
                                                });
                                            }
                                            break;
                                    }
                                },
                                fail: function (message)
                                {
                                    if (message != '')
                                    {
                                        _alertMessage.show('校验失败', 'fail');
                                        _resultMessage.show(message);
                                    }
                                    else
                                    {
                                        _alertMessage.show('校验未通过', 'warning');
                                    }
                                }
                            });

                        },
                        fail: function (message)
                        {
                            if (message != '')
                            {
                                _alertMessage.show('校验失败', 'fail');
                                _resultMessage.show(message);
                            }
                            else
                            {
                                _alertMessage.show('校验未通过', 'warning');
                            }
                        }
                    });
                }, fail: function (message)
                {
                    _alertMessage.show('数据获取失败', 'warning');
                    _resultMessage.show(message);
                }
            });
        },

        /* 
        *  
        *  方法:btn_detail_modal_cancle_onclick
        *  参数:
        *  detailModel关闭操作
        *  
        */
        btn_detail_modal_cancle_onclick: function ()
        {
            $('#div_detail_modal_tbl_ld_xxbgnr_modallist').modal('hide');
            _validateMessage_detail.hidden();

        },
        end: function ()
        {
        }
    };
    return that;
})();






