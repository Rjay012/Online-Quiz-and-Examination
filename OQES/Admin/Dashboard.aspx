<%@ Page Title="" Language="C#" MasterPageFile="~/Admin/Admin.Master" AutoEventWireup="true" CodeBehind="Dashboard.aspx.cs" Inherits="OQES.Admin.WebForm1" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
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
                <a href="Instructor.aspx">
                    <i class="fas fa-file-signature" aria-hidden="true"></i>
                    <span>Instructor</span>
                </a>
            </li>
            <li role="separator" class="divider"></li>
            <li>
                <a href="Category.aspx">
                    <i class="fab fa-buffer" aria-hidden="true"></i>
                    <span>Category</span>
                </a>
            </li>
            <li role="separator" class="divider"></li>
            <li>
                <a href="Subject.aspx">
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
                    <li><a href="#"><i class="fas fa-chart-pie"></i> Pie Chart</a></li>
                    <li><a href="#">Bar Chart</a></li>
                    <li><a href="#">Tabular</a></li>
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
            <div class="col-lg-6">
                <h3>Dashboard</h3>
            </div>
            <div class="col-lg-6" style="padding-top: 1%">
                <button class="btn btn-success" type="button" id="btnn" data-toggle="modal" data-target="#myModal" style="float: right">Pre Register</button>
            </div>
        </div>
        <hr />

        <div class="container-fluid">
            <div class="row">
                <div id="content" class="col-md-12 col-xs-12">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-lg-3">
                                <div class="panel panel-primary">
                                    <div class="panel-body">
                                        <i class="fas fa-book-open fa-3x dash-panel-icon"></i>
                                        <h3 class="card-title" id="card-subject"></h3>
                                        <p class="card-text">Subject</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="col-lg-3">
                                <div class="panel panel-warning">
                                    <div class="panel-body">
                                        <i class="fas fa-user-graduate fa-3x dash-panel-icon"></i>
                                        <h3 class="card-title" id="card-category"></h3>
                                        <p class="card-text">Category</p>
                                    </div>
                                </div>
                            </div>

                            <div class="col-lg-3">
                                <div class="panel panel-info">
                                    <div class="panel-body">
                                        <i class="fas fa-user-graduate fa-3x dash-panel-icon"></i>
                                        <h3 class="card-title" id="card-student"></h3>
                                        <p class="card-text">Student</p>
                                    </div>
                                </div>
                            </div>

                            <div class="col-lg-3">
                                <div class="panel panel-success">
                                    <div class="panel-body">
                                        <i class="fas fa-award fa-3x dash-panel-icon"></i>
                                        <h3 class="card-title" id="card-instructor"></h3>
                                        <p class="card-text">Instructor</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr />
                    
                    <div class="container-fluid">
                        <div id="chartContainer" style="height: 370px; width: 100%;"></div>
                    </div>
                </div> 
            </div> 
        </div>

        <div id="footer">
            <p class="text-muted">&#169; 2017 fenopix</p>
        </div>
    </div>

    <!--MODAL-->
    <div class="modal" id="myModal">
        <div class="modal-dialog modal-md">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Account Registration</h4>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>

                <div class="modal-body">
                    <asp:Label ID="Label6" runat="server" Text="Privileges:"></asp:Label>
                    <asp:DropDownList ID="ddlPrivilege" CssClass="form-control" runat="server"></asp:DropDownList>
                    <asp:Label ID="Label1" runat="server" Text="ID No.:"></asp:Label>
                    <asp:TextBox ID="txtid" CssClass="form-control" runat="server"></asp:TextBox>
                    <asp:Label ID="Label2" runat="server" Text="Firstname:"></asp:Label>
                    <asp:TextBox ID="txtfname" CssClass="form-control" runat="server"></asp:TextBox>
                    <asp:Label ID="Label8" runat="server" Text="Middlename:"></asp:Label>
                    <asp:TextBox ID="txtmname" CssClass="form-control" runat="server"></asp:TextBox>
                    <asp:Label ID="Label3" runat="server" Text="Lastname:"></asp:Label>
                    <asp:TextBox ID="txtlname" CssClass="form-control" runat="server"></asp:TextBox>
                    <br />
                    <div id="reg-alert"></div>
                </div>

                <div class="modal-footer">
                    <asp:Button ID="btnRegister" CssClass="btn btn-primary" runat="server" Text="Register" />
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
    <!-- CANVAS JS -->
    <script src="https://canvasjs.com/assets/script/canvasjs.min.js"></script>	

    <!--USER DEFINED JS-->
    <script src="js/dashboard.js"></script>
</asp:Content>