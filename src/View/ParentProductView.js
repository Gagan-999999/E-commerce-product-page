import View from "./View.js";
import { icons } from "../imageConfig.js";

export default class ParentProductView extends View {
  addHandlerClickEvents(handler) {
    function handleClick(e) {
      const isPreview =
        this._parentElement.getAttribute("class") === "product-full-view";
      const target = e.target;

      if (target.closest(".action-btn")) {
        const btn = target.closest(".action-btn");
        handler.controlProductView(+btn.dataset.action, isPreview);
        return;
      }

      if (target.closest(".thumbnail-btn")) {
        const btn = target.closest(".thumbnail-btn");
        handler.controlProductView(+btn.dataset.index, isPreview);
        return;
      }

      if (target.closest(".quantity-btn")) {
        const btn = target.closest(".quantity-btn");
        handler.controlQuantity(btn.dataset.quantifier);
        return;
      }

      if (target.closest(".img-btn")) return handler.controlFullView();
    }

    this._parentElement.addEventListener("click", handleClick.bind(this));
  }

  _generateCommonMarkup() {
    const { name, thumbnailPreviews, productPreviews, curPreviewIndex } =
      this._data.product;

    const count = productPreviews.length;

    return `
          <figure class="product-image">
          <span class='product-image-wrapper'>
            <img
              class="product-photo"
              src="${productPreviews[curPreviewIndex]}"
              alt="Preview ${curPreviewIndex + 1} of Fall Limited Edition Sneakers"
              tabindex="0"
            />
            </span>
          </figure>

          <div class="action-btns">
            <button
              type="button"
              aria-label="Previous image"
              class="action-btn"
              data-action="${(curPreviewIndex - 1 + count) % count}"
            >
              <img
                src="${icons.previous}"
                alt=""
                aria-hidden="true"
                width="12"
                height="18"
              />
            </button>

            <button
              type="button"
              aria-label="Next image"
              class="action-btn"
              data-action="${(curPreviewIndex + 1) % count}"
            >
              <img
                src="${icons.next}"
                alt=""
                aria-hidden="true"
                width="13"
                height="18"
              />
            </button>
          </div>

          <ul class="thumbnail-list hidden" aria-label="Select product image">
          ${thumbnailPreviews.map((img, i) => this._thumbnailList(name, img, i, curPreviewIndex)).join(" ")}
          </ul>
       `;
  }

  _thumbnailList(name, img, i, curPreviewIndex) {
    const isSelected = i === curPreviewIndex;
    return `
            <li>
              <button class="${isSelected ? "thumbnail-btn selected" : "thumbnail-btn"}" type="button" aria-current="${isSelected ? "true" : "false"}" data-index="${i}">
                <img
                  src="${img}"
                  alt="Thumbnail ${i} of ${name}"
                />
              </button>
            </li>
            `;
  }
}
