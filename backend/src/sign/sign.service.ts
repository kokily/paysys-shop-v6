import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wedding } from '../weddings/entities/wedding.entity';

@Injectable()
export class SignService {
  constructor(
    @InjectRepository(Wedding)
    private readonly weddingRepository: Repository<Wedding>,
  ) {}

  async addSign(weddingId: string, sex: 'husband' | 'bride', image: string): Promise<void> {
    const wedding = await this.weddingRepository.findOne({ where: { id: weddingId } });
    if (!wedding) {
      throw new NotFoundException('존재하지 않는 웨딩입니다.');
    }
    if (sex === 'husband') {
      await this.weddingRepository.update({ id: weddingId }, { husband_image: image });
    } else {
      await this.weddingRepository.update({ id: weddingId }, { bride_image: image });
    }
  }

  async removeSign(weddingId: string): Promise<void> {
    const wedding = await this.weddingRepository.findOne({ where: { id: weddingId } });
    if (!wedding) {
      throw new NotFoundException('존재하지 않는 웨딩입니다.');
    }
    await this.weddingRepository.update({ id: weddingId }, { husband_image: '', bride_image: '' });
  }
} 