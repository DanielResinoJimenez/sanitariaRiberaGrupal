// REFERENCIAS DEL DOM

//Nuevo cassete
const btnNuevo = document.getElementById('btnNuevo');

//Detalles de un cassette
const btnBorrarDetalle = document.getElementById('btnBorrarDetalle');
const btnModificarDetalle = document.getElementById('btnModificarDetalle');
const modalCassette = document.getElementById('modalCassette');
const modalModificarCassette = document.getElementById('modalModificarCassette');
const modalConfirmarBorrar = document.getElementById('modalConfirmarBorrar');

//Modal muestra
const modalMuestra = document.getElementById('modalMuestra');
const modalTitle = document.getElementById('modalTitle');
const modalFecha = document.getElementById('modalFecha');
const modalDescripcion = document.getElementById('modalDescripcion');
const modalOrgano = document.getElementById('modalOrgano');
const modalCaracteristicas = document.getElementById('modalCaracteristicas');
const modalObservaciones = document.getElementById('modalObservaciones');
const modalSave = document.getElementById('modalSave');
const modalClose = document.getElementById('modalClose');

//Modal modificar
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
const modalMuestraModificar = document.getElementById("modalMuestraModificar");
const modalMuestraSaveModify = document.getElementById("modalMuestraSaveModify");
const modalMuestraCloseModify = document.getElementById("modalMuestraCloseModify");

// Fecha y select del header
const organos = document.getElementById('organos');
const fechaInicioInput = document.getElementById('fechaInicioInput');
const fechaFinInput = document.getElementById('fechaFinInput');
const muestra__tbody = document.getElementById('muestra__tbody');
const tbody = document.getElementById("tbody");

const descripcion = document.getElementById('cassette__descripcion');
const organo = document.getElementById('cassette__organo');
const caracteristicas = document.getElementById('cassette__caracteristicas');
const observaciones = document.getElementById('cassette__observaciones');
const id_cassette = document.getElementById("cassette_id")


// Modal Nueva Muestra
const btnNuevaMuestra = document.getElementById('btnNuevaMuestra');
const modalNuevaMuestra = document.getElementById('modalNuevaMuestra');
const modalMuestraSave = document.getElementById('modalMuestraSave');
const modalMuestraClose = document.getElementById('modalMuestraClose');
const descMuestra = document.getElementById("descMuestra");
const fechaMuestra = document.getElementById("fechaMuestra");
const tincionMuestra = document.getElementById("tincionMuestra");
const obserMuestra = document.getElementById("obserMuestra");


//Referencias a los formularios por id
const nuevoCassetteForm = document.getElementById('nuevoCassetteForm');
const modificarCassetteForm = document.getElementById('modificarCassetteForm');
const modalMuestraImagen = document.getElementById('modalMuestraImagen');
const nuevaMuestraForm = document.getElementById('nuevaMuestraForm');
const BorrarCassetteForm = document.getElementById('BorrarCassetteForm');
const qrFrom = document.getElementById('qrForm');
const fechaInicioForm = document.getElementById('fechaInicioForm');
const fechaFinForm = document.getElementById('fechaFinForm');
const muestraDescripcion = document.getElementById("muestraDescripcion")
const muestraFecha = document.getElementById("muestraFecha")
const muestraTincion = document.getElementById("muestraTincion")
const muestraObservacion = document.getElementById("muestraObservacion")
const imageInput = document.getElementById('modalMuestraImagen');
const formMuestra = document.getElementById("formMuestra");
const modalMuestraEliminar = document.getElementById("modalMuestraEliminar");
const imagenMuestra = document.getElementById("imagenMuestra"); // Recuadro en detalles para ver la imagen más grande

// Referencias a los encabezados de la tabla de cassettes
const order = document.getElementById("order")


