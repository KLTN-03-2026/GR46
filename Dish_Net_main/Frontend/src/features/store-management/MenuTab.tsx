'use client';
/* eslint-disable @next/next/no-img-element */

import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  storeMenuApi,
  MonAnItem,
  TopMonItem,
  ItemStatus,
  MenuSortOption,
  DanhMucItem,
  fmt,
  mapDbStatusToUi,
} from '@/shared/storeMenuApi';
import { figmaFallbackAssets } from '@/shared/assets/figmaFallback';

function getErrorMessage(error: unknown, fallback: string): string {
  return error instanceof Error ? error.message : fallback;
}

/* ═══════════════════════════════════════════
   TYPES & CONSTANTS
   ═══════════════════════════════════════════ */
const STATUS_COLORS: Record<ItemStatus, string> = {
  dang_ban: 'text-[#2e7d32]',
  het_mon: 'text-[#d32f2f]',
  tam_ngung_ban: 'text-[#f0a050]',
};

const DB_STATUS_OPTIONS: ItemStatus[] = ['dang_ban', 'het_mon', 'tam_ngung_ban'];

const SORT_OPTIONS: Array<{ value: MenuSortOption; label: string }> = [
  { value: 'moi_nhat', label: 'Mới nhất' },
  { value: 'ban_chay', label: 'Bán chạy' },
  { value: 'gia_cao', label: 'Giá cao → thấp' },
  { value: 'gia_thap', label: 'Giá thấp → cao' },
];

const menuFallbackImage = figmaFallbackAssets.menuItemImage;

/* ═══════════════════════════════════════════
   EDIT ITEM MODAL
   ═══════════════════════════════════════════ */
