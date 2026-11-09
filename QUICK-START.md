# ⚡ ELORA Accessories - Supabase Quick Start

## What You Have

- ✅ Complete e-commerce site for jewelry
- ✅ All HTML files updated with Supabase scripts
- ✅ Database schema ready to deploy
- ✅ Automatic localStorage fallback
- ✅ 46 products pre-configured

## 5-Minute Setup

### 1. Create Supabase Account (1 min)
→ Go to https://supabase.com
→ Sign up (free)
→ Create new project: "ELORA Accessories"
→ Choose region: EU Central
→ Set database password (save it!)

### 2. Create Database (2 min)
→ Open **SQL Editor** in Supabase dashboard
→ Click "New Query"
→ Open file: `supabase-schema.sql`
→ Copy EVERYTHING and paste
→ Click "Run" (Ctrl+Enter)
→ Should see: "Success. No rows returned"

### 3. Get API Keys (30 sec)
→ Click **Settings** (gear icon)
→ Click **API**
→ Copy these two values:
  - Project URL: `https://xxxxx.supabase.co`
  - anon public key: `eyJhbG...`

### 4. Configure Site (1 min)
→ Open: `supabase-config.js`
→ Replace:
```javascript
const SUPABASE_URL = 'YOUR_SUPABASE_URL'; // Paste URL
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY'; // Paste key
const SUPABASE_ENABLED = true; // Change to true
```
→ Save file

### 5. Test (30 sec)
→ Open `index.html` in browser
→ Click "Mon compte"
→ Create new account
→ Go back to Supabase dashboard
→ Check **Authentication** > **Users**
→ Your user should be there! ✅

## Done! 🎉

Your site now has:
- Real user authentication
- Database storage
- Persistent cart
- Order history
- Synced favorites

## Files You Need

```
✅ supabase-config.js     ← Configure this
✅ supabase-db.js         ← Already set up
✅ supabase-schema.sql    ← Copy to Supabase SQL Editor
```

## What's Next?

### For Development:
- Disable email confirmation: **Authentication** > **Settings** > Email Auth > **Confirm email** = OFF

### For Production:
- Set up SMTP for real emails
- Customize email templates
- Enable email confirmation

## Need Help?

1. Read: `SUPABASE-README.md` (complete guide)
2. Read: `SUPABASE-SETUP.md` (detailed setup)
3. Check: Browser console for errors
4. Verify: SUPABASE_URL and SUPABASE_ANON_KEY are correct

## Troubleshooting

**Products not showing?**
→ Run `supabase-schema.sql` again (includes product data)

**Can't create account?**
→ Check browser console for errors
→ Verify API keys are correct
→ Disable email confirmation for testing

**Cart not saving?**
→ Make sure you're logged in
→ Check **Table Editor** > **carts** in Supabase

**Site not working at all?**
→ Set `SUPABASE_ENABLED = false` for local mode
→ Check browser console

## Commands for Supabase

### Add a product:
```sql
INSERT INTO products (name, category, price, sold, photo, url)
VALUES ('New Ring', 'Bague', 49.00, false, 'ring.webp', 'new-ring');
```

### View orders:
```sql
SELECT reference, total, created_at 
FROM orders 
ORDER BY created_at DESC 
LIMIT 10;
```

### Update price:
```sql
UPDATE products 
SET price = 39.00 
WHERE url = 'bague-bubble';
```

## Free Tier Limits

- 500 MB database ✅
- 50,000 monthly users ✅
- Perfect for ELORA! ✅

---

**Total time: 5 minutes** ⚡
**Cost: $0/month** 💰
**Difficulty: Easy** 👍
