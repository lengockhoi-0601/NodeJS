const { MongoClient } = require('mongodb');

// Địa chỉ kết nối MongoDB trên máy
const uri = 'mongodb://127.0.0.1:27017';

// Tạo đối tượng kết nối
const client = new MongoClient(uri);

async function main() {
    try {
        // Kết nối MongoDB
        await client.connect();
        console.log('Ket noi MongoDB thanh cong!');

        // Chọn database và collection
        const db = client.db('qlsinhvien');
        const students = db.collection('students');

        // Thêm ít nhất 3 sinh viên
        const danhSachSinhVien = [
            {
                masv: 'CDCNTT18B16',
                hoten: 'Lê Ngọc Khôi',
                tuoi: 20,
                diem: 8.5
            },
            {
                masv: 'CDCNTT18B18',
                hoten: 'Nguyễn Anh Kiệt',
                tuoi: 19,
                diem: 7.5
            },
            {
                masv: 'CDCNTT18B20',
                hoten: 'Nguyễn Thành Danh',
                tuoi: 21,
                diem: 9
            }
        ];

        const ketQua = await students.insertMany(danhSachSinhVien);
        console.log(`Da them ${ketQua.insertedCount} sinh vien!`);

        // Hiển thị danh sách sinh viên
        const danhSach = await students.find().toArray();

        console.log('\n===== DANH SACH SINH VIEN =====');
        console.log(danhSach);

    } catch (error) {
        console.error('Loi:', error);
    } finally {
        // Đóng kết nối
        await client.close();
        console.log('\nDa dong ket noi MongoDB!');
    }
}

main();