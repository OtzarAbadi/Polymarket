package com.virtualmarket.polymarket.controller;

import com.virtualmarket.polymarket.service.RealTimeEventService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RestController
@RequestMapping("/api/events")
@Tag(name = "Real-time Events", description = "Server-Sent Events for live application updates")
public class EventStreamController {

    private final RealTimeEventService realTimeEventService;

    public EventStreamController(RealTimeEventService realTimeEventService) {
        this.realTimeEventService = realTimeEventService;
    }

    @GetMapping(value = "/stream", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    @Operation(summary = "Subscribe to the real-time SSE stream")
    public SseEmitter streamEvents() {
        return realTimeEventService.connect();
    }
}
