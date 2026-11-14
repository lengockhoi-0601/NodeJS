
const fs = require('fs');

const hoTen = "Lê Ngọc Khôi";
const maSinhVien = "CDCNTT18B16";
const tenLop = "CDCNTT18B";

const noiDung = `Ho ten: ${hoTen}\nMa sinh vien: ${maSinhVien}\n`;

// Tạo file và ghi thông tin sinh viên
fs.writeFile('thongtin.txt', noiDung, (err) => {
    if (err) throw err;

    console.log("Da tao file thongtin.txt");

    // Đọc nội dung ban đầu
    fs.readFile('thongtin.txt', 'utf8', (err, data) => {
        if (err) throw err;

        console.log("\n=== NOI DUNG BAN DAU ===");
        console.log(data);

        // Ghi nối thêm tên lớp
        fs.appendFile('thongtin.txt', `Ten lop: ${tenLop}\n`, (err) => {
            if (err) throw err;

            console.log("Da ghi them ten lop vao file");

            // Đọc lại file sau cập nhật
            fs.readFile('thongtin.txt', 'utf8', (err, data) => {
                if (err) throw err;

                console.log("\n=== NOI DUNG SAU CAP NHAT ===");
                console.log(data);
            });
        });
    });
});
