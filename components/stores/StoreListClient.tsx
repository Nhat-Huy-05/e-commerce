'use client';

import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Clock, 
  ExternalLink, 
  Check, 
  Search, 
  Navigation, 
  Building2,
  Sparkles,
  Wifi,
  Car,
  CreditCard
} from 'lucide-react';

interface Store {
  id: string;
  name: string;
  city: 'hue' | 'danang' | 'hanoi' | 'hcm';
  cityName: string;
  isHeadquarter?: boolean;
  address: string;
  district: string;
  hotline: string;
  openingHours: string;
  googleMapsUrl: string;
  amenities: string[];
}

const STORES: Store[] = [
  {
    id: 'store-hue',
    name: 'NextCommerce Flagship Huế (Trụ Sở Chính)',
    city: 'hue',
    cityName: 'TP. Huế',
    isHeadquarter: true,
    address: '77 Nguyễn Huệ, Phường Phú Nhuận',
    district: 'TP. Huế, Thừa Thiên Huế',
    hotline: '1900 6868 (Phím 1)',
    openingHours: '08:00 – 21:30 (Cả Thứ 7, CN & Ngày lễ)',
    googleMapsUrl: 'https://maps.google.com/?q=77+Nguyen+Hue+Hue',
    amenities: [
      'Trải nghiệm sản phẩm thực tế',
      'Trung tâm bảo hành ủy quyền',
      'Đỗ xe ô tô & xe máy miễn phí',
      'Wifi 6 tốc độ cao',
      'Khu vực kỹ thuật & cài đặt phần mềm',
      'Thanh toán thẻ, QR, chuyển khoản'
    ]
  },
  {
    id: 'store-danang',
    name: 'NextCommerce Showroom Đà Nẵng',
    city: 'danang',
    cityName: 'Đà Nẵng',
    address: '254 Nguyễn Văn Linh, Phường Thạc Gián',
    district: 'Quận Thanh Khê, TP. Đà Nẵng',
    hotline: '0236 3777 888',
    openingHours: '08:00 – 21:30 (Mở cửa cả tuần)',
    googleMapsUrl: 'https://maps.google.com/?q=254+Nguyen+Van+Linh+Da+Nang',
    amenities: [
      'Bàn trải nghiệm máy công nghệ mới',
      'Hỗ trợ dán màn hình & phụ kiện',
      'Bãi đỗ xe tiện lợi',
      'Giao hàng nội thành trong 2 giờ'
    ]
  },
  {
    id: 'store-hanoi',
    name: 'NextCommerce Showroom Hà Nội',
    city: 'hanoi',
    cityName: 'Hà Nội',
    address: '18 Phố Thái Hà, Phường Trung Liệt',
    district: 'Quận Đống Đa, TP. Hà Nội',
    hotline: '024 3999 6666',
    openingHours: '08:00 – 22:00 (Mở cửa cả tuần)',
    googleMapsUrl: 'https://maps.google.com/?q=18+Thai+Ha+Dong+Da+Ha+Noi',
    amenities: [
      'Trưng bày đầy đủ Flagship & Laptop',
      'Kỹ thuật viên chuyển dữ liệu miễn phí',
      'Tiếp nhận đổi trả trong 7 ngày',
      'Thanh toán linh hoạt & trả góp 0%'
    ]
  },
  {
    id: 'store-hcm',
    name: 'NextCommerce Showroom TP. Hồ Chí Minh',
    city: 'hcm',
    cityName: 'TP. Hồ Chí Minh',
    address: '136 Nguyễn Thị Minh Khai, Phường Bến Thành',
    district: 'Quận 1, TP. Hồ Chí Minh',
    hotline: '028 3888 7777',
    openingHours: '08:00 – 22:00 (Mở cửa cả tuần)',
    googleMapsUrl: 'https://maps.google.com/?q=136+Nguyen+Thi+Minh+Khai+Quan+1+Ho+Chi+Minh',
    amenities: [
      'Không gian công nghệ hiện đại tiêu chuẩn cao',
      'Chuyên viên tư vấn sản phẩm chuyên sâu',
      'Hỗ trợ giao hỏa tốc 1 - 2 giờ',
      'Máy lạnh & phục vụ nước uống miễn phí'
    ]
  }
];

