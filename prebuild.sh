#!/usr/bin/env bash
# prebuild.sh - Run all prebuild stages before `npm run build`.
#
# Usage:
#   ./prebuild.sh          # run all stages
#   ./prebuild.sh mods     # run only the mods fetch
#
# This script is called automatically by `npm run prebuild`.
# Each stage fetches data from external sources and writes JSON
# to src/data/. The JSON is committed to the repo so builds
# don't depend on external servers.
#
# To add a new prebuild stage:
#   1. Create tools/fetch_<name>.py (or .sh)
#   2. Have it write to src/data/<name>.json
#   3. Add a case block below
#   4. The stage will be called on next prebuild.sh run

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
STAGE="${1:-all}"

run_stage() {
  local name="$1"
  local script="$2"
  echo "▶ prebuild: $name"
  if [ ! -f "$SCRIPT_DIR/$script" ]; then
    echo "  ⚠ $script not found, skipping"
    return 0
  fi
  python3 "$SCRIPT_DIR/$script"
}

echo "=== prebuild.sh: running stages ==="

if [ "$STAGE" = "all" ] || [ "$STAGE" = "mods" ]; then
  run_stage "mods" "tools/fetch_mods.py"
fi

# Add new stages here:
# if [ "$STAGE" = "all" ] || [ "$STAGE" = "releases" ]; then
#   run_stage "releases" "tools/fetch_releases.py"
# fi

echo "=== prebuild.sh: done ==="
