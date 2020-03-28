using System;

namespace OQES.Instructor
{
    public partial class WebForm6 : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (Session["id"] == null)
            {
                Response.Redirect("../Index.aspx");
            }
            fillExam();
        }

        private void fillExam()
        {
            var ds = Main.dataRetriever("SELECT [exam_id], CONCAT([title], ' ', '--', ' ', [subject_title])" +
                                        "FROM [exam] JOIN [subject] ON [exam].[subj_id] = [subject].[subj_id]" +
                                        "WHERE [status] = 'finished' AND [instr_id] = '" + Session["id"] + "'");

            ddlExam.DataValueField = ds.Tables[0].Columns[0].ToString();
            ddlExam.DataTextField = ds.Tables[0].Columns[1].ToString();

            ddlExam.DataSource = ds.Tables[0];
            ddlExam.DataBind();
        }
    }
}