"""
Espanol-Course — Google TTS Audio Generator
============================================
Generates MP3 audio files for all vocabulary and example sentences
using Google Cloud Text-to-Speech with the es-MX Neural2 voice.

Setup (one time):
  1. Create a Google Cloud account at console.cloud.google.com
  2. Enable the Text-to-Speech API
  3. Create a service account key (JSON) and save as:
     tools/service-account-key.json
  4. Install dependencies:
     pip install google-cloud-texttospeech

Usage:
  python generate-audio.py --level A1 --unit unit-01-greetings
  python generate-audio.py --level A1  (generates all A1 units)
  python generate-audio.py --all       (generates entire course)

Version: 0.1.0
"""

import json
import os
import argparse
from pathlib import Path

# Google TTS voice configuration
VOICE_CONFIG = {
    "language_code": "es-MX",
    "name": "es-MX-Neural2-A",  # Female voice — change to es-MX-Neural2-B for male
    "ssml_gender": "FEMALE"
}

AUDIO_CONFIG = {
    "audio_encoding": "MP3",
    "speaking_rate": 0.9,   # Slightly slower than normal for learners
    "pitch": 0.0,
    "volume_gain_db": 0.0,
}

REPO_ROOT = Path(__file__).parent.parent
CONTENT_DIR = REPO_ROOT / "content"
AUDIO_DIR = REPO_ROOT / "assets" / "audio"


def generate_audio_for_text(client, text, output_path):
    """Generate a single MP3 file from text."""
    from google.cloud import texttospeech

    synthesis_input = texttospeech.SynthesisInput(text=text)
    voice = texttospeech.VoiceSelectionParams(**VOICE_CONFIG)
    audio_config = texttospeech.AudioConfig(**AUDIO_CONFIG)

    response = client.synthesize_speech(
        input=synthesis_input,
        voice=voice,
        audio_config=audio_config
    )

    output_path.parent.mkdir(parents=True, exist_ok=True)
    with open(output_path, "wb") as f:
        f.write(response.audio_content)

    print(f"  ✓ {output_path.relative_to(REPO_ROOT)}")


def process_unit(client, level, unit_folder):
    """Generate audio for all vocab in a unit."""
    vocab_file = CONTENT_DIR / level / unit_folder / "vocab.json"
    if not vocab_file.exists():
        print(f"  ⚠ No vocab.json found in {level}/{unit_folder}")
        return

    with open(vocab_file) as f:
        vocab = json.load(f)

    print(f"\n📁 {level}/{unit_folder} — {len(vocab)} words")

    for item in vocab:
        # Generate audio for the word itself
        word_path = AUDIO_DIR / level.lower() / unit_folder / f"{item['id'].lower()}-word.mp3"
        if not word_path.exists():
            generate_audio_for_text(client, item["word"], word_path)
        else:
            print(f"  → Skipping {item['word']} (already exists)")

        # Generate audio for the example sentence
        example_path = AUDIO_DIR / level.lower() / unit_folder / f"{item['id'].lower()}-example.mp3"
        if not example_path.exists():
            generate_audio_for_text(client, item["example_sentence"], example_path)

    print(f"  ✅ Done — {len(vocab)} words processed")


def main():
    parser = argparse.ArgumentParser(description="Generate TTS audio for Espanol-Course")
    parser.add_argument("--level", help="Level to generate (e.g. A1)")
    parser.add_argument("--unit", help="Specific unit folder (e.g. unit-01-greetings)")
    parser.add_argument("--all", action="store_true", help="Generate entire course")
    args = parser.parse_args()

    # Check for credentials
    creds_path = Path(__file__).parent / "service-account-key.json"
    if not creds_path.exists():
        print("❌ Error: service-account-key.json not found in /tools/")
        print("   See setup instructions at the top of this file.")
        return

    os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = str(creds_path)

    try:
        from google.cloud import texttospeech
        client = texttospeech.TextToSpeechClient()
    except ImportError:
        print("❌ Error: google-cloud-texttospeech not installed.")
        print("   Run: pip install google-cloud-texttospeech")
        return

    print("🎙  Espanol-Course Audio Generator")
    print(f"    Voice: {VOICE_CONFIG['name']} ({VOICE_CONFIG['language_code']})")
    print(f"    Output: {AUDIO_DIR.relative_to(REPO_ROOT)}/")

    if args.all:
        for level_dir in sorted(CONTENT_DIR.iterdir()):
            if level_dir.is_dir() and level_dir.name in ["A1","A2","B1","B2","C1"]:
                for unit_dir in sorted(level_dir.iterdir()):
                    if unit_dir.is_dir():
                        process_unit(client, level_dir.name, unit_dir.name)
    elif args.level and args.unit:
        process_unit(client, args.level.upper(), args.unit)
    elif args.level:
        level_dir = CONTENT_DIR / args.level.upper()
        for unit_dir in sorted(level_dir.iterdir()):
            if unit_dir.is_dir():
                process_unit(client, args.level.upper(), unit_dir.name)
    else:
        parser.print_help()

    print("\n✅ Audio generation complete.")


if __name__ == "__main__":
    main()
