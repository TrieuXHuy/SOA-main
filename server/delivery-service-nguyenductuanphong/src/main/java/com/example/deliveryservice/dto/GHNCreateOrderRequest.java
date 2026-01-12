package com.example.deliveryservice.dto;

import java.util.List;

public class GHNCreateOrderRequest {
    private Integer payment_type_id;
    private String note;
    private String required_note;
    private String from_name;
    private String from_phone;
    private String from_address;
    private String from_ward_name;
    private String from_district_name;
    private String from_province_name;
    private String return_phone;
    private String return_address;
    private Integer return_district_id;
    private String return_ward_code;
    private String client_order_code;
    private String to_name;
    private String to_phone;
    private String to_address;
    private String to_ward_code;
    private String to_ward_name;
    private Integer to_district_id;
    private String to_district_name;
    private String to_province_name;
    private Integer cod_amount;
    private String content;
    private Integer weight;
    private Integer length;
    private Integer width;
    private Integer height;
    private Integer pick_station_id;
    private Integer deliver_station_id;
    private Integer insurance_value;
    private Integer service_id;
    private Integer service_type_id;
    private String coupon;
    private List<Integer> pick_shift;
    private List<GHNItem> items;

    // Getters and Setters
    public Integer getPayment_type_id() {
        return payment_type_id;
    }

    public void setPayment_type_id(Integer payment_type_id) {
        this.payment_type_id = payment_type_id;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public String getRequired_note() {
        return required_note;
    }

    public void setRequired_note(String required_note) {
        this.required_note = required_note;
    }

    public String getFrom_name() {
        return from_name;
    }

    public void setFrom_name(String from_name) {
        this.from_name = from_name;
    }

    public String getFrom_phone() {
        return from_phone;
    }

    public void setFrom_phone(String from_phone) {
        this.from_phone = from_phone;
    }

    public String getFrom_address() {
        return from_address;
    }

    public void setFrom_address(String from_address) {
        this.from_address = from_address;
    }

    public String getFrom_ward_name() {
        return from_ward_name;
    }

    public void setFrom_ward_name(String from_ward_name) {
        this.from_ward_name = from_ward_name;
    }

    public String getFrom_district_name() {
        return from_district_name;
    }

    public void setFrom_district_name(String from_district_name) {
        this.from_district_name = from_district_name;
    }

    public String getFrom_province_name() {
        return from_province_name;
    }

    public void setFrom_province_name(String from_province_name) {
        this.from_province_name = from_province_name;
    }

    public String getReturn_phone() {
        return return_phone;
    }

    public void setReturn_phone(String return_phone) {
        this.return_phone = return_phone;
    }

    public String getReturn_address() {
        return return_address;
    }

    public void setReturn_address(String return_address) {
        this.return_address = return_address;
    }

    public Integer getReturn_district_id() {
        return return_district_id;
    }

    public void setReturn_district_id(Integer return_district_id) {
        this.return_district_id = return_district_id;
    }

    public String getReturn_ward_code() {
        return return_ward_code;
    }

    public void setReturn_ward_code(String return_ward_code) {
        this.return_ward_code = return_ward_code;
    }

    public String getClient_order_code() {
        return client_order_code;
    }

    public void setClient_order_code(String client_order_code) {
        this.client_order_code = client_order_code;
    }

    public String getTo_name() {
        return to_name;
    }

    public void setTo_name(String to_name) {
        this.to_name = to_name;
    }

    public String getTo_phone() {
        return to_phone;
    }

    public void setTo_phone(String to_phone) {
        this.to_phone = to_phone;
    }

    public String getTo_address() {
        return to_address;
    }

    public void setTo_address(String to_address) {
        this.to_address = to_address;
    }

    public String getTo_ward_code() {
        return to_ward_code;
    }

    public void setTo_ward_code(String to_ward_code) {
        this.to_ward_code = to_ward_code;
    }

    public Integer getTo_district_id() {
        return to_district_id;
    }

    public void setTo_district_id(Integer to_district_id) {
        this.to_district_id = to_district_id;
    }

    public String getTo_ward_name() {
        return to_ward_name;
    }

    public void setTo_ward_name(String to_ward_name) {
        this.to_ward_name = to_ward_name;
    }

    public String getTo_district_name() {
        return to_district_name;
    }

    public void setTo_district_name(String to_district_name) {
        this.to_district_name = to_district_name;
    }

    public String getTo_province_name() {
        return to_province_name;
    }

    public void setTo_province_name(String to_province_name) {
        this.to_province_name = to_province_name;
    }

    public Integer getCod_amount() {
        return cod_amount;
    }

    public void setCod_amount(Integer cod_amount) {
        this.cod_amount = cod_amount;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Integer getWeight() {
        return weight;
    }

    public void setWeight(Integer weight) {
        this.weight = weight;
    }

    public Integer getLength() {
        return length;
    }

    public void setLength(Integer length) {
        this.length = length;
    }

    public Integer getWidth() {
        return width;
    }

    public void setWidth(Integer width) {
        this.width = width;
    }

    public Integer getHeight() {
        return height;
    }

    public void setHeight(Integer height) {
        this.height = height;
    }

    public Integer getPick_station_id() {
        return pick_station_id;
    }

    public void setPick_station_id(Integer pick_station_id) {
        this.pick_station_id = pick_station_id;
    }

    public Integer getDeliver_station_id() {
        return deliver_station_id;
    }

    public void setDeliver_station_id(Integer deliver_station_id) {
        this.deliver_station_id = deliver_station_id;
    }

    public Integer getInsurance_value() {
        return insurance_value;
    }

    public void setInsurance_value(Integer insurance_value) {
        this.insurance_value = insurance_value;
    }

    public Integer getService_id() {
        return service_id;
    }

    public void setService_id(Integer service_id) {
        this.service_id = service_id;
    }

    public Integer getService_type_id() {
        return service_type_id;
    }

    public void setService_type_id(Integer service_type_id) {
        this.service_type_id = service_type_id;
    }

    public String getCoupon() {
        return coupon;
    }

    public void setCoupon(String coupon) {
        this.coupon = coupon;
    }

    public List<Integer> getPick_shift() {
        return pick_shift;
    }

    public void setPick_shift(List<Integer> pick_shift) {
        this.pick_shift = pick_shift;
    }

    public List<GHNItem> getItems() {
        return items;
    }

    public void setItems(List<GHNItem> items) {
        this.items = items;
    }
}

