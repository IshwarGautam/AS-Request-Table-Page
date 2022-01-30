import { LitElement, html, css } from 'lit';
import { formatISO } from 'date-fns';

export class FormComponent extends LitElement {
  static get styles() {
    return css`
      paper-dropdown-menu,
      paper-input {
        width: 600px;
        display: block;
      }

      .dropdown-content,
      vaadin-date-picker {
        width: 600px;
      }

      .addBtn {
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
    `;
  }

  static get properties() {
    return {
      items: { type: Array },
      data: { type: Object },
      onAddRow: { type: Function },
      value: { type: String },
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
    };

    this.data = {
      id: '',
      project: '',
      target: '',
      reqBy: '',
      assignee: '',
      reqDate: '',
      byDate: '',
      status: '',
    };

    this.emptyData = { ...this.data };

    this.value = '-1';

    // this.openDialog = this.openDialog.bind(this);
    // this.closeDialog = this.closeDialog.bind(this);

    // this.onAddRow = () => {};
  }

  render() {
    return html`

    <paper-dialog id="dialog" entry-animation="scale-up-animation" exit-animation="fade-out-animation" with-backdrop>
      <div class="form">
        <h2>Add Synthesis Request</h2>

        <paper-dropdown-menu label="Reaction Workflow *" vertical-offset="50">
          <paper-listbox slot="dropdown-content" class="dropdown-content" selected = ${
            this.value
          }>
            ${this.option.id.map(
              (i) => html`
                <paper-item @click=${() => this.handleChange('id', i)}
                  >${i}</paper-item
                >
              `
            )}
          </paper-listbox>
        </paper-dropdown-menu>

        <paper-input label="Request Name" class="input"></paper-input>

        <paper-dropdown-menu label="Project *" vertical-offset="50">
          <paper-listbox slot="dropdown-content" class="dropdown-content" selected = ${
            this.value
          }>
            ${this.option.project.map(
              (i) => html`
                <paper-item @click=${() => this.handleChange('project', i)}
                  >${i}</paper-item
                >
              `
            )}
          </paper-listbox>
        </paper-dropdown-menu>

        <paper-dropdown-menu label="Target *" vertical-offset="50">
          <paper-listbox slot="dropdown-content" class="dropdown-content" selected = ${
            this.value
          }>
          ${this.option.target.map(
            (i) => html`
              <paper-item @click=${() => this.handleChange('target', i)}
                >${i}</paper-item
              >
            `
          )}
          </paper-listbox>
        </paper-dropdown-menu>

        <paper-dropdown-menu label="Requested By *" vertical-offset="50">
          <paper-listbox slot="dropdown-content" class="dropdown-content" selected = ${
            this.value
          }>
          ${this.option.reqBy.map(
            (i) => html`
              <paper-item @click=${() => this.handleChange('reqBy', i)}
                >${i}</paper-item
              >
            `
          )}
          </paper-listbox>
        </paper-dropdown-menu>

        <paper-dropdown-menu label="Assignee *" vertical-offset="50">
          <paper-listbox slot="dropdown-content" class="dropdown-content" selected = ${
            this.value
          }>
          ${this.option.assignee.map(
            (i) => html`
              <paper-item @click=${() => this.handleChange('assignee', i)}
                >${i}</paper-item
              >
            `
          )}
          </paper-listbox>
        </paper-dropdown-menu>

        <vaadin-date-picker label="Needed By Date *" .min="${formatISO(
          Date.now(),
          { representation: 'date' }
        )}" 
        @value-changed=${(e) => this.handleChange('reqDate', e.target.value)}>
        </vaadin-date-picker>

        <vaadin-date-picker initialPosition ='2/22/2022' label="Requested Date *"  @value-changed=${(
          e
        ) => this.handleChange('byDate', e.target.value)}>
        </vaadin-date-picker>

        </br>
        <paper-button toggles raised class="addBtn" @click = ${
          this.addRow
        }>ADD</paper-button>
        <paper-button toggles raised @click = ${
          this.closeDialog
        }>CANCEL</paper-button>
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

  openDialog() {
    const dial = this.shadowRoot.querySelector('#dialog');
    dial.open();
  }

  closeDialog() {
    //clear all the previous selected value from form
    this.value = String(parseInt(this.value) - 1);

    const input = this.shadowRoot.querySelector('.input');
    input.value = '';

    const form = this.shadowRoot.querySelector('#dialog');
    form.close();

    this.data = { ...this.emptyData };
  }

  addRow() {
    this.data.status = 'Queued';
    for (let i = 0; i < Object.keys(this.data).length; i++) {
      if (this.data[Object.keys(this.data)[i]] === '') {
        const msg = this.shadowRoot.querySelector('#message');
        msg.open();
        return;
      }

      if (i === Object.keys(this.data).length - 1) {
        this.onAddRow(this.data);
        const form = this.shadowRoot.querySelector('#dialog');
        form.close();

        //clear all the previous selected value from form
        this.value = String(parseInt(this.value) - 1);

        const input = this.shadowRoot.querySelector('.input');
        input.value = '';
      }
    }
    this.data = { ...this.emptyData };
  }
}

customElements.define('form-component', FormComponent);
