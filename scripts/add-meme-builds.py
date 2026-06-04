import json
import os

DATA_DIR = os.path.join("E:", os.sep, "code", "Opencode", "build-forge", "data")

# ── Elden Ring meme builds ──
elden_ring_memes = [
    {
        "slug": "walter-white",
        "name": "Walter White",
        "nameVi": "Walter White",
        "description": "\"I am the one who knocks.\" A poison/rot alchemist who uses only status incantations, perfume bottles, and consumable pots. No real weapons — just chemicals and faith that your enemies will die before you do.",
        "descriptionVi": "\"Ta là người gõ cửa.\" Một nhà giả kim chỉ dùng độc tố, nước hoa và lọ ném. Không vũ khí thật — chỉ có hóa chất và niềm tin rằng kẻ địch sẽ chết trước bạn.",
        "category": "meme",
        "difficulty": 3,
        "dlc": True,
        "gameClass": "Prophet",
        "gameClassVi": "Tiên Tri",
        "sl": 150,
        "stats": {
            "Vigor": 40,
            "Mind": 30,
            "Endurance": 20,
            "Strength": 12,
            "Dexterity": 12,
            "Intelligence": 7,
            "Faith": 45,
            "Arcane": 45
        },
        "phases": [
            {
                "name": "Early Game",
                "nameVi": "Đầu Game",
                "levels": "1–60",
                "areas": "Limgrave, Caelid",
                "areasVi": "Limgrave, Caelid",
                "steps": [
                    "Choose Prophet for starting Faith",
                    "Run to Third Church of Marika for Flask Physick",
                    "Buy Poison Mist from Church of Dragon Communion in Caelid",
                    "Farm Cracked Pots from Murkwater Cave merchants",
                    "Level Faith to 20 and Arcane to 20",
                    "Craft poison pots and rot pots from foraged materials"
                ],
                "stepsVi": [
                    "Chọn Prophet để có Faith khởi đầu",
                    "Chạy đến Third Church of Marika lấy Flask Physick",
                    "Mua Poison Mist từ Church of Dragon Communion",
                    "Farm Cracked Pots từ Murkwater Cave",
                    "Tăng Faith lên 20 và Arcane lên 20",
                    "Chế tạo lọ độc từ nguyên liệu thu thập"
                ]
            },
            {
                "name": "Mid Game",
                "nameVi": "Giữa Game",
                "levels": "60–100",
                "areas": "Altus Plateau, Mt. Gelmir, Caelid",
                "areasVi": "Altus Plateau, Mt. Gelmir, Caelid",
                "steps": [
                    "Push Arcane to 35 and Faith to 30",
                    "Get Pest Threads from Gowry in Caelid after Millicent quest",
                    "Find Ekzykes's Decay (rot breath) from Cathedral of Dragon Communion",
                    "Acquire the Frenzied Flame Seal from the Frenzied Flame Village",
                    "Level Mind to 25 for FP to cast incantations",
                    "Say \"I am the one who knocks\" before every major boss"
                ],
                "stepsVi": [
                    "Đẩy Arcane lên 35 và Faith lên 30",
                    "Lấy Pest Threads từ Gowry",
                    "Tìm Ekzykes's Decay từ Cathedral of Dragon Communion",
                    "Lấy Frenzied Flame Seal từ Frenzied Flame Village",
                    "Tăng Mind lên 25",
                    "Nói \"Ta là người gõ cửa\" trước mỗi boss"
                ]
            },
            {
                "name": "Late Game + DLC",
                "nameVi": "Cuối Game + DLC",
                "levels": "100–150",
                "areas": "Mountaintops, Farum Azula, Realm of Shadow",
                "areasVi": "Mountaintops, Farum Azula, Realm of Shadow",
                "steps": [
                    "Push Faith to 45 and Arcane to 45",
                    "Get the Frenzy Flame perfume bottle from the DLC",
                    "Collect the Deadly Poison perfume bottle for toxic buildup",
                    "Find all DLC perfume bottle recipes",
                    "Use Unendurable Frenzy as your \"finale\" incantation",
                    "Stack status effect talismans: Lord of Blood's Exultation, Kindred of Rot's Exultation"
                ],
                "stepsVi": [
                    "Đẩy Faith lên 45 và Arcane lên 45",
                    "Lấy Frenzy Flame perfume bottle từ DLC",
                    "Thu thập Deadly Poison perfume bottle",
                    "Tìm tất cả công thức perfume bottle trong DLC",
                    "Dùng Unendurable Frenzy làm tuyệt chiêu cuối",
                    "Xếp talisman tăng sát thương trạng thái"
                ]
            }
        ],
        "affinities": [
            {
                "name": "Poison",
                "ar": 0,
                "scaling": "S Arc",
                "verdict": "The whole point is status effects. You don't use weapons.",
                "verdictVi": "Toàn bộ mục tiêu là hiệu ứng trạng thái. Bạn không dùng vũ khí."
            }
        ],
        "items": [
            {
                "name": "Poison Mist",
                "type": "Weapon",
                "location": "Church of Dragon Communion in Caelid",
                "locationVi": "Church of Dragon Communion ở Caelid"
            },
            {
                "name": "Pest Threads",
                "type": "Weapon",
                "location": "Gowry in Caelid after progressing Millicent quest",
                "locationVi": "Gowry ở Caelid sau khi tiến triển nhiệm vụ Millicent"
            },
            {
                "name": "Ekzykes's Decay",
                "type": "Weapon",
                "location": "Cathedral of Dragon Communion in Caelid",
                "locationVi": "Cathedral of Dragon Communion ở Caelid"
            },
            {
                "name": "Frenzied Flame Seal",
                "type": "Weapon",
                "location": "Frenzied Flame Village in Liurnia",
                "locationVi": "Frenzied Flame Village ở Liurnia"
            },
            {
                "name": "Deadly Poison Perfume Bottle",
                "type": "Weapon",
                "location": "DLC, found in the Shadow Keep",
                "locationVi": "DLC, tìm thấy ở Shadow Keep"
            },
            {
                "name": "Kindred of Rot's Exultation",
                "type": "Talisman",
                "location": "Lake of Rot, behind the Sealed Door",
                "locationVi": "Lake of Rot, sau cánh cửa niêm phong"
            }
        ],
        "tips": [
            "You are a chemist, not a warrior. Let the status effects do the killing.",
            "Stack Lord of Blood's Exultation + Kindred of Rot's Exultation for 40% damage when bleed/rot procs",
            "Pest Threads is your best damage option against large bosses",
            "Don't forget to craft pots — they scale with Arcane and are limited resources",
            "The perfume bottles from the DLC finally make this build truly viable"
        ],
        "tipsVi": [
            "Bạn là nhà hóa học, không phải chiến binh. Để hiệu ứng trạng thái làm việc.",
            "Xếp Lord of Blood's Exultation + Kindred of Rot's Exultation = 40% sát thương",
            "Pest Threads là sát thương tốt nhất cho boss to",
            "Đừng quên chế tạo lọ — chúng tăng theo Arcane",
            "Perfume bottle từ DLC làm build này khả thi hơn"
        ]
    },
    {
        "slug": "pothead",
        "name": "Pothead",
        "nameVi": "Đầu Nồi",
        "description": "Only throwable pots. Fire pots, lightning pots, holy pots, giant pots, and all DLC variants. No melee weapons — just pottery and determination. Laugh as your enemy dies to a jar of fire.",
        "descriptionVi": "Chỉ dùng lọ ném. Lọ lửa, lọ sét, lọ thánh, lọ khổng lồ. Không vũ khí cận chiến — chỉ có đồ gốm và quyết tâm.",
        "category": "meme",
        "difficulty": 3,
        "dlc": True,
        "gameClass": "Wretch",
        "gameClassVi": "Kẻ Khốn Cùng",
        "sl": 125,
        "stats": {
            "Vigor": 50,
            "Mind": 15,
            "Endurance": 30,
            "Strength": 20,
            "Dexterity": 20,
            "Intelligence": 10,
            "Faith": 25,
            "Arcane": 25
        },
        "phases": [
            {
                "name": "Early Game",
                "nameVi": "Đầu Game",
                "levels": "1–50",
                "areas": "Limgrave, Weeping Peninsula",
                "areasVi": "Limgrave, Weeping Peninsula",
                "steps": [
                    "Choose Wretch for the true zero-to-hero experience",
                    "Buy the Crafting Kit from the Merchant near Gatefront",
                    "Craft a dozen Fire Pots immediately from materials in Limgrave",
                    "Rush to Murkwater Cave for the Nomadic Merchant who sells Cookbooks",
                    "Buy all Cookbooks as you progress — they unlock new pot types",
                    "Never equip a weapon. Your hands are the weapons."
                ],
                "stepsVi": [
                    "Chọn Wretch để có trải nghiệm từ số 0",
                    "Mua Crafting Kit từ Merchant gần Gatefront",
                    "Chế tạo ngay một tá Fire Pots từ nguyên liệu ở Limgrave",
                    "Chạy đến Murkwater Cave mua Cookbooks",
                    "Mua tất cả Cookbooks — chúng mở khóa lọ mới",
                    "Không bao giờ trang bị vũ khí. Tay bạn là vũ khí."
                ]
            },
            {
                "name": "Mid Game",
                "nameVi": "Giữa Game",
                "levels": "50–100",
                "areas": "Liurnia, Altus Plateau, Caelid",
                "areasVi": "Liurnia, Altus Plateau, Caelid",
                "steps": [
                    "Get the Ritual Pot from the Nomadic Merchant in Liurnia",
                    "Find the Lightning Pot recipe from a scarab near Artist's Shack",
                    "Complete Rya's quest to get the Volcano Manor invitation",
                    "Get the Volcano Pot recipe from the Manor",
                    "Level Vigor to 40 and Strength/Dex to 20 for pot damage scaling",
                    "Farm materials efficiently — roots, mushrooms, and Rimed Buds"
                ],
                "stepsVi": [
                    "Lấy Ritual Pot từ Merchant ở Liurnia",
                    "Tìm Lightning Pot recipe từ bọ gần Artist's Shack",
                    "Hoàn thành nhiệm vụ Rya để lấy thư mời Volcano Manor",
                    "Lấy Volcano Pot recipe từ Manor",
                    "Tăng Vigor lên 40 và Strength/Dex lên 20",
                    "Farm nguyên liệu hiệu quả"
                ]
            },
            {
                "name": "Late Game + DLC",
                "nameVi": "Cuối Game + DLC",
                "levels": "100–125",
                "areas": "Mountaintops, Farum Azula, Realm of Shadow",
                "areasVi": "Mountaintops, Farum Azula, Realm of Shadow",
                "steps": [
                    "Get the Giant Pot from the Giant Pot quest in Liurnia",
                    "Find the Ancient Dragon Pot recipe in the DLC",
                    "Collect the Hefty Pot types from the DLC for massive damage",
                    "Use Hefty Fire Pots and Hefty Rot Pots as your main arsenal",
                    "Level Vigor to 50 for survivability",
                    "The Ritual Pot heals on hit — your only sustain"
                ],
                "stepsVi": [
                    "Lấy Giant Pot từ nhiệm vụ Giant Pot ở Liurnia",
                    "Tìm Ancient Dragon Pot recipe trong DLC",
                    "Thu thập Hefty Pots từ DLC",
                    "Dùng Hefty Fire Pots và Hefty Rot Pots làm vũ khí chính",
                    "Tăng Vigor lên 50",
                    "Ritual Pot hồi máu khi trúng — nguồn hồi phục duy nhất"
                ]
            }
        ],
        "affinities": [
            {
                "name": "Standard",
                "ar": 0,
                "scaling": "None",
                "verdict": "Pots scale with your stats and upgrade materials. Every pot is a weapon.",
                "verdictVi": "Lọ tăng theo chỉ số và nguyên liệu. Mỗi lọ là một vũ khí."
            }
        ],
        "items": [
            {
                "name": "Crafting Kit",
                "type": "Weapon",
                "location": "Nomadic Merchant near Gatefront in Limgrave",
                "locationVi": "Nomadic Merchant gần Gatefront"
            },
            {
                "name": "Ritual Pot",
                "type": "Weapon",
                "location": "Nomadic Merchant in Liurnia of the Lakes",
                "locationVi": "Nomadic Merchant ở Liurnia"
            },
            {
                "name": "Giant Pot",
                "type": "Weapon",
                "location": "Liurnia, Giant's Mountaintop after defeating Golem",
                "locationVi": "Liurnia, Giant's Mountaintop"
            },
            {
                "name": "Volcano Pot",
                "type": "Weapon",
                "location": "Volcano Manor recipe book",
                "locationVi": "Sách công thức Volcano Manor"
            },
            {
                "name": "Hefty Fire Pot",
                "type": "Weapon",
                "location": "DLC, found in Gravesite Plain",
                "locationVi": "DLC, tìm thấy ở Gravesite Plain"
            },
            {
                "name": "Ancient Dragon Pot",
                "type": "Weapon",
                "location": "DLC, recipe near Dragon's Pit",
                "locationVi": "DLC, công thức gần Dragon's Pit"
            }
        ],
        "tips": [
            "You have limited pots per rest — make each one count",
            "Volcano Pots have incredible AoE for clearing groups",
            "Giant Pots deal the most single-target damage but are heavy",
            "Keep a backup stock of basic Fire Pots for trash mobs",
            "The DLC Hefty Pots finally give this build respectable damage"
        ],
        "tipsVi": [
            "Bạn có số lọ giới hạn mỗi lần nghỉ — hãy dùng chúng khôn ngoan",
            "Volcano Pots có AoE tuyệt vời cho đám đông",
            "Giant Pots sát thương đơn mục tiêu cao nhất",
            "Giữ lọ Lửa cơ bản cho quái thường",
            "Hefty Pots DLC cho build này sát thương đáng kể"
        ]
    },
    {
        "slug": "punch-out",
        "name": "Punch Out",
        "nameVi": "Đấm Bốc",
        "description": "Only fist weapons. Caestus, Spiked Caestus, Star Fist, Katar, and Dryleaf Arts from the DLC. No swords, no spells — just hands. The ultimate boxing build.",
        "descriptionVi": "Chỉ dùng vũ khí tay không. Caestus, Spiked Caestus, Star Fist, Katar, và Dryleaf Arts từ DLC. Không kiếm, không phép — chỉ có tay không.",
        "category": "meme",
        "difficulty": 2,
        "dlc": True,
        "gameClass": "Hero",
        "gameClassVi": "Anh Hùng",
        "sl": 150,
        "stats": {
            "Vigor": 55,
            "Mind": 11,
            "Endurance": 40,
            "Strength": 60,
            "Dexterity": 20,
            "Intelligence": 7,
            "Faith": 8,
            "Arcane": 11
        },
        "phases": [
            {
                "name": "Early Game",
                "nameVi": "Đầu Game",
                "levels": "1–60",
                "areas": "Limgrave, Liurnia",
                "areasVi": "Limgrave, Liurnia",
                "steps": [
                    "Choose Hero for high Strength",
                    "Buy the Caestus from Brother Corhyn in Roundtable Hold",
                    "Level Strength to 30 and Vigor to 25 first",
                    "Use Endure ash of war to trade through enemy attacks",
                    "Get the Green Turtle Talisman for stamina regen",
                    "The Caestus R1 has the fastest attack speed in the game"
                ],
                "stepsVi": [
                    "Chọn Hero cho Strength cao",
                    "Mua Caestus từ Brother Corhyn ở Roundtable Hold",
                    "Tăng Strength lên 30 và Vigor lên 25 trước",
                    "Dùng Endure ash of war để trao đổi sát thương",
                    "Lấy Green Turtle Talisman để hồi stamina",
                    "Caestus R1 có tốc độ đánh nhanh nhất game"
                ]
            },
            {
                "name": "Mid Game",
                "nameVi": "Giữa Game",
                "levels": "60–100",
                "areas": "Altus Plateau, Caelid, Mt. Gelmir",
                "areasVi": "Altus Plateau, Caelid, Mt. Gelmir",
                "steps": [
                    "Push Strength to 45 and Vigor to 40",
                    "Get the Star Fist from the merchant near Old Altus Tunnel",
                    "Collect the Spiked Caestus from the merchant in Liurnia",
                    "Equip the Claw Talisman for jump attack damage",
                    "Use Cragblade ash of war for extra poise damage",
                    "Infuse your fist weapons with Heavy for pure Strength scaling"
                ],
                "stepsVi": [
                    "Đẩy Strength lên 45 và Vigor lên 40",
                    "Lấy Star Fist từ merchant gần Old Altus Tunnel",
                    "Thu thập Spiked Caestus từ merchant ở Liurnia",
                    "Trang bị Claw Talisman cho nhảy đánh",
                    "Dùng Cragblade ash of war",
                    "Gắn Heavy cho vũ khí tay"
                ]
            },
            {
                "name": "Late Game + DLC",
                "nameVi": "Cuối Game + DLC",
                "levels": "100–150",
                "areas": "Mountaintops, Farum Azula, Realm of Shadow",
                "areasVi": "Mountaintops, Farum Azula, Realm of Shadow",
                "steps": [
                    "Push Strength to 60 for soft cap",
                    "Get the Dryleaf Arts from the DLC for kick attacks",
                    "Max your preferred fist weapon to +25 Heavy",
                    "Equip the Two-Handed Sword Talisman from DLC",
                    "Equip the Axe Talisman for charged R2 damage",
                    "You can powerstance two fist weapons for dual-wield moveset"
                ],
                "stepsVi": [
                    "Đẩy Strength lên 60",
                    "Lấy Dryleaf Arts từ DLC cho đòn đá",
                    "Nâng vũ khí tay lên +25 Heavy",
                    "Trang bị Two-Handed Sword Talisman từ DLC",
                    "Trang bị Axe Talisman",
                    "Có thể cầm hai vũ khí tay để đánh song kiếm"
                ]
            }
        ],
        "affinities": [
            {
                "name": "Heavy",
                "ar": 520,
                "scaling": "S Str",
                "verdict": "Best for pure Strength. S scaling at 60 Str. Punch hard.",
                "verdictVi": "Tốt nhất cho Strength thuần. S scaling ở 60 Str. Đấm mạnh."
            },
            {
                "name": "Keen",
                "ar": 420,
                "scaling": "A Dex",
                "verdict": "Only if you respec to pure Dex.",
                "verdictVi": "Chỉ nếu reset sang Dex thuần."
            }
        ],
        "items": [
            {
                "name": "Caestus",
                "type": "Weapon",
                "location": "Purchased from Brother Corhyn in Roundtable Hold",
                "locationVi": "Mua từ Brother Corhyn ở Roundtable Hold"
            },
            {
                "name": "Star Fist",
                "type": "Weapon",
                "location": "Merchant near Old Altus Tunnel entrance",
                "locationVi": "Merchant gần Old Altus Tunnel"
            },
            {
                "name": "Spiked Caestus",
                "type": "Weapon",
                "location": "Liurnia merchant in the lake facing cliffs",
                "locationVi": "Merchant ở Liurnia"
            },
            {
                "name": "Dryleaf Arts",
                "type": "Weapon",
                "location": "DLC, found in the Realm of Shadow",
                "locationVi": "DLC, tìm thấy ở Realm of Shadow"
            },
            {
                "name": "Claw Talisman",
                "type": "Talisman",
                "location": "Stormveil Castle, dropped by Lion Guardian",
                "locationVi": "Stormveil Castle, rơi từ Lion Guardian"
            },
            {
                "name": "Axe Talisman",
                "type": "Talisman",
                "location": "Mistywood, dropped by the Ancient Hero of Zamor",
                "locationVi": "Mistywood, rơi từ Ancient Hero of Zamor"
            }
        ],
        "tips": [
            "Fist weapons have the shortest range in the game — get in close and stay aggressive",
            "Powerstanced L1 attacks are incredibly fast and build status effects quickly",
            "Endure ash of war lets you poise through attacks and retaliate",
            "The Dryleaf Arts from DLC add kick attacks that have amazing range",
            "R2 charged attacks with Star Fist have surprising poise damage"
        ],
        "tipsVi": [
            "Vũ khí tay có tầm ngắn nhất — hãy áp sát và tấn công liên tục",
            "L1 song kiếm rất nhanh và tích trạng thái nhanh",
            "Endure cho phép bạn chịu đòn và phản công",
            "Dryleaf Arts từ DLC có đòn đá tầm xa",
            "R2 nạp với Star Fist có sát thương poise đáng ngạc nhiên"
        ]
    },
    {
        "slug": "torch-hollow",
        "name": "Torch Hollow",
        "nameVi": "Đuốc Ma",
        "description": "Only torches. Standard Torch, Beast-Repellent Torch, Ghostflame Torch, St. Trina's Torch. You are a humble hollow with a torch. The light guides you. The fire kills them.",
        "descriptionVi": "Chỉ dùng đuốc. Đuốc thường, Đuốc Xua Thú, Đuốc Lửa Ma, Đuốc St. Trina. Bạn là một hollow khiêm tốn với cây đuốc.",
        "category": "meme",
        "difficulty": 3,
        "dlc": False,
        "gameClass": "Wretch",
        "gameClassVi": "Kẻ Khốn Cùng",
        "sl": 125,
        "stats": {
            "Vigor": 50,
            "Mind": 15,
            "Endurance": 35,
            "Strength": 30,
            "Dexterity": 30,
            "Intelligence": 15,
            "Faith": 15,
            "Arcane": 11
        },
        "phases": [
            {
                "name": "Early Game",
                "nameVi": "Đầu Game",
                "levels": "1–50",
                "areas": "Limgrave, Weeping Peninsula",
                "areasVi": "Limgrave, Weeping Peninsula",
                "steps": [
                    "Choose Wretch — you start with a club but you're looking for a torch",
                    "Find the Standard Torch from the Nomadic Merchant near Gatefront",
                    "Equip torch immediately. Drop the club. Never look back.",
                    "Torch R1 is a fast horizontal swipe that does fire damage",
                    "Level Vigor to 25 and Endurance to 20 first",
                    "Fire damage is surprisingly effective against early game enemies"
                ],
                "stepsVi": [
                    "Chọn Wretch — bạn bắt đầu với dùi cui nhưng đang tìm đuốc",
                    "Tìm Standard Torch từ Nomadic Merchant gần Gatefront",
                    "Trang bị đuốc ngay. Vứt dùi cui. Không bao giờ nhìn lại.",
                    "Đuốc R1 là đòn quét ngang nhanh gây sát thương lửa",
                    "Tăng Vigor lên 25 và Endurance lên 20",
                    "Sát thương lửa rất hiệu quả với quái đầu game"
                ]
            },
            {
                "name": "Mid Game",
                "nameVi": "Giữa Game",
                "levels": "50–90",
                "areas": "Liurnia, Caelid, Altus Plateau",
                "areasVi": "Liurnia, Caelid, Altus Plateau",
                "steps": [
                    "Push Strength and Dex to 25 each for torch scaling",
                    "Get the Beast-Repellent Torch from the merchant in Dragonbarrow",
                    "Find St. Trina's Torch from the Consecrated Snowfield",
                    "Level Vigor to 35 and Endurance to 25",
                    "Use Fire Scorpion Charm to boost fire damage",
                    "St. Trina's Torch builds sleep status — a unique effect"
                ],
                "stepsVi": [
                    "Đẩy Strength và Dex lên 25",
                    "Lấy Beast-Repellent Torch từ merchant ở Dragonbarrow",
                    "Tìm St. Trina's Torch từ Consecrated Snowfield",
                    "Tăng Vigor lên 35 và Endurance lên 25",
                    "Dùng Fire Scorpion Charm",
                    "St. Trina's Torch gây trạng thái ngủ"
                ]
            },
            {
                "name": "Late Game",
                "nameVi": "Cuối Game",
                "levels": "90–125",
                "areas": "Mountaintops, Farum Azula, Haligtree",
                "areasVi": "Mountaintops, Farum Azula, Haligtree",
                "steps": [
                    "Push Strength and Dex to 30 each",
                    "Get the Ghostflame Torch from the Mountaintops",
                    "Ghostflame Torch deals magic damage — good for fire-resistant enemies",
                    "Level Vigor to 50 for late-game survival",
                    "Equip the Green Turtle Talisman for more stamina",
                    "The charged R2 on torches has surprising range"
                ],
                "stepsVi": [
                    "Đẩy Strength và Dex lên 30",
                    "Lấy Ghostflame Torch từ Mountaintops",
                    "Ghostflame Torch gây sát thương phép — tốt cho quái kháng lửa",
                    "Tăng Vigor lên 50",
                    "Trang bị Green Turtle Talisman",
                    "R2 nạp của đuốc có tầm bất ngờ"
                ]
            }
        ],
        "affinities": [
            {
                "name": "Fire",
                "ar": 320,
                "scaling": "D Str D Dex",
                "verdict": "Torches cannot be infused. Embrace the base damage and the meme.",
                "verdictVi": "Đuốc không thể thay đổi. Chấp nhận sát thương cơ bản và meme."
            }
        ],
        "items": [
            {
                "name": "Standard Torch",
                "type": "Weapon",
                "location": "Nomadic Merchant near Gatefront in Limgrave",
                "locationVi": "Nomadic Merchant gần Gatefront"
            },
            {
                "name": "Beast-Repellent Torch",
                "type": "Weapon",
                "location": "Isolated Merchant in Dragonbarrow",
                "locationVi": "Isolated Merchant ở Dragonbarrow"
            },
            {
                "name": "St. Trina's Torch",
                "type": "Weapon",
                "location": "Consecrated Snowfield, near the hidden Albinauric village",
                "locationVi": "Consecrated Snowfield, gần làng Albinauric ẩn"
            },
            {
                "name": "Ghostflame Torch",
                "type": "Weapon",
                "location": "Mountaintops of the Giants, dropped by a ghost at the spirit spring",
                "locationVi": "Mountaintops of the Giants, rơi từ hồn ma"
            },
            {
                "name": "Fire Scorpion Charm",
                "type": "Talisman",
                "location": "Mt. Gelmir, sub-boss arena near Fort Laiedd",
                "locationVi": "Mt. Gelmir, đấu trường sub-boss gần Fort Laiedd"
            },
            {
                "name": "Green Turtle Talisman",
                "type": "Talisman",
                "location": "Limgrave, Summonwater Village catacombs",
                "locationVi": "Limgrave, Summonwater Village catacombs"
            }
        ],
        "tips": [
            "Torches have low damage — this is a challenge run, not an efficient build",
            "St. Trina's Torch can put enemies to sleep for free critical hits",
            "Ghostflame Torch is actually decent against deathbirds and undead",
            "The Beast-Repellent Torch keeps beasts at bay — useful for Caelid",
            "You can equip a torch in each hand for dual-wield torch action (still bad but stylish)"
        ],
        "tipsVi": [
            "Đuốc có sát thương thấp — đây là thử thách, không phải build hiệu quả",
            "St. Trina's Torch có thể làm ngủ kẻ địch",
            "Ghostflame Torch tốt cho deathbirds và undead",
            "Beast-Repellent Torch xua đuổi thú dữ",
            "Có thể cầm đuốc hai tay để song đuốc (vẫn yếu nhưng phong cách)"
        ]
    }
]

