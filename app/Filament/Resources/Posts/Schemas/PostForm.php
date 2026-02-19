<?php

namespace App\Filament\Resources\Posts\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class PostForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Post Info')->schema([
                    TextInput::make('title')
                        ->required()
                        ->live(onBlur: true)
                        ->afterStateUpdated(fn($state, callable $set) =>
                            $set('slug', Str::slug($state))),

                    TextInput::make('slug')
                        ->required()
                        ->unique(ignoreRecord: true),

                    Select::make('category_id')
                        ->relationship('category', 'name')
                        ->createOptionForm([
                            TextInput::make('name')->required(),
                            TextInput::make('slug')->required(),
                        ])
                        ->searchable()
                        ->preload(),

                    DateTimePicker::make('published_at')
                        ->label('Publish Date'),
                ])->columns(2),

                Section::make('Content')->schema([
                    FileUpload::make('featured_image')
                        ->image()
                        ->disk('public')
                        ->directory('blog')
                        ->columnSpanFull(),

                    Textarea::make('excerpt')
                        ->rows(2)
                        ->columnSpanFull(),

                    RichEditor::make('content')
                        ->required()
                        ->columnSpanFull()
                        ->fileAttachmentsDisk('public')
                        ->fileAttachmentsDirectory('blog/attachments'),
                ]),

                Toggle::make('is_published')
                    ->default(false),
            ]);
    }
}
