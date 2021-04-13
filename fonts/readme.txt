Original font files are placed here. Fonts in the assets dir are stripped of irrelevant glyphs to reduce file size

Included unicode ranges are:
3000-303f Japanese-style punctuation
3040-309f Hiragana
30a0-30ff Katakana
ff00-ffef Full-width roman characters and half-width katakana
Source: http://www.rikai.com/library/kanjitables/kanji_codes.unicode.shtml

To strip glyphs, use:
pip install fonttools
pyftsubset INPUT_FILE --output-file=OUTPUT_FILE --unicodes=3000-303f,3040-309f,30a0-30ff,ff00-ffef
