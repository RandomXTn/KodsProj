-- ELORA Accessories - Supabase Database Schema
-- Run this in your Supabase SQL Editor to create the required tables

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- PRODUCTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  sold BOOLEAN DEFAULT false,
  photo TEXT,
  url VARCHAR(255) UNIQUE NOT NULL,
  badge VARCHAR(50),
  variants TEXT,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for faster queries
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_url ON products(url);
CREATE INDEX IF NOT EXISTS idx_products_sold ON products(sold);

-- ============================================
-- USER PROFILES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email VARCHAR(255) NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  phone VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Index for faster queries
CREATE INDEX IF NOT EXISTS idx_user_profiles_user_id ON user_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_profiles_email ON user_profiles(email);

-- ============================================
-- CARTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS carts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  items JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Index for faster queries
CREATE INDEX IF NOT EXISTS idx_carts_user_id ON carts(user_id);

-- ============================================
-- FAVORITES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS favorites (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  product_slug VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, product_slug)
);

-- Index for faster queries
CREATE INDEX IF NOT EXISTS idx_favorites_user_id ON favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_favorites_product_slug ON favorites(product_slug);

-- ============================================
-- ORDERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  reference VARCHAR(100) UNIQUE NOT NULL,
  items JSONB NOT NULL,
  subtotal DECIMAL(10, 2) NOT NULL,
  delivery DECIMAL(10, 2) DEFAULT 0,
  total DECIMAL(10, 2) NOT NULL,
  shipping_address JSONB NOT NULL,
  payment_method VARCHAR(50) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for faster queries
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_reference ON orders(reference);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

-- Enable RLS on all tables
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE carts ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Products: Public read access
CREATE POLICY "Products are viewable by everyone"
  ON products FOR SELECT
  USING (true);

-- Products: Only authenticated users can insert (optional - for admin)
CREATE POLICY "Only authenticated users can insert products"
  ON products FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- User Profiles: Users can read their own profile
CREATE POLICY "Users can view own profile"
  ON user_profiles FOR SELECT
  USING (auth.uid() = user_id);

-- User Profiles: Users can insert their own profile
CREATE POLICY "Users can insert own profile"
  ON user_profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- User Profiles: Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON user_profiles FOR UPDATE
  USING (auth.uid() = user_id);

-- Carts: Users can manage their own cart
CREATE POLICY "Users can view own cart"
  ON carts FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own cart"
  ON carts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own cart"
  ON carts FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own cart"
  ON carts FOR DELETE
  USING (auth.uid() = user_id);

-- Favorites: Users can manage their own favorites
CREATE POLICY "Users can view own favorites"
  ON favorites FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own favorites"
  ON favorites FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own favorites"
  ON favorites FOR DELETE
  USING (auth.uid() = user_id);

-- Orders: Users can view and create their own orders
CREATE POLICY "Users can view own orders"
  ON orders FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own orders"
  ON orders FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- ============================================
-- FUNCTIONS AND TRIGGERS
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_carts_updated_at BEFORE UPDATE ON carts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- INSERT SAMPLE PRODUCTS
-- ============================================

