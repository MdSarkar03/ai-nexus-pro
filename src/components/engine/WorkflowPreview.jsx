import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/Card.jsx";
import { cn } from "../../lib/utils.js";
import { Play, ArrowRight, AlertCircle } from "lucide-react";

const WorkflowPreview = ({ workflow }) => {
  // Safe handling for missing or invalid workflow
  if (!workflow) {
    return (
      <Card className="w-full">
        <CardContent className="p-8 text-center">
          <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <AlertCircle className="w-6 h-6 text-gray-400" />
          </div>
          <CardTitle className="text-gray-900 mb-2">No Workflow Selected</CardTitle>
          <CardDescription className="text-gray-500">
            Select or generate a workflow to see the preview here.
          </CardDescription>
        </CardContent>
      </Card>
    );
  }

  const { title, steps = [], description, category, difficulty } = workflow;

  // Handle empty steps array
  if (!steps.length) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-xl">{title || "Untitled Workflow"}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
        <CardContent className="p-8 text-center">
          <div className="mx-auto w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4">
            <AlertCircle className="w-6 h-6 text-amber-500" />
          </div>
          <p className="text-gray-600">This workflow has no steps defined.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full overflow-hidden border border-gray-200 shadow-sm">
      <CardHeader className="bg-gradient-to-r from-orange-50 to-white border-b">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-3">
              {category && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-700">
                  {category}
                </span>
              )}
              {difficulty && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                  {difficulty}
                </span>
              )}
            </div>
            <CardTitle className="text-2xl text-gray-900 leading-tight">
              {title || "Workflow Preview"}
            </CardTitle>
            {description && (
              <CardDescription className="mt-2 text-base text-gray-600">
                {description}
              </CardDescription>
            )}
          </div>
          <div className="hidden sm:flex items-center justify-center w-10 h-10 bg-orange-100 rounded-full text-orange-600">
            <Play className="w-5 h-5" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <div className="mb-4 flex items-center justify-between text-sm text-gray-500">
          <div className="font-medium flex items-center gap-2">
            <span>Step-by-Step Sequence</span>
            <span className="px-2 py-0.5 bg-gray-100 rounded text-xs font-mono">
              {steps.length} steps
            </span>
          </div>
        </div>

        <div className="space-y-4">
          {steps.map((step, index) => (
            <div
              key={step.stepNumber || index}
              className={cn(
                "group relative flex gap-4 p-5 rounded-2xl border border-gray-100 hover:border-orange-200 bg-white transition-all duration-200 hover:shadow-sm",
                "focus-within:ring-2 focus-within:ring-orange-200"
              )}
            >
              {/* Step Number */}
              <div className="shrink-0 flex flex-col items-center pt-1">
                <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white font-semibold text-sm shadow-sm">
                  {step.stepNumber || index + 1}
                </div>
                {index < steps.length - 1 && (
                  <div className="w-px h-8 bg-gray-200 mt-3 group-hover:bg-orange-200 transition-colors" />
                )}
              </div>

              {/* Step Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3">
                  <h4 className="font-semibold text-gray-900 text-[17px] leading-tight pr-2">
                    {step.title}
                  </h4>
                  {step.toolName && (
                    <a
                      href={step.toolUrl || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 text-xs px-3 py-1 bg-white border border-gray-200 hover:border-orange-300 rounded-full text-orange-600 hover:text-orange-700 transition-colors flex items-center gap-1 whitespace-nowrap"
                    >
                      {step.toolName}
                      <ArrowRight className="w-3 h-3" />
                    </a>
                  )}
                </div>

                {step.description && (
                  <p className="mt-2.5 text-gray-600 text-[15px] leading-relaxed">
                    {step.description}
                  </p>
                )}

                {step.promptTemplate && (
                  <div className="mt-4 bg-gray-50 border border-gray-100 rounded-xl p-4 text-sm">
                    <div className="uppercase tracking-widest text-[10px] font-mono text-gray-500 mb-1.5">Prompt Template</div>
                    <pre className="text-gray-700 whitespace-pre-wrap text-xs font-light overflow-auto max-h-32">
                      {step.promptTemplate}
                    </pre>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {workflow.tags && workflow.tags.length > 0 && (
          <div className="mt-8 pt-6 border-t border-gray-100">
            <div className="text-xs uppercase tracking-widest text-gray-500 mb-3">Tags</div>
            <div className="flex flex-wrap gap-2">
              {workflow.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="inline-block bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WorkflowPreview;