import React, { useState, useRef } from 'react';
import {
  Box,
  Button,
  Grid,
  IconButton,
  Typography,
  CircularProgress,
  Paper,
  Chip
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { API_URL } from '../constants/path';
import axios from 'axios';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  uploadArea: {
    border: '2px dashed #d0d7de',
    borderRadius: '8px',
    padding: '24px',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    backgroundColor: '#fafbfc',
    '&:hover': {
      borderColor: '#ee4d2d',
      backgroundColor: '#fff5f5',
    },
    '&.dragging': {
      borderColor: '#ee4d2d',
      backgroundColor: '#fff5f5',
    },
  },
  imageContainer: {
    position: 'relative',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    transition: 'transform 0.2s ease',
    '&:hover': {
      transform: 'scale(1.02)',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    },
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0,
    transition: 'opacity 0.2s ease',
    '&:hover': {
      opacity: 1,
    },
  },
  primaryImageBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#ee4d2d',
    color: 'white',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: 'bold',
  },
}));

const ProductImageUploader = ({ productCode, images = [], onChange, readonly = false }) => {
  const classes = useStyles();
  const [uploading, setUploading] = useState(false);
  const [uploadingIndex, setUploadingIndex] = useState(-1);
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileUpload = async (files, index = -1) => {
    if (!files || files.length === 0) return;

    const fileArray = Array.from(files);
    
    // Limit to 10 images
    if (images.length + fileArray.length > 10) {
      alert('Tối đa 10 ảnh cho mỗi sản phẩm');
      return;
    }

    try {
      setUploading(true);

      // Upload all files in parallel
      const uploadPromises = fileArray.map((file) => {
        const formData = new FormData();
        formData.append('file', file);
        
        return axios.post(
          `${API_URL}/upload/${productCode}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        ).then(response => response.data.url);
      });

      const uploadedUrls = await Promise.all(uploadPromises);

      if (index >= 0) {
        // Replace existing image
        const newImages = [...images];
        newImages[index] = uploadedUrls[0];
        onChange(newImages);
      } else {
        // Add new images
        onChange([...images, ...uploadedUrls]);
      }
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed: ' + (error.response?.data?.error || error.message));
    } finally {
      setUploading(false);
      setUploadingIndex(-1);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleFileSelect = (event) => {
    const files = event.target.files;
    if (files) {
      handleFileUpload(files);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const files = e.dataTransfer.files;
    if (files) {
      handleFileUpload(files);
    }
  };

  const handleDeleteImage = async (index) => {
    const imageUrl = images[index];
    if (!imageUrl) return;

    // Delete from MinIO
    try {
      await axios.delete(`${API_URL}/upload/by-url?url=${encodeURIComponent(imageUrl)}`);
      
      // Remove from local state
      const newImages = images.filter((_, i) => i !== index);
      onChange(newImages);
    } catch (error) {
      console.error('Delete failed:', error);
      // Still remove from UI even if delete fails
      const newImages = images.filter((_, i) => i !== index);
      onChange(newImages);
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: 600 }}>
        Hình ảnh sản phẩm
      </Typography>
      
      {/* Image Grid */}
      {images.length > 0 && (
        <Grid container spacing={2} sx={{ mb: 2 }}>
          {images.map((imageUrl, index) => (
            <Grid item xs={6} sm={4} md={3} key={index}>
              <Paper
                className={classes.imageContainer}
                sx={{
                  position: 'relative',
                  paddingTop: '100%', // 1:1 aspect ratio
                  backgroundColor: '#f5f5f5',
                }}
              >
                {index === 0 && (
                  <Chip
                    label="Ảnh chính"
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: 8,
                      left: 8,
                      backgroundColor: '#ee4d2d',
                      color: 'white',
                      fontWeight: 'bold',
                      zIndex: 2,
                    }}
                  />
                )}
                <img
                  src={imageUrl}
                  alt={`Product image ${index + 1}`}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
                {!readonly && (
                  <Box className={classes.imageOverlay}>
                    <Box display="flex" gap={1}>
                      {index !== 0 && (
                        <IconButton
                          size="small"
                          sx={{
                            backgroundColor: 'white',
                            color: '#ee4d2d',
                            '&:hover': {
                              backgroundColor: '#fff',
                              transform: 'scale(1.1)',
                            },
                          }}
                          onClick={() => {
                            // Move to first position
                            const newImages = [...images];
                            const [moved] = newImages.splice(index, 1);
                            newImages.unshift(moved);
                            onChange(newImages);
                          }}
                          disabled={uploading}
                          title="Đặt làm ảnh chính"
                        >
                          <AddPhotoAlternateIcon fontSize="small" />
                        </IconButton>
                      )}
                      <IconButton
                        size="small"
                        sx={{
                          backgroundColor: 'white',
                          color: '#ee4d2d',
                          '&:hover': {
                            backgroundColor: '#fff',
                            transform: 'scale(1.1)',
                          },
                        }}
                        onClick={() => handleDeleteImage(index)}
                        disabled={uploading}
                        title="Xóa ảnh"
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>
                )}
                {uploading && uploadingIndex === index && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'rgba(0,0,0,0.7)',
                      zIndex: 3,
                    }}
                  >
                    <CircularProgress sx={{ color: '#ee4d2d' }} />
                  </Box>
                )}
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Upload Area */}
      {!readonly && (
        <Paper
          className={`${classes.uploadArea} ${dragging ? 'dragging' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          sx={{
            mb: 2,
            cursor: uploading ? 'not-allowed' : 'pointer',
            opacity: uploading ? 0.6 : 1,
          }}
        >
          <input
            ref={fileInputRef}
            accept="image/*"
            style={{ display: 'none' }}
            type="file"
            multiple
            onChange={handleFileSelect}
            disabled={uploading}
          />
          <CloudUploadIcon sx={{ fontSize: 48, color: '#ee4d2d', mb: 1 }} />
          <Typography variant="h6" sx={{ mb: 1, color: '#ee4d2d', fontWeight: 600 }}>
            Kéo thả ảnh vào đây hoặc click để chọn
          </Typography>
          <Typography variant="body2" sx={{ color: '#757575' }}>
            Hỗ trợ định dạng: JPG, PNG, GIF. Tối đa 10 ảnh
          </Typography>
          {uploading && (
            <Box sx={{ mt: 2 }}>
              <CircularProgress size={24} sx={{ color: '#ee4d2d' }} />
              <Typography variant="body2" sx={{ mt: 1, color: '#757575' }}>
                Đang tải ảnh...
              </Typography>
            </Box>
          )}
        </Paper>
      )}

      {images.length === 0 && !readonly && (
        <Typography variant="body2" sx={{ color: '#757575', fontStyle: 'italic' }}>
          Chưa có ảnh nào. Hãy thêm ảnh cho sản phẩm của bạn.
        </Typography>
      )}
    </Box>
  );
};

export default ProductImageUploader;

