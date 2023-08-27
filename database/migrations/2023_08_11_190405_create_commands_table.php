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
        Schema::create('commands', function (Blueprint $table) {
            $table->id();
            $table->string('num_command')->unique();
            $table->string('nom_commerciale');
            $table->foreignId('client_id')->constrained('clients')->cascadeOnDelete();
            $table->foreignId('bank_id')->constrained('banks')->cascadeOnDelete();
            $table->date('date_command');
            $table->string('marque');
            $table->string('version');
            $table->string('couleur');
            $table->decimal('price','8','2');
            // $table->string('num_vn');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('commands');
    }
};
