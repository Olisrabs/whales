<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Carbon\Carbon;

class StoreBookingRequestRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'full_name'        => ['required', 'string', 'min:2', 'max:100'],
            'email'            => ['required', 'email:rfc,dns'],
            'phone_number'     => ['required', 'string', 'max:20'],
            'event_type'       => ['required', Rule::in([
                                    'Wedding',
                                    'Portrait Session',
                                    'Corporate Event',
                                    'Birthday',
                                    'Brand Shoot',
                                    'Other',
                                ])],
            'preferred_date'   => ['required', 'date', 'after_or_equal:today'],
            'preferred_time'   => ['required', Rule::in([
                                    'Morning (8am–12pm)',
                                    'Afternoon (12pm–4pm)',
                                    'Evening (4pm–7pm)',
                                ])],
            'location_needed'  => ['required', 'boolean'],
            'location_details' => ['nullable', 'required_if:location_needed,true', 'string', 'max:255'],
            'additional_notes' => ['nullable', 'string', 'max:1000'],
        ];
    }

    public function messages(): array
    {
        return [
            'full_name.required'        => 'Please enter your full name.',
            'email.required'            => 'A valid email address is required.',
            'phone_number.required'     => 'A phone number is required for bookings.',
            'event_type.required'       => 'Please select the type of event.',
            'event_type.in'             => 'The selected event type is not valid.',
            'preferred_date.required'   => 'Please select your preferred date.',
            'preferred_date.after_or_equal' => 'The booking date must be today or a future date.',
            'preferred_time.required'   => 'Please select a preferred time slot.',
            'location_details.required_if' => 'Please provide the location details since travel is needed.',
        ];
    }
}
