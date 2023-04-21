class EmojiDrop {
  constructor({
    hoverElement,
    creationSpeed = 50,
    fallDistance = 100,
    fallTime = 1,
    emojiSize = 25,
    emojis = ["🤩", "😍", "🤑", "😜", "😎", "🤪", "🥳", "😘"],
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

    // const css = window.document.styleSheets[0];
    // css.insertRule(emojiAnimation, css.cssRules.length);
    // css.insertRule(emojiClass, css.cssRules.length);

    const style = document.createElement("style");
    style.type = "text/css";
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
}
