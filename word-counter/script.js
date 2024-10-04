function countWords() {
    let text = document.getElementById('words').value;

    // Character count
    document.getElementById('charCount').textContent = text.length;

    // Word count
    let words = text.split(/\s+/).filter(function (word) {
        return word.length > 0;
    });
    document.getElementById('wordCount').textContent = words.length;

    // Sentence count (assumes sentences end with '.', '!', or '?')
    let sentences = text.split(/[.!?]+/).filter(function (sentence) {
        return sentence.length > 0;
    });
    document.getElementById('sentenceCount').textContent = sentences.length;

    // Paragraph count (assumes paragraphs are separated by two line breaks)
    let paragraphs = text.split(/\n\s*\n/).filter(function (paragraph) {
        return paragraph.length > 0;
    });
    document.getElementById('paragraphCount').textContent = paragraphs.length;
}

function pasteText() {
    let textarea = document.getElementById('words');
    navigator.clipboard.readText()
        .then((clipboardText) => {
            textarea.value += clipboardText;
            countWords(); // Recalculate counts after pasting
        })
        .catch((error) => {
            console.error('Error reading from clipboard:', error);
        });
}

function copyText() {
    let textarea = document.getElementById('words');
    textarea.select();
    document.execCommand('copy');
    alert('Text copied to clipboard!');
}

function clearText() {
    document.getElementById('words').value = '';
    countWords(); // Recalculate counts after clearing the text
}