function shortenURL() {
    const longURL = document.getElementById("long-url").value;
    const alias = document.getElementById("alias").value.trim();

    let shortURL;

    if (alias) {
        shortURL = window.location.origin + "/" + alias;
    } else {
        const random = Math.random().toString(36).substring(2, 8);
        shortURL = window.location.origin + "/" + random;
    }

    document.getElementById("result").innerHTML = `
        <p><strong>Short URL:</strong> 
        <a href="${longURL}" target="_blank">${shortURL}</a></p>
        <button class="btn-secondary" onclick="copyToClipboard('${shortURL}')">Copy</button>
    `;

    document.getElementById("qr-code").innerHTML = "";
    new QRCode(document.getElementById("qr-code"), shortURL);
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text);
    alert("Copied!");
}
