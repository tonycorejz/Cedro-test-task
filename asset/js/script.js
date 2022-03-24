jQuery(document).ready(($) => {
  $(".js-menu-popup-open").click(() => { // Открыть menu-popup
    $(".menu-popup").addClass("open")
    $('body').css({
      overflow: 'hidden'
    })
  })

  $(".js-menu-popup-close").click(() => { // Закрыть menu-popup
    $(".menu-popup").removeClass("open")
    $('body').css({
      overflow: 'auto'
    })
  })

  $(".owl-carousel").owlCarousel({ // Слайдер
    loop: false,
    margin: 32,
    autoWidth: true,
    lazyLoad: true,
    nav: false,
    dots: false
  });

  $.fn.setCursorPosition = function(pos) { // Функция переставляет позицию курсора в переданное место
    if ($(this).get(0).setSelectionRange) {
      $(this).get(0).setSelectionRange(pos, pos);
    } else if ($(this).get(0).createTextRange) {
      var range = $(this).get(0).createTextRange();
      range.collapse(true);
      range.moveEnd('character', pos);
      range.moveStart('character', pos);
      range.select();
    }
  };

  $(".js-phone").on('click', function(e) { // Маска для телефона. При клике, курсор переходит в место окончания ввода
    $(this).setCursorPosition(e.target.value.trim().length);
  }).mask("+7 999 999 99 99", {
    placeholder: " ", 
    autoclear: false
  })

  $(".js-password-visibility").on('click', function() { // Скрывает/показывет пароль при нажатии на .js-password-visibility
    let passwordField = $(this).parent().children("input")[0]

    if(passwordField.type == "password") {
      passwordField.type = "text"
      $(this).children(".js-password-hidden").removeClass('d-none')
    } else {
      passwordField.type =  "password"
      $(this).children(".js-password-hidden").addClass('d-none')
    }
  })

  $("form input").on('click', function() { // Убирает ошибку с поля по которому кликнули
    $(this).parent().children('input').removeClass('non-correct')
    $(this).parent().children('input').removeClass('correct')
    $(this).parent().children(".wrong").text("")
  })

  function setCorrect(thisInput) { // Добавляет к полю класс .correct
    thisInput.addClass('correct')
  }

  function setWarning(thisInput, text) { // Добавляет к полю стиль ошибки и записывает ошибку под ним
    thisInput.addClass('non-correct')
    thisInput.parent().children(".wrong").text(text)
  }

  function validate() { // Валидация полей
    var warnings = false

    $(".js-required").each(function() { //Проверяет поле с классом js-required на пустоту
      let thisInput = $(this)
      if(thisInput.val().trim().length <= 0) {
        setWarning(thisInput, "Это поле не должно быть пустым")
        warnings = true
      } else {
        setCorrect(thisInput)
      }
    })

    $(".js-phone-required").each(function() { //Проверяет номер телефона на целостность
      let thisInput = $(this)
      if(thisInput.val().trim().length != 16) {
        setWarning(thisInput, "Номер телефона введён не корректно")
        warnings = true
      } else {
        setCorrect(thisInput)
      }
    })

    $(".js-email-valid").each(function() { //Проверяет email на корректность
      let thisInput = $(this)
      let pattern = /^[a-z0-9_-]+@[a-z0-9-]+\.[a-z]{2,6}$/i

      if(thisInput.val().search(pattern) != 0) {
        setWarning(thisInput, "Почта введена не корректно")
        warnings = true
      } else {
        setCorrect(thisInput)
      }
    })

    if($(".js-new-password").val().length > 0) { // Проверка на введение старого пароля, если пользователь хочет изменить пароль
      if($(".js-old-password").val().trim().length <= 0) {
        setWarning($(".js-new-password"), "Для изменения пароля введите старый пароль")
        warnings = true
      } else {
        setCorrect($(".js-new-password"))
      }
    }

    return !warnings

  }

  $(".js-sbmt").on('click', function(e) {
    e.preventDefault()
    if(validate()) {
      alert("Данные отправлены!")
    }
  })

})

