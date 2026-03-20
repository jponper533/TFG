<form action="{{ route('usuarios.update', $usuario) }}" method="POST">
    @csrf
    @method('PUT')


    <h2>Nombre</h2>
    <input type="text" name="name" value="{{ old('name', $usuario->name) }}">
    @error('name')
        <div class="error">{{ $message }}</div>
    @enderror

    <h2>Email</h2>
    <input type="text" name="email" value="{{ old('email', $usuario->email) }}">
    @error('email')
        <div class="error">{{ $message }}</div>
    @enderror

    <h2>Contraseña</h2>
    <input type="password" name="password">
    @error('password')
        <div class="error">{{ $message }}</div>
    @enderror

    <h2>Rol</h2>
    <select name="role_id">
        @foreach($rol as $r)
            <option value="{{ $r->id }}" {{ old('role_id', $usuario->role_id) == $r->id ? 'selected' : '' }}>
                {{ $r->nombre }}
            </option>
        @endforeach
    </select>
    @error('role_id')
        <div class="error">{{ $message }}</div>
    @enderror   

    <p>
        <button type="submit">Actualizar</button>
    </p>
</form>

<a href="{{ route('usuarios.index') }}">Volver</a>