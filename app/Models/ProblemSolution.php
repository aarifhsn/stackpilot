<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ProblemSolution extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'summary',
        'result_highlight',
        'source',
        'tech_stack',
        'problem_type',
        'difficulty',
        'time_to_solve',
        'context',
        'the_problem',
        'my_thinking',
        'the_solution',
        'results',
        'whats_next',
        'common_mistake',
        'before_after',
        'image',
        'is_published',
        'sort_order',
    ];

    protected $casts = [
        'tech_stack' => 'array',
        'the_solution' => 'array',  // store as JSON array of strings
        'results' => 'array',  // store as JSON array of strings
        'before_after' => 'array',
        'is_published' => 'boolean',
    ];

    // ── Scopes ────────────────────────────────────────────────────────────
    public function scopePublished($query)
    {
        return $query->where('is_published', true);
    }

    public function scopeByType($query, string $type)
    {
        return $query->where('problem_type', $type);
    }

    // ── Helpers ───────────────────────────────────────────────────────────
    public function getDifficultyColorAttribute(): string
    {
        return match ($this->difficulty) {
            'easy' => 'emerald',
            'medium' => 'amber',
            'complex' => 'red',
            default => 'slate',
        };
    }

    public function getDifficultyLabelAttribute(): string
    {
        return ucfirst($this->difficulty);
    }
}
