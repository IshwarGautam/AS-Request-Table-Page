import { LitElement, html, css } from 'lit';

export class FormComponent extends LitElement {
  static get styles() {
    /**
     * Get styles for form component
     *
     * @returns {css}
     */
    return css`
      vaadin-date-picker {
        width: 600px;
      }

      .mainBtn {
        background: rgb(255, 0, 109);
        color: ivory;
      }

      .form {
        width: 600px;
        margin: auto;
        padding: 20px;
      }

      ::-webkit-scrollbar {
        width: 15px;
      }

      ::-webkit-scrollbar-thumb {
        background-color: rgb(186, 186, 192);
        border-radius: 20px;
        border: 5px solid #fff;
      }

      paper-dialog {
        overflow: scroll;
      }

      #message {
        color: red;
        font-size: 20px;
      }

      paper-button {
        margin-top: 20px;
      }

      vaadin-combo-box {
        width: 100%;
      }

      .clear {
        float: right;
        margin-top: -50px;
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
      items: { type: Array },
      data: { type: Object },
      onChangeTable: { type: Function },
      value: { type: String },
      dialogOpen: { type: Boolean },
      toggleAutomatedSynthesisDialog: { type: Function },
      purpose: { type: String },
      option: { type: Object },
    };
  }

  constructor() {
    super();
    this.option = {};
  }

  /** Renders the component
   *
   * @returns {html}
   */
  render() {
    return html`
      <paper-dialog modal opened id="dialog">
        <div class="form">
          <h2>${this.purpose} Synthesis Request</h2>
          <div class="clear">
            <paper-icon-button
              icon="clear"
              @click=${this.closeDialog}
            ></paper-icon-button>
          </div>

          <vaadin-combo-box
            .value="${this.data.id}"
            label="Reaction Workflow *"
            .items="${this.option.id}"
            @change="${(e) => this.handleChange('id', e.target.value)}"
          >
          </vaadin-combo-box>

          <paper-input label="Request Name" class="input"></paper-input>

          <vaadin-combo-box
            .value="${this.data.project}"
            label="Project *"
            .items="${this.option.project}"
            @change="${(e) => this.handleChange('project', e.target.value)}"
          >
          </vaadin-combo-box>

          <vaadin-combo-box
            .value="${this.data.target}"
            label="Target *"
            .items="${this.option.target}"
            @change="${(e) => this.handleChange('target', e.target.value)}"
          >
          </vaadin-combo-box>

          <vaadin-combo-box
            .value="${this.data.reqBy}"
            label="Requested By *"
            .items="${this.option.reqBy}"
            @change="${(e) => this.handleChange('reqBy', e.target.value)}"
          >
          </vaadin-combo-box>

          <vaadin-combo-box
            .value="${this.data.assignee}"
            label="Assignee *"
            .items="${this.option.assignee}"
            @change="${(e) => this.handleChange('assignee', e.target.value)}"
          >
          </vaadin-combo-box>

          <vaadin-date-picker
            .value=${this.data.reqDate}
            label="Needed By Date *"
            @value-changed=${(e) =>
              this.handleChange('reqDate', e.target.value)}
          >
          </vaadin-date-picker>

          <vaadin-date-picker
            .value=${this.data.byDate}
            label="Requested Date *"
            @value-changed=${(e) => this.handleChange('byDate', e.target.value)}
          >
          </vaadin-date-picker>

          <vaadin-combo-box
            .value="${this.data.status}"
            label="Status *"
            .items="${this.option.status}"
            @change="${(e) => this.handleChange('status', e.target.value)}"
          >
          </vaadin-combo-box>

          <paper-button
            toggles
            raised
            class="mainBtn"
            @click=${this.changeTable}
            >${this.purpose}</paper-button
          >
          <paper-button toggles raised @click=${this.closeDialog}
            >Cancel</paper-button
          >
        </div>
      </paper-dialog>

      <paper-dialog id="message">
        <p>Please fill all the required fields!</p>
        <div class="buttons">
          <paper-button dialog-confirm autofocus>Ok</paper-button>
        </div>
      </paper-dialog>
    `;
  }

  /** When dropdown content from form is selected
   *
   * @param {String} key - unique key
   * @param {String} item - selected value
   */
  handleChange(key, item) {
    this.data = { ...this.data, [key]: item };
  }

  //close the dialog
  closeDialog() {
    this.toggleAutomatedSynthesisDialog();

    this.data = { ...this.emptyData };
  }

  // Make changes to table
  changeTable() {
    for (let i = 0; i < Object.keys(this.data).length; i++) {
      if (this.data[Object.keys(this.data)[i]] === '') {
        const msg = this.shadowRoot.querySelector('#message');
        msg.open();
        return;
      }

      if (i === Object.keys(this.data).length - 1) {
        this.onChangeTable(this.purpose, this.data);
        const form = this.shadowRoot.querySelector('#dialog');
        form.close();
      }
    }
    this.data = { ...this.emptyData };
  }
}

customElements.define('form-component', FormComponent);
