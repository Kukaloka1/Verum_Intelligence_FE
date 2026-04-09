"use client";

import { Card } from "@/components/shared/Card";
import { PageHeader } from "@/components/layout/PageHeader";
import { useQueryFlow } from "@/hooks/useQueryFlow";
import { QueryHistoryPanel } from "./QueryHistoryPanel";
import { QueryInput } from "./QueryInput";
import { QueryResult } from "./QueryResult";

export function QueryPageShell() {
  const queryFlow = useQueryFlow();

  return (
    <div className="space-y-6 md:space-y-8">
      <PageHeader
        title="AI Query Interface"
        description="Natural-language legal and compliance questions with structured, citable answers."
      />

      <div className="grid gap-4 md:gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4 md:space-y-6">
          <Card className="border border-border bg-panel shadow-[var(--shadow)]">
            <QueryInput
              query={queryFlow.query}
              jurisdiction={queryFlow.jurisdiction}
              saveQuery={queryFlow.saveQuery}
              canSaveQuery={queryFlow.canSaveQuery}
              isLoading={queryFlow.isLoading}
              preSubmitWarning={queryFlow.preSubmitWarning}
              validationDetails={queryFlow.validationDetails}
              onQueryChange={queryFlow.setQuery}
              onJurisdictionChange={queryFlow.setJurisdiction}
              onSaveQueryChange={queryFlow.setSaveQuery}
              onSubmit={queryFlow.submitQuery}
              onResetForm={queryFlow.resetForm}
            />
          </Card>

          <Card className="border border-border bg-panel shadow-[var(--shadow)]">
            <QueryHistoryPanel
              entries={queryFlow.history}
              onUseEntry={queryFlow.applyHistoryEntry}
              onDeleteEntry={queryFlow.removeHistoryEntry}
            />
          </Card>
        </div>

        <Card className="border border-border bg-panel shadow-[var(--shadow)]">
          <QueryResult
            viewState={queryFlow.viewState}
            response={queryFlow.response}
            statusMessage={queryFlow.statusMessage}
            jurisdictionSelection={queryFlow.jurisdiction}
            onReset={queryFlow.resetToIdle}
          />
        </Card>
      </div>
    </div>
  );
}
