function registerData() {
    let firstname = $("#firstname").val();
    let lastname = $("#lastname").val();
    let birthdate = $("#birthdate").val();
    let password = $("#password").val();

    let data = {
        nombres: firstname,
        apellidos: lastname,
        fecha_nacimiento: birthdate,
        password: password
    }

    $.ajax({
        url: "http://ec2-54-205-126-68.compute-1.amazonaws.com:5000/usuarios",
        type: "POST",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(data),
        success: function(response) {
            console.log(response);
            alert("Usuario registrado exitosamente");
            $("#firstname").val("");
            $("#lastname").val("");
            $("#birthdate").val("");
            $("#password").val("");
            showUsers();  // Actualiza la lista de usuarios después de registrar uno nuevo
        },
        error: function(xhr, status) {
            alert('Disculpe, existió un problema al registrar el usuario');
        }
    });
}

function showUsers() {
    $.ajax({
        url: "http://http://ec2-54-205-126-68.compute-1.amazonaws.com:5000/registro",
        type: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function(users) {
            console.log(users);
            // Limpiar la lista de usuarios antes de agregar los nuevos
            $("#user-list").empty();
            users.forEach(user => {
                $("#user-list").append(`
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                            <strong>${user.nombres} ${user.apellidos}</strong><br>
                            Fecha de nacimiento: ${user.fecha_nacimiento}<br>
                            Contraseña: ${user.password}
                        </div>
                        <button class="btn btn-danger btn-sm" onclick="deleteUser(${user.id})">
                            Eliminar
                        </button>
                    </li>
                `);
            });
        },
        error: function(xhr, status) {
            alert('Disculpe, existió un problema al obtener los usuarios');
        }
    });
}

function deleteUser(userId) {
    $.ajax({
        url: `http://ec2-54-205-126-68.compute-1.amazonaws.com:5000/usuarios/${userId}`,
        type: "DELETE",
        success: function(response) {
            console.log(response);
            alert("Usuario eliminado exitosamente");
            showUsers();  // Actualiza la lista de usuarios después de eliminar uno
        },
        error: function(xhr, status) {
            alert('Disculpe, existió un problema al eliminar el usuario');
        }
    });
}
