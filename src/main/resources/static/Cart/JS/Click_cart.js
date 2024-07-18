function handleMinusQuanity(current_btn)
{
  let content = current_btn.nextElementSibling.value;

  if (/^\d+$/.test(content))
  {
    let pre_value = parseInt(content, 10) - 1;

    if(pre_value>=0)
    {
      current_btn.nextElementSibling.value = pre_value;
      caculateItemPriceSum(current_btn.parentElement.parentElement.parentElement)
      caculateAllItemPriceSum();
    }
  }
}
function handlePlusQuanity(current_btn)
{
  let content = current_btn.previousElementSibling.value;

  if (/^\d+$/.test(content))
  {
    let next_value = parseInt(current_btn.previousElementSibling.value, 10) + 1;
    current_btn.previousElementSibling.value = next_value;
    caculateItemPriceSum(current_btn.parentElement.parentElement.parentElement)
    caculateAllItemPriceSum();
  }
}
function deleteGroupItemRow(current_btn)
{
  current_btn.parentElement.parentElement.parentElement.remove();
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
