using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OQES
{
    public class DataTableParam
    {
        public int iDisplayLength { get; set; }
        public int iDisplayStart { get; set; }
        public int sEcho { get; set; }
        public int iSortCol_0 { get; set; }
        public string sSortDir_0 { get; set; }
        public string sSearch { get; set; }

        public int AutoInc { get; set; }
        public int TotalCount { get; set; }
    }
}