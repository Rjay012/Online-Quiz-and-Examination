using System.Web.Script.Serialization;
using System.Web.Services;

namespace OQES.Admin.WebServices
{
    /// <summary>
    /// Summary description for Register
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class Register : System.Web.Services.WebService
    {
        JavaScriptSerializer js = new JavaScriptSerializer();

        [WebMethod]
        public void Reg(string id, int privId, string fname, string mname, string lname)
        {
            string privilege = "student", colId = "stud_id";  //default student

            if (privId == 2) //instructor
            {
                privilege = "instructor";
                colId = "instr_id";
            }
            Main.fileManagement("INSERT INTO [" + privilege + "]([" + colId + "], [fname], [mname], [lname], [priv_id])" +
                                "VALUES('" + id.Replace("'", "''").Trim() + "', '" + fname.Replace("'", "''").Trim() + "', '" + mname.Replace("'", "''").Trim() + "', '" + lname.Replace("'", "''").Trim() + "', " + privId + ")");
        }

        [WebMethod]
        public void DashboardCount()
        {
            string scalar = Main.dataCounter("SELECT [dbo].adminDashboardCount()");
            Context.Response.Write(scalar);
        }

        [WebMethod]
        public void RenderChart()
        {
            Bar bar = new Bar();
            Context.Response.Write(js.Serialize(bar.RenderReport()));
        }
    }
}
