'use client';

import { useEffect, useId, useMemo, useRef, useState } from 'react';
import maplibregl, { Map as MapLibreMap, Marker } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const MAPTILER_KEY = process.env.NEXT_PUBLIC_MAPTILER_KEY ?? '';
const DEFAULT_CENTER: [number, number] = [106.700981, 10.776530]; // TP.HCM
const DEFAULT_ZOOM = 12;

type Suggestion = {
    id: string;
    place_name: string;
    center: [number, number]; // [lng, lat]
};

type AddressPickerMapProps = {
    address: string;
    onAddressChange: (next: string) => void;
    onCoordsChange?: (lat: number, lng: number) => void;
    error?: string;
};

function useDebouncedValue<T>(value: T, delay: number): T {
    const [debounced, setDebounced] = useState(value);
    useEffect(() => {
        const t = setTimeout(() => setDebounced(value), delay);
        return () => clearTimeout(t);
    }, [value, delay]);
    return debounced;
}

export default function AddressPickerMap({ address, onAddressChange, onCoordsChange, error }: AddressPickerMapProps) {
    const listboxId = useId();
    const containerRef = useRef<HTMLDivElement | null>(null);
    const mapRef = useRef<MapLibreMap | null>(null);
    const markerRef = useRef<Marker | null>(null);
    const skipNextSearchRef = useRef(false);
    const reverseLockRef = useRef(false);
    const lastGeocodedRef = useRef('');

    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);
    const [isFocused, setIsFocused] = useState(false);

    const debouncedAddress = useDebouncedValue(address, 350);
    const hasKey = useMemo(() => MAPTILER_KEY.trim().length > 0, []);

    // Khởi tạo map 1 lần
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

        const marker = new maplibregl.Marker({ color: '#61AF5E', draggable: true })
            .setLngLat(DEFAULT_CENTER)
            .addTo(map);

        marker.on('dragend', async () => {
            const { lng, lat } = marker.getLngLat();
            onCoordsChange?.(lat, lng);
            try {
                reverseLockRef.current = true;
                const res = await fetch(
                    `https://api.maptiler.com/geocoding/${lng},${lat}.json?key=${MAPTILER_KEY}&language=vi&limit=1`,
                );
                const data = await res.json();
                const placeName = data?.features?.[0]?.place_name;
                if (placeName) {
                    skipNextSearchRef.current = true;
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

    // Autocomplete: khi địa chỉ thay đổi
    useEffect(() => {
        if (!hasKey) return;
        if (reverseLockRef.current) return;
        if (skipNextSearchRef.current) {
            skipNextSearchRef.current = false;
            return;
        }
        const query = debouncedAddress.trim();
        if (query.length < 3) {
            setSuggestions([]);
            return;
        }
        let cancelled = false;
        (async () => {
            try {
                const res = await fetch(
                    `https://api.maptiler.com/geocoding/${encodeURIComponent(query)}.json?key=${MAPTILER_KEY}&language=vi&country=vn&types=address,poi,street&limit=6&autocomplete=true`,
                );
                const data = await res.json();
                if (cancelled) return;
                const items: Suggestion[] = (data?.features ?? []).map((f: any) => ({
                    id: String(f.id ?? f.place_name),
                    place_name: String(f.place_name ?? ''),
                    center: Array.isArray(f.center) && f.center.length >= 2 ? [f.center[0], f.center[1]] : DEFAULT_CENTER,
                }));
                setSuggestions(items);
                setActiveIndex(-1);
            } catch {
                if (!cancelled) setSuggestions([]);
            }
        })();
        return () => {
            cancelled = true;
        };
    }, [debouncedAddress, hasKey]);

    const flyToAndPlaceMarker = (center: [number, number]) => {
        const map = mapRef.current;
        const marker = markerRef.current;
        if (!map || !marker) return;
        marker.setLngLat(center);
        map.flyTo({ center, zoom: 16, essential: true });
    };

    const geocodeAndFly = async (query: string) => {
        if (!hasKey) return;
        const trimmed = query.trim();
        if (trimmed.length < 3) return;
        if (trimmed === lastGeocodedRef.current) return;
        lastGeocodedRef.current = trimmed;
        try {
            const res = await fetch(
                `https://api.maptiler.com/geocoding/${encodeURIComponent(trimmed)}.json?key=${MAPTILER_KEY}&language=vi&country=vn&types=address,poi,street&limit=1`,
            );
            const data = await res.json();
            const f = data?.features?.[0];
            if (f && Array.isArray(f.center) && f.center.length >= 2) {
                flyToAndPlaceMarker([f.center[0], f.center[1]]);
                onCoordsChange?.(f.center[1], f.center[0]); // [lng, lat] → (lat, lng)
            }
        } catch {
            // ignore
        }
    };

    const pickSuggestion = (s: Suggestion) => {
        skipNextSearchRef.current = true;
        lastGeocodedRef.current = s.place_name;
        onAddressChange(s.place_name);
        onCoordsChange?.(s.center[1], s.center[0]); // center = [lng, lat]
        setSuggestions([]);
        setShowSuggestions(false);
        setActiveIndex(-1);
        flyToAndPlaceMarker(s.center);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            if (showSuggestions && activeIndex >= 0 && activeIndex < suggestions.length) {
                pickSuggestion(suggestions[activeIndex]);
            } else {
                setShowSuggestions(false);
                void geocodeAndFly(address);
            }
            return;
        }
        if (!showSuggestions || suggestions.length === 0) return;
        if (event.key === 'ArrowDown') {
            event.preventDefault();
            setActiveIndex((prev) => (prev + 1) % suggestions.length);
        } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            setActiveIndex((prev) => (prev <= 0 ? suggestions.length - 1 : prev - 1));
        } else if (event.key === 'Escape') {
            setShowSuggestions(false);
        }
    };

    return (
        <div className="block">
            <div className="mb-2 text-[13px] font-semibold text-[#a8adb7]">Địa chỉ giao hàng</div>

            <div className="relative">
                <input
                    type="text"
                    value={address}
                    onChange={(event) => {
                        onAddressChange(event.target.value);
                        setShowSuggestions(true);
                    }}
                    onFocus={() => {
                        setIsFocused(true);
                        if (suggestions.length > 0) setShowSuggestions(true);
                    }}
                    onBlur={() => {
                        setIsFocused(false);
                        setTimeout(() => {
                            setShowSuggestions(false);
                            void geocodeAndFly(address);
                        }, 150);
                    }}
                    onKeyDown={handleKeyDown}
                    placeholder="Nhập địa chỉ giao hàng..."
                    autoComplete="off"
                    role="combobox"
                    aria-expanded={showSuggestions && suggestions.length > 0}
                    aria-controls={listboxId}
                    aria-activedescendant={activeIndex >= 0 ? `${listboxId}-${activeIndex}` : undefined}
                    className={`h-[42px] w-full rounded-[10px] border px-4 text-[14px] text-black outline-none transition ${
                        error
                            ? 'border-[#ef4444] bg-[#fff7f7] focus:border-[#ef4444]'
                            : 'border-[#e3e6eb] focus:border-[#cfd6df]'
                    }`}
                />

                {showSuggestions && suggestions.length > 0 && (
                    <ul
                        id={listboxId}
                        role="listbox"
                        className="absolute left-0 right-0 top-[46px] z-20 max-h-[260px] overflow-y-auto rounded-[10px] border border-[#e3e6eb] bg-white shadow-[0_10px_30px_rgba(15,23,42,0.12)]"
                    >
                        {suggestions.map((s, index) => (
                            <li
                                key={s.id}
                                id={`${listboxId}-${index}`}
                                role="option"
                                aria-selected={index === activeIndex}
                                onMouseDown={(event) => {
                                    event.preventDefault();
                                    pickSuggestion(s);
                                }}
                                onMouseEnter={() => setActiveIndex(index)}
                                className={`cursor-pointer px-4 py-2 text-[14px] leading-5 text-[#1f2937] ${
                                    index === activeIndex ? 'bg-[#f0f7ee]' : 'hover:bg-[#f6f7f8]'
                                }`}
                            >
                                {s.place_name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {error ? <p className="mt-1 text-[12px] text-[#ef4444]">{error}</p> : null}

            <div className="mt-3 overflow-hidden rounded-[12px] border border-[#e3e6eb]">
                {hasKey ? (
                    <div ref={containerRef} className="h-[260px] w-full" />
                ) : (
                    <div className="flex h-[120px] w-full items-center justify-center bg-[#f6f7f8] px-4 text-center text-[13px] text-[#6b7280]">
                        Thiếu <code className="mx-1 rounded bg-white px-1 py-0.5 text-[12px]">NEXT_PUBLIC_MAPTILER_KEY</code> trong <code className="mx-1 rounded bg-white px-1 py-0.5 text-[12px]">.env.local</code>. Lấy key miễn phí tại maptiler.com.
                    </div>
                )}
            </div>

            {hasKey ? (
                <p className="mt-2 text-[12px] text-[#6b7280]">
                    Mẹo: kéo điểm đánh dấu trên bản đồ để khớp chính xác với vị trí giao hàng.
                </p>
            ) : null}

            {/* Giữ tham chiếu để tránh warning unused (focus state có thể dùng cho UX nâng cao sau này) */}
            <span className="hidden">{isFocused ? '' : ''}</span>
        </div>
    );
}
