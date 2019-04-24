
var tbl_ld_dyhlh_detail_Obj = (function ()
{
    'use strict';

    //=================================================================================
    //                                      私有
    //=================================================================================

    //=================================================================================
    //                                      私有属性 
    //=================================================================================
    var _serviceUrl = '//127.0.0.1/sara.dd.ldsw/service/service_tbl_ld_dyhlh.asmx/',
    _baseCodeHashMap = null,
    _validateMessage = null,
    _ladda_btn_command_save = null,

    //=================================================================================
    //                                      私有方法 
    //=================================================================================

    /* 
    *  
    *  方法:initBaseCode
    *  参数:callbackFunction
    *  初始化code内容，存储在_baseCodeHashMap
    */
    initBaseCode = function (callBackFunction)
    {
        var codeServiceId = '';
        //客户分组状态
        codeServiceId += "0522^";
        //客户表_状态
        codeServiceId += "0556^";
        //购水类型
        codeServiceId += "0799^";
        //用水类别
        codeServiceId += "0555^";
        //用户分组_状态
        //用户表_状态
        codeServiceId += "0516^";
        //托收银行
        codeServiceId += "0592^";
        //水表表_状态
        codeServiceId += "0526^";
        //水表口径
        codeServiceId += "0523^";
        //水表类型
        codeServiceId += "0524^";
        //计量类型
        codeServiceId += "0525^";
        //流程状态
        codeServiceId += "0818^";

        codeServiceId += "0624^";

        codeServiceId += "0625^";

        codeServiceId += "0626^";

 

        codeServiceId += "0628^";

        codeServiceId += "0629^";

        codeServiceId += "0630^";

        codeServiceId += "0631^";

        codeServiceId += "0632^";

        codeServiceId += "0633^";

        codeServiceId += "0634^";

        codeServiceId += "0635^";

        codeServiceId += "0636^";

        codeServiceId += "0637^";

        codeServiceId += "0638^";

        codeServiceId += "0639^";

        codeServiceId += "0640^";

        codeServiceId = codeServiceId.trimEnd('^');
        commonObj.getCodeServiceJson(codeServiceId, {
            success: function (resultArray)
            {
                try
                {
                    _baseCodeHashMap = new hashMap();

                    var codenull = [];
                    _baseCodeHashMap.put('codeservice_0513', codenull);
                    _baseCodeHashMap.put('codeservice_0514', codenull);
                    _baseCodeHashMap.put('codeservice_0515', codenull);
                    //_baseCodeHashMap.put('codeservice_0500', resultArray['0500']);

                    _baseCodeHashMap.put('codeservice_0522', resultArray['0522']);
                    _baseCodeHashMap.put('codeservice_0555', resultArray['0555']);

                    _baseCodeHashMap.put('codeservice_0556', resultArray['0556']);

                    _baseCodeHashMap.put('codeservice_0799', resultArray['0799']);

                    //_baseCodeHashMap.put('codeservice_0503', resultArray['0503']); 

                    _baseCodeHashMap.put('codeservice_0523', resultArray['0523']);

                    _baseCodeHashMap.put('codeservice_0516', resultArray['0516']);

                    _baseCodeHashMap.put('codeservice_0592', resultArray['0592']);

                    _baseCodeHashMap.put('codeservice_0526', resultArray['0526']);

                    _baseCodeHashMap.put('codeservice_0524', resultArray['0524']);

                    _baseCodeHashMap.put('codeservice_0525', resultArray['0525']);

                    _baseCodeHashMap.put('codeservice_0818', resultArray['0818']);

                    _baseCodeHashMap.put('codeservice_0624', resultArray['0624']);

                    _baseCodeHashMap.put('codeservice_0625', resultArray['0625']);

                    _baseCodeHashMap.put('codeservice_0626', resultArray['0626']);

                    //_baseCodeHashMap.put('codeservice_0627', resultArray['0627']);

                    _baseCodeHashMap.put('codeservice_0628', resultArray['0628']);

                    _baseCodeHashMap.put('codeservice_0629', resultArray['0629']);

                    _baseCodeHashMap.put('codeservice_0630', resultArray['0630']);

                    _baseCodeHashMap.put('codeservice_0631', resultArray['0631']);

                    _baseCodeHashMap.put('codeservice_0632', resultArray['0632']);

                    _baseCodeHashMap.put('codeservice_0633', resultArray['0633']);

                    _baseCodeHashMap.put('codeservice_0634', resultArray['0634']);

                    _baseCodeHashMap.put('codeservice_0635', resultArray['0635']);

                    _baseCodeHashMap.put('codeservice_0636', resultArray['0636']);

                    _baseCodeHashMap.put('codeservice_0637', resultArray['0637']);

                    _baseCodeHashMap.put('codeservice_0638', resultArray['0638']);

                    _baseCodeHashMap.put('codeservice_0639', resultArray['0639']);

                    _baseCodeHashMap.put('codeservice_0640', resultArray['0640']);

                    //获取用水类型、抄本编号数据作为code下拉选项
                    var sqlStringsJson = {
                        "tbl_ld_cben": "select sys_id as id,f_cbbh as text,f_cbymc,f_cbyid,f_cbzq,f_cbmc ,decode(f_ztid,'0','false','true') as disabled from tbl_ld_cben order by f_cbbh",
                        "tbl_ldbm_khfz": "select sys_id as id,f_fzmc as text,decode(f_ztid,'0','false','true') as disabled from tbl_ldbm_khfz where sys_delflag='0'  order by sys_id",
                        "tbl_ldbm_yhfz": "select sys_id as id,f_fzmc as text,decode(f_ztid,'0','false','true') as disabled from tbl_ldbm_yhfz where sys_delflag='0'  order by sys_id",
                        "tbl_ldbm_dycq": "select sys_id as id, f_mc as text ,sys_orderid as nodeid ,decode(f_ztid,'0','false','true') as disabled from tbl_ldbm_dycq where sys_delflag='0'and length(sys_orderid)=4 order by sys_orderid",
                        "tbl_ldbm_sbfz": "select sys_id as id, f_fzmc as text,decode(f_ztid,'0','false','true') as disabled from tbl_ldbm_sbfz where sys_delflag='0'  order by sys_id",
                    };

                    commonObj.querySqls(sqlStringsJson, {
                        success: function (resultJson)
                        {

                            $.each(resultJson["tbl_ldbm_khfz"], function (i, u)
                            {
                                if (resultJson["tbl_ldbm_khfz"][i]["disabled"] == "true")
                                {
                                    resultJson["tbl_ldbm_khfz"][i]["disabled"] = true;
                                }
                                else
                                {
                                    resultJson["tbl_ldbm_khfz"][i]["disabled"] = false;
                                }
                            });
                            $.each(resultJson["tbl_ld_cben"], function (i, u)
                            {
                                if (resultJson["tbl_ld_cben"][i]["disabled"] == "true")
                                {
                                    resultJson["tbl_ld_cben"][i]["disabled"] = true;
                                }
                                else
                                {
                                    resultJson["tbl_ld_cben"][i]["disabled"] = false;
                                }
                            });
                            $.each(resultJson["tbl_ldbm_dycq"], function (i, u)
                            {
                                if (resultJson["tbl_ldbm_dycq"][i]["disabled"] == "true")
                                {
                                    resultJson["tbl_ldbm_dycq"][i]["disabled"] = true;
                                }
                                else
                                {
                                    resultJson["tbl_ldbm_dycq"][i]["disabled"] = false;
                                }
                            });
                            $.each(resultJson["tbl_ldbm_sbfz"], function (i, u)
                            {
                                if (resultJson["tbl_ldbm_sbfz"][i]["disabled"] == "true")
                                {
                                    resultJson["tbl_ldbm_sbfz"][i]["disabled"] = true;
                                }
                                else
                                {
                                    resultJson["tbl_ldbm_sbfz"][i]["disabled"] = false;
                                }
                            });
                            _baseCodeHashMap.put('codeservice_0522', resultJson["tbl_ldbm_sbfz"]);
                            _baseCodeHashMap.put('codeservice_cben', resultJson["tbl_ld_cben"]);
                            _baseCodeHashMap.put('codeservice_khfz', resultJson["tbl_ldbm_khfz"]);
                            _baseCodeHashMap.put('codeservice_yhfz', resultJson["tbl_ldbm_yhfz"]);
                            _baseCodeHashMap.put('codeservice_0512', resultJson["tbl_ldbm_dycq"]);


                            callBackFunction.success();
                        }
                    });
                }
                catch (ex)
                {
                    _blockMessage.show('initBaseCode执行失败<br/>' + ex.message, 'fail');
                }
            }
        });

    },

    /* 
    *  
    *  方法:initControl
    *  参数:callbackFunction
    *  初始化控件，会使用到_baseCodeHashMap
    */
    initControl = function (callBackFunction)
    {
        try
        {
            var codeService_0512 = _baseCodeHashMap.get('codeservice_0512');

            var codeService_0513 = _baseCodeHashMap.get('codeservice_0513');

            var codeService_0514 = _baseCodeHashMap.get('codeservice_0514');

            var codeService_0522 = _baseCodeHashMap.get('codeservice_0522');

            var codeService_0515 = _baseCodeHashMap.get('codeservice_0515');

            var codeService_khfz = _baseCodeHashMap.get('codeservice_khfz');
            var codeService_0556 = _baseCodeHashMap.get('codeservice_0556');

            var codeService_0555 = _baseCodeHashMap.get('codeservice_0555');

            var codeService_0799 = _baseCodeHashMap.get('codeservice_0799');

            var codeService_yhfz = _baseCodeHashMap.get('codeservice_yhfz');

            var codeService_0516 = _baseCodeHashMap.get('codeservice_0516');

            var codeService_0592 = _baseCodeHashMap.get('codeservice_0592');

            var codeService_0526 = _baseCodeHashMap.get('codeservice_0526');

            var codeService_0524 = _baseCodeHashMap.get('codeservice_0524');

            var codeService_0523 = _baseCodeHashMap.get('codeservice_0523');

            var codeService_0525 = _baseCodeHashMap.get('codeservice_0525');

            var codeService_0818 = _baseCodeHashMap.get('codeservice_0818');

            var codeService_0624 = _baseCodeHashMap.get('codeservice_0624');

            var codeService_0625 = _baseCodeHashMap.get('codeservice_0625');

            var codeService_0626 = _baseCodeHashMap.get('codeservice_0626');

            var codeService_cben = _baseCodeHashMap.get('codeservice_cben');

            var codeService_0628 = _baseCodeHashMap.get('codeservice_0628');

            var codeService_0629 = _baseCodeHashMap.get('codeservice_0629');

            var codeService_0630 = _baseCodeHashMap.get('codeservice_0630');

            var codeService_0631 = _baseCodeHashMap.get('codeservice_0631');

            var codeService_0632 = _baseCodeHashMap.get('codeservice_0632');

            var codeService_0633 = _baseCodeHashMap.get('codeservice_0633');

            var codeService_0634 = _baseCodeHashMap.get('codeservice_0634');

            var codeService_0635 = _baseCodeHashMap.get('codeservice_0635');

            var codeService_0636 = _baseCodeHashMap.get('codeservice_0636');

            var codeService_0637 = _baseCodeHashMap.get('codeservice_0637');

            var codeService_0638 = _baseCodeHashMap.get('codeservice_0638');

            var codeService_0639 = _baseCodeHashMap.get('codeservice_0639');

            var codeService_0640 = _baseCodeHashMap.get('codeservice_0640');

            controlObj.datetimeinit('detail_f_sqsj_tbl_ld_dyhlh_detail_date', 'detail_f_sqsj_tbl_ld_dyhlh_detail_time', f_sqsj_date_onchange, f_sqsj_time_onchange);

            controlObj.datetimeinit('detail_f_czrsj_tbl_ld_dyhlh_detail_date', 'detail_f_czrsj_tbl_ld_dyhlh_detail_time', f_czrsj_date_onchange, f_czrsj_time_onchange);

            controlObj.multidropdownlistinit('detail_f_khfz_tbl_ld_dyhlh_detail', codeService_khfz, f_khfz_onchange);

            controlObj.singledropdownlistinit('detail_f_yslx_tbl_ld_dyhlh_detail', codeService_0555, f_yslx_onchange);

            controlObj.datetimeinit('detail_f_zhcbrq_tbl_ld_dyhlh_detail_date', 'detail_f_zhcbrq_tbl_ld_dyhlh_detail_time', f_zhcbrq_date_onchange, f_zhcbrq_time_onchange);

            controlObj.toggleinit('detail_f_sfjlbjf_tbl_ld_dyhlh_detail', f_sfjlbjf_onchange);

            controlObj.singledropdownlistinit('detail_f_khzt_tbl_ld_dyhlh_detail', codeService_0556, f_khzt_onchange);

            controlObj.singledropdownlistinit('detail_f_cbbh_tbl_ld_dyhlh_detail', codeService_cben, f_cbbh_onchange);

            controlObj.datetimeinit('detail_f_khrq_tbl_ld_dyhlh_detail_date', 'detail_f_khrq_tbl_ld_dyhlh_detail_time', f_khrq_date_onchange, f_khrq_time_onchange);

            controlObj.multidropdownlistinit('detail_f_yhfz_tbl_ld_dyhlh_detail', codeService_yhfz, f_yhfz_onchange);

            controlObj.singledropdownlistinit('detail_f_dy_tbl_ld_dyhlh_detail', codeService_0512, f_dy_onchange);

            controlObj.singledropdownlistinit('detail_f_sc_tbl_ld_dyhlh_detail', codeService_0513, f_sc_onchange);

            controlObj.singledropdownlistinit('detail_f_qy_tbl_ld_dyhlh_detail', codeService_0514, f_qy_onchange);

            controlObj.singledropdownlistinit('detail_f_pq_tbl_ld_dyhlh_detail', codeService_0515, f_pq_onchange);

            controlObj.toggleinit('detail_f_sfts_tbl_ld_dyhlh_detail', f_sfts_onchange);

            controlObj.singledropdownlistinit('detail_f_tsyx_tbl_ld_dyhlh_detail', codeService_0592, f_tsyx_onchange);

            controlObj.datetimeinit('detail_f_htqdrq_tbl_ld_dyhlh_detail_date', 'detail_f_htqdrq_tbl_ld_dyhlh_detail_time', f_htqdrq_date_onchange, f_htqdrq_time_onchange);

            controlObj.fileuploaderinit('detail_f_htfj_tbl_ld_dyhlh_detail', { "fileUploadExtnames": ";.txt;.sql;.doc;.docx;.xls;.xlsx;.pdf;.tif;.bmp;.jpg;.jpeg;.gif;.png;.rar;.zip;.xml;", "fileUploadCountMax": "0", "isThumbnailImgShow": true }, f_htfj_onchange);

            controlObj.fileuploaderinit('detail_f_qtfj_tbl_ld_dyhlh_detail', { "fileUploadExtnames": ";.txt;.sql;.doc;.docx;.xls;.xlsx;.pdf;.tif;.bmp;.jpg;.jpeg;.gif;.png;.rar;.zip;.xml;", "fileUploadCountMax": "0", "isThumbnailImgShow": true }, f_qtfj_onchange);

            controlObj.fileuploaderinit('detail_f_sfzfj_tbl_ld_dyhlh_detail', { "fileUploadExtnames": ";.txt;.sql;.doc;.docx;.xls;.xlsx;.pdf;.tif;.bmp;.jpg;.jpeg;.gif;.png;.rar;.zip;.xml;", "fileUploadCountMax": "0", "isThumbnailImgShow": true }, f_sfzfj_onchange);

            controlObj.toggleinit('detail_f_sfzzs_tbl_ld_dyhlh_detail', f_sfzzs_onchange);

            controlObj.singledropdownlistinit('detail_f_yhzt_tbl_ld_dyhlh_detail', codeService_0516, f_yhzt_onchange);

            controlObj.multidropdownlistinit('detail_f_sbfz_tbl_ld_dyhlh_detail', codeService_0522, f_sbfz_onchange);

            controlObj.singledropdownlistinit('detail_f_sbkj_tbl_ld_dyhlh_detail', codeService_0523, f_sbkj_onchange);

            controlObj.singledropdownlistinit('detail_f_sblx_tbl_ld_dyhlh_detail', codeService_0524, f_sblx_onchange);

            controlObj.singledropdownlistinit('detail_f_jllx_tbl_ld_dyhlh_detail', codeService_0525, f_jllx_onchange);

            controlObj.datetimeinit('detail_f_azrq_tbl_ld_dyhlh_detail_date', 'detail_f_azrq_tbl_ld_dyhlh_detail_time', f_azrq_date_onchange, f_azrq_time_onchange);

            controlObj.toggleinit('detail_f_qfzt_tbl_ld_dyhlh_detail', f_qfzt_onchange);

            controlObj.singledropdownlistinit('detail_f_sbzt_tbl_ld_dyhlh_detail', codeService_0526, f_sbzt_onchange);

            controlObj.fileuploaderinit('detail_f_sbfj_tbl_ld_dyhlh_detail', { "fileUploadExtnames": ";.txt;.sql;.doc;.docx;.xls;.xlsx;.pdf;.tif;.bmp;.jpg;.jpeg;.gif;.png;.rar;.zip;.xml;", "fileUploadCountMax": "0", "isThumbnailImgShow": true }, f_sbfj_onchange);

            controlObj.fileuploaderinit('detail_f_lcfj_tbl_ld_dyhlh_detail', { "fileUploadExtnames": ";.txt;.sql;.doc;.docx;.xls;.xlsx;.pdf;.tif;.bmp;.jpg;.jpeg;.gif;.png;.rar;.zip;.xml;", "fileUploadCountMax": "0", "isThumbnailImgShow": true }, f_lcfj_onchange);

            controlObj.singledropdownlistinit('detail_f_zt_tbl_ld_dyhlh_detail', codeService_0818, f_zt_onchange);

            callBackFunction.success();
        }
        catch (ex)
        {
            _blockMessage.show('initControl执行失败<br/>' + ex.message, 'fail');
        }
    },

    /* 
    *  
    *  方法:setDisable
    *  参数:isDisable
    *  设置页面控件状态
    */
    setDisable = function (isDisable)
    {
        try
        {
            //根据_pr_isdisplay决定是否显示
            switch (that._pr_isdisplay)
            {
                //div_command_1----------第1节点
                //div_command_2----------第3节点
                //div_command_4----------第1、3节点都需要
                //div_command_3----------第4节点（张建东）

                case "-1":
                    $('#div_command_1').removeClass('hidden');
                    $('#div_command_2').removeClass('hidden');
                    $('#div_command_4').removeClass('hidden');
                    break;
                case "1":
                    $('#div_command_1').removeClass('hidden');
                    $('#div_command_2').removeClass('hidden');
                    $('#div_command_4').removeClass('hidden');
                    break;
                    //第2节点和1节点是一样的
                case "2":
                    $('#div_command_1').removeClass('hidden');
                    $('#div_command_2').removeClass('hidden');
                    $('#div_command_4').removeClass('hidden');
                    break;
                case "4":
                    $('#div_command_1').removeClass('hidden');
                    $('#div_command_2').removeClass('hidden');
                    $('#div_command_4').removeClass('hidden');
                    $('#div_command_3').removeClass('hidden');
                    break;
                case "5":
                    break;
                default:
                    $('#div_command_1').removeClass('hidden');
                    $('#div_command_2').removeClass('hidden');
                    $('#div_command_4').removeClass('hidden');
                    $('#div_command_3').removeClass('hidden');
                    break;
            }
            controlObj.textdisable('detail_fk_tbl_maintable_sys_id_tbl_ld_dyhlh_detail', isDisable);

            controlObj.textdisable('detail_f_dyhlhbh_tbl_ld_dyhlh_detail', true);

            controlObj.textdisable('detail_f_mc_tbl_ld_dyhlh_detail', isDisable);

            controlObj.textdisable('detail_f_sqr_tbl_ld_dyhlh_detail', true);

            controlObj.textdisable('detail_f_sqrid_tbl_ld_dyhlh_detail', true);

            controlObj.datetimedisable('detail_f_sqsj_tbl_ld_dyhlh_detail_date', 'detail_f_sqsj_tbl_ld_dyhlh_detail_time', true);

            controlObj.textdisable('detail_f_czr_tbl_ld_dyhlh_detail', true);

            controlObj.textdisable('detail_f_czrid_tbl_ld_dyhlh_detail', true);

            controlObj.datetimedisable('detail_f_czrsj_tbl_ld_dyhlh_detail_date', 'detail_f_czrsj_tbl_ld_dyhlh_detail_time', true);

            controlObj.multidropdownlistdisable('detail_f_khfz_tbl_ld_dyhlh_detail', isDisable);

            controlObj.singledropdownlistdisable('detail_f_yslx_tbl_ld_dyhlh_detail', isDisable);

            controlObj.textdisable('detail_f_ycje_tbl_ld_dyhlh_detail', isDisable);

            controlObj.datetimedisable('detail_f_zhcbrq_tbl_ld_dyhlh_detail_date', 'detail_f_zhcbrq_tbl_ld_dyhlh_detail_time', isDisable);

            controlObj.textdisable('detail_f_tbbh_tbl_ld_dyhlh_detail', isDisable);

            controlObj.toggledisable('detail_f_sfjlbjf_tbl_ld_dyhlh_detail', isDisable);

            controlObj.textdisable('detail_f_tjjzsf_tbl_ld_dyhlh_detail', isDisable);

            controlObj.textdisable('detail_f_tjjzpwf_tbl_ld_dyhlh_detail', isDisable);

            controlObj.textdisable('detail_f_jhysl_tbl_ld_dyhlh_detail', isDisable);

            controlObj.textdisable('detail_f_sqysl_tbl_ld_dyhlh_detail', isDisable);

            controlObj.singledropdownlistdisable('detail_f_khzt_tbl_ld_dyhlh_detail', isDisable);

            controlObj.textdisable('detail_f_khbz_tbl_ld_dyhlh_detail', isDisable);

            controlObj.singledropdownlistdisable('detail_f_cbbh_tbl_ld_dyhlh_detail', isDisable);

            controlObj.textdisable('detail_f_cbxh_tbl_ld_dyhlh_detail', isDisable);

            controlObj.textdisable('detail_f_yhm_tbl_ld_dyhlh_detail', isDisable);

            controlObj.textdisable('detail_f_jfm_tbl_ld_dyhlh_detail', isDisable);

            controlObj.datetimedisable('detail_f_khrq_tbl_ld_dyhlh_detail_date', 'detail_f_khrq_tbl_ld_dyhlh_detail_time', isDisable);

            controlObj.multidropdownlistdisable('detail_f_yhfz_tbl_ld_dyhlh_detail', isDisable);

            controlObj.textdisable('detail_f_dh_tbl_ld_dyhlh_detail', isDisable);

            controlObj.textdisable('detail_f_dz_tbl_ld_dyhlh_detail', isDisable);

            controlObj.singledropdownlistdisable('detail_f_dy_tbl_ld_dyhlh_detail', isDisable);

            controlObj.singledropdownlistdisable('detail_f_sc_tbl_ld_dyhlh_detail', isDisable);

            controlObj.singledropdownlistdisable('detail_f_qy_tbl_ld_dyhlh_detail', isDisable);

            controlObj.singledropdownlistdisable('detail_f_pq_tbl_ld_dyhlh_detail', isDisable);

            controlObj.toggledisable('detail_f_sfts_tbl_ld_dyhlh_detail', isDisable);

            controlObj.singledropdownlistdisable('detail_f_tsyx_tbl_ld_dyhlh_detail', isDisable);

            controlObj.textdisable('detail_f_tsyxzh_tbl_ld_dyhlh_detail', isDisable);

            controlObj.textdisable('detail_f_htbh_tbl_ld_dyhlh_detail', isDisable);

            controlObj.datetimedisable('detail_f_htqdrq_tbl_ld_dyhlh_detail_date', 'detail_f_htqdrq_tbl_ld_dyhlh_detail_time', isDisable);

            controlObj.textdisable('detail_f_sfzh_tbl_ld_dyhlh_detail', isDisable);

            controlObj.fileuploaderdisable('detail_f_htfj_tbl_ld_dyhlh_detail', isDisable);

            controlObj.fileuploaderdisable('detail_f_qtfj_tbl_ld_dyhlh_detail', isDisable);

            controlObj.fileuploaderdisable('detail_f_sfzfj_tbl_ld_dyhlh_detail', isDisable);

            controlObj.toggledisable('detail_f_sfzzs_tbl_ld_dyhlh_detail', isDisable);

            controlObj.singledropdownlistdisable('detail_f_yhzt_tbl_ld_dyhlh_detail', isDisable);

            controlObj.textdisable('detail_f_yhbz_tbl_ld_dyhlh_detail', isDisable);

            controlObj.textdisable('detail_f_lxth_tbl_ld_dyhlh_detail', isDisable);

            controlObj.multidropdownlistdisable('detail_f_sbfz_tbl_ld_dyhlh_detail', isDisable);

            controlObj.textdisable('detail_f_rs_tbl_ld_dyhlh_detail', isDisable);

            controlObj.textdisable('detail_f_sbpp_tbl_ld_dyhlh_detail', isDisable);

            controlObj.textdisable('detail_f_mph_tbl_ld_dyhlh_detail', isDisable);

            controlObj.textdisable('detail_f_sbdz_tbl_ld_dyhlh_detail', isDisable);

            controlObj.singledropdownlistdisable('detail_f_sbkj_tbl_ld_dyhlh_detail', isDisable);

            controlObj.singledropdownlistdisable('detail_f_sblx_tbl_ld_dyhlh_detail', isDisable);

            controlObj.singledropdownlistdisable('detail_f_jllx_tbl_ld_dyhlh_detail', isDisable);

            controlObj.textdisable('detail_f_cszm_tbl_ld_dyhlh_detail', isDisable);

            controlObj.datetimedisable('detail_f_azrq_tbl_ld_dyhlh_detail_date', 'detail_f_azrq_tbl_ld_dyhlh_detail_time', isDisable);

            controlObj.textdisable('detail_f_synx_tbl_ld_dyhlh_detail', isDisable);

            controlObj.toggledisable('detail_f_qfzt_tbl_ld_dyhlh_detail', isDisable);

            controlObj.singledropdownlistdisable('detail_f_sbzt_tbl_ld_dyhlh_detail', isDisable);

            controlObj.fileuploaderdisable('detail_f_sbfj_tbl_ld_dyhlh_detail', isDisable);

            controlObj.textdisable('detail_f_sbbz_tbl_ld_dyhlh_detail', isDisable);

            controlObj.fileuploaderdisable('detail_f_lcfj_tbl_ld_dyhlh_detail', isDisable);

            controlObj.singledropdownlistdisable('detail_f_zt_tbl_ld_dyhlh_detail', true);

            controlObj.textdisable('detail_f_bz_tbl_ld_dyhlh_detail', isDisable);

            if (isDisable)
            {
                $('#btn_command_save_tbl_ld_dyhlh_detail').addClass('hidden');
                $('.btn-command-message').attr('disabled', 'disabled');
            }
            else
            {
                $('#btn_command_save_tbl_ld_dyhlh_detail').removeClass('hidden');
                $('.btn-command-message').removeAttr('disabled');
            }

                //controlObj.textdisable('detail_f_tbbh_tbl_ld_dyhlh_detail', true);
            if (that._pr_isdisplay == '4')
            {
                controlObj.textdisable('detail_f_dyhlhbh_tbl_ld_dyhlh_detail', true);
                controlObj.textdisable('detail_f_mc_tbl_ld_dyhlh_detail', true);
                controlObj.textdisable('detail_f_yhm_tbl_ld_dyhlh_detail', true);
                controlObj.textdisable('detail_f_jfm_tbl_ld_dyhlh_detail', true);
                controlObj.datetimedisable('detail_f_khrq_tbl_ld_dyhlh_detail_date', 'detail_f_khrq_tbl_ld_dyhlh_detail_time', true);
                controlObj.textdisable('detail_f_dh_tbl_ld_dyhlh_detail', true);
                controlObj.textdisable('detail_f_dz_tbl_ld_dyhlh_detail', true);
                controlObj.textdisable('detail_f_tjjzsf_tbl_ld_dyhlh_detail', true);
                controlObj.textdisable('detail_f_tjjzpwf_tbl_ld_dyhlh_detail', true);
                controlObj.textdisable('detail_f_ycje_tbl_ld_dyhlh_detail', true);
                controlObj.textdisable('detail_f_jhysl_tbl_ld_dyhlh_detail', true);
                controlObj.textdisable('detail_f_sqysl_tbl_ld_dyhlh_detail', true);
                controlObj.textdisable('detail_f_tbbh_tbl_ld_dyhlh_detail', true);
                controlObj.toggledisable('detail_f_sfjlbjf_tbl_ld_dyhlh_detail', true);
                controlObj.textdisable('detail_f_sfzh_tbl_ld_dyhlh_detail', true);
                controlObj.fileuploaderdisable('detail_f_qtfj_tbl_ld_dyhlh_detail', true);
                controlObj.fileuploaderdisable('detail_f_sfzfj_tbl_ld_dyhlh_detail', true);
                controlObj.singledropdownlistdisable('detail_f_yhzt_tbl_ld_dyhlh_detail', true);
                controlObj.singledropdownlistdisable('detail_f_khzt_tbl_ld_dyhlh_detail', true);
                controlObj.textdisable('detail_f_yhbz_tbl_ld_dyhlh_detail', true);
                controlObj.textdisable('detail_f_khbz_tbl_ld_dyhlh_detail', true);
                controlObj.textdisable('detail_f_lxth_tbl_ld_dyhlh_detail', true);
                controlObj.singledropdownlistdisable('detail_f_sbkj_tbl_ld_dyhlh_detail', true);
                controlObj.singledropdownlistdisable('detail_f_sblx_tbl_ld_dyhlh_detail', true);
                controlObj.singledropdownlistdisable('detail_f_jllx_tbl_ld_dyhlh_detail', true);
                controlObj.singledropdownlistdisable('detail_f_yslx_tbl_ld_dyhlh_detail', true);
                controlObj.datetimedisable('detail_f_azrq_tbl_ld_dyhlh_detail_date', 'detail_f_azrq_tbl_ld_dyhlh_detail_time', true);
                controlObj.textdisable('detail_f_cszm_tbl_ld_dyhlh_detail', true);
                controlObj.textdisable('detail_f_synx_tbl_ld_dyhlh_detail', true);
                controlObj.toggledisable('detail_f_qfzt_tbl_ld_dyhlh_detail', true);
                controlObj.textdisable('detail_f_rs_tbl_ld_dyhlh_detail', true);
                controlObj.textdisable('detail_f_sbpp_tbl_ld_dyhlh_detail', true);
                controlObj.textdisable('detail_f_mph_tbl_ld_dyhlh_detail', true);
                controlObj.textdisable('detail_f_sbbz_tbl_ld_dyhlh_detail', true);
                controlObj.singledropdownlistdisable('detail_f_sbzt_tbl_ld_dyhlh_detail', true);
                controlObj.toggledisable('detail_f_sfts_tbl_ld_dyhlh_detail', true);
                controlObj.singledropdownlistdisable('detail_f_tsyx_tbl_ld_dyhlh_detail', true);
                controlObj.textdisable('detail_f_tsyxzh_tbl_ld_dyhlh_detail', true);
                controlObj.toggledisable('detail_f_sfzzs_tbl_ld_dyhlh_detail', true);
                controlObj.textdisable('detail_f_htbh_tbl_ld_dyhlh_detail', true);
                controlObj.fileuploaderdisable('detail_f_sbfj_tbl_ld_dyhlh_detail', true);
                controlObj.fileuploaderdisable('detail_f_lcfj_tbl_ld_dyhlh_detail', true);
                controlObj.datetimedisable('detail_f_htqdrq_tbl_ld_dyhlh_detail_date', 'detail_f_htqdrq_tbl_ld_dyhlh_detail_time', true);
            }
        }
        catch (ex)
        {
            _blockMessage.show('setDisable执行失败<br/>' + ex.message, 'fail');
        }
    },

    //---------------------------------------------------------------------------------
    // ---------------------------------Model操作------------------------------------
    //---------------------------------------------------------------------------------
    /* 
    *  
    *  方法:setModel
    *  参数:tbl_ld_dyhlh_detail, callBackFunction
    *  根据数据对象，绑定数据对象到页面控件
    */
    setModel = function (tbl_ld_dyhlh_detail, callBackFunction)
    {
        try
        {

            controlObj.text('detail_f_value1_tbl_ld_dyhlh_detail', tbl_ld_dyhlh_detail.f_value1);

            controlObj.text('detail_f_value2_tbl_ld_dyhlh_detail', tbl_ld_dyhlh_detail.f_value2);

            controlObj.text('detail_f_value3_tbl_ld_dyhlh_detail', tbl_ld_dyhlh_detail.f_value3);

            controlObj.text('detail_f_value4_tbl_ld_dyhlh_detail', tbl_ld_dyhlh_detail.f_value4);

            controlObj.text('detail_f_value5_tbl_ld_dyhlh_detail', tbl_ld_dyhlh_detail.f_value5);

            controlObj.text('detail_f_value6_tbl_ld_dyhlh_detail', tbl_ld_dyhlh_detail.f_value6);

            controlObj.text('detail_f_value7_tbl_ld_dyhlh_detail', tbl_ld_dyhlh_detail.f_value7);

            controlObj.text('detail_f_value8_tbl_ld_dyhlh_detail', tbl_ld_dyhlh_detail.f_value8);

            controlObj.text('detail_f_value9_tbl_ld_dyhlh_detail', tbl_ld_dyhlh_detail.f_value9);

            controlObj.text('detail_f_value10_tbl_ld_dyhlh_detail', tbl_ld_dyhlh_detail.f_value10);

            controlObj.text('detail_fk_tbl_maintable_sys_id_tbl_ld_dyhlh_detail', tbl_ld_dyhlh_detail.fk_tbl_maintable_sys_id);

            controlObj.text('detail_f_dyhlhbh_tbl_ld_dyhlh_detail', tbl_ld_dyhlh_detail.f_dyhlhbh);

            controlObj.text('detail_f_mc_tbl_ld_dyhlh_detail', tbl_ld_dyhlh_detail.f_mc);

            controlObj.text('detail_f_sqr_tbl_ld_dyhlh_detail', tbl_ld_dyhlh_detail.f_sqr);

            controlObj.text('detail_f_sqrid_tbl_ld_dyhlh_detail', tbl_ld_dyhlh_detail.f_sqrid);

            controlObj.datetime('detail_f_sqsj_tbl_ld_dyhlh_detail_date', 'detail_f_sqsj_tbl_ld_dyhlh_detail_time', tbl_ld_dyhlh_detail.f_sqsj);

            controlObj.text('detail_f_czr_tbl_ld_dyhlh_detail', tbl_ld_dyhlh_detail.f_czr);

            controlObj.text('detail_f_czrid_tbl_ld_dyhlh_detail', tbl_ld_dyhlh_detail.f_czrid);

            controlObj.datetime('detail_f_czrsj_tbl_ld_dyhlh_detail_date', 'detail_f_czrsj_tbl_ld_dyhlh_detail_time', tbl_ld_dyhlh_detail.f_czrsj);

            controlObj.multidropdownlistid('detail_f_khfz_tbl_ld_dyhlh_detail', tbl_ld_dyhlh_detail.f_khfzid);

            controlObj.singledropdownlistid('detail_f_yslx_tbl_ld_dyhlh_detail', tbl_ld_dyhlh_detail.f_yslxid);

            controlObj.text('detail_f_ycje_tbl_ld_dyhlh_detail', tbl_ld_dyhlh_detail.f_ycje);

            controlObj.datetime('detail_f_zhcbrq_tbl_ld_dyhlh_detail_date', 'detail_f_zhcbrq_tbl_ld_dyhlh_detail_time', tbl_ld_dyhlh_detail.f_zhcbrq);

            controlObj.text('detail_f_tbbh_tbl_ld_dyhlh_detail', tbl_ld_dyhlh_detail.f_tbbh);

            controlObj.toggle('detail_f_sfjlbjf_tbl_ld_dyhlh_detail', tbl_ld_dyhlh_detail.f_sfjlbjf);

            controlObj.text('detail_f_tjjzsf_tbl_ld_dyhlh_detail', tbl_ld_dyhlh_detail.f_tjjzsf);

            controlObj.text('detail_f_tjjzpwf_tbl_ld_dyhlh_detail', tbl_ld_dyhlh_detail.f_tjjzpwf);

            controlObj.text('detail_f_jhysl_tbl_ld_dyhlh_detail', tbl_ld_dyhlh_detail.f_jhysl);

            controlObj.text('detail_f_sqysl_tbl_ld_dyhlh_detail', tbl_ld_dyhlh_detail.f_sqysl);

            controlObj.singledropdownlistid('detail_f_khzt_tbl_ld_dyhlh_detail', tbl_ld_dyhlh_detail.f_khztid);

            controlObj.text('detail_f_khbz_tbl_ld_dyhlh_detail', tbl_ld_dyhlh_detail.f_khbz);

            controlObj.singledropdownlistid('detail_f_cbbh_tbl_ld_dyhlh_detail', tbl_ld_dyhlh_detail.f_cbbhid);

            controlObj.text('detail_f_cbxh_tbl_ld_dyhlh_detail', tbl_ld_dyhlh_detail.f_cbxh);

            controlObj.text('detail_f_yhm_tbl_ld_dyhlh_detail', tbl_ld_dyhlh_detail.f_yhm);

            controlObj.text('detail_f_jfm_tbl_ld_dyhlh_detail', tbl_ld_dyhlh_detail.f_jfm);

            controlObj.datetime('detail_f_khrq_tbl_ld_dyhlh_detail_date', 'detail_f_khrq_tbl_ld_dyhlh_detail_time', tbl_ld_dyhlh_detail.f_khrq);

            controlObj.multidropdownlistid('detail_f_yhfz_tbl_ld_dyhlh_detail', tbl_ld_dyhlh_detail.f_yhfzid);

            controlObj.text('detail_f_dh_tbl_ld_dyhlh_detail', tbl_ld_dyhlh_detail.f_dh);

            controlObj.text('detail_f_dz_tbl_ld_dyhlh_detail', tbl_ld_dyhlh_detail.f_dz);

            controlObj.singledropdownlistid('detail_f_dy_tbl_ld_dyhlh_detail', tbl_ld_dyhlh_detail.f_dyid);

            var dy = { "added": { "id": tbl_ld_dyhlh_detail.f_dyid } };
            var sc = { "added": { "id": tbl_ld_dyhlh_detail.f_scid } };
            var qy = { "added": { "id": tbl_ld_dyhlh_detail.f_qyid } };
            f_dy_onchange(dy, {
                success: function ()
                {
            controlObj.singledropdownlistid('detail_f_sc_tbl_ld_dyhlh_detail', tbl_ld_dyhlh_detail.f_scid);
                    f_sc_onchange(sc, {
                        success: function ()
                        {
            controlObj.singledropdownlistid('detail_f_qy_tbl_ld_dyhlh_detail', tbl_ld_dyhlh_detail.f_qyid);
                            f_qy_onchange(qy, {
                                success: function ()
                                {
            controlObj.singledropdownlistid('detail_f_pq_tbl_ld_dyhlh_detail', tbl_ld_dyhlh_detail.f_pqid);
                                }
                            });
                        }
                    });
                }
            });

            controlObj.toggle('detail_f_sfts_tbl_ld_dyhlh_detail', tbl_ld_dyhlh_detail.f_sfts);

            controlObj.singledropdownlistid('detail_f_tsyx_tbl_ld_dyhlh_detail', tbl_ld_dyhlh_detail.f_tsyxid);

            controlObj.text('detail_f_tsyxzh_tbl_ld_dyhlh_detail', tbl_ld_dyhlh_detail.f_tsyxzh);

            controlObj.text('detail_f_htbh_tbl_ld_dyhlh_detail', tbl_ld_dyhlh_detail.f_htbh);

            controlObj.datetime('detail_f_htqdrq_tbl_ld_dyhlh_detail_date', 'detail_f_htqdrq_tbl_ld_dyhlh_detail_time', tbl_ld_dyhlh_detail.f_htqdrq);

            controlObj.text('detail_f_sfzh_tbl_ld_dyhlh_detail', tbl_ld_dyhlh_detail.f_sfzh);

            controlObj.fileuploaderbind('detail_f_htfj_tbl_ld_dyhlh_detail', tbl_ld_dyhlh_detail.f_htfj);

            controlObj.fileuploaderbind('detail_f_qtfj_tbl_ld_dyhlh_detail', tbl_ld_dyhlh_detail.f_qtfj);

            controlObj.fileuploaderbind('detail_f_sfzfj_tbl_ld_dyhlh_detail', tbl_ld_dyhlh_detail.f_sfzfj);

            controlObj.toggle('detail_f_sfzzs_tbl_ld_dyhlh_detail', tbl_ld_dyhlh_detail.f_sfzzs);

            controlObj.singledropdownlistid('detail_f_yhzt_tbl_ld_dyhlh_detail', tbl_ld_dyhlh_detail.f_yhztid);

            controlObj.text('detail_f_yhbz_tbl_ld_dyhlh_detail', tbl_ld_dyhlh_detail.f_yhbz);

            controlObj.text('detail_f_lxth_tbl_ld_dyhlh_detail', tbl_ld_dyhlh_detail.f_lxth);

            controlObj.multidropdownlistid('detail_f_sbfz_tbl_ld_dyhlh_detail', tbl_ld_dyhlh_detail.f_sbfzid);

            controlObj.text('detail_f_rs_tbl_ld_dyhlh_detail', tbl_ld_dyhlh_detail.f_rs);

            controlObj.text('detail_f_sbpp_tbl_ld_dyhlh_detail', tbl_ld_dyhlh_detail.f_sbpp);

            controlObj.text('detail_f_mph_tbl_ld_dyhlh_detail', tbl_ld_dyhlh_detail.f_mph);

            controlObj.text('detail_f_sbdz_tbl_ld_dyhlh_detail', tbl_ld_dyhlh_detail.f_sbdz);

            controlObj.singledropdownlistid('detail_f_sbkj_tbl_ld_dyhlh_detail', tbl_ld_dyhlh_detail.f_sbkjid);

            controlObj.singledropdownlistid('detail_f_sblx_tbl_ld_dyhlh_detail', tbl_ld_dyhlh_detail.f_sblxid);

            controlObj.singledropdownlistid('detail_f_jllx_tbl_ld_dyhlh_detail', tbl_ld_dyhlh_detail.f_jllxid);

            controlObj.text('detail_f_cszm_tbl_ld_dyhlh_detail', tbl_ld_dyhlh_detail.f_cszm);

            controlObj.datetime('detail_f_azrq_tbl_ld_dyhlh_detail_date', 'detail_f_azrq_tbl_ld_dyhlh_detail_time', tbl_ld_dyhlh_detail.f_azrq);

            controlObj.text('detail_f_synx_tbl_ld_dyhlh_detail', tbl_ld_dyhlh_detail.f_synx);

            controlObj.toggle('detail_f_qfzt_tbl_ld_dyhlh_detail', tbl_ld_dyhlh_detail.f_qfzt);

            controlObj.singledropdownlistid('detail_f_sbzt_tbl_ld_dyhlh_detail', tbl_ld_dyhlh_detail.f_sbztid);

            controlObj.fileuploaderbind('detail_f_sbfj_tbl_ld_dyhlh_detail', tbl_ld_dyhlh_detail.f_sbfj);

            controlObj.text('detail_f_sbbz_tbl_ld_dyhlh_detail', tbl_ld_dyhlh_detail.f_sbbz);

            controlObj.fileuploaderbind('detail_f_lcfj_tbl_ld_dyhlh_detail', tbl_ld_dyhlh_detail.f_lcfj);

            controlObj.singledropdownlistid('detail_f_zt_tbl_ld_dyhlh_detail', tbl_ld_dyhlh_detail.f_ztid);

            controlObj.text('detail_f_bz_tbl_ld_dyhlh_detail', tbl_ld_dyhlh_detail.f_bz.returnStringRN());

            callBackFunction.success();
        }
        catch (ex)
        {
            _blockMessage.show('setModel执行失败<br/>' + ex.message, 'fail');
        }
    },

    /* 
    *  
    *  方法:getModel
    *  参数:callbackFunction
    *  获取页面数据，返回对象tbl_ld_dyhlh_detail
    */
    getModel = function (callBackFunction)
    {
        try
        {
            var tbl_ld_dyhlh_detail = new Object();

            tbl_ld_dyhlh_detail.f_value1 = controlObj.text('detail_f_value1_tbl_ld_dyhlh_detail');

            tbl_ld_dyhlh_detail.f_value2 = controlObj.text('detail_f_value2_tbl_ld_dyhlh_detail');

            tbl_ld_dyhlh_detail.f_value3 = controlObj.text('detail_f_value3_tbl_ld_dyhlh_detail');

            tbl_ld_dyhlh_detail.f_value4 = controlObj.text('detail_f_value4_tbl_ld_dyhlh_detail');
            tbl_ld_dyhlh_detail.f_value5 = controlObj.text('detail_f_value5_tbl_ld_dyhlh_detail');

            tbl_ld_dyhlh_detail.f_value6 = controlObj.text('detail_f_value6_tbl_ld_dyhlh_detail');

            tbl_ld_dyhlh_detail.f_value7 = controlObj.text('detail_f_value7_tbl_ld_dyhlh_detail');

            tbl_ld_dyhlh_detail.f_value8 = controlObj.text('detail_f_value8_tbl_ld_dyhlh_detail');

            tbl_ld_dyhlh_detail.f_value9 = controlObj.text('detail_f_value9_tbl_ld_dyhlh_detail');

            tbl_ld_dyhlh_detail.f_value10 = controlObj.text('detail_f_value10_tbl_ld_dyhlh_detail');

            tbl_ld_dyhlh_detail.fk_tbl_maintable_sys_id = controlObj.text('detail_fk_tbl_maintable_sys_id_tbl_ld_dyhlh_detail');

            tbl_ld_dyhlh_detail.f_dyhlhbh = controlObj.text('detail_f_dyhlhbh_tbl_ld_dyhlh_detail');

            tbl_ld_dyhlh_detail.f_mc = controlObj.text('detail_f_mc_tbl_ld_dyhlh_detail');

            tbl_ld_dyhlh_detail.f_sqr = controlObj.text('detail_f_sqr_tbl_ld_dyhlh_detail');

            tbl_ld_dyhlh_detail.f_sqrid = controlObj.text('detail_f_sqrid_tbl_ld_dyhlh_detail');

            tbl_ld_dyhlh_detail.f_sqsj = controlObj.datetime('detail_f_sqsj_tbl_ld_dyhlh_detail_date', 'detail_f_sqsj_tbl_ld_dyhlh_detail_time');

            tbl_ld_dyhlh_detail.f_czr = controlObj.text('detail_f_czr_tbl_ld_dyhlh_detail');

            tbl_ld_dyhlh_detail.f_czrid = controlObj.text('detail_f_czrid_tbl_ld_dyhlh_detail');

            tbl_ld_dyhlh_detail.f_czrsj = controlObj.datetime('detail_f_czrsj_tbl_ld_dyhlh_detail_date', 'detail_f_czrsj_tbl_ld_dyhlh_detail_time');

            tbl_ld_dyhlh_detail.f_khfz = controlObj.multidropdownlist('detail_f_khfz_tbl_ld_dyhlh_detail');
            tbl_ld_dyhlh_detail.f_khfzid = controlObj.multidropdownlistid('detail_f_khfz_tbl_ld_dyhlh_detail');

            tbl_ld_dyhlh_detail.f_yslx = controlObj.singledropdownlist('detail_f_yslx_tbl_ld_dyhlh_detail');
            tbl_ld_dyhlh_detail.f_yslxid = controlObj.singledropdownlistid('detail_f_yslx_tbl_ld_dyhlh_detail');

            tbl_ld_dyhlh_detail.f_ycje = controlObj.text('detail_f_ycje_tbl_ld_dyhlh_detail');

            tbl_ld_dyhlh_detail.f_zhcbrq = controlObj.datetime('detail_f_zhcbrq_tbl_ld_dyhlh_detail_date', 'detail_f_zhcbrq_tbl_ld_dyhlh_detail_time');

            tbl_ld_dyhlh_detail.f_tbbh = controlObj.text('detail_f_tbbh_tbl_ld_dyhlh_detail');

            tbl_ld_dyhlh_detail.f_sfjlbjf = controlObj.toggle('detail_f_sfjlbjf_tbl_ld_dyhlh_detail');

            tbl_ld_dyhlh_detail.f_tjjzsf = controlObj.text('detail_f_tjjzsf_tbl_ld_dyhlh_detail');

            tbl_ld_dyhlh_detail.f_tjjzpwf = controlObj.text('detail_f_tjjzpwf_tbl_ld_dyhlh_detail');

            tbl_ld_dyhlh_detail.f_jhysl = controlObj.text('detail_f_jhysl_tbl_ld_dyhlh_detail');

            tbl_ld_dyhlh_detail.f_sqysl = controlObj.text('detail_f_sqysl_tbl_ld_dyhlh_detail');

            tbl_ld_dyhlh_detail.f_khzt = controlObj.singledropdownlist('detail_f_khzt_tbl_ld_dyhlh_detail');
            tbl_ld_dyhlh_detail.f_khztid = controlObj.singledropdownlistid('detail_f_khzt_tbl_ld_dyhlh_detail');

            tbl_ld_dyhlh_detail.f_khbz = controlObj.text('detail_f_khbz_tbl_ld_dyhlh_detail');

            tbl_ld_dyhlh_detail.f_cbbh = controlObj.singledropdownlist('detail_f_cbbh_tbl_ld_dyhlh_detail');

            tbl_ld_dyhlh_detail.f_cbbhid = controlObj.singledropdownlistid('detail_f_cbbh_tbl_ld_dyhlh_detail');

            tbl_ld_dyhlh_detail.f_cbxh = controlObj.text('detail_f_cbxh_tbl_ld_dyhlh_detail');

            tbl_ld_dyhlh_detail.f_yhm = controlObj.text('detail_f_yhm_tbl_ld_dyhlh_detail');

            tbl_ld_dyhlh_detail.f_jfm = controlObj.text('detail_f_jfm_tbl_ld_dyhlh_detail');

            tbl_ld_dyhlh_detail.f_khrq = controlObj.datetime('detail_f_khrq_tbl_ld_dyhlh_detail_date', 'detail_f_khrq_tbl_ld_dyhlh_detail_time');

            tbl_ld_dyhlh_detail.f_yhfz = controlObj.multidropdownlist('detail_f_yhfz_tbl_ld_dyhlh_detail');

            tbl_ld_dyhlh_detail.f_yhfzid = controlObj.multidropdownlistid('detail_f_yhfz_tbl_ld_dyhlh_detail');

            tbl_ld_dyhlh_detail.f_dh = controlObj.text('detail_f_dh_tbl_ld_dyhlh_detail');

            tbl_ld_dyhlh_detail.f_dz = controlObj.text('detail_f_dz_tbl_ld_dyhlh_detail');

            tbl_ld_dyhlh_detail.f_dy = controlObj.singledropdownlist('detail_f_dy_tbl_ld_dyhlh_detail');

            tbl_ld_dyhlh_detail.f_dyid = controlObj.singledropdownlistid('detail_f_dy_tbl_ld_dyhlh_detail');

            tbl_ld_dyhlh_detail.f_sc = controlObj.singledropdownlist('detail_f_sc_tbl_ld_dyhlh_detail');

            tbl_ld_dyhlh_detail.f_scid = controlObj.singledropdownlistid('detail_f_sc_tbl_ld_dyhlh_detail');

            tbl_ld_dyhlh_detail.f_qy = controlObj.singledropdownlist('detail_f_qy_tbl_ld_dyhlh_detail');

            tbl_ld_dyhlh_detail.f_qyid = controlObj.singledropdownlistid('detail_f_qy_tbl_ld_dyhlh_detail');

            tbl_ld_dyhlh_detail.f_pq = controlObj.singledropdownlist('detail_f_pq_tbl_ld_dyhlh_detail');

            tbl_ld_dyhlh_detail.f_pqid = controlObj.singledropdownlistid('detail_f_pq_tbl_ld_dyhlh_detail');

            tbl_ld_dyhlh_detail.f_sfts = controlObj.toggle('detail_f_sfts_tbl_ld_dyhlh_detail');

            tbl_ld_dyhlh_detail.f_tsyx = controlObj.singledropdownlist('detail_f_tsyx_tbl_ld_dyhlh_detail');

            tbl_ld_dyhlh_detail.f_tsyxid = controlObj.singledropdownlistid('detail_f_tsyx_tbl_ld_dyhlh_detail');

            tbl_ld_dyhlh_detail.f_tsyxzh = controlObj.text('detail_f_tsyxzh_tbl_ld_dyhlh_detail');

            tbl_ld_dyhlh_detail.f_htbh = controlObj.text('detail_f_htbh_tbl_ld_dyhlh_detail');

            tbl_ld_dyhlh_detail.f_htqdrq = controlObj.datetime('detail_f_htqdrq_tbl_ld_dyhlh_detail_date', 'detail_f_htqdrq_tbl_ld_dyhlh_detail_time');

            tbl_ld_dyhlh_detail.f_sfzh = controlObj.text('detail_f_sfzh_tbl_ld_dyhlh_detail');

            tbl_ld_dyhlh_detail.f_htfj = controlObj.fileuploaderid('detail_f_htfj_tbl_ld_dyhlh_detail');

            tbl_ld_dyhlh_detail.f_qtfj = controlObj.fileuploaderid('detail_f_qtfj_tbl_ld_dyhlh_detail');

            tbl_ld_dyhlh_detail.f_sfzfj = controlObj.fileuploaderid('detail_f_sfzfj_tbl_ld_dyhlh_detail');

            tbl_ld_dyhlh_detail.f_sfzzs = controlObj.toggle('detail_f_sfzzs_tbl_ld_dyhlh_detail');

            tbl_ld_dyhlh_detail.f_yhzt = controlObj.singledropdownlist('detail_f_yhzt_tbl_ld_dyhlh_detail');

            tbl_ld_dyhlh_detail.f_yhztid = controlObj.singledropdownlistid('detail_f_yhzt_tbl_ld_dyhlh_detail');

            tbl_ld_dyhlh_detail.f_yhbz = controlObj.text('detail_f_yhbz_tbl_ld_dyhlh_detail');

            tbl_ld_dyhlh_detail.f_lxth = controlObj.text('detail_f_lxth_tbl_ld_dyhlh_detail');

            tbl_ld_dyhlh_detail.f_sbfz = controlObj.multidropdownlist('detail_f_sbfz_tbl_ld_dyhlh_detail');

            tbl_ld_dyhlh_detail.f_sbfzid = controlObj.multidropdownlistid('detail_f_sbfz_tbl_ld_dyhlh_detail');

            tbl_ld_dyhlh_detail.f_rs = controlObj.text('detail_f_rs_tbl_ld_dyhlh_detail');

            tbl_ld_dyhlh_detail.f_sbpp = controlObj.text('detail_f_sbpp_tbl_ld_dyhlh_detail');

            tbl_ld_dyhlh_detail.f_mph = controlObj.text('detail_f_mph_tbl_ld_dyhlh_detail');

            tbl_ld_dyhlh_detail.f_sbdz = controlObj.text('detail_f_sbdz_tbl_ld_dyhlh_detail');

            tbl_ld_dyhlh_detail.f_sbkj = controlObj.singledropdownlist('detail_f_sbkj_tbl_ld_dyhlh_detail');

            tbl_ld_dyhlh_detail.f_sbkjid = controlObj.singledropdownlistid('detail_f_sbkj_tbl_ld_dyhlh_detail');

            tbl_ld_dyhlh_detail.f_sblx = controlObj.singledropdownlist('detail_f_sblx_tbl_ld_dyhlh_detail');

            tbl_ld_dyhlh_detail.f_sblxid = controlObj.singledropdownlistid('detail_f_sblx_tbl_ld_dyhlh_detail');

            tbl_ld_dyhlh_detail.f_jllx = controlObj.singledropdownlist('detail_f_jllx_tbl_ld_dyhlh_detail');

            tbl_ld_dyhlh_detail.f_jllxid = controlObj.singledropdownlistid('detail_f_jllx_tbl_ld_dyhlh_detail');

            tbl_ld_dyhlh_detail.f_cszm = controlObj.text('detail_f_cszm_tbl_ld_dyhlh_detail');

            tbl_ld_dyhlh_detail.f_azrq = controlObj.datetime('detail_f_azrq_tbl_ld_dyhlh_detail_date', 'detail_f_azrq_tbl_ld_dyhlh_detail_time');

            tbl_ld_dyhlh_detail.f_synx = controlObj.text('detail_f_synx_tbl_ld_dyhlh_detail');

            tbl_ld_dyhlh_detail.f_qfzt = controlObj.toggle('detail_f_qfzt_tbl_ld_dyhlh_detail');

            tbl_ld_dyhlh_detail.f_sbzt = controlObj.singledropdownlist('detail_f_sbzt_tbl_ld_dyhlh_detail');

            tbl_ld_dyhlh_detail.f_sbztid = controlObj.singledropdownlistid('detail_f_sbzt_tbl_ld_dyhlh_detail');

            tbl_ld_dyhlh_detail.f_sbfj = controlObj.fileuploaderid('detail_f_sbfj_tbl_ld_dyhlh_detail');

            tbl_ld_dyhlh_detail.f_sbbz = controlObj.text('detail_f_sbbz_tbl_ld_dyhlh_detail');

            tbl_ld_dyhlh_detail.f_lcfj = controlObj.fileuploaderid('detail_f_lcfj_tbl_ld_dyhlh_detail');

            tbl_ld_dyhlh_detail.f_zt = controlObj.singledropdownlist('detail_f_zt_tbl_ld_dyhlh_detail');

            tbl_ld_dyhlh_detail.f_ztid = controlObj.singledropdownlistid('detail_f_zt_tbl_ld_dyhlh_detail');

            tbl_ld_dyhlh_detail.f_bz = controlObj.text('detail_f_bz_tbl_ld_dyhlh_detail');

            callBackFunction.success(tbl_ld_dyhlh_detail);
        }
        catch (ex)
        {
            callBackFunction.fail(ex.message);
        }
    },

    /* 
    *  
    *  方法:checkModel
    *  参数:tbl_ld_dyhlh_detail，callbackFunction
    *  页面数据校验，会用到_validateMessage，校验结果分success，fail
    */
    checkModel = function (tbl_ld_dyhlh_detail, callBackFunction)
    {
        try
        {
            var errorMessageHansMap = new hashMap();
            var errorMessagePlacementHansMap = new hashMap();

            //根据_pr_isdisplay决定校验功能
            switch (that._pr_isdisplay)
            {
                //case1时为起件
                case "1":
                    {
                    if (tbl_ld_dyhlh_detail.f_mc.length > 200)
                    {
                        errorMessageHansMap.put('detail_f_mc_tbl_ld_dyhlh_detail', '长度不能超过<a style="color:red">200</a>个字');
                    }
                    if (tbl_ld_dyhlh_detail.f_mc.length < 1)
                    {
                        errorMessageHansMap.put('detail_f_mc_tbl_ld_dyhlh_detail', '不能为空');
                    }
                    if (tbl_ld_dyhlh_detail.f_jhysl != "" && !/^[0-9]+\.?[0-9]*$/.test(tbl_ld_dyhlh_detail.f_jhysl))
                    {
                        errorMessageHansMap.put('detail_f_jhysl_tbl_ld_dyhlh_detail', '必须填写数字');
                    }
                    if (tbl_ld_dyhlh_detail.f_sqysl != "" && !/^[0-9]+\.?[0-9]*$/.test(tbl_ld_dyhlh_detail.f_sqysl))
                    {
                        errorMessageHansMap.put('detail_f_sqysl_tbl_ld_dyhlh_detail', '必须填写数字');
                    }
                    if (tbl_ld_dyhlh_detail.f_jhysl.length > 200)
                    {
                        errorMessageHansMap.put('detail_f_jhysl_tbl_ld_dyhlh_detail', '长度不能超过<a style="color:red">200</a>个字');
                    }

                    if (tbl_ld_dyhlh_detail.f_sqysl.length > 200)
                    {
                        errorMessageHansMap.put('detail_f_sqysl_tbl_ld_dyhlh_detail', '长度不能超过<a style="color:red">200</a>个字');
                    }

                    if (tbl_ld_dyhlh_detail.f_ycje.length > 200)
                    {
                        errorMessageHansMap.put('detail_f_ycje_tbl_ld_dyhlh_detail', '长度不能超过<a style="color:red">200</a>个字');
                    }
                    if (tbl_ld_dyhlh_detail.f_ycje != "" && !/^[0-9]+\.?[0-9]*$/.test(tbl_ld_dyhlh_detail.f_ycje))
                    {
                        errorMessageHansMap.put('detail_f_ycje_tbl_ld_dyhlh_detail', '必须填写数字');
                    }
                    if (tbl_ld_dyhlh_detail.f_tjjzsf.length > 200)
                    {
                        errorMessageHansMap.put('detail_f_tjjzsf_tbl_ld_dyhlh_detail', '长度不能超过<a style="color:red">200</a>个字');
                    }
                    if (tbl_ld_dyhlh_detail.f_tjjzsf != "" && !/^[0-9]+\.?[0-9]*$/.test(tbl_ld_dyhlh_detail.f_tjjzsf))
                    {
                        errorMessageHansMap.put('detail_f_tjjzsf_tbl_ld_dyhlh_detail', '必须填写数字');
                    }
                    if (tbl_ld_dyhlh_detail.f_tjjzpwf.length > 200)
                    {
                        errorMessageHansMap.put('detail_f_tjjzpwf_tbl_ld_dyhlh_detail', '长度不能超过<a style="color:red">200</a>个字');
                    }
                    if (tbl_ld_dyhlh_detail.f_tjjzpwf != "" && !/^[0-9]+\.?[0-9]*$/.test(tbl_ld_dyhlh_detail.f_tjjzpwf))
                    {
                        errorMessageHansMap.put('detail_f_tjjzpwf_tbl_ld_dyhlh_detail', '必须填写数字');
                    }
                    if (tbl_ld_dyhlh_detail.f_tbbh.length > 200)
                    {
                        errorMessageHansMap.put('detail_f_tbbh_tbl_ld_dyhlh_detail', '长度不能超过<a style="color:red">200</a>个字');
                    }
                    if (tbl_ld_dyhlh_detail.f_sfjlbjf.length > 200)
                    {
                        errorMessageHansMap.put('detail_f_sfjlbjf_tbl_ld_dyhlh_detail', '长度不能超过<a style="color:red">200</a>个字');
                    }

                    if (tbl_ld_dyhlh_detail.f_khzt.length > 200)
                    {
                        errorMessageHansMap.put('detail_f_khzt_tbl_ld_dyhlh_detail', '长度不能超过<a style="color:red">200</a>个字');
                    }
                    if (tbl_ld_dyhlh_detail.f_khzt.length < 1)
                    {
                        errorMessageHansMap.put('detail_f_khzt_tbl_ld_dyhlh_detail', '不能为空');
                    }

                    if (tbl_ld_dyhlh_detail.f_khbz.length > 200)
                    {
                        errorMessageHansMap.put('detail_f_khbz_tbl_ld_dyhlh_detail', '长度不能超过<a style="color:red">200</a>个字');
                    }
                    if (tbl_ld_dyhlh_detail.f_yhm.length > 200)
                    {
                        errorMessageHansMap.put('detail_f_yhm_tbl_ld_dyhlh_detail', '长度不能超过<a style="color:red">200</a>个字');
                    }

                    if (tbl_ld_dyhlh_detail.f_jfm.length > 200)
                    {
                        errorMessageHansMap.put('detail_f_jfm_tbl_ld_dyhlh_detail', '长度不能超过<a style="color:red">200</a>个字');
                    }
                    if (tbl_ld_dyhlh_detail.f_yhm.length < 1)
                    {
                        errorMessageHansMap.put('detail_f_yhm_tbl_ld_dyhlh_detail', '不能为空');
                    }

                    if (tbl_ld_dyhlh_detail.f_jfm.length < 1)
                    {
                        errorMessageHansMap.put('detail_f_jfm_tbl_ld_dyhlh_detail', '不能为空');
                    }
                    if (tbl_ld_dyhlh_detail.f_dh.length > 200)
                    {
                        errorMessageHansMap.put('detail_f_dh_tbl_ld_dyhlh_detail', '长度不能超过<a style="color:red">200</a>个字');
                    }

                    if (tbl_ld_dyhlh_detail.f_dz.length > 200)
                    {
                        errorMessageHansMap.put('detail_f_dz_tbl_ld_dyhlh_detail', '长度不能超过<a style="color:red">200</a>个字');
                    }
                    if (tbl_ld_dyhlh_detail.f_sfzh.length > 200)
                    {
                        errorMessageHansMap.put('detail_f_sfzh_tbl_ld_dyhlh_detail', '长度不能超过<a style="color:red">200</a>个字');
                    }

                    if (tbl_ld_dyhlh_detail.f_sfzfj.length > 4000)
                    {
                        errorMessageHansMap.put('detail_f_sfzfj_tbl_ld_dyhlh_detail', '长度不能超过<a style="color:red">4000</a>个字');
                    }
                    if (tbl_ld_dyhlh_detail.f_qtfj.length > 4000)
                    {
                        errorMessageHansMap.put('detail_f_qtfj_tbl_ld_dyhlh_detail', '长度不能超过<a style="color:red">4000</a>个字');
                    }
                    if (tbl_ld_dyhlh_detail.f_yhzt.length > 200)
                    {
                        errorMessageHansMap.put('detail_f_yhzt_tbl_ld_dyhlh_detail', '长度不能超过<a style="color:red">200</a>个字');
                    }
                    if (tbl_ld_dyhlh_detail.f_yhzt.length < 1)
                    {
                        errorMessageHansMap.put('detail_f_yhzt_tbl_ld_dyhlh_detail', '不能为空');
                    }
                    if (tbl_ld_dyhlh_detail.f_yhbz.length > 200)
                    {
                        errorMessageHansMap.put('detail_f_yhbz_tbl_ld_dyhlh_detail', '长度不能超过<a style="color:red">200</a>个字');
                    }
                    if (tbl_ld_dyhlh_detail.f_sqr.length > 200)
                    {
                        errorMessageHansMap.put('detail_f_sqr_tbl_ld_dyhlh_detail', '长度不能超过<a style="color:red">200</a>个字');
                    }

                    if (tbl_ld_dyhlh_detail.f_sqrid.length > 200)
                    {
                        errorMessageHansMap.put('detail_f_sqrid_tbl_ld_dyhlh_detail', '长度不能超过<a style="color:red">200</a>个字');
                    }


                    }

                    //验证水表的信息
                    {
                    //------------------------------------------------------------
                    if (tbl_ld_dyhlh_detail.f_czr.length > 200)
                    {
                        errorMessageHansMap.put('detail_f_czr_tbl_ld_dyhlh_detail', '长度不能超过<a style="color:red">200</a>个字');
                    }

                    if (tbl_ld_dyhlh_detail.f_czrid.length > 200)
                    {
                        errorMessageHansMap.put('detail_f_czrid_tbl_ld_dyhlh_detail', '长度不能超过<a style="color:red">200</a>个字');
                    }
                    if (tbl_ld_dyhlh_detail.f_yslx.length > 200)
                    {
                        errorMessageHansMap.put('detail_f_yslx_tbl_ld_dyhlh_detail', '长度不能超过<a style="color:red">200</a>个字');
                    }

                    if (tbl_ld_dyhlh_detail.f_yslx.length < 1)
                    {
                        errorMessageHansMap.put('detail_f_yslx_tbl_ld_dyhlh_detail', '长度不能小于<a style="color:red">1</a>个字');
                    }
                    if (tbl_ld_dyhlh_detail.f_sfts.length > 200)
                    {
                        errorMessageHansMap.put('detail_f_sfts_tbl_ld_dyhlh_detail', '长度不能超过<a style="color:red">200</a>个字');
                    }

                    if (tbl_ld_dyhlh_detail.f_tsyx.length > 200)
                    {
                        errorMessageHansMap.put('detail_f_tsyx_tbl_ld_dyhlh_detail', '长度不能超过<a style="color:red">200</a>个字');
                    }

                    if (tbl_ld_dyhlh_detail.f_tsyxzh.length > 200)
                    {
                        errorMessageHansMap.put('detail_f_tsyxzh_tbl_ld_dyhlh_detail', '长度不能超过<a style="color:red">200</a>个字');
                    }

                    if (tbl_ld_dyhlh_detail.f_htbh.length > 200)
                    {
                        errorMessageHansMap.put('detail_f_htbh_tbl_ld_dyhlh_detail', '长度不能超过<a style="color:red">200</a>个字');
                    }


                    if (tbl_ld_dyhlh_detail.f_htfj.length > 4000)
                    {
                        errorMessageHansMap.put('detail_f_htfj_tbl_ld_dyhlh_detail', '长度不能超过<a style="color:red">4000</a>个字');
                    }


                    if (tbl_ld_dyhlh_detail.f_sfzzs.length > 200)
                    {
                        errorMessageHansMap.put('detail_f_sfzzs_tbl_ld_dyhlh_detail', '长度不能超过<a style="color:red">200</a>个字');
                    }


                    if (tbl_ld_dyhlh_detail.f_lxth.length > 200)
                    {
                        errorMessageHansMap.put('detail_f_lxth_tbl_ld_dyhlh_detail', '长度不能超过<a style="color:red">200</a>个字');
                    }
                    //if (tbl_ld_dyhlh_detail.f_lxth.length < 1)
                    //{
                    //    errorMessageHansMap.put('detail_f_lxth_tbl_ld_dyhlh_detail', '必须填写');
                    //}

                    if (tbl_ld_dyhlh_detail.f_rs.length > 200)
                    {
                        errorMessageHansMap.put('detail_f_rs_tbl_ld_dyhlh_detail', '长度不能超过<a style="color:red">200</a>个字');
                    }

                    if (tbl_ld_dyhlh_detail.f_rs != "" && !/^[0-9]+\.?[0-9]*$/.test(tbl_ld_dyhlh_detail.f_rs))
                    {
                        errorMessageHansMap.put('detail_f_rs_tbl_ld_dyhlh_detail', '必须填写数字');
                    }

                    if (tbl_ld_dyhlh_detail.f_sbpp.length > 200)
                    {
                        errorMessageHansMap.put('detail_f_sbpp_tbl_ld_dyhlh_detail', '长度不能超过<a style="color:red">200</a>个字');
                    }

                    if (tbl_ld_dyhlh_detail.f_mph.length > 200)
                    {
                        errorMessageHansMap.put('detail_f_mph_tbl_ld_dyhlh_detail', '长度不能超过<a style="color:red">200</a>个字');
                    }
                    if (tbl_ld_dyhlh_detail.f_sbkj.length > 200)
                    {
                        errorMessageHansMap.put('detail_f_sbkj_tbl_ld_dyhlh_detail', '长度不能超过<a style="color:red">200</a>个字');
                    }

                    if (tbl_ld_dyhlh_detail.f_sblx.length > 200)
                    {
                        errorMessageHansMap.put('detail_f_sblx_tbl_ld_dyhlh_detail', '长度不能超过<a style="color:red">200</a>个字');
                    }
                    if (tbl_ld_dyhlh_detail.f_sblx.length < 1)
                    {
                        errorMessageHansMap.put('detail_f_sblx_tbl_ld_dyhlh_detail', '必须填写');
                    }
                    if (tbl_ld_dyhlh_detail.f_jllx.length > 200)
                    {
                        errorMessageHansMap.put('detail_f_jllx_tbl_ld_dyhlh_detail', '长度不能超过<a style="color:red">200</a>个字');
                    }
                    if (tbl_ld_dyhlh_detail.f_jllx.length < 1)
                    {
                        errorMessageHansMap.put('detail_f_jllx_tbl_ld_dyhlh_detail', '必须填写');
                    }
                    if (tbl_ld_dyhlh_detail.f_synx.length > 200)
                    {
                        errorMessageHansMap.put('detail_f_synx_tbl_ld_dyhlh_detail', '长度不能超过<a style="color:red">200</a>个字');
                    }
                    if (tbl_ld_dyhlh_detail.f_synx.length < 1)
                    {
                        errorMessageHansMap.put('detail_f_synx_tbl_ld_dyhlh_detail', '必须填写');
                    }
                    if (tbl_ld_dyhlh_detail.f_synx != "" && !/^[0-9]+\.?[0-9]*$/.test(tbl_ld_dyhlh_detail.f_synx))
                    {
                        errorMessageHansMap.put('detail_f_synx_tbl_ld_dyhlh_detail', '必须填写数字');
                    }
                    if (tbl_ld_dyhlh_detail.f_qfzt.length > 200)
                    {
                        errorMessageHansMap.put('detail_f_qfzt_tbl_ld_dyhlh_detail', '长度不能超过<a style="color:red">200</a>个字');
                    }

                    if (tbl_ld_dyhlh_detail.f_cszm.length > 200)
                    {
                        errorMessageHansMap.put('detail_f_cszm_tbl_ld_dyhlh_detail', '长度不能超过<a style="color:red">200</a>个字');
                    }
                    if (tbl_ld_dyhlh_detail.f_cszm != "" && !/^[0-9]+\.?[0-9]*$/.test(tbl_ld_dyhlh_detail.f_cszm))
                    {
                        errorMessageHansMap.put('detail_f_cszm_tbl_ld_dyhlh_detail', '必须填写数字');
                    }
                    if (tbl_ld_dyhlh_detail.f_cszm.length < 1)
                    {
                        errorMessageHansMap.put('detail_f_cszm_tbl_ld_dyhlh_detail', '长度不能小于<a style="color:red">1</a>个字');
                    }
                    if (tbl_ld_dyhlh_detail.f_sbzt.length > 200)
                    {
                        errorMessageHansMap.put('detail_f_sbzt_tbl_ld_dyhlh_detail', '长度不能超过<a style="color:red">200</a>个字');
                    }
                    if (tbl_ld_dyhlh_detail.f_sbzt.length < 1)
                    {
                        errorMessageHansMap.put('detail_f_sbzt_tbl_ld_dyhlh_detail', '不能为空');
                    }

                    if (tbl_ld_dyhlh_detail.f_sbfj.length > 4000)
                    {
                        errorMessageHansMap.put('detail_f_sbfj_tbl_ld_dyhlh_detail', '长度不能超过<a style="color:red">4000</a>个字');
                    }

                    if (tbl_ld_dyhlh_detail.f_sbbz.length > 200)
                    {
                        errorMessageHansMap.put('detail_f_sbbz_tbl_ld_dyhlh_detail', '长度不能超过<a style="color:red">200</a>个字');
                    }
                    }
                    break;
              //case4 业务管理员填写
                case "4":
                    //先重新验证第一节点的控件/在验证第三节点的控件，防止改动错误
                    if (tbl_ld_dyhlh_detail.f_mc.length > 200)
                    {
                        errorMessageHansMap.put('detail_f_mc_tbl_ld_dyhlh_detail', '长度不能超过<a style="color:red">200</a>个字');
                    }
                    if (tbl_ld_dyhlh_detail.f_mc.length < 1)
                    {
                        errorMessageHansMap.put('detail_f_mc_tbl_ld_dyhlh_detail', '不能为空');
                    }
                    if (tbl_ld_dyhlh_detail.f_jhysl != "" && !/^[0-9]+\.?[0-9]*$/.test(tbl_ld_dyhlh_detail.f_jhysl))
                    {
                        errorMessageHansMap.put('detail_f_jhysl_tbl_ld_dyhlh_detail', '必须填写数字');
                    }
                    if (tbl_ld_dyhlh_detail.f_sqysl != "" && !/^[0-9]+\.?[0-9]*$/.test(tbl_ld_dyhlh_detail.f_sqysl))
                    {
                        errorMessageHansMap.put('detail_f_sqysl_tbl_ld_dyhlh_detail', '必须填写数字');
                    }
                    if (tbl_ld_dyhlh_detail.f_jhysl.length > 200)
                    {
                        errorMessageHansMap.put('detail_f_jhysl_tbl_ld_dyhlh_detail', '长度不能超过<a style="color:red">200</a>个字');
                    }

                    if (tbl_ld_dyhlh_detail.f_sqysl.length > 200)
                    {
                        errorMessageHansMap.put('detail_f_sqysl_tbl_ld_dyhlh_detail', '长度不能超过<a style="color:red">200</a>个字');
                    }

                    if (tbl_ld_dyhlh_detail.f_ycje.length > 200)
                    {
                        errorMessageHansMap.put('detail_f_ycje_tbl_ld_dyhlh_detail', '长度不能超过<a style="color:red">200</a>个字');
                    }
                    if (tbl_ld_dyhlh_detail.f_ycje != "" && !/^[0-9]+\.?[0-9]*$/.test(tbl_ld_dyhlh_detail.f_ycje))
                    {
                        errorMessageHansMap.put('detail_f_ycje_tbl_ld_dyhlh_detail', '必须填写数字');
                    }

                    if (tbl_ld_dyhlh_detail.f_tjjzsf.length > 200)
                    {
                        errorMessageHansMap.put('detail_f_tjjzsf_tbl_ld_dyhlh_detail', '长度不能超过<a style="color:red">200</a>个字');
                    }
                    if (tbl_ld_dyhlh_detail.f_tjjzsf != "" && !/^[0-9]+\.?[0-9]*$/.test(tbl_ld_dyhlh_detail.f_tjjzsf))
                    {
                        errorMessageHansMap.put('detail_f_tjjzsf_tbl_ld_dyhlh_detail', '必须填写数字');
                    }

                    if (tbl_ld_dyhlh_detail.f_tjjzpwf.length > 200)
                    {
                        errorMessageHansMap.put('detail_f_tjjzpwf_tbl_ld_dyhlh_detail', '长度不能超过<a style="color:red">200</a>个字');
                    }
                    if (tbl_ld_dyhlh_detail.f_tjjzpwf != "" && !/^[0-9]+\.?[0-9]*$/.test(tbl_ld_dyhlh_detail.f_tjjzpwf))
                    {
                        errorMessageHansMap.put('detail_f_tjjzpwf_tbl_ld_dyhlh_detail', '必须填写数字');
                    }

                    if (tbl_ld_dyhlh_detail.f_tbbh.length > 200)
                    {
                        errorMessageHansMap.put('detail_f_tbbh_tbl_ld_dyhlh_detail', '长度不能超过<a style="color:red">200</a>个字');
                    }

                    if (tbl_ld_dyhlh_detail.f_sfjlbjf.length > 200)
                    {
                        errorMessageHansMap.put('detail_f_sfjlbjf_tbl_ld_dyhlh_detail', '长度不能超过<a style="color:red">200</a>个字');
                    }

                    if (tbl_ld_dyhlh_detail.f_khzt.length > 200)
                    {
                        errorMessageHansMap.put('detail_f_khzt_tbl_ld_dyhlh_detail', '长度不能超过<a style="color:red">200</a>个字');
                    }
                    if (tbl_ld_dyhlh_detail.f_khzt.length < 1)
                    {
                        errorMessageHansMap.put('detail_f_khzt_tbl_ld_dyhlh_detail', '不能为空');
                    }

                    if (tbl_ld_dyhlh_detail.f_khbz.length > 200)
                    {
                        errorMessageHansMap.put('detail_f_khbz_tbl_ld_dyhlh_detail', '长度不能超过<a style="color:red">200</a>个字');
                    }
                    if (tbl_ld_dyhlh_detail.f_yhm.length > 200)
                    {
                        errorMessageHansMap.put('detail_f_yhm_tbl_ld_dyhlh_detail', '长度不能超过<a style="color:red">200</a>个字');
                    }

                    if (tbl_ld_dyhlh_detail.f_jfm.length > 200)
                    {
                        errorMessageHansMap.put('detail_f_jfm_tbl_ld_dyhlh_detail', '长度不能超过<a style="color:red">200</a>个字');
                    }
                    if (tbl_ld_dyhlh_detail.f_yhm.length < 1)
                    {
                        errorMessageHansMap.put('detail_f_yhm_tbl_ld_dyhlh_detail', '不能为空');
                    }

                    if (tbl_ld_dyhlh_detail.f_jfm.length < 1)
                    {
                        errorMessageHansMap.put('detail_f_jfm_tbl_ld_dyhlh_detail', '不能为空');
                    }
                    if (tbl_ld_dyhlh_detail.f_dh.length > 200)
                    {
                        errorMessageHansMap.put('detail_f_dh_tbl_ld_dyhlh_detail', '长度不能超过<a style="color:red">200</a>个字');
                    }

                    if (tbl_ld_dyhlh_detail.f_dz.length > 200)
                    {
                        errorMessageHansMap.put('detail_f_dz_tbl_ld_dyhlh_detail', '长度不能超过<a style="color:red">200</a>个字');
                    }
                    if (tbl_ld_dyhlh_detail.f_sfzh.length > 200)
                    {
                        errorMessageHansMap.put('detail_f_sfzh_tbl_ld_dyhlh_detail', '长度不能超过<a style="color:red">200</a>个字');
                    }

                    if (tbl_ld_dyhlh_detail.f_sfzfj.length > 4000)
                    {
                        errorMessageHansMap.put('detail_f_sfzfj_tbl_ld_dyhlh_detail', '长度不能超过<a style="color:red">4000</a>个字');
                    }
                    if (tbl_ld_dyhlh_detail.f_qtfj.length > 4000)
                    {
                        errorMessageHansMap.put('detail_f_qtfj_tbl_ld_dyhlh_detail', '长度不能超过<a style="color:red">4000</a>个字');
                    }
                    if (tbl_ld_dyhlh_detail.f_yhzt.length > 200)
                    {
                        errorMessageHansMap.put('detail_f_yhzt_tbl_ld_dyhlh_detail', '长度不能超过<a style="color:red">200</a>个字');
                    }
                    if (tbl_ld_dyhlh_detail.f_yhzt.length < 1)
                    {
                        errorMessageHansMap.put('detail_f_yhzt_tbl_ld_dyhlh_detail', '不能为空');
                    }
                    if (tbl_ld_dyhlh_detail.f_yhbz.length > 200)
                    {
                        errorMessageHansMap.put('detail_f_yhbz_tbl_ld_dyhlh_detail', '长度不能超过<a style="color:red">200</a>个字');
                    }
                    if (tbl_ld_dyhlh_detail.f_sqr.length > 200)
                    {
                        errorMessageHansMap.put('detail_f_sqr_tbl_ld_dyhlh_detail', '长度不能超过<a style="color:red">200</a>个字');
                    }

                    if (tbl_ld_dyhlh_detail.f_sqrid.length > 200)
                    {
                        errorMessageHansMap.put('detail_f_sqrid_tbl_ld_dyhlh_detail', '长度不能超过<a style="color:red">200</a>个字');
                    }

                    //------------------------------------------------------------
                    if (tbl_ld_dyhlh_detail.f_czr.length > 200)
                    {
                        errorMessageHansMap.put('detail_f_czr_tbl_ld_dyhlh_detail', '长度不能超过<a style="color:red">200</a>个字');
                    }

                    if (tbl_ld_dyhlh_detail.f_czrid.length > 200)
                    {
                        errorMessageHansMap.put('detail_f_czrid_tbl_ld_dyhlh_detail', '长度不能超过<a style="color:red">200</a>个字');
                    }
                    if (tbl_ld_dyhlh_detail.f_yslx.length > 200)
                    {
                        errorMessageHansMap.put('detail_f_yslx_tbl_ld_dyhlh_detail', '长度不能超过<a style="color:red">200</a>个字');
                    }

                    if (tbl_ld_dyhlh_detail.f_yslx.length < 1)
                    {
                        errorMessageHansMap.put('detail_f_yslx_tbl_ld_dyhlh_detail', '长度不能小于<a style="color:red">1</a>个字');
                    }
                    if (tbl_ld_dyhlh_detail.f_sfts.length > 200)
                    {
                        errorMessageHansMap.put('detail_f_sfts_tbl_ld_dyhlh_detail', '长度不能超过<a style="color:red">200</a>个字');
                    }

                    if (tbl_ld_dyhlh_detail.f_tsyx.length > 200)
                    {
                        errorMessageHansMap.put('detail_f_tsyx_tbl_ld_dyhlh_detail', '长度不能超过<a style="color:red">200</a>个字');
                    }

                    if (tbl_ld_dyhlh_detail.f_tsyxzh.length > 200)
                    {
                        errorMessageHansMap.put('detail_f_tsyxzh_tbl_ld_dyhlh_detail', '长度不能超过<a style="color:red">200</a>个字');
                    }

                    if (tbl_ld_dyhlh_detail.f_htbh.length > 200)
                    {
                        errorMessageHansMap.put('detail_f_htbh_tbl_ld_dyhlh_detail', '长度不能超过<a style="color:red">200</a>个字');
                    }


                    if (tbl_ld_dyhlh_detail.f_htfj.length > 4000)
                    {
                        errorMessageHansMap.put('detail_f_htfj_tbl_ld_dyhlh_detail', '长度不能超过<a style="color:red">4000</a>个字');
                    }


                    if (tbl_ld_dyhlh_detail.f_sfzzs.length > 200)
                    {
                        errorMessageHansMap.put('detail_f_sfzzs_tbl_ld_dyhlh_detail', '长度不能超过<a style="color:red">200</a>个字');
                    }


                    if (tbl_ld_dyhlh_detail.f_lxth.length > 200)
                    {
                        errorMessageHansMap.put('detail_f_lxth_tbl_ld_dyhlh_detail', '长度不能超过<a style="color:red">200</a>个字');
                    }
                    //if (tbl_ld_dyhlh_detail.f_lxth.length < 1)
                    //{
                    //    errorMessageHansMap.put('detail_f_lxth_tbl_ld_dyhlh_detail', '必须填写');
                    //}

                    if (tbl_ld_dyhlh_detail.f_rs.length > 200)
                    {
                        errorMessageHansMap.put('detail_f_rs_tbl_ld_dyhlh_detail', '长度不能超过<a style="color:red">200</a>个字');
                    }

                    if (tbl_ld_dyhlh_detail.f_rs != "" && !/^[0-9]+\.?[0-9]*$/.test(tbl_ld_dyhlh_detail.f_rs))
                    {
                        errorMessageHansMap.put('detail_f_rs_tbl_ld_dyhlh_detail', '必须填写数字');
                    }

                    if (tbl_ld_dyhlh_detail.f_sbpp.length > 200)
                    {
                        errorMessageHansMap.put('detail_f_sbpp_tbl_ld_dyhlh_detail', '长度不能超过<a style="color:red">200</a>个字');
                    }

                    if (tbl_ld_dyhlh_detail.f_mph.length > 200)
                    {
                        errorMessageHansMap.put('detail_f_mph_tbl_ld_dyhlh_detail', '长度不能超过<a style="color:red">200</a>个字');
                    }
                    if (tbl_ld_dyhlh_detail.f_sbkj.length > 200)
                    {
                        errorMessageHansMap.put('detail_f_sbkj_tbl_ld_dyhlh_detail', '长度不能超过<a style="color:red">200</a>个字');
                    }

                    if (tbl_ld_dyhlh_detail.f_sblx.length > 200)
                    {
                        errorMessageHansMap.put('detail_f_sblx_tbl_ld_dyhlh_detail', '长度不能超过<a style="color:red">200</a>个字');
                    }
                    if (tbl_ld_dyhlh_detail.f_sblx.length < 1)
                    {
                        errorMessageHansMap.put('detail_f_sblx_tbl_ld_dyhlh_detail', '必须填写');
                    }
                    if (tbl_ld_dyhlh_detail.f_jllx.length > 200)
                    {
                        errorMessageHansMap.put('detail_f_jllx_tbl_ld_dyhlh_detail', '长度不能超过<a style="color:red">200</a>个字');
                    }
                    if (tbl_ld_dyhlh_detail.f_jllx.length < 1)
                    {
                        errorMessageHansMap.put('detail_f_jllx_tbl_ld_dyhlh_detail', '必须填写');
                    }
                    if (tbl_ld_dyhlh_detail.f_synx.length > 200)
                    {
                        errorMessageHansMap.put('detail_f_synx_tbl_ld_dyhlh_detail', '长度不能超过<a style="color:red">200</a>个字');
                    }
                    if (tbl_ld_dyhlh_detail.f_synx.length < 1)
                    {
                        errorMessageHansMap.put('detail_f_synx_tbl_ld_dyhlh_detail', '必须填写');
                    }
                    if (tbl_ld_dyhlh_detail.f_synx != "" && !/^[0-9]+\.?[0-9]*$/.test(tbl_ld_dyhlh_detail.f_synx))
                    {
                        errorMessageHansMap.put('detail_f_synx_tbl_ld_dyhlh_detail', '必须填写数字');
                    }
                    if (tbl_ld_dyhlh_detail.f_qfzt.length > 200)
                    {
                        errorMessageHansMap.put('detail_f_qfzt_tbl_ld_dyhlh_detail', '长度不能超过<a style="color:red">200</a>个字');
                    }

                    if (tbl_ld_dyhlh_detail.f_cszm.length > 200)
                    {
                        errorMessageHansMap.put('detail_f_cszm_tbl_ld_dyhlh_detail', '长度不能超过<a style="color:red">200</a>个字');
                    }
                    if (tbl_ld_dyhlh_detail.f_cszm != "" && !/^[0-9]+\.?[0-9]*$/.test(tbl_ld_dyhlh_detail.f_cszm))
                    {
                        errorMessageHansMap.put('detail_f_cszm_tbl_ld_dyhlh_detail', '必须填写数字');
                    }
                    if (tbl_ld_dyhlh_detail.f_sbzt.length > 200)
                    {
                        errorMessageHansMap.put('detail_f_sbzt_tbl_ld_dyhlh_detail', '长度不能超过<a style="color:red">200</a>个字');
                    }
                    if (tbl_ld_dyhlh_detail.f_sbzt.length < 1)
                    {
                        errorMessageHansMap.put('detail_f_sbzt_tbl_ld_dyhlh_detail', '不能为空');
                    }

                    if (tbl_ld_dyhlh_detail.f_sbfj.length > 4000)
                    {
                        errorMessageHansMap.put('detail_f_sbfj_tbl_ld_dyhlh_detail', '长度不能超过<a style="color:red">4000</a>个字');
                    }

                    if (tbl_ld_dyhlh_detail.f_sbbz.length > 200)
                    {
                        errorMessageHansMap.put('detail_f_sbbz_tbl_ld_dyhlh_detail', '长度不能超过<a style="color:red">200</a>个字');
                    }
                    //----------------------------------------------------
                    if (tbl_ld_dyhlh_detail.f_khfz.length > 200)
                    {
                        errorMessageHansMap.put('detail_f_khfz_tbl_ld_dyhlh_detail', '长度不能超过<a style="color:red">200</a>个字');
                    }
                    if (tbl_ld_dyhlh_detail.f_khfz.length < 1)
                    {
                        errorMessageHansMap.put('detail_f_khfz_tbl_ld_dyhlh_detail', '必须填写');
                    }

                    if (tbl_ld_dyhlh_detail.f_yhfz.length > 200)
                    {
                        errorMessageHansMap.put('detail_f_yhfz_tbl_ld_dyhlh_detail', '长度不能超过<a style="color:red">200</a>个字');
                    }



                    if (tbl_ld_dyhlh_detail.f_sbfz.length > 200)
                    {
                        errorMessageHansMap.put('detail_f_sbfz_tbl_ld_dyhlh_detail', '长度不能超过<a style="color:red">200</a>个字');
                    }

                    if (tbl_ld_dyhlh_detail.f_cbbh.length > 200)
                    {
                        errorMessageHansMap.put('detail_f_cbbh_tbl_ld_dyhlh_detail', '长度不能超过<a style="color:red">200</a>个字');
                    }
                    if (tbl_ld_dyhlh_detail.f_cbbh.length < 1)
                    {
                        errorMessageHansMap.put('detail_f_cbbh_tbl_ld_dyhlh_detail', '必须填写');
                    }

                    if (tbl_ld_dyhlh_detail.f_cbxh.length > 200)
                    {
                        errorMessageHansMap.put('detail_f_cbxh_tbl_ld_dyhlh_detail', '长度不能超过<a style="color:red">200</a>个字');
                    }

                    if (tbl_ld_dyhlh_detail.f_dy.length > 200)
                    {
                        errorMessageHansMap.put('detail_f_dy_tbl_ld_dyhlh_detail', '长度不能超过<a style="color:red">200</a>个字');
                    }

                    if (tbl_ld_dyhlh_detail.f_sc.length > 200)
                    {
                        errorMessageHansMap.put('detail_f_sc_tbl_ld_dyhlh_detail', '长度不能超过<a style="color:red">200</a>个字');
                    }

                    if (tbl_ld_dyhlh_detail.f_qy.length > 200)
                    {
                        errorMessageHansMap.put('detail_f_qy_tbl_ld_dyhlh_detail', '长度不能超过<a style="color:red">200</a>个字');
                    }

                    if (tbl_ld_dyhlh_detail.f_pq.length > 200)
                    {
                        errorMessageHansMap.put('detail_f_pq_tbl_ld_dyhlh_detail', '长度不能超过<a style="color:red">200</a>个字');
                    }
                    if (tbl_ld_dyhlh_detail.f_sbdz.length > 200)
                    {
                        errorMessageHansMap.put('detail_f_sbdz_tbl_ld_dyhlh_detail', '长度不能超过<a style="color:red">200</a>个字');
                    }
                    if (tbl_ld_dyhlh_detail.f_zhcbrq.split(' ')[0].split('-')[2] != getLastDay(tbl_ld_dyhlh_detail.f_zhcbrq.split('-')[0], tbl_ld_dyhlh_detail.f_zhcbrq.split('-')[1]).toString())
                    {
                        errorMessageHansMap.put('detail_f_zhcbrq_tbl_ld_dyhlh_detail_date', '最后抄表日期必须为本月的最后一天');
                    }
                    break;
            }
            if (tbl_ld_dyhlh_detail.f_value1.length > 200)
            {
                errorMessageHansMap.put('detail_f_value1_tbl_ld_dyhlh_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_dyhlh_detail.f_value2.length > 200)
            {
                errorMessageHansMap.put('detail_f_value2_tbl_ld_dyhlh_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_dyhlh_detail.f_value3.length > 200)
            {
                errorMessageHansMap.put('detail_f_value3_tbl_ld_dyhlh_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_dyhlh_detail.f_value4.length > 200)
            {
                errorMessageHansMap.put('detail_f_value4_tbl_ld_dyhlh_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_dyhlh_detail.f_value5.length > 200)
            {
                errorMessageHansMap.put('detail_f_value5_tbl_ld_dyhlh_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_dyhlh_detail.f_value6.length > 200)
            {
                errorMessageHansMap.put('detail_f_value6_tbl_ld_dyhlh_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_dyhlh_detail.f_value7.length > 200)
            {
                errorMessageHansMap.put('detail_f_value7_tbl_ld_dyhlh_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_dyhlh_detail.f_value8.length > 200)
            {
                errorMessageHansMap.put('detail_f_value8_tbl_ld_dyhlh_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_dyhlh_detail.f_value9.length > 200)
            {
                errorMessageHansMap.put('detail_f_value9_tbl_ld_dyhlh_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_dyhlh_detail.f_value10.length > 200)
            {
                errorMessageHansMap.put('detail_f_value10_tbl_ld_dyhlh_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

        

            if (tbl_ld_dyhlh_detail.fk_tbl_maintable_sys_id.length > 200)
            {
                errorMessageHansMap.put('detail_fk_tbl_maintable_sys_id_tbl_ld_dyhlh_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_dyhlh_detail.f_dyhlhbh.length > 200)
            {
                errorMessageHansMap.put('detail_f_dyhlhbh_tbl_ld_dyhlh_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

           
           

            if (tbl_ld_dyhlh_detail.f_lcfj.length > 4000)
            {
                errorMessageHansMap.put('detail_f_lcfj_tbl_ld_dyhlh_detail', '长度不能超过<a style="color:red">4000</a>个字');
            }

            if (tbl_ld_dyhlh_detail.f_zt.length > 200)
            {
                errorMessageHansMap.put('detail_f_zt_tbl_ld_dyhlh_detail', '长度不能超过<a style="color:red">200</a>个字');
            }

            if (tbl_ld_dyhlh_detail.f_bz.length > 4000)
            {
                errorMessageHansMap.put('detail_f_bz_tbl_ld_dyhlh_detail', '长度不能超过<a style="color:red">4000</a>个字');
            }

            if (errorMessageHansMap.keys().length > 0)
            {
                _validateMessage.show(errorMessageHansMap, errorMessagePlacementHansMap, true);
                callBackFunction.fail('');
            }
            else
            {
                _validateMessage.hidden();
                callBackFunction.success(tbl_ld_dyhlh_detail);
            }
        }
        catch (ex)
        {
            callBackFunction.fail(ex.message);
        }

    },

        //---------------------------------------------------------------------------------
        // ---------------------------------数据操作------------------------------------
        //---------------------------------------------------------------------------------
        /* 
        *  
        *  方法:getData
        *  参数:callbackFunction
        *  从数据库获取数据，根据that._pr_sys_id ，返回数据对象
        */
        getData = function (callbackFunction)
        {
            var whereClause = ' fk_tbl_maintable_sys_id = \'' + that._pr_fk_tbl_maintable_sys_id + '\'';
            var orderByString = '';
            var columnsString = 'f_value1^f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^f_dyhlhbh^f_mc^f_sqr^f_sqrid^f_sqsj^f_czr^f_czrid^f_czrsj^fk_tbl_maintable_sys_id^f_khfz^f_khfzid^f_yslx^f_yslxid^f_ycje^f_zhcbrq^f_tbbh^f_tjjzsf^f_tjjzpwf^f_sfjlbjf^f_jhysl^f_sqysl^f_khzt^f_khztid^f_khbz^f_cbbh^f_cbbhid^f_cbxh^f_yhm^f_jfm^f_khrq^f_yhfz^f_yhfzid^f_dh^f_dz^f_dy^f_dyid^f_sc^f_scid^f_qy^f_qyid^f_pq^f_pqid^f_sfts^f_tsyx^f_tsyxid^f_tsyxzh^f_htbh^f_htqdrq^f_sfzh^f_htfj^f_qtfj^f_sfzfj^f_sfzzs^f_yhzt^f_yhztid^f_yhbz^f_lxth^f_sbfz^f_sbfzid^f_rs^f_sbpp^f_mph^f_sbdz^f_sbkj^f_sbkjid^f_sblx^f_sblxid^f_jllx^f_jllxid^f_cszm^f_azrq^f_synx^f_qfzt^f_sbzt^f_sbztid^f_sbfj^f_sbbz^f_zt^f_ztid^f_lcfj^f_bz^sys_id';
            var pageSizeString = '';
            var pageIndexString = '';
            var data = {
                whereString: whereClause,
                orderByString: orderByString,
                columnsString: columnsString,
                pageSizeString: pageSizeString,
                pageIndexString: pageIndexString,
                clientInf: _clientInf
            };
            doAjaxFunction(_serviceUrl, 'GetList', data, {
                success: function (message)
                {
                    var messageJson = (new Function("", "return " + message))();
                    that._pr_sys_id = messageJson.rows[0]['sys_id'];
                    callbackFunction.success(messageJson.rows[0]);
                },
                fail: function (message)
                {
                    _blockMessage.show('GetList执行失败<br/>' + message, 'fail');
                }
            });
        },

        /* 
        *  
        *  方法:updateData
        *  参数:tbl_ld_dyhlh_detail, callbackFunction
        *  向数据库更新数据，根据数据对象
        */
        updateData = function (tbl_ld_dyhlh_detail, callbackFunction)
        {

            var d = new Date();
            var columns = 'f_value1^f_value2^f_value3^f_value4^f_value5^f_value6^f_value7^f_value8^f_value9^f_value10^f_dyhlhbh^f_mc^f_sqr^f_sqrid^f_sqsj^f_czr^f_czrid^f_czrsj^fk_tbl_maintable_sys_id^f_khfz^f_khfzid^f_yslx^f_yslxid^f_ycje^f_zhcbrq^f_tbbh^f_tjjzsf^f_tjjzpwf^f_sfjlbjf^f_jhysl^f_sqysl^f_khzt^f_khztid^f_khbz^f_cbbh^f_cbbhid^f_cbxh^f_yhm^f_jfm^f_khrq^f_yhfz^f_yhfzid^f_dh^f_dz^f_dy^f_dyid^f_sc^f_scid^f_qy^f_qyid^f_pq^f_pqid^f_sfts^f_tsyx^f_tsyxid^f_tsyxzh^f_htbh^f_htqdrq^f_sfzh^f_htfj^f_qtfj^f_sfzfj^f_sfzzs^f_yhzt^f_yhztid^f_yhbz^f_lxth^f_sbfz^f_sbfzid^f_rs^f_sbpp^f_mph^f_sbdz^f_sbkj^f_sbkjid^f_sblx^f_sblxid^f_jllx^f_jllxid^f_cszm^f_azrq^f_synx^f_qfzt^f_sbzt^f_sbztid^f_sbfj^f_sbbz^f_zt^f_ztid^f_lcfj^f_bz^sys_id^sys_lastedituserid^sys_lasteditusername^sys_lasteditdate';
            var json = {
                sys_id: that._pr_sys_id,

                f_value1: "已保存",

                f_value2: tbl_ld_dyhlh_detail.f_value2,

                f_value3: tbl_ld_dyhlh_detail.f_value3,

                f_value4: tbl_ld_dyhlh_detail.f_value4,

                f_value5: tbl_ld_dyhlh_detail.f_value5,

                f_value6: tbl_ld_dyhlh_detail.f_value6,

                f_value7: tbl_ld_dyhlh_detail.f_value7,

                f_value8: tbl_ld_dyhlh_detail.f_value8,

                f_value9: tbl_ld_dyhlh_detail.f_value9,

                f_value10: tbl_ld_dyhlh_detail.f_value10,

                fk_tbl_maintable_sys_id: tbl_ld_dyhlh_detail.fk_tbl_maintable_sys_id,

                f_dyhlhbh: tbl_ld_dyhlh_detail.f_dyhlhbh,

                f_mc: tbl_ld_dyhlh_detail.f_mc,

                f_sqr: tbl_ld_dyhlh_detail.f_sqr,

                f_sqrid: tbl_ld_dyhlh_detail.f_sqrid,

                f_sqsj: tbl_ld_dyhlh_detail.f_sqsj,

                f_czr: tbl_ld_dyhlh_detail.f_czr,

                f_czrid: tbl_ld_dyhlh_detail.f_czrid,

                f_czrsj: tbl_ld_dyhlh_detail.f_czrsj,

                f_khfz: tbl_ld_dyhlh_detail.f_khfz,
                f_khfzid: tbl_ld_dyhlh_detail.f_khfzid,

                f_yslx: tbl_ld_dyhlh_detail.f_yslx,

                f_yslxid: tbl_ld_dyhlh_detail.f_yslxid,

                f_ycje: tbl_ld_dyhlh_detail.f_ycje,

                f_zhcbrq: tbl_ld_dyhlh_detail.f_zhcbrq,

                f_tbbh: tbl_ld_dyhlh_detail.f_tbbh,

                f_sfjlbjf: tbl_ld_dyhlh_detail.f_sfjlbjf,

                f_tjjzsf: tbl_ld_dyhlh_detail.f_tjjzsf,

                f_tjjzpwf: tbl_ld_dyhlh_detail.f_tjjzpwf,

                f_jhysl: tbl_ld_dyhlh_detail.f_jhysl,

                f_sqysl: tbl_ld_dyhlh_detail.f_sqysl,

                f_khzt: tbl_ld_dyhlh_detail.f_khzt,
                f_khztid: tbl_ld_dyhlh_detail.f_khztid,

                f_khbz: tbl_ld_dyhlh_detail.f_khbz,

                f_cbbh: tbl_ld_dyhlh_detail.f_cbbh,

                f_cbbhid: tbl_ld_dyhlh_detail.f_cbbhid,

                f_cbxh: tbl_ld_dyhlh_detail.f_cbxh,

                f_yhm: tbl_ld_dyhlh_detail.f_yhm,

                f_jfm: tbl_ld_dyhlh_detail.f_jfm,

                f_khrq: tbl_ld_dyhlh_detail.f_khrq,

                f_yhfz: tbl_ld_dyhlh_detail.f_yhfz,

                f_yhfzid: tbl_ld_dyhlh_detail.f_yhfzid,

                f_dh: tbl_ld_dyhlh_detail.f_dh,

                f_dz: tbl_ld_dyhlh_detail.f_dz,

                f_dy: tbl_ld_dyhlh_detail.f_dy,

                f_dyid: tbl_ld_dyhlh_detail.f_dyid,

                f_sc: tbl_ld_dyhlh_detail.f_sc,

                f_scid: tbl_ld_dyhlh_detail.f_scid,

                f_qy: tbl_ld_dyhlh_detail.f_qy,

                f_qyid: tbl_ld_dyhlh_detail.f_qyid,

                f_pq: tbl_ld_dyhlh_detail.f_pq,
                f_pqid: tbl_ld_dyhlh_detail.f_pqid,

                f_sfts: tbl_ld_dyhlh_detail.f_sfts,

                f_tsyx: tbl_ld_dyhlh_detail.f_tsyx,

                f_tsyxid: tbl_ld_dyhlh_detail.f_tsyxid,

                f_tsyxzh: tbl_ld_dyhlh_detail.f_tsyxzh,

                f_htbh: tbl_ld_dyhlh_detail.f_htbh,

                f_htqdrq: tbl_ld_dyhlh_detail.f_htqdrq,

                f_sfzh: tbl_ld_dyhlh_detail.f_sfzh,

                f_htfj: tbl_ld_dyhlh_detail.f_htfj,

                f_qtfj: tbl_ld_dyhlh_detail.f_qtfj,

                f_sfzfj: tbl_ld_dyhlh_detail.f_sfzfj,

                f_sfzzs: tbl_ld_dyhlh_detail.f_sfzzs,

                f_yhzt: tbl_ld_dyhlh_detail.f_yhzt,
                f_yhztid: tbl_ld_dyhlh_detail.f_yhztid,

                f_yhbz: tbl_ld_dyhlh_detail.f_yhbz,

                f_lxth: tbl_ld_dyhlh_detail.f_lxth,

                f_sbfz: tbl_ld_dyhlh_detail.f_sbfz,

                f_sbfzid: tbl_ld_dyhlh_detail.f_sbfzid,

                f_rs: tbl_ld_dyhlh_detail.f_rs,

                f_sbpp: tbl_ld_dyhlh_detail.f_sbpp,

                f_mph: tbl_ld_dyhlh_detail.f_mph,

                f_sbdz: tbl_ld_dyhlh_detail.f_sbdz,

                f_sbkj: tbl_ld_dyhlh_detail.f_sbkj,

                f_sbkjid: tbl_ld_dyhlh_detail.f_sbkjid,

                f_sblx: tbl_ld_dyhlh_detail.f_sblx,
                f_sblxid: tbl_ld_dyhlh_detail.f_sblxid,

                f_jllx: tbl_ld_dyhlh_detail.f_jllx,

                f_jllxid: tbl_ld_dyhlh_detail.f_jllxid,

                f_cszm: tbl_ld_dyhlh_detail.f_cszm,

                f_azrq: tbl_ld_dyhlh_detail.f_azrq,

                f_synx: tbl_ld_dyhlh_detail.f_synx,

                f_qfzt: tbl_ld_dyhlh_detail.f_qfzt,

                f_sbzt: tbl_ld_dyhlh_detail.f_sbzt,

                f_sbztid: tbl_ld_dyhlh_detail.f_sbztid,

                f_sbfj: tbl_ld_dyhlh_detail.f_sbfj,

                f_sbbz: tbl_ld_dyhlh_detail.f_sbbz,

                f_lcfj: tbl_ld_dyhlh_detail.f_lcfj,

                f_zt: tbl_ld_dyhlh_detail.f_zt,

                f_ztid: tbl_ld_dyhlh_detail.f_ztid,

                f_bz: tbl_ld_dyhlh_detail.f_bz.formatStringRN(),

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
                    callbackFunction.success();
                },
                fail: function (message)
                {
                    callbackFunction.fail(message);
                },
                error: function (message)
                {
                    callbackFunction.fail(message);
                }
            });
        },

    //---------------------------------------------------------------------------------
    // ---------------------------------控件事件------------------------------------
    //---------------------------------------------------------------------------------

        /* 
        *  
        *  方法:f_sqsj_time_onchange
        *  参数:
        *  申请时间 onchange事件
        */
            f_sqsj_time_onchange = function (e)
            {
                var r = e.currentTarget.id
            },
        /* 
        *  
        *  方法:f_sqsj_date_onchange
        *  参数:
        *  申请时间 onchange事件
        */
            f_sqsj_date_onchange = function (ev)
            {
                var controlid = e.target.id
            },

        /* 
        *  
        *  方法:f_czrsj_time_onchange
        *  参数:
        *  操作人时间 onchange事件
        */
            f_czrsj_time_onchange = function (e)
            {
                var r = e.currentTarget.id
            },
        /* 
        *  
        *  方法:f_czrsj_date_onchange
        *  参数:
        *  操作人时间 onchange事件
        */
            f_czrsj_date_onchange = function (ev)
            {
                var controlid = e.target.id
            },

            /* 
            *  
            *  方法:f_khfz_onchange
            *  参数:changeEventParameter
            *  客户分组onchange事件
            */
            f_khfz_onchange = function (e)
            {
                var controlid = e.target.id;
            },

            /* 
            *  
            *  方法:f_yslx_onchange
            *  参数:changeEventParameter
            *  用水类型onchange事件
            */
            f_yslx_onchange = function (e)
            {
                var controlid = e.target.id;
            },

        /* 
        *  
        *  方法:f_zhcbrq_time_onchange
        *  参数:
        *  最后抄表日期 onchange事件
        */
            f_zhcbrq_time_onchange = function (e)
            {
                var r = e.currentTarget.id
            },
        /* 
        *  
        *  方法:f_zhcbrq_date_onchange
        *  参数:
        *  最后抄表日期 onchange事件
        */
            f_zhcbrq_date_onchange = function (ev)
            {
                var controlid = e.target.id
            },

            /* 
            *  
            *  方法:f_sfjlbjf_onchange
            *  参数:event, state
            *  是否计量不计费切换事件
            */
            f_sfjlbjf_onchange = function (event, state)
            {
                var controlid = event.currentTarget.id;
            },

            /* 
            *  
            *  方法:f_khzt_onchange
            *  参数:changeEventParameter
            *  客户状态onchange事件
            */
            f_khzt_onchange = function (e)
            {
                var controlid = e.target.id;
            },

            /* 
            *  
            *  方法:f_cbbh_onchange
            *  参数:changeEventParameter
            *  抄本编号onchange事件
            */
            f_cbbh_onchange = function (e)
            {
                var controlid = e.target.id;
            },

        /* 
        *  
        *  方法:f_khrq_time_onchange
        *  参数:
        *  开户日期 onchange事件
        */
            f_khrq_time_onchange = function (e)
            {
                var r = e.currentTarget.id
            },
        /* 
        *  
        *  方法:f_khrq_date_onchange
        *  参数:
        *  开户日期 onchange事件
        */
            f_khrq_date_onchange = function (ev)
            {
                var controlid = e.target.id
            },

            /* 
            *  
            *  方法:f_yhfz_onchange
            *  参数:changeEventParameter
            *  用户分组onchange事件
            */
            f_yhfz_onchange = function (e)
            {
                var controlid = e.target.id;
            },





            /* 
            *  
            *  方法:f_sfts_onchange
            *  参数:event, state
            *  是否托收切换事件
            */
            f_sfts_onchange = function (event, state)
            {
                var controlid = event.currentTarget.id;
            },

            /* 
            *  
            *  方法:f_tsyx_onchange
            *  参数:changeEventParameter
            *  托收银行onchange事件
            */
            f_tsyx_onchange = function (e)
            {
                var controlid = e.target.id;
            },

            /* 
        *  
        *  方法:f_htqdrq_time_onchange
        *  参数:
        *  合同签订日期 onchange事件
        */
            f_htqdrq_time_onchange = function (e)
            {
                var r = e.currentTarget.id
            },
            /* 
        *  
        *  方法:f_htqdrq_date_onchange
        *  参数:
        *  合同签订日期 onchange事件
        */
            f_htqdrq_date_onchange = function (ev)
            {
                var controlid = e.target.id
            },

            /* 
        *  
        *  方法:f_htfj_onchange
        *  参数:
        *  合同附件 onchange事件
        */
            f_htfj_onchange = function ()
            {
                var fileid = controlObj.fileuploaderid('detail_f_htfj_tbl_ld_dyhlh_detail');
            },

            /* 
        *  
        *  方法:f_qtfj_onchange
        *  参数:
        *  其他附件 onchange事件
        */
            f_qtfj_onchange = function ()
            {
                var fileid = controlObj.fileuploaderid('detail_f_qtfj_tbl_ld_dyhlh_detail');
            },

            /* 
        *  
        *  方法:f_sfzfj_onchange
        *  参数:
        *  身份证附件 onchange事件
        */
            f_sfzfj_onchange = function ()
            {
                var fileid = controlObj.fileuploaderid('detail_f_sfzfj_tbl_ld_dyhlh_detail');
            },

            /* 
          *  
          *  方法:f_sfzzs_onchange
          *  参数:event, state
          *  是否增值税切换事件
          */
            f_sfzzs_onchange = function (event, state)
            {
                var controlid = event.currentTarget.id;
            },

            /* 
          *  
          *  方法:f_yhzt_onchange
          *  参数:changeEventParameter
          *  用户状态onchange事件
          */
            f_yhzt_onchange = function (e)
            {
                var controlid = e.target.id;
            },

            /* 
          *  
          *  方法:f_sbfz_onchange
          *  参数:changeEventParameter
          *  水表分组onchange事件
          */
            f_sbfz_onchange = function (e)
            {
                var controlid = e.target.id;
            },

            /* 
            *  
            *  方法:f_sbkj_onchange
            *  参数:changeEventParameter
            *  水表口径onchange事件
            */
            f_sbkj_onchange = function (e)
            {
                var controlid = e.target.id;
            },

            /* 
            *  
            *  方法:f_sblx_onchange
            *  参数:changeEventParameter
            *  水表类型onchange事件
            */
            f_sblx_onchange = function (e)
            {
                var controlid = e.target.id;
            },

            /* 
            *  
            *  方法:f_jllx_onchange
            *  参数:changeEventParameter
            *  计量类型onchange事件
            */
            f_jllx_onchange = function (e)
            {
                var controlid = e.target.id;
            },

            /* 
        *  
        *  方法:f_azrq_time_onchange
        *  参数:
        *  安装日期 onchange事件
        */
            f_azrq_time_onchange = function (e)
            {
                var r = e.currentTarget.id
            },

           /* 
        *  
        *  方法:f_azrq_date_onchange
        *  参数:
        *  安装日期 onchange事件
        */
            f_azrq_date_onchange = function (ev)
            {
                var controlid = e.target.id
            },

            /* 
            *  
            *  方法:f_qfzt_onchange
            *  参数:event, state
            *  铅封状态切换事件
            */
            f_qfzt_onchange = function (event, state)
            {
                var controlid = event.currentTarget.id;
            },

            /* 
            *  
            *  方法:f_sbzt_onchange
            *  参数:changeEventParameter
            *  水表状态onchange事件
            */
            f_sbzt_onchange = function (e)
            {
                var controlid = e.target.id;
            },

            /* 
        *  
        *  方法:f_sbfj_onchange
        *  参数:
        *  水表附件 onchange事件
        */
            f_sbfj_onchange = function ()
            {
                var fileid = controlObj.fileuploaderid('detail_f_sbfj_tbl_ld_dyhlh_detail');
            },

            /* 
        *  
        *  方法:f_lcfj_onchange
        *  参数:
        *  流程附件 onchange事件
        */
            f_lcfj_onchange = function ()
            {
                var fileid = controlObj.fileuploaderid('detail_f_lcfj_tbl_ld_dyhlh_detail');
            },

            /* 
            *  
            *  方法:f_zt_onchange
            *  参数:changeEventParameter
            *  状态onchange事件
            */
            f_zt_onchange = function (e)
            {
                var controlid = e.target.id;
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


        /* 
        *  
        *  方法:f_dy_onchange
        *  参数:changeEventParameter
        *  地域onchange事件
        */
            f_dy_onchange = function (e, callbackfunction)
            {
                //// 
                if (e.added != undefined)
                {
                    var nodeid = e.added.id;
                    getArea(nodeid, {
                        success: function (jsonArray)
                        {

                            controlObj.singledropdownlistinit('detail_f_sc_tbl_ld_dyhlh_detail', jsonArray, f_sc_onchange);
                            controlObj.singledropdownlistid('detail_f_sc_tbl_ld_dyhlh_detail', '-1');
                            controlObj.singledropdownlist('detail_f_sc_tbl_ld_dyhlh_detail', '');


                            if (callbackfunction != undefined)
                            {
                                callbackfunction.success();
                            }
                            else
                            {
                                controlObj.singledropdownlistinit('detail_f_qy_tbl_ld_dyhlh_detail', _baseCodeHashMap.get('codeservice_0514'), f_qy_onchange);
                                controlObj.singledropdownlistid('detail_f_qy_tbl_ld_dyhlh_detail', '-1');
                                controlObj.singledropdownlist('detail_f_qy_tbl_ld_dyhlh_detail', '');

                                controlObj.singledropdownlistinit('detail_f_pq_tbl_ld_dyhlh_detail', _baseCodeHashMap.get('codeservice_0515'), f_pq_onchange);
                                controlObj.singledropdownlistid('detail_f_pq_tbl_ld_dyhlh_detail', '-1');
                                controlObj.singledropdownlist('detail_f_pq_tbl_ld_dyhlh_detail', '');

                            }
                        }
                    })
                }
                else
                {
                    controlObj.singledropdownlistinit('detail_f_sc_tbl_ld_dyhlh_detail', _baseCodeHashMap.get('codeservice_0513'), f_sc_onchange);
                    controlObj.singledropdownlistid('detail_f_sc_tbl_ld_dyhlh_detail', '-1');
                    controlObj.singledropdownlist('detail_f_sc_tbl_ld_dyhlh_detail', '');


                    controlObj.singledropdownlistinit('detail_f_qy_tbl_ld_dyhlh_detail', _baseCodeHashMap.get('codeservice_0514'), f_qy_onchange);
                    controlObj.singledropdownlistid('detail_f_qy_tbl_ld_dyhlh_detail', '-1');
                    controlObj.singledropdownlist('detail_f_qy_tbl_ld_dyhlh_detail', '');

                    controlObj.singledropdownlistinit('detail_f_pq_tbl_ld_dyhlh_detail', _baseCodeHashMap.get('codeservice_0515'), f_pq_onchange);
                    controlObj.singledropdownlistid('detail_f_pq_tbl_ld_dyhlh_detail', '-1');
                    controlObj.singledropdownlist('detail_f_pq_tbl_ld_dyhlh_detail', '');
                }


            },


        /* 
        *  
        *  方法:f_sc_onchange
        *  参数:changeEventParameter
        *  水厂onchange事件
        */
            f_sc_onchange = function (e, callbackfunction)
            {
                // // 
                if (e.added != undefined)
                {
                    var nodeid = e.added.id;
                    getArea(nodeid, {
                        success: function (jsonArray)
                        {

                            controlObj.singledropdownlistinit('detail_f_qy_tbl_ld_dyhlh_detail', jsonArray, f_qy_onchange);
                            controlObj.singledropdownlistid('detail_f_qy_tbl_ld_dyhlh_detail', '-1');
                            controlObj.singledropdownlist('detail_f_qy_tbl_ld_dyhlh_detail', '');
                            if (callbackfunction != undefined)
                            {
                                callbackfunction.success();
                            }
                            else
                            {


                                controlObj.singledropdownlistinit('detail_f_pq_tbl_ld_dyhlh_detail', _baseCodeHashMap.get('codeservice_0515'), f_pq_onchange);
                                controlObj.singledropdownlistid('detail_f_pq_tbl_ld_dyhlh_detail', '-1');
                                controlObj.singledropdownlist('detail_f_pq_tbl_ld_dyhlh_detail', '');
                            }
                        }
                    })
                }
                else
                {
                    controlObj.singledropdownlistinit('detail_f_qy_tbl_ld_dyhlh_detail', _baseCodeHashMap.get('codeservice_0514'), f_qy_onchange);
                    controlObj.singledropdownlistid('detail_f_qy_tbl_ld_dyhlh_detail', '-1');
                    controlObj.singledropdownlist('detail_f_qy_tbl_ld_dyhlh_detail', '');

                    controlObj.singledropdownlistinit('detail_f_pq_tbl_ld_dyhlh_detail', _baseCodeHashMap.get('codeservice_0515'), f_pq_onchange);
                    controlObj.singledropdownlistid('detail_f_pq_tbl_ld_dyhlh_detail', '-1');
                    controlObj.singledropdownlist('detail_f_pq_tbl_ld_dyhlh_detail', '');
                }


            },

        /* 
        *  
        *  方法:f_qy_onchange
        *  参数:changeEventParameter
        *  区域onchange事件
        */
            f_qy_onchange = function (e, callbackfunction)
            {
                // // 
                if (e.added != undefined)
                {
                    var nodeid = e.added.id;
                    // // 
                    getArea(nodeid, {
                        success: function (jsonArray)
                        {

                            controlObj.singledropdownlistinit('detail_f_pq_tbl_ld_dyhlh_detail', jsonArray, f_pq_onchange);
                            controlObj.singledropdownlistid('detail_f_pq_tbl_ld_dyhlh_detail', '-1');
                            controlObj.singledropdownlist('detail_f_pq_tbl_ld_dyhlh_detail', '');
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
                    controlObj.singledropdownlistinit('detail_f_pq_tbl_ld_dyhlh_detail', _baseCodeHashMap.get('codeservice_0515'), f_pq_onchange);
                    controlObj.singledropdownlistid('detail_f_pq_tbl_ld_dyhlh_detail', '-1');
                    controlObj.singledropdownlist('detail_f_pq_tbl_ld_dyhlh_detail', '');
                }


            },

        /* 
        *  
        *  方法:f_pq_onchange
        *  参数:changeEventParameter
        *  片区onchange事件
        */
            f_pq_onchange = function (e)
            {
                var controlid = e.target.id;
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
        _pr_sys_id: '',
        _pr_pagetype: '',
        _pr_fromurl: '',
        _pr_fromurlparam: '',
        _pr_appcode: '',

        //根据流程决定显示的内容以及是否进行disable
        _pr_isdisplay: '',

        _pr_fk_tbl_maintable_sys_id: '',
        //=================================================================================
        //                                      公有方法 
        //=================================================================================

        /* 
        *  
        *  方法:init
        *  参数:
        *  页面初始化方法
        */
        init: function (callBackFunction)
        {
            try
            {

                //初始化页面控件的代码数据，放到hashmap中
                initBaseCode({
                    success: function ()
                    {
                        //初始化页面控件
                        initControl({
                            success: function ()
                            {

                                //绑定数据
                                that.bindPage({
                                    success: function ()
                                    {
                                _validateMessage = new validateMessage('btn_command_save_tbl_ld_dyhlh_detail');

                                _ladda_btn_command_save = Ladda.create('btn_command_save_tbl_ld_dyhlh_detail');

                                switch (that._pr_pagetype)
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
            catch (ex)
            {
                _blockMessage.show('程序初始化失败<br/>' + ex.message, 'fail');
            }
        },

        /* 
        *  
        *  方法:bindPage
        *  参数:
        *  绑定页面
        */
        bindPage: function (callBackFunction)
        {
            try
            {
                getData({
                    success: function (tbl_ld_dyhlh_detail)
                    {
                        setModel(tbl_ld_dyhlh_detail, {
                            success: function ()
                            {
                                callBackFunction.success();
                            }
                        });
                    }
                });
            }
            catch (ex)
            {
                _blockMessage.show('bindPage执行失败<br/>' + ex.message, 'fail');
            }
        },

        //---------------------------------------------------------------------------------
        // ---------------------------------按钮事件---------------------------------------
        //---------------------------------------------------------------------------------
        /* 
        *  
        *  方法:btn_command_save_onclick
        *  参数:
        *  保存按钮
        */
        btn_command_save_onclick: function ()
        {
            try
            {
                _ladda_btn_command_save.start();
                getModel({
                    success: function (tbl_ld_dyhlh_detail)
                    {
                        checkModel(tbl_ld_dyhlh_detail, {
                            success: function (tbl_ld_dyhlh_detail)
                            {
                                updateData(tbl_ld_dyhlh_detail, {
                                    success: function ()
                                    {
                                        _ladda_btn_command_save.stop();
                                        _alertMessage.show('保存成功', 'success', 2000);
                                    },
                                    fail: function (message)
                                    {
                                        _ladda_btn_command_save.stop();
                                        _alertMessage.show('保存失败', 'fail');
                                        _resultMessage.show(message);
                                    }
                                });
                            },
                            fail: function (message)
                            {
                                _ladda_btn_command_save.stop();
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
                        _ladda_btn_command_save.stop();
                        _alertMessage.show('数据获取失败', 'warning');
                        _resultMessage.show(message);
                    }
                });
            }
            catch (ex)
            {
                _alertMessage.show('保存程序异常。', 'fail');
                _resultMessage.show('保存程序异常<br/>' + ex.message, 'fail');
            }
        },

        /* 
        *  
        *  方法:btn_command_cancle_onclick
        *  参数:
        *  返回按钮
        */
        btn_command_cancle_onclick: function ()
        {
            tbl_ld_dyhlh_list_Obj.bindGrid({
                success: function ()
                {
                    $('#div_content_part_tbl_ld_dyhlh_list').css('display', '');
                    $('#div_content_part_tbl_ld_dyhlh_detail').css('display', 'none');
                }
            });
        },

        /* 
        *  
        *  方法:btn_command_message_onclick
        *  参数:
        *  消息示例按钮
        */
        btn_command_message_onclick: function (messagetype)
        {

            switch (messagetype)
            {
                case "result":
                    _resultMessage.show();
                    break;
                case "alert":
                    _alertMessage.show('alert消息<br/>alert消息<br/>', 'warning');
                    break;
                case "confirm":

                    _confirmMessage.show('标题', '内容<br/>内容<br/>内容<br/>内容<br/>内容<br/>内容',
                    {
                        confirm: function ()
                        {
                            _alertMessage.show('确定', 'success');
                        },
                        cancle: function ()
                        {
                            _alertMessage.show('取消', 'fail');
                        }
                    });
                    break;
                case "block":
                    _blockMessage.show('block消息<br/>block消息<br/>', 'loadingcenter');

                    setTimeout(function ()
                    {
                        _blockMessage.hidden();
                    }, 2000);

                    break;
            }
        },
        save: function (callBackFunction)
        {
            try
            {
                getModel({
                    success: function (tbl_ld_dyhlh_detail)
                    {
                        checkModel(tbl_ld_dyhlh_detail, {
                            success: function (tbl_ld_dyhlh_detail)
                            {
                                updateData(tbl_ld_dyhlh_detail, {
                                    success: function ()
                                    {
                                        _alertMessage.show('保存成功', 'success', 2000);
                                        callBackFunction.success();
                                    },
                                    fail: function (message)
                                    {
                                        _alertMessage.show('保存失败', 'fail');
                                        _resultMessage.show(message);
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
                    },
                    fail: function (message)
                    {
                        _ladda_btn_command_save.stop();
                        _alertMessage.show('数据获取失败', 'warning');
                        _resultMessage.show(message);
                    }
                });
            }
            catch (ex)
            {
                _alertMessage.show('保存程序异常。', 'fail');
                _resultMessage.show('保存程序异常<br/>' + ex.message, 'fail');
            }
        },
        disabled: function ()
        {
            try
            {
               
                //根据_pr_isdisplay决定是否显示
                switch (that._pr_isdisplay)
                {
                    //div_command_1----------第1节点
                    //div_command_2----------第3节点
                    //div_command_4----------第1、3节点都需要
                    //div_command_3----------第4节点（张建东）
                    case "1":
                        controlObj.textdisable('detail_f_dyhlhbh_tbl_ld_dyhlh_detail', true);
                        controlObj.textdisable('detail_f_mc_tbl_ld_dyhlh_detail', true);
                        controlObj.textdisable('detail_f_yhm_tbl_ld_dyhlh_detail', true);
                        controlObj.textdisable('detail_f_jfm_tbl_ld_dyhlh_detail', true);
                        controlObj.datetimedisable('detail_f_khrq_tbl_ld_dyhlh_detail_date', 'detail_f_khrq_tbl_ld_dyhlh_detail_time', true);
                        controlObj.textdisable('detail_f_dh_tbl_ld_dyhlh_detail', true);
                        controlObj.textdisable('detail_f_dz_tbl_ld_dyhlh_detail', true);
                        controlObj.textdisable('detail_f_tjjzsf_tbl_ld_dyhlh_detail', true);
                        controlObj.textdisable('detail_f_tjjzpwf_tbl_ld_dyhlh_detail', true);
                        controlObj.textdisable('detail_f_ycje_tbl_ld_dyhlh_detail', true);
                        controlObj.textdisable('detail_f_jhysl_tbl_ld_dyhlh_detail', true);
                        controlObj.textdisable('detail_f_sqysl_tbl_ld_dyhlh_detail', true);
                        controlObj.toggledisable('detail_f_sfjlbjf_tbl_ld_dyhlh_detail', true);
                        controlObj.textdisable('detail_f_sfzh_tbl_ld_dyhlh_detail', true);
                        controlObj.fileuploaderdisable('detail_f_qtfj_tbl_ld_dyhlh_detail', true);
                        controlObj.fileuploaderdisable('detail_f_sfzfj_tbl_ld_dyhlh_detail', true);
                        controlObj.singledropdownlistdisable('detail_f_yhzt_tbl_ld_dyhlh_detail', true);
                        controlObj.singledropdownlistdisable('detail_f_khzt_tbl_ld_dyhlh_detail', true);
                        controlObj.textdisable('detail_f_yhbz_tbl_ld_dyhlh_detail', true);
                        controlObj.textdisable('detail_f_khbz_tbl_ld_dyhlh_detail', true);
                        //////

                        //第2节点和1节点是一样的
                        controlObj.textdisable('detail_f_lxth_tbl_ld_dyhlh_detail', true);
                        controlObj.singledropdownlistdisable('detail_f_sbkj_tbl_ld_dyhlh_detail', true);
                        controlObj.singledropdownlistdisable('detail_f_sblx_tbl_ld_dyhlh_detail', true);
                        controlObj.singledropdownlistdisable('detail_f_jllx_tbl_ld_dyhlh_detail', true);
                        controlObj.singledropdownlistdisable('detail_f_yslx_tbl_ld_dyhlh_detail', true);
                        controlObj.datetimedisable('detail_f_azrq_tbl_ld_dyhlh_detail_date', 'detail_f_azrq_tbl_ld_dyhlh_detail_time', true);
                        controlObj.textdisable('detail_f_cszm_tbl_ld_dyhlh_detail', true);
                        controlObj.textdisable('detail_f_synx_tbl_ld_dyhlh_detail', true);
                        controlObj.toggledisable('detail_f_qfzt_tbl_ld_dyhlh_detail', true);
                        controlObj.textdisable('detail_f_rs_tbl_ld_dyhlh_detail', true);
                        controlObj.textdisable('detail_f_sbpp_tbl_ld_dyhlh_detail', true);
                        controlObj.textdisable('detail_f_mph_tbl_ld_dyhlh_detail', true);
                        controlObj.textdisable('detail_f_sbbz_tbl_ld_dyhlh_detail', true);
                        controlObj.singledropdownlistdisable('detail_f_sbzt_tbl_ld_dyhlh_detail', true);
                        controlObj.toggledisable('detail_f_sfts_tbl_ld_dyhlh_detail', true);
                        controlObj.singledropdownlistdisable('detail_f_tsyx_tbl_ld_dyhlh_detail', true);
                        controlObj.textdisable('detail_f_tsyxzh_tbl_ld_dyhlh_detail', true);
                        controlObj.toggledisable('detail_f_sfzzs_tbl_ld_dyhlh_detail', true);
                        controlObj.textdisable('detail_f_htbh_tbl_ld_dyhlh_detail', true);
                        controlObj.fileuploaderdisable('detail_f_sbfj_tbl_ld_dyhlh_detail', true);
                        controlObj.fileuploaderdisable('detail_f_lcfj_tbl_ld_dyhlh_detail', true);
                        controlObj.textdisable('detail_f_tbbh_tbl_ld_dyhlh_detail', true);
                        $('#btn_command_save_tbl_ld_dyhlh_detail').addClass('hidden');
                        break;
                    case "4":
                        controlObj.multidropdownlistdisable('detail_f_yhfz_tbl_ld_dyhlh_detail', true);
                        controlObj.textdisable('detail_f_sqr_tbl_ld_dyhlh_detail', true);
                        controlObj.textdisable('detail_f_sqrid_tbl_ld_dyhlh_detail', true);
                        controlObj.datetimedisable('detail_f_sqsj_tbl_ld_dyhlh_detail_date', 'detail_f_sqsj_tbl_ld_dyhlh_detail_time', true);
                        controlObj.textdisable('detail_f_czr_tbl_ld_dyhlh_detail', true);
                        controlObj.textdisable('detail_f_czrid_tbl_ld_dyhlh_detail', true);
                        controlObj.datetimedisable('detail_f_czrsj_tbl_ld_dyhlh_detail_date', 'detail_f_czrsj_tbl_ld_dyhlh_detail_time', true);
                        controlObj.multidropdownlistdisable('detail_f_khfz_tbl_ld_dyhlh_detail', true);
                        controlObj.datetimedisable('detail_f_zhcbrq_tbl_ld_dyhlh_detail_date', 'detail_f_zhcbrq_tbl_ld_dyhlh_detail_time', true);
                        controlObj.singledropdownlistdisable('detail_f_cbbh_tbl_ld_dyhlh_detail', true);
                        controlObj.textdisable('detail_f_cbxh_tbl_ld_dyhlh_detail', true);
                        controlObj.singledropdownlistdisable('detail_f_dy_tbl_ld_dyhlh_detail', true);
                        controlObj.singledropdownlistdisable('detail_f_sc_tbl_ld_dyhlh_detail', true);
                        controlObj.singledropdownlistdisable('detail_f_qy_tbl_ld_dyhlh_detail', true);
                        controlObj.singledropdownlistdisable('detail_f_pq_tbl_ld_dyhlh_detail', true);
                        controlObj.fileuploaderdisable('detail_f_htfj_tbl_ld_dyhlh_detail', true);
                        controlObj.multidropdownlistdisable('detail_f_sbfz_tbl_ld_dyhlh_detail', true);
                        controlObj.textdisable('detail_f_sbdz_tbl_ld_dyhlh_detail', true);
                        controlObj.singledropdownlistdisable('detail_f_zt_tbl_ld_dyhlh_detail', true);
                        controlObj.textdisable('detail_f_bz_tbl_ld_dyhlh_detail', true);
                        $('#btn_command_save_tbl_ld_dyhlh_detail').addClass('hidden');
                    default:
                        break;
                }
            }
            catch (ex)
            {
                _blockMessage.show('setDisable执行失败<br/>' + ex.message, 'fail');
            }
        },
        end: function ()
        {
        }
    };

    return that;
})();



