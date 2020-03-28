<%@ Page Title="" Language="C#" MasterPageFile="~/Instructor/Navbar.Master" AutoEventWireup="true" CodeBehind="Student.aspx.cs" Inherits="OQES.Instructor.WebForm3" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <!--DATA TABLES CSS-->
    <link rel="stylesheet" type="text/css" href="../Content/DataTables/datatables.min.css"/>
    <link href="../Content/DataTables/DataTables-1.10.18/css/jquery.dataTables.css" rel="stylesheet" />  
    <link href="../Content/DataTables/DataTables-1.10.18/css/dataTables.bootstrap.css" rel="stylesheet" />
    <link href="../Content/DataTables/DataTables-1.10.18/css/dataTables-1.10.20.min.css" rel="stylesheet" />
    <link href="../Content/DataTables/DataTables-1.10.18/css/dataTables.rowReorder-1.2.6.min.css" rel="stylesheet" />
    <link href="../Content/DataTables/DataTables-1.10.18/css/dataTables.responsive-2.2.3.min.css" rel="stylesheet" />
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div id="sidebar" class="sidebar-toggle">
        <ul class="nav nav-sidebar">
            <li>
                <a href="Home.aspx" id="onLoadHome">
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
                <a href="#">
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
            <h3>Students</h3>
            <hr />

            <div class="row">
                <div id="content" class="col-md-12 col-xs-12">
                    <div class="container-fluid">
                        <asp:ScriptManager ID="ScriptManager1" runat="server"></asp:ScriptManager>
                        <div class="container-fluid">  
                            <button class="btn btn-success" type="button" data-toggle="modal" data-target="#myModalNewStudent">
                                Add New Student</button>
                            <button class="btn btn-primary" id="btnViewRequest" type="button" data-toggle="modal" data-target="#myModalReqStudent">
                                New Request <span class="badge" id="request-badge"></span>
                            </button>
                            <br /><br />
                            <table id="studentTable" class="table table-bordered display" width="100%">  
                                <thead>  
                                    <tr>  
                                        <th>ID</th>  
                                        <th>First Name</th>  
                                        <th>Middle Name</th>
                                        <th>Last Name</th>  
                                        <th>Subjects</th>
                                        <th></th>  
                                        <th></th>
                                    </tr>  
                                </thead>  
                            </table>  
                        </div>
                    </div>
                    <br />
                    
                </div> 
            </div> 
        </div>

        <div id="footer">
            <p class="text-muted">&#169; 2017 fenopix</p>
        </div>
    </div>
    
    <!--MODALS-->
    <div class="modal" id="myModalNewStudent">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">New Student</h4>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>

                <div class="modal-body">   
                    <asp:Label ID="Label1" runat="server" Text="Student ID No.:"></asp:Label>
                    <asp:TextBox ID="txtNewStudID" CssClass="form-control" runat="server"></asp:TextBox>
                    <asp:Label ID="Label2" runat="server" Text="Firstname:"></asp:Label>
                    <asp:TextBox ID="txtNewStudFname" CssClass="form-control" runat="server"></asp:TextBox>
                    <asp:Label ID="Label8" runat="server" Text="Middlename:"></asp:Label>
                    <asp:TextBox ID="txtNewStudMname" CssClass="form-control" runat="server"></asp:TextBox>
                    <asp:Label ID="Label3" runat="server" Text="Lastname:"></asp:Label>
                    <asp:TextBox ID="txtNewStudLname" CssClass="form-control" runat="server"></asp:TextBox>
                    <asp:Label ID="Label9" runat="server" Text="Subject:"></asp:Label>
                    <asp:DropDownList ID="ddlSubject" CssClass="form-control" runat="server"></asp:DropDownList>
                    <asp:Label ID="Label4" runat="server" Text="New Password:"></asp:Label>
                    <asp:TextBox ID="txtNewStudPassword" CssClass="form-control" runat="server" TextMode="Password"></asp:TextBox>
                    <asp:Label ID="Label5" runat="server" Text="Retype Password:"></asp:Label>
                    <asp:TextBox ID="txtNewStudRetypePassword" CssClass="form-control" runat="server" TextMode="Password"></asp:TextBox>
                    <br />
                    
                    <div id="newStud-alert"></div>
                </div>

                <div class="modal-footer">
                    <asp:Button ID="btnSaveNewStud" CssClass="btn btn-primary" runat="server" Text="Save" />
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>

    <!--MODAL VIEW SUBJECT-->
    <div class="modal" id="myModalViewSubject">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Subjects</h4>
                <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>

            <div class="modal-body">
                <table id="studentSubjectTable" style="width: 100%" class="table table-bordered display">  
                    <thead>  
                        <tr>  
                            <th>Course ID</th>  
                            <th>Subject</th>  
                            <th>Enrolled Date</th>  
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

    <div class="modal" id="myModalReqStudent">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">New Request</h4>
                <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>

            <div class="modal-body">
                <div class="dropdown">
                    <button type="button" class="btn btn-primary btn-sm dropdown-toggle" data-toggle="dropdown">
                        Filter By <span class="caret"></span>
                    </button>
                    <ul class="dropdown-menu">
                        <li class="dropdown-header text-center">Subject</li>
                        <li class="dropdown-divider"></li>
                        <li id="toFilterSubject"></li>
                        <li class="dropdown-divider"></li>
                        <li class="dropdown-header text-center">Status</li>
                        <li class="dropdown-divider"></li>
                        <li>
                            <a class="dropdown-item" onclick="filterByStatus('pending')" href="#">Pending</a>
                        </li>
                        <li>
                            <a class="dropdown-item" onclick="filterByStatus('rejected')" href="#">Rejected</a>
                        </li>
                    </ul>
                </div>
                <br />
                <table id="studentRequestTable" style="width: 100%" class="table table-bordered display">  
                    <thead>  
                        <tr>  
                            <th>ID</th>  
                            <th>Fullname</th>  
                            <th>Subject</th>  
                            <th>Date Requested</th>  
                            <th>Status</th>
                            <th></th>  
                        </tr>  
                    </thead>  
                </table> 
                <br />
                <div id="alert-request">

                </div>
                <button class="btn btn-danger" id="btnDisposeRejectedRequest" type="button">Dispose Rejected Requests</button>
            </div>

            <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
            </div>
            </div>
        </div>
    </div>
    
    <div class="modal" id="myModalUpdateStudent">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Update Student Info</h4>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>

                <div class="modal-body">
                    <asp:Label ID="Label10" runat="server" Text="Student ID:"></asp:Label>
                    <asp:TextBox ID="txtUpdateID" CssClass="form-control" runat="server" Enabled="False"></asp:TextBox>
                    <asp:Label ID="Label6" runat="server" Text="Firstname:"></asp:Label>
                    <asp:TextBox ID="txtUpdateFirstname" CssClass="form-control" runat="server"></asp:TextBox>
                    <asp:Label ID="Label11" runat="server" Text="Middlename:"></asp:Label>
                    <asp:TextBox ID="txtUpdateMiddlename" CssClass="form-control" runat="server"></asp:TextBox>        
                    <asp:Label ID="Label7" runat="server" Text="Lastname:"></asp:Label>
                    <asp:TextBox ID="txtUpdateLastname" CssClass="form-control" runat="server"></asp:TextBox>                            
                    <br />
                    <div id="updateStud-alert"></div>
                </div>

                <div class="modal-footer">
                    <asp:Button ID="btnSaveUpdate" CssClass="btn btn-primary" runat="server" Text="Save" />
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

    <!--USER DEFINED JS-->
    <script src="js/EnrolledStudent.js"></script>
</asp:Content>