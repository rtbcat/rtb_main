!function(n,t,e){"use strict";var o=function(t){var e=n(this),o=e.closest("li"),s=e.nextAll("ul.content");return t.preventDefault(),n(".content.open").each(function(){s[0]!==this&&c(this)}),e.siblings(".content").toggleClass("open"),o.toggleClass("active"),!1},s=function(t){var e=n(".nav-links");return t.preventDefault(),n(this).text(e.toggleClass("menu-open").hasClass("menu-open")?"Close":"Menu"),!1},l=function(t){n(t.target).hasClass("toggle-dropdown")||n(".content.open").each(function(){c(this)})},c=function(t){n(t).removeClass("open").closest("li").toggleClass("active")};n(function(){n(e).on("click",l),n(".navbar").on("click tap",".toggle-dropdown",o).on("click tap","#menu-dropdown",s)})}(window.jQuery,window,document);