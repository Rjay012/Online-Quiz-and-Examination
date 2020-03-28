<%@ Page Title="" Language="C#" MasterPageFile="~/Admin/Admin.Master" AutoEventWireup="true" CodeBehind="Category.aspx.cs" Inherits="OQES.Admin.WebForm4" %>
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
                <a href="Dashboard.aspx">
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
                <a href="#">
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
                <h3>Category</h3>
            </div>
            <div class="col-lg-6" style="padding-top: 1%">
                <button class="btn btn-success" type="button" data-toggle="modal" data-target="#myModalAddCategory" style="float: right">Add Category</button>
            </div>
        </div>
        <hr />

        <div class="container-fluid">
            <table id="categoryTable" class="table table-bordered display" width="100%">  
                <thead>  
                    <tr>  
                        <th class="text-center"></th>  
                        <th class="text-center">Category</th>  
                        <th></th>
                        <th></th>
                    </tr>  
                </thead>  
            </table>  
        </div>

        <div id="footer">
            <p class="text-muted">&#169; 2017 fenopix</p>
        </div>
    </div>

    <!--MODAL-->
    <div class="modal" id="myModalAddCategory">
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Add Category</h4>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>

                <div class="modal-body">
                    <asp:Label ID="label1" runat="server">Category:</asp:Label>
                    <asp:TextBox CssClass="form-control" ID="txtAddCategory" runat="server"></asp:TextBox>
                </div>

                <div class="modal-footer">
                    <asp:Button CssClass="btn btn-primary" ID="btnSaveCategory" runat="server" Text="SAVE" />
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal" id="myModalEditCategory">
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Edit Category</h4>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>

                <div class="modal-body">
                    <asp:Label ID="label3" runat="server">Category ID:</asp:Label>
                    <asp:TextBox CssClass="form-control" ID="txtEditCategoryID" runat="server" ReadOnly="true"></asp:TextBox>
                    <asp:Label ID="label2" runat="server">Category:</asp:Label>
                    <asp:TextBox CssClass="form-control" ID="txtEditCategorys" runat="server"></asp:TextBox>
                </div>

                <div class="modal-footer">
                    <asp:Button CssClass="btn btn-primary" ID="btnEditCategory" runat="server" Text="SAVE" />
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
    <!--DATA TABLES JS-->
    <script src="../Content/DataTables/datatables.min.js"></script>
    <script src="../Content/DataTables/jQuery-3.3.1/jquery-3.3.1.js"></script>  
    <script src="../Content/DataTables/DataTables-1.10.18/js/jquery.dataTables.js"></script>
    <script src="../Content/DataTables/DataTables-1.10.18/js/dataTables.jquery-3.3.1.js"></script>
    <script src="../Content/DataTables/DataTables-1.10.18/js/dataTables.jquery-1.10.20.js"></script>
    <script src="../Content/DataTables/DataTables-1.10.18/js/dataTables.rowReorder.min.js"></script>
    <script src="../Content/DataTables/DataTables-1.10.18/js/dataTables.responsive-2.2.3.min.js"></script>

    <!--USER DEFINED JS-->
    <script src="js/category.js"></script>
</asp:Content>