const urls = {
  backend: 'http://localhost:3000/sanitaria',
  users: '/usuarios/all',
  cassettes: '/cassettes/all',
  cassettes_insert: '/cassettes/create',
  cassettes_update: '/cassettes/modify',
  cassettes_delete: '/cassettes/delete/',
  muestras: '/muestras/all',
  muestra: '/muestras',
  cassettes_date: "/cassettes/orderbydate",
  cassettes_organo: "/cassettes/orderbyorganos",
  cassettes_descripcion: "/cassettes/orderbydescripcion/"
}

// VARIABLES GLOBALES

let cassettes = [];
let muestras = [];
let lastMuestra = []; // Esta variable se utiliza para almacenar la última muestra creada y poder subir la imagen que el pertenece
let imagenes = [];
let selectedIndex = -1;
let selectedMuestraIndex = -1;
let fecha_inicio = '';
let fecha_fin = '';
let filtered_cassettes;

// PETICIONES A LA API

// Petición mostrar cassettes desde la api

const cassettesApi = () => {
  cassettes = [];  // Limpiar el array antes de llenarlo
  fetch(urls.backend + urls.cassettes)
    .then(response => response.json())
    .then(data => {
      data.forEach((cassette) => {
        cassettes.push(cassette);
      })
      actualizarTabla(cassettes);
    });
}

// Petición post en la api
const post = (url, data,) => {

  const url_request = urls.backend + urls[url]

  // Usa fetch para hacer la petición POST
  fetch(url_request, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      cassettesApi(); // Recargar la lista completa desde la API
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

// Petición put en la api

const put = (url, data, id) => {
  const url_request = urls.backend + urls[url] + '/' + id;

  // Usa fetch para hacer la petición PUT
  fetch(url_request, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      cassettesApi();
    })
    .catch((error) => {
      console.error('Error:', error);
    });
};

// Petición delete en la api

const del = (url, id) => {
  const url_request = urls.backend + urls[url] + id;

  // Usa fetch para hacer la petición DELETE
  fetch(url_request, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: id })
  })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      cassettesApi();
    })
    .catch((error) => {
      console.error('Error:', error);
    });
};

// Cargar muestras de cassettes
const cargarMuestrasApi = () => {
  fetch("http://localhost:3000/sanitaria/muestras/all")
    .then(response => response.json())
    .then(data => {
      muestras.length = "";
      data.forEach((muestra) => {
        muestras.push(muestra)
      })
    });
}

// Consulta post para crear una nueva muestra en la api
// Función para crear la muestra
const createMuestra = (newMuestra, formData) => {
  fetch("http://localhost:3000/sanitaria/muestras/create", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newMuestra),  // Enviar los datos de la muestra
  })
    .then(result => result.json())
    .then(data => {
      console.log('Muestra creada:', data);

      if (data.id_muestra) {
        // Agregar el id_muestra al formData para enviar junto con la imagen
        formData.append('id_muestra', data.id_muestra);
        // Llamar a la función para crear la imagen
        createImagen(formData);  // Enviar la imagen con el id_muestra
        window.reload;
      }
    })
    .catch(error => {
      console.error('Error al crear la muestra:', error);
    });
};

// Como las imagenes van acorde con la muestra tenemos que crear la insercion de la imagen en su tabla a la vez que se crea la muestra.
// Función para crear la imagen asociada a la muestra
const createImagen = (formData) => {
  fetch("http://localhost:3000/sanitaria/imagenes/create", {
    method: "POST",
    body: formData,  // Enviar el FormData con los datos de la imagen y el id_muestra
  })
    .then(result => result.json())
    .then(data => {
      console.log('Imagen creada:', data);
      cargarMuestrasApi();  // Recargar las muestras con las imágenes
      mostrarMuestraPorCassette(cassettes[selectedIndex].id_cassette);
      window.reload;
    })
    .catch(error => {
      console.error('Error al crear la imagen:', error);
    });
};

// Mostrar imagen en los detalles de la muestra

