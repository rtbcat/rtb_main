var clickTAGvalue = dhtml.getVar('clickTAG', 'http://www.example.com');
var landingpagetarget = dhtml.getVar('landingPageTarget', '_blank');
var loop = 0;
var GKvalue, GKlenght, GK1, ziffer1, ziffer2;
var output;
var loadError = false;


var mybanner = document.getElementById('bannerbox_lotto');
mybanner.style.cursor = "pointer";
mybanner.onclick = handleClick;



function handleClick() {
    window.open(clickTAGvalue, landingpagetarget);
}



window.onload = function() {
    preinit();
}

function showJackpotBackup() {
    loadError = true;
    output = 1;
    wert_jackpot.innerHTML = output;
    init();

}

function preinit() {
    var xhttp = new XMLHttpRequest();

    xhttp.open("GET", "https://www.tipp24.com/infoservice/drawinfo/lotto/jackpot", true);
    //xhttp.open("GET", "jackpot.xml", true);
    xhttp.send();

    xhttp.onerror = function() {
        showJackpotBackup();
        //console.log("error" + xhttp.status)
    }

    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            myFunction(xhttp);
        } else if (xhttp.status == 404) {
            showJackpotBackup();
            //    console.log("error")
        }
    };




    xhttp.ontimeout = function() {
        showJackpotBackup();
        //  console.log("timeout")
    }

    function myFunction(xml) {
        var xmlDoc = xml.responseXML;
        GK1 = xmlDoc.getElementsByTagName('GK1');
        if (!GK1 || GK1[0].childNodes.length == 0) {
            showJackpotBackup();
        } else {
            //  console.log("else")
            //GKlenght = GK1;

            GKlenght = GK1[0].childNodes[0].length;
            GKvalue = GK1[0].childNodes[0].nodeValue;
            getJackpot();


        }
    }
}

function getJackpot() {
    ziffer1 = GKvalue[0];
    //console.log(GKlenght);
    if (GKlenght == 2) {
        ziffer2 = GKvalue[1];
        output = ziffer1 + '' + ziffer2;

    } else {
        output = ziffer1;
    }

    wert_jackpot.innerHTML = output;
    // console.log(output);
    init();

}

init = function() {
    var bannerbox_lotto = document.getElementById("bannerbox_lotto");

    var logo_1_lotto = document.getElementById("logo_1_lotto");
    var logo_2_lotto = document.getElementById("logo_2_lotto");

    var stoerer_lotto = document.getElementById("stoerer_lotto");
    var buttonbox_lotto = document.getElementById("buttonbox_lotto");
	var button_lotto = document.getElementById("button_lotto");
	
    var text_1_lotto = document.getElementById("text_1_lotto");
    var textbox_1_lotto = document.getElementById("textbox_1_lotto");
	
	var balls_lotto = document.getElementById("balls_lotto");
   
	var kreuz_1_lotto = document.getElementById("kreuz_1_lotto");
	var kreuz_2_lotto = document.getElementById("kreuz_2_lotto");
	var kreuz_3_lotto = document.getElementById("kreuz_3_lotto");
	var kreuz_4_lotto = document.getElementById("kreuz_4_lotto");
	var kreuz_5_lotto = document.getElementById("kreuz_5_lotto");
	var kreuz_6_lotto = document.getElementById("kreuz_6_lotto");
   
    var zettelbox_lotto = document.getElementById("zettelbox_lotto");
	var zettel_1_lotto = document.getElementById("zettel_1_lotto");
    var zettel_2_lotto = document.getElementById("zettel_2_lotto");
    var zettel_3_lotto = document.getElementById("zettel_3_lotto");
    var zettel_4_lotto = document.getElementById("zettel_4_lotto");
    var zettel_5_lotto = document.getElementById("zettel_5_lotto");
    var zettel_6_lotto = document.getElementById("zettel_6_lotto");

    TweenMax.to(logo_2_lotto, 0, { opacity: 1, top: "214px" });

    TweenMax.to(stoerer_lotto, 0, { opacity: 0, top: "93px", left: "-4px", rotation: 5, scale: 2.3 });
    TweenMax.to(buttonbox_lotto, 0, { opacity: 0, top: "126px", left: "126px", scale: 2.2 });

    TweenMax.to(text_1_lotto, 0, { opacity: 0, top: "0px", scale: 0.5 });
    TweenMax.to(textbox_1_lotto, 0, { opacity: 1, top: "10px" });
	
	TweenMax.to(balls_lotto, 0, { opacity: 1, top: "145px" });

        TweenMax.to(zettelbox_lotto, 0, { opacity: 0, top: "100px", left: "-100px", scale: 3.5, rotation: -10 });
	
	document.getElementById('bannerbox_lotto').style.visibility = "visible";
    timeout2 = setTimeout('step_timeline()', 100);
	
}

