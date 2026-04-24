<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BookingRequest extends Model
{
    use HasFactory;

    protected $table = 'booking_requests';

    protected $fillable = [
        'full_name',
        'email',
        'phone_number',
        'event_type',
        'preferred_date',
        'preferred_time',
        'location_needed',
        'location_details',
        'additional_notes',
        'status',
    ];

    protected $casts = [
        'preferred_date'  => 'date',           // Automatically cast to Carbon date instance
        'location_needed' => 'boolean',        // Cast to true/false cleanly
        'created_at'      => 'datetime',
        'updated_at'      => 'datetime',
    ];
}
