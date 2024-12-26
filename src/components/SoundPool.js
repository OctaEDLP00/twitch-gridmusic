import "./SoundCell.js";

class SoundPool extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.NUM_CELLS = 10;
    this.style.setProperty("--num-cells", this.NUM_CELLS);
  }

  static get styles() {
    return /* css */`
      :host {
        --gap-size: 1px;
        --pool-size: calc((var(--num-cells) * var(--cell-size)) + ((var(--num-cells) - 1) * var(--gap-size)));
      }

      .container {
        display: grid;
        grid-template-columns: repeat(var(--num-cells), var(--cell-size));
        grid-template-rows: repeat(var(--num-cells), var(--cell-size));
        background-color: grey;
        background-image:
          repeating-linear-gradient(
            to right,
            transparent 0px var(--cell-size),
            #555 var(--cell-size) calc(var(--cell-size) + var(--gap-size))
          ),
          repeating-linear-gradient(
            to bottom,
            transparent 0px var(--cell-size),
            #555 var(--cell-size) calc(var(--cell-size) + var(--gap-size))
          );
        gap: var(--gap-size);
        width: var(--pool-size);
        height: var(--pool-size);
        position: relative;

        & sound-cell {
          z-index: 5;
        }
      }

      svg.lines {
        position: absolute;

        & line {
          stroke-dasharray: 0 200;
          stroke-dashoffset: 0;
        }
      }
    `;
  }

  connectedCallback() {
    this.render();
    this.createCells();
    this.data = [
      { name: "play", volume: 1, id: 42, next: [2, 5] }
    ];
    this.renderInstruments();
  }

  createCells() {
    const container = this.shadowRoot.querySelector(".container");
    for (let i = 0; i < this.NUM_CELLS * this.NUM_CELLS; i++) {
      const cell = document.createElement("sound-cell");
      cell.dataset.index = i;
      container.append(cell);
    }
    container.addEventListener("click", (ev) => {
      const isCell = ev.target.nodeName === "SOUND-CELL";
      const name = document.querySelector("grid-music").currentInstrument;

      if (isCell && name) {
        const hasInstrument = ev.target.hasInstrument();

        if (hasInstrument) return; // Aquí gestionar lineas

        ev.target.setInstrument(name);
        this.data.push({ name, volume: 1, id: Number(ev.target.dataset.index) })
      }
    });

    container.addEventListener("contextmenu", (ev) => {
      const isCell = ev.target.nodeName === "SOUND-CELL";

      if (isCell) {
        ev.preventDefault();
        ev.target.removeInstrument();
        this.data = this.data.filter(item => item.id != ev.target.dataset.index)
      }
    })
  }

  renderInstruments() {
    const cells = [...this.shadowRoot.querySelectorAll(".container sound-cell")];

    this.data.forEach(({ name, id }) => {
      cells[id].setInstrument(name);
    });
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${SoundPool.styles}</style>
    <div class="container">
      <svg viewBox="0 0 ${this.NUM_CELLS * this.NUM_CELLS} ${this.NUM_CELLS * this.NUM_CELLS}" class="lines">
        <line stroke="red" x1="25" y1="45" x2="45" y2="45" />
      </svg>
    </div>`;
  }
}

customElements.define("sound-pool", SoundPool);