const imagenPorMuestra = (id_muestra) => {
  return fetch("http://localhost:3000/sanitaria/imagenes/" + id_muestra)
    .then(response => response.json())
    .then(data => {
      imagenes.length = 0; // Limpiar el array antes de llenarlo
      imagenes.push(...data); // Agregar las imágenes al array
      console.log("Imágenes cargadas:", imagenes);
      return imagenes; // Devolver el array de imágenes para poder usarlo después
    });
};

// Borrar imagen

const deleteImagen = (id) => {
  fetch("http://localhost:3000/sanitaria/imagenes/delete/" + id, {
    method: "DELETE",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: id })
  })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

// Modificar muestra
const modifyMuestra = (id, data) => {
  fetch(`http://localhost:3000/sanitaria/muestras/modify/${id}`, {
    method: 'PUT', // O el método que uses en tu backend
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error en la modificación de la muestra');
      }
      return response.json();
    })
    .then(data => {
      console.log('Muestra modificada con éxito:', data);
    })
    .then(() => {
      mostrarMuestraPorCassette(cassettes[selectedIndex].id_cassette);
      window.location.reload();
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

// Borrar muestras de un cassette
const deleteMuestra = (id) => {
  fetch("http://localhost:3000/sanitaria/muestras/delete/" + id, {
    method: "DELETE",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: id })
  })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      id = parseInt(id);
      const index = muestras.findIndex(m => m.id_muestra == id);
      if (index >= 0) {
        muestras.splice(index, 1);
      }
      
      mostrarMuestraPorCassette(selectedIndex); // 💡 Aquí aseguramos que la UI refleje el cambio
      window.reload;
    })
    .catch((error) => {
      console.error('Error:', error);
    });
};

// FUNCIONES DE CASSETTES

// Actualiza la tabla de cassettes 
const actualizarTabla = (cassetes_to_show) => {
  const tbody = document.querySelector('tbody');
  tbody.innerHTML = '';

  cassetes_to_show.forEach((cassette, index) => {
    const row = document.createElement('tr');

    const fechaActualizada = document.createElement('td');
    fechaActualizada.classList.add('px-4', 'py-2');
    fechaActualizada.textContent = cassette.fecha ? cassette.fecha.split('T')[0] : 'No hay fecha asignada para este cassette';
    row.appendChild(fechaActualizada);

    const descripcionActualizada = document.createElement('td');
    descripcionActualizada.classList.add('px-4', 'py-2');
    descripcionActualizada.textContent = cassette.descripcion;
    row.appendChild(descripcionActualizada);

    const organoActualizado = document.createElement('td');
    organoActualizado.classList.add('px-4', 'py-2');
    organoActualizado.textContent = cassette.organo;
    row.appendChild(organoActualizado);

    row.addEventListener('click', () => {
      mostrarDetalles(index);
    });

    tbody.appendChild(row);
  });
}

// Muestra los detalles de un cassette seleccionado
const mostrarDetalles = (index) => {
  const cassette = cassettes[index];
  descripcion.textContent = cassette.descripcion;
  organo.textContent = cassette.organo;
  caracteristicas.textContent = cassette.caracteristicas;
  observaciones.textContent = cassette.observaciones;
  selectedIndex = index;
  actualizarTablaMuestras();
  mostrarMuestraPorCassette(cassette.id_cassette);
}

// Limpia los detalles de un cassette seleccionado
const limpiarDetalles = () => {
  descripcion.textContent = '---';
  organo.textContent = '---';
  caracteristicas.textContent = '---';
  observaciones.textContent = '---';
  selectedIndex = -1;
}

