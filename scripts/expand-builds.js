const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');
const FILES = [
  'elden-ring.json', 'dark-souls-1.json', 'dark-souls-2.json',
  'dark-souls-3.json', 'bloodborne.json', 'cyberpunk-2077.json'
];

// ─── Expansion content generators ───

const gameContexts = {
  'elden-ring': {
    earlyAreas: ['Limgrave', 'Weeping Peninsula', 'Stormhill', 'Liurnia of the Lakes'],
    midAreas: ['Caelid', 'Altus Plateau', 'Mt. Gelmir', 'Nokron'],
    lateAreas: ['Mountaintops of the Giants', 'Crumbling Farum Azula', 'Miquella\'s Haligtree', 'Realm of Shadow'],
    merchants: ['Twin Maiden Husks', 'Merchant Kale', 'Nomadic Merchant', 'Sorceress Sellen', 'Miriel Pastor of Vows'],
    upgradeMats: ['Smithing Stone [1-3]', 'Somber Smithing Stone [1-3]', 'Glovewort [1-3]'],
    tears: ['Crimson Seed Talisman', 'Cerulean Seed Talisman', 'Green Turtle Talisman']
  },
  'dark-souls-1': {
    earlyAreas: ['Undead Burg', 'Undead Parish', 'Darkroot Garden', 'The Depths', 'Blighttown'],
    midAreas: ['Sen\'s Fortress', 'Anor Londo', 'Demon Ruins', 'Catacombs', 'New Londo Ruins'],
    lateAreas: ['Duke\'s Archives', 'Tomb of the Giants', 'Kiln of the First Flame', 'Oolacile Township'],
    merchants: ['Undead Merchant', 'Andre of Astora', 'Blacksmith Giant', 'Shiva of the East'],
    upgradeMats: ['Titanite Shard', 'Large Titanite', 'Green Titanite', 'White Titanite', 'Blue Titanite'],
    rings: ['Ring of Favor and Protection', 'Havel\'s Ring', 'Dark Wood Grain Ring', 'Wolf Ring']
  },
  'dark-souls-2': {
    earlyAreas: ['Things Betwixt', 'Majula', 'Forest of Fallen Giants', 'Heide\'s Tower of Flame', 'No Man\'s Wharf'],
    midAreas: ['Lost Bastille', 'Huntsman\'s Copse', 'Iron Keep', 'Shaded Woods', 'Sinner\'s Rise'],
    lateAreas: ['Drangleic Castle', 'Shrine of Amana', 'Undead Crypt', 'Dragon Shrine', 'DLC areas'],
    merchants: ['Melentia', 'Leningrast', 'Carhillion of the Fold', 'Straid of Olaphis', 'Felkin the Outcast'],
    upgradeMats: ['Titanite Shard', 'Large Titanite', 'Chunk', 'Slab', 'Twinkling Titanite'],
    rings: ['Ring of Blades', 'Chloranthy Ring', 'Third Dragon Ring', 'Stone Ring', 'Old Leo Ring']
  },
  'dark-souls-3': {
    earlyAreas: ['High Wall of Lothric', 'Undead Settlement', 'Crucifixion Woods', 'Farron Keep', 'Cathedral of the Deep'],
    midAreas: ['Catacombs of Carthus', 'Irithyll of the Boreal Valley', 'Anor Londo', 'Profaned Capital'],
    lateAreas: ['Lothric Castle', 'Archdragon Peak', 'Grand Archives', 'The Ringed City', 'Dreg Heap'],
    merchants: ['Shrine Handmaid', 'Greirat of the Undead Settlement', 'Orbeck of Vinheim', 'Cornyx of the Great Swamp'],
    upgradeMats: ['Titanite Shard', 'Large Titanite', 'Chunk', 'Slab', 'Twinkling Titanite'],
    rings: ['Ring of Favor +3', 'Prisoner\'s Chain', 'Havel\'s Ring +3', 'Chloranthy Ring +3']
  },
  'bloodborne': {
    earlyAreas: ['Central Yharnam', 'Cathedral Ward', 'Old Yharnam', 'Hemwick Charnel Lane'],
    midAreas: ['Forbidden Woods', 'Byrgenwerth', 'Cainhurst Castle', 'Yahargul Unseen Village'],
    lateAreas: ['Nightmare of Mensis', 'Nightmare Frontier', 'Hunter\'s Nightmare', 'Fishing Hamlet', 'Chalice Dungeons'],
    merchants: ['Bath Messengers', 'Summoning Bell', 'Hunter\'s Dream'],
    upgradeMats: ['Blood Stone Shard', 'Twin Blood Stone Shard', 'Chunk', 'Blood Rock', 'Blood Gem'],
    runes: ['Clockwise Metamorphosis', 'Anti-Clockwise Metamorphosis', 'Blood Rapture', 'Oedon Writhe', 'Clawmark']
  },
  'cyberpunk-2077': {
    earlyAreas: ['Watson', 'Westbrook', 'Heywood'],
    midAreas: ['Santo Domingo', 'Badlands', 'Pacifica'],
    lateAreas: ['City Center', 'Dogtown', 'The Glen'],
    merchants: ['Ripperdoc (Watson)', 'Weapon Vendor', 'Clothing Vendor', 'Netrunner Vendor'],
    upgradeMats: ['Common Components', 'Uncommon Components', 'Rare Components', 'Epic Components', 'Legendary Components'],
    cyberware: ['Sandevistan', 'Berserk', 'Cyberdeck', 'Optical Camo', 'Kerenzikov']
  }
};

function getGameKey(fileName) {
  return fileName.replace('.json', '');
}

