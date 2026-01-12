package com.example.deliveryservice.dto;

public class GHNCreateOrderResponse {
    private Integer code;
    private String message;
    private GHNOrderData data;

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public GHNOrderData getData() {
        return data;
    }

    public void setData(GHNOrderData data) {
        this.data = data;
    }
}

