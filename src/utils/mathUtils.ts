export const evaluateMathExpression = (expression: string): string => {
  // Simple sanitization to avoid eval() security risks
  // Only allow numbers, basic operators, parentheses, and whitespace
  const sanitizedExpression = expression.replace(/[^0-9+\-*/().e\s]/gi, '');
  
  // Check for unbalanced parentheses
  const openParens = (sanitizedExpression.match(/\(/g) || []).length;
  const closeParens = (sanitizedExpression.match(/\)/g) || []).length;
  
  if (openParens !== closeParens) {
    return 'Unbalanced parentheses';
  }

  // Check for empty or invalid expressions
  if (!sanitizedExpression || sanitizedExpression.trim() === '') {
    return 'Empty expression';
  }

  // Check for invalid operator sequences
  if (/[+\-*/]{2,}/.test(sanitizedExpression)) {
    return 'Invalid operator sequence';
  }

  try {
    // Use Function instead of eval for slightly better security
    // eslint-disable-next-line no-new-func
    const result = Function(`"use strict"; return (${sanitizedExpression})`)();
    
    // Check if result is a valid number
    if (isNaN(result) || !isFinite(result)) {
      return 'Invalid result';
    }
    
    // Format the result to handle floating point precision
    const formattedResult = Number.isInteger(result) 
      ? result.toString()
      : parseFloat(result.toFixed(8)).toString();
    
    return formattedResult;
  } catch (error) {
    console.error('Math evaluation error:', error);
    return 'Invalid expression';
  }
};

export const formatMathExpression = (expression: string): string => {
  // Remove excess whitespace
  let formatted = expression.trim().replace(/\s+/g, ' ');
  
  // Add spaces around operators for better readability
  formatted = formatted
    .replace(/([+\-*/()])/g, ' $1 ')
    .replace(/\s+/g, ' ')
    .trim();
  
  return formatted;
};