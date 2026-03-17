    <h2>Nota</h2>
    <input type="text" name="nota" value="{{ old('nota', $examen->nota) }}" disabled>
    @error('nota')
        <div class="error">{{ $message }}</div>
    @enderror

    <h2>Asignatura</h2>
    <select name="asignatura_id" disabled>
        @foreach($asignatura as $a)
            <option value="{{ $a->id }}" {{ (old('asignatura_id', $examen->asignatura_id) == $a->id) ? 'selected' : '' }}>
                {{ $a->nombre_asignatura }}
            </option>
        @endforeach
    </select>
    @error('asignatura_id')
        <div class="error">{{ $message }}</div>
    @enderror

    <h2>Alumno</h2>
    <select name="user_id" disabled>
        @foreach($usuarios as $u)
            <option value="{{ $u->id }}" {{ (old('user_id', $examen->user_id) == $u->id) ? 'selected' : '' }}>
                {{ $u->name }}
            </option>
        @endforeach
    </select>
    @error('user_id')
        <div class="error">{{ $message }}</div>
    @enderror
<p>
    <a href="{{ route('examen.index') }}">Volver</a>
</p>
