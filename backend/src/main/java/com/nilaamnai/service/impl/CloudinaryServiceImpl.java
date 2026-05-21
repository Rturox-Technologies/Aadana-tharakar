package com.nilaamnai.service.impl;

import com.cloudinary.Cloudinary;
import com.cloudinary.Transformation;
import com.cloudinary.utils.ObjectUtils;
import com.nilaamnai.service.CloudinaryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class CloudinaryServiceImpl implements CloudinaryService {

    private final Cloudinary cloudinary;

    @Override
    public Map<String, String> uploadImage(MultipartFile file, String folder) throws IOException {
        if (file.isEmpty()) {
            throw new IllegalArgumentException("Cannot upload empty file");
        }

        Map<String, Object> options = ObjectUtils.asMap(
            "folder", folder,
            "resource_type", "image"
        );

        Map<?, ?> uploadResult = cloudinary.uploader().upload(file.getBytes(), options);
        String publicId = (String) uploadResult.get("public_id");

        // Dynamic optimization transformation: q_auto, f_auto
        @SuppressWarnings("rawtypes")
        String url = cloudinary.url()
            .secure(true)
            .transformation(new Transformation().quality("auto").fetchFormat("auto"))
            .generate(publicId);

        Map<String, String> result = new HashMap<>();
        result.put("url", url);
        result.put("publicId", publicId);
        return result;
    }

    @Override
    public Map<String, String> uploadVideo(MultipartFile file, String folder) throws IOException {
        if (file.isEmpty()) {
            throw new IllegalArgumentException("Cannot upload empty file");
        }

        Map<String, Object> options = ObjectUtils.asMap(
            "folder", folder,
            "resource_type", "video"
        );

        Map<?, ?> uploadResult = cloudinary.uploader().upload(file.getBytes(), options);
        String publicId = (String) uploadResult.get("public_id");
        String url = (String) uploadResult.get("secure_url");

        Map<String, String> result = new HashMap<>();
        result.put("url", url);
        result.put("publicId", publicId);
        return result;
    }

    @Override
    public void deleteFile(String publicId) throws IOException {
        if (publicId == null || publicId.trim().isEmpty()) {
            return;
        }

        // Try to destroy as image first (default)
        Map<?, ?> result = cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
        String status = (String) result.get("result");

        // If not successful or not found, try as video
        if (!"ok".equals(status)) {
            cloudinary.uploader().destroy(publicId, ObjectUtils.asMap("resource_type", "video"));
        }
    }
}
