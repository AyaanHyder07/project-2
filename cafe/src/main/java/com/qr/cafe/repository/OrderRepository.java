package com.qr.cafe.repository;

import com.qr.cafe.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    // Custom query to get all orders, with the newest ones first
    List<Order> findAllByOrderByOrderTimeDesc();
}