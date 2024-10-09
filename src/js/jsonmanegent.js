// Función para leer archivos JSON desde una ruta específica
async function leerJSON(ruta) {
  const response = await fetch(ruta); // Ruta específica del archivo JSON
  if (!response.ok) {
    throw new Error(`Error al cargar el archivo JSON: ${response.statusText}`);
  }
  const data = await response.json();
  return data;
}

// Función para validar el usuario
// Función para validar el usuario
async function validarUsuario(event) {
  event.preventDefault(); // Evitar el envío del formulario
  const correoIngresado = document.getElementById('correo').value;
  const contrasenaIngresada = document.getElementById('contrasena').value;
  
  try {
    // Leer los datos del archivo JSON de usuarios
    const usuarios = await leerJSON('/data/usuarios.json');

    // Buscar si el correo y contraseña coinciden con algún usuario
    const usuarioValido = usuarios.find(usuario =>
      usuario.correo === correoIngresado && usuario.contrasena === contrasenaIngresada
    );

    const mensaje = document.getElementById('mensaje');
    const nombreElement = document.getElementById('nombre');
    const apellidoElement = document.getElementById('apellido');
    const direccionElement = document.getElementById('direccion');

    if (usuarioValido) {
      loginForm.style.display = 'none'; // Ocultar el formulario de inicio de sesión
      logout.style.display = 'block'; // Mostrar el botón de cerrar sesión
      usuarioInfo.style.display = 'block'; // Mostrar la información del usuario
      perfil.style.display='block'
      
      // Mostrar la información del usuario en los campos correspondientes
      nombreElement.textContent = `Nombre: ${usuarioValido.nombre}`;
      apellidoElement.textContent = `Apellido: ${usuarioValido.apellido}`;
      direccionElement.textContent = `Dirección: ${usuarioValido.direccion}`;
      
      mensaje.textContent = 'Inicio de sesión exitoso.';
      mensaje.style.color = 'green';
      mensaje.style.display = 'block';
      setTimeout(() => {
        mensaje.style.display = 'none';
      }, 600);
      // Dependiendo del rol, mostrar diferentes funciones
      if (usuarioValido.rol === "estudiante") {
        mostrarCitasEstudiante(); // Mostrar la lista de citas disponibles para estudiantes
        estd.style.display ='block'
      } else if (usuarioValido.rol === "personal") {
        pers.style.display='block'
        mostrarSolicitudesCitas(); // Mostrar solicitudes pendientes para el personal
      }
    } else {
      mensaje.textContent = 'Correo o contraseña incorrectos.';
      mensaje.style.color = 'red';
      mensaje.style.display = 'block';

    }
  } catch (error) {
    console.error(error);
    const mensaje = document.getElementById('mensaje');
    mensaje.style.display = 'block';
    mensaje.textContent = 'Hubo un error al cargar los datos. Intente de nuevo más tarde.';
    mensaje.style.color = 'red';
  }
}

// Función para mostrar las citas disponibles para el estudiante
async function mostrarCitasEstudiante() {
  try {
    // Leer los datos del archivo JSON de citas
    const citas = await leerJSON('/data/citas.json');
    const listaCitas = document.getElementById('listaCitas');
    listaCitas.innerHTML = ''; // Limpiar la lista de citas

    // Mostrar solo las citas disponibles
    citas.forEach(cita => {
      if (cita.disponible) {
        const li = document.createElement('li');
        li.textContent = `Fecha: ${cita.fecha}, Hora: ${cita.hora}`;
        
        const botonSolicitar = document.createElement('button');
        botonSolicitar.textContent = 'Solicitar agendar';
        botonSolicitar.addEventListener('click', () => solicitarCita(cita.id, cita.fecha, cita.hora));

        li.appendChild(botonSolicitar);
        listaCitas.appendChild(li);
      }
    });

    // Mostrar la sección de citas para el estudiante
    document.getElementById('citasEstudiante').style.display = 'block';

  } catch (error) {
    console.error(error);
  }
}

// Función para solicitar una cita
async function solicitarCita(idCita, fecha, hora) {
  alert(`Solicitud de cita para ${fecha} a las ${hora} enviada. Esperando aprobación del personal.`);
  // Aquí puedes implementar la lógica para guardar la solicitud de cita en el archivo solicitudesCitas.json
}

// Función para mostrar las solicitudes de citas pendientes para el personal
async function mostrarSolicitudesCitas() {
  try {
    // Leer los datos del archivo JSON de solicitudes de citas
    const solicitudes = await leerJSON('/data/solicitudesCitas.json');
    const listaSolicitudes = document.getElementById('listaSolicitudes');
    listaSolicitudes.innerHTML = ''; // Limpiar la lista de solicitudes

    // Mostrar solo las solicitudes pendientes
    solicitudes.forEach(solicitud => {
      if (!solicitud.aprobada) {
        const li = document.createElement('li');
        li.textContent = `Cita solicitada por ${solicitud.usuario} para el ${solicitud.fecha} a las ${solicitud.hora}`;
        
        const botonAprobar = document.createElement('button');
        botonAprobar.textContent = 'Aprobar';
        botonAprobar.addEventListener('click', () => aprobarCita(solicitud.id, solicitud.citaId));

        li.appendChild(botonAprobar);
        listaSolicitudes.appendChild(li);
      }
    });

    // Mostrar la sección de solicitudes para el personal
    document.getElementById('citasPersonal').style.display = 'block';

  } catch (error) {
    console.error(error);
  }
}

// Función para aprobar una cita y marcarla como no disponible
async function aprobarCita(idSolicitud, idCita) {
  alert(`Cita con ID ${idCita} aprobada. Se marcará como no disponible.`);

}

// Añadir el evento al formulario
document.getElementById('loginForm').addEventListener('submit', validarUsuario);


function cerrarSesion() {
  window.location.href = 'index.html'; // Redirigir a la página de inicio de sesión
}

// Añadir el evento al botón de cerrar sesión
document.getElementById('logout').addEventListener('click', cerrarSesion);