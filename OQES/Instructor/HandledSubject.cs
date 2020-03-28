using System;
using System.Collections.Generic;
using System.Data.SqlClient;

namespace OQES.Instructor
{
    public class HandledSubject : Subject
    {
        public int subjHandleID { get; set; }
        public Nullable<int> capacity { get; set; }

        public HandledSubject(string _userID, int _categoryID)
        {
            userID = _userID;
            categoryID = _categoryID;
        }

        public HandledSubject(int _categoryID)
        {
            categoryID = _categoryID;
        }

        public HandledSubject()
        {

        }

        #region "(INSTRUCTOR) SUBJECT PAGE"
        public List<HandledSubject> loadHandledSubject()
        {
            string categoryFilter = "";
            if (categoryID != 0)
            {
                categoryFilter = "[category_id] = " + categoryID + " AND";
            }

            List<HandledSubject> handledSubj = new List<HandledSubject>();

            var cmd = new SqlCommand("SELECT [handle_subj_id], [subj_id], [subject_title], [category], [capacity]" +
                                     "FROM [viewSubjectList]" +
                                     "WHERE " + categoryFilter + " [instr_id] = '" + userID + "'", conn);

            conn.Open();
            var read = cmd.ExecuteReader();
            while (read.Read())
            {
                handledSubj.Add(new HandledSubject
                {
                    subjHandleID = Convert.ToInt32(read[0]),
                    subjID = Convert.ToInt32(read[1]),
                    subj = read[2].ToString(),
                    category = read[3].ToString(),
                    capacity = Convert.ToInt32(read[4])
                });
            }
            conn.Close();
            return handledSubj;
        }

        public string getSubjectHandle()
        {
            var cmd = new SqlCommand("SELECT[subj_id], [subject_title]" +
                                     "FROM [viewSubjectList]" +
                                     "WHERE [instr_id] = '" + userID + "'", conn);

            conn.Open();

            var r = cmd.ExecuteReader();
            string dropDownContent = "";
            while (r.Read())
            {
                dropDownContent += "<option value='" + Convert.ToInt32(r[0].ToString()) + "'>" + r[1].ToString() + "</option>";
            }

            conn.Close();

            return dropDownContent;
        }
        #endregion

        #region "(ADMIN) SUBJECT PAGE"
        public override List<Subject> loadSubject()
        {
            List<Subject> subject = new List<Subject>();

            string filter = "";
            if(categoryID != 0)
            {
                filter = " WHERE [category].[category_id] = " + categoryID;
            }

            var cmd = new SqlCommand("SELECT DISTINCT [subject].[subj_id], [subject_title], [category], [capacity]" +
                                     "FROM [subject] LEFT JOIN [subj_handle] ON [subject].[subj_id] = [subj_handle].[subj_id]" +
                                                    "JOIN [category] ON [subject].[category_id] = [category].[category_id]" + filter, conn);
            conn.Open();
            var rd = cmd.ExecuteReader();

            while(rd.Read())
            { 
                subject.Add(new HandledSubject
                {
                    subjID = Convert.ToInt32(rd[0]),
                    subj = rd[1].ToString(),
                    category = rd[2].ToString(),
                    capacity = (rd[3].ToString() == "") ? 0 : Convert.ToInt32(rd[3])
                });
            }
            conn.Close();
            return subject;
        }
        #endregion
    }
}