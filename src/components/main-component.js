import { LitElement, html, css } from 'lit';

import '../components/table-component.js';
import '../components/form-component.js';
import '../components/add-component.js';

import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/iron-dropdown/iron-dropdown.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';
import '@vaadin/vaadin-date-picker/theme/material/vaadin-date-picker';
import '@vaadin/vaadin-grid/vaadin-grid.js';
import '@polymer/paper-dialog/paper-dialog.js';
import '@polymer/iron-dropdown/iron-dropdown.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/iron-icons/iron-icons.js';
import '@vaadin/vaadin-grid/vaadin-grid-sort-column.js';
import '@vaadin/vaadin-grid/vaadin-grid-filter.js';

import '@vaadin/vaadin-combo-box/theme/material/vaadin-combo-box';

export class MainComponent extends LitElement {
  static get styles() {
    return css`
      h2 {
        font-family: 'arial';
      }
    `;
  }

  static get properties() {
    return {
      items: { type: Array },
      dialogOpen: { type: Boolean },
      purpose: { type: String },
      index: { type: Number },
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
        reqDate: '2022-02-05',
        byDate: '2022-02-06',
        status: 'Queued',
      },
      {
        id: 'Request 01 1/18/2022',
        project: 'ADCL',
        target: 'AMQP',
        reqBy: 'Bishnu Adhikari',
        assignee: 'Amit Joshi',
        reqDate: '2022-02-01',
        byDate: '2022-02-05',
        status: 'In Progress',
      },
      {
        id: 'Aspen-Example-1',
        project: 'BOMD',
        target: 'DMBA',
        reqBy: 'Kapil Dev',
        assignee: 'Mamata Adhikari',
        reqDate: '2022-01-30',
        byDate: '2022-02-01',
        status: 'Completed',
      },
    ];

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

    this.changeTable = this.changeTable.bind(this);
    this.dialogOpen = false;

    this.purpose = '';

    this.toggleAutomatedSynthesisDialog =
      this.toggleAutomatedSynthesisDialog.bind(this);

    this.editPress = this.editPress.bind(this);
  }

  changeTable(type, data) {
    if (type === 'Edit') {
      this.items[this.index] = data;
    } else this.items = [...this.items, data];
  }

  toggleAutomatedSynthesisDialog() {
    this.dialogOpen = !this.dialogOpen;
    this.purpose = 'Add';
    this.data = this.emptyData;
  }

  editPress(data, index) {
    this.purpose = 'Edit';
    this.dialogOpen = !this.dialogOpen;
    this.data = data;
    this.index = index;
  }

  render() {
    return html`
      <h2>Automated Synthesis Request</h2>
      <table-component
        .items=${this.items}
        .onEditPress=${this.editPress}
      ></table-component>
      <add-component
        .toggleAutomatedSynthesisDialog=${this.toggleAutomatedSynthesisDialog}
      ></add-component>

      ${this.dialogOpen
        ? html`<form-component
            .purpose=${this.purpose}
            .onChangeTable=${this.changeTable}
            .dialogOpen=${this.dialogOpen}
            .data=${this.data}
            .toggleAutomatedSynthesisDialog=${this
              .toggleAutomatedSynthesisDialog}
          ></form-component> `
        : html``}
    `;
  }
}

customElements.define('main-component', MainComponent);
