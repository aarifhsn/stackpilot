<?php

namespace App\Filament\Pages;

use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Pages\Page;
use Filament\Schemas\Components\Section;

class ManageSettings extends Page
{
    protected string $view = 'filament.pages.manage-settings';
    // protected static ?string $navigationIcon = 'heroicon-o-cog-6-tooth';
    protected static ?string $navigationLabel = 'Site Settings';
    protected static ?int $navigationSort = 99;

    public array $settings = [];

    public function mount(): void
    {
        $keys = [
            'site_title',
            'meta_description',
            'hero_greeting',
            'hero_name',
            'hero_content',
            'about_content',
            'resume_url',
            'portfolio_title',
            'service_title',
            'service_subtitle',
            'contact_title',
            'github_url',
            'linkedin_url',
            'twitter_url',
            'whatsapp_url',
            'telegram_url',
            'contact_email',
            'contact_phone',
            'contact_address',
            'map_url',
            'blog_url',
        ];

        foreach ($keys as $key) {
            $this->settings[$key] = \App\Models\SiteSetting::get($key, '');
        }
    }

    public function save(): void
    {
        foreach ($this->settings as $key => $value) {
            \App\Models\SiteSetting::set($key, $value);
        }

        \Filament\Notifications\Notification::make()
            ->title('Settings saved!')
            ->success()
            ->send();
    }

    protected function getFormSchema(): array
    {
        return [
            Section::make('SEO')->schema([
                TextInput::make('settings.site_title')->label('Site Title'),
                Textarea::make('settings.meta_description')->label('Meta Description')->rows(2),
            ])->columns(1),

            Section::make('Hero Section')->schema([
                TextInput::make('settings.hero_greeting')->label('Greeting (e.g. Hi, I\'m)'),
                TextInput::make('settings.hero_name')->label('Your Name'),
                Textarea::make('settings.hero_content')->label('Hero Description')->rows(3),
            ]),

            Section::make('About Section')->schema([
                Textarea::make('settings.about_content')->rows(4)->label('About Text'),
                TextInput::make('settings.resume_url')->label('Resume URL')->url(),
            ]),

            Section::make('Section Titles')->schema([
                TextInput::make('settings.portfolio_title'),
                TextInput::make('settings.service_title'),
                TextInput::make('settings.service_subtitle'),
                TextInput::make('settings.contact_title'),
            ])->columns(2),

            Section::make('Social Links')->schema([
                TextInput::make('settings.github_url')->label('GitHub')->url(),
                TextInput::make('settings.linkedin_url')->label('LinkedIn')->url(),
                TextInput::make('settings.twitter_url')->label('Twitter/X')->url(),
                TextInput::make('settings.blog_url')->label('Blog URL')->url(),
            ])->columns(2),

            Section::make('Contact Info')->schema([
                TextInput::make('settings.whatsapp_url')->label('WhatsApp Number'),
                TextInput::make('settings.telegram_url')->label('Telegram URL')->url(),
                TextInput::make('settings.contact_email')->label('Email')->email(),
                TextInput::make('settings.contact_phone')->label('Phone'),
                TextInput::make('settings.contact_address')->label('Address'),
                TextInput::make('settings.map_url')->label('Google Maps Embed URL')->url(),
            ])->columns(2),
        ];
    }

    public function getTitle(): string
    {
        return 'Site Settings';
    }
}
