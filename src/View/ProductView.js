import ParentProductView from "./ParentProductView.js";
import { icons } from "../imageConfig.js";

class ProductView extends ParentProductView {
  _parentElement = document.querySelector(".product");
  _mediaQuery = window.matchMedia("(min-width: 56.25rem)");

  addHandlerMediaChange(handler) {
    this._mediaQuery.addEventListener("change", handler);
  }

  imgToBtn(e) {
    const imgWrapper = this._parentElement.querySelector(
      ".product-image-wrapper",
    );
    if (e.matches) {
      imgWrapper.setAttribute("role", "button");
      imgWrapper.classList.add("img-btn");
    }
    if (!e.matches) {
      imgWrapper.removeAttribute("role");
      imgWrapper.classList.remove("img-btn");
    }
  }

  addHandlerAddToCart(handler) {
    const form = this._parentElement.querySelector(".quantity-form");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
    });
  }

  _generateMarkup() {
    const {
      name,
      description,
      price,
      discount,
      originalPrice,
      thumbnailPreviews,
      productPreviews,
      curPreviewIndex,
    } = this._data.product;

    const { quantity } = this._data.formData;
    const count = productPreviews.length;

    return `<section class="product-gallery" aria-label="Product images">

      ${this._generateCommonMarkup(this._data)}
          
        </section>

        <section class="product-details">
          <header class="product-header">
            <p class="brand">Sneaker Company</p>
            <h1 class="heading">${name}</h1>
          </header>

          <p class="description">
           ${description}
          </p>

          <p class="pricing">
            <span>
              <strong class="price">$${price.toFixed(2)}</strong>
              <span class="discount">${discount}%</span>
            </span>
            <del class="old-price">$${originalPrice.toFixed(2)}</del>
          </p>

          <form class="quantity-form">
            <fieldset class="quantity-fieldset">
              <legend class="visually-hidden">Select quantity</legend>

              <button type="button" aria-label="Decrease quantity" class="quantity-btn" data-quantifier="decrease">
                <img src="${icons.minus}" alt="" aria-hidden="true" />
              </button>

              <output aria-live="polite">${quantity}</output>

              <button type="button" aria-label="Increase quantity" class="quantity-btn" data-quantifier="increase">
                <img src="${icons.plus}" alt="" aria-hidden="true" />
              </button>
            </fieldset>

            <button type="submit" class="add-to-cart" ${quantity > 0 ? "" : "disabled"}>
              <img
                src="${icons.cart}"
                alt=""
                aria-hidden="true"
                width="18"
                height="16"
              />
              <span>Add to cart</span>
            </button>
          </form>
        </section>`;
  }
}
export default new ProductView();
