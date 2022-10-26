//ready
//make sure the page is ready
if(document.readyState=='loading')
{
  document.addEventListener('DOMContentLoaded', ready)
}
else
{
  ready()
}

function ready()
{
  // delete product in cart
  var removeCartItemButtons = document.getElementsByClassName('fa-trash')
  for(var i=0; i < removeCartItemButtons.length; i++)
  {
    var button = removeCartItemButtons[i];
    button.addEventListener('click', removeCartItem)
  }
  //chinh so luong
  var quantityInputs = document.getElementsByClassName('cart-quantity-input')
  for(var i=0; i < quantityInputs.length; i++)
  {
    var input = quantityInputs[i];
    input.addEventListener('change', quantityChanged)
  }

  //add do vo
  var addTocartButtons = document.getElementsByClassName('shop-item-button')
  for(var i=0; i < addTocartButtons.length; i++)
  {
    var button = addTocartButtons[i];
    button.addEventListener('click', addTocartClicked)
  }
  document.getElementsByClassName('cart-total-price')[0].addEventListener('click', purchaseClicked)
}

function removeCartItem(event)
{
  var buttonClicked = event.target
  buttonClicked.parentElement.parentElement.parentElement.remove()
  updatecartTotal()
}

function quantityChanged(event)
{
  var input = event.target;
  if(isNaN(input.value) || input.value <= 0)
  {
    input.value =1;
  }
  updatecartTotal()
}

function addTocartClicked(event)
{
  var button = event.target;
  var shopItem = button.parentElement;
  var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText;
  var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText;
  var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src;
  console.log(title, price, imageSrc)
  addItemToCart(title, price, imageSrc)
  updatecartTotal()
}

function addItemToCart(title, price, imageSrc)
{
  var cartRow = document.createElement('div');
  cartRow.classList.add('cart-row')
  var cartItems = document.getElementsByClassName('shopping-cart')[0]
  var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
  for(var i =0; i <cartItemNames.length; i++ )
  {
    if(cartItemNames[i].innerText==title)
    {
      alert('This item is alread added to the cart')
      return
    }
  }
  var cartRowContents = `
      <img src="${imageSrc}" width="100" height="100" alt="">
      <div class="content">
          <h3>${title}</h3>
          <span class="price cart-price">${price}</span>
          <div class="cart-quantity">
            <span>Quantity: </span>
              <input class="cart-quantity-input" type="number" value="1">
              <i class="fas fa-trash"></i>
          </div>
      </div>`
      cartRow.innerHTML= cartRowContents;
  cartItems.append(cartRow)
  cartRow.getElementsByClassName('fa-trash')[0].addEventListener('click', removeCartItem)
  cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', removeCartItem)
}

function purchaseClicked()
{
  alert('Thank you for your purchase');
  var cartItems =document.getElementsByClassName('cart-items')[0]
  while(cartItems.hasChildNodes())
  {
    cartItems.removeChild(cartItems.firstChild)
  }
  updatecartTotal()
}
 //update total price
function updatecartTotal()
{
  var cartItemContainer= document.getElementsByClassName('shopping-cart')[0]
  //console.log(cartItemContainer)
  var cartRows = cartItemContainer.getElementsByClassName('cart-row')
  var total =0;
  for(var i=0; i < cartRows.length; i++)
  {
    var cartRow = cartRows[i];
    //console.log(cartRow)
    var priceElement = cartRow.getElementsByClassName('cart-price')[0]
    //console.log(priceElement)
    var quantityElement= cartRow.getElementsByClassName('cart-quantity-input')[0]
    var price = parseFloat(priceElement.innerText.replace('$', ''))
    var quantity = quantityElement.value
    total = total + (price*quantity)
  }
  total = Math.round(total*100)/100
document.getElementsByClassName('cart-total-price')[0].innerText= 'Total: $'+total
}
