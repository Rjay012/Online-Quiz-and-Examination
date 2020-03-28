<%@ Page Title="" Language="C#" MasterPageFile="~/Instructor/Navbar.Master" AutoEventWireup="true" CodeBehind="Home.aspx.cs" Inherits="OQES.Instructor.WebForm1" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <!--DATA TABLES CSS-->
    <link rel="stylesheet" type="text/css" href="../Content/DataTables/datatables.min.css"/>
    <link href="../Content/DataTables/DataTables-1.10.18/css/jquery.dataTables.css" rel="stylesheet" />  
    <link href="../Content/DataTables/DataTables-1.10.18/css/dataTables.bootstrap.css" rel="stylesheet" />
    <link href="../Content/DataTables/DataTables-1.10.18/css/dataTables-1.10.20.min.css" rel="stylesheet" />
    <link href="../Content/DataTables/DataTables-1.10.18/css/dataTables.rowReorder-1.2.6.min.css" rel="stylesheet" />
    <link href="../Content/DataTables/DataTables-1.10.18/css/dataTables.responsive-2.2.3.min.css" rel="stylesheet" />

    <!--FULL CALENDAR CSS-->
    <link href="../Content/FullCalendar/fullcalendar-4.3.1/core/main.css" rel="stylesheet" />
    <link href="../Content/FullCalendar/fullcalendar-4.3.1/daygrid/main.css" rel="stylesheet" />
    <link href="../Content/FullCalendar/fullcalendar-4.3.1/timegrid/main.css" rel="stylesheet" />
    <link href="../Content/FullCalendar/fullcalendar-4.3.1/list/main.css" rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div id="sidebar" class="sidebar-toggle">
        <ul class="nav nav-sidebar">
            <li>
                <a href="#">
                    <i class="fas fa-home" aria-hidden="true"></i>
                    <span>Dashboard</span>
                </a>
            </li>
            <li role="separator" class="divider"></li>
            <li>
                <a href="CreateExam.aspx">
                    <i class="fas fa-file-signature" aria-hidden="true"></i>
                    <span>Create Exam</span>
                </a>
            </li>
            <li role="separator" class="divider"></li>
            <li>
                <a href="ManageExam.aspx" id="onLoadManageExam">
                    <i class="fas fa-tools" aria-hidden="true"></i>
                    <span>Manage Exam</span>
                </a>
            </li>
            <li role="separator" class="divider"></li>
            <li>
                <a href="Student.aspx" id="onLoadStudent">
                    <i class="fas fa-user-graduate" aria-hidden="true"></i>
                    <span>Student</span>
                </a>
            </li>
            <li role="separator" class="divider"></li>
            <li>
                <a href="Subject.aspx" id="onLoadSubject">
                    <i class="fas fa-book-open" aria-hidden="true"></i>
                    <span>Subject</span>
                </a>
            </li>
            <li role="separator" class="divider"></li>
            <li data-toggle="collapse" href="#features" aria-expanded="false" aria-controls="features">
                <a href="#">
                    <i class="fa fa-chart-bar" aria-hidden="true"></i>
                    <span>Report</span>
                </a>
            </li>
            <li>
                <ul id="features" class="sub-menu collapse">
                    <li><a href="PieChart.aspx" id="onLoadPieChart"><i class="fas fa-chart-pie"></i> Pie Chart</a></li>
                    <li><a href="#">Bar Chart</a></li>
                    <li><a href="Tabular.aspx"><i class="fas fa-table"></i> Tabular</a></li>
                </ul>
            </li>
            <li role="separator" class="divider"></li>
            <li>
                <a href="Account.aspx">
                    <i class="fas fa-users-cog" aria-hidden="true"></i>
                    <span>Account</span>
                </a>
            </li>
            <li role="separator" class="divider"></li>
            <li>
                <a href="#">
                    <i class="fas fa-sign-out-alt" aria-hidden="true"></i>
                    <span>Logout</span>
                </a>
            </li>
            <li role="separator" class="divider"></li>
        </ul>
    </div>

    <div id="page-content-wrapper" class="page-content-toggle">
        <div class="container-fluid">
            <h3>Dashboard</h3>
            <hr />

            <div class="row">
                <div id="content" class="col-md-12 col-xs-12">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-lg-4">
                                <div class="panel panel-primary" >
                                    <div class="panel-body">
                                        <i class="fas fa-book-open fa-3x dash-panel-icon"></i>
                                        <h4 class="card-title" id="card-subject">0</h4>
                                        <h6 class="card-text">Subject</h6>
                                    </div>
                                </div>
                            </div>
                  
                            <div class="col-lg-4">
                                <div class="panel panel-info">
                                    <div class="panel-body">
                                        <i class="fas fa-user-graduate fa-3x dash-panel-icon"></i>
                                        <h4 class="card-title" id="card-student">0</h4>
                                        <h6 class="card-text">Student</h6>
                                    </div>
                                </div>
                            </div>

                            <div class="col-lg-4">
                                <div class="panel panel-success">
                                    <div class="panel-body">
                                        <i class="fas fa-award fa-3x dash-panel-icon"></i>
                                        <h4 class="card-title" id="card-examination">0</h4>
                                        <h6 class="card-text">Examination</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-4">
                                <div class="panel panel-info" >
                                    <div class="panel-body">
                                        <i class="fas fa-flag fa-3x dash-panel-icon"></i>
                                        <h4 class="card-title" id="card-finished">0</h4>
                                        <h6 class="card-text"><a id="ancViewFinishedExam" data-toggle="modal" data-target="#myModalViewFinishedExam" href="#">Finished Exam</a></h6>
                                    </div>
                                </div>
                            </div>
                  
                            <div class="col-lg-4">
                                <div class="panel panel-danger">
                                    <div class="panel-body">
                                        <i class="fas fa-ban fa-3x dash-panel-icon"></i>
                                        <h4 class="card-title" id="card-banned">0</h4>
                                        <h6 class="card-text"><a id="ancViewBannedExaminee" data-toggle="modal" data-target="#myModalViewBannedExaminee" href="#">Banned Student</a></h6>
                                    </div>
                                </div>
                            </div>

                            <div class="col-lg-4">
                                <div class="panel panel-warning">
                                    <div class="panel-body">
                                        <i class="fas fa-calendar-alt fa-3x dash-panel-icon"></i>
                                        <h4 class="card-title" id="card-upcoming-exam">0</h4>
                                        <h6 class="card-text">Upcoming Exam</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    <hr />
                    
                    <div class="container-fluid">
                        <h4>Examination's Date</h4>
                        <div class="panel panel-default">
                            <div class="panel-body" id="calendar">

                            </div>
                        </div>
                    </div>
                    <div class="container-fluid">
                        <div class="panel panel-default">
                            <div class="panel-heading">
                                Bar Chart
                            </div>
                            <div class="panel-body">
                                <div id="chartContainer">

                                </div>
                            </div>
                        </div>
                   </div>
                </div> 
            </div> 
        </div>

        <div id="footer">
            <p class="text-muted">&#169; 2017 fenopix</p>
        </div>
    </div>

    <!--MODAL VIEW FINISHED EXAM-->
    <div class="modal" id="myModalViewFinishedExam">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Finished Exam</h4>
                <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>

            <div class="modal-body">
                <table id="finishedExamTable" style="width: 100%" class="table table-bordered display">  
                    <thead>  
                        <tr>  
                            <th class="text-center">Course ID</th>  
                            <th class="text-center">Title</th>  
                            <th class="text-center">Subject</th>  
                            <th class="text-center">Passer Percentage (%)</th>
                        </tr>  
                    </thead>  
                </table> 
            </div>

            <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
            </div>
            </div>
        </div>
    </div>

    <!--MODAL VIEW BANNED EXAMINEE-->
    <div class="modal" id="myModalViewBannedExaminee">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Finished Exam</h4>
                <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>

            <div class="modal-body">
                <table id="bannedExamineeTable" style="width: 100%" class="table table-bordered display">  
                    <thead>  
                        <tr>  
                            <th class="text-center"></th>
                            <th class="text-center">Stud No.</th>  
                            <th class="text-center">Fullname</th>  
                            <th></th>  
                        </tr>  
                    </thead>  
                </table> 
            </div>

            <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
            </div>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
    <!--PLUGINS DATA TABLES JS-->
    <script src="../Content/DataTables/datatables.min.js"></script>
    <script src="../Content/DataTables/DataTables-1.10.18/js/jquery.dataTables.js"></script>
    <script src="../Content/DataTables/DataTables-1.10.18/js/dataTables.jquery-3.3.1.js"></script>
    <script src="../Content/DataTables/DataTables-1.10.18/js/dataTables.jquery-1.10.20.js"></script>
    <script src="../Content/DataTables/DataTables-1.10.18/js/dataTables.rowReorder.min.js"></script>
    <script src="../Content/DataTables/DataTables-1.10.18/js/dataTables.responsive-2.2.3.min.js"></script>

    <!--PLUGINS FULL CALENDAR JS-->
    <script src="../Content/FullCalendar/fullcalendar-4.3.1/core/main.js"></script>
    <script src="../Content/FullCalendar/fullcalendar-4.3.1/interaction/main.js"></script>
    <script src="../Content/FullCalendar/fullcalendar-4.3.1/daygrid/main.js"></script>
    <script src="../Content/FullCalendar/fullcalendar-4.3.1/timegrid/main.js"></script>
    <script src="../Content/FullCalendar/fullcalendar-4.3.1/list/main.js"></script>

    <!--USER DEFINED JS-->
    <script src="js/Dashboard.js"></script>
</asp:Content>
