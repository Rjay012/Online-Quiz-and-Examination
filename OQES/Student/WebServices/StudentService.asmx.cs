using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Web.Services;

namespace OQES.Student.WebServices
{
    /// <summary>
    /// Summary description for StudentService
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class StudentService : System.Web.Services.WebService
    {
        SqlConnection conn = new SqlConnection("Data Source=.\\SQLEXPRESS;Initial Catalog=oqes;Integrated Security=True");

        [WebMethod(EnableSession = true)]
        public void GetIdentity()
        {
            if(Session["id"] != null)
            {
                var cmd = new SqlCommand("SELECT CONCAT([lname], ', ', [fname], ' ', SUBSTRING([mname], 1, 1), '.')" +
                                         "FROM [student]" +
                                         "WHERE [stud_id] = '" + Session["id"] + "'", conn);

                conn.Open();
                string studentName = (string)cmd.ExecuteScalar();
                conn.Close();

                Context.Response.Write(studentName);
            }
        }
    }
}
