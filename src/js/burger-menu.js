(() => {
  function setBurger(params) {
    const btn = document.querySelector(`.${params.btnClass}`);
    const exit = document.querySelector(`.${params.closeClass}`);
    const menu = document.querySelector(`.${params.menuClass}`);
    const links = menu.querySelectorAll(`.${params.linksClass}`);

    function onBtnClick () {
      btn.classList.toggle(params.activeClass);
  
      if (
        !menu.classList.contains(params.activeClass) &&
        !menu.classList.contains(params.hiddenClass)
      ) {
        menu.classList.add(params.activeClass);
        document.body.style.overflow = 'hidden';
      } else {
        menu.classList.add(params.hiddenClass);
        document.body.removeAttribute('style');
        exit.classList.toggle(params.hiddenClass);
      }
    }

    menu.addEventListener("animationend", function () {
      if (menu.classList.contains(params.hiddenClass)) {
        menu.classList.remove(params.activeClass);
        menu.classList.remove(params.hiddenClass);
        exit.classList.remove(params.hiddenClass);
      }
    });

    btn.addEventListener("click", onBtnClick);
    exit.addEventListener("click", onBtnClick);

    links.forEach((link) => {
      link.addEventListener("click", onBtnClick);
    });
  }

  setBurger({
    btnClass: "js-burger",
    closeClass: "js-exit",
    menuClass: "js-menu",
    activeClass: "is-opened",
    hiddenClass: "is-closed",
    linksClass: "js-menu-link"
  });
})();