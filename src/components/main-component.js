import { LitElement, html, css } from 'lit';

import '../components/table-component.js';
import '../components/form-component.js';

import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/iron-dropdown/iron-dropdown.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';
import '@vaadin/vaadin-date-picker/vaadin-date-picker.js';
import '@vaadin/vaadin-grid/vaadin-grid.js';
import '@polymer/paper-dialog/paper-dialog.js';
import '@polymer/iron-dropdown/iron-dropdown.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/iron-icons/iron-icons.js';

export class MainComponent extends LitElement {
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

      h2 {
        font-family: 'arial';
      }
    `;
  }

  static get properties() {
    return {
      items: { type: Array },
    };
  }

  constructor() {
    super();

    this.items = [
      {
        id: 'Aspin-clone-sprint1',
        project: 'HBL',
        target: 'DML',
        reqBy: 'Ishwar Gautam',
        assignee: 'Manish Panday',
        reqDate: '02-05-2022',
        byDate: '02-06-2022',
        status: 'Queued',
      },
      {
        id: 'Request 01 1/18/2022',
        project: 'ADCL',
        target: 'AMQP',
        reqBy: 'Bishnu Adhikari',
        assignee: 'Amit Joshi',
        reqDate: '02-01-2022',
        byDate: '02-05-2022',
        status: 'In Progress',
      },
      {
        id: 'Aspen-Example-1',
        project: 'BOMD',
        target: 'DMBA',
        reqBy: 'Kapil Dev',
        assignee: 'Mamata Adhikari',
        reqDate: '01-30-2022',
        byDate: '02-01-2022',
        status: 'Completed',
      },
    ];

    this.addRow = this.addRow.bind(this);
  }

  addRow(data) {
    this.items = [...this.items, data];
  }

  render() {
    return html`
      <h2>Automated Synthesis Request</h2>
      <table-component .items=${this.items}></table-component>
      <form-component .onAddRow=${this.addRow}></form-component>

      <paper-button class="plusBtn" @click="${() => this.openDialog()}">
        <div class="btn">+</div>
      </paper-button>
    `;
  }

  openDialog() {
    const dial = this.shadowRoot.querySelector('form-component');
    dial.openDialog();
  }

  // closeDialog() {
  //   const form = this.shadowRoot.querySelector('form-component');
  //   form.closeDialog();
  // }
}

customElements.define('main-component', MainComponent);
