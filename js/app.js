const data = platosData;
const container = document.getElementById("platosContainer");
const searchInput = document.getElementById("searchInput");
const reportModal = document.getElementById("reportModal");
const checkboxContainer = document.getElementById("checkboxContainer");
let currentIngredients = [];

function renderPlatos(platos) {
  container.innerHTML = "";
  platos.forEach((plato, index) => {
    const div = document.createElement("div");
    div.className = "card";

    const img = document.createElement("img");
    img.src = plato.imagen;
    img.alt = plato.nombre;
    img.onclick = () => showImage(plato.imagen);

    const content = document.createElement("div");
    content.className = "card-content";

    const title = document.createElement("h3");
    title.textContent = plato.nombre;

    const list = document.createElement("ul");
    plato.ingredientes.forEach(i => {
      const li = document.createElement("li");
      li.textContent = `${i.nombre}: ${i.cantidad}`;
      list.appendChild(li);
    });

    const buttons = document.createElement("div");
    buttons.className = "buttons";

    const viewBtn = document.createElement("button");
    viewBtn.className = "btn view animate";
    viewBtn.textContent = "Ver Imagen";
    viewBtn.onclick = () => showImage(plato.imagen);

    const reportBtn = document.createElement("button");
    reportBtn.className = "btn report animate";
    reportBtn.textContent = "Reportar";
    reportBtn.onclick = () => {
      openReport(plato.ingredientes.map(i => i.nombre));
    };

    buttons.appendChild(viewBtn);
    buttons.appendChild(reportBtn);

    // Extra info
    const extraBtn = document.createElement("button");
    extraBtn.className = "btn extra animate";
    extraBtn.textContent = "+";
    extraBtn.onclick = () => {
      extraDiv.style.display = extraDiv.style.display === "none" ? "block" : "none";
      extraBtn.textContent = extraDiv.style.display === "block" ? "−" : "+";
    };

    buttons.appendChild(extraBtn);

    content.appendChild(title);
    content.appendChild(list);
    content.appendChild(buttons);

    // Info adicional
    const extraDiv = document.createElement("div");
    extraDiv.className = "extra-info";
    extraDiv.style.display = "none";

    if (plato.infoExtra) {
      for (const key in plato.infoExtra) {
        const p = document.createElement("p");
        p.textContent = `${key}: ${plato.infoExtra[key]}`;
        extraDiv.appendChild(p);
      }
    }

    content.appendChild(extraDiv);

    div.appendChild(img);
    div.appendChild(content);
    container.appendChild(div);
  });
}

function showImage(src) {
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImage");
  modalImg.src = src;
  modal.classList.remove("hidden");
}

function openReport(ingredients) {
  reportModal.classList.remove("hidden");
  checkboxContainer.innerHTML = "";
  currentIngredients = ingredients;
  ingredients.forEach(name => {
    const label = document.createElement("label");
    label.innerHTML = `<input type="checkbox" value="${name}" /> ${name}`;
    checkboxContainer.appendChild(label);
    checkboxContainer.appendChild(document.createElement("br"));
  });
}

function closeModal(id) {
  document.getElementById(id).classList.add("hidden");
}

document.getElementById("reportForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const checked = Array.from(checkboxContainer.querySelectorAll("input:checked")).map(input => input.value);
  const msg = `Ingredientes faltantes: ${checked.join(", ")}`;
  const url = `https://wa.me/51998199885?text=${encodeURIComponent(msg)}`;
  window.open(url, "_blank");
});

searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  const filtered = data.filter(p => p.nombre.toLowerCase().includes(query));
  renderPlatos(filtered);
});

renderPlatos(data);
