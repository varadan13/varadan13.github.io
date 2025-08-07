const textChunks = (text) => {
  const $text = text;
  const chunks = [];

  let i = 0;

  while (i < $text.length) {
    let end = i + 300;

    // to not break words while creating chunks
    if (end < $text.length && $text[end] !== " ") {
      while (end > i && $text[end] !== " ") {
        end--;
      }
    }

    // because of above code
    if (end === i) end = i + 300;

    chunks.push($text.slice(i, end).trim());

    i = end;
  }

  return chunks;
};

function VoicePlayer(text, title) {
  this.title = title;
  this.text = textChunks(text);
  this.audio = {};
  this.isPlaying = false;
  this.isPlayed = false;

  this.oninit = function () {
    const synth = window.speechSynthesis;

    const loadVoices = () =>
      new Promise((res) => {
        synth.cancel();
        console.log(synth);
        let voices;

        function handleChange() {
          voices = synth.getVoices();
          res(voices);
        }
        if ("onvoiceschanged" in synth) {
          synth.onvoiceschanged = handleChange();
        } else {
          handleChange();
        }
      });

    const nameOfVoice = "Google UK English Female";

    async function playArticle(text) {
      const voices = await loadVoices();

      text.forEach((ele) => {
        if (voices.length !== 0) {
          const utterance = new SpeechSynthesisUtterance(ele);

          utterance.voice = voices.find((ele) => ele.name === nameOfVoice);

          try {
            synth?.speak?.(utterance);
          } catch (error) {
            throw new Error(error);
          }
        } else {
          throw new Error("No voices available to speak!");
        }
      });
    }

    this.audio.play = async () => {
      this.isPlaying = true;

      m.redraw();
      if (!this.isPlayed) {
        await playArticle(this.text);
        this.isPlayed = true;
      } else {
        synth?.resume?.();
      }
    };

    this.audio.pause = () => {
      this.isPlaying = false;
      synth?.pause?.();
      m.redraw();
    };
  };

  this.view = function () {
    return m(
      "div",
      { style: "display:flex;align-items:center;font-size:1.2rem;" },
      [
        m(
          "button",
          {
            onclick: async () => {
              this.isPlaying ? this.audio.pause() : this.audio.play();
            },
            style: "",
          },
          this.isPlaying ? "Pause" : "Play"
        ),
        m("p", { style: "margin-left:1rem;" }, this.title),
      ]
    );
  };
}

class VoicePlayerElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.$text = "";
    this.$title = "";
  }

  connectedCallback() {
    this.$text = this.getAttribute("text") || "";
    this.$title = this.getAttribute("title") || "Voice Player";

    m.mount(this.shadowRoot, new VoicePlayer(this.$text, this.$title));
  }

  disconnectedCallback() {
    m.mount(this.shadowRoot, null);
  }
}

customElements.define("voice-player", VoicePlayerElement);
