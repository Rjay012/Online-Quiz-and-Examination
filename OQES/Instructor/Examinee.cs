using System;
using System.Collections.Generic;
using System.Data.SqlClient;

namespace OQES.Instructor
{
    public class Examinee : Student
    {
        public int examineeID { get; set; }
        public string score { get; set; }
        public string rating { get; set; }
        public string status { get; set; }

        public Examinee(string _userID)
        {
            userID = _userID;
        }

        public Examinee(int _iDisplayLen, int _iDisplayStart, int _iSortCol, string _sSortDir, string _sSearch)
        {
            iDisplayLength = _iDisplayLen;
            iDisplayStart = _iDisplayStart;
            iSortCol_0 = _iSortCol;
            sSortDir_0 = _sSortDir;
            sSearch = _sSearch;
        }

        public Examinee()
        {

        }

        #region (INSTRUCTOR)

        #region "Create Exam Page"
        public void ReadyExaminee(int subjID)
        {
            var cmd = new SqlCommand("SELECT [student_handle].[stud_id]" +
                                     "FROM [enrolled_subj] JOIN [student_handle] ON [enrolled_subj].[handle_id] = [student_handle].[handle_id]" +
                                     "WHERE [subj_id] = " + subjID + " AND [student_handle].[instr_id] = '" + userID + "'", conn);
            conn.Open();
            var r = cmd.ExecuteReader();

            while (r.Read())
            {
                Main.fileManagement("INSERT INTO [examinee]([stud_id], [exam_id], [status])" +
                                    "VALUES('" + r[0].ToString() + "', (SELECT MAX(exam_id) FROM [exam]), 'pending')");
            }
            conn.Close();
        }
        #endregion

        #region "Manage Exam Page"
        public List<Examinee> ViewExaminee(int examID)
        {
            List<Examinee> examinee = new List<Examinee>();
            var cmd = new SqlCommand("EXEC [spGetExamineeSSP] @len = " + iDisplayLength + ", @start = " + iDisplayStart + ", @sortCol = " + iSortCol_0 + ", @sortDir = '" + sSortDir_0 + "', @search = '" + (string.IsNullOrEmpty(sSearch) ? null : sSearch) + "', @examID = " + examID, conn);

            conn.Open();
            var r = cmd.ExecuteReader();
            while (r.Read())
            {
                var examineeData = new Examinee
                {
                    TotalCount = Convert.ToInt32(r[1]),
                    examineeID = Convert.ToInt32(r[2]),
                    studID = r[3].ToString(),
                    fullname = r[4].ToString(),
                    score = r[5].ToString(),
                    rating = r[6].ToString(),
                    status = r[7].ToString()
                };
                examinee.Add(examineeData);
            }
            conn.Close();

            return examinee;
        }
        #endregion

        #region "Dashboard Page"
        public List<Examinee> BannedExaminee()
        {
            List<Examinee> examinee = new List<Examinee>();

            var cmd = new SqlCommand("SELECT [examinee_id], [student].[stud_id], CONCAT([lname], ', ', [fname], ' ', [mname]) AS [fullname]" +
                                     "FROM [examinee] JOIN [student] ON [examinee].[stud_id] = [student].[stud_id]" +
                                                     "JOIN [exam] ON [examinee].[exam_id] = [exam].[exam_id]" +
                                     "WHERE [examinee].[status] = 'blocked' AND [instr_id] = '" + userID + "'", conn);
            conn.Open();
            var rd = cmd.ExecuteReader();
            while(rd.Read())
            {
                examinee.Add(new Examinee
                {
                    examineeID = Convert.ToInt32(rd[0]),
                    studID = rd[1].ToString(),
                    fullname = rd[2].ToString()
                });
            }
            conn.Close();
            return examinee;
        }
        #endregion
        #endregion
    }
}