import { LitElement, html, css } from 'lit';

export class FilterComponent extends LitElement {
  static get styles() {
    /**
     * Get styles for filter component
     *
     * @returns {css}
     */
    return css`
      .filter {
        width: 350px;
        display: flex;
        height: 40px;
        border: 1px solid black;
        background: azure;
        border-radius: 10px;
        margin: auto;
      }

      .filter-content {
        display: flex;
        width: 50%;
      }

      .clear-filter {
        text-decoration: underline;
        font-size: 25px;
        color: gray;
        cursor: pointer;
      }

      h2 {
        margin-top: 1px;
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
      items: { type: Object },
      total_items: { type: Object },
    };
  }

  /** Renders the component
   *
   * @returns {html}
   */
  render() {
    return html`
      <div class="filter">
        <div class="filter-content">
          <paper-icon-button icon="icons:filter-list"></paper-icon-button>
          <h2>Filter</h2>
        </div>
        <div class="clear-filter filter-content" @click=${this.clearedFilter}>
          Clear Filter
        </div>
      </div>
    `;
  }
}

customElements.define('filter-component', FilterComponent);
