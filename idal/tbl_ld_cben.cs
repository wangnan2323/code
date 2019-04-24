//------------------------------------------------------------------------------
//     此代码由代码生成器EasyQuickDevelopToolV3.CodeFactory生成。
//     代码生成器版本：V3.1
//     代码模板版本：V1.20140523
//     
//     再编辑此代码以完成业务功能。
//     再编辑过程中须遵循现有编码规范和程序逻辑。     
//     异常的编码可能会导致不正确的行为。
//     重新生成代码，这些更改将会丢失。
//------------------------------------------------------------------------------
using System;
using System.Data;
using sara.dd.ldsw.model;
using System.Collections.Generic;
namespace sara.dd.ldsw.idal
{
    /// <summary>
    /// 接口层Itbl_ld_cben 的摘要说明。
    /// </summary>
    public interface Itbl_ld_cben
    {
        #region  成员方法
        /// <summary>
        /// 重写添加shape
        /// </summary>
        /// <param name="json"></param>
        /// <param name="clientInf"></param>
        /// <returns></returns>
        string Add(sara.dd.ldsw.model.tbl_ld_cben model, Eva.Library.Data.AccessDataTrans.IAccessDataTrans t);

        /// <summary>
        /// 重写添加addlist
        /// </summary>
        /// <param name="json"></param>
        /// <param name="clientInf"></param>
        /// <returns></returns>
        string AddList(List<sara.dd.ldsw.model.tbl_ld_cben> modelList, Eva.Library.Data.AccessDataTrans.IAccessDataTrans t);

        /// <summary>
        /// 重写更新updateshp
        /// </summary>
        /// <param name="json"></param>
        /// <param name="columns"></param>
        /// <param name="clientInf"></param>
        /// <returns></returns>
        string Update(sara.dd.ldsw.model.tbl_ld_cben model, string columns, Eva.Library.Data.AccessDataTrans.IAccessDataTrans t);

        /// <summary>
        /// 重写updatelist
        /// </summary>
        /// <param name="json"></param>
        /// <param name="columns"></param>
        /// <param name="clientInf"></param>
        /// <returns></returns>
        string UpdateList(List<sara.dd.ldsw.model.tbl_ld_cben> modelList, string columns, Eva.Library.Data.AccessDataTrans.IAccessDataTrans t);

        /// <summary>
        /// 重写deleteshape
        /// </summary>
        /// <param name="whereString"></param>
        /// <param name="clientInf"></param>
        /// <returns></returns>
        string Delete(string whereString, Eva.Library.Data.AccessDataTrans.IAccessDataTrans t);

        /// <summary>
        /// 重写logicdelete
        /// </summary>
        /// <param name="delUserid"></param>
        /// <param name="delUserName"></param>
        /// <param name="delDate"></param>
        /// <param name="whereString"></param>
        /// <param name="clientInf"></param>
        /// <returns></returns>
        string LogicDelete(string delUserid, string delUserName, string delDate, string whereString, Eva.Library.Data.AccessDataTrans.IAccessDataTrans t);

        /// <summary>
        /// 获取count
        /// </summary>
        /// <param name="whereString"></param>
        /// <param name="clientInf"></param>
        /// <returns></returns>
        string GetCount(string whereString, Eva.Library.Data.AccessDataTrans.IAccessDataTrans t);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="whereString"></param>      
        /// <param name="orderByString">sys_creatdate desc,sys_id desc</param>
        /// <param name="columnsString">where、orderby条件可以在columns之外</param>
        /// <param name="pageSizeString">如果为null则获取全部数据</param>
        /// <param name="pageIndexString">如果为null则获取全部数据</param>
        /// <returns></returns>
        List<sara.dd.ldsw.model.tbl_ld_cben> GetList(string whereString, string orderByString, string columnsString, string pageSizeString, string pageIndexString, Eva.Library.Data.AccessDataTrans.IAccessDataTrans t);


        DataTable GetDataTableForApp(string whereString, string orderByString, string columnsString, string countString, string stepString, Eva.Library.Data.AccessDataTrans.IAccessDataTrans t);

        DataTable GetDataTableForPC(string whereString, string orderByString, string columnsString, string pageSizeString, string pageIndexString, Eva.Library.Data.AccessDataTrans.IAccessDataTrans t);


        #endregion 成员方法
}
}



