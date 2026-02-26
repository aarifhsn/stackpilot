<?php

namespace App\Filament\Pages;

use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Pages\Page;
use Filament\Schemas\Components\Section;
use Filament\Actions\Action;
use BackedEnum;
use Filament\Schemas\Schema;

class ManageSettings extends Page
{
    protected string $view = 'filament.pages.manage-settings';
    protected static string|BackedEnum|null $navigationIcon = 'heroicon-o-cog-6-tooth';
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
            'hero_subtitle',
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

        $this->form->fill($this->settings);
    }

    public function save(): void
    {
        $data = $this->form->getState();

        foreach ($data as $key => $value) {
            \App\Models\SiteSetting::set($key, $value ?? '');
        }

        // Reload settings back into the form
        foreach (array_keys($data) as $key) {
            $this->settings[$key] = \App\Models\SiteSetting::get($key, '');
        }

        $this->form->fill($this->settings);

        \Filament\Notifications\Notification::make()
            ->title('Settings saved!')
            ->success()
            ->send();
    }

    public function form(Schema $form): Schema
    {
        return $form
            ->statePath('settings')
            ->components([
                Section::make('SEO')->schema([
                    TextInput::make('site_title')->label('Site Title'),
                    Textarea::make('meta_description')->label('Meta Description')->rows(2),
                ])->columns(1),

                Section::make('Hero Section')->schema([
                    TextInput::make('hero_greeting')->label('Greeting (e.g. Hi, I\'m)'),
                    TextInput::make('hero_name')->label('Your Name'),
                    TextInput::make('hero_subtitle')->label('Subtitle'),
                    Textarea::make('hero_content')->label('Hero Description')->rows(3),
                ]),

                Section::make('About Section')->schema([
                    Textarea::make('about_content')->rows(4)->label('About Text'),
                    TextInput::make('resume_url')->label('Resume URL')->url(),
                ]),

                Section::make('Section Titles')->schema([
                    TextInput::make('portfolio_title'),
                    TextInput::make('service_title'),
                    TextInput::make('service_subtitle'),
                    TextInput::make('contact_title'),
                ])->columns(2),

                Section::make('Social Links')->schema([
                    TextInput::make('github_url')->label('GitHub')->url(),
                    TextInput::make('linkedin_url')->label('LinkedIn')->url(),
                    TextInput::make('twitter_url')->label('Twitter/X')->url(),
                    TextInput::make('blog_url')->label('Blog URL')->url(),
                ])->columns(2),

                Section::make('Contact Info')->schema([
                    TextInput::make('whatsapp_url')->label('WhatsApp Number'),
                    TextInput::make('telegram_url')->label('Telegram URL')->url(),
                    TextInput::make('contact_email')->label('Email')->email(),
                    TextInput::make('contact_phone')->label('Phone'),
                    TextInput::make('contact_address')->label('Address'),
                    TextInput::make('map_url')->label('Google Maps Embed URL')->url(),
                ])->columns(2),
            ]);
    }
    public function getTitle(): string
    {
        return 'Site Settings';
    }


    protected function getFormActions(): array
    {
        return [
            Action::make('save')
                ->label('Save Settings')
                ->submit('save'),
        ];
    }

}