# ── Dark Souls 3 meme builds ──
ds3_memes = [
    {
        "slug": "broken-sword-hero",
        "name": "Broken Sword Hero",
        "nameVi": "Anh Hùng Kiếm Gãy",
        "description": "The Broken Straight Sword is the worst weapon in Dark Souls 3. This build uses ONLY the Broken Straight Sword. SL1 if you have the masochism. Victory has never tasted so hollow.",
        "descriptionVi": "Broken Straight Sword là vũ khí tệ nhất DS3. Build này CHỈ dùng Broken Straight Sword. SL1 nếu bạn có chủ nghĩa khổ dâm.",
        "category": "meme",
        "difficulty": 3,
        "dlc": True,
        "gameClass": "Knight",
        "gameClassVi": "Hiệp Sĩ",
        "sl": 1,
        "stats": {
            "Vigor": 10,
            "Attunement": 10,
            "Endurance": 10,
            "Vitality": 10,
            "Strength": 11,
            "Dexterity": 13,
            "Intelligence": 9,
            "Faith": 9,
            "Luck": 10
        },
        "phases": [
            {
                "name": "The Beginning",
                "nameVi": "Khởi Đầu",
                "levels": "SL 1",
                "areas": "Cemetery of Ash",
                "areasVi": "Cemetery of Ash",
                "steps": [
                    "Pick Knight for the best starting SL1 stats",
                    "Find the Broken Straight Sword on a corpse in Cemetery of Ash",
                    "Embrace your fate. This is your weapon for the entire game.",
                    "Level Vigor? No. You are SL1. Suffering is the point.",
                    "Upgrade the Broken Sword as soon as you reach Firelink",
                    "Raw infusion gives the best early damage for no scaling"
                ],
                "stepsVi": [
                    "Chọn Knight cho chỉ số SL1 tốt nhất",
                    "Tìm Broken Straight Sword từ xác chết ở Cemetery of Ash",
                    "Chấp nhận số phận. Đây là vũ khí cho cả game.",
                    "Tăng Vigor? Không. Bạn là SL1. Đau khổ là mục tiêu.",
                    "Nâng cấp Broken Sword ngay khi đến Firelink",
                    "Raw infusion cho sát thương tốt nhất đầu game"
                ]
            },
            {
                "name": "The Grind",
                "nameVi": "Nghiền Ngẫm",
                "levels": "SL 1",
                "areas": "High Wall, Undead Settlement, Farron Keep",
                "areasVi": "High Wall, Undead Settlement, Farron Keep",
                "steps": [
                    "Every boss is a marathon. Learn their moves perfectly.",
                    "Use Gold Pine Resin for a damage boost against every boss",
                    "Equip the Lloyd's Sword Ring and Lloyd's Shield Ring",
                    "Get the Prisoner's Chain as soon as you can reach Champion Gundyr",
                    "The Broken Sword does less damage than a sneeze. Persevere.",
                    "You will die hundreds of times. This is the way."
                ],
                "stepsVi": [
                    "Mỗi boss là một cuộc chạy marathon. Học thuộc động tác của chúng.",
                    "Dùng Gold Pine Resin để tăng sát thương",
                    "Trang bị Lloyd's Sword Ring và Lloyd's Shield Ring",
                    "Lấy Prisoner's Chain càng sớm càng tốt",
                    "Broken Sword gây sát thương ít hơn cái hắt hơi. Hãy kiên trì.",
                    "Bạn sẽ chết hàng trăm lần. Đây là con đường."
                ]
            },
            {
                "name": "The Victory",
                "nameVi": "Chiến Thắng",
                "levels": "SL 1",
                "areas": "Lothric Castle, Archdragon Peak, DLC",
                "areasVi": "Lothric Castle, Archdragon Peak, DLC",
                "steps": [
                    "Max the Broken Sword to +10 Raw for peak (still terrible) damage",
                    "Use Lightning Blade buff from 15 Faith via Priestess Ring",
                    "Pontiff's Right Eye and Left Eye for multi-hit sustain",
                    "The Broken Sword hits 3-4 times per combo — abuse this",
                    "Defeat Soul of Cinder with your broken blade",
                    "You are legally allowed to tell everyone you beat DS3 with a broken sword"
                ],
                "stepsVi": [
                    "Nâng Broken Sword lên +10 Raw",
                    "Dùng Lightning Blade buff nhờ Priestess Ring",
                    "Pontiff's Right Eye và Left Eye",
                    "Broken Sword đánh 3-4 lần mỗi combo",
                    "Đánh bại Soul of Cinder với thanh kiếm gãy",
                    "Bạn có quyền khoe với mọi người rằng bạn đã beat DS3 bằng kiếm gãy"
                ]
            }
        ],
        "affinities": [
            {
                "name": "Raw",
                "ar": 130,
                "scaling": "None",
                "verdict": "Best for SL1. Base damage is all you have.",
                "verdictVi": "Tốt nhất cho SL1. Sát thương cơ bản là tất cả."
            },
            {
                "name": "Deep",
                "ar": 140,
                "scaling": "None",
                "verdict": "Slightly more damage but split into dark. Use for resistant enemies.",
                "verdictVi": "Sát thương cao hơn nhưng chia làm dark."
            }
        ],
        "items": [
            {
                "name": "Broken Straight Sword",
                "type": "Weapon",
                "location": "Cemetery of Ash, on a corpse near the first bonfire",
                "locationVi": "Cemetery of Ash, trên xác chết gần bonfire đầu"
            },
            {
                "name": "Lloyd's Sword Ring",
                "type": "Ring",
                "location": "High Wall of Lothric, near Tower on the Wall",
                "locationVi": "High Wall of Lothric, gần Tower on the Wall"
            },
            {
                "name": "Prisoner's Chain",
                "type": "Ring",
                "location": "Transposed from Champion Gundyr's soul",
                "locationVi": "Transpose từ linh hồn Champion Gundyr"
            },
            {
                "name": "Pontiff's Right Eye",
                "type": "Ring",
                "location": "Transposed from Pontiff Sulyvahn",
                "locationVi": "Transpose từ Pontiff"
            },
            {
                "name": "Priestess Ring",
                "type": "Ring",
                "location": "Irithyll of the Boreal Valley, on a corpse in the church",
                "locationVi": "Irithyll, trên xác chết trong nhà thờ"
            }
        ],
        "tips": [
            "The Broken Sword has a 4-hit R1 combo that does less damage than most weapons' single swing",
            "Raw infusion + resins/bundles is your only path to viable damage",
            "Learn to parry — riposte damage is a significant portion of your boss DPS",
            "Pontiff's Right Eye procs on 4 consecutive hits — your fast attacks actually help here",
            "If you can beat Midir with this weapon, you have achieved godhood"
        ],
        "tipsVi": [
            "Broken Sword có combo R1 4 đòn nhưng sát thương thấp hơn một đòn của vũ khí thường",
            "Raw infusion + resins là con đường duy nhất",
            "Học parry — riposte là phần lớn sát thương boss",
            "Pontiff's Right Eye kích hoạt sau 4 đòn liên tiếp",
            "Nếu bạn đánh bại được Midir với vũ khí này, bạn đã thành thần"
        ]
    },
    {
        "slug": "patches-cosplay",
        "name": "Patches Cosplay",
        "nameVi": "Patches Cosplay",
        "description": "Full Patches cosplay: his spear, his shield, his armor, and most importantly — the \"Well, what is it?\" gesture. Trick hosts into trusting you, then kick them off cliffs.",
        "descriptionVi": "Cosplay đầy đủ Patches: giáo, khiên, giáp, và quan trọng nhất — cử chỉ \"Well, what is it?\" Lừa host tin tưởng bạn, rồi đá họ xuống vực.",
        "category": "meme",
        "difficulty": 2,
        "dlc": True,
        "gameClass": "Knight",
        "gameClassVi": "Hiệp Sĩ",
        "sl": 90,
        "stats": {
            "Vigor": 30,
            "Attunement": 10,
            "Endurance": 25,
            "Vitality": 20,
            "Strength": 28,
            "Dexterity": 13,
            "Intelligence": 9,
            "Faith": 9,
            "Luck": 10
        },
        "phases": [
            {
                "name": "Early Game",
                "nameVi": "Đầu Game",
                "levels": "SL 1-35",
                "areas": "High Wall, Undead Settlement",
                "areasVi": "High Wall, Undead Settlement",
                "steps": [
                    "Pick Knight for starting gear close to Patches vibe",
                    "Use a standard Spear from the Shrine Handmaid",
                    "Find a Shield with 100% physical block — any will do",
                    "Level Strength to 20 and Vigor to 20",
                    "Buy the \"Well, what is it?\" gesture from Patches himself",
                    "Practice kicking enemies off ledges — it's your signature move"
                ],
                "stepsVi": [
                    "Chọn Knight để có gear giống Patches",
                    "Dùng Spear thường từ Shrine Handmaid",
                    "Tìm khiên 100% vật lý",
                    "Tăng Strength lên 20 và Vigor lên 20",
                    "Mua cử chỉ \"Well, what is it?\" từ Patches",
                    "Luyện đá kẻ địch xuống vực"
                ]
            },
            {
                "name": "Mid Game",
                "nameVi": "Giữa Game",
                "levels": "SL 35-65",
                "areas": "Cathedral of the Deep, Farron Keep, Irithyll",
                "areasVi": "Cathedral of the Deep, Farron Keep, Irithyll",
                "steps": [
                    "Complete Patches' questline in Cathedral of the Deep",
                    "Buy Patches' armor set from the Shrine Handmaid after his quest",
                    "Get the Winged Spear or his actual four-pronged plow",
                    "Push Strength to 28 for his shield requirements",
                    "Equip the Sunlight Straight Sword as backup for the \"Oath of Sunlight\" roleplay",
                    "Patches' Shield has the \"Shield Bash\" weapon art"
                ],
                "stepsVi": [
                    "Hoàn thành nhiệm vụ Patches ở Cathedral of the Deep",
                    "Mua bộ giáp Patches từ Shrine Handmaid",
                    "Lấy Winged Spear hoặc four-pronged plow của hắn",
                    "Đẩy Strength lên 28",
                    "Trang bị Sunlight Straight Sword để roleplay",
                    "Khiên Patches có kỹ năng Shield Bash"
                ]
            },
            {
                "name": "Late Game + PvP",
                "nameVi": "Cuối Game + PvP",
                "levels": "SL 65-90",
                "areas": "Lothric Castle, Grand Archives, PvP",
                "areasVi": "Lothric Castle, Grand Archives, PvP",
                "steps": [
                    "Patches' armor is medium weight — mid-roll is fine",
                    "Infuse your spear with Heavy for Strength scaling",
                    "Use the Leo Ring for spear counter-hit damage",
                    "The \"Well, what is it?\" gesture asserts dominance",
                    "Invade as a mound-maker or sunbro — betray your host at the perfect moment",
                    "Remember: the true victory is the emotional damage you inflict"
                ],
                "stepsVi": [
                    "Giáp Patches là medium weight — mid-roll ổn",
                    "Gắn Heavy cho giáo",
                    "Dùng Leo Ring cho sát thương phản đòn",
                    "Cử chỉ \"Well, what is it?\" khẳng định ưu thế",
                    "Xâm lăng như mound-maker — phản bội host đúng lúc",
                    "Chiến thắng thực sự là tổn thương tinh thần bạn gây ra"
                ]
            }
        ],
        "affinities": [
            {
                "name": "Heavy",
                "ar": 420,
                "scaling": "A Str",
                "verdict": "Best for Strength-focused spear. Patches approves.",
                "verdictVi": "Tốt nhất cho giáo Strength. Patches chấp thuận."
            },
            {
                "name": "Sharp",
                "ar": 380,
                "scaling": "B Dex",
                "verdict": "Too tryhard. Patches would never min-max.",
                "verdictVi": "Quá tryhard. Patches không bao giờ tối ưu."
            }
        ],
        "items": [
            {
                "name": "Patches' Armor Set",
                "type": "Armor",
                "location": "Shrine Handmaid after completing Patches' quest",
                "locationVi": "Shrine Handmaid sau nhiệm vụ Patches"
            },
            {
                "name": "Winged Spear",
                "type": "Weapon",
                "location": "Purchased from Shrine Handmaid or found",
                "locationVi": "Mua từ Shrine Handmaid"
            },
            {
                "name": "Patches' Shield",
                "type": "Armor",
                "location": "Dropped by Patches or purchased after quest",
                "locationVi": "Patches rơi ra"
            },
            {
                "name": "Leo Ring",
                "type": "Ring",
                "location": "Transposed from Pontiff Sulyvahn's soul",
                "locationVi": "Transpose từ Pontiff"
            },
            {
                "name": "\"Well, what is it?\" Gesture",
                "type": "Weapon",
                "location": "Purchased from Patches",
                "locationVi": "Mua từ Patches"
            }
        ],
        "tips": [
            "The \"Well, what is it?\" gesture is mandatory — use it after every kill",
            "Patches' spear has a shield-poke moveset — hide behind your shield and poke",
            "Kicking enemies off ledges is canon — always seek a gravity kill",
            "As a Patches cosplayer, you are morally obligated to trick other players",
            "The four-pronged plow has the same moveset as a spear — maximum disrespect"
        ],
        "tipsVi": [
            "Cử chỉ \"Well, what is it?\" là bắt buộc — dùng nó sau mỗi mạng",
            "Giáo Patches có moveset đâm sau khiên",
            "Đá kẻ địch xuống vực là chính thống",
            "Cosplay Patches, bạn có nghĩa vụ lừa người chơi khác",
            "Four-pronged plow có moveset như giáo — thiếu tôn trọng tối đa"
        ]
    },
    {
        "slug": "dung-pie-bomber",
        "name": "Dung Pie Bomber",
        "nameVi": "Ném Bánh Phân",
        "description": "Only throw dung pies, poop items, and any consumable that disgusts your enemies. You don't need to kill them — you just need to make them wish they were dead. The ultimate toxic build.",
        "descriptionVi": "Chỉ ném bánh phân, đồ phân, và vật phẩm khiến kẻ địch kinh tởm. Bạn không cần giết — chỉ cần làm chúng ước gì mình chết rồi.",
        "category": "meme",
        "difficulty": 3,
        "dlc": True,
        "gameClass": "Deprived",
        "gameClassVi": "Kẻ Cùng Khổ",
        "sl": 80,
        "stats": {
            "Vigor": 30,
            "Attunement": 6,
            "Endurance": 30,
            "Vitality": 15,
            "Strength": 10,
            "Dexterity": 10,
            "Intelligence": 10,
            "Faith": 10,
            "Luck": 99
        },
        "phases": [
            {
                "name": "The Stink Begins",
                "nameVi": "Mùi Bắt Đầu",
                "levels": "SL 1-30",
                "areas": "High Wall, Undead Settlement",
                "areasVi": "High Wall, Undead Settlement",
                "steps": [
                    "Pick Deprived for the true zero start",
                    "Buy Dung Pies from the Shrine Handmaid in Firelink",
                    "Find more Dung Pies on corpses throughout the High Wall",
                    "Level Luck to 30 first — Luck affects your consumable item discovery",
                    "Use Alluring Skulls to distract enemies while you pelt them from range",
                    "Embrace the fact that this build is a war of attrition"
                ],
                "stepsVi": [
                    "Chọn Deprived cho khởi đầu thực sự từ số 0",
                    "Mua Dung Pies từ Shrine Handmaid",
                    "Tìm thêm Dung Pies trên xác chết ở High Wall",
                    "Tăng Luck lên 30 đầu tiên",
                    "Dùng Alluring Skulls để đánh lạc hướng",
                    "Chấp nhận rằng build này là chiến tranh tiêu hao"
                ]
            },
            {
                "name": "The Stench Spreads",
                "nameVi": "Mùi Lan Tỏa",
                "levels": "SL 30-60",
                "areas": "Cathedral, Farron Keep, Irithyll",
                "areasVi": "Cathedral, Farron Keep, Irithyll",
                "steps": [
                    "Push Luck to 60 for maximum item discovery",
                    "Buy all Dung Pies from every merchant. Stock up.",
                    "You can farm Dung Pies from certain enemies in the game",
                    "Use Poison Moss to cure your own poison (you will poison yourself)",
                    "Rotten Pine Resin on... wait, you don't use weapons. Just pies.",
                    "The toxic buildup from multiple dung pies stacks"
                ],
                "stepsVi": [
                    "Đẩy Luck lên 60",
                    "Mua tất cả Dung Pies từ mọi merchant",
                    "Có thể farm Dung Pies từ một số kẻ địch",
                    "Dùng Poison Moss để giải độc cho chính mình",
                    "Rotten Pine Resin trên... khoan, bạn không dùng vũ khí.",
                    "Tích tụ độc từ nhiều bánh phân cộng dồn"
                ]
            },
            {
                "name": "The Legend",
                "nameVi": "Huyền Thoại",
                "levels": "SL 60-80",
                "areas": "Lothric Castle, Grand Archives, DLC",
                "areasVi": "Lothric Castle, Grand Archives, DLC",
                "steps": [
                    "Max Luck at 99 for maximum item discovery",
                    "Dung Pies now do minimal damage but max toxicity to the enemy's spirit",
                    "Invade other players' worlds. Throw dung pies. Run away.",
                    "Use the Dung Pie patty cake true combo: pie, pie, point down",
                    "You have achieved the highest form of trolling",
                    "No boss is immune to emotional damage"
                ],
                "stepsVi": [
                    "Max Luck ở 99",
                    "Dung Pies bây giờ sát thương thấp nhất nhưng độc hại tinh thần cao nhất",
                    "Xâm lăng thế giới người khác. Ném bánh phân. Bỏ chạy.",
                    "Combo bánh phân: ném, ném, chỉ xuống đất",
                    "Bạn đã đạt đến hình thức troll cao nhất",
                    "Không boss nào miễn nhiễm với tổn thương tinh thần"
                ]
            }
        ],
        "affinities": [
            {
                "name": "Toxic",
                "ar": 1,
                "scaling": "None",
                "verdict": "It's a dung pie. What scaling do you expect?",
                "verdictVi": "Nó là bánh phân. Bạn mong đợi scaling gì?"
            }
        ],
        "items": [
            {
                "name": "Dung Pie",
                "type": "Weapon",
                "location": "Shrine Handmaid and various merchants",
                "locationVi": "Shrine Handmaid và nhiều merchant"
            },
            {
                "name": "Alluring Skull",
                "type": "Weapon",
                "location": "Shrine Handmaid",
                "locationVi": "Shrine Handmaid"
            },
            {
                "name": "Undead Hunter Charm",
                "type": "Weapon",
                "location": "Shrine Handmaid, found in Undead Settlement",
                "locationVi": "Shrine Handmaid, tìm thấy ở Undead Settlement"
            },
            {
                "name": "Covetous Gold Serpent Ring +3",
                "type": "Ring",
                "location": "Ringed City DLC",
                "locationVi": "Ringed City DLC"
            },
            {
                "name": "Symbol of Avarice",
                "type": "Armor",
                "location": "Dropped by mimic in High Wall or Lothric Castle",
                "locationVi": "Rơi từ mimic"
            }
        ],
        "tips": [
            "Dung Pies inflict toxic buildup — wait, they actually do in this game? No. They just make a mess.",
            "The true damage is psychological. Watch your opponent panic-roll away from the filth.",
            "Stock up at every bonfire. You need dozens of pies per area.",
            "Combine with the Point Down gesture for maximum disrespect",
            "There is one specific Dung Pie in Firelink Shrine that respawns. Guard it with your life."
        ],
        "tipsVi": [
            "Bánh phân không gây sát thương thực sự",
            "Sát thương thực sự là tâm lý",
            "Dự trữ ở mỗi bonfire. Bạn cần hàng tá bánh.",
            "Kết hợp với cử chỉ Point Down",
            "Có một bánh phân đặc biệt ở Firelink. Bảo vệ nó bằng mạng sống."
        ]
    },
    {
        "slug": "caestus-champion",
        "name": "Caestus Champion",
        "nameVi": "Nhà Vô Địch Caestus",
        "description": "Only the Caestus — the boxing glove of Dark Souls. Powerstance two Caestus for a flurry of punches. Fast attacks, Perseverance weapon art, and the satisfaction of fisting every boss to death.",
        "descriptionVi": "Chỉ dùng Caestus — găng tay boxing của Dark Souls. Powerstance hai Caestus cho một trận mưa đấm. Tấn công nhanh, kỹ năng Perseverance.",
        "category": "meme",
        "difficulty": 2,
        "dlc": True,
        "gameClass": "Warrior",
        "gameClassVi": "Chiến Binh",
        "sl": 125,
        "stats": {
            "Vigor": 40,
            "Attunement": 6,
            "Endurance": 35,
            "Vitality": 15,
            "Strength": 40,
            "Dexterity": 18,
            "Intelligence": 9,
            "Faith": 9,
            "Luck": 10
        },
        "phases": [
            {
                "name": "Early Game",
                "nameVi": "Đầu Game",
                "levels": "SL 1-40",
                "areas": "High Wall, Undead Settlement",
                "areasVi": "High Wall, Undead Settlement",
                "steps": [
                    "Pick Warrior for high Strength",
                    "Buy Caestus from the Shrine Handmaid in Firelink",
                    "Buy a SECOND Caestus — powerstance requires two",
                    "Level Strength to 20 and Vigor to 20",
                    "Use a Heavy Gem infusion as soon as possible",
                    "Perseverance weapon art gives you massive poise"
                ],
                "stepsVi": [
                    "Chọn Warrior cho Strength cao",
                    "Mua Caestus từ Shrine Handmaid",
                    "Mua Caestus THỨ HAI — powerstance cần hai",
                    "Tăng Strength lên 20 và Vigor lên 20",
                    "Gắn Heavy Gem ngay khi có thể",
                    "Kỹ năng Perseverance cho poise khổng lồ"
                ]
            },
            {
                "name": "Mid Game",
                "nameVi": "Giữa Game",
                "levels": "SL 40-80",
                "areas": "Farron Keep, Catacombs, Irithyll",
                "areasVi": "Farron Keep, Catacombs, Irithyll",
                "steps": [
                    "Push Strength to 30 and Endurance to 25",
                    "Upgrade both Caestus to +7 Heavy",
                    "Equip the Pontiff's Right Eye for multi-hit damage bonus",
                    "Equip the Chloranthy Ring for stamina regen",
                    "Level Vigor to 30 for more HP",
                    "The powerstance L1 attacks are rapid punches"
                ],
                "stepsVi": [
                    "Đẩy Strength lên 30 và Endurance lên 25",
                    "Nâng cấp cả hai Caestus lên +7 Heavy",
                    "Trang bị Pontiff's Right Eye",
                    "Trang bị Chloranthy Ring",
                    "Tăng Vigor lên 30",
                    "L1 powerstance là đấm liên hoàn"
                ]
            },
            {
                "name": "Late Game + DLC",
                "nameVi": "Cuối Game + DLC",
                "levels": "SL 80-125",
                "areas": "Lothric Castle, Archdragon Peak, DLC",
                "areasVi": "Lothric Castle, Archdragon Peak, DLC",
                "steps": [
                    "Push Strength to 40 (equals 60 two-handed via powerstance)",
                    "Max both Caestus to +10 Heavy",
                    "Equip the Ring of Favor +3 and Havel's Ring +3",
                    "Use Gold Pine Resin for extra lightning damage on punches",
                    "Perseverance lets you trade through any attack",
                    "The powerstance L2 is a double punch with massive poise damage"
                ],
                "stepsVi": [
                    "Đẩy Strength lên 40",
                    "Nâng cả hai Caestus lên +10 Heavy",
                    "Trang bị Ring of Favor +3 và Havel's Ring +3",
                    "Dùng Gold Pine Resin",
                    "Perseverance cho phép bạn trao đổi sát thương",
                    "L2 powerstance là cú đấm đôi"
                ]
            }
        ],
        "affinities": [
            {
                "name": "Heavy",
                "ar": 350,
                "scaling": "A Str",
                "verdict": "Best for pure Strength. A scaling at 40 Str.",
                "verdictVi": "Tốt nhất cho Strength thuần."
            },
            {
                "name": "Sharp",
                "ar": 300,
                "scaling": "B Dex",
                "verdict": "Not worth it for this build.",
                "verdictVi": "Không đáng cho build này."
            }
        ],
        "items": [
            {
                "name": "Caestus x2",
                "type": "Weapon",
                "location": "Purchased from Shrine Handmaid in Firelink Shrine",
                "locationVi": "Mua từ Shrine Handmaid"
            },
            {
                "name": "Pontiff's Right Eye",
                "type": "Ring",
                "location": "Transposed from Pontiff Sulyvahn",
                "locationVi": "Transpose từ Pontiff"
            },
            {
                "name": "Chloranthy Ring +3",
                "type": "Ring",
                "location": "Ringed City DLC",
                "locationVi": "Ringed City DLC"
            },
            {
                "name": "Ring of Favor +3",
                "type": "Ring",
                "location": "Ringed City DLC",
                "locationVi": "Ringed City DLC"
            },
            {
                "name": "Havel's Ring +3",
                "type": "Ring",
                "location": "Dreg Heap from Havel Knight",
                "locationVi": "Dreg Heap từ Havel Knight"
            },
            {
                "name": "Prisoner's Chain",
                "type": "Ring",
                "location": "Transposed from Champion Gundyr",
                "locationVi": "Transpose từ Champion Gundyr"
            }
        ],
        "tips": [
            "Powerstance Caestus L1 is the fastest attack in the game — spam it",
            "Perseverance gives you 15 seconds of massive damage reduction and infinite poise",
            "Pontiff's Right Eye + Old Wolf Curved Sword on back = 30% damage after 4 hits",
            "Caestus have terrible range — stay glued to your target",
            "The powerstance L2 is a slow double-punch that does massive stamina damage to shields"
        ],
        "tipsVi": [
            "Powerstance Caestus L1 là đòn nhanh nhất game",
            "Perseverance cho 15 giây giảm sát thương và poise vô hạn",
            "Pontiff's Right Eye + Old Wolf Curved Sword = 30% sát thương",
            "Caestus có tầm rất ngắn — áp sát mục tiêu",
            "L2 powerstance là đấm đôi gây sát thương stamina lớn lên khiên"
        ]
    }
]