function generateExpandedDescription(build, gameKey) {
  const name = build.name || build.slug;
  const cat = build.category || 'pve';
  const diff = build.difficulty || 2;
  const isMeme = cat === 'meme';
  const isPvP = cat === 'pvp';
  const hasDLC = build.dlc;
  const stats = build.stats || {};
  const statsDesc = Object.entries(stats)
    .filter(([k, v]) => ['Vigor', 'Mind', 'Endurance', 'Strength', 'Dexterity', 'Intelligence', 'Faith', 'Arcane', 'Bloodtinge', 'Skill'].includes(k))
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([k, v]) => `${k} ${v}`)
    .join(', ');
  const mainItem = build.items && build.items[0] ? build.items[0].name : build.name;

  let difficultyText = ['Trivial', 'Easy', 'Moderate', 'Challenging', 'Very Hard'][diff] || 'Moderate';

  let paragraphs = [];

  // Paragraph 1: Detailed overview
  let origFirst = build.description.replace(/^[Aa]\s+/, '').split('.')[0].toLowerCase();
  const needsArticle = !origFirst.startsWith('a ') && !origFirst.startsWith('an ');
  const article = needsArticle ? (origFirst.match(/^[aeiou]/) ? 'an ' : 'a ') : '';
  const overview = `${name} is ${article}${origFirst}. Designed around high ${statsDesc}, this build achieves a ${difficultyText.toLowerCase()} difficulty level that ${diff <= 1 ? 'welcomes newcomers while satisfying veterans' : diff === 2 ? 'rewards game knowledge and mechanical skill' : 'demands mastery of game mechanics and precise execution'}.${hasDLC ? ' The build fully utilizes DLC content, incorporating endgame weapons, spells, and talismans that significantly elevate its performance.' : ''}`;
  paragraphs.push(overview);

  // Paragraph 2: Playstyle
  let playstyle = '';
  if (isMeme) {
    playstyle = `This is a meme build through and through — prioritizing style, humor, and sheer entertainment over raw efficiency. The ${mainItem} is the centerpiece of this comedic playthrough, with mechanics that are more about spectacle than optimization. While you won't top damage charts, you'll have an unforgettable experience trolling invaders, surprising co-op partners, and enjoying the game from a completely different perspective. The true power of this build lies in its ability to make you laugh.`;
  } else if (isPvP) {
    playstyle = `In PvP combat, ${name} excels at controlling engagement distance and punishing opponent mistakes. The ${mainItem} provides exceptional pressure tools, while the stat distribution ensures you can survive trades and capitalize on openings. Success requires mastering spacing, roll-catching, and mix-ups — this is not a spam-friendly build but a calculated dueling machine. In invasions, the build's versatility lets you handle multiple opponents through positioning and crowd control.`;
  } else {
    playstyle = `In PvE, ${name} handles every challenge with confidence. Boss fights become a dance of positioning and timing as you leverage the ${mainItem}'s unique properties. Regular enemies and area traversal feel smooth thanks to the balanced stat investment — you have enough damage to clear trash efficiently and enough Vigor to survive surprises. The build prioritizes sustainable damage output through its primary stat while maintaining the defensive stats needed to learn new boss patterns without frustration.`;
  }
  paragraphs.push(playstyle);

  // Paragraph 3: Strengths and weaknesses
  const strengths = `The core strength of ${name} is its ${diff <= 1 ? 'accessibility and consistent performance' : diff === 2 ? 'versatility and damage potential when optimized' : 'raw power potential and devastating payoff for skilled play'}. Key items like ${mainItem} are ${diff <= 1 ? 'obtained early in the game' : 'acquired through mid-game progression or specific questlines'}, allowing the build to come online at a reasonable point. The primary weakness is ${diff >= 3 ? 'the high skill floor — mistakes are severely punished and stat management is unforgiving' : isMeme ? 'its comedic focus — some encounters will be harder than necessary due to the weapon choice' : 'occasional reliance on specific items or buffs — maintaining uptime requires attention'}. Players should ${diff <= 1 ? 'experiment with different weapons of the same class to find their preferred moveset' : 'practice the core combos regularly to build muscle memory'}.`;
  paragraphs.push(strengths);

  // Paragraph 4: Ideal audience
  let audience = '';
  if (diff <= 1) {
    audience = `Designed with newer players in mind, ${name} is straightforward to assemble and play effectively from the start. Item locations are accessible early, and the playstyle doesn't demand complex input sequences or frame-perfect timing. Veterans will appreciate the raw efficiency — this build deletes content without requiring excessive setup or consumable management. Whether this is your first playthrough or your tenth, you'll find satisfaction in the consistent, reliable performance this build delivers across all content.`;
  } else if (diff === 2) {
    audience = `${name} is ideal for players who have completed at least one playthrough and want to explore a different approach to combat. It rewards game knowledge — knowing where key items are, which bosses to tackle in order, and how to optimize your route makes a significant difference. While the core build functions with basic items, reaching its full potential requires exploring optional areas, completing specific NPC questlines, and understanding soft cap breakpoints for efficient leveling.`;
  } else {
    audience = `This build is crafted for veteran players who understand the game's mechanics on a deep level. It demands precise knowledge of stat breakpoints, item locations, and combat timing. The payoff for mastery is immense — ${name} ranks among the most powerful setups when played optimally. Every aspect of the build, from the ${statsDesc} stat distribution to the ${mainItem} weapon choice, is optimized for a specific purpose. This is not a build to learn the game with but one to master it with.`;
  }
  paragraphs.push(audience);

  return paragraphs.join('\n\n');
}

function generateExpandedSteps(build, gameKey, phaseIndex) {
  const ctx = gameContexts[gameKey] || gameContexts['elden-ring'];
  const name = build.slug;
  const stats = build.stats || {};
  const statKeys = Object.keys(stats);
  const hasArcane = statKeys.some(k => k.toLowerCase() === 'arcane');
  const hasFaith = statKeys.some(k => k.toLowerCase() === 'faith');
  const hasInt = statKeys.some(k => k.toLowerCase() === 'intelligence');
  const hasStr = statKeys.some(k => k.toLowerCase() === 'strength');
  const hasDex = statKeys.some(k => k.toLowerCase() === 'dexterity');
  const hasVigor = statKeys.some(k => k.toLowerCase() === 'vigor');
  const hasEnd = statKeys.some(k => k.toLowerCase() === 'endurance');

  const phaseNames = ['Early Game', 'Mid Game', 'Late Game'];

  if (phaseIndex === 0) {
    // Early Game: 12-15 steps about early progression, starter weapons, NPCs
    return expandStepsArray(build.steps || [], 15, 'early', build, ctx, statKeys);
  } else if (phaseIndex === 1) {
    // Mid Game: 12-15 steps about mid-game progression
    return expandStepsArray(build.steps || [], 15, 'mid', build, ctx, statKeys);
  } else {
    // Late Game: 12-15 steps about late-game
    return expandStepsArray(build.steps || [], 15, 'late', build, ctx, statKeys);
  }
}

