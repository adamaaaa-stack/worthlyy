import { useState, useCallback } from "react";
import { useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { 
  Upload as UploadIcon, 
  X, 
  Loader2, 
  Camera, 
  Smartphone,
  Laptop,
  Tablet,
  Gamepad2,
  Watch,
  Headphones,
  HelpCircle
} from "lucide-react";

const deviceCategories = [
  { value: "smartphone", label: "Smartphone", icon: Smartphone },
  { value: "laptop", label: "Laptop", icon: Laptop },
  { value: "tablet", label: "Tablet", icon: Tablet },
  { value: "gaming-console", label: "Gaming Console", icon: Gamepad2 },
  { value: "smartwatch", label: "Smartwatch", icon: Watch },
  { value: "camera", label: "Camera", icon: Camera },
  { value: "audio", label: "Audio Equipment", icon: Headphones },
  { value: "other", label: "Other", icon: HelpCircle },
];

export default function UploadPage() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [deviceModel, setDeviceModel] = useState("");
  const [deviceCategory, setDeviceCategory] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files).filter(file => 
      file.type.startsWith("image/")
    );
    handleFiles(files);
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    handleFiles(files);
  };

  const handleFiles = (newFiles: File[]) => {
    const remainingSlots = 6 - images.length;
    const filesToAdd = newFiles.slice(0, remainingSlots);
    
    if (newFiles.length > remainingSlots) {
      toast({
        title: "Maximum 6 images",
        description: `Only ${remainingSlots} more image(s) can be added.`,
        variant: "destructive",
      });
    }

    const newPreviews = filesToAdd.map(file => URL.createObjectURL(file));
    setImages(prev => [...prev, ...filesToAdd]);
    setPreviews(prev => [...prev, ...newPreviews]);
  };

  const removeImage = (index: number) => {
    URL.revokeObjectURL(previews[index]);
    setImages(prev => prev.filter((_, i) => i !== index));
    setPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const valuationMutation = useMutation({
    mutationFn: async () => {
      const formData = new FormData();
      formData.append("deviceModel", deviceModel);
      formData.append("deviceCategory", deviceCategory);
      images.forEach((image) => {
        formData.append("images", image);
      });

      const response = await fetch("/api/valuations", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to create valuation");
      }

      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Valuation Started",
        description: "Analyzing your device...",
      });
      setLocation(`/results/${data.id}`);
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const canSubmit = deviceModel.trim() && deviceCategory && images.length >= 4;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="max-w-2xl mx-auto px-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl lg:text-4xl font-semibold mb-3">
              Value Your Device
            </h1>
            <p className="text-muted-foreground">
              Upload 4-6 photos and enter your device model for an accurate valuation
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Device Information</CardTitle>
              <CardDescription>
                Provide details about the device you want to value
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Device Model */}
              <div className="space-y-2">
                <Label htmlFor="deviceModel">Device Model *</Label>
                <Input
                  id="deviceModel"
                  placeholder="e.g., iPhone 14 Pro Max 256GB"
                  value={deviceModel}
                  onChange={(e) => setDeviceModel(e.target.value)}
                  data-testid="input-device-model"
                />
                <p className="text-xs text-muted-foreground">
                  Be specific - include storage, color, and variant if applicable
                </p>
              </div>

              {/* Device Category */}
              <div className="space-y-2">
                <Label htmlFor="deviceCategory">Device Category *</Label>
                <Select value={deviceCategory} onValueChange={setDeviceCategory}>
                  <SelectTrigger data-testid="select-device-category">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {deviceCategories.map(({ value, label, icon: Icon }) => (
                      <SelectItem key={value} value={value}>
                        <div className="flex items-center gap-2">
                          <Icon className="h-4 w-4" />
                          <span>{label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Photo Upload */}
              <div className="space-y-2">
                <Label>Device Photos * (4-6 images)</Label>
                <div
                  className={`
                    relative min-h-48 border-2 border-dashed rounded-lg transition-colors
                    ${dragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25"}
                    ${images.length >= 6 ? "opacity-50 pointer-events-none" : ""}
                  `}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileInput}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    disabled={images.length >= 6}
                    data-testid="input-images"
                  />
                  
                  <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                    <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-4">
                      <UploadIcon className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <p className="font-medium mb-1">
                      Drag and drop images here
                    </p>
                    <p className="text-sm text-muted-foreground mb-4">
                      or click to browse
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {images.length}/6 images uploaded
                    </p>
                  </div>
                </div>

                {/* Image Previews */}
                {previews.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                    {previews.map((preview, index) => (
                      <div
                        key={index}
                        className="relative aspect-square rounded-lg overflow-hidden border bg-muted"
                      >
                        <img
                          src={preview}
                          alt={`Upload ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 w-6 h-6 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-background transition-colors"
                          data-testid={`button-remove-image-${index}`}
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <p className="text-xs text-muted-foreground">
                  Tips: Include front, back, sides, and any areas with damage
                </p>
              </div>

              {/* Submit Button */}
              <Button
                className="w-full"
                size="lg"
                disabled={!canSubmit || valuationMutation.isPending}
                onClick={() => valuationMutation.mutate()}
                data-testid="button-submit-valuation"
              >
                {valuationMutation.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Camera className="h-4 w-4 mr-2" />
                    Get Valuation
                  </>
                )}
              </Button>

              {!canSubmit && (
                <p className="text-center text-sm text-muted-foreground">
                  {!deviceModel.trim() && "Enter device model • "}
                  {!deviceCategory && "Select category • "}
                  {images.length < 4 && `Upload ${4 - images.length} more image(s)`}
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
