package com.nilaamnai.service;

import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.Map;

public interface CloudinaryService {
    Map<String, String> uploadImage(MultipartFile file, String folder) throws IOException;
    Map<String, String> uploadVideo(MultipartFile file, String folder) throws IOException;
    void deleteFile(String publicId) throws IOException;
}
