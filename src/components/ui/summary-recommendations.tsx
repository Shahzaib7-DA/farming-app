import { Info, CheckCircle2, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface SummaryRecommendationsProps {
  summary: string;
  dos: string[];
  donts: string[];
}

export function SummaryRecommendations({ summary, dos, donts }: SummaryRecommendationsProps) {
  return (
    <Card className="mt-4 border-primary/30 bg-primary/5 dark:bg-primary/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary">
          <Info className="h-5 w-5" /> Summary & Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-3 text-foreground/90">{summary}</div>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <div className="font-semibold text-success flex items-center gap-1 mb-1">
              <CheckCircle2 className="h-4 w-4" /> Dos
            </div>
            <ul className="list-disc list-inside text-sm text-success/90">
              {dos.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="flex-1">
            <div className="font-semibold text-destructive flex items-center gap-1 mb-1">
              <XCircle className="h-4 w-4" /> Don'ts
            </div>
            <ul className="list-disc list-inside text-sm text-destructive/80">
              {donts.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
