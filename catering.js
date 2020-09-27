if (document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready(){
    var removeCartItembuttons = document.getElementsByClassName('js-button-remove')
    for(var i = 0; i < removeCartItembuttons.length; i++){
        var button = removeCartItembuttons[i]
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('js-item-quantity')
    for (var i = 0; i < quantityInputs.length; i++){
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName( 'js-add-to-cart')
    for (var i = 0; i < addToCartButtons.length; i++){
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName('js-purchase')[0].addEventListener('click', purchaseClicked)
}

function purchaseClicked(){
    alert('thank you for your purchase!')
    var cartItems = document.getElementsByClassName('js-cart')[0]
    while (cartItems.hasChildNodes()){
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}

function removeCartItem(event){
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.parentElement.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event){
    var input = event.target
    if (isNaN(input.value) || input.value <= 0){
        input.value = 1
    }

    if (input.value > 2){
        input.value = 2
    }
    updateCartTotal()
}

function addToCartClicked(event){
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('menu-item-name')[0].innerText
    var price = shopItem.getElementsByClassName('js-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('js-image')[0].src
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
}

function addItemToCart(title, price, imageSrc){
    var cartRow = document.createElement('tr')
    cartRow.classList.add('js-cart-row')
    var cartItems = document.getElementsByClassName('js-cart')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++){
        if (cartItemNames[i].innerText == title){
            alert('This item is already in the cart')
            return
        }
    }
    var cartRowContents = `
    <td>
        <div class="cart-item">
            <img class="cart-item-image" src="${imageSrc}">
            <span class="cart-item-info">
                <p class="cart-item-title">${title}</p>
                <span class="cart-item-action">
                    <p class="js-item-price">${price}</p>
                    <button class="js-button-remove">REMOVE</button>
                </span>
            </span>
        </div>
    </td>
    <td>
        <input class="cart-item-quantity js-item-quantity" value="1" type="number">
    </td>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('js-button-remove')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('js-item-quantity')[0].addEventListener('change', quantityChanged)
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('js-cart')[0]
    var cartRows = cartItemContainer.getElementsByClassName('js-cart-row')
    var total = 0
    for(var i = 0; i < cartRows.length; i++){
        var cartRow = cartRows[i]
        var cartItemPrice = cartRow.getElementsByClassName('js-item-price')[0]
        var cartItemQuantity = cartRow.getElementsByClassName('js-item-quantity')[0]
        var price = parseFloat(cartItemPrice.innerText.replace('$ ', ''))
        var quantity = cartItemQuantity.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) /100
    document.getElementsByClassName('js-total')[0].innerText = '$' + total
}