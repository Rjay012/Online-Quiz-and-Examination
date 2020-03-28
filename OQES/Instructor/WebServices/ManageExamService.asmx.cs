using System.Web.Script.Serialization;
using System.Web.Services;

namespace OQES.Instructor.WebServices
{
    /// <summary>
    /// Summary description for ManageExamService
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class ManageExamService : System.Web.Services.WebService
    {
        JavaScriptSerializer js = new JavaScriptSerializer();

        [WebMethod(EnableSession = true)]
        public void LoadExam(string title, int subjID, string status)
        {
            Exam le = new Exam((string)Session["id"]);
            Context.Response.Write(js.Serialize(le.loadExam(title, subjID, status)));
        }

        [WebMethod]
        public void SetStatus(int id, string status)  //set exam status
        {
            Main.fileManagement("UPDATE [exam]" +
                                     "SET [status] = '" + status + "'" +
                                     "WHERE [exam_id] = " + id);
        }

        [WebMethod]
        public void DeleteExam(int examID)
        {
            Main.fileManagement("DELETE FROM [exam]" +
                                      "WHERE [exam_id] = " + examID);
        }

        [WebMethod]
        public void ViewExaminee(int examID)
        {
            Examinee examinee = new Examinee();
            Context.Response.Write(js.Serialize(examinee.viewExaminee(examID)));
        }

        [WebMethod]
        public void Action(int examineeID, string action)
        {
            //action = (action == "UNBLOCK") ? action = "pending" : action = (action.ToLower() + "ed");
            action = (action.ToLower() + "ed");

            if(action == "unblocked")
            {
                action = "pending";
            }

            Main.fileManagement("UPDATE [examinee]" +
                                        "SET [status] = '" + action + "'" +
                                        "WHERE [examinee_id] = " + examineeID);
        }
    }
}
