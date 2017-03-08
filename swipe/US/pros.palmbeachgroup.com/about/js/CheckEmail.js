function __addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function () {
            if (oldonload) {
                oldonload();
            }
            func();
        };
    }
}

function __emailCheck(emailField, formField) {
    var localPart = '(?!(?:abuse|postmaster|webmaster|admin|administrator|technical)@)';
    var checkTopLevelDomains = '(?=^.*?(\\.[a-zA-Z]{2,63})$)';
    var checkForSpaces = '(?=^[^\\s]*?$)';
    var checkEmailLength = '(?=^.{1,255}$)';
    var checkDoubleSymbols = '(?!^.*?(-_|_-|\\.\\.|\\\\|/).*?$)';
    var mainRegexPart = '^[^\\._-]([^@]{0,63}?)@([^@]+?)$';
    var emailValidationRegex = new RegExp(localPart + checkTopLevelDomains + checkForSpaces + checkEmailLength + checkDoubleSymbols + mainRegexPart, 'gi');
    if (!emailValidationRegex.test(emailField.value) || emailField.value.indexOf('#') > -1) {
        var emailMessageId = 'emailError';
        var emailMessage = __getElementInsideContainer(formField, emailMessageId);
        if (!emailMessage) {
            emailMessage = document.createElement("span");
            emailMessage.id = emailMessageId;
            emailMessage.style.cssText = "color: #ff0000;padding-left: 10px;vertical-align: top;display:block;";
            emailField.parentNode.insertBefore(emailMessage, emailField.nextSibling);
        }
		alert('Email is invalid, please enter a valid email.');
        return false;
    }
	return true;
}

function __stopEvent(e) {
    if (e.stopPropagation) e.stopPropagation();
    else e.cancelBubble = true;

    if (e.preventDefault) e.preventDefault();
    else e.returnValue = false;
}

var __attachEventHandler = function (element, eventName, handler) {
    if (element.addEventListener)
        element.addEventListener(eventName, handler, false);
    else
        element.attachEvent('on' + eventName, handler);
};

var __getByTagAndId = function(tagName, id) {
	var result = [];
    var tags = document.getElementsByTagName(tagName);
	for (var i = 0; i < tags.length; i++) {
        if (tags[i].id == id) {
            result.push(tags[i]);
        }
    }

    return result;
};

var __getElementInsideContainer = function(container, childID) {
    var elms = container.getElementsByTagName("*");
    for (var i = 0; i < elms.length; i++) {
        if (elms[i].id === childID) {
            return elms[i];
        }
    }
    return undefined;
};

__addLoadEvent(function () {
    var formElements = __getByTagAndId("form", "LeadGen");
	for (var i in formElements){
	    var email = __getElementInsideContainer(formElements[i], "email");
		if (email) {
			var prepopulatedText = email.value;
			__attachEventHandler(email, 'blur', function (e) {
				var _email = e.target || e.currentTarget || e.originalTarget;
				if (_email.value != prepopulatedText) {
					_email.value = _email.value.replace(/\s/g, '');
				}
			});
			__attachEventHandler(formElements[i], "submit", function (e) {
				var _form = e.target || e.currentTarget || e.originalTarget;
				var _email = __getElementInsideContainer(_form, "email");
				if (!__emailCheck(_email, _form)) {
					__stopEvent(e);
				}
				return true;
			});
		}
	}
});
