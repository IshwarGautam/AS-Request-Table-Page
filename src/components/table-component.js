import { LitElement, html, css } from 'lit';

export class TableComponent extends LitElement {
  static get styles() {
    return css`
      table{
        border-collapse: collapse;
        margin: 25px 10px;
        font-size: 0.9em;
        font-family: sans-serif;
        min-width: 400px;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
      }

      th,td{
        padding: 12px 15px;
        border: 1px solid #dddddd;
      }

      th{
        background: rgb(229,237,244);
      }

      tr:nth-child(even) {
        background-color:#F0FFF0;
      }

      img{
        width:20px;
        height:20px;
      }

      vaadin-grid{
        padding:70px;
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
    
    <vaadin-grid .items = ${this.items} >
      <vaadin-grid-column width="2px">
      </vaadin-grid-column>

      <vaadin-grid-column 
        header='Request ID' 
        path='id'>
      </vaadin-grid-column>

      <vaadin-grid-column 
        header='Project' 
        path='project'>
      </vaadin-grid-column>

      <vaadin-grid-column 
        header='Target' 
        path='target'>
      </vaadin-grid-column>

      <vaadin-grid-column 
        header='Requested By' 
        path='req_by'>
      </vaadin-grid-column>

      <vaadin-grid-column 
        header='Assignee' 
        path='assignee'>
      </vaadin-grid-column>

      <vaadin-grid-column 
        header='Requested Date' 
        path='req_date'>
      </vaadin-grid-column>

      <vaadin-grid-column 
        header='Needed By Date' 
        path='by_date'>
      </vaadin-grid-column>

      <vaadin-grid-column 
        header='Status' 
        path='status'>
      </vaadin-grid-column>
      
    </vaadin-grid>
    `;
  }
}

customElements.define('table-component', TableComponent);
