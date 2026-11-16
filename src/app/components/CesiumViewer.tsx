"use client";

import { useEffect, useRef } from "react";
import type { Viewer as CesiumViewerInstance } from "cesium";

// Ensure Cesium finds static assets from /public/cesium
if (typeof window !== "undefined") {
  (window as unknown as { CESIUM_BASE_URL: string }).CESIUM_BASE_URL = "/cesium";
}

export default function CesiumViewer() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let viewer: CesiumViewerInstance | null = null;
    let isMounted = true;

    const initializeCesium = async (): Promise<void> => {
      try {
        if (typeof window !== "undefined") {
          (window as unknown as { CESIUM_BASE_URL: string }).CESIUM_BASE_URL = "/cesium";
        }

        const Cesium = await import("cesium");

        if (!isMounted || !containerRef.current) return;

        // Configure base URL and disable Ion requests
        (
          Cesium.buildModuleUrl as unknown as {
            setBaseUrl: (url: string) => void;
          }
        ).setBaseUrl("/cesium/");
        Cesium.Ion.defaultAccessToken = "";

        // Clear any previous nodes if React StrictMode remounted
        containerRef.current.innerHTML = "";

        // Load built-in offline Natural Earth imagery
        const imageryProvider =
          await Cesium.TileMapServiceImageryProvider.fromUrl(
            Cesium.buildModuleUrl("Assets/Textures/NaturalEarthII")
          );

        if (!isMounted || !containerRef.current) return;

        // Initialize Cesium Viewer with the offline baseLayer
        viewer = new Cesium.Viewer(containerRef.current, {
          baseLayer: new Cesium.ImageryLayer(imageryProvider),
          terrain: undefined,

          animation: false,
          timeline: false,
          geocoder: false,
          homeButton: true,
          sceneModePicker: true,
          navigationHelpButton: false,
          baseLayerPicker: false,

          infoBox: false,
          selectionIndicator: false,
        });

        // Display Earth
        viewer.scene.globe.show = true;

        // Focus camera on India
        viewer.camera.flyTo({
          destination: Cesium.Cartesian3.fromDegrees(
            78.9629,
            20.5937,
            15_000_000
          ),
          duration: 2,
        });
      } catch (error) {
        console.error("Failed to initialize Cesium:", error);
      }
    };

    void initializeCesium();

    return () => {
      isMounted = false;

      if (viewer && !viewer.isDestroyed()) {
        viewer.destroy();
        viewer = null;
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        overflow: "hidden",
      }}
    />
  );
}
