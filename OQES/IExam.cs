using OQES.Instructor;
using System.Collections.Generic;

namespace OQES
{
    interface IExam
    {
        List<Exam> loadExam();
        List<Exam> previousExam();
    }
}
