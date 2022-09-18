var dssv = new DSSV();
var validation = new Validation();
getLocalStorage();

function getEle(id){
    return document.getElementById(id);
}
function layThongTinSV(){
    var maSV = getEle("txtMaSV").value;
    var tenSV = getEle("txtTenSV").value;
    var email = getEle("txtEmail").value;
    var matKhau = getEle("txtPass").value;
    var ngaySinh = getEle("txtNgaySinh").value;
    var khoaHoc = getEle("khSV").value;
    var diemToan = getEle("txtDiemToan").value;
    var diemLy = getEle("txtDiemLy").value;
    var diemHoa = getEle("txtDiemHoa").value;

    //console.log(maSV, tenSV, email, matKhau, ngaySinh, khoaHoc, diemHoa, diemLy ,diemToan);
   
    //flag
    var isValid=true;

    //check validation
    //MaSV
    isValid &= validation.kiemTraRong(maSV,"errorMaSV","(*) Vui lòng nhập mã sinh viên");
    //tenSV
    isValid &= validation.kiemTraRong(tenSV,"errorTenSV","(*) Vui lòng nhập tên sinh viên");
    
    if(isValid==true){
    //tạo đối tượng sinh viên từ lớp đối tượng
    var sv= new SinhVien(maSV,
        tenSV,
        email,
        matKhau,
        ngaySinh,
        khoaHoc,
        diemToan,
        diemLy,
        diemHoa
        );
   //tính điểm tbinh
   sv.tinhDTB();

   return sv;
    }
   return null;
}

var arr = [];

getEle("btnAdd").addEventListener("click", function(){
    var sv=layThongTinSV();

    dssv.themSV(sv);
    console.log(dssv.arr);

    //render
    renderTable(dssv.arr);

    setLocalStorage();

})

// function renderTable(data) {
//     var content = "";

//     for (var i=0; i<data.length;i++){
//         var sv = data[i];
//         content+="<tr>";
//         content+="<td>" + sv.maSV + "</td>";
//         content+="<td>" + sv.tenSV + "</td>";
//         content+="<td>" + sv.email + "</td>";
//         content+="<td>" + sv.ngaySinh + "</td>";
//         content+="<td>" + sv.khoaHoc + "</td>";
//         content+="<td>" + sv.dtb + "</td>";
//         content+="</tr>";
//     }
//     console.log(content);
//     getEle("tbodySinhVien").innerHTML = content;
// }



function renderTable(data){
    var content="";

    data.forEach(function(sv, i){
        content += `
            <tr>
                <td>${sv.maSV}</td>
                <td>${sv.tenSV}</td>
                <td>${sv.email}</td>
                <td>${sv.ngaySinh}</td>
                <td>${sv.khoaHoc}</td>
                <td>${sv.dtb}</td>
                <td>
                    <button id="btnEdit" class="btn btn-info" onclick="editSV('${sv.maSV}')">Edit</button>
                    <button id="btnDelete" class="btn btn-danger" onclick="deleteSV('${sv.maSV}')">Delete</button>
                </td>
            </tr>
        `;
    })
    getEle("tbodySinhVien").innerHTML = content;
}

function editSV(maSV){
    var sv=dssv.layThongTinSV(maSV);
    // console.log(sv);

    if(sv){
        //dom toi cac the input

        getEle("txtMaSV").value=sv.maSV;
        getEle("txtTenSV").value=sv.tenSV;
        getEle("txtEmail").value=sv.email;
        getEle("txtPass").value=sv.matKhau;
        getEle("txtNgaySinh").value=sv.ngaySinh;
        getEle("khSV").value=sv.khoaHoc;
        getEle("txtDiemToan").value=sv.diemToan;
        getEle("txtDiemLy").value=sv.diemLy;
        getEle("txtDiemHoa").value=sv.diemHoa;


        // getEle("txtMaSV").disabled = true;

        //Hiển thị button
        getEle("btnUpdate").style.display="inline-block";
        //Ẩn button#btnAdd
        getEle("btnAdd").style.display = "none";
        //Hiể thị reset
        getEle("btnReset").style.display="inline-block";
    }

}


//Cập nhật
getEle("btnUpdate").addEventListener("click", function(){
    var sv=layThongTinSV();
    console.log(sv);
    dssv.capNhatSinhVien(sv);
    renderTable(dssv.arr);
    setLocalStorage();

    
    //Hiển thị button
    getEle("btnUpdate").style.display="none";
    //Ẩn button#btnAdd
    getEle("btnAdd").style.display = "inline-block";
    //Hiển thị reset
    getEle("btnReset").style.display="none";
    
});

//Reset
getEle("btnReset").addEventListener("click", function(){
    var sv=layThongTinSV();
    console.log(sv);
    
})


function deleteSV(maSV){
    dssv.xoaSV(maSV);
    renderTable(dssv.arr);
    setLocalStorage();
}

getEle("txtSearch").addEventListener("keyup", function(){
    var keyword=getEle("txtSearch").value;
    // console.log(keyword);
    var mangTimKiem = dssv.timKiemSinhVien(keyword)
    //hienthi
    renderTable(mangTimKiem);
})

function setLocalStorage(){
    //Chuyển arr từ JSON => String
    var dataString = JSON.stringify(dssv.arr);
    //Lưu data xuống LocalStorage của trình duyệt
    localStorage.setItem("DSSV", dataString);
}

function getLocalStorage(){
    var dataString = localStorage.getItem("DSSV");
    //convert String => JSON
    dssv.arr = JSON.parse(dataString);
    renderTable(dssv.arr);
}