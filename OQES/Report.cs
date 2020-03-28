using OQES.Instructor;
using System;
using System.Collections.Generic;

namespace OQES
{
    public abstract class Report : Exam
    {
        public string label { get; set; }
        public Nullable<double> y = null;

        public abstract List<Report> RenderReport();
    }
}