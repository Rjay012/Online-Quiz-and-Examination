using System;
using System.Collections.Generic;

namespace OQES.Instructor
{
    public class Pie : Report
    {
        public Pie(string _userID, int _examID)
        {
            userID = _userID;
            examID = _examID;
        }

        public Pie(string _label, double _y)
        {
            label = _label;
            y = _y;
        }

        public Pie(int _examID)
        {
            examID = _examID;
        }

        public override List<Report> RenderReport()
        {
            List<Report> dataPoints = new List<Report>();

            GetPercentage(dataPoints, "passed");
            GetPercentage(dataPoints, "failed");

            return dataPoints;
        }

        private void GetPercentage(List<Report> dataPoints, string rating)
        {
            string result = Main.dataCounter("SELECT dbo.calculateExamineePercentage('" + rating + "', " + examID + ")");
            string[] arr = result.Split('|');
            dataPoints.Add(new Pie(arr[0].ToString(), Convert.ToDouble(arr[1])));
        }

        public string RenderTitle()
        {
            return Main.dataCounter("SELECT CONCAT([subject_title], ' ', [title])" +
                                    "FROM [exam] JOIN [subject] ON [exam].[subj_id] = [subject].[subj_id]" +
                                    "WHERE [exam_id] = " + examID);
        }
    }
}