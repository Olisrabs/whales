<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('contact_messages', function (Blueprint $table) {
            $table->id();                                        // Auto-incrementing primary key
            $table->string('full_name', 100);                        // Client's full name
            $table->string('email', 255)->index('idx_email');                            // Client's email address
            $table->string('phone_number', 20)->nullable();         // Optional phone number
            $table->enum('subject', [                          // Dropdown subject options
                'General Inquiry',
                'Booking Question',
                'Partnership',
                'Other'
            ]);
            $table->text('message');                            // The client's message body
            $table->enum('status', [                           // Internal status for admin tracking
                'unread',
                'read',
                'replied'
            ])->default('unread')->index('idx_status');
            $table->timestamps();                              // created_at and updated_at
            
            $table->index('created_at', 'idx_created');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('contact_messages');
    }
};
