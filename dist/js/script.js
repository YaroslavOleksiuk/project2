$(document).ready(function(){
		$('.carousel__inner').slick({
				infinite: true,
				speed: 1200,
				slidesToShow: 1,
				// adaptiveHeight: true,
				prevArrow: '<button type="button" class="slick-prev"><img src="icons/left_arrow.svg"></button>',
				nextArrow: '<button type="button" class="slick-next"><img src="icons/right_arrow.svg"></button>',
				responsive: [
						{
							breakpoint: 768,
							settings: {
								arrows: false,
								dots: true
							}
						}
				]
		});

		$('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
			$(this)
				.addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
				.closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
		});

		function toggleSlide(className) {
			$(className).each(function(i) {
				$(this).on('click', function(e) {
					e.preventDefault();
					$('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
					$('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
				})
			});
		}
		toggleSlide('.catalog-item__link');
		toggleSlide('.catalog-item__back');

		// MOdal

		$('[data-modal=consultation]').on('click', function() {
			$('.overlay, #consultation').fadeIn('slow');
		});
		$('.modal__close').on('click', function() {
			$('.overlay, #consultation, #order, #thanks').fadeOut('slow');
		});
		$('.button_mini').on('click', function() {
			$('.overlay, #order').fadeIn('slow');
		});
		$('.button_mini').each(function(i) {
			$(this).on('click', function() {
				$('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
				$('.overlay, #order').fadeIn('slow');
			})
		});

		function valideForms(form) {
			$(form).validate({
				rules: {
					name: "required",
					phone: "required",
					email: {
						required: true,
						email: true
					}
				},
				messages: {
					name: "Пожалуйста, введите своё имя",
					phone: "Пожалуйста, введите свой номер телефона",
					email: {
						required: "Пожалуйста, введите свой e-mail",
						email: "Ваш e-mail должен быть в формате: name@domain.com"
					}
				}
			});
		}
		valideForms('#consultation-form');
		valideForms('#consultation form');
		valideForms('#order form');

		$('input[name=phone').mask("+ 7 (999) 999-99-99");

		$('form').submit(function (e) {
			e.preventDefault();

			if(!$(this).valid()) {
				return;
			}

			$.ajax({
				type: "POST",
				url: "mailer/smart.php",
				data: $(this).serialize()
			}).done(function() {
				$(this).find("input").val("");
				$('#consultation, #order').fadeOut();
				$('.overlay, #thanks').fadeIn('slow');
				$('form').trigger('reset');
			});
			return false;
		});
		
		//Smooth scroll and page up

		$(window).scroll(function() {
			if($(this).scrollTop() > 1200) {
				$('.pageup').fadeIn();
			} else {
				$('.pageup').fadeOut();
			}
		});

		// Add smooth scrolling to all links
		$("a").on('click', function(event) {

			// Make sure this.hash has a value before overriding default behavior
			if (this.hash !== "") {
			  // Prevent default anchor click behavior
			  event.preventDefault();
		
			  // Store hash
			  var hash = this.hash;
		
			  // Using jQuery's animate() method to add smooth page scroll
			  // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
			  $('html, body').animate({
				scrollTop: $(hash).offset().top
			  }, 800, function(){
		
				// Add hash (#) to URL when done scrolling (default click behavior)
				window.location.hash = hash;
			  });
			} // End if
		  });
		
	});