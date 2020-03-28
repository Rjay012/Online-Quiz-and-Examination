using System.Web.Script.Serialization;
using System.Web.Services;

namespace OQES.Instructor.WebServices
{
    /// <summary>
    /// Summary description for CreateExamService
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class CreateExamService : System.Web.Services.WebService
    {
        JavaScriptSerializer js = new JavaScriptSerializer();
        [WebMethod(EnableSession = true)]
        public void CreateExam(string title, int subjId, string instruction, string descr, string examDate, string examType, int pMark, int timeLimit)
        {
            Main.fileManagement("EXEC [uspCreateExam] @instrID = '" + Session["id"] + "', @title = '" + title.Replace("'", "''").Trim() + "', @subjID = " + subjId + ", @instruction = '" + instruction.Replace("'", "''").Trim() + "', @description = '" + descr.Replace("'", "''").Trim() + "', @examDate = '" + examDate + "', @examType = '" + examType + "', @pMark = " + pMark + ", @timeLimit = " + timeLimit);

            Examinee readExaminee = new Examinee((string)Session["id"]);
            readExaminee.ReadyExaminee(subjId);
        }

        [WebMethod]
        public void AddQuestion(string questionaire)
        {
            Questionaire addQ = new Questionaire();
            addQ.addQuestion(questionaire);
        }

        [WebMethod(EnableSession = true)]
        public void PreviousExamination(int subjID, string examType)
        {
            Exam embedQuestion = new Exam((string)Session["id"], examType, subjID);
            Context.Response.Write(js.Serialize(embedQuestion.previousExam()));
        }
    }
}
