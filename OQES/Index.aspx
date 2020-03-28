<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Index.aspx.cs" Inherits="OQES.Index" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Online Quiz and Examination System</title>

    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

    <link rel="stylesheet" href="Content/bootstrap/css/bootstrap-4.3.1.min.css" />
</head>
<body>
    <form id="form1" runat="server">
        <asp:ScriptManager ID="ScriptManager1" runat="server"></asp:ScriptManager>
        <div class="jumbotron jumbotron-fluid">
            <div class="container">
                <h1 class="display-4 text-center">Online Quiz and Examination</h1>
            </div>
        </div>

        <div class="container" style="text-align: center">
                <div class="col-lg-6" style="display: inline-block; position: relative;">
                    <div class="card border-info" style="text-align: left">
                        <div class="card-header">
                             Login
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">Enter ID and Password below to login...</h5>
                            <asp:UpdatePanel ID="UpdatePanel1" runat="server">
                                <ContentTemplate>
                                    <asp:Label ID="Label6" runat="server" Text="ID No.:"></asp:Label>
                                    <asp:TextBox ID="txtlogid" CssClass="form-control" runat="server"></asp:TextBox>
                                    <asp:Label ID="Label7" runat="server" Text="Password:"></asp:Label>
                                    <asp:TextBox ID="txtlogpassword" CssClass="form-control" TextMode="Password" runat="server"></asp:TextBox>
                                    <br />
                                    <asp:Button ID="btnLogin" CssClass="btn btn-info btn-block" runat="server" Text="Login" Enabled="false" /><br />
                                </ContentTemplate>
                            </asp:UpdatePanel>
                            <div id="reg-alert"></div>
                        </div>
                    </div>
                </div>
        </div>

        <div class="container-fluid">
            <p class="text-center">
                Programmed and Developed by <a href="https://oeros.000webhostapp.com/RJayBaterina/index.html">RJay Baterina</a> <br /> &copy; 2019
            </p>
        </div>
    </form>
</body>
    <script src="Content/bootstrap/js/bootstrap-4.3.1.min.js"></script>
    <script src="Content/bootstrap/js/jquery-3.3.1.min.js"></script>
    <script src="Content/bootstrap/js/popper.min.js"></script>
    <script src="Scripts/index.js"></script>
</html>
