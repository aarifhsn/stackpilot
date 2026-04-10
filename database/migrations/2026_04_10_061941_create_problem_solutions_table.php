<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('problem_solutions', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();

            // Overview
            $table->text('summary');             // 1-line card summary
            $table->string('result_highlight');  // e.g. "85% faster response time"
            $table->string('source')->default('Upwork Scenario'); // e.g. "Real Client", "Upwork Scenario"

            // Meta
            $table->json('tech_stack')->nullable();   // ["Laravel", "Redis", "MySQL"]
            $table->string('problem_type');           // e.g. "Performance", "Debugging", "API"
            $table->string('difficulty')->default('medium'); // easy | medium | complex
            $table->string('time_to_solve')->nullable();     // e.g. "2–4 hours"

            // Case study content (structured sections)
            $table->text('context');              // 1–2 paragraphs — where problem came from
            $table->text('the_problem');          // specific, painful, with constraints
            $table->text('my_thinking');          // what you analyzed, ruled out, why you chose approach
            $table->text('the_solution');         // step-by-step, bullet-friendly (stored as JSON array)
            $table->text('results');              // quantified results (stored as JSON array)
            $table->text('whats_next')->nullable(); // senior-level follow-up thinking
            $table->text('common_mistake')->nullable(); // "Most devs would do X, I did Y instead"

            // Before / After metrics (optional, for visual bars)
            $table->json('before_after')->nullable();
            /*
             * before_after format:
             * [
             *   { "label": "Load time", "before": "4.2s", "after": "900ms", "unit": "s", "before_val": 4.2, "after_val": 0.9, "max": 5 },
             *   { "label": "DB queries", "before": "120", "after": "12", "unit": "", "before_val": 120, "after_val": 12, "max": 120 }
             * ]
             */

            // Media
            $table->string('image')->nullable();

            // Status
            $table->boolean('is_published')->default(true);
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('problem_solutions');
    }
};
