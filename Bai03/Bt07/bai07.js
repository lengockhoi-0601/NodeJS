
/*
====================================================
                 CAMPUS WEB
       URL PARAMETER HANDLING SYSTEM

 AUTHOR : LE NGOC KHOI
 MSSV   : CDCNTT18B16
 SUBJECT: NODE.JS - BAI THUC HANH 07
====================================================
*/

const http = require("http");

// Ham chuyen doi ky tu HTML de tranh loi hien thi
function escapeHTML(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

// Mau giao dien chung
function taoGiaoDien(tieuDe, noiDung) {
    return `
    <!DOCTYPE html>
    <html lang="vi">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${tieuDe} | CAMPUS WEB</title>

        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }

            body {
                font-family: Arial, sans-serif;
                background: #0b1424;
                color: #ffffff;
                min-height: 100vh;
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 20px;
            }

            .container {
                width: 100%;
                max-width: 520px;
                background: #14243a;
                border: 1px solid #263b55;
                border-radius: 18px;
                overflow: hidden;
                box-shadow: 0 15px 40px rgba(0,0,0,0.3);
            }

            header {
                padding: 25px;
                border-bottom: 1px solid #2b405a;
            }

            .logo {
                color: #42d6c5;
                font-size: 26px;
                font-weight: bold;
                letter-spacing: 2px;
            }

            .subtitle {
                color: #9aacc2;
                font-size: 11px;
                margin-top: 7px;
                letter-spacing: 1px;
            }

            .status {
                display: inline-block;
                margin-top: 18px;
                padding: 6px 12px;
                border-radius: 20px;
                background: #174d43;
                color: #62e5bd;
                font-size: 11px;
                font-weight: bold;
            }

            main {
                padding: 30px 25px;
            }

            .label {
                color: #42d6c5;
                font-size: 12px;
                font-weight: bold;
                letter-spacing: 1px;
                margin-bottom: 15px;
            }

            h1 {
                font-size: 27px;
                margin-bottom: 12px;
            }

            .description {
                color: #a9b8cb;
                line-height: 1.6;
                font-size: 14px;
                margin-bottom: 25px;
            }

            .result {
                background: #1d3048;
                border: 1px solid #304966;
                border-radius: 12px;
                padding: 20px;
                margin-bottom: 15px;
            }

            .result-title {
                color: #9aacc2;
                font-size: 11px;
                margin-bottom: 10px;
            }

            .result-value {
                color: #42d6c5;
                font-size: 30px;
                font-weight: bold;
                overflow-wrap: anywhere;
            }

            .calculation {
                color: #d0dbea;
                margin-top: 12px;
                font-size: 14px;
            }

            .numbers {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 12px;
                margin-bottom: 15px;
            }

            .number-box {
                background: #1d3048;
                padding: 18px;
                border-radius: 12px;
            }

            .number-box span {
                display: block;
                color: #9aacc2;
                font-size: 11px;
                margin-bottom: 8px;
            }

            .number-box strong {
                font-size: 25px;
            }

            footer {
                padding: 18px 25px;
                border-top: 1px solid #2b405a;
                color: #8fa2ba;
                font-size: 11px;
                text-align: center;
                line-height: 1.8;
            }

            @media (max-width: 400px) {
                h1 {
                    font-size: 23px;
                }
            }
        </style>
    </head>

    <body>
        <div class="container">

            <header>
                <div class="logo">CAMPUS WEB</div>
                <div class="subtitle">
                    URL PARAMETER HANDLING SYSTEM
                </div>
                <div class="status">● SERVER ONLINE</div>
            </header>

            <main>
                ${noiDung}
            </main>

            <footer>
                DEVELOPED BY LE NGOC KHOI<br>
                STUDENT ID: CDCNTT18B16
            </footer>

        </div>
    </body>
    </html>
    `;
}

// Khoi tao Web Server
const server = http.createServer((req, res) => {

    const url = new URL(req.url, `http://${req.headers.host}`);
    const duongDan = url.pathname;
    const thamSo = url.searchParams;

    res.setHeader("Content-Type", "text/html; charset=utf-8");

    // Chuc nang Hello
    if (duongDan === "/hello") {

        const name = thamSo.get("name");

        if (name === null || !name.trim()) {
            res.statusCode = 400;

            const noiDung = `
                <div class="label">HELLO SERVICE</div>
                <h1>Thieu thong tin!</h1>
                <p class="description">
                    Vui long cung cap tham so name tren URL.
                </p>
                <div class="result">
                    <div class="result-title">VI DU</div>
                    <div class="result-value">?name=Minh</div>
                </div>
            `;

            return res.end(taoGiaoDien("Thieu tham so", noiDung));
        }

        const noiDung = `
            <div class="label">HELLO SERVICE</div>
            <h1>Xin chào ${escapeHTML(name.trim())}!</h1>
            <p class="description">
                Rất vui được gặp bạn. Yêu cầu của bạn
                đã được xử lý thành công.
            </p>

            <div class="result">
                <div class="result-title">THAM SO NAME</div>
                <div class="result-value">${escapeHTML(name.trim())}</div>
            </div>
        `;

        res.statusCode = 200;
        return res.end(taoGiaoDien("Hello", noiDung));
    }

    // Chuc nang Sum
    if (duongDan === "/sum") {

        const a = thamSo.get("a");
        const b = thamSo.get("b");

        if (a === null || b === null ||
            a.trim() === "" || b.trim() === "") {

            res.statusCode = 400;

            const noiDung = `
                <div class="label">SUM CALCULATOR</div>
                <h1>Thieu tham so!</h1>
                <p class="description">
                    Vui long nhap day du hai gia tri a va b.
                </p>
                <div class="result">
                    <div class="result-title">VI DU</div>
                    <div class="result-value">?a=10&b=20</div>
                </div>
            `;

            return res.end(taoGiaoDien("Thieu tham so", noiDung));
        }

        const soA = Number(a);
        const soB = Number(b);

        if (!Number.isFinite(soA) || !Number.isFinite(soB)) {

            res.statusCode = 400;

            const noiDung = `
                <div class="label">SUM CALCULATOR</div>
                <h1>Du lieu khong hop le!</h1>
                <p class="description">
                    Hai tham so a va b phai la gia tri so.
                </p>
            `;

            return res.end(taoGiaoDien("Du lieu loi", noiDung));
        }

        const tong = soA + soB;

        const noiDung = `
            <div class="label">SUM CALCULATOR</div>
            <h1>Ket qua phep tinh</h1>
            <p class="description">
                He thong da tinh tong hai so thanh cong.
            </p>

            <div class="numbers">
                <div class="number-box">
                    <span>GIA TRI A</span>
                    <strong>${soA}</strong>
                </div>

                <div class="number-box">
                    <span>GIA TRI B</span>
                    <strong>${soB}</strong>
                </div>
            </div>

            <div class="result">
                <div class="result-title">TONG KET QUA</div>
                <div class="result-value">${tong}</div>
                <div class="calculation">
                    ${soA} + ${soB} = ${tong}
                </div>
            </div>
        `;

        res.statusCode = 200;
        return res.end(taoGiaoDien("Sum Calculator", noiDung));
    }

    // Duong dan khong ton tai
    res.statusCode = 404;

    const noiDung = `
        <div class="label">ERROR 404</div>
        <h1>Khong tim thay trang!</h1>
        <p class="description">
            Duong dan ban truy cap khong ton tai
            trong he thong CAMPUS WEB.
        </p>
    `;

    res.end(taoGiaoDien("Page Not Found", noiDung));
});

// Khoi dong Server
const PORT = 3001;

server.listen(PORT, () => {
    console.log("==============================================");
    console.log("                 CAMPUS WEB");
    console.log("       URL PARAMETER HANDLING SYSTEM");
    console.log("==============================================");
    console.log("  AUTHOR : LE NGOC KHOI");
    console.log("  MSSV   : CDCNTT18B16");
    console.log("----------------------------------------------");
    console.log(`  SERVER : http://localhost:${PORT}`);
    console.log("  STATUS : SERVER ONLINE");
    console.log("----------------------------------------------");
    console.log("  HELLO : /hello?name=Minh");
    console.log("  SUM   : /sum?a=10&b=20");
    console.log("==============================================");
});