function expandStepsArray(existingSteps, targetCount, phase, build, ctx, statKeys) {
  let expanded = [...existingSteps];

  const stats = build.stats || {};
  const hasInt = (stats.Intelligence || 0) >= 15;
  const hasFaith = (stats.Faith || 0) >= 15;
  const hasArcane = (stats.Arcane || 0) >= 15;
  const hasMagic = hasInt || hasFaith || hasArcane;
  const highestStat = Object.entries(stats).sort((a, b) => b[1] - a[1])[0];
  const statName = highestStat ? highestStat[0] : 'main stat';
  const statVal = highestStat ? highestStat[1] : 0;
  const softCapTarget = Math.min(statVal + 10, ['Intelligence', 'Faith', 'Arcane'].includes(statName) ? 80 : ['Strength', 'Dexterity'].includes(statName) ? 55 : 40);
  const mainItem = build.items && build.items[0] ? build.items[0].name : build.name;
  const cat = build.category || 'pve';
  const isPvP = cat === 'pvp';
  const hasDLC = build.dlc;

  const extraSteps = {
    'early': [
      `Prioritize leveling Vigor/Vitality to comfortable levels before investing heavily in damage stats — survival comes first in the early game, aim for 20 Vigor before focusing on ${statName}.`,
      `Explore ${ctx.earlyAreas.slice(0, 3).join(', ')} thoroughly. Each cave, catacomb, and ruin contains valuable upgrade materials, spells, and consumables crucial for progression.`,
      `Talk to every NPC you encounter — many offer questlines that reward essential items like ${mainItem} or key upgrade materials later. Never attack NPCs unless you know their drops.`,
      `Save Smithing Stones and upgrade materials for weapons you'll use long-term. Your starting ${build.gameClass || 'class'} weapon is adequate while you rush toward ${mainItem}.`,
      `Purchase a backup weapon from a merchant — having a Strike weapon for crystal/skeleton enemies and a Thrust weapon for armored foes covers all resistances.`,
      `Master your weapon's moveset in early areas. Practice spacing on basic soldiers, roll timing against large enemies, and learn which attacks have poise/hyper armor.`,
      `Summon NPC phantoms for tough early bosses if needed. Many games hide summon signs near boss fogs — the game expects you to use them.`,
      `Collect every flask upgrade item — Golden Seeds, Estus Shards, Sacred Tears. Each upgrade provides more value than several stat points for survival.`,
      `Revisit merchants after major story progression — they often stock new items, spells, or unlimited upgrade materials after key milestones.`,
      `Rush toward your build's defining weapon early. Run past enemies if necessary — the sooner you get ${build.items && build.items[0] ? build.items[0].name : 'your main weapon'}, the sooner your build comes online.`,
      `Kill every optional boss and mini-boss you encounter. They drop unique weapons, talismans, and valuable souls/runes for early leveling.`,
      `${hasMagic ? `Buy basic spells (Glintstone Pebble equivalent) from early vendors. Even weak spells are excellent for clearing trash packs and pulling enemies from safe range.` : `Stock up on throwing knives, arrows, or bolts for pulling individual enemies from groups — never fight fair against crowds.`}`,
      `Keep Endurance/Stamina at comfortable levels (15-20 early). An extra swing or roll often means the difference between winning and dying.`,
      `Experiment with Weapon Arts / Skills early. ${build.phases && build.phases[0] ? `The ${build.phases[0].steps[0] || 'starting class'} determines your early game approach.` : 'Each weapon has unique properties that may surprise you.'}`,
      `Check the Whetblade / Infusion item availability. Changing weapon affinity early lets you scale with your primary damage stat from the start.`
    ],
    'mid': [
      `Reach your weapon's stat requirements to unlock its full potential. ${statName} should be your primary focus, with secondary investment in supporting stats.`,
      `Complete NPC questlines tied to your build. Many reward ${mainItem}, powerful talismans, or unique spells. Check in with quest givers after each major boss.`,
      `Farm upgrade materials from specific mid-game enemies. ${ctx.midAreas[0]} and ${ctx.midAreas[1]} have excellent farming spots for Chunks and upgrade materials.`,
      `Consider respeccing if your stats are suboptimal. Most games offer respec items (Larval Tear, Soul Vessel) — use them to fine-tune your ${statName} investment.`,
      `Equip talismans/rings that synergize with your damage type. ${statName}-boosting talismans (Scorpion Charms, Clutch Rings, Firstborn Rings) provide significant multipliers.`,
      `Explore optional areas before pushing main story progression. ${ctx.midAreas[2]} and ${ctx.midAreas[3]} contain vital mid-game pickups for your build.`,
      `Join a covenant aligned with your playstyle. Many offer rewards like ${hasMagic ? 'spell slots, faster casting, or damage buffs' : 'bonus damage, HP regen, or unique weapons'} at rank milestones.`,
      `Invest in Mind/FP or Attunement if your build uses skills or spells. Running out of FP mid-fight is a common and preventable cause of death.`,
      `${hasMagic ? `Find the best catalyst/seal/staff for your build. ${build.slug.includes('faith') ? 'Canvas Talisman-style seals excel at miracle scaling while Dragon Communion favors Arcane.' : build.slug.includes('int') ? 'Courts Sorcerer Staff equivalents provide S-tier scaling for pure Intelligence builds.' : 'Dragon Communion Seal and Prince of Death\'s Staff provide hybrid scaling.'}` : `Infuse your weapon with ${highestStat ? highestStat[0] : 'your primary stat'} affinity. Heavy/Sharp/Quality inflections maximize AR at higher stat levels.`}`,
      `Practice your core combat loop against mid-game enemies. ${isPvP ? 'Practice roll-catching, spacing, and punishing whiffs — these skills define PvP success.' : 'Learn boss punish windows and optimal damage combos for your weapon class.'}`,
      `Collect respec items and keep them for emergencies. Having 2-3 respecs available lets you experiment with different stat distributions.`,
      `Target 35-40 Vigor/Vitality by mid-game. Weapon upgrade level contributes more to damage than raw stats at this stage — invest in survival first.`,
      `Maintain medium roll (under 70% equip load) at minimum. Fast roll (under 30%) is ideal for lighter builds. Defense and poise protect more than fashion.`,
      `Use consumables matching boss weaknesses. ${ctx.midAreas[1]} bosses are particularly vulnerable to specific damage types — prepare accordingly.`,
      `Stockpile crafting materials. Resins, spell buffs, and consumables for your damage type provide 15-30% DPS increases that scale with your upgrades.`
    ],
    'late': [
      `Push ${statName} to the soft cap for maximum damage scaling. ${['Intelligence', 'Faith', 'Arcane'].includes(statName) ? 'The 80 soft cap provides the best returns for spell scaling weapons.' : ['Strength', 'Dexterity'].includes(statName) ? 'The 55/55 split for Quality or 80 for pure physical provides optimal AR.' : '40 is the standard soft cap for survivability stats.'}`,
      `Max your primary weapon to the highest upgrade level. Every level at high stat investment provides significant AR increases — check for Somber/Regular upgrade paths.`,
      `Farm the best talismans/rings/gems from endgame areas. ${ctx.lateAreas[0]} and ${ctx.lateAreas[1]} contain S-tier upgrades that transform your build's power.`,
      `${hasDLC ? `Complete the DLC content before the final boss. DLC areas contain some of the game's best weapons, talismans, and spells — including direct upgrades for ${mainItem}.` : `Clear optional endgame areas for their unique rewards. Hidden bosses drop some of the best items in the base game.`}`,
      `Stack multiplicative damage bonuses. ${statName} Scorpion Charm, Clutch Ring, or covenant rings combined with skill damage talismans provide exponential returns.`,
      `${hasMagic ? 'Use Terra Magicus / Steady Chant / Magic-boosting physick before boss doors. Buffing before entering maximizes your burst damage windows.' : 'Apply weapon buffs matching boss weaknesses. Fire Paper for beasts, Lightning for dragons, Magic for heavily armored foes.'}`,
      `Learn endgame boss patterns through repetition. ${ctx.lateAreas[2]} and ${ctx.lateAreas[3]} bosses have complex mix-ups — patience during first attempts pays off.`,
      `Optimize flask allocation per boss. Hard-hitting bosses demand more healing flasks, while spell-heavy builds should prioritize FP flasks for sustained damage.`,
      `Customize your Physick/Wondrous Elixir for each fight. ${statName}-boosting tears combined with damage-negation tears cover offense and defense simultaneously.`,
      `${hasInt || hasFaith ? `Attune a diverse spell loadout. Ranged projectiles for approach, AoE for crowds, buffs for bosses, and utility spells for exploration cover all scenarios.` : `Carry backup weapons with different damage types. A Strike weapon, a Standard weapon, and an elemental option handle any resistance profile.`}`,
      `Upgrade a secondary weapon to +9/+24 minimum. Status-infused backup weapons (Bleed, Frost, Poison) or different movesets give options against resistant bosses.`,
      `Aim for poise breakpoints if your build supports it. 51+ poise in Elden Ring, 40+ in DS3, or max poise in DS1 lets you trade through enemy attacks.`,
      `Equip the strongest defensive talisman available. Dragoncrest Greatshield / Steel Protection +3 provides 20% physical damage reduction — a massive effective HP boost.`,
      `${isPvP ? `Stay at the meta level for active matchmaking (SL 125 for ER, SL 120 for DS3, BL 120 for Bloodborne). Going higher reduces your available PvP population significantly.` : `Test your build against optional superbosses before the final encounter. If you can handle the hardest optional boss, the final boss is manageable.`}`,
      `Record your damage numbers before and after optimization. Understanding the difference between 60% optimization and 95% optimization helps prioritize remaining upgrades.`
    ]
  };

  // Mix existing with extra, preserving existing order at the top
  const pool = extraSteps[phase] || extraSteps['late'];
  while (expanded.length < targetCount && pool.length > 0) {
    const randIdx = expanded.length % pool.length;
    const candidate = pool[randIdx];
    if (!expanded.includes(candidate) && !expanded.some(e => e.substring(0, 30) === candidate.substring(0, 30))) {
      expanded.push(candidate);
    } else {
      // Try another index
      let found = false;
      for (let i = 0; i < pool.length; i++) {
        const alt = pool[(randIdx + i) % pool.length];
        if (!expanded.some(e => e.substring(0, 30) === alt.substring(0, 30))) {
          expanded.push(alt);
          found = true;
          break;
        }
      }
      if (!found) break;
    }
  }

  return expanded.slice(0, targetCount);
}

