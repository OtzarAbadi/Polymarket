package com.virtualmarket.polymarket.controller;

import com.virtualmarket.polymarket.dto.TradeRequest;
import com.virtualmarket.polymarket.dto.TradeResponse;
import com.virtualmarket.polymarket.service.TradeService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/trades")
public class TradeController {

    private final TradeService tradeService;

    public TradeController(TradeService tradeService) {
        this.tradeService = tradeService;
    }

    @PostMapping
    public TradeResponse executeTrade(@RequestBody TradeRequest request) {
        return tradeService.executeTrade(request);
    }

    @GetMapping("/by-user/{userId}")
    public List<TradeResponse> getTradesByUser(@PathVariable Long userId) {
        return tradeService.getTradesByUser(userId);
    }

    @GetMapping("/by-market/{marketId}")
    public List<TradeResponse> getTradesByMarket(@PathVariable Long marketId) {
        return tradeService.getTradesByMarket(marketId);
    }
}
