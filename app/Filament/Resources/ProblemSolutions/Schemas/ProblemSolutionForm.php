<?php

namespace App\Filament\Resources\ProblemSolutions\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TagsInput;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class ProblemSolutionForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema->components([

            // ── Overview ──────────────────────────────────────────────────
            Section::make('Overview')->schema([
                TextInput::make('title')
                    ->required()
                    ->live(onBlur: true)
                    ->afterStateUpdated(fn($state, callable $set) =>
                        $set('slug', Str::slug($state))),

                TextInput::make('slug')
                    ->required()
                    ->unique(ignoreRecord: true),

                TextInput::make('summary')
                    ->required()
                    ->helperText('1-line card summary. e.g. "Slow queries and no caching caused major delays"')
                    ->columnSpanFull(),

                TextInput::make('result_highlight')
                    ->required()
                    ->helperText('e.g. "85% faster response time" — shown as badge on card')
                    ->placeholder('85% faster response time'),

                TextInput::make('source')
                    ->default('Upwork Scenario')
                    ->helperText('e.g. "Real Client", "Upwork Scenario", "Side Project"'),

            ])->columns(2),

            // ── Classification ────────────────────────────────────────────
            Section::make('Classification')->schema([
                Select::make('problem_type')
                    ->required()
                    ->options([
                        'Performance' => 'Performance',
                        'Debugging' => 'Debugging',
                        'API / Backend' => 'API / Backend',
                        'UI / Frontend' => 'UI / Frontend',
                        'WordPress' => 'WordPress',
                        'Architecture' => 'Architecture',
                        'Security' => 'Security',
                    ])
                    ->searchable(),

                Select::make('difficulty')
                    ->options([
                        'easy' => 'Easy',
                        'medium' => 'Medium',
                        'complex' => 'Complex',
                    ])
                    ->default('medium')
                    ->required(),

                TextInput::make('time_to_solve')
                    ->placeholder('2–4 hours')
                    ->helperText('Estimated time shown on card'),

                TagsInput::make('tech_stack')
                    ->label('Tech Stack')
                    ->placeholder('Add technology...')
                    ->columnSpanFull(),

            ])->columns(3),

            // ── Case Study Content ─────────────────────────────────────────
            Section::make('Case Study Content')->schema([

                Textarea::make('context')
                    ->required()
                    ->rows(4)
                    ->helperText('1–2 paragraphs. Where the problem came from, who the client is, why it matters.')
                    ->columnSpanFull(),

                Textarea::make('the_problem')
                    ->required()
                    ->rows(4)
                    ->helperText('Be specific. Add constraints. Make it feel painful and real.')
                    ->columnSpanFull(),

                Textarea::make('my_thinking')
                    ->required()
                    ->rows(5)
                    ->helperText('Your unfair advantage. What you analyzed, what you ruled out, why you chose your approach.')
                    ->columnSpanFull(),

            ]),

            // ── Solution Steps (JSON array) ───────────────────────────────
            Section::make('The Solution')->schema([
                Repeater::make('the_solution')
                    ->label('Solution Steps')
                    ->schema([
                        TextInput::make('step')
                            ->required()
                            ->placeholder('Optimized Eloquent queries (reduced from 120 → 12)')
                            ->columnSpanFull(),
                    ])
                    ->addActionLabel('Add step')
                    ->columnSpanFull(),
            ]),

            // ── Results (JSON array) ───────────────────────────────────────
            Section::make('Results')->schema([
                Repeater::make('results')
                    ->label('Result Items')
                    ->schema([
                        TextInput::make('item')
                            ->required()
                            ->placeholder('Load time reduced: 4.2s → 900ms')
                            ->columnSpanFull(),
                    ])
                    ->addActionLabel('Add result')
                    ->columnSpanFull(),
            ]),

            // ── Before / After Metrics ─────────────────────────────────────
            Section::make('Before / After Metrics (optional)')
                ->description('Used for visual progress bars on the case study page.')
                ->schema([
                    Repeater::make('before_after')
                        ->schema([
                            TextInput::make('label')
                                ->required()
                                ->placeholder('Load time'),
                            TextInput::make('before')
                                ->required()
                                ->placeholder('4.2s'),
                            TextInput::make('after')
                                ->required()
                                ->placeholder('900ms'),
                            TextInput::make('unit')
                                ->placeholder('s')
                                ->helperText('Unit for numeric comparison'),
                            TextInput::make('before_val')
                                ->numeric()
                                ->placeholder('4.2'),
                            TextInput::make('after_val')
                                ->numeric()
                                ->placeholder('0.9'),
                            TextInput::make('max')
                                ->numeric()
                                ->placeholder('5'),
                        ])
                        ->columns(4)
                        ->addActionLabel('Add metric')
                        ->columnSpanFull(),
                ]),

            // ── Advanced Sections ──────────────────────────────────────────
            Section::make('Advanced (optional)')->schema([
                Textarea::make('whats_next')
                    ->rows(3)
                    ->helperText('What would you do next? Shows senior-level thinking.')
                    ->columnSpanFull(),

                Textarea::make('common_mistake')
                    ->rows(2)
                    ->helperText('e.g. "Most developers would add more servers. I fixed query inefficiencies instead."')
                    ->placeholder('Most developers would... I instead...')
                    ->columnSpanFull(),
            ]),

            // ── Media & Status ─────────────────────────────────────────────
            Section::make('Media & Status')->schema([
                FileUpload::make('image')
                    ->image()
                    ->disk('public')
                    ->directory('problem-solutions')
                    ->automaticallyResizeImagesMode('cover')
                    ->automaticallyCropImagesToAspectRatio('16:9')
                    ->columnSpanFull(),

                Toggle::make('is_published')
                    ->label('Published')
                    ->default(true),

                TextInput::make('sort_order')
                    ->numeric()
                    ->default(0),
            ])->columns(2),

        ]);
    }
}
