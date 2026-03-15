"""
Espanol-Course — Content Validator
====================================
Validates all content files against the required schema.
Run before committing new content to catch errors early.

Usage:
  python validate-content.py               (validate all content)
  python validate-content.py --level A1    (validate one level)

Version: 0.1.0
"""

import json
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).parent.parent
CONTENT_DIR = REPO_ROOT / "content"

REQUIRED_META_FIELDS = ["id", "title", "level", "unit", "slug", "estimated_minutes", "status"]
REQUIRED_VOCAB_FIELDS = ["id", "word", "translation", "example_sentence"]
REQUIRED_EXERCISE_FIELDS = ["id", "type", "prompt", "answer"]
REQUIRED_QUIZ_FIELDS = ["id", "passing_score", "questions"]

VALID_EXERCISE_TYPES = [
    "multiple_choice", "fill_in_blank", "translation",
    "sentence_assembly", "error_correction", "listening", "matching"
]

errors = []
warnings = []


def error(path, msg):
    errors.append(f"❌ {path}: {msg}")


def warn(path, msg):
    warnings.append(f"⚠️  {path}: {msg}")


def validate_json(filepath):
    try:
        with open(filepath) as f:
            return json.load(f)
    except json.JSONDecodeError as e:
        error(filepath.relative_to(REPO_ROOT), f"Invalid JSON — {e}")
        return None


def validate_meta(filepath):
    data = validate_json(filepath)
    if not data: return
    for field in REQUIRED_META_FIELDS:
        if field not in data:
            error(filepath.relative_to(REPO_ROOT), f"Missing required field: {field}")
    if data.get("estimated_minutes", 0) <= 0:
        warn(filepath.relative_to(REPO_ROOT), "estimated_minutes should be > 0")


def validate_vocab(filepath):
    data = validate_json(filepath)
    if not data: return
    if not isinstance(data, list):
        error(filepath.relative_to(REPO_ROOT), "vocab.json must be an array")
        return
    if len(data) < 5:
        warn(filepath.relative_to(REPO_ROOT), f"Only {len(data)} vocab items — aim for 10+")
    for i, item in enumerate(data):
        for field in REQUIRED_VOCAB_FIELDS:
            if field not in item:
                error(filepath.relative_to(REPO_ROOT), f"Item {i}: missing field '{field}'")


def validate_exercises(filepath):
    data = validate_json(filepath)
    if not data: return
    if not isinstance(data, list):
        error(filepath.relative_to(REPO_ROOT), "exercises.json must be an array")
        return
    if len(data) < 5:
        warn(filepath.relative_to(REPO_ROOT), f"Only {len(data)} exercises — aim for 8+")
    for i, item in enumerate(data):
        for field in REQUIRED_EXERCISE_FIELDS:
            if field not in item:
                error(filepath.relative_to(REPO_ROOT), f"Exercise {i}: missing field '{field}'")
        if item.get("type") not in VALID_EXERCISE_TYPES:
            error(filepath.relative_to(REPO_ROOT), f"Exercise {i}: invalid type '{item.get('type')}'")
        if item.get("type") == "multiple_choice" and "options" not in item:
            error(filepath.relative_to(REPO_ROOT), f"Exercise {i}: multiple_choice missing 'options'")


def validate_quiz(filepath):
    data = validate_json(filepath)
    if not data: return
    for field in REQUIRED_QUIZ_FIELDS:
        if field not in data:
            error(filepath.relative_to(REPO_ROOT), f"Missing required field: {field}")
    questions = data.get("questions", [])
    if len(questions) < 5:
        warn(filepath.relative_to(REPO_ROOT), f"Only {len(questions)} questions — aim for 8+")
    passing = data.get("passing_score", 0)
    if passing < 60 or passing > 90:
        warn(filepath.relative_to(REPO_ROOT), f"passing_score {passing} — typical range is 70-80")


def validate_unit(unit_dir):
    required_files = ["meta.json", "vocab.json", "exercises.json", "quiz.json", "lesson.md"]
    for filename in required_files:
        filepath = unit_dir / filename
        if not filepath.exists():
            warn(unit_dir.relative_to(REPO_ROOT), f"Missing {filename}")
            continue
        if filename == "meta.json":
            validate_meta(filepath)
        elif filename == "vocab.json":
            validate_vocab(filepath)
        elif filename == "exercises.json":
            validate_exercises(filepath)
        elif filename == "quiz.json":
            validate_quiz(filepath)
        elif filename == "lesson.md":
            content = filepath.read_text(encoding="utf-8")
            if len(content) < 200:
                warn(filepath.relative_to(REPO_ROOT), "lesson.md is very short — may be a placeholder")


def main():
    import argparse
    parser = argparse.ArgumentParser(description="Validate Espanol-Course content")
    parser.add_argument("--level", help="Validate a specific level (e.g. A1)")
    args = parser.parse_args()

    print("🔍 Espanol-Course Content Validator\n")

    levels_to_check = ["A1","A2","B1","B2","C1"]
    if args.level:
        levels_to_check = [args.level.upper()]

    total_units = 0
    for level in levels_to_check:
        level_dir = CONTENT_DIR / level
        if not level_dir.exists():
            continue
        for unit_dir in sorted(level_dir.iterdir()):
            if unit_dir.is_dir() and not unit_dir.name.startswith("."):
                validate_unit(unit_dir)
                total_units += 1

    print(f"Checked {total_units} unit(s)\n")

    if warnings:
        print("Warnings:")
        for w in warnings:
            print(f"  {w}")
        print()

    if errors:
        print("Errors:")
        for e in errors:
            print(f"  {e}")
        print(f"\n{len(errors)} error(s) found — please fix before committing.")
        sys.exit(1)
    else:
        print(f"✅ All content valid! {len(warnings)} warning(s).")


if __name__ == "__main__":
    main()
