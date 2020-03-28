using System.Web.Script.Serialization;
using System.Web.Services;

namespace OQES.Instructor
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

        [WebMethod(EnableSession = true)]
        public void LoadSubjects(int categoryID)
        {
            Subject loadSubject = new Subject((string)Session["id"], categoryID);
            Context.Response.Write(js.Serialize(loadSubject.loadSubject()));
        }

        [WebMethod(EnableSession = true)]
        public void LoadHandledSubjects(int categoryID)
        {
            HandledSubject loadHandledSubject = new HandledSubject((string)Session["id"], categoryID);
            Context.Response.Write(js.Serialize(loadHandledSubject.loadHandledSubject()));
        }

        [WebMethod]
        public void Categories(string functionName)
        {
            Subject category = new Subject();
            Context.Response.Write(category.categories(functionName));
        }

        [WebMethod(EnableSession = true)]
        public void AddSubject(int subj_id, int capacity)
        {
            Main.fileManagement("INSERT INTO [subj_handle]([instr_id], [subj_id], [capacity])" +
                                   "VALUES('" + Session["id"] + "', " + subj_id + ", " + capacity + ")");
        }

        [WebMethod]
        public void DropSubject(int subjHandleID)
        {
            Main.fileManagement("DELETE FROM [subj_handle]" +
                                       "WHERE [handle_subj_id] = " + subjHandleID);
        }

        [WebMethod]
        public void GetStudent(int subjID)
        {
            Student student = new Student();
            Context.Response.Write(js.Serialize(student.GetStudent(subjID)));
        }

        [WebMethod(EnableSession = true)]
        public void CheckSubjectCapacity(int subjID)
        {
            Context.Response.Write(Main.dataCounter("SELECT  dbo.checkSubjectCapacity('" + Session["id"] + "', " + subjID + ")"));
        }
    }
}
