using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using System.Text;
using System.Text.RegularExpressions;
using System.Globalization;

namespace sara.dd.ldsw.commonclass
{
    public static class emojiclass
    {
        public static string encodeEmoji(string str)
        {

            string ccdd = System.Web.HttpUtility.UrlEncode(str, System.Text.Encoding.UTF8); ;


            char[] c = str.ToCharArray();
            for (int i = 0; i < c.Length; i++)
            {
                if (c[i] >= 0x4e00 && c[i] <= 0x9fbb)
                {
                    ccdd = ccdd.Replace(System.Web.HttpUtility.UrlEncode(c[i].ToString(), System.Text.Encoding.UTF8), c[i].ToString());
                }
                else
                {
                }
            }
            return ccdd;




            //string tempString = "";
            //string resultString = "";
            //tempString = ToUnicode(str);
            //List<string> sa = tempString.Split('^').ToList();
            //for (int i = 0; i < sa.Count;i++ )
            //{
            //    if (sa[i] == "")
            //    {
            //        continue;
            //    }

            //    string sc1 = getStr(sa,i);

            //    string sc2 = "";
            //    if (i + 1 < sa.Count)
            //    {
            //        sc2 = getStr(sa, i) + " " + getStr(sa, i + 1);
            //    }

            //    string sc4 = "";
            //    if (i + 1 < sa.Count && i + 2 < sa.Count && i + 3 < sa.Count)
            //    {
            //        sc4 = getStr(sa, i) + " " + getStr(sa, i + 1) + " " + getStr(sa, i + 2) + " " + getStr(sa, i + 3);
            //    }
            //    if (aa.Contains(sc1))//emoji
            //    {
            //        resultString += System.Web.HttpUtility.UrlEncode(ToGB2312("\\u" + sa[i]), System.Text.Encoding.UTF8);
            //    }
            //    else if (bb.Contains(sc1))//emoji
            //    {
            //        resultString += System.Web.HttpUtility.UrlEncode(ToGB2312("\\u" + sa[i]), System.Text.Encoding.UTF8);
            //    }
            //    else if (cc.Contains(sc2))//emoji
            //    {
            //        resultString += System.Web.HttpUtility.UrlEncode(ToGB2312("\\u" + sa[i] + "\\u" + sa[i + 1]), System.Text.Encoding.UTF8);
            //        i++;
            //    }
            //    else if (dd.Contains(sc2))//emoji
            //    {
            //        resultString += System.Web.HttpUtility.UrlEncode(ToGB2312("\\u" + sa[i] + "\\u" + sa[i + 1]), System.Text.Encoding.UTF8);
            //        i++;
            //    }
            //    else if (ff.Contains(sc2))//emoji
            //    {
            //        resultString += System.Web.HttpUtility.UrlEncode(ToGB2312("\\u" + sa[i] + "\\u" + sa[i + 1]), System.Text.Encoding.UTF8);
            //        i++;
            //    }
            //    else if (ee.Contains(sc4))//emoji
            //    {
            //        resultString += System.Web.HttpUtility.UrlEncode(ToGB2312("\\u" + sa[i] + "\\u" + sa[i + 1] + "\\u" + sa[i + 2] + "\\u" + sa[i + 3]), System.Text.Encoding.UTF8);
            //        i++;
            //        i++;
            //        i++;
            //    }
            //    else
            //    {
            //        resultString += ToGB2312("\\u" + sa[i]);
            //    }
            //}

            //resultString = System.Web.HttpUtility.UrlEncode(resultString, System.Text.Encoding.UTF8);
            //return resultString;
        }

        private static string getStr(List<string> sa, int i)
        {

            string sc = sa[i].ToUpper();
            if (sc.IndexOf("00") == 0)
            {
                sc = sa[i].Substring(2, 2);
            }
            sc = "0x" + sc;
            return sc;
        }

