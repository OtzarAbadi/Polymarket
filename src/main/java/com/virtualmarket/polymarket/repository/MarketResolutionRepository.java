package com.virtualmarket.polymarket.repository;

import com.virtualmarket.polymarket.entity.Market;
import com.virtualmarket.polymarket.entity.MarketResolution;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MarketResolutionRepository extends JpaRepository<MarketResolution, Long> {
    Optional<MarketResolution> findByMarket(Market market);
}
