;(function(window, document, $) {
	var $doc = $(document);
	var $win = $(window);

	$doc.ready(function() {
		/*table with tabs*/
		$('.table-tabs').each(function() {
			var $tabbedTable = $(this);
			var $navTrigger = $tabbedTable.find('.table-tabs-btns');
			var $tab = $tabbedTable.find('.table-tab');

			$navTrigger.on('click', function () {
				$(this).toggleClass('open');
			});

			$navTrigger.on('click', '.table-tabs-btn', function() {
				var $btn = $(this);
				var idx = $btn.index();

				$btn.addClass('active').siblings('.active').removeClass('active');

				$tabbedTable.find('.table-tab:eq(' + idx + ')').addClass('active').siblings('.active').removeClass('active');
			});
		});

		// Columns tablet title
		$('.table-columns').each(function() {
			$(this)
				.find('tbody:first')
					.prepend('<tr><td class="table-title" colspan="2">' + $(this).find('caption').text() + '</td></tr>')
		});

		// Blog Navigation
		var navBlogOpenClass = 'is-open';
		
		$('.nav-blog .nav-trigger').on('click', function(){
			$('.nav-blog').toggleClass(navBlogOpenClass);
		});

		$doc.on('click', function(e){
			var $target = $(e.target);

			if (!$target.closest('.nav-blog').length) {
				$('.nav-blog').removeClass(navBlogOpenClass);
			}
		});

		// Geopopup
		if ( ( elems.countrycode.toLowerCase() == 'us' ) ) {
			
			var links   	       = document.querySelectorAll('[href^="/-/"]');
			var stateAbbreviations = {
				nj: 'new-jersey',
				pa: 'pennsylvania',
				il: 'illinois',
                nv: 'nevada',
                ia: 'iowa',
                wv: 'west-virginia',
                mi: 'michigan',
				in: 'indiana',
                ks: 'kansas',
                md: 'maryland',
                co: 'colorado',
				tn: 'tennessee',
				ct: 'connecticut',
				la: 'louisiana',
				ny: 'new-york',
				oh: 'ohio',
				va: 'virginia'
			};
			var currentState;
			var enabledStates;
			var exclude;
			var excludeAdditional;

			if (elems.state){
				currentState       = elems.state.toLowerCase();
				enabledStates      = ['pa', 'nj', 'in', 'nv', 'ia', 'wv', 'mi', 'il', 'co', 'ks', 'md', 'tn', 'ct', 'la', 'ny', 'oh', 'va'];
				exclude            = enabledStates.indexOf(currentState) > -1 ? ':not([href^="/-/us/' + stateAbbreviations[currentState] + '"])' : '';
				excludeAdditional  = [/*'/-/us/social/slotomania', '/-/us/social/house-of-fun', '/-/us/social/caesarsgames', '/-/us/social/vegas-words', '/-/us/social/hard-rock-social-casino',*/ '/-/us/social/high5', '/-/us/social/winstar-casino'];

				excludeAdditional.forEach(function(item) {
					exclude += ':not([href^="' + item + '"])'
				});

				$doc.on('click', '[href^="/-/"]' + exclude, function(event) {
					event.preventDefault();

					var currentPopup;

					switch(currentState) {
						case 'pa':
							currentPopup = '/wp-content/themes/onlinegambling/alternatives/usa-pa.php'
							break;
						case 'nj':
							currentPopup = '/wp-content/themes/onlinegambling/alternatives/usa-nj.php'
							break;
						case 'in':
							currentPopup = '/wp-content/themes/onlinegambling/alternatives/usa-indiana.php'
							break;
						case 'il':
							currentPopup = '/wp-content/themes/onlinegambling/alternatives/usa-illinois.php'
							break;
						case 'nv':
							currentPopup = '/wp-content/themes/onlinegambling/alternatives/usa-nevada.php'
							break;
						case 'ia':
							currentPopup = '/wp-content/themes/onlinegambling/alternatives/usa-iowa.php'
							break;
						case 'wv':
							currentPopup = '/wp-content/themes/onlinegambling/alternatives/usa-west-virginia.php'
							break;
						case 'co':
							currentPopup = '/wp-content/themes/onlinegambling/alternatives/usa-colorado.php'
							break;
						case 'mi':
							currentPopup = '/wp-content/themes/onlinegambling/alternatives/usa-michigan.php'
							break;
						case 'ks':
							currentPopup = '/wp-content/themes/onlinegambling/alternatives/usa-kansas.php'
							break;
						case 'md':
							currentPopup = '/wp-content/themes/onlinegambling/alternatives/usa-maryland.php'
							break;
                        case 'ct':
							currentPopup = '/wp-content/themes/onlinegambling/alternatives/usa-connecticut.php'
							break;
                        case 'la':
							currentPopup = '/wp-content/themes/onlinegambling/alternatives/usa-louisiana.php'
							break;
                        case 'ny':
							currentPopup = '/wp-content/themes/onlinegambling/alternatives/usa-new-york.php'
							break;
                        case 'oh':
							currentPopup = '/wp-content/themes/onlinegambling/alternatives/usa-ohio.php'
							break;
                        case 'tn':
							currentPopup = '/wp-content/themes/onlinegambling/alternatives/usa-tennessee.php'
							break;
                        case 'va':
							currentPopup = '/wp-content/themes/onlinegambling/alternatives/usa-virginia.php'
							break; 
						case 'ca':
							currentPopup = '/wp-content/themes/onlinegambling/alternatives/usa-alternatives.php'
							break;
						default:
							currentPopup = '/wp-content/themes/onlinegambling/alternatives/usa-alternatives.php'
							break;
					}

					if( $('.popup-alternative').length ) {
						$('.geopopup-overlay').fadeIn();
					} else {
						$.ajax({
							type: 'get',
							url: currentPopup,
							success: function(popup) {
								$(document.body).append(popup);
		
								linksByDevices();
							},
							error: function(error) {
								console.log(error);
							}
						});
					}
				});

				$('.geopopup-overlay').remove();
			} else{
				$('[href^="/-/"]').on('click', function(event) {
					event.preventDefault();

					var currentPopup = '/wp-content/themes/onlinegambling/alternatives/usa-alternatives.php';

					if( $('.popup-alternative').length ) {
						$('.geopopup-overlay').fadeIn();
					} else {
						$.ajax({
							type: 'get',
							url: currentPopup,
							success: function(popup) {
								$(document.body).append(popup);
		
								linksByDevices();
							},
							error: function(error) {
								console.log(error);
							}
						});
					}
				});

				$('.geopopup-overlay').remove();
			}
			
		}

		var hrefs = [/*'slotomania', 'house-of-fun', 'caesarsgames', 'vegas-words',  'hard-rock-social-casino',*/ 'high5', 'winstar-casino'];

		hrefs.forEach(function(href) {
			if ($('[href^="/-/' + href + '"]').length) {
				linksByDevices(href);
			}
		});

		$doc.on('click', '.geopopup-close' ,function() {
			$('.geopopup-overlay').fadeOut();

			$('html').removeClass('no-scroll');
		});

		if ($('.text-limit-multiple').length) {
			new DottedText($('.text-limit-multiple').get(0), {
				rows   : 1,
				showMoreText: '... read more',
				showLessText: 'Read less',
				stopAt: 10000
			});
		};

		// Auto table stripe
		var $tables = $('.table');

		$tables.each(function() {
			var $table = $(this);

			$table.toggleClass('stripe-reversed', !($table.find('tbody tr').length % 2));
		});

		// Intro sizing
		var $introContainer = $('.intro .container');

		$win.on('load resize', function(){
			if ($win.outerWidth() > 1023) {
				$introContainer.outerHeight($introContainer.find('.intro-content').outerHeight() + parseInt($introContainer.css('paddingTop')) + 1);
			} else {
				$introContainer.outerHeight('auto');
			}

			$introContainer.addClass('is-loaded');
		});

		// iOS and Android specific go links
		var hrefs = ['/-/us/social/slotomania', '/-/us/social/house-of-fun', '/-/us/social/caesarsgames', '/-/us/social/vegas-words'];
		var ua    = navigator.userAgent.toLowerCase();

		if (ua.indexOf('android') > -1) {
			hrefs.forEach(function(href) {
				$('[href^="' + href + '"]').attr('href', href + '-android');
			});
		} else if (/ipad|iphone|ipod|macintosh/.test(ua) && 'ontouchstart' in window) {
			hrefs.forEach(function(href) {
				$('[href^="' + href + '"]').attr('href', href + '-ios');
			});
		}

        // iOS specific go links
		var hrefs = ['/-/us/minnesota/jackpocket', '/-/us/new-hampshire/jackpocket', '/-/us/washington-dc/jackpocket', '/-/us/colorado/jackpocket', '/-/us/new-jersey/jackpocket', '/-/us/oregon/jackpocket', '/-/us/texas/jackpocket', '/-/us/arkansas/jackpocket', '/-/us/ohio/jackpocket', '/-/us/new-york/jackpocket'];
		var ua    = navigator.userAgent.toLowerCase();

		if (/ipad|iphone|ipod|macintosh/.test(ua) && 'ontouchstart' in window) {
			hrefs.forEach(function(href) {
				$('[href^="' + href + '"]').attr('href', href + '-ios');
			});
		}

		// Btn Totop
		$win.on('scroll', function(){
			if ($(this).scrollTop() > 600) {
				$('.btn-totop').fadeIn();
			} else {
				$('.btn-totop').fadeOut();
			}
			if ($(this).scrollTop() > $(this).outerHeight() / 2) {
				$('body').addClass('scrolled');
			}
		});

		$('.btn-totop').on('click', function(){
			history.pushState('', document.title, location.pathname);

			$('html, body').animate({
				scrollTop: 0
			}, {
				duration: 500,
				queue: false
			});

			return false;
		});

		// Responsive hrefs
		$('.js-responsive-href').each(function() {
			startResponsiveHref($(this));
		});

		//US Restrictions
		if ( $('body').hasClass('us-restrictions') ) {
			$('a[href^="/-/"]').each(function() {
				var $a = $(this);

				if ( $a.parents('.section-primary').length ) {
					$a
					  .addClass('restrictions-hide')
					  .parents('.section-primary').addClass('restrictions-hide')
					  .prev('.global-title').addClass('restrictions-hide');

					$a
					  .parents('.section-primary').prev('p').find('.global-title').parent().addClass('restrictions-hide');

				} else if ( $a.parents('.conversion-table').length ) {
					$a
					  .addClass('restrictions-hide')
					  .parents('.conversion-table').addClass('restrictions-hide')
					  .prev('.detail-row').addClass('restrictions-hide');
				} else if ( $a.parents('.list').length ) {
					$a
					  .addClass('restrictions-hide')
					  .parents('tr').addClass('restrictions-hide');
				} else if ( $a.parents('.table').length ) {
					$a
					  .after(
					  	$('<span />')
						  .attr('class', $a.attr('class') || '')
						  .html( $a.html() )
						)
					  .remove();

				} else if ( $a.parents('.section-halves').length ) {
					$a
					  .addClass('restrictions-hide')
					  .parents('.section-halves').addClass('restrictions-hide');
				} else {
					console.log($a);
					$a
					  .after(
					  	$('<span />')
						  .attr('class', $a.attr('class') || '')
						  .html( $a.html() )
						)
					  .remove();
				}
			});

			$('.restrictions-hide, .us-hide').remove();
		}

		addEventListener('touchstart', function(event) {
			if( $('.disclosure-visible').length ) {
				$('.disclosure-visible').removeClass('disclosure-visible');
			}
		}, supportsPassive ? { passive: true } : false);

		addEventListener('mousedown', function(event) {
			if( $('.disclosure-visible').length ) {
				$('.disclosure-visible').removeClass('disclosure-visible');
			}
		}, false);

		var $disclosures = $('[id^="disclosure"]');

		if( $disclosures.length ) {
			var $disclosureTriggers = $('[id^="disclosure-trigger"]');
			var $disclosureModals = $('[id^="disclosure-modal"]');

			$disclosureModals.html('<div>This independent comparison website helps consumers choose the best available gambling product matching their needs. We offer high-quality advertising service by featuring only established brands of licensed operators in our reviews. Please note that although we endeavor to provide you with up-to-date information, we do not compare all operators on the market.</div> <small>We shall not be responsible for the enforcement of any additional restrictions related to the provision of the gambling services which we advertise such as age limitations as well as territory and residence limitations, wherefore we advise you to review the applicable restrictions for said operators.</small>')

			$disclosureTriggers.on('click', function(event) {
				var target = '#' + $(this).attr('id').replace('disclosure-trigger', 'disclosure-modal');

				$(target).addClass('disclosure-visible');
			});
		}

		var $conversionTables = $('.conversion-table');

		if( $conversionTables.length ) {
			$conversionTables.each(function() {
				var $conversionTable = $(this);

				if( $conversionTable.find('tr[data-terms]').length ) {
					$conversionTable.addClass('ct-with-terms');

					var $termsRows = $conversionTable.find('tr[data-terms]');

					$termsRows.each(function() {
						var $termsRow = $(this);
						var $newRow = $('<tr class="ct-row-terms"><td class="ct-terms" colspan="' + $termsRow.find('td').length + '">' + $termsRow.data('terms') + '</td></tr>');

						$termsRow.addClass('has-terms').after($newRow);
					});
				} else if( $conversionTable.find('td.ct-terms').length ) {
					$conversionTable.addClass('ct-with-terms');

					var $termsCells = $conversionTable.find('td.ct-terms');

					$conversionTable.find('th.ct-terms').remove();

					$termsCells.each(function() {
						var $termsCell = $(this);
						var $row = $termsCell.parents('tr:eq(0)');
						var $termsRow = $('<tr class="ct-row-terms" />');
						var $clone = $termsCell.clone();

						// $row.attr('data-terms', $termsCell.text()).addClass('has-terms');
						$row.addClass('has-terms').after($termsRow);
						$termsRow.append($clone);
						$clone.attr('colspan', $row.children().length);

						if( $termsCell.is(':last-child') && $termsCell.prev().length ) {
							$termsCell.prev().before($termsCell);
						}
					});
				}
			});
		}

		// JS toggles
		$('.js-toggle').on('click', function(e){
			e.preventDefault();

			var $this       = $(this);
			var $target     = $this.data('target') ? $($this.data('target')) : $($this.attr('href'));
			var activeClass = $this.data('class') ? $this.data('class') : 'active';

			$this
				.add($target)
				.toggleClass(activeClass);

			if ($this.data('dispatch')) {
				$target.trigger($this.data('dispatch'));
			}
		});

		$doc.on('click touchstart', function(e){
			var $target = $(e.target);

			$('[data-autoclose]').each(function(){
				var $this     = $(this);
				var element   = $this.data('inner-element') ? $this.data('inner-element') : $this.data('target') ? $this.data('target') : $this.attr('href');
				var className = $this.data('class') ? $this.data('class') : 'active';

				hideElementsOnClick($target, element, className);
			});
		});

		var $faqcordionItems = $('.faqcordion-item');

		if( $faqcordionItems.length ) {
			$faqcordionItems.each(function() {
				var $item = $(this);
				var $trigger = $item.find('.faqcordion-trigger');

				$trigger.on('click', function() {
					$item.toggleClass('opened');
				});
			});
		}

		loadGame();

		// hash scrolling
		$('a[href^="#"]:not([href="#"])').on('click', function(event) {
			event.preventDefault();

			var hash = this.getAttribute('href');

			history.pushState({ hash: hash }, document.title, hash);

			scrollToHash(hash);
		});

		window.onpopstate = function(event) {
			if( history.state !== null ) {
				scrollToHash(history.state.hash);
			}
		}

		var $tablesWithTerms = $('.table[class*="terms-"]');

		if( $tablesWithTerms.length ) {
			$tablesWithTerms.each(function() {
				var $tableWithTerms = $(this);

				try {
					var termsIndex = parseInt($tableWithTerms.attr('class').match(/terms\-\d+/)[0].replace('terms-', ''), 10) - 1;

					$tableWithTerms.find('thead th:eq(' + termsIndex + ')').remove();

					$tableWithTerms.find('tbody tr').each(function() {
						var $row = $(this);
						var $termsCol = $row.find('> *:eq(' + termsIndex + ')');
						var $termsRow = $('<tr class="row-terms" />');

						$termsRow.append($termsCol);
						$termsCol.attr('colspan', $row.children().length);

						$row.after($termsRow);
					});
				} catch(e) {
					console.log(e);
				}
			});
		}

		var $footerCounter = $('#earnings-counter');

		if( $footerCounter.length ) {
			var countUpData = { min: 10, max: 20, currentTotal: $footerCounter.data('total') };
			var countInterval = null;

			countTo($footerCounter, 1500);

			setTimeout(function() {
				countInterval = setInterval(function() {
					var randomAmount = Math.floor((Math.random() * (countUpData.max - countUpData.min)) + countUpData.min + 1);

					countTo($footerCounter, 800, countUpData.currentTotal, countUpData.currentTotal + randomAmount);

					countUpData.currentTotal += randomAmount;
				}, 2 * 60 * 1000);
			}, 3000);
		}

		var $termsTrigger = $('span.trigger-terms'),
		$termsWrap = $('#terms-wrap');

		$termsTrigger.click(function(e){
			var $theTrigger = $(this);
			var goLinkHref;

			if( $theTrigger.parents('tr:eq(0)').find('a[href^="/-/"]').length ) {
				goLinkHref = $theTrigger.parents('tr:eq(0)').find('a[href^="/-/"]').attr('href');
			}

			if( $theTrigger.parents('tr:eq(0)').prev('tr').find('a[href^="/-/"]').length ) {
				goLinkHref = $theTrigger.parents('tr:eq(0)').prev('tr').find('a[href^="/-/"]').attr('href');
			}

			if( $theTrigger.parents('.section-primary').find('a[href^="/-/"]').length ) {
				goLinkHref = $theTrigger.parents('.section-primary').find('a[href^="/-/"]').attr('href');
			}

			if( $theTrigger.parents('.section-halves').find('a[href^="/-/"]').length ) {
				goLinkHref = $theTrigger.parents('.section-halves').find('a[href^="/-/"]').attr('href');
			}

		   e.preventDefault();
	       $termsWrap.find('#tnc')
						   .addClass('loading')
						   .find("blockquote, .terms-error, .terms-outer")
						   .remove();
	       showPopUp($termsWrap);

		   $.ajax({
			   type: 'POST',
			   url: '/wp-admin/admin-ajax.php',
			   data: {
				   action: 'loadterms',
				   op: $(this).data('operator')
			   },
			   success: function(html){
			   	/*console.log(html);*/
	                $('#tnc').removeClass('loading')
					         .append(html)
							 .find('blockquote a').removeAttr('href');

					var $termsOuter = $('#tnc').find('.terms-outer');
					if( typeof goLinkHref !== 'undefined' && ! $termsOuter.hasClass('no-override') ) {
						$termsOuter.find('a').attr('href', goLinkHref);
					}
			   },
	           error: function(){
	                $('#tnc').removeClass('loading')
							   .append("<div class=\"terms-error\">Sorry, an error occured.</div>");
	           }
		   });
		});

		$termsWrap.click(function(e){
			if( !$(e.target).is('#tnc') && !$(e.target).parents('#tnc').length ){
				e.preventDefault();
				hidePopUp($termsWrap);
			}
		});
		$('.close-me').click(function() {
			hidePopUp($termsWrap);
		});

		var $mapContainers = $('.section-halves .section-map-container');

		if( $mapContainers.length ) {
			$mapContainers.each(function() {
				var $mapContainer = $(this);
				var $mapHalf = $mapContainer.parents('.half:eq(0)');

				$mapHalf.addClass('has-map');
			});
		}

		$('#mc-embedded-subscribe-check').change(function() {
			if(this.checked) {
				$('#mc-embedded-subscribe-check').val(this.checked);
			}
			$('#mc-embedded-subscribe').toggleClass('new-disabled-btn');

		});

        function startPopup(alternativePopup) {
				$doc.on('click', alternativePopup.goLinkHref, function(event) {
				event.preventDefault();

				if( $('.popup-alternative').length ) {
					$('.geopopup-overlay').fadeIn();
				} else {
					$.ajax({
						type: 'get',
						url: alternativePopup.popupUrl,
						success: function(popup) {
							$(document.body).append(popup);
						},
						error: function(error) {
							console.log(error);
						}
					});
				}
			});
		}

        var alternativePopups = [
        { 	goLinkHref: 'a[href^="/-/us/social/slotomania"]',
		popupUrl  : '/wp-content/themes/onlinegambling/alternatives/closed-casinos.php'
        },
        { 	goLinkHref: 'a[href^="/-/us/social/house-of-fun"]',
		popupUrl  : '/wp-content/themes/onlinegambling/alternatives/closed-casinos.php'
        },
        { 	goLinkHref: 'a[href^="/-/us/social/caesarsgames"]',
		popupUrl  : '/wp-content/themes/onlinegambling/alternatives/closed-casinos.php'
        },
        { 	goLinkHref: 'a[href^="/-/us/social/vegas-words"]',
		popupUrl  : '/wp-content/themes/onlinegambling/alternatives/closed-casinos.php'
        },
        { 	goLinkHref: 'a[href^="/-/us/social/hard-rock-social-casino"]',
		popupUrl  : '/wp-content/themes/onlinegambling/alternatives/closed-casinos.php'
        },
        { 	goLinkHref: 'a[href^="/-/philippines/draftkings"], a[href^="/-/philippines/casino-room"]',
		popupUrl  : '/wp-content/themes/onlinegambling/alternatives/closed-casino-philippines.php'
        },
        { 	goLinkHref: 'a[href^="/-/zambia/multilotto"]',
		popupUrl  : '/wp-content/themes/onlinegambling/alternatives/multilotto.php'
        },
        { 	goLinkHref: 'a[href^="/-/malta/jackpotcity"]',
		popupUrl  : '/wp-content/themes/onlinegambling/alternatives/closed-casino-malta.php'
        }
        ,
        { 	goLinkHref: 'a[href^="/-/casino-las-vegas-sic-bo"], a[href^="/-/casino-las-vegas-hp"], a[href^="/-/casino-las-vegas-baccarat"], a[href^="/-/south-africa/casino-las-vegas"]',
		popupUrl  : '/wp-content/themes/onlinegambling/alternatives/closed-casino-lasvegas.php'
        },
        { 	goLinkHref: 'a[href^="/-/klasino-slots"], a[href^="/-/genting-slots"]',
		popupUrl  : '/wp-content/themes/onlinegambling/alternatives/closed-klasino.php'
        },
        { 	goLinkHref: 'a[href^="/-/us/new-jersey/888"]:not([href="/-/us/new-jersey/888casino"]):not([href="/-/us/new-jersey/888poker"])',
		popupUrl  : '/wp-content/themes/onlinegambling/alternatives/closed-888sports.php'
        },
        { 	goLinkHref: 'a[href^="/-/us/michigan/twinspires-casino"]',
		popupUrl  : '/wp-content/themes/onlinegambling/alternatives/michigan-twinspires-casino.php'
        },
        { 	goLinkHref: 'a[href^="/-/us/michigan/twinspires-sport"]',
		popupUrl  : '/wp-content/themes/onlinegambling/alternatives/michigan-twinspires-sport.php'
        },
        { 	goLinkHref: 'a[href^="/-/us/pennsylvania/twinspires-casino"]',
		popupUrl  : '/wp-content/themes/onlinegambling/alternatives/pennsylvania-twinspires-casino.php'
        },
        { 	goLinkHref: 'a[href^="/-/us/pennsylvania/twinspires-sport"]',
		popupUrl  : '/wp-content/themes/onlinegambling/alternatives/pennsylvania-twinspires-sport.php'
        },
        { 	goLinkHref: 'a[href^="/-/us/colorado/twinspires"]',
		popupUrl  : '/wp-content/themes/onlinegambling/alternatives/colorado-twinspires-casino.php'
        },
        { 	goLinkHref: 'a[href^="/-/us/indiana/twinspires"]',
		popupUrl  : '/wp-content/themes/onlinegambling/alternatives/indiana-twinspires-casino.php'
        },
        { 	goLinkHref: 'a[href^="/-/us/tennessee/twinspires"]',
		popupUrl  : '/wp-content/themes/onlinegambling/alternatives/tennessee-twinspires-casino.php'
        },
        { 	goLinkHref: 'a[href^="/-/betfair-ash-gaming"]',
		popupUrl  : '/wp-content/themes/onlinegambling/alternatives/closed-betfair.php'
        },
        { 	goLinkHref: 'a[href^="/-/betfair-craps"]',
		popupUrl  : '/wp-content/themes/onlinegambling/alternatives/closed-betfair.php'
        },
        { 	goLinkHref: 'a[href^="/-/betfair-hi-lo"]',
		popupUrl  : '/wp-content/themes/onlinegambling/alternatives/closed-betfair.php'
        },
        { 	goLinkHref: 'a[href^="/-/betfair-sic-bo"]',
		popupUrl  : '/wp-content/themes/onlinegambling/alternatives/closed-betfair.php'
        },
        { 	goLinkHref: 'a[href^="/-/betfair-slots"]',
		popupUrl  : '/wp-content/themes/onlinegambling/alternatives/closed-betfair.php'
        },
        { 	goLinkHref: 'a[href^="/-/spain/betfair"]',
		popupUrl  : '/wp-content/themes/onlinegambling/alternatives/closed-betfair.php'
        },
        { 	goLinkHref: 'a[href^="/-/leovegas"]:not([href="/-/leovegas-hp"]), a[href^="/-/leovegas-slots"], a[href^="/-/leovegas-quickspin"], a[href^="/-/leovegas-playngo"], a[href^="/-/leovegas-igt"], a[href^="/-/leovegas-microgaming"], a[href^="/-/leovegas-netent"], a[href^="/-/leovegas-nextgen"], a[href^="/-/leovegas-novomatic"], a[href^="/-/leovegas-betsoft"], a[href^="/-/germany/888poker"]',
		popupUrl  : '/wp-content/themes/onlinegambling/alternatives/closed-betfair.php'
        },
        { 	goLinkHref: 'a[href^="/-/uk/mansion"], a[href^="/-/mansion-microgaming"], a[href^="/-/mansion-netent"], a[href^="/-/casino-com-playngo"], a[href^="/-/mansion-playngo"], a[href^="/-/casino-com-quickspin"], a[href^="/-/mansion-blackjack"], a[href^="/-/casino-com-roulette"], a[href^="/-/mansion-vp"], a[href^="/-/casino-com-vp"], a[href^="/-/casino-com-holdem"], a[href^="/-/mansion-hi-lo"], a[href^="/-/casino-com-hi-lo"], a[href^="/-/casino-com-baccarat"], a[href^="/-/mansion-craps "], a[href^="/-/casino-com-craps"], a[href^="/-/mansion-paigow "], a[href^="/-/casino-com-paigow"], a[href^="/-/mansion-arcade "], a[href^="/-/mansion-keno"], a[href^="/-/mansion-reddog"], a[href^="/-/casino-com-sic-bo"], a[href^="/-/genting-slots"], a[href^="/-/royal-panda-slots"], a[href^="/-/slots-heaven-slots"], a[href^="/-/mansion-slots"], a[href^="/-/casino-com-slots"], a[href^="/-/casino-com-ash-gaming"]',
		popupUrl  : '/wp-content/themes/onlinegambling/alternatives/no-longer-affiliated.php'
        },
        { 	goLinkHref: 'a[href^="/-/us/colorado/pointsbet"], a[href^="/-/us/illinois/pointsbet"], a[href^="/-/us/indiana/pointsbet"], a[href^="/-/us/iowa/pointsbet"], a[href^="/-/us/kansas/pointsbet"], a[href^="/-/us/michigan/pointsbet"], a[href^="/-/us/new-jersey/pointsbet"]',
		popupUrl  : '/wp-content/themes/onlinegambling/alternatives/not-available.php'
        },
        { 	goLinkHref: 'a[href^="/-/mansion-bet/sports-betting-cycling"], a[href^="/-/mansion-bet/sports-betting-darts"], a[href^="/-/mansion-bet/sports-betting-golf"], a[href^="/-/mansion-bet/sports-betting-volleyball"], a[href^="/-/mansion-bet/sports-betting-cricket"]',
		popupUrl  : '/wp-content/themes/onlinegambling/alternatives/closed-sportsbook.php'
        },
        { 	goLinkHref: 'a[href^="/-/leovegas-caribbean"]',
		popupUrl  : '/wp-content/themes/onlinegambling/alternatives/closed-leovegas-caribbean.php'
        },
        { 	goLinkHref: 'a[href^="/-/casino-room-aristocrat"]',
		popupUrl  : '/wp-content/themes/onlinegambling/alternatives/closed-casino-aristocrat.php'
        },
        { 	goLinkHref: 'a[href^="/-/sweden/888poker"]',
		popupUrl  : '/wp-content/themes/onlinegambling/alternatives/closed-casino-sweden.php'
        },
        { 	goLinkHref: 'a[href^="/-/us/pennsylvania/hollywod-casino"], a[href^="/-/us/pennsylvania/hollywood-casino"]',
		popupUrl  : '/wp-content/themes/onlinegambling/alternatives/pennsylvania-hollywood.php'
        },
        { 	goLinkHref: 'a[href^="/-/uk/888sports"]',
		popupUrl  : '/wp-content/themes/onlinegambling/alternatives/closed888sports.php'
        },
        { 	goLinkHref: 'a[href^="/-/casino-room-betsoft"]',
		popupUrl  : '/wp-content/themes/onlinegambling/alternatives/closed-casino-betsoft.php'
        }
            ]
    	$('[href^="/-/us/social/"]').on('click', function() {
			$('.popup-alternative').remove();
		});

		for (var i = 0; i < alternativePopups.length; i++) {
			startPopup(alternativePopups[i]);
		}

		var $bonusSliders = $('.table-bonus-slider');

		$bonusSliders.each(function() {
			var slider = this;
			slider.innerHTML = '';
			var currency = slider.getAttribute('data-currency');
			var $statesTable = $(slider).parents('.states-table:eq(0)');
			var $table = $statesTable.find('table');
			var min = 0;
			var max = 0;
			var bonuses = [];

			var $tableRows = $table.find('tbody tr');
			var $resultsCount = $(slider).parents('.states-table:eq(0)').find('.table-heading-results > strong');
			var $clear = $(slider).parents('.states-table:eq(0)').find('.table-heading-clear');

			$tableRows.each(function() {
				var $row = $(this);
				var $bonusCell = $row.find('.t-bonus');
				var bonusValue = accounting.unformat($bonusCell.find('> strong:eq(0)').text());

				$row.data('bonus-value', bonusValue);

				bonuses.push(bonusValue);
			});

			bonuses.sort(function(a, b) {
				if( a > b ) {
					return 1;
				} else if( a < b ) {
					return -1;
				} else {
					return 0;
				}
			});
			min = bonuses[0];
			max = bonuses[bonuses.length - 1];

			var step = slider.hasAttribute('data-step') ? accounting.unformat(slider.getAttribute('data-step')) : 100;

			noUiSlider.create(slider, {
				start: max,
				step: step,
				connect: 'lower',
				tooltips: [true],
				format: {
					to: function(value) {
						return accounting.formatMoney(value, currency + ' ', 0);
					},
					from: function(value) {
						return accounting.unformat(value);
					}
				},
				range: {
					min: min,
					max: max
				}
			});

			slider.noUiSlider.on('update', function(values, handle, unencoded, tap, positions, noUiSlider) {
				var currentValue = unencoded[0];

				var $tableRows = $statesTable.find('table:eq(0) tbody tr');

				$tableRows.each(function() {
					var $row = $(this);

					$row.toggleClass('hidden', !($row.data('bonus-value') <= currentValue));
				});

				var resultsCount = $table.find('tbody tr:not(.hidden)').length;
				$resultsCount.text(resultsCount);
			});

			var $minus = $('<span class="minus"></span>');
			var $plus = $('<span class="plus"></span>')

			$(slider).before($minus).after($plus);

			$minus.on('click', function() {
				var currentValue = slider.noUiSlider.get(true);
				
				var newValue = currentValue - step;

				if( newValue < min ) {
					newValue = min;
				}

				slider.noUiSlider.set(newValue);
			});

			$plus.on('click', function() {
				var currentValue = slider.noUiSlider.get(true);
				
				var newValue = currentValue + step;

				if( newValue > max ) {
					newValue = max;
				}

				slider.noUiSlider.set(newValue);
			});

			$clear.on('click', function() {
				slider.noUiSlider.set(max);

				// set dropdown value to default here

				var holder = $clear.parents('.states-table:eq(0)')[0];
				var dd = $(holder).find('.table-state-select')[0];
				var value = dd.querySelector('.table-state-select-value');
				var currentState = value.getAttribute('data-state');

				value.classList.remove(currentState.toLowerCase());
				value.classList.add('united-states-of-america');
				value.setAttribute('data-state', 'united-states-of-america');
				value.innerHTML = 'United States';

				var params = JSON.parse(dd.parentNode.getAttribute('data-atts'));

				params['state'] = 'united-states-of-america';

				holder.classList.add('loading');

				$.ajax({
					type: 'POST',
					url: '/wp-admin/admin-ajax.php',
					data: {
						action: 'fetch_state_table',
						params: params,
						state: 'united-states-of-america'
					},
					success: function(html){
						var parser = new DOMParser();
						var newTable = parser.parseFromString(html, 'text/html');
						var oldTable = holder.querySelector('table');

						oldTable.insertAdjacentElement('afterend', newTable.querySelector('table'));
						holder.removeChild(oldTable);

						holder.classList.remove('loading');

						var bonusSlider = holder.querySelector('.table-bonus-slider');

						if( !!bonusSlider ) {
							var min = 0;
							var max = 0;
							var bonuses = [];

							var $tableRows = $(holder).find('tbody tr');

							$tableRows.each(function() {
								var $row = $(this);
								var $bonusCell = $row.find('.t-bonus');
								var bonusValue = accounting.unformat($bonusCell.find('> strong:eq(0)').text());

								$row.data('bonus-value', bonusValue);

								bonuses.push(bonusValue);
							});

							bonuses.sort(function(a, b) {
								if( a > b ) {
									return 1;
								} else if( a < b ) {
									return -1;
								} else {
									return 0;
								}
							});
							min = bonuses[0];
							max = bonuses[bonuses.length - 1];

							bonusSlider.noUiSlider.updateOptions({
								range: {
									min: min,
									max: max
								},
								start: max
							}, true);
						}

						initCodeCopy();
					},
					error: function(){
					}
				});
			});
		});

		if( $('.sharethis-inline-share-buttons').length ) {
			var scr = document.createElement('script');
			scr.src = 'https://platform-api.sharethis.com/js/sharethis.js#property=5ebe79c934ee1a00128dc61d&product=inline-share-buttons';
			scr.async = true;

			document.body.appendChild(scr);
		}

	});

	function showPopUp($termsWrap) {
		$termsWrap.show();
	}

	function hidePopUp($termsWrap) {
		$termsWrap.hide();
	}

	function scrollToHash(hash) {
		var $target = $(hash);

		if( !$target.length ) {
			return;
		}

		var offset = $target.offset().top;

		$('html,body').animate({
			scrollTop: offset
		}, {
			duration: 666,
			queue: false
		});
	}

	function loadGame(){
		$('.game-demo .game-play').on('click',function(){

			var _this = $(this);
			var _container = _this.closest('.game-demo');

			_this.closest('.game-demo').addClass("loading");
			if(_this.find('a').length>0)
				return;
			if ( $('body').hasClass('local-restrictions') )  {
				return _this
							.closest('.masked-overlay')
							.addClass('masked-message')
							.append(function() {
								 return '<div class="masked-message" ><span>We are sorry to inform you that free demo games are not available in your region due to legal requirements. You can refer to the <a href="[URL]" target="_blank" rel="nofollow noopener noreferrer">[NAME]</a> website for a full version of the game – please be advised that registration is required.</span></div>'
										.replace('[URL]', _container.data('url') )
										.replace('[NAME]', _container.data('name') );
							});
			}

			var key = _this.attr('data');
			// console.log(_this);
			$.post(
				'/wp-admin/admin-ajax.php',
				{'action' : 'embedded','data' : _this.attr('data-gameplay')},
				function(data){
					if(data==='none'){
						_this.addClass('failed');
						_this.html('<b>This Demo Game Is Available Only on Desktop</b>')
					}
					else if(data==='nope'){
						_this.addClass('failed');
						_this.html('<em></em>');
					}
					else{
						_this.closest('.game-demo').addClass('activated');
						if(getExtension(data).indexOf("swf") === 0){
							_this.closest('.game-demo').html('<embed src="'+data+'" width="100%" id="'+key+'" height="550px" >');
						} else{
							_this.closest('.game-demo').html('<iframe src="'+data+'" width="100%" id="'+key+'" height="550px" ></iframe>');
						}
					}
				}
			).fail(function(fail){console.log('fail')});
		});

	}

	function getExtension(path) {
		var basename = path.split(/[\\/]/).pop(),  // vzima filename
		pos = basename.lastIndexOf(".");       // vzima poslednata to4ka
		if (basename === "" || pos < 1)
			return "";
		return basename.slice(pos + 1);           //vzima razshirenieto bez to4kata
	}

	// Test via a getter in the options object to see if the passive property is accessed
	var supportsPassive = false;
	try {
		var opts = Object.defineProperty({}, 'passive', {
			get: function() {
				supportsPassive = true;
			}
		});
		window.addEventListener("testPassive", null, opts);
		window.removeEventListener("testPassive", null, opts);
	} catch (e) {}

	window.supportsPassive = supportsPassive;

	/**
	 * [hideElementsOnClick description]
	 *
	 * @param  { jQuery Object } $target      [ Target of click event ]
	 * @param  { String } element      		  [ Classname of the element taht should be clicked in ]
	 * @param  { String } className    		  [ The class to be removed ]
	 *
	 * @return { void }
	 */
	function hideElementsOnClick($target, element, className) {
		if (!$target.is(element + ', ' + element + ' *, .js-toggle.' + className + ', .js-toggle.' + className + ' *')) {
			$('.' + className).removeClass(className);
		}
	}

	// iOS and Android specific go links
	function linksByDevices(setUrl) {
		var ua  = navigator.userAgent.toLowerCase();
		var url = setUrl ? setUrl : '';

		if (ua.indexOf('android') > -1) {
			$('[href^="/-/' + url + '"]').each(function() {
				var $this = $(this);

				$this.attr('href', $this.attr('href') + '-android');
			});
		} else if (/ipad|iphone|ipod|macintosh/.test(ua) && 'ontouchstart' in window) {
			$('[href^="/-/' + url + '"]').each(function() {
				var $this = $(this);

				$this.attr('href', $this.attr('href') + '-ios');
			});
		}
	}

	function countTo($elem, duration, initial, final) {
		var start = typeof initial !== 'undefined' ? initial : 0;
		var end = typeof final !== 'undefined' ? final : $elem.data('total');
		var step = 16;
		var steps = Math.ceil(duration / step);
		var increment = Math.ceil((end - start) / steps);
		var iteration = 0;
		var interval = null;

		interval = setInterval(function() {
			var shouldStop = false;

			iteration++;
			var current = start + (iteration * increment);

			if( current > end ) {
				current = end;
				shouldStop = true;
			}

			$elem.html(formatCounterNumber(current));

			if( iteration === steps ) {
				shouldStop = true;
			}

			if( shouldStop ) {
				clearInterval(interval);
			}
		}, step);
	}

	function formatCounterNumber(number) {
		number = number.toString().split('');
		var result = '</span>';
		var j = 0;

		for( var i = number.length - 1; i >= 0; i-- ) {
			var digit = number[i];

			result = digit + result;

			if( j % 3 === 2 && j !== number.length - 1 ) {
				result = '</span><span>' + result;
			} else if( j === number.length - 1 ) {
				result = '<span>' + result;
			}
			j++;
		}

		return result;
	}

	function startResponsiveHref($el) {
		var hrefs = {
			mobile : $el.attr('href'),
			tablet : $el.data('href-tablet'),
			desktop: $el.data('href-desktop')
		};

		$win.on('load resize', function() {
			$el.attr('href', $win.outerWidth() > 1023 ? hrefs.desktop : $win.outerWidth() > 767 ? hrefs.tablet : hrefs.mobile);
		});
	}

	window.formatCounterNumber = formatCounterNumber;

})(window, document, jQuery.noConflict());

