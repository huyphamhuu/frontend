function convertCart(current_btn)
{
  let arr_btn = current_btn.parentElement.children;

  for (var i = 0; i < arr_btn.length; i++) {

    classList = arr_btn[i].classList;

    if(classList[1] == 'selected')
    {
      arr_btn[i].style.border = '';
      classList.remove('selected');
      break;
    }
  }
}
