import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Wedding } from 'src/entities/wedding.entity';
import { Repository } from 'typeorm';
import { AddSignDto } from './dto/add-sign.dto';
import { RemoveSignDto } from './dto/remove-sign.dto';

@Injectable()
export class SignService {
  constructor(
    @InjectRepository(Wedding)
    private weddingRepository: Repository<Wedding>
  ) {}

  /**
   * 서명 정보 생성
   * @param addSignDto 서명 생성 데이터
   * @returns 응답 성공
   */
  async addSign(addSignDto: AddSignDto): Promise<{ message: string }> {
    const { weddingId, sex, image } = addSignDto;

    if (sex === 'husband') {
      await this.weddingRepository.update(
        {
          id: weddingId,
        },
        {
          husband_image: image,
        }
      );
    } else {
      await this.weddingRepository.update(
        {
          id: weddingId,
        },
        {
          bride_image: image,
        }
      );
    }

    return {
      message: '서명이 추가되었습니다.',
    };
  }

  /**
   * 서명 정보 삭제
   * @param weddingId 웨딩 ID
   * @param sex 성별
   * @returns 삭제 성공 응답
   */
  async removeSign(removeSignDto: RemoveSignDto): Promise<{ message: string }> {
    const { weddingId, sex } = removeSignDto;

    if (sex === 'husband') {
      await this.weddingRepository.update(
        {
          id: weddingId,
        },
        {
          husband_image: '',
        }
      );
    } else {
      await this.weddingRepository.update(
        {
          id: weddingId,
        },
        {
          bride_image: '',
        }
      );
    }

    return {
      message: `${sex === 'husband' ? '신랑' : '신부'} 서명이 삭제되었습니다.`,
    };
  }
}
