using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Script.Serialization;
using System.Web.Services;

namespace OQES.Instructor.WebServices
{
    /// <summary>
    /// Summary description for ManageExamService
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class ManageExamService : System.Web.Services.WebService
    {
        JavaScriptSerializer js = new JavaScriptSerializer();

        [WebMethod(EnableSession = true)]
        public void LoadExam(int iDisplayLength, int iDisplayStart, int iSortCol_0, string sSortDir_0, string sSearch)
        {
            Exam le = new Exam((string)Session["id"], iDisplayLength, iDisplayStart, iSortCol_0, sSortDir_0, sSearch);
            int noOfExam = Main.dataCounter("SELECT COUNT(*) " +
                                            "FROM [exam] " +
                                            "WHERE [instr_id] = '" + (string)Session["id"] + "'");
            List<Exam> exam = le.LoadExam();
            var result = new
            {
                aaData = exam,
                iTotalDisplayRecords = Convert.ToInt32(exam.ElementAt(0).TotalCount),
                TotalRecords = noOfExam
            };
            Context.Response.Write(js.Serialize(result));
        }

        [WebMethod]
        public void SetStatus(int id, string status)  //set exam status
        {
            Main.fileManagement("UPDATE [exam]" +
                                     "SET [status] = '" + status + "'" +
                                     "WHERE [exam_id] = " + id);
        }

        [WebMethod]
        public void DeleteExam(int examID)
        {
            Main.fileManagement("DELETE FROM [exam]" +
                                      "WHERE [exam_id] = " + examID);
        }

        [WebMethod]
        public void ViewExaminee(int iDisplayLength, int iDisplayStart, int iSortCol_0, string sSortDir_0, string sSearch, int examID)
        {
            Examinee examinee = new Examinee(iDisplayLength, iDisplayStart, iSortCol_0, sSortDir_0, sSearch);
            int noOfExaminee = Main.dataCounter("SELECT COUNT(*)" +
                                                "FROM [examinee]" +
                                                "WHERE [exam_id] = " + examID);
            List<Examinee> examineeResult = examinee.ViewExaminee(examID);
            var result = new
            {
                aaData = examineeResult,
                iTotalDisplayRecords = Convert.ToInt32(examineeResult.ElementAt(0).TotalCount),
                iTotalRecords = noOfExaminee
            };
            Context.Response.Write(js.Serialize(result));
        }

        [WebMethod]
        public void Action(int examineeID, string action)
        {
            //action = (action == "UNBLOCK") ? action = "pending" : action = (action.ToLower() + "ed");
            action = (action.ToLower() + "ed");

            if(action == "unblocked")
            {
                action = "pending";
            }

            Main.fileManagement("UPDATE [examinee]" +
                                        "SET [status] = '" + action + "'" +
                                        "WHERE [examinee_id] = " + examineeID);
        }
    }
}
