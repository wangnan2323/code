using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using qcloudsms_csharp;
using qcloudsms_csharp.json;
using qcloudsms_csharp.httpclient;


namespace sara.dd.ldsw.commonclass
{
    public class duanxinclass
    {
        public duanxinclass()
        {

        }
        //带模板发送短信
        public static string sendDuanxin(string phoneNumber,string khbh,string dz,string ljqf)
        {

            string result = "";
            // 短信应用SDK AppID
            int appid = 1400232730;

            // 短信应用SDK AppKey
            string appkey = "09af7694ed505887440135f01f01d558";

            // 需要发送短信的手机号码
            string[] phoneNumbers = { phoneNumber };

            // 短信模板ID，需要在短信应用中申请
            int templateId = 416231; // NOTE: 这里的模板ID`7839`只是一个示例，真实的模板ID需要在短信控制台中申请
                                     //templateId 7839 对应的内容是"您的验证码是: {1}"
                                     // 签名
            string smsSign = ""; // NOTE: 这里的签名只是示例，请使用真实的已申请的签名, 签名参数使用的是`签名内容`，而不是`签名ID`

            try
            {
                SmsMultiSender msender = new SmsMultiSender(appid, appkey);
                //var sresult = msender.send(0, "86", phoneNumbers, "尊敬的用户" + yhm + "您好，龙达水务提示您，您目前欠费" + ljqf + "元，请及时到营业厅缴纳欠款，以免影响正常用水。", "", "");
                var sresult = msender.sendWithParam("86", phoneNumbers, templateId,
                new[] { khbh,dz, ljqf }, smsSign, "", "");  // 签名参数未提供或者为空时，会使用默认签名发送短信

            }
            catch (JSONException e)
            {
                result = e.Message + e.StackTrace;
            }
            catch (HTTPException e)
            {
                result = e.Message + e.StackTrace;
            }
            catch (Exception e)
            {
                result = e.Message + e.StackTrace;
            }

            return result;
        }

        //通知群发
        public static string sendMessage(List<string> phoneNumber)
        {

            string result = "";
            // 短信应用SDK AppID
            int appid = 1400177690;

            // 短信应用SDK AppKey
            string appkey = "e405582480aaab326f79a99cb87b2442";



            // 短信模板ID，需要在短信应用中申请
            int templateId = 424714; // NOTE: 这里的模板ID`7839`只是一个示例，真实的模板ID需要在短信控制台中申请
                                     //templateId 7839 对应的内容是"您的验证码是: {1}"
                                     // 签名
            string smsSign = ""; // NOTE: 这里的签名只是示例，请使用真实的已申请的签名, 签名参数使用的是`签名内容`，而不是`签名ID`
            List<string> para = new List<string>();
            try
            {
                SmsMultiSender msender = new SmsMultiSender(appid, appkey);
                var sresult = msender.sendWithParam("86", phoneNumber, templateId,
                para, smsSign, "", "");  // 签名参数未提供或者为空时，会使用默认签名发送短信

            }
            catch (JSONException e)
            {
                result = e.Message + e.StackTrace;
            }
            catch (HTTPException e)
            {
                result = e.Message + e.StackTrace;
            }
            catch (Exception e)
            {
                result = e.Message + e.StackTrace;
            }

            return result;
        }

    }
}