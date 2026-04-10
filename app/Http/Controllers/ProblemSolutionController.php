<?php

namespace App\Http\Controllers;

use App\Models\ProblemSolution;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProblemSolutionController extends Controller
{
    public function index(Request $request)
    {
        $type = $request->query('type', 'all');

        $query = ProblemSolution::published()
            ->orderBy('sort_order')
            ->orderByDesc('created_at');

        if ($type !== 'all') {
            $query->byType($type);
        }

        $solutions = $query->get([
            'id',
            'title',
            'slug',
            'summary',
            'result_highlight',
            'source',
            'tech_stack',
            'problem_type',
            'difficulty',
            'time_to_solve',
            'image',
            'sort_order',
        ]);

        // Distinct types for filter tabs
        $types = ProblemSolution::published()
            ->distinct()
            ->pluck('problem_type')
            ->filter()
            ->values();

        return Inertia::render('ProblemSolutions/Index', [
            'solutions' => $solutions,
            'types' => $types,
            'activeType' => $type,
        ]);
    }

    public function show(string $slug)
    {
        $solution = ProblemSolution::published()
            ->where('slug', $slug)
            ->firstOrFail();

        return Inertia::render('ProblemSolutions/Show', [
            'solution' => $solution,
        ]);
    }
}