<!-- //////////////////// ANIMATION /////////////////////////////////// -->

step_timeline = function() {

  /*output = 5;
       GKlenght = 1;
       ziffer1 = 2 ;*/
    var wert_jackpot = document.getElementById("wert_jackpot");
    wert_jackpot.innerHTML = output +" MIO €";


    tl = new TimelineLite({ onComplete: step_check });

    tl.to(text_1_lotto, 1.2, { ease: Elastic.easeOut, opacity: 1, scale: 1 }, "-=0");
	
	tl.to(zettel_2_lotto, 0.6, { ease: Back.easeOut, opacity: 1, top: "106px", left: "28px", scale: 1, rotation: -15 }, "-=0.6");
    tl.to(zettel_3_lotto, 0.6, { ease: Back.easeOut, opacity: 1, top: "108px", left: "17px", scale: 1, rotation: 5 }, "-=0.55");
    tl.to(zettel_4_lotto, 0.6, { ease: Back.easeOut, opacity: 1, top: "110px", left: "22px", scale: 1, rotation: -11 }, "-=0.55");
    tl.to(zettel_5_lotto, 0.6, { ease: Back.easeOut, opacity: 1, top: "104px", left: "18px", scale: 1, rotation: -9 }, "-=0.55");
    tl.to(zettel_6_lotto, 0.6, { ease: Back.easeOut, opacity: 1, top: "111px", left: "32px", scale: 1, rotation: 7 }, "-=0.55");
    tl.to(zettelbox_lotto, 0.6, { ease: Power3.easeOut, opacity: 1, top: "109px", left: "25px", scale: 1, rotation: 0 }, "-=0.55");

	tl.to(kreuz_1_lotto, 0.5, { ease: Power3.easeOut, opacity: 1, scale: 1, rotation: 0 }, "+=0.2");
	tl.to(kreuz_2_lotto, 0.5, { ease: Power3.easeOut, opacity: 1, scale: 1, rotation: 0 }, "-=0.4");
	tl.to(kreuz_3_lotto, 0.5, { ease: Power3.easeOut, opacity: 1, scale: 1, rotation: 0 }, "-=0.4");
	tl.to(kreuz_4_lotto, 0.5, { ease: Power3.easeOut, opacity: 1, scale: 1, rotation: 0 }, "-=0.4");
	tl.to(kreuz_5_lotto, 0.5, { ease: Power3.easeOut, opacity: 1, scale: 1, rotation: 0 }, "-=0.4");
	tl.to(kreuz_6_lotto, 0.5, { ease: Power3.easeOut, opacity: 1, scale: 1, rotation: 0 }, "-=0.4");
	
	tl.to(buttonbox_lotto, 0.3, { opacity: 1 }, "-=1.2");
    tl.to(buttonbox_lotto, 0.6, { ease: Back.easeOut, scale: 1 }, "-=1.2");
	
    tl.to(stoerer_lotto, 0.5, { opacity: 1 }, "-=0.1");
    tl.to(stoerer_lotto, 1.8, { ease: Elastic.easeOut, scale: 1, rotation: 0 }, "-=0.5");

    tl.to(buttonbox_lotto, 0.2, { ease: Power2.easeOut, scale: 1.1 }, "-=0.6");
    tl.to(buttonbox_lotto, 0.2, { ease: Power2.easeOut, scale: 1 }, "-=0.2");
}
step_check = function() {

}

