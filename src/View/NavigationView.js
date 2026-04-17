class NavigationView {
  openNavBtn = document.querySelector(".open-nav-btn");
  closeNavBtn = document.querySelector(".close-nav-btn");
  navMenu = document.querySelector(".primary-nav");
  overlay = document.querySelector(".overlay");

  constructor() {
    this.openNavBtn.addEventListener("click", this._openNav.bind(this));
    this.handleCloseNav = this._closeNav.bind(this);
    this.handleEscapeNav = this._escapeNav.bind(this);
  }

  _openNav() {
    this.navMenu.classList.remove("hidden");
    this.overlay.classList.remove("hidden");
    this.openNavBtn.setAttribute("aria-expanded", "true");

    this._handleEventListeners.call(this, true);
  }

  _closeNav() {
    this.navMenu.classList.add("hidden");
    this.overlay.classList.add("hidden");
    this.openNavBtn.setAttribute("aria-expanded", "false");

    this._handleEventListeners.call(this, false);
  }

  _escapeNav(e) {
    if (e.key === "Escape") this._closeNav();
  }

  _handleEventListeners(add = false) {
    if (add) {
      [this.closeNavBtn, this.overlay].forEach((el) =>
        el.addEventListener("click", this.handleCloseNav),
      );
      document.addEventListener("keydown", this.handleEscapeNav);
    }

    if (!add) {
      [this.closeNavBtn, this.overlay].forEach((el) =>
        el.removeEventListener("click", this.handleCloseNav),
      );
      document.removeEventListener("keydown", this.handleEscapeNav);
    }
  }

  resetNav(e) {
    if (e.matches) {
      this.navMenu.classList.remove("hidden");
      this.overlay.classList.add("hidden");
      this.openNavBtn.setAttribute("aria-expanded", "false");
      this._handleEventListeners.call(this, false);
    }
    if (!e.matches) {
      this.navMenu.classList.add("hidden");
    }
  }
}

export default new NavigationView();
