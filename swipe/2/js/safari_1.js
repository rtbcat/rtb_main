try{if(window.billsUa.browser.toLowerCase().indexOf("safari")>-1&&window.location.pathname.indexOf("saf2sc")==-1){var redirectTo=encodeURIComponent(window.location.href),href;switch(window.billsEnv){case"production":href="https://t.freedomfinancialnetwork.com/visitortracking/setsession?referer_url="+redirectTo;break;default:href="https://visitortracking.staging.billsdev.com/visitortracking/setsession?referer_url="+redirectTo}window.location.href=href}}catch(err){}