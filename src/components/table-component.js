import { LitElement, html, css } from 'lit';
import { render } from 'lit-html';
import { classMap } from 'lit/directives/class-map.js';

export class TableComponent extends LitElement {
  static get styles() {
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
        border: 1px solid gray;
        background: white;
        font-size: 20px;
        padding: 5px;
        cursor: pointer;
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
    `;
  }

  static get properties() {
    return {
      items: { type: Array },
    };
  }

  constructor() {
    super();

    this.items = [];
    this.classes1 = {};
    this.classes2 = {};
  }

  render() {
    return html`
      <vaadin-grid .items=${this.items}>
        <vaadin-grid-column
          width="2px"
          .renderer=${(row, column, data) =>
            this.renderColumn(row, column, data)}
        >
        </vaadin-grid-column>

        <vaadin-grid-column header="Request ID" path="id">
          <vaadin-grid-filter path="id"></vaadin-grid-filter>
        </vaadin-grid-column>

        <vaadin-grid-column header="Project" path="project">
        </vaadin-grid-column>

        <vaadin-grid-column header="Target" path="target"> </vaadin-grid-column>

        <vaadin-grid-column header="Requested By" path="reqBy">
        </vaadin-grid-column>

        <vaadin-grid-column header="Assignee" path="assignee">
        </vaadin-grid-column>

        <vaadin-grid-column header="Requested Date" path="reqDate">
        </vaadin-grid-column>

        <vaadin-grid-column header="Needed By Date" path="byDate">
        </vaadin-grid-column>

        <vaadin-grid-column
          header="Status"
          path="status"
          .renderer=${(row, column, data) =>
            this.renderStatus(row, column, data)}
        >
        </vaadin-grid-column>
      </vaadin-grid>

      <form-component></form-component>
    `;
  }

  renderColumn(root, column, rowData) {
    render(
      html`
        <div class="edit wrapper">
          <paper-icon-button
            icon="more-vert"
            @click=${this.openDropdown}
          ></paper-icon-button>

          <iron-dropdown
            id="edit-menu"
            horizontal-align="right"
            vertical-align="top"
            select="${rowData.index}"
          >
            <div
              slot="dropdown-content"
              @click="${() => this.openDialog()}"
              id="${rowData.index}"
            >
              Edit
            </div>
          </iron-dropdown>
        </div>
      `,
      root
    );

    this.openDropdown = (e) => {
      const dial2 = root.querySelector('#edit-menu');
      dial2.open();
    };
  }

  renderStatus(root, column, rowData) {
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

    render(
      html`
        <div class="status ${classMap(this.classes1)}">
          <div class="dot ${classMap(this.classes2)}"></div>
          <div>${this.items[rowData.index].status}</div>
        </div>
      `,
      root
    );
  }

  openDialog() {
    const dial = this.shadowRoot.querySelector('form-component');
    dial.openDialog();
  }

  // renderIcon(root, column, model){
  //   render(html`
  //     <paper-icon-button icon="filter-list"></paper-icon-button>
  //   `,column);
  // }
}

customElements.define('table-component', TableComponent);