# ── Dark Souls 1 meme builds (Giant Dad already exists) ──
ds1_memes = [
    {
        "slug": "broken-sword-asylum",
        "name": "Broken Sword Hollow",
        "nameVi": "Hollow Kiếm Gãy",
        "description": "Break your sword in the tutorial, never repair it. Fight through all of Lordran with a weapon that does less damage than a gentle breeze. The ultimate test of patience from the very first boss.",
        "descriptionVi": "Làm gãy kiếm trong hướng dẫn, không bao giờ sửa. Chiến đấu qua toàn bộ Lordran với vũ khí gây sát thương ít hơn gió nhẹ.",
        "category": "meme",
        "difficulty": 3,
        "dlc": True,
        "gameClass": "Pyromancer",
        "gameClassVi": "Pháp Sư Lửa",
        "sl": 99,
        "stats": {
            "Vitality": 60,
            "Attunement": 12,
            "Endurance": 40,
            "Strength": 16,
            "Dexterity": 10,
            "Resistance": 11,
            "Intelligence": 10,
            "Faith": 8
        },
        "phases": [
            {
                "name": "The Break",
                "nameVi": "Sự Gãy Đổ",
                "levels": "1–20",
                "areas": "Undead Asylum, Firelink",
                "areasVi": "Undead Asylum, Firelink",
                "steps": [
                    "Choose Pyromancer for the starting pyro flame",
                    "Equip your broken sword hilt from the asylum",
                    "Yes, it CAN be repaired at a blacksmith. Don't do it.",
                    "The Broken Sword deals 20 damage per hit. Embrace it.",
                    "Rush to Undead Burg for your first sanity check",
                    "Every enemy is now a boss. Every boss is now a raid boss."
                ],
                "stepsVi": [
                    "Chọn Pyromancer cho pyro flame khởi đầu",
                    "Trang bị broken sword hilt từ asylum",
                    "Không bao giờ sửa nó",
                    "Broken Sword gây 20 sát thương mỗi đòn",
                    "Chạy đến Undead Burg",
                    "Mỗi kẻ địch là boss. Mỗi boss là raid boss."
                ]
            },
            {
                "name": "The Grind",
                "nameVi": "Nghiền Răng",
                "levels": "20–60",
                "areas": "Undead Parish, Depths, Blighttown",
                "areasVi": "Undead Parish, Depths, Blighttown",
                "steps": [
                    "Level Vitality to 40 first — you need HP to survive long fights",
                    "The broken sword can be upgraded to +5. Do it.",
                    "Use Gold Pine Resin for a damage boost",
                    "Learn the Leo Ring for counter-hit bonus",
                    "Equip Ring of Favor and Protection for more HP",
                    "The broken sword at +5 with Gold Pine Resin does... slightly more damage"
                ],
                "stepsVi": [
                    "Tăng Vitality lên 40 trước",
                    "Broken sword có thể nâng lên +5",
                    "Dùng Gold Pine Resin",
                    "Học Leo Ring",
                    "Trang bị Ring of Favor and Protection",
                    "Broken sword +5 với Gold Pine Resin... hơi mạnh hơn một chút"
                ]
            },
            {
                "name": "The Madness",
                "nameVi": "Điên Rồ",
                "levels": "60–99",
                "areas": "Sen's Fortress, Anor Londo, Kiln",
                "areasVi": "Sen's Fortress, Anor Londo, Kiln",
                "steps": [
                    "Max Vitality at 60 and Endurance at 40",
                    "Max the broken sword to Crystal +5 for the highest broken sword AR",
                    "Crystal +5 broken sword has 100 base damage — it's still terrible",
                    "Power Within pyromancy for 40% damage boost",
                    "Defeat Ornstein and Smough with your toothpick of a weapon",
                    "When you beat Gwyn, you will have earned the title of TRUE Chosen Undead"
                ],
                "stepsVi": [
                    "Max Vitality ở 60 và Endurance ở 40",
                    "Nâng broken sword lên Crystal +5",
                    "Crystal +5 broken sword có 100 sát thương cơ bản — vẫn tệ",
                    "Power Within tăng 40% sát thương",
                    "Đánh bại Ornstein và Smough với tăm xỉa răng",
                    "Khi đánh bại Gwyn, bạn xứng đáng là Chosen Undead thực sự"
                ]
            }
        ],
        "affinities": [
            {
                "name": "Crystal +5",
                "ar": 100,
                "scaling": "None",
                "verdict": "The best broken sword you can make. Still worse than every other weapon.",
                "verdictVi": "Broken sword tốt nhất có thể chế. Vẫn tệ hơn mọi vũ khí khác."
            },
            {
                "name": "Raw +5",
                "ar": 85,
                "scaling": "None",
                "verdict": "Worse AR than Crystal but repairable. For the less dedicated.",
                "verdictVi": "AR thấp hơn Crystal nhưng sửa được."
            }
        ],
        "items": [
            {
                "name": "Broken Sword",
                "type": "Weapon",
                "location": "Undead Asylum, starting equipment (or break your weapon on purpose)",
                "locationVi": "Undead Asylum, trang bị khởi đầu"
            },
            {
                "name": "Leo Ring",
                "type": "Ring",
                "location": "Anor Londo, dropped by the Ornstein sentinel",
                "locationVi": "Anor Londo, rơi từ Ornstein sentinel"
            },
            {
                "name": "Ring of Favor and Protection",
                "type": "Ring",
                "location": "Undead Parish behind the giant rat",
                "locationVi": "Undead Parish sau chuột khổng lồ"
            },
            {
                "name": "Power Within",
                "type": "Weapon",
                "location": "Blighttown on a corpse near the giant leech swamp",
                "locationVi": "Blighttown trên xác chết"
            },
            {
                "name": "Gold Pine Resin",
                "type": "Weapon",
                "location": "Purchased from merchants or found",
                "locationVi": "Mua từ merchant"
            }
        ],
        "tips": [
            "The broken sword has a 6-hit R1 combo — it takes all 6 to equal one normal sword swing",
            "Leo Ring counter-hits are your highest damage source",
            "Power Within is mandatory for any boss that isn't Pinwheel",
            "You can break any weapon by attacking crystal golems — not that you'd want to",
            "This build teaches you every boss moveset better than any other run"
        ],
        "tipsVi": [
            "Broken sword có combo R1 6 đòn — cả 6 đòn bằng một đòn kiếm thường",
            "Leo Ring là nguồn sát thương cao nhất",
            "Power Within bắt buộc cho mọi boss không phải Pinwheel",
            "Build này dạy bạn moveset boss tốt hơn mọi run khác"
        ]
    },
    {
        "slug": "boxing-hollow",
        "name": "Boxing Hollow",
        "nameVi": "Hollow Quyền Anh",
        "description": "Dragon Fist + Caestus. Become the boxing champion of Lordran. The Dragon Fist has a unique R2 that fires a fireball. The Caestus is your fast jab. No swords, no shields — just fists.",
        "descriptionVi": "Dragon Fist + Caestus. Trở thành nhà vô địch quyền anh của Lordran. Dragon Fist có R2 bắn cầu lửa. Caestus là cú jab nhanh.",
        "category": "meme",
        "difficulty": 2,
        "dlc": False,
        "gameClass": "Bandit",
        "gameClassVi": "Kẻ Cướp",
        "sl": 99,
        "stats": {
            "Vitality": 50,
            "Attunement": 8,
            "Endurance": 40,
            "Strength": 40,
            "Dexterity": 10,
            "Resistance": 11,
            "Intelligence": 10,
            "Faith": 8
        },
        "phases": [
            {
                "name": "Early Game",
                "nameVi": "Đầu Game",
                "levels": "1–35",
                "areas": "Undead Burg, Parish, Darkroot",
                "areasVi": "Undead Burg, Parish, Darkroot",
                "steps": [
                    "Pick Bandit for highest starting Strength",
                    "Buy Caestus from the Undead Merchant in the Burg",
                    "Level Strength to 30 and Endurance to 20",
                    "Reinforce Caestus to +5",
                    "The Caestus R1 is a fast jab — use it for quick hits",
                    "Learn to love the short range"
                ],
                "stepsVi": [
                    "Chọn Bandit cho Strength cao nhất",
                    "Mua Caestus từ Undead Merchant",
                    "Tăng Strength lên 30 và Endurance lên 20",
                    "Nâng Caestus lên +5",
                    "Caestus R1 là cú jab nhanh",
                    "Học cách yêu tầm đánh ngắn"
                ]
            },
            {
                "name": "Mid Game",
                "nameVi": "Giữa Game",
                "levels": "35–70",
                "areas": "Sen's Fortress, Anor Londo, Ash Lake",
                "areasVi": "Sen's Fortress, Anor Londo, Ash Lake",
                "steps": [
                    "Push Strength to 40 and Vitality to 30",
                    "Get the Dragon Fist from the Everlasting Dragon in Ash Lake",
                    "Cut the Dragon's tail for the Dragon Greatsword? No. Get the Fist.",
                    "The Dragon Fist fires a fireball on R2",
                    "Powerstance Caestus in right hand, Dragon Fist in left",
                    "Equip the Leo Ring for counter damage on fist attacks"
                ],
                "stepsVi": [
                    "Đẩy Strength lên 40 và Vitality lên 30",
                    "Lấy Dragon Fist từ Everlasting Dragon ở Ash Lake",
                    "Dragon Fist có R2 bắn cầu lửa",
                    "Powerstance: Caestus tay phải, Dragon Fist tay trái",
                    "Trang bị Leo Ring"
                ]
            },
            {
                "name": "Late Game",
                "nameVi": "Cuối Game",
                "levels": "70–99",
                "areas": "Duke's Archives, Lost Izalith, Kiln",
                "areasVi": "Duke's Archives, Lost Izalith, Kiln",
                "steps": [
                    "Max Caestus to +15 Standard for Strength scaling",
                    "Dragon Fist stays at Dragon weapon level (cannot be upgraded easily)",
                    "Equip the Dark Wood Grain Ring for fast roll ninja flips",
                    "Use the Hornet Ring for critical damage on parry/backstab",
                    "The R2 fireball from Dragon Fist has terrible tracking but amazing style",
                    "Defeat Gwyn with fisticuffs"
                ],
                "stepsVi": [
                    "Nâng Caestus lên +15 Standard",
                    "Dragon Fist ở cấp Dragon",
                    "Trang bị Dark Wood Grain Ring",
                    "Trang bị Hornet Ring",
                    "R2 cầu lửa của Dragon Fist có tracking tệ nhưng phong cách tuyệt vời",
                    "Đánh bại Gwyn bằng tay không"
                ]
            }
        ],
        "affinities": [
            {
                "name": "Standard +15",
                "ar": 380,
                "scaling": "A Str",
                "verdict": "Best for Caestus. A Strength scaling at 40 Str.",
                "verdictVi": "Tốt nhất cho Caestus."
            },
            {
                "name": "Chaos +5",
                "ar": 420,
                "scaling": "B Fire",
                "verdict": "Higher AR with 10 humanity but loses buff potential.",
                "verdictVi": "AR cao hơn với 10 humanity."
            }
        ],
        "items": [
            {
                "name": "Caestus",
                "type": "Weapon",
                "location": "Purchased from Undead Merchant in Undead Burg",
                "locationVi": "Mua từ Undead Merchant"
            },
            {
                "name": "Dragon Fist",
                "type": "Weapon",
                "location": "Ash Lake, cut the Everlasting Dragon's tail",
                "locationVi": "Ash Lake, cắt đuôi Everlasting Dragon"
            },
            {
                "name": "Leo Ring",
                "type": "Ring",
                "location": "Anor Londo from Ornstein sentinel",
                "locationVi": "Anor Londo từ Ornstein sentinel"
            },
            {
                "name": "Dark Wood Grain Ring",
                "type": "Ring",
                "location": "DLC Royal Wood",
                "locationVi": "DLC Royal Wood"
            },
            {
                "name": "Hornet Ring",
                "type": "Ring",
                "location": "Darkroot Garden behind hidden wall",
                "locationVi": "Darkroot Garden sau tường ẩn"
            }
        ],
        "tips": [
            "Your range is terrible — you must stay glued to enemies at all times",
            "The Dragon Fist R2 fireball is terrible for damage but amazing for intimidation",
            "Powerstance L1 attacks with Caestus + Dragon Fist are very fast",
            "You can parry with the Caestus in your offhand — use it",
            "The Dragon Fist weighs 10 units — level Endurance accordingly"
        ],
        "tipsVi": [
            "Tầm đánh rất ngắn — phải áp sát kẻ địch",
            "Dragon Fist R2 cầu lửa sát thương tệ nhưng đe dọa tuyệt vời",
            "Powerstance L1 Caestus + Dragon Fist rất nhanh",
            "Có thể parry với Caestus tay trái",
            "Dragon Fist nặng 10 — tăng Endurance tương ứng"
        ]
    },
    {
        "slug": "item-man",
        "name": "Item Man",
        "nameVi": "Người Đồ Vật",
        "description": "Only consumable items. Firebombs, dung pies, throwing knives, Lloyd's Talismans. You are a walking inventory. Sort by \"Consumable\" and close your eyes. No weapons, no spells — just items.",
        "descriptionVi": "Chỉ dùng vật phẩm tiêu hao. Bom lửa, bánh phân, phi tiêu, Lloyd's Talisman. Bạn là một cái túi đồ biết đi.",
        "category": "meme",
        "difficulty": 3,
        "dlc": True,
        "gameClass": "Thief",
        "gameClassVi": "Kẻ Trộm",
        "sl": 90,
        "stats": {
            "Vitality": 40,
            "Attunement": 8,
            "Endurance": 30,
            "Strength": 14,
            "Dexterity": 20,
            "Resistance": 11,
            "Intelligence": 9,
            "Faith": 8
        },
        "phases": [
            {
                "name": "The Shopping Spree",
                "nameVi": "Mua Sắm",
                "levels": "1–30",
                "areas": "Undead Burg, Firelink, Depths",
                "areasVi": "Undead Burg, Firelink, Depths",
                "steps": [
                    "Pick Thief for the Master Key",
                    "Buy all Firebombs from the Undead Merchant in the Burg",
                    "Buy all Throwing Knives from the same merchant",
                    "Level Dexterity to 20 — it improves throwing speed",
                    "Learn the Firebomb arc — it's different from other games",
                    "Every soul goes to consumables. You are a walking munitions dump."
                ],
                "stepsVi": [
                    "Chọn Thief cho Master Key",
                    "Mua tất cả Firebombs từ Undead Merchant",
                    "Mua tất cả Throwing Knives",
                    "Tăng Dexterity lên 20 — cải thiện tốc độ ném",
                    "Học đường vòng của Firebomb",
                    "Mọi linh hồn đổ vào đồ tiêu hao"
                ]
            },
            {
                "name": "The Arsenal",
                "nameVi": "Kho Vũ Khí",
                "levels": "30–65",
                "areas": "Sen's Fortress, Anor Londo, Catacombs",
                "areasVi": "Sen's Fortress, Anor Londo, Catacombs",
                "steps": [
                    "Buy Lightning Urns from the Crestfallen Merchant in Sen's Fortress",
                    "Stock up on Dung Pies from several merchants",
                    "Buy Alluring Skulls and Lloyd's Talismans",
                    "Level Vitality to 30 and Endurance to 25",
                    "Poison Throwing Knives are excellent for status buildup",
                    "Kukris are the best throwing knives — farm them from Blighttown"
                ],
                "stepsVi": [
                    "Mua Lightning Urns từ Crestfallen Merchant",
                    "Dự trữ Dung Pies",
                    "Mua Alluring Skulls và Lloyd's Talismans",
                    "Tăng Vitality lên 30 và Endurance lên 25",
                    "Phi tiêu độc rất tốt cho tích trạng thái",
                    "Kukris là phi tiêu tốt nhất"
                ]
            },
            {
                "name": "The Legend",
                "nameVi": "Huyền Thoại",
                "levels": "65–90",
                "areas": "Duke's Archives, DLC, Kiln",
                "areasVi": "Duke's Archives, DLC, Kiln",
                "steps": [
                    "Max Vitality at 40 and Endurance at 30",
                    "Black Firebombs from the DLC merchants have best damage",
                    "Keep ALL consumables in your quick item slots",
                    "Use Lloyd's Talismans to prevent Estus chugging",
                    "Defeat Artorias with nothing but consumables",
                    "Your inventory management skills will be legendary"
                ],
                "stepsVi": [
                    "Max Vitality ở 40 và Endurance ở 30",
                    "Black Firebombs từ DLC có sát thương tốt nhất",
                    "Đặt tất cả đồ tiêu hao vào ô nhanh",
                    "Dùng Lloyd's Talismans để chặn Estus",
                    "Đánh bại Artorias chỉ bằng đồ tiêu hao",
                    "Kỹ năng quản lý túi đồ của bạn sẽ thành huyền thoại"
                ]
            }
        ],
        "affinities": [
            {
                "name": "Consumable",
                "ar": 0,
                "scaling": "Dex",
                "verdict": "All items have fixed damage. Dexterity increases throw speed.",
                "verdictVi": "Tất cả vật phẩm có sát thương cố định. Dex tăng tốc ném."
            }
        ],
        "items": [
            {
                "name": "Firebomb",
                "type": "Weapon",
                "location": "Undead Merchant in Undead Burg",
                "locationVi": "Undead Merchant ở Undead Burg"
            },
            {
                "name": "Kukri",
                "type": "Weapon",
                "location": "Dropped by merchants, found in Blighttown",
                "locationVi": "Tìm thấy ở Blighttown"
            },
            {
                "name": "Lightning Urn",
                "type": "Weapon",
                "location": "Crestfallen Merchant in Sen's Fortress",
                "locationVi": "Crestfallen Merchant ở Sen's Fortress"
            },
            {
                "name": "Black Firebomb",
                "type": "Weapon",
                "location": "DLC merchants, Undead Asylum",
                "locationVi": "Merchant DLC, Undead Asylum"
            },
            {
                "name": "Lloyd's Talisman",
                "type": "Weapon",
                "location": "Purchased from Oswald in Undead Parish",
                "locationVi": "Mua từ Oswald"
            },
            {
                "name": "Poison Throwing Knife",
                "type": "Weapon",
                "location": "Purchased from Shiva of the East or found",
                "locationVi": "Mua từ Shiva of the East"
            }
        ],
        "tips": [
            "Firebombs can be aimed — use the lock-on for better accuracy",
            "Kukris are your best damage-to-weight ratio for throwing knives",
            "Lloyd's Talisman prevents enemy healing for 30 seconds",
            "Poison knives do 5 damage per tick for 120 ticks — 600 total poison damage",
            "You can buy infinite Firebombs from the Undead Merchant — farm souls, buy bombs, win"
        ],
        "tipsVi": [
            "Firebombs có thể nhắm — dùng lock-on cho chính xác",
            "Kukris có tỷ lệ sát thương/trọng lượng tốt nhất",
            "Lloyd's Talisman chặn hồi máu 30 giây",
            "Phi tiêu độc gây 5 sát thương mỗi tick, 120 tick — 600 tổng",
            "Có thể mua Firebombs vô hạn — farm souls, mua bom, chiến thắng"
        ]
    }
]

