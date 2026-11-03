
const palette = document.getElementById("palette");
const colorPicker = document.getElementById("colorPicker");
const message = document.getElementById("message");

const addColorBtn = document.getElementById("addColorBtn");
const saveBtn = document.getElementById("saveBtn");
const restoreBtn = document.getElementById("restoreBtn");
const exportBtn = document.getElementById("exportBtn");

let colors = [
    "#A7C7E7",
    "#B7E4D8",
    "#F6D6AD",
    "#F2B5D4",
    "#CDB4DB",
    "#BDE0FE"
];

function renderPalette() {
    palette.innerHTML = "";

    colors.forEach((color, index) => {
        const card = document.createElement("div");
        card.className = "color-card";

        const colorBox = document.createElement("div");
        colorBox.className = "color-box";
        colorBox.style.backgroundColor = color;

        const colorCode = document.createElement("span");
        colorCode.className = "color-code";
        colorCode.textContent = color;

        card.append(colorBox, colorCode);

        card.addEventListener("click", () => {
            card.classList.toggle("expanded");
        });

        card.addEventListener("dblclick", (event) => {
            event.preventDefault();
            colors.splice(index, 1);
            renderPalette();
            message.textContent = "Color removed.";
        });

        palette.appendChild(card);
    });
}

addColorBtn.addEventListener("click", () => {
    colors.push(colorPicker.value.toUpperCase());
    renderPalette();
    message.textContent = "Color added!";
});

saveBtn.addEventListener("click", () => {
    localStorage.setItem("savedPalette", JSON.stringify(colors));
    message.textContent = "Palette saved!";
});

restoreBtn.addEventListener("click", () => {
    const saved = localStorage.getItem("savedPalette");

    if (saved) {
        colors = JSON.parse(saved);
        renderPalette();
        message.textContent = "Palette restored!";
    } else {
        message.textContent = "No saved palette found.";
    }
});

exportBtn.addEventListener("click", () => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    canvas.width = 600;
    canvas.height = Math.max(100, colors.length * 100);

    colors.forEach((color, index) => {
        context.fillStyle = color;
        context.fillRect(0, index * 100, 600, 100);

        context.fillStyle = "#222";
        context.font = "20px Arial";
        context.fillText(color, 20, index * 100 + 55);
    });

    const link = document.createElement("a");
    link.download = "my-color-palette.png";
    link.href = canvas.toDataURL("image/png");
    link.click();

    message.textContent = "Palette exported as PNG!";
});

renderPalette();
