<?php

namespace App\Filament\Resources\Portfolios\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TagsInput;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class PortfolioForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Project Info')
                    ->schema([
                        TextInput::make('title')
                            ->required()
                            ->live(onBlur: true)
                            ->afterStateUpdated(fn($state, callable $set) =>
                                $set('slug', Str::slug($state))),
                        TextInput::make('slug')
                            ->required()
                            ->unique(ignoreRecord: true),
                        Select::make('category')
                            ->options([
                                'laravel' => 'Laravel',
                                'wordpress' => 'WordPress',
                                'react' => 'React',
                                'nextjs' => 'Next.js',
                                'saas' => 'SaaS',
                            ])
                            ->searchable(),
                        TextInput::make('project_link')
                            ->url()
                            ->label('Live Project URL'),
                    ])->columns(2),
                Section::make('Content')->schema([
                    Textarea::make('description')
                        ->rows(3)
                        ->columnSpanFull(),

                    TagsInput::make('tech_stack')
                        ->label('Tech Stack')
                        ->placeholder('Add technology...')
                        ->columnSpanFull(),

                    Textarea::make('features')
                        ->label('Key Features (comma separated)')
                        ->placeholder('Responsive Design, API Integration, Auth System')
                        ->rows(2)
                        ->columnSpanFull(),
                ]),
                Section::make('Media & Status')->schema([
                    FileUpload::make('image')
                        ->image()
                        ->disk('public')
                        ->directory('portfolio')
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