function EditItemModal({
  item,
  danhMucList,
  onClose,
  onSave,
}: {
  item: MonAnItem;
  danhMucList: DanhMucItem[];
  onClose: () => void;
  onSave: (updated: MonAnItem) => void;
}) {
  const [name, setName] = useState(item.ten_mon);
  const [status, setStatus] = useState<ItemStatus>(item.trang_thai_ban);
  const [desc, setDesc] = useState(item.mo_ta ?? '');
  const [price, setPrice] = useState(item.gia_ban.toString());
  const [idDanhMuc, setIdDanhMuc] = useState(item.id_danh_muc?.toString() ?? '');
  const [toppings, setToppings] = useState(item.toppings.map((t) => ({ name: t.ten_topping, price: t.gia.toString() })));
  const [statusOpen, setStatusOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleSave = async () => {
    if (!name.trim()) { setError('Tên món không được để trống'); return; }
    const priceNum = parseFloat(price.replace(/\D/g, '')) || 0;
    if (priceNum < 0) { setError('Giá không hợp lệ'); return; }
    setSaving(true);
    setError('');
    try {
      await storeMenuApi.capNhatMonAn(item.id, {
        ten_mon: name.trim(),
        mo_ta: desc,
        gia_ban: priceNum,
        id_danh_muc: idDanhMuc || undefined,
        trang_thai_ban: status,
        toppings: toppings.filter((t) => t.name.trim()).map((t) => ({
          ten_topping: t.name.trim(),
          gia: parseFloat(t.price.replace(/\D/g, '')) || 0,
        })),
      });
      onSave({ ...item, ten_mon: name, mo_ta: desc, gia_ban: priceNum, id_danh_muc: idDanhMuc ? Number(idDanhMuc) : null, trang_thai_ban: status });
      onClose();
    } catch (error: unknown) {
      setError(getErrorMessage(error, 'Lỗi khi lưu'));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm" onClick={onClose}>
      <div className="relative w-full max-w-[540px] rounded-[16px] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.18)]" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 pt-5">
          <div />
          <h3 className="text-[17px] font-bold text-black">Sửa thông tin món</h3>
          <button type="button" onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f0f0f0] text-[18px] text-[#555] transition hover:bg-[#e0e0e0]">×</button>
        </div>
        <div className="px-6 pb-6 pt-4">
          <div className="flex items-center gap-4 rounded-[10px] border border-[#e8e8e8] p-3">
            <img src={item.hinh_anh_dai_dien || menuFallbackImage} alt={item.ten_mon} className="h-16 w-16 rounded-[8px] object-cover" />
            <span className="flex-1 text-[15px] font-medium text-black">{name || '...'}</span>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <label className="text-[13px] font-medium text-black">Tên Món</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 w-full rounded-[8px] border border-[#e0e0e0] px-3 py-2 text-[14px] text-black outline-none focus:border-[#2e7d32]" />
            </div>
            <div className="relative">
              <label className="text-[13px] font-medium text-black">Trạng thái</label>
              <button type="button" onClick={() => setStatusOpen(!statusOpen)} className="mt-1 flex w-full items-center justify-between rounded-[8px] border border-[#e0e0e0] px-3 py-2 text-[14px] text-black">
                <span className={STATUS_COLORS[status]}>{mapDbStatusToUi(status)}</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2"><path d="m6 9 6 6 6-6" /></svg>
              </button>
              {statusOpen && (
                <div className="absolute left-0 top-full z-10 mt-1 w-full rounded-[8px] border border-[#ddd] bg-white shadow-lg">
                  {DB_STATUS_OPTIONS.map((s) => (
                    <button key={s} type="button" onClick={() => { setStatus(s); setStatusOpen(false); }} className="block w-full px-3 py-2 text-left text-[13px] transition hover:bg-[#f6faf4]"><span className={STATUS_COLORS[s]}>{mapDbStatusToUi(s)}</span></button>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="mt-4">
            <label className="text-[13px] font-medium text-black">Mô tả</label>
            <textarea value={desc} onChange={(e) => setDesc(e.target.value.slice(0, 300))} rows={3} className="mt-1 w-full resize-none rounded-[8px] border border-[#e0e0e0] px-3 py-2 text-[14px] text-black outline-none focus:border-[#2e7d32]" />
            <p className="text-right text-[11px] text-[#999]">{desc.length}/300</p>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-4">
            <div>
              <label className="text-[13px] font-medium text-black">Giá (VNĐ)</label>
              <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} className="mt-1 w-full rounded-[8px] border border-[#e0e0e0] px-3 py-2 text-[14px] text-black outline-none focus:border-[#2e7d32]" />
            </div>
            <div className="relative">
              <label className="text-[13px] font-medium text-black">Danh mục</label>
              <button type="button" onClick={() => setCatOpen(!catOpen)} className="mt-1 flex w-full items-center justify-between rounded-[8px] border border-[#e0e0e0] px-3 py-2 text-[14px] text-black">
                <span>{danhMucList.find((d) => d.id.toString() === idDanhMuc)?.ten_danh_muc || 'Không phân loại'}</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2"><path d="m6 9 6 6 6-6" /></svg>
              </button>
              {catOpen && (
                <div className="absolute left-0 top-full z-10 mt-1 w-full rounded-[8px] border border-[#ddd] bg-white shadow-lg">
                  <button key="none" type="button" onClick={() => { setIdDanhMuc(''); setCatOpen(false); }} className="block w-full px-3 py-2 text-left text-[13px] text-black transition hover:bg-[#f6faf4]">Không phân loại</button>
                  {danhMucList.map((d) => (
                    <button key={d.id} type="button" onClick={() => { setIdDanhMuc(d.id.toString()); setCatOpen(false); }} className="block w-full px-3 py-2 text-left text-[13px] text-black transition hover:bg-[#f6faf4]">{d.ten_danh_muc}</button>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="mt-4">
            <p className="flex items-center gap-1 text-[13px] font-medium text-black">Topping<span className="text-[#2e7d32]">⊕</span></p>
            <div className="mt-2 space-y-2">
              {toppings.map((t, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="h-3 w-3 rounded-full border-2 border-[#2e7d32]" />
                  <input type="text" value={t.name} onChange={(e) => { const next = [...toppings]; next[i] = { ...next[i], name: e.target.value }; setToppings(next); }} placeholder="Tên topping" className="flex-1 text-[13px] text-black outline-none placeholder:text-[#bbb]" />
                  <input type="text" value={t.price} onChange={(e) => { const next = [...toppings]; next[i] = { ...next[i], price: e.target.value }; setToppings(next); }} placeholder="0đ" className="w-20 text-right text-[13px] text-black outline-none placeholder:text-[#bbb]" />
                  {toppings.length > 1 && (
                    <button type="button" onClick={() => setToppings(toppings.filter((_, j) => j !== i))} className="text-[#d32f2f] text-[12px]">×</button>
                  )}
                </div>
              ))}
              <button type="button" onClick={() => setToppings([...toppings, { name: '', price: '' }])} className="text-[12px] text-[#1976d2] hover:underline">+ Thêm topping</button>
            </div>
          </div>
          {error && <p className="mt-2 text-center text-[13px] text-[#d32f2f]">{error}</p>}
          <div className="mt-5 flex items-center justify-center gap-3">
            <button type="button" onClick={onClose} className="rounded-[10px] border border-[#ddd] bg-white px-8 py-2.5 text-[14px] font-semibold text-black transition hover:bg-gray-50" disabled={saving}>Hủy</button>
            <button type="button" onClick={handleSave} className="rounded-[10px] bg-[#2e7d32] px-8 py-2.5 text-[14px] font-semibold text-white transition hover:bg-[#256b28]" disabled={saving}>{saving ? 'Đang lưu...' : 'Lưu thay đổi'}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   DELETE MODAL
   ═══════════════════════════════════════════ */
function DeleteItemModal({ item, onClose, onDelete }: { item: MonAnItem; onClose: () => void; onDelete: () => void }) {
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState('');

  const handleDelete = async () => {
    setDeleting(true);
    setError('');
    try {
      await storeMenuApi.xoaMonAn(item.id);
      onDelete();
      onClose();
    } catch (error: unknown) {
      setError(getErrorMessage(error, 'Lỗi khi xóa'));
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm" onClick={onClose}>
      <div className="relative w-full max-w-[500px] rounded-[16px] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.18)]" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 pt-5">
          <div />
          <h3 className="text-[17px] font-bold text-black">Xóa món</h3>
          <button type="button" onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f0f0f0] text-[18px] text-[#555] transition hover:bg-[#e0e0e0]">×</button>
        </div>
        <div className="px-6 pb-6 pt-4">
          <div className="flex items-center gap-4 rounded-[10px] border border-[#e8e8e8] p-4">
            <img src={item.hinh_anh_dai_dien || menuFallbackImage} alt={item.ten_mon} className="h-14 w-14 rounded-[8px] object-cover" />
            <div>
              <p className="text-[15px] font-semibold text-black">{item.ten_mon}</p>
              <p className="text-[13px] text-[#f0a050]">{fmt(item.gia_ban)}</p>
            </div>
          </div>
          <p className="mt-3 text-center text-[13px] text-[#666]">Bạn có chắc chắn muốn xóa món này không? Hành động này không thể hoàn tác.</p>
          {error && <p className="mt-2 text-center text-[13px] text-[#d32f2f]">{error}</p>}
          <div className="mt-5 flex items-center justify-center gap-3">
            <button type="button" onClick={onClose} className="rounded-[10px] border border-[#ddd] bg-white px-8 py-2.5 text-[14px] font-semibold text-black transition hover:bg-gray-50" disabled={deleting}>Hủy</button>
            <button type="button" onClick={handleDelete} className="rounded-[10px] bg-[#d32f2f] px-8 py-2.5 text-[14px] font-semibold text-white transition hover:bg-[#b71c1c]" disabled={deleting}>{deleting ? 'Đang xóa...' : 'Xóa'}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   ADD NEW ITEM MODAL
   ═══════════════════════════════════════════ */
function AddItemModal({
  danhMucList,
  onClose,
  onAdd,
}: {
  danhMucList: DanhMucItem[];
  onClose: () => void;
  onAdd: (item: MonAnItem) => void;
}) {
  const [name, setName] = useState('');
  const [status, setStatus] = useState<ItemStatus>('dang_ban');
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [idDanhMuc, setIdDanhMuc] = useState('');
  const [toppings, setToppings] = useState([{ name: '', price: '' }]);
  const [statusOpen, setStatusOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleAdd = async () => {
    if (!name.trim()) { setError('Tên món không được để trống'); return; }
    const priceNum = parseFloat(price.replace(/\D/g, '')) || 0;
    if (priceNum < 0) { setError('Giá không hợp lệ'); return; }
    setSaving(true);
    setError('');
    try {
      const result = await storeMenuApi.taoMonAn({
        ten_mon: name.trim(),
        mo_ta: desc,
        gia_ban: priceNum,
        id_danh_muc: idDanhMuc || undefined,
        hinh_anh_dai_dien: imageUrl || undefined,
        trang_thai_ban: status,
        toppings: toppings.filter((t) => t.name.trim()).map((t) => ({
          ten_topping: t.name.trim(),
          gia: parseFloat(t.price.replace(/\D/g, '')) || 0,
        })),
      });
      onAdd({
        id: result.id,
        ma_mon: '',
        ten_mon: name,
        mo_ta: desc || null,
        hinh_anh_dai_dien: imageUrl || null,
        gia_ban: priceNum,
        gia_goc: null,
        trang_thai_ban: status,
        so_luong_da_ban: 0,
        diem_danh_gia: 0,
        tong_danh_gia: 0,
        la_mon_noi_bat: false,
        id_danh_muc: idDanhMuc ? Number(idDanhMuc) : null,
        ten_danh_muc: danhMucList.find((d) => d.id.toString() === idDanhMuc)?.ten_danh_muc ?? null,
        toppings: [],
      });
      onClose();
    } catch (error: unknown) {
      setError(getErrorMessage(error, 'Lỗi khi thêm món'));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm" onClick={onClose}>
      <div className="relative w-full max-w-[540px] rounded-[16px] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.18)]" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 pt-5">
          <div />
          <h3 className="text-[17px] font-bold text-black">Thông tin món mới</h3>
          <button type="button" onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f0f0f0] text-[18px] text-[#555] transition hover:bg-[#e0e0e0]">×</button>
        </div>
        <div className="px-6 pb-6 pt-4">
          <div className="flex items-center gap-4 rounded-[10px] border border-dashed border-[#ccc] p-4">
            {imageUrl ? (
              <img src={imageUrl} alt="preview" className="h-16 w-16 rounded-[8px] object-cover" />
            ) : (
              <div className="flex h-16 w-16 items-center justify-center rounded-[8px] bg-[#f0f0f0] text-[24px] text-[#999]">+</div>
            )}
            <div className="flex-1">
              <label className="text-[13px] font-medium text-black">Hình ảnh món</label>
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Dán URL hình ảnh"
                className="mt-1 w-full rounded-[8px] border border-[#e0e0e0] px-3 py-2 text-[13px] text-black outline-none focus:border-[#2e7d32]"
              />
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <label className="text-[13px] font-medium text-black">Tên Món <span className="text-[#d32f2f]">*</span></label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Tên món mới" className="mt-1 w-full rounded-[8px] border border-[#e0e0e0] px-3 py-2 text-[14px] text-black outline-none placeholder:text-[#bbb] focus:border-[#2e7d32]" />
            </div>
            <div className="relative">
              <label className="text-[13px] font-medium text-black">Trạng thái</label>
              <button type="button" onClick={() => setStatusOpen(!statusOpen)} className="mt-1 flex w-full items-center justify-between rounded-[8px] border border-[#e0e0e0] px-3 py-2 text-[14px] text-black">
                <span className={STATUS_COLORS[status]}>{mapDbStatusToUi(status)}</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2"><path d="m6 9 6 6 6-6" /></svg>
              </button>
              {statusOpen && (
                <div className="absolute left-0 top-full z-10 mt-1 w-full rounded-[8px] border border-[#ddd] bg-white shadow-lg">
                  {DB_STATUS_OPTIONS.map((s) => (
                    <button key={s} type="button" onClick={() => { setStatus(s); setStatusOpen(false); }} className="block w-full px-3 py-2 text-left text-[13px] transition hover:bg-[#f6faf4]"><span className={STATUS_COLORS[s]}>{mapDbStatusToUi(s)}</span></button>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="mt-4">
            <label className="text-[13px] font-medium text-black">Mô tả</label>
            <textarea value={desc} onChange={(e) => setDesc(e.target.value.slice(0, 300))} rows={3} placeholder="Mô tả ngắn gọn về món ăn" className="mt-1 w-full resize-none rounded-[8px] border border-[#e0e0e0] px-3 py-2 text-[14px] text-black outline-none placeholder:text-[#bbb] focus:border-[#2e7d32]" />
            <p className="text-right text-[11px] text-[#999]">{desc.length}/300</p>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-4">
            <div>
              <label className="text-[13px] font-medium text-black">Giá (VNĐ) <span className="text-[#d32f2f]">*</span></label>
              <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="0đ" className="mt-1 w-full rounded-[8px] border border-[#e0e0e0] px-3 py-2 text-[14px] text-black outline-none placeholder:text-[#bbb] focus:border-[#2e7d32]" />
            </div>
            <div className="relative">
              <label className="text-[13px] font-medium text-black">Danh mục</label>
              <button type="button" onClick={() => setCatOpen(!catOpen)} className="mt-1 flex w-full items-center justify-between rounded-[8px] border border-[#e0e0e0] px-3 py-2 text-[14px] text-black">
                <span className={idDanhMuc ? '' : 'text-[#bbb]'}>{danhMucList.find((d) => d.id.toString() === idDanhMuc)?.ten_danh_muc || 'Chọn danh mục'}</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2"><path d="m6 9 6 6 6-6" /></svg>
              </button>
              {catOpen && (
                <div className="absolute left-0 top-full z-10 mt-1 w-full rounded-[8px] border border-[#ddd] bg-white shadow-lg">
                  <button key="none" type="button" onClick={() => { setIdDanhMuc(''); setCatOpen(false); }} className="block w-full px-3 py-2 text-left text-[13px] text-black transition hover:bg-[#f6faf4]">Không phân loại</button>
                  {danhMucList.map((d) => (
                    <button key={d.id} type="button" onClick={() => { setIdDanhMuc(d.id.toString()); setCatOpen(false); }} className="block w-full px-3 py-2 text-left text-[13px] text-black transition hover:bg-[#f6faf4]">{d.ten_danh_muc}</button>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="mt-4">
            <p className="flex items-center gap-1 text-[13px] font-medium text-black">Topping<span className="text-[#2e7d32]">⊕</span></p>
            <div className="mt-2 space-y-2">
              {toppings.map((t, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="h-3 w-3 rounded-full border-2 border-[#2e7d32]" />
                  <input type="text" value={t.name} onChange={(e) => { const next = [...toppings]; next[i] = { ...next[i], name: e.target.value }; setToppings(next); }} placeholder="Tên topping" className="flex-1 text-[13px] text-black outline-none placeholder:text-[#bbb]" />
                  <input type="text" value={t.price} onChange={(e) => { const next = [...toppings]; next[i] = { ...next[i], price: e.target.value }; setToppings(next); }} placeholder="+0đ" className="w-20 text-right text-[13px] text-black outline-none placeholder:text-[#bbb]" />
                  {toppings.length > 1 && (
                    <button type="button" onClick={() => setToppings(toppings.filter((_, j) => j !== i))} className="text-[#d32f2f] text-[12px]">×</button>
                  )}
                </div>
              ))}
              <button type="button" onClick={() => setToppings([...toppings, { name: '', price: '' }])} className="text-[12px] text-[#1976d2] hover:underline">+ Thêm topping</button>
            </div>
          </div>
          {error && <p className="mt-2 text-center text-[13px] text-[#d32f2f]">{error}</p>}
          <div className="mt-5 flex items-center justify-center gap-3">
            <button type="button" onClick={onClose} className="rounded-[10px] border border-[#ddd] bg-white px-8 py-2.5 text-[14px] font-semibold text-black transition hover:bg-gray-50" disabled={saving}>Hủy</button>
            <button type="button" onClick={handleAdd} className="rounded-[10px] bg-[#2e7d32] px-8 py-2.5 text-[14px] font-semibold text-white transition hover:bg-[#256b28]" disabled={saving}>{saving ? 'Đang thêm...' : 'Thêm'}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   SOLD OUT MODAL
   ═══════════════════════════════════════════ */
function SoldOutModal({ hetMon, onClose }: { hetMon: TopMonItem[]; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm" onClick={onClose}>
      <div className="relative w-full max-w-[600px] rounded-[16px] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.18)]" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 pt-5">
          <div />
          <h3 className="text-[17px] font-bold text-black">Danh sách các món đã hết</h3>
          <button type="button" onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f0f0f0] text-[18px] text-[#555] transition hover:bg-[#e0e0e0]">×</button>
        </div>
        <div className="px-6 pb-6 pt-4">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-[#e8e8e8] text-left text-[#888]">
                <th className="py-3 font-medium" />
                <th className="py-3 font-medium">Tên Món</th>
                <th className="py-3 font-medium">Số lượng đã bán</th>
                <th className="py-3 font-medium">Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {hetMon.length === 0 && (
                <tr><td colSpan={4} className="py-6 text-center text-[#999]">Không có món hết</td></tr>
              )}
              {hetMon.map((item, i) => (
                <tr key={item.id} className="border-b border-[#f0f0f0]">
                  <td className="py-3 text-black">{i + 1}</td>
                  <td className="py-3">
                    <div className="flex items-center gap-3">
                      <img src={item.hinh_anh_dai_dien || menuFallbackImage} alt={item.ten_mon} className="h-10 w-10 rounded-[6px] object-cover" />
                      <div>
                        <p className="text-[13px] font-medium text-black">{item.ten_mon}</p>
                        <p className="text-[12px] text-[#f0a050]">{fmt(item.gia_ban)}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 text-black">Đã bán {item.so_luong_da_ban}</td>
                  <td className="py-3 font-semibold text-[#d32f2f]">Hết hàng</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   MENU TAB
   ═══════════════════════════════════════════ */
export default function MenuTab() {
  const [items, setItems] = useState<MonAnItem[]>([]);
  const [topItems, setTopItems] = useState<TopMonItem[]>([]);
  const [hetMonItems, setHetMonItems] = useState<TopMonItem[]>([]);
  const [danhMucList, setDanhMucList] = useState<DanhMucItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [statusFilter, setStatusFilter] = useState<ItemStatus | 'Tất cả'>('Tất cả');
  const [statusDropdown, setStatusDropdown] = useState(false);
  const [sortBy, setSortBy] = useState<MenuSortOption>('moi_nhat');
  const [sortDropdown, setSortDropdown] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [editItem, setEditItem] = useState<MonAnItem | null>(null);
  const [deleteItem, setDeleteItem] = useState<MonAnItem | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [showSoldOut, setShowSoldOut] = useState(false);

  // Load danh mục
  const loadDanhMuc = useCallback(async () => {
    try {
      const res = await storeMenuApi.layDanhSachDanhMuc();
      setDanhMucList(res.du_lieu);
    } catch { /* ignore */ }
  }, []);

  // Load món ăn
  const loadItems = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const res = await storeMenuApi.layDanhSach({
        tim_kiem: searchText || undefined,
        id_danh_muc: activeCategory !== 'all' ? activeCategory : undefined,
        trang_thai: statusFilter !== 'Tất cả' ? statusFilter as ItemStatus : undefined,
        sap_xep: sortBy,
        trang: page,
        so_luong: 20,
      });
      setItems(res.du_lieu);
      setTopItems(res.top_ban_chay);
      setHetMonItems(res.het_mon);
      setTotalPages(res.tong_trang);
      setTotalItems(res.tong_so);
      setCurrentPage(page);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [searchText, activeCategory, statusFilter, sortBy]);

  useEffect(() => {
    loadDanhMuc();
  }, [loadDanhMuc]);

  useEffect(() => {
    loadItems(1);
  }, [loadItems]);

  // Reload khi filter thay đổi (debounce search)
  useEffect(() => {
    const t = setTimeout(() => loadItems(1), 400);
    return () => clearTimeout(t);
  }, [searchText, loadItems]);

  // Category filter bar
  const categoryOptions = useMemo(() => {
    return [
      { key: 'all', label: `Tất cả (${totalItems})` },
      ...danhMucList.map((d) => ({
        key: d.id.toString(),
        label: d.ten_danh_muc,
      })),
    ];
  }, [danhMucList, totalItems]);

  const filteredItems = useMemo(() => items, [items]);

  const handleSaveItem = (updated: MonAnItem) => {
    setItems((prev) => prev.map((i) => (i.id === updated.id ? updated : i)));
  };

  const handleDeleteItem = (id: number) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
    setTotalItems((n) => n - 1);
  };

  const handleAddItem = (newItem: MonAnItem) => {
    setItems((prev) => [newItem, ...prev]);
    setTotalItems((n) => n + 1);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-[22px] font-bold uppercase text-black">QUẢN LÝ MENU</h1>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-full border border-[#ddd] bg-white px-4 py-2">
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Tìm kiếm món"
              className="w-40 bg-transparent text-[14px] text-black outline-none placeholder:text-[#999]"
            />
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
          </div>
          <button
            type="button"
            onClick={() => setShowAdd(true)}
            className="flex items-center gap-2 rounded-[10px] bg-[#2e7d32] px-5 py-2.5 text-[14px] font-semibold text-white transition hover:bg-[#256b28]"
          >
            <span className="text-[16px]">+</span> Thêm món
          </button>
        </div>
      </div>

      {/* Top selling + Sold out row */}
      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        {/* Top selling */}
        <div className="rounded-[12px] bg-white p-5 shadow-sm">
          <h3 className="text-[15px] font-bold text-black">Top món bán chạy hôm nay</h3>
          {loading && topItems.length === 0 ? (
            <div className="mt-4 space-y-4">
              {[1, 2].map((i) => <div key={i} className="h-14 animate-pulse rounded-[8px] bg-gray-200" />)}
            </div>
          ) : topItems.length === 0 ? (
            <p className="mt-4 text-[13px] text-[#999]">Chưa có dữ liệu bán chạy</p>
          ) : (
            <div className="mt-4 space-y-4">
              {topItems.map((item, i) => (
                <div key={item.id} className="flex items-center gap-4">
                  <span className="text-[16px] font-bold text-[#555]">{i + 1} :</span>
                  <img src={item.hinh_anh_dai_dien || menuFallbackImage} alt={item.ten_mon} className="h-12 w-16 rounded-[6px] object-cover" />
                  <div className="flex-1">
                    <p className="text-[14px] font-medium text-black">{item.ten_mon}</p>
                    <p className="text-[12px] text-[#f0a050]">{fmt(item.gia_ban)}</p>
                  </div>
                  <span className="text-[14px] font-semibold text-[#2e7d32]">{item.so_luong_da_ban} Lượt bán</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sold out items */}
        <div className="rounded-[12px] bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-[15px] font-bold text-black">Danh sách các món đã hết</h3>
            <button type="button" onClick={() => setShowSoldOut(true)} className="text-[13px] font-medium text-[#1976d2] transition hover:underline">
              Xem thêm ({hetMonItems.length})
            </button>
          </div>
          <div className="mt-4 space-y-3">
            {hetMonItems.slice(0, 3).length === 0 ? (
              <p className="text-[13px] text-[#999]">Không có món hết hàng</p>
            ) : (
              hetMonItems.slice(0, 3).map((item, i) => (
                <div key={item.id} className="flex items-center gap-4">
                  <span className="text-[14px] font-bold text-[#555]">{i + 1}</span>
                  <img src={item.hinh_anh_dai_dien || menuFallbackImage} alt={item.ten_mon} className="h-10 w-12 rounded-[6px] object-cover" />
                  <div className="flex-1">
                    <p className="text-[13px] font-medium text-black">{item.ten_mon}</p>
                    <p className="text-[11px] text-[#f0a050]">{fmt(item.gia_ban)}</p>
                  </div>
                  <span className="text-[13px] font-semibold text-[#d32f2f]">Đã bán {item.so_luong_da_ban}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Danh sách món */}
      <div className="mt-5 rounded-[12px] bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-[15px] font-bold text-black">Danh sách món</h3>
          <div className="flex items-center gap-3">
            {/* Sort */}
            <div className="relative">
              <button type="button" onClick={() => setSortDropdown(!sortDropdown)} className="flex items-center gap-1 rounded-[8px] border border-[#ddd] bg-white px-3 py-1.5 text-[13px] text-black">
                <span>Sắp xếp</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2"><path d="m6 9 6 6 6-6" /></svg>
              </button>
              {sortDropdown && (
                <div className="absolute right-0 top-[calc(100%+4px)] z-10 w-[160px] rounded-[8px] border border-[#ddd] bg-white shadow-lg">
                  {SORT_OPTIONS.map((opt) => (
                    <button key={opt.value} type="button" onClick={() => { setSortBy(opt.value); setSortDropdown(false); }} className={`block w-full px-3 py-2 text-left text-[13px] transition hover:bg-[#f6faf4] ${sortBy === opt.value ? 'font-bold text-[#2e7d32]' : 'text-black'}`}>{opt.label}</button>
                  ))}
                </div>
              )}
            </div>
            {/* Status filter */}
            <div className="relative">
              <button type="button" onClick={() => setStatusDropdown(!statusDropdown)} className="flex items-center gap-1 rounded-[8px] border border-[#ddd] bg-white px-3 py-1.5 text-[13px] text-black">
                <span>Trạng thái món</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2"><path d="m6 9 6 6 6-6" /></svg>
              </button>
              {statusDropdown && (
                <div className="absolute right-0 top-[calc(100%+4px)] z-10 w-[160px] rounded-[8px] border border-[#ddd] bg-white shadow-lg">
                  <button type="button" onClick={() => { setStatusFilter('Tất cả'); setStatusDropdown(false); }} className={`block w-full px-3 py-2 text-left text-[13px] transition hover:bg-[#f6faf4] ${statusFilter === 'Tất cả' ? 'font-bold text-[#2e7d32]' : 'text-black'}`}>Tất cả</button>
                  {DB_STATUS_OPTIONS.map((s) => (
                    <button key={s} type="button" onClick={() => { setStatusFilter(s); setStatusDropdown(false); }} className={`block w-full px-3 py-2 text-left text-[13px] transition hover:bg-[#f6faf4] ${statusFilter === s ? 'font-bold text-[#2e7d32]' : 'text-black'}`}>{mapDbStatusToUi(s)}</button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Category tabs */}
        <div className="mt-4 flex items-center gap-1">
          <span className="mr-2 text-[13px] text-[#888]">Phân loại</span>
          {categoryOptions.map((cat) => (
            <button
              key={cat.key}
              type="button"
              onClick={() => setActiveCategory(cat.key)}
              className={`rounded-full px-4 py-1.5 text-[13px] font-medium transition ${
                activeCategory === cat.key
                  ? 'bg-[#333] text-white'
                  : 'border border-[#ddd] bg-white text-black hover:bg-gray-50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="mt-4 overflow-x-auto">
          {loading && items.length === 0 ? (
            <div className="space-y-3 py-4">
              {[1, 2, 3, 4].map((i) => <div key={i} className="h-12 animate-pulse rounded-[4px] bg-gray-200" />)}
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="py-10 text-center text-[14px] text-[#999]">
              {searchText ? `Không tìm thấy món phù hợp với "${searchText}"` : 'Chưa có món ăn nào'}
            </div>
          ) : (
            <table className="w-full text-[13px]">
              <thead>
                <tr className="border-b border-[#e8e8e8] text-left text-[#888]">
                  <th className="px-2 py-3 font-medium">STT</th>
                  <th className="px-2 py-3 font-medium">Mã món</th>
                  <th className="px-2 py-3 font-medium">Tên món</th>
                  <th className="px-2 py-3 font-medium">Đơn giá</th>
                  <th className="px-2 py-3 font-medium">Số lượng đã bán</th>
                  <th className="px-2 py-3 font-medium">Trạng thái</th>
                  <th className="px-2 py-3 font-medium" colSpan={2}></th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item, idx) => (
                  <tr key={item.id} className="border-b border-[#f0f0f0]">
                    <td className="px-2 py-3 text-black">{(currentPage - 1) * 20 + idx + 1}</td>
                    <td className="px-2 py-3 font-medium text-black">{item.ma_mon || '—'}</td>
                    <td className="px-2 py-3">
                      <div className="flex items-center gap-3">
                        <img src={item.hinh_anh_dai_dien || menuFallbackImage} alt={item.ten_mon} className="h-8 w-8 rounded-[4px] object-cover" />
                        <span className="text-[13px] text-black">{item.ten_mon}</span>
                      </div>
                    </td>
                    <td className="px-2 py-3 text-[#f0a050]">{fmt(item.gia_ban)}</td>
                    <td className="px-2 py-3 text-[#2e7d32]">{item.so_luong_da_ban} lượt bán</td>
                    <td className={`px-2 py-3 font-semibold ${STATUS_COLORS[item.trang_thai_ban]}`}>{mapDbStatusToUi(item.trang_thai_ban)}</td>
                    <td className="px-2 py-3">
                      <button type="button" onClick={() => setEditItem(item)} className="rounded-[4px] bg-[#f0a050] px-3 py-1 text-[11px] font-semibold text-white transition hover:bg-[#e89030]">Sửa</button>
                    </td>
                    <td className="px-2 py-3">
                      <button type="button" onClick={() => setDeleteItem(item)} className="rounded-[4px] bg-[#d32f2f] px-3 py-1 text-[11px] font-semibold text-white transition hover:bg-[#b71c1c]">Xóa</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-5 flex items-center justify-center gap-1">
            <button
              onClick={() => currentPage > 1 && loadItems(currentPage - 1)}
              className={`flex h-8 w-8 items-center justify-center rounded-full text-[13px] transition ${currentPage > 1 ? 'text-[#555] hover:bg-[#f0f0f0]' : 'text-[#ccc] cursor-not-allowed'}`}
            >‹</button>
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              const p = i + 1;
              return (
                <button key={p} type="button" onClick={() => loadItems(p)} className={`flex h-8 w-8 items-center justify-center rounded-full text-[13px] transition ${currentPage === p ? 'bg-[#2e7d32] font-bold text-white' : 'text-[#555] hover:bg-[#f0f0f0]'}`}>{p}</button>
              );
            })}
            <button
              onClick={() => currentPage < totalPages && loadItems(currentPage + 1)}
              className={`flex h-8 w-8 items-center justify-center rounded-full text-[13px] transition ${currentPage < totalPages ? 'text-[#555] hover:bg-[#f0f0f0]' : 'text-[#ccc] cursor-not-allowed'}`}
            >›</button>
          </div>
        )}
      </div>

      {/* Modals */}
      {editItem && (
        <EditItemModal
          item={editItem}
          danhMucList={danhMucList}
          onClose={() => setEditItem(null)}
          onSave={handleSaveItem}
        />
      )}
      {deleteItem && (
        <DeleteItemModal
          item={deleteItem}
          onClose={() => setDeleteItem(null)}
          onDelete={() => handleDeleteItem(deleteItem.id)}
        />
      )}
      {showAdd && (
        <AddItemModal
          danhMucList={danhMucList}
          onClose={() => setShowAdd(false)}
          onAdd={handleAddItem}
        />
      )}
      {showSoldOut && <SoldOutModal hetMon={hetMonItems} onClose={() => setShowSoldOut(false)} />}
    </div>
  );
}