(function(){
	var lists = document.querySelectorAll('.list-casinos') || [];

	lists.forEach(function(list){
		var items = list.querySelectorAll('li') || [];

		if(items.length > 6)
			list.classList.add('mobile-more');

		if(items.length > 16)
			list.classList.add('desktop-more');

		list.addEventListener('click', function(event){

			if(event.target == list) {
				list.classList.add('show');

				event.preventDefault();
			}
		});
	});


})();


// Slots slider
(function(document, window) {
	var options = {
		filterHiddenClass: 'filter-hide',
		paginateHiddenClass: 'paginate-hide'
	};

	var langMenu = document.querySelectorAll('.lang-menu-container');
		langMenu = Array.prototype.slice.call(langMenu);

	if (langMenu.length) {
		langMenu.forEach(function(container) {
			var filterContainer = container.querySelector('.lang-menu-filters');
			var filterContainerItems = filterContainer.querySelectorAll('button');
			var itemsContainer = container.querySelector('.lang-menu-items');
			var pagingContainer = container.querySelector('.lang-menu-paging');
			var items = container.querySelectorAll('.lang-menu-items li');
				items = Array.prototype.slice.call(items);
			var paginatePage = 0;
			var pageItems;
			var itemsPerPage =  12;
			var currentWidth = window.innerWidth;

			if(window.innerWidth > 1200) {
				itemsPerPage = 15;
			}

			var debounce = function(func){
				var timer;
				return function(event){
					if(timer) clearTimeout(timer);
					timer = setTimeout(func, 200,event);
				};
			}

			//Filtering
			var filters = {};
			var activeItems = Array.prototype.slice.call(items);

			var filtering = function() {
				paginatePage = 0;
				Object.keys(filters).forEach(function(group) {
					activeItems = activeItems.filter(function(item) {
						var itemText = item.getAttribute('data-filter-' + group) || '';

						if (itemText.toLowerCase().indexOf(filters[group].toLowerCase()) >= 0) {
							item.classList.remove(options.filterHiddenClass);
							return true;
						}

						item.classList.add(options.filterHiddenClass);

						return false;
					});
				});
			}

			var pagingHTML = function() {
				var pages = Math.ceil(activeItems.length / itemsPerPage);
				pagingContainer.innerHTML = '';

				if(pages > 1) {
					for (var i = 0; pages - 1 >= i ; i++) {
						pagingContainer.innerHTML += "<button>"+ (i + 1) +"</button>";
					}
				}

				var pagingButtons = pagingContainer.querySelectorAll('button') || [];

				pagingButtons.forEach(function(paging, idx){
					if(idx == 0)
						paging.classList.add('active');

					paging.addEventListener('click', function(event) {
						var idx = this.innerText.replace(/ /g, '');


						pagingButtons.forEach(function(button) {
							button.classList.remove('active');
						});

						paging.classList.add('active');

						paginate(idx - 1);

						event.preventDefault();
					});

				});
			}

			//Paginate
			var paginate = function(page, isNext) {
				var count = itemsPerPage;
				var offset = 0;
				var maxPages = Math.ceil((activeItems.length + offset) / count) - 1;

				if(page >= 0) {
					paginatePage = page;
				}

				var itemsStart = (paginatePage * count)  - offset;
					itemsStart = itemsStart >= 0 ? itemsStart : 0;
				var itemsEnd = (paginatePage * count) + count - offset;
				pageItems = activeItems.slice(itemsStart, itemsEnd);

				activeItems.forEach(function(item) {
					if (pageItems.indexOf(item) >= 0) {
						item.classList.remove(options.paginateHiddenClass);

						return;
					}

					item.classList.add(options.paginateHiddenClass);
				});
			}

			// Events

			filterContainerItems.forEach(function(button, idx){

				if(idx == 0)
					button.classList.add('active');


				button.addEventListener('click', function() {
					var filterGroup = button.getAttribute('data-filter-group');

					filterContainerItems.forEach(function(btn) {
						btn.classList.remove('active');
					});

					button.classList.add('active');

					filters[filterGroup] = button.innerText;

					if(idx == 0)
						filters[filterGroup] = '';

					activeItems = Array.prototype.slice.call(items);

					filtering();
					paginate();
					pagingHTML();
				});


			});

			window.addEventListener("resize",debounce(function(e){
				if(currentWidth != window.innerWidth){
					paginatePage = 0;
					currentWidth =  window.innerWidth;
					itemsPerPage =  12;

					if(window.innerWidth > 1200) {
						itemsPerPage = 15;
					}

					filtering();
					paginate();
					pagingHTML();
				}
			}));

			//Init
			paginate();
			pagingHTML();
		});
	}
})(document, window);

