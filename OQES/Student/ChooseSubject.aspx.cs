using System;
using System.Data.SqlClient;
using System.Web.Services;

namespace OQES.Student
{
    public partial class ChooseSubject : System.Web.UI.Page
    {
        SqlConnection conn = new SqlConnection("Data Source=.\\SQLEXPRESS;Initial Catalog=oqes;Integrated Security=True");

        protected void Page_Load(object sender, EventArgs e)
        {
            if(Session["id"] == null)
            {
                Response.Redirect("../Index.aspx");
            }
        }
    }
}