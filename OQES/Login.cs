using System;
using System.Data.SqlClient;

namespace OQES
{
    public sealed class Login
    {
        private static string id;
        private static string password;

        private readonly SqlConnection conn = Main.GetDBConnection();
        public Login(string _id, string _password)
        {
            id = _id;
            password = _password;
        }

        public string validation()
        {
            string[] user = { "student", "instructor", "admin" };
            string[] arrId = { "stud_id", "instr_id", "admin_id" };
            string initUser = "";
            bool isFound = false;

            string str = "";
            for (int c = 0; c < arrId.Length; c++)
            {
                string q = "SELECT COUNT([" + arrId[c] + "])" +
                           "FROM [" + user[c] + "]" +
                           "WHERE [" + arrId[c] + "] = '" + id.Replace("'", "''").Trim() + "' AND ";

                isFound = checkAccount(q + " [password] IS NULL");  //check user account if password doesn't exist yet
                str = q + " [password] IS NULL";
                if (isFound == true)
                {
                    initUser = user[c];
                    break;
                }
                else
                {
                    isFound = checkAccount(q + "[password] = '" + password.Replace("'", "''").Trim() + "'");
                    str = q + "[password] = '" + password.Replace("'", "''").Trim() + "'";
                    if (isFound == true)
                    {
                        initUser = user[c];
                        break;
                    }
                }
            }

            return initUser;
        }

        private bool checkAccount(string query)
        {
            var cmd = new SqlCommand(query, conn);

            try
            {
                conn.Open();

                if (Convert.ToInt32(cmd.ExecuteScalar()) == 1)
                {
                    return true;
                }
                conn.Close();
            }
            catch
            {
                conn.Close();
            }

            return false;
        }
    }
}