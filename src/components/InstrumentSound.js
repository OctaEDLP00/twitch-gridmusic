class InstrumentSound extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /* css */`
      :host {

      }

      .container {
        background: black;
        width: var(--cell-size);
        height: var(--cell-size);
        display: grid;
        place-items: center;
        border-radius: 5px;
        filter: grayscale(100%);
      }
    `;
  }

  play() {
    this.sound.play();
  }

  connectedCallback() {
    this.name = this.getAttribute("name");
    this.sound = new Audio(`instruments/${this.name}.flac`);
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${InstrumentSound.styles}</style>
    <div class="container">
      <img src="instruments/${this.name}.svg">
    </div>`;
  }
}

customElements.define("instrument-sound", InstrumentSound);
