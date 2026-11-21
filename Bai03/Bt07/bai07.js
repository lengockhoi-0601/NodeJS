
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

// Khoi tao Web Server
const server = http.createServer((req, res) => {

    // Phan tich URL
    const url = new URL(req.url, `http://${req.headers.host}`);

    const duongDan = url.pathname;
    const thamSo = url.searchParams;

    // Cau hinh phan hoi
    res.setHeader("Content-Type", "text/plain; charset=utf-8");

    // Xu ly duong dan /hello
    if (duongDan === "/hello") {

        const name = thamSo.get("name");

        if (!name || !name.trim()) {
            res.statusCode = 400;
            return res.end("Loi: Vui long cung cap tham so name!");
        }

        res.statusCode = 200;
        return res.end(`Xin chao ${name.trim()}`);
    }

    // Xu ly duong dan /sum
    if (duongDan === "/sum") {

        const a = thamSo.get("a");
        const b = thamSo.get("b");

        if (a === null || b === null || a.trim() === "" || b.trim() === "") {
            res.statusCode = 400;
            return res.end("Loi: Vui long cung cap day du hai tham so a va b!");
        }

        const soA = Number(a);
        const soB = Number(b);

        if (!Number.isFinite(soA) || !Number.isFinite(soB)) {
            res.statusCode = 400;
            return res.end("Loi: a va b phai la gia tri so hop le!");
        }

        const tong = soA + soB;

        res.statusCode = 200;
        return res.end(`Tong = ${tong}`);
    }

    // Xu ly duong dan khong ton tai
    res.statusCode = 404;
    res.end("Loi 404: Khong tim thay duong dan!");

});

// Khoi dong Server tai cong 3001
const PORT = 3001;

server.listen(PORT, () => {
    console.log("==============================================");
    console.log("               CAMPUS WEB");
    console.log("       URL PARAMETER HANDLING SYSTEM");
    console.log("==============================================");
    console.log("  AUTHOR : LE NGOC KHOI");
    console.log("  MSSV   : CDCNTT18B16");
    console.log("----------------------------------------------");
    console.log(`  Web Server dang chay tai: http://localhost:${PORT}`);
    console.log("----------------------------------------------");
    console.log("  Thu nghiem:");
    console.log(`  http://localhost:${PORT}/hello?name=Minh`);
    console.log(`  http://localhost:${PORT}/sum?a=10&b=20`);
    console.log("==============================================");
});
