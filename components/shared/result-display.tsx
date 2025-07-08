import React from "react";
import ErrorInfo from "./error-info";

interface ResultDisplayProps<T extends APIBaseResponse> {
  isLoading: boolean;
  error: unknown;
  data: T | undefined | null;
  loadingComponent?: React.ReactNode;
  errorComponent?: React.ReactNode;
  children: (data: T) => React.ReactNode;
  loadingErrorMessage?: string;
  dataErrorMessage?: string;
}

const ResultDisplay = <T extends APIBaseResponse>({
  isLoading,
  error,
  data,
  loadingComponent,
  errorComponent,
  children,
  loadingErrorMessage = "Failed to load data. Please try again later.",
  dataErrorMessage = "An error occurred while fetching data.",
}: ResultDisplayProps<T>) => {
  if (isLoading) {
    return <>{loadingComponent || <div>Loading...</div>}</>;
  }

  if (error) {
    return (
      <>{errorComponent || <ErrorInfo errorMessage={loadingErrorMessage} />}</>
    );
  }

  if (data === undefined || data === null) {
    return (
      <>{errorComponent || <ErrorInfo errorMessage={dataErrorMessage} />}</>
    );
  }

  if (data.statusCode > 299) {
    return (
      <>
        {errorComponent || (
          <ErrorInfo errorMessage={data.message || dataErrorMessage} />
        )}
      </>
    );
  }

  return <>{children(data)}</>;
};

export default ResultDisplay;
