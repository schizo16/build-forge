const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'data', 'cyberpunk-2077.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
const slug = s => s;

// ============================================================
// EXACT PER-FIELD FIXES (highest priority)
// ============================================================

// nameVi: exact values per build
const nameViFix = {
  'netrunner': 'Netrunner',
  'sandy-katana': 'Katana Tăng Tốc',
  'berserk-shotgun': 'Shotgun Cuồng Nộ',
  'tech-sniper': 'Bắn Tỉa Công Nghệ',
  'smart-gun': 'Súng Thông Minh',
  'blade-runner': 'Blade Runner',
  'stealth-knife': 'Ném Dao Tàng Hình',
  'gorilla-arms': 'Đấm Bốc Gorilla',
  'body-tech-shotgun': 'Shotgun Kỹ Thuật',
  'reflex-cool-blades': 'Lưỡi Kiếm Tàng Hình',
  'cool-stealth-pistol': 'Súng Lục Tàng Hình',
  'body-berserk-lmg': 'Body Berserk LMG',
  'tech-precision-rifle': 'Súng Trường Chính Xác',
  'intelligence-monowire': 'Monowire Trí Tuệ',
  'cool-throwing-weapons': 'Vi Khí Ném',
  'body-solo-tank': 'Xe Tăng Độc Diện',
  'reflex-handguns': 'Súng Lục Nhanh Nhẹn',
  'tech-smg-runner': 'SMG Kỹ Thuật',
  'body-melee-brawler': 'Đấm Bốc Cận Chiến',
  'cool-stealth-netrunner': 'Netrunner Tàng Hình',
  'pure-cool-pistol': 'Súng Lục Thuần Cool',
  'body-shotgun-sandy': 'Body Shotgun Sandevistan',
  'reflex-tech-pistol': 'Súng Công Nghệ Reflex',
  'cool-netrunner-hybrid': 'Cool Netrunner Hybrid',
  'full-body-brawler': 'Đấm Bốc Toàn Thân',
};

