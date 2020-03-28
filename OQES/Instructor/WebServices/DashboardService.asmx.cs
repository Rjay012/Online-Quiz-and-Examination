using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Services;

namespace OQES.Instructor.WebServices
{
    /// <summary>
    /// Summary description for DashboardService
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class DashboardService : System.Web.Services.WebService
    {
        JavaScriptSerializer js = new JavaScriptSerializer();

        [WebMethod(EnableSession = true)]
        public void LoadCalendar()
        {
            Dashboard renderDataCalendar = new Dashboard();
            Context.Response.Write(js.Serialize(renderDataCalendar.renderDateCalendar((string)Session["id"])));
        }

        [WebMethod(EnableSession = true)]
        public void LoadDashboardInfoNo()
        {
            Dashboard count = new Dashboard();
            Context.Response.Write(count.panelInfoCount((string)Session["id"]));
        }

        [WebMethod(EnableSession = true)]
        public void LoadFinishedExam()
        {
            Exam exam = new Exam((string)Session["id"]);
            Context.Response.Write(js.Serialize(exam.ShowFinishedExam()));
        }

        [WebMethod(EnableSession = true)]
        public void ViewBannedExaminee()
        {
            Examinee examinee = new Examinee((string)Session["id"]);
            Context.Response.Write(js.Serialize(examinee.BannedExaminee()));
        }
    }
}
