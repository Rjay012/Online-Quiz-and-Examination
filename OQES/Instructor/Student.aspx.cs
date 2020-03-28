using System;

namespace OQES.Instructor
{
    public partial class WebForm3 : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (Session["id"] == null)
            {
                Response.Redirect("../Index.aspx");
            }

            if (!this.IsPostBack)
            {
                fillSubjectList();
            }
        }

        protected void gvStudent_SelectedIndexChanged(object sender, EventArgs e)
        {
            
        }

        protected void btnSaveNewStud_Click(object sender, EventArgs e)
        {
            
        }

        private void fillSubjectList()
        {
            var ds = Main.dataRetriever("SELECT [subj_id], [subject_title]" +
                                        "FROM [viewSubjectList]" +
                                        "WHERE [instr_id] = '" + Session["id"] + "'");

            ddlSubject.DataValueField = ds.Tables[0].Columns["subj_id"].ToString();
            ddlSubject.DataTextField = ds.Tables[0].Columns["subject_title"].ToString();
             
            ddlSubject.DataSource = ds.Tables[0];
            ddlSubject.DataBind();
        }

        protected void btnSaveUpdate_Click(object sender, EventArgs e)
        {
            
        }
    }
}