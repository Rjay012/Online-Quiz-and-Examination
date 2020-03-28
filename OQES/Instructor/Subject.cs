using System;
using System.Collections.Generic;
using System.Data.SqlClient;

namespace OQES.Instructor
{
    public class Subject : Category
    {
        protected string userID { get; set; }
        public int subjID { get; set; }
        public string subj { get; set; }
        public string enrolledDate { get; set; }
        
        public Subject(string _userID, int _categoryID)
        {
            userID = _userID;
            categoryID = _categoryID;  //default 0
        }

        public Subject(int _subjID)
        {
            subjID = _subjID;
        }

        public Subject()
        {
            //default constructor
        }

        #region "(Instructor) Subject Page"
        public List<Subject> getSubject(string stud_id)
        {
            List<Subject> subject = new List<Subject>();
            var cmd = new SqlCommand("SELECT [subj_id], [subject_title], [date_enrolled]" +
                                     "FROM [viewStudentSubject]" +
                                     "WHERE [stud_id] = '" + stud_id + "'", conn);
            conn.Open();
            var dr = cmd.ExecuteReader();

            while (dr.Read())
            {
                subject.Add(new Subject
                {
                    subjID = Convert.ToInt32(dr[0]),
                    subj = dr[1].ToString(),
                    enrolledDate = Convert.ToDateTime(dr[2].ToString()).ToString("MM/dd/yyyy")
                });
            }
            conn.Close();

            return subject;
        }

        public List<Subject> showInstructorSubject(string instrID)
        {
            var subj = new List<Subject>();

            var cmd = new SqlCommand("SELECT [subject].[subj_id], [subject_title]" +
                                     "FROM [subject] JOIN [subj_handle] ON [subject].[subj_id] = [subj_handle].[subj_id]" +
                                     "WHERE [instr_id] = '" + instrID + "'", conn);

            conn.Open();

            var r = cmd.ExecuteReader();
            while (r.Read())
            {
                subj.Add(new Subject
                {
                    subjID = Convert.ToInt32(r[0]),
                    subj = r[1].ToString()
                });
            }

            conn.Close();
            return subj;
        }
        #endregion

        #region "Subject page"
        public virtual List<Subject> loadSubject()   //load the subjects that is not yet handled by instructor according to each of them
        {
            string categoryFilter = "";
            if (categoryID != 0)
            {
                categoryFilter = "AND [category].[category_id] = " + categoryID;
            }

            List<Subject> subj = new List<Subject>();

            var cmd = new SqlCommand("SELECT DISTINCT [subject].[subj_id], [subject_title], [category]" +
                                     "FROM [subj_handle] RIGHT JOIN [subject] ON [subj_handle].[subj_id] = [subject].[subj_id]" +
                                                              "JOIN [category] ON [subject].[category_id] = [category].[category_id]" +
                                     "WHERE ([subj_handle].[subj_id] IS NULL OR [instr_id] <> '" + userID + "') " + categoryFilter + " AND NOT EXISTS(SELECT[subj_id]" +
                                                                                                                                                     "FROM [subj_handle]" +
                                                                                                                                                     "WHERE [subj_handle].[subj_id] = [subject].[subj_id] AND [instr_id] = '" + userID + "')", conn);
            conn.Open();
            var read = cmd.ExecuteReader();

            while(read.Read())
            {
                subj.Add(new Subject {
                    subjID = Convert.ToInt32(read[0].ToString()),
                    subj = read[1].ToString(),
                    category = read[2].ToString()
                });
            }
            conn.Close();

            return subj;
        }
        #endregion

        #region "(ADMIN) SUBJECT PAGE"
        public List<Subject> getSubject()
        {
            List<Subject> subject = new List<Subject>();

            var cmd = new SqlCommand("SELECT [subj_id], [subject_title], [category].[category_id]" +
                                     "FROM [subject] JOIN [category] ON [subject].[category_id] = [category].[category_id]" +
                                     "WHERE [subj_id] = " + subjID, conn);
            conn.Open();
            var rd = cmd.ExecuteReader();
            while(rd.Read())
            {
                subject.Add(new Subject
                {
                    subjID = Convert.ToInt32(rd[0]),
                    subj = rd[1].ToString(),
                    categoryID = Convert.ToInt32(rd[2])
                });
            }
            conn.Close();
            return subject;
        }
        #endregion 
    }
}