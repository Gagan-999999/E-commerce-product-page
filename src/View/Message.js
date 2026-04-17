import View from "./View";

class MessageView extends View {
  _parentElement = document.querySelector(".message");

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
