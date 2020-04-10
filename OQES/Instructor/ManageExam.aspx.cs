using System;
using System.Data;

namespace OQES.Instructor
{
    public partial class WebForm5 : System.Web.UI.Page
    {
        public void Page_Load(object sender, EventArgs e)
        {
            if (Session["id"] == null)
            {
                Response.Redirect("../Index.aspx");
            }
        }
    }
}