import facebook from '../../assets/images/facebook.png';
import instagram from '../../assets/images/instagram.png';
import tiktok from '../../assets/images/tiktok.png';
import youtube from '../../assets/images/youtube.png';

const Footer = () => {
  return (
    <footer className='bg-neutral-100 py-16'>
      <div className='container'>
        <div className='grid grid-cols-12 gap-6 mb-5'>
          <div className='col-span-3'>
            <p className='text-sm font-semibold text-gray-600'>CHĂM SÓC KHÁCH HÀNG</p>
            <p className='mt-4 text-sm text-gray-600'>Trung Tâm Trợ Giúp</p>
            <p className='mt-2 text-sm text-gray-600'>Hướng Dẫn Mua Hàng</p>
            <p className='mt-2 text-sm text-gray-600'>Hướng Dẫn Bán Hàng</p>
            <p className='mt-2 text-sm text-gray-600'>Thanh Toán</p>
            <p className='mt-2 text-sm text-gray-600'>Shopee Xu</p>
            <p className='mt-2 text-sm text-gray-600'>Shopee Đảm Bảo</p>
            <p className='mt-2 text-sm text-gray-600'>Trả Hàng & Hoàn Tiền</p>
            <p className='mt-2 text-sm text-gray-600'>Shopee Mall</p>
            <p className='mt-2 text-sm text-gray-600'>Liên Hệ Shopee</p>
          </div>
          <div className='col-span-3'>
            <p className='text-sm font-semibold text-gray-600'>VỀ SHOPEE</p>
            <p className='mt-4 text-sm text-gray-600'>Giới Thiệu Về Shopee Việt Nam</p>
            <p className='mt-2 text-sm text-gray-600'>Tuyển Dụng</p>
            <p className='mt-2 text-sm text-gray-600'>Điều Khoản Shopee</p>
            <p className='mt-2 text-sm text-gray-600'>Chính Sách Bảo Mật</p>
            <p className='mt-2 text-sm text-gray-600'>Shopee Blog</p>
            <p className='mt-2 text-sm text-gray-600'>Chính Hãng</p>
            <p className='mt-2 text-sm text-gray-600'>Kênh Người Bán</p>
            <p className='mt-2 text-sm text-gray-600'>Flash Sales</p>
            <p className='mt-2 text-sm text-gray-600'>Liên Hệ Với Truyền Thông</p>
          </div>
          <div className='col-span-3'>
            <p className='text-sm font-semibold text-gray-600'>THEO DÕI CHÚNG TÔI</p>
            <div className='mt-4 text-sm text-gray-600 flex'>
              <div className='mr-1'>
                <img src={facebook} alt='facebook' width={18} height={18} />
              </div>
              <span>Facebook</span>
            </div>
            <div className='mt-2 text-sm text-gray-600 flex'>
              <div className='mr-1'>
                <img src={instagram} alt='instagram' width={18} height={18} />
              </div>
              <span>Instagram</span>
            </div>
            <div className='mt-2 text-sm text-gray-600 flex'>
              <div className='mr-1'>
                <img src={tiktok} alt='tiktok' width={18} height={18} />
              </div>
              <span>Tiktok</span>
            </div>
            <div className='mt-2 text-sm text-gray-600 flex'>
              <div className='mr-1'>
                <img src={youtube} alt='youtube' width={18} height={18} />
              </div>
              <span>Youtube</span>
            </div>
          </div>
          <div className='col-span-3'>
            <p className='text-sm font-semibold text-gray-600'>THANH TOÁN</p>
            <div className='flex gap-2'>
              <div className='bg-white w-14 h-7 p-1 rounded mt-4 shadow shadow-blue-100 '>
                <img src='https://down-sg.img.susercontent.com/file/27f8706bf1e76f48fd403ae94fe8f89d' alt='logo' />
              </div>
              <div className='bg-white w-14 h-7 p-1 rounded mt-4 shadow shadow-blue-100'>
                <img src='https://down-sg.img.susercontent.com/file/244d04e08cb94810bbbd1bdba3963b1e' alt='logo' />
              </div>
              <div className='bg-white w-14 h-7 p-1 rounded mt-4 shadow shadow-blue-100'>
                <img src='https://down-sg.img.susercontent.com/file/75208a3560e600016e8c2afe482f2089' alt='logo' />
              </div>
              <div className='bg-white w-14 h-7 p-1 rounded mt-4 shadow shadow-blue-100'>
                <img src='https://down-sg.img.susercontent.com/file/bb11637fc6801c7be1bc0eec44b4483d' alt='logo' />
              </div>
            </div>
            <p className='text-sm font-semibold text-gray-600 mt-4'>ĐƠN VỊ VẬN CHUYỂN</p>
            <div className='flex flex-wrap gap-2'>
              <div className='bg-white w-14 h-7 p-1 rounded mt-4 shadow shadow-blue-100 '>
                <img
                  src='https://down-sg.img.susercontent.com/file/sg-50009109-5c039f3a5e4393ddd69f67fd9de8d748'
                  alt='logo'
                />
              </div>
              <div className='bg-white w-14 h-7 p-1 rounded mt-4 shadow shadow-blue-100'>
                <img src='https://down-sg.img.susercontent.com/file/d3e8c3431cbe8451acf869aad4064f02' alt='logo' />
              </div>
              <div className='bg-white w-14 h-7 p-1 rounded mt-4 shadow shadow-blue-100'>
                <img src='https://down-sg.img.susercontent.com/file/8fd7478a86cbb33568d39a313a38dcda' alt='logo' />
              </div>
              <div className='bg-white w-14 h-7 p-1 rounded mt-4 shadow shadow-blue-100'>
                <img src='https://down-sg.img.susercontent.com/file/542ab038cc1a9d0f7acdd95cae2124aa' alt='logo' />
              </div>
              <div className='bg-white w-14 h-7 p-1 rounded mt-4 shadow shadow-blue-100'>
                <img src='https://down-sg.img.susercontent.com/file/542ab038cc1a9d0f7acdd95cae2124aa' alt='logo' />
              </div>
              <div className='bg-white w-14 h-7 p-1 rounded mt-4 shadow shadow-blue-100'>
                <img src='https://down-sg.img.susercontent.com/file/d27ba145f934d56a2056c340a35faf91' alt='logo' />
              </div>
              <div className='bg-white w-14 h-7 p-1 rounded mt-4 shadow shadow-blue-100'>
                <img src='https://down-sg.img.susercontent.com/file/2f0e116fd55a95b3dfe6f8ea52771829' alt='logo' />
              </div>
              <div className='bg-white w-14 h-7 p-1 rounded mt-4 shadow shadow-blue-100'>
                <img src='https://down-sg.img.susercontent.com/file/c0a6f9dcf3bec653e678cb245859442f' alt='logo' />
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className='grid grid-cols-1 gap-4 lg:grid-cols-3 text-sm text-gray-600 mt-10'>
          <div className='lg:col-span-1'>
            <div>© 2023 Shopee. Tất cả các quyền được bảo lưu.</div>
          </div>
          <div className='lg:col-span-2'>
            <div>
              Quốc gia & Khu vực: Singapore | Indonesia | Đài Loan | Thái Lan | Malaysia | Việt Nam | Philippines | Đức |
              Chile | Nhật Bản | Trung Quốc
            </div>
          </div>
        </div>
        <div className='text-center text-sm text-gray-600 mt-10'>
          <p>Công ty TNHH Shopee</p>
          <p className='mt-6'>
            Địa chỉ: Tầng 4-5-6, Tòa nhà Capital Place, số 29 đường Liễu Giai, Phường Ngọc Khánh, Quận Ba Đình, Thành phố Hà Nội, Việt Nam. Tổng đài hỗ trợ: 19001221 - Email: cskh@hotro.shopee.vn
          </p>
          <p className='mt-2'>Chịu trách nhiệm quản lý nội dung: Nguyễn Đức Trí</p>
          <p className='mt-2'>Mã số doanh nghiệp: 0106773786 do Sở Kế hoạch & Đầu tư TP Hà Nội cấp lần đầu ngày 10/02/2015</p>
          <p className='mt-2'>© 2015 - Bản quyền thuộc về Công ty TNHH Shopee</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;