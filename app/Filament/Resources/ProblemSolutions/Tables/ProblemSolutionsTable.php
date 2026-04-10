<?php

namespace App\Filament\Resources\ProblemSolutions\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Table;
use Filament\Tables\Columns\BadgeColumn;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;

class ProblemSolutionsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('image')
                    ->disk('public')
                    ->width(80),

                TextColumn::make('title')
                    ->searchable()
                    ->sortable()
                    ->limit(40),

                TextColumn::make('problem_type')
                    ->badge()
                    ->sortable()
                    ->searchable(),

                TextColumn::make('difficulty')
                    ->badge()
                    ->color(fn($record) => match ($record->difficulty) {
                        'easy' => 'success',
                        'medium' => 'warning',
                        'complex' => 'danger',
                        default => 'gray',
                    })
                    ->sortable(),

                TextColumn::make('result_highlight')
                    ->label('Result')
                    ->limit(30),

                IconColumn::make('is_published')
                    ->boolean()
                    ->label('Published'),

                TextColumn::make('sort_order')
                    ->sortable()
                    ->label('Order'),
            ])
            ->defaultSort('sort_order', 'asc')
            ->filters([
                SelectFilter::make('problem_type')
                    ->options([
                        'Performance' => 'Performance',
                        'Debugging' => 'Debugging',
                        'API / Backend' => 'API / Backend',
                        'UI / Frontend' => 'UI / Frontend',
                        'WordPress' => 'WordPress',
                        'Architecture' => 'Architecture',
                        'Security' => 'Security',
                    ]),
                SelectFilter::make('difficulty')
                    ->options([
                        'easy' => 'Easy',
                        'medium' => 'Medium',
                        'complex' => 'Complex',
                    ]),
            ])
            ->recordActions([
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
