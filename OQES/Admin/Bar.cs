using System;
using System.Collections.Generic;
using System.Data.SqlClient;

namespace OQES.Admin
{
    public class Bar : Report
    {
        public Bar(string _label, double _y)
        {
            label = _label;
            y = _y;
        }

        public Bar()
        {

        }

        public override List<Report> RenderReport()
        {
            List<Report> bar = new List<Report>();

            var cmd = new SqlCommand("SELECT [category], COUNT([subj_id])" +
                                     "FROM [category] LEFT JOIN [subject] ON [category].[category_id] = [subject].[category_id] GROUP BY [category] ORDER BY [category] ASC", conn);
            conn.Open();
            var rd = cmd.ExecuteReader();
            while(rd.Read())
            {
                bar.Add(new Bar(rd[0].ToString(), Convert.ToInt32(rd[1])));
            }

            conn.Close();
            return bar;
        }
    }
}