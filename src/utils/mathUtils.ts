export const evaluateMathExpression = (expression: string): string => {
  // Simple sanitization to avoid eval() security risks
  // Only allow numbers, basic operators, parentheses, and whitespace
  const sanitizedExpression = expression.replace(/[^0-9+\-*/().e\s]/gi, '').trim();
  
  // Check for empty or invalid expressions
  if (!sanitizedExpression || sanitizedExpression.trim() === '') {
    return 'Please enter a valid expression';
  }

  // Check for unbalanced parentheses
  const openParens = (sanitizedExpression.match(/\(/g) || []).length;
  const closeParens = (sanitizedExpression.match(/\)/g) || []).length;
  
  if (openParens !== closeParens) {
    return openParens > closeParens 
      ? 'Missing closing parenthesis'
      : 'Missing opening parenthesis';
  }

  // Check for invalid operator sequences or trailing operators
  if (/[+\-*/]{2,}|[+\-*/]$/.test(sanitizedExpression)) {
    return 'Invalid operator sequence';
  }

  // Check for expressions starting with operators (except minus for negative numbers)
  if (/^[+*/]/.test(sanitizedExpression)) {
    return 'Expression cannot start with an operator';
  }

  try {
    // Wrap expression in parentheses to handle negative numbers better
    const wrappedExpression = `(${sanitizedExpression})`;
    
    // Use Function instead of eval for slightly better security
    // eslint-disable-next-line no-new-func
    const result = Function(`"use strict"; return ${wrappedExpression}`)();
    
    // Check if result is a valid number
    if (typeof result !== 'number' || isNaN(result) || !isFinite(result)) {
      return 'Invalid result';
    }
    
    // Format the result to handle floating point precision
    const formattedResult = Number.isInteger(result) 
      ? result.toString()
      : parseFloat(result.toFixed(8)).toString();
    
    return formattedResult;
  } catch (error) {
    // Provide more specific error messages based on common error patterns
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    if (errorMessage.includes('Unexpected token')) {
      return 'Invalid expression format';
    }
    
    if (errorMessage.includes('undefined') || errorMessage.includes('null')) {
      return 'Expression contains undefined values';
    }
    
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