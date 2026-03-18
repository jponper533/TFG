<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('conversaciones', function(Blueprint $table) {
            $table->id();
            $table->foreignId('alumno_id')->references('id')->on('users');
            $table->foreignId('profesor_id')->references('id')->on('users');
            $table->foreignId('id_examen')->references('id')->on('examenes');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
         Schema::dropIfExists('conversaciones');
    }
};
