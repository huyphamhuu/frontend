package DATH_CNPM.WEB.Model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
@AllArgsConstructor

public class Product {
    @JsonProperty("id")
    private int id;
    @JsonProperty("picture_av")
    private String picture_av;
    @JsonProperty("name")
    private String name;
    @JsonProperty("color")
    private String color;
    @JsonProperty("size")
    private String size;
    @JsonProperty("price")
    private String price;
    @JsonProperty("quanity")
    private int quanity;
    public Product() {}

    @Override
    public String toString() {
        return "Product{" +
                "id=" + id +
                ", picture_av='" + picture_av + '\'' +
                ", name='" + name + '\'' +
                ", color='" + color + '\'' +
                ", size='" + size + '\'' +
                ", price='" + price + '\'' +
                ", quanity=" + quanity +
                '}';
    }
}

