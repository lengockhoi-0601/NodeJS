
/*
====================================================
 PROJECT : CAMPUS GRADE
 MODULE  : Xu ly ket qua hoc tap
 AUTHOR  : LE NGOC KHOI
 MSSV    : CDCNTT18B16
====================================================
*/

// Tinh diem trung binh cua 3 mon hoc
function tinhDiemTrungBinh(danhSachDiem) {
    if (!Array.isArray(danhSachDiem) || danhSachDiem.length !== 3) {
        throw new Error("Phai cung cap dung 3 mon hoc!");
    }

    const hopLe = danhSachDiem.every(diem =>
        typeof diem === "number" &&
        Number.isFinite(diem) &&
        diem >= 0 &&
        diem <= 10
    );

    if (!hopLe) {
        throw new Error("Diem phai nam trong khoang tu 0 den 10!");
    }

    const tongDiem = danhSachDiem.reduce(
        (tong, diem) => tong + diem, 0
    );

    return Number((tongDiem / 3).toFixed(2));
}

// Xep loai hoc tap
function xepLoaiHocTap(diemTB) {
    if (typeof diemTB !== "number" ||
        !Number.isFinite(diemTB) ||
        diemTB < 0 || diemTB > 10) {
        throw new Error("Diem trung binh khong hop le!");
    }

    if (diemTB >= 8) {
        return "Gioi";
    }

    if (diemTB >= 6.5) {
        return "Kha";
    }

    if (diemTB >= 5) {
        return "Trung binh";
    }

    return "Yeu";
}

// Xuat cac ham de bai06.js su dung
module.exports = {
    tinhDiemTrungBinh,
    xepLoaiHocTap
};
