import { LitElement, html, css } from 'lit';
import { render } from 'lit-html';
import { classMap } from 'lit/directives/class-map.js';

export class TableComponent extends LitElement {
  static get styles() {
    /**
     * Get styles for table component
     *
     * @returns {css}
     */
    return css`
      vaadin-grid {
        padding: 70px;
        height: 500px;
      }

      #dialog2 {
        padding: 15px;
        font-size: 20px;
        box-shadow: none;
        border: 1px solid black;
      }

      iron-dropdown {
        font-size: 20px;
        padding: 10px;
        cursor: pointer;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
        background: #fffaf0;
      }

      .status {
        font-weight: bold;
      }

      .dot {
        height: 10px;
        width: 10px;
        border-radius: 50%;
        margin-top: 7px;
        margin-left: -15px;
        position: absolute;
      }

      .yellow {
        color: #ff8c00;
      }

      .bgYellow {
        background: #ff8c00;
      }

      .green {
        color: green;
      }

      .bgGreen {
        background: green;
      }

      .blue {
        color: blue;
      }

      .bgBlue {
        background: blue;
      }

      .edit-wrapper {
        position: relative;
      }

      #iron-wrapper,
      #filter-wrapper {
        position: fixed;
        top: 0;
        left: 0;
      }

      .filter-list {
        padding: 2px;
        width: 100%;
      }

      .filter-list:hover {
        background: palegoldenrod;
      }

      .activeFilter {
        color: blue;
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
      onChangeTable: { type: Function },
      option: { type: Object },
      key: { type: String },
      isFilterArray: { type: Object },
    };
  }

  constructor() {
    super();

    this.items = [];
    this.classes1 = {};
    this.classes2 = {};
    this.key = 'status';

    // initially, no any filter is applied
    this.isFilterArray = {
      id: false,
      project: false,
      target: false,
      reqBy: false,
      assignee: false,
      status: false,
    };
  }

  /** Renders the component
   *
   * @returns {html}
   */
  render() {
    return html`
      <!-- Table using vaadin grid -->
      <vaadin-grid .items=${this.items} theme="column-borders">
        <vaadin-grid-column
          width="2px"
          .renderer=${(row, column, data) =>
            this.renderColumn(row, column, data)}
          .headerRenderer=${(row) => this.renderIconHeader(row)}
        >
        </vaadin-grid-column>

        <vaadin-grid-column
          .headerRenderer=${(row) => this.renderIdHeader(row)}
          path="id"
        >
        </vaadin-grid-column>

        <vaadin-grid-column
          path="project"
          .headerRenderer=${(row) => this.renderProjectHeader(row)}
        >
        </vaadin-grid-column>

        <vaadin-grid-column
          .headerRenderer=${(row) => this.renderTargetHeader(row)}
          path="target"
        >
        </vaadin-grid-column>

        <vaadin-grid-column
          .headerRenderer=${(row) => this.renderReqByHeader(row)}
          path="reqBy"
        >
        </vaadin-grid-column>

        <vaadin-grid-column
          .headerRenderer=${(row) => this.renderAssigneeHeader(row)}
          path="assignee"
        >
        </vaadin-grid-column>

        <vaadin-grid-column
          .headerRenderer=${(row) => this.renderReqDateHeader(row)}
          path="reqDate"
        >
        </vaadin-grid-column>

        <vaadin-grid-column
          .headerRenderer=${(row) => this.renderByDateHeader(row)}
          path="byDate"
        >
        </vaadin-grid-column>

        <vaadin-grid-column
          .headerRenderer=${(row) => this.renderStatusHeader(row)}
          path="status"
          .renderer=${(row, column, data) =>
            this.renderStatus(row, column, data)}
        >
        </vaadin-grid-column>
      </vaadin-grid>

      <div id="iron-wrapper">
        <iron-dropdown id="edit-menu">
          <div slot="dropdown-content" @click="${this.editDialog}">Edit</div>
        </iron-dropdown>
      </div>

      <!-- General filter wrapper: takes key-->
      <div id="filter-wrapper">
        <iron-dropdown slot="dropdown-content" id="filter-dropdown">
          ${this.option[this.key].map(
            (i) => html`
              <div
                slot="dropdown-content"
                class="filter-list"
                @click=${() => this.applyFilter(i, this.key)}
              >
                ${i}
              </div>
            `
          )}
        </iron-dropdown>
      </div>
    `;
  }

  /**
   * when any of the filter dropdown list selected
   *
   * @param {String} value - selected value from the filter dropdown content
   * @param {String} key - title or base of dropdown content
   */
  applyFilter(value, key) {
    const getFilterList = this.shadowRoot.querySelector('#filter-dropdown');
    getFilterList.close();

    this.items = this.items.filter(function (item) {
      return item[key] === value;
    });

    this.isFilterArray[key] = true;

    this.passFilteredValue(this.isFilterArray[key], this.items);
  }

  // when edit button is clicked
  editDialog = (e) => {
    const getMenu = this.shadowRoot.querySelector('#edit-menu');
    getMenu.close();
    this.onEditPress(this.selected, this.index);
  };

  // insert more-vert icon in the first column of the table
  renderColumn(root, column, rowData) {
    render(
      html`
        <div class="edit-wrapper">
          <paper-icon-button
            icon="more-vert"
            @click=${(e) => this.openDropdown(e, rowData.item, rowData.index)}
          ></paper-icon-button>
        </div>
      `,
      root
    );
  }

  //first header (empty)
  renderIconHeader(root) {
    root.style.background = 'rgb(245, 245, 245)';
    root.style.height = '100%';
  }

  /**Render ID header
   *
   * @param {Object} root - area of header Requested Id
   */
  renderIdHeader(root) {
    root.textContent = 'Requested Id';
    root.style.background = 'rgb(245, 245, 245)';
    root.style.height = '100%';
    render(
      html`
        <paper-icon-button
          class=${this.isFilterArray.id ? 'activeFilter' : ''}
          icon="icons:filter-list"
          @click=${!this.isFilterArray.id
            ? (e) => this.openFilterDropDown(e, 'id')
            : this.doNothing}
        ></paper-icon-button>
      `,
      root
    );
  }

  /**Render project header
   *
   * @param {Object} root - area of header project
   */
  renderProjectHeader(root) {
    root.textContent = 'Project';
    root.style.background = 'rgb(245, 245, 245)';
    root.style.height = '100%';
    render(
      html`
        <paper-icon-button
          class=${this.isFilterArray.project ? 'activeFilter' : ''}
          icon="icons:filter-list"
          @click=${!this.isFilterArray.project
            ? (e) => this.openFilterDropDown(e, 'project')
            : this.doNothing}
        ></paper-icon-button>
      `,
      root
    );
  }

  /**Render Target header
   *
   * @param {Object} root - area of header target
   */
  renderTargetHeader(root) {
    root.textContent = 'Target';
    root.style.background = 'rgb(245, 245, 245)';
    root.style.height = '100%';
    render(
      html`
        <paper-icon-button
          class=${this.isFilterArray.target ? 'activeFilter' : ''}
          icon="icons:filter-list"
          @click=${!this.isFilterArray.target
            ? (e) => this.openFilterDropDown(e, 'target')
            : this.doNothing}
        ></paper-icon-button>
      `,
      root
    );
  }

  /**Render RequestedBy header
   *
   * @param {Object} root - area of header Requested By
   */
  renderReqByHeader(root) {
    root.textContent = 'Requested By';
    root.style.background = 'rgb(245, 245, 245)';
    root.style.height = '100%';
    render(
      html`
        <paper-icon-button
          class=${this.isFilterArray.reqBy ? 'activeFilter' : ''}
          icon="icons:filter-list"
          @click=${!this.isFilterArray.reqBy
            ? (e) => this.openFilterDropDown(e, 'reqBy')
            : this.doNothing}
        ></paper-icon-button>
      `,
      root
    );
  }

  /**Render Assignee Header
   *
   * @param {Object} root - area of header Assignee
   */
  renderAssigneeHeader(root) {
    root.textContent = 'Assignee';
    root.style.background = 'rgb(245, 245, 245)';
    root.style.height = '100%';
    render(
      html`
        <paper-icon-button
          class=${this.isFilterArray.assignee ? 'activeFilter' : ''}
          icon="icons:filter-list"
          @click=${!this.isFilterArray.assignee
            ? (e) => this.openFilterDropDown(e, 'assignee')
            : this.doNothing}
        ></paper-icon-button>
      `,
      root
    );
  }

  /**Render Requested Date Header
   *
   * @param {Object} root - area of header Requested Date
   */
  renderReqDateHeader(root) {
    root.textContent = 'Requested Date';
    root.style.background = 'rgb(245, 245, 245)';
    root.style.height = '100%';
    render(
      html`
        <paper-icon-button
          disabled
          icon="icons:filter-list"
        ></paper-icon-button>
      `,
      root
    );
  }

  /**Render Needed by Date header
   *
   * @param {Object} root - area of header Needed by Date
   */
  renderByDateHeader(root) {
    root.textContent = 'Needed By Date';
    root.style.background = 'rgb(245, 245, 245)';
    root.style.height = '100%';
    render(
      html`
        <paper-icon-button
          disabled
          icon="icons:filter-list"
        ></paper-icon-button>
      `,
      root
    );
  }

  /**Render status header
   *
   * @param {Object} root - area of header status
   */
  renderStatusHeader(root) {
    root.textContent = 'Status';
    root.style.background = 'rgb(245, 245, 245)';
    root.style.height = '100%';
    render(
      html`
        <paper-icon-button
          class=${this.isFilterArray.status ? 'activeFilter' : ''}
          icon="icons:filter-list"
          @click=${!this.isFilterArray.status
            ? (e) => this.openFilterDropDown(e, 'status')
            : this.doNothing}
        ></paper-icon-button>
      `,
      root
    );
  }

  /** Open filter dropdown when filter icon is clicked
   *
   * @param {event} e - event
   * @param {String} key - unique key
   */
  openFilterDropDown(e, key) {
    const getMenu = this.shadowRoot.querySelector('#filter-dropdown');
    const wrapper = this.shadowRoot.querySelector('#filter-wrapper');
    wrapper.style.top = e.y + 'px';
    wrapper.style.left = e.x + 'px';
    this.key = key;
    getMenu.open();
  }

  /** Open dropdown (edit) when more-vert icon is clicked
   *
   * @param {e} e - event
   * @param {Object} item - data that is selected
   * @param {Number} index -  index of particular data
   */
  openDropdown = (e, item, index) => {
    const dial2 = this.shadowRoot.querySelector('#edit-menu');
    const wrapper = this.shadowRoot.querySelector('#iron-wrapper');
    wrapper.style.top = e.y + 'px';
    wrapper.style.left = e.x + 'px';
    dial2.open();
    this.selected = item;
    this.index = index;
  };

  /** Needs to maintain the status of the project
   *
   * @param {Object} root
   * @param {Object} column
   * @param {Object} rowData
   */
  renderStatus(root, column, rowData) {
    if (rowData.index < Object.keys(this.items).length) {
      switch (this.items[rowData.index].status) {
        case 'Queued':
          this.classes1 = {
            yellow: true,
            green: false,
            blue: false,
          };
          this.classes2 = {
            bgYellow: true,
            bgGreen: false,
            bgBlue: false,
          };
          break;
        case 'In Progress':
          this.classes1 = {
            yellow: false,
            green: true,
            blue: false,
          };
          this.classes2 = {
            bgYellow: false,
            bgGreen: true,
            bgBlue: false,
          };
          break;
        case 'Completed':
          this.classes1 = {
            yellow: false,
            green: false,
            blue: true,
          };
          this.classes2 = {
            bgYellow: false,
            bgGreen: false,
            bgBlue: true,
          };
          break;
      }
    }

    render(
      html`
        <div class="status ${classMap(this.classes1)}">
          <div class="dot ${classMap(this.classes2)}"></div>
          <div>
            ${rowData.index < Object.keys(this.items).length
              ? this.items[rowData.index].status
              : ''}
          </div>
        </div>
      `,
      root
    );
  }
}

customElements.define('table-component', TableComponent);
