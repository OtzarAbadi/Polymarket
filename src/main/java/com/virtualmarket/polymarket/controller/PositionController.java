package com.virtualmarket.polymarket.controller;

import com.virtualmarket.polymarket.dto.PositionResponse;
import com.virtualmarket.polymarket.service.PositionService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/positions")
public class PositionController {

    private final PositionService positionService;

    public PositionController(PositionService positionService) {
        this.positionService = positionService;
    }

    @GetMapping("/user/{userId}")
    public List<PositionResponse> getUserPositions(@PathVariable Long userId) {
        return positionService.getUserPositions(userId);
    }

    @GetMapping("/market/{marketId}")
    public List<PositionResponse> getMarketPositions(@PathVariable Long marketId) {
        return positionService.getMarketPositions(marketId);
    }
}
