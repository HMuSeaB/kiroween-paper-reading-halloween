#!/usr/bin/env bash
# Repo check for paper-reading-halloween. Dependency-free.
# Exit non-zero on the first failure; print what failed.
set -u
cd "$(dirname "$0")/.." || exit 1

fail() { echo "FAIL: $1" >&2; exit 1; }

# 1. JS syntax
command -v node >/dev/null 2>&1 || fail "node not found (needed for JS syntax check)"
node --check app.js || fail "app.js has a syntax error"

# 2. No placeholder images anywhere in the app source
if grep -rnEi 'placehold\.co|via\.placeholder|picsum\.photos|placeholder\.com' index.html styles.css app.js >/dev/null 2>&1; then
  fail "placeholder image reference found (use a link card instead)"
fi

# 3. .kiro must exist at the repo root (Devpost judging requirement)
[ -d .kiro ] || fail ".kiro/ directory missing at repo root"
[ -f .kiro/specs/paper-reading-halloween/requirements.md ] || fail "spec requirements.md missing"
[ -f .kiro/specs/paper-reading-halloween/design.md ] || fail "spec design.md missing"
[ -f .kiro/specs/paper-reading-halloween/tasks.md ] || fail "spec tasks.md missing"
[ -f .kiro/steering/product.md ] || fail "steering product.md missing"
[ -f .kiro/hooks/format-on-save.json ] || fail "hook format-on-save.json missing"

# 4. Deliverables exist
for f in index.html styles.css app.js README.md LICENSE; do
  [ -f "$f" ] || fail "missing file: $f"
done

# 5. Five highlight classes defined in CSS; the five types listed in JS
# (app.js builds 'hl-' + type at render time, so check the type list)
for c in hl-argument hl-concept hl-evidence hl-concession hl-method; do
  grep -q "\.$c" styles.css || fail "highlight class .$c missing from styles.css"
done
for t in argument concept evidence concession method; do
  grep -q "'$t'" app.js || fail "highlight type '$t' missing from app.js HIGHLIGHT_TYPES"
done

# 6. index.html references the local CSS and JS (no CDN app code)
grep -q 'href="styles.css"' index.html || fail "index.html does not link styles.css"
grep -q 'src="app.js"' index.html || fail "index.html does not load app.js"

echo "OK: all checks passed"
