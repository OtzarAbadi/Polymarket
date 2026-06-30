package com.virtualmarket.polymarket.controller;

import com.virtualmarket.polymarket.dto.LeaderboardResponse;
import com.virtualmarket.polymarket.service.LeaderboardService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/leaderboard")
@Tag(name = "Leaderboard", description = "Ranked participant performance")
public class LeaderboardController {

    private final LeaderboardService leaderboardService;

    public LeaderboardController(LeaderboardService leaderboardService) {
        this.leaderboardService = leaderboardService;
    }

    @GetMapping
    @Operation(summary = "Get the user leaderboard")
    public List<LeaderboardResponse> getLeaderboard() {
        return leaderboardService.getLeaderboard();
    }
}
