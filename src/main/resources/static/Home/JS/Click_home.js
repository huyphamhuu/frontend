function findProductByKeywords(current_btn, event)
{
  event.preventDefault()
  window.location.href = "/search?keyword=" + encodeURIComponent(current_btn.previousElementSibling.value);
}
