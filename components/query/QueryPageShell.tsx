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
    <div className="mx-auto w-full max-w-[1500px] space-y-8 md:space-y-12">
      <PageHeader
        title="AI Query Interface"
        description="Natural-language legal and compliance questions with structured, citable answers."
      />

      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-10 xl:gap-12">
        <div className="flex flex-col gap-6 md:gap-8 lg:col-span-6">
          <Card className="border border-border bg-panel overflow-hidden shadow-[var(--shadow)]">
            <QueryInput
              query={queryFlow.query}
              queryPlaceholder={queryFlow.queryPlaceholder}
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

          <Card className="border border-border bg-panel overflow-hidden shadow-[var(--shadow)]">
            <QueryHistoryPanel
              entries={queryFlow.history}
              onUseEntry={queryFlow.applyHistoryEntry}
              onDeleteEntry={queryFlow.removeHistoryEntry}
            />
          </Card>
        </div>

        <Card className="flex min-h-[600px] flex-col overflow-hidden border border-border bg-panel shadow-[var(--shadow)] lg:col-span-6 lg:sticky lg:top-8">
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
