jQuery(window).ready(function($) {

"use strict";


/*===========================================================*/
/*  Mobile
/*===========================================================*/

(function(){

	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {

		$('.masonry-grid-item').each(function(){

			var $this = $(this);
			var link = $this.find('.info a').attr('href');
			$this.find('.hover-box').wrap('<a href="' + link + '"></a>');
			$this.addClass('on_mobile');

		})

	}

})();


/*===========================================================*/
/*	Loading Animation
/*===========================================================*/

(function(){

	NProgress.start();

	NProgress.done();

	//Background images Fade In (fixes background flicker)

	setTimeout(function(){

		$('.bg-image').animate({'opacity' : '1'}, 1000);

	}, 1500);

	//  WOW Init and Portfolio Items Fade In

	setTimeout(function(){

		$('.main-content').addClass('wow fadeIn')

		WOW = new WOW({
			boxClass: 'wow',
			animateClass: 'animated',
			offset: 150
		})
		WOW.init();

		$('#portfolio li, .services-list li').css('opacity', '0').each(function(i){

			var $item = $(this);

			setTimeout(function(){
				$item.css('opacity', '1');
			}, i*210);

			i++;

		});

	}, 400);

})();


/*===========================================================*/
/*	bxSlider
/*===========================================================*/

$('.normal-slides').bxSlider({
	mode: 'fade',
	pause: 6000,
	auto: true,
	nextText: '',
	prevText: '',
	pager: false,
	onSliderLoad: function(currentIndex) {

		if ( $('.normal-slider').hasClass('full-slider') ) {
			$('.normal-slides > li').css({'width' : '100%'});
		}

		$('.normal-slides > li').eq(currentIndex).addClass('active-slide').imagesLoaded(function(){

			resizeSlider();

		});

		// Scale In Caption
		$('.normal-slides > li').eq(currentIndex).addClass('active-slide').imagesLoaded(function(){

			var $firstSlide = $(this);

			$('.slide-caption', $('.normal-slides > li').eq(currentIndex)).each(function(){

				var $this = $(this)

				setTimeout(function(){

					$this.transition({
						delay: 800,
						scale: 1
					}, 500, 'ease');

				}, 500);

			});

			resizeSlider();

		});


		//Resize Slider and keep ratio
		function resizeSlider() {

			var $window = $(window);
			var windowsize = $window.width();

			var $firstSlide = $('.normal-slides > li').eq(0);
			var firstImgRatio = $firstSlide.parents('.bx-viewport').attr('data-ratio')

			if ( $('.normal-slider').hasClass('full-slider') ) {

				var cWidth = $('.main-content').width();
				var cHeight = $(window).height();

				$('.normal-slides > li > img').each(function(){

				var img = this;
				var new_img = new Image();

				// Get the width and height of the slider image
				new_img.onload = function() {

					var imgWidth = this.width;
					var imgHeight = this.height;

					var ratio = cWidth / imgWidth;

					if ( imgHeight * ratio < cHeight ) {
						//Image is shorter than container so it's stretched
						$(img).addClass('first').css({ 'height' : '100%', 'max-height' : '100%', 'width' : 'auto', 'max-width' : 'none' });
					} else {
						//Image is widet than container so it's contained
						$(img).addClass('second').css({ 'height' : 'auto', 'max-height' : 'none', 'width' : '100%', 'max-width' : '100%' });
					}
				}

				new_img.src = img.src;

			})

			}

			$firstSlide.parents('.bx-viewport').css( 'height', cHeight );
			$('.normal-slides > li').css( 'height', cHeight );

		}

		//Bind resize event to keep the ratio
		$(window).bind("resize", resizeSlider);

	},
	onSlideBefore: function($slideElement, oldIndex, newIndex) {

		//Removes class from the previous slide
		$('.normal-slides > li').eq(oldIndex).removeClass('active-slide');

		$slideElement.addClass('active-slide');

		//Scale In Caption
		$('.slide-caption', $slideElement).transition({
			scale: 0,
			duration: 300
		});


	},
	onSlideAfter: function($slideElement, oldIndex, newIndex) {

		//Scale In Caption
		$('.slide-caption', $slideElement).each(function(){

			var $this = $(this)

			setTimeout(function(){

				$this.transition({
					delay: 0,
					scale: 1
				}, 500, 'ease');

			}, 300);

		});

	}
});

var testimonialsSlider = $('.testimonials-slides').bxSlider({
	mode: 'fade',
	auto: true,
	pager: true,
	nextText: '',
	prevText: '',
	controls: false,
	prevSelector: '.testimonials-controls .prev',
	nextSelector: '.testimonials-controls .next',
	speed: 800
});

var projectSlider = $('.project-slides').bxSlider({
	pager: false,
	controls: true,
	adaptiveHeight: true,
	pagerType: 'short',
	prevSelector: '.project-controls .prev',
	nextSelector: '.project-controls .next',
	nextText: '',
	prevText: '',
	speed: 800,
	onSliderLoad: function(currentIndex) {
		//Custom Pager
		var totalSlides = $('.project-slider .project-slides > li').not('.bx-clone').length;

		$('.project-pager .slide-current').html(currentIndex + 1);
		$('.project-pager .slides-total').html(totalSlides);

		//Keyboard Nav

		$(document).keydown(function(e){
			if (e.keyCode == 39) {
				projectSlider.goToNextSlide();
				return false;
			}
			else if (e.keyCode == 37) {
				projectSlider.goToPrevSlide();
				return false;
			}
		});
	},
	onSlideBefore: function($slideElement, oldIndex, newIndex) {
		$('.project-pager .slide-current').html(newIndex + 1);
	}
});


/*===========================================================*/
/*	Sidebar Scrollbar
/*===========================================================*/

$('#header').perfectScrollbar({
	wheelSpeed: 20
});

/*===========================================================*/
/*	Add SPANS to nav menu
/*===========================================================*/

$('#nav-container > ul a').each(function(){

	var $this = $(this);

	if ( $this.next().hasClass('sub-menu') ) {
		$this.after('<i class="fa fa-angle-right"></i>');
	}

})

/*===========================================================*/
/*  Nav Menu Accordion
/*===========================================================*/

$('#nav-container a').click(function(e) {
	/* Finding the drop down list that corresponds to the current section: */

	var $this = $(this);
	var dropdownMenu = $this.siblings('.sub-menu');

	if ($this.parent('li').children('.sub-menu').length > 0) {

		if ( $this.hasClass('toggled') ) {
			$this.siblings('.fa-angle-right').removeClass('fa-rotate-90');
			$this.removeClass('toggled');
		} else {
			$this.siblings('.fa-angle-right').addClass('fa-rotate-90');
			$this.addClass('toggled');
		}

		e.preventDefault();

		$('.sub-menu').not(dropdownMenu).not(dropdownMenu.parents()).slideUp('fast').siblings('i').removeClass('fa-rotate-90').siblings('a').removeClass('toggled');

		$(dropdownMenu).slideToggle('fast', function(){
			$('#header').perfectScrollbar('update');
		});
	}
});

/*===========================================================*/
/*  Mobile navigation
/*===========================================================*/

var navText = "Navigate to...";

$('#nav-container > ul').mobileMenu({
	defaultText: navText,
	className: 'select-menu',
	subMenuDash: '&nbsp;&nbsp;&nbsp;-&nbsp;'
});

// Mobile menu styling
$('#nav-container select').each(function(){

	$(this).css({'z-index':10,'opacity':0,'-khtml-appearance':'none'}).after('<span class="select">' + navText + '<i class="icon-menu"></i></span>');
});

/*===========================================================*/
/*	fitVids
/*===========================================================*/
$('.fluid-video').fitVids();

/*===========================================================*/
/*	Queries
/*===========================================================*/

var $container = $('.masonry-grid');
var hey = 0;


function checkWidth() {

	var $window = $(window);
	var masonryCol = 3; //Masonry Columns
	var windowsize = $window.width();

	$container.imagesLoaded( function() {

		if (windowsize >= 992) {
			masonryCol = 3;
		}
		else if ( windowsize > 767 && windowsize < 992 ) {
			masonryCol = 2;
		} else {
			masonryCol = 1;
		}

		// Uncomment if you want to change column number
		// else if ( (windowsize < 992) && (windowsize >= 768) ) {
		// 	masonryCol = 2;
		// }
		// else if (windowsize < 768) {
		// 	masonryCol = 2;
		// }

		var containerW = $container.width();
		var ImageW= Math.floor(containerW / masonryCol);
		var columnW = Math.floor(containerW / masonryCol);

		$('.masonry-grid-item').each(function(){
			var $this = $(this);

			if ($this.hasClass('featured') && windowsize >= 992 ) {
				$this.css({'width':ImageW*2});
				$this.find('img').css({'width':ImageW*2});
			} else {
				$this.css({'width':ImageW});
			}

		})

		$container.isotope({
			masonry: {
				resizable: false,
				columnWidth: columnW,
				itemSelector: '.masonry-grid-item',
				isAnimated: true,
				complete: setTimeout( function(){
					$container.isotope('reLayout');
					if(navigator.appVersion.indexOf("MSIE")!=-1 && hey==0){
						hey=100;
						$(window).trigger('resize');
					}
				}, 300)
			}
		})

	});


}// end checkWidth()

// Execute on load
checkWidth();

// Bind event listener
$(function() {

	$(window).bind("resize", function() {

		setTimeout( function() {
			checkWidth();
		}, 200 );

		$('#header').perfectScrollbar('update');

	});

});

/*===========================================================*/
/*	Filter items when filter link is clicked
/*===========================================================*/

$('.filter a').on('click', function(){

	var selector = $(this).attr('data-filter');
	$(this).parents('.filters').find('.selected').removeClass('selected');
	$(this).parent().addClass('selected');
	$container.isotope({ filter: selector });
	return false;

});

/*===========================================================*/
/*	Parallax
/*===========================================================*/

function parallax(){
	var scrolled = $(window).scrollTop();
	$('.parallax').css('background-position', 'left 0% top ' + -(scrolled * 0.3) + 'px');
}

$(window).scroll(function(e){
    parallax();
});

/*===========================================================*/
/* Background Image
/*===========================================================*/
$('.bg-image').each(function(){

	var bgImg  = $(this).data('bgimage');

	if (bgImg && bgImg !='') {
		$(this).css('background-image', "url('" + bgImg + "')");

	}

})


/*===========================================================*/
/*	Icon Toggle
/*===========================================================*/

$('button[data-toggle=collapse]').on('click', function(){

	var $this = $(this),
	$target = $($this.data('target')),
	accParent = $this.data('parent');


	if ( $target.hasClass('collapse') ) {
		$this.addClass('active').find('.fa-angle-left').transition({rotate:'-90deg'});
	} else {
		$this.removeClass('active').find('.fa-angle-left').transition({rotate:'0deg'});
	}

	$(accParent + " button").not($this)
	.removeClass('active').find('.fa-angle-left').transition({rotate:'0deg'});

});

function elementAppear(){

	var $charts = $('.chart');

	$charts.each(function(){

		$(this).bind('inview', function(event, isInView, visiblePartX, visiblePartY) {

		 var skillId  = $(this).attr('id');

		if (skillId !='') {

			$('#' + skillId).easyPieChart({

				barColor: '#ef97ae',
				trackColor: '#fff',
				scaleColor: false,
				easing: 'easeOutBounce',
				lineCap: 'butt',
				size: 180,
				lineWidth: 20,
				animate: 2000,
				onStart: function(from, to, percent) {
					$(this.el).append('<span class="percent"></span>');
				},
				onStep: function(from, to, percent) {
					$(this.el).find('.percent').text(Math.round(percent));
				}
			});
		}

	});

	})


}

$(window).scroll(elementAppear());

});