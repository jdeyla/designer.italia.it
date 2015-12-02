/*global jQuery:false */

'use strict';

(function ($, undefined) {

  /* @FIXME: Pre examples (hack)
   * ---------------------------
   *  Converte gli esempi markdown / html e crea un div "collapsible"
   *  per mostrare / nascondere il codice 
   */
  $('pre').each(function doExample() {
    doExample.count = doExample.count ? doExample.count + 1 : 1;
    var id = 'code-collapse-' + doExample.count,
      showLinkTextOpen = 'Mostra il codice',
      showLinkTextClose = 'Nascondi il codice',
      $showLink = $('<a class="lg-example-toggle btn btn-primary" role="button" data-toggle="collapse" href="#' + id + '" ' +
        ' aria-expanded="false" aria-controls="' + id + '">' + showLinkTextOpen + '</a>');

    $(this)
      .before('<div class="lg-example-result">' + $(this).text() + '</div>')
      .before($showLink)
      .wrap('<div class="lg-example-code collapse" id="' + id + '"></div>');

    $showLink.on('click', function () {
      $(this).text($(this).text() === showLinkTextOpen ? showLinkTextClose : showLinkTextOpen);
    });
  });

  /* Offcanvas menu */

  $(document).ready(function () {
    $('[data-toggle="offcanvas"]').click(function (e) {
      e.preventDefault();
      $('.row-offcanvas').toggleClass('active');
      $(this).toggleClass('active');
    });
  });

  $(document).keyup(function (e) {
    // Bind key esc
    if (e.which === 27) {
      $('[data-toggle="offcanvas"]').click().focus();
    }
  });

  /* Navgoco Change Tabindex on Toggle Menu */

//  $('.toggle-menu').click(function () {
//    if ($('.navgoco a').attr('tabindex', '-1')) {
//      $('.navgoco a').attr('tabindex', '2000');
//    }
//  });

  /* Skiplink */

  jQuery(document).ready(function ($) {
    $('.skiplink a').on({
      'focus': function () {
        $('.skiplink')
          .removeClass('sr-only')
          .addClass('skiplink--focused');
      },
      'blur': function () {
        $('.skiplink')
          .addClass('sr-only')
          .removeClass('skiplink--focused');
      }
    });
  });

  /* End Skiplink */
  /* Code highlight */

//  $(document).ready(function () {
//    // code highlight with prismjs
//    $('pre').addClass('language-markup');
//    Prism.highlightAll();
//  });

  /* Palette examples */

  $(document).ready(function () {
    var tohex = function (x) {
      return ('0' + parseInt(x).toString(16)).slice(-2);
    };

    var rgb2hex = function (rgb) {
      if (/^#/.test(rgb)) {
        return rgb;
      }
      rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
      return '#' + tohex(rgb[1]) + tohex(rgb[2]) + tohex(rgb[3]);
    };

    $('ul.palette-example li').each(function () {
      var color = rgb2hex($(this).css('color'));
      $(this)
        .wrapInner('<span class="lg-color-example-text"></span>')
        .append(' <span class="lg-color-example-text">' + color + '</span>')
        .prepend('<span class="lg-color-example" style="background:' + color + '"></span>');
    });
  });

  $('article img').on('click', function () {
    $('<img class="lg-modal modal fade" src="' + $(this).attr('src') + '">').modal('show');
  });

  /* Cookie law */

  $(document).ready(function () {
    $.cookieBar({
      fixed: true,
      bottom: true,
      message: $('.cookie-message').text(),
      acceptButton: true,
      acceptText: 'Ok',
      policyButton: true,
      policyText: 'Privacy Policy',
      policyURL: '/linee-guida/privacy-policy',
      acceptOnContinue: true,
      acceptOnScroll: 200,
      acceptFunction: location.reload
    });
  });

  /* Scripts Functions */

// Avoid `console` errors in browsers that lack a console.
  (function () {
    var method;
    var noop = function () {};
    var methods = [
      'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
      'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
      'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
      'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
      method = methods[length];

      // Only stub undefined methods.
      if (!console[method]) {
        console[method] = noop;
      }
    }
  }());

  /* Modernizr Image SVG Fallback PNG */

//if(!Modernizr.svg) {
//    $('img[src*="svg"]').attr('src', function() {
//        return $(this).attr('src').replace('.svg', '.png');
//    });
//}

  if (!document.implementation.hasFeature('http://www.w3.org/TR/SVG11/feature#Image', '1.1')) {
    $('img[src*="svg"]').attr('src', function () {
      return $(this).attr('src').replace('.svg', '.png');
    });
  }

  /* Scroll to top button */

  $(function () {
    $('.scrollto_top').bind('click', function (event) {
      $('html, body').animate({
        scrollTop: $($.attr(this, 'href')).offset().top - $('.navbar').height() - 200
      }, 500);
      event.preventDefault();
    });
  });

  /* Sticky navbar */

  $(window).scroll(function () {
    var scroll = $(window).scrollTop();
    if (scroll > 80) {
      $('.scrollto_top').removeClass('sr-only');
      $('.navbar').addClass('navbar--small');
      $('.nav-banner').addClass('nav-banner--small');
    } else {
      $('.nav-banner').removeClass('nav-banner--small');
      $('.navbar').removeClass('navbar--small');
      $('.scrollto_top').addClass('sr-only');
    }
  });

  /* jPush Menu */

//jQuery(document).ready(function ($) {
//  $('.toggle-menu').jPushMenu();
//  $(".toggle-menu").click(function (event) {
//    event.preventDefault();
//  });
//});
//
//$(document).keyup(function (e) {
//  if (e.which === 27) {
//    $('.toggle-menu').click();
//    $('.toggle-menu').focus();
//  }
//});


  /* Navgoco */

  $(document).ready(function () {
    $('.navgoco').navgoco({
      caretHtml: '',
      accordion: true,
      openClass: 'open',
      slide: {
        duration: 200,
        easing: 'swing'
      }
    });
    /*
     *  @FIXME: ugly hack against navgoco default behaviour.
     *  -----------------------------------------------------
     */
    setTimeout(function () {
      var $current = $('.navgoco a[href=\'' + window.location.pathname + '\'], ' +
        '.navgoco a[href=\'' + window.location.pathname.slice(0, -1) + '\']')
        .addClass('active');
      // If has an open parent do nothing
      var $parent = $current.closest('li').parent().closest('li');
      if ($parent.is('.open')) {
        return;
      }
      $current.find('span').click();
    }, 100);
  });

  /* Navgoco Change Tabindex on Toggle Menu */

//$('.toggle-menu').click(function () {
//  if ($('.navgoco a').attr('tabindex', '-1')) {
//    $('.navgoco a').attr('tabindex', '2000');
//  }
//});

  /* Chosen */

//var config = {
//  '.chosen-select': {},
//  '.chosen-select-deselect': {allow_single_deselect: true},
//  '.chosen-select-no-single': {disable_search_threshold: 10},
//  '.chosen-select-no-results': {no_results_text: 'Oops, nothing found!'},
//  '.chosen-select-width': {width: "95%"}
//}
//for (var selector in config) {
//  $(selector).chosen(config[selector]);
//}

  /* Remodal */
// $('[data-remodal-id=modal]').remodal();

  /* Venobox */

//$(document).ready(function () {
//
//  $('.lightbox-foto').venobox({
//    framewidth: '', // default: ''
//    frameheight: '', // default: ''
//    border: '0px', // default: '0'
//    bgcolor: '#000000', // default: '#fff'
//    titleattr: 'data-title', // default: 'title'
//    numeratio: true, // default: false
//    infinigall: true            // default: false
//  });
//
//});

})(jQuery);