        static string[] aa = { "0xA9", "0xAE" };
        static string[] bb = { "0x2122", "0x2196", "0x2197", "0x2198", "0x2199", "0x23E9", "0x23EA", "0x25B6", "0x25C0", "0x2600", "0x2601", "0x260E", "0x2614", "0x2615", "0x261D", "0x263A", "0x2648", "0x2649", "0x264A", "0x264B", "0x264C", "0x264D", "0x264E", "0x264F", "0x2650", "0x2651", "0x2652", "0x2653", "0x2660", "0x2663", "0x2665", "0x2666", "0x2668", "0x267F", "0x26A0", "0x26A1", "0x26BD", "0x26BE", "0x26C4", "0x26CE", "0x26EA", "0x26F2", "0x26F3", "0x26F5", "0x26FA", "0x26FD", "0x2702", "0x2708", "0x270A", "0x270B", "0x270C", "0x2728", "0x2733", "0x2734", "0x274C", "0x2754", "0x2755", "0x2764", "0x27A1", "0x27BF", "0x2B05", "0x2B06", "0x2B07", "0x2B55", "0x303D", "0x3297", "0x3299" };
        static string[] cc = { "0x23 0x20E3", "0x30 0x20E3", "0x31 0x20E3", "0x32 0x20E3", "0x33 0x20E3", "0x34 0x20E3", "0x35 0x20E3", "0x36 0x20E3", "0x37 0x20E3", "0x38 0x20E3", "0x39 0x20E3" };
        static string[] dd = { "0xD83C 0xDC04", "0xD83C 0xDD70", "0xD83C 0xDD71", "0xD83C 0xDD7E", "0xD83C 0xDD7F", "0xD83C 0xDD8E", "0xD83C 0xDD92", "0xD83C 0xDD94", "0xD83C 0xDD95", "0xD83C 0xDD97", "0xD83C 0xDD99", "0xD83C 0xDD9A" };
        static string[] ee = { "0xD83C 0xDDE8 0xD83C 0xDDF3", "0xD83C 0xDDE9 0xD83C 0xDDEA", "0xD83C 0xDDEA 0xD83C 0xDDF8", "0xD83C 0xDDEB 0xD83C 0xDDF7", "0xD83C 0xDDEC 0xD83C 0xDDE7", "0xD83C 0xDDEE 0xD83C 0xDDF9", "0xD83C 0xDDEF 0xD83C 0xDDF5", "0xD83C 0xDDF0 0xD83C 0xDDF7", "0xD83C 0xDDF7 0xD83C 0xDDFA", "0xD83C 0xDDFA 0xD83C 0xDDF8" };
        static string[] ff = { "0xD83C 0xDE01", "0xD83C 0xDE02", "0xD83C 0xDE1A", "0xD83C 0xDE2F", "0xD83C 0xDE33", "0xD83C 0xDE35", "0xD83C 0xDE36", "0xD83C 0xDE37", "0xD83C 0xDE38", "0xD83C 0xDE39", "0xD83C 0xDE3A", "0xD83C 0xDE50", "0xD83C 0xDF00", "0xD83C 0xDF02", "0xD83C 0xDF03", "0xD83C 0xDF04", "0xD83C 0xDF05", "0xD83C 0xDF06", "0xD83C 0xDF07", "0xD83C 0xDF08", "0xD83C 0xDF0A", "0xD83C 0xDF19", "0xD83C 0xDF1F", "0xD83C 0xDF34", "0xD83C 0xDF35", "0xD83C 0xDF37", "0xD83C 0xDF38", "0xD83C 0xDF39", "0xD83C 0xDF3A", "0xD83C 0xDF3B", "0xD83C 0xDF3E", "0xD83C 0xDF40", "0xD83C 0xDF41", "0xD83C 0xDF42", "0xD83C 0xDF43", "0xD83C 0xDF45", "0xD83C 0xDF46", "0xD83C 0xDF49", "0xD83C 0xDF4A", "0xD83C 0xDF4E", "0xD83C 0xDF53", "0xD83C 0xDF54", "0xD83C 0xDF58", "0xD83C 0xDF59", "0xD83C 0xDF5A", "0xD83C 0xDF5B", "0xD83C 0xDF5C", "0xD83C 0xDF5D", "0xD83C 0xDF5E", "0xD83C 0xDF5F", "0xD83C 0xDF61", "0xD83C 0xDF62", "0xD83C 0xDF63", "0xD83C 0xDF66", "0xD83C 0xDF67", "0xD83C 0xDF70", "0xD83C 0xDF71", "0xD83C 0xDF72", "0xD83C 0xDF73", "0xD83C 0xDF74", "0xD83C 0xDF75", "0xD83C 0xDF76", "0xD83C 0xDF78", "0xD83C 0xDF7A", "0xD83C 0xDF7B", "0xD83C 0xDF80", "0xD83C 0xDF81", "0xD83C 0xDF82", "0xD83C 0xDF83", "0xD83C 0xDF84", "0xD83C 0xDF85", "0xD83C 0xDF86", "0xD83C 0xDF87", "0xD83C 0xDF88", "0xD83C 0xDF89", "0xD83C 0xDF8C", "0xD83C 0xDF8D", "0xD83C 0xDF8E", "0xD83C 0xDF8F", "0xD83C 0xDF90", "0xD83C 0xDF91", "0xD83C 0xDF92", "0xD83C 0xDF93", "0xD83C 0xDFA1", "0xD83C 0xDFA2", "0xD83C 0xDFA4", "0xD83C 0xDFA5", "0xD83C 0xDFA6", "0xD83C 0xDFA7", "0xD83C 0xDFA8", "0xD83C 0xDFA9", "0xD83C 0xDFAB", "0xD83C 0xDFAC", "0xD83C 0xDFAF", "0xD83C 0xDFB0", "0xD83C 0xDFB1", "0xD83C 0xDFB5", "0xD83C 0xDFB6", "0xD83C 0xDFB7", "0xD83C 0xDFB8", "0xD83C 0xDFBA", "0xD83C 0xDFBE", "0xD83C 0xDFBF", "0xD83C 0xDFC0", "0xD83C 0xDFC1", "0xD83C 0xDFC3", "0xD83C 0xDFC4", "0xD83C 0xDFC6", "0xD83C 0xDFC8", "0xD83C 0xDFCA", "0xD83C 0xDFE0", "0xD83C 0xDFE2", "0xD83C 0xDFE3", "0xD83C 0xDFE5", "0xD83C 0xDFE6", "0xD83C 0xDFE7", "0xD83C 0xDFE8", "0xD83C 0xDFE9", "0xD83C 0xDFEA", "0xD83C 0xDFEB", "0xD83C 0xDFEC", "0xD83C 0xDFED", "0xD83C 0xDFEF", "0xD83C 0xDFF0", "0xD83D 0xDC0D", "0xD83D 0xDC0E", "0xD83D 0xDC11", "0xD83D 0xDC12", "0xD83D 0xDC14", "0xD83D 0xDC17", "0xD83D 0xDC18", "0xD83D 0xDC19", "0xD83D 0xDC1A", "0xD83D 0xDC1B", "0xD83D 0xDC1F", "0xD83D 0xDC20", "0xD83D 0xDC24", "0xD83D 0xDC26", "0xD83D 0xDC27", "0xD83D 0xDC28", "0xD83D 0xDC2B", "0xD83D 0xDC2C", "0xD83D 0xDC2D", "0xD83D 0xDC2E", "0xD83D 0xDC2F", "0xD83D 0xDC30", "0xD83D 0xDC31", "0xD83D 0xDC33", "0xD83D 0xDC34", "0xD83D 0xDC35", "0xD83D 0xDC36", "0xD83D 0xDC37", "0xD83D 0xDC38", "0xD83D 0xDC39", "0xD83D 0xDC3A", "0xD83D 0xDC3B", "0xD83D 0xDC40", "0xD83D 0xDC42", "0xD83D 0xDC43", "0xD83D 0xDC44", "0xD83D 0xDC46", "0xD83D 0xDC47", "0xD83D 0xDC48", "0xD83D 0xDC49", "0xD83D 0xDC4A", "0xD83D 0xDC4B", "0xD83D 0xDC4C", "0xD83D 0xDC4D", "0xD83D 0xDC4E", "0xD83D 0xDC4F", "0xD83D 0xDC50", "0xD83D 0xDC51", "0xD83D 0xDC52", "0xD83D 0xDC54", "0xD83D 0xDC55", "0xD83D 0xDC57", "0xD83D 0xDC58", "0xD83D 0xDC59", "0xD83D 0xDC5C", "0xD83D 0xDC5F", "0xD83D 0xDC60", "0xD83D 0xDC61", "0xD83D 0xDC62", "0xD83D 0xDC63", "0xD83D 0xDC66", "0xD83D 0xDC67", "0xD83D 0xDC68", "0xD83D 0xDC69", "0xD83D 0xDC6B", "0xD83D 0xDC6E", "0xD83D 0xDC6F", "0xD83D 0xDC71", "0xD83D 0xDC72", "0xD83D 0xDC73", "0xD83D 0xDC74", "0xD83D 0xDC75", "0xD83D 0xDC76", "0xD83D 0xDC77", "0xD83D 0xDC78", "0xD83D 0xDC7B", "0xD83D 0xDC7C", "0xD83D 0xDC7D", "0xD83D 0xDC7E", "0xD83D 0xDC7F", "0xD83D 0xDC80", "0xD83D 0xDC81", "0xD83D 0xDC82", "0xD83D 0xDC83", "0xD83D 0xDC84", "0xD83D 0xDC85", "0xD83D 0xDC86", "0xD83D 0xDC87", "0xD83D 0xDC88", "0xD83D 0xDC89", "0xD83D 0xDC8A", "0xD83D 0xDC8B", "0xD83D 0xDC8D", "0xD83D 0xDC8E", "0xD83D 0xDC8F", "0xD83D 0xDC90", "0xD83D 0xDC91", "0xD83D 0xDC92", "0xD83D 0xDC93", "0xD83D 0xDC94", "0xD83D 0xDC97", "0xD83D 0xDC98", "0xD83D 0xDC99", "0xD83D 0xDC9A", "0xD83D 0xDC9B", "0xD83D 0xDC9C", "0xD83D 0xDC9D", "0xD83D 0xDC9F", "0xD83D 0xDCA1", "0xD83D 0xDCA2", "0xD83D 0xDCA3", "0xD83D 0xDCA4", "0xD83D 0xDCA6", "0xD83D 0xDCA8", "0xD83D 0xDCA9", "0xD83D 0xDCAA", "0xD83D 0xDCB0", "0xD83D 0xDCB1", "0xD83D 0xDCB9", "0xD83D 0xDCBA", "0xD83D 0xDCBB", "0xD83D 0xDCBC", "0xD83D 0xDCBD", "0xD83D 0xDCBF", "0xD83D 0xDCC0", "0xD83D 0xDCD6", "0xD83D 0xDCDD", "0xD83D 0xDCE0", "0xD83D 0xDCE1", "0xD83D 0xDCE2", "0xD83D 0xDCE3", "0xD83D 0xDCE9", "0xD83D 0xDCEB", "0xD83D 0xDCEE", "0xD83D 0xDCF1", "0xD83D 0xDCF2", "0xD83D 0xDCF3", "0xD83D 0xDCF4", "0xD83D 0xDCF6", "0xD83D 0xDCF7", "0xD83D 0xDCFA", "0xD83D 0xDCFB", "0xD83D 0xDCFC", "0xD83D 0xDD0A", "0xD83D 0xDD0D", "0xD83D 0xDD11", "0xD83D 0xDD12", "0xD83D 0xDD13", "0xD83D 0xDD14", "0xD83D 0xDD1D", "0xD83D 0xDD1E", "0xD83D 0xDD25", "0xD83D 0xDD28", "0xD83D 0xDD2B", "0xD83D 0xDD2F", "0xD83D 0xDD30", "0xD83D 0xDD31", "0xD83D 0xDD32", "0xD83D 0xDD33", "0xD83D 0xDD34", "0xD83D 0xDD50", "0xD83D 0xDD51", "0xD83D 0xDD52", "0xD83D 0xDD53", "0xD83D 0xDD54", "0xD83D 0xDD55", "0xD83D 0xDD56", "0xD83D 0xDD57", "0xD83D 0xDD58", "0xD83D 0xDD59", "0xD83D 0xDD5A", "0xD83D 0xDD5B", "0xD83D 0xDDFB", "0xD83D 0xDDFC", "0xD83D 0xDDFD", "0xD83D 0xDE01", "0xD83D 0xDE02", "0xD83D 0xDE03", "0xD83D 0xDE04", "0xD83D 0xDE09", "0xD83D 0xDE0A", "0xD83D 0xDE0C", "0xD83D 0xDE0D", "0xD83D 0xDE0F", "0xD83D 0xDE12", "0xD83D 0xDE13", "0xD83D 0xDE14", "0xD83D 0xDE16", "0xD83D 0xDE18", "0xD83D 0xDE1A", "0xD83D 0xDE1C", "0xD83D 0xDE1D", "0xD83D 0xDE1E", "0xD83D 0xDE20", "0xD83D 0xDE21", "0xD83D 0xDE22", "0xD83D 0xDE23", "0xD83D 0xDE25", "0xD83D 0xDE28", "0xD83D 0xDE2A", "0xD83D 0xDE2D", "0xD83D 0xDE30", "0xD83D 0xDE31", "0xD83D 0xDE32", "0xD83D 0xDE33", "0xD83D 0xDE37", "0xD83D 0xDE45", "0xD83D 0xDE46", "0xD83D 0xDE47", "0xD83D 0xDE4C", "0xD83D 0xDE4F", "0xD83D 0xDE80", "0xD83D 0xDE83", "0xD83D 0xDE84", "0xD83D 0xDE85", "0xD83D 0xDE87", "0xD83D 0xDE89", "0xD83D 0xDE8C", "0xD83D 0xDE8F", "0xD83D 0xDE91", "0xD83D 0xDE92", "0xD83D 0xDE93", "0xD83D 0xDE95", "0xD83D 0xDE97", "0xD83D 0xDE99", "0xD83D 0xDE9A", "0xD83D 0xDEA2", "0xD83D 0xDEA4", "0xD83D 0xDEA5", "0xD83D 0xDEA7", "0xD83D 0xDEAC", "0xD83D 0xDEAD", "0xD83D 0xDEB2", "0xD83D 0xDEB6", "0xD83D 0xDEB9", "0xD83D 0xDEBA", "0xD83D 0xDEBB", "0xD83D 0xDEBC", "0xD83D 0xDEBD", "0xD83D 0xDEBE", "0xD83D 0xDEC0" };

