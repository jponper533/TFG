<ul>
    @foreach ($examenes as $e)
        <li>
            {{ $e->user->name ?? 'Usuario no encontrado' }} - 
            {{ $e->asignatura->nombre_asignatura ?? 'Asignatura no encontrada' }} - 
            <strong>{{ $e->nota }}</strong>
            
            @if(auth()->user()->role_id != 3)
            - <a href="{{ route('examen.edit', $e) }}">Editar</a>
            @endif
            - <a href="{{ route('examen.show', $e) }}">Ver</a>

            @if(auth()->user()->role_id != 3)
            - <form action="{{ route('examen.destroy', $e) }}" method="POST" style="display:inline;">

                @csrf
                @method('DELETE')
                <button type="submit" onclick="return confirm('¿Estás seguro de que deseas eliminar este examen?')">Eliminar</button>
            </form>
            @endif
        </li>

    @endforeach
</ul>