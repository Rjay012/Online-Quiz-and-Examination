using System.Web.Services;

namespace OQES
{
    /// <summary>
    /// Summary description for IndexService
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class IndexService : System.Web.Services.WebService
    {
        [WebMethod(EnableSession = true)]
        public void Login(string id, string pass)
        {
            Login login = new Login(id, pass);

            string user = login.validation();
            if (user != "")
            {
                Session["id"] = id.Replace("'", "''").Trim();  //activate user session
            }

            Context.Response.Write(user);
        }
    }
}
