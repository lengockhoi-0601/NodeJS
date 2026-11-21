
/*
====================================================
                 CAMPUS FILE
            FILE MANAGEMENT SYSTEM

 AUTHOR : LE NGOC KHOI
 MSSV   : CDCNTT18B16
 SUBJECT: NODE.JS - BAI THUC HANH 08
====================================================
*/

const fs = require("fs");
const path = require("path");

// Mau sac Terminal
const mau = {
    reset: "\x1b[0m",
    dam: "\x1b[1m",
    cyan: "\x1b[36m",
    xanh: "\x1b[32m",
    vang: "\x1b[33m",
    do: "\x1b[31m",
    trang: "\x1b[37m"
};

// Duong dan thu muc va tap tin
const thuMucData = path.join(__dirname, "data");
const fileGhiChu = path.join(thuMucData, "ghichu.txt");
const fileMoi = path.join(thuMucData, "ghichu_moi.txt");
const fileTam = path.join(thuMucData, "tam.txt");

// Hien thi tieu de
function hienThiTieuDe() {
    console.log(mau.cyan + mau.dam);
    console.log("==================================================");
    console.log("                  CAMPUS FILE");
    console.log("             FILE MANAGEMENT SYSTEM");
    console.log("==================================================" + mau.reset);

    console.log(mau.vang + "  AUTHOR : LE NGOC KHOI" + mau.reset);
    console.log(mau.vang + "  MSSV   : CDCNTT18B16" + mau.reset);
    console.log(mau.vang + "  SUBJECT: NODE.JS - LAB 08" + mau.reset);

    console.log(mau.cyan + "--------------------------------------------------" + mau.reset);
}

// Ham chinh xu ly tap tin
async function quanLyTapTin() {
    try {
        hienThiTieuDe();

        // Buoc 1: Tao thu muc data
        await fs.promises.mkdir(thuMucData, { recursive: true });

        console.log(mau.xanh + "[SUCCESS] Da tao thu muc data!" + mau.reset);

        // Buoc 2: Ghi noi dung vao ghichu.txt
        const noiDung = [
            "CAMPUS FILE - HE THONG QUAN LY TAP TIN",
            "Sinh vien: Le Ngoc Khoi - CDCNTT18B16",
            "Bai thuc hanh 08: Lam viec voi module File System",
            "Node.js ho tro tao, ghi, doc, doi ten va xoa tap tin."
        ].join("\n");

        await fs.promises.writeFile(fileGhiChu, noiDung, "utf8");

        console.log(mau.xanh + "[SUCCESS] Da tao va ghi noi dung vao ghichu.txt!" + mau.reset);

        // Buoc 3: Don file cu neu da ton tai
        try {
            await fs.promises.unlink(fileMoi);
        } catch (error) {
            if (error.code !== "ENOENT") throw error;
        }

        // Buoc 4: Doi ten tap tin
        await fs.promises.rename(fileGhiChu, fileMoi);

        console.log(mau.xanh + "[SUCCESS] Da doi ten ghichu.txt thanh ghichu_moi.txt!" + mau.reset);

        // Buoc 5: Doc noi dung sau khi doi ten
        const noiDungDoc = await fs.promises.readFile(fileMoi, "utf8");

        console.log("\n" + mau.cyan + mau.dam + "  NOI DUNG FILE GHICHU_MOI.TXT" + mau.reset);
        console.log(mau.cyan + "--------------------------------------------------" + mau.reset);
        console.log(mau.trang + noiDungDoc + mau.reset);
        console.log(mau.cyan + "--------------------------------------------------" + mau.reset);

        console.log(mau.xanh + "[SUCCESS] Da doc noi dung tap tin thanh cong!" + mau.reset);

        // Buoc 6: Tao tap tin tam.txt
        await fs.promises.writeFile(
            fileTam,
            "Day la tap tin tam duoc tao boi CAMPUS FILE.",
            "utf8"
        );

        console.log(mau.xanh + "[SUCCESS] Da tao tap tin tam.txt!" + mau.reset);

        // Buoc 7: Xoa tap tin tam.txt
        await fs.promises.unlink(fileTam);

        console.log(mau.xanh + "[SUCCESS] Da xoa tap tin tam.txt bang fs.unlink()!" + mau.reset);

        // Hoan tat
        console.log("\n" + mau.cyan + mau.dam);
        console.log("==================================================");
        console.log("          CAMPUS FILE - COMPLETED");
        console.log("          DEVELOPED BY LE NGOC KHOI");
        console.log("==================================================" + mau.reset);

    } catch (error) {
        console.log(mau.do + "\n[ERROR] " + error.message + mau.reset);
    }
}

// Khoi dong chuong trinh
quanLyTapTin();
