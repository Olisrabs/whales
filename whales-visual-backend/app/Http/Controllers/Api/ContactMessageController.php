<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreContactMessageRequest;
use App\Models\ContactMessage;
use Illuminate\Http\JsonResponse;

class ContactMessageController extends Controller
{
    public function store(StoreContactMessageRequest $request): JsonResponse
    {
        try {
            $message = ContactMessage::create([
                'full_name'    => $request->full_name,
                'email'        => $request->email,
                'phone_number' => $request->phone_number,
                'subject'      => $request->subject,
                'message'      => $request->message,
                'status'       => 'unread',             // Always starts as unread
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Thank you for reaching out! We will get back to you within 24 hours.',
                'data'    => [
                    'id'         => $message->id,
                    'created_at' => $message->created_at->toDateTimeString(),
                ],
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Something went wrong. Please try again or contact us directly.',
            ], 500);
        }
    }
}
