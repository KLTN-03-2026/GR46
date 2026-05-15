'use client';

import { useEffect, useRef } from 'react';
import maplibregl, { Map as MapLibreMap, Marker } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const MAPTILER_KEY = process.env.NEXT_PUBLIC_MAPTILER_KEY ?? '';
const DEFAULT_CENTER: [number, number] = [106.700981, 10.776530]; // TP.HCM
const DEFAULT_ZOOM = 12;

type Props = {
    address: string;
    onAddressChange: (next: string) => void;
};

export default function ExploreAddressMap({ address, onAddressChange }: Props) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const mapRef = useRef<MapLibreMap | null>(null);
    const markerRef = useRef<Marker | null>(null);
    const lastGeocodedRef = useRef('');
    const reverseLockRef = useRef(false);
    const hasKey = MAPTILER_KEY.trim().length > 0;

    // Khởi tạo map
    useEffect(() => {
        if (!containerRef.current || mapRef.current || !hasKey) return;
        const map = new maplibregl.Map({
            container: containerRef.current,
            style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${MAPTILER_KEY}`,
            center: DEFAULT_CENTER,
            zoom: DEFAULT_ZOOM,
            attributionControl: { compact: true },
        });
        map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right');

        const marker = new maplibregl.Marker({ color: '#f59e0b', draggable: true })
            .setLngLat(DEFAULT_CENTER)
            .addTo(map);

        marker.on('dragend', async () => {
            const { lng, lat } = marker.getLngLat();
            try {
                reverseLockRef.current = true;
                const res = await fetch(
                    `https://api.maptiler.com/geocoding/${lng},${lat}.json?key=${MAPTILER_KEY}&language=vi&limit=1`,
                );
                const data = await res.json();
                const placeName = data?.features?.[0]?.place_name;
                if (placeName) {
                    lastGeocodedRef.current = placeName;
                    onAddressChange(placeName);
                }
            } catch {
                // ignore
            } finally {
                reverseLockRef.current = false;
            }
        });

        mapRef.current = map;
        markerRef.current = marker;

        return () => {
            marker.remove();
            map.remove();
            mapRef.current = null;
            markerRef.current = null;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hasKey]);

    // Khi address từ ngoài thay đổi → forward geocode + bay map
    useEffect(() => {
        if (!hasKey) return;
        if (reverseLockRef.current) return;
        const trimmed = address.trim();
        if (trimmed.length < 3) return;
        if (trimmed === lastGeocodedRef.current) return;

        const handler = setTimeout(async () => {
            lastGeocodedRef.current = trimmed;
            try {
                const res = await fetch(
                    `https://api.maptiler.com/geocoding/${encodeURIComponent(trimmed)}.json?key=${MAPTILER_KEY}&language=vi&country=vn&types=address,poi,street&limit=1`,
                );
                const data = await res.json();
                const f = data?.features?.[0];
                if (f && Array.isArray(f.center) && f.center.length >= 2) {
                    const map = mapRef.current;
                    const marker = markerRef.current;
                    if (map && marker) {
                        marker.setLngLat([f.center[0], f.center[1]]);
                        map.flyTo({ center: [f.center[0], f.center[1]], zoom: 16, essential: true });
                    }
                }
            } catch {
                // ignore
            }
        }, 500);

        return () => clearTimeout(handler);
    }, [address, hasKey]);

    if (!hasKey) {
        return (
            <div className="flex h-[120px] w-full items-center justify-center rounded-[18px] border border-[#d8dde8] bg-[#f6f7f8] px-4 text-center text-[14px] text-[#6b7280]">
                Thiếu <code className="mx-1 rounded bg-white px-1 py-0.5 text-[12px]">NEXT_PUBLIC_MAPTILER_KEY</code> trong <code className="mx-1 rounded bg-white px-1 py-0.5 text-[12px]">.env.local</code>.
            </div>
        );
    }

    return (
        <div className="overflow-hidden rounded-[18px] border border-[#d8dde8] shadow-[0_4px_14px_rgba(15,23,42,0.04)]">
            <div ref={containerRef} className="h-[320px] w-full md:h-[380px]" />
            <div className="flex items-center gap-2 border-t border-[#eef2f6] bg-white px-5 py-3 text-[13px] text-[#64748b]">
                <span className="text-[16px]">📍</span>
                <span>
                    Mẹo: nhập địa chỉ ở ô trên hoặc kéo điểm đánh dấu trên bản đồ để chọn vị trí giao món.
                </span>
            </div>
        </div>
    );
}
