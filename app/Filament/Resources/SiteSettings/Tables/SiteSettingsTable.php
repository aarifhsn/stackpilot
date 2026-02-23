<?php

namespace App\Filament\Resources\SiteSettings\Tables;

use Filament\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class SiteSettingsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('key')
                    ->searchable()
                    ->sortable()
                    ->width('280px')
                    ->fontFamily('mono'),

                TextColumn::make('value')
                    ->limit(80)
                    ->wrap()
                    ->placeholder('— empty —'),

                TextColumn::make('updated_at')
                    ->since()
                    ->sortable()
                    ->label('Last Updated'),
            ])
            ->defaultSort('key')
            ->recordActions([
                EditAction::make(),
            ])
            ->paginated(false);
    }
}