# ── Dark Souls 2 meme builds ──
ds2_memes = [
    {
        "slug": "power-of-the-ladle",
        "name": "Power of the Ladle",
        "nameVi": "Sức Mạnh Của Cái Muôi",
        "description": "The Ladle is the worst weapon in Dark Souls 2. It has 20 base damage. It is a cooking utensil. But with the right build, it becomes... a slightly more dangerous cooking utensil. Embrace the meme.",
        "descriptionVi": "Ladle là vũ khí tệ nhất DS2. Sát thương cơ bản 20. Nó là dụng cụ nấu ăn. Nhưng với build đúng, nó trở thành... dụng cụ nấu ăn nguy hiểm hơn một chút.",
        "category": "meme",
        "difficulty": 3,
        "dlc": True,
        "gameClass": "Deprived",
        "gameClassVi": "Kẻ Cùng Khổ",
        "sl": 150,
        "stats": {
            "Vigor": 50,
            "Endurance": 30,
            "Vitality": 10,
            "Attunement": 4,
            "Strength": 50,
            "Dexterity": 10,
            "Adaptability": 30,
            "Intelligence": 3,
            "Faith": 6
        },
        "phases": [
            {
                "name": "Early Game — Soup Time",
                "nameVi": "Đầu Game — Giờ Nấu Canh",
                "levels": "1–50",
                "areas": "Things Betwixt, Majula, Forest of Giants",
                "areasVi": "Things Betwixt, Majula, Forest of Giants",
                "steps": [
                    "Pick Deprived for the starting Ladle",
                    "The Ladle is your starter weapon. Embrace your destiny.",
                    "Level Strength to 30 and Vigor to 20",
                    "Two-hand the Ladle — you need every bit of damage",
                    "Upgrade the Ladle to +3 immediately",
                    "The Ladle has a sweeping R1 — great for crowds if it did damage"
                ],
                "stepsVi": [
                    "Chọn Deprived cho Ladle khởi đầu",
                    "Ladle là vũ khí của bạn. Chấp nhận số phận.",
                    "Tăng Strength lên 30 và Vigor lên 20",
                    "Cầm hai tay Ladle",
                    "Nâng Ladle lên +3 ngay",
                    "Ladle có R1 quét — tốt cho đám đông nếu nó gây sát thương"
                ]
            },
            {
                "name": "Mid Game — The Ladle Awakens",
                "nameVi": "Giữa Game — Ladle Thức Tỉnh",
                "levels": "50–100",
                "areas": "Bastille, Iron Keep, Huntsman's Copse",
                "areasVi": "Bastille, Iron Keep, Huntsman's Copse",
                "steps": [
                    "Push Strength to 40 and Vigor to 30",
                    "Infuse the Ladle with Lightning — yes, you can infuse a Ladle",
                    "Upgrade to +10 Ladle",
                    "Equip the Ring of Blades for flat damage",
                    "Use Gold Pine Resin for extra damage",
                    "Your Ladle now does... 80 damage per swing. Incredible."
                ],
                "stepsVi": [
                    "Đẩy Strength lên 40 và Vigor lên 30",
                    "Gắn Lightning cho Ladle",
                    "Nâng lên +10 Ladle",
                    "Trang bị Ring of Blades",
                    "Dùng Gold Pine Resin",
                    "Ladle của bạn bây giờ... 80 sát thương mỗi đòn. Không thể tin được."
                ]
            },
            {
                "name": "Late Game — Ladle Legend",
                "nameVi": "Cuối Game — Huyền Thoại Ladle",
                "levels": "100–150",
                "areas": "Drangleic Castle, DLC, Undead Crypt",
                "areasVi": "Drangleic Castle, DLC, Undead Crypt",
                "steps": [
                    "Max Strength at 50",
                    "Max Ladle to +10 Lightning",
                    "Equip Flynn's Ring for +50 AR at low equip load",
                    "Equip the Old Leo Ring for counter damage (it has a thrust attack!)",
                    "Powerstance TWO Ladles for double the cooking power",
                    "Defeat Sir Alonne with the Ladle. Assert dominance."
                ],
                "stepsVi": [
                    "Max Strength ở 50",
                    "Nâng Ladle lên +10 Lightning",
                    "Trang bị Flynn's Ring",
                    "Trang bị Old Leo Ring",
                    "Powerstance HAI LADLES",
                    "Đánh bại Sir Alonne bằng Ladle. Khẳng định ưu thế."
                ]
            }
        ],
        "affinities": [
            {
                "name": "Lightning",
                "ar": 180,
                "scaling": "C Str",
                "verdict": "Best Ladle infusion. Yes, it says 'Best'. Relatively speaking.",
                "verdictVi": "Infusion Ladle tốt nhất. Tương đối thôi."
            },
            {
                "name": "Raw",
                "ar": 160,
                "scaling": "D Str",
                "verdict": "Better at very low levels but you're going to 50 Str anyway.",
                "verdictVi": "Tốt hơn ở cấp thấp."
            }
        ],
        "items": [
            {
                "name": "Ladle",
                "type": "Weapon",
                "location": "Starting weapon for Deprived class",
                "locationVi": "Vũ khí khởi đầu của Deprived"
            },
            {
                "name": "Ring of Blades +2",
                "type": "Ring",
                "location": "NG+ Pursuer",
                "locationVi": "NG+ Pursuer"
            },
            {
                "name": "Flynn's Ring",
                "type": "Ring",
                "location": "Sunken King DLC, Sanctum City",
                "locationVi": "Sunken King DLC"
            },
            {
                "name": "Old Leo Ring",
                "type": "Ring",
                "location": "NG+ Old Dragonslayer",
                "locationVi": "NG+ Old Dragonslayer"
            },
            {
                "name": "Chloranthy Ring +2",
                "type": "Ring",
                "location": "NG+ The Rotten",
                "locationVi": "NG+ The Rotten"
            }
        ],
        "tips": [
            "The Ladle has a hidden bonus: it does 50% more damage to Slimes. You'll need that.",
            "Powerstance two Ladles for the ultimate cooking experience",
            "The R2 thrust can combo with the Leo Ring for counter damage",
            "Ladle's running attack is actually decent for a utensil",
            "If you beat the entire game with a Ladle, you are legally allowed to never cook again"
        ],
        "tipsVi": [
            "Ladle có bonus ẩn: 50% sát thương với Slimes. Bạn sẽ cần đó.",
            "Powerstance hai Ladles cho trải nghiệm nấu ăn tối thượng",
            "R2 m có thể kết hợp Leo Ring",
            "Chạy tấn công của Ladle khá ổn cho một cái muôi",
            "Nếu bạn beat game với Ladle, bạn không bao giờ phải nấu ăn nữa"
        ]
    },
    {
        "slug": "bowmaster",
        "name": "Bowmaster",
        "nameVi": "Cung Thủ",
        "description": "Only bows. No melee weapons at all. Dark Souls 2 has the best bow mechanics in the series with actual aiming, ammo types, and viable damage. Become a true ranger.",
        "descriptionVi": "Chỉ dùng cung. Không vũ khí cận chiến. DS2 có cơ chế cung tốt nhất series với ngắm bắn thực sự, nhiều loại tên, và sát thương khả thi.",
        "category": "meme",
        "difficulty": 2,
        "dlc": True,
        "gameClass": "Swordsman",
        "gameClassVi": "Kiếm Sĩ",
        "sl": 150,
        "stats": {
            "Vigor": 30,
            "Endurance": 25,
            "Vitality": 10,
            "Attunement": 10,
            "Strength": 12,
            "Dexterity": 60,
            "Adaptability": 24,
            "Intelligence": 3,
            "Faith": 6
        },
        "phases": [
            {
                "name": "Early Game — Basic Archery",
                "nameVi": "Đầu Game — Cung Cơ Bản",
                "levels": "1–50",
                "areas": "Forest of Giants, Heides Tower",
                "areasVi": "Forest of Giants, Heides Tower",
                "steps": [
                    "Pick Swordsman for high starting Dexterity",
                    "Buy the Short Bow from Leningrast in Majula",
                    "Buy Wooden Arrows — stock up on as many as you can carry",
                    "Level Dexterity to 30 and Vigor to 15",
                    "Get the Stone Ring for extra poise damage on arrows",
                    "Headshot enemies for extra damage — bows have actual aiming in DS2"
                ],
                "stepsVi": [
                    "Chọn Swordsman cho Dexterity cao",
                    "Mua Short Bow từ Leningrast",
                    "Mua Wooden Arrows",
                    "Tăng Dexterity lên 30 và Vigor lên 15",
                    "Lấy Stone Ring",
                    "Bắn đầu cho sát thương thêm"
                ]
            },
            {
                "name": "Mid Game — Sniper",
                "nameVi": "Giữa Game — Bắn Tỉa",
                "levels": "50–100",
                "areas": "Huntsman's Copse, Iron Keep, Shaded Woods",
                "areasVi": "Huntsman's Copse, Iron Keep, Shaded Woods",
                "steps": [
                    "Push Dexterity to 40",
                    "Get the Hunter's Blackbow from Drangleic Castle",
                    "Upgrade Blackbow to +10 and infuse with Lightning",
                    "Buy Iron Arrows and Lightning Arrows for different enemy types",
                    "Equip the Ring of Blades and Old Leo Ring",
                    "Learn to manual-aim — it's more accurate than lock-on"
                ],
                "stepsVi": [
                    "Đẩy Dexterity lên 40",
                    "Lấy Hunter's Blackbow từ Drangleic Castle",
                    "Nâng Blackbow lên +10",
                    "Mua Iron Arrows và Lightning Arrows",
                    "Trang bị Ring of Blades và Old Leo Ring",
                    "Học ngắm tay — chính xác hơn lock-on"
                ]
            },
            {
                "name": "Late Game + DLC — Legolas Mode",
                "nameVi": "Cuối Game — Chế Độ Legolas",
                "levels": "100–150",
                "areas": "Drangleic Castle, Shrine of Amana, DLC",
                "areasVi": "Drangleic Castle, Shrine of Amana, DLC",
                "steps": [
                    "Push Dexterity to 60 for maximum bow scaling",
                    "Get the Bow of Want from Nashandra's soul",
                    "Equip Flynn's Ring for more damage",
                    "Use Magic Arrows, Fire Arrows, and Poison Arrows for status",
                    "Keep a Short Bow +10 for faster firing rate on mobile enemies",
                    "Bows in DS2 are actually viable for the entire game"
                ],
                "stepsVi": [
                    "Đẩy Dexterity lên 60",
                    "Lấy Bow of Want từ linh hồn Nashandra",
                    "Trang bị Flynn's Ring",
                    "Dùng Magic Arrows, Fire Arrows, Poison Arrows",
                    "Giữ Short Bow +10 cho tốc độ bắn nhanh hơn",
                    "Cung trong DS2 thực sự khả thi cho cả game"
                ]
            }
        ],
        "affinities": [
            {
                "name": "Lightning",
                "ar": 380,
                "scaling": "S Dex",
                "verdict": "Best for bows. S scaling with 60 Dexterity.",
                "verdictVi": "Tốt nhất cho cung. S scaling với 60 Dex."
            },
            {
                "name": "Magic",
                "ar": 360,
                "scaling": "S Dex",
                "verdict": "Good alternative for enemies weak to magic.",
                "verdictVi": "Tốt cho kẻ yếu phép."
            }
        ],
        "items": [
            {
                "name": "Hunter's Blackbow",
                "type": "Weapon",
                "location": "Drangleic Castle, in a chest near the central bonfire",
                "locationVi": "Drangleic Castle, trong rương"
            },
            {
                "name": "Bow of Want",
                "type": "Weapon",
                "location": "Traded with Weaponsmith Ornifex using Nashandra's soul",
                "locationVi": "Đổi từ linh hồn Nashandra"
            },
            {
                "name": "Ring of Blades +2",
                "type": "Ring",
                "location": "NG+ Pursuer",
                "locationVi": "NG+ Pursuer"
            },
            {
                "name": "Old Leo Ring",
                "type": "Ring",
                "location": "NG+ Old Dragonslayer",
                "locationVi": "NG+ Old Dragonslayer"
            },
            {
                "name": "Flynn's Ring",
                "type": "Ring",
                "location": "Sunken King DLC",
                "locationVi": "Sunken King DLC"
            },
            {
                "name": "Chloranthy Ring +2",
                "type": "Ring",
                "location": "NG+ The Rotten",
                "locationVi": "NG+ The Rotten"
            }
        ],
        "tips": [
            "DS2 bows have zoom aiming — use the binoculars for even more zoom",
            "Headshots deal 1.5x damage in DS2 — aim for the head",
            "Poison Arrows + Hunter's Blackbow = safe damage over time on any boss",
            "You can carry multiple bow types for different situations",
            "The Bow of Want has the highest damage but slower fire rate than the Blackbow"
        ],
        "tipsVi": [
            "Cung DS2 có zoom — dùng binoculars để zoom thêm",
            "Bắn đầu 1.5x sát thương",
            "Poison Arrows + Hunter's Blackbow = sát thương an toàn theo thời gian",
            "Có thể mang nhiều cung cho các tình huống khác nhau",
            "Bow of Want sát thương cao nhất nhưng tốc độ chậm hơn Blackbow"
        ]
    },
    {
        "slug": "poison-master",
        "name": "Poison Master",
        "nameVi": "Bậc Thầy Độc",
        "description": "Only poison. Poison-infused weapons, poison arrows, poison mist, poison throwing knives. Watch the world rot while you dance around untouched. The ultimate attrition build.",
        "descriptionVi": "Chỉ dùng độc. Vũ khí độc, tên độc, sương độc, phi tiêu độc. Nhìn thế giới thối rữa trong khi bạn nhảy múa không chạm.",
        "category": "meme",
        "difficulty": 2,
        "dlc": True,
        "gameClass": "Bandit",
        "gameClassVi": "Kẻ Cướp",
        "sl": 150,
        "stats": {
            "Vigor": 30,
            "Endurance": 25,
            "Vitality": 10,
            "Attunement": 10,
            "Strength": 12,
            "Dexterity": 50,
            "Adaptability": 24,
            "Intelligence": 3,
            "Faith": 6
        },
        "phases": [
            {
                "name": "Early Game — Toxic Start",
                "nameVi": "Đầu Game — Khởi Đầu Độc",
                "levels": "1–50",
                "areas": "Forest of Giants, Heides Tower",
                "areasVi": "Forest of Giants, Heides Tower",
                "steps": [
                    "Pick Bandit for high Dexterity",
                    "Buy Rotten Pine Resin from Melentia for temporary poison weapons",
                    "Buy two daggers from Lonesome Gavlan",
                    "Level Dexterity to 25 and Vigor to 15",
                    "Get the Poisonbite Ring for immunity",
                    "Farm poison beetles in Forest of Giants for Poison Stones"
                ],
                "stepsVi": [
                    "Chọn Bandit cho Dexterity cao",
                    "Mua Rotten Pine Resin từ Melentia",
                    "Mua hai dao găm từ Lonesome Gavlan",
                    "Tăng Dexterity lên 25 và Vigor lên 15",
                    "Lấy Poisonbite Ring",
                    "Farm bọ độc ở Forest of Giants"
                ]
            },
            {
                "name": "Mid Game — Epidemics",
                "nameVi": "Giữa Game — Dịch Bệnh",
                "levels": "50–100",
                "areas": "Harvest Valley, Earthen Peak, Iron Keep",
                "areasVi": "Harvest Valley, Earthen Peak, Iron Keep",
                "steps": [
                    "Push Dexterity to 35",
                    "Infuse both daggers with Poison for powerstance",
                    "Upgrade both to +10",
                    "Get the Sanctum Crossbow with Poison Bolts from the DLC",
                    "Equip the Crest of the Rat and Shadow Gauntlets",
                    "One L1 powerstance combo procs poison on any enemy"
                ],
                "stepsVi": [
                    "Đẩy Dexterity lên 35",
                    "Gắn Poison cho hai dao găm",
                    "Nâng cả hai lên +10",
                    "Lấy Sanctum Crossbow với Poison Bolts",
                    "Trang bị Crest of the Rat và Shadow Gauntlets",
                    "Một L1 powerstance kích hoạt độc cho mọi kẻ địch"
                ]
            },
            {
                "name": "Late Game — Plague Doctor",
                "nameVi": "Cuối Game — Bác Sĩ Dịch Hạch",
                "levels": "100–150",
                "areas": "Drangleic Castle, Shrine of Amana, DLC",
                "areasVi": "Drangleic Castle, Shrine of Amana, DLC",
                "steps": [
                    "Push Dexterity to 50 for max scaling",
                    "Use Poison Mist for AoE poison application",
                    "Powerstance two Poison-infused curved swords",
                    "The L1-L2 combo procs poison instantly",
                    "Once poisoned, back off and let the damage tick",
                    "Even DLC bosses are not immune to poison (but some are)"
                ],
                "stepsVi": [
                    "Đẩy Dexterity lên 50",
                    "Dùng Poison Mist",
                    "Powerstance hai kiếm cong độc",
                    "L1-L2 kích hoạt độc ngay lập tức",
                    "Khi bị độc, lùi lại và để sát thương chảy",
                    "Ngay cả boss DLC cũng không miễn nhiễm độc"
                ]
            }
        ],
        "affinities": [
            {
                "name": "Poison",
                "ar": 320,
                "scaling": "B Dex",
                "verdict": "The only choice. You are a poison build.",
                "verdictVi": "Lựa chọn duy nhất. Bạn là build độc."
            }
        ],
        "items": [
            {
                "name": "Poison Dagger x2",
                "type": "Weapon",
                "location": "Infuse any dagger with Poison Stone",
                "locationVi": "Gắn Poison cho dao găm"
            },
            {
                "name": "Sanctum Crossbow",
                "type": "Weapon",
                "location": "Sunken King DLC, Sanctum City",
                "locationVi": "Sunken King DLC"
            },
            {
                "name": "Crest of the Rat",
                "type": "Ring",
                "location": "Rat King covenant rank 1 reward",
                "locationVi": "Phần thưởng Rat King"
            },
            {
                "name": "Shadow Gauntlets",
                "type": "Armor",
                "location": "Manikin drop in Earthen Peak",
                "locationVi": "Manikin rơi ở Earthen Peak"
            },
            {
                "name": "Rat Ring",
                "type": "Ring",
                "location": "Rat King covenant rank 2 reward",
                "locationVi": "Phần thưởng Rat King"
            },
            {
                "name": "Poisonbite Ring +1",
                "type": "Ring",
                "location": "NG+ Mytha or Bonfire Ascetic",
                "locationVi": "NG+ Mytha"
            }
        ],
        "tips": [
            "Poison in DS2 deals 1000 total damage — enough to win the attrition war",
            "The Rat Ring extends poison duration by 50%",
            "You can proc poison on most bosses in 2-3 powerstance L1 combos",
            "Keep a backup Lightning weapon for enemies immune to poison",
            "Sanctum Crossbow Poison Bolts poison in 2-3 hits from range"
        ],
        "tipsVi": [
            "Độc trong DS2 gây 1000 sát thương tổng — đủ thắng chiến tranh tiêu hao",
            "Rat Ring kéo dài thời gian độc 50%",
            "Có thể kích hoạt độc trên hầu hết boss trong 2-3 L1",
            "Giữ vũ khí Lightning dự phòng cho kẻ miễn nhiễm",
            "Sanctum Crossbow Poison Bolts kích hoạt độc trong 2-3 đòn"
        ]
    }
]

def add_builds(file_name, new_builds):
    path = os.path.join(DATA_DIR, file_name)
    with open(path, 'r', encoding='utf-8') as f:
        data = json.load(f)

    existing = data['builds']
    existing.extend(new_builds)

    with open(path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=4, ensure_ascii=False)
    print(f"Added {len(new_builds)} builds to {file_name}")

add_builds("elden-ring.json", elden_ring_memes)
add_builds("dark-souls-3.json", ds3_memes)
add_builds("dark-souls-1.json", ds1_memes)
add_builds("dark-souls-2.json", ds2_memes)

print("\nDone! All meme builds added successfully.")
print(f"ER: {len(elden_ring_memes)} builds")
print(f"DS3: {len(ds3_memes)} builds")
print(f"DS1: {len(ds1_memes)} builds")
print(f"DS2: {len(ds2_memes)} builds")
print(f"Total: {len(elden_ring_memes) + len(ds3_memes) + len(ds1_memes) + len(ds2_memes)} builds")
