Original font files are placed here. Fonts in the assets dir are stripped of irrelevant glyphs to reduce file size.

Included unicode ranges are:

- 3000-303f Japanese-style punctuation
- 3040-309f Hiragana
- 30a0-30ff Katakana
- ff00-ffef Full-width roman characters and half-width katakana

Source: http://www.rikai.com/library/kanjitables/kanji_codes.unicode.shtml

## Processing

To strip glyphs, use:

```
pip install fonttools
pyftsubset INPUT_FILE --output-file=OUTPUT_FILE --unicodes=3000-303f,3040-309f,30a0-30ff,ff00-ffef
```

Google fonts have bad aligment on iOS, so they need additional processing:

`ttx STRIPPED_FONT_FILE`

Replace the following values in the hhea table (values align with iOS system fonts):

```
<ascent value="880"/>
<descent value="-120"/>
<lineGap value="500"/>
```

Convert back to font:

`ttx TTX_FILE`
