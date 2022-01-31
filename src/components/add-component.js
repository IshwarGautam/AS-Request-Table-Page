import { LitElement, html, css } from 'lit';

export class AddComponent extends LitElement {
  static get styles() {
    return css`
      paper-button {
        margin-top: 20px;
      }

      .plusBtn {
        width: 70px;
        height: 70px;
        background: rgb(255, 0, 109);
        border-radius: 50%;
        cursor: pointer;
        float: right;
        bottom: 0;
      }

      .btn {
        color: ivory;
        font-size: 60px;
        text-align: center;
      }
    `;
  }

  static get properties() {
    return {
      toggleAutomatedSynthesisDialog: { type: Function },
    };
  }

  constructor() {
    super();
  }

  render() {
    return html`
      <paper-button
        class="plusBtn"
        @click="${() => this.toggleAutomatedSynthesisDialog()}"
      >
        <div class="btn">+</div>
      </paper-button>
    `;
  }
}

customElements.define('add-component', AddComponent);
