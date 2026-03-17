<h2>Nombre</h2>
<input type="text" name="name" value="{{ $usuario->name }}" disabled>

<h2>Email</h2>
<input type="text" name="email" value="{{ $usuario->email }}" disabled>

<h2>Created_at</h2>
<input type="text" name="created_at" value="{{ $usuario->created_at }}" disabled>

<p>
    <a href="{{ route('usuarios.index') }}">Volver</a>
</p>
