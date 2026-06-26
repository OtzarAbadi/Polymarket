package com.virtualmarket.polymarket.controller;

import com.virtualmarket.polymarket.dto.TradeRequest;
import com.virtualmarket.polymarket.dto.TradeResponse;
import com.virtualmarket.polymarket.entity.User;
import com.virtualmarket.polymarket.enums.UserRole;
import com.virtualmarket.polymarket.service.TradeService;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

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
    public List<TradeResponse> getTradesByUser(@PathVariable Long userId, Authentication authentication) {
        User currentUser = getCurrentUser(authentication);
        if (!currentUser.getId().equals(userId) && currentUser.getRole() != UserRole.ADMIN) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Cannot access another user's trades");
        }

        return tradeService.getTradesByUser(userId);
    }

    @GetMapping("/me")
    public List<TradeResponse> getMyTrades(Authentication authentication) {
        User currentUser = getCurrentUser(authentication);
        return tradeService.getTradesByUser(currentUser.getId());
    }

    @GetMapping("/by-market/{marketId}")
    public List<TradeResponse> getTradesByMarket(@PathVariable Long marketId) {
        return tradeService.getTradesByMarket(marketId);
    }

    private User getCurrentUser(Authentication authentication) {
        if (authentication == null || !(authentication.getPrincipal() instanceof User user)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Authentication is required");
        }
        return user;
    }
}
