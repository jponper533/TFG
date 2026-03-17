<ul>
    @foreach ($usuarios as $u)
        <li>
            {{ $u->name ?? 'Usuario no encontrado' }}
            - <a href="{{ route('usuarios.edit', $u) }}">Editar</a>
            - <a href="{{ route('usuarios.show', $u) }}">Ver</a>
            - <form action="{{ route('usuarios.destroy', $u) }}" method="POST" style="display:inline;">
                @csrf
                @method('DELETE')
                <button type="submit" onclick="return confirm('¿Estás seguro de que deseas eliminar este examen?')">Eliminar</button>
            </form>
        </li>

    @endforeach
</ul>