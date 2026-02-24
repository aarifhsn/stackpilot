<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Portfolio extends Model
{
    /** @use HasFactory<\Database\Factories\PortfolioFactory> */
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'description',
        'project_link',
        'image',
        'features',
        'category_id',
        'tech_stack',
        'is_published',
        'sort_order'
    ];

    protected $casts = [
        'tech_stack' => 'array',
        'is_published' => 'boolean',
    ];

    // Helper to get features as array
    public function getFeaturesArrayAttribute(): array
    {
        return $this->features
            ? array_map('trim', explode(',', $this->features))
            : [];
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
