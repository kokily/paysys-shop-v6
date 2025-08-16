import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Wedding } from "src/entities/wedding.entity";
import { Repository } from "typeorm";
import { AddSignDto, RemoveSignDto } from "./dto/sign.dto";

@Injectable()
export class SignService {
  constructor(
    @InjectRepository(Wedding)
    private weddingRepository: Repository<Wedding>,
  ) {}

  async addSign(addSignDto: AddSignDto) {
    const { weddingId, sex, image } = addSignDto;

    if (sex === 'husband') {
      await this.weddingRepository.update({
        id: weddingId,
      }, {
        husband_image: image,
      });
    } else {
      await this.weddingRepository.update({
        id: weddingId,
      }, {
        bride_image: image,
      });
    }

    return {
      message: '서명 이미지가 추가되었습니다.',
    };
  }

  async removeSign(removeSignDto: RemoveSignDto) {
    const { weddingId } = removeSignDto;

    await this.weddingRepository.update({
      id: weddingId,
    }, {
      husband_image: '',
      bride_image: '',
    });
  }
}