import View from "./View";

class MessageView extends View {
  _parentElement = document.querySelector(".message");
  _timeoutId;

  init(data) {
    if (this._timeoutId) clearTimeout(this._timeoutId);
    this.render(data);
    this._timeoutId = setTimeout(() => {
      this._clear();
    }, 3000);
  }

  _generateMarkup() {
    return `
      <p class="message-description">
        <span>${this._data.emoji}</span>  
        <span>${this._data.text}</span>
      </p>
        `;
  }
}

export default new MessageView();
