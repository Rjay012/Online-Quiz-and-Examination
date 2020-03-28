using Newtonsoft.Json;
using OQES.Instructor;
using System.Collections.Generic;
using System.Web.Script.Serialization;
using System.Web.Services;

namespace OQES.Student.WebServices
{
    /// <summary>
    /// Summary description for TakeExamService
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class TakeExamService : System.Web.Services.WebService
    {
        JavaScriptSerializer js = new JavaScriptSerializer();

        [WebMethod]
        public void ReadyQuestion(int examID)
        {
            Exam examType = new Exam(examID);
            Questionaire questionaire = new Questionaire(examID);
            if(examType.getExamType() == "all type")
            {
                Context.Response.Write(js.Serialize(questionaire.QuestionTypePartitioning()));
            }
            else
            {
                Context.Response.Write(JsonConvert.SerializeObject(questionaire.GetQuestion("SELECT [question_id], [question]" +
                                                                             "FROM [exam_question]" +
                                                                             "WHERE [exam_id] = " + examID)));
            }
        }

        [WebMethod]
        public void GetExamType(int examID)
        {
            Exam examType = new Exam(examID);
            Context.Response.Write(js.Serialize(examType.getExamType()));
        }

        [WebMethod] 
        public void GetChoice(int qID)
        {
            Questionaire getchoice = new Questionaire();
            Context.Response.Write(JsonConvert.SerializeObject(getchoice.GetChoice(qID)));
        }

        [WebMethod(EnableSession = true)]
        public void GetAnswer(int qID, int examID, string hasAdditionalQuery)
        {
            Questionaire getAns = new Questionaire((string)Session["id"], examID);
            Context.Response.Write(JsonConvert.SerializeObject(getAns.Answer(qID, hasAdditionalQuery)));
        }

        [WebMethod]
        public void GetKey(int qID)
        {
            Questionaire getKey = new Questionaire();
            Context.Response.Write(JsonConvert.SerializeObject(getKey.Key(qID)));
        }

        [WebMethod]
        public void QuestionType(int qID)
        {
            Questionaire getQtype = new Questionaire();
            Context.Response.Write(js.Serialize(getQtype.QuestionType(qID)));
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

        [WebMethod(EnableSession = true)]
        public void SaveAnswer(int qId, int examID, string ans, string qType)
        {
            string query = "[question_id] = " + qId + " AND [examinee_id] = (SELECT [examinee_id]" +
                                                                            "FROM [examinee]" +
                                                                            "WHERE [stud_id] = '" + Session["id"] + "' AND [exam_id] = " + examID + ")";
            if (qType == "enumeration" || qType == "fill in the blank")
            {
                query = "[ans_id] = " + qId;
            }
            Main.fileManagement("UPDATE [answer]" +
                                "SET [ans] = '" + ans.Replace("'", "''").Trim() + "'" +
                                "WHERE " + query);
        }

        [WebMethod]
        public void GetDetail(int examID)
        {
            Exam instruction = new Exam(examID);  //INSTRUCTOR CLASS
            Context.Response.Write(instruction.examInstruction());
        }

        [WebMethod(EnableSession = true)]
        public void FinishExam(int examID)
        {
            Questionaire GetEnumScore = new Questionaire((string)Session["id"], examID);
            Main.fileManagement("EXEC [calculateExamineeScore] @studID = '" + Session["id"] + "', @examID = " + examID + ", @enumerationTypeScore = " + GetEnumScore.GetEnumerationScore());
        }

        [WebMethod(EnableSession = true)]
        public void Result(int examID, string examType)
        {
            Examination prepareExamResult = new Examination((string)Session["id"], examID);
            if (examType == "all type")
            {
                Questionaire getPartitionedType = new Questionaire(examID);
                SortedDictionary<string, int> partitionedType = getPartitionedType.QuestionTypePartitioning();
                Context.Response.Write(js.Serialize(prepareExamResult.PreparePartitionedExaminationResult(partitionedType)));
            }
            else
            {
                Context.Response.Write(js.Serialize(prepareExamResult.PrepareExaminationResult()));
            }
            
        }

        [WebMethod(EnableSession = true)]
        public void CheckExaminee(int examID)
        {
            int examinee = Main.dataCounter("SELECT COUNT([stud_id])" +
                                            "FROM [examinee]" +
                                            "WHERE ([stud_id] = '" + Session["id"] + "' AND [exam_id] = " + examID + ") AND [rating] <> 'none'");
            Context.Response.Write(examinee);
        }

        [WebMethod]
        public void TimeLimit(int examID)
        {
            Context.Response.Write(Main.dataCounter("SELECT [time_limit]" +
                                                    "FROM [exam]" +
                                                    "WHERE [exam_id] = " + examID));
        }
    }
}
