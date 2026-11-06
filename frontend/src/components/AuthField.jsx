function AuthField({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  autoComplete,
  minLength,
  maxLength,
  required = false,
  className = "",
  ...props
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-[14px] leading-base text-purple-300 tablet:text-[18px] light:text-navy-850">
        {label}
      </label>

      <input
        id={id}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        minLength={minLength}
        maxLength={maxLength}
        required={required}
        className={[
          "rounded-[5px] border border-purple-700 bg-navy-950/80 px-4 py-3 text-purple-100 transition-all placeholder:text-purple-600 tablet:py-3.5 hover:border-blue-500 focus:border-blue-500 focus:outline-none light:border-purple-300 light:bg-white light:text-navy-850 light:placeholder:text-purple-300",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      />
    </div>
  );
}

export default AuthField;
