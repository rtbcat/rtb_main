






<!DOCTYPE html>
<html lang="en">
      <head>
  <script>
    // usmf-django
function getScript(t,e){var n=document,a="script",o=n.createElement(a),r=n.getElementsByTagName(a)[0];n.async="async",o.src="//"+t,e&&(o.readyState?o.onreadystatechange=function(){"loaded"!=o.readyState&&"complete"!=o.readyState||(o.onreadystatechange=null,e())}:o.addEventListener("load",function(t){e(null,t)},!1)),r.parentNode.insertBefore(o,r)}window.top!=window&&(window.analytics=window.top.analytics,window.inIframe=!0);var segmentKey="16mdwrvy5p",segmentUrl=("https:"===document.location.protocol?"https://":"http://")+"cdn.segment.com/analytics.js/v1/"+segmentKey+"/analytics.min.js",infotrackUrl="//g.foolcdn.com/mms/resources/js/infotrack_min.js",trackerMaker=function(t){var e=[];e.invoked=!1,e.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","page","once","off","on"],t&&(e.methods=e.methods.concat(t));var n=function(t){var n=function(){var n=Array.prototype.slice.call(arguments,0),a=[t].concat(n);e.push(a)};return n.stub=!0,n},a=function(){for(var t=0;t<e.methods.length;t++){var a=e.methods[t];e[a]=n(a)}},o=function(t){if(e.invoked)return void(window.console&&console.error&&console.error("Tracking snippet included twice."));var n=document.createElement("script");n.type="text/javascript",n.async=!0,n.src=t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(n,a),e.invoked=!0};return a(),e.load=o,e},analytics=window.analytics=window.analytics||trackerMaker();analytics.initialize||(analytics.SNIPPET_VERSION="3.1.0",analytics.load(segmentUrl));var Infotrack=window.Infotrack=window.Infotrack||trackerMaker(["initialize"]);getScript("//www.fool.com/common/js/marketing/infocookie.js",function(){Infotrack.load(infotrackUrl)});
  </script>
  <meta name="infotrackSnippetVersion" content="2.1.0" data-tracker-key="infotrackSnippetVersion">

        

    
        <script type="text/javascript" src="jstag"></script>
    

    

    

    
    
    <script type="text/javascript">
        var googletag = googletag || {}; googletag.cmd = googletag.cmd || [];
        googletag.cmd.push(function() { googletag.setAdIframeTitle("Advertisement"); });
        
        var PREBID_TIMEOUT = 1000;
        var adUnits = []; window.pbjs_winners = []; window.pbjs_timeouts = [];
        var pbjs = pbjs || {};
        var slots = slots || {};
        pbjs.que = pbjs.que || [];
        pbjs.que.push(function() { pbjs.setPriceGranularity("auto"); pbjs.aliasBidder('appnexus', 'districtm'); });
        var adCount = 0;
    </script>

    <!-- BEGIN Krux ControlTag for "Motley Fool" -->
        <script class="kxct" data-id="ral3af1zw" data-timing="async" data-version="3.0" type="text/javascript">
          window.Krux||((Krux=function(){Krux.q.push(arguments)}).q=[]);
          (function(){
            var k=document.createElement('script');k.type='text/javascript';k.async=true;
            k.src=(location.protocol==='https:'?'https:':'http:')+'//cdn.krxd.net/controltag/ral3af1zw.js';
            var s=document.getElementsByTagName('script')[0];s.parentNode.insertBefore(k,s);
          }());
        </script>
        <script class="kxint" type="text/javascript">
          window.Krux||((Krux=function(){Krux.q.push(arguments);}).q=[]);
          (function(){
            function retrieve(n){
              var m, k='kxfool_'+n,ls=(function(){
                  try{
                    return window.localStorage;
                  }catch(e){
                    return null;
                  }
                })();
              if (ls) {
                  return ls[k] || "";
              } else if (navigator.cookieEnabled) {
                  m = document.cookie.match(k+'=([^;]*)');
                  return (m && unescape(m[1])) || "";
              } else {
                  return '';
              }
            }

            Krux.user = retrieve('user');
            Krux.segments = retrieve('segs') ? retrieve('segs').split(',') : [];
          })();
        </script>
        <!-- END Krux ControlTag -->

    

    





        

        
         <script>
            
            var reportBids = function() {
                if (typeof(window.bidsReported) !== "undefined" && window.bidsReported) {
                    return;
                }

                try {
                    window.bidsReported = true;

                    !function(a,b){a("Keen","//d26b395fwzu5fz.cloudfront.net/3.1.0/keen-tracker.min.js",b)}(function(a,b,c){var d,e,f;c["_"+a]={},c[a]=function(b){c["_"+a].clients=c["_"+a].clients||{},c["_"+a].clients[b.projectId]=this,this._config=b},c[a].ready=function(b){c["_"+a].ready=c["_"+a].ready||[],c["_"+a].ready.push(b)},d=["addEvent","setGlobalProperties","trackExternalLink","on"];for(var g=0;g<d.length;g++){var h=d[g],i=function(a){return function(){return this["_"+a]=this["_"+a]||[],this["_"+a].push(arguments),this}};c[a].prototype[h]=i(h)}e=document.createElement("script"),e.async=!0,e.src=b,f=document.getElementsByTagName("script")[0],f.parentNode.insertBefore(e,f)},this);

                    var hbDataClient = new Keen({
                      projectId: '578ff90007271912cc115dbb',
                      writeKey: 'e63f7259e1605c47a60fe106e018d95a0a22c2ae36d0de1e99f09a39eb44dacea279e790e9dac1d69d3283be2ef06304157fec53ffb601c927fd469699c4aa107c498c18caed6ed94c034f3dd73f46bc7b957d4741efc0244c57c4a1dfa2589a'
                    });

                    function findPbjsBidFromUnitVendor(unit, bidder) {
                        for (var i in pbjs._bidsReceived) {
                            var bid = pbjs._bidsReceived[i];
                            if (bid.adUnitCode == unit && bid.bidderCode == bidder) {
                            return bid;
                            }
                        }
                        return false;
                    }

                    var preBidAdvertiserId = 88391858;
                    var houseAdId = 71717858;
                    var rubiconAdId = 86986298;
                    var oxAdId = 89642498;
                    var winners = {'prebid': 0, 'house': 0, 'rubiconRemnant': 0,
                                    'openx': 0, 'adX': 0, 'directSold': 0, 'failure': 0};
                    var slotResults = {};

                    Object.keys(slots).forEach(function(key) {
                        if (key.indexOf('button') > -1) {
                            return;
                        }

                        var slot = slots[key];
                        var adSiteZone = slot.G;
                        var keySplit = key.split('-');
                        var unit = keySplit.splice(0, keySplit.length - 1).join('-');

                        if (typeof(slot.getResponseInformation) !== "undefined") {
                            var slotResult = {
                                'unit': unit,
                                'winningAdType': 'failure',
                            };
                            winners['failure'] = winners['failure'] + 1;
                            slotResults[unit] = slotResult;
                            return;
                        }

                        var winningAd = slot.getResponseInformation();
                        var lineItemId = winningAd.lineItemId;
                        var advertiserId = winningAd.advertiserId;
                        var adType = 'prebid';

                        if (advertiserId == preBidAdvertiserId) {
                            adType = 'prebid';
                        } else if (advertiserId == houseAdId) {
                            adType = 'house';
                        } else if (advertiserId == rubiconAdId) {
                            adType = 'rubiconRemnant';
                        } else if (advertiserId == oxAdId) {
                            adType = 'openx';
                        } else if (lineItemId == null || advertiserId == null) {
                            adType = 'adX';
                        } else {
                            adType = 'directSold';
                        }

                        var pbjsResults = pbjs.getAdserverTargetingForAdUnitCode(key);
                        var hb_pb = (pbjsResults['hb_pb'] / 1);
                        if (isNaN(hb_pb)) {
                            hb_pb = -1;
                        }
                        var hb_bidder = pbjsResults['hb_bidder'];

                        var pbjsBid = findPbjsBidFromUnitVendor(key, hb_bidder);
                        var timeToRespond = pbjsBid.timeToRespond;

                        var slotResult = {
                            'unit': unit,
                            'winningAdType': adType,
                            'winningLineItemId': lineItemId,
                            'winningAdvertiserId': advertiserId,
                            'hb_pb': hb_pb, 'hb_bidder': hb_bidder,
                            'hb_responseTime': timeToRespond,
                        };

                        winners[adType] = winners[adType] + 1;
                        slotResults[unit] = slotResult;
                    });

                    var bidData = {};
                    for (var i in pbjs._bidsReceived) {
                        var response = pbjs._bidsReceived[i];
                        var unit = response.adUnitCode;
                        var split = unit.split('-');
                        unit = split.splice(0, split.length - 1).join('-');

                        bidData[response.bidder] = bidData[response.bidder] || {};
                        var bidCpm = (response.cpm.toFixed(2) / 1);
                        bidData[response.bidder][unit] = {'cpm': bidCpm, 'timeToRespond': response.timeToRespond}
                    }

                    slotResults['bids'] = bidData;
                    slotResults['winners'] = winners;
                    if (window.location.host == "www.fool.com") {
                        hbDataClient.addEvent("adResults", slotResults);
                    } else {
                        console.dir(slotResults);
                    }
                }  catch(err) {
                    if (window.location.host != "www.fool.com") {
                        console.dir(err);
                    }
                }
            };

            pbjs.que.push(function() {
                pbjs.addCallback('allRequestedBidsBack', function() {
                    if (typeof(window.bidsReported) === "undefined") {
                        setTimeout(function(){ reportBids(); }, 8000);
                    }
                });
                pbjs.addAdUnits(adUnits);
                pbjs.requestBids({
                    bidsBackHandler: sendAdserverRequest
                });
            });

            var adsRefresh = function(adSlots) {
                pbjs.que.push(function() {
                    pbjs.requestBids({
                        timeout: PREBID_TIMEOUT,
                        bidsBackHandler: function() {
                            var targetingIds = [];
                            for (var i in adSlots) {
                                var adSlot = adSlots[i];
                                targetingIds.push(adSlot.code);
                            }

                            var newAdSlots = [];

                            Object.keys(slots).forEach(function(key) {
                                if (targetingIds.indexOf(key) > -1) {
                                    newAdSlots.push(slots[key]);
                                }
                            });

                            googletag.pubads().updateCorrelator();
                            pbjs.setTargetingForGPTAsync(targetingIds);
                            googletag.pubads().refresh(newAdSlots);

                        }
                    });
                });
            };

            var postEndlessScrollArticleAdded = function() {
                pbjs.que.push(function() {
                    var scrollingAdUnits = window.scrollingAdUnits || [];
                    pbjs.addAdUnits(scrollingAdUnits);
                    adsRefresh(scrollingAdUnits);
                    window.scrollingAdUnits = [];
                });
            };

            function sendAdserverRequest(bidResponses) {
                window.pbjs_bidResponses = bidResponses;
                if (pbjs.adserverRequestSent) return;
                pbjs.adserverRequestSent = true;
                googletag.cmd.push(function() {
                    pbjs.que.push(function() {
                        pbjs.setTargetingForGPTAsync();
                        googletag.pubads().refresh();
                    });
                });
            }
            
        </script>
    <script async="async" src="js/gpt.js"></script>

        
    <script type="text/javascript">
        
            googletag.cmd.push(function() {
                if (typeof(Krux) !== "undefined") {
                    googletag.pubads().setTargeting("ksg", Krux.segments);
                    googletag.pubads().setTargeting("kuid", Krux.user);
                }
                googletag.pubads().setTargeting('test_bucket', '44')
                googletag.pubads().setTargeting('bureau', 'None')
                googletag.pubads().setTargeting('collection', 'None')
                googletag.pubads().setTargeting('headline', '')
                googletag.pubads().setTargeting('tickers', [""])
                googletag.pubads().setTargeting('adtags', [])
                googletag.pubads().setTargeting('sessionCount', '1')
                googletag.pubads().setTargeting('tenOrMoreSessions', 'False')
                googletag.pubads().setTargeting('services', [])
                googletag.pubads().setTargeting('uid', '');
            });
        
    </script>


        
     <script>
        googletag.cmd.push(function() {
            

            googletag.pubads().enableSingleRequest();
            googletag.enableServices();

            pbjs.que.push(function() {
                pbjs.onEvent('bidWon', function(arguments) {
                    for (var i = 0; i < pbjs._bidsReceived.length; i++) {
                        var bid = pbjs._bidsReceived[i];
                        if (bid.adId == arguments.adId) {
                            bid.winner = true;
                            bid.timeout = false;
                            var unit = arguments.adUnitCode
                            var split = unit.split('-');
                            unit = split.splice(0, split.length - 1).join('-');
                            window.pbjs_winners.push({'bidderCode': arguments.bidderCode, 'unit': unit, 'bid': arguments.cpm});
                        }
                    }
                });
                pbjs.onEvent('bidTimeout', function(arguments) {
                    for (var i = 0; i < pbjs._bidsReceived.length; i++) {
                        var bid = pbjs._bidsReceived[i];
                        if (bid.adId == arguments.adId) {
                            bid.winner = false;
                            bid.timeout = true;
                            var unit = arguments.adUnitCode
                            var split = unit.split('-');
                            unit = split.splice(0, split.length - 1).join('-');
                            window.pbjs_timeouts.push({'bidderCode': arguments.bidderCode, 'unit': unit});
                        }
                    }
                });
            });
        });
    </script>

        <!-- Favicon -->
        
        <link rel="shortcut icon" href="favicon.13af4883f3a3.ico">
        <link rel="apple-touch-icon" href="images/apple-touch-icon.91bb1b01ecea.png">
        
        
    
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">


            
            <meta name="description" content="The Motley Fool provides leading insight and analysis about stocks, helping investors stay informed.">

            <!-- Schema.org markup for Google+ -->
            <meta itemprop="name" content="The Motley Fool">
            <meta itemprop="description" content="The Motley Fool provides leading insight and analysis about stocks, helping investors stay informed.">
            <meta itemprop="image" content="https://g.foolcdn.com/assets/images/fool/tmf-logo.png">

            <!-- Twitter Card data -->
            <meta name="twitter:site" content="@themotleyfool">
            <meta name="twitter:title" content="The Motley Fool">
            <meta name="twitter:description" content="The Motley Fool provides leading insight and analysis about stocks, helping investors stay informed.">

            <!-- Open Graph data -->
            <meta property="og:title" content="The Motley Fool">
            <meta property="og:url" content="https://www.fool.com/legal/stuff-we-own.aspx">
            <meta property="og:description" content="The Motley Fool provides leading insight and analysis about stocks, helping investors stay informed.">
            

            <meta property="og:site_name" content="The Motley Fool">
            <meta property="fb:app_id" content="50808187550">

        
    <meta name="msvalidate.01" content="8D40D58712924715BAA79D135A6C8DDA">
    <meta name="uqs" content="-1" data-tracker-key="uqs">
    <script>
        var dataLayer = dataLayer || [];
    </script>
    






        <title>
            
                The Motley Fool
            
        </title>

        
	<link href="css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <link href="css/css.css" rel="stylesheet" type="text/css">

    <link rel="stylesheet" href="css/0e8e20e8428d.css" type="text/css">


        
    
            <script type="text/javascript" src="js/9620d7a394d9.js"></script>
            <!-- Fool Project settings   -->
            <script type="text/javascript">
                var value = 'dubs';
                var is_classic = false;
                var premium_id = 'None';
                window.settings = window.settings || {};
                // API root path from settings
                window.settings.apiRootPath = '';
                // segmentIO key
                window.settings.segmentIOkey = '';
                
                window.settings.uid = 0;
                window.settings.username = '0';
                
                window.settings.isNewOneUser = 'False' === 'True';
            </script>
        
    <script type="text/javascript">
        (function (d, t) {
          var bh = d.createElement(t), s = d.getElementsByTagName(t)[0];
          bh.type = 'text/javascript';
          bh.src = 'https://www.bugherd.com/sidebarv2.js?apikey=zofkq1dbswlaautxkf2hzq';
          s.parentNode.insertBefore(bh, s);
          })(document, 'script');
    </script>

        

        
        
    </head>


    <body class="fool yolo">
    <!-- maintenance_banner -->



    <script>
        var infotronStubMaker = function(methods)  {
            var stubQueue = [];
            stubQueue.invoked = false;
            stubQueue.methods = methods;

            var addToMethodQueue = function(method)  {
                var func = function() {
                    var args = Array.prototype.slice.call(arguments, 0);
                    var newArgs = [method].concat(args);
                    stubQueue.push(newArgs);
                };
                func.stub = true;
                return func;
            };
            var generateMethods = function()  {
                for (var i=0; i < stubQueue.methods.length; i++)  {
                    var key = stubQueue.methods[i];
                    stubQueue[key] = addToMethodQueue(key);
                }
            };
            var loadTracker = function(scriptUrl)  {
                if (stubQueue.invoked)  {
                    if (window.console && console.error)  {
                        console.error('Queue snippet included twice.');
                    }
                    return;
                }
                var trackerScript = document.createElement('script');
                trackerScript.type = 'text/javascript';
                trackerScript.async = true;
                trackerScript.src = scriptUrl;
                var firstScript = document.getElementsByTagName('script')[0];
                firstScript.parentNode.insertBefore(trackerScript, firstScript);
                stubQueue.invoked = true;
            };
            generateMethods();
            stubQueue.load = loadTracker;
            return stubQueue;
        };

        var PitchEngine = infotronStubMaker([
                'initialize',
                'get',
                'pitcherDone',
                'placeInPage',
                'pitcherError',
                'RegisterQueue',
                'UnRegisterQueue'
            ]);
        var PitcherAds = infotronStubMaker(
                ['get', 'OnDomReady', 'PlaceAdInPage', 'makeDFPAd', 'RegisterQueue', 'UnRegisterQueue']
        );
        PitchEngine.load('//j.foolcdn.com/common/js/infotron-async.min.js');
    </script>



    <!-- Main Container wrapping the whole page -->
    <div class="main-container">


        <!-- The Universal Fool Top Hat black bar -->
        
    

    
        <div class="fool-tophat-container">
            





<div class="fool-tophat-container">
 <div class="fool-tophat" data-tabbable-selector="ul.dropMenu,#logOut a">
    <div id="tophatWrap">

        <!-- Aligned Left -->
        <div id="navigation" class="fool-tophat-left" role="menubar">
            <a class="skip-main" href="#main-content" target="_self">Skip to main content</a>

            <!--  Country Dropdown -->
            <ul id="countries-dropdown" class="dropMenu site-nav-hide">

                 



	<li class="topLevel countryIcon">
	    <a href="index_5.html" class="dropdown-toggle country-select-item" type="button" id="dropdownMenuCountries" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span class="fa fa-globe"><span class="globe-text">The Motley Fool</span></span><span class="caret"></span></a>
	    <ul class="country-select dropdown-menu" aria-labelledby="dropdownMenuCountries">
	        <li role="menuitem" aria-setsize="8" aria-posinset="1">
	            <a class="us" href="index_5.html">Fool.com</a>
	        </li>
	        <li role="menuitem" aria-setsize="8" aria-posinset="2">
	            <a class="uk" href="index_7.html">Fool.co.uk</a>
	        </li>
	        <li role="menuitem" aria-setsize="8" aria-posinset="3">
	            <a class="au" href="index_4.html">Fool.com.au</a>
	        </li>
	        <li role="menuitem" aria-setsize="8" aria-posinset="4">
	            <a class="ca" href="index_3.html">Fool.ca</a>
	        </li>
	        <li role="menuitem" aria-setsize="8" aria-posinset="5">
	            <a class="sg" href="index_2.html">Fool.sg</a>
	        </li>
	        <li role="menuitem" aria-setsize="8" aria-posinset="6">
	            <a class="de" href="index_1.html">Fool.de</a>
	        </li>
	    </ul>
	</li>



            </ul>

            
            <div id="tophat-motto">
                Helping the world invest better since 1993.
            </div>
            
        </div>


        <!-- Aligned Right -->
        <div id="userTools" class="fool-tophat-right">

            <!-- My Fool -->
            
                <span id="myFool" style="width:100px"><li>Hi, Fool!</li></span>
            

            <!-- Premium Services -->
            
            <ul id="premium" style="width:140px">
                <li class="topLevel">
                    <a href="index_5.html#services-section" aria-haspopup="true">
                    Premium Advice</a>
                </li>
            </ul>
            

            <!-- Help -->
            <ul id="Help" class="dropMenu">
                <li class="topLevel">
                    <a href="javascript:void(0)" class="select" aria-haspopup="true">
                    Help</a>

                    <ul aria-label="Help" class="site-nav-hide">

                        



    

            <li><i class="fa fa-info-circle icon-help"></i> <a href="answers.html" class="last">Fool Answers</a></li>

            <li><i class="fa fa-envelope"></i> <a href="contact-customer-service.html" class="last">Contact Us</a></li>

            


    





                    </ul>
                </li>
            </ul>        

            



	
    <span name="logIn" id="logIn" class="top-hat-element">
        <a class="" href="login.aspx">Login</a>
    </span>
    



        </div>
    </div>
</div>
</div>
        </div>
        


        <!-- Mobile Nav ~ not needed for Fool, still used in Premium services ~GR 09/15 -->
        
        


        <!-- Page Grid Container sets max-width and centers for older Premium services ~GR 09/15-->
        
        <div class="page-grid-container">

            <!-- Nav section -->
            
                    
                        <header class="navigation" role="banner">
  <div class="navigation-wrapper">
    <a href="index_5.html" class="logo">
      <img src="images/fool-logo.png" alt="The Motley Fool">
    </a>
    <a href="javascript:void(0)" class="navigation-menu-button" id="js-mobile-menu"><i class="fa fa-bars"></i> MENU</a>
    <nav role="navigation">
      <ul id="js-navigation-menu" class="navigation-menu show">

        <!-- Services -->
        
            <li class="nav-link-stock-picks-li">
                <a id="nav-link-stock-picks" href="index_6.html#services-section" class="nav-link-stock-picks">Latest Stock Picks</a>
            </li>
        

        <!-- Stocks -->
        

        <!-- Investing -->
        <li class="nav-link more"><a href="javascript:void(0)">News</a>
          <ul class="submenu">
            <li><a href="investing-news.html">Investing News</a></li>
            
              <li><a href="podcasts.html">Fool Podcasts</a></li>
            
          </ul>
        </li>


        


       <!-- Guides -->
       <li class="nav-link more"><a href="javascript:void(0)">Guides</a>
          <ul class="submenu">
            <li><a href="index_5.aspx">How to Invest</a> </li>
            <li><a href="index_2.aspx">Retirement</a></li>
            <li><a href="index_3.aspx">Personal Finance</a></li>
            <li><a href="faq.html">Motley Fool Answers</a></li>
            <li><a href="options-a-foolish-introduction.aspx">Options Trading</a></li>
            <li><a href="index_1.aspx">Find a Broker</a></li>
            <li><a href="index.aspx">Compare IRA Accounts</a></li>
            <li><a href="index_4.aspx">ETF - Exchange Traded Funds</a></li>
          </ul>
        </li>

        <!-- Community -->
        <li class="nav-link more"><a href="javascript:void(0)">Community</a>
          <ul class="submenu">
            <li><a href="index_8.html">Discussion Boards</a>
            </li>
            <li><a href="https://caps.fool.com/index.aspx">CAPS</a>
            </li>
          </ul>
        </li>

        <!-- Personal Finance -->
        <li class="nav-link more"><a href="javascript:void(0)">More</a>
          <ul class="submenu">
            <li><a href="about-the-motley-fool.aspx">About</a></li>
            <li><a href="answers.html">Help</a></li>
            
          </ul>
        </li>

        
        <!-- TopHat links for Mobile  -->

        <!-- My Fool -->
        <li class="nav-link more top-hat-link my-nav"><a href="#">My Fool</a>
            <ul class="submenu">

                


    <li class="myOption myFool">
        <a href="login_2.aspx">My Fool</a>
    </li>
    <li class="myOption myProfile">
        <a href="login_4.aspx">My Profile</a>
    </li>
    <li class="myOption myWatchlist">
        <a href="Preview.html">My Watchlist</a>
    </li>
    <li class="myOption myScorecard">
        <a class="premiumLink" href="scorecard.html">My Scorecard</a>
    </li>
    <li class="myOption myBoards">
        <a href="login_3.aspx">My Boards</a>
    </li>
    <li class="myOption myCAPS">
        <a href="login_5.aspx">My CAPS</a>
    </li>
    <li class="myOption myUReports">
        <a href="login_2.aspx#my-reports">My Reports</a>
    </li>
    <li class="myOption mySubscriptions">
        <a href="login_2.aspx">My Subscriptions</a>
    </li>
    <li class="myOption mySettings">
        <a class="last" href="login_1.aspx">My Settings</a>
    </li>
 

            </ul>
        </li>

        <!-- Premium Services -->
        <li class="nav-link more top-hat-link services-nav"><a href="#">Premium Advice</a>
            <ul class="submenu">

            



    <li class="premiumOption infoSubhead">My Services</li>
    
    <li class="info">None</li>

    <li rv-hide="noInaccessibleServices" class="infoSubhead"><strong>Other Services</strong></li>
    
    <li class="info">None</li>




            </ul>
        </li>

        <!-- Help -->
        <li class="nav-link more top-hat-link help-nav"><a href="#">Help</a>
            <ul class="submenu">

            



    

            <li><i class="fa fa-info-circle icon-help"></i> <a href="answers.html" class="last">Fool Answers</a></li>

            <li><i class="fa fa-envelope"></i> <a href="contact-customer-service.html" class="last">Contact Us</a></li>

            


    





            </ul>
        </li>

        <!-- Login / Logout -->
        <li class="nav-link top-hat-link login-nav">

            



	
    <span name="logIn" id="logIn" class="top-hat-element">
        <a class="" href="login.aspx">Login</a>
    </span>
    



        </li>

      </ul>
    </nav>
    <div class="navigation-tools">
      <div class="search-bar">

        <div class="premium-header-lookup-container">
          

<form name="lookup" action="/fooldotcom/searchredirect/">
	<span class="fa fa-search search-icon" aria-hidden="true" title="Search"></span>
	<span class="sr-only">Search</span>
	<label for="fool-search" class="fool-search-label" style="display:none;">
	    Search:
	</label>
	<input name="query" label="search" id="fool-search" class="ticker-input-input" placeholder="Ticker or Keyword" role="search" aria-hidden="false" aria-haspopup="true" autocomplete="off">
    <input type="submit" class="sr-only" value="Go">
</form>


        </div>

      </div>
    </div> 
  </div>
</header>

                    

            


            <!-- Header & Nav section with default -->
            
            

            <!-- Content Container sets max-width and centers for themes with full bleed nav/footer/etc (Yolo, Precious)  ~GR 09/15-->
            <div class="content-container">

            <!-- Main Body section where individual apps reside -->
            

    <section class="main-content-section page-body full-width-article" id="article-page">
        <section id="main-content">
            
                <div class="endless-body">

                        <div class="main-col">
                            <!--placeholder-->
                            

                                <section class="usmf-new article-body">
                                    <span class="article-content">
                                        
    <h1 class="headline" id="Top">Stuff We Own (and Stuff We Don't...)</h1>
    <h3>Our Trademarks</h3>
    <p>The Motley Fool®, Fool®, "Jester" logo®, Foolish®, CAPS®, Fool.com®, Hidden Gems®, Rule Breakers®, Fool's School®, Rule Breaker®, Rule Maker®, FoolMart®, "Jester Cap" logo®, "Educate, Amuse, Enrich", Supernova, Stock Advisor, Rule Your Retirement, Income Investor, Champion Funds, Inside Value, Million Dollar Portfolio, Motley Fool Pro, Motley Fool Alpha, Motley Fool Big Short, Motley Fool Options, Motley Fool Special Ops, Motley Fool Take, Fool School, Dueling Fools, Foolanthropy, Fool Community, Fooldom, Fool Ratio, Fool's Rules, FoolWatch, Foolish 8, LBYM, "Living Below Your Means", My Fool, My Watchlist, My Scorecard, TMF, 10% Promise.</p>
    <h3>Our Patents</h3>
    <p>Some features of our site are patented under U.S. Patent No. 7,813,986, U.S. Patent No. 7,882,006, and U.S. Patent No. 9,537,807.</p>
    <h3>Our Work is Copyrighted</h3>
    <p>All of the writing in our area is the property of The Motley Fool, LLC. and is protected under copyright. None of the material may be reproduced without our written permission, with the exception of downloading or printing a single copy for yourself for offline viewing.</p>
    <p>This copyright extends from original Motley Fool material, to the raw compilations of posts in our stock folders, to the edited and filtered compilations of posts that we sell and distribute.</p>
    <p>The Motley Fool reserves the right to republish the material contributed by our readers. By posting a message, you expressly grant the right to The Motley Fool to republish or sell the message as part of our edited compilations or otherwise. We'll provide proper attribution to the author for any post we republish.</p>
    <h3 id="DMCA-Notice">Copyright Infringement</h3>
    <p>Contributors frequently share messages and articles that they have electronically copied from other sources. There are thousands of messages posted in our forum and sent via email through our systems, and there are millions of possible sources spread out across the Internet and offline world. We often don't know what an author is trying to say, let alone if it infringes a copyright.</p>
    <p>If you believe that your work has been copied in such a manner as to represent a copyright infringement, please notify <a href="mailto:jclarenbach@fool.com">Julie Clarenbach</a> so that the situation can be promptly addressed. Julie can be reached at:</p>
    <blockquote>
        <p>Copyright Agent<br>The Motley Fool, LLC.<br>2000 Duke St., Fourth Floor<br>Alexandria, VA 22314<br>(703) 838-3665 <br><a href="mailto:jclarenbach@fool.com">jclarenbach@fool.com</a></p>
    </blockquote>
    <p>In your notification, please provide Julie with the following information:</p>
    <ol>
        <li>An electronic or physical signature of the person authorized to act on behalf of the copyright owner</li>
        <li>A description of the copyrighted work that you claim has been infringed</li>
        <li>A description of where on our site the material is located</li>
        <li>Your address, telephone number and email address</li>
        <li>A statement by you that you have a good faith belief that the use is not authorized by the copyright owner, its agent or the law</li>
        <li>A statement by you, made under penalty of perjury, that the information in your Notice is accurate and that you're the copyright owner or authorized to act on behalf of the copyright owner.</li>
    </ol>
    <p><strong>Please read </strong>The Motley Fool's <a href="the-motley-fool-disclaimer.aspx">Disclaimer</a>. For more details on our Fool's Rules and Terms of Service, please read the <a href="the-motley-fools-rules.aspx">Fool's Rules</a>.</p>


                                    </span>

                                </section>
                            
                        </div>
                    </div>
                <div class="side-col article-page">
                    <section class="related-content">
                        <section class="read-more-section">
					            <h3>Legal</h3>
<ul>
<li><a href="contact-us.aspx" title="Contact Us">Contact Us</a></li>
<li><a href="fool-disclosure-policy.aspx" title="Fool Disclosure Policy">Fool Disclosure Policy</a></li>
<li><a href="privacy-statement.aspx" title="Privacy Statement">Privacy Statement</a></li>
<li><a href="stuff-we-own.aspx" title="Stuff We Own">Stuff We Own</a></li>
<li><a href="the-motley-fool-disclaimer.aspx" title="The Motley Fool Disclaimer">The Motley Fool Disclaimer</a></li>
<li><a href="the-motley-fools-rules.aspx" title="The Motley Fool's Rules">The Motley Fool's Rules</a></li>
</ul>
					        </section>
                    </section>
                </div>
                    <!-- new inserted-->
                </section></section></div>

            


        

	



            </div> <!-- ./ content-container -->

            <!-- Footer section -->
            
                    
                        <footer class="footer">
	<div class="legal-text footer-links">
	    <ul>
	        <li><a href="the-motley-fools-rules.aspx" title="Terms of Use">Terms of Use</a> </li>
	        <li><a href="privacy-statement.aspx" title="Privacy Policy">Privacy Policy</a> </li>
            <li><a href="accessibility-policy.aspx">Accessibility Policy</a></li>
	        <li><a href="stuff-we-own.aspx" class="" title="Copyright, Trademark and Patent Information">Copyright, Trademark and Patent Information</a> </li>
	        <li><a class="last" href="please-read-our-terms-and-conditions.aspx" title="Terms and Conditions">Terms and Conditions</a> </li>
	    </ul>
	    <p class="copyright">&copy; 1995 - 2017 The Motley Fool. All rights reserved.</p>
	</div>
</footer>

                    
            

        </div><!-- ./ page-grid-container -->
        

     <!-- ./ main-container -->
    <!-- Target for aria-describedby when link is active -->
    <div id="currently-active-desc" style="display:none;">Current</div>




    <script type="text/javascript" src="js/1a417aff08d4.js"></script>
<script type="text/javascript" src="js/d3954ad6f03e.js" defer></script>
<script type="text/javascript" src="js/7f4ec1099b0c.js"></script>





    <script>
        $(document).ready(function() {
            $('.skip-main').on('click', function() {
                var skipToElement = $(".main-skip-to");
                if (skipToElement.length) {
                    if (typeof skipToElement.attr("tabindex") === "undefined") {
                        skipToElement.attr("tabindex", "-1");
                    }
                    skipToElement.first().focus();
                    return false;
                }
                return true;
            });
        });
    </script>






        <script type="text/javascript" src="js/401d91632736.js" async></script>

    <!-- Outside of Compress cause something is breaking when compressed -->
    <script src="js/navigation.f92b2dce7611.js" async></script>
    <script src="js/parallax.188305327513.js" async></script>
    
        <link rel="stylesheet" type="text/css" href="css/release-catfish.css">

<script>
    var dataLayer = dataLayer || [];
    dataLayer.push({'dubsPage': 'True'});
</script>

<div id="InfotronFeederPitch" style="display:none"></div>


    <script type="text/javascript">
       $(document).ready(function () {
           if (typeof (window.infotronQueue) !== "undefined") {
               window.infotronQueue.Register('InfotronFeederPitch');
           }
           PitchEngine.initialize({
               site: 'fool',
               placement: 'feederfish',
               pitchContainer: 'InfotronFeederPitch'
           });
       });
    </script>

    

    <script>
        $(document).ready(function() {
            if (typeof(window.InfotronQueue) !== "undefined")
                window.InfotronQueue.EndOfPage('articlePageView');
        });
    </script>






  <script>
    if (typeof window.Infotrack !== "undefined")  {
        window.Infotrack.initialize("usmf");
    }
  </script>
  </body>

</html>