(function(win, doc, $) {
	function initStateSelectDropdown(sel, onSelectCallback) {
		var value = sel.querySelector('.table-state-select-value');
		
		if( !value.hasAttribute('data-state-class') ) {
			value.setAttribute('data-state-class', value.getAttribute('data-state'));
		}

		var dropdown = sel.querySelector('.table-state-select-dropdown');
		
		var pagination = doc.createElement('div');
		pagination.classList.add('pages');

		var prev = doc.createElement('span');
		prev.classList.add('prev');

		var next = doc.createElement('span');
		next.classList.add('next');

		pagination.appendChild(prev);
		pagination.appendChild(next);

		dropdown.appendChild(pagination);

		prev.addEventListener('click', function() {
			stateSelectPrev(dropdown, pagination);
		});

		next.addEventListener('click', function() {
			stateSelectNext(dropdown, pagination);
		});

		value.addEventListener('click', function() {
			sel.classList.toggle('open');

			sel.parentNode.parentNode.classList.toggle('table-select-open');

			if( sel.classList.contains('open') ) {
				updateStateSelectDropdown(sel, dropdown, pagination);
			}
		});

		addEventListener('load', function() {
			updateStateSelectDropdown(sel, dropdown, pagination);
		});

		addEventListener('resize', function() {
			updateStateSelectDropdown(sel, dropdown, pagination);
		});

		var states = dropdown.querySelectorAll('.page > span');

		for( var i = 0; i < states.length; i++ ) {
			(function(state, dropdown, onSelectCallback) {

				function initClassesAndAttributes(){
					var old = value.getAttribute('data-state-class');
					var current = state.getAttribute('data-state');
					var currentClass = state.getAttribute('data-state-class');
					value.classList.remove(old);
					value.classList.add(currentClass);
					value.setAttribute('data-state', current);
					value.setAttribute('data-state-class', currentClass);
					value.innerHTML = state.innerHTML;
				}

				if (elems.state === state.getAttribute('data-state')){
					initClassesAndAttributes();
				}

				if( !state.hasAttribute('data-state-class') ) {
					state.setAttribute('data-state-class', state.getAttribute('data-state'));
				}

				state.addEventListener('click', function() {
					initClassesAndAttributes();

					sel.classList.remove('open');

					sel.parentNode.parentNode.classList.remove('table-select-open');

					if( typeof onSelectCallback === 'function' ) {
						onSelectCallback();
					}
				});
			})(states[i], dropdown, onSelectCallback);
		}
	}

	function updateStateSelectDropdown(sel, dd, pg) {
		var indicators = pg.querySelectorAll('.p-i');

		for( var i = 0; i < indicators.length; i++ ) {
			pg.removeChild(indicators[i]);
		}

		var ddWidth = dd.getBoundingClientRect().width;
		var pages = dd.querySelectorAll('.page');

		if( pages.length === 1 ) {
			pages[0].classList.add('small-list')
		}

		var currentWidth = pages[0].getBoundingClientRect().width;
		var numberOfPages = 1;

		for( var i = 0; i < pages.length; i++ ) {
			var page = pages[i];

			if( i === 0 ) {
				page.setAttribute('data-page', 1);
			} else {
				page.removeAttribute('data-page');
			}

			if( i > 0 ) {
				currentWidth += page.getBoundingClientRect().width;

				if( currentWidth > ddWidth ) {
					numberOfPages++;
					
					currentWidth = page.getBoundingClientRect().width;

					page.setAttribute('data-page', numberOfPages);
				}
			}
		}

		for( var i = 1; i <= numberOfPages; i++ ) {
			var indicator = doc.createElement('span');
			indicator.classList.add('p-i');
			indicator.innerHTML = i;

			pg.appendChild(indicator);

			(function(indicator, i) {
				indicator.addEventListener('click', function() {
					stateSelectGoToPage(dd, pg, i);
				});
			})(indicator, i);
		}

		var next = pg.querySelector('.next');
		pg.appendChild(next);

		var activePage = 1;

		if( dd.hasAttribute('data-current') ) {
			activePage = parseInt(dd.getAttribute('data-current'), 10);

			if( activePage > numberOfPages ) {
				activePage = numberOfPages;
			}
		}

		stateSelectGoToPage(dd, pg, activePage);
	}

	function stateSelectGoToPage(dd, pg, idx) {
		dd.classList.remove('at-beginning');
		dd.classList.remove('at-end');

		var indicators = pg.querySelectorAll('.p-i');

		var middle = idx - 1;
		var start = middle - 2;
		var end = middle + 2;

		if( start < 0 ) {
			start = 0;
			middle = 2;
			end = 4;
		}

		if( end > indicators.length - 1 ) {
			end = indicators.length - 1;
			middle = end - 2;
			start = middle - 2;
		}

		for( var i = 0; i < indicators.length; i++ ) {
			if( i >= start && i <= end ) {
				indicators[i].classList.add('visible');
			} else {
				indicators[i].classList.remove('visible');
			}

			indicators[i].classList.remove('active');
		}

		indicators[idx-1].classList.add('active');

		var pages = dd.querySelectorAll('.page');
		var offset = 0;

		for( var i = 0; i < pages.length; i++ ) {
			var page = pages[i];

			if( page.getAttribute('data-page') == idx ) {
				break;
			}

			offset -= page.getBoundingClientRect().width;
		}

		if( idx === 1 ) {
			dd.classList.add('at-beginning');
		}

		if( idx === indicators.length ) {
			dd.classList.add('at-end');

			var ddWidth = dd.getBoundingClientRect().width;
			var diff = ddWidth;

			var lastPageBeginner = dd.querySelector('[data-page="' + idx + '"]');
			var shouldAdd = false;

			for( var i = 0; i < pages.length; i++ ) {
				var page = pages[i];

				if( page === lastPageBeginner ) {
					shouldAdd = true;
				}

				if( shouldAdd ) {
					diff -= page.getBoundingClientRect().width;
				}
			}

			offset+=diff;
		}

		pages[0].style.marginLeft = offset + 'px';

		dd.setAttribute('data-current', idx);
	}

	function stateSelectPrev(dd, pg) {
		var current = dd.getAttribute('data-current');
		var total = pg.querySelectorAll('.p-i').length;

		current--;

		if( current < 1 ) {
			current = total;
		}

		stateSelectGoToPage(dd, pg, current);
	}

	function stateSelectNext(dd, pg) {
		var current = dd.getAttribute('data-current');

		var current = dd.getAttribute('data-current');
		var total = pg.querySelectorAll('.p-i').length;

		current++;

		if( current > total ) {
			current = 1;
		}

		stateSelectGoToPage(dd, pg, current);
	}

	window.initStateSelectDropdown = initStateSelectDropdown;
	window.updateStateSelectDropdown = updateStateSelectDropdown;
	window.stateSelectGoToPage = stateSelectGoToPage;
	window.stateSelectPrev = stateSelectPrev;
	window.stateSelectNext = stateSelectNext;
})(window, document, jQuery);

