using OQES.Instructor;
using System.Web.Script.Serialization;
using System.Web.Services;

namespace OQES.Admin.WebServices
{
    /// <summary>
    /// Summary description for SubjectService
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class SubjectService : System.Web.Services.WebService
    {
        JavaScriptSerializer js = new JavaScriptSerializer();

        [WebMethod]
        public void LoadSubject(int categoryID)
        {
            HandledSubject subject = new HandledSubject(categoryID);
            Context.Response.Write(js.Serialize(subject.loadSubject()));
        }

        [WebMethod]
        public void AddSubject(string subject, int categoryID)
        {
            Main.fileManagement("INSERT INTO [subject]([subject_title], [category_id])" +
                                "VALUES('" + subject.Replace("'", "''").Trim() + "', " + categoryID + ")");
        }

        [WebMethod]
        public void Categories(string functionName)
        {
            Category category = new Category();
            Context.Response.Write(category.categories(functionName));
        }

        [WebMethod]
        public void ShowToEditSubject(int subjID)
        {
            Subject subject = new Subject(subjID);
            Context.Response.Write(js.Serialize(subject.getSubject()));
        }

        [WebMethod]
        public void EditSubject(int subjID, string subj, int categoryID)
        {
            Main.fileManagement("UPDATE [subject]" +
                                "SET [subject_title] = '" + subj.Replace("'", "''").Trim() + "', [category_id] = " + categoryID +
                                "WHERE [subj_id] = " + subjID);
        }

        [WebMethod]
        public void DropSubject(int subjID)
        {
            Main.fileManagement("DELETE [subject]" +
                                "WHERE [subj_id] = " + subjID);
        }
    }
}
