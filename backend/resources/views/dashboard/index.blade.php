@extends('layouts.app')

@section('title', 'Dashboard')

@section('content')
    <h1>DASHBOARD</h1>
    <h2>Lista de examen</h2>
    @include('examenes._list')
    <p><a href="{{ route('examen.index') }}">Lista de examenes</a></p>
    
    @if(auth()->user()->role_id == 1)
    <h2>Lista de Usuarios</h2>
    @include('usuarios._list')
    <p><a href="{{ route('usuarios.index') }}">Lista de usuarios</a></p>
    @endif

@endsection