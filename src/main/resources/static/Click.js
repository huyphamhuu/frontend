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
  }
}
function deleteGroupItemRow(current_btn)
{
  current_btn.parentElement.parentElement.parentElement.remove();
}
function handleHeaderCheckbox()
{
  if(document.getElementsByClassName('header-check')[0].firstElementChild.checked=='')
  {
    console.log('123')
  }
}
