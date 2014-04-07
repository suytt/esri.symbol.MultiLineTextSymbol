esri.symbol.MultiLineTextSymbol
=======================

Allows to span esri.symbol.TextSymbol on multiple lines.

Just include the JS file and proceed as usual with the [text symbol](https://developers.arcgis.com/javascript/jsapi/textsymbol-amd.html)

`new TextSymbol("Multi-Line \n Text")`

This patch is derived from the [Dojo Ticket #10973](https://bugs.dojotoolkit.org/attachment/ticket/10973/multi-line-text.patch) (4 years old... but will hopefully be included in dojo 2.0)


Example
=======

```HTML
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="initial-scale=1, maximum-scale=1,user-scalable=no"/>
    <title>Simple Map</title>
    <link rel="stylesheet" href="http://js.arcgis.com/3.8/js/esri/css/esri.css">
    <style>
        html, body, #map { height: 100%; width: 100%; margin: 0; padding: 0; }
        body { background-color: #FFF; overflow: hidden; font-family: "Trebuchet MS"; }
    </style>
    <script src="http://js.arcgis.com/3.8/"></script>
    <script src="https://raw.githubusercontent.com/Chaussette/esri.symbol.MultiLineTextSymbol/master/esri.symbol.MultiLineTextSymbol.js"></script>
    <script>
    var map;
    require(["esri/map", "esri/symbols/TextSymbol", "esri/graphic", "esri/geometry/Point", "dojo/domReady!"], 
    function(Map, TextSymbol, Graphic, Point)
    {
        map = new Map("map", { basemap: "topo", center: [0,0], zoom: 4, sliderStyle: "small" });
        map.on("load", function()
        {
            map.graphics.add(new Graphic(
                new Point(0, 0), 
                new TextSymbol("Multi-Line \n Text"),
                {})
            );
        });
      });
    </script>
</head>
<body>
    <div id="map"></div>
</body>
</html>
```
