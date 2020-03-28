using System;
using System.Web.Script.Serialization;
using System.Web.Services;

namespace OQES.Student.WebServices
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
        public void LoadSubject()
        {
            EnrolledSubject loadSubj = new EnrolledSubject((string)Session["id"]);
            Context.Response.Write(js.Serialize(loadSubj.loadSubject()));
        }

        [WebMethod(EnableSession = true)]
        public void LoadFilteredSubject(string filter)
        {
            EnrolledSubject filterSubj = new EnrolledSubject((string)Session["id"]);
            Context.Response.Write(js.Serialize(filterSubj.loadFilteredSubject(filter)));
        }

        [WebMethod(EnableSession = true)]
        public void AddSubject(int cId, string iId)
        {
            Main.fileManagement("EXEC [uspSendRequest] @studID = '" + Session["id"] + "', @instrID = '" + iId + "', @subjID = " + cId + ", @requestDate = '" + DateTime.Now.ToString("MM/dd/yyyy") + "'");
        }

        [WebMethod(EnableSession = true)]
        public void ShowBadge()
        {
            int count = Main.dataCounter("SELECT COUNT(*)" + 
                                         "FROM [enrolled_subj] JOIN [student_handle] ON [enrolled_subj].[handle_id] = [student_handle].[handle_id]" +
                                         "WHERE [stud_id] = '" + Session["id"] + "'");

            Context.Response.Write(count);
        }
    }
}
