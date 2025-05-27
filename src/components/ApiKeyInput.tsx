import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Key } from 'lucide-react';

interface ApiKeyInputProps {
  onApiKeySet: (apiKey: string) => void;
}

export const ApiKeyInput = ({ onApiKeySet }: ApiKeyInputProps) => {
  const [apiKey, setApiKey] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKey.trim()) {
      setError('Please enter your Anthropic API key');
      return;
    }
    onApiKeySet(apiKey.trim());
  };

  return (
    <div className="space-y-4">
      <Alert>
        <Key className="h-4 w-4" />
        <AlertDescription>
          To use AI-powered evaluation, please enter your Anthropic API key.
          You can get one from the <a href="https://console.anthropic.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Anthropic Console</a>.
        </AlertDescription>
      </Alert>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="apiKey">Anthropic API Key</Label>
          <Input
            id="apiKey"
            type="password"
            value={apiKey}
            onChange={(e) => {
              setApiKey(e.target.value);
              setError('');
            }}
            placeholder="sk-ant-..."
            className="font-mono"
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
        <Button type="submit" className="w-full">
          Save API Key
        </Button>
      </form>
    </div>
  );
}; 