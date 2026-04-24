<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreBookingRequestRequest;
use App\Models\BookingRequest;
use Illuminate\Http\JsonResponse;

class BookingRequestController extends Controller
{
    public function store(StoreBookingRequestRequest $request): JsonResponse
    {
        try {
            $booking = BookingRequest::create([
                'full_name'        => $request->full_name,
                'email'            => $request->email,
                'phone_number'     => $request->phone_number,
                'event_type'       => $request->event_type,
                'preferred_date'   => $request->preferred_date,
                'preferred_time'   => $request->preferred_time,
                'location_needed'  => $request->boolean('location_needed'),
                'location_details' => $request->location_details,
                'additional_notes' => $request->additional_notes,
                'status'           => 'pending',
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Your booking request has been received! We will confirm your session within 24 hours.',
                'data'    => [
                    'id'             => $booking->id,
                    'preferred_date' => $booking->preferred_date->toDateString(),
                    'event_type'     => $booking->event_type,
                    'created_at'     => $booking->created_at->toDateTimeString(),
                ],
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Something went wrong. Please try again or call us directly.',
            ], 500);
        }
    }
}
