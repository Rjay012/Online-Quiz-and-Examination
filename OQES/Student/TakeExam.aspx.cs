using System;

namespace OQES.Student
{
    public partial class TakeExam : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (Session["id"] == null)
            {
                Response.Redirect("../Index.aspx");
            }
        }
    }
}