using System;
using System.Collections.Generic;
using System.Data.SqlClient;

namespace OQES.Instructor
{
    public sealed class Dashboard
    {
        public string title { get; set; }
        public string start { get; set; }

        private static readonly SqlConnection conn = Main.GetDBConnection();

        public Dashboard()
        {

        }

        public List<Dashboard> renderDateCalendar(string userID)
        {
            List<Dashboard> render = new List<Dashboard>();

            var cmd = new SqlCommand("SELECT [title], [exam_date]" +
                                     "FROM [exam]" +
                                     "WHERE [status] = 'ready' AND [instr_id] = '" + userID + "'", conn);

            conn.Open();
            var read = cmd.ExecuteReader();

            while(read.Read())
            {
                var data = new Dashboard
                {
                    title = read[0].ToString(),
                    start = Convert.ToDateTime(read[1].ToString()).ToString("yyyy-MM-dd")
                };

                render.Add(data);
            }

            conn.Close();

            return render;
        }

        public string panelInfoCount(string userID)
        {
            return Main.dataCounter("SELECT dbo.dashboardInfoNo('" + userID + "')");
        }
    }
}