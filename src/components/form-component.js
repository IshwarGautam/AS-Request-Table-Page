import { LitElement, html, css } from 'lit';

export class FormComponent extends LitElement {
  static get styles() {
    return css`

      paper-dropdown-menu, paper-input{
        width:600px;
        display:block;
      }

      .dropdown-content, vaadin-date-picker{
        width:600px;
      }

      .addBtn{
        background:rgb(255, 0, 109);
        color:ivory;
      }

      .form{
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
        width:600px;
        margin:auto;
        padding:20px;
      }

      paper-button{
        margin-top:20px;
      }

      .plusBtn{
        width:70px;
        height:70px;
        background: rgb(255, 0, 109);
        border-radius:50%;
        cursor:pointer;
        float:right;
        bottom:0;
      }

      .btn{
        color:ivory;
        font-size:60px;
        text-align:center;
      }
    `;
  }

  static get properties() {
    return {
      
    };
  }


  constructor() {
    super();

    this.items = [
      {id:'Aspin-clone-sprint1', project:'HBL', target:'HBL-completion', req_by:'Ishwar Gautam', assignee:'Manish Panday', req_date:'01-27-2022', by_date:'02-01-2022', status:'Queued'},
      {id:'Request 01 1/18/2022', project:'ADCL', target:'ADCL-completion', req_by:'Bishnu Adhikari', assignee:'Amit Joshi', req_date:'01-24-2022', by_date:'01-26-2022', status:'In Progress'},
      {id:'Aspen-Example-1', project:'BOMD', target:'BOMD-completion', req_by:'Kapil Dev', assignee:'Mamata Adhikari', req_date:'01-20-2022', by_date:'01-26-2022', status:'Completed'},

    ] 
  }

  render() {
    return html`
    <paper-button class="plusBtn" @click="${this.getForm}">
      <div class="btn">+</div>
    </paper-button>

    <paper-dialog id="dialog">
      <div class="form">
        <h2>Add Synthesis Request</h2>

        <paper-dropdown-menu label="Reaction Workflow *" vertical-offset="50">
          <paper-listbox slot="dropdown-content" class="dropdown-content">
            ${this.items.map((i => html`
              <paper-item>${i.id}</paper-item>
            `))}
          </paper-listbox>
        </paper-dropdown-menu>

        <paper-input label="Request Name *"></paper-input>

        <paper-dropdown-menu label="Project *" vertical-offset="50">
          <paper-listbox slot="dropdown-content" class="dropdown-content">
            ${this.items.map((i => html`
              <paper-item>${i.project}</paper-item>
            `))}
          </paper-listbox>
        </paper-dropdown-menu>

        <paper-dropdown-menu label="Target *" vertical-offset="50">
          <paper-listbox slot="dropdown-content" class="dropdown-content">
            ${this.items.map((i => html`
              <paper-item>${i.target}</paper-item>
            `))}
          </paper-listbox>
        </paper-dropdown-menu>

        <paper-dropdown-menu label="Requested By *" vertical-offset="50">
          <paper-listbox slot="dropdown-content" class="dropdown-content">
            ${this.items.map((i => html`
              <paper-item>${i.req_by}</paper-item>
            `))}
          </paper-listbox>
        </paper-dropdown-menu>

        <paper-dropdown-menu label="Assignee *" vertical-offset="50">
          <paper-listbox slot="dropdown-content" class="dropdown-content" selected="0">
            ${this.items.map((i => html`
              <paper-item>${i.assignee}</paper-item>
            `))}
          </paper-listbox>
        </paper-dropdown-menu>

        <vaadin-date-picker label="Needed By Date *">
        </vaadin-date-picker>

        <vaadin-date-picker label="Requested Date *" selected="1/23/2022">
        </vaadin-date-picker>

        </br>
        <paper-button toggles raised class="addBtn">ADD</paper-button>
        <paper-button toggles raised>CANCEL</paper-button>
      </div>

    </paper-dialog>
    `;
  }

  getForm(){
    const dial = this.shadowRoot.querySelector('#dialog');
    dial.open();
  }
}

customElements.define('form-component', FormComponent);
