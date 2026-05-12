import { useState } from "react";
import { Settings, Moon, Sun, Monitor, Eye, Type, Zap, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useTheme, useAccessibility, type Theme } from "@/lib/theme-context";

export function AccessibilitySettings() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const { settings, updateSettings } = useAccessibility();
  const [open, setOpen] = useState(false);

  const ThemeIcon = theme === "light" ? Sun : theme === "dark" ? Moon : Monitor;

  const cycleTheme = () => {
    const next: Record<Theme, Theme> = { light: "dark", dark: "system", system: "light" };
    setTheme(next[theme]);
  };

  const themeLabel: Record<Theme, string> = {
    light: "Light mode",
    dark: "Dark mode",
    system: "System theme",
  };

  return (
    <div className="flex items-center gap-2">
      {/* Theme Toggle */}
      <Button
        variant="outline"
        size="sm"
        onClick={cycleTheme}
        aria-label={`Switch theme (current: ${themeLabel[theme]})`}
        className="flex items-center gap-1.5"
      >
        <ThemeIcon className="h-4 w-4" />
        <span className="text-xs hidden sm:inline">{themeLabel[theme]}</span>
      </Button>

      {/* Accessibility Settings Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" aria-label="Accessibility settings">
            <Settings className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Accessibility Settings
            </DialogTitle>
            <DialogDescription>
              Customize your experience for better accessibility and comfort.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Font Size */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2 text-base font-medium">
                <Type className="h-4 w-4" />
                Font Size
              </Label>
              <RadioGroup
                value={settings.fontSize}
                onValueChange={(value: "small" | "medium" | "large") =>
                  updateSettings({ fontSize: value })
                }
                className="grid grid-cols-3 gap-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="small" id="font-small" />
                  <Label htmlFor="font-small" className="text-sm">Small</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="medium" id="font-medium" />
                  <Label htmlFor="font-medium" className="text-sm">Medium</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="large" id="font-large" />
                  <Label htmlFor="font-large" className="text-sm">Large</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Visual Settings */}
            <div className="space-y-4">
              <Label className="text-base font-medium">Visual Settings</Label>

              <div className="flex items-center justify-between">
                <Label htmlFor="high-contrast" className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  High Contrast
                </Label>
                <Switch
                  id="high-contrast"
                  checked={settings.highContrast}
                  onCheckedChange={(checked) => updateSettings({ highContrast: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="reduced-motion" className="flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  Reduced Motion
                </Label>
                <Switch
                  id="reduced-motion"
                  checked={settings.reducedMotion}
                  onCheckedChange={(checked) => updateSettings({ reducedMotion: checked })}
                />
              </div>
            </div>

            {/* Assistive Technology */}
            <div className="space-y-4">
              <Label className="text-base font-medium">Assistive Technology</Label>

              <div className="flex items-center justify-between">
                <Label htmlFor="screen-reader" className="flex items-center gap-2">
                  <Volume2 className="h-4 w-4" />
                  Screen Reader Optimizations
                </Label>
                <Switch
                  id="screen-reader"
                  checked={settings.screenReader}
                  onCheckedChange={(checked) => updateSettings({ screenReader: checked })}
                />
              </div>
            </div>

            {/* Current Theme Info */}
            <div className="pt-4 border-t">
              <p className="text-sm text-muted-foreground">
                Current theme: <span className="font-medium capitalize">{resolvedTheme}</span>
                {theme === "system" && " (following system preference)"}
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}