        //     static string[] aa =  {'0xA9','0xAE',
        //'0x2122',
        //'0x2196',
        //'0x2197',
        //'0x2198',
        //'0x2199',
        //'0x23E9',
        //'0x23EA',
        //'0x25B6',
        //'0x25C0',
        //'0x2600',
        //'0x2601',
        //'0x260E',
        //'0x2614',
        //'0x2615',
        //'0x261D',
        //'0x263A',
        //'0x2648',
        //'0x2649',
        //'0x264A',
        //'0x264B',
        //'0x264C',
        //'0x264D',
        //'0x264E',
        //'0x264F',
        //'0x2650',
        //'0x2651',
        //'0x2652',
        //'0x2653',
        //'0x2660',
        //'0x2663',
        //'0x2665',
        //'0x2666',
        //'0x2668',
        //'0x267F',
        //'0x26A0',
        //'0x26A1',
        //'0x26BD',
        //'0x26BE',
        //'0x26C4',
        //'0x26CE',
        //'0x26EA',
        //'0x26F2',
        //'0x26F3',
        //'0x26F5',
        //'0x26FA',
        //'0x26FD',
        //'0x2702',
        //'0x2708',
        //'0x270A',
        //'0x270B',
        //'0x270C',
        //'0x2728',
        //'0x2733',
        //'0x2734',
        //'0x274C',
        //'0x2754',
        //'0x2755',
        //'0x2764',
        //'0x27A1',
        //'0x27BF',
        //'0x2B05',
        //'0x2B06',
        //'0x2B07',
        //'0x2B55',
        //'0x303D',
        //'0x3297',
        //'0x3299',
        //'0x23 0x20E3',
        //'0x30 0x20E3',
        //'0x31 0x20E3',
        //'0x32 0x20E3',
        //'0x33 0x20E3',
        //'0x34 0x20E3',
        //'0x35 0x20E3',
        //'0x36 0x20E3',
        //'0x37 0x20E3',
        //'0x38 0x20E3',
        //'0x39 0x20E3',
        //'0xD83C 0xDC04',
        //'0xD83C 0xDD70',
        //'0xD83C 0xDD71',
        //'0xD83C 0xDD7E',
        //'0xD83C 0xDD7F',
        //'0xD83C 0xDD8E',
        //'0xD83C 0xDD92',
        //'0xD83C 0xDD94',
        //'0xD83C 0xDD95',
        //'0xD83C 0xDD97',
        //'0xD83C 0xDD99',
        //'0xD83C 0xDD9A',
        //'0xD83C 0xDDE8 0xD83C 0xDDF3',
        //'0xD83C 0xDDE9 0xD83C 0xDDEA',
        //'0xD83C 0xDDEA 0xD83C 0xDDF8',
        //'0xD83C 0xDDEB 0xD83C 0xDDF7',
        //'0xD83C 0xDDEC 0xD83C 0xDDE7',
        //'0xD83C 0xDDEE 0xD83C 0xDDF9',
        //'0xD83C 0xDDEF 0xD83C 0xDDF5',
        //'0xD83C 0xDDF0 0xD83C 0xDDF7',
        //'0xD83C 0xDDF7 0xD83C 0xDDFA',
        //'0xD83C 0xDDFA 0xD83C 0xDDF8',
        //'0xD83C 0xDE01',
        //'0xD83C 0xDE02',
        //'0xD83C 0xDE1A',
        //'0xD83C 0xDE2F',
        //'0xD83C 0xDE33',
        //'0xD83C 0xDE35',
        //'0xD83C 0xDE36',
        //'0xD83C 0xDE37',
        //'0xD83C 0xDE38',
        //'0xD83C 0xDE39',
        //'0xD83C 0xDE3A',
        //'0xD83C 0xDE50',
        //'0xD83C 0xDF00',
        //'0xD83C 0xDF02',
        //'0xD83C 0xDF03',
        //'0xD83C 0xDF04',
        //'0xD83C 0xDF05',
        //'0xD83C 0xDF06',
        //'0xD83C 0xDF07',
        //'0xD83C 0xDF08',
        //'0xD83C 0xDF0A',
        //'0xD83C 0xDF19',
        //'0xD83C 0xDF1F',
        //'0xD83C 0xDF34',
        //'0xD83C 0xDF35',
        //'0xD83C 0xDF37',
        //'0xD83C 0xDF38',
        //'0xD83C 0xDF39',
        //'0xD83C 0xDF3A',
        //'0xD83C 0xDF3B',
        //'0xD83C 0xDF3E',
        //'0xD83C 0xDF40',
        //'0xD83C 0xDF41',
        //'0xD83C 0xDF42',
        //'0xD83C 0xDF43',
        //'0xD83C 0xDF45',
        //'0xD83C 0xDF46',
        //'0xD83C 0xDF49',
        //'0xD83C 0xDF4A',
        //'0xD83C 0xDF4E',
        //'0xD83C 0xDF53',
        //'0xD83C 0xDF54',
        //'0xD83C 0xDF58',
        //'0xD83C 0xDF59',
        //'0xD83C 0xDF5A',
        //'0xD83C 0xDF5B',
        //'0xD83C 0xDF5C',
        //'0xD83C 0xDF5D',
        //'0xD83C 0xDF5E',
        //'0xD83C 0xDF5F',
        //'0xD83C 0xDF61',
        //'0xD83C 0xDF62',
        //'0xD83C 0xDF63',
        //'0xD83C 0xDF66',
        //'0xD83C 0xDF67',
        //'0xD83C 0xDF70',
        //'0xD83C 0xDF71',
        //'0xD83C 0xDF72',
        //'0xD83C 0xDF73',
        //'0xD83C 0xDF74',
        //'0xD83C 0xDF75',
        //'0xD83C 0xDF76',
        //'0xD83C 0xDF78',
        //'0xD83C 0xDF7A',
        //'0xD83C 0xDF7B',
        //'0xD83C 0xDF80',
        //'0xD83C 0xDF81',
        //'0xD83C 0xDF82',
        //'0xD83C 0xDF83',
        //'0xD83C 0xDF84',
        //'0xD83C 0xDF85',
        //'0xD83C 0xDF86',
        //'0xD83C 0xDF87',
        //'0xD83C 0xDF88',
        //'0xD83C 0xDF89',
        //'0xD83C 0xDF8C',
        //'0xD83C 0xDF8D',
        //'0xD83C 0xDF8E',
        //'0xD83C 0xDF8F',
        //'0xD83C 0xDF90',
        //'0xD83C 0xDF91',
        //'0xD83C 0xDF92',
        //'0xD83C 0xDF93',
        //'0xD83C 0xDFA1',
        //'0xD83C 0xDFA2',
        //'0xD83C 0xDFA4',
        //'0xD83C 0xDFA5',
        //'0xD83C 0xDFA6',
        //'0xD83C 0xDFA7',
        //'0xD83C 0xDFA8',
        //'0xD83C 0xDFA9',
        //'0xD83C 0xDFAB',
        //'0xD83C 0xDFAC',
        //'0xD83C 0xDFAF',
        //'0xD83C 0xDFB0',
        //'0xD83C 0xDFB1',
        //'0xD83C 0xDFB5',
        //'0xD83C 0xDFB6',
        //'0xD83C 0xDFB7',
        //'0xD83C 0xDFB8',
        //'0xD83C 0xDFBA',
        //'0xD83C 0xDFBE',
        //'0xD83C 0xDFBF',
        //'0xD83C 0xDFC0',
        //'0xD83C 0xDFC1',
        //'0xD83C 0xDFC3',
        //'0xD83C 0xDFC4',
        //'0xD83C 0xDFC6',
        //'0xD83C 0xDFC8',
        //'0xD83C 0xDFCA',
        //'0xD83C 0xDFE0',
        //'0xD83C 0xDFE2',
        //'0xD83C 0xDFE3',
        //'0xD83C 0xDFE5',
        //'0xD83C 0xDFE6',
        //'0xD83C 0xDFE7',
        //'0xD83C 0xDFE8',
        //'0xD83C 0xDFE9',
        //'0xD83C 0xDFEA',
        //'0xD83C 0xDFEB',
        //'0xD83C 0xDFEC',
        //'0xD83C 0xDFED',
        //'0xD83C 0xDFEF',
        //'0xD83C 0xDFF0',
        //'0xD83D 0xDC0D',
        //'0xD83D 0xDC0E',
        //'0xD83D 0xDC11',
        //'0xD83D 0xDC12',
        //'0xD83D 0xDC14',
        //'0xD83D 0xDC17',
        //'0xD83D 0xDC18',
        //'0xD83D 0xDC19',
        //'0xD83D 0xDC1A',
        //'0xD83D 0xDC1B',
        //'0xD83D 0xDC1F',
        //'0xD83D 0xDC20',
        //'0xD83D 0xDC24',
        //'0xD83D 0xDC26',
        //'0xD83D 0xDC27',
        //'0xD83D 0xDC28',
        //'0xD83D 0xDC2B',
        //'0xD83D 0xDC2C',
        //'0xD83D 0xDC2D',
        //'0xD83D 0xDC2E',
        //'0xD83D 0xDC2F',
        //'0xD83D 0xDC30',
        //'0xD83D 0xDC31',
        //'0xD83D 0xDC33',
        //'0xD83D 0xDC34',
        //'0xD83D 0xDC35',
        //'0xD83D 0xDC36',
        //'0xD83D 0xDC37',
        //'0xD83D 0xDC38',
        //'0xD83D 0xDC39',
        //'0xD83D 0xDC3A',
        //'0xD83D 0xDC3B',
        //'0xD83D 0xDC40',
        //'0xD83D 0xDC42',
        //'0xD83D 0xDC43',
        //'0xD83D 0xDC44',
        //'0xD83D 0xDC46',
        //'0xD83D 0xDC47',
        //'0xD83D 0xDC48',
        //'0xD83D 0xDC49',
        //'0xD83D 0xDC4A',
        //'0xD83D 0xDC4B',
        //'0xD83D 0xDC4C',
        //'0xD83D 0xDC4D',
        //'0xD83D 0xDC4E',
        //'0xD83D 0xDC4F',
        //'0xD83D 0xDC50',
        //'0xD83D 0xDC51',
        //'0xD83D 0xDC52',
        //'0xD83D 0xDC54',
        //'0xD83D 0xDC55',
        //'0xD83D 0xDC57',
        //'0xD83D 0xDC58',
        //'0xD83D 0xDC59',
        //'0xD83D 0xDC5C',
        //'0xD83D 0xDC5F',
        //'0xD83D 0xDC60',
        //'0xD83D 0xDC61',
        //'0xD83D 0xDC62',
        //'0xD83D 0xDC63',
        //'0xD83D 0xDC66',
        //'0xD83D 0xDC67',
        //'0xD83D 0xDC68',
        //'0xD83D 0xDC69',
        //'0xD83D 0xDC6B',
        //'0xD83D 0xDC6E',
        //'0xD83D 0xDC6F',
        //'0xD83D 0xDC71',
        //'0xD83D 0xDC72',
        //'0xD83D 0xDC73',
        //'0xD83D 0xDC74',
        //'0xD83D 0xDC75',
        //'0xD83D 0xDC76',
        //'0xD83D 0xDC77',
        //'0xD83D 0xDC78',
        //'0xD83D 0xDC7B',
        //'0xD83D 0xDC7C',
        //'0xD83D 0xDC7D',
        //'0xD83D 0xDC7E',
        //'0xD83D 0xDC7F',
        //'0xD83D 0xDC80',
        //'0xD83D 0xDC81',
        //'0xD83D 0xDC82',
        //'0xD83D 0xDC83',
        //'0xD83D 0xDC84',
        //'0xD83D 0xDC85',
        //'0xD83D 0xDC86',
        //'0xD83D 0xDC87',
        //'0xD83D 0xDC88',
        //'0xD83D 0xDC89',
        //'0xD83D 0xDC8A',
        //'0xD83D 0xDC8B',
        //'0xD83D 0xDC8D',
        //'0xD83D 0xDC8E',
        //'0xD83D 0xDC8F',
        //'0xD83D 0xDC90',
        //'0xD83D 0xDC91',
        //'0xD83D 0xDC92',
        //'0xD83D 0xDC93',
        //'0xD83D 0xDC94',
        //'0xD83D 0xDC97',
        //'0xD83D 0xDC98',
        //'0xD83D 0xDC99',
        //'0xD83D 0xDC9A',
        //'0xD83D 0xDC9B',
        //'0xD83D 0xDC9C',
        //'0xD83D 0xDC9D',
        //'0xD83D 0xDC9F',
        //'0xD83D 0xDCA1',
        //'0xD83D 0xDCA2',
        //'0xD83D 0xDCA3',
        //'0xD83D 0xDCA4',
        //'0xD83D 0xDCA6',
        //'0xD83D 0xDCA8',
        //'0xD83D 0xDCA9',
        //'0xD83D 0xDCAA',
        //'0xD83D 0xDCB0',
        //'0xD83D 0xDCB1',
        //'0xD83D 0xDCB9',
        //'0xD83D 0xDCBA',
        //'0xD83D 0xDCBB',
        //'0xD83D 0xDCBC',
        //'0xD83D 0xDCBD',
        //'0xD83D 0xDCBF',
        //'0xD83D 0xDCC0',
        //'0xD83D 0xDCD6',
        //'0xD83D 0xDCDD',
        //'0xD83D 0xDCE0',
        //'0xD83D 0xDCE1',
        //'0xD83D 0xDCE2',
        //'0xD83D 0xDCE3',
        //'0xD83D 0xDCE9',
        //'0xD83D 0xDCEB',
        //'0xD83D 0xDCEE',
        //'0xD83D 0xDCF1',
        //'0xD83D 0xDCF2',
        //'0xD83D 0xDCF3',
        //'0xD83D 0xDCF4',
        //'0xD83D 0xDCF6',
        //'0xD83D 0xDCF7',
        //'0xD83D 0xDCFA',
        //'0xD83D 0xDCFB',
        //'0xD83D 0xDCFC',
        //'0xD83D 0xDD0A',
        //'0xD83D 0xDD0D',
        //'0xD83D 0xDD11',
        //'0xD83D 0xDD12',
        //'0xD83D 0xDD13',
        //'0xD83D 0xDD14',
        //'0xD83D 0xDD1D',
        //'0xD83D 0xDD1E',
        //'0xD83D 0xDD25',
        //'0xD83D 0xDD28',
        //'0xD83D 0xDD2B',
        //'0xD83D 0xDD2F',
        //'0xD83D 0xDD30',
        //'0xD83D 0xDD31',
        //'0xD83D 0xDD32',
        //'0xD83D 0xDD33',
        //'0xD83D 0xDD34',
        //'0xD83D 0xDD50',
        //'0xD83D 0xDD51',
        //'0xD83D 0xDD52',
        //'0xD83D 0xDD53',
        //'0xD83D 0xDD54',
        //'0xD83D 0xDD55',
        //'0xD83D 0xDD56',
        //'0xD83D 0xDD57',
        //'0xD83D 0xDD58',
        //'0xD83D 0xDD59',
        //'0xD83D 0xDD5A',
        //'0xD83D 0xDD5B',
        //'0xD83D 0xDDFB',
        //'0xD83D 0xDDFC',
        //'0xD83D 0xDDFD',
        //'0xD83D 0xDE01',
        //'0xD83D 0xDE02',
        //'0xD83D 0xDE03',
        //'0xD83D 0xDE04',
        //'0xD83D 0xDE09',
        //'0xD83D 0xDE0A',
        //'0xD83D 0xDE0C',
        //'0xD83D 0xDE0D',
        //'0xD83D 0xDE0F',
        //'0xD83D 0xDE12',
        //'0xD83D 0xDE13',
        //'0xD83D 0xDE14',
        //'0xD83D 0xDE16',
        //'0xD83D 0xDE18',
        //'0xD83D 0xDE1A',
        //'0xD83D 0xDE1C',
        //'0xD83D 0xDE1D',
        //'0xD83D 0xDE1E',
        //'0xD83D 0xDE20',
        //'0xD83D 0xDE21',
        //'0xD83D 0xDE22',
        //'0xD83D 0xDE23',
        //'0xD83D 0xDE25',
        //'0xD83D 0xDE28',
        //'0xD83D 0xDE2A',
        //'0xD83D 0xDE2D',
        //'0xD83D 0xDE30',
        //'0xD83D 0xDE31',
        //'0xD83D 0xDE32',
        //'0xD83D 0xDE33',
        //'0xD83D 0xDE37',
        //'0xD83D 0xDE45',
        //'0xD83D 0xDE46',
        //'0xD83D 0xDE47',
        //'0xD83D 0xDE4C',
        //'0xD83D 0xDE4F',
        //'0xD83D 0xDE80',
        //'0xD83D 0xDE83',
        //'0xD83D 0xDE84',
        //'0xD83D 0xDE85',
        //'0xD83D 0xDE87',
        //'0xD83D 0xDE89',
        //'0xD83D 0xDE8C',
        //'0xD83D 0xDE8F',
        //'0xD83D 0xDE91',
        //'0xD83D 0xDE92',
        //'0xD83D 0xDE93',
        //'0xD83D 0xDE95',
        //'0xD83D 0xDE97',
        //'0xD83D 0xDE99',
        //'0xD83D 0xDE9A',
        //'0xD83D 0xDEA2',
        //'0xD83D 0xDEA4',
        //'0xD83D 0xDEA5',
        //'0xD83D 0xDEA7',
        //'0xD83D 0xDEAC',
        //'0xD83D 0xDEAD',
        //'0xD83D 0xDEB2',
        //'0xD83D 0xDEB6',
        //'0xD83D 0xDEB9',
        //'0xD83D 0xDEBA',
        //'0xD83D 0xDEBB',
        //'0xD83D 0xDEBC',
        //'0xD83D 0xDEBD',
        //'0xD83D 0xDEBE',
        //'0xD83D 0xDEC0'};



