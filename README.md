# EmojiDrop

The emojis are falling. The most useless hover interaction out there. Very cool.

## Usage

Import the code

```
<script src="https://cdn.jsdelivr.net/gh/waveshape-co/emoji-drop@1.0.5/script.min.js"></script>
```

Init

```
const emojiDrop = new EmojiDrop({
  hoverElement: "hover-text",
  creationSpeed: 50,
  fallDistance: 100,
  fallTime: 1,
  emojiSize: 25,
  emojis: ["🤩", "😍", "🤑", "😜", "😎", "🤪", "🥳", "😘"]
});
```

## Options

### hoverElement

A class name of the element that the user is hovering to drop those emojiz.

### creationSpeed

How fast new emojis are created and dropped.

### fallDistance

How far down (in pixels) the emojis are falling.

### fallTime

The amount of time (in seconds) that the emojis are falling.

### emojiSize

The size (font size) of the unicode emojis.

### emojis

An array of unicode emojis (strings)


## Methods

## updateEmojies

Updates emojies array

```
const emojiDrop = new EmojiDrop({
  hoverElement: "hover-text",
  creationSpeed: 50,
  fallDistance: 100,
  fallTime: 1,
  emojiSize: 25,
  emojis: ["🤩", "😍", "🤑", "😜", "😎", "🤪", "🥳", "😘"]
});

emojiDrop.updateEmojies(["🤑", "😜"])

```