import { LitElement, html, css } from 'lit';
import { render } from 'lit-html';

export class TableComponent extends LitElement {
  static get styles() {
    return css`
      table {
        border-collapse: collapse;
        margin: 25px 10px;
        font-size: 0.9em;
        font-family: sans-serif;
        min-width: 400px;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
      }

      th,
      td {
        padding: 12px 15px;
        border: 1px solid #dddddd;
      }

      th {
        background: rgb(229, 237, 244);
      }

      tr:nth-child(even) {
        background-color: #f0fff0;
      }

      img {
        width: 20px;
        height: 20px;
      }

      vaadin-grid {
        padding: 70px;
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
        color: #fc2;
        font-weight: bold;
      }

      .dot {
        height: 10px;
        width: 10px;
        border-radius: 50%;
        background-color: #fc2;
        margin-top: 7px;
        margin-left: -15px;
        position: absolute;
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
  }

  render() {
    return html`
      <vaadin-grid .items=${this.items}>
        <vaadin-grid-column
          width="2px"
          .renderer=${(row) => this.renderColumn(row)}
        >
        </vaadin-grid-column>

        <vaadin-grid-column header="Request ID" path="id"> </vaadin-grid-column>

        <vaadin-grid-column header="Project" path="project">
        </vaadin-grid-column>

        <vaadin-grid-column header="Target" path="target"> </vaadin-grid-column>

        <vaadin-grid-column header="Requested By" path="req_by">
        </vaadin-grid-column>

        <vaadin-grid-column header="Assignee" path="assignee">
        </vaadin-grid-column>

        <vaadin-grid-column header="Requested Date" path="req_date">
        </vaadin-grid-column>

        <vaadin-grid-column header="Needed By Date" path="by_date">
        </vaadin-grid-column>

        <vaadin-grid-column
          header="Status"
          path="status"
          .renderer=${(row, column, data) =>
            this.renderStatus(row, column, data)}
        >
        </vaadin-grid-column>
      </vaadin-grid>
    `;
  }

  renderColumn(root) {
    render(
      html`
        <paper-icon-button
          icon="more-vert"
          @click=${this.openDropdown}
        ></paper-icon-button>

        <iron-dropdown
          id="edit-menu"
          horizontal-align="right"
          vertical-align="top"
        >
          <div slot="dropdown-content" @click="${this.editableForm}">Edit</div>
        </iron-dropdown>
      `,
      root
    );

    this.openDropdown = (e) => {
      const dial2 = root.querySelector('#edit-menu');
      dial2.open();
    };

    this.editableForm = (e) => {};
  }

  renderStatus(root, column, rowData) {
    render(
      html`
        <div class="status">
          <div class="dot"></div>
          <div>${this.items[rowData.index].status}</div>
        </div>
      `,
      root
    );
  }

  // renderIcon(root, column, model){
  //   render(html`
  //     <paper-icon-button icon="filter-list"></paper-icon-button>
  //   `,column);
  // }
}

customElements.define('table-component', TableComponent);
