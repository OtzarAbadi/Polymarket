package com.virtualmarket.polymarket.service;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.support.TransactionSynchronization;
import org.springframework.transaction.support.TransactionSynchronizationManager;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CopyOnWriteArrayList;

@Service
public class RealTimeEventService {

    private static final long EMITTER_TIMEOUT_MILLIS = 30L * 60L * 1000L;

    private final List<SseEmitter> emitters = new CopyOnWriteArrayList<>();

    public SseEmitter connect() {
        SseEmitter emitter = new SseEmitter(EMITTER_TIMEOUT_MILLIS);
        emitters.add(emitter);

        emitter.onCompletion(() -> emitters.remove(emitter));
        emitter.onTimeout(() -> {
            emitters.remove(emitter);
            emitter.complete();
        });
        emitter.onError(error -> emitters.remove(emitter));

        sendToEmitter(emitter, "connected", Map.of("connectedAt", LocalDateTime.now()));
        return emitter;
    }

    public void publishAfterCommit(String eventName, Object payload) {
        if (TransactionSynchronizationManager.isSynchronizationActive()) {
            TransactionSynchronizationManager.registerSynchronization(new TransactionSynchronization() {
                @Override
                public void afterCommit() {
                    publish(eventName, payload);
                }
            });
            return;
        }

        publish(eventName, payload);
    }

    public void publish(String eventName, Object payload) {
        for (SseEmitter emitter : emitters) {
            sendToEmitter(emitter, eventName, payload);
        }
    }

    @Scheduled(fixedRate = 25000)
    public void sendHeartbeat() {
        publish("ping", Map.of("sentAt", LocalDateTime.now()));
    }

    private void sendToEmitter(SseEmitter emitter, String eventName, Object payload) {
        try {
            emitter.send(SseEmitter.event()
                    .name(eventName)
                    .data(payload));
        } catch (IOException | IllegalStateException ex) {
            emitters.remove(emitter);
            emitter.completeWithError(ex);
        }
    }
}