(function(win, doc, $) {
	var stateTables = doc.querySelectorAll('.states-table');

	if( stateTables.length ) {
		for( var i = 0; i < stateTables.length; i++ ) {
			var stateTable = stateTables[i];

			initStateTable(stateTable);
		}
	}

	function initStateTable(st) {
		var table = st.querySelector('table');
		var ths = st.querySelectorAll('thead th');

		if( ths.length ) {
			var headings = [];

			for( var i = 0; i < ths.length; i++ ) {
				headings.push(ths[i].className);
			}

			var rows = table.querySelector('tbody').children;

			for( var i = 0; i < rows.length; i++ ) {
				var cells = rows[i].children;

				for( var j = 0; j < cells.length; j++ ) {
					cells[j].classList.add(headings[j]);
				}
			}
		}

		var legalCells = st.querySelectorAll('td.t-legal');

		for( var i = 0; i < legalCells.length; i++ ) {
			var lc = legalCells[i];
			var text = lc.innerHTML;
			var parts = text.split(', ');

			if( parts.length > 5 ) {
				var remainder = parts.splice(5);
				var expander = doc.createElement('span');

				expander.classList.add('t-legal-expand');
				expander.innerHTML = remainder.join(', ');
				expander.setAttribute('data-suffix', '+' + remainder.length + ' more');

				lc.innerHTML = parts.join(', ');
				lc.appendChild(expander);

				(function(expander) {
					expander.addEventListener('mouseenter', function() {
						expander.classList.add('expanded');
					});
					expander.addEventListener('mouseleave', function() {
						expander.classList.remove('expanded');
					});
					expander.style.left = Math.round(expander.getBoundingClientRect().left - expander.parentNode.getBoundingClientRect().left) + 'px';
					addEventListener('load', function() {
						expander.style.left = Math.round(expander.getBoundingClientRect().left - expander.parentNode.getBoundingClientRect().left) + 'px';
					});
					addEventListener('resize', function() {
						expander.style.left = Math.round(expander.getBoundingClientRect().left - expander.parentNode.getBoundingClientRect().left) + 'px';
					});
				})(expander);
			}
		}
	}

	var stateSelectDropdowns = doc.querySelectorAll('.states-table .table-state-select');

	for( var i = 0; i < stateSelectDropdowns.length; i++ ) {
		var dd = stateSelectDropdowns[i];

		(function(dd) {
			initStateSelectDropdown(dd, function() {
				var holder = dd.closest('.states-table');
				var selected = dd.querySelector('.table-state-select-value').getAttribute('data-state');

				// ajax call for selected state
				var params = JSON.parse(dd.parentNode.getAttribute('data-atts'));

				if ( selected != undefined ) {
	    			params['state'] = selected;
	    		} else {
	    			params['state'] = '';
	    		}

	    		holder.classList.add('loading');

	    		$.ajax({
					type: 'POST',
					url: '/wp-admin/admin-ajax.php',
					data: {
						action: 'fetch_state_table',
						params: params,
						state: selected
					},
					success: function(html){
						var parser = new DOMParser();
						var newTable = parser.parseFromString(html, 'text/html');
						var oldTable = holder.querySelector('table');

						oldTable.insertAdjacentElement('afterend', newTable.querySelector('table'));
						holder.removeChild(oldTable);

						holder.classList.remove('loading');

						var bonusSlider = holder.querySelector('.table-bonus-slider');

						if( !!bonusSlider ) {
							var min = 0;
							var max = 0;
							var bonuses = [];

							var $tableRows = $(holder).find('tbody tr');

							$tableRows.each(function() {
								var $row = $(this);
								var $bonusCell = $row.find('.t-bonus');
								var bonusValue = accounting.unformat($bonusCell.find('> strong:eq(0)').text());

								$row.data('bonus-value', bonusValue);

								bonuses.push(bonusValue);
							});

							bonuses.sort(function(a, b) {
								if( a > b ) {
									return 1;
								} else if( a < b ) {
									return -1;
								} else {
									return 0;
								}
							});
							min = bonuses[0];
							max = bonuses[bonuses.length - 1];

							bonusSlider.noUiSlider.updateOptions({
								range: {
									min: min,
									max: max
								},
								start: max
							}, true);
						}

						initCodeCopy();
					},
					error: function(){
					}
				});
			});
		})(dd);
	}

	initCodeCopy();

	stateTables.forEach(function(table){
		if(table.classList.contains('v2')){
			let triggerTermsInternal = table.querySelector('.trigger-terms-internal');

			triggerTermsInternal.addEventListener('click', function(){
				this.classList.add('hidden');
				table.querySelector('.t-terms').classList.remove('hidden');
			});
		}
	});

})(window, document, jQuery);

