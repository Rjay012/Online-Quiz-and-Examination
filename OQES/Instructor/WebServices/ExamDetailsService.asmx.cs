using Newtonsoft.Json;
using System;
using System.Text.RegularExpressions;
using System.Web.Script.Serialization;
using System.Web.Services;

namespace OQES.Instructor.WebServices
{
    /// <summary>
    /// Summary description for ExamDetailsService
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class ExamDetailsService : System.Web.Services.WebService
    {
        JavaScriptSerializer js = new JavaScriptSerializer();
        [WebMethod]
        public void LoadDetail(int examId)
        {
            Exam loadDetails = new Exam(examId);
            Context.Response.Write(js.Serialize(loadDetails.loadExam()));
        }

        [WebMethod(EnableSession = true)]
        public void subj()
        {
            HandledSubject getSubjHandle = new HandledSubject((string)Session["id"], 0);
            Context.Response.Write(getSubjHandle.getSubjectHandle());
        }

        [WebMethod]
        public void editExamDetails(int eId, int sId, string date, int pMark, int tLimit, string status, string instruction, string type, string description)
        {
            Main.fileManagement("UPDATE [exam]" +
                                      "SET [subj_id] = " + sId + ", [exam_date] = '" + date + "', [passing_mark] = " + pMark + ", [time_limit] = " + tLimit + ", [status] = '" + status + "'" +
                                      "WHERE [exam_id] = " + eId);

            Main.fileManagement("UPDATE [exam_details]" +
                                      "SET [instruction] = '" + instruction + "', [type] = '" + type + "', [description] = '" + description + "'" +
                                      "WHERE [exam_id] = " + eId);
        }

        [WebMethod]
        public void ViewQuestionaire(int examID)
        {
            Context.Response.Write(Main.dataCounter("SELECT COUNT(*)" +
                                                                "FROM [exam_question]" +
                                                                "WHERE [exam_id] = " + examID));
        }

        [WebMethod]
        public void EditQuestionaire(int qId, string question, string ansKey)
        {
            Main.fileManagement("UPDATE [exam_question]" +
                                   "SET [question] = '" + question.Replace("'", "''").Trim() + "', [ans_key] = '" + ansKey + "'" +
                                   "WHERE [question_id] = " + qId);
        }

        [WebMethod]
        public void EditChoice(int cId, string choice)
        {
            Main.fileManagement("UPDATE [choices]" +
                                   "SET [choice] = '" + choice.Replace("'", "''").Trim() + "'" +
                                   "WHERE [choice_id] = " + cId);
        }

        [WebMethod]
        public void GetQuestionaire(int examID)
        {
            Questionaire createBadge = new Questionaire();
            string query = "SELECT [question_id], [question]" +
                           "FROM [exam_question]" +
                           "WHERE [exam_id] = " + examID;
            Context.Response.Write(JsonConvert.SerializeObject(createBadge.GetQuestion(query)));
        }

        [WebMethod]
        public void GetOffsetQuestionaire(int examID, int row)
        {
            Questionaire createBadge = new Questionaire();
            string query = "SELECT [question_id], [question]" +
                           "FROM [exam_question]" +
                           "WHERE [exam_id] = " + examID + " ORDER BY [question_id] OFFSET " + row + " ROWS FETCH NEXT 10 ROWS ONLY";
            Context.Response.Write(JsonConvert.SerializeObject(createBadge.GetQuestion(query)));
        }

        [WebMethod]
        public void GetPartitionedQuestionaire(int examID, string type)
        {
            Questionaire createBadge = new Questionaire();
            string query = "SELECT [question_id], [question]" +
                           "FROM [exam_question]" +
                           "WHERE [exam_id] = " + examID + " AND [type] = '" + type + "'";
            Context.Response.Write(JsonConvert.SerializeObject(createBadge.GetQuestion(query)));
        }

        [WebMethod]
        public void GetChoice(int qID)
        {
            Questionaire getChoice = new Questionaire();
            Context.Response.Write(JsonConvert.SerializeObject(getChoice.GetChoice(qID)));
        }

        [WebMethod]
        public void ExamType(int examID)
        {
            Exam getType = new Exam(examID);
            Context.Response.Write(getType.getExamType());
        }

        [WebMethod]
        public void QuestionType(int qID)
        {
            Questionaire getQtype = new Questionaire();
            Context.Response.Write(getQtype.QuestionType(qID));
        }

        [WebMethod]
        public void SaveUpdatedQuestionaire(string qType, string myData, string myDataKey)
        {
            Questionaire uQ = new Questionaire();
            uQ.UpdateQuestionaire(qType, myData, myDataKey);
        }

        [WebMethod]
        public void AddQuestion(int examID, string questionaire)
        {
            Questionaire addQ = new Questionaire(examID);
            addQ.addQuestion(questionaire);
        }

        [WebMethod]
        public void RemoveQuestion(string qID)
        {
            int newID = Regex.IsMatch(qID, @"[\[]") ? Convert.ToInt32(qID.Substring(2, (qID.Length - 4))) : Convert.ToInt32(qID);
            Main.fileManagement("DELETE [exam_question]" +
                                "WHERE [question_id] = " + newID);
        }

        [WebMethod]
        public void RemoveEnumAns(int keyID)
        {
            Main.fileManagement("DELETE FROM [key]" +
                                "WHERE [key_id] = " + keyID);
        }

        [WebMethod]
        public void AddNewEnumAns(int qID, string ans)
        {
            Main.fileManagement("INSERT INTO [key]([ans_key], [question_id])" +
                                "VALUES('" + ans.Replace("'", "''").Trim() + "', " + qID + ")");
        }

        [WebMethod]
        public void GetAnswerKey(int qID)
        {
            Questionaire getAnsKeys = new Questionaire();
            Context.Response.Write(JsonConvert.SerializeObject(getAnsKeys.Key(qID)));
        }

        [WebMethod]
        public void PartitionedQuestionType(int examID)
        {
            Questionaire partition = new Questionaire(examID);
            Context.Response.Write(js.Serialize(partition.QuestionTypePartitioning()));
        }

        [WebMethod]
        public void PrintExam()
        {
            
        }
    }
}
