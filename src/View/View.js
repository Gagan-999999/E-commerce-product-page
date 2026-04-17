export default class View {
  _data;

  render(data) {
    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }

  updateDOM(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();
    const newDOM = document.createRange().createContextualFragment(newMarkup);

    const newElements = Array.from(newDOM.querySelectorAll("*"));
    const curElements = Array.from(this._parentElement.querySelectorAll("*"));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];

      if (!newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue?.trim()) {
        curEl.textContent = newEl.textContent;
      }

      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach((attr) =>
          curEl.setAttribute(attr.name, attr.value),
        );
        // Remove attributes that are no longer present
        const newAttrs = Array.from(newEl.attributes).map((attr) => attr.name);
        Array.from(curEl.attributes).forEach((attr) => {
          if (!newAttrs.includes(attr.name)) {
            curEl.removeAttribute(attr.name);
          }
        });
      }
    });
  }
}
