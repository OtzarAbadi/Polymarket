package com.virtualmarket.polymarket.repository;

import com.virtualmarket.polymarket.entity.Market;
import com.virtualmarket.polymarket.entity.MarketOutcome;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MarketOutcomeRepository extends JpaRepository<MarketOutcome, Long> {
    List<MarketOutcome> findByMarket(Market market);

    Optional<MarketOutcome> findByMarketAndName(Market market, String name);
}
