import React from 'react';

interface PlaceholderProps {
  label: string;
  type?: 'avatar' | 'image' | 'block' | 'inline';
  height?: string | number;
  width?: string | number;
  className?: string;
  hint?: string;
}

export const Placeholder: React.FC<PlaceholderProps> = ({
  label,
  type = 'block',
  height,
  width,
  className = '',
  hint,
}) => {
  const typeClass =
    type === 'avatar'
      ? 'wf-placeholder wf-placeholder-avatar'
      : type === 'image'
      ? 'wf-placeholder wf-placeholder-image'
      : 'wf-placeholder';

  const style: React.CSSProperties = {
    ...(height ? { height } : {}),
    ...(width ? { width } : {}),
  };

  return (
    <div
      className={`${typeClass} ${className}`}
      style={style}
      role="img"
      aria-label={label}
      data-placeholder-type={type}
    >
      <div>
        <strong>{label}</strong>
        {hint && <div style={{ fontSize: '0.75rem', marginTop: '0.25rem', opacity: 0.8 }}>{hint}</div>}
      </div>
    </div>
  );
};

