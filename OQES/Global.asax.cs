using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.SessionState;

namespace OQES
{
    public class Global : System.Web.HttpApplication
    {
        protected void Application_Start(object sender, EventArgs e)
        {
            UpdateMissedExam();
        }

        //MARKED STATUS AS 'CLOSED' WHEN EXAM IS MISSED
        private void UpdateMissedExam()
        {
            /*Main.fileManagement("UPDATE [exam]" +
                                "SET [status] = 'closed'" +
                                "WHERE [exam_date] < GETDATE() AND [status] <> 'finished' AND [status] <> 'closed' AND [status] <> 'open'");*/
        }
    }
}