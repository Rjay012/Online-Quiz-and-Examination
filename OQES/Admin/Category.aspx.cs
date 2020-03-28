using System;

namespace OQES.Admin
{
    public partial class WebForm4 : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if(Session["id"] == null)
            {
                Response.Redirect("../Index.aspx");
            }
        }
    }
}