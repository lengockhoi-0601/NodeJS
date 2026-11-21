
/*
====================================================
                  CAMPUS LINK
       STUDENT & DEPARTMENT CONNECTION SYSTEM

 AUTHOR : LE NGOC KHOI
 MSSV   : CDCNTT18B16
 SUBJECT: NODE.JS - LAB 10
====================================================
*/

const { MongoClient } = require("mongodb");

// Ket noi MongoDB
const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);

// Thong tin database
const databaseName = "qlsinhvien";

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

// Hien thi tieu de
function hienThiTieuDe() {
    console.log(mau.cyan + mau.dam);
    console.log("==================================================");
    console.log("                  CAMPUS LINK");
    console.log("       STUDENT & DEPARTMENT CONNECTION SYSTEM");
    console.log("==================================================" + mau.reset);

    console.log(mau.vang + " AUTHOR : LE NGOC KHOI" + mau.reset);
    console.log(mau.vang + " MSSV   : CDCNTT18B16" + mau.reset);
    console.log(mau.vang + " SUBJECT: NODE.JS - LAB 10" + mau.reset);
    console.log(mau.cyan + "--------------------------------------------------" + mau.reset);
}

// Ham chinh
async function lienKetDuLieu() {
    try {
        hienThiTieuDe();

        // Buoc 1: Ket noi database
        await client.connect();

        const db = client.db(databaseName);

        const departments = db.collection("departments");
        const students = db.collection("students_join");

        console.log(mau.xanh + "\n[SUCCESS] Ket noi MongoDB thanh cong!" + mau.reset);
        console.log("Database: " + databaseName);

        // Buoc 2: Tao du lieu khoa
        const danhSachKhoa = [
            { makhoa: "CNTT", tenkhoa: "Cong nghe thong tin" },
            { makhoa: "QTKD", tenkhoa: "Quan tri kinh doanh" }
        ];

        // Buoc 3: Tao du lieu sinh vien
        const danhSachSinhVien = [
            { masv: "SV001", hoten: "Le Ngoc Khoi", makhoa: "CNTT" },
            { masv: "SV002", hoten: "Nguyen Van An", makhoa: "CNTT" },
            { masv: "SV003", hoten: "Tran Thi Binh", makhoa: "QTKD" },
            { masv: "SV004", hoten: "Pham Van Cuong", makhoa: "QTKD" }
        ];

        // Lam sach du lieu cu de tranh trung lap khi chay lai
        await departments.deleteMany({});
        await students.deleteMany({});

        // Them du lieu vao hai collection
        await departments.insertMany(danhSachKhoa);
        await students.insertMany(danhSachSinhVien);

        console.log(mau.xanh + "\n[SUCCESS] Da tao 2 khoa!" + mau.reset);
        console.log(mau.xanh + "[SUCCESS] Da them 4 sinh vien!" + mau.reset);

        // Buoc 4: Lien ket hai collection bang aggregate va $lookup
        const ketQua = await students.aggregate([
            {
                $lookup: {
                    from: "departments",
                    localField: "makhoa",
                    foreignField: "makhoa",
                    as: "thongTinKhoa"
                }
            },
            {
                $unwind: "$thongTinKhoa"
            },
            {
                $project: {
                    _id: 0,
                    masv: 1,
                    hoten: 1,
                    makhoa: 1,
                    tenkhoa: "$thongTinKhoa.tenkhoa"
                }
            }
        ]).toArray();

        // Buoc 5: Hien thi ket qua
        console.log(mau.cyan + mau.dam + "\n==================================================" + mau.reset);
        console.log(mau.cyan + mau.dam + "       DANH SACH SINH VIEN VA TEN KHOA" + mau.reset);
        console.log(mau.cyan + "==================================================" + mau.reset);

        console.table(ketQua.map(sv => ({
            "Ma SV": sv.masv,
            "Ho ten": sv.hoten,
            "Ma khoa": sv.makhoa,
            "Ten khoa": sv.tenkhoa
        })));

        console.log(mau.xanh + "\n[SUCCESS] Lien ket hai collection thanh cong!" + mau.reset);
        console.log("Tong so sinh vien hien thi: " + ketQua.length);

        // Hoan tat
        console.log(mau.cyan + mau.dam);
        console.log("\n==================================================");
        console.log("          CAMPUS LINK - COMPLETED");
        console.log("          DEVELOPED BY LE NGOC KHOI");
        console.log("==================================================" + mau.reset);

    } catch (error) {
        console.log(mau.do + "\n[ERROR] " + error.message + mau.reset);
    } finally {
        await client.close();
    }
}

// Khoi dong chuong trinh
lienKetDuLieu();
