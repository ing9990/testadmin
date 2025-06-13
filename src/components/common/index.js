// src/components/common/index.js

import React from 'react';
import {componentPresets, theme} from '../../styles/theme';

// Card 컴포넌트
export const Card = ({children, className, style, ...props}) => {
  return (
      <div
          className={className}
          style={{
            ...componentPresets.card.base,
            ...style
          }}
          {...props}
      >
        {children}
      </div>
  );
};

// CardHeader 컴포넌트
export const CardHeader = ({children, style, ...props}) => {
  return (
      <div
          style={{
            padding: theme.spacing[6],
            borderBottom: `1px solid ${theme.colors.neutral[200]}`,
            ...style
          }}
          {...props}
      >
        {children}
      </div>
  );
};

// CardContent 컴포넌트
export const CardContent = ({children, style, ...props}) => {
  return (
      <div
          style={{
            padding: theme.spacing[6],
            ...style
          }}
          {...props}
      >
        {children}
      </div>
  );
};

// Button 컴포넌트
export const Button = ({
  variant = 'primary',
  size = 'md',
  children,
  icon: Icon,
  iconPosition = 'left',
  loading = false,
  disabled = false,
  style,
  onClick,
  ...props
}) => {
  const sizeStyles = {
    sm: {
      padding: `${theme.spacing[2]} ${theme.spacing[3]}`,
      fontSize: theme.fontSize.xs[0]
    },
    md: {
      padding: `${theme.spacing[3]} ${theme.spacing[5]}`,
      fontSize: theme.fontSize.sm[0]
    },
    lg: {
      padding: `${theme.spacing[4]} ${theme.spacing[6]}`,
      fontSize: theme.fontSize.base[0]
    }
  };

  const variantStyles = componentPresets.button[variant]
      || componentPresets.button.primary;

  return (
      <button
          style={{
            ...componentPresets.button.base,
            ...variantStyles,
            ...sizeStyles[size],
            opacity: disabled || loading ? 0.6 : 1,
            cursor: disabled || loading ? 'not-allowed' : 'pointer',
            ...style
          }}
          disabled={disabled || loading}
          onClick={onClick}
          {...props}
      >
        {loading ? (
            <Spinner size={16}/>
        ) : (
            <>
              {Icon && iconPosition === 'left' && <Icon size={16}/>}
              {children}
              {Icon && iconPosition === 'right' && <Icon size={16}/>}
            </>
        )}
      </button>
  );
};

// Badge 컴포넌트
export const Badge = ({
  variant = 'primary',
  children,
  icon: Icon,
  style,
  ...props
}) => {
  const variantStyles = componentPresets.badge[variant]
      || componentPresets.badge.primary;

  return (
      <span
          style={{
            ...componentPresets.badge.base,
            ...variantStyles,
            ...style
          }}
          {...props}
      >
      {Icon && <Icon size={14}/>}
        {children}
    </span>
  );
};

// Dropdown 컴포넌트
export const Dropdown = ({
  trigger,
  children,
  isOpen,
  onToggle,
  position = 'bottom-right',
  style,
  ...props
}) => {
  const positionStyles = {
    'bottom-right': {
      top: '100%',
      right: 0,
      marginTop: theme.spacing[2]
    },
    'bottom-left': {
      top: '100%',
      left: 0,
      marginTop: theme.spacing[2]
    },
    'top-right': {
      bottom: '100%',
      right: 0,
      marginBottom: theme.spacing[2]
    },
    'top-left': {
      bottom: '100%',
      left: 0,
      marginBottom: theme.spacing[2]
    }
  };

  return (
      <div style={{position: 'relative', ...style}} {...props}>
        <div onClick={onToggle}>
          {trigger}
        </div>
        {isOpen && (
            <>
              <div
                  style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 40
                  }}
                  onClick={onToggle}
              />
              <div
                  style={{
                    position: 'absolute',
                    ...positionStyles[position],
                    backgroundColor: 'white',
                    borderRadius: theme.borderRadius.lg,
                    boxShadow: theme.shadows.xl,
                    border: `1px solid ${theme.colors.neutral[200]}`,
                    minWidth: '200px',
                    zIndex: 50
                  }}
                  onClick={(e) => e.stopPropagation()}
              >
                {children}
              </div>
            </>
        )}
      </div>
  );
};

// Table 컴포넌트
export const Table = ({children, style, ...props}) => {
  return (
      <div style={componentPresets.table.container}>
        <table
            style={{
              ...componentPresets.table.base,
              ...style
            }}
            {...props}
        >
          {children}
        </table>
      </div>
  );
};

// TableHeader 컴포넌트
export const TableHeader = ({children, style, ...props}) => {
  return (
      <thead
          style={{
            ...componentPresets.table.header,
            ...style
          }}
          {...props}
      >
      {children}
      </thead>
  );
};

