using System.Collections.Generic;
using System.Data.SqlClient;

namespace OQES.Instructor
{
    public class Instructor
    {
        public string instrID { get; set; }
        public string fname { get; set; }
        public string mname { get; set; }
        public string lname { get; set; }

        protected readonly SqlConnection conn = Main.GetDBConnection();

        #region "(ADMIN) Instructor Page"
        public List<Instructor> showInstructor()
        {
            var cmd = new SqlCommand("SELECT [instr_id], [fname], [mname], [lname]" +
                                     "FROM [instructor]", conn);
            return BindInstructor(cmd);
        }

        private List<Instructor> BindInstructor(SqlCommand cmd)
        {
            List<Instructor> instr = new List<Instructor>();

            conn.Open();
            var rd = cmd.ExecuteReader();
            while(rd.Read())
            {
                instr.Add(new Instructor
                {
                    instrID = rd[0].ToString(),
                    fname = rd[1].ToString(),
                    mname = rd[2].ToString(),
                    lname = rd[3].ToString()
                });
            }
            conn.Close();
            return instr;
        }

        public List<Instructor> showInstructor(int subjID)
        {
            var cmd = new SqlCommand("SELECT [instructor].[instr_id], [fname], [mname], [lname]" +
                                     "FROM [instructor] JOIN [subj_handle] ON [instructor].[instr_id] = [subj_handle].[instr_id]" +
                                     "WHERE [subj_id] = " + subjID, conn);
            return BindInstructor(cmd);
        }
        #endregion
    }
}