function copyToClipboard(button) {
    var input = button.parentElement.previousElementSibling;
    input.select();
    document.execCommand("copy");
    showCopiedMessage();
}

function showCopiedMessage() {
    var message = document.getElementById("copyalertz");
    message.style.display = "block";
    setTimeout(function() {
        message.style.display = "none";
    }, 2000);
}