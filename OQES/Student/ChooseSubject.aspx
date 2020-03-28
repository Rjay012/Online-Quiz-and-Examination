<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ChooseSubject.aspx.cs" Inherits="OQES.Student.ChooseSubject" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" />
    <link rel="stylesheet" href="../bootstrap/css/bootstrap.min.css" />
    <!-- Custom styles for this template -->
    <link href="../bootstrap/navbar/dashboard.css" rel="stylesheet" />
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous" />
    
    <link rel="stylesheet" href="css/navbar.css" />
    <link rel="stylesheet" type="text/css" href="../DataTables/datatables.min.css"/>
    <link href="../DataTables/DataTables-1.10.18/css/jquery.dataTables.css" rel="stylesheet" />  
    <link href="../DataTables/DataTables-1.10.18/css/dataTables.bootstrap.css" rel="stylesheet" />  
</head>
<body>
    <form id="form1" runat="server">
        <div class="container">
            <br />
            <h4 id="stud-id"></h4>
            <h2 id="stud-name"></h2>
            <br />
            <div id="myContent"></div>
            <div class="card border-primary">
                <div class="card-header">
                    Subject Selection
                </div>
                <div class="card-body">
                    <div class="dropdown">
                        <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown">
                            Show Subject
                        </button>
                        <div class="dropdown-menu">
                            <a class="dropdown-item" href="#" onclick="sortSubj('EXISTS')">Taken</a>
                            <a class="dropdown-item" href="#" onclick="sortSubj('NOT EXISTS')">Not Taken</a>
                        </div>
                   </div>
                   <br />
                   <table id="subjTable" class="table table-bordered display">  
                        <thead>  
                            <tr>  
                                <th>Course ID</th>  
                                <th>Subject</th>  
                                <th>Instructor</th>  
                                <th>Capacity</th>  
                                <th></th>
                            </tr>  
                        </thead>  
                    </table>    
                </div>
            </div>
            <br />
            <button class="btn btn-primary" style="float: right" type="button" id="btnContinue">CONTINUE</button>
        </div>
    </form>
</body>
    
    <script src="../bootstrap/js/bootstrap.min.js"></script>
    <script src="../bootstrap/js/jquery3.3.1.min.js"></script>
    <script src="../bootstrap/js/popper.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>

    <script type="text/javascript" src="../DataTables/datatables.min.js"></script>
    <script src="../DataTables/jQuery-3.3.1/jquery-3.3.1.js"></script>  
    <script src="../DataTables/DataTables-1.10.18/js/jquery.dataTables.js"></script>  

    <script src="js/chooseSubject.js"></script>
</html>
