// v1.0.2

if (!window.pageProperties || window.pageProperties.hasComments) {
	if (!window.gigya && window.console) {
		window.console.error("Gigya must be loaded before the comments system can be utilized.");
	}

	(function ($, gigya) {
		"use strict";

		gigya.stansberry = function (options) {
			// Prepare variables
			var gigyaGroup = "stansberryCustom",
				loggedOut = "gigya-logged-out",
				categoryID = "TheCrux",
				container = null,
				header = null,
				email = { // Email object
					id: "email",
					className: "gig-email-required",
					errorClass: "gig-email-error",
					regex: /^[a-zA-Z0-9_.+\-]+@([a-zA-Z0-9\-]+\.)+[a-zA-Z.]{2,}$/, // Extremely simplistic email regex
					container: null,
					label: null,
					input: null,
					commentHandler: null
				},
				user = { // User object
					isGuest: false,
					UID: "",
					name: "",
					email: "",
					data: {}
				},
				comment = { // Comment object (with similar interface to reply object)
					selectors: {
						container: ".gig-comments-composebox",
						error: ".gig-composebox-error",
						postButton: ".gig-composebox-post"
					},
					container: null
				},
				reply = { // Reply object
					selectors: {
						button: ".gig-comment-replyLink",
						parent: ".gig-comment-self-data",
						container: ".gig-comment-replybox",
						error: ".gig-composebox-error",
						close: ".gig-composebox-close",
						header: ".gig-composebox-header",
						textarea: ".gig-composebox-textarea",
						postButton: ".gig-composebox-post"
					},
					closeHandler: $.noop,
					container: null,
					button: null,
					header: null,
					textarea: null,
					isActive: false,
					content: ""
				},
				salvageEmail,
				commentInterface,
				commentCount;

			// Make the user object globally accessible
			window.gigyaUser = user;

			salvageEmail = function (email) { // "Salvages" the email from the depths of the Internet into our lifeboat
				$.ajax({
					type: "POST",
					url: "http://signups.thecrux.com/Content/SaveFreeSignups",
					data: {
						source: "X350Q170",
						NotSaveSignup: "False",
						email: email
					}
				});
			};

			// These methods just make it easier to interact with our fake user object
			$.extend(user, {
				buildName: function (data) { // Build the user's display name
					if (data.name) {
						return data.name;
					}

					var name = $.trim([data.firstName || "", data.lastName || ""].join(" "));

					return name || data.nickname || "";
				},

				reset: function () { // Reset all values
					$.extend(this, {
						isGuest: false,
						name: "",
						email: "",
						data: {}
					});
				},

				update: function (data) { // Update user information
					$.extend(this.data, data);
					this.id = (data.UID || data.id || this.UID);
					this.name = (this.buildName(data) || this.name);
					this.email = (data.email || this.email);
				},

				isValid: function () { // Check that the user has enough information
					return !!user.name && !!user.email;
				},

				getInfo: function (callback, context) { // Get user info
					if (!this.isGettingInfo) {
						this.isGettingInfo = true;

						gigya.socialize.getUserInfo({
							context: this,
							callback: function (response) {
								var obj = response.context;

								if (response && response.user) {
									if (!response.UID) { // Invalid user
										obj.isGettingInfo = false;
										return;
									}

									obj.update($.extend(response.user, { isGuest: false }));
								}

								obj.isGettingInfo = false;
								// Invoke callback if successful, otherwise pass it to the next step
								if (!obj.isValid()) {
									obj.findEmail(callback, context, response.user);
								} else if (callback && $.isFunction(callback)) {
									callback.call(context || this, obj, response.user);
								}
							}
						});
					}
				},

				getId: function () { // Get the UID of the user
					return this.id || (this.data && this.data.UID) || null;
				},

				finalize: function (callback, context) { // Use the user's information to finalize the Gigya interaction
					// Ensure that we have the data
					var id = this.getId(),
						email = this.email || null;

					if (id && email) {
						// Set the user up to recieve email notifications of their replies
						gigya.comments.setUserOptions({
							UID: id,
							replyNotifications: "immediate",
							notificationsEmail: email,
							context: context,
							callback: callback || $.noop
						});
					}
				},

				saveEmail: function (callback, context) { // Save the email for future loading
					if (!this.isSavingEmail) {
						var id = this.getId();

						if (id) {
							this.isSavingEmail = true;

							gigya.socialize.setUserSettings({
								UID: id,
								settings: {
									"commenting": { optionalEmail: user.email }
								},
								group: gigyaGroup,
								context: this,
								callback: function (response) {
									var obj = response.context;

									obj.isSavingEmail = false;

									// Invoke callback
									if (callback && $.isFunction(callback)) {
										callback.call(context || this, obj);
									}
								}
							});
						}
					}
				},

				findEmail: function (callback, context, userData) { // Attempt to find user's email
					if (!this.isFindingEmail || !this.isGuest) {
						var id = this.getId();

						if (id) {
							this.isFindingEmail = true;

							gigya.socialize.getUserSettings({
								UID: id,
								group: gigyaGroup,
								settings: "commenting",
								context: this,
								callback: function (response) {
									var obj = response.context;

									if (response.errorCode === 0 && response.settings.commenting) {
										obj.update({ email: response.settings.commenting.optionalEmail, isGuest: false });
									}

									obj.isFindingEmail = false;

									// Invoke callback
									if (callback && $.isFunction(callback)) {
										callback.call(context || this, obj, userData);
									}
								}
							});
						}
					}
				}
			});

			// These methods handle the email request in the form
			$.extend(email, {
				show: function () { // Show the email request
					this.container.show();
				},

				hide: function () { // Hide the email request and clear value
					this.container.hide();
					this.commentHandler.removeError(this.id);
					this.input.val("");
				},

				value: function () { // Get the input value
					return this.input.val();
				},

				validate: function () { // Validate the input
					var value = this.value(),
						errorMessage = "",
						hasError = true;

					if (!value) {
						errorMessage = "Please provide your e-mail address";
					} else if (!this.regex.exec(value)) {
						errorMessage = "That e-mail doesn't appear valid. Please try again.";
					} else {
						hasError = false;
					}

					this.container.toggleClass(this.errorClass, hasError);

					if (hasError) {
						this.commentHandler.addError(this.id, errorMessage);
					}

					return !hasError;
				},

				update: function (user) { // Conditionally show or hide based on user object
					if (!user.email) {
						return this.show();
					}

					this.commentHandler.removeError(this.id);
					return this.hide();
				},

				setHandler: function (handler) { // Change the comment handler
					if (this.commentHandler) {
						this.commentHandler.removeError(this.id);
					}

					this.commentHandler = handler;
				},

				triggerPost: function () { // Trigger the post action through the comment handler
					this.commentHandler.post();
				}
			});

			// Common functionality between "comment" and "reply"
			commentInterface = {
				errorMessages: null,
				error: null,
				postButton: null,

				addError: function (name, message) { // Add an error message
					if (message) {
						this.errorMessages.name = message;
						this.error.text(message).show();
					}
				},

				removeError: function (name) { // Remove an error message
					if (this.errorMessages.name) {
						if (this.error.text() === this.errorMessages.name) {
							this.error.text("").hide();
						}

						delete this.errorMessages.name;
					}
				},

				post: function () { // Trigger the post action
					this.postButton.click();
				}
			};

			$.extend(comment, commentInterface, {
				activate: function () {
					// Prepare data
					this.errorMessages = {};
					this.container = $(this.selectors.container).first();
					this.error = $(this.selectors.error, this.container);
					this.postButton = $(this.selectors.postButton, this.container);
				}
			});

			// These methods handle the special case of a reply until Gigya fixes it
			$.extend(reply, commentInterface, {
				activate: function (button) { // Initialize the object with the activating button
					// Prepare the data
					this.errorMessages = {};
					this.reset();

					// Get the elements based on the activating button
					if (button && button.length) {
						this.button = button;
						this.parent = button.parents(this.selectors.parent).first();
						this.container = this.parent.siblings(this.selectors.container).first();

						// If the container exists, go for it!
						if (this.container.length) {
							this.updateElements();
							this.content = this.textarea.text();
							this.isActive = true;
						}
					}
				},

				deactivate: function () { // Clear the object when it's no longer relevant
					this.reset();
				},

				rescue: function () { // Rescue the reply box!!
					// Save the old error text, before it's too late!
					var error = this.error ? this.error.text() : "";

					// Re-trigger the reply event
					this.button.click();

					// Get the container if they don't recycle the same one
					if (!this.container || !this.container.length || this.container.is(":hidden")) {
						this.container = $(this.selectors.container, this.parent).first();
					}

					// Since the elements are refreshed, get them again
					this.updateElements();

					// Set the data, again
					this.textarea.text(this.getContent());
					this.error.text(error).show();
				},

				isActive: function () { // Whether or not the reply box is active
					return !!this.isActive;
				},

				setContent: function (content) { // Manually set the reply content
					this.content = content || "";
				},

				getContent: function () { // Get the reply content
					return this.content || this.textarea.text();
				},

				updateElements: function () { // Update DOM elements
					// Update the elements
					var close = $(this.selectors.close, this.container);
					this.header = $(this.selectors.header, this.container);
					this.textarea = $(this.selectors.textarea, this.container);
					this.error = $(this.selectors.error, this.container);
					this.postButton = $(this.selectors.postButton, this.container);

					// Make sure we don't re-apply the same event handler twice
					if (!(this.close && this.close.is(close))) {
						this.close = close;
						this.close.click(this.closeHandler);
					}
				},

				reset: function () { // Clear object data
					this.button = null;
					this.parent = null;
					this.container = null;
					this.close = null;
					this.header = null;
					this.textarea = null;
					this.error = null;
					this.content = "";
					this.isActive = false;
				}
			});

			$(function () {
				commentCount = $(".comment_count").text("--");

				// Set the comment count
				gigya.comments.getComments($.extend(options, {
					categoryID: categoryID,
					callback: function (response) {
						commentCount.text(+(response && response.commentCount));
						if(response.commentCount > 0) {
							commentCount.css('visibility', 'visible');
						}
					}
				}));

				// Here are our authorization event handlers
				gigya.socialize.addEventHandlers({
					onLogin: function (response) { // Update user object when login occurs
						if (response && response.user) {
							user.update($.extend(response.user, { isGuest: false }));
							container.removeClass(loggedOut);
						}

						if (!user.isValid()) {
							user.findEmail(email.update, email);
						}
					},

					onLogout: function () { // Reset form and user when user logs out
						email.hide();
						user.reset();
						container.addClass(loggedOut);
					}
				});

				// And here is the function that builds the comments interface
				gigya.comments.showCommentsUI($.extend(options, {
					version: 2,
					categoryID: categoryID,
					enabledShareProviders: "facebook,twitter",
					width: "100%",
					//showLoginBar: true,
					onLoad: function (response) { // Get elements after UI is built and check for a logged in user
						container = $(document.getElementById(options.containerID)).addClass(loggedOut);
						header = $(".gig-composebox-header");
						email.container = $("<div/>", { "class": email.className }).insertAfter(header);
						email.label = $("<label/>", { "for": "email", text: "Email" }).appendTo(email.container);
						email.input = $("<input/>", { type: "email", id: "email" }).appendTo($("<div/>").appendTo(email.container));

						// Select a comment handler
						comment.activate();
						email.setHandler(comment);

						// Prepare the reply box interaction whenever the Reply button is clicked
						// NOTE: We use a jQuery-live handler (handler on parent) in case more comments are added
						$(container).on("click", reply.selectors.button, function () {
							var button = $(this);

							// Use setTimeout just in case, by some strange order of events, this triggers before Gigya's click
							setTimeout(function () {
								// Activate reply handling
								reply.activate(button);

								// Move the email request into the reply box
								email.container.insertAfter(reply.header);
								email.setHandler(reply);
							}, 100);
						});

						// Whenever a reply box's Close button is clicked, put the email request back in the correct place
						// NOTE: We don't use a jQuery-live handler on this because it never bubbles up
						reply.closeHandler = function () {
							// Deactivate reply handling
							reply.deactivate();

							// Move the email request to the comment box
							email.container.insertAfter(header);
							email.setHandler(comment);
						};

						// Handle pressing "Enter" in the email input
						email.input.keyup(function (event) {
							if (event.keyCode === 13) {
								email.triggerPost();
							}
						});

						// Make an initial attempt at finding the user's information
						user.getInfo(function (user, data) {
							email.update(user);
							container.toggleClass(loggedOut, !data.isLoggedIn);
						});
					},

					onBeforeCommentSubmitted: function (response) { // Verify user before allowing a comment
						// Update the user
						if (response && response.guestEmail) {
							// Handle a guest user
							user.update({
								isGuest: true,
								name: response.guestName,
								email: response.guestEmail
							});
						} else if (!user.isValid()) {
							// Update the display of the e-mail request
							email.show();

							// Check if the user has input a valid e-mail address, yet
							if (email.validate()) {
								user.update({ email: email.value() });
							} else if (reply.isActive()) {
								// Rescue the reply box before Gigya kills it!
								reply.setContent(response.commentText || "");
								reply.rescue();
							}
						}

						return user.isValid();
					},

					onCommentSubmitted: function () { // Send it all off!
						// If the user filled out the email, save it in Gigya's custom data
						if (email.value() === user.email) {
							user.saveEmail();
						}

						// Finalize the user
						user.finalize();

						// Scrape, ahem, salvage the e-mail address to our servers
						salvageEmail(user.email);

						// Hide display for email request
						email.hide();
					}
				}));
			});
		};
	}(window.jQuery, window.gigya));
}
