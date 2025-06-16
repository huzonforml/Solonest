
import { useState, useRef } from 'react';
import { Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ImageWidgetProps {
  element: {
    id: string;
    content: string;
    style: {
      x: number;
      y: number;
      width?: number;
      height?: number;
      backgroundColor?: string;
    };
  };
  isSelected: boolean;
  onUpdate: (id: string, updates: any) => void;
  onSelect: () => void;
  onDragStart: (e: React.DragEvent) => void;
}

export const ImageWidget = ({ element, isSelected, onUpdate, onSelect, onDragStart }: ImageWidgetProps) => {
  const [isResizing, setIsResizing] = useState(false);
  const [resizeHandle, setResizeHandle] = useState<string | null>(null);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [startSize, setStartSize] = useState({ width: 0, height: 0 });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        onUpdate(element.id, { content: imageUrl });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResizeStart = (e: React.MouseEvent, handle: string) => {
    e.stopPropagation();
    setIsResizing(true);
    setResizeHandle(handle);
    setStartPos({ x: e.clientX, y: e.clientY });
    setStartSize({ 
      width: element.style.width || 150, 
      height: element.style.height || 100 
    });

    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;
      
      const deltaX = e.clientX - startPos.x;
      const deltaY = e.clientY - startPos.y;
      
      let newWidth = startSize.width;
      let newHeight = startSize.height;

      if (handle.includes('right')) {
        newWidth = Math.max(50, startSize.width + deltaX);
      }
      if (handle.includes('left')) {
        newWidth = Math.max(50, startSize.width - deltaX);
      }
      if (handle.includes('bottom')) {
        newHeight = Math.max(50, startSize.height + deltaY);
      }
      if (handle.includes('top')) {
        newHeight = Math.max(50, startSize.height - deltaY);
      }

      onUpdate(element.id, {
        style: { ...element.style, width: newWidth, height: newHeight }
      });
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      setResizeHandle(null);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const clearImage = () => {
    onUpdate(element.id, { content: 'Image' });
  };

  const isImageUrl = element.content.startsWith('data:') || element.content.startsWith('http') || element.content.includes('.');

  return (
    <>
      <div
        draggable={!isResizing}
        onDragStart={onDragStart}
        onClick={onSelect}
        className={`absolute cursor-move border-2 ${
          isSelected ? 'border-blue-500' : 'border-transparent'
        } hover:border-blue-300 transition-colors bg-neo-100 rounded-lg overflow-hidden`}
        style={{
          left: element.style.x,
          top: element.style.y,
          width: element.style.width || 150,
          height: element.style.height || 100,
          backgroundColor: element.style.backgroundColor || '#f0f0f3',
        }}
      >
        {isImageUrl ? (
          <div className="relative w-full h-full">
            <img 
              src={element.content} 
              alt="Uploaded content" 
              className="w-full h-full object-cover"
            />
            {isSelected && (
              <Button
                onClick={clearImage}
                className="absolute top-1 right-1 p-1 h-6 w-6 bg-red-500 hover:bg-red-600 text-white"
                size="sm"
              >
                <X size={12} />
              </Button>
            )}
          </div>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 p-2">
            <Upload size={24} className="text-neo-500" />
            <span className="text-xs text-neo-600 text-center">Click to upload image</span>
            <Button
              onClick={() => fileInputRef.current?.click()}
              className="neo-button text-xs px-2 py-1"
              size="sm"
            >
              Browse
            </Button>
          </div>
        )}

        {/* Resize handles */}
        {isSelected && (
          <>
            {/* Corner handles */}
            <div
              className="absolute -top-1 -left-1 w-3 h-3 bg-blue-500 border border-white cursor-nw-resize"
              onMouseDown={(e) => handleResizeStart(e, 'top-left')}
            />
            <div
              className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 border border-white cursor-ne-resize"
              onMouseDown={(e) => handleResizeStart(e, 'top-right')}
            />
            <div
              className="absolute -bottom-1 -left-1 w-3 h-3 bg-blue-500 border border-white cursor-sw-resize"
              onMouseDown={(e) => handleResizeStart(e, 'bottom-left')}
            />
            <div
              className="absolute -bottom-1 -right-1 w-3 h-3 bg-blue-500 border border-white cursor-se-resize"
              onMouseDown={(e) => handleResizeStart(e, 'bottom-right')}
            />
            
            {/* Edge handles */}
            <div
              className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-blue-500 border border-white cursor-n-resize"
              onMouseDown={(e) => handleResizeStart(e, 'top')}
            />
            <div
              className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-blue-500 border border-white cursor-s-resize"
              onMouseDown={(e) => handleResizeStart(e, 'bottom')}
            />
            <div
              className="absolute -left-1 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-blue-500 border border-white cursor-w-resize"
              onMouseDown={(e) => handleResizeStart(e, 'left')}
            />
            <div
              className="absolute -right-1 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-blue-500 border border-white cursor-e-resize"
              onMouseDown={(e) => handleResizeStart(e, 'right')}
            />
          </>
        )}
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />
    </>
  );
};
