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

    var addToCartChickenButtons = document.getElementsByClassName( 'js-add-to-cart-chicken')
    for (var i = 0; i < addToCartChickenButtons.length; i++){
        var button = addToCartChickenButtons[i]
        button.addEventListener('click', addChickenToCartClicked)
    }

    var addToCartBeansButtons = document.getElementsByClassName( 'js-add-to-cart-beans')
    for (var i = 0; i < addToCartBeansButtons.length; i++){
        var button = addToCartBeansButtons[i]
        button.addEventListener('click', addBeansToCartClicked)
    }

    var addToCartRiceButtons = document.getElementsByClassName( 'js-add-to-cart-rice')
    for (var i = 0; i < addToCartRiceButtons.length; i++){
        var button = addToCartRiceButtons[i]
        button.addEventListener('click', addRiceToCartClicked)
    }

    var addToCartSauceButtons = document.getElementsByClassName( 'js-add-to-cart-sauce')
    for (var i = 0; i < addToCartSauceButtons.length; i++){
        var button = addToCartSauceButtons[i]
        button.addEventListener('click', addSauceToCartClicked)
    }

    var addToCartOptionalButtons = document.getElementsByClassName( 'js-add-to-cart-optional')
    for (var i = 0; i < addToCartOptionalButtons.length; i++){
        var button = addToCartOptionalButtons[i]
        button.addEventListener('click', addOptionalToCartClicked)
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

function addChickenToCartClicked(event){
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('menu-chicken-name')[0].innerText
    var price = shopItem.getElementsByClassName('js-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('js-image')[0].src
    addChickenToCart(title, price, imageSrc)
    updateCartTotal()
}

function addBeansToCartClicked(event){
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('menu-beans-name')[0].innerText
    var price = shopItem.getElementsByClassName('js-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('js-image')[0].src
    addBeansToCart(title, price, imageSrc)
    updateCartTotal()
}

function addRiceToCartClicked(event){
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('menu-rice-name')[0].innerText
    var price = shopItem.getElementsByClassName('js-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('js-image')[0].src
    addRiceToCart(title, price, imageSrc)
    updateCartTotal()
}

function addSauceToCartClicked(event){
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('menu-sauce-name')[0].innerText
    var price = shopItem.getElementsByClassName('js-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('js-image')[0].src
    addSauceToCart(title, price, imageSrc)
    updateCartTotal()
}

function addOptionalToCartClicked(event){
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('menu-optional-name')[0].innerText
    var price = shopItem.getElementsByClassName('js-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('js-image')[0].src
    addOptionalToCart(title, price, imageSrc)
    updateCartTotal()
}

function addChickenToCart(title, price, imageSrc){
    var cartRow = document.createElement('tr')
    cartRow.classList.add('js-cart-row')
    var cartItems = document.getElementsByClassName('js-cart')[0]
    var cartItemNames = cartItems.getElementsByClassName('js-chicken-item-title')
    for (var i = 0; i < cartItemNames.length; i++){
        if ( cartItemNames[i].innerText == 'Chicken Legs (6 pc)' || 'Chicken Wings (9 pc)' || 'Chicken Breast (2 pc)' && 
             title == 'Chicken Legs (6 pc)' || 'Chicken Wings (9 pc)' || 'Chicken Breast (2 pc)'){
            alert('You can add only one type of chicken for your catering')
            return
        }
    }
    var cartRowContents = `
    <td>
        <div class="cart-item">
            <img class="cart-item-image" src="${imageSrc}">
            <span class="cart-item-info">
                <p class="cart-item-title js-chicken-item-title">${title}</p>
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

function addBeansToCart(title, price, imageSrc){
    var cartRow = document.createElement('tr')
    cartRow.classList.add('js-cart-row')
    var cartItems = document.getElementsByClassName('js-cart')[0]
    var cartItemNames = cartItems.getElementsByClassName('js-beans-item-title')
    for (var i = 0; i < cartItemNames.length; i++){
        if ( cartItemNames[i].innerText == 'Black Beans (32 oz)' || 'Pinto Beans (32 oz)' &&
             title == 'Black Beans (32 oz)' || 'Pinto Beans (32 oz)'){
            alert('You can add only one type of beans for your catering')
            return
        }
    }
    var cartRowContents = `
    <td>
        <div class="cart-item">
            <img class="cart-item-image" src="${imageSrc}">
            <span class="cart-item-info">
                <p class="cart-item-title js-beans-item-title">${title}</p>
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

function addRiceToCart(title, price, imageSrc){
    var cartRow = document.createElement('tr')
    cartRow.classList.add('js-cart-row')
    var cartItems = document.getElementsByClassName('js-cart')[0]
    var cartItemNames = cartItems.getElementsByClassName('js-rice-item-title')
    for (var i = 0; i < cartItemNames.length; i++){
        if ( cartItemNames[i].innerText == 'Mexican Rice (32 oz)' || 'Citrus Rice (32 oz)' &&
             title == 'Mexican Rice (32 oz)' || 'Citrus Rice (32 oz)'){
            alert('You can add only one type of rice for your catering')
            return
        }
    }
    var cartRowContents = `
    <td>
        <div class="cart-item">
            <img class="cart-item-image" src="${imageSrc}">
            <span class="cart-item-info">
                <p class="cart-item-title js-rice-item-title">${title}</p>
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

function addSauceToCart(title, price, imageSrc){
    var cartRow = document.createElement('tr')
    cartRow.classList.add('js-cart-row')
    var cartItems = document.getElementsByClassName('js-cart')[0]
    var cartItemNames = cartItems.getElementsByClassName('js-sauce-item-title')
    for (var i = 0; i < cartItemNames.length; i++){
        if (cartItemNames[i].innerText == title){
            alert('This item is already in the cart')
            return
        }
        if (cartItemNames.length == 2){
            alert('You can pick only 2 types of sauces')
            return
        }
    }
    var cartRowContents = `
    <td>
        <div class="cart-item">
            <img class="cart-item-image" src="${imageSrc}">
            <span class="cart-item-info">
                <p class="cart-item-title js-sauce-item-title">${title}</p>
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

function addOptionalToCart(title, price, imageSrc){
    var cartRow = document.createElement('tr')
    cartRow.classList.add('js-cart-row')
    var cartItems = document.getElementsByClassName('js-cart')[0]
    var cartItemNames = cartItems.getElementsByClassName('js-optional-item-title')
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
                <p class="cart-item-title js-optional-item-title">${title}</p>
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