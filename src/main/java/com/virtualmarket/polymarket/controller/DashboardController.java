package com.virtualmarket.polymarket.controller;

import com.virtualmarket.polymarket.dto.DashboardSummaryResponse;
import com.virtualmarket.polymarket.entity.User;
import com.virtualmarket.polymarket.service.StatisticsService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final StatisticsService statisticsService;

    public DashboardController(StatisticsService statisticsService) {
        this.statisticsService = statisticsService;
    }

    @GetMapping("/summary")
    public DashboardSummaryResponse getDashboardSummary(Authentication authentication) {
        return statisticsService.getDashboardSummary((User) authentication.getPrincipal());
    }
}
