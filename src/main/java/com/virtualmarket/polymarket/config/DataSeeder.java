package com.virtualmarket.polymarket.config;

import com.virtualmarket.polymarket.dto.CreateMarketRequest;
import com.virtualmarket.polymarket.entity.User;
import com.virtualmarket.polymarket.enums.UserRole;
import com.virtualmarket.polymarket.repository.MarketRepository;
import com.virtualmarket.polymarket.repository.UserRepository;
import com.virtualmarket.polymarket.repository.WalletRepository;
import com.virtualmarket.polymarket.service.MarketService;
import com.virtualmarket.polymarket.service.WalletService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Component
public class DataSeeder implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(DataSeeder.class);

    private static final String ADMIN_USERNAME = "admin";
    private static final String ADMIN_EMAIL = "admin@polymarket.com";
    private static final String ADMIN_PASSWORD = "admin123";

    private final UserRepository userRepository;
    private final WalletRepository walletRepository;
    private final WalletService walletService;
    private final MarketRepository marketRepository;
    private final MarketService marketService;
    private final PasswordEncoder passwordEncoder;

    public DataSeeder(
            UserRepository userRepository,
            WalletRepository walletRepository,
            WalletService walletService,
            MarketRepository marketRepository,
            MarketService marketService,
            PasswordEncoder passwordEncoder
    ) {
        this.userRepository = userRepository;
        this.walletRepository = walletRepository;
        this.walletService = walletService;
        this.marketRepository = marketRepository;
        this.marketService = marketService;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional
    public void run(String... args) {
        User admin = ensureAdminUser();

        logger.info("Admin user ready: id={}, username={}, role={}",
                admin.getId(),
                admin.getUsername(),
                admin.getRole());

        if (marketRepository.count() == 0) {
            marketService.createMarket(sampleMarketRequest(admin.getId()));
            logger.info("Sample market created for local testing");
        }
    }

    private User ensureAdminUser() {
        return userRepository.findFirstByRole(UserRole.ADMIN)
                .orElseGet(this::createDefaultAdmin);
    }

    private User createDefaultAdmin() {
        User admin = userRepository.findByUsername(ADMIN_USERNAME)
                .or(() -> userRepository.findByEmail(ADMIN_EMAIL))
                .orElseGet(User::new);

        if (admin.getUsername() == null) {
            admin.setUsername(ADMIN_USERNAME);
        }
        if (admin.getEmail() == null) {
            admin.setEmail(ADMIN_EMAIL);
        }
        admin.setPasswordHash(passwordEncoder.encode(ADMIN_PASSWORD));
        admin.setRole(UserRole.ADMIN);

        User savedAdmin = userRepository.save(admin);
        if (walletRepository.findByUserId(savedAdmin.getId()).isEmpty()) {
            walletService.createWalletForUser(savedAdmin);
        }
        return savedAdmin;
    }

    private CreateMarketRequest sampleMarketRequest(Long adminUserId) {
        CreateMarketRequest request = new CreateMarketRequest();
        request.setAdminUserId(adminUserId);
        request.setTitle("Will BTC close above $100,000 by end of 2026?");
        request.setDescription("Resolves YES if BTC/USD closes above $100,000 by the end of 2026.");
        request.setCategory("Crypto");
        request.setTradingCloseDate(LocalDateTime.of(2026, 12, 31, 23, 59));
        request.setResolutionDate(LocalDateTime.of(2027, 1, 1, 12, 0));
        request.setResolutionSource("CoinMarketCap");
        request.setLiquidity(new BigDecimal("100.00"));
        return request;
    }
}
