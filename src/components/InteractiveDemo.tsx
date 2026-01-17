"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Step = "resources" | "fields" | "endpoints" | "generate";

const steps: { id: Step; label: string; number: string }[] = [
  { id: "resources", label: "Define Resources", number: "1" },
  { id: "fields", label: "Add Fields", number: "2" },
  { id: "endpoints", label: "Configure Endpoints", number: "3" },
  { id: "generate", label: "Generate", number: "4" },
];

export function InteractiveDemo() {
  const [currentStep, setCurrentStep] = useState<Step>("resources");

  return (
    <section id="demo" className="relative py-24 px-6 bg-zinc-950">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            See how it works
          </h2>
          <p className="text-zinc-400 max-w-xl mx-auto">
            Design your API in minutes. Click through the steps to see the
            wizard in action.
          </p>
        </motion.div>

        {/* Demo container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative"
        >
          {/* Glow effect */}
          <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-blue-500/10 rounded-2xl blur-xl opacity-50" />

          {/* Demo window */}
          <div className="relative bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
            {/* Window header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800 bg-zinc-900/80">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <span className="text-xs text-zinc-500 font-mono">
                InstAPI Designer
              </span>
              <div className="w-16" />
            </div>

            {/* Step navigation */}
            <div className="flex border-b border-zinc-800 overflow-x-auto">
              {steps.map((step) => (
                <button
                  key={step.id}
                  onClick={() => setCurrentStep(step.id)}
                  className={`relative flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
                    currentStep === step.id
                      ? "text-white bg-zinc-800/50"
                      : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  {/* Gradient bottom border for active */}
                  {currentStep === step.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500" />
                  )}
                  <span
                    className={`w-5 h-5 flex items-center justify-center rounded text-xs font-bold ${
                      currentStep === step.id
                        ? "bg-gradient-to-br from-emerald-700 to-cyan-700 text-white"
                        : "bg-zinc-700 text-zinc-400"
                    }`}
                  >
                    {step.number}
                  </span>
                  <span className="hidden sm:inline">{step.label}</span>
                </button>
              ))}
            </div>

            {/* Content area */}
            <div className="p-6 min-h-[400px]">
              <AnimatePresence mode="wait">
                {currentStep === "resources" && <ResourcesStep key="resources" />}
                {currentStep === "fields" && <FieldsStep key="fields" />}
                {currentStep === "endpoints" && <EndpointsStep key="endpoints" />}
                {currentStep === "generate" && <GenerateStep key="generate" />}
              </AnimatePresence>
            </div>

            {/* Navigation buttons */}
            <div className="flex justify-between px-6 py-4 border-t border-zinc-800 bg-zinc-900/80">
              <button
                onClick={() => {
                  const currentIndex = steps.findIndex(
                    (s) => s.id === currentStep
                  );
                  if (currentIndex > 0) {
                    setCurrentStep(steps[currentIndex - 1].id);
                  }
                }}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  currentStep === "resources"
                    ? "text-zinc-600 cursor-not-allowed"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-800"
                }`}
                disabled={currentStep === "resources"}
              >
                Back
              </button>
              {currentStep === "generate" ? (
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 rounded-lg blur opacity-60 group-hover:opacity-100 transition-opacity" />
                  <button
                    onClick={() => {
                      const currentIndex = steps.findIndex(
                        (s) => s.id === currentStep
                      );
                      if (currentIndex < steps.length - 1) {
                        setCurrentStep(steps[currentIndex + 1].id);
                      }
                    }}
                    className="relative px-6 py-2 text-sm font-semibold rounded-lg bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 text-white transition-all hover:scale-[1.02]"
                  >
                    Generate Code
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    const currentIndex = steps.findIndex(
                      (s) => s.id === currentStep
                    );
                    if (currentIndex < steps.length - 1) {
                      setCurrentStep(steps[currentIndex + 1].id);
                    }
                  }}
                  className="px-4 py-2 text-sm font-medium rounded-lg bg-zinc-800 text-white hover:bg-zinc-700 transition-colors"
                >
                  Next Step
                </button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Call to action */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center text-zinc-500 text-sm mt-8"
        >
          This is a preview. Join the waitlist to be first when we launch.
        </motion.p>
      </div>
    </section>
  );
}

function ResourcesStep() {
  const resourceGradients = [
    "from-emerald-600 to-teal-600",
    "from-cyan-700 to-blue-600",
    "from-blue-600 to-violet-600",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.2 }}
    >
      <h3 className="text-lg font-semibold text-white mb-2">
        Define your resources
      </h3>
      <p className="text-sm text-zinc-500 mb-6">
        What entities will your API manage? Add them here.
      </p>

      <div className="space-y-3 mb-6">
        {["users", "products", "orders"].map((resource, index) => (
          <div
            key={resource}
            className="flex items-center gap-3 px-4 py-3 bg-zinc-800/50 border border-zinc-700/50 rounded-lg hover:border-zinc-600/50 transition-colors"
          >
            <div
              className={`w-8 h-8 flex items-center justify-center rounded bg-gradient-to-br ${resourceGradients[index]} text-white`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
              </svg>
            </div>
            <span className="text-white font-mono">{resource}</span>
            <span className="text-xs text-zinc-500 ml-auto">
              {index === 0 ? "3 fields" : index === 1 ? "5 fields" : "4 fields"}
            </span>
          </div>
        ))}
      </div>

      <button className="flex items-center gap-2 px-4 py-2 text-sm text-zinc-400 border border-dashed border-zinc-700 rounded-lg hover:border-emerald-500/50 hover:text-emerald-400 transition-colors w-full justify-center group">
        <svg className="w-4 h-4 group-hover:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        Add resource
      </button>
    </motion.div>
  );
}

function FieldsStep() {
  const fields = [
    { name: "id", type: "uuid", required: true },
    { name: "email", type: "string", required: true },
    { name: "name", type: "string", required: true },
    { name: "role", type: "enum", required: false },
    { name: "createdAt", type: "datetime", required: true },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center gap-2 mb-6">
        <h3 className="text-lg font-semibold text-white">Configure fields for</h3>
        <span className="px-2 py-1 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 text-emerald-400 font-mono text-sm rounded">
          users
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-xs text-zinc-500 border-b border-zinc-800">
              <th className="pb-3 font-medium">Field</th>
              <th className="pb-3 font-medium">Type</th>
              <th className="pb-3 font-medium">Required</th>
              <th className="pb-3 font-medium"></th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {fields.map((field) => (
              <tr key={field.name} className="border-b border-zinc-800/50">
                <td className="py-3">
                  <span className="text-white font-mono">{field.name}</span>
                </td>
                <td className="py-3">
                  <span className="px-2 py-1 bg-zinc-800 text-zinc-400 text-xs rounded">
                    {field.type}
                  </span>
                </td>
                <td className="py-3">
                  <div
                    className={`w-4 h-4 rounded flex items-center justify-center ${
                      field.required
                        ? "bg-gradient-to-br from-emerald-600 to-teal-600"
                        : "bg-zinc-700"
                    }`}
                  >
                    {field.required && (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </td>
                <td className="py-3">
                  <button className="text-zinc-600 hover:text-zinc-400">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button className="mt-4 flex items-center gap-2 px-3 py-2 text-sm text-zinc-400 hover:text-emerald-400 transition-colors group">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        Add field
      </button>
    </motion.div>
  );
}

function EndpointsStep() {
  const endpoints = [
    { method: "GET", path: "/users", auth: true, description: "List all users" },
    { method: "GET", path: "/users/:id", auth: true, description: "Get user by ID" },
    { method: "POST", path: "/users", auth: true, description: "Create user" },
    { method: "PUT", path: "/users/:id", auth: true, description: "Update user" },
    { method: "DELETE", path: "/users/:id", auth: true, description: "Delete user" },
  ];

  const methodColors: Record<string, string> = {
    GET: "text-emerald-400 bg-emerald-400/10",
    POST: "text-blue-400 bg-blue-400/10",
    PUT: "text-amber-400 bg-amber-400/10",
    DELETE: "text-red-400 bg-red-400/10",
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white">Endpoints</h3>
          <p className="text-sm text-zinc-500">
            Select which operations to generate
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-zinc-500">
          <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          Auth required
        </div>
      </div>

      <div className="space-y-2">
        {endpoints.map((endpoint) => (
          <div
            key={`${endpoint.method}-${endpoint.path}`}
            className="flex items-center gap-3 px-4 py-3 bg-zinc-800/30 border border-zinc-800 rounded-lg"
          >
            <input
              type="checkbox"
              defaultChecked
              className="w-4 h-4 rounded border-zinc-600 bg-zinc-800 text-emerald-500 focus:ring-emerald-500/50"
            />
            <span
              className={`px-2 py-0.5 text-xs font-mono font-medium rounded ${
                methodColors[endpoint.method]
              }`}
            >
              {endpoint.method}
            </span>
            <span className="text-white font-mono text-sm">{endpoint.path}</span>
            <span className="text-zinc-500 text-sm ml-auto hidden sm:inline">
              {endpoint.description}
            </span>
            {endpoint.auth && (
              <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function GenerateStep() {
  const summaryItems = [
    {
      label: "Resources",
      value: "3 resources",
      subtext: "users, products, orders",
      gradient: "from-emerald-500 to-cyan-500",
    },
    {
      label: "Endpoints",
      value: "15 endpoints",
      subtext: "All CRUD operations",
      gradient: "from-cyan-500 to-blue-500",
    },
    {
      label: "Authentication",
      value: "JWT",
      subtext: "With refresh tokens",
      gradient: "from-blue-500 to-violet-500",
    },
    {
      label: "Output",
      value: "Node.js / Express",
      subtext: "TypeScript + Prisma",
      gradient: "from-violet-500 to-pink-500",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.2 }}
    >
      <h3 className="text-lg font-semibold text-white mb-2">Ready to generate</h3>
      <p className="text-sm text-zinc-500 mb-6">
        Review your configuration and generate your backend.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {summaryItems.map((item) => (
          <div
            key={item.label}
            className="relative p-4 bg-zinc-800/30 border border-zinc-800/50 rounded-lg overflow-hidden"
          >
            {/* Gradient accent */}
            <div
              className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${item.gradient}`}
            />
            <span className="text-xs text-zinc-500 block mb-1 pl-3">
              {item.label}
            </span>
            <span className="text-white font-semibold pl-3 block">
              {item.value}
            </span>
            <span className="text-zinc-500 text-sm pl-3 block">
              {item.subtext}
            </span>
          </div>
        ))}
      </div>

      {/* Gradient border info box */}
      <div className="relative overflow-hidden rounded-lg">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-blue-500/20" />
        <div className="absolute inset-[1px] bg-zinc-900/90 rounded-lg" />
        <div className="relative p-4">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 flex items-center justify-center rounded-full bg-gradient-to-br from-emerald-600 to-teal-600 flex-shrink-0">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div>
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent font-medium block">
                Included in your export
              </span>
              <span className="text-sm text-zinc-400">
                Routes, controllers, Prisma schema, JWT auth middleware, Zod
                validation, tests, Docker config, OpenAPI spec
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
