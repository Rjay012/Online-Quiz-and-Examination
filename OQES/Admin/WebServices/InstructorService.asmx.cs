using OQES.Instructor;
using System.Web.Script.Serialization;
using System.Web.Services;

namespace OQES.Admin.WebServices
{
    /// <summary>
    /// Summary description for InstructorService
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class InstructorService : System.Web.Services.WebService
    {
        JavaScriptSerializer js = new JavaScriptSerializer();

        [WebMethod]
        public void Load()
        {
            Instructor.Instructor instructor = new Instructor.Instructor();
            Context.Response.Write(js.Serialize(instructor.showInstructor()));
        }

        [WebMethod]
        public void LoadInstructor(int subjID)
        {
            Instructor.Instructor instructor = new Instructor.Instructor();
            Context.Response.Write(js.Serialize(instructor.showInstructor(subjID)));
        }

        [WebMethod]
        public void LoadSubject(string instrID)
        {
            Subject loadSubj = new Subject();
            Context.Response.Write(js.Serialize(loadSubj.showInstructorSubject(instrID)));
        }

        [WebMethod]
        public void LoadStudent(string instrID)
        {
            Instructor.Student student = new Instructor.Student();
            Context.Response.Write(js.Serialize(student.student(instrID)));
        }
    }
}