// Actualiza la tabla de muestras asociadas a un cassette
const actualizarTablaMuestras = () => {
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
          <td class="px-4 py-2"><button class="muestra__button bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600" >Detalles</button></td>
        `;
        tbody.appendChild(row);
      });
    }
  }
}

// Muestra los detalles de una muestra específica
const verDetallesMuestra = (index) => {
  const cassette = cassettes[selectedIndex];
  const muestra = cassette.muestras[index];
  // alert(`Detalles de la muestra:\nFecha: ${muestra.fecha}\nDescripción: ${muestra.descripcion}\nTinción: ${muestra.tincion}\nObservaciones: ${muestra.observaciones}`);
}

// Maneja el evento de clic en el botón 'Nuevo' para abrir el modal de creación de cassette

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

// Maneja el evento de clic en el botón 'Borrar' para abrir el modal de confirmación de borrado

btnBorrarDetalle.addEventListener('click', () => {
  if (selectedIndex >= 0 && selectedIndex < cassettes.length) {
    modalConfirmarBorrar.classList.remove('hidden');
    document.body.classList.add('modal-open');
  } else {
    alert('No hay cassette seleccionado para borrar');
  }
});

// Maneja el evento de clic en el botón 'Modificar' para abrir el modal de modificación de cassette

btnModificarDetalle.addEventListener('click', () => {
  const cassette = cassettes[selectedIndex];
  modalModificarTitle.textContent = 'Modificar Cassette';
  modalModificarFecha.value = cassette.fecha;
  modalModificarDescripcion.value = cassette.descripcion;
  modalModificarOrgano.value = cassette.organo;
  modalModificarCaracteristicas.value = cassette.caracteristicas;
  modalModificarObservaciones.value = cassette.observaciones;
  modalModificarCassette.classList.remove('hidden');
  document.body.classList.add('modal-open');
});

// Maneja el evento de submit en el botón de confirmación de borrado para eliminar un cassette
BorrarCassetteForm.addEventListener('submit', (event) => {
  //Evitar que se envie el formulario
  event.preventDefault();
  // cassettes.splice(selectedIndex, 1);
  del('cassettes_delete', cassettes[selectedIndex].id_cassette);
  // localStorage.setItem('cassettes', JSON.stringify(cassettes));
  // limpiarDetalles();
  cassettesApi();
  modalConfirmarBorrar.classList.add('hidden');
  document.body.classList.remove('modal-open');
});

// Maneja el evento de clic en el botón de cierre del modal de confirmación de borrado
modalConfirmarBorrarClose.addEventListener('click', () => {
  modalConfirmarBorrar.classList.add('hidden');
  document.body.classList.remove('modal-open');
});

// Maneja el evento de sumbit en el botón de guardar para crear un nuevo cassette
nuevoCassetteForm.addEventListener('submit', (event) => {
  //Evitar que se envie el formulario
  event.preventDefault();
  const nuevoCassette = {
    fecha: modalFecha.value,
    descripcion: modalDescripcion.value,
    organo: modalOrgano.value,
    caracteristicas: modalCaracteristicas.value,
    observaciones: modalObservaciones.value,
    identificador: crypto.randomUUID(),
    id_user: 1 // SE DEBE DE COGER DEL LOCAL STORAGE
  };

  post('cassettes_insert', nuevoCassette);
  modalCassette.classList.add('hidden');
  document.body.classList.remove('modal-open');
  cassettesApi();
  actualizarTabla(cassettes);
});

// Maneja el evento de clic en el botón de guardar para modificar un cassette existente
modificarCassetteForm.addEventListener('submit', (event) => {
  // Evitar que se envíe el formulario
  event.preventDefault();
  if (selectedIndex >= 0 && selectedIndex < cassettes.length) {
    cassettes[selectedIndex], data = {
      fecha: modalModificarFecha.value,
      descripcion: modalModificarDescripcion.value,
      organo: modalModificarOrgano.value,
      caracteristicas: modalModificarCaracteristicas.value,
      observaciones: modalModificarObservaciones.value
    };

    put("cassettes_update", data, cassettes[selectedIndex].id_cassette);

    // localStorage.setItem('cassettes', JSON.stringify(cassettes));
    modalModificarCassette.classList.add('hidden');
    document.body.classList.remove('modal-open');
    cassettesApi();
    mostrarDetalles(selectedIndex);
  }
});

// Maneja el evento de clic en el botón de cierre del modal de creación de cassette
modalClose.addEventListener('click', () => {
  modalCassette.classList.add('hidden');
  document.body.classList.remove('modal-open');
});

// Maneja el evento de clic en el botón de cierre del modal de modificación de cassette
modalModificarClose.addEventListener('click', () => {
  modalModificarCassette.classList.add('hidden');
  document.body.classList.remove('modal-open');
});

// Maneja el evento de clic en el botón 'Nueva Muestra' para abrir el modal de creación de muestra
btnNuevaMuestra.addEventListener('click', () => {
  if (selectedIndex >= 0 && selectedIndex < cassettes.length) {
    modalNuevaMuestra.classList.remove('hidden');
    document.body.classList.add('modal-open');
    const imageInput = document.getElementById('modalMuestraImagen');
    console.log(imageInput);
  } else {
    alert('No hay cassette seleccionado para agregar una muestra');
  }
});

// Filtra los cassettes por órgano seleccionado
organos.addEventListener('change', () => {

  const organo = organos.value;
  // * --> todos los organos
  if (organo === '*') {
    actualizarTabla(cassettes);
    return;
  }
  const filtered_cassettes = cassettes.filter(cassette => cassette.organo === organo);
  actualizarTabla(filtered_cassettes);
});

// Filtra los cassettes por fecha de inicio
fechaInicioInput.addEventListener('change', () => {
  fecha_inicio = fechaInicioInput.value;
  if (fecha_fin === '') {
    filtered_cassettes = cassettes.filter(cassette => cassette.fecha == fecha_inicio);
  } else {
    filtered_cassettes = cassettes.filter(cassette => cassette.fecha >= fecha_inicio && cassette.fecha <= fecha_fin);
  }
  actualizarTabla(filtered_cassettes);
});

// Filtra los cassettes por fecha de fin
fechaFinInput.addEventListener('change', () => {
  fecha_fin = fechaFinInput.value;
  if (fecha_inicio === '') {
    actualizarTabla(cassettes);
    return;
  }
  filtered_cassettes = cassettes.filter(cassette => cassette.fecha >= fecha_inicio && cassette.fecha <= fecha_fin);
  actualizarTabla(filtered_cassettes);
});


// TODAS LAS FUNCIONES DE MUESTRAS

// Maneja el evento de clic en el botón de guardar para crear una nueva muestra
nuevaMuestraForm.addEventListener('submit', (event) => {
  //Evitar que se envie el formulario
  event.preventDefault();
  const cassette = cassettes[selectedIndex];

  const nuevaMuestra = {
    fecha_muestra: document.getElementById('modalMuestraFecha').value,
    observaciones: document.getElementById('modalMuestraObservaciones').value,
    descripcion: document.getElementById('modalMuestraDescripcion').value,
    tincion: document.getElementById('modalMuestraTincion').value,
    id_cassette: cassette.id_cassette,
  };

  const imageInput = document.getElementById('modalMuestraImagenCreada');
  console.log(imageInput);
  const imageFile = imageInput.files[0];  // Obtiene el archivo de imagen
  console.log(imageFile);  // Asegúrate de que imageFile no sea `undefined`
  if (!imageFile) {
    console.log('No se ha seleccionado ningún archivo.');
  } else {
    console.log('Archivo seleccionado:', imageFile);
  }

  const formData = new FormData();
  formData.append('muestra', JSON.stringify(nuevaMuestra));  // Agregar los datos de la muestra
  if (imageFile) {
    formData.append('imagen', imageFile);  // Agregar la imagen si se selecciona
  }

  // Verifica que el índice seleccionado está dentro del rango válido del array de cassettes
  if (selectedIndex >= 0 && selectedIndex < cassettes.length) {
    if (!cassette.muestras) {
      cassette.muestras = [];
    }

    // Añade la nueva muestra a la lista de muestras
    lastMuestra.push(nuevaMuestra);
    muestras.push(nuevaMuestra);

    // Llamar a la función para crear la muestra, pasando `formData` para que la imagen también sea subida
    createMuestra(nuevaMuestra, formData);
    modalNuevaMuestra.classList.add('hidden');
    document.body.classList.remove('modal-open');
    cargarMuestrasApi();
    mostrarMuestraPorCassette(selectedIndex);
  }
});

// Muestra el modal de detalles de una muestra específica
const mostrarModalMuestra = (id) => {
  modalMuestra.classList.remove('hidden');
  document.body.classList.remove('modal-open');

  fetch("http://localhost:3000/sanitaria/muestras/" + id)
    .then((results) => results.json())
    .then((data) => {
      descMuestra.textContent = data.descripcion;
      fechaMuestra.textContent = data.fecha_muestra ? data.fecha_muestra.split('T')[0] : 'No hay fecha asignada para esta muestra';
      tincionMuestra.textContent = data.tincion;
      obserMuestra.textContent = data.observaciones;
    });
}

// Funcion para filtrar las muestras por el cassette seleccionado
const mostrarMuestraPorCassette = (id_cassette) => {
  muestra__tbody.innerHTML = "";
  const muestraPorCassette = muestras.filter((mues) => mues.id_cassette == parseInt(id_cassette));
  cargarMuestraTabla(muestraPorCassette);

}

// Funcion para cargar todas las muestras filtradas en el html
const cargarMuestraTabla = (muestras) => {
  muestra__tbody.innerHTML = "";
  const fragment = document.createDocumentFragment();
  muestras.forEach((muestra) => {
    let tr = document.createElement("tr");
    let fecha = document.createElement("td");
    let descripcion = document.createElement("td");
    let tincion = document.createElement("td");
    let botones = document.createElement("td");
    let buttonDel = document.createElement("button");
    let buttonModi = document.createElement("button");
    let buttonDetails = document.createElement("button");
    tr.id = muestra.id_muestra;
    buttonDel.id = "deleteMuestra";
    buttonModi.id = "modiMuestra";
    buttonDetails.id = "detailsMuestra";
    buttonDel.textContent = "Borrar";
    buttonModi.textContent = "Modificar";
    buttonDetails.textContent = "Detalles";
    buttonDel.classList.add("bg-red-400");
    buttonDel.classList.add("text-white");
    buttonDel.classList.add("px-2");
    buttonDel.classList.add("py-1");
    buttonDel.classList.add("mr-2");
    buttonDel.classList.add("mb-2");
    buttonDel.classList.add("mt-2");
    buttonDel.classList.add("rounded-lg");
    buttonDel.classList.add("hover:bg-red-500");
    buttonDel.classList.add("shadow-md");
    buttonDel.classList.add("transition-all");
    buttonModi.classList.add("bg-yellow-500");
    buttonModi.classList.add("text-white");
    buttonModi.classList.add("px-2");
    buttonModi.classList.add("py-1");
    buttonModi.classList.add("mr-2");
    buttonModi.classList.add("rounded-lg");
    buttonModi.classList.add("hover:bg-yellow-600");
    buttonModi.classList.add("shadow-md");
    buttonModi.classList.add("transition-all");
    buttonDetails.classList.add("bg-blue-400");
    buttonDetails.classList.add("text-white");
    buttonDetails.classList.add("px-2");
    buttonDetails.classList.add("py-1");
    buttonDetails.classList.add("mr-2");
    buttonDetails.classList.add("mb-2");
    buttonDetails.classList.add("mt-2");
    buttonDetails.classList.add("rounded-lg");
    buttonDetails.classList.add("hover:bg-blue-500");
    buttonDetails.classList.add("shadow-md");
    buttonDetails.classList.add("transition-all");
    fecha.textContent = muestra.fecha_muestra ? muestra.fecha_muestra.split('T')[0] : 'No hay fecha asignada para esta muestra';
    descripcion.textContent = muestra.descripcion;
    tincion.textContent = muestra.tincion;
    tr.appendChild(fecha);
    tr.appendChild(descripcion);
    tr.appendChild(tincion);
    botones.appendChild(buttonDel);
    botones.appendChild(buttonModi);
    botones.appendChild(buttonDetails);
    tr.appendChild(botones);
    fragment.appendChild(tr);
  })
  muestra__tbody.appendChild(fragment);
}

// Mostrar detalles de la muestra
const mostrarDetallesMuestra = (id) => {
  modalMuestra.classList.remove("hidden");
  mostrarModalMuestra(id);

  let imagenesMuestra = document.getElementById("imagenesMuestra"); // Carrusell con las imagenes de la muestra
  imagenesMuestra.innerHTML = "";
  imagenPorMuestra(id).then(imagenesCargadas => {
    if (imagenesCargadas.length > 0) {
      imagenesCargadas.forEach((image) => {

        const buffer = new Uint8Array(image.imagen.data); // Convertir Buffer a Uint8Array
        const blob = new Blob([buffer], { type: image.tipo }); // Crear un Blob
        const imageUrl = URL.createObjectURL(blob); // Generar URL del Blob
        console.log("Imagen URL:", imageUrl);

        imagenMuestra.src = imageUrl;

        let newImg = document.createElement("IMG");
        newImg.src = imageUrl;
        newImg.classList.add("w-32");
        newImg.classList.add("h-32");
        newImg.classList.add("object-cover");
        newImg.classList.add("border");
        imagenesMuestra.appendChild(newImg);
      });
    } else {
      console.warn("No se encontraron imágenes para la muestra:", id);
      imagenMuestra.src = ""; // Limpiar la imagen si no hay datos
    }
  }).catch(error => console.error("Error al cargar la imagen:", error));
};

// Función para agregar una nueva imagen desde el modal de modificar muestra
modalMuestraImagen.addEventListener("change", (event) => {
  const file = event.target.files[0]; // Obtener el archivo seleccionado
  if (!file) return;
  const formData = new FormData();
  formData.append("imagen", file); // Agregar imagen al FormData
  formData.append('id_muestra', selectedMuestraIndex);
  createImagen(formData);

  if(event.target.parentElement.parentElement.id === "formMuestra"){
    fetch(urls.backend + urls.muestra + '/' + selectedMuestraIndex).then(response => response.json()).then(data => {
      const muestra = data;
      console.log(muestra);
      cargarFormularioMuestras(muestra);
    })
  }else{
    mostrarDetallesMuestra(selectedMuestraIndex);
  }
  
})

// Función para cargar los valores de la muestra seleccinada en los input del modal de modificar muestra
// También cargamos las imagenes

const imagenMuestraModificar = document.getElementById("imagenMuestraModificar");
const cargarFormularioMuestras = (muestra) => {

  console.log(`esta es la fecha de la muestra ${muestra.fecha_muestra}`);

  muestraFecha.value = muestra.fecha_muestra.split("T")[0];
  muestraObservacion.value = muestra.observaciones;
  muestraDescripcion.value = muestra.descripcion;
  muestraTincion.value = muestra.tincion;

  imagenPorMuestra(selectedMuestraIndex).then(imagenesCargadas => {
    if (imagenesCargadas.length > 0) {
      imagenesCargadas.forEach((image) => {
  
        const buffer = new Uint8Array(image.imagen.data); // Convertir Buffer a Uint8Array
        const blob = new Blob([buffer], { type: image.tipo }); // Crear un Blob
        const imageUrl = URL.createObjectURL(blob); // Generar URL del Blob
        console.log("Imagen URL:", imageUrl);
        const imgParams = {
          url: imageUrl,
          image: image,
        }
        imagenes.push(imgParams);

        // let newImg = document.createElement("IMG");
        // newImg.src = imageUrl;
        // newImg.classList.add("w-32");
        // newImg.classList.add("h-32");
        // newImg.classList.add("object-cover");
        // newImg.classList.add("border");
        // imagenesMuestra.appendChild(newImg);
        
      });
      
      imagenMuestraModificar.src = imagenes.at(-1).url;
      imagenMuestraModificar.name = imagenes.at(-1).image.id_imagen;
      
    } 
  })
  .catch(error => {
    console.error("Error al cargar la imagen:", error);
    console.warn("No se encontraron imágenes para la muestra:", selectedMuestraIndex);
    imagenMuestra.src = ""; // Limpiar la imagen si no hay datos
  });

}

// Borrar la imagen seleccionada de la muestra
formMuestra.addEventListener("submit", (event) => {
  event.preventDefault();
  deleteImagen(event.target.firstElementChild.nextElementSibling.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.name)
})

// Modificar muestra
formMuestra.addEventListener("submit", (event) => {
  event.preventDefault();

  // Verifica si hay un ID válido antes de modificar
  if (!selectedMuestraIndex) {
    console.error("No se encontró el ID de la muestra a modificar.");
    return;
  }

  const muestraModified = {
    fecha_muestra: muestraFecha.value,
    observaciones: muestraObservacion.value,
    descripcion: muestraDescripcion.value,
    tincion: muestraTincion.value
  };

  if (muestraDescripcion === "" && muestraFecha === "" && muestraTincion === "" && muestraObservacion === "") {
    console.log("No se ha modificado nada");
  } else {
    console.log("Muestra modificada con ID:", selectedMuestraIndex);
    modifyMuestra(parseInt(selectedMuestraIndex), muestraModified);
  }

  modalMuestraModificar.classList.add("hidden");
});

// Función para cerrar el modal de modificar muestra
modalMuestraCloseModify.addEventListener("click", () => {
  modalMuestraModificar.classList.add("hidden");
});

// Maneja el evento de clic en los botones de detalles de muestra en la tabla
muestra__tbody.addEventListener('click', (event) => {
  const target = event.target;
  if (target.tagName === "BUTTON") {
    const id = target.closest("tr").id; // Obtiene el ID de la fila (muestra)

    if (target.id === "deleteMuestra") {
      console.log("Borrado de muestra con ID:", id);
      deleteMuestra(parseInt(id));
    } else if (target.id === "modiMuestra") {
      selectedMuestraIndex = id; // Guarda el ID de la muestra a modificar
      console.log("Modificado de muestra con ID:", selectedMuestraIndex);
      modalMuestraModificar.classList.remove("hidden");
      fetch(urls.backend + urls.muestra + '/' + id).then(response => response.json()).then(data => {
        const muestra = data;
        console.log(muestra);
        cargarFormularioMuestras(muestra);
      })
    } else if (target.id === "detailsMuestra") {
      console.log("Detalles de muestra con ID:", id);
      selectedMuestraIndex = parseInt(id);
      mostrarDetallesMuestra(selectedMuestraIndex);
    }
  }
});

// Función para cerrar el modal de muestra dandole a la x en la esquina superior derecha
modalMuestraClose.addEventListener("click", () => {
  modalMuestra.classList.add("hidden");
})

// Función para ordenar los cassettes
order.addEventListener('click', (event) => {
  let request_url = '';
  const target = event.target;
  if (target.id === 'orderFecha')
    request_url = urls.cassettes_date;
  if (target.id === 'orderDescripcion')
    request_url = urls.cassettes_descripcion;
  if (target.id === 'orderOrgano')
    request_url = urls.cassettes_organo;

  fetch(urls.backend + request_url).then(response => response.json()).then(data => {

    cassettes = data;
    actualizarTabla(cassettes);
  });

});

// DOMContentLoaded
// Inicializa la aplicación cuando el DOM está completamente cargado
document.addEventListener('DOMContentLoaded', () => {
  // Función para que al crear un nuevo cassette la fecha no pueda ser anterior al día de hoy
  const fechaInput = document.getElementById('modalFecha');
  const hoy = new Date().toISOString().split('T')[0];
  fechaInput.setAttribute('min', hoy);
  selectedIndex = -1;
  cassettesApi();
  cargarMuestrasApi();
});

