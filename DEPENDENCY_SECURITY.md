# Dependency Security Note

## Current framework baseline

- Next.js `16.2.12`
- React and React DOM `19.2.4`
- Sharp `0.35.3`

## Targeted overrides

`package.json` contains an override limited to Next.js `16.2.12`:

```json
{
  "overrides": {
    "next@16.2.12": {
      "postcss": "8.5.25",
      "sharp": "0.35.3"
    }
  }
}
```

This is intended to remediate the previously observed vulnerable nested PostCSS and Sharp versions without downgrading Next.js.

## Important rules

- Do not run `npm audit fix --force`.
- Do not downgrade Next.js to satisfy npm's automatic audit suggestion.
- Re-run `npm audit --omit=dev`, lint, type checking and the production build after every dependency change.
- Verify the Next image optimizer after changing Sharp.
- Remove the overrides after a supported Next.js release officially adopts compatible patched versions.

Development-only ESLint dependency advisories may remain until compatible upstream releases become available. They should still be tracked and reviewed.

## Development install integrity

The full audit can currently report ESLint-only `minimatch` / `brace-expansion` advisories while `npm audit --omit=dev` remains clean. Do not use `npm audit fix --force` to chase those findings. It may replace major tooling versions and can leave an inconsistent incremental `node_modules` tree.

If a development package reports a missing internal file, delete `node_modules` and `package-lock.json`, verify the npm cache, and perform a clean `npm install`.