function isMage(build) {
  const s = build.stats || {};
  return (s.Intelligence || 0) >= 30 || (s.Faith || 0) >= 30;
}

function generateExpandedTips(build, gameKey) {
  const existing = build.tips || [];
  let finalTips = [...existing];

  const stats = build.stats || {};
  const hasBleed = existing.some(t => t.toLowerCase().includes('bleed'));
  const hasFrost = existing.some(t => t.toLowerCase().includes('frost'));
  const hasMagic = ['Intelligence', 'Faith', 'Arcane'].some(s => (stats[s] || 0) >= 25);
  const isPureStr = (stats.Strength || 0) >= 40 && (stats.Dexterity || 0) < 20;
  const isPureDex = (stats.Dexterity || 0) >= 40 && (stats.Strength || 0) < 20;
  const isQuality = (stats.Strength || 0) >= 30 && (stats.Dexterity || 0) >= 30;
  const isPvP = build.category === 'pvp';
  const isMeme = build.category === 'meme';
  const mainItem = build.items && build.items[0] ? build.items[0].name : build.name;

  const allTips = {
    'elden-ring': [
      `Stat soft caps in Elden Ring: Vigor 40/60, Endurance 50, Str/Dex 55, Int/Fth/Arc 50/80. Know these for efficient leveling of ${build.name}.`,
      `Jump attacks are king in Elden Ring — they deal massive stance damage and are safe against most attacks. ${mainItem} users should abuse jumping R2s.`,
      `Spirit Ash summons can completely change a boss fight. Mimic Tear is the best general-purpose option for ${build.name}.`,
      `Always carry a Strike weapon for crystal enemies and a Pierce weapon for heavily armored foes — ${mainItem} may not handle all resistances.`,
      `The Wondrous Physick can be customized for each boss. Swap tears based on the fight for maximum advantage with ${build.name}.`,
      `Guard counters (block + R2) are incredibly strong. They deal high stance damage and can break most enemies when using heavy weapons.`,
      `If you're struggling with a boss, try more Vigor, better talismans, or swapping to a different weapon. ${build.name} has flexibility in gear choices.`,
      `NPC invaders appear at specific locations — killing them rewards unique weapons, armor, and talismans useful for ${build.name}.`,
      `Don't neglect flask upgrades. Sacred Tears and Golden Seeds are scattered throughout the Lands Between — find them all.`,
      `Multi-hit talismans (Rotten Winged Sword Insignia, Millicent's Prosthesis) stack multiplicatively with each other and work well with fast weapons.`,
      `Status effects (bleed, frost, poison) are strong but some bosses are immune. ${hasBleed || hasFrost ? `${build.name} should carry a backup weapon for immune bosses.` : 'Plan accordingly for resistant enemies.'}`,
      `Great Runes provide significant stat boosts. Equip Godrick's or Radahn's Great Rune and use a Rune Arc for tough fights.`,
      `${isPureStr ? 'Charge attacks with colossal weapons deal the highest poise damage in the game — abuse them with the Two-Handed Sword Talisman from the DLC.' : ''}`,
      `${isPureDex ? 'Dexterity increases casting speed slightly and improves fall damage reduction. At 70 Dex your spell casting is noticeably faster.' : ''}`,
      `${isQuality ? 'Quality affinity at 55/55 Str/Dex provides the widest weapon variety. You can effectively use almost every weapon in the game.' : ''}`,
    ],
    'dark-souls-1': [
      'The soft cap for most stats in Dark Souls 1 is 40. Beyond that, returns diminish significantly — plan your SL accordingly.',
      `Always buy the Repair Box and Weapon Smithboxes from Andre early — you can repair and upgrade at any bonfire, keeping ${mainItem} in top shape.`,
      `Poise is king in DS1. Heavy armor or the Wolf Ring (40 poise) lets you trade hits effectively. ${isPureStr ? 'As a Strength build, you should aim for 61+ poise.' : ''}`,
      'Kindle every bonfire to 20 Estus. The Rite of Kindling from Pinwheel is essential for endgame survivability.',
      'Humanity boosts item discovery (soft humanity up to 10) and Chaos weapon damage (capped at 10).',
      'Pyromancy requires NO stat investment — just upgrade your Pyro Flame. Any build can benefit from Power Within.',
      `The Grass Crest Shield on your back provides stamina regen while two-handing ${mainItem}.`,
      'Parrying is easier in DS1 than any other Souls game. Practice on Silver Knights in Anor Londo for souls and easy farming.',
      `${isPvP ? 'The Giant Dad build is iconic for a reason — high poise, Chaos Zweihander, and the "Well, What Is It?" gesture define DS1 PvP.' : ''}`,
      `${isMeme ? 'Meme builds in DS1 are all about style. Embrace the limitations and focus on having fun with unique weapon choices.' : ''}`,
      'DLC bosses (Artorias, Manus, Kalameet) are much harder than base game — prepare with upgraded weapons and 20 Estus.',
      'The Cloranthy Ring is one of the best rings in the game for stamina management — pair with Grass Crest Shield for maximum regen.'
    ],
    'dark-souls-2': [
      `Level Adaptability until your Agility (AGL) reaches 105 — this gives you maximum iframes on rolls. For ${build.name}, this is non-negotiable.`,
      'Lifegems are cheap and stackable healing items. Always carry 99 for chipping damage recovery — they save Estus for emergencies.',
      'Enemy despawns after 12 kills in an area. Join Company of Champions to prevent despawns while farming titanite and equipment.',
      'Bonfire Ascetics respawn the area boss and all enemies at NG+ difficulty. Use them on the Rotten for easy souls and rare drops.',
      `Powerstance requires 1.5x the weapon's stat requirements. ${build.slug.includes('powerstance') ? 'This is your bread and butter — learn the L1 timing.' : 'Consider powerstancing two weapons of the same class for bonus damage.'}`,
      'The Stone Ring is essential for stagger — without it, lighter weapons bounce off heavily armored enemies in DLC areas.',
      'Brightbugs give 20% damage boost and 30% damage reduction for one attempt. Save them for DLC bosses and tough encounters.',
      'Skeptic\'s Spices reduce Faith requirements and Simpleton\'s Spices reduce Intelligence requirements for spells — stock up on both.',
      'The Ring of Life Protection preserves your souls and humanity on death — worth the ring slot in tough areas like Shrine of Amana.',
      `Each DLC has unique upgrade materials. Crown of the Sunken King provides Petrified Dragon Bones, while Iron King has Twinkling Titanite.`,
      `${isPureStr ? 'The Fume Ultra Greatsword has a unique blocking R2 — use it aggressively against tough enemies and bosses.' : ''}`,
      `${hasMagic ? 'Hexes in DS2 scale with the lower of Int and Fth. For hybrid casters, 30/30 Int/Fth is the sweet spot.' : ''}`
    ],
    'dark-souls-3': [
      'The first soft cap for most stats is 40, with a second soft cap at 60. 66 Strength is the two-handing cap (99 effective).',
      'Poise in DS3 only works during hyper armor frames of heavy weapons. Light weapons get no poise benefit — dress accordingly.',
      'The Prisoner\'s Chain gives 15 free levels (Vig/End/Vit) at 10% more damage taken — almost always worth it for early stat efficiency.',
      'Weapon Arts cost FP. Keep a Simple-infused Caestus or Dagger in offhand for passive FP regeneration between fights.',
      'Most bosses are weak to Strike damage and resistant to Standard. Adjust your weapon choice based on the boss you\'re facing.',
      `The Ring of Favor +3 and Havel's Ring +3 are found in the Ringed City DLC — essential for ${build.name}'s equip load management.`,
      'Champion Gundyr\'s Soul transposes into the Prisoner\'s Chain — rush this early for significant stat savings.',
      `${isPureDex ? 'Sharp infusion at 60+ Dex provides S-scaling on most weapons. The Sellsword Twinblades are the undisputed DPS king at this level.' : ''}`,
      `${isPureStr ? 'Heavy infusion at 66 Str provides S-scaling. The Greatsword and Fume Ultra Greatsword are top choices for pure Strength.' : ''}`,
      'Infusions: Sharp for Dex, Heavy for Str, Refined for Quality, Chaos/Dark for Int/Fth split, Crystal/Lightning for pure casters.',
      'DLC bosses (Demon Prince, Midir, Gael) are among the hardest in the series. Come with a +10 weapon and 15 Estus minimum.',
      `${isPvP ? 'PvP meta is SL 120-125. The arena is active in the Ringed City DLC, and Pontiff\'s backyard is the classic fight club spot.' : ''}`
    ],
    'bloodborne': [
      'The first soft cap for most stats is 25, the second is 50. Only level past 50 for specific weapons like the Kos Parasite.',
      'Visceral attacks scale with Skill. If you parry often, invest in Skill for massive riposte damage on bosses like Gascoigne.',
      'Blood Gems are the primary form of weapon upgrade beyond +10. Farm Cursed Cold Abyssal gems from Pthumeru Elder for best results.',
      `The Rally system lets you recover lost HP by attacking. ${build.name} benefits from aggressive play — never back off after trading hits.`,
      `Beast Blood Pellets provide massive damage at the cost of defense. Use them before ${mainItem}-equipped boss fights for maximum damage.`,
      'Fire Paper adds fire damage for beast enemies. Bolt Paper is for Kin (alien) enemies. Match your paper to the boss weakness.',
      'Chalice Dungeons contain unique bosses, weapons, and the best blood gems in the game. Depth 5 FRC dungeons are the endgame.',
      'The Hunter\'s Bone grants quickstep invincibility frames — essential for aggressive playstyles and dodging through attacks.',
      `Every weapon in Bloodborne is viable, but ${mainItem} has a unique moveset that rewards mastery. Practice its transform attacks.`,
      'Parrying with guns: shoot during the start-up of an enemy attack, not during the swing itself. The Blunderbuss has more parry frames.',
      'The Old Hunters DLC has the best weapons in the game. Access it after Vicar Amelia by speaking to the skull on the altar.',
      'Frenzy is the most dangerous status effect. Dress for Frenzy resistance against Winter Lanterns — Deep Sea Rune helps significantly.'
    ],
    'cyberpunk-2077': [
      'In 2.0+, Cyberware capacity is tied to your level and perk investments. Plan your cyberware loadout carefully around your build.',
      'The Relic perk tree (from Phantom Liberty) adds powerful new abilities. Max it out in Dogtown by finding Militech terminals.',
      'Technical Ability 20 gives you Edgerunner perk — 50 more cyberware capacity at the cost of health loss over cap. Worth it for most builds.',
      `Always craft the highest tier of items you can. Tier 5++ weapons and cyberware are endgame goals for ${build.name}.`,
      `${hasMagic ? 'Quickhacks can be crafted into higher tiers using components. Legendary quickhacks are massively stronger and spread through enemy networks.' : ''}`,
      'The Militech "Apogee" Sandevistan is the best operating system — 85% slow time with low cooldown. Essential for reflex-based builds.',
      'Smart weapons track enemies through walls when you have a smart link. Use Ping quickhack to find hidden enemies before engaging.',
      'Cyberpsycho encounters in 2.0+ scale to your level. Don\'t leave them for too late — they reward iconic cyberware and weapons.',
      'The Erebus iconic SMG from Phantom Liberty is one of the best weapons — don\'t miss it during the final mission choice.',
      'Armor is reworked in 2.0+. Focus on cyberware that gives armor rather than clothing mods. Subdermal Armor is a must-have.',
      'Gigs and side jobs offer iconic weapons as rewards. Complete them all for unique gear that can define your build.',
      `The "Relic" perk tree includes abilities like the Monowire finisher, the Canto cyberdeck with Blackwall Gateway, and enhanced dash. Essential for ${build.slug.includes('netrunner') ? 'netrunner' : build.slug.includes('blade') ? 'blade' : 'combat'} builds.`
    ]
  };

  const gameTips = allTips[gameKey] || allTips['elden-ring'];

  // Add build-specific tips first
  const buildTips = [];
  if (isPvP && gameKey === 'dark-souls-1') {
    buildTips.push('Giant Dad is the iconic DS1 PvP build. The goal is intimidation — high poise, Chaos Zweihander, and the "Well, What Is It?" gesture are your true weapons.');
  }
  if (isMeme) {
    buildTips.push(`Meme builds like ${build.name} are about having fun. Don't worry about optimization — enjoy the unique playstyle and surprise factor.`);
  }

  // Interleave build tips with game tips
  for (const tip of buildTips) {
    if (!finalTips.some(t => t.includes(tip.substring(0, 20)))) {
      finalTips.push(tip);
    }
  }

  // Add game-specific tips
  for (const tip of gameTips) {
    if (!finalTips.some(t => t.toLowerCase().includes(tip.substring(0, 30).toLowerCase()))) {
      finalTips.push(tip);
    }
    if (finalTips.length >= 12) break;
  }

  return finalTips.slice(0, 12);
}

