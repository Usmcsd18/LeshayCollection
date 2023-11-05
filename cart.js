if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}
// function to add remove action to buttons
function ready() {
    const removeCartItems = document.getElementsByClassName('btn btn-danger')
    console.log(removeCartItems)
    for (var i = 0; i < removeCartItems.length; i++) {
        var button = removeCartItems[i]
        button.addEventListener('click', removeCartItem)
    }
    var quanityInputs = document.getElementsByClassName('quantity') 
    for (var i = 0; i < quanityInputs.length; i++) {
        var input = quanityInputs[i]
        input.addEventListener('change', quantityChanged)
        }
        var addToCartButtons = document.getElementsByClassName('preview-button')
        for (var i = 0; i < addToCartButtons.length; i++) {
            var button = addToCartButtons[i]
            button.addEventListener('click', addToCartClicked)
}

// updates the carts total with a click/change event
function removeCartItem() {
    var buttonClicked = event.target
            buttonClicked.parentElement.parentElement.remove()
            updateCartTotal()
}
function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}
// adds items to cart with the add to cart buttons
function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('preview-price')[0].innerText
    var imgsrc = shopItem.getElementsByClassName('shop-item-img')[0].src
    console.log(title, price, imgsrc)
    addItemToCart(title,price,imgsrc)
    updateCartTotal()
}

function addItemToCart (title, price, imgsrc) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('shopItem')
    var cartItem = document.getElementsByClassName('shop-item')[0]
    var cartRowContent = `
            <h6 class="my-0">${title}</h6>
            <small class="text-body-secondary">Brief description</small> <br>
            <label for="quantity">Quantity &#160<input type="number" class="quantity" value="2" min="0" max="10"></label>
            <span class="text-body-secondary price">${price}</span>
            <span><button type="button" class="btn btn-danger">Remove</button></span>
            </li>
            <li class="list-group-item d-flex justify-content-between lh-sm">
            `
    cartRow.innerHTML = cartRowContent
    cartItem.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('quantity')[0].addEventListener('click', quantityChanged)
}
//realtime updates to the cart
function updateCartTotal () {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('incart')
    var total = 0 
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('price')[0]
        var quanityElement = cartRow.getElementsByClassName('quantity')[0]
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = quanityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('total')[0].innerText = `$${total}`
}}
