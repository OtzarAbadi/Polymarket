package com.virtualmarket.polymarket.controller;

import com.virtualmarket.polymarket.dto.CreateMarketRequest;
import com.virtualmarket.polymarket.dto.MarketResponse;
import com.virtualmarket.polymarket.service.MarketService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class MarketController {

    private final MarketService marketService;

    public MarketController(MarketService marketService) {
        this.marketService = marketService;
    }

    @PostMapping("/api/admin/markets")
    @ResponseStatus(HttpStatus.CREATED)
    public MarketResponse createMarket(@Valid @RequestBody CreateMarketRequest request) {
        return marketService.createMarket(request);
    }

    @GetMapping("/api/markets")
    public List<MarketResponse> getAllMarkets() {
        return marketService.getAllMarkets();
    }

    @GetMapping("/api/markets/{id}")
    public MarketResponse getMarketById(@PathVariable Long id) {
        return marketService.getMarketById(id);
    }
}
