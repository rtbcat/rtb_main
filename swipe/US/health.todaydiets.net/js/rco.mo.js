/**
 JS CODE FOR MOBILE OPTIMIZATION.
 */

// MO MODULE
MO = {
    //1. COMMON
    common: {
        init: function () {
            // application-wide code
            popupStatus = 0;
            showZipField = 0;
        }
    },

    //2. DATA-CONTROLLER
    moController: {

        init: function () {
            // controller-wide code
            // get the cached date value from cookie
            var geo = (typeof $.cookie('geo') == 'undefined') ? null : JSON.parse($.cookie('geo'));
            if (geo != null) {
                //COOKIE PRESENT
                // Call updateLocation function, which will set the cookie as well as update the JSP/BEAN
                MOGeoDetails.geolocate.updateLocation({
                    zipCode: geo.zipcode,
                    city: geo.city,
                    state: geo.state,
                    lat: geo.lat,
                    long: geo.long,
                    country: geo.country
                });
            } else {
                //NO COOKIE PRESENT
                //Step1 :- Calling Function MOGeoDetails.geolocate.getProfileZip, which will try to set the cookie
                //Step2 :- If no data, prompt user to share location
                //Step3 :- If user accepts request, set the Geo cookie & update JSP with the new geolocation value
                //Step4 :- If user doesnot accepts share location, use Maxmind  to get data & set the Geo cookie, update JSP else use default data.
                MOGeoDetails.geolocate.getProfileZip();
            }
        },

        //3. DATA-ACTION
        moAction: function () {
            // action-specific code. Write any action specific code here.

//Removed AJAX call to populate events list from here

            $('input').keypress(function (e) {
                var code = (e.keyCode ? e.keyCode : e.which);
                if ((code == 13) || (code == 10)) {
                    if ($(this).attr('id') === 'findDriveZip') {
                        $('.findDrive.findDriveBtn').trigger('click');
                        return false;
                    }
                    if ($(this).attr('id') === 'searchQuery') {
                        return true;
                    } else {
                        $(this).closest('form').submit();
                        return false;
                    }
                }
            });

            $('.mobileEditZip').keypress(function (e) {
                if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
                    $(".moEditZipSubmit").click();
                }
            });

            $('#EditZip').keypress(function (e) {
                if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
                    $("#EditZipSubmit").click();
                }
            });

            $(".category-select-control").change(function () {
                var selectItemVal = $(this).find(":selected").val();
                //$(this).parent().nextAll().find("input.selectedCategoryIdValue:first").val(selectItemVal);
                $("#selectedCategoryUId").val(selectItemVal);
            });

            $(".findDrive").click(function () {
                var zipCodeVal = $(".searchZipCode").val();
                // if clientSideConfigValue not added use default value
                if (clientSideConfigValue == '') {
                    clientSideConfigValue = 'Please enter a valid ZIP code';
                }
                var zipError = $("#findDriveZipError");
                var findDrive = $("#findDriveZip");
                zipError.text(clientSideConfigValue);
                if (zipCodeVal == "") {
                    var url = emptyDriveSearchLink;
                } else {
                    var textFieldValue = zipCodeVal;
                    if (textFieldValue.length == 5 && $.isNumeric(textFieldValue)) {
                        zipError.css("display", "none");
                        findDrive.parent().removeClass('has-error');
                        findDrive.removeClass("error");
                        var url = zipDriveSearchLink + zipCodeVal;
                    } else {
                        zipError.css("display", "block");
                        findDrive.parent().addClass('has-error');
                        findDrive.addClass("error");
                        findDrive.focus();
                        return false;
                    }

                }
                $(location).attr('href', url);
            });
            //Added for RCOENT-516
            $("#findBloodDriveSearchButton").click(function (event) {
            	event.preventDefault();
                var zipCodeVal = $(".searchZipCode").val();
                // if clientSideConfigValue not added use default value
                if (clientSideConfigValue == '') {
                    clientSideConfigValue = 'Please enter a valid ZIP code';
                }
                var zipError = $("#findDriveGiveBloodErrorPlaceholder");
                var findDrive = $("#findDriveGiveBloodField");
                zipError.text(clientSideConfigValue);
                var url = "";
                if (zipCodeVal == "") {
                    url = $("#findDriveGiveBloodEmptyDriveSearchLink").val();
                } else {
                    var textFieldValue = zipCodeVal;
                    if (textFieldValue.length == 5 && $.isNumeric(textFieldValue)) {
                        zipError.css("display", "none");
                        findDrive.parent().removeClass('has-error');
                        findDrive.removeClass("error");
                        url = $("#findDriveGiveBloodZipDriveSearchLink").val() + zipCodeVal;
                    } else {
                        zipError.css("display", "block");
                        findDrive.parent().addClass('has-error');
                        findDrive.addClass("error");
                        findDrive.focus();
                        return false;
                    }

                }
                if (url != "") {
                	$(location).attr('href', url);
                }
                
            });

            $("#frmSignIn").validate({
                // validation rules
                rules: {
                    cons_email: {
                        required: true,
                        email: true
                    }
                },
                // validation error messages
                messages: {
                    cons_email: "Please enter a valid email address"
                },

                errorContainer: "#errorMessage",
                errorLabelContainer: "#errorMessage",

                submitHandler: function (form) {
                    form.submit();
                }
            });

            var elementEmailSignUp = $(".rcoFormSignIn");

            elementEmailSignUp.on('submit', function () {
                var form = $(this);

                form.removeClass('has-error');
                $(window).trigger('resize');
            });

            for (var i = 0; i < elementEmailSignUp.length; i++) {

                $(elementEmailSignUp[i]).find('#errMessageSignIn').addClass('errSigninContainer-' + i);

                $(elementEmailSignUp[i]).validate({
                    // validation rules
                    rules: {
                        cons_email: {
                            required: true,
                            email: true
                        }
                    },
                    // validation error messages

                    messages: {
                        cons_email: "Please enter a valid email address"
                    },

                    errorContainer: '.errSigninContainer-' + i,
                    errorLabelContainer: '.errSigninContainer-' + i,

                    highlight: function (element, errorClass, validClass) {
                        $(element).addClass(errorClass).removeClass(validClass);
                        $(window).trigger('resize');
                    },

                    unhighlight: function (element, errorClass, validClass) {
                        $(element).addClass(errorClass).removeClass(validClass);
                        $(window).trigger('resize');
                    },

                    submitHandler: function (form) {
                        form.submit();
                    }
                })
            }
            function checkSelect(elem) {
                var form = elem.closest('#moUpdateLocation');
                var errorLabel = form.find('#rcoClassCategorySelectError')
                if(elem[0].selectedOptions[0].disabled){
                    errorLabel.text('Please choose class category');
                    form.addClass('has-error-select');
                    return false;
                } else {
                    errorLabel.hide();
                    return true;
                }
            }
            $("#moUpdateLocation").validate({
                // validation rules
                rules: {
                    zipcode: {
                        required: true,
                        minlength: 5,
                        number: true
                    }
                },
                // validation error messages
                messages: {
                    zipcode: clientSideConfigValue
                },
                highlight: function (element, error) {
                    jQelement = $(element)
                    if (clientSideConfigValue === '') {
                        clientSideConfigValue = 'Please enter a valid ZIP code';
                    }
                    //console.log()
                    checkSelect( jQelement.closest('#moUpdateLocation').find('#rcoClassCategorySelect, #mo-class-category-select'))
                    var errorLabel = jQelement.parent().find('#moUpdateLocationError').text('');
                    var errorLabelserver = jQelement.parent().find('#rcoUiZipcodeError').text('');
                    jQelement.parent().addClass('has-error');
                    errorLabel.append(clientSideConfigValue).css('display', 'inline-block');
                    $(".rco-ui-validation-error-message").remove();
                },
                errorContainer: "#moUpdateLocationError",
                errorLabelContainer: "#moUpdateLocationError",

                submitHandler: function (form) {
                    var jQform = $(form);
                    if(!checkSelect(jQform.find('#rcoClassCategorySelect, #mo-class-category-select'))){
                        return false
                    }
                    form.submit();
                }
            });

            (function () {
                var clientSideConfigValue = 'Please enter a valid ZIP code';
                $("#searchChapterForm").validate({
                    // validation rules
                    rules: {
                        zipcode: {
                            required: true,
                            minlength: 5,
                            number: true
                        }
                    },
                    // validation error messages
                    messages: {
                        zipcode: clientSideConfigValue
                    },
                    highlight: function (element, error) {
                        var errorLabel = $(element).parent().find('#moUpdateLocationError').text('');
                        var errorLabelserver = $(element).parent().find('#rcoUiZipcodeError').text('');
                        $(element).parent().addClass('has-error');
                        errorLabel.append(clientSideConfigValue).css('display', 'inline-block');
                        $(".rco-ui-validation-error-message").remove();
                    },
                    errorContainer: "#zipcodeError",
                    errorLabelContainer: "#zipcodeError",

                    submitHandler: function (form) {
                        form.submit();
                    }
                });
            })();

            $(".moEditZipSubmit").click(function () {
                var moEditZipError = $(".moEditZipError"),
                    mobileEditZip = $(".mobileEditZip");
                var zpVal = $("nav.mobileEditZip").val();
                var zpVal = $('.rco-ui-navbar').find(".mobileEditZip").val();
                var zipRegex = /^\d{5}$/;
                if (!zipRegex.test(zpVal)) {
                    moEditZipError.html("<br>" + clientSideConfigValue);
                    mobileEditZip.addClass("errorBorder");
                    //console.log("client side validation");
                } else {
                    //console.log("Inside server side validation");
                    moEditZipError.html("");
                    $.ajax({
                        type: "POST",
                        url: "/jspf/modules/header/mo/checkZipCode.jsp",
                        data: ({zipCode: zpVal}),
                        complete: function (request, status) {
                            if (status == "success") {
                                var jsonObject = $.trim(request.responseText);
                                //console.log(jsonObject);
                                if (jsonObject == "true") {
                                    //console.log("inside true");
                                    mobileEditZip.removeClass("errorBorder");
                                    document.location.reload();
                                } else {
                                    //console.log("inside false");
                                    moEditZipError.html("<br>" + serverSideConfigValue);
                                    mobileEditZip.addClass("errorBorder");
                                }
                            }
                        }
                    });
                }
            });

            $("#EditZipSubmit").click(function () {
                var zpVal = $('#locator').find("#EditZip").val();
                var EditZipError = $(".EditZipError"),
                    EditZip = $("#EditZip");
                var zipRegex = /^\d{5}$/;
                if (!zipRegex.test(zpVal)) {
                    EditZipError.show();
                    EditZipError.html("<br>" + clientSideConfigValue);
                    EditZip.addClass("errorBorder");
                    //console.log("client side validation");
                } else {
                    //console.log("Inside server side validation");
                    EditZipError.html("");
                    $.ajax({
                        type: "POST",
                        url: "/jspf/modules/header/mo/checkZipCode.jsp",
                        data: ({zipCode: zpVal}),
                        complete: function (request, status) {
                            if (status == "success") {
                                var jsonObject = $.trim(request.responseText);
                                //console.log(jsonObject);
                                if (jsonObject == "true") {
                                    //console.log("inside true");
                                    EditZipError.hide();
                                    EditZip.removeClass("errorBorder");
                                    document.location.reload();
                                } else {
                                    //console.log("inside false");
                                    EditZipError.show();
                                    EditZipError.html("<br>" + clientSideConfigValue);
                                    EditZip.addClass("errorBorder");
                                }
                            }
                        }
                    });
                }
            });

            $(".desktopEditLink").click(function () {
                MOComponents.generic.centerPopup();
                MOComponents.generic.loadPopup();
                //google.maps.event.trigger(map, 'resize');
                MOComponents.generic.editZipOverlay();
            });

            $(".mobileEditLink").click(function () {
                if ($('.editZipSign').hasClass("minus")) {
                    $('.editZipSign').addClass("plus");
                    $('.editZipSign').html("");
                    $('.editZipSign').removeClass("minus");
                } else {
                    $('.editZipSign').addClass("minus");
                    $('.editZipSign').html("-");
                    $('.editZipSign').removeClass("plus");
                }

                if (showZipField == 0) {
                    $(".mobileEditZipList").removeClass('hide');
                    showZipField = 1;
                } else {
                    $(".mobileEditZipList").addClass('hide');
                    showZipField = 0;
                }
            });

            $("#popupContactClose").click(function () {
                MOComponents.generic.disablePopup();
            });

            $("#backgroundPopup").click(function () {
                MOComponents.generic.disablePopup();
            });

            $(document).keyup(function (e) {
                if (e.keyCode == 27 && popupStatus == 1) {
                    MOComponents.generic.disablePopup();
                }
            });
        }

    }// DATA-CONTROLLER
};// MO MODULE