        public static string dencodeEmoji(string str)
        {
            string resultString = str;


            // resultString = ToGB2312(str);
            resultString = System.Web.HttpUtility.UrlDecode(resultString, System.Text.Encoding.UTF8);
            return resultString;
        }

        /// <summary>
        /// 汉字转换为Unicode编码
        /// </summary>
        /// <param name="str">要编码的汉字字符串</param>
        /// <returns>Unicode编码的的字符串</returns>
        private static string ToUnicode(string str)
        {
            byte[] bts = Encoding.Unicode.GetBytes(str);
            string r = "";
            for (int i = 0; i < bts.Length; i += 2)
            {
                //\\u开头转16进制，2位补0
                r += "^" + bts[i + 1].ToString("x").PadLeft(2, '0') + bts[i].ToString("x").PadLeft(2, '0');

                //0x开头转16进制,不补0
                //  r += "0x" + bts[i + 1].ToString("x") + bts[i].ToString("x").PadLeft(2, '0');
                //   r += bts[i + 1].ToString() + bts[i].ToString();
            }

            return r;
        }
        /// <summary>
        /// 将Unicode编码转换为汉字字符串
        /// </summary>
        /// <param name="str">Unicode编码字符串</param>
        /// <returns>汉字字符串</returns>
        private static string ToGB2312(string str)
        {
            string r = "";
            MatchCollection mc = Regex.Matches(str, @"\\u([\w]{2})([\w]{2})", RegexOptions.Compiled | RegexOptions.IgnoreCase);
            byte[] bts = new byte[2];
            foreach (Match m in mc)
            {
                bts[0] = (byte)int.Parse(m.Groups[2].Value, NumberStyles.HexNumber);
                bts[1] = (byte)int.Parse(m.Groups[1].Value, NumberStyles.HexNumber);
                r += Encoding.Unicode.GetString(bts);
            }
            return r;
        }

