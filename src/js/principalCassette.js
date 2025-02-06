document.addEventListener('DOMContentLoaded', () => {
    const btnNuevo = document.getElementById('btnNuevo');
    const btnEliminar = document.getElementById('btnEliminar');
    const modalCassette = document.getElementById('modalCassette');
    const modalBorrar = document.getElementById('modalBorrar');
    const modalTitle = document.getElementById('modalTitle');
    const modalFecha = document.getElementById('modalFecha');
    const modalDescripcion = document.getElementById('modalDescripcion');
    const modalOrgano = document.getElementById('modalOrgano');
    const modalCaracteristicas = document.getElementById('modalCaracteristicas');
    const modalObservaciones = document.getElementById('modalObservaciones');
    const modalSave = document.getElementById('modalSave');
    const modalClose = document.getElementById('modalClose');
    const modalBorrarIndex = document.getElementById('modalBorrarIndex');
    const modalBorrarSave = document.getElementById('modalBorrarSave');
    const modalBorrarClose = document.getElementById('modalBorrarClose');
  
    const descripcion = document.getElementById('cassette__descripcion');
    const organo = document.getElementById('cassette__organo');
    const caracteristicas = document.getElementById('cassette__caracteristicas');
    const observaciones = document.getElementById('cassette__observaciones');
    const codigoQR = document.getElementById('cassette__codigoqr');
  
    let cassettes = [];
    let editIndex = -1;
  
    btnNuevo.addEventListener('click', () => {
      editIndex = -1;
      modalTitle.textContent = 'Nuevo Cassette';
      modalFecha.value = '';
      modalDescripcion.value = '';
      modalOrgano.value = '';
      modalCaracteristicas.value = '';
      modalObservaciones.value = '';
      modalCassette.classList.remove('hidden');
    });
  
    btnEliminar.addEventListener('click', () => {
      modalBorrar.classList.remove('hidden');
    });
  
    modalSave.addEventListener('click', () => {
      const nuevoCassette = {
        fecha: modalFecha.value,
        descripcion: modalDescripcion.value,
        organo: modalOrgano.value,
        caracteristicas: modalCaracteristicas.value,
        observaciones: modalObservaciones.value
      };
  
      if (editIndex === -1) {
        cassettes.push(nuevoCassette);
      } else {
        cassettes[editIndex] = nuevoCassette;
      }
  
      modalCassette.classList.add('hidden');
      actualizarTabla();
    });
  
    modalClose.addEventListener('click', () => {
      modalCassette.classList.add('hidden');
    });
  
    modalBorrarSave.addEventListener('click', () => {
      const index = modalBorrarIndex.value;
      if (index >= 0 && index < cassettes.length) {
        cassettes.splice(index, 1);
        modalBorrar.classList.add('hidden');
        actualizarTabla();
      } else {
        alert('Índice inválido');
      }
    });
  
    modalBorrarClose.addEventListener('click', () => {
      modalBorrar.classList.add('hidden');
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
          codigoQR.textContent = cassette.codigoQR;
        });
        tbody.appendChild(row);
      });
    }
  });