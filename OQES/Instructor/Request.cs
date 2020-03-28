using System;
using System.Collections.Generic;
using System.Data.SqlClient;

namespace OQES.Instructor
{
    public class Request : Student
    {
        public string reqDate { get; set; }
        public string status { get; set; }

        public string fillSubjectRequestFilter()
        {
            string subjId = "";
            string subj = "";
            var cmd = new SqlCommand("SELECT DISTINCT [subj_id], [subject_title]" +
                                     "FROM [viewStudentSubjReq]", conn);

            conn.Open();
            var r = cmd.ExecuteReader();

            while (r.Read())
            {
                subjId += (Convert.ToInt32(r[0]) + "-").Trim();
                subj += (r[1].ToString() + "-").Trim();
            }
            conn.Close();

            return subjId + "|" + subj;
        }

        public List<Request> request(int subjId, string status)
        {
            string toFilter = "";
            if (subjId != 0 && status == "")  //subject filtering
            {
                toFilter = "WHERE [subj_id] = " + subjId;
            }
            else if (subjId == 0 && status != "")
            {
                toFilter = "WHERE [status] = '" + status + "'";
            }

            List<Request> request = new List<Request>();

            var cmd = new SqlCommand("SELECT [stud_id], [Fullname], [subj_id], [subject_title], [request_date], [status] " +
                                     "FROM [viewStudentSubjReq]" + toFilter, conn);

            conn.Open();
            var r = cmd.ExecuteReader();
            while (r.Read())
            {
                var req = new Request
                {
                    studID = r[0].ToString(),
                    fullname = r[1].ToString(),
                    subjID = Convert.ToInt32(r[2]),  //as subject ID
                    subj = r[3].ToString(),
                    reqDate = Convert.ToDateTime(r[4].ToString()).ToString("MM/dd/yyyy"),
                    status = r[5].ToString()
                };
                request.Add(req);
            }
            conn.Close();

            return request;
        }
    }
}