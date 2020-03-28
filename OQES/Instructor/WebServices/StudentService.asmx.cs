using System;
using System.Web.Script.Serialization;
using System.Web.Services;

namespace OQES.Instructor
{
    /// <summary>
    /// Summary description for StudentService
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class StudentService : System.Web.Services.WebService
    {
        JavaScriptSerializer js = new JavaScriptSerializer();

        [WebMethod]
        public void FillSubjectRequestFilter()
        {
            Request subjReqFilter = new Request();
            Context.Response.Write(subjReqFilter.fillSubjectRequestFilter());
        }

        [WebMethod]
        public void Request(int subjId, string status)
        {
            Request req = new Request();
            Context.Response.Write(js.Serialize(req.request(subjId, status)));
        }

        [WebMethod(EnableSession = true)]
        public void RequestAction(string status, string studId, int subjId)
        {
            Main.fileManagement("EXEC [uspTransactRequest] @studID = '" + studId + "', @subjID = " + subjId + ", @instrID = '" + Session["id"] + "', @status = '" + @status + "'");
        }

        [WebMethod(EnableSession = true)]
        public void GetStudent()
        {
            Student loadStud = new Student((string)Session["id"]);
            Context.Response.Write(js.Serialize(loadStud.GetStudent()));
        }

        [WebMethod]
        public void GetSubject(string stud_id)
        {
            Subject viewEnrolledSubj = new Subject();
            Context.Response.Write(js.Serialize(viewEnrolledSubj.getSubject(stud_id)));
        }

        [WebMethod]
        public void GetInfo(string stud_id)
        {
            Student info = new Student();
            Context.Response.Write(js.Serialize(info.GetStudent(stud_id)));
        }

        [WebMethod(EnableSession = true)]
        public void NewStudentInfo(string stud_id, string fname, string mname, string lname, int subj_id, string pass)
        {
            Student check = new Student();
            if(check.checkStudentIfExist(stud_id) == false)
            {
                Main.fileManagement("EXEC [uspAddStudent] @studID = '" + stud_id.Replace("'", "''").Trim() + "', @fname = '" + fname.Replace("'", "''").Trim() + "', @mname = '" + mname.Replace("'", "''").Trim() + "', @lname = '" + lname.Replace("'", "''").Trim() + "', @pass = '" + pass.Replace("'", "''").Trim() + "', @subjID = " + Convert.ToInt32(subj_id) + ", @instrID = '" + Session["id"] + "', @dateEnrolled = '" + DateTime.Now.ToString("MM/dd/yyyy") + "', @status = 'approved', @toEnroll = 'y'");
                Context.Response.Write("success|Student successfully added!");
            }
            else
            {
                Context.Response.Write("warning|Student already exist!");
            }

        }

        [WebMethod]
        public void UpdateStudentInfo(string stud_id, string fname, string lname)
        {
            Main.fileManagement("UPDATE [student]" +
                                "SET [fname] = '" + fname.Replace("'", "''").Trim() + "', [lname] = '" + lname.Replace("'", "''").Trim() + "'" +
                                "WHERE [stud_id] = '" + stud_id + "'");
            Context.Response.Write("success|Student Info. Updated Successfully");
        }

        [WebMethod]
        public void RemoveStudent(string stud_id)
        {
            Main.fileManagement("DELETE FROM [student]" +
                                "WHERE [stud_id] = '" + stud_id + "'");
        }

        [WebMethod(EnableSession = true)]
        public void DeleteRejectedRequest()
        {
            Main.fileManagement("DELETE FROM [request]" +
                                "WHERE [status] = 'rejected' AND [instr_id] = '" + Session["id"] + "'");
        }

        [WebMethod(EnableSession = true)]
        public void ShowBadge()
        {
            int count = Main.dataCounter("SELECT COUNT(*)" +
                                         "FROM [request] JOIN [student_handle] ON [request].[handle_id] = [student_handle].[handle_id]" +
                                         "WHERE [instr_id] = '" + Session["id"] + "'");

            Context.Response.Write(count);
        }
    }
}