(function(win, doc, $) {
	var legalityTables = doc.querySelectorAll('.legality-table');

	for( var i = 0; i < legalityTables.length; i++ ) {
		initLegalityTable(legalityTables[i]);
	}

	function initLegalityTable(lt) {
		legalityTableAddPagination(lt);

		paginateLegalityTable(lt);

		addEventListener('resize', function() {
			paginateLegalityTable(lt);
		});

		var table = lt.querySelector('table');
		var ths = lt.querySelectorAll('thead th');
		var headings = [];

		for( var i = 0; i < ths.length; i++ ) {
			headings.push(ths[i].className);
		}

		var rows = table.querySelector('tbody').children;

		for( var i = 0; i < rows.length; i++ ) {
			var cells = rows[i].children;

			for( var j = 0; j < cells.length; j++ ) {
				cells[j].className = headings[j];
				cells[j].setAttribute('data-heading', ths[j].textContent);
			}
		}

		var dd = lt.querySelector('.table-state-select');

		if( !!dd ) {
			initStateSelectDropdown(dd, function() {
				var selected = dd.querySelector('.table-state-select-value').getAttribute('data-state');

				liabilityTableGoToState(lt, selected);
			});
		}

		lt.classList.add('initialized');
	}

	function legalityTableAddPagination(lt) {
		var pagination = doc.createElement('div');
		pagination.classList.add('pages');

		var prev = doc.createElement('span');
		prev.classList.add('prev');

		var next = doc.createElement('span');
		next.classList.add('next');

		pagination.appendChild(prev);
		pagination.appendChild(next);

		lt.appendChild(pagination);

		prev.addEventListener('click', function() {
			liabilityTableGoToPrev(lt);
		});

		next.addEventListener('click', function() {
			liabilityTableGoToNext(lt);
		});
	}

	function paginateLegalityTable(lt) {
		var pg = null;
		var children = lt.children;

		for( var i = 0; i < children.length; i++ ) {
			if( children[i].classList.contains('pages') ) {
				pg = children[i];
			}
		}

		var indicators = pg.querySelectorAll('.p-i');

		for( var i = 0; i < indicators.length; i++ ) {
			pg.removeChild(indicators[i]);
		}

		var rowsPerPage = doc.body.scrollWidth < 768 ? 1 : 5;
		var rows = lt.querySelectorAll('tbody > tr');
		var rowsCount = rows.length;
		var numberOfPages = Math.ceil(rowsCount / rowsPerPage);

		var pgIncr = 0;

		for( var i = 0; i < rows.length; i++ ) {
			if( i % rowsPerPage === 0 ) {
				pgIncr++;
			}

			rows[i].setAttribute('data-page', pgIncr);
		}

		for( var i = 1; i <= numberOfPages; i++ ) {
			var indicator = doc.createElement('span');
			indicator.classList.add('p-i');
			indicator.innerHTML = i;

			pg.appendChild(indicator);

			(function(lt, indicator, i) {
				indicator.addEventListener('click', function() {
					liabilityTableGoToPage(lt, i);
				});
			})(lt, indicator, i);
		}

		var next = pg.querySelector('.next');
		pg.appendChild(next);

		var dd = lt.querySelector('.table-state-select');

		if( !!dd ) {
			var currentState = lt.querySelector('.table-state-select-value').getAttribute('data-state');

			liabilityTableGoToState(lt, currentState);
		} else {
			liabilityTableGoToPage(lt, 1);
		}
	}

	function liabilityTableGoToPrev(lt) {
		var current = lt.getAttribute('data-current');
		var pg = null;
		var children = lt.children;

		for( var i = 0; i < children.length; i++ ) {
			if( children[i].classList.contains('pages') ) {
				pg = children[i];
			}
		}

		var total = pg.querySelectorAll('.p-i').length;

		current--;

		if( current < 1 ) {
			current = total;
		}

		liabilityTableGoToPage(lt, current);
	}

	function liabilityTableGoToNext(lt) {
		var current = lt.getAttribute('data-current');
		var pg = null;
		var children = lt.children;

		for( var i = 0; i < children.length; i++ ) {
			if( children[i].classList.contains('pages') ) {
				pg = children[i];
			}
		}

		var total = pg.querySelectorAll('.p-i').length;

		current++;

		if( current > total ) {
			current = 1;
		}

		liabilityTableGoToPage(lt, current);
	}

	function liabilityTableGoToPage(lt, idx) {
		var visible = lt.querySelectorAll('tr.visible');

		for( var i = 0; i < visible.length; i++ ) {
			visible[i].classList.remove('visible');
			visible[i].classList.remove('first');
			visible[i].classList.remove('odd');
			visible[i].classList.remove('even');
		}

		var targets = lt.querySelectorAll('tr[data-page="' + idx + '"]');

		for( var i = 0; i < targets.length; i++ ) {
			targets[i].classList.add('visible');

			if( i === 0 ) {
				targets[i].classList.add('first');
			}

			var oddEven = i % 2 === 0 ? 'odd' : 'even';
			targets[i].classList.add(oddEven);
		}

		liabilityTableActivePageIndicator(lt, idx);
	}

	function liabilityTableGoToState(lt, state) {
		var visible = lt.querySelectorAll('tr.visible');

		for( var i = 0; i < visible.length; i++ ) {
			visible[i].classList.remove('visible');
			visible[i].classList.remove('first');
			visible[i].classList.remove('odd');
			visible[i].classList.remove('even');
		}

		if( state === 'washington-dc' ) {
			state = 'district-of-columbia';
		}

		var targetPage = lt.querySelector('tr[data-state="' + state + '"]').getAttribute('data-page');
		var targets = lt.querySelectorAll('tr[data-page="' + targetPage + '"]');

		for( var i = 0; i < targets.length; i++ ) {
			targets[i].classList.add('visible');

			if( i === 0 ) {
				targets[i].classList.add('first');
			}

			var oddEven = i % 2 === 0 ? 'odd' : 'even';
			targets[i].classList.add(oddEven);
		}

		liabilityTableActivePageIndicator(lt, parseInt(targetPage, 10));
	}

	function liabilityTableActivePageIndicator(lt, idx) {
		var pages = null;
		var children = lt.children;

		for( var i = 0; i < children.length; i++ ) {
			if( children[i].classList.contains('pages') ) {
				pages = children[i];
			}
		}

		var indicators = pages.querySelectorAll('.p-i');

		var middle = idx - 1;
		var start = middle - 2;
		var end = middle + 2;

		if( start < 0 ) {
			start = 0;
			middle = 2;
			end = 4;
		}

		if( end > indicators.length - 1 ) {
			end = indicators.length - 1;
			middle = end - 2;
			start = middle - 2;
		}

		for( var i = 0; i < indicators.length; i++ ) {
			if( i >= start && i <= end ) {
				indicators[i].classList.add('visible');
			} else {
				indicators[i].classList.remove('visible');
			}

			indicators[i].classList.remove('active');
		}

		indicators[idx-1].classList.add('active');

		lt.setAttribute('data-current', idx);
	}
})(window, document, jQuery);

