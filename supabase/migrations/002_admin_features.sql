-- Migration: Add order tracking and review features
-- Run this after the initial schema

-- Add tracking fields to orders table
ALTER TABLE orders
ADD COLUMN IF NOT EXISTS tracking_status TEXT DEFAULT 'processing'
CHECK (tracking_status IN ('processing', 'confirmed', 'shipped', 'delivered', 'cancelled')),
ADD COLUMN IF NOT EXISTS delivered_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS can_review BOOLEAN DEFAULT FALSE;

-- Update reviews table to link with orders
ALTER TABLE reviews
ADD COLUMN IF NOT EXISTS order_id UUID REFERENCES orders(id) ON DELETE CASCADE;

-- Drop old unique constraint and add new one with order_id
ALTER TABLE reviews DROP CONSTRAINT IF EXISTS reviews_product_id_user_id_key;
ALTER TABLE reviews ADD CONSTRAINT reviews_product_user_order_unique 
  UNIQUE(product_id, user_id, order_id);

-- Function to update can_review when order is delivered
CREATE OR REPLACE FUNCTION update_can_review()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.tracking_status = 'delivered' AND OLD.tracking_status != 'delivered' THEN
    NEW.can_review = TRUE;
    NEW.delivered_at = NOW();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for order delivery
DROP TRIGGER IF EXISTS order_delivered_trigger ON orders;
CREATE TRIGGER order_delivered_trigger
BEFORE UPDATE ON orders
FOR EACH ROW
EXECUTE FUNCTION update_can_review();

-- Function to update product rating when review is added/updated/deleted
CREATE OR REPLACE FUNCTION update_product_rating()
RETURNS TRIGGER AS $$
DECLARE
  avg_rating DECIMAL(2,1);
  review_count INTEGER;
BEGIN
  -- Get product_id from either NEW or OLD
  DECLARE
    prod_id UUID;
  BEGIN
    IF TG_OP = 'DELETE' THEN
      prod_id := OLD.product_id;
    ELSE
      prod_id := NEW.product_id;
    END IF;
    
    -- Calculate new average and count
    SELECT 
      COALESCE(ROUND(AVG(rating)::numeric, 1), 0),
      COUNT(*)
    INTO avg_rating, review_count
    FROM reviews
    WHERE product_id = prod_id;
    
    -- Update product
    UPDATE products
    SET 
      rating = avg_rating,
      total_reviews = review_count
    WHERE id = prod_id;
  END;
  
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Triggers for review changes
DROP TRIGGER IF EXISTS review_rating_trigger ON reviews;
CREATE TRIGGER review_rating_trigger
AFTER INSERT OR UPDATE OR DELETE ON reviews
FOR EACH ROW
EXECUTE FUNCTION update_product_rating();

-- Create storage bucket for product images (if not exists)
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policy for product images
CREATE POLICY "Anyone can view product images"
ON storage.objects FOR SELECT
USING (bucket_id = 'product-images');

CREATE POLICY "Admins can upload product images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'product-images' AND
  EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
  )
);

CREATE POLICY "Admins can update product images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'product-images' AND
  EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
  )
);

CREATE POLICY "Admins can delete product images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'product-images' AND
  EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
  )
);