// descriptionVi: exact values per build
const descViFix = {
  'netrunner': 'Build Netrunner huyền thoại hack mọi thứ từ bóng tối. Quickhack huyền thoại lây lan qua toàn bộ mạng lưới, giết cả tổ ong mà không cần bắn phát nào.',
  'sandy-katana': 'Build Sandevistan katana huyền thoại. Kích hoạt thời gian chậm, lướt qua kẻ địch, và chặt xác mọi kẻ trước khi xác đầu tiên chạm đất. Tỷ lệ phong cách-sát thương cao nhất Night City.',
  'berserk-shotgun': 'Build Body với Berserk và shotgun hủy diệt. Kích hoạt Berserk, bỏ qua sát thương, và bắn nát mọi thứ với stamina vô hạn. Build xe tăng thiết giáp.',
  'tech-sniper': 'Build Technical với súng bắn tỉa công nghệ xuyên tường. Ping kẻ địch sau nắp, tích điện và headshot xuyên qua tường. Xạ thủ tàng hình tối thượng.',
  'smart-gun': 'Build vũ khí thông minh sử dụng Skippy huyền thoại và các loại súng tự tìm đường. Đạn bay vòng qua góc và bám theo mục tiêu. Chỉ cần ngắm đại khái và xem chúng ngã.',
  'blade-runner': 'Build theo phong cách Blade Runner. Tập trung vào monowire và mantis blades với vẻ ngoài dystopian. Phong cách cao, sát thương cao, đầy thời thượng.',
  'stealth-knife': 'Build tàng hình ném dao với Cold Blood. Ném dao giết lặng từ xa, nhặt lại và tăng tốc với Cold Blood.',
  'gorilla-arms': 'Build Body meme với Gorilla Arms. Đấm chết mọi kẻ bằng tay không. Bất ngờ hiệu quả sau bản 2.0 với perk mới.',
  'body-tech-shotgun': 'Build Body/Technical với tech shotgun xuyên tường. Trâu bò, giáp cao.',
  'reflex-cool-blades': 'Build Reflex/Cool với Sandevistan và kiếm. Lướt giữa kẻ địch với tốc độ thời gian chậm.',
  'cool-stealth-pistol': 'Build Cool/Reflex súng lục tàng hình. Headshot từ tàng hình sát thương lớn.',
  'body-berserk-lmg': 'Build Body sử dụng light machine guns với Berserk cyberware. Hỏa lực không ngừng. Kích hoạt Berserk để stamina vô hạn và xả đạn tất cả.',
  'tech-precision-rifle': 'Build Technical/Cool với súng trường chính xác. Tích điện xuyên tường.',
  'intelligence-monowire': 'Build Intelligence/Reflex sử dụng Monowire với quickhacks. Monowire giờ tăng theo Intelligence trong 2.0. Hack kẻ địch, sau đó kết liễu với đòn tấn công wire tàn khốc.',
  'cool-throwing-weapons': 'Build Cool với dao ném và rìu ném. Lạng lẹ, chết người, phong cách.',
  'body-solo-tank': 'Build Body/Technical tank không bao giờ chết. HP tối đa, giáp tối đa, hồi máu, và giảm sát thương. Đi qua hỏa lực địch và đấm mọi kẻ đến chết.',
  'reflex-handguns': 'Build Reflex/Cool với súng lục nảy đạn. Bắn nảy tường headshot.',
  'tech-smg-runner': 'Build Technical/Reflex với tech SMG. Tốc độ bắn cao xuyên tường.',
  'body-melee-brawler': 'Build Body cận chiến với Gorilla Arms và gậy bóng chày. Không súng. Chỉ đấm.',
  'cool-stealth-netrunner': 'Build Cool/Intelligence kết hợp tàng hình và quickhacks. Hack từ bóng tối.',
  'pure-cool-pistol': 'Build súng lục tàng hình với Cool và Handguns. Bắn đầu từ tàng hình x3 sát thương. Pride từ DLC.',
  'body-shotgun-sandy': 'Build Body cao với shotgun sử dụng Sandevistan. Làm chậm thời gian, xông vào, và xả đạn mọi thứ với shotgun. Guts từ DLC là một quái vật.',
  'reflex-tech-pistol': 'Build Reflex với Tech Pistol xuyên tường. Her Majesty từ Phantom Liberty. Bắn đầu xuyên nắp.',
  'cool-netrunner-hybrid': 'Build lai tàng hình (Cool) và hack (Int). Quickhack làm yếu từ xa, súng lục kết liễu.',
  'full-body-brawler': 'Build Body thuần với Gorilla Arms và Berserk. Không súng, không tàng hình - chỉ đấm. Đấm chết mọi thứ.',
};

