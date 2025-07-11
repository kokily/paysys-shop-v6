import { ApiPropertyOptional } from '@nestjs/swagger';

/**
 * 품목 목록 조회 쿼리 DTO
 * 
 * @description
 * 품목 목록을 조회할 때 사용하는 쿼리 파라미터들을 정의합니다.
 * 모든 필드는 선택사항이며, 전달된 조건에 따라 필터링이 적용됩니다.
 * 
 * @example
 * // 기본 조회
 * GET /api/items
 * 
 * // 식사 종류로 필터링
 * GET /api/items?divide=식사(중식)
 * 
 * // 여러 조건으로 필터링
 * GET /api/items?divide=식사(중식)&native=회원&name=김치찌개
 * 
 * // 페이징 포함
 * GET /api/items?cursor=last-item-id
 */
export class ItemListQueryDto {
  /**
   * 식사 종류 필터
   * 
   * @description
   * 품목의 식사 종류로 필터링합니다.
   * 예: '식사(중식)', '식사(양식)', '식사(일식)', '음료', '디저트' 등
   * 
   * @example "식사(중식)"
   */
  @ApiPropertyOptional({ 
    description: '식사 종류',
    example: '식사(중식)'
  })
  divide?: string;

  /**
   * 회원 등급 필터
   * 
   * @description
   * 품목의 회원 등급으로 필터링합니다.
   * 예: '회원', '준회원', '일반'
   * 
   * @example "회원"
   */
  @ApiPropertyOptional({ 
    description: '회원 등급',
    example: '회원'
  })
  native?: string;

  /**
   * 품목명 검색 필터
   * 
   * @description
   * 품목명으로 검색합니다. LIKE 검색을 사용하여 부분 일치도 찾습니다.
   * 대소문자를 구분하지 않습니다.
   * 
   * @example "김치찌개"
   */
  @ApiPropertyOptional({ 
    description: '품목명',
    example: '김치찌개'
  })
  name?: string;

  /**
   * 페이징 커서
   * 
   * @description
   * 커서 기반 페이징을 위한 파라미터입니다.
   * 이전 페이지의 마지막 품목 ID를 전달하면, 해당 품목보다 작은 번호의 품목들을 조회합니다.
   * 
   * @example "123e4567-e89b-12d3-a456-426614174000"
   */
  @ApiPropertyOptional({ 
    description: '커서(페이징)',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  cursor?: string;
} 