(function(win, doc, $) {
	var genericTables = doc.querySelectorAll('.generic-table');

	for( var i = 0; i < genericTables.length; i++ ) {
		initGenericTable(genericTables[i]);
	}

	function initGenericTable(gt) {
		genericTableAddPagination(gt);

		paginateGenericTable(gt);

		addEventListener('resize', function() {
			paginateGenericTable(gt);
		});

		var table = gt.querySelector('table');
		var ths = gt.querySelectorAll('thead th');
		var headings = [];

		for( var i = 0; i < ths.length; i++ ) {
			headings.push(ths[i].className);
		}

		var rows = table.querySelector('tbody').children;

		if( table.querySelectorAll('.t-cell-terms').length ) {
			gt.classList.add('has-terms');
		}

		for( var i = 0; i < rows.length; i++ ) {
			var cells = rows[i].children;

			for( var j = 0; j < cells.length; j++ ) {
				cells[j].className = headings[j];
				cells[j].setAttribute('data-heading', ths[j].textContent);

				if( cells[j].classList.contains('hidden') ) {
					cells[j].classList.remove('hidden');
				}
			}
		}

		var legalItems = gt.querySelectorAll('.t-legal-items');

		for( var i = 0; i < legalItems.length; i++ ) {
			var lc = legalItems[i];
			var text = lc.innerHTML;
			var parts = text.split(', ');

			if( parts.length > 5 ) {
				var remainder = parts.splice(5);
				var expander = doc.createElement('span');

				expander.classList.add('t-legal-expand');
				expander.innerHTML = '<span>' + remainder.join(', ') + '</span>';
				expander.setAttribute('data-suffix', '+' + remainder.length + ' more');

				lc.innerHTML = parts.join(', ');
				lc.appendChild(expander);

				(function(expander) {
					expander.addEventListener('mouseenter', function() {
						expander.classList.add('expanded');
					});
					expander.addEventListener('mouseleave', function() {
						expander.classList.remove('expanded');
					});
					expander.style.left = Math.round(expander.getBoundingClientRect().left - expander.parentNode.getBoundingClientRect().left) + 'px';
					addEventListener('load', function() {
						expander.style.left = Math.round(expander.getBoundingClientRect().left - expander.parentNode.getBoundingClientRect().left) + 'px';
					});
					addEventListener('resize', function() {
						expander.style.left = Math.round(expander.getBoundingClientRect().left - expander.parentNode.getBoundingClientRect().left) + 'px';
					});
				})(expander);
			}
		}

		gt.classList.add('initialized');
	}

	function genericTableAddPagination(gt) {
		var pagination = doc.createElement('div');
		pagination.classList.add('pages');

		var prev = doc.createElement('span');
		prev.classList.add('prev');

		var next = doc.createElement('span');
		next.classList.add('next');

		pagination.appendChild(prev);
		pagination.appendChild(next);

		gt.appendChild(pagination);

		prev.addEventListener('click', function() {
			genericTableGoToPrev(gt);
		});

		next.addEventListener('click', function() {
			genericTableGoToNext(gt);
		});
	}

	function paginateGenericTable(gt) {
		var pg = null;
		var children = gt.children;

		for( var i = 0; i < children.length; i++ ) {
			if( children[i].classList.contains('pages') ) {
				pg = children[i];
			}
		}

		var indicators = pg.querySelectorAll('.p-i');

		for( var i = 0; i < indicators.length; i++ ) {
			pg.removeChild(indicators[i]);
		}

		var rowsPerPage = doc.body.scrollWidth < 768 ? 1 : 99999;
		var rows = gt.querySelectorAll('tbody > tr');
		var rowsCount = rows.length;
		var numberOfPages = Math.ceil(rowsCount / rowsPerPage);

		var pgIncr = 0;

		for( var i = 0; i < rows.length; i++ ) {
			if( i % rowsPerPage === 0 ) {
				pgIncr++;
			}

			rows[i].setAttribute('data-page', pgIncr);
		}

		for( var i = 1; i <= numberOfPages; i++ ) {
			var indicator = doc.createElement('span');
			indicator.classList.add('p-i');
			indicator.innerHTML = i;

			pg.appendChild(indicator);

			(function(gt, indicator, i) {
				indicator.addEventListener('click', function() {
					genericTableGoToPage(gt, i);
				});
			})(gt, indicator, i);
		}

		var next = pg.querySelector('.next');
		pg.appendChild(next);

		genericTableGoToPage(gt, 1);
	}

	function genericTableGoToPrev(gt) {
		var current = gt.getAttribute('data-current');
		var pg = null;
		var children = gt.children;

		for( var i = 0; i < children.length; i++ ) {
			if( children[i].classList.contains('pages') ) {
				pg = children[i];
			}
		}

		var total = pg.querySelectorAll('.p-i').length;

		current--;

		if( current < 1 ) {
			current = total;
		}

		genericTableGoToPage(gt, current);
	}

	function genericTableGoToNext(gt) {
		var current = gt.getAttribute('data-current');
		var pg = null;
		var children = gt.children;

		for( var i = 0; i < children.length; i++ ) {
			if( children[i].classList.contains('pages') ) {
				pg = children[i];
			}
		}

		var total = pg.querySelectorAll('.p-i').length;

		current++;

		if( current > total ) {
			current = 1;
		}

		genericTableGoToPage(gt, current);
	}

	function genericTableGoToPage(gt, idx) {
		var visible = gt.querySelectorAll('tr.visible');

		for( var i = 0; i < visible.length; i++ ) {
			visible[i].classList.remove('visible');
			visible[i].classList.remove('first');
			visible[i].classList.remove('odd');
			visible[i].classList.remove('even');
		}

		var targets = gt.querySelectorAll('tr[data-page="' + idx + '"]');

		for( var i = 0; i < targets.length; i++ ) {
			targets[i].classList.add('visible');

			if( i === 0 ) {
				targets[i].classList.add('first');
			}

			var oddEven = i % 2 === 0 ? 'odd' : 'even';
			targets[i].classList.add(oddEven);
		}

		genericTableActivePageIndicator(gt, idx);
	}

	function genericTableActivePageIndicator(gt, idx) {
		var pages = null;
		var children = gt.children;

		for( var i = 0; i < children.length; i++ ) {
			if( children[i].classList.contains('pages') ) {
				pages = children[i];
			}
		}

		var indicators = pages.querySelectorAll('.p-i');

		var middle = idx - 1;
		var start = middle - 2;
		var end = middle + 2;

		if( start < 0 ) {
			start = 0;
			middle = 2;
			end = 4;
		}

		if( end > indicators.length - 1 ) {
			end = indicators.length - 1;
			middle = end - 2;
			start = middle - 2;
		}

		for( var i = 0; i < indicators.length; i++ ) {
			if( i >= start && i <= end ) {
				indicators[i].classList.add('visible');
			} else {
				indicators[i].classList.remove('visible');
			}

			indicators[i].classList.remove('active');
		}

		indicators[idx-1].classList.add('active');

		gt.setAttribute('data-current', idx);
	}
})(window, document, jQuery);

// new intro expand paragraph on mobile
function introExpand(){
	let expandText = document.querySelectorAll('.intro-new .expand');

	expandText.forEach(function(text){
		if (window.innerWidth < 768){
			text.addEventListener('click', function(){
				this.classList.add('expanded');
			});
		} else{
			text.classList.remove('expanded');
		}
	});
}
introExpand();
window.addEventListener('resize', introExpand);

// Adding data-title
let bonusTables = document.querySelectorAll('.bonus-table-box table');
function dataTitles() {
    bonusTables.forEach(function(table) {
        let tableHeadings = table.querySelectorAll('th');
        if (table.classList.contains('data-titles'))
            return;
        table.classList.add('data-titles');
        tableHeadings.forEach(function(th, idx) {
			let tdQuery = table.querySelectorAll('td:nth-child(' + (idx + 1) + ')');
			tdQuery.forEach(function(td) {
				td.setAttribute('data-title', th.innerText)
			})
		});
    });
};
dataTitles();

// expand function for bonus table
function expandTable(){
	bonusTables.forEach(function(table){
		let expandBtn = document.createElement('span');
		
		if( !!expandBtn){
			expandBtn.classList.add('more-link');
			expandBtn.innerHTML = 'Load More Options';
			table.appendChild(expandBtn);

			expandBtn.addEventListener('click', function(){
				table.querySelectorAll('.hidden-xs').forEach(function(row){
					row.classList.remove('hidden-xs');
				});
				this.classList.add('hidden')
			});
		}
		
	});
}
expandTable();

// Item count function for bonus-table-box legal in elements
function itemCount(){
	let items = document.querySelectorAll(".item-count");

	items.forEach(function(item){
		let allItems = item.querySelectorAll('.item').length;
		let restItems = document.createElement('span');
			restItems.classList.add('rest-items');
		let hiddenItems = document.createElement('span');
			hiddenItems.classList.add('hidden-items');
		
		if (allItems > 3){
			if(item.classList.contains('four-items')){
				restItems.innerHTML = `+${allItems - 4} More`;
				Array.prototype.forEach.call(item.querySelectorAll('span:nth-child(n + 9)'), function(c){
					hiddenItems.appendChild(c);
				});
			} else{
				restItems.innerHTML = `+${allItems - 5} More`;
				Array.prototype.forEach.call(item.querySelectorAll('span:nth-child(n + 10)'), function(c){
					hiddenItems.appendChild(c);
				});
			}

			item.append(hiddenItems, restItems);
		}
		
		restItems.addEventListener('click', function(){
			this.previousSibling.classList.add('visible');
			this.classList.add('visible');
		});

		hiddenItems.addEventListener('click', function(){
			this.classList.remove('visible');
			this.nextSibling.classList.remove('visible');
		});
	});
}
itemCount();

// conclusion trigger
conclusionProCons();
function conclusionProCons(){
	let conclusion = document.querySelectorAll('.conclusion-section');

	conclusion.forEach(function(container){
		let pros = container.querySelector('.pros');
		let cons = container.querySelector('.cons');
		let prosTrigger = container.querySelector('.pros-trigger');
		let consTrigger = container.querySelector('.cons-trigger');

		pros.classList.add('active');
		prosTrigger.classList.add('active');

		prosTrigger.addEventListener('click', function(){
			if(!this.classList.contains('active')){
				pros.classList.add('active');
				this.classList.add('active');
				cons.classList.remove('active');
				consTrigger.classList.remove('active');
			}
		});

		consTrigger.addEventListener('click', function(){
			if(!this.classList.contains('active')){
				this.classList.add('active');
				cons.classList.add('active');
				pros.classList.remove('active');
				prosTrigger.classList.remove('active');
			}
		});

	});
}

