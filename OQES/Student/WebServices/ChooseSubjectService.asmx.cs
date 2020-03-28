using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Web.Script.Serialization;
using System.Web.Services;

namespace OQES.Student.WebServices
{
    /// <summary>
    /// Summary description for ChooseSubjectService
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class ChooseSubjectService : System.Web.Services.WebService
    {
        SqlConnection conn = new SqlConnection("Data Source=.\\SQLEXPRESS;Initial Catalog=oqes;Integrated Security=True");
        JavaScriptSerializer js = new JavaScriptSerializer();
        public class Var
        {
            public int courseId { get; set; }
            public string subject { get; set; }
            public string ids { get; set; }
            public string instructor { get; set; }
            public string capacity { get; set; }
        } 


        string sortQueryExtension(string sort)
        {
            return "WHERE " + sort + "(SELECT[enrolled_subj].[subj_id], [enrolled_subj].[instr_id]" +
                                      "FROM [enrolled_subj]" +
                                      "WHERE[enrolled_subj].[subj_id] = [subj_handle].[subj_id] AND [enrolled_subj].[instr_id] = [subj_handle].[instr_id] AND [enrolled_subj].[stud_id] = '" + Session["id"] + "')";  //USE STUDENT SESSION VARIABLE HERE
        }

        [WebMethod (EnableSession = true)]
        public void LoadSubject(string sort)
        {
            var subject = new List<Var>();

            string queryExt = "";
            if(sort != "")
            {
                queryExt = sortQueryExtension(sort);
            }
            var cmd = new SqlCommand("SELECT [subj_handle].[subj_id], [subject].[subject_title], [subj_handle].[instr_id], CONCAT([instructor].[lname], ', ', [instructor].[fname])," +
                                     "CONCAT((SELECT COUNT([enrolled_subj].[subj_id])" +
                                             "FROM [enrolled_subj]" +
                                             "WHERE ([enrolled_subj].subj_id = [subj_handle].[subj_id]) AND ([enrolled_subj].[instr_id] = [subj_handle].[instr_id])), '/', [subj_handle].[capacity])" +
                                     "FROM [subj_handle] JOIN [subject] ON [subj_handle].[subj_id] = [subject].[subj_id] JOIN [instructor] ON [subj_handle].[instr_id] = [instructor].[instr_id]" + queryExt, conn);
            conn.Open();
            var dr = cmd.ExecuteReader();

            while (dr.Read())
            {
                var subj = new Var
                {
                    courseId = Convert.ToInt32(dr[0].ToString()),
                    subject = dr[1].ToString(),
                    instructor = dr[3].ToString(),
                    capacity = dr[4].ToString(),
                    ids = (Convert.ToInt32(dr[0].ToString()) + "~" + dr[2].ToString() + "~" + dr[4].ToString())
                };
                subject.Add(subj);
            }
            conn.Close();

            Context.Response.Write(js.Serialize(subject));
        }

        [WebMethod]
        public void CheckCourse(string sId, string iId, int cId)
        {
            var cmd = new SqlCommand("SELECT COUNT(*)" +
                                     "FROM [subj_handle]" +
                                     "WHERE NOT EXISTS(SELECT[enrolled_subj].[subj_id], [enrolled_subj].[instr_id]" +
                                                      "FROM[oqes].[dbo].[enrolled_subj]" +
                                                      "WHERE [enrolled_subj].[subj_id] = " + cId + " AND[enrolled_subj].[instr_id] = '" + iId + "' AND [enrolled_subj].[stud_id] = '" + sId + "')", conn);
            conn.Open();
            int exist = (int)cmd.ExecuteScalar();
            conn.Close();

            if(exist != 0)
            {
                Context.Response.Write(js.Serialize("Process Request!"));
            }
        }

        [WebMethod]
        public void AddSubject(string sId, int cId, string iId)
        {
            var cmd = new SqlCommand("INSERT INTO [request]([stud_id], [subj_id], [instr_id], [request_date], [status])" +
                                     "VALUES('" + sId + "', " + cId + ", '" + iId + "', '" + DateTime.Now.ToString("MM/dd/yyyy") + "', 'pending')", conn);

            try
            {
                conn.Open();
                cmd.ExecuteNonQuery();
                conn.Close();
            }
            catch
            {
                conn.Close();
            }
        }
    }
}
