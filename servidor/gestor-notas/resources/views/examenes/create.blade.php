<form action="{{ route('examen.store') }}" method="POST">
    @csrf

    <h2>Nota</h2>
    <input type="text" name="nota">
    @error('nota')
        <div class="error">{{ $message }}</div>
    @enderror

    <!-- select proyecto -->
     <h2>Asignatura</h2>
    <select name="asignatura_id">
        @foreach($asignatura as $a)
            <option value="{{ $a->id }}" {{ old('asignatura_id') == $a->id ? 'selected' : '' }}>
                {{ $a->nombre_asignatura }}
            </option>
        @endforeach
    </select>
    @error('asignatura_id') <div class="error">{{ $message }}</div> @enderror

    <h2>Alumno</h2>
    <select name="user_id">
        @foreach($usuarios as $u)
            <option value="{{ $u->id }}" {{ old('user_id') == $u->id ? 'selected' : '' }}>
                {{ $u->name }}
            </option>
        @endforeach
    </select>

    <p>
        <button type="submit">Crear</button>
    </p>
<a href="{{ route('examen.index') }}">Volver</a>
</form>