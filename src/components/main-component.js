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
        target: 'HBL-completion',
        req_by: 'Ishwar Gautam',
        assignee: 'Manish Panday',
        req_date: '01-27-2022',
        by_date: '02-01-2022',
        status: 'Queued',
      },
      {
        id: 'Request 01 1/18/2022',
        project: 'ADCL',
        target: 'ADCL-completion',
        req_by: 'Bishnu Adhikari',
        assignee: 'Amit Joshi',
        req_date: '01-24-2022',
        by_date: '01-26-2022',
        status: 'In Progress',
      },
      {
        id: 'Aspen-Example-1',
        project: 'BOMD',
        target: 'BOMD-completion',
        req_by: 'Kapil Dev',
        assignee: 'Mamata Adhikari',
        req_date: '01-20-2022',
        by_date: '01-26-2022',
        status: 'Completed',
      },
    ];

    this.addRow = this.addRow.bind(this);

    // this.myObj = {
    //   id: 'hello',
    //   project: 'jk',
    //   target: '2/23/2022',
    // };

    // Object.keys(this.myObj).filter((k) => {
    //   if (this.myObj[k] === '') {
    //     return;
    //   }
    // });
  }

  addRow(data) {
    this.items = [...this.items, data];
  }

  render() {
    return html`
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
