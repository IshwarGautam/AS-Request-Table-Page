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


export class MainComponent extends LitElement {
  static get styles() {
    return css`

    `;
  }

  static get properties() {
    return {
      
    };
  }

  constructor() {
    super();
    
  }

  render() {
    return html`

    


    <table-component></table-component>
    <form-component></form-component>
    
    `;
  }

  openDialog(){
    const dial = this.shadowRoot.querySelector('#dialog');
    dial.open();
  }
}

customElements.define('main-component', MainComponent);
