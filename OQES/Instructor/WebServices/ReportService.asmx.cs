using CrystalDecisions.CrystalReports.Engine;
using System;
using System.Web.Script.Serialization;
using System.Web.Services;

namespace OQES.Instructor.WebServices
{
    /// <summary>
    /// Summary description for ReportService
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class ReportService : System.Web.Services.WebService
    {
        JavaScriptSerializer js = new JavaScriptSerializer();
        ReportDocument rd = new ReportDocument();

        [WebMethod(EnableSession = true)]
        public void RenderChart(int examID)
        {
            Pie chart = new Pie((string)Session["id"], examID);
            Context.Response.Write(js.Serialize(chart.RenderReport()));
        }

        [WebMethod(EnableSession = true)]
        public void RenderTitle(int examID)
        {
            Pie title = new Pie(examID);
            Context.Response.Write(title.RenderTitle());
        }

        [WebMethod(EnableSession = true)]
        public void RenderTabularReport(string dateFrom, string dateTo)
        {
            Tabular loadTab = new Tabular((string)Session["id"], Convert.ToDateTime(dateFrom), Convert.ToDateTime(dateTo));
            Context.Response.Write(js.Serialize(loadTab.RenderReport()));
        }
    }
}
