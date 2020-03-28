<%@ Page Title="" Language="C#" MasterPageFile="~/Student/Student.Master" AutoEventWireup="true" CodeBehind="Subject.aspx.cs" Inherits="OQES.Student.WebForm2" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <!--DATA TABLES-->
    <link href="../Content/DataTables/datatables.min.css" type="text/css" rel="stylesheet" />
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
                <a href="Examination.aspx">
                    <i class="fas fa-file-signature" aria-hidden="true"></i>
                    <span>Examination <span id="examination-badge" class="badge"></span></span>
                </a>
            </li>
            <li role="separator" class="divider"></li>
            <li>
                <a href="#">
                    <i class="fas fa-book-open" aria-hidden="true"></i>
                    <span>Subject <span id="subject-badge" class="badge"></span></span>
                </a>
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
                <h3>Subject</h3>
            </div>
            <div class="col-lg-6" style="padding-top: 1%">
                <button class="btn btn-primary" type="button" data-toggle="modal" data-target="#myModal" style="float: right">ADD SUBJECT</button>
            </div>
        </div>

        <hr />

        <div class="container-fluid">
            <table id="subjTable" class="table table-bordered display" width="100%">
                <thead>
                    <tr>
                        <th>Course No.</th>
                        <th>Subject</th>
                        <th>Instructor</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th></th>
                    </tr>
                </thead>
            </table>
        </div>

        <div id="footer">
            <p class="text-muted">&#169; 2017 fenopix</p>
        </div>
    </div>
    
    <div class="modal" id="myModal">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Search For Subject</h4>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>

                <div class="modal-body">
                    <form>
                        <div class="input-group">
                            <input type="text" class="form-control" id="txtFilter" placeholder="Enter Course ID, Subject">
                            <div class="input-group-btn">
                                <button class="btn btn-primary" type="button" id="btnSearch">
                                    SEARCH
                                </button>
                            </div>
                        </div>
                    </form>

                    <div id="searchResult">
                    </div>
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
    <!--DATA TABLES JS-->
    <script src="../Content/DataTables/datatables.min.js"></script>
    <script src="../Content/DataTables/DataTables-1.10.18/js/jquery.dataTables.js"></script>
    <script src="../Content/DataTables/DataTables-1.10.18/js/dataTables.jquery-3.3.1.js"></script>
    <script src="../Content/DataTables/DataTables-1.10.18/js/dataTables.jquery-1.10.20.js"></script>
    <script src="../Content/DataTables/DataTables-1.10.18/js/dataTables.rowReorder.min.js"></script>
    <script src="../Content/DataTables/DataTables-1.10.18/js/dataTables.responsive-2.2.3.min.js"></script>

    <!--USER DEFINED JS-->
    <script src="js/Subject.js"></script>
</asp:Content>