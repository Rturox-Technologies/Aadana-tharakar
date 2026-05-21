package com.nilaamnai.config;

import com.nilaamnai.entity.User;
import com.nilaamnai.entity.Profile;
import com.nilaamnai.entity.Agent;
import com.nilaamnai.entity.Builder;
import com.nilaamnai.entity.Property;
import com.nilaamnai.entity.PropertyImage;
import com.nilaamnai.enums.PropertyStatus;
import com.nilaamnai.enums.PropertyType;
import com.nilaamnai.enums.Role;
import com.nilaamnai.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final ProfileRepository profileRepository;
    private final AgentRepository agentRepository;
    private final BuilderRepository builderRepository;
    private final PropertyRepository propertyRepository;
    private final PropertyImageRepository propertyImageRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() > 0) {
            return;
        }

        String commonPassword = passwordEncoder.encode("Password123!");

        // 1. Create Admin
        User admin = User.builder()
                .email("admin@aadanam.com")
                .phone("9876543200")
                .passwordHash(commonPassword)
                .role(Role.ROLE_ADMIN)
                .isVerified(true)
                .build();
        admin = userRepository.save(admin);

        Profile adminProfile = Profile.builder()
                .user(admin)
                .fullName("Aadana Tharakar Admin")
                .avatarUrl("https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150")
                .bio("Administrator of the Aadana Tharakar (ஆதனத் தரகர்) Real Estate Platform.")
                .whatsappNumber("9876543200")
                .city("Chennai")
                .state("Tamil Nadu")
                .build();
        profileRepository.save(adminProfile);

        // 2. Create Agents
        User agentUser1 = User.builder()
                .email("chennai.agent@aadanam.com")
                .phone("9876543211")
                .passwordHash(commonPassword)
                .role(Role.ROLE_AGENT)
                .isVerified(true)
                .build();
        agentUser1 = userRepository.save(agentUser1);

        Profile agentProfile1 = Profile.builder()
                .user(agentUser1)
                .fullName("Rajesh Kumar")
                .avatarUrl("https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150")
                .bio("Specialist in premium apartments and commercial spaces in Chennai Metro.")
                .whatsappNumber("9876543211")
                .city("Chennai")
                .state("Tamil Nadu")
                .build();
        profileRepository.save(agentProfile1);

        Agent agent1 = Agent.builder()
                .user(agentUser1)
                .agencyName("Chennai Aadana Properties")
                .licenseNumber("REA-CH-2024-0091")
                .verified(true)
                .rating(4.8)
                .totalDeals(42)
                .build();
        agent1 = agentRepository.save(agent1);

        User agentUser2 = User.builder()
                .email("coimbatore.agent@aadanam.com")
                .phone("9876543212")
                .passwordHash(commonPassword)
                .role(Role.ROLE_AGENT)
                .isVerified(true)
                .build();
        agentUser2 = userRepository.save(agentUser2);

        Profile agentProfile2 = Profile.builder()
                .user(agentUser2)
                .fullName("Karthik Raja")
                .avatarUrl("https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150")
                .bio("Specialist in independent houses, villas, and farmhouses in Coimbatore region.")
                .whatsappNumber("9876543212")
                .city("Coimbatore")
                .state("Tamil Nadu")
                .build();
        profileRepository.save(agentProfile2);

        Agent agent2 = Agent.builder()
                .user(agentUser2)
                .agencyName("Kovai Tharakar Realty")
                .licenseNumber("REA-CBE-2024-0015")
                .verified(true)
                .rating(4.7)
                .totalDeals(31)
                .build();
        agent2 = agentRepository.save(agent2);

        // 3. Create Builders
        User builderUser1 = User.builder()
                .email("premium.builder@aadanam.com")
                .phone("9876543213")
                .passwordHash(commonPassword)
                .role(Role.ROLE_BUILDER)
                .isVerified(true)
                .build();
        builderUser1 = userRepository.save(builderUser1);

        Profile builderProfile1 = Profile.builder()
                .user(builderUser1)
                .fullName("Anand Vasudevan")
                .avatarUrl("https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150")
                .bio("Representative of Aadana Luxury Builders. Delivering premium housing projects in South India.")
                .whatsappNumber("9876543213")
                .city("Chennai")
                .state("Tamil Nadu")
                .build();
        profileRepository.save(builderProfile1);

        Builder builder1 = Builder.builder()
                .user(builderUser1)
                .companyName("Aadana Luxury Builders")
                .reraId("TN/RERA/0042/2023")
                .verified(true)
                .establishedYear(2012)
                .totalProjects(15)
                .build();
        builder1 = builderRepository.save(builder1);

        User builderUser2 = User.builder()
                .email("green.plots@aadanam.com")
                .phone("9876543214")
                .passwordHash(commonPassword)
                .role(Role.ROLE_BUILDER)
                .isVerified(true)
                .build();
        builderUser2 = userRepository.save(builderUser2);

        Profile builderProfile2 = Profile.builder()
                .user(builderUser2)
                .fullName("Suresh Moorthy")
                .avatarUrl("https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150")
                .bio("Representative of Tharakar Green Lands. Delivering certified premium plots.")
                .whatsappNumber("9876543214")
                .city("Madurai")
                .state("Tamil Nadu")
                .build();
        profileRepository.save(builderProfile2);

        Builder builder2 = Builder.builder()
                .user(builderUser2)
                .companyName("Tharakar Green Lands & Developer")
                .reraId("TN/RERA/0098/2022")
                .verified(true)
                .establishedYear(2018)
                .totalProjects(8)
                .build();
        builder2 = builderRepository.save(builder2);

        // 4. Create Properties
        
        // Property 1: Apartment in Chennai
        Property p1 = Property.builder()
                .title("Aadana Celeste Premium Apartments")
                .slug("aadana-celeste-premium-apartments-chennai")
                .description("Elegant 3 BHK apartments located in the heart of OMR, Chennai. RERA certified, fully vaastu compliant with luxury amenities including gym, swimming pool, and gated security.")
                .propertyType(PropertyType.APARTMENT)
                .status(PropertyStatus.READY_TO_MOVE)
                .price(new BigDecimal("15000000")) // 1.5 Cr
                .areaSqft(1750.0)
                .bedrooms(3)
                .bathrooms(3)
                .city("Chennai")
                .locality("OMR-Karapakkam")
                .address("Aadana Celeste, OMR Main Road, Karapakkam, Chennai, 600097")
                .latitude(12.9234)
                .longitude(80.2312)
                .isVerified(true)
                .isFeatured(true)
                .dtcpApproved(false)
                .cmdaApproved(true)
                .reraNumber("TN/29/Building/0042/2023")
                .waterAvailability(true)
                .ebConnection(true)
                .floodSafe(true)
                .vaastuCompliant(true)
                .roadWidthFeet(40)
                .user(admin)
                .agent(agent1)
                .builder(builder1)
                .build();
        p1 = propertyRepository.save(p1);

        PropertyImage p1Img1 = PropertyImage.builder()
                .property(p1)
                .imageUrl("https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800")
                .isPrimary(true)
                .sortOrder(0)
                .build();
        propertyImageRepository.save(p1Img1);
        PropertyImage p1Img2 = PropertyImage.builder()
                .property(p1)
                .imageUrl("https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800")
                .isPrimary(false)
                .sortOrder(1)
                .build();
        propertyImageRepository.save(p1Img2);

        // Property 2: Villa in Coimbatore
        Property p2 = Property.builder()
                .title("Tharakar Royal Palms Luxury Villa")
                .slug("tharakar-royal-palms-luxury-villa-coimbatore")
                .description("Exclusive duplex 4 BHK villa with private landscape garden, high-end marble finishings, smart home features, Vaastu compliant, located in Saravanampatti, Coimbatore.")
                .propertyType(PropertyType.VILLA)
                .status(PropertyStatus.UNDER_CONSTRUCTION)
                .price(new BigDecimal("32000000")) // 3.2 Cr
                .areaSqft(3200.0)
                .bedrooms(4)
                .bathrooms(4)
                .city("Coimbatore")
                .locality("Saravanampatti")
                .address("Tharakar Royal Palms, Saravanampatti, Coimbatore, 641035")
                .latitude(11.0789)
                .longitude(76.9984)
                .isVerified(true)
                .isFeatured(true)
                .dtcpApproved(true)
                .cmdaApproved(false)
                .reraNumber("TN/11/Building/0198/2023")
                .waterAvailability(true)
                .ebConnection(true)
                .floodSafe(true)
                .vaastuCompliant(true)
                .roadWidthFeet(30)
                .user(admin)
                .agent(agent2)
                .builder(builder1)
                .build();
        p2 = propertyRepository.save(p2);

        PropertyImage p2Img1 = PropertyImage.builder()
                .property(p2)
                .imageUrl("https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800")
                .isPrimary(true)
                .sortOrder(0)
                .build();
        propertyImageRepository.save(p2Img1);
        PropertyImage p2Img2 = PropertyImage.builder()
                .property(p2)
                .imageUrl("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800")
                .isPrimary(false)
                .sortOrder(1)
                .build();
        propertyImageRepository.save(p2Img2);

        // Property 3: Plot in Madurai
        Property p3 = Property.builder()
                .title("DTCP Approved Green Meadows Plots")
                .slug("dtcp-approved-green-meadows-plots-madurai")
                .description("Fully developed and clear-title DTCP approved plots, vaastu compliant layout, clear Patta, fully fenced community with wide roads and rapid value appreciation in Madurai.")
                .propertyType(PropertyType.LAND)
                .status(PropertyStatus.PLOT_AVAILABLE)
                .price(new BigDecimal("4500000")) // 45 L
                .areaSqft(2400.0)
                .bedrooms(0)
                .bathrooms(0)
                .city("Madurai")
                .locality("Othakadai")
                .address("Tharakar Green Meadows, Othakadai, Madurai, 625107")
                .latitude(9.9542)
                .longitude(78.1873)
                .isVerified(true)
                .isFeatured(false)
                .dtcpApproved(true)
                .cmdaApproved(false)
                .pattaNumber("Patta No. 9102/2023")
                .waterAvailability(true)
                .ebConnection(true)
                .floodSafe(true)
                .vaastuCompliant(true)
                .roadWidthFeet(33)
                .user(admin)
                .agent(agent2)
                .builder(builder2)
                .build();
        p3 = propertyRepository.save(p3);

        PropertyImage p3Img1 = PropertyImage.builder()
                .property(p3)
                .imageUrl("https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800")
                .isPrimary(true)
                .sortOrder(0)
                .build();
        propertyImageRepository.save(p3Img1);

        // Property 4: Commercial Space in Chennai
        Property p4 = Property.builder()
                .title("Aadana Tech Hub Premium Office Space")
                .slug("aadana-tech-hub-premium-office-space-chennai")
                .description("Modern corporate office workspace and commercial showroom in Guindy, Chennai. High visibility location, centralized air conditioning, heavy vehicle access, CMDA approved.")
                .propertyType(PropertyType.COMMERCIAL)
                .status(PropertyStatus.READY_TO_MOVE)
                .price(new BigDecimal("120000000")) // 12 Cr
                .areaSqft(8500.0)
                .bedrooms(0)
                .bathrooms(4)
                .city("Chennai")
                .locality("Guindy")
                .address("Aadana Tech Hub, Guindy Industrial Estate, Chennai, 600032")
                .latitude(13.0112)
                .longitude(80.2045)
                .isVerified(true)
                .isFeatured(true)
                .dtcpApproved(false)
                .cmdaApproved(true)
                .reraNumber("TN/29/Commercial/0011/2021")
                .waterAvailability(true)
                .ebConnection(true)
                .floodSafe(true)
                .vaastuCompliant(true)
                .roadWidthFeet(60)
                .user(admin)
                .agent(agent1)
                .builder(builder1)
                .build();
        p4 = propertyRepository.save(p4);

        PropertyImage p4Img1 = PropertyImage.builder()
                .property(p4)
                .imageUrl("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800")
                .isPrimary(true)
                .sortOrder(0)
                .build();
        propertyImageRepository.save(p4Img1);
        PropertyImage p4Img2 = PropertyImage.builder()
                .property(p4)
                .imageUrl("https://images.unsplash.com/photo-1497366216548-37526070297c?w=800")
                .isPrimary(false)
                .sortOrder(1)
                .build();
        propertyImageRepository.save(p4Img2);

        // Property 5: Luxury Apartment in Salem
        Property p5 = Property.builder()
                .title("Tharakar Elixir Sky Residences")
                .slug("tharakar-elixir-sky-residences-salem")
                .description("Super spacious 3 BHK luxury sky apartments in Salem. Private large balcony with hill views, world class interior finishes, RERA approved, high-speed elevators, 24/7 security.")
                .propertyType(PropertyType.APARTMENT)
                .status(PropertyStatus.READY_TO_MOVE)
                .price(new BigDecimal("21000000")) // 2.1 Cr
                .areaSqft(2200.0)
                .bedrooms(3)
                .bathrooms(3)
                .city("Salem")
                .locality("Fairlands")
                .address("Tharakar Elixir, Fairlands, Salem, 636016")
                .latitude(11.6643)
                .longitude(78.1462)
                .isVerified(true)
                .isFeatured(false)
                .dtcpApproved(true)
                .cmdaApproved(false)
                .reraNumber("TN/07/Building/0082/2023")
                .waterAvailability(true)
                .ebConnection(true)
                .floodSafe(true)
                .vaastuCompliant(true)
                .roadWidthFeet(40)
                .user(admin)
                .agent(agent2)
                .builder(builder1)
                .build();
        p5 = propertyRepository.save(p5);

        PropertyImage p5Img1 = PropertyImage.builder()
                .property(p5)
                .imageUrl("https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800")
                .isPrimary(true)
                .sortOrder(0)
                .build();
        propertyImageRepository.save(p5Img1);

        // Property 6: Villa in Tirunelveli
        Property p6 = Property.builder()
                .title("Aadana Heritage Eco-Villas")
                .slug("aadana-heritage-eco-villas-tirunelveli")
                .description("Eco-friendly luxury 3 BHK villa with solar panels, smart power grids, rainwater harvesting, vaastu design, located in premium residential locality of Tirunelveli.")
                .propertyType(PropertyType.VILLA)
                .status(PropertyStatus.READY_TO_MOVE)
                .price(new BigDecimal("18000000")) // 1.8 Cr
                .areaSqft(1950.0)
                .bedrooms(3)
                .bathrooms(3)
                .city("Tirunelveli")
                .locality("Palayamkottai")
                .address("Aadana Heritage, Palayamkottai, Tirunelveli, 627002")
                .latitude(8.7186)
                .longitude(77.7472)
                .isVerified(true)
                .isFeatured(false)
                .dtcpApproved(true)
                .cmdaApproved(false)
                .reraNumber("TN/26/Building/0055/2024")
                .waterAvailability(true)
                .ebConnection(true)
                .floodSafe(true)
                .vaastuCompliant(true)
                .roadWidthFeet(30)
                .user(admin)
                .agent(agent1)
                .builder(builder1)
                .build();
        p6 = propertyRepository.save(p6);

        PropertyImage p6Img1 = PropertyImage.builder()
                .property(p6)
                .imageUrl("https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800")
                .isPrimary(true)
                .sortOrder(0)
                .build();
        propertyImageRepository.save(p6Img1);
    }
}
