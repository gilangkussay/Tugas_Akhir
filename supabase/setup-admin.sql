-- Create admin account
-- Run this in Supabase SQL Editor

-- First, you need to create the user in Supabase Auth Dashboard:
-- 1. Go to Supabase Dashboard > Authentication > Users
-- 2. Click "Add User"
-- 3. Email: admin@techstore.com
-- 4. Password: admin123
-- 5. Confirm email automatically
-- 6. Copy the user ID

-- Then run this SQL to set the role to admin:
-- Replace 'USER_ID_HERE' with the actual user ID from step 6

UPDATE profiles 
SET role = 'admin', 
    full_name = 'Admin TechStore'
WHERE email = 'admin@techstore.com';

-- If profile doesn't exist, insert it:
-- INSERT INTO profiles (id, email, full_name, role)
-- VALUES ('USER_ID_HERE', 'admin@techstore.com', 'Admin TechStore', 'admin');

-- Verify admin account:
SELECT id, email, full_name, role FROM profiles WHERE email = 'admin@techstore.com';
