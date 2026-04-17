import View from "./View.js";
import { icons } from "../imageConfig.js";

class CartIconView extends View {
  _parentElement = document.querySelector(".cart-btn-container");

  addHandlerRenderCartPanel(handler) {
    this._parentElement.addEventListener("click", handler);
  }

  _generateMarkup() {
    return `<button
          class="cart-btn"
          type="button"
          aria-expanded="${this._data > 0 ? "true" : "false"}"
          aria-controls="cart-panel"
          aria-label="Open shopping cart"
        >
          <img
            src="${icons.cart}"
            alt=""
            aria-hidden="true"
            width="22"
            height="20"
          />

          <span class="cart-item-count ${this._data > 0 ? "" : "hidden"}" aria-live="polite" aria-atomic="true"
            >${this._data}</span
          >
        </button>`;
  }
}
export default new CartIconView();
