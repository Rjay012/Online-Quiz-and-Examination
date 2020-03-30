using System;
using System.Collections.Generic;
using System.Data.SqlClient;

namespace OQES.Instructor
{
    public class Exam : Subject, IExam
    {
        public int examID { get; set; }
        public string title { get; set; }
        public string date { get; set; }
        public int passingMark { get; set; }
        public int timeLimit { get; set; }
        public string status { get; set; }
        public int passingScore { get; set; }
        public int qRange { get; set; }
        public string examType { get; set; }
        public string instruction { get; set; }
        public string description { get; set; }
        public double percentage { get; set; }

        public Exam(string _userID)
        {
            userID = _userID;
        }

        public Exam(string _userID, string _examType, int _subjID)
        {
            userID = _userID;
            examType = _examType;
            subjID = _subjID;
        }

        public Exam(int _examID)
        {
            examID = _examID;
        }

        public Exam()
        {

        }

        #region "(INSTRUCTOR)"
        #region "Manage Exam Page"
        public List<Exam> loadExam(string title, int subjID, string status)
        {
            string filter = "";
            if (title != "All" && subjID > 0)
            {
                filter = "[title] = '" + title + "' AND [exam].[subj_id] = " + subjID + " AND ";  //combined filter
            }
            else if (title != "All" && subjID == 0)
            {
                filter = "[title] = '" + title + "' AND ";
            }
            else if (title == "All" && subjID > 0)
            {
                filter = "[exam].[subj_id] = " + subjID + " AND ";
            }

            if (status != "All")
            {
                status = "[status] = '" + status + "' AND ";
                filter += status;
            }

            var exam = new List<Exam>();
            var cmd = new SqlCommand("SELECT [exam].[exam_id], [title], [subject_title], [exam_date], [status], [time_limit], (SELECT dbo.calculatePassingScore([exam_id])), (SELECT dbo.questionRange([exam_id]))" +
                                     "FROM [exam] JOIN [subject] ON [exam].[subj_id] = [subject].[subj_id]" +
                                     "WHERE " + filter + "[instr_id] = '" + userID + "' ORDER BY [exam_date] DESC", conn);

            conn.Open();
            var r = cmd.ExecuteReader();
            while (r.Read())
            {
                var info = new Exam
                {
                    examID = Convert.ToInt32(r[0].ToString()),
                    title = r[1].ToString(),
                    subj = r[2].ToString(),
                    date = Convert.ToDateTime(r[3].ToString()).ToString("MM/dd/yyyy"),
                    status = r[4].ToString(),
                    timeLimit = Convert.ToInt32(r[5].ToString()),
                    passingScore = Convert.ToInt32(r[6].ToString()),
                    qRange = Convert.ToInt32(r[7].ToString())
                };
                exam.Add(info);
            }
            conn.Close();

            return exam;
        }
        #endregion

        #region "Dashboard Page"
        public List<Exam> ShowFinishedExam()
        {
            List<Exam> exam = new List<Exam>();
            var cmd = new SqlCommand("SELECT [exam_id], [title], [subject_title], SUBSTRING((SELECT dbo.calculateExamineePercentage('passed', [exam_id])), 8, LEN((SELECT dbo.calculateExamineePercentage('passed', [exam_id]))))" +
                                     "FROM [exam] JOIN [subject] ON [exam].[subj_id] = [subject].[subj_id]" +
                                     "WHERE [status] = 'finished' AND [instr_id] = '" + userID + "'", conn);
            conn.Open();
            var rd = cmd.ExecuteReader();
            while(rd.Read())
            {
                exam.Add(new Exam
                {
                    examID = Convert.ToInt32(rd[0]),
                    title = rd[1].ToString(),
                    subj = rd[2].ToString(),
                    percentage = Convert.ToDouble(rd[3])
                });
            }
            conn.Close();
            return exam;
        }
        #endregion
        #endregion

        public string getExamType()
        {
            examType = Main.dataCounter("SELECT [type]" +
                                        "FROM [exam_details]" +
                                        "WHERE [exam_id] = " + examID);
            return examType;
        }

        public void SetFinishedExam()
        {
            var cmd = new SqlCommand("SELECT *" +
                                     "FROM [exam] JOIN [examinee] ON [exam].[exam_id] = [examinee].[exam_id]", conn);
        }

        #region "Create Exam Page"
        public virtual List<Exam> previousExam()
        {
            List<Exam> prevExam = new List<Exam>();

            var cmd = new SqlCommand("SELECT [exam].[exam_id], [title], [subject_title], [exam_date], (SELECT dbo.questionRange([exam].[exam_id]))" +
                                     "FROM [exam] JOIN [subject] ON [exam].[subj_id] = [subject].[subj_id]" +
                                                 "JOIN [exam_details] ON [exam].[exam_id] = [exam_details].[exam_id]" +
                                     "WHERE [status] <> 'finished' AND [type] = '" + examType + "' AND [exam].[subj_id] = " + subjID + " AND [instr_id] = '" + userID + "'", conn);
            conn.Open();
            var rd = cmd.ExecuteReader();

            while (rd.Read())
            {
                var exam = new Exam
                {
                    examID = Convert.ToInt32(rd[0]),
                    title = rd[1].ToString(),
                    subj = rd[2].ToString(),
                    date = Convert.ToDateTime(rd[3].ToString()).ToString("MM/dd/yyyy"),
                    qRange = Convert.ToInt32(rd[4])
                };
                prevExam.Add(exam);
            }
            conn.Close();

            return prevExam;
        }
        #endregion

        #region "Exam Detail Page"
        public virtual List<Exam> loadExam()
        {
            List<Exam> exam = new List<Exam>();

            var cmd = new SqlCommand("SELECT [title], [subject_title], [exam_date], [passing_mark], [time_limit], [status], [instruction], [type], [description], [exam].[subj_id]" +
                                     "FROM [exam] JOIN [exam_details] ON [exam].[exam_id] = [exam_details].[exam_id] " +
                                                 "JOIN [subject] ON [exam].[subj_id] = [subject].[subj_id]" +
                                     "WHERE [exam].[exam_id] = " + examID, conn);

            conn.Open();
            var r = cmd.ExecuteReader();

            while(r.Read())
            {
                exam.Add(new Exam
                {
                    title = r[0].ToString(),
                    subj = r[1].ToString(),
                    date = r[2].ToString(),
                    passingMark = Convert.ToInt32(r[3]),
                    timeLimit = Convert.ToInt32(r[4]),
                    status = r[5].ToString(),
                    instruction = r[6].ToString(),
                    examType = r[7].ToString(),
                    description = r[8].ToString(),
                    subjID = Convert.ToInt32(r[9])
                });
            }
            conn.Close();

            return exam;
        }
        #endregion

        #region "(Student)Take Exam Page"
        public string examInstruction()
        {
            instruction = Main.dataCounter("SELECT [instruction]" +
                                           "FROM [exam_details]" +
                                           "WHERE [exam_id] = " + examID);
            return instruction;
        }
        #endregion
    }
}