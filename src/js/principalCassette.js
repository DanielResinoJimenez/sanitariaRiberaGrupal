document.addEventListener('DOMContentLoaded', () => {
    const btnNuevo = document.getElementById('btnNuevo');
    const btnBorrarDetalle = document.getElementById('btnBorrarDetalle');
    const modalCassette = document.getElementById('modalCassette');
    const modalTitle = document.getElementById('modalTitle');
    const modalFecha = document.getElementById('modalFecha');
    const modalDescripcion = document.getElementById('modalDescripcion');
    const modalOrgano = document.getElementById('modalOrgano');
    const modalCaracteristicas = document.getElementById('modalCaracteristicas');
    const modalObservaciones = document.getElementById('modalObservaciones');
    const modalSave = document.getElementById('modalSave');
    const modalClose = document.getElementById('modalClose');
  
    const descripcion = document.getElementById('cassette__descripcion');
    const organo = document.getElementById('cassette__organo');
    const caracteristicas = document.getElementById('cassette__caracteristicas');
    const observaciones = document.getElementById('cassette__observaciones');
  
    let cassettes = [];
    let selectedIndex = -1;
  
    btnNuevo.addEventListener('click', () => {
      selectedIndex = -1;
      modalTitle.textContent = 'Nuevo Cassette';
      modalFecha.value = '';
      modalDescripcion.value = '';
      modalOrgano.value = '';
      modalCaracteristicas.value = '';
      modalObservaciones.value = '';
      modalCassette.classList.remove('hidden');
    });
  
    btnBorrarDetalle.addEventListener('click', () => {
      if (selectedIndex >= 0 && selectedIndex < cassettes.length) {
        cassettes.splice(selectedIndex, 1);
        limpiarDetalles();
        actualizarTabla();
      } else {
        alert('No hay cassette seleccionado para borrar');
      }
    });
  
    modalSave.addEventListener('click', () => {
      const nuevoCassette = {
        fecha: modalFecha.value,
        descripcion: modalDescripcion.value,
        organo: modalOrgano.value,
        caracteristicas: modalCaracteristicas.value,
        observaciones: modalObservaciones.value
      };
  
      if (selectedIndex === -1) {
        cassettes.push(nuevoCassette);
      } else {
        cassettes[selectedIndex] = nuevoCassette;
      }
  
      modalCassette.classList.add('hidden');
      actualizarTabla();
    });
  
    modalClose.addEventListener('click', () => {
      modalCassette.classList.add('hidden');
    });
  
    function actualizarTabla() {
      const tbody = document.querySelector('section:nth-child(1) tbody');
      tbody.innerHTML = '';
      cassettes.forEach((cassette, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td class="px-4 py-2">${cassette.fecha}</td>
          <td class="px-4 py-2">${cassette.descripcion}</td>
          <td class="px-4 py-2">${cassette.organo}</td>
        `;
        row.addEventListener('click', () => {
          descripcion.textContent = cassette.descripcion;
          organo.textContent = cassette.organo;
          caracteristicas.textContent = cassette.caracteristicas;
          observaciones.textContent = cassette.observaciones;
          selectedIndex = index;
        });
        tbody.appendChild(row);
      });
    }
  
    function limpiarDetalles() {
      descripcion.textContent = '---';
      organo.textContent = '---';
      caracteristicas.textContent = '---';
      observaciones.textContent = '---';
      selectedIndex = -1;
    }
  });