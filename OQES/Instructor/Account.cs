using Newtonsoft.Json;

namespace OQES.Instructor
{
    public class Account : Instructor
    {
        private string password;
        public string MyPassword
        {
            get
            {
                return password;
            }
            set
            {
                this.password = value;
            }
        }
        public Account(string _instrID)  //user
        {
            instrID = _instrID;
        }

        public void ChangeAccountSetting(string instructor)
        {
            Account instr = JsonConvert.DeserializeObject<Account>(instructor);

            Main.fileManagement("UPDATE [instructor]" +
                                "SET [fname] = '" + instr.fname + "', [mname] = '" + instr.mname + "', [lname] = '" + instr.lname + "', [password] = '" + instr.MyPassword + "'" +
                                "WHERE [instr_id] = '" + instrID + "'");
        }
    }
}