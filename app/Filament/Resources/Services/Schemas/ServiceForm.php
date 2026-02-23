<?php

namespace App\Filament\Resources\Services\Schemas;

use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class ServiceForm
{
    protected static array $iconOptions = [
        '⚙️' => '⚙️  Backend / Laravel',
        '⚛️' => '⚛️  React / Frontend',
        '🌐' => '🌐  WordPress / Web',
        '🔗' => '🔗  API Integration',
        '🐳' => '🐳  Docker / DevOps',
        '🏗️' => '🏗️  SaaS Architecture',
        '🔒' => '🔒  Security / Auth',
        '📦' => '📦  Package / Module',
        '💳' => '💳  Payments',
        '📊' => '📊  Analytics / Dashboard',
        '🚀' => '🚀  Performance',
        '🛒' => '🛒  E-Commerce',
    ];

    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Service Details')
                    ->schema([
                        TextInput::make('title')
                            ->required()
                            ->live(onBlur: true)
                            ->afterStateUpdated(fn($state, callable $set) =>
                                $set('slug', Str::slug($state))),

                        TextInput::make('slug')
                            ->required()
                            ->unique(ignoreRecord: true),

                        // Dropdown with presets + free-type fallback
                        Select::make('icon')
                            ->label('Icon')
                            ->options(self::$iconOptions)
                            ->searchable()
                            ->allowHtml()  // renders emoji in dropdown
                            ->createOptionForm([
                                TextInput::make('icon')
                                    ->label('Custom emoji or HTML')
                                    ->placeholder('e.g. 🎯 or <i class="fa fa-code"></i>')
                                    ->required(),
                            ])
                            ->createOptionUsing(fn(array $data) => $data['icon'])
                            ->helperText('Pick a preset or click "Create option" to enter a custom emoji / Font Awesome class.'),

                        TextInput::make('sort_order')
                            ->numeric()
                            ->default(0)
                            ->helperText('Lower number = shown first. You can also drag-reorder in the list.'),

                        Toggle::make('is_published')
                            ->default(true),
                    ])->columns(2),

                Section::make('Content')
                    ->schema([
                        RichEditor::make('content')
                            ->columnSpanFull()
                            ->toolbarButtons([
                                'bold',
                                'italic',
                                'bulletList',
                                'orderedList',
                                'link',
                                'undo',
                                'redo',
                            ]),
                    ]),
            ]);
    }
}