        ///// <summary>
        ///// 带Emoji表情的的字符串
        ///// [e]1f1e6[/e]
        ///// [e]1f1fa[/e]
        ///// [e]1f1e6[/e]
        ///// </summary>
        ///// <param name="str"></param>
        ///// <returns></returns>

        //public static string ToUnicode(this string str)
        //{

        //    foreach (var a in str)
        //    {
        //    byte[] bts = Encoding.Unicode.GetBytes(str.ToString());

        //        if (bts.Length != 4 && bts.Length != 5)
        //        {
        //            throw new ArgumentException("错误的 EmojiCode 16进制数据长度.一般为4位或5位");
        //        }

        //        Int32 Bint = System.BitConverter.ToInt32(bts, 0);
        //        var mm = UTF16ToEmoji(Bint);
        //        string strA = mm.ToString("x");


        //        str = str.Replace(str.ToString(), strA);

        //   }
        //    return str;


        //}
        ///// <summary>
        ///// 返回Emoji表情utf16 对应的int值
        ///// </summary>
        ///// <param name="Bint"></param>
        ///// <param name="LowHeight"></param>
        ///// <returns></returns>
        //private static Int32 UTF16ToEmoji(Int32 Bint, bool LowHeight = true)
        //{

        //    Int32 Bintf = ~Bint;
        //    Int32 Bintffh = Bintf >> 16;
        //    Int32 y = Bintffh ^ 0xffff;
        //    Int32 Bintfl = Bintf & 0x7fff;
        //    Int32 x = Bintfl ^ 0xffff;
        //    //  (((( (x ^ 0xD800) << 2) | ((y ^ 0xDC00) >> 8)) << 8) | ((y ^ 0xDC00) & 0xFF)) + 0x10000
        //    Int32 Vx = x ^ 0xD800;
        //    Int32 Vx1 = Vx << 2;
        //    Int32 Vy = y ^ 0xDC00;
        //    Int32 Vy1 = Vy >> 8;
        //    Int32 xy = (Vx1 | Vy1) << 8;

