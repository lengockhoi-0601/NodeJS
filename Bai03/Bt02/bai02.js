
const http = require('http');

// Thông tin sinh viên
const maSinhVien = "CDCNTT18B16";
const hoTen = "Lê Ngọc Khôi";

// Tạo Web Server
const server = http.createServer((req, res) => {

    // Thiết lập kiểu nội dung trả về
    res.setHeader('Content-Type', 'text/html; charset=utf-8');

    // Trang chủ
    if (req.url === '/') {
        res.statusCode = 200;
        res.end(`
            <h1>Xin chào!</h1>
            <p>Chào mừng bạn đến với Web Server Node.js.</p>
            <p>Mã sinh viên: ${maSinhVien}</p>
        `);
    }

    // Trang giới thiệu
    else if (req.url === '/about') {
        res.statusCode = 200;
        res.end(`
            <h1>Thông tin giới thiệu bản thân</h1>
            <p>Họ và tên: ${hoTen}</p>
            <p>Mã sinh viên: ${maSinhVien}</p>
            <p>Ngành học: Công nghệ thông tin</p>
            <p>Trường: Cao đẳng Kỹ Thuật Công Nghệ Nha Trang</p>
        `);
    }

    // Đường dẫn không tồn tại
    else {
        res.statusCode = 404;
        res.end(`
            <h1>404 - Not Found</h1>
            <p>Đường dẫn không tồn tại!</p>
        `);
    }

});

// Khởi động Web Server tại cổng 3000
server.listen(3000, () => {
    console.log('Web Server dang chay tai http://localhost:3000');
});
