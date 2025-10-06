package com.qr.cafe.service;

import com.qr.cafe.entity.MenuItem;
import com.qr.cafe.repository.MenuItemRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class MenuService {

    @Autowired
    private MenuItemRepository menuItemRepository;

    public List<MenuItem> getAllMenuItems() {
        return menuItemRepository.findAll();
    }

    public List<MenuItem> getAvailableMenu() {
        return menuItemRepository.findByAvailableTrue();
    }

    public MenuItem addMenuItem(MenuItem menuItem) {
        return menuItemRepository.save(menuItem);
    }

    public MenuItem updateMenuItem(Long id, MenuItem menuItemDetails) {
        MenuItem menuItem = menuItemRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("MenuItem not found with id: " + id));

        menuItem.setName(menuItemDetails.getName());
        menuItem.setDescription(menuItemDetails.getDescription());
        menuItem.setPrice(menuItemDetails.getPrice());
        menuItem.setCategory(menuItemDetails.getCategory());
        menuItem.setAvailable(menuItemDetails.isAvailable());

        return menuItemRepository.save(menuItem);
    }
    
    public MenuItem toggleMenuItemAvailability(Long id) {
        MenuItem menuItem = menuItemRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("MenuItem not found with id: " + id));
        
        menuItem.setAvailable(!menuItem.isAvailable()); // Flip the availability status
        
        return menuItemRepository.save(menuItem);
    }

    public void deleteMenuItemById(Long id) {
        if (!menuItemRepository.existsById(id)) {
            throw new EntityNotFoundException("MenuItem not found with id: " + id);
        }
        menuItemRepository.deleteById(id);
    }
}