        //    Int32 N = y ^ 0xDC00;
        //    Int32 M = N & 0xFF;

        //    Int32 d = xy | M;
        //    return d + 0x10000;
        //}
        ///// <summary>
        ///// 把 Emoji编码 [e]1f1e6-1f1fa[/e]
        /////     [e]1f1e6[/e]
        /////     [e]1f1fa[/e]
        /////     [e]1f1e6[/e]
        /////     [e]1f1f9[/e] 换成对应的字符串,此字符串能被window8.1,ios,andriod 直接显示.
        /////     
        ///// 如果在网页中显示,需要设置字体为 'Segoe UI Emoji' 如下.当然客户机还必须得有这个字体.
        ///// 
        /////     <span style="font-family:'Segoe UI Emoji';"></span>
        /////     
        ///// </summary>
        ///// <param name="paramContent"></param>
        ///// <returns></returns>
        //public static string GetEmoji(this string paramContent)
        //{
        //    StringBuilder newString = new StringBuilder(2000);
        //    StringBuilder tempEmojiSB = new StringBuilder(20);
        //    StringBuilder tmps = new StringBuilder(5);

        //    int ln = paramContent.Length;
        //    for (int index = 0; index < ln; index++)
        //    {
        //        int i = index; //把指针给一个临时变量,方便出错时,现场恢复.
        //        try
        //        {

        //            if (paramContent[i] == '[')
        //            {
        //                //预测
        //                if (paramContent[i + 1] == 'e')
        //                {
        //                    if (paramContent[i + 2] == ']') //[e]的后面4位是 unicode 的16进制数值.
        //                    {
        //                        i = i + 3; //前进3位 

        //                        i = ChangUnicodeToUTF16(paramContent, tempEmojiSB, tmps, i);

        //                        if (paramContent[i] == '-')//向前探测1位 看看是否双字符 形如1f1e7-1f1ea 
        //                        {
        //                            i++;
        //                            i = ChangUnicodeToUTF16(paramContent, tempEmojiSB, tmps, i);

        //                        };

        //                        if (paramContent[i] == '[')
        //                        {
        //                            if (paramContent[i + 1] == '/')
        //                            {
        //                                if (paramContent[i + 2] == 'e')
        //                                {
        //                                    if (paramContent[i + 3] == ']')
        //                                    {
        //                                        i = i + 3; //再前进4位

        //                                        index = i;                             //识别转换成功
        //                                        newString.Append(tempEmojiSB.ToString());   //识别转换成功
        //                                        tempEmojiSB.Clear();
        //                                        continue;
        //                                    }
        //                                }
        //                            }
        //                        }

        //                    }
        //                }
        //            }

        //            index = i;

        //        }
        //        catch (Exception ex)
        //        {
        //            //解析失败仍然继续吃.
        //        }
        //        newString.Append(paramContent[index]);

        //    }
        //    return newString.ToString();
        //}

        /////// <summary>
        /////// 检测字符是否是合法的Emoji字符串
        /////// </summary>
        /////// <param name="paramContent"></param>
        /////// <param name="i"></param>
        /////// <returns></returns>



        //private static int ChangUnicodeToUTF16(string paramContent, StringBuilder tempSB, StringBuilder tmps, int i)
        //{
        //    for (int maxln = 0; maxln < 20; maxln++)
        //    {
        //        if (paramContent[i] != '-' && paramContent[i] != '[')
        //        {  //向前探测1位
        //            tmps.Append(paramContent[i]);
        //            i++;
        //        }
        //        else
        //        {
        //            break;
        //        }
        //    }


        //    tempSB.Append(EmojiCodeToUTF16String(tmps.ToString()));

        //    tmps.Clear();
        //    return i;
        //}

