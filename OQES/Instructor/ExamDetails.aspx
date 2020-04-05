<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ExamDetails.aspx.cs" Inherits="OQES.Instructor.ExamDetails" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <link rel="stylesheet" href="../Content/bootstrap/css/bootstrap-3.4.1.min.css" />
    <link href="../Content/bootstrap/css/custom.min.css" rel="stylesheet" />
    <link href="../Content/font-awesome/css/all.css" rel="stylesheet" type="text/css" />

    <!-- DATEPICKER CSS -->
    <link href="../Content/DatePicker/css/jquery-ui.css" rel="stylesheet" />

    <!-- TIMEPICKER CSS -->
    <link href="../Content/TimePicker/css/timepicker.min.css" rel="stylesheet" />
</head>
<body>
    <!--<form id="form1" runat="server">-->
    <div class="container-fluid">
        <ul class="nav nav-tabs" role="tablist">
            <li role="presentation" class="active"><a href="#exam" id="ancLoadDetail" aria-controls="exam" role="tab" data-toggle="tab">Exam</a></li>
            <li role="presentation"><a href="#questionaire" id="ancLoadQuestionaire" aria-controls="questionaire" role="tab" data-toggle="tab">Questionaire</a></li>
        </ul>

        <div class="tab-content">
            <div role="tabpanel" class="tab-pane active" id="exam">
                <h3 id="title"></h3>
                <div id="exam-content">
                </div>
                <br />
                <div class="control">
                    <button class="btn btn-primary" type="button" id="btnEdit">EDIT</button>
                    | 
                        <button class="btn btn-danger" type="reset" id="btnCancel">CANCEL</button>
                    |
                        <button class="btn btn-warning toggle-loading" type="button" id="btnPrintExam">PRINT EXAM</button>
                </div>
            </div>
            <div role="tabpanel" class="tab-pane" id="questionaire">
                <div id="questionaire-alert">
                </div>
                <br />
                <div class="col-lg-10">
                    <div id="singleViewQuestionaires">
                    </div>
                </div>
                <div class="col-lg-2">
                    <!--<div class="sidebar-nav-fixed pull-right affix">-->
                    <div class="well">
                        <div id="questionBadges" style="overflow-wrap: break-word">
                        </div>
                    </div>
                    <div class="well">
                        <asp:Button CssClass="btn btn-primary btn-block btn-sm updateControl" ID="btnLock" Enabled="false" runat="server" Text="SAVE AND LOCK" />
                        <button class="btn btn-success btn-sm btn-block btnAddQuestion" type="button" data-toggle="modal" data-target="#myModalNewQuestion">ADD QUESTION</button>
                        <button class="btn btn-info btn-sm btn-block" type="button" disabled id="btnRandomizer">RANDOMIZE</button>
                        <button class="btn btn-warning btn-sm btn-block" type="button" id="btnPreviewQuestionaire" data-toggle="modal" data-target="#myModalPreviewQuestionaire">PREVIEW</button>
                        <button class="btn btn-danger btn-sm btn-block" type="button" disabled id="btnSingleViewRemove">REMOVE</button>
                    </div>
                    <!--</div>-->
                </div>
            </div>
        </div>
    </div>

    <!-- MODAL -->
    <div class="modal" id="myModalNewQuestion">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">New Question</h4>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>

                <div class="modal-body">
                    <div id="qTypeWrapper"></div>
                    <strong>Question:</strong>
                    <asp:TextBox CssClass="form-control" ID="txtAddQuestion" runat="server" TextMode="MultiLine"></asp:TextBox><br />

                    <div id="addQuestionForm"></div>
                    <div id="newQuestion-alert"></div>
                </div>

                <div class="modal-footer">
                    <asp:Button ID="btnSaveNewQuestion" CssClass="btn btn-primary" runat="server" Text="Save" />
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>

    <!-- MODAL PREVIEW QUESTIONAIRES -->
    <div class="modal" id="myModalPreviewQuestionaire">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title preview-title">Preview Questionaire</h4>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>

                <div class="modal-body">
                    <div id="questionaire-content">
                    </div>
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
    <!--</form>-->
</body>
<script src="../Content/bootstrap/js/jquery-3.4.1.min.js"></script>
<script src="../Content/bootstrap/js/bootstrap-3.4.1.min.js"></script>

<!-- DATEPICKER JS -->
<script src="../Content/DatePicker/js/jquery-ui.js"></script>

<!-- TIMEPICKER JS -->
<script src="../Content/TimePicker/js/timepicker.min.js"></script>
<script src="../Content/TimePicker/js/moment.min.js"></script>

<!--USER DEFINED JS-->
<script src="js/QuestionaireForm.js"></script>
<script src="js/alertMessage.js"></script>
<script src="js/ExamDetails.js"></script>
<script src="js/ViewQuestionaireSheet.js"></script>
</html>
