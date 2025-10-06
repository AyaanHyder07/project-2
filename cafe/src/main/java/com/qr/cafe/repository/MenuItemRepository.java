package com.qr.cafe.repository;

import com.qr.cafe.entity.MenuItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface MenuItemRepository extends JpaRepository<MenuItem, Long> {

    // Custom query to find only the menu items marked as available
    List<MenuItem> findByAvailableTrue();
}