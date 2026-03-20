<h1>Lista de usuarios</h1>
<p><a href="{{ route('usuarios.create') }}">Crear</a></p>

@include('usuarios._list')

<a href="{{ route('dashboard') }}">Volver</a>