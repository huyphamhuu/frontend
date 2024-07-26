package DATH_CNPM.WEB.Model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ResponseObject {

    private String status;
    private String message;
    private String url;
}
