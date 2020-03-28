<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Sample.aspx.cs" Inherits="OQES.Sample" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <title></title>
    <link href="~/Content/bootstrap.min.css" rel="stylesheet" type="text/css" />
    <link href="~/Content/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css" />
    <link href="~/Content/style.css" rel="stylesheet" type="text/css" />
</head>
<body>
    <nav id="header" class="navbar navbar-fixed-top">
        <div class="container-fluid">
            <div class="navbar-header">
                <div id="sidebar-toggle-button">
                    <i class="fa fa-bars" aria-hidden="true"></i>
                </div>
                <div class="brand">
                    <a href="/">
                        CanvasJS Examples
                    </a>
                </div>

            </div>
        </div>
    </nav>

    <div id="sidebar" class="sidebar-toggle">
        <ul class="nav nav-sidebar">
            <li>
                <a href="/">
                    <i class="fa fa-home" aria-hidden="true"></i>
                    <span>HOME</span>
                </a>
            </li>
            <li role="separator" class="divider"></li>

            <!-- chart types -->
            <li data-toggle="collapse" href="#charttypes" aria-expanded="true" aria-controls="chart-types">
                <a href="#">
                    <i class="fa fa-area-chart" aria-hidden="true" style="width: 13px;"></i>
                    <span>CHART TYPES</span>
                </a>
            </li>

            <li>
                <ul id="charttypes" class="sub-menu collapse">
                    <li><a href="/charttypes/column/">Column Chart</a></li>
                    <li><a href="/charttypes/line/">Line Chart</a></li>
                    <li><a href="/charttypes/stepline/">Step Line Chart</a></li>
                    <li><a href="/charttypes/spline/">Spline Chart</a></li>
                    <li><a href="/charttypes/steparea/">Step Area Chart</a></li>
                    <li><a href="/charttypes/area/">Area Chart</a></li>
                    <li><a href="/charttypes/splinearea/">Spline Area Chart</a></li>
                    <li><a href="/charttypes/bar/">Bar Chart</a></li>
                    <li><a href="/charttypes/pie/">Pie Chart</a></li>
                    <li><a href="/charttypes/doughnut/">Doughnut Chart</a></li>
                    <li><a href="/charttypes/bubble/">Bubble Chart</a></li>
                    <li><a href="/charttypes/scatter/">Scatter Chart</a></li>
                    <li><a href="/charttypes/stackedcolumn/">Stacked Column Chart</a></li>
                    <li><a href="/charttypes/stackedcolumn100/">Stacked Column 100% Chart</a></li>
                    <li><a href="/charttypes/stackedarea/">Stacked Area Chart</a></li>
                    <li><a href="/charttypes/stackedarea100/">Stacked Area 100% Chart</a></li>
                    <li><a href="/charttypes/stackedbar/">Stacked Bar Chart</a></li>
                    <li><a href="/charttypes/stackedbar100/">Stacked Bar 100% Chart</a></li>
                    @*<li><a href="#">Range Column Chart</a></li>
                        <li><a href="#">Range Bar Chart</a></li>
                        <li><a href="#">Range Area Chart</a></li>
                        <li><a href="#">Range Spline Area Chart</a></li>
                        <li><a href="#">OHLC Chart</a></li>
                        <li><a href="#">Candlestick Chart</a></li>*@
                </ul>
            </li>
            <!-- /chart types -->

            <li role="separator" class="divider"></li>

            <!--  features -->
            <li data-toggle="collapse" href="#features" aria-expanded="false" aria-controls="features">
                <a href="#">
                    <i class="fa fa-flask" aria-hidden="true"></i>
                    <span>FEATURES</span>
                </a>
            </li>

            <li>
                <ul id="features" class="sub-menu collapse">
                    <li><a href="/features/zoomingpanning/">Zooming &amp; Panning</a></li>
                    <li><a href="/features/exportchart/">Export Chart as Image</a></li>
                    <li><a href="/features/eventhandling/">Events</a></li>
                    <li><a href="/features/logaxis/">Logarithmic Axis</a></li>
                    <li><a href="/features/reverseaxis/">Reverse Axis</a></li>
                    <li><a href="/features/datetime/">Date Time Axis</a></li>
                    <li><a href="/features/striplines/">StripLines</a></li>
                    <li><a href="/features/multipleyaxis/">Multiple Y Axis</a></li>
                    <li><a href="/features/multiserieschart/">Multiseries Charts</a></li>
                </ul>
            </li>
            <!--  /features -->

            <li role="separator" class="divider"></li>

            <!--  how to  -->
            <li data-toggle="collapse" href="#howto" aria-expanded="false" aria-controls="how-to">
                <a href="#">
                    <i class="fa fa-wrench" aria-hidden="true"></i>
                    <span>HOW TO</span>
                </a>
            </li>

            <li>
                <ul id="howto" class="sub-menu collapse">
                    <li><a href="/howto/enabledisableds/">Hide / Show DataSeries</a></li>
                    <li><a href="/howto/livechart/">Dynamic / Live Chart</a></li>
                    <li><a href="/howto/syncmultiplecharts/">Sync Mulitple Charts</a></li>
                    <li><a href="/howto/adddatapointsfromuserinput/">Add Data Points From User Input</a></li>
                    <li><a href="/howto/multiplechartsinapage/">Multiple Charts in a Page</a></li>
                    <li><a href="/howto/playstoplivechart/">Play / Stop Live Chart</a></li>
                    <li><a href="/howto/createchartfromjson/">Charts using JSON &amp; AJAX</a></li>
                    <li><a href="/howto/createchartfromxml/">Charts using XML &amp; AJAX</a></li>
                    <li><a href="/howto/createchartfromcsv/">Charts using CSV &amp; AJAX</a></li>
                    <li><a href="/howto/datafromdatabase">Render Data From Database</a></li>
                </ul>
            </li>
            <!--  /how to  -->

            <li role="separator" class="divider"></li>
        </ul>
    </div>

        <div id="page-content-wrapper" class="page-content-toggle">
        <div class="container-fluid">
            <h1></h1>

            <div class="row">
                <div id="content" class="col-md-1 col-md-offset-1 col-xs-12">
                   <button class="btn btn-primary">ADD</button>
                </div> <!-- /content-->
            </div> <!-- /row -->
        </div> <!-- /container-fluid -->
    </div>
</body>
    
    <script src="Scripts/modernizr-2.6.2.js"></script>
    <script src="Scripts/jquery-1.12.4.min.js"></script>
    <script src="Scripts/bootstrap.min.js"></script>
    <script src="Scripts/sidebar-toggle.js"></script>
</html>
