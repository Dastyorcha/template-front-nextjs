import { Checkbox } from "@/shared/components/ui/checkbox";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/shared/components/ui/radio-group";
import { Switch } from "@/shared/components/ui/switch";
import { Textarea } from "@/shared/components/ui/textarea";

import { PlaygroundSection } from "./section";

export function FormsSection() {
  return (
    <PlaygroundSection
      id="forms"
      title="Form controls"
      description="Input, textarea, label, checkbox, switch, radio."
    >
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="pg-input">Email</Label>
          <Input id="pg-input" type="email" placeholder="you@example.com" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="pg-input-disabled">Disabled</Label>
          <Input id="pg-input-disabled" disabled placeholder="Disabled" />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="pg-textarea">Message</Label>
          <Textarea id="pg-textarea" placeholder="Type a message..." />
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="pg-check" />
          <Label htmlFor="pg-check">Accept terms</Label>
        </div>
        <div className="flex items-center gap-2">
          <Switch id="pg-switch" />
          <Label htmlFor="pg-switch">Notifications</Label>
        </div>
        <RadioGroup defaultValue="a" className="md:col-span-2">
          <div className="flex items-center gap-2">
            <RadioGroupItem id="pg-r-a" value="a" />
            <Label htmlFor="pg-r-a">Option A</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem id="pg-r-b" value="b" />
            <Label htmlFor="pg-r-b">Option B</Label>
          </div>
        </RadioGroup>
      </div>
    </PlaygroundSection>
  );
}
