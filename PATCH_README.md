# Production Enhancements Patch

Apply this patch only to the uploaded `production-enhancements` branch baseline.

The homepage, global stylesheet, Three.js experience, GSAP controllers, intro and custom cursor are intentionally not included and remain unchanged.

After merging the patch, run:

```powershell
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue
npm ci
npm run verify
```

Keep these Vercel Preview values disabled:

```env
NEXT_PUBLIC_ALLOW_INDEXING=false
NEXT_PUBLIC_PRIVACY_POLICY_APPROVED=false
```

Review `docs/PRODUCTION_ENHANCEMENTS.md` before enabling indexing.
