let textarea = document.querySelector("textarea");
let speechBtn = document.querySelector("button");
let voiceList = document.querySelector("select");

let synth = speechSynthesis;
let isSpeaking = true;

voices()

function voices() {
    for (let voice of synth.getVoices()) {
        let selected = voice.name === "Google US English" ? "selected" : "";
        let option = `<option value="${voice.name}" ${selected}>${voice.name} (${voice.lang})</option>`;
        voiceList.insertAdjacentHTML("beforeend", option)

    }
}

synth.addEventListener("voiceschanged", voices)

function textToSpeech(text) {
    let say = new SpeechSynthesisUtterance(text);
    for (let voice of synth.getVoices()) {
        if (voice.name === voiceList.value) {
            say.voice = voice;
        }
    }
    speechSynthesis.speak(say)
}


speechBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (textarea.value !== "") {
        if (!synth.speaking) {
            textToSpeech(textarea.value);
        }
        if (textarea.value.length > 80) {
            if (isSpeaking) {
                synth.resume();
                isSpeaking=false;
                speechBtn.innerText="Pause Speech"
            }else{
                synth.pause();
                isSpeaking=true;
                speechBtn.innerText="Resume Speech"
            }

            setInterval(()=>{
                if(!synth.speaking && !isSpeaking){
                    isSpeaking=true;
                    speechBtn.innerText="Convert to Speech"
                }
            });
        }else{
            speechBtn.innerText="Convert to Speech"
        }
    }
})