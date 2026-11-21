
/*
============================================================
                 CAMPUS GRADE
          STUDENT SCORE MANAGEMENT SYSTEM

 AUTHOR : LE NGOC KHOI
 MSSV   : CDCNTT18B16
 SUBJECT: NODE.JS - BAI THUC HANH 06
============================================================
*/

const {
    tinhDiemTrungBinh,
    xepLoaiHocTap
} = require("./xulyDiem");

// Bang mau Terminal
const mau = {
    reset: "\x1b[0m",
    dam: "\x1b[1m",
    cyan: "\x1b[36m",
    xanh: "\x1b[32m",
    vang: "\x1b[33m",
    do: "\x1b[31m",
    trang: "\x1b[37m"
};

// Du lieu sinh vien
const danhSachSinhVien = [
    {
        maSV: "SV001",
        hoTen: "Nguyen Minh Anh",
        diem: [8.5, 9.0, 8.0]
    },
    {
        maSV: "SV002",
        hoTen: "Tran Gia Bao",
        diem: [7.0, 6.5, 7.5]
    },
    {
        maSV: "SV003",
        hoTen: "Le Phuong Linh",
        diem: [5.0, 5.5, 5.0]
    }
];

// Hien thi tieu de
function hienThiTieuDe() {
    console.clear();

    console.log(mau.cyan + mau.dam);
    console.log("==========================================================");
    console.log("                    CAMPUS GRADE");
    console.log("          STUDENT SCORE MANAGEMENT SYSTEM");
    console.log("==========================================================" + mau.reset);

    console.log(mau.vang + "  TAC GIA : LE NGOC KHOI" + mau.reset);
    console.log(mau.vang + "  MSSV    : CDCNTT18B16" + mau.reset);
    console.log(mau.vang + "  MON HOC : LAP TRINH NODE.JS" + mau.reset);

    console.log(mau.cyan + "----------------------------------------------------------" + mau.reset);
    console.log(mau.trang + "  HE THONG QUAN LY VA DANH GIA KET QUA HOC TAP" + mau.reset);
    console.log(mau.cyan + "----------------------------------------------------------" + mau.reset);
}

// Chon mau theo xep loai
function layMauXepLoai(xepLoai) {
    switch (xepLoai) {
        case "Gioi":
            return mau.xanh;
        case "Kha":
            return mau.cyan;
        case "Trung binh":
            return mau.vang;
        default:
            return mau.do;
    }
}

// Hien thi bang diem
function hienThiBangDiem() {
    console.log("\n" + mau.dam + "  BANG KET QUA HOC TAP" + mau.reset);

    console.log(mau.cyan + "----------------------------------------------------------" + mau.reset);
    console.log(
        " STT  MA SV    HO VA TEN             DIEM TB     XEP LOAI"
    );
    console.log(mau.cyan + "----------------------------------------------------------" + mau.reset);

    const ketQua = [];

    danhSachSinhVien.forEach((sinhVien, index) => {
        try {
            const diemTB = tinhDiemTrungBinh(sinhVien.diem);
            const xepLoai = xepLoaiHocTap(diemTB);

            ketQua.push({
                ...sinhVien,
                diemTB,
                xepLoai
            });

            const stt = String(index + 1).padEnd(5);
            const ma = sinhVien.maSV.padEnd(9);
            const ten = sinhVien.hoTen.padEnd(22);
            const diem = diemTB.toFixed(2).padEnd(12);

            console.log(
                ` ${stt}${ma}${ten}${diem}` +
                `${layMauXepLoai(xepLoai)}${xepLoai}${mau.reset}`
            );

        } catch (error) {
            console.log(mau.do + `Loi du lieu ${sinhVien.maSV}: ${error.message}` + mau.reset);
        }
    });

    console.log(mau.cyan + "----------------------------------------------------------" + mau.reset);

    return ketQua;
}

// Thong ke ket qua hoc tap
function thongKeKetQua(danhSach) {
    const thongKe = {
        Gioi: 0,
        Kha: 0,
        "Trung binh": 0,
        Yeu: 0
    };

    danhSach.forEach(sv => {
        thongKe[sv.xepLoai]++;
    });

    const tongDiem = danhSach.reduce(
        (tong, sv) => tong + sv.diemTB, 0
    );

    const diemTrungBinhLop = danhSach.length > 0
        ? (tongDiem / danhSach.length).toFixed(2)
        : "0.00";

    console.log("\n" + mau.dam + "  THONG KE HOC TAP" + mau.reset);
    console.log(mau.cyan + "----------------------------------------------------------" + mau.reset);

    console.log(`  Tong so sinh vien : ${danhSach.length}`);
    console.log(mau.xanh + `  Xep loai Gioi     : ${thongKe.Gioi}` + mau.reset);
    console.log(mau.cyan + `  Xep loai Kha      : ${thongKe.Kha}` + mau.reset);
    console.log(mau.vang + `  Xep loai Trung binh: ${thongKe["Trung binh"]}` + mau.reset);
    console.log(mau.do + `  Xep loai Yeu      : ${thongKe.Yeu}` + mau.reset);

    console.log(mau.cyan + "----------------------------------------------------------" + mau.reset);
    console.log(mau.dam + `  DIEM TRUNG BINH CHUNG: ${diemTrungBinhLop}` + mau.reset);

    // Tim sinh vien co diem cao nhat
    if (danhSach.length > 0) {
        const sinhVienCaoNhat = danhSach.reduce(
            (max, sv) => sv.diemTB > max.diemTB ? sv : max
        );

        console.log(
            mau.xanh +
            `  SINH VIEN DUNG DAU: ${sinhVienCaoNhat.hoTen} (${sinhVienCaoNhat.diemTB})` +
            mau.reset
        );
    }
}

// Chuong trinh chinh
function khoiDongHeThong() {
    hienThiTieuDe();

    const ketQua = hienThiBangDiem();

    thongKeKetQua(ketQua);

    console.log("\n" + mau.cyan + mau.dam);
    console.log("==========================================================");
    console.log("          CAMPUS GRADE - SYSTEM COMPLETED");
    console.log("          DEVELOPED BY LE NGOC KHOI");
    console.log("==========================================================" + mau.reset);
    console.log();
}

khoiDongHeThong();
