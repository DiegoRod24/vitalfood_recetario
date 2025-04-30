
const platos = [
  {
    nombre: "Lomo Saltado",
    imagen: "https://www.comedera.com/wp-content/uploads/2023/04/Lomo-saltado-receta-shutterstock_2145857555.jpg",
    ingredientes: [
      { nombre: "Carne", cantidad: "300g" },
      { nombre: "Papas fritas", cantidad: "200g" },
      { nombre: "Cebolla", cantidad: "100g" },
      { nombre: "Tomate", cantidad: "100g" },
      { nombre: "Sillao", cantidad: "" }
    ],
    infoExtra: {
      tiempoPreparacion: "30 minutos",
      dificultad: "Media"
    }
  },
  {
    nombre: "Ají de Gallina",
    imagen: "https://cdn7.kiwilimon.com/recetaimagen/20502/640x426/37907.jpg.webp",
    ingredientes: [
      { nombre: "Pechuga de pollo", cantidad: "250g" },
      { nombre: "Pan remojado", cantidad: "2 unidades" },
      { nombre: "Ají amarillo", cantidad: "" },
      { nombre: "Leche evaporada", cantidad: "1 taza" },
      { nombre: "Queso parmesano", cantidad: "" }
    ],
    infoExtra: {
      tiempoPreparacion: "45 minutos",
      dificultad: "Fácil"
    }
  }
];

document.getElementById("search").addEventListener("input", function () {
  const value = this.value.toLowerCase();
  const filtered = platos.filter(p => p.nombre.toLowerCase().includes(value));
  renderPlatos(filtered);
});

function renderPlatos(platosToShow) {
  const cont = document.getElementById("platos-container");
  cont.innerHTML = "";
  platosToShow.forEach(plato => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${plato.imagen}" onclick="showImage('${plato.imagen}')" />
      <h2>${plato.nombre}</h2>
      <ul>${plato.ingredientes.map(i => `<li>${i.nombre}: ${i.cantidad}</li>`).join('')}</ul>
      ${plato.infoExtra ? `<p><strong>Info:</strong> ${Object.entries(plato.infoExtra).map(([k,v]) => `${k}: ${v}`).join(', ')}</p>` : ''}
      <button onclick="openReportModal(${JSON.stringify(plato.ingredientes).replace(/"/g, '&quot;')})">🚨 Reportar</button>
    `;
    cont.appendChild(card);
  });
}

function showImage(src) {
  document.getElementById("modalImage").src = src;
  document.getElementById("imageModal").style.display = "block";
}

function closeModal(id) {
  document.getElementById(id).style.display = "none";
}

function openReportModal(ingredientes) {
  const form = document.getElementById("reportForm");
  form.innerHTML = ingredientes
    .filter(i => i.cantidad.trim() === "")
    .map(i => `<label><input type="checkbox" value="${i.nombre}" /> ${i.nombre}</label><br/>`)
    .join("");
  document.getElementById("reportModal").style.display = "block";
}

function sendReport() {
  const selected = Array.from(document.querySelectorAll("#reportForm input:checked"))
    .map(i => i.value);
  if (selected.length === 0) {
    alert("Selecciona al menos un ingrediente.");
    return;
  }
  const mensaje = "Ingredientes por reportar:\n" + selected.join(", ");
  const url = "https://wa.me/51977509592?text=" + encodeURIComponent(mensaje);
  window.open(url, "_blank");
}
