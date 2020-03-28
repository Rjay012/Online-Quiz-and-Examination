<%@ Page Title="" Language="C#" MasterPageFile="~/Instructor/Navbar.Master" AutoEventWireup="true" CodeBehind="CreateExam.aspx.cs" Inherits="OQES.Instructor.WebForm2" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <!--DATA TABLES CSS-->
    <link rel="stylesheet" type="text/css" href="../Content/DataTables/datatables.min.css"/>
    <link href="../Content/DataTables/DataTables-1.10.18/css/jquery.dataTables.css" rel="stylesheet" />  
    <link href="../Content/DataTables/DataTables-1.10.18/css/dataTables.bootstrap.css" rel="stylesheet" />
    <link href="../Content/DataTables/DataTables-1.10.18/css/dataTables-1.10.20.min.css" rel="stylesheet" />
    <link href="../Content/DataTables/DataTables-1.10.18/css/dataTables.rowReorder-1.2.6.min.css" rel="stylesheet" />
    <link href="../Content/DataTables/DataTables-1.10.18/css/dataTables.responsive-2.2.3.min.css" rel="stylesheet" />

    <!-- DATEPICKER CSS -->
    <link href="../Content/DatePicker/css/jquery-ui.css" rel="stylesheet" />

    <!-- TIMEPICKER CSS -->
    <link href="../Content/TimePicker/css/timepicker.min.css" rel="stylesheet" />
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
                <a href="#">
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
            <h3>Create Exam</h3>
            <hr />
            <div class="row">
                <div id="content" class="col-md-12 col-xs-12">
                    <div class="container-fluid">
                        <div class="alert-container">

                        </div>
                    </div>
                    <div class="container-fluid">
                        <ul class="nav nav-tabs" role="tablist">
                            <li role="presentation" class="active"><a href="#subjDetail" aria-controls="subjDetail" role="tab" data-toggle="tab">Subject and Details</a></li>
                            <li role="presentation"><a href="#createQuestionaire" aria-controls="createQuestionaire" role="tab" data-toggle="tab">Create Questionaire</a></li>
                            <li role="presentation"><a href="#embedQuestion" id="ancEmbedQuestion" aria-controls="embedQuestion" role="tab" data-toggle="tab">Embed Question(s)</a></li>
                        </ul>

                        <div class="tab-content">
                            <div role="tabpanel" class="tab-pane active" id="subjDetail">
                                <asp:Label ID="Label8" runat="server" Text="Title:"></asp:Label>
                                <asp:TextBox ID="txtTitle" CssClass="form-control" runat="server" TextMode="MultiLine"></asp:TextBox>
                                <asp:Label ID="Label3" runat="server" Text="Subject:"></asp:Label>
                                <asp:DropDownList ID="ddlSubject" CssClass="form-control" runat="server">
                                    <asp:ListItem Selected="True">--- Choose Subject ---</asp:ListItem>
                                </asp:DropDownList>
                                <asp:Label ID="Label2" runat="server" Text="Instruction:"></asp:Label>
                                <asp:TextBox ID="txtInstruction" runat="server" CssClass="form-control" TextMode="MultiLine"></asp:TextBox>
                                <asp:Label ID="Label6" runat="server" Text="Description:"></asp:Label>
                                <asp:TextBox ID="txtDescription" runat="server" CssClass="form-control" TextMode="MultiLine"></asp:TextBox>
                                <asp:Label ID="Label7" runat="server" Text="Date:"></asp:Label>
                                <asp:TextBox ID="txtDatePicker" data-provide="dateTpicker" runat="server" CssClass="form-control datepicker"></asp:TextBox>
                                <div class="col-md-6">
                                    <asp:Label ID="Label1" runat="server" Text="Start Time:"></asp:Label>
                                    <asp:TextBox ID="txtStartTime" CssClass="form-control" runat="server" ReadOnly="true"></asp:TextBox>
                                </div>
                                <div class="col-md-6">
                                    <asp:Label ID="Label9" runat="server" Text="End Time:"></asp:Label>
                                    <asp:TextBox ID="txtEndTime" CssClass="form-control" runat="server" ReadOnly="true"></asp:TextBox>
                                </div>
                                <!--<asp:TextBox ID="txtTimeLimit" runat="server" CssClass="form-control" TextMode="Number" ClientIDMode="Static"></asp:TextBox>-->
                                <asp:Label ID="Label4" runat="server" Text="Exam Type:"></asp:Label>
                                <asp:DropDownList ID="ddlExamType" CssClass="form-control" runat="server">
                                    <asp:ListItem Selected="True">--- Choose Exam Type ---</asp:ListItem>
                                    <asp:ListItem Value="all type">All Type</asp:ListItem>
                                    <asp:ListItem Value="multiple choice">Multiple Choice</asp:ListItem>
                                    <asp:ListItem Value="true or false">True or False</asp:ListItem>
                                    <asp:ListItem Value="fill in the blank">Fill in the blank</asp:ListItem>
                                    <asp:ListItem Value="enumeration">Enumeration</asp:ListItem>
                                </asp:DropDownList>
                                <asp:Label ID="Label5" runat="server" Text="Passing Mark:"></asp:Label>
                                <asp:DropDownList ID="ddlPassingMark" CssClass="form-control" runat="server">
                                    <asp:ListItem Selected="True">--- Choose Passing Mark ---</asp:ListItem>
                                    <asp:ListItem Value="40">40%</asp:ListItem>
                                    <asp:ListItem Value="50">50%</asp:ListItem>
                                    <asp:ListItem Value="60">60%</asp:ListItem>
                                </asp:DropDownList>
                                <br />
                                <asp:Button CssClass="btn btn-primary" ID="btnSaveExam" runat="server" Text="SAVE EXAM" /> | <asp:Button CssClass="btn btn-danger" ID="btnCancel" runat="server" Text="CANCEL" />
                            </div>
                            <div role="tabpanel" class="tab-pane" id="createQuestionaire">
                                <div class="col-lg-10">
                                    <div class="panel panel-default">
                                        <div class="panel-body">
                                            <div class="container-fluid">
                                                <strong id="qNo">Question:</strong>
                                                <asp:TextBox ID="txtQuestion" CssClass="form-control" runat="server" TextMode="MultiLine"></asp:TextBox>
                                            </div>
                                            <br />
                                            <div class="container-fluid" id="questionForm">
                                                
                                            </div>
                                            <div id="questions">

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-2">
                                    <div class="panel panel-default">
                                        <div class="panel-body text-center">
                                            <div class="dropdown">
                                                <button class="btn btn-success btn-block btn-sm dropdown-toggle" id="btnQtype" type="button" data-toggle="dropdown" disabled>
                                                    SELECT Q-TYPE <span class="caret"></span>

                                                </button>
                                                <ul class="dropdown-menu">
                                                    <li><a href="#" onclick="renderQuestionTypeForm('multiple choice')">Multiple Choice</a></li>
                                                    <li><a href="#" onclick="renderQuestionTypeForm('true or false')">True or False</a></li>
                                                    <li><a href="#" onclick="renderQuestionTypeForm('enumeration')">Enumeration</a></li>
                                                    <li><a href="#" onclick="renderQuestionTypeForm('fill in the blank')">Fill in the blank</a></li>
                                                </ul>
                                            </div><br />
                                            <asp:Button CssClass="btn btn-primary btn-sm btn-block" ID="btnSubmitQuestion" Enabled="true" runat="server" Text="SUBMIT" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div role="tabpanel" class="tab-pane" id="embedQuestion">
                                <div class="col-lg-8">
                                    <div class="well" id="questionaire-form">

                                    </div>
                                </div>
                                <div class="col-lg-4">
                                    <div class="well">
                                        
                                    </div>
                                    <div class="well">
                                        <asp:Button CssClass="btn btn-primary btn-sm btn-block" ID="btnEmbedAllQuestions" Enabled="false" runat="server" Text="EMBED ALL QUESTIONS" />
                                        <asp:Button CssClass="btn btn-info btn-sm btn-block" ID="btnEmbed" runat="server" Enabled="false" Text="EMBED QUESTION(S)" />
                                        <asp:Button CssClass="btn btn-danger btn-sm btn-block" ID="btnSelectPreviousExam" data-toggle="modal" data-target="#myModalSelectPreviousExam" runat="server" Text="SELECT PREVIOUS EXAM" />
                                    </div>
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

    <div class="modal" id="myModalSelectPreviousExam">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">PREVIOUS EXAMINATION(S)</h4>
                </div>

                <div class="modal-body">
                    <table id="previousExamTable" class="table table-bordered display" width="100%">  
                        <thead>  
                            <tr>  
                                <th></th>  
                                <th>Title</th>  
                                <th>Subject</th>
                                <th>Exam Date</th>
                                <th>No. of Question(s)</th>
                                <th></th>
                            </tr>  
                        </thead>  
                    </table>  
                </div>

                <div class="modal-footer">
                    <asp:Button CssClass="btn btn-primary" ID="btnSelect" runat="server" Text="SELECT" />
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

    <!-- DATEPICKER JS -->
    <script src="../Content/DatePicker/js/jquery-ui.js"></script>

    <!-- TIMEPICKER JS -->
    <script src="../Content/TimePicker/js/timepicker.min.js"></script>
    <script src="../Content/TimePicker/js/moment.min.js"></script>

    <!--USER DEFINED JS-->
    <script src="js/QuestionaireForm.js"></script>
    <script src="js/CreateExam.js"></script>
</asp:Content>