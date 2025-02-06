document.addEventListener('DOMContentLoaded', () => {
  const btnNuevo = document.getElementById('btnNuevo');
  const btnBorrarDetalle = document.getElementById('btnBorrarDetalle');
  const btnModificarDetalle = document.getElementById('btnModificarDetalle');
  const modalCassette = document.getElementById('modalCassette');
  const modalModificarCassette = document.getElementById('modalModificarCassette');
  const modalConfirmarBorrar = document.getElementById('modalConfirmarBorrar');
  const modalTitle = document.getElementById('modalTitle');
  const modalFecha = document.getElementById('modalFecha');
  const modalDescripcion = document.getElementById('modalDescripcion');
  const modalOrgano = document.getElementById('modalOrgano');
  const modalCaracteristicas = document.getElementById('modalCaracteristicas');
  const modalObservaciones = document.getElementById('modalObservaciones');
  const modalSave = document.getElementById('modalSave');
  const modalClose = document.getElementById('modalClose');
  const modalModificarTitle = document.getElementById('modalModificarTitle');
  const modalModificarFecha = document.getElementById('modalModificarFecha');
  const modalModificarDescripcion = document.getElementById('modalModificarDescripcion');
  const modalModificarOrgano = document.getElementById('modalModificarOrgano');
  const modalModificarCaracteristicas = document.getElementById('modalModificarCaracteristicas');
  const modalModificarObservaciones = document.getElementById('modalModificarObservaciones');
  const modalModificarSave = document.getElementById('modalModificarSave');
  const modalModificarClose = document.getElementById('modalModificarClose');
  const modalConfirmarBorrarClose = document.getElementById('modalConfirmarBorrarClose');
  const modalConfirmarBorrarEliminar = document.getElementById('modalConfirmarBorrarEliminar');

  const descripcion = document.getElementById('cassette__descripcion');
  const organo = document.getElementById('cassette__organo');
  const caracteristicas = document.getElementById('cassette__caracteristicas');
  const observaciones = document.getElementById('cassette__observaciones');

  //Guardar los cassettes en el localStorage
  let cassettes = JSON.parse(localStorage.getItem('cassettes')) || [];
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
    document.body.classList.add('modal-open');
  });

  btnBorrarDetalle.addEventListener('click', () => {
    if (selectedIndex >= 0 && selectedIndex < cassettes.length) {
      modalConfirmarBorrar.classList.remove('hidden');
      document.body.classList.add('modal-open');
    } else {
      alert('No hay cassette seleccionado para borrar');
    }
  });

  btnModificarDetalle.addEventListener('click', () => {
    if (selectedIndex >= 0 && selectedIndex < cassettes.length) {
      const cassette = cassettes[selectedIndex];
      modalModificarTitle.textContent = 'Modificar Cassette';
      modalModificarFecha.value = cassette.fecha;
      modalModificarDescripcion.value = cassette.descripcion;
      modalModificarOrgano.value = cassette.organo;
      modalModificarCaracteristicas.value = cassette.caracteristicas;
      modalModificarObservaciones.value = cassette.observaciones;
      modalModificarCassette.classList.remove('hidden');
      document.body.classList.add('modal-open');
    } else {
      alert('No hay cassette seleccionado para modificar');
    }
  });

  modalConfirmarBorrarEliminar.addEventListener('click', () => {
    if (selectedIndex >= 0 && selectedIndex < cassettes.length) {
      cassettes.splice(selectedIndex, 1);
      localStorage.setItem('cassettes', JSON.stringify(cassettes));
      limpiarDetalles();
      actualizarTabla();
      modalConfirmarBorrar.classList.add('hidden');
      document.body.classList.remove('modal-open');
    }
  });

  modalConfirmarBorrarClose.addEventListener('click', () => {
    modalConfirmarBorrar.classList.add('hidden');
    document.body.classList.remove('modal-open');
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

    localStorage.setItem('cassettes', JSON.stringify(cassettes));
    modalCassette.classList.add('hidden');
    document.body.classList.remove('modal-open');
    actualizarTabla();
  });

  modalModificarSave.addEventListener('click', () => {
    if (selectedIndex >= 0 && selectedIndex < cassettes.length) {
      cassettes[selectedIndex] = {
        fecha: modalModificarFecha.value,
        descripcion: modalModificarDescripcion.value,
        organo: modalModificarOrgano.value,
        caracteristicas: modalModificarCaracteristicas.value,
        observaciones: modalModificarObservaciones.value
      };
      localStorage.setItem('cassettes', JSON.stringify(cassettes));
      modalModificarCassette.classList.add('hidden');
      document.body.classList.remove('modal-open');
      actualizarTabla();
      mostrarDetalles(selectedIndex);
    }
  });

  modalClose.addEventListener('click', () => {
    modalCassette.classList.add('hidden');
    document.body.classList.remove('modal-open');
  });

  modalModificarClose.addEventListener('click', () => {
    modalModificarCassette.classList.add('hidden');
    document.body.classList.remove('modal-open');
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
        mostrarDetalles(index);
      });
      tbody.appendChild(row);
    });
  }

  function mostrarDetalles(index) {
    const cassette = cassettes[index];
    descripcion.textContent = cassette.descripcion;
    organo.textContent = cassette.organo;
    caracteristicas.textContent = cassette.caracteristicas;
    observaciones.textContent = cassette.observaciones;
    selectedIndex = index;
  }

  function limpiarDetalles() {
    descripcion.textContent = '---';
    organo.textContent = '---';
    caracteristicas.textContent = '---';
    observaciones.textContent = '---';
    selectedIndex = -1;
  }

  // Mostrar cassettes inicialmente
  actualizarTabla();
});