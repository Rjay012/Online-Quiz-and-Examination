using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace OQES.Instructor
{
    public class Student : Subject
    {
        public string studID { get; set; }
        public string firstName { get; set; }
        public string middleName { get; set; }
        public string lastName { get; set; }
        public string fullname { get; set; }

        public Student()
        {

        }
        public Student(string _userID)  //constructor overloading
        {
            userID = _userID;
        }

        #region "(INSTRUCTOR)"
        public List<Student> GetStudent()
        {
            var cmd = new SqlCommand("EXEC [uspSelectAllStudents] @instrID = '" + userID + "'", conn);

            return AddToList(cmd);
        }

        public List<Student> GetStudent(string stud_id)
        {
            var cmd = new SqlCommand("[uspGetStudentInfo]", conn);
            cmd.CommandType = CommandType.StoredProcedure;

            addParam(cmd, stud_id);  //add SPs parameter

            return AddToList(cmd);
        }

        public List<Student> GetStudent(int subjID)
        {
            var cmd = new SqlCommand("SELECT [student].[stud_id], [fname], [mname], [lname]" +
                                     "FROM [student] JOIN [student_handle] ON [student].[stud_id] = [student_handle].[stud_id]" +
                                                    "JOIN [enrolled_subj] ON [student_handle].[handle_id] = [enrolled_subj].[handle_id]" +
                                     "WHERE [subj_id] = " + subjID, conn);

            return AddToList(cmd);
        }

        private void addParam(SqlCommand cmd, string stud_id)
        {
            SqlParameter param;
            param = cmd.Parameters.Add("@studID", SqlDbType.VarChar);
            param.Value = stud_id;
        }

        public bool checkStudentIfExist(string stud_id)
        {
            int total = Main.dataCounter("SELECT COUNT([stud_id])" +
                                         "FROM [student]" +
                                         "WHERE [stud_id] = '" + stud_id + "'");
            if (total > 0)
            {
                return true;
            }
            return false;
        }
        #endregion

        private List<Student> AddToList(SqlCommand cmd)
        {
            List<Student> student = new List<Student>();

            conn.Open();
            var dr = cmd.ExecuteReader();
            while (dr.Read())
            {
                student.Add(new Student
                {
                    studID = dr[0].ToString(),
                    firstName = dr[1].ToString(),
                    middleName = dr[2].ToString(),
                    lastName = dr[3].ToString()
                });
            }
            conn.Close();

            return student;
        }

        #region "(ADMIN) Student Page"
        public IEnumerable<Student> student(string instrID)
        {
            var cmd = new SqlCommand("SELECT [student].[stud_id], [fname], [mname], [lname]" +
                                     "FROM [student] JOIN [student_handle] ON [student].[stud_id] = [student_handle].[stud_id]" +
                                     "WHERE [instr_id] = '" + instrID + "'", conn);

            return AddToList(cmd);
        }
        #endregion
    }
}