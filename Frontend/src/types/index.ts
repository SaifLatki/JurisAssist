export interface AnalysisResult {
  summary: string;
  legal_points: string[];
  risks: string[];
  advice: string[];
  template: string;
}

export interface Lawyer {
  id: string;
  name: string;
  expertise: string;
  rating: number;
  bio: string;
  email: string;
  phone: string;
  image_url: string;
  created_at: string;
}

export interface LawyerMessage {
  lawyer_id: string;
  sender_name: string;
  sender_email: string;
  message: string;
}
