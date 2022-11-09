let deleteItems = document.querySelectorAll('.product-item .delete-item');
let minusS = document.querySelectorAll('.container__cart--have-cart .product-item .minus');
let plusS = document.querySelectorAll('.container__cart--have-cart .product-item .plus');
let numbers = document.querySelectorAll('.container__cart--have-cart .product-item .number');
let noCart = document.querySelector('.container__cart--no-cart');
let haveCart = document.querySelector('.container__cart--have-cart');
let totalPrice = document.querySelector('.container__cart--have-cart .total-price strong:nth-child(2)');

handleTotalPrice();

// xu li xoa san pham
let quantityClose = deleteItems.length;
deleteItems.forEach((iconclose, index) => {
    iconclose.onclick = function () {
        quantityClose --;
        iconclose.closest('.product-item').remove();
        handleTotalPrice();
        if (quantityClose === 0) {
            haveCart.classList.remove('active');
            noCart.classList.add('active');
        }
    }
});

//xu li tang so luong san pham 
plusS.forEach((plus, index) => {
    plus.onclick = () => {
        plus.previousElementSibling.previousElementSibling.style.color = '#288ad6';
        let number = plus.previousElementSibling;
        let x = parseInt(number.innerHTML, 10);
        x++;
        numbers[index].innerHTML = `${x}`;
        handleTotalPrice();
    }
})



//xu li giam so luong san pham
minusS.forEach((minus, index) => {
    minus.onclick = () => {
        let number = minus.nextElementSibling;
        let x = parseInt(number.innerHTML, 10);
        if (x >= 2) {
            if (x === 2)
                minus.style.color = '#ccc';
            else  
                minus.style.color = '#288ad6';
            x--;
            numbers[index].innerHTML = `${x}`;
        }
        handleTotalPrice();
    }
})

//xu li tong tien
function handleTotalPrice() {
    productItems = document.querySelectorAll('.product-item');
    productItems = Array.from(productItems);
    let sum=productItems.reduce((total, curr, index) => {
        let price = curr.querySelector('.sale-price').dataset.value;
        let quantity = curr.querySelector('.number');
        quantity = parseInt(quantity.innerHTML, 10);
        return total + price * quantity;
    }, 0)
    sum = new Intl.NumberFormat('de-DE').format(sum);
    totalPrice.innerHTML = `${sum} ₫`;
}
