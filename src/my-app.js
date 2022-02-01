import { LitElement, html, css } from 'lit';

import './components/main-component';

export class MyApp extends LitElement {
  static get styles() {
    return [
      css`
        main {
          padding: 20px;
          height: 600px;
        }
      `,
    ];
  }
  render() {
    return html` <main><main-component></main-component></main>`;
  }
}

customElements.define('my-app', MyApp);
