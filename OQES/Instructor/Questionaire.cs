using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;

namespace OQES.Instructor
{
    public class Questionaire : Exam
    {
        public string question { get; set; }
        public int qID { get; set; }
        public string choiceA { get; set; }
        public int cID1 { get; set; }
        public string choiceB { get; set; }
        public int cID2 { get; set; }
        public string choiceC { get; set; }
        public int cID3 { get; set; }
        public string choiceD { get; set; }
        public int cID4 { get; set; }
        public string ansKey { get; set; }
        public string ansKeyID { get; set; }
        public string type { get; set; }

        public Questionaire(int _examID)
        {
            examID = _examID;
        }

        public Questionaire(string _userID, int _examID)
        {
            userID = _userID;
            examID = _examID;
        }

        public Questionaire()
        {

        }

        #region "Create Exam Page and Exam Details Page"
        public void addQuestion(string questionaire)
        {
            Questionaire cq = JsonConvert.DeserializeObject<Questionaire>(questionaire);
            if (cq.type == "multiple choice")
            {
                Main.fileManagement("EXEC [uspCreateQuestion] @examID = " + examID + ", @qType = '" + cq.type + "', @question = '" + cq.question + "', @c1 = '" + cq.choiceA + "', @c2 = '" + cq.choiceB + "', @c3 = '" + cq.choiceC + "', @c4 = '" + cq.choiceD + "', @ansKey = '" + cq.ansKey + "'");
            }
            else if (cq.type == "true or false")
            {
                Main.fileManagement("EXEC [uspCreateQuestion] @examID = " + examID + ", @qType = '" + cq.type + "', @question = '" + cq.question + "', @c1 = '" + cq.choiceA + "', @c2 = '" + cq.choiceB + "', @ansKey = '" + cq.ansKey + "'");
            }
            else if (cq.type == "enumeration")
            {
                if (examID == 0) { examID = Main.dataCounter("SELECT MAX([exam_id]) FROM [exam]"); }

                Main.fileManagement("INSERT INTO [exam_question]([question], [exam_id], [type])" +
                                    "VALUES('" + cq.question.Replace("'", "''").Trim() + "', " + examID + ", '" + cq.type + "')");

                qID = Main.dataCounter("SELECT MAX([question_id])" +
                                       "FROM [exam_question]" +
                                       "WHERE [exam_id] = " + examID);
                string[] ans = cq.ansKey.Split('|');
                for (short i = 0; i < (ans.Length - 1); i++)
                {
                    Main.fileManagement("INSERT INTO [key]([ans_key], [question_id])" +
                                        "VALUES('" + ans[i].Replace("'", "''").Trim() + "', " + qID + ")");
                }
            }
            else
            {
                Main.fileManagement("EXEC [uspCreateQuestion] @examID = " + examID + ", @qType = '" + cq.type + "', @question = '" + cq.question + "', @ansKey = '" + cq.ansKey + "'");
            }
        }
        #endregion

        #region "Exam Detail Page"

        #region "Update & Remove Multiview and Single View Questionaire"
        public void UpdateQuestionaire(string qType, string myData, string myDataKey)  //single view update
        {
            Questionaire uQ = JsonConvert.DeserializeObject<Questionaire>(myData);
            Questionaire dataKey = JsonConvert.DeserializeObject<Questionaire>(myDataKey);

            if (qType == "enumeration")
            {
                string[] keyID = dataKey.ansKeyID.Split('|');
                string[] key = uQ.ansKey.Split('|');
                for (short c = 0; c < (key.Length - 1); c++)
                {
                    Main.fileManagement("UPDATE [key]" +
                                        "SET [ans_key] = '" + key[c].Replace("'", "''").Trim() + "'" +
                                        "WHERE [key_id] = " + Convert.ToInt32(keyID[c]));
                }
            }
            else
            {
                Main.fileManagement("EXEC [uspUpdateQuestionaire] @qID = " + dataKey.qID + ", @cID1 = " + dataKey.cID1 + ", @cID2 = " + dataKey.cID2 + ", @cID3 = " + dataKey.cID3 + ", @cID4 = " + dataKey.cID4 + ", @ansKeyID = " + dataKey.ansKeyID + ", " +
                                    "@qType = '" + qType + "', @question = '" + uQ.question + "', @c1 = '" + uQ.choiceA + "', @c2 = '" + uQ.choiceB + "', @c3 = '" + uQ.choiceC + "', @c4 = '" + uQ.choiceD + "', @ansKey = '" + uQ.ansKey + "'");
            }
        }
        #endregion

