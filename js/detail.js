//获取list页面传递过来的参数，根据参数生成页面
$(function () {
    let id = location.search.substr(4);
    let target = phoneData.find(function (e) {
        return e.pID == id;
    });
    $('.preview-img img').attr('src', target.imgSrc);
    $('.summary-price em').text(target.price);
    $('.sku-name').text(target.name);

    //////////////////----------------------------------------------



    $('.addshopcar').click(() => {
        let number = $('.choose-number').val();
        if (isNaN(number) || number.trim().length == 0 || parseInt(number) <= 0) {
            alert('请重新输入件数');
            return;
        }
        let arr = kits.loadData('cartListData');
        //如果是个空数组，并不会报错，而是放回undefined
        //如果是【null】  (一个包含值为null数据的数组)就会报错
        let exist = arr.find(function (e, i) {
            //如果不存在返回值为undefiend
            return e.pID == id;
        });

        
        number = parseInt(number);
        if (exist) {
            exist.number += number;
            let paopao = 0;
            arr.forEach(e => {
                paopao += e.number;
            });
            $('.count').text(paopao);
        } else {
            let obj = {
                pID: target.pID,
                imgSrc: target.imgSrc,
                name: target.name,
                price: target.price,
                number: number,
                isChecked: true,
            }
            arr.push(obj);
        }
        kits.saveData('cartListData', arr)
        location.href = './cart.html';
    });
   

});