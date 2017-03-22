/*------------------------------------------------------------------------
# VMJ eStore Theme for VirtueMart 1.1.3 - August, 2009
# ------------------------------------------------------------------------
# Copyright (C) 2009-2013 VMJunction.com, Ltd. All Rights Reserved.
# @license - Copyrighted Commercial Software
# Author: VMJunction.com
# Websites:  http://www.vmjunction.com
# Icon Designed by: http://www.dryicons.com
-------------------------------------------------------------------------*/
function tab_jd_ts_tab1() {
tab_jd_ts_hide_divs();
document.getElementById("tab_jd_div_ts1").style.display = "block";
document.getElementById("jd_a_ts").style.color = "#000000";
document.getElementById("tab_jd_a_ts_tab1").style.backgroundColor = "#FFFFFF";
document.getElementById("tab_jd_a_ts_tab1").style.borderColor = "#b3b3b3";
document.getElementById("tab_jd_a_ts_tab1").style.bottom = "-1px";
document.getElementById("tab_jd_a_ts_tab2").style.bottom = "0px";
document.getElementById("tab_jd_a_ts_tab3").style.bottom = "0px";
document.getElementById("tab_jd_a_ts_tab1").style.position = "relative";
document.getElementById("tab_jd_a_ts_tab2").style.backgroundColor = "#dddddd";
document.getElementById("tab_jd_a_ts_tab3").style.backgroundColor = "#FFFFFF";
document.getElementById("tab_jd_a_ts_tab1").style.padding = "10px 12px 3px 13px";
}
function tab_jd_ts_tab2() {
tab_jd_ts_hide_divs();
document.getElementById("tab_jd_div_ts2").style.display = "block";
document.getElementById("jd_a_ts1").style.color = "#000000";
document.getElementById("tab_jd_a_ts_tab2").style.backgroundColor = "#FFFFFF";
document.getElementById("tab_jd_a_ts_tab2").style.borderColor = "#b3b3b3";
document.getElementById("tab_jd_a_ts_tab2").style.bottom = "-1px";
document.getElementById("tab_jd_a_ts_tab1").style.bottom = "0px";
document.getElementById("tab_jd_a_ts_tab3").style.bottom = "0px";
document.getElementById("tab_jd_a_ts_tab2").style.position = "relative";
document.getElementById("tab_jd_a_ts_tab1").style.backgroundColor = "#dddddd";
document.getElementById("tab_jd_a_ts_tab3").style.backgroundColor = "#FFFFFF";
document.getElementById("tab_jd_a_ts_tab2").style.padding = "10px 12px 3px 13px";
}
function tab_jd_ts_tab3() {
tab_jd_ts_hide_divs();
document.getElementById("tab_jd_div_ts3").style.display = "block";
document.getElementById("jd_a_ts1").style.color = "#000000";
document.getElementById("tab_jd_a_ts_tab3").style.backgroundColor = "#FFFFFF";
document.getElementById("tab_jd_a_ts_tab1").style.backgroundColor = "#ffffff";
document.getElementById("tab_jd_a_ts_tab2").style.backgroundColor = "#ffffff";
document.getElementById("tab_jd_a_ts_tab3").style.borderColor = "#FFFFFF";
document.getElementById("tab_jd_a_ts_tab3").style.position = "relative";
document.getElementById("tab_jd_a_ts_tab3").style.bottom = "-1px";
document.getElementById("tab_jd_a_ts_tab1").style.bottom = "0px";
document.getElementById("tab_jd_a_ts_tab2").style.bottom = "0px";
document.getElementById("tab_jd_a_ts_tab3").style.padding = "0";
}
function tab_jd_ts_hide_divs() {
document.getElementById("tab_jd_div_ts1").style.display = "none";
document.getElementById("jd_a_ts").style.color = "#333333";
document.getElementById("tab_jd_a_ts_tab1").style.backgroundColor = "#ffffff";
document.getElementById("tab_jd_a_ts_tab1").style.borderColor = "#b3b3b3";
document.getElementById("tab_jd_a_ts_tab1").style.padding = "10px 12px 3px 13px";
document.getElementById("tab_jd_div_ts2").style.display = "none";
document.getElementById("jd_a_ts1").style.color = "#dddddd";

document.getElementById("tab_jd_a_ts_tab1").style.backgroundColor = "#ffffff";
document.getElementById("tab_jd_a_ts_tab2").style.borderColor = "#b3b3b3";
document.getElementById("tab_jd_a_ts_tab2").style.padding = "10px 12px 3px 13px";
document.getElementById("tab_jd_div_ts3").style.display = "none";
document.getElementById("jd_a_ts1").style.color = "#000000";
document.getElementById("tab_jd_a_ts_tab1").style.backgroundColor = "#ffffff";
document.getElementById("tab_jd_a_ts_tab3").style.borderColor = "#ffffff";
document.getElementById("tab_jd_a_ts_tab3").style.padding = "10px 12px 3px 13px";
}