// take out all how-to-box elements on desktop and slider on mobile
function debouncedResize(callback) {
	var debouncer = null;

	addEventListener('resize', function(event) {
		if( typeof debouncer === 'number' ) {
			clearTimeout(debouncer);	
		}

		debouncer = setTimeout(function() {
			callback();
			debouncer = null;
		}, 300);
	});
}

addEventListener('DOMContentLoaded', function() {
	var scrollables = document.querySelectorAll('.js-scroll');

	if( !!scrollables ) {
		for( var i = 0; i < scrollables.length; i++ ) {
			(function(scrollable) {
				initScrollable(scrollable);
			})(scrollables[i]);
		}
	}
});

function index(el) {
	if (!el) return -1;
	var i = 0;
	do {
	  i++;
	} while (el = el.previousElementSibling);
	return i;
}

function initScrollable(scrollable) {
	var inner = document.createElement('div');
	inner.classList.add('js-scroll-inner');

	var mobilePadder = document.createElement('div');
	mobilePadder.classList.add('js-mobile-pad');
	mobilePadder.textContent = '-';

	var children = scrollable.children;
	for( var i = children.length - 1; i >= 0; i-- ) {
		var el = children[i];

		if( el !== inner ) {
			inner.insertBefore(el, inner.firstChild);
		}
	}

	scrollable.appendChild(inner);

	if( scrollable.getAttribute('data-cell') !== 'tr' ) {
		inner.appendChild(mobilePadder);
	}

	var innerOffset = parseInt(getComputedStyle(inner)['padding-left'].replace('px', ''), 10);

	debouncedResize(function() {
		innerOffset = parseInt(getComputedStyle(inner)['padding-left'].replace('px', ''), 10);
	});

	scrollableResizeHandler();

	addEventListener('load', scrollableResizeHandler);
	addEventListener('load', scrollableActiveState);
	debouncedResize(scrollableResizeHandler);

	inner.addEventListener('scroll', scrollableActiveState);

	if( scrollable.classList.contains('js-arrows') ) {
		var navBox = document.createElement('div');
			navBox.classList.add('js-nav-box');

		var prev = document.createElement('span');
			prev.classList.add('js-prev');

		var next = document.createElement('span');
			next.classList.add('js-next');


		navBox.appendChild(prev);
		navBox.appendChild(next);
		scrollable.appendChild(navBox);

		prev.addEventListener('click', scrollablePreviousCell);
		next.addEventListener('click', scrollableNextCell);
	}

	if( scrollable.classList.contains('js-dots') ) {
		var dotsContainer = document.createElement('div');
		dotsContainer.classList.add('js-dots-nav');

		var cellsParent = scrollable;
		if( scrollable.hasAttribute('data-set-width') ) {
			cellsParent = scrollable.querySelector(scrollable.getAttribute('data-set-width'));
		}

		var cells = cellsParent.querySelectorAll(scrollable.getAttribute('data-cell'));

		if( !!cells ) {
			for( var i = 0; i < cells.length; i++ ) {
				(function(cell) {
					var dot = document.createElement('span');
						dot.innerText = `${i + 1}`;
						dot.classList.add('js-dot');

					dot.addEventListener('click', scrollableGoToCell);

					dotsContainer.appendChild(dot);
				})(cells[i]);
			}
		}

		scrollable.appendChild(dotsContainer);

		updateDotsVisibility();

		debouncedResize(updateDotsVisibility);
	}

	scrollableActiveState();

	function scrollableGoToCell(event) {
		if( !scrollable.classList.contains('is-scrolling') ) {
			scrollable.classList.add('is-scrolling');

			var activeIdx = index(event.target) - 1;
			var cellsParent = scrollable;

			if( scrollable.getAttribute('data-set-width') ) {
				cellsParent = scrollable.querySelector(scrollable.getAttribute('data-set-width'));
			}

			var offset = cellsParent.querySelectorAll(scrollable.getAttribute('data-cell'))[activeIdx].getBoundingClientRect().left + inner.scrollLeft - parseInt(getComputedStyle(inner)['padding-left'].replace('px', ''), 10) - scrollable.getBoundingClientRect().left;

			inner.scroll({
				left: offset,
				behavior: 'smooth'
			});

			setTimeout(function() {
				scrollable.classList.remove('is-scrolling');
			}, 500);
		}
	}

	function scrollableNextCell() {
		if( !scrollable.classList.contains('is-scrolling') ) {
			scrollable.classList.add('is-scrolling');

			var activeItem = inner.querySelector('.js-active');

			if( activeItem === null ) {
				activeItem = scrollable.querySelector(scrollable.getAttribute('data-cell'));
			}

			var nextItem = !!activeItem.nextElementSibling ? activeItem.nextElementSibling : scrollable.querySelector(scrollable.getAttribute('data-cell'));
			var offset = nextItem.getBoundingClientRect().left + inner.scrollLeft - scrollable.getBoundingClientRect().left - parseInt(getComputedStyle(inner)['padding-left'].replace('px', ''), 10);

			inner.scroll({
				left: offset,
				behavior: 'smooth'
			});

			setTimeout(function() {
				scrollable.classList.remove('is-scrolling');
			}, 500);
		}
	}

	function scrollablePreviousCell() {
		if( !scrollable.classList.contains('is-scrolling') ) {
			scrollable.classList.add('is-scrolling');

			var activeItem = scrollable.querySelector('.js-active');

			if( activeItem === null ) {
				activeItem = scrollable.querySelector(scrollable.getAttribute('data-cell'));
			}
			var cells = scrollable.querySelectorAll(scrollable.getAttribute('data-cell'));
			var prevItem = !!activeItem.previousElementSibling ? activeItem.previousElementSibling : cells[cells.length-1];

			var offset = prevItem.getBoundingClientRect().left + inner.scrollLeft - scrollable.getBoundingClientRect().left - parseInt(getComputedStyle(inner)['padding-left'].replace('px', ''), 10);

			inner.scroll({
				left: offset,
				behavior: 'smooth'
			});

			setTimeout(function() {
				scrollable.classList.remove('is-scrolling');
			}, 500);
		}
	}

	var caption = scrollable.querySelector('caption');

	function scrollableActiveState() {
		var scrollLeft = inner.scrollLeft;

		if( !!caption ) {
			caption.style.transform = 'translateX(' + scrollLeft + 'px)';
		}

		if( scrollLeft <= 0 && !scrollable.classList.contains('at-beginning') ) {
			scrollable.classList.add('at-beginning');
		} else if( scrollLeft > 0 && scrollable.classList.contains('at-beginning') ) {
			scrollable.classList.remove('at-beginning');
		}

		if( scrollLeft + inner.offsetWidth >= inner.scrollWidth && !scrollable.classList.contains('at-end') ) {
			scrollable.classList.add('at-end');
		} else if( scrollLeft + inner.offsetWidth < inner.scrollWidth && scrollable.classList.contains('at-end') ) {
			scrollable.classList.remove('at-end');
		}

		var cellsParent = scrollable;

		if( scrollable.hasAttribute('data-cell') ) {
			if( scrollable.hasAttribute('data-set-width') ) {
				cellsParent = scrollable.querySelector(scrollable.getAttribute('data-set-width'));

			}
			var cells = cellsParent.querySelectorAll(scrollable.getAttribute('data-cell'));

			if( !!cells ) {
				var activeIdx = 0;

				for( var i = 0; i < cells.length; i++ ) {
					var cellOffset = cells[i].getBoundingClientRect().left - scrollable.getBoundingClientRect().left;
					if( cellOffset >= 0 && cellOffset <= innerOffset + cells[0].offsetWidth ) {
						activeIdx = i;
						break;
					}
				}

				if( activeIdx < 0 ) {
					activeIdx = 0;
				}

				if( activeIdx > cells.length - 1 ) {
					activeIdx = cells.length - 1;
				}

				var dotsContainer = scrollable.querySelector('.js-dots-nav');

				var activeEls = inner.querySelectorAll('.js-active');

				for( var i = 0; i < activeEls.length; i++ ) {
					var activeEl = activeEls[i];

					if( !!activeEl && (index(activeEl) - 1 !== activeIdx) ) {
						activeEl.classList.remove('js-active');

						if( !!dotsContainer ) {
							dotsContainer.children[index(activeEl) - 1].classList.remove('js-active');
						}
					}
				}

				if( !cells[activeIdx].classList.contains('js-active') ) {
					cells[activeIdx].classList.add('js-active');

					if( !!dotsContainer && !dotsContainer.children[activeIdx].classList.contains('js-active') ) {
						dotsContainer.children[activeIdx].classList.add('js-active');
					}
				}
			}
		}
	}

	function scrollableResizeHandler() {
		if( scrollable.hasAttribute('data-set-width') ) {
			var widthApplier = scrollable.querySelector(scrollable.getAttribute('data-set-width'));

			if( !!widthApplier ) {
				widthApplier.style.minWidth = '0px';
				widthApplier.style.minWidth = inner.scrollWidth + 'px';
			}
		}
	}

	function updateDotsVisibility() {
		var firstCell = scrollable.querySelector(scrollable.getAttribute('data-cell'));

		if( scrollable.hasAttribute('data-set-width') ) {
			firstCell = scrollable.querySelector(scrollable.getAttribute('data-set-width'));
			firstCell = firstCell.querySelector(scrollable.getAttribute('data-cell'));
		}

		var limit = Math.floor(inner.getBoundingClientRect().width / firstCell.getBoundingClientRect().width) - 1;

		for( var i = dotsContainer.children.length - 1; i >= 0; i-- ) {
			var dot = dotsContainer.children[i];

			if( i >= scrollable.querySelectorAll(scrollable.getAttribute('data-cell')).length - limit && limit > 0 ) {
				dot.classList.add('js-hidden');
			} else {
				dot.classList.remove('js-hidden');
			}
		}
	}
}

let howTos = document.querySelectorAll('.how-to-section.v2');

if(!!howTos){
	howTos.forEach(function(howTo){
		let slider = howTo.querySelector('.how-to-boxes');
		let heading = howTo.querySelector('.heading-box');
		let hiddenEl = howTo.querySelectorAll('.heading-box .hidden-xs');
		let expandBtn = howTo.querySelector('.expand-btn');

		function toggleHowToBox() {
			let winW = document.body.offsetWidth;

			if( winW < 650 ) {
				howTo.prepend(heading);
			} else if( winW >= 650 ) {
				slider.firstChild.nextElementSibling.prepend(heading);
			}
		}

		addEventListener('resize', toggleHowToBox);
        addEventListener('load', toggleHowToBox);

		expandBtn.addEventListener('click', function(){
			hiddenEl.forEach(function(element){
				element.classList.toggle('hidden-xs');
				expandBtn.classList.toggle('close');
			});
		});
	});
}

function initCodeCopy() {
	var bonusCodes = document.querySelectorAll('.t-copy-code:not(.initialized)');

	for( var i = 0; i < bonusCodes.length; i++ ) {
		(function(bonusCode) {
			bonusCode.classList.add('initialized');

			if( bonusCode.classList.contains('not-required') && bonusCode.parentNode.parentNode.tagName.toLowerCase() === 'tr' ) {
				var golink = bonusCode.parentNode.parentNode.querySelector('a[target="_blank"]');

				if( !!golink ) {
					var l = document.createElement('a');

					l.setAttribute('target', '_blank');
					l.setAttribute('href', golink.getAttribute('href'));
					l.setAttribute('rel', 'nofollow');
					
					if( bonusCode.parentNode.parentNode.parentNode.children.length === 1 ) {
						l.innerHTML = 'Click here!';

						bonusCode.innerHTML = l.outerHTML;
					} else {
						l.innerHTML = 'Check here';

						if( bonusCode.hasAttributes() ) {
							for( var attr of bonusCode.attributes ) {
								l.setAttribute(attr.name, attr.value);
							}
						}

						bonusCode.insertAdjacentElement('afterend', l);
						bonusCode.parentNode.removeChild(bonusCode);
					}
				}
			} else if( typeof navigator.clipboard === 'object' ) {
				bonusCode.classList.add('can-copy');

				bonusCode.addEventListener('click', function(event) {
					if( !bonusCode.classList.contains('copied') ) {
						try {
							navigator.clipboard.writeText(bonusCode.textContent).then(function() {
								bonusCode.classList.add('copied');
								bonusCode.setAttribute('data-code', bonusCode.textContent);
								bonusCode.innerHTML = 'Copied';

								setTimeout(function() {
									bonusCode.classList.remove('copied');
									bonusCode.innerHTML = bonusCode.getAttribute('data-code');
								}, 2000);
							});
						} catch(err) {
							console.log(err);
						}
					}
				});
			}
		})(bonusCodes[i]);
	}
}

