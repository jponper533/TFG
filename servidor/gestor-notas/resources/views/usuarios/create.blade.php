<form action="{{ route('usuarios.store') }}" method="POST">
    @csrf

    <h1>Crear Usuario</h1>
    <p>
        Nombre de usuario: <input type="text" name="name">
        @error('name')
    <div class="error">{{ $message }}</div>
    @enderror
    </p>
    <br>
    <p>
        Email de usuario: <input type="email" name="email">
        @error('email')
    <div class="error">{{ $message }}</div>
    @enderror
    </p>
    <br>
    <p>
        Contraseña de usuario: <input type="password" name="password">
        @error('password')
    <div class="error">{{ $message }}</div>
    @enderror
    </p>
    <br>
    <p>
        Rol: <select name="role_id">
            @foreach($role_id as $rol)
            <option value="{{ $rol->id }}" {{ old('role_id') == $rol->id ? 'selected' : '' }}>
                {{ $rol->nombre }}
            </option>
            @endforeach
        </select>
        @error('rol_id')
    <div class="error">{{ $message }}</div> @enderror
    </p>
    <p>
        <button type="submit">Crear</button>
    </p>
    <a href="{{ route('usuarios.index') }}">Volver</a>
</form>