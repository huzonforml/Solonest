
import { useState, useRef } from "react";
import { Palette, Type, Move, Square, Circle, Image, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { ImageWidget } from "@/components/ImageWidget";

interface Element {
  id: string;
  type: 'text' | 'button' | 'image' | 'container';
  content: string;
  style: {
    x: number;
    y: number;
    width?: number;
    height?: number;
    backgroundColor?: string;
    color?: string;
    fontSize?: string;
    fontFamily?: string;
  };
}

const WebsiteMaker = () => {
  const [elements, setElements] = useState<Element[]>([]);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [colors, setColors] = useState({
    primary: '#3b82f6',
    secondary: '#64748b',
    text: '#1e293b'
  });
  const [draggedElement, setDraggedElement] = useState<string | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const addElement = (type: Element['type']) => {
    const newElement: Element = {
      id: `element-${Date.now()}`,
      type,
      content: type === 'text' ? 'Sample Text' : type === 'button' ? 'Button' : type === 'image' ? 'Image' : 'Container',
      style: {
        x: 100,
        y: 100,
        width: type === 'text' ? 200 : 150,
        height: type === 'text' ? 40 : type === 'button' ? 40 : 100,
        backgroundColor: type === 'button' ? colors.primary : type === 'container' ? colors.secondary : 'transparent',
        color: colors.text,
        fontSize: '16px',
        fontFamily: 'Arial'
      }
    };
    setElements([...elements, newElement]);
    toast("Element added to canvas!");
  };

  const updateElement = (id: string, updates: Partial<Element>) => {
    setElements(elements.map(el => el.id === id ? { ...el, ...updates } : el));
  };

  const handleDragStart = (e: React.DragEvent, elementId: string) => {
    setDraggedElement(elementId);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (!draggedElement || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    updateElement(draggedElement, {
      style: { ...elements.find(el => el.id === draggedElement)?.style, x, y }
    });
    setDraggedElement(null);
  };

  const selectedEl = elements.find(el => el.id === selectedElement);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-8">
        <div className="neo-card p-3">
          <Palette className="w-6 h-6 text-neo-600" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-neo-700">Website Maker</h2>
          <p className="text-neo-500">Create beautiful websites with drag and drop</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="neo-card p-4 space-y-4">
          <Tabs defaultValue="elements" className="w-full">
            <TabsList className="grid w-full grid-cols-2 neo-card p-1">
              <TabsTrigger value="elements" className="neo-button text-neo-700 data-[state=active]:neo-card-pressed data-[state=active]:text-neo-800">Elements</TabsTrigger>
              <TabsTrigger value="style" className="neo-button text-neo-700 data-[state=active]:neo-card-pressed data-[state=active]:text-neo-800">Style</TabsTrigger>
            </TabsList>
            
            <TabsContent value="elements" className="space-y-3">
              <h3 className="font-semibold text-neo-700">Add Elements</h3>
              <div className="grid grid-cols-2 gap-2">
                <Button onClick={() => addElement('text')} className="neo-button p-3 flex flex-col gap-1 text-neo-700 hover:text-neo-800">
                  <Type size={20} />
                  <span className="text-xs">Text</span>
                </Button>
                <Button onClick={() => addElement('button')} className="neo-button p-3 flex flex-col gap-1 text-neo-700 hover:text-neo-800">
                  <Square size={20} />
                  <span className="text-xs">Button</span>
                </Button>
                <Button onClick={() => addElement('image')} className="neo-button p-3 flex flex-col gap-1 text-neo-700 hover:text-neo-800">
                  <Image size={20} />
                  <span className="text-xs">Image</span>
                </Button>
                <Button onClick={() => addElement('container')} className="neo-button p-3 flex flex-col gap-1 text-neo-700 hover:text-neo-800">
                  <Circle size={20} />
                  <span className="text-xs">Container</span>
                </Button>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-medium text-neo-600">Colors</h4>
                <div className="space-y-2">
                  <div>
                    <Label htmlFor="primary" className="text-neo-700">Primary Color</Label>
                    <Input
                      id="primary"
                      type="color"
                      value={colors.primary}
                      onChange={(e) => setColors({...colors, primary: e.target.value})}
                      className="neo-input h-10"
                    />
                  </div>
                  <div>
                    <Label htmlFor="secondary" className="text-neo-700">Secondary Color</Label>
                    <Input
                      id="secondary"
                      type="color"
                      value={colors.secondary}
                      onChange={(e) => setColors({...colors, secondary: e.target.value})}
                      className="neo-input h-10"
                    />
                  </div>
                  <div>
                    <Label htmlFor="text" className="text-neo-700">Text Color</Label>
                    <Input
                      id="text"
                      type="color"
                      value={colors.text}
                      onChange={(e) => setColors({...colors, text: e.target.value})}
                      className="neo-input h-10"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="style" className="space-y-3">
              {selectedEl ? (
                <div className="space-y-3">
                  <h3 className="font-semibold text-neo-700">Element Style</h3>
                  <div>
                    <Label className="text-neo-700">Content</Label>
                    <Input
                      value={selectedEl.content}
                      onChange={(e) => updateElement(selectedEl.id, { content: e.target.value })}
                      className="neo-input"
                    />
                  </div>
                  <div>
                    <Label className="text-neo-700">Font Size</Label>
                    <Select 
                      value={selectedEl.style.fontSize} 
                      onValueChange={(value) => updateElement(selectedEl.id, { 
                        style: { ...selectedEl.style, fontSize: value } 
                      })}
                    >
                      <SelectTrigger className="neo-input">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="neo-card border border-neo-300">
                        <SelectItem value="12px" className="text-neo-700 hover:bg-neo-300">12px</SelectItem>
                        <SelectItem value="14px" className="text-neo-700 hover:bg-neo-300">14px</SelectItem>
                        <SelectItem value="16px" className="text-neo-700 hover:bg-neo-300">16px</SelectItem>
                        <SelectItem value="18px" className="text-neo-700 hover:bg-neo-300">18px</SelectItem>
                        <SelectItem value="24px" className="text-neo-700 hover:bg-neo-300">24px</SelectItem>
                        <SelectItem value="32px" className="text-neo-700 hover:bg-neo-300">32px</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-neo-700">Font Family</Label>
                    <Select 
                      value={selectedEl.style.fontFamily} 
                      onValueChange={(value) => updateElement(selectedEl.id, { 
                        style: { ...selectedEl.style, fontFamily: value } 
                      })}
                    >
                      <SelectTrigger className="neo-input">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="neo-card border border-neo-300">
                        <SelectItem value="Arial" className="text-neo-700 hover:bg-neo-300">Arial</SelectItem>
                        <SelectItem value="Helvetica" className="text-neo-700 hover:bg-neo-300">Helvetica</SelectItem>
                        <SelectItem value="Times New Roman" className="text-neo-700 hover:bg-neo-300">Times New Roman</SelectItem>
                        <SelectItem value="Georgia" className="text-neo-700 hover:bg-neo-300">Georgia</SelectItem>
                        <SelectItem value="Verdana" className="text-neo-700 hover:bg-neo-300">Verdana</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-neo-700">Background Color</Label>
                    <Input
                      type="color"
                      value={selectedEl.style.backgroundColor || '#ffffff'}
                      onChange={(e) => updateElement(selectedEl.id, { 
                        style: { ...selectedEl.style, backgroundColor: e.target.value } 
                      })}
                      className="neo-input h-10"
                    />
                  </div>
                </div>
              ) : (
                <p className="text-neo-500 text-sm">Select an element to edit its style</p>
              )}
            </TabsContent>
          </Tabs>
          
          <Button onClick={() => toast("Website saved!")} className="neo-button w-full text-neo-700 hover:text-neo-800">
            <Save size={16} />
            Save Website
          </Button>
        </div>

        {/* Canvas */}
        <div className="lg:col-span-3">
          <Card className="neo-card">
            <CardHeader>
              <CardTitle className="text-neo-700">Canvas</CardTitle>
            </CardHeader>
            <CardContent>
              <div
                ref={canvasRef}
                className="relative w-full h-[600px] bg-neo-100 rounded-xl shadow-neo-inset overflow-hidden"
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
              >
                {elements.map((element) => (
                  element.type === 'image' ? (
                    <ImageWidget
                      key={element.id}
                      element={element}
                      isSelected={selectedElement === element.id}
                      onUpdate={updateElement}
                      onSelect={() => setSelectedElement(element.id)}
                      onDragStart={(e) => handleDragStart(e, element.id)}
                    />
                  ) : (
                    <div
                      key={element.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, element.id)}
                      onClick={() => setSelectedElement(element.id)}
                      className={`absolute cursor-move border-2 ${
                        selectedElement === element.id ? 'border-blue-500' : 'border-transparent'
                      } hover:border-blue-300 transition-colors`}
                      style={{
                        left: element.style.x,
                        top: element.style.y,
                        width: element.style.width,
                        height: element.style.height,
                        backgroundColor: element.style.backgroundColor,
                        color: element.style.color,
                        fontSize: element.style.fontSize,
                        fontFamily: element.style.fontFamily,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: element.type === 'button' ? '8px' : '4px',
                        padding: '8px'
                      }}
                    >
                      {element.content}
                    </div>
                  )
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default WebsiteMaker;
