import { LitElement, html, css } from 'lit';

import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-checkbox/paper-checkbox.js';
import '@polymer/paper-input/paper-textarea.js';
import '@polymer/paper-button/paper-button.js';
import '@vaadin/date-picker';

export class TestComponent extends LitElement {
  /**
   * Styling the Form
   */
  static get styles() {
    return css`

      .createBtn{
        background:rgb(233,30,98);
        color:ivory;
        font-weight:bold;
      }
      
      .wrapper{
        border: 1px solid black;
        padding: 20px;
        width:500px;
        background:white;
      }

      .col2{
        margin-left:30px;
      }

      .binding-group{
        border:1px solid gray;
        padding:5px;
        height:100px;
        overflow-y:auto;
        overflow-x:hidden;
      }

      p{
        color: gray;
        font-size: 12px;
      }

      .checkbox{
        width:100%;
        padding:8px;
      }

      vaadin-date-picker{
        width:100%;
      }

      ::-webkit-scrollbar {
        width:15px
      }
    
      ::-webkit-scrollbar-thumb {
          background-color:rgb(186,186,192);
          border-radius:20px;
          border:5px solid #fff;
      }
    `;
  }

  static get properties(){
    return{
      trackData:{type:Function}
    }
  }

  constructor() {
    super();

    this.bindingGroups = [
      "BRD2 Affinity_High_Affinity",
      "BRD2 AMP_PNP_competitive",
      "BRD@ NRX-0459676_non-competitive",
      "BRD3 Affinity_High_Affinity",
      "BRD3 AMP_PNP_competitive",
      "BRD# NRX-0459676_non-competitive"
    ]; 
    
    this.message = [
      {m1:'Please provide name'},
      {m2: 'Please provide description'}
    ]

    this.content = {
      name:'',
      description:''
    } 

    this.trackData = () => {};

  }

  render() {
    return html`
      <div class = "wrapper">
        <h2>Create Binding Group</h2>

        <table width="500px">
          <tr>
            <td><paper-input 
                  label="Name" 
                  always-float-label
                  @keyup = ${this.getName}>
                </paper-input>
                <div class=${this.empty}>Hello brother</div>
            </td>

            <td><paper-input 
                  class = "col2" 
                  label="Ligands Promoted" 
                  always-float-label 
                  auto-validate pattern="[0-9]*" 
                  error-message="Provide Number!">
                </paper-input>
            </td>
          </tr>

          <tr>
            <td><paper-input 
                  label="Description" 
                  always-float-label
                  @keyup = ${this.getDescription}>
                </paper-input>
                <div class="empty">${this.message.m2}</div>
            </td>
            
            <td><paper-input 
                  class = "col2" 
                  label="Total Ligands in Binding Group" 
                  always-float-label 
                  auto-validate pattern="[0-9]*" 
                  error-message="Provide Number!">
                </paper-input>
            </td>
          </tr>
          <tr>
            <td colspan="2">
              <vaadin-date-picker class="date"
                  label = "Date"
                  Placeholder = "DD-MM-YYYY">
              </vaadin-date-picker>
            </td>
          </tr>
          
          <tr>
            <td colspan = "2">
              <p>Binding Group</p>
              <div class = "binding-group">
                ${this.bindingGroups.map((group) => html`
                  <paper-checkbox noink class="checkbox"
                    ?checked = ${this.check}
                    @change = ${this.updateChecklist}>
                      ${group}
                    </paper-checkbox><br/>
                `)}
              </div>
            </td>
          </tr>

          <tr>
            <td colspan = "2">
              <paper-textarea 
                  label="Comments" 
                  always-float-label
                  rows = "2">
              </paper-textarea>
            </td>
          </tr>
            <td colspan = "2">
              <paper-button 
                toggles raised 
                class = "createBtn"
                @click = ${this.submit}>
                  CREATE
              </paper-button>
              
              <paper-button 
                toggles raised>
                  CANCEL
              </paper-button>
            </td>
          </tr>
      </table>
      </div>
    `;
  }

  updateChecklist = e => {
    this.check = e.target.checked;

    this.color = this.check?'rgb(245,245,245)':'transparent';
    e.target.style.background = this.color;
  }

  getName = e => this.content.name = e.target.value;
  getDescription = e => this.content.description = e.target.value;

  submit = e => {
    this.trackData = ({...this.content});
    if (this.trackData.name === '') this.empty.style.background = 'red';
  }
}

customElements.define('test-component', TestComponent);