export function StoreListClient() {
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [searchFilter, setSearchFilter] = useState('');

  const cityTabs = [
    { key: 'all', label: 'Tất cả chi nhánh', count: STORES.length },
    { key: 'hue', label: 'TP. Huế', count: STORES.filter((s) => s.city === 'hue').length },
    { key: 'danang', label: 'Đà Nẵng', count: STORES.filter((s) => s.city === 'danang').length },
    { key: 'hanoi', label: 'Hà Nội', count: STORES.filter((s) => s.city === 'hanoi').length },
    { key: 'hcm', label: 'TP. HCM', count: STORES.filter((s) => s.city === 'hcm').length },
  ];

  const filteredStores = STORES.filter((store) => {
    const matchCity = selectedCity === 'all' || store.city === selectedCity;
    const matchSearch =
      store.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      store.address.toLowerCase().includes(searchFilter.toLowerCase()) ||
      store.cityName.toLowerCase().includes(searchFilter.toLowerCase());
    return matchCity && matchSearch;
  });

  return (
    <div className="space-y-6">
      {/* Search and City Filter Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* City Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 custom-scrollbar">
            {cityTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setSelectedCity(tab.key)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCity === tab.key
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>

          {/* Quick Search inside store list */}
          <div className="relative min-w-[220px]">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Tìm theo đường hoặc tên..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-1.5 pl-8 pr-3 text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none transition-all"
            />
          </div>
        </div>
      </div>

      {/* Store Cards Grid */}
      {filteredStores.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500 text-xs">
          Không tìm thấy cửa hàng nào khớp với tìm kiếm của bạn. Vui lòng chọn thành phố khác.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredStores.map((store) => (
            <div
              key={store.id}
              className={`bg-white rounded-3xl border transition-all duration-200 p-6 sm:p-7 flex flex-col justify-between shadow-sm hover:shadow-md ${
                store.isHeadquarter
                  ? 'border-indigo-300 ring-2 ring-indigo-500/10'
                  : 'border-slate-200'
              }`}
            >
              <div className="space-y-4">
                {/* Header of Card */}
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-bold text-[10px] uppercase font-mono">
                        {store.cityName}
                      </span>
                      {store.isHeadquarter && (
                        <span className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200 font-bold text-[10px] uppercase font-mono flex items-center gap-1">
                          <Sparkles className="w-2.5 h-2.5" /> Trụ sở chính
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-extrabold text-slate-900 pt-0.5">
                      {store.name}
                    </h3>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                    <Building2 className="w-5 h-5" />
                  </div>
                </div>

                {/* Details list */}
                <div className="space-y-2.5 text-xs text-slate-600 border-t border-slate-100 pt-3">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-slate-900">{store.address}</p>
                      <p className="text-slate-500">{store.district}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-indigo-600 shrink-0" />
                    <span>
                      Hotline: <strong className="text-slate-900">{store.hotline}</strong>
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-indigo-600 shrink-0" />
                    <span>
                      Giờ mở cửa: <span className="text-slate-800">{store.openingHours}</span>
                    </span>
                  </div>
                </div>

                {/* Amenities Badges */}
                <div className="pt-2">
                  <p className="text-[11px] font-bold text-slate-800 mb-2 uppercase font-mono">
                    Tiện ích tại showroom:
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px] text-slate-600">
                    {store.amenities.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-1.5">
                        <Check className="w-3 h-3 text-emerald-600 shrink-0" />
                        <span className="line-clamp-1">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2.5 pt-5 mt-4 border-t border-slate-100">
                <a
                  href={`tel:${(store.hotline.split(' ')[0] ?? '').replace(/[^0-9]/g, '') || '19006868'}`}
                  className="flex-1 py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl text-center transition-colors flex items-center justify-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-slate-600" />
                  Gọi cửa hàng
                </a>
                <a
                  href={store.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 px-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl text-center transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  Xem bản đồ & chỉ đường
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
