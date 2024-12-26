import { getInstruments } from "../instruments/getInstruments.js";
import "./InstrumentSound.js";

class InstrumentPool extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /* css */`
      :host {

      }

      .container {
        background: indigo;
        padding: 1rem;
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        max-width: 400px;
      }
    `;
  }

  connectedCallback() {
    this.render();
    this.createInstruments();
  }

  createInstruments() {
    const container = this.shadowRoot.querySelector(".container");
    getInstruments().forEach(name => {
      const instrument = document.createElement("instrument-sound");
      instrument.setAttribute("name", name);
      container.append(instrument);
    });
    container.addEventListener("click", (ev) => {
      const isInstrument = ev.target.nodeName === "INSTRUMENT-SOUND";

      if (isInstrument) {
        const name = ev.target.getAttribute("name");
        const event = new CustomEvent("SELECT_INSTRUMENT", {
          detail: name,
          bubbles: true,
          composed: true
        });
        this.dispatchEvent(event);
        ev.target.play();
      }
    });
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${InstrumentPool.styles}</style>
    <div class="container">
    </div>`;
  }
}

customElements.define("instrument-pool", InstrumentPool);
