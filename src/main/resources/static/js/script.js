const ROLES = ['ROLE_ADMIN', 'ROLE_USER'];

$(function () {
    let roles = $.cookie('roles').split('|');
    console.log("roles:");
    console.log(roles);
    $('#navbar-username').text($.cookie('username'));
    $('#navbar-roles').text(roles.join(' '));
    if (roles.includes("ROLE_ADMIN")) {
        $('#v-pills-admin-tab').removeClass('d-none');
        $('#v-pills-admin-tab').addClass('active');
        $('#v-pills-admin').tab('show');
        updateUserTable();
        $('#save').on('click', saveUser);
        $('#edit').on('click', event => editUser(event));
        $('#delete').on('click', event => deleteUser(event));
    }
    if (roles.includes("ROLE_USER")) {
        $('#v-pills-user-tab').removeClass('d-none');
        if (!roles.includes("ROLE_ADMIN")) {
            $('#v-pills-user-tab').addClass('active');
            $('#v-pills-user').tab('show');
        }
        showCurrentUser();
    }
})

function saveUser(e) {
    e.preventDefault();
    let newUser = {
        name: $('#add-name').val(),
        lastname: $('#add-lastname').val(),
        age: $('#add-age').val(),
        username: $('#add-username').val(),
        password: $('#add-password').val(),
        roles: []
    };
    $('#add-roles').find('option:selected').each((i, option) => {
        newUser['roles'].push({'role': $(option).val()});
    });
    console.log("user:");
    console.log(newUser);
    $.ajax({
        url: '/admin/api/users',
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(newUser),
        complete: function (data) {
            $('#nav-users-tab').tab('show')
            updateUserTable();
        }
    });
}

function editUser(e) {
    e.preventDefault();
    let editUser = {
        id: $('#edit-id').val(),
        name: $('#edit-name').val(),
        lastname: $('#edit-lastname').val(),
        age: $('#edit-age').val(),
        username: $('#edit-username').val(),
        password: $('#edit-password').val(),
        roles: []
    };
    $('#edit-roles').find('option:selected').each((i, option) => {
        editUser['roles'].push({'role': $(option).val()});

    });
    console.log("user:");
    console.log(editUser);
    $.ajax({
        url: '/admin/api/users',
        type: 'PUT',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(editUser),
        complete: function (data) {
            $('#edit-modal').modal('hide');
            updateUserTable();
        }
    });
}

function deleteUser(e) {
    e.preventDefault();
    const id = $('#delete-id').val();
    $.ajax({
        url: '/admin/api/users/'+id,
        type: 'DELETE',
        complete: function (data) {
            $('#delete-modal').modal('hide');
            updateUserTable();
        }
    });
}

function editUserForm(id) {
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: '/admin/api/users/' + id,
        contentType: 'application/json',
        success: function (user) {
            console.log("user:");
            console.log(user);
            $('#edit-id').val(user.id);
            $('#edit-name').val(user.name);
            $('#edit-lastname').val(user.lastname);
            $('#edit-age').val(user.age);
            $('#edit-username').val(user.username);
            $('#edit-password').val(user.password);
            const editRoles = $('#edit-roles');
            const userRoles = user.roles.map(r => r.authority);
            console.log("userRoles:");
            console.log(userRoles);
            editRoles.empty();
            ROLES.forEach(role => editRoles.append("<option value='" + role + "'"
                + (userRoles.includes(role) ? " selected" : "") + ">"
                + role + "</option>"));
            $('#edit-modal').modal('show');
        }
    })
}

function deleteUserForm(id) {
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: '/admin/api/users/' + id,
        success: function (user) {
            $('#delete-id').val(user.id);
            $('#delete-name').val(user.name);
            $('#delete-lastname').val(user.lastname);
            $('#delete-age').val(user.age);
            $('#delete-username').val(user.username);
            const deleteRoles = $('#delete-roles');
            const userRoles = user.roles.map(r => r.authority);
            console.log("userRoles:");
            console.log(userRoles);
            deleteRoles.empty();
            ROLES.forEach(role => deleteRoles.append("<option value='" + role + "'"
                + (userRoles.includes(role) ? " selected" : "") + ">"
                + role + "</option>"));
            $('#delete-modal').modal('show');
        }
    })
}

function updateUserTable() {
    $('#users').empty();
    $.ajax({
        type: 'GET',
        url: '/admin/api/users',
        success: function (users) {
            users.forEach(user =>
                $('#users')
                    .append("<tr> \
                                    <td>" + user.id + "</td> \
                                    <td>" + user.name + "</td> \
                                    <td>" + user.lastname + "</td> \
                                    <td>" + user.age + "</td> \
                                    <td>" + user.username + "</td> \
                                    <td>" + user.roles.map(role => role.authority).join(' ') +  "</td> \
                                    <td><button type='button' class='btn btn-info' onclick='editUserForm(" + user.id + ")'>Edit</button><td> \
                                    <td><button type='button' class='btn btn-danger' onclick='deleteUserForm(" + user.id + ")'>Delete</button><td> \
                             </tr>"))
        }
    });
}

function showCurrentUser() {
    $.ajax({
        type: 'GET',
        url: '/users/api/user',
        success: function (currentUser) {
            $('#logged')
                .append("<tr> \
                               <td>" + currentUser.id + "</td> \
                               <td>" + currentUser.name + "</td> \
                               <td>" + currentUser.lastname + "</td> \
                               <td>" + currentUser.age + "</td> \
                               <td>" + currentUser.username + "</td> \
                               <td>" + currentUser.roles.map(role => role.authority).join(' ') + "</td> \
                        </tr>")
        }
    });
}