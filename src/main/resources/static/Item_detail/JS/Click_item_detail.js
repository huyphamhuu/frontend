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

function handleAddProductToCart()
{

}


