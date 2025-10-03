let cartProductsRender = () => {
  let cartContainer = document.getElementById('Cart-items-container')
  cartContainer.innerHTML = ''
  let cartProducts = JSON.parse(localStorage.getItem('cart')) || [];
  let allProducts = JSON.parse(localStorage.getItem('products')) || [];

  let headerRow = document.createElement('tr')
  headerRow.classList.add('headerRow','border-bottom','border-dark')
  headerRow.innerHTML =` <th class="" >image</th>
              <th class="">title</th>
              <th class="">Unit price</th>
              <th class="">Quantity</th>
              <th class="">Total</th>
              <th class="">Remove</th>`
  cartContainer.appendChild(headerRow)

  cartProducts.forEach(cartItem => {
    let product = allProducts.find(product => product.id == cartItem.id);
    let total = cartItem.price * cartItem.Quantity
    if (product) {
      let addProduct = document.createElement("tr");
      addProduct.classList.add('rounded-4')
      addProduct.innerHTML = `
        <td class="col-2"><img src="${cartItem.thumbnail}" alt="img" width="80%"></td>
        <td class="col-2 fw-semibold fs-5">${cartItem.name}</td>
        <td class="col-2 fw-bold fs-5">$${cartItem.price}</td>
        <td class="col-2  fw-semibold fs-5 align-center">
          <span class="btn border border-dark rounded-circle " style="width: 30px; height: 30px; padding: 0;" onclick="decQty(${cartItem.id})">-</span>
           <span> ${cartItem.Quantity}</span>
          <span class="btn border border-dark rounded-circle " style="width: 30px; height: 30px; padding: 0;" onclick="incQty(${cartItem.id})">+</span>
        </td>
        <td class="col-2">$${total.toFixed(2)}</td>
        <td class="col-2">
          <span class="fs-5" onclick="cartRemove(${cartItem.id})"><i class="bi bi-trash3-fill"></i></span>
        </td>
      `;
      cartContainer.appendChild(addProduct);
      cartUpdate()
      subtotalCount()
      discountCount()
      finalTotal()
    }
  });
};
subtotalCount()

cartProductsRender();


//cart items number update
function cartUpdate(){
  let cartProducts = JSON.parse(localStorage.getItem('cart'))
  let cartBadge = document.querySelector('.cart-badge')
  cartBadge.innerHTML = `${cartProducts.length}`
}

// increase qty
const incQty = (id) => {
  let cartProducts = JSON.parse(localStorage.getItem('cart')) || [];
  let product = cartProducts.find(item => item.id == id);
  product.Quantity++;
  localStorage.setItem('cart', JSON.stringify(cartProducts));
  
  cartProductsRender();
};

// decrease qty
const decQty = (id) => {
  let cartProducts = JSON.parse(localStorage.getItem('cart')) || [];
  let product = cartProducts.find(item => item.id == id);
  if (product.Quantity > 1) {
    product.Quantity--;
  }else{
    alert('minimum 1 quntity is required')
  }
  localStorage.setItem('cart', JSON.stringify(cartProducts));
  cartProductsRender();
};
//remove item from cart
const cartRemove = (id) => {
  let cartProducts = JSON.parse(localStorage.getItem('cart')) || [];
  cartProducts = cartProducts.filter(item => item.id != id);
  localStorage.setItem('cart', JSON.stringify(cartProducts));
  cartProductsRender();
};

//count subtotal
function subtotalCount(){
  let sTotal = document.querySelector('.subtotal');
  let cartProducts = JSON.parse(localStorage.getItem('cart')) || []
  let subTotal = cartProducts.reduce((acc, item) => acc + item.price * item.Quantity, 0)
  sTotal.innerText = `Total: $${subTotal.toFixed(2)}`;
  return subTotal ;
}

// count total with display
function discountCount(){
  let discount ;
  let discountTxt = document.querySelector('.discount-txt')
  let discountPer = 0 ;
  if(subtotalCount() > 500){
    discountPer = 5 ;
  }
  discount = subtotalCount()*discountPer /100
  console.log('Discount is Rs.',discount.toFixed(2))
  discountTxt.innerHTML = `${discountPer}%` 
  return discount ;
} 

//fianl total
function finalTotal(){
  let Grand_total;
  if(discountCount()){
   Grand_total =  subtotalCount()-discountCount()
  }else{
    Grand_total = subtotalCount().toFixed(2)
  }
  // document.querySelector('.substract-discount').innerHTML = `-${discountCount().toFixed(2)}`
  document.querySelector('.grand-total').innerHTML =  `Rs.${Grand_total.toFixed(2)}`
}