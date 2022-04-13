$(document).ready(function(){
  const slider = tns({
    container: '.carousel__viewport',
    items: 1,
    slideBy: 'page',
    autoplay: false,
    nav: false,
    controls: false
  });

  $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab--active)', function() {
    $(this)
      .addClass('catalog__tab--active').siblings().removeClass('catalog__tab--active')
      .closest('div.container').find('div.catalog__content').removeClass('catalog__content--active').eq($(this).index()).addClass('catalog__content--active');
  });

  document.querySelector('.carousel__prev-btn').addEventListener('click', function () {
    slider.goTo('prev')
  });

  document.querySelector('.carousel__next-btn').addEventListener('click', function () {
    slider.goTo('next')
  });

  function toggleSlide(item) {
    $(item).each(function(i) {
      $(this).on('click', function(e) {
          e.preventDefault();
          $('.catalog__item-content').eq(i).toggleClass('catalog__item-content--active');
          $('.catalog__item-list').eq(i).toggleClass('catalog__item-list--active');
      });
    });
  };

  toggleSlide('.catalog__item-link');
  toggleSlide('.catalog__item-back');
  ymaps.ready(init);
    function init(){
        // Создание карты.
        var myMap = new ymaps.Map("map", {
            center: [55.768994, 37.645723],
            zoom: 18
        });
        myMap.behaviors.disable('scrollZoom');
        var placemark = new ymaps.Placemark([55.768774, 37.646893], {
        });
        myMap.geoObjects.add(placemark);
    };

  $('[data-modal=consultation]').on('click', function(){
    $('.overlay, #consultation').fadeIn();
  });

  $('.modal__close').on('click', function() {
    $('.overlay, #consultation, #order, #thanks').fadeOut();
  });

  $('.btn__catalog').each(function(i){
    $(this).on('click', function(){
      $('#order .modal__descr').text($('.catalog__item-title').eq(i).text());
      $('.overlay, #order').fadeIn();
    });
  });

  function validateForms(form) {
    $(form).validate({
      rules: {
        // simple rule, converted to {required:true}
        name: "required",
        tel: "required",
        // compound rule
        email: {
          required: true,
          email: true
        }
      },
      messages: {
        name: "Пожалуйста, введите ваше имя",
        tel: "Пожалуйста, введите ваш номер телефона",
        email: {
          required: "Нам нужен ваш адрес электронной почты, чтобы связаться с вами",
          email: "Ваш адрес электронной почты должен быть в формате name@domain.com"
        }
      }
    });
  };
  validateForms('#consultation-form');
  validateForms('#consultation form');
  validateForms('#order form');
  $('input[name=tel]').mask("+7 (999) 999-99-99");

  $('form').submit(function(e) {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "mailer/smart.php",
      data: $(this).serialize()

    }).done(function() {
      $(this).find("input").val("");
      $('#consultation, #order').fadeOut();
      $('.overlay, #thanks').fadeIn();

      $('form').trigger('reset');
    });
    return false;
  });

  $(window).scroll(function() {
    if ($(this).scrollTop() > 1100) {
      $('.page-up').fadeIn('fast');
    } 
    else {
      $('.page-up').fadeOut('fast');
    }
  });

  $("a[href=#up]").click(function() {
    const _href = $(this).attr("href");
    $("html, body").animated({scrollTop: $(_href).offset().top+"px"});
    return false;
  });
});
