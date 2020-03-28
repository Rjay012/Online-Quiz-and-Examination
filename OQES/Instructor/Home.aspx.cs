using System;

namespace OQES.Instructor
{
    public partial class WebForm1 : System.Web.UI.Page
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