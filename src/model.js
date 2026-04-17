import { productImages } from "./imageConfig.js";

export const selectedProduct = {
  name: "Fall Limited Edition Sneakers",
  description:
    "These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they’ll withstand everything the weather can offer.",
  price: 125,
  discount: 50,
  originalPrice: 250,
  thumbnailPreviews: productImages.thumbnails,
  productPreviews: productImages.full,
  curPreviewIndex: 0,
};

export const formData = {
  quantity: 0,
};

export const cartState = {
  products: [],
  totalQuantity: 0,
};

export function updateProductQuantity(quantifier) {
  if (quantifier === "increase") return ++formData.quantity;
  if (quantifier === "decrease" && formData.quantity > 0)
    return --formData.quantity;
}

export function addItem() {
  cartState.totalQuantity += formData.quantity;

  const item = {
    name: selectedProduct.name,
    price: selectedProduct.price,
    itemQuantity: formData.quantity,
    preview: selectedProduct.thumbnailPreviews[0],
    id: Date.now(),
  };

  cartState.products = [...cartState.products, item];
  formData.quantity = 0;
}

export function resetCart() {
  cartState.products = [];
  cartState.totalQuantity = 0;
}

export function deleteItem(id) {
  const { itemQuantity } = cartState.products.find((item) => item.id === id);
  cartState.products = cartState.products.filter((item) => item.id !== id);
  cartState.totalQuantity -= itemQuantity;
}

export function updateCurrentIndex(index) {
  selectedProduct.curPreviewIndex = index;
}
