/*
  # JurisAssist Database Schema

  1. New Tables
    - `lawyers`
      - `id` (uuid, primary key)
      - `name` (text, lawyer's full name)
      - `expertise` (text, area of legal expertise)
      - `rating` (numeric, rating out of 5)
      - `bio` (text, short biography)
      - `email` (text, contact email)
      - `phone` (text, contact phone)
      - `image_url` (text, profile picture URL)
      - `created_at` (timestamptz, creation timestamp)
    
    - `lawyer_messages`
      - `id` (uuid, primary key)
      - `lawyer_id` (uuid, foreign key to lawyers)
      - `sender_name` (text, name of person contacting)
      - `sender_email` (text, email of person contacting)
      - `message` (text, message content)
      - `created_at` (timestamptz, creation timestamp)

  2. Security
    - Enable RLS on all tables
    - Allow public read access to lawyers table
    - Allow public insert access to lawyer_messages table
*/

-- Create lawyers table
CREATE TABLE IF NOT EXISTS lawyers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  expertise text NOT NULL,
  rating numeric(2,1) NOT NULL DEFAULT 5.0 CHECK (rating >= 0 AND rating <= 5),
  bio text NOT NULL DEFAULT '',
  email text NOT NULL,
  phone text NOT NULL DEFAULT '',
  image_url text NOT NULL DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- Create lawyer_messages table
CREATE TABLE IF NOT EXISTS lawyer_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lawyer_id uuid NOT NULL REFERENCES lawyers(id) ON DELETE CASCADE,
  sender_name text NOT NULL,
  sender_email text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE lawyers ENABLE ROW LEVEL SECURITY;
ALTER TABLE lawyer_messages ENABLE ROW LEVEL SECURITY;

-- Policies for lawyers table (public read access)
CREATE POLICY "Anyone can view lawyers"
  ON lawyers FOR SELECT
  USING (true);

-- Policies for lawyer_messages table (public insert access)
CREATE POLICY "Anyone can send messages to lawyers"
  ON lawyer_messages FOR INSERT
  WITH CHECK (true);

-- Insert sample lawyers
INSERT INTO lawyers (name, expertise, rating, bio, email, phone, image_url) VALUES
  ('Sarah Johnson', 'Contract Law', 4.8, 'Experienced contract attorney with over 15 years of practice in business agreements and commercial contracts.', 'sarah.johnson@lawfirm.com', '+1-555-0101', 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400'),
  ('Michael Chen', 'Employment Law', 4.9, 'Specializing in workplace disputes, employment contracts, and labor law with a track record of successful client outcomes.', 'michael.chen@lawfirm.com', '+1-555-0102', 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400'),
  ('Emily Rodriguez', 'Real Estate Law', 4.7, 'Expert in property transactions, lease agreements, and real estate disputes with comprehensive market knowledge.', 'emily.rodriguez@lawfirm.com', '+1-555-0103', 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400'),
  ('David Thompson', 'Intellectual Property', 4.9, 'Patent attorney and IP specialist helping clients protect their innovations and creative works.', 'david.thompson@lawfirm.com', '+1-555-0104', 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=400'),
  ('Jennifer Park', 'Family Law', 4.6, 'Compassionate family law attorney handling divorce, custody, and family-related legal matters.', 'jennifer.park@lawfirm.com', '+1-555-0105', 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400'),
  ('Robert Martinez', 'Criminal Defense', 4.8, 'Dedicated criminal defense lawyer with extensive courtroom experience and proven defense strategies.', 'robert.martinez@lawfirm.com', '+1-555-0106', 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400')
ON CONFLICT DO NOTHING;