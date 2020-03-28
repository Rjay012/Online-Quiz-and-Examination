<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="TakeExam.aspx.cs" Inherits="OQES.Student.TakeExam" %>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>Take Exam</title>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8" />
    <meta charset="utf-8" />
    <meta name="generator" content="Bootply" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />

    <!--UI BOOTSTRAP CSS-->
    <!--<link href="..//Content/bootstrap/css/bootstrap-3.3.6.min.css" rel="stylesheet" />-->
    <link href="../Content/bootstrap/css/bootstrap-3.4.1.min.css" rel="stylesheet" />
    <link href="../Content/bootstrap/css/custom.min.css" rel="stylesheet" />
    <link href="../Content/style.css" rel="stylesheet" type="text/css" />
    <link href="../Content/font-awesome/css/all.css" rel="stylesheet" type="text/css" />

    <!--TIMER CSS
    <link href="css/timer.css" rel="stylesheet" />-->

    <!--USER DEFINED CSS-->
    <link href="css/takeExam.css" rel="stylesheet" />
</head>

<body>
    <div class="container-fluid content">
        <div class="text-center">
            <strong>If questionaires/results doesn't automatically load, <a href="#" onclick="reloadQuestionaire()">CLICK HERE</a>!</strong>
        </div>
    </div>

    <!-- Modal -->
    <div id="myModalPreviewExamResult" class="modal fade" role="dialog">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">Check examination</h4>
                </div>
                <div class="modal-body" id="preview-examresult-wrapper">
                    
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
</body>

<!--UI BOOTSTRAP JS-->
<!--<script src="../Content/bootstrap/js/jquery-3.3.1.min.js"></script>
    <script src="../Content/bootstrap/js/popper.min.js"></script>
    <script src="../Content/bootstrap/js/bootstrap.min.js"></script>-->
<script src="../Content/bootstrap/js/jquery-3.4.1.min.js"></script>
<script src="../Content/bootstrap/js/bootstrap-3.4.1.min.js"></script>
<script src="../Content/bootstrap/js/custom.js"></script>

<!--DATA TABLES JS-->
<script type="text/javascript" src="../DataTables/datatables.min.js"></script>
<script src="../DataTables/jQuery-3.3.1/jquery-3.3.1.js"></script>
<script src="../DataTables/DataTables-1.10.18/js/jquery.dataTables.js"></script>

<!--TIMER JS-->
<script src="../Content/Timer/jquery-countdown-timer-control.js"></script>

<!--USER DEFINED JS-->
<script src="js/TakeExam.js"></script>
<script src="js/service.js"></script>
</html>
