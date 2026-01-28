import React, { useEffect, useState, useRef } from "react";
import ImageContext from "./ImageContext";

const ImageState = (props) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("nature");
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);
  const [lastFetch, setLastFetch] = useState({ type: "query", value: "nature" });

  const scrollPositionRef = useRef(0);

  const Api_Key = "49604126-b604d931bdc6986fefd2d0c4a";

  const FetchImages = async (searchQuery = query, pageParam = 1, append = false) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://pixabay.com/api/?key=${Api_Key}&q=${encodeURIComponent(
          searchQuery
        )}&image_type=photo&pretty=true&per_page=100&page=${pageParam}`
      );
      const data = await res.json();

      setTotalHits(data.totalHits || 0);
      setImages((prev) =>
        append ? [...prev, ...(data.hits || [])] : data.hits || []
      );
      setPage(pageParam);
      setLastFetch({ type: "query", value: searchQuery });
    } catch (error) {
      console.error("Error fetching images:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      FetchImages(query, 1, false);
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  const FetchedCategory = async (category, pageParam = 1, append = false) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://pixabay.com/api/?key=${Api_Key}&category=${encodeURIComponent(
          category
        )}&image_type=photo&pretty=true&per_page=100&page=${pageParam}`
      );
      const data = await res.json();

      setTotalHits(data.totalHits || 0);
      setImages((prev) =>
        append ? [...prev, ...(data.hits || [])] : data.hits || []
      );
      setPage(pageParam);
      setLastFetch({ type: "category", value: category });
    } catch (error) {
      console.error("Error fetching category images:", error);
    }
    setLoading(false);
  };

  const loadMore = async () => {
    if (images.length >= totalHits) return;

    // Save current scroll position
    scrollPositionRef.current = window.scrollY;

    const nextPage = page + 1;
    if (lastFetch.type === "category") {
      await FetchedCategory(lastFetch.value, nextPage, true);
    } else {
      await FetchImages(lastFetch.value, nextPage, true);
    }
  };

  // Restore scroll position after images update
  useEffect(() => {
    if (scrollPositionRef.current) {
      window.scrollTo({
        top: scrollPositionRef.current,
        behavior: "instant",
      });
    }
  }, [images]);

  return (
    <ImageContext.Provider
      value={{
        images,
        FetchedCategory,
        FetchImages,
        loading,
        setQuery,
        loadMore,
        hasMore: images.length < totalHits,
      }}
    >
      {props.children}
    </ImageContext.Provider>
  );
};

export default ImageState;