// ============================================================
// SPECIFIC CORRUPTION FIXES (valid for all VN fields)
// Each entry: [exact_bad_substring, exact_good_substring]
// Rules: bad must NOT be a substring of good (no doubling)
//        bad must be >= 4 chars (minimal chance of false positives)
// ============================================================
const corruptionFix = [
  // đ-for-d corruption in English words
  ['Bla\u0111\u1ec3 Runner', 'Blade Runner'],
  ['Bla\u0111\u1ec3', 'Blade'],
  ['San\u0111\u1ec3vistan', 'Sandevistan'],
  ['Bers\u1ebdrk', 'Berserk'],
  ['\u0111\u00e3mage', 'damage'],
  ['\u0111\u00e3sh', 'dash'],
  ['\u0111\u1ec3ath', 'death'],
  ['\u0111\u1ec3adly', 'deadly'],
  ['\u0111\u1ec3tected', 'detected'],
  ['\u0111\u1ec3fencest', 'defencest'],
  ['Or\u0111\u1ec3r', 'Order'],
  ['Suici\u0111\u1ec3', 'Suicide'],
  ['cyber\u0111\u1ec3ck', 'cyberdeck'],
  ['pri\u0111\u1ec3', 'Pride'],
  ['man\u0111\u00e3tory', 'bắt buộc'],
  ['\u0111\u1ec3vastating', 'tàn khốc'],
  ['exten\u0111\u1ec3d', 'extended'],
  ['hid\u0111\u1ebfn', 'hidden'],
  ['mo\u0111\u1ec3', 'mode'],
  ['\u0111\u1ec3al', 'deal'],

  // Other corrupted English words
  ['r\u1ea5tio', 'ratio'],
  ['st\u1ea1mina', 'stamina'],
  ['upt\u00ecme', 'uptime'],
  ['slow-t\u00ecme', 'slow-time'],
  ['t\u00ecme', 'time'],
  ['ess\u1ebdntial', 'essential'],
  ['s\u1ebdc\u00f2nds', 'seconds'],
  ['Obliter\u1ea5tion', 'Obliteration'],
  ['ic\u00f2nic', 'huyền thoại'],
  ['c\u00f2ntagion', 'Contagion'],
  ['c\u00f2nt\u1ea1iner', 'container'],
  ['penthous\u1ebd', 'penthouse'],
  ['c\u00e1che', 'cache'],
  ['res\u1ebdt', 'reset'],
  ['res\u1ebdts', 'reset'],
  ['QianT Warp \u0111\u00e3ncer', 'QianT Warp Dancer'],
  ['increas\u1ebd', 'increase'],
  ['us\u1ebd', 'use'],
  ['clos\u1ebd', 'close'],
  ['caus\u1ebds', 'causes'],
  ['Leg\u0111\u00e3ry', 'Legendary'],
  ['leg\u0111\u00e3ry', 'legendary'],
  ['Legen\u0111\u00e3ry', 'Legendary'],
  ['egen\u0111\u00e3ry', 'legendary'],
  ['Brain\u0111\u00e3nce', 'Braindance'],
  ['c t\u1ec9a nh', 'cả tổ ong'],
  ['Procs', 'kích hoạt'],
  ['procs', 'kích hoạt'],
  ['including', 'bao gồm'],

  // Specific corrupted Vietnamese strings
  ['T\u0122ng', 'Tăng'],
  ['\u0110"c', 'Độc'],
  ['Di&n', 'Diện'],
  ['Tr\u00ed Tu!', 'Trí Tuệ'],
  ['th\u1eed\u1ea7nn', 'Thuần'],
  ['ph\u1ea7n th\u01b0xng', 'phần thưởng'],
  ['th\u01b0xng', 'thưởng'],
  ['ch0', 'chỉ'],
  ['Kh\u00edng bao gi', 'Không bao giờ'],
  ['h\u01a1n th\u00ecnh', 'hoàn thành'],
  ['Hon thnh', 'Hoàn thành'],
  ['b\u1eaft bu"c', 'bắt buộc'],

  // đấm bốc / ném dao
  ['N\u00eam \u0111\u00e0o', 'Ném Dao'],
  ['m Bc', 'Đấm Bốc'],
  ['đ\u1ea5m Bc', 'Đấm Bốc'],

  // Remaining đ/d corruption patterns in English words
  ['\u0111\u1ec3s', 'des'],
  ['\u0111\u1ec3f', 'def'],
  ['bla\u0111\u1ec3', 'blade'],
  ['th\u1eed\u1eadt', 'thuật'],
  ['\u0111\u00e3i', 'đạn'],
  ['c\u00f2ntrol', 'control'],
  ['mo\u0111\u1ec3', 'mode'],
  ['\u0111\u1ec3al', 'deal'],

  // TipsVi embedded English fixes
  ['l\u00e0 hilarious but expensive', 'rất hài hước nhưng tốn nhiều'],
  ['weapon crits', 'vũ khí crit'],
  [' on any crit', ' trên mọi crit'],
  [' bao gồm weapon', ', bao gồm'],
  ['is hilarious but expensive', 'rất hài hước nhưng tốn'],
  ['in headshot mode is the easiest', 'ở chế độ headshot là dễ nhất'],
  ['in the game', 'trong game'],
  ['point và click kills', 'ngắm và bắn'],
  ['for crowd còntrol', 'để kiểm soát đám đông'],
  ['has the best bullet tracking', 'có độ bám đạn tốt nhất'],
  ['of any smart weapon', 'trong tất cả vũ khí thông minh'],
  ['was completely reworked', 'đã được làm lại hoàn toàn'],
  ['it now scales', 'nó giờ tăng'],
  ['và is amazing', 'và rất tuyệt vời'],
  ['và has charge', 'và có tấn công tích lực'],
  ['make you nearly untouchable', 'làm bạn gần như không thể chạm tới'],
  ['adds new Monowire finishers và combos', 'thêm đòn kết liễu Monowire mới và combo'],
  ['for bleed on', 'để gây chảy máu khi'],
  ['in 2.0+ scales', 'trong 2.0+ tăng'],
  ['và c\u1ea7n spread', 'và có thể lây lan'],
  ['to weaken groups, then', 'để làm yếu nhóm, rồi'],
  ['has longer range than it looks', 'có tầm xa hơn vẻ ngoài'],
  ['cho trải nghiệm đỉnh cao', 'cho trải nghiệm đỉnh cao'],
  ['gives the most', 'cho nhiều'],
  ['gives you the highest', 'cho bạn lượng'],
  ['gives you', 'cho bạn'],
  ['gives', 'cho'],
  ['has built-in', 'có tích hợp'],
  ['và high crit', 'và crit'],
  ['after Đánh bại give', 'sau khi tiêu diệt tăng'],
  ['after Đánh bại', 'sau khi tiêu diệt'],
  ['to reposition', 'để tái định vị'],
  ['forces them', 'buộc chúng'],
  ['stay behind cover', 'ở sau nắp'],
  ['for explosions', 'để gây nổ'],
  ['for fire', 'để gây sát thương lửa'],
  ['on critical hits', 'khi chí mạng'],
  ['cần be charged', 'cần được nạp'],
  ['cần be', 'cần được'],
  ['cần hit', 'cần bắn trúng'],
  ['to line up', 'để căn chỉnh'],
  ['each ricochet headshot cần', 'mỗi headshot nảy cần'],
  ['the bounce trajectory', 'quỹ đạo nảy'],
  ['keep you alive in', 'giữ bạn sống trong'],
  ['is an emergency escape if', 'là thoát hiểm nếu bị'],
  ['causẽs chaos', 'gây hỗn loạn'],
  ['without revealing', 'mà không lộ'],
  ['your position', 'vị trí của bạn'],
  ['gives most', 'cho nhiều'],
  ['health regen perks', 'perk hồi máu'],
  ['is unstoppable in', 'là không thể ngăn cản trong'],
  ['increasẽ', 'increase'],
  ['from a', 'từ'],
  ['up to', 'tới'],
  ['up to', 'tới'],
  ['the most slow time', 'thời gian chậm nhất'],
  ['với the lowest', 'với'],
  ['for min-max', 'cho min-max'],
  ['to block bullets', 'để chặn đạn'],
  ['while sprinting at enemies', 'khi chạy nước rút về phía kẻ địch'],
  ['are essential', 'là cần thiết'],
  ['mobility for this build', 'cơ động cho build này'],
  ['on hit', 'khi trúng'],
  ['for a tàn khốc', 'để tạo ra'],
  ['Berserk uptime', 'thời gian Berserk'],
  ['for maximum survivability', 'để sống sót tối đa'],
  ['for staying hidden', 'để ẩn'],
  ['not just kill', 'không chỉ khi hạ gục'],
  ['of enemies', 'kẻ địch'],
  ['in emergencies', 'khi khẩn cấp'],

  // StepsVi embedded English fixes  
  ['Invest perk points into', 'Đầu tư điểm perk vào'],
  [' from ripperdoc', ' từ ripperdoc'],
  ['Farm access point', 'Farm access point'],
  ['Invest in', 'Đầu tư vào'],
  ['the Heist', 'nhiệm vụ Heist'],
  ['Get the', 'Lấy'],
  ['Get', 'Lấy'],
  ['Learn the', 'Học'],
  ['Learn', 'Học'],
  ['Find the', 'Tìm'],
  ['Find', 'Tìm'],
  ['Start stacking', 'Bắt đầu xếp chồng'],
  ['Make sure', 'Đảm bảo'],
  ['for emergency', 'để phòng trường hợp khẩn cấp'],
  ['for stealth', 'để tàng hình'],
  ['as your primary', 'làm vũ khí chính'],
  ['as backup weapon', 'làm vũ khí dự phòng'],
  ['a basic', ''],
  ['any ripperdoc', 'ripperdoc bất kỳ'],
  ['from any', 'từ'],
  ['as backup', 'dự phòng'],
  ['the best armor mods', 'mod giáp tốt nhất'],
  ['from a vendor', 'từ vendor'],
  ['a good', ''],
  ['Tier 5++', 'Cấp 5++'],
  ['Tier 4', 'Cấp 4'],
  ['Tier 5++', 'Cấp 5++'],
  ['Tier 4', 'Cấp 4'],
  ['Pick ', 'Chọn '],
  ['Pick the', 'Chọn'],
  ['Choose ', 'Chọn '],
  ['Quest ', 'Nhiệm vụ '],
  ['Completion ', 'Hoàn thành '],
  ['Reward', 'Phần thưởng'],
  ['Use the', 'Dùng'],
  ['Use a', 'Dùng'],
  ['Use', 'Dùng'],
  ['Equip the', 'Trang bị'],
  ['Equip a', 'Trang bị'],
  ['Equip', 'Trang bị'],
  ['Unlock', 'Mở khóa'],
  ['Unlocks', 'Mở khóa'],
  ['Requires', 'Yêu cầu'],
  ['Require', 'Yêu cầu'],
  ['Increases', 'Tăng'],
  ['Increase', 'Tăng'],
  ['Decreases', 'Giảm'],
  ['Decrease', 'Giảm'],
  ['Reduces', 'Giảm'],
  ['Reduce', 'Giảm'],
  ['Boosts', 'Tăng'],
  ['Boost', 'Tăng'],
  [' this build', ' build này'],
  [' the game', ' game'],
  [' your ', ' '],
  [' your', ' của bạn'],

  // Common English articles/words to remove/translate in VN context
  [' is a ', ' là '],
  [' is an ', ' là '],
  [' a ', ' '],
  [' an ', ' '],
  [' the ', ' '],
  [' of ', ' của '],
  [' in ', ' ở '],
  [' from ', ' từ '],
  [' with ', ' với '],
  [' on ', ' trên '],
  [' at ', ' tại '],
  [' by ', ' bởi '],
  [' for ', ' '],
  [' to ', ' '],
  [' is ', ' là '],
  [' are ', ' là '],
  [' was ', ' đã '],
  [' were ', ' đã '],
  [' and ', ' và '],
  [' or ', ' hoặc '],
  [' not ', ' không '],
  [' but ', ' nhưng '],
  [' as ', ' như '],
  [' if ', ' nếu '],
  [' then ', ' thì '],
  [' so ', ' nên '],
  [' very ', ' rất '],
  [' just ', ' chỉ '],
  [' also ', ' cũng '],
  [' too ', ' cũng '],
  [' always ', ' luôn '],
  [' never ', ' không bao giờ '],
  [' even ', ' thậm chí '],
  [' now ', ' bây giờ '],
  [' while ', ' trong khi '],
  [' during ', ' trong '],
  [' before ', ' trước '],
  [' after ', ' sau '],
  [' since ', ' từ khi '],
  [' about ', ' về '],
  [' through ', ' xuyên qua '],
  [' every ', ' mọi '],
  [' each ', ' mỗi '],
  [' both ', ' cả '],
  [' some ', ' một số '],
  [' any ', ' bất kỳ '],
  [' more ', ' thêm '],
  [' most ', ' hầu hết '],
  [' other ', ' khác '],
  [' many ', ' nhiều '],
  [' every ', ' mọi '],
  [' well as', ' cũng như'],
  [' such as', ' như'],
  ['This is', 'Đây là'],
  ['It is', 'Nó là'],
  ['These are', 'Đây là'],
  ['Those are', 'Đó là'],
  ['There is', 'Có'],
  ['There are', 'Có'],
  ['I think', 'Tôi nghĩ'],
  ['You can', 'Bạn có thể'],
  ['You should', 'Bạn nên'],
  ['You need', 'Bạn cần'],
  ['You must', 'Bạn phải'],
  ['You will', 'Bạn sẽ'],
  ['Make sure to', 'Đảm bảo'],
  ['Don\'t', 'Đừng'],
  ['Don\'t', 'Đừng'],
  ['Let\'s', 'Hãy'],
  ['Rush to', 'Chạy đến'],
  ['Run past', 'Chạy qua'],
  ['Talk to', 'Nói chuyện với'],
  ['Deals ', 'Gây '],
  ['Deal ', 'Gây '],
  ['Remove ', 'Loại bỏ '],
  ['Removes ', 'Loại bỏ '],
  ['Adds ', 'Thêm '],
  ['Add ', 'Thêm '],
  ['Grants ', 'Cấp '],
  ['Grant ', 'Cấp '],
  ['Buffs ', 'Buff '],
  ['Buff ', 'Buff '],
  ['Nerfs ', 'Giảm '],
  ['Nerf ', 'Giảm '],
  ['AoE ', 'AoE '],
  ['DPS ', 'DPS '],
  ['HP ', 'HP '],
  ['MP ', 'MP '],
  ['SP ', 'SP '],
  ['FP ', 'FP '],

  // Systematic corruption across stepsVi
  ['Cu\u1ed1i Game', 'Cuối Game'],
  ['C\u0169\u1ed1i Game', 'Cuối Game'],
  ['C\u0169\u1ed1i game', 'Cuối Game'],
  ['c\u0169\u1ed1i game', 'cuối game'],
  ['Tng ', 'Tăng '],
  ['y Intelligence', 'Tăng Intelligence'],
  ['y Technical', 'Tăng Technical'],
  ['y Reflexes', 'Tăng Reflexes'],
  ['y Body', 'Tăng Body'],
  ['y Cool', 'Tăng Cool'],
  ['\u2018n\u0103ng', 'Nâng'],
  ['Sub\u0111\u1ec3rmal', 'Subdermal'],
  ['s\u1ebd c\u00f2nd Heart', 'Second Heart'],
  ['s\u1ebd c\u00f2nd', 'Second'],
  ['Collaps\u1ebd', 'Collapse'],
  ['System Collapse', 'System Collapse'],
  ['ystem Collapse', 'System Collapse'],
  ['s\u1ebdcret', 'secret'],
  ['llegendary', 'legendary'],
  ['gn sát thng nhit', 'Gắn sát thương nhiệt'],
  ['nc công', 'tấn công'],
  ['Tn công', 'Tấn công'],
  ['Stay ở', 'Stay trong'],
  ['gap closing', 'gap closing'],
  ['cho cơ động', 'cho cơ động'],
  // Specific corrupted VN phrases in tips
  ['chm thi gian', 'chậm thời gian'],
  ['thi gian', 'thời gian'],
  ['cho min nhim sát thng', 'cho mình miễn nhiễm sát thương'],
  ['sát thng', 'sát thương'],
  ['v stamina v hn', 'và stamina vô hạn'],
  ['thy v git', 'thấy và giết'],
  ['Lun bắn t tàng hình', 'Luôn bắn từ tàng hình'],
  ['Lu\u00f4n bắn', 'Luôn bắn'],
  ['Bắn t hng', 'Bắn từ hông'],
  ['bắn t hng', 'bắn từ hông'],
  ['Xp mod sát thng', 'Xếp mod sát thương'],
  ['b qua gip', 'bỏ qua giáp'],
  ['n tch xuyên tường', 'tích điện xuyên tường'],
  ['tch y', 'tích đầy'],
  ['Lu\u00f4n tch', 'Luôn tích'],
  ['Lu n kiếm sot', 'Luôn kiểm soát'],
  ['kiếm sot m ng', 'kiểm soát đám đông'],
  ['c silencer', 'có silencer'],
  ['Bắn t sau np khng l', 'Bắn từ sau nắp không lộ'],
  ['Bắn u xuyên tường im lêng', 'Bắn đầu xuyên tường im lặng'],
  ['Hi mu khi git súng đãi', 'Hồi máu khi giết bằng súng đạn'],
  ['nhiu mc tiu', 'nhiều mục tiêu'],
  ['Súng xung kch', 'Súng xung kích'],
  ['Súng lc', 'Súng lục'],
  ['Cm súng', 'Cầm súng'],
  ['cm súng tt nht', 'cầm súng tốt nhất'],
  ['khn cp', 'khẩn cấp'],
  ['kc " ngi', 'tốc độ tàng hình'],
  ['tc " ngi', 'tốc độ tàng hình'],
  ['tt nht', 'tốt nhất'],
  ['cao nht', 'cao nhất'],
  ['ny full sát thng', 'nảy full sát thương'],
  ['b mt', 'bề mặt'],
  ['Chy v bắn', 'Chạy và bắn'],
  ['tiết kiế!m ạn nhất', 'tiết kiệm đạn nhất'],
  ['quỹ ạo đão', 'quỹ đạo dao'],
  ['Tập quỹ ạo', 'Tập quỹ đạo'],
  ['tch sát thng', 'tích sát thương'],
  ['v cht ngay', 'và chết ngay'],
  ['lêng v', 'lên và'],
  ['hi sinh m"t lần', 'hy sinh một lần'],
  ['s\u1ebd c\u00f2nd Heart', 'Second Heart'],
  ['s\u1ebd c\u00f2nd', 'Second'],
  ['ers\u1ebdrk', 'Berserk'],
  [' ers\u1ebdrk', ' Berserk'],
  ['Dng ers\u1ebdrk', 'Dùng Berserk'],
  ['M"t', 'Một'],
  ['Bắn u t tàng hình x3', 'Bắn đầu từ tàng hình x3'],
  ['tiết kiế!m ạn', 'tiết kiệm đạn'],
  ['Ping trư:c', 'Ping trước'],
  ['trư:c', 'trước'],
  ['tch y', 'tích đầy'],
  ['khi tch y', 'khi tích đầy'],
  ['khi tch', 'khi tích'],
  ['ny full', 'nảy full'],
  ['p sát tr:c', 'áp sát trước'],
  ['khi Sandy ht', 'khi Sandy hết'],
  ['Dng Optical Camo p sát', 'Dùng Optical Camo áp sát'],
  ['Dng', 'Dùng'],
  ['đão rơi dng', 'dao rồi dùng'],
  ['sau mi kill', 'sau mỗi lần hạ gục'],
  ['after Đánh bại', 'sau khi hạ gục'],
  ['Headshot ny', 'Headshot nảy'],
  ['Xp mod', 'Xếp mod'],
  ['xp mod', 'xếp mod'],
  ['Lun tích', 'Luôn tích'],
  ['súng xuyn', 'súng xuyên'],
  ['xuyn mi', 'xuyên mọi'],
  ['xuyn', 'xuyên'],
  ['bng ', 'bằng '],
  ['bn t', 'bắn từ'],
  ['Bn t', 'Bắn từ'],
  ['bn u', 'bắn đầu'],
  ['Bn u', 'Bắn đầu'],
  ['lun ', 'luôn '],
  ['Lun ', 'Luôn '],
  ['priđ', 'Pride'],

];

