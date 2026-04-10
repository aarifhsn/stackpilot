<?php

namespace App\Filament\Resources\ProblemSolutions\Pages;

use App\Filament\Resources\ProblemSolutions\ProblemSolutionResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditProblemSolution extends EditRecord
{
    protected static string $resource = ProblemSolutionResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
