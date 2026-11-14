
const { MongoClient } = require('mongodb');

// Dia chi ket noi MongoDB
const uri = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(uri);

async function main() {
    try {
        // Ket noi MongoDB
        await client.connect();
        console.log('Ket noi MongoDB thanh cong!');

        // Chon database va collection
        const db = client.db('qlsinhvien');
        const students = db.collection('students');

        // 1. Tim sinh vien co diem >= 7
        // 2. Sap xep diem giam dan
        const danhSach = await students
            .find({ diem: { $gte: 7 } })
            .sort({ diem: -1 })
            .toArray();

        console.log('\n===== SINH VIEN CO DIEM >= 7 =====');
        console.log(danhSach);

        // 3. Cap nhat diem sinh vien theo masv
        const ketQua = await students.updateOne(
            { masv: 'CDCNTT18B16' },
            { $set: { diem: 9.5 } }
        );

        if (ketQua.matchedCount > 0) {
            console.log('\nCap nhat diem thanh cong!');
        } else {
            console.log('\nKhong tim thay sinh vien can cap nhat!');
        }

        // 4. Hien thi thong tin sau cap nhat
        const sinhVienSauCapNhat = await students.findOne({
            masv: 'CDCNTT18B16'
        });

        console.log('\n===== THONG TIN SAU CAP NHAT =====');
        console.log(sinhVienSauCapNhat);

    } catch (error) {
        console.error('Loi:', error);
    } finally {
        await client.close();
        console.log('\nDa dong ket noi MongoDB!');
    }
}

main();
