const DEFAULT_EMOJIS = ["🤩", "😍", "🤑", "😜", "😎", "🤪", "🥳", "😘"];


class EmojiDrop {
  constructor({
    hoverElement,
    creationSpeed = 50,
    fallDistance = 100,
    fallTime = 1,
    emojiSize = 25,
    emojis = [...DEFAULT_EMOJIS],
  }) {
    if (!hoverElement) {
      throw new Error("A hoverable element (class) is required");
    }

    this.hoverElement = document.querySelector(`.${hoverElement}`);
    this.creationSpeed = creationSpeed;
    this.fallDistance = fallDistance;
    this.fallTime = fallTime;
    this.emojiSize = emojiSize;
    this.emojis = emojis;
    this.createEmojiStyles();
    this.init();
  }

  init() {
    this.hoverElement.addEventListener(
      "mousemove",
      this.throttle(this.createEmoji, this.creationSpeed)
    );
  }

  createEmoji = (e) => {
    const randomEmoji = Math.floor(Math.random() * this.emojis.length);
    const emoji = document.createElement("span");

    emoji.className = "emoji";
    emoji.innerText = this.emojis[randomEmoji];

    const offsetX = this.emojiSize - this.emojiSize / 2;
    const offsetY = this.emojiSize - this.emojiSize / 2;

    const top = e.clientY + window.scrollY - offsetY;
    const left = e.clientX + window.scrollX - offsetX;

    emoji.style.top = `${top}px`;
    emoji.style.left = `${left}px`;

    this.hoverElement.appendChild(emoji);

    setTimeout(() => {
      emoji.remove();
    }, 1000);
  };

  createEmojiStyles() {
    const emojiClass = `
    .emoji {
      position: absolute;
      top: -50px;
      left: 0;
      font-size: ${this.emojiSize}px;
      animation: emojiDrop ${this.fallTime}s ease-in-out infinite;
      pointer-events: none;
    }`;

    const emojiAnimation = `
    @keyframes emojiDrop {
      0% {
        transform: translateY(0px);
        opacity: 1;
      }

      50% {
        opacity: 0;
      }

      100% {
        transform: translateY(${this.fallDistance}px);
        opacity: 0;
      }
    }`;

    const style = document.createElement("style");
    style.innerHTML = `${emojiAnimation} ${emojiClass}`;
    document.head.appendChild(style);
  }

  throttle(func, delay) {
    let lastCall = 0;

    return function (...args) {
      const now = new Date().getTime();
      if (now - lastCall < delay) {
        return;
      }

      lastCall = now;
      return func.apply(this, args);
    };
  }

  updateEmojies(emojis = [...DEFAULT_EMOJIS]) {
    this.emojis = emojis;
  }
}
