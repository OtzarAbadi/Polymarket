package com.virtualmarket.polymarket.controller;

import com.virtualmarket.polymarket.dto.CreateMarketRequest;
import com.virtualmarket.polymarket.dto.MarketResponse;
import com.virtualmarket.polymarket.dto.ResolutionRequest;
import com.virtualmarket.polymarket.dto.ResolutionResponse;
import com.virtualmarket.polymarket.service.MarketResolutionService;
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
@RequestMapping("/api/markets")
public class MarketController {

    private final MarketService marketService;
    private final MarketResolutionService marketResolutionService;

    public MarketController(MarketService marketService, MarketResolutionService marketResolutionService) {
        this.marketService = marketService;
        this.marketResolutionService = marketResolutionService;
    }

    @PostMapping("/admin/markets")
    @ResponseStatus(HttpStatus.CREATED)
    public MarketResponse createMarket(@Valid @RequestBody CreateMarketRequest request) {
        return marketService.createMarket(request);
    }

    @GetMapping
    public List<MarketResponse> getAllMarkets() {
        return marketService.getAllMarkets();
    }

    @GetMapping("/{id}")
    public MarketResponse getMarketById(@PathVariable Long id) {
        return marketService.getMarketById(id);
    }

    @PostMapping("/resolve")
    public ResolutionResponse resolveMarket(@RequestBody ResolutionRequest request) {
        return marketResolutionService.resolveMarket(request);
    }
}
