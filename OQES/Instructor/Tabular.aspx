<%@ Page Title="" Language="C#" MasterPageFile="~/Instructor/Navbar.Master" AutoEventWireup="true" CodeBehind="Tabular.aspx.cs" Inherits="OQES.Instructor.WebForm8" %>

<%@ Register Assembly="CrystalDecisions.Web, Version=13.0.4000.0, Culture=neutral, PublicKeyToken=692fbea5521e1304" Namespace="CrystalDecisions.Web" TagPrefix="CR" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <!-- DATEPICKER CSS -->
    <link href="../Content/DatePicker/css/jquery-ui.css" rel="stylesheet" />
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
                    <li><a href="#"><i class="fas fa-table"></i> Tabular</a></li>
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
                <a  href="#">
                    <i class="fas fa-sign-out-alt" aria-hidden="true"></i>
                    <span>Logout</span>
                </a>
            </li>
            <li role="separator" class="divider"></li>
        </ul>
    </div>

    <div id="page-content-wrapper" class="page-content-toggle">
        <div class="container-fluid">
            <h3>Tabular Report</h3>
            <hr />

            <div class="row">
                <div id="content" class="col-md-12 col-xs-12">
                    <div class="container-fluid">
                        <div class="col-lg-4">
                            <label>Date From:</label>
                            <asp:TextBox ID="txtDateFrom" CssClass="form-control datepicker" runat="server" ReadOnly="true"></asp:TextBox> 
                        </div>
                        <div class="col-lg-4">
                            <label>Date To:</label>
                            <asp:TextBox ID="txtDateTo" CssClass="form-control datepicker" runat="server" ReadOnly="true"></asp:TextBox> 
                        </div>
                        <div class="col-lg-4 btn-wrapper">
                            <asp:Button CssClass="btn btn-primary btn-sm" ID="btnGenerateReport" runat="server" Text="Generate" />
                        </div>
                    </div>
                    <br />
                    <div class="container-fluid">                    
                        <table class="table table-bordered" id="tabularReport">
                            <thead>  
                                <tr>  
                                    <th class="text-center">Exam No.</th>  
                                    <th class="text-center">Title</th>
                                    <th class="text-center">Subject</th>
                                    <th class="text-center">Exam Date</th>
                                    <th class="text-center">No. of Students</th>
                                    <th class="text-center">Mark</th>
                                    <th class="text-center">Passing Score</th>
                                    <th class="text-center">Passed</th>
                                    <th class="text-center">Failed</th>
                                </tr>  
                            </thead>  
                            <tbody id="tbody">

                            </tbody>
                        </table>
                    </div>
                    <br />
                </div> 
            </div> 
        </div>

        <div id="footer">
            <p class="text-muted">&#169; 2017 fenopix</p>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
    <!-- DATEPICKER JS -->
    <script src="../Content/DatePicker/js/jquery-ui.js"></script>

    <!--USER DEFINED JS-->
    <script src="js/Report.js"></script>
    <script>
        $(document).ready(function () {
            $(".datepicker").datepicker();
        });
    </script>
</asp:Content>