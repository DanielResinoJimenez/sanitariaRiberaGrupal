
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
  const organos = document.getElementById('organos');

  const descripcion = document.getElementById('cassette__descripcion');
  const organo = document.getElementById('cassette__organo');
  const caracteristicas = document.getElementById('cassette__caracteristicas');
  const observaciones = document.getElementById('cassette__observaciones');

  
  // Modal Nueva Muestra
  const btnNuevaMuestra = document.getElementById('btnNuevaMuestra');
  const modalNuevaMuestra = document.getElementById('modalNuevaMuestra');
  const modalMuestraSave = document.getElementById('modalMuestraSave');
  const modalMuestraClose = document.getElementById('modalMuestraClose');


  let cassettes = [];
  let selectedIndex = -1;

  const actualizarTabla = (cassetes_to_show) => {
    const tbody = document.querySelector('section:nth-child(1) tbody');
    tbody.innerHTML = '';
    cassetes_to_show.forEach((cassette, index) => {
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

  const mostrarDetalles = (index) => {
    const cassette = cassettes[index];
    descripcion.textContent = cassette.descripcion;
    organo.textContent = cassette.organo;
    caracteristicas.textContent = cassette.caracteristicas;
    observaciones.textContent = cassette.observaciones;
    selectedIndex = index;
    actualizarTablaMuestras();
  }

  const limpiarDetalles = () => {
    descripcion.textContent = '---';
    organo.textContent = '---';
    caracteristicas.textContent = '---';
    observaciones.textContent = '---';
    selectedIndex = -1;
  }

  // Función para actualizar la tabla de muestras
  const actualizarTablaMuestras  = () => {
    const tbody = document.querySelector('section:nth-child(2) tbody');
    tbody.innerHTML = '';
    if (selectedIndex >= 0 && selectedIndex < cassettes.length) {
      const cassette = cassettes[selectedIndex];
      if (cassette.muestras) {
        cassette.muestras.forEach((muestra, index) => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td class="px-4 py-2">${muestra.fecha}</td>
            <td class="px-4 py-2">${muestra.descripcion}</td>
            <td class="px-4 py-2">${muestra.tincion}</td>
            <td class="px-4 py-2"><button class="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600" onclick="verDetallesMuestra(${index})">Detalles</button></td>
          `;
          tbody.appendChild(row);
        });
      }
    }
  }

  // Función para ver detalles de una muestra
const verDetallesMuestra = (index) => {
  const cassette = cassettes[selectedIndex];
  const muestra = cassette.muestras[index];
  // alert(`Detalles de la muestra:\nFecha: ${muestra.fecha}\nDescripción: ${muestra.descripcion}\nTinción: ${muestra.tincion}\nObservaciones: ${muestra.observaciones}`);
}


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



  btnNuevaMuestra.addEventListener('click', () => {
    if (selectedIndex >= 0 && selectedIndex < cassettes.length) {
      modalNuevaMuestra.classList.remove('hidden');
      document.body.classList.add('modal-open');
    } else {
      alert('No hay cassette seleccionado para agregar una muestra');
    }
  });

  modalMuestraClose.addEventListener('click', () => {
    modalNuevaMuestra.classList.add('hidden');
    document.body.classList.remove('modal-open');
  });

  modalMuestraSave.addEventListener('click', () => {
    const nuevaMuestra = {
      fecha: document.getElementById('modalMuestraFecha').value,
      descripcion: document.getElementById('modalMuestraDescripcion').value,
      tincion: document.getElementById('modalMuestraTincion').value,
      observaciones: document.getElementById('modalMuestraObservaciones').value,
      imagen: document.getElementById('modalMuestraImagen').files[0] // Aquí puedes manejar la imagen como prefieras
    };

    if (selectedIndex >= 0 && selectedIndex < cassettes.length) {
      const cassette = cassettes[selectedIndex];
      if (!cassette.muestras) {
        cassette.muestras = [];
      }
      cassette.muestras.push(nuevaMuestra);
      localStorage.setItem('cassettes', JSON.stringify(cassettes));
      modalNuevaMuestra.classList.add('hidden');
      document.body.classList.remove('modal-open');
      actualizarTablaMuestras();
    }
  });

  organos.addEventListener('change', () => {
    const organo = organos.value;
    if (organo === '*') {
      actualizarTabla(cassettes);
      return;
    }
    const filtered_cassettes = cassettes.filter(cassette => cassette.organo === organo);
    actualizarTabla(filtered_cassettes);
  });


  document.addEventListener('DOMContentLoaded', () => {
    //Guardar los cassettes en el localStorage
  cassettes = JSON.parse(localStorage.getItem('cassettes')) || [];
  selectedIndex = -1;

      // Función para que al crear un nuevo cassette la fecha no pueda ser anterior al día de hoy
  const fechaInput = document.getElementById('modalFecha');
  const hoy = new Date().toISOString().split('T')[0];
  fechaInput.setAttribute('min', hoy);

  // Mostrar cassettes inicialmente
  actualizarTabla(cassettes);
  
  });

