package DATH_CNPM.WEB.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.List;
import java.util.Map;

@Service
public class ProductService {

    @Autowired
    private RestTemplate restTemplate;

    private static final String API_URL = "http://localhost:8083/products";

    public List<Map<String, Object>> getAllProducts() {
        // Gọi API và nhận dữ liệu dưới dạng JSON
        String response = restTemplate.getForObject(API_URL, String.class);

        // Chuyển đổi JSON thành List<Map<String, Object>>
        ObjectMapper mapper = new ObjectMapper();
        List<Map<String, Object>> products = null;
        try {
            products = mapper.readValue(response, new TypeReference<List<Map<String, Object>>>(){});
        } catch (Exception e) {
            e.printStackTrace();
        }
        return products;
    }
}
