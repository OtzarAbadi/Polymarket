package com.virtualmarket.polymarket.service;

import com.virtualmarket.polymarket.dto.DashboardSummaryResponse;
import com.virtualmarket.polymarket.dto.MarketStatisticsResponse;
import com.virtualmarket.polymarket.entity.Market;
import com.virtualmarket.polymarket.entity.Position;
import com.virtualmarket.polymarket.entity.User;
import com.virtualmarket.polymarket.enums.MarketStatus;
import com.virtualmarket.polymarket.repository.MarketRepository;
import com.virtualmarket.polymarket.repository.PositionRepository;
import com.virtualmarket.polymarket.repository.TradeRepository;
import com.virtualmarket.polymarket.repository.WalletRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

@Service
public class StatisticsService {

    private static final int MONEY_SCALE = 4;

    private final MarketRepository marketRepository;
    private final TradeRepository tradeRepository;
    private final WalletRepository walletRepository;
    private final PositionRepository positionRepository;

    public StatisticsService(
            MarketRepository marketRepository,
            TradeRepository tradeRepository,
            WalletRepository walletRepository,
            PositionRepository positionRepository
    ) {
        this.marketRepository = marketRepository;
        this.tradeRepository = tradeRepository;
        this.walletRepository = walletRepository;
        this.positionRepository = positionRepository;
    }

    @Transactional(readOnly = true)
    public MarketStatisticsResponse getMarketStatistics(Long marketId) {
        Market market = marketRepository.findById(marketId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Market not found"));

        return new MarketStatisticsResponse(
                market.getId(),
                tradeRepository.countByMarketId(marketId),
                normalizeMoney(tradeRepository.sumTotalCostByMarketId(marketId)),
                normalizeMoney(market.getLiquidity()),
                tradeRepository.countDistinctUsersByMarketId(marketId)
        );
    }

    @Transactional(readOnly = true)
    public DashboardSummaryResponse getDashboardSummary(User user) {
        BigDecimal walletBalance = walletRepository.findByUser(user)
                .map(wallet -> normalizeMoney(wallet.getBalance()))
                .orElse(BigDecimal.ZERO.setScale(MONEY_SCALE, RoundingMode.HALF_UP));

        List<Position> openPositions = positionRepository.findByUser(user).stream()
                .filter(position -> position.getQuantity() != null)
                .filter(position -> position.getQuantity().compareTo(BigDecimal.ZERO) > 0)
                .toList();

        BigDecimal positionsValue = openPositions.stream()
                .map(this::calculatePositionValue)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        return new DashboardSummaryResponse(
                marketRepository.countByStatus(MarketStatus.OPEN),
                marketRepository.count(),
                walletBalance,
                normalizeMoney(walletBalance.add(positionsValue)),
                tradeRepository.countByUser(user),
                openPositions.size()
        );
    }

    private BigDecimal calculatePositionValue(Position position) {
        BigDecimal quantity = position.getQuantity() == null ? BigDecimal.ZERO : position.getQuantity();
        BigDecimal currentPrice = position.getOutcome().getCurrentPrice() == null
                ? BigDecimal.ZERO
                : position.getOutcome().getCurrentPrice();

        return quantity.multiply(currentPrice);
    }

    private BigDecimal normalizeMoney(BigDecimal value) {
        return value.setScale(MONEY_SCALE, RoundingMode.HALF_UP);
    }
}
