if (document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', readyToRun)
} else {
    readyToRun()
}

function readyToRun(){
    var buttonApply = document.getElementsByClassName('js-button-apply')[0]
    buttonApply.addEventListener('click', buttonApplyClicked)
}

function buttonApplyClicked(){
    var emailBlock = document.getElementsByClassName('input-email')[0]
    
    if ( isNaN(emailBlock.value) && (emailBlock.value.length > 10 && emailBlock.value.includes("@gmail.com")) ){
        alert('You have successfully applied for rewards! If '
         + emailBlock.value + ' is an existing email, you will receive your first coupon in the next 24 hours')
    } else {
        alert('Please use your email address')
    }
}