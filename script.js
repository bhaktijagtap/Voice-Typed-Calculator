if ('webkitSpeechRecognition' in window) {
   
    const inputField = document.getElementById('input-field');
    const speakButton = document.getElementById('speak-button');
    const resultField = document.getElementById('result');
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalMessage = document.getElementById('modal-message');
    const closeModalButton = document.getElementById('close-modal');

    speakButton.addEventListener('click', () => {
        recognition = new webkitSpeechRecognition() || new SpeechRecognition();
        recognition.lang = "en-US";
        recognition.maxResults = 10;
        recognition.onresult = event => {
            const speechResult = event.results[0][0].transcript;
            inputField.value = speechResult;
            evaluateExpression(speechResult);
        };
        recognition.start();
    });

    function evaluateExpression(expression) {
        try {
            const result = eval(expression);
            resultField.innerText = `Result: ${result}`;
            showModal('Success', `The result is: ${result}`);
        } catch (error) {
            showModal('Error', 'Invalid mathematical expression');
        }
    }

    function showModal(title, message) {
        modal.style.display = 'block';
        modalTitle.innerText = title;
        modalMessage.innerText = message;
    }

    closeModalButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', event => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
    }
 else {
    console.log("webkitSpeechRecognition is not supported.");
}
