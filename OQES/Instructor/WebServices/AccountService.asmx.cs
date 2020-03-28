using System.Web.Services;

namespace OQES.Instructor.WebServices
{
    /// <summary>
    /// Summary description for AccountService
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class AccountService : System.Web.Services.WebService
    {
        [WebMethod(EnableSession = true)]
        public void ChangeAccountSetting(string instructor)
        {
            Account change = new Account((string)Session["id"]);
            change.ChangeAccountSetting(instructor);
        }

        [WebMethod(EnableSession = true)]
        //[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public bool CheckOldPassword()
        {
            int count = Main.dataCounter("SELECT COUNT([password])" +
                                         "FROM [instructor]" +
                                         "WHERE [instr_id] = '" + Session["id"] + "'");
            if (count > 0) return false;

            return true;
        }

        [WebMethod(EnableSession = true)]
        public void CheckOldPasswordIfCorrect(string password)
        {
            bool isCorrect = false;
            int c = Main.dataCounter("SELECT COUNT([password])" +
                                     "FROM [instructor]" +
                                     "WHERE [password] = '" + password.Replace("'", "''").Trim() + "' AND [instr_id] = '" + Session["id"] + "'");
            if (c > 0) isCorrect = true;

            Context.Response.Write(isCorrect);
        }
    }
}
