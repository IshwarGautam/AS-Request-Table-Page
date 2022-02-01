import { LitElement, html, css } from 'lit';

export class AddComponent extends LitElement {
  static get styles() {
    /**
     * Get styles for add component
     *
     * @returns {css}
     */
    return css`
      paper-icon-button {
        width: 100px;
        height: 100px;
        color: rgb(255, 0, 109);
        float: right;
        bottom: 0;
      }
    `;
  }

  /**
   *Sets properties of the components
   *
   * @returns {Object} - that contains all the properties
   */
  static get properties() {
    return {
      toggleAutomatedSynthesisDialog: { type: Function },
    };
  }

  /** Renders the component
   *
   * @returns {html}
   */
  render() {
    return html`
      <paper-icon-button
        icon="add-circle"
        @click="${() => this.toggleAutomatedSynthesisDialog()}"
      ></paper-icon-button>
    `;
  }
}

customElements.define('add-component', AddComponent);
