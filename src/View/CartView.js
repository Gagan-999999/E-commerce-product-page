import View from "./View.js";
import { icons } from "../imageConfig.js";

class CartView extends View {
  _parentElement = document.querySelector(".cart-popup");
  _overlay = document.querySelector(".cart-overlay");

  constructor() {
    super();
    this.handlecloseCart = this._closeCartWindow.bind(this);
    this.handleEscape = this._escapeCartWindow.bind(this);
  }

  init(data) {
    this.render(data);
    this._handleEvents(true);
  }

  _handleEvents(isAdd) {
    if (isAdd) {
      this._overlay.classList.remove("hidden");
      document.addEventListener("keydown", this.handleEscape);
      this._overlay.addEventListener("click", this.handlecloseCart);
    }

    if (!isAdd) {
      this._overlay.classList.add("hidden");
      document.removeEventListener("keydown", this.handleEscape);
      this._overlay.removeEventListener("click", this.handlecloseCart);
    }
  }

  addHandlerRenderCheckout(handler) {
    this._parentElement.addEventListener("click", (e) => {
      const checkoutBtn = e.target.closest(".checkout-btn");
      if (!checkoutBtn) return;
      handler();
      this.handlecloseCart();
    });
  }

  addHandlerRenderDelete(handler) {
    this._parentElement.addEventListener("click", (e) => {
      const deleteBtn = e.target.closest(".remove-item-btn");
      if (!deleteBtn) return;
      handler(+deleteBtn.closest(".cart-item").dataset.id);
      if (deleteBtn.closest("ul").children.length === 1)
        return this._closeCartWindow();
      deleteBtn.closest("li").remove();
    });
  }

  _closeCartWindow() {
    this._clear();
    this._handleEvents(false);
  }

  _escapeCartWindow(e) {
    if (e.code === "Escape") this._closeCartWindow();
  }

  _generateMarkup() {
    const quantity = this._data.totalQuantity;

    return `<dialog id="cart-panel" class="cart-panel" aria-label="Shopping cart">
              <h2 class="cart-panel-heading">Cart</h2>
              <div class="cart-panel-divider"></div>
              ${
                quantity < 1
                  ? `<p class="empty-cart-message">Your cart is empty 🛒</p>`
                  : `
                   <div class="cart-panel-content">
                     <ul>
                      ${this._data.products.map((item) => this._listItem(item)).join(" ")}
                     </ul>
                    <button type="button" class="checkout-btn">Checkout</button>
                  </div>`
              }
            </dialog>`;
  }

  _listItem(item) {
    return `
          <li>
           <article class="cart-item" data-id="${item.id}">
            <img class="cart-panel-thumbnail" src="${item.preview}" alt="Preview of ${item.name}"/>
            
            <div>
              <h3 class="cart-list-heading">${item.name}</h3>
              <p class="cart-list-description">
              $${item.price} &times; ${item.itemQuantity} <strong>$${item.price * item.itemQuantity}</strong>
              </p>
            </div>

            <button
              class="remove-item-btn"
              type="button"
              aria-label="Remove ${item.name} from cart">
               <img
                src="${icons.trashBin}"
                aria-hidden="true"
                width="16"
                height="18"
                />
            </button>
           </article>
          </li>
           `;
  }
}
export default new CartView();
