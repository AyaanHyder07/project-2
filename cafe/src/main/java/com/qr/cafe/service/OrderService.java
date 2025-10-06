package com.qr.cafe.service;

import com.qr.cafe.dto.OrderDTO;
import com.qr.cafe.dto.OrderItemDTO;
import com.qr.cafe.entity.MenuItem;
import com.qr.cafe.entity.Order;
import com.qr.cafe.entity.OrderItem;
import com.qr.cafe.repository.MenuItemRepository;
import com.qr.cafe.repository.OrderRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private MenuItemRepository menuItemRepository;

    @Transactional // Ensures the whole operation is one transaction
    public Order placeOrder(OrderDTO orderDTO) {
        Order order = new Order();
        order.setTableNumber(orderDTO.getTableNumber());
        order.setCustomerName(orderDTO.getCustomerName());
        order.setCustomerPhone(orderDTO.getCustomerPhone());
        order.setNotes(orderDTO.getNotes());

        for (OrderItemDTO itemDTO : orderDTO.getItems()) {
            MenuItem menuItem = menuItemRepository.findById(itemDTO.getMenuItemId())
                    .orElseThrow(() -> new EntityNotFoundException("MenuItem not found with id: " + itemDTO.getMenuItemId()));

            OrderItem orderItem = new OrderItem();
            orderItem.setMenuItem(menuItem);

            orderItem.setQuantity(itemDTO.getQuantity());

            order.addItem(orderItem); // The helper method in Order entity links them
        }

        return orderRepository.save(order);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAllByOrderByOrderTimeDesc();
    }
}