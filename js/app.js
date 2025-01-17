/*
 Copyright (c) 2016 StrongLoop, IBM, and Express Contributors
 License: MIT
*/

$(function(){
  var doc = $(document);
  var lang = document.location.pathname.split('/')[1]

  // top link
  $('#top').click(function(e){
    $('html, body').animate({scrollTop : 0}, 500);
    return false;
  });

  // scrolling links
  var added;
  doc.scroll(function(e){
    if (doc.scrollTop() > 5) {
      if (added) return;
      added = true;
      $('body').addClass('scroll');
    } else {
      $('body').removeClass('scroll');
      added = false;
    }
  })

  // edit page link
  var latest = '';
  var branchPath = 'https://github.com/expressjs/expressjs.com';
  var pathName = document.location.pathname;

  var currentVersion = (pathName.match(/^(?:\/[a-z]{2})?\/([0-9]x|)/) || [])[1] || '4x'; // defaults to current version
  var fileName = pathName.split('/').splice(-2)[1];
  var pagePath;
  var editPath;

  // the api doc cannot be edited individually, we'll have to link to the dir instead
  if (fileName == 'api.html') {
    editPath = branchPath + '/tree/gh-pages/_includes/api/en/'+ currentVersion;
  }
  // link to individual doc files
  else {
    pagePath = pathName.replace(/\.html$/, '.md');
    editPath = branchPath + '/blob/gh-pages' + pagePath;
  }

  var editLink;

  if (lang === 'en') {
    if (pathName == '/') editLink = '<a href="' + branchPath + '">Fork the website on GitHub</a>.';
    else editLink = '<a href="' + editPath + '">Edit this page on GitHub</a>.';
    $('#fork').html(editLink);
  }

  // code highlight

  $('code.language-js').each(function(){
    $(this).addClass('language-javascript').removeClass('language-js')
  })

  $('code.language-sh').each(function(){
    $(this).parent().addClass('language-sh')
  })

  Prism.highlightAll()

  // menu bar

  var prev;
  var n = 0;

  var headings = $('h2, h3').map(function(i, el){
    return {
      top: $(el).offset().top - 200,
      id: el.id
    }
  });

  function closest() {
    var h;
    var top = $(window).scrollTop();
    var i = headings.length;
    while (i--) {
      h = headings[i];
      if (top >= h.top) return h;
    }
  }

  var currentApiPrefix;
  var parentMenuSelector;
  var lastApiPrefix;

  $(window).bind('load resize', function() {

    $('#menu').css('height', ($(this).height() - 150) + 'px');

  });

  $(document).scroll(function() {

    var h = closest();
    if (!h) return;


    if (window.location.pathname == '/3x/api.html') {

      if (prev) {
      prev.removeClass('active');
      prev.parent().parent().removeClass('active');
      }
      var a = $('a[href="#' + h.id + '"]');
      a.addClass('active');
      a.parent().parent().addClass('active');
      prev = a;

    }

    else {

      currentApiPrefix = h.id.split('.')[0];
      parentMenuSelector = '#'+ currentApiPrefix + '-menu';

      $(parentMenuSelector).addClass('active');

      if (lastApiPrefix && (lastApiPrefix != currentApiPrefix)) {
        $('#'+ lastApiPrefix + '-menu').removeClass('active');
      }

      $('#menu li a').removeClass('active');

      var a = $('a[href="#' + h.id + '"]');
      a.addClass('active');

      lastApiPrefix = currentApiPrefix.split('.')[0];

    }

  })
  $('#tags-side-menu li').on('click', function() {
      // Remove prev 'active's 
      $(this).next().siblings().removeClass('active');
      $(this).next().addClass('active')
    })

  // i18n notice
  if (readCookie('i18nClose')) {
    $('#i18n-notice-box').hide()
  }
  else {
    $('#close-i18n-notice-box').on('click', function () {
      $('#i18n-notice-box').hide()
      createCookie('i18nClose', 1);
    })
  }

})



function createCookie(name, value, days) {
  var expires;

  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toGMTString();
  } else {
   expires = "";
  }
  document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + expires + "; path=/";
}

function readCookie(name) {
  var nameEQ = encodeURIComponent(name) + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
  }
  return null;
}

function eraseCookie(name) {
  createCookie(name, "", -1);
}

// thats a commit for a test
const myclg = () => {
  console.log('thats a test log');
}