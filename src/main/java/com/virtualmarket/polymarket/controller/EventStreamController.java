package com.virtualmarket.polymarket.controller;

import com.virtualmarket.polymarket.service.RealTimeEventService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RestController
@RequestMapping("/api/events")
public class EventStreamController {

    private final RealTimeEventService realTimeEventService;

    public EventStreamController(RealTimeEventService realTimeEventService) {
        this.realTimeEventService = realTimeEventService;
    }

    @GetMapping(value = "/stream", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter streamEvents() {
        return realTimeEventService.connect();
    }
}
