

//businessflowObject.loadChart();
//businessflowObject._pr_maintable_sys_id
var businessflowObject = (function ()
{
    'use strict';
    var _serviceUrl = '//127.0.0.1/sara.dd.ldsw/service/service_businessflow.asmx/';
    var activityHashMapXY = null;
    var activityHashMapRC = null;
    var activityHashMapLogContent = null;
    var messageJson = null;
    var totalrow = 0;
    var totalcolumn = 0;
    var that = {
        _pr_maintable_sys_id:'',
        loadChart: function (callBackFunction)
        {
            var data = { appCodeString: "54", sysIdString: that._pr_maintable_sys_id };

            doAjaxFunction(_serviceUrl, 'GetBusinessFlow', data, {
                success: function (message)
                {

                    messageJson = (new Function("", "return " + message))();

                  
                    that.formatMessageJson();

                    //定义数据
                    var operationJson = {
                        chart: {
                            renderTo: 'div_container_businessflow',
                            events: {
                                load: function ()
                                {
                                    //资源准备
                                    var ren = this.renderer;                                     

                                    //绘制节点
                                    $.each(messageJson.activity.rows, function (i, u)
                                    {                                      

                                        //设置节点内文本
                                        {
                                            var content = '';

                                            content += that.checkStringLength(messageJson.activity.rows[i].activityname);

                                            content += '<br/>';
                                            content += messageJson.activity.rows[i].username;
                                           
                                            if (messageJson.activity.rows[i].logcount > 0)
                                            {
                                                content += '<br/><a style="color:#f55a00;font-weight:bold">' + messageJson.activity.rows[i].logcount + '条审核记录' + '</a>';
                                            }
                                        }

                                        //设置节点的颜色和样式
                                        {
                                            //设置节点边框颜色，区分是不是点亮节点
                                            var strokecolor = '#ffffff';
                                            var strokewidth = 1;
                                            var backgroundcolor = "";
                                            var forecolor = "";
                                            var ischecked = 'false';

                                            //当前节点
                                            if (messageJson.activity.rows[i].iscurrent == "true")
                                            {
                                                strokecolor = '#f7941d';
                                                strokewidth = 6;
                                                ischecked = 'true';
                                            }

                                            //颜色备份：浅橙色f7941d--当前节点的边框线的颜色
                                            //颜色备份：深橙色f55a00--被选中的边框线的颜色

                                            //颜色备份：深绿色047e4d//字体颜色ffffff
                                            //颜色备份：浅绿色04a374//字体颜色ffffff
                                       
                                            //颜色备份：深红色ac4d47//字体颜色ffffff
                                            //颜色备份：浅红色ac4f57//字体颜色ffffff

                                            //颜色备份：深蓝色3f84b5//字体颜色ffffff
                                            //颜色备份：浅蓝色8dbfd9//字体颜色ffffff
                                            //颜色备份：最浅蓝色c0deed//字体颜色667580
                                            switch (messageJson.activity.rows[i].activityclass)
                                            {
                                                case "1"://一般关键节点 
                                                    {

                                                        //如果当前节点是含有子流程  
                                                        if (messageJson.activity.rows[i].workflownode != '')
                                                        {
                                                            backgroundcolor = '#3f84b5';
                                                            forecolor = "#ffffff";
                                                        }
                                                        else
                                                        {
                                                            backgroundcolor = '#3f84b5';
                                                            forecolor = "#ffffff";
                                                        }
                                                    }
                                                    break;
                                                case "5"://开始节点
                                                    {
                                                        
                                                        backgroundcolor = '#047e4d';
                                                        forecolor = "#ffffff";
                                                    }
                                                    break;
                                                case "6"://流程开始节点
                                                    {
                                                        
                                                        backgroundcolor = '#8dbfd9';
                                                        forecolor = "#ffffff";
                                                    }
                                                    break;
                                                case "4"://结束节点
                                                    {
                                                        backgroundcolor = '#ac4d47';
                                                        forecolor = "#ffffff";
                                                    }
                                                    break;
                                                case "7"://流程结束节点
                                                    {
                                                        backgroundcolor = '#8dbfd9';
                                                        forecolor = "#ffffff";
                                                    }
                                                    break;
                                                case "2"://一般流程节点
                                                    {
                                                        backgroundcolor = '#8dbfd9';
                                                        forecolor = "#ffffff";                                                       
                                                    }
                                                    break;
                                                case "3"://流程子流程节点
                                                    {
                                                        backgroundcolor = '#8dbfd9';
                                                        forecolor = "#ffffff";                                                        
                                                    }
                                                    break;
                                            }

                                        }

                                        //输出节点
                                        {
                                            ren.label(content, messageJson.activity.rows[i].x, messageJson.activity.rows[i].y)
                                                    .attr({
                                                        fill: backgroundcolor,
                                                        stroke: strokecolor,
                                                        'stroke-width': strokewidth,
                                                        padding: 2,
                                                        width: 158 ,
                                                        height: 48,
                                                        r: 5,
                                                        activityid: messageJson.activity.rows[i].activityid,
                                                        elementtype: 'activity',
                                                        ischecked: ischecked
                                                    })
                                                    .css({
                                                        color: forecolor,
                                                        fontSize: '12px'
                                                    })
                                                .add()
                                                .shadow(false);
                                        }

                                        //输出分割线
                                        if (messageJson.activity.rows[i].issplitline )
                                        {
                                            ren.path( ['M', messageJson.activity.rows[i].x + 200 , 40, 'L', messageJson.activity.rows[i].x + 200 , 750] )
                                                         .attr({
                                                             'stroke-width': 2,
                                                             stroke: 'silver',
                                                             dashstyle: 'dash'
                                                         })
                                                         .add();
                                        }

                                    });                                                                   

                                    //绘制连接线
                                    $.each(messageJson.connection.rows, function (i, u)
                                    {
                                        var fromrc = activityHashMapRC.get(messageJson.connection.rows[i].fromactivityid);
                                        var torc = activityHashMapRC.get(messageJson.connection.rows[i].toactivityid);

                                        var fromxy = activityHashMapXY.get(messageJson.connection.rows[i].fromactivityid);
                                        var toxy = activityHashMapXY.get(messageJson.connection.rows[i].toactivityid);

                                        var linecolor = '';
                                        var linewidth = 2;
                                        switch (messageJson.connection.rows[i].connectionclass)
                                        {
                                            case "1"://关键节点后继连接线
                                                linecolor = '#fe8c00';//f55a00
                                                linewidth = 1;
                                                break;
                                            case "2"://流程后继连接线
                                                linecolor = '#fe8c00';
                                                linewidth = 1;
                                                break;
                                            case "3"://流程分支连接线
                                                linecolor = '#fe8c00';//ffc800
                                                linewidth = 1;
                                                break;

                                        }                                        

                                        if (fromxy != null && toxy != null && fromrc != null && torc != null)
                                        {
                                            var fromr = parseInt(fromrc.split('_')[0]);
                                            var fromc = parseInt(fromrc.split('_')[1]);
                                            var tor = parseInt(torc.split('_')[0]);
                                            var toc = parseInt(torc.split('_')[1]);

                                            //var xp_point = (toc / totalcolumn) * 18 + (fromc / totalcolumn) * 18 + (tor / totalrow) * 18 + (fromr / totalrow) * 18
                                            //var yp_point = (tor / totalrow) * 8 + (fromr / totalrow) * 8 + (toc / totalcolumn) * 8 + (fromc / totalcolumn) * 8;
                                            //var xp_line = (toc / totalcolumn) * 3 + (fromc / totalcolumn) * 3 + (tor / totalrow) * 3 + (fromr / totalrow) * 3;
                                            //var yp_line = (tor / totalrow) * 10 + (fromr / totalrow) * 10 + (toc / totalcolumn) * 10 + (fromc / totalcolumn) * 10;

                                            var xp_point = (toc / totalcolumn) * 18 + (fromc / totalcolumn) * 18 + (tor / totalrow) * 18 + (fromr / totalrow) * 18
                                            var yp_point = (tor / totalrow) * 8 + (fromr / totalrow) * 8 + (toc / totalcolumn) * 8 + (fromc / totalcolumn) * 8;
                                            var xp_line = (toc / totalcolumn) * 2 + (fromc / totalcolumn) * 2 + (tor / totalrow) * 2 + (fromr / totalrow) * 2;
                                            var yp_line = (tor / totalrow) * 9 + (fromr / totalrow) * 9 + (toc / totalcolumn) * 9 + (fromc / totalcolumn) * 9;



                                            //右//测试通过
                                            if (toc > fromc && fromr == tor)
                                            {
                                                //水平向右的箭头，仅跨过一个列
                                                if (toc - fromc == 1)
                                                {
                                                    //测试通过
                                                    var fromx = parseInt( fromxy.split( '_' )[0] ) + 160 ;
                                                    var fromy = parseInt(fromxy.split('_')[1]) + 25;
                                                    var tox = parseInt(toxy.split('_')[0]);
                                                    var toy = parseInt(toxy.split('_')[1]) + 25;

                                                    ren.path(['M', fromx, fromy, 'L', tox, toy, 'L', tox - 5, fromy + 5, 'M', tox, fromy, 'L', tox - 5, toy - 5])
                                                         .attr({
                                                             'stroke-width': linewidth,
                                                             stroke: linecolor,
                                                             fromactivityid: messageJson.connection.rows[i].fromactivityid,
                                                             toactivityid: messageJson.connection.rows[i].toactivityid,
                                                             elementtype: 'connection'
                                                         })
                                                         .add();
                                                }
                                                    //水平向右，并且跨过多个列
                                                else
                                                {
                                                    //测试通过
                                                    //一般情况下都在顶端，所以高度步长不能太大。。。
                                                    var ranx = (toc - fromc) * 5;
                                                    var rany = (toc - fromc) * 1 / 2;

                                                    var fromx = parseInt(fromxy.split('_')[0]) + 75 + xp_point - ranx;
                                                    var fromy = parseInt(fromxy.split('_')[1]);
                                                    var tox = parseInt(toxy.split('_')[0]) + 75 - xp_point + ranx;
                                                    var toy = parseInt(toxy.split('_')[1]);

                                                    var midx1 = fromx;
                                                    var midy1 = fromy - (10 + yp_line) - rany;

                                                    var midx2 = tox;
                                                    var midy2 = toy - (10 + yp_line) - rany;

                                                    ren.path(['M', fromx, fromy
                                                        , 'L', midx1, midy1
                                                        , 'L', midx2, midy2
                                                        , 'L', tox, toy
                                                        , 'L', tox + 5, toy - 5, 'M', tox, toy, 'L', tox - 5, toy - 5])
                                                         .attr({
                                                             'stroke-width': linewidth,
                                                             stroke: linecolor,
                                                             fromactivityid: messageJson.connection.rows[i].fromactivityid,
                                                             toactivityid: messageJson.connection.rows[i].toactivityid,
                                                             elementtype: 'connection'
                                                         })
                                                         .add();
                                                }
                                            }
                                                //左//部分未测试
                                            else if (fromc > toc && fromr == tor)
                                            {

                                                //未测试
                                                //同行不同列，并且是列向左，跨过一个列

                                                if (fromc - toc == 1)
                                                {
                                                    alert('向左的箭头隔一个');
                                                    var fromx = parseInt(fromxy.split('_')[0]);
                                                    var fromy = parseInt(fromxy.split('_')[1]) + 25;
                                                    var tox = parseInt( toxy.split( '_' )[0] ) + 160 ;
                                                    var toy = parseInt(toxy.split('_')[1]) + 25;

                                                    ren.path(['M', fromx, fromy, 'L', tox, toy, 'L', tox + 5, fromy - 5, 'M', tox, fromy, 'L', tox + 5, toy + 5])
                                                         .attr({
                                                             'stroke-width': linewidth,
                                                             stroke: linecolor,
                                                             fromactivityid: messageJson.connection.rows[i].fromactivityid,
                                                             toactivityid: messageJson.connection.rows[i].toactivityid,
                                                             elementtype: 'connection'
                                                         })
                                                         .add();
                                                }
                                                    //同行不同列，并且是列向左，跨过多个列
                                                else
                                                {
                                                    var ranx = (fromc - toc) * 5;
                                                    var rany = (fromc - toc) * 1;

                                                    var fromx = parseInt(fromxy.split('_')[0]) + 75 - xp_point + ranx;
                                                    var fromy = parseInt(fromxy.split('_')[1]);
                                                    var tox = parseInt(toxy.split('_')[0]) + 75 + xp_point - ranx;
                                                    var toy = parseInt(toxy.split('_')[1]);

                                                    var midx1 = fromx;
                                                    var midy1 = fromy - (10 + yp_line) - rany;

                                                    var midx2 = tox;
                                                    var midy2 = toy - (10 + yp_line) - rany;

                                                    ren.path(['M', fromx, fromy
                                                        , 'L', midx1, midy1
                                                        , 'L', midx2, midy2
                                                        , 'L', tox, toy
                                                        , 'L', tox + 5, toy - 5, 'M', tox, toy, 'L', tox - 5, toy - 5])
                                                         .attr({
                                                             'stroke-width': linewidth,
                                                             stroke: linecolor,
                                                             fromactivityid: messageJson.connection.rows[i].fromactivityid,
                                                             toactivityid: messageJson.connection.rows[i].toactivityid,
                                                             elementtype: 'connection'
                                                         })
                                                         .add();
                                                }

                                            }
                                                //下/测试通过
                                            else if (tor > fromr && fromc == toc)
                                            {
                                                //垂直向下的箭头
                                                //测试通过
                                                if (tor - fromr == 1)
                                                {
                                                    var fromx = parseInt(fromxy.split('_')[0]) + 75;
                                                    var fromy = parseInt(fromxy.split('_')[1]) + 50;
                                                    var tox = parseInt(toxy.split('_')[0]) + 75;
                                                    var toy = parseInt(toxy.split('_')[1]);
                                                    ren.path(['M', fromx, fromy, 'L', tox, toy,
                                                              'L', fromx - 5, toy - 5, 'M', fromx, toy,
                                                              'L', fromx + 5, toy - 5])
                                                         .attr({
                                                             'stroke-width': linewidth,
                                                             stroke: linecolor,
                                                             fromactivityid: messageJson.connection.rows[i].fromactivityid,
                                                             toactivityid: messageJson.connection.rows[i].toactivityid,
                                                             elementtype: 'connection'
                                                         })
                                                         .add();
                                                }
                                                    //垂直向下，跨过多个向下的行
                                                else
                                                {
                                                    //测试通过
                                                    var ranx = (tor - fromr) * 5 + Math.random() * 5;
                                                    var rany = (tor - fromr) * 5;


                                                    var fromx = parseInt(fromxy.split('_')[0]);
                                                    var fromy = parseInt(fromxy.split('_')[1]) + yp_point - rany + 10;
                                                    var tox = parseInt(toxy.split('_')[0]);
                                                    var toy = parseInt(toxy.split('_')[1]) + yp_point - rany + 10;

                                                    var midx1 = fromx - (10 + xp_line) - ranx;
                                                    var midy1 = fromy;

                                                    var midx2 = tox - (10 + xp_line) - ranx;
                                                    var midy2 = toy;

                                                    ren.path(['M', fromx, fromy
                                                        , 'L', midx1, midy1
                                                        , 'L', midx2, midy2
                                                        , 'L', tox, toy
                                                        , 'L', tox - 5, toy - 5, 'M', tox, toy, 'L', tox - 5, toy + 5])
                                                         .attr({
                                                             'stroke-width': linewidth,
                                                             stroke: linecolor,
                                                             fromactivityid: messageJson.connection.rows[i].fromactivityid,
                                                             toactivityid: messageJson.connection.rows[i].toactivityid,
                                                             elementtype: 'connection'
                                                         })
                                                         .add();
                                                }
                                            }
                                                //上//未测试
                                            else if (fromr > tor && fromc == toc)
                                            {
                                                alert('向上的箭头');
                                                //未测试
                                                //同列向上的箭头
                                                if (fromr - tor == 1)
                                                {
                                                    var fromx = parseInt(fromxy.split('_')[0]) + 75;
                                                    var fromy = parseInt(fromxy.split('_')[1]);
                                                    var tox = parseInt(toxy.split('_')[0]) + 75;
                                                    var toy = parseInt(toxy.split('_')[1]) + 50;
                                                    ren.path(['M', fromx, fromy, 'L', tox, toy,
                                                              'L', fromx + 5, toy + 5, 'M', fromx, toy,
                                                              'L', fromx - 5, toy + 5])
                                                         .attr({
                                                             'stroke-width': linewidth,
                                                             stroke: linecolor,
                                                             fromactivityid: messageJson.connection.rows[i].fromactivityid,
                                                             toactivityid: messageJson.connection.rows[i].toactivityid,
                                                             elementtype: 'connection'
                                                         })
                                                         .add();
                                                }
                                                else
                                                {
                                                    //未测试
                                                    var ranx = (tor - fromr) * 7 + Math.random() * 5;
                                                    var rany = (tor - fromr) * 5;

                                                    var fromx = parseInt(fromxy.split('_')[0]);
                                                    var fromy = parseInt(fromxy.split('_')[1]) + yp_point + 10 - rany;
                                                    var tox = parseInt(toxy.split('_')[0]);
                                                    var toy = parseInt(toxy.split('_')[1]) + yp_point + 10 - rany;

                                                    var midx1 = fromx - (10 + xp_line) - ranx;
                                                    var midy1 = fromy;

                                                    var midx2 = tox - (10 + xp_line) - ranx;
                                                    var midy2 = toy;

                                                    ren.path(['M', fromx, fromy
                                                        , 'L', midx1, midy1
                                                        , 'L', midx2, midy2
                                                        , 'L', tox, toy
                                                        , 'L', tox - 5, toy - 5, 'M', tox, toy, 'L', tox - 5, toy + 5])
                                                         .attr({
                                                             'stroke-width': linewidth,
                                                             stroke: linecolor,
                                                             fromactivityid: messageJson.connection.rows[i].fromactivityid,
                                                             toactivityid: messageJson.connection.rows[i].toactivityid,
                                                             elementtype: 'connection'
                                                         })
                                                         .add();
                                                }
                                            }
                                                //右上//测试通过
                                            else if (toc > fromc && tor < fromr)
                                            {
                                                //测试通过

                                                if (toc - fromc == 1)
                                                {
                                                    var ranx = (fromr - tor) * 5;
                                                    var rany = (fromr - tor) * 5;

                                                    //例如部分会签
                                                    var fromx = parseInt(fromxy.split('_')[0]) + 160;
                                                    var fromy = parseInt(fromxy.split('_')[1]) + 25 - yp_point + rany;
                                                    var tox = parseInt(toxy.split('_')[0]);
                                                    var toy = parseInt(toxy.split('_')[1]) + 25 - yp_point + rany;


                                                    var midx1 = tox - xp_line - 5 - ranx;
                                                    var midy1 = fromy;

                                                    var midx2 = tox - xp_line - 5 - ranx;
                                                    var midy2 = toy;


                                                    ren.path(['M', fromx, fromy
                                                        , 'L', midx1, midy1
                                                        , 'L', midx2, midy2

                                                        , 'L', tox, toy
                                                        , 'L', tox - 5, toy - 5, 'M', tox, toy, 'L', tox - 5, toy + 5])
                                                         .attr({
                                                             'stroke-width': linewidth,
                                                             stroke: linecolor,
                                                             fromactivityid: messageJson.connection.rows[i].fromactivityid,
                                                             toactivityid: messageJson.connection.rows[i].toactivityid,
                                                             elementtype: 'connection'
                                                         })
                                                         .add();
                                                }
                                                else
                                                {
                                                    //测试通过
                                                    var ranx = ((toc - fromc) + (fromr - tor)) / 2 * 5;
                                                    var rany = ((toc - fromc) + (fromr - tor)) / 2 * 5;


                                                    //例如处长到局长
                                                    var fromx = parseInt(fromxy.split('_')[0]) + 75 + xp_point + ranx;
                                                    var fromy = parseInt(fromxy.split('_')[1]);
                                                    var tox = parseInt(toxy.split('_')[0]);
                                                    var toy = parseInt(toxy.split('_')[1]) + 25 - yp_point;

                                                    var midx1 = fromx;
                                                    var midy1 = fromy - (10 + yp_line) + rany;

                                                    var midx2 = tox - xp_line - 5 - ranx;
                                                    var midy2 = fromy - (10 + yp_line) + rany;

                                                    var midx3 = tox - xp_line - 5 - ranx;
                                                    var midy3 = toy;


                                                    ren.path(['M', fromx, fromy
                                                        , 'L', midx1, midy1
                                                        , 'L', midx2, midy2
                                                        , 'L', midx3, midy3
                                                        , 'L', tox, toy
                                                        , 'L', tox - 5, toy - 5, 'M', tox, toy, 'L', tox - 5, toy + 5])
                                                         .attr({
                                                             'stroke-width': linewidth,
                                                             stroke: linecolor,
                                                             fromactivityid: messageJson.connection.rows[i].fromactivityid,
                                                             toactivityid: messageJson.connection.rows[i].toactivityid,
                                                             elementtype: 'connection'
                                                         })
                                                         .add();


                                                }
                                            }
                                                //右下--//测试通过
                                            else if (toc > fromc && tor > fromr)
                                            {
                                                //测试通过
                                                if (toc - fromc == 1)
                                                {
                                                    var ranx = (tor - fromr) * 5;
                                                    var rany = (tor - fromr) * 5;

                                                    var fromx = parseInt(fromxy.split('_')[0]) + 160;
                                                    var fromy = parseInt(fromxy.split('_')[1]) + yp_point + rany;
                                                    var tox = parseInt(toxy.split('_')[0]);
                                                    var toy = parseInt(toxy.split('_')[1]) + yp_point + rany;

                                                    var midx1 = tox - xp_line - 5 - ranx;
                                                    var midy1 = fromy;

                                                    var midx2 = tox - xp_line - 5 - ranx;
                                                    var midy2 = toy;


                                                    ren.path(['M', fromx, fromy
                                                        , 'L', midx1, midy1
                                                        , 'L', midx2, midy2

                                                        , 'L', tox, toy
                                                        , 'L', tox - 5, toy - 5, 'M', tox, toy, 'L', tox - 5, toy + 5])
                                                         .attr({
                                                             'stroke-width': linewidth,
                                                             stroke: linecolor,
                                                             fromactivityid: messageJson.connection.rows[i].fromactivityid,
                                                             toactivityid: messageJson.connection.rows[i].toactivityid,
                                                             elementtype: 'connection'
                                                         })
                                                         .add();
                                                }
                                                else
                                                {
                                                    //测试通过
                                                    var ranx = ((tor - fromr) + (toc - fromc)) / 2 * 5;
                                                    var rany = ((tor - fromr) + (toc - fromc)) / 2 * 5;
                                                    //例如超级归档
                                                    var fromx = parseInt(fromxy.split('_')[0]) + 75 + xp_point - ranx;
                                                    var fromy = parseInt(fromxy.split('_')[1]) + 50;
                                                    var tox = parseInt(toxy.split('_')[0]);
                                                    var toy = parseInt(toxy.split('_')[1]) + 25 - yp_point;


                                                    var midx1 = fromx;
                                                    var midy1 = fromy + (10 + yp_line) - rany;


                                                    var midx2 = tox - xp_line - 5 - ranx;
                                                    var midy2 = fromy + (10 + yp_line) - rany;


                                                    var midx3 = tox - xp_line - 5 - ranx;
                                                    var midy3 = toy;


                                                    ren.path(['M', fromx, fromy
                                                        , 'L', midx1, midy1
                                                        , 'L', midx2, midy2
                                                        , 'L', midx3, midy3
                                                        , 'L', tox, toy
                                                        , 'L', tox - 5, toy - 5, 'M', tox, toy, 'L', tox - 5, toy + 5])
                                                         .attr({
                                                             'stroke-width': linewidth,
                                                             stroke: linecolor,
                                                             fromactivityid: messageJson.connection.rows[i].fromactivityid,
                                                             toactivityid: messageJson.connection.rows[i].toactivityid,
                                                             elementtype: 'connection'
                                                         })
                                                         .add();


                                                }
                                            }
                                                //左上//未测试
                                            else if (toc < fromc && tor < fromr)
                                            {
                                                //应该不会出现这种情况
                                                alert('向左上的箭头');

                                                //未覆盖代码
                                                var fromx = parseInt(fromxy.split('_')[0]) + 75 + xp_point;
                                                var fromy = parseInt(fromxy.split('_')[1]) + 50;
                                                var tox = parseInt(toxy.split('_')[0]);
                                                var toy = parseInt(toxy.split('_')[1]) + 25 - yp_point;


                                                var midx1 = fromx;
                                                var midy1 = fromy + (10 + yp_line);


                                                var midx2 = tox - xp_line - 5;
                                                var midy2 = fromy + (10 + yp_line);


                                                var midx3 = tox - xp_line - 5;
                                                var midy3 = toy;


                                                ren.path(['M', fromx, fromy
                                                    , 'L', midx1, midy1
                                                    , 'L', midx2, midy2
                                                    , 'L', midx3, midy3
                                                    , 'L', tox, toy
                                                    , 'L', tox - 5, toy - 5, 'M', tox, toy, 'L', tox - 5, toy + 5])
                                                     .attr({
                                                         'stroke-width': linewidth,
                                                         stroke: linecolor,
                                                         fromactivityid: messageJson.connection.rows[i].fromactivityid,
                                                         toactivityid: messageJson.connection.rows[i].toactivityid,
                                                         elementtype: 'connection'
                                                     })
                                                     .add();


                                            }
                                                //左下//未测试
                                            else if (toc < fromc && tor > fromr)
                                            {
                                                //7-13--1-0
                                                alert('向左下的箭头');
                                                //alert(toc + '_' + fromc + '==' + tor + '_' + fromr);


                                                //例如超级归档
                                                var fromx = parseInt(fromxy.split('_')[0]) + 75 + xp_point;
                                                var fromy = parseInt(fromxy.split('_')[1]) + 50;
                                                var tox = parseInt(toxy.split('_')[0]);
                                                var toy = parseInt(toxy.split('_')[1]) + 25 - yp_point;


                                                var midx1 = fromx;
                                                var midy1 = fromy + (10 + yp_line);


                                                var midx2 = tox - xp_line - 5;
                                                var midy2 = fromy + (10 + yp_line);


                                                var midx3 = tox - xp_line - 5;
                                                var midy3 = toy;


                                                ren.path(['M', fromx, fromy
                                                    , 'L', midx1, midy1
                                                    , 'L', midx2, midy2
                                                    , 'L', midx3, midy3
                                                    , 'L', tox, toy
                                                    , 'L', tox - 5, toy - 5, 'M', tox, toy, 'L', tox - 5, toy + 5])
                                                     .attr({
                                                         'stroke-width': linewidth,
                                                         stroke: linecolor,
                                                         fromactivityid: messageJson.connection.rows[i].fromactivityid,
                                                         toactivityid: messageJson.connection.rows[i].toactivityid,
                                                         elementtype: 'connection'
                                                     })
                                                     .add();
                                            }

                                        }

                                    });
                                }
                            }
                        },
                        title:
                               {
                                   text: ' '
                               },
                        subtitle:
                            {
                                enabled: false
                            },
                        credits:
                            {
                                enabled: false
                            },
                        exporting:
                            {
                                enabled: false
                            }
                    };

                    //输出数据
                    var chart = new Highcharts.Chart(operationJson);

                    //添加事件cursor:pointer
                    $('#div_container_businessflow g[elementtype="activity"]').css('cursor', 'pointer');
                                      

                    //fe8c00-->f55a00
                    //鼠标浮动到节点触发
                    $('#div_container_businessflow g[elementtype="activity"]').on('mouseover', function ()
                    {
                        var $this = $(this);
                        var aid = $this.attr('activityid');
                        var $rect = $this.find('rect');
                        var $from = $('path[fromactivityid="' + aid + '"]');
                        var $to = $('path[toactivityid="' + aid + '"]');

                        $from.attr('stroke-width', "2");
                        $to.attr('stroke-width', "2");

                        $from.attr('stroke', "#f55a00");
                        $to.attr('stroke', "#f55a00");

                        $rect.attr('stroke', '#f55a00');
                        $rect.attr('stroke-width', '2');

                       
                        //显示日志
                        var messageContent = activityHashMapLogContent.get(aid);                      
                        if (messageContent)
                        {
                            
                            var arr = activityHashMapXY.get(aid).split('_');
                            var left = Number(arr[0]);
                            var top = Number(arr[1]) +90;

                            var $message = $('#div_logcontent_businessflow');

                            var result = '';
                            var messageContentArray = messageContent.split('~');
                           

                            
                            $.each(messageContentArray, function (i, u)
                            {
            
                                result += '<div class="div-logcontent-div-businessflow">';
                                var contentArray = u.split('`');

                                result += '<div class="div-logcontent-user-businessflow">';
                                result += contentArray[0];
                                result += '</div>';
                                result += '<div class="div-logcontent-date-businessflow">';
                                result += contentArray[1];
                                result += '</div>';
                                result += '<div class="div-logcontent-content-businessflow">';
                                result += contentArray[2];
                                result += '</div>';

                                result += '</div>';
                            });

                            $message.find('#div_logcontent1_businessflow').html(result);
                            
                            
                            $message.css('display', '');
                            $message.css("left", left + "px");
                            $message.css("top", top + "px");
                        }


                    });
                    $('#div_container_businessflow g[elementtype="activity"]').on('mouseout', function ()
                    {
                        var $this = $(this);
                        var aid = $this.attr('activityid');
                        var $rect = $this.find('rect');
                        var $from = $('path[fromactivityid="' + aid + '"]');
                        var $to = $('path[toactivityid="' + aid + '"]');


                        $from.attr('stroke-width', "1");
                        $to.attr('stroke-width', "1");

                        $from.attr('stroke', "#fe8c00");
                        $to.attr('stroke', "#fe8c00");



                        if ($this.attr('ischecked') == 'true')
                        {
                            $rect.attr('stroke', '#f7941d');
                            $rect.attr('stroke-width', '6');
                        }
                        else
                        {
                            $rect.attr('stroke', '#ffffff');
                            $rect.attr('stroke-width', '0');
                        }


                        var $message = $('#div_logcontent_businessflow');
                        $message.css('display', 'none');

                    });


                    //鼠标浮动到连接线触发
                    $('#div_container_businessflow path[elementtype="connection"]').on('mouseover', function ()
                    {
                        var $this = $(this);
                        var faid = $this.attr('fromactivityid');
                        var taid = $this.attr('toactivityid');
                        var $fact = $('g[activityid="' + faid + '"]>rect');
                        var $tact = $('g[activityid="' + taid + '"]>rect');
                        // ;
                        if (faid)
                        {
                            $fact.attr('stroke-width', "2");
                            $fact.attr('stroke', "#f55a00");
                        }
                        if (taid)
                        {
                            $tact.attr('stroke-width', "2");
                            $tact.attr('stroke', "#f55a00");
                        }

                        $this.attr('stroke-width', "2");
                        $this.attr('stroke', "#f55a00");
                    });
                    $('#div_container_businessflow path[elementtype="connection"]').on('mouseout', function ()
                    {
                        var $this = $(this);
                        var faid = $this.attr('fromactivityid');
                        var taid = $this.attr('toactivityid');

                        var $fg = $('g[activityid="' + faid + '"]');
                        var $tg = $('g[activityid="' + faid + '"]');
                        var $fact = $('g[activityid="' + faid + '"]>rect');
                        var $tact = $('g[activityid="' + taid + '"]>rect');
                        // ;
                        if (faid)
                        {
                            if ($fg.attr('ischecked') == 'true')
                            {
                                $fact.attr('stroke', '#f7941d');
                                $fact.attr('stroke-width', '3');
                            }
                            else
                            {
                                $fact.attr('stroke', '#ffffff');
                                $fact.attr('stroke-width', '0');
                            }
                        }
                        if (taid)
                        {
                            if ($tg.attr('ischecked') == 'true')
                            {
                                $tact.attr('stroke', '#f7941d');
                                $tact.attr('stroke-width', '3');
                            }
                            else
                            {
                                $tact.attr('stroke', '#ffffff');
                                $tact.attr('stroke-width', '0');
                            }
                        }

                        $this.attr('stroke-width', "1");
                        $this.attr('stroke', "#fe8c00");
                    });

                    callBackFunction.success();

                },
                fail: function (message)
                {
                    _blockMessage.show(that._serviceUrl + 'GetBusinessFlow<br/>' + message, 'fail');
                   
                },
                error: function (message)
                {
                    _blockMessage.show(that._serviceUrl + 'GetBusinessFlow<br/>' + message, 'fail');
                   
                }
            });
        },
        checkStringLength: function (str)
        {

            if (str.length > 12)
            {
                return str.substring(0, 12) + '...';
            }
            else
            {
                return str;
            }

        },
        formatMessageJson: function ()
        {
            activityHashMapXY = new hashMap();
            activityHashMapRC = new hashMap();
            activityHashMapLogContent = new hashMap();
            var rowsize = 6;
            var rownum = 0;
            var columnnum = 0;
            //绘制节点
            $.each(messageJson.activity.rows, function (i, u)
            {
                //计算节点坐标
                var y = (rownum + 1) * 40 + (rownum) * 50;
                var x = (columnnum + 1) * 30 + (columnnum) * 200;

                activityHashMapXY.put(messageJson.activity.rows[i].activityid, x + '_' + y);
                activityHashMapRC.put(messageJson.activity.rows[i].activityid, rownum + '_' + columnnum);

                activityHashMapLogContent.put(messageJson.activity.rows[i].activityid, messageJson.activity.rows[i].logcontent);
                //添加节点
                  
                messageJson.activity.rows[i].x = x;
                messageJson.activity.rows[i].y = y;

                //计算下一个节点的行列数据
                {
                    //如果后边有节点
                    if (i < messageJson.activity.rows.length - 1)
                    {
                        //如果后边节点是流程节点
                        if (messageJson.activity.rows[i + 1].workflownode != '')
                        {
                            //如果后边节点是流程节点
                            //如果当前节点是流程节点
                            if (messageJson.activity.rows[i].workflownode != '')
                            {
                                var nextNodelength = messageJson.activity.rows[i + 1].activityid.split('_').length;
                                var currentNodelength = messageJson.activity.rows[i].activityid.split('_').length;
                                //如果当前节点的workflownode含有的_数量和前边的一样

                                if (nextNodelength == currentNodelength && currentNodelength == 2)//工作流节点到工作流节点
                                {

                                    //如果当前节点的出口连接线是多条，换行
                                    var arr = $.grep(messageJson.connection.rows, function (nnn, iii)
                                    {
                                        return nnn.fromactivityid == messageJson.activity.rows[i].activityid;
                                    });
                                    if (arr.length>1)
                                    {
                                        rownum = 1;
                                        columnnum++;
                                    }
                                    else
                                    {
                                        if (rownum < rowsize)
                                        {
                                            rownum++;

                                            if (rownum > totalrow)
                                            {
                                                totalrow = rownum;
                                            }
                                        }
                                        else
                                        {
                                            rownum = 1;
                                            columnnum++;
                                        }
                                    }
                                   
                                }
                                else if (nextNodelength == currentNodelength && currentNodelength == 3)//会签节点到会签节点
                                {
                                    if (rownum < rowsize)
                                    {
                                        rownum++;
                                        if (rownum > totalrow)
                                        {
                                            totalrow = rownum;
                                        }
                                    }
                                    else
                                    {
                                        rownum = 1;
                                        columnnum++;

                                    }
                                }
                                else if (nextNodelength > currentNodelength && currentNodelength == 2)//工作流节点进入会签节点
                                {
                                    rownum = 1;
                                    columnnum++;

                                }
                                else if (nextNodelength > currentNodelength && currentNodelength == 1)//业务流程节点进入工作流节点
                                {
                                    if (rownum < rowsize)
                                    {
                                        rownum++;
                                        if (rownum > totalrow)
                                        {
                                            totalrow = rownum;
                                        }
                                    }
                                    else
                                    {
                                        rownum = 0;
                                        columnnum++;
                                    }
                                }
                                else if (nextNodelength < currentNodelength)//工作流节点离开会签节点
                                {
                                    rownum = 1;
                                    columnnum++;

                                }
                            }
                                //如果后边节点是流程节点
                                //如果当前节点不是流程节点
                            else
                            {
                                rownum = 0;
                                columnnum++;

                                messageJson.activity.rows[i].issplitline = true;
                             
                            }
                        }
                        else
                        {
                            //如果后边节点不是流程节点
                            //如果当前节点是流程节点
                            if (messageJson.activity.rows[i].workflownode != '')
                            {
                                rownum = 0;
                                columnnum++;
                                //添加分割线
                                messageJson.activity.rows[i].issplitline = true;
                            }
                            else
                            {
                                //如果后边节点不是流程节点
                                //如果当前节点不是流程节点
                                if (rownum < rowsize)
                                {
                                    //rownum++;关键节点则自动占有一列
                                    rownum = 0;
                                    columnnum++;
                                    if (rownum > totalrow)
                                    {
                                        totalrow = rownum;
                                    }
                                }
                                else
                                {
                                    rownum = 0;
                                    columnnum++;
                                }
                            }
                        }
                    }
                    else
                    {
                        //后边没有节点就无所谓了
                    }

                }
                
                
            });

            totalcolumn = columnnum;

            
          
            var wid = totalcolumn * 250;
            var winwid = $(window).width()*0.9;//？？！！
            var winhei = $(window).height();
            $('#div_businessflow').width(winwid -10);
            //$('#div_businessflow').height(winhei-200);
            if (wid < winwid)
            {
                $('#div_container_businessflow').width(winwid);

             
            }
            else
            {
                $('#div_container_businessflow').width(wid);
            }
        

        }
    };
    return that;
})();
