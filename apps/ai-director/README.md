# AnUIme AI Director

An isolated Vercel Eve 0.26.1 prototype that can only inspect the AnUIme catalog, inspect approved character systems, propose a bounded recipe, and validate it. It intentionally requires Node 24 independently of the main application.

Production browser traffic is not accepted directly. The main AnUIme server must authenticate users, rate-limit requests, proxy sessions, and retain continuation tokens server-side. The deterministic Component Lab remains fully usable when this service is absent.

```sh
npm install
npm run info
npm run build
npm run eval
```
