package com.nilaamnai.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PropertyVideoResponse {
    private UUID id;
    private String videoUrl;
    private String publicId;
    private String title;
}
