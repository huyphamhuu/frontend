function handleClick(current_btn)
{
  convertItemDetail(current_btn);
  current_btn.style.border = 'red solid 2px';
  current_btn.classList.add('selected');

  if(current_btn.classList[0] == 'btn-color')
  {
    let src = current_btn.firstElementChild.firstElementChild.getAttribute('src')
    //Do sự kiện hover sau đó click thì vẫn là sự kiện hover đó chứ không tách thành hover cũ + click + hover mới nên cần cập nhật lại đối số src cho onmouseout
    //để tránh src lấy từ old_src của sự kiện hover sẽ trả về ảnh screen như chưa click trong khi click rồi phải lấy của btn hiện tại
    current_btn.setAttribute('onmouseout','outRangeBtn(this,"' + src + '")');
  }
}
//Dùng .value để lấy giá trị nội dung bên trong thẻ input, không thể dùng innerHTML do không phân tích đươợc, nếu dùng get,setAttribute chỉ thiết lập giá trị
// của thuộc tính value nếu nhập giá trị vào input thì giá trị thuộc tính này đổi nhưng phần nội dung bên trong sẽ không đổi nhưng nếu chưa nhập inut thì nội
// dung bên trong vẫn sẽ thay đổi. .value không làm thay đổi giá trị thuộc tính value
function handleMinusQuanity(current_btn)
{
  let content = current_btn.nextElementSibling.value;
  if (/^\d+$/.test(content))
  {
    let pre_value = parseInt(content, 10) - 1;

    if(pre_value>=0)
      current_btn.nextElementSibling.value = pre_value;
  }

}
function handlePlusQuanity(current_btn)
{
  let content = current_btn.previousElementSibling.value;

  if (/^\d+$/.test(content))
  {
    let next_value = parseInt(current_btn.previousElementSibling.value, 10) + 1;
    current_btn.previousElementSibling.value = next_value;
  }

}

function handleAddProductToCart(event)
{
  let color;
  let size;
  let quanity = document.getElementsByClassName("input-quanity")[0].value;
  let id;

  let arr_btn_color = document.getElementsByClassName("btn-color")
  for (let i = 0; i < arr_btn_color.length; i++) {
    if(arr_btn_color[i].classList[1] == 'selected')
    {
      color = arr_btn_color[i].firstElementChild.nextElementSibling.innerHTML.trim();
      break;
    }
  }
  let arr_btn_size = document.getElementsByClassName("btn-size")
  for (let i = 0; i < arr_btn_size.length; i++) {
    if(arr_btn_size[i].classList[1] == 'selected')
    {
      size = arr_btn_size[i].firstElementChild.innerText.trim();
      break;
    }
  }

  if(color&&size&&quanity>0)
  {
    if(size=="L")
      id =1;
    else if(size=="XL")
      id =2;
    else if(size=="XXL")
      id =3;
    else if(size=="XXXL")
      id =4;

    const product = {
      id: id,
      picture_av: "img/Home/Ao_so_mi.png",
      name: "Áo Sơ Mi Dài Tay Kẻ Sọc Nam Mùa Xuân Đa Năng Áo Khoác Nam Mỏng Thường Ngày Rời Áo Sơ Mi",
      color: color,
      size: size,
      price: "118.000đ",
      quanity: quanity.toString()
    };

    fetch('/api/addProductToCart', {
      method: 'POST', // Phương thức POST
      headers: {
        'Content-Type': 'application/json' // Loại nội dung là JSON
      },
      body: JSON.stringify(product) // Chuyển đối tượng JavaScript thành chuỗi JSON
    })

    event.preventDefault()
    const modalElement = document.getElementById('exampleModal');
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }
}
function buyProduct()
{
  let price = parseFloat(document.getElementsByClassName("price")[0].innerHTML)*1000;
  let quanity = parseFloat(document.getElementsByClassName("input-quanity")[0].value);
  let priceSum = price*quanity;

  const baseUrl = "http://localhost:8080/api/payment";
  const params = {
    amount: priceSum.toString(),
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

