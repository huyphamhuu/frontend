fetch('/api/getCart')
  .then(response => {
    return response.json();
  })
  .then(data => {

    let products = data.map(item => ({
      id: item.id,
      picture_av: item.picture_av,
      name: item.name,
      color: item.color,
      size: item.size,
      price: item.price,
      quanity: item.quanity
    }));

    let list_group_item = document.getElementById("list-group-item")

    for (const product of products) {

      let group_item =  document.createElement('div');
      group_item.setAttribute("class", "group-item-row")
      group_item.setAttribute("id", product.id)

      group_item.innerHTML = `
          <div class="space"></div>
      
          <div class="item-row">
              <div class="item-check">
                  <input type="checkbox" onclick="handleItemCheckbox(this)">
              </div>
              <div class="item-product">
                  <div class="picture">
                      <a href="Item_detail_1">
                          <img src="${product.picture_av}" alt="">
                      </a>
                  </div>
                  <div class="name">
                      <a href="Item_detail_1">
                          ${product.name}
                      </a>
                  </div>
              </div>
              <div class="item-style">
                  <button type="button" class="btn-item-style" onclick="handleDropdownBtnItemStyle(this)">
                      <div class="dropdown-item-style">
                          Phân loại hàng:&nbsp;&nbsp;
                          <i class="fa-solid fa-caret-down"></i>
                      </div>
                      <div class="text-item-style">
                          ${product.color}, ${product.size}
                      </div>
                  </button>
              </div>
              <div class="item-pirce_each_product">
                  ${product.price}
              </div>
              <div class="item-quanity">
                  <div class="group-btn-quanity">
                      <buton class="btn-quanity" onclick="handleMinusQuanity(this)">
                          <div class="text-quanity">
                              -
                          </div>
                      </buton>
      
                      <input class="input-quanity" type="text" value="${product.quanity}" oninput="handleInputQuanity(this.parentElement.parentElement.parentElement)">
      
                      <buton class="btn-quanity" onclick="handlePlusQuanity(this)">
                          <div class="text-quanity">
                              +
                          </div>
                      </buton>
                  </div>
              </div>
              <div class="item-pirce_sum">
                  0đ
              </div>
              <div class="item-operate">
                  <buton class="btn-operate" onclick="deleteGroupItemRow(this)">
                      Xóa
                  </buton>
              </div>
          </div>
      `;

      list_group_item.appendChild(group_item)
      caculateItemPriceSum(group_item.children[1])

    }
  })

