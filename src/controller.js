import ProductView from "./View/ProductView";
import ProductFullView from "./View/ProductFullView";
import CartIconView from "./View/CartIconView";
import CartView from "./View/CartView";
import NavigationView from "./View/NavigationView";
import MessageView from "./View/Message";

import * as model from "./model";
import "core-js/stable";
import "regenerator-runtime/runtime";

function controlProductView(index, isPreview) {
  // 1. Update the current preview index based on the action (previous or next)
  model.updateCurrentIndex(index);

  // 2. Update the product preview
  ProductView.updateDOM({
    product: model.selectedProduct,
    formData: model.formData,
  });

  if (isPreview)
    ProductFullView.updateDOM({
      product: model.selectedProduct,
      formData: model.formData,
    });

  // 3. Update image events for button
  ProductView.imgToBtn(ProductView._mediaQuery);
}

function controlQuantity(quantifier) {
  // 1. Update the quantity based on the quantifier (increase or decrease)
  model.updateProductQuantity(quantifier);

  // 2. Update the quantity display in the product view
  ProductView.updateDOM({
    product: model.selectedProduct,
    formData: model.formData,
  });

  // 3. Update image events for button
  ProductView.imgToBtn(ProductView._mediaQuery);
}

function controlAddToCart() {
  // 0. Show the message that the item has been added to the cart
  MessageView.init({ emoji: "✔️", text: "Item added to cart." });

  // 1. Add the item to the cart
  model.addItem();

  // 2. Update the product view and cart icon view to reflect the changes
  ProductView.updateDOM({
    product: model.selectedProduct,
    formData: model.formData,
  });

  // 3. Update the cart icon view with the new total quantity
  CartIconView.updateDOM(model.cartState.totalQuantity);

  // 4. Update image events for button
  ProductView.imgToBtn(ProductView._mediaQuery);
}

function controlCreateCartPanel() {
  // 1. Render the cart panel with the current cart state
  CartView.init(model.cartState);
}

function controlCartPanelCheckout() {
  MessageView.init({ emoji: "⭕", text: "Processing checkout..." });

  setTimeout(function () {
    // 0. Show the message that the checkout process has been completed
    MessageView.init({
      emoji: "✅",
      text: "Checkout completed. Thank you for your purchase!",
    });
  }, 2000);

  // 1. Reset the cart state
  model.resetCart();

  // 2. Update the cart view and cart icon view to reflect the changes
  CartIconView.updateDOM(model.cartState.totalQuantity);
}

function controlCartPanelDelete(id) {
  // 0. Show the message that the item has been removed from the cart
  MessageView.init({ emoji: "⛔", text: "Item removed from cart." });

  // 1. Delete the item from the cart
  model.deleteItem(id);

  // 2. Update the cart view and cart icon view to reflect the changes
  CartIconView.updateDOM(model.cartState.totalQuantity);
}

function controlFullView() {
  ProductFullView.init({
    product: model.selectedProduct,
    formData: model.formData,
  });
}

function controlAllMediaChange() {
  NavigationView.resetNav(ProductView._mediaQuery);
  ProductView.imgToBtn(ProductView._mediaQuery);
  ProductFullView.closeViewOnMediaChange(ProductView._mediaQuery);
}

const productClickMethods = {
  controlProductView,
  controlQuantity,
  controlFullView,
};

// Initialization function to set up event handlers and render the initial state
function init() {
  // Initial Load State
  ProductView.render({
    product: model.selectedProduct,
    formData: model.formData,
  });
  ProductView.imgToBtn(ProductView._mediaQuery);
  NavigationView.resetNav(ProductView._mediaQuery);

  // Adding listeners
  ProductView.addHandlerClickEvents(productClickMethods);
  ProductFullView.addHandlerClickEvents(productClickMethods);
  ProductView.addHandlerMediaChange(controlAllMediaChange);
  ProductView.addHandlerAddToCart(controlAddToCart);

  CartView.addHandlerRenderCheckout(controlCartPanelCheckout);
  CartView.addHandlerRenderDelete(controlCartPanelDelete);

  CartIconView.addHandlerRenderCartPanel(controlCreateCartPanel);
}

init();
