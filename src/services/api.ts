const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

// ── Types ────────────────────────────────────────────────

export interface ContactFormData {
  full_name: string;
  email: string;
  phone_number?: string;
  subject: 'General Inquiry' | 'Booking Question' | 'Partnership' | 'Other';
  message: string;
}

export interface BookingFormData {
  full_name: string;
  email: string;
  phone_number: string;
  event_type: 'Wedding' | 'Portrait Session' | 'Corporate Event' | 'Birthday' | 'Brand Shoot' | 'Other';
  preferred_date: string;       // ISO date string: "YYYY-MM-DD"
  preferred_time: 'Morning (8am–12pm)' | 'Afternoon (12pm–4pm)' | 'Evening (4pm–7pm)';
  location_needed: boolean;
  location_details?: string;
  additional_notes?: string;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  data?: Record<string, unknown>;
}

// ── API Calls ─────────────────────────────────────────────

export async function submitContactForm(data: ContactFormData): Promise<ApiResponse> {
  const response = await fetch(`${API_BASE_URL}/contact`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const result: ApiResponse = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'Failed to send message.');
  }

  return result;
}

export async function submitBookingForm(data: BookingFormData): Promise<ApiResponse> {
  const response = await fetch(`${API_BASE_URL}/booking`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const result: ApiResponse = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'Failed to submit booking.');
  }

  return result;
}
