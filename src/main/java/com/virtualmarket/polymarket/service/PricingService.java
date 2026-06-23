package com.virtualmarket.polymarket.service;

import com.virtualmarket.polymarket.entity.Market;
import com.virtualmarket.polymarket.entity.MarketOutcome;
import com.virtualmarket.polymarket.entity.PriceHistory;
import com.virtualmarket.polymarket.repository.MarketOutcomeRepository;
import com.virtualmarket.polymarket.repository.PriceHistoryRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.math.RoundingMode;

import static org.springframework.http.HttpStatus.NOT_FOUND;
import java.util.List;

@Service
public class PricingService {

    private static final String YES_OUTCOME = "YES";
    private static final String NO_OUTCOME = "NO";
    private static final int PRICE_SCALE = 4;
    private static final BigDecimal MIN_PRICE = new BigDecimal("0.0100");
    private static final BigDecimal MAX_PRICE = new BigDecimal("0.9900");
    private static final BigDecimal TWO = new BigDecimal("2");

    private final MarketOutcomeRepository marketOutcomeRepository;
    private final PriceHistoryRepository priceHistoryRepository;

    public PricingService(
            MarketOutcomeRepository marketOutcomeRepository,
            PriceHistoryRepository priceHistoryRepository
    ) {
        this.marketOutcomeRepository = marketOutcomeRepository;
        this.priceHistoryRepository = priceHistoryRepository;
    }

    @Transactional
    public void updateMarketPrices(Market market) {
        MarketOutcome yesOutcome = findOutcome(market, YES_OUTCOME);
        MarketOutcome noOutcome = findOutcome(market, NO_OUTCOME);

        BigDecimal yesPrice = calculateYesPrice(market, yesOutcome, noOutcome);
        BigDecimal noPrice = calculateNoPrice(yesPrice);

        yesOutcome.setCurrentPrice(yesPrice);
        noOutcome.setCurrentPrice(noPrice);


        marketOutcomeRepository.saveAll(List.of(yesOutcome, noOutcome));

        PriceHistory priceHistory = new PriceHistory();
        priceHistory.setMarket(market);
        priceHistory.setYesPrice(yesPrice);
        priceHistory.setNoPrice(noPrice);
        priceHistoryRepository.save(priceHistory);
    }

    @Transactional(readOnly = true)
    public BigDecimal calculateYesPrice(Market market) {
        MarketOutcome yesOutcome = findOutcome(market, YES_OUTCOME);
        MarketOutcome noOutcome = findOutcome(market, NO_OUTCOME);
        return calculateYesPrice(market, yesOutcome, noOutcome);
    }

    @Transactional(readOnly = true)
    public BigDecimal calculateNoPrice(Market market) {
        return calculateNoPrice(calculateYesPrice(market));
    }

    private BigDecimal calculateYesPrice(
            Market market,
            MarketOutcome yesOutcome,
            MarketOutcome noOutcome
    ) {
        BigDecimal liquidity = market.getLiquidity();
        BigDecimal numerator = yesOutcome.getShares().add(liquidity);
        BigDecimal denominator = yesOutcome.getShares()
                .add(noOutcome.getShares())
                .add(liquidity.multiply(TWO));

        BigDecimal yesPrice = numerator.divide(denominator, PRICE_SCALE, RoundingMode.HALF_UP);
        return limitPrice(yesPrice);
    }

    private BigDecimal calculateNoPrice(BigDecimal yesPrice) {
        return BigDecimal.ONE
                .subtract(yesPrice)
                .setScale(PRICE_SCALE, RoundingMode.HALF_UP);
    }

    private BigDecimal limitPrice(BigDecimal price) {
        if (price.compareTo(MIN_PRICE) < 0) {
            return MIN_PRICE;
        }
        if (price.compareTo(MAX_PRICE) > 0) {
            return MAX_PRICE;
        }
        return price.setScale(PRICE_SCALE, RoundingMode.HALF_UP);
    }

    private MarketOutcome findOutcome(Market market, String outcomeName) {
        return marketOutcomeRepository.findByMarketAndName(market, outcomeName)
                .orElseThrow(() -> new ResponseStatusException(
                        NOT_FOUND,
                        outcomeName + " outcome not found"
                ));
    }
}