// MOGeoDetails MODULE
MOGeoDetails = {
    /**
     * @namespace Class: geolocate
     */
    geolocate: {
        getLocation: function () {

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(handleGeolocation, errorHandler);
            }

            // geocode using the latlng values returned from the browser
            function handleGeolocation(pos) {
                var lat = pos.coords.latitude,
                    lng = pos.coords.longitude,
                    latlng = new google.maps.LatLng(lat, lng);
                geoCodeLocation('latLng', latlng);
            }

            // this does the bulk of the geocoding work
            function geoCodeLocation(type, value) {
                var geocoder = new google.maps.Geocoder(),
                    defaultLocation = {
                        city: 'Washington',
                        state: 'DC',
                        zipcode: '20006'
                    },
                    geo = {},
                    data = {};

                data[type] = value;
                geocoder.geocode(data, function (results, status) {
                    if (status === google.maps.GeocoderStatus.OK) {
                        var zipcode = (MOGeoDetails.geolocate.parseGeocoderResults('postal_code', results[0].address_components, false));
                        var city = (MOGeoDetails.geolocate.parseGeocoderResults('locality', results[0].address_components, false));
                        var state = (MOGeoDetails.geolocate.parseGeocoderResults('administrative_area_level_1', results[0].address_components, false));
                        var country = (MOGeoDetails.geolocate.parseGeocoderResults('country', results[0].address_components, false));

                        if (country != 'US') {
                            // If country not US, set to default location
                            latitude = '38.8964';
                            longitude = '-77.044701';
                            latlng = new google.maps.LatLng(latitude, longitude);
                            geoCodeLocation('latLng', latlng);
                        } else {
                            // Update HTML views
                            MOGeoDetails.geolocate.updateLocation({
                                zipCode: zipcode,
                                city: city,
                                state: state,
                                lat: results[0].geometry.location.lat(),
                                long: results[0].geometry.location.lng(),
                                country: country
                            });
                            // Update HTML views
                        }

                    } else {
                        MOGeoDetails.geolocate.errorHandler();
                    }
                });
            }

            function errorHandler(err) {
                // If country not US, set to default location
                latitude = '38.8964';
                longitude = '-77.044701';
                latlng = new google.maps.LatLng(latitude, longitude);
                geoCodeLocation('latLng', latlng);
            }

        },

        getProfileZip: function () {
            $.ajax({
                type: "POST",
                url: "/jspf/modules/header/mo/assignLocation.jsp",
                data: "",
                complete: function (request, status) {
                    if (status == "success") {
                        var jsonObject = $.trim(request.responseText);
                        //console.log(jsonObject);
                        if (jsonObject == "true") {
                            //This means the droplet set the 'geo' cookie with profile.zipcode.
                            //Updating the display fields with the value from cookie
                            var geo = (typeof $.cookie('geo') == 'undefined') ? null : JSON.parse($.cookie('geo'));
                            if (geo != null) {
                                $(".display-zip").html(geo.zipcode);
                                $(".search-zip").val(geo.zipcode);
                                if ($(".rco-ui-blood-cta")[0]) {
                                    MOComponents.generic.MOCustomFunction(geo.zipcode);
                                }
                            }
                        } else {
                            // This means the profile.zipcode is empty. We need to call the prompt google toolbar function here
                            //	navigator.geolocation.getCurrentPosition(handleGeolocation, errorHandler);
                            MOGeoDetails.geolocate.getLocation();
                        }
                    }
                }
            });
        },

        //updateLocation Function
        updateLocation: function (options) {
            var zipCode = options.zipCode,
                city = options.city,
                state = options.state,
                lat = options.lat,
                long = options.long,
                country = options.country;
            //defaultLocation
            defaultLocation = {
                city: 'Washington',
                state: 'DC',
                zipcode: '20006',
                lat: '38.8964',
                long: '-77.044701'
            };

            geo = {};
            geo.zipcode = zipCode;
            geo.city = city;
            geo.state = state;
            geo.lat = lat;
            geo.long = long;

            // check if location is valid, default if not
            if (typeof city === "undefined") {
                geo = defaultLocation;
            }

            // store our location in cookie
            $.cookie('geo', JSON.stringify(geo), {
                expires: 7, path: '/'
            });

            $.cookie('locality', zipCode, {
                expires: 7, path: '/'
            });

            // UPDATING LOCATION DETAILS IN THE JSP
            $(".display-zip").html(geo.zipcode);
            $(".search-zip:not(.search-results)").val(geo.zipcode);
            // UPDATING LOCATION DETAILS IN THE JSP

            noReload = false;
            if ($(".rco-ui-blood-cta")[0]) {
                MOComponents.generic.MOCustomFunction(geo.zipcode);
            }
        },
        //updateLocation Function

        errorHandler: function () {
            console.error("user ignored geo location");
        },

        /**
         * Pulls the name for a given geocode response type
         * @function
         * @param {string} type - The type of address component we want to return (http://code.google.com/apis/maps/documentation/geocoding/#Results)
         * @param {object} results - The data object returned by the geocoder that will be parsed
         * @param {boolean} longNameBool - Determines whether or not we want a short or long name for the returned value (PA vs Pennsylvania)
         */
        parseGeocoderResults: function (type, results, longNameBool) {
            var i, l, j, l2;
            for (i = 0, l = results.length; i < l; i += 1) {
                for (j = 0, l2 = results[i].types.length; j < l2; j += 1) {
                    if (results[i].types[j] === type) {
                        if (longNameBool) {
                            return results[i].long_name;
                        } else {
                            return results[i].short_name;
                        }
                    }
                }
            }
            return '';
        }
    }
};// MOGeoDetails MODULE


