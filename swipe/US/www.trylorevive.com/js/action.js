// function PopIt() { 
//   var popover = document.getElementById('popover');
    
//     popover.style.display = 'block';

//     return "Are you sure you want to leave?"; 
//   }

 function UnPopIt()  {} 

 $(document).ready(function() {

   //window.onbeforeunload = PopIt;
   //$("input[type=submit] , a").click(function(){ window.onbeforeunload = UnPopIt; });
 
  $.exitpop({
      predict_amt: 0.02,
      fps: 1000,
      popCount: 1,
      tolerance: {x: 10, y: 10},
      cta: "#form",
      callback: function() {
          $('#popover').fadeIn();
          $('#pop-box').css({
            'top' : 0,
            'opacity'  : 1
          })
      }
  });
});

    var spd = 100;
    var spdVal = 10;
    var cntDown = 5 * 60 * spdVal;
    setInterval(function () {
    var mn, sc, ms;
    cntDown--;
    if(cntDown < 0) {
    return false;
    }
    mn = Math.floor((cntDown / spdVal) / 60 );
    mn = (mn < 10 ? '0' + mn : mn);
    sc = Math.floor((cntDown / spdVal) % 60);
    sc = (sc < 10 ? '0' + sc : sc);
    ms = Math.floor(cntDown % spdVal);
    ms = (ms < 10 ? '0' + ms : ms);
    var result = mn + ':' + sc ;
  
  try{
    document.getElementById('stopwatch').innerHTML = result;
  }catch(e){
    
    }
  
    }, spd);
  

    
       $(window).on('load', function(){
         $('#reminder').delay(3350).animate({
          'bottom': -14
        });
        $('#reminder p').delay(3800).animate({
          'opacity': 1  
        });
    });
  