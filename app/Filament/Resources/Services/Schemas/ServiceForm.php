<?php

namespace App\Filament\Resources\Services\Schemas;

use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class ServiceForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('title')
                    ->required()
                    ->live(onBlur: true)
                    ->afterStateUpdated(fn($state, callable $set) =>
                        $set('slug', Str::slug($state))),

                TextInput::make('slug')
                    ->required()
                    ->unique(ignoreRecord: true),

                TextInput::make('icon')
                    ->label('Icon (emoji or class)')
                    ->placeholder('⚙️'),

                TextInput::make('sort_order')
                    ->numeric()
                    ->default(0),

                RichEditor::make('content')
                    ->columnSpanFull(),

                Toggle::make('is_published')
                    ->default(true),
            ])->columns(2);
    }
}
