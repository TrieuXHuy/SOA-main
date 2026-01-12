package com.example.orderservice.controller;

import com.example.orderservice.model.ExportOrderDetail;
import com.example.orderservice.service.ExportOrderDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/export-order-details")
public class ExportOrderDetailController {

    @Autowired
    private ExportOrderDetailService detailService;

     @GetMapping("/{exportOrderID}")
    public List<ExportOrderDetail> getDetailsByExportOrderID(@PathVariable String exportOrderID) {
        return detailService.getDetailsByExportOrderID(exportOrderID);
    }

    @PostMapping
    public ExportOrderDetail saveOrderDetail(@RequestBody ExportOrderDetail detail) {
        detail.setExportOrderDetailID(UUID.randomUUID().toString());
        return detailService.saveOrderDetail(detail);
    }
}
