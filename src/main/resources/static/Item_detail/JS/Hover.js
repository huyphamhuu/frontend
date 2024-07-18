function handleHover(current_btn)
{
  let src
  if(current_btn.classList[0] == 'btn-photo-list')
  {
    convertItemDetail(current_btn);
    current_btn.style.border = 'red solid 2px';
    current_btn.classList.add('selected');
    src = current_btn.firstElementChild.getAttribute('src')
  }
  else
  {
    let old_src = document.getElementsByClassName('screen')[0].firstElementChild.getAttribute('src');
    current_btn.setAttribute('onmouseout','outRangeBtn(this,"' + old_src + '")');

    src = current_btn.firstElementChild.firstElementChild.getAttribute('src');
  }

  document.getElementsByClassName('screen')[0].firstElementChild.setAttribute('src', src);
}
