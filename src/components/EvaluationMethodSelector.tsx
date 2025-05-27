import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Brain, Cpu } from "lucide-react";

export type EvaluationMethod = 'deterministic' | 'llm';

interface EvaluationMethodSelectorProps {
  value: EvaluationMethod;
  onChange: (value: EvaluationMethod) => void;
}

export const EvaluationMethodSelector = ({ value, onChange }: EvaluationMethodSelectorProps) => {
  return (
    <div className="space-y-4">
      <Label className="text-base font-medium">Evaluation Method</Label>
      <RadioGroup
        value={value}
        onValueChange={(value) => onChange(value as EvaluationMethod)}
        className="grid grid-cols-2 gap-4"
      >
        <div>
          <RadioGroupItem
            value="deterministic"
            id="deterministic"
            className="peer sr-only"
          />
          <Label
            htmlFor="deterministic"
            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
          >
            <Cpu className="mb-3 h-6 w-6" />
            <div className="space-y-1 text-center">
              <p className="text-sm font-medium leading-none">Rule-Based</p>
              <p className="text-xs text-muted-foreground">
                Fast, deterministic evaluation
              </p>
            </div>
          </Label>
        </div>
        <div>
          <RadioGroupItem
            value="llm"
            id="llm"
            className="peer sr-only"
          />
          <Label
            htmlFor="llm"
            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
          >
            <Brain className="mb-3 h-6 w-6" />
            <div className="space-y-1 text-center">
              <p className="text-sm font-medium leading-none">AI-Powered</p>
              <p className="text-xs text-muted-foreground">
                Advanced LLM evaluation
              </p>
            </div>
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
}; 