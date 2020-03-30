using OQES.Instructor;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;

namespace OQES.Student
{
    public class Examination : Exam, IExam
    {
        public string instructor { get; set; }
        public string rating { get; set; }
        public string overScore { get; set; }

        public Examination(string _userID)
        {
            userID = _userID;
        }

        public Examination(string _userID, int _examID)
        {
            userID = _userID;
            examID = _examID;
        }

        public Examination()
        {

        }

        public override List<Exam> loadExam()
        {
            List<Exam> exam = new List<Exam>();
            var cmd = new SqlCommand("SELECT [exam].[exam_id], [title], [subject_title], [exam_date], CONCAT([lname], ' ', [fname], ' ', [mname]) AS [Instructor], [time_limit], (SELECT dbo.calculatePassingScore([exam].[exam_id])), (SELECT dbo.questionRange([exam].[exam_id]))" +
                                     "FROM [exam] JOIN [subject] ON [exam].[subj_id] = [subject].[subj_id]" +
                                                 "JOIN [enrolled_subj] ON [subject].[subj_id] = [enrolled_subj].[subj_id]" +
                                                 "JOIN [student_handle] ON [enrolled_subj].[handle_id] = [student_handle].[handle_id]" +
                                                 "JOIN [instructor] ON [student_handle].[instr_id] = [instructor].[instr_id]" +
                                     "WHERE [exam].[status] = 'open' AND [stud_id] = '" + userID + "' AND EXISTS(SELECT * FROM [examinee] WHERE [examinee].[status] = 'pending' AND [examinee].[stud_id] = '" + userID + "' AND [exam].[exam_id] = [examinee].[exam_id]) ORDER BY [exam_date] DESC", conn);

            conn.Open();
            var r = cmd.ExecuteReader();
            while (r.Read())
            {
                exam.Add(new Examination
                {
                    examID = Convert.ToInt32(r[0].ToString()),
                    title = r[1].ToString(),
                    subj = r[2].ToString(),
                    date = Convert.ToDateTime(r[3].ToString()).ToString("MM/dd/yyyy"),
                    instructor = r[4].ToString(),
                    timeLimit = Convert.ToInt32(r[5].ToString()),
                    passingScore = Convert.ToInt32(r[6].ToString()),
                    qRange = Convert.ToInt32(r[7].ToString())
                });
            }
            conn.Close();

            return exam;
        }

        public void prepareExamineeAnswer(int examId)
        {
            var cmd = new SqlCommand("SELECT [exam_question].[question_id]" +
                                     "FROM [exam_question] JOIN [key] ON [exam_question].[question_id] = [key].[question_id]" +
                                     "WHERE [exam_id] = " + examId, conn);

            conn.Open();
            var read = cmd.ExecuteReader();
            while (read.Read())
            {
                Main.fileManagement("INSERT INTO [answer]([ans], [question_id], [examinee_id])" +
                                    "VALUES('no answer', " + Convert.ToInt32(read[0].ToString()) + ", (SELECT [examinee_id]" +
                                                                                                      "FROM [examinee]" +
                                                                                                      "WHERE [stud_id] = '" + userID + "' AND [exam_id] = " + examId + "))");
            }
            conn.Close();
        }

        public override List<Exam> previousExam()
        {
            List<Exam> examination = new List<Exam>();

            var cmd = new SqlCommand("SELECT [exam].[exam_id], [title], [subject_title], [exam_date], CONCAT([lname], ' ', [fname], ' ', [mname]), (SELECT dbo.[calculatePassingScore]([exam].[exam_id])), [score], (SELECT dbo.[questionRange]([exam].[exam_id])), [rating]" +
                                     "FROM [exam] JOIN [subject] ON [exam].[subj_id] = [subject].[subj_id]" +
                                                 "JOIN [examinee] ON [exam].[exam_id] = [examinee].[exam_id]" +
                                                 "JOIN [instructor] ON [exam].[instr_id] = [instructor].[instr_id]" +
                                     "WHERE [examinee].[status] = 'taken' AND [stud_id] = '" + userID + "'", conn);

            conn.Open();
            var sdr = cmd.ExecuteReader();
            while(sdr.Read())
            {
                examination.Add(new Examination
                {
                    examID = Convert.ToInt32(sdr[0]),
                    title = sdr[1].ToString(),
                    subj = sdr[2].ToString(),
                    date = Convert.ToDateTime(sdr[3].ToString()).ToString("MM/dd/yyyy"),
                    instructor = sdr[4].ToString(),
                    passingScore = Convert.ToInt32(sdr[5]),
                    overScore = Convert.ToInt32(sdr[6]) + "/" + Convert.ToInt32(sdr[7]),
                    rating = sdr[8].ToString()
                }); 
            }
            conn.Close();
            return examination;
        }

        public List<Examination> PrepareExaminationResult()
        {
            List<Examination> examination = new List<Examination>();
            var cmd = new SqlCommand("SELECT MIN([score]), COUNT([question_id] ), MIN([rating])" +
                                     "FROM [exam] JOIN [examinee] ON [exam].[exam_id] = [examinee].[exam_id]" +
                                                 "JOIN [exam_question] ON [exam].[exam_id] = [exam_question].[exam_id]" +
                                     "WHERE [stud_id] = '" + userID + "' AND [exam].[exam_id] = " + examID, conn);

            conn.Open();
            var r = cmd.ExecuteReader();
            while (r.Read())
            {
                examination.Add(new Examination
                {
                    overScore = r[0].ToString() + "/" + Convert.ToInt32(r[1]),
                    rating = r[2].ToString()
                });
            }
            conn.Close();

            return examination;
        }

        public SortedDictionary<string, string> PreparePartitionedExaminationResult(SortedDictionary<string, int> type)
        {
            SortedDictionary<string, string> examination = new SortedDictionary<string, string>();

            foreach (var t in type.Keys)
            {
                int scoreCount = 0;
                var cmd = new SqlCommand("EXEC [calcEachQtypeScore] @examID = " + examID + ", @studID = '" + userID + "', @qType = '" + t + "'", conn);
                conn.Open();
                var rd = cmd.ExecuteReader();

                while(rd.Read())
                {
                    scoreCount += Convert.ToInt32(rd[0]);
                }
                rd.NextResult();  //go to the next result set
                rd.Read();
                examination.Add(rd[0].ToString(), (scoreCount + "/" + Convert.ToInt32(rd[1])));
                conn.Close();
            }
            return examination;
        }
    }
}