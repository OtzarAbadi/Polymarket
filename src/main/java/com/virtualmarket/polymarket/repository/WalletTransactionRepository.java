package com.virtualmarket.polymarket.repository;

import com.virtualmarket.polymarket.entity.User;
import com.virtualmarket.polymarket.entity.WalletTransaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WalletTransactionRepository extends JpaRepository<WalletTransaction, Long> {
    List<WalletTransaction> findByUser(User user);

    List<WalletTransaction> findByUserIdOrderByCreatedAtDesc(Long userId);
}