-- Insert products from the existing products array
INSERT INTO products (name, category, price, sold, photo, url, badge, variants) VALUES
('Bague "Bubble"', 'Bague', 29.00, false, 'bague-bubble.webp', 'bague-bubble', null, null),
('Bague "Prestige"', 'Bague', 32.00, true, 'bague-prestige.webp', 'bague-prestige', null, null),
('Bague "Classy"', 'Bague', 29.00, false, 'bague-classy.webp', 'bague-classy-3', null, null),
('Bague "Dimaond Curve"', 'Bague', 32.00, false, 'bague-dimaond-curve.webp', 'bague-dimaond-curve', null, null),
('Bague "Gold Heart"', 'Bague', 32.00, false, 'bague-gold-heart.webp', 'bague-gold-heart', null, null),
('Bague "Solara"', 'Bague', 32.00, true, 'bague-solara.webp', 'bague-solara', null, null),
('Set "Oria"', 'Set', 99.00, false, 'set-oria.webp', 'set-oria', null, null),
('Set "Diana"', 'Set', 199.00, false, 'set-diana.webp', 'set-diana', null, null),
('Rangement "Muse"', 'Rangement', 29.90, false, 'rangement-muse.webp', 'muse', null, 'Beige'),
('Boucle "Classy"', 'Boucle', 69.00, false, 'boucle-classy.webp', 'boucle-classy', null, null),
('Boucle "Oria"', 'Boucle', 79.00, false, 'boucle-oria.webp', 'boucle-oria', null, null),
('Boucle "Nolia"', 'Boucle', 89.00, true, 'boucle-nolia.webp', 'boucle-nolia', null, null),
('Bague "Orlina"', 'Bague', 89.00, false, 'bague-orlina.webp', 'bague-orlina', null, null),
('Bague "Florea"', 'Bague', 89.00, true, 'bague-florea.webp', 'bague-florea', null, null),
('Bague "Pink Blush"', 'Bague', 99.00, false, 'bague-pink-blush.webp', 'bague-pink-blush', null, null),
('Bague "Purple Blush"', 'Bague', 99.00, false, 'bague-purple-blush.webp', 'bague-purple-blush', null, null),
('Collier "Aurea"', 'Collier', 89.00, false, 'collier-aurea.webp', 'collier-liora-2', null, null),
('Collier "Lotusia"', 'Collier', 89.00, true, 'collier-lotusia.webp', 'collier-lotusia', null, null),
('Collier "Liora"', 'Collier', 89.00, false, 'collier-liora.webp', 'collier-liora', null, null),
('Bracelet "Ora"', 'Bracelet', 99.00, false, 'bracelet-ora.webp', 'bracelet-ora', null, null),
('Bracelet "Radiant"', 'Bracelet', 109.00, false, 'bracelet-radiant.webp', 'bracelet-radiant', null, null),
('Set "Zircon Glow"', 'Set', 149.00, false, 'set-zircon-glow.webp', 'set-zircon-glow', null, null),
('Set "Arabesque"', 'Set', 189.00, false, 'set-arabesque.webp', 'set-arabesque', null, null),
('Collier "Floating Flower"', 'Collier', 89.00, false, 'collier-floating-flower.webp', 'collier-floating-flower', null, null),
('Collier "Azur"', 'Collier', 129.00, false, 'collier-azur.webp', 'collier-azur', null, null),
('Collier "Promise"', 'Collier', 89.00, false, 'collier-promise.webp', 'collier-promise', null, null),
('Collier "Strass"', 'Collier', 69.00, true, 'collier-strass.webp', 'collier-strass', null, null),
('Collier "Square"', 'Collier', 89.00, false, 'https://opierre.tn/wp-content/uploads/2026/10/Opierre-Silver-Cushion-Halo-Solitaire-Necklace-600x600-1.png', 'collier-square', null, null),
('Collier "Diana"', 'Collier', 89.00, false, 'collier-diana.webp', 'collier-diana', null, null),
('Collier "Blush Garden"', 'Collier', 149.00, false, 'collier-blush-garden.webp', 'collier-blush-garden', null, null),
('Collier "Pinky"', 'Collier', 79.00, false, 'collier-pinky.webp', 'collier-pinky', null, null),
('Collier "Gold Eternal"', 'Collier', 89.00, false, 'collier-gold-eternal.webp', 'collier-gold-eternal', null, null),
('Collier "White Eternal"', 'Collier', 89.00, false, 'collier-white-eternal.webp', 'collier-white-eternal', null, null),
('Collier "Purple Blush"', 'Collier', 139.00, false, 'collier-purple-blush.webp', 'collier-purple-blush', null, null),
('Collier "White Blush"', 'Collier', 139.00, false, 'collier-white-blush.webp', 'collier-white-blush', null, null),
('Set "Precious"', 'Set', 149.00, true, 'set-precious.webp', 'set-previous', null, null),
('Duo "Precious"', 'Special Edition', 67.15, true, 'duo-precious.webp', 'duo-precious', null, null),
('Royal Blush', 'Special Edition', 220.15, true, 'https://opierre.tn/wp-content/uploads/2026/10/IMG_2459-scaled-1024x1024.jpg', 'royal-blush', null, null),
('Infinite Glow', 'Special Edition', 245.65, false, 'infinite-glow.webp', 'infinite-glow', '-15%', null),
('Precious Bloom', 'Special Edition', 135.15, false, 'precious-bloom.webp', 'precious-bloom', '-15%', null),
('Golden Weave', 'Special Edition', 118.15, false, 'golden-weave.webp', 'golden-weave', '-15%', null),
('Pearl Glow', 'Special Edition', 109.65, true, 'pearl-glow.webp', 'pearl-glow', null, null),
('Golden Petals', 'Special Edition', 169.15, true, 'golden-petals.webp', 'golden-petals', null, null),
('Glowy', 'Special Edition', 126.65, false, 'glowy.webp', 'glowy', '-15%', null),
('Montre "Signature"', 'Montre', 159.00, false, 'montre-signature.webp', 'montre-signature', null, null),
('Collier "White Tree"', 'Collier', 79.00, true, 'collier-white-tree.webp', 'collier-white-tree', null, null),
('Collier "Purple Flower"', 'Collier', 89.00, true, 'collier-purple-flower.webp', 'collier-purple-flower', null, null)
ON CONFLICT (url) DO NOTHING;

-- ============================================
-- COMPLETED
-- ============================================

-- Your database schema is now ready!
-- Next steps:
-- 1. Copy your Supabase URL and Anon Key from Project Settings > API
-- 2. Update supabase-config.js with your credentials
-- 3. Set SUPABASE_ENABLED = true in supabase-config.js
