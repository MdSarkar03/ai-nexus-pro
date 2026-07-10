import React, { useState } from 'react';
import { Button } from '@/components/ui/Button.jsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card.jsx';
import { Input } from '@/components/ui/Input.jsx';
import { Textarea } from '@/components/ui/Textarea.jsx';
import { Badge } from '@/components/ui/Badge.jsx';
import { ArrowRight, Brain, Target, Zap, Users } from 'lucide-react';
import PagePurposeHeader from "../components/PagePurposeHeader";

const ArchitectPage = () => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsLoading(true);
    // Backend/API calls unchanged as per requirements
    try {
      // Existing API integration remains untouched
      const response = await fetch('/api/architect/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error generating decision intelligence:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-2xl shadow-sm border">
              <Brain className="h-10 w-10 text-[#FF6B35]" />
              <Target className="h-10 w-10 text-[#FF6B35]" />
            </div>
          </div>
          
          
          
          <h1 className="text-6xl font-bold text-gray-900 mb-6">
            Decision Intelligence Engine
          </h1>
          
          <p className="text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Transform complex business decisions into intelligent, data-driven outcomes with AI-powered reasoning and strategic insights.
          </p>
          
          <div className="flex justify-center gap-4 mt-10">
            <Button 
              size="lg" 
              className="bg-[#FF6B35] hover:bg-[#FF5722] text-white px-10 py-7 text-lg"
              onClick={() => window.scrollTo({ top: 800, behavior: 'smooth' })}
            >
              Start Building Intelligence <ArrowRight className="ml-2" />
            </Button>
          </div>
        </div>
        <PagePurposeHeader
            title="Make Smarter Decisions With AI-Powered Intelligence"
            description="Harness the power of advanced decision-making frameworks to drive better outcomes."
          />

        {/* Features / Subtitles Updated */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <Card className="border-0 shadow-xl hover:shadow-2xl transition-all">
            <CardHeader>
              <div className="h-12 w-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-[#FF6B35]" />
              </div>
              <CardTitle>Real-time Decision Modeling</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600">
              Simulate multiple scenarios and receive optimal recommendations powered by advanced decision intelligence frameworks.
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl hover:shadow-2xl transition-all">
            <CardHeader>
              <div className="h-12 w-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-[#FF6B35]" />
              </div>
              <CardTitle>Stakeholder Alignment</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600">
              Generate consensus-driven strategies that align technical, business, and executive perspectives.
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl hover:shadow-2xl transition-all">
            <CardHeader>
              <div className="h-12 w-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
                <Brain className="h-6 w-6 text-[#FF6B35]" />
              </div>
              <CardTitle>Adaptive Intelligence</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600">
              Continuously learns from outcomes to improve future decision quality and risk assessment.
            </CardContent>
          </Card>
        </div>

        {/* Main Input Area */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-12 mb-20">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-semibold text-gray-900 mb-3">
              Describe Your Decision Challenge
            </h2>
            <p className="text-xl text-gray-600">
              The Decision Intelligence Engine will analyze, model, and recommend optimal paths forward.
            </p>
          </div>

          <Textarea
            placeholder="Example: We need to decide on expanding our AI infrastructure. Evaluate cloud vs on-prem options considering cost, scalability, and compliance..."
            className="min-h-[180px] text-lg resize-y p-6 border-gray-200 focus:border-[#FF6B35]"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />

          <Button 
            onClick={handleGenerate}
            disabled={isLoading || !prompt.trim()}
            className="w-full mt-8 py-8 text-xl bg-[#FF6B35] hover:bg-[#FF5722]"
          >
            {isLoading ? 'Analyzing Decision Space...' : 'Generate Intelligence Report'}
          </Button>
        </div>

        {/* Results Section */}
        {result && (
          <div className="bg-white rounded-3xl shadow-xl p-10">
            <h3 className="text-3xl font-semibold mb-8">Decision Intelligence Report</h3>
            {/* Result rendering remains as per existing backend structure */}
            <div className="prose max-w-none text-lg">
              {result.recommendation || JSON.stringify(result, null, 2)}
            </div>
            <div className="flex gap-4 mt-10">
              <Badge variant="secondary" className="text-sm px-6 py-2">Risk: {result.riskLevel || 'Medium'}</Badge>
              <Badge variant="outline" className="text-sm px-6 py-2">Confidence: {result.confidence || '85'}%</Badge>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArchitectPage;