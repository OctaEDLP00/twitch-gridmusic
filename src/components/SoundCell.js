class SoundCell extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /* css */`
      :host {
      }

      .container {
        display: grid;
        place-items: center;
        width: 100%;
        height: 100%;

        & img {
          border-radius: 6px;
          padding: 4px;
        }
      }

      .container:not(:empty) img {
        background: #000;
      }
    `;
  }

  connectedCallback() {
    this.render();
  }

  setInstrument(name) {
    const container = this.shadowRoot.querySelector(".container");
    container.setHTMLUnsafe("");
    const img = document.createElement("img");
    img.src = `instruments/${name}.svg`;
    container.append(img);
  }

  removeInstrument() {
    const container = this.shadowRoot.querySelector(".container");
    container.setHTMLUnsafe("");
  }

  hasInstrument() {
    const container = this.shadowRoot.querySelector(".container");
    return container.children.length > 0;
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${SoundCell.styles}</style>
    <div class="container"></div>`;
  }
}

/*

index = x + (y * width)
entonces x = index % width y = index / width

https://stackoverflow.com/questions/16790584/converting-index-of-one-dimensional-array-into-two-dimensional-array-i-e-row-a/16790720#16790720

(cortesía de CataDev)
*/

customElements.define("sound-cell", SoundCell);
