// Generated by CoffeeScript 1.3.1
(function() {

  window.plugins.logwatch = {
    bind: function(div, item) {},
    emit: function(div, item) {
      return wiki.getScript('http://cdn.sockjs.org/sockjs-0.3.min.js', function() {
        var form, print, sockjs, sockjs_url;
        div.append("<style>\n  .logwatch .box {\n      width: 300px;\n      float: left;\n      margin: 0 20px 0 20px;\n  }\n  .logwatch .box div, .logwatch .box input {\n      border: 1px solid;\n      -moz-border-radius: 4px;\n      border-radius: 4px;\n      width: 100%;\n      padding: 0px;\n      margin: 5px;\n  }\n  .logwatch .box div {\n      border-color: grey;\n      height: 300px;\n      overflow: auto;\n  }\n</style>\n\n<div id=\"first\" class=\"box\">\n  <div></div>\n</div>                  ");
        sockjs_url = "/system/logwatch";
        sockjs = new SockJS(sockjs_url);
        div = $("#first div");
        form = $("#first form");
        print = function(m, p) {
          p = (p === undefined ? "" : JSON.stringify(p));
          div.append($("<p>").html(m + " " + p));
          div.append($("</p>"));
          return div.scrollTop(div.scrollTop() + 10000);
        };
        sockjs.onopen = function() {
          return print("WebSocket Connection Opened", sockjs.protocol);
        };
        sockjs.onmessage = function(e) {
          return print(wiki.resolveLinks("Page Viewed: [[" + (JSON.parse(e.data).title) + "]]"));
        };
        return sockjs.onclose = function() {
          return print("WebSocket Connection Closed");
        };
      });
    }
  };

}).call(this);
