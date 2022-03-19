jQuery(document).ready(($) => {
  $(".js-menu-popup-open").click(() => { //Открыть menu-popup
    $(".menu-popup").addClass("open")
  })

  $(".js-menu-popup-close").click(() => { //Закрыть menu-popup
    $(".menu-popup").removeClass("open")
  })
})