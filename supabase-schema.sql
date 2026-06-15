-- WinLog Database Schema
-- Run this in your Supabase SQL Editor

-- Create achievements table (main table for storing user achievements)
CREATE TABLE IF NOT EXISTS achievements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  impact TEXT,
  proof_urls TEXT[], -- Array of URLs for proof/evidence
  category TEXT,
  date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create brag_entries table (alias for achievements to maintain API compatibility)
-- Note: You can use either table name. Consider standardizing on one.
CREATE TABLE IF NOT EXISTS brag_entries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  impact TEXT,
  proof_urls TEXT[],
  category TEXT,
  date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE brag_entries ENABLE ROW LEVEL SECURITY;

-- Create policies for achievements table
-- Users can only see their own achievements
CREATE POLICY "Users can view own achievements"
  ON achievements FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own achievements
CREATE POLICY "Users can insert own achievements"
  ON achievements FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own achievements
CREATE POLICY "Users can update own achievements"
  ON achievements FOR UPDATE
  USING (auth.uid() = user_id);

-- Users can delete their own achievements
CREATE POLICY "Users can delete own achievements"
  ON achievements FOR DELETE
  USING (auth.uid() = user_id);

-- Create policies for brag_entries table (same as achievements)
CREATE POLICY "Users can view own brag_entries"
  ON brag_entries FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own brag_entries"
  ON brag_entries FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own brag_entries"
  ON brag_entries FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own brag_entries"
  ON brag_entries FOR DELETE
  USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_achievements_user_id ON achievements(user_id);
CREATE INDEX IF NOT EXISTS idx_achievements_date ON achievements(date DESC);
CREATE INDEX IF NOT EXISTS idx_brag_entries_user_id ON brag_entries(user_id);
CREATE INDEX IF NOT EXISTS idx_brag_entries_date ON brag_entries(date DESC);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers to auto-update updated_at
CREATE TRIGGER update_achievements_updated_at
  BEFORE UPDATE ON achievements
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_brag_entries_updated_at
  BEFORE UPDATE ON brag_entries
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
