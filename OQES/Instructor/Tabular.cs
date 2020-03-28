using System;
using System.Collections.Generic;
using System.Data.SqlClient;

namespace OQES.Instructor
{
    public class Tabular : Report
    {
        public int noOfStudent { get; set; }
        public int totalPasser { get; set; }
        public int totalfailure { get; set; }

        private DateTime dateFrom { get; set; }
        private DateTime dateTo { get; set; }

        public Tabular(string _userID, DateTime _dateFrom, DateTime _dateTo)
        {
            userID = _userID;
            dateFrom = _dateFrom;
            dateTo = _dateTo;
        }

        public Tabular()
        {
             
        }

        public override List<Report> RenderReport()
        {
            List<Report> data = new List<Report>();
            var cmd = new SqlCommand("SELECT DISTINCT [exam].[exam_id], [title], [subject_title], [exam_date], (SELECT dbo.[examineeNo]([exam].[exam_id])), [passing_mark], (SELECT dbo.[calculatePassingScore]([exam].[exam_id])), (SELECT dbo.[totalPassedFailed]([exam].[exam_id], 'passed')), (SELECT dbo.[totalPassedFailed]([exam].[exam_id], 'failed'))" +
                                     "FROM [exam] JOIN [subject] ON [exam].[subj_id] = [subject].[subj_id]" +
                                                 "JOIN [examinee] ON [exam].[exam_id] = [examinee].[exam_id]" +
                                     "WHERE ([exam_date] >= '" + dateFrom + "' AND [exam_date] <= '" + dateTo + "') AND [examinee].[status] = 'taken' AND [instr_id] = '" + userID + "'", conn);

            conn.Open();
            var read = cmd.ExecuteReader();
            while (read.Read())
            {
                data.Add(new Tabular
                {
                    examID = Convert.ToInt32(read[0]),
                    title = read[1].ToString(),
                    subj = read[2].ToString(),
                    date = Convert.ToDateTime(read[3].ToString()).ToString("MM/dd/yyyy"),
                    noOfStudent = Convert.ToInt32(read[4]),
                    passingMark = Convert.ToInt32(read[5]),
                    passingScore = Convert.ToInt32(read[6]),
                    totalPasser = Convert.ToInt32(read[7]),
                    totalfailure = Convert.ToInt32(read[8])
                });
            }
            conn.Close();
            return data;
        }
    }
}