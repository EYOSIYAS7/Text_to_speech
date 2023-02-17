const inputEl = document.getElementById("text");
const pitch = document.getElementById("Pitch");
const rateval = document.getElementById("rate-value");
const rate = document.getElementById("rate");
const pitchval = document.getElementById("Pitch-value");
const voives = document.getElementById("voices");
const btnEl = document.getElementById("btn");
const stopbtn = document.getElementById("btnstop");
const pausebtn = document.getElementById("pause");
const bodyEl = document.getElementById("body");
const synth = window.speechSynthesis;
const containerEl = document.getElementById("container");
const container = document.getElementById("why");

window.addEventListener("DOMContentLoaded", () => {
  getvoice();
  rateval.textContent = rate.value;
});
let voices = [];

const getvoice = () => {
  const synth = window.speechSynthesis;

  voices = synth.getVoices();

  voices.forEach((voice) => {
    const option = document.createElement("option");

    option.textContent = voice.name + " " + voice.lang;

    option.setAttribute("voicename", voice.name);

    voives.appendChild(option);
  });
};

const speaker = () => {
  if (synth.speaking) {
    bodyEl.style.background =
      "#141414  url(ef51995562988dfe9d9171a9d9cf0e55.gif)";
    bodyEl.style.backgroundRepeat = "no-repeat";
    bodyEl.style.backgroundPosition = "center";
    bodyEl.style.backgroundSize = "70%";
    const div = document.createElement("div");
    div.className = `alert alert-info rounded-2`;
    div.appendChild(
      document.createTextNode("already speaking or it is paused ")
    );

    container.insertBefore(div, inputEl);

    setTimeout(() => {
      document.querySelector(".alert").remove();
    }, 3000);
  }
  if (inputEl != "") {
    let gonnaspeak = new SpeechSynthesisUtterance(inputEl.value);

    gonnaspeak.onend = () => {
      console.log("onend");
      bodyEl.style.background = "#141414";
    };
    gonnaspeak.onerror = () => {
      console.error("there is an error");
    };

    const selectedvoice = voives.selectedOptions[0].getAttribute("voicename");

    voices.forEach((voice) => {
      if (voice.name === selectedvoice) {
        gonnaspeak.voice = voice;
      }
    });
    gonnaspeak.rate = rateval.textContent;
    gonnaspeak.pitch = pitchval.textContent;
    synth.speak(gonnaspeak);
    console.log(gonnaspeak.voice);
  }
};
btnEl.addEventListener("click", () => {
  speaker();
  bg();
});
rate.addEventListener("change", () => {
  rateval.textContent = rate.value;
});

pitch.addEventListener("change", () => {
  pitchval.textContent = pitch.value;
});
window.addEventListener("load", () => {
  pitchval.textContent = pitch.value;
});
voives.addEventListener("change", () => {
  speaker();
  synth.resume();
  bg();
});

function bg(params) {
  if (inputEl.value === "") {
    bodyEl.style.background = "#141414  url()";
  } else {
    bodyEl.style.background =
      "#141414  url(ef51995562988dfe9d9171a9d9cf0e55.gif)";
    bodyEl.style.backgroundRepeat = "no-repeat";
    bodyEl.style.backgroundPosition = "center";
    bodyEl.style.backgroundSize = "70%";
  }
}
stopbtn.addEventListener("click", () => {
  stop();
});
pausebtn.addEventListener("click", () => {
  synth.pause();
  bodyEl.style.background = "#141414";
  if (pausebtn.innerHTML === "pause") {
    pausebtn.innerHTML = "resume";
  }
  pausebtn.id = "resume";
  let resumebtn = document.querySelector("#resume");
  console.log("pause clicked");
  resumebtn.addEventListener("dblclick", () => {
    synth.resume();
    bodyEl.style.background =
      "#141414  url(ef51995562988dfe9d9171a9d9cf0e55.gif)";
    bodyEl.style.backgroundRepeat = "no-repeat";
    bodyEl.style.backgroundPosition = "center";
    bodyEl.style.backgroundSize = "70%";

    pausebtn.innerHTML = "pause";
    console.log("resume clicked");
  });
});
function stop() {
  synth.cancel();
  pausebtn.innerHTML = "pause";
}
