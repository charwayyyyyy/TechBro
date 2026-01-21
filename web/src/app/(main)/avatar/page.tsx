"use client";

import { useEffect, useState } from "react";
import { useUserStore, AvatarItem } from "@/store/use-user-store";
import { fetchClient } from "@/lib/api";
import { UserAvatar } from "@/components/user-avatar";
import { ArrowLeft, Check } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const CATEGORIES = [
  { id: 'SKIN', label: 'Body', icon: '🎨' },
  { id: 'FACE', label: 'Face', icon: '🙂' },
  { id: 'HAIR', label: 'Hair', icon: '💇' },
  { id: 'OUTFIT', label: 'Outfit', icon: '👕' },
  { id: 'ACCESSORY', label: 'Gear', icon: '👓' },
  { id: 'BACKGROUND', label: 'Bg', icon: '🖼️' },
];

export default function AvatarPage() {
  const { avatar, setAvatar, gems, setUser } = useUserStore();
  const [items, setItems] = useState<AvatarItem[]>([]);
  const [unlockedIds, setUnlockedIds] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState('SKIN');
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [allItems, userAvatarData] = await Promise.all([
          fetchClient("/avatar/items"),
          fetchClient("/avatar/me"),
        ]);

        setItems(allItems);
        setUnlockedIds(userAvatarData.unlocked.map((u: AvatarItem) => u.id));
        
        // Sync store with backend avatar state
        if (userAvatarData.equipped) {
          setAvatar({
            skinColor: userAvatarData.equipped.skinColor,
            skinItem: userAvatarData.equipped.skinItem,
            faceItem: userAvatarData.equipped.faceItem,
            hairItem: userAvatarData.equipped.hairItem,
            outfitItem: userAvatarData.equipped.outfitItem,
            accessoryItem: userAvatarData.equipped.accessoryItem,
            backgroundItem: userAvatarData.equipped.backgroundItem,
          });
        }
      } catch (err) {
        console.error("Failed to load avatar data", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [setAvatar]);

  const handleEquip = async (item: AvatarItem) => {
    // If it's a skin color (not item), we handle it differently, but for now we only have items in DB for skins?
    // Wait, the schema has skinColor string AND skinItem relation.
    // My seed data has SKIN items. 
    
    // Optimistic update
    const typeKeyMap: Record<string, string> = {
      'SKIN': 'skinItemId',
      'FACE': 'faceItemId',
      'HAIR': 'hairItemId',
      'OUTFIT': 'outfitItemId',
      'ACCESSORY': 'accessoryItemId',
      'BACKGROUND': 'backgroundItemId',
    };
    
    const storeKeyMap: Record<string, string> = {
      'SKIN': 'skinItem',
      'FACE': 'faceItem',
      'HAIR': 'hairItem',
      'OUTFIT': 'outfitItem',
      'ACCESSORY': 'accessoryItem',
      'BACKGROUND': 'backgroundItem',
    };

    const updateDto = { [typeKeyMap[item.type]]: item.id };
    
    try {
      setAvatar({ [storeKeyMap[item.type]]: item });
      await fetchClient("/avatar/me", {
        method: "PATCH",
        body: JSON.stringify(updateDto),
      });
    } catch (err) {
      console.error("Failed to equip", err);
      // Revert? (Complex without previous state, let's just reload or ignore for now)
    }
  };

  const handleBuy = async (item: AvatarItem) => {
    if (gems < item.price) {
      alert("Not enough gems!");
      return;
    }

    setPurchasing(item.id);
    try {
      await fetchClient(`/avatar/buy/${item.id}`, { method: "POST" });
      
      // Update local state
      setUnlockedIds([...unlockedIds, item.id]);
      setUser({ gems: gems - item.price }); // Update gems in store
      
      // Auto equip after buy
      handleEquip(item);
    } catch (err) {
      console.error("Failed to buy", err);
      alert("Failed to purchase item");
    } finally {
      setPurchasing(null);
    }
  };

  const filteredItems = items.filter(i => i.type === activeCategory);

  if (loading) return <div className="flex h-screen items-center justify-center bg-sky-50 text-sky-500">Loading...</div>;

  return (
    <div className="flex min-h-screen flex-col bg-sky-50 pb-24">
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur">
        <Link href="/profile" className="rounded-xl p-2 text-slate-400 hover:bg-slate-100">
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-lg font-bold text-slate-700">Customize Avatar</h1>
        <div className="flex items-center gap-1 rounded-xl bg-sky-100 px-3 py-1 text-sky-600">
          <span className="text-lg">💎</span>
          <span className="font-bold">{gems}</span>
        </div>
      </div>

      {/* Preview Area */}
      <div className="flex flex-col items-center justify-center bg-gradient-to-b from-white to-sky-50 py-8">
        <UserAvatar
          skinColor={avatar.skinColor}
          skinItem={avatar.skinItem}
          faceItem={avatar.faceItem}
          hairItem={avatar.hairItem}
          outfitItem={avatar.outfitItem}
          accessoryItem={avatar.accessoryItem}
          backgroundItem={avatar.backgroundItem}
          size="xl"
          className="shadow-xl"
        />
      </div>

      {/* Categories */}
      <div className="flex overflow-x-auto border-b border-slate-200 bg-white px-4 py-2 scrollbar-hide">
        <div className="flex gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold transition-all ${
                activeCategory === cat.id
                  ? "bg-sky-500 text-white shadow-md"
                  : "bg-slate-100 text-slate-500 hover:bg-slate-200"
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-2 gap-4 p-4 sm:grid-cols-3">
        {filteredItems.map((item) => {
          const isUnlocked = unlockedIds.includes(item.id) || item.price === 0;
          const isEquipped = 
            (item.type === 'SKIN' && avatar.skinItem?.id === item.id) ||
            (item.type === 'FACE' && avatar.faceItem?.id === item.id) ||
            (item.type === 'HAIR' && avatar.hairItem?.id === item.id) ||
            (item.type === 'OUTFIT' && avatar.outfitItem?.id === item.id) ||
            (item.type === 'ACCESSORY' && avatar.accessoryItem?.id === item.id) ||
            (item.type === 'BACKGROUND' && avatar.backgroundItem?.id === item.id);

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`relative flex flex-col items-center overflow-hidden rounded-2xl border-2 bg-white p-3 shadow-sm transition-all ${
                isEquipped ? "border-sky-500 ring-2 ring-sky-200" : "border-slate-200"
              }`}
              onClick={() => isUnlocked ? handleEquip(item) : handleBuy(item)}
            >
              {/* Rarity Badge */}
              {item.rarity !== 'COMMON' && (
                <div className={`absolute left-2 top-2 rounded px-1.5 py-0.5 text-[10px] font-bold text-white ${
                  item.rarity === 'RARE' ? 'bg-blue-400' :
                  item.rarity === 'EPIC' ? 'bg-purple-400' : 'bg-yellow-400'
                }`}>
                  {item.rarity}
                </div>
              )}

              <div className="mb-2 flex h-20 w-20 items-center justify-center rounded-xl bg-slate-50 text-4xl">
                {/* Mock Visual */}
                {item.type === 'SKIN' ? '🎨' :
                 item.type === 'FACE' ? (item.assetUrl.includes('smile') ? '😊' : '😎') :
                 item.type === 'HAIR' ? (item.assetUrl.includes('messy') ? '🦱' : '🤘') :
                 item.type === 'OUTFIT' ? (item.assetUrl.includes('hoodie') ? '👕' : '👚') :
                 item.type === 'ACCESSORY' ? (item.assetUrl.includes('glasses') ? '👓' : '🚫') :
                 '🖼️'}
              </div>

              <div className="w-full text-center">
                <p className="mb-2 truncate text-xs font-bold text-slate-700">{item.name}</p>
                
                {isUnlocked ? (
                  <button 
                    disabled={isEquipped}
                    className={`w-full rounded-lg py-1.5 text-xs font-bold uppercase transition-all ${
                      isEquipped 
                        ? "bg-slate-100 text-slate-400" 
                        : "bg-sky-100 text-sky-600 hover:bg-sky-200"
                    }`}
                  >
                    {isEquipped ? <span className="flex items-center justify-center gap-1"><Check className="h-3 w-3" /> Equipped</span> : "Equip"}
                  </button>
                ) : (
                  <button 
                    disabled={purchasing === item.id || gems < item.price}
                    className={`flex w-full items-center justify-center gap-1 rounded-lg py-1.5 text-xs font-bold uppercase text-white transition-all ${
                      gems >= item.price ? "bg-sky-500 hover:bg-sky-600 shadow-[0_2px_0_0_#0ea5e9]" : "bg-slate-300 cursor-not-allowed"
                    }`}
                  >
                    {purchasing === item.id ? (
                      <span className="animate-pulse">...</span>
                    ) : (
                      <>
                        <span className="text-sm">💎</span> {item.price}
                      </>
                    )}
                  </button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
