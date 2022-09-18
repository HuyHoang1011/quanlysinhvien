function DSSV(){
    this.arr = [];

    this.themSV = function(sv){
        this.arr.push(sv);
    }

    this.timViTriSV = function (maSV){
        var index=-1;

        this.arr.forEach(function(sv, i){
            if(sv.maSV === maSV){
                index = i;
            }
        });
        return index;
    }

    this.xoaSV = function(maSV){
        var index = this.timViTriSV(maSV);
        //Xoa phan tu trong mang
        if(index !== -1){
            this.arr.splice(index, 1);
        }

    }

    this.layThongTinSV = function(maSV){
        //tim vi tri SV
        var index = this.timViTriSV(maSV);

        if(index !==-1){
            return this.arr[index];
        }

        return null;
    }

    this.capNhatSinhVien = function(sv){
        //timvitri
        var index = this.timViTriSV(sv.maSV);

        if(index !== -1){
            this.arr[index] = sv;
        }
    }

    this.timKiemSinhVien=function(keyword){
        var mangTimKiem = [];

        this.arr.forEach(function(sv){
            var tenSV = sv.tenSV.toLowerCase();
            var txtSearch =keyword.toLowerCase();
            if(tenSV.indexOf(txtSearch) !== -1) {
                mangTimKiem.push(sv);
            }
        })
        return mangTimKiem;
    }

}

// var username="cybersoft";
// var rs=`Hello ${username}`;
// console.log(rs);