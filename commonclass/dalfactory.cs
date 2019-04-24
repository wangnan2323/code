using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace sara.dd.ldsw.commonclass
{
    public class dalfactory
    {

        private static string thisguid = typeof(dalfactory).GUID.ToString();
        public static T Create<T>()
        {
            object instanceDal = null;

            Type interfacetype = typeof(T);
            Type daltype = null;
            string idalnamespace = interfacetype.Namespace;

            daltype = Type.GetType(idalnamespace.Replace(".idal", ".dal") +"."+ interfacetype.Name.Substring(1));

            if (daltype == null)
            {
                throw new TypeLoadException("未查询到对应类!");
            }
            if (daltype.GetInterface(interfacetype.FullName) == null)
            {
                throw new TypeLoadException("类未实现接口!");
            }
            instanceDal = Eva.Library.Web.CacheTool.GetCache(thisguid + daltype.FullName);

            if (instanceDal == null)
            {
                instanceDal = (T)Activator.CreateInstance(daltype);
                Eva.Library.Web.CacheTool.SetCache(thisguid + daltype.FullName, instanceDal);
            }
            return (T)instanceDal;
        }

    }
}