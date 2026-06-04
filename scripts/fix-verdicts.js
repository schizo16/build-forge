const fs = require('fs');
const filePath = 'data/elden-ring.json';
const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

function fixVerdicts(obj) {
  if (Array.isArray(obj)) { obj.forEach(fixVerdicts); return; }
  if (!obj || typeof obj !== 'object') return;
  if (obj.verdictVi && typeof obj.verdictVi === 'string') {
    let v = obj.verdictVi;
    const fixes = {
      'lua chon': 'lựa chọn', 'te nhat': 'tệ nhất', 'tot nhat': 'tốt nhất',
      'khong khiêp': 'không khiếp', 'khong tang': 'không tăng',
      'thap hon': 'thấp hơn', 'tich luy': 'tích lũy', 'chay mau': 'chảy máu',
      'mac dinh': 'mặc định', 'chi can': 'chỉ cần', 'tang Int': 'tăng Int',
      'hieu ung bang': 'hiệu ứng băng', 'giam AR': 'giảm AR',
      'chi dung': 'chỉ dùng', 'neu muon': 'nếu muốn',
      'khuyen khich': 'khuyến khích', 'vu khi': 'vũ khí',
      'truoc tien': 'trước tiên', 'build nay': 'build này',
      'Dex thuan': 'Dex thuần', 'cao nhat': 'cao nhất',
      'co san': 'có sẵn', 'tuy chon': 'tùy chọn',
      'lanh phi': 'lãng phí', 'dau tu vao': 'đầu tư vào',
      'trang bi': 'trang bị', 'rat manh': 'rất mạnh', 'rat tot': 'rất tốt',
      'doc nhat': 'độc nhất', 'khong the': 'không thể',
      'thay doi': 'thay đổi', 'sat thuong chinh': 'sát thương chính',
      'tang theo': 'tăng theo', 'yeu cau co': 'yêu cầu có',
      'yeu hon Heavy': 'yếu hơn Heavy', 'giap nang': 'giáp nặng',
      'Faith can chien': 'Faith cận chiến',
      'hieu ung trang thai': 'hiệu ứng trạng thái',
      'co ban va meme': 'cơ bản và meme',
      'chap nhan sat thuong': 'chấp nhận sát thương',
      'nguon sat thuong': 'nồn sát thương',
    };
    for (const [from, to] of Object.entries(fixes)) {
      const re = new RegExp(from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
      v = v.replace(re, to);
    }
    obj.verdictVi = v;
  }
  for (const key of Object.keys(obj)) fixVerdicts(obj[key]);
}

fixVerdicts(data);
fs.writeFileSync(filePath, JSON.stringify(data, null, 4) + '\n', 'utf-8');
console.log('OK - verdictVi fixed');
