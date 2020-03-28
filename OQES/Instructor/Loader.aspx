<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Loader.aspx.cs" Inherits="OQES.Instructor.Loader" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../Content/Loader/css/demo.css" rel="stylesheet" />
</head>
<body>
    <!--<form id="form1" runat="server">-->
        <div>
            <div class="demo">
    <div class="demo-content">
      <button class="toggle-loading">Toggle Overlay</button>
      <input type="checkbox" id="css-input" checked />
      <label for="css-input">show with demo css</label>
      <div id="target">
          
      </div>
    </div>
  </div>
        </div>
    <!--</form>-->
</body>
<script src="../Content/Loader/js/jquery.js"></script>
<script src="../Content/Loader/js/loading-overlay.min.js"></script>

    <script>
  jQuery(function ($) {
    var target = $('#target');

    $('.toggle-loading').click(function () {
      if (target.hasClass('loading')) {
        target.loadingOverlay('remove');
      } else {
        target.loadingOverlay();
      };
    });
  });
  </script>
</html>
