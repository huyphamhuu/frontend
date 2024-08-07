// getAllProduct
let currentScript = document.getElementById("CRUD");
let page = currentScript.getAttribute("data-page"); //Các thuộc tính có thể đặt tên tùy ý
let category = currentScript.getAttribute("data-type");
let gender = currentScript.getAttribute("data-user-gender");
let keyword = currentScript.getAttribute("data-keyword");
function addCardToCards(product) {
  const cardsContainer = document.getElementById('cards');

  // Mẫu nội dung của thẻ card
  const cardHTML = `
            <a class="card-link" href="Item_detail_${product.id}">
                <div class="img">
                    <img src="${product.picture_av}" class="card-img-top" alt="...">
                </div>
                <div class="card-body">
                    <p class="card-text">${product.name}</p>
                </div>
            </a>
    `;

  const newCard = document.createElement('div');
  newCard.className = 'card';
  newCard.innerHTML = cardHTML;

  cardsContainer.appendChild(newCard);
}

fetch('Home/DB/Product.json')
  .then(response => {
    return response.json();
  })
  .then(data => {

    let products = data.map(item => ({
      id: item.id,
      name: item.name,
      gender: item.gender,
      category: item.category,
      picture_av: item.picture_av
    }));
    //Loc sản phẩm
    if(category)
        products = products.filter(product => (product.category===category && product.gender===gender)); // 3 dấu bằng để tránh js tự động ép kiểu khi so sánh
    else if(keyword)
    {
      document.getElementsByClassName("form-control")[0].value = keyword

      //Giả sử keyword không bị nhập sai chính tả
      let arrStandardKeyword = keyword.trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().match(/\b\w+\b/g)
      //Bubble sort
      let n = 0;
      let swapped;
      // Các if(products.length>1) để tránh khi xóa chỉ còn 1 object nếu xét bình thường sẽ bị lỗi
      do {
        swapped = false;
        // So sánh và hoán đổi các phần tử kề nhau
        for (let i = products.length - 1; i > n; i--) {

          let compatibleNumber2 = 0;
          let compatibleNumber1 = 0;
          let arrStandardKeywordP2 = products[i-1].name.trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().match(/\b\w+\b/g);
          let arrStandardKeywordP1
          if(products.length>1)
            arrStandardKeywordP1 = products[i].name.trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().match(/\b\w+\b/g);

          for (let j = 0; j < arrStandardKeyword.length; j++)
          {
            for(let k = 0; k < arrStandardKeywordP2.length; k++)
              if(arrStandardKeyword[j]===arrStandardKeywordP2[k])
                compatibleNumber2++;

            if(products.length>1)
            for(let k = 0; k < arrStandardKeywordP1.length; k++)
              if(arrStandardKeyword[j]===arrStandardKeywordP1[k])
                compatibleNumber1++;
          }

          if(compatibleNumber1===0&&compatibleNumber2===0) //Trường hợp này chỉ xảy ra khi i+1 nó không có object nào
          {
            if(products.length===3)
              i++;
            if(products.length>1)
            products.splice(i, 1);
            products.splice(i-1, 1);
            i--;
          }
          else if(compatibleNumber1===0) //Trường hợp này chỉ xảy ra khi i+1 nó không có object nào
          {
            if (products.length > 1)
              products.splice(i, 1);
          }
          else if(compatibleNumber2===0) //Trường hợp này xảy ra khi i+1 nó không hoặc có có object
              products.splice(i-1, 1);
          else if (compatibleNumber1 > compatibleNumber2)
          {
            // Hoán đổi
            [products[i], products[i - 1]] = [products[i - 1], products[i]];
            swapped = true;
          }
        }
        // Giảm kích thước mảng chưa được sắp xếp
        n++;
      } while (swapped);
    }

    let pagingNumber = products.length / 20;
    page = parseInt(page, 10)
    if(!page) page =1;
      // Xử lý khi trang cuối không đủ 20 sản phẩm nếu để i<20*page trong vòng lặp for sẽ lỗi
      let maxi;
      if(Math.ceil(pagingNumber)===page||Math.ceil(pagingNumber)===1)
        maxi = products.length
        else
          maxi = 20*page;

      for (let i = 20*(page-1); i < maxi; i++) {
        addCardToCards(products[i]);
      }

    for (let i = 1; i <= Math.ceil(pagingNumber); i++) {

      let pageItems = document.getElementsByClassName("page-item")
      let paginationNextButton = pageItems[pageItems.length - 1]

      const newPaginationNumber = document.createElement('li');
      newPaginationNumber.className = 'page-item';

      // Dùng href thay vì fetch để SEO, vì nếu dùng fetch google sẽ không lập chỉ mục các sản phẩm của trang sau
      // nên các sản phẩm trang sau sẽ không hiện khi tìm kiếm trên google
      if(category)
        newPaginationNumber.innerHTML = `<a class="page-link" href="/search?category=${encodeURIComponent(category)}&gender=${encodeURIComponent(gender)}&page=${i}">${i}</a>`;
      else if(keyword)
        newPaginationNumber.innerHTML = `<a class="page-link" href="/search?keyword=${encodeURIComponent(keyword)}&page=${i}">${i}</a>`;
      else
      newPaginationNumber.innerHTML = `<a class="page-link" href="/search?page=${i}">${i}</a>`;

      if(page===i)
        newPaginationNumber.classList.add('active');

      paginationNextButton.parentNode.insertBefore(newPaginationNumber, paginationNextButton)
    }

  })

