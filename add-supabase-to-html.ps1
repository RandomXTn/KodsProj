# PowerShell script to add Supabase scripts to all HTML files

$supabaseScripts = @"
<!-- Supabase Integration -->
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script src="supabase-config.js"></script>
<script src="supabase-db.js"></script>
"@

$htmlFiles = @(
    "checkout.html",
    "panier.html",
    "produits.html",
    "produit.html",
    "categorie.html",
    "verification.html",
    "confirmation.html",
    "wishlist.html",
    "contact.html",
    "a-propos.html"
)

foreach ($file in $htmlFiles) {
    $filePath = Join-Path $PSScriptRoot $file
    
    if (Test-Path $filePath) {
        Write-Host "Processing $file..." -ForegroundColor Cyan
        
        $content = Get-Content $filePath -Raw
        
        # Check if Supabase scripts already exist
        if ($content -match "supabase-config.js") {
            Write-Host "  ✓ Already has Supabase scripts" -ForegroundColor Green
            continue
        }
        
        # Add Supabase scripts before </head> (handles minified HTML)
        if ($content -match "<\/head>") {
            $newContent = $content -replace "<\/head>", "$supabaseScripts</head>"
            Set-Content -Path $filePath -Value $newContent -NoNewline -Encoding UTF8
            Write-Host "  ✓ Added Supabase scripts" -ForegroundColor Green
        } else {
            Write-Host "  ✗ No </head> tag found" -ForegroundColor Red
        }
    } else {
        Write-Host "  ✗ File not found: $file" -ForegroundColor Red
    }
}

Write-Host "`nDone! All HTML files have been updated with Supabase integration." -ForegroundColor Green
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Create a Supabase project at https://supabase.com" -ForegroundColor White
Write-Host "2. Run the SQL schema from supabase-schema.sql" -ForegroundColor White
Write-Host "3. Update supabase-config.js with your credentials" -ForegroundColor White
Write-Host "4. Set SUPABASE_ENABLED = true" -ForegroundColor White