function generateExpandedItems(build, gameKey) {
  const existing = build.items || [];
  let newItems = [...existing];

  const stats = build.stats || {};
  const hasInt = (stats.Intelligence || 0) >= 20;
  const hasFaith = (stats.Faith || 0) >= 20;
  const hasArcane = (stats.Arcane || 0) >= 20;
  const isMage = hasInt || hasFaith || hasArcane;

  const extraItems = {
    'elden-ring': [
      { name: 'Erdtree\'s Favor +2', type: 'Talisman', location: 'Leyndell, Royal Capital, in a chest near the Erdtree Sanctuary', locationVi: 'Leyndell, trong rương gần Erdtree Sanctuary' },
      { name: 'Crimson Amber Medallion +2', type: 'Talisman', location: 'Leyndell Royal Capital, in a chest in the Fortified Manor', locationVi: 'Leyndell, trong rương ở Fortified Manor' },
      { name: 'Green Turtle Talisman', type: 'Talisman', location: 'Limgrave Summonwater Village catacombs', locationVi: 'Limgrave Summonwater Village' },
      { name: 'Dragoncrest Greatshield Talisman', type: 'Talisman', location: 'Elphael Brace of the Haligtree, on a corpse near the Prayer Room', locationVi: 'Elphael, Brace of the Haligtree' },
      { name: 'Radagon\'s Soreseal', type: 'Talisman', location: 'Fort Faroth in Caelid, on a corpse on the roof', locationVi: 'Fort Faroth ở Caelid' },
      { name: isMage ? 'Magic Scorpion Charm' : 'Fire Scorpion Charm', type: 'Talisman', location: isMage ? 'Seluvis\'s Rise in Liurnia' : 'Mt. Gelmir sub-boss arena', locationVi: isMage ? 'Seluvis\'s Rise ở Liurnia' : 'Mt. Gelmir' },
      { name: 'Shard of Alexander', type: 'Talisman', location: 'Alexander the Iron Fist quest reward', locationVi: 'Phần thưởng nhiệm vụ Alexander' },
      { name: 'Starscourge Heirloom', type: 'Talisman', location: 'Caelid, Fort Gael, on a corpse on the roof', locationVi: 'Caelid, Fort Gael' }
    ],
    'dark-souls-1': [
      { name: 'Grass Crest Shield', type: 'Armor', location: 'Darkroot Basin behind the Black Knight', locationVi: 'Darkroot Basin sau Black Knight' },
      { name: 'Cloranthy Ring', type: 'Ring', location: 'Great Swamp, dropped by the mushroom enemies', locationVi: 'Great Swamp' },
      { name: 'Wolf Ring', type: 'Ring', location: 'Darkroot Garden behind the sealed door (Crest of Artorias)', locationVi: 'Darkroot Garden sau cửa niêm phong' },
      { name: 'Mask of the Child', type: 'Armor', location: 'Dropped by Pinwheel in Catacombs', locationVi: 'Rơi từ Pinwheel ở Catacombs' },
      { name: 'Bellowing Dragoncrest Ring', type: 'Ring', location: 'Purchased from Griggs after rescuing him', locationVi: 'Mua từ Griggs sau khi giải cứu' },
      { name: 'Ring of Favor and Protection', type: 'Ring', location: 'Undead Parish, behind the giant rat in the aqueduct', locationVi: 'Undead Parish, sau chuột khổng lồ' },
      { name: isMage ? 'Crown of Dusk' : 'Mask of the Father', type: 'Armor', location: isMage ? 'Darkroot Basin from golden golem' : 'Dropped by Pinwheel', locationVi: isMage ? 'Darkroot Basin' : 'Rơi từ Pinwheel' }
    ],
    'dark-souls-2': [
      { name: 'Chloranthy Ring +1', type: 'Ring', location: 'Shaded Woods, on a corpse near the bonfire', locationVi: 'Shaded Woods gần bonfire' },
      { name: 'Ring of Life Protection', type: 'Ring', location: 'Purchased from Felkin the Outcast', locationVi: 'Mua từ Felkin the Outcast' },
      { name: 'Stone Ring', type: 'Ring', location: 'Dropped by the Ogre in Things Betwixt', locationVi: 'Rơi từ Ogre ở Things Betwixt' },
      { name: 'Royal Soldier\'s Ring', type: 'Ring', location: 'Drangleic Castle near the central bonfire', locationVi: 'Drangleic Castle' },
      { name: 'Southern Ritual Band +2', type: 'Ring', location: 'NG+ The Rotten or Bonfire Ascetic', locationVi: 'NG+ The Rotten' },
      { name: 'Third Dragon Ring', type: 'Ring', location: 'Shrine of Winter, on a corpse near the entrance', locationVi: 'Shrine of Winter' },
      { name: isMage ? 'Clear Bluestone Ring +2' : 'Ring of Blades +2', type: 'Ring', location: 'NG+ Najka or Bonfire Ascetic', locationVi: 'NG+ Najka' }
    ],
    'dark-souls-3': [
      { name: 'Chloranthy Ring +3', type: 'Ring', location: 'Ringed City DLC near the Shared Grave bonfire', locationVi: 'Ringed City DLC' },
      { name: 'Leo Ring', type: 'Ring', location: 'Anor Londo, dropped by Ornstein\'s sentinel', locationVi: 'Anor Londo' },
      { name: 'Knight\'s Ring', type: 'Ring', location: 'Undead Settlement near the giant tower', locationVi: 'Undead Settlement' },
      { name: 'Hunter\'s Ring', type: 'Ring', location: 'Irithyll of the Boreal Valley, behind an illusory wall', locationVi: 'Irithyll' },
      { name: 'Prisoner\'s Chain', type: 'Ring', location: 'Transposed from Champion Gundyr\'s soul', locationVi: 'Transposed từ Champion Gundyr' },
      { name: isMage ? 'Bellowing Dragoncrest Ring' : 'Ring of Favor +3', type: 'Ring', location: isMage ? 'Irithyll behind illusory wall' : 'Ringed City DLC', locationVi: isMage ? 'Irithyll' : 'Ringed City DLC' },
      { name: 'Sun\'s Firstborn Ring', type: 'Ring', location: 'Irithyll near Church of Yorshka', locationVi: 'Irithyll gần Church of Yorshka' }
    ],
    'bloodborne': [
      { name: 'Clockwise Metamorphosis Rune', type: 'Rune', location: 'Nightmare Frontier on a corpse near the poison lake', locationVi: 'Nightmare Frontier' },
      { name: 'Anti-Clockwise Metamorphosis Rune', type: 'Rune', location: 'Forbidden Woods on a corpse near the snake area', locationVi: 'Forbidden Woods' },
      { name: 'Blood Rapture Rune', type: 'Rune', location: 'Cainhurst Castle, dropped by the gargoyle enemies', locationVi: 'Cainhurst Castle' },
      { name: 'Oedon Writhe Rune', type: 'Rune', location: 'Cathedral Ward, obtained from the NPC Alfred questline', locationVi: 'Cathedral Ward' },
      { name: 'Formless Oedon Rune', type: 'Rune', location: 'Forbidden Woods in a cave near the poison swamp', locationVi: 'Forbidden Woods' },
      { name: 'Clawmark Rune', type: 'Rune', location: 'Hunter\'s Nightmare from the Beast Hunter enemies', locationVi: 'Hunter\'s Nightmare' },
      { name: 'Great Lake Rune', type: 'Rune', location: 'Nightmare Frontier on a corpse near the Amygdala', locationVi: 'Nightmare Frontier' }
    ],
    'cyberpunk-2077': [
      { name: 'Militech "Apogee" Sandevistan', type: 'Cyberware', location: 'Dogtown ripperdoc, requires high Street Cred', locationVi: 'Ripperdoc ở Dogtown' },
      { name: 'QL-3 Tattooed Necklace', type: 'Armor', location: 'Weapon vendor in Dogtown, legendary clothing mod', locationVi: 'Weapon vendor ở Dogtown' },
      { name: 'Canto Mk.6 Cyberdeck', type: 'Cyberware', location: 'Phantom Liberty DLC from the Black Sapphire quest', locationVi: 'Phantom Liberty DLC' },
      { name: 'Erebus SMG', type: 'Weapon', location: 'Phantom Liberty DLC, crafted from schematics in the final mission', locationVi: 'Phantom Liberty DLC' },
      { name: 'Adrenaline Booster', type: 'Cyberware', location: 'Any high-tier ripperdoc, requires 15 Body', locationVi: 'Ripperdoc cao cấp, yêu cầu 15 Body' },
      { name: 'Microgenerator', type: 'Cyberware', location: 'Ripperdoc in Watson, early game option', locationVi: 'Ripperdoc ở Watson' },
      { name: 'Synaptic Accelerator', type: 'Cyberware', location: 'Ripperdoc in City Center, high tier', locationVi: 'Ripperdoc ở City Center' }
    ]
  };

  const additions = extraItems[gameKey] || extraItems['elden-ring'];
  for (const item of additions) {
    if (!newItems.some(i => i.name === item.name)) {
      newItems.push(item);
    }
    if (newItems.length >= 10) break;
  }

  return newItems.slice(0, 10);
}

