using OQES.Instructor;
using System.Web.Script.Serialization;
using System.Web.Services;

namespace OQES.Admin.WebServices
{
    /// <summary>
    /// Summary description for CategoryService
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class CategoryService : System.Web.Services.WebService
    {
        JavaScriptSerializer js = new JavaScriptSerializer();
        Category category = new Category();

        [WebMethod]
        public void LoadCategory()
        {
            Context.Response.Write(js.Serialize(category.LoadCategory()));
        }

        [WebMethod]
        public void AddCategory(string category)
        {
            Main.fileManagement("INSERT INTO [category]([category])" +
                                "VALUES('" + category.Replace("'", "''").Trim() + "')");
        }

        [WebMethod]
        public void ShowToEditCategory(int categoryID)
        {
            Context.Response.Write(js.Serialize(category.LoadCategory(categoryID)));
        }
    }
}
