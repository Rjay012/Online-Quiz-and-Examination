using OQES.Instructor;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;

namespace OQES.Student
{
    public class EnrolledSubject : Subject
    {
        public string instructor { get; set; }
        public string status { get; set; }
        public string instrID { get; set; }
        public string overCapacity { get; set; }

        public EnrolledSubject(string _userID)
        {
            userID = _userID;
        }

        public EnrolledSubject()
        {

        }

        public override List<Subject> loadSubject()
        {
            List<Subject> subject = new List<Subject>();

            var cmd = new SqlCommand("SELECT [enrolled_subj].[subj_id], [subject_title], CONCAT([lname], ', ', [fname], ' ', mname) AS [instructor], [date_enrolled], [status]" +
                                     "FROM [enrolled_subj] JOIN [student_handle] ON [enrolled_subj].[handle_id] = [student_handle].[handle_id]" +
                                                          "JOIN [subject] ON [enrolled_subj].[subj_id] = [subject].[subj_id]" +
                                                          "JOIN [instructor] ON [student_handle].[instr_id] = [instructor].[instr_id]" +
                                     "WHERE [stud_id] = '" + userID + "'", conn);
            conn.Open();
            var dr = cmd.ExecuteReader();

            while (dr.Read())
            {
                var subj = new EnrolledSubject()
                {
                    subjID = Convert.ToInt32(dr[0].ToString()),
                    subj = dr[1].ToString(),
                    instructor = dr[2].ToString(),
                    enrolledDate = Convert.ToDateTime(dr[3].ToString()).ToString("MM/dd/yyyy"),
                    status = dr[4].ToString()
                };
                subject.Add(subj);
            }
            conn.Close();

            return subject;
        }

        public List<EnrolledSubject> loadFilteredSubject(string filter)   //filter the subjects that is not already taken by the student who use the system
        {
            var filterSubj = new List<EnrolledSubject>();
            var cmd = new SqlCommand("SELECT [subj_handle].[subj_id], [subject].[subject_title], [subj_handle].[instr_id], CONCAT([instructor].[lname], ', ', [instructor].[fname], ' ', SUBSTRING([instructor].[mname], 1, 1), '.')," +
                                                                                                                          "CONCAT((SELECT COUNT([enrolled_subj].[subj_id])" +
                                                                                                                                  "FROM [enrolled_subj] JOIN [student_handle] ON [enrolled_subj].[handle_id] = [student_handle].[handle_id]" +
                                                                                                                                  "WHERE ([enrolled_subj].subj_id = [subj_handle].[subj_id]) AND ([student_handle].[instr_id] = [subj_handle].[instr_id])), '/', [subj_handle].[capacity])" +
                                     "FROM [subj_handle] JOIN [subject] ON [subj_handle].[subj_id] = [subject].[subj_id]" +
                                                        "JOIN [instructor] ON [subj_handle].[instr_id] = [instructor].[instr_id]" +
                                     "WHERE NOT EXISTS (SELECT [enrolled_subj].[subj_id], [student_handle].[instr_id]" +
                                                       "FROM [enrolled_subj] JOIN [student_handle] ON [enrolled_subj].[handle_id] = [student_handle].[handle_id]" +
                                                       "WHERE [enrolled_subj].[subj_id] = [subj_handle].[subj_id] AND [student_handle].[stud_id] = '" + userID + "') AND ([subj_handle].[subj_id] LIKE '%" + filter.Replace("'", "''").Trim() + "%' OR [subject_title] LIKE '%" + filter.Replace("'", "''").Trim() + "%')", conn);

            conn.Open();
            var dr = cmd.ExecuteReader();

            while (dr.Read())
            {
                var subj = new EnrolledSubject()
                {
                    subjID = Convert.ToInt32(dr[0].ToString()),
                    subj = dr[1].ToString(),
                    instrID = dr[2].ToString(),
                    instructor = dr[3].ToString(),
                    overCapacity = dr[4].ToString()
                };
                filterSubj.Add(subj);
            }
            conn.Close();

            return filterSubj;
        }
    }
}