// ─── Main processing ───

function processFile(filePath) {
  const gameKey = getGameKey(path.basename(filePath));
  const raw = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(raw);

  let totalStepsBefore = 0;
  let totalStepsAfter = 0;
  let totalTipsBefore = 0;
  let totalTipsAfter = 0;
  let totalItemsBefore = 0;
  let totalItemsAfter = 0;
  let descLengthBefore = 0;
  let descLengthAfter = 0;

  for (const build of data.builds) {
    // Track before stats
    descLengthBefore += (build.description || '').length;
    totalTipsBefore += (build.tips || []).length;
    totalItemsBefore += (build.items || []).length;
    for (const phase of (build.phases || [])) {
      totalStepsBefore += (phase.steps || []).length;
    }

    // 1. Expand description
    build.description = generateExpandedDescription(build, gameKey);

    // 2. Expand phases
    for (let i = 0; i < build.phases.length; i++) {
      const newSteps = generateExpandedSteps(build, gameKey, i);
      build.phases[i].steps = newSteps;
    }

    // 3. Expand tips
    build.tips = generateExpandedTips(build, gameKey);

    // 4. Expand items
    build.items = generateExpandedItems(build, gameKey);

    // Track after stats
    descLengthAfter += (build.description || '').length;
    totalTipsAfter += (build.tips || []).length;
    totalItemsAfter += (build.items || []).length;
    for (const phase of (build.phases || [])) {
      totalStepsAfter += (phase.steps || []).length;
    }
  }

  // Write back
  fs.writeFileSync(filePath, JSON.stringify(data, null, 4), 'utf8');

  const buildCount = data.builds.length;
  return {
    file: path.basename(filePath),
    buildCount,
    avgStepsBefore: Math.round(totalStepsBefore / buildCount),
    avgStepsAfter: Math.round(totalStepsAfter / buildCount),
    avgTipsBefore: Math.round(totalTipsBefore / buildCount),
    avgTipsAfter: Math.round(totalTipsAfter / buildCount),
    avgItemsBefore: Math.round(totalItemsBefore / buildCount),
    avgItemsAfter: Math.round(totalItemsAfter / buildCount),
    avgDescBefore: Math.round(descLengthBefore / buildCount),
    avgDescAfter: Math.round(descLengthAfter / buildCount)
  };
}

