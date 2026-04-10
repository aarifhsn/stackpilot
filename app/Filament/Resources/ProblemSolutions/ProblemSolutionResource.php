<?php

namespace App\Filament\Resources\ProblemSolutions;

use App\Filament\Resources\ProblemSolutions\Pages\CreateProblemSolution;
use App\Filament\Resources\ProblemSolutions\Pages\EditProblemSolution;
use App\Filament\Resources\ProblemSolutions\Pages\ListProblemSolutions;
use App\Filament\Resources\ProblemSolutions\Schemas\ProblemSolutionForm;
use App\Filament\Resources\ProblemSolutions\Tables\ProblemSolutionsTable;
use App\Models\ProblemSolution;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class ProblemSolutionResource extends Resource
{
    protected static ?string $model = ProblemSolution::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static ?string $recordTitleAttribute = 'ProblemSolution';

    protected static ?string $navigationLabel = 'Problem Solutions';

    // protected static ?string $navigationGroup = 'Content';

    protected static ?int $navigationSort = 2;

    public static function form(Schema $schema): Schema
    {
        return ProblemSolutionForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return ProblemSolutionsTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListProblemSolutions::route('/'),
            'create' => CreateProblemSolution::route('/create'),
            'edit' => EditProblemSolution::route('/{record}/edit'),
        ];
    }
}
