function shortenURL() {
    const longURL = document.getElementById("long-url").value.trim();
    const alias = document.getElementById("alias").value.trim();

const toggle=document.getElementById("theme-toggle");
toggle.onclick=()=>{
    document.body.classList.toggle("dark");
    localStorage.setItem("theme",document.body.classList.contains("dark")?"dark":"light");
};
if(localStorage.getItem("theme")==="dark"){
    document.body.classList.add("dark");
}


    if (!longURL) {
        alert("Please enter a valid URL");
        return;
    }

    let urlObj;
    try {
        urlObj = new URL(longURL);
    } catch (e) {
        alert("Invalid URL format");
        return;
    }

    const words = [
        "sunrise", "meadow", "river", "forest", "crystal", "silver",
        "ember", "horizon", "breeze", "harbor", "willow", "canyon",
        "summit", "harvest", "voyage", "echo", "maple", "cedar"
    ];

    const randomWord = words[Math.floor(Math.random() * words.length)];

    let shortURL = `https://${randomWord}.com`;
    if (alias) {
        shortURL += `/${alias}`;
    }

    document.getElementById("result").innerHTML = `
        <p><strong>Original URL:</strong><br>${longURL}</p>
        <p><strong>Short URL:</strong><br>
        <a href="${longURL}" target="_blank">${shortURL}</a></p>

        <button class="btn-secondary" onclick="copyToClipboard('${shortURL}')">Copy</button>
        <button class="btn-secondary" onclick="downloadURL('${shortURL}')">Download URL</button>
        <button class="btn-secondary" onclick="printURL('${shortURL}')">Print URL</button>
    `;

    document.getElementById("qr-code").innerHTML = "";
    new QRCode(document.getElementById("qr-code"), shortURL);

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

    document.getElementById("long-url").value = "";
    document.getElementById("alias").value = "";
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text);
    alert("Copied!");
}

function downloadURL(shortURL) {
    const blob = new Blob([shortURL], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "short-url.txt";
    link.click();
}

function printURL(shortURL) {
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`<h2>Short URL</h2><p>${shortURL}</p>`);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
}

function downloadQR() {
    const canvas = document.querySelector("#qr-code canvas");
    if (!canvas) return;
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "qr-code.png";
    link.click();
}

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

