$(document).ready(function(){

    $('.parts').hide();

    //read
    function showTodo(){
        $.ajax({
            url: 'http://localhost:3000/todos',
            method: 'GET',
            headers: {token: localStorage.getItem('token')},
            success: function(data){
                
                data.forEach(todos => {
                    $('#table-todo').append(`<tr class="table-data">
                    <td>${todos.title}</td>
                    <td>${todos.description}</td>
                    <td>${todos.status}</td>
                    <td>${todos.due_date}</td>
                    <td><button data-id="${todos.id}" class="btn-edit">Edit</button><button data-id="${todos.id}" class="btn-delete">Delete</button></td>
                    </tr>`)
                });

                $('.parts').hide();
                $('#todo-list').show()
            }
        })
    }

    //create
    $('.btn-add').on('click', function(){
        $('.parts').hide();
        $('#add-list').show();
    })

    $('#add-form').on('submit', function(event){
        event.preventDefault();

        let $title = $('.add-title').val();
        let $desc = $('.add-desc').val();
        let $status = $('.add-status').val();
        let $date = $('.add-date').val();

        $.ajax({
            url: 'http://localhost:3000/todos',
            method: 'POST',
            headers: {token: localStorage.getItem('token')},
            data: {
                title: $title,
                description: $desc,
                status: $status,
                due_date: $date
            },
            success: function(data){
                $("#add-form")[0].reset();
                $('.table-data').empty();
                showTodo();
            }
        })
    })

    //edit
    $(document).on('click', '.btn-edit', function(){
        $('.parts').hide();
        $('#edit-list').show();

        let editValue = $(this).data('id');
        $.ajax({
            url: `http://localhost:3000/todos/${editValue}`,
            method: 'GET',
            headers: {token: localStorage.getItem('token')},
            success: function(data){
                let dataEdit = {
                    id: data.id,
                    title: data.title,
                    description: data.description,
                    status: data.status,
                    due_date: data.due_date
                }

                $('.edit-title').val(dataEdit.title);
                $('.edit-desc').val(dataEdit.description);
                $('.edit-status').val(dataEdit.status);
                $('.edit-date').val(dataEdit.due_date);
                $('.submit-add').val(dataEdit.id)
            }
        })
    })

    $('#edit-list').on('submit', function(event){
        event.preventDefault();

        let editId = $('.submit-add').val();
    
        let $titleEdit = $('.edit-title').val();
        let $descEdit = $('.edit-desc').val();
        let $statusEdit = $('.edit-status').val();
        let $dateEdit = $('.edit-date').val();

        $.ajax({
            url: `http://localhost:3000/todos/${editId}`,
            method: 'PUT',
            headers: {token: localStorage.getItem('token')},
            data: {
                title: $titleEdit,
                description: $descEdit,
                status: $statusEdit,
                due_date: $dateEdit
            },
            success: function(data){
                console.log('berhasil edit');
                $('.table-data').empty();
                showTodo();
            }
        })
    })
    

    //delete
    $(document).on('click', '.btn-delete', function() {
        let deleteValue = $(this).data('id');
    
        $.ajax({
            url: `http://localhost:3000/todos/${deleteValue}`,
            method: 'DELETE',
            headers: {token: localStorage.getItem('token')},
            success: function(data){
                $('.table-data').empty();
                start();
            }
        })

    })

    
    $('#login-form').on('submit', function(event){
        event.preventDefault();
        let $email = $('#email-login').val();
        let $password = $('#password-login').val();

        $.ajax({
            url: 'http://localhost:3000/user/login',
            method: 'POST',
            data: {email: $email, password: $password},
            success: function(data){
                localStorage.setItem('token', data);
                showTodo()
            }
        })

    })

    $('.btn-logout').on('click', function(){
        localStorage.removeItem('token');
        start();
    })

    function start(){
        if(localStorage.getItem('token')){
            $('.parts').hide();
            showTodo()
        }else{
            $('.parts').hide();
            $('#Thelogin').show();
        }
    }

    start();

    $('.btn-register').on('click', function(){
        $('.parts').hide();
        $('#Theregister').show();
    })

    $('.btn-login').on('click', function(){
        $('.parts').hide();
        $('#Thelogin').show();
    })
})