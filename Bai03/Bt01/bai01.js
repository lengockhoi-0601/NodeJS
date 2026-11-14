
// Khai báo class SinhVien
class SinhVien {
    constructor(ma, hoTen, tuoi, diem) {
        this.ma = ma;
        this.hoTen = hoTen;
        this.tuoi = tuoi;
        this.diem = diem;
    }
}

// Khởi tạo danh sách 5 sinh viên
const danhSachSinhVien = [
    new SinhVien("SV01", "Nguyen Van An", 18, 8.5),
    new SinhVien("SV02", "Tran Thi Binh", 19, 4.5),
    new SinhVien("SV03", "Le Van Cuong", 20, 7.0),
    new SinhVien("SV04", "Pham Thi Dung", 18, 3.5),
    new SinhVien("SV05", "Hoang Van Em", 21, 6.5)
];

// Sử dụng arrow function để lọc sinh viên có điểm từ 5 trở lên
const sinhVienDat = danhSachSinhVien.filter(
    (sv) => sv.diem >= 5
);

// Hiển thị danh sách sinh viên đạt yêu cầu
console.log("DANH SACH SINH VIEN DAT YEU CAU:");

sinhVienDat.forEach((sv) => {
    console.log(
        `Ma: ${sv.ma} | Ho ten: ${sv.hoTen} | Tuoi: ${sv.tuoi} | Diem: ${sv.diem}`
    );
});
