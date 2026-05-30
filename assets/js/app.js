function shortenURL() {
    const longURL = document.getElementById("long-url").value.trim();
    const alias = document.getElementById("alias").value.trim();

    if (!longURL) {
        alert("Please enter a valid URL");
        return;
    }

    // Validate URL
    let urlObj;
    try {
        urlObj = new URL(longURL);
    } catch (e) {
        alert("Invalid URL format");
        return;
    }

    // Random English word list
    const words = [
        "sunrise", "meadow", "river", "forest", "crystal", "silver",
        "ember", "horizon", "breeze", "harbor", "willow", "canyon",
        "summit", "harvest", "voyage", "echo", "maple", "cedar"
    ];

    const randomWord = words[Math.floor(Math.random() * words.length)];

    // Build new shortened domain
    let shortURL = `https://${randomWord}.com`;
    if (alias) {
        shortURL += `/${alias}`;
    }

    // Display results
    document.getElementById("result").innerHTML = `
        <p><strong>Original URL:</strong><br>${longURL}</p>
        <p><strong>Short URL:</strong><br>
        <a href="${longURL}" target="_blank">${shortURL}</a></p>

        <button class="btn-secondary" onclick="copyToClipboard('${shortURL}')">Copy</button>
        <button class="btn-secondary" onclick="downloadURL('${shortURL}')">Download URL</button>
        <button class="btn-secondary" onclick="printURL('${shortURL}')">Print URL</button>
    `;

    // Generate QR code
    document.getElementById("qr-code").innerHTML = "";
    new QRCode(document.getElementById("qr-code"), shortURL);

    // Add QR download + print buttons
    setTimeout(() => {
        const qrCanvas = document.querySelector("#qr-code canvas");
        if (qrCanvas) {
            document.getElementById("qr-code").innerHTML += `
                <br>
                <button class="btn-secondary" onclick="downloadQR()">Download QR</button>
                <button class="btn-secondary" onclick="printQR()">Print QR</button>
            `;
        }
    }, 300);

    // Clear input fields
    document.getElementById("long-url").value = "";
    document.getElementById("alias").value = "";
}

/* COPY */
function copyToClipboard(text) {
    navigator.clipboard.writeText(text);
    alert("Copied!");
}

/* DOWNLOAD URL AS TEXT FILE */
function downloadURL(shortURL) {
    const blob = new Blob([shortURL], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "short-url.txt";
    link.click();
}

/* PRINT URL */
function printURL(shortURL) {
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`<h2>Short URL</h2><p>${shortURL}</p>`);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
}

/* DOWNLOAD QR CODE AS PNG */
function downloadQR() {
    const canvas = document.querySelector("#qr-code canvas");
    if (!canvas) return;
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "qr-code.png";
    link.click();
}

/* PRINT QR CODE */
function printQR() {
    const canvas = document.querySelector("#qr-code canvas");
    if (!canvas) return;
    const imgData = canvas.toDataURL("image/png");

    const printWindow = window.open("", "_blank");
    printWindow.document.write(`<img src="${imgData}" style="width:250px;">`);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
}
