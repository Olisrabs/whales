<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('booking_requests', function (Blueprint $table) {
            $table->id();
            $table->string('full_name', 100);                        // Client's full name
            $table->string('email', 255)->index('idx_email');                            // Client's email
            $table->string('phone_number', 20);                     // Required for bookings
            $table->enum('event_type', [                       // Type of photography session
                'Wedding',
                'Portrait Session',
                'Corporate Event',
                'Birthday',
                'Brand Shoot',
                'Other'
            ])->index('idx_event_type');
            $table->date('preferred_date')->index('idx_preferred_date');                     // The date selected on the calendar
            $table->enum('preferred_time', [                   // Time slot chosen
                'Morning (8am–12pm)',
                'Afternoon (12pm–4pm)',
                'Evening (4pm–7pm)'
            ]);
            $table->boolean('location_needed')->default(false); // Whether travel is required
            $table->string('location_details', 255)->nullable();     // Conditionally filled location info
            $table->text('additional_notes')->nullable();       // Optional notes from client
            $table->enum('status', [                           // Booking workflow status
                'pending',
                'confirmed',
                'cancelled',
                'completed'
            ])->default('pending')->index('idx_status');
            $table->timestamps();

            $table->index('created_at', 'idx_created');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('booking_requests');
    }
};
