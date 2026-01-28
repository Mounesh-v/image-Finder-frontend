import React, { useContext, useEffect, useState } from "react";
import ImageContext from "../Context/ImageContext";
import "./HomeImage.css";
import { FaHeart, FaShare, FaEye, FaUser, FaDownload, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import ImageSlider from "./ImageSlider";
import api from "../api/axios";

const HomeImage = () => {
  const { images, loading, loadMore, hasMore } = useContext(ImageContext);

  const [selectedImage, setSelectedImage] = useState(null);
  const [likedImages, setLikedImages] = useState(new Set());

  const userDetails = JSON.parse(localStorage.getItem("user"));
  const token = userDetails?.token;

  /* ================= FETCH USER LIKES ================= */
  useEffect(() => {
    if (!token) return;

    const fetchLikes = async () => {
      try {
        const res = await api.get("/api/image/likes", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLikedImages(new Set(res.data.map((item) => item.imageId)));
      } catch (err) {
        console.error("Fetch likes failed", err);
      }
    };

    fetchLikes();
  }, [token]);

  /* ================= LIKE / DISLIKE ================= */
  const handleLike = async (image) => {
    if (!token) {
      toast.error("Please login to like images");
      return;
    }

    try {
      await api.post(
        "/api/image/toggle",
        {
          imageId: image.id,
          imageUrl: image.webformatURL,
          tags: image.tags,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setLikedImages((prev) => {
        const updated = new Set(prev);
        updated.has(image.id)
          ? updated.delete(image.id)
          : updated.add(image.id);
        return updated;
      });

      toast.success(
        likedImages.has(image.id)
          ? "Removed from favorites"
          : "Added to favorites"
      );
    } catch {
      toast.error("Failed to update like");
    }
  };

  /* ================= DOWNLOAD ================= */
  const handleDownload = async (imageUrl, imageName) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `imagefinder-${imageName}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(url);
      toast.success("Image downloaded successfully!");
    } catch {
      toast.error("Download failed");
    }
  };

  /* ================= SHARE ================= */
  const handleShare = async (imageUrl) => {
    if (navigator.share) {
      try {
        await navigator.share({ title: "Check this image", url: imageUrl });
        return;
      } catch {}
    }

    navigator.clipboard
      .writeText(imageUrl)
      .then(() => toast.success("Image link copied"))
      .catch(() => toast.error("Copy failed"));
  };

  return (
    <div className="home-container">
      <ImageSlider />

      <div className="images-grid">
        {images.map((img) => (
          <div
            key={img.id}
            className="image-card"
            onClick={() => setSelectedImage(img)}
          >
            <div className="image-wrapper">
              <img
                src={img.largeImageURL}
                alt={img.tags}
                className="image"
              />

              <div className="image-overlay">
                <div className="image-actions">
                  <button
                    className={`action-btn like-btn ${
                      likedImages.has(img.id) ? "liked" : ""
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLike(img);
                    }}
                  >
                    <FaHeart />
                  </button>

                  <button
                    className="action-btn share-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleShare(img.largeImageURL);
                    }}
                  >
                    <FaShare />
                  </button>
                </div>
              </div>

              <div className="image-info">
                <div className="photographer">
                  <FaUser /> {img.user}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ================= AWESOME MODAL ================= */}
      {selectedImage && (
        <div className="modal-overlay" onClick={() => setSelectedImage(null)}>
          <div
            className="modal-content awesome-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close-btn"
              onClick={() => setSelectedImage(null)}
            >
              <FaTimes />
            </button>

            <img
              src={selectedImage.largeImageURL}
              alt={selectedImage.tags}
              className="modal-image"
            />

            <div className="modal-action-bar">
              <button
                className={`modal-btn ${
                  likedImages.has(selectedImage.id) ? "liked" : ""
                }`}
                onClick={() => handleLike(selectedImage)}
              >
                <FaHeart /> Like
              </button>

              <button
                className="modal-btn"
                onClick={() =>
                  handleDownload(
                    selectedImage.largeImageURL,
                    selectedImage.id
                  )
                }
              >
                <FaDownload /> Download
              </button>

              <button
                className="modal-btn"
                onClick={() =>
                  handleShare(selectedImage.largeImageURL)
                }
              >
                <FaShare /> Share
              </button>
            </div>
          </div>
        </div>
      )}

      {hasMore && (
        <button style={{borderRadius: 40, margin: "20px auto"}} onClick={loadMore} disabled={loading}>
          {loading ? "Loading..." : "Load More"}
        </button>
      )}
    </div>
  );
};

export default HomeImage;
