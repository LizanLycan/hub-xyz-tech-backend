import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import Moralis from 'moralis';
import { AddTokenInputDto, TokenType, UserTokenDto } from './token.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class TokenService {
  constructor(private prismaService: PrismaService) {
    Moralis.start({
      apiKey: process.env.MORALIS_API_KEY,
      logLevel: 'verbose',
    });
  }

  async findTokens(term: string) {
    if (ethers.isAddress(term)) {
      const tokens = Promise.all([
        Moralis.EvmApi.nft.getContractNFTs({
          chain: Moralis.EvmUtils.EvmChain.ETHEREUM,
          format: 'decimal',
          limit: 10,
          mediaItems: true,
          address: term,
        }),
        Moralis.EvmApi.token.getTokenMetadata({
          chain: Moralis.EvmUtils.EvmChain.ETHEREUM,
          addresses: [term],
        }),
      ]);

      const res = await tokens;

      return [
        ...res[0].toJSON().result.map((nft) => ({
          address: nft.token_address,
          name: nft.name,
          symbol: nft.symbol,
          logo:
            nft.media?.media_collection?.medium.url ??
            nft.media?.original_media_url ??
            '',
          tokenId: nft.token_id,
          type: 'nft',
        })),
        ...res[1]
          .toJSON()
          .filter((token) => !!token.logo && !!token.symbol)
          .slice(0, 10)
          .map((token) => ({
            address: token.address,
            name: token.name,
            symbol: token.symbol,
            logo: token.logo,
            tokenId: '0',
            type: 'token',
          })),
      ];
    } else {
      const res = await Moralis.EvmApi.token.getTokenMetadataBySymbol({
        chain: Moralis.EvmUtils.EvmChain.ETHEREUM,
        symbols: [term],
      });

      return res
        .toJSON()
        .slice(0, 10)
        .map((token) => ({
          address: token.address,
          name: token.name,
          symbol: token.symbol,
          logo: token.logo,
          tokenId: '0',
          type: 'token',
        }));
    }
  }

  async addTokensToUser(user: string, tokens: AddTokenInputDto[]) {
    const fetchedUser = await this.prismaService.user.findUnique({
      where: { id: user },
    });

    if (!fetchedUser) {
      throw new Error('User not found');
    }

    const promises = Promise.all(
      tokens.map(async (token) => {
        const fetchedToken = await this.prismaService.token.findFirst({
          where: {
            address: token.address.toLocaleLowerCase(),
            tokenId: token.tokenId,
          },
        });

        if (fetchedToken) {
          return await this.prismaService.token.update({
            where: { id: fetchedToken.id },
            data: { bookmarked: token.bookmarked },
          });
        }

        await this.prismaService.token.create({
          data: {
            address: token.address.toLocaleLowerCase(),
            tokenId: token.tokenId,
            bookmarked: token.bookmarked,
            type: token.type,
            name: token.name,
            symbol: token.symbol,
            logo: token.logo,
            user: { connect: { id: user } },
          },
        });
      }),
    );

    return promises;
  }

  async getTokensByUser(
    user: string,
    type: TokenType,
  ): Promise<UserTokenDto[]> {
    const result = await this.prismaService.token.findMany({
      orderBy: [
        {
          bookmarked: 'desc',
        },
        {
          name: 'desc',
        },
      ],
      where: { userId: user, type },
    });

    const promises = Promise.all(
      result.map(async (token) => {
        if (type === 'nft') {
          let nftPrice: Record<string, unknown> | null = null;

          try {
            const _nftPrice = await Moralis.EvmApi.nft.getNFTLowestPrice({
              chain: Moralis.EvmUtils.EvmChain.ETHEREUM,
              address: token.address,
            });

            nftPrice = _nftPrice.toJSON();
          } catch (error) {
            nftPrice = null;
          }

          return {
            ...token,
            price: nftPrice
              ? `${(nftPrice as unknown as { price_formatted: string }).price_formatted} ${(nftPrice as unknown as { token_symbol: string }).token_symbol}`
              : '0.00 ETH',
          };
        }

        let tokenPrice: Record<string, unknown> | null = null;

        try {
          const _tokenPrice = await Moralis.EvmApi.token.getTokenPrice({
            chain: Moralis.EvmUtils.EvmChain.ETHEREUM,
            include: 'percent_change',
            address: token.address,
          });

          tokenPrice = _tokenPrice.toJSON();
        } catch (error) {
          tokenPrice = null;
        }

        return {
          ...token,
          price: tokenPrice ? tokenPrice.usdPriceFormatted : '0.00',
        };
      }),
    );

    return promises;
  }
}
