import { LitElement, html, css } from 'lit';

/* Import child components*/
import '../components/table-component.js';
import '../components/form-component.js';
import '../components/add-component.js';
import '../components/filter-component.js';

/*Import custom elements*/
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
    /**
     * Get styles for main component
     *
     * @returns {css} - added font-family
     */
    return css`
      h2 {
        font-family: 'arial';
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
      dialogOpen: { type: Boolean },
      purpose: { type: String },
      index: { type: Number },
      isFilter: { type: Boolean },
      passFilteredValue: { type: Function },
      option: { type: Object },
    };
  }

  constructor() {
    super();

    //======================================
    // this is the default items of a table
    //======================================
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

    //make copy of items
    this.total_items = [...this.items];

    //this contains new data
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

    // these are the options availabe in their respective dropdown-content
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

    this.changeTable = this.changeTable.bind(this);

    this.dialogOpen = false;
    this.purpose = '';
    this.isFilter = false;
    this.isFilterArray = {};

    this.toggleAutomatedSynthesisDialog =
      this.toggleAutomatedSynthesisDialog.bind(this);

    this.editPress = this.editPress.bind(this);
    this.clearedFilter = this.clearedFilter.bind(this);
    this.passFilteredValue = this.passFilteredValue.bind(this);
  }

  /**
   * Make changes to table data
   *
   * @param {String} type - can be edit or delete
   * @param {Array} data - that is going to update or insert
   */
  changeTable(type, data) {
    if (type === 'Edit') {
      this.items[this.index] = data;
      this.items = [...this.items];
      this.total_items = [...this.items];
      this.dialogOpen = false;
    } else {
      this.items = [...this.items, data];
      this.total_items = [...this.items];
      this.dialogOpen = false;
    }
  }

  //toggle the dialog
  toggleAutomatedSynthesisDialog() {
    this.dialogOpen = !this.dialogOpen;
    this.purpose = 'Add';
    this.data = this.emptyData;
  }

  /**
   * update some of the variables when edit button is pressed
   *
   * @param {Array} data - that is going to update
   * @param {Number} index - index of particular data
   */
  editPress(data, index) {
    this.purpose = 'Edit';
    this.dialogOpen = true;
    this.data = { ...data };
    this.index = index;
  }

  //when clear_filter is clicked, all the filter will get removed
  clearedFilter() {
    this.items = [...this.total_items];
    this.isFilter = false;

    this.isFilterArray = {
      id: false,
      project: false,
      target: false,
      reqBy: false,
      assignee: false,
      status: false,
    };
  }

  /**
   * get the items that are to be filtered out
   *
   * @param {Boolean} boolean_value - true if filter applied on particular key else false
   * @param {Number} index- index of particular data
   */
  passFilteredValue(boolean_value, items) {
    this.isFilter = boolean_value;
    this.items = items;
  }

  /** Renders the component
   *
   * @returns {html}
   */
  render() {
    return html`
      <h2>Automated Synthesis Request</h2>

      <!-- toggle two cases - one when filter is applied and another when no any filter is applied -->
      ${this.isFilter
        ? html`<filter-component
            .items=${this.items}
            .total_items=${this.total_items}
            .clearedFilter=${this.clearedFilter}
          ></filter-component>`
        : html``}

      <table-component
        .items=${this.items}
        .onEditPress=${this.editPress}
        .passFilteredValue=${this.passFilteredValue}
        .isFilter=${this.isFilter}
        .option=${this.option}
        .isFilterArray=${this.isFilterArray}
      ></table-component>

      <add-component
        .toggleAutomatedSynthesisDialog=${this.toggleAutomatedSynthesisDialog}
      ></add-component>

      <!-- toggle two cases - one need to open dialog box and another don't need to -->
      ${this.dialogOpen
        ? html`<form-component
            .purpose=${this.purpose}
            .onChangeTable=${this.changeTable}
            .dialogOpen=${this.dialogOpen}
            .data=${this.data}
            .option=${this.option}
            .toggleAutomatedSynthesisDialog=${this
              .toggleAutomatedSynthesisDialog}
          ></form-component> `
        : html``}
    `;
  }
}

customElements.define('main-component', MainComponent);
