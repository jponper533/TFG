<h1>Lista de examen</h1>
@if(auth()->user()->role_id != 3)
<p><a href="{{ route('examen.create') }}">Crear</a></p>
@endif
@include('examenes._list')

<a href="{{ route('dashboard') }}">Volver</a>