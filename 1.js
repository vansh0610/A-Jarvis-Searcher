// Check for browser compatibility
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true;
recognition.lang = 'en-US';

const output = document.getElementById('output');

recognition.addEventListener('result', (e) => {
    const transcript = Array.from(e.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');

    output.textContent = transcript;

    if (e.results[0].isFinal) {
        handleCommand(transcript);
    }
});

recognition.addEventListener('end', recognition.start);

function startListening() {
    recognition.start();
}

function handleCommand(command) {
    command = command.toLowerCase();

    if (command.includes('hello')) {
        speak('Hello! How can I assist you today?');
    } else if (command.includes('what time is it')) {
        const now = new Date();
        speak(`The current time is ${now.getHours()}:${now.getMinutes()}`);
    } else if (command.includes('what is your name')) {
        speak('My name is Jarvis, your personal assistant.');
    } else if (command.includes('open google')) {
        speak('Opening Google');
        window.open('https://www.google.com', '_blank');}
        else if (command.includes('open youtube')) {
            speak('Opening youtube');
            window.open('https://www.youtube.com', '_blank');
    } 
    else if (command.includes('open instagram')) {
        speak('Opening instagram');
        window.open('https://www.instagram.com/?hl=en', '_blank');
} 
else if (command.includes('open whatsapp')) {
    speak('Opening whatsapp');
    window.open('https://web.whatsapp.com/', '_blank');
} 

else {
        speak('Sorry, I did not understand that command.');
    }
}

function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
}
