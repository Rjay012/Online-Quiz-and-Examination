using System.Web.Script.Serialization;
using System.Web.Services;

namespace OQES.Student.WebServices
{
    /// <summary>
    /// Summary description for ExaminationService
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class ExaminationService : System.Web.Services.WebService
    {
        JavaScriptSerializer js = new JavaScriptSerializer();

        [WebMethod(EnableSession = true)]
        public void ReadyExam()
        {
            Examination examination = new Examination((string)Session["id"]);
            Context.Response.Write(js.Serialize(examination.loadExam()));
        }

        [WebMethod(EnableSession = true)]
        public void PrepareExamination(int examId)
        {
            Main.fileManagement("UPDATE [examinee]" +
                                "SET [status] = 'taking'" +
                                "WHERE [stud_id] = '" + Session["id"] + "' AND [exam_id] = " + examId);

            Examination examination = new Examination((string)Session["id"]);
            examination.prepareExamineeAnswer(examId);
        }

        [WebMethod(EnableSession = true)]
        public void ShowPrevExam()
        {
            Examination prevExam = new Examination((string)Session["id"]);
            Context.Response.Write(js.Serialize(prevExam.previousExam()));
        }

        [WebMethod(EnableSession = true)]
        public void ShowBadge()
        {
            int count = Main.dataCounter("SELECT COUNT(*)" +
                                         "FROM [examinee] JOIN [exam] ON [examinee].[exam_id] = [exam].[exam_id]" +
                                         "WHERE [exam].[status] = 'open' AND [examinee].[status] = 'pending' AND [stud_id] = '" + Session["id"] + "'");
            Context.Response.Write(count);
        }
    }
}
