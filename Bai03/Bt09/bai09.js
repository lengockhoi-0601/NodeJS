
/*
====================================================
                   CAMPUS DB
          STUDENT DATABASE MANAGEMENT

 AUTHOR : LE NGOC KHOI
 MSSV   : CDCNTT18B16
 SUBJECT: NODE.JS - LAB 09
====================================================
*/

const { MongoClient } = require("mongodb");

// Ket noi MongoDB
const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);

// Thong tin database
const databaseName = "qlsinhvien";
const collectionName = "students_test";

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
    console.log("                    CAMPUS DB");
    console.log("          STUDENT DATABASE MANAGEMENT");
    console.log("==================================================" + mau.reset);

    console.log(mau.vang + " AUTHOR : LE NGOC KHOI" + mau.reset);
    console.log(mau.vang + " MSSV   : CDCNTT18B16" + mau.reset);
    console.log(mau.vang + " SUBJECT: NODE.JS - LAB 09" + mau.reset);
    console.log(mau.cyan + "--------------------------------------------------" + mau.reset);
}

// Ham chinh
async function quanLySinhVien() {
    try {
        hienThiTieuDe();

        // Buoc 1: Ket noi database
        await client.connect();

        const db = client.db(databaseName);
        const students = db.collection(collectionName);

        console.log(mau.xanh + "\n[SUCCESS] Ket noi MongoDB thanh cong!" + mau.reset);
        console.log("Database: " + databaseName);
        console.log("Collection: " + collectionName);

        // Buoc 2: Lam sach du lieu cu de chay lai ket qua nhat quan
        await students.deleteMany({});

        // Buoc 3: Them 5 sinh vien mau
        const danhSachSinhVien = [
            { masv: "SV001", hoten: "Lê Ngọc Khôi", tuoi: 19, diem: 8.5 },
            { masv: "SV002", hoten: "Tran Thi Binh", tuoi: 20, diem: 4.5 },
            { masv: "SV003", hoten: "Le Van Cuong", tuoi: 19, diem: 6.8 },
            { masv: "SV004", hoten: "Pham Thi Dung", tuoi: 21, diem: 3.9 },
            { masv: "SV005", hoten: "Nguyễn Anh Kiệt", tuoi: 20, diem: 7.2 }
        ];

        const ketQuaThem = await students.insertMany(danhSachSinhVien);

        console.log(mau.xanh + "\n[SUCCESS] Da them " +
            ketQuaThem.insertedCount + " sinh vien mau!" + mau.reset);

        // Buoc 4: Xoa mot sinh vien theo ma SV003
        const ketQuaXoaMot = await students.deleteOne({
            masv: "SV003"
        });

        console.log(mau.vang + "\n[DELETE ONE] Xoa sinh vien SV003" + mau.reset);
        console.log("So ban ghi da xoa: " + ketQuaXoaMot.deletedCount);

        // Buoc 5: Xoa sinh vien co diem duoi 5
        const ketQuaXoaNhieu = await students.deleteMany({
            diem: { $lt: 5 }
        });

        console.log(mau.vang + "\n[DELETE MANY] Xoa sinh vien co diem duoi 5" + mau.reset);
        console.log("So ban ghi da xoa: " + ketQuaXoaNhieu.deletedCount);

        // Buoc 6: Hien thi danh sach sinh vien con lai
        const danhSachConLai = await students.find({}).toArray();

        console.log(mau.cyan + mau.dam + "\n==================================================" + mau.reset);
        console.log(mau.cyan + mau.dam + "          DANH SACH SINH VIEN CON LAI" + mau.reset);
        console.log(mau.cyan + "==================================================" + mau.reset);

        if (danhSachConLai.length > 0) {
            console.table(danhSachConLai.map(sv => ({
                "Ma SV": sv.masv,
                "Ho ten": sv.hoten,
                "Tuoi": sv.tuoi,
                "Diem": sv.diem
            })));
        } else {
            console.log("Khong con sinh vien nao!");
        }

        console.log(mau.xanh + "\n[SUCCESS] Da hien thi danh sach thanh cong!" + mau.reset);
        console.log("Tong so sinh vien con lai: " + danhSachConLai.length);

        // Hoan tat
        console.log(mau.cyan + mau.dam);
        console.log("\n==================================================");
        console.log("           CAMPUS DB - COMPLETED");
        console.log("           DEVELOPED BY LE NGOC KHOI");
        console.log("==================================================" + mau.reset);

    } catch (error) {
        console.log(mau.do + "\n[ERROR] " + error.message + mau.reset);
    } finally {
        await client.close();
    }
}

// Khoi dong chuong trinh
quanLySinhVien();
