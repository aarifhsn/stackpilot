<?php

namespace App\Filament\Resources\SiteSettings\Schemas;

use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class SiteSettingForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema->components([
            Section::make()->schema([
                TextInput::make('key')
                    ->disabled()
                    ->dehydrated(false), // don't try to save key

                Textarea::make('value')
                    ->label('Value')
                    ->rows(4)
                    ->columnSpanFull(),
            ]),
        ]);
    }



}