<?php

namespace App\Filament\Widgets;

use App\Models\Portfolio;
use App\Models\Service;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class StatsOverview extends BaseWidget
{
    protected function getStats(): array
    {
        return [
            Stat::make('Published Portfolios', Portfolio::where('is_published', true)->count())
                ->description(Portfolio::where('is_published', false)->count() . ' drafts')
                ->color('success')
                ->icon('heroicon-o-briefcase'),

            Stat::make('Services', Service::where('is_published', true)->count())
                ->description(Service::where('is_published', false)->count() . ' drafts')
                ->color('info')
                ->icon('heroicon-o-wrench-screwdriver'),

            Stat::make('Site Settings', \App\Models\SiteSetting::whereNotNull('value')->where('value', '!=', '')->count() . ' filled')
                ->description('of ' . \App\Models\SiteSetting::count() . ' total keys')
                ->color('warning')
                ->icon('heroicon-o-cog-6-tooth'),
        ];
    }
}