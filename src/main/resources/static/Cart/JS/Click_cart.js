function handleMinusQuanity(current_btn) {
  let content = current_btn.nextElementSibling.value;

  if (/^\d+$/.test(content)) {
    let pre_value = parseInt(content, 10) - 1;

    if (pre_value >= 0) {
      current_btn.nextElementSibling.value = pre_value;
      caculateItemPriceSum(current_btn.parentElement.parentElement.parentElement);
      caculateAllItemPriceSum();

      // Gọi API để giảm số lượng
      const itemRow = current_btn.closest('.item-row'); // Lấy row chứa sản phẩm
      const itemId = productId; // Lấy itemId của sản phẩm
      fetch(`http://localhost:8083/carts/1/items/${itemId}/decrease`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Giảm số lượng thành công:', data);
          updateTotalPrice(data.items); // Cập nhật lại tổng giá
          updateItemPrice(itemRow, data); // Cập nhật giá cho từng item nếu cần
        })
        .catch((error) => {
          console.error('Lỗi khi giảm số lượng:', error);
        });
    }
  }
}

// Hàm xử lý khi bấm nút +
function handlePlusQuanity(current_btn) {
  let content = current_btn.previousElementSibling.value;

  if (/^\d+$/.test(content)) {
    let next_value = parseInt(content, 10) + 1;
    current_btn.previousElementSibling.value = next_value;
    caculateItemPriceSum(current_btn.parentElement.parentElement.parentElement);
    caculateAllItemPriceSum();

    // Gọi API để tăng số lượng
    const itemRow = current_btn.closest('.item-row'); // Lấy row chứa sản phẩm
    const itemId = getItemId(itemRow); // Lấy itemId của sản phẩm
    fetch(`http://localhost:8083/carts/1/items/${itemId}/increase`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Tăng số lượng thành công:', data);
        updateTotalPrice(data.items); // Cập nhật lại tổng giá
        updateItemPrice(itemRow, data); // Cập nhật giá cho từng item nếu cần
      })
      .catch((error) => {
        console.error('Lỗi khi tăng số lượng:', error);
      });
  }
}

// Hàm lấy itemId từ một item row
function getItemId(itemRow) {
  // Giả sử bạn đã lưu itemId vào dataset của item row
  return itemRow.dataset.productId;

}

// Hàm cập nhật giá cho từng item
function updateItemPrice(itemRow, updatedData) {
  const priceElement = itemRow.querySelector('.item-pirce_sum');
  const updatedItem = updatedData.items.find((item) => item.id == getItemId(itemRow));
  if (updatedItem) {
    priceElement.innerText = `${updatedItem.price.toLocaleString('vi-VN')} đ`;
  }
}

// Hàm cập nhật tổng giá trị giỏ hàng
function updateTotalPrice(items) {
  const totalPriceElement = document.querySelector('.price_sum_all_item');
  const totalPrice = items.reduce((sum, item) => sum + item.price, 0);
  totalPriceElement.innerText = `${totalPrice.toLocaleString('vi-VN')} đ`;
}

// Hàm thêm sản phẩm vào giỏ hàng
function handleAddProductToCart() {
  console.log('handleAddProductToCart called');
  let quantity = document.querySelector('.input-quanity').value; // Lấy giá trị của input quantity

  // Kiểm tra giá trị hợp lệ của số lượng (phải là số và lớn hơn 0)
  if (quantity <= 0 || isNaN(quantity)) {
    alert('Vui lòng nhập số lượng hợp lệ.');
    return;
  }

  // Fetch API để thêm sản phẩm vào giỏ hàng
  fetch(`http://localhost:8083/carts/add/1/items?productId=${productId}&quantity=${quantity}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      console.log('Sản phẩm đã được thêm vào giỏ hàng:', data);
      alert('Sản phẩm đã được thêm vào giỏ hàng thành công!');
    })
    .catch((error) => {
      console.error('Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng:', error);
    });
}


function handleAddProductToCart() {
  console.log("handleAddProductToCart called");
  let quantity = document.querySelector(".input-quanity").value; // Lấy giá trị của input quantity

  // Kiểm tra giá trị hợp lệ của số lượng (phải là số và lớn hơn 0)
  if (quantity <= 0 || isNaN(quantity)) {
      alert("Vui lòng nhập số lượng hợp lệ.");
      return;
  }

  // Fetch API để thêm sản phẩm vào giỏ hàng
  fetch(`http://localhost:8083/carts/add/1/items?productId=${productId}&quantity=${quantity}`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      }
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      return response.json();
  })
  .then(data => {
      console.log('Sản phẩm đã được thêm vào giỏ hàng:', data);
      alert("Sản phẩm đã được thêm vào giỏ hàng thành công!");
  })
  .catch(error => {
      console.error('Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng:', error);
  });
}

