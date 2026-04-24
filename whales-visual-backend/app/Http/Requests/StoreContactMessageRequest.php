<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreContactMessageRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Open endpoint — no auth required
    }

    public function rules(): array
    {
        return [
            'full_name'    => ['required', 'string', 'min:2', 'max:100'],
            'email'        => ['required', 'email:rfc,dns'],
            'phone_number' => ['nullable', 'string', 'max:20'],
            'subject'      => ['required', 'in:General Inquiry,Booking Question,Partnership,Other'],
            'message'      => ['required', 'string', 'min:10', 'max:2000'],
        ];
    }

    public function messages(): array
    {
        return [
            'full_name.required'  => 'Please enter your full name.',
            'email.required'      => 'A valid email address is required.',
            'email.email'         => 'The email address format is invalid.',
            'subject.required'    => 'Please select a subject.',
            'subject.in'          => 'The selected subject is not valid.',
            'message.required'    => 'Please write your message before submitting.',
            'message.min'         => 'Your message must be at least 10 characters.',
        ];
    }
}