        ///// <summary>
        ///// EmoJi U+字符串对应的 int 值 转换成UTF16字符编码的值
        ///// </summary>
        ///// <param name="V">EmojiU+1F604 转成计算机整形以后的值V=0x1F604 </param>
        ///// <param name="LowHeight">低字节在前的顺序.(默认)</param>
        ///// <remarks>
        /////参考  
        /////http://blog.csdn.net/fengsh998/article/details/8668002
        /////http://punchdrunker.github.io/iOSEmoji/table_html/index.html
        ///// V  = 0x64321
        ///// Vx = V - 0x10000
        /////    = 0x54321
        /////    = 0101 0100 0011 0010 0001
        /////
        ///// Vh = 01 0101 0000 // Vx 的高位部份的 10 bits
        ///// Vl = 11 0010 0001 // Vx 的低位部份的 10 bits
        ///// wh = 0xD800 //結果的前16位元初始值
        ///// wl = 0xDC00 //結果的後16位元初始值
        /////
        ///// wh = wh | Vh
        /////    = 1101 1000 0000 0000
        /////    |        01 0101 0000
        /////    = 1101 1001 0101 0000
        /////    = 0xD950
        /////
        ///// wl = wl | Vl
        /////    = 1101 1100 0000 0000
        /////    |        11 0010 0001
        /////    = 1101 1111 0010 0001
        /////    = 0xDF21
        ///// </remarks>
        ///// <returns>EMOJI字符对应的UTF16编码16进制整形表示</returns>
        //private static Int32 EmojiToUTF16(Int32 V, bool LowHeight = true)
        //{

        //    Int32 Vx = V - 0x10000;

        //    Int32 Vh = Vx >> 10;//取高10位部分
        //    Int32 Vl = Vx & 0x3ff; //取低10位部分
        //    //Response.Write("Vh:"); Response.Write(Convert.ToString(Vh, 2)); Response.Write("<br/>"); //2进制显示
        //    //Response.Write("Vl:"); Response.Write(Convert.ToString(Vl, 2)); Response.Write("<br/>"); //2进制显示

        //    Int32 wh = 0xD800; //結果的前16位元初始值,这个地方应该是根据Unicode的编码规则总结出来的数值.
        //    Int32 wl = 0xDC00; //結果的後16位元初始值,这个地方应该是根据Unicode的编码规则总结出来的数值.
        //    wh = wh | Vh;
        //    wl = wl | Vl;
        //    //Response.Write("wh:"); Response.Write(Convert.ToString(wh, 2)); Response.Write("<br/>");//2进制显示
        //    //Response.Write("wl:"); Response.Write(Convert.ToString(wl, 2)); Response.Write("<br/>");//2进制显示
        //    if (LowHeight)
        //    {
        //        return wl << 16 | wh;   //低位左移16位以后再把高位合并起来 得到的结果是UTF16的编码值   //适合低位在前的操作系统 
        //    }
        //    else
        //    {
        //        return wh << 16 | wl; //高位左移16位以后再把低位合并起来 得到的结果是UTF16的编码值   //适合高位在前的操作系统
        //    }


        //}

        ///// <summary>
        ///// 字符串形式的 Emoji 16进制Unicode编码  转换成 UTF16字符串 能够直接输出到客户端
        ///// </summary>
        ///// <param name="EmojiCode"></param>
        ///// <returns></returns>
        //private static string EmojiCodeToUTF16String(string EmojiCode)
        //{
        //    if (EmojiCode.Length != 4 && EmojiCode.Length != 5)
        //    {
        //        throw new ArgumentException("错误的 EmojiCode 16进制数据长度.一般为4位或5位");
        //    }
        //    //1f604
        //    int EmojiUnicodeHex = int.Parse(EmojiCode, System.Globalization.NumberStyles.HexNumber);

        //    //1f604对应 utf16 编码的int
        //    Int32 EmojiUTF16Hex = EmojiToUTF16(EmojiUnicodeHex, true);             //这里字符的低位在前.高位在后.
        //    //Response.Write(Convert.ToString(lon, 16)); Response.Write("<br/>"); //这里字符的低位在前.高位在后. 
        //    var emojiBytes = BitConverter.GetBytes(EmojiUTF16Hex);                     //把整型值变成Byte[]形式. Int64的话 丢掉高位的空白0000000   

        //    return Encoding.Unicode.GetString(emojiBytes);
        //} 


        //        [WebMethod]


        //        //可以包括其他字符       
        //        public string uncode(string str)
        //        {
        //            string outStr = "";
        //            Regex reg = new Regex(@"(?i)//u([0-9a-f]{4})");
        //            outStr = reg.Replace(str, delegate(Match m1)
        //            {
        //                return ((char)Convert.ToInt32(m1.Groups[1].Value, 16)).ToString();
        //            });
        //            return outStr;
        //        }

        //        public string ccdd(string ccd)
        //        {
        //            string a = @" 中间有中文 [e]1f604[/e]也可以[e]1f612[/e][e]1f60c[/e][e]1f60c[/e][e]1f60d[/e][e]1f616[/e][e]1f632[/e][e]1f632[/e][e]1f632[/e][e]1f632[/e][e]1f616[/e][e]1f632[/e] 
        //";

        //            string b = GetEmoji(a);//这里b输出的就是笑脸了.



        //            Dictionary<string, string> resultDic = new Dictionary<string, string>();
        //            resultDic["result"] = "true";
        //            resultDic["message"] = b;
        //            return Eva.Library.Format.FormatEntityTool.FormatDicToJson(resultDic);
        //        }

        //        /// <summary>
        //        /// 把 Emoji编码 [e]1f1e6-1f1fa[/e]
        //        ///     [e]1f1e6[/e]
        //        ///     [e]1f1fa[/e]
        //        ///     [e]1f1e6[/e]
        //        ///     [e]1f1f9[/e] 换成对应的字符串,此字符串能被window8.1,ios,andriod 直接显示.
        //        ///     
        //        /// 如果在网页中显示,需要设置字体为 'Segoe UI Emoji' 如下.当然客户机还必须得有这个字体.
        //        /// 
        //        ///     <span style="font-family:'Segoe UI Emoji';"></span>
        //        ///     
        //        /// </summary>
        //        /// <param name="paramContent"></param>
        //        /// <returns></returns>
        //        public string GetEmoji(string paramContent)
        //        {
        //            string paramContentR = paramContent.Replace("[e]", "\\u").Replace("[/e]", "");


        //            var unicodehex = new char[6] { '0', '0', '0', '0', '0', '0' };

        //            StringBuilder newString = new StringBuilder(2000);
        //            StringBuilder tempEmojiSB = new StringBuilder(20);
        //            StringBuilder tmps = new StringBuilder(5);

        //            int ln = paramContent.Length;
        //            for (int index = 0; index < ln; index++)
        //            {
        //                int i = index; //把指针给一个临时变量,方便出错时,现场恢复.
        //                try
        //                {

        //                    if (paramContent[i] == '[')
        //                    {
        //                        //预测
        //                        if (paramContent[i + 1] == 'e')
        //                        {
        //                            if (paramContent[i + 2] == ']') //[e]的后面4位是 unicode 的16进制数值.
        //                            {
        //                                i = i + 3; //前进3位 

        //                                i = ChangUnicodeToUTF16(paramContent, tempEmojiSB, tmps, i);

        //                                if (paramContent[i] == '-')//向前探测1位 看看是否双字符 形如1f1e7-1f1ea 
        //                                {
        //                                    i++;
        //                                    i = ChangUnicodeToUTF16(paramContent, tempEmojiSB, tmps, i);

        //                                };

        //                                if (paramContent[i] == '[')
        //                                {
        //                                    if (paramContent[i + 1] == '/')
        //                                    {
        //                                        if (paramContent[i + 2] == 'e')
        //                                        {
        //                                            if (paramContent[i + 3] == ']')
        //                                            {
        //                                                i = i + 3; //再前进4位

        //                                                index = i;                             //识别转换成功
        //                                                newString.Append(tempEmojiSB.ToString());   //识别转换成功
        //                                                tempEmojiSB.Clear();
        //                                                continue;
        //                                            }
        //                                        }
        //                                    }
        //                                }

