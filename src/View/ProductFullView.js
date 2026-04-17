import ParentProductView from "./ParentProductView.js";
import { icons } from "../imageConfig.js";

class ProductView extends ParentProductView {
  _parentElement = document.querySelector(".product-full-view");
  _overlay = document.querySelector(".product-fullview-overlay");

  constructor() {
    super();
    this.closeViewFunction = this._closeView.bind(this);
    this.escapeViewFunction = this._escapeView.bind(this);
  }

  init(data) {
    this.render(data);
    this.handleEvents(true);
  }

  _closeView() {
    this.handleEvents(false);
    this._clear();
  }

  closeViewOnMediaChange(e) {
    if (!e.matches && this._parentElement.childNodes.length > 0)
      this._closeView();
  }

  _escapeView(e) {
    if (e.code === "Escape") this._closeView();
  }

  handleEvents(add) {
    const closeBtn = this._parentElement.querySelector(".close-fullview-btn");

    if (add) {
      this._overlay.classList.remove("hidden");
      closeBtn.addEventListener("click", this.closeViewFunction);
      this._overlay.addEventListener("click", this.closeViewFunction);
      document.addEventListener("keydown", this.escapeViewFunction);
    }
    if (!add) {
      this._overlay.classList.add("hidden");
      closeBtn.removeEventListener("click", this.closeViewFunction);
      this._overlay.removeEventListener("click", this.closeViewFunction);
      document.removeEventListener("keydown", this.escapeViewFunction);
    }
  }

  _generateMarkup() {
    return `
        <dialog class="product-popup" id="product-popup">
          <button
            aria-label="close full view of product"
            type="button"
            class="close-fullview-btn"
          >
            <svg
              width="22"
              height="23"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 14 15"
            >
              <path
                d="m11.596.782 2.122 2.122L9.12 7.499l4.597 4.597-2.122 2.122L7 9.62l-4.595 4.597-2.122-2.122L4.878 7.5.282 2.904 2.404.782l4.595 4.596L11.596.782Z"
                fill-rule="evenodd"
              />
            </svg>
          </button>

          ${this._generateCommonMarkup(this._data)}

        </dialog>
    `;
  }
}

export default new ProductView();
