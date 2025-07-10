# PaySys Shop v6

NestJS 백엔드와 Vite React 프론트엔드로 구성된 새로운 PaySys Shop 프로젝트입니다.

## 기술 스택

### Backend
- **Framework**: NestJS
- **Language**: TypeScript
- **Database**: PostgreSQL
- **Package Manager**: npm

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Language**: TypeScript
- **State Management**: Zustand
- **Package Manager**: npm

## 프로젝트 구조

```
paysys-shop-v6/
├── backend/          # NestJS 백엔드
├── frontend/         # Vite React 프론트엔드
├── package.json      # 루트 레벨 스크립트
└── README.md
```

## 설치 및 실행

### 1. 전체 의존성 설치
```bash
npm run install:all
```

### 2. 개발 서버 실행

#### 백엔드만 실행
```bash
npm run dev:backend
```

#### 프론트엔드만 실행
```bash
npm run dev:frontend
```

#### 백엔드 + 프론트엔드 동시 실행
```bash
npm run dev
```

### 3. 빌드

#### 전체 빌드
```bash
npm run build
```

#### 개별 빌드
```bash
npm run build:backend
npm run build:frontend
```

## 개발 포트

- **Backend**: http://localhost:3000
- **Frontend**: http://localhost:5173

## 데이터베이스

- **Database Name**: paysys-shop
- **Type**: PostgreSQL

## 배포 환경

- **Server**: AWS EC2
- **OS**: Ubuntu 24.04
- **Routing**: 
  - `/api/*` → NestJS API
  - `/*` → Vite React Frontend (빌드된 정적 파일)

## 기존 프로젝트와의 차이점

- 기존 v51 프로젝트와 완전히 분리된 새로운 구조
- Next.js → Vite React로 변경
- 모노레포 구조로 백엔드와 프론트엔드 통합 관리 