$(document).ready(function () {

  const containerTop = $('body').scrollTop() + 50;

  let isChangeSection = false;

  const sections = $('section').toArray();

  let url = window.location.href;
  let initSection = url.match(/section\d$/g)
  if (initSection !== null) {
    initSection = initSection.toString();
    const buttonEl = $(`#nav-${initSection}`);
    $(buttonEl).addClass("active");
    history.pushState(1,1,url);
    isChangeSection = true;
    const sectionToScroll = document.getElementById(`${initSection}`);
    sectionToScroll.scrollIntoView();
    setTimeout(() => {isChangeSection = false;}, 750)
    } else {
      url += '#section1'
      $('#nav-section1').addClass("active");
      history.pushState(1,1,url);
    }

  $('a').click((event) => {
    let url = window.location.href;
    let section = url.match(/section\d$/g).toString();
    if (section !== null) {
      $(".active").removeClass("active");
      $(event.target).addClass("active");
      isChangeSection = true
      setTimeout(() => {isChangeSection = false;}, 750)
    }
  })

  $('.section-container').scroll(() => {
    for(const section of sections) {
      if(isSectionInView(containerTop, section) && !isChangeSection) {
          $(".active").removeClass("active");
          $(`a[href*=${section.id}]`).addClass('active')
        let url = window.location.href;
        if(!url.match(`${section.id}`)) {
          url = url.replace(/section\d$/g, section.id).toString();
          history.pushState(1,1,url);
        }
        break;
      }
    }
  })
});

const isSectionInView = (containerTop, section) => {
  const elemTop = $(section).offset().top;
      const elemBottom = elemTop + $(section).height();
      return elemBottom > containerTop;
}
