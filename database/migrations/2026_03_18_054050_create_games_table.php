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
        Schema::create('games', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tournament_id')->constrained()->cascadeOnDelete();
            $table->foreignId('division_id')->constrained()->cascadeOnDelete();
            $table->foreignId('team_a_id')->constrained('teams')->cascadeOnDelete();
            $table->foreignId('team_b_id')->constrained('teams')->cascadeOnDelete();
            $table->string('court_name')->nullable();
            $table->timestamp('scheduled_at')->nullable();
            $table->integer('team_a_score')->default(0);
            $table->integer('team_b_score')->default(0);
            $table->enum('status', ['scheduled', 'in_progress', 'finished'])->default('scheduled');
            $table->enum('stage', ['pool', 'elimination'])->default('pool');
            $table->string('group_name')->nullable(); // For pool play (Group A, B, etc.)
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('games');
    }
};