;(function(window, document, $){
	const allStates = { "AL": "Alabama", "AK": "Alaska", "AS": "American Samoa", "AZ": "Arizona", "AR": "Arkansas", "CA": "California", "CO": "Colorado", "CT": "Connecticut", "DE": "Delaware", "DC": "District Of Columbia", "FM": "Federated States Of Micronesia", "FL": "Florida", "GA": "Georgia", "GU": "Guam", "HI": "Hawaii", "ID": "Idaho", "IL": "Illinois", "IN": "Indiana", "IA": "Iowa", "KS": "Kansas", "KY": "Kentucky", "LA": "Louisiana", "ME": "Maine", "MH": "Marshall Islands", "MD": "Maryland", "MA": "Massachusetts", "MI": "Michigan", "MN": "Minnesota", "MS": "Mississippi", "MO": "Missouri", "MT": "Montana", "NE": "Nebraska", "NV": "Nevada", "NH": "New Hampshire", "NJ": "New Jersey", "NM": "New Mexico", "NY": "New York", "NC": "North Carolina", "ND": "North Dakota", "MP": "Northern Mariana Islands", "OH": "Ohio", "OK": "Oklahoma", "OR": "Oregon", "PW": "Palau", "PA": "Pennsylvania", "PR": "Puerto Rico", "RI": "Rhode Island", "SC": "South Carolina", "SD": "South Dakota", "TN": "Tennessee", "TX": "Texas", "UT": "Utah", "VT": "Vermont", "VI": "Virgin Islands", "VA": "Virginia", "WA": "Washington", "WV": "West Virginia", "WI": "Wisconsin", "WY": "Wyoming" };
	
	initVectorMap($('.vector-map'));
	function initVectorMap($container) {
		var paths = '';
		var options = '';
		var lis = '';
		var stats = {
			"legal": 0,
			"ilegal": 0,
			"pending": 0
		}
	
		if (!$container.find('script').length) {
			return;
		}
	
		var jsonObj = $container.find('script')[0].innerText;
		var obj = {
			legal: {
				options: '',
				lis: ''
			},
			pending: {
				options: '',
				lis: ''
			},
			illegal: {
				options: '',
				lis: ''
			}
		};
		jsonObj = JSON.parse(jsonObj);
	
		for (const key in jsonObj) {
			var state = jsonObj[key];
			var legal = 'illegal';
	
			if (!state.hasOwnProperty('hide')) {
				if(state.legal == true) {
					legal = 'legal';
					stats.legal++;
				} else if(state.legal == 'pending') {
					legal = 'pending';
					stats.pending++;
				} else {
					stats.ilegal++;
				}
	
				paths += `<path d="${state.path}" ${state.href == undefined || state.href == false ? '' : `data-href="${state.href}"`} ${state.legalSince == undefined || state.legalSince == false ? '' : `data-legal-since="${state.legalSince}"`} ${state.license == undefined || state.license == false ? '' : `data-license="${state.license}"`} data-title="${allStates[key.toUpperCase()]}"  data-code="${key}" fill-opacity="1" stroke-width="0" stroke-opacity="1" fill-rule="evenodd" class="state ${legal}" ></path>`;
	
	
				obj[legal]['options'] += `<option data-state="${key}" value="${state.href}" ${state.href == undefined || state.href == false ? 'disabled' : ``} >${allStates[key.toUpperCase()]}</option>`;
				obj[legal]['lis'] += `<li class="${legal} asset statecircle before xs ${state.className}"><${state.href != false ? `a` : 'span'} ${state.href != false ? `href="${state.href}"` : ''}>${allStates[key.toUpperCase()]}</${state.href != false ? `a` : 'span'}></li>`;
			}
		}
	
		options = `
		   <optgroup label="Legal States">${obj.legal.options}</optgroup>
		   <optgroup label="Pending Legalisation">${obj.pending.options}</optgroup>
		   <optgroup label="Illegal States">${obj.illegal.options}</optgroup>
		`;
		lis = `
		   <li class="title legal-title"><span>Legal States:</span></li>
		   ${obj.legal.lis}
		   <li class="title pending-title"><span>Pending Legalisation:</span></li>
		   ${obj.pending.lis}
		   <li class="title illegal-title"><span>Illegal States:</span></li>
		   ${obj.illegal.lis}
		`;
	
		$container.html(`
			<div class="legend">
				<div class="legend-select"><select><option value="">Select a State</option>${options}</select><ul>${lis}</ul></div>
				<div class="legend-title">Online Sports Betting Activity</div>
				<ul>
					<li class="legal">Legal States <span>(${stats.legal} State${stats.legal == 1 ? '' : 's'})</span></li>
					<li class="illegal">Illegal States <span>(${stats.ilegal} State${stats.ilegal == 1 ? '' : 's'})</span></li>
					<li class="pending">Pending Legalisation <span>(${stats.pending} State${stats.pending == 1 ? '' : 's'})</span></li>
				</ul>
				<p class="hidden-xs legal-landscape">Legal Landscape as of March 16, 2022</p>
			</div>
			<div class="map">
				<svg width="100%" height="100%"><g>${paths}</g></svg>
				<span class="name hidden"></span>
				<p class="visible-mobile legal-landscape">Legal Landscape as of March 16, 2022</p>
			</div>
		`);
	
		var $select = $container.find('select');
	
		$select.on('change selectTrigger', function(event) {
			$select.parent().attr('data-title', $select.find('option:selected').text());
	
			if (event.type != 'selectTrigger') {
			window.location.href = $select.val();
			}
		}).trigger('selectTrigger');
	
		// $container.find('.legend-select').on('click', function(event) {
		// 	if (event.target == event.delegateTarget) {
		// 		$(this).toggleClass('open');
		// 		$(this).find('ul').toggleClass('show-menu');
		// 	}
		// });

		$(document).on('click', function(event) {
			var $listTarget = $container.find('.legend-select');

			if (!$listTarget.is(event.target) && !$listTarget.has(event.target).length && $listTarget.hasClass('open')){
				$listTarget.removeClass('open');
				$listTarget.find('ul').removeClass('show-menu');
			} else if ($listTarget.is(event.target) || $listTarget.children().is(event.target)) {
				$listTarget.toggleClass('open');
				$listTarget.find('ul').toggleClass('show-menu');
			} 
		});
	
		var $name = $container.find('.name');
		var $win = $('window');
		$container.find('path').on('mouseenter mousemove mouseleave click', function(event) {
			var $el = $(this);
			var elData= $el.data();
			var comingSoon =  '<em>Page coming soon</em>';
	
			$name
				.stop()
				.toggleClass('hidden', event.type == 'mouseleave')
				.html(`
					<span class="title">${elData.title }</span>
					${elData.legalSince == undefined || elData.legalSince == false ? '' : `<span class="legal-since">${elData.legalSince}</span>`}
					${elData.license == undefined || elData.license == false ? '' : `<span class="license">${elData.license}</span>`}
					${elData.href == undefined && elData.href != '#' && !$el.hasClass('illegal') ? comingSoon : '' }
				`)
				.css({
					top: event.pageY - $container.find('.map').offset().top,
					left: event.pageX - $container.find('.map').offset().left
				});
	
			if (elData.href != false && event.type == 'click') {
				window.location.href = elData.href
			}
	
			if ( !$el.data("href") ){
				$(this).unbind('click');
			}
		});
	}
})(window, document, jQuery.noConflict());

(function(window, document){
	function vectorMapPagination(){
		if(document.querySelector('.vector-map')){
			let paginatedList = document.querySelector('.legend-select ul');
			let listItems = paginatedList.querySelectorAll("li");
			let paginationNumbers = document.createElement('div');
				paginationNumbers.classList.add('pagination-numbers');
			let paginationNavigation = document.createElement('div');
				paginationNavigation.classList.add('pagination-navigation');

			let nextButton = document.createElement('button');
				nextButton.classList.add("next-button");
			let prevButton = document.createElement("button");
				prevButton.classList.add("prev-button");

			paginationNavigation.appendChild(prevButton);
			paginationNavigation.appendChild(nextButton);	

			if (!paginatedList.querySelector('.pagination-numbers')){
				paginatedList.appendChild(paginationNumbers);
				paginatedList.appendChild(paginationNavigation);
			}
		
			const disableButton = (button) => {
				button.classList.add("disabled");
				button.setAttribute("disabled", true);
			};
		
			const enableButton = (button) => {
				button.classList.remove("disabled");
				button.removeAttribute("disabled");
			};

			let paginationLimit;
			let paginationLimitCache;

			const paginationLimits = () => {
				if (window.innerWidth <= 767){
					paginationLimit = 10;
				} else {
					paginationLimit = 20;
				}

				if (paginationLimitCache != paginationLimit && paginationLimitCache){
					pageCount = Math.ceil(listItems.length / paginationLimit);
					getPaginationNumbers();
					setCurrentPage(1);
				}
				
				paginationLimitCache = paginationLimit;
			}
			
			paginationLimits();
			window.addEventListener('resize', paginationLimits);
			
			let currentPage = 1;
			
			let pageCount = Math.ceil(listItems.length / paginationLimit);
			const handlePageButtonsStatus = () => {
				if (currentPage === 1) {
					disableButton(prevButton);
				} else {
					enableButton(prevButton);
				}
			
				if (pageCount === currentPage) {
					disableButton(nextButton);
				} else {
					enableButton(nextButton);
				}
			};
		
			const handleActivePageNumber = () => {
				document.querySelectorAll(".pagination-number").forEach((button) => {
					button.classList.remove("active");
					const pageIndex = parseInt(button.getAttribute("page-index"));
					if (pageIndex == currentPage) {
						button.classList.add("active");
					}
				});
			};
		
			const appendPageNumber = (index) => {
				let pageNumber = document.createElement("button");
				pageNumber.className = "pagination-number";
				pageNumber.innerHTML = index;
				pageNumber.setAttribute("page-index", index);
				
				paginationNumbers.appendChild(pageNumber);
			};
		
			const getPaginationNumbers = () => {
				paginationNumbers.innerHTML = '';
				for (let i = 1; i <= pageCount; i++) {
					appendPageNumber(i);
				}
			};
		
			const setCurrentPage = (pageNum) => {
				currentPage = pageNum;
			
				handleActivePageNumber();
				handlePageButtonsStatus();
			
				const prevRange = (pageNum - 1) * paginationLimit;
				const currRange = pageNum * paginationLimit;
			
				listItems.forEach((item, index) => {
					item.classList.add("hidden");
					if (index >= prevRange && index < currRange) {
						item.classList.remove("hidden");
					}
				});
			};
		
			getPaginationNumbers();
			setCurrentPage(1);
		
			prevButton.addEventListener("click", () => {
				setCurrentPage(currentPage - 1);
			});
		
			nextButton.addEventListener("click", () => {
				setCurrentPage(currentPage + 1);
			});

			document.addEventListener('click', function(e) {
				if (e.target.classList.contains('pagination-number')) {
					const pageIndex = parseInt(e.target.getAttribute("page-index"));
					if (pageIndex) {
						setCurrentPage(pageIndex);
					}
				}
			});
		}
	}
	vectorMapPagination();
})(window, document);


let loadMoreOpt = document.querySelectorAll('.load-more-options');
if(!!loadMoreOpt){
	for(var i=0; i<loadMoreOpt.length; i++){
		loadMoreOpt[i].addEventListener('click', function(){
			var parentDiv = this.closest('.legality-table-new');
			function expandOptionsList(node, prefix) {
				var regx = new RegExp('\\b' + prefix + '[^ ]*[ ]?\\b', 'g');
				node.className = node.className.replace(regx, '');
				return node;
			}
			expandOptionsList(parentDiv, 'show-');
			this.remove();
		});
	}
}
