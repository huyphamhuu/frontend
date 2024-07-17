function caculateItemPriceSum(current_btn)
{
  let quanity_string = current_btn.children[4].children[0].children[1].value;

  if (/^\d+$/.test(quanity_string))
  {
    let quanity_number=parseInt(quanity_string, 10)

    if (quanity_number >= 0)
    {
      let price_each_item = parseFloat(current_btn.children[3].innerHTML);
      let price_sum = price_each_item * quanity_number;
      current_btn.children[5].innerHTML = price_sum.toFixed(3) + 'đ';

      if( current_btn.children[5].innerHTML=='0.000đ')
        current_btn.children[5].innerHTML = '0đ'
    }
  }
}