// GENERIC MODULE
MOComponents = {
    /**
     * @namespace Class: MOComponents :- Custom reusable JS components
     */
    generic: {
        MOCustomFunction: function (zipCode) {
            // AJAX call to populate the Events List
            var currentDate = new Date();
            $.ajax({
                type: "POST",
                url: "/ajax/mo/giveBloodFragment.jsp",
                data: ({
                    resultCount: resultCount,
                    dateRange: dateRange,
                    distanceRange: distanceRange,
                    zipCode: zipCode,
                    clientDate: currentDate.getDate()
                }),
                complete: function (request, status) {
                   if (status == "success") {
                        var obj = $.trim(request.responseText);
                        parseAndDisplay(obj);
                   }
                }
            });

            function parseAndDisplay(obj) {
                var driveUnavailableContainer = $("#driveUnavailableContainer");

                if (obj != "empty") {
                    var jsonObject = $.parseJSON(obj);

                    drawColumns(jsonObject);
                    if (jsonObject.length > 0) {
                        dataLayer.push(
                            {'bloodDriveSearchResults': '_' + jsonObject.length + '_'}
                        );
                    }
                    driveUnavailableContainer.hide();
                } else {
                    driveUnavailableContainer.show();
                }
                app.deferredCall(1000);
            }

            function drawColumns(jsonObject) {
                var dataRow = $(".dataRow");

                for (var j = 0; j < dataRow.length; j++) {

                    for (var i = 0; i < jsonObject.length; i++) {
                        var drive = jsonObject[i];
                        var rem = i % 2;
                        var displayColumn = $('<div class="col-sm-6" />');

                        if (rem == 0) {
                            var displayRow = $('<div class="row" />');
                            displayRow.append(displayColumn); //Append the column to the row
                        }
                        if (rem == 1) {
                            displayRow.append(displayColumn); //Append the column to the row
                        }

                        $(dataRow[j]).append(displayRow); //Append the current row to the main row

                        var eventCard = $("<div class='rco-ui-event-card' />");
                        displayColumn.append(eventCard);

                        //drive link
                        if (scheduleLink.indexOf('?') == -1) {
                            var driveLink = scheduleLink + "?";
                        } else {
                            var driveLink = scheduleLink + "&";
                        }
                        driveLink = driveLink + "driveId=" + drive.driveId + "&driveName=" + drive.driveName + "&driveDate=" + drive.startDate + "&startDate" + drive.startDate + "&siteCity=" + drive.city + "&siteState=" + drive.state + "&siteLng=" + drive.lat + "&siteLng=" + drive.lon + "&siteZipCode=" + drive.siteZipCode + "&siteName=" + drive.driveName + "&endTime=" + drive.endTime + "&startTime=" + drive.startTime + "&distance=" + drive.distance;

                        //Adding address
                        driveLink = driveLink + "&siteLine1=" + drive.location.replace(/<BR>/i, ' ') + "&siteLine2=";
                        //Adding other variables
                        driveLink = driveLink + "&driveType=fixed&zipFormat=true&zipSponsor=" + zipCode;

                        //Event Card Date
                        var eventCardDate = $("<div class='rco-ui-event-card-date' />"),
                            eventCardDateWrapper = $('<div class="rco-ui-event-card-date-wrapper" />');
                        eventCardDate.append(eventCardDateWrapper);
                        eventCard.append(eventCardDate);

                        var monthInfo = $("<div class='month'><a href=" + encodeURI(driveLink) + ">" + drive.monthOfYear.toUpperCase() + "</a></div>");
                        eventCardDateWrapper.append(monthInfo);

                        var dayInfo = $("<div class='day'><a href=" + encodeURI(driveLink) + ">" + drive.dayOfMonth + "</a></div>");
                        eventCardDateWrapper.append(dayInfo);
                        //Event Card Info
                        var eventCardInfo = $("<div class='rco-ui-event-card-info' />");
                        eventCard.append(eventCardInfo);

                        var descText = $("<p>" + drive.location + ", " + drive.distance + " mi.<br>" + drive.timeOpen + "</p>");
                        var linkText = $("<a href=" + encodeURI(driveLink) + " class='searchResultTitleSection'>" + drive.driveName + " &raquo;</a>");
                        eventCardInfo.append(linkText);

                        var brCount = drive.location.match(/<br\s?\/?>/g).length;
                        if (brCount > 1) {
                            drive.location = drive.location.replace(/<br\s?\/?>/, ', ');
                        }

                        var descText = $("<p class='descContent giveBloodDtlsSection'><a href=" + encodeURI(driveLink) + " >" + drive.location + ", " + drive.distance + " mi.<br>" + drive.timeOpen + "</a></p>");
                        eventCardInfo.append(descText);
                    }
                }

                displayRow = $('<div class="row" />');
                var zipSearchLink = zipDriveSearchLink + $('.searchZipCode').val();
                var allDriveText = $("<div class='col-sm-12' ><a href=" + encodeURI(zipSearchLink) + ">View All Drives &raquo;</a></div>");

                displayRow.append(allDriveText);
                dataRow.append(displayRow);

                $('.rco-ui-event-card').click(function () {
                    var linkURL = $(this).find('.searchResultTitleSection').attr('href');
                    window.location.href = linkURL;
                });
                // call life cycle for ui optimisation
                app.lifeCicle();
            }

            // AJAX call to populate the Events List
        },

        loadPopup: function () {
            //loads popup only if it is disabled
            if (popupStatus == 0) {
                $("#backgroundPopup").css({
                    "opacity": "0.2"
                });
                $("#backgroundPopup").fadeIn("slow");
                $("#popupContact").fadeIn("slow");
                popupStatus = 1;
            }
        },

        disablePopup: function () {
            //disables popup only if it is enabled
            if (popupStatus == 1) {
                $("#backgroundPopup").fadeOut("slow");
                $("#popupContact").fadeOut("slow");
                popupStatus = 0;
            }
        },

        centerPopup: function () {
            //request data for centering
            var windowWidth = document.documentElement.clientWidth;
            var windowHeight = document.documentElement.clientHeight;
            var popupHeight = $("#popupContact").height();
            var popupWidth = $("#popupContact").width();
            //centering
            $("#popupContact").css({
                "position": "absolute",
                "top": windowHeight / 2 - popupHeight / 2
            });
            //only need force for IE6

            $("#backgroundPopup").css({
                "height": windowHeight
            });
        },

        editZipOverlay: function () {
            /*POPUP FUNCTION*/
            var map;
            var markerLabels = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
            var zipCodeField = $('input#EditZip');
            var zipcode = $('#EditZip').val();
            //var chapters;

            /* ARC-1669
             if ($('#zipcode-error').length > 0) {
             return;
             }*/

            $.ajax({
                method: 'POST',
                url: "/ajax/chapterLocator.jsp",
                data: 'zipcode=' + zipcode,
                success: function (data) {
                    var jsonParseObj = data;
                    $('.localResourceList li:not(:first)').remove();

                    //Local Chapter
                    var localChapterName = jsonParseObj.localChapter.name;
                    var localChapterHref = jsonParseObj.localChapter.href;
                    var street1 = jsonParseObj.localChapter.address.street1;
                    var postalCode = jsonParseObj.localChapter.address.postalCode;
                    var phoneNumber = jsonParseObj.localChapter.address.phoneNumber;
                    var state = jsonParseObj.localChapter.address.state;
                    var targetBlank = jsonParseObj.localChapter.address.targetBlank;
                    var city = jsonParseObj.localChapter.address.city;
                    var chapterHeadingLink = "<a class='headingLink chapterTitleHeadingLink' href='" + localChapterHref + "' target='" + targetBlank + "'>" + localChapterName + "</a>";
                    $(".chapterTitleHeading").html(chapterHeadingLink);
                    var chapterAddress = street1 + ", " + city + ", " + state + ", " + postalCode;
                    $(".chapterAddress").html(chapterAddress);
                    $(".chapterPhone").html(phoneNumber);

                    if (jsonParseObj.localChapter.chapterLinks.length > 0) {
                        var chapterLinksList = "";
                        for (var i = 0; i < jsonParseObj.localChapter.chapterLinks.length; i++) {
                            chapterLinksList += "<li><a href='" + jsonParseObj.localChapter.chapterLinks[i].href + "'>" + jsonParseObj.localChapter.chapterLinks[i].linkTitle + "</a></li>";
                        }
                        $(".chapterLinks").append(chapterLinksList);
                    }

                    //Nearby Chapters
                    if (jsonParseObj.nearbyChapters.length > 0) {
                        var nearbyChaptersList = "";
                        for (var i = 0; i < jsonParseObj.nearbyChapters.length; i++) {
                            nearbyChaptersList += "<li class='arrow-bg chapterTitle' data-name='" + jsonParseObj.nearbyChapters[i].name + "'><h2 class='heading'><a class='headingLink' href='" + jsonParseObj.nearbyChapters[i].href + "'>" + jsonParseObj.nearbyChapters[i].name + "</a></h2></li>";
                        }
                        $(".localResourceList").append(nearbyChaptersList);
                    }

                    //Blood Region
                    if (jsonParseObj.bloodRegion.name != undefined) {
                        var bloodRegionList = "";
                        bloodRegionList += "<li class='arrow-bg chapterTitle' data-name='" + jsonParseObj.bloodRegion.name + "'><h2 class='heading'><a class='headingLink' href='" + jsonParseObj.bloodRegion.href + "'>" + jsonParseObj.bloodRegion.name + "</a></h2></li>";
                        $(".localResourceList").append(bloodRegionList);
                    }

                    //safLocations
                    if (jsonParseObj.safLocations.length > 0) {
                        var safLocationsList = "";
                        for (var i = 0; i < jsonParseObj.safLocations.length; i++) {
                            safLocationsList += "<li class='arrow-bg chapterTitle' data-name='" + jsonParseObj.safLocations[i].name + "'><h2 class='heading'><a class='headingLink' href='" + jsonParseObj.safLocations[i].href + "'>" + jsonParseObj.safLocations[i].name + "</a></h2></li>";
                        }
                        $(".localResourceList").append(safLocationsList);
                    }

                    // set markers
                    var i = 0;
                    $('#chapter-locations ul li.arrow-bg').each(function () {
                        var markerURL = "http://www.google.com/mapfiles/marker" + markerLabels[i] + ".png"
                        $(this).css('background-image', 'url(' + markerURL + ')');
                        i++;
                    });

                    //alert("Hey 123 processLocalData now");
                    processLocalData(data);
                }
            });


            function processLocalData(localData) {
                //alert("Inside processLocalData");
                var obj = localData;
                //alert("obj :"+obj);
                var userLocation;
                var userLat;
                var userLng;
                var markers = [];
                var localChapter;
                var localChapterMarker;
                var bloodRegion;
                var bloodRegionMarker;
                var safLocations;

                // update location
                userLocation = obj.zipCode;
                userLat = userLocation.location.lat;
                //alert("userLat"+userLat);
                userLng = userLocation.location.lng;
                //alert("userLng"+userLng);
                localChapter = obj.localChapter;
                //alert("localChapter"+localChapter);

                if (localChapter.location && localChapter.name) {
                    localChapterMarker = [
                        localChapter.location.lat,
                        localChapter.location.lng,
                        localChapter.name
                    ];
                    markers.push(localChapterMarker);
                }

                if (obj.safLocations.length > 0) {
                    safLocations = obj.safLocations;
                    for (var i = 0; i < safLocations.length; i++) {
                        var safLocation = safLocations[i];
                        var safLocationMarker = [
                            safLocation.location.lat,
                            safLocation.location.lng,
                            safLocation.name
                        ];
                        markers.push(safLocationMarker);
                    }
                }

                bloodRegion = obj.bloodRegion;
                if (bloodRegion.location && bloodRegion.name) {
                    bloodRegionMarker = [
                        bloodRegion.location.lat,
                        bloodRegion.location.lng,
                        bloodRegion.name
                    ];
                    markers.push(bloodRegionMarker);
                }

                MOComponents.geolocator.updateLocalChapter(localData);
                $('#modal .local-address').html(userLocation.address.city + ', ' + userLocation.address.state);

                // create map
                var mapOptions = {
                    center: new google.maps.LatLng(userLat, userLng),
                    zoom: 12,
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    mapTypeControl: false,
                    mapTypeOptions: {
                        style: google.maps.MapTypeControlStyle.DEFAULT
                    },
                    scaleControl: false,
                    streetViewControl: false,
                    panControl: false,
                    zoomControl: true,
                    zoomControlOptions: {
                        style: google.maps.ZoomControlStyle.LARGE
                    }
                };
                var map = new google.maps.Map(document.getElementById("map"), mapOptions);
                var infowindow = new google.maps.InfoWindow(), marker, i;
                var bounds = new google.maps.LatLngBounds();
                for (i = 0; i < markers.length; i++) {
                    var pos = new google.maps.LatLng(markers[i][0], markers[i][1]);
                    bounds.extend(pos);
                    marker = new google.maps.Marker({
                        position: new google.maps.LatLng(markers[i][0], markers[i][1]),
                        map: map,
                        label: markerLabels[i]
                    });
                    google.maps.event.addListener(marker, 'click', (function (marker, i) {
                        return function () {
                            infowindow.setContent(markers[i][2]);
                            infowindow.open(map, marker);
                        }
                    })(marker, i));
                    map.fitBounds(bounds);
                }

            }

            /*POPUP FUNCTION*/
        },

        /* ADDED CODE FROM OLD CODEBASE */
        locatorModal: function () {
            function updateLocation(zip) {
                $.ajax({
                    type: 'POST',
                    url: "/ajax/updateLocation.jsp",
                    data: 'zipcode=' + zip,
                    success: function (data) {
                        var link = $('#current-location');
                        if (data && data.notifications && data.notifications.errors && data.notifications.errors.length > 0) {
                            link.attr('data-ziperror', 'true');
                            link.click();
                        } else {
                            link.attr('data-ziperror', 'false');
                            $('#cboxClose').trigger('click');
                            document.location.reload();
                        }
                    }
                });
            }

        },

        gMap: function (canvasID, opts) {
            //alert("From inside gMap function");
            var gMap = this;
            gMap.map = "";
            initialize();
            function initialize() {
                //alert("gMap.initialize");
                gMap.map = new google.maps.Map(document.getElementById(canvasID), opts);
            }

            MOComponents.loadMapApi.load(initialize);

        }
        /* ADDED CODE FROM OLD CODEBASE */

        //generic
    },


    // single load point for maps api - rlc : ARC-1915
    loadMapApi: {
        isLoading: false,
        isReady: false,
        callbacks: [],
        apiTimer: null,
        load: function (callback) {
            var loader = MOComponents.loadMapApi;
            loader.callbacks.push(callback);
            if (!loader.isLoading && !loader.isReady) {
                loader.isLoading = true;
                /* Async loading of google maps API
                 var script = document.createElement("script");
                 script.type = "text/javascript";
                 script.src = "http://maps.googleapis.com/maps/api/js?v=3.7&sensor=false&region=US&callback=MOComponents.loadMapApi.apiCallback"+(vClientId == undefined ? "" : ("&client="+vClientId));
                 document.body.appendChild(script);*/
            } else if (loader.isReady) {
                callback();
            }
        },
        apiCallback: function () {
            var loader = MOComponents.loadMapApi;
            for (var i = 0; i < loader.callbacks.length; i++) {
                loader.callbacks[i]();
            }
            loader.callbacks = [];
            loader.isLoading = false;
            loader.isReady = true;
        }
        //loadMapApi
    },


    /**
     * @namespace
     * @description Creates a geolocator
     */
    geolocator: {
        /**
         * Triggers updates location-related text and links throughout the page. Called on page load and when saving/editing your location (via modal).
         * @function
         */
        updateLocation: function (zip) {
            // ajax request using zipcode value
            $.ajax({
                type: 'POST',
                url: "/ajax/updateLocation.jsp",
                data: 'zipcode=' + zip,
                success: function (data) {
                    if ($('#colorbox').is(':visible')) {
                        $('#cboxClose').trigger('click');
                    }
                    // ARC-1844
                    $('#current-location').attr('data-ziperror', 'false');
                }
            });
        },

        //Update chapter info across page.
        updateLocalChapter: function (localChapterInfo) {
            //alert("Inside updateLocalChapter");
            var requiredProps;
            var localChapter;
            var chapterName;
            var chapterStreet1;
            var chapterStreet2;
            var chapterMergedStreet;
            var chapterCity;
            var chapterState;
            var chapterZip;
            var chapterPhone;
            if (localChapterInfo && localChapterInfo.hasOwnProperty('localChapter')) {
                requiredProps = ['name', 'href', 'address', 'chapterLinks'];
                var hasRequiredFields = true;
                $.each(requiredProps, function (i, prop) {
                    if (!localChapterInfo.localChapter[prop]) {
                        hasRequiredFields = false;
                        return false;
                    }
                });
                if (!hasRequiredFields) return;

                localChapter = localChapterInfo.localChapter;
                //alert(localChapter);
                chapterName = localChapter.name;
                //alert(chapterName);
                chapterStreet1 = localChapter.address.street1;
                //alert(chapterStreet1);
                chapterStreet2 = localChapter.address.street2;
                //alert(chapterStreet2);
                chapterMergedStreet = chapterStreet1;
                //alert(chapterMergedStreet);
                chapterCity = localChapter.address.city;
                //alert(chapterCity);
                chapterState = localChapter.address.state;
                //alert(chapterState);
                chapterZip = localChapter.address.zip;
                //alert(chapterZip);
                chapterPhone = localChapter.address.phone;
                //alert(chapterPhone);

                if (chapterStreet2) {
                    //alert("chapterStreet2"+chapterStreet2);
                    chapterMergedStreet = chapterStreet1 + '<br/ >' + chapterStreet2;
                }
                $('.contact-local').each(function () {
                    var element = $(this),
                        localInfo = element.find('.local-contact-info'),
                        chapterText = localInfo.find('h1'),
                        localPhone = localInfo.children('.local-phone');

                    chapterText.html(chapterName);
                    localPhone.html(chapterPhone);
                });

                $('[data-action="locationUpdate"]').each(function () {
                    var element = $(this);
                    element.find('.chapter-name').html(chapterName);
                    element.find('.chapter-street').html(chapterMergedStreet);
                    element.find('.chapter-city').html(chapterCity);
                    element.find('.chapter-state').html(chapterState);
                    element.find('.chapter-zip').html(chapterZip);
                    element.find('.chapter-phone').html(chapterPhone);
                });

                $('[data-action="contactLocation"]').each(function () {
                    var element = $(this),
                        mapLink = element.find('.map-link'),
                        linkNode = mapLink.get(0).nodeName,
                        newLink = '<' + linkNode + ' class="' + mapLink.attr('class') + '">' + mapLink.html() + '</' + linkNode + '>';

                    element.html('American Red Cross<br/>' + chapterName + '<br/>' + chapterMergedStreet + '<br/>' + chapterCity + ', ' + chapterState + ' ' + chapterZip + '<br/>' + newLink)
                });

            }
        }

        //geolocator
    }


};// GENERIC MODULE


// UTIL MODULE
UTIL = {
    exec: function (controller, action) {
        var ns = MO,
            action = ( action === undefined ) ? "init" : action;

        if (controller !== "" && ns[controller] && typeof ns[controller][action] == "function") {
            ns[controller][action]();
        }
    },

    init: function () {
        var body = document.body,
            controller = body.getAttribute("data-controller"),
            action = body.getAttribute("data-action");

        UTIL.exec("common");
        UTIL.exec(controller);
        UTIL.exec(controller, action);
    }
};// UTIL MODULE

$(document).ready(UTIL.init);