<%@ Page Title="" Language="C#" MasterPageFile="~/Instructor/Navbar.Master" AutoEventWireup="true" CodeBehind="Account.aspx.cs" Inherits="OQES.Instructor.WebForm9" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
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
                <a href="ManageExam.aspx">
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
                <a href="#">
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
            <h3>Account Setting</h3>
            <hr />

            <div class="col-lg-6">
                <div class="panel panel-primary">
                    <div class="panel-heading">
                        <h5>Personal Information</h5>
                    </div>
                    <div class="panel-body">
                        <asp:Label ID="Label1" runat="server">Faculty ID:</asp:Label>
                        <asp:TextBox ID="txtFacID" CssClass="form-control textbox-control" runat="server" ReadOnly="true"></asp:TextBox>
                        <asp:Label ID="Label2" runat="server">Firstname:</asp:Label>
                        <asp:TextBox ID="txtFacFname" CssClass="form-control textbox-control" runat="server" ReadOnly="true"></asp:TextBox>
                        <asp:Label ID="Label3" runat="server">Middlename:</asp:Label>
                        <asp:TextBox ID="txtFacMname" CssClass="form-control textbox-control" runat="server" ReadOnly="true"></asp:TextBox>
                        <asp:Label ID="Label4" runat="server">Lastname:</asp:Label>
                        <asp:TextBox ID="txtFacLname" CssClass="form-control textbox-control" runat="server" ReadOnly="true"></asp:TextBox>
                    </div>
                </div>
            </div>

            <div class="col-lg-6">
                <div class="panel panel-danger">
                    <div class="panel-heading">
                        <h5>Account Security</h5>
                    </div>
                    <div class="panel-body">
                        <asp:Label ID="Label5" runat="server">Old Password:</asp:Label>
                        <asp:TextBox ID="txtOldPassword" CssClass="form-control textbox-control" runat="server" Placeholder="If your're account haven't password yet, skip this input..." ReadOnly="true" TextMode="Password"></asp:TextBox>
                        <asp:Label ID="Label6" runat="server">New Password:</asp:Label>
                        <asp:TextBox ID="txtNewPassword" CssClass="form-control textbox-control" runat="server" Placeholder="New Password" ReadOnly="true" TextMode="Password"></asp:TextBox>
                        <asp:Label ID="Label7" runat="server">Retype New Password:</asp:Label>
                        <asp:TextBox ID="txtRetypePassword" CssClass="form-control textbox-control" runat="server" Placeholder="Retype New Password" ReadOnly="true" TextMode="Password"></asp:TextBox><br />
                        <div class="col-sm-6">
                            <asp:Button ID="btnEdit" CssClass="btn btn-primary btn-block" runat="server" Text="EDIT" />
                        </div>
                        <div class="col-sm-6">
                            <asp:Button ID="btnCancel" CssClass="btn btn-danger btn-block" runat="server" Text="CANCEL" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-12">
                <div id="alert-account"></div>
            </div>
        </div>

        <div id="footer">
            <p class="text-muted">&#169; 2017 fenopix</p>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
    <!-- USER DEFINED JS -->
    <script src="../Scripts/user.js"></script>
    <script src="js/Account.js"></script>
</asp:Content>
