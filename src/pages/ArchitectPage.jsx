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

        {/* Results Section - UPGRADED */}
        {result && (
          <div className="space-y-12">
            {/* 1. Confidence Banner */}
            <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 text-white rounded-2xl p-8 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div>
                <div className="text-sm uppercase tracking-widest opacity-80 mb-2">CONFIDENCE SCORE</div>
                <div className="text-6xl font-bold tabular-nums">{result.confidence || 0}%</div>
              </div>
              
              <div className="text-right md:text-left">
                <div className="text-sm uppercase tracking-widest opacity-80 mb-1">Intent Detected</div>
                <div className="text-2xl font-medium">
                  {(result.intent?.aiTask && result.intent.aiTask !== 'unspecified')
                    ? `${result.intent.aiTask} Automation`
                    : (result.intent?.projectType && result.intent.projectType !== 'unspecified')
                      ? result.intent.projectType
                      : 'General Automation'}
                </div>
              </div>

              <Badge 
                variant="secondary" 
                className="text-sm px-6 py-2 bg-white/20 text-white border-white/30 self-start md:self-center"
              >
                Risk: {result.riskLevel || 'Medium'}
              </Badge>
            </div>

            {/* 2. Recommendations Grid */}
            <div>
              <h3 className="text-3xl font-semibold mb-8 text-gray-900">Recommendations</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Best Model */}
                <Card className="border-0 shadow-lg">
                  <CardHeader className="flex flex-row items-start justify-between">
                    <CardTitle>Best Model</CardTitle>
                    {result.recommendations?.model?.score && (
                      <Badge variant="default" className="bg-emerald-100 text-emerald-700">Score: {result.recommendations.model.score}</Badge>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm">
                    {result.recommendations?.model ? (
                      <>
                        <div><strong>Name:</strong> {result.recommendations.model.name}</div>
                        <div><strong>Provider:</strong> {result.recommendations.model.provider}</div>
                        <div><strong>Description:</strong> {result.recommendations.model.description}</div>
                        {result.recommendations.model.strengths?.length > 0 && (
                          <div>
                            <strong>Strengths:</strong>
                            <ul className="list-disc pl-5 mt-2 space-y-1">
                              {result.recommendations.model.strengths.map((s, i) => (
                                <li key={i}>{s}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </>
                    ) : (
                      <p className="text-gray-500">No model recommendation available.</p>
                    )}
                  </CardContent>
                </Card>

                {/* Best Tool */}
                <Card className="border-0 shadow-lg">
                  <CardHeader className="flex flex-row items-start justify-between">
                    <CardTitle>Best Tool</CardTitle>
                    {result.recommendations?.tool?.score && (
                      <Badge variant="default" className="bg-emerald-100 text-emerald-700">Score: {result.recommendations.tool.score}</Badge>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm">
                    {result.recommendations?.tool ? (
                      <>
                        <div><strong>Name:</strong> {result.recommendations.tool.name}</div>
                        <div><strong>Category:</strong> {result.recommendations.tool.category}</div>
                        <div><strong>Description:</strong> {result.recommendations.tool.description}</div>
                      </>
                    ) : (
                      <p className="text-gray-500">No tool recommendation available.</p>
                    )}
                  </CardContent>
                </Card>

                {/* Best Stack */}
                <Card className="border-0 shadow-lg">
                  <CardHeader className="flex flex-row items-start justify-between">
                    <CardTitle>Best Stack</CardTitle>
                    {result.recommendations?.stack?.score && (
                      <Badge variant="default" className="bg-emerald-100 text-emerald-700">Score: {result.recommendations.stack.score}</Badge>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm">
                    {result.recommendations?.stack ? (
                      <>
                        <div><strong>Title:</strong> {result.recommendations.stack.title}</div>
                        <div><strong>Description:</strong> {result.recommendations.stack.description}</div>
                        {result.recommendations.stack.tools?.[0]?.category && (
                          <div><strong>Category:</strong> {result.recommendations.stack.tools[0].category}</div>
                        )}
                      </>
                    ) : (
                      <p className="text-gray-500">No stack recommendation available.</p>
                    )}
                  </CardContent>
                </Card>

                {/* Best Workflow */}
                <Card className="border-0 shadow-lg">
                  <CardHeader className="flex flex-row items-start justify-between">
                    <CardTitle>Best Workflow</CardTitle>
                    {result.recommendations?.workflow?.score && (
                      <Badge variant="default" className="bg-emerald-100 text-emerald-700">Score: {result.recommendations.workflow.score}</Badge>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm">
                    {result.recommendations?.workflow ? (
                      <>
                        <div><strong>Title:</strong> {result.recommendations.workflow.title}</div>
                        <div><strong>Category:</strong> {result.recommendations.workflow.category}</div>
                        <div><strong>Description:</strong> {result.recommendations.workflow.description}</div>
                      </>
                    ) : (
                      <p className="text-gray-500">No workflow recommendation available.</p>
                    )}
                  </CardContent>
                </Card>

                {/* Best Prompt */}
                <Card className="border-0 shadow-lg md:col-span-2">
                  <CardHeader className="flex flex-row items-start justify-between">
                    <CardTitle>Best Prompt</CardTitle>
                    {result.recommendations?.prompt?.score && (
                      <Badge variant="default" className="bg-emerald-100 text-emerald-700">Score: {result.recommendations.prompt.score}</Badge>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm">
                    {result.recommendations?.prompt ? (
                      <>
                        <div><strong>Title:</strong> {result.recommendations.prompt.title}</div>
                        <div><strong>Category:</strong> {result.recommendations.prompt.category}</div>
                        <div>
                          <strong>Prompt:</strong>
                          <pre className="mt-2 bg-gray-50 p-4 rounded-xl text-xs overflow-auto border">
                            {result.recommendations.prompt.promptText}
                          </pre>
                        </div>
                      </>
                    ) : (
                      <p className="text-gray-500">No prompt recommendation available.</p>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* 3. Explanations */}
            <div>
              <h3 className="text-3xl font-semibold mb-8 text-gray-900">Explanations</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="border rounded-2xl p-6">
                  <div className="font-semibold mb-3 text-lg">Model Selection</div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {result.explanations?.model || "No explanation available."}
                  </p>
                </div>
                <div className="border rounded-2xl p-6">
                  <div className="font-semibold mb-3 text-lg">Tool Selection</div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {result.explanations?.tool || "No explanation available."}
                  </p>
                </div>
                <div className="border rounded-2xl p-6">
                  <div className="font-semibold mb-3 text-lg">Stack Fit</div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {result.explanations?.stack || "No explanation available."}
                  </p>
                </div>
              </div>
            </div>

            {/* 4. Decision Trace */}
            <div>
              <h3 className="text-3xl font-semibold mb-6 text-gray-900">Decision Trace</h3>
              
              <details className="mb-6 group">
                <summary className="cursor-pointer bg-white border rounded-2xl px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <span className="font-medium">Full Trace</span>
                  <span className="text-gray-400 group-open:rotate-180 transition-transform">↓</span>
                </summary>
                <pre className="mt-2 bg-gray-900 text-green-400 p-6 rounded-2xl overflow-auto text-xs font-mono leading-relaxed max-h-[500px]">
                  {JSON.stringify(result.decisionTrace, null, 2)}
                </pre>
              </details>

              <details className="group">
                <summary className="cursor-pointer bg-white border rounded-2xl px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <span className="font-medium">View Raw Intent Data</span>
                  <span className="text-gray-400 group-open:rotate-180 transition-transform">↓</span>
                </summary>
                <pre className="mt-2 bg-gray-900 text-green-400 p-6 rounded-2xl overflow-auto text-xs font-mono leading-relaxed max-h-[500px]">
                  {JSON.stringify(result.intent, null, 2)}
                </pre>
              </details>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArchitectPage;