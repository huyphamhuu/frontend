package DATH_CNPM.WEB.Controller.Fe;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class Item_detail {
    @GetMapping("/Item_detail")
    public String toItemDetail()
    {
        return "Item_detail.html";
    }

    @GetMapping("/Cart")
    public String toCart()
    {
        return "Cart.html";
    }

    @GetMapping("/test")
    public String text()
    {
        return "test.html";
    }
}