// ─── Run ───

let totalBuilds = 0;
let allResults = [];

for (const file of FILES) {
  const filePath = path.join(DATA_DIR, file);
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    continue;
  }
  console.log(`Processing ${file}...`);
  const result = processFile(filePath);
  allResults.push(result);
  totalBuilds += result.buildCount;
}

console.log('\n─── Expansion Complete ───');
console.log(`Total builds processed: ${totalBuilds}`);
console.log('');
console.log('File                 | Builds | Steps/before | Steps/after | Tips/before | Tips/after | Items/before | Items/after | Desc/before | Desc/after');
console.log('─'.repeat(150));
for (const r of allResults) {
  console.log(
    `${r.file.padEnd(20)} | ${String(r.buildCount).padStart(5)}  | ${String(r.avgStepsBefore).padStart(11)}  | ${String(r.avgStepsAfter).padStart(11)}  | ${String(r.avgTipsBefore).padStart(10)}  | ${String(r.avgTipsAfter).padStart(10)}  | ${String(r.avgItemsBefore).padStart(11)}  | ${String(r.avgItemsAfter).padStart(11)}  | ${String(r.avgDescBefore).padStart(10)}  | ${String(r.avgDescAfter).padStart(10)}`
  );
}

console.log('\nDone! All files expanded and saved.');
