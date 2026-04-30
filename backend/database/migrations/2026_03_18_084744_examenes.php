<?php

use Carbon\Traits\Timestamp;
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
        Schema::create('examenes', function (Blueprint $table) {
            $table->id();

            $table->foreignId('alumno_id')
                ->constrained('users');

            $table->foreignId('user_id')
                ->constrained('users');

            $table->foreignId('asignatura_id')
                ->constrained();

            $table->foreignId('id_trimestre')
                ->constrained('trimestres');

            $table->decimal('nota', 4, 2);

            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('examenes');
    }
};
