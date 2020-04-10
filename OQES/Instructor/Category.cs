using System;
using System.Collections.Generic;
using System.Data.SqlClient;

namespace OQES.Instructor
{
    public class Category : DataTableParam
    {
        public int categoryID { get; set; }
        public string category { get; set; }

        protected readonly SqlConnection conn = Main.GetDBConnection();

        public Category()
        {

        }

        #region "(INSTRUCTOR & ADMIN) Subject Page"
        public string categories(string functionName)
        {
            var cmd = new SqlCommand("SELECT * FROM [category]", conn);
            string category = "";

            conn.Open();
            var read = cmd.ExecuteReader();
            while (read.Read())
            {
                category += "<li>" +
                                "<a class='dropdown-item' onclick='" + functionName + "(" + Convert.ToInt32(read[0].ToString()) + ")' href='#'>" + read[1].ToString() + "</a>" +
                            "</li>";
            }
            conn.Close();

            return category;
        }
        #endregion

        #region "(ADMIN) CATEGORY PAGE"
        public List<Category> LoadCategory()
        {
            var cmd = new SqlCommand("SELECT *" +
                                     "FROM [category]", conn);
            return BindCategory(cmd);
        }

        private List<Category> BindCategory(SqlCommand cmd)
        {
            List<Category> category = new List<Category>();

            conn.Open();
            var rd = cmd.ExecuteReader();
            while (rd.Read())
            {
                category.Add(new Category
                {
                    categoryID = Convert.ToInt32(rd[0]),
                    category = rd[1].ToString()
                });
            }
            conn.Close();

            return category;
        }

        public List<Category> LoadCategory(int categoryID)  
        {
            var cmd = new SqlCommand("SELECT *" +
                                     "FROM [category]" +
                                     "WHERE [category_id] = " + categoryID, conn);
            return BindCategory(cmd);
        }
        #endregion
    }
}