// TableRow 컴포넌트
export const TableRow = ({children, hoverable = true, style, ...props}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
      <tr
          style={{
            ...componentPresets.table.row,
            backgroundColor: isHovered && hoverable ? theme.colors.neutral[50]
                : 'transparent',
            ...style
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          {...props}
      >
        {children}
      </tr>
  );
};

// TableCell 컴포넌트
export const TableCell = ({
  header = false,
  align = 'left',
  children,
  style,
  ...props
}) => {
  const Tag = header ? 'th' : 'td';
  const baseStyle = header ? componentPresets.table.headerCell
      : componentPresets.table.cell;

  return (
      <Tag
          style={{
            ...baseStyle,
            textAlign: align,
            ...style
          }}
          {...props}
      >
        {children}
      </Tag>
  );
};

// Spinner 컴포넌트
export const Spinner = ({
  size = 20,
  color = theme.colors.primary[600],
  style,
  ...props
}) => {
  return (
      <div
          style={{
            width: size,
            height: size,
            border: `2px solid ${theme.colors.neutral[200]}`,
            borderTopColor: color,
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            ...style
          }}
          {...props}
      />
  );
};

// EmptyState 컴포넌트
export const EmptyState = ({
  icon: Icon,
  title,
  description,
  action,
  style,
  ...props
}) => {
  return (
      <div
          style={{
            padding: `${theme.spacing[20]} ${theme.spacing[6]}`,
            textAlign: 'center',
            ...style
          }}
          {...props}
      >
        {Icon && (
            <div
                style={{
                  width: '80px',
                  height: '80px',
                  backgroundColor: `${theme.colors.neutral[100]}`,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: `0 auto ${theme.spacing[6]}`
                }}
            >
              <Icon size={32} style={{color: theme.colors.neutral[400]}}/>
            </div>
        )}
        {title && (
            <h3
                style={{
                  fontSize: theme.fontSize.lg[0],
                  fontWeight: theme.fontWeight.semibold,
                  color: theme.colors.neutral[900],
                  margin: `0 0 ${theme.spacing[2]} 0`
                }}
            >
              {title}
            </h3>
        )}
        {description && (
            <p
                style={{
                  fontSize: theme.fontSize.sm[0],
                  color: theme.colors.neutral[600],
                  margin: `0 0 ${theme.spacing[6]} 0`
                }}
            >
              {description}
            </p>
        )}
        {action}
      </div>
  );
};

// StatCard 컴포넌트
export const StatCard = ({
  icon: Icon,
  label,
  value,
  subValue,
  trend,
  color = theme.colors.primary[600],
  style,
  ...props
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
      <div
          style={{
            padding: theme.spacing[5],
            backgroundColor: `${color}10`,
            border: `1px solid ${color}30`,
            borderRadius: theme.borderRadius.lg,
            transition: `all ${theme.transitions.normal} ease`,
            cursor: 'pointer',
            transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
            boxShadow: isHovered ? theme.shadows.lg : theme.shadows.sm,
            ...style
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          {...props}
      >
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between'
        }}>
          <div style={{flex: 1}}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: theme.spacing[3],
              marginBottom: theme.spacing[2]
            }}>
              {Icon && (
                  <div
                      style={{
                        width: '40px',
                        height: '40px',
                        backgroundColor: color,
                        borderRadius: theme.borderRadius.lg,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                  >
                    <Icon size={20} style={{color: 'white'}}/>
                  </div>
              )}
              <span
                  style={{
                    fontSize: theme.fontSize.sm[0],
                    fontWeight: theme.fontWeight.medium,
                    color: theme.colors.neutral[600]
                  }}
              >
              {label}
            </span>
            </div>
            <div
                style={{
                  fontSize: theme.fontSize['2xl'][0],
                  fontWeight: theme.fontWeight.bold,
                  color: theme.colors.neutral[900],
                  marginBottom: theme.spacing[1]
                }}
            >
              {value}
            </div>
            {subValue && (
                <div
                    style={{
                      fontSize: theme.fontSize.xs[0],
                      color: theme.colors.neutral[500]
                    }}
                >
                  {subValue}
                </div>
            )}
          </div>
          {trend !== undefined && (
              <Badge
                  variant={trend > 0 ? 'success' : 'danger'}
                  style={{alignSelf: 'flex-start'}}
              >
                {trend > 0 ? '+' : ''}{trend}%
              </Badge>
          )}
        </div>
      </div>
  );
};

// CSS 애니메이션 추가
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
  `;
  document.head.appendChild(style);
}

export default {
  Card,
  CardHeader,
  CardContent,
  Button,
  Badge,
  Dropdown,
  Table,
  TableHeader,
  TableRow,
  TableCell,
  Spinner,
  EmptyState,
  StatCard
};