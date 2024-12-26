import "./SoundPool.js";
import "./InstrumentPool.js";

class GridMusic extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.currentInstrument = null;
  }

  static get styles() {
    return /* css */`
      :host {
        --cell-size: 50px;
      }

      h1 {
        display: inline-flex;
        font-family: Jost, sans-serif;
        color: #fff;
        padding: 0.25rem 2rem;
        background: linear-gradient(indigo, deeppink);
      }
    `;
  }

  connectedCallback() {
    this.render();

    this.addEventListener("SELECT_INSTRUMENT", (ev) => {
      this.currentInstrument = ev.detail;
      console.log("Nuevo instrumento seleccionado: ", ev.detail);
    })
  }

  render() {
    const html = /* html */`
    <style>${GridMusic.styles}</style>
    <div>
      <h1>Grid Music</h1>
      <sound-pool></sound-pool>
      <instrument-pool></instrument-pool>
    </div>`;
    this.shadowRoot.setHTMLUnsafe(html);
  }
}

customElements.define("grid-music", GridMusic);
