import {
  Injectable,
  BadRequestException,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AvatarItemType, AvatarItemRarity } from '@prisma/client';

@Injectable()
export class AvatarService implements OnModuleInit {
  constructor(private prisma: PrismaService) {}

  async onModuleInit() {
    await this.seedDefaultItems();
  }

  async getAllItems() {
    return this.prisma.avatarItem.findMany();
  }

  async getUserAvatar(userId: string) {
    const avatar = await this.prisma.userAvatar.findUnique({
      where: { userId },
      include: {
        skinItem: true,
        faceItem: true,
        hairItem: true,
        outfitItem: true,
        accessoryItem: true,
        backgroundItem: true,
      },
    });

    const unlockedItems = await this.prisma.unlockedAvatarItem.findMany({
      where: { userId },
      include: { item: true },
    });

    return {
      equipped: avatar,
      unlocked: unlockedItems.map((u) => u.item),
    };
  }

  async updateAvatar(
    userId: string,
    data: {
      skinColor?: string;
      skinItemId?: string;
      faceItemId?: string;
      hairItemId?: string;
      outfitItemId?: string;
      accessoryItemId?: string;
      backgroundItemId?: string;
    },
  ) {
    // Verify ownership of items if they are provided
    const itemIds = [
      data.skinItemId,
      data.faceItemId,
      data.hairItemId,
      data.outfitItemId,
      data.accessoryItemId,
      data.backgroundItemId,
    ].filter(Boolean) as string[];

    if (itemIds.length > 0) {
      const unlockedCount = await this.prisma.unlockedAvatarItem.count({
        where: {
          userId,
          itemId: { in: itemIds },
        },
      });

      if (unlockedCount !== itemIds.length) {
        throw new BadRequestException(
          'You do not own one or more of these items',
        );
      }
    }

    return this.prisma.userAvatar.upsert({
      where: { userId },
      create: {
        userId,
        ...data,
      },
      update: {
        ...data,
      },
      include: {
        skinItem: true,
        faceItem: true,
        hairItem: true,
        outfitItem: true,
        accessoryItem: true,
        backgroundItem: true,
      },
    });
  }

  async buyItem(userId: string, itemId: string) {
    const item = await this.prisma.avatarItem.findUnique({
      where: { id: itemId },
    });

    if (!item) {
      throw new NotFoundException('Item not found');
    }

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Check if already owned
    const owned = await this.prisma.unlockedAvatarItem.findUnique({
      where: {
        userId_itemId: {
          userId,
          itemId,
        },
      },
    });

    if (owned) {
      throw new BadRequestException('You already own this item');
    }

    if (user.gems < item.price) {
      throw new BadRequestException('Not enough gems');
    }

    // Transaction: deduct gems, add item
    return this.prisma.$transaction([
      this.prisma.user.update({
        where: { id: userId },
        data: { gems: { decrement: item.price } },
      }),
      this.prisma.unlockedAvatarItem.create({
        data: {
          userId,
          itemId,
        },
      }),
    ]);
  }

  // Helper to seed initial items if empty
  async seedDefaultItems() {
    const count = await this.prisma.avatarItem.count();
    if (count > 0) return;

    const items = [
      // Skins
      {
        type: AvatarItemType.SKIN,
        name: 'Default Skin',
        assetUrl: 'skin_default',
        price: 0,
        rarity: AvatarItemRarity.COMMON,
      },
      {
        type: AvatarItemType.SKIN,
        name: 'Tan Skin',
        assetUrl: 'skin_tan',
        price: 100,
        rarity: AvatarItemRarity.COMMON,
      },

      // Faces
      {
        type: AvatarItemType.FACE,
        name: 'Smile',
        assetUrl: 'face_smile',
        price: 0,
        rarity: AvatarItemRarity.COMMON,
      },
      {
        type: AvatarItemType.FACE,
        name: 'Cool',
        assetUrl: 'face_cool',
        price: 200,
        rarity: AvatarItemRarity.RARE,
      },

      // Hair
      {
        type: AvatarItemType.HAIR,
        name: 'Messy',
        assetUrl: 'hair_messy',
        price: 0,
        rarity: AvatarItemRarity.COMMON,
      },
      {
        type: AvatarItemType.HAIR,
        name: 'Punk',
        assetUrl: 'hair_punk',
        price: 300,
        rarity: AvatarItemRarity.RARE,
      },

      // Outfits
      {
        type: AvatarItemType.OUTFIT,
        name: 'T-Shirt',
        assetUrl: 'outfit_tshirt',
        price: 0,
        rarity: AvatarItemRarity.COMMON,
      },
      {
        type: AvatarItemType.OUTFIT,
        name: 'Hoodie',
        assetUrl: 'outfit_hoodie',
        price: 400,
        rarity: AvatarItemRarity.EPIC,
      },

      // Accessories
      {
        type: AvatarItemType.ACCESSORY,
        name: 'None',
        assetUrl: '',
        price: 0,
        rarity: AvatarItemRarity.COMMON,
      },
      {
        type: AvatarItemType.ACCESSORY,
        name: 'Glasses',
        assetUrl: 'acc_glasses',
        price: 150,
        rarity: AvatarItemRarity.COMMON,
      },

      // Backgrounds
      {
        type: AvatarItemType.BACKGROUND,
        name: 'White',
        assetUrl: 'bg_white',
        price: 0,
        rarity: AvatarItemRarity.COMMON,
      },
      {
        type: AvatarItemType.BACKGROUND,
        name: 'Space',
        assetUrl: 'bg_space',
        price: 1000,
        rarity: AvatarItemRarity.LEGENDARY,
      },
    ];

    for (const item of items) {
      await this.prisma.avatarItem.create({ data: item });
    }
  }
}
