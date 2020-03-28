using System;
using System.Data.SqlClient;

namespace OQES.Instructor
{
    public partial class WebForm9 : System.Web.UI.Page
    {
        private static readonly SqlConnection conn = Main.GetDBConnection();
        protected void Page_Load(object sender, EventArgs e)
        {
            if(Session["id"] == null)
            {
                Response.Redirect("../Index.aspx");
            }
            LoadAccountInformation();
        }

        protected void LoadAccountInformation()
        {
            var cmd = new SqlCommand("SELECT [instr_id], [fname], [mname], [lname], [password]" +
                                     "FROM [instructor]" +
                                     "WHERE [instr_id] = '" + Session["id"] + "'", conn);

            conn.Open();
            var rd = cmd.ExecuteReader();
            rd.Read();
            this.txtFacID.Text = rd[0].ToString();
            this.txtFacFname.Text = rd[1].ToString();
            this.txtFacMname.Text = rd[2].ToString();
            this.txtFacLname.Text = rd[3].ToString();
            conn.Close();
        }
    }
}