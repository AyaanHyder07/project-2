package com.qr.cafe.controller;

import com.qr.cafe.entity.MenuItem;
import com.qr.cafe.service.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/menu")
public class MenuController {

    @Autowired
    private MenuService menuService;

    // For the customer page
    @GetMapping("/available")
    public ResponseEntity<List<MenuItem>> getAvailableMenu() {
        return ResponseEntity.ok(menuService.getAvailableMenu());
    }

    // For the admin panel
    @GetMapping("/all")
    public ResponseEntity<List<MenuItem>> getAllMenuItems() {
        return ResponseEntity.ok(menuService.getAllMenuItems());
    }

    @PostMapping
    public ResponseEntity<MenuItem> addMenuItem(@RequestBody MenuItem menuItem) {
        MenuItem savedItem = menuService.addMenuItem(menuItem);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedItem);
    }

    @PutMapping("/{id}")
    public ResponseEntity<MenuItem> updateMenuItem(@PathVariable Long id, @RequestBody MenuItem menuItem) {
        return ResponseEntity.ok(menuService.updateMenuItem(id, menuItem));
    }

    @PutMapping("/{id}/availability")
    public ResponseEntity<MenuItem> toggleAvailability(@PathVariable Long id) {
        return ResponseEntity.ok(menuService.toggleMenuItemAvailability(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMenuItem(@PathVariable Long id) {
        menuService.deleteMenuItemById(id);
        return ResponseEntity.noContent().build();
    }
}