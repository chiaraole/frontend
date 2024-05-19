function navigateTo(page) {
    window.location.href = page;
}

function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (email && password) {
        alert('Login exitoso');
        navigateTo('profesor_dashboard.html');
    } else {
        alert('Por favor, ingresa tus credenciales.');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.endsWith('clases.html')) {
        loadClasses();
    } else if (window.location.pathname.endsWith('profesores.html')) {
        loadProfessors();
    } else if (window.location.pathname.endsWith('alumnos.html')) {
        loadStudents();
    }
});

function loadStudents() {
    const data = [
        { id: 1, name: 'Alicia', lastname: 'Alvarez', degree: 1 },
        { id: 2, name: 'Amanda', lastname: 'Nunes', degree: 2 },
        { id: 3, name: 'Jose', lastname: 'Tercio', degree: 3 }
    ];
    document.querySelector('tbody').innerHTML = createTable(data, 'students');
}

function loadProfessors() {
    const data = [
        { id: 1, name: 'Profesor 1', lastname: 'Apellido 1', email: 'profesor1@example.com' },
        { id: 2, name: 'Profesor 2', lastname: 'Apellido 2', email: 'profesor2@example.com' },
        { id: 3, name: 'Profesor 3', lastname: 'Apellido 3', email: 'profesor3@example.com' }
    ];
    document.querySelector('tbody').innerHTML = createTable(data, 'professors');
}

function loadClasses() {
    const data = [
        { id: 1, name: 'Clase 1', id_alumno: 1, id_profesor: 1, degree: 1 },
        { id: 2, name: 'Clase 2', id_alumno: 2, id_profesor: 2, degree: 2 },
        { id: 3, name: 'Clase 3', id_alumno: 3, id_profesor: 3, degree: 3 }
    ];
    document.querySelector('tbody').innerHTML = createTable(data, 'classes');
}

function createTable(data, type) {
    let rows = '';
    data.forEach(item => {
        rows += `<tr>`;
        Object.values(item).forEach(value => {
            rows += `<td>${value}</td>`;
        });
        rows += `
            <td>
                <button class="action-button" onclick="editItem('${type}', ${item.id})">Actualizar</button>
                <button class="action-button" onclick="deleteItem('${type}', ${item.id})">Eliminar</button>
            </td>
        </tr>`;
    });
    return rows;
}

function showCreateForm(type) {
    const formHtml = `
        <h2>Agregar Nuevo ${type.slice(0, -1)}</h2>
        <form onsubmit="createItem(event, '${type}')">
            ${generateFormFields(type)}
            <button type="submit" class="button">Submit</button>
        </form>
    `;
    document.querySelector('.table-container').innerHTML = formHtml;
}

function generateFormFields(type) {
    let fields = '';
    switch(type) {
        case 'students':
            fields = `
                <label>Nombre: <input type="text" name="name" required></label><br>
                <label>Apellido: <input type="text" name="lastname" required></label><br>
                <label>Grado: <input type="number" name="degree" required></label><br>
            `;
            break;
        case 'professors':
            fields = `
                <label>Nombre: <input type="text" name="name" required></label><br>
                <label>Apellido: <input type="text" name="lastname" required></label><br>
                <label>Email: <input type="email" name="email" required></label><br>
            `;
            break;
        case 'classes':
            fields = `
                <label>Nombre: <input type="text" name="name" required></label><br>
                <label>ID Alumno: <input type="number" name="id_alumno" required></label><br>
                <label>ID Profesor: <input type="number" name="id_profesor" required></label><br>
                <label>Grado: <input type="number" name="degree" required></label><br>
            `;
            break;
    }
    return fields;
}

function createItem(event, type) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {};
    formData.forEach((value, key) => data[key] = value);
    console.log(`Crear ${type.slice(0, -1)}`, data);
    loadContent(type);
}

function editItem(type, id) {
    const item = { id: id, name: 'Editar', lastname: 'Apellido', degree: 4 };
    const formHtml = `
        <h2>Actualizar ${type.slice(0, -1)}</h2>
        <form onsubmit="updateItem(event, '${type}', ${id})">
            ${generateEditFormFields(type, item)}
            <button type="submit" class="button">Submit</button>
        </form>
    `;
    document.querySelector('.table-container').innerHTML = formHtml;
}

function generateEditFormFields(type, data) {
    let fields = '';
    switch(type) {
        case 'students':
            fields = `
                <label>Nombre: <input type="text" name="name" value="${data.name}" required></label><br>
                <label>Apellido: <input type="text" name="lastname" value="${data.lastname}" required></label><br>
                <label>Grado: <input type="number" name="degree" value="${data.degree}" required></label><br>
            `;
            break;
        case 'professors':
            fields = `
                <label>Nombre: <input type="text" name="name" value="${data.name}" required></label><br>
                <label>Apellido: <input type="text" name="lastname" value="${data.lastname}" required></label><br>
                <label>Email: <input type="email" name="email" value="${data.email}" required></label><br>
            `;
            break;
        case 'classes':
            fields = `
                <label>Nombre: <input type="text" name="name" value="${data.name}" required></label><br>
                <label>ID Alumno: <input type="number" name="id_alumno" value="${data.id_alumno}" required></label><br>
                <label>ID Profesor: <input type="number" name="id_profesor" value="${data.id_profesor}" required></label><br>
                <label>Grado: <input type="number" name="degree" value="${data.degree}" required></label><br>
            `;
            break;
    }
    return fields;
}

function updateItem(event, type, id) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {};
    formData.forEach((value, key) => data[key] = value);
    console.log(`Actualizar ${type.slice(0, -1)} ID ${id}`, data);
    loadContent(type);
}

function deleteItem(type, id) {
    console.log(`Eliminar ${type.slice(0, -1)} ID ${id}`);
    loadContent(type);
}

function loadContent(type) {
    switch(type) {
        case 'students':
            loadStudents();
            break;
        case 'professors':
            loadProfessors();
            break;
        case 'classes':
            loadClasses();
            break;
    }
}
