function SinhVien(_maSV, _tenSV, _email, _matKhau, _ngaySinh, _khoaHoc, _diemToan, _diemLy, _diemHoa){
    this.maSV = _maSV;
    this.tenSV = _tenSV;
    this.email = _email;
    this.matKhau = _matKhau;
    this.ngaySinh = _ngaySinh;
    this.khoaHoc = _khoaHoc;
    this.diemToan = _diemToan;
    this.diemLy = _diemLy;
    this.diemHoa = _diemHoa;
    this.dtb = 0;


    this.tinhDTB = function () {
        this.dtb = (parseFloat(this.diemToan) + parseFloat(this.diemHoa) + parseFloat(this.diemLy)) /3;
    }
}