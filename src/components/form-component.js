import { LitElement, html, css } from 'lit';
import { formatISO } from 'date-fns';

export class FormComponent extends LitElement {
  static get styles() {
    return css`
      vaadin-date-picker {
        width: 600px;
      }

      .mainBtn {
        background: rgb(255, 0, 109);
        color: ivory;
      }

      .form {
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
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

      vaadin-combo-box::before,
      vaadin-combo-box::after {
        display: none !important;
      }
    `;
  }

  static get properties() {
    return {
      items: { type: Array },
      data: { type: Object },
      onChangeTable: { type: Function },
      value: { type: String },
      dialogOpen: { type: Boolean },
      toggleAutomatedSynthesisDialog: { type: Function },
      purpose: { type: String },
    };
  }

  constructor() {
    super();

    this.option = {
      id: [
        'Aspin-clone-sprint1',
        'Request 01 1/18/2022',
        'Aspen-Example-1',
        'Mono-Cloud-extreme1',
        'Albert-Example-II',
        'Dice-Synthesis-2022',
        'Mono-client-harvert',
      ],
      project: ['HBL', 'ADCL', 'BOMD', 'BMTC', 'TKSS', 'MORP'],
      target: ['DML', 'AMQP', 'DMBA', 'SEVR', 'DMMP', 'BRPC'],
      reqBy: [
        'Ishwar Gautam',
        'Bishnu Adhikari',
        'Kapil Dev',
        'Bijay Gautam',
        'Meghnath Paudel',
        'Sunil Acharya',
        'Campaign Planning Admin',
      ],
      assignee: [
        'Manish Panday',
        'Amit Joshi',
        'Mamata Adhikari',
        'Saughat Joshi',
        'Karan Bhusal',
        'Simran Khatiwada',
      ],
      status: ['Queued', 'In Progress', 'Completed'],
    };

    // this.openDialog = this.openDialog.bind(this);
    // this.closeDialog = this.closeDialog.bind(this);

    // this.onChangeTable = () => {};
  }

  render() {
    return html`
      <paper-dialog modal opened id="dialog">
        <div class="form">
          <h2>${this.purpose} Synthesis Request</h2>

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

  handleChange(key, item) {
    this.data = { ...this.data, [key]: item };
  }

  closeDialog() {
    this.toggleAutomatedSynthesisDialog();

    this.data = { ...this.emptyData };
  }

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
