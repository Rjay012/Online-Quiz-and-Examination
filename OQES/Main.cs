using System.Data.SqlClient;
using System.Data;

namespace OQES
{
    public static class Main
    {
        private static readonly SqlConnection conn = GetDBConnection();
        private static dynamic ScalarData;

        public static SqlConnection GetDBConnection()
        {
            SqlConnection con = new SqlConnection("Data Source=.\\SQLEXPRESS;Initial Catalog=oqes;Integrated Security=True");

            return con;
        }

        public static dynamic dataCounter(string query)
        {
            var cmd = new SqlCommand(query, conn);
            
            try
            {
                conn.Open();
                ScalarData = (dynamic)cmd.ExecuteScalar();
                conn.Close();
            }
            catch
            {
                conn.Close();
            }

            return ScalarData;
        }

        public static void fileManagement(string query)
        {
            var cmd = new SqlCommand(query, conn);

            try
            {
                conn.Open();
                cmd.ExecuteNonQuery();
                conn.Close();
            }
            catch
            {
                conn.Close();
            }
        }

        public static DataSet dataRetriever(string query)
        {
            var da = new SqlDataAdapter(query, conn);
            var ds = new DataSet();

            da.Fill(ds);

            return ds;
        }
    }
}