// ============================================================
// WORD-LEVEL DIACRITIC FIXES
// Applied with word boundaries, only on strings with VN chars
// ============================================================
const vnWordFix = {
  'dau': 'đầu', 'duoi': 'dưới', 'len': 'lên', 'truoc': 'trước',
  'sau': 'sau', 'giua': 'giữa', 'cuoi': 'cuối', 'nay': 'này',
  'cac': 'các', 'nguoi': 'người', 'nhung': 'nhưng', 'tot': 'tốt',
  'nhat': 'nhất', 'rat': 'rất', 'qua': 'qua', 'la': 'là',
  'cua': 'của', 'co': 'có', 've': 'về', 'hoac': 'hoặc',
  'nen': 'nên', 'xong': 'xong', 'roi': 'rồi',
  'thuong': 'thường', 'nang': 'nâng', 'tang': 'tăng',
  'them': 'thêm', 'lon': 'lớn', 'nho': 'nhỏ', 'nhan': 'nhận',
  'lua': 'lửa', 'ban': 'bạn', 'khi': 'khi', 'cung': 'cùng',
  'nhieu': 'nhiều', 'thoat': 'thoát',
  'dau tien': 'đầu tiên', 'tiep theo': 'tiếp theo',
  'cuoi cung': 'cuối cùng', 'bat buoc': 'bắt buộc',
  'tam': 'tạm', 'thoi': 'thời', 'thay the': 'thay thế',
  'phu hop': 'phù hợp', 'thap hon': 'thấp hơn',
  'cao hon': 'cao hơn', 'toi da': 'tối đa',
  'su dung': 'sử dụng', 'che tao': 'chế tạo',
  'nang cap': 'nâng cấp', 'nhiem vu': 'nhiệm vụ',
  'trang bi': 'trang bị', 'sat thuong': 'sát thương',
  'dac biet': 'đặc biệt', 'quan trong': 'quan trọng',
  'thuc hien': 'thực hiện', 'hieu qua': 'hiệu quả',
  'nhanh': 'nhanh', 'cham': 'chậm', 'manh': 'mạnh', 'yeu': 'yếu',
  'chinh': 'chính',
  'phai': 'phải', 'tai': 'tại',
  'khong': 'không', 'cho': 'cho', 'voi': 'với',
  'de': 'để', 'duoc': 'được', 'con': 'còn',
  'mot': 'một', 'moi': 'mới', 'cu': 'cũ',
  'da': 'đã', 'dang': 'đang', 'se': 'sẽ',
  'can': 'cần', 'lay': 'lấy',
  'giet': 'giết', 'tim': 'tìm', 'den': 'đến',
  'luc': 'lúc', 'sau do': 'sau đó',
  'muon': 'muốn', 'lai': 'lại',
  'that bai': 'thất bại', 'thanh cong': 'thành công',
  'sat thuong chinh': 'sát thương chính',
  'tang theo': 'tăng theo', 'giam': 'giảm',
  'doi': 'đổi', 'thuan': 'thuần',
  'vu khi': 'vũ khí', 'nguon': 'nguồn',
  'ban co the': 'bạn có thể', 'neu': 'nếu',
  'tai nguyen': 'tài nguyên', 'san co': 'sẵn có',
  'tuy chon': 'tùy chọn', 'mac dinh': 'mặc định',
  'doc nhat': 'độc nhất', 'lanh phi': 'lãng phí',
  'on dinh': 'ổn định',
  'hieu': 'hiểu', 'dung': 'đúng', 'sai': 'sai',
  'dau tu': 'đầu tư',
  'luon': 'luôn',
  'xep': 'xếp',
  'kiem soat': 'kiểm soát',
};

