import React, { useState, cloneElement, isValidElement } from 'react';

export const TooltipWrapper = ({
                                   children,
                                   tooltipText,
                                   disabledCondition,
                                   placement = 'top',
                                   className = '',
                                   style = {},
                                   onDisabledClick
                               }) => {
    const [showTooltip, setShowTooltip] = useState(false);
    const handleClick = (e, originalOnClick) => {
        if (disabledCondition) {
            e.preventDefault();
            if (typeof onDisabledClick === 'function') {
                onDisabledClick(e);
            }
        } else {
            originalOnClick?.(e);
        }
    };
    const getTooltipPosition = () => {
        switch (placement) {
            case 'top':
                return {
                    bottom: '100%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    marginBottom: '8px',
                };
            case 'bottom':
                return {
                    top: '100%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    marginTop: '8px',
                };
            case 'left':
                return {
                    right: '100%',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    marginRight: '8px',
                };
            case 'right':
                return {
                    left: '100%',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    marginLeft: '8px',
                };
            default:
                return {};
        }
    };
    let wrappedChild = children;
    if (isValidElement(children)) {
        const originalOnClick = children.props.onClick;

        wrappedChild = cloneElement(children, {
            onClick: (e) => handleClick(e, originalOnClick),
            className: `${children.props.className || ''} ${disabledCondition ? 'disabled' : ''}`,
            style: {
                ...children.props.style,
                pointerEvents: disabledCondition ? 'auto' : 'auto',
                cursor: disabledCondition ? 'not-allowed' : 'pointer',
                opacity: disabledCondition ? 0.6 : 1
            },
            disabled: false
        });
    }

    return (
        <div
            style={{ position: 'relative', ...style }}
            className={className}
            onMouseEnter={() => disabledCondition && setShowTooltip(true)}
            onMouseLeave={() => disabledCondition && setShowTooltip(false)}
        >
            {wrappedChild}
            {showTooltip && (
                <div
                    style={{
                        position: 'absolute',
                        backgroundColor: '#333',
                        color: '#fff',
                        padding: '6px 10px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        whiteSpace: 'nowrap',
                        opacity: showTooltip ? 1 : 0,
                        transition: 'opacity 0.2s ease',
                        zIndex: 999,
                        ...getTooltipPosition()
                    }}
                >
                    {tooltipText}
                    {/* Arrow */}
                    <div style={{
                        position: 'absolute',
                        width: 0,
                        height: 0,
                        borderStyle: 'solid',
                        ...(
                            placement === 'top' ? {
                                top: '100%',
                                left: '50%',
                                borderWidth: '5px 5px 0 5px',
                                borderColor: '#333 transparent transparent transparent',
                                transform: 'translateX(-50%)'
                            }
                            : placement === 'bottom' ? {
                                bottom: '100%',
                                left: '50%',
                                borderWidth: '0 5px 5px 5px',
                                borderColor: 'transparent transparent #333 transparent',
                                transform: 'translateX(-50%)'
                            }
                            : placement === 'left' ? {
                                right: '-5px',
                                top: '50%',
                                borderWidth: '5px 0 5px 5px',
                                borderColor: 'transparent transparent transparent #333',
                                transform: 'translateY(-50%)'
                            }
                            : placement === 'right' ? {
                                left: '-5px',
                                top: '50%',
                                borderWidth: '5px 5px 5px 0',
                                borderColor: 'transparent #333 transparent transparent',
                                transform: 'translateY(-50%)'
                            } : {}
                        )
                    }} />
                </div>
            )}
        </div>
    );
};

//1ci

// import React, { useState } from 'react';
//
// export const TooltipWrapper = ({ children, tooltipText, disabledCondition, placement = 'top' }) => {
//     const [showTooltip, setShowTooltip] = useState(false);
//
//     const getTooltipPosition = () => {
//         switch (placement) {
//             case 'top':
//                 return {
//                     bottom: '100%',
//                     left: '50%',
//                     transform: 'translateX(-50%)',
//                     marginBottom: '8px',
//                 };
//             case 'bottom':
//                 return {
//                     top: '100%',
//                     left: '50%',
//                     transform: 'translateX(-50%)',
//                     marginTop: '8px',
//                 };
//             case 'left':
//                 return {
//                     right: '100%',
//                     top: '50%',
//                     transform: 'translateY(-50%)',
//                     marginRight: '8px',
//                 };
//             case 'right':
//                 return {
//                     left: '100%',
//                     top: '50%',
//                     transform: 'translateY(-50%)',
//                     marginLeft: '8px',
//                 };
//             default:
//                 return {};
//         }
//     };
//
//     return (
//         <div
//             style={{
//                 position: 'relative',
//                 // display: 'inline-block'
//             }}
//             onMouseEnter={() => { if (disabledCondition) setShowTooltip(true); }}
//             onMouseLeave={() => { if (disabledCondition) setShowTooltip(false); }}
//         >
//             {children}
//             {showTooltip && (
//                 <div style={{
//                     position: 'absolute',
//                     backgroundColor: '#000',
//                     color: '#fff',
//                     padding: '5px 10px',
//                     borderRadius: '4px',
//                     fontSize: '12px',
//                     whiteSpace: 'nowrap',
//                     zIndex: 999,
//                     ...getTooltipPosition()
//                 }}>
//                     {tooltipText}
//                 </div>
//             )}
//         </div>
//     )}