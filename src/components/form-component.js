import { LitElement, html, css } from 'lit';
import { formatISO } from 'date-fns';

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

      
    `;
  }

  static get properties() {
    return {
      items:{type:Array},
      data:{type:Object},
      onAddRow:{type:Function}
    };
  }


  constructor() {
    super();
     
    this.option = {id:['Aspin-clone-sprint1','Request 01 1/18/2022','Aspen-Example-1'],
                  project: ['HBL','ADCL','BOMD'],
                  target: ['HBL-completion','ADCL-completion','BOMD-completion'],
                  req_by: ['Ishwar Gautam','Bishnu Adhikari', 'Kapil Dev'],
                  assignee: ['Manish Panday', 'Amit Joshi', 'Mamata Adhikari'],
                  }

    this.data = {id: '', project: '', target: '', req_by: '', assignee: '', req_date: '',  status: ''};

    this.openDialog = this.openDialog.bind(this);
    this.closeDialog = this.closeDialog.bind(this);

    this.onAddRow = () => {};
  }

  render() {
    return html`
    

    <paper-dialog id="dialog" entry-animation="scale-up-animation" exit-animation="fade-out-animation" with-backdrop>
      <div class="form">
        <h2>Add Synthesis Request</h2>

        <paper-dropdown-menu label="Reaction Workflow *" vertical-offset="50">
          <paper-listbox slot="dropdown-content" class="dropdown-content">
            ${this.option.id.map((i => html`
              <paper-item @click=${()=>this.handleChange('id',i)}>${i}</paper-item>
            `))}
          </paper-listbox>
        </paper-dropdown-menu>

        <paper-input label="Request Name *"></paper-input>

        <paper-dropdown-menu label="Project *" vertical-offset="50">
          <paper-listbox slot="dropdown-content" class="dropdown-content">
            ${this.option.project.map((i => html`
              <paper-item @click=${()=>this.handleChange('project',i)}>${i}</paper-item>
            `))}
          </paper-listbox>
        </paper-dropdown-menu>

        <paper-dropdown-menu label="Target *" vertical-offset="50">
          <paper-listbox slot="dropdown-content" class="dropdown-content">
          ${this.option.target.map((i => html`
              <paper-item @click=${()=>this.handleChange('target',i)}>${i}</paper-item>
            `))}
          </paper-listbox>
        </paper-dropdown-menu>

        <paper-dropdown-menu label="Requested By *" vertical-offset="50">
          <paper-listbox slot="dropdown-content" class="dropdown-content">
          ${this.option.req_by.map((i => html`
              <paper-item @click=${()=>this.handleChange('req_by',i)}>${i}</paper-item>
            `))}
          </paper-listbox>
        </paper-dropdown-menu>

        <paper-dropdown-menu label="Assignee *" vertical-offset="50">
          <paper-listbox slot="dropdown-content" class="dropdown-content" selected="0">
          ${this.option.assignee.map((i => html`
              <paper-item @click=${()=>this.handleChange('assignee',i)}>${i}</paper-item>
            `))}
          </paper-listbox>
        </paper-dropdown-menu>

        <vaadin-date-picker label="Needed By Date *" .min="${formatISO(Date.now(), { representation: 'date' })}">
        </vaadin-date-picker>

        <vaadin-date-picker label="Requested Date *" selected="1/22/2022">
        </vaadin-date-picker>

        </br>
        <paper-button toggles raised class="addBtn" @click = ${this.addRow}>ADD</paper-button>
        <paper-button toggles raised @click = ${this.closeDialog}>CANCEL</paper-button>
      </div>

    </paper-dialog>
    `;
  }

  handleChange(key, item){
    this.data = {...this.data, [key]:item}
  }

  openDialog(){
    const dial = this.shadowRoot.querySelector('#dialog');
    dial.open();
  }

  closeDialog(){
    const form = this.shadowRoot.querySelector('#dialog');
    form.close();
  }

  addRow(){

    this.onAddRow(this.data);

    // console.log(this.data.id);
  }
}

customElements.define('form-component', FormComponent);
