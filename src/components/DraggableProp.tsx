/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { soundEngine } from '../utils/audio';

interface DraggablePropProps {
  id: string;
  name: string;
  hindiName?: string;
  children: React.ReactNode;
  isActive: boolean;
  isCompleted: boolean;
  onDropSuccess: () => void;
  targetRectRef: React.RefObject<HTMLDivElement | null>;
  onHoverOverTarget?: (isOver: boolean) => void;
}

export const DraggableProp: React.FC<DraggablePropProps> = ({
  id,
  name,
  hindiName,
  children,
  isActive,
  isCompleted,
  onDropSuccess,
  targetRectRef,
  onHoverOverTarget,
}) => {
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isHoveringCup, setIsHoveringCup] = useState(false);
  const startPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const elementRef = useRef<HTMLDivElement | null>(null);

  // Check collision between dragged element and target cup
  const checkCollision = (clientX: number, clientY: number): boolean => {
    if (!targetRectRef.current) return false;
    const targetRect = targetRectRef.current.getBoundingClientRect();

    // Generous bounding box tolerance around the cup
    const hit =
      clientX >= targetRect.left - 40 &&
      clientX <= targetRect.right + 40 &&
      clientY >= targetRect.top - 40 &&
      clientY <= targetRect.bottom + 40;

    return hit;
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    if (!isActive || isCompleted) return;

    // Prevent scrolling during drag
    e.preventDefault();
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);

    setIsDragging(true);
    startPosRef.current = { x: e.clientX, y: e.clientY };
    setPosition({ x: 0, y: 0 });
    soundEngine.playPop();
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;

    const dx = e.clientX - startPosRef.current.x;
    const dy = e.clientY - startPosRef.current.y;
    setPosition({ x: dx, y: dy });

    const colliding = checkCollision(e.clientX, e.clientY);
    setIsHoveringCup(colliding);
    onHoverOverTarget?.(colliding);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging) return;

    const colliding = checkCollision(e.clientX, e.clientY);
    setIsDragging(false);
    setIsHoveringCup(false);
    onHoverOverTarget?.(false);

    if (colliding) {
      // Successful drop into the mug!
      soundEngine.playBubble();
      onDropSuccess();
      setPosition({ x: 0, y: 0 });
    } else {
      // Check if it was a quick tap/click without moving much (dist < 10px)
      const dist = Math.hypot(
        e.clientX - startPosRef.current.x,
        e.clientY - startPosRef.current.y
      );
      if (dist < 10) {
        // Quick tap shortcut to add ingredient!
        soundEngine.playBubble();
        onDropSuccess();
      }
      // Elastic snap-back
      setPosition({ x: 0, y: 0 });
    }
  };

  // Reset position if completed
  useEffect(() => {
    if (isCompleted) {
      setPosition({ x: 0, y: 0 });
    }
  }, [isCompleted]);

  return (
    <div
      ref={elementRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      style={{
        transform: isDragging
          ? `translate3d(${position.x}px, ${position.y}px, 0) scale(1.18) rotate(${
              position.x * 0.08
            }deg)`
          : 'translate3d(0, 0, 0) scale(1) rotate(0deg)',
        transition: isDragging ? 'none' : 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
        zIndex: isDragging ? 9999 : 10,
        touchAction: 'none',
      }}
      className={`relative group flex flex-col items-center select-none cursor-grab active:cursor-grabbing ${
        !isActive || isCompleted ? 'opacity-40 pointer-events-none' : 'hover:scale-105'
      }`}
    >
      {/* Decorative Kitchen Pedestal / Coaster */}
      <div
        className={`w-20 h-20 rounded-2xl flex items-center justify-center p-2 border-2 transition-all duration-300 relative ${
          isActive
            ? 'bg-gradient-to-b from-white via-pink-50/70 to-rose-100/50 border-pink-300 shadow-md ring-2 ring-pink-200/50'
            : isCompleted
            ? 'bg-emerald-50/50 border-emerald-200 shadow-none'
            : 'bg-white/60 border-stone-200 shadow-sm'
        } ${isHoveringCup ? 'ring-4 ring-pink-400 scale-110' : ''}`}
      >
        {/* Floating Ingredient Graphic */}
        <div className="relative pointer-events-none drop-shadow-md">
          {children}
        </div>

        {/* Drag Glow Aura when active */}
        {isActive && !isCompleted && !isDragging && (
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500" />
          </span>
        )}

        {/* Completed Checkmark Badge */}
        {isCompleted && (
          <div className="absolute inset-0 bg-white/70 backdrop-blur-[1px] rounded-2xl flex items-center justify-center">
            <span className="text-emerald-600 font-bold text-xs bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-200">
              ✓ Added
            </span>
          </div>
        )}
      </div>

      {/* Label under pedestal */}
      <div className="mt-1.5 text-center pointer-events-none">
        <p className="font-bubbly text-xs font-bold text-[#5C3D2E] leading-tight">
          {name}
        </p>
        {hindiName && (
          <p className="text-[10px] text-pink-600 font-medium">{hindiName}</p>
        )}
      </div>

      {/* Drag Helper Tooltip */}
      {isActive && !isCompleted && !isDragging && (
        <span className="text-[10px] text-[#A8887B] font-medium mt-0.5 group-hover:text-pink-600 transition-colors">
          Drag or tap!
        </span>
      )}
    </div>
  );
};
