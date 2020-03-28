using System.Web.Services;

namespace OQES
{
    /// <summary>
    /// Summary description for UserService
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class UserService : System.Web.Services.WebService
    {

        [WebMethod(EnableSession = true)]
        public void SetSessionID()
        {
            if (Session["id"] != null)
            {
                Context.Response.Write(Session["id"]);
            }
        }
    }
}
