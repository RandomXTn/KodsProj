# Supabase Setup Guide for ELORA Accessories

## Quick Start

### 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Fill in:
   - **Name**: ELORA Accessories
   - **Database Password**: (create a strong password)
   - **Region**: Choose closest to Tunisia (EU Central recommended)
5. Click "Create new project"

### 2. Run Database Schema

1. In your Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy the entire contents of `supabase-schema.sql`
4. Paste into the SQL editor
5. Click "Run" or press Ctrl+Enter
6. You should see "Success. No rows returned"

This creates all the tables: `products`, `user_profiles`, `carts`, `favorites`, and `orders`.

### 3. Get Your API Keys

1. Go to **Project Settings** (gear icon in sidebar)
2. Click **API** in the left menu
3. Copy these values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public key** (long string starting with `eyJ...`)

### 4. Configure the Website

1. Open `supabase-config.js`
2. Replace the placeholder values:

```javascript
const SUPABASE_URL = 'https://your-project.supabase.co'; // Your Project URL
const SUPABASE_ANON_KEY = 'eyJhbG...your-key'; // Your anon key
```

3. Enable Supabase:

```javascript
const SUPABASE_ENABLED = true; // Change to true
```

### 5. Add Supabase Script to HTML Files

Add these lines in the `<head>` section of ALL HTML files, **before** the existing scripts:

```html
<!-- Supabase JS Client -->
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script src="supabase-config.js"></script>
<script src="supabase-db.js"></script>
```

The files that need updating:
- ✅ index.html
- ✅ produits.html
- ✅ produit.html
- ✅ categorie.html
- ✅ panier.html
- ✅ checkout.html
- ✅ compte.html
- ✅ verification.html
- ✅ confirmation.html
- ✅ wishlist.html
- ✅ contact.html
- ✅ a-propos.html

### 6. Enable Email Authentication (Optional)

For real user authentication:

1. Go to **Authentication** > **Providers** in Supabase
2. Enable **Email** provider
3. Configure email templates under **Email Templates**
4. For development, enable **Confirm email** = OFF (in Settings > Auth)
5. For production, configure SMTP settings for sending real emails

## Features

### With Supabase Enabled ✅

- **Real User Accounts**: Secure authentication with Supabase Auth
- **Persistent Cart**: Cart saved across devices and browsers
- **Order History**: All orders stored in database
- **Favorites Sync**: Wishlist synced to user account
- **Product Management**: Products stored in database (easy to update via Supabase dashboard)

### With Supabase Disabled (Fallback) 🔄

The site continues working with localStorage/sessionStorage like the original demo version.

## Testing

### Test User Registration
1. Open `compte.html`
2. Create a new account
3. Check **Authentication** > **Users** in Supabase dashboard
4. User should appear there

### Test Adding Products to Cart
1. Browse products and add to cart
2. Check **Table Editor** > **carts** in Supabase
3. Your cart items should be stored

### Test Orders
1. Complete a demo checkout
2. Check **Table Editor** > **orders** in Supabase
3. Order details should be saved

## Database Management

### View Data in Supabase Dashboard

1. Go to **Table Editor**
2. Select any table (products, orders, carts, favorites)
3. View, edit, or delete records

### Add New Products

**Option 1: Via Dashboard (Easy)**
1. Go to **Table Editor** > **products**
2. Click "Insert row"
3. Fill in the product details
4. Click "Save"

**Option 2: Via SQL**
```sql
INSERT INTO products (name, category, price, sold, photo, url)
VALUES ('New Product', 'Bague', 45.00, false, 'product.webp', 'new-product');
```

### Update Product Prices

```sql
UPDATE products
SET price = 35.00
WHERE url = 'bague-bubble';
```

### View Recent Orders

```sql
SELECT reference, total, status, created_at
FROM orders
ORDER BY created_at DESC
LIMIT 10;
```

## Security

### Row Level Security (RLS)

The schema includes RLS policies that:
- ✅ Allow everyone to read products
- ✅ Users can only access their own cart
- ✅ Users can only see their own orders
- ✅ Users can only manage their own favorites
- ✅ Users can only edit their own profile

### API Keys

- **Anon Key**: Safe to use in frontend (included in the code)
- **Service Role Key**: 🚨 NEVER expose this in frontend code (admin only)

## Troubleshooting

### "Failed to fetch products"
- Check that `SUPABASE_ENABLED = true`
- Verify your Project URL is correct
- Verify your anon key is correct
- Check browser console for errors

### "User not found after login"
- Check **Authentication** > **Users** in dashboard
- Ensure email confirmation is disabled for testing
- Check browser console for errors

### Cart not saving
- Ensure user is logged in
- Check **Table Editor** > **carts** for data
- Verify RLS policies are active (should be by default)

### Products not showing
- Run the INSERT statements from `supabase-schema.sql`
- Check **Table Editor** > **products** has data
- Verify `SUPABASE_ENABLED = true`

## Cost & Limits

Supabase **Free Tier** includes:
- 500 MB database space
- 50,000 monthly active users
- 2 GB file storage
- 5 GB bandwidth

**Perfect for:**
- Development
- Testing
- Small e-commerce sites
- Demo/prototype sites

## Migration from Local Storage

The code automatically falls back to localStorage when:
- `SUPABASE_ENABLED = false`
- Supabase is unreachable
- API keys are invalid

Users can switch between modes by changing `SUPABASE_ENABLED` in `supabase-config.js`.

## Next Steps

1. ✅ Set up email templates for password reset
2. ✅ Configure custom domain for emails
3. ✅ Add product search functionality
4. ✅ Implement order status tracking
5. ✅ Add admin dashboard for managing orders
6. ✅ Set up real payment integration (Flouci, D17, etc.)

## Support

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Discord](https://discord.supabase.com)
- [ELORA Accessories Contact](https://wa.me/21655609738)
