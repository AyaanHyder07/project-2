package com.qr.cafe.controller;

import com.qr.cafe.dto.OrderDTO;
import com.qr.cafe.entity.Order;
import com.qr.cafe.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;
    
    @PostMapping("/place")
    public ResponseEntity<Order> placeOrder(@RequestBody OrderDTO orderDTO) {
        Order savedOrder = orderService.placeOrder(orderDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedOrder);
    }

    @GetMapping
    public ResponseEntity<List<Order>> getAllOrders() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }
}