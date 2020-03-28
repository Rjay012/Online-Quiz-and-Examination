using System;
using System.Data;

namespace OQES.Admin
{
    public partial class WebForm3 : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if(Session["id"] == null)
            {
                Response.Redirect("../Index.aspx");
            }

            if (!this.IsPostBack)
            {
                fillCategoryList();
            }
        }

        private void fillCategoryList()
        {
            var ds = Main.dataRetriever("SELECT [category_id], [category]" +
                                        "FROM [category] ORDER BY [category] ASC");
            fillList1(ds);
            fillList2(ds);
        }

        private void fillList1(DataSet ds)
        {
            ddlAddCategory.DataValueField = ds.Tables[0].Columns["category_id"].ToString();
            ddlAddCategory.DataTextField = ds.Tables[0].Columns["category"].ToString();

            ddlAddCategory.DataSource = ds.Tables[0];
            ddlAddCategory.DataBind();
        }

        private void fillList2(DataSet ds)
        {
            ddlEditCategory.DataValueField = ds.Tables[0].Columns["category_id"].ToString();
            ddlEditCategory.DataTextField = ds.Tables[0].Columns["category"].ToString();

            ddlEditCategory.DataSource = ds.Tables[0];
            ddlEditCategory.DataBind();
        }
    }
}