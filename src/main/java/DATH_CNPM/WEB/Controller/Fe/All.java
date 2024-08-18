package DATH_CNPM.WEB.Controller.Fe;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
public class All {
    @GetMapping("/search")
    public String toIndexPage(
            @RequestParam(name = "page", required = false) String page, // Không thể truyền defaultValue qua html thông qua thymleaf mà chỉ có tể dùng trong java
            @RequestParam(name = "category", required = false) String category,
            @RequestParam(name = "gender", required = false) String gender,
            @RequestParam(name = "keyword", required = false) String keyword,
            Model model
    ) {
        model.addAttribute("page", page);
        model.addAttribute("category", category);
        model.addAttribute("gender", gender);
        model.addAttribute("keyword", keyword);


        return "Index";
    }
//    @GetMapping("Item_detail_1")
//    public String toItemDetail() {
//        return "Item_detail.html";
//    }
    @GetMapping("/Item_detail_{id}")
    public String toItemDetail(@PathVariable("id") int id, Model model) {
        // Thêm id vào model để có thể sử dụng trong file HTML
        model.addAttribute("id", id);
        System.out.println(id);
        return "Item_detail"; // Trả về Item_detail.html
    }

    @GetMapping("/Cart")
    public String toCart()
    {
        return "Cart.html";
    }

    @GetMapping("/VNPayReturn")
    public String toVNPayReturn()
    {
        return "vnpay_return.html";
    }

    @GetMapping("/test")
    public String text()
    {
        return "test.html";
    }
    @GetMapping("/login")
    public String toLogin() {
        return "login.html"; // Trả về trang login.html
    }
    @GetMapping("/register")
    public String toRegister() {
        return "register.html"; // Trả về trang register.html
    }
}
