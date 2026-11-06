import { useEffect, useRef } from "react";

function AuthFormShell({
  title,
  onSubmit,
  error,
  loading,
  submitText,
  loadingText,
  children,
  errorId,
  headingId,
  ariaDescribedBy,
  ariaInvalid,
}) {
  const errorRef = useRef(null);

  useEffect(() => {
    if (error) {
      errorRef.current?.focus();
    }
  }, [error]);

  return (
    <form
      onSubmit={onSubmit}
      aria-describedby={error ? ariaDescribedBy ?? errorId : undefined}
      aria-invalid={ariaInvalid ?? Boolean(error)}
      className="flex flex-col gap-5 rounded-[5px] bg-navy-900 px-5 py-6 shadow-[0_35px_50px_rgba(0,0,0,0.5)] tablet:gap-6 tablet:p-6 light:bg-white light:shadow-[0_35px_50px_rgba(194,195,214,0.5)]"
    >
      <h2
        id={headingId}
        tabIndex={-1}
        className="text-[24px] font-bold leading-base text-purple-100 tablet:text-[32px] light:text-navy-850"
      >
        {title}
      </h2>

      {error && (
        <div
          id={errorId}
          ref={errorRef}
          tabIndex={-1}
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          className="rounded-[5px] border border-red-600 bg-red-900/30 px-4 py-2 text-[14px] text-red-400 outline-none focus-visible:ring-2 focus-visible:ring-red-300"
        >
          {error}
        </div>
      )}

      <div className="flex flex-col gap-4 text-[14px] leading-base text-purple-300 tablet:gap-5 tablet:text-[18px] light:text-navy-850">
        {children}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="cursor-pointer rounded-[5px] bg-blue-500 p-3 text-[14px] font-bold leading-base text-white transition-all hover:bg-blue-400 disabled:cursor-not-allowed disabled:opacity-50 tablet:pt-3.75 tablet:text-[18px]"
      >
        {loading ? loadingText : submitText}
      </button>
    </form>
  );
}

export default AuthFormShell;
