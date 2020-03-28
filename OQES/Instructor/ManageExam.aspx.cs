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
            getTitle();
            getSubject();
        }

        private void getTitle()
        {
            DataSet ds = Main.dataRetriever("SELECT DISTINCT [title]" +
                                            "FROM [exam]" +
                                            "WHERE [instr_id] = '" + Session["id"] + "'");

            ddlFilterTitle.DataValueField = ds.Tables[0].Columns[0].ToString();
            ddlFilterTitle.DataTextField = ds.Tables[0].Columns[0].ToString();

            ddlFilterTitle.DataSource = ds.Tables[0];
            ddlFilterTitle.DataBind();
        }

        private void getSubject()
        {
            DataSet ds = Main.dataRetriever("SELECT DISTINCT [exam].[subj_id], [subject_title]" +
                                            "FROM [exam] JOIN [subject] ON [exam].[subj_id] = [subject].[subj_id]" +
                                            "WHERE [instr_id] = '" + Session["id"] + "'");

            ddlFilterSubject.DataValueField = ds.Tables[0].Columns[0].ToString();
            ddlFilterSubject.DataTextField = ds.Tables[0].Columns[1].ToString();

            ddlFilterSubject.DataSource = ds.Tables[0];
            ddlFilterSubject.DataBind();
        }
    }
}