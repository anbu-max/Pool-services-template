$files = Get-ChildItem -Path "." -Recurse -Include "*.html" | Select-Object -ExpandProperty FullName

foreach ($file in $files) {
    if ($file -match '\.html$') {
        $content = Get-Content $file -Raw -Encoding UTF8

        # Replace inline styles for badges and icons to use the orange color
        $content = $content -replace "color:var\(--color-secondary\)", "color:var(--color-accent-warm)"
        $content = $content -replace "color: var\(--color-secondary\)", "color: var(--color-accent-warm)"

        Set-Content $file -Value $content -Encoding UTF8 -NoNewline
        Write-Host "Updated colors in: $file"
    }
}
Write-Host "Done."
