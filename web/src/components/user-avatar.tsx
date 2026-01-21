import { motion } from "framer-motion";

type AvatarProps = {
  skinColor: string;
  skinItem?: { assetUrl: string } | null;
  faceItem?: { assetUrl: string } | null;
  hairItem?: { assetUrl: string } | null;
  outfitItem?: { assetUrl: string } | null;
  accessoryItem?: { assetUrl: string } | null;
  backgroundItem?: { assetUrl: string } | null;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
};

export function UserAvatar({
  skinColor,
  skinItem,
  faceItem,
  hairItem,
  outfitItem,
  accessoryItem,
  backgroundItem,
  size = "md",
  className = "",
}: AvatarProps) {
  const sizeClasses = {
    sm: "h-10 w-10 text-xs",
    md: "h-20 w-20 text-sm",
    lg: "h-32 w-32 text-base",
    xl: "h-48 w-48 text-lg",
  };

  // Mock assets mapping for now since we don't have real images
  const getAssetContent = (type: string, url?: string) => {
    if (!url) return null;
    // Simple emoji mapping for demo
    if (url.includes("face_smile")) return "😊";
    if (url.includes("face_cool")) return "😎";
    if (url.includes("hair_messy")) return "🦱";
    if (url.includes("hair_punk")) return "🤘";
    if (url.includes("outfit_hoodie")) return "👕";
    if (url.includes("acc_glasses")) return "👓";
    return null;
  };

  return (
    <div
      className={`relative flex items-center justify-center rounded-full border-4 border-white bg-slate-100 shadow-md ${sizeClasses[size]} ${className}`}
      style={{ 
        backgroundColor: backgroundItem ? '#1e293b' : skinColor, // If background item exists, use dark bg, else skin color (simplification)
        // In reality, skinColor applies to the body, background to the container.
      }}
    >
      {/* Background Layer */}
      {backgroundItem && (
        <div className="absolute inset-0 overflow-hidden rounded-full">
            {backgroundItem.assetUrl.includes('space') && <div className="h-full w-full bg-slate-900 opacity-80">✨</div>}
        </div>
      )}

      {/* Body/Skin Layer (Base) */}
      <div 
        className="absolute inset-2 rounded-full"
        style={{ backgroundColor: skinColor }}
      />

      {/* Outfit Layer */}
      {outfitItem && (
        <div className="absolute bottom-0 text-4xl z-10">
           {getAssetContent('outfit', outfitItem.assetUrl)}
        </div>
      )}

      {/* Face Layer */}
      <div className="absolute z-20 text-4xl">
        {faceItem ? getAssetContent('face', faceItem.assetUrl) : "🙂"}
      </div>

      {/* Hair Layer */}
      {hairItem && (
        <div className="absolute -top-2 z-30 text-4xl">
           {getAssetContent('hair', hairItem.assetUrl)}
        </div>
      )}

      {/* Accessory Layer */}
      {accessoryItem && (
        <div className="absolute z-40 text-4xl">
           {getAssetContent('accessory', accessoryItem.assetUrl)}
        </div>
      )}
    </div>
  );
}
