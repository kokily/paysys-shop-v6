import { useRef, useCallback, useEffect } from 'react';
import { useAppDispatch } from '../../../store/hooks';
import { updateSignImage } from '../../../store/slices/signSlice';
import './SignCanvas.scss';

// 서명 캔버스의 좌표 타입 정의
interface Coordinate {
  x: number;
  y: number;
}

// SignCanvas 컴포넌트의 Props 타입 정의
interface Props {
  width: number; // 캔버스 너비
  height: number; // 캔버스 높이
  initialImage?: string; // 기존 서명 이미지 (수정 시 사용)
}

/**
 * 서명을 그릴 수 있는 캔버스 컴포넌트
 *
 * 주요 기능:
 * - 마우스/터치로 서명 그리기
 * - 기존 서명 이미지 로드
 * - 서명 지우기
 * - Redux를 통한 이미지 데이터 관리
 */
function SignCanvas({ width, height, initialImage }: Props) {
  const dispatch = useAppDispatch();

  // 캔버스 DOM 요소 참조
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 마우스 위치 저장 (useRef 사용으로 불필요한 리렌더링 방지)
  const mousePosRef = useRef<Coordinate | undefined>(undefined);

  // 현재 그리기 상태 (useRef 사용으로 불필요한 리렌더링 방지)
  const isPaintingRef = useRef(false);

  // 서명이 그려졌는지 여부 (지우기 버튼 활성화용)
  const hasDrawingRef = useRef(false);

  /**
   * 마우스 이벤트의 좌표를 캔버스 기준 좌표로 변환
   * @param e 마우스 이벤트 객체
   * @returns 캔버스 기준 좌표
   */
  const getCoordinates = (e: MouseEvent): Coordinate => {
    if (!canvasRef.current) return { x: 0, y: 0 };

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();

    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  /**
   * 터치 이벤트의 좌표를 캔버스 기준 좌표로 변환
   * @param e 터치 이벤트 객체
   * @returns 캔버스 기준 좌표
   */
  const getTouchCoordinates = (e: TouchEvent): Coordinate => {
    if (!canvasRef.current) return { x: 0, y: 0 };

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0]; // 첫 번째 터치 포인트 사용

    return {
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top,
    };
  };

  /**
   * 두 점 사이에 선을 그리는 함수
   * @param start 시작 좌표
   * @param end 끝 좌표
   */
  const drawLine = (start: Coordinate, end: Coordinate) => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (!context) return;

    // 선 스타일 설정
    context.strokeStyle = '#000000'; // 검은색
    context.lineWidth = 2; // 선 두께
    context.lineCap = 'round'; // 선 끝을 둥글게
    context.lineJoin = 'round'; // 선 연결점을 둥글게

    // 선 그리기
    context.beginPath();
    context.moveTo(start.x, start.y);
    context.lineTo(end.x, end.y);
    context.stroke();
  };

  /**
   * 캔버스의 현재 상태를 Redux에 업데이트
   * BASE64 인코딩된 이미지 데이터로 변환하여 저장
   */
  const updateImageData = useCallback(() => {
    if (canvasRef.current) {
      // 캔버스를 BASE64 PNG 이미지로 변환
      const imageData = canvasRef.current.toDataURL('image/png');
      console.log('Updating image data, length:', imageData.length);

      // Redux store에 이미지 데이터 저장
      dispatch(updateSignImage(imageData));
    }
  }, [dispatch]);

  /**
   * 마우스 그리기 시작
   * @param e 마우스 이벤트
   */
  const startPaint = useCallback((e: MouseEvent) => {
    isPaintingRef.current = true;
    mousePosRef.current = getCoordinates(e);
  }, []);

  /**
   * 마우스로 그리기 중
   * @param e 마우스 이벤트
   */
  const paint = useCallback((e: MouseEvent) => {
    if (!isPaintingRef.current || !mousePosRef.current) return;

    const currentPos = getCoordinates(e);

    // 이전 위치에서 현재 위치까지 선 그리기
    drawLine(mousePosRef.current, currentPos);

    // 현재 위치를 이전 위치로 업데이트
    mousePosRef.current = currentPos;
    hasDrawingRef.current = true;
  }, []);

  /**
   * 마우스 그리기 종료
   */
  const exitPaint = useCallback(() => {
    isPaintingRef.current = false;
    mousePosRef.current = undefined;

    // 그리기가 끝나면 이미지 데이터 업데이트
    if (hasDrawingRef.current) {
      updateImageData();
    }
  }, [updateImageData]);

  /**
   * 터치 그리기 시작
   * @param e 터치 이벤트
   */
  const startTouch = useCallback((e: TouchEvent) => {
    e.preventDefault(); // 기본 터치 동작 방지 (스크롤 등)
    isPaintingRef.current = true;
    mousePosRef.current = getTouchCoordinates(e);
  }, []);

  /**
   * 터치로 그리기 중
   * @param e 터치 이벤트
   */
  const touch = useCallback((e: TouchEvent) => {
    e.preventDefault(); // 기본 터치 동작 방지

    if (!isPaintingRef.current || !mousePosRef.current) return;

    const currentPos = getTouchCoordinates(e);

    // 이전 위치에서 현재 위치까지 선 그리기
    drawLine(mousePosRef.current, currentPos);

    // 현재 위치를 이전 위치로 업데이트
    mousePosRef.current = currentPos;
    hasDrawingRef.current = true;
  }, []);

  /**
   * 터치 그리기 종료
   */
  const exitTouch = useCallback(() => {
    isPaintingRef.current = false;
    mousePosRef.current = undefined;

    // 그리기가 끝나면 이미지 데이터 업데이트
    if (hasDrawingRef.current) {
      updateImageData();
    }
  }, [updateImageData]);

  /**
   * 캔버스 내용을 모두 지우는 함수
   */
  const clearCanvas = useCallback(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (!context) return;

    // 캔버스 전체를 흰색으로 지우기
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, canvas.width, canvas.height);

    // 그리기 상태 초기화
    hasDrawingRef.current = false;

    // 지운 후 이미지 데이터 업데이트
    updateImageData();
  }, [updateImageData]);

  /**
   * 기존 서명 이미지를 캔버스에 로드하는 함수
   */
  const loadInitialImage = useCallback(() => {
    if (!canvasRef.current || !initialImage) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (!context) return;

    const img = new Image();
    img.onload = () => {
      // 캔버스를 흰색으로 초기화
      context.fillStyle = '#ffffff';
      context.fillRect(0, 0, canvas.width, canvas.height);

      // 이미지를 캔버스에 그리기
      context.drawImage(img, 0, 0, canvas.width, canvas.height);

      // 이미지가 로드되면 그리기 상태를 true로 설정
      hasDrawingRef.current = true;

      // 로드된 이미지 데이터를 Redux에 업데이트
      updateImageData();
    };

    img.src = initialImage;
  }, [initialImage, updateImageData]);

  // 캔버스 초기화 및 이벤트 리스너 등록
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas: HTMLCanvasElement = canvasRef.current;
    const context = canvas.getContext('2d');

    if (context) {
      // 캔버스를 흰색 배경으로 초기화
      context.fillStyle = '#ffffff';
      context.fillRect(0, 0, canvas.width, canvas.height);
    }

    // 기존 이미지가 있으면 로드, 없으면 빈 캔버스 이미지 업데이트
    if (initialImage) {
      loadInitialImage();
    } else {
      updateImageData();
    }

    console.log('Adding event listeners to canvas');

    // 마우스 이벤트 리스너 등록
    canvas.addEventListener('mousedown', startPaint);
    canvas.addEventListener('mousemove', paint);
    canvas.addEventListener('mouseup', exitPaint);
    canvas.addEventListener('mouseleave', exitPaint);

    // 터치 이벤트 리스너 등록 (모바일 지원)
    canvas.addEventListener('touchstart', startTouch);
    canvas.addEventListener('touchmove', touch);
    canvas.addEventListener('touchend', exitTouch);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      console.log('Removing event listeners from canvas');

      canvas.removeEventListener('mousedown', startPaint);
      canvas.removeEventListener('mousemove', paint);
      canvas.removeEventListener('mouseup', exitPaint);
      canvas.removeEventListener('mouseleave', exitPaint);

      canvas.removeEventListener('touchstart', startTouch);
      canvas.removeEventListener('touchmove', touch);
      canvas.removeEventListener('touchend', exitTouch);
    };
  }, [
    startPaint,
    paint,
    exitPaint,
    startTouch,
    touch,
    exitTouch,
    updateImageData,
    initialImage,
    loadInitialImage,
  ]);

  return (
    <div className="sign-canvas-container">
      {/* 서명을 그릴 캔버스 */}
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="sign-canvas"
        style={{ cursor: 'crosshair' }} // 마우스 커서를 십자 모양으로 변경
      />

      {/* 서명 지우기 버튼 - 서명이 있을 때만 활성화 */}
      <button
        type="button"
        className="sign-clear-btn"
        onClick={clearCanvas}
        disabled={!hasDrawingRef.current}
      >
        지우기
      </button>
    </div>
  );
}

export default SignCanvas;
