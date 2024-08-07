package DATH_CNPM.WEB.Controller.Be;

import DATH_CNPM.WEB.Model.Product;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api")
public class Cart {
    @PostMapping("/addProductToCart")
    public void addProductToCart(@RequestBody Product product)
    {

        ObjectMapper objectMapper = new ObjectMapper();
        try {
            //readValue cần phải thêm constructor ko tham số và đánh dấu anotation cho thuộc tính
            // trong tệp Cart.json cần chừa [] để khi products vẫn hiểu sau khi lấy dữ liệu là chuỗi rỗng không bị exception
            List<Product> products = objectMapper.readValue(
                    new File("src/main/resources/static/Cart/DB/Cart.json"),
                    new TypeReference<List<Product>>() {}
            );

            if(!products.isEmpty())
            for (int i = 0; i < products.size(); i++) {

                if(product.getId() < products.get(i).getId())
                {
                    products.add(i, product);
                    break;
                }
                else if(products.get(i).getId() == product.getId())
                {
                    products.get(i).setQuanity(products.get(i).getQuanity() + product.getQuanity());
                    break;
                }
                else if(i==products.size()-1 && product.getId() > products.get(i).getId())
                {
                    products.add(product);
                    break;
                }
            }
            else
                products.add(product);

            // Chuyển đổi đối tượng thành JSON và ghi vào tệp
            objectMapper.writerWithDefaultPrettyPrinter().writeValue(new File("src/main/resources/static/Cart/DB/Cart.json"), products);
        }
        catch (IOException e)
        {
        }
    }
    @GetMapping("/getCart")
    public List<Product> getCart()
    {
        ObjectMapper objectMapper = new ObjectMapper();
        List<Product> products = null;
        try {
            //readValue cần phải thêm constructor ko tham số và đánh dấu anotation cho thuộc tính
            // trong tệp Cart.json cần chừa [] để khi products vẫn hiểu sau khi lấy dữ liệu là chuỗi rỗng không bị exception
            products = objectMapper.readValue(
                    new File("src/main/resources/static/Cart/DB/Cart.json"),
                    new TypeReference<List<Product>>() {}
            );
        }
        catch (IOException e)
        {
        }
        return products;
    }

    @PostMapping("/deleteProduct")
    public void deleteProduct(@RequestParam int id)
    {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            List<Product> products = objectMapper.readValue(
                    new File("src/main/resources/static/Cart/DB/Cart.json"),
                    new TypeReference<List<Product>>() {}
            );

            products.removeIf(product -> product.getId() == id);

            // Chuyển đổi đối tượng thành JSON và ghi vào tệp
            objectMapper.writerWithDefaultPrettyPrinter().writeValue(new File("src/main/resources/static/Cart/DB/Cart.json"), products);
        }
        catch (IOException e)
        {
        }
    }


}