function deleteGroupItemRow(current_btn)
{
  let group_item_row = current_btn.parentElement.parentElement.parentElement;
  let uri = '/api/deleteProduct?id=' + group_item_row.getAttribute("id")
  fetch(uri, {
    method: 'POST', // Phương thức POST
    headers: {
      'Content-Type': 'application/json' // Loại nội dung là JSON
    },
  })

  group_item_row.remove();
  caculateAllItemPriceSum()

}
function handleHeaderCheckbox()
{
  let arr_check = document.getElementsByClassName('item-check');

  if(document.getElementsByClassName('header-check')[0].firstElementChild.checked)
  {
    for (let i = 0; i < arr_check.length; i++)
      arr_check[i].firstElementChild.checked = true;
  }
  else
  {
    for (let i = 0; i < arr_check.length; i++)
      arr_check[i].firstElementChild.checked = false;
  }
  caculateAllItemPriceSum();
}
function handleItemCheckbox(current_btn)
{
  let header_checkbox = document.getElementsByClassName('header-check')[0].firstElementChild

    if(!current_btn.checked)
    {
      header_checkbox.checked = false;
    }
    else
    {
      let arr_check = document.getElementsByClassName('item-check');
      let all_checked = true;

      for (let i = 0; i < arr_check.length; i++)
        if(!arr_check[i].firstElementChild.checked)
        {
          all_checked = false;
          break;
        }

      if(all_checked)
        header_checkbox.checked = true;
    }
  caculateAllItemPriceSum();
}
function handleDropdownBtnItemStyle(current_btn)
{
  if(current_btn.nextElementSibling)
    current_btn.nextElementSibling.remove();
    else
    {
      let html_modal_item_style =
      '                <div class="md" >\n' +
      '                    <div class="content-modal">\n' +
      '                        <div class="color-content-modal">\n' +
      '                            <div class="cl1-color-content-modal">\n' +
      '                                Màu sắc:\n' +
      '                            </div>\n' +
      '                            <div class="cl2-color-content-modal">\n' +
      '                                <button class="btn-color" onclick="handleClick(this)">\n' +
      '                                    <div class="text-content-modal"> <!--Đặt thẻ div do buton không dùng text-align được -->\n' +
      '                                        Đen\n' +
      '                                    </div>\n' +
      '                                </button>\n' +
      '                            </div>\n' +
      '                        </div>\n' +
      '                        <div class="size-content-modal">\n' +
      '                            <div class="cl1-size-content-modal">\n' +
      '                                Kích thước:\n' +
      '                            </div>\n' +
      '                            <div class="cl2-size-content-modal">\n' +
      '                                <button class="btn-size" onclick="handleClick(this)">\n' +
      '                                    <div class="text-content-modal">\n' +
      '                                        L\n' +
      '                                    </div>\n' +
      '                                </button>\n' +
      '\n' +
      '                                <button class="btn-size" onclick="handleClick(this)">\n' +
      '                                    <div class="text-content-modal">\n' +
      '                                        XL\n' +
      '                                    </div>\n' +
      '                                </button>\n' +
      '\n' +
      '                                <button class="btn-size" onclick="handleClick(this)">\n' +
      '                                    <div class="text-content-modal">\n' +
      '                                        XXL\n' +
      '                                    </div>\n' +
      '                                </button>\n' +
      '\n' +
      '                                <button class="btn-size" onclick="handleClick(this)">\n' +
      '                                    <div class="text-content-modal">\n' +
      '                                        XXXL\n' +
      '                                    </div>\n' +
      '                                </button>\n' +
      '                            </div>\n' +
      '                        </div>\n' +
      '                    </div>\n' +
      '\n' +
      '                    <div class="footer-modal">\n' +
      '                        <div>\n' +
      '                            <button type="button" class="btn btn-outline-danger btn-back-footer-modal" onclick="handleBackModal(this)">Trở lại</button>\n' +
      '                        </div>\n' +
      '                        <div>\n' +
      '                            <button type="button" class="btn btn-danger btn-confirm-footer-modal" onclick="handleConfirmModal(this)">Xác nhận</button>\n' +
      '                        </div>\n' +
      '                    </div>\n' +
      '                </div>'

      current_btn.parentElement.insertAdjacentHTML('beforeend', html_modal_item_style);

      const modal_item_style = current_btn.nextElementSibling;

      // Tính khoảng cách từ lề dưới và trái của body tới phần tử chỉ định
      const bottom_distance = current_btn.getBoundingClientRect().bottom + window.scrollY +5;
      const left_distance = current_btn.getBoundingClientRect().left + window.scrollY -80;

      modal_item_style.style.top = bottom_distance.valueOf() + 'px'
      modal_item_style.style.left = left_distance.valueOf() + 'px'



    }
}
function handleClick(current_btn)
{
  convertCart(current_btn);
  current_btn.style.border = 'red solid 2px';
  current_btn.classList.add('selected');
}
function handleBackModal(current_btn)
{
  current_btn.parentElement.parentElement.parentElement.remove();
}
function handleConfirmModal(current_btn)
{

  let children_content_modal = current_btn.parentElement.parentElement.previousElementSibling.children;

  let arr_color = children_content_modal[0].children[1].children;
  let color;
  for (let i = 0; i < arr_color.length; i++)
    if(arr_color[i].classList[1] == 'selected')
      color = arr_color[i].firstElementChild.innerHTML


  let arr_size = children_content_modal[1].children[1].children;
  let size;
  for (let i = 0; i < arr_size.length; i++)
    if(arr_size[i].classList[1] == 'selected')
      size = arr_size[i].firstElementChild.innerHTML

  if(size&&color)
  {
    let modal =    current_btn.parentElement.parentElement.parentElement;
    modal.previousElementSibling.children[1].innerHTML = color.trim() + ', ' + size.trim()
    modal.remove();
  }
}
function buyProduct()
{
  let price = parseFloat(document.getElementsByClassName("price_sum_all_item")[0].innerHTML)*1000;

  const baseUrl = "http://localhost:8086/api/payment";
  const params = {
    amount: price.toString(),
  };

  const queryString = new URLSearchParams(params).toString();
  const urlWithParams = `${baseUrl}?${queryString}`;

  fetch(urlWithParams, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      if (!response.ok) {
        // Kiểm tra nếu phản hồi không thành công
        throw new Error('Network response was not ok');
      }
      return response.json(); // Chuyển đổi phản hồi thành JSON
    })
    .then(data => {
      // Lấy giá trị thuộc tính vnpayurl
      const vnpayurl = data.url;
      window.location.href = vnpayurl;
    })
    .catch(error => console.error('There was a problem with the fetch operation:', error));

}
