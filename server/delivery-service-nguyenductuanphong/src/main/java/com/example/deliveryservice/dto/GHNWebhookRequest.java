package com.example.deliveryservice.dto;

public class GHNWebhookRequest {
    private String Type; // Create, Switch_status, Update_weight, Update_cod, Update_fee
    private String OrderCode;
    private String ClientOrderCode;
    private Integer Status;
    private String StatusName;
    private Integer Weight;
    private Integer CODAmount;
    private Integer Fee;
    private String Reason;
    private String ReasonCode;
    private String Time;
    private String Warehouse;
    private String CreateDate;
    private String CurrentWarehouse;
    private String ReturnInfo;

    // Getters and Setters
    public String getType() {
        return Type;
    }

    public void setType(String type) {
        Type = type;
    }

    public String getOrderCode() {
        return OrderCode;
    }

    public void setOrderCode(String orderCode) {
        OrderCode = orderCode;
    }

    public String getClientOrderCode() {
        return ClientOrderCode;
    }

    public void setClientOrderCode(String clientOrderCode) {
        ClientOrderCode = clientOrderCode;
    }

    public Integer getStatus() {
        return Status;
    }

    public void setStatus(Integer status) {
        Status = status;
    }

    public String getStatusName() {
        return StatusName;
    }

    public void setStatusName(String statusName) {
        StatusName = statusName;
    }

    public Integer getWeight() {
        return Weight;
    }

    public void setWeight(Integer weight) {
        Weight = weight;
    }

    public Integer getCODAmount() {
        return CODAmount;
    }

    public void setCODAmount(Integer codAmount) {
        CODAmount = codAmount;
    }

    public Integer getFee() {
        return Fee;
    }

    public void setFee(Integer fee) {
        Fee = fee;
    }

    public String getReason() {
        return Reason;
    }

    public void setReason(String reason) {
        Reason = reason;
    }

    public String getReasonCode() {
        return ReasonCode;
    }

    public void setReasonCode(String reasonCode) {
        ReasonCode = reasonCode;
    }

    public String getTime() {
        return Time;
    }

    public void setTime(String time) {
        Time = time;
    }

    public String getWarehouse() {
        return Warehouse;
    }

    public void setWarehouse(String warehouse) {
        Warehouse = warehouse;
    }

    public String getCreateDate() {
        return CreateDate;
    }

    public void setCreateDate(String createDate) {
        CreateDate = createDate;
    }

    public String getCurrentWarehouse() {
        return CurrentWarehouse;
    }

    public void setCurrentWarehouse(String currentWarehouse) {
        CurrentWarehouse = currentWarehouse;
    }

    public String getReturnInfo() {
        return ReturnInfo;
    }

    public void setReturnInfo(String returnInfo) {
        ReturnInfo = returnInfo;
    }
}

