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

        <vaadin-grid-column header="Status" path="status"> </vaadin-grid-column>
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
        <paper-dialog
          id="dialog2"
          no-overlap
          horizontal-align="left"
          vertical-align="top"
        >
          Edit
        </paper-dialog>
      `,
      root
    );

    this.openDropdown = (e) => {
      const dial2 = root.querySelector('#dialog2');
      dial2.open();
    };
  }

  // renderIcon(root, column, model){
  //   render(html`
  //     <paper-icon-button icon="filter-list"></paper-icon-button>
  //   `,column);
  // }
}

customElements.define('table-component', TableComponent);
