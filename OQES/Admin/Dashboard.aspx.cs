using System;

namespace OQES.Admin
{
    public partial class WebForm1 : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if(Session["id"] == null)
            {
                Response.Redirect("../Index.aspx");
            }

            if (!this.IsPostBack)
            {
                fillPrivilege();
            }
        }

        private void fillPrivilege()
        {
            var ds = Main.dataRetriever("SELECT [priv_id], [privilege]" +
                                        "FROM [privileges]" +
                                        "WHERE [priv_id] <> 1");

            ddlPrivilege.DataValueField = ds.Tables[0].Columns["priv_id"].ToString();
            ddlPrivilege.DataTextField = ds.Tables[0].Columns["privilege"].ToString();

            ddlPrivilege.DataSource = ds.Tables[0];
            ddlPrivilege.DataBind();
        }
    }
}