        #region "Other Details"
        public SortedDictionary<string, int> QuestionTypePartitioning()   //question typed partitioning will be used only for mixed type of questions
        {
            SortedDictionary<string, int> type = new SortedDictionary<string, int>();

            var cmd = new SqlCommand("SELECT MIN([type]), COUNT(*)" +
                                     "FROM [exam_question]" +
                                     "WHERE [exam_id] = " + examID + " GROUP BY [type]", conn);
            conn.Open();
            var rd = cmd.ExecuteReader();

            while (rd.Read())
            {
                type.Add(rd[0].ToString(), Convert.ToInt32(rd[1]));
            }
            conn.Close();

            return type;
        }

        public string QuestionType(int qID)
        {
            return Main.dataCounter("SELECT [type]" +
                                    "FROM [exam_question]" +
                                    "WHERE [question_id] = " + qID);
        }

        private Dictionary<int, string> AddQuestionaireProperty(string query)
        {
            Dictionary<int, string> questionaireProp = new Dictionary<int, string>();

            var cmd = new SqlCommand(query, conn);
            conn.Open();
            var rd = cmd.ExecuteReader();
            while (rd.Read())
            {
                questionaireProp.Add(Convert.ToInt32(rd[0]), rd[1].ToString());
            }
            conn.Close();
            return questionaireProp;
        }

        public Dictionary<int, string> GetChoice(int qID)
        {
            return AddQuestionaireProperty("SELECT [choice_id], [choice]" +
                                           "FROM [choices]" +
                                           "WHERE [question_id] = " + qID);
        }

        public Dictionary<int, string> GetQuestion(string query)
        {
            return AddQuestionaireProperty(query);
        }

        public Dictionary<int, string> Answer(int qID, string hasAdditionalQuery)  //you change the list to dictionary
        {
            if (hasAdditionalQuery == "yes")
            {
                hasAdditionalQuery = "[ans] NOT IN (SELECT [ans_key] FROM [key] WHERE [question_id] = " + qID + ") AND";
            }
            /**OLD SUBQUERY, INCASE OF LOGICAL ERROR (03/26/2020 ***CHANGED DATE***)**/
            //SELECT DISTINCT[answer].[examinee_id]
            //FROM [answer] JOIN [examinee] ON [answer].[examinee_id] = [examinee].[examinee_id]
            //WHERE [stud_id] = '" + userID + "' AND [exam_id] = " + examID + "
            return AddQuestionaireProperty("SELECT [ans_id], [ans]" +
                                           "FROM [answer]" +
                                           "WHERE " + hasAdditionalQuery + " [examinee_id] = (SELECT [examinee_id]" +
                                                                                             "FROM [examinee]" +
                                                                                             "WHERE [stud_id] = '" + userID + "' AND [exam_id] = " + examID + ") AND [question_id] = " + qID);
        }

        public Dictionary<int, string> Key(int qID)
        {
            return AddQuestionaireProperty("SELECT [key_id], [ans_key]" +
                                           "FROM [key]" +
                                           "WHERE [question_id] = " + qID);
        }

        public int GetEnumerationScore()
        {
            int scoreCount = 0;
            var cmd = new SqlCommand("EXEC [GetEnumerationScore] @studID = '" + userID + "', @examID = " + examID, conn);
            conn.Open();
            var rd = cmd.ExecuteReader();
            while (rd.Read())
            {
                scoreCount += Convert.ToInt32(rd[0]);  //count the number of correct answers in enumeration type question
            }
            conn.Close();

            return scoreCount;
        }
        #endregion

        #endregion
    }
}