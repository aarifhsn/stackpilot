<?php

namespace App\Http\Controllers;

use App\Mail\ContactMail;
use App\Models\ContactMessage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    // public function store(Request $request)
    // {
    //     $data = $request->validate([
    //         'name' => 'required',
    //         'email' => 'required|email',
    //         'message' => 'required',
    //     ]);

    //     ContactMessage::create($data);

    //     Mail::to('you@email.com')->send(new ContactMail($data));

    //     return response()->json(['success' => true]);
    // }

    public function send(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:100',
            'email' => 'required|email',
            'subject' => 'nullable|string|max:150',
            'message' => 'required|string|min:10',
        ]);

        Mail::to('you@yourdomain.com')->send(new ContactMail($data));

        return back()->with('success', 'Message sent successfully!');
    }

}