function hasVN(s) {
  return /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i.test(s);
}

function applyFixes(s) {
  if (typeof s !== 'string') return s;
  const orig = s;

  // Strip control chars and replacement chars
  s = s.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, '');
  s = s.replace(/[\x7F-\x9F]/g, '');
  s = s.replace(/\uFFFD/g, '');
  s = s.replace(/\\u0003|\\u001b|\\u0018/gi, '');
  s = s.replace(/�/g, '');

  // Apply corruption fixes
  for (const [bad, good] of corruptionFix) {
    s = s.split(bad).join(good);
  }

  // Apply VN word fixes only if the string has VN characters
  if (hasVN(s) || hasVN(orig)) {
    for (const [bad, good] of Object.entries(vnWordFix)) {
      const re = new RegExp('\\b' + bad.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'gi');
      s = s.replace(re, m => {
        if (m[0] === m[0]?.toUpperCase() && m.length > 1)
          return good[0].toUpperCase() + good.slice(1);
        return good;
      });
    }
  }

  // Clean up spacing
  s = s.replace(/  +/g, ' ').trim();
  return s;
}

// ============================================================
// MAIN PROCESSING
// ============================================================
let fixCount = 0;
for (const build of data.builds) {
  const sid = build.slug;

  // nameVi
  if (nameViFix[sid]) { fixCount++; build.nameVi = nameViFix[sid]; }
  else if (build.nameVi) { fixCount++; build.nameVi = applyFixes(build.nameVi); }

  // descriptionVi
  if (descViFix[sid]) { fixCount++; build.descriptionVi = descViFix[sid]; }
  else if (build.descriptionVi) { fixCount++; build.descriptionVi = applyFixes(build.descriptionVi); }

  // Other top VN fields
  if (build.gameClassVi) build.gameClassVi = applyFixes(build.gameClassVi);
  if (build.itemTypeVi) build.itemTypeVi = applyFixes(build.itemTypeVi);

  // Phases
  if (build.phases) {
    for (const phase of build.phases) {
      if (phase.nameVi) phase.nameVi = applyFixes(phase.nameVi);
      if (phase.areasVi) phase.areasVi = applyFixes(phase.areasVi);
      if (phase.stepsVi) phase.stepsVi = phase.stepsVi.map(s => applyFixes(s));
    }
  }

  // Affinities
  if (build.affinities) {
    for (const aff of build.affinities) {
      if (aff.verdictVi) aff.verdictVi = applyFixes(aff.verdictVi);
    }
  }

  // Items
  if (build.items) {
    for (const item of build.items) {
      if (item.locationVi) item.locationVi = applyFixes(item.locationVi);
      if (item.nameVi) item.nameVi = applyFixes(item.nameVi);
    }
  }

  // Tips
  if (build.tipsVi) {
    build.tipsVi = build.tipsVi.map(t => applyFixes(t));
  }
}

// Write
fs.writeFileSync(filePath, JSON.stringify(data, null, 4) + '\n', 'utf-8');
console.log('Done. Fixed fields (estimate): ' + fixCount + '+');
console.log('Written: ' + filePath);
