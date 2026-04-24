<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ContactMessage extends Model
{
    use HasFactory;

    protected $table = 'contact_messages';

    // Only these fields can be mass-assigned — security best practice
    protected $fillable = [
        'full_name',
        'email',
        'phone_number',
        'subject',
        'message',
        'status',
    ];

    // Cast status to string for clean JSON output
    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];
}
