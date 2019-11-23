//获取list页面传递过来的参数，根据参数生成页面
$(function () {
    console.log(phoneData);
    
    let target = phoneData.find(function (e) {
        return e.pID == location.search.substr(4)
    });
    $('.preview-img img').attr('src',target.imgSrc);
    $('.summary-price em').text(target.price);
    $('.sku-name').text(target.name);
});