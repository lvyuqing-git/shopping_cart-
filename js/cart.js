$(function () {
    //获取本地存储中的数据,其中有数据时将‘快去购物‘部分隐藏,
    // console.log(kits.loadData('cartListData'));
    let arr = kits.loadData('cartListData');
    count();
    if (arr.length != 0) {
        $('.empty-tip').hide();
        $('.cart-header').show();
        $('.total-of').show();
    }
    let html = '';
    arr.forEach(function (e, i) {
        html += `<div class="item" data-id="${e.pID}">
    <div class="row">
      <div class="cell col-1 row">
        <div class="cell col-1">
          <input type="checkbox" class="item-ck" ${e.isChecked ? 'checked' : ''}>
        </div>
        <div class="cell col-4">
          <img src="${e.imgSrc}" alt="">
        </div>
      </div>
      <div class="cell col-4 row">
        <div class="item-name">${e.name}</div>
      </div>
      <div class="cell col-1 tc lh70">
        <span>￥</span>
        <em class="price">${e.price}</em>
      </div>
      <div class="cell col-1 tc lh70">
        <div class="item-count">
          <a href="javascript:void(0);" class="reduce fl">-</a>
          <input autocomplete="off" type="text" class="number fl" value="${e.number}">
          <a href="javascript:void(0);" class="add fl">+</a>
        </div>
      </div>
      <div class="cell col-1 tc lh70">
        <span>￥</span>
        <em class="computed">${e.price * e.number}</em>
      </div>
      <div class="cell col-1">
        <a href="javascript:void(0);" class="item-del">从购物车中移除</a>
      </div>
    </div>
  </div>`;
    });
    $('.item-list').append(html);

    // 封装一个计算总价格和总件数的函数
    function count() {

        let sum = 0;
        let sumPrice = 0;
        arr.forEach((e, i) => {
            if (e.isChecked) {
                sum += e.number;
                sumPrice += e.price * e.number;
            }
        });

        $('.selected').text(sum);
        $('.total-money').text(sumPrice);
    }
    //实现全选

    $('.pick-all').click(function (e) {
        let pickAll = $(this).prop('checked');
        $('.item-ck').prop('checked', pickAll);
        $('.pick-all').prop('checked', pickAll);
        arr.forEach((e) => {
            e.isChecked = pickAll;
        });
        kits.saveData('cartListData', arr);
        count();

    });


    let nockAll = arr.find((e, i) => {
        return e.isChecked == false;
    });
    if (nockAll) {
        $('.pick-all').prop('checked', false);

    }
    //实现点选，通过使用 $('.item-ck:checked').length 取得按钮的勾选数，将它和按钮的总长度进行比较。为真则是全勾选
    $('.item-list').on('click', '.item-ck', function () {

        let ckall = $('.item-ck').length == $('.item-ck:checked').length;
        $('.pick-all').prop('checked', ckall);

        arr.forEach((e) => {
            if (e.pID == $(this).parents('.item').attr('data-id')) {
                e.isChecked = $(this).prop('checked');
            }
        });
        kits.saveData('cartListData', arr);
        count();

    })
    // 商品数量添加
    $('.item-list').on('click', '.add', function () {
        let amountAdd = $(this).parents('.item').attr('data-id');

        let amount = arr.find(function (e) {
            return amountAdd == e.pID;
        });
        amount.number++;
        kits.saveData('cartListData', arr);
        count();
        $(this).prev().val(amount.number);
        //计算单项总价
        $(this).parents('.item').find('.computed').text(amount.number * amount.price);


    })
    // 商品数量减少

    $('.item-list').on('click', '.reduce', function () {
        let amountAdd = $(this).parents('.item').attr('data-id');

        let amount = arr.find(function (e) {
            return amountAdd == e.pID;
        });
        amount.number > 0 ? amount.number-- : amount.number = 0;
        kits.saveData('cartListData', arr);
        count();
        $(this).next().val(amount.number);
        $(this).parents('.item').find('.computed').text(amount.number * amount.price);
    })

    $('.item-list').on('blur', '.number', function () {
        let amountAdd = $(this).parents('.item').attr('data-id');
        let amount = arr.find(function (e) {
            return amountAdd == e.pID;
        });
        let value = $(this).val();
        if (value.trim().length == 0 || isNaN(value) || parseInt(value) < 0) {
            $(this).val(amount.number)
            alert('请重新输入')
            return;
        }

        amount.number = value;
        kits.saveData('cartListData', arr);
        count();
        $(this).val(amount.number);
        $(this).parents('.item').find('.computed').text(amount.number * amount.price);
    })

    //购物车泡泡
    let paopao = 0;
    arr.forEach(e => {
        paopao += e.number;
    });
    $('.count').text(paopao);

    $(document).on('click', '.add,.reduce', function () {
        let paopao = 0;
        arr.forEach(e => {
            paopao += e.number;
        });
        $('.count').text(paopao);
    })

    //删除

    $('.item-list').on('click', '.item-del', function () {
        let amountAdd = $(this).parents('.item').attr('data-id');
        let amount = [];
        arr.forEach((e) => {
            if (amountAdd == e.pID) {
                $(this).parents('.item').remove();
            }

        });

        let arr2 = arr.find((e) => {
            return amountAdd != e.pID;
        })
        amount.push(arr2)
        console.log(amount);
        kits.saveData('cartListData', amount);
        count();

    })


});