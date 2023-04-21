class EmojiDrop {
  constructor(
    hoverElement,
    emojiCreationSpeed = 50,
    emojiFallDistance = 100,
    emojiFallTime = 1,
    emojiArray = ["🤩", "😍", "🤑", "😜", "😎", "🤪", "🥳", "😘"]
  ) {
    if (!hoverElement) {
      throw new Error("A hoverable element (class) is required");
    }

    this.hoverElement = document.querySelector(`.${hoverElement}`);
    this.emojiCreationSpeed = emojiCreationSpeed;
    this.emojiFallDistance = emojiFallDistance;
    this.emojiFallTime = emojiFallTime;
    this.emojiArray = emojiArray;
    this.createEmojiStyles();
    this.init();
  }

  init() {
    this.hoverElement.addEventListener(
      "mousemove",
      this.throttle(this.createEmoji, this.emojiCreationSpeed)
    );
  }

  createEmoji = (e) => {
    const randomEmoji = Math.floor(Math.random() * this.emojiArray.length);
    const emoji = document.createElement("span");

    emoji.className = "emoji";
    emoji.innerText = this.emojiArray[randomEmoji];

    const containerRect = this.hoverElement.getBoundingClientRect();
    const offsetX = containerRect.width / 4;
    const offsetY = containerRect.height / 2;

    emoji.style.top = `${e.clientY - offsetY}px`;
    emoji.style.left = `${e.clientX - offsetX}px`;
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
      font-size: 24px;
      animation: emojiDrop ${this.emojiFallTime}s ease-in-out infinite;
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
        transform: translateY(${this.emojiFallDistance}px);
        opacity: 0;
      }
    }`;

    const css = window.document.styleSheets[0];
    css.insertRule(emojiAnimation, css.cssRules.length);
    css.insertRule(emojiClass, css.cssRules.length);
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
}
