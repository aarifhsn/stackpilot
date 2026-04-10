<?php

namespace App\Filament\Resources\ProblemSolutions\Pages;

use App\Filament\Resources\ProblemSolutions\ProblemSolutionResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListProblemSolutions extends ListRecords
{
    protected static string $resource = ProblemSolutionResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