        //                            }
        //                        }
        //                    }

        //                    index = i;

        //                }
        //                catch (Exception ex)
        //                {
        //                    //解析失败仍然继续吃.
        //                }
        //                newString.Append(paramContent[index]);

        //            }
        //            return newString.ToString();
        //        }

        //        ///// <summary>
        //        ///// 检测字符是否是合法的Emoji字符串
        //        ///// </summary>
        //        ///// <param name="paramContent"></param>
        //        ///// <param name="i"></param>
        //        ///// <returns></returns>
        //        //private bool checkNextEmoji(string paramContent, int i)
        //        //{
        //        //    //状态说明,
        //        //    //[ e ] * [ \ e ]
        //        //    //0 1 2 3 4 5 6 7
        //        //    int state = 0;
        //        //    int lencount = 0;
        //        //    while (i < paramContent.Length)
        //        //    {
        //        //        switch (state)
        //        //        {
        //        //            case 0:
        //        //                if (paramContent[i] == '[') state = 1; else return false;
        //        //                    break; 
        //        //            case 1:
        //        //                    if (paramContent[i] == 'e') state = 2; else return false;
        //        //                    break; 
        //        //            case 2:
        //        //                    if (paramContent[i] == ']') state = 3; else return false;
        //        //                    break; 
        //        //            case 3:
        //        //                    if (paramContent[i] == '[')  state = 4; 
        //        //                    else
        //        //                    { //这里识别 * 任何符号.如果超出了规定的长度,那么视为未匹配.防止陷入无限死循环
        //        //                        if (lencount < 20) {
        //        //                            lencount++;
        //        //                        }else {
        //        //                            return false;
        //        //                        }
        //        //                        state = 3;
        //        //                    }
        //        //                    break; 
        //        //            case 4:
        //        //                    if (paramContent[i] == '/') state = 5; else return false;
        //        //                    break;
        //        //            case 5:
        //        //                    if (paramContent[i] == 'e') state = 6; else return false;
        //        //                     break;
        //        //            case 6:
        //        //                    if (paramContent[i] == ']')
        //        //                        state = 7;
        //        //                    else return false;
        //        //                        break; 
        //        //            case 7: 
        //        //                    return true; 
        //        //            default:
        //        //                return false;
        //        //        }

        //        //        i++;
        //        //    }

        //        //    return state == 7;
        //        //}


        //        public int ChangUnicodeToUTF16(string paramContent, StringBuilder tempSB, StringBuilder tmps, int i)
        //        {
        //            for (int maxln = 0; maxln < 20; maxln++)
        //            {
        //                if (paramContent[i] != '-' && paramContent[i] != '[')
        //                {  //向前探测1位
        //                    tmps.Append(paramContent[i]);
        //                    i++;
        //                }
        //                else
        //                {
        //                    break;
        //                }
        //            }


        //            tempSB.Append(EmojiCodeToUTF16String(tmps.ToString()));

        //            tmps.Clear();
        //            return i;
        //        }

        //        /// <summary>
        //        /// EmoJi U+字符串对应的 int 值 转换成UTF16字符编码的值
        //        /// </summary>
        //        /// <param name="V">EmojiU+1F604 转成计算机整形以后的值V=0x1F604 </param>
        //        /// <param name="LowHeight">低字节在前的顺序.(默认)</param>
        //        /// <remarks>
        //        ///参考  
        //        ///http://blog.csdn.net/fengsh998/article/details/8668002
        //        ///http://punchdrunker.github.io/iOSEmoji/table_html/index.html
        //        /// V  = 0x64321
        //        /// Vx = V - 0x10000
        //        ///    = 0x54321
        //        ///    = 0101 0100 0011 0010 0001
        //        ///
        //        /// Vh = 01 0101 0000 // Vx 的高位部份的 10 bits
        //        /// Vl = 11 0010 0001 // Vx 的低位部份的 10 bits
        //        /// wh = 0xD800 //結果的前16位元初始值
        //        /// wl = 0xDC00 //結果的後16位元初始值
        //        ///
        //        /// wh = wh | Vh
        //        ///    = 1101 1000 0000 0000
        //        ///    |        01 0101 0000
        //        ///    = 1101 1001 0101 0000
        //        ///    = 0xD950
        //        ///
        //        /// wl = wl | Vl
        //        ///    = 1101 1100 0000 0000
        //        ///    |        11 0010 0001
        //        ///    = 1101 1111 0010 0001
        //        ///    = 0xDF21
        //        /// </remarks>
        //        /// <returns>EMOJI字符对应的UTF16编码16进制整形表示</returns>
        //        public Int32 EmojiToUTF16(Int32 V, bool LowHeight = true)
        //        {

        //            Int32 Vx = V - 0x10000;

        //            Int32 Vh = Vx >> 10;//取高10位部分
        //            Int32 Vl = Vx & 0x3ff; //取低10位部分
        //            //Response.Write("Vh:"); Response.Write(Convert.ToString(Vh, 2)); Response.Write("<br/>"); //2进制显示
        //            //Response.Write("Vl:"); Response.Write(Convert.ToString(Vl, 2)); Response.Write("<br/>"); //2进制显示

        //            Int32 wh = 0xD800; //結果的前16位元初始值,这个地方应该是根据Unicode的编码规则总结出来的数值.
        //            Int32 wl = 0xDC00; //結果的後16位元初始值,这个地方应该是根据Unicode的编码规则总结出来的数值.
        //            wh = wh | Vh;
        //            wl = wl | Vl;
        //            //Response.Write("wh:"); Response.Write(Convert.ToString(wh, 2)); Response.Write("<br/>");//2进制显示
        //            //Response.Write("wl:"); Response.Write(Convert.ToString(wl, 2)); Response.Write("<br/>");//2进制显示
        //            if (LowHeight)
        //            {
        //                return wl << 16 | wh;   //低位左移16位以后再把高位合并起来 得到的结果是UTF16的编码值   //适合低位在前的操作系统 
        //            }
        //            else
        //            {
        //                return wh << 16 | wl; //高位左移16位以后再把低位合并起来 得到的结果是UTF16的编码值   //适合高位在前的操作系统
        //            }


        //        }

        //        /// <summary>
        //        /// 字符串形式的 Emoji 16进制Unicode编码  转换成 UTF16字符串 能够直接输出到客户端
        //        /// </summary>
        //        /// <param name="EmojiCode"></param>
        //        /// <returns></returns>
        //        public string EmojiCodeToUTF16String(string EmojiCode)
        //        {
        //            if (EmojiCode.Length != 4 && EmojiCode.Length != 5)
        //            {
        //                throw new ArgumentException("错误的 EmojiCode 16进制数据长度.一般为4位或5位");
        //            }
        //            //1f604
        //            int EmojiUnicodeHex = int.Parse(EmojiCode, System.Globalization.NumberStyles.HexNumber);

        //            //1f604对应 utf16 编码的int
        //            Int32 EmojiUTF16Hex = EmojiToUTF16(EmojiUnicodeHex, true);             //这里字符的低位在前.高位在后.
        //            //Response.Write(Convert.ToString(lon, 16)); Response.Write("<br/>"); //这里字符的低位在前.高位在后. 
        //            var emojiBytes = BitConverter.GetBytes(EmojiUTF16Hex);                     //把整型值变成Byte[]形式. Int64的话 丢掉高位的空白0000000   

        //            return Encoding.Unicode.GetString(emojiBytes);
        //        }

    }
}


