import Link from 'next/link';

export default function Footer() {
    return (
        <div className="bg-white mt-auto">
            <div className="bg-white mt-auto border-t border-gray-100">
                {/* Footer Links */}
                <footer className="max-w-[1200px] mx-auto px-5 py-10 grid grid-cols-4 gap-8 max-md:grid-cols-2 max-sm:grid-cols-1">
                    <div>
                        <h3 className="text-base font-bold text-gray-500 mb-4">Khám phá</h3>
                        <ul className="flex flex-col gap-2.5">
                            <li><Link href="/" className="text-sm text-blue-link hover:text-green-primary transition-all duration-200 hover:pl-1">Ứng dụng Mobile</Link></li>
                            <li><Link href="/" className="text-sm text-blue-link hover:text-green-primary transition-all duration-200 hover:pl-1">Tạo bộ sưu tập</Link></li>
                            <li><Link href="/" className="text-sm text-blue-link hover:text-green-primary transition-all duration-200 hover:pl-1">Bảo mật thông tin</Link></li>
                            <li><Link href="/" className="text-sm text-blue-link hover:text-green-primary transition-all duration-200 hover:pl-1">Quy định</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-base font-bold text-gray-500 mb-4">Công ty</h3>
                        <ul className="flex flex-col gap-2.5">
                            <li><Link href="/" className="text-sm text-blue-link hover:text-green-primary transition-all duration-200 hover:pl-1">Giới thiệu</Link></li>
                            <li><Link href="/" className="text-sm text-blue-link hover:text-green-primary transition-all duration-200 hover:pl-1">Trợ giúp</Link></li>
                            <li><Link href="/" className="text-sm text-blue-link hover:text-green-primary transition-all duration-200 hover:pl-1">Việc làm</Link></li>
                            <li><Link href="/" className="text-sm text-blue-link hover:text-green-primary transition-all duration-200 hover:pl-1">Quy chế</Link></li>
                            <li><Link href="/" className="text-sm text-blue-link hover:text-green-primary transition-all duration-200 hover:pl-1">Thỏa thuận sử dụng dịch vụ</Link></li>
                            <li><Link href="/" className="text-sm text-blue-link hover:text-green-primary transition-all duration-200 hover:pl-1">Liên hệ</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-base font-bold text-gray-500 mb-4">Tham gia trên</h3>
                        <ul className="flex flex-col gap-2.5">
                            <li><Link href="/" className="text-sm text-blue-link hover:text-green-primary transition-all duration-200 hover:pl-1">Facebook</Link></li>
                            <li><Link href="/" className="text-sm text-blue-link hover:text-green-primary transition-all duration-200 hover:pl-1">Instagram</Link></li>
                            <li><Link href="/" className="text-sm text-blue-link hover:text-green-primary transition-all duration-200 hover:pl-1">Youtube</Link></li>
                            <li><Link href="/" className="text-sm text-blue-link hover:text-green-primary transition-all duration-200 hover:pl-1">Google</Link></li>
                            <li>
                                <Link href="/" className="text-sm text-blue-link hover:text-green-primary transition-all duration-200 hover:pl-1">ShopeeFood.vn</Link>
                                <span className="text-sm text-gray-400"> - Giao đồ ăn tận nơi</span>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-base font-bold text-gray-500 mb-4">Giấy phép</h3>
                        <p className="text-sm text-gray-500">MXH 363/GP-BTTTT</p>
                    </div>
                </footer>
            </div>
        </div>
    );
}
